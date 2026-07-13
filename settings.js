// settings.js
// Zenith Prime Labs — Settings Panel: Language, Theme (4 Seasons), Music, Scene

// ─────────────────────────────────────────
// i18n TRANSLATIONS
// ─────────────────────────────────────────
const I18N = {
  id: {
    nav_home: 'Beranda', nav_affiliation: 'Afiliasi', nav_agent: 'Agen',
    nav_project: 'Proyek', nav_gallery: 'Galeri', nav_dashboard: 'Dasbor',
    login_btn: 'Portal Login', logout_btn: 'Keluar',
    status_offline: 'Belum Masuk', status_online: 'Aman',
    settings_title: 'Pengaturan', settings_lang: 'Bahasa', settings_theme: 'Tema',
    settings_music: 'Musik', settings_scene: 'Latar',
    home_eyebrow: 'Anak Perusahaan R&D', home_title: 'Zenith Prime Labs',
    home_subtitle: 'Divisi Riset & Pengembangan Teknologi — StarLive Group',
    affil_eyebrow: 'Jaringan Korporasi', affil_title: 'Afiliasi & Perusahaan',
    affil_subtitle: 'StarLive Group dan anak-anak perusahaannya',
    agent_eyebrow: 'Direktori Personel', agent_title: 'Administrator',
    agent_subtitle: 'Pengelola sistem Zenith Prime Labs',
    project_eyebrow: 'Status Pengerjaan', project_title: 'Proyek Aktif',
    project_subtitle: 'Klik Lanjutkan untuk menggunakan secara virtual',
    gallery_eyebrow: 'Dokumentasi Kegiatan', gallery_title: 'Galeri',
    gallery_subtitle: 'Foto dan video kegiatan Zenith Prime Labs',
    dashboard_eyebrow: 'Admin Only', dashboard_title: 'Dasbor Keamanan',
    dashboard_subtitle: 'Analisis dan deteksi ancaman real-time',
    chat_global: 'Chat Global', chat_friend: 'Chat Teman',
  },
  en_uk: {
    nav_home: 'Home', nav_affiliation: 'Affiliates', nav_agent: 'Agents',
    nav_project: 'Projects', nav_gallery: 'Gallery', nav_dashboard: 'Dashboard',
    login_btn: 'Portal Login', logout_btn: 'Sign Out',
    status_offline: 'Not Signed In', status_online: 'Secure',
    settings_title: 'Settings', settings_lang: 'Language', settings_theme: 'Theme',
    settings_music: 'Music', settings_scene: 'Scene',
    home_eyebrow: 'R&D Subsidiary', home_title: 'Zenith Prime Labs',
    home_subtitle: 'Research & Development Division — StarLive Group',
    affil_eyebrow: 'Corporate Network', affil_title: 'Affiliates & Companies',
    affil_subtitle: 'StarLive Group and its subsidiaries',
    agent_eyebrow: 'Personnel Directory', agent_title: 'Administrators',
    agent_subtitle: 'Managers of Zenith Prime Labs systems',
    project_eyebrow: 'Development Status', project_title: 'Active Projects',
    project_subtitle: 'Click Continue to use virtually',
    gallery_eyebrow: 'Activity Documentation', gallery_title: 'Gallery',
    gallery_subtitle: 'Photos and videos of Zenith Prime Labs activities',
    dashboard_eyebrow: 'Admin Only', dashboard_title: 'Security Dashboard',
    dashboard_subtitle: 'Real-time threat analysis and detection',
    chat_global: 'Global Chat', chat_friend: 'Friend Chat',
  },
  en_us: {
    nav_home: 'Home', nav_affiliation: 'Affiliates', nav_agent: 'Agents',
    nav_project: 'Projects', nav_gallery: 'Gallery', nav_dashboard: 'Dashboard',
    login_btn: 'Portal Login', logout_btn: 'Sign Out',
    status_offline: 'Not Signed In', status_online: 'Secure',
    settings_title: 'Settings', settings_lang: 'Language', settings_theme: 'Theme',
    settings_music: 'Music', settings_scene: 'Scene',
    home_eyebrow: 'R&D Subsidiary', home_title: 'Zenith Prime Labs',
    home_subtitle: 'Research & Development Division — StarLive Group',
    affil_eyebrow: 'Corporate Network', affil_title: 'Affiliates & Companies',
    affil_subtitle: 'StarLive Group and its subsidiaries',
    agent_eyebrow: 'Personnel Directory', agent_title: 'Administrators',
    agent_subtitle: 'Zenith Prime Labs system managers',
    project_eyebrow: 'Development Status', project_title: 'Active Projects',
    project_subtitle: 'Click Continue to use virtually',
    gallery_eyebrow: 'Activity Documentation', gallery_title: 'Gallery',
    gallery_subtitle: 'Photos and videos from Zenith Prime Labs',
    dashboard_eyebrow: 'Admin Only', dashboard_title: 'Security Dashboard',
    dashboard_subtitle: 'Real-time threat analysis and detection',
    chat_global: 'Global Chat', chat_friend: 'Friend Chat',
  },
  zh: {
    nav_home: '主页', nav_affiliation: '附属公司', nav_agent: '管理员',
    nav_project: '项目', nav_gallery: '图库', nav_dashboard: '控制台',
    login_btn: '门户登录', logout_btn: '退出',
    status_offline: '未登录', status_online: '安全',
    settings_title: '设置', settings_lang: '语言', settings_theme: '主题',
    settings_music: '音乐', settings_scene: '场景',
    home_eyebrow: 'R&D 子公司', home_title: 'Zenith Prime Labs',
    home_subtitle: '研发部门 — StarLive Group',
    affil_eyebrow: '企业网络', affil_title: '附属公司',
    affil_subtitle: 'StarLive Group 及其子公司',
    agent_eyebrow: '人员目录', agent_title: '管理员',
    agent_subtitle: 'Zenith Prime Labs 系统管理员',
    project_eyebrow: '开发状态', project_title: '活跃项目',
    project_subtitle: '点击继续以虚拟使用',
    gallery_eyebrow: '活动文档', gallery_title: '图库',
    gallery_subtitle: 'Zenith Prime Labs 活动照片和视频',
    dashboard_eyebrow: '仅限管理员', dashboard_title: '安全仪表板',
    dashboard_subtitle: '实时威胁分析与检测',
    chat_global: '全球聊天', chat_friend: '好友聊天',
  },
  ja: {
    nav_home: 'ホーム', nav_affiliation: '提携', nav_agent: 'エージェント',
    nav_project: 'プロジェクト', nav_gallery: 'ギャラリー', nav_dashboard: 'ダッシュボード',
    login_btn: 'ポータルログイン', logout_btn: 'ログアウト',
    status_offline: '未ログイン', status_online: 'セキュア',
    settings_title: '設定', settings_lang: '言語', settings_theme: 'テーマ',
    settings_music: '音楽', settings_scene: 'シーン',
    home_eyebrow: 'R&D 子会社', home_title: 'Zenith Prime Labs',
    home_subtitle: '研究開発部門 — StarLive Group',
    affil_eyebrow: '企業ネットワーク', affil_title: '提携・関連会社',
    affil_subtitle: 'StarLive Group とその子会社',
    agent_eyebrow: '人員ディレクトリ', agent_title: '管理者',
    agent_subtitle: 'Zenith Prime Labs システム管理者',
    project_eyebrow: '開発状況', project_title: 'アクティブプロジェクト',
    project_subtitle: '続けるをクリックして仮想的に使用',
    gallery_eyebrow: '活動ドキュメント', gallery_title: 'ギャラリー',
    gallery_subtitle: 'Zenith Prime Labs の活動写真・動画',
    dashboard_eyebrow: '管理者専用', dashboard_title: 'セキュリティダッシュボード',
    dashboard_subtitle: 'リアルタイム脅威分析・検出',
    chat_global: 'グローバルチャット', chat_friend: 'フレンドチャット',
  },
  ko: {
    nav_home: '홈', nav_affiliation: '제휴', nav_agent: '에이전트',
    nav_project: '프로젝트', nav_gallery: '갤러리', nav_dashboard: '대시보드',
    login_btn: '포털 로그인', logout_btn: '로그아웃',
    status_offline: '미로그인', status_online: '보안',
    settings_title: '설정', settings_lang: '언어', settings_theme: '테마',
    settings_music: '음악', settings_scene: '배경',
    home_eyebrow: 'R&D 자회사', home_title: 'Zenith Prime Labs',
    home_subtitle: '연구개발 부문 — StarLive Group',
    affil_eyebrow: '기업 네트워크', affil_title: '제휴 및 계열사',
    affil_subtitle: 'StarLive Group 및 자회사',
    agent_eyebrow: '직원 디렉토리', agent_title: '관리자',
    agent_subtitle: 'Zenith Prime Labs 시스템 관리자',
    project_eyebrow: '개발 현황', project_title: '활성 프로젝트',
    project_subtitle: '계속을 클릭하여 가상으로 사용',
    gallery_eyebrow: '활동 문서', gallery_title: '갤러리',
    gallery_subtitle: 'Zenith Prime Labs 활동 사진 및 동영상',
    dashboard_eyebrow: '관리자 전용', dashboard_title: '보안 대시보드',
    dashboard_subtitle: '실시간 위협 분석 및 탐지',
    chat_global: '글로벌 채팅', chat_friend: '친구 채팅',
  },
  de: {
    nav_home: 'Startseite', nav_affiliation: 'Affiliierte', nav_agent: 'Agenten',
    nav_project: 'Projekte', nav_gallery: 'Galerie', nav_dashboard: 'Dashboard',
    login_btn: 'Portal-Login', logout_btn: 'Abmelden',
    status_offline: 'Nicht angemeldet', status_online: 'Sicher',
    settings_title: 'Einstellungen', settings_lang: 'Sprache', settings_theme: 'Thema',
    settings_music: 'Musik', settings_scene: 'Szene',
    home_eyebrow: 'F&E-Tochterunternehmen', home_title: 'Zenith Prime Labs',
    home_subtitle: 'Forschungs- und Entwicklungsabteilung — StarLive Group',
    affil_eyebrow: 'Unternehmensnetzwerk', affil_title: 'Affiliierte & Unternehmen',
    affil_subtitle: 'StarLive Group und ihre Tochtergesellschaften',
    agent_eyebrow: 'Personalverzeichnis', agent_title: 'Administratoren',
    agent_subtitle: 'Zenith Prime Labs Systemverwalter',
    project_eyebrow: 'Entwicklungsstatus', project_title: 'Aktive Projekte',
    project_subtitle: 'Klicken Sie auf Weiter, um virtuell zu verwenden',
    gallery_eyebrow: 'Aktivitätsdokumentation', gallery_title: 'Galerie',
    gallery_subtitle: 'Fotos und Videos der Zenith Prime Labs Aktivitäten',
    dashboard_eyebrow: 'Nur Admin', dashboard_title: 'Sicherheits-Dashboard',
    dashboard_subtitle: 'Echtzeit-Bedrohungsanalyse und -erkennung',
    chat_global: 'Globaler Chat', chat_friend: 'Freundes-Chat',
  },
  ru: {
    nav_home: 'Главная', nav_affiliation: 'Партнёры', nav_agent: 'Агенты',
    nav_project: 'Проекты', nav_gallery: 'Галерея', nav_dashboard: 'Панель',
    login_btn: 'Вход на портал', logout_btn: 'Выйти',
    status_offline: 'Не вошли', status_online: 'Защищено',
    settings_title: 'Настройки', settings_lang: 'Язык', settings_theme: 'Тема',
    settings_music: 'Музыка', settings_scene: 'Сцена',
    home_eyebrow: 'Дочерняя компания R&D', home_title: 'Zenith Prime Labs',
    home_subtitle: 'Отдел исследований и разработок — StarLive Group',
    affil_eyebrow: 'Корпоративная сеть', affil_title: 'Партнёры и компании',
    affil_subtitle: 'StarLive Group и её дочерние компании',
    agent_eyebrow: 'Справочник персонала', agent_title: 'Администраторы',
    agent_subtitle: 'Системные администраторы Zenith Prime Labs',
    project_eyebrow: 'Статус разработки', project_title: 'Активные проекты',
    project_subtitle: 'Нажмите Продолжить для виртуального использования',
    gallery_eyebrow: 'Документация активности', gallery_title: 'Галерея',
    gallery_subtitle: 'Фото и видео мероприятий Zenith Prime Labs',
    dashboard_eyebrow: 'Только для админа', dashboard_title: 'Панель безопасности',
    dashboard_subtitle: 'Анализ угроз и обнаружение в реальном времени',
    chat_global: 'Глобальный чат', chat_friend: 'Чат с друзьями',
  }
};

