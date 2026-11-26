# LAST LIGHT — حزمة تعليم Claude

> **الهدف:** تعطي Claude فهماً حقيقياً لكيفية بناء لعبة بقاء بمنظور علوي واقعي، ثم يبني مثلها دون تقليد أعمى.
> **الطريقة:** أرسل هذا الملف + اطلب منه تلخيص الأنظمة أولاً، ثم ابنِ بالترتيب. الكود هنا مقتطفات **حقيقية** من اللعبة، وليست pseudo-code.

---

## 0. البرومبت الجاهز

انسخ هذا مع الملف:

```
You are helping me build a top-down realistic survival game in Three.js.

I attached LAST LIGHT, a complete working game. Do not rewrite it and do not
copy it blindly. First, read the teaching pack and produce:
1. a one-page system map,
2. the 8 decisions that create its "aerial realistic" look,
3. the data flow from input to render.

Then we will rebuild a new game with a different map and story, reusing the
same architecture: grid world -> colliders -> flow-field AI -> combat -> HUD ->
save. Ask me for the theme before writing code. Keep every file under 500 lines.
No external assets: procedural textures and primitive models only.
```

---

## 1. القواعد الثمانية التي تصنع الإحساس

1. **منظور مائل لا عمودي.** كاميرا `PerspectiveCamera` بزاوية 42° وارتفاع ~20م تميل للخلف 13م. العمودي 90° يقتل الظلال والعمق.
2. **شبكة أولاً، رسومات ثانياً.** كل شيء (حركة، تصادم، رؤية، مسارات) على شبكة 2م. هذا يبسّط كل الأنظمة.
3. **لا أصول خارجية.** كل خامة تُرسم على Canvas، وكل مجسم من Primitive. النتيجة أسلوب موحّد وحجم صغير.
4. **ضوء واحد قوي + ظل ناعم.** شمس اتجاهية 2048² + hemi + ambient + ACES. لا تملأ المشهد بأضواء.
5. **اللاعب في الثلث السفلي.** الكاميرا تنظر أمام اللاعب، لا فوقه مباشرة، لترى ما تصوّب عليه.
6. **تصويب على مستوى الأرض.** شعاع من المؤشر يتقاطع مع `y=0`، ثم `atan2`. لا تحوّل إحداثيات الشاشة يدوياً.
7. **AI رخيص وذكي المظهر.** Flow field واحد لكل الزومبي كل 0.42s، مع استثناء: إذا رأوا اللاعب <12م يهجمون مباشرة.
8. **كل فعل يُحفظ.** حفظ تلقائي كل 12s + بعد النهب/البناء/التصنيع. الموت يمسح الحفظ.

---

## 2. خريطة الملفات وتدفق البيانات

```
core.js      بيانات الخريطة + رياضيات + نقاط النهب
   |
textures.js  خامات Canvas
props.js     مجسمات قابلة لإعادة الاستخدام
   |
world.js     بناء المشهد + colliders + إضاءة + night API
setdress.js  توزيع السيارات/الأشجار/الأعمدة
actors.js    نماذج الناجي والزومبي + أنيميشن
fx.js        مطر/دم/رصاص/غبار
audio.js     WebAudio إجرائي
   |
game.js      الحلقة + إدخال + AI + قتال + نهب + حفظ + UI
index.html   DOM + CSS + HUD
```

**تدفق الإطار:**

```
requestAnimationFrame
  -> updateDayCycle      (وقت/ليل/موجات)
  -> updatePlayer        (إدخال -> حركة -> تصادم -> أنيميشن)
  -> computeFlow (كل .42s)
  -> updateZombies       (استشعار -> باب/نافذة -> flow -> هجوم)
  -> updateCamera        (damp + shake)
  -> world.tick          (مطر/دم/أضواء)
  -> renderer.render
```

---

## 3. نظام الإحداثيات

الخريطة 36×36، كل خلية 2م، والمركز `(0,0)`:

```js
````javascript
export const CELL = 2;
export const MAPW = 36;
export const MAPH = 36;
export const WALL_H = 3.0;
export const WALL_T = 0.34;
````
```

التحويل بين الشبكة والعالم:

