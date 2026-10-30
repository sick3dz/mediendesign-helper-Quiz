import React, { useState, useEffect } from 'react';
import {
  PetState,
  PetSpecies,
  UserStats,
  PetAccessory,
  PetFood,
  CosmeticItem,
  EquippedCosmetics,
  CosmeticCategory,
} from '../types/quiz';
import {
  PET_SPECIES,
  PET_FOODS,
  PET_ACCESSORIES,
  CHAPTER_SURPRISES,
  findAccessoryById,
  PET_SPECIES_SOUNDS,
  getDynamicPetThought,
} from '../data/petData';
import {
  COSMETIC_THEMES,
  COSMETIC_SOUNDPACKS,
  COSMETIC_TITLES,
  COSMETIC_FRAMES,
  ALL_COSMETICS,
  findCosmeticById,
} from '../data/cosmeticsData';
import { calculateLevel, LEVEL_LADDER, LevelTier } from '../services/storageService';
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
  Volume2,
  Palette,
  Tag,
  CircleDot,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp,
  Trophy,
  Gift,
  Eye,
  X,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  initialTab?: 'care' | 'shop' | 'wardrobe' | 'adopt';
  onUpdatePet: (updatedPet: PetState) => void;
  onCoinsChange?: (newCoins: number) => void;
  onXpChange?: (newXp: number) => void;
  onUpdateCosmetics?: (unlocked: string[], equipped: EquippedCosmetics) => void;
  onOpenAdoptionModal?: () => void;
  onGoToGames?: () => void;
  onBack?: () => void;
  onPreviewOverrideChange?: (preview: { equipped?: Partial<PetState['equipped']> } | undefined) => void;
}

type ShopCategory = 'food' | 'accessories' | 'themes' | 'soundpacks' | 'titles' | 'frames';
type WardrobeCategory = 'accessories' | 'themes' | 'soundpacks' | 'titles' | 'frames';