// ─────────────────────────────────────────
// SEASON THEMES CONFIG
// ─────────────────────────────────────────
const SEASONS = {
  spring: {
    name: '🌸 Spring',
    label: 'Sakura',
    cssClass: 'season-spring',
    particleEmoji: '🌸',
    description: 'Kelopak sakura yang lembut'
  },
  summer: {
    name: '☘️ Summer',
    label: 'Clover',
    cssClass: 'season-summer',
    particleEmoji: '🍀',
    description: 'Semanggi hijau musim panas'
  },
  autumn: {
    name: '🍁 Autumn',
    label: 'Maple',
    cssClass: 'season-autumn',
    particleEmoji: '🍁',
    description: 'Daun maple gugur keemasan'
  },
  winter: {
    name: '❄️ Winter',
    label: 'Snow',
    cssClass: 'season-winter',
    particleEmoji: '❄️',
    description: 'Salju dingin yang membekukan'
  }
};

// ─────────────────────────────────────────
// SCENE BACKGROUNDS CONFIG
// ─────────────────────────────────────────
const SCENES = [
  { id: 'none', name: 'Partikel Default', icon: '✨', url: null },
  { id: 'nte_night', name: 'NTE Night City', icon: '🌆', url: 'assets/scene_nte_night.png' },
  { id: 'strinova', name: 'Strinova Arena', icon: '⚔️', url: 'assets/scene_strinova_arena.png' },
  { id: 'zenith_lab', name: 'Zenith Lab', icon: '🔬', url: 'assets/scene_zenith_lab.png' },
];

