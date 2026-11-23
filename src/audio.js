export class AudioFX {
  constructor() {
    this.ctx = null
    this.master = null
    this.muted = false
    this.listener = { x: 0, y: 0, z: 0 }
    this.wind = null
  }

  init() {
    if (this.ctx) { this.ctx.resume?.(); return }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.55
    this.master.connect(this.ctx.destination)
    const len = this.ctx.sampleRate * 2
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const data = this.noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    this.startWind()
  }

  setMuted(m) {
    this.muted = m
    if (this.master) this.master.gain.value = m ? 0 : 0.55
  }

  startWind() {
    if (!this.ctx) return
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.loop = true
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    const gain = this.ctx.createGain()
    gain.gain.value = 0.035
    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.02
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.master)
    src.start()
    lfo.start()
    this.wind = { src, gain, filter }
  }

  env(node, gain, attack, hold, decay) {
    const t = this.ctx.currentTime
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain.gain.value || 1), t + attack)
    gain.gain.setValueAtTime(gain.gain.value, t + attack + hold)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + hold + decay)
  }

  noise(dur = 0.2, gain = 0.3, filterType = 'lowpass', freq = 900, freqEnd = null) {
    if (!this.ctx) return
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const f = this.ctx.createBiquadFilter()
    f.type = filterType
    f.frequency.setValueAtTime(freq, this.ctx.currentTime)
    if (freqEnd) f.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + dur)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(gain, this.ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur)
    src.connect(f); f.connect(g); g.connect(this.master)
    src.start()
    src.stop(this.ctx.currentTime + dur + 0.02)
  }

  tone(freq, dur = 0.2, gain = 0.15, type = 'sine', freqEnd = null, delay = 0) {
    if (!this.ctx) return
    const t = this.ctx.currentTime + delay
    const o = this.ctx.createOscillator()
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), t + dur)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g); g.connect(this.master)
    o.start(t)
    o.stop(t + dur + 0.02)
  }

  spatial(pos, falloff = 0.09) {
    const dx = pos.x - this.listener.x, dy = pos.y - this.listener.y, dz = pos.z - this.listener.z
    return 1 / (1 + (dx * dx + dy * dy + dz * dz) * falloff)
  }

  gunshot() {
    this.noise(0.16, 0.55, 'highpass', 700, 180)
    this.noise(0.42, 0.3, 'lowpass', 420, 90)
    this.tone(150, 0.16, 0.28, 'square', 45)
  }
  dryFire() { this.tone(1400, 0.04, 0.08, 'square'); this.tone(900, 0.05, 0.06, 'square', 600, 0.05) }
  swing() { this.noise(0.14, 0.08, 'bandpass', 900, 350) }
  chop() { this.noise(0.1, 0.2, 'lowpass', 700, 250); this.tone(180, 0.09, 0.12, 'triangle', 90) }
  pickHit() { this.noise(0.08, 0.18, 'bandpass', 2200, 900); this.tone(620, 0.08, 0.08, 'square', 300) }
  breakBlock(hard = 1) { this.noise(0.28, 0.3, 'lowpass', 1100, 160); this.tone(120, 0.18, 0.16, 'triangle', 60) }
  flesh() { this.noise(0.1, 0.25, 'lowpass', 600, 180); this.tone(90, 0.12, 0.12, 'sawtooth', 55) }
  place() { this.noise(0.08, 0.2, 'lowpass', 800, 300); this.tone(210, 0.1, 0.1, 'triangle', 140) }
  pickup() { this.tone(760, 0.08, 0.07, 'triangle'); this.tone(1140, 0.1, 0.06, 'triangle', null, 0.05) }
  eat() { this.noise(0.09, 0.15, 'bandpass', 500, 300); this.noise(0.11, 0.12, 'bandpass', 800, 200) }
  drink() { this.tone(300, 0.16, 0.06, 'sine', 460); this.tone(420, 0.2, 0.04, 'sine', 620, 0.1) }
  heal() { [520, 660, 780].forEach((f, i) => this.tone(f, 0.25, 0.05, 'sine', null, i * 0.07)) }
  hurt() { this.tone(120, 0.22, 0.22, 'sawtooth', 70); this.noise(0.18, 0.18, 'lowpass', 500, 120) }
  levelUp() { [392, 523, 659, 784].forEach((f, i) => this.tone(f, 0.35, 0.08, 'triangle', null, i * 0.1)) }
  click() { this.tone(520, 0.05, 0.05, 'square') }
  error() { this.tone(160, 0.14, 0.1, 'square', 100) }
  death() { this.tone(180, 1.3, 0.2, 'sawtooth', 40); this.noise(1.4, 0.18, 'lowpass', 500, 60) }
  victory() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.7, 0.09, 'triangle', null, i * 0.16)) }

  zombieGrowl(pos, type = 'walker') {
    if (!this.ctx) return
    const vol = this.spatial(pos) * (type === 'brute' ? 0.5 : 0.28)
    if (vol < 0.02) return
    const t = this.ctx.currentTime
    const o = this.ctx.createOscillator()
    o.type = 'sawtooth'
    const base = type === 'runner' ? 150 : type === 'brute' ? 58 : 90
    o.frequency.setValueAtTime(base, t)
    o.frequency.linearRampToValueAtTime(base * 0.65, t + 0.5)
    const f = this.ctx.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = 500
    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 22 + Math.random() * 12
    const lg = this.ctx.createGain(); lg.gain.value = base * 0.14
    lfo.connect(lg); lg.connect(o.frequency)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol * 0.5, t + 0.08)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)
    o.connect(f); f.connect(g); g.connect(this.master)
    o.start(t); lfo.start(t)
    o.stop(t + 0.75); lfo.stop(t + 0.75)
  }

  hordeHorn() {
    if (!this.ctx) return
    const t = this.ctx.currentTime
    for (const [freq, delay] of [[55, 0], [82, 0.4], [41, 0.9]]) {
      const o = this.ctx.createOscillator()
      o.type = 'sawtooth'
      o.frequency.setValueAtTime(freq, t + delay)
      o.frequency.linearRampToValueAtTime(freq * 0.9, t + delay + 2.2)
      const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 220
      const g = this.ctx.createGain()
      g.gain.setValueAtTime(0.0001, t + delay)
      g.gain.exponentialRampToValueAtTime(0.18, t + delay + 0.25)
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + 2.4)
      o.connect(f); f.connect(g); g.connect(this.master)
      o.start(t + delay); o.stop(t + delay + 2.5)
    }
  }

  heartbeat() {
    this.tone(55, 0.13, 0.2, 'sine', 35)
    this.tone(50, 0.11, 0.14, 'sine', 32, 0.18)
  }
}
