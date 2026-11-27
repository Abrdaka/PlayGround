/* LAST LIGHT — top-down survival, main loop & rules */
import * as THREE from '../vendor/three.module.min.js';
import {
  CELL, MAPW, MAPH, cellAt, isSolid, pathBlocked, blocksSight, worldX, worldZ, gridX, gridZ,
  clamp, lerp, smoothstep, damp, dist, angleDiff, mulberry32,
  ZOMBIE_SPAWNS, NIGHT_SPAWNS, LOOT_SPOTS, LANDMARKS
} from './core.js';
import { buildWorld } from './world.js';
import { buildSurvivor, animateSurvivor, buildWeapon, buildZombie, animateZombie, buildTrader, animateTrader } from './actors.js';
import { createAudio } from './audio.js';
import {
  RES_KEYS, ITEMS, GEAR, WEAPONS, RECIPES, PERKS, LOOT_TABLES, TRADER_STOCK, QUESTS,
  xpToNext, rollLoot,
} from './survival.js';

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
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, .1, 260);
const world = buildWorld(scene, renderer);
const audio = createAudio();

/* ---------------- player ---------------- */
const START = { gx: 9.5, gy: 29.0 };
const player = {
  gx: START.gx, gy: START.gy, aim: Math.PI, hp: 100, st: 100, hunger: 100,
  attackCd: 0, attackT: 0, stepT: 0, noiseT: 0, speed: 0, radius: .34, hurtT: 0,
  maxHp: 100, maxSt: 100, bleed: 0,
};
let weapon = 'fists';
const resources = {};
for (const k of RES_KEYS) resources[k] = 0;
resources.dukes = 12;
const gear = {};                 // books and other one-off items
const owned = new Set(['fists']); // weapons the survivor owns
const wstate = {};                // per-weapon { level, cond }
const state = {
  mode: 'intro', playing: false, modal: false, night: false, nightFactor: 0,
  dayTime: 0, kills: 0, lootCount: 0, zoom: 1, gameOver: false, shake: 0,
  flowT: 0, flowCell: '', waveT: 0, waveN: 0, threatT: 0, saveT: 0, introT: 0,
  lastHurt: 0, bodyHurt: false, clockMin: -1,
  level: 1, xp: 0, points: 0, perks: {}, unlocked: {},
  armor: 0, traderMet: false, questClaimed: {}, traderTab: 'buy',
  traderStock: TRADER_STOCK.map(s => ({ ...s })),
  wasInCamp: false, shotPulse: 0, nightVisual: 0,
};

const survivor = buildSurvivor();
scene.add(survivor.root);
survivor.root.position.set(worldX(player.gx), 0, worldZ(player.gy));
survivor.root.rotation.y = player.aim;

const weaponModels = {};
for (const k of Object.keys(WEAPONS)) {
  if (k === 'fists') continue;
  const m = buildWeapon(k);
  m.visible = false;
  survivor.weaponMount.add(m);
  weaponModels[k] = m;
}

// Mercer stands behind his counter all night. He is scenery, not a combatant.
const traderNpc = buildTrader();
traderNpc.root.position.set(world.traderSpot.wx, 0, world.traderSpot.wz - 1.35);
scene.add(traderNpc.root);

const flash = new THREE.SpotLight(0xffe8c0, 0, 26, .44, .55, 1.15);
flash.castShadow = true;
flash.shadow.mapSize.set(512, 512);
flash.shadow.bias = -.0015;
flash.shadow.camera.near = .4;
flash.shadow.camera.far = 32;
scene.add(flash, flash.target);

// A soft overhead pool keeps the survivor readable in the dark without
// washing out the night. It reads as sky/bounce light, not a lamp.
const playerLight = new THREE.PointLight(0xcfdac2, 0, 6.2, 2);
scene.add(playerLight);

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
function spawnStartingZombies() {
  for (let i = 0; i < ZOMBIE_SPAWNS.length - 2; i++) {
    const [gx, gy] = ZOMBIE_SPAWNS[i];
    spawnZombie(gx + (Math.random() - .5) * .5, gy + (Math.random() - .5) * .5, { runner: i === 3 });
  }
}
spawnStartingZombies();

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
  if (!owned.has(kind)) kind = 'fists';
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
  levelNum: $('levelNum'), xpFill: $('xpFill'), xpNum: $('xpNum'),
  armorState: $('armorState'), weaponCond: $('weaponCond'),
  dukeNum: $('dukeNum'), bookNum: $('bookNum'),
  condFill: $('condFill'), condNum: $('condNum'),
  hotbar: $('hotbar'), bleedChip: $('bleedChip'), floaters: $('floaters'),
  kitDukes: $('kitDukes'), kitBooks: $('kitBooks'), equippedCond: $('equippedCond'), armorSlot: $('armorSlot'),
  bandageBtn: $('bandageBtn'),
  skillLevel: $('skillLevel'), skillXpLabel: $('skillXpLabel'), skillXpFill: $('skillXpFill'),
  skillPoints: $('skillPoints'), perkGrid: $('perkGrid'), bookList: $('bookList'), bookHint: $('bookHint'),
  traderDukes: $('traderDukes'), traderBody: $('traderBody'), traderLine: $('traderLine'),
  workbenchBody: $('workbenchBody'),
};
const INVENTORY_MAX = 50;
const WEAPON_KEYS = Object.keys(WEAPONS);
const wname = k => WEAPONS[k]?.name || 'Fists';

