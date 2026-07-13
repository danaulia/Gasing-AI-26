// security-dashboard.js
// OpenCTI Real-Time Cyber Threat Dashboard Engine for NCN Group

class CyberSecurityDashboard {
  constructor() {
    this.threatChart = null;
    this.vectorChart = null;
    this.threatCount = 14382;
    this.mitigationRate = 99.98;
    this.activeIncidents = 0;
    
    this.ipPool = [
      "185.220.101.5", "104.244.76.12", "45.143.201.88", "193.37.252.12", 
      "82.102.23.4", "109.201.154.34", "77.247.110.162", "91.219.212.11"
    ];
    this.countries = ["RU", "CN", "US", "NL", "KP", "UA", "BR", "DE"];
    
    this.targets = [
      "NNC Core Gateway", "Nusa Cyber Security", "Aether Orbitals Telemetry", 
      "Quantum Nusantara Labs", "EcoTech Smart Grid"
    ];
    
    this.vectors = [
      { name: "DDoS Layer 7 Flood", severity: "HIGH" },
      { name: "SQL Injection Probe", severity: "MED" },
      { name: "Phishing Payload Delivery", severity: "MED" },
      { name: "Zero-Day Exploit Attempt", severity: "CRITICAL" },
      { name: "SSH Brute-Force Scan", severity: "LOW" },
      { name: "Ransomware Script Injection", severity: "CRITICAL" }
    ];

    this.statuses = ["BLOCKED", "QUARANTINED", "MITIGATED"];

    this.initDOM();
    this.initCharts();
    this.startThreatSimulation();
    this.setupThemeWatcher();
  }

  initDOM() {
    this.incidentFeed = document.getElementById('security-incident-feed');
    this.activeIncidentsTicker = document.getElementById('active-incidents-count');
    this.totalThreatsTicker = document.getElementById('total-threats-count');
    this.mitigationRateTicker = document.getElementById('mitigation-rate-percent');
    
    // Set initial ticker values
    if (this.totalThreatsTicker) this.totalThreatsTicker.innerText = this.threatCount.toLocaleString();
    if (this.mitigationRateTicker) this.mitigationRateTicker.innerText = this.mitigationRate.toFixed(2) + "%";
    if (this.activeIncidentsTicker) this.activeIncidentsTicker.innerText = this.activeIncidents;
  }

  getChartColors() {
    const isDark = document.body.classList.contains('dark-theme');
    return {
      text:    isDark ? '#C4B5FD' : '#78716C',
      grid:    isDark ? 'rgba(196,181,253,0.06)' : 'rgba(180,100,120,0.06)',
      primary: isDark ? '#F9A8D4' : '#FB7185',   // rose
      secondary: isDark ? '#C4B5FD' : '#A78BFA', // violet
      bgLine:  isDark ? 'rgba(249,168,212,0.12)' : 'rgba(251,113,133,0.10)',
      doughnutColors: isDark
        ? ['#F9A8D4', '#C4B5FD', '#7DD3FC', '#FDE68A', '#6EE7B7']
        : ['#FB7185', '#A78BFA', '#38BDF8', '#FBBF24', '#34D399']
    };
  }

