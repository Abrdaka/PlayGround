# LAST LIGHT — Dead County · حزمة الكود الكاملة

> **ما هذا الملف؟** نسخة واحدة قابلة للنسخ واللصق تحتوي على **كل كود اللعبة**: الجرافكس، الإضاءة، الكاميرا العلوية، التحكم بالكيبورد والماوس واللمس، الذكاء الاصطناعي للزومبي، القتال، النهب، التصنيع، دورة الليل والنهار، الحفظ، وشاشات البداية والنهاية — بالإضافة إلى شرح معماري كامل في الأعلى.
>
> **كيف تعطيه لـ Claude؟** أرسل له هذا الملف كاملاً ثم اكتب:
> `This is a complete browser game. Read the architecture section, then help me extend it. Do not rewrite it from scratch.`
>
> **نسخة أقصر للتعليم:** `CLAUDE-LEARN-LAST-LIGHT.md` (حوالي 1000 سطر) تشرح القرارات مع مقتطفات الكود الأساسية — أفضل إذا كانت نافذة Claude محدودة.
>
> **عارض في المتصفح:** افتح `/source.html` لنسخ الكود أو تنزيله بضغطة واحدة.
>
> الرابط الحي (إن وُجد): مشروع PlayGround — الملفات الجذرية `index.html` و `js/`.

---

## 1. التشغيل / How to run

لا يوجد build ولا npm. ملفات ES Modules ثابتة + Three.js محلي.

```bash
# from the project root
python3 -m http.server 8080
# open http://localhost:8080
```

> لازم سيرفر HTTP محلي. فتح `index.html` مباشرة عبر `file://` لن يعمل بسبب `type="module"`.

**المتطلبات:** متصفح حديث يدعم WebGL2. لا صور ولا موديلات خارجية — كل شيء يُولَّد إجرائياً (procedural) وقت التشغيل من Canvas و Three.js primitives.

**Three.js:** `vendor/three.module.min.js` — r160، MIT. غير مضمّن هنا لأنه ملف مصغّر 670KB؛ نزّله من `three@0.160.0/build/three.module.min.js` أو استخدم نسخة المشروع.

**بنية الملفات:**

```
index.html          كل الـ CSS والـ DOM وواجهة اللاعب (386 سطر)
js/core.js          خريطة الكاونتي، الثوابت، الرياضيات، بيانات النهب (123)
js/textures.js      توليد كل الخامات على Canvas: طوب، خشب، أسفلت، معدن، دم، سماء (387)
js/props.js         مكتبة مجسمات: سيارات، أعمدة نور، أشجار، صناديق، براميل... (365)
js/setdress.js      توزيع الديكور والسيارات والأضواء على الخريطة (186)
js/actors.js        بناء الناجي والزومبي + أنيميشن إجرائي (249)
js/fx.js            مطر، دم، رصاص، وميض فوهة، غبار (160)
js/audio.js         صوت إجرائي بالكامل عبر WebAudio (124)
js/world.js         بناء المشهد، الجدران، الأبواب، التصادم، الإضاءة، الليل (490)
js/game.js          الحلقة الرئيسية، التحكم، AI، القتال، النهب، الحفظ، HUD (1224)
```

---

## 2. ملخص سريع لمن يقرأ الكود أول مرة

- **المنظور:** كاميرا `PerspectiveCamera` بزاوية `42°`، موضوعة فوق اللاعب وارتفاعها `20.4` ونازلة للخلف `+13.2` — أي زاوية هبوط ≈ **57°**. هذا يعطي إحساس "طائرة مسيّرة / تصوير جوي" مع عمق حقيقي وظلال، وليس منظوراً إيزومتريكياً مسطحاً.
- **العالم:** خريطة شبكية `36×36` خلية، كل خلية `2` متر. العالم كله `72×72m`. الخريطة نصية داخل `core.js` (سهلة التعديل).
- **الرسومات:** لا textures جاهزة. كل خامة تُرسم على `<canvas>` ثم `CanvasTexture`؛ الجدران `InstancedMesh` لتقليل draw calls؛ إضاءة نهار/ليل مع PMREM environment، ظلال PCFSoft، وACES tone mapping.
- **القتال:** ضربات قريبة بمخروط زاوية، ومسدس hitscan مع فحص خط الرؤية. أرقام ضرر وأوزان أسلحة في `game.js`.
- **الـ AI:** Flow Field (BFS) يُعاد حسابه كل `0.42s` من خلية اللاعب، والزومبي يتبع التدرّج؛ لكن إذا شافوا اللاعب على مسافة `<12m` يهجمون مباشرة. يكسّرون الأبواب والنوافذ إذا وصلوا لها.
- **الحفظ:** `localStorage` بمفتاح `lastlight.deadcounty.v1`، حفظ تلقائي كل 12 ثانية + بعد كل فعل مهم.

---

## 3. المعمارية التفصيلية / Architecture

### 3.1 نظام الإحداثيات (grid ⇄ world)

الخريطة 36×36، والمركز `(0,0)` في منتصفها:

```js
CELL = 2
worldX = gx => (gx - 18) * 2
worldZ = gy => (gy - 18) * 2
gridX  = wx => wx / 2 + 18
gridZ  = wz => wz / 2 + 18
```

- اللاعب والزومبي يُحفظون بوحدات **الشبكة** (`gx, gy`) وليس المتر، لذا التصادم والـ BFS سهلان.
- `world.resolveCircle(x, z, r)` يحوّل الحركة إلى متر، يدفع الكائن خارج كل `collider` (box أو circle) على مرورين، ثم يرجع النتيجة.
- `world.lineOfSight(x1,z1,x2,z2)` يمشي على الخط بخطوة `0.3` خلية ويسأل `blocksSight`.

**رموز الخريطة في `core.js`:**

| رمز | معنى | تصادم |
|---|---|---|
| `#` | جدار طوب | نعم |
| `%` | جدار جص/ملاط | نعم |
| `\|` | جدار خشب | نعم |
| `f` | سياج (ارتفاع 2.05) | نعم |
| `D` | باب | حسب الفتح/اللوح |
| `W` | نافذة | نعم حتى تُكسَر |
| `d` | فتحة مكسورة | لا |
| `x` | جسم صلب (سيارة/عائق) | نعم |
| `g` | عشب | لا |
| `;` | رصيف | لا |
| `.` | طريق | لا |
| `t`,`F`,`c` | أرضيات داخلية | لا |

### 3.2 الكاميرا العلوية (أهم جزء بصري)

```js
const camera = new THREE.PerspectiveCamera(42, aspect, .1, 260);

function updateCamera(dt, t) {
  const dist = 1 / state.zoom;          // zoom .68 .. 1.55
  const camY = 20.4 * dist;
  const camZ = tz + 13.2 * dist;        // خلف اللاعب على محور +Z
  camera.position.x = damp(camera.position.x, tx, 5.5, dt);
  camera.position.y = damp(camera.position.y, camY, 4.5, dt);
  camera.position.z = damp(camera.position.z, camZ, 5.5, dt);
  camera.lookAt(tx, .15, tz - 1.5);     // نظرة للأمام قليلاً
}
```

لماذا يبدو واقعياً؟

1. **Perspective وليس Orthographic** → جدران السيارات والمباني لها جوانب وظلال، مما يكسر الإحساس المسطح.
2. **زاوية هبوط 57°** → ترى السطح والأرضية والأوجه الأمامية معاً، مثل تصوير درون منخفض.
3. **Damping أسّي** (`1 - exp(-rate*dt)`) → متابعة ناعمة بدون تقطيع.
4. **ميل ثابت +13.2 على Z** → اللاعب في الثلث السفلي من الشاشة، والمساحة أمامه أكبر للتصويب والاستكشاف.
5. **اهتزاز** (`state.shake`) عند الإصابة/الرصاص، مع تلاشٍ `1.7/s`.
6. **FOV يتغيّر** إلى `48` على الشاشات الصغيرة.
7. **مشهد افتتاحي مداري:** `introCamera()` يدور حول السيف هاوس بنصف قطر 17 وارتفاع 13.8 قبل الضغط على "ابدأ".

**تكبير/تصغير:** عجلة الماوس تغيّر `state.zoom` بين `0.68` و`1.55`؛ القيمة الأكبر = أقرب.

### 3.3 الإضاءة والجو (Realism stack)

داخل `world.js`:

```js
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.fog = new THREE.FogExp2(0x43503f, .012);
hemi  = HemisphereLight(0xa9b7ae, 0x2b2f24, .9)
amb   = AmbientLight(0x4d5b58, .28)
sun   = DirectionalLight(0xffd6a2, 2.5) at (-34, 38, 24)
        shadow map 2048²، ortho ±46، bias -0.0006، normalBias .035
fill  = DirectionalLight(0x6f8790, .35) at (28, 22, -30)
```

- `TEX.envDusk` و`TEX.envNight` بيئتان مولّدتان على Canvas ثم تمرّان على `PMREMGenerator` لتعطي انعكاسات واقعية على المعدن والزجاج.
- **الغروب/الليل:** `world.setNight(f)` يخلط ألوان السماء والضباب والشمس والـ hemi، ويشغّل أضواء الشوارع تدريجياً، ويبدّل environment map.
- **الكشاف اليدوي:** `SpotLight` يتبع اتجاه نظر اللاعب وقت الليل، مع ظل، ويُضاء أيضاً عند إطلاق النار (`flash.intensity`).
- **الغبار/المطر:** `FogExp2` + جزيئات مطر + شرائح GLOW additive.
- **طبقات CSS:** تدرّج سينمائي + vignette + grain + وميض دم عند الإصابة (`index.html`).

### 3.4 بناء العالم (`world.js`)

Pipeline عند `buildWorld(scene, renderer)`:

1. `buildTextures()` → كل الخامات على Canvas.
2. `createPropKit(TEX)` → مواد ومجسمات قابلة لإعادة الاستخدام.
3. خلفية + ضباب + شمس + ظلال + ground plane `72×72` مع bump.
4. **الجدران:** المرور على الخريطة، تحديد إن كان الجدار أفقياً أو عمودياً، ثم تجميعها في `InstancedMesh` لكل نوع (brick/wood/plaster/fence) مع تلوين عشوائي خفيف لكل خلية.
5. **الأبواب/النوافذ:** `makeOpening` تبني الإطار، اللوح، الزجاج، المسامير. كل فتحة عندها `reinforced 0..3`, `hp`, `breached`, `open`, `secure`.
6. **الكولايدرز:** `addBox` و`addCircle` أثناء البناء؛ نفس القائمة تُستخدم للحركة والرؤية.
7. **النهب:** 9 نقاط من `LOOT_SPOTS` مع مجسم وعلامة متوهجة.
8. **السيارة:** بيك أب ميت + كروزر شرطة، قابلة للتصليح والتزويد بالوقود للهروب.
9. **الديكور:** `setdress.js` — عمود نور، أشجار، سيارات محطمة، أسوار، أكياس رمل، حطام.
10. **المؤثرات:** `fx.js` — مطر، دم، رصاص، فوهة، غبار.
11. **واجهة `tick(dt,t,focus,nightFactor)`:** تحرّك المطر والغبار والدم، وتومض أضواء الشوارع والنيون.

