// ─── PROJECT SPECIFICATION MODALS ──────────────────────────
const PROJECT_MODALS = {
  'stealth-recon': {
    title: '🔍 Stealth Recon — OSINT Intelligence Portal',
    image: 'assets/gallery_anime_1.png',
    spec: 'Alat investigasi digital yang melacak keberadaan target di internet menggunakan visual reverse search dan web crawling.',
    status: 'READY FOR OPERATION',
    link: 'stealth-recon/index.html'
  },
  'ai-media-analyzer': {
    title: '🎭 AI Media Analyzer — Deteksi Keaslian',
    image: 'assets/gallery_anime_4.png',
    spec: 'Sistem analisis komputer vision terintegrasi untuk mendeteksi rekayasa piksel generatif dan manipulasi metadata media.',
    status: 'R&D DEPLOYED',
    link: '#'
  },
  'cheap-hunter': {
    title: '📈 Cheap Hunter — Scraper Pemantau Harga',
    image: 'assets/gallery_anime_3.png',
    spec: 'Scraper terotomatisasi untuk memantau fluktuasi harga komoditas global secara real-time.',
    status: 'STABLE TESTING',
    link: '#'
  },
  'quantum-key': {
    title: '🔐 Quantum Key Distribution — RSA-Q4096',
    image: 'assets/gallery_anime_2.png',
    spec: 'Algoritma kriptografi kuantum dengan pengamanan saluran serat optik dinamis antar divisi.',
    status: 'ACTIVE DEMO',
    link: '#'
  }
};

// ─── MAIN APP CLASS ─────────────────────────────────────────
class AetheriaApp {
  constructor() {
    this.currentSlide = 0;
    this.slideInterval = null;
    this.userCount = 342;

    this.initDOM();
    this.setupRouter();
    this.setupCarousel();
    this.setupUserCountTicker();
    this.setupThemeToggle();
    this.setupGalleryLightbox();
    this.setupProjectVirtual();
    this.setupDashboardTabs();
    this.setupMusicHUD();
    this.setupExportRecap();

    window.initIcons();
    this.navigate('home');
  }

