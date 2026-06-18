import { motion } from "motion/react";
import { QuizQuestion } from "../types";

interface QuizVisualAidProps {
  question: QuizQuestion;
}

export default function QuizVisualAid({ question }: QuizVisualAidProps) {
  const text = (question.question || "").toLowerCase();

  // 1. Point / Bindu Coordinate Match
  if (text.includes("point") || text.includes("coordinate") || text.includes("bindu")) {
    return (
      <div className="w-full h-36 bg-[#0B0F19] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Axis lines */}
          <line x1="30" y1="60" x2="270" y2="60" stroke="#475569" strokeWidth="1.5" />
          <line x1="150" y1="10" x2="150" y2="110" stroke="#475569" strokeWidth="1.5" />
          
          {/* Ticks */}
          {[-4, -2, 2, 4].map((val) => {
            const xPos = 150 + val * 25;
            return (
              <g key={`x-${val}`}>
                <line x1={xPos} y1="57" x2={xPos} y2="63" stroke="#94A3B8" strokeWidth="1" />
                <text x={xPos - 5} y="72" fill="#94A3B8" className="text-[7.5px] font-mono">{val}</text>
              </g>
            );
          })}
          {[-2, 2].map((val) => {
            const yPos = 60 - val * 20;
            return (
              <g key={`y-${val}`}>
                <line x1="147" y1={yPos} x2="153" y2={yPos} stroke="#94A3B8" strokeWidth="1" />
                <text x="135" y={yPos + 3} fill="#94A3B8" className="text-[7.5px] font-mono">{val}</text>
              </g>
            );
          })}

          {/* Plotted Point */}
          <motion.circle
            cx="200"
            cy="20"
            r="10"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.5"
            animate={{ scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="200" cy="20" r="4.5" fill="#FFC700" stroke="#FFF" strokeWidth="1.5" />
          <text x="212" y="24" fill="#FFC700" className="text-[9px] font-mono font-black uppercase">POINT P (2, 2)</text>
          
          {/* Virtual guideline */}
          <line x1="200" y1="20" x2="200" y2="60" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 2" />
          <line x1="200" y1="20" x2="150" y2="20" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 2" />
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-zinc-400 bg-black/40 px-1.5 rounded">
          📍 BINDU (0 DIMENSION LOCATION)
        </span>
      </div>
    );
  }

  // 2. Infinite Line / Rekha Stretch
  if (text.includes("infinite") || text.includes("rekha") || text.includes("line")) {
    if (text.includes("segment") || text.includes("khand")) {
      // Line Segment / Khand
      return (
        <div className="w-full h-36 bg-[#0F172A] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3">
          <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
            {/* Base ruler guides */}
            <line x1="20" y1="80" x2="280" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="3 3"/>

            {/* Segment starts under magnifying scope */}
            <line x1="60" y1="60" x2="240" y2="60" stroke="#4ADE80" strokeWidth="4" />
            
            {/* Labeled end dots */}
            <circle cx="60" cy="60" r="6" fill="#4ADE80" stroke="#000" strokeWidth="2" />
            <text x="55" y="45" fill="#4ADE80" className="text-[10px] font-sans font-black">C</text>

            <circle cx="240" cy="60" r="6" fill="#4ADE80" stroke="#000" strokeWidth="2" />
            <text x="235" y="45" fill="#4ADE80" className="text-[10px] font-sans font-black">D</text>

            {/* Measuring markers */}
            <text x="110" y="95" fill="#94A3B8" className="text-[9px] font-mono font-black uppercase">
              📐 FIXED BOUNDARY LENGTH
            </text>
          </svg>
          <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-green-400 bg-black/40 px-1.5 rounded">
            📏 REKHA-KHAND (2 BOUNDED EDGES)
          </span>
        </div>
      );
    }
    
    // Fallback: Standard infinite Rekha
    return (
      <div className="w-full h-36 bg-[#0F172A] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Double arrowhead line */}
          <defs>
            <marker id="arrow-white" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
            </marker>
          </defs>

          <line x1="30" y1="60" x2="270" y2="60" stroke="#38BDF8" strokeWidth="3" markerStart="url(#arrow-white)" markerEnd="url(#arrow-white)" />
          
          {/* Dot anchors */}
          <circle cx="90" cy="60" r="3.5" fill="#FFF" />
          <text x="86" y="45" fill="#38BDF8" className="text-[9px] font-mono font-bold">X</text>

          <circle cx="210" cy="60" r="3.5" fill="#FFF" />
          <text x="206" y="45" fill="#38BDF8" className="text-[9px] font-mono font-bold">Y</text>

          <text x="75" y="95" fill="#94A3B8" className="text-[9px] font-mono font-bold uppercase">
            ENDLESS EXTENSION ON BOTH SIDES
          </text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-sky-400 bg-black/40 px-1.5 rounded">
          🛣️ ANANT REKHA (0 ENDPOINTS)
        </span>
      </div>
    );
  }

  // 3. Sun Ray / Kiran
  if (text.includes("ray") || text.includes("kiran") || text.includes("laser")) {
    return (
      <div className="w-full h-36 bg-[#0E1524] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Pulsing start origin */}
          <circle cx="50" cy="60" r="14" fill="rgba(245, 158, 11, 0.2)" className="animate-pulse" />
          <circle cx="50" cy="60" r="5" fill="#F59E0B" stroke="#FFF" strokeWidth="1.5" />
          <text x="35" y="42" fill="#F59E0B" className="text-[8.5px] font-mono font-black uppercase">START ☀️</text>

          {/* Ray line shooting right */}
          <line x1="50" y1="60" x2="260" y2="60" stroke="#F59E0B" strokeWidth="3" />
          <polygon points="260,54 272,60 260,66" fill="#F59E0B" />
          <text x="235" y="42" fill="#F59E0B" className="text-[8.5px] font-mono font-black uppercase">INFINITY ➔</text>

          <text x="70" y="95" fill="#94A3B8" className="text-[9px] font-mono font-bold uppercase">
            ONE SOURCE ENDPOINT, ENDLESS DEPARTURE
          </text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-amber-500 bg-black/40 px-1.5 rounded">
          🔦 KIRAN (1 FIXED ENDPOINT)
        </span>
      </div>
    );
  }

  // 4. Maximum / Peaks
  if (text.includes("maximum") || text.includes("max") || text.includes("peak")) {
    return (
      <div className="w-full h-36 bg-[#161224] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-white">
        <div className="flex items-end justify-center gap-5 h-20 border-b border-white/10 pb-1 w-56">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono opacity-50">120</span>
            <div className="w-8 bg-zinc-600 h-8 rounded-t" />
            <span className="text-[8px] font-mono opacity-50">L</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono opacity-50">180</span>
            <div className="w-8 bg-zinc-500 h-12 rounded-t" />
            <span className="text-[8px] font-mono opacity-50">M</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] bg-yellow-400 text-black px-1 rounded font-black max-h-4">👑 PEAK</span>
            <span className="text-[10px] text-yellow-300 font-black">220 🌟</span>
            <div className="w-10 bg-amber-400 h-16 rounded-t border border-white shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <span className="text-[8px] text-yellow-300 font-bold">CSK</span>
          </div>
        </div>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-yellow-300 bg-black/40 px-1.5 rounded">
          📈 MAXIMUM (HIGHEST RECORD)
        </span>
      </div>
    );
  }

  // 5. Minimum / Floor
  if (text.includes("minimum") || text.includes("min") || text.includes("lowest")) {
    return (
      <div className="w-full h-36 bg-[#0B1527] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-white">
        <div className="flex items-end justify-center gap-5 h-20 border-b border-white/10 pb-1 w-56">
          <div className="flex flex-col items-center relative">
            <span className="text-[10px] text-red-400 font-extrabold">-12°C</span>
            <div className="w-10 bg-red-400 h-6 rounded-t border border-red-300" />
            <span className="text-[8px] text-red-300 font-black">BASE</span>
          </div>
          <div className="flex flex-col items-center opacity-40">
            <span className="text-[9px] font-mono">-8°C</span>
            <div className="w-8 bg-zinc-500 h-12 rounded-t" />
            <span className="text-[8px] font-mono">B</span>
          </div>
          <div className="flex flex-col items-center opacity-40">
            <span className="text-[9px] font-mono">-2°C</span>
            <div className="w-8 bg-zinc-500 h-16 rounded-t" />
            <span className="text-[8px] font-mono">C</span>
          </div>
        </div>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-red-400 bg-black/40 px-1.5 rounded">
          📉 MINIMUM (LOWEST VALUE)
        </span>
      </div>
    );
  }

  // 6. Range / Fasla
  if (text.includes("range") || text.includes("fasla")) {
    return (
      <div className="w-full h-36 bg-stone-55 border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-black">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Double brackets */}
          <line x1="40" y1="50" x2="260" y2="50" stroke="#C084FC" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="40" cy="50" r="5.5" fill="#EF4444" stroke="#000" strokeWidth="1.5" />
          <text x="30" y="35" className="text-[8.5px] font-black fill-[#EF4444]">MIN (10)</text>

          <circle cx="260" cy="50" r="5.5" fill="#FBBF24" stroke="#000" strokeWidth="1.5" />
          <text x="245" y="35" className="text-[8.5px] font-black fill-[#CA8A04]">MAX (35)</text>

          {/* Range Arrow */}
          <text x="100" y="80" className="text-[10px] font-black fill-purple-950 font-mono">
            📏 INTERVAL (MAX - MIN) = 25
          </text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-purple-700 bg-black/10 px-1.5 rounded">
          📐 FASLA (SPREAD RANGE)
        </span>
      </div>
    );
  }

  // 7. Crocodile alligator comparison symbols
  if (text.includes("compare") || text.includes("gator") || text.includes("crocodile") || text.includes("<") || text.includes(">")) {
    return (
      <div className="w-full h-36 bg-[#ECFDF5] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Small debt vs smaller debt */}
          <rect x="25" y="25" width="85" height="40" rx="8" fill="#FFF" stroke="#1A202C" strokeWidth="2" />
          <text x="35" y="48" className="text-[10px] font-mono font-black fill-red-650">-42 (Bigger Debt)</text>

          {/* Crocodile giant math mouth */}
          <text x="140" y="58" className="text-3xl font-black fill-emerald-700 font-mono select-none animate-pulse">
            {`❮`}
          </text>

          <rect x="190" y="25" width="85" height="40" rx="8" fill="#FFEAA7" stroke="#000" strokeWidth="2.5" />
          <text x="200" y="48" className="text-[10px] font-mono font-black fill-green-800">-18 (Saves Coins!)</text>

          <text x="50" y="95" className="text-[9px] font-black fill-[#475569] uppercase font-mono">
            Alligator's wide jaw eats the larger deal!
          </text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-emerald-800 bg-black/10 px-1.5 rounded">
          🐊 ALLIGATOR COMPARISON RULES
        </span>
      </div>
    );
  }

  // 8. Rounding / Hill Slides
  if (text.includes("round") || text.includes("nearest") || text.includes("bazaar")) {
    return (
      <div className="w-full h-36 bg-[#FDFBF7] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-black">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Rounding Hill profile */}
          <path d="M 30 100 Q 150 20 270 100" fill="none" stroke="#CA8A04" strokeWidth="3" />
          
          {/* Left limit 10 */}
          <circle cx="30" cy="100" r="5" fill="#EF4444" />
          <text x="20" y="115" className="text-[9px] font-black">10</text>

          {/* Peak 15 */}
          <line x1="150" y1="40" x2="150" y2="105" stroke="#E2E8F0" strokeDasharray="2 2" />
          <text x="142" y="32" className="text-[9px] font-black fill-blue-700">15 (Apex)</text>

          {/* Right limit 20 */}
          <circle cx="270" cy="100" r="5" fill="#22C55E" />
          <text x="265" y="115" className="text-[9px] font-black">20</text>

          {/* Rolling Ball Match */}
          <circle cx="210" cy="65" r="5.5" fill="#FF8A00" stroke="#000" strokeWidth="1.5" />
          <text x="202" y="52" className="text-[8px] font-black fill-[#FF8A00]">Rs 17 ➔</text>

          <text x="65" y="98" className="text-[8px] fill-zinc-400 font-bold">Slide down to 10</text>
          <text x="180" y="98" className="text-[8px] fill-emerald-600 font-bold">Roll up to 20!✓</text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-amber-600 bg-black/10 px-1.5 rounded">
          🎯 NEAREST ROUNDING HILL RULE
        </span>
      </div>
    );
  }

  // 9. Decimal Place magnification scale
  if (text.includes("decimal") || text.includes("0.") || text.includes(".") || text.includes("point")) {
    return (
      <div className="w-full h-36 bg-[#F8FAFC] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-black">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* Number line details */}
          <line x1="30" y1="50" x2="270" y2="50" stroke="#334155" strokeWidth="2.5" />
          
          {/* Main ticks */}
          <line x1="30" y1="40" x2="30" y2="60" stroke="#000" strokeWidth="2.5" />
          <text x="22" y="75" className="text-[10px] font-black">0.30</text>

          <line x1="270" y1="40" x2="270" y2="60" stroke="#000" strokeWidth="2.5" />
          <text x="260" y="75" className="text-[10px] font-black">0.40</text>

          {/* Micro ticks */}
          {Array.from({ length: 9 }).map((_, i) => {
            const xVal = 30 + (i + 1) * 24;
            const isHalf = i === 4;
            return (
              <line
                key={i}
                x1={xVal}
                y1={isHalf ? "42" : "45"}
                x2={xVal}
                y2={isHalf ? "58" : "55"}
                stroke="#64748B"
                strokeWidth={isHalf ? "1.5" : "1"}
              />
            );
          })}

          {/* Plotted Highlight (0.35) */}
          <circle cx="150" cy="50" r="5" fill="#EF4444" className="animate-ping" style={{ transformOrigin: "150px 50px" }} />
          <circle cx="150" cy="50" r="4" fill="#EF4444" />
          <text x="135" y="32" className="text-[9px] font-black fill-red-650">0.35 (Center)</text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-slate-700 bg-black/10 px-1.5 rounded">
          🔬 MICROSCOPIC DECIMAL ZOOM
        </span>
      </div>
    );
  }

  // 10. Ascending / Kram order staircases representation
  if (text.includes("ascending") || text.includes("kram") || text.includes("order") || text.includes("sort")) {
    return (
      <div className="w-full h-36 bg-[#040C1A] border-2 border-black rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-white">
        <svg className="w-full h-full" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
          {/* 3 staircase steps */}
          <rect x="50" y="80" width="50" height="20" rx="3" fill="#3B82F6" stroke="#fff" strokeWidth="1" />
          <text x="65" y="94" className="text-[9.5px] font-mono font-black fill-white">-15</text>
          
          <rect x="110" y="60" width="50" height="40" rx="3" fill="#10B981" stroke="#fff" strokeWidth="1" />
          <text x="130" y="85" className="text-[9.5px] font-mono font-black fill-white">0</text>
          
          <rect x="170" y="40" width="50" height="60" rx="3" fill="#F59E0B" stroke="#fff" strokeWidth="1" />
          <text x="188" y="75" className="text-[9.5px] font-mono font-black fill-white">+24</text>
          
          {/* Climbing arrow */}
          <path d="M 40 100 Q 110 35 230 35" fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="230,30 240,35 230,40" fill="#EC4899" />
          
          <text x="75" y="25" className="text-[9px] font-mono font-black fill-pink-400">
            📈 ASCENDING KRAM: DEBT TO PEAK
          </text>
        </svg>
        <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-pink-400 bg-black/40 px-1.5 rounded">
          🪜 STAIR ASCENT ASCENDING QUEUE
        </span>
      </div>
    );
  }

  // 10. Default beautiful blackboard blueprint drawing
  return (
    <div className="w-full h-36 bg-[#142A22] border-2 border-emerald-950 rounded-2xl relative overflow-hidden flex items-center justify-center p-3 text-emerald-100">
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
      
      <svg className="w-full h-full pointer-events-none" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="35" className="text-[9.5px] font-mono fill-emerald-300 font-bold">1. Assess coordinate / scale values</text>
        <text x="20" y="55" className="text-[9.5px] font-mono fill-emerald-300 font-bold">2. Work out calculations step-by-step</text>
        <text x="20" y="75" className="text-[9.5px] font-mono fill-emerald-300 font-bold">3. Match nearest multiple or baseline!</text>
        
        {/* Draw a little protractor mockup */}
        <path d="M 210 90 A 30 30 0 0 1 270 90 Z" fill="rgba(255,255,255,0.08)" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="240" y1="90" x2="240" y2="60" stroke="#FBBF24" strokeWidth="1" />
      </svg>
      <span className="absolute bottom-2 left-3 text-[8.5px] font-mono font-black uppercase text-emerald-300 bg-black/40 px-1.5 rounded">
        🎓 BHAIYA'S BOARD OF GYAAN
      </span>
    </div>
  );
}
