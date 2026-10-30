import React, { useState, useEffect } from 'react';
import { soundEffects } from '../services/audioService';
import { AmbientSoundType } from '../services/ambientAudioService';
import { buildBlitzPool, createRecallQuestionFromKnowledge, BlitzItem } from '../utils/blitzContent';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Headphones,
  CloudRain,
  Wind,
  Gift,
  Zap,
  CheckCircle2,
  XCircle,
  Flame,
  HelpCircle,
  Trophy,
  BookOpen,
  Star,
  Check,
  Heart,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

const MAX_UNITS = 20;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  totalSeconds: number;
  secondsLeft: number;
  isActive: boolean;
  isDone: boolean;
  soundType: AmbientSoundType;
  volume: number;
  isMuted: boolean;
  onToggleActive: () => void;
  onReset: (secs?: number) => void;
  onSelectSound: (type: AmbientSoundType) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
  onClaimLoot?: (rewardText: string) => void;
}

// 4-4-4 Box Breathing Visualizer Component
const BoxBreathingVisualizer: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState<number>(0); // 0: Einatmen, 1: Halten, 2: Ausatmen, 3: Innehalten
  const [phaseTimer, setPhaseTimer] = useState<number>(4);

  const phases = [
    { name: 'Einatmen', color: 'from-teal-400 to-emerald-500', glow: 'shadow-teal-500/50', scale: 'scale-115', msg: 'Atme langsam tief durch die Nase ein...' },
    { name: 'Luft halten', color: 'from-amber-400 to-amber-500', glow: 'shadow-amber-500/50', scale: 'scale-115', msg: 'Halte die Luft entspannt im Brustkorb...' },
    { name: 'Ausatmen', color: 'from-indigo-500 to-sky-500', glow: 'shadow-indigo-500/50', scale: 'scale-85', msg: 'Atme gleichmäßig und ruhig durch den Mund aus...' },
    { name: 'Innehalten', color: 'from-purple-500 to-indigo-500', glow: 'shadow-purple-500/50', scale: 'scale-85', msg: 'Genieße die Stille vor dem nächsten Atemzug...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseTimer(prev => {
        if (prev <= 1) {
          setPhaseIndex(p => (p + 1) % 4);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentPhase = phases[phaseIndex];

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-500/30 text-center space-y-4 shadow-xl my-3">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-xs font-extrabold border border-indigo-400/30">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
        <span>Entspannungs-Phase: 4-4-4 Box-Breathing</span>
      </div>

      <div className="relative w-40 h-40 mx-auto my-4 flex items-center justify-center">
        {/* Pulsing Outer Glow Ring */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentPhase.color} opacity-30 blur-xl transition-all duration-1000 ${currentPhase.scale}`}
        />

        {/* Breathing Animated Circle */}
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentPhase.color} flex flex-col items-center justify-center shadow-2xl ${currentPhase.glow} transition-all duration-[1000ms] ease-in-out ${currentPhase.scale}`}
        >
          <span className="text-sm font-black tracking-wide text-white drop-shadow-md">
            {currentPhase.name}
          </span>
          <span className="text-3xl font-black font-mono mt-0.5 text-white drop-shadow-md">
            {phaseTimer}s
          </span>
        </div>
      </div>

      <p className="text-xs text-indigo-200 font-medium h-8 flex items-center justify-center px-2">
        {currentPhase.msg}
      </p>

      <div className="flex justify-center gap-2 pt-1">
        {phases.map((p, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === phaseIndex ? 'w-6 bg-amber-400' : 'w-2 bg-indigo-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const FocusSprintModal: React.FC<Props> = ({
  isOpen,
  onClose,
  totalSeconds,
  secondsLeft,
  isActive,
  isDone,
  soundType,
  volume,
  isMuted,
  onToggleActive,
  onReset,
  onSelectSound,
  onVolumeChange,
  onToggleMute,
  onClaimLoot,
}) => {
  const [sprintMode, setSprintMode] = useState<'passive' | 'active_quiz'>('active_quiz');
  const [hasStarted, setHasStarted] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [lootClaimed, setLootClaimed] = useState<string | null>(null);

  // Blitz-Quiz State
  const [blitzPool, setBlitzPool] = useState<BlitzItem[]>([]);
  const [currentPoolIndex, setCurrentPoolIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [blitzScore, setBlitzScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [blitzCombo, setBlitzCombo] = useState(0);
  const [showComboToast, setShowComboToast] = useState(false);
  const [unitsCompleted, setUnitsCompleted] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setBlitzPool(buildBlitzPool());
      setCurrentPoolIndex(0);
      setBlitzScore(0);
      setTotalAttempted(0);
      setBlitzCombo(0);
      setIsAnswered(false);
      setSelectedOptionId(null);
      setUnitsCompleted(false);
      setLootClaimed(null);
      setHasStarted(false);
      setShowExitConfirmModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;
  const isSessionFinished = isDone || unitsCompleted || totalAttempted >= MAX_UNITS;

  const handleAttemptClose = () => {
    // If sprint is active or started but not finished, confirm before exit
    if ((isActive || hasStarted) && !isSessionFinished) {
      setShowExitConfirmModal(true);
    } else {
      onClose();
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirmModal(false);
    if (isActive) {
      onToggleActive();
    }
    onReset(300);
    onClose();
  };

  const handleStartSprintNow = () => {
    soundEffects.playLevelUp();
    setHasStarted(true);
    if (!isActive) {
      onToggleActive();
    }
  };

  const handleUnboxLoot = () => {
    soundEffects.playLevelUp();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    const rewards = [
      '🍪 2x Glücks-Kekse für dein Haustier!',
      '🧋 1x Fokus Bubble-Tea geschenkt!',
      '⚡ +100 Bonus EXP Guthaben!',
      '🍎 1x Goldener Prüfungs-Apfel!',
    ];
    const item = rewards[Math.floor(Math.random() * rewards.length)];
    setLootClaimed(item);
    if (onClaimLoot) {
      onClaimLoot(item);
    }
  };

  const checkMaxUnitsAndAdvance = (newAttemptedCount: number) => {
    if (newAttemptedCount >= MAX_UNITS) {
      setUnitsCompleted(true);
      soundEffects.playLevelUp();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      return;
    }

    setSelectedOptionId(null);
    setIsAnswered(false);
    setCurrentPoolIndex(prev => (prev + 1) % (blitzPool.length || 1));
  };

  const handleOptionSelect = (option: { id: string; text: string; isCorrect: boolean }) => {
    if (isAnswered || isSessionFinished) return;
    setSelectedOptionId(option.id);
    setIsAnswered(true);
    const newAttempted = totalAttempted + 1;
    setTotalAttempted(newAttempted);

    if (option.isCorrect) {
      soundEffects.playSuccess();
      setBlitzScore(prev => prev + 1);
      const newCombo = blitzCombo + 1;
      setBlitzCombo(newCombo);

      if (newCombo > 0 && newCombo % 3 === 0) {
        setShowComboToast(true);
        soundEffects.playLevelUp();
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
        setTimeout(() => setShowComboToast(false), 2000);
      }
    } else {
      soundEffects.playError();
      setBlitzCombo(0);
    }

    setTimeout(() => {
      checkMaxUnitsAndAdvance(newAttempted);
    }, 750);
  };

  const handleAcknowledgeKnowledge = () => {
    if (isSessionFinished) return;

    const currentKnowledgeItem = blitzPool[currentPoolIndex];
    soundEffects.playSuccess();
    setBlitzScore(prev => prev + 1);
    const newAttempted = totalAttempted + 1;
    setTotalAttempted(newAttempted);

    const newCombo = blitzCombo + 1;
    setBlitzCombo(newCombo);

    if (newCombo > 0 && newCombo % 3 === 0) {
      setShowComboToast(true);
      soundEffects.playLevelUp();
      confetti({ particleCount: 40, spread: 40, origin: { y: 0.7 } });
      setTimeout(() => setShowComboToast(false), 2000);
    }

    // SPACED RECALL LOGIC: Queue a recall question based on this card 2-3 positions down in the queue!
    if (currentKnowledgeItem && currentKnowledgeItem.type === 'knowledge') {
      const recallQuestion = createRecallQuestionFromKnowledge({
        title: currentKnowledgeItem.title,
        coreConcept: currentKnowledgeItem.coreConcept,
        category: currentKnowledgeItem.category,
        merksatz: currentKnowledgeItem.merksatz,
      });

      setBlitzPool(prevPool => {
        const targetIndex = Math.min(currentPoolIndex + 3, prevPool.length);
        const updated = [...prevPool];
        updated.splice(targetIndex, 0, recallQuestion);
        return updated;
      });
    }

    checkMaxUnitsAndAdvance(newAttempted);
  };

  const currentItem = blitzPool[currentPoolIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative transition-colors max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleAttemptClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-xl transition-colors cursor-pointer bg-slate-100 dark:bg-slate-800 z-10"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold mb-2 border border-indigo-200/80 dark:border-indigo-800/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>ADHS Fokus-Studio & Lofi-Radio</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            5-Minuten Fokus Sprint
          </h3>
        </div>

        {/* SAFETY CONFIRMATION OVERLAY FOR ACCIDENTAL EXIT */}
        {showExitConfirmModal && (
          <div className="p-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl border-2 border-amber-500/50 mb-4 animate-in fade-in space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-900 dark:text-amber-200 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>Sprint wirklich abbrechen?</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Du bist gerade mitten im Lern-Flow! Wenn du jetzt abbrichst, geht dein bisheriger Sprint-Fortschritt verloren.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Nein, weiterlernen! 🔥
              </button>
              <button
                onClick={handleConfirmExit}
                className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Ja, beenden
              </button>
            </div>
          </div>
        )}

        {/* LOBBY / START SCREEN BEFORE STARTING SPRINT */}
        {!hasStarted ? (
          <div className="space-y-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md">
                <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  Bereit für deinen Fokus-Sprint?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Wähle deinen Modus und starte die 5-Minuten Lerneinheit, wenn du bereit bist.
                </p>
              </div>

              {/* Mode Selector Tabs in Lobby */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setSprintMode('active_quiz');
                  }}
                  className={`py-2 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    sprintMode === 'active_quiz'
                      ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                  <span>⚡ 20-Einheiten Mix</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setSprintMode('passive');
                  }}
                  className={`py-2 px-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    sprintMode === 'passive'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>⏱️ Passiv: Timer</span>
                </button>
              </div>

              <div className="text-left space-y-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Maximal 20 Lerneinheiten (Spaced Flashcards & Quiz)</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Entspannendes Box-Breathing zum Abschluss</span>
                </div>
              </div>

              {/* Prominent Start Button */}
              <button
                onClick={handleStartSprintNow}
                className="w-full py-3 px-5 bg-gradient-to-r from-amber-500 via-indigo-600 to-indigo-700 hover:from-amber-600 hover:to-indigo-800 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Zap className="w-5 h-5 fill-amber-300 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>⚡ Fokus-Sprint JETZT STARTEN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE SPRINT SESSION CONTROLS & CONTENT */
          <>
            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setSprintMode('active_quiz');
                }}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  sprintMode === 'active_quiz'
                    ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 fill-current text-amber-300" />
                <span>⚡ Aktiv: 20-Einheiten Mix</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setSprintMode('passive');
                }}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  sprintMode === 'passive'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>⏱️ Passiv: Timer</span>
              </button>
            </div>

            {/* Compact Countdown Bar & Unit Counter */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4">
              <div className="flex items-center gap-2">
                <div className="font-mono text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="flex flex-col text-[11px] font-bold">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {isSessionFinished ? '✓ Beendet' : isActive ? '● Sprint läuft' : 'Bereit'}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px]">
                    Einheit {Math.min(totalAttempted, MAX_UNITS)} / {MAX_UNITS}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isSessionFinished && (
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onToggleActive();
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isActive ? 'Pause' : 'Start'}</span>
                  </button>
                )}

                <button
                  onClick={handleAttemptClose}
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  title="Abbrechen"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dynamic Combo Toast */}
            {showComboToast && (
              <div className="mb-3 p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black rounded-2xl text-center shadow-lg animate-bounce flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 fill-amber-200 text-amber-100 animate-pulse" />
                <span>🔥 {blitzCombo}ER-COMBO! +25 BONUS EXP! 🎉</span>
              </div>
            )}

            {/* Finished / Sprint Done State + Box Breathing */}
            {isSessionFinished ? (
              <div className="space-y-3 mb-4 animate-in fade-in">
                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm">
                    <Trophy className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span>20 Einheiten geschafft! 🎉</span>
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Ausgezeichnete Leistung! Du hast {blitzScore} Punkte gesammelt. Jetzt Zeit zum Durchatmen!
                  </p>
                </div>

                {/* Mystery Loot Box Unboxing */}
                <div className="text-center p-4 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 dark:from-amber-500/20 dark:via-purple-500/20 dark:to-indigo-500/20 rounded-2xl border border-amber-300 dark:border-amber-700/60 space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-amber-900 dark:text-amber-200 font-extrabold text-sm">
                    <Gift className="w-5 h-5 text-amber-500 animate-bounce" />
                    <span>Fokus-Belohnungskiste! 🎁</span>
                  </div>
                  {!lootClaimed ? (
                    <button
                      onClick={handleUnboxLoot}
                      className="mt-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 fill-amber-300" />
                      <span>Kiste jetzt öffnen! ✨</span>
                    </button>
                  ) : (
                    <div className="p-2.5 bg-white/90 dark:bg-slate-800/90 rounded-xl border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-800 dark:text-amber-300 animate-bounce">
                      🎉 Belohnung erhalten: {lootClaimed}
                    </div>
                  )}
                </div>

                {/* Interactive 4-4-4 Box Breathing Visualizer */}
                <BoxBreathingVisualizer />
              </div>
            ) : sprintMode === 'active_quiz' && currentItem ? (
              /* ACTIVE SPRINT: INTERLEAVED KNOWLEDGE & QUIZ ITEM */
              <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                {/* Live Stats & Category Header */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate max-w-[65%]">
                    {currentItem.type === 'quiz' ? (
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate">{currentItem.category}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black text-[11px] rounded-full border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{blitzCombo}</span>
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-bold text-[11px] rounded-full border border-indigo-300 dark:border-indigo-700">
                      ⚡ {blitzScore} Pkt
                    </span>
                  </div>
                </div>

                {/* ITEM TYPE: QUIZ QUESTION */}
                {currentItem.type === 'quiz' ? (
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-3">
                      {currentItem.question}
                    </h4>

                    <div className="space-y-2">
                      {currentItem.options.map(option => {
                        const isSelected = selectedOptionId === option.id;
                        let btnStyles =
                          'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600';

                        if (isAnswered) {
                          if (option.isCorrect) {
                            btnStyles =
                              'bg-emerald-500 text-white border-emerald-600 dark:bg-emerald-600 font-bold shadow-xs';
                          } else if (isSelected) {
                            btnStyles = 'bg-rose-500 text-white border-rose-600 dark:bg-rose-600 font-bold';
                          } else {
                            btnStyles =
                              'bg-slate-100 dark:bg-slate-800/40 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={option.id}
                            disabled={isAnswered}
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyles}`}
                          >
                            <span>{option.text}</span>
                            {isAnswered && option.isCorrect && (
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                            )}
                            {isAnswered && isSelected && !option.isCorrect && (
                              <XCircle className="w-4 h-4 shrink-0 text-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* ITEM TYPE: KNOWLEDGE FLASHCARD / QUICK-FACT */
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-[11px] rounded-md border border-amber-300/50 dark:border-amber-700/50">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>Quick-Wissen Flashcard</span>
                      </span>
                      {currentItem.examFavorite && (
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold text-[10px] rounded-md border border-purple-300/50">
                          ⭐ IHK Prüfungsfavorit
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {currentItem.title}
                    </h4>

                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed font-medium">
                      {currentItem.coreConcept}
                    </p>

                    {currentItem.bulletPoints && currentItem.bulletPoints.length > 0 && (
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-1">
                        {currentItem.bulletPoints.slice(0, 2).map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {currentItem.merksatz && (
                      <div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 rounded-xl text-indigo-900 dark:text-indigo-200 text-xs font-bold">
                        💡 Merksatz: {currentItem.merksatz}
                      </div>
                    )}

                    <button
                      onClick={handleAcknowledgeKnowledge}
                      className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Gelesen & Gemerkt! (+10 ⚡ EXP)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* PASSIVE FOKUS TIMER CARD */
              <div className="mb-4 text-center py-4 px-2 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="relative w-32 h-32 mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-slate-200 dark:text-slate-700 stroke-current"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-500"
                      strokeWidth="7"
                      strokeDasharray={263.89}
                      strokeDashoffset={263.89 - (263.89 * progressPercent) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-mono text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {isActive ? 'Fokus aktiv' : 'Passiv'}
                    </span>
                  </div>
                </div>

                {/* Presets */}
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold text-[11px]">Dauer:</span>
                  {[180, 300, 600].map(secs => (
                    <button
                      key={secs}
                      onClick={() => {
                        soundEffects.playClick();
                        onReset(secs);
                      }}
                      className={`px-3 py-1 rounded-lg font-mono font-bold text-xs cursor-pointer transition-all ${
                        totalSeconds === secs
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {secs / 60} Min
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Ambient Soundscape Selection (Shared across both modes) */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-indigo-500" />
              <span>Hintergrund-Audio (Lofi Soundscape)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Web Audio</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('lofi');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'lofi'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <Music className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Lofi Chords</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('white-noise');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'white-noise'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <Wind className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">White Noise</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('rain');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'rain'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Rain Drift</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectSound('none');
              }}
              className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                soundType === 'none'
                  ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <VolumeX className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Stumm (Aus)</span>
            </button>
          </div>

          {/* Volume Control */}
          {soundType !== 'none' && (
            <div className="flex items-center gap-2.5 pt-1 text-xs">
              <button
                onClick={onToggleMute}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer p-1"
                title={isMuted ? 'Ton an' : 'Stumm schalten'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={onVolumeChange}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] text-slate-400 w-8 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
