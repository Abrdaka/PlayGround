/* LAST LIGHT — top-down survival, main loop & rules */
import * as THREE from '../vendor/three.module.min.js';
import {
  CELL, MAPW, MAPH, cellAt, isSolid, pathBlocked, blocksSight, worldX, worldZ, gridX, gridZ,
  clamp, lerp, smoothstep, damp, dist, angleDiff, mulberry32,
  ZOMBIE_SPAWNS, NIGHT_SPAWNS, LOOT_SPOTS, LANDMARKS
} from './core.js';
import { buildWorld } from './world.js';
import { buildSurvivor, animateSurvivor, buildWeapon, buildZombie, animateZombie } from './actors.js';
import { createAudio } from './audio.js';

const $ = id => document.getElementById(id);
const canvas = $('view');
const gameEl = $('game');
const IS_TOUCH = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const SMALL = () => innerWidth <= 820;

/* ---------------- renderer & scene ---------------- */
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: !IS_TOUCH, powerPreference: 'high-performance', alpha: false });
} catch (e) {
  document.body.innerHTML = '<div style="color:#d6e675;font:14px monospace;padding:40px">This browser could not start WebGL. Try a current Chrome, Edge or Safari.</div>';
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, SMALL() ? 1.5 : 1.8));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, .1, 260);
const world = buildWorld(scene, renderer);
const audio = createAudio();

/* ---------------- player ---------------- */
const START = { gx: 9.5, gy: 29.0 };
const player = {
  gx: START.gx, gy: START.gy, aim: Math.PI, hp: 100, st: 100, hunger: 100,
  attackCd: 0, attackT: 0, stepT: 0, noiseT: 0, speed: 0, radius: .34, hurtT: 0,
};
let weapon = 'fists';
const resources = { wood: 0, scrap: 0, cloth: 0, parts: 0, ammo: 0, food: 0, chem: 0, fuel: 0 };
const state = {
  mode: 'intro', playing: false, modal: false, night: false, nightFactor: 0,
  dayTime: 0, kills: 0, lootCount: 0, zoom: 1, gameOver: false, shake: 0,
  flowT: 0, flowCell: '', waveT: 0, waveN: 0, threatT: 0, saveT: 0, introT: 0,
  lastHurt: 0, bodyHurt: false, clockMin: -1,
};

const survivor = buildSurvivor();
scene.add(survivor.root);
survivor.root.position.set(worldX(player.gx), 0, worldZ(player.gy));
survivor.root.rotation.y = player.aim;

const weaponModels = {};
for (const k of ['shiv', 'bat', 'pistol']) {
  const m = buildWeapon(k);
  m.visible = false;
  survivor.weaponMount.add(m);
  weaponModels[k] = m;
}

const flash = new THREE.SpotLight(0xffe8c0, 0, 32, .5, .6, 1.35);
flash.castShadow = true;
flash.shadow.mapSize.set(512, 512);
flash.shadow.bias = -.0015;
flash.shadow.camera.near = .4;
flash.shadow.camera.far = 32;
scene.add(flash, flash.target);

const aimRing = new THREE.Mesh(
  new THREE.RingGeometry(.8, .9, 30),
  new THREE.MeshBasicMaterial({ color: 0xd6e675, transparent: true, opacity: .28, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
);
aimRing.rotation.x = -Math.PI / 2;
aimRing.visible = false;
scene.add(aimRing);

/* ---------------- zombies ---------------- */
let zombies = [];
let corpses = [];
function spawnZombie(gx, gy, opts = {}) {
  gx = clamp(gx, 1.4, 34.6); gy = clamp(gy, 1.4, 34.6);
  const variant = Math.floor(Math.random() * 4);
  const model = buildZombie(variant);
  const z = {
    gx, gy, hp: opts.runner ? 46 : 64, maxHp: opts.runner ? 46 : 64,
    runner: !!opts.runner, alive: true, alert: opts.alert || 0, attackCd: 0,
    hitT: 0, deadT: 0, model, aim: Math.random() * 6.28, walk: 0,
    roamT: Math.random() * 2, roamA: Math.random() * 6.28, speedNow: 0, attackOpen: 0,
    spawn: { x: gx, y: gy },
  };
  model.root.position.set(worldX(gx), 0, worldZ(gy));
  model.root.rotation.y = z.aim;
  scene.add(model.root);
  zombies.push(z);
  return z;
}
function clearZombies() {
  for (const z of zombies) if (z.model) scene.remove(z.model.root);
  zombies = [];
  for (const c of corpses) scene.remove(c.model.root);
  corpses = [];
}
for (let i = 0; i < ZOMBIE_SPAWNS.length - 2; i++) {
  const [gx, gy] = ZOMBIE_SPAWNS[i];
  spawnZombie(gx + (Math.random() - .5) * .5, gy + (Math.random() - .5) * .5, { runner: i === 3 });
}

/* ---------------- flow field ---------------- */
const flow = new Int16Array(MAPW * MAPH);
const qx = new Int16Array(MAPW * MAPH), qy = new Int16Array(MAPW * MAPH);
function computeFlow() {
  flow.fill(-1);
  const sx = clamp(Math.floor(player.gx), 0, MAPW - 1), sy = clamp(Math.floor(player.gy), 0, MAPH - 1);
  let head = 0, tail = 0;
  const si = sy * MAPW + sx;
  flow[si] = 0; qx[tail] = sx; qy[tail] = sy; tail++;
  while (head < tail) {
    const x = qx[head], y = qy[head]; head++;
    const d = flow[y * MAPW + x];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= MAPW || ny >= MAPH) continue;
      const idx = ny * MAPW + nx;
      if (flow[idx] !== -1) continue;
      if (pathBlocked(nx, ny)) continue;
      flow[idx] = d + 1; qx[tail] = nx; qy[tail] = ny; tail++;
    }
  }
}
function flowNext(z) {
  const x = clamp(Math.floor(z.gx), 0, MAPW - 1), y = clamp(Math.floor(z.gy), 0, MAPH - 1);
  const here = flow[y * MAPW + x];
  if (here <= 0) return null;
  let best = here, bx = -1, by = -1;
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= MAPW || ny >= MAPH) continue;
    const v = flow[ny * MAPW + nx];
    if (v >= 0 && v < best) { best = v; bx = nx; by = ny; }
  }
  return bx < 0 ? null : { x: bx, y: by };
}

/* ---------------- helpers ---------------- */
const PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const aimPoint = new THREE.Vector3(worldX(player.gx), 0, worldZ(player.gy) - 3);
const mouse = { x: innerWidth / 2, y: innerHeight * .45, moved: false };
function worldOf(gx, gy) { return { x: worldX(gx), z: worldZ(gy) }; }
function playerWorld() { return { x: worldX(player.gx), z: worldZ(player.gy) }; }
function moveActor(a, dgx, dgy, radius) {
  const wx = worldX(a.gx) + dgx * CELL;
  const wz = worldZ(a.gy) + dgy * CELL;
  const p = world.resolveCircle(wx, wz, radius);
  a.gx = gridX(p.x); a.gy = gridZ(p.z);
}
function noisy(radius) {
  for (const z of zombies) if (z.alive && dist(z.gx, z.gy, player.gx, player.gy) * CELL < radius) z.alert = Math.max(z.alert, 6);
}
function setWeapon(kind) {
  weapon = kind;
  for (const k of Object.keys(weaponModels)) weaponModels[k].visible = k === kind;
  updateHud();
}

