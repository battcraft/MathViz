/**
 * Max/Min & Range — Beginner Level (Class 6)
 *
 * Foundation content based on client's Max/Min worksheet material.
 * Covers: Circle the max/min, table-based identification, word problems, create your own.
 * Part A-D structure: circle max/min, table-based, word problems, create your own.
 *
 * Content style: Simple Hinglish with street-smart analogies (samosa, cricket, metro).
 */

import { LevelTopicContent } from "./types";

export const maxminBeginner: LevelTopicContent = {
  topicId: "maxmin",
  topicName: "📊 Max, Min & Range: Data ka Power",
  level: "beginner",
  classLevel: "Class 6",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // FINDING MAX & MIN: IDENTIFICATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_identify",
      name: "🏆 Max & Min Kya Hai?",
      screens: [
        {
          id: "maxmin_id_1",
          title: "🏆 Maximum aur Minimum: Sabse Zyada aur Sabse Kam!",
          conceptHeading: "Max aur Min kya hota hai?",
          explanation:
            "Doston, MAXIMUM (Max) matlab SABSE ZYADA aur MINIMUM (Min) matlab SABSE KAM!\n\n📊 **Example:**\nMarks: 45, 67, 89, 23, 56\n→ Max = 89 (sabse zyada marks!)\n→ Min = 23 (sabse kam marks!)\n\n🏆 **Real Life:**\n→ Cricket mein: Max score = sabse zyada runs!\n→ Temperature mein: Min temperature = sabse kam!\n→ Height mein: Max = sabse lamba student!",
          interactiveType: "range_slider",
          pangaHint: "Numbers mein sabse bada aur sabse chhota dhundho!",
          thinkBox: [
            {
              id: "maxmin_id_tb1",
              question: "10, 25, 8, 30, 15 mein Max kya hai? 🤔",
              answer:
                "Max = 30! Sabse zyada number dhundho — 30 sabse bada hai!",
              hint: "Sabse bada number dhundho!",
            },
            {
              id: "maxmin_id_tb2",
              question: "10, 25, 8, 30, 15 mein Min kya hai?",
              answer:
                "Min = 8! Sabse chhota number dhundho — 8 sabse chhota hai!",
              hint: "Sabse chhota number dhundho!",
            },
            {
              id: "maxmin_id_tb3",
              question: "Kya Max aur Min kabhi same ho sakte hain? 🤔",
              answer:
                "Haan! Agar sab numbers SAME ho (jaise 5, 5, 5), toh Max = Min = 5!",
              hint: "Sab numbers same hain toh kya hoga?",
            },
          ],
        },
        {
          id: "maxmin_id_2",
          title: "🏆 Circle the Max/Min!",
          conceptHeading: "Circle Karke Dhundho!",
          explanation:
            "Worksheet mein aata hai — 'Circle the Maximum' ya 'Circle the Minimum'!\n\n📝 **Trick:**\n→ Numbers dekho, sabse bada dhundho, CIRCLE karo!\n→ Numbers dekho, sabse chhota dhundho, CIRCLE karo!\n\n📝 **Example:**\n12, **45**, 23, 67, **8** → Max = 45 (circle), Min = 8 (circle)",
          interactiveType: "range_slider",
          thinkBox: [
            {
              id: "maxmin_id_tb4",
              question: "Neeche Maximum circle karo: 34, 78, 12, 56, 89",
              answer:
                "89 circle karo! Sabse bada number hai!",
              hint: "Sabse bada dhundho!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_id_act1",
          title: "Max-Min Hunt",
          description: "Numbers mein Max aur Min dhundho!",
          materials: ["Paper", "Pencil", "Colored markers"],
          steps: [
            "Paper pe 10 sets of numbers likho (har set mein 5 numbers).",
            "Har set mein MAXIMUM circle karo (red color).",
            "Har set mein MINIMUM circle karo (blue color).",
            "Check karo — kya sab sahi hain!",
          ],
          outcome:
            "Student Max/Min easily dhundh payenge!",
        },
        {
          id: "maxmin_id_act2",
          title: "Real-life Max-Min",
          description: "Ghar mein Max/Min dhundho!",
          materials: ["Notebook", "Pencil", "Measuring tape (optional)"],
          steps: [
            "Ghar mein 5 cheeziyon ki length measure karo.",
            "Sabse lambi (Max) aur sabse chhoti (Min) identify karo.",
            "Temperature note karo — subah ka Min, dopahar ka Max!",
            "Results likho!",
          ],
          outcome:
            "Student real-life Max/Min samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_id_tt1",
          tip: "Numbers ko LINE mein likho aur arrow se Max aur Min point karo — visual banao!",
          context: "Introduction mein, jab student ko Max/Min dikhana ho.",
        },
        {
          id: "maxmin_id_tt2",
          tip: "Real-life se shuru karo — cricket scores, temperature, heights. Kids ko meaningful lagega!",
          context: "Jab student ko Max/Min ka application samjhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_id_w1",
          question: "Neeche Maximum circle karo: 15, 42, 28, 67, 34",
          options: ["15", "42", "67", "34"],
          correct: 2,
          hint: "Sabse bada number dhundho!",
          part: "A",
          partDescription: "Multiple Choice — Circle the Maximum",
        },
        {
          id: "maxmin_id_w2",
          question: "Neeche Minimum circle karo: 23, 8, 45, 12, 36",
          options: ["23", "8", "45", "12"],
          correct: 1,
          hint: "Sabse chhota number dhundho!",
          part: "A",
          partDescription: "Multiple Choice — Circle the Minimum",
        },
        {
          id: "maxmin_id_w3",
          question: "10, 20, 30, 40, 50 mein Max aur Min kya hai?",
          correct: "Max = 50, Min = 10",
          hint: "Sabse bada aur sabse chhota dhundho!",
          part: "B",
          partDescription: "Short Answer — Both Max & Min",
        },
        {
          id: "maxmin_id_w4",
          question: "Kya Max aur Min kabhi same ho sakte hain? Example do!",
          correct: "Haan! Agar sab numbers same ho: 5, 5, 5 → Max = Min = 5!",
          hint: "Sab numbers same hain toh?",
          part: "B",
          partDescription: "Short Answer — Concept Check",
        },
        {
          id: "maxmin_id_w5",
          question: "Apne class ke 10 students ke marks likho aur Max/Min identify karo!",
          correct: "Student-apna-answer",
          hint: "Marks likho aur sabse bada/chhota dhundho!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // TABLE-BASED IDENTIFICATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_tables",
      name: "📋 Tables se Max/Min!",
      screens: [
        {
          id: "maxmin_table_1",
          title: "📋 Table Reading: Max/Min Kaise Dhundhe!",
          conceptHeading: "Tables mein Max/Min",
          explanation:
            "Tables mein data organized hota hai — Max/Min dhundhna AASAAN hai!\n\n📝 **Example Table:**\n| Student | Marks |\n|---------|-------|\n| Rahul | 45 |\n| Priya | 78 |\n| Amit | 56 |\n| Sara | 89 |\n\n→ Max = Sara (89 marks) — SABSE ZYADA!\n→ Min = Rahul (45 marks) — SABSE KAM!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_table_tb1",
              question: "Table dekho:\n| Fruit | Price |\n|-------|-------|\n| Apple | ₹40 |\n| Banana | ₹20 |\n| Mango | ₹60 |\n| Grapes | ₹35 |\n\nSabse mehenga kaunsa hai? 🍎🍌🥭🍇",
              answer:
                "Mango sabse mehenga hai — ₹60! Max = Mango!",
              hint: "Price column dekho — sabse bada dhundho!",
            },
            {
              id: "maxmin_table_tb2",
              question: "Upar diye gaye table mein sabse sasta kaunsa hai?",
              answer:
                "Banana sabse sasta hai — ₹20! Min = Banana!",
              hint: "Price column dekho — sabse chhota dhundho!",
            },
          ],
        },
        {
          id: "maxmin_table_2",
          title: "📋 Multi-Column Tables",
          conceptHeading: "Alag Columns se Max/Min!",
          explanation:
            "Kabhi kabhi table mein alag-alag columns hote hain!\n\n📝 **Example:**\n| City | Mon | Tue | Wed |\n|------|-----|-----|-----|\n| Delhi | 35 | 38 | 40 |\n| Mumbai | 30 | 32 | 34 |\n\n→ Delhi ka Max = 40 (Wednesday)\n→ Mumbai ka Max = 34 (Wednesday)\n→ Overall Max = 40 (Delhi, Wednesday)!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_table_tb3",
              question: "Table mein har row ka Max nikalo:\n| Student | Hindi | English | Maths |\n|---------|-------|---------|-------|\n| A | 80 | 75 | 90 |\n| B | 70 | 85 | 80 |\n\nStudent A ka Max = ?, Student B ka Max = ?",
              answer:
                "Student A ka Max = 90 (Maths). Student B ka Max = 85 (English)!",
              hint: "Har row mein sabse bada dhundho!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_table_act1",
          title: "Table Max-Min Challenge",
          description: "Tables se Max/Min dhundho!",
          materials: ["Paper", "Pencil", "Colored markers"],
          steps: [
            "Teacher 3 tables dete hain (marks, prices, temperatures).",
            "Har table ka Max aur Min dhundho.",
            "Har answer ke saath reasoning likho!",
            "Sabse pehle 5 correct answers dene wala jeeta!",
          ],
          outcome:
            "Student tables se easily Max/Min dhundh payenge!",
        },
        {
          id: "maxmin_table_act2",
          title: "Create Your Own Table",
          description: "Apna table banao aur Max/Min dhundho!",
          materials: ["Paper", "Pencil"],
          steps: [
            "Apne favourite 5 items ka table banao (price, weight, etc.).",
            "Har column ka Max aur Min nikalo.",
            "Classmate ko do — solve karao!",
          ],
          outcome:
            "Student data create aur interpret dono seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_table_tt1",
          tip: "Tables COLOR-CODE karo — Max ko green, Min ko red. Visual impact zyada hota hai!",
          context: "Introduction mein, jab student ko tables dikhana ho.",
        },
        {
          id: "maxmin_table_tt2",
          tip: "Real data use karo — class marks, sports scores. Meaningful data se interest badhta hai!",
          context: "Jab student ko practical tables dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_table_w1",
          question: "Table dekho:\n| Item | Qty |\n|------|-----|\n| Pen | 5 |\n| Pencil | 12 |\n| Eraser | 8 |\n| Notebook | 3 |\n\nMaximum Qty kiska hai?",
          options: ["Pen", "Pencil", "Eraser", "Notebook"],
          correct: 1,
          hint: "Qty column dekho!",
          part: "A",
          partDescription: "Multiple Choice — Table Max",
        },
        {
          id: "maxmin_table_w2",
          question: "Upar diye gaye table mein Minimum Qty kiska hai?",
          options: ["Pen", "Pencil", "Eraser", "Notebook"],
          correct: 3,
          hint: "Qty column dekho — sabse chhota!",
          part: "A",
          partDescription: "Multiple Choice — Table Min",
        },
        {
          id: "maxmin_table_w3",
          question: "Table:\n| Day | Temp |\n|-----|------|\n| Mon | 28 |\n| Tue | 32 |\n| Wed | 30 |\n| Thu | 35 |\n\nMax temperature kis din hai?",
          correct: "Thursday (35°C)",
          hint: "Temperature column dekho!",
          part: "B",
          partDescription: "Short Answer — Temperature Table",
        },
        {
          id: "maxmin_table_w4",
          question: "Apne class ke 5 subjects ka marks table banao aur Max/Min identify karo!",
          correct: "Student-apna-answer",
          hint: "Table banao aur Max/Min dhundho!",
          part: "D",
          partDescription: "Creative Activity — Table Creation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // WORD PROBLEMS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_wordproblems",
      name: "📝 Word Problems: Real Life Max/Min!",
      screens: [
        {
          id: "maxmin_wp_1",
          title: "📝 Simple Word Problems",
          conceptHeading: "Max/Min in Words!",
          explanation:
            "Word problems mein Max/Min dhundhna hota hai!\n\n📝 **Example 1:**\nRahul ke marks: 45, 67, 89, 23. Max marks kitne hain?\n→ Max = 89 (sabse zyada marks!)\n\n📝 **Example 2:**\nWeek mein temperatures: 25, 28, 30, 22, 27, 32, 29°C. Sabse kam temperature?\n→ Min = 22°C (sabse kam!)\n\n📝 **Trick:** Numbers identify karo, phir Max/Min dhundho!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_wp_tb1",
              question: "Amit ke 5 subjects ke marks: 78, 85, 62, 91, 73. Max marks kitne hain? 🤔",
              answer:
                "Max = 91! Sabse zyada marks — 91!",
              hint: "Sabse bada number dhundho!",
            },
            {
              id: "maxmin_wp_tb2",
              question: "Week ki temperatures: 30, 33, 28, 35, 31, 29, 34°C. Min temperature?",
              answer:
                "Min = 28°C! Sabse kam temperature!",
              hint: "Sabse chhota number dhundho!",
            },
            {
              id: "maxmin_wp_tb3",
              question: "5 students ki heights (cm): 150, 145, 155, 148, 152. Range nikalo!",
              answer:
                "Range = Max - Min = 155 - 145 = 10 cm!",
              hint: "Range = Max - Min!",
            },
          ],
        },
        {
          id: "maxmin_wp_2",
          title: "📝 Multi-Step Word Problems",
          conceptHeading: "Zyada Steps Wale Problems!",
          explanation:
            "Kabhi kabhi 2-3 steps lagte hain!\n\n📝 **Example:**\nRahul ke 3 tests ke marks: 65, 78, 82.\n→ Max = 82\n→ Min = 65\n→ Range = 82 - 65 = 17\n→ Average = (65+78+82)/3 = 225/3 = 75\n→ Max average se zyada hai? 82 > 75 = Haan!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_wp_tb4",
              question: "5 students ke marks: 45, 67, 89, 23, 56. Max, Min, aur Range nikalo!",
              answer:
                "Max = 89, Min = 23, Range = 89 - 23 = 66!",
              hint: "Pehle Max/Min, phir Range = Max - Min!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_wp_act1",
          title: "Word Problem Generator",
          description: "Khud ke word problems banao!",
          materials: ["Paper", "Pencil"],
          steps: [
            "5 numbers likho.",
            "Usse ek word problem banao (Max/Min/Range).",
            "Answer bhi likho!",
            "Classmate ko do — solve karao!",
          ],
          outcome:
            "Student word problems banana aur solve dono seekhenge!",
        },
        {
          id: "maxmin_wp_act2",
          title: "Sports Data Analysis",
          description: "Sports data se Max/Min dhundho!",
          materials: ["Paper", "Pencil", "Internet (optional)"],
          steps: [
            "Cricket match ke scores likho (5 players).",
            "Max scorer aur Min scorer identify karo.",
            "Range nikalo (Max - Min).",
            "Check: kya sab sahi hai!",
          ],
          outcome:
            "Student real-world data se Max/Min samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_wp_tt1",
          tip: "Word problems ke liye PEHLE numbers identify karo, phir Max/Min dhundho. Step-by-step approach!",
          context: "Introduction mein, jab student ko word problems dikhana ho.",
        },
        {
          id: "maxmin_wp_tt2",
          tip: "Range ka formula BAR BAR dohravo — Max - Min. Students ko yaad rahega!",
          context: "Jab student ko range concept dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_wp_w1",
          question: "Riya ke marks: 78, 85, 92, 65, 88. Max marks kitne hain?",
          options: ["78", "85", "92", "88"],
          correct: 2,
          hint: "Sabse bada marks dhundho!",
          part: "A",
          partDescription: "Multiple Choice — Simple Max",
        },
        {
          id: "maxmin_wp_w2",
          question: "Week mein temperatures: 25, 28, 30, 22, 27°C. Range kitna hai?",
          options: ["3°C", "5°C", "8°C", "10°C"],
          correct: 2,
          hint: "Range = Max - Min = 30 - 22 = 8°C!",
          part: "A",
          partDescription: "Multiple Choice — Range",
        },
        {
          id: "maxmin_wp_w3",
          question: "5 fruits ke prices: ₹20, ₹45, ₹30, ₹15, ₹40. Max, Min, aur Range nikalo!",
          correct: "Max = ₹45, Min = ₹15, Range = ₹30",
          hint: "Max - Min = Range!",
          part: "B",
          partDescription: "Short Answer — All Three",
        },
        {
          id: "maxmin_wp_w4",
          question: "Word problem banao jiska answer Max = 100 ho!",
          correct: "Student-apna-answer",
          hint: "Numbers banao jisme 100 sabse bada ho!",
          part: "D",
          partDescription: "Creative Activity — Problem Creation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // CREATE YOUR OWN: APPLICATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: "maxmin_create",
      name: "🎨 Create Your Own!",
      screens: [
        {
          id: "maxmin_create_1",
          title: "🎨 Data Collection: Apna Data Banao!",
          conceptHeading: "Data Collect Karo aur Compare Karo!",
          explanation:
            "Ab tum APNA data collect karoge aur Max/Min/Range dhundoge!\n\n📝 **Steps:**\n→ Step 1: Data collect karo (marks, prices, heights...)\n→ Step 2: Table banao\n→ Step 3: Max, Min, Range nikalo\n→ Step 4: Questions banao aur answer karo!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_create_tb1",
              question: "Apne ghar ke 5 members ki heights measure karo aur Max/Min/Range nikalo! 🤔",
              answer:
                "Example: 150, 165, 170, 140, 155. Max = 170, Min = 140, Range = 30 cm!",
              hint: "Heights measure karo aur table banao!",
            },
          ],
        },
        {
          id: "maxmin_create_2",
          title: "🎨 Poster Banao: Max-Min Champion!",
          conceptHeading: "Max-Min Poster!",
          explanation:
            "Ek poster banao jisme:\n→ Max/Min ka definition ho\n→ 5 real-life examples ho\n→ Apna collected data ho\n→ Max, Min, Range calculations ho\n\nSabse achha poster banane wala MAX-MIN CHAMPION! 🏆",
          interactiveType: "none",
          thinkBox: [
            {
              id: "maxmin_create_tb2",
              question: "Poster pe kya likhoge? Plan karo!",
              answer:
                "Definition, 5 examples, apna data, calculations — sab ek jagah!",
              hint: "Plan banao pehle!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "maxmin_create_act1",
          title: "Data Collection Project",
          description: "2 din ka data collection project!",
          materials: ["Notebook", "Pencil", "Measuring tape", "Thermometer (optional)"],
          steps: [
            "Day 1: Data collect karo — temperatures, heights, marks, prices.",
            "Day 2: Data organize karo — table banao, Max/Min/Range nikalo.",
            "3 questions banao aur answer karo.",
            "Class mein present karo!",
          ],
          outcome:
            "Student independent data collection aur analysis seekhenge!",
        },
        {
          id: "maxmin_create_act2",
          title: "Max-Min Quiz Competition",
          description: "Class mein quiz khelo!",
          materials: ["Paper", "Pencil", "Timer"],
          steps: [
            "Teacher 10 questions dete hain (Max/Min/Range).",
            "Students 30 seconds mein answer karein.",
            "Sabse zyada correct answers dene wala jeeta!",
          ],
          outcome:
            "Student fast solving seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "maxmin_create_tt1",
          tip: "Data collection project 2-3 din ka ho — students ko real data collect karna chahiye!",
          context: "Project work mein, jab students independent work karein.",
        },
        {
          id: "maxmin_create_tt2",
          tip: "Quiz competition se interest badhta hai — Max/Min speed challenge karo!",
          context: "Jab students ko practice karna ho.",
        },
      ],
      worksheet: [
        {
          id: "maxmin_create_w1",
          question: "Apne class ke 5 students ke heights measure karo aur table banao!",
          correct: "Student-apna-answer",
          hint: "Heights measure karo, table banao, Max/Min/Range nikalo!",
          part: "C",
          partDescription: "Data Collection — Real-world",
        },
        {
          id: "maxmin_create_w2",
          question: "Apna ek word problem banao jisme Range = 25 ho!",
          correct: "Student-apna-answer",
          hint: "Max - Min = 25. Example: Max = 50, Min = 25!",
          part: "D",
          partDescription: "Creative Activity — Problem Creation",
        },
        {
          id: "maxmin_create_w3",
          question: "Poster banao: Max-Min definition, 5 examples, apna data!",
          correct: "Student-apna-answer",
          hint: "Definition, examples, data, calculations — sab likho!",
          part: "D",
          partDescription: "Creative Activity — Poster Making",
        },
      ],
    },
  ],
};
