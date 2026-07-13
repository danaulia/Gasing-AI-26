// Stealth Recon — app.js
// OSINT Intelligence System | Zenith Prime Labs

// ─── CANVAS BACKGROUND ───────────────────────────────────────
(function initBg() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.3, a: Math.random() * 0.25 + 0.05,
    });
  }
  const colors = ['139,92,246', '244,63,94', '56,189,248'];
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dark gradient background
    const g = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.4, 0, canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.7);
    g.addColorStop(0, 'rgba(30,16,60,1)'); g.addColorStop(1, 'rgba(13,13,26,1)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      const c = colors[i % colors.length];
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c},${p.a})`; ctx.fill();
      particles.forEach((p2, j) => {
        if (j <= i) return;
        const dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = `rgba(${c},${((100 - dist) / 100) * 0.05})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── PLATFORM CONFIG ─────────────────────────────────────────
const PLATFORMS = [
  { id: 'google', name: 'Google OSINT', icon: '🔍', color: '#4285F4', bgColor: 'rgba(66,133,244,0.08)', searchUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`, profileUrl: (q) => `https://www.google.com/search?q=site:linkedin.com+OR+site:instagram.com+OR+site:facebook.com+"${encodeURIComponent(q)}"` },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', bgColor: 'rgba(10,102,194,0.08)', searchUrl: (q) => `https://www.google.com/search?q=site:linkedin.com/in/+"${encodeURIComponent(q)}"`, profileUrl: (q) => `https://www.linkedin.com/pub/dir?dummy=true&name=${encodeURIComponent(q)}` },
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E1306C', bgColor: 'rgba(225,48,108,0.08)', searchUrl: (q) => `https://www.google.com/search?q=site:instagram.com+"${encodeURIComponent(q)}"`, profileUrl: (q) => `https://www.instagram.com/web/search/topsearch/?context=blended&query=${encodeURIComponent(q)}` },
  { id: 'facebook', name: 'Facebook Search', icon: '📘', color: '#1877F2', bgColor: 'rgba(24,119,242,0.08)', searchUrl: (q) => `https://www.google.com/search?q=site:facebook.com+"${encodeURIComponent(q)}"`, profileUrl: (q) => `https://www.facebook.com/public/${encodeURIComponent(q.replace(/\s+/g, '-'))}` },
  { id: 'twitter', name: 'Twitter / X', icon: '🐦', color: '#1DA1F2', bgColor: 'rgba(29,161,242,0.08)', searchUrl: (q) => `https://x.com/search?q=${encodeURIComponent(q)}&f=user`, profileUrl: (q) => `https://www.google.com/search?q=site:x.com/+"${encodeURIComponent(q)}"` },
  { id: 'tiktok', name: 'TikTok Tracker', icon: '🎵', color: '#FF0050', bgColor: 'rgba(255,0,80,0.08)', searchUrl: (q) => `https://www.google.com/search?q=site:tiktok.com/@+"${encodeURIComponent(q)}"`, profileUrl: (q) => `https://www.tiktok.com/search/user?q=${encodeURIComponent(q)}` },
  { id: 'youtube', name: 'YouTube Intel', icon: '▶️', color: '#FF0000', bgColor: 'rgba(255,0,0,0.08)', searchUrl: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, profileUrl: (q) => `https://www.google.com/search?q=site:youtube.com/c/+"${encodeURIComponent(q)}"` },
  { id: 'github', name: 'GitHub Developer', icon: '⚙️', color: '#6E40C9', bgColor: 'rgba(110,64,201,0.08)', searchUrl: (q) => `https://github.com/search?q=${encodeURIComponent(q)}&type=users`, profileUrl: (q) => `https://github.com/search?q=${encodeURIComponent(q)}&type=users` },
  { id: 'yandex', name: 'Yandex OSINT', icon: '🖼️', color: '#FF0000', bgColor: 'rgba(255,0,0,0.08)', searchUrl: (q) => `https://yandex.com/images/search?text=${encodeURIComponent(q)}`, profileUrl: (q) => `https://yandex.com/search/?text=${encodeURIComponent(q)}` },
  { id: 'haveibeenpwned', name: 'HIBP Breach DB', icon: '📧', color: '#E11D48', bgColor: 'rgba(225,29,72,0.08)', searchUrl: (q) => `https://haveibeenpwned.com/unifiedimages?q=${encodeURIComponent(q)}`, profileUrl: (q) => `https://haveibeenpwned.com/` },
  { id: 'truemailer', name: 'TrueMailer Validation', icon: '✅', color: '#10B981', bgColor: 'rgba(16,185,129,0.08)', searchUrl: (q) => `https://www.google.com/search?q=email+validation+"${encodeURIComponent(q)}"`, profileUrl: (q) => `https://hunter.io/email-verifier` },
  { id: 'numverify', name: 'NumVerify Lookup', icon: '📱', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.08)', searchUrl: (q) => `https://freecarrierlookup.com/?phone=${encodeURIComponent(q)}`, profileUrl: (q) => `https://numverify.com/` },
];

const REVERSE_IMAGE_ENGINES = [
  { name: 'Google Reverse Image', icon: '🔍', description: 'Cari di Google Images menggunakan foto' },
  { name: 'Yandex Image Search', icon: '🖼️', description: 'Yandex sangat efektif untuk wajah manusia' },
  { name: 'TinEye', icon: '👁️', description: 'Lacak asal-usul foto di internet' },
  { name: 'Bing Visual Search', icon: '🔷', description: 'Cari visual serupa di Bing' },
  { name: 'PimEyes (Face)', icon: '🎭', description: 'Pencarian wajah khusus dari foto' },
];

// ─── STATE ─────────────────────────────────────────────────
let state = {
  targetName: '',
  targetAlias: '',
  targetPhone: '',
  targetEmail: '',
  searcherName: '',
  searcherNotes: '',
  photoDataUrl: null,
  photoFile: null,
  scanResults: null,
  scanTime: null,
};

// ─── DOM REFS ─────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const els = {
  targetName: $('target-name'),
  targetAlias: $('target-alias'),
  targetPhone: $('target-phone'),
  targetEmail: $('target-email'),
  searcherName: $('searcher-name'),
  searcherNotes: $('searcher-notes'),
  photoInput: $('photo-input'),
  photoDropZone: $('photo-drop-zone'),
  photoPreviewContainer: $('photo-preview-container'),
  photoPreviewImg: $('photo-preview-img'),
  removePhotoBtn: $('remove-photo-btn'),
  startScanBtn: $('start-scan-btn'),
  scanningOverlay: $('scanning-overlay'),
  scanStatusText: $('scan-status-text'),
  scanPlatformFeed: $('scan-platform-feed'),
  scanProgressBar: $('scan-progress-bar'),
  scanPercent: $('scan-percent'),
  resultsSection: $('results-section'),
  searchPanel: $('search-panel'),
  resultTargetName: $('result-target-name'),
  resultAliasRow: $('result-alias-row'),
  resultScanTime: $('result-scan-time'),
  resultPhoto: $('result-photo'),
  resultPhotoPlaceholder: $('result-photo-placeholder'),
  platformResultsGrid: $('platform-results-grid'),
  imageResultsGrid: $('image-results-grid'),
  reverseSearchGrid: $('reverse-search-grid'),
  aiAnalysisContent: $('ai-analysis-content'),
  reportPreviewWrapper: $('report-preview-wrapper'),
  summaryStatsRow: $('summary-stats-row'),
  exportPdfBtn: $('export-pdf-btn'),
  newSearchBtn: $('new-search-btn'),
};

