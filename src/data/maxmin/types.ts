/**
 * Level-Specific Content Types for Max/Min & Range Topic
 *
 * These types mirror the geometry/types.ts structure exactly.
 * Each difficulty level (Beginner/Intermediate/Expert) has its own content.
 */

import { DifficultyLevel } from "../../types";

/** A Think Box question — prompts students to think before the answer */
export interface ThinkBox {
  id: string;
  question: string;
  /** Hinglish explanation of the answer */
  answer: string;
  /** Optional hint for struggling students */
  hint?: string;
}

/** A hands-on activity for kinesthetic learning */
export interface Activity {
  id: string;
  title: string;
  description: string;
  /** Materials needed */
  materials: string[];
  /** Step-by-step instructions */
  steps: string[];
  /** What the student should observe/learn */
  outcome: string;
}

/** Guidance tips for teachers */
export interface TeacherTip {
  id: string;
  tip: string;
  /** When to use this tip (e.g., "During introduction", "When student is confused") */
  context: string;
}

/** A concept screen with rich content */
export interface ConceptScreen {
  id: string;
  /** Screen title */
  title: string;
  /** Main concept heading */
  conceptHeading: string;
  /** Hinglish explanation — the core teaching content */
  explanation: string;
  /** Think Box questions for this concept */
  thinkBox: ThinkBox[];
  /** Optional interactive type for this screen */
  interactiveType?: "point_hunt" | "line_touch" | "range_slider" | "decimal_battle" | "rounding_match" | "none";
  /** Optional panga hint */
  pangaHint?: string;
}

/** Worksheet question with Part A-D structure */
export interface WorksheetQuestion {
  id: string;
  /** Question text */
  question: string;
  /** Options for multiple choice */
  options?: string[];
  /** Correct answer (index for MCQ, or string value) */
  correct: number | string;
  /** Hint for the student */
  hint: string;
  /** Which part of the worksheet (A, B, C, D) */
  part: "A" | "B" | "C" | "D";
  /** Part description — what this section tests */
  partDescription: string;
}

/** A subtopic's content for a specific level */
export interface SubtopicContent {
  /** Subtopic ID (e.g., "maxmin_basics") */
  id: string;
  /** Display name */
  name: string;
  /** Concept screens for this subtopic */
  screens: ConceptScreen[];
  /** Activities */
  activities: Activity[];
  /** Teacher tips */
  teacherTips: TeacherTip[];
  /** Worksheet questions */
  worksheet: WorksheetQuestion[];
}

/** Complete content for one topic at one difficulty level */
export interface LevelTopicContent {
  /** Topic ID (e.g., "maxmin") */
  topicId: string;
  /** Display name */
  topicName: string;
  /** Difficulty level */
  level: DifficultyLevel;
  /** Class level label (e.g., "Class 6", "Class 7", "Class 8") */
  classLevel: string;
  /** All subtopics for this level */
  subtopics: SubtopicContent[];
}
