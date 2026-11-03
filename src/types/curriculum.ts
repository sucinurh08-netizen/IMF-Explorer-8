export type Stage5E = 'Engage' | 'Explore' | 'Explain' | 'Elaborate' | 'Evaluate';

export interface LearningModule {
  id: string;
  title: string;
  shortDesc: string;
  stage5E: Stage5E;
  stageTitle: string;
  durationMin: number;
  isQuiz?: boolean;
  scientificNotes?: string;
}

export interface IMFProgress {
  lastPage: string;
  completedPages: string[];
  completedQuizzes: Record<string, number>;
  evaluationStatus?: {
    completed: boolean;
    score?: number;
    completedAt?: string;
  };
  lastUpdated: string;
}

export interface PrerequisiteTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  summary: string;
  detail: string;
  chemicalNotation?: string;
  importanceForIMF: string;
}

export interface IMFTypeCard {
  id: string;
  name: string;
  alias: string;
  tagline: string;
  occurIn: string;
  mechanism: string;
  exampleMolecules: string[];
  keyFactors: string;
  accentColor: string;
  lightBg: string;
}