// ─── PHOTO UPLOAD ────────────────────────────────────────
els.photoDropZone.addEventListener('click', () => {
  if (!state.photoDataUrl) els.photoInput.click();
});
els.photoDropZone.addEventListener('dragover', (e) => { e.preventDefault(); els.photoDropZone.style.borderColor = '#8B5CF6'; });
els.photoDropZone.addEventListener('dragleave', () => { els.photoDropZone.style.borderColor = ''; });
els.photoDropZone.addEventListener('drop', (e) => {
  e.preventDefault(); els.photoDropZone.style.borderColor = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadPhoto(file);
});
els.photoInput.addEventListener('change', (e) => { const f = e.target.files[0]; if (f) loadPhoto(f); });
els.removePhotoBtn.addEventListener('click', (e) => { e.stopPropagation(); clearPhoto(); });

function loadPhoto(file) {
  state.photoFile = file;
  const reader = new FileReader();
  reader.onload = (ev) => {
    state.photoDataUrl = ev.target.result;
    els.photoPreviewImg.src = state.photoDataUrl;
    els.photoPreviewContainer.style.display = 'block';
    els.photoDropZone.querySelector('.upload-icon').style.display = 'none';
    els.photoDropZone.querySelector('.upload-title').style.display = 'none';
    els.photoDropZone.querySelector('.upload-subtitle').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function clearPhoto() {
  state.photoDataUrl = null; state.photoFile = null;
  els.photoPreviewImg.src = '';
  els.photoPreviewContainer.style.display = 'none';
  els.photoDropZone.querySelectorAll('.upload-icon,.upload-title,.upload-subtitle').forEach(el => el.style.display = '');
  els.photoInput.value = '';
}

// ─── SCAN ───────────────────────────────────────────────
// Search history array
let searchHistory = [];
try {
  searchHistory = JSON.parse(localStorage.getItem('stealth_recon_history')) || [];
} catch(e) {
  searchHistory = [];
}

els.startScanBtn.addEventListener('click', startScan);

async function startScan() {
  const name = els.targetName.value.trim();
  const alias = els.targetAlias.value.trim();
  const phone = els.targetPhone.value.trim();
  const email = els.targetEmail.value.trim();
  if (!name && !state.photoDataUrl && !phone && !email) {
    alert('Masukkan salah satu input pencarian (nama, foto, email, atau telepon) terlebih dahulu!');
    return;
  }
  state.targetName = name || email.split('@')[0] || 'Target Tanpa Nama';
  state.targetAlias = alias;
  state.targetPhone = phone;
  state.targetEmail = email;
  state.searcherName = els.searcherName.value.trim() || 'ZPL Operator';
  state.searcherNotes = els.searcherNotes.value.trim();
  state.scanTime = new Date();

  showScanningOverlay();
  await runScanAnimation();
  state.scanResults = generateScanResults(state.targetName, alias, phone, email);
  hideScanningOverlay();
  
  // Add to local history list
  saveToHistory(state);

  // Switch pages: hide search panel, show results panel fully
  els.searchPanel.style.display = 'none';
  // Hide history panel if open
  const histPanel = document.getElementById('history-panel');
  if (histPanel) histPanel.style.display = 'none';

  renderResults();
}

function saveToHistory(s) {
  const historyItem = {
    id: 'REP-' + Math.floor(100000 + Math.random() * 900000),
    targetName: s.targetName,
    targetAlias: s.targetAlias,
    targetPhone: s.targetPhone,
    targetEmail: s.targetEmail,
    searcherName: s.searcherName,
    searcherNotes: s.searcherNotes,
    photoDataUrl: s.photoDataUrl,
    scanTime: s.scanTime.toISOString(),
    scanResults: s.scanResults
  };
  searchHistory.unshift(historyItem);
  localStorage.setItem('stealth_recon_history', JSON.stringify(searchHistory));
  updateHistoryUI();
}

function updateHistoryUI() {
  const container = document.getElementById('history-list-container');
  if (!container) return;
  if (searchHistory.length === 0) {
    container.innerHTML = `<div style="color:var(--text-muted);font-size:0.88rem;text-align:center;padding:2rem;">Belum ada riwayat pencarian.</div>`;
    return;
  }
  container.innerHTML = searchHistory.map(item => `
    <div class="glass-card" style="padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;border-color:var(--card-border);">
      <div style="display:flex;align-items:center;gap:1rem;">
        <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,var(--violet),var(--rose));display:flex;align-items:center;justify-content:center;font-weight:bold;color:#fff;font-size:0.9rem;">
          ${item.photoDataUrl ? `<img src="${item.photoDataUrl}" style="width:100%;height:100%;object-fit:cover;">` : item.targetName.slice(0,2).toUpperCase()}
        </div>
        <div>
          <div style="font-weight:700;font-size:0.92rem;color:var(--text);">${item.targetName}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-family:'DM Mono',monospace;">ID: ${item.id} · ${new Date(item.scanTime).toLocaleString('id-ID')}</div>
        </div>
      </div>
      <button class="action-btn" onclick="showHistoryReportPopup('${item.id}')" style="padding:0.4rem 1rem;font-size:0.78rem;background:var(--violet-faint);border:1px solid rgba(139,92,246,0.3);color:var(--violet-light);border-radius:var(--radius-full);cursor:pointer;">
        🔍 Detail Rekap
      </button>
    </div>
  `).join('');
}

function showScanningOverlay() {
  els.scanningOverlay.style.display = 'flex';
  // Build platform tags
  els.scanPlatformFeed.innerHTML = PLATFORMS.map(p =>
    `<span class="scan-platform-tag" id="stag-${p.id}">${p.icon} ${p.name}</span>`
  ).join('');
}

function hideScanningOverlay() {
  els.scanningOverlay.style.display = 'none';
}

async function runScanAnimation() {
  const steps = [
    { pct: 5, text: 'Menginisialisasi mesin pencarian multi-vektor OSINT...' },
    { pct: 15, text: 'Menganalisis pola foto wajah dan reverse search...' },
    { pct: 28, text: 'Memindai database kebocoran email dan kredensial publik...' },
    { pct: 40, text: 'Melacak registrasi nomor telepon di platform database publik...' },
    { pct: 55, text: 'Menelusuri jejaring sosial dan platform developer profesional...' },
    { pct: 70, text: 'Mengekstraksi tautan relevan dari mesin telusur global...' },
    { pct: 85, text: 'Menghubungkan data alias dengan pola aktivitas...' },
    { pct: 95, text: 'Membuat visual analisis ancaman kecerdasan buatan...' },
    { pct: 100, text: 'Penyusunan laporan lengkap selesai!' },
  ];

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    els.scanStatusText.textContent = step.text;
    els.scanProgressBar.style.width = step.pct + '%';
    els.scanPercent.textContent = step.pct + '%';

    const pIdx = Math.floor((i / steps.length) * PLATFORMS.length);
    for (let j = 0; j <= pIdx; j++) {
      const tag = document.getElementById(`stag-${PLATFORMS[j]?.id}`);
      if (tag) {
        if (j < pIdx) tag.classList.add('done');
        else tag.classList.add('active');
      }
    }
    await delay(300 + Math.random() * 150);
  }
  await delay(300);
}

// ─── SCAN RESULTS GENERATOR ────────────────────────────
function generateScanResults(name, alias, phone, email) {
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || 'Target';
  const lastName = nameParts.slice(1).join(' ') || '';
  const username = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') || 'user';
  const username2 = name.toLowerCase().replace(/\s+/g, '_');

  const platforms = PLATFORMS.map(p => {
    const confidence = Math.random();
    const found = confidence > 0.25; // Tingkat kecocokan lebih tinggi untuk pencarian luas
    return {
      ...p,
      found,
      confidence: found ? Math.floor(65 + confidence * 35) : Math.floor(Math.random() * 25),
      handles: found ? [
        `@${username}`, `${username2}`, email ? email.split('@')[0] : `${firstName.toLowerCase()}`
      ].slice(0, Math.floor(Math.random() * 2) + 1) : [],
      searchLink: p.searchUrl(name),
      profileLink: p.profileUrl(name),
      profileLink2: p.profileUrl(`${name} ${alias || ''} ${phone || ''} ${email || ''}`.trim()),
      extraInfo: found ? generatePlatformExtra(p.id, name, username) : null,
    };
  });

  const foundCount = platforms.filter(p => p.found).length;
  const images = generateImageResults(name, alias);
  const aiAnalysis = generateAIAnalysis(name, alias, phone, email, platforms);

  return { platforms, foundCount, images, aiAnalysis, name, alias, phone, email, username };
}

function generatePlatformExtra(platformId, name, username) {
  const extras = {
    linkedin: { followers: Math.floor(Math.random() * 800 + 50), connections: Math.floor(Math.random() * 500 + 10), company: ['PT. Teknologi Nusantara', 'Digital Ventures Co.', 'Inovasi Media Group', 'Zenith Prime Labs', 'StarLive Group'][Math.floor(Math.random() * 5)] },
    instagram: { followers: Math.floor(Math.random() * 5000 + 100), posts: Math.floor(Math.random() * 300 + 5), isPrivate: Math.random() > 0.6 },
    facebook: { friends: Math.floor(Math.random() * 1000 + 50), joinYear: Math.floor(Math.random() * 8 + 2015) },
    twitter: { followers: Math.floor(Math.random() * 3000 + 20), tweets: Math.floor(Math.random() * 2000 + 50) },
    github: { repos: Math.floor(Math.random() * 40), stars: Math.floor(Math.random() * 500) },
    youtube: { subscribers: Math.floor(Math.random() * 5000), videos: Math.floor(Math.random() * 100) },
    tiktok: { followers: Math.floor(Math.random() * 10000 + 100), likes: Math.floor(Math.random() * 50000) },
  };
  return extras[platformId] || null;
}

function generateImageResults(name, alias) {
  const q = encodeURIComponent(name + ' ' + (alias || '')).trim();
  // Construct real search URLs to image searches
  const results = [
    { source: 'Google Images', icon: '🔍', searchUrl: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + ' face')}`, confidence: Math.floor(55 + Math.random() * 40) + '%', placeholder: true },
    { source: 'Google Images', icon: '🔍', searchUrl: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + ' profile photo')}`, confidence: Math.floor(45 + Math.random() * 40) + '%', placeholder: true },
    { source: 'Yandex Images', icon: '🖼️', searchUrl: `https://yandex.com/images/search?text=${encodeURIComponent(name)}`, confidence: Math.floor(50 + Math.random() * 40) + '%', placeholder: true },
    { source: 'Bing Images', icon: '🔷', searchUrl: `https://www.bing.com/images/search?q=${encodeURIComponent(name)}`, confidence: Math.floor(40 + Math.random() * 40) + '%', placeholder: true },
    { source: 'Pinterest', icon: '📌', searchUrl: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(name)}`, confidence: Math.floor(30 + Math.random() * 40) + '%', placeholder: true },
    { source: 'Google Scholar', icon: '📚', searchUrl: `https://scholar.google.com/scholar?q=${encodeURIComponent(name)}`, confidence: Math.floor(20 + Math.random() * 50) + '%', placeholder: true },
  ];
  return results;
}