### 3.5 التحكم (`game.js` — input)

**كيبورد:**

| المفتاح | الوظيفة |
|---|---|
| `W A S D` / الأسهم | حركة نسبة إلى الشاشة |
| `Shift` | جري (يستهلك stamina) |
| `E` | تفاعل: نهب، فتح/إغلاق باب، نزع لوح، تصليح سيارة |
| `F` | تثبيت لوح / رفع لوح |
| `C` | التصنيع |
| `I` | حقيبة العدة |
| `Tab` | دليل النجاة |
| `Esc` | إغلاق أي نافذة |
| `Space` / زر الماوس الأيسر | هجوم/إطلاق |
| عجلة الماوس | تقريب/تبعيد |
| `Enter` | بدء اللعب من شاشة البداية |

**الماوس — التصويب:**
```js
raycaster.setFromCamera(ndc, camera);
raycaster.ray.intersectPlane(PLANE, aimPoint); // PLANE = y=0
player.aim = Math.atan2(aimPoint.x - px, aimPoint.z - pz);
```
أي أن التصويب يعتمد على تقاطع شعاع المؤشر مع **مستوى الأرض** — وهذا هو الأسلوب الصحيح في الألعاب العلوية، وليس تحويل إحداثيات الشاشة مباشرة.
مؤشر DOM صغير (`#reticle`) يتحول للأحمر إذا كان هناك زومبي في مخروط `±0.22rad` ومسافة `9m`.

**اللمس:**
- عصا افتراضية يسرى (`#joy`) للحركة عبر `pointer capture`.
- السحب على الجانب الأيمن يصوّب ويرمي؛ الضغط السريع `<360ms` وحركة `<18px` = هجوم.
- أزرار: STRIKE / USE / BOARD / RUN / CRAFT / KIT.
- مساعدة تصويب: عند الهجوم باللمس يلتقط أقرب زومبي داخل `5.5m` ويوجّه نحوه.

**حركة اللاعب:** `moveActor(player, x*step, z*step, radius)` ثم تثبيت داخل حدود الخريطة. السرعة: مشي `2.22 m/s`، جري `3.52 m/s`.

### 3.6 دورة اللعب والوقت

- `state.dayTime` بالثواني. الغروب عند **150s**، الفجر عند **390s**.
- `nightFactorAt(t) = smoothstep(138,164,t) * (1 - smoothstep(372,390,t))` → انتقال ناعم.
- عند الغروب: `onNightfall()` + موجة أولى 5 زومبي + تحذير.
- موجات ليلية: العدد `2 + min(4, floor(waveN*.8))`، الفاصل `max(15, 30 - waveN*1.6)`، بحد أقصى 30 حياً.
- `spawnNightWave` توزّع من `NIGHT_SPAWNS` على أطراف الخريطة، مع `runner` باحتمال متزايد.
- الانتهاء: الفجر = فوز، الهروب بالسيارة = فوز، الموت = خسارة، مع إحصائيات (وقت/قتلات/غنائم).

### 3.7 الذكاء الاصطناعي للزومبي

- **Flow field:** `Int16Array` بحجم 1296، BFS من خلية اللاعب، إعادة حساب كل `0.42s`. يُظهر اتجاه الهبوط التالي `flowNext(z)`.
- **الاستشعار:** خط رؤية `<34m` نهاراً (فعلياً `<21m` نهاراً و`<34m` ليلاً)، `alert` يتلاشى مع الوقت.
- **السلوك:**
  - إذا فيه باب/نافذة قريبة `<1.75m` → يضربها كل `1.45s` بضرر 17 (+8 للعدّاء).
  - إذا اللاعب `<12m` وبخط رؤية → يهجم مباشرة.
  - وإلا → يتبع flow field.
  - إذا ما فيه إنذار → تجوال عشوائي بطيء (30% من السرعة).
- **السرعة:** عادي `1.08`، عدّاء `1.56` (بوحدات الشبكة/ث ≈ ضعفها بالمتر).
- **الضرر:** 7–14 (+3 للعدّاء) عند `<1.05m`، مع تهدئة 1.35s.
- **الموت:** يسقط للأمام (`rotation.x = -1.5`)، يبقى جثة، ويُحدّ من العدد إلى 14 جثة.

### 3.8 القتال

| السلاح | ضرر | مدى | تهدئة | ملاحظة |
|---|---|---|---|---|
| Fists | 26 | 2.05 | 0.46s | مجاني |
| Scrap shiv | 50 | 2.05 | 0.42s | يُصنع |
| Nailed bat | 86 | 2.35 | 0.78s | يُصنع |
| Sidearm | 125 | 26m hitscan | 0.5s | يستهلك ammo، صوته يجذب الزومبي |

- الضرب القريب: مخروط `±0.95rad`، وأقرب هدف فقط، مع دفع الزومبي للخلف.
- المسدس: `perp = |cross|` بحد `0.82`، فحص `world.lineOfSight`، ثم tracer + وميض + صوت + `noisy(34)`.
- الرصاص يخترق خط واحد فقط (أقرب هدف)، وليس penetration متعدد.

### 3.9 النهب، الوزن، التصنيع

- 8 أنواع موارد: `wood, scrap, cloth, parts, ammo, food, chem, fuel`.
- سعة الحمل `50 wt`، لكل مورد وزن. النهب **جزئي** إذا امتلأت السعة، ويُبلّغ اللاعب.
- 9 نقاط نهب ثابتة، وعلامات متوهجة تختفي عند إفراغها.
- وصفات التصنيع:
  - Scrap shiv: 2 scrap + 1 cloth
  - Nailed bat: 3 wood + 1 scrap
  - Field dressing: 2 cloth + 1 chem (+40 hp)
  - Makeshift ammo: 1 scrap + 1 chem (+4 rounds)
  - Repaired sidearm: 2 parts + 2 scrap + 1 chem
- الأكل: +30 hunger و+5 hp. الدواء: +25 hp.
- السيارة: تصليح بـ 3 scrap + 1 part، ثم 1 fuel، ثم الهروب.

### 3.10 الحفظ والاستمرار

```js
SAVE_KEY = 'lastlight.deadcounty.v1'
```
يُحفظ: الوقت، القتلات، الغنائم، اللاعب (موقع/صحة/جوع/تعب/اتجاه)، الموارد، السلاح، حالة السيارة، كل فتحة (`reinforced, hp, breached, closed`)، وكل نقطة نهب (نشطة/متبقي). الحفظ كل 12s + بعد الأحداث المهمة + عند `beforeunload`. زر "Continue" يظهر إذا وُجد حفظ.

### 3.11 الأداء

- `setPixelRatio(min(dpr, 1.8))` و`1.5` على الجوال.
- `InstancedMesh` للجدران.
- تجميع المواد وإعادة استخدامها في `props.js`.
- ظل واحد directional فقط + ظل الكشاف (512).
- تحديث HUD كل `0.16s` وليس كل frame.
- هندسة منخفضة poly، بدون أي textures خارجية.
- `dt` مقصوص عند `0.05` لمنع قفزات الفيزياء عند تجمّد التبويب.

### 3.12 المؤثرات والصوت

`fx.js`: مطر LineSegments يتبع الكاميرا، رشّ دم على الأرض كـ planes، رصاص كخطوط مضيئة، وميض فوهة، غبار محيطي.
`audio.js`: WebAudio خالص — ضوضاء مُولّدة، مرشّحات، مذبذبات. أصوات: خطوة، ضربة، رصاص، طلق فارغ، إصابة، موت، مطر، رياح، همهمات ليلية، قلب عند انخفاض الصحة، فوز/خسارة.

### 3.13 واجهة المستخدم

- HUD سفلي يسار: Health / Stamina / Hunger + حالة المحيط (door/window pips).
- حقيبة يسار: وزن، موارد، السلاح، أزرار التصنيع.
- وسط أعلى: الهدف + العدّاد (الغروب/الفجر).
- برومبت تفاعلي `E` و`F` أسفل الشاشة.
- نوافذ: Crafting / Field Kit / Survival Guide.
- شاشة بداية سينمائية + شاشة نهاية بثلاث حالات.
- كل الـ CSS داخل `index.html` (بدون Tailwind أو build step).

---

## 4. أين تعدّل ماذا / Tuning map

| تريد تغيير | المكان |
|---|---|
| شكل الخريطة والمباني | `js/core.js` → `MAP_ROWS` |
| حجم العالم | `CELL`, `MAPW`, `MAPH` في `core.js` (تأكد من أبعاد `MAP_ROWS`) |
| زاوية/ارتفاع الكاميرا | `game.js` → `updateCamera()` (20.4 و13.2) |
| مدى التكبير | `game.js` → `wheel` listener (0.68–1.55) |
| سرعة اللعب/الجري | `updatePlayer()` → 2.22 / 3.52 |
| ضرر الأسلحة | `attack()` و`firePistol()` |
| صحة الزومبي/سرعته | `spawnZombie()` و`updateZombies()` |
| توقيت الليل | `updateDayCycle()` + `nightFactorAt()` (150/390) |
| عدد الموجات وصعوبتها | `spawnNightWave()` و`waveT` |
| وصفات التصنيع | `recipes` في `game.js` |
| نقاط النهب | `LOOT_SPOTS` في `core.js` |
| الإضاءة والألوان | `world.js` → sun/hemi/fog/`setNight()` |
| القمر/المطر | `world.js` + `fx.js` + `audio.js` |
| النصوص والواجهة | `index.html` |

---

## 5. قرارات تصميمية متعمّدة (لتفهم "لماذا")

1. **بدون أصول خارجية:** كل شيء إجرائي → المشروع يعمل offline، حجم صغير، وسهل على Claude يفهم كل بكسل.
2. **المنظور مائل لا عمودي 90°:** العمودي يقتل الإحساس بالعمق والظلال. 57° يعطي واقعية درون.
3. **الشبكة أساس كل شيء:** الحركة، التصادم، الرؤية، والـ pathfinding على نفس الشبكة → كود أقل وأخطاء أقل.
4. **Flow field بدل A\* لكل زومبي:** 30 زومبي × BFS واحد كل 0.42s = رخيص جداً.
5. **الحفظ في `localStorage`:** لا سيرفر ولا حساب. مناسب للعبة ويب كاملة.
6. **HUD بـ DOM فوق Canvas:** أوضح وأسهل تنسيقاً من رسم UI داخل WebGL.

---

## 6. حدود معروفة / أفكار للتوسعة

- لا يوجد نظام صوت ثلاثي الأبعاد (كل الأصوات 2D).
- الزومبي لا يصعدون الأسطح ولا يتسللون من أبواب غير مكسورة (يكسرون فقط باب/نوافذ السيف هاوس).
- لا يوجد سلاح ثانوي/تبديل سريع، ولا ذخيرة في المخزن إلا بالتصنيع.
- الجثث ثابتة ولا تتحلل.
- لا توجد حيوانات أو NPCs ودّية.
- يمكن إضافة: مخبأ سيارات، مهمات عشوائية، أجواء عاصفة، حفظ متعدد، gamepad، مولد أصوات أفضل.

---

