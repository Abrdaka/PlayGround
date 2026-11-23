export function setupMobile(game, input) {
  const ui = game.ui
  if (!ui.isTouch) return null
  const stickZone = document.getElementById('stick-zone')
  const knob = document.getElementById('stick-knob')
  const canvas = game.canvas
  let stickId = null, lookId = null
  let lookX = 0, lookY = 0, moved = 0
  const maxR = 38

  const resetStick = () => {
    stickId = null
    knob.style.transform = 'translate(0px, 0px)'
    input.forward = input.back = input.left = input.right = false
  }

  stickZone.addEventListener('pointerdown', (e) => {
    e.preventDefault(); e.stopPropagation()
    game.audio.init()
    stickId = e.pointerId
    stickZone.setPointerCapture(e.pointerId)
    handleStick(e)
  })
  const handleStick = (e) => {
    const r = stickZone.getBoundingClientRect()
    let dx = e.clientX - (r.left + r.width / 2)
    let dy = e.clientY - (r.top + r.height / 2)
    const len = Math.hypot(dx, dy)
    if (len > maxR) { dx = dx / len * maxR; dy = dy / len * maxR }
    knob.style.transform = `translate(${dx}px, ${dy}px)`
    const nx = dx / maxR, ny = dy / maxR
    input.forward = ny < -0.24
    input.back = ny > 0.32
    input.left = nx < -0.24
    input.right = nx > 0.24
    input.sprint = ny < -0.72
  }
  stickZone.addEventListener('pointermove', (e) => { if (e.pointerId === stickId) { e.preventDefault(); handleStick(e) } })
  const endStick = (e) => { if (e.pointerId === stickId) resetStick() }
  stickZone.addEventListener('pointerup', endStick)
  stickZone.addEventListener('pointercancel', endStick)
  stickZone.addEventListener('lostpointercapture', endStick)

  // Look / drag on the world.
  canvas.addEventListener('pointerdown', (e) => {
    if (game.state !== 'playing' || game.paused) return
    if (lookId !== null) return
    lookId = e.pointerId
    lookX = e.clientX; lookY = e.clientY; moved = 0
    game.audio.init()
  })
  window.addEventListener('pointermove', (e) => {
    if (e.pointerId !== lookId) return
    const dx = e.clientX - lookX, dy = e.clientY - lookY
    lookX = e.clientX; lookY = e.clientY
    moved += Math.abs(dx) + Math.abs(dy)
    game.look(dx * 1.9, dy * 1.9)
  })
  const endLook = (e) => { if (e.pointerId === lookId) { lookId = null } }
  window.addEventListener('pointerup', endLook)
  window.addEventListener('pointercancel', endLook)

  const bindHold = (id, on, off) => {
    const el = document.getElementById(id)
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation()
      game.audio.init()
      el.setPointerCapture(e.pointerId)
      on()
    })
    const up = (e) => { e.preventDefault(); off() }
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('pointerleave', (e) => { if (e.buttons) off() })
  }

  bindHold('mob-mine', () => { input.attack = true; input.attackPressed = true }, () => { input.attack = false })
  bindHold('mob-jump', () => { input.jump = true }, () => { input.jump = false })
  document.getElementById('mob-place').addEventListener('pointerdown', (e) => {
    e.preventDefault(); e.stopPropagation()
    input.placeQueued = true
  })

  document.getElementById('mob-pack').addEventListener('click', (e) => { e.stopPropagation(); game.openInventory() })
  document.getElementById('mob-pause').addEventListener('click', (e) => { e.stopPropagation(); game.pause() })

  // Keep the page from scrolling / zooming on touch.
  document.addEventListener('gesturestart', (e) => e.preventDefault())
  document.addEventListener('dblclick', (e) => e.preventDefault())

  return { resetStick }
}
