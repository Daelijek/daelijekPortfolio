'use client';

// Web Audio API procedural sound synthesizer (Zero external audio files needed)
// Dual-Engine: Ambient Lo-Fi (Warm, soft, organic) vs Digital Minimalism (Retro FM Synthwave)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.profile = 'default'; // 'default' (Ambient Lo-Fi) | 'minimal' (Synthwave Retro)
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val) {
    this.enabled = val;
  }

  setProfile(val) {
    this.profile = val || 'default';
  }

  // Hover sound - distinctly different per profile
  playHover() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (this.profile === 'minimal') {
        // --- DIGITAL MINIMALISM / SYNTHWAVE RETRO ---
        // Crisp high-tech FM laser blip: fast pitch dive with high harmonic bite
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.035);

        // Filter to give that authentic 80s HUD bite
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, now);
        filter.Q.setValueAtTime(3.5, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.035);
      } else {
        // --- DEFAULT: AMBIENT / LO-FI ---
        // Velvety soft organic tap: warm sine wave with low-pass dampening
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.045);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.045);
      }
    } catch {
      // Audio context policy safe ignore
    }
  }

  // Click confirmation sound - distinctly different per profile
  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (this.profile === 'minimal') {
        // --- DIGITAL MINIMALISM / SYNTHWAVE RETRO ---
        // Snappy electro-mech HUD pulse: square wave transient with pitch drop + sub tap
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'square';
        osc1.frequency.setValueAtTime(1800, now);
        osc1.frequency.exponentialRampToValueAtTime(320, now + 0.05);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(900, now);
        osc2.frequency.exponentialRampToValueAtTime(160, now + 0.06);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.06);
        osc2.stop(now + 0.06);
      } else {
        // --- DEFAULT: AMBIENT / LO-FI ---
        // Deep warm tactile click: haptic sine drop with acoustic body
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      }
    } catch {}
  }

  // Switch sound (Theme change, tabs, options)
  playSwitch() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (this.profile === 'minimal') {
        // --- DIGITAL MINIMALISM / SYNTHWAVE RETRO ---
        // Fast 3-tone arcade cyber frequency hop
        [780, 1170, 1560].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + idx * 0.025;

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.025, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.035);
        });
      } else {
        // --- DEFAULT: AMBIENT / LO-FI ---
        // Soft dual-chord chime: mellow pentatonic fifths
        [392, 587].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + idx * 0.035;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.05, t + 0.12);

          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.12);
        });
      }
    } catch {}
  }

  // Instant signature audio profile preview when selecting in Settings
  playProfileDemo(targetProfile) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const prof = targetProfile || this.profile;

      if (prof === 'minimal') {
        // Retro Synthwave flourish: classic 80s dual-saw arpeggio sweep
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        freqs.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + i * 0.045;

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, t);

          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.09);
        });
      } else {
        // Ambient Lo-Fi flourish: gentle warm sub-bell resonance
        const freqs = [261.63, 392.0, 523.25]; // C4, G4, C5
        freqs.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + i * 0.055;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t);

          gain.gain.setValueAtTime(0.045, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.2);
        });
      }
    } catch {}
  }

  // Boot sequence initialization chime
  playBootChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (this.profile === 'minimal') {
        // Retro 80s synth startup chord
        const notes = [440, 554.37, 659.25, 880]; // A major
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + i * 0.05;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, t);
          osc.frequency.exponentialRampToValueAtTime(f * 1.5, t + 0.25);

          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.35);
        });
      } else {
        // Ambient Lo-Fi pad chime
        const freqs = [330, 495, 660, 990];
        freqs.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = now + i * 0.07;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t);

          gain.gain.setValueAtTime(0.035, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t);
          osc.stop(t + 0.3);
        });
      }
    } catch {}
  }
}

export const soundFx = new SoundEngine();
