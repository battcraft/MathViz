import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, CheckCircle, HelpCircle, Star, Sparkles, RefreshCw, Layers, 
  ArrowRight, Eye, Play, BookOpen, Trash2, Plus, Minus, Scale
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

interface CompareSkillsHubProps {
  onBack: () => void;
}

export default function CompareSkillsHub({ onBack }: CompareSkillsHubProps) {
  const { stats, updateStats } = useAuth();
  
  type TabType = "comparison" | "notation" | "decimal_grid" | "trichotomy" | "challenge_lab";
  const [activeTab, setActiveTab] = useState<TabType>("comparison");

  // --- TAB 2: FLIP CARDS ---
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // --- TAB 3: DECIMAL GRID ---
  const [decimalVal, setDecimalVal] = useState<number>(0.4); // ranges from 0.01 to 1.00

  // --- TAB 4: TRICHOTOMY SCALE ---
  const [numA, setNumA] = useState<number>(-5);
  const [numB, setNumB] = useState<number>(3.5);
  const [numC, setNumC] = useState<number>(0.15);

  // --- TAB 5: CHALLENGE STATE ---
  const [activeChallenge, setActiveChallenge] = useState<"gator" | "rounding">("gator");
  
  // Gator Inequality operators
  const [opLeft, setOpLeft] = useState<">" | "<" | "=">("=");
  const [opRight, setOpRight] = useState<">" | "<" | "=">("=");
  const gatorUnlocked = (opLeft === "<" && opRight === "<"); // Condition: -4.5 < 0.05 < 0.5 is correct math!

  // Rounding invoice challenge
  interface OrderItem {
    id: number;
    desc: string;
    exact: number;
    rounded: number | null;
  }
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: 1, desc: "Lassi Standard (Rs. 43.60)", exact: 43.60, rounded: null }, // rounds to 44
    { id: 2, desc: "Premium Kesar (Rs. 89.25)", exact: 89.25, rounded: null },  // rounds to 89
    { id: 3, desc: "Samosa Parcel (Rs. 24.50)", exact: 24.50, rounded: null },  // rounds to 25 (50-or-up rounds up)
    { id: 4, desc: "Chai Kulhad (Rs. 12.10)", exact: 12.10, rounded: null },    // rounds to 12
    { id: 5, desc: "Rabdi Plate (Rs. 67.85)", exact: 67.85, rounded: null }     // rounds to 68
  ]);
  const [roundedUnlocked, setRoundedUnlocked] = useState(false);

  const awardXp = async (amount: number) => {
    const nextXp = stats.xp + amount;
    await updateStats({ xp: nextXp });
  };

  const handleAdjustRounding = (id: number, val: number) => {
    setOrders(prev => {
      const updated = prev.map(o => o.id === id ? { ...o, rounded: val } : o);
      
      const allDone = updated.every(o => o.rounded !== null);
      if (allDone) {
        // Validation check
        const correct = updated.every(o => {
          const expected = Math.round(o.exact);
          return o.rounded === expected;
        });
        if (correct && !roundedUnlocked) {
          setRoundedUnlocked(true);
          awardXp(25);
        }
      }
      return updated;
    });
  };

  useEffect(() => {
    if (gatorUnlocked) {
      awardXp(15);
    }
  }, [opLeft, opRight]);

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
          <span className="bg-amber-100 text-amber-800 border-2 border-black py-1 px-3 rounded-lg flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 font-bold" /> Number Comparisons
          </span>
          <span className="opacity-40">/</span>
          <span className="text-zinc-600 font-bold">🔧 Number Skills</span>
        </div>
      </div>

      {/* SYLLABUS SKILLS HERO ROADMAP */}
      <div className="bg-zinc-900 border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] text-white text-left relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none select-none flex items-center justify-center font-sans font-black text-9xl">
          🔢
        </div>
        <span className="text-[10px] text-yellow-400 font-black uppercase tracking-wider bg-yellow-950/80 px-2.5 py-1 border border-yellow-500 rounded-lg inline-block mb-2">
          ⚡ 5-in-1 Compare Synthesis Hub
        </span>
        <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight mb-1 flex items-center gap-2">
          Tulanatmak Shastra <Scale className="h-5 w-5 text-amber-400 inline" />
        </h3>
        <p className="text-xs text-zinc-300 font-sans font-bold max-w-2xl leading-relaxed">
          Master decimal and negative numbers! Let's contrast decimal traps, flip crocodile inequality operators, visualize grids to realize weights, and solve nearest-rupee bill rounding speed tests!
        </p>
      </div>

      {/* CORE NAVIGATION TAB RAIL */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border-b-4 border-black pb-4">
        {[
          { id: "comparison", label: "📊 Number Matrix", color: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-400" },
          { id: "notation", label: "🏷️ Gator Symbol", color: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-400" },
          { id: "decimal_grid", label: "🛣️ Decimal Grid", color: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-400" },
          { id: "trichotomy", label: "📈 Trichotomy", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-400" },
          { id: "challenge_lab", label: "🏆 Rounding Lab", color: "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-400" },
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

      {/* WORKSPACE AREA */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_black] min-h-[460px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CONTRAST MATRIX */}
          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-5"
            >
              <div>
                <span className="text-[10px] font-black text-blue-600 block mb-0.5">MODULE 1 • SIDE-BY-SIDE MATRIX</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Comparing Synthesis Board</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Doston, avoid the classic digit traps! Let's contrast different number systems side-by-side.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
                
                {/* WHOLE NUMBERS CRITERION */}
                <div className="border-4 border-black bg-blue-50/40 p-4 rounded-xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-blue-100 text-blue-800 border-2 border-black font-extrabold px-1.5 py-0.5 rounded text-[8px] uppercase font-sans">
                        Digit Count
                      </span>
                      <span className="text-sm">🔢</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-blue-950 uppercase">Whole Numbers</h5>
                    <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-relaxed">
                      Straightforward comparison. More digits almost always means a larger value. Count left columns first.
                    </p>

                    <div className="bg-blue-950/90 text-white rounded-lg p-2.5 my-3 text-center border-2 border-black">
                      <span className="block text-[8px] text-blue-300 font-bold uppercase">Basic Order comparison</span>
                      <span className="text-lg font-sans font-black text-yellow-300">92,100 &gt; 8,995</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-600 leading-normal font-sans font-bold">
                    💡 <strong>Pro Concept:</strong> When digit counts are equal, start comparing values card column-by-column from left to right.
                  </div>
                </div>

                {/* DECIMALS CRITERION */}
                <div className="border-4 border-black bg-amber-50/40 p-4 rounded-xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-amber-100 text-amber-800 border-2 border-black font-extrabold px-1.5 py-0.5 rounded text-[8px] uppercase font-sans">
                        Tenths Rule
                      </span>
                      <span className="text-sm">⚖️</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-amber-950 uppercase">Decimal Deciders</h5>
                    <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-relaxed">
                      Avoid the length trap! Adding zeroes on the right doesn't alter value weight, but sliding digits left changes everything.
                    </p>

                    <div className="bg-amber-950/90 text-white rounded-lg p-2.5 my-3 text-center border-2 border-black">
                      <span className="block text-[8px] text-amber-300 font-bold uppercase">Classic Trap debunked!</span>
                      <span className="text-lg font-sans font-black text-yellow-300">0.5 &gt; 0.05</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-600 leading-normal font-sans font-bold">
                    💡 <strong>Pro Concept:</strong> 0.5 stands for 5 tenths. 0.05 has exactly 0 tenths, making 0.5 much larger despite less digits!
                  </div>
                </div>

                {/* NEGATIVE NUMBERS */}
                <div className="border-4 border-black bg-rose-50/40 p-4 rounded-xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-rose-100 text-rose-800 border-2 border-black font-extrabold px-1.5 py-0.5 rounded text-[8px] uppercase font-sans">
                        Debt Analogy
                      </span>
                      <span className="text-sm">❄️</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-rose-950 uppercase">Negative Values</h5>
                    <p className="text-[11px] font-sans text-zinc-600 mt-1 leading-relaxed">
                      With negative numbers, more magnitude means a LOWER value. Think of debt: Rs. 50 debt is worse than Rs. 10 debt!
                    </p>

                    <div className="bg-rose-950/90 text-white rounded-lg p-2.5 my-3 text-center border-2 border-black">
                      <span className="block text-[8px] text-rose-300 font-bold uppercase">Debt/Negative Balance</span>
                      <span className="text-lg font-sans font-black text-yellow-300">-10 &gt; -50</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-600 leading-normal font-sans font-bold">
                    💡 <strong>Pro Concept:</strong> On a physical 1D number line, any value closer to the right (positive wing) is larger.
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: GATOR SYMBOLS */}
          {activeTab === "notation" && (
            <motion.div
              key="notation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-amber-600 block mb-0.5">MODULE 2 • NOTATION REVELATIONS</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Crocodile Crocodile!</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Click on these cards to flip them and inspect the iconic math layout notations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
                
                {/* Gator Greater Card */}
                <div 
                  onClick={() => setFlippedCard(flippedCard === "greater" ? null : "greater")}
                  className="h-[185px] w-full rounded-2xl border-4 border-black bg-[#FFF9E6] hover:bg-[#FFF3CD] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "greater" ? (
                      <motion.div 
                        key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center font-black">
                          <span>🐊</span>
                          <span className="text-[8px] bg-amber-200 border border-black px-1.5 py-0.5 rounded uppercase text-amber-800">Tap to flip</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-amber-900">Greater Than</h6>
                          <div className="text-3xl font-black mt-2">
                            X &gt; Y
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">"X is larger than Y"</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Gator wide mouth points left</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-amber-400 text-xs uppercase font-sans block mb-1">💡 Real-life Memorizer:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Mouth side is WIDE OPEN (bada size) showing hunger towards the larger quantity value X!"
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Pronounce:</strong> "X stands greater than Y"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gator Lesser Card */}
                <div 
                  onClick={() => setFlippedCard(flippedCard === "lesser" ? null : "lesser")}
                  className="h-[185px] w-full rounded-2xl border-4 border-black bg-[#E8F0FE] hover:bg-[#D2E3FC] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "lesser" ? (
                      <motion.div 
                        key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center font-black">
                          <span>🦖</span>
                          <span className="text-[8px] bg-blue-200 border border-black px-1.5 py-0.5 rounded uppercase text-blue-800">Tap to flip</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-blue-900">Lesser Than</h6>
                          <div className="text-3xl font-black mt-2">
                            X &lt; Y
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">"X is smaller than Y"</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Pointy narrow side faces left</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-blue-400 text-xs uppercase font-sans block mb-1">💡 Real-life Memorizer:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Mouth is CLOSED (chhota size) on the left of X, indicating it holds the lighter value."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Pronounce:</strong> "X stands lesser than Y"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Estimation Symbol */}
                <div 
                  onClick={() => setFlippedCard(flippedCard === "approx" ? null : "approx")}
                  className="h-[185px] w-full rounded-2xl border-4 border-black bg-[#FCE8E6] hover:bg-[#FAD2CF] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "approx" ? (
                      <motion.div 
                        key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center font-black">
                          <span>🧮</span>
                          <span className="text-[8px] bg-rose-200 border border-black px-1.5 py-0.5 rounded uppercase text-rose-800">Tap to flip</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-rose-950">Approximate Symbol</h6>
                          <div className="text-3xl font-black mt-2">
                            X &approx; Y
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">"Roughly/Rounded Equals"</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Inequality Standard &approx;</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-rose-400 text-xs uppercase font-sans block mb-1">💡 What it means:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Jab hum exact numbers ke bajay estimations use karte hain (jaise billing rounding me), we use double wavy lines."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Example:</strong> Rs. 43.85 &approx; Rs. 44
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: DECIMAL 100-GRID REPRESENTATION */}
          {activeTab === "decimal_grid" && (
            <motion.div
              key="decimal_grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-purple-600 block mb-0.5">MODULE 3 • GRID LAYOUT STRENGTH</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Interactive 100-Grid Decimal Visualizer</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Slide below to change the decimal fraction, and watch exactly how many points on this 100-grid block are filled compared to other decimals!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Grid Visualizer Sliders */}
                <div className="md:col-span-5 flex flex-col gap-4 bg-zinc-50 border-3 border-black p-4 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-black">
                      <span className="uppercase text-purple-900">Decimal Value:</span>
                      <strong className="text-base text-purple-700">{decimalVal.toFixed(2)}</strong>
                    </div>
                    <input 
                      type="range" min="0.01" max="1.00" step="0.01" value={decimalVal}
                      onChange={(e) => setDecimalVal(parseFloat(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Informational matrix */}
                  <div className="text-[11px] font-bold text-zinc-600 flex flex-col gap-2 pt-2 border-t border-black/10">
                    <div className="flex justify-between">
                      <span>Total Filled Grid Cells:</span>
                      <strong className="text-black">{Math.round(decimalVal * 100)} / 100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Equivalent Fraction:</span>
                      <strong className="text-black">{Math.round(decimalVal * 100)}%</strong>
                    </div>
                    <div className="bg-white p-2 border border-black/5 rounded text-[10px] leading-relaxed">
                      💡 <strong>Try this:</strong> Compare 0.70 with 0.7. See how both fill exactly 70 blocks? They are identical!
                    </div>
                  </div>
                </div>

                {/* Grid drawing SVG */}
                <div className="md:col-span-7 flex flex-col items-center">
                  <div className="w-full max-w-[280px] bg-zinc-900 border-4 border-[#5C3214] p-4 rounded-2xl relative">
                    <div className="grid grid-cols-10 gap-0.5 aspect-square bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                      {Array.from({ length: 100 }).map((_, idx) => {
                        const cellPercent = idx + 1;
                        const activePercent = Math.round(decimalVal * 100);
                        const isFilled = cellPercent <= activePercent;

                        return (
                          <div 
                            key={idx}
                            className={`aspect-square rounded-[1px] transition-all duration-100 ${
                              isFilled 
                                ? "bg-gradient-to-br from-amber-400 to-yellow-300 border border-yellow-500 scale-[1.05] shadow-[0_0_4px_#F59E0B]" 
                                : "bg-zinc-800/80 border border-zinc-900"
                            }`}
                          />
                        );
                      })}
                    </div>

                    <div className="text-center text-emerald-400 font-mono text-[9px] mt-2 font-black uppercase tracking-wider">
                      DECIMAL CHALK GRID • AREA EQUIVALENT
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: TRICHOTOMY SCALE */}
          {activeTab === "trichotomy" && (
            <motion.div
              key="trichotomy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-purple-600 block mb-0.5">MODULE 4 • TRICHOTOMOUS ORDER (KRAM)</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">The 1D Coordinate Ordering Principle</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Trichotomy means for any coordinates A and B, exactly one relationship must exist: greater, lesser, or equal! Adjust the coordinates of these 3 floating numbers to watch them order themselves on the map line.
                </p>
              </div>

              <div className="bg-neutral-50 border-3 border-black p-4 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Adjustments on Left */}
                <div className="md:col-span-5 flex flex-col gap-4 bg-white p-3 border-2 border-black rounded-lg">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-indigo-900">Float A (Negative balance):</span>
                      <strong className="text-indigo-600">{numA}</strong>
                    </div>
                    <input 
                      type="range" min="-10" max="0" step="0.5" value={numA}
                      onChange={(e) => setNumA(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-950">Float B (Decimal fraction):</span>
                      <strong className="text-emerald-600">{numB}</strong>
                    </div>
                    <input 
                      type="range" min="0.05" max="1.5" step="0.05" value={numB}
                      onChange={(e) => setNumB(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-rose-950">Float C (Large whole):</span>
                      <strong className="text-rose-600">{numC}</strong>
                    </div>
                    <input 
                      type="range" min="1" max="100" step="1" value={numC}
                      onChange={(e) => setNumC(parseInt(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-2 bg-zinc-200 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* 1D Scale visualizer */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  <span className="text-[9px] uppercase font-black text-zinc-500">Live Ordering Alignment Chart:</span>
                  
                  <div className="p-3 bg-zinc-900 border-2 border-black rounded-xl text-white font-mono text-xs flex flex-col gap-2">
                    <div className="flex justify-between bg-zinc-800 p-2 rounded">
                      <span className="text-zinc-400">Ascending Sequence:</span>
                      <strong className="text-yellow-300">
                        {numA} &lt; {numB} &lt; {numC}
                      </strong>
                    </div>

                    <div className="flex justify-between bg-zinc-800 p-2 rounded">
                      <span className="text-zinc-400">Descending Sequence:</span>
                      <strong className="text-emerald-400">
                        {numC} &gt; {numB} &gt; {numA}
                      </strong>
                    </div>

                    <div className="text-[10px] text-zinc-300 border-t border-zinc-700 pt-1.5 leading-normal">
                      🛡️ <strong>Hinglish rule:</strong> negative number hamesha decimal coordinate point se chhota hi hoga aur decimal number hamesha large whole number se small hi hoga!
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: CHALLENGE LAB */}
          {activeTab === "challenge_lab" && (
            <motion.div
              key="challenge_lab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-emerald-600 block mb-0.5">MODULE 5 • PRACTICE LAB STAGES</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Task-Driven Comparing Labs</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Select a goal-oriented practice drill to test your comparing and rounding accuracy!
                </p>
              </div>

              {/* Sub tabs selector */}
              <div className="flex gap-2 border-b border-black/10 pb-3 mb-1 select-none">
                <button
                  onClick={() => setActiveChallenge("gator")}
                  className={`p-2 px-4 border-2 border-black rounded-lg text-xs font-black cursor-pointer transition-all ${
                    activeChallenge === "gator" ? "bg-black text-white" : "bg-zinc-50 text-black hover:bg-zinc-100"
                  }`}
                >
                  🐊 Drill 1: Gator Chain Balance
                </button>
                <button
                  onClick={() => setActiveChallenge("rounding")}
                  className={`p-2 px-4 border-2 border-black rounded-lg text-xs font-black cursor-pointer transition-all ${
                    activeChallenge === "rounding" ? "bg-black text-white" : "bg-zinc-50 text-black hover:bg-zinc-100"
                  }`}
                >
                  🧾 Drill 2: Nearest Rupee Invoices
                </button>
              </div>

              {/* DRILL 1 VIEW */}
              {activeChallenge === "gator" && (
                <div id="gator-challenge-panel" className="bg-[#FFFDF5] border-3 border-black p-4 rounded-xl flex flex-col gap-4">
                  <div>
                    <span className="bg-yellow-105 border-2 border-amber-400 bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[8px] font-black uppercase inline-block">
                      Inequality Goal
                    </span>
                    <p className="text-xs font-black text-zinc-800 mt-1 leading-relaxed">
                      "Select the mathematically correct inequality operators to satisfy and secure this gator sequence: <strong className="text-rose-650">-4.5 [?] 0.05 [?] 0.5</strong>"
                    </p>
                  </div>

                  {/* Operator grid panel controls */}
                  <div className="flex flex-wrap items-center justify-center gap-6 bg-white border-2 border-black p-5 rounded-2xl">
                    <div className="text-center font-sans font-extrabold text-base border border-zinc-100 p-2.5 rounded-xl">
                      <span className="block text-[8px] text-zinc-400 font-mono">Coordinate A</span>
                      <strong className="text-rose-700">-4.5</strong>
                    </div>

                    {/* Operator 1 Selector */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[8px] font-bold text-zinc-400 font-mono">Operator Left</span>
                      <div className="flex gap-1 border-2 border-black rounded-lg p-1 bg-zinc-50 select-none">
                        {["<", ">", "="].map((val) => (
                          <button
                            key={val}
                            onClick={() => setOpLeft(val as any)}
                            className={`h-7 w-8 rounded font-black text-xs cursor-pointer ${
                              opLeft === val ? "bg-zinc-900 text-white" : "bg-white hover:bg-neutral-100 text-black"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-center font-sans font-extrabold text-base border border-zinc-100 p-2.5 rounded-xl">
                      <span className="block text-[8px] text-zinc-400 font-mono">Coordinate B</span>
                      <strong className="text-indigo-600">0.05</strong>
                    </div>

                    {/* Operator 2 Selector */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[8px] font-bold text-zinc-400 font-mono">Operator Right</span>
                      <div className="flex gap-1 border-2 border-black rounded-lg p-1 bg-zinc-50 select-none">
                        {["<", ">", "="].map((val) => (
                          <button
                            key={val}
                            onClick={() => setOpRight(val as any)}
                            className={`h-7 w-8 rounded font-black text-xs cursor-pointer ${
                              opRight === val ? "bg-zinc-900 text-white" : "bg-white hover:bg-neutral-100 text-black"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-center font-sans font-extrabold text-base border border-zinc-100 p-2.5 rounded-xl">
                      <span className="block text-[8px] text-zinc-400 font-mono">Coordinate C</span>
                      <strong className="text-emerald-600">0.5</strong>
                    </div>
                  </div>

                  {/* Results alert validation */}
                  <div>
                    {gatorUnlocked ? (
                      <div id="gator-perfect-success" className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-xs text-emerald-800 font-extrabold flex items-center gap-2 animate-bounce">
                        <CheckCircle className="h-5 w-5 text-emerald-600 fill-white" />
                        <span>Arey Bahut Shandar! Chain balanced unlocked! You proved: -4.5 &lt; 0.05 &lt; 0.5. XP Awarded!</span>
                      </div>
                    ) : (
                      <div className="bg-zinc-50 border-3 border-black/15 p-3 rounded-xl text-[10px] text-zinc-500 leading-normal font-sans font-bold">
                        ℹ️ Hint: -4.5 (negative) is smaller than 0.05. And 0.05 (fifty hundredths) is smaller than 0.5 (five tenths). Choose the correct lesser-than operators!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* DRILL 2 VIEW */}
              {activeChallenge === "rounding" && (
                <div id="rounding-challenge-panel" className="bg-[#FFFDF5] border-3 border-black p-4 rounded-xl flex flex-col gap-3">
                  <div>
                    <span className="bg-[#E0F2FE] text-blue-800 border-2 border-black px-2 py-0.5 rounded text-[8px] font-black uppercase inline-block">
                      Nearest Rupee Goal
                    </span>
                    <p className="text-xs font-black text-zinc-800 mt-1 leading-relaxed">
                      "Help the shop owner in Chandni Chowk round the exact paise invoices to the nearest whole Rupee. If paise is .50-or-Up rounds up, else lower!"
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {orders.map((or) => {
                      const expected = Math.round(or.exact);
                      const isCorrect = or.rounded === expected;

                      return (
                        <div 
                          key={or.id}
                          className="flex flex-wrap items-center justify-between border-2 border-black p-2 bg-white rounded-xl text-xs gap-3"
                        >
                          <span className="font-sans text-zinc-700 font-bold">{or.desc}</span>
                          
                          <div className="flex gap-2 select-none">
                            <button
                              onClick={() => handleAdjustRounding(or.id, Math.floor(or.exact))}
                              className={`p-1.5 px-3 rounded-lg border-2 text-[10px] font-black cursor-pointer transition-all ${
                                or.rounded === Math.floor(or.exact)
                                  ? isCorrect ? "bg-emerald-500 text-white border-emerald-600" : "bg-rose-500 text-white border-rose-600"
                                  : "bg-neutral-50 hover:bg-neutral-100 border-black/10"
                              }`}
                            >
                              Rs. {Math.floor(or.exact)} (Down)
                            </button>
                            <button
                              onClick={() => handleAdjustRounding(or.id, Math.ceil(or.exact))}
                              className={`p-1.5 px-3 rounded-lg border-2 text-[10px] font-black cursor-pointer transition-all ${
                                or.rounded === Math.ceil(or.exact)
                                  ? isCorrect ? "bg-emerald-500 text-white border-emerald-600" : "bg-rose-500 text-white border-rose-600"
                                  : "bg-neutral-50 hover:bg-neutral-100 border-black/10"
                              }`}
                            >
                              Rs. {Math.ceil(or.exact)} (Up)
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Results verification badge */}
                  <div>
                    {roundedUnlocked ? (
                      <div id="rounding-perfect-success" className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-xs text-emerald-800 font-extrabold flex items-center gap-2 animate-bounce">
                        <CheckCircle className="h-5 w-5 text-emerald-600 fill-white" />
                        <span>Chawri Bazar math master! Whole invoices rounded off cleanly! XP Awarded!</span>
                      </div>
                    ) : (
                      <div className="text-[10px] font-sans font-bold text-zinc-500 text-center uppercase bg-zinc-50 p-1 border border-black/10 rounded">
                        ℹ️ Match all 5 bill categories correctly to confirm!
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