/* ---------------- UI refs ---------------- */
const ui = {
  prompt: $('prompt'), promptText: $('promptText'), prompt2: $('prompt2'), prompt2Text: $('prompt2Text'),
  toast: $('toast'), goal: $('goal'), timer: $('objectiveTimer'), clock: $('clock'), temp: $('temp'),
  location: $('locationText'), threat: $('threat'), hitflash: $('hitflash'), reticle: $('reticle'),
  healthFill: $('healthFill'), staminaFill: $('staminaFill'), hungerFill: $('hungerFill'),
  healthNum: $('healthNum'), staminaNum: $('staminaNum'), hungerNum: $('hungerNum'),
  status: $('statusText'), doorPips: $('doorPips'), windowPips: $('windowPips'), perimeter: $('perimeterState'),
  items: $('items'), capacity: $('capacity'), weaponName: $('weaponName'),
  equippedWeapon: $('equippedWeapon'), vehicle: $('vehicleState'), inventoryGrid: $('inventoryGrid'),
  inventoryCapacity: $('inventoryCapacity'), recipes: $('recipes'), recipesWrap: $('craftModal'),
};
const ITEM = {
  wood: { name: 'Planks', desc: 'Building material', weight: 1 },
  scrap: { name: 'Scrap', desc: 'Metal salvage', weight: 1 },
  cloth: { name: 'Cloth', desc: 'Bandage material', weight: 1 },
  parts: { name: 'Parts', desc: 'Mechanical salvage', weight: 1 },
  ammo: { name: 'Ammo', desc: 'Makeshift rounds', weight: .5 },
  food: { name: 'Food', desc: 'Restores 30 hunger', weight: 1 },
  chem: { name: 'Medicine', desc: 'Restores 25 health', weight: .5 },
  fuel: { name: 'Fuel', desc: 'Vehicle fuel', weight: 2 },
};
const INVENTORY_MAX = 50;
const WEAPON_NAMES = { fists: 'Fists', shiv: 'Scrap shiv', bat: 'Nailed bat', pistol: 'Repaired sidearm' };