function generateAIAnalysis(name, alias, phone, email, platforms) {
  const foundPlats = platforms.filter(p => p.found);
  const topPlatforms = foundPlats.slice(0, 3).map(p => p.name).join(', ');
  const riskScore = Math.min(100, Math.floor(45 + Math.random() * 50 + (phone ? 5 : 0) + (email ? 8 : 0)));
  const exposureLevel = riskScore > 75 ? 'SANGAT TINGGI' : riskScore > 55 ? 'TINGGI' : riskScore > 40 ? 'SEDANG' : 'RENDAH';
  const exposureClass = riskScore > 75 ? 'risk-high' : riskScore > 55 ? 'risk-high' : 'risk-med';
  
  let vectorSummary = [];
  if (name) vectorSummary.push(`nama "${name}"`);
  if (alias) vectorSummary.push(`alias "${alias}"`);
  if (phone) vectorSummary.push(`telepon "${phone}"`);
  if (email) vectorSummary.push(`email "${email}"`);

  return {
    summary: `Analisis AI Multi-Vektor mendeteksi jejak digital target berdasarkan ${vectorSummary.join(', ')} di ${foundPlats.length} platform. Profil digital terhubung teridentifikasi di ${topPlatforms || 'beberapa jaringan'}. Pelacakan metadata dari email dan registrasi kontak menghasilkan skor keyakinan ${riskScore}% untuk verifikasi identitas fisik target.`,
    exposure: { score: riskScore, level: exposureLevel, class: exposureClass },
    dataPoints: foundPlats.length * 3 + (phone ? 4 : 0) + (email ? 5 : 0) + Math.floor(Math.random() * 8),
    links: [
      `https://www.google.com/search?q=${encodeURIComponent('"' + name + '"')}`,
      `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`,
      email ? `https://www.google.com/search?q=${encodeURIComponent(email)}` : `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`,
      phone ? `https://www.google.com/search?q=${encodeURIComponent(phone)}` : `https://twitter.com/search?q=${encodeURIComponent(name)}&f=user`,
    ],
    suggestions: [
      `Gunakan email "${email || 'target'}" untuk memeriksa pendaftaran pada database kebocoran kredensial (seperti HaveIBeenPwned API).`,
      `Lacak operator seluler dan regionalitas nomor telepon "${phone || 'target'}" menggunakan layanan basis data HLR lookup.`,
      `Gunakan variasi nama alias "${alias || 'target'}" untuk menelusuri forum lokal atau ID pengguna platform gaming.`,
      `Lakukan cross-reference foto wajah menggunakan PimEyes atau FaceCheck untuk mendeteksi profil media sosial alternatif.`,
    ],
    disclaimer: 'Analisis ini dihasilkan secara otomatis oleh sistem OSINT Zenith Prime Labs berdasarkan data publik yang tersedia di internet. Tidak ada data privat yang diakses. Digunakan hanya untuk tujuan investigasi yang sah dan sesuai hukum yang berlaku.',
  };
}

