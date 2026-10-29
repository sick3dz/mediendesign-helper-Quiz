import React, { useState } from 'react';
import { PetState, UserStats, PetFood } from '../types/quiz';
import { PET_SPECIES, PET_FOODS } from '../data/petData';
import { PetAvatar } from './PetAvatar';
import { soundEffects } from '../services/audioService';
import {
  Heart,
  Utensils,
  ShoppingBag,
  Sparkles,
  Zap,
  Moon,
  Sun,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  onUpdatePet: (updatedPet: PetState) => void;
  onOpenShop: (initialTab?: 'food' | 'accessories') => void;
  onOpenFullPetRoom: () => void;
  onChangePet: () => void;
}

export const TopPetCompanionBar: React.FC<Props> = ({
  stats,
  onUpdatePet,
  onOpenShop,
  onOpenFullPetRoom,
  onChangePet,
}) => {
  const { pet, xp } = stats;
  const speciesInfo = PET_SPECIES[pet.species];

  const [isPetted, setIsPetted] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);

  const energyLevel = pet.energy ?? 90;

  const showFeedback = (text: string) => {
    setQuickFeedback(text);
    setTimeout(() => setQuickFeedback(null), 2200);
  };

  const handleQuickPet = () => {
    soundEffects.playPet();
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 700);

    const newHappiness = Math.min(100, pet.happiness + 10);
    const updated: PetState = {
      ...pet,
      happiness: newHappiness,
      timesPetted: pet.timesPetted + 1,
    };
    onUpdatePet(updated);
    showFeedback(`${pet.name} schnurrt zufrieden! (+10 Laune)`);
  };

  const handleToggleSleep = () => {
    soundEffects.playClick();
    const nextSleeping = !pet.isSleeping;
    if (nextSleeping) {
      showFeedback(`😴 ${pet.name} hält ein gemütliches Nickerchen...`);
    } else {
      showFeedback(`☀️ ${pet.name} ist wieder aufgewacht!`);
    }
    onUpdatePet({
      ...pet,
      isSleeping: nextSleeping,
      lastCareTimestamp: Date.now(),
    });
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
    ? 'Schläft 😴'
    : pet.hunger < 35
    ? 'Hungrig 🥪'
    : energyLevel < 35
    ? 'Müde 💤'
    : pet.happiness > 75
    ? 'Überglücklich! ✨'
    : pet.happiness < 40
    ? 'Braucht Liebe 🥺'
    : 'Zufrieden 😊';

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-2xs">
      <div className="max-w-6xl mx-auto px-6 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Pet Avatar + Name + Status */}
          <div className="flex items-center gap-3.5">
            {/* Clickable mini avatar to interact */}
            <button
              onClick={handleQuickPet}
              className="relative shrink-0 group cursor-pointer focus:outline-none"
              title="Klick zum Streicheln!"
            >
              <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 active:scale-95">
                <PetAvatar pet={pet} isEating={isEating} isPetted={isPetted} size="sm" />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs select-none">
                {pet.isSleeping ? '😴' : isPetted ? '💖' : '🐾'}
              </span>
            </button>

            {/* Pet Info & Vitals */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {pet.name}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                  {speciesInfo.title}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                  · {moodLabel}
                </span>
              </div>

              {/* Vitals Progress Bars */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {/* Hunger Meter */}
                <div className="flex items-center gap-1" title={`Sättigung: ${pet.hunger}%`}>
                  <Utensils className="w-3 h-3 text-amber-500 shrink-0" />
                  <div className="w-10 sm:w-14 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        pet.hunger < 35 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pet.hunger}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] tabular-nums">{pet.hunger}%</span>
                </div>

                {/* Energy Meter */}
                <div className="flex items-center gap-1" title={`Energie: ${energyLevel}%`}>
                  <Zap className="w-3 h-3 text-indigo-500 shrink-0" />
                  <div className="w-10 sm:w-14 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        energyLevel < 35 ? 'bg-rose-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${energyLevel}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] tabular-nums">{energyLevel}%</span>
                </div>

                {/* Happiness Meter */}
                <div className="flex items-center gap-1" title={`Zufriedenheit: ${pet.happiness}%`}>
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                  <div className="w-10 sm:w-14 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
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
            <div className="text-center text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 animate-pulse self-center">
              {quickFeedback}
            </div>
          )}

          {/* Right: Quick Interactive Pet & Care CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-center">
            {/* Sleep Toggle */}
            <button
              onClick={handleToggleSleep}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
                pet.isSleeping
                  ? 'bg-indigo-600 text-white border border-indigo-500'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300'
              }`}
              title={pet.isSleeping ? 'Aufwecken' : 'Nickerchen machen'}
            >
              {pet.isSleeping ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{pet.isSleeping ? 'Aufwecken' : 'Schlafen'}</span>
            </button>

            {/* Quick Pet Button */}
            <button
              onClick={handleQuickPet}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Streichele dein Haustier für mehr Zufriedenheit"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span className="hidden sm:inline">Streicheln</span>
            </button>

            {/* Quick Feed Button */}
            <button
              onClick={handleQuickFeed}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Snack füttern"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Füttern</span>
            </button>

            {/* Change Pet / Switch species */}
            <button
              onClick={onChangePet}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
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
