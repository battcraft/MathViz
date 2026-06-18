import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe Lazy Initializer for Gemini Client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY is not configured yet. Falling back to rule-based Hinglish solver.");
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // 1. API: Homework solver and Math chat proxy
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required." });
      }

      const client = getGeminiClient();
      if (!client) {
        // Safe Rule-based fallback if API is not fully set up
        return res.json({
          reply: "Doston, mere server ki API key aana baki hai! Par yaad rakho, 'Maths is all about patterns!' Practice tab kholo aur tab tak solid XP kamao!"
        });
      }

      // Call Gemini 3.5 Flash for rapid text responses as per skill guide
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: 
            "You are MathsGuru Bhaiya, a street-smart math tutor from Delhi. " +
            "Explain concepts to students of Classes 6-8 (Ages 11-14) using highly engaging, " +
            "street-pop Hinglish (blend of Hindi + English) with cultural street examples (Cricket, IPL, Samosa, Lassi stalls). " +
            "Be friendly, funny, and encouraging. Never be cold or dry. " +
            "Keep answers under 4-5 quick sentences. Always use simple step-by-step pointers.",
          temperature: 0.8,
        },
      });

      const reply = response.text || "Paji, dimaag mein thoda loading chal raha hai! Dobara pooch ke dekho!";
      return res.json({ reply });
    } catch (error) {
      console.error("Gemini API server proxy error: ", error);
      return res.status(500).json({
        reply: "Arre re re! Bhaiya ka computer thoda confuse ho gaya. Dobara click karo aur lassi pikar poochiye!"
      });
    }
  });

  // 1.1 Procedural Math Fallback Quiz generator
  function generateProceduralFallbackQuiz(topicId: string, subtopicId: string, difficulty: string, subName: string): any[] {
    const questions: any[] = [];
    const levelText = difficulty === "beginner" ? "Class 6" : difficulty === "intermediate" ? "Class 7" : "Class 8";
    
    for (let i = 1; i <= 20; i++) {
      let activeSubId = subtopicId;
      if (subtopicId.includes("panga")) {
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
      
      if (topicId === "geom") {
        const val = i * 3;
        
        if (activeSubId.includes("bindu")) {
          question = `[${levelText}] Ek single Bindu (Point) coordinate plane par banani hai (label: M). Kisi point ki kitni dimensions (bhaag) hoti hain, pyare doston?`;
          options = ["0 dimensions (Zero size!)", "1 dimension", "2 dimensions", "3 dimensions"];
          correct = 0;
          hint = "Point sirf position dikhata hai, iska koi size ya dimension nahi hota.";
        } else if (activeSubId.includes("kiran")) {
          question = `[${levelText}] Maths Dost kehta hai ki laser beam ek starting point se nikalkar anant (infinite) tak sidhi aage badhti jati hai. Is laser ray को क्या कहेंगे?`;
          options = ["Khand (Line Segment)", "Kiran (Ray) - 1 origin to infinity!", "Rekha (Infinite Line)", "Bindu (Point)"];
          correct = 1;
          hint = "Ek side blocked, doosri side infinite... yaani dhoop ki Kiran ya laser beam!";
        } else if (activeSubId.includes("rekha")) {
          question = `[${levelText}] Chandni Chowk road map par, ek sidhi Rekha (Line) ko extend kiya jata hai. Is endless line ke kitne endpoints hote hain?`;
          options = ["Zero endpoints (Endlessly runs!)", "Exactly 1 endpoint", "Exactly 2 endpoints", "Varies"];
          correct = 0;
          hint = "Rekha ka koi finite end nahi hota, dono taraf arrow heads hote hain!";
        } else if (activeSubId.includes("khand")) {
          question = `[${levelText}] Chawri Bazar road maps mein, agar PQ ki lambai ${val}cm hai, PQ line segment (Khand) ko draw karne ke liye kitne endpoints hote hain?`;
          options = ["Zero endpoints", "Exactly Ek (1) endpoint", "Do (2) endpoints - P aur Q!", "Infinite endpoints"];
          correct = 2;
          hint = "Segment (Khand) hamesha do fixed points ke beech chalta hai, isliye coordinates fixed hote hain!";
        } else {
          // shikhar
          question = `[${levelText}] Ek samosa ya triangular cricket boundary grid in Delhi mein kitne Shikhar / Corner vertices hote hain?`;
          options = ["Ek Corner", "Do Corners", "Teen corners (3 Vertices) - Jahan segments cross karein!", "Chaar Corners"];
          correct = 2;
          hint = "Triangle has three vertices/corners where straight segments meet!";
        }
      } else if (topicId === "maxmin") {
        if (activeSubId.includes("max")) {
          const v1 = i * 12 + 10;
          const v2 = i * 5 + 40;
          const v3 = i * 15 + 120;
          const expectedMax = Math.max(v1, v2, v3);
          question = `[${levelText}] Delhi Cricket Academy scouts logged these bowling scores: [${v1}, ${v2}, ${v3}]. What is the peak Maximum score?`;
          options = [`${v1}`, `${v2}`, `${expectedMax} runs (The peak value!)`, `${v3}`];
          correct = 2;
          hint = "Maximum score is the highest digit in the comparison collection!";
        } else if (activeSubId.includes("min")) {
          const valA = -(i * 2);
          const valB = -(i * 3 + 4);
          const valC = 0;
          const expectedMin = valB;
          question = `[${levelText}] Metro cargo tracks cooling temperatures in Okhla: [${valC}°C, ${valA}°C, ${valB}°C]. Identify the absolute Minimum floor.`;
          options = [`${valC}°C`, `${valA}°C`, `${expectedMin}°C (Furthest left from zero on the debt line!)`, `${valA - 5}°C`];
          correct = 2;
          hint = "On the negative scale, the quantity with the larger absolute digit represents the lowest value.";
        } else {
          // range / fasla
          const maxVal = i * 15 + 110;
          const minVal = i * 3 + 20;
          const rangeVal = maxVal - minVal;
          question = `[${levelText}] A merchant sells winter shawls from a minimum of Rs ${minVal} to a maximum of Rs ${maxVal}. Calculate the Range (Fasla) of these figures.`;
          options = [`Rs ${rangeVal} (Max minus Min!)`, `Rs ${maxVal}`, `Rs ${minVal}`, `Rs ${maxVal + minVal}`];
          correct = 0;
          hint = "Formula for Fasla is simple: Subtract the absolute Minimum from the absolute Maximum value!";
        }
      } else {
        // compare topic
        if (activeSubId.includes("basics")) {
          const val1 = -(i * 4);
          const val2 = -(i * 2 + 1);
          const larger = val2;
          question = `[${levelText}] Lizard vs Crocodile math rule! Alligator compares integer balances: ${val1} and ${val2}. Choose the larger value.`;
          options = [`${val1}`, `${larger} (Since smaller negative debt lies closer to zero!)`, "Both values are equivalent", "Zero is smaller than both"];
          correct = 1;
          hint = "Check which negative number lies further to the right on a horizontal axis.";
        } else if (activeSubId.includes("decimals")) {
          const dec1 = (1.2 + i * 0.05).toFixed(2);
          const dec2 = (1.02 + i * 0.05).toFixed(2);
          question = `[${levelText}] Weight scales at Daryaganj display Packet A: ${dec1}kg and Packet B: ${dec2}kg. Match the correct comparator.`;
          options = [
            `${dec1} is greater than ${dec2} (Tenths place digit comparison)`,
            `${dec1} is smaller than ${dec2}`,
            "They measure perfectly equal",
            "Both are lighter than 1.0kg"
          ];
          correct = 0;
          hint = "Compare digit by digit starting with units, then the tenths place decimal value.";
        } else if (activeSubId.includes("rounding")) {
          const roundInput = (49.3 + i * 0.25).toFixed(2);
          const expectedVal = Math.round(parseFloat(roundInput));
          question = `[${levelText}] Your groceries billing is Rs ${roundInput}. Correctly round this value to the nearest whole rupee integer.`;
          options = [
            `Rs ${expectedVal} (Calculated nearest round index!)`,
            `Rs ${Math.floor(parseFloat(roundInput))}`,
            `Rs ${Math.ceil(parseFloat(roundInput)) + 2}`,
            "Rs 0"
          ];
          correct = 0;
          hint = "If paise coins value is .50 paise or more, round UP to next rupee. Otherwise round DOWN.";
        } else if (activeSubId.includes("place")) {
          const original = 72400 + i * 110;
          const hundredsDigit = Math.floor((original % 1000) / 105); // dynamic extraction
          question = `[${levelText}] For street ledger coordinate value ${original}, what is the place value of the digit in the Hundreds (Sada) column?`;
          options = [
            `Exactly ${hundredsDigit * 100} units`,
            "Only 1 unit",
            "8,000 units",
            "Zero units"
          ];
          correct = 0;
          hint = "Extract the third column from the right (Hundreds place) and multiply it by 100.";
        } else {
          // compare_order
          const val1 = i + 12;
          const val2 = -i;
          const val3 = -(i * 3);
          const seq = `${val3}, ${val2}, 0, ${val1}`;
          question = `[${levelText}] Sort these integers in logical ascending kram (least value to peak value): [${val1}, 0, ${val2}, ${val3}].`;
          options = [
            `[${val1}, 0, ${val2}, ${val3}]`,
            `[${seq}] (Correctly sorted from deepest sub-zero debt up to positive!)`,
            `[0, ${val2}, ${val3}, ${val1}]`,
            `[${val1}, ${val3}, ${val2}, 0]`
          ];
          correct = 1;
          hint = "The greatest negative value has the lowest absolute magnitude. Stack it first!";
        }
      }
      
      questions.push({
        id: `fallback_q_${topicId}_${subtopicId}_${difficulty}_${i}`,
        question,
        options,
        correct,
        hint
      });
    }
    
    return questions;
  }

  // 1.2 Procedural Fallback Story generator
  function generateProceduralFallbackStory(topicId: string, subtopicId: string, topName: string, subName: string): any[] {
    const slides: any[] = [];
    const delhiPlaces = ["Chandni Chowk", "CP Inner Circle", "Lajpat Nagar Market", "Chawri Bazar", "Feroz Shah Kotla", "Karol Bagh", "Delhi Metro Train", "Palika Bazaar", "India Gate", "Lodi Gardens", "Delhi Haat", "Sarojini Nagar"];
    const characters = ["Lassi Wale Bhaiya", "Kite Flyer Chacha", "Samosa Master", "Metro Card Guard", "Metro Passenger", "Dhabe Ke Owner", "Baloon Seller", "Cricket Coach", "Toy Shopkeeper", "Haldiram Cashier"];
    
    for (let i = 1; i <= 20; i++) {
      const place = delhiPlaces[i % delhiPlaces.length];
      const char = characters[i % characters.length];
      let emoji = "🛺";
      let title = `${char} in ${place}`;
      let narration = "";
      let choices: any[] = [];
      
      if (topicId === "geom") {
        const subIndex = i % 5;
        if (subIndex === 0) {
          emoji = "📍";
          title = `${char}'s Point Hunt at ${place} (#${i})`;
          narration = `You are navigating near ${place}. ${char} marks a spot on the guide with a single sharp point. 'Bhaiya, how many physical dimensions does a mathematical Bindu (Point) have?'`;
          choices = [
            { text: "0 Dimensions (Only exact position, no size!)", correct: true, rewardXp: 15 },
            { text: "1 Dimension (Flat line)", correct: false, rewardXp: 0 },
            { text: "2 Dimensions (Flat Area)", correct: false, rewardXp: 0 }
          ];
        } else if (subIndex === 1) {
          emoji = "🛣️";
          title = `${char}'s Infinite Rekha at ${place} (#${i})`;
          narration = `While tracking straight lanes in ${place}, ${char} asks you: 'A straight infinite line (Rekha) stretches endlessly on both sides. Tell me, how many endpoints does it have?'`;
          choices = [
            { text: "0 endpoints (It goes endlessly!)", correct: true, rewardXp: 15 },
            { text: "Exactly 1 endpoint", correct: false, rewardXp: 0 },
            { text: "Exactly 2 endpoints", correct: false, rewardXp: 0 }
          ];
        } else if (subIndex === 2) {
          emoji = "📏";
          title = `${char}'s Segment Cut at ${place} (#${i})`;
          narration = `To wrap cardboard packages in ${place}, ${char} cuts a finite rope of exactly ${i + 5} cm. He asks: 'A Line Segment (Khand) is bounded by how many fixed endpoints?'`;
          choices = [
            { text: "Exactly 2 fixed endpoints!", correct: true, rewardXp: 15 },
            { text: "Exactly 1 endpoint", correct: false, rewardXp: 0 },
            { text: "Zero endpoints", correct: false, rewardXp: 0 }
          ];
        } else if (subIndex === 3) {
          emoji = "🔦";
          title = `${char}'s Laser Ray Beam at ${place} (#${i})`;
          narration = `At a festive light show in ${place}, ${char} points a laser light. The beam starts at one single lens origin and shoots straight into infinity. What is this structural ray named?`;
          choices = [
            { text: "A Ray (Kiran) - 1 starting point, flying infinitely!", correct: true, rewardXp: 15 },
            { text: "A Line segment with 2 endpoints", correct: false, rewardXp: 0 },
            { text: "An infinite line with 0 endpoints", correct: false, rewardXp: 0 }
          ];
        } else {
          emoji = "📐";
          title = `${char}'s Samosa Vertex at ${place} (#${i})`;
          narration = `Sharing a snack near ${place}, ${char} asks you: 'What is the pointy intersection corner apex of this triangular samosa called in our geometry shastra?'`;
          choices = [
            { text: "A Shikhar (Vertex) - the meeting point!", correct: true, rewardXp: 15 },
            { text: "An infinite parallel ray", correct: false, rewardXp: 0 },
            { text: "A point of 3 dimensions", correct: false, rewardXp: 0 }
          ];
        }
      } else if (topicId === "maxmin") {
        const subIndex = i % 3;
        const valA = 10 + i;
        const valB = 40 + i * 2;
        const valC = 5 + i * 3;
        const arr = [valA, valB, valC].sort((x, y) => x - y);
        const min = arr[0];
        const max = arr[2];
        const range = max - min;

        if (subIndex === 0) {
          emoji = "📈";
          title = `${char}'s Max Peak at ${place} (#${i})`;
          narration = `Collecting transaction ledgers in ${place}: [Rs. ${valA}, Rs. ${valB}, Rs. ${valC}]. ${char} asks: 'Which collection entry represents our peak Maximum sales number?'`;
          choices = [
            { text: `Rs. ${max} (The absolute highest value!)`, correct: true, rewardXp: 15 },
            { text: `Rs. ${min}`, correct: false, rewardXp: 0 },
            { text: `Rs. ${valA}`, correct: false, rewardXp: 0 }
          ];
        } else if (subIndex === 1) {
          emoji = "📉";
          title = `${char}'s Min Scale at ${place} (#${i})`;
          narration = `Monitoring temperature logs for stock freezers at ${place}: [-10°C, -2°C, -${valA}°C]. ${char} asks: 'What is our absolute coldest Minimum value in this dataset?'`;
          choices = [
            { text: `-${valA}°C (Furthest left on the number line!)`, correct: true, rewardXp: 15 },
            { text: "-10°C", correct: false, rewardXp: 0 },
            { text: "-2°C", correct: false, rewardXp: 0 }
          ];
        } else {
          emoji = "📏";
          title = `${char}'s Price Range at ${place} (#${i})`;
          narration = `Local market rates in ${place} range from a minimum Rs. ${min} up to a peak maximum Rs. ${max}. ${char} asks: 'Calculate the mathematical Range (Fasla) of these weights!'`;
          choices = [
            { text: `Rs. ${range} (Peak Max Rs. ${max} - Floor Min Rs. ${min}!)`, correct: true, rewardXp: 15 },
            { text: `Rs. ${max}`, correct: false, rewardXp: 0 },
            { text: `Rs. ${min}`, correct: false, rewardXp: 0 }
          ];
        }
      } else {
        const subIndex = i % 4;
        if (subIndex === 0) {
          emoji = "🐊";
          title = `${char}'s Integer Gator at ${place} (#${i})`;
          const negVal1 = -(i * 2 + 5);
          const negVal2 = -(i * 2 + 15);
          narration = `At a stall in ${place}, a crocodile math game lists: ${negVal1} coins vs ${negVal2} coins. Which value is mathematically larger (meaning less debt)?`;
          choices = [
            { text: `${negVal1} coins is larger!`, correct: true, rewardXp: 15 },
            { text: `${negVal2} coins is larger`, correct: false, rewardXp: 0 },
            { text: "Both are equal values", correct: false, rewardXp: 0 }
          ];
        } else if (subIndex === 1) {
          emoji = "🍹";
          title = `${char}'s Decimals Compare at ${place} (#${i})`;
          const decA = (12.4 + i * 0.05).toFixed(2);
          const decB = (12.04 + i * 0.05).toFixed(2);
          narration = `A scale gauge at ${place} logs Lot A: ${decA} and Lot B: ${decB}. ${char} asks you: 'Which decimal coordinate represents the larger weight?'`;
          choices = [
            { text: `${decA} is greater than ${decB} (tenths 4 > 0!)`, correct: true, rewardXp: 15 },
            { text: `${decB} is greater than ${decA}`, correct: false, rewardXp: 0 },
            { text: "They are equivalent decimals", correct: false, rewardXp: 0 }
          ];
        } else if (subIndex === 2) {
          emoji = "👛";
          title = `${char}'s Bill Rounding at ${place} (#${i})`;
          const rawBill = (299.75 + i * 0.05).toFixed(2);
          const wholeRupee = Math.round(parseFloat(rawBill));
          narration = `At a grocery billing desk of ${place}, the register prints Rs. ${rawBill}. ${char} says: 'Round the bill off to the nearest whole rupee integer!'`;
          choices = [
            { text: `Rs. ${wholeRupee} (Round up because decimal paise >= .50!)`, correct: true, rewardXp: 15 },
            { text: `Rs. ${Math.floor(parseFloat(rawBill))}`, correct: false, rewardXp: 0 },
            { text: `Rs. ${wholeRupee - 5}`, correct: false, rewardXp: 0 }
          ];
        } else {
          emoji = "🔐";
          title = `${char}'s Place Value Code at ${place} (#${i})`;
          const codeVal = 84100 + i * 720;
          const thouValue = Math.floor((codeVal % 10000) / 1000);
          narration = `Unlocking a lock box at ${place} with digit ID ${codeVal}, ${char} asks you: 'Extract the place value of the digit sitting in the Thousands (Hazaar) column!'`;
          choices = [
            { text: `Exactly ${thouValue * 1000} units (position coordinate!)`, correct: true, rewardXp: 15 },
            { text: `${thouValue * 100} units`, correct: false, rewardXp: 0 },
            { text: "Exactly 80,000 units", correct: false, rewardXp: 0 }
          ];
        }
      }
      
      slides.push({
        id: `fallback_story_slide_${topicId}_${subtopicId}_${i}`,
        emoji,
        title,
        narration,
        choices
      });
    }
    
    return slides;
  }

  // 1.3 POST Route to Generate 20 Difficulty-based quiz questions
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { topicId, subtopicId, difficulty, topicName, subtopicName } = req.body;
      if (!topicId || !subtopicId || !difficulty) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const client = getGeminiClient();
      if (!client) {
        console.log("No Gemini API key available. Generating fallback procedurally...");
        const fallbackQuestions = generateProceduralFallbackQuiz(topicId, subtopicId, difficulty, subtopicName || subtopicId);
        return res.json({ id: `${topicId}_${subtopicId}_${difficulty}`, topicId, subtopicId, difficulty, questions: fallbackQuestions });
      }

      const prompt = `Create exactly 20 creative, engaging curriculum math multiple choice questions suited for syllabus level: ${difficulty} (Grade ${difficulty === "beginner" ? "6" : difficulty === "intermediate" ? "7" : "8"} level).
      Topic: ${topicName || topicId}. Subtopic: ${subtopicName || subtopicId}.
      All questions, options and hints MUST be written in a friendly, humorous, local Delhi Hinglish (Hindi/English blend) street-smart persona: MathsGuru Bhaiya. Use cultural references (metro rides, samosas, IPL cricket, Feroz Shah Kotla, Lajpat Nagar shops).
      
      You MUST respond with a valid JSON array of exactly 20 objects matching this precise TypeScript/JSON structure:
      [
        {
          "id": "string",
          "question": "string (Hinglish question text)",
          "options": ["string", "string", "string", "string"],
          "correct": 0, (index from 0 to 3 of correct answer)
          "hint": "string (funny helpful hint in Hinglish)"
        }
      ]`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are MathsGuru Bhaiya, a math teacher who produces flawless JSON pools of curriculum math multiple choice questions. Never use Markdown tickmarks inside responses.",
          temperature: 0.82,
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      if (Array.isArray(parsed) && parsed.length >= 3) {
        let finalQuestions = parsed;
        if (finalQuestions.length < 20) {
          const fallback = generateProceduralFallbackQuiz(topicId, subtopicId, difficulty, subtopicName || subtopicId);
          while (finalQuestions.length < 20) {
            finalQuestions.push(fallback[finalQuestions.length % fallback.length]);
          }
        } else if (finalQuestions.length > 20) {
          finalQuestions = finalQuestions.slice(0, 20);
        }
        return res.json({ id: `${topicId}_${subtopicId}_${difficulty}`, topicId, subtopicId, difficulty, questions: finalQuestions });
      } else {
        throw new Error("Invalid response format from Gemini");
      }
    } catch (e) {
      console.error("Gemini failed producing quiz, falling back: ", e);
      const { topicId, subtopicId, difficulty, subtopicName } = req.body;
      const fallbackQuestions = generateProceduralFallbackQuiz(topicId || "geom", subtopicId || "geom_bindu", difficulty || "beginner", subtopicName || "Math");
      return res.json({ id: `${topicId}_${subtopicId}_${difficulty}`, topicId, subtopicId, difficulty, questions: fallbackQuestions });
    }
  });

  // 1.4 POST Route to Generate 20 Delhi Math Story adventures
  app.post("/api/generate-story", async (req, res) => {
    try {
      const { topicId, subtopicId, topicName, subtopicName } = req.body;
      if (!topicId || !subtopicId) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const client = getGeminiClient();
      if (!client) {
        console.log("No Gemini API key available. Generating fallback story procedurally...");
        const fallbackSlides = generateProceduralFallbackStory(topicId, subtopicId, topicName || topicId, subtopicName || subtopicId);
        return res.json({ id: `${topicId}_${subtopicId}`, topicId, subtopicId, slides: fallbackSlides });
      }

      const prompt = `Write an immersive, extremely funny, sequential 20-scenario Delhi street math story adventure for Topic: ${topicName || topicId}, Subtopic: ${subtopicName || subtopicId}.
      The adventure must trace the student walking through places like Chandni Chowk, Lajpat Nagar, Connaught Place, and meeting diverse locals (Kite flyers, metro kiosk guards, chaat walas, cricket youngsters).
      Create EXACTLY 20 sequential scenario slides (from slider #1 to slider #20) where each slide has a quick math challenge.
      
      You MUST respond with a valid JSON array of exactly 20 objects matching this precise structure:
      [
        {
          "id": "string",
          "emoji": "string (single relevant emoji, e.g. 🍢, 🛺)",
          "title": "string (vibrant Hinglish title)",
          "narration": "string (Atmospheric Delhi street narration in Hinglish asking the student for a small math calculation/decision)",
          "choices": [
            { "text": "string (option A)", "correct": false, "rewardXp": 0 },
            { "text": "string (option B)", "correct": true, "rewardXp": 15 },
            ... (2 to 4 choices, exactly ONE must have correct: true and rewardXp: 15)
          ]
        }
      ]`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are MathsGuru Bhaiya, a master storyteller who produces flawless JSON pools of curriculum math adventure stories in Hinglish. Never use Markdown syntax.",
          temperature: 0.85,
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      if (Array.isArray(parsed) && parsed.length >= 3) {
        let finalSlides = parsed;
        if (finalSlides.length < 20) {
          const fallback = generateProceduralFallbackStory(topicId, subtopicId, topicName || topicId, subtopicName || subtopicId);
          while (finalSlides.length < 20) {
            finalSlides.push(fallback[finalSlides.length % fallback.length]);
          }
        } else if (finalSlides.length > 20) {
          finalSlides = finalSlides.slice(0, 20);
        }
        return res.json({ id: `${topicId}_${subtopicId}`, topicId, subtopicId, slides: finalSlides });
      } else {
        throw new Error("Invalid response format from Gemini");
      }
    } catch (e) {
      console.error("Gemini failed producing story, falling back: ", e);
      const { topicId, subtopicId, topicName, subtopicName } = req.body;
      const fallbackSlides = generateProceduralFallbackStory(topicId || "geom", subtopicId || "geom_bindu", topicName || "Geometry", subtopicName || "Math");
      return res.json({ id: `${topicId}_${subtopicId}`, topicId, subtopicId, slides: fallbackSlides });
    }
  });

  // 2. Vite Asset Bundler Middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite live compiler...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
