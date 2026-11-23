import * as THREE from 'three'
import { B, BLOCKS, blockDef, isOpaque, isSolid } from './blocks.js'
import { createAtlas, atlasUV, T } from './textures.js'

export const CHUNK = 16
export const WORLD_CHUNKS = 10
export const WORLD_SIZE = CHUNK * WORLD_CHUNKS
export const HEIGHT = 64
export const SEA_LEVEL = 23

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash2(x, y, seed) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

function smooth(t) { return t * t * (3 - 2 * t) }

function noise2(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = smooth(xf), v = smooth(yf)
  const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed)
  const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed)
  return (a + (b - a) * u) + ((c + (d - c) * u) - (a + (b - a) * u)) * v
}

function noise3(x, y, z, seed) {
  const zi = Math.floor(z), zf = z - zi
  const w = smooth(zf)
  const n0 = noise2(x + zi * 17.13, y - zi * 9.71, seed + zi * 131)
  const n1 = noise2(x + (zi + 1) * 17.13, y - (zi + 1) * 9.71, seed + (zi + 1) * 131)
  return n0 + (n1 - n0) * w
}

function fbm2(x, y, seed, oct = 4) {
  let v = 0, amp = 1, freq = 1, total = 0
  for (let i = 0; i < oct; i++) {
    v += noise2(x * freq, y * freq, seed + i * 1013) * amp
    total += amp
    amp *= 0.5; freq *= 2.03
  }
  return v / total
}

const DIRS = [
  { n: [0, 1, 0], c: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]], shade: 1.0, tile: 0 },
  { n: [0, -1, 0], c: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], shade: 0.5, tile: 1 },
  { n: [0, 0, 1], c: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], shade: 0.8, tile: 2 },
  { n: [0, 0, -1], c: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]], shade: 0.8, tile: 2 },
  { n: [1, 0, 0], c: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]], shade: 0.9, tile: 2 },
  { n: [-1, 0, 0], c: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]], shade: 0.9, tile: 2 },
]
const AO_CURVE = [0.55, 0.72, 0.86, 1.0]

export class World {
  constructor(scene, seed = 20250707) {
    this.scene = scene
    this.seed = seed
    this.chunks = new Map()
    this.edits = new Map()
    this.dirty = new Set()
    this.campfires = []
    this.baseHeight = new Int16Array(WORLD_SIZE * WORLD_SIZE)
    this.atlas = createAtlas()
    this.group = new THREE.Group()
    this.group.name = 'world'
    scene.add(this.group)
    this.opaqueMat = new THREE.MeshLambertMaterial({
      map: this.atlas, vertexColors: true, alphaTest: 0.25,
    })
    this.waterMat = new THREE.MeshLambertMaterial({
      map: this.atlas, vertexColors: true, transparent: true, opacity: 0.68,
      depthWrite: false, side: THREE.DoubleSide,
    })
    this.glassMat = new THREE.MeshLambertMaterial({
      map: this.atlas, vertexColors: true, transparent: true, opacity: 0.38,
      depthWrite: false, side: THREE.DoubleSide,
    })
    this.plantMat = new THREE.MeshLambertMaterial({
      map: this.atlas, vertexColors: true, alphaTest: 0.4, side: THREE.DoubleSide,
    })
    this.SPAWN = { x: 80.5, y: 0, z: 80.5 }
  }

  key(cx, cz) { return cx + ',' + cz }

  getChunk(cx, cz) { return this.chunks.get(this.key(cx, cz)) }

  getBlock(x, y, z) {
    if (y < 0 || y >= HEIGHT) return B.AIR
    x = Math.floor(x); z = Math.floor(z)
    if (x < 0 || z < 0 || x >= WORLD_SIZE || z >= WORLD_SIZE) return B.AIR
    const ch = this.chunks.get(this.key(x >> 4, z >> 4))
    if (!ch) return B.AIR
    return ch.data[(y << 8) | ((z & 15) << 4) | (x & 15)]
  }

  setRaw(x, y, z, id) {
    if (y < 0 || y >= HEIGHT) return
    x = Math.floor(x); z = Math.floor(z)
    if (x < 0 || z < 0 || x >= WORLD_SIZE || z >= WORLD_SIZE) return
    const ch = this.chunks.get(this.key(x >> 4, z >> 4))
    if (!ch) return
    ch.data[(y << 8) | ((z & 15) << 4) | (x & 15)] = id
  }