// ─────────────────────────────────────────
// DEFAULT MUSIC TRACKS (placeholder)
// ─────────────────────────────────────────
const DEFAULT_TRACKS = [
  { id: '1', name: 'Moonlight Sonata (Beethoven)', artist: 'Ludwig van Beethoven', duration: '5:36', src: 'https://archive.org/download/MoonlightSonata_827/LudwigVanBeethoven-MoonlightSonataFirstMovement.mp3' },
  { id: '2', name: 'Symphony No. 5 (Beethoven)', artist: 'Ludwig van Beethoven', duration: '7:21', src: 'https://archive.org/download/BeethovenSymphonyNo.5_201905/01_Beethoven_Symphony_No._5_in_C_minor_Op._67_-_I._Allegro_con_brio.mp3' },
  { id: '3', name: 'Fur Elise (Beethoven)', artist: 'Ludwig van Beethoven', duration: '3:04', src: 'https://archive.org/download/BeethovenFurElise_201806/Beethoven%20-%20Fur%20Elise.mp3' }
];

// ─────────────────────────────────────────
// SETTINGS MANAGER CLASS
// ─────────────────────────────────────────
class ZenithSettings {
  constructor() {
    this.currentLang = localStorage.getItem('zpl_lang') || 'id';
    this.currentSeason = localStorage.getItem('zpl_season') || 'spring';
    this.currentScene = localStorage.getItem('zpl_scene') || 'none';
    this.currentTrackIdx = 0;
    this.isPlaying = false;
    this.isAdminMode = false;

    // Load user-uploaded music/scenes from localStorage
    this.userTracks = JSON.parse(localStorage.getItem('zpl_user_tracks') || '[]');
    this.userScenes = JSON.parse(localStorage.getItem('zpl_user_scenes') || '[]');

    this.audioEl = new Audio();
    this.audioEl.volume = 0.4;

    this.initDOM();
    this.applyLang(this.currentLang);
    this.applySeason(this.currentSeason);
    this.applyScene(this.currentScene);
    this.bindEvents();
  }

