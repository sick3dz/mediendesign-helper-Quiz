import React from 'react';
import { UserStats } from '../types/quiz';
import { soundEffects } from '../services/audioService';
import { PetAchievementsSection } from './PetAchievementsSection';
import {
  Trophy,
  Award,
  Star,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { getEvaluatedAchievements } from '../data/achievementData';

interface Props {
  stats: UserStats;
  onBack: () => void;
  onGoToRank: () => void;
  onGoToPet: () => void;
  onGoToShop: () => void;
  onUpdateStats: (updatedStats: UserStats) => void;
  onXpChange?: (newXp: number) => void;
  onCoinsChange?: (newCoins: number) => void;
}

export const AchievementsMilestonesView: React.FC<Props> = ({
  stats,
  onBack,
  onGoToRank,
  onGoToPet,
  onGoToShop,
  onUpdateStats,
  onXpChange,
  onCoinsChange,
}) => {
  const evaluated = getEvaluatedAchievements(stats);
  const totalUnlocked = evaluated.filter((a) => a.isUnlocked).length;
  const totalClaimed = evaluated.filter((a) => a.isClaimed).length;
  const totalCount = evaluated.length;
  const claimableCount = evaluated.filter((a) => a.isUnlocked && !a.isClaimed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Navigation & Breadcrumbs Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            title="Zurück zum Lernzentrum"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Gamification & Belohnungen
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                Erfolge & Abzeichen
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500 shrink-0" />
              Errungenschaften & Meilensteine
            </h1>
          </div>
        </div>

        {/* Quick action shortcuts to Rank, Pet & Shop */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToRank();
            }}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Zu Aktueller Rang"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="hidden xs:inline">Rang</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToPet();
            }}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Zur Haustier Lounge"
          >
            <span>🏠</span>
            <span className="hidden xs:inline">Haustier</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToShop();
            }}
            className="py-2 px-3 sm:px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            title="Zum EXP Shop"
          >
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>EXP Shop</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">Freigeschaltet</div>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
              {totalUnlocked} / {totalCount}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {Math.round((totalUnlocked / (totalCount || 1)) * 100)}% aller Erfolge
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">Eingelöst</div>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
              {totalClaimed} / {totalCount}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {claimableCount > 0 ? `${claimableCount} noch abholbereit` : 'Alles abgeholt'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">Bereit zum Abholen</div>
            <div className={`text-base sm:text-lg font-black font-mono ${claimableCount > 0 ? 'text-purple-600 dark:text-purple-400 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
              {claimableCount} {claimableCount > 0 ? '🎁' : ''}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {claimableCount > 0 ? 'XP & Coins sichern!' : 'Keine offenen'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">Lern-Streak</div>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
              {stats.streakDays || 1} Tage 🔥
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              Tägliche Kontinuität
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Achievements Section */}
      <PetAchievementsSection
        stats={stats}
        onUpdateStats={onUpdateStats}
        onXpChange={onXpChange}
        onCoinsChange={onCoinsChange}
      />
    </div>
  );
};
