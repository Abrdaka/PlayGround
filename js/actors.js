/* LAST LIGHT — survivor & ghoul models built from primitives */
import * as THREE from '../vendor/three.module.min.js';

const shadowify = (mesh) => { mesh.castShadow = true; mesh.receiveShadow = true; return mesh; };

function cloth(color, rough = .92) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: .02 });
}
function skin(color = 0xb08363) {
  return new THREE.MeshStandardMaterial({ color, roughness: .78, metalness: 0 });
}

export function buildSurvivor() {
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const jacket = cloth(0x474d3e);
  const jacketDark = cloth(0x363b31);
  const pants = cloth(0x2d3330);
  const boots = cloth(0x1d201c, .7);
  const skinMat = skin(0xbf9574);
  const capMat = cloth(0x2c322b);
  const packMat = cloth(0x3b4032);
  const strapMat = cloth(0x22261f);

  // torso
  const torso = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.215, .46, 4, 10), jacket));
  torso.position.y = 1.18; torso.scale.set(1.06, 1, .8); body.add(torso);
  const rig = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.36, .24, .26), jacketDark));
  rig.position.set(0, 1.24, .04); body.add(rig);
  // belt
  const belt = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.21, .21, .07, 10), strapMat));
  belt.position.y = .92; belt.scale.z = .82; body.add(belt);
  // backpack
  const pack = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.31, .4, .2), packMat));
  pack.position.set(0, 1.22, -.28); body.add(pack);
  const bedroll = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .38, 8), cloth(0x54503c)));
  bedroll.rotation.z = Math.PI / 2; bedroll.position.set(0, 1.45, -.3); body.add(bedroll);
  for (const sx of [-1, 1]) {
    const strap = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.05, .5, .04), strapMat));
    strap.position.set(sx * .13, 1.26, .18); strap.rotation.z = sx * .08; body.add(strap);
  }

  // head
  const neck = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.06, .07, .1, 8), skinMat));
  neck.position.y = 1.47; body.add(neck);
  const head = new THREE.Group(); head.position.y = 1.6; body.add(head);
  const skull = shadowify(new THREE.Mesh(new THREE.SphereGeometry(.135, 16, 12), skinMat));
  skull.position.y = .04; head.add(skull);
  const jaw = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.11, .06, .1), skinMat));
  jaw.position.set(0, -.05, .08); head.add(jaw);
  const cap = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.145, .14, .085, 14), capMat));
  cap.position.y = .12; head.add(cap);
  const brim = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.22, .025, .16), capMat));
  brim.position.set(0, .085, .12); head.add(brim);
  // eyes (tiny, catches light from above)
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(.012, 6, 4), new THREE.MeshBasicMaterial({ color: 0x191a16 }));
    eye.position.set(sx * .047, .045, .125); head.add(eye);
  }

  // arms
  const armPivot = (sx) => {
    const p = new THREE.Group(); p.position.set(sx * .255, 1.42, 0); body.add(p);
    const upper = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.062, .26, 3, 8), jacket));
    upper.position.y = -.16; p.add(upper);
    const fore = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.054, .25, 3, 8), jacket));
    fore.position.set(0, -.48, .02); p.add(fore);
    const hand = shadowify(new THREE.Mesh(new THREE.SphereGeometry(.062, 8, 6), skinMat));
    hand.position.set(0, -.65, .03); p.add(hand);
    return p;
  };
  const armL = armPivot(-1), armR = armPivot(1);

  // legs
  const legPivot = (sx) => {
    const p = new THREE.Group(); p.position.set(sx * .115, .9, 0); body.add(p);
    const thigh = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.082, .3, 3, 8), pants));
    thigh.position.y = -.2; p.add(thigh);
    const shin = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.065, .3, 3, 8), pants));
    shin.position.y = -.55; p.add(shin);
    const boot = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.15, .12, .26), boots));
    boot.position.set(0, -.8, .04); p.add(boot);
    return p;
  };
  const legL = legPivot(-1), legR = legPivot(1);

  // weapon mount (independent of arm so aim is always readable)
  const weaponMount = new THREE.Group();
  weaponMount.position.set(.3, 1.18, .22); root.add(weaponMount);

  // flashlight on left hand
  const torch = new THREE.Group();
  const torchBody = new THREE.Mesh(new THREE.CylinderGeometry(.028, .032, .19, 8), cloth(0x2a2d26, .6));
  torchBody.rotation.x = Math.PI / 2; torch.add(torchBody);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(.03, 10), new THREE.MeshBasicMaterial({ color: 0xfff2c4 }));
  lens.position.z = .1; torch.add(lens);
  torch.position.set(-.29, 1.1, .26); torch.visible = false; root.add(torch);

  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return { root, body, head, armL, armR, legL, legR, weaponMount, torch, lens, walkPhase: 0, swing: 0 };
}