```js
````javascript
export const worldX = gx => (gx - MAPW / 2) * CELL;
export const worldZ = gy => (gy - MAPH / 2) * CELL;
export const gridX = wx => wx / CELL + MAPW / 2;
export const gridZ = wz => wz / CELL + MAPH / 2;
export const worldToGrid = (x, z) => ({ gx: gridX(x), gy: gridZ(z) });
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, rate, dt) => lerp(a, b, 1 - Math.exp(-rate * dt));
export const smoothstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }
export function angleDiff(a, b) { return Math.atan2(Math.sin(a - b), Math.cos(a - b)); }
````
```

**لماذا؟** حفظ `gx,gy` كأرقام صحيحة يجعل BFS والتصادم والرؤية عمليات فهرسية سريعة. التحويل للمتر يحدث فقط عند الرسم/التصادم الدقيق.

---

## 4. الكاميرا العلوية — السر البصري

```js
````javascript
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
````
```

**اشرح لـ Claude:**
- `camY = 20.4 / zoom` و`camZ = tz + 13.2 / zoom` → زاوية هبوط `atan(20.4/13.2) ≈ 57°`.
- `damp(a,b,rate,dt) = lerp(a,b,1-exp(-rate*dt))` → متابعة مستقلة عن الـ FPS.
- `lookAt(tx, .15, tz - 1.5)` → تقدّم النظر 1.5م أمام اللاعب.
- الاهتزاز يُضاف **بعد** الـ damp ثم يتلاشى، لذا لا يتراكم.
- `state.zoom` من 0.68 إلى 1.55؛ الأكبر = أقرب.

---

## 5. الرندر والإضاءة

```js
````javascript
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
````
```

```js
````javascript
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
````
```

**النقاط الحرجة:**
- `ACESFilmicToneMapping` + `SRGBColorSpace` = ألوان سينمائية غير محروقة.
- `FogExp2` يخفي حدود الخريطة ويصنع ضباباً عمقياً.
- `normalBias .035` يمنع شريط الظل (shadow acne) على الجدران الرقيقة.
- `scene.environment` من PMREM لخامات معدنية واقعية.
- ضوء تعبئة بارد `0x6f8790` يفصل الظلال عن السواد.

---

## 6. الخامات الإجرائية على Canvas

```js
````javascript
export function buildTextures() {
  TEX.bump = canvasTex(grainCanvas(256, 11, 132, 48), { srgb: false, repeat: 1 });
  TEX.brick = canvasTex(makeBrick(), { repeat: 1 });
  TEX.siding = canvasTex(makeSiding(), { repeat: 1 });
  TEX.plaster = canvasTex(makePlaster(), { repeat: 1 });
  TEX.fence = canvasTex(makeFence(), { repeat: 1 });
  TEX.metal = canvasTex(makeMetal(), { repeat: 1 });
  TEX.ground = canvasTex(makeGround(), { repeat: 1, aniso: 8 });
  TEX.blood = canvasTex(makeBlood(), { repeat: 1, wrap: false, aniso: 2 });
  TEX.glow = canvasTex(makeGlow(), { repeat: 1, wrap: false, aniso: 1 });
  TEX.envDusk = makeEnv(false);
  TEX.envNight = makeEnv(true);
  TEX.textSafe = canvasTex(makeLabel('SAFEHOUSE', '#d6e675'), { wrap: false, srgb: true });
  return TEX;
}
````
```

مثال كامل — الطوب:

```js
````javascript
function makeBrick() {
  const S = 256, c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(21);
  g.fillStyle = '#4c4a41'; g.fillRect(0, 0, S, S);
  const bw = 50, bh = 22, gap = 3;
  for (let row = 0, y = 0; y < S; y += bh + gap, row++) {
    const off = (row % 2) * (bw + gap) / 2;
    for (let x = -bw; x < S + bw; x += bw + gap) {
      const r = 96 + rnd() * 34, gg = 60 + rnd() * 22, b = 48 + rnd() * 18;
      g.fillStyle = rgb(r, gg, b);
      g.fillRect(x + off, y, bw, bh);
      g.fillStyle = rgb(r + 18, gg + 14, b + 10, .35);
      g.fillRect(x + off + 2, y + 2, bw - 4, 4);
      if (rnd() > .78) { g.fillStyle = 'rgba(36,30,26,.5)'; g.fillRect(x + off + rnd() * 30, y + rnd() * 12, 8 + rnd() * 12, 4 + rnd() * 6); }
    }
  }
  addNoise(g, S, 10, 5);
  return c;
}
````
```

