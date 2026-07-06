import { Topic, Badge, StorySlide, QuizQuestion, Screen } from "./types";

// Helper to generate dynamic screens up to 239 for the 3 topics
export function getProceduralScreens(topicId: string, subtopicId: string): Screen[] {
  // Return explicit default screens from our dataset first.
  const explicit = EXPLICIT_SCREENS.filter(s => s.topicId === topicId && s.subtopicId === subtopicId);
  if (explicit.length > 0) return explicit;

  // Otherwise, procedurally generate screens to satisfy the math screens requirement!
  const count = subtopicId.includes("video") ? 5 : subtopicId.includes("practice") ? 6 : subtopicId.includes("panga") ? 5 : 8;
  const list: Screen[] = [];
  for (let i = 1; i <= count; i++) {
    const screenId = `${topicId}_${subtopicId}_proc_${i}`;
    let title = `Concept Card - Part ${i}`;
    let conceptHeading = "Math Magic Explained!";
    let explanation = "Doston, chalo isey simple Hinglish mein samajhte hain!";
    let interactiveType: "point_hunt" | "line_touch" | "range_slider" | "decimal_battle" | "rounding_match" | "none" = "none";

    if (subtopicId === "geom_bindu") {
      interactiveType = "point_hunt";
      if (i === 1) {
        title = "💡 Bindu: Zero-Dimensional Coordinate Anchor";
        conceptHeading = "What is Bindu?";
        explanation = "A Bindu (point) represents a precise location in space but has strictly zero dimensions—no length, no width, and no height! Think of it as a laser-targeted GPS coordinate on a graph layout.";
      } else if (i === 2) {
        title = "💡 Upper Case Labels: A, B, C Naming rules";
        conceptHeading = "Point Naming Standards";
        explanation = "In math databases, we label points using CAPITAL letters (like A, B, or P). Avoid lowercase letters for labeling coordinate positions. This keeps your notebook and drawings elegant like a pro!";
      } else if (i === 3) {
        title = "💡 Cartesian Grid Locators";
        conceptHeading = "Mapping points via x and y";
        explanation = "A point on a 2D blackboard matches standard coordinate systems: (x, y). 'x' tells you your horizontal lane spacing (left/right) and 'y' sets your vertical altitude (up/down).";
      } else if (i === 4) {
        title = "💡 Real-life Bindus: Shop Pins & Metro Stations";
        conceptHeading = "Physical points walk!";
        explanation = "Look at any digital map. A single shop, a metro terminal station, or the tip of a pencil on paper represents a physical Point in daily math.";
      } else {
        title = `💡 Spatial points in geometry - Part ${i}`;
        conceptHeading = `Point structures: Index ${i}`;
        explanation = `Did you know? Every complex polygon (triangles, rectangles) starts as single Vertex Points. By connecting distinct points in sequence, we construct lines, lengths, and areas!`;
      }
    } else if (subtopicId === "geom_rekha") {
      interactiveType = "line_touch";
      if (i === 1) {
        title = "💡 Infinite Stretches: Train Tracks & Metros";
        conceptHeading = "What is a Rekha (Line)?";
        explanation = "A line (Rekha) is a direct collinear set of infinitely many dots stretching endlessly in BOTH directions! It doesn't stop or bend, and has no endpoints.";
      } else if (i === 2) {
        title = "💡 Arrow Representation Rules";
        conceptHeading = "Line Notations";
        explanation = "To show that a line stretches infinitely without stopping, we draw arrows on both ends: <--->. This separates a line from a segment or ray.";
      } else if (i === 3) {
        title = "💡 Parallel Tracks: Unintersecting Rails";
        conceptHeading = "Parallel Lines Concept";
        explanation = "When two lines run beside each other with a constant, uniform distance and never touch, we call them Parallel Lines. Delhi Metro's tracks are perfect parallels!";
      } else {
        title = `💡 Lines extending further - part ${i}`;
        conceptHeading = `Extended Rekha structures: Index ${i}`;
        explanation = `Geometry relies on infinite linear guidelines to calculate slopes, perspective, and alignment. If two non-parallel lines cross, they intersect at exactly one single point!`;
      }
    } else if (subtopicId === "geom_khand") {
      interactiveType = "line_touch";
      if (i === 1) {
        title = "💡 Fixed frontiers: Line Segment (Khand)";
        conceptHeading = "What is Line Segment (Khand)?";
        explanation = "Unlike an infinite Line, a Segment (Khand) has exactly TWO fixed endpoints! You can measure it perfectly using a plastic ruler. It has a specific, fixed length.";
      } else if (i === 2) {
        title = "💡 Notation rules: Overbars in math class";
        conceptHeading = "Segment Notation";
        explanation = "We denote a segment with an overbar (e.g., AB with a line over it). It means the specific path connecting points A and B directly, with no extensions.";
      } else if (i === 3) {
        title = "💡 Segment Addition Postulates";
        conceptHeading = "Adding lengths up";
        explanation = "If point C lies on segment AB, then length AC + BC is equal to the total segment length AB! Use this simple math to solve road maps and split bills.";
      } else {
        title = `💡 Segments in active polygons - Part ${i}`;
        conceptHeading = `Segment boundaries: Index ${i}`;
        explanation = `Samosas have 3 sides (segments A-B, B-C, and C-A). A kite has 4 segment boundaries. Segments are the true framework of all custom structural shapes.`;
      }
    } else if (subtopicId === "geom_kiran") {
      interactiveType = "line_touch";
      if (i === 1) {
        title = "💡 Shooting Rays: Sunbeams & Laser beams";
        conceptHeading = "What is a Kiran (Ray)?";
        explanation = "A Kiran (Ray) is a mixed concept! It has exactly ONE fixed starting origin point, but stretches endlessly in the other direction without stopping.";
      } else if (i === 2) {
        title = "💡 One-directional Arrow notation";
        conceptHeading = "Ray Notation rules";
        explanation = "In textbooks, we write rays as AB with an arrow pointing right. This indicates it starts at origin A and shoots endlessly through coordinate point B.";
      } else if (i === 3) {
        title = "💡 Flashlights and Star lightvoyages";
        conceptHeading = "Rays in daily life";
        explanation = "A flashlight bulb is the raw origin point. When you turn it on, light shoots out in a straight ray into the endless street, behaving just like a Ray in geometry!";
      } else {
        title = `💡 Rays & Angular borders - Part ${i}`;
        conceptHeading = `Ray geometry structures: Index ${i}`;
        explanation = `When two distinct rays start at a mutual origin point and shoot out at different angles, they form an Corner Angle. Rays define our line of sight in games!`;
      }
    } else if (subtopicId === "geom_shikhar") {
      interactiveType = "point_hunt";
      if (i === 1) {
        title = "💡 Pointy Corners: Shikhar (Vertex)";
        conceptHeading = "What is a Vertex (Shikhar)?";
        explanation = "A Vertex (Shikhar) is the sharp corner point where two or more lines, segments, or rays meet. A samosa has 3 pointy vertices; a kite has 4!";
      } else if (i === 2) {
        title = "💡 Vertices of triangles and boxes";
        conceptHeading = "Vertices listing and bounds";
        explanation = "When multiple vertices are present, we call them 'vertices'. A triangle has vertices A, B, and C. A quadrilateral adds vertex D to form a closed shape.";
      } else {
        title = `💡 Pointy peaks on graph lines - Part ${i}`;
        conceptHeading = `Settle vertex rules: Index ${i}`;
        explanation = `We use vertex points to measure angles, slopes, and aspect ratios. If you drag any vertex on our digital chalkboard, the connected sides automatically stretch!`;
      }
    } else if (topicId === "geom") {
      title = `Geometry Shastra: Screen #${i}`;
      conceptHeading = `Understanding Point/Line/Segment - Part ${i}`;
      explanation = `Arey wah! Geometry hamare as-pas har jagah hai. Street mapping se lekar building structures tak, Rekha (Line) aur Bindu (Point) hi pure system ke mool aadhar hain! Ek single Bindu has ZERO dimensions, while Rekha stretches infinitely!`;
      if (i % 3 === 0) interactiveType = "point_hunt";
      else if (i % 3 === 1) interactiveType = "line_touch";
    } else if (subtopicId === "maxmin_max") {
      interactiveType = "range_slider";
      if (i === 1) {
        title = "💡 Maximum: The Absolute Peak Ceiling";
        conceptHeading = "What is Maximum value?";
        explanation = "Maximum (Uchhatam) is the absolute highest value in any dataset! In an IPL match, the highest runs scored is the Maximum runs. It defines our upper ceiling limit.";
      } else if (i === 2) {
        title = "💡 Lock peak profit margins";
        conceptHeading = "Maximum margins in market";
        explanation = "Lassi shops want maximum customers and maximum prices to pull profit peaks! We locate maximums by sorting lists in ascending order and checking the last item.";
      } else {
        title = `💡 Higherbounds of data arrays - Part ${i}`;
        conceptHeading = `Maximum thresholds: Index ${i}`;
        explanation = `To select maximum limits, we compare each item in a loop. If a new item is larger than our current max record, it claims the champion crown!`;
      }
    } else if (subtopicId === "maxmin_min") {
      interactiveType = "range_slider";
      if (i === 1) {
        title = "💡 Minimum: The Absolute Base floor";
        conceptHeading = "What is Minimum value?";
        explanation = "Minimum (Nyunatam) represents the absolute lowest possible value! In business, we want a minimum cost of raw materials to maximize savings, defining our baseline floor.";
      } else {
        title = `💡 Lower bounds of data sets - Part ${i}`;
        conceptHeading = `Minimum margins: Index ${i}`;
        explanation = `We locate minimum limits by scanning all scores. Sorting lists helps pull the smallest number right to the top row instantly.`;
      }
    } else if (subtopicId === "maxmin_range") {
      interactiveType = "range_slider";
      if (i === 1) {
        title = "💡 Range: The Spread Difference (Fasla)";
        conceptHeading = "How to query Range?";
        explanation = "Range (Fasla) represents the gap or distance between the highest and lowest values! To find Range, simply calculate: Maximum Value minus Minimum Value!";
      } else {
        title = `💡 Spread variations & limits - Part ${i}`;
        conceptHeading = `Range calculations: Index ${i}`;
        explanation = `A wide Range means extremely volatile or fluctuating data (like temperature spikes from -10°C to 45°C). A narrow range holds super consistent pricing!`;
      }
    } else if (topicId === "maxmin") {
      title = `Max/Min Tracker: Screen #${i}`;
      conceptHeading = `Maximum, Minimum & Range - Part ${i}`;
      explanation = `Sabse bada kaun? Sabse chhota kaun? Shopping bill mein maximum savings kaise karein? Max/Min seekh ke tum asani se savings nikal sakte ho. Fasla (Range) is simply: Maximum value - Minimum value!`;
      if (i % 2 === 0) interactiveType = "range_slider";
    } else if (subtopicId === "compare_basics") {
      interactiveType = "decimal_battle";
      if (i === 1) {
        title = "💡 Gator Mouth Rules: Choosing Greater vs Lesser";
        conceptHeading = "Crocodile comparing rule";
        explanation = "The hungry math crocodile always opens its mouth toward the LARGER number! Hence, the greater-than symbol (>) has its wide opening eating the champion value.";
      } else {
        title = `💡 Basic number comparing metrics - Part ${i}`;
        conceptHeading = `Crocodile bounds: Index ${i}`;
        explanation = `Always compare the highest place values first (like Thousands or Tens column) to decide which parcel is larger or lower.`;
      }
    } else if (subtopicId === "compare_decimals") {
      interactiveType = "decimal_battle";
      if (i === 1) {
        title = "💡 Decimal Battles: Avoid the digits trap!";
        conceptHeading = "Decimal Place comparison";
        explanation = "Don't fall for length traps! 0.5 is much larger than 0.05, because the tenths place (5 tenths) beats zero tenths in 0.05! Always compare columns left-to-right.";
      } else {
        title = `💡 Decimal place values comparison - Part ${i}`;
        conceptHeading = `Decimals tracker: Index ${i}`;
        explanation = `Comparing decimals is critical when analyzing metric grams of spices, kilograms of saffron, or matching currency exchange coins.`;
      }
    } else if (subtopicId === "compare_rounding") {
      interactiveType = "rounding_match";
      if (i === 1) {
        title = "💡 Nearest Rupee: 5-or-Up rounding rule";
        conceptHeading = "How to round numbers?";
        explanation = "In Chawri Bazar, we round bills for rapid change! If the paise ends in .50 or greater, push the rupee UP. If .49 or lower, keep the rupee down. Speed is value.";
      } else {
        title = `💡 Rounding off to nearest ten - Part ${i}`;
        conceptHeading = `Rounding metrics: Index ${i}`;
        explanation = `To round to the nearest ten, inspect the ones column. 45 rounds up to 50; 44 rounds down to 40. This keeps estimates super simple.`;
      }
    } else if (subtopicId === "compare_place") {
      interactiveType = "decimal_battle";
      title = `💡 Place Value Power: Column weights - Part ${i}`;
      conceptHeading = "Digits vs Place Value";
      explanation = `A single digit's power depends strictly on its column position (ones, tens, hundreds, thousands/hazaar!). Moving left makes the digit ten times larger!`;
    } else if (subtopicId === "compare_order") {
      interactiveType = "decimal_battle";
      title = `💡 Ascending & Descending sequences (Kram) - Part ${i}`;
      conceptHeading = "Ascending vs Descending";
      explanation = `Sorting items in ascending order means lining them up from the smallest base to the highest peak. Descending order reverses this flow for high score cards!`;
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
    explanation: "Yeh high quality animated video dekhein jisme Maths Dost point (Bindu) aur Rekha ke simple rules sikha rahe hain. Samosa, Cricket, aur local streets se seekhein basic Geometry!",
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
      { id: "maxmin_mastery", name: "🏆 Mastery", screens: [] },
      { id: "maxmin_skills", name: "🔧 Max/Min Skills", screens: [] }
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
    narration: "Tara is flying a patang (kite) over Chawri Bazar! Suddenly, the kite string stretches tightly. Maths Dost stops by and asks: 'Tara, the string is straight but has two ends - your hand and the kite. Is this string a Point, Rekha, or Segment?'",
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
    options: ["You (4,320)", "Friend (4,230)", "Equal wealth", "Friend is richer"],
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

// Maps each question ID to its primary topic for subtopic filtering
export const QUESTION_TOPIC_MAP: Record<string, string> = {
  q1: "geom", q4: "geom", q8: "geom", q10: "geom", q11: "geom",
  q12: "geom", q17: "geom", q20: "geom", q22: "geom", q24: "geom",
  q26: "geom", q29: "geom",
  q2: "compare", q5: "compare", q6: "compare", q7: "compare",
  q14: "compare", q16: "compare", q19: "compare", q21: "compare",
  q25: "compare", q27: "compare", q30: "compare",
  q3: "maxmin", q9: "maxmin", q13: "maxmin", q15: "maxmin",
  q18: "maxmin", q23: "maxmin", q28: "maxmin"
};
