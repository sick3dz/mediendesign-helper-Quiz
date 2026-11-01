import React, { useState } from 'react';
import { PetState, UserStats, PetFood } from '../types/quiz';
import { PET_SPECIES, PET_FOODS, PET_SPECIES_SOUNDS } from '../data/petData';
import { findCosmeticById } from '../data/cosmeticsData';
import { PetAvatar } from './PetAvatar';
import { soundEffects } from '../services/audioService';
import {
  Heart,
  Utensils,
  Sparkles,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  onUpdatePet: (updatedPet: PetState) => void;
  onOpenShop?: (initialTab?: 'food' | 'accessories') => void;
  onOpenFullPetRoom: () => void;
  onOpenGames?: () => void;
  onChangePet?: () => void;
  previewOverride?: {
    equipped?: Partial<PetState['equipped']>;
  };
}

export const TopPetCompanionBar: React.FC<Props> = ({
  stats,
  onUpdatePet,
  onOpenShop,
  onOpenFullPetRoom,
  onOpenGames,
  onChangePet,
  previewOverride,
}) => {
  const { pet, xp } = stats;
  const speciesInfo = PET_SPECIES[pet.species];
  const soundConfig = PET_SPECIES_SOUNDS[pet.species];

  const [isPetted, setIsPetted] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [isGadgetInteracting, setIsGadgetInteracting] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);

  const showFeedback = (text: string) => {
    setQuickFeedback(text);
    setTimeout(() => setQuickFeedback(null), 2500);
  };

  const handleQuickPet = () => {
    soundEffects.playPetForSpecies(pet.species);
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 800);

    const wasSleeping = Boolean(pet.isSleeping);
    const newHappiness = Math.min(100, pet.happiness + 10);
    const updated: PetState = {
      ...pet,
      isSleeping: false,
      happiness: newHappiness,
      timesPetted: pet.timesPetted + 1,
    };
    onUpdatePet(updated);
    if (wasSleeping) {
      showFeedback(soundConfig.wakeUpMsg(pet.name));
    } else {
      showFeedback(`${soundConfig.soundIcon} "${soundConfig.soundWord}" – ${soundConfig.petActionMsg(pet.name)}`);
    }
  };

  const handleQuickHighFive = () => {
    soundEffects.playPetForSpecies(pet.species);
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 800);

    const updated: PetState = {
      ...pet,
      isSleeping: false,
      happiness: Math.min(100, pet.happiness + 10),
      timesPlayed: (pet.timesPlayed || 0) + 1,
    };
    onUpdatePet(updated);
    showFeedback(soundConfig.highFiveActionMsg(pet.name));
  };

  // Quick feed with first available food in inventory
  const availableFoodEntry = Object.entries(pet.inventory?.food || {}).find(
    ([, qty]) => qty > 0
  );

  const handleQuickFeed = () => {
    const [foodId, qty] = availableFoodEntry || ['cookie', 1];
    const foodItem = PET_FOODS.find(f => f.id === foodId) || PET_FOODS[0];
    if (!foodItem) return;

    soundEffects.playEat();
    setIsEating(true);
    setTimeout(() => setIsEating(false), 800);

    const currentQty = pet.inventory?.food?.[foodId] || 0;
    const newFoodInventory = {
      ...pet.inventory?.food,
      [foodId]: Math.max(0, currentQty - 1),
    };

    const newHunger = Math.min(100, pet.hunger + foodItem.nutrition);
    const newHappiness = Math.min(100, pet.happiness + foodItem.happiness);

    const updated: PetState = {
      ...pet,
      isSleeping: false,
      hunger: newHunger,
      happiness: newHappiness,
      inventory: {
        ...pet.inventory,
        food: newFoodInventory,
      },
      timesFed: pet.timesFed + 1,
    };

    onUpdatePet(updated);
    if (!availableFoodEntry) {
      showFeedback(`Gratis Glücks-Keks verfüttert! 🍪 (+${foodItem.nutrition} Sättigung)`);
    } else {
      showFeedback(`${foodItem.name} verfüttert! (+${foodItem.nutrition} Sättigung)`);
    }
  };

  const moodLabel = pet.isSleeping
    ? 'Schläft friedlich 💤'
    : pet.hunger < 35
    ? 'Hungrig 🥪'
    : pet.happiness > 75
    ? 'Überglücklich! ✨'
    : pet.happiness < 40
    ? 'Braucht Liebe 🥺'
    : 'Zufrieden 😊';

  const equippedTitle = stats.equippedCosmetics?.title;

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Left: Pet Avatar + Name + Status */}
          <div className="flex items-center gap-3">
            {/* Clickable mini avatar to open Haustier Lounge */}
            <button
              onClick={onOpenFullPetRoom}
              className="relative shrink-0 group cursor-pointer focus:outline-none"
              title="Zur Haustier Lounge"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center overflow-visible transition-transform group-hover:scale-105 active:scale-95 relative">
                <PetAvatar
                  pet={pet}
                  isEating={isEating}
                  isPetted={isPetted}
                  isGadgetActive={isGadgetInteracting}
                  size="sm"
                  equippedCosmetics={stats.equippedCosmetics}
                  previewOverride={previewOverride}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs select-none">
                {isPetted ? '💖' : '🐾'}
              </span>
            </button>

            {/* Pet Info & Vitals */}
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {pet.name}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                  {speciesInfo.title}
                </span>
                {equippedTitle && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 hidden sm:inline">
                    ★ {findCosmeticById(equippedTitle)?.name || 'IHK-Prüfling'}
                  </span>
                )}
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden md:inline">
                  · {moodLabel}
                </span>
              </div>

              {/* Vitals Progress Bars */}
              <div className="flex items-center gap-2.5 mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {/* Hunger Meter */}
                <div className="flex items-center gap-1" title={`Sättigung: ${pet.hunger}%`}>
                  <Utensils className="w-3 h-3 text-amber-500" />
                  <div className="w-12 sm:w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        pet.hunger < 35 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pet.hunger}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] tabular-nums">{pet.hunger}%</span>
                </div>

                {/* Happiness Meter */}
                <div className="flex items-center gap-1" title={`Zufriedenheit: ${pet.happiness}%`}>
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  <div className="w-12 sm:w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${pet.happiness}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] tabular-nums">{pet.happiness}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center temporary feedback bubble */}
          {quickFeedback && (
            <div className="text-center text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 animate-pulse self-center">
              {quickFeedback}
            </div>
          )}

          {/* Right: Quick Interactive Pet Care CTAs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start sm:self-center shrink-0 max-w-full">
            {/* Quick High-Five Button */}
            <button
              onClick={handleQuickHighFive}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              title={soundConfig.highFiveLabel}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{soundConfig.highFiveLabel}</span>
            </button>

            {/* Quick Feed Button */}
            <button
              onClick={handleQuickFeed}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Snack füttern"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>Füttern {availableFoodEntry ? `(${availableFoodEntry[1]})` : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