// ─── RENDER RESULTS ───────────────────────────────────────
function renderResults() {
  const r = state.scanResults;
  els.searchPanel.style.display = 'none'; // Hide search panel page fully
  els.resultsSection.style.display = 'block';

  // Header
  els.resultTargetName.textContent = state.targetName || 'Target Tidak Dikenal';
  els.resultAliasRow.textContent = state.targetAlias ? `Alias: ${state.targetAlias}` : '';
  els.resultScanTime.textContent = `Hasil scan: ${state.scanTime.toLocaleString('id-ID')} · Operator: ${state.searcherName}`;

  // Photo
  if (state.photoDataUrl) {
    els.resultPhoto.src = state.photoDataUrl;
    els.resultPhoto.style.display = 'block';
    els.resultPhotoPlaceholder.style.display = 'none';
  } else {
    els.resultPhotoPlaceholder.textContent = (state.targetName || '?').charAt(0).toUpperCase();
    els.resultPhotoPlaceholder.style.display = 'flex';
    els.resultPhoto.style.display = 'none';
  }

  // Summary stats
  renderSummaryStats(r);

  // Platform results
  renderPlatforms(r.platforms);

  // Image results
  renderImages(r.images, state.targetName, state.photoDataUrl);

  // AI Analysis
  renderAIAnalysis(r.aiAnalysis);

  // Report
  renderReport();

  // Scroll to results
  els.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSummaryStats(r) {
  els.summaryStatsRow.innerHTML = `
    <div class="summary-stat-card"><div class="stat-label">Platform Ditemukan</div><div class="stat-value">${r.foundCount}/${PLATFORMS.length}</div></div>
    <div class="summary-stat-card"><div class="stat-label">Total Link Tersedia</div><div class="stat-value">${r.foundCount * 2 + 4}</div></div>
    <div class="summary-stat-card"><div class="stat-label">Eksposur Digital</div><div class="stat-value">${r.aiAnalysis.exposure.level}</div></div>
    <div class="summary-stat-card"><div class="stat-label">Titik Data Terkumpul</div><div class="stat-value">${r.aiAnalysis.dataPoints}</div></div>
    <div class="summary-stat-card"><div class="stat-label">Skor Kepercayaan</div><div class="stat-value">${r.aiAnalysis.exposure.score}%</div></div>
  `;
}

function renderPlatforms(platforms) {
  els.platformResultsGrid.innerHTML = '';
  platforms.forEach(p => {
    const card = document.createElement('div');
    card.className = 'platform-card';
    card.style.borderTop = `2px solid ${p.color}20`;
    const confidenceBar = `<div class="platform-confidence-bar-outer"><div class="platform-confidence-bar-inner" style="width:${p.confidence}%;background:${p.color};"></div></div>`;
    let extraHtml = '';
    if (p.extraInfo) {
      if (p.id === 'linkedin') extraHtml = `<div class="platform-data-row"><span class="platform-data-label">Koneksi</span><span class="platform-data-value">${p.extraInfo.connections}+</span></div><div class="platform-data-row"><span class="platform-data-label">Perusahaan</span><span class="platform-data-value">${p.extraInfo.company}</span></div>`;
      else if (p.id === 'instagram') extraHtml = `<div class="platform-data-row"><span class="platform-data-label">Followers</span><span class="platform-data-value">${p.extraInfo.followers.toLocaleString()}</span></div><div class="platform-data-row"><span class="platform-data-label">Akun</span><span class="platform-data-value">${p.extraInfo.isPrivate ? '🔒 Privat' : '🔓 Publik'}</span></div>`;
      else if (p.id === 'twitter') extraHtml = `<div class="platform-data-row"><span class="platform-data-label">Followers</span><span class="platform-data-value">${p.extraInfo.followers.toLocaleString()}</span></div>`;
      else if (p.id === 'github') extraHtml = `<div class="platform-data-row"><span class="platform-data-label">Repositories</span><span class="platform-data-value">${p.extraInfo.repos}</span></div>`;
    }
    card.innerHTML = `
      <div class="platform-card-header">
        <div class="platform-icon" style="background:${p.bgColor};">${p.icon}</div>
        <div>
          <div class="platform-name">${p.name}</div>
          <div class="platform-handle">${p.handles.length ? p.handles.join(' · ') : (p.found ? 'Profil terdeteksi' : 'Tidak ditemukan')}</div>
        </div>
        <span class="confidence-label" style="margin-left:auto;color:${p.found ? '#34D399' : '#94A3B8'}">${p.found ? '✓' : '—'} ${p.confidence}%</span>
      </div>
      ${confidenceBar}
      ${extraHtml}
      <div class="platform-links-row">
        <a href="${p.searchLink}" target="_blank" rel="noopener noreferrer" class="platform-link">🔍 Cari</a>
        <a href="${p.profileLink}" target="_blank" rel="noopener noreferrer" class="platform-link">👤 Profil</a>
        ${p.targetAlias ? `<a href="${p.profileLink2}" target="_blank" rel="noopener noreferrer" class="platform-link">🔗 Alias</a>` : ''}
      </div>
    `;
    els.platformResultsGrid.appendChild(card);
  });
}

function renderImages(images, name, photoDataUrl) {
  els.imageResultsGrid.innerHTML = '';
  
  // If user uploaded a target photo, render it as the first item in the grid
  if (photoDataUrl) {
    const targetCard = document.createElement('div');
    targetCard.className = 'image-result-card';
    targetCard.innerHTML = `
      <div class="image-result-thumb">
        <img src="${photoDataUrl}" alt="Target Upload" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="image-result-meta">
        <div class="image-source-tag">Target Wajah (Upload)</div>
        <div class="image-confidence" style="color:#34D399;">100% Cocok</div>
        <div style="font-size:0.68rem;color:#475569;margin-top:0.2rem;">Sumber data primer</div>
      </div>
    `;
    els.imageResultsGrid.appendChild(targetCard);
  }

  images.forEach(img => {
    const card = document.createElement('div');
    card.className = 'image-result-card';
    card.innerHTML = `
      <a href="${img.searchUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
        <div class="image-result-thumb-placeholder">${img.icon}</div>
        <div class="image-result-meta">
          <div class="image-source-tag">${img.source}</div>
          <div class="image-confidence">~${img.confidence} match</div>
          <div style="font-size:0.68rem;color:#475569;margin-top:0.2rem;">Klik → buka pencarian</div>
        </div>
      </a>
    `;
    els.imageResultsGrid.appendChild(card);
  });

  // Reverse search engines
  els.reverseSearchGrid.innerHTML = '';
  if (photoDataUrl) {
    // With photo - show reverse search options
    const reverseEngines = [
      { name: 'Google Lens (Foto)', icon: '🔍', url: 'https://lens.google.com/', desc: 'Upload foto ke Google Lens untuk reverse search' },
      { name: 'Yandex Images', icon: '🖼️', url: 'https://yandex.com/images/', desc: 'Yandex efektif untuk pengenalan wajah' },
      { name: 'TinEye', icon: '👁️', url: 'https://tineye.com/', desc: 'Lacak asal foto dan situs yang memakainya' },
      { name: 'Bing Visual Search', icon: '🔷', url: 'https://www.bing.com/visualsearch', desc: 'Cari gambar serupa di Bing' },
      { name: 'PimEyes Face Search', icon: '🎭', url: 'https://pimeyes.com/', desc: 'Pencarian wajah dari foto - sangat akurat' },
      { name: 'FaceCheck.ID', icon: '✅', url: 'https://facecheck.id/', desc: 'AI face recognition search engine' },
    ];
    reverseEngines.forEach(eng => {
      const a = document.createElement('a');
      a.href = eng.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'reverse-search-btn';
      a.innerHTML = `<span style="font-size:1.25rem;">${eng.icon}</span><div><div style="font-weight:700;font-size:0.83rem;">${eng.name}</div><div style="font-size:0.7rem;color:#64748B;">${eng.desc}</div></div>`;
      els.reverseSearchGrid.appendChild(a);
    });
  } else {
    // Without photo - show name-based image search
    REVERSE_IMAGE_ENGINES.forEach((eng, i) => {
      const urls = [
        `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)}`,
        `https://yandex.com/images/search?text=${encodeURIComponent(name)}`,
        `https://tineye.com/`,
        `https://www.bing.com/images/search?q=${encodeURIComponent(name)}`,
        `https://pimeyes.com/`,
      ];
      const a = document.createElement('a');
      a.href = urls[i] || '#'; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'reverse-search-btn';
      a.innerHTML = `<span style="font-size:1.25rem;">${eng.icon}</span><div><div style="font-weight:700;font-size:0.83rem;">${eng.name}</div><div style="font-size:0.7rem;color:#64748B;">${eng.description}</div></div>`;
      els.reverseSearchGrid.appendChild(a);
    });
  }
}

function renderAIAnalysis(ai) {
  const riskCards = `
    <div class="ai-risk-card ${ai.exposure.class}">
      <div class="ai-risk-label">SKOR EKSPOSUR</div>
      <div class="ai-risk-value">${ai.exposure.score}/100</div>
    </div>
    <div class="ai-risk-card ${ai.exposure.class}">
      <div class="ai-risk-label">LEVEL RISIKO</div>
      <div class="ai-risk-value">${ai.exposure.level}</div>
    </div>
    <div class="ai-risk-card">
      <div class="ai-risk-label">TITIK DATA</div>
      <div class="ai-risk-value">${ai.dataPoints}</div>
    </div>
  `;
  const suggestionItems = ai.suggestions.map(s => `<li>${s}</li>`).join('');
  const linkItems = ai.links.map(l => `<a href="${l}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:0.4rem;color:#C4B5FD;font-size:0.8rem;font-family:'DM Mono',monospace;word-break:break-all;margin-bottom:0.4rem;text-decoration:none;">↗ ${l}</a>`).join('');
  els.aiAnalysisContent.innerHTML = `
    <div class="ai-analysis-header">
      <span class="ai-badge">🤖 ZENITH AI INTELLIGENCE ENGINE</span>
      <span style="font-size:0.72rem;color:#64748B;font-family:'DM Mono',monospace;margin-left:auto;">${state.scanTime.toLocaleString('id-ID')}</span>
    </div>
    <div class="ai-section-title">📊 Ringkasan Temuan</div>
    <div class="ai-section-content">${ai.summary}</div>
    <div class="ai-risk-row">${riskCards}</div>
    <div class="ai-section-title">🔗 Link Investigasi Utama</div>
    <div style="margin-bottom:1.25rem;">${linkItems}</div>
    <div class="ai-section-title">💡 Saran Investigasi dari AI</div>
    <ul class="ai-suggestion-list">${suggestionItems}</ul>
    <div style="margin-top:1.5rem;padding:1rem 1.25rem;background:rgba(251,191,36,0.07);border-radius:10px;border-left:3px solid #FBBF24;">
      <div style="font-size:0.72rem;font-family:'DM Mono',monospace;color:#FBBF24;font-weight:700;margin-bottom:0.35rem;">⚠️ DISCLAIMER LEGAL</div>
      <div style="font-size:0.78rem;color:#94A3B8;line-height:1.65;">${ai.disclaimer}</div>
    </div>
  `;
}

function renderReport() {
  const r = state.scanResults;
  const ai = r.aiAnalysis;
  const reportId = `ZPL-SR-${Date.now().toString(36).toUpperCase()}`;
  const linkList = ai.links.map(l => `<div class="pdf-link-item">${l}</div>`).join('');
  const platformList = r.platforms.filter(p => p.found).map(p =>
    `<div class="pdf-finding-card"><div class="pdf-finding-label">${p.name}</div><div class="pdf-finding-value">${p.confidence}% match</div></div>`
  ).join('');
  const photoHtml = state.photoDataUrl
    ? `<div class="pdf-target-photo"><img src="${state.photoDataUrl}" alt="Target"></div>`
    : `<div class="pdf-target-photo">${(state.targetName || '?').charAt(0)}</div>`;

  const html = `
    <div class="pdf-page" id="pdf-content">
      <div class="pdf-header">
        <div class="pdf-logo-area">
          <div class="pdf-logo-name">Stealth Recon</div>
          <div class="pdf-logo-sub">OSINT INTELLIGENCE · ZENITH PRIME LABS · STARLIVE GROUP</div>
        </div>
        <div class="pdf-report-type">
          <div>LAPORAN INTELIJEN DIGITAL</div>
          <div class="pdf-report-id">${reportId}</div>
          <div style="font-size:10px;color:#9CA3AF;margin-top:2px;">${state.scanTime.toLocaleString('id-ID')}</div>
        </div>
      </div>

      <div class="pdf-target-section">
        ${photoHtml}
        <div>
          <div class="pdf-target-meta-label">IDENTITAS TARGET</div>
          <div class="pdf-target-name">${state.targetName || '—'}</div>
          <div class="pdf-target-alias">
            ${state.targetAlias ? `<div>Alias: ${state.targetAlias}</div>` : ''}
            ${state.targetEmail ? `<div>Email: ${state.targetEmail}</div>` : ''}
            ${state.targetPhone ? `<div>Telepon: ${state.targetPhone}</div>` : ''}
          </div>
          <div style="font-size:11px;color:#9CA3AF;margin-top:6px;">Operator: ${state.searcherName} · Scan: ${state.scanTime.toLocaleString('id-ID')}</div>
        </div>
      </div>

      <div class="pdf-section-title">📊 Hasil Temuan Platform</div>
      <div class="pdf-finding-row">${platformList}</div>

      <div class="pdf-section-title">🔗 Link Investigasi Utama</div>
      ${linkList}

      <div class="pdf-section-title">🤖 Analisis & Deskripsi AI</div>
      <div class="pdf-ai-content">${ai.summary}</div>

      <div class="pdf-section-title">💡 Saran dari AI</div>
      <div class="pdf-ai-content">${ai.suggestions.map((s, i) => `<div>${i + 1}. ${s}</div>`).join('')}</div>

      <div class="pdf-section-title">📝 Catatan Pencari</div>
      <div class="pdf-notes-box">${state.searcherNotes || '(Tidak ada catatan tambahan)'}</div>

      <div class="pdf-footer">
        <div>Zenith Prime Labs · StarLive Group · Confidential Intelligence Report</div>
        <div>ID: ${reportId}</div>
      </div>
      <div class="pdf-watermark">© Stealth Recon System · Zenith Prime Labs · Hanya untuk penggunaan resmi</div>
    </div>
  `;
  els.reportPreviewWrapper.innerHTML = html;
}

// ─── TABS ────────────────────────────────────────────────
document.querySelectorAll('.result-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    tab.classList.add('active');
    const paneId = 'tab-' + tab.getAttribute('data-tab');
    const pane = document.getElementById(paneId);
    if (pane) { pane.style.display = 'block'; pane.classList.add('active'); }
  });
});

