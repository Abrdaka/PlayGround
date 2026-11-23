import * as THREE from 'three'

const PALETTE = [
  { t: 0.00, top: 0x02050c, hor: 0x0a111b, fog: 0x0a1018, light: 0x8aa2c8, sun: 0.16, hemi: 0.32, hsky: 0x23344c, hground: 0x0d0f12, stars: 1, exp: 1.05 },
  { t: 0.22, top: 0x03060e, hor: 0x0d141e, fog: 0x0b1119, light: 0x8aa2c8, sun: 0.14, hemi: 0.3, hsky: 0x23344c, hground: 0x0d0f12, stars: 1, exp: 1.05 },
  { t: 0.27, top: 0x1e2a42, hor: 0xc27a58, fog: 0x8a7368, light: 0xffb184, sun: 0.75, hemi: 0.55, hsky: 0x7f8ea8, hground: 0x3a3128, stars: 0.25, exp: 1.0 },
  { t: 0.34, top: 0x4a83b6, hor: 0xc2d8e1, fog: 0xbccfd8, light: 0xfff2d9, sun: 1.35, hemi: 1.0, hsky: 0xa8c9dc, hground: 0x635846, stars: 0, exp: .96 },
  { t: 0.62, top: 0x447daf, hor: 0xc9dce4, fog: 0xc1d1d9, light: 0xfff0d4, sun: 1.32, hemi: 1.0, hsky: 0xa8c9dc, hground: 0x635846, stars: 0, exp: .96 },
  { t: 0.74, top: 0x3a5d8a, hor: 0xe3a671, fog: 0xc9ac93, light: 0xffd09a, sun: 1.05, hemi: 0.82, hsky: 0xa9b4c4, hground: 0x584a38, stars: 0, exp: .98 },
  { t: 0.80, top: 0x28324e, hor: 0xd0653c, fog: 0x9b6a54, light: 0xff9358, sun: 0.7, hemi: 0.5, hsky: 0x7f86a0, hground: 0x3e3228, stars: 0.35, exp: 1.02 },
  { t: 0.86, top: 0x0a0f1c, hor: 0x1c1f2a, fog: 0x121821, light: 0x8aa2c8, sun: 0.15, hemi: 0.32, hsky: 0x23344c, hground: 0x0d0f12, stars: 1, exp: 1.05 },
  { t: 1.00, top: 0x02050c, hor: 0x0a111b, fog: 0x0a1018, light: 0x8aa2c8, sun: 0.16, hemi: 0.32, hsky: 0x23344c, hground: 0x0d0f12, stars: 1, exp: 1.05 },
]

