# Technical Implementation Plan: Level-Specific Unique Journeys
## MathsDost / MathViz App — CBSE Class 6-8

---

## 1. CURRENT STATE: What Content Exists Per Level

### 1.1 Concept Screens (data.ts → `getProceduralScreens()`)
**Verdict: IDENTICAL across all levels — no differentiation**

- Function signature: `getProceduralScreens(topicId, subtopicId)` — **no difficulty parameter**
- Same titles, same explanations, same `interactiveType` for every level
- The same screen text like "💡 Bindu: Zero-Dimensional Coordinate Anchor" is shown whether the student is Beginner or Expert
- **239 procedural screens generated** — all identical per level

### 1.2 Story Slides (data.ts + variants.ts)
**Verdict: IDENTICAL across all levels — no differentiation**

- `STORY_SLIDES[]` in data.ts: 4 fixed stories, same for all levels
- `getStoryQuestVariants(topicId, subId)` in variants.ts: **does NOT accept difficulty parameter**
- Same narratives, same characters, same scenarios regardless of level
- ~20 story variants generated per subtopic — all level-agnostic

### 1.3 Quiz Questions (data.ts + variants.ts)
**Verdict: IDENTICAL across all levels — cosmetic label only**

- `QUIZ_QUESTIONS[]` in data.ts: 30 fixed questions, same for all levels
- `getConceptQuizVariants(topicId, subId, difficulty)` accepts difficulty, but ONLY uses it for a label prefix:
  ```
  const levelText = difficulty === "expert" ? "Class 8" : difficulty === "intermediate" ? "Class 7" : "Class 6";
  question = `[${levelText} - Q${i}] How many lines can pass through...`
  ```
- The actual question content, options, hints, and difficulty are **the same**
- API endpoint `/api/generate-quiz` receives difficulty but fallback uses same function

### 1.4 Practice Drills (variants.ts → `getPracticeDrillVariants()`)
**Verdict: NUMERICALLY DIFFERENT — but conceptually identical**

This is the **only function that truly differentiates by level**:
- **Geometry (bindu/point_hunt)**: Beginner → simple coords (1-4), Intermediate → mixed pos/neg (-4 to 4), Expert → wider range (-5 to 5)
- **Geometry (rekha/line_touch)**: Beginner → shift=0, Intermediate → small shifts, Expert → precision shifts
- **Geometry (khand/range_slider)**: Beginner → 4-6cm, Intermediate → 7-12cm, Expert → 13-20cm
- **Geometry (kiran/line_touch)**: Beginner → 90°/180°, Intermediate → standard angles, Expert → tricky degrees
- **Geometry (shikhar/point_hunt)**: Beginner → near origin, Intermediate → standard layout, Expert → complex intersections
- **Max/Min (range_slider)**: Beginner → <200, Intermediate → 130-450, Expert → larger ranges
- Same story template/narrative per level — only numbers change

### 1.5 Subtopic Visibility (LearnView.tsx → `isDifficultyAppropriate()`)
**Verdict: FILTERING ONLY — hides content rather than creating unique content**

```
Beginner: Hides kiran, shikhar, skills, range, rounding, place, order
Intermediate: Hides skills, order  
Expert: Shows everything
```

### 1.6 Difficulty Persistence
**CRITICAL BUG: Difficulty is NOT persisted!**

```tsx
// App.tsx
const [difficulty, setDifficulty] = useState<DifficultyLevel>("intermediate");
```
- Resets to "intermediate" on every page load
- Not saved to localStorage or Firestore
- User must re-select every time

---

## 2. TECHNICAL MECHANISM: How the App Currently Differentiates

| Mechanism | Where | Actually Different? |
|-----------|-------|-------------------|
| Subtopic filtering | `LearnView.tsx:isDifficultyAppropriate()` | ❌ Hides, doesn't differentiate |
| Drill numeric ranges | `variants.ts:getPracticeDrillVariants()` | ⚠️ Numbers differ, concept same |
| Quiz label prefix | `variants.ts:getConceptQuizVariants()` | ❌ Only adds `[Class X]` label |
| Concept screen content | `data.ts:getProceduralScreens()` | ❌ No difficulty param at all |
| Story narratives | `variants.ts:getStoryQuestVariants()` | ❌ No difficulty param at all |
| API quiz generation | `/api/generate-quiz` | ⚠️ Server receives difficulty, unclear if used |

