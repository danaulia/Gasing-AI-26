// security-dashboard.js — Zenith Prime Labs
// Security Dashboard with Sub Tabs: Threats, OpenCTI, User Accounts, Chat Monitor

class CyberSecurityDashboard {
  constructor() {
    this.threatChart = null;
    this.vectorChart = null;
    this.threatCount = 14382;
    this.mitigationRate = 99.98;
    this.activeIncidents = 0;
    this.isAdminMode = false;

    this.ipPool = ['185.220.101.5','104.244.76.12','45.143.201.88','193.37.252.12','82.102.23.4','109.201.154.34','77.247.110.162','91.219.212.11'];
    this.countries = ['RU','CN','US','NL','KP','UA','BR','DE'];
    this.targets = ['ZPL Core Gateway','Auth System','Research Database','AI Pipeline','API Gateway'];
    this.vectors = [
      { name: 'DDoS Layer 7 Flood', severity: 'HIGH' },
      { name: 'SQL Injection Probe', severity: 'MED' },
      { name: 'Phishing Payload Delivery', severity: 'MED' },
      { name: 'Zero-Day Exploit Attempt', severity: 'CRITICAL' },
      { name: 'SSH Brute-Force Scan', severity: 'LOW' },
      { name: 'Ransomware Script Injection', severity: 'CRITICAL' },
    ];
    this.statuses = ['BLOCKED','QUARANTINED','MITIGATED'];

    // CTI global threat feed data
    this.ctiItems = [
      { title: 'APT41 Campaign — Targeting AI Research Firms', severity: 'CRITICAL', time: '2 jam lalu', source: 'MITRE ATT&CK', region: 'Asia-Pacific' },
      { title: 'New Ransomware Variant LockBit 4.0 Detected', severity: 'HIGH', time: '5 jam lalu', source: 'CISA Advisory', region: 'Global' },
      { title: 'Mass SQL Injection Campaign Against SaaS Platforms', severity: 'MED', time: '8 jam lalu', source: 'AlienVault OTX', region: 'ASEAN' },
      { title: 'Credential Stuffing Wave — 1.2M Accounts Exposed', severity: 'HIGH', time: '12 jam lalu', source: 'HaveIBeenPwned', region: 'Global' },
      { title: 'Zero-Day in OpenSSL 3.2 Under Active Exploitation', severity: 'CRITICAL', time: '1 hari lalu', source: 'NVD-CVE', region: 'Global' },
      { title: 'DDoS Campaign Targeting Government Portals', severity: 'MED', time: '1 hari lalu', source: 'CloudFlare Radar', region: 'Southeast Asia' },
      { title: 'Phishing Kit Using AI-Generated Lures Detected', severity: 'MED', time: '2 hari lalu', source: 'PhishTank', region: 'Indonesia' },
      { title: 'Supply Chain Attack via Compromised NPM Package', severity: 'HIGH', time: '3 hari lalu', source: 'Snyk Security', region: 'Global' },
    ];

    this.initDOM();
    this.initCharts();
    this.startThreatSimulation();
    this.setupThemeWatcher();
    this.updateLastRecapTime();
    this.fetchRealCTI();
  }

