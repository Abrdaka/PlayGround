/* LAST LIGHT — set dressing: vehicles, lamps, trees, junk */
import * as THREE from '../vendor/three.module.min.js';
import { mulberry32, clamp } from './core.js';

const S = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };

function organicGeo(radius, detail, seed) {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const rnd = mulberry32(seed);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const k = 1 + (rnd() - 0.5) * 0.34;
    pos.setXYZ(i, pos.getX(i) * k, pos.getY(i) * k * .85, pos.getZ(i) * k);
  }
  geo.computeVertexNormals();
  return geo;
}

export function createPropKit(TEX) {
  const M = {
    asphalt: new THREE.MeshStandardMaterial({ color: 0x1a2223, roughness: .06, metalness: .55, transparent: true, opacity: .82, envMapIntensity: 1.2, depthWrite: false }),
    rust: new THREE.MeshStandardMaterial({ map: TEX.metal, bumpMap: TEX.bump, bumpScale: .015, roughness: .62, metalness: .45 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0x8f938c, roughness: .3, metalness: .9 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x30342f, roughness: .52, metalness: .6 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x1d292b, roughness: .08, metalness: .35, transparent: true, opacity: .72, envMapIntensity: 1.6 }),
    tyre: new THREE.MeshStandardMaterial({ color: 0x141613, roughness: .92 }),
    wood: new THREE.MeshStandardMaterial({ map: TEX.siding, color: 0xb9a78d, roughness: .88 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x43372a, roughness: .92 }),
    plank: new THREE.MeshStandardMaterial({ map: TEX.siding, color: 0xd4c3a4, roughness: .86 }),
    lampMetal: new THREE.MeshStandardMaterial({ color: 0x323832, roughness: .55, metalness: .5 }),
    lampGlass: new THREE.MeshStandardMaterial({ color: 0xffe5b0, emissive: 0xffc46b, emissiveIntensity: 0, roughness: .3 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x4a3d2e, roughness: .95 }),
    leaf1: new THREE.MeshStandardMaterial({ color: 0x3d4a2b, roughness: .95, flatShading: true }),
    leaf2: new THREE.MeshStandardMaterial({ color: 0x4b5832, roughness: .95, flatShading: true }),
    leaf3: new THREE.MeshStandardMaterial({ color: 0x333f25, roughness: .95, flatShading: true }),
    bin: new THREE.MeshStandardMaterial({ color: 0x2e3732, roughness: .8 }),
    dumpster: new THREE.MeshStandardMaterial({ map: TEX.metal, color: 0x48604d, roughness: .7, metalness: .35 }),
    concrete: new THREE.MeshStandardMaterial({ map: TEX.plaster, color: 0x9a9a8c, roughness: .95 }),
    cardboard: new THREE.MeshStandardMaterial({ color: 0x7a6448, roughness: .96 }),
    tarp: new THREE.MeshStandardMaterial({ color: 0x4c533e, roughness: .9 }),
  };
  const wheelGeo = new THREE.CylinderGeometry(.34, .34, .25, 14);
  wheelGeo.rotateZ(Math.PI / 2);
  const headGeo = new THREE.BoxGeometry(.24, .13, .05);
  const tailGeo = new THREE.BoxGeometry(.26, .1, .05);
  const origin = new THREE.Group();

  function makeWheel(x, y, z) {
    const w = S(new THREE.Mesh(wheelGeo, M.tyre));
    w.position.set(x, y, z);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .27, 10), M.chrome);
    hub.rotation.z = Math.PI / 2; hub.position.copy(w.position); w.parent; 
    const g = new THREE.Group(); g.add(w); g.add(hub); g.position.set(0, 0, 0);
    hub.position.set(x, y, z);
    return g;
  }

  function makeCar({ x, z, ry = 0, color = 0x5e5347, type = 'sedan' }) {
    const root = new THREE.Group();
    root.position.set(x, 0, z);
    root.rotation.y = ry;
    const paint = new THREE.MeshStandardMaterial({ map: TEX.metal, color, roughness: .48, metalness: .5, bumpMap: TEX.bump, bumpScale: .01 });
    const paintDark = paint.clone(); paintDark.color.multiplyScalar(.55);
    const body = S(new THREE.Mesh(new THREE.BoxGeometry(1.86, .44, 4.06), paint));
    body.position.y = .7; root.add(body);
    const sill = S(new THREE.Mesh(new THREE.BoxGeometry(1.8, .3, 3.92), M.darkMetal));
    sill.position.y = .46; root.add(sill);
    // hood + trunk
    const hood = S(new THREE.Mesh(new THREE.BoxGeometry(1.74, .1, 1.12), paint));
    hood.position.set(0, .94, 1.35); root.add(hood);
    if (type === 'pickup') {
      // cab
      const cab = S(new THREE.Mesh(new THREE.BoxGeometry(1.7, .56, 1.62), paint));
      cab.position.set(0, 1.17, -.55); root.add(cab);
      const roof = S(new THREE.Mesh(new THREE.BoxGeometry(1.6, .09, 1.5), paint));
      roof.position.set(0, 1.47, -.55); root.add(roof);
      const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.5, .4, .05), M.glass);
      windshield.position.set(0, 1.2, .34); windshield.rotation.x = -.32; root.add(windshield);
      const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.5, .34, .05), M.glass);
      rearGlass.position.set(0, 1.22, -1.32); rearGlass.rotation.x = .28; root.add(rearGlass);
      for (const sx of [-1, 1]) {
        const side = new THREE.Mesh(new THREE.BoxGeometry(.04, .36, 1.35), M.glass);
        side.position.set(sx * .86, 1.2, -.55); root.add(side);
      }
      // open bed
      const bedFloor = S(new THREE.Mesh(new THREE.BoxGeometry(1.7, .08, 1.95), M.darkMetal));
      bedFloor.position.set(0, .94, 1.47); root.add(bedFloor);
      for (const sx of [-1, 1]) {
        const wall = S(new THREE.Mesh(new THREE.BoxGeometry(.1, .3, 2.0), paint));
        wall.position.set(sx * .82, 1.11, 1.48); root.add(wall);
      }
      const gate = S(new THREE.Mesh(new THREE.BoxGeometry(1.74, .3, .1), paint));
      gate.position.set(0, 1.11, 2.46); root.add(gate);
      // propped hood of a dead truck
      const openHood = S(new THREE.Mesh(new THREE.BoxGeometry(1.7, .07, 1.1), paintDark));
      openHood.position.set(0, 1.25, 1.75); openHood.rotation.x = -.95; root.add(openHood);
      root.userData.hood = openHood;
    } else {
      const cabin = S(new THREE.Mesh(new THREE.BoxGeometry(1.64, .48, 2.0), paint));
      cabin.position.set(0, 1.18, -.14); root.add(cabin);
      const roof = S(new THREE.Mesh(new THREE.BoxGeometry(1.55, .08, 1.8), paint));
      roof.position.set(0, 1.45, -.14); root.add(roof);
      const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.48, .38, .05), M.glass);
      windshield.position.set(0, 1.18, .89); windshield.rotation.x = -.3; root.add(windshield);
      const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.48, .36, .05), M.glass);
      rearGlass.position.set(0, 1.2, -1.14); rearGlass.rotation.x = .28; root.add(rearGlass);
      for (const sx of [-1, 1]) {
        const side = new THREE.Mesh(new THREE.BoxGeometry(.04, .34, 1.6), M.glass);
        side.position.set(sx * .82, 1.2, -.14); root.add(side);
      }
      const trunk = S(new THREE.Mesh(new THREE.BoxGeometry(1.74, .1, .92), paint));
      trunk.position.set(0, .94, -1.55); root.add(trunk);
      if (type === 'police') {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(.9, .1, .28), M.darkMetal);
        bar.position.set(0, 1.55, -.1); root.add(bar);
        const red = new THREE.Mesh(new THREE.BoxGeometry(.38, .09, .24), new THREE.MeshStandardMaterial({ color: 0x8d1f19, emissive: 0xff2418, emissiveIntensity: .4, roughness: .35 }));
        red.position.set(-.24, 1.61, -.1); root.add(red);
        const blue = new THREE.Mesh(new THREE.BoxGeometry(.38, .09, .24), new THREE.MeshStandardMaterial({ color: 0x173a6b, emissive: 0x2b6bff, emissiveIntensity: .4, roughness: .35 }));
        blue.position.set(.24, 1.61, -.1); root.add(blue);
        root.userData.lightbar = [red, blue];
      }
    }
    // bumpers & lamps
    for (const sz of [1, -1]) {
      const bumper = S(new THREE.Mesh(new THREE.BoxGeometry(1.94, .16, .12), M.darkMetal));
      bumper.position.set(0, .5, sz * 2.06); root.add(bumper);
    }
    const grille = S(new THREE.Mesh(new THREE.BoxGeometry(1.1, .2, .06), M.darkMetal));
    grille.position.set(0, .78, 2.03); root.add(grille);
    const lights = [];
    for (const sx of [-1, 1]) {
      const head = new THREE.Mesh(headGeo, new THREE.MeshStandardMaterial({ color: 0xd8d2b4, emissive: 0xffe3a6, emissiveIntensity: 0, roughness: .25 }));
      head.position.set(sx * .63, .84, 2.045); root.add(head); lights.push(head);
      const tail = new THREE.Mesh(tailGeo, new THREE.MeshStandardMaterial({ color: 0x6d1813, emissive: 0xff2a17, emissiveIntensity: 0, roughness: .35 }));
      tail.position.set(sx * .66, .86, -2.045); root.add(tail);
      const mirror = S(new THREE.Mesh(new THREE.BoxGeometry(.16, .1, .08), paint));
      mirror.position.set(sx * 1.01, 1.15, .62); root.add(mirror);
    }
    root.userData.lights = lights;
    // wheels
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      root.add(makeWheel(sx * .93, .35, sz * 1.3));
    }
    // plates
    const plate = new THREE.Mesh(new THREE.BoxGeometry(.42, .16, .02), new THREE.MeshStandardMaterial({ color: 0xb9b59c, roughness: .6 }));
    plate.position.set(0, .62, 2.13); root.add(plate);
    root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  function makeLamp(x, z, side = 1) {
    const root = new THREE.Group(); root.position.set(x, 0, z);
    const base = S(new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, .35, 10), M.lampMetal));
    base.position.y = .17; root.add(base);
    const pole = S(new THREE.Mesh(new THREE.CylinderGeometry(.065, .09, 4.5, 10), M.lampMetal));
    pole.position.y = 2.4; root.add(pole);
    const arm = S(new THREE.Mesh(new THREE.BoxGeometry(1.0, .08, .1), M.lampMetal));
    arm.position.set(side * .48, 4.55, 0); root.add(arm);
    const head = S(new THREE.Mesh(new THREE.BoxGeometry(.5, .13, .26), M.lampMetal));
    head.position.set(side * .92, 4.48, 0); root.add(head);
    const lens = new THREE.Mesh(new THREE.BoxGeometry(.42, .02, .2), M.lampGlass.clone());
    lens.position.set(side * .92, 4.4, 0); root.add(lens);
    const light = new THREE.PointLight(0xffc887, 0, 16, 2);
    light.position.set(side * .92, 4.15, 0); root.add(light);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0xffd6a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.position.set(side * .92, 4.35, 0); glow.scale.set(2.6, 2.6, 1); root.add(glow);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0xffd7a1, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(2.7, 4.3, 18, 1, true), coneMat);
    cone.position.set(side * .92, 2.18, 0); cone.scale.y = 1; root.add(cone);
    const cone2 = new THREE.Mesh(new THREE.ConeGeometry(1.35, 4.25, 14, 1, true), coneMat.clone());
    cone2.position.set(side * .92, 2.2, 0); root.add(cone2);
    root.traverse(o => { if (o.isMesh && o !== lens && o !== glow) { o.castShadow = true; } });
    return { root, light, glow, lens, cone, cone2, phase: Math.random() * 10 };
  }

  function makeTree(x, z, seed = 1) {
    const root = new THREE.Group(); root.position.set(x, 0, z);
    const rnd = mulberry32(seed);
    const trunk = S(new THREE.Mesh(new THREE.CylinderGeometry(.13, .23, 2.5, 8), M.trunk));
    trunk.position.y = 1.25; root.add(trunk);
    const b1 = S(new THREE.Mesh(new THREE.CylinderGeometry(.07, .11, 1.3, 6), M.trunk));
    b1.position.set(.28, 2.1, .12); b1.rotation.z = -.55; b1.rotation.x = .2; root.add(b1);
    const canopy = new THREE.Group(); canopy.position.y = 2.7; root.add(canopy);
    const mats = [M.leaf1, M.leaf2, M.leaf3];
    for (let i = 0; i < 4; i++) {
      const r = .8 + rnd() * .7;
      const blob = S(new THREE.Mesh(organicGeo(r, 1, seed * 13 + i), mats[i % 3]));
      const a = i * 2.1 + rnd();
      blob.position.set(Math.cos(a) * (i ? .55 : 0), (rnd() - .3) * .6, Math.sin(a) * (i ? .55 : 0));
      blob.scale.y = .8 + rnd() * .3;
      blob.castShadow = true;
      canopy.add(blob);
    }
    canopy.rotation.y = rnd() * 6;
    return { root, canopy, phase: rnd() * 6 };
  }

  function makeDumpster(x, z, ry = 0) {
    const root = new THREE.Group(); root.position.set(x, 0, z); root.rotation.y = ry;
    const box = S(new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.15, 1.15), M.dumpster));
    box.position.y = .62; root.add(box);
    const lid = S(new THREE.Mesh(new THREE.BoxGeometry(1.94, .07, 1.18), M.darkMetal));
    lid.position.set(0, 1.23, -.04); lid.rotation.x = -.09; root.add(lid);
    for (const sx of [-1, 1]) {
      const wheel = S(new THREE.Mesh(wheelGeo, M.tyre));
      wheel.scale.set(.55, .55, .55); wheel.position.set(sx * .7, .19, .4); root.add(wheel);
    }
    return root;
  }

  function makeBin(x, z, ry = 0) {
    const root = new THREE.Group(); root.position.set(x, 0, z); root.rotation.y = ry;
    const body = S(new THREE.Mesh(new THREE.CylinderGeometry(.3, .25, .85, 10), M.bin));
    body.position.y = .43; root.add(body);
    const lid = S(new THREE.Mesh(new THREE.CylinderGeometry(.33, .33, .06, 10), M.darkMetal));
    lid.position.y = .88; lid.rotation.z = .05; root.add(lid);
    return root;
  }

  function makeBench(x, z, ry = 0) {
    const root = new THREE.Group(); root.position.set(x, 0, z); root.rotation.y = ry;
    for (let i = 0; i < 3; i++) {
      const slat = S(new THREE.Mesh(new THREE.BoxGeometry(1.7, .05, .13), M.wood));
      slat.position.set(0, .48, -.14 + i * .15); root.add(slat);
    }
    for (const sx of [-1, 1]) {
      const leg = S(new THREE.Mesh(new THREE.BoxGeometry(.07, .48, .5), M.darkMetal));
      leg.position.set(sx * .72, .24, 0); root.add(leg);
    }
    const back = S(new THREE.Mesh(new THREE.BoxGeometry(1.7, .4, .06), M.wood));
    back.position.set(0, .78, -.2); back.rotation.x = -.14; root.add(back);
    return root;
  }

  function makePole(x, z) {
    const root = new THREE.Group(); root.position.set(x, 0, z);
    const pole = S(new THREE.Mesh(new THREE.CylinderGeometry(.1, .13, 7.4, 9), M.trunk));
    pole.position.y = 3.7; root.add(pole);
    const arm = S(new THREE.Mesh(new THREE.BoxGeometry(1.8, .1, .12), M.trunk));
    arm.position.y = 6.9; root.add(arm);
    for (const sx of [-1, 1]) {
      const ins = S(new THREE.Mesh(new THREE.CylinderGeometry(.05, .06, .12, 6), M.concrete));
      ins.position.set(sx * .7, 6.98, 0); root.add(ins);
    }
    return root;
  }

  function makeMailbox(x, z, ry = 0) {
    const root = new THREE.Group(); root.position.set(x, 0, z); root.rotation.y = ry;
    const post = S(new THREE.Mesh(new THREE.BoxGeometry(.09, .95, .09), M.woodDark));
    post.position.y = .48; root.add(post);
    const box = S(new THREE.Mesh(new THREE.BoxGeometry(.28, .22, .46), M.dumpster));
    box.position.y = 1.02; root.add(box);
    const flag = S(new THREE.Mesh(new THREE.BoxGeometry(.02, .12, .06), new THREE.MeshStandardMaterial({ color: 0xa2402b, roughness: .8 })));
    flag.position.set(.15, 1.12, -.05); root.add(flag);
    return root;
  }

  function makeRubble(x, z, seed) {
    const root = new THREE.Group(); root.position.set(x, 0, z);
    const rnd = mulberry32(seed);
    const mat = new THREE.MeshStandardMaterial({ map: TEX.plaster, color: 0x8d8a7c, roughness: .96 });
    for (let i = 0; i < 11; i++) {
      const r = .12 + rnd() * .3;
      const m = S(new THREE.Mesh(new THREE.BoxGeometry(r * 2, r * .9, r * 1.6), mat));
      m.position.set((rnd() - .5) * 1.4, r * .4, (rnd() - .5) * 1.4);
      m.rotation.set(rnd() * 2, rnd() * 6, rnd() * 2);
      root.add(m);
    }
    return root;
  }

  function makeLootProp(kind) {
    const root = new THREE.Group();
    if (kind === 'duffel') {
      const bag = S(new THREE.Mesh(new THREE.CapsuleGeometry(.26, .62, 4, 10), M.tarp));
      bag.rotation.z = Math.PI / 2; bag.position.y = .27; root.add(bag);
      const strap = S(new THREE.Mesh(new THREE.BoxGeometry(.9, .05, .1), M.darkMetal));
      strap.position.y = .3; root.add(strap);
      const flap = S(new THREE.Mesh(new THREE.BoxGeometry(.5, .05, .3), M.woodDark));
      flap.position.set(0, .46, 0); root.add(flap);
    } else if (kind === 'counter') {
      const counter = S(new THREE.Mesh(new THREE.BoxGeometry(1.5, .95, .7), M.woodDark));
      counter.position.y = .48; root.add(counter);
      const top = S(new THREE.Mesh(new THREE.BoxGeometry(1.6, .07, .8), M.wood));
      top.position.y = .98; root.add(top);
      const box = S(new THREE.Mesh(new THREE.BoxGeometry(.42, .3, .3), M.cardboard));
      box.position.set(-.3, 1.17, .02); box.rotation.y = .3; root.add(box);
      const can = S(new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .16, 9), M.concrete));
      can.position.set(.3, 1.1, -.05); root.add(can);
    } else {
      const crate = S(new THREE.Mesh(new THREE.BoxGeometry(.72, .52, .62), M.plank));
      crate.position.y = .27; crate.rotation.y = .08; root.add(crate);
      for (const sx of [-1, 1]) {
        const band = S(new THREE.Mesh(new THREE.BoxGeometry(.05, .54, .64), M.darkMetal));
        band.position.set(sx * .24, .28, 0); root.add(band);
      }
      const lid = S(new THREE.Mesh(new THREE.BoxGeometry(.76, .05, .66), M.woodDark));
      lid.position.y = .55; lid.rotation.z = .02; root.add(lid);
    }
    root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return root;
  }

  function makeLantern() {
    const root = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(.13, .15, .05, 10), M.darkMetal);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .2, 10), new THREE.MeshStandardMaterial({ color: 0xffd9a0, emissive: 0xffc36b, emissiveIntensity: 1.2, transparent: true, opacity: .85 }));
    glass.position.y = .15;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(.07, .12, .06, 10), M.darkMetal);
    cap.position.y = .28;
    const handle = new THREE.Mesh(new THREE.TorusGeometry(.07, .008, 5, 10, Math.PI), M.darkMetal);
    handle.position.y = .32;
    root.add(base, glass, cap, handle);
    root.position.y = .08;
    return root;
  }

  function makePuddle(x, z, sx, sz, rot) {
    const geo = new THREE.CircleGeometry(1, 22);
    geo.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, M.asphalt);
    m.position.set(x, .015, z); m.scale.set(sx, 1, sz); m.rotation.y = rot;
    m.receiveShadow = true;
    return m;
  }

  function makeDebris(scene) {
    const rnd = mulberry32(202);
    const paperGeo = new THREE.PlaneGeometry(.22, .3); paperGeo.rotateX(-Math.PI / 2);
    const paper = new THREE.InstancedMesh(paperGeo, new THREE.MeshStandardMaterial({ color: 0xb7b39a, roughness: .95, side: THREE.DoubleSide }), 150);
    const leafGeo = new THREE.PlaneGeometry(.16, .12); leafGeo.rotateX(-Math.PI / 2);
    const leaf = new THREE.InstancedMesh(leafGeo, new THREE.MeshStandardMaterial({ color: 0x6d5429, roughness: .98, side: THREE.DoubleSide }), 220);
    const stoneGeo = new THREE.DodecahedronGeometry(.06, 0);
    const stone = new THREE.InstancedMesh(stoneGeo, new THREE.MeshStandardMaterial({ color: 0x6b6a5e, roughness: .98 }), 90);
    const dummy = new THREE.Object3D();
    let pi = 0, li = 0, si = 0;
    for (let i = 0; i < 900 && (pi < 150 || li < 220 || si < 90); i++) {
      const gx = 1 + rnd() * 34, gy = 1 + rnd() * 34;
      const ch = MAPCH(gx, gy);
      if ('#%|fDWx'.includes(ch)) continue;
      const x = (gx - 18) * 2, z = (gy - 18) * 2;
      if (ch === 'g' && li < 220) {
        dummy.position.set(x, .012, z); dummy.rotation.set(0, rnd() * 6, 0); dummy.scale.setScalar(.6 + rnd() * .9);
        dummy.updateMatrix(); leaf.setMatrixAt(li++, dummy.matrix);
      } else if (pi < 150 && rnd() > .55) {
        dummy.position.set(x, .014, z); dummy.rotation.set(0, rnd() * 6, 0); dummy.scale.setScalar(.5 + rnd() * 1.2);
        dummy.updateMatrix(); paper.setMatrixAt(pi++, dummy.matrix);
      } else if (si < 90) {
        dummy.position.set(x, .03, z); dummy.rotation.set(rnd(), rnd() * 6, rnd()); dummy.scale.setScalar(.5 + rnd() * 1.3);
        dummy.updateMatrix(); stone.setMatrixAt(si++, dummy.matrix);
      }
    }
    paper.count = pi; leaf.count = li; stone.count = si;
    paper.receiveShadow = leaf.receiveShadow = stone.receiveShadow = true;
    scene.add(paper, leaf, stone);
    return { paper, leaf, stone };
  }

  return { makeCar, makeLamp, makeTree, makeDumpster, makeBin, makeBench, makePole, makeMailbox, makeRubble, makeLootProp, makeLantern, makePuddle, makeDebris, M };
}

// local copy to keep props independent from core's cell accessor import ordering
import { cellAt } from './core.js';
function MAPCH(gx, gy) { return cellAt(Math.floor(gx), Math.floor(gy)); }
