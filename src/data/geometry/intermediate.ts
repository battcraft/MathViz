/**
 * Geometry — Intermediate Level (Class 7)
 *
 * Builds on Beginner concepts with more mathematical rigor.
 * Covers: Number Lines, Coordinate Geometry Basics, Angles, Parallel Lines Properties.
 * Adds negative coordinates, quadrants, and measurement precision.
 *
 * Content style: Hinglish with mathematical vocabulary, number line focus.
 */

import { LevelTopicContent } from "./types";

export const geometryIntermediate: LevelTopicContent = {
  topicId: "geom",
  topicName: "📐 Geometry: Rekha & Bindu",
  level: "intermediate",
  classLevel: "Class 7",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // NUMBER LINE & COORDINATE BASICS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_bindu",
      name: "💡 Bindu (Point) — Coordinates & Number Line",
      screens: [
        {
          id: "bindu_inter_1",
          title: "💡 Number Line pe Bindu: Positive & Negative Coordinates",
          conceptHeading: "Points on the Number Line",
          explanation:
            "Doston, ab hum sirf positive coordinates nahi dekhenge! Number line pe negative bhi hain. Origin (0) ke baayein negative numbers hain aur right mein positive. Ek point (-3, 2) ka matlab hai: 3 units LEFT aur 2 units UP. Har point ek UNIQUE location hai!",
          interactiveType: "point_hunt",
          pangaHint: "Negative coordinates bhi click karke dhoondho!",
          thinkBox: [
            {
              id: "bindu_int_tb1",
              question: "Point (-2, -3) kis quadrant mein hai? 🤔",
              answer:
                "Teesra quadrant (Q3)! Negative x (left) aur negative y (down). Quadrants: Q1(+,+), Q2(-,+), Q3(-,-), Q4(+,-).",
              hint: "X negative = left, Y negative = down.",
            },
            {
              id: "bindu_int_tb2",
              question: "Number line pe -5 aur -10 mein kaunsa chhota hai?",
              answer:
                "-10 chhota hai! Negative numbers mein jo ZYADA door hai zero se, woh CHHOTA hota hai. -10 < -5 < 0 < 5 < 10.",
              hint: "Zero se zyada door = zyada negative = chhota.",
            },
            {
              id: "bindu_int_tb3",
              question: "Origin (0,0) kis quadrant mein hai?",
              answer:
                "Origin kisi quadrant mein NAHI hai! Woh DONO axes ke intersection pe hai — x-axis aur y-axis milte hain wahan!",
              hint: "Axes pe points quadrants mein nahi aate.",
            },
          ],
        },
        {
          id: "bindu_inter_2",
          title: "💡 Quadrant System: 4 Zones of the Coordinate Plane",
          conceptHeading: "The Cartesian Quadrant System",
          explanation:
            "Coordinate plane 4 quadrants mein divide hota hai! Q1: (+,+) — right up. Q2: (-,+) — left up. Q3: (-,-) — left down. Q4: (+,-) — right down. Har quadrant ka apna signature hai!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "bindu_int_tb4",
              question: "Point (4, -7) kis quadrant mein hoga?",
              answer:
                "Chautha quadrant (Q4)! X positive (right) aur Y negative (down). Remember: Q1(+,+), Q2(-,+), Q3(-,-), Q4(+,-).",
              hint: "X positive, Y negative = Q4.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "bindu_int_act1",
          title: "Number Line Mapping Activity",
          description: "Paper pe number line banao aur points plot karo!",
          materials: ["Graph paper", "Pencil", "Ruler", "Colored pens"],
          steps: [
            "Graph paper pe x-axis aur y-axis banao (-10 to +10).",
            "Origin (0,0) mark karo aur label karo.",
            "10 points plot karo — positive, negative, aur axis pe bhi.",
            "Har point ka quadrant identify karo (Q1, Q2, Q3, Q4).",
            "Puzzle: kya (3,0) kisi quadrant mein hai? (Nahi — woh x-axis pe hai!)",
          ],
          outcome:
            "Student quadrants clearly samajh lega aur negative coordinates handle kar payega!",
        },
        {
          id: "bindu_int_act2",
          title: "Treasure Map Coordinate Challenge",
          description: "Coordinates se treasure dhundho!",
          materials: ["Graph paper", "Pencil", "Prize/sticker"],
          steps: [
            "Teacher 5 hidden 'treasure' coordinates dete hain (mixed positive/negative).",
            "Students ko coordinates plot karna hai aur exact location dhundhni hai.",
            "Pehla jo sahi jagah pe mark kare, woh jeetega!",
          ],
          outcome:
            "Student coordinate plotting mein fast aur accurate hoga!",
        },
      ],
      teacherTips: [
        {
          id: "bindu_int_tt1",
          tip: "Number line pe physically move karao — '0 se 3 left jao = -3'. Physical movement se negative samajh aata hai!",
          context: "Jab negative coordinates introduce karo.",
        },
        {
          id: "bindu_int_tt2",
          tip: "Quadrant song/rhyme use karo: 'Q1 right up, Q2 left up, Q3 left down, Q4 right down!'",
          context: "Quadrants yaad karne ke liye.",
        },
      ],
      worksheet: [
        {
          id: "bindu_int_w1",
          question: "Point (-4, 6) kis quadrant mein hai?",
          options: ["Q1", "Q2", "Q3", "Q4"],
          correct: 1,
          hint: "X negative = left, Y positive = up = Q2",
          part: "A",
          partDescription: "Multiple Choice — Quadrant Identification",
        },
        {
          id: "bindu_int_w2",
          question: "Number line pe -8 aur -3 mein kaunsa bada hai?",
          options: ["-8", "-3", "Dono barabar", "Depends on context"],
          correct: 1,
          hint: "-3 zero ke zyada paas hai!",
          part: "A",
          partDescription: "Multiple Choice — Number Line Comparison",
        },
        {
          id: "bindu_int_w3",
          question: "Kya point (0, 5) kisi quadrant mein hai?",
          options: ["Haan, Q1", "Haan, Q2", "Nahi, yeh y-axis pe hai", "Nahi, yeh x-axis pe hai"],
          correct: 2,
          hint: "Jab x ya y zero ho, woh axis pe hota hai, quadrant mein nahi!",
          part: "B",
          partDescription: "True/False — Concept Check",
        },
        {
          id: "bindu_int_w4",
          question: "Neeche diye gaye points ko correct quadrant mein lagao: A(3,4), B(-2,5), C(-4,-1), D(6,-3)",
          correct: "A→Q1, B→Q2, C→Q3, D→Q4",
          hint: "Har quadrant ka (+/-) signature yaad karo!",
          part: "C",
          partDescription: "Short Answer — Classification",
        },
        {
          id: "bindu_int_w5",
          question: "Ek treasure map pe 5 points mark karo jo har quadrant mein ho aur ek axis pe ho.",
          correct: "Student-apna-answer",
          hint: "Q1, Q2, Q3, Q4 + ek axis point!",
          part: "D",
          partDescription: "Creative Activity — Application",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // LINES — PARALLEL, INTERSECTING, ANGLES
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_rekha",
      name: "💡 Rekha (Line) — Types & Angles",
      screens: [
        {
          id: "rekha_inter_1",
          title: "💡 Types of Lines: Parallel, Intersecting & Perpendicular",
          conceptHeading: "Classifying Lines by Relationship",
          explanation:
            "Ab hum lines ko RELATIONSHIP se classify karte hain! Parallel lines = same distance, kabhi nahi milti. Intersecting lines = ek point pe milti hain. Perpendicular lines = 90° angle pe milti hain — jaise cricket pitch ke boundary lines!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "rekha_int_tb1",
              question: "Cricket pitch ke 4 boundary lines kaisi hain?",
              answer:
                "Do opposite boundaries PARALLEL hain (kabhi nahi milti). Do adjacent boundaries PERPENDICULAR hain (90° angle pe milti hain). Dono types cricket mein hain!",
              hint: "Opposite = parallel, Adjacent = perpendicular.",
            },
            {
              id: "rekha_int_tb2",
              question: "Kya perpendicular lines parallel hoti hain?",
              answer:
                "Bilkul nahi! Perpendicular lines 90° pe milti hain, parallel lines kabhi nahi milti. Dono concepts opposite hain!",
              hint: "Milna vs na milna — fark hai!",
            },
          ],
        },
        {
          id: "rekha_inter_2",
          title: "💡 Angles: Acute, Right, Obtuse & Straight",
          conceptHeading: "Types of Angles at Intersection",
          explanation:
            "Jab do lines milti hain, angles bante hain! Acute angle < 90° (sharp). Right angle = 90° (square corner). Obtuse angle > 90° but < 180° (wide). Straight angle = 180° (straight line!).",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "rekha_int_tb3",
              question: "Clock ka 3:00 pe kya angle banta hai? 🕒",
              answer:
                "RIGHT ANGLE (90°)! Minute hand 12 pe, hour hand 3 pe — dono beech 90° ka angle hai!",
              hint: "3 ghante = 90° (12 ghante = 360°).",
            },
            {
              id: "rekha_int_tb4",
              question: "Straight line ka angle kitna hota hai? 📏",
              answer:
                "180°! Straight line pe koi bend nahi hota — isliye angle 180° hota hai (half circle).",
              hint: "Full circle = 360°, Half = 180°.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "rekha_inter_act1",
          title: "Angle Measurement with Protractor",
          description: "Protractor se angles measure karo!",
          materials: ["Protractor", "Ruler", "Pencil", "Paper"],
          steps: [
            "Paper pe 5 alag-alag angles banao (acute, right, obtuse).",
            "Protractor se har angle measure karo.",
            "Table banao: Angle | Type (Acute/Right/Obtuse) | Measurement.",
            "Verify: right angle = exactly 90° hona chahiye!",
          ],
          outcome:
            "Student protractor use karna seekhega aur angles classify kar payega!",
        },
        {
          id: "rekha_inter_act2",
          title: "Parallel & Perpendicular Line Drawing",
          description: "Ruler aur compass se lines banao!",
          materials: ["Ruler", "Compass", "Pencil", "Paper"],
          steps: [
            "Paper pe ek straight line banao (line L).",
            "Compass se parallel line banao (same distance pe).",
            "Line L pe perpendicular line banao (90° angle).",
            "Verify: parallel lines kabhi milti nahi, perpendicular 90° pe milti hain!",
          ],
          outcome:
            "Student line relationships practically samajh lega!",
        },
      ],
      teacherTips: [
        {
          id: "rekha_int_tt1",
          tip: "Hands se angles banao — acute (< 90°), right (90° L-shape), obtuse (> 90°). Kinesthetic learning!",
          context: "Angles introduce karte waqt.",
        },
        {
          id: "rekha_int_tt2",
          tip: "Real-life angles dikhao — book corner = right angle, clock hands = various angles, scissors = acute angle!",
          context: "Students ko angles real-world se connect karane ke liye.",
        },
      ],
      worksheet: [
        {
          id: "rekha_int_w1",
          question: "90° angle ko kya kehte hain?",
          options: ["Acute Angle", "Right Angle", "Obtuse Angle", "Straight Angle"],
          correct: 1,
          hint: "L-shape = Right angle!",
          part: "A",
          partDescription: "Multiple Choice — Angle Identification",
        },
        {
          id: "rekha_int_w2",
          question: "Kya perpendicular lines parallel hoti hain?",
          options: ["Haan", "Nahi", "Kabhi kabhi", "Sirf square mein"],
          correct: 1,
          hint: "Perpendicular = 90° pe milti hain, Parallel = kabhi nahi milti!",
          part: "B",
          partDescription: "True/False — Concept Check",
        },
        {
          id: "rekha_int_w3",
          question: "Clock ka 6:00 pe kya angle banta hai?",
          options: ["90°", "180°", "45°", "270°"],
          correct: 1,
          hint: "Minute hand 12 pe, hour hand 6 pe — straight line!",
          part: "A",
          partDescription: "Multiple Choice — Application",
        },
        {
          id: "rekha_int_w4",
          question: "5°, 90°, 135°, 180° ko correct type mein classify karo.",
          correct: "5°=Acute, 90°=Right, 135°=Obtuse, 180°=Straight",
          hint: "<90° = Acute, =90° = Right, >90° = Obtuse, 180° = Straight",
          part: "C",
          partDescription: "Classification — Multiple Types",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // SEGMENT — MEASUREMENT & COMPARISON
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_khand",
      name: "💡 Khand (Segment) — Measurement & Comparison",
      screens: [
        {
          id: "khand_inter_1",
          title: "💡 Segment Length Comparison & Ordering",
          conceptHeading: "Comparing Segment Lengths",
          explanation:
            "Ab hum segments ki length COMPARE karenge! Agar segment AB = 5cm aur segment CD = 8cm, toh CD > AB. Hum segments ko ascending ya descending order mein bhi arrange kar sakte hain!",
          interactiveType: "range_slider",
          thinkBox: [
            {
              id: "khand_int_tb1",
              question: "Agar AB = 12cm, BC = 8cm, aur AC = 20cm, toh C kahan hai?",
              answer:
                "C, AB ke extended pe hai! AB + BC = 12 + 8 = 20 = AC. Segment Addition Postulate verify ho gaya!",
              hint: "AB + BC = AC? Check karo!",
            },
            {
              id: "khand_int_tb2",
              question: "Kya do segments ki length same ho sakti hain agar unke endpoints alag hain?",
              answer:
                "Haan! Bilkul ho sakti hai. Jaise Delhi Metro ka track aur Bangalore Metro ka track — dono segments hain, alag jagah hain, lekin length same ho sakti hai!",
              hint: "Length ≠ location. Length measure se determine hoti hai.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "khand_inter_act1",
          title: "Segment Length Sorting Challenge",
          description: "Alag lambai ke segments banao aur sort karo!",
          materials: ["Paper", "Pencil", "Ruler", "Scissors"],
          steps: [
            "Paper pe 5 alag lambai ke segments cut karo (3cm, 5cm, 7cm, 4cm, 6cm).",
            "Har segment pe label lagao (A, B, C, D, E).",
            "Unhe ascending order mein arrange karo (sabse chhota pehle).",
            "Verify: ruler se dubara measure karke check karo!",
          ],
          outcome:
            "Student segments ko measure, compare, aur sort kar payega!",
        },
      ],
      teacherTips: [
        {
          id: "khand_int_tt1",
          tip: "Segment Addition ko real-life distances se jodo: 'Ghar se bus stop 2km, bus stop se school 3km = ghar se school 5km!'",
          context: "Segment addition sikhate waqt.",
        },
      ],
      worksheet: [
        {
          id: "khand_int_w1",
          question: "AB = 15cm, BC = 9cm. Agar C, AB ke extended pe hai toh AC = ?",
          options: ["6cm", "24cm", "15cm", "9cm"],
          correct: 1,
          hint: "AC = AB + BC = 15 + 9",
          part: "A",
          partDescription: "Multiple Choice — Segment Addition",
        },
        {
          id: "khand_int_w2",
          question: "Segments ko ascending order mein arrange karo: PQ=8cm, RS=3cm, TU=11cm, VW=5cm",
          correct: "RS(3cm) < VW(5cm) < PQ(8cm) < TU(11cm)",
          hint: "Sabse chhota pehle!",
          part: "C",
          partDescription: "Short Answer — Ordering",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // RAY — DIRECTION & ANGLES
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_kiran",
      name: "💡 Kiran (Ray) — Direction & Angle Formation",
      screens: [
        {
          id: "kiran_inter_1",
          title: "💡 Ray Direction & Angle Formation",
          conceptHeading: "How Rays Create Angles",
          explanation:
            "Jab do rays ek hi origin point se alag directions mein jaate hain, toh ek ANGLE banta hai! Jaise clock ke do hands — dono center (origin) se hain aur alag direction mein jaate hain. Angle = difference in direction!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "kiran_int_tb1",
              question: "Clock ka 12:00 pe angle kitna hota hai?",
              answer:
                "0°! Dono hands same direction mein hain (12 pe) — koi angle nahi banta. Jab dono rays same direction ho, angle = 0°!",
              hint: "Same direction = 0° angle.",
            },
            {
              id: "kiran_int_tb2",
              question: "Do rays se maximum kitna angle ban sakta hai?",
              answer:
                "180°! Jab dono rays opposite directions mein ho (straight line), angle = 180°. Zyada nahi ho sakta kyunki phir woh ray nahi, line ban jayegi!",
              hint: "Opposite directions = straight line = 180°.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "kiran_inter_act1",
          title: "Clock Angle Investigation",
          description: "Clock pe angles observe karo!",
          materials: ["Clock (real ya paper)", "Protractor", "Notebook"],
          steps: [
            "Clock pe 3:00, 6:00, 9:00, 12:00 pe angles measure karo.",
            "Table banao: Time | Hour Angle | Minute Angle | Angle Between.",
            "Pattern dhundho: har ghante kitna angle change hota hai!",
            "Bonus: 2:30 pe angle kitna hoga? Calculate karo!",
          ],
          outcome:
            "Student samajhega ki rays se angles kaise bante hain aur time se kaise related hain!",
        },
      ],
      teacherTips: [
        {
          id: "kiran_int_tt1",
          tip: "Paper pe do straws (rays) pin se attach karo aur angle ghumaake dikhao!",
          context: "Angles with rays introduce karte waqt.",
        },
      ],
      worksheet: [
        {
          id: "kiran_int_w1",
          question: "Clock ka 3:00 pe kitna angle banta hai?",
          options: ["90°", "180°", "45°", "0°"],
          correct: 0,
          hint: "3 ghante = 90° (12 ghante = 360°).",
          part: "A",
          partDescription: "Multiple Choice — Angle from Rays",
        },
        {
          id: "kiran_int_w2",
          question: "Do rays 0° angle banayein toh kya hota hai?",
          options: ["Straight line", "Same direction, no visible angle", "90° angle", "Perpendicular"],
          correct: 1,
          hint: "Same direction = no angle visible!",
          part: "B",
          partDescription: "True/False — Concept Check",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // SHIKHAR (VERTEX) — ANGLES & POLYGONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_shikhar",
      name: "💡 Shikhar (Vertex) — Angles & Polygon Properties",
      screens: [
        {
          id: "shikhar_inter_1",
          title: "💡 Vertices & Interior Angles of Polygons",
          conceptHeading: "Counting Angles at Vertices",
          explanation:
            "Har polygon ke vertices pe ek INTERIOR ANGLE hota hai! Triangle = 3 vertices = 3 angles. Quadrilateral = 4 vertices = 4 angles. Sum of interior angles formula: (n-2) × 180°, jahan n = number of sides!",
          interactiveType: "point_hunt",
          pangaHint: "Vertices pe click karke angles count karo!",
          thinkBox: [
            {
              id: "shikhar_int_tb1",
              question: "Triangle ke 3 interior angles ka sum kitna hota hai?",
              answer:
                "180°! Formula: (3-2) × 180° = 1 × 180° = 180°. Isliye triangle ke teeno angles milke adha circle bante hain!",
              hint: "Formula: (n-2) × 180°",
            },
            {
              id: "shikhar_int_tb2",
              question: "Rectangle ke 4 angles ka sum kitna hai?",
              answer:
                "360°! Formula: (4-2) × 180° = 2 × 180° = 360°. Aur har angle 90° hai — 4 × 90° = 360°!",
              hint: "Rectangle = 4 right angles = 4 × 90°",
            },
          ],
        },
      ],
      activities: [
        {
          id: "shikhar_inter_act1",
          title: "Polygon Angle Sum Investigation",
          description: "Alag polygons ke angles sum karo!",
          materials: ["Paper", "Pencil", "Protractor", "Ruler"],
          steps: [
            "Triangle, quadrilateral, pentagon, hexagon banao.",
            "Har polygon ke sab angles measure karo.",
            "Sum nikalo aur table banao: Shape | Vertices | Angle Sum.",
            "Formula verify karo: (n-2) × 180°.",
          ],
          outcome:
            "Student polygon angle formula practically verify kar lega!",
        },
      ],
      teacherTips: [
        {
          id: "shikhar_int_tt1",
          tip: "Triangle ko tear karo aur teeno angles ek line pe rakhoge toh 180° banega! Visual proof powerful hai!",
          context: "Triangle angle sum proof ke liye.",
        },
      ],
      worksheet: [
        {
          id: "shikhar_int_w1",
          question: "Triangle ke interior angles ka sum kitna hai?",
          options: ["90°", "180°", "270°", "360°"],
          correct: 1,
          hint: "(3-2) × 180° = 180°",
          part: "A",
          partDescription: "Multiple Choice — Formula Application",
        },
        {
          id: "shikhar_int_w2",
          question: "Pentagon (5 sides) ke interior angles ka sum kitna hai?",
          options: ["540°", "720°", "360°", "900°"],
          correct: 0,
          hint: "(5-2) × 180° = 3 × 180°",
          part: "A",
          partDescription: "Multiple Choice — Formula Application",
        },
        {
          id: "shikhar_int_w3",
          question: "Hexagon ke kitne vertices hain? Angles ka sum kitna hai?",
          correct: "6 vertices, 720° angle sum",
          hint: "Hexagon = 6 sides. Formula: (6-2) × 180° = 720°",
          part: "C",
          partDescription: "Short Answer — Multi-step",
        },
      ],
    },
  ],
};
