/**
 * Comparing Numbers — Beginner Level (Class 6)
 *
 * Foundation content based on client's Comparing Numbers material.
 * Covers: >, <, = symbols, digit counting method, decimal comparison, real-life examples.
 * Each concept includes Think Box questions, Activities, and Teacher Tips.
 *
 * Content style: Simple Hinglish with street-smart analogies (samosa, cricket, metro).
 */

import { LevelTopicContent } from "./types";

export const comparingBeginner: LevelTopicContent = {
  topicId: "compare",
  topicName: "🔢 Comparing Numbers: Kaun Bada, Kaun Chhota?",
  level: "beginner",
  classLevel: "Class 6",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // BASICS: >, <, = SYMBOLS
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_basics",
      name: "🎯 Basics: >, <, = Ka Kamaal",
      screens: [
        {
          id: "compare_basics_1",
          title: "🎯 Greater Than, Less Than: Crocodile Mouth Rule!",
          conceptHeading: "Symbols >, <, aur = kya hain?",
          explanation:
            "Doston, numbers compare karna matlab hai dekhna kaun BADA hai aur kaun CHHOTA hai! Hum teen symbols use karte hain:\n\n✅ **> (Greater Than)** — Bada side khaata hai! Jaise crocodile ka munh hamesha bade number ki taraf khulta hai!\n✅ **< (Less Than)** — Chhota side khaata hai!\n✅ **= (Equal To)** — Dono barabar hain!\n\nYaad karo: Crocodile hamesha zyada khana chahta hai! 🐊",
          interactiveType: "decimal_battle",
          pangaHint: "Crocodile ka munh kis taraf khulega? Bade number ki taraf! 🐊",
          thinkBox: [
            {
              id: "compare_tb1",
              question: "5 > 3 hai ya 3 > 5? Crocodile ka munh kis taraf khulega? 🐊",
              answer:
                "5 > 3! Kyunki 5 zyada hai 3 se. Crocodile ka munh 5 ki taraf khulega — hamesha bade number ko khaata hai!",
              hint: "Crocodile hamesha bade number ki taraf munh khulta hai.",
            },
            {
              id: "compare_tb2",
              question: "Kya 7 = 7 hai? Symbol kya hoga?",
              answer:
                "Haan! 7 = 7 hai! Equal to ka symbol (=) lagta hai jab dono numbers BARABAR ho. Koi bada nahi, koi chhota nahi!",
              hint: "Barabar = dono same hain.",
            },
            {
              id: "compare_tb3",
              question: "10 aur 100 — kaunsa bada hai? > ya < lagao!",
              answer:
                "10 < 100! Kyunki 100 zyada hai 10 se. 10 ki taraf chhota munh, 100 ki taraf bada munh!",
              hint: "Zyada zero = zyada bada number!",
            },
          ],
        },
        {
          id: "compare_basics_2",
          title: "🎯 Crocodile Mouth: Real Life Examples",
          conceptHeading: "Roz Marra mein Comparing",
          explanation:
            "Comparing har jagah hai!\n\n🏆 Cricket mein: India (350 runs) > Pakistan (280 runs) — India jeeta!\n💰 Pocket Money: ₹100 > ₹50 — tumhare paas zyada hai!\n📏 Height: Rahul (5'2\") < Amit (5'5\") — Amit lamba hai!\n\nHar jagah >, <, = ka use hota hai!",
          interactiveType: "decimal_battle",
          thinkBox: [
            {
              id: "compare_tb4",
              question: "Tumhare class mein 40 students hain, doosre class mein 35. Kaunsa bada hai? 🏫",
              answer:
                "40 > 35! Tumhare class mein zyada students hain! Comparing real life mein bhi hota hai!",
              hint: "Zyada students = bada number.",
            },
          ],
        },
        {
          id: "compare_basics_3",
          title: "🎯 Digit Counting Method",
          conceptHeading: "Kitne Digits? Utna Bada!",
          explanation:
            "Ek TRICK hai numbers compare karne ki — DIGIT COUNTING!\n\n📏 **Rule 1:** Jiske paas zyada DIGITS hain, woh BADA hai!\n   → 999 (3 digits) > 50 (2 digits) — Kyunki 999 ke 3 digits hain!\n\n📏 **Rule 2:** Agar digits SAME hain, toh LEFT SE compare karo!\n   → 567 > 538 — Kyunki 5 = 5, lekin 6 > 3!\n\n📏 **Rule 3:** Sab digits same hain? Toh = hai!\n   → 444 = 444",
          interactiveType: "decimal_battle",
          pangaHint: "Pehle digits count karo, phir compare karo!",
          thinkBox: [
            {
              id: "compare_tb5",
              question: "89 aur 123 — kaunsa bada hai? Digit counting use karo!",
              answer:
                "123 > 89! Kyunki 123 ke 3 digits hain aur 89 ke sirf 2 digits. Zyada digits = bada number!",
              hint: "Digits count karo pehle!",
            },
            {
              id: "compare_tb6",
              question: "456 aur 489 — dono 3 digits ke hain. Ab kaise compare karoge?",
              answer:
                "Left se compare karo! 4 = 4 (same), lekin 5 < 8. Isliye 456 < 489!",
              hint: "Sabse pehla digit same hai? Agla dekho!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_basics_act1",
          title: "Crocodile Mouth Drawing",
          description: "Paper pe crocodile banao aur symbols seekho!",
          materials: ["Paper", "Pencil", "Colored markers", "Ruler"],
          steps: [
            "Paper pe 5 jodi numbers likho (jaise 3&7, 12&8, 50&50...).",
            "Har jodi ke beech crocodile ka munh banao — bade number ki taraf khula hua!",
            "Munh ke andar > ya < ya = symbol likho.",
            "Sab jodiyan complete karo aur check karo!",
          ],
          outcome:
            "Student crocodile mouth rule yaad rakhenge aur >, <, = symbols easily samjhenge!",
        },
        {
          id: "compare_basics_act2",
          title: "Number Card Game",
          description: "Cards se numbers compare karo!",
          materials: ["Index cards (10 pieces)", "Marker", "Timer"],
          steps: [
            "10 cards pe alag-alag numbers likho (1-100).",
            "Ek card uthao aur guess karo — agla card bada hoga ya chhota?",
            "Card dekho aur check karo sahi guess tha ya nahi!",
            "10 rounds khelo — sabse zyada sahi guesses jeeta!",
          ],
          outcome:
            "Student quick comparison seekhenge aur confidence badhega!",
        },
      ],
      teacherTips: [
        {
          id: "compare_basics_tt1",
          tip: "Crocodile mouth se shuru karo — visual banao ya bade cutout banao. Kids ko crocodile pasand hai!",
          context: "Introduction mein, jab student ko pehli baar >, <, = dikhana ho.",
        },
        {
          id: "compare_basics_tt2",
          tip: "Real-life examples use karo — cricket scores, pocket money, height. Comparing tab meaningful lagta hai!",
          context: "Jab student ko comparison ka real-world application samjhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_basics_w1",
          question: "Neeche >, < ya = lagao: 25 ____ 30",
          options: [">", "<", "=", "None"],
          correct: 1,
          hint: "30 zyada hai 25 se!",
          part: "A",
          partDescription: "Multiple Choice — Basic Symbol Check",
        },
        {
          id: "compare_basics_w2",
          question: "Neeche >, < ya = lagao: 150 ____ 150",
          options: [">", "<", "=", "None"],
          correct: 2,
          hint: "Dono same hain!",
          part: "A",
          partDescription: "Multiple Choice — Equal Numbers",
        },
        {
          id: "compare_basics_w3",
          question: "Neeche >, < ya = lagao: 78 ____ 87",
          options: [">", "<", "=", "None"],
          correct: 1,
          hint: "Digit counting: 7 < 8 hai!",
          part: "B",
          partDescription: "Short Answer — Digit Comparison",
        },
        {
          id: "compare_basics_w4",
          question: "567 ____ 567 mein >, < ya = lagao aur reason likho.",
          correct: "=",
          hint: "Dono numbers same hain!",
          part: "B",
          partDescription: "Short Answer — Concept Understanding",
        },
        {
          id: "compare_basics_w5",
          question: "Apne class ke marks comparison chart banao — top 5 students ke marks likho aur compare karo!",
          correct: "Student-apna-answer",
          hint: "Marks list banao aur >, < symbols lagao!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // DECIMALS: DECIMAL COMPARISON
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_decimals",
      name: "🎯 Decimals: Point ke Baad Kya Hai?",
      screens: [
        {
          id: "compare_decimals_1",
          title: "🎯 Decimal Comparison: Point ke Baad Dekho!",
          conceptHeading: "Decimals Kaise Compare Karein?",
          explanation:
            "Doston, decimals mein POINT (.) ke baad bhi digits hote hain!\n\n📏 **Rule 1:** Pehle WHOLE NUMBER part compare karo!\n   → 3.5 aur 4.2: 3 < 4, toh 3.5 < 4.2!\n\n📏 **Rule 2:** Agar whole number SAME hai, toh DECIMAL part compare karo!\n   → 2.7 aur 2.3: 7 > 3, toh 2.7 > 2.3!\n\n📏 **Rule 3:** Decimal places same nahi hain? Toh ZERO add karo!\n   → 5.6 aur 5.60 — DONO SAME HAIN! (5.60 = 5.6)",
          interactiveType: "decimal_battle",
          pangaHint: "Point ke baad ka number bhi compare karo!",
          thinkBox: [
            {
              id: "compare_dec_tb1",
              question: "2.5 aur 2.8 — kaunsa bada hai? 🤔",
              answer:
                "2.8 > 2.5! Whole number same hai (2), lekin decimal part mein 8 > 5. Isliye 2.8 bada hai!",
              hint: "Whole number same hai? Decimal part dekho!",
            },
            {
              id: "compare_dec_tb2",
              question: "3.14 aur 3.1 — kaunsa bada hai?",
              answer:
                "3.14 > 3.1! Kyunki 3.1 = 3.10 hai. Ab 14 > 10, toh 3.14 > 3.10!",
              hint: "3.1 ko 3.10 banao — phir compare karo!",
            },
            {
              id: "compare_dec_tb3",
              question: "0.9 aur 0.10 — kaunsa bada hai? 🤔",
              answer:
                "0.9 > 0.10! Kyunki 0.9 = 0.90 hai. Ab 90 > 10, toh 0.90 > 0.10! Ek trick: 0.9 = 9/10, 0.10 = 1/10!",
              hint: "Dono ko same decimal places mein convert karo!",
            },
          ],
        },
        {
          id: "compare_decimals_2",
          title: "🎯 Real-life Decimals: Money & Measurements",
          conceptHeading: "Decimals in Daily Life",
          explanation:
            "Decimals har jagah hain!\n\n💰 ₹12.50 > ₹12.30 — Pani puri zyada mehengi!\n📏 1.5 metre < 1.8 metre — Rahul lamba hai!\n⏱️ 2.5 seconds < 3.1 seconds — Tum tez bhagte ho!\n\nPoint ke baad ka number matter karta hai!",
          interactiveType: "decimal_battle",
          thinkBox: [
            {
              id: "compare_dec_tb4",
              question: "Ice cream ₹25.50 hai aur chocolate ₹25.75 hai. Kaunsi zyada mehengi hai? 🍦🍫",
              answer:
                "Chocolate zyada mehengi hai! ₹25.75 > ₹25.50. Whole number same hai (25), lekin 75 > 50!",
              hint: "Point ke baad ka number dekho!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_decimals_act1",
          title: "Shop Price Comparison",
          description: "Dukaan ke prices compare karo!",
          materials: ["Paper", "Pencil", "Old bills/price tags (optional)"],
          steps: [
            "Paper pe 10 items ke prices likho (with decimals): ₹10.50, ₹25.75, etc.",
            "Har pair mein >, <, ya = lagao.",
            "Sabse mehenga aur sabse sasta item identify karo!",
            "Classmates ke saath share karo!",
          ],
          outcome:
            "Student decimals compare karna seekhenge aur real-life application samjhenge!",
        },
        {
          id: "compare_decimals_act2",
          title: "Measurement Race",
          description: "Alag-alag cheeziyon ki length measure karo aur compare karo!",
          materials: ["Ruler (cm/mm markings)", "Notebook", "Pencil"],
          steps: [
            "Ruler se 5 cheeziyon ki length measure karo (with decimals).",
            "Results table mein likho.",
            "Sabse lamba aur sabse chhota segment identify karo!",
            "Comparing symbols use karo!",
          ],
          outcome:
            "Student decimal measurement samjhenge aur compare karna seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_decimals_tt1",
          tip: "Money se samjhao — ₹10.50 vs ₹10.75. Kids ko paise samajhte hain!",
          context: "Introduction mein, jab student ko decimal comparison dikhana ho.",
        },
        {
          id: "compare_decimals_tt2",
          tip: "ZERO trick samjhao — 0.5 = 0.50 = 0.500. Same decimal places banao phir compare karo!",
          context: "Jab student ko decimal places equal karna ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_dec_w1",
          question: "3.2 aur 3.20 — dono same hain ya different?",
          options: ["Same hain", "Different hain", "Depends", "Cannot say"],
          correct: 0,
          hint: "0.2 = 0.20! Zero add karne se value nahi badalti!",
          part: "A",
          partDescription: "Multiple Choice — Decimal Equality",
        },
        {
          id: "compare_dec_w2",
          question: "Neeche >, < ya = lagao: 4.5 ____ 4.05",
          options: [">", "<", "=", "None"],
          correct: 0,
          hint: "4.5 = 4.50 hai. Ab 50 > 05!",
          part: "A",
          partDescription: "Multiple Choice — Decimal Comparison",
        },
        {
          id: "compare_dec_w3",
          question: "₹15.75 aur ₹15.57 — kaunsa zyada hai?",
          options: ["₹15.75", "₹15.57", "Dono same", "Cannot compare"],
          correct: 0,
          hint: "Point ke baad: 75 > 57!",
          part: "B",
          partDescription: "Short Answer — Money Application",
        },
        {
          id: "compare_dec_w4",
          question: "0.8 ____ 0.08 mein >, < ya = lagao aur reason likho.",
          correct: ">",
          hint: "0.8 = 0.80 hai. 80 > 08!",
          part: "C",
          partDescription: "Short Answer — Zero Trick",
        },
        {
          id: "compare_dec_w5",
          question: "Apne ghar mein 5 cheeziyon ki length (cm) measure karo aur compare karo!",
          correct: "Student-apna-answer",
          hint: "Ruler se naap lo aur >, < symbols lagao!",
          part: "D",
          partDescription: "Measurement Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // ROUNDING: ROUNDING FOR COMPARISON
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_rounding",
      name: "🎯 Rounding: Approximate se Compare!",
      screens: [
        {
          id: "compare_rounding_1",
          title: "🎯 Rounding Numbers: Nearest 10, 100, 1000",
          conceptHeading: "Rounding Kya Hai?",
          explanation:
            "Doston, rounding matlab number ko PAAS ke 'easy' number mein convert karna!\n\n📏 **Nearest 10:** 5,6,7,8,9 → UPAR. 1,2,3,4 → NEECHE.\n   → 47 ≈ 50 (kyunki 7 ≥ 5)\n   → 43 ≈ 40 (kyunki 3 < 5)\n\n📏 **Nearest 100:** 50-99 → UPAR. 0-49 → NEECHE.\n   → 356 ≈ 400\n   → 342 ≈ 300\n\nRounding se comparison AASAAN hota hai!",
          interactiveType: "rounding_match",
          pangaHint: "Number ko nearest 10/100 mein round karo!",
          thinkBox: [
            {
              id: "compare_round_tb1",
              question: "67 ko nearest 10 mein round karo!",
              answer:
                "67 ≈ 70! Kyunki 7 ≥ 5, isliye UPAR round karte hain!",
              hint: "Last digit 5 ya usse bada hai? Upar jao!",
            },
            {
              id: "compare_round_tb2",
              question: "234 ko nearest 100 mein round karo!",
              answer:
                "234 ≈ 200! Kyunki 34 < 50, isliye NEECHE round karte hain!",
              hint: "Tens digit 5 se chhota hai? Neeche jao!",
            },
            {
              id: "compare_round_tb3",
              question: "555 ko nearest 100 mein round karo!",
              answer:
                "555 ≈ 600! Kyunki 55 ≥ 50, isliye UPAR round karte hain!",
              hint: "Tens digit 5 hai? UPAR jao!",
            },
          ],
        },
        {
          id: "compare_rounding_2",
          title: "🎯 Rounding se Quick Comparison",
          conceptHeading: "Rounding Trick for Comparing",
          explanation:
            "Rounding trick: Jab dono numbers CLOSE ho, toh rounding karke quick comparison karo!\n\n📝 **Example:** 487 aur 492 compare karo.\n→ 487 ≈ 490 (nearest 10)\n→ 492 ≈ 490 (nearest 10)\n→ Dono SAME lag rahe hain! Exact compare karo: 492 > 487!\n\nRounding se estimate milta hai, exact answer ke liye direct compare karo!",
          interactiveType: "rounding_match",
          thinkBox: [
            {
              id: "compare_round_tb4",
              question: "Rounding use karo: 198 aur 203 — kaunsa bada hai? 🤔",
              answer:
                "198 ≈ 200 aur 203 ≈ 200. Dono 200 ke paas hain! Exact: 203 > 198!",
              hint: "Dono ko nearest 10 mein round karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_rounding_act1",
          title: "Rounding Wheel",
          description: "Wheel banao aur round karo!",
          materials: ["Paper plate", "Marker", "Brass fastener", "Scissors"],
          steps: [
            "Paper plate pe numbers likho (10-99).",
            "Center pe pointer banao with brass fastener.",
            "Pointer ghumao — jo number aaye, nearest 10 mein round karo!",
            "5 rounds khelo — sabse zyada correct roundings jeeta!",
          ],
          outcome:
            "Student rounding seekhenge aur quick comparison kar payenge!",
        },
        {
          id: "compare_rounding_act2",
          title: "Population Estimation",
          description: "City populations round karo aur compare karo!",
          materials: ["Paper", "Pencil", "Internet (optional)"],
          steps: [
            "5 Indian cities ke populations likho (exact numbers).",
            "Har population ko nearest 10,000 mein round karo.",
            "Rounded numbers se compare karo!",
            "Check: kya rounding se sahi answer aaya?",
          ],
          outcome:
            "Student dekhenge ki rounding se approximate comparison kaise hota hai!",
        },
      ],
      teacherTips: [
        {
          id: "compare_rounding_tt1",
          tip: "5-rule samjhao: Last digit 5,6,7,8,9 → UPAR. 0,1,2,3,4 → NEECHE. Mnemonic: '5 se upar, jaao upar!'",
          context: "Introduction mein, jab student ko rounding sikhana ho.",
        },
        {
          id: "compare_rounding_tt2",
          tip: "Rounding ke baad ALWAYS exact comparison bhi karao — rounding sirf estimate hai, exact nahi!",
          context: "Jab student ko rounding trick dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_round_w1",
          question: "78 ko nearest 10 mein round karo!",
          options: ["70", "80", "75", "90"],
          correct: 1,
          hint: "Last digit 8 hai — 5 se bada, toh UPAR!",
          part: "A",
          partDescription: "Multiple Choice — Basic Rounding",
        },
        {
          id: "compare_round_w2",
          question: "345 ko nearest 100 mein round karo!",
          options: ["300", "350", "400", "340"],
          correct: 0,
          hint: "Tens digit 4 hai — 5 se chhota, toh NEECHE!",
          part: "A",
          partDescription: "Multiple Choice — Nearest 100",
        },
        {
          id: "compare_round_w3",
          question: "Rounding use karo: 289 aur 294 — kaunsa bada hai?",
          options: ["289", "294", "Dono same", "Cannot say"],
          correct: 1,
          hint: "289 ≈ 290, 294 ≈ 290. Exact: 294 > 289!",
          part: "B",
          partDescription: "Short Answer — Rounding Comparison",
        },
        {
          id: "compare_round_w4",
          question: "555 nearest 100 mein kitna hota hai? Aur nearest 10 mein?",
          correct: "600 aur 560",
          hint: "55 ≥ 50, toh 100 mein UPAR. 5 ≥ 5, toh 10 mein UPAR!",
          part: "C",
          partDescription: "Short Answer — Double Rounding",
        },
        {
          id: "compare_round_w5",
          question: "Apne school ke 5 classes ke students count karo, round karo, aur compare karo!",
          correct: "Student-apna-answer",
          hint: "Students count karo aur nearest 10 mein round karo!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // PLACE VALUE & ORDERING
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_placevalue",
      name: "🎯 Place Value se Ordering",
      screens: [
        {
          id: "compare_pv_1",
          title: "🎯 Place Value: Ones, Tens, Hundreds!",
          conceptHeading: "Har Digit ki Jagah Fixed Hai!",
          explanation:
            "Doston, numbers mein har digit ki ek FIXED JAGAH hoti hai:\n\n📏 **Example: 4,567**\n→ 7 = ONES (unit)\n→ 6 = TENS (6 × 10 = 60)\n→ 5 = HUNDREDS (5 × 100 = 500)\n→ 4 = THOUSANDS (4 × 1000 = 4000)\n\nComparing mein: Pehle LEFT se (highest place value) dekho!\n→ 4567 aur 4576: 4=4, 5=5, 6 < 7. Toh 4567 < 4576!",
          interactiveType: "none",
          pangaHint: "Digits ki jagah yaad karo!",
          thinkBox: [
            {
              id: "compare_pv_tb1",
              question: "8,234 mein 2 ki value kya hai? 🤔",
              answer:
                "2 ki value = 2 × 100 = 200! Kyunki 2 HUNDREDS place pe hai!",
              hint: "2 kis position pe hai? Count from right!",
            },
            {
              id: "compare_pv_tb2",
              question: "3,891 aur 3,918 — place value use karo aur compare karo!",
              answer:
                "3=3 (thousands same), 8 < 9 (hundreds). Toh 3,891 < 3,918!",
              hint: "Left se compare karo — sabse pehla different digit dhundho!",
            },
            {
              id: "compare_pv_tb3",
              question: "Kya 1,000 > 999 hai? Digits dekho!",
              answer:
                "Haan! 1,000 ke 4 digits hain, 999 ke 3 digits. Zyada digits = bada number! Yeh digit counting rule hai!",
              hint: "Digits count karo pehle!",
            },
          ],
        },
        {
          id: "compare_pv_2",
          title: "🎯 Ascending & Descending Order",
          conceptHeading: "Numbers ko Order mein Lagao!",
          explanation:
            "📈 **Ascending Order:** Chhota → Bada (↑ increasing)\n→ 23, 45, 67, 89\n\n📉 **Descending Order:** Bada → Chhota (↓ decreasing)\n→ 89, 67, 45, 23\n\nTrick: Pehle sab numbers likho, phir LEFT se compare karo, phir arrange karo!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_pv_tb4",
              question: "34, 12, 56, 23 ko ascending order mein lagao! 📈",
              answer:
                "12, 23, 34, 56! Chhota se bada: 12 < 23 < 34 < 56!",
              hint: "Sabse chhota dhundho pehle!",
            },
            {
              id: "compare_pv_tb5",
              question: "100, 50, 200, 150 ko descending order mein lagao! 📉",
              answer:
                "200, 150, 100, 50! Bada se chhota: 200 > 150 > 100 > 50!",
              hint: "Sabse bada dhundho pehle!",
            },
          ],
        },
        {
          id: "compare_pv_3",
          title: "🎯 Zero Ka Power!",
          conceptHeading: "Zero Kya Karta Hai?",
          explanation:
            "ZERO ek CHUPA HUA POWER hai!\n\n→ 50 vs 5: 50 > 5 (zero ne 10 guna bada kar diya!)\n→ 500 vs 50: 500 > 50 (ek aur zero = 10 guna!)\n→ 1000 vs 999: 1000 > 999 (zyada digits!)\n\nZero ke saath digit ki value 10 GUNA badhti hai!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_pv_tb6",
              question: "700 aur 70 — kitna guna bada hai 700? 🤔",
              answer:
                "700 = 70 × 10! Ek zero zyada = 10 guna bada! 700 > 70!",
              hint: "Ek zero = 10 guna!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_pv_act1",
          title: "Place Value Card Sort",
          description: "Cards se place value samjho aur numbers arrange karo!",
          materials: ["Index cards", "Marker", "Rubber bands"],
          steps: [
            "Cards pe 0-9 ke digits likho (multiple copies).",
            "Teacher ek number bolte hain (jaise 4,567).",
            "Students cards se number banao aur place value label karo!",
            "Sab numbers arrange karo ascending/descending order mein!",
          ],
          outcome:
            "Student place value samjhenge aur numbers easily arrange kar payenge!",
        },
        {
          id: "compare_pv_act2",
          title: "Number Line Ordering",
          description: "Number line pe points plot karo aur order karo!",
          materials: ["Ruler", "Paper", "Pencil", "Colored markers"],
          steps: [
            "Paper pe 0-100 ki number line banao.",
            "5 numbers likho (teacher ya khud).",
            "Number line pe plot karo.",
            "Ascending aur descending order mein likho!",
          ],
          outcome:
            "Student number line pe visual comparison seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_pv_tt1",
          tip: "Place value chart banao — Ones, Tens, Hundreds, Thousands columns. Har digit apni jagah pe baitho!",
          context: "Introduction mein, jab student ko place value samjhana ho.",
        },
        {
          id: "compare_pv_tt2",
          tip: "Ascending = A for Ascending = A for Aasan (increasing). Descending = D for Decreasing!",
          context: "Jab student ko ordering sikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_pv_w1",
          question: "5,678 mein 6 ki value kya hai?",
          options: ["6", "60", "600", "6000"],
          correct: 1,
          hint: "6 TENS place pe hai — 6 × 10 = 60!",
          part: "A",
          partDescription: "Multiple Choice — Place Value",
        },
        {
          id: "compare_pv_w2",
          question: "Neeche diye gaye numbers ko ascending order mein lagao: 45, 12, 78, 34",
          options: ["12, 34, 45, 78", "78, 45, 34, 12", "12, 45, 34, 78", "34, 12, 78, 45"],
          correct: 0,
          hint: "Chhota se bada lagao!",
          part: "A",
          partDescription: "Multiple Choice — Ascending Order",
        },
        {
          id: "compare_pv_w3",
          question: "999 aur 1,000 — place value explain karo!",
          correct: "1,000 > 999. 999 ke 3 digits (max 999), 1,000 ke 4 digits. Zyada digits = bada!",
          hint: "Digits count karo!",
          part: "B",
          partDescription: "Short Answer — Digit Counting",
        },
        {
          id: "compare_pv_w4",
          question: "200, 20, 2000, 2 ko descending order mein lagao!",
          correct: "2000, 200, 20, 2",
          hint: "Bada se chhota lagao!",
          part: "B",
          partDescription: "Short Answer — Descending Order",
        },
        {
          id: "compare_pv_w5",
          question: "Apne class ke marks ko ascending aur descending dono order mein likho!",
          correct: "Student-apna-answer",
          hint: "Marks list banao aur dono order mein arrange karo!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },
  ],
};
