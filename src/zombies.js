import * as THREE from 'three'
import { B, blockDef } from './blocks.js'

const SKINS = [0x7c9460, 0x8a9a6b, 0x718558, 0x94a177, 0x6c7f58]
const SHIRTS = [0x546b7d, 0x7a4b42, 0x5b5f47, 0x6b5c3c, 0x4f5560, 0x7d6b57]
const PANTS = [0x3d434f, 0x454036, 0x35404a, 0x4b4038]

let zid = 1

export class Zombie {
  constructor(scene, world, player, x, z, opts = {}) {
    this.id = zid++
    this.scene = scene
    this.world = world
    this.player = player
    this.type = opts.type || 'walker'
    this.day = opts.day || 1
    this.horde = !!opts.horde
    this.scale = this.type === 'brute' ? 1.26 : (this.type === 'runner' ? 0.94 : 1)
    this.height = 1.8 * this.scale
    this.half = 0.31 * this.scale
    this.maxHealth = Math.round((this.type === 'brute' ? 190 : this.type === 'runner' ? 55 : 80) * (1 + (this.day - 1) * 0.075))
    this.health = this.maxHealth
    this.speed = this.type === 'runner' ? 3.5 : this.type === 'brute' ? 1.9 : 2.05
    this.damage = this.type === 'brute' ? 17 : this.type === 'runner' ? 7 : 10
    this.pos = new THREE.Vector3(x, world.surfaceHeight(x, z) + 1.01, z)
    this.vy = 0
    this.dead = false
    this.deadTime = 0
    this.attackCd = 0
    this.growlCd = 1 + Math.random() * 5
    this.digCount = 0
    this.digKey = ''
    this.digCd = 0
    this.walkPhase = Math.random() * 8
    this.flash = 0
    this.hitTimer = 0
    this.stuck = 0
    this.aggro = true
    this.lunge = 0
    this.buildModel()
  }

  buildModel() {
    const scale = this.scale
    const skin = new THREE.MeshLambertMaterial({ color: SKINS[this.id % SKINS.length], flatShading: true })
    const shirt = new THREE.MeshLambertMaterial({ color: SHIRTS[(this.id * 3) % SHIRTS.length], flatShading: true })
    const pants = new THREE.MeshLambertMaterial({ color: PANTS[(this.id * 2) % PANTS.length], flatShading: true })
    this.materials = [skin, shirt, pants]
    const g = new THREE.Group()
    g.scale.setScalar(scale)
    const add = (geo, mat, x, y, z, parent = g) => {
      const m = new THREE.Mesh(geo, mat)
      m.position.set(x, y, z)
      m.castShadow = true
      parent.add(m)
      return m
    }
    this.torso = add(new THREE.BoxGeometry(0.6, 0.68, 0.32), shirt, 0, 1.13, 0)
    // torn shirt edge
    const tear = add(new THREE.BoxGeometry(0.62, 0.16, 0.33), pants, 0, 0.86, 0)
    tear.scale.set(1, 1, 1)
    this.head = add(new THREE.BoxGeometry(0.34, 0.34, 0.32), skin, 0, 1.63, 0)
    const jaw = add(new THREE.BoxGeometry(0.2, 0.08, 0.06), new THREE.MeshLambertMaterial({ color: 0x3d2a26 }), 0, 1.52, 0.17)
    this.jaw = jaw
    // glowing eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: this.type === 'brute' ? 0xff3a1e : this.type === 'runner' ? 0xffc23a : 0xff7c2a })
    const eyeGeo = new THREE.BoxGeometry(0.075, 0.055, 0.02)
    add(eyeGeo, eyeMat, -0.085, 1.67, 0.165)
    add(eyeGeo, eyeMat, 0.085, 1.67, 0.165)
    this.eyeMat = eyeMat
    // hair patch
    add(new THREE.BoxGeometry(0.35, 0.09, 0.33), new THREE.MeshLambertMaterial({ color: 0x2b2620 }), 0, 1.8, 0)

    this.armL = new THREE.Group()
    this.armL.position.set(-0.36, 1.43, 0)
    add(new THREE.BoxGeometry(0.15, 0.58, 0.16), skin, 0, -0.28, 0, this.armL)
    add(new THREE.BoxGeometry(0.16, 0.2, 0.17), shirt, 0, -0.06, 0, this.armL)
    this.armR = new THREE.Group()
    this.armR.position.set(0.36, 1.43, 0)
    add(new THREE.BoxGeometry(0.15, 0.58, 0.16), skin, 0, -0.28, 0, this.armR)
    add(new THREE.BoxGeometry(0.16, 0.2, 0.17), shirt, 0, -0.06, 0, this.armR)

    this.legL = new THREE.Group()
    this.legL.position.set(-0.16, 0.78, 0)
    add(new THREE.BoxGeometry(0.2, 0.76, 0.22), pants, 0, -0.38, 0, this.legL)
    add(new THREE.BoxGeometry(0.21, 0.1, 0.3), new THREE.MeshLambertMaterial({ color: 0x2a2622 }), 0, -0.76, 0.04, this.legL)
    this.legR = new THREE.Group()
    this.legR.position.set(0.16, 0.78, 0)
    add(new THREE.BoxGeometry(0.2, 0.76, 0.22), pants, 0, -0.38, 0, this.legR)
    add(new THREE.BoxGeometry(0.21, 0.1, 0.3), new THREE.MeshLambertMaterial({ color: 0x2a2622 }), 0, -0.76, 0.04, this.legR)

    g.add(this.armL, this.armR, this.legL, this.legR)
    g.position.copy(this.pos)
    g.rotation.y = Math.atan2(this.player.pos.x - x, this.player.pos.z - z)
    this.group = g
    this.scene.add(g)
  }