/* ---------------- survival helpers ---------------- */
function perkLvl(id) { return state.perks[id] || 0; }
function lootLuck() { return 1 + perkLvl('scavenger') * .08; }
function dealerMult() { return 1 + perkLvl('dealer') * .1; }
function bookIdForUnlock(key) { return Object.keys(GEAR).find(id => GEAR[id].unlock === key) || null; }
function unlockName(key) { const id = bookIdForUnlock(key); return id ? GEAR[id].name : key; }
function gearCount() { return Object.values(gear).reduce((n, v) => n + v, 0); }
function bookCount() { return Object.entries(gear).filter(([id]) => GEAR[id]?.kind === 'book').reduce((n, [, v]) => n + v, 0); }
function inventoryUsed() {
  let n = 0;
  for (const [k, v] of Object.entries(resources)) n += (Number(v) || 0) * (ITEMS[k]?.weight || 0);
  for (const [k, v] of Object.entries(gear)) n += (Number(v) || 0) * (GEAR[k]?.weight || 0);
  return n;
}
function addGear(id, qty = 1) {
  const g = GEAR[id];
  if (!g) return;
  if (g.kind === 'weapon') { for (let i = 0; i < qty; i++) grantWeapon(g.weapon); return; }
  gear[id] = (gear[id] || 0) + qty;
}
function grantWeapon(kind) {
  if (!WEAPONS[kind] || kind === 'fists') return;
  if (owned.has(kind)) {
    const value = GEAR[`w_${kind}`]?.value || 40;
    resources.dukes += Math.max(3, Math.round(value * .3));
    toast(`Spare ${wname(kind)} traded for dukes.`);
    return;
  }
  owned.add(kind);
  wstate[kind] = { level: 1, cond: 100 };
  setWeapon(kind);
  toast(`Found ${wname(kind)} — equipped.`);
}
function ensureWeaponStates() {
  for (const k of owned) if (k !== 'fists' && !wstate[k]) wstate[k] = { level: 1, cond: 100 };
}
function weaponState(k) { return wstate[k] || { level: 1, cond: 100 }; }
function weaponCond(k) { return k === 'fists' ? 100 : weaponState(k).cond; }
function weaponLevel(k) { return k === 'fists' ? 1 : weaponState(k).level; }
function condMult(k) { return .55 + .45 * clamp(weaponCond(k) / 100, 0, 1); }
function currentWeapon() {
  const base = WEAPONS[weapon] || WEAPONS.fists;
  const lvl = weaponLevel(weapon);
  const perk = base.kind === 'gun' ? perkLvl('marksman') : perkLvl('brawler');
  return {
    ...base,
    dmg: base.dmg * (1 + .18 * (lvl - 1)) * condMult(weapon) * (1 + perk * .08),
    cd: base.cd * Math.max(.7, 1 - perk * .012),
    cone: base.cone * (base.kind === 'gun' ? Math.max(.55, 1 - perk * .07) : 1),
  };
}
function recalcStats() {
  const oldHp = player.maxHp, oldSt = player.maxSt;
  player.maxHp = 100 + perkLvl('toughness') * 8;
  player.maxSt = 100 + perkLvl('runner') * 8;
  if (player.maxHp > oldHp) player.hp += player.maxHp - oldHp;
  player.hp = clamp(player.hp, 0, player.maxHp);
  player.st = clamp(player.st, 0, player.maxSt);
}
function addXp(n) {
  if (!n || state.gameOver) return;
  state.xp += n;
  let leveled = false;
  while (state.xp >= xpToNext(state.level)) {
    state.xp -= xpToNext(state.level);
    state.level++;
    state.points++;
    leveled = true;
  }
  if (leveled) {
    audio.craft();
    toast(`Level ${state.level}. +1 skill point — press K.`, false, 3400);
    updateHud();
  }
}
function floatText(wx, wz, text, crit = false) {
  if (!ui.floaters) return;
  const v = new THREE.Vector3(wx, 1.75, wz).project(camera);
  const el = document.createElement('div');
  el.className = 'floater' + (crit ? ' crit' : '');
  el.textContent = text;
  el.style.left = `${(v.x * .5 + .5) * innerWidth}px`;
  el.style.top = `${(-v.y * .5 + .5) * innerHeight}px`;
  ui.floaters.appendChild(el);
  setTimeout(() => el.remove(), 900);
}
function wearWeapon(k, amount) {
  if (k === 'fists' || !owned.has(k)) return;
  const ws = weaponState(k);
  ws.cond = Math.max(0, ws.cond - amount);
  if (ws.cond <= 0) {
    owned.delete(k); delete wstate[k];
    toast(`${wname(k)} broke.`, true, 2800);
    if (weapon === k) setWeapon('fists');
  }
}
function selectSlot(index) {
  const list = WEAPON_KEYS.filter(k => owned.has(k));
  const k = list[index];
  if (k) setWeapon(k);
}
function cycleWeapon() {
  const list = WEAPON_KEYS.filter(k => owned.has(k));
  if (list.length < 2) return;
  const i = Math.max(0, list.indexOf(weapon));
  setWeapon(list[(i + 1) % list.length]);
}

