// auth-chat.js — Zenith Prime Labs
// Authentication, MFA, Profile System, Admin Mode

const ADMIN_EMAILS = [
  'danny@zenith-prime.id', 'noah@zenith-prime.id', 'alan@zenith-prime.id',
  'said@zenith-prime.id', 'arvian@zenith-prime.id', 'lumina@zenith-prime.id',
  'honoka@zenith-prime.id', 'evan@zenith-prime.id',
  // For easy testing:
  'envodannyaulia245@gmail.com', 'admin@zenith-prime.id', 'test@zenith-prime.id'
];

const ADMIN_PROFILES = {
  'danny@zenith-prime.id': { name: 'Danny', fraction: 'Zenith Prime Labs', badges: ['👑 Founder','🛡️ Admin','🔬 Researcher'], initials: 'DN', registered: 'Juli 2026' },
  'noah@zenith-prime.id': { name: 'Noah', fraction: 'StarLive Group', badges: ['⚡ Veteran','💻 Full-Stack'], initials: 'NH', registered: 'Juli 2026' },
  'alan@zenith-prime.id': { name: 'Alan', fraction: 'Polaris Academy', badges: ['🛡️ Guardian'], initials: 'AL', registered: 'Juli 2026' },
  'said@zenith-prime.id': { name: 'Said', fraction: 'Zenith Prime Labs', badges: ['📊 Analyst','🤖 ML Expert'], initials: 'SD', registered: 'Juli 2026' },
  'arvian@zenith-prime.id': { name: 'Arvian', fraction: 'Solstice Media Info', badges: ['📡 Broadcast'], initials: 'AV', registered: 'Juli 2026' },
  'lumina@zenith-prime.id': { name: 'Lumina', fraction: 'Zenith Prime Labs', badges: ['🌟 Elite','🧠 AI Lead'], initials: 'LM', registered: 'Juli 2026' },
  'honoka@zenith-prime.id': { name: 'Honoka', fraction: 'Zenith Prime Labs', badges: ['⚙️ Engineer'], initials: 'HK', registered: 'Juli 2026' },
  'evan@zenith-prime.id': { name: 'Evan', fraction: 'Stellaris Lounge', badges: ['📋 Manager'], initials: 'EV', registered: 'Juli 2026' },
  'envodannyaulia245@gmail.com': { name: 'Danny', fraction: 'Zenith Prime Labs', badges: ['👑 Founder','🛡️ Admin','🔬 Researcher'], initials: 'DN', registered: 'Juli 2026' },
  'admin@zenith-prime.id': { name: 'Administrator', fraction: 'StarLive Group', badges: ['🛡️ Admin','⭐ Staff'], initials: 'AD', registered: 'Juli 2026' },
  'test@zenith-prime.id': { name: 'Tester', fraction: 'Zenith Prime Labs', badges: ['🧪 Tester'], initials: 'TS', registered: 'Juli 2026' },
};

// Track registered users
let REGISTERED_USERS = JSON.parse(localStorage.getItem('zpl_users') || '[]');

class CyberAuthSystem {
  constructor() {
    this.isAuthenticated = false;
    this.currentUserEmail = '';
    this.currentProfile = null;
    this.otpCode = '';

    this.initDOM();
    this.setupEventListeners();
  }

  initDOM() {
    this.authModal = document.getElementById('auth-modal');
    this.loginForm = document.getElementById('login-form');
    this.mfaForm = document.getElementById('mfa-form');
    this.emailInput = document.getElementById('auth-email');
    this.otpInput = document.getElementById('auth-otp');
    this.mfaCountdown = document.getElementById('mfa-timer');
    this.loginBtn = document.getElementById('portal-login-btn');
    this.userStatusIndicator = document.getElementById('user-status-indicator');
  }