  collidesAt(x, y, z, h = this.height, half = this.half) {
    for (let bx = Math.floor(x - half + 0.01); bx <= Math.floor(x + half - 0.01); bx++) {
      for (let by = Math.floor(y + 0.02); by <= Math.floor(y + h - 0.02); by++) {
        for (let bz = Math.floor(z - half + 0.01); bz <= Math.floor(z + half - 0.01); bz++) {
          if (blockDef(this.world.getBlock(bx, by, bz)).solid) return true
        }
      }
    }
    return false
  }

  groundAt(x, z, fromY) {
    const ix = Math.floor(x), iz = Math.floor(z)
    let y = Math.min(63, Math.floor(fromY + 1.1))
    while (y > 0) {
      if (blockDef(this.world.getBlock(ix, y, iz)).solid) return y + 1
      y--
      if (fromY - y > 14) break
    }
    return 1
  }

  tryMove(dx, dz) {
    const p = this.pos
    if (!this.collidesAt(p.x + dx, p.y, p.z + dz)) {
      p.x += dx; p.z += dz
      return true
    }
    // climb one block
    if (!this.collidesAt(p.x + dx, p.y + 1.02, p.z + dz)) {
      p.y += 1.02
      p.x += dx; p.z += dz
      return true
    }
    // half-step up slopes
    if (!this.collidesAt(p.x + dx, p.y + 0.3, p.z + dz)) {
      p.y += 0.3
      return false
    }
    return false
  }

  blockInFront() {
    const dx = this.player.pos.x - this.pos.x
    const dz = this.player.pos.z - this.pos.z
    const len = Math.hypot(dx, dz) || 1
    const nx = dx / len, nz = dz / len
    const px = this.pos.x + nx * (this.half + 0.35)
    const pz = this.pos.z + nz * (this.half + 0.35)
    const candidates = [
      [px, Math.floor(this.pos.y + 1.35), pz],
      [px, Math.floor(this.pos.y + 2.25), pz],
      [px, Math.floor(this.pos.y + 0.4), pz],
    ]
    for (const [x, y, z] of candidates) {
      const id = this.world.getBlock(x, y, z)
      const def = blockDef(id)
      if (def.solid && id !== B.BEDROCK) return { x: Math.floor(x), y, z: Math.floor(z), id }
    }
    return null
  }

