import React, { useState } from 'react';
import { AffordanceSignifierGame } from './InteractiveMinigames/AffordanceSignifierGame';
import { PhishingDetectorGame } from './InteractiveMinigames/PhishingDetectorGame';
import { ProcessSorterGame } from './InteractiveMinigames/ProcessSorterGame';
import { WcagMatchGame } from './InteractiveMinigames/WcagMatchGame';
import { WisoDuelGame } from './InteractiveMinigames/WisoDuelGame';
import { GraphicsFormatGame } from './InteractiveMinigames/GraphicsFormatGame';
import { WisoFristenDragDropGame } from './InteractiveMinigames/WisoFristenDragDropGame';
import {
  Layers,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Scale,
  Clock,
  Image,
  Award,
  BookOpen,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  onScoreEarned: (score: number) => void;
  onBack?: () => void;
  initialGameId?: ChallengeId;
}

export type ChallengeId =
  | 'affordance'
  | 'phishing'
  | 'process'
  | 'wcag'
  | 'wiso-duel'
  | 'wiso-fristen'
  | 'graphics-format';

export const ChapterChallengesView: React.FC<Props> = ({ onScoreEarned, onBack, initialGameId }) => {
  const [activeChallenge, setActiveChallenge] = useState<ChallengeId | null>(initialGameId || null);

  const challengesList = [
    {
      id: 'wiso-fristen' as const,
      title: 'WiSo-Fristen Drag & Drop Duell',
      desc: 'Ordnung muss sein: Ordne Kündigungsfristen, Klagefristen (§ 4 KSchG), Entgeltfortzahlung (§ 3 EntgFG) & JArbSchG-Regeln per Drag & Drop zu!',
      badge: 'Kapitel 10: BBiG & Arbeitsrecht',
      icon: Clock,
      xpBonus: '+35 EXP',
      colorBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
    },
    {
      id: 'wiso-duel' as const,
      title: 'WiSo-Paragraphen & Rechtsfall-Duell',
      desc: 'Probezeit, Kündigungsschutz, 100% AG-Unfallversicherung & GmbH-Recht: Entscheide IHK-Praxisfälle rechtssicher.',
      badge: 'Kapitel 10: WiSo Recht',
      icon: Scale,
      xpBonus: '+30 EXP',
      colorBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800',
    },
    {
      id: 'graphics-format' as const,
      title: 'Grafik-Format & Farbraum Sorter',
      desc: 'Vektor vs. Pixel, WebP/AVIF Kompression, eciRGBv2 vs CMYK FOGRA39: Treffe die korrekte Format- & Farbraum-Entscheidung!',
      badge: 'Kapitel 7 & 8: Bilddaten',
      icon: Image,
      xpBonus: '+30 EXP',
      colorBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800',
    },
    {
      id: 'affordance' as const,
      title: 'Affordance vs. Signifier Blitz-Duell',
      desc: 'Kann ich es anfassen/bedienen (Affordance) oder zeigt ein Signal die Richtung (Signifier)? Das #1 IHK-Prüfungsduell!',
      badge: 'Kapitel 1: IxD',
      icon: Sparkles,
      xpBonus: '+20 EXP',
      colorBg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    },
    {
      id: 'phishing' as const,
      title: 'Spot the Fake: Phishing- & Fake-Shop Detektiv',
      desc: 'Finde die verdächtigen roten Flaggen im gefälschten E-Mail- & Webshop-Szenario.',
      badge: 'Kapitel 4: Sicherheit',
      icon: ShieldAlert,
      xpBonus: '+25 EXP',
      colorBg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800',
    },
    {
      id: 'process' as const,
      title: 'Design-Ablauf Puzzle',
      desc: 'Bringe die 6 Phasen von der Anforderungsanalyse bis zum produktiven Code in die exakte Reihenfolge.',
      badge: 'Kapitel 2 & 6: Workflow',
      icon: Layers,
      xpBonus: '+20 EXP',
      colorBg: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-800',
    },
    {
      id: 'wcag' as const,
      title: 'WCAG POUR Zuordnungs-Arena',
      desc: 'Ordne Barrierefreiheits-Maßnahmen den 4 WCAG-Säulen Perceivable, Operable, Understandable und Robust zu.',
      badge: 'Kapitel 5: A11y',
      icon: CheckCircle2,
      xpBonus: '+20 EXP',
      colorBg: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-300 dark:border-teal-800',
    },
  ];

  if (activeChallenge) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveChallenge(null);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Kapitel-Challenges Übersicht</span>
        </button>

        {activeChallenge === 'wiso-fristen' && (
          <WisoFristenDragDropGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeChallenge === 'wiso-duel' && (
          <WisoDuelGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeChallenge === 'graphics-format' && (
          <GraphicsFormatGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeChallenge === 'affordance' && (
          <AffordanceSignifierGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeChallenge === 'phishing' && (
          <PhishingDetectorGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeChallenge === 'process' && (
          <ProcessSorterGame onComplete={score => onScoreEarned(score)} />
        )}

        {activeChallenge === 'wcag' && (
          <WcagMatchGame onComplete={score => onScoreEarned(score)} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Lernpfad</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7 shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Eigenständiger Lernbereich
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
            Kapitel-Challenges Hub
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-500" />
          Spezifische Kapitel-Challenges
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Gezieltes Vertiefungs-Training für jedes IHK-Prüfungsthema: Interaktive Fristen-Zuordnungen, Drag & Drop Aufgaben, Usability-Audits und Rechtsfall-Entscheidungen.
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challengesList.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.colorBg}`}>
                    {item.badge}
                  </span>
                  <Icon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Belohnung: {item.xpBonus}</span>
                </span>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveChallenge(item.id);
                  }}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Challenge starten
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
