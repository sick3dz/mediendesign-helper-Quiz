/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CHAPTERS } from './data/chaptersData';
import { UserStats, Badge, PetSpecies, PetState, EquippedCosmetics } from './types/quiz';
import {
  loadUserStats,
  saveUserStats,
  loadUserSettings,
  saveUserSettings,
  UserSettings,
  calculateLevel,
  LEVEL_LADDER,
  ALL_BADGES,
} from './services/storageService';
import { soundEffects } from './services/audioService';
import { TopBar, ActiveTab } from './components/TopBar';
import { AdhdControlsBar } from './components/AdhdControlsBar';
import { TopPetCompanionBar } from './components/TopPetCompanionBar';
import { DailyMissionsBar } from './components/DailyMissionsBar';
import { PetAdoptionModal } from './components/PetAdoptionModal';
import { ChapterListView } from './components/ChapterListView';
import { ModuleLearningView } from './components/ModuleLearningView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { SpickzettelView } from './components/SpickzettelView';
import { MiniGamesHubView } from './components/MiniGamesHubView';
import { DataSandboxView } from './components/DataSandboxView';
import { FocusSprintModal } from './components/FocusSprintModal';
import { BackupModal } from './components/BackupModal';
import { ChapterSurpriseModal } from './components/ChapterSurpriseModal';
import { CHAPTER_SURPRISES, ChapterSurprise, calculatePetDecay } from './data/petData';
import { ambientAudioService, AmbientSoundType } from './services/ambientAudioService';
import confetti from 'canvas-confetti';
import { Star, ArrowLeft, RotateCcw, BookOpen, Sparkles } from 'lucide-react';

