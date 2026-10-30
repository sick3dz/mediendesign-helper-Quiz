// Web Audio API Synthesizer for Focus & Study Sounds (Lofi Chords, White Noise, Rain Drift)
// 100% offline-ready, zero network latency, infinite procedural generation

export type AmbientSoundType = 'none' | 'lofi' | 'white-noise' | 'rain';

class AmbientAudioService {
  private ctx: AudioContext | null = null;
  private currentType: AmbientSoundType = 'none';
  private masterGain: GainNode | null = null;
  private volume: number = 0.4;
  private isMuted: boolean = false;

  // Active nodes tracking
  private activeSources: (AudioNode | number)[] = [];
  private lofiInterval: NodeJS.Timeout | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentType(): AmbientSoundType {
    return this.currentType;
  }

  public stop() {
    if (this.lofiInterval) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }

    this.activeSources.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        try {
          if ('stop' in item && typeof (item as AudioScheduledSourceNode).stop === 'function') {
            (item as AudioScheduledSourceNode).stop();
          }
          item.disconnect();
        } catch {
          // ignore already stopped nodes
        }
      }
    });
    this.activeSources = [];
    this.currentType = 'none';
  }

  public play(type: AmbientSoundType) {
    this.stop();
    if (type === 'none') return;

    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.currentType = type;

    if (type === 'white-noise') {
      this.startWhiteNoise();
    } else if (type === 'rain') {
      this.startRainNoise();
    } else if (type === 'lofi') {
      this.startLofiDroneAndChords();
    }
  }

  // 1. Filtered White Noise for masking speech & environmental distractions
  private startWhiteNoise() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Gentle low-pass filter to soften the harshness of raw white noise
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noiseSource.start();
    this.activeSources.push(noiseSource, filter, noiseGain);
  }

  // 2. Soft Pink Rain / Brown noise generator
  private startRainNoise() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink noise filter algorithm (Paul Kellet's method)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    rainSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    rainSource.start();
    this.activeSources.push(rainSource, filter, gain);
  }

  // 3. Generative Warm Lofi Chillout Drone with subtle periodic chord progressions
  private startLofiDroneAndChords() {
    if (!this.ctx || !this.masterGain) return;

    // Sub base drone (sine wave)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, this.ctx.currentTime); // A2

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start();
    this.activeSources.push(subOsc, subGain);

    // Warm tape flutter filter
    const lofiFilter = this.ctx.createBiquadFilter();
    lofiFilter.type = 'lowpass';
    lofiFilter.frequency.setValueAtTime(650, this.ctx.currentTime);
    lofiFilter.connect(this.masterGain);

    // Gentle chord progression: Dm9 -> G13 -> Cmaj9 -> Am7
    const chords = [
      [146.83, 220.00, 261.63, 329.63], // Dm9 (D3, A3, C4, E4)
      [196.00, 246.94, 293.66, 370.00], // G-chord
      [130.81, 196.00, 246.94, 329.63], // Cmaj9 (C3, G3, B3, E4)
      [110.00, 164.81, 220.00, 261.63], // Am7 (A2, E3, A3, C4)
    ];

    let chordIdx = 0;

    const playNextChord = () => {
      if (!this.ctx || this.currentType !== 'lofi') return;

      const chord = chords[chordIdx % chords.length];
      chordIdx++;
      const now = this.ctx.currentTime;

      chord.forEach(freq => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Slow attack & long release for vintage lofi chill vibe
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.6);

        osc.connect(gain);
        gain.connect(lofiFilter);

        osc.start(now);
        osc.stop(now + 4.8);
      });
    };

    // Play first chord immediately
    playNextChord();
    this.lofiInterval = setInterval(playNextChord, 4600);
  }
}

export const ambientAudioService = new AmbientAudioService();
