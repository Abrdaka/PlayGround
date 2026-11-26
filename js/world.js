/* LAST LIGHT — builds the whole county scene & exposes its systems */
import * as THREE from '../vendor/three.module.min.js';
import {
  CELL, MAPW, MAPH, WALL_H, WALL_T, cellAt, isWallChar, isSolid, blocksSight,
  worldX, worldZ, clamp, lerp, damp, smoothstep, mulberry32, LOOT_SPOTS, LANDMARKS
} from './core.js';
import { buildTextures, TEX } from './textures.js';
import { createPropKit } from './props.js';
import { dressWorld } from './setdress.js';
import { createRain, createBlood, createTracers, createMuzzle, createDust } from './fx.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const isEdge = (x, y) => { const c = cellAt(x, y); return isWallChar(c) || c === 'D' || c === 'W' || c === 'd'; };

export function buildWorld(scene, renderer) {
  buildTextures();
  const kit = createPropKit(TEX);
  const colliders = [];
  const markers = [];
  const raycaster = new THREE.Raycaster();

  const addBox = (x, z, hw, hd, kind = 'prop') => { const c = { x, z, hw, hd, kind, active: true, shape: 'box' }; colliders.push(c); return c; };
  const addCircle = (x, z, r, kind = 'prop') => { const c = { x, z, r, kind, active: true, shape: 'circle' }; colliders.push(c); return c; };

  /* ---------------- environment & sky ---------------- */
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envDusk = pmrem.fromEquirectangular(TEX.envDusk).texture;
  const envNight = pmrem.fromEquirectangular(TEX.envNight).texture;
  pmrem.dispose();
  scene.environment = envDusk;
  const bg = new THREE.Color(0x43503f);
  scene.background = bg;
  scene.fog = new THREE.FogExp2(0x43503f, .012);

  const hemi = new THREE.HemisphereLight(0xa9b7ae, 0x2b2f24, 1.0);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0x4d5b58, .36);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xffd6a2, 2.85);
  sun.position.set(-34, 38, 24);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -46; sun.shadow.camera.right = 46;
  sun.shadow.camera.top = 46; sun.shadow.camera.bottom = -46;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 130;
  sun.shadow.bias = -.0006; sun.shadow.normalBias = .035; sun.shadow.radius = 2.2;
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0x6f8790, .35);
  fill.position.set(28, 22, -30); scene.add(fill);

  /* ---------------- ground ---------------- */
  const groundGeo = new THREE.PlaneGeometry(MAPW * CELL, MAPH * CELL);
  groundGeo.rotateX(-Math.PI / 2);
  const bump = TEX.bump.clone(); bump.needsUpdate = true; bump.repeat.set(32, 32);
  const groundMat = new THREE.MeshStandardMaterial({
    map: TEX.ground, bumpMap: bump, bumpScale: .035, roughness: .9, metalness: .04, envMapIntensity: .35
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.receiveShadow = true;
  scene.add(ground);

  /* ---------------- walls ---------------- */
  const buckets = { brick: [], wood: [], plaster: [], fence: [] };
  const matFor = {
    brick: new THREE.MeshStandardMaterial({ map: TEX.brick, bumpMap: TEX.bump, bumpScale: .05, roughness: .94, metalness: .02, envMapIntensity: .4 }),
    wood: new THREE.MeshStandardMaterial({ map: TEX.siding, bumpMap: TEX.bump, bumpScale: .06, roughness: .95, metalness: .02, envMapIntensity: .35 }),
    plaster: new THREE.MeshStandardMaterial({ map: TEX.plaster, bumpMap: TEX.bump, bumpScale: .04, roughness: .96, metalness: .02, envMapIntensity: .35 }),
    fence: new THREE.MeshStandardMaterial({ map: TEX.fence, bumpMap: TEX.bump, bumpScale: .07, roughness: .97, metalness: 0, envMapIntensity: .25 }),
  };
  const wallGeom = new THREE.BoxGeometry(1, 1, 1);
  function pushWall(type, x, z, h, w, d, color) {
    const m = new THREE.Matrix4().compose(V3(x, h / 2, z), new THREE.Quaternion(), V3(w, h, d));
    buckets[type].push({ m, color });
  }
  for (let gy = 0; gy < MAPH; gy++) for (let gx = 0; gx < MAPW; gx++) {
    const ch = cellAt(gx, gy);
    if (!isWallChar(ch)) continue;
    const h = ch === 'f' ? 2.05 : WALL_H;
    const horiz = isEdge(gx - 1, gy) || isEdge(gx + 1, gy);
    const vert = isEdge(gx, gy - 1) || isEdge(gx, gy + 1);
    const x = worldX(gx + .5), z = worldZ(gy + .5);
    const type = ch === '#' ? 'brick' : ch === '|' ? 'wood' : ch === '%' ? 'plaster' : 'fence';
    const rnd = mulberry32(gx * 991 + gy * 37);
    const tint = new THREE.Color(1, 1, 1);
    if (type === 'brick') tint.setHSL(.055, .1, .82 + rnd() * .25);
    else if (type === 'wood') tint.setHSL(.09, .08, .72 + rnd() * .26);
    else if (type === 'plaster') tint.setHSL(.12, .04, .8 + rnd() * .2);
    else tint.setHSL(.09, .12, .68 + rnd() * .25);
    if (horiz) {
      pushWall(type, x, z, h, CELL + .04, WALL_T, tint);
      addBox(x, z, (CELL + .04) / 2, WALL_T / 2, 'wall');
    }
    if (vert) {
      pushWall(type, x, z, h, WALL_T, CELL + .04, tint);
      addBox(x, z, WALL_T / 2, (CELL + .04) / 2, 'wall');
    }
    if (!horiz && !vert) {
      pushWall(type, x, z, h, WALL_T * 1.25, WALL_T * 1.25, tint);
      addBox(x, z, WALL_T * .63, WALL_T * .63, 'wall');
    }
  }
  for (const [type, list] of Object.entries(buckets)) {
    if (!list.length) continue;
    const mesh = new THREE.InstancedMesh(wallGeom, matFor[type], list.length);
    mesh.castShadow = true; mesh.receiveShadow = true;
    list.forEach((it, i) => { mesh.setMatrixAt(i, it.m); mesh.setColorAt(i, it.color); });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);
  }

  /* ---------------- doors, windows, broken openings ---------------- */
  const openings = [];
  const doorMat = new THREE.MeshStandardMaterial({ map: TEX.siding, color: 0xb7a184, roughness: .9, metalness: .05 });
  const doorDark = new THREE.MeshStandardMaterial({ map: TEX.siding, color: 0x5d4a37, roughness: .92 });
  const frameMat = new THREE.MeshStandardMaterial({ map: TEX.siding, color: 0x8b7a64, roughness: .92 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x8fa5a4, roughness: .12, metalness: .1, transparent: true, opacity: .28, envMapIntensity: 1.2, side: THREE.DoubleSide });
  const boardMat = new THREE.MeshStandardMaterial({ map: TEX.fence, color: 0xd9c9a8, roughness: .94 });

  function makeOpening(gx, gy, ch) {
    const kind = ch === 'D' ? 'door' : ch === 'W' ? 'window' : 'broken';
    const horiz = isEdge(gx - 1, gy) || isEdge(gx + 1, gy);
    const x = worldX(gx + .5), z = worldZ(gy + .5);
    const group = new THREE.Group(); group.position.set(x, 0, z);
    if (!horiz) group.rotation.y = Math.PI / 2;
    scene.add(group);
    const add = (mesh) => { mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh); return mesh; };
    // frame
    for (const sx of [-1, 1]) {
      const post = add(new THREE.Mesh(new THREE.BoxGeometry(.11, 2.52, .3), frameMat));
      post.position.set(sx * .9, 1.26, 0);
    }
    const lintel = add(new THREE.Mesh(new THREE.BoxGeometry(1.92, .18, .32), frameMat));
    lintel.position.set(0, 2.52, 0);
    const sill = add(new THREE.Mesh(new THREE.BoxGeometry(1.86, .06, .42), kit.M.concrete));
    sill.position.set(0, .04, 0);

    let pivot = null, panel = null, glass = null, boards = [];
    const boardWrap = new THREE.Group(); group.add(boardWrap);
    if (kind !== 'broken') {
      const n = 3;
      for (let i = 0; i < n; i++) {
        for (const sz of [1, -1]) {
          const b = new THREE.Mesh(new THREE.BoxGeometry(1.98, .2, .06), boardMat);
          b.position.set(0, kind === 'window' ? 1.05 + i * .46 : .62 + i * .58, sz * .11);
          b.rotation.z = (i % 2 ? -.018 : .016) * sz;
          b.castShadow = true; b.receiveShadow = true;
          boardWrap.add(b); boards.push(b);
        }
      }
    }
    if (kind === 'door') {
      pivot = new THREE.Group(); pivot.position.set(-.88, 0, 0); group.add(pivot);
      panel = add(new THREE.Mesh(new THREE.BoxGeometry(1.72, 2.34, .08), doorMat));
      panel.position.set(.88, 1.18, 0); pivot.add(panel);
      const inset = new THREE.Mesh(new THREE.BoxGeometry(1.34, 1.0, .03), doorDark);
      inset.position.set(.88, 1.7, .06); pivot.add(inset);
      const handle = new THREE.Mesh(new THREE.SphereGeometry(.035, 8, 6), kit.M.chrome);
      handle.position.set(1.63, 1.12, .075); pivot.add(handle);
    }
    if (kind === 'window') {
      const lower = add(new THREE.Mesh(new THREE.BoxGeometry(1.7, .88, .3), doorMat));
      lower.position.set(0, .44, 0);
      glass = new THREE.Mesh(new THREE.BoxGeometry(1.56, 1.3, .04), glassMat);
      glass.position.set(0, 1.58, 0); group.add(glass);
      const mullion = add(new THREE.Mesh(new THREE.BoxGeometry(.06, 1.3, .1), frameMat));
      mullion.position.set(0, 1.58, 0);
      for (const sy of [-1, 1]) {
        const rail = add(new THREE.Mesh(new THREE.BoxGeometry(1.7, .09, .16), frameMat));
        rail.position.set(0, 1.58 + sy * .66, 0);
      }
    }
    if (kind === 'broken') {
      const shardMat = new THREE.MeshPhysicalMaterial({ color: 0x93a9a8, roughness: .15, transparent: true, opacity: .5 });
      for (let i = 0; i < 5; i++) {
        const s = new THREE.Mesh(new THREE.ConeGeometry(.035 + Math.random() * .05, .16, 3), shardMat);
        s.position.set((Math.random() - .5) * 1.6, .02, (Math.random() - .5) * .5);
        s.rotation.set(Math.PI / 2, Math.random() * 6, 0);
        group.add(s);
      }
    }

    const collider = kind === 'broken' ? null : addBox(x, z, horiz ? .95 : .13, horiz ? .13 : .95, 'opening');
    const safe = (gx === 9 && gy === 25) || (gx === 8 && gy === 32) || (gx === 11 && gy === 32);
    const o = {
      gx, gy, wx: x, wz: z, kind, horiz, group, pivot, panel, glass, boardWrap, boards, collider,
      closed: true, open: kind === 'broken' || (gx === 9 && gy === 25), reinforced: 0, hp: 100, maxHp: 100,
      breached: kind === 'broken', secure: false, safe, label: kind === 'door' ? 'DOOR' : kind === 'window' ? 'WINDOW' : 'BROKEN OPENING',
      marker: null,
    };
    if (kind === 'broken') { o.closed = false; o.open = true; o.breached = true; }
    refreshOpening(o);
    openings.push(o);
    return o;
  }

  function refreshOpening(o) {
    o.secure = o.reinforced >= 3;
    const solid = !o.breached && (o.kind === 'window' || !o.open);
    if (o.collider) o.collider.active = solid;
    const n = o.reinforced;
    o.boards.forEach((b, i) => { b.visible = i < n * 2; });
    if (o.panel) o.panel.visible = !o.breached;
    if (o.glass) o.glass.visible = !o.breached;
    if (o.kind === 'broken') { o.boards.forEach(b => b.visible = false); }
    if (o.marker) {
      const col = o.breached ? 0xe26951 : o.secure ? 0xd6e675 : o.reinforced > 0 ? 0xe2b566 : 0x9aa492;
      o.marker.userData.ring.material.color.setHex(col);
      o.marker.userData.gem.material.color.setHex(col);
    }
  }
  for (let gy = 0; gy < MAPH; gy++) for (let gx = 0; gx < MAPW; gx++) {
    const ch = cellAt(gx, gy);
    if (ch === 'D' || ch === 'W' || ch === 'd') makeOpening(gx, gy, ch);
  }
  const safeDoor = openings.find(o => o.gx === 9 && o.gy === 25);
  const safeWindows = openings.filter(o => o.safe && o.kind === 'window');

  /* ---------------- markers ---------------- */
  function makeMarker(color = 0xd6e675, y = 0) {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.RingGeometry(.44, .55, 40), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = .035;
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(.11, 0), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }));
    gem.position.y = 1.0;
    g.add(ring, gem);
    g.userData.ring = ring; g.userData.gem = gem; g.userData.phase = Math.random() * 7; g.userData.baseY = y;
    markers.push(g);
    scene.add(g);
    return g;
  }
  for (const o of [safeDoor, ...safeWindows]) {
    if (!o) continue;
    o.marker = makeMarker(0xd6e675);
    o.marker.position.set(o.wx, 0, o.wz);
    refreshOpening(o);
  }

  /* ---------------- loot ---------------- */
  const loot = [];
  const interactables = [];
  const carSpots = new Set(['18.5,6.5']);
  for (const def of LOOT_SPOTS) {
    const key = `${def.gx},${def.gy}`;
    const x = worldX(def.gx), z = worldZ(def.gy);
    const onCar = carSpots.has(key);
    let prop = null;
    if (!onCar) {
      const kind = def.label.includes('duffel') ? 'duffel' : (def.label.includes('store') || def.label.includes('Hardware')) ? 'counter' : 'crate';
      prop = kit.makeLootProp(kind);
      prop.position.set(x, 0, z);
      prop.rotation.y = (def.gx * 2.3 + def.gy) % 3;
      scene.add(prop);
      if (kind === 'counter') addBox(x, z, .8, .45, 'loot');
    }
    const marker = makeMarker(0xd6e675, 0);
    marker.position.set(x, 0, z);
    const spot = {
      kind: 'loot', gx: def.gx, gy: def.gy, wx: x, wz: z, label: def.label,
      loot: { ...def.loot }, active: true, prop, marker,
    };
    loot.push(spot); interactables.push(spot);
  }

  /* ---------------- props / vehicles / furniture ---------------- */
  const props = dressWorld({ scene, kit, addBox, addCircle, TEX });
  const pickup = props.pickup;
  const pickupWorld = { x: worldX(17.5), z: worldZ(23.5) };
  const car = {
    kind: 'car', gx: 17.5, gy: 23.5, wx: pickupWorld.x, wz: pickupWorld.z,
    label: 'DEAD PICKUP', repaired: false, fueled: false, active: true, state: pickup,
    marker: makeMarker(0xe2b566, 0),
  };
  car.marker.position.set(pickupWorld.x, 0, pickupWorld.z);
  interactables.push(car);
  for (const spot of loot) if (spot.kind === 'loot') { /* already added */ }

  // step through the loot again to add to interactable list (kept explicit above)
  if (safeDoor) interactables.push(safeDoor);
  for (const o of safeWindows) interactables.push(o);
  // other doors/windows are interaction candidates too
  for (const o of openings) if (!o.safe) interactables.push(o);

  /* ---------------- effects ---------------- */
  const rain = createRain(scene);
  const blood = createBlood(scene, TEX.blood);
  const tracers = createTracers(scene);
  const muzzle = createMuzzle(scene, TEX.glow);
  const dust = createDust(scene);

  /* ---------------- collision / vision ---------------- */
  function resolveCircle(x, z, r) {
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < colliders.length; i++) {
        const c = colliders[i];
        if (!c.active) continue;
        if (c.shape === 'circle') {
          const dx = x - c.x, dz = z - c.z;
          const rr = r + c.r, d2 = dx * dx + dz * dz;
          if (d2 < rr * rr) {
            const d = Math.sqrt(d2) || .0001;
            x = c.x + dx / d * rr; z = c.z + dz / d * rr;
          }
        } else {
          const nx = clamp(x, c.x - c.hw, c.x + c.hw);
          const nz = clamp(z, c.z - c.hd, c.z + c.hd);
          const dx = x - nx, dz = z - nz, d2 = dx * dx + dz * dz;
          if (d2 < r * r) {
            if (d2 > 1e-8) {
              const d = Math.sqrt(d2);
              x = nx + dx / d * r; z = nz + dz / d * r;
            } else {
              // push out on the smallest axis
              const px = c.hw + r - Math.abs(x - c.x);
              const pz = c.hd + r - Math.abs(z - c.z);
              if (px < pz) x = c.x + Math.sign(x - c.x || 1) * (c.hw + r);
              else z = c.z + Math.sign(z - c.z || 1) * (c.hd + r);
            }
          }
        }
      }
    }
    return { x, z };
  }

  function lineOfSight(x1, z1, x2, z2) {
    const gx1 = x1 / CELL + MAPW / 2, gy1 = z1 / CELL + MAPH / 2;
    const gx2 = x2 / CELL + MAPW / 2, gy2 = z2 / CELL + MAPH / 2;
    const d = Math.hypot(gx2 - gx1, gy2 - gy1);
    const steps = Math.ceil(d / .3);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      if (blocksSight(Math.floor(gx1 + (gx2 - gx1) * t), Math.floor(gy1 + (gy2 - gy1) * t))) return false;
    }
    return true;
  }

  /* ---------------- night / atmosphere ---------------- */
  const dayCol = new THREE.Color(0x43503f), nightCol = new THREE.Color(0x0a1318);
  const daySky = new THREE.Color(0xa9b7ae), nightSky = new THREE.Color(0x1b2a33);
  const dayGnd = new THREE.Color(0x2b2f24), nightGnd = new THREE.Color(0x080b0d);
  let envMode = 'dusk';
  function setNight(f) {
    f = clamp(f, 0, 1);
    sun.intensity = lerp(2.85, .42, f);
    sun.color.setHSL(lerp(.09, .58, f), lerp(.62, .28, f), lerp(.66, .62, f));
    fill.intensity = lerp(.35, .1, f);
    hemi.intensity = lerp(1.0, .3, f);
    hemi.color.copy(daySky).lerp(nightSky, f);
    hemi.groundColor.copy(dayGnd).lerp(nightGnd, f);
    ambient.intensity = lerp(.36, .18, f);
    scene.fog.color.copy(dayCol).lerp(nightCol, f);
    bg.copy(scene.fog.color);
    scene.fog.density = lerp(.0115, .019, f);
    for (const l of props.lamps) {
      l.light.visible = f > .04;
      l.light.intensity = f * 11;
      l.lens.material.emissiveIntensity = f * 2.2;
      l.lens.material.color.setHex(f > .3 ? 0xfff2cd : 0xcfcbb0);
      l.glow.material.opacity = f * .55;
      l.cone.material.opacity = f * .035;
      l.cone2.material.opacity = f * .05;
      l.cone.visible = f > .05; l.cone2.visible = f > .05;
    }
    props.lanternLight.intensity = f * 4.6;
    props.lanternLight.visible = f > .04;
    props.porchLight.intensity = f * 5.2;
    props.porchLight.visible = f > .04;
    props.porchGlow.material.opacity = f * .5;
    props.porchBulb.material.emissiveIntensity = f * 2.4;
    rain.material.opacity = lerp(.14, .3, f) * .75;
    dust.mesh.material.opacity = lerp(.18, .32, f);
    const want = f > .5 ? 'night' : 'dusk';
    if (want !== envMode) { envMode = want; scene.environment = want === 'night' ? envNight : envDusk; }
  }
  setNight(0);

  /* ---------------- animation ---------------- */
  let time = 0;
  function tick(dt, t, focus, f) {
    time = t;
    rain.tick(dt, focus);
    dust.tick(dt, t);
    tracers.tick(dt);
    muzzle.tick(dt);
    for (const s of props.swayers) {
      s.canopy.rotation.z = Math.sin(t * .55 + s.phase) * .022;
      s.canopy.rotation.x = Math.cos(t * .42 + s.phase) * .014;
    }
    for (let i = 0; i < props.lamps.length; i++) {
      const l = props.lamps[i];
      const flick = 1 + Math.sin(t * (1.7 + i * .13) + l.phase) * .04 + (Math.sin(t * 11 + i) > .985 ? -.16 : 0);
      l.light.intensity = (f || 0) * 11 * flick;
      l.glow.material.opacity = (f || 0) * .55 * flick;
    }
    for (const m of markers) {
      const p = (Math.sin(t * 2.2 + m.userData.phase) + 1) / 2;
      m.userData.ring.scale.setScalar(.92 + p * .16);
      m.userData.ring.material.opacity = .35 + p * .3;
      m.userData.gem.position.y = .95 + p * .16;
      m.userData.gem.rotation.y = t * 1.4 + m.userData.phase;
      m.visible = m.userData.hide !== true;
    }
    for (const o of openings) {
      if (o.pivot) {
        const want = o.open ? -1.82 : 0;
        o.pivot.rotation.y = damp(o.pivot.rotation.y, want, 7, dt);
      }
    }
    if (props.lightbar.length) {
      const pulse = (Math.sin(t * 6) + 1) / 2;
      props.lightbar[0].material.emissiveIntensity = (f || 0) * (.2 + pulse * .9);
      props.lightbar[1].material.emissiveIntensity = (f || 0) * (.2 + (1 - pulse) * .9);
    }
    props.pickup.mesh.userData.lights?.forEach(l => { l.material.emissiveIntensity = props.pickup.repaired ? .6 : 0; });
    if (props.pickup.mesh.userData.hood) {
      const h = props.pickup.mesh.userData.hood;
      h.rotation.x = damp(h.rotation.x, props.pickup.repaired ? -.12 : -.95, 3, dt);
      h.position.y = damp(h.position.y, props.pickup.repaired ? .99 : 1.25, 3, dt);
    }
    if (props.porchGlow) props.porchGlow.material.opacity = (f || 0) * (.45 + Math.sin(t * 2.4) * .04);
  }

  /* ---------------- public api ---------------- */
  const api = {
    scene, colliders, openings, loot, interactables, car, safeDoor, safeWindows,
    pickup, props, markers,
    addBox, addCircle, addCircleCollider: addCircle, addBoxCollider: addBox,
    resolveCircle, lineOfSight, setNight, tick,
    addBlood: (x, z, s) => blood.add(x, z, s),
    addTracer: (a, b) => tracers.shoot(a, b),
    flashMuzzle: (x, y, z) => muzzle.flash(x, y, z),
    consumeLoot(spot) {
      spot.active = false;
      if (spot.prop) spot.prop.visible = false;
      spot.marker.userData.hide = true; spot.marker.visible = false;
    },
    refreshOpening,
    board(o, add) {
      if (add) {
        if (o.reinforced >= 3) return false;
        o.reinforced++;
        o.hp = 95 + o.reinforced * 85;
        o.maxHp = o.hp;
        o.breached = false;
        o.open = false;
      } else {
        if (o.reinforced <= 0) return false;
        o.reinforced--;
        o.hp = 95 + Math.max(1, o.reinforced) * 85;
        o.maxHp = o.hp;
      }
      o.closed = true;
      refreshOpening(o);
      return true;
    },
    damageOpening(o, dmg) {
      if (o.reinforced >= 3 || o.breached) return 'secure';
      o.hp -= dmg;
      if (o.hp <= 0) {
        o.hp = 0; o.breached = true; o.open = true;
        refreshOpening(o);
        return 'breached';
      }
      refreshOpening(o);
      return 'damaged';
    },
    setOpeningState(o, s) {
      o.reinforced = clamp(Number(s.reinforced) || 0, 0, 3);
      o.hp = Math.max(1, Number(s.hp) || 100);
      o.maxHp = o.hp;
      o.breached = !!s.breached;
      o.open = !!s.closed ? false : true;
      if (o.breached) o.open = true;
      o.closed = !o.open;
      refreshOpening(o);
      if (o.pivot) o.pivot.rotation.y = o.open ? -1.82 : 0;
    },
    setCarState(s) {
      car.repaired = !!s.repaired; car.fueled = !!s.fueled;
      pickup.repaired = car.repaired; pickup.fueled = car.fueled;
    },
    setMarketingNight(f) { setNight(f); },
    get spawnFocus() { return car; },
    landmarks: LANDMARKS,
  };
  return api;
}
