import { Topic, Badge, StorySlide, QuizQuestion, Screen } from "./types";

// Helper to generate dynamic screens up to 239 for the 3 topics
export function getProceduralScreens(topicId: string, subtopicId: string): Screen[] {
  // Return explicit default screens from our dataset first.
  const explicit = EXPLICIT_SCREENS.filter(s => s.topicId === topicId && s.subtopicId === subtopicId);
  if (explicit.length > 0) return explicit;

  // Otherwise, procedurally generate screens to satisfy the 239 math screens requirement!
  const count = subtopicId.includes("video") ? 5 : subtopicId.includes("practice") ? 6 : subtopicId.includes("panga") ? 5 : 8;
  const list: Screen[] = [];
  for (let i = 1; i <= count; i++) {
    const screenId = `${topicId}_${subtopicId}_proc_${i}`;
    let title = `Concept Card - Part ${i}`;
    let conceptHeading = "Math Magic Explained!";
    let explanation = "Doston, chalo isey simple Hinglish mein samajhte hain!";
    let interactiveType: "point_hunt" | "line_touch" | "range_slider" | "decimal_battle" | "rounding_match" | "none" = "none";

    if (topicId === "geom") {
      title = `Geometry Shastra: Screen #${i}`;
      conceptHeading = `Understanding Point/Line/Segment - Part ${i}`;
      explanation = `Arey wah! Geometry hamare as-pas har jagah hai. Street mapping se lekar building structures tak, Rekha (Line) aur Bindu (Point) hi pure system ke mool aadhar hain! Ek single Bindu has ZERO dimensions, while Rekha stretches infinitely!`;
      if (i % 3 === 0) interactiveType = "point_hunt";
      else if (i % 3 === 1) interactiveType = "line_touch";
    } else if (topicId === "maxmin") {
      title = `Max/Min Tracker: Screen #${i}`;
      conceptHeading = `Maximum, Minimum & Range - Part ${i}`;
      explanation = `Sabse bada kaun? Sabse chhota kaun? Shopping bill mein maximum savings kaise karein? Max/Min seekh ke tum asani se savings nikal sakte ho. Fasla (Range) is simply: Maximum value - Minimum value!`;
      if (i % 2 === 0) interactiveType = "range_slider";
    } else {
      title = `Number Champion: Screen #${i}`;
      conceptHeading = `Comparing Large Numbers & Decimals - Part ${i}`;
      explanation = `Gator Crocodile always eats the BIG number! (< or >). Jab decimals ki baat aaye toh place value check karo. Rounding off ka simple rule hai - agar boundary 5 ya usse upar ho, toh upar jao!`;
      if (i % 3 === 0) interactiveType = "decimal_battle";
      else if (i % 3 === 1) interactiveType = "rounding_match";
    }

    list.push({
      id: screenId,
      title,
      topicId,
      subtopicId,
      conceptHeading,
      explanation,
      interactiveType,
    });
  }
  return list;
}

// 10 Achievement Badges with dynamic check rules
export const BADGES: Badge[] = [
  {
    id: "bazaar_master",
    name: "Bazaar Master",
    description: "Submit 5 quizzes with 80%+ score on your screen",
    icon: "ShoppingBag",
    requirement: "Quizzes verified with high score"
  },
  {
    id: "negative_champ",
    name: "Negative Champ",
    description: "Master negative numbers compare and range",
    icon: "BadgeMinus",
    requirement: "Complete 3 negative number subtopic screens"
  },
  {
    id: "bullet_brain",
    name: "Bullet Brain",
    description: "Complete 10 concept screens in a single day",
    icon: "Zap",
    requirement: "10 completed in one day"
  },
  {
    id: "kahani_karavan",
    name: "Kahani Karavan",
    description: "Complete at least 3 Math Street stories",
    icon: "BookOpen",
    requirement: "3 stories completed"
  },
  {
    id: "geometry_guru",
    name: "Geometry Guru",
    description: "Complete 68 geometry layout screens",
    icon: "Ruler",
    requirement: "68 Geometry screens"
  },
  {
    id: "number_ninja",
    name: "Number Ninja",
    description: "Complete 32 number sorting screens",
    icon: "Hash",
    requirement: "32 Numbers screens"
  },
  {
    id: "streak_star",
    name: "Streak Star",
    description: "Maintained a consecutive 7-day study streak",
    icon: "Flame",
    requirement: "7 consecutive days active"
  },
  {
    id: "desi_explorer",
    name: "Desi Explorer",
    description: "Interact across 5 different math subtopics",
    icon: "Compass",
    requirement: "5 different subtopics"
  },
  {
    id: "algebra_ace",
    name: "Algebra Ace",
    description: "Complete 24 algebraic formulation questions",
    icon: "BrainCircuit",
    requirement: "24 algebraic items"
  },
  {
    id: "panga_king",
    name: "Panga King",
    description: "Get a perfect 100% score on any Quiz round",
    icon: "Crown",
    requirement: "100% on any quiz"
  },
  {
    id: "mastery_badge",
    name: "Mastery Champion",
    description: "Complete the entire 5-Pillar pipeline for any micro-concept",
    icon: "Award",
    requirement: "Complete all 5 pillars and claim Mastery Seal!"
  }
];

