import React from 'react';
import { soundEffects } from '../services/audioService';
import { AmbientSoundType } from '../services/ambientAudioService';
import {
  Play,
  Pause,
  RotateCcw,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Headphones,
  CloudRain,
  Wind,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  totalSeconds: number;
  secondsLeft: number;
  isActive: boolean;
  isDone: boolean;
  soundType: AmbientSoundType;
  volume: number;
  isMuted: boolean;
  onToggleActive: () => void;
  onReset: (secs?: number) => void;
  onSelectSound: (type: AmbientSoundType) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

export const FocusSprintModal: React.FC<Props> = ({
  isOpen,
  onClose,
  totalSeconds,
  secondsLeft,
  isActive,
  isDone,
  soundType,
  volume,
  isMuted,
  onToggleActive,
  onReset,
  onSelectSound,
  onVolumeChange,
  onToggleMute,
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative transition-colors max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold mb-2 border border-indigo-200/80 dark:border-indigo-800/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Fokus-Sprint & Lofi-Studio</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Konzentrierte Lerneinheit
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Reizreduzierte Sprint-Phase mit beruhigenden Hintergrundklängen (+40 ⚡ EXP Belohnung).
          </p>
        </div>

        {/* Circular Ring Progress Indicator */}
        <div className="relative w-40 h-40 mx-auto mb-5 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-slate-100 dark:text-slate-800 stroke-current"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-500"
              strokeWidth="7"
              strokeDasharray={263.89}
              strokeDashoffset={263.89 - (263.89 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-4xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-1">
              {isActive ? 'Sprint läuft...' : isDone ? 'Geschafft!' : 'Bereit'}
            </span>
          </div>
        </div>

        {/* Done / Celebration Banner */}
        {isDone ? (
          <div className="text-center p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 mb-5 animate-in fade-in">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm mb-0.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Session gemeistert! +40 ⚡ EXP erhalten</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Deine tägliche Fokus-Mission wurde aktualisiert. Zeit für 2 Minuten Pause!
            </p>
          </div>
        ) : null}

        {/* Primary Sprint Controls */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleActive();
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-98 ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Sprint starten'}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onReset(totalSeconds);
            }}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Duration Presets */}
        <div className="flex items-center justify-center gap-2 text-xs mb-5">
          <span className="text-slate-400 dark:text-slate-500 font-semibold text-[11px]">Dauer:</span>
          {[180, 300, 600].map(secs => (
            <button
              key={secs}
              onClick={() => {
                soundEffects.playClick();
                onReset(secs);
              }}
              className={`px-3 py-1 rounded-lg font-mono font-bold text-xs cursor-pointer transition-all ${
                totalSeconds === secs
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {secs / 60} Min
            </button>
          ))}
        </div>

        {/* Ambient Soundscape Selection */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-indigo-500" />
              <span>Hintergrund-Audio (ADHS-Fokus)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Web Audio API</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('lofi');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'lofi'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <Music className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Lofi Chords</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('white-noise');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'white-noise'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <Wind className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">White Noise</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('rain');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'rain'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Rain Drift</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('none');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'none'
                  ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <VolumeX className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Stumm (Aus)</span>
            </button>
          </div>

          {/* Volume Control */}
          {soundType !== 'none' && (
            <div className="flex items-center gap-2.5 pt-1 text-xs">
              <button
                onClick={onToggleMute}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer p-1"
                title={isMuted ? 'Ton an' : 'Stumm schalten'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={onVolumeChange}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] text-slate-400 w-8 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