**الفكرة:** ارسم 256×256، أضف ضوضاء، ثم `CanvasTexture` مع `RepeatWrapping`. استخدم `mulberry32(seed)` لنتائج ثابتة قابلة لإعادة الإنتاج. لا حاجة لأي ملف صورة.

---

## 7. الجدران بـ InstancedMesh

```js
````javascript
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
````
```

**لماذا InstancedMesh؟** مئات الجدران = استدعاء رسم واحد لكل نوع. مع `setColorAt` تحصل على تنوّع لوني دون مواد إضافية.

---

## 8. التصادم والرؤية

```js
````javascript
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

````
```

**التصادم:** دائرة اللاعب ضد كل collider (box أو circle) على مرورين. حالة الصندوق داخل حدوده تُحل بدفع على أصغر محور.

**الرؤية:** مشي على الخط بخطوة 0.3 خلية، وأي خلية `blocksSight` تقطع الرؤية. نفس الدالة تُستخدم للمسدس وللزومبي — اتساق مجاني.

---

## 9. الإدخال والتصويب

```js
````javascript
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
````
```

```js
````javascript
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
````
```

**التصويب الصحيح في لعبة علوية:**

```js
raycaster.setFromCamera(ndc, camera);
raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0), 0), aimPoint);
player.aim = Math.atan2(aimPoint.x - p.x, aimPoint.z - p.z);
```

**لماذا `atan2(x,z)` وليس `(z,x)`؟** لأن Three.js يعتبر `+Z` هو الأمام عند `rotation.y = 0`. استخدم نفس الاصطلاح في كل المشروع.

**اللمس:** عصا يسرى للحركة، سحب يمين للتصويب، ضغطة سريعة = هجوم. أضف `pointer capture` وإلا ستفقد الأحداث خارج العنصر.

---

## 10. حركة اللاعب

```js
````javascript
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
  playerLight.position.set(wx, 3.1, wz);
  playerLight.intensity = state.nightFactor * 2.4;
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
````
```

- الحركة تُحسب في الشبكة ثم `moveActor` يحوّلها للمتر ويستدعي `resolveCircle`.
- الجري يستهلك 17 stamina/ث، والتعافي 8–15/ث.
- الجوع ينقص 0.17/ث؛ عند الصفر يخسر 1.15 hp/ث.
- الكشاف (SpotLight) يتبع اتجاه النظر ليلاً؛ نفس الضوء يُستخدم كوميض إطلاق.

---

## 11. Flow Field + ذكاء الزومبي

```js
````javascript
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
````
```

```js
````javascript
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
````
```

**التسلسل:**
1. BFS من خلية اللاعب على الخلايا غير المحجوبة (الأبواب والنوافذ تُعتبر سالكة للتخطيط).
2. كل زومبي يقرأ الجار الأقل قيمة → اتجاه.
3. إذا اللاعب `<12م` وبخط رؤية → اتجاه مباشر (تجاوز البطء).
4. إذا باب/نافذة `<1.75م` → توقف واكسر كل 1.45s.
5. وإلا → تجوال 30% من السرعة.

**لماذا ليس A\* لكل زومبي؟** 30 زومبي × BFS واحد = 30 قراءة مصفوفة فقط. A\* لكل واحد = 30 بحثاً كاملاً.

---

## 12. القتال

```js
````javascript
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
````
```

```js
````javascript
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
````
```

- القريب: مخروط `±0.95rad` وأقرب هدف فقط + دفع للخلف.
- المسدس: hitscan، فحص `perp` < 0.82، ثم `lineOfSight`، ثم tracer/وميض/صوت.
- `noisy(34)` يوقظ الزومبي حول مكان الإطلاق — الصوت سلاح ذو حدين.
- أرقام الضرر في جدول واحد ليسهل ضبط التوازن.

---

## 13. الليل والموجات

```js
````javascript
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
````
```

