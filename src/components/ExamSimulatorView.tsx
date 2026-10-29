import React, { useState, useEffect } from 'react';
import { EXAM_QUESTIONS, calculateIhkGrade } from '../data/examQuestions';
import { QuizOption } from '../types/quiz';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Award, Check, X, ArrowLeft, ArrowRight, RotateCcw, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  bionic: boolean;
  onExamCompleted: (result: { score: number; total: number; percentage: number; grade: string }) => void;
  onGoToChapter: (chapterId: string) => void;
  onBack: () => void;
}

export const ExamSimulatorView: React.FC<Props> = ({ bionic, onExamCompleted, onGoToChapter, onBack }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [selectedInCurrent, setSelectedInCurrent] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (hasStarted && !isFinished) {
      interval = setInterval(() => {
        setSecondsElapsed(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasStarted, isFinished]);

  const currentQ = EXAM_QUESTIONS[currentIndex];

  const handleSelect = (opt: QuizOption) => {
    if (selectedInCurrent !== null) return;
    setSelectedInCurrent(opt.id);
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: opt.id }));
    if (opt.isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }
  };

  const handleNext = () => {
    soundEffects.playClick();
    setSelectedInCurrent(null);

    if (currentIndex + 1 < EXAM_QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    setIsFinished(true);

    let correctCount = 0;
    EXAM_QUESTIONS.forEach(q => {
      const chosenOpt = q.options.find(o => o.id === userAnswers[q.id]);
      if (chosenOpt?.isCorrect) correctCount++;
    });

    const percentage = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
    const gradeInfo = calculateIhkGrade(percentage);

    if (gradeInfo.passed) {
      soundEffects.playLevelUp();
      confetti({ particleCount: 100, spread: 80 });
    } else {
      soundEffects.playWrong();
    }

    onExamCompleted({
      score: correctCount,
      total: EXAM_QUESTIONS.length,
      percentage,
      grade: gradeInfo.grade,
    });
  };

  const restartExam = () => {
    setHasStarted(true);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedInCurrent(null);
    setIsFinished(false);
    setSecondsElapsed(0);
    setShowExitConfirm(false);
  };

  // Welcome / Intro screen
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kapitelübersicht</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs text-center space-y-6 transition-colors">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Offizieller Prüfungs-Simulator
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Mediengestalter Abschlussprüfung: Designkonzeption
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {EXAM_QUESTIONS.length} originalgetreue Fragen zu Interaktionsdesign, Wireframing, Prototyping, IT-Sicherheit, Barrierefreiheit (WCAG), Scrum, SQL/JSON und medienneutralen Daten (IHK-Schwerpunkt Winter 2026/27).
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-mono text-base">{EXAM_QUESTIONS.length}</div>
              <div className="text-slate-500 dark:text-slate-400">Prüfungsfragen</div>
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-mono text-base">IHK</div>
              <div className="text-slate-500 dark:text-slate-400">Notenschlüssel</div>
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-mono text-base">+300</div>
              <div className="text-slate-500 dark:text-slate-400">EXP Bonus</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                setHasStarted(true);
              }}
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Prüfungssimulation jetzt starten
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Abbrechen & Zurück
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (isFinished) {
    let correctCount = 0;
    EXAM_QUESTIONS.forEach(q => {
      const chosen = q.options.find(o => o.id === userAnswers[q.id]);
      if (chosen?.isCorrect) correctCount++;
    });

    const percentage = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
    const gradeInfo = calculateIhkGrade(percentage);
    const mins = Math.floor(secondsElapsed / 60);
    const secs = secondsElapsed % 60;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kapitelübersicht</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-xs transition-colors">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            gradeInfo.passed ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
          }`}>
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            Note {gradeInfo.grade} ({gradeInfo.text})
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            {gradeInfo.passed
              ? 'Herzlichen Glückwunsch! Du hast die Prüfungssimulation bestanden.'
              : 'Knapp verfehlt – nutze die Detailauswertung unten zur gezielten Wiederholung.'}
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs mb-6">
            <div>
              <div className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {correctCount} / {EXAM_QUESTIONS.length}
              </div>
              <div className="text-slate-500 dark:text-slate-400">Richtig</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {percentage}%
              </div>
              <div className="text-slate-500 dark:text-slate-400">Erreicht</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </div>
              <div className="text-slate-500 dark:text-slate-400">Dauer</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Kapitelübersicht
            </button>
            <button
              onClick={restartExam}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Simulation wiederholen
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
          <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Detaillierte Prüfungsauswertung
          </h3>

          <div className="space-y-4">
            {EXAM_QUESTIONS.map((q, idx) => {
              const chosenId = userAnswers[q.id];
              const chosenOpt = q.options.find(o => o.id === chosenId);
              const correctOpt = q.options.find(o => o.isCorrect);
              const isCorrect = chosenOpt?.isCorrect;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs ${
                    isCorrect
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-slate-800 dark:text-slate-200'
                      : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-500 dark:text-slate-400">#{idx + 1}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{q.question}</span>
                    </div>
                    {isCorrect ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                        <Check className="w-4 h-4" /> Richtig
                      </span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1 shrink-0">
                        <X className="w-4 h-4" /> Falsch
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mt-2 text-slate-600 dark:text-slate-300">
                    <p>
                      <span className="font-semibold text-slate-500 dark:text-slate-400">Deine Antwort:</span> {chosenOpt?.text || 'Keine'}
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                        <span className="font-semibold text-emerald-900 dark:text-emerald-200">Richtige Antwort:</span> {correctOpt?.text}
                      </p>
                    )}
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1">
                      {correctOpt?.explanation}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                      Thema: {q.chapterId}
                    </span>
                    <button
                      onClick={() => onGoToChapter(q.chapterId)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      <span>Kapitel aufrufen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Runner
  const mins = Math.floor(secondsElapsed / 60);
  const secs = secondsElapsed % 60;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Prüfungssimulation abbrechen?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Möchtest du die Simulation wirklich beenden und zur Übersicht zurückkehren? Dein aktueller Fortschritt dieser Runde (Frage {currentIndex + 1} von {EXAM_QUESTIONS.length}) wird nicht gewertet.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Weiterprüfen
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onBack();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
              >
                Ja, abbrechen & zurück
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Exam Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition-colors cursor-pointer"
              title="Prüfungssimulation abbrechen und zur Übersicht zurückkehren"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Abbrechen & Zurück</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              FRAGE {currentIndex + 1} / {EXAM_QUESTIONS.length}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400 uppercase font-semibold">{currentQ.chapterId}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
            <BionicText text={currentQ.question} enabled={bionic} />
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedInCurrent === opt.id;
            const isRevealed = selectedInCurrent !== null;

            let btnClass = 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-800 dark:text-slate-200';

            if (isRevealed) {
              if (opt.isCorrect) {
                btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold';
              } else if (isSelected && !opt.isCorrect) {
                btnClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200';
              } else {
                btnClass = 'bg-slate-50/60 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={isRevealed}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                    isRevealed && opt.isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isRevealed && isSelected && !opt.isCorrect
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm">
                    <BionicText text={opt.text} enabled={bionic} />
                  </span>
                </div>

                {isRevealed && opt.isCorrect && (
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {isRevealed && isSelected && !opt.isCorrect && (
                  <X className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate feedback & explanation */}
        {selectedInCurrent && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-white mb-1">
              {currentQ.options.find(o => o.id === selectedInCurrent)?.isCorrect ? '✓ Richtig beantwortet!' : '✗ Leider falsch.'}
            </div>
            <p>{currentQ.options.find(o => o.isCorrect)?.explanation}</p>
            {currentQ.merksatz && (
              <p className="mt-2 text-indigo-700 dark:text-indigo-400 font-semibold italic text-[11px]">
                "{currentQ.merksatz}"
              </p>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </button>

          {selectedInCurrent && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto"
            >
              <span>{currentIndex + 1 < EXAM_QUESTIONS.length ? 'Nächste Frage' : 'Prüfung abschließen'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
