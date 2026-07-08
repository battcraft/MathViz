import { QuizQuestion, StorySlide } from "./types";

// Helper to get Indian city locations for story atmosphere
const DELHI_PLACES = [
  // Mumbai
  "Dadar TT Circle", "Bandra Local Station", "Juhu Beach Vada Pav Stall", "Colaba Causeway Market",
  "Dharavi Pottery Lane", "Andheri East Tech Park", "Gateway of India Ferry Point", "Sion Flyover Dhaba",
  // Bangalore
  "Koramangala Food Street", "MG Road Metro Station", "Indiranagar Kalyan Nagar", "Electronic City Phase Gate",
  "Commercial Street Shopping Lane", "UB City Food Court", "Whitefield IT Hub Canteen", "Malleshwaram 8th Cross",
  // Kolkata
  "Park Street Kebab Lane", "College Street Book Market", "New Market Sweets Corner", "Howrah Bridge Flower Stall",
  "Salt Lake Sector V Office", "Victoria Memorial Grounds", "Gariahat Bypass junction", "Dakshineswar Temple Ghat",
  // Chennai
  "T. Nagar Ranganathan Street", "Mylapore Filter Coffee Stall", "Adyar Ananda Bhavan Lane", "Anna Nagar Tower Park",
  "Egmore Museum Road", "Velachery Main Bus Stop", "Kapaleeshwarar Temple Street", "Tidal Park Food Court",
  // Jaipur
  "Hawa Mahal Bazaar", "Johari Bazaar Gem Shop", "Nahargarh Fort Road", "Bapu Bazaar Textile Lane",
  "Amber Fort Elephant Point", "Jal Mahal Fish Market", "C-Scheme Office Complex", "Tonk Road Sweet Shop",
  // Hyderabad
  "Charminar Biryani Gali", "HITEC City Tech Park", "Jubilee Hills Banjara Hills", "Secunderabad Station Road",
  "Golconda Fort Market", "Ameerpet Coaching Centre", "Mehdipatnam Vegetable Market", "Film Nagar Studio Gate",
  // Pune
  "FC Road College Fest Gate", "Koregaon Park Cafe Lane", "Sinhagad Road Dhaba", "Shaniwar Wada Market",
  "Viman Nagar IT Park", "Deccan Bus Stand Junction", "Kothrud Misal Pav Stall", "Swargate Auto Stand",
  // Kerala
  "Kochi Marine Drive Promenade", "Alleppey Backwaters Houseboat", "Munnar Tea Estate Gate", "Trivandrum Padmanabhaswamy Temple",
  "Calicut Beach Bazaar", "Kumarakom Fish Market", "Wayanad Spice Plantation", "Kovalam Lighthouse Beach"
];

// Helper to get India-specific character names
const CHARACTERS = [
  "Tara", "Rohan", "Maths Dost", "Chai Dost", "Kite Flyer Chacha",
  "Vada Pav Master Ji", "Metro card guard", "IPL Coach Arjun", "Tea-stall Raju",
  "Auto Wale Uncle", "Filter Coffee Seller Kanna", "Bookstore owner Rohit", "Biryani Bhai", "Diya the Balloon Seller",
  "Fruit vendor Salim", "Metro Passenger Pinky", "Toy store owner Vinod", "Chaat center Chintu", "Kite Maker Rehman",
  "Sweet Maker Mohan", "Dosa Uncle from Mylapore", "Pav Bhaji Wale Bhau", "Idli Amma from Chennai", "Momos Didi from Delhi"
];

// Emojis mapping
const EMOJIS = ["🛺", "🪁", "🍢", "🧋", "🏏", "🎯", "🔑", "🍿", "🛍️", "🏪", "🏫", "🔋", "💡", "📦", "🏷️", "💳", "👟", "🚲", "🍵", "🥨"];

// Fun template wrappers for drill instructions (cycles through 8 styles)
const DRILL_PREFIXES = [
  "🎯 Bhaiya says: ",
  "⚡ Quick challenge: ",
  "🏆 Competition time! ",
  "📖 Story time: ",
  "🔥 Speed round: ",
  "💡 Puzzle alert: ",
  "🎪 Fun drill: ",
  "🚀 Blast off! ",
];
const DRILL_SUFFIXES = [
  " Kar dikha, Maths Dost! 🎯",
  " Chai thandi ho rahi hai, jaldi! ☕",
  " Agar sahi toh samosa party meri taraf se! 🍛",
  " Dikhao apna talent! 💪",
  " Jeeto aur khush raho! 😄",
  " Ek dum perfect karo! ✨",
  " Masti ke saath math karo! 🎉",
  " Go for gold! 🥇",
];