  worldToChunk(x, z) { return [x >> 4, z >> 4] }

  setBlock(x, y, z, id, record = true) {
    x = Math.floor(x); y = Math.floor(y); z = Math.floor(z)
    if (y < 0 || y >= HEIGHT || x < 0 || z < 0 || x >= WORLD_SIZE || z >= WORLD_SIZE) return false
    this.setRaw(x, y, z, id)
    if (record) this.edits.set(`${x},${y},${z}`, id)
    const cx = x >> 4, cz = z >> 4
    this.dirty.add(this.key(cx, cz))
    const lx = x & 15, lz = z & 15
    if (lx === 0) this.dirty.add(this.key(cx - 1, cz))
    if (lx === 15) this.dirty.add(this.key(cx + 1, cz))
    if (lz === 0) this.dirty.add(this.key(cx, cz - 1))
    if (lz === 15) this.dirty.add(this.key(cx, cz + 1))
    return true
  }

  generate() {
    const rng = mulberry32(this.seed)
    for (let cx = 0; cx < WORLD_CHUNKS; cx++) {
      for (let cz = 0; cz < WORLD_CHUNKS; cz++) {
        this.chunks.set(this.key(cx, cz), { data: new Uint8Array(CHUNK * CHUNK * HEIGHT), cx, cz, mesh: null, tmesh: null, pmesh: null })
      }
    }

    // Terrain heights
    for (let x = 0; x < WORLD_SIZE; x++) {
      for (let z = 0; z < WORLD_SIZE; z++) {
        const broad = fbm2(x * 0.0085, z * 0.0085, this.seed, 4)
        const detail = fbm2(x * 0.031, z * 0.031, this.seed + 77, 3)
        let h = 22 + broad * 16 + detail * 5
        if (h < 9) h = 9
        this.baseHeight[z * WORLD_SIZE + x] = Math.round(h)
      }
    }

    this.flattenZone(80, 80, 14, 30)
    this.flattenZone(80, 60.5, 12, 30)
    this.flattenZone(80, 71, 5, 29.6)
    this.carvePond(65, 71, 7.5, 27.5)

    // Column fill
    for (let x = 0; x < WORLD_SIZE; x++) {
      for (let z = 0; z < WORLD_SIZE; z++) {
        const h = this.baseHeight[z * WORLD_SIZE + x]
        const beach = h <= SEA_LEVEL + 1
        const surface = beach ? B.SAND : B.GRASS
        for (let y = 0; y <= h; y++) {
          let id = B.STONE
          if (y === h) id = surface
          else if (y >= h - 3) id = beach ? B.SAND : B.DIRT
          if (y === 0) id = B.BEDROCK
          if (y > 2 && y < h - 2) {
            const cave = noise3(x * 0.075, y * 0.11, z * 0.075, this.seed + 311)
            const cave2 = noise3(x * 0.045, y * 0.07 + 12, z * 0.045, this.seed + 913)
            if (cave > 0.68 || (cave2 > 0.72 && y < h - 6)) id = B.AIR
          }
          if (id === B.STONE && y < h - 3) {
            const ore = noise3(x * 0.12, y * 0.16, z * 0.12, this.seed + 505)
            if (ore > 0.73 && y < 30) id = B.IRON
            else if (noise3(x * 0.09, y * 0.13, z * 0.09, this.seed + 88) > 0.76) id = B.GRAVEL
          }
          this.setRaw(x, y, z, id)
        }
        if (h < SEA_LEVEL) {
          for (let y = h + 1; y <= SEA_LEVEL; y++) this.setRaw(x, y, z, B.WATER)
        }
      }
    }

    // Pond water & shoreline
    this.fillPond(65, 71, 7.5, 27.5)
    this.carvePath(80, 80, 80, 65)
    this.buildCabin(77, 57)
    this.placeTrees(rng)
    this.placeRocks(rng)
    this.placePlants(rng)
    this.buildCampfire(82.5, 68.6)
    this.SPAWN.y = this.surfaceHeight(80, 80) + 2.2

    // Re-apply saved edits (setRaw keeps the edit log intact for saving).
    for (const [k, id] of this.edits) {
      const [x, y, z] = k.split(',').map(Number)
      this.setRaw(x, y, z, id)
    }
    this.rebuildAll()
  }

