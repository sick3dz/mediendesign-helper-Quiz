import { QuizQuestion, UserStats, Chapter } from '../types/quiz';

/**
 * Calculates a priority score for a question based on user performance.
 * Higher score means the question should be asked sooner.
 */
export function calculateQuestionPriority(questionId: string, stats: UserStats): number {
  const perf = stats.questionPerformance[questionId];
  if (!perf) return 100; // Never answered questions have high priority

  const total = perf.correctCount + perf.wrongCount;
  if (total === 0) return 100;

  const successRate = perf.correctCount / total;
  
  // Base priority from success rate (lower success = higher priority)
  let priority = (1 - successRate) * 100;

  // Add bonus for wrong answers (to ensure we repeat them)
  priority += perf.wrongCount * 10;

  // Recency bonus: if it was answered a long time ago (or we don't know when)
  if (perf.lastAnswered) {
    const lastDate = new Date(perf.lastAnswered).getTime();
    const now = Date.now();
    const daysSince = (now - lastDate) / (1000 * 60 * 60 * 24);
    priority += Math.min(50, daysSince * 5);
  } else {
    priority += 20;
  }

  return priority;
}

/**
 * Returns a list of questions prioritized by learning needs.
 */
export function getPrioritizedQuestions(
  allQuestions: QuizQuestion[],
  stats: UserStats,
  limit: number = 10
): QuizQuestion[] {
  return [...allQuestions]
    .sort((a, b) => calculateQuestionPriority(b.id, stats) - calculateQuestionPriority(a.id, stats))
    .slice(0, limit);
}

/**
 * Helper to get all questions from all chapters and modules.
 */
export function getAllQuestions(chapters: Chapter[]): QuizQuestion[] {
  const all: QuizQuestion[] = [];
  chapters.forEach(ch => {
    ch.modules.forEach(m => {
      all.push(...m.quizQuestions);
      if (m.level2QuizQuestions) {
        all.push(...m.level2QuizQuestions);
      }
    });
  });
  return all;
}

/**
 * Shuffles an array randomly without mutating the original.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Returns a question with its options randomly shuffled.
 */
export function shuffleQuestionOptions(question: QuizQuestion): QuizQuestion {
  return {
    ...question,
    options: shuffleArray(question.options || []),
  };
}

