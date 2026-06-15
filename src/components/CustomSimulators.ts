import { Screen } from "../types";

export function generateInteractiveSrcDoc(screen: Screen, completedScreens: string[], difficulty: string) {
  const isCompleted = completedScreens.includes(screen.id);
  const heading = screen.conceptHeading || screen.title;
  const bodyText = screen.explanation || "";
  const bgAmberCol = "#FFFDF0";

  const subId = screen.subtopicId;
  const isGeometry = subId.startsWith("geom");
  const isMaxMin = subId.startsWith("maxmin");
  const isCompare = subId.startsWith("compare");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { box-sizing: border-box; }
        body {
          background-color: ${bgAmberCol};
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          padding: 8px;
          margin: 0;
          color: #1A202C;
          user-select: none;
        }
        .card {
          border: 4px solid black;
          box-shadow: 4px 4px 0px 0px black;
          background: #FFEAA7;
          border-radius: 12px;
          padding: 12px;
          max-width: 100%;
        }
        .title {
          font-size: 14px;
          font-weight: 800;
          margin: 0 0 5px 0;
          text-transform: uppercase;
          border-bottom: 3px double black;
          padding-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .explanation {
          font-size: 11px;
          line-height: 1.35;
          margin: 4px 0 10px 0;
          font-weight: 600;
        }
        .tabs-container {
          display: flex;
          margin-bottom: 8px;
        }
        .tab-btn {
          flex: 1;
          padding: 6px 4px;
          font-size: 9px;
          font-family: monospace;
          font-weight: 900;
          text-transform: uppercase;
          background: #103426;
          color: #22C55E;
          border: 2.5px solid black;
          border-radius: 6px;
        }
        .tool-window {
          display: block;
          border: 3px solid black;
          background: white;
          border-radius: 8px;
          padding: 10px;
          box-shadow: 3px 3px 0px 0px black;
          margin-bottom: 10px;
        }
        .tool-title {
          font-size: 9.5px;
          font-weight: 900;
          text-transform: uppercase;
          display: block;
          margin-bottom: 3px;
          color: #1A202C;
          border-left: 3px solid #10B981;
          padding-left: 4px;
        }
        .tool-desc {
          font-size: 8.5px;
          font-weight: 600;
          color: #4A5568;
          margin: 0 0 6px 0;
        }
        .btn-xs {
          padding: 3px 6px;
          font-size: 8.5px;
          font-family: monospace;
          font-weight: bold;
          border: 2px solid black;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-xs:active { transform: scale(0.95); }
        .gator-bubble {
          padding: 6px;
          background: white;
          border: 2px solid black;
          border-radius: 6px;
          width: 55px;
          text-align: center;
          font-family: monospace;
          font-size: 11px;
          font-weight: bold;
          box-shadow: 2px 2px 0px black;
        }
        .gator-feedback {
          font-size: 9px;
          font-weight: bold;
          color: #2D3748;
          background: #EDF2F7;
          padding: 6px;
          border-radius: 4px;
          border-left: 3px solid #3182CE;
          margin: 5px 0 0 0;
        }
        .bazaar-slip {
          background: #FFFDF0;
          border: 2px dashed black;
          border-radius: 6px;
          padding: 8px;
          font-family: monospace;
          font-size: 10px;
          color: #333;
        }
        /* Virtual yellow school ruler */
        .ruler {
          position: absolute;
          width: 180px;
          height: 32px;
          background: rgba(254, 240, 138, 0.85);
          border: 1.5px solid #CA8A04;
          border-radius: 4px;
          cursor: move;
          z-index: 10;
          box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
        }
        .ruler-ticks {
          width: 100%;
          height: 8px;
          border-bottom: 1px solid #854D0E;
          display: flex;
          justify-content: space-between;
          padding: 0 3px;
          font-family: monospace;
          font-size: 5px;
          color: #854D0E;
          align-items: flex-end;
        }
        .ruler-tick { height: 50%; width: 0.8px; background: #854D0E; }
        .ruler-label { text-align: center; font-size: 6.5px; font-family: monospace; font-weight: bold; color: #854D0E; margin-top: 2px; }
        
        #claim-btn {
          display: block;
          width: 100%;
          padding: 8px;
          background: #103426;
          color: #22C55E;
          font-weight: 900;
          text-transform: uppercase;
          border: 3px solid black;
          box-shadow: 2.5px 2.5px 0px 0px black;
          border-radius: 8px;
          cursor: pointer;
          font-family: monospace;
          font-size: 10px;
          transition: all 0.1s ease;
        }
        #claim-btn:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px black; }
        
        /* Interactive Abacus Styles */
        .abacus-bead {
          width: 100%;
          height: 9px;
          border-radius: 4px;
          border: 1.5px solid black;
          cursor: pointer;
          transition: background 0.15s;
        }
        
        /* Brick Sort game styles */
        .brick-btn {
          padding: 5px 8px;
          background: #FDBA74;
          border: 2px solid black;
          border-radius: 4px;
          box-shadow: 1.5px 1.5px 0px black;
          font-family: monospace;
          font-weight: bold;
          font-size: 10px;
          cursor: pointer;
        }
        .brick-btn:hover { background: #FB923C; }
      </style>
      <script>
        const subId = "${subId}";
        const targetValue = ${JSON.stringify(screen.targetValue !== undefined ? screen.targetValue : null)};
        const activeVariantIndex = ${screen.activeVariantIndex !== undefined ? screen.activeVariantIndex : -1};
        function claimXp() {
          window.parent.postMessage({ type: 'COMPLETE_SCREEN', screenId: "${screen.id}" }, '*');
          const btn = document.getElementById('claim-btn');
          btn.style.background = '#065F46';
          btn.style.color = '#10B981';
          btn.innerHTML = '✓ WORKSPACE EXERCISE COMPLETED! +5 XP COINS!';
          btn.disabled = true;
        }
        function activateSubmit() {
          const btn = document.getElementById('claim-btn');
          btn.style.borderColor = '#22C55E';
          btn.style.boxShadow = '3px 3px 0px #22C55E';
        }
      </script>
    </head>
    <body>
      <div class="card">
        <div class="title">
          <span>⚙️ GURU PRACTICE LAB</span>
          <span style="font-size: 7px; font-family: monospace; background: black; color: #FFEAA7; padding: 1px 4px; border-radius: 3px;">
            ACTIVE: ${heading}
          </span>
        </div>
        
        <p class="explanation">
          ${bodyText || 'Explore and interact with the customized tool below!'}
        </p>

        <!-- TABS CONTAINER (Customized strictly to show ONLY the unique active tool name!) -->
        <div class="tabs-container">
          ${(() => {
            if (subId === "geom_bindu") return `<button class="tab-btn">📍 Bindu Spotter Lab</button>`;
            if (subId === "geom_rekha") return `<button class="tab-btn">⟷ Line Projector</button>`;
            if (subId === "geom_khand") return `<button class="tab-btn">📏 Segment Binder</button>`;
            if (subId === "geom_kiran") return `<button class="tab-btn">🔦 Kiran Laser Show</button>`;
            if (subId === "geom_shikhar") return `<button class="tab-btn">📐 Shikhar Detector</button>`;
            if (subId === "maxmin_max") return `<button class="tab-btn">🏆 IPL Peak Finder</button>`;
            if (subId === "maxmin_min") return `<button class="tab-btn">❄️ Frost Freezer</button>`;
            if (subId === "maxmin_range") return `<button class="tab-btn">📊 Dynamic Spectrum</button>`;
            if (subId === "compare_basics") return `<button class="tab-btn">🐊 Crocodile Compare</button>`;
            if (subId === "compare_decimals") return `<button class="tab-btn">🔬 Micro-Decimal Lens</button>`;
            if (subId === "compare_rounding") return `<button class="tab-btn">🎯 Chowk Rounder</button>`;
            if (subId === "compare_place") return `<button class="tab-btn">🔱 rod peg Abacus</button>`;
            if (subId === "compare_order") return `<button class="tab-btn">🪜 Stair Step Sorter</button>`;
            return `<button class="tab-btn">🗒️ Scratchpad Slate</button>`;
          })()}
        </div>

        <!-- ==================== CUSTOM LAB WINDOWS ==================== -->

        <!-- 1. geom_bindu (Point coordinate finder) -->
        ${subId === "geom_bindu" ? `
          <div class="tool-window">
            <span class="tool-title">📍 BINDU PLOTTER GRID</span>
            <p class="tool-desc">Plot 3 points on the grid of Chawri Bazar to map street locations with uppercase coordinates!</p>
            <div style="position:relative; background:#103426; border:2.5px solid black; border-radius:6px; height:160px; overflow:hidden;">
              <canvas id="canvas-bindu" style="display:block; width:100%; height:100%; cursor:crosshair;"></canvas>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
              <span id="bindu-count" style="font-family:monospace; font-size:8.5px; font-weight:bold;">Coordinates Plotted: 0 / 3</span>
              <button class="btn-xs" style="background:#FEE2E2;" onclick="resetBindu()">Reset Board</button>
            </div>
            <p id="bindu-feedback" style="font-size:9px; font-weight:bold; color:#0D9488; margin: 4px 0 0 0;">Tap inside the chalkboard to plot bindu points!</p>
          </div>
        ` : ""}

        <!-- 2. geom_rekha (Endless Line projector) -->
        ${subId === "geom_rekha" ? `
          <div class="tool-window">
            <span class="tool-title">⟷ ENDLESS LINE (REKHA) PROJECTOR</span>
            <p class="tool-desc">Tap 2 separate spots to cast a line stretching endlessly to infinity in BOTH directions with double arrows!</p>
            <div style="position:relative; background:#103426; border:2.5px solid black; border-radius:6px; height:160px; overflow:hidden;">
              <canvas id="canvas-rekha" style="display:block; width:100%; height:100%; cursor:crosshair;"></canvas>
            </div>
            <p id="rekha-feedback" style="font-size:9px; font-weight:bold; color:#0D9488; margin: 4px 0 0 0;">Tap two coordinate places to project!</p>
          </div>
        ` : ""}

        <!-- 3. geom_khand (Line Segment binder with ruler) -->
        ${subId === "geom_khand" ? `
          <div class="tool-window">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tool-title">📏 REKHA-KHAND (SEGMENT) CUTTER</span>
              <label style="font-size:8px; font-weight:bold; display:flex; align-items:center; gap:2px;">
                <input type="checkbox" id="khand-show-ruler" onchange="toggleKhandRuler(this.checked)" /> Match with Ruler
              </label>
            </div>
            <p class="tool-desc">Place exactly 2 endpoints on the board to form a segment. Move the ruler to verify the length!</p>
            <div id="khand-canvas-wrap" style="position:relative; background:#103426; border:2.5px solid black; border-radius:6px; height:150px; overflow:hidden;">
              <canvas id="canvas-khand" style="display:block; width:100%; height:100%; cursor:crosshair;"></canvas>
              
              <!-- yellow ruler -->
              <div id="school-ruler" class="ruler" style="display:none; left:15px; top:35px;">
                <div class="ruler-ticks">
                  <span>0</span><div class="ruler-tick"></div><div class="ruler-tick"></div><span>5</span><div class="ruler-tick"></div><div class="ruler-tick"></div><span>10</span><div class="ruler-tick"></div><div class="ruler-tick"></div><span>15cm</span>
                </div>
                <div class="ruler-label">📐 MATHSGURU RULER</div>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:5px;">
              <span id="khand-stats" style="font-family:monospace; font-size:8.5px; font-weight:bold;">Segment: None</span>
              <button class="btn-xs" style="background:#FEE2E2;" onclick="resetKhand()">Erase Board</button>
            </div>
            <p id="khand-feedback" style="font-size:9px; font-weight:bold; color:#0D9488; margin: 4px 0 0 0;">Tap twice on board to bind the segment.</p>
          </div>
        ` : ""}

        <!-- 4. geom_kiran (Flashlight laser beam ray) -->
        ${subId === "geom_kiran" ? `
          <div class="tool-window">
            <span class="tool-title">🔦 KIRAN (RAY) LASER SHOT</span>
            <p class="tool-desc">Rays originate from a source endpoint and shoot infinitely in ONE direction. Click origin then drag to see the laser light!</p>
            <div style="position:relative; background:#103426; border:2.5px solid black; border-radius:6px; height:160px; overflow:hidden;">
              <canvas id="canvas-kiran" style="display:block; width:100%; height:100%; cursor:crosshair;"></canvas>
            </div>
            <p id="kiran-feedback" style="font-size:9px; font-weight:bold; color:#0D9488; margin: 4px 0 0 0;">Tap once for origin (Torch), tap again to aim ray beam!</p>
          </div>
        ` : ""}

        <!-- 5. geom_shikhar (Vertex Peak detector) -->
        ${subId === "geom_shikhar" ? `
          <div class="tool-window">
            <span class="tool-title">📐 SHIKHAR (VERTEX) CORNER GAUGE</span>
            <p class="tool-desc">A vertex (Shikhar) is the corner point where lines meet. Can you locate and click the exact spot where our arrows converge?</p>
            <div id="shikhar-container" style="position:relative; background:#103426; border:2.5px solid black; border-radius:6px; height:140px; overflow:hidden;">
              <canvas id="canvas-shikhar" style="display:block; width:100%; height:100%;"></canvas>
              <div id="glorious-star" style="display:none; position:absolute; width:16px; height:16px; background:#FBBF24; box-shadow: 0 0 12px #FFD700; border-radius:50%; border:2px solid white; transform:translate(-8px,-8px);"></div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
              <button class="btn-xs" style="background:#FFF;" onclick="deployMountainPeak()">Generate New Apex</button>
              <span id="shikhar-angle-label" style="font-family:monospace; font-size:8.5px; font-weight:bold;">Peak Apex: 55°</span>
            </div>
            <p id="shikhar-feedback" style="font-size:9px; font-weight:bold; color:#B45309; margin: 4px 0 0 0;">Find the intersection tip and tap it!</p>
          </div>
        ` : ""}

        <!-- 6. maxmin_max (IPL Scoreboard Max values) -->
        ${subId === "maxmin_max" ? `
          <div class="tool-window">
            <span class="tool-title">🏆 IPL LEADERBOARD (MAX VALUE)</span>
            <p class="tool-desc">Scores of the live cricket teams are displayed below. Adjust the scorebars or click directly on the batsman representing the MAXIMUM score!</p>
            <div style="display:flex; flex-direction:column; gap:5px;" id="ipl-board">
              <!-- Score items dynamically loaded -->
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:6px; align-items:center;">
              <button class="btn-xs" style="background:#FFF3C7;" onclick="resetIPLMatches()">Reset Match Runs</button>
              <span style="font-family:monospace; font-size:8.5px; font-weight:bold; background:black; color:#22C55E; padding:1.5px 5px; border-radius:3px;">MAX = Highest Peak</span>
            </div>
            <p id="ipl-feedback" style="font-size:9px; font-weight:bold; color:#0369A1; margin: 4px 0 0 0;">Click on the card that has the highest numbers to vouch!</p>
          </div>
        ` : ""}

        <!-- 7. maxmin_min (Cold Temp Fridge Freezer Locker Minimums) -->
        ${subId === "maxmin_min" ? `
          <div class="tool-window">
            <span class="tool-title">❄️ DEEP FREEZER SUB-ZERO LOCKER (MIN)</span>
            <p class="tool-desc">Frozen storage needs cold sub-zero conditions. Click on the vault locker holding the absolute MINIMUM (coldest) temperature value!</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6.5px;" id="freezer-grid">
              <!-- Vault cards -->
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:6px; align-items:center;">
              <button class="btn-xs" style="background:#E0F2FE;" onclick="resetFreezerThermos()">Re-configure Thermos</button>
              <span style="font-family:monospace; font-size:8.5px; font-weight:bold; background:black; color:#EF4444; padding:1.5px 5px; border-radius:3px;">MIN = Coldest (- Limit)</span>
            </div>
            <p id="freezer-feedback" style="font-size:9px; font-weight:bold; color:#9B1C1C; margin: 4px 0 0 0;">Select the box representing the lowest temperature.</p>
          </div>
        ` : ""}

        <!-- 8. maxmin_range (Dynamic Market range / Fasla calculator) -->
        ${subId === "maxmin_range" ? `
          <div class="tool-window">
            <span class="tool-title">📈 DELHI BAZAAR FASLA (RANGE) SPECTRUM</span>
            <p class="tool-desc">Input price listings separated by commas. Calculate the Fasla (Range = Max - Min) across product lines!</p>
            <div style="display:flex; gap:4px; margin-bottom:6px;">
              <input type="text" id="market-input" value="125, 650, 42, 890, 310" style="flex:1; padding:4px; font-size:10px; border:2px solid black; border-radius:4px; font-family:monospace; font-weight:bold;" />
              <button class="btn-xs" style="background:black; color:white;" onclick="computeSpectrumRange()">Solve Fasla</button>
            </div>
            <div style="display:flex; gap:4.5px; flex-wrap:wrap; margin-bottom:5px;" id="market-capsules"></div>
            <div style="background:#FFFDF0; border:1.8px solid black; border-radius:6px; padding:6px; font-family:monospace; font-size:10px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <span>📈 UPPER PEAK MAX:</span> <b id="spec-max" style="color:#047857;">Rs 890</b>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <span>📉 FLOOR BASE MIN:</span> <b id="spec-min" style="color:#B91C1C;">Rs 42</b>
              </div>
              <div style="border-top:1px dashed black; margin-top:3px; padding-top:4px; font-weight:bold; color:#B45309; display:flex; justify-content:space-between;">
                <span>📏 FASLA (RANGE) = MAX - MIN:</span> <span id="spec-output">Rs 848</span>
              </div>
            </div>
          </div>
        ` : ""}

        <!-- 9. compare_basics (Alligator chomper) -->
        ${subId === "compare_basics" ? `
          <div class="tool-window">
            <span class="tool-title">🐊 GATOR MOUTH PLOT COMPARE</span>
            <p class="tool-desc">Alligator hamesha bade number ko khayega. Set the coordinate dials (positives vs negatives) to test!</p>
            <div style="display:flex; align-items:center; justify-content:center; gap:10px; padding:12px; background:#F8FAFC; border:2px dashed black; border-radius:6px;">
              <div class="gator-bubble" id="basics-n1">18</div>
              <div id="basics-gator-icon" style="font-size:24px; font-weight:bold;">🐊</div>
              <div class="gator-bubble" id="basics-n2">-15</div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:6px;">
              <div>
                <label style="font-size:7.5px; font-weight:bold; display:block;">NUMBER A (Slider):</label>
                <input type="range" id="basics-s1" min="-30" max="30" value="18" style="width:100%;" oninput="reckonBasicsGator()" />
              </div>
              <div>
                <label style="font-size:7.5px; font-weight:bold; display:block;">NUMBER B (Slider):</label>
                <input type="range" id="basics-s2" min="-30" max="30" value="-15" style="width:100%;" oninput="reckonBasicsGator()" />
              </div>
            </div>
            <p id="basics-feedback-status" class="gator-feedback"></p>
          </div>
        ` : ""}

        <!-- 10. compare_decimals (Microscope side-by-side fraction grid shader) -->
        ${subId === "compare_decimals" ? `
          <div class="tool-window">
            <span class="tool-title">🔬 MICRO-DECIMAL GRID LENS</span>
            <p class="tool-desc">Compare decimal parts. Canvas shows 0.5 as fifty blocks (50/100) whereas 0.05 represents only 5 blocks (5/100) out of 100 total!</p>
            <div style="display:flex; gap:10px; justify-content:center; background:white; border:2px solid black; padding:8px; border-radius:6px;">
              <div style="text-align:center;">
                <b style="font-size:10px; display:block; color:#2563EB;">GRID A (0.50)</b>
                <canvas id="canvas-grid-a" style="border:1px solid black; width:80px; height:80px; display:block; margin:2px auto;"></canvas>
                <span style="font-size:8px; font-weight:bold; color:#2563EB;">50/100 shaded</span>
              </div>
              <div style="text-align:center;">
                <b style="font-size:10px; display:block; color:#EA580C;">GRID B (0.05)</b>
                <canvas id="canvas-grid-b" style="border:1px solid black; width:80px; height:80px; display:block; margin:2px auto;"></canvas>
                <span style="font-size:8px; font-weight:bold; color:#EA580C;">5/100 shaded</span>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
              <span style="font-family:monospace; font-size:8px; color:gray;">Microscope Zoom visualizer</span>
              <button class="btn-xs" style="background:#EFF6FF;" onclick="executeDecimalsGrid()">Redraw Lens</button>
            </div>
            <div id="decimals-explanation-card" style="font-size:8.5px; font-weight:bold; color:#1A202C; background:#F1F5F9; border-radius:4px; padding:6px; margin-top:5px; border-left:3.5px solid #22C55E;">
              ✓ Verified! 0.5 (50 paise) is ten times larger than 0.05 (5 paise). Grid block sizes make it physically clear!
            </div>
          </div>
        ` : ""}

        <!-- 11. compare_rounding (Chowk invoice rounder) -->
        ${subId === "compare_rounding" ? `
          <div class="tool-window">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tool-title">🎯 CHANDNI CHOWK INVOICE ROUNDER</span>
              <button class="btn-xs" style="background:#EBF8FF;" onclick="rollOverNewBill()">Generate Bill</button>
            </div>
            <p class="tool-desc">If decimal is 50 paise or larger, round UP to the next Rupee. If less, round down. Vouch the bill!</p>
            <div class="bazaar-slip" style="margin-bottom:6px;">
              <div style="text-align:center; font-weight:bold; border-bottom:1px dashed black; padding-bottom:3.5px; margin-bottom:5px;">
                🏪 DELHI CHOWK WHOLESALE GROCERS
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <span id="slip-item-name">Saffron (Kesar) Pack</span> <span id="slip-item-price">Rs 145.80</span>
              </div>
              <div style="border-top:1px dashed black; margin-top:4px; padding-top:4px; font-weight:black; display:flex; justify-content:space-between;">
                <span>GRAND TOTAL:</span> <span id="slip-grand-total">Rs 145.80</span>
              </div>
            </div>
            <div style="display:flex; gap:4px; align-items:center;">
              <span style="font-size:8px; font-weight:bold; white-space:nowrap;">MY OFFER (Rs):</span>
              <input type="number" id="rounded-bill-input" placeholder="e.g. 146" style="flex:1; padding:3px; font-size:10px; border:2px solid black; border-radius:4px;" />
              <button class="btn-xs" style="background:#10B981; color:white;" onclick="confirmBillRound()">Vouch</button>
            </div>
            <p id="round-bill-feedback" style="font-size:9px; font-weight:bold; color:#B45309; margin-top:5px; margin-bottom:0;"></p>
          </div>
        ` : ""}

        <!-- 12. compare_place (Thousands Hundreds Tens Ones Abacus Peg board) -->
        ${subId === "compare_place" ? `
          <div class="tool-window">
            <span class="tool-title">🔱 PLACE VALUE ABACUS PEG BOARD</span>
            <p class="tool-desc">Enter values under each placeholder dial. Colorful beads list automatically on Thousands, Hundreds, Tens, and Ones rods!</p>
            <div style="display:flex; justify-content:space-around; align-items:flex-end; background:#F8FAFC; border:2px solid black; border-radius:8px; height:100px; padding:10px 5px; position:relative; overflow:hidden;">
              <div style="display:flex; flex-direction:column-reverse; align-items:center; height:75px; width:18%; position:relative;">
                <div style="width:2px; height:100%; background:brown; position:absolute; left:50%; margin-left:-1px; z-index:1;"></div>
                <div id="abacus-th" style="display:flex; flex-direction:column-reverse; gap:1.5px; width:100%; z-index:2; align-items:center;"></div>
                <b style="font-size:6.5px; z-index:3; background:yellow; padding:1px; margin-bottom:-4px;">TH (1k)</b>
              </div>
              <div style="display:flex; flex-direction:column-reverse; align-items:center; height:75px; width:18%; position:relative;">
                <div style="width:2px; height:100%; background:brown; position:absolute; left:50%; margin-left:-1px; z-index:1;"></div>
                <div id="abacus-h" style="display:flex; flex-direction:column-reverse; gap:1.5px; width:100%; z-index:2; align-items:center;"></div>
                <b style="font-size:6.5px; z-index:3; background:yellow; padding:1px; margin-bottom:-4px;">H (100)</b>
              </div>
              <div style="display:flex; flex-direction:column-reverse; align-items:center; height:75px; width:18%; position:relative;">
                <div style="width:2px; height:100%; background:brown; position:absolute; left:50%; margin-left:-1px; z-index:1;"></div>
                <div id="abacus-t" style="display:flex; flex-direction:column-reverse; gap:1.5px; width:100%; z-index:2; align-items:center;"></div>
                <b style="font-size:6.5px; z-index:3; background:yellow; padding:1px; margin-bottom:-4px;">T (10)</b>
              </div>
              <div style="display:flex; flex-direction:column-reverse; align-items:center; height:75px; width:18%; position:relative;">
                <div style="width:2px; height:100%; background:brown; position:absolute; left:50%; margin-left:-1px; z-index:1;"></div>
                <div id="abacus-o" style="display:flex; flex-direction:column-reverse; gap:1.5px; width:100%; z-index:2; align-items:center;"></div>
                <b style="font-size:6.5px; z-index:3; background:yellow; padding:1px; margin-bottom:-4px;">O (1)</b>
              </div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:5px; margin-top:6px;">
              <input type="number" id="ab-val-th" min="0" max="9" value="4" style="font-size:9x; text-align:center; border:1px solid black;" oninput="drawAbacus()" />
              <input type="number" id="ab-val-h" min="0" max="9" value="2" style="font-size:9px; text-align:center; border:1px solid black;" oninput="drawAbacus()" />
              <input type="number" id="ab-val-t" min="0" max="9" value="8" style="font-size:9px; text-align:center; border:1px solid black;" oninput="drawAbacus()" />
              <input type="number" id="ab-val-o" min="0" max="9" value="5" style="font-size:9px; text-align:center; border:1px solid black;" oninput="drawAbacus()" />
            </div>
            <p id="abacus-sum-label" style="font-size:9px; font-family:monospace; font-weight:bold; color:#1D4ED8; text-align:center; margin: 4px 0 0 0;"></p>
          </div>
        ` : ""}

        <!-- 13. compare_order (Stair step sorting ladder) -->
        ${subId === "compare_order" ? `
          <div class="tool-window">
            <span class="tool-title">🪜 STAIR STEP LADDER SORT</span>
            <p class="tool-desc">Click the floating bricks in ascending order (Aarohi Kram: smallest to largest) to assemble a stable walking bridge!</p>
            <div style="display:flex; justify-content:center; gap:8px; height:45px; align-items:center;" id="stair-floating-row">
              <!-- Unsorted bricks loaded here -->
            </div>
            <div style="background:#FFFCE8; border:1.8px dashed #D97706; padding:6px; border-radius:5px; min-height:40px;">
              <span style="font-size:7px; font-weight:bold; color:#92400E; display:block; text-transform:uppercase;">Walkway Bridge Construction:</span>
              <div style="display:flex; gap:8px; justify-content:center;" id="stair-bridge-row"></div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
              <button class="btn-xs" style="background:white;" onclick="setupStairGame()">Reset Game</button>
              <span id="stair-status-feed" style="font-size:9px; font-weight:bold; color:#B45309;">Ready! click from smallest up.</span>
            </div>
          </div>
        ` : ""}

        <!-- 14. Fallback Practice Scratchpad canvas -->
        ${(subId.includes("practice") || subId.includes("_skills") || subId.includes("_panga") || subId.includes("_kahani") || subId.includes("_mastery")) ? `
          <div class="tool-window">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span class="tool-title">🗒️ SCRATCHPAD MEMO STUDY SLATE</span>
              <label style="font-size:8px; font-weight:bold; display:flex; align-items:center; gap:2.5px;">
                <input type="checkbox" id="scrat-show-ruler" onchange="toggleScratchRuler(this.checked)" /> Show Scale Ruler
              </label>
            </div>
            <div id="scrat-canvas-wrap" style="position:relative; background:#103426; border:2.5px solid black; border-radius:6px; height:150px; overflow:hidden;">
              <canvas id="scratchpad-canvas" style="display:block; width:100%; height:100%; cursor:crosshair;"></canvas>
              
              <!-- Yellow scale ruler overlay -->
              <div id="scratch-ruler" class="ruler" style="display:none; left:20px; top:40px;">
                <div class="ruler-ticks">
                  <span>0</span><div class="ruler-tick"></div><div class="ruler-tick"></div><span>5</span><div class="ruler-tick"></div><div class="ruler-tick"></div><span>10</span><div class="ruler-tick"></div><div class="ruler-tick"></div><span>15cm</span>
                </div>
                <div class="ruler-label">📐 MATHSGURU SCALE</div>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
              <button class="btn-xs" style="background:#FEE2E2; color:#991B1B;" onclick="clearScratch()">Erase Slate</button>
              <span style="font-size:8px; font-style:italic; color:gray;">Freehand study board active</span>
            </div>
          </div>
        ` : ""}

        <!-- Master completion button -->
        <button id="claim-btn" onclick="claimXp()">
          🎉 COMPLETE SUB-ACTIVITY & CLAIM +5 XP COINS
        </button>

        <div style="margin-top: 8px; font-size: 8px; text-align: center; color: #4A5568; font-family: monospace; font-weight: bold;">
          Vivid Live MathsGuru Simulator • Multi-Mode Interactive Desk • Level: ${difficulty.toUpperCase()}
        </div>
      </div>

      <script>
        // Universal scale ruler dragging controls
        document.addEventListener('DOMContentLoaded', () => {
          setupRulerDrags();
        });

        function setupRulerDrags() {
          const rulers = document.querySelectorAll('.ruler');
          rulers.forEach(r => {
            let dragging = false;
            let offset={x:0, y:0};
            r.addEventListener('mousedown', (e) => {
              dragging = true;
              offset.x = e.clientX - r.offsetLeft;
              offset.y = e.clientY - r.offsetTop;
              r.style.cursor = 'grabbing';
            });
            r.addEventListener('touchstart', (e) => {
              if (e.touches[0]) {
                dragging = true;
                offset.x = e.touches[0].clientX - r.offsetLeft;
                offset.y = e.touches[0].clientY - r.offsetTop;
              }
            });
            document.addEventListener('mousemove', (e) => {
              if (!dragging) return;
              r.style.left = (e.clientX - offset.x) + 'px';
              r.style.top = (e.clientY - offset.y) + 'px';
            });
            document.addEventListener('touchmove', (e) => {
              if (!dragging || !e.touches[0]) return;
              r.style.left = (e.touches[0].clientX - offset.x) + 'px';
              r.style.top = (e.touches[0].clientY - offset.y) + 'px';
            });
            document.addEventListener('mouseup', () => { dragging = false; r.style.cursor='move'; });
            document.addEventListener('touchend', () => { dragging = false; });
          });
        }

        // ==================== CODE SCRIPTS FOR INDIVIDUAL SIMULATORS ====================

        /* 1. geom_bindu Script */
        if (document.getElementById('canvas-bindu')) {
          const cv = document.getElementById('canvas-bindu');
          const cx = cv.getContext('2d');
          let bindus = [];
          
          let targetPoint = (targetValue && typeof targetValue === 'object' && targetValue.x !== undefined) ? targetValue : null;

          function drawGrid() {
            cx.clearRect(0,0, cv.width, cv.height);
            cx.strokeStyle = 'rgba(255,255,255,0.06)';
            cx.lineWidth = 1;
            for(let i=15; i<cv.width; i+=15) {
              cx.beginPath(); cx.moveTo(i,0); cx.lineTo(i,cv.height); cx.stroke();
            }
            for(let j=15; j<cv.height; j+=15) {
              cx.beginPath(); cx.moveTo(0,j); cx.lineTo(cv.width,j); cx.stroke();
            }
            // Draw axes
            cx.strokeStyle = 'rgba(255,255,255,0.25)';
            cx.beginPath(); cx.moveTo(cv.width/2, 0); cx.lineTo(cv.width/2, cv.height); cx.stroke();
            cx.beginPath(); cx.moveTo(0, cv.height/2); cx.lineTo(cv.width, cv.height/2); cx.stroke();
            
            // Draw target spot if active
            if (targetPoint) {
              const targetXPixel = cv.width/2 + targetPoint.x * 15;
              const targetYPixel = cv.height/2 - targetPoint.y * 15;
              cx.strokeStyle = '#FBBF24'; cx.lineWidth = 1.5;
              cx.beginPath(); cx.arc(targetXPixel, targetYPixel, 10, 0, Math.PI*2); cx.stroke();
              cx.fillStyle = 'rgba(251, 191, 36, 0.18)'; cx.fill();
              cx.fillStyle = '#FBBF24'; cx.font = 'bold 8px monospace';
              cx.fillText('TARGET', targetXPixel - 15, targetYPixel - 13);
            }

            // Draw points
            bindus.forEach(b => {
              cx.fillStyle = '#EF4444';
              cx.beginPath(); cx.arc(b.x, b.y, 5, 0, Math.PI*2); cx.fill();
              cx.strokeStyle = 'white'; cx.lineWidth = 1.2; cx.stroke();
              cx.fillStyle = 'white'; cx.font = 'bold 8.5px monospace';
              cx.fillText(b.label + ' (' + b.coordX + ',' + b.coordY + ')', b.x+7, b.y+3);
            });
          }

          function plot(e) {
            const rect = cv.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            const cxVal = Math.round((x - cv.width/2)/15);
            const cyVal = Math.round((cv.height/2 - y)/15);
            
            const label = String.fromCharCode(65 + bindus.length);
            bindus.push({x, y, label, coordX: cxVal, coordY: cyVal});
            drawGrid();
            
            const feed = document.getElementById('bindu-feedback');
            const cnt = document.getElementById('bindu-count');
            
            if (targetPoint) {
              cnt.innerText = 'Coordinates Plotted: ' + bindus.length;
              const matched = (Math.abs(cxVal - targetPoint.x) <= 1) && (Math.abs(cyVal - targetPoint.y) <= 1);
              if (matched) {
                feed.innerHTML = '✓ Perfect! You spotted the Bindu precisely at (' + cxVal + ', ' + cyVal + ') matching the target (' + targetPoint.x + ', ' + targetPoint.y + ')! Tap Claim to earn +5 XP.';
                feed.style.color = '#22C55E';
                activateSubmit();
              } else {
                feed.innerText = '✘ Plotted at (' + cxVal + ', ' + cyVal + '), but target is (' + targetPoint.x + ', ' + targetPoint.y + '). Tap closer to the yellow crosshairs!';
                feed.style.color = '#F59E0B';
              }
            } else {
              cnt.innerText = 'Coordinates Plotted: ' + bindus.length + ' / 3';
              if (bindus.length === 3) {
                feed.innerText = '✓ Success! Plotted 3 street points (A, B, C) in Chawri Bazar! Tap Claim to claim your XP.';
                feed.style.color = '#22C55E';
                activateSubmit();
              } else {
                feed.innerText = '✓ Plotted Bindu ' + label + ' at coordinates (' + cxVal + ', ' + cyVal + '). Now plot ' + (3 - bindus.length) + ' more!';
              }
            }
          }

          cv.addEventListener('mousedown', plot);
          cv.addEventListener('touchstart', plot);
          
          window.addEventListener('load', () => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawGrid();
          });
          setTimeout(() => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawGrid();
          }, 200);

          function resetBindu() {
            bindus = [];
            document.getElementById('bindu-count').innerText = targetPoint ? 'Coordinates Plotted: 0' : 'Coordinates Plotted: 0 / 3';
            document.getElementById('bindu-feedback').innerText = targetPoint ? 'Tap directly over the yellow crosshair targeting (' + targetPoint.x + ',' + targetPoint.y + ')!' : 'Grid cleared. Tap anywhere inside chalkboard!';
            document.getElementById('bindu-feedback').style.color = '#0D9488';
            drawGrid();
          }
        }

        /* 2. geom_rekha Script */
        if (document.getElementById('canvas-rekha')) {
          const cv = document.getElementById('canvas-rekha');
          const cx = cv.getContext('2d');
          let points = [];
          
          let targetShift = (targetValue && typeof targetValue === 'object' && targetValue.shift !== undefined) ? targetValue.shift : null;

          function drawEndlessRekha() {
            cx.clearRect(0,0, cv.width, cv.height);
            // Grid background
            cx.strokeStyle = 'rgba(255,255,255,0.06)';
            cx.lineWidth = 1;
            for(let i=15; i<cv.width; i+=15){
              cx.beginPath(); cx.moveTo(i,0); cx.lineTo(i,cv.height); cx.stroke();
            }
            for(let j=15; j<cv.height; j+=15){
              cx.beginPath(); cx.moveTo(0,j); cx.lineTo(cv.width,j); cx.stroke();
            }

            // Draw axis line to represent the parallel track anchor y=0
            cx.strokeStyle = 'rgba(255,255,255,0.2)';
            cx.lineWidth = 1;
            cx.beginPath(); cx.moveTo(0, cv.height/2); cx.lineTo(cv.width, cv.height/2); cx.stroke();

            // Draw orange dashed target path if active
            if (targetShift !== null) {
              const targetYPixel = cv.height/2 - targetShift * 15;
              cx.strokeStyle = '#F59E0B';
              cx.lineWidth = 1.5;
              cx.setLineDash([5, 5]);
              cx.beginPath(); cx.moveTo(0, targetYPixel); cx.lineTo(cv.width, targetYPixel); cx.stroke();
              cx.setLineDash([]);
              cx.fillStyle = '#F59E0B'; cx.font = 'bold 8px monospace';
              cx.fillText('TARGET ALIGNMENT PATH (y = ' + targetShift + ')', 10, targetYPixel - 5);
            }

            points.forEach((p, idx) => {
              cx.fillStyle = idx===0 ? '#FFC700' : '#22D3EE';
              cx.beginPath(); cx.arc(p.x, p.y, 4.5, 0, Math.PI*2); cx.fill();
              cx.fillStyle = 'white'; cx.font = '7px monospace';
              cx.fillText('Point ' + (idx+1), p.x+6, p.y+3);
            });

            if (points.length === 2) {
              const p1 = points[0];
              const p2 = points[1];
              const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
              
              // Infinite extension bounds
              const startX = p1.x - 1000 * Math.cos(angle);
              const startY = p1.y - 1000 * Math.sin(angle);
              const endX = p2.x + 1000 * Math.cos(angle);
              const endY = p2.y + 1000 * Math.sin(angle);

              // Draw infinite line
              cx.strokeStyle = '#22D3EE';
              cx.lineWidth = 3.2;
              cx.beginPath();
              cx.moveTo(startX, startY);
              cx.lineTo(endX, endY);
              cx.stroke();

              // Draw infinite arrows representation at the margins of canvas
              drawArrowHead(p2.x + 80*Math.cos(angle), p2.y + 80*Math.sin(angle), angle);
              drawArrowHead(p1.x - 80*Math.cos(angle), p1.y - 80*Math.sin(angle), angle + Math.PI);
            }
          }

          function drawArrowHead(x,y,ang) {
            cx.fillStyle = '#FFC700';
            cx.beginPath();
            cx.moveTo(x,y);
            cx.lineTo(x - 9*Math.cos(ang-0.5), y - 9*Math.sin(ang-0.5));
            cx.lineTo(x - 9*Math.cos(ang+0.5), y - 9*Math.sin(ang+0.5));
            cx.closePath(); cx.fill();
          }

          function tapRekha(e) {
            const rect = cv.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            if (points.length >= 2) points = []; // click again reset
            points.push({x,y});
            drawEndlessRekha();

            const feed = document.getElementById('rekha-feedback');
            if (points.length === 1) {
              feed.innerText = 'Lock point 1. Now select second coordinate to cast lasers!';
            } else {
              if (targetShift !== null) {
                const yVal1 = Math.round((cv.height/2 - points[0].y)/15);
                const yVal2 = Math.round((cv.height/2 - points[1].y)/15);
                const isCorrect = (Math.abs(yVal1 - targetShift) <= 1) && (Math.abs(yVal2 - targetShift) <= 1);
                
                if (isCorrect) {
                  feed.innerHTML = '✓ Perfect alignment! Your infinite Rekha matches target track y = ' + targetShift + '! Success!';
                  feed.style.color = '#22C55E';
                  activateSubmit();
                } else {
                  feed.innerHTML = '✘ Almost! Your dots fall at y = ' + yVal1 + ', but the target tracks at y = ' + targetShift + '. Try drawing closer to the dashed lines!';
                  feed.style.color = '#F59E0B';
                  points = []; // reset for another try
                }
              } else {
                feed.innerHTML = '✓ Projected! Rekha stretches infinitely on BOTH directions with <b>dual arrowheads (⟷)</b>. Claim XP!';
                feed.style.color = '#22C55E';
                activateSubmit();
              }
            }
          }

          cv.addEventListener('mousedown', tapRekha);
          cv.addEventListener('touchstart', tapRekha);
          
          window.addEventListener('load', () => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawEndlessRekha();
          });
          setTimeout(() => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawEndlessRekha();
          }, 200);
        }

        /* 3. geom_khand Script */
        let isKhandRulerVisible = false;
        function toggleKhandRuler(checked) {
          document.getElementById('school-ruler').style.display = checked ? 'block' : 'none';
        }

        if (document.getElementById('canvas-khand')) {
          const cv = document.getElementById('canvas-khand');
          const cx = cv.getContext('2d');
          let pts = [];
          
          let lenGoal = (targetValue && typeof targetValue === 'number') ? targetValue : null;

          function drawKhand() {
            cx.clearRect(0,0, cv.width, cv.height);
            // grid
            cx.strokeStyle = 'rgba(255,255,255,0.06)';
            cx.lineWidth = 1;
            for(let i=15; i<cv.width; i+=15){
              cx.beginPath(); cx.moveTo(i,0); cx.lineTo(i,cv.height); cx.stroke();
            }
            for(let j=15; j<cv.height; j+=15){
              cx.beginPath(); cx.moveTo(0,j); cx.lineTo(cv.width,j); cx.stroke();
            }

            if (pts.length >= 1) {
              cx.fillStyle = '#EF4444';
              cx.beginPath(); cx.arc(pts[0].x, pts[0].y, 5, 0, Math.PI*2); cx.fill();
            }
            if (pts.length === 2) {
              cx.fillStyle = '#EF4444';
              cx.beginPath(); cx.arc(pts[1].x, pts[1].y, 5, 0, Math.PI*2); cx.fill();

              cx.strokeStyle = '#F43F5E';
              cx.lineWidth = 3.5;
              cx.beginPath(); cx.moveTo(pts[0].x, pts[0].y); cx.lineTo(pts[1].x, pts[1].y); cx.stroke();

              const distPx = Math.round(Math.sqrt((pts[1].x-pts[0].x)**2 + (pts[1].y-pts[0].y)**2));
              const distCm = parseFloat((distPx / 15).toFixed(1)); // 15 pixels/cm representation
              
              const midX = (pts[0].x + pts[1].x)/2;
              const midY = (pts[0].y + pts[1].y)/2;
              cx.fillStyle = '#FBBF24';
              cx.font = 'bold 9.5px monospace';
              cx.fillText(distCm + ' cm', midX, midY - 6);

              document.getElementById('khand-stats').innerText = 'Current: ' + distCm + ' cm segment';
              const feed = document.getElementById('khand-feedback');
              
              if (lenGoal) {
                const error = Math.abs(distCm - lenGoal);
                if (error <= 0.6) {
                  feed.innerHTML = '✓ Sahi segment! Cut exactly: <b>' + distCm + ' cm</b> matching the goal of ' + lenGoal + ' cm. Claim XP!';
                  feed.style.color = '#22C55E';
                  activateSubmit();
                } else {
                  feed.innerHTML = '✘ Almost! Your segment is <b>' + distCm + ' cm</b>. Adjust points until it measures near <b>' + lenGoal + ' cm</b>!';
                  feed.style.color = '#F59E0B';
                }
              } else {
                feed.innerHTML = '✓ Segment bound! Cut exact: <b>' + distCm + ' cm</b> with 2 absolute endpoints. Grab ruler to verify scale!';
                feed.style.color = '#22C55E';
                activateSubmit();
              }
            }
          }

          function tapKhand(e) {
            const rect = cv.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            if (pts.length >= 2) pts = [];
            pts.push({x,y});
            drawKhand();
          }

          cv.addEventListener('mousedown', tapKhand);
          cv.addEventListener('touchstart', tapKhand);
          
          window.addEventListener('load', () => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawKhand();
          });
          setTimeout(() => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawKhand();
          }, 200);

          function resetKhand() {
            pts = [];
            document.getElementById('khand-stats').innerText = 'Segment: None';
            document.getElementById('khand-feedback').innerText = lenGoal ? 'Erase complete. Draw a segment of exactly ' + lenGoal + ' cm!' : 'Erase complete. Draw segment!';
            document.getElementById('khand-feedback').style.color = '#0D9488';
            drawKhand();
          }
          window.resetKhand = resetKhand;
        }

        /* 4. geom_kiran Script */
        if (document.getElementById('canvas-kiran')) {
          const cv = document.getElementById('canvas-kiran');
          const cx = cv.getContext('2d');
          let step = 0;
          let origin = null;
          let tip = null;
          
          let targetAngle = (targetValue && typeof targetValue === 'object' && targetValue.angle !== undefined) ? targetValue.angle : null;

          function drawKiran() {
            cx.clearRect(0,0, cv.width, cv.height);
            // grid
            cx.strokeStyle = 'rgba(255,255,255,0.06)';
            cx.lineWidth = 1;
            for(let i=15; i<cv.width; i+=15){
              cx.beginPath(); cx.moveTo(i,0); cx.lineTo(i,cv.height); cx.stroke();
            }
            for(let j=15; j<cv.height; j+=15){
              cx.beginPath(); cx.moveTo(0,j); cx.lineTo(cv.width,j); cx.stroke();
            }

            // Draw target path dashed line if targetAngle is active
            if (targetAngle !== null && origin) {
              const rad = targetAngle * Math.PI / 180;
              const targetTipX = origin.x + 200 * Math.cos(-rad); // Inverted Y in canvas
              const targetTipY = origin.y + 200 * Math.sin(-rad);
              cx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
              cx.lineWidth = 1.2;
              cx.setLineDash([4, 4]);
              cx.beginPath(); cx.moveTo(origin.x, origin.y); cx.lineTo(targetTipX, targetTipY); cx.stroke();
              cx.setLineDash([]);
              cx.fillStyle = 'rgba(245, 158, 11, 0.8)'; cx.font = '7px monospace';
              cx.fillText('TARGET PATH (' + targetAngle + '°)', targetTipX + 6, targetTipY);
            }

            if (origin) {
              cx.fillStyle = 'white';
              cx.beginPath(); cx.arc(origin.x, origin.y, 6, 0, Math.PI*2); cx.fill();
              cx.strokeStyle = '#EEF2F6'; cx.stroke();
              cx.fillStyle = 'yellow'; cx.font = 'bold 8.5px monospace';
              cx.fillText('Origin (Source)', origin.x+8, origin.y-4);
            }

            if (origin && tip) {
              const angle = Math.atan2(tip.y - origin.y, tip.x - origin.x);
              const laserX = origin.x + 800 * Math.cos(angle);
              const laserY = origin.y + 800 * Math.sin(angle);

              cx.strokeStyle = '#FFC700'; cx.lineWidth = 3.5;
              cx.beginPath(); cx.moveTo(origin.x, origin.y); cx.lineTo(laserX, laserY); cx.stroke();

              // single arrowhead at end
              const arrX = origin.x + 110*Math.cos(angle);
              const arrY = origin.y + 110*Math.sin(angle);
              cx.fillStyle = '#EF4444';
              cx.beginPath();
              cx.moveTo(arrX, arrY);
              cx.lineTo(arrX - 11*Math.cos(angle-0.45), arrY - 11*Math.sin(angle-0.45));
              cx.lineTo(arrX - 11*Math.cos(angle+0.45), arrY - 11*Math.sin(angle+0.45));
              cx.closePath(); cx.fill();
            }
          }

          function tapKiran(e) {
            const rect = cv.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            if (step === 0) {
              origin = {x, y};
              tip = null;
              step = 1;
              document.getElementById('kiran-feedback').innerText = 'Torch locked! Tap somewhere in space to direct the beam!';
            } else {
              tip = {x, y};
              step = 0;
              
              // Standard mathematics angle in degrees (inverted Y)
              const angleRad = Math.atan2(origin.y - tip.y, tip.x - origin.x);
              let angleDeg = Math.round(angleRad * 180 / Math.PI);
              if (angleDeg < 0) angleDeg += 360;

              const feed = document.getElementById('kiran-feedback');
              if (targetAngle !== null) {
                const diff = Math.abs(angleDeg - targetAngle);
                const isCorrect = (diff <= 12) || (Math.abs(angleDeg - targetAngle - 360) <= 12) || (Math.abs(angleDeg - targetAngle + 360) <= 12);
                
                if (isCorrect) {
                  feed.innerHTML = '✓ Sahi nishana! Kiran fired at angle ' + angleDeg + '° matching target ' + targetAngle + '° precisely! Claim XP!';
                  feed.style.color = '#22C55E';
                  activateSubmit();
                } else {
                  feed.innerHTML = '✘ Missed! Beam angle is ' + angleDeg + '°, but we need EXACTLY ' + targetAngle + '°. Try again! Lock origin, then drag laser beam.';
                  feed.style.color = '#F59E0B';
                }
              } else {
                feed.innerHTML = '✓ Laser Kiran fired! Starts at source point and shoots with <b>1 arrowhead (➔)</b> to infinity at ' + angleDeg + '°. Claim XP!';
                feed.style.color = '#22C55E';
                activateSubmit();
              }
            }
            drawKiran();
          }

          cv.addEventListener('mousedown', tapKiran);
          cv.addEventListener('touchstart', tapKiran);

          window.addEventListener('load', () => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawKiran();
          });
          setTimeout(() => {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            drawKiran();
          }, 200);
        }

        /* 5. geom_shikhar Script */
        if (document.getElementById('canvas-shikhar')) {
          const cv = document.getElementById('canvas-shikhar');
          const cx = cv.getContext('2d');
          let peakX = 140, peakY = 50;
          
          let targetPeak = (targetValue && typeof targetValue === 'object' && targetValue.x !== undefined) ? targetValue : null;

          function deployMountainPeak() {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            
            if (targetPeak) {
              peakX = cv.width/2 + targetPeak.x * 20;
              peakY = cv.height/2 - targetPeak.y * 20;
            } else {
              // Randomize peak
              peakX = 70 + Math.random() * (cv.width - 140);
              peakY = 40 + Math.random() * 40;
            }

            drawPeakLines();
            document.getElementById('glorious-star').style.display = 'none';
            document.getElementById('shikhar-feedback').innerHTML = targetPeak ? 'Spot & tap the Apex Vertex corner located at exact coordinates <b>(' + targetPeak.x + ', ' + targetPeak.y + ')</b>!' : 'Tap the meeting apex corner point where the lines cross!';
            document.getElementById('shikhar-feedback').style.color = '#B45309';
          }

          function drawPeakLines() {
            cx.clearRect(0,0, cv.width, cv.height);
            // grid
            cx.strokeStyle = 'rgba(255,255,255,0.05)';
            cx.lineWidth = 1;
            for(let i=15; i<cv.width; i+=15){
              cx.beginPath(); cx.moveTo(i,0); cx.lineTo(i,cv.height); cx.stroke();
            }
            for(let j=15; j<cv.height; j+=15){
              cx.beginPath(); cx.moveTo(0,j); cx.lineTo(cv.width,j); cx.stroke();
            }

            // Draw axis markers inside grid for mathematical reference
            cx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            cx.beginPath(); cx.moveTo(cv.width/2, 0); cx.lineTo(cv.width/2, cv.height); cx.stroke();
            cx.beginPath(); cx.moveTo(0, cv.height/2); cx.lineTo(cv.width, cv.height/2); cx.stroke();

            // Two sloping mountain paths meeting at (peakX, peakY)
            cx.strokeStyle = '#F43F5E'; cx.lineWidth = 3;
            cx.beginPath(); cx.moveTo(peakX - 80, peakY + 80); cx.lineTo(peakX, peakY); cx.lineTo(peakX + 80, peakY + 80);
            cx.stroke();

            // Labeled
            cx.fillStyle = 'rgba(244,63,94,0.1)';
            cx.beginPath();
            cx.moveTo(peakX-80, peakY+80); cx.lineTo(peakX, peakY); cx.lineTo(peakX+80, peakY+80);
            cx.closePath(); cx.fill();
            
            // Display angle
            const rawAng = 50 + (activeVariantIndex !== -1 ? (activeVariantIndex * 3) % 25 : 12);
            document.getElementById('shikhar-angle-label').innerText = 'Mountain Slope Angle: ' + rawAng + '°';
          }

          function selectPeak(e) {
            const rect = cv.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const dist = Math.sqrt((x - peakX)**2 + (y-peakY)**2);
            if (dist < 22) {
              // Spotted successfully
              const star = document.getElementById('glorious-star');
              star.style.display = 'block';
              star.style.left = peakX + 'px';
              star.style.top = peakY + 'px';

              const feed = document.getElementById('shikhar-feedback');
              feed.innerHTML = targetPeak ? '✓ Correct! You spotted the golden <b>Shikhar (Vertex)</b> corner apex located at coordinate (' + targetPeak.x + ', ' + targetPeak.y + ')! Tap Claim!' : '✓ Correct! You spotted the golden <b>Shikhar (Vertex)</b> corner apex. Tap claim!';
              feed.style.color = '#22C55E';
              activateSubmit();
            } else {
              document.getElementById('shikhar-feedback').innerText = '✘ Missed corner! Look closely at the topmost point where paths cross and tap again.';
              document.getElementById('shikhar-feedback').style.color = 'red';
            }
          }

          cv.addEventListener('mousedown', selectPeak);
          cv.addEventListener('touchstart', selectPeak);
          
          window.addEventListener('load', deployMountainPeak);
          setTimeout(deployMountainPeak, 200);
          window.deployMountainPeak = deployMountainPeak;
        }

        /* 6. maxmin_max Script */
        let iplTeams = [
          { name: '🦁 Chennai Kings', score: 184, isMax: false },
          { name: '🔴 Royal Challengers', score: 195, isMax: true },
          { name: '🔵 Mumbai Franchise', score: 142, isMax: false },
          { name: '👑 Delhi Capitals', score: 171, isMax: false }
        ];

        function resetIPLMatches() {
          let maxVal = (targetValue && typeof targetValue === 'number') ? targetValue : -1;
          
          if (maxVal !== -1) {
            // Pick a random team to be the maximum scorer
            const maxIdx = Math.floor(Math.random() * iplTeams.length);
            iplTeams.forEach((t, i) => {
              if (i === maxIdx) {
                t.score = maxVal;
              } else {
                t.score = 100 + Math.floor(Math.random() * (maxVal - 110));
              }
            });
          } else {
            let actualMax = -1;
            iplTeams.forEach(t => {
              t.score = 120 + Math.floor(Math.random() * 110);
              if (t.score > actualMax) actualMax = t.score;
            });
            maxVal = actualMax;
          }
          
          // Tag max
          iplTeams.forEach(t => t.isMax = (t.score === maxVal));
          renderIPL();
          document.getElementById('ipl-feedback').innerHTML = 'Match runs synced to Drill! Click the player team having the <b>MAXIMUM</b> run count: <b>' + maxVal + '</b>!';
          document.getElementById('ipl-feedback').style.color = '#0369A1';
        }

        function renderIPL() {
          const board = document.getElementById('ipl-board');
          if(!board) return;
          board.innerHTML = '';
          iplTeams.forEach((t, idx) => {
            const card = document.createElement('div');
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'space-between';
            card.style.background = '#F9FAFB';
            card.style.border = '2px solid black';
            card.style.borderRadius = '6px';
            card.style.padding = '5px 8px';
            card.style.cursor = 'pointer';
            card.style.fontWeight = 'bold';
            card.style.fontSize = '10px';
            card.onclick = () => checkIPLSubmission(t);

            card.innerHTML = \`
              <span>\${t.name}</span>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="range" min="100" max="250" value="\${t.score}" style="width:50px; pointer-events:none;" />
                <span class="gator-bubble" style="width:36px; padding:2px; font-size:9.5px; margin:0;">\${t.score}</span>
              </div>
            \`;
            board.appendChild(card);
          });
        }

        function checkIPLSubmission(team) {
          const feed = document.getElementById('ipl-feedback');
          if (team.isMax) {
            feed.innerHTML = '👑 Boooom! Correct! <b>' + team.name + '</b> has maximum score of ' + team.score + ' (Apex Champion). Click Complete!';
            feed.style.color = '#10B981';
            activateSubmit();
          } else {
            feed.innerText = '✘ Wrong team! ' + team.name + ' (' + team.score + ' runs) is NOT the maximum scorer. Search for peak scorer!';
            feed.style.color = 'red';
          }
        }

        window.resetIPLMatches = resetIPLMatches;
        if (subId === 'maxmin_max') {
          setTimeout(resetIPLMatches, 100);
        }

        /* 7. maxmin_min Script */
        let lockers = [
          { id: '1', item: '🍦 Premium Icecream', temp: -18, isMin: true },
          { id: '2', item: '🧀 Salted Butter Block', temp: -4, isMin: false },
          { id: '3', item: '🍼 Cold Chilled Milk', temp: -2, isMin: false },
          { id: '4', item: '🥬 Samosa Potato Mash', temp: -8, isMin: false }
        ];

        function resetFreezerThermos() {
          let minTemp = (targetValue && typeof targetValue === 'number') ? targetValue : null;
          
          if (minTemp !== null) {
            const minIdx = Math.floor(Math.random() * lockers.length);
            lockers.forEach((l, idx) => {
              if (idx === minIdx) {
                l.temp = minTemp;
              } else {
                l.temp = minTemp + 3 + Math.floor(Math.random() * 15);
              }
            });
          } else {
            const temps = [-20, -18, -15, -12, -8, -5, -2, -1, 3];
            temps.sort(() => Math.random() - 0.5);
            let actualMin = 100;
            lockers.forEach((l, idx) => {
              l.temp = temps[idx];
              if (l.temp < actualMin) actualMin = l.temp;
            });
            minTemp = actualMin;
          }
          
          lockers.forEach(l => l.isMin = (l.temp === minTemp));
          renderFreezer();
          document.getElementById('freezer-feedback').innerHTML = 'Sub-zero temperatures changed! Select the absolute minimum (coldest) locker: <b>' + minTemp + ' °C</b>.';
          document.getElementById('freezer-feedback').style.color = '#9B1C1C';
        }

        function renderFreezer() {
          const f = document.getElementById('freezer-grid');
          if(!f) return;
          f.innerHTML = '';
          lockers.forEach(l => {
            const box = document.createElement('div');
            box.style.border = '2.2px solid black';
            box.style.borderRadius = '6px';
            box.style.background = '#EFF6FF';
            box.style.padding = '6px';
            box.style.textAlign = 'center';
            box.style.cursor = 'pointer';
            box.onclick = () => checkFreezerMin(l);

            box.innerHTML = \`
              <div style="font-size:16px;">🧊</div>
              <b style="font-size:8px; display:block; text-transform:uppercase;">\${l.item}</b>
              <span id="temp-label" style="font-family:monospace; font-size:11px; font-weight:black; color:#1E40AF; background:white; display:inline-block; padding:1px 5px; border-radius:4px; border:1px solid black; margin-top:3.5px;">
                \${l.temp} °C
              </span>
            \`;
            f.appendChild(box);
          });
        }

        function checkFreezerMin(loc) {
          const feed = document.getElementById('freezer-feedback');
          if (loc.isMin) {
            feed.innerHTML = '❄️ locked! Correct! <b>' + loc.temp + ' °C</b> is the absolute MINIMUM temperature (coldest on negative scale). Claim XP!';
            feed.style.color = '#10B981';
            activateSubmit();
          } else {
            feed.innerText = '✘ Wrong locker! ' + loc.temp + ' °C is not coldest. Remember, -20°C is colder than -2°C!';
            feed.style.color = 'red';
          }
        }

        window.resetFreezerThermos = resetFreezerThermos;
        if (subId === 'maxmin_min') {
          setTimeout(resetFreezerThermos, 100);
        }

        /* 8. maxmin_range Script */
        function computeSpectrumRange() {
          // pre-populate values on first load if targetValue is set
          if (targetValue && typeof targetValue === 'number' && activeVariantIndex !== -1) {
            if (!document.getElementById('market-input').getAttribute('data-prefilled-range')) {
              const upperVal = (activeVariantIndex % 5) * 20 + 150;
              const lowerVal = (activeVariantIndex % 4) * 10 + 20;
              document.getElementById('market-input').value = (lowerVal + 25) + ", " + upperVal + ", " + lowerVal + ", " + (upperVal - 15);
              document.getElementById('market-input').setAttribute('data-prefilled-range', 'true');
            }
          }

          const text = document.getElementById('market-input').value;
          const nums = text.split(',').map(n => parseFloat(n.trim())).filter(x => !isNaN(x));
          if(nums.length < 2) {
            alert('Please enters indices at least 2 prices!');
            return;
          }
          const sorted = [...nums].sort((a,b) => a-b);
          const min = sorted[0];
          const max = sorted[sorted.length - 1];
          const range = max - min;

          document.getElementById('spec-max').innerText = 'Rs ' + max;
          document.getElementById('spec-min').innerText = 'Rs ' + min;
          document.getElementById('spec-output').innerText = max + ' - ' + min + ' = Rs ' + range;

          const container = document.getElementById('market-capsules');
          container.innerHTML = '';
          sorted.forEach((n, idx) => {
            const b = document.createElement('span');
            b.style.display = 'inline-block';
            b.style.padding = '2px 5px';
            b.style.fontSize = '8.5px';
            b.style.fontFamily = 'monospace';
            b.style.fontWeight = 'bold';
            b.style.borderRadius = '12px';
            b.style.border = '1px solid black';
            
            if (idx === 0) {
              b.style.background = '#FEE2E2'; b.style.color = '#991B1B';
              b.innerText = 'Rs ' + n + ' [Floor Base]';
            } else if (idx === sorted.length - 1) {
              b.style.background = '#D1FAE5'; b.style.color = '#065F46';
              b.innerText = 'Rs ' + n + ' [Apex Peak]';
            } else {
              b.style.background = '#E0F2FE'; b.style.color = '#0369A1';
              b.innerText = 'Rs ' + n;
            }
            container.appendChild(b);
          });
          
          let requiredFasla = (targetValue && typeof targetValue === 'number') ? targetValue : null;
          if (requiredFasla !== null) {
            if (range === requiredFasla) {
              document.getElementById('spec-output').innerHTML = max + ' - ' + min + ' = <b>Rs ' + range + ' (✓ Target Matched!)</b>';
              activateSubmit();
            } else {
              document.getElementById('spec-output').innerHTML = max + ' - ' + min + ' = Rs ' + range + ' <span style="font-size:7.5px; color:#B45309;">(Drill goal: Rs ' + requiredFasla + ')</span>';
            }
          } else {
            activateSubmit();
          }
        }
        window.computeSpectrumRange = computeSpectrumRange;
        if (subId === 'maxmin_range') {
          setTimeout(computeSpectrumRange, 100);
        }

        /* 9. compare_basics Script */
        function reckonBasicsGator() {
          const s1 = document.getElementById('basics-s1');
          const s2 = document.getElementById('basics-s2');
          
          if (targetValue && typeof targetValue === 'object' && targetValue.num1 !== undefined) {
            if (!s1.getAttribute('data-prefilled')) {
              s1.value = targetValue.num1;
              s2.value = targetValue.num2;
              s1.setAttribute('data-prefilled', 'true');
            }
          }

          const v1 = parseFloat(s1.value);
          const v2 = parseFloat(s2.value);

          document.getElementById('basics-n1').innerText = v1;
          document.getElementById('basics-n2').innerText = v2;

          const icon = document.getElementById('basics-gator-icon');
          const feed = document.getElementById('basics-feedback-status');

          if (v1 > v2) {
            icon.innerText = '🐊👉';
            feed.innerHTML = '<b>' + v1 + ' > ' + v2 + '</b>: GATOR chomps left! ' + v1 + ' is larger than ' + v2 + '.';
          } else if (v1 < v2) {
            icon.innerText = '👈🐊';
            feed.innerHTML = '<b>' + v1 + ' < ' + v2 + '</b>: GATOR chomps right! ' + v2 + ' is larger than ' + v1 + '.';
          } else {
            icon.innerText = '🦖⚖️';
            feed.innerHTML = '<b>' + v1 + ' = ' + v2 + '</b>: Perfect match! Gator is confused.';
          }
          activateSubmit();
        }
        window.reckonBasicsGator = reckonBasicsGator;
        if (subId === 'compare_basics') {
          setTimeout(reckonBasicsGator, 100);
        }

        /* 10. compare_decimals Script */
        function executeDecimalsGrid() {
          const cvA = document.getElementById('canvas-grid-a');
          const cvB = document.getElementById('canvas-grid-b');
          if (!cvA || !cvB) return;

          const cxA = cvA.getContext('2d');
          const cxB = cvB.getContext('2d');

          cvA.width = 100; cvA.height = 100;
          cvB.width = 100; cvB.height = 100;

          let dec1 = (targetValue && typeof targetValue === 'object' && targetValue.dec1 !== undefined) ? targetValue.dec1 : 0.50;
          let dec2 = (targetValue && typeof targetValue === 'object' && targetValue.dec2 !== undefined) ? targetValue.dec2 : 0.05;

          const countA = Math.round(dec1 * 100);
          const countB = Math.round(dec2 * 100);

          // Shade decimal A
          cxA.clearRect(0,0,100,100);
          for(let row=0; row<10; row++) {
            for(let col=0; col<10; col++) {
              const idx = row * 10 + col;
              cxA.strokeStyle = '#DDD'; cxA.lineWidth = 0.5;
              if (idx < countA) {
                cxA.fillStyle = '#3B82F6';
              } else {
                cxA.fillStyle = '#FFF';
              }
              cxA.fillRect(col*10, row*10, 10, 10);
              cxA.strokeRect(col*10, row*10, 10, 10);
            }
          }

          // Shade decimal B
          cxB.clearRect(0,0,100,100);
          for(let row=0; row<10; row++) {
            for(let col=0; col<10; col++) {
              const idx = row * 10 + col;
              cxB.strokeStyle = '#DDD'; cxB.lineWidth = 0.5;
              if (idx < countB) {
                cxB.fillStyle = '#F97316';
              } else {
                cxB.fillStyle = '#FFF';
              }
              cxB.fillRect(col*10, row*10, 10, 10);
              cxB.strokeRect(col*10, row*10, 10, 10);
            }
          }

          const explanation = document.getElementById('decimals-explanation-card');
          if (explanation) {
            explanation.innerHTML = '✓ Visualized! Column shading represents <b>' + dec1 + '</b> (' + countA + '/100 blocks) and <b>' + dec2 + '</b> (' + countB + '/100 blocks) side-by-side. Solid math proof!';
          }
          activateSubmit();
        }
        window.executeDecimalsGrid = executeDecimalsGrid;
        if (subId === 'compare_decimals') {
          setTimeout(executeDecimalsGrid, 100);
        }

        /* 11. compare_rounding Script */
        let roundBillValue = 145.80;
        let roundCorrectAnswer = 146;
        const BILL_SLIPS = [
          { name: 'Pure Saffron Petals', price: 145.80, ans: 146 },
          { name: 'Gulab Kulfi Icecream', price: 42.45, ans: 42 },
          { name: 'Kashmiri Walnuts Deal', price: 289.50, ans: 290 },
          { name: 'Masala Spiced Cashew', price: 84.15, ans: 84 }
        ];

        function rollOverNewBill() {
          let priceGoalObj = (targetValue && typeof targetValue === 'object' && targetValue.original !== undefined) ? targetValue : null;

          if (priceGoalObj) {
            roundBillValue = priceGoalObj.original;
            roundCorrectAnswer = priceGoalObj.expected;
            document.getElementById('slip-item-name').innerText = 'Drill Premium Groceries';
          } else {
            const index = Math.floor(Math.random() * BILL_SLIPS.length);
            const active = BILL_SLIPS[index];
            roundBillValue = active.price;
            roundCorrectAnswer = active.ans;
            document.getElementById('slip-item-name').innerText = active.name;
          }

          document.getElementById('slip-item-price').innerText = 'Rs ' + roundBillValue.toFixed(2);
          document.getElementById('slip-grand-total').innerText = 'Rs ' + roundBillValue.toFixed(2);
          document.getElementById('rounded-bill-input').value = '';
          document.getElementById('round-bill-feedback').innerText = 'Cash memo ready! Round off ' + roundBillValue.toFixed(2) + ' to nearest integer Rupee.';
          document.getElementById('round-bill-feedback').style.color = '#B45309';
        }

        function confirmBillRound() {
          const val = parseInt(document.getElementById('rounded-bill-input').value);
          const feed = document.getElementById('round-bill-feedback');
          if (val === roundCorrectAnswer) {
            feed.innerHTML = '✓ Sahi! Rounded Rs ' + roundBillValue.toFixed(2) + ' to nearest Rupee <b>Rs ' + val + '</b>. Vouch lock complete!';
            feed.style.color = '#10B981';
            activateSubmit();
          } else {
            feed.innerText = '✘ Incorrect! If paise >= 50, round UP to next Rupee. If less than 50 paise, round DOWN.';
            feed.style.color = 'red';
          }
        }
        window.rollOverNewBill = rollOverNewBill;
        window.confirmBillRound = confirmBillRound;
        if (subId === 'compare_rounding') {
          setTimeout(rollOverNewBill, 100);
        }

        /* 12. compare_place Script */
        function drawAbacus() {
          const thInput = document.getElementById('ab-val-th');
          const hInput = document.getElementById('ab-val-h');
          const tInput = document.getElementById('ab-val-t');
          const oInput = document.getElementById('ab-val-o');

          let pVal = (targetValue && typeof targetValue === 'number') ? targetValue : null;
          if (pVal !== null) {
            if (!thInput.getAttribute('data-prefilled')) {
              const th = Math.floor(pVal / 1000) % 10;
              const h = Math.floor(pVal / 100) % 10;
              const t = Math.floor(pVal / 10) % 10;
              const o = pVal % 10;
              thInput.value = th;
              hInput.value = h;
              tInput.value = t;
              oInput.value = o;
              thInput.setAttribute('data-prefilled', 'true');
            }
          }

          const thVal = parseInt(thInput.value) || 0;
          const hVal = parseInt(hInput.value) || 0;
          const tVal = parseInt(tInput.value) || 0;
          const oVal = parseInt(oInput.value) || 0;

          renderBeads('abacus-th', thVal, '#3B82F6');
          renderBeads('abacus-h', hVal, '#EC4899');
          renderBeads('abacus-t', tVal, '#F59E0B');
          renderBeads('abacus-o', oVal, '#10B981');

          const sum = thVal * 1000 + hVal * 100 + tVal * 10 + oVal;
          const feedbackLabel = document.getElementById('abacus-sum-label');
          
          if (pVal !== null) {
            if (sum === pVal) {
              feedbackLabel.innerHTML = '<b>✓ Code Matched!</b> ' + thVal + 'k + ' + hVal + 'h + ' + tVal + 't + ' + oVal + 'o = <b>' + sum + '</b>. Claim XP!';
              feedbackLabel.style.color = '#10B981';
              activateSubmit();
            } else {
              feedbackLabel.innerHTML = 'Target Place Code: <b>' + pVal + '</b> (Current Bead Code: ' + sum + ')';
              feedbackLabel.style.color = '#B45309';
            }
          } else {
            feedbackLabel.innerHTML = '<b>Place Code locked:</b> ' + thVal + 'k + ' + hVal + 'h + ' + tVal + 't + ' + oVal + 'o = <b>' + sum + '</b>!';
            activateSubmit();
          }
        }

        function renderBeads(elemId, count, color) {
          const div = document.getElementById(elemId);
          if(!div) return;
          div.innerHTML = '';
          const lim = Math.min(count, 8);
          for(let i=0; i<lim; i++) {
            const bead = document.createElement('div');
            bead.className = 'abacus-bead';
            bead.style.background = color;
            div.appendChild(bead);
          }
        }
        window.drawAbacus = drawAbacus;
        if (subId === 'compare_place') {
          setTimeout(drawAbacus, 100);
        }

        /* 13. compare_order Script */
        let gameBricks = [-15, 24, -3, 0];
        let userSortedBricks = [];

        function setupStairGame() {
          if (targetValue && Array.isArray(targetValue)) {
            gameBricks = targetValue;
          } else {
            const presets = [
              [-22, 11, -5, 0],
              [-50, -10, 2, 25],
              [-3, -15, -8, 8],
              [30, -12, 0, -45]
            ];
            gameBricks = presets[Math.floor(Math.random() * presets.length)];
          }

          // Shuffle unsorted
          const unsorted = [...gameBricks].sort(() => Math.random() - 0.5);
          userSortedBricks = [];

          const row = document.getElementById('stair-floating-row');
          const bridge = document.getElementById('stair-bridge-row');
          const feed = document.getElementById('stair-status-feed');

          if (row) row.innerHTML = '';
          if (bridge) bridge.innerHTML = '';
          if (feed) {
            feed.innerText = 'Walkway is broken! Click the bricks from smallest up to build!';
            feed.style.color = '#B45309';
          }

          unsorted.forEach((n, idx) => {
            const brick = document.createElement('button');
            brick.className = 'brick-btn';
            brick.innerText = n;
            brick.onclick = () => tapBrick(n, brick);
            if (row) row.appendChild(brick);
          });
        }

        function tapBrick(n, btnElement) {
          const feed = document.getElementById('stair-status-feed');
          // Check if n is the absolute smallest remaining
          const remaining = gameBricks.filter(x => !userSortedBricks.includes(x));
          const smallest = Math.min(...remaining);

          if (n === smallest) {
            userSortedBricks.push(n);
            btnElement.disabled = true;
            btnElement.style.opacity = '0.35';
            
            // Add to bridge
            const b = document.createElement('span');
            b.style.display = 'inline-block';
            b.style.padding = '4px 8px';
            b.style.background = '#059669';
            b.style.color = 'white';
            b.style.border = '1.8px solid black';
            b.style.borderRadius = '3.5px';
            b.style.fontFamily = 'monospace';
            b.style.fontWeight = 'black';
            b.style.fontSize = '9.5px';
            b.innerText = n;
            const bridge = document.getElementById('stair-bridge-row');
            if (bridge) bridge.appendChild(b);

            if (userSortedBricks.length === gameBricks.length) {
              const res = userSortedBricks.join(' < ');
              feed.innerHTML = '✓ Walkway complete! stable order unlocked: <b>' + res + '</b>. Claim XP!';
              feed.style.color = '#22C55E';
              activateSubmit();
            } else {
              feed.innerText = '✓ Great! ' + n + ' locked. select the next smallest brick.';
              feed.style.color = '#0D9488';
            }
          } else {
            feed.innerHTML = '❌ Uh oh! <b>' + n + '</b> is not smallest. check negative debt balance first (' + smallest + ' is smaller)!';
            feed.style.color = 'red';
          }
        }
        window.setupStairGame = setupStairGame;
        if (subId === 'compare_order') {
          setTimeout(setupStairGame, 100);
        }

        /* 14. Fallback Scratchpad Script */
        if (document.getElementById('scratchpad-canvas')) {
          const cv = document.getElementById('scratchpad-canvas');
          const cx = cv.getContext('2d');
          let painting = false;

          function setupScratchCanvas() {
            cv.width = cv.parentElement.clientWidth;
            cv.height = cv.parentElement.clientHeight;
            cx.strokeStyle = 'rgba(255,255,255,0.06)';
            cx.lineWidth = 1;
            for(let i=15; i<cv.width; i+=15){
              cx.beginPath(); cx.moveTo(i,0); cx.lineTo(i,cv.height); cx.stroke();
            }
            for(let j=15; j<cv.height; j+=15){
              cx.beginPath(); cx.moveTo(0,j); cx.lineTo(cv.width,j); cx.stroke();
            }
          }

          function drawScratch(e) {
            if(!painting) return;
            const rect = cv.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            cx.lineWidth = 3;
            cx.strokeStyle = '#22D3EE';
            cx.lineCap = 'round';
            cx.lineTo(clientX - rect.left, clientY - rect.top);
            cx.stroke();
            activateSubmit();
          }

          cv.addEventListener('mousedown', (e) => { painting = true; cx.beginPath(); drawScratch(e); });
          cv.addEventListener('mousemove', drawScratch);
          cv.addEventListener('mouseup', () => painting = false);
          cv.addEventListener('mouseleave', () => painting = false);
          
          cv.addEventListener('touchstart', (e) => { painting = true; cx.beginPath(); drawScratch(e); });
          cv.addEventListener('touchmove', drawScratch);
          cv.addEventListener('touchend', () => painting = false);

          window.addEventListener('load', setupScratchCanvas);
          setTimeout(setupScratchCanvas, 200);

          function clearScratch() {
            cx.clearRect(0,0, cv.width, cv.height);
            setupScratchCanvas();
          }
          window.clearScratch = clearScratch;
          
          function toggleScratchRuler(checked) {
            document.getElementById('scratch-ruler').style.display = checked ? 'block' : 'none';
          }
          window.toggleScratchRuler = toggleScratchRuler;
        }
      </script>
    </body>
    </html>
  `;
}