export const VirtualPetView: React.FC<Props> = ({
  stats,
  initialTab = 'care',
  onUpdatePet,
  onCoinsChange,
  onXpChange,
  onUpdateCosmetics,
  onOpenAdoptionModal,
  onGoToGames,
  onBack,
  onPreviewOverrideChange,
}) => {
  const { pet, xp, coins = 0 } = stats;
  const speciesInfo = PET_SPECIES[pet.species];

  const [activeTab, setActiveTab] = useState<'care' | 'shop' | 'wardrobe' | 'adopt'>(initialTab);
  const [shopCategory, setShopCategory] = useState<ShopCategory>('food');
  const [wardrobeCategory, setWardrobeCategory] = useState<WardrobeCategory>('accessories');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(pet.name);
  const [isEating, setIsEating] = useState(false);
  const [isPetted, setIsPetted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [isRoadmapExpanded, setIsRoadmapExpanded] = useState(false);
  const [previewThemeId, setPreviewThemeId] = useState<string | null>(null);
  const [previewAccessory, setPreviewAccessory] = useState<PetAccessory | null>(null);
  const [previewFrame, setPreviewFrame] = useState<CosmeticItem | null>(null);
  const [thoughtSeed, setThoughtSeed] = useState(0);

  // Sync live accessory & frame preview to external listener (TopBar companion)
  useEffect(() => {
    if (onPreviewOverrideChange) {
      if (!previewAccessory && !previewFrame) {
        onPreviewOverrideChange(undefined);
      } else {
        onPreviewOverrideChange({
          equipped: {
            ...(previewAccessory ? { [previewAccessory.category]: previewAccessory.id } : {}),
            ...(previewFrame ? { frame: previewFrame.id } : {}),
          },
        });
      }
    }
  }, [previewAccessory, previewFrame, onPreviewOverrideChange]);

  // Level & progression are strictly tied to lifetime earned EXP (never decreases when spending!)
  const lifetimeProgressXp = stats.lifetimeXp ?? Math.max(xp, LEVEL_LADDER.find(l => l.level === (stats.level || 1))?.xp || 0);
  const levelInfo = calculateLevel(lifetimeProgressXp);

  const unlockedCosmetics = stats.unlockedCosmetics || ['theme-default', 'sound-standard', 'title-novice', 'frame-none'];
  const equippedCosmetics = stats.equippedCosmetics || {
    theme: 'theme-default',
    soundpack: 'sound-standard',
    title: 'title-novice',
    frame: 'frame-none',
  };

  // Sync initialTab when changed externally
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Auto-rotate pet thought bubble every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setThoughtSeed(prev => prev + 1);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Live theme preview effect
  useEffect(() => {
    const allThemes = [
      'theme-default',
      'theme-emerald',
      'theme-sunset',
      'theme-nordic',
      'theme-cyberpunk',
      'theme-gold',
      'theme-monochrome',
    ];

    if (!previewThemeId) {
      const activeTheme = equippedCosmetics.theme || 'theme-default';
      document.documentElement.classList.remove(...allThemes);
      if (activeTheme !== 'theme-default') {
        document.documentElement.classList.add(activeTheme);
      }
      return;
    }

    document.documentElement.classList.remove(...allThemes);
    if (previewThemeId !== 'theme-default') {
      document.documentElement.classList.add(previewThemeId);
    }

    return () => {
      const activeTheme = equippedCosmetics.theme || 'theme-default';
      document.documentElement.classList.remove(...allThemes);
      if (activeTheme !== 'theme-default') {
        document.documentElement.classList.add(activeTheme);
      }
    };
  }, [previewThemeId, equippedCosmetics.theme]);

  const handleTogglePreviewTheme = (themeId: string) => {
    soundEffects.playClick();
    if (previewThemeId === themeId) {
      setPreviewThemeId(null);
      showTemporaryFeedback('Theme-Vorschau beendet.');
    } else {
      setPreviewThemeId(themeId);
      const targetTheme = COSMETIC_THEMES.find(t => t.id === themeId);
      showTemporaryFeedback(`👁️ Live-Vorschau für "${targetTheme?.name || themeId}" aktiv!`);
    }
  };

  const handleTogglePreviewAccessory = (acc: PetAccessory) => {
    soundEffects.playClick();
    if (previewAccessory?.id === acc.id) {
      setPreviewAccessory(null);
      showTemporaryFeedback('Accessoire-Vorschau beendet.');
    } else {
      setPreviewAccessory(acc);
      showTemporaryFeedback(`👁️ Live-Vorschau: "${acc.name}" auf ${pet.name} anprobiert!`);
    }
  };

  const handleTogglePreviewFrame = (frame: CosmeticItem) => {
    soundEffects.playClick();
    if (previewFrame?.id === frame.id) {
      setPreviewFrame(null);
      showTemporaryFeedback('Rahmen-Vorschau beendet.');
    } else {
      setPreviewFrame(frame);
      showTemporaryFeedback(`👁️ Live-Vorschau: Rahmen "${frame.name}" anprobiert!`);
    }
  };

  const showTemporaryFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const soundConfig = PET_SPECIES_SOUNDS[pet.species];

  // 1. Petting interaction (wakes up pet if sleeping!)
  const handlePet = () => {
    soundEffects.playPetForSpecies(pet.species);
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 1000);

    const wasSleeping = Boolean(pet.isSleeping);
    const newHappiness = Math.min(100, pet.happiness + 15);
    const updated: PetState = {
      ...pet,
      isSleeping: false, // Wakes up happily!
      happiness: newHappiness,
      timesPetted: pet.timesPetted + 1,
    };
    onUpdatePet(updated);

    if (wasSleeping) {
      showTemporaryFeedback(soundConfig.wakeUpMsg(pet.name));
    } else {
      showTemporaryFeedback(`${soundConfig.soundIcon} "${soundConfig.soundWord}" – ${soundConfig.petActionMsg(pet.name)}`);
    }
  };

  // 2. Gentle Wakeup Action
  const handleWakeUp = () => {
    soundEffects.playPetForSpecies(pet.species);
    const updated: PetState = {
      ...pet,
      isSleeping: false,
      happiness: Math.min(100, pet.happiness + 20),
    };
    onUpdatePet(updated);
    showTemporaryFeedback(soundConfig.wakeUpMsg(pet.name));
  };

  // 3. Feeding from inventory (also gently wakes up)
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
      isSleeping: false, // Eating wakes pet up
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

  // 4. Buying Food (strictly using EXP points)
  const handleBuyFood = (food: PetFood) => {
    const cost = food.xpPrice || Math.round(food.price * 0.8);

    if (xp < cost) {
      soundEffects.playWrong();
      showTemporaryFeedback(`Nicht genug EXP! Du benötigst ${cost} EXP.`);
      return;
    }

    soundEffects.playCoin();
    if (onXpChange) {
      onXpChange(xp - cost);
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
    showTemporaryFeedback(`1x ${food.name} gekauft! (-${cost} EXP)`);
  };

  // 5. Buying Pet Accessory (Hüte, Brillen, etc. - strictly using EXP points)
  const handleBuyAccessory = (acc: PetAccessory) => {
    const cost = acc.xpPrice || Math.round(acc.price * 0.8);

    if (xp < cost) {
      soundEffects.playWrong();
      showTemporaryFeedback(`Nicht genug EXP! Du benötigst ${cost} EXP.`);
      return;
    }

    soundEffects.playCoin();
    if (onXpChange) {
      onXpChange(xp - cost);
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
        [acc.category]: acc.id, // Auto-equip
      },
      inventory: {
        ...pet.inventory,
        accessories: [...pet.inventory.accessories, acc.id],
      },
    };
    if (previewAccessory?.id === acc.id) setPreviewAccessory(null);
    onUpdatePet(updated);
    showTemporaryFeedback(`🎉 ${acc.name} für ${cost} EXP gekauft und angelegt!`);
  };

  // 6. Buying Cosmetic Item (Themes, Soundpacks, Titles, Frames - strictly using EXP points)
  const handleBuyCosmetic = (item: CosmeticItem) => {
    const cost = item.priceXp;

    if (xp < cost) {
      soundEffects.playWrong();
      showTemporaryFeedback(`Nicht genug EXP! Du benötigst ${cost} EXP.`);
      return;
    }

    soundEffects.playCoin();
    if (onXpChange) {
      onXpChange(xp - cost);
    }

    try {
      confetti({ particleCount: 65, spread: 75 });
    } catch {
      // ignore
    }

    const nextUnlocked = Array.from(new Set([...unlockedCosmetics, item.id]));
    const nextEquipped = {
      ...equippedCosmetics,
      [item.category]: item.id,
    };

    if (item.category === 'frame') {
      if (previewFrame?.id === item.id) setPreviewFrame(null);
      onUpdatePet({
        ...pet,
        equipped: {
          ...pet.equipped,
          frame: item.id,
        },
      });
    }

    if (onUpdateCosmetics) {
      onUpdateCosmetics(nextUnlocked, nextEquipped);
    }

    showTemporaryFeedback(`✨ ${item.name} für ${cost} EXP freigeschaltet und aktiviert!`);
  };

  // 7. Equipping / Unequipping Cosmetics
  const handleEquipCosmetic = (item: CosmeticItem) => {
    soundEffects.playClick();
    const isCurrentlyEquipped = equippedCosmetics[item.category] === item.id;
    const defaultIds: Record<CosmeticCategory, string> = {
      theme: 'theme-default',
      soundpack: 'sound-standard',
      title: 'title-novice',
      frame: 'frame-none',
    };

    const nextEquipped = {
      ...equippedCosmetics,
      [item.category]: isCurrentlyEquipped ? defaultIds[item.category] : item.id,
    };

    if (item.category === 'frame') {
      if (previewFrame?.id === item.id) setPreviewFrame(null);
      onUpdatePet({
        ...pet,
        equipped: {
          ...pet.equipped,
          frame: isCurrentlyEquipped ? 'frame-none' : item.id,
        },
      });
    }

    if (onUpdateCosmetics) {
      onUpdateCosmetics(unlockedCosmetics, nextEquipped);
    }

    showTemporaryFeedback(
      isCurrentlyEquipped ? `${item.name} abgelegt.` : `${item.name} als aktiv gesetzt!`
    );
  };

  // 8. Toggle Pet Accessory
  const handleToggleAccessory = (acc: PetAccessory) => {
    soundEffects.playClick();
    if (previewAccessory?.id === acc.id) setPreviewAccessory(null);
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

  // Preview soundpack
  const handlePreviewSound = (packId: string) => {
    const currentPack = soundEffects.getSoundpack();
    soundEffects.setSoundpack(packId);
    soundEffects.playClick();
    setTimeout(() => {
      soundEffects.playCorrect(2);
      soundEffects.setSoundpack(currentPack);
    }, 150);
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

  // Dynamic Thought Bubble
  const getThoughtBubble = () => {
    return getDynamicPetThought(pet, xp, thoughtSeed);
  };

  const totalFoodInInventory = Object.values(pet.inventory.food).reduce((a, b) => a + b, 0);

  const ownedShopAccessories = pet.inventory.accessories
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
            <span>Zurück zur Übersicht</span>
          </button>
        </div>
      )}

      {/* Prominent Level & Rewards Roadmap Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs transition-colors space-y-4">
        {/* Level Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-2xl shadow-2xs shrink-0">
              <span>{levelInfo.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Aktueller Rang
                </span>
                <span className="text-xs font-mono font-bold px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  Level {levelInfo.level}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {levelInfo.title}
              </h3>
            </div>
          </div>

          {/* Next Level & EXP Remaining Badge */}
          <div className="flex flex-col sm:items-end text-xs">
            {levelInfo.isMaxLevel ? (
              <span className="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 font-mono">
                <Trophy className="w-4 h-4" /> Maximaler Rang erreicht! 👑
              </span>
            ) : (
              <>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <span className="text-slate-400">Nächstes Ziel:</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Level {levelInfo.nextTier?.level} ({levelInfo.nextTier?.title})
                  </span>
                </div>
                <span className="text-[11px] font-mono font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
                  Noch {levelInfo.xpNeededForNext} ⚡ EXP benötigt
                </span>
              </>
            )}
          </div>
        </div>

        {/* EXP Progress Bar & Stats */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span>Rang-Fortschritt:</span>
              <strong className="text-slate-900 dark:text-white tabular-nums">{lifetimeProgressXp}</strong> / {levelInfo.nextLevelXp} EXP
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-md border border-indigo-200/80 dark:border-indigo-800" title="Dieses Guthaben kannst du für Snacks und Zubehör ausgeben, ohne dein Level zu senken">
                Guthaben: <strong className="tabular-nums">{xp}</strong> ⚡ EXP
              </span>
              <span className="tabular-nums text-indigo-600 dark:text-indigo-400 font-extrabold">
                {levelInfo.progressPercent}%
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-amber-500 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Next Level Rewards Preview Banner */}
        {levelInfo.nextTier && (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-amber-50/70 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-amber-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  Belohnung bei Level {levelInfo.nextTier.level}:
                </span>{' '}
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {levelInfo.nextTier.rewardDescription}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                setIsRoadmapExpanded(prev => !prev);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors cursor-pointer self-start sm:self-auto shrink-0 whitespace-nowrap"
            >
              <span>{isRoadmapExpanded ? 'Stufenleiter minimieren' : 'Alle 7 Stufen ansehen'}</span>
              {isRoadmapExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Expandable Level Ladder Drawer */}
        {isRoadmapExpanded && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-in fade-in duration-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Vollständiger Lern- & Belohnungspfad (Level 1 bis 7)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LEVEL_LADDER.map(tier => {
                const isCurrent = tier.level === levelInfo.level;
                const isPassed = xp >= tier.xp;

                return (
                  <div
                    key={tier.level}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                        : isPassed
                        ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
                        : 'bg-white dark:bg-slate-900/60 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <span className="text-2xl select-none shrink-0 mt-0.5">{tier.icon}</span>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                          Lvl {tier.level}: {tier.title}
                        </span>
                        {isCurrent ? (
                          <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-indigo-600 text-white shrink-0">
                            Aktuell ★
                          </span>
                        ) : isPassed ? (
                          <span className="text-[9px] font-bold font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 shrink-0">
                            <Check className="w-3 h-3" /> Erreicht
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold font-mono text-slate-400 shrink-0">
                            {tier.xp} EXP
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-snug">
                        🎁 {tier.rewardDescription}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Pet Showcase Room Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors">
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
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{pet.name}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                  title="Name ändern"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                  · {speciesInfo.title}
                </span>
                {equippedCosmetics.title && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                    {findCosmeticById(equippedCosmetics.title)?.name || 'IHK-Prüfling'}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* User Currency Badge: strictly EXP Guthaben */}
          <div className="flex items-center text-xs font-bold font-mono">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-2xs"
              title="Dein verfügbares EXP-Guthaben zum Füttern und Einkleiden deines Haustiers"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span className="tabular-nums font-black text-sm">{xp}</span>
              <span className="text-[11px] font-semibold text-indigo-600/80 dark:text-indigo-400/80">EXP-Guthaben</span>
            </div>
          </div>
        </div>

        {/* Peaceful Sleep Peaceful Banner */}
        {pet.isSleeping && (
          <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-indigo-200">
              <div className="p-2 rounded-xl bg-indigo-800/50 text-indigo-300">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-white">Schläft friedlich 💤</span>
                <p className="text-[11px] text-indigo-200/80 mt-0.5">
                  Dein Haustier kann nicht sterben! Es ruht sich ohne jede Strafe aus.
                </p>
              </div>
            </div>
            <button
              onClick={handleWakeUp}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              Sanft aufwecken ☀️
            </button>
          </div>
        )}

        {/* Dynamic Auto-Rotating Thought Bubble */}
        <div className="flex justify-center mb-3">
          <button
            type="button"
            onClick={() => setThoughtSeed(prev => prev + 1)}
            className="relative bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs max-w-md text-center transition-all cursor-pointer active:scale-98 group"
            title="Nächster Gedanke"
          >
            <span className="leading-relaxed">{getThoughtBubble()}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200/80 dark:group-hover:bg-slate-700/80 border-r border-b border-slate-200 dark:border-slate-700 rotate-45 transition-colors" />
          </button>
        </div>

        {/* Temporary Feedback Toast */}
        {feedbackMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-indigo-600 text-white text-xs font-extrabold rounded-full shadow-lg animate-bounce">
            {feedbackMsg}
          </div>
        )}

        {/* Pet Stage with Reactive PetAvatar */}
        <div className="relative py-6 flex flex-col items-center justify-center">
          {isPetted && (
            <div className="absolute top-0 z-20 px-4 py-1.5 bg-amber-400 text-slate-900 font-black text-sm rounded-2xl shadow-lg border-2 border-amber-300 animate-bounce flex items-center gap-1.5 pointer-events-none">
              <span className="text-base">{soundConfig.soundIcon}</span>
              <span>"{soundConfig.soundWord}"</span>
            </div>
          )}
          <PetAvatar
            pet={pet}
            isEating={isEating}
            isPetted={isPetted}
            size="lg"
            equippedCosmetics={equippedCosmetics}
            previewOverride={{
              equipped: {
                ...(previewAccessory ? { [previewAccessory.category]: previewAccessory.id } : {}),
                ...(previewFrame ? { frame: previewFrame.id } : {}),
              },
            }}
          />

          {/* Interactive Care Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            <button
              onClick={handlePet}
              className="px-4 py-2 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{pet.isSleeping ? 'Wecken & Streicheln' : 'Streicheln (+15 Laune)'}</span>
            </button>
          </div>
        </div>

        {/* Vitals Gauges (Sättigung & Zufriedenheit - with safe immortality floors) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                <Utensils className="w-3.5 h-3.5" /> Sättigung
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                {pet.hunger}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  pet.hunger < 35 ? 'bg-amber-600' : 'bg-amber-500'
                }`}
                style={{ width: `${pet.hunger}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-rose-500" /> Zufriedenheit
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                {pet.happiness}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${pet.happiness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('care');
          }}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'care'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5 shrink-0" />
          <span>Füttern ({totalFoodInInventory})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('shop');
          }}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'shop'
              ? 'bg-indigo-600 text-white shadow-xs font-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Belohnungs-Shop</span>
        </button>

        {onGoToGames && (
          <button
            onClick={() => {
              soundEffects.playClick();
              onGoToGames();
            }}
            className="py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 shadow-2xs"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Quiz-Spiele</span>
          </button>
        )}

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('wardrobe');
          }}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'wardrobe'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Shirt className="w-3.5 h-3.5 shrink-0" />
          <span>Kleiderschrank & Stil</span>
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
          className={`col-span-2 sm:col-span-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'adopt'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 shrink-0" />
          <span>Tier wechseln</span>
        </button>
      </div>

      {/* 1. CARE TAB (Feed from Inventory) */}
      {activeTab === 'care' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Dein Futtervorrat</h3>
            <span className="text-xs text-slate-500">Tippe auf ein Essen, um {pet.name} zu verwöhnen</span>
          </div>

          {totalFoodInInventory === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-3xl">🥪</span>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Dein Vorrat ist leer!
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Hol dir im Belohnungs-Shop leckere Snacks mit deinen verdienten EXP-Punkten.
              </p>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('shop');
                  setShopCategory('food');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zum Shop für Snacks</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PET_FOODS.map(food => {
                const qty = pet.inventory.food[food.id] || 0;
                if (qty === 0) return null;
                return (
                  <button
                    key={food.id}
                    onClick={() => handleFeed(food.id)}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{food.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {food.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          +{food.nutrition} Sättigung
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-mono text-[11px] font-bold">
                      x{qty}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. REWARD SHOP TAB (Categorized & Dual Currency) */}
      {activeTab === 'shop' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          {/* Shop Categories Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <button
              onClick={() => {
                soundEffects.playClick();
                setShopCategory('food');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'food'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Futter & Snacks</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShopCategory('accessories');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'accessories'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Tier-Accessoires</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShopCategory('themes');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'themes'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Farbthemen</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShopCategory('soundpacks');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'soundpacks'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Soundpacks</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShopCategory('titles');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'titles'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Lern-Titel</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setShopCategory('frames');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'frames'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Animierte Pet-Rahmen</span>
            </button>
          </div>

          {/* SHOP: 1. Food Sub-tab */}
          {shopCategory === 'food' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PET_FOODS.map(food => {
                const qty = pet.inventory.food[food.id] || 0;
                const xpCost = food.xpPrice || Math.round(food.price * 0.8);
                const canAffordXp = xp >= xpCost;

                return (
                  <div
                    key={food.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{food.icon}</span>
                        {qty > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                            {qty} im Vorrat
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {food.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {food.description}
                      </p>
                      <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-1.5">
                        +{food.nutrition}% Sättigung · +{food.happiness}% Laune
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      <button
                        onClick={() => handleBuyFood(food)}
                        disabled={!canAffordXp}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                          canAffordXp
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                            : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span>{xpCost} EXP kaufen</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SHOP: 2. Accessories Sub-tab */}
          {shopCategory === 'accessories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PET_ACCESSORIES.map(acc => {
                const isOwned = pet.inventory.accessories.includes(acc.id);
                const isEquipped = pet.equipped[acc.category] === acc.id;
                const isPreviewActive = previewAccessory?.id === acc.id;
                const xpCost = acc.xpPrice || Math.round(acc.price * 0.8);
                const canAffordXp = xp >= xpCost;

                return (
                  <div
                    key={acc.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isPreviewActive
                        ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{acc.icon}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePreviewAccessory(acc)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                              isPreviewActive
                                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                                : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200/80 dark:border-indigo-800/80'
                            }`}
                            title="Accessoire live anprobieren"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isPreviewActive ? 'Anprobiert' : 'Anprobieren 👁️'}</span>
                          </button>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {acc.category}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {acc.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {acc.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      {isOwned ? (
                        <button
                          onClick={() => {
                            handleToggleAccessory(acc);
                            setPreviewAccessory(null);
                          }}
                          className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isEquipped
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEquipped ? 'Ausgerüstet' : 'Anziehen'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleBuyAccessory(acc);
                            setPreviewAccessory(null);
                          }}
                          disabled={!canAffordXp}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            canAffordXp
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                              : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{xpCost} EXP freischalten</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SHOP: 3. Themes Sub-tab */}
          {shopCategory === 'themes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COSMETIC_THEMES.map(item => {
                const isOwned = unlockedCosmetics.includes(item.id);
                const isEquipped = equippedCosmetics.theme === item.id;
                const isPreviewActive = previewThemeId === item.id;
                const canAffordXp = xp >= item.priceXp;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isPreviewActive
                        ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePreviewTheme(item.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                              isPreviewActive
                                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                                : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200/80 dark:border-indigo-800/80'
                            }`}
                            title="Theme live auf der ganzen Seite testen"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isPreviewActive ? 'Vorschau aktiv' : 'Vorschau 👁️'}</span>
                          </button>
                          <div
                            className={`w-5 h-5 rounded-full bg-gradient-to-tr ${item.previewClass} border border-white dark:border-slate-700 shadow-xs`}
                          />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      {isOwned ? (
                        <button
                          onClick={() => {
                            handleEquipCosmetic(item);
                            setPreviewThemeId(null);
                          }}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            isEquipped
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEquipped ? 'Aktiviertes Thema' : 'Thema anwenden'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleBuyCosmetic(item);
                            setPreviewThemeId(null);
                          }}
                          disabled={!canAffordXp}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            canAffordXp
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                              : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{item.priceXp === 0 ? 'Gratis freischalten' : `${item.priceXp} EXP freischalten`}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SHOP: 4. Soundpacks Sub-tab */}
          {shopCategory === 'soundpacks' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COSMETIC_SOUNDPACKS.map(item => {
                const isOwned = unlockedCosmetics.includes(item.id);
                const isEquipped = equippedCosmetics.soundpack === item.id;
                const canAffordXp = xp >= item.priceXp;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <button
                          onClick={() => handlePreviewSound(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Hörprobe 🔊</span>
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      {isOwned ? (
                        <button
                          onClick={() => handleEquipCosmetic(item)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            isEquipped
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEquipped ? 'Aktiver Soundpack' : 'Soundpack nutzen'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyCosmetic(item)}
                          disabled={!canAffordXp}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            canAffordXp
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                              : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{item.priceXp === 0 ? 'Gratis freischalten' : `${item.priceXp} EXP freischalten`}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SHOP: 5. Titles Sub-tab */}
          {shopCategory === 'titles' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COSMETIC_TITLES.map(item => {
                const isOwned = unlockedCosmetics.includes(item.id);
                const isEquipped = equippedCosmetics.title === item.id;
                const canAffordXp = xp >= item.priceXp;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                          {item.tier}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      {isOwned ? (
                        <button
                          onClick={() => handleEquipCosmetic(item)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            isEquipped
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEquipped ? 'Ausgerüsteter Titel' : 'Titel tragen'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyCosmetic(item)}
                          disabled={!canAffordXp}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            canAffordXp
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                              : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{item.priceXp === 0 ? 'Gratis freischalten' : `${item.priceXp} EXP freischalten`}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SHOP: 6. Frames Sub-tab */}
          {shopCategory === 'frames' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COSMETIC_FRAMES.map(item => {
                const isOwned = unlockedCosmetics.includes(item.id);
                const isEquipped = pet.equipped.frame === item.id;
                const isPreviewActive = previewFrame?.id === item.id;
                const canAffordXp = xp >= item.priceXp;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isPreviewActive
                        ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePreviewFrame(item)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                              isPreviewActive
                                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                                : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200/80 dark:border-indigo-800/80'
                            }`}
                            title="Rahmen live anprobieren"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isPreviewActive ? 'Anprobiert' : 'Anprobieren 👁️'}</span>
                          </button>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
                            {item.tier}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      {isOwned ? (
                        <button
                          onClick={() => {
                            handleEquipCosmetic(item);
                            setPreviewFrame(null);
                          }}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            isEquipped
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEquipped ? 'Aktiver Rahmen' : 'Rahmen anlegen'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleBuyCosmetic(item);
                            setPreviewFrame(null);
                          }}
                          disabled={!canAffordXp}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            canAffordXp
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                              : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{item.priceXp === 0 ? 'Gratis freischalten' : `${item.priceXp} EXP freischalten`}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. WARDROBE & STYLE STUDIO */}
      {activeTab === 'wardrobe' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Dein Stil- & Ausrüstungs-Atelier
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
              {(['accessories', 'themes', 'soundpacks', 'titles', 'frames'] as WardrobeCategory[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEffects.playClick();
                    setWardrobeCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-xl cursor-pointer transition-all ${
                    wardrobeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'accessories' && 'Accessoires'}
                  {cat === 'themes' && 'Themen'}
                  {cat === 'soundpacks' && 'Sounds'}
                  {cat === 'titles' && 'Titel'}
                  {cat === 'frames' && 'Rahmen'}
                </button>
              ))}
            </div>
          </div>

          {wardrobeCategory === 'accessories' && (
            <div>
              {ownedShopAccessories.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  Du besitzt noch keine Tier-Accessoires. Besuche den Belohnungs-Shop!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ownedShopAccessories.map(acc => {
                    const isEquipped = pet.equipped[acc.category] === acc.id;
                    const isPreviewActive = previewAccessory?.id === acc.id;
                    return (
                      <div
                        key={acc.id}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isPreviewActive
                            ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                            : isEquipped
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span className="text-2xl shrink-0">{acc.icon}</span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {acc.name}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate">
                              {acc.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleTogglePreviewAccessory(acc)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isPreviewActive
                                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 font-extrabold'
                                : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100'
                            }`}
                            title="Accessoire live anprobieren"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isPreviewActive ? 'Anprobiert' : 'Anprobieren'}</span>
                          </button>

                          <button
                            onClick={() => {
                              handleToggleAccessory(acc);
                              setPreviewAccessory(null);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              isEquipped
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            {isEquipped ? <Check className="w-3.5 h-3.5" /> : null}
                            <span>{isEquipped ? 'Aktiv' : 'Anziehen'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {wardrobeCategory === 'themes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COSMETIC_THEMES.filter(t => unlockedCosmetics.includes(t.id)).map(item => {
                const isEquipped = equippedCosmetics.theme === item.id;
                const isPreviewActive = previewThemeId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isPreviewActive
                        ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                        : isEquipped
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{item.description}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleTogglePreviewTheme(item.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isPreviewActive
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 font-extrabold'
                            : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100'
                        }`}
                        title="Theme live testen"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{isPreviewActive ? 'Vorschau' : 'Vorschau'}</span>
                      </button>

                      <button
                        onClick={() => {
                          handleEquipCosmetic(item);
                          setPreviewThemeId(null);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          isEquipped
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isEquipped ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{isEquipped ? 'Aktiv' : 'Anwenden'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {wardrobeCategory === 'soundpacks' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COSMETIC_SOUNDPACKS.filter(s => unlockedCosmetics.includes(s.id)).map(item => {
                const isEquipped = equippedCosmetics.soundpack === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleEquipCosmetic(item)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isEquipped
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500">{item.description}</div>
                      </div>
                    </div>
                    {isEquipped && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {wardrobeCategory === 'titles' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COSMETIC_TITLES.filter(t => unlockedCosmetics.includes(t.id)).map(item => {
                const isEquipped = equippedCosmetics.title === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleEquipCosmetic(item)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isEquipped
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500">{item.description}</div>
                      </div>
                    </div>
                    {isEquipped && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {wardrobeCategory === 'frames' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COSMETIC_FRAMES.filter(f => unlockedCosmetics.includes(f.id)).map(item => {
                const isEquipped = pet.equipped.frame === item.id;
                const isPreviewActive = previewFrame?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isPreviewActive
                        ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                        : isEquipped
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{item.description}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleTogglePreviewFrame(item)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isPreviewActive
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 font-extrabold'
                            : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100'
                        }`}
                        title="Rahmen live anprobieren"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{isPreviewActive ? 'Anprobiert' : 'Anprobieren'}</span>
                      </button>

                      <button
                        onClick={() => {
                          handleEquipCosmetic(item);
                          setPreviewFrame(null);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          isEquipped
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isEquipped ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{isEquipped ? 'Aktiv' : 'Anlegen'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Floating Live Preview Control Bar (Themes, Accessories & Animated Frames) */}
      {(() => {
        const activePreviewData = previewThemeId
          ? {
              type: 'theme' as const,
              name: COSMETIC_THEMES.find(t => t.id === previewThemeId)?.name || 'Design-Thema',
              icon: COSMETIC_THEMES.find(t => t.id === previewThemeId)?.icon || '🎨',
              priceXp: COSMETIC_THEMES.find(t => t.id === previewThemeId)?.priceXp || 0,
              isOwned: unlockedCosmetics.includes(previewThemeId),
              onApply: () => {
                const item = COSMETIC_THEMES.find(t => t.id === previewThemeId);
                if (item) handleEquipCosmetic(item);
                setPreviewThemeId(null);
              },
              onBuy: () => {
                const item = COSMETIC_THEMES.find(t => t.id === previewThemeId);
                if (item) handleBuyCosmetic(item);
                setPreviewThemeId(null);
              },
            }
          : previewAccessory
          ? {
              type: 'accessory' as const,
              name: previewAccessory.name,
              icon: previewAccessory.icon,
              priceXp: previewAccessory.xpPrice || Math.round(previewAccessory.price * 0.8),
              isOwned: pet.inventory.accessories.includes(previewAccessory.id),
              onApply: () => {
                handleToggleAccessory(previewAccessory);
                setPreviewAccessory(null);
              },
              onBuy: () => {
                handleBuyAccessory(previewAccessory);
                setPreviewAccessory(null);
              },
            }
          : previewFrame
          ? {
              type: 'frame' as const,
              name: previewFrame.name,
              icon: previewFrame.icon,
              priceXp: previewFrame.priceXp,
              isOwned: unlockedCosmetics.includes(previewFrame.id),
              onApply: () => {
                handleEquipCosmetic(previewFrame);
                setPreviewFrame(null);
              },
              onBuy: () => {
                handleBuyCosmetic(previewFrame);
                setPreviewFrame(null);
              },
            }
          : null;

        if (!activePreviewData) return null;

        return (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] bg-slate-900/95 text-white border-2 border-indigo-500 rounded-2xl shadow-2xl p-3.5 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl shrink-0">{activePreviewData.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-black text-white">
                    <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                    <span className="truncate">Live-Anprobe: {activePreviewData.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 truncate mt-0.5">
                    {activePreviewData.isOwned
                      ? 'Freigeschaltet – Klicke Anwenden zum Tragen'
                      : `Freischalten für ${activePreviewData.priceXp} EXP`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activePreviewData.isOwned ? (
                  <button
                    onClick={activePreviewData.onApply}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    Anwenden
                  </button>
                ) : (
                  <button
                    onClick={activePreviewData.onBuy}
                    disabled={xp < activePreviewData.priceXp}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    Kaufen
                  </button>
                )}

                <button
                  onClick={() => {
                    setPreviewThemeId(null);
                    setPreviewAccessory(null);
                    setPreviewFrame(null);
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Vorschau beenden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
