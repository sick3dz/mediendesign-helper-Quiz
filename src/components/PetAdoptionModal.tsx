import React, { useState } from 'react';
import { PetSpecies, PetState } from '../types/quiz';
import { PET_SPECIES } from '../data/petData';
import { PetAvatar } from './PetAvatar';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { Sparkles, Check, Heart, ArrowRight } from 'lucide-react';

interface Props {
  currentPet: PetState;
  onAdopt: (species: PetSpecies, name: string) => void;
  canCancel?: boolean;
  onClose?: () => void;
}

export const PetAdoptionModal: React.FC<Props> = ({
  currentPet,
  onAdopt,
  canCancel = false,
  onClose,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>(currentPet.species || 'dog');
  const [petName, setPetName] = useState<string>(
    currentPet.name || PET_SPECIES[selectedSpecies].defaultName
  );

  const speciesList: PetSpecies[] = ['dog', 'cat', 'penguin', 'axolotl'];

  const handleSelectSpecies = (species: PetSpecies) => {
    setSelectedSpecies(species);
    // If the current name was the default of another species, switch to the new default
    const prevDefault = PET_SPECIES[selectedSpecies].defaultName;
    if (petName === prevDefault || petName.trim() === '') {
      setPetName(PET_SPECIES[species].defaultName);
    }
    soundEffects.playClick();
  };

  const handleConfirm = () => {
    const finalName = petName.trim() || PET_SPECIES[selectedSpecies].defaultName;
    soundEffects.playLevelUp();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti not supported
    }
    onAdopt(selectedSpecies, finalName);
  };

  const previewPetState: PetState = {
    hasAdopted: true,
    species: selectedSpecies,
    name: petName || PET_SPECIES[selectedSpecies].defaultName,
    hunger: 90,
    happiness: 95,
    equipped: currentPet.equipped || {},
    inventory: currentPet.inventory || { food: {}, accessories: [] },
    timesFed: currentPet.timesFed || 0,
    timesPetted: currentPet.timesPetted || 0,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>ADHS-Lernbegleiter</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Wähle dein Haustier 🐾
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Dein Begleiter wächst mit deinem Lernerfolg! Verdiene EXP im Quiz, füttere ihn und kleide ihn im neuen EXP-Shop ein.
          </p>
        </div>

        {/* Live Pet Preview */}
        <div className="flex flex-col items-center justify-center mb-6 p-4 rounded-2xl bg-gradient-to-b from-indigo-50/50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-850/40 border border-indigo-100 dark:border-indigo-900/50">
          <div className="scale-90 sm:scale-100 transition-all">
            <PetAvatar pet={previewPetState} isPetted={true} size="md" />
          </div>
          <div className="text-center mt-2">
            <div className="font-extrabold text-base text-slate-900 dark:text-white">
              {petName || PET_SPECIES[selectedSpecies].defaultName}
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {PET_SPECIES[selectedSpecies].title} · Liebt {PET_SPECIES[selectedSpecies].favoriteFood}
            </div>
          </div>
        </div>

        {/* 4 Species Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {speciesList.map(species => {
            const info = PET_SPECIES[species];
            const isSelected = selectedSpecies === species;
            const emojiMap: Record<PetSpecies, string> = {
              dog: '🐶',
              cat: '🐱',
              penguin: '🐧',
              axolotl: '🦎',
            };

            return (
              <button
                key={species}
                onClick={() => handleSelectSpecies(species)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div className="text-3xl mb-1.5 transform group-hover:scale-110 transition-transform">
                  {emojiMap[species]}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {info.defaultName}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {info.title}
                </div>
                {isSelected && (
                  <span className="mt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Gewählt
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Name input */}
        <div className="mb-6 max-w-sm mx-auto">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-center">
            Wie soll dein Begleiter heißen?
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={20}
              value={petName}
              onChange={e => setPetName(e.target.value)}
              placeholder="Name eingeben..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {canCancel && onClose && (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Abbrechen
            </button>
          )}

          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Begleiter adoptieren & Starten</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
