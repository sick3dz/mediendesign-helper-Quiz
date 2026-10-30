import { CHAPTERS } from '../data/chaptersData';
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
  const items: BlitzItem[] = [];

  // 1. Add Design-Relevant Exam Questions
  EXAM_QUESTIONS.forEach(q => {
    if (isDesignRelevant(q.question)) {
      items.push({
        type: 'quiz',
        id: q.id,
        category: 'Design & Medien IHK-Prüfung',
        question: q.question,
        options: q.options,
        merksatz: q.merksatz,
      });
    }
  });

  // 2. Extract Questions and Knowledge Nuggets from Chapters
  CHAPTERS.forEach(chap => {
    chap.modules.forEach(mod => {
      // Add Module Quiz Questions
      mod.quizQuestions.forEach(q => {
        if (isDesignRelevant(q.question)) {
          items.push({
            type: 'quiz',
            id: q.id,
            category: `${chap.title}`,
            question: q.question,
            options: q.options,
            merksatz: q.merksatz,
          });
        }
      });

      // Add Module Knowledge Nuggets as Flashcards
      mod.nuggets.forEach(nugget => {
        items.push({
          type: 'knowledge',
          id: nugget.id,
          category: `${chap.title}`,
          title: nugget.title,
          coreConcept: nugget.coreConcept,
          bulletPoints: nugget.bulletPoints,
          merksatz: nugget.merksatz,
          example: nugget.example,
          examFavorite: nugget.examFavorite,
        });
      });
    });
  });

  // Shuffle the combined pool for interleaved learning
  return items.sort(() => Math.random() - 0.5);
}