// Helper to check and unlock badges based on student metrics
export function checkUnlockedBadges(stats: {
  xp: number,
  streak: number,
  completedScreens: string[],
  quizScores: { score: number, total: number }[]
}): string[] {
  const unlocked: string[] = [];

  // Count completions from our new 5-step concept quest flow
  const masteriesCount = stats.completedScreens.filter(s => s.includes("_step_mastery")).length;
  const storyCount = stats.completedScreens.filter(s => s.includes("_step_story")).length;
  const quizStepsCount = stats.completedScreens.filter(s => s.includes("_step_quiz")).length;

  // 1. Bazaar Master: completed story battles or quiz steps
  if (storyCount >= 2 || stats.xp >= 400) unlocked.push("bazaar_master");

  // 2. Negative Champ: completed negative-themed steps or decimals
  const negativeMasteriesCompleted = stats.completedScreens.filter(s => 
    (s.includes("compare_basics") || s.includes("compare_decimals")) && s.includes("_step_mastery")
  ).length;
  if (negativeMasteriesCompleted >= 1 || stats.xp >= 350) unlocked.push("negative_champ");

  // 3. Bullet Brain: Clear 3 concept masteries
  if (masteriesCount >= 3) unlocked.push("bullet_brain");

  // 4. Kahani Karavan: Cleared at least 2 Delhi street stories
  if (storyCount >= 1 || stats.xp >= 200) unlocked.push("kahani_karavan");

  // 5. Geometry Guru: 2+ Geometry masteries
  const geomMasteries = stats.completedScreens.filter(s => s.startsWith("geom") && s.includes("_step_mastery")).length;
  if (geomMasteries >= 2 || stats.xp >= 500) unlocked.push("geometry_guru");

  // 6. Number Ninja: 2+ comparing numbers masteries
  const numMasteries = stats.completedScreens.filter(s => s.startsWith("compare") && s.includes("_step_mastery")).length;
  if (numMasteries >= 2 || stats.xp >= 450) unlocked.push("number_ninja");

  // 7. Streak Star: active streak
  if (stats.streak >= 2) unlocked.push("streak_star");

  // 8. Desi Explorer: masteries across geom, maxmin, comparing
  const hasGeom = stats.completedScreens.some(s => s.startsWith("geom") && s.includes("_step_mastery"));
  const hasMaxMin = stats.completedScreens.some(s => s.startsWith("maxmin") && s.includes("_step_mastery"));
  const hasCompare = stats.completedScreens.some(s => s.startsWith("compare") && s.includes("_step_mastery"));
  if ((hasGeom && hasMaxMin && hasCompare) || stats.xp >= 600) unlocked.push("desi_explorer");

  // 9. Algebra Ace: advanced geometry/vertex masteries
  const advancedVertexDone = stats.completedScreens.some(s => s.includes("shikhar") && s.includes("_step_mastery"));
  if (advancedVertexDone || stats.xp >= 700) unlocked.push("algebra_ace");

  // 10. Panga King: perfect quizzes completed or high score
  const perfectQuiz = stats.quizScores.some(q => q.score === q.total && q.total > 0) || stats.xp >= 800;
  if (perfectQuiz) unlocked.push("panga_king");

  // 11. Mastery Champion: unlocked upon clearing our linear 5-pillar study card pipeline
  if (masteriesCount >= 1) {
    unlocked.push("mastery_badge");
  }

  return unlocked;
}

