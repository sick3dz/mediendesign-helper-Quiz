import { UserStats } from '../types/quiz';

export type AchievementCategory = 'all' | 'learning' | 'quiz' | 'care' | 'streak';

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'quiz' | 'care' | 'streak';
  targetProgress: number;
  unit: string;
  icon: string;
  rewardXp: number;
  rewardCoins: number;
  getCurrentProgress: (stats: UserStats) => number;
  getCustomActionHint: (stats: UserStats, remaining: number) => string;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // 1. LEARNING CATEGORY
  {
    id: 'ach_learn_5',
    title: 'Wissensdurst I',
    description: 'Schließe 5 IHK-Lernmodule ab',
    category: 'learning',
    targetProgress: 5,
    unit: 'Module',
    icon: '📚',
    rewardXp: 50,
    rewardCoins: 20,
    getCurrentProgress: (stats) => stats.completedModules?.length || 0,
    getCustomActionHint: (_, remaining) =>
      `Lerne ${remaining} weitere ${remaining === 1 ? 'Modul' : 'Module'} in der Kapitel-Übersicht.`,
  },
  {
    id: 'ach_learn_15',
    title: 'IHK-Fachwissen II',
    description: 'Schließe 15 IHK-Lernmodule ab',
    category: 'learning',
    targetProgress: 15,
    unit: 'Module',
    icon: '📖',
    rewardXp: 150,
    rewardCoins: 50,
    getCurrentProgress: (stats) => stats.completedModules?.length || 0,
    getCustomActionHint: (_, remaining) =>
      `Absolviere noch ${remaining} Lernmodule in den Hauptkapiteln.`,
  },
  {
    id: 'ach_master_3',
    title: 'Meister-Aufsteiger',
    description: 'Löse 3 Module auf der Meisterstufe (Level 2)',
    category: 'learning',
    targetProgress: 3,
    unit: 'Meister-Module',
    icon: '👑',
    rewardXp: 100,
    rewardCoins: 35,
    getCurrentProgress: (stats) => stats.completedModulesLevel2?.length || 0,
    getCustomActionHint: (_, remaining) =>
      `Schalte bei ${remaining} weiteren ${remaining === 1 ? 'Modul' : 'Modulen'} auf Meisterstufe (Level 2) um und schließe es ab.`,
  },

  // 2. QUIZ CATEGORY
  {
    id: 'ach_quiz_25',
    title: 'Quiz-Schütze',
    description: 'Beantworte 25 Quizfragen richtig',
    category: 'quiz',
    targetProgress: 25,
    unit: 'Antworten',
    icon: '🎯',
    rewardXp: 60,
    rewardCoins: 25,
    getCurrentProgress: (stats) => stats.correctAnswersCount || 0,
    getCustomActionHint: (_, remaining) =>
      `Beantworte noch ${remaining} Quizfragen im Themen-Quiz oder Mix-Up richtig.`,
  },
  {
    id: 'ach_quiz_100',
    title: 'Antwort-Gigant',
    description: 'Beantworte 100 Quizfragen richtig',
    category: 'quiz',
    targetProgress: 100,
    unit: 'Antworten',
    icon: '⚡',
    rewardXp: 200,
    rewardCoins: 75,
    getCurrentProgress: (stats) => stats.correctAnswersCount || 0,
    getCustomActionHint: (_, remaining) =>
      `Löse noch ${remaining} Fragen richtig im Übungsbereich.`,
  },
  {
    id: 'ach_combo_5',
    title: 'Fokus-Strähne',
    description: 'Erreiche eine fehlerfreie Combo von 5 Fragen in Folge',
    category: 'quiz',
    targetProgress: 5,
    unit: 'Fragen in Folge',
    icon: '🔥',
    rewardXp: 80,
    rewardCoins: 30,
    getCurrentProgress: (stats) => Math.min(5, stats.maxCombo || 0),
    getCustomActionHint: (stats) => {
      const current = Math.min(5, stats.maxCombo || 0);
      const rem = 5 - current;
      return `Beantworte im Quiz noch ${rem} ${rem === 1 ? 'Frage' : 'Fragen'} hintereinander ohne Fehler.`;
    },
  },
  {
    id: 'ach_exam_1',
    title: 'Prüfungs-Pionier',
    description: 'Absolviere 1 IHK-Prüfungssimulation',
    category: 'quiz',
    targetProgress: 1,
    unit: 'Prüfung',
    icon: '🏆',
    rewardXp: 120,
    rewardCoins: 40,
    getCurrentProgress: (stats) => stats.examScores?.length || 0,
    getCustomActionHint: () => 'Starte den Prüfungs-Simulator im Hauptmenü und schließe einen Durchgang ab.',
  },

  // 3. CARE & PET CATEGORY
  {
    id: 'ach_pet_feed_10',
    title: 'Fürsorglicher Halter',
    description: 'Füttere dein Haustier 10 Mal mit Snacks',
    category: 'care',
    targetProgress: 10,
    unit: 'Fütterungen',
    icon: '🍖',
    rewardXp: 40,
    rewardCoins: 15,
    getCurrentProgress: (stats) => stats.pet?.timesFed || 0,
    getCustomActionHint: (_, remaining) =>
      `Füttere dein Haustier noch ${remaining} Mal mit Leckerlis aus deinem Vorrat.`,
  },
  {
    id: 'ach_pet_pet_15',
    title: 'Schmusetier-Freund',
    description: 'Streichle dein Haustier 15 Mal',
    category: 'care',
    targetProgress: 15,
    unit: 'Streicheleinheiten',
    icon: '🐾',
    rewardXp: 40,
    rewardCoins: 15,
    getCurrentProgress: (stats) => stats.pet?.timesPetted || 0,
    getCustomActionHint: (_, remaining) =>
      `Klicke noch ${remaining} Mal auf dein Haustier im Gefährten-Tab, um es zu streicheln.`,
  },
  {
    id: 'ach_pet_play_5',
    title: 'Spielgefährte',
    description: 'Spiele 5 Mal mit Gadgets oder gib Pfötchen',
    category: 'care',
    targetProgress: 5,
    unit: 'Spiele',
    icon: '⚽',
    rewardXp: 50,
    rewardCoins: 20,
    getCurrentProgress: (stats) => stats.pet?.timesPlayed || 0,
    getCustomActionHint: (_, remaining) =>
      `Verwende Gadgets (z. B. Hüpfball) oder drücke ${remaining} Mal 'Pfötchen geben'.`,
  },
  {
    id: 'ach_pet_stylist_3',
    title: 'Haustier-Stylist',
    description: 'Besitze mindestens 3 Accessoires für dein Haustier',
    category: 'care',
    targetProgress: 3,
    unit: 'Accessoires',
    icon: '🎩',
    rewardXp: 70,
    rewardCoins: 30,
    getCurrentProgress: (stats) => stats.pet?.inventory?.accessories?.length || 0,
    getCustomActionHint: (_, remaining) =>
      `Kaufe noch ${remaining} ${remaining === 1 ? 'Accessoire' : 'Accessoires'} (z. B. Hüte oder Brillen) im Shop.`,
  },

  // 4. STREAK CATEGORY
  {
    id: 'ach_streak_3',
    title: 'Fokus-Flamme',
    description: 'Halte eine tägliche Lernserie von 3 Tagen',
    category: 'streak',
    targetProgress: 3,
    unit: 'Tage Serie',
    icon: '🔥',
    rewardXp: 100,
    rewardCoins: 40,
    getCurrentProgress: (stats) => Math.min(3, stats.streakDays || 1),
    getCustomActionHint: (_, remaining) =>
      `Lerne an noch ${remaining} ${remaining === 1 ? 'weiteren Tag' : 'weiteren Tagen'} in Folge.`,
  },
  {
    id: 'ach_streak_7',
    title: 'Ausdauer-Champ',
    description: 'Halte eine tägliche Lernserie von 7 Tagen',
    category: 'streak',
    targetProgress: 7,
    unit: 'Tage Serie',
    icon: '🌟',
    rewardXp: 250,
    rewardCoins: 100,
    getCurrentProgress: (stats) => Math.min(7, stats.streakDays || 1),
    getCustomActionHint: (_, remaining) =>
      `Öffne die App an ${remaining} weiteren aufeinanderfolgenden Tagen und schließe Lerneinheiten ab.`,
  },
];

