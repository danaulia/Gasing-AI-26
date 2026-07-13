// canvas-bg.js — Zenith Prime Labs
// Cosmic Particle Background + 4 Season Particle Effects

class CyberCosmicBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };
    this.particleCount = 80;
    this.currentSeason = localStorage.getItem('zpl_season') || 'spring';
    this.init();
    this.animate();
    this.setupEventListeners();
    this.initSeasonCanvas();
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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2 + 0.4,
      alpha: Math.random() * 0.35 + 0.08,
      pulseSpeed: Math.random() * 0.008 + 0.003,
      pulseDir: 1,
    };
  }

  setupEventListeners() {
    window.addEventListener('resize', () => { this.resizeCanvas(); this.init(); this.resizeSeasonCanvas(); });
    window.addEventListener('mousemove', e => { this.mouse.x = e.x; this.mouse.y = e.y; });
    window.addEventListener('mouseout', () => { this.mouse.x = null; this.mouse.y = null; });
  }

  isDark() { return document.body.classList.contains('dark-theme'); }

  getSeasonBgColors() {
    const dark = this.isDark();
    const season = this.currentSeason;
    if (season === 'spring') {
      return dark
        ? { base: '#16101A', g1: 'rgba(139,92,246,0.10)', g2: 'rgba(244,63,94,0.07)' }
        : { base: '#FBF7F4', g1: 'rgba(253,164,175,0.12)', g2: 'rgba(196,181,253,0.10)' };
    } else if (season === 'summer') {
      return dark
        ? { base: '#0A1A12', g1: 'rgba(52,211,153,0.12)', g2: 'rgba(16,185,129,0.08)' }
        : { base: '#F0FDF4', g1: 'rgba(167,243,208,0.20)', g2: 'rgba(52,211,153,0.10)' };
    } else if (season === 'autumn') {
      return dark
        ? { base: '#18100A', g1: 'rgba(249,115,22,0.12)', g2: 'rgba(245,158,11,0.08)' }
        : { base: '#FFFBEB', g1: 'rgba(253,186,116,0.20)', g2: 'rgba(251,191,36,0.12)' };
    } else { // winter
      return dark
        ? { base: '#0A1020', g1: 'rgba(56,189,248,0.12)', g2: 'rgba(129,140,248,0.08)' }
        : { base: '#F0F9FF', g1: 'rgba(186,230,253,0.25)', g2: 'rgba(196,181,253,0.12)' };
    }
  }

  getParticleColors() {
    const dark = this.isDark();
    const s = this.currentSeason;
    if (s === 'spring') return dark ? ['196,181,253','244,114,182','125,211,252'] : ['253,164,175','196,181,253','147,197,253'];
    if (s === 'summer') return dark ? ['110,231,183','52,211,153','16,185,129'] : ['167,243,208','52,211,153','134,239,172'];
    if (s === 'autumn') return dark ? ['253,186,116','251,191,36','249,115,22'] : ['253,186,116','251,191,36','253,211,77'];
    return dark ? ['125,211,252','165,180,252','196,181,253'] : ['186,230,253','196,181,253','165,180,252']; // winter
  }

  setSeason(season) {
    this.currentSeason = season;
    this.reinitSeasonParticles();
  }

  drawBackground() {
    const colors = this.getSeasonBgColors();
    this.ctx.fillStyle = colors.base;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const time = Date.now() * 0.00025;
    this._drawGradient(
      this.canvas.width * (0.35 + 0.12 * Math.sin(time)),
      this.canvas.height * (0.45 + 0.1 * Math.cos(time * 0.7)),
      this.canvas.width * 0.5, colors.g1, 'rgba(0,0,0,0)'
    );
    this._drawGradient(
      this.canvas.width * (0.68 + 0.1 * Math.cos(time * 0.8)),
      this.canvas.height * (0.35 + 0.12 * Math.sin(time * 0.55)),
      this.canvas.width * 0.38, colors.g2, 'rgba(0,0,0,0)'
    );
  }

  _drawGradient(cx, cy, r, innerColor, outerColor) {
    const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(1, outerColor);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    const colors = this.getParticleColors();
    this.drawBackground();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = this.canvas.width + 5;
      if (p.x > this.canvas.width + 5) p.x = -5;
      if (p.y < -5) p.y = this.canvas.height + 5;
      if (p.y > this.canvas.height + 5) p.y = -5;
      p.alpha += p.pulseSpeed * p.pulseDir;
      if (p.alpha > 0.42 || p.alpha < 0.05) p.pulseDir *= -1;

      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x, dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= dx * force * 0.012;
          p.y -= dy * force * 0.012;
        }
      }

      const color = colors[i % colors.length];
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x, dy = p.y - p2.y;
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

      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x, dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const a = ((this.mouse.radius - dist) / this.mouse.radius) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${color}, ${a})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  // ─── SEASON PARTICLE EFFECTS ───
  initSeasonCanvas() {
    this.seasonCanvas = document.getElementById('season-canvas');
    if (!this.seasonCanvas) return;
    this.sCtx = this.seasonCanvas.getContext('2d');
    this.resizeSeasonCanvas();
    this.seasonParticles = [];
    this.reinitSeasonParticles();
    this.animateSeason();
  }

  resizeSeasonCanvas() {
    if (!this.seasonCanvas) return;
    this.seasonCanvas.width = window.innerWidth;
    this.seasonCanvas.height = window.innerHeight;
  }

  reinitSeasonParticles() {
    this.seasonParticles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      this.seasonParticles.push(this.createSeasonParticle());
    }
  }

  createSeasonParticle() {
    const W = window.innerWidth, H = window.innerHeight;
    const s = this.currentSeason;
    const base = {
      x: Math.random() * W,
      y: -20 - Math.random() * 200,
      size: 6 + Math.random() * 14,
      alpha: 0.4 + Math.random() * 0.5,
      speed: 0.6 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: 0.01 + Math.random() * 0.015,
      swingAmp: 20 + Math.random() * 40,
    };
    // Season-specific
    if (s === 'spring') { base.emoji = '🌸'; base.color = null; }
    else if (s === 'summer') { base.emoji = '🍀'; base.color = null; }
    else if (s === 'autumn') { base.emoji = '🍁'; base.color = null; }
    else { // winter
      base.emoji = null;
      base.color = 'rgba(186,230,253,0.7)';
      base.size = 2 + Math.random() * 6;
      base.speed = 0.5 + Math.random() * 1;
    }
    return base;
  }

  animateSeason() {
    if (!this.sCtx || !this.seasonCanvas) return;
    const W = this.seasonCanvas.width, H = this.seasonCanvas.height;
    this.sCtx.clearRect(0, 0, W, H);

    this.seasonParticles.forEach((p, idx) => {
      // Move
      p.swing += p.swingSpeed;
      p.x += p.drift + Math.sin(p.swing) * 0.5;
      p.y += p.speed;
      p.rotation += p.rotSpeed;

      // Reset when off screen
      if (p.y > H + 30) {
        this.seasonParticles[idx] = this.createSeasonParticle();
        this.seasonParticles[idx].x = Math.random() * W;
        return;
      }

      this.sCtx.save();
      this.sCtx.globalAlpha = p.alpha;
      this.sCtx.translate(p.x, p.y);
      this.sCtx.rotate(p.rotation);

      if (p.emoji) {
        this.sCtx.font = `${p.size * 2}px serif`;
        this.sCtx.textAlign = 'center';
        this.sCtx.textBaseline = 'middle';
        this.sCtx.fillText(p.emoji, 0, 0);
      } else {
        // Snowflake — draw ❄ shape
        this.sCtx.strokeStyle = p.color;
        this.sCtx.lineWidth = 1.2;
        for (let a = 0; a < 6; a++) {
          this.sCtx.save();
          this.sCtx.rotate((a * Math.PI) / 3);
          this.sCtx.beginPath();
          this.sCtx.moveTo(0, 0);
          this.sCtx.lineTo(0, p.size);
          this.sCtx.moveTo(0, p.size * 0.5);
          this.sCtx.lineTo(p.size * 0.25, p.size * 0.3);
          this.sCtx.moveTo(0, p.size * 0.5);
          this.sCtx.lineTo(-p.size * 0.25, p.size * 0.3);
          this.sCtx.stroke();
          this.sCtx.restore();
        }
      }
      this.sCtx.restore();
    });

    requestAnimationFrame(() => this.animateSeason());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberBg = new CyberCosmicBackground('cosmic-canvas');
});
