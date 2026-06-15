import { motion } from "motion/react";

// @ts-ignore
import nanoBananaAsset from "../assets/images/nano_banana_1781517323211.jpg";

interface StoryVisualAidProps {
  subtopicId: string;
  activeVariantIndex?: number;
}

// Dialog helper for Nano Banana companion based on subtopic and active episode
function getNanoBananaDialogue(subtopicId: string, idx: number): string {
  const ep = idx + 1;
  const isGeom = subtopicId.includes("geom");
  const isMaxmin = subtopicId.includes("maxmin");
  const isCompare = subtopicId.includes("compare");

  if (subtopicId.includes("bindu")) {
    return `Beep! Live GPS track at Episode ${ep} locked! This single indicator dot represents coordinates (Bindu) which has exactly 0 dimensions—only a position!`;
  }
  if (subtopicId.includes("rekha")) {
    return `Look at Chawri Bazar's metro rail blueprint! These straight rails form Parallel Lines (Rekha) which run forever with uniform spacing—they will NEVER cross!`;
  }
  if (subtopicId.includes("khand")) {
    return `Beep! Measuring custom packing thread A to B? This spans exactly ${idx * 2 + 5} cm. It is a Line Segment (Khand) because it has 2 locked endpoints. Neat!`;
  }
  if (subtopicId.includes("kiran")) {
    return `Super laser beam fired! ☄️ Since it starts at exactly 1 hand-source origin and flies forward into infinite starry sky, it is a Ray (Kiran)!`;
  }
  if (subtopicId.includes("shikhar")) {
    return `Corner samosa alert! 📐 The point where two sides converge is called the Shikhar (Vertex). Math angles determine how pointy it is!`;
  }
  if (subtopicId.includes("max")) {
    return `IPL scores checked! Peak value is always the absolute MAXIMUM. In Episode ${ep}, our champion scores gold tags! Defeat the competitor!`;
  }
  if (subtopicId.includes("min")) {
    return `Cold freezer analysis! The furthest negative value on the left of our number line represents the absolute MINIMUM temperature. Brrr, frozen lassi! ❄️`;
  }
  if (subtopicId.includes("range")) {
    return `Wait! Solving Fasla (Range) is super simple. Just compute: (Max Value) minus (Min Value) to discover the sweet box spread!`;
  }
  if (subtopicId.includes("basics")) {
    return `Gator mouth active! 🐊 Remember, the greedy crocodile always eats the LARGER balance (closer to zero for negative debts)! Let's feed him!`;
  }
  if (subtopicId.includes("decimals")) {
    return `Comparing grams weights of saffron! Place values count: tenths column beats hundredths. Compare carefully!`;
  }
  if (subtopicId.includes("rounding")) {
    return `Ooh, delicious kachoris! Settle bills in whole rounded rupees. If the paisa ends in .50 or greater, push it up to the next rupee!`;
  }
  if (subtopicId.includes("place")) {
    return `Lockbox code challenge! Find the digit occupying the Hazaar (Thousands) column. Rotate the dial to crack Episode ${ep}!`;
  }
  if (subtopicId.includes("order")) {
    return `Ordering (Kram) challenge! To arrange from largest to smallest, compare digits starting from the left column to right. Keep it aligned!`;
  }
  return `Solving Delhi Market adventure puzzles with algebra and numbers! Use the visual aid above to secure your $+25$ XP coins!`;
}

