/**
 * Max/Min & Range — Intermediate Level (Class 7)
 *
 * Builds on Beginner concepts with range calculations, data sets,
 * frequency tables, and multi-step statistical problems.
 *
 * Content style: Hinglish with mathematical vocabulary, data analysis focus.
 */

import { LevelTopicContent } from "./types";

export const maxminIntermediate: LevelTopicContent = {
  topicId: "maxmin",
  topicName: "📊 Max, Min & Range: Data ka Power",
  level: "intermediate",
  classLevel: "Class 7",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // RANGE CALCULATIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_range",
      name: "📏 Range: Max se Min ka Fark!",
      screens: [
        {
          id: "maxmin_range_1",
          title: "📏 Range Formula: Max - Min!",
          conceptHeading: "Range Kya Hai?",
          explanation:
            "Doston, RANGE = MAXIMUM - MINIMUM! Yeh batata hai data kitna SPREAD hai!\n\n📏 **Formula:** Range = Max - Min\n\n📝 **Example:**\nData: 12, 18, 25, 8, 30, 15\n→ Max = 30, Min = 8\n→ Range = 30 - 8 = 22!\n\n📏 **Interpretation:**\n→ Range bada hai = data BOHOT spread hai!\n→ Range chhota hai = data CLOSE hai!\n\n📊 **Real Life:**\n→ Temperature range: 35°C - 20°C = 15°C (bohot variation!)\n→ Marks range: 95 - 85 = 10 (thoda variation)",
          interactiveType: "range_slider",
          pangaHint: "Range = Max - Min. Yaad rakho!",
          thinkBox: [
            {
              id: "maxmin_range_tb1",
              question: "Data: 45, 67, 89, 23, 56. Range nikalo! 🤔",
              answer:
                "Max = 89, Min = 23. Range = 89 - 23 = 66!",
              hint: "Pehle Max/Min, phir subtract karo!",
            },
            {
              id: "maxmin_range_tb2",
              question: "Agar Range = 0 hai, toh kya matlab hai?",
              answer:
                "Range = 0 ka matlab hai Max = Min! Sab numbers SAME hain! Koi variation nahi hai!",
              hint: "Range = Max - Min = 0 → Max = Min!",
            },
            {
              id: "maxmin_range_tb3",
              question: "Temperature: Monday 25°C, Tuesday 30°C, Wednesday 28°C. Range?",
              answer:
                "Max = 30°C, Min = 25°C. Range = 5°C!",
              hint: "Max se Min subtract karo!",
            },
          ],
        },
        {
          id: "maxmin_range_2",
          title: "📏 Range Interpretation: Data Spread!",
          conceptHeading: "Range Kya Batata Hai?",
          explanation:
            "Range sirf number nahi hai — yeh DATA KI STORY batata hai!\n\n📊 **Large Range:** Data mein BOHOT variation hai!\n→ Marks: 95, 45, 78, 23 → Range = 72 (bohot variation!)\n\n📊 **Small Range:** Data mein THODA variation hai!\n→ Marks: 85, 88, 82, 86 → Range = 6 (thoda variation)\n\n📊 **Zero Range:** Koi variation nahi!\n→ Marks: 75, 75, 75, 75 → Range = 0",
          interactiveType: "range_slider",
          thinkBox: [
            {
              id: "maxmin_range_tb4",
              question: "Do data sets hain:\nSet A: 10, 20, 30, 40, 50\nSet B: 25, 28, 30, 32, 35\nKaunsa data zyada CONSISTENT hai?",
              answer:
                "Set B zyada consistent hai! Range A = 40, Range B = 10. Chhota range = zyada consistent!",
              hint: "Range chhota = zyada consistent!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_range_act1",
          title: "Range Calculator Challenge",
          description: "10 data sets ka range nikalo!",
          materials: ["Paper", "Pencil", "Timer"],
          steps: [
            "Teacher 10 data sets dete hain (har set mein 5-6 numbers).",
            "Students har set ka Max, Min, Range nikalein.",
            "10 minutes ka time limit!",
            "Sabse zyada correct ranges dene wala jeeta!",
          ],
          outcome:
            "Student Range calculation fast karenge!",
        },
        {
          id: "maxmin_range_act2",
          title: "Consistency Comparison",
          description: "2 data sets ka range nikalo aur consistency compare karo!",
          materials: ["Paper", "Pencil"],
          steps: [
            "2 subjects ke marks likho (5-5 students ke).",
            "Har subject ka Range nikalo.",
            "Kaunsa subject zyada consistent hai? (Range chhota = consistent!)",
            "Reasoning likho!",
          ],
          outcome:
            "Student Range interpretation samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_range_tt1",
          tip: "Range ka formula BOLKE dohravo — 'Range = Max minus Min'. 3 baar bolo, students yaad rakhenge!",
          context: "Introduction mein, jab student ko Range dikhana ho.",
        },
        {
          id: "maxmin_range_tt2",
          tip: "Range = 0 ka case special hai — sab numbers same! Isko highlight karo!",
          context: "Jab student ko Range interpretation samjhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_range_w1",
          question: "Data: 12, 25, 18, 30, 8, 22. Range kitna hai?",
          options: ["12", "22", "25", "30"],
          correct: 1,
          hint: "Max = 30, Min = 8. Range = 30 - 8 = 22!",
          part: "A",
          partDescription: "Multiple Choice — Range Calculation",
        },
        {
          id: "maxmin_range_w2",
          question: "Range = 0 hai. Kya iska matlab hai?",
          options: ["Sab numbers different hain", "Sab numbers same hain", "Max > Min", "Cannot determine"],
          correct: 1,
          hint: "Range = Max - Min = 0 → Max = Min!",
          part: "A",
          partDescription: "Multiple Choice — Range Interpretation",
        },
        {
          id: "maxmin_range_w3",
          question: "Set A: 45, 67, 89. Set B: 78, 82, 85. Kaunsa data zyada consistent hai?",
          correct: "Set B (Range = 7) zyada consistent hai! Set A Range = 44!",
          hint: "Range chhota = zyada consistent!",
          part: "B",
          partDescription: "Short Answer — Consistency",
        },
        {
          id: "maxmin_range_w4",
          question: "5 students ke marks: 78, 85, 92, 65, 88. Range nikalo aur interpret karo!",
          correct: "Range = 92 - 65 = 27. Data mein moderate variation hai!",
          hint: "Max - Min = Range!",
          part: "C",
          partDescription: "Short Answer — Range with Interpretation",
        },
        {
          id: "maxmin_range_w5",
          question: "Apne 5 subjects ke marks ka Range nikalo aur consistency analyze karo!",
          correct: "Student-apna-answer",
          hint: "Marks likho, Range nikalo, consistent subject dhundho!",
          part: "D",
          partDescription: "Creative Activity — Self Analysis",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // DATA SETS & STATISTICS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_datasets",
      name: "📊 Data Sets: Complete Analysis!",
      screens: [
        {
          id: "maxmin_ds_1",
          title: "📊 Mean, Median, Mode ke saath Max/Min!",
          conceptHeading: "Basic Statistics!",
          explanation:
            "Doston, ab hum MAX/MIN ke saath aur statistics seekhenge!\n\n📊 **Mean (Average):**\n→ Data: 10, 20, 30, 40, 50\n→ Mean = (10+20+30+40+50)/5 = 150/5 = 30\n\n📊 **Median (Middle value):**\n→ Sorted: 10, 20, 30, 40, 50\n→ Median = 30 (beech wala!)\n\n📊 **Mode (Most frequent):**\n→ Data: 10, 20, 20, 30, 20\n→ Mode = 20 (sabse zyada baar aaya!)\n\n📏 **Range:** Max - Min = 50 - 10 = 40",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_ds_tb1",
              question: "Data: 5, 10, 15, 20, 25. Mean, Median, Mode, Range nikalo! 🤔",
              answer:
                "Mean = (5+10+15+20+25)/5 = 75/5 = 15. Median = 15. Mode = koi nahi (sab unique). Range = 25 - 5 = 20!",
              hint: "Mean = sum/count, Median = middle, Range = Max-Min!",
            },
            {
              id: "maxmin_ds_tb2",
              question: "Mean aur Median SAME hain. Iska kya matlab hai?",
              answer:
                "Mean = Median hone ka matlab hai data SYMMETRIC hai! Jaise 10, 20, 30 — symmetric distribution!",
              hint: "Symmetric data mein Mean = Median!",
            },
          ],
        },
        {
          id: "maxmin_ds_2",
          title: "📊 Frequency Tables se Max/Min!",
          conceptHeading: "Frequency Data!",
          explanation:
            "Frequency table mein har value kitni BAAR aayi — woh hota hai!\n\n📝 **Example:**\n| Marks | Frequency |\n|-------|----------|\n| 40 | 3 |\n| 50 | 5 |\n| 60 | 2 |\n| 70 | 4 |\n\n→ Max Marks = 70 (highest value)\n→ Min Marks = 40 (lowest value)\n→ Total students = 3+5+2+4 = 14\n→ Most common marks = 50 (frequency 5)",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_ds_tb3",
              question: "Frequency table:\n| Score | Freq |\n|-------|------|\n| 10 | 2 |\n| 20 | 4 |\n| 30 | 3 |\n| 40 | 1 |\n\nMode kya hai?",
              answer:
                "Mode = 20! Sabse zyada frequency (4) hai!",
              hint: "Sabse zyada frequency wala value!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_ds_act1",
          title: "Complete Statistical Analysis",
          description: "Data set ka complete analysis karo!",
          materials: ["Paper", "Pencil", "Calculator (optional)"],
          steps: [
            "Teacher ek data set dete hain (10-15 numbers).",
            "Max, Min, Range, Mean, Median, Mode nikalo.",
            "Har value interpret karo — kya batata hai!",
            "Results presentation banao!",
          ],
          outcome:
            "Student complete statistical analysis kar payenge!",
        },
        {
          id: "maxmin_ds_act2",
          title: "Frequency Table Activity",
          description: "Apna frequency table banao!",
          materials: ["Paper", "Pencil"],
          steps: [
            "Class ke 20 students ke marks likho.",
            "Frequency table banao (40-50, 50-60, etc.).",
            "Max, Min, Mode identify karo!",
            "Class mein present karo!",
          ],
          outcome:
            "Student frequency tables samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_ds_tt1",
          tip: "Mean, Median, Mode ke liye MNEMONIC: 'Mean = Maza (average enjoy karo), Median = Middle (beech wala), Mode = Most (sabse zyada)'!",
          context: "Introduction mein, jab student ko basic statistics dikhana ho.",
        },
        {
          id: "maxmin_ds_tt2",
          tip: "Frequency tables se MODE dhundhna bahut easy hai — sabse zyada frequency wala row dekho!",
          context: "Jab student ko frequency tables dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_ds_w1",
          question: "Data: 12, 18, 25, 12, 30, 12. Mode kya hai?",
          options: ["12", "18", "25", "30"],
          correct: 0,
          hint: "12 teen baar aaya hai — sabse zyada!",
          part: "A",
          partDescription: "Multiple Choice — Mode",
        },
        {
          id: "maxmin_ds_w2",
          question: "Data: 10, 20, 30, 40, 50. Mean nikalo!",
          options: ["20", "25", "30", "35"],
          correct: 2,
          hint: "Mean = sum/count = 150/5 = 30!",
          part: "A",
          partDescription: "Multiple Choice — Mean",
        },
        {
          id: "maxmin_ds_w3",
          question: "Data: 5, 8, 12, 15, 20. Mean, Median, Range sab nikalo!",
          correct: "Mean = (5+8+12+15+20)/5 = 60/5 = 12. Median = 12. Range = 20-5 = 15.",
          hint: "Sab formulas apply karo!",
          part: "B",
          partDescription: "Short Answer — Complete Statistics",
        },
        {
          id: "maxmin_ds_w4",
          question: "Frequency table:\n| Marks | Freq |\n|-------|------|\n| 40 | 3 |\n| 50 | 7 |\n| 60 | 5 |\n| 70 | 2 |\n\nMode kya hai? Total students kitne hain?",
          correct: "Mode = 50 (frequency 7). Total = 3+7+5+2 = 17 students!",
          hint: "Mode = sabse zyada frequency!",
          part: "C",
          partDescription: "Short Answer — Frequency Table",
        },
        {
          id: "maxmin_ds_w5",
          question: "Apne class ke marks ka complete statistical analysis karo — Max, Min, Range, Mean, Mode!",
          correct: "Student-apna-answer",
          hint: "Sab formulas use karo!",
          part: "D",
          partDescription: "Creative Activity — Self Analysis",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // MULTI-STEP PROBLEMS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_multistep",
      name: "🧩 Multi-Step Problems",
      screens: [
        {
          id: "maxmin_ms_1",
          title: "🧩 Combined Problems: Max + Min + Range!",
          conceptHeading: "Multiple Steps!",
          explanation:
            "Ab multi-step problems solve karo!\n\n📝 **Example 1:**\nData: 45, 67, 89, 23, 56\n→ Max = 89, Min = 23\n→ Range = 89 - 23 = 66\n→ Mean = (45+67+89+23+56)/5 = 280/5 = 56\n→ Max Mean se zyada hai? 89 > 56 = Haan!\n→ Range Mean se zyada hai? 66 > 56 = Haan!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_ms_tb1",
              question: "Data: 10, 20, 30, 40, 50. Max, Min, Range, Mean nikalo aur compare karo!",
              answer:
                "Max = 50, Min = 10, Range = 40, Mean = 30. Max > Mean > Range > Min!",
              hint: "Sab nikalo phir arrange karo!",
            },
          ],
        },
        {
          id: "maxmin_ms_2",
          title: "🧩 Missing Value Problems",
          conceptHeading: "Jab Kuch Missing Hai!",
          explanation:
            "Kabhi kabhi ek value MISSING hoti hai!\n\n📝 **Example:**\nData: 10, 15, x, 25, 30. Range = 25.\n→ Max = 30, Min = 10\n→ Range = 30 - 10 = 20. Lekin Range = 25 diya hai!\n→ Galat hai! Check karo...\n→ Agar Min = 5 ho (x = 5), toh Range = 30 - 5 = 25!\n→ Toh x = 5!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_ms_tb2",
              question: "Data: 20, 25, 30, x, 40. Max = 40, Range = 20. x kya hai?",
              answer:
                "Range = Max - Min = 20. Max = 40, toh Min = 40 - 20 = 20. x = 20!",
              hint: "Range se Min nikalo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_ms_act1",
          title: "Missing Value Challenge",
          description: "Missing values dhundho!",
          materials: ["Paper", "Pencil"],
          steps: [
            "Teacher 5 data sets dete hain ek missing value ke saath.",
            "Range ya Max/Min use karke missing value dhundho!",
            "Har problem ke liye step-by-step solution likho!",
          ],
          outcome:
            "Student multi-step problems solve kar payenge!",
        },
        {
          id: "maxmin_ms_act2",
          title: "Create Multi-Step Problem",
          description: "Apna multi-step problem banao!",
          materials: ["Paper", "Pencil"],
          steps: [
            "5 numbers likho ek missing value ke saath.",
            "Range ya Max/Min ka hint do.",
            "Answer bhi likho!",
            "Classmate ko do — solve karao!",
          ],
          outcome:
            "Student problem banana seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_ms_tt1",
          tip: "Missing value problems mein REVERSE SOCHIYE — Range diya hai? Toh Min = Max - Range nikalo!",
          context: "Introduction mein, jab student ko missing value problems dikhana ho.",
        },
        {
          id: "maxmin_ms_tt2",
          tip: "Multi-step problems mein STEP-BY-STEP likho — pehle given, phir formula, phir calculation!",
          context: "Jab student ko multi-step approach sikhani ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_ms_w1",
          question: "Data: 12, 18, 25, x, 35. Range = 25. x kya hai?",
          options: ["10", "12", "15", "20"],
          correct: 1,
          hint: "Max = 35, Range = 25. Min = 35 - 25 = 10. x = 10!",
          part: "A",
          partDescription: "Multiple Choice — Missing Value",
        },
        {
          id: "maxmin_ms_w2",
          question: "Data: 10, 20, 30, 40, 50. Max, Min, Range, Mean nikalo!",
          correct: "Max = 50, Min = 10, Range = 40, Mean = 30",
          hint: "Sab formulas apply karo!",
          part: "B",
          partDescription: "Short Answer — Complete Analysis",
        },
        {
          id: "maxmin_ms_w3",
          question: "Data: x, 15, 20, 25, 30. Range = 25. x kya hai?",
          correct: "Range = Max - Min = 25. Max = 30, toh Min = 30 - 25 = 5. x = 5!",
          hint: "Range se Min nikalo!",
          part: "C",
          partDescription: "Short Answer — Missing Value",
        },
        {
          id: "maxmin_ms_w4",
          question: "Apna multi-step problem banao jisme Range, Mean, aur missing value ho!",
          correct: "Student-apna-answer",
          hint: "5 numbers banao, range do, missing value dhundho!",
          part: "D",
          partDescription: "Creative Activity — Problem Creation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // COMPARISON WITH OTHER STATISTICS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_comparison",
      name: "🔄 Compare Different Data Sets!",
      screens: [
        {
          id: "maxmin_comp_1",
          title: "🔄 Data Set Comparison!",
          conceptHeading: "Alag Data Sets Compare Karo!",
          explanation:
            "Ab 2 ya 3 data sets compare karo!\n\n📝 **Example:**\nClass A marks: 45, 67, 89, 23, 56\nClass B marks: 78, 85, 92, 80, 88\n\n→ Class A: Max=89, Min=23, Range=66, Mean=56\n→ Class B: Max=92, Min=78, Range=14, Mean=84.6\n\n→ Class B zyada ACHHA hai! (Mean zyada)\n→ Class B zyada CONSISTENT hai! (Range chhota)\n→ Class A mein BOHOT variation hai! (Range bada)",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_comp_tb1",
              question: "Class A Range = 30, Class B Range = 10. Kaunsa class zyada consistent hai? 🤔",
              answer:
                "Class B zyada consistent hai! Range chhota = kam variation = zyada consistent!",
              hint: "Range chhota = consistent!",
            },
          ],
        },
        {
          id: "maxmin_comp_2",
          title: "🔄 Group Comparisons!",
          conceptHeading: "Groups ke Statistics!",
          explanation:
            "Multiple groups compare karo!\n\n📝 **Example:**\n| Group | Mean | Range |\n|-------|------|-------|\n| A | 75 | 20 |\n| B | 82 | 15 |\n| C | 78 | 30 |\n\n→ Best performer: Group B (Mean 82)\n→ Most consistent: Group B (Range 15)\n→ Most variable: Group C (Range 30)",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_comp_tb2",
              question: "Table dekho: Group X Mean=65, Range=40. Group Y Mean=70, Range=10. Kaunsa group better hai?",
              answer:
                "Group Y better hai! Mean zyada (70>65) AUR Range chhota (10<40) — zyada achha aur zyada consistent!",
              hint: "Mean zyada + Range chhota = best!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_comp_act1",
          title: "Class Comparison Project",
          description: "2 classes ke marks compare karo!",
          materials: ["Paper", "Pencil", "Calculator"],
          steps: [
            "2 classes ke marks (5-5 students) likho.",
            "Har class ka Max, Min, Range, Mean nikalo.",
            "Compare karo — kaunsa class better hai?",
            "Presentation banao!",
          ],
          outcome:
            "Student data sets compare kar payenge!",
        },
        {
          id: "maxmin_comp_act2",
          title: "Sports Team Analysis",
          description: "2 cricket teams ke scores compare karo!",
          materials: ["Paper", "Pencil", "Internet (optional)"],
          steps: [
            "2 teams ke 5-5 players ke runs likho.",
            "Max, Min, Range, Mean nikalo.",
            "Kaunsi team better hai? Reasoning do!",
            "Class mein present karo!",
          ],
          outcome:
            "Student real-world data comparison seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_comp_tt1",
          tip: "Data comparison mein MEAN aur RANGE dono dekho — sirf Mean se kaam nahi chalega!",
          context: "Introduction mein, jab student ko data comparison dikhana ho.",
        },
        {
          id: "maxmin_comp_tt2",
          tip: "Comparison mein REASONING likho — 'Group B better hai kyunki...' — thinking skills develop hote hain!",
          context: "Jab student ko comparison analysis sikhani ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_comp_w1",
          question: "Class A Range = 25, Class B Range = 8. Kaunsa class zyada consistent hai?",
          options: ["Class A", "Class B", "Dono same", "Cannot say"],
          correct: 1,
          hint: "Range chhota = zyada consistent!",
          part: "A",
          partDescription: "Multiple Choice — Consistency",
        },
        {
          id: "maxmin_comp_w2",
          question: "Data A: Max=80, Min=60. Data B: Max=85, Min=75. Kaunsa data zyada spread hai?",
          options: ["Data A", "Data B", "Dono same", "Cannot say"],
          correct: 0,
          hint: "Range A = 20, Range B = 10. Zyada range = zyada spread!",
          part: "A",
          partDescription: "Multiple Choice — Spread",
        },
        {
          id: "maxmin_comp_w3",
          question: "2 groups ka data:\nGroup X: 45, 55, 65, 75, 85\nGroup Y: 70, 72, 74, 76, 78\nMax, Min, Range, Mean nikalo aur compare karo!",
          correct: "X: Max=85, Min=45, Range=40, Mean=65. Y: Max=78, Min=70, Range=8, Mean=74. Y better hai!",
          hint: "Sab statistics nikalo!",
          part: "C",
          partDescription: "Short Answer — Group Comparison",
        },
        {
          id: "maxmin_comp_w4",
          question: "Apne school ke 2 sections ke marks compare karo — kaunsa section better hai?",
          correct: "Student-apna-answer",
          hint: "Marks collect karo, analyze karo, compare karo!",
          part: "D",
          partDescription: "Creative Activity — School Comparison",
        },
      ],
    },
  ],
};