/* The trader is deliberately built from a different silhouette: long coat,
   wide hat, lantern arm. He never fights, so he only needs an idle. */
export function buildTrader() {
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const coat = cloth(0x3c3a2c, .96);
  const coatDark = cloth(0x2a2920, .98);
  const shirt = cloth(0x6b5940, .94);
  const skinMat = skin(0x9d7658);
  const hatMat = cloth(0x241f18, .92);
  const brass = new THREE.MeshStandardMaterial({ color: 0xc7a45e, roughness: .42, metalness: .65 });

  const torso = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.235, .52, 4, 10), coat));
  torso.position.y = 1.15; torso.scale.set(1.08, 1, .86); body.add(torso);
  const apron = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.38, .5, .06), shirt));
  apron.position.set(0, 1.02, .19); body.add(apron);
  const belt = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.225, .225, .08, 10), coatDark));
  belt.position.y = .86; belt.scale.z = .85; body.add(belt);
  const buckle = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.09, .07, .03), brass));
  buckle.position.set(0, .87, .2); body.add(buckle);

  const neck = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.06, .07, .1, 8), skinMat));
  neck.position.y = 1.48; body.add(neck);
  const head = new THREE.Group(); head.position.y = 1.61; body.add(head);
  const skull = shadowify(new THREE.Mesh(new THREE.SphereGeometry(.14, 16, 12), skinMat));
  skull.position.y = .03; head.add(skull);
  const beard = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.16, .1, .12), cloth(0x4a4034, .99)));
  beard.position.set(0, -.06, .07); head.add(beard);
  const brim = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.3, .31, .03, 16), hatMat));
  brim.position.y = .13; head.add(brim);
  const crown = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.14, .16, .17, 12), hatMat));
  crown.position.y = .2; head.add(crown);
  const band = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.163, .163, .035, 12), brass));
  band.position.y = .135; head.add(band);

  const armPivot = (sx) => {
    const p = new THREE.Group(); p.position.set(sx * .275, 1.4, 0); body.add(p);
    const upper = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.068, .28, 3, 8), coat));
    upper.position.y = -.17; p.add(upper);
    const fore = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.058, .27, 3, 8), coat));
    fore.position.set(0, -.51, .02); p.add(fore);
    const hand = shadowify(new THREE.Mesh(new THREE.SphereGeometry(.066, 8, 6), skinMat));
    hand.position.set(0, -.68, .03); p.add(hand);
    return p;
  };
  const armL = armPivot(-1), armR = armPivot(1);
  armL.rotation.x = -.12; armR.rotation.x = -.35;

  const legPivot = (sx) => {
    const p = new THREE.Group(); p.position.set(sx * .12, .86, 0); body.add(p);
    const thigh = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.086, .3, 3, 8), coatDark));
    thigh.position.y = -.2; p.add(thigh);
    const shin = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.068, .3, 3, 8), coatDark));
    shin.position.y = -.54; p.add(shin);
    const boot = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.16, .13, .28), cloth(0x1b1b17, .75)));
    boot.position.set(0, -.8, .04); p.add(boot);
    return p;
  };
  const legL = legPivot(-1), legR = legPivot(1);

  // Lantern hooked to the right hand.
  const lantern = new THREE.Group(); lantern.position.set(.28, .74, .08); body.add(lantern);
  const cage = new THREE.Mesh(new THREE.CylinderGeometry(.07, .08, .16, 6), brass);
  lantern.add(cage);
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(.06, .07, .13, 8), new THREE.MeshBasicMaterial({ color: 0xffd48a }));
  lantern.add(glass);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0xffc47a, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.scale.set(1.1, 1.1, 1); lantern.add(glow);

  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return { root, body, head, armL, armR, lantern, glow, walkPhase: 0 };
}

