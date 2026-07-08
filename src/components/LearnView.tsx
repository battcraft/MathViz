import { useState, useEffect } from "react";
import { TOPICS, getProceduralScreens } from "../data";
import { getLevelContent, isTopicRegistered } from "../data/index";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import { Screen, Topic, Subtopic, DifficultyLevel, StorySlide } from "../types";
import VideoPlayer from "./VideoPlayer";
import VoiceInput from "./VoiceInput";
import QuizView from "./QuizView";
import StoryView from "./StoryView";
import { ArrowLeft, Check, Eye, HelpCircle, Trophy, Sparkles, Mic, PlayCircle, BookOpen, Dumbbell, Award, ArrowRight, Compass, ShieldAlert } from "lucide-react";
import QuizVisualAid from "./QuizVisualAid";
import StoryVisualAid from "./StoryVisualAid";
import { generateInteractiveSrcDoc as generateInteractiveSrcDocHelper } from "./CustomSimulators";
import { getPracticeDrillVariants, getStoryQuestVariants, getConceptQuizVariants } from "../variants";
import InteractiveSandbox from "./InteractiveSandbox";
import { injectConceptTooltips } from "./MicroConceptTooltip";
import GeometrySkillsHub from "./GeometrySkillsHub";
import MaxMinSkillsHub from "./MaxMinSkillsHub";
import CompareSkillsHub from "./CompareSkillsHub";

interface LearnViewProps {
  difficulty: DifficultyLevel;
}

