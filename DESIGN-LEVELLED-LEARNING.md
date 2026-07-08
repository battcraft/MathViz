# 🎯 Maths Dost — Levelled Learning Journey Design Document

> **Designing Unique Learning Journeys for Beginner / Intermediate / Expert**
> CBSE Class 6 (Beginner) | Class 7 (Intermediate) | Class 8 (Expert)

---

## Table of Contents

1. [Current Architecture Audit](#1-current-architecture-audit)
2. [Design Philosophy](#2-design-philosophy)
3. [Type System Changes](#3-type-system-changes)
4. [Topic 1: Comparing Numbers](#4-topic-1-comparing-numbers)
5. [Topic 2: Max/Min & Range](#5-topic-2-maxmin--range)
6. [Topic 3: Geometry](#6-topic-3-geometry)
7. [Implementation Roadmap](#7-implementation-roadmap)
8. [Data Structure Templates](#8-data-structure-templates)

---

## 1. Current Architecture Audit

### What Exists Today

| Component | File | Difficulty-Aware? | Issue |
|---|---|---|---|
| Concept Screens | `data.ts → getProceduralScreens()` | ❌ NO | Same explanation text for all 3 levels |
| Practice Drills | `variants.ts → getPracticeDrillVariants()` | ⚠️ PARTIAL | Number ranges differ, but story/narrative is the same |
| Story Quests | `variants.ts → getStoryQuestVariants()` | ❌ NO | No `difficulty` parameter at all |
| Quiz Questions | `variants.ts → getConceptQuizVariants()` | ⚠️ PARTIAL | Only adds `[Class 6/7/8]` prefix label; content identical |
| Concept Stories (Geometry) | `variants.ts → getGeometryStoryDetails()` | ❌ NO | Same 20 stories regardless of level |

### What's Missing

1. **Concept depth** — Beginner, Intermediate, Expert get the exact same explanations
2. **Story scenarios** — Same stories (vegetable buying, cricket scores) for all levels
3. **Question banks** — Same question types, just different number magnitudes
4. **Practice drills** — Same narratives, only number parameters change
5. **No progression narrative** — No sense of "growing up" through levels

---

## 2. Design Philosophy

### The Three Pillars of Differentiation

```
BEGINNER (Class 6)          INTERMEDIATE (Class 7)          EXPERT (Class 8)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Concrete → Abstract          Abstract → Analytical           Analytical → Applied
"Look at this samosa"        "Let's use a number line"       "Prove why this works"
"Count the objects"          "Set up the equation"           "Generalize the pattern"

Guided Hints                 Moderate Challenge              Timed Competition
"Tap here to try"           "Think about it!"               "60 seconds — GO!"

Simple Daily Life            Complex Scenarios               Real-World Professional
"Buy vegetables"             "Plan a budget trip"            "Run a business profit"

Recognition & Comparison     Multi-step & Negative           Word Problems & Data
"Which is bigger?"           "-3 vs -7: who wins?"           "Calculate profit margin"
```

### CBSE Curriculum Alignment

| Level | CBSE Class | Number System | Geometry Depth | Key Skills |
|---|---|---|---|---|
| Beginner | Class 6 | Whole numbers, basic decimals | Intro: points, lines, segments | Counting, comparing, basic measurement |
| Intermediate | Class 7 | Integers, decimals in depth | Lines, rays, angles | Negative numbers, multi-step problems |
| Expert | Class 8 | Rational numbers, fractions | Advanced: coordinate geometry, polygons | Proofs, applications, competitive prep |

---

## 3. Type System Changes

### New Types to Add in `src/types.ts`

```typescript
// ─── Levelled Concept Screen ───
export interface LevelledConcept {
  title: string;
  conceptHeading: string;
  explanation: string;
  difficulty: DifficultyLevel;
  interactiveType?: Screen["interactiveType"];
  pangaHint?: string;
  // NEW: difficulty-specific metadata
  learningObjective?: string;    // What the student should understand
  prerequisiteCheck?: string;    // What they should know first
  challengeLevel?: "guided" | "moderate" | "timed";
}

// ─── Levelled Story Slide ───
export interface LevelledStorySlide extends StorySlide {
  difficulty: DifficultyLevel;
  scenarioType: "daily_life" | "complex_scenario" | "professional";
  conceptConnection?: string;  // Links story back to math concept
}

// ─── Levelled Quiz Question ───
export interface LevelledQuizQuestion extends QuizQuestion {
  difficulty: DifficultyLevel;
  questionType: "recognition" | "multi_step" | "competitive";
  marks?: number;           // CBSE-style marks weighting
  timeLimit?: number;       // Seconds for timed mode (Expert)
}

// ─── Levelled Practice Drill ───
export interface LevelledDrill {
  id: string;
  title: string;
  instruction: string;
  targetValue: any;
  type: string;
  conceptSubtopicId: string;
  difficulty: DifficultyLevel;
  drillMode: "guided" | "independent" | "timed";
  hintAvailable: boolean;
  timeLimit?: number;       // Seconds (Expert only)
  xpReward: number;         // XP can scale with difficulty
}
```

---

## 4. Topic 1: Comparing Numbers

### 4.1 Subtopic: compare_basics (Comparing Whole Numbers & Integers)

#### BEGINNER (Class 6) — "The Number Shopper"

**Concept Depth:**
- **Title:** "Who Has More? The Crocodile's Snack Time!"
- **Concept Heading:** "Comparing Whole Numbers with the Crocodile"
- **Explanation:** "Doston, imagine a hungry crocodile at the market! The crocodile ALWAYS opens its mouth toward the BIGGER number. It's like choosing the bigger samosa plate! If Rohit has 45 marbles and Priya has 32 marbles, the crocodile eats toward 45 because 45 > 32. Just look at the LEFTMOST digit — whoever has the bigger digit in the thousands place wins!"
- **Learning Objective:** "I can compare 4-6 digit whole numbers using >, <, = symbols"
- **Prerequisite Check:** "Can you count from 1 to 1000? Great, let's go!"
- **Challenge Level:** Guided

**Question Bank (Types):**
1. **Recognition:** "Which number is bigger: 5,234 or 4,891?" (Simple digit comparison)
2. **Symbol Selection:** "Put > or < : 7,500 ___ 7,050" (Tens place tiebreaker)
3. **True/False:** "True or False: 9,999 > 10,000" (Understanding place value)
4. **Visual Comparison:** Show numbers on a number line, ask which is to the right
5. **Fill-in-the-blank:** "3,4__5 is greater than 3,421. What digit goes in the blank?"

**Stories:**
1. 🪁 "Tara's Marble Collection" — Tara counts marbles in boxes of thousands, hundreds, tens, and units. Which box has the most? (Simple: count boxes)
2. 🏪 "Raju's Chai Stall Coins" — Raju stacks coins: 234 in one pile, 256 in another. Which pile is taller?
3. 🎈 "Diya's Balloon Order" — Diya orders 1,250 red balloons and 1,180 blue balloons. Which color did she order more of?
4. 🍛 "Samosa Stall Rush" — "Morning rush: 345 customers. Evening rush: 412 customers. Which rush is busier?"

**Practice Drills:**
- **Mode:** Guided with step-by-step hints
- **Format:** "Step 1: Look at the thousands place. Step 2: If they're the same, look at hundreds..."
- **Feedback:** Immediate "✅ Correct! The crocodile chomped the right number!" or "🤔 Hmm, look at the hundreds place again!"
- **XP:** 5 XP per correct (lower reward, higher encouragement)

---

#### INTERMEDIATE (Class 7) — "The Integer Strategist"

**Concept Depth:**
- **Title:** "Below Zero: The Integer Battle Arena"
- **Concept Heading:** "Comparing Integers Including Negatives"
- **Explanation:** "Jab hum negative numbers ki baat karte hain, sab ulta ho jaata hai! On a number line, numbers to the LEFT are always SMALLER. So -50 is actually SMALLER than -10, even though 50 looks bigger than 10. Think of it as depth underwater — -50m is DEEPER (more negative) than -10m. The closer to zero, the LARGER the value. This is the key insight for comparing integers!"
- **Learning Objective:** "I can compare integers including negatives using the number line concept"
- **Prerequisite Check:** "Do you understand what negative numbers represent? (Debt, temperature below zero)"
- **Challenge Level:** Moderate

**Question Bank (Types):**
1. **Multi-step:** "Riya has ₹-150 in her wallet and Kavya has ₹-80. Who has more money? Explain using the number line."
2. **Negative Ordering:** "Order these from smallest to largest: -25, -3, 0, -100, 7"
3. **Mixed Operations:** "If temperature went from -5°C to +3°C, is the new temperature HIGHER or LOWER?"
4. **Contextual:** "A submarine is at -120m. A diver is at -45m. Who is deeper?"
5. **Number Line Placement:** "Where does -7.5 sit between which two integers?"

**Stories:**
1. 🌡️ "Manali Temperature Battle" — "Shimla: -8°C, Manali: -15°C, Leh: -22°C. Which hill station is COLDER? Which is WARMER?"
2. 💰 "Chai Dost's Debt Ledger" — "Rahul owes ₹-200 to Chai Dost. Vikram owes ₹-50. Who owes LESS? Who is closer to paying back?"
3. 📊 "IPL Net Score Rankings" — "Team A: -12 runs (below par). Team B: -45 runs. Team C: +8 runs. Rank them from worst to best."
4. 🚇 "Metro Temperature Logs" — "Underground station A: -2°C. Station B: +18°C. Station C: +5°C. Order them coldest to warmest."
5. 🏊 "Diving Competition" — "Diver A reached -15m. Diver B reached -8m. Diver C reached -23m. Who dove deepest? Who was shallowest?"

**Practice Drills:**
- **Mode:** Independent with optional hint button
- **Format:** 3-5 step problems, no scaffolding for basic steps
- **Feedback:** "Correct! Remember: on the number line, left is always smaller."
- **XP:** 10 XP per correct

---

#### EXPERT (Class 8) — "The Rational Number Analyst"

**Concept Depth:**
- **Title:** "Rational Numbers: Precision Comparison"
- **Concept Heading:** "Comparing Rational Numbers, Fractions, and Terminating/Repeating Decimals"
- **Explanation:** "Rational numbers include fractions, terminating decimals, AND repeating decimals. To compare ANY two rational numbers, convert them to a common form — either common denominators or decimal form. For example: comparing 3/7 and 5/12 requires finding LCM(7,12) = 84, giving us 36/84 vs 35/84, so 3/7 > 5/12. This generalizes the integer comparison we already know. The ordering property is TRICHOTOMY: for any two rational numbers a and b, exactly one holds: a < b, a = b, or a > b."
- **Learning Objective:** "I can compare any two rational numbers and prove the comparison using conversion"
- **Prerequisite Check:** "Do you understand LCM, fractions as division, and decimal conversion?"
- **Challenge Level:** Timed (60 seconds per question)

**Question Bank (Types):**
1. **Competitive Exam (Olympiad):** "Which is larger: 355/113 or 22/7? Prove your answer by converting to decimal to 5 places." (π approximation comparison!)
2. **Data Interpretation:** "A factory's weekly output: Mon=12.75 tonnes, Tue=12 3/4 tonnes, Wed=12.8 tonnes. Rank from lowest to highest output."
3. **Negative Fraction Comparison:** "Compare -7/12 and -5/8 using cross multiplication. Which is greater?"
4. **Proof-Based:** "Prove that if a/b > c/d and b,d > 0, then ad > bc." (Cross-multiplication property)
5. **Speed Challenge:** "Arrange in ascending order: -0.75, -3/4, -0.8, -7/9. You have 45 seconds!"
6. **Application:** "Two investment returns: A gives 3/7 profit, B gives 5/12 profit. Which investment gives better returns?"

**Stories:**
1. 📈 "Business Profit Race" — "Company A's quarterly growth: 3/8, 5/12, 7/16. Company B's: 2/5, 1/3, 3/8. Who performed better overall? Compare each quarter."
2. 🔬 "Science Lab Measurements" — "Lab A's concentration: 7/13 mol/L. Lab B's: 11/24 mol/L. Which lab has the HIGHER concentration? Show your work."
3. 🏆 "Olympiad Selection" — "Three students scored: Riya=355/113, Vikram=22/7, Tara=3.142. Who scored highest? (Hint: these approximate π differently)"
4. 💹 "Stock Market Analysis" — "Stock X changed by -7/12%. Stock Y changed by -5/8%. Which stock dropped MORE?"
5. ⚖️ "Quality Control" — "Batch A purity: 15/17. Batch B purity: 19/22. Which batch is purer? Use cross-multiplication."

**Practice Drills:**
- **Mode:** Timed challenges (60s per question, competition-style)
- **Format:** Mixed question types with increasing difficulty
- **Scoring:** Bonus XP for speed: base 15 XP + up to 10 XP bonus for finishing in under 30s
- **Streak:** "3 correct in a row = Math Champion streak bonus!"
- **No hints available** (or hints cost XP)

---

### 4.2 Subtopic: compare_decimals (Decimal Comparison)

#### BEGINNER (Class 6) — "The Decimal Detective"

**Concept Depth:**
- **Title:** "Tenths & Hundredths: The Place Value Detective"
- **Concept Heading:** "Comparing Decimals Up to 2 Decimal Places"
- **Explanation:** "Decimals are like money — 12.50 means 12 rupees and 50 paise! To compare decimals, always start from the LEFT: first compare the whole number part. If that's the same, look at the tenths place (first digit after the point). If THAT's the same, look at hundredths (second digit). Never fall for the length trap — 0.5 is BIGGER than 0.05, because 5 tenths > 0 tenths!"
- **Learning Objective:** "I can compare decimals up to 2 places using place value"
- **Prerequisite Check:** "Do you know what tenths and hundredths mean?"

**Question Bank:**
1. **Visual:** "Which is bigger: 3.4 or 3.38? Use the place value chart!"
2. **Money Context:** "Shirt A costs ₹245.50, Shirt B costs ₹245.05. Which is cheaper?"
3. **Trap Question:** "Which is larger: 0.7 or 0.68?" (Length trap awareness)
4. **Fill-in:** "2.5_ > 2.53. What digit goes in the blank?"
5. **True/False:** "True: 1.10 > 1.09. False: 0.5 = 0.50"

**Stories:**
1. 🛍️ "Shopping Price Compare" — "Two shops sell the same pen: Shop A = ₹12.75, Shop B = ₹12.57. Which shop is cheaper?"
2. 🍦 "Ice Cream Weights" — "Cone A: 125.8 grams. Cone B: 125.68 grams. Which cone has MORE ice cream?"
3. ⛽ "Petrol Prices" — "Station A: ₹102.50/litre. Station B: ₹102.05/litre. Which is cheaper?"
4. 📏 "Height Comparison" — "Rohit: 1.45m. Priya: 1.48m. Who is taller?"
5. 🎯 "Score Board" — "Player A scored 8.5 runs. Player B scored 8.35 runs. Who scored more?"

**Practice Drills:** Guided, with visual place-value charts

---

#### INTERMEDIATE (Class 7) — "The Decimal Strategist"

**Concept Depth:**
- **Title:** "Hundredths & Thousandths: Precision Matters!"
- **Concept Heading:** "Comparing Decimals Up to 3 Decimal Places with Negative Decimals"
- **Explanation:** "When decimals go to 3 places (thousandths), precision becomes critical. 3.456 vs 3.465 — the hundredths digit (5 vs 6) decides it! Now add NEGATIVE decimals: -2.75 vs -2.8. Remember, -2.75 is CLOSER to zero, so it's LARGER. The number line always works: everything to the right is bigger."
- **Learning Objective:** "I can compare decimals to 3 places and negative decimals accurately"

**Question Bank:**
1. **Multi-step:** "Which is larger: -3.45 or -3.448? Convert both to thousandths first."
2. **Measurement Context:** "Lab readings: 2.456 cm, 2.465 cm, 2.455 cm. Order from smallest to largest."
3. **Tricky Comparison:** "Is 0.999 < 1.0? Explain why or why not."
4. **Temperature:** "Which is warmer: -4.5°C or -4.55°C? By how much?"
5. **Negative Decimals:** "Compare: -12.345 and -12.354. Which is greater?"

**Stories:**
1. 🔬 "Lab Precision Challenge" — "Dr. Mehta's measurements: 12.456 mL, 12.465 mL, 12.455 mL. Which reading is the smallest?"
2. 🌡️ "Hill Station Temperature Log" — "Shimla: -3.45°C. Manali: -3.54°C. Leh: -3.48°C. Order from coldest to warmest."
3. 💰 "Investment Returns" — "Fund A returned 12.456%. Fund B returned 12.465%. Which performed better?"
4. 🏃 "Race Timing" — "Runner A: 12.45 sec. Runner B: 12.448 sec. Who was FASTER?"
5. 📊 "Stock Closing Prices" — "Stock X: -₹2.75. Stock Y: -₹2.80. Which stock fell LESS?"

**Practice Drills:** Moderate, hints available but optional

---

#### EXPERT (Class 8) — "The Decimal Precision Engineer"

**Concept Depth:**
- **Title:** "Infinite Decimals & Rational Number Equivalence"
- **Concept Heading:** "Comparing Repeating Decimals, Irrational Proximity, and Precision Analysis"
- **Explanation:** "Some decimals never end: 1/3 = 0.333... (repeating). To compare repeating decimals, convert to fractions: 0.3̄ = 3/9 = 1/3, and 0.4̄ = 4/9. Since 1/3 = 3/9 > 4/9 would be false... actually 4/9 > 3/9 so 0.4̄ > 0.3̄. For competitive exams, you'll encounter questions like: 'Is 0.999... = 1?' YES! Because 0.999... = 9/9 = 1. This is a fundamental property of real numbers."
- **Learning Objective:** "I can compare repeating decimals by converting to fractions and apply precision analysis"

**Question Bank:**
1. **Competitive:** "Which is larger: 0.̄3 or 0.3̄? (Where 0.̄3 = 0.333... and 0.3̄ = 0.33...)"
2. **Proof:** "Prove that 0.999... = 1 by showing 10x - x = 9x where x = 0.999..."
3. **Multi-step:** "Convert 0.̄27 to fraction form and compare with 3/11."
4. **Speed Round:** "Arrange in 30 seconds: 0.̄4, 0.4̄, 0.444, 5/11"
5. **Application:** "A machine cuts to precision 0.̄01 cm. Is this more precise than 0.012 cm?"

**Stories:**
1. 🏭 "Factory Tolerance Analysis" — "Machine A tolerance: 0.̄01 mm. Machine B tolerance: 0.012 mm. Which machine is more precise?"
2. 📐 "Engineering Blueprint" — "Dimension A: 12.̄3 cm. Dimension B: 12 1/3 cm. Are these the same measurement?"
3. 🧪 "Chemistry Concentration" — "Solution A: 0.̄6 concentration. Solution B: 2/3 concentration. Are they equivalent?"
4. 💹 "Recurring Revenue Model" — "Revenue pattern A: ₹0.̄9 (repeating 9 paise). Revenue pattern B: ₹1. Explain why these give the same daily revenue."
5. 🎯 "Olympiad Challenge" — "Prove: 0.̄12 = 4/33 using algebraic method."

**Practice Drills:** Timed challenges, no hints, competition leaderboard style

---

### 4.3 Subtopic: compare_rounding (Rounding Numbers)

#### BEGINNER (Class 6) — "The Round-Off Helper"

**Concept Depth:**
- **Title:** "Rounding: Quick & Easy Estimation"
- **Concept Heading:** "Rounding Whole Numbers to Nearest 10, 100, 1000"
- **Explanation:** "Rounding is like making quick estimates! If your bill is ₹47, you can say 'about ₹50.' The rule: look at the digit to the RIGHT of where you're rounding. If it's 5 or more, go UP. If it's 4 or less, stay DOWN. So 47 → 50 (because 7 ≥ 5) and 43 → 40 (because 3 < 5)."
- **Learning Objective:** "I can round whole numbers to the nearest 10, 100, or 1000"

**Question Bank:**
1. **Simple Round:** "Round 347 to the nearest ten." (→ 350)
2. **Real World:** "The school has 1,289 students. Round to nearest hundred." (→ 1,300)
3. **Estimation:** "Estimate 456 + 378 by rounding each to nearest ten first."
4. **True/False:** "Rounding 550 to nearest hundred gives 600."
5. **Multiple Choice:** "What is 2,349 rounded to nearest thousand? (a) 2,000 (b) 2,300 (c) 2,400"

**Stories:**
1. 🚌 "Bus Fare Round-Off" — "Auto fare: ₹47. Just give ₹50 — that's rounding!"
2. 🏫 "School Strength Report" — "Our school has 1,289 students. Report says 'about 1,300.'"
3. 🎪 "Fair Game Count" — "Funfair had 456 visitors. Magazine says 'about 460 visitors.'"
4. 🍎 "Fruit Market Estimate" — "127 apples in box A, 234 in box B. Estimate total: 130 + 230 = 360."
5. 📊 "Cricket Score Round" — "Rohit scored 78 runs. Coach says 'about 80, good job!'"

**Practice Drills:** Guided with rounding rule reminder shown on screen

---

#### INTERMEDIATE (Class 7) — "The Estimation Expert"

**Concept Depth:**
- **Title:** "Rounding Decimals & Significant Figures"
- **Concept Heading:** "Rounding Decimals to Any Place, Estimation in Calculations"
- **Explanation:** "Now we round decimals to specific places! Round 12.756 to nearest tenth → 12.8. To nearest hundredth → 12.76. The same rule applies: look ONE digit to the right. When estimating products like 34 × 48, round BOTH to nearest ten: 30 × 50 = 1,500. The actual answer is 1,632, so our estimate is within 10%!"
- **Learning Objective:** "I can round decimals to any specified place and use rounding for estimation"

**Question Bank:**
1. **Decimal Rounding:** "Round 15.678 to nearest tenth." (→ 15.7)
2. **Estimation:** "Estimate 34 × 47 by rounding to nearest ten. How close is your estimate?"
3. **Negative Rounding:** "Round -23.46 to nearest integer." (→ -23)
4. **Multi-step:** "A shopkeeper's bill: ₹234.78. Round to nearest rupee, then calculate 5 such bills."
5. **Error Analysis:** "Tara rounded 12.44 to 12.5. What mistake did she make?"

**Stories:**
1. 🧾 "Shopkeeper's Quick Bill" — "Bill: ₹456.78. Round to nearest rupee: ₹457. 3 such bills: approximately ₹1,371."
2. 🌡️ "Weather Forecast" — "Temperature predicted: 28.6°C. Newspaper says 'about 29°C.' Is this correct?"
3. 📏 "Fabric Measurement" — "Shirt needs 1.456m fabric. Shop sells by 0.1m. How much to buy?"
4. 🏃 "Race Timing" — "Timing: 12.347 seconds. Report shows 12.35s. Is this correct to hundredths?"
5. 💰 "Budget Estimation" — "Items: ₹234.56, ₹89.90, ₹167.25. Estimate total by rounding each to nearest 10."

**Practice Drills:** Moderate, with "check your estimation accuracy" feedback

---

#### EXPERT (Class 8) — "The Precision Analyst"

**Concept Depth:**
- **Title:** "Significant Figures, Rounding in Scientific Context"
- **Concept Heading:** "Rounding in Measurement, Error Propagation, and Significant Figures"
- **Explanation:** "In science and competitive exams, rounding must respect SIGNIFICANT FIGURES. A measurement of 3.47 cm has 3 significant figures. When we multiply 3.47 × 2.1 = 7.287, we round to 2 significant figures (limited by 2.1) → 7.3. In CBSE Class 8, you'll encounter: rounding in scientific notation (3.47 × 10² rounded to 1 sig fig → 3 × 10²), and understanding that rounding introduces UNCERTAINTY."
- **Learning Objective:** "I can apply significant figure rules and understand rounding error in measurements"

**Question Bank:**
1. **Significant Figures:** "Round 0.004567 to 2 significant figures." (→ 0.0046)
2. **Scientific Notation:** "Round 6.789 × 10³ to 2 significant figures." (→ 6.8 × 10³)
3. **Error Propagation:** "Length = 12.3 ± 0.1 cm. Width = 5.6 ± 0.1 cm. What is the maximum possible area?"
4. **Competitive:** "A number rounded to nearest hundred is 1,300. What is the RANGE of possible original values?" (1250-1349)
5. **Application:** "Drug dosage: 2.456 mg rounded to nearest 0.1 mg = 2.5 mg. Calculate dosage for 70 kg patient using rounded value vs exact."

**Stories:**
1. 🔬 "Lab Report Precision" — "Experiment result: 9.807 m/s². Round to 3 sig figs for report. How does rounding affect the final conclusion?"
2. 🏗️ "Construction Tolerance" — "Beam length: 4.567m. Cut to nearest cm: 4.57m. What's the maximum error?"
3. 💊 "Pharmaceutical Dosage" — "Tablet: 250.0 mg. If rounded to nearest 10mg (250mg), does it matter? What about 100mg rounding (300mg)?"
4. 🚀 "Space Mission Calculation" — "Fuel: 1,234.567 kg. Navigation computer uses 3 sig figs: 1.23 × 10³ kg. Error introduced?"
5. 📊 "Competition Timing" — "Swim time: 54.327s. Olympic timing shows 54.33s. Medal decision depends on hundredths!"

**Practice Drills:** Timed, precision-focused, with "significant figure counter" tool

---

### 4.4 Subtopic: compare_place (Place Value)

#### BEGINNER (Class 6) — "The Place Value Explorer"

**Concept Depth:**
- **Title:** "Every Digit Has a Power Address!"
- **Concept Heading:** "Understanding Place Value: Units, Tens, Hundreds, Thousands"
- **Explanation:** "Every digit in a number has a POWER ADDRESS! The number 5,432 has: 2 in Units (ones), 3 in Tens (dahai), 4 in Hundreds (sau), 5 in Thousands (hazaar). The digit 5 at thousands place = 5 × 1000 = 5000. Same digit 2 at units = 2 × 1 = 2. LEFT position = MORE power! Each step left multiplies value by 10."
- **Learning Objective:** "I can identify the place value of any digit in a number up to 6 digits"

**Question Bank:**
1. **Identification:** "In 45,678, what is the place value of digit 6?" (600)
2. **Expanded Form:** "Write 3,452 in expanded form." (3000 + 400 + 50 + 2)
3. **True/False:** "In 7,891, the digit 9 is in the hundreds place."
4. **Fill-in:** "The digit in the thousands place of 2_456 is 8. What is the number?" (28,456)
5. **Comparison:** "In which number is the digit 5 in the thousands place: 5,123 or 1,523?"

**Stories:**
1. 🔢 "Treasure Chest Code" — "The code is 45,672. Each digit opens a different lock based on its place value!"
2. 🏦 "Bank Account Digits" — "Account: ₹87,429. The bank asks: 'What is the value of digit 4?' Answer: 400."
3. 🎯 "Quiz Show buzzer" — "Host says: 'I'm thinking of a 4-digit number. Hundreds digit is 7, tens is 3, units is 5, thousands is 2.' What number?"
4. 📞 "Phone Number Puzzle" — "Rohan's number ends in 5,432. What does each digit represent?"
5. 🎰 "Lucky Number Game" — "Lucky number: 67,891. Sum of all place values = 67,891!"

**Practice Drills:** Guided with place value chart shown

---

#### INTERMEDIATE (Class 7) — "The Place Value Analyst"

**Concept Depth:**
- **Title:** "Large Numbers & Decimal Place Values"
- **Concept Heading:** "Place Value in Lakhs, Crores, and Decimal Place Values"
- **Explanation:** "Indian numbering system goes: Units → Tens → Hundreds → Thousands → Ten Thousands → Lakhs → Crores. In 1,23,45,678: 8 is in units, 7 in tens, 6 in hundreds, 5 in thousands, 4 in ten thousands, 3 in lakhs, 2 in ten lakhs, 1 in crores. For decimals: 12.345 has 3 in tenths (0.3), 4 in hundredths (0.04), 5 in thousandths (0.005)."
- **Learning Objective:** "I can find place values in numbers up to crores and in decimals"

**Question Bank:**
1. **Indian System:** "In 3,45,67,890, what is the place value of digit 5?" (5,00,000 = 5 Lakhs)
2. **Decimal Place:** "In 12.345, what is the value of digit 4?" (0.04 or 4 hundredths)
3. **Multi-step:** "The lakhs digit of a number is 7. The tens digit is 3. All others are 0. Write the number." (7,00,030)
4. **Comparison:** "Number A has digit 5 in lakhs place. Number B has digit 5 in thousands place. Which 5 has more value?"
5. **Error Spotting:** "Tara says: 'In 45.678, digit 7 is in hundredths place.' Is she correct?"

**Stories:**
1. 🏦 "Population Report" — "City population: 45,67,890. The census officer asks: 'How many lakhs?' Answer: 45.67 lakhs."
2. 📊 "Company Revenue" — "Revenue: ₹12,34,56,789. CEO asks: 'What is the crores digit?' Answer: 12."
3. 🔬 "Chemistry Measurement" — "Solution weight: 12.345 kg. What is the value of digit 4? (0.04 kg = 40 grams)"
4. 🌡️ "Temperature Precision" — "Temperature: -5.678°C. Place value of 6? (0.6 = 6 tenths)"
5. 💰 "Budget Allocation" — "School budget: ₹23,45,678. Digit in lakhs place = 3 → ₹3,00,000 allocation."

**Practice Drills:** Moderate, with Indian number system reference chart

---

#### EXPERT (Class 8) — "The Number System Architect"

**Concept Depth:**
- **Title:** "Place Value in Rational Numbers & Scientific Notation"
- **Concept Heading:** "Understanding Place Value in Repeating Decimals, Scientific Notation, and Number Systems"
- **Explanation:** "In 0.̄3 (= 1/3), every digit after the decimal point contributes to the value: 3/10 + 3/100 + 3/1000 + ... = 3/9 = 1/3. This is a GEOMETRIC SERIES! In scientific notation, 12,345 = 1.2345 × 10⁴. The '1' is in the 'ten-thousands' place because the exponent is 4. Understanding place value at this level connects to algebra, series, and the fundamental structure of our number system."
- **Learning Objective:** "I can apply place value concepts to scientific notation and understand the structure of repeating decimals"

**Question Bank:**
1. **Scientific Notation:** "Write 0.000456 in scientific notation. What is the place value of digit 4?" (4.56 × 10⁻⁴, ten-thousandths)
2. **Competitive:** "In 0.̄12, what fraction does digit '1' in the first decimal place contribute?" (1/10)
3. **Multi-step:** "A number in scientific notation is 3.456 × 10⁷. What is the place value of digit 6?" (10,000)
4. **Proof:** "Show that the place value of digit 3 in 0.̄3 equals 1/3 using infinite series."
5. **Application:** "Express the national budget (₹30,00,000 crores) in scientific notation and identify the place value of each digit."

**Stories:**
1. 🚀 "Space Distance" — "Earth to Moon: 3.844 × 10⁵ km. What place value does '4' represent?"
2. 🧬 "DNA Base Pairs" — "Human genome: 3.2 × 10⁹ base pairs. Explain the place value of 2."
3. 🌍 "World Population" — "8.0 × 10⁹ people. If we write it as 8,000,000,000, what is the place value of each digit?"
4. 💰 "National Budget" — "Budget: ₹4.7 × 10⁷ lakhs. Convert and identify digit values."
5. 🔬 "Avogadro's Number" — "6.022 × 10²³. What does the exponent tell us about place value?"

**Practice Drills:** Timed, with scientific notation converter tool

---

### 4.5 Subtopic: compare_order (Ascending/Descending Order)

#### BEGINNER (Class 6) — "The Sorting Helper"

**Concept Depth:**
- **Title:** "Line Them Up! Ascending & Descending"
- **Concept Heading:** "Arranging Numbers in Order (Kram)"
- **Explanation:** "ASCENDING order means SMALLEST to BIGGEST (like climbing stairs UP 🪜). DESCENDING order means BIGGEST to SMALLEST (like going DOWN stairs 📉). To sort: first find the smallest/biggest number, then the next, and so on. For 5 numbers: find the minimum first, then the next smallest, etc."
- **Learning Objective:** "I can arrange 4-6 whole numbers in ascending and descending order"

**Question Bank:**
1. **Simple Sort:** "Arrange in ascending: 45, 12, 78, 23, 56."
2. **Descending:** "Arrange in descending: 345, 123, 678, 234, 567."
3. **Real World:** "Temperatures this week: 32°, 28°, 35°, 30°, 27°. Arrange coolest to warmest."
4. **Selection:** "Which number comes FIRST in ascending order: 456, 123, 789?" (123)
5. **Mixed:** "Put these in ascending: 1,234, 1,243, 1,324, 1,423."

**Stories:**
1. 🏃 "Race Results" — "5 runners finished in: 12s, 10s, 14s, 11s, 13s. Rank from fastest to slowest."
2. 📊 "Height Chart" — "Students' heights: 135cm, 142cm, 128cm, 150cm, 138cm. Arrange shortest to tallest."
3. 🎯 "Score Board" — "Quiz scores: 85, 92, 78, 96, 88. Arrange lowest to highest."
4. 💰 "Pocket Money" — "Weekly pocket money: ₹50, ₹75, ₹25, ₹100, ₹60. Arrange least to most."
5. ⚖️ "Weight Check" — "Fruit weights: 250g, 180g, 320g, 150g, 275g. Arrange lightest to heaviest."

**Practice Drills:** Guided with "find the smallest first" step prompts

---

#### INTERMEDIATE (Class 7) — "The Order Master"

**Concept Depth:**
- **Title:** "Ordering with Negatives, Decimals, and Mixed Numbers"
- **Concept Heading:** "Arranging Integers, Decimals, and Mixed Types in Order"
- **Explanation:** "Now we sort NEGATIVES and DECIMALS together! Rule: convert everything to decimal form first, then use the number line. For -3, 0.5, -1.5, 2: on the number line, -3 is furthest left, then -1.5, then 0.5, then 2. Ascending: -3, -1.5, 0.5, 2. Common mistake: thinking -3 < -5 (WRONG! -3 > -5 because -3 is closer to zero)."
- **Learning Objective:** "I can arrange mixed numbers including negatives and decimals in correct order"

**Question Bank:**
1. **Mixed Types:** "Arrange ascending: -5, 3.5, -2.8, 0, 4.2"
2. **Negative Order:** "Order from smallest: -15, -3, -20, 0, -8"
3. **Decimal Order:** "Arrange descending: 3.45, 3.54, 3.405, 3.5"
4. **Tricky:** "Which comes first in ascending: -0.5 or -0.49?" (-0.5)
5. **Multi-step:** "If a < b < c and a = -7, c = 3, find possible values of b."

**Stories:**
1. 🌡️ "Weekly Temperature Chart" — "Mon: -5°C, Tue: 3°C, Wed: -12°C, Thu: 0°C, Fri: 7°C. Arrange coldest to warmest."
2. 💰 "Debt Ranking" — "Friends' debts: ₹-200, ₹-50, ₹0, ₹-150, ₹-30. Arrange from most debt to least."
3. 🏃 "Race with Handicaps" — "Runner times: 12.5s, 11.8s, 13.2s, 12.1s. Arrange fastest to slowest."
4. 📊 "Stock Performance" — "Stocks A: +5.2%, B: -3.1%, C: +1.8%, D: -7.4%. Arrange worst to best."
5. 🎯 "Quiz Score Line" — "Scores: 8.5, -2 (penalty), 7.0, 0, 9.5. Arrange from worst to best."

**Practice Drills:** Moderate, with number line visualization

---

#### EXPERT (Class 8) — "The Sorting Algorithm Designer"

**Concept Depth:**
- **Title:** "Ordering Rational Numbers & Proving Order Relationships"
- **Concept Heading:** "Formal Ordering of Rational Numbers, Density Property, and Proof"
- **Explanation:** "The DENSITY PROPERTY states: between any two rational numbers, there are INFINITELY many more rational numbers. Between 0.3 and 0.4, we have 0.31, 0.311, 0.3111... This means we can NEVER list all rational numbers in order! For competitive exams, you'll prove ordering: 'If a < b, prove a + c < b + c' (add c to both sides preserves order). Understanding this connects to algebraic inequalities."
- **Learning Objective:** "I can order rational numbers and prove order relationships algebraically"

**Question Bank:**
1. **Competitive:** "Arrange in ascending: -7/12, 5/8, -3/5, 2/3, -0.6"
2. **Proof:** "If a < b and c > 0, prove that ac < bc."
3. **Density:** "Find 3 rational numbers between 0.3̄ and 0.4."
4. **Algebraic:** "If x is between -2 and 3, and y = 2x + 1, what is the range of y?"
5. **Application:** "Class marks: A=355/113, B=22/7, C=3.142. Rank all three. Which approximation of π is closest to actual π?"

**Stories:**
1. 📈 "Business Ranking" — "Company returns: -7/12%, 5/8%, -3/5%, 2/3%. Rank from worst to best return."
2. 🔬 "Chemistry Concentration Ranking" — "Solutions: 3/7 M, 5/12 M, 2/5 M, 7/16 M. Arrange from most dilute to most concentrated."
3. 🏆 "Olympiad Scorecard" — "Students scored: -3/7, 5/12, -1/4, 2/9. Rank from lowest to highest."
4. 💹 "Interest Rate Competition" — "Banks offer: 3/7%, 5/12%, 2/5%. Which gives the BEST rate to customers?"
5. ⚖️ "Quality Comparison" — "Product purity: 15/17, 19/22, 0.̄6. Which is purest?"

**Practice Drills:** Timed with algebraic proof components

---

## 5. Topic 2: Max/Min & Range

### 5.1 Subtopic: maxmin_max (Finding Maximum)

#### BEGINNER (Class 6) — "The Champion Finder"

**Concept Depth:**
- **Title:** "Who Wins? Finding the Champion Number!"
- **Concept Heading:** "Finding Maximum Value in a List of Whole Numbers"
- **Explanation:** "Maximum (Uchchatam) = the BIGGEST number in a group! Like finding the topper in class — you compare all marks and the HIGHEST mark belongs to the champion. Method: Scan left to right, keep the biggest number you've seen so far. When you find something bigger, replace it. At the end, you have the maximum!"
- **Learning Objective:** "I can identify the maximum in a list of 3-6 whole numbers"

**Question Bank:**
1. **Simple Find:** "Find the maximum: 45, 78, 23, 91, 56." (91)
2. **Real World:** "Rohit scored 65, 72, 58, 84 in 4 innings. What is his MAXIMUM score?" (84)
3. **Visual:** "Show 5 sticks of different heights. Which is the tallest?"
4. **Comparison:** "What is the maximum of: 1,234, 1,243, 1,324?" (1,324)
5. **Fill-in:** "The maximum of 25, _, 40, 15 is 40. What values can go in the blank?" (Any ≤ 40)

**Stories:**
1. 🏏 "Cricket Score Champion" — "IPL scores: [45, 78, 92, 67, 85]. Which is the maximum score? That's the champion innings!"
2. 🎪 "Fair Game Maximum" — "Ticket prices at 4 counters: ₹25, ₹30, ₹20, ₹35. Maximum price = ₹35."
3. 🍛 "Samosa Rating" — "Ratings from 5 friends: 4, 5, 3, 5, 4. Maximum rating = 5 stars!"
4. 📏 "Height Challenge" — "Students: 130cm, 145cm, 138cm, 152cm. Tallest student = 152cm."
5. ⏱️ "Speed Run" — "Sprint times: 12s, 10s, 14s, 11s. FASTEST (minimum time) = 10s." (Trick: fastest = minimum, not maximum!)

**Practice Drills:** Guided with "scan and compare" strategy prompts

---

#### INTERMEDIATE (Class 7) — "The Peak Value Hunter"

**Concept Depth:**
- **Title:** "Maximum with Integers and Decimals"
- **Concept Heading:** "Finding Maximum in Integer Sets, Temperature Data, and Decimal Values"
- **Explanation:** "Maximum in negative numbers is TRICKY! In [-5, -12, -3, -8], the maximum is -3 (closest to zero). Think of it as: the maximum temperature today among -5°C, -12°C, -3°C is -3°C (warmest!). For decimals: 12.45 vs 12.5 → maximum is 12.5. Same rule applies, but be careful with negative decimals: -2.5 > -2.8."
- **Learning Objective:** "I can find maximum in sets containing negative integers and decimals"

**Question Bank:**
1. **Negative Max:** "Find maximum: -5, -12, -3, -8, 0." (0)
2. **Decimal Max:** "Maximum of: 12.45, 12.5, 12.05, 12.49." (12.5)
3. **Mixed:** "Maximum of: -3.5, -2.8, 0, 1.5, -4.2." (1.5)
4. **Data Set:** "Weekly temperatures: -5, 3, -12, 0, 7, -2, 5. What's the maximum?" (7)
5. **Application:** "A shopkeeper's daily losses: ₹-500, ₹-200, ₹-800, ₹-150. Least loss (maximum) = ?" (₹-150)

**Stories:**
1. 🌡️ "Hill Station Temperature" — "Temperatures: -8°C, -15°C, -3°C, -22°C. Maximum (warmest) = -3°C."
2. 📊 "IPL Score Analysis" — "Scores: 110, 85, 125, 95, 140. Maximum = 140 runs."
3. 💰 "Business Revenue" — "Monthly revenues: ₹-2000, ₹500, ₹-800, ₹1200, ₹-500. Maximum = ₹1200."
4. 🏃 "Race Results" — "Times: 12.5s, 11.8s, 13.2s, 12.1s. Fastest (MINIMUM time) = 11.8s."
5. 📈 "Stock Returns" — "Weekly: -3.2%, +1.5%, -5.1%, +2.8%, -0.5%. Best week = +2.8%."

**Practice Drills:** Moderate, with number line visualization for negatives

---

#### EXPERT (Class 8) — "The Optimization Analyst"

**Concept Depth:**
- **Title:** "Maximum in Function Contexts and Multi-Variable Sets"
- **Concept Heading:** "Finding Maximum in Algebraic Expressions, Quadratic Functions, and Data Sets"
- **Explanation:** "In Class 8, you'll encounter maximum in algebraic contexts. The maximum value of -(x-3)² + 5 is 5 (when x=3), because (x-3)² is always ≥ 0, so -(x-3)² ≤ 0. For competitive exams: 'What is the maximum value of -2x² + 8x - 3?' Complete the square: -2(x² - 4x) - 3 = -2(x-2)² + 8 - 3 = -2(x-2)² + 5. Maximum = 5 at x=2."
- **Learning Objective:** "I can find maximum values in algebraic expressions and interpret data sets"

**Question Bank:**
1. **Algebraic Maximum:** "Find the maximum value of -(x-2)² + 7." (7)
2. **Quadratic:** "What is the maximum of f(x) = -x² + 4x + 1?" (5, at x=2)
3. **Data Analysis:** "Monthly profits: ₹-5000, ₹12000, ₹8000, ₹-2000, ₹15000, ₹9500. Find maximum and interpret."
4. **Competitive:** "For what value of x does 12 - (x-5)² reach its maximum?" (x=5, max=12)
5. **Multi-step:** "A ball is thrown: height h = -5t² + 20t + 1. What is the maximum height?" (21m at t=2s)

**Stories:**
1. 🎯 "Projectile Motion" — "A ball thrown: h = -5t² + 20t + 1. Maximum height? Complete the square to find!"
2. 📈 "Business Optimization" — "Profit function: P(x) = -2x² + 80x - 500 where x = units. Maximum profit?"
3. 🌡️ "Temperature Modeling" — "T(t) = -0.5(t-14)² + 35. Maximum temperature of the day?"
4. 💹 "Revenue Optimization" — "R(x) = -(x-100)² + 5000. Maximum revenue at what price?"
5. 🏗️ "Architecture Design" — "Arch height: h = -(x-6)² + 9. Maximum arch height?"

**Practice Drills:** Timed with quadratic formula reference sheet

---

### 5.2 Subtopic: maxmin_min (Finding Minimum)

#### BEGINNER (Class 6) — "The Smallest Finder"

**Concept Depth:**
- **Title:** "Finding the Smallest: The Budget Helper"
- **Concept Heading:** "Finding Minimum Value in a List"
- **Explanation:** "Minimum (Nyunatam) = the SMALLEST number! Like finding the cheapest item at the shop. If chai costs ₹10, ₹15, and ₹20, the minimum price is ₹10. Scan the list and keep the SMALLEST number you've seen."
- **Learning Objective:** "I can identify the minimum in a list of whole numbers"

**Question Bank:**
1. **Simple Find:** "Find minimum: 45, 12, 78, 8, 56." (8)
2. **Real World:** "Apple prices: ₹40/kg, ₹35/kg, ₹50/kg, ₹30/kg. Minimum price?" (₹30)
3. **Visual:** "Which is the shortest stick?"
4. **True/False:** "The minimum of 0, 5, 3, 8 is 0."
5. **Application:** "Ticket prices: ₹250, ₹180, ₹300, ₹220. Cheapest ticket = ?" (₹180)

**Stories:**
1. 🍎 "Fruit Market Bargain" — "Apple prices: ₹40, ₹35, ₹50, ₹30. Minimum = ₹30/kg. That's the bargain!"
2. 🚌 "Bus Fare Hunt" — "Fares: ₹25, ₹30, ₹20, ₹35. Minimum = ₹20. Shortest route!"
3. 🎯 "Quiz Score Check" — "Scores: 85, 92, 78, 96. Minimum = 78. Needs improvement!"
4. 💰 "Price Comparison" — "Shops: ₹100, ₹85, ₹120, ₹95. Best deal = ₹85."
5. 📏 "Shortest Height" — "Students: 140cm, 135cm, 145cm, 130cm. Shortest = 130cm."

**Practice Drills:** Guided with "scan for the smallest" prompts

---

#### INTERMEDIATE (Class 7) — "The Minimum Expert"

**Concept Depth:**
- **Title:** "Minimum with Negative Numbers"
- **Concept Heading:** "Finding Minimum in Integer Sets and Understanding Negative Minimums"
- **Explanation:** "With NEGATIVES, minimum is the MOST NEGATIVE (furthest from zero on the left). In [-5, -12, -3, -8], minimum is -12. Think: the deepest point underground! For temperature: -22°C is the minimum (coldest) among -5°C, -22°C, -3°C."
- **Learning Objective:** "I can find minimum in sets containing negative integers and decimals"

**Question Bank:**
1. **Negative Min:** "Minimum of: -5, -12, -3, -8, 0." (-12)
2. **Temperature:** "Temps: -8, -15, -3, -22. Minimum (coldest) = ?" (-22)
3. **Mixed:** "Minimum of: -3.5, -2.8, 0, 1.5, -4.2." (-4.2)
4. **Application:** "Losses: ₹-500, ₹-200, ₹-800, ₹-150. Maximum loss (minimum) = ?" (₹-800)
5. **Comparison:** "Is the minimum of {-5, -3, -10} greater or less than the minimum of {-2, -8, -1}?" (-10 < -8)

**Stories:**
1. 🌡️ "Freezer Temperature Alert" — "Readings: -15°C, -8°C, -22°C, -10°C. Minimum = -22°C. Danger zone!"
2. 💰 "Stock Market Crash" — "Daily: -3.2%, -5.1%, -1.8%, -7.4%. Worst day = -7.4%."
3. 🏔️ "Altitude Record" — "Depths: -50m, -120m, -80m, -200m. Deepest = -200m."
4. 📊 "Exam Score Low" — "Class scores: 85, -5 (penalty), 78, 92, 0. Minimum = -5."
5. ⏱️ "Race Slowest" — "Times: 12.5s, 15.2s, 11.8s, 13.1s. Slowest (maximum time) = 15.2s."

**Practice Drills:** Moderate, with number line for negative minimum

---

#### EXPERT (Class 8) — "The Minimum Value Analyst"

**Concept Depth:**
- **Title:** "Minimum in Algebraic Expressions and Optimization"
- **Concept Heading:** "Finding Minimum Values of Quadratic Expressions"
- **Explanation:** "A quadratic x² - 6x + 13 = (x-3)² + 4 has minimum value 4 (at x=3), because squares are always ≥ 0. For competitive exams: minimum of ax² + bx + c occurs at x = -b/(2a) if a > 0. The minimum value is c - b²/(4a). This is the VERTEX of the parabola!"
- **Learning Objective:** "I can find minimum values of quadratic expressions using vertex formula"

**Question Bank:**
1. **Algebraic:** "Find minimum of x² - 4x + 7." (3, at x=2)
2. **Vertex Formula:** "Minimum of 2x² - 12x + 20?" (x=3, min=2)
3. **Application:** "Cost function: C(x) = x² - 10x + 30. Minimum cost at what production level?"
4. **Competitive:** "Find the minimum value of 3x² + 6x + 5." (2, at x=-1)
5. **Proof:** "Prove that x² + 1 ≥ 1 for all real x, and find when equality holds."

**Stories:**
1. 🏭 "Production Cost Optimization" — "Cost: C(x) = x² - 20x + 150. Find production level for minimum cost."
2. 📈 "Revenue Minimization" — "Loss function: L(x) = 2x² - 16x + 40. What minimizes loss?"
3. 🚀 "Rocket Trajectory" — "Height: h = t² - 8t + 20. When is the rocket at minimum height?"
4. 💰 "Investment Risk" — "Risk function: R(x) = x² - 6x + 13. Minimum risk at what allocation?"
5. 🏗️ "Bridge Design" — "Cable curve: y = x² - 10x + 30. Lowest point of the cable?"

**Practice Drills:** Timed with vertex formula reference

---

### 5.3 Subtopic: maxmin_range (Range/Fasla)

#### BEGINNER (Class 6) — "The Spread Calculator"

**Concept Depth:**
- **Title:** "Range = How Far Apart? The Fasla Story!"
- **Concept Heading:** "Calculating Range (Fasla) = Maximum - Minimum"
- **Explanation:** "Range (Fasla) tells us how SPREAD OUT numbers are! Formula: Range = Maximum - Minimum. Example: Prices ₹10, ₹15, ₹20 → Max=20, Min=10 → Range=10. Bigger range = more variation! If everyone scored 50, range = 0 (no variation)."
- **Learning Objective:** "I can calculate range for whole numbers and understand what it means"

**Question Bank:**
1. **Simple Range:** "Find range: 12, 5, 29, 3, 17." (29-3=26)
2. **Real World:** "Temperatures: 25°, 30°, 28°, 35°, 22°. Range?" (35-22=13)
3. **Understanding:** "If range is 0, what does it mean about the data?" (All values are the same)
4. **Reverse:** "Maximum is 50, range is 15. What is the minimum?" (35)
5. **Visual:** "Show 5 dots on a number line. How to find the range visually?"

**Stories:**
1. 🌡️ "Delhi Weather Fasla" — "Delhi: max 45°C, min 2°C. Fasla = 43°C! That's a HUGE range!"
2. 🍛 "Chai Price Spread" — "Chai prices: ₹10, ₹12, ₹15. Fasla = ₹5. Small range = consistent pricing!"
3. 📊 "Test Score Spread" — "Class scores: 45, 78, 92, 56, 85. Range = 92-45 = 47. Big spread!"
4. 🏏 "Cricket Boundaries" — "Shot distances: 68m, 72m, 85m, 61m. Range = 85-61 = 24m."
5. 💰 "Price Range" — "Shirt prices: ₹250, ₹350, ₹200, ₹400. Range = ₹200."

**Practice Drills:** Guided with Max-Min identification first, then subtraction

---

#### INTERMEDIATE (Class 7) — "The Spread Analyst"

**Concept Depth:**
- **Title:** "Range with Negative Numbers and Decimals"
- **Concept Heading:** "Calculating Range Across Negative and Positive Values"
- **Explanation:** "When data includes NEGATIVES, range calculation gets interesting! Example: temperatures -15°C to +35°C. Range = 35 - (-15) = 35 + 15 = 50°C. The range SPANS from negative to positive. This is why Leh has a bigger temperature range than Mumbai — Leh goes from -20°C to +35°C (range 55) while Mumbai goes from 18°C to 35°C (range 17)."
- **Learning Objective:** "I can calculate range with negative integers and decimals"

**Question Bank:**
1. **Negative Range:** "Find range: -5, -12, -3, -8, 0." (0-(-12)=12)
2. **Spanning Zero:** "Temps: -15°C, 35°C. Range?" (35-(-15)=50)
3. **Decimal Range:** "Range of: 12.5, 8.3, 15.7, 10.1." (15.7-8.3=7.4)
4. **Multi-step:** "Max daily temp: 32°C. Min night temp: -5°C. Range? What does this mean for plant growth?"
5. **Reverse Problem:** "Range is 25. Maximum is 15. What is the minimum?" (-10)

**Stories:**
1. 🏔️ "Hill Station vs Coastal" — "Leh: -20°C to +35°C → Range 55°C. Mumbai: 18°C to 35°C → Range 17°C. Which city has more extreme weather?"
2. 📊 "Business Revenue Spread" — "Monthly: ₹-5000, ₹12000, ₹8000, ₹-2000, ₹15000. Range = ₹20000. Big spread!"
3. 🏃 "Race Time Variation" — "Runners: 11.5s, 13.2s, 12.8s, 14.1s, 11.9s. Range = 2.6s. How consistent is the team?"
4. 💹 "Stock Volatility" — "Daily changes: -3.2%, +5.1%, -1.8%, +7.4%, -0.5%. Range = 10.6%. High volatility!"
5. 🌡️ "Seasonal Temperature" — "Year range: -10°C to +45°C. Range = 55°C. What does this tell us about climate?"

**Practice Drills:** Moderate, with careful attention to subtracting negatives

---

#### EXPERT (Class 8) — "The Statistical Range Analyst"

**Concept Depth:**
- **Title:** "Range in Statistical Context and Data Interpretation"
- **Concept Heading:** "Range as Statistical Measure, Interquartile Range, and Data Analysis"
- **Explanation:** "Range is the SIMPLEST measure of spread but has limitations — it only uses two values (max and min). In competitive exams, you'll learn: (1) Range = Max - Min, (2) Interquartile Range (IQR) = Q3 - Q1 (middle 50% spread), (3) Range of grouped data, (4) How outliers affect range. Example: data {2, 5, 7, 8, 100} has range = 98, but IQR = 3 (much more stable measure)."
- **Learning Objective:** "I can calculate range, understand its limitations, and apply it in data interpretation"

**Question Bank:**
1. **Statistical:** "Data: 12, 15, 18, 22, 35, 40, 8. Find range and comment on spread." (Range=32, spread is moderate)
2. **IQR Introduction:** "Data: 3, 5, 7, 8, 10, 12, 15. Find range and identify Q1, Q3." (Range=12, IQR=7)
3. **Competitive:** "If the range of 5 numbers is 20, and 4 numbers are 5, 8, 12, 15, what are possible values of the 5th number?"
4. **Data Set:** "Monthly profits: ₹-5000, ₹12000, ₹8000, ₹-2000, ₹15000, ₹9500. Calculate range and interpret business stability."
5. **Application:** "Two factories produce bolts: Factory A range = 0.5mm, Factory B range = 2.3mm. Which factory is more consistent? Why does range matter in quality control?"

**Stories:**
1. 🏭 "Quality Control Analysis" — "Bolt lengths: Factory A ranges 0.5mm, Factory B ranges 2.3mm. Lower range = better consistency!"
2. 📊 "Exam Score Analysis" — "Class A range: 45 marks. Class B range: 20 marks. Which class has more consistent performance?"
3. 💹 "Stock Market Risk" — "Stock X daily range: ₹50. Stock Y range: ₹200. Which stock is riskier?"
4. 🌡️ "Climate Data Interpretation" — "City A range: 55°C. City B range: 17°C. Which has more extreme weather?"
5. 🔬 "Measurement Precision" — "Lab readings range: 0.02. Field readings range: 2.5. Which measurement method is more precise?"

**Practice Drills:** Timed with data set analysis component

---

## 6. Topic 3: Geometry

### 6.1 Subtopic: geom_bindu (Point / Bindu)

#### BEGINNER (Class 6) — "The Dot Discoverer"

**Concept Depth:**
- **Title:** "Bindu: The Tiny Dot That Started Geometry!"
- **Concept Heading:** "What is a Point (Bindu)? Zero Dimensions!"
- **Explanation:** "A Bindu (Point) is the SMALLEST thing in geometry — it has NO length, NO width, NO height. It's ZERO-dimensional (0D)! It only tells us WHERE something is, not how big it is. We label points with CAPITAL letters like A, B, C. Think of it as a tiny dot on your paper — it shows a position but you can't measure it!"
- **Learning Objective:** "I can identify points in real life, label them with capital letters, and understand they have 0 dimensions"
- **Challenge Level:** Guided

**Question Bank:**
1. **Recognition:** "Is the tip of a pencil a point? Why or why not?"
2. **Labeling:** "Label these 3 points on a line as A, B, C."
3. **Real World:** "Name 5 points you see in your classroom." (Corners, tips, etc.)
4. **Properties:** "Does a point have length? Width? Height?" (No to all!)
5. **True/False:** "A point has zero dimensions. TRUE."

**Stories:**
1. 🪁 "Pinpoint the Kite String" — "Tara ties her kite string to a tiny knot on the handle. That knot is a POINT — it shows where the string starts!"
2. 🍛 "Samosa Tip" — "Maths Dost points to the tip of a samosa corner: 'This tip is a Bindu — zero dimensions!'"
3. 🎈 "Balloon Pin" — "Diya pins a balloon to the wall with a tiny thumbtack. The tack point is a Bindu!"
4. 🏏 "Cricket Stumps" — "Coach Amit taps the top of a stump: 'This point marks a position — that's a Bindu!'"
5. ⭐ "Star in the Sky" — "Maths Dost looks up: 'That star looks like a tiny dot — in geometry, that's a Point!'"

**Practice Drills:** Point Hunt — click on dots on the screen. Guided hints showing where to look.

---

#### INTERMEDIATE (Class 7) — "The Coordinate Mapper"

**Concept Depth:**
- **Title:** "Points on the Number Line and Cartesian Plane"
- **Concept Heading:** "Representing Points with Coordinates, Including Negative Values"
- **Explanation:** "Points now have COORDINATES! On a number line, point A might be at -3 and point B at +5. On a 2D plane (Cartesian), a point is written as (x, y) — like (3, -2) means 3 units right and 2 units down. We can PLOT points with negative coordinates, find DISTANCE between points using |x₂-x₁|, and understand the origin (0,0)."
- **Learning Objective:** "I can plot points on a coordinate plane including all four quadrants"

**Question Bank:**
1. **Plotting:** "Plot the point (-3, 4) on a coordinate plane."
2. **Distance:** "Distance between points (2,3) and (2,7) = ?" (4 units)
3. **Quadrant:** "In which quadrant is the point (-5, -3)?" (Third quadrant)
4. **Negative Plotting:** "Plot: A(-4,2), B(3,-5), C(0,0), D(-2,-3)."
5. **Midpoint:** "What is the midpoint of (2,6) and (8,4)?" (5,5)

**Stories:**
1. 🗺️ "GPS Navigation" — "Your taxi is at (-3, 4) on the city map. The destination is at (5, -2). Plot both points!"
2. 🏏 "Cricket Field Positions" — "Fielder A at (3, 5), Fielder B at (-2, 4). Distance between them?"
3. 📐 "Grid City Planning" — "Park at (-4, -3). School at (2, 5). How far apart are they?"
4. 🧭 "Compass Directions" — "Starting point: origin (0,0). Walk 3 units east, 4 units south. New point?"
5. 🗺️ "Treasure Hunt" — "Treasure is hidden at the point equidistant from (0,6) and (0,-6). Where is it?"

**Practice Drills:** Point Hunt with mixed positive/negative coordinates. Moderate difficulty.

---

#### EXPERT (Class 8) — "The Geometric Proof Builder"

**Concept Depth:**
- **Title:** "Points, Lines, and the Foundations of Euclidean Geometry"
- **Concept Heading:** "Euclid's Axioms, Postulates Involving Points, and Coordinate Geometry"
- **Explanation:** "Euclid's first postulate: 'A straight line segment can be drawn joining any two points.' This means through any two points, EXACTLY ONE line passes. Key theorem: 'Through a given point, infinitely many lines can be drawn, but through two given points, only ONE line can be drawn.' In coordinate geometry, the distance formula d = √((x₂-x₁)² + (y₂-y₁)²) extends the concept of measuring between points."
- **Learning Objective:** "I can apply Euclid's axioms to points and use the distance formula"

**Question Bank:**
1. **Euclid's Axiom:** "How many lines can pass through two given points?" (Exactly one)
2. **Distance Formula:** "Distance between (3,4) and (7,1)?" (5 units)
3. **Proof:** "Prove that the distance from (-3, 0) to (3, 0) is 6 units using the formula."
4. **Application:** "A circle has center (2,3) and passes through (5,7). Find the radius." (5 units)
5. **Competitive:** "Points A(1,2), B(4,6), C(7,10). Are they collinear?" (Check slopes)

**Stories:**
1. 📐 "Euclid's Workshop" — "Euclid says: 'I can draw exactly ONE line through points A(1,1) and B(4,5). Prove it!'"
2. 🏗️ "Architecture Blueprint" — "Building corners at (0,0), (10,0), (10,8), (0,8). Find the diagonal distance."
3. 🛰️ "Satellite Positioning" — "Satellite A at (3,4,5). Satellite B at (7,1,9). Find distance using 3D formula."
4. 🧮 "Triangle Proof" — "Points A(0,0), B(3,0), C(0,4). Prove AB ⊥ AC and find BC."
5. 🌍 "Earth Coordinates" — "Two cities: A at lat 28.6°N, B at lat 19.0°N. How many degrees apart?"

**Practice Drills:** Timed with distance formula and proof components

---

### 6.2 Subtopic: geom_rekha (Line / Rekha)

#### BEGINNER (Class 6) — "The Infinite Line Explorer"

**Concept Depth:**
- **Title:** "Rekha: The Line That Never Ends!"
- **Concept Heading:** "What is a Line (Rekha)? Infinite in Both Directions!"
- **Explanation:** "A Line (Rekha) is a collection of infinite points going STRAIGHT in BOTH directions forever! It has NO endpoints — that's what makes it different from a segment. We show this with arrows on both ends: <---->. A line is ONE-dimensional (1D) — it has length but no width. Railway tracks that go on forever are like lines!"
- **Learning Objective:** "I can identify lines, distinguish them from segments, and understand their infinite nature"
- **Challenge Level:** Guided

**Question Bank:**
1. **Recognition:** "Is a railway track that goes forever a line or a segment?" (Line)
2. **Properties:** "How many endpoints does a line have?" (Zero!)
3. **Notation:** "How do we write 'line through A and B'?" (AB with arrows: ↔)
4. **Counting:** "How many points are on a line?" (Infinite!)
5. **Comparison:** "What's the difference between a line and a segment?" (Lines are infinite, segments are finite)

**Stories:**
1. 🚂 "Metro Rails" — "The Delhi Metro tracks go on forever in both directions — that's a Rekha!"
2. 🏗️ "Road Construction" — "The highway stretches from one end of India to the other — like an infinite Rekha!"
3. ⚡ "Lightning Bolt" — "A lightning bolt shoots from cloud to ground — but we can imagine it extending both ways = Rekha!"
4. 🌊 "Horizon Line" — "The sea meets the sky at the horizon — it looks like an infinite line!"
5. ✏️ "Pencil Line" — "Draw a straight line with arrows on both ends — that's a Rekha symbol!"

**Practice Drills:** Line Touch — drag to extend lines. Guided with arrow notation reminders.

---

#### INTERMEDIATE (Class 7) — "The Parallel & Perpendicular Analyst"

**Concept Depth:**
- **Title:** "Parallel Lines, Perpendicular Lines, and Transversals"
- **Concept Heading:** "Properties of Parallel Lines, Perpendicular Lines, and Their Intersections"
- **Explanation:** "Two lines are PARALLEL if they never meet, no matter how far extended. Distance between them stays CONSTANT. Two lines are PERPENDICULAR if they cross at EXACTLY 90°. Key properties: (1) Parallel lines have EQUAL corresponding angles, (2) Perpendicular lines form 4 right angles, (3) A transversal cutting parallel lines creates alternate interior angles that are EQUAL."
- **Learning Objective:** "I can identify parallel and perpendicular lines and use their angle properties"

**Question Bank:**
1. **Identification:** "Are these lines parallel or perpendicular: y = 2x + 1 and y = 2x - 3?" (Parallel, same slope)
2. **Angle Finding:** "If two parallel lines are cut by a transversal and one angle is 60°, what are the other angles?" (60°, 120°, 60°, 120°)
3. **Perpendicular:** "Find the slope of a line perpendicular to y = 3x + 2." (-1/3)
4. **Real World:** "Railway tracks are parallel. Station platforms are perpendicular to tracks. Why?"
5. **Proof:** "Prove that if line AB is parallel to line CD, then alternate interior angles are equal."

**Stories:**
1. 🚂 "Metro Track Geometry" — "The two rails of a metro track are PARALLEL — they never meet! The station platform is PERPENDICULAR to the tracks."
2. 🏗️ "Building Blueprint" — "Walls are perpendicular to the floor. Adjacent walls are perpendicular to each other."
3. 📐 "Ruler Drawing" — "Draw two parallel lines using a ruler and set square. Measure the distance between them."
4. 🏏 "Cricket Pitch" — "The bowling crease is perpendicular to the pitch length. The return creases are parallel."
5. 🌉 "Bridge Engineering" — "Bridge cables are parallel. Support pillars are perpendicular to the road."

**Practice Drills:** Moderate, with angle measurement tools

---

#### EXPERT (Class 8) — "The Line Equation Master"

**Concept Depth:**
- **Title:** "Equations of Lines, Slope, and Linear Relationships"
- **Concept Heading:** "Slope-Intercept Form, Point-Slope Form, and Systems of Linear Equations"
- **Explanation:** "A line can be described by the equation y = mx + c where m = slope (rise/run) and c = y-intercept. Two lines are parallel if slopes are equal (m₁ = m₂). Two lines are perpendicular if m₁ × m₂ = -1. The distance from a point (x₀,y₀) to line ax + by + c = 0 is |ax₀ + by₀ + c|/√(a²+b²)."
- **Learning Objective:** "I can write equations of lines, determine parallel/perpendicular relationships, and calculate distances"

**Question Bank:**
1. **Equation:** "Write the equation of line passing through (2,3) with slope 4." (y = 4x - 5)
2. **Parallel/Perpendicular:** "Line through (1,2) parallel to y = 3x + 1?" (y = 3x - 1)
3. **Distance:** "Distance from point (3,4) to line 3x + 4y - 12 = 0?" (1 unit)
4. **Intersection:** "Find where y = 2x + 1 and y = -x + 7 intersect." (2, 5)
5. **Competitive:** "Two lines y = 3x + 2 and y = -⅓x + 5 are perpendicular. Find their intersection point."

**Stories:**
1. 📈 "Business Growth Lines" — "Company A: y = 2x + 100. Company B: y = 2x + 50. These are PARALLEL — same growth rate, different starting points!"
2. 🏗️ "Architecture Slope" — "Roof line: y = -0.5x + 8. Floor: y = 0. Where does the roof meet the floor?"
3. 🛰️ "Satellite Tracking" — "Two satellite paths: y = 3x - 5 and y = -⅓x + 7. They're perpendicular!"
4. 🌉 "Bridge Cable Analysis" — "Cable: y = -2x + 10. Support: y = 0.5x + 3. Find intersection."
5. 🗺️ "Map Routes" — "Route A: y = x + 2. Route B: y = -x + 8. Where do the routes cross?"

**Practice Drills:** Timed with slope calculation and equation writing

---

### 6.3 Subtopic: geom_khand (Segment / Khand)

#### BEGINNER (Class 6) — "The Measurable Stick"

**Concept Depth:**
- **Title:** "Khand: The Stick You Can Measure!"
- **Concept Heading:** "What is a Line Segment (Khand)? Two Fixed Endpoints!"
- **Explanation:** "A Segment (Khand) has exactly TWO fixed endpoints — that's what makes it MEASURABLE! Unlike a line that goes on forever, a segment STOPS at two points. We measure it with a ruler. Segment AB has length AB = distance from A to B. We write it as AB̅ (with a bar on top). Think of it as a piece of a line that you've cut!"
- **Learning Objective:** "I can identify segments, measure them, and understand the Segment Addition Postulate"
- **Challenge Level:** Guided

**Question Bank:**
1. **Recognition:** "A ruler's edge is a segment. Why?" (Has two endpoints)
2. **Measurement:** "Segment AB: A is at 0cm, B is at 7cm. Length?" (7cm)
3. **Segment Addition:** "Point C is on segment AB. AC = 3cm, CB = 5cm. AB = ?" (8cm)
4. **Notation:** "How many endpoints does AB̅ have?" (2)
5. **Real World:** "Name 5 segments you see around you." (Pencil, table edge, etc.)

**Stories:**
1. ✏️ "Pencil Segment" — "Your pencil is a segment — it has two ends (tip and eraser). Length = 15cm!"
2. 🪁 "Kite String Segment" — "Tara's kite string from hand to kite is a segment — it has a start and an end!"
3. 📏 "Ruler Measurement" — "Measure the segment from 2cm to 9cm: length = 7cm."
4. 🏏 "Cricket Pitch" — "Pitch is 22 yards = a segment with two crease endpoints!"
5. 🍕 "Pizza Slice Edge" — "The straight edge of a pizza slice is a segment!"

**Practice Drills:** Segment measurement with slider. Guided with ruler tool.

---

#### INTERMEDIATE (Class 7) — "The Segment Strategist"

**Concept Depth:**
- **Title:** "Segment Addition, Midpoints, and Coordinate Segments"
- **Concept Heading:** "Segment Addition Postulate, Midpoint Formula, and Segment Length in Coordinates"
- **Explanation:** "If point C lies between A and B on segment AB, then AC + CB = AB (Segment Addition Postulate). The MIDPOINT of segment AB is the point exactly halfway: M = ((x₁+x₂)/2, (y₁+y₂)/2). Length of segment AB = √((x₂-x₁)² + (y₂-y₁)²). If AC = 3 and AB = 10, then CB = AB - AC = 7."
- **Learning Objective:** "I can use the Segment Addition Postulate and find midpoints"

**Question Bank:**
1. **Addition:** "AB = 15cm. C is between A and B. AC = 6cm. Find CB." (9cm)
2. **Midpoint:** "Midpoint of (2,6) and (8,4)?" (5,5)
3. **Length:** "Length of segment from (1,2) to (4,6)?" (5 units)
4. **Algebraic:** "Point C divides AB such that AC = 2x and CB = x + 5. If AB = 20, find x." (5)
5. **Coordinate:** "A(3,1), B(7,5). Find midpoint M and verify AM = MB."

**Stories:**
1. 🏗️ "Bridge Support Placement" — "Bridge span AB = 30m. Support C is 12m from A. How far from B?" (18m)
2. 📐 "Road Intersection" — "Highway from (0,0) to (10,6). Where is the midpoint?" (5,3)
3. 🧵 "Fabric Cutting" — "Cloth: 2m long. Cut at 75cm from one end. Two pieces: 75cm and ?" (125cm)
4. 🏏 "Pitch Measurement" — "Bowler runs from (0,0) to (22,0). Midpoint?" (11,0)
5. 📊 "Data Analysis" — "Range of data is 50. Minimum is 15. Maximum = ?" (65)

**Practice Drills:** Moderate, with coordinate grid visualization

---

#### EXPERT (Class 8) — "The Segment Ratio Master"

**Concept Depth:**
- **Title:** "Section Formula, Internal/External Division, and Applications"
- **Concept Heading:** "Point Dividing a Segment in Given Ratio, Section Formula"
- **Explanation:** "If point P divides segment AB internally in ratio m:n, then P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)). For external division, the formula changes sign: P = ((mx₂-nx₁)/(m-n), (my₂-ny₁)/(m-n)). This is used in competitive exams and is the foundation for the Midpoint Formula (special case m:n = 1:1)."
- **Learning Objective:** "I can apply the Section Formula for internal and external division"

**Question Bank:**
1. **Internal Division:** "Point dividing (2,3) and (8,7) in ratio 3:2 internally?" (5.2, 5.4)
2. **External Division:** "Point dividing (1,2) and (4,6) externally in ratio 2:1?" (−2, −2)
3. **Ratio Finding:** "Point (4,5) divides segment from (1,1) to (7,9) in what ratio?" (1:1 = midpoint)
4. **Application:** "Station A at (0,0), Station B at (12,8). A new station at (3,2) divides AB in what ratio?" (1:3)
5. **Competitive:** "Find coordinates of point dividing the segment joining (−1,7) and (4,−3) in ratio 2:3."

**Stories:**
1. 🏗️ "Highway Rest Stop" — "Highway from Delhi (0,0) to Jaipur (120,80). A rest stop at (48,32) divides it in what ratio?"
2. 📡 "Telecom Tower Placement" — "Towers at (5,10) and (25,30). New tower at (13,18) divides the line in ratio?"
3. 🧪 "Chemical Mixing Point" — "Solution A at concentration 0, Solution B at concentration 100. Mix point at concentration 40 divides in what ratio?" (2:3)
4. 🏭 "Factory Pipeline" — "Pipeline from Plant A (0,0) to Plant B (100,60). Junction at (25,15) divides in what ratio?" (1:3)
5. 🌍 "Flight Path" — "City A (0,0), City B (600,400). Refueling stop at (200,133.3) divides in what ratio?" (1:2)

**Practice Drills:** Timed with section formula reference and ratio calculations

---

### 6.4 Subtopic: geom_kiran (Ray / Kiran)

#### BEGINNER (Class 6) — "The Beam Chaser"

**Concept Depth:**
- **Title:** "Kiran: The Ray That Shoots to Infinity!"
- **Concept Heading:** "What is a Ray (Kiran)? One Endpoint, Infinite Direction!"
- **Explanation:** "A Ray (Kiran) is half a line — it has ONE fixed starting point (origin) and stretches INFINITELY in ONE direction! Think of a flashlight: the bulb is the starting point, and the light shoots out forever. We write it as PQ⃗ (arrow pointing right) meaning it starts at P and goes through Q to infinity. One endpoint, not zero!"
- **Learning Objective:** "I can identify rays, distinguish them from lines and segments, and use proper notation"
- **Challenge Level:** Guided

**Question Bank:**
1. **Recognition:** "A flashlight beam is a ray. Why?" (One origin, goes forever in one direction)
2. **Notation:** "Ray starting at A and going through B is written as?" (AB⃗)
3. **Properties:** "How many endpoints does a ray have?" (One!)
4. **Comparison:** "What's the difference between a ray and a line?" (Ray has 1 endpoint, line has 0)
5. **Counting:** "How many rays can start from a single point?" (Infinite!)

**Stories:**
1. 🔦 "Torch Beam" — "Switch on a torch: light starts at the bulb and shoots forward forever — that's a Kiran!"
2. ☀️ "Sunbeam" — "Sunlight comes from the sun (one point) and travels to Earth and beyond — a Ray!"
3. 🏏 "Cricket Bowl" — "The ball travels from the bowler's hand forward — like a Ray starting at the hand!"
4. 🚗 "Car Headlight" — "Headlight beam starts at the lamp and shoots forward — Kiran!"
5. ⭐ "Star Light" — "Light from a star starts at the star and travels to us — a cosmic Ray!"

**Practice Drills:** Line Touch — extend rays from origin points. Guided with origin markers.

---

#### INTERMEDIATE (Class 7) — "The Angle Builder"

**Concept Depth:**
- **Title:** "Rays Form Angles — The Angle Connection!"
- **Concept Heading:** "How Rays Create Angles, Angle Types, and Angle Measurement"
- **Explanation:** "When TWO rays share a common endpoint, they form an ANGLE! The shared endpoint is the VERTEX, and the two rays are the ARMS of the angle. Angle types: Acute (< 90°), Right (= 90°), Obtuse (> 90° but < 180°), Straight (= 180°), Reflex (> 180°). We measure angles in DEGREES using a protractor."
- **Learning Objective:** "I can identify angles formed by rays, classify angle types, and measure with a protractor"

**Question Bank:**
1. **Angle Formation:** "Two rays OA and OB form an angle. The vertex is?" (O)
2. **Classification:** "An angle of 135° is?" (Obtuse)
3. **Measurement:** "Using a protractor, measure angle AOB where OA goes right and OB goes up-right at 45°."
4. **Complementary:** "Two angles are complementary if their sum = ?" (90°)
5. **Real World:** "Clock hands at 3:00 form what type of angle?" (Right angle, 90°)

**Stories:**
1. 🕐 "Clock Hands" — "At 3:00, hour hand points right, minute hand points up. They form a 90° angle — a Right angle!"
2. 📐 "Set Square Angles" — "A set square has angles: 90°, 60°, 30°. Each is formed by two rays!"
3. 🏏 "Cricket Bat Swing" — "The bat and the ground form an angle. Different shots = different angles!"
4. 🪁 "Kite Frame" — "The two bamboo sticks of a kite form angles where they cross!"
5. 🌉 "Bridge Arch" — "The bridge arch and the road form an obtuse angle!"

**Practice Drills:** Moderate, with protractor tool on screen

---

#### EXPERT (Class 8) — "The Angle Algebra Master"

**Concept Depth:**
- **Title:** "Angle Algebra: Transversals, Parallel Lines, and Proof"
- **Concept Heading:** "Properties of Angles in Parallel Lines Cut by Transversal, Angle Algebra"
- **Explanation:** "When a transversal cuts two parallel lines: (1) Corresponding angles are EQUAL, (2) Alternate interior angles are EQUAL, (3) Co-interior angles sum to 180°. If two lines are cut by a transversal and corresponding angles are EQUAL, the lines are PARALLEL (converse). These properties are used in PROOF-BASED questions in Class 8."
- **Learning Objective:** "I can prove parallel lines using angle properties and solve complex angle problems"

**Question Bank:**
1. **Parallel Proof:** "If corresponding angles are 65° each, are the lines parallel?" (Yes)
2. **Angle Algebra:** "Two parallel lines cut by transversal. One angle = 3x + 10. Its alternate interior angle = 5x - 20. Find x." (15)
3. **Co-interior:** "Co-interior angles: 2x and 3x. Find x and each angle." (x=36, angles 72° and 108°)
4. **Multi-step:** "Lines l₁ ∥ l₂. Transversal t makes angle 70° with l₁. Find all 8 angles formed."
5. **Competitive:** "In triangle ABC, exterior angle at C = interior A + interior B. Prove it using parallel line properties."

**Stories:**
1. 🏗️ "Architecture Blueprint Proof" — "Prove that the two support beams are parallel by showing their corresponding angles with the transversal are equal."
2. 🚂 "Metro Track Alignment" — "Engineer shows corresponding angles are equal → tracks are parallel → safe for trains!"
3. 📐 "Triangle Angle Sum Proof" — "Using parallel lines through a vertex, prove that angles of a triangle sum to 180°."
4. 🏏 "Pitch Design" — "The bowling crease and the popping crease are parallel. Prove using angle properties!"
5. 🌉 "Bridge Cable Geometry" — "Two cables cut by a support beam. Co-interior angles: 2x+5 and 3x-10. Find x."

**Practice Drills:** Timed with proof-writing component

---

### 6.5 Subtopic: geom_shikhar (Vertex / Shikhar)

#### BEGINNER (Class 6) — "The Corner Spotter"

**Concept Depth:**
- **Title:** "Shikhar: Where Lines Meet — The Corner!"
- **Concept Heading:** "What is a Vertex (Shikhar)? The Meeting Point!"
- **Explanation:** "A Vertex (Shikhar) is the CORNER POINT where two or more lines, segments, or rays meet! A triangle has 3 vertices (one at each corner). A rectangle has 4. A cube has 8! The plural is 'vertices.' In a simple angle, the vertex is the point where the two arms meet."
- **Learning Objective:** "I can identify vertices in shapes and understand their role in forming angles"
- **Challenge Level:** Guided

**Question Bank:**
1. **Counting:** "How many vertices does a triangle have?" (3)
2. **Identification:** "Where is the vertex in angle ABC?" (At point B)
3. **Shape Count:** "How many vertices in a square?" (4)
4. **Real World:** "Name 3 vertices you see around you." (Table corner, door frame, etc.)
5. **True/False:** "A circle has infinite vertices." (False — circles have no vertices!)

**Stories:**
1. 🍛 "Samosa Corners" — "A samosa is a triangle — it has 3 vertex corners! Maths Dost counts them!"
2. 📺 "TV Screen Corners" — "Your TV screen is a rectangle — 4 corners = 4 vertices!"
3. 🏏 "Cricket Stumps" — "Three stumps meeting the ground = 3 vertices on the ground line!"
4. 🪁 "Kite Corners" — "A kite has 4 corners where the frame meets the paper — 4 vertices!"
5. 🎪 "Tent Peak" — "The top of a cone tent is the apex vertex — where all the fabric meets!"

**Practice Drills:** Point Hunt — click on vertices of shapes. Guided with vertex counters.

---

#### INTERMEDIATE (Class 7) — "The Polygon Counter"

**Concept Depth:**
- **Title:** "Vertices in Polygons and 3D Shapes"
- **Concept Heading:** "Counting Vertices in Triangles, Quadrilaterals, Pentagons, and 3D Shapes"
- **Explanation:** "A polygon with n sides has n vertices! Triangle (3 sides) → 3 vertices. Pentagon (5 sides) → 5 vertices. For 3D shapes: Cube has 8 vertices, Cuboid has 8, Pyramid has 5 (4 base + 1 apex), Prism with n-gon base has 2n vertices. Euler's formula connects vertices (V), edges (E), and faces (F): V - E + F = 2."
- **Learning Objective:** "I can count vertices in 2D and 3D shapes and apply Euler's formula"

**Question Bank:**
1. **Polygon:** "A hexagon has how many vertices?" (6)
2. **3D:** "How many vertices does a cube have?" (8)
3. **Euler's Formula:** "A shape has 6 faces and 12 edges. How many vertices?" (V = 2 + E - F = 8)
4. **Application:** "A triangular prism has how many vertices?" (6 = 2 × 3)
5. **Problem:** "A solid has 8 vertices, 12 edges. How many faces?" (6)

**Stories:**
1. 🏗️ "Building Design" — "A cuboid building has 8 vertices (corners), 12 edges, 6 faces. Verify Euler's formula!"
2. 🎪 "Tent Geometry" — "A pyramid tent has 5 vertices. How many edges and faces?"
3. 🧊 "Ice Cube Puzzle" — "An ice cube has 8 vertices. If you cut one corner, how many vertices now?" (10)
4. 🏏 "Cricket Ball Seam" — "A cricket ball has no vertices (it's a sphere). But a football (soccer ball) has 12 vertices!"
5. 📦 "Gift Box" — "A gift box with a square base has 8 vertices. A hexagonal box has 12."

**Practice Drills:** Moderate, with vertex counter for 3D shapes

---

#### EXPERT (Class 8) — "The Vertex Coordinates Master"

**Concept Depth:**
- **Title:** "Vertex in Coordinate Geometry and Polygons"
- **Concept Heading:** "Finding Vertices of Polygons, Midpoint Properties, and Coordinate Proofs"
- **Explanation:** "In coordinate geometry, vertices are POINTS with (x,y) coordinates. A triangle with vertices A(x₁,y₁), B(x₂,y₂), C(x₃,y₃) has: (1) Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|, (2) Centroid = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3). For competitive exams: find missing vertex coordinates given area, or prove points form a specific shape."
- **Learning Objective:** "I can work with vertex coordinates to calculate area, centroid, and prove geometric properties"

**Question Bank:**
1. **Area from Vertices:** "Triangle vertices: (0,0), (4,0), (0,3). Find area." (6 sq units)
2. **Centroid:** "Find centroid of triangle with vertices (1,2), (4,6), (7,2)." (4, 10/3)
3. **Missing Vertex:** "Triangle area = 10. Two vertices: (0,0) and (5,0). Find third vertex." (Many answers, e.g., (0,4))
4. **Quadrilateral:** "Prove that quadrilateral with vertices (0,0), (4,0), (4,3), (0,3) is a rectangle."
5. **Competitive:** "Points A(1,1), B(4,4), C(7,7). Are they vertices of a triangle?" (No, they're collinear)

**Stories:**
1. 🏗️ "Architecture Plan" — "Building footprint vertices: A(0,0), B(20,0), C(20,15), D(0,15). Find area and verify it's a rectangle."
2. 📡 "Satellite Positioning" — "Three satellites at vertices of a triangle. Find the centroid — that's the optimal relay point!"
3. 🧪 "Lab Coordinate Grid" — "Experiment stations at (2,3), (6,1), (4,7). Calculate the area of the triangular lab."
4. 🏭 "Factory Floor Plan" — "Factory vertices: (0,0), (50,0), (50,30), (0,30). Area = 1500 sq units. Enough for 200 machines?"
5. 🎯 "Target Practice" — "Three targets form a triangle with area 24 sq units. Vertices: (1,1), (7,1), (x,y). Find x,y."

**Practice Drills:** Timed with coordinate calculations and proof components

---

## 7. Implementation Roadmap

### Phase 1: Type System & Data Structure (Day 1)

1. Add new types in `src/types.ts`:
   - `LevelledConcept`, `LevelledStorySlide`, `LevelledQuizQuestion`, `LevelledDrill`
   - Add `difficulty` field to existing interfaces where needed

2. Create new data file `src/levelled-data.ts` with:
   - `getLevelledConceptScreens(topicId, subId, difficulty)` — replaces current `getProceduralScreens`
   - Different `title`, `conceptHeading`, `explanation` per difficulty level
   - Different `interactiveType` and `pangaHint` per difficulty level

### Phase 2: Content Population (Days 2-3)

3. Populate concept screens for ALL 3 levels × ALL subtopics:
   - **Geometry:** bindu, rekha, khand, kiran, shikhar (5 subtopics × 3 levels = 15 variants)
   - **Max/Min:** max, min, range (3 subtopics × 3 levels = 9 variants)
   - **Comparing:** basics, decimals, rounding, place, order (5 subtopics × 3 levels = 15 variants)
   - **Total:** 39 unique content variants

4. Update `src/variants.ts`:
   - Add `difficulty` parameter to `getStoryQuestVariants()`
   - Create DIFFERENT story scenarios per difficulty (simple → complex → professional)
   - Update `getConceptQuizVariants()` with ACTUALLY different questions per difficulty
   - Update `getPracticeDrillVariants()` with different drill modes (guided → independent → timed)

### Phase 3: Component Updates (Days 4-5)

5. Update `src/components/LearnView.tsx`:
   - Pass `difficulty` to all data-fetching functions
   - Add difficulty-specific UI elements:
     - Beginner: hints always visible, encouraging mascot messages
     - Intermediate: hint button, moderate pacing
     - Expert: timer, competition-style layout, streak bonuses

6. Update `src/components/HomeView.tsx`:
   - Show difficulty-appropriate progress milestones
   - Different rank names per level:
     - Beginner: "Chai Stall Learner" → "Street Scholar" → "Bazaar Boss"
     - Intermediate: "Road Navigator" → "City Explorer" → "Metro Master"
     - Expert: "Competition Contender" → "Olympiad Warrior" → "Math Champion"

### Phase 4: Testing & Polish (Day 6)

7. Test all 39 content variants for accuracy
8. Verify CBSE curriculum alignment
9. Test difficulty switching (user changing level mid-session)
10. Performance check (data loading for 3x content)

---

## 8. Data Structure Templates

### Example: Levelled Concept Screen for geom_bindu

```typescript
// BEGINNER version
{
  id: "geom_bindu_B1",
  title: "💡 Bindu: The Tiny Dot!",
  topicId: "geom",
  subtopicId: "geom_bindu",
  conceptHeading: "What is a Point (Bindu)?",
  explanation: "Doston, Bindu ek chhota sa dot hai — iska na length hai, na width, na height! Yeh ZERO-dimensional hai. Uppercase letters A, B, C se represent karte hain. Jaise pencil ka tip — bas position dikhata hai!",
  interactiveType: "point_hunt",
  pangaHint: "Screen pe click karke Point dhoondho!",
  difficulty: "beginner",
  learningObjective: "I can identify points in real life",
  challengeLevel: "guided"
}

// INTERMEDIATE version
{
  id: "geom_bindu_I1",
  title: "💡 Bindu on the Coordinate Plane",
  topicId: "geom",
  subtopicId: "geom_bindu",
  conceptHeading: "Points with Coordinates (x, y)",
  explanation: "A point on a coordinate plane is defined by its (x, y) coordinates. Point (3, -2) means 3 units right, 2 units down from origin. We can find the DISTANCE between two points using: d = |x₂-x₁|. Points in all four quadrants can have positive or negative coordinates.",
  interactiveType: "point_hunt",
  pangaHint: "Plot the point with negative coordinates!",
  difficulty: "intermediate",
  learningObjective: "I can plot and locate points on coordinate planes",
  challengeLevel: "moderate"
}

// EXPERT version
{
  id: "geom_bindu_E1",
  title: "💡 Euclid's First Postulate & Point Properties",
  topicId: "geom",
  subtopicId: "geom_bindu",
  conceptHeading: "Euclidean Axioms Involving Points",
  explanation: "Euclid's Postulate 1: 'A straight line can be drawn joining any two points.' Key theorem: Through exactly ONE line passes through any two distinct points, but through ONE point, INFINITELY many lines pass. The distance formula d = √((x₂-x₁)² + (y₂-y₁)²) gives the precise distance between points.",
  interactiveType: "point_hunt",
  pangaHint: "Use the distance formula to verify!",
  difficulty: "expert",
  learningObjective: "I can apply Euclid's axioms and the distance formula",
  challengeLevel: "timed"
}
```

### Example: Levelled Quiz Question for compare_basics

```typescript
// BEGINNER - Recognition
{
  id: "compare_basics_B_q1",
  question: "Which number is bigger: 5,234 or 4,891?",
  options: ["5,234", "4,891", "They are equal", "Cannot tell"],
  correct: 0,
  hint: "Look at the thousands digit: 5 > 4, so 5,234 is bigger!",
  difficulty: "beginner",
  questionType: "recognition"
}

// INTERMEDIATE - Multi-step
{
  id: "compare_basics_I_q1",
  question: "Riya has ₹-150 and Kavya has ₹-80. Who has MORE money? Explain using the number line.",
  options: ["Riya (-150 is closer to zero)", "Kavya (-80 is closer to zero)", "They have equal money", "Neither has money"],
  correct: 1,
  hint: "On the number line, numbers closer to zero are LARGER. Which is closer to zero?",
  difficulty: "intermediate",
  questionType: "multi_step"
}

// EXPERT - Competitive
{
  id: "compare_basics_E_q1",
  question: "If a < b < c and a + b + c = 0, which of the following MUST be true?",
  options: ["a < 0 and c > 0", "All are negative", "b = 0", "a > 0 and c < 0"],
  correct: 0,
  hint: "If three numbers sum to zero and are ordered a < b < c, then a must be negative and c must be positive.",
  difficulty: "expert",
  questionType: "competitive",
  timeLimit: 60
}
```

### Example: Levelled Story for maxmin_max

```typescript
// BEGINNER - Simple Daily Life
{
  title: "Tara's Marble Champion!",
  narration: "Tara counts her marbles in 4 boxes: 23, 45, 18, 37. Maths Dost asks: 'Which box has the MOST marbles? That's the champion box!'",
  difficulty: "beginner",
  scenarioType: "daily_life",
  choices: [
    { text: "45 marbles — the biggest box!", correct: true, rewardXp: 10 },
    { text: "23 marbles", correct: false, rewardXp: 0 },
    { text: "18 marbles", correct: false, rewardXp: 0 }
  ]
}

// INTERMEDIATE - Complex Scenario
{
  title: "IPL Season Score Analysis!",
  narration: "Rohit's scores this IPL season: 110, 85, 125, -5 (got out early!), 95, 140. Coach says: 'We need the MAXIMUM score to decide if you deserve the Orange Cap!' Remember: negative scores mean he got out for fewer runs than the team needed!",
  difficulty: "intermediate",
  scenarioType: "complex_scenario",
  choices: [
    { text: "140 runs — Rohit's best innings!", correct: true, rewardXp: 15 },
    { text: "125 runs", correct: false, rewardXp: 0 },
    { text: "-5 runs (the minimum!)", correct: false, rewardXp: 0 }
  ]
}

// EXPERT - Professional Application
{
  title: "Business Quarterly Revenue Optimization!",
  narration: "TechStartup's quarterly revenues: ₹-50 lakhs (Q1 loss), ₹120 lakhs (Q2 profit), ₹80 lakhs (Q3), ₹-20 lakhs (Q4 loss), ₹150 lakhs (Q1 next year). The CFO needs: (1) Maximum revenue quarter, (2) Range of revenue, (3) Average excluding losses. Start with: What is the maximum?",
  difficulty: "expert",
  scenarioType: "professional",
  choices: [
    { text: "₹150 lakhs — the peak revenue quarter!", correct: true, rewardXp: 20 },
    { text: "₹120 lakhs", correct: false, rewardXp: 0 },
    { text: "₹80 lakhs (the average of profits)", correct: false, rewardXp: 0 }
  ]
}
```

---

## Summary

| Component | Beginner (Class 6) | Intermediate (Class 7) | Expert (Class 8) |
|---|---|---|---|
| **Concepts** | Simple, concrete, guided | Abstract, analytical, moderate | Proof-based, applied, competitive |
| **Questions** | Recognition, True/False | Multi-step, negative numbers | Word problems, data analysis |
| **Stories** | Daily life (shopping, counting) | Complex (budgets, temperature) | Professional (business, science) |
| **Drills** | Guided with hints always on | Hints optional, moderate pace | Timed, no hints, competition |
| **XP** | 5 XP (encouragement focus) | 10 XP (challenge focus) | 15-25 XP (speed bonus) |
| **UI** | Friendly mascot, step-by-step | Number line tools, moderate | Timer, leaderboard, streaks |
| **CBSE** | Basic number sense, intro geo | Integers, decimals, line types | Rational numbers, proofs, coords |

**Total Unique Content:** 39 concept variants × 5+ screens each = ~200 unique concept screens, plus levelled stories, quizzes, and drills across all topics.