  initDOM() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.pages = document.querySelectorAll('.app-page');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.carouselDots = document.querySelectorAll('.carousel-dot');
    this.userCountElement = document.getElementById('realtime-user-count');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.navContainer = document.getElementById('nav-menu-links');
  }

  setupRouter() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-target');
        if (window.cyberAuth) window.cyberAuth.playBeep(700, 'sine', 0.05);
        this.navigate(targetPage);
        if (this.navContainer.classList.contains('mobile-active')) {
          this.navContainer.classList.remove('mobile-active');
        }
      });
    });
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => {
        if (window.cyberAuth) window.cyberAuth.playBeep(600, 'triangle', 0.05);
        this.navContainer.classList.toggle('mobile-active');
      });
    }
  }

  navigate(pageId) {
    this.pages.forEach(page => {
      page.classList.toggle('active', page.id === pageId);
    });
    this.navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-target') === pageId);
    });
    if (pageId === 'dashboard' && window.cyberDashboard) {
      window.cyberDashboard.updateChartsTheme();
    }
  }

  setupCarousel() {
    if (this.slides.length === 0) return;
    const showSlide = (index) => {
      this.slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      this.carouselDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      this.currentSlide = index;
    };
    const startAutoSlide = () => {
      if (this.slideInterval) clearInterval(this.slideInterval);
      this.slideInterval = setInterval(() => showSlide((this.currentSlide + 1) % this.slides.length), 8000);
    };
    this.carouselDots.forEach(dot => {
      dot.addEventListener('click', () => {
        showSlide(parseInt(dot.getAttribute('data-slide-to')));
        startAutoSlide();
      });
    });
    showSlide(0);
    startAutoSlide();
  }

  setupUserCountTicker() {
    if (!this.userCountElement) return;
    this.userCountElement.innerText = this.userCount;
    setInterval(() => {
      const shift = Math.floor(Math.random() * 7) - 3;
      this.userCount = Math.max(200, this.userCount + shift);
      this.userCountElement.innerText = this.userCount;
    }, 4000);
  }

  setupThemeToggle() {
    const toggle = (btn) => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        document.querySelectorAll('#theme-toggle-btn, #theme-toggle-settings-btn').forEach(b => {
          b.innerHTML = isDark
            ? `<i data-lucide="sun" style="width:14px;height:14px;"></i>`
            : `<i data-lucide="moon" style="width:14px;height:14px;"></i>`;
          if (b.id === 'theme-toggle-settings-btn') b.innerHTML = (isDark ? `<i data-lucide="sun"></i> Light Mode` : `<i data-lucide="moon"></i> Dark Mode`);
        });
        if (window.initIcons) window.initIcons();
        if (window.cyberAuth) window.cyberAuth.playBeep(1000, 'sine', 0.08);
      });
    };
    toggle(this.themeToggleBtn);
    toggle(document.getElementById('theme-toggle-settings-btn'));
  }

  setupGalleryLightbox() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        const src = card.getAttribute('data-gallery-src');
        const title = card.getAttribute('data-gallery-title');
        const desc = card.getAttribute('data-gallery-desc');
        const lb = document.getElementById('gallery-lightbox');
        if (lb) {
          document.getElementById('lightbox-img').src = src;
          document.getElementById('lightbox-title').textContent = title;
          document.getElementById('lightbox-desc').textContent = desc;
          lb.classList.add('active');
          if (window.cyberAuth) window.cyberAuth.playBeep(800, 'sine', 0.04);
        }
      }
      const lbClose = e.target.closest('.lightbox-close');
      const lb = document.getElementById('gallery-lightbox');
      if (lbClose || (lb && e.target === lb)) {
        lb.classList.remove('active');
      }
    });
  }

  setupProjectVirtual() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-project-modal]');
      if (btn) {
        const projectId = btn.getAttribute('data-project-modal');
        this.openProjectVirtual(projectId);
      }
      const closeBtn = document.getElementById('close-project-virtual');
      const modal = document.getElementById('project-virtual-modal');
      if ((closeBtn && e.target === closeBtn) || (modal && e.target === modal)) {
        modal.classList.remove('active');
      }
    });
  }

  openProjectVirtual(projectId) {
    const proj = PROJECT_MODALS[projectId];
    if (!proj) return;
    const modal = document.getElementById('project-virtual-modal');
    const content = document.getElementById('project-virtual-content');
    if (!modal || !content) return;
    
    content.innerHTML = `
      <div class="project-modal-container" style="padding:1.5rem;display:flex;flex-direction:column;gap:1rem;">
        <h2 style="font-family:'Nunito',sans-serif;font-size:1.4rem;font-weight:900;color:var(--text-primary);">${proj.title}</h2>
        <div style="width:100%;height:220px;border-radius:12px;overflow:hidden;background:#000;">
          <img src="${proj.image}" style="width:100%;height:100%;object-fit:cover;opacity:0.85;" alt="${proj.title}">
        </div>
        <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7;">${proj.spec}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem;">
          <span style="font-family:'DM Mono',monospace;font-size:0.72rem;padding:0.25rem 0.65rem;border-radius:99px;background:var(--season-accent-faint);color:var(--season-accent);border:1px solid var(--season-accent-soft);">${proj.status}</span>
          ${proj.link !== '#' ? `<a href="${proj.link}" target="_blank" class="action-btn" style="text-decoration:none;"><i class="lucide-external-link" style="width:14px;height:14px;"></i> Akses Instansi Sekarang</a>` : `<span style="font-size:0.78rem;color:var(--text-faint);">Link Instansi Belum Tersedia</span>`}
        </div>
      </div>
    `;
    
    modal.classList.add('active');
    if (window.initIcons) window.initIcons();
    if (window.cyberAuth) window.cyberAuth.playBeep(750, 'triangle', 0.06);
  }

  setupDashboardTabs() {
    document.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.dash-tab-btn[data-dash-tab]');
      if (tabBtn) {
        document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.dash-tab-pane').forEach(p => p.classList.remove('active'));
        tabBtn.classList.add('active');
        const tab = tabBtn.getAttribute('data-dash-tab');
        const pane = document.getElementById(`dash-tab-${tab}`);
        if (pane) pane.classList.add('active');
        if (tab === 'opencti' && window.cyberDashboard) window.cyberDashboard.renderCTIFeed();
        if (tab === 'users' && window.cyberDashboard) window.cyberDashboard.renderUserTable();
        if (tab === 'chat-monitor' && window.cyberDashboard) window.cyberDashboard.renderChatMonitor();
      }
    });
  }

  setupMusicHUD() {
    const prev = document.getElementById('music-hud-prev');
    const play = document.getElementById('music-hud-play');
    const next = document.getElementById('music-hud-next');
    prev?.addEventListener('click', () => window.zenithSettings?.prevTrack());
    next?.addEventListener('click', () => window.zenithSettings?.nextTrack());
    play?.addEventListener('click', () => window.zenithSettings?.togglePlay());
  }

  setupExportRecap() {
    const exportBtn = document.getElementById('export-recap-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = {
          exported_at: new Date().toISOString(),
          threats_neutralized: document.getElementById('total-threats-count')?.innerText || '0',
          active_incidents: document.getElementById('active-incidents-count')?.innerText || '0',
          mitigation_rate: document.getElementById('mitigation-rate-percent')?.innerText || '99.98%',
          report_by: 'Zenith Prime Labs — Security Dashboard'
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zpl_security_recap_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        if (window.cyberAuth) window.cyberAuth.playBeep(900, 'sine', 0.08);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.aetheriaApp = new AetheriaApp();
});
