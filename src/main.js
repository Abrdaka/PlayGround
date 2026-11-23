import * as THREE from 'three'
import { World } from './world.js'
import { Player } from './player.js'
import { ZombieManager } from './zombies.js'
import { Sky } from './sky.js'
import { UI } from './ui.js'
import { AudioFX } from './audio.js'
import { FX } from './fx.js'
import { B, blockDef, BLOCKS } from './blocks.js'
import { RECIPES, craft, starterInventory, ITEMS } from './items.js'
import { setupMobile } from './mobile.js'

const SAVE_KEY = 'seven-days-to-die-save-v1'
const DAY_LENGTH = 200

const $ = (id) => document.getElementById(id)

class Game {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    $('game').appendChild(this.renderer.domElement)
    this.canvas = this.renderer.domElement

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0xb9d1dc, 32, 118)
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.06, 700)
    this.scene.add(this.camera)

    this.audio = new AudioFX()
    this.sky = new Sky(this.scene)
    this.world = new World(this.scene)
    this.player = new Player(this.camera, this.world)
    this.inv = starterInventory()
    this.day = 1
    this.timeOfDay = 0.345
    this.state = 'init'
    this.paused = false
    this.hordeNight = false
    this.victoryShown = false
    this.lastHordeDay = 0
    this.playTime = 0
    this.shootCd = 0
    this.swingCd = 0
    this.useCd = 0
    this.placeCd = 0
    this.muzzleTime = 0
    this.hitmarkTime = 0
    this.mine = { key: '', dmg: 0 }
    this.aim = null
    this.menuTime = 0.40
    this.elapsed = 0
    this.autosave = 0
    this.heartbeatCd = 0
    this.input = {
      forward: false, back: false, left: false, right: false, jump: false, sprint: false,
      attack: false, attackPressed: false, placeQueued: false,
    }
    this.stats = { kills: 0, blocksMined: 0, crafted: 0, shots: 0 }
    this.hasSave = false
    try { this.hasSave = !!localStorage.getItem(SAVE_KEY) } catch { }
    this.fx = new FX(this.scene, this.camera, null)
    this.ui = new UI(this)
    this.fx.ui = this.ui
    this.zombies = new ZombieManager(this)
    this.bindEvents()
    this.player.onDamage = (amt) => { this.ui.flashDamage(amt); this.audio.hurt() }
    this.player.onDeath = () => this.onDeath()
    this.player.onFallDamage = (fall) => this.player.damage(Math.max(4, (fall - 3.2) * 8), 'fall')
    this.player.onLevelUp = (lvl) => {
      this.ui.toastBig('LEVEL ' + lvl, 'MAX HEALTH INCREASED', 1800)
      this.audio.levelUp()
    }
    this.mobile = setupMobile(this, this.input)
    this.onResize()
  }

  // ---------------- lifecycle ----------------
  startNew() {
    if (this.world.edits.size > 0 || this.everStarted) this.world.reset()
    this.everStarted = true
    this.inv = starterInventory()
    this.day = 1
    this.timeOfDay = 0.345
    this.stats = { kills: 0, blocksMined: 0, crafted: 0, shots: 0 }
    this.hordeNight = false
    this.victoryShown = false
    this.lastHordeDay = 0
    this.zombies.clearAll()
    this.ui.hideEndScreens()
    this.resetPlayer()
    this.begin()
  }

  resetPlayer() {
    const p = this.player
    p.pos.set(this.world.SPAWN.x, this.world.SPAWN.y, this.world.SPAWN.z)
    p.vel.set(0, 0, 0)
    p.yaw = -0.02
    p.pitch = -0.045
    p.health = p.maxHealth = 100
    p.stamina = p.maxStamina = 100
    p.hunger = 100
    p.thirst = 100
    p.level = 1
    p.xp = 0
    p.xpNext = 100
    p.dead = false
    p.fallStart = null
    p.selectItem('axe')
    p.selectBuildBlock('planks')
    p.syncCamera(0)
    this.input.attack = false
  }

  begin() {
    this.state = 'playing'
    this.paused = false
    this.playTime = 0
    this.ui.hideMenu()
    this.ui.showHUD()
    this.ui.setHordeBanner(false)
    this.ui.toastBig('DAY 1', 'SCAVENGE · BUILD · SURVIVE', 2400)
    this.ui.notify('You wake beside a dying campfire.', '', '☼')
    this.ui.notify('Craft gear with E. The dead come at night.', '', '⚠')
    this.audio.init()
    this.saveGame()
    this.requestLock()
  }

  loadGame() {
    let data
    try { data = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null') } catch { data = null }
    if (!data) { this.startNew(); return }
    if (this.world.edits.size > 0 || this.everStarted) this.world.reset()
    this.everStarted = true
    this.world.loadEdits(data.edits || [])
    this.inv = { ...starterInventory(), ...(data.inv || {}) }
    this.day = data.day || 1
    this.timeOfDay = data.time ?? 0.345
    this.stats = { kills: 0, blocksMined: 0, crafted: 0, shots: 0, ...(data.stats || {}) }
    this.hordeNight = !!data.hordeNight
    this.victoryShown = !!data.victoryShown
    this.lastHordeDay = data.lastHordeDay || 0
    this.zombies.clearAll()
    const p = this.player
    p.pos.set(data.player.x, data.player.y, data.player.z)
    p.yaw = data.player.yaw || 0
    p.pitch = data.player.pitch || 0
    p.health = data.player.health ?? 100
    p.maxHealth = data.player.maxHealth || 100
    p.stamina = data.player.stamina ?? 100
    p.hunger = data.player.hunger ?? 100
    p.thirst = data.player.thirst ?? 100
    p.level = data.player.level || 1
    p.xp = data.player.xp || 0
    p.xpNext = data.player.xpNext || 100
    p.dead = false
    p.selectBuildBlock(data.buildBlock === 'cobble' ? 'cobble' : 'planks')
    p.syncCamera(0)
    this.ui.hideEndScreens()
    this.begin()
    if (this.hordeNight) {
      this.zombies.startHorde(this.day)
      this.ui.setHordeBanner(true)
    }
    this.ui.notify(`Save loaded — Day ${this.day}.`, 'loot', '⛁')
  }

  requestLock() {
    try {
      const r = this.canvas.requestPointerLock?.()
      if (r && r.catch) r.catch(() => { })
    } catch { }
  }

  pause() {
    if (this.state !== 'playing') return
    this.paused = true
    this.state = 'paused'
    this.ui.showPause()
    this.audio.setMuted(this.audio.muted)
    document.exitPointerLock?.()
  }

  resume() {
    if (this.state !== 'paused') return
    this.paused = false
    this.state = 'playing'
    this.ui.hidePause()
    this.requestLock()
  }

  backToMenu() {
    if (this.state === 'playing' || this.state === 'paused') this.saveGame()
    this.state = 'menu'
    this.paused = false
    this.zombies.clearAll()
    this.input.attack = false
    this.ui.hideEndScreens()
    this.ui.hideHUD()
    this.ui.closeInventory()
    this.ui.setHordeBanner(false)
    document.exitPointerLock?.()
    this.menuCam = null
    this.ui.showMenu()
    this.hasSave = !!localStorage.getItem(SAVE_KEY)
    this.ui.setContinue(this.hasSave)
  }

  onDeath() {
    if (this.state === 'dead') return
    this.state = 'dead'
    this.paused = true
    this.ui.setHordeBanner(false)
    this.audio.death()
    document.exitPointerLock?.()
    this.ui.showDeath([
      { label: 'DAYS SURVIVED', value: Math.max(1, this.day - 1) },
      { label: 'ZOMBIES KILLED', value: this.stats.kills },
      { label: 'BLOCKS MINED', value: this.stats.blocksMined },
      { label: 'LEVEL', value: this.player.level },
    ])
  }

  showVictory() {
    if (this.victoryShown) return
    this.victoryShown = true
    this.state = 'victory'
    this.paused = true
    this.audio.victory()
    document.exitPointerLock?.()
    this.ui.showVictory([
      { label: 'DAYS SURVIVED', value: 7 },
      { label: 'ZOMBIES KILLED', value: this.stats.kills },
      { label: 'BLOCKS PLACED/MINED', value: this.stats.blocksMined },
      { label: 'LEVEL', value: this.player.level },
    ])
    this.saveGame()
  }

  saveGame() {
    if (this.state === 'dead' || this.state === 'menu' && !this.everStarted) return
    try {
      const p = this.player
      const data = {
        version: 1, day: this.day, time: this.timeOfDay, inv: this.inv, stats: this.stats,
        hordeNight: this.hordeNight, victoryShown: this.victoryShown, lastHordeDay: this.lastHordeDay,
        buildBlock: p.buildBlock,
        player: {
          x: p.pos.x, y: p.pos.y, z: p.pos.z, yaw: p.yaw, pitch: p.pitch,
          health: p.health, maxHealth: p.maxHealth, stamina: p.stamina, hunger: p.hunger, thirst: p.thirst,
          level: p.level, xp: p.xp, xpNext: p.xpNext,
        },
        edits: Array.from(this.world.edits.entries()),
      }
      localStorage.setItem(SAVE_KEY, JSON.stringify(data))
      this.hasSave = true
    } catch (e) { console.warn('save failed', e) }
  }

  // ---------------- events ----------------
  bindEvents() {
    $('btn-start').addEventListener('click', () => { this.audio.init(); this.startNew() })
    $('btn-continue').addEventListener('click', () => { this.audio.init(); this.loadGame() })
    $('btn-close-inv').addEventListener('click', () => this.closeInventory())
    $('btn-respawn').addEventListener('click', () => {
      try { localStorage.removeItem(SAVE_KEY) } catch { }
      this.startNew()
    })
    $('btn-death-menu').addEventListener('click', () => { this.ui.hideEndScreens(); this.backToMenu() })
    $('btn-continue-game').addEventListener('click', () => {
      this.state = 'playing'
      this.paused = false
      this.ui.hideEndScreens()
      this.ui.setHordeBanner(false)
      this.requestLock()
    })
    $('btn-victory-menu').addEventListener('click', () => { this.ui.hideEndScreens(); this.backToMenu() })
    $('btn-resume').addEventListener('click', () => this.resume())
    $('btn-save').addEventListener('click', () => {
      this.saveGame()
      this.ui.notify('Game saved.', 'loot', '⛁')
      this.audio.click()
    })
    $('btn-pause-menu').addEventListener('click', () => { this.ui.hideEndScreens(); this.backToMenu() })
    $('pause').addEventListener('click', (e) => { if (e.target.id === 'pause') this.resume() })

    window.addEventListener('resize', () => this.onResize())
    window.addEventListener('blur', () => { this.input.forward = this.input.back = this.input.left = this.input.right = this.input.attack = false })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.saveGame()
    })

    window.addEventListener('keydown', (e) => this.onKeyDown(e))
    window.addEventListener('keyup', (e) => this.onKeyUp(e))

    document.addEventListener('pointerlockchange', () => {
      const locked = document.pointerLockElement === this.canvas
      this.locked = locked
      if (!locked && this.state === 'playing' && this.playTime > 1.6 && !this.ui.invOpen) this.pause()
    })

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.state !== 'playing' || this.paused) return
      if (e.button === 0) {
        this.input.attack = true
        this.input.attackPressed = true
        if (!this.locked) this.requestLock()
      } else if (e.button === 2) {
        e.preventDefault()
        this.input.placeQueued = true
      }
    })
    window.addEventListener('mouseup', (e) => { if (e.button === 0) this.input.attack = false })
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    window.addEventListener('mousemove', (e) => {
      if (this.state !== 'playing' || this.paused) return
      if (!this.locked && !this.input.attack) return
      this.look(e.movementX || 0, e.movementY || 0)
    })
    this.canvas.addEventListener('wheel', (e) => {
      if (this.state !== 'playing' || this.paused || this.ui.invOpen) return
      e.preventDefault()
      this.cycleSlot(e.deltaY > 0 ? 1 : -1)
    }, { passive: false })

    this.ui.onSelectSlot = (slot) => this.selectSlot(slot)
    this.ui.onCraft = (id) => this.craftRecipe(id)
    this.ui.onCloseInv = () => {
      this.paused = false
      if (this.state === 'playing') { this.ui.showHUD(); this.requestLock() }
    }
  }

  onKeyDown(e) {
    const k = e.code
    if (k === 'KeyM') { this.audio.setMuted(!this.audio.muted); this.ui.notify(this.audio.muted ? 'Audio muted' : 'Audio on', '', '♪'); return }
    if (this.state === 'menu') return
    if (k === 'Escape') {
      if (this.ui.invOpen) { this.closeInventory(); return }
      if (this.state === 'playing') this.pause()
      else if (this.state === 'paused') this.resume()
      return
    }
    if (this.state !== 'playing') return
    if (k === 'KeyE' || k === 'Tab') {
      e.preventDefault()
      if (this.ui.invOpen) this.closeInventory()
      else this.openInventory()
      return
    }
    if (this.ui.invOpen) return
    if (k === 'KeyW' || k === 'ArrowUp') this.input.forward = true
    if (k === 'KeyS' || k === 'ArrowDown') this.input.back = true
    if (k === 'KeyA' || k === 'ArrowLeft') this.input.left = true
    if (k === 'KeyD' || k === 'ArrowRight') this.input.right = true
    if (k === 'Space') { e.preventDefault(); this.input.jump = true }
    if (k === 'ShiftLeft' || k === 'ShiftRight') this.input.sprint = true
    if (k === 'KeyF') this.drinkWater()
    if (k === 'KeyB') this.cycleBlock()
    if (k.startsWith('Digit')) {
      const n = Number(k.slice(5))
      if (n >= 1 && n <= 7) this.selectSlotByIndex(n - 1)
    }
    if (k === 'KeyQ') this.selectSlot('block')
  }

  onKeyUp(e) {
    const k = e.code
    if (k === 'KeyW' || k === 'ArrowUp') this.input.forward = false
    if (k === 'KeyS' || k === 'ArrowDown') this.input.back = false
    if (k === 'KeyA' || k === 'ArrowLeft') this.input.left = false
    if (k === 'KeyD' || k === 'ArrowRight') this.input.right = false
    if (k === 'Space') this.input.jump = false
    if (k === 'ShiftLeft' || k === 'ShiftRight') this.input.sprint = false
  }

  look(dx, dy) {
    this.player.yaw -= dx * 0.0024
    this.player.pitch -= dy * 0.0022
    this.player.pitch = Math.max(-1.45, Math.min(1.45, this.player.pitch))
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  get slots() { return ['axe', 'pick', 'pistol', 'block', 'food', 'water', 'bandage'] }

  selectSlotByIndex(i) {
    const s = this.slots[i]
    if (s) this.selectSlot(s)
  }

  cycleSlot(dir) {
    const p = this.player
    let i = this.slots.indexOf(p.currentItem)
    i = (i + dir + this.slots.length) % this.slots.length
    this.selectSlot(this.slots[i])
  }

  selectSlot(slot) {
    const p = this.player
    if (slot === 'block') {
      const key = p.buildBlock === 'planks' ? 'planks_block' : 'cobble_block'
      if (!this.inv[key]) {
        this.ui.message(`No ${p.buildBlock === 'planks' ? 'planks' : 'cobblestone'} — craft more with E`)
        this.audio.error()
        return
      }
    }
    if (['food', 'water', 'bandage'].includes(slot) && !this.inv[slot]) {
      this.ui.message(`No ${ITEMS[slot].name.toLowerCase()} left`)
      this.audio.error()
      return
    }
    if (slot === 'pistol' && !this.inv.pistol) {
      this.ui.message('You need a pistol — craft one with E')
      return
    }
    p.selectItem(slot)
    this.audio.click()
  }

  cycleBlock() {
    const p = this.player
    p.selectBuildBlock(p.buildBlock === 'planks' ? 'cobble' : 'planks')
    const key = p.buildBlock === 'planks' ? 'planks_block' : 'cobble_block'
    this.ui.message(`Building: ${ITEMS[key].name} (${this.inv[key] || 0})`, 1400)
    this.audio.click()
  }

  openInventory() {
    if (this.state !== 'playing') return
    this.paused = true
    this.input.attack = false
    document.exitPointerLock?.()
    this.ui.openInventory()
  }

  closeInventory() {
    this.ui.closeInventory()
  }

  craftRecipe(id) {
    const r = RECIPES.find(r => r.id === id)
    if (!r) return
    if (craft(this.inv, r)) {
      this.stats.crafted++
      this.player.addXp(4)
      this.audio.click()
      this.ui.notify(`Crafted ${ITEMS[r.out].name}${r.count > 1 ? ' ×' + r.count : ''}`, 'loot', '⚒')
      this.ui.renderInventory()
      this.ui.updateHotbar()
    } else {
      this.audio.error()
      this.ui.message('Missing materials', 1200)
    }
  }

  // ---------------- time ----------------
  get phase() {
    const t = this.timeOfDay
    if (t < 0.26) return { label: 'NIGHT', night: true }
    if (t < 0.325) return { label: 'DAWN', night: false, dawn: true }
    if (t < 0.76) return { label: 'DAY', night: false }
    if (t < 0.84) return { label: 'DUSK', night: false, dusk: true }
    return { label: 'NIGHT', night: true }
  }

  get isNight() { return this.timeOfDay < 0.26 || this.timeOfDay >= 0.84 }

  onNightfall() {
    if (this.day % 7 === 0 && !this.hordeNight && this.lastHordeDay !== this.day) {
      this.lastHordeDay = this.day
      this.hordeNight = true
      this.zombies.startHorde(this.day)
      this.ui.setHordeBanner(true)
      this.ui.toastBig('BLOOD MOON', 'THE HORDE IS COMING', 4200)
      this.player.addShake(1.4)
    } else if (!this.hordeNight) {
      this.ui.toastBig('NIGHTFALL', 'THE DEAD ARE WAKING', 2600)
    }
    this.audio.zombieGrowl(this.player.pos, 'brute')
  }

  onDawn() {
    if (this.hordeNight) {
      this.hordeNight = false
      this.ui.setHordeBanner(false)
      if (this.day >= 8) this.showVictory()
      else this.ui.toastBig('SURVIVED', 'THE HORDE RETREATS', 2600)
    } else {
      this.ui.toastBig('DAWN', 'YOU SURVIVED THE NIGHT', 2200)
    }
    for (const z of this.zombies.list) if (!z.dead) z.burn = true
    this.saveGame()
  }

  objective() {
    const d = this.day
    if (this.hordeNight) return { title: 'SURVIVE THE BLOOD MOON', desc: 'They will break through. Hold until dawn.', tag: 'BLOOD MOON' }
    if (this.isNight) return { title: 'SURVIVE THE NIGHT', desc: 'Zombies are hunting you. Keep your back to a wall.', tag: `DAY ${d} / 7` }
    if (d % 7 === 6) return { title: 'PREPARE FOR TOMORROW', desc: 'The seventh night is close. Wall up and stock ammo.', tag: 'HORDE TOMORROW' }
    if (d === 7) return { title: 'FORTIFY FOR THE HORDE', desc: 'Night falls soon. Build thick walls and a killing floor.', tag: 'DAY 7 / 7' }
    return { title: d === 1 ? 'SURVIVE THE FIRST NIGHT' : 'SCAVENGE & FORTIFY', desc: d === 1 ? 'Chop trees, mine stone, and build shelter before dark.' : 'Loot crates, craft ammo, and brace for the seventh night.', tag: `DAY ${d} / 7` }
  }

  // ---------------- update ----------------
  update(dt) {
    this.elapsed += dt
    this.audio.listener = this.player.pos
    this.aim = null
    if (this.state === 'playing' && !this.paused) {
      this.playTime += dt
      this.simulate(dt)
    } else if (this.state === 'menu') {
      this.menuUpdate(dt)
    }
    this.world.update(dt, this.elapsed)
    if (this.state !== 'menu') {
      this.sky.update(this.timeOfDay, this.hordeNight, this.camera.position, this.player.pos, this.phase.night ? 1 : 0)
      const nightAmt = this.phase.night ? 1 : 0
      this.headlight.intensity = this.hordeNight ? 1.0 : (nightAmt ? 0.9 : 0.18)
    }
    if (this.state === 'playing' || this.state === 'paused') this.ui.update(dt, this.elapsed)
    this.fx.update(dt)
  }

  menuUpdate(dt) {
    this.menuTime += dt * 0.0008
    const t = this.elapsed * 0.055
    const base = this.world.SPAWN
    const gx = base.x + 6.5 + Math.sin(t) * 2.2
    const gz = base.z + 13.5 + Math.cos(t * 0.8) * 1.4
    const gy = this.world.surfaceHeight(gx, gz) + 2.7 + Math.sin(t * 1.7) * 0.12
    this.camera.position.set(gx, gy, gz)
    this.camera.lookAt(base.x - 1.5, base.y + 1.2, base.z - 17.5)
    this.player.pos.copy(this.camera.position)
    this.sky.update(0.41, false, this.camera.position, base, 0)
    this.headlight.intensity = 0.2
  }

  simulate(dt) {
    const p = this.player
    this.updateTime(dt)
    p.update(dt, this.input, true)
    p.tick(dt)
    this.audio.listener = p.pos
    this.updateAim()
    this.handleActions(dt)
    this.zombies.update(dt, this.elapsed, this.isNight || this.hordeNight)
    this.input.attackPressed = false
    this.input.placeQueued = false
    this.muzzleTime = Math.max(0, this.muzzleTime - dt)
    p.muzzle.intensity = this.muzzleTime > 0 ? 8 : 0
    if (this.hordeNight) this.muzzle.intensity = Math.max(this.muzzle.intensity, 0.8)
    // health feedback
    if (p.health < 25) {
      this.heartbeatCd -= dt
      if (this.heartbeatCd <= 0) { this.audio.heartbeat(); this.heartbeatCd = 1.5 }
    }
    // autosave
    this.autosave += dt
    if (this.autosave > 18) { this.autosave = 0; this.saveGame() }
  }

  updateTime(dt) {
    const prev = this.timeOfDay
    const wasNight = this.isNight
    this.timeOfDay += dt / DAY_LENGTH
    if (this.timeOfDay >= 1) { this.timeOfDay -= 1; this.day++ }
    if (!wasNight && this.isNight) this.onNightfall()
    if (wasNight && !this.isNight) this.onDawn()
    // horde starts at dusk, before full night
    if (!this.hordeNight && this.day % 7 === 0 && this.timeOfDay >= 0.80 && this.timeOfDay < 0.83 && this.lastHordeDay !== this.day) {
      this.lastHordeDay = this.day
      this.hordeNight = true
      this.zombies.startHorde(this.day)
      this.ui.setHordeBanner(true)
      this.ui.toastBig('BLOOD MOON', 'THE HORDE IS COMING', 4200)
      this.player.addShake(1.4)
    }
  }

  updateAim() {
    const p = this.player
    const origin = this.camera.position.clone()
    const dir = new THREE.Vector3()
    this.camera.getWorldDirection(dir)
    const block = this.world.raycast(origin, dir, 6)
    const zm = this.rayZombie(origin, dir, 70)
    this.aim = { block, zombie: zm, origin, dir }
    if (zm && (!block || zm.dist < block.dist)) {
      this.ui.setTarget(zm.zombie.type === 'brute' ? 'BRUTE' : zm.zombie.type === 'runner' ? 'RUNNER' : 'WALKER', `${Math.max(0, Math.ceil(zm.zombie.health))} / ${zm.zombie.maxHealth} HP`, 0)
    } else if (block) {
      const def = blockDef(block.id)
      let hint = ''
      if (def.crate) hint = 'HIT TO LOOT'
      else if (p.currentItem === 'axe' && def.tool === 'axe') hint = 'STONE AXE'
      else if (p.currentItem === 'pick' && def.tool === 'pick') hint = 'STONE PICKAXE'
      else if (def.needsPick) hint = 'NEEDS A PICKAXE'
      else if (def.hp === Infinity) hint = 'INDESTRUCTIBLE'
      else hint = 'BARE HANDS' + (p.currentItem === 'pistol' ? ' · USE A TOOL' : '')
      const key = `${block.x},${block.y},${block.z}`
      const prog = this.mine.key === key ? this.mine.dmg / def.hp : 0
      this.ui.setTarget(def.name, hint, Math.min(1, prog))
    } else {
      this.ui.setTarget(null)
    }
  }

  rayZombie(origin, dir, maxDist) {
    let best = null
    for (const z of this.zombies.list) {
      if (z.dead || z.removed) continue
      const center = new THREE.Vector3(z.pos.x, z.pos.y + z.height * 0.55, z.pos.z)
      const oc = center.clone().sub(origin)
      const t = oc.dot(dir)
      if (t < 0 || t > maxDist) continue
      const d2 = oc.lengthSq() - t * t
      const r = 0.42 * z.scale + 0.14
      if (d2 > r * r) continue
      const dist = Math.max(0.1, t - Math.sqrt(r * r - d2))
      if (!best || dist < best.dist) {
        const point = origin.clone().addScaledVector(dir, dist)
        const head = point.y > z.pos.y + z.height * 0.8
        best = { zombie: z, dist, point, head }
      }
    }
    return best
  }

  handleActions(dt) {
    const p = this.player, input = this.input
    this.shootCd = Math.max(0, this.shootCd - dt)
    this.swingCd = Math.max(0, this.swingCd - dt)
    this.useCd = Math.max(0, this.useCd - dt)
    this.placeCd = Math.max(0, this.placeCd - dt)
    const item = p.currentItem

    if (input.placeQueued && this.placeCd <= 0) {
      this.tryPlace()
      input.placeQueued = false
    }

    if (item === 'pistol') {
      if (input.attack && this.shootCd <= 0) this.shoot()
      return
    }
    if (item === 'food' || item === 'water' || item === 'bandage') {
      if (input.attackPressed && this.useCd <= 0) this.consume(item)
      return
    }
    if (item === 'axe' || item === 'pick') {
      if (input.attack && this.swingCd <= 0) this.swing(item)
      else if (input.attackPressed) p.startSwing(1)
      return
    }
    if (item === 'block') {
      if (input.attack && this.placeCd <= 0) { this.tryPlace(); this.placeCd = 0.2 }
    }
  }

  swing(tool) {
    const p = this.player
    const { block, zombie, origin, dir } = this.aim || {}
    this.swingCd = tool === 'axe' ? 0.38 : 0.42
    p.startSwing(1)
    this.audio.swing()
    if (zombie && (!block || zombie.dist < block.dist) && zombie.dist < 3.6) {
      const dmg = tool === 'axe' ? 32 : 22
      const point = zombie.point.clone()
      this.damageZombie(zombie.zombie, dmg, point, false, origin, () => this.ui.hitmark(zombie.zombie.dead))
      p.addXp(1)
      return
    }
    if (!block) return
    const def = blockDef(block.id)
    const key = `${block.x},${block.y},${block.z}`
    let dmg = 8
    const matched = (tool === 'axe' && def.tool === 'axe') || (tool === 'pick' && def.tool === 'pick')
    if (matched) dmg = 34
    if (def.needsPick && tool !== 'pick') {
      this.ui.message(`${def.name} requires a pickaxe`, 1500)
      this.audio.error()
      return
    }
    if (def.hp === Infinity) return
    if (def.crate) { this.openCrate(block); return }
    if (this.mine.key !== key) { this.mine.key = key; this.mine.dmg = 0 }
    this.mine.dmg += dmg
    this.fx.digDust(block, this.mine.dmg)
    if (matched) this.audio.chop(); else this.audio.pickHit()
    if (this.mine.dmg >= def.hp) {
      this.breakBlock(block, def)
      this.mine.key = ''
      this.mine.dmg = 0
    }
  }

  breakBlock(block, def) {
    const p = this.player
    this.world.setBlock(block.x, block.y, block.z, B.AIR)
    this.fx.blockBurst(block.x, block.y, block.z, block.id)
    this.audio.breakBlock(def.hp / 50)
    p.addXp(2)
    this.stats.blocksMined++
    if (def.drop && Math.random() <= (def.dropChance ?? 1)) {
      const n = def.dropCount || 1
      const key = def.drop
      this.inv[key] = (this.inv[key] || 0) + n
      const icons = { wood: '🪵', stone: '🪨', iron: '⛓', planks: '▤', cobble: '▦' }
      this.ui.notify(`+${n} ${ITEMS[key]?.name || key}`, 'loot', icons[key] || '◆')
      this.audio.pickup()
    }
  }

  openCrate(block) {
    this.world.setBlock(block.x, block.y, block.z, B.AIR)
    this.fx.blockBurst(block.x, block.y, block.z, B.CRATE)
    this.audio.breakBlock(1)
    const table = [
      ['ammo', 12, 24], ['food', 1, 3], ['water', 1, 3], ['iron', 2, 5],
      ['cloth', 1, 3], ['bandage', 1, 2], ['planks_block', 4, 10], ['cobble_block', 4, 10],
    ]
    const picked = new Set()
    while (picked.size < 3) picked.add(Math.floor(Math.random() * table.length))
    const names = []
    for (const i of picked) {
      const [key, lo, hi] = table[i]
      const n = lo + Math.floor(Math.random() * (hi - lo + 1))
      this.inv[key] = (this.inv[key] || 0) + n
      names.push(`${ITEMS[key].name} ×${n}`)
    }
    this.ui.notify('Crate: ' + names.join(' · '), 'loot', '▣')
    this.ui.toastBig('SUPPLIES', names[0], 1600)
    this.player.addXp(10)
    this.audio.pickup()
    this.stats.blocksMined++
  }

  shoot() {
    const p = this.player
    this.shootCd = 0.34
    p.startSwing(2.4)
    if (!this.inv.ammo) {
      this.audio.dryFire()
      this.ui.message('OUT OF 9MM — craft ammo with E', 1500)
      return
    }
    this.inv.ammo--
    this.stats.shots++
    this.audio.gunshot()
    p.recoil = 0.035 + Math.random() * 0.012
    p.addShake(0.22)
    this.muzzleTime = 0.055
    const origin = this.camera.position.clone()
    const dir = new THREE.Vector3()
    this.camera.getWorldDirection(dir)
    const block = this.world.raycast(origin, dir, 90)
    const zm = this.rayZombie(origin, dir, 90)
    const hitZombie = zm && (!block || zm.dist < block.dist)
    const end = hitZombie ? zm.point : (block ? block.point : origin.clone().addScaledVector(dir, 90))
    const muzzle = origin.clone().addScaledVector(dir, 0.5).add(new THREE.Vector3(0.18, -0.12, 0))
    this.fx.tracer(muzzle, end)
    this.fx.spark(muzzle, 0xffc978)
    if (hitZombie) {
      const dmg = zm.head ? 96 : 46
      this.damageZombie(zm.zombie, dmg, zm.point, zm.head, origin, () => {
        this.ui.hitmark(zm.zombie.dead)
        if (zm.head) this.ui.message('HEADSHOT', 700)
      })
    } else if (block) {
      this.fx.blockBurst(block.x, block.y, block.z, block.id)
      this.fx.spark(block.point, 0xffe0a0)
      this.audio.pickHit()
    }
  }

  damageZombie(z, dmg, point, head, from, feedback) {
    const died = z.damage(dmg, { knockback: 0.22, from: new THREE.Vector3(from.x, from.y, from.z) })
    this.fx.blood(point, head ? 16 : 9)
    this.audio.flesh()
    this.fx.damageNumber(point, dmg, head)
    feedback?.()
    if (!died) this.player.addXp(head ? 6 : 3)
  }

  zombieAttack(z) {
    this.player.damage(Math.round(z.damage), 'zombie')
    this.ui.flashDamage(z.damage)
    this.audio.hurt()
    const dx = this.player.pos.x - z.pos.x, dz = this.player.pos.z - z.pos.z
    const d = Math.hypot(dx, dz) || 1
    this.player.vel.x += dx / d * 2.6
    this.player.vel.z += dz / d * 2.6
    this.fx.blood(new THREE.Vector3(this.player.pos.x, this.player.pos.y + 1.2, this.player.pos.z), 6)
  }

  zombieKilled(z) {
    this.stats.kills++
    this.player.addXp(z.type === 'brute' ? 34 : z.type === 'runner' ? 16 : 22)
    const drops = []
    const give = (k, n) => { this.inv[k] = (this.inv[k] || 0) + n; drops.push(`+${n} ${ITEMS[k].name}`) }
    if (Math.random() < 0.7) give('cloth', 1 + (Math.random() < 0.3 ? 1 : 0))
    if (Math.random() < 0.3) give('ammo', 3 + Math.floor(Math.random() * 5))
    if (Math.random() < 0.22) give('food', 1)
    if (Math.random() < 0.18) give('water', 1)
    if (Math.random() < 0.14) give('bandage', 1)
    if (Math.random() < 0.08) give('iron', 1)
    if (drops.length) this.ui.notify(drops.join(' · '), 'loot', '☠')
    this.audio.flesh()
  }

  consume(item) {
    const p = this.player
    if (!this.inv[item]) {
      this.ui.message(`No ${ITEMS[item].name.toLowerCase()} left`, 1400)
      this.audio.error()
      return
    }
    if (item === 'food' && p.hunger >= 99) { this.ui.message('Not hungry', 1200); return }
    if (item === 'water' && p.thirst >= 99) { this.ui.message('Not thirsty', 1200); return }
    if (item === 'bandage' && p.health >= p.maxHealth - 0.5) { this.ui.message('Health is full', 1200); return }
    this.inv[item]--
    this.useCd = 0.9
    if (item === 'food') { p.hunger = Math.min(100, p.hunger + 32); this.audio.eat(); this.ui.message('+32 HUNGER', 1000) }
    if (item === 'water') { p.thirst = Math.min(100, p.thirst + 38); this.audio.drink(); this.ui.message('+38 THIRST', 1000) }
    if (item === 'bandage') { p.heal(30); this.audio.heal(); this.ui.message('+30 HEALTH', 1000) }
  }

  drinkWater() {
    if (this.state !== 'playing' || this.paused) return
    const p = this.player
    const bx = Math.floor(p.pos.x), by = Math.floor(p.pos.y + 1), bz = Math.floor(p.pos.z)
    let found = false
    for (let dx = -3; dx <= 3 && !found; dx++) for (let dy = -2; dy <= 2 && !found; dy++) for (let dz = -3; dz <= 3; dz++) {
      if (this.world.getBlock(bx + dx, by + dy, bz + dz) === B.WATER) { found = true; break }
    }
    if (!found) { this.ui.message('No water nearby', 1200); return }
    if (p.thirst >= 99) { this.ui.message('Not thirsty', 1200); return }
    p.thirst = Math.min(100, p.thirst + 20)
    this.audio.drink()
    this.ui.message('Drank from the water · +20 THIRST', 1400)
  }

  tryPlace() {
    const p = this.player
    const key = p.buildBlock === 'planks' ? 'planks_block' : 'cobble_block'
    const id = p.buildBlock === 'planks' ? B.PLANKS : B.COBBLE
    if (!this.inv[key]) {
      this.ui.message(`Out of ${p.buildBlock === 'planks' ? 'planks' : 'cobblestone'}`, 1200)
      this.audio.error()
      return
    }
    const origin = this.camera.position.clone()
    const dir = new THREE.Vector3()
    this.camera.getWorldDirection(dir)
    const hit = this.world.raycast(origin, dir, 5.5)
    if (!hit) return
    const x = hit.x + hit.normal[0], y = hit.y + hit.normal[1], z = hit.z + hit.normal[2]
    if (y < 1 || y > 62) return
    const existing = this.world.getBlock(x, y, z)
    if (existing !== B.AIR && !blockDef(existing).plant && existing !== B.WATER) {
      this.ui.message('Blocked', 900)
      return
    }
    // don't build into the player
    const px = p.pos.x, pz = p.pos.z
    const overlapsX = x + 1 > px - 0.34 && x < px + 0.34
    const overlapsZ = z + 1 > pz - 0.34 && z < pz + 0.34
    const overlapsY = y + 1 > p.pos.y + 0.02 && y < p.pos.y + 1.8
    if (overlapsX && overlapsZ && overlapsY) {
      this.ui.message("Can't build inside yourself", 1100)
      return
    }
    this.world.setBlock(x, y, z, id)
    this.inv[key]--
    this.audio.place()
    this.fx.digDust({ x, y, z, id }, 1)
    this.placeCd = 0.22
    this.player.addXp(1)
  }
}

