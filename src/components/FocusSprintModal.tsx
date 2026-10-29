import React, { useState, useEffect } from 'react';
import { soundEffects } from '../services/audioService';
import { Play, Pause, RotateCcw, X, Sparkles, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FocusSprintModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 min default
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(sec => sec - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setIsDone(true);
      soundEffects.playLevelUp();
      confetti({ particleCount: 90, spread: 80 });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  if (!isOpen) return null;

  const toggle = () => {
    soundEffects.playClick();
    setIsActive(!isActive);
  };

  const reset = (secs: number = totalSeconds) => {
    soundEffects.playClick();
    setIsActive(false);
    setTotalSeconds(secs);
    setSecondsLeft(secs);
    setIsDone(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            ADHS Hyperfocus Sprint
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">5-Minuten Fokus-Session</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kurze Sprints verhindern Überforderung und halten die Dopamin-Motivation hoch.
          </p>
        </div>

        {/* Circular / Ring Progress Indicator */}
        <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
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
            <span className="font-mono text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1">
              {isActive ? 'Sprint läuft...' : isDone ? 'Geschafft!' : 'Bereit'}
            </span>
          </div>
        </div>

        {isDone ? (
          <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-6">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-1">
              <Coffee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Fantastisch! Zeit für eine 2-Minuten-Pause.
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Trinke einen Schluck Wasser oder strecke dich kurz, bevor du weiterlernst!
            </p>
          </div>
        ) : null}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-xs cursor-pointer ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Pause' : 'Sprint starten'}
          </button>

          <button
            onClick={() => reset(totalSeconds)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Preset choices */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-slate-500">Dauer:</span>
          <button
            onClick={() => reset(180)}
            className={`px-2.5 py-1 rounded-md font-mono cursor-pointer ${totalSeconds === 180 ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            3 min
          </button>
          <button
            onClick={() => reset(300)}
            className={`px-2.5 py-1 rounded-md font-mono cursor-pointer ${totalSeconds === 300 ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            5 min
          </button>
          <button
            onClick={() => reset(600)}
            className={`px-2.5 py-1 rounded-md font-mono cursor-pointer ${totalSeconds === 600 ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            10 min
          </button>
        </div>
      </div>
    </div>
  );
};
