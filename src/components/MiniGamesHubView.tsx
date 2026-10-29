import React, { useState } from 'react';
import { AffordanceSignifierGame } from './InteractiveMinigames/AffordanceSignifierGame';
import { PhishingDetectorGame } from './InteractiveMinigames/PhishingDetectorGame';
import { ProcessSorterGame } from './InteractiveMinigames/ProcessSorterGame';
import { WcagMatchGame } from './InteractiveMinigames/WcagMatchGame';
import { Gamepad2, ArrowLeft, Sparkles, ShieldAlert, Layers, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  onScoreEarned: (score: number) => void;
  onBack?: () => void;
}

export const MiniGamesHubView: React.FC<Props> = ({ onScoreEarned, onBack }) => {
  const [activeGame, setActiveGame] = useState<'affordance' | 'phishing' | 'process' | 'wcag' | null>(null);

  const games = [
    {
      id: 'affordance' as const,
      title: 'Affordance vs. Signifier Blitz-Duell',
      desc: 'Kann ich es anfassen/bedienen (Affordance) oder zeigt ein Signal die Richtung (Signifier)? Das #1 IHK-Prüfungsduell!',
      badge: 'Kapitel 1: IxD',
      icon: Sparkles,
      color: 'indigo'
    },
    {
      id: 'phishing' as const,
      title: 'Spot the Fake: Phishing- & Fake-Shop Detektiv',
      desc: 'Finde die 4 verdächtigen roten Flaggen im gefälschten E-Mail- & Webshop-Szenario.',
      badge: 'Kapitel 4: Sicherheit',
      icon: ShieldAlert,
      color: 'rose'
    },
    {
      id: 'process' as const,
      title: 'Design-Ablauf Puzzle',
      desc: 'Bringe die 6 Phasen von der Anforderungsanalyse bis zum produktiven Code in die exakte Reihenfolge.',
      badge: 'Kapitel 2 & 6: Workflow',
      icon: Layers,
      color: 'blue'
    },
    {
      id: 'wcag' as const,
      title: 'WCAG POUR Zuordnungs-Arena',
      desc: 'Ordne Barrierefreiheits-Maßnahmen den 4 WCAG-Säulen Perceivable, Operable, Understandable und Robust zu.',
      badge: 'Kapitel 5: A11y',
      icon: CheckCircle2,
      color: 'amber'
    }
  ];

  if (activeGame) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveGame(null);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Challenge-Übersicht</span>
        </button>

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
    <div className="max-w-4xl mx-auto space-y-6">
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

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>Interaktive Gamification Module</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Trainiere durch Anfassen & Machen
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Für ADHS-Lernende ist aktives Tun viel effektiver als stummes Durchlesen. Wähle eine Mini-Challenge und sammle Bonus-EXP für dein Haustier!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map(g => {
          const Icon = g.icon;
          return (
            <div
              key={g.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full">
                    {g.badge}
                  </span>
                  <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{g.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{g.desc}</p>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveGame(g.id);
                }}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Challenge starten (+EXP)</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