// ---------------- boot ----------------
const game = new Game()

async function boot() {
  await new Promise(r => requestAnimationFrame(() => setTimeout(r, 40)))
  game.world.generate()
  game.SPAWN_READY = true
  game.player.pos.set(game.world.SPAWN.x, game.world.SPAWN.y, game.world.SPAWN.z)
  game.menuCam = true
  game.state = 'menu'
  game.ui.setContinue(game.hasSave)
  game.ui.showMenu()
  game.ui.hideLoading()
  const headlight = new THREE.PointLight(0xffd2a0, 0.35, 13, 1.7)
  headlight.position.set(0, 0, 0)
  game.camera.add(headlight)
  game.headlight = headlight
  if (game.hasSave) game.ui.notify('Save detected — Continue or start fresh.', '', '⛁')
  game.audio.init = game.audio.init.bind(game.audio)
}

let last = performance.now()
let frames = 0
let fpsTime = 0
function animate(now) {
  requestAnimationFrame(animate)
  const dt = Math.min(0.05, Math.max(0.0001, (now - last) / 1000))
  last = now
  frames++
  fpsTime += dt
  if (fpsTime >= 1) { game.fps = Math.round(frames / fpsTime); frames = 0; fpsTime = 0 }
  if (!game.SPAWN_READY) { game.renderer.render(game.scene, game.camera); return }
  game.update(dt)
  game.renderer.render(game.scene, game.camera)
}

boot().then(() => {
  requestAnimationFrame(animate)
  setTimeout(() => { game.renderer.render(game.scene, game.camera) }, 120)
})

// Expose for automated checks / debugging.
window.__game = game
