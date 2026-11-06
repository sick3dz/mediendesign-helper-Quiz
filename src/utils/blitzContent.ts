import { CHAPTERS, getModuleLevel2Questions } from '../data/chaptersData';
import { EXAM_QUESTIONS } from '../data/examQuestions';

export type BlitzItem =
  | {
      type: 'quiz';
      id: string;
      category: string;
      question: string;
      options: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
      merksatz?: string;
      linkedFromNuggetTitle?: string;
    }
  | {
      type: 'knowledge';
      id: string;
      category: string;
      title: string;
      coreConcept: string;
      bulletPoints?: string[];
      merksatz?: string;
      example?: string;
      examFavorite?: boolean;
    };

// Filter out non-design/technical backend questions (SQL, database queries, etc.)
function isDesignRelevant(text: string): boolean {
  const lower = text.toLowerCase();
  if (lower.includes('sql') || lower.includes('database') || lower.includes('datenbank') || lower.includes('update und delete')) {
    return false;
  }
  return true;
}

export function createRecallQuestionFromKnowledge(knowledge: {
  title: string;
  coreConcept: string;
  category: string;
  merksatz?: string;
}): BlitzItem {
  // Generate plausible distractor answers
  const distractors = [
    'Eine serverseitige Backend-Routine ohne Einfluss auf die Benutzeroberfläche.',
    'Ein Verfahren zur kompressionsfreien Abspeicherung von RAW-Bilderdateien.',
    'Die ausschließliche Festlegung von Schriftgrößen im Druckbereich.',
    'Eine Methode zur Reduzierung der Netzwerk-Latenzzeit.',
  ].sort(() => Math.random() - 0.5);

  const options = [
    {
      id: 'correct',
      text: knowledge.coreConcept,
      isCorrect: true,
      explanation: knowledge.merksatz ? `Merksatz: ${knowledge.merksatz}` : 'Perfekt gemerkt!',
    },
    { id: 'd1', text: distractors[0], isCorrect: false },
    { id: 'd2', text: distractors[1], isCorrect: false },
    { id: 'd3', text: distractors[2], isCorrect: false },
  ].sort(() => Math.random() - 0.5);

  return {
    type: 'quiz',
    id: `recall-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    category: `Wissens-Check • ${knowledge.category}`,
    question: `Erinnerungstest: Was besagt das Konzept "${knowledge.title}"?`,
    options,
    merksatz: knowledge.merksatz,
    linkedFromNuggetTitle: knowledge.title,
  };
}

export function buildBlitzPool(): BlitzItem[] {
  interface Cluster {
    knowledge: BlitzItem;
    questions: BlitzItem[];
  }

  const clusters: Cluster[] = [];

  // Group into didactic units: 1 Knowledge Nugget -> up to 2 related Quiz Questions
  CHAPTERS.forEach(chap => {
    chap.modules.forEach(mod => {
      // Each module has nuggets and quizQuestions
      const primaryNugget = mod.nuggets[0];
      if (!primaryNugget) return;

      const knowledgeItem: BlitzItem = {
        type: 'knowledge',
        id: primaryNugget.id,
        category: `Wissensvermittlung • Kapitel ${chap.number}: ${chap.title}`,
        title: primaryNugget.title,
        coreConcept: primaryNugget.coreConcept,
        bulletPoints: primaryNugget.bulletPoints,
        merksatz: primaryNugget.merksatz,
        example: primaryNugget.example,
        examFavorite: primaryNugget.examFavorite,
      };

      // Filter and pick up to 2 questions from this module
      const moduleQuestions: BlitzItem[] = (mod.quizQuestions || [])
        .filter(q => isDesignRelevant(q.question))
        .slice(0, 2)
        .map((q, idx, arr) => ({
          type: 'quiz' as const,
          id: q.id,
          category: arr.length > 1 
            ? `Prüfungsfrage (${idx + 1}/2) • ${chap.title}` 
            : `Prüfungsfrage • ${chap.title}`,
          question: q.question,
          options: q.options,
          merksatz: q.merksatz || primaryNugget.merksatz,
          linkedFromNuggetTitle: primaryNugget.title,
        }));

      // Fallback to exam questions from the same chapter if module has fewer questions
      if (moduleQuestions.length === 0) {
        const chapterExamQuestions = EXAM_QUESTIONS
          .filter(eq => eq.chapterId === chap.id && isDesignRelevant(eq.question))
          .slice(0, 2);

        chapterExamQuestions.forEach((eq, idx, arr) => {
          moduleQuestions.push({
            type: 'quiz',
            id: eq.id,
            category: arr.length > 1
              ? `Prüfungsfrage (${idx + 1}/2) • ${chap.title}`
              : `Prüfungsfrage • ${chap.title}`,
            question: eq.question,
            options: eq.options,
            merksatz: eq.merksatz || primaryNugget.merksatz,
            linkedFromNuggetTitle: primaryNugget.title,
          });
        });
      }

      clusters.push({
        knowledge: knowledgeItem,
        questions: moduleQuestions,
      });
    });
  });

  // Shuffle the order of clusters for variety across sprint runs
  const shuffledClusters = [...clusters].sort(() => Math.random() - 0.5);

  // Flatten into didactic sequence: [Knowledge] -> [Question 1] -> [Question 2]
  const sequentialItems: BlitzItem[] = [];
  for (const cluster of shuffledClusters) {
    sequentialItems.push(cluster.knowledge);
    sequentialItems.push(...cluster.questions);
    if (sequentialItems.length >= 24) break;
  }

  // Return the first 22 items (covering the 20-unit sprint with buffer)
  return sequentialItems.slice(0, 22);
}

export function buildCustomMixPool(selectedModuleIds: string[], isLevel2: boolean = false): BlitzItem[] {
  const selectedSet = new Set(selectedModuleIds);
  interface Cluster {
    knowledge: BlitzItem;
    questions: BlitzItem[];
  }
  const clusters: Cluster[] = [];

  CHAPTERS.forEach(chap => {
    chap.modules.forEach(mod => {
      if (!selectedSet.has(mod.id)) return;

      const primaryNugget = mod.nuggets[0];
      if (!primaryNugget) return;

      const knowledgeItem: BlitzItem = {
        type: 'knowledge',
        id: primaryNugget.id,
        category: `Wissensvermittlung • Kapitel ${chap.number}: ${chap.title}`,
        title: primaryNugget.title,
        coreConcept: primaryNugget.coreConcept,
        bulletPoints: primaryNugget.bulletPoints,
        merksatz: primaryNugget.merksatz,
        example: primaryNugget.example,
        examFavorite: primaryNugget.examFavorite,
      };

      const rawQuestions = isLevel2 ? getModuleLevel2Questions(mod) : (mod.quizQuestions || []);
      const moduleQuestions: BlitzItem[] = rawQuestions
        .filter(q => isDesignRelevant(q.question))
        .slice(0, 3)
        .map((q, idx, arr) => ({
          type: 'quiz' as const,
          id: q.id,
          category: arr.length > 1
            ? (isLevel2 ? `Lvl 2 Meisterfrage (${idx + 1}/${arr.length}) • ${mod.title}` : `Prüfungsfrage (${idx + 1}/${arr.length}) • ${mod.title}`)
            : (isLevel2 ? `Lvl 2 Meisterfrage • ${mod.title}` : `Prüfungsfrage • ${mod.title}`),
          question: q.question,
          options: q.options,
          merksatz: q.merksatz || primaryNugget.merksatz,
          linkedFromNuggetTitle: primaryNugget.title,
        }));

      if (moduleQuestions.length === 0) {
        const chapterExamQuestions = EXAM_QUESTIONS
          .filter(eq => eq.chapterId === chap.id && isDesignRelevant(eq.question))
          .slice(0, 3);

        chapterExamQuestions.forEach((eq, idx, arr) => {
          moduleQuestions.push({
            type: 'quiz',
            id: eq.id,
            category: arr.length > 1
              ? `Prüfungsfrage (${idx + 1}/${arr.length}) • ${mod.title}`
              : `Prüfungsfrage • ${mod.title}`,
            question: eq.question,
            options: eq.options,
            merksatz: eq.merksatz || primaryNugget.merksatz,
            linkedFromNuggetTitle: primaryNugget.title,
          });
        });
      }

      clusters.push({
        knowledge: knowledgeItem,
        questions: moduleQuestions,
      });
    });
  });

  // Shuffle clusters for a dynamic mix-up learning experience across chosen topics
  const shuffledClusters = [...clusters].sort(() => Math.random() - 0.5);

  const sequentialItems: BlitzItem[] = [];
  for (const cluster of shuffledClusters) {
    sequentialItems.push(cluster.knowledge);
    sequentialItems.push(...cluster.questions);
  }

  return sequentialItems;
}
