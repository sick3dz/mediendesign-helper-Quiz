import React, { useState } from 'react';
import { DailyMission } from '../types/quiz';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Target,
  Award,
  Star,
} from 'lucide-react';

interface Props {
  missions: DailyMission[];
  onClaimReward: (missionId: string) => void;
  onOpenFocusSprint?: () => void;
}

export const DailyMissionsBar: React.FC<Props> = ({
  missions,
  onClaimReward,
  onOpenFocusSprint,
}) => {
  // Default to collapsed so it does not clutter the screen on startup
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('daily_missions_collapsed');
      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  });

  const completedCount = missions.filter(m => m.currentCount >= m.targetCount).length;
  const claimedCount = missions.filter(m => m.isClaimed).length;
  const totalMissions = missions.length;
  const hasUnclaimed = missions.some(m => m.currentCount >= m.targetCount && !m.isClaimed);

  const toggleCollapse = () => {
    soundEffects.playClick();
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('daily_missions_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleClaim = (m: DailyMission) => {
    soundEffects.playLevelUp();
    try {
      confetti({ particleCount: 55, spread: 65, origin: { y: 0.2 } });
    } catch {
      // ignore
    }
    onClaimReward(m.id);
  };

  return (
    <div className="bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2">
        {/* Header Ribbon of the Bar */}
        <div
          onClick={toggleCollapse}
          className="flex items-center justify-between gap-3 cursor-pointer group select-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 flex items-center justify-center shrink-0 text-amber-700 dark:text-amber-300 group-hover:scale-105 transition-transform">
              <Target className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Tages-Missionen
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {claimedCount}/{totalMissions} belohnt
              </span>
            </div>

            {/* Quick mini-summary tags when collapsed */}
            {isCollapsed && (
              <div className="hidden sm:flex items-center gap-1.5 ml-1 text-[10px] font-mono font-bold">
                {missions.map(m => (
                  <span
                    key={m.id}
                    className={`flex items-center gap-1 px-1.5 py-0.2 rounded-md ${
                      m.isClaimed
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60'
                        : m.currentCount >= m.targetCount
                        ? 'text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/60'
                        : 'text-slate-600 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{Math.min(m.currentCount, m.targetCount)}/{m.targetCount}</span>
                  </span>
                ))}
              </div>
            )}

            {hasUnclaimed && (
              <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 animate-bounce">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                EXP abholbereit!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Collapse toggle */}
            <button
              onClick={e => {
                e.stopPropagation();
                toggleCollapse();
              }}
              className="p-1 rounded-lg text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
              title={isCollapsed ? 'Missionen ausklappen' : 'Missionen minimieren'}
            >
              <span className="text-[11px] font-medium hidden sm:inline">
                {isCollapsed ? 'Aufgaben anzeigen' : 'Minimieren'}
              </span>
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mission Cards Grid */}
        {!isCollapsed && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            {missions.map(m => {
              const isFinished = m.currentCount >= m.targetCount;
              const canClaim = isFinished && !m.isClaimed;
              const percent = Math.min(100, Math.round((m.currentCount / m.targetCount) * 100));

              return (
                <div
                  key={m.id}
                  className={`p-2.5 sm:p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    m.isClaimed
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 opacity-75'
                      : canClaim
                      ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80 ring-2 ring-amber-400/20'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0 select-none">{m.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {m.title}
                          </h4>
                          <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                            +{m.rewardXp} EXP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight truncate">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-extrabold tabular-nums shrink-0 text-slate-700 dark:text-slate-300">
                      {Math.min(m.currentCount, m.targetCount)}/{m.targetCount}
                    </span>
                  </div>

                  {/* Micro Progress Bar & Action Button */}
                  <div className="space-y-1.5 pt-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          m.isClaimed
                            ? 'bg-emerald-500'
                            : isFinished
                            ? 'bg-amber-500'
                            : 'bg-indigo-600 dark:bg-indigo-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {canClaim ? (
                      <button
                        onClick={() => handleClaim(m)}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                        <span>+{m.rewardXp} ⭐ EXP einlösen!</span>
                      </button>
                    ) : m.isClaimed ? (
                      <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 py-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Eingelöst (+{m.rewardXp} EXP)</span>
                      </div>
                    ) : m.category === 'focus' && onOpenFocusSprint ? (
                      <button
                        onClick={onOpenFocusSprint}
                        className="w-full py-1 px-2 rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/40 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Star className="w-3 h-3 text-indigo-500" />
                        <span>Fokus-Timer starten</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
