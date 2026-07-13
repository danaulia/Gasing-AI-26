// auth-chat.js
// Identity authentication, MFA simulation, and Secure Internal Messenger system.

class CyberAuthSystem {
  constructor() {
    this.isAuthenticated = false;
    this.currentUserEmail = "";
    this.otpCode = "";
    this.selectedContact = 'kronos'; // default contact
    
    // Contact list with simulated response patterns
    this.contacts = {
      ceo: {
        name: "Evelyn Mercer",
        role: "Chief Executive Officer",
        avatar: "CEO",
        status: "online",
        replies: [
          "Welcome to the inner circle. Excellent work on securing our subsidiaries.",
          "Our Q4 projections for Aether Orbitals look stellar. Let's keep pushing the limits of telemetry.",
          "Remember: Nusantara Cyber Nexus isn't just a holding company. We are building the security foundation of tomorrow.",
          "If you have reports on the Project Garuda Shield progress, please check in with Prof. Budi Hartono.",
          "Excellent progress. Keep your shields up and your data clean."
        ]
      },
      ciso: {
        name: "Prof. Budi Hartono",
        role: "Chief Information Security Officer",
        avatar: "CISO",
        status: "busy",
        replies: [
          "Analyzing a trace route anomaly. Keep transmissions short.",
          "We just neutralized a DDoS effort on the EcoTech Grid subsidiary. Zero impact registered.",
          "Ensure your PGP keys are rotated before the weekly review.",
          "Garuda Shield v4 integration is at 87%. Once complete, quantum tunneling will be fully active.",
          "Check the OpenCTI Dashboard. Incident frequency is trending upwards, stay vigilant."
        ]
      },
      kronos: {
        name: "KRONOS-V.9",
        role: "Command Center Security AI",
        avatar: "AI",
        status: "online",
        replies: [
          "SYSTEM STATUS: Optimal. Scanning sub-space communication protocols.",
          "INCOMING THREAT ADVISORY: SQLi attempt quarantined at Nusantara Labs.",
          "Beep! I have evaluated user activity. Confidence rating of current session is 99.98%.",
          "Would you like me to run an external network diagnostic scan? Current ping: 12ms.",
          "Aesthetic parameters satisfied. Light theme radiation detected. Dark theme contains 40% less eye strain.",
          "Warning! An admin is attempting internal messaging from an unencrypted terminal. Just kidding, your session is double-encrypted."
        ]
      }
    };

    this.chatHistories = {
      ceo: [
        { sender: 'them', text: "Welcome to the NCN Secure Terminal. What is your update today?", time: "09:05" }
      ],
      ciso: [
        { sender: 'them', text: "Terminal secure. Any anomalies to report?", time: "09:02" }
      ],
      kronos: [
        { sender: 'them', text: "KRONOS security core active. Session verified. Listening for commands...", time: "09:00" }
      ]
    };

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
    
    // Chat components
    this.chatContainer = document.getElementById('chat-app-container');
    this.chatContactsList = document.getElementById('chat-contacts');
    this.chatFeed = document.getElementById('chat-messages-feed');
    this.chatInput = document.getElementById('chat-msg-input');
    this.chatSendBtn = document.getElementById('chat-send-btn');
    
    this.activeContactName = document.getElementById('active-chat-name');
    this.activeContactRole = document.getElementById('active-chat-role');
  }

