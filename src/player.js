import * as THREE from 'three'
import { B, blockDef } from './blocks.js'

const EYE = 1.62
const HEIGHT = 1.8
const HALF = 0.34

export class Player {
  constructor(camera, world) {
    this.camera = camera
    this.world = world
    this.pos = new THREE.Vector3(world.SPAWN.x, world.SPAWN.y, world.SPAWN.z)
    this.vel = new THREE.Vector3()
    this.yaw = -0.12
    this.pitch = -0.06
    this.onGround = false
    this.inWater = false
    this.headInWater = false
    this.health = 100
    this.maxHealth = 100
    this.stamina = 100
    this.maxStamina = 100
    this.hunger = 100
    this.thirst = 100
    this.level = 1
    this.xp = 0
    this.xpNext = 100
    this.fallStart = null
    this.bob = 0
    this.shake = 0
    this.fov = 75
    this.dead = false
    this.swing = 0
    this.swingSpeed = 1
    this.recoil = 0
    this.viewGroup = new THREE.Group()
    this.camera.add(this.viewGroup)
    this.held = new Map()
    this.currentItem = 'axe'
    this.buildBlock = 'planks'
    this.buildMaterials = { planks: 'planks_block', cobble: 'cobble_block' }
    this.heldModels = {}
    this.buildModels = {}
    this.muzzle = null
    this.buildHeldModels()
    this.selectItem('axe')
    this.syncCamera(0)
  }

