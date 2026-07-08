/**
 * Max/Min & Range — Expert Level (Class 8)
 *
 * Advanced content with statistical concepts, real-world applications,
 * data interpretation from graphs, and formal statistical reasoning.
 * Covers: Standard deviation concept, variance, quartiles,
 * real-world data analysis, and competitive exam patterns.
 *
 * Content style: Formal mathematical language with Hinglish support,
 * focus on statistical reasoning and real-world applications.
 */

import { LevelTopicContent } from "./types";

export const maxminExpert: LevelTopicContent = {
  topicId: "maxmin",
  topicName: "📊 Max, Min & Range: Data ka Power",
  level: "expert",
  classLevel: "Class 8",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // STATISTICAL CONCEPTS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_statistics",
      name: "📈 Advanced Statistics!",
      screens: [
        {
          id: "maxmin_stat_1",
          title: "📈 Quartiles & Interquartile Range!",
          conceptHeading: "Data ko 4 Parts mein Todo!",
          explanation:
            "Doston, ab hum data ko ADVANCE level pe analyze karenge!\n\n📊 **Quartiles:** Data ko 4 equal parts mein divide karo!\n→ Q1 (Lower Quartile) = 25% data isse chhota\n→ Q2 (Median) = 50% data\n→ Q3 (Upper Quartile) = 75% data\n\n📊 **Interquartile Range (IQR):**\n→ IQR = Q3 - Q1\n→ Yeh MIDDLE 50% data ka spread hai!\n→ Range se ZYADA reliable hai (extreme values affect nahi karte!)\n\n📝 **Example:**\nData: 10, 15, 20, 25, 30, 35, 40\n→ Q1 = 15, Q3 = 35\n→ IQR = 35 - 15 = 20",
          interactiveType: "none",
          pangaHint: "Quartiles = data ke 25%, 50%, 75% marks!",
          thinkBox: [
            {
              id: "maxmin_stat_tb1",
              question: "Data: 2, 4, 6, 8, 10, 12, 14. Q1, Q3, IQR nikalo! 🤔",
              answer:
                "Q1 = 4, Q3 = 12. IQR = 12 - 4 = 8! Middle 50% data ka spread = 8!",
              hint: "Data ko 4 parts mein todo!",
            },
            {
              id: "maxmin_stat_tb2",
              question: "Range aur IQR mein kya fark hai? Kaunsa better hai?",
              answer:
                "Range = Max - Min (poore data ka spread). IQR = Q3 - Q1 (middle 50% ka spread). IQR BETTER hai kyunki outliers affect nahi karte!",
              hint: "Range mein extreme values affect karte hain!",
            },
            {
              id: "maxmin_stat_tb3",
              question: "Data: 5, 5, 5, 5, 5. Range, IQR, Mean, Median kya hoga?",
              answer:
                "Range = 0, IQR = 0, Mean = 5, Median = 5! Sab same hain kyunki koi variation nahi hai!",
              hint: "Sab data points same hain!",
            },
          ],
        },
        {
          id: "maxmin_stat_2",
          title: "📈 Standard Deviation Concept!",
          conceptHeading: "Average Deviation from Mean!",
          explanation:
            "Standard Deviation (SD) batata hai data kitna SPREAD hai mean se!\n\n📏 **Formula (simplified):**\n→ SD = √[Σ(xi - mean)² / n]\n\n📏 **Interpretation:**\n→ SD CHHOTA = data CLOSE hai mean ke paas!\n→ SD BADA = data DOOR hai mean se!\n\n📝 **Example:**\nData A: 10, 10, 10, 10 → SD = 0 (koi spread nahi!)\nData B: 5, 10, 15 → SD = √[(25+0+25)/3] = √(50/3) ≈ 4.08\n\nData B zyada SPREAD hai!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_stat_tb4",
              question: "SD = 0 hai. Iska kya matlab hai?",
              answer:
                "SD = 0 ka matlab hai SAB data points mean ke BARABAR hain! Koi variation nahi hai!",
              hint: "SD = 0 → sab same hain!",
            },
            {
              id: "maxmin_stat_tb5",
              question: "Do data sets: A (SD=2) aur B (SD=8). Kaunsa zyada consistent hai?",
              answer:
                "Data A zyada consistent hai! SD chhota = data mean ke paas hai = zyada consistent!",
              hint: "SD chhota = consistent!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_stat_act1",
          title: "Quartile Calculation Practice",
          description: "5 data sets ke quartiles nikalo!",
          materials: ["Paper", "Pencil", "Calculator"],
          steps: [
            "5 data sets likho (har set mein 7-9 numbers).",
            "Har set ke Q1, Q3, IQR nikalo.",
            "IQR ka interpretation likho!",
            "Check: kya sab sahi hain!",
          ],
          outcome:
            "Student quartiles aur IQR calculate kar payenge!",
        },
        {
          id: "maxmin_stat_act2",
          title: "SD Concept Verification",
          description: "SD concept verify karo!",
          materials: ["Paper", "Pencil", "Calculator"],
          steps: [
            "2 data sets banao — ek consistent, ek spread.",
            "Mean nikalo dono ka.",
            "Approximate SD estimate karo (manually).",
            "Kaunsa zyada consistent hai? Verify karo!",
          ],
          outcome:
            "Student SD concept samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_stat_tt1",
          tip: "Quartiles ke liye DATA SORT karna zaroori hai — pehle ascending order mein lagao!",
          context: "Introduction mein, jab student ko quartiles dikhana ho.",
        },
        {
          id: "maxmin_stat_tt2",
          tip: "SD ka EXACT formula abhi mat sikhao — sirf CONCEPT samjhao: data kitna spread hai mean se!",
          context: "Jab student ko SD concept dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_stat_w1",
          question: "Data: 3, 7, 8, 12, 15. IQR nikalo!",
          options: ["5", "7", "8", "12"],
          correct: 2,
          hint: "Q1 = 7, Q3 = 15. IQR = 15 - 7 = 8!",
          part: "A",
          partDescription: "Multiple Choice — IQR",
        },
        {
          id: "maxmin_stat_w2",
          question: "SD = 0 hai. Data mein kya hai?",
          options: ["Sab different hain", "Sab same hain", "Do hi hain", "Cannot determine"],
          correct: 1,
          hint: "SD = 0 → koi spread nahi → sab same!",
          part: "A",
          partDescription: "Multiple Choice — SD Interpretation",
        },
        {
          id: "maxmin_stat_w3",
          question: "Data: 10, 20, 30, 40, 50. Range, IQR, Mean nikalo!",
          correct: "Range = 40, IQR = 30, Mean = 30!",
          hint: "Q1=20, Q3=50. IQR=30!",
          part: "B",
          partDescription: "Short Answer — Multiple Statistics",
        },
        {
          id: "maxmin_stat_w4",
          question: "Do data sets:\nSet A: SD=3, Range=15\nSet B: SD=10, Range=40\nKaunsa zyada consistent hai aur kyun?",
          correct: "Set A zyada consistent hai! SD chhota (3<10) aur Range chhota (15<40)!",
          hint: "SD chhota + Range chhota = consistent!",
          part: "C",
          partDescription: "Short Answer — Consistency Analysis",
        },
        {
          id: "maxmin_stat_w5",
          question: "Apne class ke marks ka IQR nikalo aur interpret karo!",
          correct: "Student-apna-answer",
          hint: "Marks sort karo, Q1/Q3 nikalo, IQR calculate karo!",
          part: "D",
          partDescription: "Creative Activity — Self Analysis",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // REAL-WORLD APPLICATIONS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_realworld",
      name: "🌍 Real-World Data Analysis!",
      screens: [
        {
          id: "maxmin_rw_1",
          title: "🌍 Weather Data Analysis!",
          conceptHeading: "Temperature Data se Max/Min/Range!",
          explanation:
            "Weather data mein Max/Min/Range bahut important hai!\n\n📝 **Example:** Delhi temperatures (°C):\nJan: 8, Feb: 12, Mar: 18, Apr: 28, May: 35, Jun: 38, Jul: 35, Aug: 34, Sep: 32, Oct: 25, Nov: 15, Dec: 10\n\n→ Max = 38°C (June — sabse garam!)\n→ Min = 8°C (January — sabse thandi!)\n→ Range = 38 - 8 = 30°C!\n→ Mean = (8+12+18+28+35+38+35+34+32+25+15+10)/12 = 290/12 ≈ 24.2°C",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_rw_tb1",
              question: "Mumbai temperatures: 24, 25, 27, 29, 30, 29, 28, 28, 29, 30, 28, 26. Range kitna hai?",
              answer:
                "Max = 30, Min = 24. Range = 6°C! Mumbai ka range CHHOTA hai — temperature stable hai!",
              hint: "Max - Min = Range!",
            },
            {
              id: "maxmin_rw_tb2",
              question: "Delhi Range = 30°C, Mumbai Range = 6°C. Kaunsa city zyada CONSISTENT temperature wala hai?",
              answer:
                "Mumbai zyada consistent hai! Range chhota = temperature stable hai. Delhi mein bohot variation hai!",
              hint: "Range chhota = consistent!",
            },
          ],
        },
        {
          id: "maxmin_rw_2",
          title: "🌍 Sports Statistics!",
          conceptHeading: "Cricket Data Analysis!",
          explanation:
            "Cricket mein Max/Min/Range bahut useful hai!\n\n📝 **Example:** IPL team scores:\nMatch 1: 180, Match 2: 165, Match 3: 210, Match 4: 145, Match 5: 195\n\n→ Max = 210 (best batting day!)\n→ Min = 145 (worst batting day)\n→ Range = 65 runs!\n→ Mean = (180+165+210+145+195)/5 = 895/5 = 179 runs\n→ Team CONSISTENT hai? Range/Mean = 65/179 ≈ 0.36 (moderate variation!)",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_rw_tb3",
              question: "Bowler's wickets: 2, 3, 1, 4, 2, 3, 2. Max, Min, Range, Mode nikalo!",
              answer:
                "Max = 4, Min = 1, Range = 3, Mode = 2 (sabse zyada baar aaya!).",
              hint: "Sab statistics nikalo!",
            },
          ],
        },
        {
          id: "maxmin_rw_3",
          title: "🌍 Business & Economics!",
          conceptHeading: "Sales Data Analysis!",
          explanation:
            "Business mein Max/Min/Range se DECISIONS lete hain!\n\n📝 **Example:** Monthly sales (₹ Lakh):\nJan: 45, Feb: 52, Mar: 48, Apr: 61, May: 55, Jun: 67\n\n→ Max = 67 (June — best month!)\n→ Min = 45 (January — worst month)\n→ Range = 22 Lakh!\n→ Trend: Sales BADH rahe hain! (June = Max)\n→ Business owner kya kare? June mein zyada stock rakho!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_rw_tb4",
              question: "Sales data: 10, 15, 12, 18, 20, 25. Trend kya hai? Max kab aaya?",
              answer:
                "Sales BADH rahe hain! Max = 25 (last month). Positive trend hai!",
              hint: "Data dekho — increasing hai ya decreasing?",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_rw_act1",
          title: "Weather Analysis Project",
          description: "2 cities ka weather data analyze karo!",
          materials: ["Paper", "Pencil", "Internet (for real data)"],
          steps: [
            "2 Indian cities ke 12 months temperatures likho (real data).",
            "Har city ka Max, Min, Range, Mean nikalo.",
            "Compare karo — kaunsa city zyada consistent hai?",
            "Report banao aur present karo!",
          ],
          outcome:
            "Student real-world weather data analyze kar payenge!",
        },
        {
          id: "maxmin_rw_act2",
          title: "Business Data Analysis",
          description: "Sales data analyze karo!",
          materials: ["Paper", "Pencil", "Calculator"],
          steps: [
            "6 months ka sales data banao (real ya assumed).",
            "Max, Min, Range, Mean, Trend nikalo.",
            "Business decision lo — kab zyada stock rakho!",
            "Presentation banao!",
          ],
          outcome:
            "Student business data analysis seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_rw_tt1",
          tip: "REAL DATA use karo — weather apps se temperatures, cricket scores, stock prices. Meaningful data se interest badhta hai!",
          context: "Introduction mein, jab student ko real-world applications dikhana ho.",
        },
        {
          id: "maxmin_rw_tt2",
          tip: "TREND analysis sikhao — data dekh ke future predict karo. 'Sales badh rahe hain toh next month zyada expected hai!'",
          context: "Jab student ko trend analysis dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_rw_w1",
          question: "Delhi temperatures: 8, 12, 18, 28, 35, 38. Range kitna hai?",
          options: ["22°C", "30°C", "38°C", "45°C"],
          correct: 1,
          hint: "Max = 38, Min = 8. Range = 30!",
          part: "A",
          partDescription: "Multiple Choice — Weather Range",
        },
        {
          id: "maxmin_rw_w2",
          question: "Team scores: 180, 165, 210, 145, 195. Mean nikalo!",
          options: ["165", "179", "195", "210"],
          correct: 1,
          hint: "Mean = 895/5 = 179!",
          part: "A",
          partDescription: "Multiple Choice — Sports Mean",
        },
        {
          id: "maxmin_rw_w3",
          question: "Sales data: 45, 52, 48, 61, 55, 67. Max, Min, Range, Mean, Trend nikalo!",
          correct: "Max=67, Min=45, Range=22, Mean≈54.7. Trend: Increasing!",
          hint: "Sab statistics nikalo!",
          part: "B",
          partDescription: "Short Answer — Business Analysis",
        },
        {
          id: "maxmin_rw_w4",
          question: "2 cities ke temperature data:\nCity X: 5, 10, 20, 35, 40\nCity Y: 20, 22, 25, 28, 30\nKaunsa city zyada consistent hai?",
          correct: "City Y! Range X = 35, Range Y = 10. City Y zyada consistent hai!",
          hint: "Range chhota = consistent!",
          part: "C",
          partDescription: "Short Answer — City Comparison",
        },
        {
          id": "maxmin_rw_w5",
          question: "Apne school ke 6 months attendance data collect karo aur analyze karo!",
          correct: "Student-apna-answer",
          hint: "Attendance collect karo, Max/Min/Range nikalo, trend dekho!",
          part: "D",
          partDescription: "Creative Activity — Real Data Collection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // COMPETITIVE EXAM PATTERNS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_competitive",
      name: "🎯 Competitive Exam Patterns!",
      screens: [
        {
          id: "maxmin_comp_1",
          title: "🎯 Olympiad-Style Questions!",
          conceptHeading: "Hard Problems, Smart Solutions!",
          explanation:
            "Competitive exams mein tricky questions aate hain!\n\n📝 **Type 1: Missing Value**\nData: 10, 15, 20, x, 30. Range = 25. x = ?\n→ Max = 30, Range = 25 → Min = 30-25 = 5 → x = 5!\n\n📝 **Type 2: Combined Statistics**\nData: Mean = 20, Range = 15, Max = 30. Min = ?\n→ Max - Min = Range → 30 - Min = 15 → Min = 15!\n\n📝 **Type 3: Conditional**\nAgar Mean = 25 hai aur sab values 20-30 ke beech hain, toh Range max kitna ho sakta hai?\n→ Range max = 30 - 20 = 10!",
          interactiveType: "none",
          pangaHint: "Smart tricks lagao!",
          thinkBox: [
            {
              id: "maxmin_comp_tb1",
              question: "Data: x, 10, 20, 30, 40. Range = 40. x kya hai? 🤔",
              answer:
                "Max = 40, Range = 40 → Min = 40 - 40 = 0. x = 0!",
              hint: "Range se Min nikalo!",
            },
            {
              id: "maxmin_comp_tb2",
              question: "Mean = 15, Range = 10. Agar 5 values hain toh Max kitna ho sakta hai?",
              answer:
                "Mean = 15 → Sum = 75. Range = 10 → Max - Min = 10. Agar Min = 10, toh Max = 20!",
              hint: "Mean se Sum nikalo, phir Range lagao!",
            },
          ],
        },
        {
          id: "maxmin_comp_2",
          title: "🎯 Speed Tricks!",
          conceptHeading: "Fast Solving ke Tricks!",
          explanation:
            "MCQs mein time bachaane ke tricks:\n\n📏 **Trick 1: Extreme Value**\n→ Range = Max - Min. Agar Max diya hai aur Range diya hai, toh Min = Max - Range!\n\n📏 **Trick 2: Mean Relationship**\n→ Mean Max aur Min ke BEECH mein hota hai! Min < Mean < Max (usually).\n\n📏 **Trick 3: Range Limit**\n→ Range MAXIMUM tab hota hai jab sab values extreme pe ho!\n→ Range MINIMUM tab hota hai jab sab values same ho!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_comp_tb3",
              question: "Mean = 50, Max = 80. Min kitna ho sakta hai maximum?",
              answer:
                "Mean < Max hai (50 < 80). Min < Mean (usually). Min kitna bhi ho sakta hai — 0, 10, 20... (lekin Mean < Max hona chahiye)!",
              hint: "Mean Max aur Min ke beech mein hota hai!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_comp_act1",
          title: "Olympiad Practice Round",
          description: "10 olympiad-style questions solve karo!",
          materials: ["Paper", "Pencil", "Timer"],
          steps: [
            "Teacher 10 competitive-style questions dete hain.",
            "Students 5 minutes mein solve karein.",
            "Har question ka solution likho!",
            "Sabse zy correct answers dene wala jeeta!",
          ],
          outcome:
            "Student competitive exam ke liye ready honge!",
        },
        {
          id: "maxmin_comp_act2",
          title: "Create Competitive Question",
          description: "Apna competitive question banao!",
          materials: ["Paper", "Pencil"],
          steps: [
            "Ek tricky question banao (missing value, conditional, etc.).",
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
          id: "maxmin_comp_tt1",
          tip: "Competitive questions mein STEP-BY-STEP solution likho — jaldi mein galat hota hai!",
          context: "Introduction mein, jab student ko competitive questions dikhana ho.",
        },
        {
          id: "maxmin_comp_tt2",
          tip: "Tricks SLOWLY sikhao — pehle concept clear karo, phir speed aayegi!",
          context: "Jab student ko speed tricks dikhani ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_comp_w1",
          question: "Data: 5, 10, 15, x, 25. Range = 25. x kya hai?",
          options: ["0", "5", "10", "15"],
          correct: 0,
          hint: "Max = 25, Range = 25 → Min = 0. x = 0!",
          part: "A",
          partDescription: "Multiple Choice — Missing Value",
        },
        {
          id: "maxmin_comp_w2",
          question: "Mean = 30, Range = 20, Max = 45. Min kya hai?",
          options: ["15", "20", "25", "30"],
          correct: 2,
          hint: "Max - Min = Range → 45 - Min = 20 → Min = 25!",
          part: "A",
          partDescription: "Multiple Choice — Combined Statistics",
        },
        {
          id: "maxmin_comp_w3",
          question: "Data: x, x+5, x+10. Range = 10. Mean nikalo!",
          correct: "Range = (x+10) - x = 10 (given). Mean = (x + x+5 + x+10)/3 = (3x+15)/3 = x+5!",
          hint: "Range = 10 (given). Mean formula lagao!",
          part: "B",
          partDescription: "Short Answer — Algebraic",
        },
        {
          id: "maxmin_comp_w4",
          question: "5 values hain. Agar 4 values 10, 20, 30, 40 hain aur Mean = 28 hai, toh 5th value kya hai?",
          correct: "Sum = 28 × 5 = 140. 5th value = 140 - (10+20+30+40) = 140 - 100 = 40!",
          hint: "Mean × Count = Sum!",
          part: "C",
          partDescription: "Short Answer — Missing Value",
        },
        {
          id: "maxmin_comp_w5",
          question: "Apna ek tricky competitive question banao aur solution likho!",
          correct: "Student-apna-answer",
          hint: "Missing value ya conditional question banao!",
          part: "D",
          partDescription: "Creative Activity — Question Creation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // DATA INTERPRETATION FROM GRAPHS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_graphs",
      name: "📊 Graph Interpretation!",
      screens: [
        {
          id: "maxmin_graph_1",
          title: "📊 Bar Graph se Max/Min/Range!",
          conceptHeading: "Graph Reading!",
          explanation:
            "Bar graph se Max/Min/Range nikalte hain!\n\n📏 **Tricks:**\n→ Tallest bar = MAXIMUM\n→ Shortest bar = MINIMUM\n→ Range = Tallest - Shortest (height difference)\n\n📝 **Example:** Bar graph (height in cm):\nA: 150, B: 165, C: 155, D: 170\n→ Max = D (170), Min = A (150)\n→ Range = 170 - 150 = 20 cm",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_graph_tb1",
              question: "Bar graph mein 4 items hain. Tallest bar = 25 units, shortest = 10 units. Range?",
              answer:
                "Range = 25 - 10 = 15 units! Tallest = Max, Shortest = Min!",
              hint: "Tallest - Shortest = Range!",
            },
          ],
        },
        {
          id: "maxmin_graph_2",
          title: "📊 Line Graph Trend Analysis!",
          conceptHeading: "Trends Detect Karo!",
          explanation:
            "Line graph se TREND dekho!\n\n📏 **Upward Trend:** Line UPAR ja rahi hai → Values BADH rahe hain!\n📉 **Downward Trend:** Line NEECHE ja rahi hai → Values GHAT rahe hain!\n➡️ **Stable:** Line FLAT hai → Values SAME hain!\n\n📏 **Peak = Local Maximum**\n📏 **Valley = Local Minimum**\n📏 **Overall Range = Highest Peak - Lowest Valley**",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_graph_tb2",
              question: "Line graph: Jan=100, Feb=120, Mar=110, Apr=130, May=150. Trend kya hai?",
              answer:
                "Overall UPWARD trend hai! (100 → 150). Lekin March mein thoda gir gaya (120 → 110). Overall positive hai!",
              hint: "Start aur end dekho — overall direction kya hai?",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_graph_act1",
          title: "Graph Reading Challenge",
          description: "3 graphs se questions solve karo!",
          materials: ["Paper", "Pencil", "Graphs (teacher provided)"],
          steps: [
            "Teacher 3 graphs dete hain (bar, line, pie).",
            "Har graph se Max, Min, Range nikalo.",
            "3 questions answer karo!",
            "Sabse pehle correct answers dene wala jeeta!",
          ],
          outcome:
            "Student graphs se data interpret kar payenge!",
        },
        {
          id: "maxmin_graph_act2",
          title: "Create Graph from Data",
          description: "Data se graph banao!",
          materials: ["Paper", "Pencil", "Ruler", "Colored markers"],
          steps: [
            "Data set likho (6-8 values).",
            "Bar graph banao.",
            "Max, Min, Range identify karo.",
            "Classmate ko graph do — analyze karao!",
          ],
          outcome:
            "Student graph banana aur interpret dono seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_graph_tt1",
          tip: "Bar graph mein HEIGHT dekho — tallest bar = max, shortest = min. Simple trick!",
          context: "Introduction mein, jab student ko bar graph dikhana ho.",
        },
        {
          id: "maxmin_graph_tt2",
          tip: "Line graph mein TREND dekho — upar ja rahi hai ya neeche? Overall direction important hai!",
          context: "Jab student ko line graph trend dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_graph_w1",
          question: "Bar graph: A=45, B=60, C=55, D=70. Max kaunsa hai?",
          options: ["A", "B", "C", "D"],
          correct: 3,
          hint: "Sabse lambi bar dekho!",
          part: "A",
          partDescription: "Multiple Choice — Bar Graph Max",
        },
        {
          id: "maxmin_graph_w2",
          question: "Line graph: Jan=100, Feb=120, Mar=110, Apr=130. Trend kya hai?",
          options: ["Upward", "Downward", "Stable", "Cannot say"],
          correct: 0,
          hint: "100 → 130 = increasing!",
          part: "A",
          partDescription: "Multiple Choice — Trend",
        },
        {
          id: "maxmin_graph_w3",
          question: "Bar graph data: 20, 35, 28, 42, 30. Max, Min, Range nikalo!",
          correct: "Max = 42, Min = 20, Range = 22!",
          hint: "Tallest - Shortest = Range!",
          part: "B",
          partDescription: "Short Answer — Graph Analysis",
        },
        {
          id: "maxmin_graph_w4",
          question: "Line graph mein peak (local max) = 85, valley (local min) = 45. Local range kitna hai?",
          correct: "Local Range = 85 - 45 = 40!",
          hint: "Peak - Valley = Local Range!",
          part: "C",
          partDescription: "Short Answer — Local Range",
        },
        {
          id": "maxmin_graph_w5",
          question: "Apne school ke 6 months attendance data ka bar graph banao aur analyze karo!",
          correct: "Student-apna-answer",
          hint: "Data collect karo, graph banao, Max/Min/Range nikalo!",
          part: "D",
          partDescription: "Creative Activity — Graph Creation",
        },
      ],
    },
  ],
};
