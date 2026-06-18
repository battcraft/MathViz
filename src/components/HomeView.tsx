import { useState, useEffect } from "react";
import { 
  Flame, 
  Zap, 
  BookOpen, 
  ShoppingBag, 
  BadgeMinus, 
  Ruler, 
  Hash, 
  Compass, 
  BrainCircuit, 
  Crown, 
  MessageSquare, 
  Camera, 
  Send,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Award
} from "lucide-react";
import { BADGES, RIDDLES, checkUnlockedBadges } from "../data";
import { useAuth, DEFAULT_STATS } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import { DifficultyLevel, UserStats } from "../types";

interface HomeViewProps {
  difficulty: DifficultyLevel;
  setDifficulty: (diff: DifficultyLevel) => void;
  setActiveTab: (tab: "home" | "learn" | "quiz" | "story") => void;
}

// Icon mapper for the badges
const BADGE_ICONS: Record<string, any> = {
  bazaar_master: ShoppingBag,
  negative_champ: BadgeMinus,
  bullet_brain: Zap,
  kahani_karavan: BookOpen,
  geometry_guru: Ruler,
  number_ninja: Hash,
  streak_star: Flame,
  desi_explorer: Compass,
  algebra_ace: BrainCircuit,
  panga_king: Crown,
  mastery_badge: Award
};

