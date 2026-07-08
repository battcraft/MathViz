/**
 * Level-Specific Content Loader
 *
 * Routes to the correct level-specific content based on topic ID and difficulty level.
 * This is the central entry point for the new content system.
 *
 * Usage:
 *   import { getGeometryContent, getAllLevelsForTopic } from "./data/geometry";
 *   const content = getGeometryContent("beginner"); // returns LevelTopicContent
 */

import { DifficultyLevel } from "../types";
import { LevelTopicContent } from "./geometry/types";
import { geometryBeginner } from "./geometry/beginner";
import { geometryIntermediate } from "./geometry/intermediate";
import { geometryExpert } from "./geometry/expert";
import { comparingBeginner } from "./comparing/beginner";
import { comparingIntermediate } from "./comparing/intermediate";
import { comparingExpert } from "./comparing/expert";
import { maxminBeginner } from "./maxmin/beginner";
import { maxminIntermediate } from "./maxmin/intermediate";
import { maxminExpert } from "./maxmin/expert";

// ─── Registry ───────────────────────────────────────────────────
// Maps topic IDs to their level-specific content maps.
// As new topics are added, register them here.

type LevelContentMap = Record<DifficultyLevel, LevelTopicContent>;

const TOPIC_REGISTRY: Record<string, LevelContentMap> = {
  geom: {
    beginner: geometryBeginner,
    intermediate: geometryIntermediate,
    expert: geometryExpert,
  },
  compare: {
    beginner: comparingBeginner,
    intermediate: comparingIntermediate,
    expert: comparingExpert,
  },
  maxmin: {
    beginner: maxminBeginner,
    intermediate: maxminIntermediate,
    expert: maxminExpert,
  },
};

// ─── Public API ─────────────────────────────────────────────────

/**
 * Get level-specific content for a topic and difficulty level.
 *
 * @param topicId - The topic identifier (e.g., "geom")
 * @param level - The difficulty level ("beginner" | "intermediate" | "expert")
 * @returns The LevelTopicContent for that topic at that level
 * @throws Error if the topic or level is not found
 *
 * @example
 * ```ts
 * const content = getLevelContent("geom", "beginner");
 * console.log(content.subtopics[0].name); // "💡 Bindu (Point)"
 * ```
 */
export function getLevelContent(
  topicId: string,
  level: DifficultyLevel
): LevelTopicContent {
  const topicMap = TOPIC_REGISTRY[topicId];
  if (!topicMap) {
    throw new Error(
      `[LevelContentLoader] Unknown topic ID: "${topicId}". ` +
        `Available topics: ${Object.keys(TOPIC_REGISTRY).join(", ")}`
    );
  }

  const content = topicMap[level];
  if (!content) {
    throw new Error(
      `[LevelContentLoader] Unknown level: "${level}" for topic "${topicId}". ` +
        `Available levels: ${Object.keys(topicMap).join(", ")}`
    );
  }

  return content;
}

/**
 * Get all level-specific content for a single topic.
 * Returns an object with keys "beginner", "intermediate", "expert".
 *
 * @param topicId - The topic identifier (e.g., "geom")
 * @returns Record of all levels for the topic
 *
 * @example
 * ```ts
 * const allLevels = getAllLevelsForTopic("geom");
 * // allLevels.beginner.subtopics[0].name → "💡 Bindu (Point)"
 * // allLevels.expert.subtopics[0].name → "💡 Bindu (Point) — Coordinate Geometry & Proofs"
 * ```
 */
export function getAllLevelsForTopic(
  topicId: string
): Partial<Record<DifficultyLevel, LevelTopicContent>> {
  const topicMap = TOPIC_REGISTRY[topicId];
  if (!topicMap) {
    return {};
  }
  return { ...topicMap };
}

/**
 * List all registered topic IDs.
 */
export function getRegisteredTopics(): string[] {
  return Object.keys(TOPIC_REGISTRY);
}

/**
 * Check if a topic is registered in the new level-specific content system.
 */
export function isTopicRegistered(topicId: string): boolean {
  return topicId in TOPIC_REGISTRY;
}

/**
 * Get the class level label for a difficulty level.
 *
 * @param level - The difficulty level
 * @returns The class level string (e.g., "Class 6", "Class 7", "Class 8")
 */
export function getClassLevelForDifficulty(level: DifficultyLevel): string {
  const content = getLevelContent(
    Object.keys(TOPIC_REGISTRY)[0], // Use first registered topic as reference
    level
  );
  return content.classLevel;
}

// ─── Re-exports ─────────────────────────────────────────────────
// Re-export all types for consumers
export type {
  LevelTopicContent,
  SubtopicContent,
  ConceptScreen,
  ThinkBox,
  Activity,
  TeacherTip,
  WorksheetQuestion,
} from "./geometry/types";

// Re-export individual level content for direct imports
export { geometryBeginner } from "./geometry/beginner";
export { geometryIntermediate } from "./geometry/intermediate";
export { geometryExpert } from "./geometry/expert";
export { comparingBeginner } from "./comparing/beginner";
export { comparingIntermediate } from "./comparing/intermediate";
export { comparingExpert } from "./comparing/expert";
export { maxminBeginner } from "./maxmin/beginner";
export { maxminIntermediate } from "./maxmin/intermediate";
export { maxminExpert } from "./maxmin/expert";