  setupEventListeners() {
    if (this.loginBtn) {
      this.loginBtn.addEventListener('click', () => this.openAuthModal());
    }

    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEmailSubmit();
      });
    }

    if (this.mfaForm) {
      this.mfaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleOtpSubmit();
      });
    }

    // Modal close
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeAuthModal());
    });

    // Chat listeners
    if (this.chatSendBtn) {
      this.chatSendBtn.addEventListener('click', () => this.sendMessage());
    }
    if (this.chatInput) {
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
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
      // Log out
      this.logout();
      return;
    }
    
    this.authModal.classList.add('active');
    this.loginForm.classList.remove('hidden');
    this.mfaForm.classList.add('hidden');
  }

  closeAuthModal() {
    this.playBeep(300, 'triangle');
    this.authModal.classList.remove('active');
  }

  handleEmailSubmit() {
    const email = this.emailInput.value;
    if (!email || !email.includes('@')) {
      alert("Masukkan alamat email yang valid!");
      return;
    }

    this.currentUserEmail = email;
    this.playBeep(800);
    
    // Simulate sending OTP
    this.otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[SECURE DEBUG] MFA OTP for ${email}: ${this.otpCode}`);
    
    // Transition to MFA
    this.loginForm.classList.add('hidden');
    this.mfaForm.classList.remove('hidden');
    this.startMfaCountdown();

    // Fill placeholder with mock alert showing code (for easier testing without reading console logs)
    const alertDiv = document.createElement('div');
    alertDiv.className = 'otp-mock-alert font-mono text-xs text-center margin-top';
    alertDiv.innerHTML = `<span class="glow-text">SYS-MFA DEMO:</span> Kode OTP Anda adalah: <strong class="color-secondary">${this.otpCode}</strong>`;
    const oldAlert = this.mfaForm.querySelector('.otp-mock-alert');
    if (oldAlert) oldAlert.remove();
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
        this.mfaCountdown.innerText = "Kode kedaluwarsa! Silakan minta ulang.";
        this.otpCode = "EXPIRED";
      } else {
        this.mfaCountdown.innerText = `Kode kedaluwarsa dalam: ${timeLeft}s`;
      }
    }, 1000);
  }

  handleOtpSubmit() {
    const enteredCode = this.otpInput.value.trim();
    
    if (enteredCode === this.otpCode && this.otpCode !== "EXPIRED") {
      this.playBeep(1200, 'sine', 0.25);
      clearInterval(this.mfaInterval);
      this.isAuthenticated = true;
      this.closeAuthModal();
      this.renderAuthenticatedState();
    } else {
      this.playBeep(250, 'sawtooth', 0.3);
      alert("Kode MFA Salah atau Kedaluwarsa! Silakan periksa kembali.");
    }
  }

  renderAuthenticatedState() {
    // Update top header button
    this.loginBtn.innerHTML = `<i class="lucide-log-out"></i> LOGOUT`;
    this.loginBtn.classList.add('logged-in');
    
    // Status text in top right
    if (this.userStatusIndicator) {
      this.userStatusIndicator.innerHTML = `
        <span class="pulse-dot green"></span>
        <span class="text-xs font-mono glow-text opacity-80">${this.currentUserEmail} (SECURE)</span>
      `;
    }

    // Unlock Chat UI
    if (this.chatContainer) {
      this.chatContainer.innerHTML = `
        <div class="chat-sidebar">
          <div class="chat-sidebar-header text-sm font-mono glow-text">CONNECTED CLIENTS</div>
          <div class="contacts-list" id="chat-contacts"></div>
        </div>
        <div class="chat-feed-container">
          <div class="chat-feed-header">
            <div>
              <div id="active-chat-name" class="font-mono font-bold glow-text">KRONOS-V.9</div>
              <div id="active-chat-role" class="text-xs opacity-60">Command Center Security AI</div>
            </div>
            <div class="secure-badge"><i class="lucide-shield-check"></i> E2EE Active</div>
          </div>
          <div class="chat-messages" id="chat-messages-feed"></div>
          <div class="chat-input-bar">
            <input type="text" id="chat-msg-input" placeholder="Ketik pesan aman..." class="chat-input">
            <button id="chat-send-btn" class="chat-send-button"><i class="lucide-send"></i></button>
          </div>
        </div>
      `;

      // Re-query references inside newly generated chat container
      this.chatContactsList = document.getElementById('chat-contacts');
      this.chatFeed = document.getElementById('chat-messages-feed');
      this.chatInput = document.getElementById('chat-msg-input');
      this.chatSendBtn = document.getElementById('chat-send-btn');
      this.activeContactName = document.getElementById('active-chat-name');
      this.activeContactRole = document.getElementById('active-chat-role');

      // Bind events for dynamically created inputs
      this.chatSendBtn.addEventListener('click', () => this.sendMessage());
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });

      this.renderContacts();
      this.selectContact('kronos');
    }
    
    if (window.initIcons) window.initIcons();
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserEmail = "";
    this.otpCode = "";
    
    this.loginBtn.innerHTML = `<i class="lucide-shield-alert"></i> PORTAL LOGIN`;
    this.loginBtn.classList.remove('logged-in');
    
    if (this.userStatusIndicator) {
      this.userStatusIndicator.innerHTML = `
        <span class="pulse-dot red"></span>
        <span class="text-xs font-mono opacity-60">SECURE DISCONNECTED</span>
      `;
    }

    if (this.chatContainer) {
      this.chatContainer.innerHTML = `
        <div class="chat-locked-panel text-center">
          <div class="cyber-lock-icon margin-bottom"><i class="lucide-lock text-4xl pulse"></i></div>
          <h3 class="font-mono glow-text margin-bottom">Komunikasi Internal Terkunci</h3>
          <p class="text-xs opacity-70 max-w-sm margin-center margin-bottom">
            Anda harus masuk ke Portal Keamanan dengan email terverifikasi dan Autentikasi Dua Faktor (MFA) untuk mengakses jaringan obrolan internal terenkripsi.
          </p>
          <button onclick="window.cyberAuth.openAuthModal()" class="action-btn glow-btn"><i class="lucide-shield-check"></i> Masuk Sekarang</button>
        </div>
      `;
    }
    
    this.playBeep(400, 'sine', 0.2);
    if (window.initIcons) window.initIcons();
  }

  renderContacts() {
    if (!this.chatContactsList) return;
    this.chatContactsList.innerHTML = '';
    
    Object.keys(this.contacts).forEach(key => {
      const contact = this.contacts[key];
      const isSelected = this.selectedContact === key;
      const contactItem = document.createElement('div');
      contactItem.className = `contact-item ${isSelected ? 'active' : ''}`;
      contactItem.innerHTML = `
        <div class="contact-avatar font-mono">${contact.avatar}</div>
        <div class="contact-meta">
          <div class="contact-name text-xs font-bold font-mono">${contact.name}</div>
          <div class="contact-role text-xxs opacity-60">${contact.role}</div>
        </div>
        <span class="status-dot ${contact.status}"></span>
      `;
      contactItem.addEventListener('click', () => {
        this.playBeep(700, 'triangle');
        this.selectContact(key);
      });
      this.chatContactsList.appendChild(contactItem);
    });
  }

  selectContact(key) {
    this.selectedContact = key;
    const contact = this.contacts[key];
    
    if (this.activeContactName) this.activeContactName.innerText = contact.name;
    if (this.activeContactRole) this.activeContactRole.innerText = contact.role;

    // Refresh contact active highlighting
    const contactItems = this.chatContactsList.querySelectorAll('.contact-item');
    let idx = 0;
    Object.keys(this.contacts).forEach((k) => {
      if (k === key) {
        contactItems[idx].classList.add('active');
      } else {
        contactItems[idx].classList.remove('active');
      }
      idx++;
    });

    this.renderChatMessages();
  }

  renderChatMessages() {
    if (!this.chatFeed) return;
    this.chatFeed.innerHTML = '';
    
    const messages = this.chatHistories[this.selectedContact] || [];
    messages.forEach(msg => {
      const msgBubble = document.createElement('div');
      msgBubble.className = `chat-bubble ${msg.sender}`;
      msgBubble.innerHTML = `
        <div class="bubble-text text-xs">${msg.text}</div>
        <div class="bubble-time text-xxs opacity-50 text-right margin-top-xs">${msg.time}</div>
      `;
      this.chatFeed.appendChild(msgBubble);
    });
    
    // Auto scroll to bottom
    this.chatFeed.scrollTop = this.chatFeed.scrollHeight;
  }

  sendMessage() {
    if (!this.chatInput) return;
    const text = this.chatInput.value.trim();
    if (!text) return;

    this.chatInput.value = '';
    this.playBeep(900, 'sine', 0.05);

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Add user message
    this.chatHistories[this.selectedContact].push({
      sender: 'me',
      text: text,
      time: timeStr
    });
    this.renderChatMessages();

    // Trigger simulated agent response after typing delay
    setTimeout(() => {
      this.simulateAgentResponse();
    }, 1000 + Math.random() * 1500);
  }

  simulateAgentResponse() {
    const contact = this.contacts[this.selectedContact];
    const replies = contact.replies;
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    this.chatHistories[this.selectedContact].push({
      sender: 'them',
      text: randomReply,
      time: timeStr
    });
    
    this.renderChatMessages();
    this.playBeep(500, 'triangle', 0.15);
  }
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
  window.cyberAuth = new CyberAuthSystem();
});
