import React, { useState } from 'react';
import { FREETEXT_QUESTIONS, FreetextQuestion } from '../data/freetextQuestions';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen,
  Check,
  HelpCircle,
  Send,
  Star,
} from 'lucide-react';

interface Props {
  onScoreEarned: (score: number) => void;
  onBack?: () => void;
}

interface EvaluationResult {
  score: number;
  maxPoints: number;
  percentage: number;
  foundKeywords: string[];
  missingKeywords: string[];
  feedbackText: string;
}

export const FreetextTrainerQuizView: React.FC<Props> = ({ onScoreEarned, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: FreetextQuestion = FREETEXT_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / FREETEXT_QUESTIONS.length) * 100);

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim() || isEvaluating) return;
    soundEffects.playClick();
    setIsEvaluating(true);

    setTimeout(() => {
      const lowerAnswer = userAnswer.toLowerCase();
      const found: string[] = [];
      const missing: string[] = [];

      currentQ.requiredKeywords.forEach(kw => {
        if (lowerAnswer.includes(kw.toLowerCase())) {
          found.push(kw);
        } else {
          missing.push(kw);
        }
      });

      // Calculate score based on keyword match ratio
      const ratio = currentQ.requiredKeywords.length > 0 
        ? found.length / currentQ.requiredKeywords.length 
        : 1;

      // Ensure minimum points if user wrote a substantial answer (> 30 words)
      const wordCount = userAnswer.trim().split(/\s+/).length;
      let calculatedPoints = Math.round(currentQ.maxPoints * ratio);
      if (wordCount >= 25 && calculatedPoints < Math.round(currentQ.maxPoints * 0.4)) {
        calculatedPoints = Math.round(currentQ.maxPoints * 0.4);
      }
      if (found.length === currentQ.requiredKeywords.length) {
        calculatedPoints = currentQ.maxPoints;
      }

      const percentage = Math.round((calculatedPoints / currentQ.maxPoints) * 100);

      let feedback = '';
      if (percentage >= 80) {
        feedback = 'Hervorragende IHK-Antwort! Du hast alle wichtigen Fachbegriffe und Kernkonzepte präzise erläutert.';
      } else if (percentage >= 50) {
        feedback = 'Gute Ansätze! Dir fehlen noch einige wichtige Fachbegriffe, um die volle Punktzahl zu erreichen.';
      } else {
        feedback = 'Ausbaufähig. Vergleiche deine Antwort mit der offiziellen IHK-Musterlösung unten.';
      }

      const result: EvaluationResult = {
        score: calculatedPoints,
        maxPoints: currentQ.maxPoints,
        percentage,
        foundKeywords: found,
        missingKeywords: missing,
        feedbackText: feedback,
      };

      setEvaluation(result);
      setIsEvaluating(false);
      soundEffects.playSuccess();
      setTotalScore(s => s + calculatedPoints);
      setCompletedCount(c => c + 1);
    }, 600);
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    setUserAnswer('');
    setEvaluation(null);

    if (currentIndex + 1 < FREETEXT_QUESTIONS.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      onScoreEarned(40);
    }
  };

  const handleRestart = () => {
    soundEffects.playClick();
    setCurrentIndex(0);
    setUserAnswer('');
    setEvaluation(null);
    setTotalScore(0);
    setCompletedCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const maxPossible = FREETEXT_QUESTIONS.reduce((acc, q) => acc + q.maxPoints, 0);
    const overallPct = Math.round((totalScore / maxPossible) * 100);

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Freitext-Trainer Abgeschlossen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Prüfungsvorbereitung gemeistert!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              Du hast alle Freitext-Aufgaben bearbeitet und deine Argumentationssicherheit für die IHK-Abschlussprüfung trainiert.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">Punkte</div>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {totalScore} / {maxPossible}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">Erfolg</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {overallPct}%
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">Belohnung</div>
              <div className="text-xl font-black text-amber-500 font-mono flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-500" />
                <span>+40 EXP</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Trainer wiederholen</span>
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Zurück zur Übersicht</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 rounded-lg text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>IHK Freitext-Trainer</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Aufgabe <strong className="text-slate-900 dark:text-white font-mono">{currentIndex + 1}</strong> von {FREETEXT_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {currentQ.category}
          </span>
          <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-300 text-xs font-black">
            Max. {currentQ.maxPoints} Punkte
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {currentQ.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-2 font-medium leading-relaxed">
            {currentQ.question}
          </p>
        </div>

        {/* Hint Box */}
        <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">Prüfungs-Tipp:</strong>
            {currentQ.hint}
          </div>
        </div>

        {/* Answer Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Deine Antwort (Erläuterung / Ausarbeitung):</span>
            <span className="font-mono">{wordCount} Wörter</span>
          </div>

          <textarea
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            disabled={evaluation !== null}
            placeholder="Schreibe hier deine ausführliche Erläuterung im IHK-Stil (z.B. Definition, Fachbegriffe, Anwendungsbeispiel)..."
            rows={7}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-75 leading-relaxed"
          />
        </div>

        {/* Evaluate Button */}
        {evaluation === null && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleEvaluateAnswer}
              disabled={!userAnswer.trim() || isEvaluating}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isEvaluating ? 'Hybrider Abgleich läuft...' : 'Antwort einreichen & auswerten'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Evaluation Results & Model Answer */}
        {evaluation !== null && (
          <div className="space-y-5 animate-in fade-in duration-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Score Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              evaluation.percentage >= 85
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : evaluation.percentage >= 50
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            }`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">Auswertungsergebnis</span>
                <h4 className="text-lg font-black mt-0.5">{evaluation.score} von {evaluation.maxPoints} Punkten ({evaluation.percentage}%)</h4>
                <p className="text-xs mt-1 font-medium">{evaluation.feedbackText}</p>
              </div>
              <div className="text-3xl font-black font-mono">
                {evaluation.percentage >= 80 ? '🏆' : evaluation.percentage >= 50 ? '👍' : '⚠️'}
              </div>
            </div>

            {/* Keyword Match Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Schlagwort-Abgleich (Pflichtbegriffe)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentQ.requiredKeywords.map(kw => {
                  const isFound = evaluation.foundKeywords.includes(kw);
                  return (
                    <div key={kw} className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 font-medium ${
                      isFound 
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' 
                        : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                    }`}>
                      {isFound ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      <span className="capitalize">{kw}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official IHK Model Answer */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Offizielle IHK-Musterlösung</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {currentQ.modelAnswer}
              </p>
            </div>

            {/* Next Question Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>{currentIndex + 1 < FREETEXT_QUESTIONS.length ? 'Nächste Aufgabe' : 'Ergebnis anzeigen'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
