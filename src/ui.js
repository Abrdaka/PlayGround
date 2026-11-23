import { ITEMS, RECIPES, canCraft, iconSVG } from './items.js'

const $ = (id) => document.getElementById(id)

const HOTBAR = [
  { slot: 'axe', key: '1', item: 'axe' },
  { slot: 'pick', key: '2', item: 'pick' },
  { slot: 'pistol', key: '3', item: 'pistol' },
  { slot: 'block', key: '4', item: 'planks_block' },
  { slot: 'food', key: '5', item: 'food' },
  { slot: 'water', key: '6', item: 'water' },
  { slot: 'bandage', key: '7', item: 'bandage' },
]

const TIME = {
  nightEnd: 0.255, dawnEnd: 0.31, dayEnd: 0.78, duskEnd: 0.845,
}

export class UI {
  constructor(game) {
    this.game = game
    this.el = {
      loading: $('loading'), menu: $('menu'), hud: $('hud'), inventory: $('inventory'),
      death: $('death'), victory: $('victory'), pause: $('pause'),
      vHealth: $('v-health'), vStamina: $('v-stamina'), vHunger: $('v-hunger'), vThirst: $('v-thirst'),
      barHealth: $('bar-health'), barStamina: $('bar-stamina'), barHunger: $('bar-hunger'), barThirst: $('bar-thirst'),
      vLevel: $('v-level'), vXp: $('v-xp'), barXp: $('bar-xp'),
      vDay: $('v-day'), vTime: $('v-time'), vPhase: $('v-phase'), vHorde: $('v-horde'),
      clockIcon: $('clock-icon'), clockCard: $('clock-card'), dayPips: $('day-pips'),
      hordeBanner: $('horde-banner'), objDay: $('obj-day'), objTitle: $('obj-title'), objDesc: $('obj-desc'),
      missionPips: $('mission-pips'), vCompass: $('v-compass'), vAmmo: $('v-ammo'), ammoBox: $('ammo-box'),
      hotbar: $('hotbar'), blockSel: $('block-sel'), statusPill: $('status-pill'),
      notifications: $('notifications'), hint: $('hint-strip'), crosshair: $('crosshair'),
      hitmarker: $('hitmarker'), targetLabel: $('target-label'), mineRing: $('mine-ring'),
      damageFlash: $('damage-flash'), lowHealth: $('low-health'),
      toastBig: $('toast-big'), invGrid: $('inv-grid'), recipes: $('recipes'),
      deathStats: $('death-stats'), victoryStats: $('victory-stats'), tipText: $('tip-text'),
      crosshairMsg: $('crosshair-msg'),
    }
    this.lastUpdate = 0
    this.hintTime = 0
    this.invOpen = false
    this.hitTimer = null
    this.bigTimer = null
    this.msgTimer = null
    this.buildHotbar()
    this.buildMissionPips()
    this.onSelectSlot = null
    this.onCraft = null
    this.onCloseInv = null
    this.onTogglePause = null
    const isTouch = matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window && navigator.maxTouchPoints > 0)
    this.isTouch = isTouch
    if (isTouch) document.body.classList.add('mobile')
  }

  buildHotbar() {
    this.el.hotbar.innerHTML = HOTBAR.map(s => `
      <div class="slot" data-slot="${s.slot}" role="button" aria-label="${s.slot}">
        <span class="key">${s.key}</span>
        <span class="icon">${iconSVG(s.item)}</span>
        <span class="count"></span>
      </div>`).join('')
    this.el.hotbar.querySelectorAll('.slot').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        this.onSelectSlot?.(el.dataset.slot)
      })
    })
  }

  buildMissionPips() {
    this.el.missionPips.innerHTML = Array.from({ length: 7 }, (_, i) => `<i></i>`).join('')
  }

  setContinue(available) {
    $('btn-continue').classList.toggle('hidden', !available)
  }

  hideLoading() {
    this.el.loading.classList.add('done')
    setTimeout(() => this.el.loading.classList.add('hidden'), 600)
  }

  showMenu() {
    this.el.menu.classList.remove('hidden')
    this.el.hud.classList.add('hidden')
    this.el.inventory.classList.add('hidden')
    this.el.pause.classList.add('hidden')
    this.setContinue(!!this.game.hasSave)
  }

  hideMenu() {
    this.el.menu.classList.add('hidden')
  }

  showHUD() {
    this.el.hud.classList.remove('hidden')
    this.el.hintTime = 0
    this.el.hint.style.opacity = '1'
  }

  hideHUD() { this.el.hud.classList.add('hidden') }

  // ---------------- HUD ----------------
  update(dt, t) {
    this.el.hintTime += dt
    if (this.el.hintTime > 16) this.el.hint.style.opacity = '0'
    if (t - this.lastUpdate < 0.08) return
    this.lastUpdate = t
    const g = this.game
    const p = g.player
    if (!p) return
    const H = p.health / p.maxHealth, S = p.stamina / p.maxStamina
    this.el.barHealth.style.width = (H * 100).toFixed(1) + '%'
    this.el.barStamina.style.width = (S * 100).toFixed(1) + '%'
    this.el.barHunger.style.width = p.hunger.toFixed(1) + '%'
    this.el.barThirst.style.width = p.thirst.toFixed(1) + '%'
    this.el.vHealth.textContent = Math.ceil(p.health)
    this.el.vStamina.textContent = Math.ceil(p.stamina)
    this.el.vHunger.textContent = Math.ceil(p.hunger)
    this.el.vThirst.textContent = Math.ceil(p.thirst)
    this.el.vLevel.textContent = 'LVL ' + p.level
    this.el.vXp.textContent = `${Math.floor(p.xp)}/${p.xpNext}`
    this.el.barXp.style.width = Math.min(100, p.xp / p.xpNext * 100) + '%'
    this.el.lowHealth.style.opacity = p.health < 30 ? String(0.5 + Math.sin(t * 4) * 0.2) : '0'

    // clock
    const minutes = Math.floor(g.timeOfDay * 24 * 60)
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
    const mm = String(minutes % 60).padStart(2, '0')
    this.el.vTime.textContent = `${hh}:${mm}`
    this.el.vDay.textContent = `DAY ${g.day}`
    const phase = g.phase
    this.el.vPhase.textContent = phase.label
    this.el.vPhase.style.color = phase.night ? '#7fb1d6' : ''
    this.el.clockIcon.textContent = phase.night ? (g.hordeNight ? '🌑' : '☾') : phase.dusk ? '◐' : phase.dawn ? '◑' : '☀'
    this.el.clockIcon.style.color = g.hordeNight ? '#ff5b36' : phase.night ? '#9ec4e0' : '#ffce7a'
    const nightsLeft = g.hordeNight ? 0 : (7 - ((g.day - 1) % 7))
    this.el.vHorde.textContent = g.hordeNight ? 'BLOOD MOON RISING' : `BLOOD MOON IN ${nightsLeft} NIGHT${nightsLeft === 1 ? '' : 'S'}`
    this.el.vHorde.style.color = g.hordeNight ? '#ff6a42' : (nightsLeft <= 1 ? '#d9542f' : '')
    this.el.clockCard.classList.toggle('horde', g.hordeNight)
    this.updatePips(g)

    // objective
    const obj = g.objective()
    this.el.objTitle.textContent = obj.title
    this.el.objDesc.textContent = obj.desc
    this.el.objDay.textContent = obj.tag
    const pips = this.el.missionPips.children
    for (let i = 0; i < pips.length; i++) {
      const d = i + 1
      pips[i].className = d < g.day ? 'done' : d === g.day ? 'now' : (d === 7 ? 'end' : '')
    }

    // ammo & block
    this.el.vAmmo.textContent = g.inv.ammo || 0
    this.el.vAmmo.classList.toggle('low', (g.inv.ammo || 0) <= 4)
    this.el.blockSel.textContent = p.buildBlock === 'planks' ? `PLANKS ×${g.inv.planks_block || 0}` : `COBBLE ×${g.inv.cobble_block || 0}`

    // compass
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const yaw = ((p.yaw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const idx = Math.round((yaw / (Math.PI * 2)) * 8) % 8
    this.el.vCompass.textContent = dirs[(8 - idx) % 8]

    // status
    let status = g.hordeNight ? '<b>BLOOD MOON</b> · FIGHT FOR DAWN' : g.phase.night ? '<b>NIGHT</b> · THE DEAD WALK' : 'SURVIVE · SCAVENGE · FORTIFY'
    if (p.inWater) status = 'SWIMMING · SLOWED'
    this.el.statusPill.innerHTML = status
    this.updateHotbar()
    this.updateDamage()
  }

  updatePips(g) {
    if (this._pipDay === g.day && this._pipNight === g.hordeNight) return
    this._pipDay = g.day; this._pipNight = g.hordeNight
    const day = g.day
    this.el.dayPips.innerHTML = Array.from({ length: 7 }, (_, i) => {
      const d = i + 1
      const cls = d < day ? 'filled' : d === day ? (d === 7 ? 'now horde' : 'now') : (d === 7 ? 'horde' : '')
      return `<i class="${cls}"></i>`
    }).join('')
  }

  updateHotbar() {
    const g = this.game, p = g.player
    for (const slot of HOTBAR) {
      const el = this.el.hotbar.querySelector(`[data-slot="${slot.slot}"]`)
      if (!el) continue
      let icon = slot.item
      let count = 1
      if (slot.slot === 'block') {
        icon = p.buildBlock === 'planks' ? 'planks_block' : 'cobble_block'
        count = g.inv[icon] || 0
      } else if (['food', 'water', 'bandage'].includes(slot.slot)) {
        count = g.inv[slot.item] || 0
      } else if (slot.slot === 'pistol') {
        count = g.inv.ammo || 0
      }
      const iconEl = el.querySelector('.icon')
      if (iconEl.dataset.icon !== icon) {
        iconEl.innerHTML = iconSVG(icon)
        iconEl.dataset.icon = icon
      }
      const countEl = el.querySelector('.count')
      const show = slot.slot === 'pistol' ? count : (slot.slot === 'block' || ['food', 'water', 'bandage'].includes(slot.slot) ? count : '')
      countEl.textContent = show === '' ? '' : show
      const empty = ['food', 'water', 'bandage'].includes(slot.slot) ? count <= 0 : (slot.slot === 'block' ? count <= 0 : false)
      el.classList.toggle('empty', empty)
      el.classList.toggle('selected', p.currentItem === slot.slot)
    }
  }

  updateDamage() {
    const el = this.el.damageFlash
    if (el._t) {
      el._t -= 0.08
      el.style.opacity = String(Math.max(0, el._t))
    }
  }

  flashDamage(amount) {
    const el = this.el.damageFlash
    el._t = Math.min(1, 0.35 + amount * 0.02)
    el.style.opacity = String(el._t)
  }

  setTarget(name, sub = '', progress = 0) {
    const el = this.el.targetLabel
    if (!name) { el.classList.remove('show'); this.el.mineRing.classList.remove('active'); return }
    el.classList.add('show')
    el.innerHTML = `${name}${sub ? `<small>${sub}</small>` : ''}`
    if (progress > 0) {
      this.el.mineRing.classList.add('active')
      this.el.mineRing.style.setProperty('--p', String(Math.round(progress * 100)))
    } else {
      this.el.mineRing.classList.remove('active')
    }
  }

  hitmark(kill = false) {
    const el = this.el.hitmarker
    el.classList.remove('show', 'kill')
    void el.offsetWidth
    el.classList.add('show')
    if (kill) el.classList.add('kill')
    clearTimeout(this.hitTimer)
    this.hitTimer = setTimeout(() => el.classList.remove('show'), 130)
  }

  message(text, duration = 1800) {
    const el = this.el.crosshairMsg
    el.textContent = text
    el.classList.remove('hidden')
    clearTimeout(this.msgTimer)
    this.msgTimer = setTimeout(() => el.classList.add('hidden'), duration)
  }

  clearMessage() { this.el.crosshairMsg.classList.add('hidden') }

  notify(text, kind = '', icon = '◆') {
    const el = document.createElement('div')
    el.className = 'toast ' + kind
    el.innerHTML = `<span class="t-ico">${icon}</span><span>${text}</span>`
    this.el.notifications.appendChild(el)
    while (this.el.notifications.children.length > 5) this.el.notifications.firstChild.remove()
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320) }, 3200)
  }

  toastBig(text, sub = '', duration = 2600) {
    const el = this.el.toastBig
    el.innerHTML = `${text}${sub ? `<small>${sub}</small>` : ''}`
    el.classList.remove('hidden')
    clearTimeout(this.bigTimer)
    this.bigTimer = setTimeout(() => el.classList.add('hidden'), duration)
  }

  setHordeBanner(show) {
    this.el.hordeBanner.classList.toggle('hidden', !show)
  }

  // ---------------- inventory ----------------
  openInventory() {
    this.invOpen = true
    this.el.inventory.classList.remove('hidden')
    this.renderInventory()
  }

  closeInventory() {
    if (!this.invOpen) return
    this.invOpen = false
    this.el.inventory.classList.add('hidden')
    this.onCloseInv?.()
  }

  renderInventory() {
    const g = this.game
    const keys = ['wood', 'stone', 'iron', 'cloth', 'ammo', 'planks_block', 'cobble_block', 'axe', 'pick', 'pistol', 'food', 'water', 'bandage']
    this.el.invGrid.innerHTML = keys.map(k => {
      const n = g.inv[k] || 0
      const isTool = ['axe', 'pick', 'pistol'].includes(k)
      const amount = isTool ? (n > 0 ? 'READY' : '—') : n
      return `<div class="inv-cell ${n > 0 ? '' : 'empty'}" title="${ITEMS[k]?.name || k}">
        <span class="cell-count">${amount}</span>
        ${iconSVG(k)}
        <span>${ITEMS[k]?.name || k}</span>
      </div>`
    }).join('')
    this.el.recipes.innerHTML = RECIPES.map(r => {
      const ok = canCraft(g.inv, r)
      const costs = Object.entries(r.cost).map(([k, n]) => {
        const have = g.inv[k] || 0
        return `<span class="cost ${have >= n ? '' : 'missing'}">${ITEMS[k]?.name || k} <b>${have}/${n}</b></span>`
      }).join('')
      return `<div class="recipe" data-recipe="${r.id}">
        ${iconSVG(r.out)}
        <div class="recipe-main">
          <div class="recipe-name">${r.label}${r.count > 1 ? ` <span style="color:#8d8472">×${r.count}</span>` : ''}</div>
          <div class="recipe-cost">${costs}</div>
        </div>
        <button class="craft-btn" data-craft="${r.id}" ${ok ? '' : 'disabled'}>CRAFT</button>
      </div>`
    }).join('')
    this.el.recipes.querySelectorAll('[data-craft]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.onCraft?.(btn.dataset.craft)
      })
    })
  }

  // ---------------- end screens ----------------
  showDeath(stats) {
    this.el.deathStats.innerHTML = stats.map(s => `<div class="end-stat"><b>${s.value}</b><span>${s.label}</span></div>`).join('')
    this.el.death.classList.remove('hidden')
  }

  showVictory(stats) {
    this.el.victoryStats.innerHTML = stats.map(s => `<div class="end-stat"><b>${s.value}</b><span>${s.label}</span></div>`).join('')
    this.el.victory.classList.remove('hidden')
  }

  hideEndScreens() {
    this.el.death.classList.add('hidden')
    this.el.victory.classList.add('hidden')
    this.el.pause.classList.add('hidden')
  }

  showPause() { this.el.pause.classList.remove('hidden') }
  hidePause() { this.el.pause.classList.add('hidden') }
}

export { HOTBAR, TIME }