**Summary: The app has the UI shell for 3 difficulty levels, but 95% of the actual educational content is identical.**

---

## 3. PROPOSED FILE STRUCTURE

```
src/
├── data/
│   ├── types.ts                          # (existing) Add LevelContent type
│   ├── topics.ts                         # (existing) Topic structure
│   ├── screens/
│   │   ├── beginner/
│   │   │   ├── geom.ts                   # Beginner geometry concept screens
│   │   │   ├── maxmin.ts                 # Beginner max/min concept screens
│   │   │   └── compare.ts                # Beginner compare concept screens
│   │   ├── intermediate/
│   │   │   ├── geom.ts
│   │   │   ├── maxmin.ts
│   │   │   └── compare.ts
│   │   └── expert/
│   │       ├── geom.ts
│   │       ├── maxmin.ts
│   │       └── compare.ts
│   ├── stories/
│   │   ├── beginner/
│   │   │   ├── geom.ts                   # Beginner geometry stories
│   │   │   ├── maxmin.ts
│   │   │   └── compare.ts
│   │   ├── intermediate/
│   │   │   └── ...
│   │   └── expert/
│   │       └── ...
│   ├── quizzes/
│   │   ├── beginner/
│   │   │   ├── geom.ts
│   │   │   ├── maxmin.ts
│   │   │   └── compare.ts
│   │   ├── intermediate/
│   │   │   └── ...
│   │   └── expert/
│   │       └── ...
│   ├── drills/
│   │   ├── beginner/
│   │   │   └── drills.ts
│   │   ├── intermediate/
│   │   │   └── drills.ts
│   │   └── expert/
│   │       └── drills.ts
│   └── index.ts                          # Level-aware content loader
├── components/
│   ├── LearnView.tsx                     # Update to load level-specific content
│   └── ...
└── variants.ts                           # Refactor to use level-specific content
```

### 3.1 Level-Aware Content Loader Pattern

```typescript
// src/data/index.ts
import { DifficultyLevel, Screen, QuizQuestion, StorySlide } from './types';

// Level-specific imports
import * as beginnerGeom from './screens/beginner/geom';
import * as intermediateGeom from './screens/intermediate/geom';
import * as expertGeom from './screens/expert/geom';
// ... same for other topics and content types

export function getLevelContent(
  level: DifficultyLevel,
  topicId: string,
  subtopicId: string,
  contentType: 'screens' | 'stories' | 'quizzes' | 'drills'
): Screen[] | StorySlide[] | QuizQuestion[] {
  // Route to level-specific content
  const levelModule = level === 'beginner' ? beginnerGeom 
    : level === 'intermediate' ? intermediateGeom 
    : expertGeom;
  
  // ... content selection logic
}
```

---

## 4. EFFORT ESTIMATION

### 4.1 Content Inventory Needed

| Content Type | Per Level | × 3 Levels | Notes |
|-------------|-----------|-------------|-------|
| **Concept Screens** | ~50 per topic × 3 topics = 150 | 450 total | New text, headings, explanations per level |
| **Story Slides** | ~20 per subtopic × 11 subtopics = 220 | 660 total | Unique narratives, characters, scenarios |
| **Quiz Questions** | ~20 per subtopic × 11 subtopics = 220 | 660 total | Difficulty-appropriate questions |
| **Practice Drills** | ~20 per subtopic × 11 subtopics = 220 | 660 total | Already partially differentiated |
| **Daily Riddles** | 5 per level | 15 total | Level-appropriate riddles |

### 4.2 Content Differentiation Strategy

**Beginner (Class 6):**
- Focus: Basic concepts, simple numbers (positive integers < 100)
- Stories: Simple Delhi street scenarios, familiar characters
- Drills: Basic coordinates, simple measurements
- Quizzes: Definition-based, multiple choice with clear answers
- **Target: "Learn the basics"**