# 7. الكود الكامل / Full source

> كل ما يلي هو محتوى الملفات كما هو. الملفات مفصولة بعناوين `### FILE: path`. انسخ كل قسم إلى ملفه.
> `vendor/three.module.min.js` غير مضمّن (مكتبة خارجية مصغّرة). استخدم Three.js r160.


### FILE: `index.html`

````javascript
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="theme-color" content="#0d120e">
<title>LAST LIGHT — Dead County · Aerial Survival</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%230d120e'/><circle cx='16' cy='16' r='7' fill='%23d6e675'/></svg>">
<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
:root{
  --ink:#e7e8d9;--muted:#98a092;--lime:#d6e675;--red:#e26951;--amber:#e2b566;
  --glass:rgba(12,17,13,.84);--glass2:rgba(10,14,11,.72);--line:rgba(224,235,202,.14);
  --safe:env(safe-area-inset-bottom,0px);
}
*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#0d120e;color:var(--ink);font-family:'Barlow Condensed',sans-serif;-webkit-tap-highlight-color:transparent}
button{font:inherit;color:inherit;cursor:pointer}
canvas{display:block}
#game{position:relative;width:100%;height:100%;isolation:isolate;background:#0b100c;overflow:hidden}
#view{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}
.grade{position:absolute;inset:0;z-index:1;pointer-events:none;background:
  linear-gradient(180deg,rgba(10,16,12,.34) 0%,transparent 18%,transparent 74%,rgba(8,12,9,.42) 100%),
  linear-gradient(90deg,rgba(10,15,11,.28),transparent 22%,transparent 78%,rgba(9,13,10,.3))}
