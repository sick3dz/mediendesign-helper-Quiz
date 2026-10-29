import React, { useState, useEffect } from 'react';
import { PetState, PetSpecies, UserStats, PetAccessory, PetFood } from '../types/quiz';
import {
  PET_SPECIES,
  PET_FOODS,
  PET_ACCESSORIES,
  CHAPTER_SURPRISES,
  findAccessoryById,
} from '../data/petData';
import { PetAvatar } from './PetAvatar';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  Heart,
  Utensils,
  Sparkles,
  Shirt,
  Edit2,
  Check,
  RefreshCw,
  Lock,
  Award,
  Zap,
  ArrowLeft,
  Gamepad2,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  initialTab?: 'care' | 'shop' | 'wardrobe' | 'adopt';
  onUpdatePet: (updatedPet: PetState) => void;
  onCoinsChange?: (newCoins: number) => void;
  onXpChange?: (newXp: number) => void;
  onOpenAdoptionModal?: () => void;
  onGoToGames?: () => void;
  onBack?: () => void;
}

export const VirtualPetView: React.FC<Props> = ({
  stats,
  initialTab = 'care',
  onUpdatePet,
  onXpChange,
  onOpenAdoptionModal,
  onGoToGames,
  onBack,
}) => {
  const { pet, xp } = stats;
  const speciesInfo = PET_SPECIES[pet.species];

  const [activeTab, setActiveTab] = useState<'care' | 'shop' | 'wardrobe' | 'adopt'>(initialTab);
  const [shopSubTab, setShopSubTab] = useState<'all' | 'food' | 'accessories'>('all');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(pet.name);
  const [isEating, setIsEating] = useState(false);
  const [isPetted, setIsPetted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Sync initialTab when changed externally
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const showTemporaryFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  // 1. Petting interaction
  const handlePet = () => {
    soundEffects.playPet();
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 800);

    const newHappiness = Math.min(100, pet.happiness + 12);
    const updated: PetState = {
      ...pet,
      happiness: newHappiness,
      timesPetted: pet.timesPetted + 1,
    };
    onUpdatePet(updated);
    showTemporaryFeedback(`${pet.name} freut sich riesig über deine Streicheleinheit! (+12 Laune)`);
  };

  // 2. Feeding from inventory
  const handleFeed = (foodId: string) => {
    const qty = pet.inventory.food[foodId] || 0;
    if (qty <= 0) return;

    const foodItem = PET_FOODS.find(f => f.id === foodId);
    if (!foodItem) return;

    soundEffects.playEat();
    setIsEating(true);
    setTimeout(() => setIsEating(false), 900);

    const newInventory = {
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
        food: newInventory,
      },
      timesFed: pet.timesFed + 1,
    };

    onUpdatePet(updated);
    showTemporaryFeedback(`${pet.name} hat ${foodItem.name} genossen! (+${foodItem.nutrition} Sättigung)`);
  };

  // 3. Buying food purely with EXP
  const handleBuyFood = (food: PetFood) => {
    const xpCost = food.xpPrice || Math.round(food.price * 0.8);

    if (xp < xpCost) {
      soundEffects.playWrong();
      showTemporaryFeedback(`Nicht genug EXP! Du benötigst ${xpCost} EXP (aktuell: ${xp} EXP).`);
      return;
    }

    soundEffects.playCoin();
    if (onXpChange) {
      onXpChange(xp - xpCost);
    }

    const currentQty = pet.inventory.food[food.id] || 0;
    const updated: PetState = {
      ...pet,
      inventory: {
        ...pet.inventory,
        food: {
          ...pet.inventory.food,
          [food.id]: currentQty + 1,
        },
      },
    };
    onUpdatePet(updated);
    showTemporaryFeedback(`1x ${food.name} für ${xpCost} EXP gekauft!`);
  };

  // 4. Buying accessory purely with EXP
  const handleBuyAccessory = (acc: PetAccessory) => {
    const xpCost = acc.xpPrice || Math.round(acc.price * 0.8);

    if (xp < xpCost) {
      soundEffects.playWrong();
      showTemporaryFeedback(`Nicht genug EXP! Du benötigst ${xpCost} EXP (aktuell: ${xp} EXP).`);
      return;
    }

    soundEffects.playCoin();
    if (onXpChange) {
      onXpChange(xp - xpCost);
    }

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // ignore
    }

    const updated: PetState = {
      ...pet,
      equipped: {
        ...pet.equipped,
        [acc.category]: acc.id, // Auto-equip on purchase!
      },
      inventory: {
        ...pet.inventory,
        accessories: [...pet.inventory.accessories, acc.id],
      },
    };
    onUpdatePet(updated);
    showTemporaryFeedback(`🎉 ${acc.name} für ${xpCost} EXP gekauft und ${pet.name} angezogen!`);
  };

  // 5. Equip / Unequip
  const handleToggleEquip = (acc: PetAccessory) => {
    soundEffects.playClick();
    const isCurrentlyEquipped = pet.equipped[acc.category] === acc.id;
    const nextEquipped = { ...pet.equipped };

    if (isCurrentlyEquipped) {
      delete nextEquipped[acc.category];
      showTemporaryFeedback(`${acc.name} abgelegt.`);
    } else {
      nextEquipped[acc.category] = acc.id;
      showTemporaryFeedback(`${acc.name} angelegt!`);
    }

    onUpdatePet({
      ...pet,
      equipped: nextEquipped,
    });
  };

  // 6. Adopt / Switch Species
  const handleAdopt = (newSpecies: PetSpecies) => {
    soundEffects.playClick();
    const info = PET_SPECIES[newSpecies];
    const updated: PetState = {
      ...pet,
      species: newSpecies,
      name: info.defaultName,
    };
    onUpdatePet(updated);
    setNewName(info.defaultName);
    showTemporaryFeedback(`Du hast ${info.title} (${info.defaultName}) ausgewählt!`);
  };

  const handleSaveName = () => {
    if (!newName.trim()) return;
    soundEffects.playClick();
    setIsEditingName(false);
    onUpdatePet({
      ...pet,
      name: newName.trim(),
    });
  };

  // Thought Bubble Text based on conditions
  const getThoughtBubble = () => {
    if (pet.hunger < 30) return `🍕 Knurr! Ich habe großen Hunger! Füttere mich bitte.`;
    if (pet.happiness < 35) return `🥺 Ich würde mich über etwas Zuneigung oder ein Leckerli freuen!`;
    if (pet.happiness > 80) return `🌟 ${pet.name} fühlt sich super! Bereit für die Prüfung!`;
    return `🐾 Hallo! Lass uns gemeinsam lernen!`;
  };

  // Count available food items in inventory
  const totalFoodInInventory = Object.values(pet.inventory.food).reduce((a, b) => a + b, 0);

  // Filter owned standard shop accessories
  const ownedShopAccessories = pet.inventory.accessories
    .filter(accId => !accId.startsWith('special_'))
    .map(accId => findAccessoryById(accId))
    .filter((a): a is PetAccessory => Boolean(a));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kapitelübersicht</span>
          </button>
        </div>
      )}

      {/* Pet Showcase Room Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs relative overflow-hidden transition-colors">
        {/* Top Room Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  maxLength={16}
                  className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSaveName}
                  className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{pet.name}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                  title="Name ändern"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  ({speciesInfo.title})
                </span>
              </div>
            )}
          </div>

          {/* User Currency Badge: Pure EXP Guthaben */}
          <div className="flex items-center gap-2.5 text-xs font-bold font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{xp} EXP verfügbar</span>
            </div>
          </div>
        </div>

        {/* Thought Bubble */}
        <div className="flex justify-center mb-2">
          <div className="relative bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs max-w-sm text-center">
            {getThoughtBubble()}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-100 dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700 rotate-45" />
          </div>
        </div>

        {/* Temporary Feedback Toast */}
        {feedbackMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
            {feedbackMsg}
          </div>
        )}

        {/* Pet Stage with Reactive PetAvatar */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          <PetAvatar pet={pet} isEating={isEating} isPetted={isPetted} size="lg" />

          {/* Interactive Care Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
            {/* Streicheln */}
            <button
              onClick={handlePet}
              className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Streicheln (+12 Laune)</span>
            </button>
          </div>
        </div>

        {/* 2 Vitals Gauges (Sättigung & Zufriedenheit) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          {/* Sättigung */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                <Utensils className="w-3.5 h-3.5" /> Sättigung (Hunger)
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                {pet.hunger}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  pet.hunger < 30
                    ? 'bg-rose-500'
                    : pet.hunger < 60
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${pet.hunger}%` }}
              />
            </div>
          </div>

          {/* Zufriedenheit */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-rose-500" /> Laune (Zufriedenheit)
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                {pet.happiness}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  pet.happiness < 30
                    ? 'bg-rose-500'
                    : pet.happiness < 60
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${pet.happiness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-850 rounded-xl text-xs font-semibold">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('care');
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'care'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Füttern ({totalFoodInInventory})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('shop');
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'shop'
              ? 'bg-indigo-600 text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>EXP-Shop</span>
        </button>

        {onGoToGames && (
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToGames();
            }}
            className="flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-xs hover:opacity-90"
            title="Spiele Speed-Quiz, Memory und Boss-Raid"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span>🎮 Quiz-Spiele</span>
          </button>
        )}

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('wardrobe');
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'wardrobe'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Kleiderschrank ({pet.inventory.accessories.length})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            if (onOpenAdoptionModal) {
              onOpenAdoptionModal();
            } else {
              setActiveTab('adopt');
            }
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'adopt'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tier wechseln</span>
        </button>
      </div>

      {/* 1. CARE TAB (Feed from Inventory) */}
      {activeTab === 'care' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Dein Futtervorrat</h3>
            <span className="text-xs text-slate-500">Tippe auf ein Essen, um {pet.name} zu füttern</span>
          </div>

          {totalFoodInInventory === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <p className="mb-3">Dein Vorrat ist leer!</p>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('shop');
                  setShopSubTab('food');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Im EXP-Shop Snacks kaufen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {PET_FOODS.map(food => {
                const qty = pet.inventory.food[food.id] || 0;
                if (qty === 0) return null;
                return (
                  <button
                    key={food.id}
                    onClick={() => handleFeed(food.id)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 bg-slate-50/50 dark:bg-slate-800/40 text-center transition-all group cursor-pointer"
                  >
                    <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{food.icon}</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{food.name}</div>
                    <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 mt-1 font-semibold">
                      {qty}x vorrätig
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      +{food.nutrition}% Sättigung
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. SHOP TAB (Spend EXP only) */}
      {activeTab === 'shop' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>EXP-Haustier-Shop</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Verdiene EXP im Quiz & rüste dein Haustier aus
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Alle Snacks und Accessoires werden direkt mit deinen verdienten <strong>EXP-Punkten</strong> gekauft.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setShopSubTab('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  shopSubTab === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Alles
              </button>
              <button
                onClick={() => setShopSubTab('food')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  shopSubTab === 'food'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Futter
              </button>
              <button
                onClick={() => setShopSubTab('accessories')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  shopSubTab === 'accessories'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Accessoires
              </button>
            </div>
          </div>

          {/* Exclusive Chapter Surprise Info Banner in Shop */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent border border-amber-300/40 dark:border-amber-700/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Exklusive Kapitel-Überraschungen
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Für jedes vollständig gelöste Kapitel erhält dein Haustier ein besonderes Item geschenkt, das es <strong>nicht im Shop</strong> zu kaufen gibt!
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('wardrobe')}
              className="shrink-0 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Im Schrank ansehen
            </button>
          </div>

          {/* StudyQuest Minigames Banner in EXP Shop */}
          {onGoToGames && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-transparent border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Brauchst du mehr EXP-Punkte?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Spiele die <strong>StudyQuest Minispiele</strong> (Speed-Quiz, Memory & Boss-Raid), um ruckzuck hunderte EXP zu verdienen!
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onGoToGames();
                }}
                className="shrink-0 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Minispiele starten</span>
              </button>
            </div>
          )}

          {/* Shop Items Grid */}
          <div className="space-y-6">
            {/* Food Section */}
            {(shopSubTab === 'all' || shopSubTab === 'food') && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Snacks & Mahlzeiten
                  </h4>
                  <span className="text-[11px] text-slate-400">Stillt Hunger und steigert Laune</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {PET_FOODS.map(f => {
                    const xpCost = f.xpPrice || Math.round(f.price * 0.8);
                    const canAffordXp = xp >= xpCost;

                    return (
                      <div
                        key={f.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-3xl mb-2">{f.icon}</div>
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white">{f.name}</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {f.description}
                          </p>
                          <div className="text-[10px] text-slate-400 mt-2">
                            +{f.nutrition}% Sättigung · +{f.happiness}% Laune
                          </div>
                        </div>

                        {/* Single EXP Buy Button */}
                        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-750">
                          <button
                            onClick={() => handleBuyFood(f)}
                            disabled={!canAffordXp}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                              canAffordXp
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs active:scale-98'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              {canAffordXp ? 'Kaufen' : 'Zu wenig EXP'}
                            </span>
                            <span className="font-mono">{xpCost} EXP</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Accessories Section */}
            {(shopSubTab === 'all' || shopSubTab === 'accessories') && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Accessoires, Hüte & Brillen
                  </h4>
                  <span className="text-[11px] text-slate-400">Wird nach dem Kauf direkt angezogen</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {PET_ACCESSORIES.map(acc => {
                    const isOwned = pet.inventory.accessories.includes(acc.id);
                    const xpCost = acc.xpPrice || Math.round(acc.price * 0.8);
                    const canAffordXp = xp >= xpCost;

                    return (
                      <div
                        key={acc.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-3xl mb-2">{acc.icon}</div>
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">{acc.name}</h5>
                            <span className="text-[10px] text-slate-400 uppercase font-mono">
                              {acc.category === 'head' ? 'Kopf' : acc.category === 'face' ? 'Gesicht' : 'Hals'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {acc.description}
                          </p>
                        </div>

                        {/* Single EXP Buy or Owned button */}
                        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-750">
                          {isOwned ? (
                            <button
                              onClick={() => handleToggleEquip(acc)}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                                pet.equipped[acc.category] === acc.id
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                              }`}
                            >
                              {pet.equipped[acc.category] === acc.id ? '✓ Angelegt (Ablegen)' : 'Im Besitz (Anlegen)'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBuyAccessory(acc)}
                              disabled={!canAffordXp}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                                canAffordXp
                                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs active:scale-98'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                {canAffordXp ? 'Kaufen' : 'Zu wenig EXP'}
                              </span>
                              <span className="font-mono">{xpCost} EXP</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. WARDROBE TAB (Special Chapter Surprises + Shop Accessories) */}
      {activeTab === 'wardrobe' && (
        <div className="space-y-6">
          {/* Section 1: Exclusive Chapter Surprises */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Exklusive Kapitel-Überraschungen
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gibt es nicht im Shop zu kaufen – wird automatisch beim Bestehen eines Kapitels freigeschaltet!
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                {CHAPTER_SURPRISES.filter(s => pet.inventory.accessories.includes(s.accessory.id)).length} von {CHAPTER_SURPRISES.length} freigeschaltet
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {CHAPTER_SURPRISES.map(surprise => {
                const isUnlocked = pet.inventory.accessories.includes(surprise.accessory.id);
                const isEquipped = pet.equipped[surprise.accessory.category] === surprise.accessory.id;

                if (isUnlocked) {
                  return (
                    <div
                      key={surprise.accessory.id}
                      className="p-4 rounded-xl border border-amber-300/60 dark:border-amber-800/60 bg-gradient-to-br from-amber-50/50 via-white to-indigo-50/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-indigo-950/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-3xl">{surprise.accessory.icon}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700">
                            Kapitel {surprise.chapterNumber}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {surprise.accessory.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {surprise.accessory.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-amber-200/50 dark:border-amber-900/40">
                        <button
                          onClick={() => handleToggleEquip(surprise.accessory)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isEquipped
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                          }`}
                        >
                          {isEquipped ? '✓ Angelegt (Ablegen)' : 'Anlegen'}
                        </button>
                      </div>
                    </div>
                  );
                }

                // Locked Surprise Card
                return (
                  <div
                    key={surprise.accessory.id}
                    className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 opacity-75 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="relative">
                          <span className="text-3xl filter grayscale opacity-40">
                            {surprise.accessory.icon}
                          </span>
                          <Lock className="w-4 h-4 text-slate-400 absolute -top-1 -right-1" />
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                          Kapitel {surprise.chapterNumber}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {surprise.accessory.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                        {surprise.unlockRequirement}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="text-center py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-400 dark:text-slate-500 text-[11px] font-medium flex items-center justify-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        <span>Kapitel noch nicht abgeschlossen</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Purchased Shop Accessories */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Gekaufte Shop-Accessoires & Hüte
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {ownedShopAccessories.length} im Besitz
              </span>
            </div>

            {ownedShopAccessories.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                <p className="mb-3">Du hast noch keine Shop-Accessoires gekauft!</p>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveTab('shop');
                    setShopSubTab('accessories');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Im EXP-Shop stöbern
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ownedShopAccessories.map(acc => {
                  const isEquipped = pet.equipped[acc.category] === acc.id;

                  return (
                    <button
                      key={acc.id}
                      onClick={() => handleToggleEquip(acc)}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isEquipped
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl mb-1">{acc.icon}</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{acc.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1 uppercase font-mono">
                        {isEquipped ? '✓ Angelegt' : 'Abgelegt'}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. ADOPT TAB (Switch Companion) */}
      {activeTab === 'adopt' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Lern-Begleiter wechseln</h3>
            <span className="text-xs text-slate-500">Dein Fortschritt und Inventar bleiben erhalten!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['dog', 'cat', 'penguin', 'axolotl'] as PetSpecies[]).map(s => {
              const info = PET_SPECIES[s];
              const isCurrent = pet.species === s;
              const emojiMap: Record<PetSpecies, string> = {
                dog: '🐶',
                cat: '🐱',
                penguin: '🐧',
                axolotl: '🦎',
              };

              return (
                <div
                  key={s}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{emojiMap[s]}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {info.defaultName} · {info.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {info.description}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdopt(s)}
                    disabled={isCurrent}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {isCurrent ? 'Aktiv' : 'Wählen'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
