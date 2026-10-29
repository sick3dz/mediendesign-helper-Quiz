import React, { useState } from 'react';
import { AffordanceSignifierGame } from './InteractiveMinigames/AffordanceSignifierGame';
import { PhishingDetectorGame } from './InteractiveMinigames/PhishingDetectorGame';
import { ProcessSorterGame } from './InteractiveMinigames/ProcessSorterGame';
import { WcagMatchGame } from './InteractiveMinigames/WcagMatchGame';
import { SpeedQuizGame } from './InteractiveMinigames/SpeedQuizGame';
import { MemoryMatchGame } from './InteractiveMinigames/MemoryMatchGame';
import { BossRaidGame } from './InteractiveMinigames/BossRaidGame';
import {
  Gamepad2,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Zap,
  Swords,
  Brain,
  Trophy,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  onScoreEarned: (score: number) => void;
  onBack?: () => void;
}

type GameId =
  | 'speed-quiz'
  | 'memory'
  | 'boss-raid'
  | 'affordance'
  | 'phishing'
  | 'process'
  | 'wcag';

export const MiniGamesHubView: React.FC<Props> = ({ onScoreEarned, onBack }) => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  const studyQuestGames = [
    {
      id: 'speed-quiz' as const,
      title: 'Speed-Quiz Quest (Timer & Combo)',
      desc: 'Beantworte IHK-Fragen gegen die tickende Uhr! Sammle Serien-Combos für maximale Bonuspunkte.',
      badge: '⚡ Speed-Run',
      icon: Zap,
      xpBonus: 'Bis zu +200 EXP',
    },
    {
      id: 'memory' as const,
      title: 'IHK-Begriffe Memory-Match',
      desc: 'Finde zusammengehörige Paare aus Fachbegriffen und IHK-Definitionen so schnell wie möglich.',
      badge: '🧠 Begriffspaar-Matching',
      icon: Brain,
      xpBonus: 'Bis zu +150 EXP',
    },
    {
      id: 'boss-raid' as const,
      title: 'Boss-Raid: Prüfungsgigant Duell',
      desc: 'Rundenbasierter Kampf gegen den Prüfungsboss! Jede richtige Antwort zieht dem Boss Lebenspunkte ab.',
      badge: '⚔️ Boss-Fight',
      icon: Swords,
      xpBonus: '+250 EXP bei Sieg',
    },
  ];

  const topicGames = [
    {
      id: 'affordance' as const,
      title: 'Affordance vs. Signifier Blitz-Duell',
      desc: 'Kann ich es anfassen/bedienen (Affordance) oder zeigt ein Signal die Richtung (Signifier)? Das #1 IHK-Prüfungsduell!',
      badge: 'Kapitel 1: IxD',
      icon: Sparkles,
      xpBonus: '+50 EXP',
    },
    {
      id: 'phishing' as const,
      title: 'Spot the Fake: Phishing- & Fake-Shop Detektiv',
      desc: 'Finde die verdächtigen roten Flaggen im gefälschten E-Mail- & Webshop-Szenario.',
      badge: 'Kapitel 4: Sicherheit',
      icon: ShieldAlert,
      xpBonus: '+60 EXP',
    },
    {
      id: 'process' as const,
      title: 'Design-Ablauf Puzzle',
      desc: 'Bringe die 6 Phasen von der Anforderungsanalyse bis zum produktiven Code in die exakte Reihenfolge.',
      badge: 'Kapitel 2 & 6: Workflow',
      icon: Layers,
      xpBonus: '+50 EXP',
    },
    {
      id: 'wcag' as const,
      title: 'WCAG POUR Zuordnungs-Arena',
      desc: 'Ordne Barrierefreiheits-Maßnahmen den 4 WCAG-Säulen Perceivable, Operable, Understandable und Robust zu.',
      badge: 'Kapitel 5: A11y',
      icon: CheckCircle2,
      xpBonus: '+50 EXP',
    },
  ];

  if (activeGame) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveGame(null);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Spiele-Übersicht</span>
        </button>

        {activeGame === 'speed-quiz' && (
          <SpeedQuizGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeGame === 'memory' && (
          <MemoryMatchGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeGame === 'boss-raid' && (
          <BossRaidGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeGame === 'affordance' && (
          <AffordanceSignifierGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeGame === 'phishing' && (
          <PhishingDetectorGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeGame === 'process' && (
          <ProcessSorterGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeGame === 'wcag' && (
          <WcagMatchGame onComplete={score => onScoreEarned(score)} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kapitelübersicht</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>StudyQuest Spiele & Challenges</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          IHK-Wissen spielerisch festigen
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Aktives Handeln macht das Lernen effektiver und unterhaltsamer. Gewinne Spiele, sammle Highscores und verdiene wertvolle <strong>EXP-Punkte</strong> für dein Haustier!
        </p>
      </div>

      {/* Section 1: StudyQuest Quiz Minigames */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            StudyQuest Quiz-Spiele (Fragen & Modi)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {studyQuestGames.map(g => {
            const Icon = g.icon;
            return (
              <div
                key={g.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 p-5 shadow-xs hover:border-indigo-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                      {g.badge}
                    </span>
                    <Icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                    {g.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {g.desc}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{g.xpBonus}</span>
                  </div>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveGame(g.id);
                    }}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                  >
                    <span>Spiel starten</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Specific Chapter Micro-Challenges */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Spezifische Kapitel-Challenges
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicGames.map(g => {
            const Icon = g.icon;
            return (
              <div
                key={g.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                      {g.badge}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    {g.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {g.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Belohnung: {g.xpBonus}
                  </span>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveGame(g.id);
                    }}
                    className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Starten
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

