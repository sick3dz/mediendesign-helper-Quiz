import React, { useState, useEffect, useMemo } from 'react';
import { EXAM_QUESTIONS, IHK_EXAM_SCENARIOS, calculateIhkGrade, IhkExamScenario } from '../data/examQuestions';
import { QuizOption, QuizQuestion } from '../types/quiz';
import { BionicText } from '../utils/bionicReading';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Award, Check, X, ArrowLeft, ArrowRight, RotateCcw, Clock, AlertTriangle, ShieldCheck, Flag, Sparkles, BookOpen, Building2, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { QuestionDetailModal } from './QuestionDetailModal';
import { QuestionAssetWidget } from './QuestionAssetWidget';

interface Props {
  bionic: boolean;
  onExamCompleted: (result: { score: number; total: number; percentage: number; grade: string }) => void;
  onAnswer?: (questionId: string, isCorrect: boolean) => void;
  onGoToChapter: (chapterId: string) => void;
  onBack: () => void;
}

export const ExamSimulatorView: React.FC<Props> = ({ bionic, onExamCompleted, onAnswer, onGoToChapter, onBack }) => {
  // Modes: 'selection' | 'real_exam' | 'topic_practice'
  const [mode, setMode] = useState<'selection' | 'real_exam' | 'topic_practice'>('selection');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Active Exam state
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentQuestionInScenarioIndex, setCurrentQuestionInScenarioIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [qId: string]: boolean }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(90 * 60); // 90 minutes real IHK exam
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [detailModalQuestion, setDetailModalQuestion] = useState<{ question: QuizQuestion; selectedOption: QuizOption | null } | null>(null);

  // Scenarios list
  const activeScenarios = useMemo(() => {
    if (mode === 'topic_practice' && selectedTopicId) {
      return IHK_EXAM_SCENARIOS.filter((s) => s.id === selectedTopicId);
    }
    return IHK_EXAM_SCENARIOS;
  }, [mode, selectedTopicId]);

  const currentScenario = activeScenarios[currentScenarioIndex] || activeScenarios[0];

  // Questions in current active scenario
  const scenarioQuestions = useMemo(() => {
    if (!currentScenario) return [];
    return EXAM_QUESTIONS.filter((q) => currentScenario.questionIds.includes(q.id));
  }, [currentScenario]);

  const currentQuestion = scenarioQuestions[currentQuestionInScenarioIndex] || scenarioQuestions[0];

  // Timer for 90-minute real IHK mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mode === 'real_exam' && !isFinished) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => {
          if (sec <= 1) {
            clearInterval(interval!);
            finishExam();
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode, isFinished]);

  const handleSelectAnswer = (optionId: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));

    const selectedOpt = currentQuestion.options.find((o) => o.id === optionId);
    if (selectedOpt?.isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
    }

    if (onAnswer && selectedOpt) {
      onAnswer(currentQuestion.id, selectedOpt.isCorrect);
    }
  };

  const toggleFlag = (qId: string) => {
    soundEffects.playClick();
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleNextSubquestion = () => {
    soundEffects.playClick();
    if (currentQuestionInScenarioIndex + 1 < scenarioQuestions.length) {
      setCurrentQuestionInScenarioIndex((i) => i + 1);
    } else if (currentScenarioIndex + 1 < activeScenarios.length) {
      setCurrentScenarioIndex((s) => s + 1);
      setCurrentQuestionInScenarioIndex(0);
    } else {
      setShowSubmitModal(true);
    }
  };

  const handlePrevSubquestion = () => {
    soundEffects.playClick();
    if (currentQuestionInScenarioIndex > 0) {
      setCurrentQuestionInScenarioIndex((i) => i - 1);
    } else if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex((s) => s - 1);
      const prevQuestions = EXAM_QUESTIONS.filter((q) => activeScenarios[currentScenarioIndex - 1].questionIds.includes(q.id));
      setCurrentQuestionInScenarioIndex(prevQuestions.length - 1);
    }
  };

  const finishExam = () => {
    setShowSubmitModal(false);
    setIsFinished(true);

    let totalPointsEarned = 0;
    let totalMaxPoints = 100;

    activeScenarios.forEach((scen: IhkExamScenario) => {
      const qList = EXAM_QUESTIONS.filter((q: QuizQuestion) => scen.questionIds.includes(q.id));
      let scenCorrect = 0;
      qList.forEach((q: QuizQuestion) => {
        const chosen = q.options.find((o: QuizOption) => o.id === userAnswers[q.id]);
        if (chosen?.isCorrect) scenCorrect++;
      });
      const ratio = qList.length > 0 ? scenCorrect / qList.length : 0;
      totalPointsEarned += Math.round(ratio * scen.points);
    });

    const percentage = Math.round((totalPointsEarned / totalMaxPoints) * 100);
    const gradeInfo = calculateIhkGrade(percentage);

    if (gradeInfo.passed) {
      soundEffects.playLevelUp();
      confetti({ particleCount: 120, spread: 80 });
    } else {
      soundEffects.playWrong();
    }

    onExamCompleted({
      score: totalPointsEarned,
      total: totalMaxPoints,
      percentage,
      grade: gradeInfo.grade,
    });
  };

  const restartExam = () => {
    setMode('selection');
    setCurrentScenarioIndex(0);
    setCurrentQuestionInScenarioIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setIsFinished(false);
    setSecondsRemaining(90 * 60);
    setShowSubmitModal(false);
  };

  // Render 1: Mode Selection Screen
  if (mode === 'selection') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
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

        {/* Hero Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shrink-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Offizieller Prüfungs-Simulator (Mediengestalter 2026)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                IHK Abschlussprüfung: Designkonzeption & PM
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Strukturierte Prüfungsaufgaben nach IHK-Standard über alle 12 Fachkapitel. Wähle zwischen der realen 90-Minuten-Prüfung oder gezielten Themen-Happen.
              </p>
            </div>
          </div>

          {/* Mode Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Mode 1: Real IHK Exam */}
            <div
              onClick={() => {
                soundEffects.playClick();
                setMode('real_exam');
                setSecondsRemaining(90 * 60);
              }}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border-2 border-indigo-500/50 hover:border-indigo-400 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold uppercase">
                  Offizielles Format
                </span>
                <Clock className="w-5 h-5 text-indigo-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors flex items-center gap-2">
                  <span>⚡ Reale IHK-Abschlussprüfung</span>
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  90 Minuten Zeitlimit, 100 Punkte Gesamtskala über 10 Firmen-Szenarios. Beantwortung aller Hauptaufgaben mit Notenspiegel am Ende.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-indigo-900/80 text-[11px] font-mono text-indigo-200">
                <div>⏱️ 90 Min.</div>
                <div>💯 100 Pkt.</div>
                <div>📋 10 Szenarios</div>
              </div>

              <div className="w-full py-2.5 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-bold text-center transition-colors shadow-xs">
                Prüfungssimulation jetzt starten ➔
              </div>
            </div>

            {/* Mode 2: Topic Practice */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 text-slate-900 dark:text-white shadow-md hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-bold uppercase">
                  Gezieltes Training
                </span>
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🎯 Freies Themen-Happen Üben</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Übe einzelne IHK-Aufgabenblöcke ohne Zeitdruck mit sofortiger Auswertung und ausführlichen Prüfer-Erklärungen.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 max-h-[160px] overflow-y-auto pr-1">
                {IHK_EXAM_SCENARIOS.map((scen) => (
                  <button
                    key={scen.id}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedTopicId(scen.id);
                      setMode('topic_practice');
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/60 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 text-left text-xs font-medium transition-all flex items-center justify-between group/btn cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover/btn:text-indigo-600 dark:group-hover/btn:text-indigo-400 truncate">
                      {scen.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render 3: Exam Finished / Results Certificate Screen
  if (isFinished) {
    let totalEarned = 0;
    const totalMax = 100;

    const scenarioResults = activeScenarios.map((scen: IhkExamScenario) => {
      const qList = EXAM_QUESTIONS.filter((q: QuizQuestion) => scen.questionIds.includes(q.id));
      let correct = 0;
      qList.forEach((q: QuizQuestion) => {
        const chosen = q.options.find((o: QuizOption) => o.id === userAnswers[q.id]);
        if (chosen?.isCorrect) correct++;
      });
      const ratio = qList.length > 0 ? correct / qList.length : 0;
      const pts = Math.round(ratio * scen.points);
      totalEarned += pts;
      return { scen, pts, maxPts: scen.points, qList, correct };
    });

    const percentage = Math.round((totalEarned / totalMax) * 100);
    const gradeInfo = calculateIhkGrade(percentage);

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={restartExam}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Prüfungsauswahl</span>
          </button>
        </div>

        {/* Certificate Card */}
        <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              OFFIZIELLES IHK-PRÜFUNGSZERTIFIKAT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Note {gradeInfo.grade} · {gradeInfo.text}
            </h2>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-2 max-w-lg mx-auto">
              {gradeInfo.passed
                ? 'Glückwunsch! Du hast die simulierte IHK-Abschlussprüfung bestanden.'
                : 'Knapp verfehlt. Nutze die detaillierte Themenanalyse unten zur gezielten Wiederholung.'}
            </p>
          </div>

          {/* Key Score Board */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div className="p-2">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">Gesamtpunkte:</span>
              <span className="font-mono text-xl font-extrabold text-slate-900 dark:text-white">{totalEarned} / {totalMax}</span>
            </div>
            <div className="p-2">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">Erreichte Quote:</span>
              <span className={`font-mono text-xl font-extrabold ${gradeInfo.color}`}>{percentage}%</span>
            </div>
            <div className="p-2">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">IHK-Notenschlüssel:</span>
              <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{gradeInfo.pointsRange}</span>
            </div>
            <div className="p-2">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">Status:</span>
              <span className={`font-bold text-xs ${gradeInfo.passed ? 'text-emerald-500' : 'text-rose-500'}`}>
                {gradeInfo.passed ? '✓ BESTANDEN' : '✕ NICHT BESTANDEN'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={restartExam}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Prüfung erneut simulieren</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Zurück zum Hauptmenü
            </button>
          </div>
        </div>

        {/* Detailed Topic Breakdown (10 Hauptaufgaben) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Ergebnisaufschlüsselung nach den 10 IHK-Hauptaufgaben:
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {scenarioResults.map(({ scen, pts, maxPts, qList, correct }) => {
              const scenPct = Math.round((pts / maxPts) * 100);
              const isPass = scenPct >= 50;

              return (
                <div
                  key={scen.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                        {scen.title}
                      </span>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        {scen.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-white">
                        {pts} / {maxPts} Pkt. ({scenPct}%)
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                        isPass
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                      }`}>
                        {isPass ? '✓ Erfüllt' : '✕ Nacharbeit'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isPass ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${scenPct}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    Firmenszenario: "{scen.companyContext}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render 2: Active Exam Runner Interface (Real Exam & Practice Mode)
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isTimeWarning = secondsRemaining < 15 * 60;
  const isTimeDanger = secondsRemaining < 5 * 60;

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
      {/* Sticky Exam Top Bar */}
      <div className="sticky top-2 z-40 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            title="Prüfung abbrechen"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
              IHK SIMULATOR · HAUPTAUFGABE {currentScenarioIndex + 1} / {activeScenarios.length}
            </span>
            <span className="text-xs font-bold text-white line-clamp-1">
              {currentScenario?.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Real 90-Min Timer */}
          {mode === 'real_exam' && (
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              isTimeDanger
                ? 'bg-rose-950 text-rose-300 border-rose-600 animate-pulse'
                : isTimeWarning
                ? 'bg-amber-950 text-amber-300 border-amber-600'
                : 'bg-slate-800 text-slate-200 border-slate-700'
            }`}>
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
          )}

          {/* Flag Question Button */}
          <button
            onClick={() => toggleFlag(currentQuestion?.id || '')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              flaggedQuestions[currentQuestion?.id || '']
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Später prüfen</span>
          </button>

          {/* Submit Exam Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Prüfung abgeben
          </button>
        </div>

        {/* Quick Navigation Grid Bar (1 to 10 Hauptaufgaben) */}
        <div className="w-full pt-2 border-t border-slate-800 flex items-center justify-between gap-1.5 overflow-x-auto">
          {activeScenarios.map((scen: IhkExamScenario, idx: number) => {
            const scenQuestions = EXAM_QUESTIONS.filter((q: QuizQuestion) => scen.questionIds.includes(q.id));
            const answeredCount = scenQuestions.filter((q: QuizQuestion) => !!userAnswers[q.id]).length;
            const isAllAnswered = answeredCount === scenQuestions.length && scenQuestions.length > 0;
            const hasFlag = scenQuestions.some((q: QuizQuestion) => flaggedQuestions[q.id]);
            const isCurrent = idx === currentScenarioIndex;

            return (
              <button
                key={scen.id}
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentScenarioIndex(idx);
                  setCurrentQuestionInScenarioIndex(0);
                }}
                className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/50'
                    : isAllAnswered
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                    : hasFlag
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <span>H{scen.scenarioNumber}</span>
                {hasFlag && <Flag className="w-3 h-3 text-amber-400 fill-amber-400" />}
                {isAllAnswered && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Firmen-Ausgangssituation Briefing Card */}
      {currentScenario && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>IHK-Firmenausgangssituation:</span>
            </span>
            <span className="text-xs font-mono font-bold bg-indigo-950 text-indigo-300 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              {currentScenario.points} Punkte
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            "{currentScenario.companyContext}"
          </p>
        </div>
      )}

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              Teilaufgabe {currentQuestionInScenarioIndex + 1} von {scenarioQuestions.length}
            </span>
            {flaggedQuestions[currentQuestion.id] && (
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                <Flag className="w-3.5 h-3.5 fill-amber-500" />
                <span>Markiert für Überprüfung</span>
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed">
            <BionicText text={currentQuestion.question} enabled={bionic} />
          </h3>

          {/* Asset Rendering if Question has Asset */}
          {currentQuestion.asset && (
            <div className="my-2">
              <QuestionAssetWidget asset={currentQuestion.asset} />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt: QuizOption) => {
              const isSelected = userAnswers[currentQuestion.id] === opt.id;
              const isPracticeMode = mode === 'topic_practice';

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? isPracticeMode
                        ? opt.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/40 font-semibold'
                          : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/40 font-semibold'
                        : 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/40 font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? isPracticeMode && opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : isPracticeMode && !opt.isCorrect
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-indigo-500 bg-indigo-500 text-white'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div className="space-y-1">
                    <span className="block font-medium">
                      <BionicText text={opt.text} enabled={bionic} />
                    </span>

                    {/* Instant Feedback in Practice Mode */}
                    {isPracticeMode && isSelected && (
                      <p className={`text-xs mt-2 p-2.5 rounded-lg border font-medium ${
                        opt.isCorrect
                          ? 'bg-emerald-100/70 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-100/70 dark:bg-rose-900/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      }`}>
                        💡 <strong>Erklärung:</strong> {opt.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handlePrevSubquestion}
              disabled={currentScenarioIndex === 0 && currentQuestionInScenarioIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>

            <button
              onClick={handleNextSubquestion}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Nächste Aufgabe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Prüfung wirklich abbrechen?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Dein bisheriger Prüfungsfortschritt und Timer werden zurückgesetzt.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Weiterprüfen
              </button>
              <button
                onClick={restartExam}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Ja, Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Prüfungssimulation jetzt abgeben?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Du hast alle 10 IHK-Hauptaufgaben bearbeitet. Deine Antworten werden ausgewertet und mit dem IHK-Notenschlüssel verrechnet.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Nochmal kontrollieren
              </button>
              <button
                onClick={finishExam}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs"
              >
                Jetzt Abgeben & Auswerten ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
