import { QuizQuestion, StorySlide } from "./types";

// Helper to get Delhi street names for story atmosphere
const DELHI_PLACES = [
  "Chandni Chowk", "Connaught Place", "Lajpat Nagar", "Chawri Bazar",
  "Karol Bagh", "Sarojini Nagar Market", "Feroz Shah Kotla Stadium", "India Gate Road",
  "Nizamuddin Gali", "Daryaganj Market", "Kamla Nagar Chauraha", "Janpath Corridor",
  "Chitranjan Park", "Hauz Khas Village", "Paharganj Alley", "Dilli Haat Food court",
  "Sadar Bazaar Lane", "Khan Market Road", "Red Fort Grounds", "Okhla Bypass"
];

// Helper to get character names
const CHARACTERS = [
  "Tara", "Rohan", "MathsGuru Bhaiya", "Lassi Wale Bhaiya", "Kite Flyer Chacha",
  "Samosa Master Ji", "Metro card guard", "Haldiram Cashier", "Cricket Coach Amit", "Tea-stall Raju",
  "Auto Wale Uncle", "Kulfi Seller Sonu", "Bookstore owner Rohit", "Sweet Maker Chaman", "Baloon Seller Diya",
  "Fruit vendor Salim", "Metro Passenger Pinky", "Toy store owner Vinod", "Chaat center Chintu", "Kite Maker Rehman"
];

// Emojis mapping
const EMOJIS = ["🛺", "🪁", "🍢", "🧋", "🏏", "🎯", "🔑", "🍿", "🛍️", "🏪", "🏫", "🔋", "💡", "📦", "🏷️", "💳", "👟", "🚲", "🍵", "🥨"];

/**
 * Generates 20 High-yield Practice Drills for a given subtopic
 */
