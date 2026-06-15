import { useState, useEffect } from "react";
import { STORY_SLIDES, TOPICS } from "../data";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import { StorySlide } from "../types";
import { Trophy, Compass, RotateCcw, HelpCircle, CheckCircle2, ChevronRight, ArrowLeft, BookOpen, Star, Sparkles } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/AuthContext";

interface StoryViewProps {
  topicId?: string;
  subtopicId?: string;
  onBack?: () => void;
}

export default function StoryView({ topicId: propTopicId, subtopicId: propSubtopicId, onBack }: StoryViewProps) {
  const { stats, updateStats } = useAuth();
  const { t } = useLanguage();

  // Navigation states
  const [selectedTopicId, setSelectedTopicId] = useState<string>(propTopicId || "geom");
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>(propSubtopicId || "geom_kahani");
  const [storyStarted, setStoryStarted] = useState<boolean>(!!propTopicId);

  // Active Story Board State
  const [activeSlides, setActiveSlides] = useState<StorySlide[]>([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [correctionTip, setCorrectionTip] = useState<string | null>(null);
  const [storyCompleted, setStoryCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load 20-scenario story slides
  const loadStorySlides = async (tId: string, sId: string) => {
    setLoading(true);
    const storyId = `${tId}_${sId}`;
    try {
      // 1. Try Firestore cache first
      const docRef = doc(db, "stories", storyId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        if (cloudData && Array.isArray(cloudData.slides) && cloudData.slides.length === 20) {
          setActiveSlides(cloudData.slides);
          setLoading(false);
          return;
        }
      }

      // 2. Query expressive generation API
      const topicName = TOPICS.find(t => t.id === tId)?.name || tId;
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: tId,
          subtopicId: sId,
          topicName,
          subtopicName: sId
        })
      });

      const data = await response.json();
      if (data && Array.isArray(data.slides)) {
        setActiveSlides(data.slides);

        // 3. Store to Cloud Database so "all stories are nicely stored in DB"
        try {
          await setDoc(docRef, {
            id: storyId,
            topicId: tId,
            subtopicId: sId,
            slides: data.slides,
            createdAt: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn("Could not save story slides to cloud firestore:", dbErr);
        }
      } else {
        throw new Error("Invalid story format received");
      }
    } catch (e) {
      console.error("Failed loading 20 subtopic story slides pool:", e);
      // Fallback local shuffle of static data if connection fails
      const fallbackSlides = Array.from({ length: 20 }).map((_, i) => {
        const base = STORY_SLIDES[i % STORY_SLIDES.length];
        return {
          ...base,
          id: `fallback_${storyId}_slide_${i}`,
          title: `${base.title} (Part ${i + 1})`
        };
      });
      setActiveSlides(fallbackSlides);
    } finally {
      setLoading(false);
    }
  };

  const handleStartStory = () => {
    setStoryStarted(true);
    setSlideIdx(0);
    setSelectedIdx(null);
    setIsDone(false);
    setCorrectionTip(null);
    setStoryCompleted(false);
    setCorrectCount(0);
    loadStorySlides(selectedTopicId, selectedSubtopicId);
  };

  // Sync props triggers
  useEffect(() => {
    if (propTopicId && propSubtopicId) {
      setSelectedTopicId(propTopicId);
      setSelectedSubtopicId(propSubtopicId);
      setStoryStarted(true);
      setSlideIdx(0);
      setSelectedIdx(null);
      setIsDone(false);
      setCorrectionTip(null);
      setStoryCompleted(false);
      setCorrectCount(0);
      loadStorySlides(propTopicId, propSubtopicId);
    }
  }, [propTopicId, propSubtopicId]);

  const handleChoiceClick = (choiceIdx: number, choice: any) => {
    setSelectedIdx(choiceIdx);
    setIsDone(true);
    
    if (choice.correct) {
      setCorrectionTip(null);
      setCorrectCount((p) => p + 1);
      // Earn +15 XP!
      updateStats({ xp: stats.xp + 15 });
      
      // Auto-advance after 1.8 seconds on correct answers!
      setTimeout(() => {
        handleNextSlide();
      }, 1800);
    } else {
      setCorrectionTip("Panga re! Lassi wale bhaiya ka correct answer dhoondho. Try another choice!");
    }
  };

  const handleNextSlide = () => {
    if (slideIdx < activeSlides.length - 1) {
      setSlideIdx((p) => p + 1);
      setSelectedIdx(null);
      setIsDone(false);
      setCorrectionTip(null);
    } else {
      setStoryCompleted(true);
    }
  };

  const availableTopic = TOPICS.find(t => t.id === selectedTopicId);
  const availableSubtopics = availableTopic?.subtopics.filter(s => !s.id.includes("video") && !s.id.includes("mastery") && !s.id.includes("panga")) || [];

  // Standalone selector view
  if (!storyStarted) {
    return (
      <div className="bg-white border-4 border-black p-6 sm:p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto font-mono animate-fade-in text-black">
        <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-6">
          <div className="bg-[#22C55E] border-3 border-black p-2.5 rounded-xl text-white shadow-[2.5px_2.5px_0px_black]">
            <BookOpen className="h-6 w-6 stroke-[2.5px]" />
          </div>
          <div>
            <h2 className="text-xl font-sans font-black uppercase tracking-tight">Delhi Streets Math Stories</h2>
            <p className="text-[11px] text-zinc-500 font-bold uppercase mt-0.5">Explore 20 sequential Hinglish mathematical story adventures in ancient Delhi markets.</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-xs font-black">
          {/* Topic Selector */}
          <div>
            <span className="text-zinc-500 uppercase text-[10px] block mb-2 font-black">1. Choose Main Math Topic</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPICS.map((top) => {
                const isSel = selectedTopicId === top.id;
                return (
                  <button
                    key={top.id}
                    onClick={() => {
                      setSelectedTopicId(top.id);
                      const sList = top.subtopics.filter(s => !s.id.includes("video") && !s.id.includes("mastery") && !s.id.includes("panga"));
                      if (sList.length > 0) setSelectedSubtopicId(sList[0].id);
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
              <span className="text-zinc-500 uppercase text-[10px] block mb-2 font-black">2. Select Story Theme Chapter</span>
              <div className="flex flex-wrap gap-2.5">
                {availableSubtopics.map((sub) => {
                  const isSel = selectedSubtopicId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubtopicId(sub.id)}
                      className={`px-3.5 py-2 border-2 rounded-xl cursor-pointer font-extrabold text-[11px] ${
                        isSel ? "bg-[#22C55E] text-white border-black shadow-[2px_2px_0px_black]" : "bg-zinc-50 hover:bg-neutral-100 text-zinc-800"
                      }`}
                    >
                      📖 {sub.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleStartStory}
          className="w-full mt-8 py-4 bg-[#22C55E] hover:bg-green-600 text-white font-sans font-black border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer text-sm"
        >
          <Sparkles className="h-5 w-5 fill-white stroke-[2px]" />
          <span>Listen to Kahani (20 Slides) 📖</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 text-center bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono max-w-sm mx-auto text-black">
        <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-black rounded-full mx-auto mb-4"></div>
        <p className="font-black uppercase tracking-tight text-xs">Assembling full 20-Scenarios Storybook...</p>
        <span className="text-[10px] text-zinc-400 mt-1 block uppercase">Please wait while Bhaiya compiles slides...</span>
      </div>
    );
  }

  if (storyCompleted) {
    return (
      <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto text-center font-mono animate-fade-in text-black">
        <span className="text-7xl my-4 block animate-bounce">🎉</span>
        
        <h2 className="text-2xl font-sans font-black uppercase tracking-tight mb-1">
          {t("storyResultHeadline")}
        </h2>
        <span className="text-zinc-500 uppercase text-[10px] font-black tracking-widest block mb-4">Market Adventure Cleared</span>

        <p className="text-xs text-zinc-600 font-bold mb-6 bg-[#FFECC2] p-4 border-2 border-black rounded-xl">
          "{t("storyFullScore")}"
        </p>

        <div className="bg-emerald-50 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-around items-center my-6">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-black">Solved Scenarios</span>
            <p className="text-2xl font-black text-black">{correctCount} / {activeSlides.length}</p>
          </div>
          <div className="border-r-2 border-black h-10" />
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-black">Total Street XP</span>
            <p className="text-3xl font-black text-[#22C55E]">+{correctCount * 15} XP</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleStartStory}
            className="w-full py-3.5 bg-[#FFD700] hover:bg-[#FFC700] text-black font-sans font-black border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-transform active:translate-y-0.5 text-xs"
          >
            <RotateCcw className="h-5 w-5 stroke-[3px]" />
            <span>Replay this Adventure</span>
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
              onClick={() => setStoryStarted(false)}
              className="py-2.5 uppercase text-xs font-black border-3 border-black rounded-xl bg-white hover:bg-neutral-50 shadow-[3px_3px_0px_black] text-black cursor-pointer"
            >
              ↩ Choose Another Story
            </button>
          )}
        </div>
      </div>
    );
  }

  const activeSlide = activeSlides[slideIdx];

  if (!activeSlide) {
    return (
      <div className="p-8 text-center text-zinc-400 font-bold uppercase text-xs">
        Preparing Story Slide...
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black p-5 sm:p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl mx-auto font-mono animate-fade-in text-black">
      {/* Progression Indicator */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4 text-xs font-bold uppercase text-black">
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
          <span className="flex items-center gap-1 font-black">
            <Compass className="h-4 w-4 text-zinc-800 animate-spin" />
            {t("storyHeaderTitle")}
          </span>
        </div>
        <span className="bg-black text-[#FFC700] border-2 border-black px-3 py-1 rounded-lg text-xs font-black shadow-[2px_2px_0px_black]">
          Scenario {slideIdx + 1} of {activeSlides.length}
        </span>
      </div>

      {/* Narrative Board card */}
      <div className="bg-[#FFECC2] border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5 text-left relative overflow-hidden">
        <div className="flex gap-4 items-start relative z-10">
          <span className="text-4xl bg-white border-3 border-black p-2.5 rounded-2xl shadow-[3px_3px_0px_0px_black] leading-none flex-shrink-0">
            {activeSlide.emoji || "🛺"}
          </span>
          <div className="flex-1">
            <h4 className="font-sans font-black text-xs text-black uppercase mb-1 leading-tight border-b-2 border-black/10 pb-1">
              {activeSlide.title}
            </h4>
            <p className="text-xs leading-relaxed text-black font-semibold italic mt-2 bg-white/45 p-2.5 border-2 border-black/5 rounded-xl">
              "{activeSlide.narration}"
            </p>
          </div>
        </div>
      </div>

      {/* Choice triggers */}
      <div className="flex flex-col gap-3 mb-4">
        {activeSlide.choices?.map((choice, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = choice.correct;
          
          let optionBg = "bg-white hover:bg-neutral-50 border-black shadow-[2px_2px_0px_black]";
          
          if (isDone) {
            if (isCorrect) {
              optionBg = "bg-green-50 border-3 border-[#22C55E] text-green-950 scale-[1.01] shadow-[3px_3px_0px_black]";
            } else if (isSelected) {
              optionBg = "bg-[#FF8A8A] border-3 border-red-650 text-red-950 shadow-[3px_3px_0px_black]";
            } else {
              optionBg = "opacity-45 bg-[#FAFAFA] border-zinc-205 shadow-none";
            }
          } else if (isSelected) {
            optionBg = "bg-[#FFECC2] border-3 border-black text-black font-black shadow-[4px_4px_0px_black] ring-2 ring-black";
          }

          return (
            <button
              key={idx}
              id={`story-option-${idx}-btn`}
              disabled={isDone && isSelected && !isCorrect}
              onClick={() => handleChoiceClick(idx, choice)}
              className={`p-3.5 border-3 rounded-2xl text-left text-xs font-black transition-all cursor-pointer flex items-center justify-between text-black ${optionBg}`}
            >
              <span>{choice.text}</span>
              {isDone && isCorrect && <CheckCircle2 className="h-5 w-5 text-[#22C55E] fill-green-50 flex-shrink-0 ml-2 stroke-[3px]" />}
            </button>
          );
        })}
      </div>

      {/* Feedback notes */}
      {correctionTip && (
        <p className="bg-red-50 text-red-950 border-3 border-red-650 text-xs p-3 rounded-xl mb-4 text-center font-black shadow-[3px_3px_0px_black] animate-fade-in">
          ❗ {correctionTip}
        </p>
      )}

      {/* Slide Progression Control options */}
      <div className="flex justify-end pt-3 border-t-4 border-black">
        <button
          id="story-next-btn"
          disabled={!isDone || (selectedIdx !== null && !activeSlide.choices[selectedIdx]?.correct)}
          onClick={handleNextSlide}
          className={`px-5 py-2.5 text-xs font-black border-3 border-black rounded-xl flex items-center gap-1 shadow-[3px_3px_0px_black] transition-all hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer ${
            isDone && (selectedIdx !== null && activeSlide.choices[selectedIdx]?.correct)
              ? "bg-[#FFC700] text-black"
              : "bg-zinc-100 text-zinc-400 border-zinc-300 cursor-not-allowed shadow-none"
          }`}
        >
          <span>{slideIdx === activeSlides.length - 1 ? "Finish Adventure" : t("nextBtn")}</span>
          <ChevronRight className="h-4 w-4 stroke-[3px]" />
        </button>
      </div>

    </div>
  );
}
