import React, { useEffect } from 'react';
import { Chapter, ChecklistItem } from '../types/quiz';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import {
  X,
  BookOpen,
  Briefcase,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface Props {
  item: ChecklistItem;
  chapter: Chapter;
  bionic: boolean;
  onClose: () => void;
  onSelectModule: (chapterId: string, moduleId: string) => void;
}

export const ChecklistDetailModal: React.FC<Props> = ({
  item,
  chapter,
  bionic,
  onClose,
  onSelectModule,
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

  const info = item.moreInfo;
  const relatedModule = chapter.modules.find(m => m.id === info?.relatedModuleId) || chapter.modules[0];

  const handleGoToModule = () => {
    soundEffects.playClick();
    if (info?.relatedModuleId) {
      onSelectModule(chapter.id, info.relatedModuleId);
    } else if (relatedModule) {
      onSelectModule(chapter.id, relatedModule.id);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checklist-detail-title"
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
              <span>IHK-Prüfungsdossier</span>
            </div>
            <h3
              id="checklist-detail-title"
              className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              <BionicText text={item.task} enabled={bionic} />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <BionicText text={item.detail} enabled={bionic} />
            </p>
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
          {/* Sektion 1: IHK-Definition & Schlagwörter */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>1. IHK-Definition & Schlüsselbegriffe</span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <BionicText
                  text={info?.definition || item.detail}
                  enabled={bionic}
                />
              </p>

              {info?.keywords && info.keywords.length > 0 && (
                <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mr-1">
                    Schlüsselwörter:
                  </span>
                  {info.keywords.map((kw, i) => (
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

          {/* Sektion 2: Praxisbeispiel aus dem Agenturalltag */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>2. Praxisbeispiel aus dem Agenturalltag</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-0.5">
                  Projektsituation:
                </span>
                <p className="text-slate-800 dark:text-slate-200">
                  <BionicText
                    text={info?.practicalExample.context || 'Im Kundenprojekt muss die Anforderung nach IHK-Standard strukturiert werden.'}
                    enabled={bionic}
                  />
                </p>
              </div>

              <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/40">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-0.5">
                  Professionelle Umsetzung:
                </span>
                <p className="text-emerald-950 dark:text-emerald-100 font-medium">
                  <BionicText
                    text={info?.practicalExample.application || 'Anwendung der definierten Design- und Prozessrichtlinien zur Vermeidung von Usability-Reibungsverlusten.'}
                    enabled={bionic}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Sektion 3: Typische IHK-Prüfungsfrage & Musterantwort */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[11px]">
                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>3. Typische IHK-Prüfungsfrage & Musterlösung</span>
              </div>
              {info?.examQuestion.points && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {info.examQuestion.points} Punkte
                </span>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Aufgabenstellung:
                </span>
                <p className="italic">
                  „<BionicText text={info?.examQuestion.questionText || `Erläutern Sie anhand eines konkreten Beispiels die Bedeutung von "${item.task}" für die Gestaltung digitaler Medien.`} enabled={bionic} />“
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>IHK-Musterantwort (Vollpunktzahl):</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <BionicText
                    text={info?.examQuestion.sampleAnswer || 'Exakte Definition der Begriffe, Erläuterung der Relevanz für den Nutzer sowie Anführung eines nachvollziehbaren Praxisbeispiels aus dem Web-/Screen-Design.'}
                    enabled={bionic}
                  />
                </p>
              </div>

              {info?.examQuestion.scoringCriteria && info.examQuestion.scoringCriteria.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Bewertungsmaßstab der IHK-Prüfer:
                  </span>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-xs list-disc pl-4">
                    {info.examQuestion.scoringCriteria.map((crit, idx) => (
                      <li key={idx}>{crit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sektion 4: IHK-Prüfer-Warnung vor häufigen Denkfehlern */}
          <div className="pt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>4. IHK-Prüfer-Warnung (Typische Denkfehler)</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-950 dark:text-amber-200">
              <p className="leading-relaxed">
                <BionicText
                  text={info?.examinerWarning || 'Vorsicht vor Verwechslungen von Fachbegriffen. In Prüfungen führt die reine Nennung von Oberbegriffen ohne funktionale Begründung zu erheblichem Punktabzug.'}
                  enabled={bionic}
                />
              </p>
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

            <button
              onClick={handleGoToModule}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direkt zum Lernmodul</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
