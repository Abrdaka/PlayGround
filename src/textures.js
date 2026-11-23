import * as THREE from 'three'

export const ATLAS_COLS = 8
export const TILE_PX = 16
// Tile indices in the procedural atlas. Keep in sync with drawTile().
export const T = {
  GRASS_TOP: 0, GRASS_SIDE: 1, DIRT: 2, STONE: 3, LOG_SIDE: 4, LOG_TOP: 5,
  LEAVES: 6, SAND: 7, PLANKS: 8, COBBLE: 9, IRON: 10, WATER: 11,
  CONCRETE: 12, GLASS: 13, CRATE_SIDE: 14, CRATE_TOP: 15, ASPHALT: 16,
  GRAVEL: 17, BEDROCK: 18, METAL: 19, PATH: 20, TALLGRASS: 21,
  FLOWER_R: 22, FLOWER_Y: 23, MOSS: 24, BARK: 25,
}

function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function jitter(base, amount, rand) {
  const c = new THREE.Color(base)
  const v = (rand() - 0.5) * amount
  c.offsetHSL(0, 0, v)
  return '#' + c.getHexString()
}

function makeCtx() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = ATLAS_COLS * TILE_PX
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  return { canvas, ctx }
}

function tileOrigin(index) {
  return [(index % ATLAS_COLS) * TILE_PX, Math.floor(index / ATLAS_COLS) * TILE_PX]
}

function fillNoise(ctx, index, colors, seed, amount = 0.09) {
  const [ox, oy] = tileOrigin(index)
  const rand = mulberry32(seed)
  ctx.fillStyle = colors[0]
  ctx.fillRect(ox, oy, TILE_PX, TILE_PX)
  for (let y = 0; y < TILE_PX; y++) {
    for (let x = 0; x < TILE_PX; x++) {
      const c = colors[Math.floor(rand() * colors.length)]
      ctx.fillStyle = jitter(c, amount, rand)
      ctx.fillRect(ox + x, oy + y, 1, 1)
    }
  }
}

