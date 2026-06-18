import React, { useState, useRef, useEffect } from "react";
import { Move, RefreshCw, Star, Info, HelpCircle } from "lucide-react";
import { MicroConceptTooltip } from "./MicroConceptTooltip";

interface Point {
  x: number;
  y: number;
  id: string;
  label: string;
  color: string;
}

interface InteractiveSandboxProps {
  subtopicId?: string;
}

export default function InteractiveSandbox({ subtopicId }: InteractiveSandboxProps) {
  const [points, setPoints] = useState<Point[]>([
    { x: -3, y: 3, id: "A", label: "Vertex A", color: "#FBBF24" },  // Yellow
    { x: 3, y: 3, id: "B", label: "Vertex B", color: "#3B82F6" },   // Blue
    { x: 3, y: -3, id: "C", label: "Vertex C", color: "#10B981" },  // Green
    { x: -3, y: -3, id: "D", label: "Vertex D", color: "#EC4899" }  // Pink
  ]);

  const [activeTool, setActiveTool] = useState<"point" | "segment" | "ray" | "line" | "triangle" | "rectangle">("triangle");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (subtopicId) {
      if (subtopicId.includes("bindu")) {
        setActiveTool("point");
      } else if (subtopicId.includes("khand")) {
        setActiveTool("segment");
      } else if (subtopicId.includes("kiran")) {
        setActiveTool("ray");
      } else if (subtopicId.includes("rekha")) {
        setActiveTool("line");
      } else if (subtopicId.includes("shikhar")) {
        setActiveTool("triangle");
      } else if (subtopicId.includes("rectangle") || subtopicId.includes("ayat")) {
        setActiveTool("rectangle");
      }
    }
  }, [subtopicId]);

  // Constants for coordinate mapping
  const width = 360;
  const height = 360;
  const gridRange = 5; // -5 to +5

  // Map math coordinate (x, y) to SVG screen pixel (px, py)
  const toPixels = (x: number, y: number) => {
    const px = width / 2 + (x * (width / 2)) / gridRange;
    const py = height / 2 - (y * (height / 2)) / gridRange;
    return { x: px, y: py };
  };

  // Map SVG screen pixel (px, py) back to math coordinate (x, y)
  const toCoords = (px: number, py: number) => {
    let x = ((px - width / 2) * gridRange) / (width / 2);
    let y = ((height / 2 - py) * gridRange) / (height / 2);
    // Round to nearest 0.5 for crisp snap grid experience
    x = Math.round(x * 2) / 2;
    y = Math.round(y * 2) / 2;
    // Boundary lock
    x = Math.max(-gridRange, Math.min(gridRange, x));
    y = Math.max(-gridRange, Math.min(gridRange, y));
    return { x, y };
  };

  // Drag handlers
  const handleStartDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDraggingId(id);
  };

  const handlePointerMove = (e: React.MouseEvent & React.TouchEvent & any) => {
    if (!draggingId || !svgRef.current) return;

    // Get client position based on touch or mouse
    const rect = svgRef.current.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const px = clientX - rect.left;
    const py = clientY - rect.top;

    const { x, y } = toCoords(px, py);

    setPoints((prev) =>
      prev.map((pt) => (pt.id === draggingId ? { ...pt, x, y } : pt))
    );
  };

  const handleStopDrag = () => {
    setDraggingId(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggingId(null);
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  const resetCoordinates = () => {
    setPoints([
      { x: -3, y: 3, id: "A", label: "Vertex A", color: "#FBBF24" },
      { x: 3, y: 3, id: "B", label: "Vertex B", color: "#3B82F6" },
      { x: 3, y: -3, id: "C", label: "Vertex C", color: "#10B981" },
      { x: -3, y: -3, id: "D", label: "Vertex D", color: "#EC4899" }
    ]);
  };

  // Calculations for current elements
  const ptA = points[0];
  const ptB = points[1];
  const ptC = points[2];
  const ptD = points[3] || { x: -3, y: -3, id: "D", label: "Vertex D", color: "#EC4899" };

  const pxA = toPixels(ptA.x, ptA.y);
  const pxB = toPixels(ptB.x, ptB.y);
  const pxC = toPixels(ptC.x, ptC.y);
  const pxD = toPixels(ptD.x, ptD.y);

  // Length of Segment AB
  const segABLength = Math.sqrt(Math.pow(ptB.x - ptA.x, 2) + Math.pow(ptB.y - ptA.y, 2));

  // Determine slope/intercept for endless line AB
  const dx = ptB.x - ptA.x;
  const dy = ptB.y - ptA.y;
  let lineX1 = -gridRange;
  let lineY1 = 0;
  let lineX2 = gridRange;
  let lineY2 = 0;

  if (dx !== 0) {
    const slope = dy / dx;
    const intercept = ptA.y - slope * ptA.x;
    lineY1 = slope * (-gridRange) + intercept;
    lineY2 = slope * gridRange + intercept;
  } else {
    // Vertical line
    lineX1 = ptA.x;
    lineY1 = -gridRange;
    lineX2 = ptA.x;
    lineY2 = gridRange;
  }

  const pxLine1 = toPixels(lineX1, lineY1);
  const pxLine2 = toPixels(lineX2, lineY2);

  // Segment BC and CA calculations to see if a real Triangle forms
  const segBCLength = Math.sqrt(Math.pow(ptC.x - ptB.x, 2) + Math.pow(ptC.y - ptB.y, 2));
  const segCALength = Math.sqrt(Math.pow(ptA.x - ptC.x, 2) + Math.pow(ptA.y - ptC.y, 2));

  // Area of formed triangle using coordinates
  const triangleArea = 0.5 * Math.abs(
    ptA.x * (ptB.y - ptC.y) + ptB.x * (ptC.y - ptA.y) + ptC.x * (ptA.y - ptB.y)
  );

  // Quadrilateral analysis for Rectangle mode
  const sideDA = Math.sqrt(Math.pow(ptA.x - ptD.x, 2) + Math.pow(ptA.y - ptD.y, 2));
  const sideCD = Math.sqrt(Math.pow(ptD.x - ptC.x, 2) + Math.pow(ptD.y - ptC.y, 2));

  const classifyQuadrilateral = () => {
    const ab = { x: ptB.x - ptA.x, y: ptB.y - ptA.y };
    const bc = { x: ptC.x - ptB.x, y: ptC.y - ptB.y };
    const cd = { x: ptD.x - ptC.x, y: ptD.y - ptC.y };
    const da = { x: ptA.x - ptD.x, y: ptA.y - ptD.y };

    // Opposite sides length checks
    const ab_len = Math.sqrt(ab.x*ab.x + ab.y*ab.y);
    const bc_len = Math.sqrt(bc.x*bc.x + bc.y*bc.y);
    const cd_len = Math.sqrt(cd.x*cd.x + cd.y*cd.y);
    const da_len = Math.sqrt(da.x*da.x + da.y*da.y);

    // Check if opposite sides are approximately equal (parallelogram condition)
    const opp1_equal = Math.abs(ab_len - cd_len) < 0.2;
    const opp2_equal = Math.abs(bc_len - da_len) < 0.2;

    // Check perpendicularity (dot product of AB and BC)
    const dotAB_BC = ab.x * bc.x + ab.y * bc.y;
    const isPerpendicular = Math.abs(dotAB_BC) < 0.25;

    if (opp1_equal && opp2_equal) {
      if (isPerpendicular) {
        // If all adjacent sides are equal, it's a square
        if (Math.abs(ab_len - bc_len) < 0.2) {
          return "Square (Varg) 🟦";
        }
        return "Rectangle (Ayat) 📊";
      }
      return "Parallelogram (Samanantar) ▱";
    }
    return "Quadrilateral (Chaturbhuj) 💠";
  };

  return (
    <div className="bg-white border-4 border-black rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_black] text-black font-mono">
      <div className="flex items-center justify-between border-b-2 border-black border-dashed pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📐</span>
          <div>
            <h4 className="font-sans font-black text-sm uppercase text-zinc-900 leading-tight">Geometry Stretch-Lab</h4>
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Maths Dost's Interactive Chalkboard</p>
          </div>
        </div>
        <button
          onClick={resetCoordinates}
          className="p-1 px-2.5 bg-neutral-100 hover:bg-neutral-200 border-2 border-black shadow-[2px_2px_0px_black] rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:translate-y-0.5"
        >
          <RefreshCw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Left column: SVG Chalk-Grid Sandbox */}
        <div className="md:col-span-7 flex flex-col items-center">
          
          <div className="w-full max-w-[360px] relative">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              className="bg-[#143d30] border-4 border-[#5c3214] rounded-xl shadow-inner cursor-crosshair select-none overflow-hidden touch-none"
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              onMouseLeave={handleStopDrag}
            >
              {/* Grid lines */}
              {Array.from({ length: gridRange * 2 + 1 }).map((_, i) => {
                const val = -gridRange + i;
                const pLineHorizontal = toPixels(-gridRange, val);
                const pLineVertical = toPixels(val, -gridRange);

                return (
                  <React.Fragment key={i}>
                    {/* Horizontal grid lines */}
                    <line
                      x1={0}
                      y1={pLineHorizontal.y}
                      x2={width}
                      y2={pLineHorizontal.y}
                      stroke="#808080"
                      strokeOpacity={val === 0 ? 0.6 : 0.15}
                      strokeWidth={val === 0 ? 2 : 1}
                      strokeDasharray={val === 0 ? "" : "3,3"}
                    />
                    {/* Vertical grid lines */}
                    <line
                      x1={pLineVertical.x}
                      y1={0}
                      x2={pLineVertical.x}
                      y2={height}
                      stroke="#808080"
                      strokeOpacity={val === 0 ? 0.6 : 0.15}
                      strokeWidth={val === 0 ? 2 : 1}
                      strokeDasharray={val === 0 ? "" : "3,3"}
                    />
                    {/* Grid numbers for axes */}
                    {val !== 0 && (
                      <>
                        <text
                          x={pLineVertical.x}
                          y={height / 2 + 14}
                          fill="#a3cca3"
                          fillOpacity={0.7}
                          fontSize="9"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {val}
                        </text>
                        <text
                          x={width / 2 - 12}
                          y={pLineHorizontal.y + 4}
                          fill="#a3cca3"
                          fillOpacity={0.7}
                          fontSize="9"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {val}
                        </text>
                      </>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Origin indicator (0,0) */}
              <circle cx={width / 2} cy={height / 2} r="3" fill="#ffffff" fillOpacity="0.4" />

              {/* DRAW SHAPES DEPENDING ON ACTIVE TOOL */}

              {/* 1. Point tool helper (marks A, B, C positions) */}
              {activeTool === "point" && (
                <text x="15" y="25" fill="#ffffff" fillOpacity="0.5" fontSize="10">
                  Mode: Point Analysis 📍
                </text>
              )}

              {/* 2. Rekha-khand Segment AB (Connects Yellow & Blue points) */}
              {activeTool === "segment" && (
                <line
                  x1={pxA.x}
                  y1={pxA.y}
                  x2={pxB.x}
                  y2={pxB.y}
                  stroke="#FFC700"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              )}

              {/* 3. Kiran Laser Ray AB (Originate at Origin ptA, passing B into outer boundary) */}
              {activeTool === "ray" && (
                <>
                  <line
                    x1={pxA.x}
                    y1={pxA.y}
                    x2={pxB.x}
                    y2={pxB.y}
                    stroke="#FF7F50"
                    strokeWidth="3.5"
                  />
                  {/* Laser line to infinite end */}
                  <line
                    x1={pxB.x}
                    y1={pxB.y}
                    x2={pxB.x + (pxB.x - pxA.x) * 4}
                    y2={pxB.y + (pxB.y - pxA.y) * 4}
                    stroke="#FF7F50"
                    strokeWidth="3.5"
                    strokeDasharray="4,4"
                    strokeLinecap="round"
                  />
                  {/* Arrow indicating infinite extension */}
                  <polygon
                    points={`${pxB.x},${pxB.y} ${pxB.x - 12},${pxB.y - 4} ${pxB.x - 12},${pxB.y + 4}`}
                    fill="#FF7F50"
                    transform={`rotate(${Math.atan2(pxB.y - pxA.y, pxB.x - pxA.x) * (180 / Math.PI)}, ${pxB.x}, ${pxB.y})`}
                  />
                </>
              )}

              {/* 4. Infinite Rekha Line AB (Stretching endless on both sides) */}
              {activeTool === "line" && (
                <>
                  <line
                    x1={pxLine1.x}
                    y1={pxLine1.y}
                    x2={pxLine2.x}
                    y2={pxLine2.y}
                    stroke="#a78bfa"
                    strokeWidth="3.5"
                  />
                  {/* Arrows at both ends */}
                  <polygon
                    points={`${pxLine1.x},${pxLine1.y} ${pxLine1.x + 12},${pxLine1.y - 4} ${pxLine1.x + 12},${pxLine1.y + 4}`}
                    fill="#a78bfa"
                    transform={`rotate(${Math.atan2(pxLine2.y - pxLine1.y, pxLine2.x - pxLine1.x) * (180 / Math.PI)}, ${pxLine1.x}, ${pxLine1.y})`}
                  />
                  <polygon
                    points={`${pxLine2.x},${pxLine2.y} ${pxLine2.x - 12},${pxLine2.y - 4} ${pxLine2.x - 12},${pxLine2.y + 4}`}
                    fill="#a78bfa"
                    transform={`rotate(${Math.atan2(pxLine2.y - pxLine1.y, pxLine2.x - pxLine1.x) * (180 / Math.PI)}, ${pxLine2.x}, ${pxLine2.y})`}
                  />
                </>
              )}

              {/* 5. Stretch Triangle ABC (Connects A, B, and C with semi-transparent solid fill) */}
              {activeTool === "triangle" && (
                <polygon
                  points={`${pxA.x},${pxA.y} ${pxB.x},${pxB.y} ${pxC.x},${pxC.y}`}
                  fill="#10b981"
                  fillOpacity="0.2"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
              )}

              {/* 6. Stretch Rectangle/Quadrilateral ABCD */}
              {activeTool === "rectangle" && (
                <polygon
                  points={`${pxA.x},${pxA.y} ${pxB.x},${pxB.y} ${pxC.x},${pxC.y} ${pxD.x},${pxD.y}`}
                  fill="#EC4899"
                  fillOpacity="0.15"
                  stroke="#EC4899"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive draggable handles circles for each point */}
              {points.map((pt) => {
                // If active tool is not rectangle, hide Vertex D to keep simple shapes incredibly clean!
                if (pt.id === "D" && activeTool !== "rectangle") return null;

                const pxPt = toPixels(pt.x, pt.y);
                const isDragging = draggingId === pt.id;

                return (
                  <g
                    key={pt.id}
                    onMouseDown={(e) => handleStartDrag(pt.id, e)}
                    onTouchStart={(e) => handleStartDrag(pt.id, e)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    {/* Halo ring indicator when dragging */}
                    {isDragging && (
                      <circle
                        cx={pxPt.x}
                        cy={pxPt.y}
                        r="18"
                        fill={pt.color}
                        fillOpacity="0.3"
                        className="animate-ping"
                      />
                    )}
                    
                    {/* Main solid handle circle */}
                    <circle
                      cx={pxPt.x}
                      cy={pxPt.y}
                      r="9"
                      fill={pt.color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="shadow-md"
                    />

                    {/* Point Text Labels on Board */}
                    <text
                      x={pxPt.x}
                      y={pxPt.y - 14}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="black"
                      textAnchor="middle"
                      className="bg-black/80 px-1 rounded"
                    >
                      {pt.id}({pt.x}, {pt.y})
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-[9px] text-[#22c55e] px-2 py-0.5 rounded font-bold uppercase select-none pointer-events-none">
              ● Live chalkboard
            </div>
          </div>
          
          <div className="text-[10px] sm:text-xs text-zinc-500 mt-2 text-center flex items-center gap-1.5 font-bold uppercase">
            <Move className="h-3.5 w-3.5 text-zinc-400 rotate-45" /> Drag the coordinates (A, B, C, D) to stretch shapes!
          </div>

        </div>

        {/* Right column: Interactive controls and lessons dashboard */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          
          {/* Tool select buttons */}
          <div className="bg-[#FFFDF3] border-3 border-black p-3.5 rounded-xl text-xs flex flex-col gap-2.5">
            <span className="font-bold text-zinc-800 uppercase text-[10px] tracking-wider block">1. Select shape mode:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTool("point")}
                className={`p-2 rounded-lg font-black border-2 border-black flex items-center gap-1 cursor-pointer text-[11px] transition-all ${
                  activeTool === "point" ? "bg-[#FFC700] shadow-[2px_2px_0px_black]" : "bg-white hover:bg-neutral-50 shadow-none"
                }`}
              >
                📍 Bindu (Point)
              </button>
              <button
                onClick={() => setActiveTool("segment")}
                className={`p-2 rounded-lg font-black border-2 border-black flex items-center gap-1 cursor-pointer text-[11px] transition-all ${
                  activeTool === "segment" ? "bg-[#FFC700] shadow-[2px_2px_0px_black]" : "bg-white hover:bg-neutral-50 shadow-none"
                }`}
              >
                衡量 Segment AB
              </button>
              <button
                onClick={() => setActiveTool("ray")}
                className={`p-2 rounded-lg font-black border-2 border-black flex items-center gap-1 cursor-pointer text-[11px] transition-all ${
                  activeTool === "ray" ? "bg-[#FFC700] shadow-[2px_2px_0px_black]" : "bg-white hover:bg-neutral-50 shadow-none"
                }`}
              >
                🔦 Kiran (Ray)
              </button>
              <button
                onClick={() => setActiveTool("line")}
                className={`p-2 rounded-lg font-black border-2 border-black flex items-center gap-1 cursor-pointer text-[11px] transition-all ${
                  activeTool === "line" ? "bg-[#FFC700] shadow-[2px_2px_0px_black]" : "bg-white hover:bg-neutral-50 shadow-none"
                }`}
              >
                🛣️ Rekha (Line)
              </button>
            </div>
            
            <button
              onClick={() => setActiveTool("triangle")}
              className={`w-full p-2.5 rounded-lg font-black border-2 border-black flex items-center justify-center gap-1 cursor-pointer text-xs transition-all ${
                activeTool === "triangle" ? "bg-[#10B981] text-white shadow-[2px_2px_0px_black]" : "bg-white hover:bg-emerald-50 text-emerald-800 shadow-none"
              }`}
            >
              📐 Stretch Triangle ABC
            </button>

            <button
              onClick={() => setActiveTool("rectangle")}
              className={`w-full p-2.5 rounded-lg font-black border-2 border-black flex items-center justify-center gap-1 cursor-pointer text-xs transition-all ${
                activeTool === "rectangle" ? "bg-[#EC4899] text-white shadow-[2px_2px_0px_black]" : "bg-white hover:bg-pink-50 text-pink-800 shadow-none"
              }`}
            >
              📊 Stretch Rectangle ABCD
            </button>
          </div>

          {/* Real-time Math Analysis panel */}
          <div className="bg-neutral-50 border-3 border-black p-4 rounded-xl flex-grow flex flex-col gap-3 justify-center min-h-[160px]">
            <span className="font-bold text-zinc-800 uppercase text-[10px] tracking-wider block border-b border-black/10 pb-1.5">
              2. Structural Analysis:
            </span>

            {activeTool === "point" && (
              <div className="text-xs flex flex-col gap-1.5">
                <p>
                  You are tracking single <MicroConceptTooltip term="bindu">Bindu</MicroConceptTooltip> points!
                </p>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {points.slice(0, 3).map((pt) => (
                    <div key={pt.id} className="bg-white border border-black/15 p-1 rounded text-center">
                      <span className="font-bold block" style={{ color: pt.color }}>{pt.id}</span>
                      <span className="text-[10px] font-bold">({pt.x}, {pt.y})</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-300 p-2 rounded-lg text-[10px] mt-2 leading-relaxed">
                  📢 <strong>Did you know?</strong> An isolated Bindu point specifies exact position, but contains <strong>exactly 0 dimensions</strong>! No length, no height!
                </div>
              </div>
            )}

            {activeTool === "segment" && (
              <div className="text-xs flex flex-col gap-2">
                <p>
                  A <MicroConceptTooltip term="khand">Rekha-khand</MicroConceptTooltip> (Segment) connects Vertex A to B.
                </p>
                <div className="flex justify-between items-center bg-white border border-black/15 p-2 rounded-lg">
                  <span className="font-bold">Segment AB length</span>
                  <span className="bg-[#FFC700] px-2 py-0.5 rounded font-black border border-black text-[11px]">
                    {segABLength.toFixed(2)} units
                  </span>
                </div>
                <p className="text-[10px] text-zinc-600 leading-relaxed font-sans">
                  Unlike lines, a segment has <strong>exactly 2 fixed endpoints</strong> (A and B). Its length is finite and can be measured with a ruler!
                </p>
              </div>
            )}

            {activeTool === "ray" && (
              <div className="text-xs flex flex-col gap-2">
                <p>
                  Generating a laser <MicroConceptTooltip term="kiran">Kiran</MicroConceptTooltip> (Ray) originating at Vertex A!
                </p>
                <div className="bg-white border border-black/15 p-2 rounded-lg flex justify-between items-center text-[11px]">
                  <span>Origin / Starting point:</span>
                  <strong className="text-amber-600 font-sans font-black uppercase text-[10px]">Vertex A ({ptA.x}, {ptA.y})</strong>
                </div>
                <p className="text-[10px] text-zinc-600 leading-relaxed font-sans">
                  A ray extends <strong>endlessly</strong> in one direction (via B to infinity). It has <strong>exactly 1 starting origin endpoint</strong>!
                </p>
              </div>
            )}

            {activeTool === "line" && (
              <div className="text-xs flex flex-col gap-2">
                <p>
                  Tracing an endless <MicroConceptTooltip term="rekha">Rekha</MicroConceptTooltip> (Line) through A and B!
                </p>
                <div className="bg-white border border-black/15 p-2.5 rounded-lg flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                     <span>Slope coefficient:</span>
                    <strong className="font-mono">{dx !== 0 ? (dy / dx).toFixed(2) : "Infinite"}</strong>
                  </div>
                  <div className="flex justify-between text-[11px] font-sans border-t border-dashed border-black/10 pt-1 mt-0.5 font-bold">
                    <span>Endpoints:</span>
                    <strong className="font-sans font-black uppercase text-[10px] text-rose-600">Zero (↔ Endless)</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTool === "triangle" && (
              <div className="text-xs flex flex-col gap-2">
                <p>
                  Stretching three dynamic coordinates to form <strong className="text-emerald-700">Triangle ABC</strong>!
                </p>
                <div className="bg-white border border-black/15 p-2.5 rounded-lg flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Side c (A to B):</span>
                    <strong className="font-mono">{segABLength.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Side a (B to C):</span>
                    <strong className="font-mono">{segBCLength.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Side b (C to A):</span>
                    <strong className="font-mono">{segCALength.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-black/10 pt-1 mt-0.5 font-bold">
                    <span>Triangle area:</span>
                    <span className="text-emerald-700 font-sans font-black uppercase text-[10px]">{triangleArea.toFixed(1)} sq units</span>
                  </div>
                </div>
                {triangleArea === 0 && (
                  <div className="text-[9px] text-[#FF6B6B] font-black border border-[#FF6B6B]/25 p-1 rounded bg-rose-50 text-center animate-pulse uppercase">
                    ⚠ Warning: Area is 0. Points are collinear! Stretch out to form a real triangle!
                  </div>
                )}
              </div>
            )}

            {activeTool === "rectangle" && (
              <div className="text-xs flex flex-col gap-2">
                <p>
                  Stretching 4 coordinates to form <strong className="text-pink-600 font-bold">Quadrilateral ABCD</strong>!
                </p>
                <div className="bg-white border border-black/15 p-2.5 rounded-lg flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Side AB:</span>
                    <strong className="font-mono">{segABLength.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Side BC:</span>
                    <strong className="font-mono">{segBCLength.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Side CD:</span>
                    <strong className="font-mono">{sideCD.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Side DA:</span>
                    <strong className="font-mono">{sideDA.toFixed(1)} units</strong>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-black/10 pt-1 mt-0.5 font-bold">
                    <span>Detected Shape:</span>
                    <span className="bg-pink-100 border border-pink-400 text-pink-700 px-1.5 py-0.5 rounded text-[10px] font-black">
                      {classifyQuadrilateral()}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] font-sans text-zinc-500 leading-normal">
                  💡 <strong>Tip:</strong> Drag vertices to form a perfect <strong>Rectangle (Ayat)</strong> by making opposite sides equal and forming 90° corners!
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
