import React, { useState } from 'react';
import { UserStats } from '../types/quiz';
import {
  getEvaluatedAchievements,
  AchievementCategory,
  EvaluatedAchievement,
} from '../data/achievementData';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Trophy, Star, Lightbulb, CheckCircle2, Gift, Sparkles } from 'lucide-react';

interface Props {
  stats: UserStats;
  onUpdateStats: (updatedStats: UserStats) => void;
  onXpChange?: (newXp: number) => void;
  onCoinsChange?: (newCoins: number) => void;
}

export const PetAchievementsSection: React.FC<Props> = ({
  stats,
  onUpdateStats,
  onXpChange,
  onCoinsChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all');
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const evaluated = getEvaluatedAchievements(stats);

  const filtered = evaluated.filter((ach) => {
    if (selectedCategory === 'all') return true;
    return ach.category === selectedCategory;
  });

  const totalUnlocked = evaluated.filter((a) => a.isUnlocked).length;
  const totalClaimed = evaluated.filter((a) => a.isClaimed).length;
  const totalCount = evaluated.length;
  const overallPercent = Math.round((totalUnlocked / (totalCount || 1)) * 100);

  // Total available rewards calculated
  const totalEarnedXp = evaluated
    .filter((a) => a.isClaimed)
    .reduce((sum, a) => sum + a.rewardXp, 0);
  const totalEarnedCoins = evaluated
    .filter((a) => a.isClaimed)
    .reduce((sum, a) => sum + a.rewardCoins, 0);

  const handleClaimReward = (ach: EvaluatedAchievement) => {
    if (!ach.isUnlocked || ach.isClaimed) return;

    soundEffects.playCorrect(2);
    setClaimingId(ach.id);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const currentClaimed = stats.claimedAchievements || [];
    const updatedClaimed = Array.from(new Set([...currentClaimed, ach.id]));

    const newXp = (stats.xp || 0) + ach.rewardXp;
    const newLifetimeXp = (stats.lifetimeXp ?? stats.xp ?? 0) + ach.rewardXp;
    const newCoins = (stats.coins || 0) + ach.rewardCoins;

    const updatedStats: UserStats = {
      ...stats,
      xp: newXp,
      lifetimeXp: newLifetimeXp,
      coins: newCoins,
      claimedAchievements: updatedClaimed,
    };

    onUpdateStats(updatedStats);
    if (onXpChange) onXpChange(newXp);
    if (onCoinsChange) onCoinsChange(newCoins);

    setTimeout(() => {
      setClaimingId(null);
    }, 600);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
      {/* Header Banner with Overall Progress */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl shadow-xs shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Errungenschaften & MeiIensteine
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
              {totalUnlocked} von {totalCount} Freigeschaltet ({overallPercent}%)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Meistere Aufgaben beim Lernen, Pflegen und in Quiz-Sessions für Bonus XP & Coins!
            </p>
          </div>
        </div>

        {/* Claimed Earnings Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-slate-800">
          <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Kassierte XP</div>
            <div className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1 justify-center">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> +{totalEarnedXp}
            </div>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Kassierte Coins</div>
            <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 justify-center">
              🪙 +{totalEarnedCoins}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
        <button
          onClick={() => {
            soundEffects.playClick();
            setSelectedCategory('all');
          }}
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Alle ({evaluated.length})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setSelectedCategory('learning');
          }}
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === 'learning'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>📚 Lernen</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setSelectedCategory('quiz');
          }}
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === 'quiz'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🎯 Quiz</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setSelectedCategory('care');
          }}
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === 'care'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🥕 Pflege & Stylist</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setSelectedCategory('streak');
          }}
          className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            selectedCategory === 'streak'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🔥 Serie & Fokus</span>
        </button>
      </div>

      {/* Achievement List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((ach) => {
          const isPendingClaim = ach.isUnlocked && !ach.isClaimed;

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                ach.isClaimed
                  ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 opacity-85'
                  : isPendingClaim
                  ? 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/40'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Achievement Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-2xs border ${
                    ach.isClaimed
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800'
                      : isPendingClaim
                      ? 'bg-amber-100 dark:bg-amber-900/60 border-amber-300 dark:border-amber-700 animate-bounce'
                      : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <span>{ach.icon}</span>
                </div>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      {ach.title}
                    </h4>

                    {ach.isClaimed ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60">
                        <CheckCircle2 className="w-3 h-3" /> Abgeschlossen
                      </span>
                    ) : isPendingClaim ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/80 animate-pulse">
                        <Sparkles className="w-3 h-3" /> Bereit zum Abholen!
                      </span>
                    ) : null}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    {ach.description}
                  </p>

                  {/* Visual Progress Bar & Numerical Ratio */}
                  <div className="space-y-1 pt-1 max-w-lg">
                    <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-slate-500 dark:text-slate-400">
                      <span>
                        Fortschritt:{' '}
                        <strong className="text-slate-900 dark:text-white tabular-nums">
                          {ach.currentProgress}
                        </strong>{' '}
                        / {ach.targetProgress} {ach.unit}
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {ach.percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-300/40 dark:border-slate-700">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ach.isUnlocked
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-indigo-500 to-amber-500'
                        }`}
                        style={{ width: `${ach.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Actionable Instruction Directive */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-2 text-xs mt-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {ach.actionHint}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reward Badge & Claim Button */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> +{ach.rewardXp} XP
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    🪙 +{ach.rewardCoins}
                  </span>
                </div>

                {isPendingClaim ? (
                  <button
                    onClick={() => handleClaimReward(ach)}
                    disabled={claimingId === ach.id}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-slate-950 dark:text-white font-black text-xs transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98 flex items-center gap-1.5 shrink-0"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Belohnung abholen</span>
                  </button>
                ) : ach.isClaimed ? (
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Kassiert
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Noch offen
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