.vignette{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 34%,rgba(4,8,5,.22) 70%,rgba(3,5,4,.72) 100%)}
.grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.055;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")}
.hitflash{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse at center,transparent 20%,rgba(166,28,16,.62) 100%);opacity:0;transition:opacity .18s}
.hitflash.on{opacity:1}
.bloodscreen{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;transition:opacity .9s;background:radial-gradient(ellipse at center,transparent 44%,rgba(92,12,7,.5) 100%)}
body.hurt .bloodscreen{opacity:1}
.reticle{position:absolute;z-index:6;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;pointer-events:none;opacity:0;transition:opacity .2s}
#game.playing .reticle{opacity:.9}
#game.modal-open .reticle,.reticle.hot{opacity:0}
.reticle:before{content:'';position:absolute;left:11px;top:11px;width:4px;height:4px;border-radius:50%;background:var(--ink);box-shadow:0 0 6px #000}
.reticle i{position:absolute;background:rgba(231,232,217,.72);box-shadow:0 0 4px #000}
.reticle i:nth-child(1){left:12px;top:0;width:1px;height:7px}
.reticle i:nth-child(2){left:12px;bottom:0;width:1px;height:7px}
.reticle i:nth-child(3){top:12px;left:0;height:1px;width:7px}
.reticle i:nth-child(4){top:12px;right:0;height:1px;width:7px}
.reticle.enemy i{background:var(--red)}
.reticle.enemy:before{background:var(--red)}
.topbar{position:absolute;z-index:4;top:0;left:0;right:0;height:76px;padding:16px 28px;display:flex;align-items:flex-start;justify-content:space-between;background:linear-gradient(180deg,rgba(7,11,8,.88),rgba(7,11,8,0));transition:opacity .35s}
.brand{font-size:13px;font-weight:800;letter-spacing:.26em;text-transform:uppercase;line-height:1}
.brand b{color:var(--lime)}
.location{margin-top:6px;font:9px 'DM Mono',monospace;letter-spacing:.16em;color:#a6ac9c;display:flex;gap:8px;align-items:center}
.location i{display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--lime);box-shadow:0 0 8px var(--lime)}
.top-right{display:flex;align-items:center;gap:16px;margin-top:2px}
.clockbox{text-align:right}
.day{display:flex;align-items:center;justify-content:flex-end;gap:9px;font:10px 'DM Mono',monospace;letter-spacing:.1em;color:#c8cec0}
.day .sun{color:var(--lime);font-size:15px}
.day strong{color:#f2f0df;font-size:12px;font-weight:500}
.wx{margin-top:3px;font:9px 'DM Mono',monospace;letter-spacing:.1em;color:#8f9a8c;display:flex;gap:7px;justify-content:flex-end}
.wx b{color:#cbd3c2;font-weight:400}
.iconbtn{border:1px solid var(--line);background:rgba(14,20,15,.7);width:34px;height:34px;border-radius:50%;font-size:14px;color:#cdd4c6;display:grid;place-items:center;backdrop-filter:blur(6px)}
.iconbtn:hover{border-color:#7d8c62;color:var(--lime)}
.objective{position:absolute;left:50%;top:16px;transform:translateX(-50%);z-index:4;text-align:center;max-width:44vw;pointer-events:none}
.objective span{font:9px 'DM Mono',monospace;letter-spacing:.24em;color:#98a48e;text-transform:uppercase}
.objective strong{display:block;color:#eef0e2;font:600 17px/1.15 'Barlow Condensed',sans-serif;letter-spacing:.06em;margin-top:4px;text-shadow:0 2px 12px #000}
.objective .timer{font:9px 'DM Mono',monospace;color:var(--amber);letter-spacing:.12em;margin-top:4px}
.threat{position:absolute;top:78px;left:50%;transform:translateX(-50%);z-index:4;display:flex;gap:8px;align-items:center;font:9px 'DM Mono',monospace;letter-spacing:.2em;color:#f0a08d;opacity:0;transition:opacity .5s;pointer-events:none;white-space:nowrap}
.threat.on{opacity:1}
.threat i{width:7px;height:7px;border-radius:50%;background:#e26951;box-shadow:0 0 12px #ec553c;animation:pulse 1.6s infinite}
@keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}
.crosshairworld{position:absolute;z-index:5;left:0;top:0;width:0;height:0;pointer-events:none}
.hud{position:absolute;z-index:4;left:24px;bottom:calc(22px + var(--safe));width:224px;padding:13px 15px 12px;background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(10px);box-shadow:0 20px 50px rgba(0,0,0,.35);transition:opacity .35s,transform .35s}
.hud-head{display:flex;justify-content:space-between;font:9px 'DM Mono',monospace;letter-spacing:.16em;color:#acb3a5;text-transform:uppercase}
.hud-head b{color:var(--lime);font-weight:500}
.bars{margin-top:11px;display:grid;gap:8px}
.barline{display:grid;grid-template-columns:50px 1fr 30px;align-items:center;gap:8px;font:9px 'DM Mono',monospace;color:#d9ddcf;letter-spacing:.08em}
.track{height:4px;background:#2b332a;overflow:hidden}
.fill{height:100%;background:#c9dc70;width:100%;transition:width .22s}
.fill.health{background:#d76550}
.fill.stamina{background:#d3d8bb}
.fill.hunger{background:#dcad60}
.perimeter{margin-top:11px;padding-top:9px;border-top:1px solid var(--line);font:8px/1.75 'DM Mono',monospace;letter-spacing:.09em;color:#9aa493}
.perimeter b{color:#d8dfc9;font-weight:500}
.pip{display:inline-block;width:7px;height:7px;margin-left:2px;background:#3a4237;vertical-align:-1px}
.pip.on{background:var(--lime);box-shadow:0 0 5px rgba(214,230,117,.5)}
.pip.warn{background:var(--amber)}
.pip.bad{background:var(--red)}
.hint{margin-top:9px;font:8px/1.6 'DM Mono',monospace;color:#737f70;letter-spacing:.06em}
.kit{position:absolute;z-index:4;right:24px;bottom:calc(22px + var(--safe));width:212px;background:var(--glass);border:1px solid var(--line);padding:11px 13px 12px;backdrop-filter:blur(10px);box-shadow:0 20px 50px rgba(0,0,0,.35);transition:opacity .35s,transform .35s}
.inv-head{display:flex;justify-content:space-between;font:9px 'DM Mono',monospace;color:#aeb5a6;letter-spacing:.16em;margin-bottom:6px;text-transform:uppercase}
.inv-head b{color:var(--lime);font-weight:500}
.items{display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;min-height:20px}
.item{display:flex;justify-content:space-between;color:#d7dbcd;font-size:12px;line-height:1.25}
.item span:last-child{font:10px 'DM Mono',monospace;color:var(--lime)}
.item.empty{opacity:.32}
.capacity{display:flex;align-items:center;gap:6px;margin:7px 0 6px;font:8px 'DM Mono',monospace;color:#adb6a2;letter-spacing:.06em}
.capacity-track{height:3px;flex:1;background:#30372e;overflow:hidden}
.capacity-fill{height:100%;background:var(--lime);transition:width .25s}
.weapon-line{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid var(--line);font:8px 'DM Mono',monospace;color:#9ba594;letter-spacing:.1em}
.weapon-line b{color:#e9edd9;font:600 14px 'Barlow Condensed',sans-serif;letter-spacing:.04em}
.kit-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
.kit-actions button,.mini-btn{border:1px solid var(--line);background:#252d22;color:var(--lime);font:8px 'DM Mono',monospace;letter-spacing:.1em;padding:6px 4px;text-transform:uppercase}
.kit-actions button:hover,.mini-btn:hover{border-color:#8b9a68}
.prompt{position:absolute;z-index:4;left:50%;bottom:calc(150px + var(--safe));transform:translateX(-50%);padding:8px 14px;background:rgba(8,12,9,.9);border:1px solid rgba(214,230,117,.24);font-size:13px;letter-spacing:.045em;opacity:0;transition:opacity .14s,transform .14s;white-space:nowrap;box-shadow:0 12px 30px #0008;display:flex;align-items:center;gap:9px}
.prompt.show{opacity:1;transform:translateX(-50%) translateY(-3px)}
.prompt kbd{font:9px 'DM Mono',monospace;color:#17200f;background:var(--lime);padding:3px 6px;font-weight:600;letter-spacing:.04em;border-radius:2px}
.prompt.sub{bottom:calc(194px + var(--safe));border-color:var(--line);background:rgba(8,12,9,.82);font-size:12px;color:#c7cfba}
.prompt.sub kbd{background:#3c4635;color:#dbe4cc}
.toast{position:absolute;z-index:7;left:50%;top:17%;transform:translate(-50%,-8px);background:rgba(9,14,10,.94);border:1px solid #4c5a3e;padding:9px 17px;font:11px 'DM Mono',monospace;color:#dce8bb;opacity:0;transition:.28s;pointer-events:none;max-width:80vw;text-align:center;box-shadow:0 16px 40px #0008}
.toast.show{opacity:1;transform:translate(-50%,0)}
.toast.warn{border-color:#8c4b3b;color:#f3b6a6}
.modal-wrap{position:absolute;z-index:20;inset:0;display:none;align-items:center;justify-content:center;background:rgba(4,7,5,.78);backdrop-filter:blur(7px);padding:16px}
.modal-wrap.open{display:flex}
.modal{width:min(600px,100%);max-height:86vh;overflow:auto;background:linear-gradient(160deg,#171e17,#101610);border:1px solid #4e5942;box-shadow:0 30px 120px #000c;padding:26px 30px 24px;scrollbar-width:thin;scrollbar-color:#4a5640 #141a14}
.modal-kicker{font:9px 'DM Mono',monospace;letter-spacing:.24em;color:var(--lime);text-transform:uppercase}
.modal h1{font-size:37px;line-height:.95;margin:8px 0 9px;letter-spacing:.02em;text-transform:uppercase}
.modal p{margin:0 0 18px;color:#a8b09f;font-size:15px;line-height:1.35}
.recipe{display:grid;grid-template-columns:1fr auto;align-items:center;padding:12px 0;border-top:1px solid var(--line);gap:12px}
.recipe strong{font-size:17px;display:block;letter-spacing:.02em}
.recipe small{font:9px/1.5 'DM Mono',monospace;color:#9da696;letter-spacing:.02em}
.recipe button,.action{background:var(--lime);color:#182012;border:0;padding:9px 14px;font-weight:700;font-size:12px;letter-spacing:.07em;text-transform:uppercase}
.recipe button:disabled{background:#353d32;color:#7a8275;cursor:not-allowed}
.close{margin-top:18px;border:1px solid var(--line);background:transparent;padding:9px 16px;color:#c5ccbb;font:10px 'DM Mono',monospace;letter-spacing:.14em;text-transform:uppercase}
.close:hover{border-color:#8b9a68;color:var(--lime)}
.inv-modal-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:4px}
.inv-card{min-height:108px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid var(--line);background:#1a2119;padding:10px}
.inv-card strong{font-size:15px;display:block;line-height:1.1}
.inv-card small{font:8px/1.4 'DM Mono',monospace;color:#99a393;display:block;margin-top:3px}
.inv-card em{font:700 12px 'DM Mono',monospace;color:var(--lime);font-style:normal;display:block;margin:5px 0 0}
.inv-card button{margin-top:8px;width:100%;border:0;background:#d6e675;color:#161d12;padding:6px;font:700 9px 'DM Mono',monospace;letter-spacing:.06em}
.inv-card button:disabled{background:#343c31;color:#7d8676}
.gear-row{display:flex;gap:8px;margin:12px 0}
.gear-slot{flex:1;border:1px solid var(--line);padding:9px;font:8px 'DM Mono',monospace;color:#aab2a1;letter-spacing:.1em}
.gear-slot b{display:block;color:var(--lime);font:600 14px 'Barlow Condensed',sans-serif;margin-top:4px;letter-spacing:.03em}
.keys{display:grid;grid-template-columns:1fr 1fr;gap:0 18px}
.keyrow{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-top:1px solid var(--line);font-size:13px;color:#c9d1c0}
.keyrow b{font:9px 'DM Mono',monospace;color:#18200f;background:var(--lime);padding:3px 6px;letter-spacing:.04em;border-radius:2px;margin-left:10px;white-space:nowrap}
.keyrow.dim{color:#8e9887}
.intro{position:absolute;z-index:30;inset:0;display:flex;align-items:center;overflow:hidden;background:linear-gradient(100deg,rgba(5,9,6,.985) 0%,rgba(6,10,7,.965) 30%,rgba(7,12,8,.82) 52%,rgba(8,13,9,.3) 76%,rgba(8,12,8,.08) 100%);transition:opacity .6s}
.intro:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 82% 42%,transparent 10%,rgba(4,8,5,.35) 100%)}
.intro-content{position:relative;z-index:2;width:min(680px,58vw);padding:0 0 0 min(6vw,86px);pointer-events:auto}
.eyebrow{display:flex;align-items:center;gap:10px;font:9px 'DM Mono',monospace;letter-spacing:.26em;color:var(--lime);margin-bottom:16px;text-transform:uppercase}
.eyebrow:before{content:'';width:26px;height:1px;background:var(--lime);opacity:.65}
.intro h1{font-size:clamp(62px,9.6vw,124px);line-height:.76;letter-spacing:-.025em;margin:0;text-transform:uppercase;font-weight:900;text-shadow:0 10px 60px #000a}
.intro h1 span{display:block;color:var(--lime)}
.intro h1 em{display:block;font:400 clamp(14px,1.5vw,19px)/1.2 'DM Mono',monospace;letter-spacing:.32em;color:#c3cdb4;font-style:normal;margin-top:20px;text-transform:uppercase}
.intro-copy{max-width:430px;margin:22px 0 22px;color:#aeb8a6;font-size:17px;line-height:1.4}
.start{background:var(--lime);border:0;color:#141b11;font-weight:800;font-size:15px;letter-spacing:.1em;padding:13px 24px;text-transform:uppercase;box-shadow:0 14px 34px rgba(0,0,0,.35)}
.start:hover{background:#e4f28d}
.start.ghost{background:transparent;border:1px solid #59654c;color:#d2dac5;box-shadow:none;margin-left:8px}
.start.ghost:hover{border-color:var(--lime);color:var(--lime)}
.intro-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.controls-note{margin-top:19px;max-width:470px;color:#7e8a7a;font:9px/1.9 'DM Mono',monospace;letter-spacing:.02em}
.controls-note b{color:#c6ccb8;font-weight:400}
.tag{margin-top:19px;font:8px 'DM Mono',monospace;color:#66715f;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:10px}
.tag:before{content:'';width:5px;height:5px;background:var(--lime);border-radius:50%;box-shadow:0 0 10px var(--lime)}
.src-link{display:inline-block;margin-top:12px;font:8px 'DM Mono',monospace;color:#7f8b78;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;border-bottom:1px dotted #4d5844;padding-bottom:2px}
.src-link:hover{color:var(--lime);border-color:var(--lime)}
.aerial-label{position:absolute;z-index:2;right:5vw;top:9vh;text-align:right;pointer-events:none}
.aerial-label span{font:8px 'DM Mono',monospace;letter-spacing:.24em;color:#c9d4bd;display:flex;align-items:center;justify-content:flex-end;gap:8px}
.aerial-label span:before{content:'';width:6px;height:6px;border-radius:50%;background:#e26951;box-shadow:0 0 10px #e26951;animation:pulse 1.7s infinite}
.aerial-label b{display:block;margin-top:6px;font:9px 'DM Mono',monospace;color:#8b977f;letter-spacing:.13em;font-weight:400}
.aerial-frame{position:absolute;z-index:2;right:4vw;bottom:8vh;width:min(36vw,520px);height:min(30vh,290px);border:1px solid rgba(214,230,117,.16);pointer-events:none}
.aerial-frame:before,.aerial-frame:after{content:'';position:absolute;width:18px;height:18px;border-color:rgba(214,230,117,.55);border-style:solid}
.aerial-frame:before{left:-1px;top:-1px;border-width:1px 0 0 1px}
.aerial-frame:after{right:-1px;bottom:-1px;border-width:0 1px 1px 0}
.aerial-frame i{position:absolute;font:8px 'DM Mono',monospace;color:#aab99a;letter-spacing:.18em;font-style:normal}
.aerial-frame i:nth-child(1){left:10px;top:8px}
.aerial-frame i:nth-child(2){right:10px;bottom:8px}
.loading{position:absolute;z-index:2;left:min(6vw,86px);bottom:6vh;font:9px 'DM Mono',monospace;color:#77806c;letter-spacing:.18em;display:flex;align-items:center;gap:9px;text-transform:uppercase}
.loading i{width:38px;height:1px;background:#3d4736;position:relative;overflow:hidden;font-style:normal}
.loading i:after{content:'';position:absolute;inset:0;background:var(--lime);transform-origin:left;animation:load 1.2s ease-in-out infinite}
@keyframes load{0%{transform:scaleX(.05)}55%{transform:scaleX(.9)}100%{transform:scaleX(1);opacity:0}}
#game.ready .loading{display:none}
.end-screen{z-index:31;background:linear-gradient(90deg,rgba(5,9,6,.97),rgba(6,10,7,.8) 55%,rgba(8,13,9,.42))}
.end-screen .intro-content{width:min(660px,80vw)}
.end-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);margin:20px 0 22px;max-width:460px}
.end-stat{background:#121812;padding:11px 13px}
.end-stat span{display:block;font:8px 'DM Mono',monospace;letter-spacing:.16em;color:#8f9a88;text-transform:uppercase}
.end-stat b{display:block;font:700 24px 'Barlow Condensed',sans-serif;color:var(--lime);margin-top:3px}
.mobile-controls{display:none;position:absolute;z-index:8;inset:auto 0 0;height:190px;pointer-events:none}
.mobile-hint{position:absolute;top:0;left:50%;transform:translateX(-50%);font:8px 'DM Mono',monospace;color:#cfd8c4;background:rgba(9,14,10,.7);padding:5px 9px;white-space:nowrap;letter-spacing:.08em;border:1px solid var(--line);opacity:0;transition:.4s}
.mobile-controls.touched .mobile-hint{opacity:0}
.joy{pointer-events:auto;position:absolute;left:20px;bottom:calc(18px + var(--safe));width:118px;height:118px;border:1px solid rgba(223,233,193,.3);border-radius:50%;background:rgba(17,25,17,.32);touch-action:none;backdrop-filter:blur(4px)}
.joy:before{content:'';position:absolute;left:50%;top:50%;width:1px;height:34px;background:rgba(223,233,193,.16);transform:translate(-50%,-50%)}
.joy:after{content:'';position:absolute;left:50%;top:50%;width:34px;height:1px;background:rgba(223,233,193,.16);transform:translate(-50%,-50%)}
.joy b{position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(214,230,117,.26);border:1px solid rgba(214,230,117,.7);box-shadow:0 0 24px rgba(214,230,117,.15)}
.mobile-actions{pointer-events:none;position:absolute;right:16px;bottom:calc(16px + var(--safe));display:grid;grid-template-columns:repeat(2,62px);grid-auto-rows:52px;gap:9px}
.mobile-actions button{pointer-events:auto;height:52px;border-radius:50%;border:1px solid rgba(223,233,193,.36);background:rgba(12,18,12,.78);color:var(--lime);font:700 10px 'Barlow Condensed',sans-serif;letter-spacing:.08em;touch-action:none;backdrop-filter:blur(4px)}
.mobile-actions button:active{background:rgba(60,74,44,.9)}
.mobile-actions button.attack{background:rgba(150,58,42,.82);color:#fff;border-color:rgba(238,160,140,.5)}
.mobile-actions button.use{background:rgba(76,88,52,.82);color:#eef4d8;border-color:rgba(214,230,117,.55)}
.mobile-actions button.run{font-size:9px;color:#bdc8b0}
.mobile-actions button.board{font-size:9px;color:#e2c48d;border-color:rgba(226,181,102,.45)}
.mobile-mini{pointer-events:none;position:absolute;right:16px;bottom:calc(146px + var(--safe));display:flex;gap:8px}
.mobile-mini button{pointer-events:auto;border:1px solid var(--line);background:rgba(12,18,12,.76);color:#c9d2bf;font:8px 'DM Mono',monospace;letter-spacing:.1em;padding:8px 10px;text-transform:uppercase}
@media (max-width:820px){
  .topbar{padding:12px 14px;height:62px}
  .brand{font-size:11px;letter-spacing:.2em}
  .location{font-size:7.5px;letter-spacing:.1em;margin-top:6px}
  .top-right{gap:8px}
  .clockbox{display:none}
  .iconbtn{width:30px;height:30px;font-size:12px}
  .objective{top:62px;max-width:82vw}
  .objective strong{font-size:13px}
  .objective span{font-size:7.5px}
  .objective .timer{font-size:8px}
  .threat{top:110px;font-size:7.5px;letter-spacing:.13em}
  .hud{left:8px;bottom:calc(150px + var(--safe));width:152px;padding:9px 10px}
  .hud-head{font-size:7px}
  .bars{gap:5px;margin-top:8px}
  .barline{grid-template-columns:34px 1fr 20px;font-size:7px;gap:5px}
  .perimeter{font-size:6.5px;line-height:1.7;margin-top:7px;padding-top:6px}
  .hint{display:none}
  .kit{display:none}
  .prompt{bottom:calc(292px + var(--safe));font-size:11px;padding:7px 11px}
  .prompt.sub{bottom:calc(330px + var(--safe));font-size:10px}
  .mobile-controls{display:block}
  .reticle{display:none}
  .intro{background:linear-gradient(180deg,rgba(5,9,6,.97) 0%,rgba(6,10,7,.9) 46%,rgba(7,12,8,.6) 100%);align-items:flex-end}
  .intro-content{width:100%;padding:0 22px calc(34px + var(--safe));max-width:none}
  .intro h1{font-size:clamp(58px,16vw,96px)}
  .intro h1 em{font-size:11px;letter-spacing:.22em;margin-top:14px}
  .intro-copy{font-size:14px;margin:15px 0 16px;max-width:390px}
  .start{padding:12px 19px;font-size:13px}
  .controls-note{display:none}
  .tag{margin-top:14px;font-size:7px}
  .src-link{display:none}
  .aerial-label{top:72px;right:16px}
  .aerial-frame{display:none}
  .loading{left:22px;bottom:calc(14px + var(--safe));font-size:7px}
  .end-stats{max-width:100%}
  .modal{padding:20px 18px;max-height:88vh}
  .modal h1{font-size:30px}
  .inv-modal-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .keys{grid-template-columns:1fr}
  .end-screen .intro-content{width:100%}
}
@media (max-height:520px){
  .hud{width:150px;padding:8px 9px}
  .perimeter{display:none}
  .mobile-controls{height:150px}
  .joy{width:98px;height:98px}
  .joy b{width:38px;height:38px;margin:-19px 0 0 -19px}
  .mobile-actions button{height:44px;font-size:9px}
  .intro h1{font-size:clamp(48px,10vh,84px)}
  .intro-copy{display:none}
}
#game:not(.playing) .hud,#game:not(.playing) .kit,#game:not(.playing) .topbar,#game:not(.playing) .objective,#game:not(.playing) .threat,#game:not(.playing) .prompt,#game:not(.playing) .prompt.sub{opacity:0;pointer-events:none;transform:translateY(8px)}
#game:not(.playing) .hud,#game:not(.playing) .kit{transform:translateY(14px)}
</style>
</head>
<body>
<div id="game">
  <canvas id="view"></canvas>
  <div class="grade"></div>
  <div class="vignette"></div>
  <div class="grain"></div>
  <div class="bloodscreen"></div>
  <div class="hitflash" id="hitflash"></div>
  <div class="reticle" id="reticle"><i></i><i></i><i></i><i></i></div>

  <header class="topbar">
    <div>
      <div class="brand"><b>LAST</b> LIGHT</div>
      <div class="location"><i></i><span id="locationText">DEAD COUNTY · WEST MERCER</span></div>
    </div>
    <div class="top-right">
      <div class="clockbox">
        <div class="day"><span class="sun">◷</span><span id="clock">DAY 01 · 16:42</span></div>
        <div class="wx"><span>N <b>↑</b></span><span>LIGHT RAIN</span><span id="temp">11°C</span></div>
      </div>
      <button class="iconbtn" id="sound" title="Toggle sound" aria-label="Toggle sound">♪</button>
      <button class="iconbtn" id="helpBtn" title="Survival guide" aria-label="Survival guide">?</button>
    </div>
  </header>

  <div class="objective">
    <span>Objective · Day 01</span>
    <strong id="goal">Scavenge the block. Board up before dark.</strong>
    <div class="timer" id="objectiveTimer">NIGHTFALL IN 02:30</div>
  </div>
  <div class="threat" id="threat"><i></i>THE DEAD ARE DRAWN TO NOISE</div>

  <section class="hud">
    <div class="hud-head"><span>Survivor</span><b id="statusText">ALIVE</b></div>
    <div class="bars">
      <div class="barline"><span>HEALTH</span><div class="track"><div class="fill health" id="healthFill"></div></div><span id="healthNum">100</span></div>
      <div class="barline"><span>STAMINA</span><div class="track"><div class="fill stamina" id="staminaFill"></div></div><span id="staminaNum">100</span></div>
      <div class="barline"><span>HUNGER</span><div class="track"><div class="fill hunger" id="hungerFill"></div></div><span id="hungerNum">100</span></div>
    </div>
    <div class="perimeter">
      <div>PERIMETER &nbsp;<b id="perimeterState">UNSECURED</b></div>
      <div>DOOR <span id="doorPips"></span> &nbsp; WINDOW <span id="windowPips"></span></div>
    </div>
    <div class="hint">WASD move · mouse aim · LMB strike · E use · F board · wheel zoom</div>
  </section>

  <section class="kit">
    <div class="inv-head"><span>Field Kit</span><b>[ I ]</b></div>
    <div id="capacity"></div>
    <div class="items" id="items"></div>
    <div class="weapon-line"><span>EQUIPPED</span><b id="weaponName">Fists</b></div>
    <div class="kit-actions"><button id="openCraft">CRAFT [C]</button><button id="openInventory">OPEN KIT</button></div>
  </section>

  <div class="prompt" id="prompt"><kbd>E</kbd><span id="promptText">INTERACT</span></div>
  <div class="prompt sub" id="prompt2"><kbd>F</kbd><span id="prompt2Text">BOARD UP</span></div>
  <div class="toast" id="toast"></div>

  <div class="mobile-controls" id="mobile">
    <div class="mobile-hint">LEFT STICK MOVE · DRAG RIGHT SIDE TO AIM</div>
    <div class="joy" id="joy"><b></b></div>
    <div class="mobile-mini"><button id="mCraft">CRAFT</button><button id="mKit">KIT</button></div>
    <div class="mobile-actions">
      <button class="attack" id="mAttack">STRIKE</button>
      <button class="use" id="mUse">USE</button>
      <button class="board" id="mBoard">BOARD</button>
      <button class="run" id="mRun">RUN</button>
    </div>
  </div>

  <div class="modal-wrap" id="craftModal"><div class="modal">
    <div class="modal-kicker">Field manual · improvised tools</div>
    <h1>Crafting</h1>
    <p>Make do with what you can carry. Select a recipe to assemble it.</p>
    <div id="recipes"></div>
    <button class="close" data-close>ESC · CLOSE</button>
  </div></div>

  <div class="modal-wrap" id="helpModal"><div class="modal">
    <div class="modal-kicker">Survival guide · day one</div>
    <h1>Make it to dawn.</h1>
    <p>The county went dark three weeks ago. Scavenge the neighborhood, board the safehouse, and hold it through the night. The dead are slow — but they do not stop.</p>
    <div class="keys">
      <div class="keyrow"><span>Move</span><b>W A S D</b></div>
      <div class="keyrow"><span>Aim</span><b>MOUSE</b></div>
      <div class="keyrow"><span>Strike / fire</span><b>LEFT CLICK</b></div>
      <div class="keyrow"><span>Interact · loot · doors</span><b>E</b></div>
      <div class="keyrow"><span>Board up · pry boards</span><b>F</b></div>
      <div class="keyrow"><span>Sprint (uses stamina)</span><b>SHIFT</b></div>
      <div class="keyrow"><span>Crafting</span><b>C</b></div>
      <div class="keyrow"><span>Field kit</span><b>I</b></div>
      <div class="keyrow"><span>Camera zoom</span><b>WHEEL</b></div>
      <div class="keyrow"><span>Survival guide</span><b>TAB</b></div>
    </div>
    <p style="margin-top:16px;font-size:12px;color:#8d9886">Barricade the safehouse door and window to level 3 before nightfall. Level 3 is secure. Below that, the dead can break through. Repair a vehicle to drive out of the county — or last until dawn.</p>
    <button class="close" data-close>RESUME</button>
  </div></div>

  <div class="modal-wrap" id="inventoryModal"><div class="modal">
    <div class="modal-kicker">Carry weight &amp; consumables</div>
    <h1>Field Kit</h1>
    <div id="inventoryCapacity"></div>
    <div class="gear-row">
      <div class="gear-slot">EQUIPPED WEAPON<b id="equippedWeapon">Fists</b></div>
      <div class="gear-slot">VEHICLE<b id="vehicleState">Dead pickup</b></div>
    </div>
    <div class="inv-modal-grid" id="inventoryGrid"></div>
    <button class="close" data-close>ESC · CLOSE</button>
  </div></div>

  <div class="intro" id="intro">
    <div class="intro-content">
      <div class="eyebrow">A top-down survival story · Day 01</div>
      <h1>Last<span>Light</span><em>Dead County · West Mercer</em></h1>
      <p class="intro-copy">The grid went dark three weeks ago. The roads are full of the dead. From the rooftops, the neighborhood looks quiet — it is not. Find supplies. Board the house. Hold until morning.</p>
      <div class="intro-actions">
        <button class="start" id="start">Enter Dead County &nbsp;→</button>
        <button class="start ghost" id="continue" style="display:none">Continue run</button>
        <button class="start ghost" id="newRun" style="display:none">New run ↻</button>
      </div>
      <div class="controls-note"><b>WASD</b> move &nbsp;·&nbsp; <b>MOUSE</b> aim &nbsp;·&nbsp; <b>CLICK</b> strike &nbsp;·&nbsp; <b>E</b> use &nbsp;·&nbsp; <b>F</b> board &nbsp;·&nbsp; <b>SHIFT</b> sprint &nbsp;·&nbsp; <b>C</b> craft &nbsp;·&nbsp; <b>WHEEL</b> zoom</div>
      <div class="tag">No one's coming · make your own way</div>
      <a class="src-link" href="./source.html">Source code · Claude pack →</a>
    </div>
    <div class="aerial-label"><span>LIVE AERIAL</span><b>WEST MERCER · 16:42 · LIGHT RAIN</b></div>
    <div class="aerial-frame"><i>CAM 04 · ROOFTOP</i><i>36°12'N · 94°08'W</i></div>
    <div class="loading">Building the county <i></i></div>
  </div>

  <div class="intro end-screen" id="ending" style="display:none">
    <div class="intro-content">
      <div class="eyebrow" id="endKicker">End of the road</div>
      <h1 id="endTitle">You're<span>Gone.</span></h1>
      <p class="intro-copy" id="endCopy">The county keeps its dead.</p>
      <div class="end-stats">
        <div class="end-stat"><span>Time survived</span><b id="endTime">0h</b></div>
        <div class="end-stat"><span>Dead down</span><b id="endKills">0</b></div>
        <div class="end-stat"><span>Supplies</span><b id="endLoot">0</b></div>
      </div>
      <button class="start" id="restart">Try again ↻</button>
    </div>
  </div>
</div>
<script type="module" src="./js/game.js"></script>
</body>
</html>

````

### FILE: `js/core.js`

````javascript
/* LAST LIGHT — shared world data & math helpers */
export const CELL = 2;
export const MAPW = 36;
export const MAPH = 36;
export const WALL_H = 3.0;
export const WALL_T = 0.34;

export const MAP_ROWS = [
'ffffffffffffffffffffffffffffffffffff',
'fgggggggggggggg;....;gggggggggggggxf',
'fg#W####W#ggggg;....;||W||%%%%%%%%gf',
'fg#tttttt#ggggg;....;|FFF|%tttttt%gf',
'fg#tttttt#ggggg;....;|FFFD%tttttt%gf',
'fg#tttttt#ggggg;....;|FFF|%tttttt%gf',
'fg#tttttt#ggggg;....;|||||%tttttt%gf',
'fg###D####ggggg;....;ggggg%tttttt%gf',
'fgggggggggggggx;....;ggggg%W%D%W%%gf',
'fggggggggg||||g;....;|||||gggggggggf',
'fg||D|||gg|FF|g;....;|FFF|gggggggggf',
'fg|FFFF|ggDFF|g;....;|FFFDgggggggggf',
'fg|FFFF|gg|FF|g;....;|FFF|gggggggggf',
'fg||||W|gg||W|g;....;||W||gggggggggf',
'fgggggggggggggg;....;gxggggggggggggf',
'f;;;;;;;;;;;;;;;....;;;;;;;;;;;;;;;f',
'f..................................f',
'f..................................f',
'f..................................f',
'f..................................f',
'f;;;;;;;;;;;;;;;....;;;x;;;;;;;;;;;f',
'fgggggggggggggg;....;ggggggggggggggf',
'fg||||ggggggggg;....;ggggggggggggggf',
'fg|cc|ggggggggg;....;ggggggggggggggf',
'fg|ccDggggggggg;....;gggg###d##d##ggf',
'fg|cc|###D####g;....;ggg#FFFFFFF#ggf',
'fg||||#FFFFFF#g;....;ggg#FFFFFFF#ggf',
'fggggg#FFFFFF#g;....;gggDFFFFFFF#ggf',
'fggggg#FFFFFF#g;....;|D||FFFFFFFdggf',
'fggggg#FFFFFF#g;....;|cc|FFFFFFF#ggf',
'fggggg#FFFFFF#g;....;|cc|FFFFFFF#ggf',
'fggggg#FFFFFF#g;....;|cc|##W#####ggf',
'fggggg##W##W##g;....;||||ggggggggggf',
'fxggggggggggggg;....;ggggggggggggxgf',
'fggggggggggggggx....;ggggggggggggggf',
'ffffffffffffffffffffffffffffffffffff'
];

const WALLS = new Set(['#', '%', '|', 'f']);
export const isWallChar = c => WALLS.has(c);
export const cellAt = (x, y) => (x < 0 || y < 0 || x >= MAPW || y >= MAPH) ? '#' : MAP_ROWS[y][x];
export const isWall = (x, y) => WALLS.has(cellAt(x, y));
export const isSolid = (x, y) => {
  const c = cellAt(x, y);
  return WALLS.has(c) || c === 'x';
};
// Path planning treats doors and windows as passable: the dead are drawn to them.
export const pathBlocked = (x, y) => {
  const c = cellAt(x, y);
  return WALLS.has(c) || c === 'x';
};
export const blocksSight = (x, y) => {
  const c = cellAt(x, y);
  return WALLS.has(c) || c === 'x' || c === 'D' || c === 'W';
};
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

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function hash2(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Landmark metadata used by the HUD and world props.
export const LANDMARKS = {
  safehouse: { gx: 9.5, gy: 28.5, name: 'SAFEHOUSE' },
  pickup: { gx: 17.5, gy: 23.5, name: 'DEAD PICKUP' },
  police: { gx: 18.5, gy: 6.5, name: 'POLICE CRUISER' },
  store: { gx: 28.5, gy: 5.5, name: 'CORNER STORE' },
  hardware: { gx: 4.5, gy: 4.5, name: 'HARDWARE STORE' },
  ransacked: { gx: 27.5, gy: 27.5, name: 'RANSACKED HOUSE' },
  shed: { gx: 3.5, gy: 23.5, name: 'TOOL SHED' },
};

export const LOOT_SPOTS = [
  { gx: 4.5, gy: 4.5, label: 'Hardware store · supplies', loot: { wood: 4, scrap: 2, parts: 1 } },
  { gx: 28.5, gy: 5.5, label: 'Corner store · provisions', loot: { food: 2, cloth: 1, chem: 1 } },
  { gx: 27.5, gy: 27.5, label: 'Ransacked house · cabinets', loot: { cloth: 2, chem: 1, food: 1 } },
  { gx: 3.5, gy: 23.5, label: 'Tool shed · workbench', loot: { wood: 3, scrap: 2, parts: 1 } },
  { gx: 18.5, gy: 6.5, label: 'Police cruiser · evidence', loot: { ammo: 2, scrap: 2, parts: 1 } },
  { gx: 18.5, gy: 25.5, label: 'Roadside duffel', loot: { food: 1, ammo: 1, fuel: 1 } },
  { gx: 28.5, gy: 18.5, label: 'Overturned cart', loot: { scrap: 1, chem: 1, cloth: 1 } },
  { gx: 4.5, gy: 11.5, label: 'House · kitchen drawers', loot: { fuel: 1, cloth: 1 } },
  { gx: 23.5, gy: 11.5, label: 'House · hallway closet', loot: { wood: 2, food: 1 } },
];

export const ZOMBIE_SPAWNS = [
  [17.5, 8.5], [17.5, 13.5], [25.5, 17.5], [30.5, 17.5],
  [17.5, 30.5], [10.5, 17.5], [2.5, 14.5], [23.5, 21.5],
  [12.5, 21.5], [33.0, 23.5]
];

export const NIGHT_SPAWNS = [
  [17.5, 1.8], [17.5, 34.0], [1.8, 17.5], [34.0, 17.5],
  [10.0, 17.5], [26.0, 17.5], [17.5, 14.0], [17.5, 26.5]
];

````

### FILE: `js/textures.js`

````javascript
/* LAST LIGHT — procedural surface textures (no external assets) */
import * as THREE from '../vendor/three.module.min.js';
import { MAPW, MAPH, cellAt, clamp, mulberry32 } from './core.js';

const makeCanvas = (w, h = w) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const rgb = (r, g, b, a = 1) => a >= 1 ? `rgb(${r | 0},${g | 0},${b | 0})` : `rgba(${r | 0},${g | 0},${b | 0},${a})`;
const pick = (rnd, arr) => arr[Math.floor(rnd() * arr.length) % arr.length];

export function canvasTex(c, { repeat = 1, srgb = true, aniso = 4, wrap = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (wrap) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); }
  t.anisotropy = aniso;
  return t;
}

function grainCanvas(size = 256, seed = 7, base = 128, amp = 52) {
  const c = makeCanvas(size), g = c.getContext('2d');
  const img = g.createImageData(size, size), d = img.data, rnd = mulberry32(seed);
  for (let i = 0; i < d.length; i += 4) {
    const v = clamp(base + (rnd() * 2 - 1) * amp, 0, 255) | 0;
    d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  for (let i = 0; i < 50; i++) {
    const cx = rnd() * size, cy = rnd() * size, r = 6 + rnd() * 32;
    const grd = g.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, 'rgba(255,255,255,.2)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, size, size);
  }
  return c;
}

function addNoise(g, size, amount, seed = 3) {
  const img = g.getImageData(0, 0, size, size), d = img.data, rnd = mulberry32(seed);
  for (let i = 0; i < d.length; i += 4) {
    const n = (rnd() * 2 - 1) * amount;
    d[i] = clamp(d[i] + n, 0, 255); d[i + 1] = clamp(d[i + 1] + n, 0, 255); d[i + 2] = clamp(d[i + 2] + n, 0, 255);
  }
  g.putImageData(img, 0, 0);
}

export const TEX = {};

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

function makeSiding() {
  const S = 256, c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(31);
  g.fillStyle = '#5a4a37'; g.fillRect(0, 0, S, S);
  const rows = 8, h = S / rows;
  for (let i = 0; i < rows; i++) {
    const base = 80 + rnd() * 30;
    g.fillStyle = rgb(base + 16, base - 4, base - 26);
    g.fillRect(0, i * h + 2, S, h - 3);
    g.fillStyle = 'rgba(30,22,16,.55)'; g.fillRect(0, i * h, S, 2);
    for (let k = 0; k < 14; k++) {
      g.strokeStyle = `rgba(46,34,24,${.08 + rnd() * .12})`;
      g.lineWidth = 1; g.beginPath();
      const y = i * h + 4 + rnd() * (h - 7);
      g.moveTo(0, y); g.bezierCurveTo(S * .3, y + rnd() * 3, S * .7, y - rnd() * 3, S, y + rnd() * 2); g.stroke();
    }
    if (rnd() > .55) { g.fillStyle = 'rgba(30,24,18,.35)'; g.fillRect(rnd() * S, i * h + 5, 6 + rnd() * 20, h - 8); }
  }
  addNoise(g, S, 9, 7);
  return c;
}

function makePlaster() {
  const S = 256, c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(41);
  g.fillStyle = '#7f7d6e'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 40; i++) {
    g.fillStyle = `rgba(${40 + rnd() * 40},${38 + rnd() * 40},${32 + rnd() * 34},${.05 + rnd() * .1})`;
    g.beginPath(); g.ellipse(rnd() * S, rnd() * S, 10 + rnd() * 40, 8 + rnd() * 30, rnd() * 3, 0, 7); g.fill();
  }
  // panel seams
  g.strokeStyle = 'rgba(38,38,32,.45)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(0, 86); g.lineTo(S, 86); g.moveTo(0, 172); g.lineTo(S, 172); g.stroke();
  // cracks
  g.strokeStyle = 'rgba(34,34,28,.6)';
  for (let i = 0; i < 5; i++) {
    g.lineWidth = .8 + rnd();
    let x = rnd() * S, y = rnd() * S;
    g.beginPath(); g.moveTo(x, y);
    for (let k = 0; k < 7; k++) { x += (rnd() - .5) * 30; y += (rnd() - .2) * 24; g.lineTo(x, y); }
    g.stroke();
  }
  addNoise(g, S, 8, 9);
  return c;
}

function makeFence() {
  const S = 256, c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(51);
  g.fillStyle = '#3f3528'; g.fillRect(0, 0, S, S);
  const bw = 24;
  for (let x = 2; x < S; x += bw) {
    const base = 92 + rnd() * 26;
    g.fillStyle = rgb(base + 20, base - 2, base - 30);
    g.fillRect(x, 0, bw - 4, S);
    g.fillStyle = 'rgba(40,31,22,.5)'; g.fillRect(x + bw - 4, 0, 4, S);
    for (let k = 0; k < 6; k++) {
      g.strokeStyle = `rgba(48,35,24,${.12 + rnd() * .16})`; g.lineWidth = 1;
      g.beginPath(); const xx = x + 3 + rnd() * (bw - 10);
      g.moveTo(xx, 0); g.lineTo(xx + (rnd() - .5) * 4, S); g.stroke();
    }
    if (rnd() > .7) { g.fillStyle = 'rgba(60,44,30,.5)'; g.fillRect(x + 2, rnd() * S, bw - 8, 3 + rnd() * 8); }
  }
  g.fillStyle = 'rgba(30,24,18,.55)'; g.fillRect(0, 90, S, 6); g.fillRect(0, 190, S, 6);
  addNoise(g, S, 10, 13);
  return c;
}

function makeMetal() {
  const S = 256, c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(61);
  g.fillStyle = '#a3a49b'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 120; i++) {
    g.fillStyle = `rgba(${40 + rnd() * 50},${36 + rnd() * 40},${30 + rnd() * 30},${.04 + rnd() * .18})`;
    g.beginPath(); g.ellipse(rnd() * S, rnd() * S, 2 + rnd() * 16, 1 + rnd() * 8, rnd() * 3, 0, 7); g.fill();
  }
  for (let i = 0; i < 26; i++) {
    const x = rnd() * S, y = rnd() * S;
    const grd = g.createRadialGradient(x, y, 0, x, y, 5 + rnd() * 22);
    grd.addColorStop(0, 'rgba(120,63,32,.35)'); grd.addColorStop(1, 'rgba(120,63,32,0)');
    g.fillStyle = grd; g.fillRect(x - 30, y - 30, 60, 60);
  }
  addNoise(g, S, 13, 17);
  return c;
}

/* ---------------------------------------------------------------- */
/* the big neighbourhood ground texture                              */
/* ---------------------------------------------------------------- */
function baseColor(ch, rnd) {
  switch (ch) {
    case '.': { const v = 40 + rnd() * 7; return [v, v + 1, v - 2]; }
    case ';': { const v = 104 + rnd() * 8; return [v, v - 1, v - 9]; }
    case 'g': { const v = 48 + rnd() * 10; return [v * .82, v, v * .55]; }
    case 'F': { const v = 80 + rnd() * 12; return [v, v * .76, v * .53]; }
    case 't': { const v = 118 + rnd() * 8; return [v, v - 2, v - 12]; }
    case 'c': { const v = 82 + rnd() * 8; return [v, v, v - 5]; }
    case 'x': { const v = 48 + rnd() * 10; return [v, v - 2, v - 8]; }
    default: { const v = 45 + rnd() * 7; return [v, v + 1, v - 5]; }
  }
}

function makeGround() {
  const S = 2048, N = MAPW, cs = S / N;
  const c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(77);
  // base fills
  for (let y = 0; y < MAPH; y++) for (let x = 0; x < N; x++) {
    const ch = cellAt(x, y), col = baseColor(ch, rnd);
    g.fillStyle = rgb(col[0], col[1], col[2]);
    g.fillRect(x * cs, y * cs, cs + 1, cs + 1);
    const px = x * cs, py = y * cs;
    if (ch === '.' || ch === ';' || ch === 'c' || ch === 'x') {
      // gravel / aggregate speckle
      for (let i = 0; i < 24; i++) {
        const v = 28 + rnd() * 90;
        g.fillStyle = `rgba(${v},${v},${v - 5},${.1 + rnd() * .2})`;
        g.fillRect(px + rnd() * cs, py + rnd() * cs, .8 + rnd() * 2.2, .8 + rnd() * 2.2);
      }
    }
    if (ch === 'g') {
      for (let i = 0; i < 46; i++) {
        const v = 40 + rnd() * 45;
        g.strokeStyle = `rgba(${v * .75},${v},${v * .48},${.2 + rnd() * .3})`;
        g.lineWidth = .7 + rnd() * .8;
        const gx = px + rnd() * cs, gy = py + rnd() * cs;
        g.beginPath(); g.moveTo(gx, gy); g.lineTo(gx + (rnd() - .5) * 4, gy - 2 - rnd() * 5); g.stroke();
      }
      if (rnd() > .55) {
        g.fillStyle = 'rgba(56,44,28,.22)';
        g.beginPath(); g.ellipse(px + rnd() * cs, py + rnd() * cs, 5 + rnd() * 16, 3 + rnd() * 9, rnd() * 3, 0, 7); g.fill();
      }
    }
    if (ch === 'F') {
      const plank = 14;
      for (let yy = 0; yy < cs; yy += plank) {
        g.strokeStyle = 'rgba(38,28,18,.5)'; g.lineWidth = 1;
        g.beginPath(); g.moveTo(px, py + yy); g.lineTo(px + cs, py + yy); g.stroke();
        g.strokeStyle = `rgba(${70 + rnd() * 30},${54 + rnd() * 20},${34 + rnd() * 14},.16)`;
        g.beginPath(); g.moveTo(px, py + yy + 2 + rnd() * 9); g.lineTo(px + cs, py + yy + 2 + rnd() * 9); g.stroke();
      }
      g.strokeStyle = 'rgba(34,26,18,.35)'; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(px + 3, py); g.lineTo(px + 3, py + cs); g.stroke();
    }
    if (ch === 't') {
      const sub = cs / 4;
      for (let sy = 0; sy < 4; sy++) for (let sx = 0; sx < 4; sx++) {
        const tone = (sx + sy) % 2 ? 122 : 138;
        const v = tone + rnd() * 10;
        g.fillStyle = `rgba(${v},${v - 2},${v - 13},.65)`;
        g.fillRect(px + sx * sub + 1, py + sy * sub + 1, sub - 2, sub - 2);
      }
      g.strokeStyle = 'rgba(60,58,48,.6)'; g.lineWidth = 1.5;
      for (let k = 0; k <= 4; k++) {
        g.beginPath(); g.moveTo(px + k * sub, py); g.lineTo(px + k * sub, py + cs); g.stroke();
        g.beginPath(); g.moveTo(px, py + k * sub); g.lineTo(px + cs, py + k * sub); g.stroke();
      }
      if (rnd() > .6) { g.fillStyle = 'rgba(36,34,28,.16)'; g.beginPath(); g.ellipse(px + rnd() * cs, py + rnd() * cs, 6 + rnd() * 20, 3 + rnd() * 9, rnd() * 3, 0, 7); g.fill(); }
    }
    if (ch === ';') {
      // sidewalk expansion joints
      g.strokeStyle = 'rgba(54,53,45,.6)'; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(px, py); g.lineTo(px + cs, py); g.moveTo(px, py); g.lineTo(px, py + cs); g.stroke();
      g.strokeStyle = 'rgba(170,168,150,.18)'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(px + 1, py + 1); g.lineTo(px + cs, py + 1); g.stroke();
      if (rnd() > .48) {
        g.strokeStyle = 'rgba(50,49,42,.55)'; g.lineWidth = 1;
        g.beginPath(); let cx = px + rnd() * cs, cy = py;
        g.moveTo(cx, cy);
        for (let k = 0; k < 4; k++) { cx += (rnd() - .5) * 20; cy += 5 + rnd() * 10; g.lineTo(cx, cy); }
        g.stroke();
      }
      if (rnd() > .7) { g.fillStyle = 'rgba(44,48,36,.35)'; g.beginPath(); g.ellipse(px + rnd() * cs, py + rnd() * cs, 3 + rnd() * 10, 2 + rnd() * 6, rnd() * 3, 0, 7); g.fill(); }
    }
    if (ch === '.') {
      if (rnd() > .72) {
        // crack
        g.strokeStyle = 'rgba(18,19,17,.6)'; g.lineWidth = 1;
        let cx = px + rnd() * cs, cy = py + rnd() * cs;
        g.beginPath(); g.moveTo(cx, cy);
        for (let k = 0; k < 4; k++) { cx += (rnd() - .5) * 26; cy += (rnd() - .5) * 26; g.lineTo(cx, cy); }
        g.stroke();
      }
      if (rnd() > .68) {
        g.fillStyle = 'rgba(20,22,20,.2)';
        g.beginPath(); g.ellipse(px + rnd() * cs, py + rnd() * cs, 6 + rnd() * 20, 3 + rnd() * 12, rnd() * 3, 0, 7); g.fill();
      }
      if (rnd() > .9) { // patched asphalt
        g.fillStyle = 'rgba(58,58,52,.35)'; g.fillRect(px + rnd() * 20, py + rnd() * 20, 12 + rnd() * 28, 8 + rnd() * 24);
      }
    }
    if (ch === '#' || ch === '%' || ch === '|' || ch === 'f' || ch === 'D' || ch === 'W' || ch === 'd') {
      // a dark, dirty apron under walls
      g.fillStyle = 'rgba(38,36,28,.45)';
      g.fillRect(px + 2, py + 2, cs - 4, cs - 4);
      for (let i = 0; i < 14; i++) {
        const v = 30 + rnd() * 40;
        g.fillStyle = `rgba(${v},${v - 2},${v - 8},.25)`;
        g.fillRect(px + rnd() * cs, py + rnd() * cs, 2 + rnd() * 5, 2 + rnd() * 5);
      }
    }
  }

  // road centre lines (skip the intersection)
  const roadColor = 'rgba(176,154,88,.42)';
  g.fillStyle = roadColor;
  for (let y = 1; y < 35; y++) {
    if (y >= 15 && y <= 20) continue;
    for (let yy = 0; yy < cs; yy += 13) g.fillRect(18 * cs - 1.6, y * cs + yy, 3.2, 7);
  }
  for (let x = 1; x < 35; x++) {
    if (x >= 15 && x <= 20) continue;
    for (let xx = 0; xx < cs; xx += 13) g.fillRect(x * cs + xx, 18 * cs - 1.6, 7, 3.2);
  }

  // crosswalks
  g.fillStyle = 'rgba(214,212,192,.32)';
  for (let k = 0; k < 6; k++) {
    g.fillRect(16.2 * cs + k * cs * .28, 16.05 * cs, cs * .17, cs * .55); // north crossing
    g.fillRect(16.2 * cs + k * cs * .28, 19.4 * cs, cs * .17, cs * .5); // south
    g.fillRect(15.35 * cs, 16.2 * cs + k * cs * .28, cs * .5, cs * .17); // west
    g.fillRect(20.2 * cs, 16.2 * cs + k * cs * .28, cs * .5, cs * .17); // east
  }

  // manhole covers
  for (const [mx, my] of [[17.6, 24.2], [18.5, 11.4], [26.4, 17.7]]) {
    g.fillStyle = 'rgba(30,31,28,.85)';
    g.beginPath(); g.arc(mx * cs, my * cs, cs * .24, 0, 7); g.fill();
    g.strokeStyle = 'rgba(92,92,80,.5)'; g.lineWidth = 1.5;
    g.beginPath(); g.arc(mx * cs, my * cs, cs * .19, 0, 7); g.stroke();
    g.beginPath(); g.arc(mx * cs, my * cs, cs * .07, 0, 7); g.stroke();
  }

  // skid / tyre marks near the crossing
  g.strokeStyle = 'rgba(18,18,16,.25)'; g.lineWidth = 4;
  for (let i = 0; i < 3; i++) {
    g.beginPath(); g.arc(19.5 * cs, 19.2 * cs, (1.2 + i * .35) * cs, .3, 1.7); g.stroke();
  }

  addNoise(g, S, 7, 99);
  return c;
}

/* ---------------------------------------------------------------- */
/* small textures                                                    */
/* ---------------------------------------------------------------- */
function makeBlood() {
  const S = 256, c = makeCanvas(S), g = c.getContext('2d'), rnd = mulberry32(101);
  g.clearRect(0, 0, S, S);
  const blob = (x, y, r) => {
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, 'rgba(74,12,9,.95)');
    grd.addColorStop(.55, 'rgba(58,10,8,.82)');
    grd.addColorStop(1, 'rgba(44,8,6,0)');
    g.fillStyle = grd; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  };
  blob(128, 128, 76);
  for (let i = 0; i < 12; i++) {
    const a = rnd() * 7, d = 30 + rnd() * 62;
    blob(128 + Math.cos(a) * d, 128 + Math.sin(a) * d, 6 + rnd() * 24);
  }
  for (let i = 0; i < 24; i++) {
    const a = rnd() * 7, d = 40 + rnd() * 95;
    g.fillStyle = `rgba(60,10,8,${.4 + rnd() * .5})`;
    g.beginPath(); g.arc(128 + Math.cos(a) * d, 128 + Math.sin(a) * d, 1 + rnd() * 4, 0, 7); g.fill();
  }
  return c;
}

function makeGlow() {
  const S = 128, c = makeCanvas(S), g = c.getContext('2d');
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(.16, 'rgba(255,244,214,.65)');
  grd.addColorStop(.5, 'rgba(255,226,164,.18)');
  grd.addColorStop(1, 'rgba(255,210,140,0)');
  g.fillStyle = grd; g.fillRect(0, 0, S, S);
  return c;
}

function makeLabel(text, color) {
  const W = 512, H = 128, c = makeCanvas(W, H), g = c.getContext('2d');
  g.clearRect(0, 0, W, H);
  g.font = "500 34px 'DM Mono', monospace";
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = 'rgba(8,12,8,.72)';
  g.fillRect(96, 28, 320, 56);
  g.strokeStyle = 'rgba(214,230,117,.45)'; g.lineWidth = 2; g.strokeRect(96, 28, 320, 56);
  g.fillStyle = color; g.fillText(text, W / 2, H / 2 + 1);
  return c;
}

function makeEnv(night) {
  const W = 512, H = 256, c = makeCanvas(W, H), g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, H);
  if (night) {
    grd.addColorStop(0, '#0a1218'); grd.addColorStop(.42, '#18232a');
    grd.addColorStop(.52, '#2a3138'); grd.addColorStop(.7, '#141a1c'); grd.addColorStop(1, '#070a0a');
  } else {
    grd.addColorStop(0, '#3c4a50'); grd.addColorStop(.38, '#78827c');
    grd.addColorStop(.5, '#b29a73'); grd.addColorStop(.58, '#6f6b58'); grd.addColorStop(1, '#22241f');
  }
  g.fillStyle = grd; g.fillRect(0, 0, W, H);
  const rnd = mulberry32(night ? 7 : 5);
  for (let i = 0; i < 26; i++) {
    g.fillStyle = night ? `rgba(120,140,150,${.015 + rnd() * .03})` : `rgba(210,202,180,${.02 + rnd() * .05})`;
    g.beginPath(); g.ellipse(rnd() * W, H * (.1 + rnd() * .38), 20 + rnd() * 90, 2 + rnd() * 12, 0, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

````

### FILE: `js/props.js`

````javascript
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
    const water = new THREE.MeshPhysicalMaterial({
      color: 0x4a5652, roughness: .12, metalness: 0, transparent: true, opacity: .5,
      envMapIntensity: 1.2, clearcoat: 1, clearcoatRoughness: .08, depthWrite: false,
    });
    const m = new THREE.Mesh(geo, water);
    m.position.set(x, .02, z); m.scale.set(sx, 1, sz); m.rotation.y = rot;
    m.receiveShadow = true; m.renderOrder = 1;
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

````

### FILE: `js/setdress.js`

````javascript
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

````

### FILE: `js/actors.js`

````javascript
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

````

### FILE: `js/fx.js`

````javascript
/* LAST LIGHT — weather and impact effects */
import * as THREE from '../vendor/three.module.min.js';
import { mulberry32, cellAt } from './core.js';

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
    // Interiors read as a roof cutaway: keep the rain outside.
    const ch = cellAt(Math.floor(d.x / 2 + 18), Math.floor(d.z / 2 + 18));
    if (ch === 't' || ch === 'F' || ch === 'c') {
      pos[o] = pos[o + 3] = 0;
      pos[o + 1] = pos[o + 4] = -60;
      pos[o + 2] = pos[o + 5] = 0;
      return;
    }
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

````

### FILE: `js/audio.js`

````javascript
/* LAST LIGHT — tiny procedural soundscape */
export function createAudio() {
  let ctx = null, master = null, started = false, enabled = true, rainGain = null, windGain = null;
  let noiseBuf = null;
  function makeNoise(seconds = 2) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const b = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < n; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + .02 * white) / 1.02;
      d[i] = last * 3.2 + white * .18;
    }
    return b;
  }
  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = enabled ? .72 : 0; master.connect(ctx.destination);
    noiseBuf = makeNoise(3);
    // rain hiss
    const rainSrc = ctx.createBufferSource(); rainSrc.buffer = noiseBuf; rainSrc.loop = true;
    const rainHP = ctx.createBiquadFilter(); rainHP.type = 'highpass'; rainHP.frequency.value = 1500;
    const rainLP = ctx.createBiquadFilter(); rainLP.type = 'lowpass'; rainLP.frequency.value = 5200;
    rainGain = ctx.createGain(); rainGain.gain.value = .02;
    rainSrc.connect(rainHP).connect(rainLP).connect(rainGain).connect(master);
    rainSrc.start();
    // low wind bed
    const windSrc = ctx.createBufferSource(); windSrc.buffer = noiseBuf; windSrc.loop = true;
    const windLP = ctx.createBiquadFilter(); windLP.type = 'lowpass'; windLP.frequency.value = 240;
    windGain = ctx.createGain(); windGain.gain.value = .028;
    const lfo = ctx.createOscillator(); lfo.frequency.value = .07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = .014;
    lfo.connect(lfoGain).connect(windGain.gain); lfo.start();
    windSrc.connect(windLP).connect(windGain).connect(master);
    windSrc.start();
    started = true;
  }
  function noiseHit(dur, gain, freq, type = 'bandpass', q = .8, rate = 1) {
    if (!ctx || !started) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = noiseBuf; src.playbackRate.value = rate;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    src.connect(f).connect(g).connect(master);
    src.start(t); src.stop(t + dur + .02);
  }
  function tone(freq, dur, gain, type = 'sine', slide = 0) {
    if (!ctx || !started) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(.0002, gain), t + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(master); o.start(t); o.stop(t + dur + .05);
  }
  return {
    init,
    get ready() { return started; },
    toggle() { enabled = !enabled; if (master) master.gain.value = enabled ? .72 : 0; return enabled; },
    setNight(f) {
      if (rainGain) rainGain.gain.value = .012 + f * .02;
      if (windGain) windGain.gain.value = .02 + f * .018;
    },
    step(sprint) {
      noiseHit(sprint ? .07 : .09, sprint ? .05 : .032, sprint ? 380 : 280, 'bandpass', 1.2, .8 + Math.random() * .4);
    },
    swing() { noiseHit(.16, .028, 900, 'bandpass', 1.5, 2.2); },
    hit() {
      noiseHit(.14, .11, 420, 'lowpass', .6, .7);
      tone(78, .12, .09, 'sine', -24);
    },
    gore() {
      noiseHit(.22, .1, 240, 'lowpass', .8, .5);
      tone(53, .24, .07, 'sine', -16);
    },
    shot() {
      noiseHit(.3, .24, 1800, 'highpass', .6, 1.1);
      noiseHit(.18, .2, 500, 'lowpass', .5, .7);
      tone(64, .22, .16, 'sine', -30);
    },
    empty() { tone(1200, .035, .03, 'square'); },
    pickup() { tone(520, .08, .035, 'triangle'); setTimeout(() => tone(760, .09, .03, 'triangle'), 60); },
    craft() { tone(320, .1, .04, 'square'); setTimeout(() => tone(470, .14, .035, 'square'), 90); },
    hammer() {
      noiseHit(.07, .07, 1300, 'bandpass', 2, 1.3);
      tone(180, .08, .06, 'sine', -60);
    },
    door(open) {
      noiseHit(.24, .05, open ? 680 : 420, 'bandpass', 3, .6);
      tone(open ? 180 : 140, .22, .025, 'sawtooth', open ? 40 : -30);
    },
    groan(vol) {
      if (!started) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      const base = 64 + Math.random() * 34;
      o.frequency.setValueAtTime(base, t);
      o.frequency.linearRampToValueAtTime(base * .7, t + 1.1);
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 340; f.Q.value = 3;
      const g = ctx.createGain();
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(.001, vol), t + .18);
      g.gain.exponentialRampToValueAtTime(.0001, t + 1.2);
      o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + 1.3);
    },
    heartbeat() { tone(48, .18, .12, 'sine'); setTimeout(() => tone(42, .2, .09, 'sine'), 170); },
    hurt() { noiseHit(.2, .1, 300, 'lowpass', .6, .5); },
    nightfall() {
      tone(60, 2.2, .1, 'sine', -18);
      setTimeout(() => tone(48, 2.6, .08, 'sine', -10), 400);
    },
    win() { [392, 494, 587, 784].forEach((f, i) => setTimeout(() => tone(f, .7, .05, 'triangle'), i * 160)); },
    lose() { [196, 164, 130, 98].forEach((f, i) => setTimeout(() => tone(f, 1.0, .06, 'sine'), i * 240)); },
  };
}

````

### FILE: `js/world.js`

````javascript
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

````

### FILE: `js/game.js`

````javascript
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
  ui.threat.classList.toggle('on', (state.night || breached) && state.playing);
  if (state.night || breached) ui.threat.innerHTML = breached ? '<i></i>THEY ARE INSIDE THE HOUSE' : '<i></i>THE DEAD ARE DRAWN TO NOISE';
  // objective copy
  if (state.playing) {
    if (breached) {
      ui.goal.textContent = 'They are inside. Fight or flee.';
    } else if (state.night) {
      ui.goal.textContent = 'Hold the safehouse until dawn.';
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
  state, player, resources, world, renderer, scene, camera,
  get zombies() { return zombies; },
  get weapon() { return weapon; },
  findNear, interact, attack, boardUp, useCar, startFresh, endGame, setWeapon,
  spawnZombie, saveGame, craft, hurt, updateHud,
  get save() { return loadSave(); },
};



````
