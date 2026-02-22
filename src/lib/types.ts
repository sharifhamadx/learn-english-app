export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'short-answer';
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  story: string;
  grammarExplanation: string;
  grammarPoint: string;
  questions: Question[];
  imageSeed: string;
}

export interface UserProgress {
  completedLessons: string[];
  totalScore: number;
  grammarMastery: Record<string, number>;
}