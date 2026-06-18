import { useState } from "react";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import HomeView from "./components/HomeView";
import LearnView from "./components/LearnView";
import QuizView from "./components/QuizView";
import StoryView from "./components/StoryView";
import VideosView from "./components/VideosView";
import LanguageSwitcher from "./components/LanguageSwitcher";
import UserMenu from "./components/UserMenu";
import { DifficultyLevel } from "./types";
import { Home, Compass, Target, BookOpen, Crown, PlayCircle } from "lucide-react";

function RootContent() {
  const { t } = useLanguage();
  const { stats } = useAuth();
  
  // Navigation & Curriculums variables
  const [activeTab, setActiveTab] = useState<"home" | "learn" | "quiz" | "story" | "videos">("home");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("intermediate");

  return (
    <div className="min-h-screen bg-[#FFC700] text-[#1A1A1A] selection:bg-white selection:text-black font-sans p-4 sm:p-6 flex flex-col gap-6">
      
      {/* 1. Header Bar (Bento Grid neo-brutalist panel) */}
      <header className="max-w-7xl mx-auto w-full bg-white border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Category badge */}
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <div className="bg-[#FF6B6B] border-4 border-black p-3.5 transform -rotate-1 shadow-[4px_4px_0px_black] select-none rounded-2xl">
            <h1 className="text-2xl sm:text-3xl font-sans font-black tracking-tighter text-white leading-none uppercase animate-pulse">
              MathsGuru AI
            </h1>
          </div>
          <div className="h-10 w-[2px] bg-black opacity-20 mx-1 hidden sm:block"></div>
          <div className="text-center sm:text-left">
            <span className="text-base font-black italic block">Maths Dost ke sath — Socho, samjho, aur solve karo! 🧠</span>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mt-0.5 inline-block bg-orange-100/80 border border-orange-400 px-1.5 py-0.5 rounded-md">
              Hinglish Classes 6-8
            </span>
          </div>
        </div>

        {/* Dynamic header widgets matching direct Bento styling */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="bg-white border-2 border-black px-4 py-1.5 flex items-center gap-2 font-black text-xs sm:text-sm rounded-xl shadow-[3px_3px_0px_black]">
            <span className="opacity-70 text-[10px] uppercase font-bold">XP Balance:</span>
            <span className="text-black font-extrabold">{stats.xp} XP</span>
            <div className="w-5 h-5 bg-[#FFC700] border-2 border-black rounded-full"></div>
          </div>
          <div className="bg-[#FF4D4D] text-white border-2 border-black px-4 py-1.5 flex items-center gap-2 font-black text-xs sm:text-sm rounded-xl shadow-[3px_3px_0px_black]">
            <span className="text-white font-extrabold">{stats.streak} DAYS</span>
            <span>🔥</span>
            {stats.streak >= 30 && <span className="text-yellow-300 text-[10px]">🏆</span>}
            {stats.streak >= 7 && stats.streak < 30 && <span className="text-blue-300 text-[10px]">🥈</span>}
            {stats.streak >= 3 && stats.streak < 7 && <span className="text-green-300 text-[10px]">🥉</span>}
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>

      </header>

      {/* 2. Main Page Scaffold Layout */}
      <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-6">
        
        {/* Navigation Core Tab Trigger Rail - Bento Layout */}
        <div className="flex bg-white border-4 border-black p-2 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] items-center flex-wrap gap-1.5 w-full">
          
          <button
            id="tab-home-btn"
            onClick={() => setActiveTab("home")}
            className={`flex-1 min-w-[124px] py-3.5 px-3 rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeTab === "home"
                ? "bg-[#FFC700] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.03]"
                : "text-zinc-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>{t("navHome")}</span>
          </button>

          <button
            id="tab-learn-btn"
            onClick={() => setActiveTab("learn")}
            className={`flex-1 min-w-[124px] py-3.5 px-3 rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeTab === "learn"
                ? "bg-[#FF6B6B] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.03]"
                : "text-zinc-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>{t("navLearn")}</span>
          </button>

          <button
            id="tab-quiz-btn"
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 min-w-[124px] py-3.5 px-3 rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeTab === "quiz"
                ? "bg-[#4D96FF] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.03]"
                : "text-zinc-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <Target className="h-5 w-5" />
            <span>{t("navQuiz")}</span>
          </button>

          <button
            id="tab-story-btn"
            onClick={() => setActiveTab("story")}
            className={`flex-1 min-w-[124px] py-3.5 px-3 rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeTab === "story"
                ? "bg-[#22C55E] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.03]"
                : "text-zinc-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <Crown className="h-5 w-5" />
            <span>{t("navStory")}</span>
          </button>

          <button
            id="tab-videos-btn"
            onClick={() => setActiveTab("videos")}
            className={`flex-1 min-w-[124px] py-3.5 px-3 rounded-xl font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
              activeTab === "videos"
                ? "bg-[#FF6B6B] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.03]"
                : "text-zinc-700 hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <PlayCircle className="h-5 w-5" />
            <span>{t("navVideos")}</span>
          </button>

        </div>

        {/* 3. Screen View Wrapper */}
        <div className="min-h-[400px]">
          <ErrorBoundary>
            {activeTab === "home" && (
              <HomeView
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "learn" && (
              <div id="progressive-syllabus-bento" className="animate-fade-in w-full">
                <LearnView difficulty={difficulty} />
              </div>
            )}
            {activeTab === "quiz" && (
              <div id="general-championship-quiz-bento" className="animate-fade-in w-full max-w-4xl mx-auto">
                <QuizView difficulty={difficulty} />
              </div>
            )}
            {activeTab === "story" && <StoryView difficulty={difficulty} />}
            {activeTab === "videos" && <VideosView />}
          </ErrorBoundary>
        </div>

      </main>

      {/* 4. Footer - Styled as a bottom bento card */}
      <footer className="max-w-7xl mx-auto w-full bg-white border-4 border-black p-6 text-center font-mono text-zinc-650 text-xs rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-4">
        <p className="font-extrabold text-black uppercase tracking-wider text-sm mb-1.5">
          📐 MathsGuru AI — {t("tagline")}
        </p>
        <p className="text-[10px] text-zinc-400">
          © 2026 MathsGuru AI. Focused on Class 6, 7 & 8 CBSE/state student micro-learning workflows.
        </p>
        <div className="mt-3.5 inline-block text-[10px] bg-sky-50 border-2 border-black text-black font-extrabold px-3.5 py-1 rounded-full select-none uppercase tracking-wider shadow-[2px_2px_0px_black] transform rotate-1">
          💡 Powered by street-smart Hinglish pedagogy
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RootContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
