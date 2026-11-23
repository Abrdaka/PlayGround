import * as THREE from 'three'
import { blockDef } from './blocks.js'

function particleTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(16, 16, 2, 16, 16, 15)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.65, 'rgba(255,255,255,0.9)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 32, 32)
  const tex = new THREE.CanvasTexture(c)
  return tex
}

export class FX {
  constructor(scene, camera, ui) {
    this.scene = scene
    this.camera = camera
    this.ui = ui
    this.max = 700
    this.pos = new Float32Array(this.max * 3)
    this.col = new Float32Array(this.max * 3)
    this.vel = new Float32Array(this.max * 3)
    this.life = new Float32Array(this.max)
    this.maxLife = new Float32Array(this.max)
    this.grav = new Float32Array(this.max)
    this.next = 0
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3))
    geo.setDrawRange(0, this.max)
    for (let i = 0; i < this.max; i++) this.pos[i * 3 + 1] = -999
    this.points = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.13, map: particleTexture(), vertexColors: true, transparent: true,
      depthWrite: false, sizeAttenuation: true, alphaTest: 0.02, blending: THREE.NormalBlending,
    }))
    this.points.frustumCulled = false
    scene.add(this.points)
    this.tracers = []
    this.numbers = []
  }

  spawn(x, y, z, vx, vy, vz, color, life = 0.8, grav = 14, size = 1) {
    const i = this.next
    this.next = (this.next + 1) % this.max
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz
    const c = new THREE.Color(color)
    this.col[i * 3] = c.r; this.col[i * 3 + 1] = c.g; this.col[i * 3 + 2] = c.b
    this.life[i] = life
    this.maxLife[i] = life
  }

  blockBurst(x, y, z, id) {
    const def = blockDef(id)
    const base = def.color || 0x888888
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * Math.PI * 2
      const s = 1 + Math.random() * 3.4
      this.spawn(x + 0.5 + (Math.random() - 0.5) * 0.7, y + 0.5 + Math.random() * 0.5, z + 0.5 + (Math.random() - 0.5) * 0.7,
        Math.cos(a) * s, 1.2 + Math.random() * 3.2, Math.sin(a) * s, base, 0.6 + Math.random() * 0.5, 15)
    }
  }

  digDust(b, count) {
    const def = blockDef(b.id)
    for (let i = 0; i < 5; i++) {
      const a = Math.random() * Math.PI * 2
      this.spawn(b.x + 0.5 + (Math.random() - .5) * .6, b.y + 0.5 + Math.random() * 0.6, b.z + 0.5 + (Math.random() - .5) * .6,
        Math.cos(a) * 1.2, 0.6 + Math.random() * 1.5, Math.sin(a) * 1.2, def.color || 0x777777, 0.4, 6)
    }
  }

  blood(pos, amount = 10) {
    for (let i = 0; i < amount; i++) {
      const a = Math.random() * Math.PI * 2
      this.spawn(pos.x + (Math.random() - .5) * .3, pos.y + (Math.random() - .5) * .3, pos.z + (Math.random() - .5) * .3,
        Math.cos(a) * (0.6 + Math.random() * 2), Math.random() * 2.6, Math.sin(a) * (0.6 + Math.random() * 2), 0x8a1e18, 0.5, 13)
    }
    for (let i = 0; i < 4; i++) {
      this.spawn(pos.x, pos.y, pos.z, (Math.random() - .5) * 0.5, 0.3, (Math.random() - .5) * 0.5, 0x51110e, 0.9, 4)
    }
  }

  spark(pos, color = 0xffc264) {
    for (let i = 0; i < 7; i++) {
      this.spawn(pos.x, pos.y, pos.z, (Math.random() - .5) * 5, (Math.random() - .2) * 4, (Math.random() - .5) * 5, color, 0.22, 7)
    }
  }

  tracer(from, to, color = 0xffe2a1) {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to])
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false })
    const line = new THREE.Line(geo, mat)
    this.scene.add(line)
    this.tracers.push({ line, life: 0.09 })
  }

  damageNumber(pos, amount, crit = false) {
    if (!this.ui) return
    const el = document.createElement('div')
    el.className = 'dmg-number' + (crit ? ' crit' : '')
    el.textContent = Math.round(amount)
    this.ui.layer.appendChild(el)
    this.numbers.push({ el, pos: pos.clone(), life: 0.85, vy: 1.8 + Math.random() * 0.5 })
  }

  update(dt) {
    const posAttr = this.points.geometry.attributes.position
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) continue
      this.life[i] -= dt
      const j = i * 3
      this.vel[j + 1] -= 14 * dt
      this.pos[j] += this.vel[j] * dt
      this.pos[j + 1] += this.vel[j + 1] * dt
      this.pos[j + 2] += this.vel[j + 2] * dt
      if (this.life[i] <= 0) { this.pos[j + 1] = -999 }
    }
    posAttr.needsUpdate = true
    this.points.geometry.attributes.color.needsUpdate = true

    for (const t of this.tracers) {
      t.life -= dt
      t.line.material.opacity = Math.max(0, t.life / 0.09) * 0.9
    }
    this.tracers = this.tracers.filter(t => {
      if (t.life <= 0) { this.scene.remove(t.line); t.line.geometry.dispose(); t.line.material.dispose(); return false }
      return true
    })

    for (const n of this.numbers) {
      n.life -= dt
      n.pos.y += n.vy * dt
      n.el.style.opacity = Math.max(0, n.life / 0.85)
      n.el.style.transform = 'translate(-50%,-50%) scale(' + (1 + Math.max(0, 1 - n.life / 0.85) * 0.25) + ')'
      const v = n.pos.clone().project(this.camera)
      if (v.z > 1) { n.el.style.display = 'none'; continue }
      const x = (v.x * 0.5 + 0.5) * window.innerWidth
      const y = (-v.y * 0.5 + 0.5) * window.innerHeight
      n.el.style.left = x + 'px'
      n.el.style.top = y + 'px'
    }
    this.numbers = this.numbers.filter(n => {
      if (n.life <= 0) { n.el.remove(); return false }
      return true
    })
  }
}
