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
