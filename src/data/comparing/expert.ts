/**
 * Comparing Numbers — Expert Level (Class 8)
 *
 * Advanced content with rational numbers, competitive exam questions,
 * data interpretation, and multi-step reasoning.
 * Covers: Rational number comparison, number line proofs, competitive exam patterns,
 * data interpretation from tables/graphs, and formal mathematical reasoning.
 *
 * Content style: Formal mathematical language with Hinglish support,
 * focus on proofs, derivations, and multi-step problem solving.
 */

import { LevelTopicContent } from "./types";

export const comparingExpert: LevelTopicContent = {
  topicId: "compare",
  topicName: "🔢 Comparing Numbers: Kaun Bada, Kaun Chhota?",
  level: "expert",
  classLevel: "Class 8",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // RATIONAL NUMBER COMPARISON
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_rational",
      name: "🎯 Rational Numbers: Formal Comparison",
      screens: [
        {
          id: "compare_rat_1",
          title: "🎯 Rational Numbers: p/q Form mein Compare!",
          conceptHeading: "Rational Number Comparison Methods",
          explanation:
            "Doston, rational numbers wo hain jo p/q form mein ho sakte hain (q ≠ 0)! Inhe compare karne ke TRE methods hain:\n\n📏 **Method 1: Cross Multiplication**\n→ a/b aur c/d compare karo: ad vs bc\n→ Agar ad > bc, toh a/b > c/d\n→ Example: 3/5 aur 4/7: 3×7=21, 5×4=20. 21>20, toh 3/5 > 4/7!\n\n📏 **Method 2: Common Denominator (LCD)**\n→ 3/5 aur 4/7: LCD = 35\n→ 3/5 = 21/35, 4/7 = 20/35\n→ 21/35 > 20/35, toh 3/5 > 4/7!\n\n📏 **Method 3: Convert to Decimal**\n→ 3/5 = 0.6, 4/7 ≈ 0.571\n→ 0.6 > 0.571, toh 3/5 > 4/7!",
          interactiveType: "decimal_battle",
          pangaHint: "Cross multiplication sabse fast method hai!",
          thinkBox: [
            {
              id: "compare_rat_tb1",
              question: "5/8 aur 7/11 — cross multiplication se compare karo! 🤔",
              answer:
                "5×11 = 55, 8×7 = 56. 55 < 56, toh 5/8 < 7/11! Cross multiplication verify karo!",
              hint: "Cross multiply karo: ad vs bc!",
            },
            {
              id: "compare_rat_tb2",
              question: "Negative fractions: -3/4 aur -2/3 — kaunsa bada hai?",
              answer:
                "Cross multiply: (-3)×3 = -9, (-2)×4 = -8. -9 < -8, toh -3/4 < -2/3! Negative fractions mein bhi number line rule lagta hai!",
              hint: "Negatives mein comparison ULTA hota hai!",
            },
            {
              id: "compare_rat_tb3",
              question: "Kya 1/3 > 0.33 hai?",
              answer:
                "Haan! 1/3 = 0.333... (recurring). 0.333... > 0.33! Recurring decimal zyada hai!",
              hint: "1/3 = 0.333... (infinite repeating)!",
            },
          ],
        },
        {
          id: "compare_rat_2",
          title: "🎯 Number Line Proofs: Visual Reasoning",
          conceptHeading: "Number Line se Prove Karo!",
          explanation:
            "Rational numbers ko number line pe plot karke PROVE kar sakte hain!\n\n📏 **Proof Technique:**\n→ Step 1: Number line banao\n→ Step 2: Dono numbers plot karo\n→ Step 3: Jo RIGHT mein hai, woh BADA hai\n\n📏 **Example:** Prove 2/3 > 1/2\n→ 2/3 = 0.666... (right of 0.5)\n→ 1/2 = 0.5\n→ 2/3 right mein hai, toh 2/3 > 1/2! PROVED!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_rat_tb4",
              question: "Number line pe prove karo: 3/5 > 2/5! ✍️",
              answer:
                "3/5 = 0.6, 2/5 = 0.4. Number line pe 0.6 right mein hai, toh 3/5 > 2/5! PROVED!",
              hint: "Dono ka decimal nikalo aur number line pe plot karo!",
            },
            {
              id: "compare_rat_tb5",
              question: "Kya 7/8 > 15/16 hai? Prove karo!",
              answer:
                "Cross multiply: 7×16 = 112, 15×8 = 120. 112 < 120, toh 7/8 < 15/16! PROVED!",
              hint: "Cross multiplication use karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_rat_act1",
          title: "Cross Multiplication Speed Challenge",
          description: "Sabse pehle cross multiplication karo!",
          materials: ["Paper", "Pencil", "Timer"],
          steps: [
            "Teacher 10 fraction pairs dete hain.",
            "Students cross multiplication se compare karein.",
            "10 seconds ka time limit!",
            "Sabse zyada correct answers jeeta!",
          ],
          outcome:
            "Student cross multiplication fast karenge!",
        },
        {
          id: "compare_rat_act2",
          title: "Rational Number Line Construction",
          description: "Number line banao aur rational numbers plot karo!",
          materials: ["Ruler", "Paper", "Pencil", "Colored markers"],
          steps: [
            "Paper pe -2 se 2 tak ki number line banao.",
            "Teacher 10 rational numbers dete hain.",
            "Har number ko plot karo (approximate position).",
            "Verify: right mein = bada, left mein = chhota!",
          ],
          outcome:
            "Student rational numbers visualize kar payenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_rat_tt1",
          tip: "Cross multiplication ka SHORTCUT sikhao: 'bada upar × chhota neeche vs chhota upar × bada neeche'. Fast hai!",
          context: "Introduction mein, jab student ko cross multiplication sikhana ho.",
        },
        {
          id: "compare_rat_tt2",
          tip: "Negative rational numbers mein ULTA comparison hai — number line pe negative side LEFT hai!",
          context: "Jab student ko negative rational comparison dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_rat_w1",
          question: "Cross multiplication use karo: 5/9 aur 3/5 — kaunsa bada hai?",
          options: ["5/9", "3/5", "Dono same", "Cannot compare"],
          correct: 1,
          hint: "5×5 = 25, 3×9 = 27. 25 < 27!",
          part: "A",
          partDescription: "Multiple Choice — Cross Multiplication",
        },
        {
          id: "compare_rat_w2",
          question: "-4/7 aur -3/5 — kaunsa bada hai?",
          options: ["-4/7", "-3/5", "Dono same", "Cannot compare"],
          correct: 1,
          hint: "Cross multiply: (-4)×5 = -20, (-3)×7 = -21. -20 > -21!",
          part: "A",
          partDescription: "Multiple Choice — Negative Rational",
        },
        {
          id: "compare_rat_w3",
          question: "Prove karo: 2/3 > 5/8 using cross multiplication!",
          correct: "2×8 = 16, 5×3 = 15. 16 > 15, toh 2/3 > 5/8. PROVED!",
          hint: "Cross multiply karo aur result compare karo!",
          part: "B",
          partDescription: "Short Answer — Proof",
        },
        {
          id: "compare_rat_w4",
          question: "LCD method use karo: 3/4 aur 5/7 compare karo!",
          correct: "LCD = 28. 3/4 = 21/28, 5/7 = 20/28. 21/28 > 20/28, toh 3/4 > 5/7!",
          hint: "Common denominator nikalo!",
          part: "C",
          partDescription: "Short Answer — LCD Method",
        },
        {
          id: "compare_rat_w5",
          question: "10 rational number pairs likho aur cross multiplication se prove karo!",
          correct: "Student-apna-answer",
          hint: "Alag-alag fractions banao aur compare karo!",
          part: "D",
          partDescription: "Creative Activity — Practice Proofs",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // COMPETITIVE EXAM QUESTIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_competitive",
      name: "🎯 Competitive Exam Patterns",
      screens: [
        {
          id: "compare_comp_1",
          title: "🎯 Olympiad-Style Comparisons",
          conceptHeading: "Hard Questions, Smart Solutions!",
          explanation:
            "Competitive exams mein tricky questions aate hain! Dekhte hain kaise solve karein:\n\n📝 **Type 1: Missing Digit**\n→ 5_3 > 563 — _ mein kya aayega?\n→ 5_3 > 563: _ must be > 6. Answer: 7, 8, or 9!\n\n📝 **Type 2: Repeated Comparison**\n→ a > b > c > d — kya a > d hai?\n→ Haan! Transitive property: agar a > b aur b > c, toh a > c!\n\n📝 **Type 3: Tricky Zero**\n→ 0.999... = 1? Haan! 0.999... exact 1 ke barabar hai!",
          interactiveType: "decimal_battle",
          pangaHint: "Smart tricks lagao!",
          thinkBox: [
            {
              id: "compare_comp_tb1",
              question: "7_2 > 752 — _ mein kya aayega? 🤔",
              answer:
                "_ > 5 chahiye. Toh 6, 7, 8, ya 9 aa sakta hai! Answer: 6, 7, 8, 9!",
              hint: "Tens place compare karo!",
            },
            {
              id: "compare_comp_tb2",
              question: "Agar a > b aur b > c, toh kya a > c hai? Reason do!",
              answer:
                "Haan! Transitive property: a > b > c. Agar a, b se bada hai aur b, c se bada hai, toh a, c se bhi bada hoga!",
              hint: "Transitive property yaad karo!",
            },
            {
              id: "compare_comp_tb3",
              question: "Kya 0.999... = 1 hai? Prove karo!",
              answer:
                "Haan! Let x = 0.999... Toh 10x = 9.999... Toh 10x - x = 9. Toh 9x = 9. Toh x = 1! PROVED!",
              hint: "Algebra use karo!",
            },
          ],
        },
        {
          id: "compare_comp_2",
          title: "🎯 Speed Tricks for MCQs",
          conceptHeading: "Fast solving ke tricks!",
          explanation:
            "MCQs mein time bachaane ke tricks:\n\n📏 **Trick 1: Unit Digit**\n→ 456_ aur 4568 — agar last digit _ > 8, toh bada hai!\n\n📏 **Trick 2: Power Comparison**\n→ 2^10 vs 3^7: 2^10 = 1024, 3^7 = 2187. 2187 > 1024!\n\n📏 **Trick 3: Approximate**\n→ 345 × 678 vs 356 × 667: Dono ≈ 350 × 670 = 2,34,500. Exact mein dekho!",
          interactiveType: "decimal_battle",
          thinkBox: [
            {
              id: "compare_comp_tb4",
              question: "2^8 aur 3^5 — kaunsa bada hai? 🤔",
              answer:
                "2^8 = 256, 3^5 = 243. 256 > 243, toh 2^8 > 3^5!",
              hint: "Powers calculate karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_comp_act1",
          title: "Olympiad Practice Round",
          description: "Olympiad style questions solve karo!",
          materials: ["Paper", "Pencil", "Timer"],
          steps: [
            "Teacher 10 olympiad-style comparison questions dete hain.",
            "Students 30 seconds mein solve karein.",
            "Har question ka solution likho.",
            "Check: kya sab sahi hain!",
          ],
          outcome:
            "Student competitive exam ke liye ready honge!",
        },
        {
          id: "compare_comp_act2",
          title: "Create Your Own Question",
          description: "Apna khud ka comparison question banao!",
          materials: ["Paper", "Pencil"],
          steps: [
            "Ek tricky comparison question banao.",
            "Question ka answer bhi likho.",
            "Classmate ko do — solve karao!",
            "Agar wo galat kare, toh explain karo!",
          ],
          outcome:
            "Student question banana seekhenge — deepest learning!",
        },
      ],
      teacherTips: [
        {
          id: "compare_comp_tt1",
          tip: "Transitive property (a > b > c implies a > c) ko REAL-LIFE se samjhao — 'Rahul se zyada hai, Rahul Amit se zyada hai, toh wo Amit se zyada hai!'",
          context: "Introduction mein, jab student ko transitive property dikhana ho.",
        },
        {
          id: "compare_comp_tt2",
          tip: "Speed tricks SLOWLY sikhao — pehle concept clear karo, phir speed aayegi!",
          context: "Jab student ko competitive exam tricks dikhani ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_comp_w1",
          question: "8_5 > 875 — _ mein kya aa sakta hai?",
          options: ["5, 6, 7", "7, 8, 9", "6, 7, 8, 9", "8, 9"],
          correct: 2,
          hint: "_ > 7 chahiye!",
          part: "A",
          partDescription: "Multiple Choice — Missing Digit",
        },
        {
          id: "compare_comp_w2",
          question: "Agar a > b, b > c, c > d, toh kya a > d hai?",
          options: ["Haan, hamesha", "Nahi", "Depends", "Cannot say"],
          correct: 0,
          hint: "Transitive property!",
          part: "A",
          partDescription: "Multiple Choice — Transitive Property",
        },
        {
          id: "compare_comp_w3",
          question: "2^6 aur 3^4 — cross multiplication nahi, powers calculate karo!",
          correct: "2^6 = 64, 3^4 = 81. 81 > 64, toh 3^4 > 2^6!",
          hint: "Powers nikalo!",
          part: "B",
          partDescription: "Short Answer — Power Comparison",
        },
        {
          id: "compare_comp_w4",
          question: "345 × 678 aur 346 × 677 — kaunsa bada hai? Approximate se solve karo!",
          correct: "345 × 678 = 2,33,910, 346 × 677 = 2,34,242. 346 × 677 > 345 × 678!",
          hint: "Approximate: 350 × 670 ≈ 2,34,500!",
          part: "C",
          partDescription: "Short Answer — Approximate Comparison",
        },
        {
          id: "compare_comp_w5",
          question: "Apna ek tricky comparison question banao aur solution likho!",
          correct: "Student-apna-answer",
          hint: "Missing digit ya transitive property use karo!",
          part: "D",
          partDescription: "Creative Activity — Question Creation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // DATA INTERPRETATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_data",
      name: "🎯 Data Interpretation: Tables & Graphs se Compare!",
      screens: [
        {
          id: "compare_data_1",
          title: "🎯 Table se Numbers Compare!",
          conceptHeading: "Data Tables mein Comparing!",
          explanation:
            "Doston, exams mein TABLES diye jaate hain jinse compare karna hota hai!\n\n📝 **Example Table:**\n| City | Temp (°C) |\n|------|----------|\n| Delhi | 42 |\n| Mumbai | 32 |\n| Shimla | 15 |\n| Kolkata | 38 |\n\n→ Kaunsa sabse garam? Delhi (42°C) > Kolkata (38°C) > Mumbai (32°C) > Shimla (15°C)!\n→ Shimla aur Delhi mein kitna fark hai? 42 - 15 = 27°C!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_data_tb1",
              question: "Table mein sabse zyada marks kiske hain? 📊\n| Student | Marks |\n|---------|-------|\n| Rahul | 85 |\n| Priya | 92 |\n| Amit | 78 |\n| Sara | 88 |",
              answer:
                "Priya ke sabse zyada marks hain — 92! Priya > Sara > Rahul > Amit!",
              hint: "Marks column dekho — sabse bada dhundho!",
            },
            {
              id: "compare_data_tb2",
              question: "Delhi aur Shimla mein temperature ka fark kitna hai?",
              answer:
                "42 - 15 = 27°C fark hai! Range = Max - Min = 42 - 15 = 27!",
              hint: "Max se Min subtract karo!",
            },
          ],
        },
        {
          id: "compare_data_2",
          title: "🎯 Graph se Compare!",
          conceptHeading: "Bar Graph & Line Graph Reading!",
          explanation:
            "Graphs se bhi compare karte hain!\n\n📏 **Bar Graph:** Bar ki HEIGHT dekho — jo sabse lambi hai, woh bada hai!\n\n📏 **Line Graph:** Line KITNA UPAR hai — jo sabse upar hai, woh bada hai!\n\n📏 **Pie Chart:** Pie ka SIZE dekho — jo bada slice hai, woh zyada hai!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_data_tb3",
              question: "Bar graph mein Delhi ki bar Mumbai se lambi hai. Matlab kya hai?",
              answer:
                "Delhi ka value Mumbai se ZYADA hai! Bar ki height = value. Lambi bar = bada number!",
              hint: "Bar height = value!",
            },
          ],
        },
        {
          id: "compare_data_3",
          title: "🎯 Multi-Step Data Analysis",
          conceptHeading: "Complex Data Questions!",
          explanation:
            "Competitive exams mein multi-step data analysis aata hai!\n\n📝 **Example:**\n| Year | Sales (₹ Lakh) |\n|------|---------------|\n| 2020 | 45 |\n| 2021 | 52 |\n| 2022 | 48 |\n| 2023 | 61 |\n\n→ Sabse zyada sales? 2023 (₹61 Lakh)\n→ Sabse kam? 2020 (₹45 Lakh)\n→ Range? 61 - 45 = ₹16 Lakh\n→ Average? (45+52+48+61)/4 = 206/4 = ₹51.5 Lakh\n→ 2023 average se zyada hai? 61 > 51.5 = Haan!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_data_tb4",
              question: "Upar diye gaye sales data se: 2023 ka sales average se kitna zyada hai?",
              answer:
                "Average = 51.5, 2023 = 61. Fark = 61 - 51.5 = 9.5 Lakh zyada!",
              hint: "Pehle average nikalo, phir compare karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_data_act1",
          title: "Data Detective",
          description: "Data table se questions solve karo!",
          materials: ["Paper", "Pencil", "Calculator (optional)"],
          steps: [
            "Teacher ek data table dete hain (sales, temperature, marks, etc.).",
            "5 questions solve karo: max, min, range, comparison, average.",
            "Har question ka answer explain karo!",
          ],
          outcome:
            "Student data interpretation seekhenge!",
        },
        {
          id: "compare_data_act2",
          title: "Create Data & Compare",
          description: "Apna data table banao aur compare karo!",
          materials: ["Paper", "Pencil", "Colored markers"],
          steps: [
            "Apne class ke 5 subjects ke marks table banao.",
            "Max, min, range nikalo.",
            "Bar graph banao!",
            "3 questions banao aur answer karo!",
          ],
          outcome:
            "Student data create aur interpret dono seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_data_tt1",
          tip: "Data tables REAL se banao — class marks, attendance, temperatures. Meaningful data se interest badhta hai!",
          context: "Introduction mein, jab student ko data tables dikhana ho.",
        },
        {
          id: "compare_data_tt2",
          tip: "Range = Max - Min — yeh BASIC statistical concept hai. Bahut exam mein aata hai!",
          context: "Jab student ko range concept dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_data_w1",
          question: "Table dekho:\n| Item | Price |\n|------|-------|\n| Pen | ₹15 |\n| Pencil | ₹5 |\n| Eraser | ₹10 |\n| Sharpener | ₹8 |\n\nSabse mehenga kaunsa hai?",
          options: ["Pen", "Pencil", "Eraser", "Sharpener"],
          correct: 0,
          hint: "Price column dekho — sabse bada dhundho!",
          part: "A",
          partDescription: "Multiple Choice — Table Reading",
        },
        {
          id: "compare_data_w2",
          question: "Upar diye gaye table mein range nikalo!",
          options: ["₹10", "₹15", "₹5", "₹20"],
          correct: 0,
          hint: "Range = Max - Min = 15 - 5 = 10!",
          part: "A",
          partDescription: "Multiple Choice — Range",
        },
        {
          id: "compare_data_w3",
          question: "Data: 12, 18, 7, 25, 14. Max, Min, aur Range nikalo!",
          correct: "Max = 25, Min = 7, Range = 25 - 7 = 18",
          hint: "Sabse bada = Max, sabse chhota = Min, fark = Range!",
          part: "B",
          partDescription: "Short Answer — Basic Statistics",
        },
        {
          id: "compare_data_w4",
          question: "Graph question: Bar graph mein A ki bar B se 2cm lambi hai. Agar B = 45 hai, toh A kitna hoga?",
          correct: "A = 45 + 2 × (scale). Agar scale = 5 units/cm, toh A = 55!",
          hint: "Bar height difference × scale factor!",
          part: "C",
          partDescription: "Short Answer — Graph Interpretation",
        },
        {
          id: "compare_data_w5",
          question: "Apne class ka data table banao (5 students × 5 subjects) aur 3 comparison questions banao!",
          correct: "Student-apna-answer",
          hint: "Marks table banao aur questions create karo!",
          part: "D",
          partDescription: "Creative Activity — Data Creation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // FORMAL REASONING & PROOFS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_proofs",
      name: "🎯 Formal Proofs & Mathematical Reasoning",
      screens: [
        {
          id: "compare_proof_1",
          title: "🎯 Properties of Inequality",
          conceptHeading: "Inequality ke Properties!",
          explanation:
            "Doston, inequalities ke BASIC properties hain jo exams mein aati hain:\n\n📏 **Property 1: Transitive**\n→ Agar a > b aur b > c, toh a > c\n\n📏 **Property 2: Addition**\n→ Agar a > b, toh a + c > b + c\n→ Dono mein SAME number add karo — inequality SAME rahegi!\n\n📏 **Property 3: Multiplication (Positive)**\n→ Agar a > b aur c > 0, toh ac > bc\n→ Positive se multiply karo — inequality SAME rahegi!\n\n📏 **Property 4: Multiplication (Negative)**\n→ Agar a > b aur c < 0, toh ac < bc\n→ NEGATIVE se multiply karo — inequality ULTA ho jaayegi!",
          interactiveType: "none",
          pangaHint: "Properties yaad karo — exam mein bahut aati hain!",
          thinkBox: [
            {
              id: "compare_proof_tb1",
              question: "Agar x > 5 hai, toh x + 3 > kya hoga?",
              answer:
                "x + 3 > 8! Addition property: dono mein 3 add karo. 5 + 3 = 8!",
              hint: "Addition property: a > b → a + c > b + c",
            },
            {
              id: "compare_proof_tb2",
              question: "Agar a > b hai aur c < 0, toh ac > bc hai ya ac < bc?",
              answer:
                "ac < bc! Negative se multiply karo toh inequality ULTA ho jaati hai!",
              hint: "Negative multiplication reverses inequality!",
            },
            {
              id: "compare_proof_tb3",
              question: "Agar x > y > z hai, toh x² > z² hai ya nahi?",
              answer:
                "HAMESHA nahi! Agar x = 2, y = 0, z = -3, toh x² = 4, z² = 9. 4 < 9! Squaring mein sign matter karta hai!",
              hint: "Negatives ka square positive hota hai!",
            },
          ],
        },
        {
          id: "compare_proof_2",
          title: "🎯 Proof Writing: Step-by-Step",
          conceptHeading: "Formal Proof Kaise Likhein!",
          explanation:
            "Exam mein PROOF likhna hota hai. Step-by-step format:\n\n📝 **Proof Format:**\n→ **Given:** Jo diya hai\n→ **To Prove:** Kya prove karna hai\n→ **Proof:** Step-by-step reasoning\n→ **Hence Proved** / **Q.E.D.**\n\n📝 **Example:** Prove: If a > b, then -a < -b\n→ **Given:** a > b\n→ **To Prove:** -a < -b\n→ **Proof:**\n  a > b (given)\n  Multiply both sides by -1\n  When we multiply by negative, inequality reverses\n  -a < -b\n  Hence Proved!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_proof_tb4",
              question: "Prove karo: Agar x > 3, toh 2x > 6! ✍️",
              answer:
                "Given: x > 3. Multiply both sides by 2 (positive). 2x > 6. Hence Proved!",
              hint: "Positive se multiply karo — inequality same rahegi!",
            },
            {
              id: "compare_proof_tb5",
              question: "Prove karo: Agar a > b, toh a - c > b - c!",
              answer:
                "Given: a > b. Subtract c from both sides. a - c > b - c. Subtraction property! Hence Proved!",
              hint: "Addition/Subtraction property!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_proof_act1",
          title: "Proof Writing Practice",
          description: "5 proofs likho!",
          materials: ["Paper", "Pencil"],
          steps: [
            "Teacher 5 inequality statements dete hain.",
            "Students formal proof format mein likho.",
            "Given, To Prove, Proof — sab likho!",
            "Classmate se exchange karo aur verify karo!",
          ],
          outcome:
            "Student formal proof writing seekhenge!",
        },
        {
          id: "compare_proof_act2",
          title: "Property Verification",
          description: "Inequality properties verify karo!",
          materials: ["Paper", "Pencil", "Calculator"],
          steps: [
            "Paper pe 10 inequality pairs likho.",
            "Har pair pe 4 properties verify karo.",
            "Check: kya properties HAMESHA kaam karti hain?",
            "Exception dhundho (negative multiplication)!",
          ],
          outcome:
            "Student properties deeply samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_proof_tt1",
          tip: "Proof writing SLOWLY sikhao — pehle Given/To Prove likhna, phir step-by-step reasoning. Jaldi mein galat hota hai!",
          context: "Introduction mein, jab student ko proof format dikhana ho.",
        },
        {
          id: "compare_proof_tt2",
          tip: "Negative multiplication rule BOLKE samjhao — 'Negative se multiply karo toh sign ULTA!' Multiple examples do!",
          context: "Jab student ko negative multiplication property dikhani ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_proof_w1",
          question: "Agar a > b hai, toh a + 5 > b + 5 hai ya nahi?",
          options: ["Haan", "Nahi", "Depends", "Cannot say"],
          correct: 0,
          hint: "Addition property!",
          part: "A",
          partDescription: "Multiple Choice — Property Check",
        },
        {
          id: "compare_proof_w2",
          question: "Agar x > y aur y > z, toh x > z hai? Property naam batao!",
          options: ["Transitive Property", "Addition Property", "Multiplication Property", "None"],
          correct: 0,
          hint: "a > b aur b > c → a > c!",
          part: "A",
          partDescription: "Multiple Choice — Property Name",
        },
        {
          id: "compare_proof_w3",
          question: "Prove karo: Agar a > b, toh a/2 > b/2!",
          correct: "Given: a > b. Divide both sides by 2 (positive). a/2 > b/2. Hence Proved!",
          hint: "Positive se divide karo — inequality same rahegi!",
          part: "B",
          partDescription: "Short Answer — Simple Proof",
        },
        {
          id: "compare_proof_w4",
          question: "Counter-example do: 'Agar a² > b², toh a > b' kyun GALAT hai?",
          correct: "a = -5, b = 3. a² = 25 > b² = 9. Lekin -5 < 3! Negatives mein galat ho jaata hai!",
          hint: "Negatives ka square positive hota hai!",
          part: "C",
          partDescription: "Short Answer — Counter-example",
        },
        {
          id: "compare_proof_w5",
          question: "5 inequality properties list karo aur har ek ka real-life example do!",
          correct: "Student-apna-answer",
          hint: "Transitive, Addition, Subtraction, Positive Multiplication, Negative Multiplication!",
          part: "D",
          partDescription: "Creative Activity — Properties Compilation",
        },
      ],
    },
  ],
};
