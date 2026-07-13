// app.js
// Main Application router, carousel logic, user counter, and UI glue

// Global helper to convert lucide-XYZ classes to data-lucide attribute and trigger render
window.initIcons = () => {
  document.querySelectorAll('i[class*="lucide-"]').forEach(el => {
    const classes = Array.from(el.classList);
    const lucideClass = classes.find(c => c.startsWith('lucide-') && c !== 'lucide-icon');
    if (lucideClass) {
      const iconName = lucideClass.replace('lucide-', '');
      el.setAttribute('data-lucide', iconName);
      el.classList.remove(lucideClass);
      el.classList.add('lucide-icon');
    }
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

class AetheriaApp {
  constructor() {
    this.currentSlide = 0;
    this.slideInterval = null;
    this.userCount = 742; // base user count
    
    this.initDOM();
    this.setupRouter();
    this.setupCarousel();
    this.setupUserCountTicker();
    this.setupThemeToggle();
    this.setupInteractiveDetails();
    
    // Initial convert icons
    window.initIcons();
    
    // Default load home page
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
        
        // Play click beep
        if (window.cyberAuth) {
          window.cyberAuth.playBeep(700, 'sine', 0.05);
        }

        this.navigate(targetPage);
        
        // Close mobile nav if open
        if (this.navContainer.classList.contains('mobile-active')) {
          this.navContainer.classList.remove('mobile-active');
        }
      });
    });

    // Mobile Hamburger
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => {
        if (window.cyberAuth) window.cyberAuth.playBeep(600, 'triangle', 0.05);
        this.navContainer.classList.toggle('mobile-active');
      });
    }
  }

  navigate(pageId) {
    this.pages.forEach(page => {
      if (page.id === pageId) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    this.navLinks.forEach(link => {
      if (link.getAttribute('data-target') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Trigger radar animation resize if on dashboard
    if (pageId === 'dashboard' && window.cyberDashboard) {
      window.cyberDashboard.updateChartsTheme();
    }
  }

  // 10-Second Carousel Logic
  setupCarousel() {
    if (this.slides.length === 0) return;

    const showSlide = (index) => {
      this.slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      this.carouselDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      this.currentSlide = index;
    };

    // Auto rotate every 10 seconds (10000ms)
    const startAutoSlide = () => {
      if (this.slideInterval) clearInterval(this.slideInterval);
      this.slideInterval = setInterval(() => {
        const next = (this.currentSlide + 1) % this.slides.length;
        showSlide(next);
      }, 10000);
    };

    // Dot indicators clicks
    this.carouselDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-slide-to'));
        if (window.cyberAuth) window.cyberAuth.playBeep(800, 'sine', 0.03);
        showSlide(targetIdx);
        startAutoSlide(); // reset timer
      });
    });

    showSlide(0);
    startAutoSlide();
  }

  // Real-Time user counter tick
  setupUserCountTicker() {
    if (!this.userCountElement) return;
    
    this.userCountElement.innerText = this.userCount;

    setInterval(() => {
      // Fluctuates organically +/- 3 users
      const shift = Math.floor(Math.random() * 7) - 3;
      this.userCount = Math.max(500, this.userCount + shift);
      
      // Update screen with a slight animation frame trigger
      this.userCountElement.classList.add('pulse-number');
      this.userCountElement.innerText = this.userCount;
      
      setTimeout(() => {
        this.userCountElement.classList.remove('pulse-number');
      }, 500);
    }, 4000);
  }

  setupThemeToggle() {
    if (!this.themeToggleBtn) return;

    this.themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      const isDark = document.body.classList.contains('dark-theme');
      // Show sun when dark (click to go light), moon when light (click to go dark)
      this.themeToggleBtn.innerHTML = isDark
        ? `<i data-lucide="sun" style="width:14px;height:14px;"></i>`
        : `<i data-lucide="moon" style="width:14px;height:14px;"></i>`;
      
      if (window.initIcons) window.initIcons();

      if (window.cyberAuth) {
        window.cyberAuth.playBeep(1000, 'sine', 0.08);
      }
    });
  }

  setupInteractiveDetails() {
    // Agent copy PGP key
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.copy-pgp-btn');
      if (copyBtn) {
        const pgpText = copyBtn.getAttribute('data-pgp');
        navigator.clipboard.writeText(pgpText).then(() => {
          if (window.cyberAuth) window.cyberAuth.playBeep(900, 'sine', 0.05);
          
          const origText = copyBtn.innerHTML;
          copyBtn.innerHTML = `<i class="lucide-check"></i> Copied!`;
          copyBtn.classList.add('copied');
          
          setTimeout(() => {
            copyBtn.innerHTML = origText;
            copyBtn.classList.remove('copied');
          }, 2000);
        });
      }

      // Project detail panel popup simulation
      const projectCard = e.target.closest('.project-card');
      if (projectCard && !e.target.closest('.project-action')) {
        const title = projectCard.querySelector('.project-title').innerText;
        const desc = projectCard.querySelector('.project-desc').innerText;
        const progress = projectCard.querySelector('.progress-percent').innerText;
        
        if (window.cyberAuth) window.cyberAuth.playBeep(650, 'triangle', 0.05);

        this.showProjectPopup(title, desc, progress);
      }
    });

    // Handle Project modal closing
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('project-modal');
      if (modal && (e.target.closest('.close-project-modal') || e.target === modal)) {
        if (window.cyberAuth) window.cyberAuth.playBeep(350, 'triangle', 0.05);
        modal.classList.remove('active');
      }
    });
  }

  showProjectPopup(title, desc, progress) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modal.querySelector('#modal-project-title').innerText = title;
    modal.querySelector('#modal-project-desc').innerText = desc;
    modal.querySelector('#modal-project-progress').innerText = progress;
    modal.querySelector('#modal-project-bar').style.width = progress;
    
    // Simulate secure project files
    const detailsContainer = modal.querySelector('#modal-project-files');
    detailsContainer.innerHTML = `
      <div class="file-item font-mono text-xxs margin-bottom-xs">
        <i class="lucide-file-code"></i> sys-core-mesh.config <span class="float-right color-secondary">VERIFIED</span>
      </div>
      <div class="file-item font-mono text-xxs margin-bottom-xs">
        <i class="lucide-lock"></i> encrypted-tunnel-key.gpg <span class="float-right color-primary">RSA-4096</span>
      </div>
      <div class="file-item font-mono text-xxs">
        <i class="lucide-activity"></i> telemetry_node_stats.log <span class="float-right text-yellow-500">MITIGATING</span>
      </div>
    `;

    window.initIcons();

    modal.classList.add('active');
  }
}

// Initialise App
document.addEventListener('DOMContentLoaded', () => {
  window.aetheriaApp = new AetheriaApp();
});
