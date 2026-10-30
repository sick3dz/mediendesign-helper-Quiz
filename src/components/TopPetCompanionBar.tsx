import React, { useState } from 'react';
import { PetState, UserStats, PetFood } from '../types/quiz';
import { PET_SPECIES, PET_FOODS, PET_SPECIES_SOUNDS } from '../data/petData';
import { findCosmeticById } from '../data/cosmeticsData';
import { PetAvatar } from './PetAvatar';
import { soundEffects } from '../services/audioService';
import {
  Heart,
  Utensils,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Gamepad2,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  onUpdatePet: (updatedPet: PetState) => void;
  onOpenShop: (initialTab?: 'food' | 'accessories') => void;
  onOpenFullPetRoom: () => void;
  onOpenGames?: () => void;
  onChangePet: () => void;
}

export const TopPetCompanionBar: React.FC<Props> = ({
  stats,
  onUpdatePet,
  onOpenShop,
  onOpenFullPetRoom,
  onOpenGames,
  onChangePet,
}) => {
  const { pet, xp } = stats;
  const speciesInfo = PET_SPECIES[pet.species];
  const soundConfig = PET_SPECIES_SOUNDS[pet.species];

  const [isPetted, setIsPetted] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);

  const showFeedback = (text: string) => {
    setQuickFeedback(text);
    setTimeout(() => setQuickFeedback(null), 2500);
  };

  const handleQuickPet = () => {
    soundEffects.playPetForSpecies(pet.species);
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 800);

    const newHappiness = Math.min(100, pet.happiness + 10);
    const updated: PetState = {
      ...pet,
      happiness: newHappiness,
      timesPetted: pet.timesPetted + 1,
    };
    onUpdatePet(updated);
    showFeedback(`${soundConfig.soundIcon} "${soundConfig.soundWord}" – ${soundConfig.petActionMsg(pet.name)}`);
  };

  // Quick feed with first available food in inventory
  const availableFoodEntry = Object.entries(pet.inventory?.food || {}).find(
    ([, qty]) => qty > 0
  );

  const handleQuickFeed = () => {
    if (!availableFoodEntry) {
      showFeedback('Keine Snacks mehr! Öffne den EXP-Shop.');
      onOpenShop('food');
      return;
    }

    const [foodId, qty] = availableFoodEntry;
    const foodItem = PET_FOODS.find(f => f.id === foodId);
    if (!foodItem) return;

    soundEffects.playEat();
    setIsEating(true);
    setTimeout(() => setIsEating(false), 800);

    const newFoodInventory = {
      ...pet.inventory.food,
      [foodId]: qty - 1,
    };

    const newHunger = Math.min(100, pet.hunger + foodItem.nutrition);
    const newHappiness = Math.min(100, pet.happiness + foodItem.happiness);

    const updated: PetState = {
      ...pet,
      hunger: newHunger,
      happiness: newHappiness,
      inventory: {
        ...pet.inventory,
        food: newFoodInventory,
      },
      timesFed: pet.timesFed + 1,
    };

    onUpdatePet(updated);
    showFeedback(`${foodItem.name} verfüttert! (+${foodItem.nutrition} Sättigung)`);
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
            {/* Clickable mini avatar to interact */}
            <button
              onClick={handleQuickPet}
              className="relative shrink-0 group cursor-pointer focus:outline-none"
              title={pet.isSleeping ? 'Schläft friedlich – Klick zum Aufwecken!' : 'Klick zum Streicheln!'}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 active:scale-95">
                <PetAvatar pet={pet} isEating={isEating} isPetted={isPetted} size="sm" />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs select-none">
                {pet.isSleeping ? '💤' : isPetted ? '💖' : '🐾'}
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

          {/* Right: Quick Interactive Pet & Shop CTAs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start sm:self-center shrink-0 max-w-full">
            {/* Quick Pet Button */}
            <button
              onClick={handleQuickPet}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Streichele dein Haustier"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span className="hidden md:inline">Streicheln</span>
            </button>

            {/* Quick Feed Button */}
            <button
              onClick={handleQuickFeed}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Snack füttern"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Füttern {availableFoodEntry ? `(${availableFoodEntry[1]})` : ''}</span>
            </button>

            {/* Dedicated EXP-Shop Button */}
            <button
              onClick={() => onOpenShop()}
              className="h-8 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
              title="Gib deine verdienten EXP-Punkte im Shop aus"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>EXP-Shop</span>
            </button>

            {/* Quick Quiz Games Button */}
            {onOpenGames && (
              <button
                onClick={onOpenGames}
                className="h-8 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
                title="Spiele Speed-Quiz, Memory oder Boss-Raid"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-slate-950" />
                <span>Quiz-Spiele</span>
              </button>
            )}

            {/* Change Pet / Switch species */}
            <button
              onClick={onChangePet}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shrink-0"
              title="Anderes Haustier auswählen"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