  update(dt, t, active) {
    if (this.dead) {
      this.deadTime += dt
      const fall = Math.min(1, this.deadTime * 3.4)
      this.group.rotation.x = -fall * Math.PI / 2.1
      this.group.position.y = this.pos.y + 0.1 - Math.max(0, this.deadTime - 1.2) * 0.35
      if (this.deadTime > 3) this.group.visible = false
      for (const m of this.materials) m.opacity = 1
      return
    }
    if (!active) return
    const p = this.player
    const dx = p.pos.x - this.pos.x, dz = p.pos.z - this.pos.z
    const dist = Math.hypot(dx, dz)
    const dy = p.pos.y - this.pos.y
    this.flash = Math.max(0, this.flash - dt * 4)
    const hit = this.flash > 0 ? 0.75 : 0
    for (const m of this.materials) m.emissive.setRGB(hit * 0.7, hit * 0.08, hit * 0.02)
    this.eyeMat.color.setHex(this.flash > 0 ? 0xffffff : this.type === 'brute' ? 0xff3a1e : this.type === 'runner' ? 0xffc23a : 0xff7c2a)

    this.attackCd = Math.max(0, this.attackCd - dt)
    this.lunge = Math.max(0, this.lunge - dt * 4)
    this.growlCd -= dt
    if (this.growlCd <= 0) {
      this.growlCd = 4 + Math.random() * 9
      if (dist < 26) this.onGrowl?.(this)
    }

    let mx = 0, mz = 0
    if (dist > 0.9 && dist < 70) {
      mx = dx / dist
      mz = dz / dist
      // simple separation so they don't stack
      for (const other of this.neighbors || []) {
        if (other === this || other.dead) continue
        const ox = this.pos.x - other.pos.x, oz = this.pos.z - other.pos.z
        const od = Math.hypot(ox, oz)
        if (od < 1.0 && od > 0.001) {
          mx += (ox / od) * 0.6
          mz += (oz / od) * 0.6
        }
      }
      const ml = Math.hypot(mx, mz)
      mx /= ml; mz /= ml
    }

    const speed = (this.horde ? 1.08 : 1) * this.speed * (this.lunge > 0 ? 1.6 : 1)
    let moved = false
    if (dist < 70) {
      moved = this.tryMove(mx * speed * dt, mz * speed * dt)
      if (moved) {
        this.walkPhase += dt * speed * 3.1
        this.stuck = Math.max(0, this.stuck - dt * 2)
      } else {
        this.stuck += dt
      }
    }

    // Ground snapping / falling
    if (!this.collidesAt(this.pos.x, this.pos.y + 0.02, this.pos.z)) {
      const g = this.groundAt(this.pos.x, this.pos.z, this.pos.y)
      if (this.pos.y > g) {
        this.vy -= 24 * dt
        this.pos.y += this.vy * dt
        if (this.pos.y < g) { this.pos.y = g; this.vy = 0 }
      } else {
        this.pos.y = g
        this.vy = 0
      }
    } else {
      this.vy = 0
    }

    // Face player
    const targetRot = Math.atan2(dx, dz)
    let diff = targetRot - this.group.rotation.y
    while (diff > Math.PI) diff -= Math.PI * 2
    while (diff < -Math.PI) diff += Math.PI * 2
    this.group.rotation.y += diff * Math.min(1, dt * 6)

    const swing = Math.sin(this.walkPhase) * 0.7
    this.legL.rotation.x = swing
    this.legR.rotation.x = -swing
    const armBase = this.type === 'runner' ? -0.5 : -1.25
    this.armL.rotation.x = armBase + Math.sin(this.walkPhase * 0.5) * 0.12 + this.lunge * 0.7
    this.armR.rotation.x = armBase - Math.sin(this.walkPhase * 0.5) * 0.12 + this.lunge * 0.7
    this.armL.rotation.z = -0.12
    this.armR.rotation.z = 0.12
    this.torso.rotation.z = Math.sin(this.walkPhase) * 0.05
    this.head.rotation.z = Math.sin(this.walkPhase * 0.7) * 0.09
    this.group.position.copy(this.pos)
    this.group.position.y += Math.abs(Math.sin(this.walkPhase)) * 0.03

    // Attack
    if (dist < (this.type === 'brute' ? 2.3 : 1.85) && Math.abs(dy) < 2.1 && this.attackCd <= 0 && !p.dead) {
      this.attackCd = this.type === 'brute' ? 1.5 : 1.05
      this.lunge = 1
      this.onAttack?.(this)
    }

    // Break through walls when stuck or blocked
    this.digCd -= dt
    if (dist < 14 && this.stuck > 0.45 && this.digCd <= 0) {
      const b = this.blockInFront()
      if (b) {
        this.digCd = 0.55
        const key = `${b.x},${b.y},${b.z}`
        if (key === this.digKey) this.digCount++
        else { this.digKey = key; this.digCount = 1 }
        this.lunge = 0.7
        this.onDig?.(this, b, this.digCount)
        const def = blockDef(b.id)
        const need = def.hp > 60 ? 7 : def.hp > 35 ? 5 : 3
        if (this.digCount >= need) {
          this.world.setBlock(b.x, b.y, b.z, B.AIR)
          this.onBreak?.(this, b)
          this.digCount = 0
          this.digKey = ''
          this.stuck = 0
        }
      }
    }
    if (dist > 88 || p.dead) {
      this.remove()
    }
  }

  damage(amount, opts = {}) {
    if (this.dead) return false
    this.health -= amount
    this.flash = 1
    this.lunge = 1
    this.aggro = true
    if (opts.knockback) {
      const kb = opts.knockback
      const dx = this.pos.x - opts.from.x, dz = this.pos.z - opts.from.z
      const l = Math.hypot(dx, dz) || 1
      this.pos.x += (dx / l) * kb
      this.pos.z += (dz / l) * kb
    }
    if (this.health <= 0) {
      this.dead = true
      this.deadTime = 0
      this.onDeath?.(this, opts)
      return true
    }
    return false
  }

