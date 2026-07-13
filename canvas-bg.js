// canvas-bg.js
// Soft Cosmic Particle Background — Sakura Nexus Design System
// Gentle drifting particles in pastel rose, lavender & sky tones

class CyberCosmicBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };
    this.particleCount = 80;

    this.init();
    this.animate();
    this.setupEventListeners();
  }

  init() {
    this.resizeCanvas();
    this.particles = [];
    const area = this.canvas.width * this.canvas.height;
    this.particleCount = Math.min(Math.floor(area / 20000), 80);
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  resizeCanvas() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x:          Math.random() * this.canvas.width,
      y:          Math.random() * this.canvas.height,
      vx:         (Math.random() - 0.5) * 0.25,   // very slow drift
      vy:         (Math.random() - 0.5) * 0.25,
      radius:     Math.random() * 2 + 0.4,
      alpha:      Math.random() * 0.35 + 0.08,
      pulseSpeed: Math.random() * 0.008 + 0.003,
      pulseDir:   1,
    };
  }

  setupEventListeners() {
    window.addEventListener('resize', () => { this.resizeCanvas(); this.init(); });
    window.addEventListener('mousemove', e => { this.mouse.x = e.x; this.mouse.y = e.y; });
    window.addEventListener('mouseout',  () => { this.mouse.x = null; this.mouse.y = null; });
  }

  isDark() {
    return document.body.classList.contains('dark-theme');
  }

  drawBackground() {
    if (this.isDark()) {
      // Warm midnight — deep plum base
      this.ctx.fillStyle = '#16101A';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Soft warm nebula gradients
      const time = Date.now() * 0.00025;
      this._drawGradient(
        this.canvas.width * (0.4 + 0.15 * Math.sin(time)),
        this.canvas.height * (0.4 + 0.12 * Math.cos(time * 0.7)),
        this.canvas.width * 0.55,
        'rgba(139, 92, 246, 0.10)',  // violet
        'rgba(0,0,0,0)'
      );
      this._drawGradient(
        this.canvas.width * (0.65 + 0.1 * Math.cos(time * 0.8)),
        this.canvas.height * (0.55 + 0.1 * Math.sin(time * 0.5)),
        this.canvas.width * 0.4,
        'rgba(244, 63, 94, 0.07)',   // rose
        'rgba(0,0,0,0)'
      );
    } else {
      // Supernova light — warm cream base
      this.ctx.fillStyle = '#FBF7F4';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      const time = Date.now() * 0.00025;
      this._drawGradient(
        this.canvas.width * (0.35 + 0.12 * Math.sin(time)),
        this.canvas.height * (0.45 + 0.1 * Math.cos(time * 0.7)),
        this.canvas.width * 0.5,
        'rgba(253, 164, 175, 0.12)',  // soft rose
        'rgba(255,255,255,0)'
      );
      this._drawGradient(
        this.canvas.width * (0.68 + 0.1 * Math.cos(time * 0.8)),
        this.canvas.height * (0.35 + 0.12 * Math.sin(time * 0.55)),
        this.canvas.width * 0.38,
        'rgba(196, 181, 253, 0.10)',  // soft lavender
        'rgba(255,255,255,0)'
      );
      this._drawGradient(
        this.canvas.width * (0.2 + 0.08 * Math.sin(time * 0.6)),
        this.canvas.height * (0.7 + 0.08 * Math.cos(time * 0.4)),
        this.canvas.width * 0.32,
        'rgba(186, 230, 253, 0.09)',  // soft sky
        'rgba(255,255,255,0)'
      );
    }
  }

  _drawGradient(cx, cy, r, innerColor, outerColor) {
    const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(1, outerColor);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    const dark = this.isDark();

    // Soft color palette per theme
    const colors = dark
      ? ['196, 181, 253', '244, 114, 182', '125, 211, 252']  // lavender, pink, sky
      : ['253, 164, 175', '196, 181, 253', '147, 197, 253']; // rose, lavender, sky

    this.drawBackground();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges (soft reappear on opposite side)
      if (p.x < -5) p.x = this.canvas.width + 5;
      if (p.x > this.canvas.width + 5) p.x = -5;
      if (p.y < -5) p.y = this.canvas.height + 5;
      if (p.y > this.canvas.height + 5) p.y = -5;

      // Pulse alpha gently
      p.alpha += p.pulseSpeed * p.pulseDir;
      if (p.alpha > 0.42 || p.alpha < 0.05) p.pulseDir *= -1;

      // Very subtle mouse attraction
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= dx * force * 0.012;
          p.y -= dy * force * 0.012;
        }
      }

      // Pick color round-robin
      const color = colors[i % colors.length];

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
      this.ctx.fill();

      // Connect nearby particles with very soft lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2  = this.particles[j];
        const dx  = p.x - p2.x;
        const dy  = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const a = ((110 - dist) / 110) * 0.08;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${color}, ${a})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }

      // Connect to mouse — very subtle
      if (this.mouse.x !== null) {
        const dx   = p.x - this.mouse.x;
        const dy   = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const a = ((this.mouse.radius - dist) / this.mouse.radius) * 0.12;
          const mColor = dark ? '196, 181, 253' : '253, 164, 175';
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${mColor}, ${a})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberBg = new CyberCosmicBackground('cosmic-canvas');
});