```js
````javascript
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
````
```

**المنحنى:** `smoothstep(138,164,t) * (1 - smoothstep(372,390,t))` — غروب تدريجي 26 ثانية، وفجر تدريجي 18 ثانية. لا تقفز بين نهار وليل.

**الموجات:** العدد يزيد مع رقم الموجة، والفاصل يقصر حتى 15 ثانية، بسقف 30 زومبي حي. هذا يمنع الانهيار ويحافظ على الرهبة.

---

## 14. الحفظ

```js
````javascript
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
````
```

- مفتاح واحد + رقم إصدار `v:1` → ترقية الحفظ لاحقاً دون كسر القديم.
- احفظ **الحالة الدنيا** فقط (موقع، صحة، موارد، حالة الفتحات، النهب) وأعد بناء المشهد.
- `try/catch` حول `localStorage` حتى لا تتعطل اللعبة في التصفح الخاص.
- الموت/الفوز يمسحان الحفظ.

---

## 15. نموذج الناجي والأنيميشن

```js
````javascript
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

````
```

- كل الأجزاء Primitive (Capsule/Box/Sphere) — لا موديلات.
- `weaponMount` منفصل عن الذراع حتى يبقى التصويب مقروءاً.
- الأنيميشن إجرائي: `sin(walkPhase)` للأرجل والذراعين، وميل بسيط للجسم.
- `castShadow` على كل mesh، وهذا نصف الإحساس الواقعي.

---

## 16. ترتيب البناء — لا تبدأ بالرسومات

1. `core.js`: الخريطة + التحويلات + `isSolid`.
2. سيرفر + `index.html` + renderer + كاميرا + أرضية.
3. لاعب كبسولة + WASD + كاميرا تتبعه.
4. تصويب الماوس + مؤشر.
5. جدران من الخريطة + `resolveCircle`.
6. زومبي: حركة مباشرة أولاً، ثم flow field.
7. قتال + صحة + موت.
8. HUD + نهب.
9. ليل + موجات.
10. حفظ + نهاية.
11. خامات وديكور ومؤثرات **آخر شيء**.

> إذا بدأت بالخامات، ستبني لعبة جميلة لا تُلعب.

---

## 17. أرقام الضبط الأساسية

| الشيء | القيمة |
|---|---|
| حجم الخلية | 2 م |
| حجم الخريطة | 36×36 خلية (72×72 م) |
| FOV | 42° (48° جوال) |
| ارتفاع الكاميرا | 20.4 / zoom |
| إزاحة الكاميرا للخلف | 13.2 / zoom |
| مدى التكبير | 0.68–1.55 |
| مشي / جري | 2.22 / 3.52 م/ث |
| صحة الزومبي | 64 (46 عدّاء) |
| سرعة الزومبي | 1.08 / 1.56 خلية/ث |
| الغروب / الفجر | 150s / 390s |
| وزن الحقيبة | 50 |
| الحفظ التلقائي | كل 12s |

---

## 18. أخطاء شائعة تجنّبها

- **OrthographicCamera** → يبدو مسطحاً. استخدم Perspective.
- **كاميرا فوق اللاعب مباشرة** → لا ترى ما أمامك. أزحها للخلف.
- **تصويب بإحداثيات الشاشة** → ينحرف مع تغيّر الكاميرا. استخدم Raycaster + plane.
- **A\* لكل زومبي كل إطار** → بطء. Flow field.
- **تحديث DOM كل إطار** → بطء. كل 0.16s يكفي.
- **ظلال على كل ضوء** → بطء. ضوء شمس واحد + ظل الكشاف فقط.
- **حفظ المشهد كله** → هش. احفظ الحالة الدنيا.
- **أصول خارجية كثيرة** → حجم وتنزيل وتعقيد. إجرائي أولاً.

---

## 19. الكود الكامل

هذه الحزمة تعليمية. الكود الكامل (10 ملفات، ~4000 سطر) موجود في:

- `LAST-LIGHT-FULL-SOURCE.md` — كل الملفات + الشرح.
- `dist/last-light-source.zip` — مشروع جاهز للتشغيل.
- `source.html` — عارض في المتصفح مع زر Copy all / Download.
