import React, { useState, useEffect } from 'react';
import {
  PetState,
  PetSpecies,
  UserStats,
  PetAccessory,
  PetFood,
  PetGadget,
  CosmeticItem,
  EquippedCosmetics,
  CosmeticCategory,
} from '../types/quiz';
import {
  PET_SPECIES,
  PET_FOODS,
  PET_ACCESSORIES,
  PET_GADGETS,
  CHAPTER_SURPRISES,
  findAccessoryById,
  findGadgetById,
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
import { calculateLevel, LEVEL_LADDER, LevelTier, getFreeCookieStatus, getTodayDateString } from '../services/storageService';
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
  Star,
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

export type GamificationTab = 'pet' | 'shop' | 'inventory';

interface Props {
  stats: UserStats;
  initialTab?: 'pet' | 'shop' | 'inventory' | 'care' | 'wardrobe' | 'adopt';
  onUpdatePet: (updatedPet: PetState) => void;
  onUpdateStats?: (updatedStats: UserStats) => void;
  onCoinsChange?: (newCoins: number) => void;
  onXpChange?: (newXp: number) => void;
  onUpdateCosmetics?: (unlocked: string[], equipped: EquippedCosmetics) => void;
  onOpenAdoptionModal?: () => void;
  onGoToGames?: () => void;
  onBack?: () => void;
  onPreviewOverrideChange?: (preview: { equipped?: Partial<PetState['equipped']> } | undefined) => void;
}

type ShopCategory = 'food' | 'accessories' | 'gadgets' | 'themes' | 'soundpacks' | 'titles' | 'frames';
type InventoryCategory = 'food' | 'accessories' | 'gadgets' | 'themes' | 'soundpacks' | 'titles' | 'frames';

export const VirtualPetView: React.FC<Props> = ({
  stats,
  initialTab = 'care',
  onUpdatePet,
  onUpdateStats,
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

  const getMappedTab = (tab?: string): GamificationTab => {
    if (tab === 'shop') return 'shop';
    if (tab === 'inventory' || tab === 'wardrobe') return 'inventory';
    return 'pet';
  };

  const [activeTab, setActiveTab] = useState<GamificationTab>(() => getMappedTab(initialTab));
  const [shopCategory, setShopCategory] = useState<ShopCategory>('food');
  const [inventoryCategory, setInventoryCategory] = useState<InventoryCategory>('food');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(pet.name);
  const [isEating, setIsEating] = useState(false);
  const [isPetted, setIsPetted] = useState(false);
  const [isGadgetInteracting, setIsGadgetInteracting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [previewThemeId, setPreviewThemeId] = useState<string | null>(null);
  const [previewAccessory, setPreviewAccessory] = useState<PetAccessory | null>(null);
  const [previewGadget, setPreviewGadget] = useState<PetGadget | null>(null);
  const [previewFrame, setPreviewFrame] = useState<CosmeticItem | null>(null);
  const [tryOnItem, setTryOnItem] = useState<{
    type: 'accessory' | 'gadget' | 'frame' | 'theme';
    item: any;
  } | null>(null);
  const [tryOnSpecies, setTryOnSpecies] = useState<PetSpecies>(pet.species);
  const [thoughtSeed, setThoughtSeed] = useState(0);

  const handleOpenTryOnModal = (type: 'accessory' | 'gadget' | 'frame' | 'theme', item: any) => {
    setTryOnSpecies(pet.species);
    setTryOnItem({ type, item });
  };

  // Sync live accessory, gadget & frame preview to external listener (TopBar companion)
  useEffect(() => {
    if (onPreviewOverrideChange) {
      if (!previewAccessory && !previewFrame && !previewGadget) {
        onPreviewOverrideChange(undefined);
      } else {
        onPreviewOverrideChange({
          equipped: {
            ...(previewAccessory ? { [previewAccessory.category]: previewAccessory.id } : {}),
            ...(previewFrame ? { frame: previewFrame.id } : {}),
            ...(previewGadget ? { gadget: previewGadget.id } : {}),
          },
        });
      }
    }
  }, [previewAccessory, previewFrame, previewGadget, onPreviewOverrideChange]);

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
      setActiveTab(getMappedTab(initialTab));
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
      'theme-sakura',
      'theme-coffee',
      'theme-deepspace',
      'theme-synthwave',
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

  const handleHighFive = () => {
    soundEffects.playPetForSpecies(pet.species);
    setIsPetted(true);
    setTimeout(() => setIsPetted(false), 1000);

    try {
      confetti({ particleCount: 35, spread: 50 });
    } catch {
      // ignore
    }

    const updated: PetState = {
      ...pet,
      isSleeping: false,
      happiness: Math.min(100, pet.happiness + 10),
      timesPlayed: (pet.timesPlayed || 0) + 1,
    };
    onUpdatePet(updated);
    showTemporaryFeedback(soundConfig.highFiveActionMsg(pet.name));
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
    const cost = food.xpPrice !== undefined ? food.xpPrice : Math.round(food.price * 0.8);

    if (food.id === 'cookie' || cost === 0) {
      const cookieStatus = getFreeCookieStatus(stats);
      if (cookieStatus.isLocked) {
        soundEffects.playWrong();
        if (cookieStatus.lockReason === 'daily_limit') {
          showTemporaryFeedback(`🔒 Tageslimit von 5 Gratis-Keksen erreicht! Bis morgen gesperrt.`);
        } else {
          showTemporaryFeedback(`🔒 Gratis-Keks gesperrt! Noch ${cookieStatus.formattedRemainingTime} Pause.`);
        }
        return;
      }

      soundEffects.playClick();
      const currentQty = pet.inventory.food['cookie'] || 0;
      const newCount = cookieStatus.countToday + 1;
      const today = getTodayDateString();
      // Always set 2 hours cooldown upon claiming a free cookie
      const newLockedUntil = Date.now() + 2 * 3600 * 1000;

      const updatedPet: PetState = {
        ...pet,
        inventory: {
          ...pet.inventory,
          food: {
            ...pet.inventory.food,
            cookie: currentQty + 1,
          },
        },
      };

      const updatedStats: UserStats = {
        ...stats,
        freeCookieClaimDate: today,
        freeCookieClaimCount: newCount,
        freeCookieLockedUntil: newLockedUntil,
        pet: updatedPet,
      };

      if (onUpdateStats) {
        onUpdateStats(updatedStats);
      } else {
        onUpdatePet(updatedPet);
      }

      if (newCount >= 5) {
        showTemporaryFeedback(`🍪 Gratis Glücks-Keks erhalten! (5/5 heute erreicht – Limit für heute voll 🔒)`);
      } else {
        showTemporaryFeedback(`🍪 Gratis Glücks-Keks erhalten! (${newCount}/5 heute – jetzt 2 Std. Pause 🔒)`);
      }
      return;
    }

    if (cost > 0 && xp < cost) {
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

  // Gadget Interactions & Purchasing
  const handleTogglePreviewGadget = (gadgetItem: PetGadget) => {
    soundEffects.playClick();
    if (previewGadget?.id === gadgetItem.id) {
      setPreviewGadget(null);
      showTemporaryFeedback('Gadget-Vorschau beendet.');
    } else {
      setPreviewGadget(gadgetItem);
      showTemporaryFeedback(`👁️ Live-Vorschau: "${gadgetItem.name}" angetestet!`);
    }
  };

  const handleToggleGadget = (gadgetItem: PetGadget) => {
    soundEffects.playClick();
    const isEquipped = pet.equipped.gadget === gadgetItem.id;
    const updated: PetState = {
      ...pet,
      equipped: {
        ...pet.equipped,
        gadget: isEquipped ? undefined : gadgetItem.id,
      },
    };
    if (previewGadget?.id === gadgetItem.id) setPreviewGadget(null);
    onUpdatePet(updated);
    showTemporaryFeedback(
      isEquipped
        ? `Gadget "${gadgetItem.name}" weggepackt.`
        : `Gadget "${gadgetItem.name}" liegt jetzt neben ${pet.name}! 🎾`
    );
  };

  const handleBuyGadget = (gadgetItem: PetGadget) => {
    const ownedGadgets = pet.inventory.gadgets || ['bouncing_ball'];
    if (ownedGadgets.includes(gadgetItem.id)) {
      handleToggleGadget(gadgetItem);
      return;
    }

    const cost = gadgetItem.xpPrice;
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
    } catch {}

    const updated: PetState = {
      ...pet,
      equipped: {
        ...pet.equipped,
        gadget: gadgetItem.id,
      },
      inventory: {
        ...pet.inventory,
        gadgets: [...ownedGadgets, gadgetItem.id],
      },
    };
    if (previewGadget?.id === gadgetItem.id) setPreviewGadget(null);
    onUpdatePet(updated);
    showTemporaryFeedback(`🎉 ${gadgetItem.name} für ${cost} EXP freigeschaltet und platziert!`);
  };

  const handlePlayGadget = (gadgetItem?: PetGadget) => {
    const targetGadget = gadgetItem || (pet.equipped.gadget ? findGadgetById(pet.equipped.gadget) : undefined);
    if (!targetGadget) return;

    setIsGadgetInteracting(true);
    soundEffects.playGadgetSound(targetGadget.soundName);

    const newHappiness = Math.min(100, pet.happiness + targetGadget.happinessBonus);
    const updated: PetState = {
      ...pet,
      isSleeping: false,
      happiness: newHappiness,
      timesPlayed: (pet.timesPlayed || 0) + 1,
    };
    onUpdatePet(updated);
    showTemporaryFeedback(targetGadget.actionMessage(pet.name));
    setTimeout(() => setIsGadgetInteracting(false), 1250);
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
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
              title="Zurück zur Übersicht"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {activeTab === 'shop' ? 'EXP Shop & Belohnungen' : 'Haustier & Gefährte'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
              {activeTab === 'shop' ? 'EXP Shop' : activeTab === 'inventory' ? 'Inventar & Schrank' : 'Haustier Lounge'}
            </h2>
          </div>
        </div>

        {/* Spendable EXP Balance Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-2xs text-xs font-bold font-mono"
            title="Dein verfügbares EXP-Guthaben zum Füttern und Einkleiden deines Haustiers"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span className="tabular-nums font-black text-sm">{xp}</span>
            <span className="text-[11px] font-semibold text-indigo-600/80 dark:text-indigo-400/80">EXP Guthaben</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Inventar is available in both Lounge and Shop!) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {activeTab === 'shop' || (initialTab === 'shop' && activeTab === 'inventory') ? (
          <>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('shop');
              }}
              className={`py-2 px-3.5 sm:px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'shop'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>⭐ EXP Shop Artikel</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('inventory');
              }}
              className={`py-2 px-3.5 sm:px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'inventory'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold'
              }`}
            >
              <Shirt className="w-3.5 h-3.5 shrink-0" />
              <span>🎒 Mein Inventar & Vorrat</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('pet');
              }}
              className={`py-2 px-3.5 sm:px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'pet'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold'
              }`}
            >
              <span>🏠 Haustier & Zimmer</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('inventory');
              }}
              className={`py-2 px-3.5 sm:px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'inventory'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold'
              }`}
            >
              <Shirt className="w-3.5 h-3.5 shrink-0" />
              <span>🎒 Inventar & Schrank</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                if (onOpenAdoptionModal) {
                  onOpenAdoptionModal();
                }
              }}
              className="ml-auto py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap shrink-0"
              title="Anderes Haustier auswählen"
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Tier wechseln</span>
            </button>
          </>
        )}
      </div>

      {/* 1. PET COMPANION TAB */}
      {activeTab === 'pet' && (
        <div className="space-y-6">
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
            </div>

            {/* Peaceful Sleep Peaceful Banner */}
            {pet.isSleeping && (
              <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-indigo-200">
                  <div className="p-2 rounded-xl bg-indigo-800/50 text-indigo-300">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-white">Nachtruhe 💤</span>
                    <p className="text-[11px] text-indigo-200/80 mt-0.5">
                      Schläft friedlich während der Nachtruhe (22:00–06:00 Uhr) – morgens ab 06:00 Uhr wacht dein Haustier automatisch von selbst auf! ☀️
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
            <div className="relative py-10 flex flex-col items-center justify-center">
              {isPetted && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-amber-400 text-slate-900 font-black text-sm rounded-2xl shadow-lg border-2 border-amber-300 animate-bounce flex items-center gap-1.5 pointer-events-none whitespace-nowrap">
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
                    ...(previewGadget ? { gadget: previewGadget.id } : {}),
                  },
                }}
                onInteractGadget={handlePlayGadget}
                isGadgetInteracting={isGadgetInteracting}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('pet');
                }}
              />

              {/* Interactive Actions */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  onClick={handlePet}
                  className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Streicheln ❤️</span>
                </button>

                <button
                  onClick={handleHighFive}
                  className="px-5 py-2.5 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{soundConfig.highFiveLabel}</span>
                </button>
              </div>
            </div>

            {/* Vitals Gauges */}
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

          {/* Quick Feeding Food Drawer */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Futter-Vorrat & Füttern</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Tippe auf ein Essen, um {pet.name} zu füttern</span>
            </div>

            {totalFoodInInventory === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-3xl shrink-0">🥪</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Dein Futtervorrat ist leer</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Hol dir leckere Snacks im Belohnungs-Shop oder deinen täglichen Gratis-Keks!</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(() => {
                    const cookieStatus = getFreeCookieStatus(stats);
                    return (
                      <button
                        onClick={() => handleBuyFood(PET_FOODS[0])}
                        disabled={cookieStatus.isLocked}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                          cookieStatus.isLocked
                            ? 'opacity-60 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98 font-black'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>
                          {cookieStatus.isLocked
                            ? `🔒 Gesperrt (${cookieStatus.formattedRemainingTime})`
                            : `Gratis Keks holen (${cookieStatus.remainingToday}/5 frei)`}
                        </span>
                      </button>
                    );
                  })()}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveTab('shop');
                      setShopCategory('food');
                    }}
                    className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-300 cursor-pointer shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>Zum Shop</span>
                  </button>
                </div>
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
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl group-hover:scale-110 transition-transform shrink-0">{food.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {food.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            +{food.nutrition} Sättigung
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-mono text-[11px] font-bold shrink-0">
                        x{qty}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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
                setShopCategory('gadgets');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                shopCategory === 'gadgets'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Spielzeuge & Gadgets</span>
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
                const xpCost = food.xpPrice !== undefined ? food.xpPrice : Math.round(food.price * 0.8);
                const isFreeCookie = food.id === 'cookie' || xpCost === 0;
                const cookieStatus = isFreeCookie ? getFreeCookieStatus(stats) : null;
                const canAffordXp = isFreeCookie ? !cookieStatus?.isLocked : (xpCost === 0 || xp >= xpCost);

                return (
                  <div
                    key={food.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{food.icon}</span>
                        {isFreeCookie && cookieStatus?.isLocked ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                            🔒 2h Gesperrt
                          </span>
                        ) : isFreeCookie ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                            {cookieStatus?.countToday}/5 heute verwendet
                          </span>
                        ) : qty > 0 ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                            {qty} im Vorrat
                          </span>
                        ) : null}
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
                          isFreeCookie && cookieStatus?.isLocked
                            ? 'opacity-60 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                            : isFreeCookie
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98 font-black'
                            : canAffordXp
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                            : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span>
                          {isFreeCookie
                            ? cookieStatus?.isLocked
                              ? `🔒 Gesperrt (${cookieStatus.formattedRemainingTime})`
                              : `Gratis Keks holen (${cookieStatus?.remainingToday}/5 frei)`
                            : `${xpCost} EXP kaufen`}
                        </span>
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
                            onClick={() => handleOpenTryOnModal('accessory', acc)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95"
                            title="Gegenstand im Anprobier-Studio mit Live-Vorschau ansehen"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Anprobieren 👁️</span>
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
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{xpCost} EXP freischalten</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SHOP: Gadgets & Interactive Toys */}
          {shopCategory === 'gadgets' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {PET_GADGETS.map(gadgetItem => {
                const ownedGadgets = pet.inventory.gadgets || ['bouncing_ball'];
                const isOwned = ownedGadgets.includes(gadgetItem.id);
                const isEquipped = pet.equipped.gadget === gadgetItem.id;
                const isPreviewActive = previewGadget?.id === gadgetItem.id;
                const canAffordXp = xp >= gadgetItem.xpPrice;

                return (
                  <div
                    key={gadgetItem.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isPreviewActive
                        ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                        : isEquipped
                        ? 'border-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-400/50'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{gadgetItem.icon}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenTryOnModal('gadget', gadgetItem)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95"
                            title="Gadget in der Anprobier-Kabine ansehen"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Live testen 👁️</span>
                          </button>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            gadgetItem.price === 0
                              ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                              : 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300'
                          }`}>
                            {gadgetItem.price === 0 ? 'Gratis' : `${gadgetItem.xpPrice} EXP`}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {gadgetItem.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {gadgetItem.description}
                      </p>
                      <div className="mt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>+{gadgetItem.happinessBonus} Laune bei Interaktion</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      {isOwned ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              handleToggleGadget(gadgetItem);
                              setPreviewGadget(null);
                            }}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                              isEquipped
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isEquipped ? 'Liegt neben Tier' : 'Platzieren'}</span>
                          </button>
                          {isEquipped && (
                            <button
                              onClick={() => handlePlayGadget(gadgetItem)}
                              className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                              title="Direkt spielen"
                            >
                              <span>Spielen</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            handleBuyGadget(gadgetItem);
                            setPreviewGadget(null);
                          }}
                          disabled={!canAffordXp}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                            canAffordXp
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
                              : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{gadgetItem.xpPrice === 0 ? 'Gratis freischalten' : `${gadgetItem.xpPrice} EXP freischalten`}</span>
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
                            onClick={() => handleOpenTryOnModal('theme', item)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95"
                            title="Theme in der Vorschau-Kabine ansehen"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Vorschau 👁️</span>
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

                      {/* Mini App UI Mockup Badge */}
                      <div className={`mt-2.5 p-2 rounded-xl bg-gradient-to-r ${item.previewClass} text-white text-[10px] space-y-1 shadow-2xs`}>
                        <div className="flex items-center justify-between font-bold opacity-90">
                          <span>App-Design Vorschau</span>
                          <span className="font-mono text-[9px]">UI Mockup</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-white rounded-full" />
                        </div>
                      </div>
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
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
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
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
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
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
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
                            onClick={() => handleOpenTryOnModal('frame', item)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95"
                            title="Rahmen in der Vorschau-Kabine ansehen"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Anprobieren 👁️</span>
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
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
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

      {/* 3. INVENTAR & STIL-STUDIO TAB */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Dein Inventar & Ausrüstungs-Studio
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Verwalte deine gekauften Snacks, Accessoires, Gadgets und Design-Farben.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
              {(['food', 'accessories', 'gadgets', 'themes', 'soundpacks', 'titles', 'frames'] as InventoryCategory[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEffects.playClick();
                    setInventoryCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-xl cursor-pointer transition-all ${
                    inventoryCategory === cat
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'food' && 'Futter'}
                  {cat === 'accessories' && 'Accessoires'}
                  {cat === 'gadgets' && 'Gadgets'}
                  {cat === 'themes' && 'Themen'}
                  {cat === 'soundpacks' && 'Sounds'}
                  {cat === 'titles' && 'Titel'}
                  {cat === 'frames' && 'Rahmen'}
                </button>
              ))}
            </div>
          </div>

          {/* INVENTORY: Food */}
          {inventoryCategory === 'food' && (
            <div>
              {totalFoodInInventory === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
                  <span className="text-3xl">🥪</span>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Dein Futtervorrat ist leer!
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Besuche den Belohnungs-Shop, um leckere Snacks mit deinen verdienten EXP zu kaufen!
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PET_FOODS.map(food => {
                    const qty = pet.inventory.food[food.id] || 0;
                    if (qty === 0) return null;
                    return (
                      <div
                        key={food.id}
                        className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{food.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {food.name}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              +{food.nutrition} Sättigung · x{qty} im Vorrat
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFeed(food.id)}
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all cursor-pointer shadow-2xs"
                        >
                          Füttern
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* INVENTORY: Accessories */}
          {inventoryCategory === 'accessories' && (
            <div>
              {PET_ACCESSORIES.filter(acc => pet.inventory.accessories.includes(acc.id)).length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  Du besitzt noch keine Tier-Accessoires. Besuche den Belohnungs-Shop!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PET_ACCESSORIES.filter(acc => pet.inventory.accessories.includes(acc.id)).map(acc => {
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

          {/* INVENTORY: Gadgets */}
          {inventoryCategory === 'gadgets' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PET_GADGETS.filter(gadget => (pet.inventory.gadgets || ['bouncing_ball']).includes(gadget.id)).map(gadget => {
                  const isEquipped = pet.equipped.gadget === gadget.id;
                  const isPreviewActive = previewGadget?.id === gadget.id;
                  return (
                    <div
                      key={gadget.id}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isPreviewActive
                          ? 'border-amber-400 bg-amber-500/10 dark:bg-amber-950/30 ring-2 ring-amber-400/50'
                          : isEquipped
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="text-2xl shrink-0">{gadget.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {gadget.name}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">{gadget.description}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            handleToggleGadget(gadget);
                            setPreviewGadget(null);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            isEquipped
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {isEquipped ? <Check className="w-3.5 h-3.5" /> : null}
                          <span>{isEquipped ? 'Platzierte' : 'Platzieren'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* INVENTORY: Themes */}
          {inventoryCategory === 'themes' && (
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

          {/* INVENTORY: Soundpacks */}
          {inventoryCategory === 'soundpacks' && (
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

          {/* INVENTORY: Titles */}
          {inventoryCategory === 'titles' && (
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

          {/* INVENTORY: Frames */}
          {inventoryCategory === 'frames' && (
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

      {/* ======================================================== */}
      {/* LARGE CENTERED TRY-ON & PREVIEW MODAL                    */}
      {/* ======================================================== */}
      {tryOnItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setTryOnItem(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-none">
                    Anprobier-Studio & Live-Vorschau
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Probiere den Gegenstand direkt aus und teste ihn auf allen Haustieren!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTryOnItem(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Species Selector Bar (Hidden for Theme previews) */}
            {tryOnItem.type !== 'theme' && (
              <div className="px-4 sm:px-5 py-2.5 bg-slate-100/80 dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
                  Tierart wechseln:
                </span>
                {(['dog', 'cat', 'penguin', 'axolotl', 'unicorn'] as PetSpecies[]).map(sp => {
                  const info = PET_SPECIES[sp];
                  const isActive = tryOnSpecies === sp;
                  return (
                    <button
                      key={sp}
                      onClick={() => setTryOnSpecies(sp)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{PET_SPECIES_SOUNDS[sp].soundIcon}</span>
                      <span>{info.defaultName}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column: Stage (App UI Mockup for Themes, Pet Avatar for Accessories/Gadgets/Frames) */}
              {tryOnItem.type === 'theme' ? (
                <div className={`p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center justify-between relative transition-all bg-gradient-to-b ${tryOnItem.item.previewClass} min-h-[340px] text-slate-900 dark:text-white`}>
                  {/* Stage Header Badge */}
                  <div className="w-full flex items-center justify-between text-[11px] font-extrabold px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-md backdrop-blur-xs mb-3 z-10">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Echte App UI Vorschau</span>
                    </div>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{tryOnItem.item.name}</span>
                  </div>

                  {/* App UI Sample Mockup Container */}
                  <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xl space-y-3 text-left my-auto">
                    {/* Sample Header Bar */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100">
                        <span className="text-base">{tryOnItem.item.icon}</span>
                        <span className="text-xs">DesignKonzept.prep</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[10px]">
                          1.250 EXP
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-mono font-bold text-[10px]">
                          🪙 45
                        </span>
                      </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs">
                        Lernmodule
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Prüfungs-Quiz
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Statistik
                      </span>
                    </div>

                    {/* Quiz / Learning Card */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                        <span>IHK KAPITEL 1 • INTERAKTIONSDESIGN</span>
                        <span className="font-mono font-bold text-slate-600 dark:text-slate-300">Frage 3 / 5</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        Welches Merkmal zeichnet eine gute Affordance aus?
                      </h5>
                      {/* Progress Bar */}
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full w-3/5 bg-gradient-to-r ${tryOnItem.item.previewClass} rounded-full`} />
                      </div>
                    </div>

                    {/* Answer / Primary Action Button */}
                    <button
                      type="button"
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r ${tryOnItem.item.previewClass} shadow-md flex items-center justify-between cursor-default`}
                    >
                      <span>✓ Visuelle Klickbarkeit signalisieren</span>
                      <span className="font-mono text-[11px]">+100 EXP</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-white/90 font-semibold text-center mt-3 drop-shadow-xs">
                    So werden Farben, Buttons & Fortschritte im gesamten Tool dargestellt!
                  </p>
                </div>
              ) : (
                <div className="p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center justify-center relative transition-all shrink-0 bg-gradient-to-b from-indigo-50 via-purple-50/70 to-slate-100 dark:from-slate-800 dark:via-indigo-950/50 dark:to-slate-900">
                  {/* Species Sound Badge */}
                  <div className="absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-2xs backdrop-blur-xs z-10">
                    {PET_SPECIES[tryOnSpecies].title}
                  </div>

                  <div className="py-8 sm:py-10 flex items-center justify-center">
                    <PetAvatar
                      pet={{
                        ...pet,
                        species: tryOnSpecies,
                        name: PET_SPECIES[tryOnSpecies].defaultName,
                      }}
                      size="lg"
                      equippedCosmetics={{
                        ...equippedCosmetics,
                        ...(tryOnItem.type === 'frame' ? { frame: tryOnItem.item.id } : {}),
                      }}
                      previewOverride={{
                        equipped: {
                          ...(tryOnItem.type === 'accessory' ? { [tryOnItem.item.category]: tryOnItem.item.id } : {}),
                          ...(tryOnItem.type === 'gadget' ? { gadget: tryOnItem.item.id } : {}),
                          ...(tryOnItem.type === 'frame' ? { frame: tryOnItem.item.id } : {}),
                        },
                      }}
                      onClick={() => {
                        soundEffects.playClick();
                        setTryOnItem(null);
                        setActiveTab('pet');
                      }}
                    />
                  </div>

                  <div className="text-center mt-2 z-10">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      "{PET_SPECIES_SOUNDS[tryOnSpecies].soundWord}" – Passt perfekt auf {PET_SPECIES[tryOnSpecies].defaultName}! ✨
                    </p>
                  </div>
                </div>
              )}

              {/* Right Column: Item Information & Action Buttons */}
              <div className="flex flex-col justify-between space-y-4 bg-slate-50/60 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-3xl sm:text-4xl">{tryOnItem.item.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                      {tryOnItem.type === 'accessory' ? `Accessoire: ${tryOnItem.item.category}` : tryOnItem.type === 'gadget' ? 'Interaktives Gadget' : tryOnItem.type === 'frame' ? 'Aura-Rahmen' : 'Design-Theme'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-3">
                    {tryOnItem.item.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                    {tryOnItem.item.description}
                  </p>

                  {/* Pricing / Status summary */}
                  <div className="mt-4 p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Preis:</span>
                      <span className="font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {(tryOnItem.item.xpPrice ?? tryOnItem.item.priceXp ?? 0) === 0 ? 'Gratis' : `${tryOnItem.item.xpPrice ?? tryOnItem.item.priceXp} EXP`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Dein EXP-Guthaben:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {xp} EXP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Actions inside Modal */}
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  {(() => {
                    if (tryOnItem.type === 'accessory') {
                      const acc = tryOnItem.item as PetAccessory;
                      const isOwned = pet.inventory.accessories.includes(acc.id);
                      const isEquipped = pet.equipped[acc.category] === acc.id;
                      const xpCost = acc.xpPrice || Math.round(acc.price * 0.8);
                      const canAfford = xp >= xpCost;

                      if (isOwned) {
                        return (
                          <button
                            onClick={() => {
                              handleToggleAccessory(acc);
                              setFeedbackMsg(isEquipped ? `${acc.name} abgelegt.` : `${acc.name} angezogen! 🎉`);
                              setTimeout(() => setFeedbackMsg(null), 3000);
                            }}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                              isEquipped
                                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>{isEquipped ? 'Gegenstand ablegen' : 'Gegenstand anziehen & tragen'}</span>
                          </button>
                        );
                      } else {
                        return (
                          <button
                            onClick={() => {
                              handleBuyAccessory(acc);
                              if (pet.equipped[acc.category] !== acc.id) {
                                handleToggleAccessory(acc);
                              }
                              setFeedbackMsg(`🎉 ${acc.name} freigeschaltet und angezogen!`);
                              setTimeout(() => setFeedbackMsg(null), 3000);
                              setTryOnItem(null);
                            }}
                            disabled={!canAfford}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                              canAfford
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98'
                                : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                            <span>{canAfford ? `Für ${xpCost} EXP freischalten & anziehen` : `Nicht genug EXP (${xpCost} benötigt)`}</span>
                          </button>
                        );
                      }
                    }

                    if (tryOnItem.type === 'gadget') {
                      const gadgetItem = tryOnItem.item as PetGadget;
                      const ownedGadgets = pet.inventory.gadgets || ['bouncing_ball'];
                      const isOwned = ownedGadgets.includes(gadgetItem.id);
                      const isEquipped = pet.equipped.gadget === gadgetItem.id;
                      const xpCost = gadgetItem.xpPrice;
                      const canAfford = xp >= xpCost;

                      if (isOwned) {
                        return (
                          <button
                            onClick={() => {
                              handleToggleGadget(gadgetItem);
                              setFeedbackMsg(isEquipped ? `${gadgetItem.name} weggepackt.` : `${gadgetItem.name} neben Haustier platziert! 🎉`);
                              setTimeout(() => setFeedbackMsg(null), 3000);
                            }}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                              isEquipped
                                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>{isEquipped ? 'Spielzeug wegpacken' : 'Neben Haustier platzieren'}</span>
                          </button>
                        );
                      } else {
                        return (
                          <button
                            onClick={() => {
                              handleBuyGadget(gadgetItem);
                              if (pet.equipped.gadget !== gadgetItem.id) {
                                handleToggleGadget(gadgetItem);
                              }
                              setFeedbackMsg(`🎉 ${gadgetItem.name} freigeschaltet und platziert!`);
                              setTimeout(() => setFeedbackMsg(null), 3000);
                              setTryOnItem(null);
                            }}
                            disabled={!canAfford}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                              canAfford
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98'
                                : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                            <span>{canAfford ? `Für ${xpCost} EXP freischalten & platzieren` : `Nicht genug EXP (${xpCost} benötigt)`}</span>
                          </button>
                        );
                      }
                    }

                    if (tryOnItem.type === 'frame' || tryOnItem.type === 'theme') {
                      const item = tryOnItem.item as CosmeticItem;
                      const isOwned = unlockedCosmetics.includes(item.id);
                      const isEquipped = item.category === 'frame' ? pet.equipped.frame === item.id : equippedCosmetics.theme === item.id;
                      const xpCost = item.priceXp;
                      const canAfford = xp >= xpCost;

                      if (isOwned) {
                        return (
                          <button
                            onClick={() => {
                              handleEquipCosmetic(item);
                              setFeedbackMsg(`${item.name} aktiviert! ✨`);
                              setTimeout(() => setFeedbackMsg(null), 3000);
                            }}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                              isEquipped
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>{isEquipped ? 'Aktuell aktiviert' : 'Jetzt anwenden & aktivieren'}</span>
                          </button>
                        );
                      } else {
                        return (
                          <button
                            onClick={() => {
                              handleBuyCosmetic(item);
                              handleEquipCosmetic(item);
                              setFeedbackMsg(`🎉 ${item.name} freigeschaltet und aktiviert!`);
                              setTimeout(() => setFeedbackMsg(null), 3000);
                              setTryOnItem(null);
                            }}
                            disabled={!canAfford}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                              canAfford
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98'
                                : 'opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                            <span>{canAfford ? `Für ${xpCost} EXP freischalten & anwenden` : `Nicht genug EXP (${xpCost} benötigt)`}</span>
                          </button>
                        );
                      }
                    }

                    return null;
                  })()}

                  <button
                    onClick={() => setTryOnItem(null)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    Weiter im Shop stöbern
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