  setupEventListeners() {
    if (this.loginBtn) this.loginBtn.addEventListener('click', () => this.openAuthModal());
    if (this.loginForm) this.loginForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleEmailSubmit(); });
    if (this.mfaForm) this.mfaForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleOtpSubmit(); });

    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-wrapper').forEach(m => m.classList.remove('active'));
      });
    });
    document.querySelectorAll('.modal-wrapper').forEach(m => {
      m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('active'); });
    });

    // Profile modal
    const profileAvatarEl = document.getElementById('profile-avatar-display');
    if (profileAvatarEl) profileAvatarEl.parentElement.addEventListener('click', () => {});

    // Profile photo upload
    const avatarInput = document.getElementById('profile-avatar-input');
    if (avatarInput) {
      avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const avatar = document.getElementById('profile-avatar-display');
            if (avatar) {
              avatar.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
    const coverInput = document.getElementById('profile-cover-input');
    if (coverInput) {
      coverInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const cover = document.getElementById('profile-cover-area');
            if (cover) cover.style.backgroundImage = `url('${ev.target.result}')`;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  playBeep(freq, type = 'sine', duration = 0.08) {
    if (!window.cyberAudio || !window.cyberAudio.audioContext) return;
    try {
      const ctx = window.cyberAudio.audioContext;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  openAuthModal() {
    this.playBeep(600, 'triangle');
    if (this.isAuthenticated) {
      this.showProfileModal();
      return;
    }
    this.authModal.classList.add('active');
    this.loginForm.classList.remove('hidden');
    this.mfaForm.classList.add('hidden');
  }

  handleEmailSubmit() {
    const email = this.emailInput.value.trim().toLowerCase();
    if (!email || !email.includes('@')) { alert('Masukkan email yang valid!'); return; }
    this.currentUserEmail = email;
    this.playBeep(800);
    this.otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[ZPL-AUTH] OTP for ${email}: ${this.otpCode}`);
    this.loginForm.classList.add('hidden');
    this.mfaForm.classList.remove('hidden');
    this.startMfaCountdown();

    const oldAlert = this.mfaForm.querySelector('.otp-mock-alert');
    if (oldAlert) oldAlert.remove();
    const alertDiv = document.createElement('div');
    alertDiv.className = 'otp-mock-alert';
    alertDiv.innerHTML = `<span style="color:var(--season-accent);">SYS-MFA DEMO:</span> Kode OTP: <strong>${this.otpCode}</strong>`;
    this.mfaForm.appendChild(alertDiv);
  }

  startMfaCountdown() {
    let timeLeft = 60;
    this.mfaCountdown.innerText = `Kode kedaluwarsa dalam: ${timeLeft}s`;
    if (this.mfaInterval) clearInterval(this.mfaInterval);
    this.mfaInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(this.mfaInterval);
        this.mfaCountdown.innerText = 'Kode kedaluwarsa!';
        this.otpCode = 'EXPIRED';
      } else {
        this.mfaCountdown.innerText = `Kode kedaluwarsa dalam: ${timeLeft}s`;
      }
    }, 1000);
  }

  handleOtpSubmit() {
    const entered = this.otpInput.value.trim();
    if (entered === this.otpCode && this.otpCode !== 'EXPIRED') {
      this.playBeep(1200, 'sine', 0.25);
      clearInterval(this.mfaInterval);
      this.isAuthenticated = true;
      this.authModal.classList.remove('active');
      this.renderAuthenticatedState();
    } else {
      this.playBeep(250, 'sawtooth', 0.3);
      alert('Kode MFA salah atau kedaluwarsa!');
    }
  }

  renderAuthenticatedState() {
    const email = this.currentUserEmail;
    const isAdmin = ADMIN_EMAILS.includes(email);
    const profile = ADMIN_PROFILES[email] || {
      name: email.split('@')[0],
      fraction: 'StarLive Group',
      badges: ['🆕 First Login'],
      initials: email.slice(0,2).toUpperCase(),
      registered: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    };
    this.currentProfile = profile;

    // Save to registered users
    if (!REGISTERED_USERS.find(u => u.email === email)) {
      REGISTERED_USERS.push({ email, name: profile.name, fraction: profile.fraction, registered: new Date().toISOString(), status: 'aktif', isAdmin });
      localStorage.setItem('zpl_users', JSON.stringify(REGISTERED_USERS));
    }

    // Update button
    this.loginBtn.innerHTML = `<i class="lucide-user" style="width:14px;height:14px;"></i> ${profile.name}`;
    this.loginBtn.classList.add('logged-in');

    // Status indicator
    if (this.userStatusIndicator) {
      this.userStatusIndicator.innerHTML = `
        <span class="pulse-dot green"></span>
        <span class="text-xxs font-mono opacity-80" style="color:var(--mint-400);">${profile.name} (AMAN)</span>
      `;
    }

    // Show Dashboard nav
    const dashNav = document.getElementById('dashboard-nav-link');
    if (isAdmin) {
      // Show dashboard content, hide locked
      const locked = document.getElementById('dashboard-locked');
      const content = document.getElementById('dashboard-content');
      if (locked) locked.style.display = 'none';
      if (content) content.style.display = 'block';

      // Enable admin mode in settings
      if (window.zenithSettings) window.zenithSettings.enableAdminMode();
      if (window.zenithChat) window.zenithChat.setAuthenticated(profile.name, profile.fraction);
    }

    // Update profile modal
    this.updateProfileModal(profile, isAdmin);

    if (window.initIcons) window.initIcons();
    if (window.cyberDashboard) window.cyberDashboard.setAdminMode(isAdmin);
  }

  updateProfileModal(profile, isAdmin) {
    const nameEl = document.getElementById('profile-display-name');
    const fractionEl = document.getElementById('profile-display-fraction');
    const registeredEl = document.getElementById('profile-display-registered');
    const badgesEl = document.getElementById('profile-display-badges');
    const avatarEl = document.getElementById('profile-avatar-display');

    if (nameEl) nameEl.textContent = profile.name;
    if (fractionEl) fractionEl.innerHTML = `<i data-lucide="flask-conical" style="width:12px;height:12px;"></i> ${profile.fraction}`;
    if (registeredEl) registeredEl.innerHTML = `<i data-lucide="calendar" style="width:11px;height:11px;"></i> Bergabung: ${profile.registered}`;
    if (badgesEl) {
      const extraBadge = isAdmin ? '<span class="achieve-badge">🛡️ Admin</span>' : '';
      badgesEl.innerHTML = profile.badges.map(b => `<span class="achieve-badge">${b}</span>`).join('') + extraBadge;
    }
    if (avatarEl) avatarEl.textContent = profile.initials;

    // Click on login button shows profile
    this.loginBtn.removeEventListener('click', this._loginClickHandler);
    this._loginClickHandler = () => this.showProfileModal();
    this.loginBtn.addEventListener('click', this._loginClickHandler);

    if (window.initIcons) window.initIcons();
  }

  showProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.classList.add('active');
    this.playBeep(800, 'sine', 0.06);
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserEmail = '';
    this.currentProfile = null;
    this.loginBtn.innerHTML = `<i class="lucide-shield" style="width:14px;height:14px;"></i> Portal Login`;
    this.loginBtn.classList.remove('logged-in');
    this.loginBtn.removeEventListener('click', this._loginClickHandler);
    this.loginBtn.addEventListener('click', () => this.openAuthModal());

    if (this.userStatusIndicator) {
      this.userStatusIndicator.innerHTML = `
        <span class="pulse-dot red"></span>
        <span class="text-xxs font-mono opacity-70">Belum Masuk</span>
      `;
    }

    // Hide dashboard content, show locked
    const locked = document.getElementById('dashboard-locked');
    const content = document.getElementById('dashboard-content');
    if (locked) locked.style.display = 'flex';
    if (content) content.style.display = 'none';

    if (window.zenithSettings) window.zenithSettings.disableAdminMode();
    if (window.zenithChat) window.zenithChat.setUnauthenticated();
    this.playBeep(400, 'sine', 0.2);
    if (window.initIcons) window.initIcons();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberAuth = new CyberAuthSystem();
});