/* ---------------- HUD & dialog ---------------- */
let toastTimer = 0;
function toast(msg, warn = false, ms = 2300) {
  ui.toast.textContent = msg;
  ui.toast.classList.toggle('warn', warn);
  ui.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('show'), ms);
}
function money(n) { return Math.round(n); }
function inventoryUsed() {
  return Object.entries(resources).reduce((n, [k, v]) => n + (Number(v) || 0) * (ITEM[k]?.weight || 1), 0);
}
function canCarry(extra = 1) { return inventoryUsed() + extra <= INVENTORY_MAX; }
function pips(n, max = 3) {
  let s = '';
  for (let i = 0; i < max; i++) s += `<span class="pip ${i < n ? 'on' : ''}"></span>`;
  return s;
}
function updateInventoryUI() {
  ui.items.innerHTML = Object.entries(resources).map(([k, v]) => {
    const empty = v <= 0 ? ' empty' : '';
    return `<div class="item${empty}"><span>${ITEM[k].name}</span><span>${v}</span></div>`;
  }).join('');
  const used = inventoryUsed();
  ui.capacity.innerHTML = `<div class="capacity"><span>${Math.round(used)} / ${INVENTORY_MAX} WT</span><div class="capacity-track"><div class="capacity-fill" style="width:${clamp(used / INVENTORY_MAX * 100, 0, 100)}%"></div></div></div>`;
  ui.weaponName.textContent = WEAPON_NAMES[weapon] || 'Fists';
  ui.equippedWeapon.textContent = WEAPON_NAMES[weapon] || 'Fists';
  ui.vehicle.textContent = world.car.fueled ? 'Ready to drive' : world.car.repaired ? 'Repaired · no fuel' : 'Dead pickup';
}
function updateHud() {
  ui.healthFill.style.width = clamp(player.hp, 0, 100) + '%';
  ui.staminaFill.style.width = clamp(player.st, 0, 100) + '%';
  ui.hungerFill.style.width = clamp(player.hunger, 0, 100) + '%';
  ui.healthNum.textContent = Math.round(player.hp);
  ui.staminaNum.textContent = Math.round(player.st);
  ui.hungerNum.textContent = Math.round(player.hunger);
  ui.status.textContent = player.hp <= 0 ? 'GONE' : player.hp < 30 ? 'CRITICAL' : player.hp < 60 ? 'HURT' : 'ALIVE';
  const d = world.safeDoor, wins = world.safeWindows;
  ui.doorPips.innerHTML = pips(d ? d.reinforced : 0);
  ui.windowPips.innerHTML = wins.map(w => pips(w.reinforced)).join('&nbsp;');
  const breached = (d && d.breached) || wins.some(w => w.breached);
  const secure = d && d.reinforced >= 3 && wins.every(w => w.reinforced >= 3);
  const partial = (d && d.reinforced > 0) || wins.some(w => w.reinforced > 0);
  ui.perimeter.textContent = breached ? 'BREACHED' : secure ? 'SECURE' : partial ? 'PARTIAL' : 'UNSECURED';
  ui.perimeter.style.color = breached ? '#e26951' : secure ? '#d6e675' : partial ? '#e2b566' : '#9aa493';
  document.body.classList.toggle('hurt', player.hp < 35 && player.hp > 0);
  ui.threat.classList.toggle('on', state.night && state.playing);
  if (state.night) ui.threat.innerHTML = breached ? '<i></i>THEY ARE INSIDE THE HOUSE' : '<i></i>THE DEAD ARE DRAWN TO NOISE';
  // objective copy
  if (state.playing) {
    if (state.night) {
      ui.goal.textContent = breached ? 'They are inside. Fight or flee.' : 'Hold the safehouse until dawn.';
    } else if (secure) {
      ui.goal.textContent = 'Perimeter secure. Hold until nightfall.';
    } else if (partial) {
      ui.goal.textContent = 'Finish boarding the safehouse.';
    } else {
      ui.goal.textContent = 'Scavenge the block. Board up before dark.';
    }
    const t = state.dayTime;
    if (!state.night) ui.timer.textContent = `NIGHTFALL IN ${fmtTime(Math.max(0, 150 - t))}`;
    else ui.timer.textContent = `DAWN IN ${fmtTime(Math.max(0, 390 - t))}`;
    ui.clock.textContent = clockString();
    ui.temp.textContent = Math.round(lerp(12, 7, state.nightFactor)) + '°C';
    ui.location.textContent = locationName();
  }
}
function fmtTime(s) {
  s = Math.max(0, Math.floor(s));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function clockString() {
  const t = state.dayTime;
  let mins;
  if (t < 150) mins = 16 * 60 + 42 + t * (138 / 150);
  else mins = 19 * 60 + (t - 150) * (600 / 240);
  const hh = Math.floor(mins / 60) % 24, mm = Math.floor(mins % 60);
  return `DAY 01 · ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}
function locationName() {
  const x = player.gx, y = player.gy;
  if (x >= 6 && x <= 13 && y >= 25 && y <= 32) return 'WEST MERCER · SAFEHOUSE';
  if (x >= 2 && x <= 9 && y >= 2 && y <= 7) return 'WEST MERCER · HARDWARE';
  if (x >= 26 && x <= 33 && y >= 2 && y <= 8) return 'WEST MERCER · CORNER STORE';
  if (x >= 24 && x <= 32 && y >= 24 && y <= 31) return 'WEST MERCER · RANSACKED HOUSE';
  if (x >= 2 && x <= 5 && y >= 22 && y <= 26) return 'WEST MERCER · TOOL SHED';
  if (x >= 16 && x <= 19) return 'MERCER STREET · NORTH–SOUTH';
  if (y >= 16 && y <= 19) return 'MERCER STREET · CROSSROAD';
  return 'WEST MERCER · DEAD COUNTY';
}

function renderKit() { updateInventoryUI(); }
function renderInventoryModal() {
  const used = inventoryUsed();
  ui.inventoryCapacity.innerHTML = `<div class="capacity"><span>CARRY WEIGHT ${Math.round(used)} / ${INVENTORY_MAX}</span><div class="capacity-track"><div class="capacity-fill" style="width:${clamp(used / INVENTORY_MAX * 100, 0, 100)}%"></div></div></div>`;
  ui.equippedWeapon.textContent = WEAPON_NAMES[weapon] || 'Fists';
  ui.vehicle.textContent = world.car.fueled ? 'Ready to drive' : world.car.repaired ? 'Repaired · no fuel' : 'Dead pickup';
  ui.inventoryGrid.innerHTML = Object.entries(ITEM).map(([k, info]) => {
    const v = resources[k] || 0;
    const usable = k === 'food' || k === 'chem';
    return `<div class="inv-card"><div><strong>${info.name}</strong><small>${info.desc} · ${info.weight} wt</small><em>×${v}</em></div><button data-use="${k}" ${usable && v > 0 ? '' : 'disabled'}>${k === 'food' ? 'EAT' : k === 'chem' ? 'USE' : 'STORAGE'}</button></div>`;
  }).join('');
  ui.inventoryGrid.querySelectorAll('[data-use]').forEach(b => b.onclick = () => useItem(b.dataset.use));
}
function openModal(id) {
  state.modal = true;
  gameEl.classList.add('modal-open');
  ui.prompt.classList.remove('show'); ui.prompt2.classList.remove('show');
  $(id).classList.add('open');
  if (id === 'inventoryModal') renderInventoryModal();
}
function closeModal() {
  state.modal = false;
  gameEl.classList.remove('modal-open');
  document.querySelectorAll('.modal-wrap').forEach(x => x.classList.remove('open'));
}
function openCraft() { renderRecipes(); openModal('craftModal'); }
function openInventory() { renderInventoryModal(); openModal('inventoryModal'); }
function renderRecipes() {
  ui.recipes.innerHTML = recipes.map(r => {
    const ok = Object.entries(r.cost).every(([k, v]) => (resources[k] || 0) >= v);
    return `<div class="recipe"><div><strong>${r.name}</strong><small>${r.desc}<br>NEEDS ${Object.entries(r.cost).map(([k, v]) => `${v} ${ITEM[k].name.toUpperCase()}`).join(' · ')}</small></div><button data-recipe="${r.id}" ${ok ? '' : 'disabled'}>${ok ? 'CRAFT' : 'MISSING'}</button></div>`;
  }).join('');
  ui.recipes.querySelectorAll('[data-recipe]').forEach(b => b.onclick = () => craft(b.dataset.recipe));
}
function craft(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  if (!Object.entries(r.cost).every(([k, v]) => (resources[k] || 0) >= v)) return;
  for (const [k, v] of Object.entries(r.cost)) resources[k] -= v;
  if (id === 'med') { player.hp = Math.min(100, player.hp + 40); toast('Wounds dressed. +40 health.'); }
  else if (id === 'ammo') { resources.ammo += 4; toast('+4 rounds.'); }
  else if (id === 'shiv') { setWeapon('shiv'); toast('Scrap shiv crafted. A blade beats fists.'); }
  else if (id === 'bat') { setWeapon('bat'); toast('Nailed bat crafted. Aim for the head.'); }
  else if (id === 'pistol') { setWeapon('pistol'); toast('Sidearm repaired. It will draw a crowd.'); }
  audio.craft(); noisy(4);
  updateHud(); updateInventoryUI(); renderRecipes();
  saveGame();
}
function useItem(k) {
  if (k === 'food') {
    if (resources.food <= 0) return;
    if (player.hunger >= 100 && player.hp >= 100) { toast('No need to eat yet.'); return; }
    resources.food--; player.hunger = Math.min(100, player.hunger + 30); player.hp = Math.min(100, player.hp + 5);
    toast('Ate food. Hunger restored.');
  } else if (k === 'chem') {
    if (resources.chem <= 0) return;
    if (player.hp >= 100) { toast('Health is already full.'); return; }
    resources.chem--; player.hp = Math.min(100, player.hp + 25);
    toast('Medicine used. +25 health.');
  } else return;
  audio.pickup(); updateHud(); updateInventoryUI(); renderInventoryModal(); saveGame();
}
const recipes = [
  { id: 'shiv', name: 'Scrap shiv', desc: 'A crude blade. Better than bare hands.', cost: { scrap: 2, cloth: 1 } },
  { id: 'bat', name: 'Nailed bat', desc: 'Heavy, slow, devastating up close.', cost: { wood: 3, scrap: 1 } },
  { id: 'med', name: 'Field dressing', desc: 'Restore 40 health.', cost: { cloth: 2, chem: 1 } },
  { id: 'ammo', name: 'Makeshift ammo', desc: 'Craft rounds for the sidearm.', cost: { scrap: 1, chem: 1 } },
  { id: 'pistol', name: 'Repaired sidearm', desc: 'Loud, powerful, uses ammo.', cost: { parts: 2, scrap: 2, chem: 1 } },
];

/* ---------------- interaction ---------------- */
let near = null;
function findNear() {
  const p = playerWorld();
  let best = null, bd = 2.7;
  for (const it of world.interactables) {
    if (it.kind === 'loot' && !it.active) continue;
    if (it.kind === 'car' && !it.active) continue;
    const d = Math.hypot(it.wx - p.x, it.wz - p.z);
    if (d < bd) { bd = d; best = it; }
  }
  near = best;
  return best;
}
function promptFor(it) {
  if (!it) return null;
  if (it.kind === 'loot') {
    return { primary: it.active ? 'SCAVENGE · ' + it.label.toUpperCase() : null, secondary: null };
  }
  if (it.kind === 'car') {
    if (!it.repaired) {
      const ok = (resources.scrap >= 3 && resources.parts >= 1);
      return { primary: ok ? 'REPAIR ENGINE · 3 SCRAP + 1 PART' : 'REPAIR ENGINE · NEED 3 SCRAP + 1 PART', secondary: null };
    }
    if (!it.fueled) {
      return { primary: resources.fuel >= 1 ? 'ADD FUEL · 1 FUEL' : 'ADD FUEL · NEED 1 FUEL', secondary: null };
    }
    return { primary: 'DRIVE OUT OF DEAD COUNTY', secondary: null };
  }
  // openings
  const o = it;
  if (o.reinforced > 0) {
    return {
      primary: `PRY A BOARD · ${o.reinforced}/3`,
      secondary: o.reinforced < 3 ? `BOARD UP · 1 PLANK (${resources.wood > 0 ? 'READY' : 'NONE'})` : null,
    };
  }
  if (o.breached || o.kind === 'broken') {
    return { primary: null, secondary: `BOARD UP THE OPENING · 1 PLANK (${resources.wood > 0 ? 'READY' : 'NONE'})` };
  }
  if (o.kind === 'door') {
    return { primary: o.open ? 'CLOSE DOOR' : 'OPEN DOOR', secondary: `BOARD UP · 1 PLANK (${resources.wood > 0 ? 'READY' : 'NONE'})` };
  }
  return { primary: null, secondary: `BOARD UP WINDOW · 1 PLANK (${resources.wood > 0 ? 'READY' : 'NONE'})` };
}
function updatePrompt() {
  if (!state.playing || state.modal) { ui.prompt.classList.remove('show'); ui.prompt2.classList.remove('show'); return; }
  const it = findNear();
  const p = promptFor(it);
  if (p?.primary) { ui.promptText.textContent = p.primary; ui.prompt.classList.add('show'); }
  else ui.prompt.classList.remove('show');
  if (p?.secondary) { ui.prompt2Text.textContent = p.secondary; ui.prompt2.classList.add('show'); }
  else ui.prompt2.classList.remove('show');
}
function interact() {
  if (!state.playing || state.modal) return;
  const it = findNear();
  if (!it) { toast('Nothing close enough to use.'); return; }
  if (it.kind === 'loot') { takeLoot(it); return; }
  if (it.kind === 'car') { useCar(it); return; }
  const o = it;
  if (o.reinforced > 0) {
    if (world.board(o, false)) {
      audio.hammer(); noisy(2);
      toast(o.reinforced === 0 ? 'Last board off. The opening is bare.' : `Board pried loose · ${o.reinforced}/3`);
      updateHud(); saveGame();
    }
    return;
  }
  if (o.kind === 'door') {
    if (o.breached) { toast('The frame is broken. Board it up with F.'); return; }
    o.open = !o.open; o.closed = !o.open;
    world.refreshOpening(o);
    audio.door(o.open);
    noisy(3);
    toast(o.open ? 'Door opened.' : 'Door closed.');
    saveGame();
    return;
  }
  if (o.kind === 'window') { toast(o.breached ? 'The glass is gone. Board it with F.' : 'Windows are fixed. Use F to board them.'); return; }
  toast('The opening is broken. Board it up with F.');
}
function boardUp() {
  if (!state.playing || state.modal) return;
  const it = findNear();
  if (!it) { toast('Nothing close enough to board.'); return; }
  if (it.kind !== 'door' && it.kind !== 'window' && it.kind !== 'broken') return;
  const o = it;
  if (o.reinforced >= 3) { toast('Already fully boarded. It is secure.'); return; }
  if ((resources.wood || 0) < 1) { toast('Need a plank to board this.', true); return; }
  resources.wood--;
  if (o.open && !o.breached) { o.open = false; o.closed = true; }
  world.board(o, true);
  audio.hammer(); noisy(5);
  toast(o.reinforced >= 3 ? 'Boarded tight. This opening is secure.' : `Boarded · ${o.reinforced}/3. Keep going.`);
  updateHud(); updateInventoryUI(); saveGame();
}
function takeLoot(it) {
  let room = INVENTORY_MAX - inventoryUsed();
  let taken = {}, remaining = {}, total = 0;
  for (const [k, v] of Object.entries(it.loot || {})) {
    const weight = ITEM[k]?.weight || 1;
    const available = Math.max(0, Math.floor(Number(v) || 0));
    const allowed = Math.max(0, Math.min(available, Math.floor((room + 1e-9) / weight)));
    if (allowed > 0) { resources[k] = (resources[k] || 0) + allowed; taken[k] = allowed; total += allowed; room -= allowed * weight; }
    if (allowed < available) remaining[k] = available - allowed;
  }
  it.loot = remaining;
  const summary = Object.entries(taken).map(([k, v]) => `+${v} ${ITEM[k].name}`).join(' · ');
  if (total > 0) {
    state.lootCount += total;
    audio.pickup(); noisy(3);
    toast(Object.keys(remaining).length ? `Partially scavenged · ${summary}` : `Scavenged · ${summary}`);
    if (!Object.keys(remaining).length) world.consumeLoot(it);
  } else {
    toast('Inventory full. Nothing picked up.', true);
  }
  updateInventoryUI(); updateHud(); saveGame();
}
function useCar(it) {
  if (!it.repaired) {
    if ((resources.scrap || 0) >= 3 && (resources.parts || 0) >= 1) {
      resources.scrap -= 3; resources.parts -= 1;
      it.repaired = true;
      world.setCarState({ repaired: true, fueled: it.fueled });
      toast('Engine turns over. It needs fuel to leave.');
      audio.craft(); noisy(12);
      updateInventoryUI(); updateHud(); saveGame();
    } else toast('Need 3 scrap and 1 part to repair the engine.', true);
    return;
  }
  if (!it.fueled) {
    if ((resources.fuel || 0) >= 1) {
      resources.fuel -= 1; it.fueled = true;
      world.setCarState({ repaired: true, fueled: true });
      toast('Tank filled. Press E again to drive out.');
      audio.pickup(); noisy(6);
      updateInventoryUI(); updateHud(); saveGame();
    } else toast('Engine runs. Find a can of fuel.', true);
    return;
  }
  endGame(true, 'escape');
}

/* ---------------- combat ---------------- */
function nearestZombieInCone(range, cone) {
  const p = playerWorld();
  let best = null, bd = range;
  for (const z of zombies) {
    if (!z.alive) continue;
    const zw = worldOf(z.gx, z.gy);
    const d = Math.hypot(zw.x - p.x, zw.z - p.z);
    const ang = Math.atan2(zw.x - p.x, zw.z - p.z);
    if (d < bd && Math.abs(angleDiff(ang, player.aim)) < cone) { bd = d; best = z; }
  }
  return best;
}
function damageZombie(z, dmg) {
  if (!z.alive) return;
  z.hp -= dmg;
  z.hitT = .13;
  z.alert = 8;
  const zw = worldOf(z.gx, z.gy);
  world.addBlood(zw.x + (Math.random() - .5) * .4, zw.z + (Math.random() - .5) * .4, .65 + Math.random() * .35);
  for (const m of z.model.mats) { m.emissive.setHex(0x7a1d13); m.emissiveIntensity = .9; }
  if (z.hp <= 0) killZombie(z);
  else { audio.hit(); state.shake = Math.max(state.shake, .14); }
}
function killZombie(z) {
  z.alive = false; z.deadT = 0;
  state.kills++;
  const zw = worldOf(z.gx, z.gy);
  world.addBlood(zw.x, zw.z, 1.5 + Math.random() * .6);
  world.addBlood(zw.x + (Math.random() - .5) * 1.2, zw.z + (Math.random() - .5) * 1.2, .8);
  audio.gore();
  player.st = Math.min(100, player.st + 4);
  corpses.push(z);
  if (corpses.length > 14) {
    const old = corpses.shift();
    if (old && old.model) scene.remove(old.model.root);
  }
}
function hurt(n) {
  if (state.gameOver || state.mode !== 'play') return;
  player.hp = Math.max(0, player.hp - n);
  player.hurtT = .3;
  ui.hitflash.classList.add('on');
  setTimeout(() => ui.hitflash.classList.remove('on'), 130);
  state.shake = Math.max(state.shake, .38);
  audio.hurt();
  if (player.hp <= 0) endGame(false, 'death');
  else if (player.hp < 30 && performance.now() - state.lastHurt > 2200) { state.lastHurt = performance.now(); audio.heartbeat(); }
}
function attack() {
  if (!state.playing || state.modal || player.attackCd > 0) return;
  if (IS_TOUCH && !state.aimDrag) {
    // touch quality-of-life: snap to the closest ghoul
    const p = playerWorld();
    let best = null, bd = 5.5;
    for (const z of zombies) if (z.alive) {
      const d = Math.hypot(worldX(z.gx) - p.x, worldZ(z.gy) - p.z);
      if (d < bd) { bd = d; best = z; }
    }
    if (best) player.aim = Math.atan2(worldX(best.gx) - p.x, worldZ(best.gy) - p.z);
  }
  player.attackCd = weapon === 'bat' ? .78 : weapon === 'pistol' ? .5 : weapon === 'shiv' ? .42 : .46;
  player.attackT = .26;
  if (weapon === 'pistol') firePistol();
  else {
    audio.swing();
    const z = nearestZombieInCone(weapon === 'bat' ? 2.35 : 2.05, .95);
    if (z) {
      const dmg = weapon === 'bat' ? 86 : weapon === 'shiv' ? 50 : 26;
      damageZombie(z, dmg);
      const p = playerWorld(), zw = worldOf(z.gx, z.gy);
      const dx = zw.x - p.x, dz = zw.z - p.z, d = Math.hypot(dx, dz) || 1;
      moveActor(z, dx / d * .16, dz / d * .16, .3);
      state.shake = Math.max(state.shake, .16);
    }
    player.st = Math.max(0, player.st - (weapon === 'bat' ? 7 : 4));
  }
}
function firePistol() {
  if ((resources.ammo || 0) <= 0) { audio.empty(); toast('Click. Empty.', true, 1400); return; }
  resources.ammo--;
  updateInventoryUI();
  const p = playerWorld();
  const dirX = Math.sin(player.aim), dirZ = Math.cos(player.aim);
  const from = new THREE.Vector3(p.x + dirX * .55, 1.22, p.z + dirZ * .55);
  let bestZ = null, bestT = 26;
  for (const z of zombies) {
    if (!z.alive) continue;
    const zw = worldOf(z.gx, z.gy);
    const rx = zw.x - p.x, rz = zw.z - p.z;
    const t = rx * dirX + rz * dirZ;
    if (t < .4 || t > bestT) continue;
    const perp = Math.abs(rx * dirZ - rz * dirX);
    if (perp > .82) continue;
    if (!world.lineOfSight(p.x, p.z, zw.x, zw.z)) continue;
    bestT = t; bestZ = z;
  }
  const to = bestZ ? new THREE.Vector3(worldX(bestZ.gx), 1.05, worldZ(bestZ.gy)) : new THREE.Vector3(p.x + dirX * 22, 1.0, p.z + dirZ * 22);
  world.addTracer(from, to);
  world.flashMuzzle(from.x, from.y, from.z + .2);
  audio.shot();
  state.shake = Math.max(state.shake, .32);
  state.shotPulse = .07;
  noisy(34);
  if (bestZ) damageZombie(bestZ, 125);
}
/* ---------------- save / restore ---------------- */
const SAVE_KEY = 'lastlight.deadcounty.v1';
function saveGame() {
  if (!state.playing || state.gameOver || state.mode !== 'play') return;
  try {
    const data = {
      v: 1, dayTime: state.dayTime, kills: state.kills, lootCount: state.lootCount,
      player: {
        gx: player.gx, gy: player.gy, aim: player.aim, hp: player.hp, st: player.st, hunger: player.hunger,
      },
      resources: { ...resources }, weapon,
      car: { repaired: world.car.repaired, fueled: world.car.fueled },
      openings: world.openings.map(o => ({
        key: `${o.gx},${o.gy}`, reinforced: o.reinforced, hp: o.hp,
        breached: o.breached, closed: !o.open,
      })),
      loot: world.loot.map(spot => ({ active: spot.active, loot: { ...spot.loot } })),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) { /* storage unavailable — the run still works */ }
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && data.v === 1 ? data : null;
  } catch (e) { return null; }
}
function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}
function applySave(data) {
  for (const key of Object.keys(resources)) resources[key] = Math.max(0, Number(data.resources?.[key]) || 0);
  const p = data.player || {};
  player.gx = clamp(Number(p.gx) || START.gx, 1.05, MAPW - 1.05);
  player.gy = clamp(Number(p.gy) || START.gy, 1.05, MAPH - 1.05);
  player.aim = Number(p.aim) || player.aim;
  player.hp = clamp(Number(p.hp) || 100, 1, 100);
  player.st = clamp(Number(p.st) || 100, 0, 100);
  player.hunger = clamp(Number(p.hunger) || 100, 0, 100);
  const safe = world.resolveCircle(worldX(player.gx), worldZ(player.gy), player.radius);
  player.gx = gridX(safe.x); player.gy = gridZ(safe.z);
  state.dayTime = Math.max(0, Number(data.dayTime) || 0);
  state.kills = Math.max(0, Number(data.kills) || 0);
  state.lootCount = Math.max(0, Number(data.lootCount) || 0);
  setWeapon(WEAPON_NAMES[data.weapon] ? data.weapon : 'fists');
  world.setCarState(data.car || {});
  for (const s of data.openings || []) {
    const o = world.openings.find(x => `${x.gx},${x.gy}` === s.key);
    if (o) world.setOpeningState(o, s);
  }
  (data.loot || []).forEach((entry, i) => {
    const spot = world.loot[i];
    if (!spot) return;
    spot.loot = { ...(entry.loot || {}) };
    spot.active = entry.active !== false;
    if (!spot.active) world.consumeLoot(spot);
    else if (spot.marker) { spot.marker.userData.hide = false; spot.marker.visible = true; }
    if (spot.prop) spot.prop.visible = spot.active;
  });
}

/* ---------------- input ---------------- */
const keys = new Set();
const moveInput = { x: 0, z: 0 };
const touchStick = { x: 0, z: 0, active: false };
let mouseHeld = false, touchSprint = false;
let touchAim = null, touchStart = null;

function updateAimFromPointer() {
  const rect = canvas.getBoundingClientRect();
  ndc.x = ((mouse.x - rect.left) / rect.width) * 2 - 1;
  ndc.y = -((mouse.y - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  if (raycaster.ray.intersectPlane(PLANE, aimPoint)) {
    const p = playerWorld();
    player.aim = Math.atan2(aimPoint.x - p.x, aimPoint.z - p.z);
  }
}

window.addEventListener('pointermove', e => {
  if (e.pointerType === 'touch') {
    if (touchAim && e.pointerId === touchAim.id) {
      mouse.x = e.clientX; mouse.y = e.clientY;
      touchAim.moved += Math.abs(e.clientX - touchAim.x) + Math.abs(e.clientY - touchAim.y);
      touchAim.x = e.clientX; touchAim.y = e.clientY;
      updateAimFromPointer();
    }
    return;
  }
  mouse.x = e.clientX; mouse.y = e.clientY;
  ui.reticle.style.left = mouse.x + 'px';
  ui.reticle.style.top = mouse.y + 'px';
  if (state.playing && !state.modal) updateAimFromPointer();
});

canvas.addEventListener('pointerdown', e => {
  if (!state.playing || state.modal) return;
  if (e.pointerType === 'touch') {
    mouse.x = e.clientX; mouse.y = e.clientY;
    touchAim = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0, t: performance.now() };
    updateAimFromPointer();
  } else if (e.button === 0) {
    mouseHeld = true;
    updateAimFromPointer();
    attack();
  }
});
canvas.addEventListener('pointerup', e => {
  if (e.pointerType === 'touch') {
    if (touchAim && e.pointerId === touchAim.id) {
      const quick = performance.now() - touchAim.t < 360 && touchAim.moved < 18;
      touchAim = null;
      if (quick) attack();
    }
  } else if (e.button === 0) mouseHeld = false;
});
canvas.addEventListener('pointercancel', () => { touchAim = null; mouseHeld = false; });
window.addEventListener('pointerup', e => { if (e.pointerType !== 'touch' && e.button === 0) mouseHeld = false; });
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  state.zoom = clamp(state.zoom - Math.sign(e.deltaY) * .085, .68, 1.55);
}, { passive: false });

window.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.code;
  if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(k) && state.playing) e.preventDefault();
  keys.add(k);
  if (e.repeat) return;

  if (k === 'Enter' && state.mode === 'intro') { startFresh(); return; }
  if (k === 'Tab') {
    if (state.playing) state.modal ? closeModal() : openModal('helpModal');
    return;
  }
  if (state.mode !== 'play' || !state.playing) return;
  if (k === 'Escape') { if (state.modal) closeModal(); return; }
  if (state.modal) return;
  if (k === 'KeyE') interact();
  else if (k === 'KeyF') boardUp();
  else if (k === 'KeyC') openCraft();
  else if (k === 'KeyI') openInventory();
  else if (k === 'Space') attack();
});
window.addEventListener('keyup', e => { keys.delete(e.code); });
window.addEventListener('blur', () => { keys.clear(); mouseHeld = false; touchStick.active = false; });

function readMovement() {
  let x = 0, z = 0;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
  if (keys.has('KeyW') || keys.has('ArrowUp')) z -= 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) z += 1;
  if (touchStick.active) { x += touchStick.x; z += touchStick.z; }
  const m = Math.hypot(x, z);
  if (m > 1) { x /= m; z /= m; }
  moveInput.x = x; moveInput.z = z;
  return m > .08;
}

/* ---------------- touch controls ---------------- */
const joy = $('joy');
const joyKnob = joy ? joy.querySelector('b') : null;
let joyId = null;
function joyUpdate(e) {
  const r = joy.getBoundingClientRect();
  let dx = e.clientX - (r.left + r.width / 2);
  let dy = e.clientY - (r.top + r.height / 2);
  const max = r.width * .34, l = Math.hypot(dx, dy);
  if (l > max) { dx = dx / l * max; dy = dy / l * max; }
  touchStick.x = dx / max; touchStick.z = dy / max; touchStick.active = true;
  if (joyKnob) joyKnob.style.transform = `translate(${dx}px,${dy}px)`;
  $('mobile').classList.add('touched');
}
if (joy) {
  joy.addEventListener('pointerdown', e => {
    e.preventDefault(); joyId = e.pointerId;
    joy.setPointerCapture(e.pointerId); joyUpdate(e);
  });
  joy.addEventListener('pointermove', e => { if (e.pointerId === joyId) { e.preventDefault(); joyUpdate(e); } });
  const end = e => {
    if (e.pointerId !== joyId) return;
    joyId = null; touchStick.x = 0; touchStick.z = 0; touchStick.active = false;
    if (joyKnob) joyKnob.style.transform = 'translate(0,0)';
  };
  joy.addEventListener('pointerup', end);
  joy.addEventListener('pointercancel', end);
  joy.addEventListener('lostpointercapture', end);
}
function bindTouch(id, fn, hold) {
  const el = $(id);
  if (!el) return;
  el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); fn(e); });
  if (hold) {
    el.addEventListener('pointerup', e => { e.preventDefault(); hold(e); });
    el.addEventListener('pointercancel', e => { hold(e); });
  }
}
bindTouch('mAttack', () => attack());
bindTouch('mUse', () => interact());
bindTouch('mBoard', () => boardUp());
bindTouch('mCraft', () => openCraft());
bindTouch('mKit', () => openInventory());
bindTouch('mRun', () => {
  touchSprint = !touchSprint;
  $('mRun').style.color = touchSprint ? '#d6e675' : '';
  $('mRun').textContent = touchSprint ? 'RUN ON' : 'RUN';
});

/* ---------------- runtime update ---------------- */
const clock = new THREE.Clock();
let hudTimer = 0, promptTimer = 0, bootReady = false;

function nightFactorAt(t) {
  return smoothstep(138, 164, t) * (1 - smoothstep(372, 390, t));
}

function spawnNightWave(count) {
  let alive = zombies.reduce((n, z) => n + (z.alive ? 1 : 0), 0);
  if (alive >= 30) return;
  count = Math.min(count, 30 - alive);
  for (let i = 0; i < count; i++) {
    const base = NIGHT_SPAWNS[(state.waveN + i) % NIGHT_SPAWNS.length];
    let gx = base[0], gy = base[1];
    for (let tries = 0; tries < 8; tries++) {
      const tx = base[0] + (Math.random() - .5) * 4, ty = base[1] + (Math.random() - .5) * 4;
      if (!isSolid(Math.floor(tx), Math.floor(ty))) { gx = tx; gy = ty; break; }
    }
    const z = spawnZombie(gx, gy, { runner: Math.random() < .16 + state.waveN * .015, alert: 8 });
    z.alert = 8;
  }
}

function onNightfall() {
  state.night = true;
  state.waveT = 9;
  state.waveN = 0;
  audio.nightfall();
  toast('Nightfall. The dead are waking. Get inside.', true, 4600);
  spawnNightWave(5);
  updateHud();
}

function updateDayCycle(dt) {
  state.dayTime += dt;
  const nf = nightFactorAt(state.dayTime);
  state.nightFactor = damp(state.nightFactor, nf, 2.2, dt);
  if (!state.nightVisual || Math.abs(state.nightVisual - state.nightFactor) > .012) {
    state.nightVisual = state.nightFactor;
    world.setNight(state.nightFactor);
    audio.setNight(state.nightFactor);
  }
  if (state.dayTime >= 390) {
    endGame(true, 'dawn');
    return false;
  }
  const nightNow = state.dayTime >= 150;
  if (nightNow && !state.night) onNightfall();
  if (state.night) {
    state.waveT -= dt;
    if (state.waveT <= 0) {
      state.waveN++;
      spawnNightWave(2 + Math.min(4, Math.floor(state.waveN * .8)));
      state.waveT = Math.max(15, 30 - state.waveN * 1.6);
      if (state.waveN === 2) toast('More of them are coming out of the dark.', true, 3200);
    }
    state.threatT -= dt;
    if (state.threatT <= 0) {
      audio.groan(.03 + state.nightFactor * .055);
      state.threatT = 3 + Math.random() * 7;
    }
  }
  return true;
}

function updatePlayer(dt) {
  const moving = readMovement();
  const wantSprint = (keys.has('ShiftLeft') || keys.has('ShiftRight') || touchSprint) && moving && player.st > 2;
  const speed = wantSprint ? 3.52 : 2.22;
  if (moving) {
    const step = speed * dt;
    moveActor(player, moveInput.x * step, moveInput.z * step, player.radius);
    player.gx = clamp(player.gx, 1.02, MAPW - 1.02);
    player.gy = clamp(player.gy, 1.02, MAPH - 1.02);
    player.stepT -= dt;
    if (player.stepT <= 0) {
      player.stepT = wantSprint ? .27 : .4;
      audio.step(wantSprint);
      if (wantSprint) noisy(3.4);
    }
  }
  player.speed = damp(player.speed, moving ? speed : 0, 11, dt);
  if (wantSprint) player.st = Math.max(0, player.st - 17 * dt);
  else player.st = Math.min(100, player.st + (moving ? 8 : 15) * dt);
  player.hunger = Math.max(0, player.hunger - .17 * dt);
  if (player.hunger <= 0) player.hp = Math.max(0, player.hp - 1.15 * dt);
  if (player.hp <= 0 && !state.gameOver) { endGame(false, 'death'); return; }

  player.attackCd = Math.max(0, player.attackCd - dt);
  player.attackT = Math.max(0, player.attackT - dt);
  player.hurtT = Math.max(0, player.hurtT - dt);
  if (mouseHeld && !IS_TOUCH) attack();

  const wx = worldX(player.gx), wz = worldZ(player.gy);
  survivor.root.position.set(wx, 0, wz);
  animateSurvivor(survivor, {
    time: clock.elapsedTime, speed: player.speed * CELL, aiming: player.aim,
    attackT: player.attackT, torchOn: state.nightFactor > .05,
  });

  const ax = Math.sin(player.aim), az = Math.cos(player.aim);
  aimRing.position.set(aimPoint.x, .03, aimPoint.z);
  aimRing.visible = state.playing && !state.modal;
  if (state.nightFactor > .02) {
    flash.intensity = state.nightFactor * 4.3 + (state.shotPulse || 0) * 42;
    flash.position.set(wx + ax * .35, 1.5, wz + az * .35);
    flash.target.position.set(wx + ax * 8.5, 0, wz + az * 8.5);
    flash.target.updateMatrixWorld();
  } else flash.intensity = (state.shotPulse || 0) * 30;
  if (state.shotPulse) state.shotPulse = Math.max(0, state.shotPulse - dt);
}

function updateZombies(dt, t) {
  const p = playerWorld();
  for (const z of zombies) {
    if (!z.alive) continue;
    z.hitT = Math.max(0, z.hitT - dt);
    z.attackCd = Math.max(0, z.attackCd - dt);
    z.attackOpen = Math.max(0, z.attackOpen - dt);
    z.openTimer = Math.max(0, (z.openTimer || 0) - dt);
    if (z.hitT <= 0) for (const m of z.model.mats) m.emissiveIntensity = 0;

    const zw = worldOf(z.gx, z.gy);
    const d = Math.hypot(p.x - zw.x, p.z - zw.z);
    const los = d < 34 && world.lineOfSight(zw.x, zw.z, p.x, p.z);
    if (los && d < (state.night ? 34 : 21)) z.alert = Math.max(z.alert, 2.8);
    if (state.night) z.alert = Math.max(z.alert, 2.2);
    z.alert = Math.max(0, z.alert - dt);

    let dir = null, wantAim = z.aim, openTarget = null;
    if (z.alert > 0) {
      // They try what is in their way first: doors and windows get smashed.
      if (d > 2.2) {
        for (const o of [world.safeDoor, ...world.safeWindows]) {
          if (!o || o.secure || o.breached || (o.collider && !o.collider.active)) continue;
          const ow = worldOf(o.gx + .5, o.gy + .5);
          const od = Math.hypot(ow.x - zw.x, ow.z - zw.z);
          if (od < 1.75) { openTarget = o; openTarget.ow = ow; openTarget.od = od; break; }
        }
      }
      if (openTarget) {
        wantAim = Math.atan2(openTarget.ow.x - zw.x, openTarget.ow.z - zw.z);
        dir = { x: 0, z: 0 };
        if (z.openTimer <= 0) {
          z.openTimer = 1.45;
          z.attackOpen = .38;
          const res = world.damageOpening(openTarget, 17 + (z.runner ? 8 : 0));
          audio.hit();
          if (res === 'breached') {
            toast(`The dead are through the ${openTarget.kind === 'window' ? 'window' : 'door'}!`, true, 3400);
            audio.gore();
          }
        }
      } else if (los && d < 12) {
        const dx = p.x - zw.x, dz = p.z - zw.z, l = Math.hypot(dx, dz) || 1;
        dir = { x: dx / l, z: dz / l };
      } else {
        const n = flowNext(z);
        if (n) {
          const dx = (n.x + .5) - z.gx, dz = (n.y + .5) - z.gy, l = Math.hypot(dx, dz) || 1;
          dir = { x: dx / l, z: dz / l };
        } else {
          const dx = p.x - zw.x, dz = p.z - zw.z, l = Math.hypot(dx, dz) || 1;
          dir = { x: dx / l, z: dz / l };
        }
      }
      if (dir && (dir.x || dir.z)) {
        const wob = Math.sin(t * 1.4 + z.model.phase) * .11;
        const c = Math.cos(wob), s = Math.sin(wob);
        dir = { x: dir.x * c - dir.z * s, z: dir.x * s + dir.z * c };
        wantAim = Math.atan2(dir.x, dir.z);
      }
      if (d < 1.05 && z.attackCd <= 0) {
        z.attackCd = 1.35;
        z.attackOpen = .34;
        z.aim = Math.atan2(p.x - zw.x, p.z - zw.z);
        hurt(7 + Math.floor(Math.random() * 8) + (z.runner ? 3 : 0));
      }
    } else {
      z.roamT -= dt;
      if (z.roamT <= 0) { z.roamT = 1.6 + Math.random() * 3.2; z.roamA = Math.random() * Math.PI * 2; }
      dir = { x: Math.sin(z.roamA), z: Math.cos(z.roamA) };
      wantAim = z.roamA;
    }

    const baseSpeed = z.runner ? 1.56 : 1.08;
    let speed = z.alert > 0 ? baseSpeed : baseSpeed * .3;
    if (z.hitT > 0) speed *= .62;
    if (openTarget) speed = 0;
    if (dir && speed > 0) moveActor(z, dir.x * speed * dt, dir.z * speed * dt, .29);
    z.gx = clamp(z.gx, 1.02, MAPW - 1.02);
    z.gy = clamp(z.gy, 1.02, MAPH - 1.02);
    z.speedNow = speed;
    z.aim += angleDiff(wantAim, z.aim) * Math.min(1, dt * 8);
    z.model.root.position.set(worldX(z.gx), 0, worldZ(z.gy));
    animateZombie(z.model, { time: t, speed: speed * CELL, aiming: z.aim, lunge: z.attackOpen > 0 });
  }
}

function updateCorpses(dt) {
  for (const z of corpses) {
    z.deadT = Math.min(1, (z.deadT || 0) + dt * 2.6);
    const k = smoothstep(0, 1, z.deadT);
    z.model.root.rotation.x = -k * 1.5;
    z.model.root.position.y = k * .18;
  }
}

function updateCamera(dt, t) {
  const p = playerWorld();
  const dist = 1 / state.zoom;
  const tx = p.x, tz = p.z;
  const camX = tx + Math.sin(t * .045) * .22;
  const camY = 20.4 * dist;
  const camZ = tz + 13.2 * dist;
  camera.position.x = damp(camera.position.x, camX, 5.5, dt);
  camera.position.y = damp(camera.position.y, camY, 4.5, dt);
  camera.position.z = damp(camera.position.z, camZ, 5.5, dt);
  if (state.shake > .002) {
    const s = state.shake;
    camera.position.x += (Math.random() - .5) * s;
    camera.position.y += (Math.random() - .5) * s * .6;
    camera.position.z += (Math.random() - .5) * s;
    state.shake = Math.max(0, state.shake - dt * 1.7);
  }
  camera.lookAt(tx, .15, tz - 1.5);
  const wantFov = SMALL() ? 48 : 42;
  if (Math.abs(camera.fov - wantFov) > .05) { camera.fov = wantFov; camera.updateProjectionMatrix(); }
}

function introCamera(dt, t) {
  const c = worldOf(9.5, 28.0);
  const a = .35 + t * .055;
  const r = 17;
  const tx = c.x + Math.sin(a) * r;
  const tz = c.z + Math.cos(a) * r;
  camera.position.x = damp(camera.position.x, tx, 1.2, dt);
  camera.position.y = damp(camera.position.y, 13.8, 1.2, dt);
  camera.position.z = damp(camera.position.z, tz, 1.2, dt);
  camera.lookAt(c.x, .4, c.z - 2.5);
}

function updateReticle() {
  if (IS_TOUCH) return;
  const target = nearestZombieInCone(9, .22);
  ui.reticle.classList.toggle('enemy', !!target);
}

function updateGame(dt, t) {
  if (!updateDayCycle(dt)) return;
  updatePlayer(dt);
  if (!state.playing) return;

  state.flowT -= dt;
  if (state.flowT <= 0) { computeFlow(); state.flowT = .42; }

  updateZombies(dt, t);
  updateCorpses(dt);

  hudTimer -= dt;
  if (hudTimer <= 0) { hudTimer = .16; updateHud(); updateReticle(); }
  promptTimer -= dt;
  if (promptTimer <= 0) { promptTimer = .1; updatePrompt(); }

  state.saveT -= dt;
  if (state.saveT <= 0) { state.saveT = 12; saveGame(); }
}

/* ---------------- run flow ---------------- */
function startFresh() {
  clearSave();
  beginRun(null);
}
function beginRun(saved) {
  audio.init();
  const intro = $('intro');
  intro.style.opacity = '0';
  intro.style.pointerEvents = 'none';
  setTimeout(() => { intro.style.display = 'none'; }, 620);
  $('ending').style.display = 'none';
  gameEl.classList.add('playing', 'ready');
  state.mode = 'play'; state.playing = true; state.gameOver = false; state.modal = false;
  state.saveT = 10;
  if (saved) applySave(saved);
  state.night = state.dayTime >= 150 && state.dayTime < 390;
  state.nightFactor = nightFactorAt(state.dayTime);
  state.nightVisual = -1;
  if (state.night) { state.waveT = 10; spawnNightWave(4); }
  updateAimFromPointer();
  updateHud(); updateInventoryUI();
  updateCamera(.016, clock.elapsedTime);
  toast(state.night ? 'The county is dark. Hold until dawn.' : 'Find supplies. Board the safehouse before dark.', false, 3800);
  saveGame();
}
function endGame(win, reason) {
  if (state.gameOver) return;
  state.gameOver = true; state.playing = false; state.mode = 'end';
  clearSave();
  gameEl.classList.remove('playing');
  state.modal = false;
  document.querySelectorAll('.modal-wrap').forEach(x => x.classList.remove('open'));
  ui.prompt.classList.remove('show'); ui.prompt2.classList.remove('show');
  const ending = $('ending');
  ending.style.display = 'flex';
  requestAnimationFrame(() => { ending.style.opacity = '1'; });
  const kicker = $('endKicker'), title = $('endTitle'), copy = $('endCopy');
  if (reason === 'dawn') {
    kicker.textContent = 'Day 02 · sunrise';
    title.innerHTML = 'Dawn<span>Broke.</span>';
    copy.textContent = 'You lasted the night. The dead are still out there, but for now the light is yours.';
    audio.win();
  } else if (reason === 'escape') {
    kicker.textContent = 'Engine running · road clear';
    title.innerHTML = 'You<span>Got Out.</span>';
    copy.textContent = 'The pickup coughed once, then caught. Dead County shrinks in the mirror. Somewhere ahead, another town.';
    audio.win();
  } else {
    kicker.textContent = 'End of the road';
    title.innerHTML = "You're<span>Gone.</span>";
    copy.textContent = 'The county keeps its dead. Whatever you carried, whatever you boarded — it was not enough.';
    audio.lose();
  }
  $('endTime').textContent = fmtTime(state.dayTime);
  $('endKills').textContent = state.kills;
  $('endLoot').textContent = state.lootCount;
}

function resize() {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, SMALL() ? 1.5 : 1.8));
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / Math.max(1, innerHeight);
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

/* ---------------- buttons & modals ---------------- */
$('start').addEventListener('click', startFresh);
$('newRun').addEventListener('click', startFresh);
$('continue').addEventListener('click', () => {
  const data = loadSave();
  if (data) beginRun(data);
  else startFresh();
});
$('restart').addEventListener('click', () => { clearSave(); location.reload(); });
$('helpBtn').addEventListener('click', () => { if (state.playing) openModal('helpModal'); });
$('openCraft').addEventListener('click', () => { if (state.playing) openCraft(); });
$('openInventory').addEventListener('click', () => { if (state.playing) openInventory(); });
let soundOn = true;
$('sound').addEventListener('click', () => {
  audio.init();
  soundOn = audio.toggle();
  $('sound').textContent = soundOn ? '♪' : '✕';
  $('sound').style.color = soundOn ? '' : '#7b8477';
});
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
document.querySelectorAll('.modal-wrap').forEach(w => w.addEventListener('pointerdown', e => { if (e.target === w) closeModal(); }));
window.addEventListener('beforeunload', () => { if (state.playing && !state.gameOver) saveGame(); });

/* ---------------- main loop ---------------- */
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), .05);
  const t = clock.elapsedTime;
  if (state.mode === 'intro') {
    introCamera(dt, t);
  } else if (state.mode === 'play' && state.playing && !state.modal) {
    updateGame(dt, t);
    updateCamera(dt, t);
  } else if (state.mode === 'end') {
    updateCorpses(dt);
    updateCamera(dt, t);
  }
  world.tick(dt, t, playerWorld(), state.nightFactor);
  renderer.render(scene, camera);
  if (!bootReady) { bootReady = true; gameEl.classList.add('ready'); }
}

/* ---------------- boot ---------------- */
const existing = loadSave();
if (existing) {
  $('continue').style.display = '';
  $('newRun').style.display = '';
}
resize();
camera.position.set(worldX(9.5) + 6, 14, worldZ(28) + 16);
camera.lookAt(worldX(9.5), .4, worldZ(28));
updateHud();
updateInventoryUI();
updatePrompt();
computeFlow();
requestAnimationFrame(frame);

// Small debug surface used by the automated play-test harness.
window.__lastlight = {
  state, player, resources, world,
  get zombies() { return zombies; },
  get weapon() { return weapon; },
  findNear, interact, attack, boardUp, useCar, startFresh, endGame, setWeapon,
  get save() { return loadSave(); },
};


