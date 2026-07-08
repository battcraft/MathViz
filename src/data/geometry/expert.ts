/**
 * Geometry — Expert Level (Class 8)
 *
 * Advanced content with proof-based reasoning and coordinate geometry.
 * Covers: Coordinate Geometry Proofs, Distance Formula, Section Formula,
 * Congruence & Similarity, Transformations (Reflection, Rotation, Translation).
 *
 * Content style: Formal mathematical language with Hinglish support,
 * focus on proofs, derivations, and multi-step problem solving.
 */

import { LevelTopicContent } from "./types";

export const geometryExpert: LevelTopicContent = {
  topicId: "geom",
  topicName: "📐 Geometry: Rekha & Bindu",
  level: "expert",
  classLevel: "Class 8",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // COORDINATE GEOMETRY — PROOFS & DISTANCE
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_bindu",
      name: "💡 Bindu (Point) — Coordinate Geometry & Proofs",
      screens: [
        {
          id: "bindu_expert_1",
          title: "💡 Distance Formula: Calculating Distance Between Two Points",
          conceptHeading: "The Distance Formula Derivation",
          explanation:
            "Advanced coordinate geometry mein hum DISTANCE FORMULA use karte hain! Agar do points A(x₁, y₁) aur B(x₂, y₂) hain, toh unka distance: d = √[(x₂-x₁)² + (y₂-y₁)²]. Yeh Pythagorean theorem se derive hota hai — right triangle mein hypotenuse = √(base² + height²)!",
          interactiveType: "point_hunt",
          pangaHint: "Coordinates enter karo aur distance calculate karo!",
          thinkBox: [
            {
              id: "bindu_exp_tb1",
              question: "Distance formula kis theorem pe based hai? 🤔",
              answer:
                "Pythagorean theorem pe! Jab do points ko connect karte hain, ek right triangle banta hai. Base = |x₂-x₁|, Height = |y₂-y₁|, Hypotenuse = Distance!",
              hint: "a² + b² = c² — wohi formula hai!",
            },
            {
              id: "bindu_exp_tb2",
              question: "Points A(1, 2) aur B(4, 6) ka distance kitna hai?",
              answer:
                "d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5 units! Check: base=3, height=4, hypotenuse=5 — classic 3-4-5 triangle!",
              hint: "Distance formula lagao: √[(x₂-x₁)² + (y₂-y₁)²]",
            },
            {
              id: "bindu_exp_tb3",
              question: "Kya distance kabhi negative ho sakta hai?",
              answer:
                "Bilkul nahi! Distance hamesha POSITIVE hota hai (ya zero agar dono points same ho). Square root hamesha non-negative hota hai!",
              hint: "Distance = magnitude = always ≥ 0.",
            },
          ],
        },
        {
          id: "bindu_expert_2",
          title: "💡 Midpoint Formula & Section Formula",
          conceptHeading: "Finding Points on a Segment",
          explanation:
            "Midpoint Formula: Agar A(x₁, y₁) aur B(x₂, y₂) hain, toh midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2). Section Formula: Agar point P segment AB ko ratio m:n mein divide kare, toh P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)). Yeh coordinate geometry ke POWER tools hain!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "bindu_exp_tb4",
              question: "Points (2, 3) aur (8, 7) ka midpoint kya hoga?",
              answer:
                "M = ((2+8)/2, (3+7)/2) = (5, 5). Dono coordinates ka average — simple!",
              hint: "Midpoint = average of x + average of y.",
            },
            {
              id: "bindu_exp_tb5",
              question: "Agar P segment AB ko 1:1 mein divide kare, toh P kya hai?",
              answer:
                "P = MIDPOINT! 1:1 ratio = equal division = midpoint. Section formula verify: P = ((1·x₂+1·x₁)/2, (1·y₂+1·y₁)/2) = midpoint!",
              hint: "1:1 = equal parts = midpoint.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "bindu_exp_act1",
          title: "Distance Formula Proof Writing",
          description: "Pythagorean theorem se distance formula derive karo!",
          materials: ["Graph paper", "Pencil", "Ruler"],
          steps: [
            "Graph paper pe points A(1, 1) aur B(4, 5) plot karo.",
            "A se B tak horizontal aur vertical lines banao — ek right triangle banta hai!",
            "Base = 4-1 = 3, Height = 5-1 = 4.",
            "Pythagorean theorem: d² = 3² + 4² = 9 + 16 = 25, d = 5.",
            "Ab distance formula se verify karo: √[(4-1)² + (5-1)²] = √25 = 5. ✓",
          ],
          outcome:
            "Student distance formula ko proof-based samajh lega, sirf formula ratne se nahi!",
        },
        {
          id: "bindu_exp_act2",
          title: "Midpoint Treasure Hunt",
          description: "Midpoint formula se treasure dhundho!",
          materials: ["Graph paper", "Pencil", "Prizes"],
          steps: [
            "Teacher 3 pairs of points dete hain.",
            "Students ko midpoint calculate karna hai.",
            "Graph paper pe plot karke verify karo!",
            "Bonus: kya midpoint always segment ke centre pe hota hai? (Haan!)",
          ],
          outcome:
            "Student midpoint formula fast aur accurately use karega!",
        },
      ],
      teacherTips: [
        {
          id: "bindu_exp_tt1",
          tip: "Distance formula ko Pythagorean theorem se DERIVE karo, sirf ratne se nahi! Proof understanding se concept strong hota hai!",
          context: "Distance formula introduce karte waqt.",
        },
        {
          id: "bindu_exp_tt2",
          tip: "Section formula ko 1:1 (midpoint) se start karo, phir 2:1, 3:2 etc. Progressive complexity!",
          context: "Section formula sikhate waqt.",
        },
      ],
      worksheet: [
        {
          id: "bindu_exp_w1",
          question: "Points A(0, 0) aur B(3, 4) ka distance kitna hai?",
          options: ["5", "7", "12", "25"],
          correct: 0,
          hint: "d = √[3² + 4²] = √[9+16] = √25 = 5",
          part: "A",
          partDescription: "Multiple Choice — Distance Formula",
        },
        {
          id: "bindu_exp_w2",
          question: "Points (5, -1) aur (-3, 3) ka midpoint nikalo.",
          options: ["(1, 1)", "(2, 1)", "(1, 2)", "(8, -4)"],
          correct: 0,
          hint: "M = ((5+(-3))/2, (-1+3)/2) = (2/2, 2/2) = (1, 1)",
          part: "A",
          partDescription: "Multiple Choice — Midpoint Formula",
        },
        {
          id: "bindu_exp_w3",
          question: "Agar A(1, 2) aur B(7, 8) hai, toh point P jo AB ko 1:2 mein divide kare, uske coordinates nikalo.",
          correct: "(3, 4)",
          hint: "P = ((1·7+2·1)/(1+2), (1·8+2·2)/(1+2)) = (9/3, 12/3) = (3, 4)",
          part: "C",
          partDescription: "Short Answer — Section Formula",
        },
        {
          id: "bindu_exp_w4",
          question: "Prove karo ki triangle A(0,0), B(3,0), C(0,4) ek right triangle hai using distance formula.",
          correct: "AB=3, AC=4, BC=5. AB²+AC²=9+16=25=BC². Right angle at A!",
          hint: "Distance formula se teeno sides nikalo aur Pythagorean theorem verify karo!",
          part: "D",
          partDescription: "Proof — Multi-step Reasoning",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // LINES — CONGRUENCE & SIMILARITY
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_rekha",
      name: "💡 Rekha (Line) — Congruence & Similarity Proofs",
      screens: [
        {
          id: "rekha_expert_1",
          title: "💡 Congruent Triangles: SSS, SAS, ASA, RHS",
          conceptHeading: "Triangle Congruence Criteria",
          explanation:
            "Do triangles CONGRUENT hain agar unke corresponding sides aur angles EQUAL hain! 4 criteria: SSS (Side-Side-Side), SAS (Side-Angle-Side), ASA (Angle-Side-Angle), RHS (Right angle-Hypotenuse-Side). Agar ek bhi criterion satisfy ho, triangles congruent hain!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "rekha_exp_tb1",
              question: "SSS criterion kya kehta hai?",
              answer:
                "Agar do triangles ke teeno corresponding sides EQUAL hain, toh woh CONGRUENT hain! Side 1 = Side 1', Side 2 = Side 2', Side 3 = Side 3' → Congruent!",
              hint: "S = Side. Teen sides barabar = congruent.",
            },
            {
              id: "rekha_exp_tb2",
              question: "Kya AAA (Angle-Angle-Angle) congruence criterion hai?",
              answer:
                "Nahi! AAA SIMILARITY criterion hai, congruence nahi. AAA mein angles equal hain lekin sides proportional ho sakti hain (badi chhoti). Congruence ke liye sides bhi equal honi chahiye!",
              hint: "AAA = Similar, SSS = Congruent. Fark hai!",
            },
          ],
        },
        {
          id: "rekha_expert_2",
          title: "💡 Similar Triangles: AA, SAS, SSS Similarity",
          conceptHeading: "Triangle Similarity Criteria",
          explanation:
            "Similar triangles mein corresponding angles EQUAL hain aur sides PROPORTIONAL hain. Criteria: AA (Angle-Angle), SAS (Side-Angle-Side with proportion), SSS (all sides proportional). Similar triangle ka SCALE FACTOR hota hai!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "rekha_exp_tb3",
              question: "Agar triangle ABC ~ triangle DEF hai, toh kya matlab hai?",
              answer:
                "∠A=∠D, ∠B=∠E, ∠C=∠F (angles equal) aur AB/DE = BC/EF = AC/DF (sides proportional). ~ symbol = SIMILAR!",
              hint: "~ means similar. Angles = equal, Sides = proportional.",
            },
          ],
        },
      ],
      activities: [
        {
          id: "rekha_exp_act1",
          title: "Congruence Proof Writing Workshop",
          description: "Proof-based congruence problems solve karo!",
          materials: ["Paper", "Pencil", "Ruler", "Protractor"],
          steps: [
            "Paper pe 2 triangles banao jinke sides measure kar sako.",
            "Teno sides measure karo aur table banao.",
            "Check: kya SSS criterion satisfy hota hai?",
            "Proof formally likho: 'In ΔABC and ΔDEF, AB=DE, BC=EF, AC=DF. ∴ ΔABC ≅ ΔDEF (SSS criterion).'",
          ],
          outcome:
            "Student formal proof writing seekhega!",
        },
      ],
      teacherTips: [
        {
          id: "rekha_exp_tt1",
          tip: "Congruence vs Similarity ka comparison chart banao — dono ko side-by-side dikhao!",
          context: "Congruence aur similarity ek saath introduce karte waqt.",
        },
        {
          id: "rekha_exp_tt2",
          tip: "Proofs ko step-by-step structured format mein likhna sikhao — 'Statement | Reason' format!",
          context: "Proof writing sikhate waqt.",
        },
      ],
      worksheet: [
        {
          id: "rekha_exp_w1",
          question: "SSS criterion mein kitne sides equal hone chahiye?",
          options: ["1", "2", "3", "4"],
          correct: 2,
          hint: "S-S-S = Side-Side-Side = 3 sides!",
          part: "A",
          partDescription: "Multiple Choice — Congruence Criteria",
        },
        {
          id: "rekha_exp_w2",
          question: "AAA congruence criterion hai ya similarity criterion?",
          options: ["Congruence", "Similarity", "Dono", "Koi nahi"],
          correct: 1,
          hint: "AAA = angles equal, sides proportional = Similar!",
          part: "B",
          partDescription: "True/False — Concept Distinction",
        },
        {
          id: "rekha_exp_w3",
          question: "ΔABC mein AB=5cm, BC=7cm, AC=9cm. ΔDEF mein DE=5cm, EF=7cm, DF=9cm. Kya dono congruent hain? Kaunse criterion se?",
          correct: "Haan, SSS criterion se! AB=DE, BC=EF, AC=DF.",
          hint: "Sides match karo: AB↔DE, BC↔EF, AC↔DF",
          part: "C",
          partDescription: "Short Answer — Criterion Application",
        },
        {
          id: "rekha_exp_w4",
          question: "Prove karo ki ΔABC ≅ ΔPQR agar AB=PQ=5cm, ∠B=∠Q=60°, BC=QR=7cm. Kaunsa criterion use hoga?",
          correct: "SAS criterion! Side-Angle-Side: AB=PQ, ∠B=∠Q, BC=QR.",
          hint: "Ek angle aur uske dono adjacent sides equal hain!",
          part: "D",
          partDescription: "Proof — Formal Writing",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // SEGMENT — TRANSFORMATIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_khand",
      name: "💡 Khand (Segment) — Transformations & Symmetry",
      screens: [
        {
          id: "khand_expert_1",
          title: "💡 Reflection: Mirror Images on Coordinate Plane",
          conceptHeading: "Reflection Transformation",
          explanation:
            "Reflection ek transformation hai jismein point ko axis ke across flip kiya jaata hai! X-axis reflection: (x, y) → (x, -y). Y-axis reflection: (x, y) → (-x, y). Origin reflection: (x, y) → (-x, -y). Mirror image coordinates change karta hai!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "khand_exp_tb1",
              question: "Point (3, 4) ka x-axis reflection kya hoga?",
              answer:
                "(3, -4)! X-axis across flip = y-coordinate change. X same rahega, Y negative ho jayega!",
              hint: "X-axis reflection: (x, y) → (x, -y)",
            },
            {
              id: "khand_exp_tb2",
              question: "Point (-2, 5) ka y-axis reflection kya hoga?",
              answer:
                "(2, 5)! Y-axis across flip = x-coordinate change. Y same rahega, X positive ho jayega!",
              hint: "Y-axis reflection: (x, y) → (-x, y)",
            },
          ],
        },
        {
          id: "khand_expert_2",
          title: "💡 Translation: Sliding Shapes on the Grid",
          conceptHeading: "Translation Transformation",
          explanation:
            "Translation mein shape ko bina rotate ya flip kiye SLIDE kiya jaata hai! Agar 3 units right aur 2 units up slide karo, toh har point (x, y) → (x+3, y+2). Shape ka size aur orientation same rehta hai!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "khand_exp_tb3",
              question: "Point (1, 2) ko 4 units right aur 3 units down slide karo. Naya point?",
              answer:
                "(1+4, 2-3) = (5, -1)! Right = x positive, Down = y negative!",
              hint: "Translation: (x, y) → (x+dx, y+dy)",
            },
          ],
        },
      ],
      activities: [
        {
          id: "khand_exp_act1",
          title: "Transformation Pattern Art",
          description: "Reflection aur translation se patterns banao!",
          materials: ["Graph paper", "Pencil", "Colored pens", "Ruler"],
          steps: [
            "Graph paper pe ek simple shape banao (triangle, square).",
            "X-axis pe reflect karo aur naya shape draw karo.",
            "Original shape ko 5 units right translate karo.",
            "Pattern banake dekho — kaleidoscope jaisa!",
          ],
          outcome:
            "Student transformations practically samajh lega aur creative use dekh sakega!",
        },
      ],
      teacherTips: [
        {
          id: "khand_exp_tt1",
          tip: "Mirror se actual reflection dikhao — paper pe shape banao aur mirror ke saamne rakho!",
          context: "Reflection transformation introduce karte waqt.",
        },
      ],
      worksheet: [
        {
          id: "khand_exp_w1",
          question: "Point (5, -3) ka x-axis reflection kya hoga?",
          options: ["(5, 3)", "(-5, -3)", "(-5, 3)", "(5, -3)"],
          correct: 0,
          hint: "X-axis reflection: y-coordinate flip!",
          part: "A",
          partDescription: "Multiple Choice — Reflection",
        },
        {
          id: "khand_exp_w2",
          question: "Point (2, 7) ko 3 units left aur 2 units up translate karo. Naya point?",
          options: ["(5, 9)", "(-1, 9)", "(-1, 5)", "(5, 5)"],
          correct: 1,
          hint: "Left = x negative, Up = y positive: (2-3, 7+2) = (-1, 9)",
          part: "A",
          partDescription: "Multiple Choice — Translation",
        },
        {
          id: "khand_exp_w3",
          question: "Origin reflection mein point (-4, 6) kya banega?",
          correct: "(4, -6)",
          hint: "Origin reflection: (x, y) → (-x, -y). Dono coordinates flip!",
          part: "B",
          partDescription: "Short Answer — Reflection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // KIRAN (RAY) — ANGLE PROOFS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_kiran",
      name: "💡 Kiran (Ray) — Angle Proofs & Properties",
      screens: [
        {
          id: "kiran_expert_1",
          title: "💡 Angle Properties: Linear Pair, Vertically Opposite",
          conceptHeading: "Angle Relationship Proofs",
          explanation:
            "Linear Pair: Jab do angles ek straight line pe hain, unka sum = 180°. Vertically Opposite Angles: Jab do lines cross karte hain, opposite angles EQUAL hote hain! Yeh geometric proofs ke FUNDAMENTAL properties hain!",
          interactiveType: "line_touch",
          thinkBox: [
            {
              id: "kiran_exp_tb1",
              question: "Linear pair angles ka sum kitna hota hai?",
              answer:
                "180°! Linear pair = adjacent angles on a straight line. Straight line = 180° = dono angles ka sum!",
              hint: "Linear = line, Pair = 2. Do angles on one line.",
            },
            {
              id: "kiran_exp_tb2",
              question: "Agar ek angle 65° hai, toh uska vertically opposite angle kitna hoga?",
              answer:
                "65°! Vertically opposite angles ALWAYS EQUAL hote hain. Agar ek 65° hai, toh opposite bhi 65°!",
              hint: "Vertically opposite = equal!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "kiran_exp_act1",
          title: "Angle Proof Practice",
          description: "Formal proofs for angle relationships likho!",
          materials: ["Paper", "Pencil", "Ruler", "Protractor"],
          steps: [
            "Paper pe 2 lines intersecting banao.",
            "4 angles measure karo.",
            "Verify: linear pair sum = 180°.",
            "Verify: vertically opposite angles equal hain.",
            "Formal proof likho with statements and reasons!",
          ],
          outcome:
            "Student angle properties ko prove kar sakega!",
        },
      ],
      teacherTips: [
        {
          id: "kiran_exp_tt1",
          tip: "Two intersecting pencils se dikhao — 4 angles bante hain. Opposite angles physically match karo!",
          context: "Vertically opposite angles introduce karte waqt.",
        },
      ],
      worksheet: [
        {
          id: "kiran_exp_w1",
          question: "Linear pair angles ka sum kitna hai?",
          options: ["90°", "180°", "270°", "360°"],
          correct: 1,
          hint: "Linear = straight line = 180°!",
          part: "A",
          partDescription: "Multiple Choice — Angle Properties",
        },
        {
          id: "kiran_exp_w2",
          question: "Agar ek angle 120° hai, toh uska linear pair partner kitna hoga?",
          options: ["60°", "120°", "180°", "240°"],
          correct: 0,
          hint: "Linear pair sum = 180°. 180° - 120° = 60°",
          part: "A",
          partDescription: "Multiple Choice — Linear Pair",
        },
        {
          id: "kiran_exp_w3",
          question: "Do lines intersect aur ek angle 75° hai. Charo angles nikalo.",
          correct: "75°, 105°, 75°, 105°",
          hint: "Vertically opposite = 75°. Linear pair = 180°-75° = 105°.",
          part: "C",
          partDescription: "Short Answer — Multi-step",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // SHIKHAR (VERTEX) — COORDINATE GEOMETRY PROOFS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "geom_shikhar",
      name: "💡 Shikhar (Vertex) — Coordinate Proofs & Area",
      screens: [
        {
          id: "shikhar_expert_1",
          title: "💡 Area of Triangle Using Coordinates",
          conceptHeading: "Coordinate Area Formula",
          explanation:
            "Agar triangle ke vertices A(x₁, y₁), B(x₂, y₂), C(x₃, y₃) hain, toh Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|. Yeh shoelace formula hai — coordinates se directly area nikalte hain without measuring height!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "shikhar_exp_tb1",
              question: "Triangle (0,0), (4,0), (0,3) ka area kitna hai?",
              answer:
                "Area = ½|0(0-3) + 4(3-0) + 0(0-0)| = ½|0 + 12 + 0| = 6 sq units! Verify: ½ × base × height = ½ × 4 × 3 = 6. ✓",
              hint: "Shoelace formula lagao ya ½ × base × height use karo!",
            },
            {
              id: "shikhar_exp_tb2",
              question: "Agar teen points ek straight line pe ho, toh area kitna hoga?",
              answer:
                "ZERO! Collinear points = triangle nahi banta = area = 0. Shoelace formula automatically 0 dega!",
              hint: "Collinear = straight line = no triangle = area 0.",
            },
          ],
        },
        {
          id: "shikhar_expert_2",
          title: "💡 Collinearity Test Using Slopes",
          conceptHeading: "Testing if Points are Collinear",
          explanation:
            "Teen points collinear hain agar unke slopes EQUAL hain! Slope AB = (y₂-y₁)/(x₂-x₁). Agar Slope AB = Slope BC, toh A, B, C ek straight line pe hain!",
          interactiveType: "point_hunt",
          thinkBox: [
            {
              id: "shikhar_exp_tb3",
              question: "Points A(1,2), B(3,6), C(5,10) collinear hain?",
              answer:
                "Haan! Slope AB = (6-2)/(3-1) = 4/2 = 2. Slope BC = (10-6)/(5-3) = 4/2 = 2. Slopes equal hain = COLLINEAR!",
              hint: "Slope nikalo aur compare karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "shikhar_exp_act1",
          title: "Coordinate Area Investigation",
          description: "Alag-alag triangles ka area coordinates se nikalo!",
          materials: ["Graph paper", "Pencil", "Calculator"],
          steps: [
            "Graph paper pe 3 triangles banao (alag sizes).",
            "Har triangle ke vertices ke coordinates likho.",
            "Shoelace formula se area calculate karo.",
            "Verify: ½ × base × height se bhi area nikalo — same aana chahiye!",
          ],
          outcome:
            "Student coordinate area formula efficiently use karega!",
        },
      ],
      teacherTips: [
        {
          id: "shikhar_exp_tt1",
          tip: "Shoelace formula ko visual pattern mein likho — x aur y coordinates alternate multiply karo!",
          context: "Coordinate area formula sikhate waqt.",
        },
        {
          id: "shikhar_exp_tt2",
          tip: "Collinearity test ko slope se karo — yeh later coordinate geometry mein bahut useful hoga!",
          context: "Collinearity introduce karte waqt.",
        },
      ],
      worksheet: [
        {
          id: "shikhar_exp_w1",
          question: "Triangle (0,0), (6,0), (0,8) ka area kitna hai?",
          options: ["24", "48", "14", "8"],
          correct: 0,
          hint: "Area = ½ × 6 × 8 = 24",
          part: "A",
          partDescription: "Multiple Choice — Area Calculation",
        },
        {
          id: "shikhar_exp_w2",
          question: "Points (2,3), (4,7), (6,11) collinear hain?",
          options: ["Haan", "Nahi", "Depends on method", "Sirf first two"],
          correct: 0,
          hint: "Slope AB = (7-3)/(4-2) = 2, Slope BC = (11-7)/(6-4) = 2. Equal!",
          part: "B",
          partDescription: "True/False — Collinearity Test",
        },
        {
          id: "shikhar_exp_w3",
          question: "Triangle A(1,1), B(5,1), C(3,4) ka area nikalo using shoelace formula.",
          correct: "Area = ½|1(1-4) + 5(4-1) + 3(1-1)| = ½|-3+15+0| = ½(12) = 6 sq units",
          hint: "½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|",
          part: "C",
          partDescription: "Short Answer — Shoelace Formula",
        },
        {
          id: "shikhar_exp_w4",
          question: "Prove karo ki points (1,2), (3,6), (5,10) collinear hain using slope method.",
          correct: "Slope AB = (6-2)/(3-1) = 2. Slope BC = (10-6)/(5-3) = 2. Slopes equal = Collinear!",
          hint: "Slope formula: (y₂-y₁)/(x₂-x₁). Dono slopes nikalo aur compare karo!",
          part: "D",
          partDescription: "Proof — Formal Collinearity Proof",
        },
      ],
    },
  ],
};
