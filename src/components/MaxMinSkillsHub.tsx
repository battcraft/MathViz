import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, CheckCircle, HelpCircle, Star, Sparkles, RefreshCw, Layers, 
  ArrowRight, Eye, Play, BookOpen, Trash2, Plus, Minus, Flame, Snowflake
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

interface MaxMinSkillsHubProps {
  onBack: () => void;
}

export default function MaxMinSkillsHub({ onBack }: MaxMinSkillsHubProps) {
  const { stats, updateStats } = useAuth();
  
  type TabType = "comparison" | "notation" | "interlines" | "outliers" | "challenge_lab";
  const [activeTab, setActiveTab] = useState<TabType>("comparison");

  // --- TAB 2: NOTATION FLASHCARDS ---
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // --- TAB 3: RELATIONSHIPS ---
  const [maxTemp, setMaxTemp] = useState<number>(45);
  const [minTemp, setMinTemp] = useState<number>(15);

  // --- TAB 4: OUTLIERS STATE (LIMIT BREAKERS) ---
  const initialDataPoints = [
    { id: 1, val: 22, name: "Normal Temp" },
    { id: 2, val: 56, name: "Extreme Peak" }, // Outlier
    { id: 3, val: 18, name: "Cool Breeze" },
    { id: 4, val: 5, name: "Freezing Cold" }, // Outlier
    { id: 5, val: 30, name: "Sunny Day" }
  ];
  const [dataPoints, setDataPoints] = useState(initialDataPoints);
  const [outlierLowerLimit, setOutlierLowerLimit] = useState(10);
  const [outlierUpperLimit, setOutlierUpperLimit] = useState(50);

  // --- TAB 5: CHALLENGE LAB STATE ---
  const [activeChallenge, setActiveChallenge] = useState<"ruler" | "collinear_lock">("ruler");
  
  // Challenge 1: Lassi Prices Range Calibration
  const [lassiPrices, setLassiPrices] = useState({ min: 20, max: 80 });
  const [lassiUnlocked, setLassiUnlocked] = useState(false);

  // Challenge 2: Outliers Purge
  interface RawTemp {
    id: number;
    val: number;
    processed: null | "safe" | "outlier";
  }
  const [rawTemps, setRawTemps] = useState<RawTemp[]>([
    { id: 1, val: 42, processed: null },
    { id: 2, val: 99, processed: null }, // Outlier (Max limit is 50)
    { id: 3, val: -15, processed: null }, // Outlier (Min limit is 0)
    { id: 4, val: 25, processed: null },
    { id: 5, val: 120, processed: null } // Outlier (Max limit is 50)
  ]);
  const [tempUnlocked, setTempUnlocked] = useState(false);

  const awardXp = async (amount: number) => {
    const nextXp = stats.xp + amount;
    await updateStats({ xp: nextXp });
  };

  const handleProcessTemp = (id: number, classification: "safe" | "outlier") => {
    setRawTemps(prev => {
      const updated = prev.map(t => {
        if (t.id === id) {
          return { ...t, processed: classification };
        }
        return t;
      });

      // Check if all are processed correctly
      // Limits are 0 to 50
      const allDone = updated.every(t => t.processed !== null);
      if (allDone) {
        const correct = updated.every(t => {
          const isRealOutlier = t.val < 0 || t.val > 50;
          return (isRealOutlier && t.processed === "outlier") || (!isRealOutlier && t.processed === "safe");
        });
        if (correct && !tempUnlocked) {
          setTempUnlocked(true);
          awardXp(20);
        }
      }
      return updated;
    });
  };

  const handleAdjustLassi = (type: "min" | "max", change: number) => {
    setLassiPrices(prev => {
      const nMin = type === "min" ? Math.max(10, prev.min + change) : prev.min;
      const nMax = type === "max" ? Math.min(150, prev.max + change) : prev.max;
      
      const currentRange = nMax - nMin;
      // Goal: Range is exactly 35
      if (currentRange === 35) {
        if (!lassiUnlocked) {
          setLassiUnlocked(true);
          awardXp(15);
        }
      } else {
        setLassiUnlocked(false);
      }
      return { min: nMin, max: nMax };
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12 font-mono text-black">
      
      {/* HEADER SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-black pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-sans font-black text-black border-3 border-black p-2.5 px-4 rounded-xl bg-white hover:bg-neutral-50 shadow-[3px_3px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_black] cursor-pointer transition-all"
        >
          <ArrowLeft className="h-4 w-4 stroke-[3.5px]" />
          <span>Back to Chapters</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-black">
          <span className="bg-rose-100 text-rose-800 border-2 border-black py-1 px-3 rounded-lg flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 font-bold" /> Max/Min Analysis
          </span>
          <span className="opacity-40">/</span>
          <span className="text-zinc-600 font-bold">🔧 Max/Min Skills</span>
        </div>
      </div>

      {/* COMPACT INTRO */}
      <div className="bg-zinc-900 border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] text-white text-left relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none select-none flex items-center justify-center font-sans font-black text-9xl">
          🔍
        </div>
        <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider bg-amber-950/80 px-2.5 py-1 border border-amber-500 rounded-lg inline-block mb-2">
          ⚡ 5-in-1 Max/Min Synthesis Hub
        </span>
        <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight mb-1 flex items-center gap-2">
          Uchhatam-Nyunatam Siddhanta <Flame className="h-5 w-5 text-rose-400 fill-rose-400 inline animate-pulse" />
        </h3>
        <p className="text-xs text-zinc-300 font-sans font-bold max-w-2xl leading-relaxed">
          Master the metrics of extremes! Let's contrast Maximum, Minimum, and Range side-by-side, learn boundary inequality symbols, track limit shifts, weed out rogue outliers, and beat precise calibration labs!
        </p>
      </div>

      {/* TAB NAVIGATION */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border-b-4 border-black pb-4">
        {[
          { id: "comparison", label: "📊 Limit Matrix", color: "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-400" },
          { id: "notation", label: "🏷️ Upper & Lower", color: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-400" },
          { id: "interlines", label: "🛣️ Range Swell", color: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-400" },
          { id: "outliers", label: "📈 Outlier Tracker", color: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-400" },
          { id: "challenge_lab", label: "🏆 Calib Labs", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-400" },
        ].map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as any);
                setFlippedCard(null);
              }}
              className={`p-2.5 rounded-xl font-black text-xs border-3 border-black cursor-pointer text-center tracking-tight transition-all active:translate-y-0.5 select-none font-sans uppercase flex flex-col items-center justify-center gap-1 ${
                isActive 
                  ? "bg-zinc-900 text-white shadow-[2px_2px_0px_black]" 
                  : `${t.color} shadow-none`
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* CORE DISPLAY WORKSPACE */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_black] min-h-[460px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LIMIT MATRIX */}
          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-5"
            >
              <div>
                <span className="text-[10px] font-black text-rose-650 block mb-0.5">MODULE 1 • SIDE-BY-SIDE MATRIX</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Extremes Synthesis Board</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Doston, let's look at Maximum, Minimum, and Range together on one master screen so we never mix up the spread of variables!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
                
                {/* MAXIMUM CARD */}
                <div className="border-4 border-black bg-rose-50/40 p-4 rounded-xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-rose-100 text-rose-800 border-2 border-black font-extrabold px-2 py-0.5 rounded text-[9px] uppercase font-sans">
                        Upper Ceiling
                      </span>
                      <Flame className="h-4 w-4 text-rose-500 fill-rose-500" />
                    </div>
                    <h5 className="font-sans font-black text-base text-rose-950 uppercase">Maximum (Uchhatam)</h5>
                    <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-relaxed">
                      The absolute peerless zenith of your data coordinates. Nothing can rise beyond this threshold!
                    </p>

                    <div className="bg-rose-950/90 text-white rounded-lg p-2.5 my-3 text-center border-2 border-black">
                      <span className="block text-[9px] text-rose-300 font-bold uppercase">IPL Team Top Score</span>
                      <span className="text-xl font-sans font-black text-yellow-300">263/5</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-600 leading-normal font-sans font-bold">
                    💡 <strong>Pro Concept:</strong> Represents the maximum ceiling where any data coordinate value must satisfy: <span className="text-rose-700 font-mono">X &le; MAX</span>.
                  </div>
                </div>

                {/* MINIMUM CARD */}
                <div className="border-4 border-black bg-blue-50/40 p-4 rounded-xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-blue-100 text-blue-800 border-2 border-black font-extrabold px-2 py-0.5 rounded text-[9px] uppercase font-sans">
                        Floor Baseline
                      </span>
                      <Snowflake className="h-4 w-4 text-blue-500" />
                    </div>
                    <h5 className="font-sans font-black text-base text-blue-950 uppercase">Minimum (Nyunatam)</h5>
                    <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-relaxed">
                      The lowest possible base floor. The baseline below which no value can descend in coordinates.
                    </p>

                    <div className="bg-blue-950/90 text-white rounded-lg p-2.5 my-3 text-center border-2 border-black">
                      <span className="block text-[9px] text-blue-300 font-bold uppercase">Samosa Base Cost</span>
                      <span className="text-xl font-sans font-black text-yellow-300">Rs. 5.00</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-600 leading-normal font-sans font-bold">
                    💡 <strong>Pro Concept:</strong> Represents the floor boundary where any data coordinate value must satisfy: <span className="text-blue-700 font-mono">X &ge; MIN</span>.
                  </div>
                </div>

                {/* RANGE CARD */}
                <div className="border-4 border-black bg-purple-50/40 p-4 rounded-xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-purple-100 text-purple-800 border-2 border-black font-extrabold px-2 py-0.5 rounded text-[9px] uppercase font-sans">
                        Volatility Gap
                      </span>
                      <span className="text-sm">📏</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-purple-950 uppercase">Range (Fasla)</h5>
                    <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-relaxed">
                      The distance/spread separating your absolute peaks. Represents consistency or high volatility.
                    </p>

                    <div className="bg-purple-950/90 text-white rounded-lg p-2.5 my-3 text-center border-2 border-black">
                      <span className="block text-[9px] text-purple-300 font-bold uppercase">Fasla Formula</span>
                      <span className="text-xs font-sans font-black text-yellow-300">MAX &minus; MIN</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-600 leading-normal font-sans font-bold">
                    💡 <strong>Pro Concept:</strong> A wide range means massive swing volatility. A narrow range means highly consistent values.
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: NOTATION FLASHCARDS */}
          {activeTab === "notation" && (
            <motion.div
              key="notation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-amber-600 block mb-0.5">MODULE 2 • NOTATION SYMBOLS</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Ceiling & Floor Notations</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Math textbooks write bounds in inequalities. Tap on each card to flip and master the Hinglish visualization of limits!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
                
                {/* Max Inequality Card */}
                <div 
                  onClick={() => setFlippedCard(flippedCard === "max" ? null : "max")}
                  className="h-[185px] w-full rounded-2xl border-4 border-black bg-[#FFF9E6] hover:bg-[#FFF3CD] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "max" ? (
                      <motion.div 
                        key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center">
                          <Flame className="h-5 w-5 text-rose-500 fill-rose-500" />
                          <span className="text-[9px] bg-amber-200 border border-black px-1.5 py-0.5 rounded uppercase font-bold text-amber-800">Tap to flip</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-amber-900">Max Inequality</h6>
                          <div className="text-2xl font-black mt-2">
                            X &le; MAX
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">"Lesser than or equal to"</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Inequality Standard &le;</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-amber-400 text-xs uppercase font-sans block mb-1">💡 What it means:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Iska matlab hai aap temperature ya price kitna bhi badha lo, woh MAXIMUM ceiling limit se zyaada kabhi nahi ho sakta."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Example:</strong> Marks &le; 100
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Min Inequality Card */}
                <div 
                  onClick={() => setFlippedCard(flippedCard === "min" ? null : "min")}
                  className="h-[185px] w-full rounded-2xl border-4 border-black bg-[#E8F0FE] hover:bg-[#D2E3FC] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "min" ? (
                      <motion.div 
                        key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center">
                          <Snowflake className="h-5 w-5 text-blue-500" />
                          <span className="text-[9px] bg-blue-200 border border-black px-1.5 py-0.5 rounded uppercase font-bold text-blue-800">Tap to flip</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-blue-900">Min Inequality</h6>
                          <div className="text-2xl font-black mt-2">
                            X &ge; MIN
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">"Greater than or equal to"</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Inequality Standard &ge;</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-blue-400 text-xs uppercase font-sans block mb-1">💡 What it means:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Aap values ko kitna bhi kam kar lo, woh is MINIMUM floor limit se neeche drop nahi karega. Block scale is locked."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Example:</strong> Age &ge; 18
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Range Equation Card */}
                <div 
                  onClick={() => setFlippedCard(flippedCard === "range" ? null : "range")}
                  className="h-[185px] w-full rounded-2xl border-4 border-black bg-[#FCE8E6] hover:bg-[#FAD2CF] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "range" ? (
                      <motion.div 
                        key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xl">📏</span>
                          <span className="text-[9px] bg-rose-200 border border-black px-1.5 py-0.5 rounded uppercase font-bold text-rose-800">Tap to flip</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-rose-950">Range Equation</h6>
                          <div className="text-2xl font-black mt-2">
                            R = MAX &minus; MIN
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">Subtraction calculation</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Algebra Formula</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-rose-400 text-xs uppercase font-sans block mb-1">💡 What it means:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Maximum value mein se Minimum value ko minus kar do to get the RANGE (Fasla/Gap). Yeh total variance batata hai."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Example:</strong> Range = 100 - 15 = 85
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: SPLIT RANGE SWELL RELATIONSHIP */}
          {activeTab === "interlines" && (
            <motion.div
              key="interlines"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-blue-650 block mb-0.5">MODULE 3 • RANGE VOLATILITY SWELL</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">How Minimum and Maximum Gobern Range</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Slide or click to shift the Temperature Thresholds below, and watch how the overall **Range (Fasla)** of the day widens or narrows instantly on the live weather bar chart!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Sliders on Left */}
                <div id="sliders-left-panel" className="md:col-span-5 flex flex-col gap-4 bg-zinc-50 p-4 border-3 border-black rounded-2xl">
                  {/* Maximum Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-rose-900 uppercase">Maximum Peak Hotness:</span>
                      <span className="text-rose-650 text-sm">{maxTemp}°C</span>
                    </div>
                    <input 
                      type="range" min="30" max="60" value={maxTemp}
                      onChange={(e) => setMaxTemp(parseInt(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
                    />
                    <span className="text-[9px] text-zinc-400">Slide to heat things up!</span>
                  </div>

                  {/* Minimum Slider */}
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-blue-900 uppercase">Minimum Cooling Floor:</span>
                      <span className="text-blue-650 text-sm">{minTemp}°C</span>
                    </div>
                    <input 
                      type="range" min="-10" max="25" value={minTemp}
                      onChange={(e) => setMinTemp(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
                    />
                    <span className="text-[9px] text-zinc-400">Slide to chill things down!</span>
                  </div>

                  <div className="border-t border-black/10 pt-2 text-xs">
                    <div className="flex justify-between font-black">
                      <span className="uppercase text-purple-900">Fasla (Range):</span>
                      <span className="text-purple-700 text-sm bg-purple-50 px-2 border border-purple-300 rounded">
                        {maxTemp - minTemp}°C
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Swell Chart on Right */}
                <div className="md:col-span-7 flex flex-col items-center">
                  <div className="w-full max-w-[340px] bg-[#143D30] border-4 border-[#5C3214] rounded-2xl p-5 shadow-[4px_4px_0px_black] relative h-[220px] flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                    
                    {/* Visualizer Scale bar */}
                    <div className="relative w-full h-8 bg-zinc-950/80 rounded-xl border border-zinc-700 flex items-center p-1 mt-6">
                      
                      {/* Active Range Fill block */}
                      <div 
                        style={{
                          left: `${((minTemp + 10) / 70) * 100}%`,
                          width: `${((maxTemp - minTemp) / 70) * 100}%`
                        }}
                        className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-400 to-rose-400 rounded-lg border border-white/50 flex justify-between items-center px-2 transition-all duration-150"
                      >
                        <span className="text-[7px] text-white font-black">{minTemp}°</span>
                        <span className="text-[8px] text-white font-extrabold bg-black/60 px-1 rounded uppercase">FASLA</span>
                        <span className="text-[7px] text-white font-black">{maxTemp}°</span>
                      </div>

                    </div>

                    <div className="flex justify-between text-[8px] text-zinc-400 px-1 select-none font-bold">
                      <span>-10°C (MIN BOUND)</span>
                      <span>30°C</span>
                      <span>60°C (MAX BOUND)</span>
                    </div>

                    <div className="text-center text-white bg-black/40 border border-white/15 p-2 rounded-lg text-[9px] uppercase font-bold leading-relaxed relative z-10">
                      🛰️ Live Weather Radar: Range is <strong className="text-yellow-300 text-xs">{maxTemp - minTemp}°C</strong>. 
                      {maxTemp - minTemp > 45 ? " (Extreme variance!)" : " (Stable weather range)"}
                    </div>

                    <span className="absolute top-2 right-2 bg-black/80 text-[8px] px-2 py-0.5 text-emerald-400 font-bold uppercase rounded">
                      SWELL RADAR
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: OUTLIER TRACKER (LIMIT BREAKERS) */}
          {activeTab === "outliers" && (
            <motion.div
              key="outliers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-purple-600 block mb-0.5">MODULE 4 • LIMIT BREAKERS (OUTLIERS)</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Spotting rogue elements outside borders</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  An **Outlier (Limit-Breaker)** is any coordinate that escapes the safe, established limits (less than Min or greater than Max). Adjust the limits using buttons below to instantly filter outliers!
                </p>
              </div>

              <div className="bg-neutral-50 p-4 border-3 border-black rounded-2xl">
                {/* Limit sliders */}
                <div className="flex flex-wrap justify-between gap-4 border-b border-black/10 pb-3 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-900 uppercase text-[10px]">Min Floor Limit:</span>
                    <button 
                      onClick={() => setOutlierLowerLimit(prev => Math.max(0, prev - 5))}
                      className="p-1 px-2 border-2 border-black rounded bg-white hover:bg-zinc-550 font-black cursor-pointer text-[10px]"
                    >
                      &minus;
                    </button>
                    <strong className="text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded text-sm">{outlierLowerLimit}°C</strong>
                    <button 
                      onClick={() => setOutlierLowerLimit(prev => Math.min(outlierUpperLimit - 10, prev + 5))}
                      className="p-1 px-2 border-2 border-black rounded bg-white hover:bg-zinc-550 font-black cursor-pointer text-[10px]"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-900 uppercase text-[10px]">Max Ceiling Limit:</span>
                    <button 
                      onClick={() => setOutlierUpperLimit(prev => Math.max(outlierLowerLimit + 10, prev - 5))}
                      className="p-1 px-2 border-2 border-black rounded bg-white hover:bg-zinc-550 font-black cursor-pointer text-[10px]"
                    >
                      &minus;
                    </button>
                    <strong className="text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded text-sm">{outlierUpperLimit}°C</strong>
                    <button 
                      onClick={() => setOutlierUpperLimit(prev => Math.min(100, prev + 5))}
                      className="p-1 px-2 border-2 border-black rounded bg-white hover:bg-zinc-550 font-black cursor-pointer text-[10px]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Data Points list */}
                <span className="text-[10px] uppercase font-extrabold text-zinc-500 block mb-2">Live Coordinates scan:</span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {dataPoints.map((pt) => {
                    const isOutlier = pt.val < outlierLowerLimit || pt.val > outlierUpperLimit;

                    return (
                      <div 
                        key={pt.id}
                        className={`p-3 border-3 border-black rounded-xl text-center flex flex-col justify-between h-[100px] transition-all duration-300 ${
                          isOutlier 
                            ? "bg-rose-100 border-rose-600 text-rose-900 shadow-[2px_2px_0px_#E11D48] scale-[0.98]" 
                            : "bg-emerald-50 border-emerald-400 text-emerald-900"
                        }`}
                      >
                        <span className="block text-[8px] uppercase tracking-tighter text-zinc-500 font-extrabold">{pt.name}</span>
                        <span className="block text-xl font-sans font-black my-1">{pt.val}°C</span>
                        <span className={`block text-[8px] font-sans font-black uppercase px-1 py-0.5 border rounded ${
                          isOutlier ? "bg-rose-200 border-rose-500 text-rose-700 animate-pulse" : "bg-emerald-200 border-emerald-500 text-emerald-700"
                        }`}>
                          {isOutlier ? "🚨 OUTLIER" : "🟢 SAFE"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: CALIBRATION PRACTICE LABS */}
          {activeTab === "challenge_lab" && (
            <motion.div
              key="challenge_lab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-emerald-600 block mb-0.5">MODULE 5 • INTERACTIVE CALIBRATION LABS</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Task-Driven Extremes Challenges</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Select a goal-oriented practice drill to test your maximum, minimum, and range calculations!
                </p>
              </div>

              {/* Challenge Sub-Selector */}
              <div className="flex gap-2 border-b border-black/10 pb-3 mb-1 select-none">
                <button
                  onClick={() => setActiveChallenge("ruler")}
                  className={`p-2 px-4 border-2 border-black rounded-lg text-xs font-black cursor-pointer transition-all ${
                    activeChallenge === "ruler" ? "bg-black text-white" : "bg-zinc-50 text-black hover:bg-zinc-100"
                  }`}
                >
                  🥛 Drill 1: Lassi Price Spread
                </button>
                <button
                  onClick={() => setActiveChallenge("collinear_lock")}
                  className={`p-2 px-4 border-2 border-black rounded-lg text-xs font-black cursor-pointer transition-all ${
                    activeChallenge === "collinear_lock" ? "bg-black text-white" : "bg-zinc-50 text-black hover:bg-zinc-100"
                  }`}
                >
                  🛰️ Drill 2: Crop Dataset Securer
                </button>
              </div>

              {/* CHALLENGE 1 SCREEN */}
              {activeChallenge === "ruler" && (
                <div id="lassi-challenge-panel" className="bg-[#FFFDF5] border-3 border-black p-4 rounded-xl flex flex-col gap-4">
                  <div>
                    <span className="bg-yellow-100 text-yellow-800 border-2 border-black px-2 py-0.5 rounded text-[8px] font-black uppercase inline-block">
                      Calibration Goal
                    </span>
                    <p className="text-xs font-black text-zinc-800 mt-1.5 leading-relaxed">
                      "Doston, adjust the prices of Lassi below so that the Range (Fasla) between the cheapest cup (Min) and the absolute costliest premium glass (Max) is <strong className="text-rose-600">exactly Rs. 35</strong>!"
                    </p>
                  </div>

                  {/* Pricing interactive panel */}
                  <div className="flex flex-wrap items-center justify-around gap-4 border-2 border-black bg-white p-4 rounded-xl">
                    {/* Minimum price controls */}
                    <div className="text-center">
                      <span className="block text-[10px] text-zinc-500 uppercase font-black">Cheapest Lassi (Min)</span>
                      <strong className="block text-2xl font-sans font-black text-zinc-900 mt-1">Rs. {lassiPrices.min}</strong>
                      <div className="flex justify-center gap-1.5 mt-2 select-none">
                        <button 
                          onClick={() => handleAdjustLassi("min", -5)}
                          className="h-7 w-8 border-2 border-black bg-zinc-100 rounded active:translate-y-0.5 transition-all text-xs font-black cursor-pointer"
                        >
                          &minus;5
                        </button>
                        <button 
                          onClick={() => handleAdjustLassi("min", 5)}
                          className="h-7 w-8 border-2 border-black bg-zinc-100 rounded active:translate-y-0.5 transition-all text-xs font-black cursor-pointer"
                        >
                          +5
                        </button>
                      </div>
                    </div>

                    {/* Volatility Math indicator inside middle */}
                    <div className="text-center px-4 border-l border-r border-black/10 py-1.5 min-w-[120px]">
                      <span className="block text-[8px] text-zinc-400 uppercase font-black">Present Range (Fasla)</span>
                      <span className="text-xl font-sans font-black text-purple-700 bg-purple-50 inline-block px-3 py-1 border border-purple-200 rounded-lg mt-1">
                        Rs. {lassiPrices.max - lassiPrices.min}
                      </span>
                    </div>

                    {/* Maximum price controls */}
                    <div className="text-center">
                      <span className="block text-[10px] text-zinc-500 uppercase font-black">Premium Lassi (Max)</span>
                      <strong className="block text-2xl font-sans font-black text-zinc-900 mt-1">Rs. {lassiPrices.max}</strong>
                      <div className="flex justify-center gap-1.5 mt-2 select-none">
                        <button 
                          onClick={() => handleAdjustLassi("max", -5)}
                          className="h-7 w-8 border-2 border-black bg-zinc-100 rounded active:translate-y-0.5 transition-all text-xs font-black cursor-pointer"
                        >
                          &minus;5
                        </button>
                        <button 
                          onClick={() => handleAdjustLassi("max", 5)}
                          className="h-7 w-8 border-2 border-black bg-zinc-100 rounded active:translate-y-0.5 transition-all text-xs font-black cursor-pointer"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Unlock result alerts */}
                  <div>
                    {lassiUnlocked ? (
                      <div id="lassi-perfect-success" className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-xs text-emerald-800 font-extrabold flex items-center gap-2 animate-bounce">
                        <CheckCircle className="h-5 w-5 text-emerald-600 fill-white" />
                        <span>Arey Bahut Badhiya! Limit Calibrated! You proved Range is exactly Rs. 35 (Rs. {lassiPrices.max} - Rs. {lassiPrices.min}). XP Awarded!</span>
                      </div>
                    ) : (
                      <div id="lassi-instruction-tag" className="bg-zinc-50 border-3 border-black/15 p-3 rounded-xl text-[10px] text-zinc-500 leading-normal font-sans font-bold">
                        ℹ️ Hint: Increase Cheapest to Rs. 45 and drop Premium to Rs. 80, or balance any points where the total subtracted gap is exactly Rs. 35!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CHALLENGE 2 SCREEN */}
              {activeChallenge === "collinear_lock" && (
                <div id="temp-challenge-panel" className="bg-[#FFFDF5] border-3 border-black p-4 rounded-xl flex flex-col gap-3">
                  <div>
                    <span className="bg-[#E0F2FE] text-blue-800 border-2 border-black px-2 py-0.5 rounded text-[8px] font-black uppercase inline-block">
                      Agronomist Grid Goal
                    </span>
                    <p className="text-xs font-black text-zinc-800 mt-1 leading-relaxed">
                      "A list of temperature reports comes in from Delhi agricultural weather sensors. The legal operating framework limits are <strong className="text-indigo-600">0°C (Min) to 50°C (Max)</strong>. Classify all sensor coordinates as Safe or Outliers below!"
                    </p>
                  </div>

                  {/* Active Sensor List */}
                  <div className="flex flex-col gap-2">
                    {rawTemps.map((rt) => (
                      <div 
                        key={rt.id}
                        className="flex flex-wrap items-center justify-between border-2 border-black p-2.5 rounded-xl bg-white text-xs gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                          <span className="font-sans text-zinc-600 font-bold">Sensor #{rt.id}:</span>
                          <strong className="text-sm font-sans font-black">{rt.val}°C</strong>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 select-none">
                          <button
                            onClick={() => handleProcessTemp(rt.id, "safe")}
                            className={`p-1.5 px-3 rounded-lg border-2 text-[10px] font-black cursor-pointer transition-all ${
                              rt.processed === "safe" 
                                ? "bg-emerald-500 text-white border-emerald-600" 
                                : "bg-neutral-50 hover:bg-neutral-100 border-black/10"
                            }`}
                          >
                            🟢 Safe (Within 0-50)
                          </button>
                          <button
                            onClick={() => handleProcessTemp(rt.id, "outlier")}
                            className={`p-1.5 px-3 rounded-lg border-2 text-[10px] font-black cursor-pointer transition-all ${
                              rt.processed === "outlier" 
                                ? "bg-rose-500 text-white border-rose-600" 
                                : "bg-neutral-50 hover:bg-neutral-100 border-black/10"
                            }`}
                          >
                            🚨 Outlier (Limits broken!)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Results verification tag */}
                  <div>
                    {tempUnlocked ? (
                      <div id="crop-perfect-success" className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-xs text-emerald-800 font-extrabold flex items-center gap-2 animate-bounce">
                        <CheckCircle className="h-5 w-5 text-emerald-600 fill-white" />
                        <span>Siddh Shastra Mastered! Sensor outlier sweep complete! Safe database secured in Hinglish. XP Awarded!</span>
                      </div>
                    ) : (
                      <div className="text-[10px] font-sans font-bold text-zinc-500 text-center uppercase bg-zinc-50 p-1 border border-black/10 rounded">
                        ℹ️ Finish organizing all 5 coordinates to confirm lock!
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
