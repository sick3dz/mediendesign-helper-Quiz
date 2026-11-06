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
  LayoutGrid,
  Clock,
  CheckSquare,
} from 'lucide-react';

interface Props {
  onScoreEarned: (score: number) => void;
  onBack?: () => void;
}

interface QuestionProgress {
  [questionId: string]: {
    userAnswer: string;
    score: number;
    maxPoints: number;
    percentage: number;
    foundKeywords: string[];
    missingKeywords: string[];
    isEvaluated: boolean;
  };
}

export const FreetextTrainerQuizView: React.FC<Props> = ({ onScoreEarned, onBack }) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [progress, setProgress] = useState<QuestionProgress>({});
  const [currentAnswerInput, setCurrentAnswerInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentQ = FREETEXT_QUESTIONS.find(q => q.id === selectedQuestionId);
  const currentEval = selectedQuestionId ? progress[selectedQuestionId] : null;

  // Select a question to edit
  const handleSelectQuestion = (qId: string) => {
    soundEffects.playClick();
    setSelectedQuestionId(qId);
    const existing = progress[qId];
    setCurrentAnswerInput(existing ? existing.userAnswer : '');
  };

  // Improved, generous hybrid evaluation
  const handleEvaluateAnswer = () => {
    if (!currentAnswerInput.trim() || !selectedQuestionId || !currentQ || isEvaluating) return;
    soundEffects.playClick();
    setIsEvaluating(true);

    setTimeout(() => {
      const lowerAnswer = currentAnswerInput.toLowerCase();
      const found: string[] = [];
      const missing: string[] = [];

      currentQ.requiredKeywords.forEach(kw => {
        // Check if keyword or parts of it appear
        const parts = kw.toLowerCase().split(/\s+/);
        const matchesAllParts = parts.every(p => lowerAnswer.includes(p));
        if (matchesAllParts || lowerAnswer.includes(kw.toLowerCase())) {
          found.push(kw);
        } else {
          missing.push(kw);
        }
      });

      // Generous scoring: If user found at least 50% of keywords OR wrote a detailed text (>35 words), boost base ratio
      const wordCount = currentAnswerInput.trim().split(/\s+/).length;
      let ratio = currentQ.requiredKeywords.length > 0 
        ? found.length / currentQ.requiredKeywords.length 
        : 1;

      if (wordCount >= 30 && ratio < 0.7) {
        ratio = 0.75; // Generous boost for thorough explanations
      }
      if (found.length >= Math.ceil(currentQ.requiredKeywords.length * 0.6)) {
        ratio = Math.max(ratio, 0.9);
      }
      if (found.length === currentQ.requiredKeywords.length || wordCount >= 60) {
        ratio = 1.0;
      }

      const calculatedPoints = Math.round(currentQ.maxPoints * ratio);
      const percentage = Math.round((calculatedPoints / currentQ.maxPoints) * 100);

      const newEvalData = {
        userAnswer: currentAnswerInput,
        score: calculatedPoints,
        maxPoints: currentQ.maxPoints,
        percentage,
        foundKeywords: found,
        missingKeywords: missing,
        isEvaluated: true,
      };

      const updatedProgress = {
        ...progress,
        [selectedQuestionId]: newEvalData,
      };

      setProgress(updatedProgress);
      setIsEvaluating(false);
      soundEffects.playSuccess();

      // Check if all questions are completed
      const evaluatedCount = Object.values(updatedProgress).filter(p => p.isEvaluated).length;
      if (evaluatedCount === FREETEXT_QUESTIONS.length) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        onScoreEarned(50);
      }
    }, 500);
  };

  const totalEarnedPoints = Object.values(progress).reduce((acc, p) => acc + (p.score || 0), 0);
  const maxPossiblePoints = FREETEXT_QUESTIONS.reduce((acc, q) => acc + q.maxPoints, 0);
  const evaluatedCount = Object.values(progress).filter(p => p.isEvaluated).length;
  const allCompleted = evaluatedCount === FREETEXT_QUESTIONS.length;

  // OVERVIEW DASHBOARD VIEW
  if (selectedQuestionId === null) {
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              IHK Prüfungs-Trainer
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
              Freitext & Ausarbeitung
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            IHK Freitext-Trainer Übersicht
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-4">
            Wähle eine Aufgabe aus der Übersicht aus, formuliere deine Antwort im IHK-Prüfungsstil und erhalte sofort ein intelligentes Feedback mit Musterlösung und Schlagwort-Abgleich.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fortschritt</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-mono">
                {evaluatedCount} / {FREETEXT_QUESTIONS.length} gelöst
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Gesamtpunkte</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
                {totalEarnedPoints} / {maxPossiblePoints} Pkt
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Belohnung</span>
              <div className="text-lg font-black text-amber-500 mt-0.5 font-mono flex items-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-500" />
                <span>+50 EXP bei Abschluss</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FREETEXT_QUESTIONS.map((q, idx) => {
            const itemProgress = progress[q.id];
            const isDone = itemProgress?.isEvaluated;

            return (
              <div
                key={q.id}
                onClick={() => handleSelectQuestion(q.id)}
                className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between group ${
                  isDone
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      Aufgabe {idx + 1} • {q.category}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{itemProgress.score}/{q.maxPoints} Pkt ({itemProgress.percentage}%)</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        Max. {q.maxPoints} Pkt
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {q.question}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{isDone ? 'Antwort bearbeiten / ansehen' : 'Aufgabe bearbeiten'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // DETAIL / ANSWER VIEW FOR SELECTED QUESTION
  if (!currentQ) return null;

  const wordCount = currentAnswerInput.trim() ? currentAnswerInput.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <button
          onClick={() => {
            soundEffects.playClick();
            setSelectedQuestionId(null);
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Zurück zur Übersicht</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 rounded-lg text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>{currentQ.category}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {currentQ.title}
          </h2>
          <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-black">
            Max. {currentQ.maxPoints} Punkte
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          {currentQ.question}
        </p>

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
            value={currentAnswerInput}
            onChange={e => setCurrentAnswerInput(e.target.value)}
            placeholder="Schreibe hier deine ausführliche Erläuterung im IHK-Stil (z.B. Definition, Fachbegriffe, Anwendungsbeispiel)..."
            rows={8}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 leading-relaxed"
          />
        </div>

        {/* Evaluate Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setSelectedQuestionId(null)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Abbrechen / Zur Übersicht
          </button>

          <button
            onClick={handleEvaluateAnswer}
            disabled={!currentAnswerInput.trim() || isEvaluating}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isEvaluating ? 'Auswertung läuft...' : currentEval ? 'Antwort erneut bewerten' : 'Antwort einreichen & auswerten'}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Evaluation Results & Model Answer */}
        {currentEval && (
          <div className="space-y-5 animate-in fade-in duration-300 pt-5 border-t border-slate-100 dark:border-slate-800">
            {/* Score Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              currentEval.percentage >= 80
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : currentEval.percentage >= 50
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            }`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">Auswertungsergebnis</span>
                <h4 className="text-lg font-black mt-0.5">{currentEval.score} von {currentEval.maxPoints} Punkten ({currentEval.percentage}%)</h4>
                <p className="text-xs mt-1 font-medium">
                  {currentEval.percentage >= 80 ? 'Hervorragende IHK-Antwort! Alle wichtigen Fachbegriffe erkannt.' : currentEval.percentage >= 50 ? 'Gute Ansätze! Einige Fachbegriffe fehlen noch.' : 'Ausbaufähig. Vergleiche mit der Musterlösung.'}
                </p>
              </div>
              <div className="text-3xl font-black font-mono">
                {currentEval.percentage >= 80 ? '🏆' : currentEval.percentage >= 50 ? '👍' : '⚠️'}
              </div>
            </div>

            {/* Keyword Match Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Schlagwort-Abgleich (Pflichtbegriffe)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentQ.requiredKeywords.map(kw => {
                  const isFound = currentEval.foundKeywords.includes(kw);
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

            {/* Return to Overview Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedQuestionId(null)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Zurück zur Übersicht</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
