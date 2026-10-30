import React from 'react';
import { UserStats } from '../types/quiz';
import { UserSettings, calculateLevel } from '../services/storageService';
import { Volume2, VolumeX, Eye, Flame, Zap } from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  stats: UserStats;
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
  onGoToPet: () => void;
}

export const AdhdControlsBar: React.FC<Props> = ({ stats, settings, onUpdateSettings, onGoToPet }) => {
  const progressXp = stats.lifetimeXp ?? stats.xp;
  const levelInfo = calculateLevel(progressXp);
  const xpInCurrentLevel = progressXp - levelInfo.currentLevelXp;
  const xpNeeded = levelInfo.nextLevelXp - levelInfo.currentLevelXp;
  const levelProgress = Math.min(Math.round((xpInCurrentLevel / (xpNeeded || 1)) * 100), 100);

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

  return (
    <div className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-4">
        {/* Gamification Level, XP & Coins */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Lvl {levelInfo.level}</span>
            <span className="text-slate-500 dark:text-slate-400">{levelInfo.title}</span>
          </div>

          <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
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
            <span>⚡</span>
            <span className="tabular-nums">{stats.xp} EXP</span>
          </button>

          {stats.currentCombo > 1 && (
            <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 font-mono">
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              {stats.currentCombo}x!
            </span>
          )}

          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
            <Flame className="w-3.5 h-3.5 fill-orange-500" />
            <span className="font-mono tabular-nums">{stats.streakDays}d</span>
          </div>
        </div>

        {/* Cognitive Aids Toggles */}
        <div className="flex items-center gap-2">
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
  );
};
