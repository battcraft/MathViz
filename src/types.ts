/**
 * MathsGuru AI - Type Definitions
 */

export type DifficultyLevel = "beginner" | "intermediate" | "expert";
export type Language = "en" | "hi" | "simple-hi";

export interface Screen {
  id: string;
  title: string;
  videoFile?: string; // If present, indicates a video lesson screen
  topicId: string;
  subtopicId: string;
  conceptHeading?: string;
  explanation?: string;
  pangaHint?: string;
  interactiveType?: "point_hunt" | "line_touch" | "range_slider" | "decimal_battle" | "rounding_match" | "none";
  targetValue?: any;
  activeVariantIndex?: number;
}

export interface Subtopic {
  id: string;
  name: string;
  screens: Screen[];
}

export interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  requirement: string;
}

export interface StorySlide {
  id: string;
  emoji: string;
  title: string;
  narration: string;
  choices: {
    text: string;
    correct: boolean;
    rewardXp: number;
  }[];
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // Index of the correct option (0-3)
  hint: string;
}

// UserStats synced to Firestore / LocalStorage
export interface UserStats {
  userId: string;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  screensViewed: string[]; // IDs of screens viewed
  completedScreens: string[]; // IDs of screens completed (watched video or checked 'Done')
  badges: string[]; // unlocked badge IDs
  quizScores: {
    score: number;
    total: number;
    timestamp: number;
  }[];
}