  get allTracks() {
    return [...DEFAULT_TRACKS, ...this.userTracks];
  }

  get allScenes() {
    return [...SCENES, ...this.userScenes];
  }

  initDOM() {
    this.settingsBtn = document.getElementById('settings-btn');
    this.settingsPanel = document.getElementById('settings-panel');
    this.settingsOverlay = document.getElementById('settings-overlay');
    this.closeSettingsBtn = document.getElementById('close-settings-btn');
    this.sceneOverlay = document.getElementById('scene-overlay');
  }

  bindEvents() {
    if (this.settingsBtn) {
      this.settingsBtn.addEventListener('click', () => this.openPanel());
    }
    if (this.closeSettingsBtn) {
      this.closeSettingsBtn.addEventListener('click', () => this.closePanel());
    }
    if (this.settingsOverlay) {
      this.settingsOverlay.addEventListener('click', () => this.closePanel());
    }

    // Settings tab switching
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.settings-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-tab');
        const pane = document.getElementById(`settings-tab-${target}`);
        if (pane) pane.classList.add('active');
      });
    });

    // Language buttons
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.setLang(lang);
        document.querySelectorAll('.lang-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Season buttons
    document.querySelectorAll('.season-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const season = btn.getAttribute('data-season');
        this.setSeason(season);
        document.querySelectorAll('.season-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Music controls
    const playPauseBtn = document.getElementById('music-play-pause-btn');
    const prevBtn = document.getElementById('music-prev-btn');
    const nextBtn = document.getElementById('music-next-btn');
    const volSlider = document.getElementById('music-volume-slider');

    if (playPauseBtn) playPauseBtn.addEventListener('click', () => this.togglePlay());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevTrack());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextTrack());
    if (volSlider) {
      volSlider.addEventListener('input', () => {
        this.audioEl.volume = volSlider.value / 100;
      });
    }

    this.audioEl.addEventListener('ended', () => this.nextTrack());

    // Admin music upload
    const musicUploadBtn = document.getElementById('admin-music-upload-btn');
    const musicUploadInput = document.getElementById('admin-music-upload-input');
    if (musicUploadBtn && musicUploadInput) {
      musicUploadBtn.addEventListener('click', () => musicUploadInput.click());
      musicUploadInput.addEventListener('change', (e) => this.handleMusicUpload(e));
    }

    // Scene selection
    document.addEventListener('click', (e) => {
      const sceneBtn = e.target.closest('.scene-option-btn');
      if (sceneBtn) {
        const sceneId = sceneBtn.getAttribute('data-scene');
        this.setScene(sceneId);
        document.querySelectorAll('.scene-option-btn').forEach(b => b.classList.remove('active'));
        sceneBtn.classList.add('active');
      }
    });

    // Admin scene upload
    const sceneUploadBtn = document.getElementById('admin-scene-upload-btn');
    const sceneUploadInput = document.getElementById('admin-scene-upload-input');
    if (sceneUploadBtn && sceneUploadInput) {
      sceneUploadBtn.addEventListener('click', () => sceneUploadInput.click());
      sceneUploadInput.addEventListener('change', (e) => this.handleSceneUpload(e));
    }

    // Track list clicks
    document.addEventListener('click', (e) => {
      const trackItem = e.target.closest('.track-list-item');
      if (trackItem) {
        const idx = parseInt(trackItem.getAttribute('data-track-idx'));
        this.playTrack(idx);
      }
    });
  }

  openPanel() {
    if (this.settingsPanel) {
      this.settingsPanel.classList.add('open');
      this.settingsOverlay.classList.add('open');
      this.renderMusicList();
      this.renderSceneList();
      this.markActiveStates();
    }
    if (window.cyberAuth) window.cyberAuth.playBeep(800, 'sine', 0.06);
  }

  closePanel() {
    if (this.settingsPanel) {
      this.settingsPanel.classList.remove('open');
      this.settingsOverlay.classList.remove('open');
    }
  }

  markActiveStates() {
    // Mark active lang
    document.querySelectorAll('.lang-option-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === this.currentLang);
    });
    // Mark active season
    document.querySelectorAll('.season-option-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-season') === this.currentSeason);
    });
  }

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('zpl_lang', lang);
    this.applyLang(lang);
  }

  applyLang(lang) {
    const t = I18N[lang] || I18N['id'];
    // Nav links
    const navMap = {
      'home': t.nav_home, 'affiliation': t.nav_affiliation, 'agent': t.nav_agent,
      'project': t.nav_project, 'gallery': t.nav_gallery, 'dashboard': t.nav_dashboard
    };
    document.querySelectorAll('.nav-link[data-target]').forEach(link => {
      const target = link.getAttribute('data-target');
      if (navMap[target]) link.textContent = navMap[target];
    });

    // Dynamic text elements
    const apply = (id, key) => {
      const el = document.getElementById(id);
      if (el && t[key]) el.textContent = t[key];
    };
    apply('home-eyebrow', 'home_eyebrow');
    apply('home-page-title', 'home_title');
    apply('home-page-subtitle', 'home_subtitle');
    apply('affil-eyebrow', 'affil_eyebrow');
    apply('affil-page-title', 'affil_title');
    apply('affil-page-subtitle', 'affil_subtitle');
    apply('agent-eyebrow', 'agent_eyebrow');
    apply('agent-page-title', 'agent_title');
    apply('agent-page-subtitle', 'agent_subtitle');
    apply('project-eyebrow', 'project_eyebrow');
    apply('project-page-title', 'project_title');
    apply('project-page-subtitle', 'project_subtitle');
    apply('gallery-eyebrow', 'gallery_eyebrow');
    apply('gallery-page-title', 'gallery_title');
    apply('gallery-page-subtitle', 'gallery_subtitle');
    apply('dashboard-eyebrow', 'dashboard_eyebrow');
    apply('dashboard-page-title', 'dashboard_title');
    apply('dashboard-page-subtitle', 'dashboard_subtitle');
  }

  setSeason(season) {
    this.currentSeason = season;
    localStorage.setItem('zpl_season', season);
    this.applySeason(season);
    if (window.cyberBg) window.cyberBg.setSeason(season);
  }

  applySeason(season) {
    Object.values(SEASONS).forEach(s => {
      document.body.classList.remove(s.cssClass);
    });
    if (SEASONS[season]) {
      document.body.classList.add(SEASONS[season].cssClass);
    }
  }

  setScene(sceneId) {
    this.currentScene = sceneId;
    localStorage.setItem('zpl_scene', sceneId);
    this.applyScene(sceneId);
  }

  applyScene(sceneId) {
    const overlay = document.getElementById('scene-overlay');
    if (!overlay) return;
    const allScenes = this.allScenes;
    const scene = allScenes.find(s => s.id === sceneId);
    if (scene && scene.url) {
      overlay.style.backgroundImage = `url('${scene.url}')`;
      overlay.style.opacity = '1';
    } else {
      overlay.style.opacity = '0';
    }
  }

  renderMusicList() {
    const list = document.getElementById('music-track-list');
    if (!list) return;
    list.innerHTML = '';
    this.allTracks.forEach((track, idx) => {
      const item = document.createElement('div');
      item.className = `track-list-item ${idx === this.currentTrackIdx ? 'active' : ''}`;
      item.setAttribute('data-track-idx', idx);
      item.innerHTML = `
        <div class="track-info">
          <div class="track-name">${track.name}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <div class="track-duration">${track.duration}</div>
        ${track.src ? `<span class="track-has-file">▶</span>` : `<span class="track-no-file">—</span>`}
      `;
      list.appendChild(item);
    });

    // Show admin upload if admin
    const adminSection = document.getElementById('music-admin-section');
    if (adminSection) {
      adminSection.style.display = this.isAdminMode ? 'block' : 'none';
    }
  }

  renderSceneList() {
    const grid = document.getElementById('scene-options-grid');
    if (!grid) return;
    grid.innerHTML = '';
    this.allScenes.forEach(scene => {
      const btn = document.createElement('button');
      btn.className = `scene-option-btn ${scene.id === this.currentScene ? 'active' : ''}`;
      btn.setAttribute('data-scene', scene.id);
      btn.innerHTML = `
        <div class="scene-preview" ${scene.url ? `style="background-image:url('${scene.url}')"` : ''}>
          ${!scene.url ? `<span class="scene-icon">${scene.icon}</span>` : ''}
        </div>
        <div class="scene-name">${scene.name}</div>
      `;
      grid.appendChild(btn);
    });

    const adminSection = document.getElementById('scene-admin-section');
    if (adminSection) {
      adminSection.style.display = this.isAdminMode ? 'block' : 'none';
    }
  }

  playTrack(idx) {
    const track = this.allTracks[idx];
    if (!track) return;
    this.currentTrackIdx = idx;
    if (track.src) {
      this.audioEl.src = track.src;
      this.audioEl.play().then(() => {
        this.isPlaying = true;
        this.updatePlayPauseBtn();
      }).catch(() => {});
    } else {
      // Placeholder — no real audio file
      this.isPlaying = false;
      this.updatePlayPauseBtn();
      this.showMusicStatus(`▶ ${track.name} (File belum tersedia)`);
    }
    this.renderMusicList();
    this.updateMusicHUD();
  }

  togglePlay() {
    if (!this.allTracks[this.currentTrackIdx]) return;
    const track = this.allTracks[this.currentTrackIdx];
    if (this.isPlaying) {
      this.audioEl.pause();
      this.isPlaying = false;
    } else {
      if (track.src) {
        if (this.audioEl.src !== track.src) {
          this.audioEl.src = track.src;
        }
        this.audioEl.play().then(() => {
          this.isPlaying = true;
          this.updatePlayPauseBtn();
        }).catch(() => {});
      }
    }
    this.updatePlayPauseBtn();
  }

  prevTrack() {
    const idx = (this.currentTrackIdx - 1 + this.allTracks.length) % this.allTracks.length;
    this.playTrack(idx);
  }

  nextTrack() {
    const idx = (this.currentTrackIdx + 1) % this.allTracks.length;
    this.playTrack(idx);
  }

  updatePlayPauseBtn() {
    const btn = document.getElementById('music-play-pause-btn');
    if (btn) btn.innerHTML = this.isPlaying
      ? `<i data-lucide="pause" style="width:16px;height:16px;"></i>`
      : `<i data-lucide="play" style="width:16px;height:16px;"></i>`;
    if (window.initIcons) window.initIcons();
  }

  updateMusicHUD() {
    const track = this.allTracks[this.currentTrackIdx];
    const nameEl = document.getElementById('hud-track-name');
    const artistEl = document.getElementById('hud-track-artist');
    if (nameEl && track) nameEl.textContent = track.name;
    if (artistEl && track) artistEl.textContent = track.artist;
  }

  showMusicStatus(msg) {
    const statusEl = document.getElementById('music-status-msg');
    if (statusEl) {
      statusEl.textContent = msg;
      statusEl.style.opacity = '1';
      setTimeout(() => { statusEl.style.opacity = '0'; }, 3000);
    }
  }

  handleMusicUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newTrack = {
        id: `user_${Date.now()}`,
        name: file.name.replace(/\.[^.]+$/, ''),
        artist: 'Upload Admin',
        duration: '--:--',
        src: ev.target.result
      };
      this.userTracks.push(newTrack);
      localStorage.setItem('zpl_user_tracks', JSON.stringify(this.userTracks));
      this.renderMusicList();
      this.showMusicStatus(`✅ ${newTrack.name} berhasil diunggah`);
    };
    reader.readAsDataURL(file);
  }

  handleSceneUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newScene = {
        id: `user_scene_${Date.now()}`,
        name: file.name.replace(/\.[^.]+$/, ''),
        icon: '🖼️',
        url: ev.target.result
      };
      this.userScenes.push(newScene);
      localStorage.setItem('zpl_user_scenes', JSON.stringify(this.userScenes));
      this.renderSceneList();
    };
    reader.readAsDataURL(file);
  }

  enableAdminMode() {
    this.isAdminMode = true;
    const adminBadges = document.querySelectorAll('.admin-only-show');
    adminBadges.forEach(el => el.style.display = 'block');
  }

  disableAdminMode() {
    this.isAdminMode = false;
    const adminBadges = document.querySelectorAll('.admin-only-show');
    adminBadges.forEach(el => el.style.display = 'none');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.zenithSettings = new ZenithSettings();
});