export default function LearnView({ difficulty }: LearnViewProps) {
  const { stats, updateStats } = useAuth();
  const { t, language } = useLanguage();

  // Navigation Drill States
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [screensList, setScreensList] = useState<Screen[]>([]);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  // Modular 5-step concept quest flow states
  const [activeQuestStep, setActiveQuestStep] = useState<"overview" | "video" | "concept" | "practice" | "story" | "quiz" | "mastery">("overview");
  const [classLevelLabel, setClassLevelLabel] = useState<string | null>(null);
  const [questQuizIdx, setQuestQuizIdx] = useState(0);
  const [questQuizScore, setQuestQuizScore] = useState(0);
  const [questQuizAnswered, setQuestQuizAnswered] = useState(false);
  const [questQuizOpt, setQuestQuizOpt] = useState<number | null>(null);
  const [questStoryAnswered, setQuestStoryAnswered] = useState(false);
  const [questStoryOpt, setQuestStoryOpt] = useState<number | null>(null);
  const [conceptSlideIdx, setConceptSlideIdx] = useState(0);
  const [questQuizQuestions, setQuestQuizQuestions] = useState<any[]>([]);
  const [questQuizLoading, setQuestQuizLoading] = useState(false);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  // Trigger loading procedural screens if we enter deep learning subtopics
  useEffect(() => {
    if (selectedTopic && selectedSubtopic) {
      // Try the new level-specific content system first
      let list: Screen[] = [];
      let newClassLevel: string | null = null;

      if (isTopicRegistered(selectedTopic.id)) {
        try {
          const levelContent = getLevelContent(selectedTopic.id, difficulty);
          // Find the subtopic in the new content that matches the selected subtopic ID
          const matchedSubtopic = levelContent.subtopics.find(
            (s) => s.id === selectedSubtopic.id
          );

          if (matchedSubtopic && matchedSubtopic.screens.length > 0) {
            // Convert new ConceptScreen format to old Screen format
            list = matchedSubtopic.screens.map((cs) => ({
              id: cs.id,
              title: cs.title,
              topicId: selectedTopic.id,
              subtopicId: selectedSubtopic.id,
              conceptHeading: cs.conceptHeading,
              explanation: cs.explanation,
              interactiveType: cs.interactiveType,
              pangaHint: cs.pangaHint,
            }));
            newClassLevel = levelContent.classLevel;
          }
        } catch {
          // If new system fails, fall through to old system
        }
      }

      // Fallback to old procedural system if new system returned nothing
      if (list.length === 0) {
        list = getProceduralScreens(selectedTopic.id, selectedSubtopic.id);
        newClassLevel = null;
      }

      setScreensList(list);
      setClassLevelLabel(newClassLevel);
      setCurrentScreenIndex(0);
      setActiveQuestStep("overview");
      setQuestQuizIdx(0);
      setQuestQuizScore(0);
      setQuestQuizAnswered(false);
      setQuestQuizOpt(null);
      setQuestStoryAnswered(false);
      setQuestStoryOpt(null);
      setConceptSlideIdx(0);
      setActiveVariantIndex(0);
    }
  }, [selectedTopic, selectedSubtopic, difficulty]);

  // Track screen viewing instantly on load
  const activeScreen = screensList[currentScreenIndex];
  useEffect(() => {
    if (activeScreen) {
      if (!stats.screensViewed.includes(activeScreen.id)) {
        const nextViewedList = [...stats.screensViewed, activeScreen.id];
        updateStats({ screensViewed: nextViewedList });
      }
    }
  }, [activeScreen, stats.screensViewed, updateStats]);

  // postMessage Listener for capturing events from inside sandboxed iframe srcDocs
  useEffect(() => {
    const handleMessageEvent = (e: MessageEvent) => {
      const data = e.data;
      if (data && data.type === "COMPLETE_SCREEN" && data.screenId) {
        handleMarkScreenComplete(data.screenId);
      }
    };
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, [stats.completedScreens, stats.xp]);

  // Handle Voice Commands
  const handleVoiceCommand = (comm: "next" | "prev" | "done") => {
    if (comm === "next" && currentScreenIndex < screensList.length - 1) {
      setCurrentScreenIndex((p) => p + 1);
    } else if (comm === "prev" && currentScreenIndex > 0) {
      setCurrentScreenIndex((p) => p - 1);
    } else if (comm === "done" && activeScreen) {
      handleMarkScreenComplete(activeScreen.id);
    }
  };

  const handleMarkScreenComplete = (screenId: string) => {
    if (!stats.completedScreens.includes(screenId)) {
      const nextDoneList = [...stats.completedScreens, screenId];
      
      let rewardXp = 5;
      if (screenId.includes("_step_practice")) {
        rewardXp = 20;
      } else if (screenId.includes("_step_story")) {
        rewardXp = 25;
      } else if (screenId.includes("_step_quiz")) {
        rewardXp = 30;
      } else if (screenId.includes("_step_mastery")) {
        rewardXp = 50;
      } else if (screenId.includes("_step_concept")) {
        rewardXp = 15;
      } else if (screenId.includes("_practice_variant_")) {
        rewardXp = 20;
        // Auto-complete the parent practice step key
        if (selectedTopic && selectedSubtopic) {
          const practiceKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_practice`;
          if (!nextDoneList.includes(practiceKey)) {
            nextDoneList.push(practiceKey);
          }
        }
      } else if (screenId.includes("_story_variant_") || screenId.includes("_story_slide_")) {
        rewardXp = 25;
        // Auto-complete the parent story step key
        if (selectedTopic && selectedSubtopic) {
          const storyKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_story`;
          if (!nextDoneList.includes(storyKey)) {
            nextDoneList.push(storyKey);
          }
        }
      }

      updateStats({
        completedScreens: nextDoneList,
        xp: stats.xp + rewardXp
      });
    }
  };

  // Generate Interactive srcDoc text matching the topic and type!
  const generateInteractiveSrcDoc = (screen: Screen) => {
    return generateInteractiveSrcDocHelper(screen, stats.completedScreens, difficulty);
  };


  // Render Topic List Select
  if (!selectedTopic) {
    return (
      <div className="flex flex-col gap-4 animate-fade-in pb-12">
        <h3 className="font-sans font-black text-lg text-black uppercase tracking-tight mb-2">
          📚 {t("selectTopicPrompt")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOPICS.map((topic) => {
            const relevantSubs = topic.subtopics.filter(sub => !sub.id.includes("_video") && !sub.id.includes("_skills") && !sub.id.includes("_panga") && !sub.id.includes("_kahani") && !sub.id.includes("_mastery") && (() => {
              const id = sub.id;
              if (difficulty === "beginner") return !id.includes("_kiran") && !id.includes("_shikhar") && !id.includes("_range") && !id.includes("_rounding") && !id.includes("_place") && !id.includes("_order");
              if (difficulty === "intermediate") return !id.includes("_order");
              return true;
            })());
            let completedCount = 0;
            relevantSubs.forEach((sub) => {
              const steps = ["_step_video", "_step_concept", "_step_practice", "_step_story", "_step_quiz", "_step_mastery"];
              steps.forEach((st) => {
                if (stats.completedScreens.includes(`${topic.id}_${sub.id}${st}`)) {
                  completedCount++;
                }
              });
            });
            // Fallback for legacy completeness compatibility
            const legacy = stats.completedScreens.filter((s) => s.startsWith(topic.id) && !s.includes("_step_")).length;
            const totalCount = relevantSubs.length * 6;
            const percentage = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

            return (
              <button
                key={topic.id}
                id={`topic-card-${topic.id}`}
                onClick={() => setSelectedTopic(topic)}
                className="bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left hover:scale-[1.03] active:translate-y-0.5 cursor-pointer transition-all flex flex-col justify-between h-48"
              >
                <div>
                  <h4 className="font-sans font-black text-sm sm:text-base text-black uppercase tracking-tight mb-2">
                    {topic.name}
                  </h4>
                  <p className="text-xs text-zinc-600 font-bold leading-normal">
                    Includes classes syllabus standards and interactive visual lessons
                  </p>
                </div>

                <div className="w-full">
                  <div className="flex justify-between font-mono text-[10px] font-black text-zinc-700 mb-1 leading-none uppercase">
                    <span>Topic Progress</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-zinc-100 border-2 border-black rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-[#FFC700]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Render Subtopic List Select with sequential Roadmap Flow!
  if (!selectedSubtopic) {
    // Sort or order the subtopics to represent a perfect learning flow for students
    const sortedSubtopics = [...selectedTopic.subtopics].sort((a, b) => {
      const getWeight = (s: Subtopic) => {
        if (s.id.includes("_video")) return 0;
        if (s.id.includes("_basics") || s.id.includes("_bindu")) return 1;
        if (s.id.includes("_rekha")) return 2;
        if (s.id.includes("_khand")) return 3;
        if (s.id.includes("_kiran")) return 4;
        if (s.id.includes("_shikhar")) return 5;
        if (s.id.includes("_max")) return 1;
        if (s.id.includes("_min")) return 2;
        if (s.id.includes("_range")) return 3;
        if (s.id.includes("_decimals")) return 2;
        if (s.id.includes("_rounding")) return 3;
        if (s.id.includes("_place")) return 4;
        if (s.id.includes("_order")) return 5;
        if (s.id.includes("_practice")) return 7;
        if (s.id.includes("_kahani")) return 8;
        if (s.id.includes("_panga")) return 9;
        if (s.id.includes("_mastery")) return 10;
        return 6;
      };
      return getWeight(a) - getWeight(b);
    });

    // Filter subtopics by difficulty (class 6/7/8)
    const isDifficultyAppropriate = (sub: Subtopic): boolean => {
      const id = sub.id;
      // Beginner (Class 6): basic concepts
      if (difficulty === "beginner") {
        return !id.includes("_kiran") && !id.includes("_shikhar") && !id.includes("_skills")
          && !id.includes("_range") && !id.includes("_rounding") && !id.includes("_place")
          && !id.includes("_order");
      }
      // Intermediate (Class 7): mid-level concepts
      if (difficulty === "intermediate") {
        return !id.includes("_skills") && !id.includes("_order");
      }
      // Expert (Class 8): everything including skills
      return true;
    };

    const videoSubtopics = sortedSubtopics.filter(sub => sub.id.includes("_video") && isDifficultyAppropriate(sub));
    const conceptSubtopics = sortedSubtopics.filter(sub => !sub.id.includes("_video") && !sub.id.includes("_skills") && isDifficultyAppropriate(sub));

    return (
      <div className="flex flex-col gap-6 animate-fade-in pb-12 text-black font-mono">
        <button
          id="learn-back-topics-btn"
          onClick={() => setSelectedTopic(null)}
          className="flex items-center gap-1.5 text-xs font-sans font-black text-black border-3 border-black p-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 shadow-[4px_4px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_black] self-start cursor-pointer transition-all"
        >
          <ArrowLeft className="h-4 w-4 stroke-[3.5px]" />
          <span>{t("backToTopics")}</span>
        </button>

        {/* Dynamic RoadMap Banner heading with Bento touch */}
        <div className="bg-[#FFECC2] border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider bg-white px-2 py-0.5 border border-black rounded inline-block mb-1.5">
              Active Syllabus Map
            </span>
            <h3 className="font-sans font-black text-xl text-black uppercase tracking-tight leading-tight">
              📂 {selectedTopic.name}
            </h3>
            <p className="text-[11px] text-zinc-650 font-bold mt-1">
              Watch the video class first, then complete each micro-concept below to unlock overall Mastery!
            </p>
          </div>
          {/* Micro XP counter */}
          <div className="bg-white border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_black] flex items-center gap-2.5 self-start md:self-auto flex-shrink-0">
            <Trophy className="h-5 w-5 text-[#FFC700] stroke-[2.5px]" />
            <div>
              <span className="text-[9px] uppercase font-black text-zinc-400 block leading-none">Class Stats</span>
              <span className="text-xs font-black text-black">{stats.completedScreens.length} Sheets Cleared</span>
            </div>
          </div>
        </div>

        {/* 🎥 Featured Interactive Video Lesson Banner Section */}
        {videoSubtopics.length > 0 && (
          <div className="bg-[#FFFDF0] border-4 border-black p-6 rounded-3xl shadow-[6px_6px_0px_black] flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-left">
              <div className="bg-[#FFD700] border-3 border-black p-3.5 rounded-2xl shadow-[3.5px_3.5px_0px_black] shrink-0">
                <PlayCircle className="h-9 w-9 text-black stroke-[2.5px]" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-black text-amber-600 tracking-wider font-mono block mb-0.5 bg-yellow-105 border border-yellow-400 px-1.5 py-0.5 rounded inline-block">
                  Featured Video Lesson 🎬
                </span>
                <h4 className="font-sans font-black text-base text-black uppercase tracking-tight">
                  {videoSubtopics[0].name}
                </h4>
                <p className="text-[11px] text-zinc-650 font-extrabold mt-1 max-w-md leading-relaxed">
                  Watch Rekha Didi's high-octane Hinglish story animation to master this topic's street-smart fundamentals!
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0 border-t border-black/5 md:border-none pt-3 md:pt-0">
              {(() => {
                const completedInSub = stats.completedScreens.filter((s) => s.startsWith(selectedTopic.id) && s.includes(videoSubtopics[0].id)).length;
                const isCleared = completedInSub > 0;
                return (
                  <>
                    <div className="text-left md:text-right font-mono text-[10px] font-black w-full sm:w-auto">
                      <span className="text-zinc-600 uppercase block">{isCleared ? "✓ CLASS COMPLETED" : "NOT WATCHED YET"}</span>
                      <div className="h-2.5 w-24 bg-zinc-200 border-2 border-black rounded overflow-hidden mt-1 inline-block">
                        <div className="h-full bg-[#22C55E]" style={{ width: isCleared ? "100%" : "0%" }} />
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSubtopic(videoSubtopics[0])}
                      className="w-full sm:w-auto px-5 py-3.5 bg-black text-[#FFC700] hover:bg-neutral-800 border-3 border-black rounded-xl font-sans font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_green] flex items-center justify-center gap-2 cursor-pointer transition-transform active:translate-y-0.5"
                    >
                      <PlayCircle className="h-4.5 w-4.5" />
                      <span>Start Class Video 🎬</span>
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* 📚 Separation Header */}
        <div className="text-left border-b-4 border-black pb-2 mt-4">
          <h4 className="font-sans font-black text-sm uppercase tracking-tight text-neutral-800 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#FF6B6B]" />
            <span>Interactive Concept & Practice Milestones ({conceptSubtopics.length} steps)</span>
          </h4>
        </div>

        {/* The visual timeline trail */}
        <div className="relative flex flex-col gap-5 mt-2">
          {/* Behind connective rail line */}
          <div className="absolute left-[26px] top-4 bottom-4 w-1.5 bg-black rounded-full block" />

          {conceptSubtopics.map((sub, idx) => {
            const steps = ["_step_video", "_step_concept", "_step_practice", "_step_story", "_step_quiz", "_step_mastery"];
            const completedCount = steps.filter(st => stats.completedScreens.includes(`${selectedTopic.id}_${sub.id}${st}`)).length;
            const percentageSub = Math.round((completedCount / 6) * 100);

            const isPractice = sub.id.includes("_practice");
            const isStory = sub.id.includes("_kahani");
            const isQuiz = sub.id.includes("_panga");
            const isMastery = sub.id.includes("_mastery");

            let cardBg = "bg-white hover:bg-neutral-50";
            let stepLabel = `Step ${idx + 1}: Concept Practice`;
            let description = "Read interactive slides and run dynamic coordinate grids.";

            if (isPractice) {
              cardBg = "bg-purple-50/40 hover:bg-purple-50/70";
              stepLabel = `Step ${idx + 1}: Practice Arena 🏋️`;
              description = "Drag live coordinate systems, test lines, and input integers.";
            } else if (isStory) {
              cardBg = "bg-emerald-50/40 hover:bg-emerald-50/70";
              stepLabel = `Step ${idx + 1}: Story Adventure 📖`;
              description = "Explore 5 sequential real-world bargaining story situations across India.";
            } else if (isQuiz) {
              cardBg = "bg-blue-50/40 hover:bg-blue-50/70";
              stepLabel = `Step ${idx + 1}: Ultimate Panga Quiz 🎯`;
              description = "Quick 5-question CBSE quiz — sharp and focused!";
            } else if (isMastery) {
              cardBg = "bg-amber-50/60 hover:bg-amber-100/40";
              stepLabel = "Final Milestone: Mastery Area 🏆";
              description = "Generate your class completion credentials and unlock bonus math swag points!";
            } else {
              stepLabel = `Step ${idx + 1}: Concept Sheet 💡`;
            }

            return (
              <div 
                key={sub.id} 
                className="flex items-start gap-4 relative"
              >
                {/* Number bullet index along vertical connector line */}
                <div className={`h-[58px] w-[58px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center font-black text-sm text-black shadow-[2px_2px_0px_black] ${
                  percentageSub === 100 ? "bg-[#22C55E]" : isStory ? "bg-[#10B981]" : isQuiz ? "bg-[#4D96FF]" : "bg-white"
                }`}>
                  {percentageSub === 100 ? "✓" : idx + 1}
                </div>

                {/* Subtopic details bento block card */}
                <button
                  id={`subtopic-card-${sub.id}`}
                  onClick={() => setSelectedSubtopic(sub)}
                  className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[5px_5px_0px_black] active:translate-y-0.5 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardBg}`}
                >
                  <div className="flex-1">
                    <span className="text-[9px] uppercase font-black text-zinc-400 block leading-tight mb-0.5">{stepLabel}</span>
                    <h4 className="font-sans font-black text-sm uppercase tracking-tight text-black">{sub.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Right hand progress and start trigger */}
                  <div className="flex items-center gap-4 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                    <div className="flex flex-col items-end gap-1 font-mono text-[10px] font-black">
                      <span className="text-zinc-700">{percentageSub}% CLEARED</span>
                      <div className="h-2.5 w-20 bg-zinc-200 border-2 border-black rounded overflow-hidden">
                        <div className="h-full bg-[#22C55E]" style={{ width: `${percentageSub}%` }} />
                      </div>
                    </div>
                    <div className="p-1.5 bg-black text-[#FFC700] rounded-xl border-2 border-black shadow-[2px_2px_0px_black] flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 stroke-[3.5px]" />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- INTEGRATED CONCEPT QUEST CONSTANTS FOR THE 5-STEP CORE FLOW ---
  const CONCEPT_STORIES: Record<string, { title: string; story: string; options: string[]; correct: number; explanation: string }> = {
    geom_bindu: {
      title: "📍 Gali Lockers Map Marker",
      story: "Tara has to meet a supplier at a narrow coordinate corner in Chandni Chowk! The digital map shows several streets crossing, but the meet-up spot is a single exact coordinate dot with zero physical size. Tara asks: 'How does this point look mathematically?'",
      options: ["Point (Bindu) - has zero size, only position!", "Infinite Rekha stretching both sides", "Line Segment measuring exactly 15 meters"],
      correct: 0,
      explanation: "Excellent! A Point (Bindu) indicates an exact location with zero dimensions—no length, width, or height!"
    },
    geom_rekha: {
      title: "🛣️ The Endless Metro Tracks",
      story: "A Mumbai Metro railway designer is examining train blueprints. The steel tracks are designed straight, extending infinitely in both directions so trains can travel indefinitely. Maths Dost asks: 'Tara, what geometric entity runs endlessly with no endpoints?'",
      options: ["A simple point (Bindu)", "An infinite Rekha (Line)!", "A narrow line segment with ends"],
      correct: 1,
      explanation: "Waah! A Line (Rekha) is a 1D concept stretching infinitely without boundary endpoints!"
    },
    geom_khand: {
      title: "📏 Samosa Box Tape Ribbon",
      story: "A shopkeeper at Haldiram is sealing a delivery carton of fresh hot samosas. He cuts a piece of yellow adhesive tape that goes from point A on the left flap directly to point B on the right flap, measuring exactly 12 cm. What is this?",
      options: ["An infinite line", "A Line Segment (Khand) - has 2 fixed endpoints!", "A zero-dimensional point"],
      correct: 1,
      explanation: "Correct! A Line Segment (Khand) is a fixed slice of a line with two precise, defined boundaries."
    },
    geom_kiran: {
      title: "🔦 Red Laser Beam Pointer",
      story: "During Diwali lights in Kolkata, Rohan plays with a rechargeable red laser pointer. The bright beam originates at the pointer lens in his hand, and shoots straight forward infinitely into the dark night sky. What structure is this?",
      options: ["A Ray (Kiran) - starts at 1 point, flies straight to infinity!", "A Line segment with two endpoints", "A zero-dimensional point"],
      correct: 0,
      explanation: "Sahi pakde! A Ray (Kiran) originates at one single vertex point and projects infinitely in one direction."
    },
    geom_shikhar: {
      title: "📐 The Samosa Corner Apex",
      story: "Tara points to the delicious triangular shape of her plate's hot samosa. She notices that the two straight crispy borders meet at a pointy corner apex. Maths Dost asks: 'What is this corner vertex named in geometry?'",
      options: ["Parallel Line", "A Shikhar (Vertex) - the meeting point of angles!", "An infinite ray"],
      correct: 1,
      explanation: "Shabaash! The vertex (Shikhar) is the precise corner intersection point where sides or lines meet to form an angle!"
    },
    maxmin_max: {
      title: "📈 IPL Scores Peak Auction",
      story: "Rohan is tracking daily team run rates to see who is the ruler of the pitch. Royal Challengers Bangalore scored 210 runs, Mumbai scored 195, and Chennai scored 220. What is the Maximum value in this performance set?",
      options: ["195 runs", "210 runs", "220 runs - the peak maximum champion!", "They are equivalent"],
      correct: 2,
      explanation: "Fantastic! Maximum (Uchhatam) is the largest value in the comparative dataset!"
    },
    maxmin_min: {
      title: "📉 Cold Lassi Freezing Points",
      story: "A shopkeeper at Chandni Chowk monitors his freezer logs: -8°C, -12°C, and -2°C. He wants to know when the ice is coldest. What is the Minimum value in this set?",
      options: ["-2°C", "-8°C", "-12°C - furthest left, absolute minimum!", "0°C"],
      correct: 2,
      explanation: "Sahi! -12°C is the coldest (least) value because it represents the highest debt on the number line."
    },
    maxmin_range: {
      title: "📏 Samosa Price Range (Fasla)",
      story: "At the local bazaar, the lowest rate for a potato samosa is Rs. 10 (Minimum), and the premium paneer samosa is Rs. 35 (Maximum). Rohan wants to find the 'Fasla' or Range. How do you calculate it?",
      options: ["Rs. 25 (Maximum Rs. 35 minus Minimum Rs. 10)!", "Rs. 45 (Adding both prices)", "Rs. 10"],
      correct: 0,
      explanation: "Awesome! Range is the overall interval span, calculated as Max Value - Min Value!"
    },
    compare_basics: {
      title: "🐊 Gator Hunger Compare",
      story: "The market crocodile gator is extremely hungry and wants to eat the larger amount of coins: -42 coins or -18 coins. Which one is larger and richer?",
      options: ["-42 coins", "-18 coins is larger (less debt!)", "They are same"],
      correct: 1,
      explanation: "Perfect! -18 represents less debt, so it is mathematically larger than -42!"
    },
    compare_decimals: {
      title: "🍹 Lassi Price Decimal Battle",
      story: "Stall A sells sweet saffron lassi for Rs. 40.50, and Stall B sells it for Rs. 40.05. You have exactly Rs. 40.25 in your pocket hook. Which stall fits your budget?",
      options: ["Stall A (Rs. 40.50)", "Stall B (Rs. 40.05 is cheaper and fits your budget!)", "Both are too cheap"],
      correct: 1,
      explanation: "Spot-on! Rs. 40.05 is smaller than Rs. 40.25 (since 5 hundredths is less than 25 hundredths)!"
    },
    compare_rounding: {
      title: "🛒 Chhota-Bheem Grocery Bill",
      story: "At Laxmi Nagar General Store, Rohan buys snacks worth Rs. 94.60. The shopkeeper says: 'Beta, round it off to the nearest Rupee integer and give change.' Rohan asks: 'Do I pay Rs. 94 or Rs. 95?'",
      options: ["Rs. 94", "Rs. 95 (since 60 paise is >= 50 paise, round UP!)", "Rs. 94.60 exactly in coins"],
      correct: 1,
      explanation: "Sahi! 60 paise is greater than or equal to 50 paise, so we round UP to Rs. 95!"
    },
    compare_place: {
      title: "🔐 Karol Bagh Safe Code",
      story: "Tara is helping her uncle lock a secure document locker with passcode 38,419. Her uncle says: 'Tell me the place value of the digit 8.' What is the correct value of the thousands column digit?",
      options: ["80 units", "800 units", "8,000 units (it is in the Thousands position!)"],
      correct: 2,
      explanation: "Shabaash! The digit 8 is in the Thousands (Hazaar) place, meaning its value is 8,000!"
    },
    compare_order: {
      title: "🧗 Feroz Shah Kotla Stairs",
      story: "Rohan is climbing down a historic stepwell. He sees floor levels inscribed with integer codes: [12, -4, 0, -15]. He wants to organize them in ascending order (deepest negative ledger first). Help Rohan!",
      options: ["[-15, -4, 0, 12] (Smallest/deepest first!)", "[12, 0, -4, -15]", "[0, -4, 12, -15]"],
      correct: 0,
      explanation: "Dil khush kar diya! -15 is the smallest (deepest) value, followed by -4, then 0, and lastly 12."
    }
  };

  const CONCEPT_QUIZZES: Record<string, { question: string; options: string[]; correct: number; hint: string }[]> = {
    geom_bindu: [
      { question: "How many dimensions does a standard Bindu (Point) possess?", options: ["0 dimensions", "1 dimension", "2 dimensions", "3 dimensions"], correct: 0, hint: "A point only has position, so it has no length or width (0D)." },
      { question: "Which label is mathematically correct for naming point grids?", options: ["Capital letter like A", "Digits like 7", "Equations like x=1", "Symbols like #"], correct: 0, hint: "Points are always represented by Uppercase capital letters." },
      { question: "If you zoom in infinitely on a geometric Point, what do you see?", options: ["An infinite line", "Nothing, it remains a dot of zero physical size", "A circle with radius", "A square"], correct: 1, hint: "A point has no size, so it has no radius." }
    ],
    geom_rekha: [
      { question: "How many endpoints does an infinite Rekha (Line) have?", options: ["0 endpoints", "1 endpoint", "2 endpoints", "Infinite"], correct: 0, hint: "A line has no ends because it extends indefinitely on both left and right directions." },
      { question: "Two lines on a writing notebook that keep equal distance and never cross are:", options: ["Perpendicular lines", "Parallel lines", "Converging lines", "Rays"], correct: 1, hint: "Lines that maintain uniform space and never cross are Parallel." },
      { question: "What is a line with two arrows at the overhead of letters AB indicating?", options: ["Ray", "Line Segment", "Infinite Line AB", "Corner Vertex"], correct: 2, hint: "Two-headed arrows represent infinite extension." }
    ],
    geom_khand: [
      { question: "A Line Segment (Khand) represents what property?", options: ["Stretches infinitely", "Has exactly two fixed endpoints!", "Has only one endpoint", "Is a curved loop"], correct: 1, hint: "A segment is bounded by two definite endpoints." },
      { question: "Can we measure the exact physical length of a Line Segment?", options: ["Yes, using a standard ruler!", "No, because it is infinite", "Only using a thermometer", "No, it has zero length"], correct: 0, hint: "Since it has fixed boundaries, its length can be measured." },
      { question: "The distance between Mumbai and Thane is a:", options: ["Segment (it has fixed boundaries)", "Ray", "Point", "Infinite Line"], correct: 0, hint: "It has defined starting and ending stations." }
    ],
    geom_kiran: [
      { question: "How many starting endpoints does a Ray (Kiran) have?", options: ["0", "Exactly 1", "Exactly 2", "Infinite"], correct: 1, hint: "A ray has exactly one starting point (or origin) and projects infinitely on the other side." },
      { question: "Flashlight beams and sun light rays are physical examples of:", options: ["Line segment", "Ray (Kiran)", "Line", "Vertex"], correct: 1, hint: "They originate at the bulb or sun and travel forward endlessly." },
      { question: "Can we measure the total length of a laser Ray?", options: ["Yes", "No, because it extends to infinity on one side!", "Depends on color of light", "Only using scale"], correct: 1, hint: "Because it is infinite in one direction, you cannot measure its total length." }
    ],
    geom_shikhar: [
      { question: "What is the Shikhar (Vertex) of an angle?", options: ["The length of the side", "The intersection point where two rays/lines meet!", "The arrow sign", "The thickness of line"], correct: 1, hint: "It is the meeting point forming the corner." },
      { question: "A triangle has how many straight vertices (corner points)?", options: ["0", "1", "2", "3 vertices!"], correct: 3, hint: "Tri-angle means three vertices connecting three lines." },
      { question: "If two parallel lines never meet, how many cross vertex points do they have?", options: ["Zero vertices", "One vertex", "Two vertices", "Infinite"], correct: 0, hint: "Vertices only exist where line elements meet or intersect." }
    ],
    maxmin_max: [
      { question: "Find the maximum of the negative values: -15, -45, -5, -100.", options: ["-100", "-45", "-15", "-5"], correct: 3, hint: "A debt of Rs 5 is much better than Rs 100 debt, hence -5 is the largest maximum value." },
      { question: "What represents Maximum on a graph?", options: ["The lowest valley point", "The highest peak point!", "The starting zero coordinate", "The middle average"], correct: 1, hint: "Maximum represents the loftiest data peak." },
      { question: "Class scores are 85, 96, 72, 88. What is the peak maximum level?", options: ["96", "85", "72", "88"], correct: 0, hint: "96 is the highest grade among all candidates in the roster." }
    ],
    maxmin_min: [
      { question: "In a list of integer prices: Rs. 120, Rs. 55, Rs. 99, Rs. 12. Find the minimum price.", options: ["Rs. 120", "Rs. 55", "Rs. 12", "Rs. 99"], correct: 2, hint: "Minimum represents the absolute cheapest/lowest quantity." },
      { question: "Which is smaller: -99 or -30?", options: ["-99 is smaller", "-30 is smaller", "Both are equal", "0 is smaller"], correct: 0, hint: "-99 is further left on the number line, representing the lowest net balance." },
      { question: "Minimum temperature in Leh was -18°C. In Srinagar, it was -5°C. Which place recorded the minimum?", options: ["Leh (-18°C is colder/lower)", "Srinagar (-5°C)", "Both same", "Cannot determine"], correct: 0, hint: "Lower value means less warmth, colder." }
    ],
    maxmin_range: [
      { question: "Calculate range: Max rating is 4.8, Min is 1.2. What is the Range (Fasla)?", options: ["3.6", "4.8", "1.2", "6.0"], correct: 0, hint: "Formula is Maximum (4.8) - Minimum (1.2) = 3.6." },
      { question: "The maximum high score in cricket is 350 runs, the lowest score is 50. What is the range of scores?", options: ["400 runs", "300 runs", "50 runs", "350 runs"], correct: 1, hint: "Subtract lowest score from highest: 350 - 50 = 300." },
      { question: "Subtracting Maximum value from itself represents a range of:", options: ["Infinite", "Zero", "Double", "Unpredictable"], correct: 1, hint: "Any value minus itself is always 0." }
    ],
    compare_basics: [
      { question: "Compare: -80 is _______ than -8.", options: ["Smaller than (<)", "Greater than (>)", "Equal to (=)", "Same"], correct: 0, hint: "A bigger debt represents a lower net value (-80 < -8)." },
      { question: "Which integer comparison statement is mathematically correct?", options: ["-10 > 0", "0 > -5", "-5 > -1", "-50 > 5"], correct: 1, hint: "Zero is always greater than any negative integer value." },
      { question: "A student stands at -3 meters, another stands at -9 meters on the grid. Who is closer to 0?", options: ["Student at -3 meters (closer and larger!)", "Student at -9 meters", "Both same distance", "Neither"], correct: 0, hint: "-3 is only 3 steps away from 0, further right, so it is larger." }
    ],
    compare_decimals: [
      { question: "Which is smaller: 0.72 or 0.08?", options: ["0.72", "0.08 (8 hundredths is much smaller than 72 hundredths!)", "Both same", "0"], correct: 1, hint: "Compare Tenths digit: 7 tenths vs 0 tenths." },
      { question: "Arrange in descending order: 0.5, 0.55, 0.05", options: ["0.05, 0.5, 0.55", "0.5, 0.05, 0.55", "0.55, 0.5, 0.05 (Largest first, matching 55 hundredths > 50 hundredths > 5 hundredths!)", "0.5, 0.55, 0.05"], correct: 2, hint: "Make them all hundredths: 0.50, 0.55, 0.05." },
      { question: "If Stall A lassi costs Rs. 45.40 and Stall B lassi is Rs. 45.04, then:", options: ["Stall A is cheaper", "Stall B is cheaper (4 paise is less than 40 paise!)", "Both same price", "Stall B is 40 rupees"], correct: 1, hint: "45.04 has '0' in the tenths place, while 45.40 has '4'." }
    ],
    compare_rounding: [
      { question: "If the bill is Rs. 149.35, what is the nearest whole rupee rounding?", options: ["Rs. 149 (Since 35 paise is less than 50, round DOWN!)", "Rs. 150", "Rs. 140", "Rs. 149.50"], correct: 0, hint: "Paisa is less than 50, so discard coins and keep baseline!" },
      { question: "Round off 9.50 to the nearest integer.", options: ["9", "10 (Exactly 50 paise is rounded UP!)", "9.5", "11"], correct: 1, hint: "Exactly half (.50) rounds UP to next unit." },
      { question: "A vegetable sack weighs 34.8 kg. Round it to the nearest whole kilogram.", options: ["34 kg", "35 kg (Tenths digit 8 is >= 5, round UP!)", "30 kg", "34.5 kg"], correct: 1, hint: "8 is closer to the next whole kilogram." }
    ],
    compare_place: [
      { question: "What is the column name of the third digit from right in '7,432'?", options: ["Tens (Dahai)", "Thousands (Hazaar)", "Hundreds (Sau)", "Units (Ikai)"], correct: 2, hint: "Positions are: units (2), tens (3), hundreds (4)." },
      { question: "In number 94,821, what is the face value of the thousands digit?", options: ["4,000", "4 (Face value is the digit itself!)", "400", "40"], correct: 1, hint: "Face value is the literal digit itself, while Place value is the positional quantity." },
      { question: "Expand 509 into tens and units.", options: ["5 hundreds + 0 tens + 9 units", "50 tens + 9 units", "5 hundreds + 9 tens", "Both option 1 & 2 are correct representations!"], correct: 3, hint: "Either 5 hundreds + 9 units OR 50 tens + 9 units." }
    ],
    compare_order: [
      { question: "Arrange smallest to largest: -50, 20, -100, 0.", options: ["-100, -50, 0, 20 (Deepest negative debt is the absolute smallest!)", "-50, -100, 0, 20", "0, 20, -50, -100", "20, 0, -50, -100"], correct: 0, hint: "-100 represents the most left side on a horizontal number line." },
      { question: "Which collection is NOT sorted in ascending order?", options: ["[-10, -5, 0, 5]", "[-3, -8, 2, 7] (-8 must come before -3!)", "[-22, 1, 10, 15]", "[-100, -90, -80, -70]"], correct: 1, hint: "Ascending order means smallest to largest. -8 is smaller than -3." },
      { question: "If Tara is standing on step -12 and Rohan on step -4, who is higher?", options: ["Tara", "Rohan (-4 is closer to 0, hence greater/higher!)", "Both are same height", "Depends on direction"], correct: 1, hint: "Higher value on negative graph represents points closer to zero." }
    ]
  };

  // Helper fallback for story/quiz of procedurally generated subtopics
  const getSubtopicStory = (subId: string) => {
    return CONCEPT_STORIES[subId] || {
      title: "📖 Market Problem Solving Quest",
      story: "Tara is bargaining for materials in her local market. She needs to calculate and compare prices to save money. The merchant gives her a rate spreadsheet, but some cells are missing values.",
      options: ["Calculate and check place values first!", "Pick the largest number blindly", "Pay whatever the vendor asks"],
      correct: 0,
      explanation: "Exactly! Settle your prices and understand value positions first before you strike any bazaar deal!"
    };
  };

  const getSubtopicQuiz = (subId: string) => {
    return CONCEPT_QUIZZES[subId] || [
      { question: `What is the core rule when mastering ${selectedSubtopic?.name}?`, options: ["Assess place values from left to right", "Pick values randomly", "Always round up", "Compare magnitudes"], correct: 0, hint: "Comparing digit placement first reveals numerical values!" },
      { question: "Subtracting a negative quantity from a positive integer:", options: ["Increases the total!", "Decreases the total", "Keeps it same", "Divides it"], correct: 0, hint: "Minus of a minus is a positive addition: x - (-y) = x + y." },
      { question: "In Hin-glish math class, what is 'Fasla'?", options: ["Symmetry", "Range", "Division", "Angles"], correct: 1, hint: "Fasla represents Range or Interval spacing!" }
    ];
  };

  const loadQuestQuizPool = async (tId: string, sId: string) => {
    setQuestQuizLoading(true);
    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: tId,
          subtopicId: sId,
          difficulty: difficulty,
          topicName: selectedTopic?.name || tId,
          subtopicName: selectedSubtopic?.name || sId
        })
      });
      const data = await response.json();
      if (data && Array.isArray(data.questions) && data.questions.length > 0) {
        let finalQs = data.questions;
        if (finalQs.length < 20) {
          const originalLength = finalQs.length;
          while (finalQs.length < 20) {
            finalQs.push({ ...finalQs[finalQs.length % originalLength] });
          }
        } else if (finalQs.length > 5) {
          finalQs = finalQs.slice(0, 5);
        }
        setQuestQuizQuestions(finalQs);
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      console.error("Failed loading subtopic quiz questions pool in LearnView:", e);
      // Use our brand new high-quality 20-variant generator!
      const fallbackQs = getConceptQuizVariants(tId, sId, difficulty);
      setQuestQuizQuestions(fallbackQs);
    } finally {
      setQuestQuizLoading(false);
    }
  };

  // --- SUBTOPIC QUEST CONTAINER RENDERING ---
  if (selectedSubtopic) {
    if (selectedSubtopic.id === "geom_skills") {
      return (
        <GeometrySkillsHub
          onBack={() => {
            setSelectedSubtopic(null);
            setActiveQuestStep("overview");
          }}
        />
      );
    }

    if (selectedSubtopic.id === "maxmin_skills") {
      return (
        <MaxMinSkillsHub
          onBack={() => {
            setSelectedSubtopic(null);
            setActiveQuestStep("overview");
          }}
        />
      );
    }

    if (selectedSubtopic.id === "compare_skills") {
      return (
        <CompareSkillsHub
          onBack={() => {
            setSelectedSubtopic(null);
            setActiveQuestStep("overview");
          }}
        />
      );
    }

    const isSpecialSyllabusQuiz = selectedSubtopic.id.includes("_panga") || selectedSubtopic.name.toLowerCase().includes("panga") || selectedSubtopic.name.toLowerCase().includes("quiz");
    const isSpecialSyllabusStory = selectedSubtopic.id.includes("_kahani") || selectedSubtopic.name.toLowerCase().includes("kahani") || selectedSubtopic.name.toLowerCase().includes("story");

    // Redirect to direct full quiz if it's the main Syllabus Panga
    if (isSpecialSyllabusQuiz) {
      return (
        <QuizView
          topicId={selectedTopic.id}
          subtopicId={selectedSubtopic.id}
          difficulty={difficulty}
          onBack={() => {
            setSelectedSubtopic(null);
            setActiveQuestStep("overview");
          }}
        />
      );
    }

    // Redirect to direct full story if it's the main Syllabus Kahani
    if (isSpecialSyllabusStory) {
      return (
        <StoryView
          topicId={selectedTopic.id}
          subtopicId={selectedSubtopic.id}
          onBack={() => {
            setSelectedSubtopic(null);
            setActiveQuestStep("overview");
          }}
        />
      );
    }

    // 5-Pillar Linear Pipeline Keys
    const videoKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_video`;
    const conceptKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_concept`;
    const practiceKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_practice`;
    const storyKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_story`;
    const quizKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_quiz`;
    const masteryKey = `${selectedTopic.id}_${selectedSubtopic.id}_step_mastery`;

    const isVideoDone = stats.completedScreens.includes(videoKey);
    const isConceptDone = stats.completedScreens.includes(conceptKey);
    const isPracticeDone = stats.completedScreens.includes(practiceKey);
    const isStoryDone = stats.completedScreens.includes(storyKey);
    const isQuizDone = stats.completedScreens.includes(quizKey);
    const isMasteryDone = stats.completedScreens.includes(masteryKey);

    const completedCount = [isVideoDone, isConceptDone, isPracticeDone, isStoryDone, isQuizDone].filter(Boolean).length;
    const progressPercent = Math.round((completedCount / 5) * 100);

    // active step content
    const storyVariantsList = getStoryQuestVariants(selectedTopic.id, selectedSubtopic.id);
    const rawFallbackStory = getSubtopicStory(selectedSubtopic.id);
    const storyData: StorySlide = storyVariantsList[activeVariantIndex] || {
      id: "emergency_fallback",
      emoji: "📖",
      title: rawFallbackStory.title,
      narration: rawFallbackStory.story,
      choices: rawFallbackStory.options.map((opt, i) => ({
        text: opt,
        correct: i === rawFallbackStory.correct,
        rewardXp: 25
      })),
      explanation: rawFallbackStory.explanation
    };
    const quizQuestions = getSubtopicQuiz(selectedSubtopic.id);

    // Concept illustration renderer for chalkboard
    const renderConceptIllustration = () => {
      const isGeom = selectedTopic.id === "geom";
      const isMaxmin = selectedTopic.id === "maxmin";
      const isCompare = selectedTopic.id === "compare";
      const subId = selectedSubtopic.id;

      return (
        <div className="bg-[#103D30] border-8 border-[#5C3214] p-4 text-white rounded-xl font-mono text-center shadow-inner relative overflow-hidden min-h-[140px] flex flex-col justify-center items-center">
          {/* Board grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          {isGeom && (
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">📐 LIVE BOARD</span>
              {subId.includes("bindu") && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white animate-pulse" />
                    <span className="text-sm font-bold text-white">Point A (4, 3)</span>
                  </div>
                  <span className="text-[11px] text-zinc-300 italic mt-1">"Zero dimensions, exact locality!"</span>
                </>
              )}
              {subId.includes("rekha") && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-300">❮</span>
                    <div className="w-32 h-0.5 bg-yellow-400 relative">
                      <div className="absolute -top-1 left-4 w-2 h-2 rounded-full bg-white" />
                      <div className="absolute -top-1 left-24 w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-zinc-300">❯</span>
                  </div>
                  <span className="text-[11px] text-zinc-300 mt-1">"Line AB: Stretches infinitely both sides!"</span>
                </>
              )}
              {subId.includes("khand") && (
                <>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <div className="w-24 h-1 bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[11px] text-zinc-300 mt-1">"Segment CD: Endpoints are FIXED (12 cm)!"</span>
                </>
              )}
              {subId.includes("kiran") && (
                <>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <div className="w-24 h-0.5 bg-yellow-400" />
                    <span className="text-zinc-300">❯</span>
                  </div>
                  <span className="text-[11px] text-zinc-300 mt-1">"Ray OP: Starts at O, flies endlessly!"</span>
                </>
              )}
              {subId.includes("shikhar") && (
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 border border-white" />
                    <div className="flex gap-4 font-bold text-xs mt-1 text-zinc-300">
                      <span>Ray A</span>
                      <span>Ray B</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-300 mt-1">"Vertex (Shikhar): Pointy corner apex!"</span>
                </>
              )}
              {/* Fallback for other subtopics like video, practice, story, etc */}
              {(!subId.includes("bindu") && !subId.includes("rekha") && !subId.includes("khand") && !subId.includes("kiran") && !subId.includes("shikhar")) && (
                <>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-black text-amber-300">📐 GEOMETRY LESSON SUMMARY</span>
                    <span className="text-[10px] text-zinc-200">Point = 0D Hero A • Line = Infinite ⇆</span>
                    <span className="text-[10px] text-zinc-200">Segment = Fixed Limits • Ray = One End origin 👉</span>
                  </div>
                </>
              )}
            </div>
          )}

          {isMaxmin && (
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">📈 VALUE TRACK</span>
              <div className="flex items-end gap-3 h-10 mt-1">
                <div className="w-6 bg-zinc-500 text-[10px] text-white font-bold rounded-t-sm" style={{ height: "40%" }}>Min</div>
                <div className="w-8 bg-amber-400 text-[10px] text-black font-bold rounded-t-sm" style={{ height: "100%" }}>Max</div>
                <div className="w-6 bg-zinc-500 text-[10px] text-white font-bold rounded-t-sm" style={{ height: "60%" }}>Mid</div>
              </div>
              <span className="text-[11px] text-zinc-300 mt-1">Fasla (Range) = Maximum - Minimum</span>
            </div>
          )}

          {isCompare && (
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mb-1">🐊 EQUATION TRACK</span>
              <div className="text-xl font-bold text-amber-300 my-1">
                98,720 <span className="text-white">🐊</span> 89,999
              </div>
              <span className="text-[11px] text-zinc-300">"Gator opens wide mouth to eat the BIGGER number!"</span>
            </div>
          )}
        </div>
      );
    };

    // Render Quest Overview Dashboard
    if (activeQuestStep === "overview") {
      return (
        <div className="flex flex-col gap-6 animate-fade-in pb-12 text-black font-mono">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-black pb-3">
            <button
              id="learn-back-subtopics-btn"
              onClick={() => setSelectedSubtopic(null)}
              className="flex items-center gap-1.5 text-xs font-sans font-black text-black border-3 border-black p-2.5 px-4 rounded-xl bg-white hover:bg-neutral-50 shadow-[3px_3px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_black] cursor-pointer transition-all"
            >
              <ArrowLeft className="h-4 w-4 stroke-[3.5px]" />
              <span>{t("backToSubtopics")}</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-black flex-wrap">
              <span className="bg-amber-100 border-2 border-black py-1 px-3 rounded-lg">{selectedTopic.name.split(":")[0]}</span>
              <span className="opacity-40">/</span>
              <span className="text-zinc-600">{selectedSubtopic.name}</span>
              {classLevelLabel && (
                <span className="bg-[#FF6B6B] text-white border-2 border-black py-1 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_black]">
                  🎓 {classLevelLabel} Level
                </span>
              )}
            </div>
          </div>

          {/* Core Quest Progress Banner */}
          <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="text-left">
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider bg-[#FFC700] px-2.5 py-1 border-2 border-black rounded-lg inline-block mb-1.5">
                🛡️ ACTIVE 5-PILLAR PIPELINE
              </span>
              <h3 className="font-sans font-black text-2xl text-black uppercase tracking-tight leading-none mb-1">
                🏆 Quest of {selectedSubtopic.name.replace(/💡|🏋️|📖|🎯|🏆/g, "").trim()}
              </h3>
              <p className="text-xs text-zinc-650 font-extrabold max-w-xl leading-relaxed">
                Clear all 5 checkpoints sequentially to claim your official subtopic master badge and +50 XP! Keep solving, and become a super-student!
              </p>
            </div>

            <div className="bg-[#FFECC2] border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_black] text-center flex-shrink-0 flex flex-col items-center justify-center min-w-[130px]">
              <span className="text-2xl">🏅</span>
              <span className="font-extrabold text-xs text-black uppercase mt-1 leading-none">{progressPercent}% Unlocked</span>
              <div className="h-2.5 w-24 bg-white border-2 border-black rounded overflow-hidden mt-2">
                <div className="h-full bg-[#22C55E]" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Linear Timeline Roadmap */}
          <div className="relative flex flex-col gap-6 mt-4">
            {/* Connective background spine */}
            <div className="absolute left-[30px] top-6 bottom-6 w-1.5 bg-black rounded-full block" />

            {/* Pillar 1: Video Lesson */}
            <div className="flex items-start gap-4 relative">
              <div className={`h-[60px] w-[60px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center text-xl shadow-[3px_3px_0px_black] ${
                isVideoDone ? "bg-green-500 text-white animate-none" : "bg-amber-400 text-black animate-pulse"
              }`}>
                {isVideoDone ? "✓" : "1"}
              </div>

              <div className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[5px_5px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                isVideoDone ? "bg-green-50/40" : "bg-white"
              }`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-amber-600 block uppercase mb-1">Pillar 1: Video Class 🎬</span>
                  <h4 className="font-sans font-black text-sm uppercase text-black mb-0.5">Watch Video Lesson</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
                    Watch Rekha Didi's high-energy chalk animation class introducing coordinates and secrets.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                  <span className="text-[10px] bg-amber-100 border border-black font-extrabold p-1 px-2 rounded-md shrink-0 uppercase text-amber-800">
                    {isVideoDone ? "Completed (+15 XP)" : "Ready to Play"}
                  </span>
                  <button
                    onClick={() => setActiveQuestStep("video")}
                    className="px-4 py-2.5 bg-black text-[#FFC700] hover:bg-neutral-800 border-2 border-black rounded-xl text-xs font-sans font-black uppercase tracking-wider shadow-[2px_2px_0px_black] cursor-pointer"
                  >
                    {isVideoDone ? "Review Class" : "Start Video"}
                  </button>
                </div>
              </div>
            </div>

            {/* Pillar 2: Concept Exploration */}
            <div className="flex items-start gap-4 relative">
              <div className={`h-[60px] w-[60px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center text-xl shadow-[3px_3px_0px_black] ${
                isConceptDone ? "bg-green-500 text-white" : isVideoDone ? "bg-amber-400 text-black" : "bg-neutral-100 text-zinc-400 border-dashed"
              }`}>
                {isConceptDone ? "✓" : !isVideoDone ? "🔒" : "2"}
              </div>

              <div className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[5px_5px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                !isVideoDone ? "bg-gray-100/50 opacity-60" : isConceptDone ? "bg-green-50/40" : "bg-white"
              }`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-purple-600 block uppercase mb-1">
                    Pillar 2: Concept Exploration 💡 {!isVideoDone && "• LOCKED 🔒"}
                  </span>
                  <h4 className="font-sans font-black text-sm uppercase text-black mb-0.5">Explore chalkboard slides</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
                    Flip through interactive visual learning formulas and real world examples.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                  <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-300 font-extrabold p-1 px-2 rounded-md shrink-0 uppercase">
                    {!isVideoDone ? "Locked" : isConceptDone ? "Completed (+15 XP)" : "Ready to Play"}
                  </span>
                  <button
                    disabled={!isVideoDone}
                    onClick={() => {
                      setConceptSlideIdx(0);
                      setActiveQuestStep("concept");
                    }}
                    className={`px-4 py-2.5 text-xs font-sans font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_black] cursor-pointer ${
                      !isVideoDone
                        ? "bg-gray-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                        : "bg-black text-[#FFC700] hover:bg-neutral-800"
                    }`}
                  >
                    {isConceptDone ? "Review Cards" : "Start Concepts"}
                  </button>
                </div>
              </div>
            </div>

            {/* Pillar 3: Practice Zone */}
            <div className="flex items-start gap-4 relative">
              <div className={`h-[60px] w-[60px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center text-xl shadow-[3px_3px_0px_black] ${
                isPracticeDone ? "bg-green-500 text-white" : isConceptDone ? "bg-amber-400 text-black" : "bg-neutral-100 text-zinc-400 border-dashed"
              }`}>
                {isPracticeDone ? "✓" : !isConceptDone ? "🔒" : "3"}
              </div>

              <div className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[5px_5px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                !isConceptDone ? "bg-gray-100/50 opacity-60" : isPracticeDone ? "bg-green-50/40" : "bg-white"
              }`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-emerald-600 block uppercase mb-1">
                    Step 3: Practice Drills 🏋️ {!isConceptDone && "• LOCKED 🔒"}
                  </span>
                  <h4 className="font-sans font-black text-sm uppercase text-black mb-0.5">Interactive Playgrounds</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
                    Interact directly with coordinate maps, range widgets, and live decimal battle numbers.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-300 font-extrabold p-1 px-2 rounded-md shrink-0 uppercase">
                    {!isConceptDone ? "Locked" : isPracticeDone ? "Completed (+20 XP)" : "Ready to Play"}
                  </span>
                  <button
                    disabled={!isConceptDone}
                    onClick={() => setActiveQuestStep("practice")}
                    className={`px-4 py-2.5 text-xs font-sans font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_black] cursor-pointer ${
                      !isConceptDone
                        ? "bg-gray-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                        : "bg-black text-[#FFC700] hover:bg-neutral-800"
                    }`}
                  >
                    {isPracticeDone ? "Retry Practice" : "Start Practice"}
                  </button>
                </div>
              </div>
            </div>

            {/* Pillar 4: Kahani */}
            <div className="flex items-start gap-4 relative">
              <div className={`h-[60px] w-[60px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center text-xl shadow-[3px_3px_0px_black] ${
                isStoryDone ? "bg-green-500 text-white" : isPracticeDone ? "bg-amber-400 text-black" : "bg-neutral-100 text-zinc-400 border-dashed"
              }`}>
                {isStoryDone ? "✓" : !isPracticeDone ? "🔒" : "4"}
              </div>

              <div className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[5px_5px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                !isPracticeDone ? "bg-gray-100/50 opacity-60" : isStoryDone ? "bg-green-50/40" : "bg-white"
              }`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-red-600 block uppercase mb-1">
                    Step 4: Story Quests 📖 {!isPracticeDone && "• LOCKED 🔒"}
                  </span>
                  <h4 className="font-sans font-black text-sm uppercase text-black mb-0.5">Bargaining Scenario Quest</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
                    Help Tara bargain with local market sellers using smart algebra and rounding mathematics.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-300 font-extrabold p-1 px-2 rounded-md shrink-0 uppercase">
                    {!isPracticeDone ? "Locked" : isStoryDone ? "Completed (+25 XP)" : "Ready to Play"}
                  </span>
                  <button
                    disabled={!isPracticeDone}
                    onClick={() => {
                      setQuestStoryAnswered(false);
                      setQuestStoryOpt(null);
                      setActiveQuestStep("story");
                    }}
                    className={`px-4 py-2.5 text-xs font-sans font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_black] cursor-pointer ${
                      !isPracticeDone
                        ? "bg-gray-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                        : "bg-black text-[#FFC700] hover:bg-neutral-800"
                    }`}
                  >
                    {isStoryDone ? "Replay Kahani" : "Start Kahani"}
                  </button>
                </div>
              </div>
            </div>

            {/* Pillar 5: Panga Quiz */}
            <div className="flex items-start gap-4 relative">
              <div className={`h-[60px] w-[60px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center text-xl shadow-[3px_3px_0px_black] ${
                isQuizDone ? "bg-green-500 text-white" : isStoryDone ? "bg-amber-400 text-black" : "bg-neutral-100 text-zinc-400 border-dashed"
              }`}>
                {isQuizDone ? "✓" : !isStoryDone ? "🔒" : "5"}
              </div>

              <div className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[5px_5px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                !isStoryDone ? "bg-gray-100/50 opacity-60" : isQuizDone ? "bg-green-50/40" : "bg-white"
              }`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-blue-600 block uppercase mb-1">
                    Step 5: Concept Quiz 🎯 {!isStoryDone && "• LOCKED 🔒"}
                  </span>
                  <h4 className="font-sans font-black text-sm uppercase text-black mb-0.5">Fight Panga Challenge</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
                    5 adaptive questions to solidify your CBSE skills.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                  <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-300 font-extrabold p-1 px-2 rounded-md shrink-0 uppercase">
                    {!isStoryDone ? "Locked" : isQuizDone ? "Completed (+30 XP)" : "Ready to Play"}
                  </span>
                  <button
                    disabled={!isStoryDone}
                    onClick={async () => {
                      setQuestQuizIdx(0);
                      setQuestQuizScore(0);
                      setQuestQuizAnswered(false);
                      setQuestQuizOpt(null);
                      setActiveQuestStep("quiz");
                      await loadQuestQuizPool(selectedTopic.id, selectedSubtopic.id);
                    }}
                    className={`px-4 py-2.5 text-xs font-sans font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_black] cursor-pointer ${
                      !isStoryDone
                        ? "bg-gray-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                        : "bg-black text-[#FFC700] hover:bg-neutral-800"
                    }`}
                  >
                    {isQuizDone ? "Replay Quiz" : "Start Quiz"}
                  </button>
                </div>
              </div>
            </div>

            {/* Mastery Milestone */}
            <div className="flex items-start gap-4 relative">
              <div className={`h-[60px] w-[60px] rounded-2xl border-4 border-black flex-shrink-0 z-10 flex items-center justify-center text-xl shadow-[3px_3px_0px_black] ${
                isMasteryDone
                  ? "bg-[#FFCC00] text-black ring-4 ring-yellow-300 animate-none"
                  : isQuizDone
                  ? "bg-amber-400 text-black animate-bounce"
                  : "bg-neutral-150 text-zinc-400 border-dashed"
              }`}>
                🏆
              </div>

              <div className={`flex-1 border-4 border-black p-5 rounded-2xl text-left shadow-[6px_6px_0px_black] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                isMasteryDone
                  ? "bg-[#FFECC2] border-amber-400"
                  : isQuizDone
                  ? "bg-[#FFFBF0] border-amber-300 animate-pulse"
                  : "bg-gray-50/50 opacity-50"
              }`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-amber-500 block uppercase mb-1">
                    Concept Mastery Badge 🏆 {!isQuizDone && "• LOCKED 🔒"}
                  </span>
                  <h4 className="font-sans font-black text-sm uppercase text-black mb-0.5">Claim Mastery Badge!</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
                    Secure your custom master seal, pocket +50 bonus XP, and unlock the Mastery Champion Badge forever!
                  </p>
                </div>
                <div className="flex items-center gap-3 self-stretch md:self-auto justify-between border-t border-black/5 md:border-none pt-2.5 md:pt-0">
                  <span className="text-[10px] bg-amber-55 text-amber-700 border border-amber-300 font-extrabold p-1 px-2 rounded-md shrink-0 uppercase">
                    {!isQuizDone ? "Locked" : isMasteryDone ? "Completed" : "Ready to Claim (+50 XP)"}
                  </span>
                  <button
                    disabled={!isQuizDone || isMasteryDone}
                    onClick={async () => {
                      if (isQuizDone && !isMasteryDone) {
                        const nextDoneList = stats.completedScreens.includes(masteryKey)
                          ? stats.completedScreens
                          : [...stats.completedScreens, masteryKey];
                        await updateStats({
                          completedScreens: nextDoneList,
                          xp: stats.xp + 50
                        });
                        setActiveQuestStep("mastery");
                      }
                    }}
                    className={`px-5 py-3 text-xs font-sans font-black uppercase tracking-wider rounded-xl border-3 border-black shadow-[3px_3px_0px_black] transition-transform cursor-pointer ${
                      isMasteryDone
                        ? "bg-green-100 text-green-700 shadow-none border-green-300 cursor-not-allowed"
                        : isQuizDone
                        ? "bg-amber-400 text-black hover:bg-amber-500"
                        : "bg-gray-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {isMasteryDone ? "✓ Mastered" : "Claim Seal"}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      );
    }

    // STEP 2 UI (NEW): Concept Exploration
    if (activeQuestStep === "concept") {
      const activeScreen = screensList[conceptSlideIdx] || {
        title: "Introduction to Concept",
        conceptHeading: "Aao Concept Seekhein!",
        explanation: "Doston, chalo isko bariki se samajhte hain."
      };

      return (
        <div className="flex flex-col gap-6 animate-fade-in pb-12 font-mono text-black">
          
          <div className="flex justify-between items-center border-b-4 border-black pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h4 className="font-sans font-black text-lg uppercase">💡 Step 2: Concept Exploration</h4>
              {classLevelLabel && (
                <span className="bg-[#FF6B6B] text-white border-2 border-black py-1 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_black]">
                  🎓 {classLevelLabel}
                </span>
              )}
            </div>
            <span className="bg-amber-100 border-2 border-black px-3 py-1 text-xs font-black">+15 XP coins reward</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Slide Viewer on left */}
            <div className="md:col-span-2 bg-[#FFFDF0] border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_black] text-left flex flex-col justify-between min-h-[460px]">
              
              <div>
                <div className="flex justify-between items-center text-xs font-black mb-3 border-b-2 border-black border-dashed pb-2">
                  <span className="text-neutral-500 uppercase">CONCEPT CARD {conceptSlideIdx + 1} OF {screensList.length}</span>
                  <span className="bg-[#FFCC00] border border-black px-2 py-0.5 rounded text-[10px]">Active Sheet</span>
                </div>

                <h3 className="font-sans font-black text-lg text-black uppercase mb-1">
                  {activeScreen.title}
                </h3>
                <h4 className="font-sans font-bold text-sm text-[#DD6B20] mb-3">
                  {activeScreen.conceptHeading}
                </h4>

                <p className="font-sans text-xs sm:text-sm font-medium text-zinc-800 leading-relaxed mb-6 bg-white p-4 rounded-xl border border-black/10">
                  {injectConceptTooltips(activeScreen.explanation)}
                </p>
              </div>

              {/* Dynamic Retro Chalkboard illustration */}
              <div className="my-2">
                {selectedTopic.id === "geom" ? (
                  <InteractiveSandbox subtopicId={selectedSubtopic.id} />
                ) : (
                  renderConceptIllustration()
                )}
              </div>

              {/* Slider / Pager Navigation */}
              <div className="flex items-center justify-between gap-4 mt-6 border-t-2 border-black border-dashed pt-4">
                <button
                  disabled={conceptSlideIdx === 0}
                  onClick={() => setConceptSlideIdx((p) => p - 1)}
                  className={`px-4 py-2 bg-white border-2 border-black text-xs font-bold rounded-lg shadow-[2px_2px_0px_black] active:translate-y-0.5 transition-all cursor-pointer ${
                    conceptSlideIdx === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-50"
                  }`}
                >
                  ⏪ Previous Card
                </button>

                <div className="h-2.5 flex-grow bg-zinc-200 border border-black rounded overflow-hidden mx-4">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300" 
                    style={{ width: `${((conceptSlideIdx + 1) / screensList.length) * 100}%` }}
                  />
                </div>

                {conceptSlideIdx < screensList.length - 1 ? (
                  <button
                    onClick={() => setConceptSlideIdx((p) => p + 1)}
                    className="px-4 py-2 bg-black text-[#FFC700] hover:bg-neutral-900 border-2 border-black text-xs font-bold rounded-lg shadow-[2px_2px_0px_black] active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    Next Card ⏩
                  </button>
                ) : (
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-400 px-2 py-1 rounded">✓ LAST CARD</span>
                )}
              </div>

            </div>

            {/* Quick Settle actions on right */}
            <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_black] flex flex-col justify-between h-fit gap-4">
              <div>
                <span className="text-[10px] font-black text-purple-600 block mb-1">✓ SUBMIT EXPLORATION</span>
                <h4 className="font-sans font-black text-sm uppercase text-black">Lock Concept Progress</h4>
                <p className="text-[11px] text-zinc-500 font-bold mt-2 leading-relaxed">
                  Have you read all the custom Hinglish study sheets and illustrations? Settle your concept exploration block now to unlock practice sessions!
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={async () => {
                    const nextDoneList = stats.completedScreens.includes(conceptKey)
                      ? stats.completedScreens
                      : [...stats.completedScreens, conceptKey];

                    await updateStats({
                      completedScreens: nextDoneList,
                      xp: stats.completedScreens.includes(conceptKey) ? stats.xp : stats.xp + 15
                    });
                    setActiveQuestStep("overview");
                  }}
                  className="w-full py-3 bg-[#22C55E] text-white font-sans font-black text-xs uppercase tracking-wider border-3 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-green-600 cursor-pointer"
                >
                  ✓ Done!
                </button>
                <button
                  onClick={() => setActiveQuestStep("overview")}
                  className="w-full py-3 bg-zinc-150 border-3 border-black rounded-xl text-xs font-sans font-black uppercase hover:bg-zinc-200 cursor-pointer text-center text-black"
                >
                  ⏪ Back to Overview
                </button>
              </div>
            </div>

          </div>

        </div>
      );
    }

    // STEP 1 UI: Video whiteboard Class
    if (activeQuestStep === "video") {
      const displayVideoFile = `FINAL_${selectedSubtopic.id}.mp4`;

      return (
        <div className="flex flex-col gap-6 animate-fade-in pb-12 font-mono text-black">
          
          <div className="flex justify-between items-center border-b-4 border-black pb-3">
            <h4 className="font-sans font-black text-lg uppercase">🎬 Step 1: Video Lesson Class</h4>
            <span className="bg-amber-100 border-2 border-black px-3 py-1 text-xs font-black">+15 XP coins reward</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Whiteboard Notes on left (Span 2) */}
            <div className="md:col-span-2 bg-[#FFFDF0] border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_black] text-left">
              <h4 className="font-sans font-black text-base text-black mb-1.5 uppercase tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500 fill-amber-300" />
                <span>Rekha Didi ke Hinglish Chalk Notes: {selectedSubtopic.name}</span>
              </h4>
              <hr className="border-t-2 border-black border-dashed mb-4" />
              
              <div className="flex flex-col gap-3 font-sans text-xs sm:text-sm font-bold text-zinc-800 leading-relaxed bg-white border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_black]">
                <p>🙋‍♂️ <strong className="text-black uppercase">Oye Sg! Sawaal suno:</strong> Is concept ko ek dum rustic local analogies se samjho!</p>
                {selectedSubtopic.id.includes("bindu") && (
                  <>
                    <p>✨ <strong>Bindu (Point) ka Jadu:</strong> Ek Point standard cartesian plane pe exact locality dikhata hai. Spatial coordinate coordinate system mein iski value fix hoti hai, par iska thickness zero dimension (0D) hota hai!</p>
                    <p>🎯 Jaise map par dukan ki position, ya cricket ball ka crease line intersection dot point!</p>
                  </>
                )}
                {selectedSubtopic.id.includes("rekha") && (
                  <>
                    <p>✨ <strong>Rekha (Line) details:</strong> Ek line me infinite dots side-by-side scale ho jati hain. Ye straight stretches me bina end point ke infinite high dynamic vectors me jati hai!</p>
                    <p>🛣️ Metro ke straight tracks anant Rekha (infinite lines) ki tarah stretch hoti hain.</p>
                  </>
                )}
                {selectedSubtopic.id.includes("khand") && (
                  <>
                    <p>✨ <strong>Line Segment (Khand):</strong> Segment humesa finite boundaries se bhandha hota hai. Iske do explicit endpoints scale coordinates banate hain (Jaise geometry notebook me kheechi gayi 7.5 cm segment scale limit).</p>
                  </>
                )}
                {!selectedSubtopic.id.includes("bindu") && !selectedSubtopic.id.includes("rekha") && !selectedSubtopic.id.includes("khand") && (
                  <>
                    <p>✨ <strong>Maths Dost Kahte Hain:</strong> Math is pure gold when you run transactions in daily bazaar! Play the IPL stakes tracking, compare decimal ratings, and check ranges to be standard market gurus.</p>
                  </>
                )}
              </div>

              {/* Video Player Segment */}
              <div className="mt-6 border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_black]">
                <VideoPlayer
                  videoFile={displayVideoFile}
                  onComplete={() => {}}
                />
              </div>
            </div>

            {/* Quick Settle actions on right */}
            <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_black] flex flex-col justify-between h-fit gap-4">
              <div>
                <span className="text-[10px] font-black text-amber-600 block mb-1">✓ SUBMIT ASSIGNMENT</span>
                <h4 className="font-sans font-black text-sm uppercase text-black">Finish & earn rewards</h4>
                <p className="text-[11px] text-zinc-500 font-bold mt-2 leading-relaxed">
                  Have you played the brief lesson clip and understood Rekha Didi ke custom Hinglish chalk boards? Press settle below!
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={async () => {
                    const nextDoneList = stats.completedScreens.includes(videoKey)
                      ? stats.completedScreens
                      : [...stats.completedScreens, videoKey];

                    await updateStats({
                      completedScreens: nextDoneList,
                      xp: stats.completedScreens.includes(videoKey) ? stats.xp : stats.xp + 15
                    });
                    setActiveQuestStep("overview");
                  }}
                  className="w-full py-3 bg-[#22C55E] text-white font-sans font-black text-xs uppercase tracking-wider border-3 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-green-600 cursor-pointer"
                >
                  ✓ Done!
                </button>
                <button
                  onClick={() => setActiveQuestStep("overview")}
                  className="w-full py-3 bg-zinc-150 border-3 border-black rounded-xl text-xs font-sans font-black uppercase hover:bg-zinc-200 cursor-pointer text-center text-black"
                >
                  ⏪ Back to Overview
                </button>
              </div>
            </div>

          </div>

        </div>
      );
    }

    // STEP 3 UI: Interactive Practice Arena
    if (activeQuestStep === "practice") {
      const drillVariantsList = getPracticeDrillVariants(selectedTopic.id, selectedSubtopic.id, difficulty);
      const drillData = drillVariantsList[activeVariantIndex] || {
        id: "default_drill",
        title: "Dynamic Math Grid Practice",
        instruction: "Interact with the math elements to master concepts!",
        targetValue: null,
        type: "none"
      };

      const activeScreen = {
        id: `${selectedSubtopic.id}_practice_variant_${activeVariantIndex}`,
        title: drillData.title,
        topicId: selectedTopic.id,
        subtopicId: (drillData as any).conceptSubtopicId || selectedSubtopic.id,
        conceptHeading: drillData.title,
        explanation: drillData.instruction,
        interactiveType: drillData.type as any,
        targetValue: drillData.targetValue,
        activeVariantIndex: activeVariantIndex
      };

      const isCurrentDrillCompleted = stats.completedScreens.includes(activeScreen.id);

      return (
        <div className="flex flex-col gap-6 animate-fade-in pb-12 font-mono text-black">
          
          <div className="flex justify-between items-center border-b-4 border-black pb-3">
            <h4 className="font-sans font-black text-lg uppercase font-sans">🏋️ Step 3: Interactive Practice drills</h4>
            <span className="bg-purple-100 border-2 border-black text-purple-700 px-3 py-1 text-xs font-black">+20 XP coins</span>
          </div>

          {/* Drill variant selector */}
          <div className="bg-amber-50/50 border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_black] text-left">
            <span className="font-sans font-black text-xs uppercase text-zinc-500 block mb-2 font-sans">🎯 SELECT FROM 5 HIGH-YIELD PRACTICE DRILLS:</span>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, idx) => {
                const isSelected = idx === activeVariantIndex;
                const isDone = stats.completedScreens.includes(`${selectedSubtopic.id}_practice_variant_${idx}`);
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveVariantIndex(idx)}
                    className={`p-2 font-mono text-xs font-black border-2 border-black rounded-lg text-center cursor-pointer shadow-[2px_2px_0px_black] active:translate-y-0.5 transition-all ${
                      isSelected 
                        ? "bg-[#FFEAA7] text-black ring-2 ring-black" 
                        : isDone
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-white text-zinc-500"
                    }`}
                  >
                    D{idx + 1}
                    {isDone && <span className="block text-[8px] text-emerald-600">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans">
            
            {/* Working dynamic Work Sheet Iframe */}
            <div className="lg:col-span-3 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden font-mono">
              <div className="p-3 bg-neutral-100 border-b-4 border-black text-left flex justify-between items-center text-xs font-black">
                <span className="font-sans font-extrabold uppercase">📍 PRACTICING: {activeScreen.title}</span>
                <span className="bg-white border-2 border-black px-2 py-0.5 rounded text-[10px] uppercase font-mono">Drill {activeVariantIndex + 1} / 5</span>
              </div>
              <div className="relative">
                <iframe
                  key={activeVariantIndex}
                  title={`Math Workspace ${activeScreen.title}`}
                  srcDoc={generateInteractiveSrcDoc(activeScreen)}
                  className="w-full h-[525px] sm:h-[480px] border-none block"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* Settle task */}
            <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_black] flex flex-col justify-between h-fit gap-4">
              <div className="text-left font-sans">
                <span className="text-[10px] font-black text-purple-600 block mb-1 font-mono">⚙️ WORKSPACE CONTROLS</span>
                <h4 className="font-sans font-black text-sm uppercase text-black">Submit Exercise Data</h4>
                <p className="text-[11px] text-zinc-500 font-bold mt-2 leading-relaxed">
                  Use the yellow rulers, tap/drag nodes, adjust thresholds or compare negative dials on the left! Once the chalkboard tool shows success, click the button below to secure your grade.
                </p>
              </div>

              <div className="flex flex-col gap-2 font-sans">
                {isCurrentDrillCompleted ? (
                  <button
                    onClick={() => {
                      if (activeVariantIndex < 4) {
                        setActiveVariantIndex((p) => p + 1);
                      } else {
                        setActiveQuestStep("overview");
                      }
                    }}
                    className="w-full py-3 bg-[#10B981] text-white font-sans font-black text-xs uppercase tracking-wider border-3 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-emerald-600 cursor-pointer text-center animate-pulse"
                  >
                    {activeVariantIndex < 4 ? "Next Drill ➡️" : "🎉 All Drills Complete!"}
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const nextDoneList = stats.completedScreens.includes(activeScreen.id)
                        ? stats.completedScreens
                        : [...stats.completedScreens, activeScreen.id];

                      // Also make sure to mark the global step as completed
                      if (!nextDoneList.includes(practiceKey)) {
                        nextDoneList.push(practiceKey);
                      }

                      await updateStats({
                        completedScreens: nextDoneList,
                        xp: stats.completedScreens.includes(activeScreen.id) ? stats.xp : stats.xp + 20
                      });
                    }}
                    className="w-full py-3 bg-[#22C55E] text-white font-sans font-black text-xs uppercase tracking-wider border-3 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-green-600 cursor-pointer"
                  >
                    ✓ Complete Drill {activeVariantIndex + 1} (+20 XP)
                  </button>
                )}
                <button
                  onClick={() => setActiveQuestStep("overview")}
                  className="w-full py-3 bg-zinc-150 border-3 border-black rounded-xl text-xs font-sans font-black uppercase hover:bg-zinc-200 cursor-pointer text-center text-black"
                >
                  ⏪ Back to Overview
                </button>
              </div>
            </div>

          </div>

        </div>
      );
    }

    // STEP 4 UI: India Street Kahani
    if (activeQuestStep === "story") {
      const isCurrentStoryCompleted = stats.completedScreens.includes(`${selectedSubtopic.id}_story_variant_${activeVariantIndex}`);

      return (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 animate-fade-in pb-12 text-black font-sans">
          
          <div className="flex justify-between items-center border-b-4 border-black pb-3 font-mono">
            <h4 className="font-sans font-black text-lg uppercase font-sans">📖 Step 4: India Street Story Quests</h4>
            <span className="bg-emerald-100 border-2 border-black text-emerald-700 px-3 py-1 text-xs font-black">+25 XP coins</span>
          </div>

          {/* Episode selector */}
          <div className="bg-[#ECFDF5] border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_black] text-left">
            <span className="font-mono font-black text-xs uppercase text-[#103D30] block mb-2">⚡ CHOOSE INDIA STREET ADVENTURE (EP 1 - EP 5):</span>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, idx) => {
                const isSelected = idx === activeVariantIndex;
                const isDone = stats.completedScreens.includes(`${selectedSubtopic.id}_story_variant_${idx}`);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveVariantIndex(idx);
                      setQuestStoryAnswered(false);
                      setQuestStoryOpt(null);
                    }}
                    className={`p-2 font-mono text-xs font-black border-2 border-black rounded-lg text-center cursor-pointer shadow-[2px_2px_0px_black] active:translate-y-0.5 transition-all ${
                      isSelected 
                        ? "bg-[#FFEAA7] text-black ring-2 ring-black" 
                        : isDone
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-white text-zinc-500"
                    }`}
                  >
                    EP{idx + 1}
                    {isDone && <span className="block text-[8px] text-emerald-600">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 sm:p-8 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFEAA7] border-3 border-black flex items-center justify-center text-3xl shadow-[3px_3px_0px_black]">
                {storyData.emoji || "🛍️"}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-black text-zinc-400">India Street Episode {activeVariantIndex + 1} / 5</span>
                <h3 className="font-sans font-black text-xl text-black uppercase tracking-tight leading-none mt-0.5">{storyData.title}</h3>
              </div>
            </div>

            {/* Beautiful creative full-sized illustration representation */}
            <div id="story-visual-aid-wrapper" className="w-full animate-fade-in shadow-[4px_4px_0px_black] border-3 border-black rounded-2xl overflow-hidden bg-white">
              <StoryVisualAid subtopicId={selectedSubtopic.id} activeVariantIndex={activeVariantIndex} />
            </div>

            <p className="text-sm sm:text-lg font-bold text-[#103D30] leading-relaxed bg-[#F0FDF4] border-2 border-black p-4 rounded-xl border-dashed">
              "{storyData.narration}"
            </p>

            <span className="font-mono text-[10px] uppercase font-black text-zinc-400">Choose Maths Dost ki correct Hinglish guidance:</span>
            
            <div className="flex flex-col gap-3">
              {(storyData.choices || []).map((optDef, i) => {
                const optText = optDef.text;
                const isSelected = questStoryOpt === i;
                const isCorrect = optDef.correct === true;
                
                let btnStyle = "bg-white border-black text-black hover:bg-zinc-50";
                if (questStoryAnswered || isCurrentStoryCompleted) {
                  if (isSelected || (isCurrentStoryCompleted && isCorrect)) {
                    btnStyle = isCorrect
                      ? "bg-[#22C55E] text-white border-black shadow-none scale-100"
                      : "bg-[#FF4D4D] text-white border-black shadow-none scale-100";
                  } else if (isCorrect) {
                     btnStyle = "bg-[#22C55E]/20 text-black border-black border-dashed";
                  } else {
                    btnStyle = "bg-white opacity-50 border-zinc-200 cursor-not-allowed";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-amber-100 ring-2 ring-black font-black";
                }

                return (
                  <button
                    key={optText}
                    disabled={questStoryAnswered || isCurrentStoryCompleted}
                    onClick={() => setQuestStoryOpt(i)}
                    className={`py-3.5 px-4 rounded-xl border-3 text-left text-xs sm:text-sm font-black transition-all shadow-[3px_3px_0px_black] active:translate-y-0.5 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{optText}</span>
                      {isCorrect && (questStoryAnswered || isCurrentStoryCompleted) && <span className="font-mono text-[10px] font-black uppercase text-green-700 bg-green-55 border border-green-400 px-1.5 py-0.5 rounded">✓ RIGHT</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Story Prompt Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t-2 border-black border-dashed">
              {!questStoryAnswered && !isCurrentStoryCompleted ? (
                <button
                  disabled={questStoryOpt === null}
                  onClick={async () => {
                    if (questStoryOpt === null) return;
                    setQuestStoryAnswered(true);
                    
                    const choicesList = storyData.choices || [];
                    const selectedChoice = choicesList[questStoryOpt];
                    const isCorrect = selectedChoice?.correct === true;

                    if (isCorrect) {
                      const screenId = `${selectedSubtopic.id}_story_variant_${activeVariantIndex}`;
                      const nextDoneList = stats.completedScreens.includes(screenId)
                        ? stats.completedScreens
                        : [...stats.completedScreens, screenId];

                      if (!nextDoneList.includes(storyKey)) {
                        nextDoneList.push(storyKey);
                      }

                      await updateStats({
                        completedScreens: nextDoneList,
                        xp: stats.completedScreens.includes(screenId) ? stats.xp : stats.xp + 25
                      });
                    }
                  }}
                  className={`flex-1 py-3.5 border-3 border-black text-center font-sans font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_black] active:translate-y-0.5 cursor-pointer ${
                    questStoryOpt === null
                      ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                      : "bg-[#22C55E] text-white hover:bg-green-600"
                  }`}
                >
                  Complete Story Guidance!
                </button>
              ) : (
                <div className="flex-1 flex flex-col gap-4 text-left">
                  <div className="p-4 bg-yellow-50 border-2 border-black rounded-xl text-xs sm:text-sm font-bold text-zinc-800 leading-relaxed font-sans">
                    🙋‍♂️ <strong>Maths Dost ka Gyaan:</strong> {storyData.explanation || "Bahut ache! Solving puzzles with algebra makes bargaining super easy. Learn how value placement reveals accurate prices!"}
                  </div>
                  <div className="flex gap-2 w-full font-sans">
                    <button
                      onClick={() => setActiveQuestStep("overview")}
                      className="flex-1 py-3 bg-zinc-200 hover:bg-zinc-350 border-3 border-black rounded-xl text-center text-xs font-sans font-black uppercase tracking-wider shadow-[3px_3px_0px_black] cursor-pointer text-black"
                    >
                      ⏪ Go to Overview
                    </button>
                    {activeVariantIndex < 19 && (
                      <button
                        onClick={() => {
                          setActiveVariantIndex((p) => p + 1);
                          setQuestStoryAnswered(false);
                          setQuestStoryOpt(null);
                        }}
                        className="flex-1 py-3 bg-black text-white hover:bg-neutral-800 border-3 border-black rounded-xl text-center text-xs font-sans font-black uppercase tracking-wider shadow-[3px_3px_0px_black] cursor-pointer"
                      >
                        EP {activeVariantIndex + 2} Next ➡️
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      );
    }

    // STEP 4 UI: CBSE Panga Quiz
    if (activeQuestStep === "quiz") {
      if (questQuizLoading) {
        return (
          <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center p-12 text-center bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_black] font-mono text-black">
            <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-black rounded-full mx-auto mb-4"></div>
            <p className="font-sans font-black uppercase text-sm">Generating 5-question custom CBSE quiz...</p>
            <span className="text-[10px] text-zinc-500 mt-1 block uppercase">Gathering syllabus question pool, please wait!</span>
          </div>
        );
      }

      const activeQ = questQuizQuestions[questQuizIdx];

      return (
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 animate-fade-in pb-12 text-black font-sans">
          
          <div className="flex justify-between items-center border-b-4 border-black pb-3 font-mono">
            <h4 className="font-sans font-black text-lg uppercase">🎯 Step 5: CBSE Panga MCQ</h4>
            <span className="bg-blue-105 border-2 border-black text-blue-700 px-3 py-1 text-xs font-black">+30 XP coins</span>
          </div>

          {activeQ ? (
            <div className="bg-white border-4 border-black p-6 sm:p-7 rounded-3xl shadow-[8px_8px_0px_black] flex flex-col gap-5 text-left">
              
              {/* Question Index and Score tracker */}
              <div className="flex justify-between items-center font-mono text-[10px] font-black uppercase border-b-2 border-black pb-2 text-zinc-400">
                <span>QUESTION {questQuizIdx + 1} OF {questQuizQuestions.length}</span>
                <span>Score: {questQuizScore}/{questQuizQuestions.length}</span>
              </div>

              {/* Progress slider bar */}
              <div className="h-3 w-full bg-zinc-100 border-2 border-black rounded-lg mb-2 overflow-hidden">
                <div 
                  className="h-full bg-[#22C55E] transition-all duration-300" 
                  style={{ width: `${((questQuizIdx + 1) / questQuizQuestions.length) * 100}%` }}
                />
              </div>

              <h3 className="font-sans font-black text-base sm:text-lg text-black uppercase leading-tight tracking-tight">
                {activeQ.question}
              </h3>

              {/* Dynamic Creative Math Visual Aid Representation */}
              {activeQ && (
                <div id="panga-quiz-visual-aid" className="mb-2 animate-fade-in shadow-[3px_3px_0px_black] rounded-2xl overflow-hidden border-3 border-black">
                  <QuizVisualAid question={activeQ} />
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                {activeQ.options.map((opt, i) => {
                  const isSelected = questQuizOpt === i;
                  const isCorrect = i === activeQ.correct;

                  let optBtnStyle = "bg-white border-black text-black hover:bg-zinc-50";
                  if (questQuizAnswered) {
                    if (isSelected) {
                      optBtnStyle = isCorrect ? "bg-[#22C55E] text-white" : "bg-[#FF4D4D] text-white";
                    } else if (i === activeQ.correct) {
                      optBtnStyle = "bg-[#22C55E]/20 text-black border-dashed";
                    } else {
                      optBtnStyle = "bg-white opacity-50 border-zinc-200 cursor-not-allowed";
                    }
                  } else if (isSelected) {
                    optBtnStyle = "bg-amber-100 font-extrabold ring-2 ring-black";
                  }

                  return (
                    <button
                      key={opt}
                      disabled={questQuizAnswered}
                      onClick={() => setQuestQuizOpt(i)}
                      className={`p-3.5 border-3 rounded-xl text-left text-xs sm:text-sm font-black transition-all shadow-[2px_2px_0px_black] cursor-pointer ${optBtnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Quiz Submit Guidance actions */}
              <div className="flex flex-col gap-3 pt-3 border-t-2 border-black border-dashed">
                {!questQuizAnswered ? (
                  <button
                    disabled={questQuizOpt === null}
                    onClick={() => {
                      if (questQuizOpt === null) return;
                      setQuestQuizAnswered(true);
                      if (questQuizOpt === activeQ.correct) {
                        setQuestQuizScore((p) => p + 1);
                      }
                    }}
                    className={`py-3.5 border-3 border-black text-center font-sans font-black text-xs uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_black] cursor-pointer ${
                      questQuizOpt === null
                        ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed shadow-none"
                        : "bg-[#22C55E] text-white hover:bg-green-600"
                    }`}
                  >
                    Submit Question!
                  </button>
                ) : (
                  <div className="flex flex-col gap-3.5 text-left">
                    <div className="p-3 bg-blue-50 border-2 border-slate-400 rounded-xl text-xs font-bold text-zinc-800 italic leading-relaxed">
                      💡 <strong>Hint:</strong> {activeQ.hint}
                    </div>
                    
                    <button
                      onClick={async () => {
                        const isLast = questQuizIdx >= questQuizQuestions.length - 1;
                        if (isLast) {
                          // Complete Panga quiz step!
                          const nextDoneList = stats.completedScreens.includes(quizKey)
                            ? stats.completedScreens
                            : [...stats.completedScreens, quizKey];

                          await updateStats({
                            completedScreens: nextDoneList,
                            xp: stats.completedScreens.includes(quizKey) ? stats.xp : stats.xp + 30
                          });
                          setActiveQuestStep("overview");
                        } else {
                          // Advance question in quiz array
                          setQuestQuizIdx((p) => p + 1);
                          setQuestQuizAnswered(false);
                          setQuestQuizOpt(null);
                        }
                      }}
                      className="py-3.5 bg-black text-white hover:bg-neutral-800 border-3 border-black rounded-xl text-center text-xs font-sans font-black uppercase tracking-wider shadow-[3px_3px_0px_black] cursor-pointer"
                    >
                      {questQuizIdx >= questQuizQuestions.length - 1 ? "Finish Quiz & Check In" : "Next Question ➡️"}
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white border-4 border-black p-12 text-center rounded-2xl">
              <p className="font-bold text-sm text-zinc-500">Creating quizzes... Prepare your calculators!</p>
            </div>
          )}

        </div>
      );
    }

    // STEP 5 UI FINAL: Claims Concept Mastery celebration screen
    if (activeQuestStep === "mastery") {
      return (
        <div className="max-w-2xl mx-auto w-full text-black flex flex-col gap-6 animate-fade-in pb-12 font-sans">
          
          <div className="bg-[#FFECC2] border-4 border-black p-8 text-center rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-5">
            <span className="text-6xl animate-bounce">🏆</span>
            
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase bg-white border border-black text-amber-600 font-extrabold px-3 py-1 rounded-md tracking-widest inline-block mb-1.5">
                CONGRATULATIONS HERO! ✓
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-black text-black uppercase tracking-tight leading-none mb-1.5">
                CONCEPT UNLOCKED!
              </h2>
              <p className="text-sm font-bold text-zinc-700 leading-relaxed max-w-md mx-auto">
                Mastery achieved! You are now the official sovereign master of <strong className="text-neutral-900">{selectedSubtopic.name.replace(/💡|🏋️|📖|🎯|🏆/g, "").trim()}</strong>!
              </p>
            </div>

            <div className="h-0.5 w-full bg-black/10 border-dashed border border-black my-2" />

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-white border-2 border-black p-3.5 rounded-xl text-center shadow-[2.5px_2.5px_0px_black]">
                <span className="text-xl">🪙</span>
                <span className="block font-sans font-black text-sm text-zinc-500 uppercase mt-0.5 leading-none">Coins Claimed</span>
                <span className="block font-mono font-black text-lg text-black mt-1">+50 XP</span>
              </div>
              <div className="bg-white border-2 border-black p-3.5 rounded-xl text-center shadow-[2.5px_2.5px_0px_black]">
                <span className="text-xl">🛡️</span>
                <span className="block font-sans font-black text-sm text-zinc-500 uppercase mt-0.5 leading-none">Gold Ribbon</span>
                <span className="block font-mono font-black text-sm text-[#22C55E] mt-1.5">✓ EARNED</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSubtopic(null)}
              className="mt-4 px-8 py-4 bg-black text-[#FFC700] hover:bg-neutral-800 border-4 border-black rounded-xl font-sans font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_green] cursor-pointer active:translate-y-0.5"
            >
              ⏩ Done — Back to Syllabus Map
            </button>
          </div>

        </div>
      );
    }

  }
}