export function getPracticeDrillVariants(topicId: string, subId: string, difficulty: string) {
  const drills: { id: string; title: string; instruction: string; targetValue: any; type: string; conceptSubtopicId: string }[] = [];
  const levelLabel = difficulty === "expert" ? "Expert (Class 8)" : difficulty === "intermediate" ? "Intermediate (Class 7)" : "Beginner (Class 6)";

  for (let i = 1; i <= 20; i++) {
    const place = DELHI_PLACES[(i - 1) % DELHI_PLACES.length];
    const char = CHARACTERS[(i - 1) % CHARACTERS.length];
    
    let activeSubId = subId;
    if (subId === "geom_practice") {
      const gSubs = ["geom_bindu", "geom_rekha", "geom_khand", "geom_kiran", "geom_shikhar"];
      activeSubId = gSubs[(i - 1) % gSubs.length];
    } else if (subId === "maxmin_practice") {
      const mSubs = ["maxmin_max", "maxmin_min", "maxmin_range"];
      activeSubId = mSubs[(i - 1) % mSubs.length];
    } else if (subId === "compare_practice") {
      const cSubs = ["compare_basics", "compare_decimals", "compare_rounding", "compare_place", "compare_order"];
      activeSubId = cSubs[(i - 1) % cSubs.length];
    }

    let title = "";
    let instruction = "";
    let targetValue: any = null;
    let type = "point_hunt";

    if (activeSubId.includes("bindu")) {
      type = "point_hunt";
      const targetX = ((i * 2) % 9) - 4; // Use negative coordinates too
      const targetY = ((i * 3) % 9) - 4;
      title = `Drill #${i}: Pinpoint Coordinate at ${place}`;
      instruction = `Doston! ${char} wants you to pinpoint the exact 0D location for Shop #${i} at Coordinate (X: ${targetX}, Y: ${targetY}) on our green chalkboard grid. Click exactly at (X: ${targetX}, Y: ${targetY}) to unlock!`;
      targetValue = { x: targetX, y: targetY };
    } 
    else if (activeSubId.includes("rekha")) {
      type = "line_touch";
      const shift = (i % 4) - 2; // custom shift values: -2, -1, 0, 1
      title = `Drill #${i}: Endless Rekha Alignment`;
      instruction = `Draw an endless Rekha (Line) extending infinitely in both directions. Tap twice to project a line passing perfectly through a virtual offset at y = ${shift}. Match double-ended arrows!`;
      targetValue = { shift };
    } 
    else if (activeSubId.includes("khand")) {
      type = "range_slider";
      const lengthGoal = (i % 6) + 7; // dynamic lengths like 7cm, 8cm, 9cm, 10cm, etc.
      title = `Drill #${i}: Measure Segment to Millimeter`;
      instruction = `Measure a crisp Rekha-khand (Segment) with your ruler measuring EXACTLY ${lengthGoal} cm. Adjust the slider points to clamp the boundary endpoints!`;
      targetValue = lengthGoal;
    } 
    else if (activeSubId.includes("kiran")) {
      type = "line_touch";
      const startX = (i % 5) - 2;
      const angleVal = (i * 15 + 15) % 180; // dynamic degree values like 30, 45, 60, 90 etc.
      title = `Drill #${i}: Kiran Laser Projector`;
      instruction = `Aim the laser ray (Kiran) originating from bulb point A(${startX}, 0) firing straight towards the horizon at an angle of EXACTLY ${angleVal} degrees. Click to fire!`;
      targetValue = { startX, angle: angleVal };
    } 
    else if (activeSubId.includes("shikhar")) {
      type = "point_hunt";
      const xCorner = (i % 7) - 3;
      const yCorner = (i % 5) - 2;
      title = `Drill #${i}: Target Apex Vertex`;
      instruction = `Click the Converging Vertex apex (Shikhar) where two angled beams collide. Spot the intersection point of the samosa corner at exactly (${xCorner}, ${yCorner})!`;
      targetValue = { x: xCorner, y: yCorner };
    } 
    else if (activeSubId.includes("max")) {
      type = "range_slider";
      const maxClaim = i * 20 + 130;
      title = `Drill #${i}: IPL Peak Run Spotter`;
      instruction = `Analyze the run totals: [110, ${maxClaim}, ${maxClaim - 60}, ${maxClaim - 25}]. Set the bracket slider lock to capture the Maximum peak runs of ${maxClaim}!`;
      targetValue = maxClaim;
    } 
    else if (activeSubId.includes("min")) {
      type = "range_slider";
      const minTemp = -((i % 6) * 4 + 3); // dynamic colder temps like -3, -7, -11, -15, -19, -23
      title = `Drill #${i}: Sub-Zero Coldest Locker`;
      instruction = `Identify the minimum temperature from logs: [0°C, -2°C, ${minTemp}°C, 12°C]. Set the selector to latch onto the absolute coldest value: ${minTemp}°C!`;
      targetValue = minTemp;
    } 
    else if (activeSubId.includes("range")) {
      type = "range_slider";
      const upper = (i % 5) * 20 + 150;
      const lower = (i % 4) * 10 + 20;
      const rangeVal = upper - lower;
      title = `Drill #${i}: Price Fasla Spread`;
      instruction = `At ${place}, upper cap is Rs ${upper} and basic is Rs ${lower}. Check the spectrum distance (Fasla Range) = Upper - Lower, which is Rs ${rangeVal}. Set slider to Rs ${rangeVal}!`;
      targetValue = rangeVal;
    } 
    else if (activeSubId.includes("basics")) {
      type = "decimal_battle";
      const larger = -((i % 8) + 2); // e.g. -2, -3...
      const smaller = larger - ((i % 5) + 3); // always smaller
      title = `Drill #${i}: negative Numbers Comparator`;
      instruction = `Gator open mouth always eats the larger value (closer to 0 on negative scale)! Choose between negative values: ${larger} or ${smaller}. Click the larger number!`;
      targetValue = larger;
    } 
    else if (activeSubId.includes("decimals")) {
      type = "decimal_battle";
      const dec1 = (0.2 + (i % 6) * 0.12).toFixed(2);
      const dec2 = (0.02 + (i % 6) * 0.12).toFixed(2);
      title = `Drill #${i}: Tenths vs Hundredths Scale`;
      instruction = `Compare the decimal grid weights: ${dec1} vs ${dec2}. Click the larger value to feed the gator and earn XP!`;
      targetValue = dec1;
    } 
    else if (activeSubId.includes("rounding")) {
      type = "rounding_match";
      const baseNum = (10.15 + i * 1.55).toFixed(2);
      const expectedRounded = Math.round(parseFloat(baseNum));
      title = `Drill #${i}: Nearest Rupee Bill Rounding`;
      instruction = `A customer submits a raw market bill of Rs ${baseNum}. Round it off to the nearest whole rupee! Settle precisely on Rs. ${expectedRounded}.`;
      targetValue = { original: baseNum, expected: expectedRounded };
    } 
    else if (activeSubId.includes("place")) {
      type = "decimal_battle";
      const digits = 12000 + i * 450;
      const hundredsDigit = Math.floor((digits % 1000) / 100);
      title = `Drill #${i}: Rod Peg Abacus Place`;
      instruction = `Unlock the safe at ${place} with code ${digits}. Find which single digit occupies the HUNDREDS (Sau) place value. Enter ${hundredsDigit}!`;
      targetValue = hundredsDigit;
    } 
    else {
      // compare_order
      type = "decimal_battle";
      const baseNum = i * 8;
      title = `Drill #${i}: Ascent Stair Master`;
      instruction = `Calculate ascending stair starts. Which value represents larger ledger debt (smallest value): -150 or -${baseNum}? Click -150!`;
      targetValue = -150;
    }

    drills.push({
      id: `${topicId}_${subId}_drill_${i}`,
      title: `[${levelLabel}] ${title}`,
      instruction,
      targetValue,
      type,
      conceptSubtopicId: activeSubId
    });
  }
  return drills;
}

