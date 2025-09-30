
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Question {
  id: string;
  text: string;
  difficulty: Difficulty;
  timeLimit: number; // in seconds
}

export interface Answer {
  questionId: string;
  text: string;
  score: number | null;
  evaluation: string | null;
}

export interface Interview {
  id: string;
  candidate: Candidate;
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  status: 'pending-resume' | 'gathering-info' | 'in-progress' | 'completed';
  finalScore: number | null;
  finalSummary: string | null;
  startTime: number | null;
}
