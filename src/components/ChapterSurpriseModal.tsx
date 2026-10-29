import React from 'react';
import { PetState } from '../types/quiz';
import { ChapterSurprise } from '../data/petData';
import { PetAvatar } from './PetAvatar';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Sparkles, Check, ArrowRight, Award } from 'lucide-react';

interface Props {
  surprise: ChapterSurprise;
  pet: PetState;
  onEquipAndClose: () => void;
  onClose: () => void;
}

export const ChapterSurpriseModal: React.FC<Props> = ({
  surprise,
  pet,
  onEquipAndClose,
  onClose,
}) => {
  const { accessory, chapterNumber, chapterTitle } = surprise;

  // Render a preview pet wearing this new surprise item
  const previewPet: PetState = {
    ...pet,
    equipped: {
      ...pet.equipped,
      [accessory.category]: accessory.id,
    },
  };

  React.useEffect(() => {
    soundEffects.playLevelUp();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-indigo-200 dark:border-indigo-850 shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        {/* Glow backdrop decorative effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-indigo-50 dark:from-amber-950/60 dark:to-indigo-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Kapitel {chapterNumber} gemeistert!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          Exklusive Überraschung! 🎁
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Du hast alle Module in <strong>„{chapterTitle}“</strong> erfolgreich abgeschlossen! Dein Haustier hat eine besondere Belohnung erhalten, die es <em>nicht im Shop</em> zu kaufen gibt:
        </p>

        {/* Live Pet Preview with Item */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-indigo-50/70 to-slate-50 dark:from-indigo-950/40 dark:to-slate-800/50 border border-indigo-100 dark:border-indigo-900/50 mb-6">
          <div className="scale-100 transition-all">
            <PetAvatar pet={previewPet} isPetted={true} size="md" />
          </div>

          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-sm font-extrabold text-indigo-700 dark:text-indigo-300">
              <span className="text-xl">{accessory.icon}</span>
              <span>{accessory.name}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
              {accessory.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onEquipAndClose();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Jetzt sofort anlegen</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-98"
          >
            <span>In Kleiderschrank legen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