  // ---------- view model ----------
  buildHeldModels() {
    const mat = (color, rough = 1) => new THREE.MeshLambertMaterial({ color, flatShading: true })
    const wood = mat(0x8a6236)
    const woodDark = mat(0x5c3f22)
    const stone = mat(0x8d9094)
    const iron = mat(0x9aa4ab)
    const dark = mat(0x30353a)
    const grip = mat(0x2a2320)

    const axe = new THREE.Group()
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 0.05), wood)
    handle.position.set(0, 0.02, 0)
    handle.rotation.z = -0.18
    const axeShape = new THREE.Shape()
    axeShape.moveTo(-0.03, -0.085)
    axeShape.lineTo(0.15, -0.155)
    axeShape.lineTo(0.24, -0.03)
    axeShape.lineTo(0.24, 0.03)
    axeShape.lineTo(0.15, 0.155)
    axeShape.lineTo(-0.03, 0.085)
    axeShape.closePath()
    const bladeGeo = new THREE.ExtrudeGeometry(axeShape, { depth: 0.065, bevelEnabled: false })
    bladeGeo.translate(0, 0, -0.0325)
    const head = new THREE.Mesh(bladeGeo, stone)
    head.position.set(0.045, 0.35, 0)
    head.rotation.z = -0.18
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.28, 0.075), iron)
    edge.position.set(0.275, 0.39, 0)
    edge.rotation.z = -0.18
    const bind = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.055, 0.08), woodDark)
    bind.position.set(0.015, 0.30, 0)
    axe.add(handle, head, edge, bind)

    const pick = new THREE.Group()
    const ph = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.84, 0.05), wood)
    ph.position.y = 0.02
    ph.rotation.z = -0.18
    const phead = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.06, 0.06), stone)
    phead.position.set(0.02, 0.37, 0)
    phead.rotation.z = -0.18
    phead.rotation.y = 0.1
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.16, 4), iron)
    spike.rotation.z = -Math.PI / 2
    spike.position.set(0.26, 0.32, 0)
    const spike2 = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.14, 4), iron)
    spike2.rotation.z = Math.PI / 2
    spike2.position.set(-0.21, 0.41, 0)
    pick.add(ph, phead, spike, spike2)

    const pistol = new THREE.Group()
    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.13, 0.42), dark)
    slide.position.set(0, 0.13, -0.1)
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.3, 8), iron)
    barrel.rotation.x = Math.PI / 2
    barrel.position.set(0, 0.15, -0.28)
    const handgrip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.13), grip)
    handgrip.position.set(0, 0.0, 0.03)
    handgrip.rotation.x = -0.22
    const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.07, 0.05), iron)
    trigger.position.set(0, 0.03, -0.05)
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.035, 0.05), iron)
    sight.position.set(0, 0.205, 0.05)
    pistol.add(slide, barrel, handgrip, trigger, sight)

    const food = new THREE.Group()
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.24, 12), mat(0xb34a35))
    can.rotation.z = 0.2
    const label = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.112, 0.12, 12), mat(0xd8c39b))
    label.rotation.z = 0.2
    can.add(label)
    food.add(can)
    const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.3), iron)
    spoon.position.set(0.09, 0.13, 0)
    spoon.rotation.z = 0.3
    food.add(spoon)

    const water = new THREE.Group()
    const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.34, 10), new THREE.MeshLambertMaterial({ color: 0x7fc4d8, transparent: true, opacity: 0.75 }))
    bottle.rotation.z = 0.18
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.07, 8), mat(0x2f6f8a))
    cap.position.y = 0.2
    cap.rotation.z = 0.18
    water.add(bottle, cap)

    const bandage = new THREE.Group()
    const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.16, 12), mat(0xe8e0cf))
    roll.rotation.z = Math.PI / 2
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.012, 0.3), mat(0xf2ecdd))
    strip.position.set(0.02, -0.06, 0.12)
    bandage.add(roll, strip)

    const blockGroup = (color) => {
      const g = new THREE.Group()
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.26), new THREE.MeshLambertMaterial({ color, flatShading: true }))
      cube.rotation.set(0.35, 0.6, 0.1)
      const line = new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry), new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 }))
      line.rotation.copy(cube.rotation)
      g.add(cube, line)
      return g
    }

    this.heldModels = { axe, pick, pistol, food, water, bandage }
    this.buildModels = { planks: blockGroup(0xa37d4c), cobble: blockGroup(0x7b7e82) }
    this.viewRig = new THREE.Group()
    this.viewRig.position.set(0.37, -0.40, -0.72)
    this.viewRig.scale.setScalar(0.55)
    this.viewGroup.add(this.viewRig)
    this.modelBase = {
      axe: [0.02, 0.10, 0], pick: [0.02, 0.10, 0], pistol: [0.02, 0.20, 0],
      food: [0.02, 0.17, 0], water: [0.02, 0.16, 0], bandage: [0.02, 0.19, 0],
      planks: [0.02, 0.16, 0], cobble: [0.02, 0.16, 0],
    }
    for (const m of [...Object.values(this.heldModels), ...Object.values(this.buildModels)]) {
      m.visible = false
      m.position.set(0, 0, 0)
      this.viewRig.add(m)
    }
    // Arm/hand under the item for a first-person feel.
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.5), mat(0xb98a63))
    arm.position.set(0.02, -0.42, 0.22)
    arm.rotation.set(0.42, 0.1, 0.34)
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.26), mat(0x4d5a45))
    sleeve.position.set(-0.04, -0.53, 0.4)
    sleeve.rotation.set(0.42, 0.1, 0.34)
    this.viewRig.add(arm, sleeve)

    const light = new THREE.PointLight(0xffc46b, 0, 7, 2)
    light.position.set(0., 0.05, -0.35)
    this.viewGroup.add(light)
    this.muzzle = light
  }

  selectItem(item) {
    this.currentItem = item
    for (const [k, m] of Object.entries(this.heldModels)) m.visible = k === item
    for (const [k, m] of Object.entries(this.buildModels)) m.visible = item === 'block' && k === this.buildBlock
    this.swing = 0
  }

  selectBuildBlock(block) {
    this.buildBlock = block
    if (this.currentItem === 'block') this.selectItem('block')
  }

  getHeldModel() {
    if (this.currentItem === 'block') return this.buildModels[this.buildBlock]
    return this.heldModels[this.currentItem]
  }

  startSwing(speed = 1) {
    this.swing = 0.0001
    this.swingSpeed = speed
  }

  syncCamera(dt) {
    const shakeX = (Math.random() - 0.5) * this.shake * 0.03
    const shakeY = (Math.random() - 0.5) * this.shake * 0.03
    if (Math.abs(this.camera.fov - this.fov) > 0.01) {
      this.camera.fov = this.fov
      this.camera.updateProjectionMatrix()
    }
    this.camera.position.set(this.pos.x, this.pos.y + EYE + Math.sin(this.bob * 2) * 0.035, this.pos.z)
    this.camera.rotation.set(0, 0, 0)
    this.camera.rotateY(this.yaw + shakeX)
    this.camera.rotateX(this.pitch + this.recoil + shakeY)
    this.shake = Math.max(0, this.shake - dt * 4)
  }

  update(dt, input, active) {
    if (this.dead) { this.syncCamera(dt); return }
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    let mx = 0, mz = 0
    if (active) {
      if (input.forward) { mx += forward.x; mz += forward.z }
      if (input.back) { mx -= forward.x; mz -= forward.z }
      if (input.left) { mx -= right.x; mz -= right.z }
      if (input.right) { mx += right.x; mz += right.z }
    }
    const moving = mx !== 0 || mz !== 0
    const len = Math.hypot(mx, mz)
    if (len > 0) { mx /= len; mz /= len }

    const feetBlock = this.world.getBlock(this.pos.x, this.pos.y + 0.2, this.pos.z)
    const wasWater = this.inWater
    this.inWater = blockDef(feetBlock).water === true
    this.headInWater = blockDef(this.world.getBlock(this.pos.x, this.pos.y + EYE, this.pos.z)).water === true
    if (this.inWater && !wasWater && this.vel.y < -4) this.vel.y *= 0.35
    this.inWater = this.inWater || blockDef(this.world.getBlock(this.pos.x, this.pos.y + 1.0, this.pos.z)).water === true

    const wantsSprint = input.sprint && moving && this.stamina > 2 && input.forward && !this.inWater
    let speed = this.inWater ? 3.0 : (wantsSprint ? 6.5 : 4.3)
    if (this.currentItem === 'food' || this.currentItem === 'water') speed *= 0.9
    if (input.sprint) {
      if (wantsSprint) this.stamina = Math.max(0, this.stamina - dt * 11)
    }
    if (!input.sprint || !moving) this.stamina = Math.min(this.maxStamina, this.stamina + dt * (this.onGround ? 17 : 6))
    if (this.stamina <= 0) speed = Math.min(speed, 3.7)

    const accel = this.onGround ? 26 : 9
    const targetVX = mx * speed, targetVZ = mz * speed
    this.vel.x += (targetVX - this.vel.x) * Math.min(1, accel * dt)
    this.vel.z += (targetVZ - this.vel.z) * Math.min(1, accel * dt)

    if (this.inWater) {
      this.vel.y -= 6 * dt
      if (this.vel.y < -2.2) this.vel.y = -2.2
      if (input.jump) this.vel.y = 3.2
      if (this.headInWater) this.vel.y = Math.max(this.vel.y, input.jump ? 3.6 : -0.4)
    } else {
      this.vel.y -= 27 * dt
      if (this.vel.y < -32) this.vel.y = -32
      if (input.jump && this.onGround) {
        this.vel.y = 8.7
        this.onGround = false
        this.stamina = Math.max(0, this.stamina - 5)
      }
    }

    // Horizontal movement with step-up.
    const oldY = this.pos.y
    let moved = this.moveAxis('x', this.vel.x * dt)
    if (!moved && this.onGround) { if (this.tryStep(this.vel.x * dt, 0)) moved = true }
    let movedZ = this.moveAxis('z', this.vel.z * dt)
    if (!movedZ && this.onGround) { if (this.tryStep(0, this.vel.z * dt)) movedZ = true }
    if (!moved) this.vel.x *= 0.2
    if (!movedZ) this.vel.z *= 0.2

    // Vertical movement.
    const falling = this.vel.y < 0
    this.pos.y += this.vel.y * dt
    this.onGround = false
    if (this.collidesY()) {
      if (this.vel.y <= 0) {
        this.pos.y = Math.ceil(this.pos.y * 1000) / 1000
        this.resolveYDown()
        this.onGround = true
        if (this.fallStart !== null) {
          const fall = this.fallStart - this.pos.y
          if (fall > 3.4 && !this.inWater) this.onFallDamage?.(fall)
          this.fallStart = null
        }
      } else {
        this.resolveYUp()
      }
      this.vel.y = 0
    }
    if (!this.onGround && this.vel.y < 0 && this.fallStart === null && !this.inWater) this.fallStart = this.pos.y

    // Keep inside world bounds.
    this.pos.x = Math.max(2, Math.min(this.world.SPAWN.x * 2 - 2, this.pos.x))
    this.pos.z = Math.max(2, Math.min(this.world.SPAWN.z * 2 - 2, this.pos.z))
    if (this.pos.y < -6) { this.pos.y = this.world.SPAWN.y; this.vel.set(0, 0, 0) }

    // Bob / camera.
    const horizontal = Math.hypot(this.vel.x, this.vel.z)
    if (this.onGround && horizontal > 0.4) this.bob += dt * (wantsSprint ? 13 : 9)
    else this.bob += dt * 1.6 * 0
    const targetFov = wantsSprint ? 81 : 75
    this.fov += (targetFov - this.fov) * Math.min(1, dt * 6)
    this.recoil *= Math.max(0, 1 - dt * 7)
    this.syncCamera(dt)
    const model = this.getHeldModel()
    if (model) {
      const heldKey = this.currentItem === 'block' ? this.buildBlock : this.currentItem
      const base = this.modelBase[heldKey] || [0, 0, 0]
      const bobX = Math.sin(this.bob) * (horizontal > 0.4 ? 0.012 : 0.003)
      const bobY = Math.abs(Math.cos(this.bob * 1.0)) * (horizontal > 0.4 ? 0.014 : 0.004)
      let swingRot = 0, swingZ = 0, swingY = 0
      if (this.swing > 0) {
        this.swing += dt * 6.2 * this.swingSpeed
        const t = Math.min(1, this.swing)
        const arc = Math.sin(t * Math.PI)
        swingRot = -arc * 1.15
        swingZ = arc * 0.3
        swingY = -arc * 0.16
        if (t >= 1) this.swing = 0
      }
      model.position.set(base[0] - bobX, base[1] - bobY + swingY, base[2] + Math.sin(this.bob * 0.5) * 0.004)
      model.rotation.set(swingRot, 0.06, swingZ)
    }
  }

  tryStep(dx, dz) {
    const oldPos = this.pos.clone()
    this.pos.y += 1.02
    if (this.collidesAll()) { this.pos.copy(oldPos); return false }
    const okX = this.moveAxis('x', dx)
    const okZ = this.moveAxis('z', dz)
    if (!okX && !okZ) { this.pos.copy(oldPos); return false }
    this.pos.y = oldPos.y + 1.02
    return true
  }

  collidesAll() {
    const p = this.pos
    for (let x = Math.floor(p.x - HALF); x <= Math.floor(p.x + HALF); x++) {
      for (let y = Math.floor(p.y + 0.001); y <= Math.floor(p.y + HEIGHT - 0.001); y++) {
        for (let z = Math.floor(p.z - HALF); z <= Math.floor(p.z + HALF); z++) {
          if (this.world.getBlock(x, y, z) !== B.AIR && blockDef(this.world.getBlock(x, y, z)).solid) return true
        }
      }
    }
    return false
  }

  collidesY() {
    const p = this.pos
    for (let x = Math.floor(p.x - HALF + 0.02); x <= Math.floor(p.x + HALF - 0.02); x++) {
      for (let y = Math.floor(p.y + 0.001); y <= Math.floor(p.y + HEIGHT - 0.001); y++) {
        for (let z = Math.floor(p.z - HALF + 0.02); z <= Math.floor(p.z + HALF - 0.02); z++) {
          if (blockDef(this.world.getBlock(x, y, z)).solid) return true
        }
      }
    }
    return false
  }

  resolveYDown() {
    const p = this.pos
    let highest = -Infinity
    for (let x = Math.floor(p.x - HALF + 0.02); x <= Math.floor(p.x + HALF - 0.02); x++) {
      for (let z = Math.floor(p.z - HALF + 0.02); z <= Math.floor(p.z + HALF - 0.02); z++) {
        for (let y = Math.floor(p.y - 1); y <= Math.floor(p.y + 1); y++) {
          if (blockDef(this.world.getBlock(x, y, z)).solid) highest = Math.max(highest, y + 1)
        }
      }
    }
    if (highest > -Infinity) p.y = highest
  }

  resolveYUp() {
    const p = this.pos
    let lowest = Infinity
    for (let x = Math.floor(p.x - HALF + 0.02); x <= Math.floor(p.x + HALF - 0.02); x++) {
      for (let z = Math.floor(p.z - HALF + 0.02); z <= Math.floor(p.z + HALF - 0.02); z++) {
        for (let y = Math.floor(p.y + HEIGHT - 0.2); y <= Math.floor(p.y + HEIGHT + 0.5); y++) {
          if (blockDef(this.world.getBlock(x, y, z)).solid) lowest = Math.min(lowest, y)
        }
      }
    }
    if (lowest < Infinity) p.y = lowest - HEIGHT - 0.001
  }

  moveAxis(axis, amount) {
    if (amount === 0) return true
    this.pos[axis] += amount
    const p = this.pos
    const colliding = () => {
      const minX = Math.floor(p.x - HALF + 0.001), maxX = Math.floor(p.x + HALF - 0.001)
      const minZ = Math.floor(p.z - HALF + 0.001), maxZ = Math.floor(p.z + HALF - 0.001)
      const minY = Math.floor(p.y + 0.01), maxY = Math.floor(p.y + HEIGHT - 0.01)
      for (let x = minX; x <= maxX; x++) for (let y = minY; y <= maxY; y++) for (let z = minZ; z <= maxZ; z++) {
        if (blockDef(this.world.getBlock(x, y, z)).solid) return { x, y, z }
      }
      return null
    }
    const hit = colliding()
    if (!hit) return true
    if (axis === 'x') p.x = amount > 0 ? hit.x - HALF - 0.001 : hit.x + 1 + HALF + 0.001
    else p.z = amount > 0 ? hit.z - HALF - 0.001 : hit.z + 1 + HALF + 0.001
    return false
  }

  addShake(v) { this.shake = Math.min(2.2, this.shake + v) }

  damage(amount, source = 'hit') {
    if (this.dead) return
    this.health = Math.max(0, this.health - amount)
    this.addShake(Math.min(1.4, amount * 0.09))
    this.onDamage?.(amount, source)
    if (this.health <= 0) {
      this.dead = true
      this.onDeath?.()
    }
  }

  heal(amount) { this.health = Math.min(this.maxHealth, this.health + amount) }

  addXp(amount) {
    this.xp += amount
    while (this.xp >= this.xpNext) {
      this.xp -= this.xpNext
      this.level++
      this.xpNext = Math.round(this.xpNext * 1.35)
      this.maxHealth += 5
      this.heal(15)
      this.onLevelUp?.(this.level)
    }
  }

  // Hunger/thirst upkeep. Called once per second from game loop.
  tick(dt) {
    if (this.dead) return
    const moving = Math.hypot(this.vel.x, this.vel.z) > 2
    this.hunger = Math.max(0, this.hunger - dt * (0.09 + (moving ? 0.035 : 0)))
    this.thirst = Math.max(0, this.thirst - dt * (0.13 + (moving ? 0.03 : 0)))
    if (this.hunger <= 0) this.damage(dt * 0.9, 'starve')
    if (this.thirst <= 0) this.damage(dt * 1.1, 'thirst')
    if (this.hunger > 55 && this.thirst > 55 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + dt * 0.35)
    }
  }
}