export function animateTrader(m, time) {
  m.body.position.y = Math.sin(time * 1.1) * .008;
  m.body.rotation.z = Math.sin(time * .53) * .008;
  m.head.rotation.y = Math.sin(time * .37) * .18;
  m.head.rotation.x = Math.sin(time * .29) * .04;
  m.armR.rotation.x = -.35 + Math.sin(time * .9) * .03;
  m.lantern.rotation.z = Math.sin(time * 1.4) * .05;
  m.glow.material.opacity = .38 + Math.sin(time * 5.5) * .05;
}

export function animateSurvivor(m, { time, speed, aiming, attackT, torchOn }) {
  const moving = speed > .12;
  m.root.rotation.y = aiming;
  m.torch.visible = !!torchOn;
  m.walkPhase += speed * 2.35;
  const w = m.walkPhase;
  const amp = moving ? Math.min(1, speed / 3.2) : 0;
  m.legL.rotation.x = Math.sin(w) * .62 * amp;
  m.legR.rotation.x = -Math.sin(w) * .62 * amp;
  m.armL.rotation.x = -0.55 - Math.sin(w) * .22 * amp;
  m.armL.rotation.z = .12;
  m.armR.rotation.x = -0.72 + Math.sin(w) * .12 * amp;
  m.armR.rotation.z = -.16;
  if (attackT > 0) {
    const k = Math.min(1, attackT * 4);
    m.armR.rotation.x = -1.9 + Math.sin((1 - attackT) * Math.PI) * .9;
  }
  // body bob / lean
  m.body.position.y = moving ? Math.abs(Math.sin(w)) * .035 : Math.sin(time * 1.8) * .008;
  m.body.rotation.z = moving ? Math.sin(w) * .025 : 0;
  m.body.rotation.x = moving ? -.03 : 0;
  m.head.rotation.y = Math.sin(time * .7) * .05;
  m.weaponMount.rotation.x = -.06;
}

