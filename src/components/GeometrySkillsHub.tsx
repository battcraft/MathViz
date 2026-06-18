import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, CheckCircle, HelpCircle, Star, Ruler, GitCommit, Split, 
  Sparkles, RefreshCw, Layers, Award, ArrowRight, Eye, Play, BookOpen 
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

interface Point {
  x: number;
  y: number;
  id: string;
  label: string;
  color: string;
}

interface GeometrySkillsHubProps {
  onBack: () => void;
}

export default function GeometrySkillsHub({ onBack }: GeometrySkillsHubProps) {
  const { stats, updateStats } = useAuth();
  
  // Tabs: comparison, notation, interlines, collinearity, challenge_lab
  type TabType = "comparison" | "notation" | "interlines" | "collinearity" | "challenge_lab";
  const [activeTab, setActiveTab] = useState<TabType>("comparison");

  // --- TAB 2: NOTATION FLASHCARDS ---
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // --- TAB 3: INTER-LINE RELATIONSHIPS ---
  const [selectedRelation, setSelectedRelation] = useState<"parallel" | "intersecting" | "perpendicular">("parallel");

  // --- TAB 4: COLLINEARITY STATE ---
  const [colPoints, setColPoints] = useState<Point[]>([
    { x: -3, y: -2, id: "A", label: "Bindu A", color: "#FBBF24" },  // Yellow
    { x: 0, y: 1, id: "B", label: "Bindu B", color: "#3B82F6" },   // Blue
    { x: 3, y: 4, id: "C", label: "Bindu C", color: "#10B981" }    // Green
  ]);
  const [collDraggingId, setCollDraggingId] = useState<string | null>(null);
  const collSvgRef = useRef<SVGSVGElement | null>(null);

  // --- TAB 5: CHALLENGE LAB STATE ---
  // Sub-challenges: "ruler" and "collinear_lock"
  const [activeChallenge, setActiveChallenge] = useState<"ruler" | "collinear_lock">("ruler");
  
  // Ruler Challenge states
  const [rulerPoints, setRulerPoints] = useState<{A: number, B: number}>({ A: -2, B: 3 }); // Coordinate positions on horizontal line y=0
  const [rulerDragging, setRulerDragging] = useState<"A" | "B" | null>(null);
  const rulerSvgRef = useRef<SVGSVGElement | null>(null);
  const [rulerUnlocked, setRulerUnlocked] = useState(false);

  // Track alignment Challenge states
  const [alignPoints, setAlignPoints] = useState<{A: {x: number, y: number}, B: {x: number, y: number}, C: {x: number, y: number}}>({
    A: { x: -3, y: -1 },
    B: { x: 0, y: 2 },
    // C is misplaced initially to form a triangle
    C: { x: 3, y: -2 }
  });
  const [alignDragging, setAlignDragging] = useState<"A" | "B" | "C" | null>(null);
  const alignSvgRef = useRef<SVGSVGElement | null>(null);
  const [alignUnlocked, setAlignUnlocked] = useState(false);

  // General sizing constants
  const width = 360;
  const height = 300;
  const gridRange = 5;

  const toPixels = (x: number, y: number) => {
    const px = width / 2 + (x * (width / 2)) / gridRange;
    const py = height / 2 - (y * (height / 2)) / gridRange;
    return { x: px, y: py };
  };

  const toCoords = (px: number, py: number) => {
    let x = ((px - width / 2) * gridRange) / (width / 2);
    let y = ((height / 2 - py) * gridRange) / (height / 2);
    // Snap to nearest integer or 0.5 coordinate
    x = Math.round(x * 2) / 2;
    y = Math.round(y * 2) / 2;
    x = Math.max(-gridRange, Math.min(gridRange, x));
    y = Math.max(-gridRange, Math.min(gridRange, y));
    return { x, y };
  };

  // --- COLLINEARY CALCULATIONS ---
  const isCollinear = (p1: {x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}) => {
    // Area of triangle formed by 3 points is 0
    const val = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    return Math.abs(val) < 0.1;
  };

  // Drag handlers for Tab 4 Collinearity
  const handleCollStartDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setCollDraggingId(id);
  };

  const handleCollMove = (e: any) => {
    if (!collDraggingId || !collSvgRef.current) return;
    const rect = collSvgRef.current.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const { x, y } = toCoords(px, py);

    setColPoints(prev => prev.map(p => p.id === collDraggingId ? { ...p, x, y } : p));
  };

  // Drag handlers for Challenge 1: Ruler
  const handleRulerStartDrag = (id: "A" | "B", e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setRulerDragging(id);
  };

  const handleRulerMove = (e: any) => {
    if (!rulerDragging || !rulerSvgRef.current) return;
    const rect = rulerSvgRef.current.getBoundingClientRect();
    let clientX = e.clientX;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    }
    const px = clientX - rect.left;
    // We only change x position on a linear scale of ruler
    let x = ((px - width / 2) * gridRange) / (width / 2);
    // Round to 1 decimal place for metric precise cm
    x = Math.round(x * 10) / 10;
    x = Math.max(-4.5, Math.min(4.5, x));

    setRulerPoints(prev => {
      const updated = { ...prev, [rulerDragging]: x };
      const currentLength = Math.abs(updated.B - updated.A) * 1.6; // Scale factor so grid matches reasonable 'cm' sizes
      // Target is exactly 8.0 cm (or 5.0 absolute grid spacing units * 1.6 scale)
      if (Math.abs(currentLength - 8.0) < 0.15) {
        if (!rulerUnlocked) {
          setRulerUnlocked(true);
          awardXp(15);
        }
      } else {
        setRulerUnlocked(false);
      }
      return updated;
    });
  };

  // Drag handlers for Challenge 2: Alignment Lock
  const handleAlignStartDrag = (id: "A" | "B" | "C", e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setAlignDragging(id);
  };

  const handleAlignMove = (e: any) => {
    if (!alignDragging || !alignSvgRef.current) return;
    const rect = alignSvgRef.current.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const { x, y } = toCoords(px, py);

    setAlignPoints(prev => {
      const updated = { ...prev, [alignDragging]: { x, y } };
      const aligned = isCollinear(updated.A, updated.B, updated.C);
      
      // Make sure they are not placed on the same exact coordinate
      const separated = (updated.A.x !== updated.B.x || updated.A.y !== updated.B.y) &&
                        (updated.B.x !== updated.C.x || updated.B.y !== updated.C.y) &&
                        (updated.A.x !== updated.C.x || updated.A.y !== updated.C.y);

      if (aligned && separated) {
        if (!alignUnlocked) {
          setAlignUnlocked(true);
          awardXp(20);
        }
      } else {
        setAlignUnlocked(false);
      }
      return updated;
    });
  };

  const stopDragging = () => {
    setCollDraggingId(null);
    setRulerDragging(null);
    setAlignDragging(null);
  };

  useEffect(() => {
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  const awardXp = async (amount: number) => {
    const nextXp = stats.xp + amount;
    await updateStats({ xp: nextXp });
  };

  // Calculate length of Ruler segment
  const rulerUnits = Math.abs(rulerPoints.B - rulerPoints.A);
  const rulerCm = (rulerUnits * 1.6); // Scale to map 5 grid units = 8cm

  // Collinearity check values for Tab 4
  const colA = colPoints[0];
  const colB = colPoints[1];
  const colC = colPoints[2];
  const colIsAligned = isCollinear(colA, colB, colC);

  // Area of collinearity tracker triangle index
  const collinearityTriangleArea = 0.5 * Math.abs(
    colA.x * (colB.y - colC.y) + colB.x * (colC.y - colA.y) + colC.x * (colA.y - colB.y)
  );

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
          <span className="bg-purple-100 text-purple-800 border-2 border-black py-1 px-3 rounded-lg flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 font-bold" /> Geometry Synthesis
          </span>
          <span className="opacity-40">/</span>
          <span className="text-zinc-600 font-bold">🔧 Geometry Skills</span>
        </div>
      </div>

      {/* SYLLABUS SKILLS HERO ROADMAP */}
      <div className="bg-zinc-900 border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] text-white text-left relative overflow-hidden">
        {/* Abstract background math aesthetics to prove high-craft UI */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none select-none flex items-center justify-center font-sans font-black text-9xl">
          📐
        </div>

        <span className="text-[10px] text-yellow-400 font-black uppercase tracking-wider bg-yellow-950/80 px-2.5 py-1 border border-yellow-500 rounded-lg inline-block mb-2">
          ⚡ 5-in-1 Master Synthesis Hub
        </span>
        <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight mb-1 flex items-center gap-2">
          Siddha Geometry Shastra <Sparkles className="h-5 w-5 text-amber-400 fill-amber-400 inline" />
        </h3>
        <p className="text-xs text-zinc-300 font-sans font-bold max-w-2xl leading-relaxed">
          Welcome to the Master Synthesis Hub! Here we combine Rekha, Khand, Kiran, and Bindus to contrast symbols, look at multiple interacting lines, test collinearity, and beat real goal-directed geometry tasks!
        </p>
      </div>

      {/* CORE NAVIGATION TAB RAIL */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border-b-4 border-black pb-4">
        {[
          { id: "comparison", label: "📊 Shape Matrix", color: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-400" },
          { id: "notation", label: "🏷️ Notation Symbols", color: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-400" },
          { id: "interlines", label: "🛣️ Direct Relations", color: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-400" },
          { id: "collinearity", label: "📈 Collinearity (1D)", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-400" },
          { id: "challenge_lab", label: "🏆 Practice Labs", color: "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-400" },
        ].map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as TabType)}
              className={`p-2.5 rounded-xl font-black text-xs border-3 border-black cursor-pointer text-center tracking-tight transition-all active:translate-y-0.5 select-none font-sans uppercase flex flex-col items-center justify-center gap-1 ${
                isActive 
                  ? "bg-zinc-900 text-white shadow-[2px_2px_0px_black] border-zinc-900 scale-[1.02]" 
                  : `${t.color} shadow-none`
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB TRANSITION AND RENDER PANEL */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_black] min-h-[460px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SIDE-BY-SIDE SHAPES CONTRAST MATRIX */}
          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-6"
            >
              <div>
                <span className="text-[10px] font-black text-blue-600 block mb-1">MODULE 1 • SIDE-BY-SIDE MATRIX</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Shapes Synthesis Board</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Doston, let's contrast the core shapes side-by-side so we never confuse endpoints, arrows, or measuring tools in examinations!
                </p>
              </div>

              {/* Dynamic Contrast Comparison Table Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* REKHA CARD */}
                <div id="rekha-contrast-card" className="border-4 border-black bg-purple-50/40 p-4 rounded-2xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-purple-100 text-purple-800 border-2 border-black font-extrabold px-2 py-0.5 rounded text-[10px] uppercase font-sans">
                        Endless Infinite
                      </span>
                      <span className="text-lg">🛣️</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-purple-900 uppercase">Rekha (Line)</h5>
                    
                    {/* Visual Vector Line mini-board */}
                    <div className="h-16 w-full bg-[#143D30] border-2 border-black rounded-lg my-2.5 flex items-center justify-center relative overflow-hidden">
                      <span className="absolute left-2 text-white text-xs">❮</span>
                      <div className="w-5/6 h-0.5 bg-yellow-400 relative flex items-center justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-white -ml-0.5" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white -mr-0.5" />
                      </div>
                      <span className="absolute right-2 text-white text-xs">❯</span>
                      <span className="absolute bottom-1 right-2 font-mono text-[8px] text-emerald-400">AB</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <div className="text-[11px] font-sans">
                        <strong className="block text-zinc-650 uppercase font-bold text-[9px]">📍 Endpoints:</strong>
                        <span className="font-bold text-rose-600">ZERO Endpoints</span> &mdash; stretches endlessly in both directions!
                      </div>
                      <div className="text-[11px] font-sans pt-1 border-t border-black/5">
                        <strong className="block text-zinc-650 uppercase font-bold text-[9px]">📏 Measurability:</strong>
                        <span className="font-bold">Cannot be measured!</span> Length is infinite.
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-650 font-bold leading-relaxed shadow-[2px_2px_0px_black]">
                    💡 <strong>Pro Secret:</strong> To write a Line, math books use double arrows over letters: <strong className="font-mono text-purple-700">A⟷B</strong>
                  </div>
                </div>

                {/* KHAND CARD */}
                <div id="khand-contrast-card" className="border-4 border-black bg-amber-50/40 p-4 rounded-2xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-amber-100 text-amber-800 border-2 border-black font-extrabold px-2 py-0.5 rounded text-[10px] uppercase font-sans">
                        Fixed Ruler Bounds
                      </span>
                      <span className="text-lg">📏</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-amber-900 uppercase">Khand (Segment)</h5>
                    
                    {/* Visual Vector Segment mini-board */}
                    <div className="h-16 w-full bg-[#143D30] border-2 border-black rounded-lg my-2.5 flex items-center justify-center relative overflow-hidden">
                      <div className="w-3/4 h-1 bg-yellow-400 relative flex items-center justify-between">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white -ml-1 flex items-center justify-center text-[7px] font-bold text-black font-mono">C</div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white -mr-1 flex items-center justify-center text-[7px] font-bold text-black font-mono">D</div>
                      </div>
                      <span className="absolute bottom-1 right-2 font-mono text-[8px] text-amber-400">CD = 8 cm</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <div className="text-[11px] font-sans">
                        <strong className="block text-zinc-650 uppercase font-bold text-[9px]">📍 Endpoints:</strong>
                        <span className="font-bold text-emerald-600">TWO Fixed Endpoints</span> &mdash; points where the segment stops!
                      </div>
                      <div className="text-[11px] font-sans pt-1 border-t border-black/5">
                        <strong className="block text-zinc-650 uppercase font-bold text-[9px]">📏 Measurability:</strong>
                        <span className="font-bold text-emerald-600">Can be measured!</span> Finite length measured with a plastic ruler.
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-650 font-bold leading-relaxed shadow-[2px_2px_0px_black]">
                    💡 <strong>Pro Secret:</strong> To write a segment, we put a straight bar above letters: <strong className="font-mono text-amber-700">C━D</strong>
                  </div>
                </div>

                {/* KIRAN CARD */}
                <div id="kiran-contrast-card" className="border-4 border-black bg-rose-50/40 p-4 rounded-2xl flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-rose-100 text-rose-800 border-2 border-black font-extrabold px-2 py-0.5 rounded text-[10px] uppercase font-sans">
                        Original Launch
                      </span>
                      <span className="text-lg">🔦</span>
                    </div>
                    <h5 className="font-sans font-black text-base text-rose-900 uppercase">Kiran (Ray)</h5>
                    
                    {/* Visual Vector Ray mini-board */}
                    <div className="h-16 w-full bg-[#143D30] border-2 border-black rounded-lg my-2.5 flex items-center justify-center relative overflow-hidden">
                      <div className="w-5/6 h-0.5 bg-yellow-400 relative flex items-center justify-between">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white -ml-1 text-[7px] font-extrabold flex items-center justify-center font-mono">O</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                      </div>
                      <span className="absolute right-2 text-white text-xs">❯</span>
                      <span className="absolute bottom-1 right-2 font-mono text-[8px] text-rose-400">OP</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <div className="text-[11px] font-sans">
                        <strong className="block text-zinc-650 uppercase font-bold text-[9px]">📍 Endpoints:</strong>
                        <span className="font-bold text-amber-600">ONE Endpoint (Origin)</span> &mdash; has starting dot, but flies forever.
                      </div>
                      <div className="text-[11px] font-sans pt-1 border-t border-black/5">
                        <strong className="block text-zinc-650 uppercase font-bold text-[9px]">📏 Measurability:</strong>
                        <span className="font-bold">Cannot be measured!</span> Shoots out endlessly into outer space.
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-lg p-2 text-[10px] text-zinc-650 font-bold leading-relaxed shadow-[2px_2px_0px_black]">
                    💡 <strong>Pro Secret:</strong> To write a Ray, we put a single-ended arrow above letters: <strong className="font-mono text-rose-700">O⟶P</strong>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: GEOMETRY NOTATION STRENGTH FLASHCARDS */}
          {activeTab === "notation" && (
            <motion.div
              key="notation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-5"
            >
              <div>
                <span className="text-[10px] font-black text-amber-600 block mb-1">MODULE 2 • NOTATION INTERACTIVE CARDS</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Dry Textbook Notations Made Playful!</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Click on these cards to flip them and learn exactly how to read and write mathematical notations in your tests.
                </p>
              </div>

              {/* Grid of 3 interactive flip cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
                
                {/* 1. Line Notation Card */}
                <div 
                  id="line-notation-card"
                  onClick={() => setFlippedCard(flippedCard === "line" ? null : "line")}
                  className="relative h-[180px] w-full rounded-2xl border-4 border-black shadow-[4px_4px_0px_black] bg-[#FFF9E6] hover:bg-[#FFF3CD] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "line" ? (
                      <motion.div 
                        key="front"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-black">🛣️</span>
                          <span className="text-[9px] bg-amber-200 border border-black px-1.5 py-0.5 rounded uppercase font-bold text-amber-800">Tap to reveal</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-amber-900 mb-1">Line Notation Symbol</h6>
                          <div className="text-2xl font-black font-sans leading-none text-black mt-2">
                            A⟷B
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">Symbolic representation: {"AB"}&harr;</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Math Class standard ⟷</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-amber-400 text-xs uppercase font-sans block mb-1">🔑 Phonetic Hint:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Iske dono ends pe ARROWS hain, dikhane ke liye ki line left aur right dono taraf andha-dhundh stretch hoti hai."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Pronounce:</strong> "Line AB" ya "Anant Rekha AB"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Segment Notation Card */}
                <div 
                  id="segment-notation-card"
                  onClick={() => setFlippedCard(flippedCard === "segment" ? null : "segment")}
                  className="relative h-[180px] w-full rounded-2xl border-4 border-black shadow-[4px_4px_0px_black] bg-[#E8F0FE] hover:bg-[#D2E3FC] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "segment" ? (
                      <motion.div 
                        key="front"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-black">📏</span>
                          <span className="text-[9px] bg-blue-200 border border-black px-1.5 py-0.5 rounded uppercase font-bold text-blue-800">Tap to reveal</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-blue-900 mb-1">Segment Notation Symbol</h6>
                          <div className="text-2xl font-black font-sans leading-none text-black mt-2">
                            C━D
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">Symbolic representation: {"CD"}&macr;</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Math Class standard {"\u2015"}</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-emerald-400 text-xs uppercase font-sans block mb-1">🔑 Phonetic Hint:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Sirf ek seedha overbar aur koi arrow nahi! Iska matlab hai C aur D dono fixed endpoints hain. Limit block ho chuki hai."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Pronounce:</strong> "Segment CD" ya "Khand CD"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Ray Notation Card */}
                <div 
                  id="ray-notation-card"
                  onClick={() => setFlippedCard(flippedCard === "ray" ? null : "ray")}
                  className="relative h-[180px] w-full rounded-2xl border-4 border-black shadow-[4px_4px_0px_black] bg-[#FCE8E6] hover:bg-[#FAD2CF] cursor-pointer transition-all duration-300 select-none overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {flippedCard !== "ray" ? (
                      <motion.div 
                        key="front"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-5 h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-black">🔦</span>
                          <span className="text-[9px] bg-rose-200 border border-black px-1.5 py-0.5 rounded uppercase font-bold text-rose-800">Tap to reveal</span>
                        </div>
                        <div>
                          <h6 className="font-sans font-black text-sm uppercase text-rose-900 mb-1">Ray Notation Symbol</h6>
                          <div className="text-2xl font-black font-sans leading-none text-black mt-2">
                            O⟶P
                          </div>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase block mt-1">Symbolic representation: {"OP"}&rarr;</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Math Class standard ⟶</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="back"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-5 h-full bg-zinc-900 text-white flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-rose-400 text-xs uppercase font-sans block mb-1">🔑 Phonetic Hint:</strong>
                          <p className="text-xs font-bold leading-relaxed text-zinc-200">
                            "Ek taraf dot (Origin, standard point O) aur doosri taraf ek single directional arrow heading right, jo infinite power dikhata hai."
                          </p>
                        </div>
                        <div className="bg-zinc-800 p-1.5 border border-zinc-700 rounded text-[10px] text-zinc-300">
                          🌟 <strong>Pronounce:</strong> "Ray OP" ya "Kiran OP"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: INTER-LINE RELATIONSHIPS (PARALLEL & INTERSECTING & PERPENDICULAR) */}
          {activeTab === "interlines" && (
            <motion.div
              key="interlines"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-5"
            >
              <div>
                <span className="text-[10px] font-black text-purple-600 block mb-1">MODULE 3 • INTER-LINE RELATIONSHIPS</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">How Multiple Lines Interact in a 2D Space</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Lines don't live alone doston! Click a relation type below to interact with the lines and watch their coordinate behavior change instantly on our live Delhi Metro radar!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Left side selector options */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  {[
                    { 
                      id: "parallel", 
                      name: "Parallel Lines (Samanatar Rekha)", 
                      desc: "Two infinite tracks that preserve a perfect, identical distance between each other and NEVER cross or collide.",
                      emoji: "🛤️",
                      colorClass: "bg-blue-150 border-blue-400"
                    },
                    { 
                      id: "intersecting", 
                      name: "Intersecting Lines (Pratichhedi)", 
                      desc: "Two distinct tracks crossing paths and meeting at exactly ONE single point (Bindu). This point of collision is where coordinates merge.",
                      emoji: "✖️",
                      colorClass: "bg-purple-150 border-purple-400"
                    },
                    { 
                      id: "perpendicular", 
                      name: "Perpendicular Lines (Lambavat)", 
                      desc: "A special intersecting connection where lines cross at a precise 90° right angle, forming a perfect cross or T-shape boundary.",
                      emoji: "➕",
                      colorClass: "bg-emerald-150 border-emerald-400"
                    }
                  ].map((rel) => {
                    const isSel = selectedRelation === rel.id;
                    return (
                      <button
                        key={rel.id}
                        onClick={() => setSelectedRelation(rel.id as any)}
                        className={`p-3.5 rounded-xl border-3 text-left transition-all text-xs font-bold cursor-pointer select-none ${
                          isSel 
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-[2px_2px_0px_black]" 
                            : "bg-neutral-50 hover:bg-neutral-100 text-black border-black/10"
                        }`}
                      >
                        <span className="block text-sm font-black uppercase mb-1 font-sans">{rel.emoji} {rel.name}</span>
                        <span className={`block text-[10px] uppercase font-bold font-sans ${isSel ? "text-zinc-300" : "text-zinc-500"}`}>
                          {rel.desc}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Right side live interactive Canvas preview */}
                <div className="md:col-span-7 flex flex-col items-center">
                  <div className="w-full max-w-[340px] bg-[#143D30] border-4 border-[#5C3214] rounded-2xl p-4 shadow-[4px_4px_0px_black] relative h-[240px] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                    
                    <svg width="100%" height="100%" className="relative z-10 select-none overflow-hidden">
                      
                      {/* Parallel lines drawing */}
                      {selectedRelation === "parallel" && (
                        <>
                          {/* Rail 1 */}
                          <line x1="20" y1="60" x2="300" y2="60" stroke="#FFF" strokeWidth="3" />
                          <line x1="20" y1="60" x2="300" y2="60" stroke="#FFEAA7" strokeWidth="1.5" strokeDasharray="5,5" />
                          {/* Rail 2 */}
                          <line x1="20" y1="140" x2="300" y2="140" stroke="#FFF" strokeWidth="3" />
                          <line x1="20" y1="140" x2="300" y2="140" stroke="#FFEAA7" strokeWidth="1.5" strokeDasharray="5,5" />
                          
                          {/* Constant separation indicators */}
                          <line x1="80" y1="60" x2="80" y2="140" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="3,3" />
                          <text x="90" y="105" fill="#22C55E" fontSize="9" fontWeight="black" textAnchor="start">Gap = d</text>
                          
                          <line x1="220" y1="60" x2="220" y2="140" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="3,3" />
                          <text x="230" y="105" fill="#22C55E" fontSize="9" fontWeight="black" textAnchor="start">Gap = d</text>

                          <text x="150" y="200" fill="#FFF" fontSize="9" fontWeight="black" textAnchor="middle" className="uppercase tracking-wider">
                            🛤️ Parallel: Tracks never meet!
                          </text>
                        </>
                      )}

                      {/* Intersecting lines drawing */}
                      {selectedRelation === "intersecting" && (
                        <>
                          {/* Line 1 */}
                          <line x1="30" y1="30" x2="280" y2="170" stroke="#818CF8" strokeWidth="3.5" />
                          {/* Line 2 */}
                          <line x1="30" y1="170" x2="280" y2="30" stroke="#F43F5E" strokeWidth="3.5" />

                          {/* Point of Intersection */}
                          <circle cx="155" cy="100" r="7" fill="#FBBF24" stroke="#FFF" strokeWidth="2.5" className="animate-pulse" />
                          <text x="155" y="85" fill="#FFF" fontSize="10" fontWeight="black" textAnchor="middle">
                            Bindu P (Intersection)
                          </text>

                          <text x="150" y="200" fill="#FFF" fontSize="9" fontWeight="black" textAnchor="middle" className="uppercase tracking-wider">
                            ⚡ Intersecting: Meet at EXACTLY 1 Point
                          </text>
                        </>
                      )}

                      {/* Perpendicular lines drawing */}
                      {selectedRelation === "perpendicular" && (
                        <>
                          {/* Line 1 (Horizontal) */}
                          <line x1="30" y1="100" x2="280" y2="100" stroke="#A78BFA" strokeWidth="3.5" />
                          {/* Line 2 (Vertical) */}
                          <line x1="155" y1="20" x2="155" y2="180" stroke="#34D399" strokeWidth="3.5" />

                          {/* 90 degree Square box indicator */}
                          <rect x="155" y="80" width="20" height="20" fill="none" stroke="#FBBF24" strokeWidth="2" />
                          <text x="180" y="94" fill="#FBBF24" fontSize="9" fontWeight="black">90°</text>

                          {/* Vertex Intersection indicator */}
                          <circle cx="155" cy="100" r="5" fill="#FFF" />
                          <text x="150" y="210" fill="#FFF" fontSize="9" fontWeight="black" textAnchor="middle" className="uppercase tracking-wider">
                            📐 Right angle corner (Lambavat)
                          </text>
                        </>
                      )}

                    </svg>

                    <div className="absolute top-2.5 right-2 Mom-none bg-black/80 text-[8px] text-[#22c55e] px-2 py-0.5 rounded font-bold uppercase select-none pointer-events-none">
                      DELHI METRO REKHA INTRUSION RADAR
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: COLLINEARITY CONCEPT VISUAL CO-ORDINATE CHECKER */}
          {activeTab === "collinearity" && (
            <motion.div
              key="collinearity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-emerald-600 block mb-1">MODULE 4 • COLLINEARITY (EK-REKHIYA BINDU)</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Are points lying in a single sequence of a line?</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Points are **Collinear (Ek-rekhiya)** if they line up flat on the exact same straight line pathway. If not, they are **Non-collinear**, forming shapes like a triangle! Drag Bindu A, B, and C around to see!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* SVG Live Draggable Grid */}
                <div className="md:col-span-7 flex flex-col items-center">
                  <div className="w-full max-w-[340px] relative">
                    <svg
                      ref={collSvgRef}
                      width={width}
                      height={height}
                      className="bg-[#143D30] border-4 border-[#5C3214] rounded-2xl shadow-inner cursor-crosshair select-none overflow-hidden touch-none"
                      onMouseMove={handleCollMove}
                      onTouchMove={handleCollMove}
                      onMouseLeave={stopDragging}
                    >
                      {/* Grid lines layout */}
                      {Array.from({ length: gridRange * 2 + 1 }).map((_, i) => {
                        const val = -gridRange + i;
                        const pLineHorizontal = toPixels(-gridRange, val);
                        const pLineVertical = toPixels(val, -gridRange);

                        return (
                          <React.Fragment key={i}>
                            {/* Horizontal grid lines */}
                            <line
                              x1={0} y1={pLineHorizontal.y} x2={width} y2={pLineHorizontal.y}
                              stroke="#808080" strokeOpacity={val === 0 ? 0.6 : 0.15}
                              strokeWidth={val === 0 ? 2 : 1} strokeDasharray={val === 0 ? "" : "3,3"}
                            />
                            {/* Vertical grid lines */}
                            <line
                              x1={pLineVertical.x} y1={0} x2={pLineVertical.x} y2={height}
                              stroke="#808080" strokeOpacity={val === 0 ? 0.6 : 0.15}
                              strokeWidth={val === 0 ? 2 : 1} strokeDasharray={val === 0 ? "" : "3,3"}
                            />
                          </React.Fragment>
                        );
                      })}

                      {/* Line of best fit connecting endpoints if they are collinear */}
                      {colIsAligned && (
                        <line
                          x1={toPixels(colA.x - (colB.x - colA.x) * 4, colA.y - (colB.y - colA.y) * 4).x}
                          y1={toPixels(colA.x - (colB.x - colA.x) * 4, colA.y - (colB.y - colA.y) * 4).y}
                          x2={toPixels(colC.x + (colC.x - colB.x) * 4, colC.y + (colC.y - colB.y) * 4).x}
                          y2={toPixels(colC.x + (colC.x - colB.x) * 4, colC.y + (colC.y - colB.y) * 4).y}
                          stroke="#22C55E"
                          strokeWidth="2.5"
                          strokeDasharray="4,4"
                        />
                      )}

                      {/* Draggable Circle points */}
                      {colPoints.map((pt) => {
                        const pxPt = toPixels(pt.x, pt.y);
                        const isDragging = collDraggingId === pt.id;

                        return (
                          <g
                            key={pt.id}
                            onMouseDown={(e) => handleCollStartDrag(pt.id, e)}
                            onTouchStart={(e) => handleCollStartDrag(pt.id, e)}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            {isDragging && (
                              <circle cx={pxPt.x} cy={pxPt.y} r="16" fill={pt.color} fillOpacity="0.4" className="animate-ping" />
                            )}
                            <circle cx={pxPt.x} cy={pxPt.y} r="8" fill={pt.color} stroke="#FFF" strokeWidth="2" />
                            <text x={pxPt.x} y={pxPt.y - 12} fill="#FFF" fontSize="9" fontWeight="black" textAnchor="middle">
                              {pt.id}({pt.x}, {pt.y})
                            </text>
                          </g>
                        );
                      })}

                    </svg>

                    <span className="absolute bottom-2 right-2.5 bg-black/80 text-[8px] text-[#22c55e] px-2 py-0.5 rounded font-bold uppercase select-none pointer-events-none">
                      Drag Coordinates (A, B, C)
                    </span>
                  </div>
                </div>

                {/* Computational diagnostics panel */}
                <div className="md:col-span-5 flex flex-col justify-between gap-3">
                  <div className="bg-[#FFFDF3] border-3 border-black p-4 rounded-2xl flex-grow">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Live Math analysis:</span>
                    
                    <div className="flex flex-col gap-2 font-mono text-xs mt-2">
                      <div className="flex justify-between items-center bg-white border border-black/10 p-2 rounded-lg">
                        <span>A to B Segment length:</span>
                        <strong className="font-bold">{Math.sqrt(Math.pow(colB.x-colA.x,2)+Math.pow(colB.y-colA.y,2)).toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white border border-black/10 p-2 rounded-lg">
                        <span>B to C Segment length:</span>
                        <strong className="font-bold">{Math.sqrt(Math.pow(colC.x-colB.x,2)+Math.pow(colC.y-colB.y,2)).toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between items-center bg-white border border-black/10 p-2 rounded-lg">
                        <span>Enclosed Triangle area:</span>
                        <strong className="font-bold text-indigo-700">{collinearityTriangleArea.toFixed(2)} sq units</strong>
                      </div>
                    </div>

                    {/* Status Alert Badge */}
                    <div className="mt-4">
                      {colIsAligned ? (
                        <div id="collinear-glowing-status" className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-xs text-emerald-800 font-extrabold flex items-center gap-2 animate-bounce">
                          <span>🟢 STATUS: Perfectly COLLINEAR! All points fall completely on a single straight railroad track.</span>
                        </div>
                      ) : (
                        <div id="non-collinear-status" className="bg-rose-50 border-3 border-rose-400 p-3 rounded-xl text-xs text-rose-800 font-bold leading-normal">
                          <span>🔴 STATUS: NON-COLLINEAR! Point B deviates from the direct A-C path. They form a triangle with a real surface Area!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: TASK-DRIVEN "PRACTICE LAB" CHALLENGES */}
          {activeTab === "challenge_lab" && (
            <motion.div
              key="challenge_lab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-left flex flex-col gap-4"
            >
              <div>
                <span className="text-[10px] font-black text-rose-600 block mb-1">MODULE 5 • PRACTICE LAB STAGES</span>
                <h4 className="font-sans font-black text-xl uppercase text-zinc-900">Task-Driven Geometry Labs</h4>
                <p className="text-xs font-sans font-bold text-zinc-500">
                  Doston, let's put your geometric accuracy to the test! Complete the two dedicated challenges to claim your master points and satisfy the lesson criteria.
                </p>
              </div>

              {/* Sub-selector for current challenge */}
              <div className="flex gap-2 max-w-sm mb-1">
                <button
                  onClick={() => setActiveChallenge("ruler")}
                  className={`flex-1 p-2 border-2 border-black rounded-lg text-xs font-black cursor-pointer uppercase transition-all ${
                    activeChallenge === "ruler" ? "bg-[#FFEAA7]" : "bg-neutral-50 hover:bg-neutral-100"
                  }`}
                >
                  📏 Ruler Task
                </button>
                <button
                  onClick={() => setActiveChallenge("collinear_lock")}
                  className={`flex-1 p-2 border-2 border-black rounded-lg text-xs font-black cursor-pointer uppercase transition-all ${
                    activeChallenge === "collinear_lock" ? "bg-[#FFEAA7]" : "bg-neutral-50 hover:bg-neutral-100"
                  }`}
                >
                  🔗 Alignment Task
                </button>
              </div>

              {/* CHALLENGE A: THE MEASURE RULE LAB */}
              {activeChallenge === "ruler" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  <div className="md:col-span-7 flex flex-col items-center">
                    
                    <div className="w-full max-w-[340px] relative">
                      <svg
                        ref={rulerSvgRef}
                        width={width}
                        height={height}
                        className="bg-[#143D30] border-4 border-[#5C3214] rounded-2xl shadow-inner cursor-crosshair select-none overflow-hidden touch-none"
                        onMouseMove={handleRulerMove}
                        onTouchMove={handleRulerMove}
                        onMouseLeave={stopDragging}
                      >
                        {/* Static Ruler illustration */}
                        <g transform="translate(10, 150)">
                          {/* Plastic/Yellow Ruler background block */}
                          <rect x="0" y="0" width="340" height="40" fill="#FBBF24" stroke="#FFF" strokeWidth="2" rounded-md />
                          
                          {/* Tick marks on ruler (0 to 15) */}
                          {Array.from({ length: 16 }).map((_, idx) => {
                            const tickX = 15 + idx * 20;
                            return (
                              <g key={idx}>
                                <line x1={tickX} y1={0} x2={tickX} y2={12} stroke="#000" strokeWidth="1.5" />
                                <text x={tickX} y={23} fill="#000" fontSize="8" fontWeight="black" textAnchor="middle">{idx}</text>
                                
                                {/* Subdivision half ticks */}
                                {idx < 15 && (
                                  <line x1={tickX + 10} y1={0} x2={tickX + 10} y2={7} stroke="#000" strokeWidth="1" />
                                )}
                              </g>
                            )
                          })}
                        </g>

                        {/* Drag and connect segment */}
                        {/* Map Points A and B on the horizontal track */}
                        <line 
                          x1={width/2 + (rulerPoints.A * (width/2)) / gridRange}
                          y1={130}
                          x2={width/2 + (rulerPoints.B * (width/2)) / gridRange}
                          y2={130}
                          stroke="#FFEAA7"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />

                        {/* Interactive dots A and B */}
                        {[
                          { id: "A", val: rulerPoints.A, color: "#10B981" },
                          { id: "B", val: rulerPoints.B, color: "#3B82F6" }
                        ].map((pt) => {
                          const cxPt = width/2 + (pt.val * (width/2)) / gridRange;
                          const isDragging = rulerDragging === pt.id;

                          return (
                            <g
                              key={pt.id}
                              onMouseDown={(e: any) => handleRulerStartDrag(pt.id as any, e)}
                              onTouchStart={(e: any) => handleRulerStartDrag(pt.id as any, e)}
                              className="cursor-grab active:cursor-grabbing"
                            >
                              {isDragging && <circle cx={cxPt} cy={130} r="15" fill={pt.color} fillOpacity="0.4" className="animate-ping" />}
                              <circle cx={cxPt} cy={130} r="9" fill={pt.color} stroke="#FFF" strokeWidth="2.5" />
                              <text x={cxPt} y={112} fill="#FFF" fontSize="10" fontWeight="black" textAnchor="middle">
                                {pt.id}({pt.val.toFixed(1)})
                              </text>
                            </g>
                          )
                        })}

                        {/* Grid guides markers */}
                        <text x="180" y="40" fill="#FFF" fillOpacity="0.8" fontSize="10" fontWeight="bold" textAnchor="middle">
                          🎯 GOAL: Drag dots so length CD is exactly 8.0 cm!
                        </text>

                      </svg>
                      
                      <div className="absolute top-2.5 right-2 Mom-none bg-black/80 text-[8px] text-[#22c55e] px-2 py-0.5 rounded font-bold uppercase select-none pointer-events-none">
                        Yellow Ruler scale lab
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 flex flex-col justify-between gap-3">
                    <div className="bg-[#FFFDF3] border-3 border-black p-4 rounded-2xl flex-grow">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">TASK FEEDBACK:</span>
                      
                      <p className="text-xs font-semibold leading-relaxed text-zinc-650 my-2">
                        "Drag endpoints on the chalkboard lines. Measure Segment CD precisely by matching tick marks on our grid."
                      </p>

                      <div className="bg-white border-2 border-black p-3.5 rounded-xl my-4 text-center">
                        <strong className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Current Segment length:</strong>
                        <span className={`text-2xl font-black ${rulerUnlocked ? "text-emerald-600" : "text-black"}`}>
                          {rulerCm.toFixed(1)} cm
                        </span>
                        <div className="h-2 w-full bg-neutral-100 border-2 border-black rounded-full overflow-hidden mt-2">
                          {/* target 8.0cm progress fill */}
                          <div className={`h-full ${rulerCm > 8.0 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (rulerCm / 8.0) * 100)}%` }} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {rulerUnlocked ? (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-center text-xs text-emerald-800 font-extrabold"
                          >
                            🎉 EXCELLENT! Measured exactly 8.0 cm! Track calibrated correctly. (+15 XP)
                          </motion.div>
                        ) : (
                          <div className="bg-neutral-50 border border-neutral-300 p-3 rounded-xl text-center text-[10px] text-zinc-500 font-bold uppercase tracking-wide">
                            🛟 TIP: Drag B to match coordinate and check progress!
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* CHALLENGE B: THE TRACK ALIGNMENT LAB */}
              {activeChallenge === "collinear_lock" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  <div className="md:col-span-7 flex flex-col items-center">
                    
                    <div className="w-full max-w-[340px] relative">
                      <svg
                        ref={alignSvgRef}
                        width={width}
                        height={height}
                        className="bg-[#143D30] border-4 border-[#5C3214] rounded-2xl shadow-inner cursor-crosshair select-none overflow-hidden touch-none"
                        onMouseMove={handleAlignMove}
                        onTouchMove={handleAlignMove}
                        onMouseLeave={stopDragging}
                      >
                        {/* Grid lines layout */}
                        {Array.from({ length: gridRange * 2 + 1 }).map((_, i) => {
                          const val = -gridRange + i;
                          const pLineHorizontal = toPixels(-gridRange, val);
                          const pLineVertical = toPixels(val, -gridRange);

                          return (
                            <React.Fragment key={i}>
                              <line
                                x1={0} y1={pLineHorizontal.y} x2={width} y2={pLineHorizontal.y}
                                stroke="#808080" strokeOpacity={val === 0 ? 0.4 : 0.1}
                                strokeWidth={1} strokeDasharray="3,3"
                              />
                              <line
                                x1={pLineVertical.x} y1={0} x2={pLineVertical.x} y2={height}
                                stroke="#808080" strokeOpacity={val === 0 ? 0.4 : 0.1}
                                strokeWidth={1} strokeDasharray="3,3"
                              />
                            </React.Fragment>
                          );
                        })}

                        {/* Guide railroad helper path connecting A & B explicitly */}
                        <line 
                          x1={toPixels(-5, toCoords(toPixels(-5,0).x, 0).y).x} // Draw full path
                          y1={toPixels(0, alignPoints.A.y + (alignPoints.B.y - alignPoints.A.y) * (-3 - alignPoints.A.x) / (alignPoints.B.x - alignPoints.A.x || 1)).y}
                          x2={toPixels(5, 0).x}
                          y2={toPixels(0, alignPoints.A.y + (alignPoints.B.y - alignPoints.A.y) * (5 - alignPoints.A.x) / (alignPoints.B.x - alignPoints.A.x || 1)).y}
                          stroke="#FFF"
                          strokeOpacity="0.25"
                          strokeWidth="2"
                        />

                        {/* Interactive draggable nodes representing pieces of tracks */}
                        {[
                          { id: "A", pt: alignPoints.A, color: "#FBBF24" },
                          { id: "B", pt: alignPoints.B, color: "#3B82F6" },
                          { id: "C", pt: alignPoints.C, color: "#EC4899" }
                        ].map((node) => {
                          const pxPt = toPixels(node.pt.x, node.pt.y);
                          const isDragging = alignDragging === node.id;

                          return (
                            <g
                              key={node.id}
                              onMouseDown={(e: any) => handleAlignStartDrag(node.id as any, e)}
                              onTouchStart={(e: any) => handleAlignStartDrag(node.id as any, e)}
                              className="cursor-grab active:cursor-grabbing"
                            >
                              {isDragging && <circle cx={pxPt.x} cy={pxPt.y} r="14" fill={node.color} fillOpacity="0.3" className="animate-ping" />}
                              <circle cx={pxPt.x} cy={pxPt.y} r="8" fill={node.color} stroke="#FFF" strokeWidth="2" />
                              <text x={pxPt.x} y={pxPt.y - 12} fill="#FFF" fontSize="9" fontWeight="black" textAnchor="middle">
                                {node.id}({node.pt.x}, {node.pt.y})
                              </text>
                            </g>
                          )
                        })}

                        <text x="180" y="40" fill="#FFF" fillOpacity="0.8" fontSize="10" fontWeight="bold" textAnchor="middle">
                          🎯 GOAL: Plot three collinear points on the grid!
                        </text>

                      </svg>
                      
                      <div className="absolute top-2.5 right-2 Mom-none bg-black/80 text-[8px] text-[#22c55e] px-2 py-0.5 rounded font-bold uppercase select-none pointer-events-none">
                        Collinearity Align Tracker
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 flex flex-col justify-between gap-3">
                    <div className="bg-[#FFFDF3] border-3 border-black p-4 rounded-2xl flex-grow">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">ALIGNMENT DIAGNOSIS:</span>
                      
                      <p className="text-xs font-semibold leading-relaxed text-zinc-650 my-2">
                        "The metro railway track is broken! Move the points so that A, B, and C lie in a perfect collinear sequence."
                      </p>

                      <div className="bg-white border-2 border-black p-3 rounded-lg text-xs font-mono my-3">
                        <div className="flex justify-between items-center py-1">
                          <span>A to B Slope:</span>
                          <span className="font-bold">
                            {((alignPoints.B.y - alignPoints.A.y) / (alignPoints.B.x - alignPoints.A.x || 1)).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-t border-dashed border-black/10">
                          <span>B to C Slope:</span>
                          <span className="font-bold">
                            {((alignPoints.C.y - alignPoints.B.y) / (alignPoints.C.x - alignPoints.B.x || 1)).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {alignUnlocked ? (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-50 border-3 border-emerald-500 p-3 rounded-xl text-center text-xs text-emerald-800 font-extrabold flex flex-col items-center gap-1.5 animate-bounce"
                          >
                            <span>🎉 ALIGNMENT REPAIRED SUCCESSFULLY! (+20 XP)</span>
                          </motion.div>
                        ) : (
                          <div className="bg-rose-50 border border-rose-300 p-3 rounded-xl text-center text-[10px] text-rose-800 font-bold uppercase tracking-wider">
                            ⚠️ TRACK STATUS: DETUNED / COLLISION
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
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
