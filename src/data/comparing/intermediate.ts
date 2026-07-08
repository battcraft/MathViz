/**
 * Comparing Numbers — Intermediate Level (Class 7)
 *
 * Builds on Beginner concepts with negative numbers, decimals, multi-step comparisons.
 * Covers: Negative number comparison, decimal ordering, fractions comparison,
 * multi-step problems, and number line placement.
 *
 * Content style: Hinglish with mathematical vocabulary, number line focus.
 */

import { LevelTopicContent } from "./types";

export const comparingIntermediate: LevelTopicContent = {
  topicId: "compare",
  topicName: "🔢 Comparing Numbers: Kaun Bada, Kaun Chhota?",
  level: "intermediate",
  classLevel: "Class 7",
  subtopics: [
    // ═══════════════════════════════════════════════════════════════
    // NEGATIVE NUMBERS COMPARISON
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_negatives",
      name: "🎯 Negative Numbers: Zero se Neeche!",
      screens: [
        {
          id: "compare_neg_1",
          title: "🎯 Negative Numbers: Uchalta Number Line!",
          conceptHeading: "Negative Numbers Kaise Compare Karein?",
          explanation:
            "Doston, ab hum ZERO ke neeche jaate hain! NEGATIVE NUMBERS!\n\n📏 **Number Line Rule:** Left = CHHOTA, Right = BADA\n→ -10 < -5 < -3 < 0 < 3 < 5 < 10\n\n📏 **Cold Weather Example:**\n→ -5°C se -15°C — Kaunsa chhota hai? -15°C!\n→ -15°C < -5°C (zyada thandi!)\n\n📏 **Debt/Paise:**\n→ ₹-500 (tumne udhar liya) < ₹-200\n→ Zyada udhar = zyada chhota number!",
          interactiveType: "range_slider",
          pangaHint: "Number line pe negative numbers left mein hain!",
          thinkBox: [
            {
              id: "compare_neg_tb1",
              question: "-3 aur -7 — kaunsa bada hai? Number line socho! 🤔",
              answer:
                "-3 > -7! Kyunki -3 number line pe -7 se RIGHT mein hai. Right = bada!",
              hint: "Number line pe left = chhota, right = bada.",
            },
            {
              id: "compare_neg_tb2",
              question: "Kya -1 < 1 hai? Hamesha true hai?",
              answer:
                "Haan! Hamesha! Negative number hamesha positive se CHHOTA hota hai. -1 < 0 < 1. Zero dono ke beech mein hai!",
              hint: "Zero = dividing line. Negative = neeche!",
            },
            {
              id: "compare_neg_tb3",
              question: "-20 aur -5 — kaunsa THANDA hai?",
              answer:
                "-20 < -5! -20 zyada thanda hai. Negative numbers mein zyada door zero se = zyada chhota = zyada thandi temperature!",
              hint: "Zyada negative = zyada thanda!",
            },
          ],
        },
        {
          id: "compare_neg_2",
          title: "🎯 Positive + Negative: Mixed Comparison",
          conceptHeading: "Jab Positive aur Negative Milte Hain!",
          explanation:
            "📏 **Rule:** POSITIVE hamesha NEGATIVE se BADA hota hai!\n→ 5 > -5 (positive always wins!)\n→ -10 < 10\n\n📏 **But:** Negative numbers mein comparison ULTA hota hai!\n→ -3 > -10 (kyunki -3 number line pe right mein hai!)\n\nTrick: Zero se left jaao = CHHOTA hota jaata hai!",
          interactiveType: "range_slider",
          thinkBox: [
            {
              id: "compare_neg_tb4",
              question: "-100 aur -1 — kaunsa bada hai? 🤔",
              answer:
                "-1 > -100! -1 number line pe -100 se bohot RIGHT mein hai. -1 sirf ek step neeche zero se, lekin -100 bohot neeche hai!",
              hint: "Number line pe -1 kahan hai aur -100 kahan hai?",
            },
            {
              id: "compare_neg_tb5",
              question: "Kya 0 > -5 hai?",
              answer:
                "Haan! 0 > -5! Zero negative se HAMESHA bada hota hai. Zero = no debt, -5 = ₹5 ka debt!",
              hint: "Zero = nothing, negative = less than nothing!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_neg_act1",
          title: "Temperature Comparison Game",
          description: "Alag-alag cities ke temperatures compare karo!",
          materials: ["Paper", "Pencil", "Internet (optional for real data)"],
          steps: [
            "Paper pe 10 cities ke temperatures likho (including negative for winter!).",
            "Har pair mein >, < ya = lagao.",
            "Sabse thandi aur sabse garam city identify karo!",
            "Check: kya -10°C < -5°C hai? Kyun?",
          ],
          outcome:
            "Student negative number comparison real-life se samjhenge!",
        },
        {
          id: "compare_neg_act2",
          title: "Debt & Credit Card Game",
          description: "Credit card game khelo aur negative numbers seekho!",
          materials: ["Paper", "Pencil", "Coins (optional)"],
          steps: [
            "Har player ko ₹1000 diye jate hain (paper money banao).",
            "Cards pe positive (+) aur negative (-) amounts likho.",
            "Card uthao — positive = add, negative = subtract.",
            "Sabse zyada paise wala jeeta!",
          ],
          outcome:
            "Student positive aur negative numbers samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_neg_tt1",
          tip: "Number line BANAO — floor pe chalk se ya paper pe. Negative numbers physically place karo!",
          context: "Introduction mein, jab student ko negative numbers dikhana ho.",
        },
        {
          id: "compare_neg_tt2",
          tip: "Temperature examples use karo — Delhi mein winter mein -2°C, Shimla mein -8°C. Real feel aata hai!",
          context: "Jab student ko negative comparison ka real-world application samjhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_neg_w1",
          question: "-5 ____ -12 mein >, < ya = lagao!",
          options: [">", "<", "=", "Cannot say"],
          correct: 0,
          hint: "-5 number line pe -12 se RIGHT mein hai!",
          part: "A",
          partDescription: "Multiple Choice — Negative Comparison",
        },
        {
          id: "compare_neg_w2",
          question: "Kya 0 > -100 hai?",
          options: ["Haan", "Nahi", "Depends", "Cannot say"],
          correct: 0,
          hint: "Zero negative se HAMESHA bada hota hai!",
          part: "A",
          partDescription: "Multiple Choice — Zero vs Negative",
        },
        {
          id: "compare_neg_w3",
          question: "-25 aur -2.5 — kaunsa bada hai?",
          options: ["-25", "-2.5", "Dono same", "Cannot compare"],
          correct: 1,
          hint: "-2.5 number line pe -25 se RIGHT mein hai!",
          part: "B",
          partDescription: "Short Answer — Decimal Negative",
        },
        {
          id: "compare_neg_w4",
          question: "Shimla: -8°C, Delhi: 5°C, Manali: -12°C. Arrange in ascending order!",
          correct: "-12°C < -8°C < 5°C",
          hint: "Sabse thanda pehle!",
          part: "C",
          partDescription: "Short Answer — Temperature Application",
        },
        {
          id: "compare_neg_w5",
          question: "10 alag-alag negative numbers likho aur number line pe plot karo. Ascending order mein arrange karo!",
          correct: "Student-apna-answer",
          hint: "Number line banao aur points mark karo!",
          part: "D",
          partDescription: "Creative Activity — Number Line Plotting",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // DECIMALS & FRACTIONS COMPARISON
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_decimals_frac",
      name: "🎯 Decimals & Fractions: Dono ka Compare!",
      screens: [
        {
          id: "compare_df_1",
          title: "🎯 Decimal vs Fraction: Kaise Compare Karein?",
          conceptHeading: "Mixed Comparisons",
          explanation:
            "Doston, jab decimal aur fraction ek saath aayein, toh ek FORM mein convert karo!\n\n📏 **Method 1:** Fraction → Decimal\n→ 3/4 = 3 ÷ 4 = 0.75\n→ 2/5 = 2 ÷ 5 = 0.4\n→ 3/4 > 2/5 (0.75 > 0.40)\n\n📏 **Method 2:** Decimal → Fraction\n→ 0.6 = 6/10 = 3/5\n→ 0.25 = 25/100 = 1/4\n\n📏 **Method 3:** Same denominator banao!\n→ 2/3 aur 3/5: LCD = 15\n→ 2/3 = 10/15, 3/5 = 9/15\n→ 10/15 > 9/15, toh 2/3 > 3/5!",
          interactiveType: "decimal_battle",
          pangaHint: "Ek form mein convert karo phir compare karo!",
          thinkBox: [
            {
              id: "compare_df_tb1",
              question: "1/2 aur 0.6 — kaunsa bada hai? 🤔",
              answer:
                "0.6 > 1/2! Kyunki 1/2 = 0.5 hai. Ab 0.6 > 0.5!",
              hint: "1/2 ko decimal mein convert karo!",
            },
            {
              id: "compare_df_tb2",
              question: "3/4 aur 7/10 — fraction mein compare karo!",
              answer:
                "LCD = 20. 3/4 = 15/20, 7/10 = 14/20. 15/20 > 14/20, toh 3/4 > 7/10!",
              hint: "Common denominator banao!",
            },
          ],
        },
        {
          id: "compare_df_2",
          title: "🎯 Multi-Step Comparison Problems",
          conceptHeading: "Ek Se Zyada Steps!",
          explanation:
            "Ab multi-step problems solve karo!\n\n📝 **Example:** A = 2.5, B = 12/5, C = 250%. Compare!\n→ A = 2.5\n→ B = 12/5 = 2.4\n→ C = 250% = 250/100 = 2.5\n→ C = A > B!\n\nMulti-step mein: Sabko EK form mein convert karo, phir compare!",
          interactiveType: "decimal_battle",
          thinkBox: [
            {
              id: "compare_df_tb3",
              question: "A = 3/5, B = 0.55, C = 55%. Sabko decimal mein convert karo!",
              answer:
                "A = 3/5 = 0.6, B = 0.55, C = 55% = 0.55. Toh A > B = C!",
              hint: "Sabko decimal mein convert karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_df_act1",
          title: "Fraction-Decimal Conversion Race",
          description: "Sabse pehle convert karo aur compare karo!",
          materials: ["Paper", "Pencil", "Calculator (optional)"],
          steps: [
            "Teacher 10 pairs dete hain (fraction vs decimal).",
            "Students fraction ko decimal mein convert karein.",
            "Sabse pehle 5 correct conversions karne wala jeeta!",
          ],
          outcome:
            "Student fraction-decimal conversion fast karenge!",
        },
        {
          id: "compare_df_act2",
          title: "Mixed Number Sorting",
          description: "Alag-alag forms mein numbers sort karo!",
          materials: ["Index cards", "Marker"],
          steps: [
            "Cards pe fractions, decimals, percentages likho.",
            "Cards ko shuffle karo.",
            "Sab cards ko ek form mein convert karo.",
            "Ascending/descending order mein arrange karo!",
          ],
          outcome:
            "Student mixed form comparisons easily kar payenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_df_tt1",
          tip: "Conversion table banao: Fraction → Decimal → Percentage. Students ke liye reference ho!",
          context: "Introduction mein, jab student ko mixed comparison dikhana ho.",
        },
        {
          id: "compare_df_tt2",
          tip: "LCD method sikhao — fractions compare karne ka most reliable method hai!",
          context: "Jab student ko fraction comparison sikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_df_w1",
          question: "2/3 aur 0.7 — kaunsa bada hai?",
          options: ["2/3", "0.7", "Dono same", "Cannot compare"],
          correct: 0,
          hint: "2/3 = 0.667... jo 0.7 se chhota hai! Wait — 0.667 < 0.7!",
          part: "A",
          partDescription: "Multiple Choice — Fraction vs Decimal",
        },
        {
          id: "compare_df_w2",
          question: "0.35 aur 7/20 — dono same hain ya different?",
          options: ["Same hain", "Different hain", "Depends", "Cannot say"],
          correct: 0,
          hint: "7/20 = 7 ÷ 20 = 0.35!",
          part: "A",
          partDescription: "Multiple Choice — Equality Check",
        },
        {
          id: "compare_df_w3",
          question: "A = 1/4, B = 0.25, C = 25%. Sabko decimal mein convert karo aur compare karo!",
          correct: "A = B = C = 0.25",
          hint: "Sab 0.25 ke barabar hain!",
          part: "B",
          partDescription: "Short Answer — Multi-form Conversion",
        },
        {
          id: "compare_df_w4",
          question: "3/8, 0.375, 38% ko ascending order mein lagao!",
          correct: "0.375 = 3/8 < 38% (0.38)",
          hint: "Sabko decimal mein convert karo!",
          part: "C",
          partDescription: "Short Answer — Mixed Ordering",
        },
        {
          id: "compare_df_w5",
          question: "Apne daily routine mein 5 fractions/decimals dhundho aur compare karo!",
          correct: "Student-apna-answer",
          hint: "Time (3.5 hours), distance (2.5 km), money (₹12.50)!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // ROUNDING & ESTIMATION
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_rounding_int",
      name: "🎯 Advanced Rounding & Estimation",
      screens: [
        {
          id: "compare_round_int_1",
          title: "🎯 Rounding to Different Place Values",
          conceptHeading: "Kisi Bhi Place Pe Round Karo!",
          explanation:
            "Ab hum SAB place values pe rounding kar sakte hain!\n\n📏 **Nearest 10:** 456 → 460 (6 ≥ 5)\n📏 **Nearest 100:** 456 → 500 (56 ≥ 50)\n📏 **Nearest 1000:** 4567 → 5000 (567 ≥ 500)\n📏 **Nearest 0.1:** 3.47 → 3.5 (7 ≥ 5)\n📏 **Nearest 0.01:** 3.456 → 3.46 (6 ≥ 5)\n\nRule: Rounding digit ke RIGHT mein dekho — 5+ toh UPAR, 4- toh NEECHE!",
          interactiveType: "rounding_match",
          thinkBox: [
            {
              id: "compare_round_int_tb1",
              question: "2,349 ko nearest 100 mein round karo!",
              answer:
                "2,349 ≈ 2,300! Kyunki 49 < 50, toh NEECHE round karte hain!",
              hint: "Tens digit 4 hai — 5 se chhota, toh NEECHE!",
            },
            {
              id: "compare_round_int_tb2",
              question: "Rounding use karo: 4,567 aur 4,589 compare karo!",
              answer:
                "4,567 ≈ 4,600 (nearest 100), 4,589 ≈ 4,600 (nearest 100). Dono same lag rahe hain! Exact: 4,589 > 4,567!",
              hint: "Dono ko nearest 100 mein round karo!",
            },
          ],
        },
        {
          id: "compare_round_int_2",
          title: "🎯 Estimation for Quick Comparisons",
          conceptHeading: "Quick Estimate se Compare!",
          explanation:
            "Jab speed chahiye, ESTIMATION use karo!\n\n📝 **Example:** 3,456 + 2,789 ka approximate sum?\n→ 3,456 ≈ 3,500\n→ 2,789 ≈ 2,800\n→ Sum ≈ 6,300!\n\n📝 **Comparing with estimation:**\n→ 8,923 vs 9,102\n→ 8,923 ≈ 9,000, 9,102 ≈ 9,100\n→ 9,100 > 9,000, toh 9,102 > 8,923!",
          interactiveType: "rounding_match",
          thinkBox: [
            {
              id: "compare_round_int_tb3",
              question: "Estimation use karo: 15,678 aur 16,234 — kaunsa bada hai?",
              answer:
                "15,678 ≈ 16,000, 16,234 ≈ 16,000. Exact: 16,234 > 15,678!",
              hint: "Dono ko nearest 1000 mein round karo!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_round_int_act1",
          title: "Estimation Speed Challenge",
          description: "Speed estimation karo!",
          materials: ["Paper", "Pencil", "Timer"],
          steps: [
            "Teacher 10 number pairs dete hain.",
            "Students 10 seconds mein estimate karein — kaunsa bada hai!",
            "Phir exact answer check karo.",
            "Sabse zyada correct estimates jeeta!",
          ],
          outcome:
            "Student fast estimation seekhenge!",
        },
        {
          id: "compare_round_int_act2",
          title: "Shopping Bill Estimation",
          description: "Shopping bill estimate karo!",
          materials: ["Paper", "Pencil", "Old bills (optional)"],
          steps: [
            "Paper pe 10 items ke prices likho (with decimals).",
            "Sab prices ko nearest ₹10 mein round karo.",
            "Rounded prices ka approximate total nikalo!",
            "Exact total se compare karo — kitna close tha!",
          ],
          outcome:
            "Student real-life estimation seekhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_round_int_tt1",
          tip: "Rounding ke baad ALWAYS exact comparison bhi karao — estimation sirf quick check hai!",
          context: "Jab student ko estimation trick dikhana ho.",
        },
        {
          id: "compare_round_int_tt2",
          tip: "Shopping bills se estimation sikhao — real-life application hai!",
          context: "Jab student ko practical estimation dikhana ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_round_int_w1",
          question: "7,845 ko nearest 100 mein round karo!",
          options: ["7,800", "7,850", "7,900", "7,840"],
          correct: 0,
          hint: "Tens digit 4 hai — 5 se chhota, toh NEECHE!",
          part: "A",
          partDescription: "Multiple Choice — Rounding",
        },
        {
          id: "compare_round_int_w2",
          question: "Estimation use karo: 23,456 aur 23,567 — kaunsa bada hai?",
          options: ["23,456", "23,567", "Dono same", "Cannot say"],
          correct: 1,
          hint: "Dono nearest 1000 mein ≈ 23,000. Exact: 23,567 > 23,456!",
          part: "A",
          partDescription: "Multiple Choice — Estimation",
        },
        {
          id: "compare_round_int_w3",
          question: "Rounding trick use karo: 45.67 aur 45.76 compare karo!",
          correct: "45.76 > 45.67",
          hint: "Nearest 0.1 mein round karo!",
          part: "B",
          partDescription: "Short Answer — Decimal Rounding",
        },
        {
          id: "compare_round_int_w4",
          question: "Apni class ke marks estimate karo — average marks kya hoga?",
          correct: "Student-apna-answer",
          hint: "Marks round karo aur average nikalo!",
          part: "C",
          partDescription: "Short Answer — Estimation Application",
        },
        {
          id: "compare_round_int_w5",
          question: "10 items ki shopping list banao, prices estimate karo, aur total compare karo!",
          correct: "Student-apna-answer",
          hint: "Items likho, prices round karo, approximate total nikalo!",
          part: "D",
          partDescription: "Creative Activity — Shopping Estimation",
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // PLACE VALUE & MULTI-STEP ORDERING
    // ═══════════════════════════════════════════════════════════════
    {
      id: "compare_pv_ordering",
      name: "🎯 Advanced Ordering & Place Value",
      screens: [
        {
          id: "compare_pv_ord_1",
          title: "🎯 Large Numbers: Lakhs & Crores!",
          conceptHeading: "Indian Number System mein Comparing!",
          explanation:
            "Doston, Indian system mein numbers bade hote hain!\n\n📏 **Place Values:**\n→ Ones, Tens, Hundreds\n→ Thousands (1,000)\n→ Lakhs (1,00,000)\n→ Crores (1,00,00,000)\n\n📏 **Comparing Large Numbers:**\n→ 5,43,210 aur 5,42,310: 5=5, 4=4, 3 > 2. Toh 5,43,210 > 5,42,310!\n→ 23,45,678 aur 2,34,56,789: 23 lakh vs 2 crore 34 lakh. 2,34,56,789 > 23,45,678!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_pv_ord_tb1",
              question: "1,23,456 aur 1,24,356 — kaunsa bada hai? Place value se compare karo!",
              answer:
                "1,24,356 > 1,23,456! Lakhs same hai (1), thousands same hai (2), hundreds: 4 > 3!",
              hint: "Left se compare karo — sabse pehla different digit dhundho!",
            },
            {
              id: "compare_pv_ord_tb2",
              question: "50,00,000 (50 lakh) aur 49,99,999 — kaunsa bada hai?",
              answer:
                "50,00,000 > 49,99,999! 50 lakh > 49 lakh 99 thousand! Zyada digits ya zyada place value!",
              hint: "50 lakh = 5,000,000. 49,99,999 = 4,999,999!",
            },
          ],
        },
        {
          id: "compare_pv_ord_2",
          title: "🎯 Multi-Step Ordering Challenges",
          conceptHeading: "Complex Ordering Problems!",
          explanation:
            "Ab multi-step ordering karo!\n\n📝 **Example:** Neeche diye gaye numbers ko ascending order mein lagao:\n45.6, 45.06, 4.56, 456\n\n→ Step 1: Whole number dekho — 4 < 45 < 456\n→ Step 2: 45.6 aur 45.06 mein: 6 > 0, toh 45.6 > 45.06\n→ Answer: 4.56 < 45.06 < 45.6 < 456!",
          interactiveType: "none",
          thinkBox: [
            {
              id: "compare_pv_ord_tb3",
              question: "0.9, 0.09, 0.99, 0.009 ko descending order mein lagao!",
              answer:
                "0.99 > 0.9 > 0.09 > 0.009! Decimals mein bhi left se compare karo!",
              hint: "Sabko same decimal places mein likho — 0.900, 0.090, 0.990, 0.009!",
            },
          ],
        },
      ],
      activities: [
        {
          id: "compare_pv_ord_act1",
          title: "Number Line Race",
          description: "Large numbers ko number line pe plot karo!",
          materials: ["Paper", "Ruler", "Pencil"],
          steps: [
            "Paper pe 0-10,00,000 ki number line banao (approximate).",
            "5 large numbers likho.",
            "Number line pe approximate positions mark karo.",
            "Ascending order mein arrange karo!",
          ],
          outcome:
            "Student large numbers visualize kar payenge!",
        },
        {
          id: "compare_pv_ord_act2",
          title: "Indian vs International System",
          description: "Dono number systems mein numbers likho aur compare karo!",
          materials: ["Paper", "Pencil"],
          steps: [
            "5 numbers Indian system mein likho (lakhs, crores).",
            "Same numbers International system mein likho (millions).",
            "Compare karo — dono mein same hain!",
            "Kya fark hai? commas ki position!",
          ],
          outcome:
            "Student dono number systems samjhenge!",
        },
      ],
      teacherTips: [
        {
          id: "compare_pv_ord_tt1",
          tip: "Indian number system chart banao — Ones, Tens, Hundreds, Thousands, Lakhs, Crores. Visual aid bahut helpful hai!",
          context: "Introduction mein, jab student ko Indian system dikhana ho.",
        },
        {
          id: "compare_pv_ord_tt2",
          tip: "Large numbers ke liye DIGIT COUNTING sabse fast method hai — pehle digits count karo, phir left se compare karo!",
          context: "Jab student ko fast comparison trick sikhani ho.",
        },
      ],
      worksheet: [
        {
          id: "compare_pv_ord_w1",
          question: "34,56,789 aur 3,45,67,890 — kaunsa bada hai?",
          options: ["34,56,789", "3,45,67,890", "Dono same", "Cannot compare"],
          correct: 1,
          hint: "34 lakh vs 3 crore 45 lakh. Crore > Lakh!",
          part: "A",
          partDescription: "Multiple Choice — Large Number Comparison",
        },
        {
          id: "compare_pv_ord_w2",
          question: "0.5, 0.05, 0.55, 0.005 ko ascending order mein lagao!",
          options: ["0.005, 0.05, 0.5, 0.55", "0.55, 0.5, 0.05, 0.005", "0.05, 0.005, 0.5, 0.55", "0.005, 0.5, 0.05, 0.55"],
          correct: 0,
          hint: "Sabko same decimal places mein likho!",
          part: "A",
          partDescription: "Multiple Choice — Decimal Ordering",
        },
        {
          id: "compare_pv_ord_w3",
          question: "56,78,901 ko Indian aur International dono system mein likho!",
          correct: "Indian: 56,78,901 (56 lakh 78 thousand 901). International: 5,678,901 (5 million 678 thousand 901).",
          hint: "Commas ki position alag hai!",
          part: "B",
          partDescription: "Short Answer — Number Systems",
        },
        {
          id: "compare_pv_ord_w4",
          question: "2.34, 2.43, 2.334, 2.344 ko descending order mein lagao!",
          correct: "2.43 > 2.344 > 2.34 > 2.334",
          hint: "Left se compare karo!",
          part: "C",
          partDescription: "Short Answer — Multi-step Ordering",
        },
        {
          id: "compare_pv_ord_w5",
          question: "Apne state ke 5 cities ke populations compare karo (Indian system mein)!",
          correct: "Student-apna-answer",
          hint: "Internet se populations dhundho aur compare karo!",
          part: "D",
          partDescription: "Creative Activity — Real-world Connection",
        },
      ],
    },
  ],
};