  reset() {
    for (const ch of this.chunks.values()) {
      for (const f of ['mesh', 'tmesh', 'pmesh']) {
        const m = ch[f]
        if (m) { this.group.remove(m); m.geometry.dispose() }
      }
    }
    for (const c of this.campfires) {
      this.scene.remove(c.group)
      c.group.traverse(o => { if (o.geometry) o.geometry.dispose() })
    }
    this.chunks.clear()
    this.edits.clear()
    this.dirty.clear()
    this.campfires = []
    this.generate()
  }

  flattenZone(cx, cz, radius, target) {
    for (let x = Math.max(0, cx - radius | 0); x < Math.min(WORLD_SIZE, cx + radius); x++) {
      for (let z = Math.max(0, cz - radius | 0); z < Math.min(WORLD_SIZE, cz + radius); z++) {
        const d = Math.hypot(x - cx, z - cz)
        if (d > radius) continue
        const w = d < radius * 0.7 ? 1 : 1 - (d - radius * 0.7) / (radius * 0.3)
        const i = z * WORLD_SIZE + x
        this.baseHeight[i] = Math.round(this.baseHeight[i] * (1 - w) + target * w)
      }
    }
  }

  carvePond(cx, cz, radius, level) {
    for (let x = Math.max(0, cx - radius - 4 | 0); x < Math.min(WORLD_SIZE, cx + radius + 4); x++) {
      for (let z = Math.max(0, cz - radius - 4 | 0); z < Math.min(WORLD_SIZE, cz + radius + 4); z++) {
        const d = Math.hypot(x - cx, z - cz)
        if (d > radius + 3) continue
        const i = z * WORLD_SIZE + x
        if (d < radius) {
          const depth = 2 + (1 - d / radius) * 3.2
          this.baseHeight[i] = Math.min(this.baseHeight[i], Math.round(level - depth))
        } else {
          const shore = Math.min(this.baseHeight[i], Math.round(level + 0.4))
          this.baseHeight[i] = Math.max(shore, Math.round(level))
        }
      }
    }
  }

  fillPond(cx, cz, radius, level) {
    const maxR = radius + 3
    for (let x = Math.max(0, cx - maxR | 0); x < Math.min(WORLD_SIZE, cx + maxR); x++) {
      for (let z = Math.max(0, cz - maxR | 0); z < Math.min(WORLD_SIZE, cz + maxR); z++) {
        const d = Math.hypot(x - cx, z - cz)
        if (d > maxR) continue
        const h = this.baseHeight[z * WORLD_SIZE + x]
        if (h < level) {
          for (let y = h + 1; y <= level; y++) this.setRaw(x, y, z, B.WATER)
          // sandy bed
          for (let y = h - 1; y <= h + 1; y++) if (this.getBlock(x, y, z) !== B.WATER) this.setRaw(x, y, z, B.SAND)
        } else if (d < radius + 2.2) {
          this.setRaw(x, h, z, B.SAND)
          this.setRaw(x, h + 1, z, B.AIR)
          this.setRaw(x, h + 2, z, B.AIR)
        }
      }
    }
  }