**Intermediate (Class 7):**
- Focus: Applied concepts, negative numbers, decimals
- Stories: More complex scenarios, multi-step problems
- Drills: Mixed positive/negative, decimal values
- Quizzes: Application-based, comparison problems
- **Target: "Apply what you learned"**

**Expert (Class 8):**
- Focus: Advanced concepts, complex calculations, real-world application
- Stories: Multi-step problem solving, analytical thinking
- Drills: Precise measurements, complex coordinates
- Quizzes: Analytical questions, multi-step reasoning
- **Target: "Master and extend"**

### 4.3 Total New Content Required

| Item | Count | Est. Time per Item | Total Time |
|------|-------|-------------------|------------|
| Concept screen text blocks | 450 | 3 min | 22.5 hours |
| Story narratives | 660 | 5 min | 55 hours |
| Quiz questions | 660 | 4 min | 44 hours |
| Drill configurations | 660 | 2 min | 22 hours |
| Daily riddles | 15 | 10 min | 2.5 hours |
| **TOTAL CONTENT** | **2,445 items** | | **~146 hours** |

### 4.4 Technical Refactoring Effort

| Task | Est. Hours | Priority |
|------|-----------|----------|
| Persist difficulty to localStorage | 2h | P0 (bug fix) |
| Create level-aware content loader | 8h | P0 |
| Refactor `getProceduralScreens()` to accept difficulty | 4h | P0 |
| Refactor `getStoryQuestVariants()` to accept difficulty | 4h | P0 |
| Refactor `getConceptQuizVariants()` to use actual difficulty content | 4h | P0 |
| Update LearnView.tsx to use level-specific content | 6h | P0 |
| Update QuizView.tsx for level-specific questions | 4h | P1 |
| Update StoryView.tsx for level-specific stories | 4h | P1 |
| Create content validation/testing utilities | 4h | P1 |
| Update API endpoints for level-specific generation | 8h | P1 |
| Badge system updates for level-specific achievements | 4h | P2 |
| **TOTAL TECHNICAL** | **~52 hours** | |

### 4.5 Total Project Estimate

| Category | Hours |
|----------|-------|
| Content Creation | 146h |
| Technical Refactoring | 52h |
| Testing & QA | 20h |
| **GRAND TOTAL** | **~218 hours** |

---

## 5. IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1-2)
1. Fix difficulty persistence bug (localStorage)
2. Create level-aware content loader architecture
3. Refactor `getProceduralScreens()` to accept difficulty
4. Create first level's content (Beginner) as proof of concept

### Phase 2: Content Migration (Week 3-6)
1. Create Beginner level content for all topics
2. Create Intermediate level content for all topics
3. Create Expert level content for all topics
4. Update variants.ts to use level-specific content

### Phase 3: UI Integration (Week 7-8)
1. Update LearnView.tsx for level-specific rendering
2. Update QuizView.tsx for level-specific questions
3. Update StoryView.tsx for level-specific stories
4. Update API endpoints for level-specific generation

### Phase 4: Polish & Testing (Week 9-10)
1. Badge system updates
2. Cross-level testing
3. Content quality review
4. Performance optimization

---

## 6. RISK ASSESSMENT

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content creation is time-intensive | High | Use AI-assisted content generation with human review |
| Breaking existing functionality | Medium | Maintain backward compatibility with fallback content |
| Bundle size increase | Medium | Lazy-load level-specific content |
| Content quality inconsistency | Medium | Create content style guide and templates |
| User confusion when switching levels | Low | Add level transition notifications |

---

## 7. SUCCESS METRICS

- [ ] Each difficulty level shows completely different concept screen text
- [ ] Each level has unique story narratives and characters
- [ ] Each level has difficulty-appropriate quiz questions
- [ ] Difficulty persists across page loads
- [ ] No content overlap between levels (except basic definitions)
- [ ] User can see clear progression when moving between levels
- [ ] Bundle size stays under 500KB
- [ ] All 239+ screens function correctly per level

---

*Document created: 2026-07-08*
*Author: Technical Analysis*
*Status: Implementation Plan Ready*