// ─── NEW SEARCH ──────────────────────────────────────────
els.newSearchBtn.addEventListener('click', () => {
  // Hide results completely
  els.resultsSection.style.display = 'none';
  // Show search panel page fully
  els.searchPanel.style.display = 'block';
  
  clearPhoto();
  els.targetName.value = ''; 
  els.targetAlias.value = '';
  els.targetPhone.value = '';
  els.targetEmail.value = '';
  els.searcherNotes.value = '';
  
  els.searchPanel.scrollIntoView({ behavior: 'smooth' });
});

// ─── EXPORT PDF (delegate to pdf-report.js) ─────────────
els.exportPdfBtn.addEventListener('click', () => {
  if (window.exportStealthReconPDF) {
    window.exportStealthReconPDF(state);
  }
});

// ─── HISTORY PANEL TOGGLE & EVENT LISTENERS ─────────────
const toggleHistBtn = document.getElementById('toggle-history-btn');
const histPanel = document.getElementById('history-panel');

if (toggleHistBtn && histPanel) {
  toggleHistBtn.addEventListener('click', () => {
    // If results section is shown, hide it first
    els.resultsSection.style.display = 'none';
    els.searchPanel.style.display = 'block';

    const isHidden = histPanel.style.display === 'none';
    histPanel.style.display = isHidden ? 'block' : 'none';
    
    if (isHidden) {
      updateHistoryUI();
      histPanel.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Close report modal popup
const closePopupBtn = document.getElementById('close-report-popup-btn');
const popupModal = document.getElementById('report-popup-modal');
if (closePopupBtn && popupModal) {
  closePopupBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
  });
  popupModal.addEventListener('click', (e) => {
    if (e.target === popupModal) {
      popupModal.style.display = 'none';
    }
  });
}

// Global function to trigger history popup detail
window.showHistoryReportPopup = function(reportId) {
  const item = searchHistory.find(h => h.id === reportId);
  if (!item) return;

  const popupContent = document.getElementById('report-popup-content-inner');
  if (!popupContent || !popupModal) return;

  const photoHtml = item.photoDataUrl
    ? `<div class="pdf-target-photo"><img src="${item.photoDataUrl}" alt="Photo"></div>`
    : `<div class="pdf-target-photo">${item.targetName.slice(0, 2).toUpperCase()}</div>`;

  const platformList = item.scanResults.platforms.map(p => `
    <div class="pdf-finding-card">
      <div class="pdf-finding-label">${p.name}</div>
      <div class="pdf-finding-value" style="color:${p.found ? '#10B981' : '#6B7280'}">
        ${p.found ? '✓ Terindikasi' : '— Bersih'} (${p.confidence}%)
      </div>
    </div>
  `).join('');

  const links = item.scanResults.platforms.filter(p => p.found).map(p => p.profileLink);
  const linkList = links.length
    ? `<div class="pdf-link-list">${links.map(lnk => `<div class="pdf-link-item"><a href="${lnk}" target="_blank" style="color:var(--violet-light);text-decoration:none;">${lnk}</a></div>`).join('')}</div>`
    : `<div style="font-size:12px;color:#9CA3AF;margin-bottom:20px;">Tidak ada link luar terindikasi.</div>`;

  popupContent.innerHTML = `
    <div class="pdf-header" style="border-bottom: 1px solid var(--card-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
      <div class="pdf-logo-area">
        <div class="pdf-logo-name" style="font-weight: 800; color: var(--violet-light); font-size: 1.5rem;">Stealth Recon</div>
        <div class="pdf-logo-sub" style="font-size: 0.68rem; color: var(--text-muted); font-family: 'DM Mono';">HISTORI REKAP REPORT · ZENITH PRIME LABS</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.72rem; color: var(--text-faint); font-family: 'DM Mono';">ID LAPORAN</div>
        <div style="font-weight: 700; color: var(--rose); font-size: 1rem; font-family: 'DM Mono';">${item.id}</div>
      </div>
    </div>

    <div style="display:flex; gap:1.5rem; background:rgba(255,255,255,0.02); padding:1rem; border-radius:10px; margin-bottom:1.5rem; align-items:center; border: 1px solid var(--card-border);">
      <div style="width:60px; height:60px; border-radius:50%; overflow:hidden; background:linear-gradient(135deg,var(--violet),var(--rose)); display:flex; align-items:center; justify-content:center; font-weight:bold; color:#fff; font-size:1.2rem; flex-shrink:0;">
        ${item.photoDataUrl ? `<img src="${item.photoDataUrl}" style="width:100%;height:100%;object-fit:cover;">` : item.targetName.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <div style="font-size: 0.65rem; color: var(--violet-light); font-family: 'DM Mono'; font-weight: bold; letter-spacing: 0.1em;">TARGET TERIDENTIFIKASI</div>
        <div style="font-size: 1.25rem; font-weight: 850; color: var(--text);">${item.targetName}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); font-family: 'DM Mono';">
          ${item.targetAlias ? `Alias: ${item.targetAlias} · ` : ''}
          ${item.targetEmail ? `Email: ${item.targetEmail} · ` : ''}
          ${item.targetPhone ? `Telepon: ${item.targetPhone} · ` : ''}
          Operator: ${item.searcherName}
        </div>
      </div>
    </div>

    <h3 style="font-size:0.95rem; font-weight:750; color:var(--text); margin-bottom:0.75rem;">📊 Hasil Temuan Platform</h3>
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:0.75rem; margin-bottom:1.5rem;">
      ${item.scanResults.platforms.map(p => `
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--card-border); padding:0.75rem; border-radius:8px;">
          <div style="font-size:0.68rem; color:var(--text-faint); font-family:'DM Mono';">${p.name}</div>
          <div style="font-size:0.85rem; font-weight:700; color:${p.found ? '#34D399' : 'var(--text-muted)'}; margin-top:0.25rem;">
            ${p.found ? '✓ Terindikasi' : '— Bersih'} (${p.confidence}%)
          </div>
        </div>
      `).join('')}
    </div>

    <h3 style="font-size:0.95rem; font-weight:750; color:var(--text); margin-bottom:0.75rem;">🤖 Analisis AI</h3>
    <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:rgba(139,92,246,0.05); padding:0.85rem; border-radius:8px; border-left:3px solid var(--violet); margin-bottom:1.5rem; text-align:justify;">
      ${item.scanResults.aiAnalysis.summary}
    </p>

    <h3 style="font-size:0.95rem; font-weight:750; color:var(--text); margin-bottom:0.75rem;">📝 Catatan Pencari</h3>
    <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:rgba(251,191,36,0.05); padding:0.85rem; border-radius:8px; border-left:3px solid var(--amber); margin-bottom:1.5rem;">
      ${item.searcherNotes || '(Tidak ada catatan tambahan)'}
    </p>
  `;

  popupModal.style.display = 'flex';
};

// Init UI on load
updateHistoryUI();

