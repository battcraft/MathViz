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
      let question = "";
      let options: string[] = [];
      let correct = 0;
      let hint = "";
      
      if (topicId === "geom") {
        const val = i * 3;
        question = `[${levelText}] Chawri Bazar road maps mein, agar hum point P aur point Q ko connect karein toh ek solid Khand (segment) banta hai. Agar PQ ki lambai ${val}cm hai, toh usey kitne endpoints hain?`;
        options = ["Zero endpoints", "Exactly Ek (1) endpoint", "Do (2) endpoints - P aur Q!", "Infinite endpoints"];
        correct = 2;
        hint = "Segment (Khand) hamesha do fixed points ke beech chalta hai, isliye options check karo!";
        
        if (i % 3 === 1) {
          question = `[${levelText}] Ek single Bindu (Point) coordinate plane par banani hai (label: M). Kisi point ki kitni dimensions (bhaag) hoti hain, pyare?`;
          options = ["0 dimensions (Zero size!)", "1 dimension", "2 dimensions", "3 dimensions"];
          correct = 0;
          hint = "Point sirf position dikhata hai, iska koi size ya dimension nahi hota.";
        } else if (i % 3 === 2) {
          question = `[${levelText}] MathsGuru Bhaiya kehta hai ki laser beam ek starting point se nikalkar anant (infinite) tak sidhi aage badhti jati hai. Is laser ray ko kya kahenge?`;
          options = ["Khand (Line Segment)", "Kiran (Ray)", "Rekha (Infinite Line)", "Bindu (Point)"];
          correct = 1;
          hint = "Ek side blocked, doosri side infinite... yaani dhoop ki Kiran ya laser beam!";
        }
      } else if (topicId === "maxmin") {
        const num1 = 10 + i;
        const num2 = 40 + i * 2;
        const num3 = 5 + i;
        const arr = [num1, num2, num3].sort((a,b) => a-b);
        const min = arr[0];
        const max = arr[2];
        const range = max - min;
        
        question = `[${levelText}] Chandni Chowk ke teen dhabon par samosa rates hain: Rs ${min}, Rs ${max}, aur Rs ${num2}. In rates ka accurate Range (Fasla) nikalein!`;
        options = [`Rs ${range} (Maximum - Minimum)`, `Rs ${max}`, `Rs ${min}`, `Rs ${max + min}`];
        correct = 0;
        hint = `Formula yaad rakho: Range (Fasla) = Maximum values (${max}) minus Minimum value (${min}).`;
        
        if (i % 2 === 1) {
          question = `[${levelText}] Rohan ne IPL match statistics dekhe: [${min}, ${num2}, ${max}, ${max + 10}]. Is score list ka sabse uncha (Maximum) score dhoondhein!`;
          options = [`${min}`, `${max}`, `${max + 10}`, `${num2}`];
          correct = 2;
          hint = "Maximum yaani collection ki sabse unchi limit!";
        }
      } else {
        const baseNum = 35 + i * 0.4;
        const roundedUp = Math.round(baseNum);
        const dec1 = (baseNum).toFixed(2);
        const dec2 = (baseNum - 0.1).toFixed(2);
        
        question = `[${levelText}] Crocodile mouth rule lagao! ${dec1} aur ${dec2} mein se alligator kis number ko choose karega khane ke liye?`;
        options = [`${dec1}`, `${dec2}`, "Dono barabar hain", "Kisi ko nahi khayega"];
        correct = 0;
        hint = "Decimals mein tenths aur hundredths place compare karein, bada number gator ka favorite hai!";
        
        if (i % 2 === 1) {
          const roundInput = (35.4 + i * 0.15).toFixed(2);
          const expectedVal = Math.round(parseFloat(roundInput));
          question = `[${levelText}] Humare pass bills value Rs ${roundInput} hai. Isko nearest whole Rupee (rupaya) mein round off karein!`;
          options = [`Rs ${expectedVal}`, `Rs ${Math.floor(parseFloat(roundInput))}`, `Rs ${Math.ceil(parseFloat(roundInput)) + 1}`, `Rs ${expectedVal + 2}`];
          correct = 0;
          hint = "Paisa .50 ya usse bada ho toh upar kheencho (UP), nahi toh usi rupee par rehne do (DOWN)!";
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
        emoji = i % 2 === 0 ? "🪁" : "📐";
        title = `${char}'s Geometry Puzzle # ${i}`;
        narration = `Aap ${place} ghum rahe hain! Tabhi ${char} aapse panga leta hai aur kehta hai: "Beta, is math object ko dekho jo ek specific point se shuru hokar dusre end par infinity tak seedhi chali jati hai (jaise suraj ki kiran!). Iska kya naam hai?"`;
        choices = [
          { text: "Khand (Segment)", correct: false, rewardXp: 0 },
          { text: "Kiran (Ray) - Sahi pakde!", correct: true, rewardXp: 15 },
          { text: "Rekha (Line)", correct: false, rewardXp: 0 },
          { text: "Bindu (Point)", correct: false, rewardXp: 0 }
        ];
      } else if (topicId === "maxmin") {
        emoji = i % 2 === 0 ? "🪙" : "🍢";
        title = `Delhi Haat Rates - Panga # ${i}`;
        const minVal = 10 + i;
        const maxVal = 50 + i * 2;
        const diffRange = maxVal - minVal;
        narration = `Aap ${place} pahuche! ${char} ne apne samosas aur lassi rates list dikhayi: Minimum Rs. ${minVal} se shuru bankar Maximum Rs. ${maxVal} tak jati hai. Woh aapse poochta hai: "Pyare bache, in rates ke beech ka absolute Range (Fasla) kya hai?"`;
        choices = [
          { text: `Rs. ${diffRange} (Maximum - Minimum)`, correct: true, rewardXp: 15 },
          { text: `Rs. ${maxVal}`, correct: false, rewardXp: 0 },
          { text: `Rs. ${minVal}`, correct: false, rewardXp: 0 },
          { text: `Rs. ${maxVal + minVal}`, correct: false, rewardXp: 0 }
        ];
      } else {
        emoji = i % 2 === 0 ? "🐊" : "🍬";
        title = `Rounding Battle at ${place} # ${i}`;
        const decimalVal = (5.35 + i * 0.15).toFixed(2);
        const expected = Math.round(parseFloat(decimalVal));
        narration = `Aap ${place} bazaar mein shopping kar rahe hain. ${char} bolta hai ki is total bill Rs. ${decimalVal} ko nearest whole integer Rupee (Rupaye) mein round off karo, aur extra change chocolate lo! What is the correct rounded value?`;
        choices = [
          { text: `Rs. ${expected}`, correct: true, rewardXp: 15 },
          { text: `Rs. ${Math.floor(parseFloat(decimalVal))}`, correct: false, rewardXp: 0 },
          { text: `Rs. ${Math.ceil(parseFloat(decimalVal)) + 1}`, correct: false, rewardXp: 0 }
        ];
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
