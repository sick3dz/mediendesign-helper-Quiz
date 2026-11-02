import React from 'react';
import { LearningModule } from '../types/quiz';
import { BionicText } from '../utils/bionicReading';
import { 
  BookOpen, 
  CheckCircle2, 
  Star, 
  X, 
  Lightbulb, 
  Sparkles, 
  ArrowRight,
  RotateCcw,
  Award
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface Props {
  module: LearningModule;
  chapterTitle?: string;
  chapterNumber?: number;
  bionic?: boolean;
  isLevel1Completed?: boolean;
  isLevel2Completed?: boolean;
  onClose: () => void;
  onStartLevel2?: () => void;
  onRepeatLevel1?: () => void;
  onNextModule?: () => void;
  hasNextModule?: boolean;
}

export const ModuleSummaryModal: React.FC<Props> = ({
  module,
  chapterTitle,
  chapterNumber,
  bionic = false,
  isLevel1Completed = false,
  isLevel2Completed = false,
  onClose,
  onStartLevel2,
  onRepeatLevel1,
  onNextModule,
  hasNextModule = false,
}) => {
  // Collect all exam tips and merksätze across nuggets & questions
  const allMerksaetze: string[] = [];
  module.nuggets.forEach(n => {
    if (n.merksatz) allMerksaetze.push(n.merksatz);
  });
  module.quizQuestions.forEach(q => {
    if (q.merksatz && !allMerksaetze.includes(q.merksatz)) {
      allMerksaetze.push(q.merksatz);
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="summary-title"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="p-2.5 bg-indigo-600/30 border border-indigo-400/30 rounded-xl text-indigo-300 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
                  {chapterNumber ? `Kapitel ${chapterNumber}` : 'Modul'} • Wissens-Zusammenfassung
                </span>
                {isLevel2Completed ? (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-slate-950" /> Level 2 Meister
                  </span>
                ) : isLevel1Completed ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[9px] flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Level 1 Erledigt
                  </span>
                ) : null}
              </div>
              <h3 id="summary-title" className="text-base sm:text-lg font-bold text-white truncate mt-0.5">
                {module.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left flex-1">
          {/* Overview Banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <BionicText text={module.shortDesc} enabled={bionic} />
          </div>

          {/* Exam Merksätze Banner if available */}
          {allMerksaetze.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Wichtigste IHK-Prüfungs-Merksätze</span>
              </div>
              <ul className="space-y-1.5 pt-1">
                {allMerksaetze.map((m, idx) => (
                  <li key={idx} className="text-xs font-bold text-amber-950 dark:text-amber-100 flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">•</span>
                    <span className="italic leading-snug">"{m}"</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nuggets Detail Summary List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Kernpunkte des Moduls ({module.nuggets.length} Lerneinheiten)</span>
            </h4>

            <div className="space-y-3">
              {module.nuggets.map((nugget, index) => (
                <div 
                  key={nugget.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-mono text-[11px] shrink-0">
                      {index + 1}
                    </span>
                    <span><BionicText text={nugget.title} enabled={bionic} /></span>
                  </div>

                  <p className="text-xs text-indigo-900 dark:text-indigo-200 bg-indigo-50/70 dark:bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40 font-semibold leading-relaxed">
                    <BionicText text={nugget.coreConcept} enabled={bionic} />
                  </p>

                  <ul className="space-y-1.5 pt-1 text-xs text-slate-700 dark:text-slate-300">
                    {nugget.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                        <span className="leading-relaxed"><BionicText text={bp} enabled={bionic} /></span>
                      </li>
                    ))}
                  </ul>

                  {nugget.example && (
                    <div className="pt-2 text-[11px] text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      <strong className="not-italic text-indigo-600 dark:text-indigo-400">Praxis: </strong>
                      <BionicText text={nugget.example} enabled={bionic} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="order-3 sm:order-1 w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer text-center"
          >
            Schließen / Übersicht
          </button>

          <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {/* Level repeat and level 2 buttons */}
            {(onRepeatLevel1 || onStartLevel2) && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onRepeatLevel1 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      onRepeatLevel1();
                    }}
                    className="flex-1 sm:flex-initial px-3 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Level 1</span>
                  </button>
                )}

                {onStartLevel2 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      onStartLevel2();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>Level 2</span>
                  </button>
                )}
              </div>
            )}

            {/* Primary Next Module Button */}
            {hasNextModule && onNextModule && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onNextModule();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Nächstes Modul</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