export interface EvaluatedAchievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'quiz' | 'care' | 'streak';
  currentProgress: number;
  targetProgress: number;
  percentage: number;
  unit: string;
  icon: string;
  rewardXp: number;
  rewardCoins: number;
  isUnlocked: boolean;
  isClaimed: boolean;
  actionHint: string;
}

export function getEvaluatedAchievements(stats: UserStats): EvaluatedAchievement[] {
  const claimedList = stats.claimedAchievements || [];

  return ACHIEVEMENTS.map((def) => {
    const rawVal = def.getCurrentProgress(stats);
    const currentProgress = Math.min(def.targetProgress, Math.max(0, rawVal));
    const isUnlocked = rawVal >= def.targetProgress;
    const isClaimed = claimedList.includes(def.id);
    const remaining = Math.max(0, def.targetProgress - currentProgress);

    const percentage = Math.min(
      100,
      Math.max(0, Math.round((currentProgress / def.targetProgress) * 100))
    );

    let actionHint = '';
    if (isClaimed) {
      actionHint = '✅ Erfolgreich abgeschlossen & Belohnung bereits erhalten!';
    } else if (isUnlocked) {
      actionHint = '🎉 Ziel erreicht! Klicke auf "Belohnung abholen", um deine XP & Coins zu kassieren!';
    } else {
      actionHint = `💡 Nächster Schritt: ${def.getCustomActionHint(stats, remaining)}`;
    }

    return {
      id: def.id,
      title: def.title,
      description: def.description,
      category: def.category,
      currentProgress,
      targetProgress: def.targetProgress,
      percentage,
      unit: def.unit,
      icon: def.icon,
      rewardXp: def.rewardXp,
      rewardCoins: def.rewardCoins,
      isUnlocked,
      isClaimed,
      actionHint,
    };
  });
}