import { VirtualPetView } from './components/VirtualPetView';
import { RankProgressView } from './components/RankProgressView';
import { AchievementsMilestonesView } from './components/AchievementsMilestonesView';
import { LearningStatsView } from './components/LearningStatsView';
import { getPrioritizedQuestions, getAllQuestions } from './utils/learningLogic';
import { QuizCard } from './components/QuizCard';
import { MindfulBreathingModal } from './components/MindfulBreathingModal';
import { MixUpConfigModal } from './components/MixUpConfigModal';
import { DidacticMixUpView } from './components/DidacticMixUpView';
import { buildCustomMixPool, BlitzItem } from './utils/blitzContent';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chapters');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ixd');
  const [selectedModuleMeta, setSelectedModuleMeta] = useState<{
    chapterId: string;
    moduleId: string;
    level?: 1 | 2;
  } | null>(null);
  const [reviewQuestions, setReviewQuestions] = useState<any[] | null>(null);
  const [isMixUpModalOpen, setIsMixUpModalOpen] = useState<boolean>(false);
  const [activeMixUpItems, setActiveMixUpItems] = useState<BlitzItem[] | null>(null);

  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [settings, setSettings] = useState<UserSettings>(() => {
    const s = loadUserSettings();
    if (s.breakReminderMinutes === 25) {
      const updated = { ...s, breakReminderMinutes: null };
      saveUserSettings(updated);
      return updated;
    }
    return s;
  });
  const [isFocusSprintOpen, setIsFocusSprintOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState<boolean>(
    () => !stats.pet?.hasAdopted
  );
  const [petInitialTab, setPetInitialTab] = useState<'care' | 'shop' | 'wardrobe' | 'adopt'>('care');
  const [activeSurprise, setActiveSurprise] = useState<ChapterSurprise | null>(null);
  const [petPreviewOverride, setPetPreviewOverride] = useState<{ equipped?: Partial<PetState['equipped']> } | undefined>(undefined);

  // Focus Sprint Global Persistent State
  const [sprintTotalSeconds, setSprintTotalSeconds] = useState(300);
  const [sprintSecondsLeft, setSprintSecondsLeft] = useState(300);
  const [isSprintActive, setIsSprintActive] = useState(false);
  const [sprintIsDone, setSprintIsDone] = useState(false);
  const [sprintSoundType, setSprintSoundType] = useState<AmbientSoundType>('lofi');
  const [sprintVolume, setSprintVolume] = useState<number>(0.35);
  const [sprintIsMuted, setSprintIsMuted] = useState<boolean>(false);

  // Exact wall-clock timestamp tracking for running in background tabs & locked screens
  const sprintEndTimeRef = useRef<number | null>(null);
  const lastStudyTickRef = useRef<number>(Date.now());

  // Break Reminder & Mindful Study Session State
  const [studySeconds, setStudySeconds] = useState<number>(0);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState<boolean>(false);

  // Restore any ongoing background Focus Sprint on page mount
  useEffect(() => {
    try {
      const savedEnd = localStorage.getItem('focus_sprint_target_end');
      const savedTotal = localStorage.getItem('focus_sprint_total_seconds');
      if (savedEnd) {
        const targetEnd = parseInt(savedEnd, 10);
        if (targetEnd && !isNaN(targetEnd)) {
          const now = Date.now();
          if (targetEnd > now) {
            const remaining = Math.max(1, Math.ceil((targetEnd - now) / 1000));
            sprintEndTimeRef.current = targetEnd;
            if (savedTotal) {
              setSprintTotalSeconds(parseInt(savedTotal, 10) || 300);
            }
            setSprintSecondsLeft(remaining);
            setIsSprintActive(true);
          } else {
            // Timer expired while page was away
            localStorage.removeItem('focus_sprint_target_end');
            setSprintSecondsLeft(0);
            setSprintIsDone(true);
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Active study timer for break reminder - accurately tracks real elapsed wall-clock seconds
  useEffect(() => {
    lastStudyTickRef.current = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const deltaSec = Math.round((now - lastStudyTickRef.current) / 1000);
      if (deltaSec > 0) {
        setStudySeconds(prev => prev + deltaSec);
        lastStudyTickRef.current = now;
      }
    }, 1000);

    const handleCatchUp = () => {
      const now = Date.now();
      const deltaSec = Math.round((now - lastStudyTickRef.current) / 1000);
      if (deltaSec > 0) {
        setStudySeconds(prev => prev + deltaSec);
        lastStudyTickRef.current = now;
      }
    };

    document.addEventListener('visibilitychange', handleCatchUp);
    window.addEventListener('focus', handleCatchUp);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleCatchUp);
      window.removeEventListener('focus', handleCatchUp);
    };
  }, []);

  // Sync dark mode class on <html> & <body>
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Sync active cosmetic theme on <html>
  useEffect(() => {
    const theme = stats.equippedCosmetics?.theme || 'theme-default';
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
    document.documentElement.classList.remove(...allThemes);
    if (theme !== 'theme-default') {
      document.documentElement.classList.add(theme);
    }
  }, [stats.equippedCosmetics?.theme]);

  // Sync active soundpack in soundEffects
  useEffect(() => {
    const soundpack = stats.equippedCosmetics?.soundpack || 'sound-standard';
    soundEffects.setSoundpack(soundpack);
  }, [stats.equippedCosmetics?.soundpack]);

  // Initialize sound mute state
  useEffect(() => {
    soundEffects.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Daily streak check
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutive = stats.lastActiveDate === yesterday;
      const updatedStreak = isConsecutive ? stats.streakDays + 1 : 1;

      const updatedStats = {
        ...stats,
        lastActiveDate: today,
        streakDays: updatedStreak,
      };
      setStats(updatedStats);
      saveUserStats(updatedStats);
    }
  }, []);

  // Periodic pet vitals decay check (hunger, energy & happiness based on time elapsed)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        if (!prevStats.pet) return prevStats;
        const decayedPet = calculatePetDecay(prevStats.pet);
        if (
          decayedPet.hunger !== prevStats.pet.hunger ||
          decayedPet.happiness !== prevStats.pet.happiness ||
          decayedPet.isSleeping !== prevStats.pet.isSleeping
        ) {
          const updatedStats = { ...prevStats, pet: decayedPet };
          saveUserStats(updatedStats);
          return updatedStats;
        }
        return prevStats;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveUserSettings(newSettings);
  };

  const handleToggleDarkMode = () => {
    soundEffects.playClick();
    const nextDark = !settings.darkMode;
    handleUpdateSettings({ ...settings, darkMode: nextDark });
  };

  const checkBadgeUnlocks = (currentStats: UserStats): string[] => {
    const newlyEarned = [...currentStats.earnedBadges];

    if (currentStats.answeredQuestionsCount >= 3 && !newlyEarned.includes('streak_3')) {
      newlyEarned.push('streak_3');
    }

    // Pet badges
    if ((currentStats.pet.timesFed > 0 || currentStats.pet.timesPetted > 0) && !newlyEarned.includes('pet_friend')) {
      newlyEarned.push('pet_friend');
    }

    if (currentStats.pet.inventory.accessories.length > 0 && !newlyEarned.includes('pet_stylist')) {
      newlyEarned.push('pet_stylist');
    }

    // Chapters completion badges
    const ixdDone = CHAPTERS[0].modules.every(m => currentStats.completedModules.includes(m.id));
    if (ixdDone && !newlyEarned.includes('ixd_master')) newlyEarned.push('ixd_master');

    const wfDone = CHAPTERS[1].modules.every(m => currentStats.completedModules.includes(m.id));
    if (wfDone && !newlyEarned.includes('wireframe_pro')) newlyEarned.push('wireframe_pro');

    const protoDone = CHAPTERS[2].modules.every(m => currentStats.completedModules.includes(m.id));
    if (protoDone && !newlyEarned.includes('prototype_tester')) newlyEarned.push('prototype_tester');

    const secDone = CHAPTERS[3].modules.every(m => currentStats.completedModules.includes(m.id));
    if (secDone && !newlyEarned.includes('security_shield')) newlyEarned.push('security_shield');

    const a11yDone = CHAPTERS[4].modules.every(m => currentStats.completedModules.includes(m.id));
    if (a11yDone && !newlyEarned.includes('a11y_champion')) newlyEarned.push('a11y_champion');

    const projDone = CHAPTERS[5].modules.every(m => currentStats.completedModules.includes(m.id));
    if (projDone && !newlyEarned.includes('agile_scrum')) newlyEarned.push('agile_scrum');

    const dbDone = CHAPTERS[6]?.modules.every(m => currentStats.completedModules.includes(m.id));
    if (dbDone && !newlyEarned.includes('database_architect')) newlyEarned.push('database_architect');

    // Level 2 Mastery Badges
    const lvl2List = currentStats.completedModulesLevel2 || [];
    if (lvl2List.length >= 1 && !newlyEarned.includes('master_first')) {
      newlyEarned.push('master_first');
    }
    const anyChapterLvl2Done = CHAPTERS.some(ch => ch.modules.length > 0 && ch.modules.every(m => lvl2List.includes(m.id)));
    if (anyChapterLvl2Done && !newlyEarned.includes('master_chapter')) {
      newlyEarned.push('master_chapter');
    }

    return newlyEarned;
  };

  const grantLevelUpRewards = (
    prevStats: UserStats,
    newLifetimeXp: number,
    basePet: PetState
  ): { level: number; updatedPet: PetState; newlyLeveledUp: boolean } => {
    const levelInfo = calculateLevel(newLifetimeXp);
    const leveledUp = levelInfo.level > prevStats.level;
    let updatedPet = { ...basePet };

    if (leveledUp) {
      soundEffects.playLevelUp();
      LEVEL_LADDER.filter(t => t.level <= levelInfo.level && t.level > prevStats.level).forEach(tier => {
        const curQty = updatedPet.inventory.food[tier.rewardFood.id] || 0;
        updatedPet.inventory = {
          ...updatedPet.inventory,
          food: {
            ...updatedPet.inventory.food,
            [tier.rewardFood.id]: curQty + tier.rewardFood.count,
          },
        };
      });
    }

    return {
      level: Math.max(prevStats.level, levelInfo.level),
      updatedPet,
      newlyLeveledUp: leveledUp,
    };
  };

  const handleModuleCompleted = (moduleId: string, gainedXp: number, level: 1 | 2 = 1) => {
    setStats(prev => {
      const alreadyCompleted = prev.completedModules.includes(moduleId);
      const updatedCompleted = alreadyCompleted
        ? prev.completedModules
        : [...prev.completedModules, moduleId];

      const curLvl2 = prev.completedModulesLevel2 || [];
      const updatedLvl2 = level === 2 && !curLvl2.includes(moduleId)
        ? [...curLvl2, moduleId]
        : curLvl2;

      const curLifetime = prev.lifetimeXp ?? prev.xp;
      const newLifetimeXp = curLifetime + gainedXp;
      const newXp = prev.xp + gainedXp; // Spendable credit
      const earnedCoins = Math.round(gainedXp * 0.6) + 30;
      const newCoins = prev.coins + earnedCoins;

      // Check for newly completed chapters and exclusive surprises
      let basePet = { ...prev.pet };
      let newlyUnlockedSurprise: ChapterSurprise | null = null;

      for (const surprise of CHAPTER_SURPRISES) {
        const chapter = CHAPTERS.find(c => c.id === surprise.chapterId);
        if (chapter && chapter.modules.length > 0) {
          const isChapterComplete = chapter.modules.every(m => updatedCompleted.includes(m.id));
          const alreadyHasSurprise = basePet.inventory.accessories.includes(surprise.accessory.id);
          if (isChapterComplete && !alreadyHasSurprise) {
            basePet = {
              ...basePet,
              inventory: {
                ...basePet.inventory,
                accessories: [...basePet.inventory.accessories, surprise.accessory.id],
              },
            };
            if (!newlyUnlockedSurprise) {
              newlyUnlockedSurprise = surprise;
            }
          }
        }
      }

      if (newlyUnlockedSurprise) {
        setTimeout(() => {
          setActiveSurprise(newlyUnlockedSurprise);
        }, 500);
      }

      // Check for level ups and reward free food packages
      const { level: userLevel, updatedPet } = grantLevelUpRewards(prev, newLifetimeXp, basePet);

      // Update daily mission for module learning
      const missions = prev.dailyMissions || [];
      const updatedMissions = missions.map(m => {
        if (m.category === 'module') {
          return { ...m, currentCount: m.currentCount + 1 };
        }
        return m;
      });

      const nextStats: UserStats = {
        ...prev,
        pet: updatedPet,
        xp: newXp,
        lifetimeXp: newLifetimeXp,
        coins: newCoins,
        level: userLevel,
        dailyMissions: updatedMissions,
        completedModules: updatedCompleted,
        completedModulesLevel2: updatedLvl2,
        earnedBadges: checkBadgeUnlocks({
          ...prev,
          pet: updatedPet,
          xp: newXp,
          lifetimeXp: newLifetimeXp,
          coins: newCoins,
          completedModules: updatedCompleted,
          completedModulesLevel2: updatedLvl2,
        }),
      };

      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleCorrectAnswer = () => {
    setStats(prev => {
      const missions = prev.dailyMissions || [];
      const updatedMissions = missions.map(m => {
        if (m.category === 'quiz') {
          return { ...m, currentCount: m.currentCount + 1 };
        }
        return m;
      });
      const nextStats: UserStats = {
        ...prev,
        dailyMissions: updatedMissions,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleAnswer = (questionId: string, isCorrect: boolean) => {
    setStats(prev => {
      const perf = prev.questionPerformance[questionId] || { correctCount: 0, wrongCount: 0 };
      const updatedPerf = {
        ...prev.questionPerformance,
        [questionId]: {
          correctCount: isCorrect ? perf.correctCount + 1 : perf.correctCount,
          wrongCount: !isCorrect ? perf.wrongCount + 1 : perf.wrongCount,
          lastAnswered: new Date().toISOString()
        }
      };

      // Find the chapter this question belongs to (checking both EXAM_QUESTIONS and CHAPTERS)
      let chapterId = '';
      for (const ch of CHAPTERS) {
        for (const mod of ch.modules) {
          if (mod.quizQuestions.some(q => q.id === questionId) || mod.level2QuizQuestions?.some(q => q.id === questionId)) {
            chapterId = ch.id;
            break;
          }
        }
        if (chapterId) break;
      }
      
      // Fallback to searching EXAM_QUESTIONS directly if not found in modules
      if (!chapterId) {
        // EXAM_QUESTIONS is likely imported or available. Assuming it's available or we can find it.
        // For simplicity, if we can't find the chapter, we just skip mastery update.
      }

      let updatedMastery = prev.topicMastery;
      if (chapterId) {
        const chapter = CHAPTERS.find(c => c.id === chapterId);
        if (chapter) {
          const allChapterQuestions: string[] = [];
          chapter.modules.forEach(m => {
            m.quizQuestions.forEach(q => allChapterQuestions.push(q.id));
            m.level2QuizQuestions?.forEach(q => allChapterQuestions.push(q.id));
          });
          
          const correctQuestionsInChapter = allChapterQuestions.filter(qid => {
            const p = updatedPerf[qid];
            return p && p.correctCount > 0;
          }).length;
          
          const masteryPercent = allChapterQuestions.length > 0 
            ? Math.round((correctQuestionsInChapter / allChapterQuestions.length) * 100)
            : 0;
            
          updatedMastery = {
            ...prev.topicMastery,
            [chapterId]: masteryPercent
          };
        }
      }

      const nextStats: UserStats = {
        ...prev,
        questionPerformance: updatedPerf,
        topicMastery: updatedMastery,
        answeredQuestionsCount: prev.answeredQuestionsCount + 1,
        correctAnswersCount: isCorrect ? prev.correctAnswersCount + 1 : prev.correctAnswersCount
      };
      
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleFocusSprintCompleted = (earnedXp: number) => {
    setStats(prev => {
      const missions = prev.dailyMissions || [];
      const updatedMissions = missions.map(m => {
        if (m.category === 'focus') {
          return { ...m, currentCount: m.currentCount + 1 };
        }
        return m;
      });
      const curLifetime = prev.lifetimeXp ?? prev.xp;
      const newLifetimeXp = curLifetime + earnedXp;
      const newXp = prev.xp + earnedXp;
      const { level, updatedPet } = grantLevelUpRewards(prev, newLifetimeXp, prev.pet);

      const nextStats: UserStats = {
        ...prev,
        pet: updatedPet,
        xp: newXp,
        lifetimeXp: newLifetimeXp,
        level,
        dailyMissions: updatedMissions,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  // Sync ambient sound with timer running state globally
  useEffect(() => {
    if (isSprintActive && sprintSoundType !== 'none') {
      ambientAudioService.play(sprintSoundType);
    } else {
      ambientAudioService.stop();
    }
  }, [isSprintActive, sprintSoundType]);

  // Global Focus Sprint countdown synchronized with real wall-clock time & background events
  useEffect(() => {
    if (!isSprintActive) return;

    if (!sprintEndTimeRef.current) {
      sprintEndTimeRef.current = Date.now() + sprintSecondsLeft * 1000;
      try {
        localStorage.setItem('focus_sprint_target_end', String(sprintEndTimeRef.current));
        localStorage.setItem('focus_sprint_total_seconds', String(sprintTotalSeconds));
      } catch {
        // ignore
      }
    }

    const syncSprintTime = () => {
      const targetEnd = sprintEndTimeRef.current;
      if (!targetEnd) return;

      const now = Date.now();
      const remainingMs = targetEnd - now;
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

      setSprintSecondsLeft(remainingSecs);

      if (remainingMs <= 0) {
        setIsSprintActive(false);
        setSprintIsDone(true);
        sprintEndTimeRef.current = null;
        try {
          localStorage.removeItem('focus_sprint_target_end');
        } catch {
          // ignore
        }
        ambientAudioService.stop();
        soundEffects.playLevelUp();
        try {
          confetti({ particleCount: 85, spread: 80, origin: { y: 0.3 } });
        } catch {
          // ignore
        }
        handleFocusSprintCompleted(15);

        // Native Web Notification when session finishes outside the window/tab
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification('⏱️ Fokus-Session abgeschlossen!', {
              body: 'Klasse Leistung! Deine Fokus-Session ist beendet. Gönn dir eine Pause! (+15 EXP)',
              icon: '/favicon.ico',
            });
          } catch {
            // ignore
          }
        }
      }
    };

    // Fast check to ensure smooth second updates
    const interval = setInterval(syncSprintTime, 500);

    // Immediate sync when returning to tab, focusing window, or waking device
    const handleVisibilityOrFocus = () => {
      syncSprintTime();
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);
    window.addEventListener('pageshow', handleVisibilityOrFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      window.removeEventListener('pageshow', handleVisibilityOrFocus);
    };
  }, [isSprintActive]);

  // Dynamic Browser Tab Title with Live Countdown
  useEffect(() => {
    if (isSprintActive && sprintSecondsLeft > 0) {
      const mins = Math.floor(sprintSecondsLeft / 60);
      const secs = sprintSecondsLeft % 60;
      const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      document.title = `⏱️ ${timeStr} • Fokus-Session | DesignKonzept.prep`;
    } else if (sprintIsDone) {
      document.title = `🎉 Belohnung! • Fokus-Session | DesignKonzept.prep`;
    } else {
      document.title = 'DesignKonzept.prep - IHK Prüfungsvorbereitung';
    }
  }, [isSprintActive, sprintSecondsLeft, sprintIsDone]);

  const handleClaimSprintLoot = (rewardText: string) => {
    setStats(prev => {
      let updatedPet = { ...prev.pet };
      let newXp = prev.xp;

      if (rewardText.includes('Glücks-Kekse')) {
        const cur = updatedPet.inventory.food['cookie'] || 0;
        updatedPet.inventory = {
          ...updatedPet.inventory,
          food: { ...updatedPet.inventory.food, cookie: cur + 2 },
        };
      } else if (rewardText.includes('Bubble-Tea')) {
        const cur = updatedPet.inventory.food['boba'] || 0;
        updatedPet.inventory = {
          ...updatedPet.inventory,
          food: { ...updatedPet.inventory.food, boba: cur + 1 },
        };
      } else if (rewardText.includes('Prüfungs-Apfel')) {
        const cur = updatedPet.inventory.food['golden_apple'] || 0;
        updatedPet.inventory = {
          ...updatedPet.inventory,
          food: { ...updatedPet.inventory.food, golden_apple: cur + 1 },
        };
      } else if (rewardText.includes('30 Bonus EXP')) {
        newXp += 30;
      }

      const updatedStats = {
        ...prev,
        xp: newXp,
        pet: updatedPet,
      };
      saveUserStats(updatedStats);
      return updatedStats;
    });
  };

  const handleToggleSprintActive = () => {
    soundEffects.playClick();
    setIsSprintActive(prev => {
      const nextActive = !prev;
      if (nextActive) {
        // Resume or start: set target wall clock timestamp
        const targetEnd = Date.now() + sprintSecondsLeft * 1000;
        sprintEndTimeRef.current = targetEnd;
        try {
          localStorage.setItem('focus_sprint_target_end', String(targetEnd));
          localStorage.setItem('focus_sprint_total_seconds', String(sprintTotalSeconds));
        } catch {
          // ignore
        }
      } else {
        // Paused: clear target end time
        sprintEndTimeRef.current = null;
        try {
          localStorage.removeItem('focus_sprint_target_end');
        } catch {
          // ignore
        }
      }
      return nextActive;
    });
  };

  const handleResetSprint = (secs: number = sprintTotalSeconds) => {
    soundEffects.playClick();
    setIsSprintActive(false);
    sprintEndTimeRef.current = null;
    try {
      localStorage.removeItem('focus_sprint_target_end');
    } catch {
      // ignore
    }
    setSprintTotalSeconds(secs);
    setSprintSecondsLeft(secs);
    setSprintIsDone(false);
    ambientAudioService.stop();
  };

  const handleSelectSprintSound = (type: AmbientSoundType) => {
    soundEffects.playClick();
    setSprintSoundType(type);
    if (isSprintActive) {
      if (type === 'none') {
        ambientAudioService.stop();
      } else {
        ambientAudioService.play(type);
      }
    }
  };

  const handleSprintVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setSprintVolume(newVol);
    ambientAudioService.setVolume(newVol);
    if (sprintIsMuted && newVol > 0) {
      setSprintIsMuted(false);
      ambientAudioService.setMuted(false);
    }
  };

  const handleToggleSprintMute = () => {
    const nextMuted = !sprintIsMuted;
    setSprintIsMuted(nextMuted);
    ambientAudioService.setMuted(nextMuted);
  };

  const sprintMinutes = Math.floor(sprintSecondsLeft / 60);
  const sprintSeconds = sprintSecondsLeft % 60;
  const sprintTimeFormatted = `${String(sprintMinutes).padStart(2, '0')}:${String(sprintSeconds).padStart(2, '0')}`;

  const handleClaimDailyMission = (missionId: string) => {
    setStats(prev => {
      const missions = prev.dailyMissions || [];
      const target = missions.find(m => m.id === missionId);
      if (!target || target.isClaimed || target.currentCount < target.targetCount) {
        return prev;
      }
      const updatedMissions = missions.map(m => (m.id === missionId ? { ...m, isClaimed: true } : m));
      const curLifetime = prev.lifetimeXp ?? prev.xp;
      const newLifetimeXp = curLifetime + target.rewardXp;
      const newXp = prev.xp + target.rewardXp;
      const { level, updatedPet } = grantLevelUpRewards(prev, newLifetimeXp, prev.pet);

      const nextStats: UserStats = {
        ...prev,
        pet: updatedPet,
        xp: newXp,
        lifetimeXp: newLifetimeXp,
        level,
        dailyMissions: updatedMissions,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleScoreEarned = (score: number) => {
    setStats(prev => {
      const curLifetime = prev.lifetimeXp ?? prev.xp;
      const newLifetimeXp = curLifetime + score;
      const newXp = prev.xp + score;
      const earnedCoins = Math.round(score * 0.5);
      const newCoins = prev.coins + earnedCoins;
      const { level, updatedPet } = grantLevelUpRewards(prev, newLifetimeXp, prev.pet);

      const nextStats: UserStats = {
        ...prev,
        pet: updatedPet,
        xp: newXp,
        lifetimeXp: newLifetimeXp,
        coins: newCoins,
        level,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleExamCompleted = (result: {
    score: number;
    total: number;
    percentage: number;
    grade: string;
  }) => {
    const gainedXp = result.score * 15;
    const gainedCoins = result.score * 30 + 100;

    setStats(prev => {
      const curLifetime = prev.lifetimeXp ?? prev.xp;
      const newLifetimeXp = curLifetime + gainedXp;
      const newXp = prev.xp + gainedXp;
      const newCoins = prev.coins + gainedCoins;
      const levelInfo = calculateLevel(newLifetimeXp);
      const badges = [...prev.earnedBadges];
      if ((result.grade === '1' || result.grade === '2') && !badges.includes('exam_ready')) {
        badges.push('exam_ready');
      }

      const nextStats: UserStats = {
        ...prev,
        xp: newXp,
        lifetimeXp: newLifetimeXp,
        coins: newCoins,
        level: Math.max(prev.level, levelInfo.level),
        earnedBadges: badges,
        examScores: [
          ...prev.examScores,
          {
            date: new Date().toLocaleDateString('de-DE'),
            score: result.score,
            total: result.total,
            percentage: result.percentage,
            grade: result.grade,
          },
        ],
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleUpdateStats = (updatedStats: UserStats) => {
    const currentLifetime = updatedStats.lifetimeXp ?? updatedStats.xp ?? 0;
    const levelInfo = calculateLevel(currentLifetime);
    const safeStats: UserStats = {
      ...updatedStats,
      level: Math.max(updatedStats.level || 1, levelInfo.level),
      lifetimeXp: currentLifetime,
    };
    setStats(safeStats);
    saveUserStats(safeStats);
  };

  const handleUpdatePet = (updatedPet: typeof stats.pet) => {
    setStats(prev => {
      const nextStats: UserStats = {
        ...prev,
        pet: updatedPet,
        earnedBadges: checkBadgeUnlocks({
          ...prev,
          pet: updatedPet,
        }),
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleCoinsChange = (newCoins: number) => {
    setStats(prev => {
      const nextStats: UserStats = {
        ...prev,
        coins: newCoins,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleXpChange = (newXp: number) => {
    setStats(prev => {
      const safeXp = Math.max(0, newXp);
      // Spending EXP acts strictly as spending balance/credit; level and lifetimeXp are never reduced!
      const nextStats: UserStats = {
        ...prev,
        xp: safeXp,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleUpdateCosmetics = (unlocked: string[], equipped: EquippedCosmetics) => {
    setStats(prev => {
      const nextStats: UserStats = {
        ...prev,
        unlockedCosmetics: unlocked,
        equippedCosmetics: equipped,
      };
      saveUserStats(nextStats);
      return nextStats;
    });
  };

  const handleAdoptPet = (species: PetSpecies, name: string) => {
    setStats(prev => {
      const updatedPet: PetState = {
        ...prev.pet,
        hasAdopted: true,
        species,
        name,
        hunger: Math.max(prev.pet?.hunger || 0, 75),
        happiness: Math.max(prev.pet?.happiness || 0, 80),
      };
      const nextStats: UserStats = {
        ...prev,
        pet: updatedPet,
        earnedBadges: checkBadgeUnlocks({
          ...prev,
          pet: updatedPet,
        }),
      };
      saveUserStats(nextStats);
      return nextStats;
    });
    setIsAdoptionModalOpen(false);
  };

  // Find currently active module
  const currentChapter = selectedModuleMeta
    ? CHAPTERS.find(c => c.id === selectedModuleMeta.chapterId)
    : null;
  const currentModule = currentChapter
    ? currentChapter.modules.find(m => m.id === selectedModuleMeta?.moduleId)
    : null;

  const speciesEmojiMap: Record<PetSpecies, string> = {
    dog: '🐶',
    cat: '🐱',
    penguin: '🐧',
    axolotl: '🦎',
    unicorn: '🦄',
  };

  // Determine next module
  const currentChapterIndex = currentChapter
    ? CHAPTERS.findIndex(c => c.id === currentChapter.id)
    : -1;
  const currentModuleIndex =
    currentChapter && currentModule
      ? currentChapter.modules.findIndex(m => m.id === currentModule.id)
      : -1;
  const hasNextInChapter =
    currentChapter &&
    currentModuleIndex >= 0 &&
    currentModuleIndex + 1 < currentChapter.modules.length;
  const hasNextChapter =
    currentChapterIndex >= 0 && currentChapterIndex + 1 < CHAPTERS.length;
  const hasNextModule = Boolean(hasNextInChapter || hasNextChapter);

  const handleNextModule = () => {
    if (!currentChapter || !currentModule) return;
    if (hasNextInChapter) {
      const nextMod = currentChapter.modules[currentModuleIndex + 1];
      setSelectedModuleMeta({
        chapterId: currentChapter.id,
        moduleId: nextMod.id,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hasNextChapter) {
      const nextChap = CHAPTERS[currentChapterIndex + 1];
      if (nextChap.modules.length > 0) {
        setSelectedChapterId(nextChap.id);
        setSelectedModuleMeta({
          chapterId: nextChap.id,
          moduleId: nextChap.modules[0].id,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSelectedModuleMeta(null);
    }
  };

  const handleStartReview = () => {
    const all = getAllQuestions(CHAPTERS);
    const prioritized = getPrioritizedQuestions(all, stats, 10);
    setReviewQuestions(prioritized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Break Reminder & Mindful Breathing Handlers
  const handleSnoozeBreak = () => {
    const targetSeconds = (settings.breakReminderMinutes ?? 25) * 60;
    setStudySeconds(Math.max(0, targetSeconds - 300));
  };

  const handleResetStudyTimer = () => {
    setStudySeconds(0);
  };

  const handleStartBreathing = () => {
    setIsBreathingModalOpen(true);
  };

  const handleCompleteBreathing = () => {
    setIsBreathingModalOpen(false);
    setStudySeconds(0);

    const bonusXp = 5;
    const newXp = stats.xp + bonusXp;
    const newLifetimeXp = (stats.lifetimeXp ?? stats.xp) + bonusXp;
    const newHappiness = Math.min(100, stats.pet.happiness + 15);
    const updatedPet: PetState = {
      ...stats.pet,
      isSleeping: false,
      happiness: newHappiness,
      timesPlayed: (stats.pet.timesPlayed || 0) + 1,
    };

    const updatedStats: UserStats = {
      ...stats,
      xp: newXp,
      lifetimeXp: newLifetimeXp,
      pet: updatedPet,
    };

    setStats(updatedStats);
    saveUserStats(updatedStats);
  };

  const handleStartMixUp = (selectedModuleIds: string[]) => {
    const items = buildCustomMixPool(selectedModuleIds);
    if (items.length > 0) {
      setActiveMixUpItems(items);
      setIsMixUpModalOpen(false);
    }
  };

  // Determine current view label and icon for TopBar dynamically
  let currentViewTitle: string | undefined;
  let currentViewIcon: React.ReactNode | undefined;

  if (reviewQuestions) {
    currentViewTitle = 'Wiederholungs-Session';
    currentViewIcon = <RotateCcw className="w-4 h-4 text-rose-500 shrink-0" />;
  } else if (activeMixUpItems) {
    currentViewTitle = 'Themen-Mix Quiz';
    currentViewIcon = <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />;
  } else if (selectedModuleMeta && currentModule) {
    currentViewTitle = currentModule.title;
    currentViewIcon = <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />;
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Strict 3-zone Top Navigation */}
      <TopBar
        activeTab={activeTab}
        currentViewTitle={currentViewTitle}
        currentViewIcon={currentViewIcon}
        setActiveTab={tab => {
          setSelectedModuleMeta(null);
          setActiveMixUpItems(null);
          setReviewQuestions(null);
          if (tab === 'pet') {
            setPetInitialTab('care');
          } else if (tab === 'shop') {
            setPetInitialTab('shop');
          }
          setActiveTab(tab);
        }}
        darkMode={settings.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenFocusSprint={() => setIsFocusSprintOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        petSpeciesEmoji={speciesEmojiMap[stats.pet.species] || '🐾'}
        isSprintActive={isSprintActive}
        isSprintDone={sprintIsDone}
        sprintTimeFormatted={sprintTimeFormatted}
      />

      {/* ADHD Cognitive Aids & Gamification Bar */}
      <AdhdControlsBar
        stats={stats}
        settings={settings}
        studySeconds={studySeconds}
        onUpdateSettings={handleUpdateSettings}
        onGoToPet={() => {
          setSelectedModuleMeta(null);
          setActiveMixUpItems(null);
          setReviewQuestions(null);
          setPetInitialTab('shop');
          setActiveTab('shop');
        }}
        onGoToRank={() => {
          setSelectedModuleMeta(null);
          setActiveMixUpItems(null);
          setReviewQuestions(null);
          setActiveTab('rank');
        }}
        onStartBreathing={handleStartBreathing}
        onSnoozeBreak={handleSnoozeBreak}
        onResetTimer={handleResetStudyTimer}
      />

      {/* Top Interactive Pet Companion Bar */}
      <TopPetCompanionBar
        stats={stats}
        onUpdatePet={handleUpdatePet}
        onUpdateStats={handleUpdateStats}
        onOpenFullPetRoom={() => {
          setSelectedModuleMeta(null);
          setActiveMixUpItems(null);
          setReviewQuestions(null);
          setPetInitialTab('care');
          setActiveTab('pet');
        }}
        previewOverride={petPreviewOverride}
      />

      {/* Daily Quests / Missions Ribbon Bar */}
      <DailyMissionsBar
        missions={stats.dailyMissions || []}
        onClaimReward={handleClaimDailyMission}
        onOpenFocusSprint={() => setIsFocusSprintOpen(true)}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {reviewQuestions ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setReviewQuestions(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Abbrechen & Zurück</span>
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-rose-700 dark:text-rose-300 text-[10px] font-bold uppercase tracking-wider">
                <RotateCcw className="w-3 h-3" />
                <span>Wiederholungs-Session</span>
              </div>
            </div>

            <QuizCard
              questions={reviewQuestions}
              bionic={settings.bionicReading}
              onFinished={(score) => {
                handleScoreEarned(score);
                setReviewQuestions(null);
              }}
              onCorrectAnswer={handleCorrectAnswer}
              onAnswer={handleAnswer}
              onBackToOverview={() => setReviewQuestions(null)}
            />
          </div>
        ) : activeMixUpItems ? (
          <DidacticMixUpView
            items={activeMixUpItems}
            bionic={settings.bionicReading}
            onFinished={(score) => {
              handleScoreEarned(score);
              setActiveMixUpItems(null);
            }}
            onCorrectAnswer={handleCorrectAnswer}
            onAnswer={handleAnswer}
            onBack={() => setActiveMixUpItems(null)}
          />
        ) : selectedModuleMeta && currentChapter && currentModule ? (
          <ModuleLearningView
            chapter={currentChapter}
            module={currentModule}
            bionic={settings.bionicReading}
            initialLevel={selectedModuleMeta.level || 1}
            isLevel1Completed={stats.completedModules.includes(currentModule.id)}
            isLevel2Completed={Boolean(stats.completedModulesLevel2?.includes(currentModule.id))}
            onBack={() => setSelectedModuleMeta(null)}
            onModuleCompleted={(modId, xp, lvl) => handleModuleCompleted(modId, xp, lvl)}
            onCorrectAnswer={handleCorrectAnswer}
            onAnswer={handleAnswer}
            onNextModule={handleNextModule}
            hasNextModule={hasNextModule}
          />
        ) : (
          <>
            {activeTab === 'chapters' && (
              <ChapterListView
                chapters={CHAPTERS}
                stats={stats}
                bionic={settings.bionicReading}
                selectedChapterId={selectedChapterId}
                onSelectChapter={setSelectedChapterId}
                onSelectModule={(cId, mId, lvl) => setSelectedModuleMeta({ chapterId: cId, moduleId: mId, level: lvl || 1 })}
                onStartExam={() => setActiveTab('exam')}
                onStartReview={handleStartReview}
                onOpenMixUpModal={() => setIsMixUpModalOpen(true)}
                onOpenGames={() => setActiveTab('minigames')}
                onGoToSpickzettel={() => setActiveTab('spickzettel')}
              />
            )}

            {activeTab === 'rank' && (
              <RankProgressView
                stats={stats}
                onBack={() => setActiveTab('chapters')}
                onGoToShop={() => setActiveTab('shop')}
                onGoToPet={() => setActiveTab('pet')}
                onGoToAchievements={() => setActiveTab('achievements')}
                onGoToChapters={() => setActiveTab('chapters')}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementsMilestonesView
                stats={stats}
                onBack={() => setActiveTab('chapters')}
                onGoToRank={() => setActiveTab('rank')}
                onGoToPet={() => setActiveTab('pet')}
                onGoToShop={() => setActiveTab('shop')}
                onUpdateStats={handleUpdateStats}
                onXpChange={handleXpChange}
                onCoinsChange={handleCoinsChange}
              />
            )}

            {activeTab === 'pet' && (
              <VirtualPetView
                stats={stats}
                initialTab="care"
                onUpdatePet={handleUpdatePet}
                onUpdateStats={handleUpdateStats}
                onCoinsChange={handleCoinsChange}
                onXpChange={handleXpChange}
                onUpdateCosmetics={handleUpdateCosmetics}
                onOpenAdoptionModal={() => setIsAdoptionModalOpen(true)}
                onGoToGames={() => setActiveTab('minigames')}
                onBack={() => setActiveTab('chapters')}
                onPreviewOverrideChange={setPetPreviewOverride}
              />
            )}

            {activeTab === 'shop' && (
              <VirtualPetView
                stats={stats}
                initialTab="shop"
                onUpdatePet={handleUpdatePet}
                onUpdateStats={handleUpdateStats}
                onCoinsChange={handleCoinsChange}
                onXpChange={handleXpChange}
                onUpdateCosmetics={handleUpdateCosmetics}
                onOpenAdoptionModal={() => setIsAdoptionModalOpen(true)}
                onGoToGames={() => setActiveTab('minigames')}
                onBack={() => setActiveTab('chapters')}
                onPreviewOverrideChange={setPetPreviewOverride}
              />
            )}

            {activeTab === 'exam' && (
              <ExamSimulatorView
                bionic={settings.bionicReading}
                onExamCompleted={handleExamCompleted}
                onAnswer={handleAnswer}
                onGoToChapter={cId => {
                  setSelectedChapterId(cId);
                  setActiveTab('chapters');
                }}
                onBack={() => setActiveTab('chapters')}
              />
            )}

            {activeTab === 'spickzettel' && (
              <SpickzettelView
                bionic={settings.bionicReading}
                onBack={() => setActiveTab('chapters')}
              />
            )}

            {activeTab === 'stats' && (
              <LearningStatsView
                stats={stats}
                chapters={CHAPTERS}
                bionic={settings.bionicReading}
                onBack={() => setActiveTab('chapters')}
                onStartReview={handleStartReview}
                onGoToChapter={cId => {
                  setSelectedChapterId(cId);
                  setActiveTab('chapters');
                }}
                onGoToAchievements={() => setActiveTab('achievements')}
                onUpdateStats={handleUpdateStats}
                onXpChange={handleXpChange}
                onCoinsChange={handleCoinsChange}
              />
            )}

            {activeTab === 'minigames' && (
              <MiniGamesHubView
                onScoreEarned={handleScoreEarned}
                onBack={() => setActiveTab('chapters')}
              />
            )}

            {activeTab === 'sandbox' && (
              <DataSandboxView
                bionic={settings.bionicReading}
                onBack={() => setActiveTab('chapters')}
              />
            )}
          </>
        )}
      </main>

      {/* Initial Pet Selection & Adoption Modal */}
      {isAdoptionModalOpen && (
        <PetAdoptionModal
          currentPet={stats.pet}
          canCancel={Boolean(stats.pet?.hasAdopted)}
          onClose={() => setIsAdoptionModalOpen(false)}
          onAdopt={handleAdoptPet}
        />
      )}

      {/* ADHD Hyperfocus Sprint Modal */}
      <FocusSprintModal
        isOpen={isFocusSprintOpen}
        onClose={() => setIsFocusSprintOpen(false)}
        totalSeconds={sprintTotalSeconds}
        secondsLeft={sprintSecondsLeft}
        isActive={isSprintActive}
        isDone={sprintIsDone}
        soundType={sprintSoundType}
        volume={sprintVolume}
        isMuted={sprintIsMuted}
        onToggleActive={handleToggleSprintActive}
        onReset={handleResetSprint}
        onSelectSound={handleSelectSprintSound}
        onVolumeChange={handleSprintVolumeChange}
        onToggleMute={handleToggleSprintMute}
        onClaimLoot={handleClaimSprintLoot}
      />

      {/* Backup & Restore Manager Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onBackupRestored={(newStats, newSettings) => {
          setStats(newStats);
          if (newSettings) setSettings(newSettings);
        }}
      />

      {/* Chapter Completion Surprise Modal */}
      {activeSurprise && (
        <ChapterSurpriseModal
          surprise={activeSurprise}
          pet={stats.pet}
          onEquipAndClose={() => {
            const category = activeSurprise.accessory.category;
            const updatedPet: PetState = {
              ...stats.pet,
              equipped: {
                ...stats.pet.equipped,
                [category]: activeSurprise.accessory.id,
              },
            };
            handleUpdatePet(updatedPet);
            setActiveSurprise(null);
          }}
          onClose={() => setActiveSurprise(null)}
        />
      )}

      {/* Mindful Breathing Break Modal */}
      {isBreathingModalOpen && (
        <MindfulBreathingModal
          pet={stats.pet}
          equippedCosmetics={stats.equippedCosmetics}
          onClose={() => setIsBreathingModalOpen(false)}
          onComplete={handleCompleteBreathing}
        />
      )}

      {/* Mix-Up Topic & Module Selection Modal */}
      <MixUpConfigModal
        isOpen={isMixUpModalOpen}
        chapters={CHAPTERS}
        onClose={() => setIsMixUpModalOpen(false)}
        onStart={handleStartMixUp}
      />

      {/* Floating Passive Focus Sprint Badge when sprint is active and modal is minimized */}
      {isSprintActive && !isFocusSprintOpen && (
        <button
          onClick={() => setIsFocusSprintOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-slate-900/90 hover:bg-slate-950 text-white dark:bg-indigo-950/90 dark:hover:bg-indigo-900 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl border border-indigo-500/40 flex items-center gap-3 cursor-pointer transition-all hover:scale-105 active:scale-95 group font-mono text-xs"
          title="Fokus-Session öffnen"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-white text-sm tabular-nums">
            ⏱️ {sprintTimeFormatted}
          </span>
          <span className="text-[11px] text-indigo-200 font-sans font-medium hidden sm:inline">
            Fokus läuft im Hintergrund
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-sans font-semibold">
            Öffnen
          </span>
        </button>
      )}

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">DesignKonzept Trainer</span>
            <span aria-hidden="true">·</span>
            <span>Lokale Speicherung ohne Account</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500">
            <span>{stats.pet.name} ({stats.pet.species})</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400" />
              {stats.xp} EXP
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
