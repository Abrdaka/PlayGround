/* LAST LIGHT — placing the neighbourhood's set dressing */
import * as THREE from '../vendor/three.module.min.js';
import { cellAt, isSolid } from './core.js';

const G = (gx, gy) => ({ x: (gx - 18) * 2, z: (gy - 18) * 2 });

export function dressWorld({ scene, kit, addBox, addCircle, TEX }) {
  const lamps = [], swayers = [], puddles = [];
  const box = (w, h, d, x, y, z, mat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
  };

  /* ---------------- street lamps ---------------- */
  const lampSpots = [
    [15.25, 15.35, 1, 0], [20.75, 20.65, -1, 0], [20.75, 15.35, -1, 0], [15.25, 20.65, 1, 0],
    [15.25, 8.6, 1, 0], [20.75, 27.4, -1, 0],
    [9.4, 20.65, 1, Math.PI / 2], [27.0, 15.35, 1, -Math.PI / 2],
  ];
  for (const [gx, gy, side, ry] of lampSpots) {
    const p = G(gx, gy);
    const lamp = kit.makeLamp(p.x, p.z, side);
    lamp.root.rotation.y = ry;
    scene.add(lamp.root);
    lamps.push(lamp);
    addCircle(p.x, p.z, .22, 'lamp');
  }

  /* ---------------- trees ---------------- */
  const treeSpots = [
    [1.7, 8.7], [12.9, 2.6], [12.8, 22.7], [22.4, 7.4], [33.1, 12.7],
    [25.4, 33.2], [5.4, 33.2], [33.1, 28.6], [1.7, 30.3], [14.2, 6.2],
    [22.4, 33.2], [8.6, 21.4], [33.1, 7.2], [14.2, 33.2],
  ];
  let ti = 0;
  for (const [gx, gy] of treeSpots) {
    if (isSolid(Math.floor(gx), Math.floor(gy))) continue;
    const p = G(gx, gy);
    const t = kit.makeTree(p.x, p.z, 31 + ti * 17);
    scene.add(t.root); swayers.push(t);
    addCircle(p.x, p.z, .34, 'tree');
    ti++;
  }

  /* ---------------- vehicles ---------------- */
  const pickupP = G(17.5, 23.5);
  const pickup = kit.makeCar({ ...pickupP, ry: 0, color: 0x7d4a34, type: 'pickup' });
  scene.add(pickup);
  addBox(pickupP.x, pickupP.z, 1.0, 2.18, 'car');
  const pickupState = { mesh: pickup, repaired: false, fueled: false };

  const policeP = G(18.5, 6.5);
  const police = kit.makeCar({ ...policeP, ry: 0, color: 0xd7d4c3, type: 'police' });
  scene.add(police);
  addBox(policeP.x, policeP.z, 1.0, 2.18, 'car');

  const wrecks = [
    [9.6, 18.2, Math.PI / 2 + .06, 0x46545c],
    [24.6, 17.75, Math.PI / 2 - .04, 0x5d5a43],
    [30.9, 18.1, Math.PI / 2, 0x4a3d33],
  ];
  for (const [gx, gy, ry, color] of wrecks) {
    const p = G(gx, gy);
    const w = kit.makeCar({ ...p, ry, color });
    w.rotation.z = (gx > 20 ? -1 : 1) * .018;
    scene.add(w);
    addBox(p.x, p.z, 2.18, 1.0, 'car');
  }

  /* ---------------- junk & furniture ---------------- */
  const dumpP = G(21.6, 14.4);
  scene.add(kit.makeDumpster(dumpP.x, dumpP.z, .1));
  addBox(dumpP.x, dumpP.z, .98, .62, 'dumpster');

  for (const [gx, gy, ry] of [[13.5, 9.6, .4], [8.6, 14.4, -.3], [21.5, 21.6, .2], [12.4, 24.6, -.5]]) {
    const p = G(gx, gy); scene.add(kit.makeBin(p.x, p.z, ry)); addCircle(p.x, p.z, .3, 'bin');
  }
  for (const [gx, gy, ry] of [[14.5, 15.55, 0], [10.5, 20.55, 0], [21.5, 20.55, 0]]) {
    const p = G(gx, gy); scene.add(kit.makeBench(p.x, p.z, ry)); addBox(p.x, p.z, .85, .35, 'bench');
  }
  for (const [gx, gy] of [[5.3, 14.4], [24.4, 12.4]]) {
    const p = G(gx, gy); scene.add(kit.makeMailbox(p.x, p.z, .2)); addCircle(p.x, p.z, .2, 'mailbox');
  }

  // utility poles + sagging wires
  const poleGrid = [[15.25, 4.6], [15.25, 14.5], [15.25, 24.5], [15.25, 33.2], [20.75, 6.2], [20.75, 16.2], [20.75, 26.2]];
  const poles = [];
  for (const [gx, gy] of poleGrid) {
    const p = G(gx, gy); scene.add(kit.makePole(p.x, p.z)); addCircle(p.x, p.z, .22, 'pole');
    poles.push(p);
  }
  const wireMat = new THREE.LineBasicMaterial({ color: 0x1a1d1a, transparent: true, opacity: .85 });
  function wire(a, b, off) {
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = a.x + (b.x - a.x) * t + off;
      const z = a.z + (b.z - a.z) * t;
      const sag = Math.sin(t * Math.PI) * 1.15;
      pts.push(new THREE.Vector3(x, 6.95 - sag, z));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    scene.add(new THREE.Line(geo, wireMat));
  }
  const westPoles = poles.slice(0, 4), eastPoles = poles.slice(4);
  for (let i = 0; i < westPoles.length - 1; i++) { wire(westPoles[i], westPoles[i + 1], -.6); wire(westPoles[i], westPoles[i + 1], .6); }
  for (let i = 0; i < eastPoles.length - 1; i++) { wire(eastPoles[i], eastPoles[i + 1], -.6); wire(eastPoles[i], eastPoles[i + 1], .6); }

  // rubble mounds
  for (const [gx, gy] of [[14, 8], [22, 14], [1, 33], [34, 1], [23, 20], [15, 34], [33, 33]]) {
    const p = G(gx + .5, gy + .5);
    scene.add(kit.makeRubble(p.x, p.z, gx * 7 + gy));
    addBox(p.x, p.z, .82, .82, 'rubble');
  }

  // wet patches
  const puddleSpots = [
    [17.2, 12.2, 2.4, 1.1], [18.8, 14.6, 1.5, .8], [13.1, 16.6, 1.2, .7],
    [21.6, 19.3, 2.2, .9], [17.2, 28.4, 1.8, 1.1], [30.4, 16.8, 1.4, .8],
    [9.6, 18.9, 1.7, .8], [18.8, 32.8, 1.9, .8], [26.2, 18.6, 1.2, 1.4],
  ];
  for (const [gx, gy, sx, sz] of puddleSpots) {
    const p = G(gx, gy);
    const m = kit.makePuddle(p.x, p.z, sx, sz, gx * 2.1);
    scene.add(m); puddles.push(m);
  }

  // interior life: safehouse bed, table + lantern, shelving
  const bedP = G(7.8, 30.6);
  box(1.15, .16, 2.0, bedP.x, .35, bedP.z, kit.M.woodDark);
  box(1.05, .18, 1.9, bedP.x, .49, bedP.z, new THREE.MeshStandardMaterial({ color: 0x6d6a55, roughness: .95 }));
  box(.9, .12, .34, bedP.x, .6, bedP.z - .72, new THREE.MeshStandardMaterial({ color: 0xb5af97, roughness: .95 }));
  addBox(bedP.x, bedP.z, .58, 1.02, 'bed');

  const tableP = G(11.1, 26.5);
  box(.9, .07, .9, tableP.x, .74, tableP.z, kit.M.wood);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(.07, .74, .07, tableP.x + sx * .38, .37, tableP.z + sz * .38, kit.M.woodDark);
  const lantern = kit.makeLantern(); lantern.position.set(tableP.x, .78, tableP.z); scene.add(lantern);
  const lanternLight = new THREE.PointLight(0xffbf72, 0, 9, 2);
  lanternLight.position.set(tableP.x, 1.2, tableP.z); scene.add(lanternLight);
  addBox(tableP.x, tableP.z, .48, .48, 'table');

  const shelfP = G(12.4, 29.2);
  box(.4, 1.6, 2.4, shelfP.x, .8, shelfP.z, kit.M.woodDark);
  for (let i = 0; i < 3; i++) box(.44, .05, 2.3, shelfP.x, .4 + i * .45, shelfP.z, kit.M.wood);
  addBox(shelfP.x, shelfP.z, .24, 1.22, 'shelf');

  // store shelving
  for (const gy of [3.2, 5.0]) {
    const p = G(29.4, gy);
    box(3.4, 1.5, .55, p.x, .75, p.z, kit.M.woodDark);
    for (let i = 0; i < 3; i++) box(3.42, .05, .58, p.x, .42 + i * .4, p.z, kit.M.wood);
    addBox(p.x, p.z, 1.72, .3, 'shelf');
  }
  // hardware store bench & crates
  const hw = G(5.2, 3.4);
  box(2.6, .9, .8, hw.x, .45, hw.z, kit.M.woodDark);
  addBox(hw.x, hw.z, 1.32, .42, 'bench');
  // ransacked furniture
  const rp = G(28.2, 28.6);
  const tipped = box(1.7, .55, .8, rp.x, .42, rp.z, kit.M.woodDark);
  tipped.rotation.z = .35;
  addBox(rp.x, rp.z, .9, .42, 'furniture');

  // porch light over the safehouse door (door cell centre is grid 9.5, 25.5)
  const porchP = { x: (9.5 - 18) * 2, z: (25 - 18) * 2 - .36 };
  const fixture = box(.24, .12, .2, porchP.x, 2.72, porchP.z, kit.M.darkMetal);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(.07, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffe6b8, emissive: 0xffb95e, emissiveIntensity: 0, roughness: .3 }));
  bulb.position.set(porchP.x, 2.63, porchP.z); scene.add(bulb);
  const porchLight = new THREE.PointLight(0xffb968, 0, 8, 2);
  porchLight.position.set(porchP.x, 2.55, porchP.z); scene.add(porchLight);
  const porchGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0xffcf90, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  porchGlow.position.set(porchP.x, 2.6, porchP.z); porchGlow.scale.set(1.6, 1.6, 1); scene.add(porchGlow);

  // a little campfire-like work light inside the tool shed? no: keep it dark.

  const debris = kit.makeDebris(scene);

  return {
    lamps, swayers, puddles, debris,
    pickup: pickupState, police,
    lanternLight, porchLight, porchGlow, porchBulb: bulb,
    safehouseLantern: lantern,
    lightbar: police.userData.lightbar || [],
  };
}
