import { useState, useEffect } from "react";
import { QUIZ_QUESTIONS, TOPICS } from "../data";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import { QuizQuestion, DifficultyLevel } from "../types";
import { Sparkles, Trophy, Lightbulb, AlertTriangle, ArrowRight, RotateCcw, ArrowLeft, BookOpen, Brain, Zap } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/AuthContext";
import QuizVisualAid from "./QuizVisualAid";

interface QuizViewProps {
  topicId?: string;
  subtopicId?: string;
  difficulty?: DifficultyLevel;
  onBack?: () => void;
}

export default function QuizView({ topicId: propTopicId, subtopicId: propSubtopicId, difficulty: propDifficulty, onBack }: QuizViewProps) {
  const { stats, updateStats } = useAuth();
  const { t } = useLanguage();

  // Selected Quiz details
  const [selectedTopicId, setSelectedTopicId] = useState<string>(propTopicId || "geom");
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>(propSubtopicId || "geom_bindu");
  const [quizDifficulty, setQuizDifficulty] = useState<DifficultyLevel>(propDifficulty || "intermediate");
  const [quizStarted, setQuizStarted] = useState<boolean>(!!propTopicId);

  // Active Quiz state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load custom 5 questions
  const loadQuizPool = async (tId: string, sId: string, diff: DifficultyLevel) => {
    setLoading(true);
    const quizId = `${tId}_${sId}_${diff}`;
    try {
      // 1. Try fetching from Firestore first
      const docRef = doc(db, "quizzes", quizId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        if (cloudData && Array.isArray(cloudData.questions) && cloudData.questions.length === 5) {
          setActiveQuestions(cloudData.questions);
          setLoading(false);
          return;
        }
      }

      // 2. Fetch/Generate from Express full-stack API
      const topicName = TOPICS.find(t => t.id === tId)?.name || tId;
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: tId,
          subtopicId: sId,
          difficulty: diff,
          topicName,
          subtopicName: sId
        })
      });

      const data = await response.json();
      if (data && Array.isArray(data.questions)) {
        setActiveQuestions(data.questions);

        // 3. Store locally in Cloud DB so "all of them are nicely stored in DB"
        try {
          await setDoc(docRef, {
            id: quizId,
            topicId: tId,
            subtopicId: sId,
            difficulty: diff,
            questions: data.questions,
            createdAt: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn("Could not save quiz schema to cloud firestore (likely guest mode):", dbErr);
        }
      } else {
        throw new Error("Invalid backend questions format received");
      }
    } catch (e) {
      console.error("Failed loading quiz questions:", e);
      // Fallback local shuffle of static data if connection fails
      const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
      setActiveQuestions(shuffled.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  // Setup / start active quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setQuizFinished(false);
    loadQuizPool(selectedTopicId, selectedSubtopicId, quizDifficulty);
  };

  // Listen to Prop updates
  useEffect(() => {
    if (propTopicId && propSubtopicId) {
      setSelectedTopicId(propTopicId);
      setSelectedSubtopicId(propSubtopicId);
      if (propDifficulty) setQuizDifficulty(propDifficulty);
      setQuizStarted(true);
      setCurrentIdx(0);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
      setScore(0);
      setShowHint(false);
      setQuizFinished(false);
      loadQuizPool(propTopicId, propSubtopicId, propDifficulty || "intermediate");
    }
  }, [propTopicId, propSubtopicId, propDifficulty]);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(idx);
  };

  const handleOptionSubmit = () => {
    if (selectedOptionIdx === null || isAnswered) return;
    setIsAnswered(true);

    const curQuest = activeQuestions[currentIdx];
    const isCorrect = selectedOptionIdx === curQuest.correct;
    
    if (isCorrect) {
      setScore((p) => p + 1);
    }
  };

  const handleNextStep = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx((p) => p + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Quiz completed! Award XP for math milestones
      const coinsLooted = score * 10;
      updateStats({
        xp: stats.xp + coinsLooted,
        quizScores: [...stats.quizScores, { score, total: activeQuestions.length, timestamp: Date.now() }]
      });
      setQuizFinished(true);
    }
  };

  // Subtopics available for selected topic
  const availableTopic = TOPICS.find(t => t.id === selectedTopicId);
  const availableSubtopics = availableTopic?.subtopics.filter(s => !s.id.includes("video") && !s.id.includes("mastery") && !s.id.includes("kahani") && !s.id.includes("panga")) || [];

  // Standalone Selection Screen
  if (!quizStarted) {
    return (
      <div className="bg-white border-4 border-black p-6 sm:p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto font-mono animate-fade-in text-black">
        <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-6">
          <div className="bg-[#4D96FF] border-3 border-black p-2.5 rounded-xl text-white shadow-[2.5px_2.5px_0px_black]">
            <Brain className="h-6 w-6 stroke-[2.5px]" />
          </div>
          <div>
            <h2 className="text-xl font-sans font-black uppercase tracking-tight">Active Math Panga Room</h2>
            <p className="text-[11px] text-zinc-500 font-bold uppercase mt-0.5">Quick 5-question CBSE quiz — sharp and focused!</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-xs font-black">
          {/* Difficulty pickers */}
          <div className="bg-zinc-50 border-3 border-black p-4 rounded-xl shadow-[3px_3px_0px_black]">
            <span className="text-zinc-500 uppercase text-[10px] block mb-2 font-black">1. Choose Syllabus Difficulty Level</span>
            <div className="flex flex-wrap gap-2">
              {(["beginner", "intermediate", "expert"] as DifficultyLevel[]).map((lvl) => {
                const label = lvl === "beginner" ? "Class 6" : lvl === "intermediate" ? "Class 7" : "Class 8";
                const isSel = quizDifficulty === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setQuizDifficulty(lvl)}
                    className={`px-4 py-2 border-2 border-black rounded-lg cursor-pointer font-bold ${
                      isSel ? "bg-[#FFC700] text-black shadow-[2px_2px_0px_black]" : "bg-white hover:bg-neutral-50 text-zinc-700"
                    }`}
                  >
                    🎯 {label} ( {lvl.toUpperCase()} )
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Selectors */}
          <div>
            <span className="text-zinc-500 uppercase text-[10px] block mb-2 font-black">2. Select Main Math Topic</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPICS.map((top) => {
                const isSel = selectedTopicId === top.id;
                return (
                  <button
                    key={top.id}
                    onClick={() => {
                      setSelectedTopicId(top.id);
                      // Default to first valid subtopic
                      const subGroup = top.subtopics.filter(s => !s.id.includes("video") && !s.id.includes("mastery") && !s.id.includes("kahani") && !s.id.includes("panga"));
                      if (subGroup.length > 0) setSelectedSubtopicId(subGroup[0].id);
                    }}
                    className={`p-4 border-3 rounded-2xl cursor-pointer text-left transition-all ${
                      isSel ? "bg-[#FFECC0] border-black shadow-[4px_4px_0px_black] scale-[1.01]" : "bg-white hover:bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <h4 className="font-sans font-black text-xs uppercase text-black">{top.name}</h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtopic selectors */}
          {availableSubtopics.length > 0 && (
            <div>
              <span className="text-zinc-500 uppercase text-[10px] block mb-2 font-black">3. Target Math Subtopic Area</span>
              <div className="flex flex-wrap gap-2.5">
                {availableSubtopics.map((sub) => {
                  const isSel = selectedSubtopicId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubtopicId(sub.id)}
                      className={`px-3 py-2 border-2 rounded-xl cursor-pointer font-extrabold text-[11px] ${
                        isSel ? "bg-[#FF6B6B] text-white border-black shadow-[2px_2px_0px_black]" : "bg-zinc-50 hover:bg-neutral-100 text-zinc-800"
                      }`}
                    >
                      {sub.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleStartQuiz}
          className="w-full mt-8 py-4 bg-[#FFC700] hover:bg-[#FFB100] text-black font-sans font-black border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer text-sm"
        >
          <Zap className="h-5 w-5 fill-[#1A1A1A] stroke-[2px]" />
          <span>Start 5-Question Panga ⚔️</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 text-center bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono max-w-sm mx-auto text-black">
        <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-black rounded-full mx-auto mb-4"></div>
        <p className="font-black uppercase tracking-tight text-xs">Loading your 5 questions...</p>
        <span className="text-[10px] text-zinc-400 mt-1 block uppercase">Wait, Maths Dost is setting up cards...</span>
      </div>
    );
  }

  if (quizFinished) {
    const accuracy = Math.round((score / activeQuestions.length) * 100);
    const feedbackMsg = accuracy === 100 
      ? { text: "👑 Bawaal! Full marks! School topper material ho tum!", emoji: "🏆" }
      : accuracy >= 70 
      ? { text: "👏 Bahut badhiya! Mathematics ka maza lassi jaisa hai!", emoji: "⭐️" }
      : { text: "💪 Koi baat nahi doston! Ek bar phir se dhyan se study karte hain!", emoji: "📖" };

    return (
      <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto text-center font-mono animate-fade-in text-black">
        <span className="text-7xl my-3 block animate-bounce">{feedbackMsg.emoji}</span>
        
        <h2 className="text-2xl font-sans font-black uppercase tracking-tight mb-1">
          {t("quizResultsTitle")}
        </h2>
        <span className="text-zinc-500 uppercase text-[10px] font-black tracking-widest block mb-4">Class Quiz Completed</span>

        <p className="text-xs font-black mb-6 italic text-[#FF6B6B] bg-neutral-50 p-3.5 border-2 border-black rounded-xl">
          "{feedbackMsg.text}"
        </p>

        <div className="bg-neutral-50 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-around items-center my-6">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-black">Total Accuracy</span>
            <p className="text-2xl font-black text-black">{score} / {activeQuestions.length}</p>
            <span className="text-[10px] bg-sky-100 border border-sky-400 text-sky-950 px-2 rounded-full mt-1 inline-block font-extrabold">{accuracy}%</span>
          </div>
          <div className="border-r-2 border-black h-12" />
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-black">Xp Coins Added</span>
            <p className="text-3xl font-black text-[#22C55E]">+{score * 10} XP</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleStartQuiz}
            className="w-full py-3.5 bg-[#FFD700] hover:bg-[#FFC700] text-black font-sans font-black border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-transform active:translate-y-0.5 text-xs"
          >
            <RotateCcw className="h-5 w-5 stroke-[3px]" />
            <span>Try Another 5-Question Panga</span>
          </button>

          {onBack ? (
            <button
              onClick={onBack}
              className="py-2.5 uppercase text-xs font-black border-3 border-black rounded-xl bg-white hover:bg-neutral-50 shadow-[3px_3px_0px_black] text-black cursor-pointer"
            >
              ↩ Return to Learning Map
            </button>
          ) : (
            <button
              onClick={() => setQuizStarted(false)}
              className="py-2.5 uppercase text-xs font-black border-3 border-black rounded-xl bg-white hover:bg-neutral-50 shadow-[3px_3px_0px_black] text-black cursor-pointer"
            >
              ↩ Choose Another Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIdx];
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="bg-white border-4 border-black p-5 sm:p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl mx-auto font-mono animate-fade-in text-black">
      {/* Header controls */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4 text-xs font-bold">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="mr-1 p-1 bg-neutral-100 hover:bg-neutral-200 border-2 border-black rounded-lg cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="h-4 w-4 stroke-[3.5px]" />
            </button>
          )}
          <span className="text-black uppercase tracking-tight font-black flex items-center gap-1">
            🎲 Active Math Panga
          </span>
        </div>
        <span className="bg-[#4D96FF] text-white border-2 border-black px-3 py-1 rounded-lg text-[10px] font-black shadow-[2px_2px_0px_black] uppercase">
          Question {currentIdx + 1} of {activeQuestions.length}
        </span>
      </div>

      {/* Progress slider bar */}
      <div className="h-3 w-full bg-zinc-150 border-2 border-black rounded-lg mb-5 overflow-hidden">
        <div 
          className="h-full bg-[#22C55E] transition-all duration-300" 
          style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Active Question Statement */}
      <h3 className="font-sans font-black text-sm leading-relaxed text-black bg-amber-50/50 p-4 border-3 border-black rounded-2xl mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {currentQuestion?.question}
      </h3>

      {/* Dynamic Creative Math Visual Aid Representation */}
      {currentQuestion && (
        <div id="quiz-visual-aid-container" className="mb-5 animate-fade-in shadow-[3px_3px_0px_black] rounded-2xl overflow-hidden border-3 border-black">
          <QuizVisualAid question={currentQuestion} />
        </div>
      )}

      {/* Answer Options list */}
      <div className="flex flex-col gap-3 mb-5">
        {currentQuestion?.options.map((opt, idx) => {
          const isSelected = selectedOptionIdx === idx;
          const isCorrectIdx = idx === currentQuestion.correct;
          
          let btnBorderClass = "border-black bg-white shadow-[2px_2px_0px_black]";
          let circleColorClass = "bg-neutral-100 text-black";

          // Feedback visual highlight styles
          if (isAnswered) {
            if (isCorrectIdx) {
              btnBorderClass = "bg-green-50 border-3 border-[#22C55E] text-green-950 scale-[1.01] shadow-[3px_3px_0px_black]";
              circleColorClass = "bg-[#22C55E] text-white";
            } else if (isSelected) {
              btnBorderClass = "bg-[#FF8A8A] border-3 border-red-650 text-red-950 shadow-[3px_3px_0px_black]";
              circleColorClass = "bg-red-500 text-white";
            } else {
              btnBorderClass = "border-zinc-200 opacity-60 bg-[#FAFAFA] shadow-none";
            }
          } else if (isSelected) {
            btnBorderClass = "border-black bg-[#FFECC2] ring-2 ring-black shadow-[4px_4px_0px_black]";
            circleColorClass = "bg-black text-[#FFC700]";
          }

          return (
            <button
              key={idx}
              id={`quiz-option-${idx}-btn`}
              disabled={isAnswered}
              onClick={() => handleOptionClick(idx)}
              className={`w-full p-3 border-3 rounded-2xl text-xs text-left font-black flex items-center gap-3 transition-all text-black ${
                !isAnswered ? "hover:bg-neutral-50 cursor-pointer active:translate-x-0.5" : "cursor-default"
              } ${btnBorderClass}`}
            >
              <span className={`h-7 w-7 rounded-lg border-2 border-black font-sans font-black flex items-center justify-center flex-shrink-0 text-xs ${circleColorClass}`}>
                {optionLetters[idx]}
              </span>
              <span className="leading-tight">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Hint panel drawer */}
      {showHint && (
        <div className="bg-amber-50 border-3 border-black p-4 rounded-xl mb-5 flex gap-3 animate-fade-in text-xs font-mono text-black leading-relaxed shadow-[3px_3px_0px_black]">
          <Lightbulb className="h-6 w-6 text-[#FFC700] fill-[#FFC700] flex-shrink-0" />
          <div>
            <p className="font-black text-xs text-amber-950">Maths Dost ki Hint:</p>
            <p className="font-bold italic mt-0.5 text-zinc-700">"{currentQuestion?.hint}"</p>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div className="flex items-center justify-between gap-3 border-t-4 border-black pt-4 flex-wrap">
        <button
          id="quiz-hint-btn"
          disabled={isAnswered}
          onClick={() => setShowHint(!showHint)}
          className={`px-4 py-2 text-[10px] font-black border-3 border-black rounded-lg cursor-pointer transform active:translate-y-0.5 shadow-[2px_2px_0px_black] ${
            showHint 
              ? "bg-[#FFE4B5] text-black" 
              : "bg-white hover:bg-neutral-50 text-black"
          } ${isAnswered ? "opacity-30 cursor-not-allowed shadow-none" : ""}`}
        >
          💡 Hint de do Maths Dost!
        </button>

        <div className="flex gap-2">
          {!isAnswered ? (
            <button
              id="quiz-submit-btn"
              disabled={selectedOptionIdx === null}
              onClick={handleOptionSubmit}
              className={`px-5 py-2 border-3 border-black rounded-lg font-sans font-black text-xs uppercase shadow-[2.5px_2.5px_0px_black] transition-transform active:translate-y-0.5 cursor-pointer ${
                selectedOptionIdx !== null 
                  ? "bg-[#FFC700] hover:bg-[#FFB100] text-black" 
                  : "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
              }`}
            >
              🚀 Confirm Answer
            </button>
          ) : (
            <button
              id="quiz-next-btn"
              onClick={handleNextStep}
              className="px-5 py-2 bg-black text-[#FFC700] hover:bg-zinc-850 border-3 border-black rounded-lg font-sans font-black text-xs uppercase shadow-[2.5px_2.5px_0px_green] flex items-center gap-1 cursor-pointer transition-transform active:translate-y-0.5"
            >
              <span>{currentIdx < activeQuestions.length - 1 ? t("nextBtn") : "Check Score"}</span>
              <ArrowRight className="h-4 w-4 stroke-[3px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
