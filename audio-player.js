// audio-player.js
// Custom Background Music Controller & Web Audio Ambient Synthesizer for NCN Group

class CyberAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.volume = 0.5;
    this.audioContext = null;
    this.synthInterval = null;
    this.activeNodes = [];
    
    // Ambient sound track links (optional fallback tracks)
    this.tracks = [
      { name: "Deep Space Procedural", type: "synth" },
      { name: "Orbital Nexus Ambient", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, // dummy track
      { name: "Cyberpunk Command Center", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
    ];
    this.currentTrackIndex = 0;
    this.audioElement = new Audio();
    this.audioElement.crossOrigin = "anonymous";
    this.audioElement.loop = true;
    
    this.initDOM();
    this.setupEventListeners();
  }

  initDOM() {
    // We will append a persistent floating controller in the bottom-right corner if not already defined in HTML
    this.playerContainer = document.getElementById('cyber-audio-hub');
    if (!this.playerContainer) return;

    this.playerContainer.innerHTML = `
      <div class="audio-hud glass-panel">
        <div class="audio-info">
          <span class="hud-label text-xs">AUDIO STREAM:</span>
          <span id="audio-track-name" class="hud-value text-xs font-mono glow-text">Procedural Space Synth</span>
        </div>
        <div class="audio-controls">
          <button id="audio-prev-btn" class="ctrl-btn" title="Previous Track"><i class="lucide-skip-back"></i></button>
          <button id="audio-play-btn" class="ctrl-btn play-pause-btn" title="Play/Pause"><i class="lucide-play"></i></button>
          <button id="audio-next-btn" class="ctrl-btn" title="Next Track"><i class="lucide-skip-forward"></i></button>
          
          <div class="volume-slider-container">
            <i class="lucide-volume-2 text-xs"></i>
            <input type="range" id="audio-volume" min="0" max="1" step="0.05" value="0.5" class="volume-slider">
          </div>

          <div class="eq-visualizer" id="eq-visualizer">
            <span class="eq-bar bar1"></span>
            <span class="eq-bar bar2"></span>
            <span class="eq-bar bar3"></span>
            <span class="eq-bar bar4"></span>
          </div>
        </div>
      </div>
    `;

    this.playBtn = document.getElementById('audio-play-btn');
    this.prevBtn = document.getElementById('audio-prev-btn');
    this.nextBtn = document.getElementById('audio-next-btn');
    this.volSlider = document.getElementById('audio-volume');
    this.trackName = document.getElementById('audio-track-name');
    this.eqVisualizer = document.getElementById('eq-visualizer');
    
    if (window.initIcons) window.initIcons();
  }

  setupEventListeners() {
    if (!this.playBtn) return;

    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.changeTrack(-1));
    this.nextBtn.addEventListener('click', () => this.changeTrack(1));
    
    this.volSlider.addEventListener('input', (e) => {
      this.volume = parseFloat(e.target.value);
      this.audioElement.volume = this.volume;
      this.updateSynthVolume();
    });

    // Handle standard audio file events
    this.audioElement.addEventListener('play', () => {
      this.eqVisualizer.classList.add('active');
    });
    this.audioElement.addEventListener('pause', () => {
      this.eqVisualizer.classList.remove('active');
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    this.playBtn.innerHTML = `<i class="lucide-pause"></i>`;
    if (window.initIcons) window.initIcons();
    this.eqVisualizer.classList.add('active');

    const currentTrack = this.tracks[this.currentTrackIndex];
    if (currentTrack.type === 'synth') {
      this.startSynth();
    } else {
      this.stopSynth();
      this.audioElement.src = currentTrack.url;
      this.audioElement.volume = this.volume;
      this.audioElement.play().catch(err => {
        console.warn("Audio file play failed. Falling back to Procedural Synth.", err);
        this.currentTrackIndex = 0;
        this.play();
      });
    }
  }

  pause() {
    this.isPlaying = false;
    this.playBtn.innerHTML = `<i class="lucide-play"></i>`;
    if (window.initIcons) window.initIcons();
    this.eqVisualizer.classList.remove('active');
    this.stopSynth();
    this.audioElement.pause();
  }

  changeTrack(dir) {
    this.currentTrackIndex = (this.currentTrackIndex + dir + this.tracks.length) % this.tracks.length;
    const currentTrack = this.tracks[this.currentTrackIndex];
    this.trackName.innerText = currentTrack.name;
    
    if (this.isPlaying) {
      this.play();
    }
  }

  // Web Audio Procedural Synth Engine
  startSynth() {
    this.stopSynth();
    
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Main gain control
    this.synthGain = this.audioContext.createGain();
    this.synthGain.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime); // keep ambient soft
    this.synthGain.connect(this.audioContext.destination);

    // Create a beautiful cyber pad sound (layered oscillators + filter sweep)
    const playNotes = () => {
      if (!this.isPlaying || this.tracks[this.currentTrackIndex].type !== 'synth') return;
      
      const chord = [110, 165, 220, 330]; // A minor/fifth pad
      
      chord.forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const oscGain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        // Detune slightly for lush chorus effect
        osc.detune.setValueAtTime((Math.random() - 0.5) * 15, this.audioContext.currentTime);

        filter.type = 'lowpass';
        // slow sweep
        const baseFreq = 200 + Math.random() * 300;
        filter.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(baseFreq + 400, this.audioContext.currentTime + 6);
        filter.Q.setValueAtTime(3, this.audioContext.currentTime);

        oscGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 3);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 7.8);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.synthGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 8);
        
        this.activeNodes.push(osc);
      });
    };

    // Trigger initial pad
    playNotes();
    
    // Set looping interval (every 8 seconds trigger next chord transition)
    this.synthInterval = setInterval(playNotes, 8000);
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    
    // Stop and clear all active nodes
    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {}
    });
    this.activeNodes = [];
    
    if (this.synthGain) {
      this.synthGain.disconnect();
      this.synthGain = null;
    }
  }

  updateSynthVolume() {
    if (this.synthGain && this.audioContext) {
      this.synthGain.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime);
    }
  }
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
  window.cyberAudio = new CyberAudioPlayer();
});
