// chat-sidebar.js
// Zenith Prime Labs — Sidebar Chat System (Global Chat + Friend Chat)

class ZenithChatSidebar {
  constructor() {
    this.isOpen = false;
    this.activeTab = 'global'; // 'global' | 'friend'
    this.unreadGlobal = 0;
    this.unreadFriend = 0;
    this.currentFriend = null;
    this.isAuthenticated = false;
    this.myName = 'Tamu';
    this.myFraction = 'StarLive';

    this.globalMessages = [
      { sender: 'Lumina', fraction: 'Zenith', text: 'Selamat datang di Zenith Prime Labs! 🌟', time: '09:00', isSystem: false },
      { sender: 'Honoka', fraction: 'Zenith', text: 'Semua sistem berjalan normal.', time: '09:05', isSystem: false },
      { sender: 'SYSTEM', fraction: '', text: 'Server Zenith Prime Labs online.', time: '09:10', isSystem: true },
    ];

    this.friends = [
      { id: 'danny', name: 'Danny', fraction: 'Zenith', status: 'online', unread: 2,
        messages: [{ sender: 'danny', text: 'Hei, ada update proyek?', time: '09:15' }] },
      { id: 'noah', name: 'Noah', fraction: 'StarLive', status: 'online', unread: 0,
        messages: [{ sender: 'noah', text: 'Laporan sudah dikirim.', time: '08:50' }] },
      { id: 'alan', name: 'Alan', fraction: 'Polaris', status: 'offline', unread: 1,
        messages: [{ sender: 'alan', text: 'Cek dokumen di folder R&D ya.', time: '07:30' }] },
      { id: 'said', name: 'Said', fraction: 'Zenith', status: 'online', unread: 0,
        messages: [] },
      { id: 'arvian', name: 'Arvian', fraction: 'Solstice', status: 'offline', unread: 0,
        messages: [] },
      { id: 'lumina', name: 'Lumina', fraction: 'Zenith', status: 'online', unread: 0,
        messages: [{ sender: 'lumina', text: 'Selamat datang! 🌸', time: '09:00' }] },
      { id: 'honoka', name: 'Honoka', fraction: 'Zenith', status: 'online', unread: 0,
        messages: [{ sender: 'honoka', text: 'Sistem berjalan optimal.', time: '09:05' }] },
      { id: 'evan', name: 'Evan', fraction: 'Stellaris', status: 'offline', unread: 0,
        messages: [] },
    ];

    this.initDOM();
    this.bindEvents();
    this.updateBadges();
    this.startGlobalSimulation();
  }

  get totalUnread() {
    return this.unreadGlobal + this.unreadFriend;
  }

  initDOM() {
    this.sidebar = document.getElementById('chat-sidebar-right');
    this.toggleBtn = document.getElementById('chat-sidebar-toggle-btn');
    this.badge = document.getElementById('chat-sidebar-badge');
    this.globalTab = document.getElementById('chat-tab-global');
    this.friendTab = document.getElementById('chat-tab-friend');
    this.globalPane = document.getElementById('chat-pane-global');
    this.friendPane = document.getElementById('chat-pane-friend');
    this.globalFeed = document.getElementById('global-chat-feed');
    this.globalInput = document.getElementById('global-chat-input');
    this.globalSendBtn = document.getElementById('global-chat-send-btn');
    this.friendList = document.getElementById('friend-list');
    this.friendChat = document.getElementById('friend-chat-area');
    this.friendFeed = document.getElementById('friend-chat-feed');
    this.friendInput = document.getElementById('friend-chat-input');
    this.friendSendBtn = document.getElementById('friend-chat-send-btn');
    this.friendHeader = document.getElementById('friend-chat-header');
    this.backBtn = document.getElementById('friend-back-btn');
  }

  bindEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleSidebar());
    }
    if (this.globalTab) {
      this.globalTab.addEventListener('click', () => this.switchTab('global'));
    }
    if (this.friendTab) {
      this.friendTab.addEventListener('click', () => this.switchTab('friend'));
    }
    if (this.globalSendBtn) {
      this.globalSendBtn.addEventListener('click', () => this.sendGlobal());
    }
    if (this.globalInput) {
      this.globalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendGlobal();
      });
    }
    if (this.friendSendBtn) {
      this.friendSendBtn.addEventListener('click', () => this.sendFriend());
    }
    if (this.friendInput) {
      this.friendInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendFriend();
      });
    }
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => this.showFriendList());
    }
    
    const closeChatBtn = document.getElementById('close-chat-btn');
    if (closeChatBtn) {
      closeChatBtn.addEventListener('click', () => this.closeSidebar());
    }

    // Close sidebar clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && this.sidebar && !this.sidebar.contains(e.target) && !this.toggleBtn.contains(e.target)) {
        // Don't auto close on mobile
        if (window.innerWidth > 900) return;
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
    if (window.cyberAuth) window.cyberAuth.playBeep(700, 'sine', 0.05);
  }

  openSidebar() {
    this.isOpen = true;
    if (this.sidebar) this.sidebar.classList.add('open');
    if (this.toggleBtn) this.toggleBtn.classList.add('active');
    this.renderGlobalFeed();
    this.renderFriendList();
    // Reset unread when opened
    if (this.activeTab === 'global') this.unreadGlobal = 0;
    this.updateBadges();
  }

  closeSidebar() {
    this.isOpen = false;
    if (this.sidebar) this.sidebar.classList.remove('open');
    if (this.toggleBtn) this.toggleBtn.classList.remove('active');
  }

  switchTab(tab) {
    this.activeTab = tab;
    [this.globalTab, this.friendTab].forEach(t => t && t.classList.remove('active'));
    [this.globalPane, this.friendPane].forEach(p => p && p.classList.remove('active'));

    if (tab === 'global') {
      this.globalTab && this.globalTab.classList.add('active');
      this.globalPane && this.globalPane.classList.add('active');
      this.unreadGlobal = 0;
    } else {
      this.friendTab && this.friendTab.classList.add('active');
      this.friendPane && this.friendPane.classList.add('active');
      this.showFriendList();
    }
    this.updateBadges();
  }

  updateBadges() {
    const total = this.totalUnread;
    if (this.badge) {
      this.badge.textContent = total > 0 ? (total > 99 ? '99+' : total) : '';
      this.badge.style.display = total > 0 ? 'flex' : 'none';
    }
    // Update tab badges
    const globalBadge = document.getElementById('global-tab-badge');
    const friendBadge = document.getElementById('friend-tab-badge');
    if (globalBadge) {
      globalBadge.textContent = this.unreadGlobal || '';
      globalBadge.style.display = this.unreadGlobal > 0 ? 'flex' : 'none';
    }
    if (friendBadge) {
      const totalFriendUnread = this.friends.reduce((s, f) => s + (f.unread || 0), 0);
      friendBadge.textContent = totalFriendUnread || '';
      friendBadge.style.display = totalFriendUnread > 0 ? 'flex' : 'none';
    }
  }

  renderGlobalFeed() {
    if (!this.globalFeed) return;
    this.globalFeed.innerHTML = '';
    this.globalMessages.forEach(msg => {
      const el = document.createElement('div');
      const isMe = msg.sender === this.myName;
      el.className = `gchat-msg ${isMe ? 'mine' : ''} ${msg.isSystem ? 'system' : ''}`;
      if (msg.isSystem) {
        el.innerHTML = `<div class="gchat-system-text">${msg.text}</div>`;
      } else {
        el.innerHTML = `
          <div class="gchat-sender">${msg.sender} <span class="gchat-fraction">[${msg.fraction}]</span></div>
          <div class="gchat-bubble">${msg.text}</div>
          <div class="gchat-time">${msg.time}</div>
        `;
      }
      this.globalFeed.appendChild(el);
    });
    this.globalFeed.scrollTop = this.globalFeed.scrollHeight;
  }

  sendGlobal() {
    if (!this.globalInput) return;
    const text = this.globalInput.value.trim();
    if (!text) return;
    this.globalInput.value = '';
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    this.globalMessages.push({ sender: this.myName, fraction: this.myFraction, text, time, isSystem: false });
    this.renderGlobalFeed();
    if (window.cyberAuth) window.cyberAuth.playBeep(900, 'sine', 0.04);
  }

  renderFriendList() {
    if (!this.friendList) return;
    this.friendList.innerHTML = '';
    this.friends.forEach(friend => {
      const el = document.createElement('div');
      el.className = 'friend-item';
      el.innerHTML = `
        <div class="friend-avatar">${friend.name.charAt(0)}</div>
        <div class="friend-meta">
          <div class="friend-name">${friend.name}</div>
          <div class="friend-last-msg">${friend.messages.length > 0 ? friend.messages[friend.messages.length-1].text.substring(0,30) + '...' : 'Belum ada pesan'}</div>
        </div>
        <div class="friend-right">
          <span class="friend-status-dot ${friend.status}"></span>
          ${friend.unread > 0 ? `<span class="friend-unread-badge">${friend.unread}</span>` : ''}
        </div>
      `;
      el.addEventListener('click', () => this.openFriendChat(friend.id));
      this.friendList.appendChild(el);
    });
  }

  openFriendChat(friendId) {
    this.currentFriend = this.friends.find(f => f.id === friendId);
    if (!this.currentFriend) return;
    this.currentFriend.unread = 0;
    this.updateBadges();
    if (this.friendList) this.friendList.style.display = 'none';
    if (this.friendChat) this.friendChat.style.display = 'flex';
    if (this.friendHeader) {
      this.friendHeader.innerHTML = `
        <div class="friend-chat-name">${this.currentFriend.name}</div>
        <div class="friend-chat-status">
          <span class="friend-status-dot ${this.currentFriend.status}"></span>
          ${this.currentFriend.status === 'online' ? 'Online' : 'Offline'}
        </div>
      `;
    }
    this.renderFriendFeed();
    if (window.cyberAuth) window.cyberAuth.playBeep(750, 'triangle', 0.04);
  }

  showFriendList() {
    this.currentFriend = null;
    if (this.friendList) this.friendList.style.display = 'flex';
    if (this.friendChat) this.friendChat.style.display = 'none';
    this.renderFriendList();
  }

  renderFriendFeed() {
    if (!this.friendFeed || !this.currentFriend) return;
    this.friendFeed.innerHTML = '';
    this.currentFriend.messages.forEach(msg => {
      const isMe = msg.sender === 'me';
      const el = document.createElement('div');
      el.className = `gchat-msg ${isMe ? 'mine' : ''}`;
      el.innerHTML = `
        <div class="gchat-bubble">${msg.text}</div>
        <div class="gchat-time">${msg.time}</div>
      `;
      this.friendFeed.appendChild(el);
    });
    this.friendFeed.scrollTop = this.friendFeed.scrollHeight;
  }

  sendFriend() {
    if (!this.friendInput || !this.currentFriend) return;
    const text = this.friendInput.value.trim();
    if (!text) return;
    this.friendInput.value = '';
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    this.currentFriend.messages.push({ sender: 'me', text, time });
    this.renderFriendFeed();
    if (window.cyberAuth) window.cyberAuth.playBeep(900, 'sine', 0.04);

    // Simulate reply
    setTimeout(() => {
      if (!this.currentFriend) return;
      const replies = [
        'Siap, terima kasih!', 'Oke, nanti saya cek.', 'Sudah saya proses.',
        'Baik, akan ditindaklanjuti.', 'Roger that! 👍', 'Noted!'
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const now2 = new Date();
      const time2 = `${String(now2.getHours()).padStart(2,'0')}:${String(now2.getMinutes()).padStart(2,'0')}`;
      this.currentFriend.messages.push({ sender: this.currentFriend.id, text: reply, time: time2 });
      this.renderFriendFeed();
      if (window.cyberAuth) window.cyberAuth.playBeep(500, 'triangle', 0.1);
    }, 1000 + Math.random() * 2000);
  }

  startGlobalSimulation() {
    const simulators = [
      { sender: 'Evan', fraction: 'Stellaris', msgs: ['Sudah cek laporan terbaru?', 'Sistem semua aman.', 'Ada yang perlu didiskusikan?'] },
      { sender: 'Said', fraction: 'Zenith', msgs: ['Analisis selesai.', 'Data sudah diproses.', 'Menunggu konfirmasi.'] },
      { sender: 'Arvian', fraction: 'Solstice', msgs: ['Media release sudah siap.', 'Konten baru upload!', 'Semua berjalan lancar.'] },
    ];
    const tick = () => {
      const delay = 15000 + Math.random() * 30000;
      setTimeout(() => {
        const sim = simulators[Math.floor(Math.random() * simulators.length)];
        const msg = sim.msgs[Math.floor(Math.random() * sim.msgs.length)];
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        this.globalMessages.push({ sender: sim.sender, fraction: sim.fraction, text: msg, time, isSystem: false });
        if (this.globalMessages.length > 50) this.globalMessages.shift();
        if (this.isOpen && this.activeTab === 'global') {
          this.renderGlobalFeed();
        } else {
          this.unreadGlobal++;
          this.updateBadges();
        }
        tick();
      }, delay);
    };
    tick();
  }

  setAuthenticated(name, fraction) {
    this.isAuthenticated = true;
    this.myName = name || 'Admin';
    this.myFraction = fraction || 'Zenith';
  }

  setUnauthenticated() {
    this.isAuthenticated = false;
    this.myName = 'Tamu';
    this.myFraction = 'StarLive';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.zenithChat = new ZenithChatSidebar();
});