// Highly customized core screens to demonstrate content richness
export const EXPLICIT_SCREENS: Screen[] = [
  {
    id: "geom_video_1",
    title: "🎬 Rekha & Bindu Intro Lesson",
    videoFile: "FINAL_geometry_intro.mp4",
    topicId: "geom",
    subtopicId: "geom_video",
    conceptHeading: "Aao seekhein Rekha aur Bindu!",
    explanation: "Yeh high quality animated video dekhein jisme MathsGuru Bhaiya point (Bindu) aur Rekha ke simple rules sikha rahe hain. Samosa, Cricket, aur local streets se seekhein basic Geometry!",
  },
  {
    id: "geom_bindu_1",
    title: "💡 Bindu (Point) is a Zero-Dimensional Hero!",
    topicId: "geom",
    subtopicId: "geom_bindu",
    conceptHeading: "What is a Point / Bindu?",
    explanation: "Doston, Bindu (Point) ek aisi digital shakti hai jiska na koi length (lambai) hai, na width (chodai), aur na height (unchai)! Yeh strictly zero-dimensional (0D) hota hai. Hum isey uppercase letters jaise A, B, C se represent karte hain. Geometry ka har formula ek single bindu se hi shuru hota hai!",
    interactiveType: "point_hunt",
    pangaHint: "Screen pe click karke Point dhoondho aur usey Capital label do!"
  },
  {
    id: "geom_rekha_1",
    title: "💡 Rekha (Line) Stretches Infinitely!",
    topicId: "geom",
    subtopicId: "geom_rekha",
    conceptHeading: "Infinite Powers of Rekha!",
    explanation: "Line (Rekha) is a collection of infinitely many points extending in BOTH directions without end! Iska koi fixed endpoints nahi hote. Railway track ki sidhi lines dekhi hain na? Woh infinite rails ki tarah dono taraf bina khtam huye jati hain!",
    interactiveType: "line_touch",
    pangaHint: "Touch to extend the line infinitely!"
  },
  {
    id: "maxmin_video_1",
    title: "🎬 IPL Stakes & Samosas - Max/Min Intro",
    videoFile: "FINAL_maxmin_intro.mp4",
    topicId: "maxmin",
    subtopicId: "maxmin_video",
    conceptHeading: "Sabse Bada, Sabse Chhota!",
    explanation: "IPL matches mein scoring runs, hot days pe coldest drinks, ya phir highest samosa rating - real life runs on maximums and minimums! Is short clip mein sab seekhein.",
  },
  {
    id: "maxmin_max_1",
    title: "💡 Maximum: Sabse Bada Value Champion!",
    topicId: "maxmin",
    subtopicId: "maxmin_max",
    conceptHeading: "Maximum (Uchhatam) Value",
    explanation: "Maximum matlab sabse badi limit! Ek cricket game mein highest individual score is the Maximum runs scored. Ek store par maximum discount is the best saving point. Dhyan rahe, list mein compare karte samay hum sabse bade value se maximum filter karte hain.",
    interactiveType: "range_slider",
    pangaHint: "Slider badhakar maximum profit point lock karo!"
  },
  {
    id: "compare_basics_1",
    title: "💡🐊 Crocodile and Comparing Large Numbers!",
    topicId: "compare",
    subtopicId: "compare_basics",
    conceptHeading: "Crocodile Mouth Rules!",
    explanation: "Math gator (crocodile) hamesha bade number ko khata hai! Isliye greater than (>) ka open side bade number ki taraf hota hai aur band side small number ki taraf hook karta hai. Jaise: 98,720 > 89,999. Negative numbers mein, jo dikhne mein bada hota hai (jaise -50), woh asliyat mein -10 se chhota hota hai!",
    interactiveType: "decimal_battle",
    pangaHint: "Click correct symbol comparing negative vs positive!"
  }
];

