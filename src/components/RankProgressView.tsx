import React from 'react';
import { UserStats } from '../types/quiz';
import { calculateLevel, LEVEL_LADDER } from '../services/storageService';
import { soundEffects } from '../services/audioService';
import {
  Trophy,
  Star,
  Check,
  Gift,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  ShoppingBag,
  Zap,
  Timer,
  Gamepad2,
  Lock,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  onBack: () => void;
  onGoToShop: () => void;
  onGoToPet: () => void;
  onGoToAchievements?: () => void;
  onGoToChapters: () => void;
}

export const RankProgressView: React.FC<Props> = ({
  stats,
  onBack,
  onGoToShop,
  onGoToPet,
  onGoToAchievements,
  onGoToChapters,
}) => {
  const { xp = 0 } = stats;
  const lifetimeProgressXp =
    stats.lifetimeXp ??
    Math.max(xp, LEVEL_LADDER.find(l => l.level === (stats.level || 1))?.xp || 0);

  const levelInfo = calculateLevel(lifetimeProgressXp);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header & Navigation Ribbon */}
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
                Rang-System
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500 fill-amber-500 shrink-0" />
              Aktueller Rang & Stufenleiter
            </h1>
          </div>
        </div>

        {/* Quick action shortcuts to Achievements, Pet & Shop */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          {onGoToAchievements && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onGoToAchievements();
              }}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Zu Errungenschaften & Meilensteine"
            >
              <span>🏆</span>
              <span className="hidden xs:inline">Erfolge</span>
            </button>
          )}
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToPet();
            }}
            className="py-2 px-3 sm:px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>🏠</span>
            <span className="hidden xs:inline">Haustier Lounge</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToShop();
            }}
            className="py-2 px-3 sm:px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>EXP Shop</span>
          </button>
        </div>
      </div>

      {/* Prominent Active Rank Hero Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-indigo-800/60">
        {/* Decorative background glow */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
                <span className="select-none">{levelInfo.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    Level {levelInfo.level} von 7
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Aktiver IHK-Titel
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {levelInfo.title}
                </h2>
                <p className="text-xs text-indigo-200/80 font-medium mt-0.5">
                  Erreicht durch kontinuierliches Lernen und Beantworten von Prüfungsfragen.
                </p>
              </div>
            </div>

            {/* EXP Balances: Lifetime vs Spendable */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                  Dauerhafte Gesamt-EXP
                </span>
                <span className="text-lg font-black text-white font-mono tabular-nums">
                  {lifetimeProgressXp.toLocaleString()} EXP
                </span>
              </div>
              <div className="text-right sm:text-right border-l sm:border-l-0 sm:border-t border-white/10 pl-3 sm:pl-0 sm:pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block flex items-center sm:justify-end gap-1">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  Verfügbares Shop-Guthaben
                </span>
                <span className="text-base font-bold text-amber-300 font-mono tabular-nums">
                  {xp.toLocaleString()} EXP
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar & Targets */}
          <div className="space-y-2 bg-black/25 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5 text-indigo-100">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Stufen-Fortschritt:</span>
                <strong className="text-white tabular-nums">{lifetimeProgressXp}</strong> /{' '}
                {levelInfo.nextLevelXp} EXP
              </span>
              <span className="tabular-nums text-amber-400 font-extrabold text-sm">
                {levelInfo.progressPercent}%
              </span>
            </div>

            <div className="w-full bg-slate-900/80 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/15">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-indigo-200/90 pt-1">
              {levelInfo.isMaxLevel ? (
                <span className="font-extrabold text-amber-300 flex items-center gap-1 font-mono">
                  <Trophy className="w-4 h-4" /> Höchste Stufe erreicht! Du bist die Design-Legende! 👑
                </span>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-300">Nächstes Ziel:</span>
                    <span className="font-bold text-white">
                      Level {levelInfo.nextTier?.level}: {levelInfo.nextTier?.title}
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-amber-300">
                    Noch {levelInfo.xpNeededForNext} EXP bis zum Aufstieg
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Next Level Reward Card */}
          {levelInfo.nextTier && (
            <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-amber-200">
                    Belohnung bei Stufe {levelInfo.nextTier.level} ({levelInfo.nextTier.title}):
                  </span>
                  <p className="text-slate-200 font-medium mt-0.5">
                    🎁 {levelInfo.nextTier.rewardDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete Level Ladder: 7 Tiers */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Gesamtübersicht
          </span>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Der 7-Stufen IHK Lern- & Belohnungspfad
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Jede erreichte Stufe schaltet exklusive Titel und Geschenke für dein Haustier frei.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LEVEL_LADDER.map(tier => {
            const isCurrent = tier.level === levelInfo.level;
            const isPassed = lifetimeProgressXp >= tier.xp;
            const xpDifference = tier.xp - lifetimeProgressXp;

            return (
              <div
                key={tier.level}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 relative overflow-hidden ${
                  isCurrent
                    ? 'bg-gradient-to-br from-indigo-50/90 to-amber-50/50 dark:from-indigo-950/70 dark:to-slate-900 border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                    : isPassed
                    ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                    : 'bg-white dark:bg-slate-900/60 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl select-none shrink-0 ${
                    isCurrent
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700 shadow-2xs'
                      : isPassed
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {tier.icon}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                      Level {tier.level}: {tier.title}
                    </span>
                    {isCurrent ? (
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-600 text-white shrink-0 shadow-2xs">
                        Aktueller Rang ★
                      </span>
                    ) : isPassed ? (
                      <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" /> Erreicht
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold font-mono text-slate-400 flex items-center gap-1 shrink-0">
                        <Lock className="w-3 h-3" /> {tier.xp} EXP
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    🎁 {tier.rewardDescription}
                  </div>

                  {!isPassed && (
                    <div className="text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400 pt-0.5">
                      Noch {xpDifference} EXP benötigt
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Earn EXP Section */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Tipps & Quellen
          </span>
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Wie sammle ich EXP für den nächsten Rang?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="p-2 w-fit rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Lernmodule</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Schließe Level 1 & 2 Fragenmodule ab für bis zu +50 EXP pro Modul.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="p-2 w-fit rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Daily Quests</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Tägliche Aufgaben bringen dir verlässliche +40 bis +60 EXP ein.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="p-2 w-fit rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Timer className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fokus-Sprint</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Konzentriertes Arbeiten belohnt dich mit Bonus-EXP und Loot-Kisten.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="p-2 w-fit rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Quiz-Spiele Hub</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Speed-Quiz und Boss-Raids bringen zusätzliche EXP für Bestnoten.
            </p>
          </div>
        </div>

        {/* Footer Jump Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToChapters();
            }}
            className="py-2.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Jetzt weiterlernen & EXP sammeln</span>
          </button>
        </div>
      </div>
    </div>
  );
};
