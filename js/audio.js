/* LAST LIGHT — tiny procedural soundscape */
export function createAudio() {
  let ctx = null, master = null, started = false, enabled = true, rainGain = null, windGain = null;
  let noiseBuf = null;
  function makeNoise(seconds = 2) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const b = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < n; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + .02 * white) / 1.02;
      d[i] = last * 3.2 + white * .18;
    }
    return b;
  }
  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = enabled ? .72 : 0; master.connect(ctx.destination);
    noiseBuf = makeNoise(3);
    // rain hiss
    const rainSrc = ctx.createBufferSource(); rainSrc.buffer = noiseBuf; rainSrc.loop = true;
    const rainHP = ctx.createBiquadFilter(); rainHP.type = 'highpass'; rainHP.frequency.value = 1500;
    const rainLP = ctx.createBiquadFilter(); rainLP.type = 'lowpass'; rainLP.frequency.value = 5200;
    rainGain = ctx.createGain(); rainGain.gain.value = .02;
    rainSrc.connect(rainHP).connect(rainLP).connect(rainGain).connect(master);
    rainSrc.start();
    // low wind bed
    const windSrc = ctx.createBufferSource(); windSrc.buffer = noiseBuf; windSrc.loop = true;
    const windLP = ctx.createBiquadFilter(); windLP.type = 'lowpass'; windLP.frequency.value = 240;
    windGain = ctx.createGain(); windGain.gain.value = .028;
    const lfo = ctx.createOscillator(); lfo.frequency.value = .07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = .014;
    lfo.connect(lfoGain).connect(windGain.gain); lfo.start();
    windSrc.connect(windLP).connect(windGain).connect(master);
    windSrc.start();
    started = true;
  }
  function noiseHit(dur, gain, freq, type = 'bandpass', q = .8, rate = 1) {
    if (!ctx || !started) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = noiseBuf; src.playbackRate.value = rate;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    src.connect(f).connect(g).connect(master);
    src.start(t); src.stop(t + dur + .02);
  }
  function tone(freq, dur, gain, type = 'sine', slide = 0) {
    if (!ctx || !started) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(.0002, gain), t + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(master); o.start(t); o.stop(t + dur + .05);
  }
  return {
    init,
    get ready() { return started; },
    toggle() { enabled = !enabled; if (master) master.gain.value = enabled ? .72 : 0; return enabled; },
    setNight(f) {
      if (rainGain) rainGain.gain.value = .012 + f * .02;
      if (windGain) windGain.gain.value = .02 + f * .018;
    },
    step(sprint) {
      noiseHit(sprint ? .07 : .09, sprint ? .05 : .032, sprint ? 380 : 280, 'bandpass', 1.2, .8 + Math.random() * .4);
    },
    swing() { noiseHit(.16, .028, 900, 'bandpass', 1.5, 2.2); },
    hit() {
      noiseHit(.14, .11, 420, 'lowpass', .6, .7);
      tone(78, .12, .09, 'sine', -24);
    },
    gore() {
      noiseHit(.22, .1, 240, 'lowpass', .8, .5);
      tone(53, .24, .07, 'sine', -16);
    },
    shot() {
      noiseHit(.3, .24, 1800, 'highpass', .6, 1.1);
      noiseHit(.18, .2, 500, 'lowpass', .5, .7);
      tone(64, .22, .16, 'sine', -30);
    },
    empty() { tone(1200, .035, .03, 'square'); },
    pickup() { tone(520, .08, .035, 'triangle'); setTimeout(() => tone(760, .09, .03, 'triangle'), 60); },
    craft() { tone(320, .1, .04, 'square'); setTimeout(() => tone(470, .14, .035, 'square'), 90); },
    hammer() {
      noiseHit(.07, .07, 1300, 'bandpass', 2, 1.3);
      tone(180, .08, .06, 'sine', -60);
    },
    door(open) {
      noiseHit(.24, .05, open ? 680 : 420, 'bandpass', 3, .6);
      tone(open ? 180 : 140, .22, .025, 'sawtooth', open ? 40 : -30);
    },
    groan(vol) {
      if (!started) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'sawtooth';
      const base = 64 + Math.random() * 34;
      o.frequency.setValueAtTime(base, t);
      o.frequency.linearRampToValueAtTime(base * .7, t + 1.1);
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 340; f.Q.value = 3;
      const g = ctx.createGain();
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(.001, vol), t + .18);
      g.gain.exponentialRampToValueAtTime(.0001, t + 1.2);
      o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + 1.3);
    },
    heartbeat() { tone(48, .18, .12, 'sine'); setTimeout(() => tone(42, .2, .09, 'sine'), 170); },
    hurt() { noiseHit(.2, .1, 300, 'lowpass', .6, .5); },
    nightfall() {
      tone(60, 2.2, .1, 'sine', -18);
      setTimeout(() => tone(48, 2.6, .08, 'sine', -10), 400);
    },
    win() { [392, 494, 587, 784].forEach((f, i) => setTimeout(() => tone(f, .7, .05, 'triangle'), i * 160)); },
    lose() { [196, 164, 130, 98].forEach((f, i) => setTimeout(() => tone(f, 1.0, .06, 'sine'), i * 240)); },
  };
}