  carvePath(x0, z0, x1, z1) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(z1 - z0)) * 2
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const x = Math.round(x0 + (x1 - x0) * t)
      const z = Math.round(z0 + (z1 - z0) * t)
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dx) + Math.abs(dz) > 1) continue
          const h = this.surfaceHeight(x + dx, z + dz)
          if (this.getBlock(x + dx, h, z + dz) === B.GRASS) this.setRaw(x + dx, h, z + dz, B.PATH)
        }
      }
    }
  }

  buildCabin(x0, z0) {
    const ground = 30
    const w = 9, d = 8
    for (let x = x0; x < x0 + w; x++) {
      for (let z = z0; z < z0 + d; z++) {
        for (let y = ground - 1; y <= ground + 8; y++) this.setRaw(x, y, z, B.AIR)
        for (let dx = 0; dx < 3; dx++) for (let dz = 0; dz < 3; dz++) this.setRaw(x, ground - 1 - dz, z, B.DIRT)
      }
    }
    // foundation / floor
    for (let x = x0; x < x0 + w; x++) {
      for (let z = z0; z < z0 + d; z++) {
        const interior = x > x0 && x < x0 + w - 1 && z > z0 && z < z0 + d - 1
        if (interior && (x + z) % 7 !== 3) this.setRaw(x, ground, z, B.PLANKS)
      }
    }
    const wallBlock = (x, y, z, i) => {
      const corner = (x === x0 || x === x0 + w - 1) && (z === z0 || z === z0 + d - 1)
      let id = B.PLANKS
      if (corner) id = B.LOG
      else if (y === ground + 1) id = B.COBBLE
      else if (y === ground + 4) id = B.COBBLE
      else if (i % 17 === 0) id = B.COBBLE
      if ((x + z + y) % 13 === 0) return
      this.setRaw(x, y, z, id)
    }
    let i = 0
    for (let y = ground + 1; y <= ground + 4; y++) {
      for (let x = x0; x < x0 + w; x++) {
        // north wall (z0) has collapsed section
        if (!(x > x0 + 4 && y < ground + 3)) wallBlock(x, y, z0, i++)
        const south = z0 + d - 1
        const doorway = x >= x0 + 3 && x <= x0 + 5 && y <= ground + 3
        if (!doorway) wallBlock(x, y, south, i++)
        else if (y === ground + 4) this.setRaw(x, y, south, B.COBBLE)
      }
      for (let z = z0 + 1; z < z0 + d - 1; z++) {
        if (!(z > z0 + 5 && y > ground + 2)) wallBlock(x0, y, z, i++)
        if (!(z > z0 + 2 && z < z0 + 5 && y === ground + 2)) this.setRaw(x0 + w - 1, y, z, (i % 6 === 0) ? B.AIR : B.PLANKS)
        i++
      }
    }
    // windows
    for (const [x, z] of [[x0 + 2, z0], [x0 + 6, z0], [x0, z0 + 3], [x0 + w - 1, z0 + 2], [x0 + w - 1, z0 + 5]]) {
      this.setRaw(x, ground + 2, z, B.AIR)
    }
    // roof, partially collapsed
    for (let x = x0 - 1; x <= x0 + w; x++) {
      for (let z = z0 - 1; z <= z0 + d; z++) {
        const edge = x === x0 - 1 || x === x0 + w || z === z0 - 1 || z === z0 + d
        const hole = noise2(x * 1.7, z * 1.7, 4) > 0.68 || (x > x0 + 5 && z < z0 + 3)
        if (edge) {
          if (!hole) this.setRaw(x, ground + 5, z, B.PLANKS)
        } else if (!hole) {
          this.setRaw(x, ground + 5, z, noise2(x * 2.1, z * 2.1, 9) > 0.55 ? B.COBBLE : B.PLANKS)
        }
      }
    }
    // porch canopy over the south doorway
    for (let x = x0 + 1; x <= x0 + w - 2; x++) {
      for (let z = z0 + d; z <= z0 + d + 2; z++) {
        if ((x + z) % 9 === 0) continue
        this.setRaw(x, ground + 5, z, B.PLANKS)
      }
    }
    for (const [x, z] of [[x0 + 1, z0 + d + 2], [x0 + w - 2, z0 + d + 2]]) {
      for (let y = ground + 1; y <= ground + 4; y++) this.setRaw(x, y, z, B.LOG)
    }
    // chimney
    for (let y = ground + 5; y <= ground + 7; y++) {
      this.setRaw(x0 + 6, y, z0 + 2, y === ground + 7 ? B.MOSS : B.COBBLE)
    }
    // window glass in two openings
    this.setRaw(x0 + 2, ground + 2, z0, B.GLASS)
    this.setRaw(x0 + w - 1, ground + 2, z0 + 5, B.GLASS)
    // support posts
    for (const [x, z] of [[x0 + 2, z0 + 2], [x0 + w - 3, z0 + 2], [x0 + 2, z0 + d - 3]]) {
      for (let y = ground + 1; y <= ground + 4; y++) this.setRaw(x, y, z, B.LOG)
    }
    // crates & supplies
    this.setRaw(x0 + 2, ground + 1, z0 + 5, B.CRATE)
    this.setRaw(x0 + 6, ground + 1, z0 + 2, B.CRATE)
    this.setRaw(x0 + 7, ground + 1, z0 + 5, B.METAL)
    // a bit of debris
    this.setRaw(x0 + 4, ground + 1, z0 + 2, B.COBBLE)
    this.setRaw(x0 - 1, ground + 1, z0 + 6, B.GRAVEL)
  }

  addTree(x, z, type, rng, forceHeight) {
    const gx = Math.round(x), gz = Math.round(z)
    const h = forceHeight ?? this.surfaceHeight(gx, gz)
    const ground = this.getBlock(gx, h, gz)
    if (ground !== B.GRASS) return
    const trunk = type === 'pine' ? 6 + Math.floor(rng() * 3) : 4 + Math.floor(rng() * 3)
    for (let y = 1; y <= trunk; y++) this.setRaw(gx, h + y, gz, B.LOG)
    if (type === 'pine') {
      for (let layer = 0; layer < 5; layer++) {
        const r = Math.max(0, 2 - Math.floor(layer * 0.55))
        const y = h + trunk - 3 + layer
        for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
          if (Math.abs(dx) + Math.abs(dz) > r + 1) continue
          if (this.getBlock(gx + dx, y, gz + dz) === B.AIR) this.setRaw(gx + dx, y, gz + dz, B.LEAVES)
        }
      }
      this.setRaw(gx, h + trunk + 1, gz, B.LEAVES)
    } else {
      const top = h + trunk
      for (let dy = -2; dy <= 2; dy++) {
        const r = dy === 2 ? 1 : 2
        for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
          if (Math.abs(dx) === r && Math.abs(dz) === r && rng() > 0.5) continue
          if (this.getBlock(gx + dx, top + dy, gz + dz) === B.AIR) this.setRaw(gx + dx, top + dy, gz + dz, B.LEAVES)
        }
      }
    }
  }

  placeTrees(rng) {
    // Hand-placed trees frame the spawn vista.
    this.addTree(72, 67, 'oak', rng)
    this.addTree(91, 66, 'pine', rng)
    this.addTree(69, 79, 'oak', rng)
    this.addTree(93, 77, 'oak', rng)
    this.addTree(87, 52, 'pine', rng)
    this.addTree(71, 52, 'oak', rng)
    let tries = 0
    while (tries++ < 220) {
      const x = 8 + rng() * (WORLD_SIZE - 16)
      const z = 8 + rng() * (WORLD_SIZE - 16)
      if (Math.hypot(x - 80, z - 80) < 17) continue
      if (Math.abs(x - 80) < 11 && z > 56 && z < 82) continue
      if (Math.hypot(x - 65, z - 71) < 10) continue
      if (Math.hypot(x - 80, z - 60.5) < 9) continue
      const h = this.surfaceHeight(x, z)
      if (this.getBlock(x, h, z) !== B.GRASS) continue
      if (this.getBlock(x, h + 1, z) !== B.AIR) continue
      this.addTree(x, z, rng() > 0.62 ? 'pine' : 'oak', rng, h)
    }
  }

  placeRocks(rng) {
    const spots = [[88, 73, 4], [70, 62, 3], [58, 84, 4], [97, 88, 3]]
    for (const [cx, cz, r] of spots) {
      const h = this.surfaceHeight(cx, cz)
      for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
        for (let dy = 0; dy < r - 1; dy++) {
          if (Math.hypot(dx, dz, dy * 0.8) <= r - 0.4) {
            this.setRaw(cx + dx, h + dy, cz + dz, rng() > 0.85 ? B.MOSS : B.STONE)
          }
        }
      }
    }
  }

  placePlants(rng) {
    for (let x = 2; x < WORLD_SIZE - 2; x++) {
      for (let z = 2; z < WORLD_SIZE - 2; z++) {
        const h = this.surfaceHeight(x, z)
        if (this.getBlock(x, h, z) !== B.GRASS) continue
        if (this.getBlock(x, h + 1, z) !== B.AIR) continue
        if (this.getBlock(x, h + 1, z) === B.WATER) continue
        const r = rng()
        if (r < 0.10) this.setRaw(x, h + 1, z, B.TALLGRASS)
        else if (r < 0.118) this.setRaw(x, h + 1, z, rng() > 0.5 ? B.FLOWER_R : B.FLOWER_Y)
      }
    }
  }

  buildCampfire(x, z) {
    const h = this.surfaceHeight(x, z)
    const g = new THREE.Group()
    g.position.set(x + 0.5, h + 1.02, z + 0.5)
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x6b6d70 })
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22), stoneMat)
      s.position.set(Math.cos(a) * 0.72, 0, Math.sin(a) * 0.72)
      s.rotation.set(i, i * 1.7, 0)
      g.add(s)
    }
    const logMat = new THREE.MeshLambertMaterial({ color: 0x4b341d })
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.05, 5), logMat)
      log.rotation.z = Math.PI / 2
      log.rotation.y = i / 4 * Math.PI
      log.position.y = 0.13
      g.add(log)
    }
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffd76a, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.62, 6, 1, true), flameMat)
    flame.position.y = 0.38
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.4, 5, 1, true), innerMat)
    inner.position.y = 0.31
    g.add(flame, inner)
    const light = new THREE.PointLight(0xff8a3c, 9, 13, 1.7)
    light.position.y = 1.1
    g.add(light)
    this.scene.add(g)
    this.campfires.push({ group: g, flame, inner, light, seed: Math.random() * 10 })
    // log seats flanking the fire (off the road)
    this.setBlock(84.9, h + 1, 70.4, B.LOG, false)
    this.setBlock(84.7, h + 1, 66.8, B.LOG, false)
    this.buildTorch(78.1, h + 1.12, 66.6)
    this.buildTorch(83.4, h + 1.12, 66.6)
    this.buildTorch(76.6, 31.12, 62.4)
  }

  buildTorch(x, y, z) {
    const g = new THREE.Group()
    g.position.set(x, y, z)
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.62, 5), new THREE.MeshLambertMaterial({ color: 0x6b4a2a }))
    stick.position.y = 0.18
    stick.rotation.z = 0.18
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.15, 6), new THREE.MeshLambertMaterial({ color: 0x2b2420 }))
    cap.position.set(-0.05, 0.5, 0)
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.28, 5), new THREE.MeshBasicMaterial({ color: 0xffa53c, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }))
    flame.position.set(-0.05, 0.68, 0)
    const light = new THREE.PointLight(0xff9b45, 6, 11, 1.8)
    light.position.set(-0.05, 0.7, 0)
    g.add(stick, cap, flame, light)
    this.scene.add(g)
    this.campfires.push({ group: g, flame, inner: flame, light, seed: Math.random() * 10, torch: true })
  }

  surfaceHeight(x, z) {
    x = Math.floor(x); z = Math.floor(z)
    if (x < 0 || z < 0 || x >= WORLD_SIZE || z >= WORLD_SIZE) return 0
    for (let y = HEIGHT - 1; y >= 0; y--) {
      const b = this.getBlock(x, y, z)
      if (b !== B.AIR && !blockDef(b).water && !blockDef(b).plant) return y
    }
    return 0
  }

  // ---- meshing ----
  rebuildAll() {
    for (const ch of this.chunks.values()) this.buildChunk(ch)
    this.dirty.clear()
  }

  flushDirty(max = 3) {
    let n = 0
    for (const key of this.dirty) {
      const ch = this.chunks.get(key)
      if (ch) this.buildChunk(ch)
      this.dirty.delete(key)
      if (++n >= max) break
    }
  }

  buildChunk(ch) {
    const positions = [], normals = [], uvs = [], colors = []
    const tPos = [], tNor = [], tUv = [], tCol = []
    const pPos = [], pNor = [], pUv = [], pCol = []
    const ox = ch.cx * CHUNK, oz = ch.cz * CHUNK
    const tileUV = {}
    const UV = (tile) => tileUV[tile] || (tileUV[tile] = atlasUV(tile))
    const solidAt = (x, y, z) => isOpaque(this.getBlock(x, y, z))
    const pushQuad = (arr, idx, x, y, z, dir, def, shadeExtra = 1) => {
      const { positions, normals, uvs, colors } = arr
      const uv = UV(def.tile !== undefined ? def.tile : def.tiles[dir.tile])
      const cornerUV = [[uv.u0, uv.v0], [uv.u1, uv.v0], [uv.u1, uv.v1], [uv.u0, uv.v1]]
      const tris = [0, 1, 2, 0, 2, 3]
      const verts = []
      for (let i = 0; i < 4; i++) {
        const c = dir.c[i]
        const px = x + c[0], py = y + c[1], pz = z + c[2]
        verts.push([px, py, pz, c])
      }
      // ambient occlusion per corner
      const ao = []
      for (let i = 0; i < 4; i++) {
        const c = verts[i][3]
        let s1 = 0, s2 = 0, sc = 0
        // tangent axes are the two axes not normal
        const axes = [0, 1, 2].filter(a => dir.n[a] === 0)
        const t1 = axes[0], t2 = axes[1]
        const d1 = c[t1] * 2 - 1, d2 = c[t2] * 2 - 1
        const o1 = [0, 0, 0]; o1[t1] = d1
        const o2 = [0, 0, 0]; o2[t2] = d2
        const base = [x + dir.n[0], y + dir.n[1], z + dir.n[2]]
        s1 = solidAt(base[0] + o1[0], base[1] + o1[1], base[2] + o1[2]) ? 1 : 0
        s2 = solidAt(base[0] + o2[0], base[1] + o2[1], base[2] + o2[2]) ? 1 : 0
        sc = solidAt(base[0] + o1[0] + o2[0], base[1] + o1[1] + o2[1], base[2] + o1[2] + o2[2]) ? 1 : 0
        let v = 3
        if (s1 && s2) v = 0
        else v = 3 - (s1 + s2 + sc)
        ao.push(AO_CURVE[Math.max(0, v)])
      }
      const tint = 0.95 + hash2(x, z, this.seed + y) * 0.1
      for (const t of tris) {
        const p = verts[t]
        positions.push(p[0], p[1], p[2])
        normals.push(dir.n[0], dir.n[1], dir.n[2])
        uvs.push(cornerUV[t][0], cornerUV[t][1])
        const l = Math.min(1.25, dir.shade * ao[t] * tint * shadeExtra)
        colors.push(l, l, l)
      }
    }
    const AOArr = { positions, normals, uvs, colors }
    const TArr = { positions: tPos, normals: tNor, uvs: tUv, colors: tCol }
    const PArr = { positions: pPos, normals: pNor, uvs: pUv, colors: pCol }

    for (let y = 0; y < HEIGHT; y++) {
      for (let z = 0; z < CHUNK; z++) {
        for (let x = 0; x < CHUNK; x++) {
          const id = ch.data[(y << 8) | (z << 4) | x]
          if (id === B.AIR) continue
          const def = BLOCKS[id]
          if (!def) continue
          const wx = ox + x, wz = oz + z
          if (def.plant) {
            const uv = UV(def.plant)
            const h = hash2(wx, wz, 7) * 0.15
            const quads = [
              [[0.12, 0, 0.5], [0.88, 0, 0.5], [0.88, 1, 0.5], [0.12, 1, 0.5]],
              [[0.5, 0, 0.12], [0.5, 0, 0.88], [0.5, 1, 0.88], [0.5, 1, 0.12]],
            ]
            for (const q of quads) {
              for (const t of [0, 1, 2, 0, 2, 3]) {
                const c = q[t]
                pPos.push(wx + c[0], y + c[1] + h, wz + c[2])
                pNor.push(0, 1, 0)
                pUv.push(t === 1 || t === 2 ? uv.u1 : uv.u0, (t >= 2) ? uv.v1 : uv.v0)
                pCol.push(0.95, 0.95, 0.95)
              }
            }
            continue
          }
          const arr = (def.water || def.glass) ? TArr : AOArr
          const uv = UV
          const terrainTop = this.baseHeight[wz * WORLD_SIZE + wx] || 30
          const underground = y < terrainTop - 2
          const shadeExtra = underground ? Math.max(0.34, 1 - (terrainTop - y) * 0.05) : 1
          for (const dir of DIRS) {
            const nx = wx + dir.n[0], ny = y + dir.n[1], nz = wz + dir.n[2]
            const nid = this.getBlock(nx, ny, nz)
            const ndef = blockDef(nid)
            if (dir.n[1] === 1 && y === HEIGHT - 1) continue
            if (def.water) {
              if (nid === B.WATER) continue
              if (ndef.solid && !ndef.transparent) continue
            } else if (def.glass) {
              if (nid === B.GLASS) continue
              if (ndef.solid && !ndef.transparent) continue
            } else {
              if (nid !== B.AIR && (ndef.solid || ndef.plant)) continue
            }
            pushQuad(arr, 0, wx, y, wz, dir, def, shadeExtra)
          }
        }
      }
    }

    this.applyMesh(ch, 'mesh', AOArr, this.opaqueMat)
    this.applyMesh(ch, 'tmesh', TArr, this.waterMat)
    this.applyMesh(ch, 'pmesh', PArr, this.plantMat)
    if (ch.mesh) { ch.mesh.castShadow = true; ch.mesh.receiveShadow = true }
  }

  applyMesh(ch, field, arr, material) {
    let mesh = ch[field]
    if (!arr.positions.length) {
      if (mesh) { this.group.remove(mesh); mesh.geometry.dispose(); ch[field] = null }
      return
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(arr.positions, 3))
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(arr.normals, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(arr.uvs, 2))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(arr.colors, 3))
    geo.computeBoundingSphere()
    if (mesh) {
      mesh.geometry.dispose()
      mesh.geometry = geo
    } else {
      mesh = new THREE.Mesh(geo, material)
      mesh.name = 'chunk-' + field
      mesh.matrixAutoUpdate = false
      this.group.add(mesh)
      ch[field] = mesh
    }
  }

  // Voxel DDA raycast. Returns solid hit or null.
  raycast(origin, dir, maxDist = 6) {
    let x = Math.floor(origin.x), y = Math.floor(origin.y), z = Math.floor(origin.z)
    const stepX = dir.x > 0 ? 1 : -1, stepY = dir.y > 0 ? 1 : -1, stepZ = dir.z > 0 ? 1 : -1
    const tDeltaX = Math.abs(1 / (dir.x || 1e-9)), tDeltaY = Math.abs(1 / (dir.y || 1e-9)), tDeltaZ = Math.abs(1 / (dir.z || 1e-9))
    const frac = (v) => v - Math.floor(v)
    let tMaxX = ((dir.x > 0 ? 1 - frac(origin.x) : frac(origin.x)) || 1e-9) * tDeltaX
    let tMaxY = ((dir.y > 0 ? 1 - frac(origin.y) : frac(origin.y)) || 1e-9) * tDeltaY
    let tMaxZ = ((dir.z > 0 ? 1 - frac(origin.z) : frac(origin.z)) || 1e-9) * tDeltaZ
    let normal = [0, 0, 0]
    let t = 0
    for (let i = 0; i < 200 && t <= maxDist; i++) {
      const id = this.getBlock(x, y, z)
      const def = blockDef(id)
      if (def.solid) return { x, y, z, id, normal, dist: t, point: new THREE.Vector3(origin.x + dir.x * t, origin.y + dir.y * t, origin.z + dir.z * t) }
      if (tMaxX < tMaxY && tMaxX < tMaxZ) {
        x += stepX; t = tMaxX; tMaxX += tDeltaX; normal = [-stepX, 0, 0]
      } else if (tMaxY < tMaxZ) {
        y += stepY; t = tMaxY; tMaxY += tDeltaY; normal = [0, -stepY, 0]
      } else {
        z += stepZ; t = tMaxZ; tMaxZ += tDeltaZ; normal = [0, 0, -stepZ]
      }
    }
    return null
  }

  // Collision: gathers solid voxels overlapping an AABB.
  collide(pos, size, velocity) {
    const half = size.x / 2
    const minX = Math.floor(pos.x - half), maxX = Math.floor(pos.x + half)
    const minY = Math.floor(pos.y), maxY = Math.floor(pos.y + size.y)
    const minZ = Math.floor(pos.z - half), maxZ = Math.floor(pos.z + half)
    let grounded = false
    let hitX = false, hitZ = false
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          if (!isSolid(this.getBlock(x, y, z))) continue
          if (velocity.y === 0) continue
        }
      }
    }
    return { grounded, hitX, hitZ }
  }

  isWaterAt(x, y, z) { return this.getBlock(x, y, z) === B.WATER }

  serializeEdits() {
    return Array.from(this.edits.entries())
  }

  loadEdits(list) {
    for (const [k, id] of list) {
      const [x, y, z] = k.split(',').map(Number)
      this.edits.set(k, id)
      this.setRaw(x, y, z, id)
    }
    for (const ch of this.chunks.values()) this.dirty.add(this.key(ch.cx, ch.cz))
    this.flushDirty(999)
  }

  update(dt, t) {
    for (const c of this.campfires) {
      const n = Math.sin(t * 9 + c.seed) * 0.5 + Math.sin(t * 21 + c.seed * 2) * 0.3
      c.flame.scale.set(1 + n * 0.12, 1 + n * 0.18, 1 + n * 0.12)
      c.inner.scale.setScalar(1 + n * 0.2)
      c.light.intensity = 12 + n * 4
      c.flame.rotation.y = t * 0.7
    }
  }
}
