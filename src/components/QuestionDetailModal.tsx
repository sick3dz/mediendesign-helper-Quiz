import React, { useEffect } from 'react';
import { QuizQuestion, QuizOption, Chapter } from '../types/quiz';
import { CHAPTERS } from '../data/chaptersData';
import { CHECKLIST_DOSSIERS, getChecklistDossier } from '../data/checklistDetailsData';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import {
  X,
  BookOpen,
  Briefcase,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  XCircle,
} from 'lucide-react';

interface Props {
  question: QuizQuestion;
  selectedOption: QuizOption | null;
  bionic: boolean;
  onClose: () => void;
  onNext?: () => void;
}

export const QuestionDetailModal: React.FC<Props> = ({
  question,
  selectedOption,
  bionic,
  onClose,
  onNext,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const correctOption = question.options.find(o => o.isCorrect);
  const chapter = CHAPTERS.find(c => c.id === question.chapterId) || CHAPTERS[0];

  // Try to find matching dossier from checklist or synthesize
  const questionTitleLower = question.question.toLowerCase();
  let dossier = getChecklistDossier(question.question, correctOption?.explanation || '', chapter.title, question.moduleId);

  for (const [key, d] of Object.entries(CHECKLIST_DOSSIERS)) {
    if (questionTitleLower.includes(key) || key.includes(question.chapterId)) {
      dossier = d;
      break;
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-detail-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-200 transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <span>Kapitel {chapter.number}: {chapter.title}</span>
              <span aria-hidden="true">·</span>
              <span>Ausführliche IHK-Hintergrundanalyse</span>
            </div>
            <h3
              id="question-detail-title"
              className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              <BionicText text={question.question} enabled={bionic} />
            </h3>
            {question.scenario && (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic bg-slate-100/70 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <BionicText text={question.scenario} enabled={bionic} />
              </p>
            )}
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Fenster schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed divide-y divide-slate-100 dark:divide-slate-800/80">
          {/* Sektion 1: Warum die falsche Antwort verlockend war (Fallenanalyse) */}
          {selectedOption && !selectedOption.isCorrect && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider text-[11px]">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>1. Warum war diese Antwort verlockend? (Fallenanalyse)</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="font-semibold text-rose-950 dark:text-rose-200">
                  <span className="text-[10px] font-bold text-rose-800 dark:text-rose-400 uppercase tracking-wider block mb-0.5">
                    Deine gewählte Option:
                  </span>
                  <p className="line-through opacity-85">
                    <BionicText text={selectedOption.text} enabled={bionic} />
                  </p>
                </div>

                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/40">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-0.5">
                    IHK-Fallen-Erklärung:
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <BionicText
                      text={selectedOption.trapExplanation || selectedOption.explanation}
                      enabled={bionic}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sektion 2: Fachlich korrekte IHK-Musterlösung */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{selectedOption && !selectedOption.isCorrect ? '2.' : '1.'} Fachlich korrekte IHK-Lösung</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2.5">
              <div className="text-emerald-950 dark:text-emerald-100 font-bold text-sm">
                <BionicText text={correctOption?.text || ''} enabled={bionic} />
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <BionicText text={correctOption?.explanation || ''} enabled={bionic} />
              </p>
            </div>
          </div>

          {/* Sektion 3: IHK-Definition & Schlüsselbegriffe */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>IHK-Definition & Schlüsselbegriffe</span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <BionicText text={dossier.definition} enabled={bionic} />
              </p>

              {dossier.keywords && dossier.keywords.length > 0 && (
                <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mr-1">
                    Schlüsselwörter:
                  </span>
                  {dossier.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 text-[11px] font-semibold"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sektion 4: Praxisbeispiel aus dem Agenturalltag */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Praxisbeispiel aus dem Agenturalltag</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <div>
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-0.5">
                  Situation im Alltag:
                </span>
                <p className="text-slate-800 dark:text-slate-200">
                  <BionicText
                    text={dossier.practicalExample?.context || 'Im Kundenprojekt muss die Anforderung nach IHK-Standard strukturiert werden.'}
                    enabled={bionic}
                  />
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-0.5">
                  Fachgerechte Lösung:
                </span>
                <p className="text-amber-950 dark:text-amber-100 font-medium">
                  <BionicText
                    text={dossier.practicalExample?.application || 'Anwendung der definierten Design- und Prozessrichtlinien zur Vermeidung von Usability-Reibungsverlusten.'}
                    enabled={bionic}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Sektion 5: IHK-Prüfer-Warnung & Merksatz */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider text-[11px]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>IHK-Prüfer-Warnung & Merksatz</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200 space-y-2">
              <p className="leading-relaxed">
                <BionicText
                  text={question.examTip || dossier.examinerWarning}
                  enabled={bionic}
                />
              </p>

              {(question.merksatz || chapter.examMerksatz) && (
                <div className="pt-2 border-t border-rose-200 dark:border-rose-900/40 flex items-start gap-1.5 text-rose-900 dark:text-rose-100 font-bold">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <span>Merksatz: "{question.merksatz || chapter.examMerksatz}"</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 hidden sm:block">
            Drücke <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px] text-slate-600 dark:text-slate-300">ESC</kbd> zum Schließen
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Schließen
            </button>

            {onNext && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                  onNext();
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
              >
                <span>Verstanden & Weiter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