  initCharts() {
    const ctxThreat = document.getElementById('threat-frequency-chart');
    const ctxVector = document.getElementById('threat-vector-chart');

    if (!ctxThreat || !ctxVector) return;

    const colors = this.getChartColors();

    // Chart 1: Threat Frequency Line Chart (Weekly Data)
    this.threatChart = new Chart(ctxThreat.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
        datasets: [{
          label: 'Frekuensi Serangan Harian',
          data: [280, 420, 310, 580, 490, 210, 340],
          borderColor: colors.primary,
          backgroundColor: colors.bgLine,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors.primary,
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleFont: { family: 'Space Grotesk' },
            bodyFont: { family: 'Inter' }
          }
        },
        scales: {
          x: {
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Space Grotesk', size: 10 } }
          },
          y: {
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Space Grotesk', size: 10 } }
          }
        }
      }
    });

    // Chart 2: Threat Vector Distribution Doughnut Chart
    this.vectorChart = new Chart(ctxVector.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['DDoS Flood', 'SQLi / Injection', 'Malware Delivery', 'Brute Force Scan', 'Credentials / API Scan'],
        datasets: [{
          data: [40, 25, 15, 12, 8],
          backgroundColor: colors.doughnutColors,
          borderWidth: 1,
          borderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: colors.text,
              font: { family: 'Inter', size: 10 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            bodyFont: { family: 'Inter' }
          }
        }
      }
    });
  }

  startThreatSimulation() {
    // Generate initial set of simulated security threats in feed
    for (let i = 0; i < 6; i++) {
      this.generateNewThreat(true);
    }

    // Trigger regular new incoming threats
    const simulateTick = () => {
      const delay = 3000 + Math.random() * 4000; // random intervals
      setTimeout(() => {
        this.generateNewThreat(false);
        simulateTick();
      }, delay);
    };
    
    simulateTick();
  }

  generateNewThreat(isInitial = false) {
    const ip = this.ipPool[Math.floor(Math.random() * this.ipPool.length)];
    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const target = this.targets[Math.floor(Math.random() * this.targets.length)];
    const vectorObj = this.vectors[Math.floor(Math.random() * this.vectors.length)];
    const status = this.statuses[Math.floor(Math.random() * this.statuses.length)];
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    // Update internal state
    if (!isInitial) {
      this.threatCount += Math.floor(Math.random() * 3) + 1;
      this.activeIncidents = Math.floor(Math.random() * 4);
      
      // Flash statistics values on ticker
      if (this.totalThreatsTicker) this.totalThreatsTicker.innerText = this.threatCount.toLocaleString();
      if (this.activeIncidentsTicker) this.activeIncidentsTicker.innerText = this.activeIncidents;

      // Play cyber security audio alert click
      if (window.cyberAuth) {
        window.cyberAuth.playBeep(880, 'sine', 0.03);
      }
    }

    // Create DOM element for incident feed
    if (this.incidentFeed) {
      const row = document.createElement('tr');
      row.className = `incident-row severity-${vectorObj.severity.toLowerCase()}`;
      row.innerHTML = `
        <td class="font-mono text-xs text-nowrap">${timeStr}</td>
        <td class="font-mono text-xs text-nowrap">
          <span class="country-badge text-xxs font-bold">${country}</span> ${ip}
        </td>
        <td class="text-xs text-nowrap">${target}</td>
        <td class="font-bold text-xs color-secondary text-nowrap">${vectorObj.name}</td>
        <td class="text-nowrap"><span class="severity-tag ${vectorObj.severity.toLowerCase()} text-xxs">${vectorObj.severity}</span></td>
        <td class="text-nowrap"><span class="status-tag ${status.toLowerCase()} text-xxs"><i class="lucide-shield"></i> ${status}</span></td>
      `;

      if (isInitial) {
        this.incidentFeed.appendChild(row);
      } else {
        this.incidentFeed.insertBefore(row, this.incidentFeed.firstChild);
        
        // Remove oldest if feed is too long
        if (this.incidentFeed.children.length > 8) {
          this.incidentFeed.removeChild(this.incidentFeed.lastChild);
        }
      }
    }
  }

  setupThemeWatcher() {
    // We observe theme clicks or body class switches
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.updateChartsTheme();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  }

  updateChartsTheme() {
    if (!this.threatChart || !this.vectorChart) return;
    
    const colors = this.getChartColors();
    
    // Update Line Chart
    this.threatChart.data.datasets[0].borderColor = colors.primary;
    this.threatChart.data.datasets[0].backgroundColor = colors.bgLine;
    this.threatChart.data.datasets[0].pointBackgroundColor = colors.primary;
    this.threatChart.options.scales.x.grid.color = colors.grid;
    this.threatChart.options.scales.x.ticks.color = colors.text;
    this.threatChart.options.scales.y.grid.color = colors.grid;
    this.threatChart.options.scales.y.ticks.color = colors.text;
    this.threatChart.update();

    // Update Doughnut Chart
    this.vectorChart.data.datasets[0].backgroundColor = colors.doughnutColors;
    this.vectorChart.options.plugins.legend.labels.color = colors.text;
    this.vectorChart.update();
  }
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
  window.cyberDashboard = new CyberSecurityDashboard();
});