// Fun distractor pool for quiz questions
const FUN_DISTRACTORS = [
  "The number of samosas in a plate (usually 4!) 🍛",
  "What Rahul scored in his last cricket match 🏏",
  "The temperature in Shimla today ❄️",
  "The price of 1kg onions (aaj kal bahut mehenge hain!) 🧅",
  "How many items in a Haldiram thali 🥘",
  "Auto fare from Connaught Place to Chandni Chowk 🛺",
  "The number of overs in a T20 match 🏏",
  "Papa ji's WiFi password digits 🔢",
  "The number of stops on Delhi Metro Yellow Line 🚇",
  "AICC ke samosas ki sankhya 🍛",
];

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
        const maxStories = [
          { title: `Drill #${i}: Rohit's Cricket Score Max`, instruction: `Rohit scored these runs in 4 innings: [25, ${o1}, ${maxVal}, ${o2}]. His coach needs the MAXIMUM score to decide the playing XI! Slide the bracket to the highest score: ${maxVal}!` },
          { title: `Drill #${i}: IPL Ticket Price Hunt`, instruction: `Ticket prices at 4 counters: [Rs 25, Rs ${o1}, Rs ${maxVal}, Rs ${o2}]. Find the MAXIMUM price — that's your worst-case budget! Slide to Rs ${maxVal}!` },
          { title: `Drill #${i}: Filter Coffee Rush Hour`, instruction: `Kanna served these cups: [25, ${o1}, ${maxVal}, ${o2}]. The MAXIMUM tells him when he needs extra supplies! Slide to ${maxVal} cups!` }
        ];
        const story = maxStories[i % maxStories.length];
        title = story.title;
        instruction = story.instruction;
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard sports runs comparative datasets
        maxVal = i * 20 + 130;
        const o1 = maxVal - 60;
        const o2 = maxVal - 25;
        const maxStories = [
          { title: `Drill #${i}: IPL Peak Run Spotter`, instruction: `Analyze the run totals: [110, ${maxVal}, ${o1}, ${o2}]. Set the bracket slider lock to capture the Maximum peak runs of ${maxVal}!` },
          { title: `Drill #${i}: Biryani Bhai's Spice Budget`, instruction: `Spice prices: [Rs 110, Rs ${maxVal}, Rs ${o1}, Rs ${o2}]. The MAXIMUM tells Biryani Bhai his biggest expense! Slide to Rs ${maxVal}!` },
          { title: `Drill #${i}: College Fest Entry Price`, instruction: `Ticket tiers: [Rs 110, Rs ${maxVal}, Rs ${o1}, Rs ${o2}]. The MAXIMUM is the VIP price! Slide to Rs ${maxVal}!` }
        ];
        const story = maxStories[i % maxStories.length];
        title = story.title;
        instruction = story.instruction;
      } else {
        // Expert: Decimals comparison challenge
        maxVal = parseFloat((i * 1.75 + 14.5).toFixed(2));
        const o1 = parseFloat((maxVal - 1.25).toFixed(2));
        const o2 = parseFloat((maxVal - 0.75).toFixed(2));
        const maxStories = [
          { title: `Drill #${i}: Saffron Price Tracker`, instruction: `Check the prices at ${place}: [Rs 10.25, Rs ${o1}, Rs ${o2}, Rs ${maxVal}]. Find the sabse mehenga (most expensive) saffron and slide the scale lock to Rs ${maxVal}!` },
          { title: `Drill #${i}: Coffee Decoction Maximum`, instruction: `Kanna's decoction volumes: [10.25 ml, ${o1} ml, ${o2} ml, ${maxVal} ml]. The MAXIMUM batch needs extra coffee powder! Slide to ${maxVal} ml!` },
          { title: `Drill #${i}: Sweet Shop Sugar Max`, instruction: `Sugar weights: [10.25 kg, ${o1} kg, ${o2} kg, ${maxVal} kg]. The MAXIMUM batch is for the wedding order! Slide to ${maxVal} kg!` }
        ];
        const story = maxStories[i % maxStories.length];
        title = story.title;
        instruction = story.instruction;
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
        const minStories = [
          { title: `Drill #${i}: Cheapest Vada Pav Hunt`, instruction: `Vada pav prices at 4 stalls: [Rs ${o1}, Rs ${minVal}, Rs ${o2}, Rs 40]. Find the MINIMUM — the cheapest vada pav! Slide to Rs ${minVal}!` },
          { title: `Drill #${i}: Filter Coffee Price Check`, instruction: `Coffee prices: [Rs ${o1}, Rs ${minVal}, Rs ${o2}, Rs 40]. The MINIMUM is Kanna's special price! Slide to Rs ${minVal}!` },
          { title: `Drill #${i}: Metro Ticket Minimum`, instruction: `Metro fares: [Rs ${o1}, Rs ${minVal}, Rs ${o2}, Rs 40]. The MINIMUM fare is the shortest distance! Slide to Rs ${minVal}!` }
        ];
        const story = minStories[i % minStories.length];
        title = story.title;
        instruction = story.instruction;
      } else if (difficulty === "intermediate") {
        // Intermediate: Negative integer temperatures
        minVal = -((i % 6) * 4 + 3); // -3, -7, -11, -15, -19, -23
        const minStories = [
          { title: `Drill #${i}: Munnar Tea Estate Frost`, instruction: `Frost warnings at 4 spots: [0°C, -2°C, ${minVal}°C, 12°C]. The MINIMUM is when tea leaves freeze most! Slide to ${minVal}°C!` },
          { title: `Drill #${i}: Hill Station Freezer Alert`, instruction: `Freezer temps: [0°C, -2°C, ${minVal}°C, 12°C]. The MINIMUM means the kulfi might crack! Slide to ${minVal}°C!` },
          { title: `Drill #${i}: Backwaters Night Temperature`, instruction: `Night temps on houseboat: [0°C, -2°C, ${minVal}°C, 12°C]. The MINIMUM is when you need extra blankets! Slide to ${minVal}°C!` }
        ];
        const story = minStories[i % minStories.length];
        title = story.title;
        instruction = story.instruction;
      } else {
        // Expert: Extreme sub-zero precise decimals
        minVal = -parseFloat(((i % 5) * 4.35 + 10.5).toFixed(2)); // e.g., -10.5, -14.85
        const o1 = parseFloat((minVal + 4).toFixed(2));
        const minStories = [
          { title: `Drill #${i}: Wayanad Spice Cold Room`, instruction: `Spice cold room temps: [0.0°C, ${o1}°C, ${minVal}°C, -5.2°C]. The MINIMUM means cardamom might lose flavor! Slide to ${minVal}°C!` },
          { title: `Drill #${i}: Shimla vs Chennai Fridge`, instruction: `Freezer readings: [0.0°C, ${o1}°C, ${minVal}°C, -5.2°C]. The MINIMUM is the sabse thanda (coldest) reading! Slide to ${minVal}°C!` },
          { title: `Drill #${i}: Ice Cream Shop Alert`, instruction: `Freezer temps: [0.0°C, ${o1}°C, ${minVal}°C, -5.2°C]. The MINIMUM means the kulfi is in danger! Slide to ${minVal}°C!` }
        ];
        const story = minStories[i % minStories.length];
        title = story.title;
        instruction = story.instruction;
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
        const rangeStories = [
          { title: `Drill #${i}: Mumbai Local Ticket Fasla`, instruction: `Mumbai local tickets: second class Rs ${lower}, AC first Rs ${upper}. Range (Fasla) = ${upper} - ${lower} = ${rangeVal} rupees. Slide to Rs ${rangeVal}!` },
          { title: `Drill #${i}: Jaipur Textile Price Spread`, instruction: `Dupatta prices: basic Rs ${lower}, fancy mirror-work Rs ${upper}. The Fasla is ${rangeVal} rupees! Slide to Rs ${rangeVal}!` },
          { title: `Drill #${i}: Kolkata Sweet Range`, instruction: `Rasgulla Rs ${lower}, sandesh tower Rs ${upper}. The Fasla tells Mohan his product spread: ${rangeVal} rupees! Slide to Rs ${rangeVal}!` }
        ];
        const story = rangeStories[i % rangeStories.length];
        title = story.title;
        instruction = story.instruction;
      } else if (difficulty === "intermediate") {
        // Intermediate: Standard range between upper and basic prices
        const upper = (i % 5) * 20 + 150;
        const lower = (i % 4) * 10 + 20;
        rangeVal = upper - lower;
        const rangeStories = [
          { title: `Drill #${i}: Pune College Fest Fasla`, instruction: `General ticket Rs ${lower}, VIP backstage Rs ${upper}. The Fasla tells the treasurer the pricing spread: Rs ${rangeVal}. Slide to Rs ${rangeVal}!` },
          { title: `Drill #${i}: Hyderabad Biryani Price Gap`, instruction: `Chicken biryani Rs ${lower}, mutton biryani Rs ${upper}. Biryani Bhai's Fasla is Rs ${rangeVal}! Slide to Rs ${rangeVal}!` },
          { title: `Drill #${i}: Bangalore Tech Park Lunch`, instruction: `Thali Rs ${lower}, premium buffet Rs ${upper}. The Fasla is Rs ${rangeVal}! Slide to Rs ${rangeVal}!` }
        ];
        const story = rangeStories[i % rangeStories.length];
        title = story.title;
        instruction = story.instruction;
      } else {
        // Expert: Range between a negative temperature and a positive temperature (Class 8 integers)
        const lower = -((i % 5) * 5 + 5); // negative floor: -5 to -25
        const upper = (i % 4) * 10 + 15; // positive ceiling: 15 to 45
        rangeVal = upper - lower; // spans sub-zero to positive
        const rangeStories = [
          { title: `Drill #${i}: Shimla vs Chennai Temperature Fasla`, instruction: `Shimla mein barf giri hai: ${lower}°C aur Chennai mein garmi hai: ${upper}°C. Temperature ka fasla = ${upper} - (${lower}) = ${rangeVal}°C. Slide to ${rangeVal}!` },
          { title: `Drill #${i}: Munnar vs Kolkata Weather Gap`, instruction: `Munnar: ${lower}°C, Kolkata: ${upper}°C. The temperature Fasla is ${rangeVal}°C! Slide to ${rangeVal}!` },
          { title: `Drill #${i}: Hill Station vs Coastal Range`, instruction: `Hill station: ${lower}°C, coastal city: ${upper}°C. The Fasla spans ${rangeVal}°C! Slide to ${rangeVal}!` }
        ];
        const story = rangeStories[i % rangeStories.length];
        title = story.title;
        instruction = story.instruction;
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
        title = `Drill #${i}: Negative Number Gator Challenge`;
        instruction = `Gator bhaiya says: In negative numbers, jo zero ke paas hai woh bada hai! Compare karo: ${larger} vs ${smaller}. Click the larger value!`;
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
        title = `Drill #${i}: Haldiram Bill Rounding`;
        instruction = `Haldiram ka bill aaya hai: Rs ${baseNum}. Bhaiya's weighing balance pe round karo nearest 10 paise (1 decimal place) mein! Answer: Rs ${expectedRounded}.`;
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
        title = `Drill #${i}: Market Price Comparison`;
        instruction = `Determine the deepest value in negative space (smallest coordinate): ${larger} vs ${smaller}. Click the smaller value, which is ${smaller}!`;
        targetValue = smaller;
      }
    }

    // Vary drill instruction format with fun templates
    const templateIdx = (i - 1) % DRILL_PREFIXES.length;
    const wrappedInstruction = `${DRILL_PREFIXES[templateIdx]}${instruction}${DRILL_SUFFIXES[templateIdx]}`;

    drills.push({
      id: `${topicId}_${subId}_drill_${i}`,
      title: `[${levelLabel}] ${title}`,
      instruction: wrappedInstruction,
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
      // Rotate through different India-specific Max story narratives
      const maxStories = [
        {
          title: `Rohit's Cricket Scoreboard Drama at ${place}`,
          narration: `Rohit's cricket team is playing a tournament match at ${place}. His coach says: 'Beta, we need your MAXIMUM score from the last 5 innings to decide if you're in the playing XI!' Rohit's scores were: ${i * 3 + 12}, ${i * 5 + 28}, ${i * 2 + 8}, ${i * 7 + 45}, and ${i * 4 + 19}. Which score does the coach need to check?`,
          correctVal: i * 7 + 45,
          correctText: `Rs. ${i * 7 + 45} (The highest score — that's Rohit's best innings!)`,
          wrong1: `${i * 3 + 12}`,
          wrong2: `${i * 5 + 28}`
        },
        {
          title: `Priya's IPL Ticket Hunt at ${place}`,
          narration: `Priya desperately wants to watch the IPL final at ${place}. The ticket prices at 5 different counters are: Rs. ${i * 8 + 150}, Rs. ${i * 12 + 280}, Rs. ${i * 6 + 120}, Rs. ${i * 15 + 350}, and Rs. ${i * 10 + 200}. Her dad says: 'Find the MAXIMUM price first — that tells us the worst case budget!' Which is the most expensive ticket?`,
          correctVal: i * 15 + 350,
          correctText: `Rs. ${i * 15 + 350} (The peak price — that's the max budget needed!)`,
          wrong1: `Rs. ${i * 8 + 150}`,
          wrong2: `Rs. ${i * 12 + 280}`
        },
        {
          title: `Kanna's Filter Coffee Rush at ${place}`,
          narration: `Kanna runs a famous filter coffee stall at ${place}. During the morning rush, he served ${i * 4 + 15}, ${i * 6 + 25}, ${i * 3 + 10}, and ${i * 8 + 35} cups in 4 consecutive hours. He tells his son: 'Find the MAXIMUM — that's our busiest hour! We need extra supplies then!' Which hour had the most customers?`,
          correctVal: i * 8 + 35,
          correctText: `${i * 8 + 35} cups (The busiest hour — that's the MAXIMUM rush!)`,
          wrong1: `${i * 4 + 15}`,
          wrong2: `${i * 6 + 25}`
        },
        {
          title: `Biryani Bhai's Spice Market Deal at ${place}`,
          narration: `Biryani Bhai is shopping for spices at ${place}. He needs to find the most expensive ingredient to manage his budget. Prices per kg: Cardamom Rs. ${i * 20 + 400}, Cloves Rs. ${i * 15 + 300}, Cinnamon Rs. ${i * 10 + 200}, Saffron Rs. ${i * 30 + 800}, and Star Anise Rs. ${i * 8 + 150}. Which spice costs the MAXIMUM?`,
          correctVal: i * 30 + 800,
          correctText: `Rs. ${i * 30 + 800} (Saffron — the most expensive spice, that's the MAXIMUM!)`,
          wrong1: `Rs. ${i * 20 + 400}`,
          wrong2: `Rs. ${i * 15 + 300}`
        },
        {
          title: `Dosa Uncle's Morning Rush Count at ${place}`,
          narration: `Dosa Uncle serves hot dosas at his stall near ${place}. He counted servings in 5 batches: ${i * 5 + 20}, ${i * 3 + 12}, ${i * 7 + 38}, ${i * 4 + 18}, and ${i * 2 + 9}. He says: 'Bhai, the MAXIMUM batch tells me when I need my assistant to help!' Which batch was the biggest?`,
          correctVal: i * 7 + 38,
          correctText: `${i * 7 + 38} dosas (The largest batch — that's the MAXIMUM!)`,
          wrong1: `${i * 5 + 20}`,
          wrong2: `${i * 3 + 12}`
        }
      ];
      const story = maxStories[i % maxStories.length];
      title = story.title;
      narration = story.narration;
      const correctVal = story.correctVal;
      choices = [
        { text: `${story.wrong1}`, correct: false, rewardXp: 0 },
        { text: `${story.correctText}`, correct: true, rewardXp: 15 },
        { text: `${story.wrong2}`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("min")) {
      // Rotate through different India-specific Min story narratives
      const minStories = [
        {
          title: `Alleppey Boatman's Temperature Log at ${place}`,
          narration: `A boatman sailing through the ${place} backwaters checks his weather app. Tonight's temperatures at 3 different stops are: ${-(i)}°C, ${-(i * 3)}°C, and -2°C. He says: 'Beta, find the MINIMUM — that's the coldest stop where I need extra blankets!' Which temperature is the coldest?`,
          correctVal: -(i * 3),
          correctText: `${-(i * 3)}°C (The coldest — that's the MINIMUM temperature!)`,
          wrong1: `${-(i)}°C`,
          wrong2: `-2°C`
        },
        {
          title: `Munnar Tea Estate Frost Warning at ${place}`,
          narration: `Tea plantation workers at ${place} got frost warnings for 3 nights: ${-(i * 2)}°C, ${-(i * 5 + 3)}°C, and -1°C. The supervisor says: 'Find the MINIMUM — that's when the tea leaves freeze the most! We must cover the plants then!' Which night is the most dangerous?`,
          correctVal: -(i * 5 + 3),
          correctText: `${-(i * 5 + 3)}°C (The most freezing — that's the MINIMUM!)`,
          wrong1: `${-(i * 2)}°C`,
          wrong2: `-1°C`
        },
        {
          title: `Hill Station OYO Room Heater Battle at ${place}`,
          narration: `Rohan and his friends are on a trip to ${place}. The OYO room heater readings show: ${-(i)}°C, ${-(i * 4)}°C, and ${-(i + 1)}°C. Rohan says: 'The MINIMUM reading tells us when the heater is working hardest! That's when we need to turn it up!' Which is the lowest reading?`,
          correctVal: -(i * 4),
          correctText: `${-(i * 4)}°C (The lowest — that's the MINIMUM reading!)`,
          wrong1: `${-(i)}°C`,
          wrong2: `${-(i + 1)}°C`
        },
        {
          title: `Wayanad Spice Cold Storage at ${place}`,
          narration: `Spice farmer Mohan at ${place} stores cardamom in 3 cold rooms. Temperatures are: ${-(i)}°C, ${-(i * 6 + 5)}°C, and -3°C. He says: 'Find the MINIMUM — cardamom loses flavor below -8°C! We need to check that room!' Which room is at risk?`,
          correctVal: -(i * 6 + 5),
          correctText: `${-(i * 6 + 5)}°C (The coldest room — that's the MINIMUM!)`,
          wrong1: `${-(i)}°C`,
          wrong2: `-3°C`
        },
        {
          title: `Shimla Ice Cream Shop Disaster at ${place}`,
          narration: `An ice cream shop at ${place} tracks freezer temps: ${-(i + 2)}°C, ${-(i * 3 + 1)}°C, and -1°C. The owner says: 'The MINIMUM temp tells us the freezer is coldest — if it goes too low, the kulfi cracks!' Which reading is the coldest?`,
          correctVal: -(i * 3 + 1),
          correctText: `${-(i * 3 + 1)}°C (The deepest freeze — that's the MINIMUM!)`,
          wrong1: `${-(i + 2)}°C`,
          wrong2: `-1°C`
        }
      ];
      const story = minStories[i % minStories.length];
      title = story.title;
      narration = story.narration;
      const correctVal = story.correctVal;
      choices = [
        { text: `${story.correctText}`, correct: true, rewardXp: 15 },
        { text: `${story.wrong1}`, correct: false, rewardXp: 0 },
        { text: `${story.wrong2}`, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("range")) {
      // Rotate through different India-specific Range story narratives
      const rangeStories = [
        {
          title: `Mumbai Local Train Ticket Price Range at ${place}`,
          narration: `Tara is planning a trip on the Mumbai local train from ${place}. The minimum ticket costs Rs. ${i * 3 + 15} (second class) and the maximum is Rs. ${i * 10 + 80} (AC first class). Her dad asks: 'Beta, what is the Range (Fasla) between the cheapest and most expensive ticket? That tells us our budget spread!'`,
          minVal: i * 3 + 15,
          maxVal: i * 10 + 80,
          correctText: (diff: number) => `Rs. ${diff} (Max minus Min — that's the Fasla!)`,
          wrong1: (max: number) => `Rs. ${max}`,
          wrong2: () => `Rs. 50`
        },
        {
          title: `Jaipur Textile Shop Price Spread at ${place}`,
          narration: `Priya is buying Rajasthani dupattas at ${place}. The cheapest one costs Rs. ${i * 5 + 30} and the fanciest mirror-work dupatta costs Rs. ${i * 15 + 150}. The shopkeeper says: 'Find the Range (Fasla) — that's how much prices vary in my shop!' What is the price spread?`,
          minVal: i * 5 + 30,
          maxVal: i * 15 + 150,
          correctText: (diff: number) => `Rs. ${diff} (The price spread — that's the Range!)`,
          wrong1: (max: number) => `Rs. ${max}`,
          wrong2: () => `Rs. 20`
        },
        {
          title: `Kolkata Sweets Shop Range at ${place}`,
          narration: `Sweet Maker Mohan at ${place} sells rasgullas at Rs. ${i * 2 + 10} per piece (minimum) and a grand sandesh tower at Rs. ${i * 8 + 60} (maximum). He asks: 'What is the Range (Fasla) between my cheapest and priciest sweet? That tells me my product spread!'`,
          minVal: i * 2 + 10,
          maxVal: i * 8 + 60,
          correctText: (diff: number) => `Rs. ${diff} (The sweet price range — that's the Fasla!)`,
          wrong1: (max: number) => `Rs. ${max}`,
          wrong2: () => `Rs. 15`
        },
        {
          title: `Pune College Fest Budget Range at ${place}`,
          narration: `The college fest at ${place} has entry tickets ranging from Rs. ${i * 4 + 25} (general) to Rs. ${i * 12 + 120} (VIP with backstage pass). The treasurer asks: 'What is the Range (Fasla) between the cheapest and most expensive ticket? That's our pricing spread!'`,
          minVal: i * 4 + 25,
          maxVal: i * 12 + 120,
          correctText: (diff: number) => `Rs. ${diff} (The budget spread — that's the Range!)`,
          wrong1: (max: number) => `Rs. ${max}`,
          wrong2: () => `Rs. 30`
        },
        {
          title: `Hyderabad Biryani Price Comparison at ${place}`,
          narration: `Biryani Bhai at ${place} sells a basic chicken biryani at Rs. ${i * 6 + 50} and a royal mutton biryani at Rs. ${i * 18 + 200}. He tells his son: 'Find the Range (Fasla) — that's how much our menu prices vary!' What's the difference?`,
          minVal: i * 6 + 50,
          maxVal: i * 18 + 200,
          correctText: (diff: number) => `Rs. ${diff} (The biryani price range — that's the Fasla!)`,
          wrong1: (max: number) => `Rs. ${max}`,
          wrong2: () => `Rs. 25`
        }
      ];
      const story = rangeStories[i % rangeStories.length];
      title = story.title;
      narration = story.narration;
      const rangeVal = story.maxVal - story.minVal;
      choices = [
        { text: story.correctText(rangeVal), correct: true, rewardXp: 15 },
        { text: story.wrong1(story.maxVal), correct: false, rewardXp: 0 },
        { text: story.wrong2(), correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("basics")) {
      // Rotate through different India-specific Comparing Numbers stories
      const basicsStories = [
        {
          title: `Chai Dost's Debt Ledger at ${place}`,
          narration: `Chai Dost at ${place} keeps a ledger of who owes him money. Rahul owes -${i * 4} rupees and Vikram owes -${i * 8} rupees. He says: 'Beta, which debtor has a SMALLER debt? That's the one who's closer to paying me back!' Who owes less?`,
          correctText: `-${i * 4} rupees is larger (less debt — closer to zero!)`,
          wrong1: `-${i * 8} rupees because 8 is bigger`,
          wrong2: `They owe exactly the same`
        },
        {
          title: `Auto Wale Uncle's Temperature Debate at ${place}`,
          narration: `Auto Wale Uncle at ${place} is arguing with a passenger about the weather. One app shows -${i * 3}°C and another shows -${i * 6}°C. He says: 'Which reading is WARMER? The one closer to zero!' Which temperature is actually higher?`,
          correctText: `-${i * 3}°C is warmer (closer to zero on the number line!)`,
          wrong1: `-${i * 6}°C because 6 is bigger`,
          wrong2: `Both are the same temperature`
        },
        {
          title: `Momos Didi's Profit Loss at ${place}`,
          narration: `Momos Didi at ${place} tracks her daily losses. Monday she lost -${i * 5} rupees and Tuesday she lost -${i * 2 + 1} rupees. She says: 'Which day was BETTER for business? The smaller loss!' Which day had less loss?`,
          correctText: `-${i * 2 + 1} rupees (smaller loss — better day!)`,
          wrong1: `-${i * 5} rupees because 5 is bigger`,
          wrong2: `Both days were equally bad`
        },
        {
          title: `Pav Bhaji Wale Bhau's Scoreboard at ${place}`,
          narration: `Pav Bhaji Wale Bhau at ${place} is watching a cricket match. Team A is at -${i * 4 + 2} runs (below par) and Team B is at -${i * 7} runs (way behind). He shouts: 'Which team is WINNING? The one closer to zero!' Who's ahead?`,
          correctText: `-${i * 4 + 2} runs (closer to zero — Team A is winning!)`,
          wrong1: `-${i * 7} runs because 7 is bigger`,
          wrong2: `Both teams are tied`
        },
        {
          title: `Idli Amma's Bank Balance at ${place}`,
          narration: `Idli Amma at ${place} checks her bank balance after two big purchases. Account 1 shows -${i * 3 + 5} rupees and Account 2 shows -${i * 6} rupees. She says: 'Which account is HEALTHIER? The one with less negative balance!' Which is better?`,
          correctText: `-${i * 3 + 5} rupees (less debt — healthier account!)`,
          wrong1: `-${i * 6} rupees because 6 is bigger`,
          wrong2: `Both accounts are in the same state`
        }
      ];
      const story = basicsStories[i % basicsStories.length];
      title = story.title;
      narration = story.narration;
      choices = [
        { text: story.wrong1, correct: false, rewardXp: 0 },
        { text: story.correctText, correct: true, rewardXp: 15 },
        { text: story.wrong2, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("decimals")) {
      // Rotate through different India-specific Decimal comparison stories
      const decimalStories = [
        {
          title: `Kanna's Filter Coffee Measurement at ${place}`,
          narration: `Kanna at ${place} is measuring coffee decoction. Cup A has ${(1.45 + i * 0.01).toFixed(3)} ml and Cup B has ${(1.409 + i * 0.01).toFixed(3)} ml. He asks: 'Which cup has MORE decoction? Check the tenths place carefully!'`,
          valA: (1.45 + i * 0.01).toFixed(3),
          valB: (1.409 + i * 0.01).toFixed(3),
          correctText: (a: string) => `${a} ml (tenths place 4 is bigger than 0!)`,
          wrong1: (b: string) => `${b} ml`,
          wrong2: `Both are exactly the same`
        },
        {
          title: `Sweet Shop Sugar Weighing at ${place}`,
          narration: `Sweet Maker Mohan at ${place} weighs sugar for jalebis. Batch A weighs ${(1.45 + i * 0.01).toFixed(3)} kg and Batch B weighs ${(1.409 + i * 0.01).toFixed(3)} kg. He says: 'Which batch has MORE sugar? The one with the bigger tenths digit!'`,
          valA: (1.45 + i * 0.01).toFixed(3),
          valB: (1.409 + i * 0.01).toFixed(3),
          correctText: (a: string) => `${a} kg (tenths place 4 beats 0!)`,
          wrong1: (b: string) => `${b} kg`,
          wrong2: `Both weigh the same`
        },
        {
          title: `Biryani Bhai's Spice Mix at ${place}`,
          narration: `Biryani Bhai at ${place} is comparing two spice blends. Blend A has ${(1.45 + i * 0.01).toFixed(3)} tsp of saffron and Blend B has ${(1.409 + i * 0.01).toFixed(3)} tsp. He asks: 'Which blend is STRONGER? Check the decimal places!'`,
          valA: (1.45 + i * 0.01).toFixed(3),
          valB: (1.409 + i * 0.01).toFixed(3),
          correctText: (a: string) => `${a} tsp (the tenths digit 4 is greater!)`,
          wrong1: (b: string) => `${b} tsp`,
          wrong2: `Both are equally strong`
        }
      ];
      const story = decimalStories[i % decimalStories.length];
      title = story.title;
      narration = story.narration;
      const valA = story.valA;
      const valB = story.valB;
      choices = [
        { text: story.correctText(valA), correct: true, rewardXp: 15 },
        { text: story.wrong1(valB), correct: false, rewardXp: 0 },
        { text: story.wrong2, correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("rounding")) {
      // Rotate through different India-specific Rounding stories
      const roundingStories = [
        {
          title: `Chaat Stall Bill Settlement at ${place}`,
          narration: `You ordered delicious pani puri and chaat at ${place}. The bill comes to Rs. ${(44.3 + i * 0.15).toFixed(2)}. The chaat-wala says: 'Bhai, just give me a round rupee amount — no coins!' How much should you hand him?`,
          val: parseFloat((44.3 + i * 0.15).toFixed(2)),
          correctText: (r: number) => `Rs. ${r} (Round to nearest rupee — that's the smart way!)`,
          wrong1: (val: number) => `Rs. ${Math.floor(val) - 5}`,
          wrong2: (val: number) => `Rs. ${Math.ceil(val) + 2}`
        },
        {
          title: `Auto Ride Meter Reading at ${place}`,
          narration: `Auto Wale Uncle at ${place} shows the meter reading: Rs. ${(44.3 + i * 0.15).toFixed(2)}. He says: 'Just round it off to the nearest rupee, no need for exact change!' What's the fair amount?`,
          val: parseFloat((44.3 + i * 0.15).toFixed(2)),
          correctText: (r: number) => `Rs. ${r} (Rounded to nearest rupee!)`,
          wrong1: (val: number) => `Rs. ${Math.floor(val) - 5}`,
          wrong2: (val: number) => `Rs. ${Math.ceil(val) + 2}`
        },
        {
          title: `Vada Pav Stall Quick Settlement at ${place}`,
          narration: `You grab a hot vada pav at ${place}. The total bill is Rs. ${(44.3 + i * 0.15).toFixed(2)}. The vendor says: 'Boss, no coins — just round it!' How much do you pay?`,
          val: parseFloat((44.3 + i * 0.15).toFixed(2)),
          correctText: (r: number) => `Rs. ${r} (Quick round-off — that's the street way!)`,
          wrong1: (val: number) => `Rs. ${Math.floor(val) - 5}`,
          wrong2: (val: number) => `Rs. ${Math.ceil(val) + 2}`
        }
      ];
      const story = roundingStories[i % roundingStories.length];
      title = story.title;
      narration = story.narration;
      const val = story.val;
      const r = Math.round(val);
      choices = [
        { text: story.correctText(r), correct: true, rewardXp: 15 },
        { text: story.wrong1(val), correct: false, rewardXp: 0 },
        { text: story.wrong2(val), correct: false, rewardXp: 0 }
      ];
    } 
    else if (subId.includes("place")) {
      // Rotate through different India-specific Place Value stories
      const placeStories = [
        {
          title: `Tara's Treasure Chest Code at ${place}`,
          narration: `Tara found a treasure chest at ${place} with a 5-digit code: ${35000 + i * 650}. The lock says: 'Tell me which digit sits in the Thousands (Hazaar) place!' Which digit should Tara enter?`,
          numCode: 35000 + i * 650,
          correctText: (d: number) => `The digit ${d} — that's the Thousands place!`,
          wrong1: `The first digit 3`,
          wrong2: `The last digit 0`
        },
        {
          title: `Rohan's Secret Locker at ${place}`,
          narration: `Rohan gets a locker code at ${place}: ${35000 + i * 650}. The security guard says: 'The Thousands digit is your key!' What's the digit in the Thousands (Hazaar) column?`,
          numCode: 35000 + i * 650,
          correctText: (d: number) => `${d} — that's the Thousands digit!`,
          wrong1: `The ten-thousands digit`,
          wrong2: `The units digit`
        },
        {
          title: `Metro Card Recharge Code at ${place}`,
          narration: `At ${place} metro station, your recharge code is ${35000 + i * 650}. The machine asks: 'Enter the digit in the Thousands (Hazaar) position to confirm!' Which digit?`,
          numCode: 35000 + i * 650,
          correctText: (d: number) => `${d} — exactly the Thousands place!`,
          wrong1: `The hundreds digit`,
          wrong2: `The ten-thousands digit`
        }
      ];
      const story = placeStories[i % placeStories.length];
      title = story.title;
      narration = story.narration;
      const numCode = story.numCode;
      const thousandsDigit = Math.floor((numCode % 10000) / 1000);
      choices = [
        { text: story.correctText(thousandsDigit), correct: true, rewardXp: 15 },
        { text: story.wrong1, correct: false, rewardXp: 0 },
        { text: story.wrong2, correct: false, rewardXp: 0 }
      ];
    } 
    else {
      // Order / Ascending stories with India-specific context
      const orderStories = [
        {
          title: `Metro Token Queue Sorting at ${place}`,
          narration: `At ${place} metro station, passengers have tokens with weights: [-${i * 2}, ${i + 5}, 0, -${i * 5 + 3}]. The guard says: 'Arrange these in Kram (ascending) order — lightest first!' Which list is correct?`,
          listLowFirst: `-${i * 5 + 3}, -${i * 2}, 0, ${i + 5}`,
          correctText: (s: string) => `[${s}] (Lightest to heaviest — correct Kram!)`,
          wrong1: `[${i + 5}, 0, -${i * 2}, -${i * 5 + 3}]`,
          wrong2: `[0, -${i * 2}, ${i + 5}, -${i * 5 + 3}]`
        },
        {
          title: `Cricket Scoreboard Kram Order at ${place}`,
          narration: `Coach Arjun at ${place} wants to rank 4 players by their net scores: [-${i * 2}, ${i + 5}, 0, -${i * 5 + 3}]. He says: 'Put them in ascending Kram — worst to best!' Which order is right?`,
          listLowFirst: `-${i * 5 + 3}, -${i * 2}, 0, ${i + 5}`,
          correctText: (s: string) => `[${s}] (Worst to best — correct Kram!)`,
          wrong1: `[${i + 5}, 0, -${i * 2}, -${i * 5 + 3}]`,
          wrong2: `[0, -${i * 2}, ${i + 5}, -${i * 5 + 3}]`
        },
        {
          title: `Tea Shop Debt List at ${place}`,
          narration: `Tea-stall Raju at ${place} has 4 debt records: [-${i * 2}, ${i + 5}, 0, -${i * 5 + 3}] rupees. He says: 'Sort them ascending — smallest balance first!' Which list is correct?`,
          listLowFirst: `-${i * 5 + 3}, -${i * 2}, 0, ${i + 5}`,
          correctText: (s: string) => `[${s}] (Smallest to largest — correct order!)`,
          wrong1: `[${i + 5}, 0, -${i * 2}, -${i * 5 + 3}]`,
          wrong2: `[0, -${i * 2}, ${i + 5}, -${i * 5 + 3}]`
        }
      ];
      const story = orderStories[i % orderStories.length];
      title = story.title;
      narration = story.narration;
      const listLowFirstStr = story.listLowFirst;
      choices = [
        { text: story.correctText(listLowFirstStr), correct: true, rewardXp: 15 },
        { text: story.wrong1, correct: false, rewardXp: 0 },
        { text: story.wrong2, correct: false, rewardXp: 0 }
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
      options = ["Only exactly 1 line", "Exactly two lines", "Infinite lines can intersect at one point!", FUN_DISTRACTORS[i % FUN_DISTRACTORS.length]];
      correct = 2;
      hint = "Imagine a wheel spike. All spokes of a cycle or compass map pass through the exact same pivot point!";
    } 
    else if (activeSubId.includes("rekha")) {
      question = `[${levelText} - Q${i}] If an infinite Rekha (Line) runs directly straight through ${term}, how many fixed endpoints does it possess?`;
      options = ["Zero endpoints (It goes endlessly on both sides!)", "Exactly 1 endpoint", "Exactly 2 endpoints", FUN_DISTRACTORS[(i + 1) % FUN_DISTRACTORS.length]];
      correct = 0;
      hint = "A line represents infinite coordinates. It has two double arrows denoting and stretching endlessly with no limit!";
    } 
    else if (activeSubId.includes("khand")) {
      question = `[${levelText} - Q${i}] A customer in ${term} orders a wire segment of exactly ${i + 4} cm to tie boxes. A Line Segment (Khand) is defined by which property?`;
      options = ["Stretches infinitely without endings", "Has exactly one boundary origin", "Has exactly two fixed endpoints!", FUN_DISTRACTORS[(i + 2) % FUN_DISTRACTORS.length]];
      correct = 2;
      hint = "Segment means a finite section. Hence, it starts at point A and ends at point B with exact measurable distance.";
    } 
    else if (activeSubId.includes("kiran")) {
      question = `[${levelText} - Q${i}] A beam of flashlight originating at a torch battery and shooting through ${term} tunnels represents which geometry structure?`;
      options = ["A Point (Bindu)", "A Ray (Kiran) - starting at 1 origin and flying infinitely!", "A line segment with two endpoints", FUN_DISTRACTORS[(i + 3) % FUN_DISTRACTORS.length]];
      correct = 1;
      hint = "Think about a solar beam. It originates at the Sun (1 vertex) and travels forward forever.";
    } 
    else if (activeSubId.includes("shikhar")) {
      question = `[${levelText} - Q${i}] A triangle formed by cricket boundaries in ${term} contains how many vertices (intersection Shikhar tips)?`;
      options = ["One vertex", "Two vertices", "Three vertices (Triangles have 3 corners!)", FUN_DISTRACTORS[(i + 4) % FUN_DISTRACTORS.length]];
      correct = 2;
      hint = "Each pointy corner of the triangle where straight boundaries intersect is a Shikhar!";
    } 
    else if (activeSubId.includes("max")) {
      const v1 = i * 15 + 100;
      const v2 = i * 20 + 200;
      const v3 = i * 11 + 50;
      const maxQuizStories = [
        { question: `[${levelText} - Q${i}] Rohit's cricket scores at ${term}: [${v1}, ${v2}, ${v3}]. His coach needs the MAXIMUM score to decide the playing XI! Which is the highest?`, correctText: `${v2} - the highest score, that's Rohit's best innings!`, hint: "Compare the hundreds digit to find the peak score." },
        { question: `[${levelText} - Q${i}] IPL ticket prices at ${term}: [Rs ${v1}, Rs ${v2}, Rs ${v3}]. Find the MAXIMUM price — that's the worst-case budget!`, correctText: `Rs ${v2} - the peak price, that's the MAXIMUM!`, hint: "Find the highest rupee amount." },
        { question: `[${levelText} - Q${i}] Biryani Bhai's spice costs at ${term}: [Rs ${v1}, Rs ${v2}, Rs ${v3}]. Which is the MAXIMUM expense?`, correctText: `Rs ${v2} - the most expensive spice!`, hint: "Compare the hundreds digit." }
      ];
      const story = maxQuizStories[i % maxQuizStories.length];
      question = story.question;
      options = [`${v1}`, story.correctText, `${v3}`, FUN_DISTRACTORS[(i + 5) % FUN_DISTRACTORS.length]];
      correct = 1;
      hint = story.hint;
    } 
    else if (activeSubId.includes("min")) {
      const valA = - (i * 3);
      const valB = - (i * 4 + 1);
      const valC = 0;
      const minQuizStories = [
        { question: `[${levelText} - Q${i}] Munnar tea estate frost warnings at ${term}: [${valC}°C, ${valA}°C, ${valB}°C]. Find the MINIMUM — when tea leaves freeze most!`, correctText: `${valB}°C — the coldest night, that's the MINIMUM!`, hint: "The most negative value is the minimum." },
        { question: `[${levelText} - Q${i}] Hill station freezer temps at ${term}: [${valC}°C, ${valA}°C, ${valB}°C]. The MINIMUM means the kulfi might crack!`, correctText: `${valB}°C — the deepest freeze, that's the MINIMUM!`, hint: "Find the lowest temperature." },
        { question: `[${levelText} - Q${i}] Backwaters houseboat night temps at ${term}: [${valC}°C, ${valA}°C, ${valB}°C]. The MINIMUM is when you need extra blankets!`, correctText: `${valB}°C — the coldest reading!`, hint: "The furthest left from zero on the number line." }
      ];
      const story = minQuizStories[i % minQuizStories.length];
      question = story.question;
      options = [`${valC}°C`, `${valA}°C`, story.correctText, FUN_DISTRACTORS[(i + 6) % FUN_DISTRACTORS.length]];
      correct = 2;
      hint = story.hint;
    } 
    else if (activeSubId.includes("range")) {
      const top = i * 12 + 150;
      const bottom = i * 2 + 10;
      const rangePr = top - bottom;
      const rangeQuizStories = [
        { question: `[${levelText} - Q${i}] Mumbai local tickets at ${term}: second class Rs ${bottom}, AC first Rs ${top}. What's the Range (Fasla)?`, correctText: `Rs ${rangePr} — Max minus Min, that's the Fasla!`, hint: "Range = Maximum - Minimum. Subtract!" },
        { question: `[${levelText} - Q${i}] Jaipur dupatta prices at ${term}: basic Rs ${bottom}, fancy Rs ${top}. What's the price Fasla?`, correctText: `Rs ${rangePr} — the price spread!`, hint: "Subtract the minimum from the maximum." },
        { question: `[${levelText} - Q${i}] Kolkata sweet prices at ${term}: rasgulla Rs ${bottom}, sandesh Rs ${top}. What's the Range?`, correctText: `Rs ${rangePr} — Mohan's product spread!`, hint: "Range = Max - Min." }
      ];
      const story = rangeQuizStories[i % rangeQuizStories.length];
      question = story.question;
      options = [story.correctText, `Rs ${top}`, `Rs ${bottom}`, FUN_DISTRACTORS[(i + 7) % FUN_DISTRACTORS.length]];
      correct = 0;
      hint = story.hint;
    } 
    else if (activeSubId.includes("basics")) {
      const n1 = - (i * 6);
      const n2 = - (i * 2 + 1);
      const basicsQuizStories = [
        { question: `[${levelText} - Q${i}] Chai Dost's debt ledger at ${term}: Rahul owes ${n1} rupees, Vikram owes ${n2} rupees. Who has LESS debt (is closer to zero)?`, correctText: `${n2} — less debt, closer to zero!`, hint: "The number closer to zero on the number line is larger." },
        { question: `[${levelText} - Q${i}] Auto Wale Uncle's weather apps at ${term}: one shows ${n1}°C, another shows ${n2}°C. Which is WARMER?`, correctText: `${n2}°C — closer to zero, so warmer!`, hint: "Find which number is closer to zero." },
        { question: `[${levelText} - Q${i}] Momos Didi's daily losses at ${term}: Monday ${n1} rupees, Tuesday ${n2} rupees. Which day was BETTER?`, correctText: `${n2} rupees — smaller loss, better day!`, hint: "The smaller negative number is the better outcome." }
      ];
      const story = basicsQuizStories[i % basicsQuizStories.length];
      question = story.question;
      options = [`${n1}`, story.correctText, "Both are equal values", FUN_DISTRACTORS[(i + 8) % FUN_DISTRACTORS.length]];
      correct = 1;
      hint = story.hint;
    } 
    else if (activeSubId.includes("decimals")) {
      const decA = (12.4 + i * 0.05).toFixed(2);
      const decB = (12.04 + i * 0.05).toFixed(2);
      const decimalQuizStories = [
        { question: `[${levelText} - Q${i}] Kanna's filter coffee at ${term}: Cup A has ${decA} ml, Cup B has ${decB} ml. Which has MORE decoction?`, correctText: `${decA} ml is greater — tenths place 4 beats 0!`, hint: "Compare tenths place first, then hundredths." },
        { question: `[${levelText} - Q${i}] Sweet shop sugar at ${term}: Batch A ${decA} kg, Batch B ${decB} kg. Which batch has MORE sugar?`, correctText: `${decA} kg is greater — tenths digit is bigger!`, hint: "Check the tenths place of each number." },
        { question: `[${levelText} - Q${i}] Biryani Bhai's spice blend at ${term}: Blend A ${decA} tsp, Blend B ${decB} tsp. Which is STRONGER?`, correctText: `${decA} tsp is greater — the tenths digit wins!`, hint: "Compare decimal places from left to right." }
      ];
      const story = decimalQuizStories[i % decimalQuizStories.length];
      question = story.question;
      options = [story.correctText, `${decA} is smaller than ${decB}`, "They are equivalent weight", FUN_DISTRACTORS[(i + 9) % FUN_DISTRACTORS.length]];
      correct = 0;
      hint = story.hint;
    } 
    else if (activeSubId.includes("rounding")) {
      const valBill = (299.75 + i * 0.05).toFixed(2);
      const wholeRupeeResult = Math.round(parseFloat(valBill));
      const roundingQuizStories = [
        { question: `[${levelText} - Q${i}] Chaat stall bill at ${term}: Rs. ${valBill}. The vendor says 'no coins!' Round to nearest rupee.`, correctText: `Rs. ${wholeRupeeResult} — rounded to nearest rupee!`, hint: "If decimal >= .50, round UP. Otherwise round DOWN." },
        { question: `[${levelText} - Q${i}] Auto ride meter at ${term}: Rs. ${valBill}. Uncle says 'just round it!' What's the fair amount?`, correctText: `Rs. ${wholeRupeeResult} — the rounded amount!`, hint: "Check if the decimal part is .50 or more." },
        { question: `[${levelText} - Q${i}] Vada pav bill at ${term}: Rs. ${valBill}. The vendor says 'Boss, no coins!' How much do you pay?`, correctText: `Rs. ${wholeRupeeResult} — quick round-off!`, hint: "Round to the nearest whole rupee." }
      ];
      const story = roundingQuizStories[i % roundingQuizStories.length];
      question = story.question;
      options = [`Rs. ${wholeRupeeResult - 10}`, story.correctText, `Rs. ${Math.floor(parseFloat(valBill))}`, FUN_DISTRACTORS[(i + 10) % FUN_DISTRACTORS.length]];
      correct = 1;
      hint = story.hint;
    } 
    else if (activeSubId.includes("place")) {
      const original = 84100 + i * 720;
      const thousandsVal = Math.floor((original % 10000) / 1000);
      const placeQuizStories = [
        { question: `[${levelText} - Q${i}] Tara's treasure chest code at ${term}: ${original}. The lock asks for the Thousands (Hazaar) digit! Which is it?`, correctText: `Exactly ${thousandsVal * 1000} — digit ${thousandsVal} in the Thousands place!`, hint: "Count from right: units, tens, hundreds, thousands." },
        { question: `[${levelText} - Q${i}] Rohan's locker code at ${term}: ${original}. The guard says 'Thousands digit is your key!' What is it?`, correctText: `Exactly ${thousandsVal * 1000} — the Thousands digit!`, hint: "The thousands place is the 4th digit from the right." },
        { question: `[${levelText} - Q${i}] Metro recharge code at ${term}: ${original}. Enter the Thousands digit to confirm!`, correctText: `Exactly ${thousandsVal * 1000} — digit ${thousandsVal}!`, hint: "Extract the 4th column digit and multiply by 1000." }
      ];
      const story = placeQuizStories[i % placeQuizStories.length];
      question = story.question;
      options = [`${thousandsVal * 100} units`, story.correctText, `Exactly 80,000`, FUN_DISTRACTORS[(i + 11) % FUN_DISTRACTORS.length]];
      correct = 1;
      hint = story.hint;
    } 
    else {
      // compare_order
      const seqStr = `-${i * 3}, -${i}, 0, ${i + 12}`;
      const orderQuizStories = [
        { question: `[${levelText} - Q${i}] Metro token queue at ${term}: arrange weights [${i + 12}, 0, -${i}, -${i * 3}] in ascending Kram order!`, correctText: `[${seqStr}] — lightest to heaviest, correct Kram!`, hint: "Ascending starts with the deepest negative value." },
        { question: `[${levelText} - Q${i}] Cricket scoreboard at ${term}: rank net scores [${i + 12}, 0, -${i}, -${i * 3}] from worst to best!`, correctText: `[${seqStr}] — worst to best, correct order!`, hint: "Start with the most negative score." },
        { question: `[${levelText} - Q${i}] Tea shop debt list at ${term}: sort balances [${i + 12}, 0, -${i}, -${i * 3}] ascending!`, correctText: `[${seqStr}] — smallest to largest!`, hint: "Begin with the deepest debt." }
      ];
      const story = orderQuizStories[i % orderQuizStories.length];
      question = story.question;
      options = [
        `[${i + 12}, 0, -${i}, -${i * 3}]`,
        story.correctText,
        `[0, -${i}, -${i * 3}, ${i + 12}]`,
        FUN_DISTRACTORS[(i + 12) % FUN_DISTRACTORS.length]
      ];
      correct = 1;
      hint = story.hint;
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
