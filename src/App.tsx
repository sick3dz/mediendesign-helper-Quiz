/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { FocusSprintModal } from './components/FocusSprintModal';
import { BackupModal } from './components/BackupModal';
import { ChapterSurpriseModal } from './components/ChapterSurpriseModal';
import { CHAPTER_SURPRISES, ChapterSurprise, calculatePetDecay } from './data/petData';

import { VirtualPetView } from './components/VirtualPetView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chapters');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ixd');
  const [selectedModuleMeta, setSelectedModuleMeta] = useState<{
    chapterId: string;
    moduleId: string;
  } | null>(null);

  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [settings, setSettings] = useState<UserSettings>(() => loadUserSettings());
  const [isFocusSprintOpen, setIsFocusSprintOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState<boolean>(
    () => !stats.pet?.hasAdopted
  );
  const [petInitialTab, setPetInitialTab] = useState<'care' | 'shop' | 'wardrobe' | 'adopt'>('care');
  const [activeSurprise, setActiveSurprise] = useState<ChapterSurprise | null>(null);

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
          decayedPet.happiness !== prevStats.pet.happiness
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

  const handleModuleCompleted = (moduleId: string, gainedXp: number) => {
    setStats(prev => {
      const alreadyCompleted = prev.completedModules.includes(moduleId);
      const updatedCompleted = alreadyCompleted
        ? prev.completedModules
        : [...prev.completedModules, moduleId];

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
      const { level, updatedPet } = grantLevelUpRewards(prev, newLifetimeXp, basePet);

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
        level,
        dailyMissions: updatedMissions,
        completedModules: updatedCompleted,
        answeredQuestionsCount: prev.answeredQuestionsCount + 1,
        earnedBadges: checkBadgeUnlocks({
          ...prev,
          pet: updatedPet,
          xp: newXp,
          lifetimeXp: newLifetimeXp,
          coins: newCoins,
          completedModules: updatedCompleted,
          answeredQuestionsCount: prev.answeredQuestionsCount + 1,
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
        correctAnswersCount: prev.correctAnswersCount + 1,
        dailyMissions: updatedMissions,
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
    const gainedXp = result.score * 80;
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

  const speciesEmojiMap = {
    dog: '🐶',
    cat: '🐱',
    penguin: '🐧',
    axolotl: '🦎',
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

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Strict 3-zone Top Navigation */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={tab => {
          setSelectedModuleMeta(null);
          if (tab === 'pet') {
            setPetInitialTab('care');
          }
          setActiveTab(tab);
        }}
        darkMode={settings.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenFocusSprint={() => setIsFocusSprintOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        petSpeciesEmoji={speciesEmojiMap[stats.pet.species] || '🐾'}
      />

      {/* ADHD Cognitive Aids & Gamification Bar */}
      <AdhdControlsBar
        stats={stats}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onGoToPet={() => {
          setSelectedModuleMeta(null);
          setPetInitialTab('shop');
          setActiveTab('pet');
        }}
      />

      {/* Top Interactive Pet Companion Bar */}
      <TopPetCompanionBar
        stats={stats}
        onUpdatePet={handleUpdatePet}
        onOpenShop={() => {
          setSelectedModuleMeta(null);
          setPetInitialTab('shop');
          setActiveTab('pet');
        }}
        onOpenFullPetRoom={() => {
          setSelectedModuleMeta(null);
          setPetInitialTab('care');
          setActiveTab('pet');
        }}
        onOpenGames={() => {
          setSelectedModuleMeta(null);
          setActiveTab('minigames');
        }}
        onChangePet={() => setIsAdoptionModalOpen(true)}
      />

      {/* Daily Quests / Missions Ribbon Bar */}
      <DailyMissionsBar
        missions={stats.dailyMissions || []}
        onClaimReward={handleClaimDailyMission}
        onOpenFocusSprint={() => setIsFocusSprintOpen(true)}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {selectedModuleMeta && currentChapter && currentModule ? (
          <ModuleLearningView
            chapter={currentChapter}
            module={currentModule}
            bionic={settings.bionicReading}
            onBack={() => setSelectedModuleMeta(null)}
            onModuleCompleted={(modId, xp) => handleModuleCompleted(modId, xp)}
            onCorrectAnswer={handleCorrectAnswer}
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
                onSelectModule={(cId, mId) => setSelectedModuleMeta({ chapterId: cId, moduleId: mId })}
                onStartExam={() => setActiveTab('exam')}
                onOpenGames={() => setActiveTab('minigames')}
                onGoToSpickzettel={() => setActiveTab('spickzettel')}
              />
            )}

            {activeTab === 'pet' && (
              <VirtualPetView
                stats={stats}
                initialTab={petInitialTab}
                onUpdatePet={handleUpdatePet}
                onCoinsChange={handleCoinsChange}
                onXpChange={handleXpChange}
                onUpdateCosmetics={handleUpdateCosmetics}
                onOpenAdoptionModal={() => setIsAdoptionModalOpen(true)}
                onGoToGames={() => setActiveTab('minigames')}
                onBack={() => setActiveTab('chapters')}
              />
            )}

            {activeTab === 'exam' && (
              <ExamSimulatorView
                bionic={settings.bionicReading}
                onExamCompleted={handleExamCompleted}
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

            {activeTab === 'minigames' && (
              <MiniGamesHubView
                onScoreEarned={handleScoreEarned}
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
        onSprintCompleted={handleFocusSprintCompleted}
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
            <span className="font-mono tabular-nums font-semibold text-indigo-600 dark:text-indigo-400">⚡ {stats.xp} EXP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
