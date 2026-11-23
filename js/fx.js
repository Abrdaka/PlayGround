/* LAST LIGHT — weather and impact effects */
import * as THREE from '../vendor/three.module.min.js';
import { mulberry32 } from './core.js';

export function createRain(scene) {
  const COUNT = 1300;
  const pos = new Float32Array(COUNT * 6);
  const drops = [];
  const rnd = mulberry32(303);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.LineBasicMaterial({ color: 0xa9c4c8, transparent: true, opacity: .2, depthWrite: false });
  const mesh = new THREE.LineSegments(geo, mat);
  mesh.frustumCulled = false;
  scene.add(mesh);
  function reset(i, focus, initial) {
    const d = drops[i];
    d.x = focus.x + (rnd() - .5) * 62;
    d.z = focus.z + (rnd() - .5) * 62;
    d.y = initial ? rnd() * 26 : 22 + rnd() * 8;
    d.v = 17 + rnd() * 9;
    d.len = .45 + rnd() * .55;
    d.x0 = d.x;
    d.z0 = d.z;
  }
  const focus0 = { x: 0, z: 0 };
  for (let i = 0; i < COUNT; i++) { drops.push({}); reset(i, focus0, true); }
  function write(i) {
    const d = drops[i], o = i * 6;
    pos[o] = d.x; pos[o + 1] = d.y; pos[o + 2] = d.z;
    pos[o + 3] = d.x - .12 * d.len; pos[o + 4] = d.y - d.len; pos[o + 5] = d.z;
  }
  for (let i = 0; i < COUNT; i++) write(i);
  return {
    mesh, material: mat,
    tick(dt, focus) {
      for (let i = 0; i < COUNT; i++) {
        const d = drops[i];
        d.y -= d.v * dt;
        d.x += dt * 1.1;
        d.z += dt * .35;
        if (d.y < -.2) reset(i, focus, false);
        write(i);
      }
      geo.attributes.position.needsUpdate = true;
    }
  };
}

export function createBlood(scene, tex) {
  const CAP = 150;
  const geo = new THREE.PlaneGeometry(1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, opacity: .92 });
  const mesh = new THREE.InstancedMesh(geo, mat, CAP);
  mesh.receiveShadow = false;
  mesh.frustumCulled = false;
  const dummy = new THREE.Object3D();
  dummy.scale.setScalar(0); dummy.updateMatrix();
  for (let i = 0; i < CAP; i++) mesh.setMatrixAt(i, dummy.matrix);
  mesh.count = CAP;
  scene.add(mesh);
  let idx = 0;
  const rnd = mulberry32(505);
  return {
    mesh,
    add(x, z, scale = 1, dark = false) {
      dummy.position.set(x + (rnd() - .5) * .5, .022 + idx * 0.00001, z + (rnd() - .5) * .5);
      dummy.rotation.set(0, rnd() * Math.PI * 2, 0);
      const s = scale * (.8 + rnd() * .8);
      dummy.scale.set(s, 1, s * (.7 + rnd() * .5));
      dummy.updateMatrix();
      mesh.setMatrixAt(idx, dummy.matrix);
      idx = (idx + 1) % CAP;
      mesh.instanceMatrix.needsUpdate = true;
    }
  };
}

export function createTracers(scene) {
  const pool = [];
  for (let i = 0; i < 6; i++) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const mat = new THREE.LineBasicMaterial({ color: 0xffe3a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    const line = new THREE.Line(geo, mat);
    line.frustumCulled = false;
    scene.add(line);
    pool.push({ line, mat, geo, life: 0 });
  }
  let next = 0;
  return {
    shoot(from, to) {
      const p = pool[next++ % pool.length];
      const a = p.geo.attributes.position.array;
      a[0] = from.x; a[1] = from.y; a[2] = from.z;
      a[3] = to.x; a[4] = to.y; a[5] = to.z;
      p.geo.attributes.position.needsUpdate = true;
      p.life = .1; p.mat.opacity = .95;
    },
    tick(dt) {
      for (const p of pool) {
        if (p.life > 0) {
          p.life -= dt;
          p.mat.opacity = Math.max(0, p.life / .1);
        }
      }
    }
  };
}

export function createMuzzle(scene, glowTex) {
  const light = new THREE.PointLight(0xffcf8a, 0, 9, 2);
  scene.add(light);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffdda0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
  sprite.scale.set(.9, .9, 1);
  scene.add(sprite);
  let life = 0;
  return {
    flash(x, y, z) {
      light.position.set(x, y, z); light.intensity = 26;
      sprite.position.set(x, y, z); sprite.material.opacity = .95;
      life = .075;
    },
    tick(dt) {
      if (life > 0) {
        life -= dt;
        if (life <= 0) { light.intensity = 0; sprite.material.opacity = 0; }
      }
    }
  };
}

export function createDust(scene) {
  const N = 220;
  const pos = new Float32Array(N * 3);
  const rnd = mulberry32(707);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (rnd() - .5) * 60;
    pos[i * 3 + 1] = rnd() * 6 + .3;
    pos[i * 3 + 2] = (rnd() - .5) * 60;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xd7d9bd, size: .045, transparent: true, opacity: .28, depthWrite: false, sizeAttenuation: true });
  const mesh = new THREE.Points(geo, mat);
  mesh.frustumCulled = false;
  scene.add(mesh);
  return {
    mesh,
    tick(dt, t) {
      const a = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        a[i * 3] += Math.sin(t * .3 + i) * dt * .06;
        a[i * 3 + 1] += Math.sin(t * .5 + i * 2) * dt * .025;
      }
      geo.attributes.position.needsUpdate = true;
    }
  };
}
