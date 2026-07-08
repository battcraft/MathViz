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
  Award,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { BADGES, RIDDLES, checkUnlockedBadges } from "../data";
import { useAuth, DEFAULT_STATS } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import { DifficultyLevel, UserStats } from "../types";
import Mascot from "./Mascot";

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
    const day = new Date().getDate();
    const index = (day - 1) % RIDDLES.length;
    setRiddle(RIDDLES[index]);
  }, []);

  const handleRiddleSubmit = () => {
    if (!selectedRiddleOption) return;
    setRiddleAttempted(true);
    if (selectedRiddleOption === riddle.correctAnswer) {
      setRiddleResult("correct");
      updateStats({ xp: stats.xp + 20 });
    } else {
      setRiddleResult("wrong");
    }
  };

  // 5. Maths Dost ka Chaupal AI Chatbot
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bhaiya"; text: string }[]>([
    { sender: "bhaiya", text: t("chatGreeting") }
  ]);

  // Seeded instant Hinglish answers for the 8 standard questions
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

    const newMessages = [...chatMessages, { sender: "user" as const, text: textToSend }];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

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

  // Collapsible section state
  const [riddleOpen, setRiddleOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [badgesShowAll, setBadgesShowAll] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 animate-fade-in pb-12">
      
      {/* 1. Mascot Banner */}
      <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col md:flex-row items-center gap-5">
        <Mascot
          mood={mascotIndex % 4 === 0 ? "happy" : mascotIndex % 4 === 1 ? "thinking" : mascotIndex % 4 === 2 ? "teaching" : "celebrating"}
          className="flex-shrink-0"
          size={90}
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-sans font-black text-lg text-black uppercase tracking-tight mb-1 flex items-center justify-center md:justify-start gap-2">
            <span>Abki Baar, Geometry Paar! 📏</span>
            <span className="text-[10px] bg-[#FFC700] border-2 border-black text-black px-1.5 py-0.5 font-sans font-black uppercase rounded-md rotate-1">Maths Dost Says</span>
          </h3>
          <p className="font-sans text-sm text-zinc-700 font-bold leading-relaxed">
            "{t(`mascot_${mascotIndex}`)}"
          </p>
        </div>
        <button
          id="drill-cta-btn"
          onClick={() => setActiveTab("learn")}
          className="flex-shrink-0 px-5 py-2.5 bg-[#22C55E] text-white hover:bg-green-600 font-sans font-black text-sm uppercase tracking-wider border-4 border-black rounded-xl shadow-[4px_4px_0px_black] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer pointer-events-auto"
        >
          {t("startDrillCta")}
        </button>
        <div className="absolute top-0 right-0 h-24 w-24 bg-black/5 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 2. Compact Stats Row + Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Difficulty Select */}
        <div className="bg-[#4D96FF] text-white border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-3">
          <div>
            <h4 className="font-sans font-black text-xs uppercase text-white/90 tracking-widest mb-1">
              💎 {t("difficultyLabel")}
            </h4>
            <p className="text-[10px] text-white/70 font-bold">
              {t("difficultyDesc") || "Adjust explanations for your class:"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {(["beginner", "intermediate", "expert"] as DifficultyLevel[]).map((level) => {
              const isSelected = difficulty === level;
              return (
                <button
                  key={level}
                  id={`difficulty-${level}-btn`}
                  onClick={() => setDifficulty(level)}
                  className={`py-2.5 px-3 border-2 border-black rounded-xl font-mono text-xs text-left font-extrabold uppercase transition-all flex items-center justify-between cursor-pointer ${
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
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-black bg-[#22C55E]" />
                  ) : (
                    <span className="text-[10px] opacity-25">🔒</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Stats Panel */}
        <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 border-2 border-black rounded-lg ${rankInfo.color} font-mono text-[10px] font-black text-black uppercase shadow-[2px_2px_0px_black]`}>
                {rankInfo.title}
              </span>
              <span className="text-[10px] text-zinc-500 font-extrabold font-mono">({stats.xp} XP)</span>
            </div>
            {user ? (
              <span className="text-[9px] uppercase font-mono font-black text-green-700 bg-green-100 border-2 border-black px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_black]">
                ✓ {t("statsSynced")}
              </span>
            ) : (
              <span className="text-[9px] uppercase font-mono font-black text-amber-700 bg-amber-100 border-2 border-black px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_black]">
                ⚠ {t("saveOffline")}
              </span>
            )}
          </div>

          {/* Compact 3-stat row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-amber-50 border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_black] text-center">
              <span className="text-xl">🪙</span>
              <span className="block text-sm font-mono font-black text-black mt-0.5">{stats.xp}</span>
              <span className="text-[8px] font-mono font-extrabold text-zinc-500 uppercase">{t("xpCoins")}</span>
            </div>
            <div className="bg-orange-50 border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_black] text-center">
              <span className="text-xl text-red-500">🔥</span>
              <span className="block text-sm font-mono font-black text-black mt-0.5">{stats.streak}D</span>
              <span className="text-[8px] font-mono font-extrabold text-zinc-500 uppercase">{t("streak")}</span>
            </div>
            <div className="bg-blue-50 border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_black] text-center">
              <span className="text-xl">📖</span>
              <span className="block text-sm font-mono font-black text-black mt-0.5">{stats.completedScreens.length}/239</span>
              <span className="text-[8px] font-mono font-extrabold text-zinc-500 uppercase">{t("screensCompleted")}</span>
            </div>
          </div>

          {/* Progress bar + Streak modal trigger */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex justify-between items-center text-[10px] font-mono font-extrabold text-zinc-600 mb-1">
                <span>{t("nextRank") || "Next Rank"}</span>
                <span>{stats.xp >= 5000 ? "MAX" : `${stats.xp % 1000}/1000 XP`}</span>
              </div>
              <div className="h-3.5 w-full bg-zinc-100 border-2 border-black rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-[#22C55E] border-r-2 border-black transition-all duration-300"
                  style={{ width: `${Math.min(((stats.xp % 1000) / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setStreakModalOpen(true)}
              className="flex-shrink-0 px-2.5 py-1.5 bg-[#FFECC2] border-2 border-black rounded-xl text-[10px] font-black text-amber-900 shadow-[2px_2px_0px_black] hover:scale-[1.03] transition-all cursor-pointer"
            >
              🔥 Streak
            </button>
          </div>
        </div>
      </div>

      {/* 3. Daily Riddle - Collapsible */}
      <div className="bg-[#FF6B6B] border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-white overflow-hidden">
        <button
          onClick={() => setRiddleOpen(!riddleOpen)}
          className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-[#FF5555] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧩</span>
            <div className="text-left">
              <h3 className="font-sans font-black text-base text-white uppercase tracking-tight leading-none">
                {t("dailyRiddleTitle")}
              </h3>
              <p className="text-[9px] text-white/70 font-black uppercase tracking-wider mt-0.5">{t("dailyRiddleSubtitle")} • +20 XP</p>
            </div>
          </div>
          {riddleOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
        </button>
        
        {riddleOpen && (
          <div className="px-5 pb-5 flex flex-col gap-3">
            <p className="text-sm font-black text-zinc-800 bg-white border-3 border-black p-3 rounded-xl leading-relaxed shadow-[3px_3px_0px_black]">
              {riddle.riddle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {riddle.options.map((opt) => {
                const isSelected = selectedRiddleOption === opt;
                return (
                  <button
                    key={opt}
                    disabled={riddleAttempted}
                    onClick={() => setSelectedRiddleOption(opt)}
                    className={`p-2.5 px-3 text-left border-3 border-black rounded-xl text-xs font-black transition-all cursor-pointer shadow-[3px_3px_0px_black] ${
                      isSelected
                        ? "bg-[#FFC700] text-black ring-3 ring-black transform scale-[1.02]"
                        : "bg-white hover:bg-zinc-100 text-black"
                    } ${riddleAttempted ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t-3 border-dashed border-black/20 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/80 font-black uppercase">Hint:</span>
                <span className="text-[10px] italic font-black text-black bg-white/90 border-2 border-black px-2 py-0.5 rounded-lg">
                  {riddle.hint}
                </span>
              </div>
              {!riddleAttempted ? (
                <button
                  id="submit-riddle-btn"
                  disabled={!selectedRiddleOption}
                  onClick={handleRiddleSubmit}
                  className={`px-5 py-2 text-black font-sans font-black border-3 border-black rounded-xl shadow-[4px_4px_0px_black] transition-all cursor-pointer ${
                    selectedRiddleOption ? "bg-[#FFC700] hover:bg-[#FFB100]" : "bg-zinc-200 text-zinc-400 border-zinc-300 cursor-not-allowed shadow-none"
                  }`}
                >
                  {t("submitBtn")}
                </button>
              ) : (
                <div className="font-black text-xs">
                  {riddleResult === "correct" ? (
                    <span className="text-black bg-[#22C55E]/90 border-3 border-black rounded-xl p-2 flex items-center gap-2 shadow-[3px_3px_0px_black] uppercase tracking-wider">
                      <CheckCircle2 className="h-4 w-4 fill-white text-green-800" />
                      {t("riddleSuccess")}
                    </span>
                  ) : (
                    <span className="text-black bg-[#FF4D4D]/90 border-3 border-black rounded-xl p-2 flex items-center gap-2 shadow-[3px_3px_0px_black] uppercase tracking-wider">
                      <AlertTriangle className="h-4 w-4 fill-white text-red-800" />
                      {t("riddleFail")}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. AI Chatbot - Collapsible */}
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div className="text-left">
              <h3 className="font-sans font-black text-base text-black uppercase tracking-tight">
                {t("chatTitle")}
              </h3>
              <p className="text-[9px] font-mono text-zinc-500 uppercase font-black tracking-wider">{t("chatSubtitle")}</p>
            </div>
          </div>
          {chatOpen ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
        </button>

        {chatOpen && (
          <div className="px-5 pb-5">
            {/* Quick question tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                const queryKey = `chatQ${num}`;
                const questionText = t(queryKey);
                return (
                  <button
                    key={num}
                    id={`chat-tag-${num}-btn`}
                    onClick={() => handleSendMessage(questionText)}
                    className="px-2.5 py-1 text-[10px] font-mono font-bold bg-[#FFF5CC] border-2 border-black rounded-lg hover:bg-[#FFC700] text-black cursor-pointer shadow-[2px_2px_0px_black] transition-all truncate max-w-[180px]"
                    title={questionText}
                  >
                    {questionText}
                  </button>
                );
              })}
            </div>

            {/* Chat window */}
            <div className="bg-[#1A1A1A] border-4 border-black rounded-2xl p-3 h-56 overflow-y-auto font-mono text-xs flex flex-col gap-3 mb-3 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className={`text-[8px] uppercase tracking-wider mb-0.5 font-black ${
                    msg.sender === "user" ? "text-zinc-500" : "text-[#FFC700]"
                  }`}>
                    {msg.sender === "user" ? "You" : "Maths Dost"}
                  </span>
                  <div
                    className={`p-2 rounded-xl border-2 border-black leading-relaxed shadow-[2px_2px_0px_black] text-xs ${
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
                <div className="self-start text-[#FFC700] flex items-center gap-2 animate-pulse text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC700] animate-bounce" />
                  <span>Maths Dost soch rahe hain...</span>
                </div>
              )}
            </div>

            {/* Send panel */}
            <div className="flex gap-2 font-mono">
              <input
                id="chat-text-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("chatPromptPlaceholder")}
                className="flex-grow border-3 border-black p-2.5 rounded-xl text-xs font-black text-black focus:ring-4 focus:ring-black/25 focus:outline-none bg-white font-sans shadow-[2px_2px_0px_black]"
              />
              <button
                id="chat-send-btn"
                onClick={() => handleSendMessage()}
                className="px-4 py-2.5 bg-[#FFC700] hover:bg-[#FFB100] text-black border-3 border-black rounded-xl font-sans font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-none transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-black stroke-[3px]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Achievement Badges - Compact, unlocked first */}
      <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-sans font-black text-base text-black uppercase tracking-tight leading-none">
              🏅 {t("badgesTitle")}
            </h3>
            <p className="text-[9px] text-zinc-500 font-mono mt-0.5 font-bold">
              {unlockedBadgeIds.length}/{BADGES.length} unlocked
            </p>
          </div>
          {BADGES.length > 6 && (
            <button
              onClick={() => setBadgesShowAll(!badgesShowAll)}
              className="text-[10px] font-black text-zinc-500 hover:text-black transition-colors cursor-pointer"
            >
              {badgesShowAll ? "Show Less" : "View All →"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {(badgesShowAll ? BADGES : BADGES.filter(b => stats.badges.includes(b.id)).slice(0, 6).length > 0
            ? BADGES.filter(b => stats.badges.includes(b.id)).slice(0, 6)
            : BADGES.slice(0, 6)
          ).map((badge) => {
            const isUnlocked = stats.badges.includes(badge.id);
            const IconComponent = BADGE_ICONS[badge.id] || HelpCircle;
            return (
              <div
                key={badge.id}
                className={`border-2 border-black p-2.5 rounded-xl flex flex-col items-center justify-center text-center shadow-[3px_3px_0px_black] relative ${
                  isUnlocked 
                    ? "bg-gradient-to-br from-amber-50 to-orange-100"
                    : "bg-zinc-100 opacity-50"
                }`}
                title={`${badge.name}: ${badge.description}`}
              >
                <div className="absolute top-1 right-1 text-[8px]">
                  {isUnlocked ? "🏆" : "🔒"}
                </div>
                <div className={`p-2 rounded-full border-2 border-black mb-1 shadow-[2px_2px_0px_black] ${
                  isUnlocked ? "bg-[#FFC700] text-black" : "bg-zinc-300 text-zinc-500"
                }`}>
                  <IconComponent className="h-4 w-4 stroke-[2.5px]" />
                </div>
                <h5 className="font-sans font-black text-[9px] text-zinc-900 truncate w-full">
                  {badge.name}
                </h5>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Quick Access CTAs - 2 buttons (removed Photo Ask) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          id="quick-nav-learn-btn"
          onClick={() => setActiveTab("learn")}
          className="bg-[#D1F2D9] border-4 border-black p-4 rounded-2xl flex items-center justify-between shadow-[6px_6px_0px_black] text-left hover:scale-[1.02] hover:shadow-[4px_4px_0px_black] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <div className="font-sans">
            <h4 className="font-sans font-black text-sm text-black">{t("quickAccessLearn")}</h4>
            <p className="text-[10px] text-zinc-700 font-bold mt-0.5">{t("quickAccessLearn")}</p>
          </div>
          <span className="text-xl h-8 w-8 flex items-center justify-center bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_black]">👉</span>
        </button>

        <button
          id="quick-nav-story-btn"
          onClick={() => setActiveTab("story")}
          className="bg-[#F8D7DA] border-4 border-black p-4 rounded-2xl flex items-center justify-between shadow-[6px_6px_0px_black] text-left hover:scale-[1.02] hover:shadow-[4px_4px_0px_black] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <div className="font-sans">
            <h4 className="font-sans font-black text-sm text-black">{t("quickAccessStory")}</h4>
            <p className="text-[10px] text-zinc-700 font-bold mt-0.5">Math stories</p>
          </div>
          <span className="text-xl h-8 w-8 flex items-center justify-center bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_black]">👉</span>
        </button>
      </div>

      {/* Streak Champion Modal */}
      {streakModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setStreakModalOpen(false)}>
          <div className="bg-[#FFECC2] border-4 border-black p-5 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-sans font-black text-sm uppercase text-amber-950 tracking-widest flex items-center gap-2">
                🔥 Streak Champion Rooms
              </h4>
              <button onClick={() => setStreakModalOpen(false)} className="cursor-pointer">
                <X className="h-5 w-5 text-amber-900" />
              </button>
            </div>
            <p className="text-[10px] text-amber-900 font-bold mb-3 font-sans">
              Keep practicing daily! Active streak: <span className="underline font-black">{stats.streak} {stats.streak === 1 ? "day" : "days"}</span>
            </p>
            <div className="flex flex-col gap-2">
              <div className={`p-2.5 border-2 border-black rounded-lg flex items-center justify-between ${stats.streak >= 3 ? "bg-emerald-100 border-emerald-400" : "bg-neutral-50/80"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <div>
                    <h5 className="font-sans font-black text-[11px] text-black">3-Day Champion</h5>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase">Rising Star ⭐️</p>
                  </div>
                </div>
                {stats.streak >= 3 ? (
                  <span className="text-[8px] bg-emerald-500 border border-black text-white px-1.5 py-0.5 rounded font-black">✓ UNLOCKED</span>
                ) : (
                  <span className="text-[8px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold font-mono">{Math.min(stats.streak, 3)}/3</span>
                )}
              </div>
              <div className={`p-2.5 border-2 border-black rounded-lg flex items-center justify-between ${stats.streak >= 7 ? "bg-amber-100 border-amber-400" : "bg-neutral-50/80"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  <div>
                    <h5 className="font-sans font-black text-[11px] text-black">7-Day Champion</h5>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase">Master Solver 👑</p>
                  </div>
                </div>
                {stats.streak >= 7 ? (
                  <span className="text-[8px] bg-amber-500 border border-black text-black px-1.5 py-0.5 rounded font-black">✓ UNLOCKED</span>
                ) : (
                  <span className="text-[8px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold font-mono">{Math.min(stats.streak, 7)}/7</span>
                )}
              </div>
              <div className={`p-2.5 border-2 border-black rounded-lg flex items-center justify-between ${stats.streak >= 30 ? "bg-indigo-100 border-indigo-400" : "bg-neutral-50/80"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <h5 className="font-sans font-black text-[11px] text-black">30-Day Champ</h5>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase">Absolute Legend 🎓</p>
                  </div>
                </div>
                {stats.streak >= 30 ? (
                  <span className="text-[8px] bg-indigo-500 border border-black text-white px-1.5 py-0.5 rounded font-black">✓ UNLOCKED</span>
                ) : (
                  <span className="text-[8px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold font-mono">{Math.min(stats.streak, 30)}/30</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
