// gallery-ai.js
// AI Identity & Object Detection Scan Engine for NCN Group Gallery

class CyberGalleryAIScanner {
  constructor() {
    this.scanDatabase = {
      'gallery-item-1': {
        title: "Cyber Security Command Center",
        detections: [
          { top: 22, left: 10, width: 38, height: 42, label: "Quantum Screen Mesh", details: "ID: HUD-ALPHA-01 | FEED: LIVE-WAN | HAZARD: 0%" },
          { top: 52, left: 55, width: 14, height: 18, label: "Operator Beta", details: "ID: SEC-AGENT-102 | STAT: ANALYZING | RISK: LOW" },
          { top: 48, left: 72, width: 15, height: 20, label: "CISO Budi Hartono", details: "ID: PROF-BUDI-H | STAT: MONITORING | ACC: 99.41%" },
          { top: 12, left: 50, width: 44, height: 32, label: "Aether Orbitals Telemetry", details: "FEED: SAT-TRACK | TARGET: APOGEE-6 | ACC: 98.92%" }
        ],
        logs: [
          "SECURE_LINK: Connecting to Nusantara Cloud AI...",
          "LOAD_MODEL: Object detection neural net v5.2 initialized.",
          "CLASSIFYING: Drawing bounding nodes...",
          "TARGET_LOCATED: Professional identity match for Prof. Budi Hartono (CISO).",
          "TARGET_LOCATED: Live telemetry screen streams authenticated.",
          "INTEGRITY: Command center structural status optimal."
        ]
      },
      'gallery-item-2': {
        title: "Quantum Telemetry & Corporate Lab",
        detections: [
          { top: 15, left: 45, width: 18, height: 35, label: "CEO Evelyn Mercer", details: "ID: EVELYN-MERCER | STAT: SESSION_LEAD | ACC: 99.82%" },
          { top: 18, left: 22, width: 16, height: 36, label: "CISO Budi Hartono", details: "ID: PROF-BUDI-H | STAT: SYSTEM_AUDIT | ACC: 99.15%" },
          { top: 25, left: 70, width: 22, height: 60, label: "Quantum Core-X", details: "ID: QUANTUM-CORE-04 | HE_LEVEL: 98% | SYNC: ACTIVE" }
        ],
        logs: [
          "SECURE_LINK: Scanning facial nodes in active space...",
          "MATCHING: Comparing database keys for executives...",
          "TARGET_LOCATED: CEO Evelyn Mercer identified [Confidence: 99.82%].",
          "TARGET_LOCATED: CISO Budi Hartono identified [Confidence: 99.15%].",
          "SYSTEM_DETECT: Q-Core model status matched - Model QNL-X.",
          "SCAN_COMPLETE: All assets accountably recognized."
        ]
      }
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    // We attach listeners to photo cards
    document.addEventListener('click', (e) => {
      const scanBtn = e.target.closest('.start-scan-btn');
      if (scanBtn) {
        const itemCard = scanBtn.closest('.gallery-card');
        if (itemCard) {
          const itemId = itemCard.id;
          this.startScan(itemId, itemCard);
        }
      }
      
      const resetBtn = e.target.closest('.reset-scan-btn');
      if (resetBtn) {
        const itemCard = resetBtn.closest('.gallery-card');
        if (itemCard) {
          this.resetScan(itemCard);
        }
      }
    });
  }

  startScan(itemId, cardElement) {
    const data = this.scanDatabase[itemId];
    if (!data) return;

    // Play a scanning click sound
    if (window.cyberAuth) {
      window.cyberAuth.playBeep(450, 'sawtooth', 0.1);
      setTimeout(() => window.cyberAuth.playBeep(900, 'sine', 0.2), 120);
    }

    const scannerOverlay = cardElement.querySelector('.scanner-overlay');
    const scanBtn = cardElement.querySelector('.start-scan-btn');
    const resetBtn = cardElement.querySelector('.reset-scan-btn');
    const displayImg = cardElement.querySelector('.gallery-img');
    const logConsole = cardElement.querySelector('.scan-console-output');
    
    if (!scannerOverlay) return;

    // Toggle button visibility
    if (scanBtn) scanBtn.classList.add('hidden');
    if (resetBtn) resetBtn.classList.remove('hidden');

    // Add scanning effect class to scan line
    const scanLine = scannerOverlay.querySelector('.scan-line');
    if (scanLine) scanLine.classList.add('scanning');

    // Render console log animations line by line
    if (logConsole) {
      logConsole.innerHTML = '';
      data.logs.forEach((log, index) => {
        setTimeout(() => {
          const logLine = document.createElement('div');
          logLine.className = 'log-line text-xxs font-mono color-primary margin-bottom-xs';
          logLine.innerHTML = `<span class="glow-text">></span> ${log}`;
          logConsole.appendChild(logLine);
          logConsole.scrollTop = logConsole.scrollHeight;
          
          if (window.cyberAuth) {
            window.cyberAuth.playBeep(1200 + (index * 100), 'sine', 0.02);
          }
        }, index * 400);
      });
    }

    // Draw scanning boxes after sweep
    setTimeout(() => {
      const boxContainer = scannerOverlay.querySelector('.bounding-boxes-container');
      if (boxContainer) {
        boxContainer.innerHTML = '';
        data.detections.forEach((det, index) => {
          setTimeout(() => {
            const box = document.createElement('div');
            box.className = 'ai-bounding-box';
            box.style.top = `${det.top}%`;
            box.style.left = `${det.left}%`;
            box.style.width = `${det.width}%`;
            box.style.height = `${det.height}%`;
            
            box.innerHTML = `
              <span class="box-corner tl"></span>
              <span class="box-corner tr"></span>
              <span class="box-corner bl"></span>
              <span class="box-corner br"></span>
              <div class="box-tag">
                <div class="box-label text-xxs font-mono font-bold">${det.label}</div>
                <div class="box-details text-xxs font-mono opacity-80">${det.details}</div>
              </div>
            `;
            boxContainer.appendChild(box);
            
            if (window.cyberAuth) {
              window.cyberAuth.playBeep(700, 'sine', 0.05);
            }
          }, index * 300);
        });
      }
    }, 1200);
  }

  resetScan(cardElement) {
    if (window.cyberAuth) {
      window.cyberAuth.playBeep(350, 'sine', 0.15);
    }
    
    const scannerOverlay = cardElement.querySelector('.scanner-overlay');
    const scanBtn = cardElement.querySelector('.start-scan-btn');
    const resetBtn = cardElement.querySelector('.reset-scan-btn');
    const logConsole = cardElement.querySelector('.scan-console-output');
    const boxContainer = cardElement.querySelector('.bounding-boxes-container');
    
    if (scannerOverlay) {
      const scanLine = scannerOverlay.querySelector('.scan-line');
      if (scanLine) scanLine.classList.remove('scanning');
    }
    
    if (boxContainer) boxContainer.innerHTML = '';
    if (logConsole) logConsole.innerHTML = '<span class="text-xxs font-mono opacity-50">SCANNER STANDBY. AWAITING INITIATION...</span>';
    
    if (scanBtn) scanBtn.classList.remove('hidden');
    if (resetBtn) resetBtn.classList.add('hidden');
  }
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
  window.cyberGallery = new CyberGalleryAIScanner();
});