export function buildWeapon(kind) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x5b4630, roughness: .85 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x7a7d75, roughness: .42, metalness: .75 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x22241f, roughness: .7, metalness: .3 });
  if (kind === 'bat') {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.032, .026, .82, 10), wood);
    shaft.rotation.x = Math.PI / 2; shaft.position.z = .3; g.add(shaft);
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, .2, 10), dark);
    grip.rotation.x = Math.PI / 2; grip.position.z = -.1; g.add(grip);
    for (let i = 0; i < 4; i++) {
      const nail = new THREE.Mesh(new THREE.CylinderGeometry(.005, .005, .09, 5), steel);
      nail.position.set((i % 2 ? .04 : -.04), .025, .52 + i * .06);
      nail.rotation.z = Math.PI / 2; nail.rotation.y = i * 1.3; g.add(nail);
    }
  } else if (kind === 'shiv') {
    const grip = new THREE.Mesh(new THREE.BoxGeometry(.045, .05, .15), dark);
    grip.position.z = .02; g.add(grip);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(.022, .012, .26), steel);
    blade.position.z = .22; g.add(blade);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(.022, .09, 4), steel);
    tip.rotation.x = Math.PI / 2; tip.position.z = .39; g.add(tip);
  } else if (kind === 'machete') {
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(.026, .03, .18, 8), dark);
    grip.rotation.x = Math.PI / 2; grip.position.z = .02; g.add(grip);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(.055, .012, .55), steel);
    blade.position.z = .36; blade.rotation.y = .02; g.add(blade);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(.03, .12, 4), steel);
    tip.rotation.x = Math.PI / 2; tip.position.z = .69; g.add(tip);
    const guard = new THREE.Mesh(new THREE.BoxGeometry(.1, .025, .03), dark);
    guard.position.z = .1; g.add(guard);
  } else if (kind === 'sledge') {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.032, .028, .95, 10), wood);
    shaft.rotation.x = Math.PI / 2; shaft.position.z = .34; g.add(shaft);
    const head = new THREE.Mesh(new THREE.BoxGeometry(.13, .13, .3), steel);
    head.position.z = .8; g.add(head);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .06, 10), dark);
    band.rotation.x = Math.PI / 2; band.position.z = .62; g.add(band);
  } else if (kind === 'pistol') {
    const slide = new THREE.Mesh(new THREE.BoxGeometry(.055, .06, .3), steel);
    slide.position.set(0, .02, .16); g.add(slide);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.045, .05, .16), dark);
    frame.position.set(0, -.015, .1); g.add(frame);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(.045, .14, .055), dark);
    grip.position.set(0, -.09, .02); grip.rotation.x = -.16; g.add(grip);
    const guard = new THREE.Mesh(new THREE.TorusGeometry(.035, .007, 5, 8, Math.PI), steel);
    guard.rotation.y = Math.PI / 2; guard.position.set(0, -.055, .12); g.add(guard);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, .02, .32); g.add(muzzle);
    g.userData.muzzle = muzzle;
  } else if (kind === 'shotgun') {
    const stock = new THREE.Mesh(new THREE.BoxGeometry(.06, .09, .3), wood);
    stock.position.set(0, -.02, -.02); stock.rotation.x = -.08; g.add(stock);
    const body = new THREE.Mesh(new THREE.BoxGeometry(.07, .08, .26), dark);
    body.position.z = .2; g.add(body);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.026, .026, .72, 10), steel);
    barrel.rotation.x = Math.PI / 2; barrel.position.set(0, .02, .55); g.add(barrel);
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, .6, 8), dark);
    tube.rotation.x = Math.PI / 2; tube.position.set(0, -.035, .5); g.add(tube);
    const pump = new THREE.Mesh(new THREE.BoxGeometry(.075, .055, .2), wood);
    pump.position.set(0, -.02, .45); g.add(pump);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, .02, .92); g.add(muzzle);
    g.userData.muzzle = muzzle;
  } else if (kind === 'rifle') {
    const stock = new THREE.Mesh(new THREE.BoxGeometry(.055, .085, .38), wood);
    stock.position.set(0, -.02, -.02); g.add(stock);
    const body = new THREE.Mesh(new THREE.BoxGeometry(.06, .07, .3), dark);
    body.position.z = .22; g.add(body);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, .78, 10), steel);
    barrel.rotation.x = Math.PI / 2; barrel.position.set(0, .02, .62); g.add(barrel);
    const scope = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, .2, 10), dark);
    scope.rotation.x = Math.PI / 2; scope.position.set(0, .09, .25); g.add(scope);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, .02, 1.02); g.add(muzzle);
    g.userData.muzzle = muzzle;
  }
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; } });
  return g;
}

