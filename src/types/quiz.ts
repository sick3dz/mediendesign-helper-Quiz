export type Difficulty = 'easy' | 'medium' | 'exam';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  trapExplanation?: string; // Spezifische IHK-Prüfer-Erklärung, warum diese Falle verlockend wirkte
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
  level2QuizQuestions?: QuizQuestion[]; // IHK-Transfer & Praxisfälle für Meisterstufe (Level 2)
  miniGameType?: 'affordance' | 'phishing' | 'process_order' | 'wcag_match';
}

export interface ChecklistDetailInfo {
  definition: string;
  keywords: string[];
  practicalExample: {
    context: string;
    application: string;
  };
  examQuestion: {
    questionText: string;
    points?: number;
    sampleAnswer: string;
    scoringCriteria?: string[];
  };
  examinerWarning: string;
  relatedModuleId?: string;
  relatedModuleName?: string;
}

export interface ChecklistItem {
  task: string;
  detail: string;
  moreInfo?: ChecklistDetailInfo;
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
  examChecklist: ChecklistItem[];
}

export type PetSpecies = 'dog' | 'cat' | 'penguin' | 'axolotl' | 'unicorn';

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

export type GadgetInteractionType = 'bounce' | 'laser' | 'magic_wand' | 'fidget';

export interface PetGadget {
  id: string;
  name: string;
  category: 'gadget';
  price: number;
  xpPrice: number;
  icon: string;
  description: string;
  interactionType: GadgetInteractionType;
  happinessBonus: number;
  soundName: 'bounce' | 'laser' | 'magic' | 'click';
  actionMessage: (petName: string) => string;
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
    gadget?: string; // Active gadget placed beside the pet
  };
  inventory: {
    food: { [foodId: string]: number }; // quantity
    accessories: string[]; // owned accessory IDs
    gadgets?: string[]; // owned gadget IDs
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
  xp: number; // Spendables EXP-Guthaben (kann im Shop ausgegeben werden)
  lifetimeXp?: number; // Gesamte verdiente EXP für dauerhaften Level- & Rang-Fortschritt (sinkt nie)
  coins: number; // Redeemable in pet shop alongside EXP
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedModules: string[];
  completedModulesLevel2?: string[]; // Module, die auf Meisterstufe (Level 2) abgeschlossen wurden
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
  questionPerformance: { [questionId: string]: { correctCount: number; wrongCount: number; lastAnswered?: string } };
  topicMastery: { [topicId: string]: number }; // 0 to 100 percentage
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