// Animated Nano Banana Companion Box
function NanoBananaCompanion({ subtopicId, activeVariantIndex }: { subtopicId: string; activeVariantIndex: number }) {
  const dialogue = getNanoBananaDialogue(subtopicId, activeVariantIndex);

  return (
    <div className="bg-[#FFEAA7]/40 border-t-3 border-black p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-left font-sans">
      <div className="relative flex-shrink-0">
        {/* Pulsing beacon behind mascot */}
        <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-25 scale-90" />
        <div className="w-14 h-14 rounded-full border-3 border-black overflow-hidden bg-white shadow-[2px_2px_0px_black] relative z-10">
          <motion.img 
            src={nanoBananaAsset} 
            alt="Nano Banana" 
            className="w-full h-full object-cover" 
            animate={{ 
              y: [0, -4, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5, 
              ease: "easeInOut" 
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-0.5 inset-x-0 flex justify-center">
            <span className="bg-amber-400 text-black border border-black rounded text-[7px] font-black px-1 uppercase tracking-tight scale-75 leading-none">
              NANO
            </span>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-white border-3 border-black p-3 rounded-2xl relative shadow-[3px_3px_0px_black] w-full">
        {/* Speech Bubble Arrow */}
        <div className="hidden sm:block absolute -left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l-3 border-b-3 border-black rotate-45" />
        <div className="relative z-10 text-left">
          <span className="text-[10px] uppercase font-black text-amber-600 tracking-wider block mb-0.5">🍌 Nano Banana:</span>
          <p className="text-xs font-bold text-slate-800 leading-normal">
            {dialogue}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StoryVisualAid({ subtopicId, activeVariantIndex = 0 }: StoryVisualAidProps) {
  // Select illustration matching subtopic
  const ep = activeVariantIndex + 1;
  let illustration = null;

  if (subtopicId === "geom_bindu") {
    illustration = (
      <div className="w-full h-44 bg-[#0F172A] relative overflow-hidden flex flex-col justify-between p-4">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Delhi Market Bazaar visual accents */}
        <div className="absolute bottom-0 inset-x-0 h-12 flex justify-around items-end opacity-40">
          <div className="w-8 bg-slate-800 h-8 rounded-t border-2 border-slate-705" />
          <div className="w-12 bg-slate-700 h-10 rounded-t border-2 border-slate-605" />
          <div className="w-6 bg-slate-800 h-6 rounded-t border-2 border-slate-705" />
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Street grids intersecting */}
          <line x1="25%" y1="10%" x2="75%" y2="90%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
          <line x1="10%" y1="70%" x2="90%" y2="30%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
          
          {/* Target marker */}
          <circle cx="160" cy="80" r="16" fill="none" stroke="#22C55E" strokeWidth="2.5" className="animate-ping" style={{ transformOrigin: "160px 80px" }} />
          <circle cx="160" cy="80" r="6" fill="#FBBF24" stroke="#FFF" strokeWidth="2" />
        </svg>

        <div className="z-10 text-left">
          <span className="bg-[#22C55E] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">MAP POSITION</span>
          <h5 className="text-white text-xs font-black uppercase mt-1">Bindu Point • Coordinates ep-{ep}</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-400 font-bold uppercase">
          0 Dimensions • No width or height
        </div>
      </div>
    );
  } 
  else if (subtopicId === "geom_rekha") {
    illustration = (
      <div className="w-full h-44 bg-[#0B151E] relative overflow-hidden flex flex-col justify-between p-4">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#0C1520" />
          {/* Grid lines disappearing */}
          <line x1="50%" y1="40%" x2="-30%" y2="100%" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1.5" />
          <line x1="50%" y1="40%" x2="130%" y2="100%" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1.5" />

          {/* Endless parallel tracks */}
          <line x1="-10%" y1="60%" x2="110%" y2="60%" stroke="#475569" strokeWidth="5" />
          <line x1="-10%" y1="70%" x2="110%" y2="70%" stroke="#475569" strokeWidth="5" />
          
          {/* sleepers */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={`${i * 8}%`} y1="58%" x2={`${i * 8 + 2}%`} y2="72%" stroke="#94A3B8" strokeWidth="1.5" />
          ))}

          {/* Infinity Arrows */}
          <path d="M 15 52 L 4 60 L 15 68" fill="none" stroke="#38BDF8" strokeWidth="3" className="animate-pulse" />
          <path d="M 285 52 L 296 60 L 285 68" fill="none" stroke="#38BDF8" strokeWidth="3" className="animate-pulse" />
        </svg>

        <div className="z-10 text-left">
          <span className="bg-sky-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">PARALLEL BLUEPRINT</span>
          <h5 className="text-white text-xs font-black uppercase mt-1">Endless Line (Rekha)</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-300 font-bold uppercase">
          Infinite Stretch • Never intersect
        </div>
      </div>
    );
  } 
  else if (subtopicId === "geom_khand") {
    illustration = (
      <div className="w-full h-44 bg-[#FAF8E9] relative overflow-hidden flex flex-col justify-between p-4">
        {/* Box outline */}
        <div className="absolute inset-x-8 top-10 bottom-10 border-2 border-black bg-[#E6C387] rounded shadow-inner flex justify-center items-center">
          <div className="w-full h-0.5 bg-[#8B5A2B]" />
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Start marker A */}
          <circle cx="80" cy="85" r="6" fill="#E11D48" stroke="#000" strokeWidth="2" />
          <text x="75" y="72" className="text-[10px] font-black fill-[#E11D48]">A</text>

          {/* Connecting segment chord */}
          <line x1="80" y1="85" x2="220" y2="85" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
          <line x1="80" y1="85" x2="220" y2="85" stroke="#000" strokeWidth="1" strokeDasharray="3 3" />

          {/* End marker B */}
          <circle cx="220" cy="85" r="6" fill="#E11D48" stroke="#000" strokeWidth="2" />
          <text x="215" y="72" className="text-[10px] font-black fill-[#E11D48]">B</text>

          <text x="110" y="105" className="text-[8px] font-mono font-black fill-slate-700">📏 LENGTH: {idxToLen(activeVariantIndex)} cm</text>
        </svg>

        <div className="z-10 text-left">
          <span className="bg-[#E11D48] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">SEGMENT</span>
          <h5 className="text-black text-xs font-black uppercase mt-1">Line Segment (Rekha-khand)</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase">
          2 Locked endpoints • Measurable
        </div>
      </div>
    );
  } 
  else if (subtopicId === "geom_kiran") {
    illustration = (
      <div className="w-full h-44 bg-[#090D16] relative overflow-hidden flex flex-col justify-between p-4">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Pulse originating light */}
          <circle cx="60" cy="80" r="14" fill="rgba(239, 68, 68, 0.25)" className="animate-pulse" />
          <circle cx="60" cy="80" r="4.5" fill="#EF4444" stroke="#FFF" strokeWidth="2" />
          <text x="45" y="60" className="text-[8px] font-black fill-red-400">SOURCE vertex</text>

          {/* Bright laser line */}
          <line x1="60" y1="80" x2="260" y2="80" stroke="#EF4444" strokeWidth="2.5" />
          <line x1="60" y1="80" x2="260" y2="80" stroke="#FFF" strokeWidth="0.8" />

          {/* Stars */}
          <circle cx="150" cy="30" r="1" fill="#fff" className="animate-pulse" />
          <circle cx="210" cy="110" r="1" fill="#fff" className="animate-ping" />

          {/* Outward arrow */}
          <polygon points="260,75 272,80 260,85" fill="#EF4444" />
          <text x="240" y="65" className="text-[8px] font-black fill-red-400">INFINITY</text>
        </svg>

        <div className="z-10 text-left">
          <span className="bg-[#EF4444] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">LASER BEAM</span>
          <h5 className="text-white text-xs font-black uppercase mt-1">Ray (Kiran)</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-400 font-bold uppercase">
          1 Origin Vertex • Infinite one-way flight
        </div>
      </div>
    );
  } 
  else if (subtopicId === "geom_shikhar") {
    illustration = (
      <div className="w-full h-44 bg-[#0D1E15] relative overflow-hidden flex flex-col justify-between p-4">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Triangular angle corner */}
          <path d="M 60,115 L 150,45 L 240,115" fill="none" stroke="#22C55E" strokeWidth="3.5" />
          
          <path d="M 130,62 A 25 25 0 0 0 170,62" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
          <text x="142" y="76" className="text-[9px] font-black fill-[#FBBF24]">∠ 60°</text>

          {/* Corner Apex point */}
          <circle cx="150" cy="45" r="5" fill="#FBBF24" stroke="#FFF" strokeWidth="2" className="animate-pulse" />
          <text x="120" y="30" className="text-[9px] font-extrabold fill-emerald-200">SHIKHAR (VERTEX)</text>
        </svg>

        <div className="z-10 text-left">
          <span className="bg-[#FBBF24] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">SHARP APEX</span>
          <h5 className="text-white text-xs font-black uppercase mt-1">Angle Vertex (Shikhar)</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-emerald-400 font-bold uppercase">
          Two intersecting ray corners
        </div>
      </div>
    );
  } 
  else if (subtopicId === "maxmin_max") {
    const scoreVal = activeVariantIndex * 12 + 100;
    illustration = (
      <div className="w-full h-44 bg-[#180A2B] relative overflow-hidden flex flex-col justify-between p-4 text-white">
        <div className="absolute top-2 right-8 text-xl animate-bounce">🏆</div>
        
        <div className="flex items-end justify-center gap-4 h-20 border-b border-white/20 pb-1">
          <div className="flex flex-col items-center opacity-40">
            <span className="text-[8px] font-mono">92 runs</span>
            <div className="w-8 bg-slate-650 h-8 rounded-t" />
            <span className="text-[7px]">MI</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] bg-yellow-400 text-black px-1 rounded font-black">KING</span>
            <span className="text-[9px] font-mono text-amber-300 font-black">{scoreVal} 🌟</span>
            <div className="w-9 bg-amber-400 h-16 rounded-t border border-white shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
            <span className="text-[7px] text-amber-300 font-bold">CSK</span>
          </div>
          <div className="flex flex-col items-center opacity-40">
            <span className="text-[8px] font-mono">60 runs</span>
            <div className="w-8 bg-slate-650 h-5 rounded-t" />
            <span className="text-[7px]">RCB</span>
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-yellow-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">PEAK METRIC</span>
          <h5 className="text-white text-xs font-black uppercase mt-1">IPL Score Maximum: {scoreVal}</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-purple-300 font-bold uppercase">
          Highest element in candidate set
        </div>
      </div>
    );
  } 
  else if (subtopicId === "maxmin_min") {
    const coldestVal = -(activeVariantIndex * 3);
    illustration = (
      <div className="w-full h-44 bg-[#0C1E32] relative overflow-hidden flex flex-col justify-between p-4 text-white">
        <div className="absolute top-2 right-8 text-sky-400 text-xl animate-spin" style={{ animationDuration: "14s" }}>❄️</div>
        
        <div className="flex items-end justify-center gap-4 h-20 border-b border-white/25 pb-1">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-sky-300 font-black">{coldestVal}°C 🎯</span>
            <div className="w-9 bg-sky-400 h-16 rounded-t border border-white shadow-[0_0_10px_rgba(56,189,248,0.4)]" />
            <span className="text-[7px] text-sky-300 font-bold">MIN FREEZER</span>
          </div>
          <div className="flex flex-col items-center opacity-40">
            <span className="text-[8px] font-mono">-2°C</span>
            <div className="w-8 bg-slate-500 h-10 rounded-t" />
            <span className="text-[7px]">ICE BOX</span>
          </div>
          <div className="flex flex-col items-center opacity-40">
            <span className="text-[8px] font-mono">0°C</span>
            <div className="w-8 bg-slate-600 h-6 rounded-t" />
            <span className="text-[7px]">AMBIENT</span>
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-blue-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">FLOOR METRIC</span>
          <h5 className="text-white text-xs font-black uppercase mt-1">Cold Temp Minimum: {coldestVal}°C</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-400 font-bold uppercase">
          Lowest value on number line
        </div>
      </div>
    );
  } 
  else if (subtopicId === "maxmin_range") {
    const minVal = activeVariantIndex * 5 + 40;
    const maxVal = activeVariantIndex * 20 + 200;
    const rangeVal = maxVal - minVal;
    illustration = (
      <div className="w-full h-44 bg-white relative overflow-hidden flex flex-col justify-between p-4 text-black">
        <div className="my-1 p-2 bg-indigo-50 border border-dashed border-indigo-300 rounded-xl max-w-sm mx-auto flex flex-col items-center">
          <span className="text-[8px] font-mono text-indigo-900 font-black uppercase">Math Interval Spread</span>
          <div className="flex items-center gap-2 font-mono text-[10px] font-black text-slate-800 mt-1">
            <span className="bg-[#EF4444] text-white px-1.5 py-0.5 rounded">Max ({maxVal})</span>
            <span>-</span>
            <span className="bg-[#4D96FF] text-white px-1.5 py-0.5 rounded">Min ({minVal})</span>
            <span>=</span>
            <span className="bg-emerald-400 text-black px-1.5 py-0.5 rounded">Fasla ({rangeVal})</span>
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">SPREAD SENSE</span>
          <h5 className="text-black text-xs font-black uppercase mt-1">Fasla Spread: Rs. {rangeVal}</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase">
          Interval gap (Maximum - Minimum)
        </div>
      </div>
    );
  } 
  else if (subtopicId === "compare_basics") {
    const a = activeVariantIndex * 4;
    const b = activeVariantIndex * 8;
    illustration = (
      <div className="w-full h-44 bg-[#ECFDF5] relative overflow-hidden flex flex-col justify-between p-4 text-black">
        <div className="absolute top-2 right-10 text-xl animate-bounce">🐊</div>

        <div className="flex items-center justify-center gap-4 my-1">
          <div className="border-2 border-black bg-white px-2 py-1 rounded shadow-[2px_2px_0px_black] font-mono font-black text-2xs text-red-500">
            Debt: -{b} coins
          </div>
          <div className="text-2xl font-black text-emerald-600 font-mono select-none animate-pulse">
            {`❮`}
          </div>
          <div className="border-3 border-black bg-amber-100 px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_black] font-mono font-black text-xs text-green-700">
            Debt: -{a} coins
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-[#10B981] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">COMPARISON SCALE</span>
          <h5 className="text-slate-900 text-xs font-black uppercase mt-1">Eater is hungry for -{a} (Larger)</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase">
          Less liability sits further right on number lines
        </div>
      </div>
    );
  } 
  else if (subtopicId === "compare_decimals") {
    const valA = (1.45 + activeVariantIndex * 0.01).toFixed(3);
    const valB = (1.409 + activeVariantIndex * 0.01).toFixed(3);
    illustration = (
      <div className="w-full h-44 bg-[#FFFDF5] relative overflow-hidden flex flex-col justify-between p-4 text-black">
        <div className="flex items-center justify-around gap-2 my-1">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-mono text-zinc-500 font-bold">Stall A Saffron</span>
            <div className="border-3 border-black bg-emerald-100 p-1.5 rounded-xl font-mono font-black text-xs text-green-700 shadow-[2px_2px_0px_black] animate-pulse">
              {valA} g
            </div>
            <span className="text-[7px] text-green-800 font-bold">5 Hundredths</span>
          </div>
          <span className="text-sm font-black text-zinc-400 font-mono scale-110">{`>`}</span>
          <div className="flex flex-col items-center opacity-70">
            <span className="text-[8px] font-mono text-zinc-500 font-bold">Stall B Saffron</span>
            <div className="border border-black bg-white p-1 rounded font-mono font-black text-xs text-red-650">
              {valB} g
            </div>
            <span className="text-[7px] text-zinc-500">0 Hundredths</span>
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-amber-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">PRECISION PLACE</span>
          <h5 className="text-slate-900 text-xs font-black uppercase mt-1">Comparative Decimals: {valA} g &gt; {valB} g</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase">
          Tenths &amp; hundredths determine greater weight
        </div>
      </div>
    );
  }
  // NEW: CUSTOM ILLUSTRATIONS FOR UNHANDLED STORY SUBTOPICS!!
  else if (subtopicId === "compare_rounding") {
    const baseValue = parseFloat((44.3 + activeVariantIndex * 0.15).toFixed(2));
    const roundedValue = Math.round(baseValue);
    illustration = (
      <div className="w-full h-44 bg-[#FFF0E5] relative overflow-hidden flex flex-col justify-between p-4 text-black">
        <div className="absolute top-2 right-10 text-xl animate-bounce">🍲</div>
        
        <div className="flex items-center justify-center gap-4 my-1">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-mono text-zinc-500 font-bold">Kachori Price Bill</span>
            <div className="border-2 border-black bg-white p-1.5 rounded font-mono font-black text-xs text-zinc-800">
              Rs. {baseValue}
            </div>
          </div>
          <span className="text-[14px] font-black text-orange-600 font-sans leading-none">➔ Settle Rupee ➔</span>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-mono text-zinc-500 font-bold">Nearest Rounded Settle</span>
            <div className="border-3 border-black bg-[#FFD166] p-2 rounded-xl font-mono font-black text-sm text-black shadow-[2.5px_2.5px_0px_black] animate-pulse">
              Rs. {roundedValue}
            </div>
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-orange-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">ROUNDING MATRIX</span>
          <h5 className="text-slate-900 text-xs font-black uppercase mt-1">Boundary condition: .50 Settle rule</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase">
          Rupee boundaries determine up/down splits
        </div>
      </div>
    );
  }
  else if (subtopicId === "compare_place") {
    const numCode = 35000 + activeVariantIndex * 650;
    const thousandsDigit = Math.floor((numCode % 10000) / 1000);
    illustration = (
      <div className="w-full h-44 bg-[#EDF2FA] relative overflow-hidden flex flex-col justify-between p-4 text-black">
        <div className="absolute top-2 right-8 text-xl animate-pulse">🔐</div>

        {/* Lock column digital place indicators */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 my-1">
          <div className="flex flex-col items-center">
            <span className="text-[6px] font-black text-zinc-400">Ten-Tho</span>
            <div className="border border-zinc-400 bg-zinc-200 px-1 py-1 rounded font-mono font-extrabold text-2xs text-zinc-500">
              3
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[7px] font-black text-blue-600">HAZAAR</span>
            <div className="border-3 border-blue-600 bg-blue-100 px-2 py-1.5 rounded-xl font-mono font-black text-xs text-blue-800 shadow-sm scale-110 animate-bounce">
              {thousandsDigit}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[6px] font-black text-zinc-400">Hundred</span>
            <div className="border border-zinc-400 bg-zinc-200 px-1 py-1 rounded font-mono font-extrabold text-2xs text-zinc-500">
              {Math.floor((numCode % 100) / 100)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[6px] font-black text-zinc-400">Ten</span>
            <div className="border border-zinc-400 bg-zinc-200 px-1 py-1 rounded font-mono font-extrabold text-2xs text-zinc-500">
              {Math.floor((numCode % 100) / 10)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[6px] font-black text-zinc-400">One</span>
            <div className="border border-zinc-400 bg-zinc-200 px-1 py-1 rounded font-mono font-extrabold text-2xs text-zinc-500">
              {numCode % 10}
            </div>
          </div>
        </div>

        <div className="z-10 text-left">
          <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">PLACE VALUE</span>
          <h5 className="text-slate-900 text-xs font-black uppercase mt-1">Hazaar Slot Code value: {numCode}</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase">
          Each digit holds structural weight based on column
        </div>
      </div>
    );
  }
  else {
    // Default Delhi Market visual illustration fallback
    illustration = (
      <div className="w-full h-44 bg-gradient-to-br from-indigo-50 to-sky-50 relative overflow-hidden flex flex-col justify-between p-4 text-black">
        <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-[#FFD700]/10 border border-dashed border-[#FFD700]" />
        
        <div className="flex justify-center items-center gap-3">
          <span className="text-3xl animate-bounce" style={{ animationDuration: "2.5s" }}>🎒</span>
          <span className="border-3 border-black p-2 bg-white rounded-2xl font-sans text-xs font-extrabold shadow-[2px_2px_0px_black] uppercase tracking-wider">
            DELHI STREET MATH LAB
          </span>
          <span className="text-3xl animate-pulse">✏️</span>
        </div>

        <div className="z-10 text-left">
          <span className="bg-black text-yellow-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-mono">CHAPTER GRAPHIC</span>
          <h5 className="text-slate-900 text-xs font-black uppercase mt-1">Delhi Bazaar math quest</h5>
        </div>
        <div className="z-10 text-right text-[9px] font-mono text-zinc-500 font-bold uppercase p-0.5">
          Step ep-{ep} adventure calculations
        </div>
      </div>
    );
  }

  // Combined widget: Main scene graphic + cutest talkative Nano Banana chatbot advising tips!
  return (
    <div className="flex flex-col w-full overflow-hidden rounded-2xl border-2 border-black bg-white">
      {illustration}
      <NanoBananaCompanion subtopicId={subtopicId} activeVariantIndex={activeVariantIndex} />
    </div>
  );
}

// Simple internal helper to return custom length values in story khand measuring
function idxToLen(idx: number): number {
  return idx * 2 + 5;
}