  remove() {
    if (this.group.parent) this.group.parent.remove(this.group)
    this.group.traverse(o => {
      if (o.geometry) o.geometry.dispose()
    })
    this.removed = true
  }
}

export class ZombieManager {
  constructor(game) {
    this.game = game
    this.list = []
    this.cap = 24
    this.hordeActive = false
    this.hordeWave = 0
    this.hordeTimer = 0
    this.ambientTimer = 4
    this.totalKills = 0
  }

  get aliveCount() { return this.list.filter(z => !z.dead && !z.removed).length }

  spawnAt(x, z, type = 'walker', horde = false) {
    const { scene, world, player } = this.game
    const t = world.surfaceHeight(x, z)
    if (t <= 1) return null
    if (blockDef(world.getBlock(x, t, z)).water) return null
    if (world.getBlock(x, t + 1, z) !== B.AIR) return null
    const z1 = new Zombie(scene, world, player, x, z, { type, day: this.game.day, horde })
    z1.onAttack = (zb) => this.game.zombieAttack(zb)
    z1.onGrowl = (zb) => this.game.audio.zombieGrowl(zb.pos, zb.type)
    z1.onDeath = (zb, opts) => this.game.zombieKilled(zb, opts)
    z1.onDig = (zb, b, count) => this.game.fx.digDust(b, count)
    z1.onBreak = (zb, b) => this.game.fx.blockBurst(b.x, b.y, b.z, b.id)
    this.list.push(z1)
    return z1
  }

  spawnAway(type, horde, minDist = 26, maxDist = 46, attempts = 14) {
    const p = this.game.player.pos
    for (let i = 0; i < attempts; i++) {
      const a = Math.random() * Math.PI * 2
      const d = minDist + Math.random() * (maxDist - minDist)
      const x = Math.floor(p.x + Math.cos(a) * d)
      const z = Math.floor(p.z + Math.sin(a) * d)
      if (x < 4 || z < 4 || x > 155 || z > 155) continue
      const z1 = this.spawnAt(x, z, type, horde)
      if (z1) return z1
    }
    return null
  }

  startHorde(day) {
    this.hordeActive = true
    this.hordeWave = 0
    this.hordeTimer = 2
    this.cap = 28
    this.game.audio.hordeHorn()
  }

  endHorde() {
    this.hordeActive = false
    for (const z of this.list) {
      if (!z.dead) z.burn = true
    }
  }

  pickType() {
    const day = this.game.day
    const r = Math.random()
    if (this.hordeActive) {
      if (day >= 5 && r < 0.16) return 'brute'
      if (r < 0.5) return 'runner'
      return 'walker'
    }
    if (day >= 3 && r < 0.28) return 'runner'
    if (day >= 6 && r < 0.07) return 'brute'
    return 'walker'
  }

  update(dt, t, night) {
    const game = this.game
    const alive = this.list.filter(z => !z.dead && !z.removed)
    for (const z of this.list) {
      if (z.removed) continue
      const near = []
      for (const o of alive) {
        if (o === z) continue
        if (Math.abs(o.pos.x - z.pos.x) < 1.8 && Math.abs(o.pos.z - z.pos.z) < 1.8) near.push(o)
      }
      z.neighbors = near
      z.update(dt, t, !game.paused)
      if (z.dead && z.deadTime > 3.4) z.remove()
      if (z.burn && !z.dead) {
        z.health -= dt * 30
        z.flash = 0.65
        if (z.health <= 0) z.damage(z.health + 5)
      }
    }
    this.list = this.list.filter(z => !z.removed)

    if (game.paused) return
    if (this.hordeActive) {
      this.hordeTimer -= dt
      if (this.hordeTimer <= 0 && this.aliveCount < this.cap) {
        this.hordeTimer = Math.max(1.1, 3.4 - this.hordeWave * 0.05)
        const group = 1 + Math.floor(Math.random() * Math.min(4, 1 + this.hordeWave * 0.25))
        for (let i = 0; i < group; i++) this.spawnAway(this.pickType(), true, 24, 44)
        this.hordeWave++
        if (this.hordeWave === 1) game.onHordeAnnounce?.()
      }
    } else if (night) {
      this.ambientTimer -= dt
      if (this.ambientTimer <= 0) {
        this.ambientTimer = Math.max(4, 13 - game.day)
        if (this.aliveCount < Math.min(18, 8 + game.day * 2)) {
          this.spawnAway(this.pickType(), false, 30, 52)
          if (Math.random() < 0.25) this.spawnAway(this.pickType(), false, 30, 52)
        }
      }
    }
  }

  clearAll() {
    for (const z of this.list) z.remove()
    this.list = []
    this.hordeActive = false
    this.cap = 24
  }
}

function onHitSound() {}