function drawTile(ctx, index, seed) {
  const [ox, oy] = tileOrigin(index)
  const rand = mulberry32(seed + index * 977)
  const px = (x, y, color) => { ctx.fillStyle = color; ctx.fillRect(ox + x, oy + y, 1, 1) }
  switch (index) {
    case T.GRASS_TOP:
      fillNoise(ctx, index, ['#527f34', '#5c8a3b', '#4b762f', '#659342'], seed, 0.07)
      for (let i = 0; i < 18; i++) px(rand() * 16 | 0, rand() * 16 | 0, rand() > .5 ? '#79a54e' : '#416a29')
      break
    case T.GRASS_SIDE:
      fillNoise(ctx, index, ['#74563a', '#7d5e40', '#6a4e35'], seed, 0.05)
      for (let x = 0; x < 16; x++) {
        const h = 3 + (rand() * 3 | 0)
        for (let y = 0; y < h; y++) px(x, y, jitter(y === h - 1 ? '#527f34' : '#5c8a3b', .09, rand))
      }
      break
    case T.DIRT:
      fillNoise(ctx, index, ['#74563a', '#7d5e40', '#6a4e35', '#876a48'], seed, 0.06)
      break
    case T.STONE:
      fillNoise(ctx, index, ['#83868a', '#8e9195', '#787b7f', '#999ca0'], seed, 0.045)
      for (let i = 0; i < 5; i++) {
        let x = rand() * 16 | 0, y = rand() * 16 | 0
        for (let k = 0; k < 3; k++) { px(x, y, '#6c6f73'); x = Math.min(15, x + (rand() > .5 ? 1 : 0)); y = Math.min(15, y + (rand() > .3 ? 1 : 0)) }
      }
      break
    case T.LOG_SIDE: case T.BARK:
      fillNoise(ctx, index, ['#8a6438', '#9a7144', '#7a5731'], seed, 0.06)
      for (let x = 0; x < 16; x++) {
        if (rand() > .5) for (let y = 0; y < 16; y++) if (rand() > .45) px(x, y, jitter('#67482a', .12, rand))
      }
      for (let i = 0; i < 12; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#b08750')
      break
    case T.LOG_TOP:
      fillNoise(ctx, index, ['#bb9160', '#c69c69', '#a98153'], seed, 0.05)
      for (let r = 2; r < 8; r += 2) {
        for (let a = 0; a < 64; a++) {
          const ang = a / 64 * Math.PI * 2
          px(7.5 + Math.cos(ang) * r | 0, 7.5 + Math.sin(ang) * r | 0, '#8d6738')
        }
      }
      break
    case T.LEAVES:
      fillNoise(ctx, index, ['#2f5a26', '#3b6b2d', '#26481e', '#467a35'], seed, 0.17)
      for (let i = 0; i < 22; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#1b3415')
      for (let i = 0; i < 3; i++) { const x = rand() * 16 | 0, y = rand() * 16 | 0; ctx.clearRect(ox + x, oy + y, 1, 1) }
      break
    case T.SAND:
      fillNoise(ctx, index, ['#c9b57c', '#d6c48d', '#bdaa72'], seed, 0.06)
      break
    case T.PLANKS:
      fillNoise(ctx, index, ['#a37d4c', '#b08a56', '#957147'], seed, 0.07)
      for (let y = 0; y < 16; y += 4) {
        for (let x = 0; x < 16; x++) { px(x, y, '#6f5332'); px(x, (y + 3) % 16, '#c39a62') }
        for (let x = 0; x < 16; x++) if (rand() > .8) px(x, y + 1 + (rand() * 2 | 0), '#8a6942')
      }
      break
    case T.COBBLE:
      fillNoise(ctx, index, ['#6f7276', '#7d8084', '#666a6d'], seed, 0.06)
      for (let i = 0; i < 7; i++) {
        const x = rand() * 14 | 0, y = rand() * 14 | 0, w = 2 + (rand() * 4 | 0), h = 2 + (rand() * 3 | 0)
        ctx.fillStyle = jitter('#8b8e92', .1, rand)
        ctx.fillRect(ox + x, oy + y, w, h)
      }
      for (let i = 0; i < 20; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#4f5256')
      break
    case T.IRON:
      fillNoise(ctx, index, ['#7c7f83', '#8a8d91', '#6e7175'], seed, 0.07)
      for (let i = 0; i < 11; i++) {
        const x = rand() * 15 | 0, y = rand() * 15 | 0
        px(x, y, '#c9783d'); px((x + 1) % 16, y, '#e09a5d'); px(x, (y + 1) % 16, '#a35a2c')
      }
      break
    case T.WATER:
      fillNoise(ctx, index, ['#2b6690', '#32749f', '#255b82'], seed, 0.05)
      for (let y = 0; y < 16; y += 3) for (let x = 0; x < 16; x++) if ((x + y / 3 | 0) % 7 < 2) px(x, y, '#4a8cb4')
      break
    case T.CONCRETE:
      fillNoise(ctx, index, ['#9c9a92', '#a8a69e', '#8f8d86'], seed, 0.05)
      for (let i = 0; i < 10; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#7d7b75')
      break
    case T.GLASS:
      ctx.fillStyle = '#a9d0d8'; ctx.fillRect(ox, oy, 16, 16)
      ctx.clearRect(ox + 2, oy + 2, 12, 12)
      ctx.fillStyle = '#d7eef2'; ctx.fillRect(ox + 1, oy + 1, 14, 1); ctx.fillRect(ox + 1, oy + 14, 14, 1)
      break
    case T.CRATE_SIDE:
      fillNoise(ctx, index, ['#8d6838', '#9a7540', '#7d5a30'], seed, 0.07)
      for (let x = 0; x < 16; x++) { px(x, 0, '#4d3a1d'); px(x, 15, '#4d3a1d') }
      for (let y = 0; y < 16; y++) { px(0, y, '#4d3a1d'); px(15, y, '#4d3a1d') }
      ctx.fillStyle = '#6b5129'; ctx.fillRect(ox + 2, oy + 2, 12, 2); ctx.fillRect(ox + 2, oy + 12, 12, 2)
      ctx.fillStyle = '#c9a45e'; ctx.fillRect(ox + 7, oy + 6, 2, 4)
      break
    case T.CRATE_TOP:
      fillNoise(ctx, index, ['#9a7540', '#a67f47', '#8d6838'], seed, 0.06)
      for (let x = 0; x < 16; x++) { px(x, 0, '#4d3a1d'); px(x, 15, '#4d3a1d') }
      for (let y = 0; y < 16; y++) { px(0, y, '#4d3a1d'); px(15, y, '#4d3a1d') }
      ctx.fillStyle = '#6b5129'; ctx.fillRect(ox + 1, oy + 7, 14, 2)
      break
    case T.ASPHALT:
      fillNoise(ctx, index, ['#3d3f42', '#46484b', '#343639'], seed, 0.07)
      for (let i = 0; i < 12; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#56585b')
      break
    case T.GRAVEL:
      fillNoise(ctx, index, ['#77736c', '#837f77', '#66635d'], seed, 0.1)
      for (let i = 0; i < 18; i++) {
        const x = rand() * 15 | 0, y = rand() * 15 | 0
        ctx.fillStyle = jitter('#94908a', .16, rand); ctx.fillRect(ox + x, oy + y, 2, 2)
      }
      break
    case T.BEDROCK:
      fillNoise(ctx, index, ['#35373a', '#2b2d2f', '#414346'], seed, 0.09)
      break
    case T.METAL:
      fillNoise(ctx, index, ['#5d666d', '#68727a', '#515a60'], seed, 0.05)
      for (let i = 0; i < 4; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#a8b2b8')
      break
    case T.PATH:
      fillNoise(ctx, index, ['#8a7148', '#978052', '#7b6340'], seed, 0.08)
      for (let i = 0; i < 10; i++) px(rand() * 16 | 0, rand() * 16 | 0, '#a8905f')
      break
    case T.TALLGRASS:
      ctx.clearRect(ox, oy, 16, 16)
      for (let i = 0; i < 12; i++) {
        let x = 2 + (rand() * 12 | 0)
        const h = 5 + (rand() * 9 | 0)
        for (let y = 0; y < h; y++) px(x, 15 - y, jitter(y > h - 4 ? '#77a447' : '#4c7a2f', .12, rand))
      }
      break
    case T.FLOWER_R: case T.FLOWER_Y:
      ctx.clearRect(ox, oy, 16, 16)
      for (let i = 0; i < 3; i++) {
        const base = 4 + (rand() * 9 | 0)
        for (let y = 0; y < 7; y++) px(base, 15 - y, '#4c7a2f')
        px(base - 1, 9, '#5c8c38'); px(base + 1, 8, '#5c8c38')
      }
      ctx.fillStyle = index === T.FLOWER_R ? '#c94a3d' : '#d9b23a'
      for (const [x, y] of [[3, 6], [4, 5], [5, 6], [4, 7], [10, 8], [11, 7], [12, 8], [11, 9], [11, 8]]) ctx.fillRect(ox + x, oy + y, 1, 1)
      break
    case T.MOSS:
      fillNoise(ctx, index, ['#54663a', '#5f7342', '#495a32'], seed, 0.1)
      break
  }
}

export function createAtlas() {
  const { canvas, ctx } = makeCtx()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < ATLAS_COLS * ATLAS_COLS; i++) drawTile(ctx, i, 1337)
  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

// A slightly stretched version used by sky/billboard sprites is not needed;
// keep one atlas for crisp voxel faces.
export function atlasUV(tile, inset = 0.02) {
  const tx = tile % ATLAS_COLS, ty = Math.floor(tile / ATLAS_COLS)
  const s = 1 / ATLAS_COLS
  return {
    u0: (tx + inset) * s,
    v0: 1 - (ty + 1 - inset) * s,
    u1: (tx + 1 - inset) * s,
    v1: 1 - (ty + inset) * s,
  }
}