/* ---------------- HUD & dialog ---------------- */
let toastTimer = 0;
function toast(msg, warn = false, ms = 2300) {
  ui.toast.textContent = msg;
  ui.toast.classList.toggle('warn', warn);
  ui.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('show'), ms);
}
function pips(n, max = 3) {
  let s = '';
  for (let i = 0; i < max; i++) s += `<span class="pip ${i < n ? 'on' : ''}"></span>`;
  return s;
}
let hotbarSig = '';
function renderHotbar() {
  if (!ui.hotbar) return;
  const list = WEAPON_KEYS.filter(k => owned.has(k));
  const sig = list.map(k => `${k}:${Math.round(weaponCond(k))}`).join('|') + '|' + weapon;
  if (sig === hotbarSig) return;
  hotbarSig = sig;
  ui.hotbar.innerHTML = list.map((k, i) =>
    `<button class="hslot ${k === weapon ? 'on' : ''}" data-weapon="${k}"><small>${i + 1}</small>${wname(k)}<b>${k === 'fists' ? '—' : Math.round(weaponCond(k)) + '%'}</b></button>`
  ).join('');
  ui.hotbar.querySelectorAll('[data-weapon]').forEach(b => b.onclick = () => { setWeapon(b.dataset.weapon); saveGame(); });
}
function updateInventoryUI() {
  ui.items.innerHTML = Object.keys(ITEMS).filter(k => k !== 'dukes').map(k => {
    const v = resources[k] || 0;
    return `<div class="item${v <= 0 ? ' empty' : ''}"><span>${ITEMS[k].name}</span><span>${v}</span></div>`;
  }).join('');
  const used = inventoryUsed();
  ui.capacity.innerHTML = `<div class="capacity"><span>${Math.round(used)} / ${INVENTORY_MAX} WT</span><div class="capacity-track"><div class="capacity-fill" style="width:${clamp(used / INVENTORY_MAX * 100, 0, 100)}%"></div></div></div>`;
  const cond = weapon === 'fists' ? '—' : Math.round(weaponCond(weapon)) + '%';
  ui.weaponName.textContent = weapon === 'fists' ? 'Fists' : `${wname(weapon)} · L${weaponLevel(weapon)}`;
  if (ui.equippedWeapon) ui.equippedWeapon.textContent = wname(weapon);
  if (ui.equippedCond) ui.equippedCond.textContent = weapon === 'fists' ? 'bare hands' : `condition ${cond} · level ${weaponLevel(weapon)}`;
  if (ui.condFill) ui.condFill.style.width = (weapon === 'fists' ? 0 : weaponCond(weapon)) + '%';
  if (ui.condNum) ui.condNum.textContent = cond;
  if (ui.dukeNum) ui.dukeNum.textContent = Math.round(resources.dukes || 0);
  if (ui.bookNum) ui.bookNum.textContent = bookCount();
  if (ui.kitDukes) ui.kitDukes.textContent = Math.round(resources.dukes || 0);
  if (ui.kitBooks) ui.kitBooks.textContent = bookCount();
  if (ui.armorSlot) ui.armorSlot.textContent = state.armor > 0 ? `Padded +${state.armor}` : 'None';
  if (ui.vehicle) ui.vehicle.textContent = world.car.fueled ? 'Ready to drive' : world.car.repaired ? 'Repaired · no fuel' : 'Dead pickup';
  renderHotbar();
}
function updateHud() {
  const hpPct = clamp(player.hp / player.maxHp * 100, 0, 100);
  const stPct = clamp(player.st / player.maxSt * 100, 0, 100);
  ui.healthFill.style.width = hpPct + '%';
  ui.staminaFill.style.width = stPct + '%';
  ui.hungerFill.style.width = clamp(player.hunger, 0, 100) + '%';
  ui.healthNum.textContent = Math.round(player.hp);
  ui.staminaNum.textContent = Math.round(player.st);
  ui.hungerNum.textContent = Math.round(player.hunger);
  ui.status.textContent = player.hp <= 0 ? 'GONE' : hpPct < 30 ? 'CRITICAL' : hpPct < 60 ? 'HURT' : 'ALIVE';
  const need = xpToNext(state.level);
  if (ui.levelNum) ui.levelNum.textContent = state.level;
  if (ui.xpFill) ui.xpFill.style.width = clamp(state.xp / need * 100, 0, 100) + '%';
  if (ui.xpNum) ui.xpNum.textContent = `${Math.floor(state.xp)}/${need}`;
  if (ui.armorState) ui.armorState.textContent = state.armor > 0 ? `PADDED +${state.armor}` : 'NONE';
  if (ui.weaponCond) ui.weaponCond.textContent = weapon === 'fists' ? '—' : Math.round(weaponCond(weapon)) + '%';
  if (ui.dukeNum) ui.dukeNum.textContent = Math.round(resources.dukes || 0);
  if (ui.bookNum) ui.bookNum.textContent = bookCount();
  const d = world.safeDoor, wins = world.safeWindows;
  ui.doorPips.innerHTML = pips(d ? d.reinforced : 0);
  ui.windowPips.innerHTML = wins.map(w => pips(w.reinforced)).join('&nbsp;');
  const breached = (d && d.breached) || wins.some(w => w.breached);
  const secure = d && d.reinforced >= 3 && wins.every(w => w.reinforced >= 3);
  const partial = (d && d.reinforced > 0) || wins.some(w => w.reinforced > 0);
  ui.perimeter.textContent = breached ? 'BREACHED' : secure ? 'SECURE' : partial ? 'PARTIAL' : 'UNSECURED';
  ui.perimeter.style.color = breached ? '#e26951' : secure ? '#d6e675' : partial ? '#e2b566' : '#9aa493';
  document.body.classList.toggle('hurt', player.hp < player.maxHp * .35 && player.hp > 0);
  ui.threat.classList.toggle('on', (state.night || breached) && state.playing);
  if (state.night || breached) ui.threat.innerHTML = breached ? '<i></i>THEY ARE INSIDE THE HOUSE' : '<i></i>THE DEAD ARE DRAWN TO NOISE';
  if (ui.bleedChip) {
    ui.bleedChip.classList.toggle('show', player.bleed > 0);
    if (player.bleed > 0) ui.bleedChip.innerHTML = `BLEEDING ×${player.bleed} · BANDAGE <b>B</b>`;
  }
  // objective copy
  if (state.playing) {
    if (breached) {
      ui.goal.textContent = 'They are inside. Fight or flee.';
    } else if (state.night) {
      ui.goal.textContent = 'Hold the safehouse until dawn.';
    } else if (state.kills < 3) {
      ui.goal.textContent = 'Scavenge the block. Read manuals. Level up.';
    } else if (secure) {
      ui.goal.textContent = 'Perimeter secure. Trade for gear before nightfall.';
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
  if (Math.hypot(x - world.traderSpot.gx, y - world.traderSpot.gy) < 4.5) return 'MERCER · TRADER CAMP';
  if (Math.hypot(x - world.workbench.gx, y - world.workbench.gy) < 2.6) return 'SAFEHOUSE · WORKBENCH';
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
  if (ui.equippedWeapon) ui.equippedWeapon.textContent = wname(weapon);
  if (ui.equippedCond) ui.equippedCond.textContent = weapon === 'fists' ? 'bare hands' : `${Math.round(weaponCond(weapon))}% · L${weaponLevel(weapon)}`;
  if (ui.armorSlot) ui.armorSlot.textContent = state.armor > 0 ? `Padded +${state.armor}` : 'None';
  if (ui.vehicle) ui.vehicle.textContent = world.car.fueled ? 'Ready to drive' : world.car.repaired ? 'Repaired · no fuel' : 'Dead pickup';
  const resCards = Object.keys(ITEMS).filter(k => k !== 'dukes').map(k => {
    const info = ITEMS[k], v = resources[k] || 0;
    const usable = k === 'food' || k === 'chem';
    return `<div class="inv-card"><div><strong>${info.name}</strong><small>${info.desc} · ${info.weight} wt</small><em>×${v}</em></div><button data-use="${k}" ${usable && v > 0 ? '' : 'disabled'}>${k === 'food' ? 'EAT' : k === 'chem' ? 'USE' : 'STORAGE'}</button></div>`;
  }).join('');
  const gearCards = Object.entries(gear).filter(([, v]) => v > 0).map(([id, v]) => {
    const g = GEAR[id];
    if (!g) return '';
    return `<div class="inv-card"><div><strong>${g.name}</strong><small>${g.desc} · ${g.weight} wt</small><em>×${v}</em></div><button data-read="${id}" ${g.kind === 'book' ? '' : 'disabled'}>${g.kind === 'book' ? 'READ' : 'KEPT'}</button></div>`;
  }).join('');
  ui.inventoryGrid.innerHTML = resCards + gearCards;
  ui.inventoryGrid.querySelectorAll('[data-use]').forEach(b => b.onclick = () => useItem(b.dataset.use));
  ui.inventoryGrid.querySelectorAll('[data-read]').forEach(b => b.onclick = () => { readBook(b.dataset.read); renderInventoryModal(); });
  if (ui.bandageBtn) {
    ui.bandageBtn.style.display = player.bleed > 0 ? '' : 'none';
    ui.bandageBtn.textContent = `BANDAGE · 2 CLOTH [B]`;
    ui.bandageBtn.onclick = () => { bandage(); renderInventoryModal(); };
  }
}
function openModal(id) {
  state.modal = true;
  gameEl.classList.add('modal-open');
  ui.prompt.classList.remove('show'); ui.prompt2.classList.remove('show');
  $(id).classList.add('open');
  if (id === 'inventoryModal') renderInventoryModal();
  if (id === 'skillsModal') renderSkills();
  if (id === 'traderModal') renderTrader();
  if (id === 'workbenchModal') renderWorkbench();
}
function closeModal() {
  state.modal = false;
  gameEl.classList.remove('modal-open');
  document.querySelectorAll('.modal-wrap').forEach(x => x.classList.remove('open'));
}
function openCraft() { renderRecipes(); openModal('craftModal'); }
function openInventory() { renderInventoryModal(); openModal('inventoryModal'); }
function openSkills() { renderSkills(); openModal('skillsModal'); }
function openTrader() { state.traderMet = true; renderTrader(); openModal('traderModal'); }
function openWorkbench() { renderWorkbench(); openModal('workbenchModal'); }
function nearBench() {
  const p = playerWorld();
  return Math.hypot(world.workbench.wx - p.x, world.workbench.wz - p.z) < 3.2;
}
function renderRecipes() {
  ui.recipes.innerHTML = RECIPES.map(r => {
    const unlocked = !r.book || state.unlocked[r.book];
    const atBench = !r.bench || nearBench();
    const afford = Object.entries(r.cost).every(([k, v]) => (resources[k] || 0) >= v);
    const ok = unlocked && atBench && afford;
    const needs = Object.entries(r.cost).map(([k, v]) => `${v} ${ITEMS[k]?.name || k}`).join(' · ');
    const lockNote = !unlocked ? `<br><span style="color:#e2b566">LOCKED · READ ${unlockName(r.book).toUpperCase()}</span>`
      : !atBench ? '<br><span style="color:#e2b566">REQUIRES SAFEHOUSE WORKBENCH</span>' : '';
    return `<div class="recipe"><div><strong>${r.name}</strong><small>${r.desc}<br>NEEDS ${needs}${lockNote}</small></div><button data-recipe="${r.id}" ${ok ? '' : 'disabled'}>${!unlocked ? 'LOCKED' : !atBench ? 'BENCH' : ok ? 'CRAFT' : 'MISSING'}</button></div>`;
  }).join('');
  ui.recipes.querySelectorAll('[data-recipe]').forEach(b => b.onclick = () => craft(b.dataset.recipe));
}
function craft(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return;
  if (r.book && !state.unlocked[r.book]) { toast(`Recipe locked. Read ${unlockName(r.book)}.`, true); return; }
  if (r.bench && !nearBench()) { toast('That recipe needs the safehouse workbench.', true); return; }
  if (!Object.entries(r.cost).every(([k, v]) => (resources[k] || 0) >= v)) { toast('Missing materials.', true); return; }
  for (const [k, v] of Object.entries(r.cost)) resources[k] -= v;
  const g = r.gives || {};
  if (g.weapon) grantWeapon(g.weapon);
  if (g.nails) resources.nails = (resources.nails || 0) + g.nails;
  if (g.ammo) resources.ammo = (resources.ammo || 0) + g.ammo;
  if (g.heal) {
    const heal = g.heal * (1 + perkLvl('medic') * .2);
    player.hp = Math.min(player.maxHp, player.hp + heal);
    if (g.bandage) player.bleed = 0;
  }
  if (g.armor) state.armor = Math.min(5, state.armor + g.armor);
  addXp(r.xp || 5);
  audio.craft(); noisy(4);
  toast(`${r.name} made.${g.weapon ? '' : ' +' + (g.nails || g.ammo || g.heal || '')}`);
  updateHud(); updateInventoryUI(); renderRecipes();
  saveGame();
}
function useItem(k) {
  if (k === 'food') {
    if ((resources.food || 0) <= 0) return;
    if (player.hunger >= 100 && player.hp >= player.maxHp) { toast('No need to eat yet.'); return; }
    resources.food--; player.hunger = Math.min(100, player.hunger + 35); player.hp = Math.min(player.maxHp, player.hp + 5);
    toast('Ate food. Hunger restored.');
  } else if (k === 'chem') {
    if ((resources.chem || 0) <= 0) return;
    if (player.hp >= player.maxHp && player.bleed <= 0) { toast('Health is already full.'); return; }
    resources.chem--; player.hp = Math.min(player.maxHp, player.hp + 25 * (1 + perkLvl('medic') * .2));
    player.bleed = 0;
    toast('Medicine used. Wounds cleaned.');
  } else return;
  audio.pickup(); updateHud(); updateInventoryUI(); renderInventoryModal(); saveGame();
}
function bandage() {
  if (player.bleed <= 0) { toast('Nothing to bandage.'); return; }
  if ((resources.cloth || 0) < 2) { toast('Need 2 cloth to bandage.', true); return; }
  resources.cloth -= 2;
  player.bleed = 0;
  player.hp = Math.min(player.maxHp, player.hp + 10 * (1 + perkLvl('medic') * .2));
  audio.pickup();
  toast('Wound packed. Bleeding stopped.');
  updateHud(); updateInventoryUI(); saveGame();
}

/* ---------------- skills, books & perks ---------------- */
function renderSkills() {
  const need = xpToNext(state.level);
  if (ui.skillLevel) ui.skillLevel.textContent = state.level;
  if (ui.skillXpLabel) ui.skillXpLabel.textContent = `${Math.floor(state.xp)} / ${need} XP TO LEVEL ${state.level + 1}`;
  if (ui.skillXpFill) ui.skillXpFill.style.width = clamp(state.xp / need * 100, 0, 100) + '%';
  if (ui.skillPoints) ui.skillPoints.textContent = `${state.points} PTS`;
  ui.perkGrid.innerHTML = PERKS.map(p => {
    const lvl = perkLvl(p.id);
    const maxed = lvl >= p.max;
    const can = state.points > 0 && !maxed;
    const pips = Array.from({ length: p.max }, (_, i) => `<i class="${i < lvl ? 'on' : ''}"></i>`).join('');
    return `<div class="perk"><strong>${p.name} <span style="font:8px 'DM Mono';color:#98a292">${lvl}/${p.max}</span></strong><small>${p.desc}</small><div class="pips">${pips}</div><button data-perk="${p.id}" ${can ? '' : 'disabled'}>${maxed ? 'MAXED' : can ? '+1 POINT' : 'NO POINTS'}</button></div>`;
  }).join('');
  ui.perkGrid.querySelectorAll('[data-perk]').forEach(b => b.onclick = () => buyPerk(b.dataset.perk));

  const books = Object.entries(gear).filter(([id, v]) => v > 0 && GEAR[id]?.kind === 'book');
  ui.bookList.innerHTML = books.map(([id, v]) => {
    const g = GEAR[id];
    return `<div class="bookrow"><div><strong>${g.name}${v > 1 ? ' ×' + v : ''}</strong><small>${g.desc}</small></div><button data-book="${id}">READ</button></div>`;
  }).join('');
  ui.bookList.querySelectorAll('[data-book]').forEach(b => b.onclick = () => readBook(b.dataset.book));
  if (ui.bookHint) ui.bookHint.style.display = books.length ? 'none' : '';
}
function buyPerk(id) {
  const p = PERKS.find(x => x.id === id);
  if (!p || state.points <= 0 || perkLvl(id) >= p.max) return;
  state.perks[id] = perkLvl(id) + 1;
  state.points--;
  recalcStats();
  audio.craft();
  toast(`${p.name} raised to ${state.perks[id]}.`);
  updateHud(); updateInventoryUI(); renderSkills(); saveGame();
}
function readBook(id) {
  const g = GEAR[id];
  if (!g || g.kind !== 'book' || !(gear[id] > 0)) return;
  gear[id]--;
  if (gear[id] <= 0) delete gear[id];
  const parts = [];
  if (g.unlock) {
    state.unlocked[g.unlock] = true;
    parts.push(`unlocked ${unlockName(g.unlock)} recipes`);
  }
  if (g.perk) {
    const p = PERKS.find(x => x.id === g.perk);
    state.perks[g.perk] = Math.min(p ? p.max : 5, perkLvl(g.perk) + 1);
    parts.push(`+1 ${p ? p.name : g.perk}`);
  }
  addXp(g.xp || 20);
  recalcStats();
  audio.pickup();
  toast(`${g.name} read — ${parts.join(' · ') || '+' + (g.xp || 20) + ' XP'}.`, false, 3400);
  updateHud(); updateInventoryUI(); renderSkills(); saveGame();
}

/* ---------------- trader ---------------- */
const SERVICE_INFO = {
  service_repair: { name: 'Weapon service', desc: 'Restore equipped weapon to 100% condition.' },
  service_armor: { name: 'Armor plating', desc: 'Permanently add +1 armor (max 5).' },
};
function buyPrice(s) {
  return Math.max(1, Math.ceil(s.price * (1 - Math.min(.42, perkLvl('dealer') * .06))));
}
function sellPrice(id) {
  const v = ITEMS[id]?.value ?? GEAR[id]?.value ?? 1;
  return Math.max(1, Math.floor(v * .5 * dealerMult()));
}
function stockInfo(s) {
  if (s.type === 'res') return ITEMS[s.key] || { name: s.key, desc: '' };
  if (s.type === 'gear' || s.type === 'weapon') return GEAR[s.key] || { name: s.key, desc: '' };
  return SERVICE_INFO[s.key] || { name: s.key, desc: '' };
}
function renderTrader() {
  if (ui.traderDukes) ui.traderDukes.textContent = Math.round(resources.dukes || 0);
  document.querySelectorAll('[data-ttab]').forEach(b => b.classList.toggle('on', b.dataset.ttab === state.traderTab));
  const tab = state.traderTab;
  let html = '';
  if (tab === 'buy') {
    html = state.traderStock.map((s, i) => {
      const info = stockInfo(s);
      const sold = s.type !== 'service' && s.qty <= 0;
      const price = buyPrice(s);
      return `<div class="trade-row${sold ? ' owned' : ''}"><div><strong>${info.name}${s.type === 'res' ? ' ×' + s.qty : ''}</strong><small>${info.desc || ''}</small></div><span class="price">${price} D</span><button data-buy="${i}" ${!sold && (resources.dukes || 0) >= price ? '' : 'disabled'}>${sold ? 'SOLD' : 'BUY'}</button></div>`;
    }).join('');
    ui.traderBody.innerHTML = html + '<div class="emptyhint">Dukes come from looting, selling salvage and contracts. The trader does not extend credit.</div>';
    ui.traderBody.querySelectorAll('[data-buy]').forEach(b => b.onclick = () => buyStock(Number(b.dataset.buy)));
  } else if (tab === 'sell') {
    const rows = [];
    for (const [id, qty] of Object.entries(resources)) {
      if (id === 'dukes' || qty <= 0 || !ITEMS[id]) continue;
      rows.push(`<div class="trade-row"><div><strong>${ITEMS[id].name} ×${qty}</strong><small>${ITEMS[id].desc}</small></div><span class="price">${sellPrice(id)} D each</span><button data-sell="${id}">SELL ${qty > 1 ? '×' + qty : ''}</button></div>`);
    }
    for (const [id, qty] of Object.entries(gear)) {
      if (qty <= 0 || !GEAR[id]) continue;
      rows.push(`<div class="trade-row"><div><strong>${GEAR[id].name} ×${qty}</strong><small>${GEAR[id].desc}</small></div><span class="price">${sellPrice(id)} D each</span><button data-sell="${id}">SELL 1</button></div>`);
    }
    ui.traderBody.innerHTML = rows.join('') || '<div class="emptyhint">Nothing worth trading. Go scavenge.</div>';
    ui.traderBody.querySelectorAll('[data-sell]').forEach(b => b.onclick = () => sellItem(b.dataset.sell));
  } else {
    ui.traderBody.innerHTML = QUESTS.map(q => {
      const done = !!state.questClaimed[q.id];
      let prog = '', ready = false;
      if (q.id === 'cull') {
        prog = `${Math.min(8, state.kills)} / 8 infected`;
        ready = state.kills >= 8;
      } else if (q.id === 'supply') {
        prog = `${Math.min(4, resources.cloth || 0)} / 4 cloth · ${Math.min(2, resources.food || 0)} / 2 food`;
        ready = (resources.cloth || 0) >= 4 && (resources.food || 0) >= 2;
      }
      const reward = [q.reward.dukes ? `${q.reward.dukes} dukes` : '', q.reward.xp ? `${q.reward.xp} XP` : '', q.reward.ammo ? `${q.reward.ammo} ammo` : '', q.reward.gear ? GEAR[q.reward.gear]?.name : ''].filter(Boolean).join(' · ');
      return `<div class="quest"><strong>${q.name}</strong><small>${q.desc}<br>REWARD ${reward}</small><span class="prog">${done ? 'COMPLETED' : prog}</span><br><button data-quest="${q.id}" ${done || !ready ? 'disabled' : ''}>${done ? 'CLAIMED' : ready ? 'CLAIM REWARD' : 'IN PROGRESS'}</button></div>`;
    }).join('');
    ui.traderBody.querySelectorAll('[data-quest]').forEach(b => b.onclick = () => claimQuest(b.dataset.quest));
  }
}
function buyStock(i) {
  const s = state.traderStock[i];
  if (!s) return;
  const price = buyPrice(s);
  if ((resources.dukes || 0) < price) { toast('Not enough dukes.', true); return; }
  if (s.type !== 'service' && s.qty <= 0) return;
  resources.dukes -= price;
  let bought = true;
  if (s.type === 'res') resources[s.key] = (resources[s.key] || 0) + s.qty;
  else if (s.type === 'gear') addGear(s.key, s.qty);
  else if (s.type === 'weapon') grantWeapon(GEAR[s.key]?.weapon);
  else if (s.key === 'service_repair') {
    if (weapon === 'fists') { bought = false; resources.dukes += price; toast('Equip a weapon before buying a service.', true); }
    else { const ws = weaponState(weapon); ws.cond = 100; toast(`${wname(weapon)} serviced.`); }
  } else if (s.key === 'service_armor') {
    if (state.armor >= 5) { bought = false; resources.dukes += price; toast('Armor is already at maximum.', true); }
    else { state.armor++; s.qty--; toast(`Armor plating fitted · +${state.armor}.`); }
  }
  if (bought && s.type !== 'service') s.qty--;
  if (bought) addXp(2);
  audio.pickup();
  updateHud(); updateInventoryUI(); renderTrader(); saveGame();
}
function sellItem(id) {
  let units = 0, gain = 0;
  if (ITEMS[id] && (resources[id] || 0) > 0) {
    units = resources[id];
    gain = sellPrice(id) * units;
    resources[id] = 0;
  } else if (GEAR[id] && (gear[id] || 0) > 0) {
    units = 1;
    gain = sellPrice(id);
    gear[id]--;
    if (gear[id] <= 0) delete gear[id];
  }
  if (!units) return;
  resources.dukes = (resources.dukes || 0) + gain;
  audio.pickup();
  toast(`Sold ${units} × ${ITEMS[id]?.name || GEAR[id]?.name} for ${gain} dukes.`);
  updateHud(); updateInventoryUI(); renderTrader(); saveGame();
}
function claimQuest(id) {
  const q = QUESTS.find(x => x.id === id);
  if (!q || state.questClaimed[id]) return;
  let ready = false;
  if (id === 'cull') ready = state.kills >= 8;
  if (id === 'supply') ready = (resources.cloth || 0) >= 4 && (resources.food || 0) >= 2;
  if (!ready) return;
  if (id === 'supply') { resources.cloth -= 4; resources.food -= 2; }
  state.questClaimed[id] = true;
  resources.dukes = (resources.dukes || 0) + (q.reward.dukes || 0);
  if (q.reward.ammo) resources.ammo = (resources.ammo || 0) + q.reward.ammo;
  if (q.reward.gear) addGear(q.reward.gear, 1);
  addXp(q.reward.xp || 0);
  audio.craft();
  toast(`Contract complete — ${q.name}.`);
  updateHud(); updateInventoryUI(); renderTrader(); saveGame();
}

/* ---------------- workbench ---------------- */
function discountCost(c) {
  const m = 1 - Math.min(.4, perkLvl('mechanic') * .08);
  const out = {};
  for (const [k, v] of Object.entries(c)) out[k] = Math.max(1, Math.ceil(v * m));
  return out;
}
function costText(c) { return Object.entries(c).map(([k, v]) => `${v} ${ITEMS[k]?.name || k}`).join(' + '); }
function canAfford(c) { return Object.entries(c).every(([k, v]) => (resources[k] || 0) >= v); }
function payCost(c) { for (const [k, v] of Object.entries(c)) resources[k] = (resources[k] || 0) - v; }
function repairCost(k) {
  const missing = 100 - weaponCond(k);
  return discountCost({ scrap: Math.max(1, Math.ceil(missing / 18)), parts: missing > 55 ? 1 : 0 });
}
function upgradeCost(k) {
  const lvl = weaponLevel(k);
  return discountCost({ scrap: 2 + lvl * 2, parts: lvl, nails: lvl * 2 });
}
function renderWorkbench() {
  const weapons = WEAPON_KEYS.filter(k => k !== 'fists' && owned.has(k));
  let html = weapons.map(k => {
    const ws = weaponState(k);
    const rc = repairCost(k), uc = upgradeCost(k);
    const armor = ws.cond < 100;
    return `<div class="wb-row"><div><strong>${wname(k)} · L${ws.level}</strong><small>condition ${Math.round(ws.cond)}% · damage ×${(1 + .18 * (ws.level - 1)).toFixed(2)}</small><div class="meter"><i class="${ws.cond < 35 ? 'low' : ''}" style="width:${clamp(ws.cond, 0, 100)}%"></i></div></div><div class="wb-actions"><button data-repair="${k}" ${armor && canAfford(rc) ? '' : 'disabled'}>REPAIR · ${costText(rc)}</button><button data-upgrade="${k}" ${ws.level >= 3 || !canAfford(uc) ? 'disabled' : ''}>${ws.level >= 3 ? 'MAX LEVEL' : `UPGRADE L${ws.level + 1} · ${costText(uc)}`}</button></div></div>`;
  }).join('');
  if (!weapons.length) html = '<div class="emptyhint">No weapons owned yet. Craft a shiv at the bench, or scavenge one from the county.</div>';
  const armorCost = discountCost({ cloth: 2 + state.armor * 2, leather: 1 + state.armor });
  html += `<div class="wb-row"><div><strong>Padded jacket · armor ${state.armor}/5</strong><small>Each layer reduces incoming damage by 9%.${state.armor >= 5 ? ' Maximum protection.' : ''}</small></div><div class="wb-actions"><button data-armor="1" ${state.armor >= 5 || !canAfford(armorCost) ? 'disabled' : ''}>${state.armor >= 5 ? 'MAX ARMOR' : `REINFORCE · ${costText(armorCost)}`}</button></div></div>`;
  ui.workbenchBody.innerHTML = html;
  ui.workbenchBody.querySelectorAll('[data-repair]').forEach(b => b.onclick = () => repairWeapon(b.dataset.repair));
  ui.workbenchBody.querySelectorAll('[data-upgrade]').forEach(b => b.onclick = () => upgradeWeapon(b.dataset.upgrade));
  ui.workbenchBody.querySelectorAll('[data-armor]').forEach(b => b.onclick = () => reinforceArmor());
}
function repairWeapon(k) {
  if (!owned.has(k)) return;
  const c = repairCost(k);
  if (!canAfford(c)) { toast('Missing repair materials.', true); return; }
  payCost(c);
  weaponState(k).cond = 100;
  addXp(4); audio.craft();
  toast(`${wname(k)} restored to full condition.`);
  updateHud(); updateInventoryUI(); renderWorkbench(); saveGame();
}
function upgradeWeapon(k) {
  if (!owned.has(k)) return;
  const ws = weaponState(k);
  if (ws.level >= 3) return;
  const c = upgradeCost(k);
  if (!canAfford(c)) { toast('Missing upgrade materials.', true); return; }
  payCost(c);
  ws.level++; ws.cond = Math.min(100, ws.cond + 20);
  addXp(10); audio.craft();
  toast(`${wname(k)} upgraded to level ${ws.level}.`);
  updateHud(); updateInventoryUI(); renderWorkbench(); saveGame();
}
function reinforceArmor() {
  if (state.armor >= 5) return;
  const c = discountCost({ cloth: 2 + state.armor * 2, leather: 1 + state.armor });
  if (!canAfford(c)) { toast('Need more cloth and leather.', true); return; }
  payCost(c);
  state.armor++;
  addXp(8); audio.craft();
  toast(`Jacket reinforced · armor ${state.armor}/5.`);
  updateHud(); updateInventoryUI(); renderWorkbench(); saveGame();
}

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
    if (!it.active) return null;
    return { primary: 'SCAVENGE · ' + it.label.toUpperCase(), secondary: null };
  }
  if (it.kind === 'trader') {
    return { primary: 'TRADE WITH MERCER · SAFE GROUND', secondary: null };
  }
  if (it.kind === 'workbench') {
    return { primary: 'USE SAFEHOUSE WORKBENCH', secondary: null };
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
  if (it.kind === 'trader') { openTrader(); return; }
  if (it.kind === 'workbench') { openWorkbench(); return; }
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
  const builder = perkLvl('builder');
  if (builder > 0 && o.hp) {
    o.hp = Math.round(o.hp * (1 + builder * .12));
    o.maxHp = o.hp;
  }
  audio.hammer(); noisy(5);
  toast(o.reinforced >= 3 ? 'Boarded tight. This opening is secure.' : `Boarded · ${o.reinforced}/3. Keep going.`);
  addXp(2);
  updateHud(); updateInventoryUI(); saveGame();
}
function takeLoot(it) {
  if (!it.active) return;
  if (!it.rolled) {
    it.loot = rollLoot(it.type || 'house', it.tier || 1, lootLuck());
    it.rolled = true;
  }
  let room = INVENTORY_MAX - inventoryUsed();
  const lines = [];
  const remaining = {};
  let total = 0;
  for (const [k, v] of Object.entries(it.loot || {})) {
    const info = ITEMS[k] || GEAR[k];
    if (!info) continue;
    const weight = info.weight || 0;
    const available = Math.max(0, Math.floor(Number(v) || 0));
    if (available <= 0) continue;
    let allowed = weight <= 0 ? available : Math.max(0, Math.min(available, Math.floor((room + 1e-9) / weight)));
    if (GEAR[k]?.kind === 'weapon') allowed = Math.min(allowed, 1);
    if (allowed > 0) {
      if (ITEMS[k]) {
        resources[k] = (resources[k] || 0) + allowed;
        lines.push(`+${allowed} ${ITEMS[k].name}`);
      } else {
        addGear(k, allowed);
        lines.push(`+${GEAR[k].name}`);
      }
      total += allowed;
      room -= allowed * weight;
      state.lootCount += allowed;
    }
    if (allowed < available) remaining[k] = available - allowed;
  }
  it.loot = remaining;
  if (total > 0) {
    audio.pickup(); noisy(3);
    addXp(5 + (it.tier || 1) * 2);
    toast(Object.keys(remaining).length ? `Partially scavenged · ${lines.join(' · ')}` : `Scavenged · ${lines.join(' · ')}`, false, 3000);
    if (!Object.keys(remaining).length) {
      it.active = false;
      world.consumeLoot(it);
    }
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
      addXp(15); audio.craft(); noisy(12);
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
function rayHits(angle, range, tol, maxN = 1) {
  const p = playerWorld();
  const dx = Math.sin(angle), dz = Math.cos(angle);
  const found = [];
  for (const z of zombies) {
    if (!z.alive) continue;
    const zw = worldOf(z.gx, z.gy);
    const rx = zw.x - p.x, rz = zw.z - p.z;
    const t = rx * dx + rz * dz;
    if (t < .35 || t > range) continue;
    const perp = Math.abs(rx * dz - rz * dx);
    if (perp > tol) continue;
    if (!world.lineOfSight(p.x, p.z, zw.x, zw.z)) continue;
    found.push({ z, t });
  }
  found.sort((a, b) => a.t - b.t);
  return found.slice(0, maxN);
}
function damageZombie(z, dmg, crit = false) {
  if (!z.alive) return;
  z.hp -= dmg;
  z.hitT = .13;
  z.alert = 8;
  const zw = worldOf(z.gx, z.gy);
  world.addBlood(zw.x + (Math.random() - .5) * .4, zw.z + (Math.random() - .5) * .4, .65 + Math.random() * .35);
  for (const m of z.model.mats) { m.emissive.setHex(0x7a1d13); m.emissiveIntensity = .9; }
  floatText(zw.x, zw.z, `${crit ? 'CRIT ' : ''}${Math.round(dmg)}`, crit);
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
  addXp(z.runner ? 24 : 14);
  player.st = Math.min(player.maxSt, player.st + 4);
  // Some of the dead still carry something worth prying loose.
  if (Math.random() < .28) {
    const bonus = Math.random() < .45 ? 'ammo' : Math.random() < .5 ? 'cloth' : 'dukes';
    const qty = bonus === 'dukes' ? 3 + Math.floor(Math.random() * 8) : 1 + Math.floor(Math.random() * 2);
    resources[bonus] = (resources[bonus] || 0) + qty;
    floatText(zw.x, zw.z, `+${qty} ${ITEMS[bonus].name}`, false);
  }
  corpses.push(z);
  if (corpses.length > 14) {
    const old = corpses.shift();
    if (old && old.model) scene.remove(old.model.root);
  }
}
function hurt(n, opts = {}) {
  if (state.gameOver || state.mode !== 'play') return;
  const armor = Math.min(.55, state.armor * .09);
  const reduced = Math.max(1, n * (1 - armor));
  player.hp = Math.max(0, player.hp - reduced);
  player.hurtT = .3;
  ui.hitflash.classList.add('on');
  setTimeout(() => ui.hitflash.classList.remove('on'), 130);
  state.shake = Math.max(state.shake, .38);
  audio.hurt();
  if (opts.bleed !== false && Math.random() < .38) {
    player.bleed = Math.min(3, player.bleed + 1);
    toast('Bleeding. Press B to bandage.', true, 2400);
  }
  if (player.hp <= 0) endGame(false, 'death');
  else if (player.hp < player.maxHp * .3 && performance.now() - state.lastHurt > 2200) { state.lastHurt = performance.now(); audio.heartbeat(); }
}
function playerInCamp() {
  const p = playerWorld();
  return Math.hypot(p.x - world.traderSpot.wx, p.z - world.traderSpot.wz) < 5.2;
}
function attack() {
  if (!state.playing || state.modal || player.attackCd > 0) return;
  const s = currentWeapon();
  if (s.kind === 'gun' && (resources.ammo || 0) <= 0) {
    audio.empty(); toast('Click. Empty.', true, 1400);
    player.attackCd = .35;
    return;
  }
  if (player.st < s.st) {
    toast('Too winded. Let stamina recover.', true, 1300);
    player.attackCd = .35;
    return;
  }
  if (IS_TOUCH && !state.aimDrag) {
    // touch quality-of-life: snap to the closest ghoul
    const p = playerWorld();
    let best = null, bd = 6.5;
    for (const z of zombies) if (z.alive) {
      const d = Math.hypot(worldX(z.gx) - p.x, worldZ(z.gy) - p.z);
      if (d < bd) { bd = d; best = z; }
    }
    if (best) player.aim = Math.atan2(worldX(best.gx) - p.x, worldZ(best.gy) - p.z);
  }
  player.attackCd = s.cd;
  player.attackT = s.kind === 'gun' ? .16 : .26;
  player.st = Math.max(0, player.st - s.st);
  if (s.noise > 0) noisy(s.noise);
  if (s.kind === 'gun') fireGun(s);
  else swingMelee(s);
  updateHud();
}
function swingMelee(s) {
  audio.swing();
  const z = nearestZombieInCone(s.range, s.cone);
  if (!z) { wearWeapon(weapon, s.wear * .3); return; }
  const crit = Math.random() < s.crit;
  const dmg = s.dmg * (crit ? 1.8 : 1) * (.9 + Math.random() * .2);
  damageZombie(z, dmg, crit);
  const p = playerWorld(), zw = worldOf(z.gx, z.gy);
  const dx = zw.x - p.x, dz = zw.z - p.z, d = Math.hypot(dx, dz) || 1;
  moveActor(z, dx / d * .14, dz / d * .14, .3);
  state.shake = Math.max(state.shake, .16);
  wearWeapon(weapon, s.wear);
}
function fireGun(s) {
  resources.ammo--;
  const p = playerWorld();
  const dirX = Math.sin(player.aim), dirZ = Math.cos(player.aim);
  const from = new THREE.Vector3(p.x + dirX * .55, 1.22, p.z + dirZ * .55);
  const pellets = s.kind === 'shotgun' ? 3 : 1;
  const spread = s.kind === 'shotgun' ? s.cone : s.kind === 'rifle' ? .014 : .022;
  const tol = s.kind === 'shotgun' ? .62 : s.kind === 'rifle' ? .36 : .5;
  const maxTargets = s.pierce || 1;
  const hitMap = new Map();
  let farthest = null, farT = 0;
  for (let i = 0; i < pellets; i++) {
    const a = player.aim + (Math.random() - .5) * spread;
    const hits = rayHits(a, s.range, tol, maxTargets);
    for (const h of hits) {
      const crit = Math.random() < s.crit;
      const dmg = s.dmg * (crit ? 1.8 : 1) * (.9 + Math.random() * .2);
      const cur = hitMap.get(h.z) || { dmg: 0, crit: false };
      cur.dmg += dmg; cur.crit = cur.crit || crit;
      hitMap.set(h.z, cur);
      if (h.t > farT) { farT = h.t; farthest = h.z; }
    }
  }
  const to = farthest
    ? new THREE.Vector3(worldX(farthest.gx), 1.05, worldZ(farthest.gy))
    : new THREE.Vector3(p.x + dirX * s.range, 1.0, p.z + dirZ * s.range);
  world.addTracer(from, to);
  world.flashMuzzle(from.x, from.y, from.z + .2);
  audio.shot();
  state.shake = Math.max(state.shake, s.kind === 'shotgun' ? .36 : .3);
  state.shotPulse = .07;
  for (const [z, info] of hitMap) damageZombie(z, info.dmg, info.crit);
  wearWeapon(weapon, s.wear);
  updateInventoryUI();
}
/* ---------------- save / restore ---------------- */
const SAVE_KEY = 'lastlight.deadcounty.v1';
function saveGame() {
  if (!state.playing || state.gameOver || state.mode !== 'play') return;
  try {
    const data = {
      v: 2, dayTime: state.dayTime, kills: state.kills, lootCount: state.lootCount,
      level: state.level, xp: state.xp, points: state.points,
      perks: { ...state.perks }, unlocked: { ...state.unlocked },
      armor: state.armor, questClaimed: { ...state.questClaimed },
      player: {
        gx: player.gx, gy: player.gy, aim: player.aim, hp: player.hp, st: player.st,
        hunger: player.hunger, bleed: player.bleed,
      },
      resources: { ...resources }, weapon, gear: { ...gear },
      owned: [...owned], wstate: JSON.parse(JSON.stringify(wstate)),
      traderStock: state.traderStock.map(s => ({ key: s.key, qty: s.qty })),
      car: { repaired: world.car.repaired, fueled: world.car.fueled },
      openings: world.openings.map(o => ({
        key: `${o.gx},${o.gy}`, reinforced: o.reinforced, hp: o.hp,
        breached: o.breached, closed: !o.open,
      })),
      loot: world.loot.map(spot => ({ active: spot.active, rolled: !!spot.rolled, loot: { ...spot.loot } })),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) { /* storage unavailable — the run still works */ }
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && Number(data.v) >= 1 ? data : null;
  } catch (e) { return null; }
}
function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}
function savedNumber(value, fallback) {
  return value !== null && value !== undefined && Number.isFinite(Number(value)) ? Number(value) : fallback;
}
function applySave(data) {
  for (const key of Object.keys(resources)) resources[key] = Math.max(0, savedNumber(data.resources?.[key], 0));
  for (const key of Object.keys(gear)) delete gear[key];
  for (const [id, qty] of Object.entries(data.gear || {})) {
    if (GEAR[id] && qty > 0) gear[id] = qty;
  }
  state.level = Math.max(1, savedNumber(data.level, 1));
  state.xp = Math.max(0, savedNumber(data.xp, 0));
  state.points = Math.max(0, savedNumber(data.points, 0));
  state.perks = {};
  for (const p of PERKS) state.perks[p.id] = clamp(savedNumber(data.perks?.[p.id], 0), 0, p.max);
  state.unlocked = {};
  for (const k of Object.keys(data.unlocked || {})) if (data.unlocked[k]) state.unlocked[k] = true;
  state.armor = clamp(savedNumber(data.armor, 0), 0, 5);
  state.questClaimed = { ...(data.questClaimed || {}) };
  state.traderStock = TRADER_STOCK.map(s => {
    const saved = (data.traderStock || []).find(x => x.key === s.key);
    return { ...s, qty: saved ? Math.max(0, savedNumber(saved.qty, s.qty)) : s.qty };
  });
  owned.clear(); owned.add('fists');
  for (const k of data.owned || []) if (WEAPONS[k] && k !== 'fists') owned.add(k);
  for (const k of Object.keys(wstate)) delete wstate[k];
  for (const [k, ws] of Object.entries(data.wstate || {})) {
    if (!WEAPONS[k] || k === 'fists') continue;
    wstate[k] = { level: clamp(savedNumber(ws.level, 1), 1, 3), cond: clamp(savedNumber(ws.cond, 100), 0, 100) };
  }
  ensureWeaponStates();
  recalcStats();
  const p = data.player || {};
  player.gx = clamp(savedNumber(p.gx, START.gx), 1.05, MAPW - 1.05);
  player.gy = clamp(savedNumber(p.gy, START.gy), 1.05, MAPH - 1.05);
  player.aim = savedNumber(p.aim, player.aim);
  player.hp = clamp(savedNumber(p.hp, player.maxHp), 1, player.maxHp);
  player.st = clamp(savedNumber(p.st, player.maxSt), 0, player.maxSt);
  player.hunger = clamp(savedNumber(p.hunger, 100), 0, 100);
  player.bleed = clamp(savedNumber(p.bleed, 0), 0, 3);
  const safe = world.resolveCircle(worldX(player.gx), worldZ(player.gy), player.radius);
  player.gx = gridX(safe.x); player.gy = gridZ(safe.z);
  state.dayTime = Math.max(0, Number(data.dayTime) || 0);
  state.kills = Math.max(0, Number(data.kills) || 0);
  state.lootCount = Math.max(0, Number(data.lootCount) || 0);
  setWeapon(owned.has(data.weapon) ? data.weapon : 'fists');
  world.setCarState(data.car || {});
  for (const s of data.openings || []) {
    const o = world.openings.find(x => `${x.gx},${x.gy}` === s.key);
    if (o) world.setOpeningState(o, s);
  }
  (data.loot || []).forEach((entry, i) => {
    const spot = world.loot[i];
    if (!spot) return;
    spot.loot = { ...(entry.loot || {}) };
    spot.rolled = entry.rolled !== false;
    spot.active = entry.active !== false;
    if (!spot.active) world.consumeLoot(spot);
    else if (spot.marker) { spot.marker.userData.hide = false; spot.marker.visible = true; }
    if (spot.prop) spot.prop.visible = spot.active;
  });
  hotbarSig = '';
  updateHud(); updateInventoryUI();
}
function resetSurvival() {
  for (const key of RES_KEYS) resources[key] = 0;
  resources.dukes = 12;
  for (const key of Object.keys(gear)) delete gear[key];
  owned.clear(); owned.add('fists');
  for (const key of Object.keys(wstate)) delete wstate[key];
  state.level = 1; state.xp = 0; state.points = 0;
  state.perks = {}; state.unlocked = {}; state.armor = 0;
  state.traderMet = false; state.questClaimed = {}; state.traderTab = 'buy';
  state.traderStock = TRADER_STOCK.map(s => ({ ...s }));
  state.kills = 0; state.lootCount = 0; state.dayTime = 0; state.night = false;
  state.nightFactor = 0; state.nightVisual = -1; state.waveT = 0; state.waveN = 0;
  state.threatT = 0; state.clockMin = -1; state.wasInCamp = false;
  state.gameOver = false; state.lastHurt = 0; state.bodyHurt = false;
  state.shake = 0; state.shotPulse = 0; state.flowT = 0; state.flowCell = '';
  player.maxHp = 100; player.maxSt = 100;
  player.hp = 100; player.st = 100; player.hunger = 100; player.bleed = 0;
  player.gx = START.gx; player.gy = START.gy; player.aim = Math.PI;
  player.attackCd = 0; player.attackT = 0; player.hurtT = 0;
  player.stepT = 0; player.noiseT = 0; player.speed = 0;
  world.setCarState({ repaired: false, fueled: false });
  world.setMarketingNight(0);
  clearZombies();
  spawnStartingZombies();
  world.loot.forEach((spot, i) => {
    const def = LOOT_SPOTS[i];
    spot.active = true;
    spot.rolled = !!def?.fixed;
    spot.loot = def?.fixed ? { ...def.fixed } : {};
    if (spot.prop) spot.prop.visible = true;
    if (spot.marker) { spot.marker.userData.hide = false; spot.marker.visible = true; }
  });
  for (const o of world.openings) {
    o.reinforced = 0; o.hp = 100; o.maxHp = 100;
    o.breached = false; o.open = false; o.closed = true;
    world.refreshOpening(o);
    if (o.pivot) o.pivot.rotation.y = 0;
  }
  setWeapon('fists');
  hotbarSig = '';
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
  else if (k === 'KeyK') openSkills();
  else if (k === 'KeyB') bandage();
  else if (k === 'KeyQ') cycleWeapon();
  else if (/^Digit[1-8]$/.test(k)) selectSlot(Number(k.slice(5)) - 1);
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
bindTouch('mSkills', () => openSkills());
bindTouch('mSwap', () => cycleWeapon());
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
  const runner = perkLvl('runner');
  if (wantSprint) player.st = Math.max(0, player.st - (17 - runner * .8) * dt);
  else player.st = Math.min(player.maxSt, player.st + (moving ? 8 : 15) * (1 + runner * .12) * dt);
  player.hunger = Math.max(0, player.hunger - .17 * dt);
  if (player.hunger <= 0) player.hp = Math.max(0, player.hp - 1.15 * dt);
  // Bleeding is the Project Zomboid tax: a fight you win can still kill you.
  if (player.bleed > 0) {
    player.hp = Math.max(0, player.hp - player.bleed * .55 * dt);
    if (Math.random() < dt * .5) world.addBlood(worldX(player.gx), worldZ(player.gy), .25);
  }
  if (player.hp <= 0 && !state.gameOver) { endGame(false, 'death'); return; }

  player.attackCd = Math.max(0, player.attackCd - dt);
  player.attackT = Math.max(0, player.attackT - dt);
  player.hurtT = Math.max(0, player.hurtT - dt);
  if (mouseHeld && !IS_TOUCH) attack();

  const wx = worldX(player.gx), wz = worldZ(player.gy);
  survivor.root.position.set(wx, 0, wz);
  playerLight.position.set(wx, 3.4, wz);
  playerLight.intensity = state.nightFactor * 4.2;
  animateSurvivor(survivor, {
    time: clock.elapsedTime, speed: player.speed * CELL, aiming: player.aim,
    attackT: player.attackT, torchOn: state.nightFactor > .05,
  });

  const ax = Math.sin(player.aim), az = Math.cos(player.aim);
  aimRing.position.set(aimPoint.x, .03, aimPoint.z);
  aimRing.visible = state.playing && !state.modal;
  if (state.nightFactor > .02) {
    flash.intensity = state.nightFactor * 26 + (state.shotPulse || 0) * 60;
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
      if (d < 1.05 && z.attackCd <= 0 && !playerInCamp()) {
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
  resetSurvival();
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
  else { recalcStats(); updateInventoryUI(); updateHud(); }
  state.night = state.dayTime >= 150 && state.dayTime < 390;
  state.nightFactor = nightFactorAt(state.dayTime);
  state.nightVisual = -1;
  if (state.night) { state.waveT = 10; spawnNightWave(4); }
  survivor.root.position.set(worldX(player.gx), 0, worldZ(player.gy));
  updateAimFromPointer();
  updateHud(); updateInventoryUI();
  updateCamera(.016, clock.elapsedTime);
  toast(state.night ? 'The county is dark. Hold until dawn.' : 'Find supplies. Read manuals. Board the safehouse before dark.', false, 4200);
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
  if ($('endLevel')) $('endLevel').textContent = state.level;
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
$('openCraft')?.addEventListener('click', () => { if (state.playing) openCraft(); });
$('openInventory')?.addEventListener('click', () => { if (state.playing) openInventory(); });
$('openSkills')?.addEventListener('click', () => { if (state.playing) openSkills(); });
$('openSkillsFromKit')?.addEventListener('click', () => { if (state.playing) openSkills(); });
$('bandageBtn')?.addEventListener('click', () => bandage());
document.querySelectorAll('[data-ttab]').forEach(b => b.addEventListener('click', () => {
  state.traderTab = b.dataset.ttab;
  renderTrader();
}));
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
  if (state.mode !== 'intro') {
    const tp = worldOf(world.traderSpot.gx, world.traderSpot.gy);
    const pp = playerWorld();
    const wantAim = Math.atan2(pp.x - tp.x, pp.z - tp.z);
    traderNpc.root.rotation.y += angleDiff(wantAim, traderNpc.root.rotation.y) * Math.min(1, dt * 2.2);
  }
  animateTrader(traderNpc, t);
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
  state, player, resources, world, renderer, scene, camera,
  get zombies() { return zombies; },
  get weapon() { return weapon; },
  get owned() { return [...owned]; },
  get gear() { return { ...gear }; },
  get wstate() { return JSON.parse(JSON.stringify(wstate)); },
  findNear, interact, attack, boardUp, useCar, startFresh, endGame, setWeapon,
  spawnZombie, saveGame, craft, hurt, updateHud,
  takeLoot, addXp, grantWeapon, openTrader, openWorkbench, openSkills, readBook,
  buyPerk, buyStock, sellItem, claimQuest, repairWeapon, upgradeWeapon, bandage, addGear,
  get save() { return loadSave(); },
};


