// app.js — Zenith Prime Labs Main Application
// Router, Carousel, Counter, Theme, Project Virtual UI, Gallery Lightbox

window.initIcons = () => {
  document.querySelectorAll('i[class*="lucide-"]').forEach(el => {
    const lucideClass = Array.from(el.classList).find(c => c.startsWith('lucide-') && c !== 'lucide-icon');
    if (lucideClass) {
      el.setAttribute('data-lucide', lucideClass.replace('lucide-', ''));
      el.classList.remove(lucideClass);
      el.classList.add('lucide-icon');
    }
  });
  if (window.lucide) window.lucide.createIcons();
};

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
    
    // Custom Modals & Profile setup
    this.setupCustomModals();
    this.setupProfileEditing();

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
        // Automatically close right chat sidebar when moving pages
        if (window.zenithChat && window.zenithChat.isOpen) {
          window.zenithChat.closeSidebar();
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

    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const nextIdx = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        showSlide(nextIdx);
        startAutoSlide();
        if (window.cyberAuth) window.cyberAuth.playBeep(650, 'sine', 0.05);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIdx = (this.currentSlide + 1) % this.slides.length;
        showSlide(nextIdx);
        startAutoSlide();
        if (window.cyberAuth) window.cyberAuth.playBeep(650, 'sine', 0.05);
      });
    }

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

  setupCustomModals() {
    // Universal close listener for custom modals
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.close-modal');
      if (closeBtn) {
        const modal = closeBtn.closest('.modal-wrapper');
        if (modal) modal.classList.remove('active');
      }
      // Click outside to close custom modals
      if (e.target.classList.contains('modal-wrapper')) {
        e.target.classList.remove('active');
      }
    });
  }

  openNewsModal(newsId) {
    const newsData = {
      'news-1': {
        title: 'Peluncuran Portal Investigasi Stealth Recon V4 Terkini',
        date: '13 Juli 2026',
        badge: 'TERBARU',
        image: 'assets/gallery_anime_1.png',
        content: 'Zenith Prime Labs resmi merilis versi terbaru dari Stealth Recon. Dengan perbaikan algoritma pencarian multi-vektor, sistem siber ini kini mampu melacak jejak digital seseorang dari nama lengkap, username alias, alamat email, hingga nomor telepon secara simultan. Versi keempat ini juga menyertakan fungsionalitas visual reverse image search berbasis AI untuk pencarian foto profil siber yang memiliki akurasi kecocokan hingga 100%.'
      },
      'news-2': {
        title: 'Uji Coba Pengaman Enkripsi Quantum Key Distribusi RSA-Q4096',
        date: '10 Juli 2026',
        badge: 'R&D',
        image: null,
        content: 'Divisi Kriptografi Zenith Prime Labs berhasil menyelesaikan fase pengujian pertama transmisi terenkripsi Quantum Key Distribution (QKD). Pengamanan saluran data dengan modul sandi RSA-Q4096 ini ditujukan untuk memproteksi lalu lintas data intelijen sensitif antar anak perusahaan StarLive Group dari ancaman dekripsi komputasi kuantum di masa mendatang.'
      },
      'news-3': {
        title: 'Integrasi Algoritma Deteksi AI Media Analyzer',
        date: '07 Juli 2026',
        badge: 'SINKRONISASI',
        image: null,
        content: 'Sistem AI Media Analyzer kini terintegrasi penuh dengan basis data pembelajaran mesin terbaru. Modul deteksi canggih ini dirancang khusus untuk memindai rekayasa metadata foto, manipulasi piksel generatif (Deepfake), serta mendeteksi kampanye disinformasi terstruktur di jaringan media sosial afiliasi.'
      }
    };

    const news = newsData[newsId];
    if (!news) return;

    const modal = document.getElementById('news-modal');
    const container = document.getElementById('news-modal-content');
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <span class="news-badge" style="position:static;width:fit-content;">${news.badge}</span>
        <h2 style="font-family:'Nunito',sans-serif;font-size:1.4rem;font-weight:800;margin-top:0.25rem;">${news.title}</h2>
        <span style="font-size:0.75rem;color:var(--text-faint);font-family:'DM Mono',monospace;">Diterbitkan: ${news.date}</span>
        ${news.image ? `<div style="width:100%;height:220px;border-radius:8px;overflow:hidden;margin:0.5rem 0;"><img src="${news.image}" style="width:100%;height:100%;object-fit:cover;"></div>` : `<div style="width:100%;height:140px;border-radius:8px;background:linear-gradient(135deg, rgba(139,92,246,0.08), rgba(244,63,94,0.08));display:flex;align-items:center;justify-content:center;color:var(--text-faint);"><i class="lucide-image" style="width:32px;height:32px;"></i></div>`}
        <p style="font-size:0.88rem;color:var(--text-body);line-height:1.7;text-align:justify;">${news.content}</p>
      </div>
    `;

    modal.classList.add('active');
    if (window.initIcons) window.initIcons();
    if (window.cyberAuth) window.cyberAuth.playBeep(750, 'sine', 0.05);
  }

  openCompanyModal(companyId) {
    const companyData = {
      'starlive-group': {
        name: 'StarLive Group',
        badge: 'INDUK ALIANSI',
        icon: 'SLG',
        colorClass: 'badge-gold',
        link: 'https://starlive-group.com',
        desc: 'StarLive Group adalah konglomerat induk (holding group) multinasional yang menaungi berbagai anak perusahaan strategis di bidang media, riset teknologi siber, pendidikan, dan layanan hiburan premium. Didirikan dengan visi menyinergikan inovasi digital demi ekosistem yang terintegrasi dan aman.'
      },
      'solstice-media': {
        name: 'Solstice Media Info',
        badge: 'ANAK PERUSAHAAN',
        icon: 'SMI',
        colorClass: 'badge-sky',
        link: 'https://solstice-media.info',
        desc: 'Solstice Media Info memimpin pilar jurnalisme siber, penyiaran informasi digital, dan monitoring opini publik global. Berkolaborasi erat dengan Zenith Prime Labs untuk memanfaatkan teknologi pencarian sentimen berbasis AI guna mengidentifikasi disinformasi dan hoaks di media.'
      },
      'zenith-prime': {
        name: 'Zenith Prime Labs',
        badge: 'DIVISI R&D',
        icon: 'ZPL',
        colorClass: 'badge-violet',
        link: '#',
        desc: 'Zenith Prime Labs adalah anak perusahaan khusus riset dan pengembangan (R&D) teknologi tingkat lanjut. Fokus operasional kami meliputi pengembangan kecerdasan buatan, sistem OSINT (Open Source Intelligence), enkripsi kuantum, serta solusi pertahanan siber taktis.'
      },
      'polaris-academy': {
        name: 'Polaris Academy',
        badge: 'EDUKASI & INKUBASI',
        icon: 'PA',
        colorClass: 'badge-rose',
        link: 'https://polaris-academy.edu',
        desc: 'Polaris Academy berdedikasi mendidik talenta siber masa depan. Melalui pelatihan intensif, sertifikasi keamanan sistem informasi, dan program magang riset di Zenith Prime Labs, kami mencetak operator keamanan siber andalan yang siap diterjunkan ke industri.'
      },
      'stellaris-lounge': {
        name: 'Stellaris Lounge',
        badge: 'NETWORKING & FnB',
        icon: 'SL',
        colorClass: 'badge-amber',
        link: 'https://stellaris-lounge.cafe',
        desc: 'Stellaris Lounge menghadirkan konsep FnB premium dan ruang rapat eksekutif. Dirancang khusus sebagai wadah kolaborasi informal bagi para pakar siber, pebisnis, serta pemangku kepentingan dalam mendiskusikan rencana kerja strategis.'
      },
      'nova-creative': {
        name: 'Nova Creative Studio',
        badge: 'KREATIF & IP ENTERTAINMENT',
        icon: 'NCS',
        colorClass: 'badge-mint',
        link: 'https://nova-creative.studio',
        desc: 'Nova Creative Studio fokus pada pengembangan kekayaan intelektual (IP) interaktif, desain grafis 3D, animasi bertema anime, serta game multimedia. Memproduksi aset visual berkualitas premium untuk menunjang branding kreatif seluruh jaringan korporasi StarLive.'
      }
    };

    const comp = companyData[companyId];
    if (!comp) return;

    const modal = document.getElementById('company-modal');
    const container = document.getElementById('company-modal-content');
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div class="sub-icon-badge ${comp.colorClass}" style="width:50px;height:50px;font-size:0.95rem;margin:0;">${comp.icon}</div>
          <span class="achieve-badge" style="padding:0.25rem 0.75rem;">${comp.badge}</span>
        </div>
        <h2 style="font-family:'Nunito',sans-serif;font-size:1.35rem;font-weight:800;margin-top:0.25rem;">${comp.name}</h2>
        <p style="font-size:0.88rem;color:var(--text-body);line-height:1.7;text-align:justify;">${comp.desc}</p>
        <div style="display:flex;justify-content:flex-end;margin-top:0.5rem;">
          ${comp.link !== '#' ? `<a href="${comp.link}" target="_blank" class="action-btn" style="text-decoration:none;"><i class="lucide-external-link" style="width:14px;height:14px;"></i> Kunjungi Website Resmi</a>` : `<span style="font-size:0.78rem;color:var(--text-faint);">Portal Internal (Tautan tidak tersedia)</span>`}
        </div>
      </div>
    `;

    modal.classList.add('active');
    if (window.initIcons) window.initIcons();
    if (window.cyberAuth) window.cyberAuth.playBeep(750, 'sine', 0.05);
  }

  openAgentModal(agentId) {
    const agentData = {
      'danny': { name: 'Danny', cover: 'assets/scene_nte_night.png', initials: 'DN', color: '#f43f5e', role: 'Chief Administrator', fraction: 'Zenith Prime Labs', joined: 'Desember 2024', status: 'Online — Lab Alpha', badges: ['👑 Founder', '🔬 Researcher', '💻 Systems Architect'] },
      'noah': { name: 'Noah', cover: 'assets/scene_strinova_arena.png', initials: 'NH', color: '#38bdf8', role: 'Senior Developer', fraction: 'StarLive Group', joined: 'Maret 2025', status: 'Online — Dev Hub', badges: ['⚡ Veteran', '💻 Full-Stack', '🤖 ML Engineer'] },
      'alan': { name: 'Alan', cover: 'assets/scene_zenith_lab.png', initials: 'AL', color: '#fbbf24', role: 'Security Analyst', fraction: 'Polaris Academy', joined: 'Juni 2025', status: 'Sibuk — War Room', badges: ['🛡️ Guardian', '🕵️ Penetrator'] },
      'said': { name: 'Said', cover: 'assets/scene_nte_night.png', initials: 'SD', color: '#8b5cf6', role: 'Data Scientist', fraction: 'Zenith Prime Labs', joined: 'Agustus 2025', status: 'Online — Data Lab', badges: ['📊 Analyst', '🤖 ML Expert'] },
      'arvian': { name: 'Arvian', cover: 'assets/scene_strinova_arena.png', initials: 'AV', color: '#14b8a6', role: 'Media Intelligence', fraction: 'Solstice Media Info', joined: 'Oktober 2025', status: 'Offline', badges: ['📡 Broadcast', '🔍 OSINT Auditor'] },
      'lumina': { name: 'Lumina', cover: 'assets/scene_zenith_lab.png', initials: 'LM', color: '#f9a8d4', role: 'AI Research Lead', fraction: 'Zenith Prime Labs', joined: 'Januari 2025', status: 'Online — AI Core', badges: ['🌟 Elite', '🧠 AI Lead', '🎯 Strategist'] },
      'honoka': { name: 'Honoka', cover: 'assets/scene_nte_night.png', initials: 'HK', color: '#fb923c', role: 'Systems Engineer', fraction: 'Zenith Prime Labs', joined: 'Februari 2025', status: 'Online — Sys Core', badges: ['⚙️ Engineer', '⚡ Optimize Specialist'] },
      'evan': { name: 'Evan', cover: 'assets/scene_stellaris_lounge_cover.png' || 'assets/scene_strinova_arena.png', initials: 'EV', color: '#6366f1', role: 'Operations Manager', fraction: 'Stellaris Lounge', joined: 'Maret 2025', status: 'Offline', badges: ['📋 Manager', '🤝 Public Relations'] }
    };

    const agent = agentData[agentId];
    if (!agent) return;

    const modal = document.getElementById('agent-modal');
    const container = document.getElementById('agent-modal-content');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="agent-cover" style="background-image:url('${agent.cover}');background-size:cover;height:120px;position:relative;">
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);"></div>
      </div>
      <div style="margin-top:-40px;padding:0 20px;display:flex;align-items:flex-end;gap:12px;position:relative;z-index:2;">
        <div style="width:80px;height:80px;border-radius:50%;border:3px solid var(--bg-card);overflow:hidden;background:${agent.color};display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800;color:#fff;">
          ${agent.initials}
        </div>
      </div>
      <div style="padding:20px;display:flex;flex-direction:column;gap:0.75rem;">
        <div>
          <h2 style="font-family:'Nunito',sans-serif;font-size:1.35rem;font-weight:800;">${agent.name}</h2>
          <span style="font-size:0.75rem;font-family:'DM Mono',monospace;color:var(--text-faint);">${agent.role}</span>
        </div>
        <div style="font-size:0.82rem;color:var(--text-muted);display:flex;flex-direction:column;gap:0.3rem;border-top:1px solid var(--border-soft);padding-top:0.75rem;">
          <div><strong style="color:var(--text-body);">Fraksi:</strong> ${agent.fraction}</div>
          <div><strong style="color:var(--text-body);">Waktu Bergabung:</strong> ${agent.joined}</div>
          <div><strong style="color:var(--text-body);">Status Kehadiran:</strong> ${agent.status}</div>
        </div>
        <div style="margin-top:0.35rem;">
          <div style="font-size:0.65rem;color:var(--text-faint);text-transform:uppercase;font-family:'DM Mono',monospace;margin-bottom:0.35rem;">Badge Agen</div>
          <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
            ${agent.badges.map(b => `<span class="achieve-badge" style="font-size:0.65rem;padding:0.15rem 0.45rem;">${b}</span>`).join('')}
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:0.75rem;border-top:1px solid var(--border-soft);padding-top:0.75rem;">
          <button class="action-btn" onclick="window.aetheriaApp.triggerAgentChat('${agent.name}')">
            <i class="lucide-message-square" style="width:14px;height:14px;"></i> Kirim Pesan
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    if (window.initIcons) window.initIcons();
    if (window.cyberAuth) window.cyberAuth.playBeep(750, 'sine', 0.05);
  }

  triggerAgentChat(agentName) {
    const modal = document.getElementById('agent-modal');
    if (modal) modal.classList.remove('active');
    if (window.zenithChat) {
      window.zenithChat.openSidebar();
      window.zenithChat.switchTab('friend');
      // Simulate selecting friend
      const targetFriend = Array.from(document.querySelectorAll('.friend-item')).find(el => el.querySelector('.friend-name')?.textContent === agentName);
      if (targetFriend) targetFriend.click();
    }
  }

  setupProfileEditing() {
    const coverInput = document.getElementById('profile-cover-input');
    const avatarInput = document.getElementById('profile-avatar-input');
    const saveBtn = document.getElementById('profile-save-btn');

    // Inputs
    const nameInput = document.getElementById('profile-edit-name');
    const bioTextarea = document.getElementById('profile-edit-bio');
    const coverArea = document.getElementById('profile-cover-area');
    const avatarDisplay = document.getElementById('profile-avatar-display');
    const charCounter = document.getElementById('profile-bio-charcount');

    const usernameInput = document.getElementById('profile-edit-username');
    const emailInput = document.getElementById('profile-edit-email');
    const fractionInput = document.getElementById('profile-edit-fraction');
    const roleInput = document.getElementById('profile-edit-role');

    // Load initial edit fields from state/localStorage
    const localName = localStorage.getItem('profile_user_name') || 'User Utama';
    const localBio = localStorage.getItem('profile_user_bio') || 'Guest Administrator of StarLive Group. Cyber security enthusiast.';
    const localCover = localStorage.getItem('profile_user_cover') || 'assets/scene_nte_night.png';
    const localAvatar = localStorage.getItem('profile_user_avatar') || 'US';

    const localUsername = localStorage.getItem('profile_user_username') || '@danaulia';
    const localEmail = localStorage.getItem('profile_user_email') || 'danaulia@starlive.id';
    const localFraction = localStorage.getItem('profile_user_fraction') || 'Zenith Prime Labs';
    const localRole = localStorage.getItem('profile_user_role') || 'Guest Administrator';

    if (nameInput) nameInput.value = localName;
    if (bioTextarea) {
      bioTextarea.value = localBio;
      if (charCounter) charCounter.textContent = `${localBio.length} / 300`;
      bioTextarea.addEventListener('input', () => {
        if (charCounter) charCounter.textContent = `${bioTextarea.value.length} / 300`;
      });
    }
    if (coverArea && localCover) coverArea.style.backgroundImage = `url('${localCover}')`;
    if (avatarDisplay) {
      if (localAvatar.startsWith('data:image')) {
        avatarDisplay.innerHTML = `<img src="${localAvatar}" style="width:100%;height:100%;object-fit:cover;">`;
      } else {
        avatarDisplay.textContent = localAvatar;
      }
    }

    if (usernameInput) usernameInput.value = localUsername;
    if (emailInput) emailInput.value = localEmail;
    if (fractionInput) fractionInput.value = localFraction;
    if (roleInput) roleInput.value = localRole;

    // Check if current user is Admin to allow full edit
    const checkAdminPrivileges = () => {
      const isAdmin = document.body.classList.contains('admin-logged-in') || localRole.toLowerCase().includes('admin') || localRole.toLowerCase().includes('founder');
      if (isAdmin) {
        if (usernameInput) usernameInput.removeAttribute('readonly');
        if (emailInput) emailInput.removeAttribute('readonly');
        if (fractionInput) fractionInput.removeAttribute('readonly');
        if (roleInput) roleInput.removeAttribute('readonly');
      } else {
        if (usernameInput) usernameInput.setAttribute('readonly', 'true');
        if (emailInput) emailInput.setAttribute('readonly', 'true');
        if (fractionInput) fractionInput.setAttribute('readonly', 'true');
        if (roleInput) roleInput.setAttribute('readonly', 'true');
      }
    };

    // Check on modal open / trigger
    document.addEventListener('click', (e) => {
      const profileBtn = e.target.closest('#open-profile-btn') || e.target.closest('#profile-hud-name');
      if (profileBtn) {
        checkAdminPrivileges();
        const modal = document.getElementById('profile-modal');
        if (modal) modal.classList.add('active');
      }
    });

    if (coverInput) {
      coverInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (coverArea) coverArea.style.backgroundImage = `url('${ev.target.result}')`;
            localStorage.setItem('profile_user_cover', ev.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (avatarInput) {
      avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (avatarDisplay) avatarDisplay.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
            localStorage.setItem('profile_user_avatar', ev.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const nameVal = nameInput ? nameInput.value.trim() : 'User Utama';
        const bioVal = bioTextarea ? bioTextarea.value.trim() : '';

        localStorage.setItem('profile_user_name', nameVal);
        localStorage.setItem('profile_user_bio', bioVal);

        // Save admin editable fields if modified
        const isAdmin = document.body.classList.contains('admin-logged-in') || localRole.toLowerCase().includes('admin') || localRole.toLowerCase().includes('founder');
        if (isAdmin) {
          if (usernameInput) localStorage.setItem('profile_user_username', usernameInput.value.trim());
          if (emailInput) localStorage.setItem('profile_user_email', emailInput.value.trim());
          if (fractionInput) localStorage.setItem('profile_user_fraction', fractionInput.value.trim());
          if (roleInput) {
            localStorage.setItem('profile_user_role', roleInput.value.trim());
            // If they edited their own role, update local state
            checkAdminPrivileges();
          }
        }

        // Update display on settings panel if open
        const hudName = document.getElementById('profile-hud-name');
        if (hudName) hudName.textContent = nameVal;

        alert('Profil Anda berhasil disimpan!');
        const modal = document.getElementById('profile-modal');
        if (modal) modal.classList.remove('active');

        if (window.cyberAuth) window.cyberAuth.playBeep(900, 'sine', 0.08);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.aetheriaApp = new AetheriaApp();
});
