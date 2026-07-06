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
  "Tara", "Rohan", "Maths Dost", "Lassi Dost", "Kite Flyer Chacha",
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
      let targetX = 0;
      let targetY = 0;
      if (difficulty === "beginner") {
        // Beginner: Standard positive quadrant coordinates (Class 6)
        targetX = (i % 4) + 1;
        targetY = ((i * 2) % 4) + 1;
      } else if (difficulty === "intermediate") {
        // Intermediate: Mixed positive & negative integers (Class 7)
        targetX = ((i * 2) % 9) - 4;
        targetY = ((i * 3) % 9) - 4;
      } else {
        // Expert: Fractional or challenging outer boundaries (Class 8)
        targetX = ((i * 3) % 11) - 5;
        targetY = ((i * 4) % 11) - 5;
        if (targetX === 0) targetX = -3;
        if (targetY === 0) targetY = 3;
      }
      title = `Drill #${i}: Pinpoint Coordinate at ${place}`;
      instruction = `Doston! ${char} wants you to pinpoint the exact 0D location for Shop #${i} at Coordinate (X: ${targetX}, Y: ${targetY}) on our green chalkboard grid. Click exactly at (X: ${targetX}, Y: ${targetY}) to unlock!`;
      targetValue = { x: targetX, y: targetY };
    } 
    else if (activeSubId.includes("rekha")) {
      type = "line_touch";
      let shift = 0;
      if (difficulty === "beginner") {
        // Beginner: Aligned with standard axes axis shift (y = 0 or near)
        shift = 0;
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard integer offset shift
        shift = (i % 4) - 2; // custom shift values: -2, -1, y=0, 1
      } else {
        // Expert: Precision outer offset shift
        shift = (i % 6) - 3;
        if (shift === 0) shift = -2;
      }
      title = `Drill #${i}: Endless Rekha Alignment`;
      instruction = `Draw an endless Rekha (Line) extending infinitely in both directions. Tap twice to project a line passing perfectly through a virtual offset at y = ${shift}. Match double-ended arrows!`;
      targetValue = { shift };
    } 
    else if (activeSubId.includes("khand")) {
      type = "range_slider";
      let lengthGoal = 5;
      if (difficulty === "beginner") {
        // Beginner: Simple short integer lengths
        lengthGoal = (i % 3) + 4; // 4cm, 5cm, 6cm
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard integer lengths
        lengthGoal = (i % 6) + 7; // 7cm to 12cm
      } else {
        // Expert: Longer spans or precise measurements
        lengthGoal = (i % 8) + 13; // 13cm to 20cm
      }
      title = `Drill #${i}: Measure Segment to Millimeter`;
      instruction = `Measure a crisp Rekha-khand (Segment) with your ruler measuring EXACTLY ${lengthGoal} cm. Adjust the slider points to clamp the boundary endpoints!`;
      targetValue = lengthGoal;
    } 
    else if (activeSubId.includes("kiran")) {
      type = "line_touch";
      let startX = 0;
      let angleVal = 90;
      if (difficulty === "beginner") {
        // Beginner: Standard right angle beams
        startX = (i % 3) - 1;
        angleVal = (i % 2 === 0) ? 90 : 180;
      } else if (difficulty === "intermediate") {
        // Intermediate: Traditional acute/obtuse angles
        startX = (i % 5) - 2;
        angleVal = (i * 15 + 15) % 180; // 30, 45, 60, 90 etc.
      } else {
        // Expert: Tricky uneven degree marks
        startX = (i % 7) - 3;
        angleVal = (i * 13 + 27) % 180;
      }
      title = `Drill #${i}: Kiran Laser Projector`;
      instruction = `Aim the laser ray (Kiran) originating from bulb point A(${startX}, 0) firing straight towards the horizon at an angle of EXACTLY ${angleVal} degrees. Click to fire!`;
      targetValue = { startX, angle: angleVal };
    } 
    else if (activeSubId.includes("shikhar")) {
      type = "point_hunt";
      let xCorner = 0;
      let yCorner = 0;
      if (difficulty === "beginner") {
        // Beginner: Vertex near center / origin
        xCorner = 1;
        yCorner = 1;
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard layout intersection
        xCorner = (i % 7) - 3;
        yCorner = (i % 5) - 2;
      } else {
        // Expert: Difficult multi-crossing corner coordinates
        xCorner = ((i * 3) % 9) - 4;
        yCorner = ((i * 2) % 9) - 4;
      }
      title = `Drill #${i}: Target Apex Vertex`;
      instruction = `Click the Converging Vertex apex (Shikhar) where two angled beams collide. Spot the intersection point of the samosa corner at exactly (${xCorner}, ${yCorner})!`;
      targetValue = { x: xCorner, y: yCorner };
    } 
    else if (activeSubId.includes("max")) {
      type = "range_slider";
      let maxVal = 100;
      if (difficulty === "beginner") {
        // Beginner: Standard positive numbers under 200
        maxVal = i * 8 + 50;
        const o1 = maxVal - 15;
        const o2 = maxVal - 30;
        title = `Drill #${i}: Peak Integer Spotter`;
        instruction = `Compare the quantities: [25, ${o1}, ${maxVal}, ${o2}]. Lock the slider bracket onto the Maximum peak number (${maxVal})!`;
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard sports runs comparative datasets
        maxVal = i * 20 + 130;
        const o1 = maxVal - 60;
        const o2 = maxVal - 25;
        title = `Drill #${i}: IPL Peak Run Spotter`;
        instruction = `Analyze the run totals: [110, ${maxVal}, ${o1}, ${o2}]. Set the bracket slider lock to capture the Maximum peak runs of ${maxVal}!`;
      } else {
        // Expert: Decimals comparison challenge
        maxVal = parseFloat((i * 1.75 + 14.5).toFixed(2));
        const o1 = parseFloat((maxVal - 1.25).toFixed(2));
        const o2 = parseFloat((maxVal - 0.75).toFixed(2));
        title = `Drill #${i}: Peak Micro-Decimal Tracker`;
        instruction = `Evaluate the coordinates: [10.25, ${o1}, ${o2}, ${maxVal}]. Find the maximum limit coefficient and slide the scale lock to ${maxVal}!`;
      }
      targetValue = maxVal;
    } 
    else if (activeSubId.includes("min")) {
      type = "range_slider";
      let minVal = 10;
      if (difficulty === "beginner") {
        // Beginner: Simple single positive digit minimums
        minVal = (i % 5) + 2;
        const o1 = minVal + 5;
        const o2 = minVal + 12;
        title = `Drill #${i}: Minimum Shop Price Tag`;
        instruction = `Examine prices: [Rs ${o1}, Rs ${minVal}, Rs ${o2}, Rs 40]. Slide-check and select the absolute cheapest minimum rate: Rs. ${minVal}!`;
      } else if (difficulty === "intermediate") {
        // Intermediate: Negative integer temperatures
        minVal = -((i % 6) * 4 + 3); // -3, -7, -11, -15, -19, -23
        title = `Drill #${i}: Sub-Zero Coldest Locker`;
        instruction = `Identify the minimum temperature from logs: [0°C, -2°C, ${minVal}°C, 12°C]. Set the selector to latch onto the absolute coldest value: ${minVal}°C!`;
      } else {
        // Expert: Extreme sub-zero precise decimals
        minVal = -parseFloat(((i % 5) * 4.35 + 10.5).toFixed(2)); // e.g., -10.5, -14.85
        const o1 = parseFloat((minVal + 4).toFixed(2));
        title = `Drill #${i}: Scientific Cryo-Locker Freeze`;
        instruction = `A laboratory freezer records logs: [0.0°C, ${o1}°C, ${minVal}°C, -5.2°C]. Slide the dial to verify the absolute minimum peak cold: ${minVal}°C!`;
      }
      targetValue = minVal;
    } 
    else if (activeSubId.includes("range")) {
      type = "range_slider";
      let rangeVal = 10;
      if (difficulty === "beginner") {
        // Beginner: Simple range (Fasla) of positive numbers
        const lower = i * 2 + 5;
        const upper = lower + (i % 6) + 12;
        rangeVal = upper - lower;
        title = `Drill #${i}: Elementary Yardstick Span`;
        instruction = `A ruler segment starts at ${lower} cm and caps at ${upper} cm. Settle the span offset (Range = Max - Min) which equals ${rangeVal} cm. Clamp the slider!`;
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard range between upper and basic prices
        const upper = (i % 5) * 20 + 150;
        const lower = (i % 4) * 10 + 20;
        rangeVal = upper - lower;
        title = `Drill #${i}: Price Fasla Spread`;
        instruction = `At ${place}, upper cap is Rs ${upper} and basic is Rs ${lower}. Check the spectrum distance (Fasla Range) = Upper - Lower, which is Rs ${rangeVal}. Set slider to Rs ${rangeVal}!`;
      } else {
        // Expert: Range between a negative temperature and a positive temperature (Class 8 integers)
        const lower = -((i % 5) * 5 + 5); // negative floor: -5 to -25
        const upper = (i % 4) * 10 + 15; // positive ceiling: 15 to 45
        rangeVal = upper - lower; // spans sub-zero to positive
        title = `Drill #${i}: Thermal Amplitude Spectrum`;
        instruction = `The coldest cargo reading is ${lower}°C and peak thermal is ${upper}°C. Find the temperature range distance: Range = Peak(${upper}) - Floor(${lower}) = ${rangeVal}°C. Slide to ${rangeVal}!`;
      }
      targetValue = rangeVal;
    } 
    else if (activeSubId.includes("basics")) {
      type = "decimal_battle";
      let larger = 0;
      let smaller = 0;
      if (difficulty === "beginner") {
        // Beginner: Standard whole numbers compare
        larger = i * 5 + 23;
        smaller = larger - (i % 4) - 5;
        title = `Drill #${i}: Crocodile Number Muncher`;
        instruction = `Gator open mouth always eats the larger value to satisfy his belly! Choose between: ${larger} vs ${smaller}. Click the larger number!`;
      } else if (difficulty === "intermediate") {
        // Intermediate: Negative integer comparator
        larger = -((i % 8) + 2); // e.g. -2, -3...
        smaller = larger - ((i % 5) + 3); // always smaller
        title = `Drill #${i}: Negative Numbers Comparator`;
        instruction = `Gator open mouth always eats the larger value (closer to 0 on negative scale)! Choose between negative values: ${larger} or ${smaller}. Click the larger number!`;
      } else {
        // Expert: Negative decimals comparison
        const valLg = -parseFloat(((i % 5) * 0.75 + 1.25).toFixed(2));
        const valSm = parseFloat((valLg - 2.15).toFixed(2));
        larger = valLg;
        smaller = valSm;
        title = `Drill #${i}: Sub-Zero Decimal Gator Duel`;
        instruction = `The cryogenic scale triggers comparative locks. Settle which is bigger: ${larger} or ${smaller}. Click the larger value!`;
      }
      targetValue = larger;
    } 
    else if (activeSubId.includes("decimals")) {
      type = "decimal_battle";
      let dec1 = "";
      let dec2 = "";
      if (difficulty === "beginner") {
        // Beginner: Simple Tenths place comparison
        dec1 = (0.5 + (i % 4) * 0.1).toFixed(1);
        dec2 = (0.1 + (i % 4) * 0.1).toFixed(1);
      } else if (difficulty === "intermediate") {
        // Intermediate: Tenths vs Hundredths
        dec1 = (0.2 + (i % 6) * 0.12).toFixed(2);
        dec2 = (0.02 + (i % 6) * 0.12).toFixed(2);
      } else {
        // Expert: Hundredths vs Thousandths precision comparison (Class 8 level)
        dec1 = (0.455 + (i % 5) * 0.025).toFixed(3);
        dec2 = (0.451 + (i % 5) * 0.025).toFixed(3);
      }
      title = `Drill #${i}: Tenths vs Hundredths Scale`;
      instruction = `Compare the decimal grid weights: ${dec1} vs ${dec2}. Click the larger value to feed the gator and earn XP!`;
      targetValue = parseFloat(dec1) > parseFloat(dec2) ? parseFloat(dec1) : parseFloat(dec2);
      // Wait, let's keep targetValue matching the exact string representation because decimal_battle looks for a match on string click or numeric value. Let's make it the larger value!
      targetValue = parseFloat(dec1) > parseFloat(dec2) ? parseFloat(dec1) : parseFloat(dec2);
    } 
    else if (activeSubId.includes("rounding")) {
      type = "rounding_match";
      let baseNum = "";
      let expectedRounded = 0;
      if (difficulty === "beginner") {
        // Beginner: Round to nearest 10 (Class 6 syllabus)
        const base = i * 6 + 143;
        expectedRounded = Math.round(base / 10) * 10;
        baseNum = base.toString();
        title = `Drill #${i}: Rounding to Nearest Ten`;
        instruction = `A cargo cart leaves with ${baseNum} crates. Round the inventory to the nearest TEN. Settle exactly on ${expectedRounded}!`;
      } else if (difficulty === "intermediate") {
        // Intermediate: Nearest Rupee whole number (Class 7)
        baseNum = (10.15 + i * 1.55).toFixed(2);
        expectedRounded = Math.round(parseFloat(baseNum));
        title = `Drill #${i}: Nearest Rupee Bill Rounding`;
        instruction = `A customer submits a raw market bill of Rs ${baseNum}. Round it off to the nearest whole rupee! Settle precisely on Rs. ${expectedRounded}.`;
      } else {
        // Expert: Rounding decimal coefficient to nearest tenths / 1st decimal digit
        const raw = 4.215 + i * 0.137;
        baseNum = raw.toFixed(3);
        expectedRounded = parseFloat(raw.toFixed(1));
        title = `Drill #${i}: Positional Tenths Rounding`;
        instruction = `A high-precision balance calibrator clocks coordinate scale ${baseNum}. Round it to the nearest Tenths (1 decimal place) precisely! Settle on ${expectedRounded}.`;
      }
      targetValue = { original: baseNum, expected: expectedRounded };
    } 
    else if (activeSubId.includes("place")) {
      type = "decimal_battle";
      let digits = 12000;
      let targetDigit = 0;
      if (difficulty === "beginner") {
        // Beginner: standard units or tens position
        digits = 300 + i * 15;
        targetDigit = Math.floor((digits % 100) / 10);
        title = `Drill #${i}: Units and Tens Place value`;
        instruction = `Look at label ${digits}. What single digit value represents the TENS (Dahai) position? Enter ${targetDigit}!`;
      } else if (difficulty === "intermediate") {
        // Intermediate: standard thousands/abacus columns
        digits = 12000 + i * 450;
        targetDigit = Math.floor((digits % 1000) / 100);
        title = `Drill #${i}: Rod Peg Abacus Place`;
        instruction = `Unlock the safe at ${place} with code ${digits}. Find which single digit occupies the HUNDREDS (Sau) place value. Enter ${targetDigit}!`;
      } else {
        // Expert: decimals place positions (tenths or hundredths place) (Class 8 standard decimal places)
        const decVal = parseFloat((4.567 + i * 0.112).toFixed(3));
        digits = decVal as any; // display decimals instead
        targetDigit = Math.floor((decVal * 100) % 10); // get second decimal digit (hundredths place)
        title = `Drill #${i}: Micro Decimal Hundredths Place`;
        instruction = `Evaluate key measurement ${decVal}. Tell Maths Dost which single digit sits in the Hundredths (Sau-va bhaag) decimal place index. Enter ${targetDigit}!`;
      }
      targetValue = targetDigit;
    } 
    else {
      // compare_order
      type = "decimal_battle";
      let larger = 0;
      let smaller = 0;
      if (difficulty === "beginner") {
        // Beginner: positive integer order compare
        larger = i * 22 + 10;
        smaller = i * 22 - 8;
        title = `Drill #${i}: Ascending Order Staircase`;
        instruction = `Let's practice ordering numbers! Between positive scores: ${larger} vs ${smaller}, which is smaller and starts the staircase? Click ${smaller}!`;
        targetValue = smaller;
      } else if (difficulty === "intermediate") {
        // Intermediate: standard negative debt compare
        const baseNum = i * 8;
        larger = -baseNum;
        smaller = -150;
        title = `Drill #${i}: Ascent Stair Master`;
        instruction = `Calculate ascending stair starts. Which value represents larger ledger debt (smallest value): -150 or -${baseNum}? Click -150!`;
        targetValue = -150;
      } else {
        // Expert: decimals sorting compare
        const decLg = -parseFloat((1.5 + i * 0.25).toFixed(2));
        const decSm = -parseFloat((4.75 + i * 0.25).toFixed(2));
        larger = decLg;
        smaller = decSm;
        title = `Drill #${i}: Scientific Decimals Ascent`;
        instruction = `Determine the deepest value in negative space (smallest coordinate): ${larger} vs ${smaller}. Click the smaller value, which is ${smaller}!`;
        targetValue = smaller;
      }
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
export function getGeometryStoryDetails(subId: string, i: number, place: string, char: string): { title: string; narration: string; choices: { text: string; correct: boolean; rewardXp: number }[] } {
  const idx = i - 1;
  const isBindu = subId.includes("bindu");
  const isRekha = subId.includes("rekha");
  const isKhand = subId.includes("khand");
  const isKiran = subId.includes("kiran");
  const isShikhar = subId.includes("shikhar");
  
  if (isBindu) {
    const binduStories = [
      {
        title: "Salim's Potato Ink Spot",
        narration: `Tara is buying potatoes from Salim in ${place}. He marks a tiny ink dot (Bindu) on a paper bag. 'Behna, look! This dot marks the exact coordinate of our weight scale, but has absolutely no length or width!' What is its dimension?`,
        choices: [
          { text: "0 Dimensions (Zero size, only tells exact pos!)", correct: true, rewardXp: 15 },
          { text: "1 Dimension (Flat line length)", correct: false, rewardXp: 0 },
          { text: "2 Dimensions (Flat sheet surface)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Diya's Balloon Target Pinprick",
        narration: `At ${place}, Diya the balloon seller pins a tiny needle on the blackboard. 'This needle point represents purely position, no height, no width!' How many lengths can you measure on a single point?`,
        choices: [
          { text: "Zero length (We cannot measure it as it is zero-dimensional!)", correct: true, rewardXp: 15 },
          { text: "Exactly 1 cm", correct: false, rewardXp: 0 },
          { text: "Infinite length", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Officer Amit's Laser Scanner",
        narration: `Metro Guard Amit in ${place} points a laser tag scanning beacon on a card. The red spot is so small, representing a coordinate location. Does a mathematical point have physical height or thickness?`,
        choices: [
          { text: "Strictly NO height, width, area or thickness!", correct: true, rewardXp: 15 },
          { text: "Yes, it has 1 mm thickness", correct: false, rewardXp: 0 },
          { text: "It has only height but no width", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Lassi Wala's Saffron Rabdi Drop",
        narration: `Lassi Dost in ${place} drops a tiny drop of orange saffron rabdi on a foam cup to mark your special sugar-free glass. How much surface area on the cup does a true mathematical point occupy?`,
        choices: [
          { text: "Zero area (A point is 0-dimensional, occupying no area!)", correct: true, rewardXp: 15 },
          { text: "1 square millimeter", correct: false, rewardXp: 0 },
          { text: "Infinite area", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Coach Amit's Bat Crease Tip",
        narration: `Cricket Coach Amit at ${place} taps the very tip of his wooden wickets marker chalk on the soil. 'This spot marks our batsman's foot guard!' How many lines can intersect at this single marking point?`,
        choices: [
          { text: "An INFINITE number of straight lines can pass through it!", correct: true, rewardXp: 15 },
          { text: "Exactly one line only", correct: false, rewardXp: 0 },
          { text: "Exactly two lines only", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Raju's Chai Table Cardamom Seed",
        narration: `Tea-stall Raju in ${place} handles a single small cardamom seed on the table. He says: 'In math, a point indicates a location.' What defines a point in coordinate geometry?`,
        choices: [
          { text: "Position but absolutely no size or area", correct: true, rewardXp: 15 },
          { text: "Size but no position", correct: false, rewardXp: 0 },
          { text: "Both size and position", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Auto Wale CP GPS Blue Dot",
        narration: `Your active taxi GPS driver in ${place} checks his screen map. A tiny flashing blue dot shows your car location. If the dot represents a point, what does it map?`,
        choices: [
          { text: "A exact zero-dimensional location coordinates on the map grid", correct: true, rewardXp: 15 },
          { text: "A one-dimensional road length", correct: false, rewardXp: 0 },
          { text: "A wide flat sector area", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Rehman's Kite Pinhole",
        narration: `Expert Kite Maker Rehman in ${place} punches a tiny pinhole on a paper kite to secure the thin thread. What represents this pinhole geometrically?`,
        choices: [
          { text: "A Point (Bindu) marking position", correct: true, rewardXp: 15 },
          { text: "A Line segment (Khand)", correct: false, rewardXp: 0 },
          { text: "A Ray (Kiran)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Sonu's Kulfi Stick Tip Marker",
        narration: `Kulfi seller Sonu in ${place} shows a sharp pointed wooden stick. 'Look! The extreme point makes the base position.' How many dimensions does this tip point have?`,
        choices: [
          { text: "0 Dimensions (Only a point)", correct: true, rewardXp: 15 },
          { text: "1 Dimension (Line segment)", correct: false, rewardXp: 0 },
          { text: "2 Dimensions (Surface circle)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Chaman's Sadr Silver Foil Point",
        narration: `Sweet Maker Chaman in ${place} places one tiny silver edible foil dot right at the center of a kaju katli. What geometry element best models this silver dot?`,
        choices: [
          { text: "A Point", correct: true, rewardXp: 15 },
          { text: "A Line segment", correct: false, rewardXp: 0 },
          { text: "A standard angle vertex", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Dost's Pole Star Landmark",
        narration: `Looking up at ${place}, Maths Dost points to the bright North Star. 'It looks like a tiny glowing dot to us because of distance.' From our view, it behaves as:`,
        choices: [
          { text: "A point indicating a directional sky spot", correct: true, rewardXp: 15 },
          { text: "An endless physical vector", correct: false, rewardXp: 0 },
          { text: "A flat paper sheet", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Damp Rain Spot on Ancient Marble",
        narration: `Walking around a monument in ${place}, a single raindrop falls right on the marble floor and creates an exact circular stamp point. This single spot is a:`,
        choices: [
          { text: "Point of position", correct: true, rewardXp: 15 },
          { text: "Endless vector trail", correct: false, rewardXp: 0 },
          { text: "A measuring segment", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Gold Merchant Scale Balance Pin",
        narration: `A gold merchant in ${place} utilizes a precision weighing apparatus. The center balancing pin sits exactly motionless. The needle tip represents:`,
        choices: [
          { text: "The balance point of center rotation", correct: true, rewardXp: 15 },
          { text: "A long line segment length", correct: false, rewardXp: 0 },
          { text: "An endless ray beam", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Bus Conductor's Ticket Punch Hole",
        narration: `The local DTC bus conductor in ${place} uses a metal lever to punch a single circular hole on your pass ticket. The center pivot of that hole represents:`,
        choices: [
          { text: "A geometric Point of coordinate", correct: true, rewardXp: 15 },
          { text: "An endless street path", correct: false, rewardXp: 0 },
          { text: "A shiny metal surface", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Palika Electronic Screen Pixel",
        narration: `An electronic map display in ${place} has one twinkling red pixel indicating the emergency fire hose location. A single pixel coordinate acts as a:`,
        choices: [
          { text: "Point on the grid coordinate", correct: true, rewardXp: 15 },
          { text: "Segment measuring 10 meters", correct: false, rewardXp: 0 },
          { text: "None of these", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Giant Swing Rotational Center Pin",
        narration: `A rotating swing in ${place} spins. The central iron pin does not move at all, staying still. This stationary rotational pivot represents:`,
        choices: [
          { text: "A central Point", correct: true, rewardXp: 15 },
          { text: "A measuring line segment", correct: false, rewardXp: 0 },
          { text: "A shiny round wheel rim", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Rohan's Watch Mechanical Dial Axle",
        narration: `Rohan looks at a ticking wall clock in ${place}. The clock hands rotate around a central brass pin. What geometrical element represents this static center axle?`,
        choices: [
          { text: "A Point of pivot", correct: true, rewardXp: 15 },
          { text: "An infinite ray beam", correct: false, rewardXp: 0 },
          { text: "A flat circle vector", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Compass Needle Sharp Base Pin",
        narration: `At a local heritage shop in ${place}, a magnetic navigation compass needle balances on a tiny sharp brass support pin. The needle tip has:`,
        choices: [
          { text: "Strictly 0 dimensions (Pure position indicator!)", correct: true, rewardXp: 15 },
          { text: "Exactly 1 dimension", correct: false, rewardXp: 0 },
          { text: "Exactly 2 dimensions", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Ten Rupee Coin Diamond Stamp",
        narration: `Rohan holds a 10 Rupee coin in ${place} and spots a tiny raised diamond point stamp indicating the Delhi government mint mark. What is this dot stamp?`,
        choices: [
          { text: "A Point on the coin's face", correct: true, rewardXp: 15 },
          { text: "A line segment dividing the coin", correct: false, rewardXp: 0 },
          { text: "A ray beam shooting off the coin", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Ancient Mughal Map Treasure X Spot",
        narration: `You discover a historical scroll of Delhi in ${place}. A tiny dot marked 'X' represents a buried royal Mughal lockbox. What does this 'X' dot represent?`,
        choices: [
          { text: "A simple coordinate Point on the map (No width/length, only location!)", correct: true, rewardXp: 15 },
          { text: "An endless straight pathway", correct: false, rewardXp: 0 },
          { text: "A long wooden timber segment", correct: false, rewardXp: 0 }
        ]
      }
    ];
    return binduStories[idx] || binduStories[0];
  }

  if (isRekha) {
    const rekhaStories = [
      {
        title: "Lajpat Long Clotheslines",
        narration: `Tara is walking through Lajpat Nagar in ${place} with ${char} where long straight steel cable clotheslines stretch continuously with double-ended hooks. 'Look at this endless stretch!' How many endpoints does this Rekha have?`,
        choices: [
          { text: "Strictly ZERO endpoints (It stretches endlessly on both sides!)", correct: true, rewardXp: 15 },
          { text: "Exactly 1 endpoint", correct: false, rewardXp: 0 },
          { text: "Exactly 2 fixed endpoints", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Endless Metro Railway Rails",
        narration: `At the station in ${place}, ${char} looks down the long steel railway tracks disappearing endlessly in both directions into a deep subway tunnel. How many boundaries does a Line (Rekha) have?`,
        choices: [
          { text: "No boundaries (0 endpoints, going both ways endlessly!)", correct: true, rewardXp: 15 },
          { text: "1 fixed ending", correct: false, rewardXp: 0 },
          { text: "2 fixed ending points", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Sadar Bazaar Telephone Wires",
        narration: `In Sadar Bazaar near ${place}, ${char} points to the straight overhead internet and telephone lines stretching infinitely straight along the main trade road with no beginning or end. This represent a:`,
        choices: [
          { text: "Line (Rekha) stretched endlessly", correct: true, rewardXp: 15 },
          { text: "Line Segment with endpoints", correct: false, rewardXp: 0 },
          { text: "A single coordinate dot", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "CP Straight Lane Paint Markers",
        narration: `In Connaught Place in ${place}, ${char} follows the straight painted line on the concrete road which passes the circular blocks and stretches straight to the horizon. This infinite line:`,
        choices: [
          { text: "Has zero endpoints and infinite length", correct: true, rewardXp: 15 },
          { text: "Has one endpoint and finite length", correct: false, rewardXp: 0 },
          { text: "Has two endpoints and 50m length", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Red Fort Parade Line Guide",
        narration: `At Red Fort near ${place}, ${char} looks at a long laser alignment cord that stretches without start or end straight across the grounds. What characterizes this line?`,
        choices: [
          { text: "It goes to infinity in both directions!", correct: true, rewardXp: 15 },
          { text: "It stops at the security booth", correct: false, rewardXp: 0 },
          { text: "It is a curved circle vector", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Feroz Shah High-Tension Cables",
        narration: `Near ${place}, ${char} points to the long electrical power line hanging between the steel pylons, straight as an arrow into the sunset. Geometrically, this line has:`,
        choices: [
          { text: "Zero endpoints (Continuous flow!)", correct: true, rewardXp: 15 },
          { text: "Two fixed clamps as math limits", correct: false, rewardXp: 0 },
          { text: "Only one generator origin", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Samosa Master's Stainless Steel Tray Groove",
        narration: `At the chaat stall in ${place}, Samosa Master ${char} shows a straight infinite ridge stamped on the display glass frame. He asks: 'A line is a set of points that goes forever. Can you measure its length?'`,
        choices: [
          { text: "No, a Rekha has INFINITE length and cannot be measured!", correct: true, rewardXp: 15 },
          { text: "Yes, it is exactly 30 cm", correct: false, rewardXp: 0 },
          { text: "Yes, it is exactly 5 meters", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Auto Wale Uncle's Endless Flat Highway",
        narration: `Driving through the bypass of ${place}, Auto Wale Uncle points to a straight, infinite expressway lane dividing line that runs straight forward and straight behind. It is a:`,
        choices: [
          { text: "Rekha (Line with double arrow heads)", correct: true, rewardXp: 15 },
          { text: "Rekha-Khand (Segment with endpoints)", correct: false, rewardXp: 0 },
          { text: "Kiran (Ray starting from car)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Metro Passenger's Yellow Tactile Rail Line",
        narration: `Waiting at the platform in ${place}, ${char} stands on the straight textured tactile yellow rail on the platform floor, running straight ahead and back as far as you can see. This lines represent:`,
        choices: [
          { text: "A physical representation of an infinite line", correct: true, rewardXp: 15 },
          { text: "A 5 cm segment limit", correct: false, rewardXp: 0 },
          { text: "An angle of 90 degrees", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Daryaganj Book Storage Cord Guide",
        narration: `Sorting old novels in Daryaganj at ${place}, ${char} pulls a straight cotton binding rope that runs endlessly straight through a sequence of sorting tables with double hooks. What is the amount of endpoints?`,
        choices: [
          { text: "Zero endpoints (It represents an endless line!)", correct: true, rewardXp: 15 },
          { text: "One endpoint", correct: false, rewardXp: 0 },
          { text: "Two endpoints", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Chawri Bazar Steel Laser Cutter Rail",
        narration: `At a mechanical bazaar in ${place}, ${char} points to the continuous straight laser slide rail on a heavy metal deck. If it stretches infinitely, how many starting and ending points are defined?`,
        choices: [
          { text: "Strictly none", correct: true, rewardXp: 15 },
          { text: "Exactly one source point", correct: false, rewardXp: 0 },
          { text: "Exactly two bounding screws", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Delhi Metro Power Supply Pantograph Line",
        narration: `Looking up near the tracks of ${place}, ${char} observes the live high-voltage steel copper cable running straight and flat overhead, guiding the fast train. This infinite straight line is called:`,
        choices: [
          { text: "A Line (Rekha)", correct: true, rewardXp: 15 },
          { text: "A Line Segment (Khand)", correct: false, rewardXp: 0 },
          { text: "A Point (Bindu)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Historic Canal Drainage Channel Alignment",
        narration: `At a heritage site in ${place}, ${char} stands beside a wide straight brick drainage channel line that channels rainwater. An endless straight path has which endpoints?`,
        choices: [
          { text: "None, it stretches endlessly!", correct: true, rewardXp: 15 },
          { text: "Exactly one vertex", correct: false, rewardXp: 0 },
          { text: "Exactly two endpoints", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "India Gate Parade Visual Axis",
        narration: `Walking on the central median of Rajpath at ${place}, ${char} looks at the straight pathway extending infinitely between the Delhi horizons. A line segment differs from this infinite line because:`,
        choices: [
          { text: "A segment has 2 endpoints and finite length, while a line goes forever!", correct: true, rewardXp: 15 },
          { text: "A segment has 0 endpoints and is longer", correct: false, rewardXp: 0 },
          { text: "They are completely identical in geometry", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Lodi Garden Parallel Jogging Wire",
        narration: `Under the old banyan trees of ${place}, ${char} points to a thin guide wire running straight along the path, stretching without bounds. A line's width is:`,
        choices: [
          { text: "Zero width (It is 1-dimensional, having only length!)", correct: true, rewardXp: 15 },
          { text: "Exactly 1 inch", correct: false, rewardXp: 0 },
          { text: "1 millimeter thick", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Khan Market Boutique Pattern Ribbon",
        narration: `At a designer boutique in ${place}, ${char} unrolls straight long border tape. If we extend its straight path endlessly in both directions, we transform it into a:`,
        choices: [
          { text: "Rekha (Endless Line)", correct: true, rewardXp: 15 },
          { text: "Kiran (Ray)", correct: false, rewardXp: 0 },
          { text: "Shikhar (Vertex)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Okhla Bypass Security Perimeter laser",
        narration: `Monitoring the freight terminal at ${place}, ${char} looks at double-sided laser fence beams reflecting between mirrors. This infinite straight light path represents:`,
        choices: [
          { text: "A line (Rekha)", correct: true, rewardXp: 15 },
          { text: "A point", correct: false, rewardXp: 0 },
          { text: "An angle", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Cricket Pitch Boundary Guideline",
        narration: `At the wickets of ${place}, ${char} points to the long straight chalk line extending across the pitch field. A mathematical line contains how many points?`,
        choices: [
          { text: "An infinite number of points!", correct: true, rewardXp: 15 },
          { text: "Exactly one point", correct: false, rewardXp: 0 },
          { text: "Exactly 100 points", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Metro Station Ceiling Support Grid Beam",
        narration: `Looking up at the station of ${place}, ${char} points to the straight aluminum tracks holding the ceiling lights. Symbolically, a line is written with:`,
        choices: [
          { text: "Two arrows on top (↔) to show infinite flight!", correct: true, rewardXp: 15 },
          { text: "A flat line without arrows (—)", correct: false, rewardXp: 0 },
          { text: "A single dot on top", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Palika Bazaar Underground Conveyor Baseline",
        narration: `At ${place} market, ${char} identifies a straight steel conveyor axis traveling forever straight under the floor slabs. What is its dimensions?`,
        choices: [
          { text: "One Dimension (It has only length, no width or height!)", correct: true, rewardXp: 15 },
          { text: "Zero Dimensions", correct: false, rewardXp: 0 },
          { text: "Two Dimensions", correct: false, rewardXp: 0 }
        ]
      }
    ];
    return rekhaStories[idx] || rekhaStories[0];
  }

  if (isKhand) {
    const khandStories = [
      {
        title: "Salim's Sliced Green Bean",
        narration: `Tara is buying green beans from Salim in ${place}. He snaps a raw organic green bean cleanly on both ends to make a crisp segment for the weight scale basket. Why is this snapped bean a Rekha-khand (Segment)?`,
        choices: [
          { text: "It has exactly two fixed endpoints and measurable finite length!", correct: true, rewardXp: 15 },
          { text: "It has only one endpoint", correct: false, rewardXp: 0 },
          { text: "It stretches to infinity like an endless line", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Rehman's Kite Bamboo Rib",
        narration: `At the kite shop in ${place}, Rehman cuts a straight bamboo splint measuring exactly 12 cm to build the horizontal frame. What represents this splint?`,
        choices: [
          { text: "A Line Segment (Rekha-khand)", correct: true, rewardXp: 15 },
          { text: "An endless Rekha", correct: false, rewardXp: 0 },
          { text: "A Kiran (Ray)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Officer Amit's Ticket Gate Barrier Bar",
        narration: `At the station in ${place}, Metro Guard Amit points to the straight wooden gate barrier bar that blocks entry, bounded by two endpoints. This barrier behaves as a:`,
        choices: [
          { text: "Line Segment with 2 endpoints", correct: true, rewardXp: 15 },
          { text: "Infinite line with 0 endpoints", correct: false, rewardXp: 0 },
          { text: "Ray with 1 endpoint", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Raju's Tea Stirrer Plastic Straw",
        narration: `At the tea stall in ${place}, Raju snaps a plastic stirrer straw at exactly 15 cm and drops it into a clay cup of cardamon tea. Can we measure its exact length?`,
        choices: [
          { text: "Yes, because segments are bounded on both sides and have a fixed length!", correct: true, rewardXp: 15 },
          { text: "No, stirrer straws go to infinity", correct: false, rewardXp: 0 },
          { text: "Only if we count the molecular atoms", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Coach Amit's Wooden Cricket Wicket Bails",
        narration: `On the pitch at ${place}, Cricket Coach Amit places a small wooden bail measuring exactly 11 cm across three wickets. This bail is a segment because:`,
        choices: [
          { text: "Its endpoints are fixed and locked", correct: true, rewardXp: 15 },
          { text: "It is circular", correct: false, rewardXp: 0 },
          { text: "It travels endlessly into the outfield", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Lassi Dost's Silver Ladle Handle",
        narration: `Serving yogurt in ${place}, Lassi Dost holds a long silver ladle handle of exactly 30 cm. If we denote a line segment from endpoint A to endpoint B, we write it as:`,
        choices: [
          { text: "AB with a simple horizontal bar on top (AB̅)", correct: true, rewardXp: 15 },
          { text: "AB with arrows on both ends", correct: false, rewardXp: 0 },
          { text: "AB with a single arrow pointing right", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Diya's Balloon Display Timber Stick",
        narration: `Selling balloons near ${place}, Diya points to a straight wooden support stick measuring 60 cm. A line segment is a:`,
        choices: [
          { text: "Part of an infinite line containing all coordinates between two boundaries", correct: true, rewardXp: 15 },
          { text: "Set of three independent rays", correct: false, rewardXp: 0 },
          { text: "Curve that loops back on itself", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Sonu's Kulfi Stick Length Segment",
        narration: `Sonu the kulfi seller in ${place} snaps a flat wooden kulfi stick in half, showing a piece with two distinct jagged endpoint bounds. How many dimensions does this wood segment represent?`,
        choices: [
          { text: "1 Dimension (It represents a straight length!)", correct: true, rewardXp: 15 },
          { text: "0 Dimensions", correct: false, rewardXp: 0 },
          { text: "2 Dimensions", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Chaman's Sadr Sweet Tray Metal Divider",
        narration: `Inside the sweet shop of ${place}, Chaman places a polished brass dividing plate of exactly 40 cm across the barfi display. He asks: 'How many endpoints are on this tray divider?'`,
        choices: [
          { text: "Exactly two endpoints (one at each tray edge!)", correct: true, rewardXp: 15 },
          { text: "Exactly one endpoint", correct: false, rewardXp: 0 },
          { text: "None, it is infinite", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Bookstore Owner Rohit's Textbook Spine",
        narration: `At the bookstore in ${place}, Rohit holds a fresh algebra book and points to its straight Cover Spine measuring exactly 25 cm. If we cut a line, the remaining cut section with two ends is a:`,
        choices: [
          { text: "Line Segment (khand)", correct: true, rewardXp: 15 },
          { text: "Infinite line (rekha)", correct: false, rewardXp: 0 },
          { text: "Point (bindu)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Auto Rickshaw Steel Side Safety Bar",
        narration: `Riding an auto in ${place}, the driver taps a yellow metal safety tube measuring exactly 80 cm along the door entry. What characterizes this metal safety tube?`,
        choices: [
          { text: "It is bounded between two welded endpoint joints", correct: true, rewardXp: 15 },
          { text: "It expands endlessly as the cab drives", correct: false, rewardXp: 0 },
          { text: "It is zero dimensional", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Metro Passenger's Plastic Smart Card",
        narration: `On the metro in ${place}, a passenger holds a smart card and points to its straight top edge which measures exactly 8.5 cm. Geometrically, this edge is a:`,
        choices: [
          { text: "Line segment (Rekha-khand)", correct: true, rewardXp: 15 },
          { text: "Infinite line", correct: false, rewardXp: 0 },
          { text: "Ray beam", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Tailor's Cotton Ribbon Stitch Cut",
        narration: `At the tailor shop in ${place}, ${char} cuts a straight strip of green cotton tape of exactly 20 cm. This fabric strip has:`,
        choices: [
          { text: "2 distinct endpoints and definite, measurable length!", correct: true, rewardXp: 15 },
          { text: "1 endpoint and infinite length", correct: false, rewardXp: 0 },
          { text: "0 endpoints crossing cities", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Dilli Haat Food Court Hand-Painted Chopstick",
        narration: `At a food stall in ${place}, Samosa Master holds a straight wooden chopstick measuring exactly 18 cm. Can this chopstick expand infinitely?`,
        choices: [
          { text: "No, a line segment has a fixed, unchangeable length!", correct: true, rewardXp: 15 },
          { text: "Yes, if we pull the wood fibers", correct: false, rewardXp: 0 },
          { text: "It is actually 0-dimensional", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Delhi Metro platform safety yellow line",
        narration: `At the station in ${place}, ${char} points to a straight yellow segment painted on the floor of exactly 3 meters. What are the bounding endpoints?`,
        choices: [
          { text: "The two extreme terminal ends paint ticks", correct: true, rewardXp: 15 },
          { text: "Only the center metro emblem", correct: false, rewardXp: 0 },
          { text: "The infinite horizon tracks", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Red Fort Ancient Royal Brass Measuring Rod",
        narration: `Touring the museum at ${place}, ${char} shows a historic heavy brass yardstick from the Mughal empire. Its two endpoints represent a segment because:`,
        choices: [
          { text: "It is bounded and has a fixed numerical length scale!", correct: true, rewardXp: 15 },
          { text: "It glows in dark and is infinite", correct: false, rewardXp: 0 },
          { text: "It expands with heat to infinity", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Khan Market Boutique Designer Embroidery Needle",
        narration: `In Khan Market at ${place}, ${char} holds a steel embroidery needle measuring exactly 6 cm. If we connect its tip endpoint to its eye endpoint, we get a:`,
        choices: [
          { text: "Line segment (Rekha-khand)", correct: true, rewardXp: 15 },
          { text: "Ray beam (Kiran)", correct: false, rewardXp: 0 },
          { text: "Circle", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Okhla Bypass Courier Cardboard Box Edge",
        narration: `At a warehouse near ${place}, ${char} taps the straight cardboard edge of a shipping box, measuring exactly 50 cm. Which notation describes this segment?`,
        choices: [
          { text: "AB̅ (where A and B are the container corner points!)", correct: true, rewardXp: 15 },
          { text: "AB with double arrows", correct: false, rewardXp: 0 },
          { text: "A single coordinate dot", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Lodi Gardens Historical Signpost Support Bar",
        narration: `At the monument in ${place}, ${char} measures the black iron post supporting a garden map panel, measuring exactly 90 cm. A segment:`,
        choices: [
          { text: "Has finite boundaries on both ends", correct: true, rewardXp: 15 },
          { text: "Has zero boundaries going forever", correct: false, rewardXp: 0 },
          { text: "Is curved", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "CP Sidewalk Granite Block Border",
        narration: `Near the fountain at ${place}, ${char} points to a straight gray granite curbstone measuring exactly 45 cm. Segment length is:`,
        choices: [
          { text: "The straight coordinate distance between its two bounding endpoints!", correct: true, rewardXp: 15 },
          { text: "The speed of light across granite", correct: false, rewardXp: 0 },
          { text: "Absolutely infinite", correct: false, rewardXp: 0 }
        ]
      }
    ];
    return khandStories[idx] || khandStories[0];
  }

  if (isKiran) {
    const kiranStories = [
      {
        title: "Raju's LED Pocket Flashlight",
        narration: `At the tea stall in ${place}, Raju switches on a pocket laser. The bright beam originates at the lens diode and shoots straight into the bazaar. What is this ray?`,
        choices: [
          { text: "A Ray (Kiran) - starts at 1 source and flies endlessly in one direction!", correct: true, rewardXp: 15 },
          { text: "A Line Segment (Khand) with two fixed boundaries", correct: false, rewardXp: 0 },
          { text: "An endless Rekha with zero endpoints", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Rehman's Solar Sunbeam Alignment",
        narration: `Flying kites at ${place}, Rehman points up to a bright solar beam. 'This beam originates at the Sun and travels straight to Earth and beyond.' This sunbeam represents:`,
        choices: [
          { text: "A Kiran (Ray)", correct: true, rewardXp: 15 },
          { text: "A Line Segment", correct: false, rewardXp: 0 },
          { text: "A coordinate dot", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Officer Amit's Ticket Gate Sensor Pointer",
        narration: `At the gate of ${place}, Metro Guard Amit points to his gate's red optical sensor emitter. A tiny red laser stream shoots straight from the emitter lens infinitely. A ray has:`,
        choices: [
          { text: "Exactly ONE endpoint (its source origin lens!)", correct: true, rewardXp: 15 },
          { text: "Exactly two endpoints", correct: false, rewardXp: 0 },
          { text: "Strictly zero endpoints", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Samosa Master's Boiling Oil Steam Jet",
        narration: `At the food joint of ${place}, Samosa Master holds a laser pointer. The light originates from the glass reflector and shoots straight to check temperature. A ray with origin P is written as:`,
        choices: [
          { text: "PQ with a single arrow pointing right on top (PQ⃗)", correct: true, rewardXp: 15 },
          { text: "PQ with double arrows on top", correct: false, rewardXp: 0 },
          { text: "PQ with a flat bar on top", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Coach Amit's Bowling Coordinate Arrow",
        narration: `Training at the stadium in ${place}, Cricket Coach Amit shines a strong tactical torch from his clipboard to show a bowler the straight target line. How far does a true ray travel?`,
        choices: [
          { text: "Infinitely in one direction from its launch source!", correct: true, rewardXp: 15 },
          { text: "Exactly 22 yards to the wickets", correct: false, rewardXp: 0 },
          { text: "It stops after crossing the pitch gate", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Kite Flyer's Arrow Bow Guide",
        narration: `At ${place}, ${char} shoots a toy arrow from his bow. It starts at the string and flies straight ahead into the wind. This straight arrow flight represents:`,
        choices: [
          { text: "A Ray (Kiran)", correct: true, rewardXp: 15 },
          { text: "A Line Segment (Khand)", correct: false, rewardXp: 0 },
          { text: "A Point (Bindu)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Metro Passenger's Phone Flash Indicator",
        narration: `Waiting at the bus stop in ${place}, ${char} turns on her mobile phone flash. The brilliant beam originates at the silicon chip lens and shoots straight outward. The origin point is called:`,
        choices: [
          { text: "The starting vertex point (or origin!)", correct: true, rewardXp: 15 },
          { text: "The infinite barrier", correct: false, rewardXp: 0 },
          { text: "The decimal zero", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Sonu's Street Sign Direction Marker",
        narration: `At the market gate in ${place}, Sonu points to a painted signpost shaped like an arrow pointing to the right directory. A ray's path:`,
        choices: [
          { text: "Extends endlessly in one direction from its fixed tail", correct: true, rewardXp: 15 },
          { text: "Has bounded ends on both sides", correct: false, rewardXp: 0 },
          { text: "Is completely circular", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Chaman's Sadr Light Show Stage Beacon",
        narration: `Near the temples in ${place}, Chaman switches on a massive halogen lamp that shoots a powerful beam of yellow light up into the clouds. A ray is different from an endless line because:`,
        choices: [
          { text: "A ray has 1 starting point and goes one-way, while a line goes endless both ways!", correct: true, rewardXp: 15 },
          { text: "A ray goes both ways endlessly", correct: false, rewardXp: 0 },
          { text: "A line has 1 endpoint like a segment", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Automobile Bright Headlights Beam",
        narration: `On the bypass of ${place}, ${char} stands as a cargo truck shines its front xenon lamp. The light starts at the reflector and shoots endlessly ahead. A ray is a:`,
        choices: [
          { text: "One-dimensional structure having length extending endlessly in one direction!", correct: true, rewardXp: 15 },
          { text: "Zero-dimensional bright coordinate dot", correct: false, rewardXp: 0 },
          { text: "Two-dimensional illuminated circle", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Chawri Bazar Plasma Welding Gun",
        narration: `At a steel shop in Chawri Bazar near ${place}, ${char} watches an electric welding gun. The blue plasma jet starts at the copper tip electrode and shoots straight. This represents a:`,
        choices: [
          { text: "Ray (Kiran)", correct: true, rewardXp: 15 },
          { text: "Line segment (Khand)", correct: false, rewardXp: 0 },
          { text: "Infinite line (Rekha)", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Delhi Metro Power Supply Pantograph Sparks",
        narration: `On the tracks of ${place}, ${char} watches a bright green electric spark that originates at the train's contact brush and flies outward. This spark path is modeled as:`,
        choices: [
          { text: "A Ray starting at the brush origin", correct: true, rewardXp: 15 },
          { text: "An endless line with double arrows", correct: false, rewardXp: 0 },
          { text: "A zero dimensional static point", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Water Fountain High-Pressure Nozzle Spray",
        narration: `At the park fountain in ${place}, ${char} points to a high-speed water nozzle spraying a stream. The stream starts at the pump nozzle and jets into the air. What represents the origin?`,
        choices: [
          { text: "The nozzle aperture (its single endpoint!)", correct: true, rewardXp: 15 },
          { text: "The water molecule diameter", correct: false, rewardXp: 0 },
          { text: "The gravity center of the pond", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "India Gate High-Power Beacon Laser",
        narration: `At the monument in ${place}, ${char} watches the green laser beacon on top of the big stone arch which shoots from the lens into the sky. How many lines can start from that single lens point?`,
        choices: [
          { text: "An infinite number of different rays can originate from that single point!", correct: true, rewardXp: 15 },
          { text: "Only exactly one ray", correct: false, rewardXp: 0 },
          { text: "Exactly five rays only", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Lodi Gardens Gardener Garden Hose Sprayer",
        narration: `Watering paths in Lodi Gardens at ${place}, ${char} turns on an irrigation nozzle. The water flows from the metal trigger straight across the flower beds. A ray PQ⃗ represents:`,
        choices: [
          { text: "A ray starting at P and passing through Q to infinity", correct: true, rewardXp: 15 },
          { text: "A ray starting at Q and passing through P", correct: false, rewardXp: 0 },
          { text: "A line segment of fixed length PQ", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Boutique Storefront Neon Lighting Beam",
        narration: `At the clothes shop of ${place}, ${char} points to a glowing glass neon sign. The bright gas stream starts at the electrode pin and shoots forward. Does a ray have a measurable center?`,
        choices: [
          { text: "No, because any ray goes infinitely in one direction and has no midpoint!", correct: true, rewardXp: 15 },
          { text: "Yes, exactly in the middle of its glass cover", correct: false, rewardXp: 0 },
          { text: "Yes, 5 cm from its start", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Police Officer Security Patrol Torch",
        narration: `On patrol near ${place}, ${char} switches on a long black metal security torch. The light starts at the bulb filament and travels straight down the road. If the beam hits a solid wall, the segment between the torch and the wall becomes a:`,
        choices: [
          { text: "Line Segment (bounded by torch and wall endpoints!)", correct: true, rewardXp: 15 },
          { text: "Infinite line with double arrows", correct: false, rewardXp: 0 },
          { text: "Zero dimensional spot only", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Okhla Cargo Warehouse Freight Barcode Reader",
        narration: `At a depot in Okhla near ${place}, ${char} presses the scanner button pointing an infrared laser at a shipping tag. The infrared beam represents:`,
        choices: [
          { text: "A Ray traveling from scanner lens to box", correct: true, rewardXp: 15 },
          { text: "An infinite line crossing city grids", correct: false, rewardXp: 0 },
          { text: "A flat circular area", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Classroom Math Teacher Slide Projector Pointer",
        narration: `At a math class in ${place}, ${char} turns on a digital projector. The light starts at the lens focal spot and travels to the whiteboard wall. Geometrically, this projection beam is:`,
        choices: [
          { text: "A Ray (Kiran)", correct: true, rewardXp: 15 },
          { text: "A Point (Bindu)", correct: false, rewardXp: 0 },
          { text: "A closed triangle", correct: false, rewardXp: 0 }
        ]
      },
      {
        title: "Ancient Solar Dial Gnomon Shadow",
        narration: `Examining an old solar sundial in ${place}, ${char} points a stylus from the bronze gnomon apex. The shadow starts at the apex and goes straight to the dial. This shadow path is modeled as:`,
        choices: [
          { text: "A Ray starting at the gnomon apex", correct: true, rewardXp: 15 },
          { text: "An endless line with zero endpoints", correct: false, rewardXp: 0 },
          { text: "A single coordinate center", correct: false, rewardXp: 0 }
        ]
      }
    ];
    return kiranStories[idx] || kiranStories[0];
  }

  // default: isShikhar (Vertex)
  const shikharStories = [
    {
      title: "Chaat Wala's Samosa Corner Apex",
      narration: `At the street stall in ${place}, Samosa Master ${char} points to the top corner vertex of a crispy triangle. 'Where two delicious straight sheets meet at a point!' What is this meeting corner called?`,
      choices: [
        { text: "A Shikhar (Vertex) - the exact pointy corner where straight edges meet!", correct: true, rewardXp: 15 },
        { text: "An endless parallel line", correct: false, rewardXp: 0 },
        { text: "An infinite one-way ray beam", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Coach Amit's Cricket Fence Vertex",
      narration: `At the sports park in ${place}, Coach Amit points to the corner post of the security fence where the east boundary and the north boundary converge at right angles (90°). This meeting corner post is:`,
      choices: [
        { text: "An Angle Vertex (Shikhar) representing the corner intersection!", correct: true, rewardXp: 15 },
        { text: "A zero dimensional endless line", correct: false, rewardXp: 0 },
        { text: "A circle perimeter line", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Rehman's Kite Rib Crossing Joint",
      narration: `At the kite bazaar of ${place}, Rehman points to the precise central point where the curved bow rib and the vertical spine rib cross. This intersection vertex hosts:`,
      choices: [
        { text: "Four converging angles meeting at a single vertex point!", correct: true, rewardXp: 15 },
        { text: "One single straight line segment only", correct: false, rewardXp: 0 },
        { text: "Strictly zero endpoints", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Ancient Mughal Tomb Brick Arch Apex",
      narration: `Looking up at a mosque monument in ${place}, ${char} points to the pointy apex of a brick arch. Two curved slanted sandstone beams meet right at the crown. This arch pointy meet center represents a:`,
      choices: [
        { text: "Vertex (Shikhar) apex point of angles", correct: true, rewardXp: 15 },
        { text: "Measuring line segment segment", correct: false, rewardXp: 0 },
        { text: "Zero dimensional infinity lane", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Bookstore Owner Rohit's Textbook Cover Corner",
      narration: `At the bookstore of ${place}, Rohit points to the square corner of a heavy leather register diary, where the horizontal side and the vertical side meet. How many vertices does a standard rectangular cover possess?`,
      choices: [
        { text: "Exactly 4 vertices (four pointy corner corners!)", correct: true, rewardXp: 15 },
        { text: "Exactly 1 vertex", correct: false, rewardXp: 0 },
        { text: "Strictly zero vertices", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Dilli Haat Food Court Triangular Sandwich Vertex",
      narration: `Enjoying a tea break in ${place}, ${char} slices a cheese toast diagonally, showing a sharp 45-degree triangle corner point. In math, how do we write the angle ABC which has vertex B?`,
      choices: [
        { text: "As ∠ABC or ∠CBA (with the Vertex B in the dead center!)", correct: true, rewardXp: 15 },
        { text: "As ∠BAC with A in the center", correct: false, rewardXp: 0 },
        { text: "As AB + BC without angle notations", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Wall clock hands central axle pivot vertex",
      narration: `Rohan stands near a heritage wall clock in ${place}. At 5:00, the hour hand and minute hand meet at the central clock axle. The central axle acts as:`,
      choices: [
        { text: "The Vertex (Shikhar) of the angle between the clock hands!", correct: true, rewardXp: 15 },
        { text: "An endless parallel line segment", correct: false, rewardXp: 0 },
        { text: "A point with 3 dimensions", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Sonu's Street Kulfi Metal Mold Tip Cone",
      narration: `Dishing out mango kulfi in ${place}, Sonu pulls a steel conical mold, pointing to the pointy bottom cup apex where all sides meet. This pointy cone peak represents:`,
      choices: [
        { text: "A Vertex point (Shikhar)", correct: true, rewardXp: 15 },
        { text: "An infinite parallel railway track", correct: false, rewardXp: 0 },
        { text: "A line segment of 10 cm", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Steel Camera Tripod Support Legs converging joint",
      narration: `Behind the food stalls in ${place}, ${char} folds a metal tripod stand. The three straight steel support legs converge at the central heavy iron mounting plate. This mounting plate is:`,
      choices: [
        { text: "The common apex vertex (Shikhar) connecting the leg vectors!", correct: true, rewardXp: 15 },
        { text: "An infinite parallel line corridor", correct: false, rewardXp: 0 },
        { text: "A flat paper sheet with zero depth", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "India Gate Monument Arch Corner Apex",
      narration: `Visiting the India Gate plaza at ${place}, ${char} points to the high horizontal beam met by the vertical pillar wall, creating a sharp outer corner. What is this arch joint corner?`,
      choices: [
        { text: "A Vertex (Shikhar) meeting point of two straight lines!", correct: true, rewardXp: 15 },
        { text: "A flat circular disk boundary", correct: false, rewardXp: 0 },
        { text: "A continuous endlessly straight line segment", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Sweet Vendor's Heavy Brass Tray Corner",
      narration: `Taking fresh pedas from a stove in ${place}, sweet vendor ${char} points to the corner where the two metal tray rims converge at a right angle. This welded corner is a:`,
      choices: [
        { text: "Vertex (Shikhar) point", correct: true, rewardXp: 15 },
        { text: "Ray beam shooting endlessly", correct: false, rewardXp: 0 },
        { text: "Circular curve radius", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Auto Rickshaw Canvas Roof Frame Corner",
      narration: `Riding down the streets of ${place}, the driver taps the steel frame joint where the front windshield bar and the ceiling bar meet at a tight angle. What is this welded frame joint called?`,
      choices: [
        { text: "A Vertex (Shikhar) point of intersection!", correct: true, rewardXp: 15 },
        { text: "A point of zero dimensions and zero positions", correct: false, rewardXp: 0 },
        { text: "An endless rail track", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Postal Mail Envelope Fold Flap Apex",
      narration: `Sealing letters near CP in ${place}, ${char} folds down the triangular paper flap. The two slanted paper folds meet to form a pointy flap apex. This apex behaves as:`,
      choices: [
        { text: "A mathematical Vertex (Shikhar)", correct: true, rewardXp: 15 },
        { text: "An endless line segment", correct: false, rewardXp: 0 },
        { text: "A zero dimensional black hole", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Chai Stall Wood Bench Leg Joint",
      narration: `At the tea shop in ${place}, ${char} points to the corner of a wooden stool bench where the flat seat meets the upright support leg at a 90° angle. This support corner point is:`,
      choices: [
        { text: "The Vertex (Shikhar) of the right angle!", correct: true, rewardXp: 15 },
        { text: "An endless parallel rope with no beginnings", correct: false, rewardXp: 0 },
        { text: "A single coordinate blue dot", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Steel Tailoring Scissors Central Pivot Screw",
      narration: `At a fabrics shop in ${place}, ${char} points to the central brass screw of the metal shears where the two blades cross. Geometrically, this pivot screw is:`,
      choices: [
        { text: "The common Vertex point around which cutting angles pivot!", correct: true, rewardXp: 15 },
        { text: "An infinite parallel guideline", correct: false, rewardXp: 0 },
        { text: "A line segment of fixed 50 cm width", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Cricket Batsman's Bat Shoulder Apex Joint",
      narration: `Inside the stadium store of ${place}, ${char} points to the bat shoulder wedge split where the round cane bat handle fits into the flat willow wood. This meeting wedge joint point is a:`,
      choices: [
        { text: "Vertex (Shikhar)", correct: true, rewardXp: 15 },
        { text: "Segment", correct: false, rewardXp: 0 },
        { text: "Endless highway axis", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Metro Ticket Scanner flashing box corner",
      narration: `Tapping cards at ${place}, ${char} points to the flashy bezel corner where the top glass plate meets the side aluminum border. How many angle corners does a square scanning bezel have?`,
      choices: [
        { text: "Exactly 4 vertices (Shikhar points)!", correct: true, rewardXp: 15 },
        { text: "Exactly 2 endpoints", correct: false, rewardXp: 0 },
        { text: "Strictly zero vertices", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Boutique Storefront Billboard Top Flag Apex",
      narration: `Examining flags in Lajpat Nagar at ${place}, ${char} holds up a triangular advertising flag. The pointy top corner that flies in the wind represents:`,
      choices: [
        { text: "A Vertex (Shikhar)", correct: true, rewardXp: 15 },
        { text: "A 10 cm segment length", correct: false, rewardXp: 0 },
        { text: "An infinite double-arrow line", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Historic Garden Walkway Crossing Focal Spot",
      narration: `Strolling through heritage paths in ${place}, ${char} stands where the red brick path meets the white marble path diagonally at a sharp angle. This path convergence behaves as:`,
      choices: [
        { text: "An Angle Vertex intersection point!", correct: true, rewardXp: 15 },
        { text: "A parallel pipeline running endlessly", correct: false, rewardXp: 0 },
        { text: "A coordinate dot with height", correct: false, rewardXp: 0 }
      ]
    },
    {
      title: "Mughal Architect's Legacy Bronze dividers vertex",
      narration: `At a souvenir shop in ${place}, ${char} points to a pair of old drafting dividers. The two brass legs meet at the top pin joint. This core pin joint behaves as as:`,
      choices: [
        { text: "A Vertex (Shikhar) of the divider angle!", correct: true, rewardXp: 15 },
        { text: "An endless straight coordinate line", correct: false, rewardXp: 0 },
        { text: "A measuring segment of 5 cm", correct: false, rewardXp: 0 }
      ]
    }
  ];
  return shikharStories[idx] || shikharStories[0];
}

export function getStoryQuestVariants(topicId: string, subId: string): StorySlide[] {
  const slides: StorySlide[] = [];

  for (let i = 1; i <= 20; i++) {
    const place = DELHI_PLACES[(i - 1) % DELHI_PLACES.length];
    const char = CHARACTERS[(i - 1) % CHARACTERS.length];
    const emoji = EMOJIS[(i - 1) % EMOJIS.length];

    let title = "";
    let narration = "";
    let choices: { text: string; correct: boolean; rewardXp: number }[] = [];

    if (subId.includes("bindu") || subId.includes("rekha") || subId.includes("khand") || subId.includes("kiran") || subId.includes("shikhar")) {
      const details = getGeometryStoryDetails(subId, i, place, char);
      title = details.title;
      narration = details.narration;
      choices = details.choices;
    } 
    else if (subId.includes("max")) {
      title = `The Vegetable Price Peak: Maximum Value in ${place}`;
      narration = `At the local market in ${place}, the prices of 1kg vegetables are: Potatoes (Rs. ${i * 5 + 10}), Onions (Rs. ${i * 6 + 20}), and Premium Ginger (Rs. ${i * 12 + 100}). Salim asks you: 'Help me identify the Maximum peak rate to know our most expensive vegetable!'`;
      const correctVal = i * 12 + 100;
      choices = [
        { text: `Rs. ${i * 5 + 10} (Potatoes)`, correct: false, rewardXp: 0 },
        { text: `Rs. ${correctVal} (Ginger - the highest value in our dataset!)`, correct: true, rewardXp: 15 },
        { text: `Rs. ${i * 6 + 20} (Onions)`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("min")) {
      title = `Cold Vegetable Cargo Log at ${place}`;
      narration = `A cold storage truck delivering fresh spinach to ${place} logs deep freeze storage points: [-${i}, -${i * 3}, -2]°C. Salim needs to identify the minimum coldest temperature value to preserve cargo. Which one is it?`;
      choices = [
        { text: `-${i * 3}°C (furthest negative limits represent the absolute minimum temperature!)`, correct: true, rewardXp: 15 },
        { text: `-${i}°C`, correct: false, rewardXp: 0 },
        { text: `-2°C`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("range")) {
      title = `Vegetable Basket Price Fasla in ${place}`;
      narration = `At the grocery bazaar in ${place}, a basic mixed veggie basket costs Rs. ${i * 5 + 40} (Minimum) while the organic exotic basket is Rs. ${i * 20 + 200} (Maximum). Maths Dost asks you: 'What is the exact Range (Fasla) between these rates?'`;
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
        { text: `-${i * 4} coins is larger (less debt on our number line!)`, correct: true, rewardXp: 15 },
        { text: "They are completely identical", correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("decimals")) {
      title = `Wholesale Saffron Decimal Weighing in ${place}`;
      narration = `Merchant '${char}' in ${place} is weighing premium saffron. Lot A weighs ${(1.45 + i * 0.01).toFixed(3)} grams, while Lot B weighs ${(1.409 + i * 0.01).toFixed(3)} grams. Which batch contains a larger quantity?`;
      const valA = (1.45 + i * 0.01).toFixed(3);
      const valB = (1.409 + i * 0.01).toFixed(3);
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
 * Generates CBSE syllabus multiple choice questions for quizzes
 */
export function getConceptQuizVariants(topicId: string, subId: string, difficulty: string): QuizQuestion[] {
  const list: QuizQuestion[] = [];
  const levelText = difficulty === "expert" ? "Class 8" : difficulty === "intermediate" ? "Class 7" : "Class 6";

  for (let i = 1; i <= 20; i++) {
    const term = DELHI_PLACES[(i - 1) % DELHI_PLACES.length];
    
    let activeSubId = subId;
    if (subId.includes("panga")) {
      if (topicId === "geom") {
        const gSubs = ["geom_bindu", "geom_rekha", "geom_khand", "geom_kiran", "geom_shikhar"];
        activeSubId = gSubs[(i - 1) % gSubs.length];
      } else if (topicId === "maxmin") {
        const mSubs = ["maxmin_max", "maxmin_min", "maxmin_range"];
        activeSubId = mSubs[(i - 1) % mSubs.length];
      } else {
        const cSubs = ["compare_basics", "compare_decimals", "compare_rounding", "compare_place", "compare_order"];
        activeSubId = cSubs[(i - 1) % cSubs.length];
      }
    }

    let question = "";
    let options: string[] = [];
    let correct = 0;
    let hint = "";

    if (activeSubId.includes("bindu")) {
      question = `[${levelText} - Q${i}] How many lines can pass through a single specific Bindu (Point) spotted near ${term}?`;
      options = ["Only exactly 1 line", "Exactly two lines", "Infinite lines can intersect at one point!", "Zero lines"];
      correct = 2;
      hint = "Imagine a wheel spike. All spokes of a cycle or compass map pass through the exact same pivot point!";
    } 
    else if (activeSubId.includes("rekha")) {
      question = `[${levelText} - Q${i}] If an infinite Rekha (Line) runs directly straight through ${term}, how many fixed endpoints does it possess?`;
      options = ["Zero endpoints (It goes endlessly on both sides!)", "Exactly 1 endpoint", "Exactly 2 endpoints", "Varies on map size"];
      correct = 0;
      hint = "A line represents infinite coordinates. It has two double arrows denoting and stretching endlessly with no limit!";
    } 
    else if (activeSubId.includes("khand")) {
      question = `[${levelText} - Q${i}] A customer in ${term} orders a wire segment of exactly ${i + 4} cm to tie boxes. A Line Segment (Khand) is defined by which property?`;
      options = ["Stretches infinitely without endings", "Has exactly one boundary origin", "Has exactly two fixed endpoints!", "Has no measurable length"];
      correct = 2;
      hint = "Segment means a finite section. Hence, it starts at point A and ends at point B with exact measurable distance.";
    } 
    else if (activeSubId.includes("kiran")) {
      question = `[${levelText} - Q${i}] A beam of flashlight originating at a torch battery and shooting through ${term} tunnels represents which geometry structure?`;
      options = ["A Point (Bindu)", "A Ray (Kiran) - starting at 1 origin and flying infinitely!", "A line segment with two endpoints", "A closed loop line"];
      correct = 1;
      hint = "Think about a solar beam. It originates at the Sun (1 vertex) and travels forward forever.";
    } 
    else if (activeSubId.includes("shikhar")) {
      question = `[${levelText} - Q${i}] A triangle formed by cricket boundaries in ${term} contains how many vertices (intersection Shikhar tips)?`;
      options = ["One vertex", "Two vertices", "Three vertices (Triangles have 3 corners!)", "Zero vertices"];
      correct = 2;
      hint = "Each pointy corner of the triangle where straight boundaries intersect is a Shikhar!";
    } 
    else if (activeSubId.includes("max")) {
      const v1 = i * 15 + 100;
      const v2 = i * 20 + 200;
      const v3 = i * 11 + 50;
      question = `[${levelText} - Q${i}] Scan this dataset of daily sweet sales in ${term}: [${v1}, ${v2}, ${v3}]. Which run represents the Maximum limit?`;
      options = [`${v1}`, `${v2} - the highest value in the comparative dataset!`, `${v3}`, `${v1 + v3}`];
      correct = 1;
      hint = "Compare the hundred's digit of the integer sequence to find the peak magnitude.";
    } 
    else if (activeSubId.includes("min")) {
      const valA = - (i * 3);
      const valB = - (i * 4 + 1);
      const valC = 0;
      question = `[${levelText} - Q${i}] A metro cargo logs thermal cooling levels in ${term}: [${valC}°C, ${valA}°C, ${valB}°C]. Identify the absolute minimum temperature.`;
      options = [`${valC}°C`, `${valA}°C`, `${valB}°C (Furthest left from zero on the number line!)`, `${valA - 5}°C`];
      correct = 2;
      hint = "A greater debt on the number line represents the lowest value in a comparison set.";
    } 
    else if (activeSubId.includes("range")) {
      const top = i * 12 + 150;
      const bottom = i * 2 + 10;
      const rangePr = top - bottom;
      question = `[${levelText} - Q${i}] A merchant in ${term} sells woolens ranging from Rs ${bottom} (minimum) to Rs ${top} (maximum). What is the mathematical Range (Fasla) of these rates?`;
      options = [`Rs ${rangePr} (Calculated as Peak Max minus Floor Min!)`, `Rs ${top}`, `Rs ${bottom}`, `Rs ${top + bottom}`];
      correct = 0;
      hint = "Formula for Fasla is: Range = (Maximum value) - (Minimum value). Settle subtraction!";
    } 
    else if (activeSubId.includes("basics")) {
      const n1 = - (i * 6);
      const n2 = - (i * 2 + 1);
      question = `[${levelText} - Q${i}] Help the crocodile in ${term} pick the larger value between negative balances: ${n1} vs ${n2}.`;
      options = [`${n1}`, `${n2} represents a smaller negative debt, so it is larger!`, "Both are equal values", "Zero is smaller than both"];
      correct = 1;
      hint = "Compare which number lies further right (closer to zero) on the horizontal axis.";
    } 
    else if (activeSubId.includes("decimals")) {
      const decA = (12.4 + i * 0.05).toFixed(2);
      const decB = (12.04 + i * 0.05).toFixed(2);
      question = `[${levelText} - Q${i}] A decimal weight gauge in ${term} shows Lot A: ${decA}g and Lot B: ${decB}g. Which relationship is correct?`;
      options = [`${decA} is greater than ${decB} (tenths place 4 is bigger than 0!)`, `${decA} is smaller than ${decB}`, "They are equivalent weight", "Both are less than 12g"];
      correct = 0;
      hint = "Convert to hundreds comparison: compare tenths digit first, then move right.";
    } 
    else if (activeSubId.includes("rounding")) {
      const valBill = (299.75 + i * 0.05).toFixed(2);
      const wholeRupeeResult = Math.round(parseFloat(valBill));
      question = `[${levelText} - Q${i}] A shopping bill at ${term} comes to Rs. ${valBill}. Round the total to the nearest whole rupee integer standard.`;
      options = [`Rs. ${wholeRupeeResult - 10}`, `Rs. ${wholeRupeeResult} (Round up because the paisa decimal is greater than or equal to .50 Paise!)`, `Rs. ${Math.floor(parseFloat(valBill))}`, `Rs. ${wholeRupeeResult + 5}`];
      correct = 1;
      hint = "Check the decimal coins index. If >= .50, round UP to next rupee. Otherwise, round DOWN.";
    } 
    else if (activeSubId.includes("place")) {
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