/**
 * Generates 20 real-world story adventures set in Delhi street environments
 */
export function getStoryQuestVariants(topicId: string, subId: string): StorySlide[] {
  const slides: StorySlide[] = [];

  for (let i = 1; i <= 20; i++) {
    const place = DELHI_PLACES[(i - 1) % DELHI_PLACES.length];
    const char = CHARACTERS[(i - 1) % CHARACTERS.length];
    const emoji = EMOJIS[(i - 1) % EMOJIS.length];

    let title = "";
    let narration = "";
    let choices: { text: string; correct: boolean; rewardXp: number }[] = [];

    if (subId.includes("bindu")) {
      title = `${char}'s GPS Coordinates Pin at ${place}`;
      narration = `Tara is coordinating bulk supply deliveries deep inside ${place}! The maps GPS app glitches and displays a single focal locator point. Tara asks Bhaiya: 'Bhaiya, this marker dot represents the warehouse. What is the dimension of a point?'`;
      choices = [
        { text: "0 Dimensions (Only exact position, no size!)", correct: true, rewardXp: 15 },
        { text: "1 Dimension (Extends flat)", correct: false, rewardXp: 0 },
        { text: "2 Dimensions (Has width and length)", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("rekha")) {
      title = `The Endlessly Parallel Metro Rails at ${place}`;
      narration = `You and Rohan are standing near a straight metro layout bypass in ${place}. Two parallel electrical rails run straight ahead as far as the eye can see. Bhaiya asks: 'Doston! If these two lines stretch infinitely with arrows representing endless paths, where will they cross?'`;
      choices = [
        { text: "They will intersect in exactly 5 kilometers", correct: false, rewardXp: 0 },
        { text: "They will never cross because parallel lines hold strict uniform separation!", correct: true, rewardXp: 15 },
        { text: "At the next junction crossing", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("khand")) {
      title = `Measuring Saffron Packing Fibers in ${place}`;
      narration = `A wholesale exporter at ${place} is packing precious organic saffron boxes. He cuts a thin yellow tying chord that extends exactly from corner A to corner B, measuring ${i * 2 + 5} cm. He asks you: 'Is this chord an infinite line or a Rekha-khand (Segment)?'`;
      choices = [
        { text: "It stretches to infinity like a line", correct: false, rewardXp: 0 },
        { text: "It is a Rekha-khand (Segment) because it has 2 fixed boundaries!", correct: true, rewardXp: 15 },
        { text: "It is an origin-based ray (Kiran)", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("kiran")) {
      title = `Aiming the Laser Signal inside ${place}`;
      narration = `During a street parade in ${place}, a volunteer uses a special rechargeable red laser beam. The laser pointer originate straight at his hand, projecting forward endlessly into the dark night sky. Bhaiya asks: 'Compare this to geometry. What represents a single origin shot running infinitely in one direction?'`;
      choices = [
        { text: "A Line Segment with boundary markers", correct: false, rewardXp: 0 },
        { text: "A Ray (Kiran) - starts at 1 source vertex and stretches infinitely!", correct: true, rewardXp: 15 },
        { text: "A point with zero diameter", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("shikhar")) {
      title = `Bargaining at the Triangular Samosa Corner in ${place}`;
      narration = `Tara is ordering spicy paneer samosas at a sweet shop in ${place}. She points to the crispy corner apex where two triangular sides converge tightly. Bhaiya tests her: 'Arey Tara, what is this geometric meeting corner called?'`;
      choices = [
        { text: "A Shikhar (Vertex) point meeting angles!", correct: true, rewardXp: 15 },
        { text: "An endless ray beam", correct: false, rewardXp: 0 },
        { text: "A parallel line corridor", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("max")) {
      title = `IPL Hotspot Run Records at ${place}`;
      narration = `Rohan monitors three screens streaming live IPL games at ${place}. Score values show runs: [${i * 10 + 50}, ${i * 12 + 100}, ${i * 8 + 40}]. Help Rohan select the absolute MAXIMUM value to award the Golden Cap!`;
      const correctVal = i * 12 + 100;
      choices = [
        { text: `Runs scored: ${i * 8 + 40}`, correct: false, rewardXp: 0 },
        { text: `Runs scored: ${correctVal} runs (The peak value!)`, correct: true, rewardXp: 15 },
        { text: `Runs scored: ${i * 10 + 50}`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("min")) {
      title = `Sub-Zero Cargo Log at ${place}`;
      narration = `A cold truck transport inside ${place} logs deep freeze storage points: [-${i}, -${i * 3}, -2]°C. The cargo manager needs to identify the minimum coldest temperature value to test food freezing. Which one is it?`;
      choices = [
        { text: `-${i * 3}°C (furthest negative limits represent the absolute minimum temperature!)`, correct: true, rewardXp: 15 },
        { text: `-${i}°C`, correct: false, rewardXp: 0 },
        { text: `-2°C`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("range")) {
      title = `Sweet Box Price Range (Fasla) in ${place}`;
      narration = `Haldiram sweets cashier at ${place} offers daily boxes. The cheapest mixed dry fruit box costs Rs. ${i * 5 + 40} (Minimum) while the premium royal box is Rs. ${i * 20 + 200} (Maximum). What is the exact Range (Fasla) between these rates?`;
      const rangeVal = (i * 20 + 200) - (i * 5 + 40);
      choices = [
        { text: `Rs. ${rangeVal} (Max of ${i * 20 + 200} minus Min of ${i * 5 + 40}!)`, correct: true, rewardXp: 15 },
        { text: `Rs. ${i * 20 + 200}`, correct: false, rewardXp: 0 },
        { text: `Rs. 50`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("basics")) {
      title = `The Crocodile Coin Comparison Gali in ${place}`;
      narration = `A cute cartoon crocodile gator in ${place} wants to devour the larger bucket of coins of two debtors: -${i * 4} coins or -${i * 8} coins. Help the gator evaluate which represents a larger balance (less debt!).`;
      choices = [
        { text: `-${i * 8} coins because 8 is bigger`, correct: false, rewardXp: 0 },
        { text: `-${i * 4} coins is larger (less debt debt on our number line!)`, correct: true, rewardXp: 15 },
        { text: "They are completely identical", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("decimals")) {
      title = `Wholesale Saffron Decimal Weighing in ${place}`;
      narration = `Merchant '${char}' in ${place} is weighing premium saffron. Lot A weighs ${1.4 + i * 0.05} grams, while Lot B weighs ${1.405 + i * 0.05} grams. Which batch contains a larger quantity?`;
      const isLotABigger = (1.4 + i * 0.05) > (1.405 + i * 0.05); // Wait: 1.400 vs 1.405. 1.405 is strictly larger. Let's make it direct!
      const valA = (1.45 + i * 0.01).toFixed(3);
      const valB = (1.409 + i * 0.01).toFixed(3);
      // valA tenths is 4 vs 4, hundredths is 5 vs 0. So valA is always larger.
      choices = [
        { text: `${valA} grams is larger (tenths & hundredths placements!)`, correct: true, rewardXp: 15 },
        { text: `${valB} grams`, correct: false, rewardXp: 0 },
        { text: "Both reflect the same grams weight", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("rounding")) {
      title = `Rounding Settle at the Chaat Stall of ${place}`;
      narration = `You ordered delicious street kachoris at ${place}. The final total calculated bill is Rs. ${(44.3 + i * 0.15).toFixed(2)}. The seller accepts round whole rupee settlements. How much should you hand him to settle?`;
      const val = parseFloat((44.3 + i * 0.15).toFixed(2));
      const r = Math.round(val);
      choices = [
        { text: `Rs. ${r} (Round off based on the boundary .50 condition!)`, correct: true, rewardXp: 15 },
        { text: `Rs. ${Math.floor(val) - 5}`, correct: false, rewardXp: 0 },
        { text: `Rs. ${Math.ceil(val) + 2}`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("place")) {
      title = `The Lockbox Key code challenge at ${place}`;
      narration = `Tara is given a chest box at ${place} with code sequence: ${35000 + i * 650}. The puzzle lock demands: 'Insert the digit that occupies the Thousands (Hazaar) column!' What digit is it?`;
      const numCode = 35000 + i * 650;
      const thousandsDigit = Math.floor((numCode % 10000) / 1000);
      choices = [
        { text: `The digit ${thousandsDigit} is correct!`, correct: true, rewardXp: 15 },
        { text: `The first digit 3`, correct: false, rewardXp: 0 },
        { text: `The last digit 0`, correct: false, rewardXp: 0 }
      ];
    } 
    else {
      // compare_order
      title = `Metro Token Kram Queue in ${place}`;
      narration = `A metro card teller in ${place} is sorting passenger tokens labelled with weights: [-${i * 2}, ${i + 5}, 0, -${i * 5 + 3}]. Which list represents these tokens correctly arranged in Ascending or Kram Order (lowest weight first)?`;
      const listLowFirstStr = `-${i * 5 + 3}, -${i * 2}, 0, ${i + 5}`;
      choices = [
        { text: `[${listLowFirstStr}] (Starting with furthest negative values up!)`, correct: true, rewardXp: 15 },
        { text: `[${i + 5}, 0, -${i * 2}, -${i * 5 + 3}]`, correct: false, rewardXp: 0 },
        { text: `[0, -${i * 2}, ${i + 5}, -${i * 5 + 3}]`, correct: false, rewardXp: 0 }
      ];
    }

    slides.push({
      id: `${topicId}_${subId}_story_slide_${i}`,
      emoji,
      title: `Quest #${i}: ${title}`,
      narration,
      choices
    });
  }
  return slides;
}

/**
 * Generates 20 CBSE syllabus multiple choice questions for quizzes
 */
export function getConceptQuizVariants(topicId: string, subId: string, difficulty: string): QuizQuestion[] {
  const list: QuizQuestion[] = [];
  const levelText = difficulty === "expert" ? "Class 8" : difficulty === "intermediate" ? "Class 7" : "Class 6";

  for (let i = 1; i <= 20; i++) {
    const term = DELHI_PLACES[(i - 1) % DELHI_PLACES.length];
    
    let question = "";
    let options: string[] = [];
    let correct = 0;
    let hint = "";

    if (subId.includes("bindu")) {
      question = `[${levelText} - Q${i}] How many lines can pass through a single specific Bindu (Point) spotted near ${term}?`;
      options = ["Only exactly 1 line", "Exactly two lines", "Infinite lines can intersect at one point!", "Zero lines"];
      correct = 2;
      hint = "Imagine a wheel spike. All spokes of a cycle or compass map pass through the exact same pivot point!";
    } 
    else if (subId.includes("rekha")) {
      question = `[${levelText} - Q${i}] If an infinite Rekha (Line) runs directly straight through ${term}, how many fixed endpoints does it possess?`;
      options = ["Zero endpoints (It goes endlessly on both sides!)", "Exactly 1 endpoint", "Exactly 2 endpoints", "Varies on map size"];
      correct = 0;
      hint = "A line represents infinite coordinates. It has two double arrows denoting and stretching endlessly with no limit!";
    } 
    else if (subId.includes("khand")) {
      question = `[${levelText} - Q${i}] A customer in ${term} orders a wire segment of exactly ${i + 4} cm to tie boxes. A Line Segment (Khand) is defined by which property?`;
      options = ["Stretches infinitely without endings", "Has exactly one boundary origin", "Has exactly two fixed endpoints!", "Has no measurable length"];
      correct = 2;
      hint = "Segment means a finite section. Hence, it starts at point A and ends at point B with exact measurable distance.";
    } 
    else if (subId.includes("kiran")) {
      question = `[${levelText} - Q${i}] A beam of flashlight originating at a torch battery and shooting through ${term} tunnels represents which geometry structure?`;
      options = ["A Point (Bindu)", "A Ray (Kiran) - starting at 1 origin and flying infinitely!", "A line segment with two endpoints", "A closed loop line"];
      correct = 1;
      hint = "Think about a solar beam. It originates at the Sun (1 vertex) and travels forward forever.";
    } 
    else if (subId.includes("shikhar")) {
      question = `[${levelText} - Q${i}] A triangle formed by cricket boundaries in ${term} contains how many vertices (intersection Shikhar tips)?`;
      options = ["One vertex", "Two vertices", "Three vertices (Triangles have 3 corners!)", "Zero vertices"];
      correct = 2;
      hint = "Each pointy corner of the triangle where straight boundaries intersect is a Shikhar!";
    } 
    else if (subId.includes("max")) {
      const v1 = i * 15 + 100;
      const v2 = i * 20 + 200;
      const v3 = i * 11 + 50;
      question = `[${levelText} - Q${i}] Scan this dataset of daily sweet sales in ${term}: [${v1}, ${v2}, ${v3}]. Which run represents the Maximum limit?`;
      options = [`${v1}`, `${v2} - the highest value in the comparative dataset!`, `${v3}`, `${v1 + v3}`];
      correct = 1;
      hint = "Compare the hundred's digit of the integer sequence to find the peak magnitude.";
    } 
    else if (subId.includes("min")) {
      const valA = - (i * 3);
      const valB = - (i * 4 + 1);
      const valC = 0;
      question = `[${levelText} - Q${i}] A metro cargo logs thermal cooling levels in ${term}: [${valC}°C, ${valA}°C, ${valB}°C]. Identify the absolute minimum temperature.`;
      options = [`${valC}°C`, `${valA}°C`, `${valB}°C (Furthest left from zero on the number line!)`, `${valA - 5}°C`];
      correct = 2;
      hint = "A greater debt on the number line represents the lowest value in a comparison set.";
    } 
    else if (subId.includes("range")) {
      const top = i * 12 + 150;
      const bottom = i * 2 + 10;
      const rangePr = top - bottom;
      question = `[${levelText} - Q${i}] A merchant in ${term} sells woolens ranging from Rs ${bottom} (minimum) to Rs ${top} (maximum). What is the mathematical Range (Fasla) of these rates?`;
      options = [`Rs ${rangePr} (Calculated as Peak Max minus Floor Min!)`, `Rs ${top}`, `Rs ${bottom}`, `Rs ${top + bottom}`];
      correct = 0;
      hint = "Formula for Fasla is: Range = (Maximum value) - (Minimum value). Settle subtraction!";
    } 
    else if (subId.includes("basics")) {
      const n1 = - (i * 6);
      const n2 = - (i * 2 + 1);
      question = `[${levelText} - Q${i}] Help the crocodile in ${term} pick the larger value between negative balances: ${n1} vs ${n2}.`;
      options = [`${n1}`, `${n2} represents a smaller negative debt, so it is larger!`, "Both are equal values", "Zero is smaller than both"];
      correct = 1;
      hint = "Compare which number lies further right (closer to zero) on the horizontal axis.";
    } 
    else if (subId.includes("decimals")) {
      const decA = (12.4 + i * 0.05).toFixed(2);
      const decB = (12.04 + i * 0.05).toFixed(2);
      question = `[${levelText} - Q${i}] A decimal weight gauge in ${term} shows Lot A: ${decA}g and Lot B: ${decB}g. Which relationship is correct?`;
      options = [`${decA} is greater than ${decB} (tenths place 4 is bigger than 0!)`, `${decA} is smaller than ${decB}`, "They are equivalent weight", "Both are less than 12g"];
      correct = 0;
      hint = "Convert to hundreds comparison: compare tenths digit first, then move right.";
    } 
    else if (subId.includes("rounding")) {
      const valBill = (299.75 + i * 0.05).toFixed(2);
      const wholeRupeeResult = Math.round(parseFloat(valBill));
      question = `[${levelText} - Q${i}] A shopping bill at ${term} comes to Rs. ${valBill}. Round the total to the nearest whole rupee integer standard.`;
      options = [`Rs. ${wholeRupeeResult - 10}`, `Rs. ${wholeRupeeResult} (Round up because the paisa decimal is greater than or equal to .50 Paise!)`, `Rs. ${Math.floor(parseFloat(valBill))}`, `Rs. ${wholeRupeeResult + 5}`];
      correct = 1;
      hint = "Check the decimal coins index. If >= .50, round UP to next rupee. Otherwise, round DOWN.";
    } 
    else if (subId.includes("place")) {
      const original = 84100 + i * 720;
      const thousandsVal = Math.floor((original % 10000) / 1000);
      question = `[${levelText} - Q${i}] In the coordinate street value code ${original}, what is the place value of the digit located in the Thousands (Hazaar) place?`;
      options = [`${thousandsVal * 100} units`, `Exactly ${thousandsVal * 1000} (The digit is value ${thousandsVal} in thousands peg column!)`, `Exactly 80,000`, `10 units`];
      correct = 1;
      hint = "Positions are: units, tens, hundreds, thousands, ten-thousands. Extract the fourth column digit and multiply by 1000.";
    } 
    else {
      // compare_order
      const seqStr = `-${i * 3}, -${i}, 0, ${i + 12}`;
      question = `[${levelText} - Q${i}] Arrange these integers in a logical ascending (Kram) order queue (smallest first): [${i + 12}, 0, -${i}, -${i * 3}].`;
      options = [
        `[${i + 12}, 0, -${i}, -${i * 3}]`,
        `[${seqStr}] (Accurately sorted with furthest negative value first!)`,
        `[0, -${i}, -${i * 3}, ${i + 12}]`,
        `[${i + 12}, -${i * 3}, -${i}, 0]`
      ];
      correct = 1;
      hint = "Ascending kram starts with the deepest sub-zero negative debt and steps up towards positive values.";
    }

    list.push({
      id: `${topicId}_${subId}_quiz_q_${i}`,
      question,
      options,
      correct,
      hint
    });
  }
  return list;
}