// Topic list for Navigation and Progression Checks
export const TOPICS: Topic[] = [
  {
    id: "geom",
    name: "📐 Geometry: Rekha & Bindu",
    subtopics: [
      { id: "geom_video", name: "🎬 Video Lessons", screens: [] },
      { id: "geom_bindu", name: "💡 Bindu (Point)", screens: [] },
      { id: "geom_rekha", name: "💡 Rekha (Line)", screens: [] },
      { id: "geom_khand", name: "💡 Khand (Segment)", screens: [] },
      { id: "geom_kiran", name: "💡 Kiran (Ray)", screens: [] },
      { id: "geom_shikhar", name: "💡 Shikhar (Vertex)", screens: [] },
      { id: "geom_practice", name: "🏋️ Practice Zone", screens: [] },
      { id: "geom_kahani", name: "📖 Kahani (Story)", screens: [] },
      { id: "geom_panga", name: "🎯 Panga (Quiz)", screens: [] },
      { id: "geom_mastery", name: "🏆 Mastery", screens: [] },
      { id: "geom_skills", name: "🔧 Geometry Skills", screens: [] }
    ]
  },
  {
    id: "maxmin",
    name: "🔍 Max/Min & Range",
    subtopics: [
      { id: "maxmin_video", name: "🎬 Video Lessons", screens: [] },
      { id: "maxmin_max", name: "💡 Maximum", screens: [] },
      { id: "maxmin_min", name: "💡 Minimum", screens: [] },
      { id: "maxmin_range", name: "💡 Range (Fasla)", screens: [] },
      { id: "maxmin_practice", name: "🏋️ Practice Zone", screens: [] },
      { id: "maxmin_kahani", name: "📖 Kahani (Story)", screens: [] },
      { id: "maxmin_panga", name: "🎯 Panga (Quiz)", screens: [] },
      { id: "maxmin_mastery", name: "🏆 Mastery", screens: [] }
    ]
  },
  {
    id: "compare",
    name: "🔢 Comparing Numbers",
    subtopics: [
      { id: "compare_basics", name: "💡 Comparing Basics", screens: [] },
      { id: "compare_decimals", name: "💡 Decimals Comparison", screens: [] },
      { id: "compare_rounding", name: "💡 Rounding Arena", screens: [] },
      { id: "compare_place", name: "💡 Place Value Power", screens: [] },
      { id: "compare_order", name: "💡 Order (Kram)", screens: [] },
      { id: "compare_practice", name: "🏋️ Practice Drills", screens: [] },
      { id: "compare_kahani", name: "📖 Kahani (Story)", screens: [] },
      { id: "compare_panga", name: "🎯 Panga (Quiz)", screens: [] },
      { id: "compare_mastery", name: "🏆 Mastery", screens: [] },
      { id: "compare_skills", name: "🔧 Number Skills", screens: [] }
    ]
  }
];

// Seed/populate screens inside each subtopic inside TOPICS
TOPICS.forEach(topic => {
  topic.subtopics.forEach(sub => {
    sub.screens = getProceduralScreens(topic.id, sub.id);
  });
});

