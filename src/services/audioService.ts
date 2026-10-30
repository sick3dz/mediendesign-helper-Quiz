// Web Audio API Synthesizer for instant, zero-latency ADHD feedback sounds

export type SoundpackType = 'sound-standard' | 'sound-arcade' | 'sound-scifi' | 'sound-acoustic';

class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private soundpack: SoundpackType = 'sound-standard';

  constructor() {
    // Loaded lazily on first user interaction to comply with browser audio autoplay policies
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setSoundpack(packId: string) {
    if (['sound-standard', 'sound-arcade', 'sound-scifi', 'sound-acoustic'].includes(packId)) {
      this.soundpack = packId as SoundpackType;
    } else {
      this.soundpack = 'sound-standard';
    }
  }

  public getSoundpack(): SoundpackType {
    return this.soundpack;
  }

  // Soft pleasant click / tap
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.soundpack === 'sound-arcade') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.setValueAtTime(940, now + 0.025);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      return;
    }

    if (this.soundpack === 'sound-scifi') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.03);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
      return;
    }

    if (this.soundpack === 'sound-acoustic') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
      return;
    }

    // Default / Standard
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Uplifting chime for correct answer
  public playCorrect(combo: number = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const baseFreq = 523.25; // C5
    const pitchOffset = Math.min(combo * 40, 240);

    if (this.soundpack === 'sound-arcade') {
      const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + (idx * 0.05);

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq + pitchOffset, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.12);
      });
      return;
    }

    if (this.soundpack === 'sound-scifi') {
      const freqs = [660 + pitchOffset, 990 + pitchOffset, 1320 + pitchOffset];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + (idx * 0.04);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, startTime + 0.2);

        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
      return;
    }

    if (this.soundpack === 'sound-acoustic') {
      const freqs = [baseFreq + pitchOffset, (baseFreq * 1.25) + pitchOffset, (baseFreq * 1.5) + pitchOffset];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + (idx * 0.07);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.14, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
      return;
    }

    // Default standard
    const notes = [baseFreq + pitchOffset, (baseFreq * 1.25) + pitchOffset, (baseFreq * 1.5) + pitchOffset];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + (idx * 0.06);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // Gentle low tone for incorrect answer
  public playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.soundpack === 'sound-arcade') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.setValueAtTime(160, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
      return;
    }

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Rewarding fanfare for completing a chapter or module
  public playLevelUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const isArcade = this.soundpack === 'sound-arcade';
    const arpeggio = isArcade ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25, 880];

    arpeggio.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + (idx * 0.08);

      osc.type = isArcade ? 'square' : this.soundpack === 'sound-scifi' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // Cute pet eating crunch sound
  public playEat() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.09, 0.18].forEach((offset, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + offset;

      osc.type = this.soundpack === 'sound-arcade' ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(320 + i * 40, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    });
  }

  // Cute pet stroke / purr sound
  public playPet() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.linearRampToValueAtTime(620, now + 0.12);
    osc.frequency.linearRampToValueAtTime(540, now + 0.22);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Coin buy / spend sound
  public playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = this.soundpack === 'sound-arcade' ? 'square' : 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }
}

export const soundEffects = new SoundEffectsService();
