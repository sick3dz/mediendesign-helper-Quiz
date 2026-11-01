import React, { useState, useEffect, useRef } from 'react';
import { PetState, EquippedCosmetics } from '../types/quiz';
import { PetAvatar } from './PetAvatar';
import { PET_SPECIES } from '../data/petData';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { X, Sparkles, CheckCircle2, Heart, Star, Wind, RefreshCw } from 'lucide-react';

interface Props {
  pet: PetState;
  equippedCosmetics?: EquippedCosmetics;
  onClose: () => void;
  onComplete: () => void;
}

type BreathPhase = {
  name: string;
  instruction: string;
  subtext: string;
  duration: number; // in seconds
  scale: number; // Avatar scale target
  color: string;
};

const BREATH_PHASES: BreathPhase[] = [
  {
    name: 'Tief Einatmen',
    instruction: 'Atme ruhig und tief durch die Nase ein...',
    subtext: 'Spüre, wie sich dein Brustkorb weitet',
    duration: 4,
    scale: 1.12,
    color: 'from-teal-500/20 to-emerald-500/30 text-teal-700 dark:text-teal-300',
  },
  {
    name: 'Sanft Anhalten',
    instruction: 'Halte die Luft entspannt an...',
    subtext: 'Bleibe ganz ruhig und gelassen',
    duration: 4,
    scale: 1.12,
    color: 'from-indigo-500/20 to-purple-500/30 text-indigo-700 dark:text-indigo-300',
  },
  {
    name: 'Langsam Ausatmen',
    instruction: 'Atme langsam und vollständig durch den Mund aus...',
    subtext: 'Lass alle Anspannung von deinen Schultern abfallen',
    duration: 4,
    scale: 0.98,
    color: 'from-amber-500/20 to-rose-500/30 text-amber-700 dark:text-amber-300',
  },
  {
    name: 'Nachspüren & Ruhen',
    instruction: 'Genieße den Moment der inneren Stille...',
    subtext: 'Bereite dich auf den nächsten Atemzug vor',
    duration: 4,
    scale: 1.0,
    color: 'from-blue-500/20 to-cyan-500/30 text-blue-700 dark:text-blue-300',
  },
];

const TOTAL_CYCLES = 3;

export const MindfulBreathingModal: React.FC<Props> = ({
  pet,
  equippedCosmetics,
  onClose,
  onComplete,
}) => {
  const [currentCycle, setCurrentCycle] = useState(1);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemainingInPhase, setSecondsRemainingInPhase] = useState(BREATH_PHASES[0].duration);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speciesInfo = PET_SPECIES[pet.species];
  const currentPhase = BREATH_PHASES[phaseIndex];

  // ESC Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Main Breathing Timer Loop
  useEffect(() => {
    if (isCompleted || isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemainingInPhase(prev => {
        if (prev <= 1) {
          // Transition to next phase
          setPhaseIndex(prevPhase => {
            const nextPhase = (prevPhase + 1) % BREATH_PHASES.length;
            
            // Check cycle completion when wrapping back to phase 0
            if (nextPhase === 0) {
              setCurrentCycle(prevCycle => {
                if (prevCycle >= TOTAL_CYCLES) {
                  // Completed all cycles!
                  triggerCompletion();
                  return prevCycle;
                }
                soundEffects.playClick();
                return prevCycle + 1;
              });
            } else {
              soundEffects.playClick();
            }

            return nextPhase;
          });

          return BREATH_PHASES[(phaseIndex + 1) % BREATH_PHASES.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phaseIndex, isCompleted, isPaused]);

  const triggerCompletion = () => {
    setIsCompleted(true);
    soundEffects.playLevelUp();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleFinishEarly = () => {
    triggerCompletion();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="breathing-title"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-100 transition-all relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400">
            <Wind className="w-4 h-4" />
            <span>Achtsamkeits-Atemübung</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400">4-4-4-4 Box-Breathing</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-6">
          {!isCompleted ? (
            <>
              {/* Cycle Tracker Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Zyklus {currentCycle} von {TOTAL_CYCLES}
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i + 1 < currentCycle
                          ? 'w-6 bg-teal-500'
                          : i + 1 === currentCycle
                          ? 'w-8 bg-teal-600 dark:bg-teal-400'
                          : 'w-4 bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Resonant Breathing Bubble & Pet Visual */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2">
                {/* Outer Calming Wave Rings */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/20 via-indigo-400/15 to-purple-400/20 dark:from-teal-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 blur-xl transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `scale(${currentPhase.scale * 1.15})`,
                  }}
                />

                <div
                  className="absolute inset-2 rounded-full border border-teal-300/40 dark:border-teal-700/50 transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `scale(${currentPhase.scale})`,
                  }}
                />

                {/* Concentric Countdown Circle */}
                <div
                  className="relative z-10 p-4 transition-transform duration-1000 ease-in-out select-none"
                  style={{
                    transform: `scale(${currentPhase.scale})`,
                  }}
                >
                  <PetAvatar
                    pet={pet}
                    size="lg"
                    equippedCosmetics={equippedCosmetics}
                  />
                </div>

                {/* Floating Phase Countdown Badge */}
                <div className="absolute -bottom-2 z-20 px-3.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-md text-xs font-mono font-extrabold text-teal-600 dark:text-teal-400 tabular-nums">
                  {secondsRemainingInPhase}s
                </div>
              </div>

              {/* Instruction & Phase Card */}
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white transition-all">
                  {currentPhase.name}
                </h3>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {currentPhase.instruction}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {currentPhase.subtext}
                </p>
              </div>

              {/* Actions & Early Exit */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaused(p => !p)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                >
                  {isPaused ? 'Fortsetzen' : 'Pausieren'}
                </button>

                <button
                  type="button"
                  onClick={handleFinishEarly}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors cursor-pointer"
                >
                  Übung abschließen (+25 EXP)
                </button>
              </div>
            </>
          ) : (
            /* Completed Celebration Screen */
            <div className="py-4 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Wunderbar durchgeatmet! 🌿
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Dein Gehirn ist nun wieder mit frischem Sauerstoff versorgt und dein Fokus ist neu kalibriert. {pet.name} freut sich riesig über die gemeinsame Atempause!
                </p>
              </div>

              {/* Rewards Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-indigo-50 to-amber-50 dark:from-teal-950/30 dark:via-indigo-950/30 dark:to-amber-950/30 border border-teal-200/60 dark:border-teal-900/40 flex items-center justify-around gap-4 text-xs font-bold">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>+25 EXP Bonus</span>
                </div>
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>+15 Laune für {pet.name}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playClick();
                    onComplete();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Erholt weiterlernen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