export function buildZombie(variant = 0) {
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const palettes = [
    { shirt: 0x585746, pants: 0x3a3b34, skin: 0x8e9176 },
    { shirt: 0x5d4438, pants: 0x2f3332, skin: 0x999479 },
    { shirt: 0x40484a, pants: 0x41403a, skin: 0x878d71 },
    { shirt: 0x4a3d46, pants: 0x33352e, skin: 0x9b9277 },
  ];
  const p = palettes[variant % palettes.length];
  const shirt = new THREE.MeshStandardMaterial({ color: p.shirt, roughness: .97 });
  const pants = new THREE.MeshStandardMaterial({ color: p.pants, roughness: .97 });
  const flesh = new THREE.MeshStandardMaterial({ color: p.skin, roughness: .86 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x26281f, roughness: .9 });
  const mats = [shirt, pants, flesh, dark];

  const torso = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.2, .46, 4, 9), shirt));
  torso.position.y = 1.1; torso.scale.set(1.05, 1, .78); torso.rotation.x = .18; body.add(torso);
  // exposed ribs / torn shirt
  const tear = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.18, .14, .04), flesh));
  tear.position.set(.02, 1.08, .16); tear.rotation.z = .2; body.add(tear);
  const belt = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .06, 9), dark));
  belt.position.y = .82; belt.scale.z = .8; body.add(belt);

  const neck = shadowify(new THREE.Mesh(new THREE.CylinderGeometry(.05, .065, .12, 7), flesh));
  neck.position.y = 1.42; body.add(neck);
  const head = new THREE.Group(); head.position.set(.02, 1.5, .08); body.add(head);
  const skull = shadowify(new THREE.Mesh(new THREE.SphereGeometry(.135, 14, 10), flesh));
  skull.scale.set(.92, 1.06, 1); head.add(skull);
  const jaw = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.1, .07, .1), flesh));
  jaw.position.set(0, -.07, .07); jaw.rotation.x = .3; head.add(jaw);
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(.08, .035, .02), new THREE.MeshBasicMaterial({ color: 0x2b0f0c }));
  mouth.position.set(0, -.055, .12); head.add(mouth);
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(.018, 6, 4), new THREE.MeshBasicMaterial({ color: 0xe4dcb4 }));
    eye.position.set(sx * .05, .03, .12); head.add(eye);
  }

  const armPivot = (sx) => {
    const pg = new THREE.Group(); pg.position.set(sx * .245, 1.34, .03); body.add(pg);
    const upper = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.058, .28, 3, 7), variant % 2 ? shirt : flesh));
    upper.position.y = -.16; pg.add(upper);
    const fore = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.05, .27, 3, 7), flesh));
    fore.position.set(0, -.49, .02); fore.rotation.x = .1; pg.add(fore);
    const hand = shadowify(new THREE.Mesh(new THREE.SphereGeometry(.058, 7, 5), flesh));
    hand.position.set(0, -.67, .04); pg.add(hand);
    return pg;
  };
  const armL = armPivot(-1), armR = armPivot(1);

  const legPivot = (sx) => {
    const pg = new THREE.Group(); pg.position.set(sx * .105, .84, 0); body.add(pg);
    const thigh = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.075, .3, 3, 7), pants));
    thigh.position.y = -.2; pg.add(thigh);
    const shin = shadowify(new THREE.Mesh(new THREE.CapsuleGeometry(.06, .28, 3, 7), variant % 3 ? pants : flesh));
    shin.position.y = -.53; pg.add(shin);
    const foot = shadowify(new THREE.Mesh(new THREE.BoxGeometry(.14, .1, .24), dark));
    foot.position.set(0, -.76, .04); pg.add(foot);
    return pg;
  };
  const legL = legPivot(-1), legR = legPivot(1);

  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return { root, body, head, armL, armR, legL, legR, mats, phase: Math.random() * 7, walkPhase: Math.random() * 6 };
}

export function animateZombie(m, { time, speed, aiming, lunge }) {
  m.root.rotation.y = aiming;
  m.walkPhase += speed * 3.1;
  const w = m.walkPhase;
  const amp = Math.min(1, speed / 1.6);
  m.legL.rotation.x = Math.sin(w) * .48 * (0.35 + amp);
  m.legR.rotation.x = -Math.sin(w) * .48 * (0.35 + amp);
  m.body.position.y = Math.abs(Math.sin(w)) * .035;
  m.body.rotation.x = .12 + Math.sin(w * .5 + m.phase) * .05;
  m.body.rotation.z = Math.sin(w * .5) * .06;
  m.head.rotation.z = .16 + Math.sin(time * .8 + m.phase) * .1;
  m.head.rotation.x = -.1 + Math.sin(w * .5 + m.phase) * .08;
  const reach = lunge ? -1.35 : -0.95;
  m.armL.rotation.x = reach + Math.sin(w + m.phase) * .16;
  m.armR.rotation.x = reach + Math.cos(w + m.phase) * .16;
  m.armL.rotation.z = -.25 + Math.sin(time + m.phase) * .05;
  m.armR.rotation.z = .25;
}
