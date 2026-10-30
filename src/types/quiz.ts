export type Difficulty = 'easy' | 'medium' | 'exam';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  moduleId?: string;
  question: string;
  scenario?: string;
  options: QuizOption[];
  examTip?: string;
  merksatz?: string;
}

export interface LearningNugget {
  id: string;
  title: string;
  coreConcept: string;
  bulletPoints: string[];
  example?: string;
  examFavorite?: boolean;
  merksatz?: string;
}

export interface LearningModule {
  id: string;
  chapterId: string;
  title: string;
  shortDesc: string;
  estimatedMinutes: number;
  nuggets: LearningNugget[];
  quizQuestions: QuizQuestion[];
  miniGameType?: 'affordance' | 'phishing' | 'process_order' | 'wcag_match';
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string; // Tailwind color token
  modules: LearningModule[];
  examMerksatz: string;
  examChecklist: string[];
}

export type PetSpecies = 'dog' | 'cat' | 'penguin' | 'axolotl';

export interface PetAccessory {
  id: string;
  name: string;
  category: 'head' | 'face' | 'neck';
  price: number;
  xpPrice?: number;
  icon: string;
  description: string;
}

export interface PetFood {
  id: string;
  name: string;
  price: number;
  xpPrice?: number;
  icon: string;
  nutrition: number; // restores hunger
  happiness: number; // restores happiness
  description: string;
}

export interface PetState {
  hasAdopted?: boolean;
  species: PetSpecies;
  name: string;
  hunger: number; // 0 to 100 (never drops below safe comfy floor)
  happiness: number; // 0 to 100 (never drops below safe comfy floor)
  isSleeping?: boolean; // Pet peacefully naps when idle; wakes up instantly upon petting/feeding with 0 penalties
  lastCareTimestamp?: number; // Date.now() timestamp
  equipped: {
    head?: string;
    face?: string;
    neck?: string;
    frame?: string; // Animated avatar aura/frame
  };
  inventory: {
    food: { [foodId: string]: number }; // quantity
    accessories: string[]; // owned accessory IDs
  };
  timesFed: number;
  timesPetted: number;
  timesPlayed?: number;
}

export type CosmeticCategory = 'theme' | 'soundpack' | 'title' | 'frame';

export interface CosmeticItem {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  icon: string;
  priceCoins: number;
  priceXp: number;
  tier: 'starter' | 'mid' | 'high' | 'prestige';
  previewColor?: string;
  previewClass?: string;
}

export interface EquippedCosmetics {
  theme?: string;
  soundpack?: string;
  title?: string;
  frame?: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardXp: number;
  isClaimed: boolean;
  category: 'focus' | 'module' | 'quiz';
  icon: string;
}

export interface UserStats {
  xp: number;
  coins: number; // Redeemable in pet shop alongside EXP
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedModules: string[];
  answeredQuestionsCount: number;
  correctAnswersCount: number;
  currentCombo: number;
  maxCombo: number;
  earnedBadges: string[];
  pet: PetState;
  unlockedCosmetics?: string[]; // IDs of purchased cosmetics
  equippedCosmetics?: EquippedCosmetics;
  dailyMissions?: DailyMission[];
  dailyMissionsDate?: string;
  examScores: {
    date: string;
    score: number;
    total: number;
    percentage: number;
    grade: string;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

