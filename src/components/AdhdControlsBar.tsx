import React, { useState, useRef, useEffect } from 'react';
import { UserStats } from '../types/quiz';
import { UserSettings, calculateLevel } from '../services/storageService';
import { Volume2, VolumeX, Eye, Flame, Star, Coffee, ChevronDown, Wind, Clock, RotateCcw, Sparkles } from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  stats: UserStats;
  settings: UserSettings;
  studySeconds: number;
  onUpdateSettings: (settings: UserSettings) => void;
  onGoToPet: () => void;
  onStartBreathing: () => void;
  onSnoozeBreak: () => void;
  onResetTimer?: () => void;
}

export const AdhdControlsBar: React.FC<Props> = ({
  stats,
  settings,
  studySeconds,
  onUpdateSettings,
  onGoToPet,
  onStartBreathing,
  onSnoozeBreak,
  onResetTimer,
}) => {
  const [isIntervalMenuOpen, setIsIntervalMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const progressXp = stats.lifetimeXp ?? stats.xp;
  const levelInfo = calculateLevel(progressXp);
  const xpInCurrentLevel = progressXp - levelInfo.currentLevelXp;
  const xpNeeded = levelInfo.nextLevelXp - levelInfo.currentLevelXp;
  const levelProgress = Math.min(Math.round((xpInCurrentLevel / (xpNeeded || 1)) * 100), 100);

  const reminderMinutes = settings.breakReminderMinutes ?? 25;
  const isEnabled = settings.breakReminderMinutes !== null;
  const targetSeconds = isEnabled ? reminderMinutes * 60 : 0;
  const isBreakDue = isEnabled && studySeconds >= targetSeconds;

  const studyMinutes = Math.floor(studySeconds / 60);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsIntervalMenuOpen(false);
      }
    };
    if (isIntervalMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isIntervalMenuOpen]);

  const toggleBionic = () => {
    soundEffects.playClick();
    onUpdateSettings({ ...settings, bionicReading: !settings.bionicReading });
  };

  const toggleSound = () => {
    const nextSound = !settings.soundEnabled;
    soundEffects.setMuted(!nextSound);
    if (nextSound) soundEffects.playClick();
    onUpdateSettings({ ...settings, soundEnabled: nextSound });
  };

  const selectInterval = (minutes: number | null) => {
    soundEffects.playClick();
    onUpdateSettings({ ...settings, breakReminderMinutes: minutes });
    setIsIntervalMenuOpen(false);
  };

  return (
    <div className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Gamification Level, XP & Coins */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Lvl {levelInfo.level}</span>
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">{levelInfo.title}</span>
          </div>

          <div className="w-16 sm:w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${levelProgress}%` }}
            />
          </div>

          {/* EXP button to go to pet shop */}
          <button
            onClick={onGoToPet}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-400 font-bold font-mono hover:scale-105 transition-all cursor-pointer"
            title="Haustier mit verdienten EXP versorgen & einkleiden"
          >
            <Star className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400" />
            <span className="tabular-nums">{stats.xp} EXP</span>
          </button>

          {stats.currentCombo > 1 && (
            <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {stats.currentCombo}x!
            </span>
          )}

          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
            <Flame className="w-3.5 h-3.5 fill-orange-500" />
            <span className="font-mono tabular-nums">{stats.streakDays}d</span>
          </div>
        </div>

        {/* Center/Right: Break Reminder & Cognitive Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Active Break Due Soothing Notification Banner */}
          {isBreakDue ? (
            <div className="flex items-center gap-2 p-1 pl-2.5 pr-1 rounded-xl bg-gradient-to-r from-teal-500/15 via-emerald-500/15 to-indigo-500/15 border border-teal-300/80 dark:border-teal-700/80 text-teal-900 dark:text-teal-200 animate-pulse">
              <div className="flex items-center gap-1.5 font-bold text-[11px]">
                <Wind className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="hidden sm:inline">Pause fällig:</span>
                <span>{stats.pet.name} wartet!</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    onStartBreathing();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                  title="Atemübung mit deinem Tier starten (+25 EXP)"
                >
                  <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span>Atmen (+25 EXP)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    onSnoozeBreak();
                  }}
                  className="px-2 py-1 rounded-lg bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-teal-200 dark:border-teal-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition-colors cursor-pointer whitespace-nowrap"
                  title="In 5 Minuten nochmals erinnern"
                >
                  +5m
                </button>
              </div>
            </div>
          ) : (
            /* Normal Break Reminder Config / Status Dropdown */
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  setIsIntervalMenuOpen(prev => !prev);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                  isEnabled
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-700 text-slate-400'
                }`}
                title="Pausen-Erinnerung konfigurieren"
              >
                <Coffee className={`w-3.5 h-3.5 ${isEnabled ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                <span>
                  {isEnabled ? `${reminderMinutes}m Pause` : 'Pause: Aus'}
                </span>
                {isEnabled && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tabular-nums">
                    ({studyMinutes}m)
                  </span>
                )}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Interval Selection Popover */}
              {isIntervalMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 z-40 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 text-xs">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Pausen-Intervall
                  </div>

                  {[15, 20, 25, 30, 45].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => selectInterval(mins)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                        reminderMinutes === mins && isEnabled
                          ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{mins} Minuten {mins === 25 ? '(Pomodoro)' : ''}</span>
                      {reminderMinutes === mins && isEnabled && (
                        <span className="text-teal-600 dark:text-teal-400 font-bold">✓</span>
                      )}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => selectInterval(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      !isEnabled
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Deaktiviert</span>
                    {!isEnabled && <span className="text-rose-600 font-bold">✓</span>}
                  </button>

                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setIsIntervalMenuOpen(false);
                        onStartBreathing();
                      }}
                      className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Wind className="w-3 h-3" />
                      <span>Jetzt atmen</span>
                    </button>

                    {onResetTimer && (
                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playClick();
                          onResetTimer();
                          setIsIntervalMenuOpen(false);
                        }}
                        className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                        title="Lernzeit auf 0 zurücksetzen"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cognitive Aids Toggles */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleBionic}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer text-[11px] ${
                settings.bionicReading
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
              title="Bionisches Lesen: Hebt Wortanfänge als Lesehilfe bei ADHS hervor"
            >
              <Eye className="w-3 h-3" />
              <span>Bionic</span>
            </button>

            <button
              onClick={toggleSound}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer text-[11px]"
              title="Dopamin Audio an/aus"
            >
              {settings.soundEnabled ? <Volume2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> : <VolumeX className="w-3 h-3 text-slate-400" />}
              <span>Sound</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