function spriteTexture(kind) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  if (kind === 'sun') {
    const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62)
    g.addColorStop(0, 'rgba(255,252,235,1)')
    g.addColorStop(0.22, 'rgba(255,238,190,1)')
    g.addColorStop(0.45, 'rgba(255,196,120,.55)')
    g.addColorStop(1, 'rgba(255,150,60,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128)
  } else {
    const g = ctx.createRadialGradient(64, 64, 18, 64, 64, 62)
    g.addColorStop(0, 'rgba(240,246,255,1)')
    g.addColorStop(0.4, 'rgba(214,228,245,1)')
    g.addColorStop(0.62, 'rgba(170,190,215,.35)')
    g.addColorStop(1, 'rgba(140,160,190,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(64, 64, 62, 0, 7); ctx.fill()
    ctx.fillStyle = 'rgba(160,175,195,.55)'
    for (const [x, y, r] of [[52, 50, 9], [76, 72, 12], [60, 84, 6], [80, 44, 5]]) {
      ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill()
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class Sky {
  constructor(scene) {
    this.scene = scene
    const geo = new THREE.SphereGeometry(480, 32, 20)
    this.material = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x3f7bb0) },
        horizonColor: { value: new THREE.Color(0xb9d2de) },
        glowColor: { value: new THREE.Color(0xffd9a0) },
        sunDir: { value: new THREE.Vector3(0.4, 0.3, -0.6).normalize() },
        glowStrength: { value: 0.5 },
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vDir;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 glowColor;
        uniform vec3 sunDir;
        uniform float glowStrength;
        void main() {
          float h = clamp(vDir.y, -1.0, 1.0);
          float grad = pow(clamp(h, 0.0, 1.0), 0.42);
          vec3 col = mix(horizonColor, topColor, grad);
          float glow = pow(max(dot(normalize(vDir), normalize(sunDir)), 0.0), 6.0);
          col += glowColor * glow * glowStrength;
          if (h < 0.0) col = mix(horizonColor, col * 0.55, clamp(-h * 3.0, 0.0, 1.0));
          gl_FragColor = vec4(col, 1.0);
        }`,
    })
    this.dome = new THREE.Mesh(geo, this.material)
    this.dome.frustumCulled = false
    this.dome.renderOrder = -10
    scene.add(this.dome)

    // Stars
    const starGeo = new THREE.BufferGeometry()
    const starPos = []
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * Math.PI * 2
      const y = Math.pow(Math.random(), 0.6) * 0.95 + 0.03
      const r = Math.sqrt(1 - y * y)
      starPos.push(Math.cos(a) * r * 430, y * 430, Math.sin(a) * r * 430)
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    this.starMat = new THREE.PointsMaterial({ color: 0xdfe8ff, size: 1.8, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false })
    this.stars = new THREE.Points(starGeo, this.starMat)
    this.stars.frustumCulled = false
    this.stars.renderOrder = -9
    scene.add(this.stars)

    this.sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteTexture('sun'), transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }))
    this.sunSprite.scale.setScalar(110)
    this.sunSprite.renderOrder = -8
    scene.add(this.sunSprite)
    this.moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteTexture('moon'), transparent: true, depthWrite: false, fog: false }))
    this.moonSprite.scale.setScalar(58)
    this.moonSprite.renderOrder = -8
    scene.add(this.moonSprite)

    this.sunLight = new THREE.DirectionalLight(0xfff1d8, 1.7)
    this.sunLight.position.set(40, 70, 20)
    scene.add(this.sunLight)
    scene.add(this.sunLight.target)
    this.hemi = new THREE.HemisphereLight(0x9fc3d8, 0x5b5141, 0.85)
    scene.add(this.hemi)
    this.ambient = new THREE.AmbientLight(0xffffff, 0.12)
    scene.add(this.ambient)

    this.palette = { top: new THREE.Color(), hor: new THREE.Color(), fog: new THREE.Color(), light: new THREE.Color(), stars: 0, sunI: 1.7, hemiI: 0.85, exp: 1 }
    this._tmpA = new THREE.Color(); this._tmpB = new THREE.Color()

    // High, soft clouds for depth in the sky.
    const cc = document.createElement('canvas')
    cc.width = cc.height = 256
    const cctx = cc.getContext('2d')
    cctx.filter = 'blur(7px)'
    cctx.fillStyle = 'rgba(255,255,255,0.92)'
    for (const [x, y, rx, ry] of [[128, 128, 74, 34], [82, 118, 44, 24], [174, 140, 52, 26], [120, 104, 38, 20], [152, 112, 30, 18]]) {
      cctx.beginPath(); cctx.ellipse(x, y, rx, ry, 0.2, 0, 7); cctx.fill()
    }
    const cloudTex = new THREE.CanvasTexture(cc)
    cloudTex.colorSpace = THREE.SRGBColorSpace
    this.cloudMat = new THREE.MeshBasicMaterial({ map: cloudTex, transparent: true, opacity: 0.55, depthWrite: false, fog: false, color: 0xffffff })
    this.clouds = new THREE.Group()
    for (let i = 0; i < 16; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.cloudMat)
      const a = Math.random() * Math.PI * 2
      const r = 120 + Math.random() * 190
      m.position.set(Math.cos(a) * r, 72 + Math.random() * 46, Math.sin(a) * r)
      m.rotation.x = -Math.PI / 2
      m.rotation.z = Math.random() * Math.PI
      const s = 60 + Math.random() * 110
      m.scale.set(s, s * (0.5 + Math.random() * 0.4), 1)
      this.clouds.add(m)
    }
    this.clouds.renderOrder = -7
    scene.add(this.clouds)
  }

  lerpPalette(t, horde) {
    let a = PALETTE[0], b = PALETTE[PALETTE.length - 1]
    for (let i = 0; i < PALETTE.length - 1; i++) {
      if (t >= PALETTE[i].t && t <= PALETTE[i + 1].t) { a = PALETTE[i]; b = PALETTE[i + 1]; break }
    }
    const span = Math.max(0.0001, b.t - a.t)
    const f = Math.min(1, Math.max(0, (t - a.t) / span))
    const mixC = (ca, cb, out) => out.copy(this._tmpA.setHex(ca)).lerp(this._tmpB.setHex(cb), f)
    mixC(a.top, b.top, this.palette.top)
    mixC(a.hor, b.hor, this.palette.hor)
    mixC(a.fog, b.fog, this.palette.fog)
    mixC(a.light, b.light, this.palette.light)
    this.palette.stars = a.stars + (b.stars - a.stars) * f
    this.palette.sunI = a.sun + (b.sun - a.sun) * f
    this.palette.hemiI = a.hemi + (b.hemi - a.hemi) * f
    this.palette.exp = a.exp + (b.exp - a.exp) * f
    this.hemi.color.copy(this._tmpA.setHex(a.hsky)).lerp(this._tmpB.setHex(b.hsky), f)
    this.hemi.groundColor.copy(this._tmpA.setHex(a.hground)).lerp(this._tmpB.setHex(b.hground), f)
    if (horde) {
      const night = this.palette.stars
      this.palette.top.lerp(this._tmpA.setHex(0x1a0709), 0.55 * night)
      this.palette.hor.lerp(this._tmpA.setHex(0x7d1c10), 0.5 * night)
      this.palette.fog.lerp(this._tmpA.setHex(0x3d100c), 0.5 * night)
      this.palette.light.lerp(this._tmpA.setHex(0xff5638), 0.6 * night)
      this.hemi.color.lerp(this._tmpA.setHex(0x5c1a12), 0.45 * night)
    }
  }

  update(time, horde, cameraPos, playerPos, nightAmount) {
    this.lerpPalette(time, horde)
    const P = this.palette
    this.material.uniforms.topColor.value.copy(P.top)
    this.material.uniforms.horizonColor.value.copy(P.hor)
    this.material.uniforms.glowColor.value.copy(P.light)
    this.dome.position.set(cameraPos.x, 0, cameraPos.z)
    this.stars.position.set(cameraPos.x, 0, cameraPos.z)
    this.starMat.opacity = Math.min(1, P.stars) * 0.95
    this.starMat.size = 1.7
    this.clouds.position.set(cameraPos.x, 0, cameraPos.z)
    this.clouds.rotation.y = performance.now() * 0.0000035
    this.cloudMat.opacity = 0.16 + (1 - Math.min(1, P.stars)) * 0.4
    this.cloudMat.color.setHex(horde ? 0xb07870 : 0xffffff).lerp(P.light, 0.22)

    const angle = (time - 0.25) * Math.PI * 2
    const sunDir = new THREE.Vector3(Math.cos(angle) * 0.75, Math.sin(angle), -0.55).normalize()
    this.material.uniforms.sunDir.value.copy(sunDir)
    this.material.uniforms.glowStrength.value = 0.35 + Math.max(0, sunDir.y) * 0.7
    const sunVisible = sunDir.y > -0.06
    this.sunSprite.visible = sunVisible
    this.sunSprite.position.set(cameraPos.x + sunDir.x * 380, sunDir.y * 380, cameraPos.z + sunDir.z * 380)
    const moonDir = sunDir.clone().multiplyScalar(-1)
    this.moonSprite.visible = moonDir.y > -0.02
    this.moonSprite.position.set(cameraPos.x + moonDir.x * 380, moonDir.y * 380, cameraPos.z + moonDir.z * 380)
    this.moonSprite.material.color.setHex(horde ? 0xff7a5a : 0xffffff)
    this.moonSprite.scale.setScalar(horde ? 70 : 52)
    this.sunSprite.material.opacity = sunVisible ? 1 : 0

    this.sunLight.color.copy(P.light)
    this.sunLight.intensity = P.sunI
    this.sunLight.position.set(playerPos.x + sunDir.x * 60, Math.max(8, playerPos.y + sunDir.y * 80 + 20), playerPos.z + sunDir.z * 60)
    this.sunLight.target.position.set(playerPos.x, playerPos.y, playerPos.z)
    this.hemi.intensity = P.hemiI
    this.ambient.intensity = 0.18 + nightAmount * 0.04

    if (this.scene.fog) {
      this.scene.fog.color.copy(P.fog)
      this.scene.fog.near = 32
      this.scene.fog.far = horde ? 78 : 118 - nightAmount * 26
    }
    return P
  }
}