  async fetchRealCTI() {
    try {
      // Menggunakan feed publik CVE CIRCL yang CORS-friendly untuk data CVE nyata
      const res = await fetch('https://cve.circl.lu/api/last');
      if (!res.ok) throw new Error('Network response not ok');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        this.ctiItems = data.slice(0, 10).map(item => {
          const cvss = item.cvss || 5.0;
          const severity = cvss >= 9.0 ? 'CRITICAL' : cvss >= 7.0 ? 'HIGH' : cvss >= 4.0 ? 'MED' : 'LOW';
          return {
            title: `${item.id} — ${item.summary.slice(0, 80)}...`,
            severity: severity,
            time: new Date(item.Modified || item.Published).toLocaleDateString('id-ID'),
            source: 'CIRCL CVE Feed',
            region: 'Global'
          };
        });
        this.renderCTIFeed();
      }
    } catch (e) {
      console.warn('Gagal memuat feed OpenCTI real-time, menggunakan data luring:', e);
      // Fallback ctiItems sudah ada
    }
  }

  setAdminMode(enabled) {
    this.isAdminMode = enabled;
  }

  initDOM() {
    this.incidentFeed = document.getElementById('security-incident-feed');
    this.activeIncidentsTicker = document.getElementById('active-incidents-count');
    this.totalThreatsTicker = document.getElementById('total-threats-count');
    this.mitigationRateTicker = document.getElementById('mitigation-rate-percent');
    if (this.totalThreatsTicker) this.totalThreatsTicker.innerText = this.threatCount.toLocaleString();
    if (this.mitigationRateTicker) this.mitigationRateTicker.innerText = this.mitigationRate.toFixed(2) + '%';
    if (this.activeIncidentsTicker) this.activeIncidentsTicker.innerText = this.activeIncidents;
  }

  updateLastRecapTime() {
    const el = document.getElementById('last-recap-time');
    if (!el) return;
    const now = new Date();
    const recap = new Date(now);
    recap.setHours(9, 0, 0, 0);
    if (now.getHours() < 9) recap.setDate(recap.getDate() - 1);
    el.textContent = `09:00 ${recap.toLocaleDateString('id-ID', { weekday:'short', day:'numeric', month:'short' })}`;
  }

  getChartColors() {
    const isDark = document.body.classList.contains('dark-theme');
    return {
      text:    isDark ? '#C4B5FD' : '#78716C',
      grid:    isDark ? 'rgba(196,181,253,0.06)' : 'rgba(180,100,120,0.06)',
      primary: isDark ? '#F9A8D4' : '#FB7185',
      secondary: isDark ? '#C4B5FD' : '#A78BFA',
      bgLine:  isDark ? 'rgba(249,168,212,0.12)' : 'rgba(251,113,133,0.10)',
      doughnutColors: isDark
        ? ['#F9A8D4','#C4B5FD','#7DD3FC','#FDE68A','#6EE7B7']
        : ['#FB7185','#A78BFA','#38BDF8','#FBBF24','#34D399']
    };
  }

  initCharts() {
    const ctxThreat = document.getElementById('threat-frequency-chart');
    const ctxVector = document.getElementById('threat-vector-chart');
    if (!ctxThreat || !ctxVector) return;
    const colors = this.getChartColors();

    this.threatChart = new Chart(ctxThreat.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'],
        datasets: [{ label: 'Frekuensi Ancaman Harian', data: [280,420,310,580,490,210,340], borderColor: colors.primary, backgroundColor: colors.bgLine, borderWidth: 2, fill: true, tension: 0.4, pointBackgroundColor: colors.primary, pointBorderColor: '#ffffff', pointRadius: 4, pointHoverRadius: 6 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)' } }, scales: { x: { grid: { color: colors.grid }, ticks: { color: colors.text, font: { size: 10 } } }, y: { grid: { color: colors.grid }, ticks: { color: colors.text, font: { size: 10 } } } } }
    });

    this.vectorChart = new Chart(ctxVector.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['DDoS Flood','SQLi / Injection','Malware Delivery','Brute Force','API Scan'],
        datasets: [{ data: [40,25,15,12,8], backgroundColor: colors.doughnutColors, borderWidth: 1, borderColor: 'transparent' }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: colors.text, font: { size: 10 } } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)' } } }
    });
  }

  startThreatSimulation() {
    for (let i = 0; i < 6; i++) this.generateNewThreat(true);
    const tick = () => {
      const delay = 3000 + Math.random() * 4000;
      setTimeout(() => { this.generateNewThreat(false); tick(); }, delay);
    };
    tick();

    // Simulate CTI live refresh
    setInterval(() => {
      const idx = Math.floor(Math.random() * this.ctiItems.length);
      const minutes = Math.floor(Math.random() * 30) + 1;
      this.ctiItems[idx].time = `${minutes} menit lalu`;
      this.renderCTIFeed();
    }, 30000);

    // Simulate chat monitor messages
    setInterval(() => {
      this.renderChatMonitor();
    }, 15000);
  }

  generateNewThreat(isInitial = false) {
    const ip = this.ipPool[Math.floor(Math.random() * this.ipPool.length)];
    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const target = this.targets[Math.floor(Math.random() * this.targets.length)];
    const vectorObj = this.vectors[Math.floor(Math.random() * this.vectors.length)];
    const status = this.statuses[Math.floor(Math.random() * this.statuses.length)];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    if (!isInitial) {
      this.threatCount += Math.floor(Math.random() * 3) + 1;
      this.activeIncidents = Math.floor(Math.random() * 4);
      if (this.totalThreatsTicker) this.totalThreatsTicker.innerText = this.threatCount.toLocaleString();
      if (this.activeIncidentsTicker) this.activeIncidentsTicker.innerText = this.activeIncidents;
      if (window.cyberAuth) window.cyberAuth.playBeep(880, 'sine', 0.03);
    }

    if (this.incidentFeed) {
      const row = document.createElement('tr');
      row.className = `incident-row severity-${vectorObj.severity.toLowerCase()}`;
      row.innerHTML = `
        <td class="font-mono text-xs text-nowrap">${timeStr}</td>
        <td class="font-mono text-xs text-nowrap">
          <span class="country-badge text-xxs font-bold">${country}</span> ${ip}
        </td>
        <td class="text-xs text-nowrap">${target}</td>
        <td class="font-bold text-xs text-nowrap" style="color:var(--season-accent);">${vectorObj.name}</td>
        <td class="text-nowrap"><span class="severity-tag ${vectorObj.severity.toLowerCase()} text-xxs">${vectorObj.severity}</span></td>
        <td class="text-nowrap"><span class="status-tag ${status.toLowerCase()} text-xxs">
          <i data-lucide="shield" style="width:10px;height:10px;"></i> ${status}
        </span></td>
      `;
      if (isInitial) {
        this.incidentFeed.appendChild(row);
      } else {
        this.incidentFeed.insertBefore(row, this.incidentFeed.firstChild);
        if (this.incidentFeed.children.length > 8) this.incidentFeed.removeChild(this.incidentFeed.lastChild);
      }
    }
  }

  renderCTIFeed() {
    const container = document.getElementById('cti-global-feed');
    if (!container) return;
    container.innerHTML = '';
    const severityColors = { CRITICAL: 'var(--rose-400)', HIGH: 'var(--amber-400)', MED: 'var(--sky-400)', LOW: 'var(--mint-400)' };
    this.ctiItems.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cti-item';
      el.style.borderLeftColor = severityColors[item.severity] || 'var(--season-accent)';
      el.innerHTML = `
        <div class="cti-item-title">${item.title}</div>
        <div class="cti-item-meta">
          <span style="color:${severityColors[item.severity] || 'var(--text-faint)'};">[${item.severity}]</span>
          · ${item.source} · ${item.region} · ${item.time}
        </div>
      `;
      container.appendChild(el);
    });
  }

  renderUserTable() {
    const tbody = document.getElementById('user-accounts-table');
    const chip = document.getElementById('user-count-chip');
    if (!tbody) return;
    const users = JSON.parse(localStorage.getItem('zpl_users') || '[]');
    if (chip) chip.textContent = `${users.length} akun`;
    tbody.innerHTML = '';
    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-faint);padding:1.5rem;">Belum ada user terdaftar</td></tr>`;
      return;
    }
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="text-xs font-bold">${user.name}</td>
        <td class="font-mono text-xs">${user.email}</td>
        <td class="text-xs">${user.fraction}</td>
        <td class="font-mono text-xs">${new Date(user.registered).toLocaleDateString('id-ID')}</td>
        <td><span class="severity-tag ${user.isAdmin ? 'critical' : 'low'} text-xxs">${user.isAdmin ? 'ADMIN' : 'USER'}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderChatMonitor() {
    const container = document.getElementById('chat-monitor-feed');
    if (!container) return;
    const msgs = window.zenithChat?.globalMessages || [];
    container.innerHTML = '';
    if (msgs.length === 0) {
      container.innerHTML = `<div style="text-align:center;color:var(--text-faint);padding:2rem;font-size:0.85rem;">Belum ada pesan global</div>`;
      return;
    }
    msgs.slice().reverse().forEach(msg => {
      if (msg.isSystem) return;
      const el = document.createElement('div');
      el.className = 'monitor-msg';
      el.innerHTML = `
        <span class="monitor-sender">[${msg.fraction || 'Unknown'}] ${msg.sender}</span>
        <span style="color:var(--text-faint);font-family:'DM Mono',monospace;font-size:0.7rem;"> · ${msg.time}</span><br>
        ${msg.text}
      `;
      container.appendChild(el);
    });
  }

  setupThemeWatcher() {
    const observer = new MutationObserver(() => this.updateChartsTheme());
    observer.observe(document.body, { attributes: true });
  }

  updateChartsTheme() {
    if (!this.threatChart || !this.vectorChart) return;
    const colors = this.getChartColors();
    this.threatChart.data.datasets[0].borderColor = colors.primary;
    this.threatChart.data.datasets[0].backgroundColor = colors.bgLine;
    this.threatChart.data.datasets[0].pointBackgroundColor = colors.primary;
    this.threatChart.options.scales.x.grid.color = colors.grid;
    this.threatChart.options.scales.x.ticks.color = colors.text;
    this.threatChart.options.scales.y.grid.color = colors.grid;
    this.threatChart.options.scales.y.ticks.color = colors.text;
    this.threatChart.update();
    this.vectorChart.data.datasets[0].backgroundColor = colors.doughnutColors;
    this.vectorChart.options.plugins.legend.labels.color = colors.text;
    this.vectorChart.update();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberDashboard = new CyberSecurityDashboard();
});