export default function HomeView({ difficulty, setDifficulty, setActiveTab }: HomeViewProps) {
  const { user, stats, updateStats } = useAuth();
  const { t, language } = useLanguage();

  // 1. Random Mascot Message (4 variations)
  const [mascotIndex, setMascotIndex] = useState(0);
  useEffect(() => {
    // Pick based on user XP or simple random seed on load
    setMascotIndex(Math.floor(Math.random() * 4));
  }, []);

  // 2. Rank calculations
  const getRankInfo = (xp: number) => {
    if (xp >= 5000) return { title: t("rank3"), color: "bg-purple-400" };
    if (xp >= 1000) return { title: t("rank2"), color: "bg-blue-400" };
    if (xp >= 200) return { title: t("rank1"), color: "bg-green-400" };
    return { title: t("rank0"), color: "bg-yellow-400" };
  };
  const rankInfo = getRankInfo(stats.xp);

  // 3. Badges checking state
  const unlockedBadgeIds = checkUnlockedBadges(stats);
  useEffect(() => {
    // Update statistical badges inside user profile
    if (unlockedBadgeIds.length !== stats.badges.length) {
      updateStats({ badges: unlockedBadgeIds });
    }
  }, [unlockedBadgeIds, stats.badges, updateStats]);

  // 4. Daily Riddle selection and logic
  const [riddle, setRiddle] = useState(RIDDLES[0]);
  const [selectedRiddleOption, setSelectedRiddleOption] = useState<string | null>(null);
  const [riddleResult, setRiddleResult] = useState<"correct" | "wrong" | null>(null);
  const [riddleAttempted, setRiddleAttempted] = useState(false);

  useEffect(() => {
    // Set a riddle based on the calendar day of month to lock it daily
    const day = new Date().getDate();
    const index = (day - 1) % RIDDLES.length;
    setRiddle(RIDDLES[index]);
  }, []);

  const handleRiddleSubmit = () => {
    if (!selectedRiddleOption) return;
    setRiddleAttempted(true);
    if (selectedRiddleOption === riddle.correctAnswer) {
      setRiddleResult("correct");
      // Add XP
      updateStats({ xp: stats.xp + 20 });
    } else {
      setRiddleResult("wrong");
    }
  };

  // 5. Maths Dost ka Chaupal AI Chatbot
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bhaiya"; text: string }[]>([
    { sender: "bhaiya", text: "Namaste pyare dost! Main hoon aapka Maths Dost. Chalo, saath mein socho, samjho, aur solve karo! Math ka panga ho ya geometry ka tension, bina ghabraye poocho!" }
  ]);

  // Seedeed instant Hinglish answers for the 8 standard questions
  const instantAnswers: Record<string, string> = {
    "What is Bindu/Point?": "Doston! Point ya Bindu math ka sabse chhota aur power-packed structure hai. Iski na koi lambai hoti hai, na chaudai, aur na hi height (zero-dimensional!). Yeh sirf ek location/position dikhata hai. Jaise night sky mein ek tara ya map par ek pin point! Issey hum Capital letter (jaise A, B) se likhte hain.",
    "What is the difference between Rekha (Line) & Segment?": "Arey waah! Bohot badhiya panga liya! Rekha (Line) infinite hoti hai—yeh dono directions mein bina ruke aage badhti chali jati hai (iski lambai anant hai). Line Segment (Khand) usi Rekha ka ek chhota piece hota hai jiske do endpoints fixed hote hain, jaise scale se kheenchi gayi 5 cm ki line!",
    "How is negative number compared?": "Iskey liye simple 'Samosa udhaar check' trick yaad rakho! Agar tum par Rs. 50 udhaar hai (-50) aur dost par Rs. 10 (-10) udhaar hai, toh kaun zyada ameer hai? Sahi pakde! Dost richer hai kyunki uspar kam udhaar hai. Isliye -10 is GREATER than -50! Negative numbers mein, digit jitna chhota, value utni badi!",
    "What does Range mean in real life?": "Range ko simple Hinglish mein kehte hain FASLA! Kisi cheez ki extreme limits. For example, Chandni Chowk mein samosa starts at Rs. 10 (Minimum) and goes up to Rs. 35 (Maximum). Toh samosa rates ka range (fasla) hoga: Maximum - Minimum = 35 - 10 = Rs. 25!",
    "Suggest a trick to round off numbers quickly.": "Maths Dost ka super simple rule suno: '5 or above, give it a shove (UP)! Below 5, keep it alive (DOWN)!'. Jaise Rs. 44.60 ko round off karoge toh fractional part (.60) is equal/higher than 50 paisa, isliye Rs 45 banega!",
    "How does Place Value protect our money?": "Arey, place value hi toh decide karta hai ki Rs. 5,000 badhiya hai ya Rs. 500! Zero ki position bohot keemti hoti hai. 5,000 mein '5' is in Thousands place, meaning 5 * 1000 = Five thousand. Agar local market mein koi zero khajaye, toh nuksaan ho jata hai!",
    "Why do parallel lines never clash?": "Parallel lines bilkul rail ki patriyon ki tarah hoti hain! Unke beech ki doori hamesha barabar rehti hai. Isliye woh stretch hone par bhi kabhi bheed nahi karti aur hamesha parallel chalti hain bina panga kiye!",
    "How does IPL use Max/Min values?": "IPL mein stats hi sab kuch hain! Har player ke analytics mein 'Highest Score' (Max runs in an innings) aur 'Best Economy' (Minimum runs conceded per over) check kiya jata hai. Auction mein Maximum bid budget points ko range limit mein predict karne ke liye Max/Min equations use hoti hain!"
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: "user" as const, text: textToSend }];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    // 1. Check if we have an instant seeded response
    if (instantAnswers[textToSend]) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { sender: "bhaiya", text: instantAnswers[textToSend] }
        ]);
        setChatLoading(false);
      }, 400);
      return;
    }

    // 2. If it is a custom question, proxy it to our safe server-side Gemini route
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });
      if (response.ok) {
        const data = await response.json();
        setChatMessages((prev) => [
          ...prev,
          { sender: "bhaiya", text: data.reply }
        ]);
      } else {
        // Fallback response if Server is not fully completed or errors out
        setChatMessages((prev) => [
          ...prev,
          { sender: "bhaiya", text: "Maths Dost thoda dimaag laga rahe hain. Tab tak lessons and practices explore karo, doston!" }
        ]);
      }
    } catch (e) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bhaiya", text: "Connection slow hai pyare! Homework complete karne ke liye lessons tab dekho tab tak!" }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12">
      
      {/* 1. Mascot Banner (Neo-Brutalist Bento Card) */}
      <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-[#4D96FF] border-4 border-black rounded-2xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_black] select-none flex-shrink-0 animate-bounce">
          😎
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-sans font-black text-xl text-black uppercase tracking-tight mb-1.5 flex items-center justify-center md:justify-start gap-2">
            <span>Abki Baar, Geometry Paar! 📏</span>
            <span className="text-[10px] bg-[#FFC700] border-2 border-black text-black px-1.5 py-0.5 font-sans font-black uppercase rounded-md rotate-1">Maths Dost Says</span>
          </h3>
          <p className="font-sans text-sm sm:text-base text-zinc-700 font-bold leading-relaxed">
            "{t(`mascot_${mascotIndex}`)}"
          </p>
        </div>
        <button
          id="drill-cta-btn"
          onClick={() => setActiveTab("learn")}
          className="flex-shrink-0 px-6 py-3 bg-[#22C55E] text-white hover:bg-green-600 font-sans font-black text-sm uppercase tracking-wider border-4 border-black rounded-xl shadow-[4px_4px_0px_black] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer pointer-events-auto"
        >
          {t("startDrillCta")}
        </button>
        <div className="absolute top-0 right-0 h-24 w-24 bg-black/5 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 2. Difficulty Select Grid & Realtime User stats - Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Difficulty Select Bento Card */}
        <div className="bg-[#4D96FF] text-white border-4 border-black p-5 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-sans font-black text-xs uppercase text-white/90 tracking-widest mb-1.5">
              💎 {t("difficultyLabel")}
            </h4>
            <p className="text-xs text-white/80 font-bold leading-relaxed">
              Choose your syllabus standard class to adjust explanations:
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {(["beginner", "intermediate", "expert"] as DifficultyLevel[]).map((level) => {
              const isSelected = difficulty === level;
              return (
                <button
                  key={level}
                  id={`difficulty-${level}-btn`}
                  onClick={() => setDifficulty(level)}
                  className={`py-3 px-4 border-2 border-black rounded-xl font-mono text-xs text-left font-extrabold uppercase transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white text-[#1A1A1A] shadow-[3px_3px_0px_black] transform scale-[1.02]"
                      : "bg-black/20 hover:bg-black/30 text-white/90"
                  }`}
                >
                  <span>
                    {level === "beginner" && t("levelBeg")}
                    {level === "intermediate" && t("levelInt")}
                    {level === "expert" && t("levelExp")}
                  </span>
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black bg-[#22C55E]" />
                  ) : (
                    <span className="text-[10px] opacity-25">🔒</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time stats bento card with XP Accumulation tiers */}
        <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:col-span-2 flex flex-col justify-between gap-4">
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h4 className="font-sans font-black text-xs uppercase text-zinc-400 tracking-widest mb-1">
                📊 Level & Math Rank
              </h4>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`px-3 py-1 border-2 border-black rounded-lg ${rankInfo.color} font-mono text-xs font-black text-black uppercase shadow-[2px_2px_0px_black]`}>
                  {rankInfo.title}
                </span>
                <span className="text-xs text-zinc-500 font-extrabold font-mono ml-1">({stats.xp} Total XP)</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {user ? (
                <span className="text-[10px] uppercase font-mono font-black text-green-700 bg-green-100 border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_black]">
                  ✓ {t("statsSynced")}
                </span>
              ) : (
                <span className="text-[10px] uppercase font-mono font-black text-amber-700 bg-amber-100 border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_black]">
                  ⚠ {t("saveOffline")}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            
            {/* Coins */}
            <div className="bg-amber-50 border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_black] text-center flex flex-col items-center justify-center">
              <span className="text-3xl">🪙</span>
              <span className="text-xl font-mono font-black text-black mt-1.5">
                {stats.xp}
              </span>
              <span className="text-[9px] font-mono font-extrabold text-zinc-500 uppercase tracking-wider mt-0.5">{t("xpCoins")}</span>
            </div>

            {/* Streak */}
            <div className="bg-orange-50 border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_black] text-center flex flex-col items-center justify-center">
              <span className="text-3xl text-red-500 animate-pulse">🔥</span>
              <span className="text-lg sm:text-xl font-mono font-black text-black mt-1.5">
                {stats.streak} {stats.streak === 1 ? "Day" : "Days"}
              </span>
              <span className="text-[9px] font-mono font-extrabold text-zinc-500 uppercase tracking-wider mt-0.5">{t("streak")}</span>
            </div>

            {/* Screens */}
            <div className="bg-blue-50 border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_black] text-center flex flex-col items-center justify-center">
              <span className="text-3xl">📖</span>
              <span className="text-lg sm:text-xl font-mono font-black text-black mt-1.5">
                {stats.completedScreens.length}/239
              </span>
              <span className="text-[9px] font-mono font-extrabold text-zinc-500 uppercase tracking-wider mt-0.5">{t("screensCompleted")}</span>
            </div>

          </div>

          {/* Progress to next rank */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono font-extrabold text-zinc-700 mb-1.5">
              <span>Next Rank Progress</span>
              <span>{stats.xp >= 5000 ? "Max Rank Achieved" : `${stats.xp % 1000}/1000 XP`}</span>
            </div>
            <div className="h-5 w-full bg-zinc-100 border-2 border-black rounded-lg overflow-hidden relative">
              <div 
                className="h-full bg-[#22C55E] border-r-2 border-black transition-all duration-300"
                style={{ width: `${Math.min(((stats.xp % 1000) / 1000) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Championship Streak Milestones Card */}
          <div className="bg-[#FFECC2] border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_black] mt-3 text-left">
            <h4 className="font-sans font-black text-xs uppercase text-amber-950 tracking-widest mb-3 flex items-center gap-2">
              🔥 STREAK CHAMPION ROOMS
            </h4>
            <p className="text-[11px] text-amber-900 font-bold mb-3 font-sans leading-normal">
              Keep practicing daily to unlock awesome title rooms! Active streak is <span className="underline decoration-2 font-black">{stats.streak} {stats.streak === 1 ? "day" : "days"}</span>!
            </p>
            
            <div className="flex flex-col gap-2">
              {/* Milestone 1: 3-Day Streak */}
              <div className={`p-2 border-2 border-black rounded-lg flex items-center justify-between transition-all ${
                stats.streak >= 3 ? "bg-emerald-100 border-emerald-400" : "bg-neutral-50/80"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <div>
                    <h5 className="font-sans font-black text-[11px] text-black">3-Day Champion Room</h5>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase">Badge: Rising Star ⭐️</p>
                  </div>
                </div>
                {stats.streak >= 3 ? (
                  <span className="text-[9px] bg-emerald-500 border border-black text-white px-1.5 py-0.5 rounded font-black">✓ UNLOCKED</span>
                ) : (
                  <span className="text-[9px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold font-mono">Progress: {Math.min(stats.streak, 3)}/3</span>
                )}
              </div>

              {/* Milestone 2: 7-Day Streak */}
              <div className={`p-2 border-2 border-black rounded-lg flex items-center justify-between transition-all ${
                stats.streak >= 7 ? "bg-amber-100 border-amber-400" : "bg-neutral-50/80"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  <div>
                    <h5 className="font-sans font-black text-[11px] text-black">7-Day Champion Room</h5>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase">Badge: Master Solver 👑</p>
                  </div>
                </div>
                {stats.streak >= 7 ? (
                  <span className="text-[9px] bg-amber-500 border border-black text-black px-1.5 py-0.5 rounded font-black">✓ UNLOCKED</span>
                ) : (
                  <span className="text-[9px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold font-mono">Progress: {Math.min(stats.streak, 7)}/7</span>
                )}
              </div>

              {/* Milestone 3: 30-Day Streak */}
              <div className={`p-2 border-2 border-black rounded-lg flex items-center justify-between transition-all ${
                stats.streak >= 30 ? "bg-indigo-100 border-indigo-400" : "bg-neutral-50/80"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <h5 className="font-sans font-black text-[11px] text-black">30-Day Maths Champ</h5>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase">Badge: Absolute Legend 🎓</p>
                  </div>
                </div>
                {stats.streak >= 30 ? (
                  <span className="text-[9px] bg-indigo-500 border border-black text-white px-1.5 py-0.5 rounded font-black">✓ UNLOCKED</span>
                ) : (
                  <span className="text-[9px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold font-mono">Progress: {Math.min(stats.streak, 30)}/30</span>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Daily Riddle - Bento styled warm coral coral/red card */}
      <div className="bg-[#FF6B6B] border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-white flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧩</span>
            <div>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-tight leading-none">
                {t("dailyRiddleTitle")}
              </h3>
              <p className="text-[10px] text-white/80 font-black uppercase tracking-wider mt-1">{t("dailyRiddleSubtitle")}</p>
            </div>
          </div>
          <div className="bg-white text-[#FF6B6B] border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_black] rounded-md">+20 XP</div>
        </div>

        <p className="text-sm font-black text-zinc-800 bg-white border-3 border-black p-4 rounded-xl mb-4 leading-relaxed shadow-[3px_3px_0px_black]">
          {riddle.riddle}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {riddle.options.map((opt) => {
            const isSelected = selectedRiddleOption === opt;
            return (
              <button
                key={opt}
                disabled={riddleAttempted}
                onClick={() => setSelectedRiddleOption(opt)}
                className={`p-3 px-4 text-left border-3 border-black rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-[3px_3px_0px_black] ${
                  isSelected
                    ? "bg-[#FFC700] text-black ring-3 ring-black transform scale-[1.02]"
                    : "bg-white hover:bg-zinc-100 text-black"
                } ${riddleAttempted ? "opacity-75 cursor-not-allowed" : "hover:translate-y-[-1px] active:translate-y-[1px]"}`}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Actions & Results */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-3 border-dashed border-black/20 pt-4 mt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/90 font-black uppercase tracking-wider">Hint:</span>
            <span className="text-xs italic font-black text-black bg-white/90 border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_black]">
              {riddle.hint}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!riddleAttempted ? (
              <button
                id="submit-riddle-btn"
                disabled={!selectedRiddleOption}
                onClick={handleRiddleSubmit}
                className={`w-full sm:w-auto px-6 py-2.5 text-black font-sans font-black border-3 border-black rounded-xl shadow-[4px_4px_0px_black] transition-all hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer ${
                  selectedRiddleOption ? "bg-[#FFC700] hover:bg-[#FFB100]" : "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed shadow-none"
                }`}
              >
                {t("submitBtn")}
              </button>
            ) : (
              <div className="w-full flex items-center justify-end font-black text-xs">
                {riddleResult === "correct" ? (
                  <span className="text-black bg-[#22C55E]/90 border-3 border-black rounded-xl p-3 flex items-center gap-2 w-full justify-center shadow-[3px_3px_0px_black] uppercase tracking-wider">
                    <CheckCircle2 className="h-5 w-5 fill-white text-green-800" />
                    {t("riddleSuccess")}
                  </span>
                ) : (
                  <span className="text-black bg-[#FF4D4D]/90 border-3 border-black rounded-xl p-3 flex items-center gap-2 w-full justify-center shadow-[3px_3px_0px_black] uppercase tracking-wider">
                    <AlertTriangle className="h-5 w-5 fill-white text-red-800" />
                    {t("riddleFail")}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bhaiya ka Chaupal AI Instant + Custom Chat */}
      <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 mb-4 border-b-4 border-black pb-4">
          <span className="text-3xl">💬</span>
          <div>
            <h3 className="font-sans font-black text-lg text-black uppercase tracking-tight">
              {t("chatTitle")}
            </h3>
            <p className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-wider mt-0.5">{t("chatSubtitle")}</p>
          </div>
        </div>

        {/* 8 quick-question tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            const queryKey = `chatQ${num}`;
            const questionText = t(queryKey);
            return (
              <button
                key={num}
                id={`chat-tag-${num}-btn`}
                onClick={() => handleSendMessage(questionText)}
                className="px-3 py-1.5 text-xs font-mono font-bold bg-[#FFF5CC] border-2 border-black rounded-xl hover:bg-[#FFC700] text-black cursor-pointer shadow-[2px_2px_0px_black] hover:scale-[1.02] active:translate-y-0.5 transition-all text-left max-w-full truncate"
                title={questionText}
              >
                {questionText}
              </button>
            );
          })}
        </div>

        {/* Chat window */}
        <div className="bg-[#1A1A1A] border-4 border-black rounded-2xl p-4 h-72 overflow-y-auto font-mono text-xs flex flex-col gap-4 my-4 scrollbar-thin shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <span className={`text-[9px] uppercase tracking-wider mb-1 font-black ${
                msg.sender === "user" ? "text-zinc-500" : "text-[#FFC700]"
              }`}>
                {msg.sender === "user" ? "You (Sawaal)" : "MathsGuru Bhaiya (Jawaab)"}
              </span>
              <div
                className={`p-3 rounded-2xl border-2 border-black leading-relaxed shadow-[3px_3px_0px_black] text-sm ${
                  msg.sender === "user"
                    ? "bg-[#FFC700] text-black font-extrabold rounded-tr-none"
                    : "bg-white text-black font-semibold rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="self-start text-[#FFC700] flex items-center gap-2 animate-pulse text-xs font-mono font-bold px-1">
              <span className="w-2 h-2 rounded-full bg-[#FFC700] animate-bounce"></span>
              <span>Bhaiya dimaag laga rahe hain... Podcaster mode ON!</span>
            </div>
          )}
        </div>

        {/* Send panel */}
        <div className="flex gap-2.5 font-mono">
          <input
            id="chat-text-input"
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={t("chatPromptPlaceholder")}
            className="flex-grow border-3 border-black p-3 rounded-xl text-xs sm:text-sm font-black text-black focus:ring-4 focus:ring-black/25 focus:outline-none bg-white font-sans shadow-[2px_2px_0px_black]"
          />
          <button
            id="chat-send-btn"
            onClick={() => handleSendMessage()}
            className="px-5 py-3 bg-[#FFC700] hover:bg-[#FFB100] text-black border-3 border-black rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="h-4.5 w-4.5 text-black stroke-[3px]" />
            <span className="hidden xs:inline">{t("chatSendBtn")}</span>
          </button>
        </div>
      </div>

      {/* 5. Achievement Badges 10 Board */}
      <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4">
          <h3 className="font-sans font-black text-lg text-black uppercase tracking-tight leading-none">
            🏅 {t("badgesTitle")}
          </h3>
          <p className="text-xs text-zinc-500 font-mono mt-1 font-bold">{t("badgesSubtitle")}</p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = stats.badges.includes(badge.id);
            const IconComponent = BADGE_ICONS[badge.id] || HelpCircle;

            return (
              <div
                key={badge.id}
                className={`border-3 border-black p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative ${
                  isUnlocked 
                    ? "bg-gradient-to-br from-amber-50 to-orange-100 hover:scale-[1.04] cursor-pointer" 
                    : "bg-zinc-100 opacity-60"
                }`}
                title={`${badge.name}: ${badge.description}`}
              >
                {/* Visual Lock/Unlock badge indicators */}
                <div className="absolute top-2 right-2 text-[10px]">
                  {isUnlocked ? "🏆" : "🔒"}
                </div>

                <div className={`p-3 rounded-full border-2 border-black mb-2 shadow-[2px_2px_0px_black] ${
                  isUnlocked ? "bg-[#FFC700] text-black" : "bg-zinc-300 text-zinc-500"
                }`}>
                  <IconComponent className="h-6 w-6 stroke-[2.5px]" />
                </div>

                <h5 className="font-sans font-black text-xs text-zinc-900 border-b-2 border-black/10 pb-1 w-full truncate">
                  {badge.name}
                </h5>
                <p className="text-[9px] font-mono text-zinc-600 font-medium leading-normal mt-1.5 h-12 overflow-hidden">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Quick Access CTA blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <button
          id="quick-nav-learn-btn"
          onClick={() => setActiveTab("learn")}
          className="bg-[#D1F2D9] border-4 border-black p-5 rounded-2xl flex items-center justify-between shadow-[6px_6px_0px_black] text-left hover:scale-[1.02] hover:shadow-[4px_4px_0px_black] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <div className="font-sans">
            <h4 className="font-sans font-black text-base text-black">{t("quickAccessLearn")}</h4>
            <p className="text-xs text-zinc-700 font-bold mt-1 max-w-[200px]">239 interactive micro-concept worksheets</p>
          </div>
          <span className="text-2xl h-10 w-10 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_black] scale-90">👉</span>
        </button>

        <button
          id="quick-nav-story-btn"
          onClick={() => setActiveTab("story")}
          className="bg-[#F8D7DA] border-4 border-black p-5 rounded-2xl flex items-center justify-between shadow-[6px_6px_0px_black] text-left hover:scale-[1.02] hover:shadow-[4px_4px_0px_black] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <div className="font-sans">
            <h4 className="font-sans font-black text-base text-black">{t("quickAccessStory")}</h4>
            <p className="text-xs text-zinc-700 font-bold mt-1 max-w-[200px]">Math Street adventures & daily problems</p>
          </div>
          <span className="text-2xl h-10 w-10 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_black] scale-90">👉</span>
        </button>

        <div className="bg-zinc-100 border-4 border-black p-5 rounded-2xl flex items-center gap-4 shadow-[6px_6px_0px_black] opacity-70">
          <div className="p-3 bg-zinc-300 border-2 border-black rounded-xl shadow-[2px_2px_0px_black]">
            <Camera className="h-6 w-6 text-zinc-800" />
          </div>
          <div className="font-sans text-left">
            <h4 className="font-sans font-black text-sm text-zinc-900">{t("photoTitle")}</h4>
            <p className="text-[10px] text-zinc-650 font-bold mt-0.5">{t("photoDesc")}</p>
          </div>
        </div>

      </div>

    </div>
  );
}