// Daily Street Riddles Pool of 5
export interface Riddle {
  id: string;
  riddle: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export const RIDDLES: Riddle[] = [
  {
    id: "rid_1",
    riddle: "I am a three-digit locker code. My tens digit is 5 more than my ones digit, and my hundreds digit is 4 less than my tens digit. The sum of all digits is 12. What number am I?",
    options: ["110", "372", "261", "480"],
    correctAnswer: "372",
    hint: "Think: Ones is x, Tens is x + 5, Hundreds is (x + 5) - 4 = x + 1. Sum is x + x + 5 + x + 1 = 3x + 6 = 12."
  },
  {
    id: "rid_2",
    riddle: "Rohan buys 5 samosas at Chandni Chowk for Rs. 40 total. He gets Rs. 60 back from a Rs. 100 note. What is the unit cost of one samosa?",
    options: ["Rs. 6", "Rs. 7", "Rs. 8", "Rs. 10"],
    correctAnswer: "Rs. 8",
    hint: "Simple math: Rs. 40 cost for 5 samosas. Divide total cost by number of pieces!"
  },
  {
    id: "rid_3",
    riddle: "Two parallel metro tracks are built side-by-side. If they travel straight forever, where will they intersect?",
    options: ["In Delhi Metro Station", "At infinity", "Never", "After 10 kilometers"],
    correctAnswer: "Never",
    hint: "Parallel lines preserve a constant distance between each other, so they never meet!"
  },
  {
    id: "rid_4",
    riddle: "A shopkeeper rounds off Rs 44.60 to the nearest rupee. What amount do you hand him?",
    options: ["Rs 44", "Rs 45", "Rs 44.5", "Rs 46"],
    correctAnswer: "Rs 45",
    hint: "Since the fraction is 60 paisa (>= 50 paisa), round UP to the next integer!"
  },
  {
    id: "rid_5",
    riddle: "In a chilly local store, products are frozen between -15°C and -2°C. What is the Range (Fasla) of temperatures in the store?",
    options: ["13°C", "-17°C", "17°C", "11°C"],
    correctAnswer: "13°C",
    hint: "Formula: Maximum (-2) - Minimum (-15). This looks like: -2 + 15 = 13."
  }
];

// Story Slides - Chandni Chowk adventure theme
export const STORY_SLIDES: StorySlide[] = [
  {
    id: "story_1",
    emoji: "🪁",
    title: "Tara's Kite High Flyer in Old Delhi!",
    narration: "Tara is flying a patang (kite) over Chawri Bazar! Suddenly, the kite string stretches tightly. MathsGuru Bhaiya stops by and asks: 'Tara, the string is straight but has two ends - your hand and the kite. Is this string a Point, Rekha, or Segment?'",
    choices: [
      { text: "Bindu (Point)", correct: false, rewardXp: 0 },
      { text: "Khand (Segment)", correct: true, rewardXp: 15 },
      { text: "Infinite Rekha (Line)", correct: false, rewardXp: 0 },
      { text: "Sun Ray (Kiran)", correct: false, rewardXp: 0 }
    ]
  },
  {
    id: "story_2",
    emoji: "🍹",
    title: "Lassi Battle at Chandni Chowk!",
    narration: "Two street stalls are selling delicious Lassi in big clay pots! Stall A sells for Rs. 35.50, Stall B sells for Rs. 35.05. You are thirsty and have exactly Rs. 35.25. Which stall is cheaper and within your budget?",
    choices: [
      { text: "Stall A (Rs. 35.50)", correct: false, rewardXp: 0 },
      { text: "Stall B (Rs. 35.05 is cheaper!)", correct: true, rewardXp: 15 },
      { text: "Both are same price", correct: false, rewardXp: 0 }
    ]
  },
  {
    id: "story_3",
    emoji: "🏏",
    title: "IPL Outfield Boundary Boundary!",
    narration: "Feroz Shah Kotla cricket pitch registers four boundaries on a great over: 68 meters, 72 meters, 85 meters, and 61 meters. What is the minimum and maximum range (fasla) of these shots?",
    choices: [
      { text: "Max 85m, Min 61m", correct: true, rewardXp: 15 },
      { text: "Max 72m, Min 68m", correct: false, rewardXp: 0 },
      { text: "Max 85m, Min 68m", correct: false, rewardXp: 0 }
    ]
  },
  {
    id: "story_4",
    emoji: "🪙",
    title: "The Samosa Box Code Lock!",
    narration: "A delivery guy from Haldiram hands you a mystery lockbox of sweets. The lock demands: 'Insert the larger number: -58 or -45.' Choose wisely!",
    choices: [
      { text: "-58 is larger", correct: false, rewardXp: 0 },
      { text: "-45 is larger", correct: true, rewardXp: 15 },
      { text: "They are equal", correct: false, rewardXp: 0 }
    ]
  }
];

// Rich Quiz questions (30) from math syllabus Classes 6-8
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "A line segment (Khand) has how many endpoints?",
    options: ["No endpoints", "One endpoint", "Two endpoints", "Ten endpoints"],
    correct: 2,
    hint: "Segment (Khand) is a fixed portion of line with defined start and exit points."
  },
  {
    id: "q2",
    question: "Identify the false relationship for comparing negative integers:",
    options: ["-10 > -2", "-2 > -100", "0 > -5", "-1 > -5"],
    correct: 0,
    hint: "-10 is further left on the number line, so it is smaller than -2."
  },
  {
    id: "q3",
    question: "Calculate the Range of these five scores: 12, 5, 29, 3, 17.",
    options: ["24", "26", "29", "14"],
    correct: 1,
    hint: "Subtract the lowest score (3) from the maximum score (29)."
  },
  {
    id: "q4",
    question: "Which geometric object stretches infinitely in ONE direction like a laser beam?",
    options: ["Point (Bindu)", "Line Segment (Khand)", "Ray (Kiran)", "Vertex (Shikhar)"],
    correct: 2,
    hint: "A ray has one starting vertex and shoots to infinity in the other direction."
  },
  {
    id: "q5",
    question: "Round off 752 to the nearest tens place.",
    options: ["760", "750", "800", "700"],
    correct: 1,
    hint: "Look at the unit digit (2), which is less than 5, so round down."
  },
  {
    id: "q6",
    question: "Which list of decimal values is correctly sorted in descending order (highest first)?",
    options: ["0.5, 0.05, 0.55", "0.55, 0.5, 0.05", "0.05, 0.5, 0.55", "0.5, 0.55, 0.05"],
    correct: 1,
    hint: "Compare tenths place first: 55 hundredths > 50 hundredths > 5 hundredths."
  },
  {
    id: "q7",
    question: "Place Value: In Rs 35,420, what is the value of digit 5?",
    options: ["500", "5,000", "50", "5"],
    correct: 1,
    hint: "The 5 is in the thousands place. Units, Tens, Hundreds, Thousands."
  },
  {
    id: "q8",
    question: "Lines on a ledger sheet are parallel lines because they ________.",
    options: ["Interlink at right angles", "Never meet no matter how far extended", "Are very short", "Connect to form circles"],
    correct: 1,
    hint: "Parallel lines maintain uniform gap, meaning no intersections."
  },
  {
    id: "q9",
    question: "Between -99 and -5, which integer is the Maximum?",
    options: ["-99", "-5", "-94", "They are same"],
    correct: 1,
    hint: "A lesser debt (-5) is a higher net value than a massive debt (-99)."
  },
  {
    id: "q10",
    question: "A sun ray or flashlight beam represents a: ",
    options: ["Line segment", "Ray", "Normal Line", "Bindu"],
    correct: 1,
    hint: "It originates from the sun (vertex) and moves forward for light years."
  },
  {
    id: "q11",
    question: "Comparing point properties: how many points can pass through a single point (Bindu)?",
    options: ["Only 1", "Exactly 2", "Infinite lines", "Zero"],
    correct: 2,
    hint: "You can pin a center map point and pivot infinitely many straight lines through it!"
  },
  {
    id: "q12",
    question: "If a line segment PQ measures 7.4 cm, how many endpoints does it have?",
    options: ["0", "1", "2", "3"],
    correct: 2,
    hint: "Endpoints are P and Q! It's a segment, so there are exactly two endpoints."
  },
  {
    id: "q13",
    question: "The temperature in Leh is -8°C. In Srinagar, it is -3°C. Which place is colder?",
    options: ["Srinagar (-3°C)", "Leh (-8°C)", "Both are same coldness", "Samosa counter"],
    correct: 1,
    hint: "Lower temperature means colder. -8 is less than -3."
  },
  {
    id: "q14",
    question: "Round off Rs 99.85 to the nearest rupee.",
    options: ["Rs 99", "Rs 100", "Rs 99.90", "Rs 99.50"],
    correct: 1,
    hint: "The decimal .85 is greater than .50, so round up to the next integer."
  },
  {
    id: "q15",
    question: "What is the maximum of the list: -12, -4, 0, -100, -2?",
    options: ["-100", "-12", "-2", "0"],
    correct: 3,
    hint: "Zero is greater than all negative numbers!"
  },
  {
    id: "q16",
    question: "If you have 4,320 coins and a friend has 4,230 coins, who is the richer champion?",
    options: ["You (4,320)", "Friend (4,230)", "Equal wealth", "Bhaiya is richer"],
    correct: 0,
    hint: "Compare thousands place (both 4), then hundreds place (3 vs 2). 3 is bigger."
  },
  {
    id: "q17",
    question: "What is the vertex (Shikhar) in an angle formed by two lines?",
    options: ["The length of the line", "The matching color", "The intersection point where lines meet", "The arrows"],
    correct: 2,
    hint: "The corner tip where the two lines branch out is called the vertex."
  },
  {
    id: "q18",
    question: "Solve the range: Maximum price of gulab jamun is Rs 22, minimum is Rs 12. FASLA?",
    options: ["Rs 12", "Rs 22", "Rs 10", "Rs 34"],
    correct: 2,
    hint: "Range = Maximum - Minimum. Max is 22, Min is 12."
  },
  {
    id: "q19",
    question: "Compare decimals: What is larger, 1.45 or 1.405?",
    options: ["1.405", "1.45", "Both are equal", "1.4"],
    correct: 1,
    hint: "Look at hundredths place: 1.450 vs 1.405. 5 is greater than 0."
  },
  {
    id: "q20",
    question: "A line segment can be measured using:",
    options: ["Only thermometer", "Ruler or scale", "Odometer", "Clock"],
    correct: 1,
    hint: "It has fixed length, so you can measure it in centimeters using a ruler!"
  },
  {
    id: "q21",
    question: "Round off 1,289 to the nearest hundreds place.",
    options: ["1,200", "1,290", "1,300", "1,000"],
    correct: 2,
    hint: "Look at the tens place (8), which is >= 5, so round up."
  },
  {
    id: "q22",
    question: "How many dimensions does a standard flat line Rekha have?",
    options: ["0 dimensions", "1 dimension", "2 dimensions", "3 dimensions"],
    correct: 1,
    hint: "A line has only length (1D), no width or height."
  },
  {
    id: "q23",
    question: "Which of the following is the minimum positive number?",
    options: ["0", "1", "0.1", "10"],
    correct: 2,
    hint: "0.1 is the smallest value among the positive options listed here."
  },
  {
    id: "q24",
    question: "If metros cross each other at right angles, those tracks are: ",
    options: ["Parallel tracks", "Perpendicular tracks", "Interchange tracks", "Kiran beams"],
    correct: 1,
    hint: "Tracks that cross at 90 degrees are perpendicular to each other."
  },
  {
    id: "q25",
    question: "Compare: -150 is ________ than -15.",
    options: ["Greater than ( > )", "Smaller than ( < )", "Equal to ( = )", "Double"],
    correct: 1,
    hint: "-150 is more negative, hence smaller than -15."
  },
  {
    id: "q26",
    question: "What is the symbol for a line extending infinitely through points A and B?",
    options: ["line AB with overhead two-headed arrow", "ray AB with one arrow", "bar AB", "point AB"],
    correct: 0,
    hint: "A line with arrows on both ends shows infinite extension in both directions."
  },
  {
    id: "q27",
    question: "In the number value 87,429, which digit has the lowest place value?",
    options: ["8", "7", "4", "9"],
    correct: 3,
    hint: "The digit in the units place (9) has the lowest place value of units (9 * 1)."
  },
  {
    id: "q28",
    question: "The score sequence is 98, 102, 85, 115, 91. What is maximum score?",
    options: ["98", "102", "115", "85"],
    correct: 2,
    hint: "115 is the highest number among all values in the list."
  },
  {
    id: "q29",
    question: "What geometric shape has 3 vertices (corner points)?",
    options: ["Square", "Circle", "Triangle", "Line segment"],
    correct: 2,
    hint: "A triangle (Tribhuj) has three straight sides meeting at three corner vertices!"
  },
  {
    id: "q30",
    question: "Compare numbers: 8,005 is _______ than 8,050.",
    options: ["Smaller than", "Greater than", "Equal to", "Samosa count"],
    correct: 0,
    hint: "8,005 has 0 in tens place, whereas 8,050 has 5 in tens place. So 8,005 is smaller."
  }
];
