import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import VideoPlayer from "./VideoPlayer";
import { 
  PlayCircle, Video, Plus, Upload, CheckCircle, 
  Sparkles, Award, Trash2, BookOpen, AlertCircle, 
  Layers, Clapperboard, CheckSquare, Square
} from "lucide-react";

interface VideoLesson {
  id: string;
  title: string;
  topicId: "geom" | "maxmin" | "compare";
  topicName: string;
  duration: string;
  description: string;
  tag: string;
  isSimulated: boolean;
  fileSrc?: string;
}

const DEFAULT_LESSONS: VideoLesson[] = [
  // Geometry (Rekha & Bindu)
  {
    id: "v1",
    title: "Geometry Shastra Intro (रेखा, बिंदु और किरण)",
    topicId: "geom",
    topicName: "📐 Geometry Basics",
    duration: "2:45 min",
    tag: "Class 6",
    description: "Points (Bindu), Lines (Rekha) & Rays (Kiran) are introduced using Delhi Metro maps, cricket pitches and samosas! Watch Bhaiya draw on the green board.",
    isSimulated: true
  },
  {
    id: "v2",
    title: "Bindu: The 0D Spatial Hero (बिंदु क्या है?)",
    topicId: "geom",
    topicName: "📐 Bindu Room",
    duration: "3:10 min",
    tag: "Class 6",
    description: "Learn why a Point has strictly zero dimensions but is the absolute ruler of coordinate systems. Master uppercase letter labeling (A, B, C).",
    isSimulated: true
  },
  {
    id: "v3",
    title: "Rekha: Stretching to Infinity (अनंत रेखा)",
    topicId: "geom",
    topicName: "📐 Rekha Room",
    duration: "3:40 min",
    tag: "Class 7",
    description: "Follow the infinite rail track rules! A line is a collection of infinitely many dots stretching endlessly in both directions. No endpoints here!",
    isSimulated: true
  },
  {
    id: "v4",
    title: "Khand: Fixed Segment Frontiers (रेखा-खंड)",
    topicId: "geom",
    topicName: "📐 Line Segments",
    duration: "2:20 min",
    tag: "Class 6",
    description: "Understand fixed segments with clear bounding endpoints that you can measure with a ruler. Perfect for geometry notebook practice.",
    isSimulated: true
  },
  {
    id: "v5",
    title: "Kiran: The Sun Ray Voyage (किरण की किरणें)",
    topicId: "geom",
    topicName: "📐 Ray Magic",
    duration: "2:50 min",
    tag: "Class 6",
    description: "One fixed origin point, shooting endlessly into the universe like a flashlight or a sun beam! Learn Ray OP formatting rules.",
    isSimulated: true
  },
  {
    id: "v6",
    title: "Shikhar: Corner Vertex (शिखर और कोना)",
    topicId: "geom",
    topicName: "📐 Corner Vertex",
    duration: "3:15 min",
    tag: "Class 7",
    description: "Find the pointy vertex corners of samosas, kites, and local street intersections. Understand how intersecting lines meet at a shikhar.",
    isSimulated: true
  },
  {
    id: "v7",
    title: "Angles (कोण) of Delhi Streets",
    topicId: "geom",
    topicName: "📐 Angle Secrets",
    duration: "4:05 min",
    tag: "Class 7",
    description: "Explore acute, obtuse, and strict 90-degree right angles across Chandni Chowk historical gates and kite flying cords.",
    isSimulated: true
  },
  {
    id: "v8",
    title: "Parallel tracks of Metro (समानांतर रेल ट्रैक)",
    topicId: "geom",
    topicName: "📐 Parallel Lines",
    duration: "3:30 min",
    tag: "Class 7",
    description: "Why do Delhi Metro parallel tracks never intersect? Deep dive into the constant gap rules of parallel lines.",
    isSimulated: true
  },
  {
    id: "v9",
    title: "Perpendicular Crossings (लंबवत रेखाएं)",
    topicId: "geom",
    topicName: "📐 Intersections",
    duration: "2:55 min",
    tag: "Class 8",
    description: "When roads cross at exactly 90 degrees, forming standard cross-junction offsets. Learn to draw perpendicular markings.",
    isSimulated: true
  },
  {
    id: "v10",
    title: "2D Cartesian Coordinate Grid Secrets",
    topicId: "geom",
    topicName: "📐 Cartesians",
    duration: "4:30 min",
    tag: "Class 8",
    description: "Map your shop on a 2D coordinate system. Plot points like (x, y) with positive and negative quadrant values like a pro.",
    isSimulated: true
  },

  // Max/Min & Range
  {
    id: "v11",
    title: "Delhi Samosa Bazaar: Max/Min Intro",
    topicId: "maxmin",
    topicName: "🔢 Extreme Values",
    duration: "3:00 min",
    tag: "Class 6",
    description: "How shopping lists demand extreme point filters! Learn how businesses find maximum profits and minimum expenses in regular markets.",
    isSimulated: true
  },
  {
    id: "v12",
    title: "Maximum Peak: The Absolute Limit",
    topicId: "maxmin",
    topicName: "🔢 Upper Bound",
    duration: "2:35 min",
    tag: "Class 7",
    description: "Track the highest runs, the hot seller peak hours, or maximum discounts. Learn to lock the highest value in a comparative data set.",
    isSimulated: true
  },
  {
    id: "v13",
    title: "Minimum Base: Finding Lowest Deals",
    topicId: "maxmin",
    topicName: "🔢 Lower Bound",
    duration: "2:40 min",
    tag: "Class 6",
    description: "Locate the cheapest raw materials and minimum temperatures. Sort values in ascending order to find the base floor deals.",
    isSimulated: true
  },
  {
    id: "v14",
    title: "Range (Fasla) Code: Max - Min",
    topicId: "maxmin",
    topicName: "🔢 Range Space",
    duration: "3:20 min",
    tag: "Class 7",
    description: "Formula masterclass! Range is simply: Maximum value minus Minimum value. Track salary fluctuations and grocery pricing spreads, fast!",
    isSimulated: true
  },
  {
    id: "v15",
    title: "Below Zero: Negative Number Ranges",
    topicId: "maxmin",
    topicName: "🔢 Cold Values",
    duration: "3:50 min",
    tag: "Class 8",
    description: "Explore frozen warehouse storage calculations between -18°C and -2°C. Handle subtraction rules with double negative values correctly.",
    isSimulated: true
  },
  {
    id: "v16",
    title: "Average (Panchayat Mean Share) Concept",
    topicId: "maxmin",
    topicName: "🔢 Simple Means",
    duration: "4:12 min",
    tag: "Class 7",
    description: "Divide profits equally between all partners. Sum all values and divide by the head count to get the standard middle average.",
    isSimulated: true
  },

  // Comparing Numbers
  {
    id: "v17",
    title: "Gator Crocodile Comparative Hunger Rule",
    topicId: "compare",
    topicName: "🐊 Comparing Basics",
    duration: "2:50 min",
    tag: "Class 6",
    description: "Math crocodile hamesha sabse bada number khata hai! Look at the symbols < and > and lock direction rules instantly.",
    isSimulated: true
  },
  {
    id: "v18",
    title: "Decimal Battles: 0.5 vs 0.05",
    topicId: "compare",
    topicName: "🐊 Decimals Comparer",
    duration: "3:45 min",
    tag: "Class 7",
    description: "Avoid decimal traps! Check place values (tenths place vs hundredths place) to correctly size coins, kilograms and change.",
    isSimulated: true
  },
  {
    id: "v19",
    title: "Bazaar Rounding Rules: Nearest Rupee",
    topicId: "compare",
    topicName: "🐊 Rounding Arena",
    duration: "3:10 min",
    tag: "Class 7",
    description: "5 or up, round it UP! 4 or down, keep it DOWN! Learn how a lassi bill of Rs. 45.80 shoves smoothly to Rs. 46 in day-to-day transactions.",
    isSimulated: true
  },
  {
    id: "v20",
    title: "Ascending & Descending (Arohi vs Avrohi)",
    topicId: "compare",
    topicName: "🐊 Order & Kram",
    duration: "3:35 min",
    tag: "Class 8",
    description: "Line up items from smallest to largest or vice versa. Master ordering sequences to optimize computer sorting algorithms and class rankings.",
    isSimulated: true
  }
];

export default function VideosView() {
  const { stats, updateStats } = useAuth();
  const { language } = useLanguage();

  // Local state for lessons (loads custom files uploaded by the user)
  const [lessons, setLessons] = useState<VideoLesson[]>(() => {
    const saved = localStorage.getItem("mathsguru_custom_lessons");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_LESSONS; }
    }
    return DEFAULT_LESSONS;
  });

  // Keep track of watched video IDs
  const [watchedList, setWatchedList] = useState<string[]>(() => {
    return stats.screensViewed
      .filter(s => s.startsWith("video_checked_"))
      .map(s => s.replace("video_checked_", ""));
  });

  const [activePlayVideo, setActivePlayVideo] = useState<VideoLesson | null>(null);

  // Creator form state
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState<"geom" | "maxmin" | "compare">("geom");
  const [newDesc, setNewDesc] = useState("");
  const [newTag, setNewTag] = useState("Class 6");
  const [newDuration, setNewDuration] = useState("3:00 min");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedBase64, setUploadedBase64] = useState<string>("");
  const [uploadError, setUploadError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Sync custom lessons state with localStorage
  const saveLessons = (list: VideoLesson[]) => {
    setLessons(list);
    localStorage.setItem("mathsguru_custom_lessons", JSON.stringify(list));
  };

  // Toggle checklist watch status manually
  const toggleWatchStatus = (videoLessonsId: string) => {
    const targetKey = `video_checked_${videoLessonsId}`;
    let nextWatched: string[] = [];
    let nextScreensProgress = [...stats.screensViewed];

    if (watchedList.includes(videoLessonsId)) {
      nextWatched = watchedList.filter(id => id !== videoLessonsId);
      nextScreensProgress = nextScreensProgress.filter(s => s !== targetKey);
    } else {
      nextWatched = [...watchedList, videoLessonsId];
      if (!nextScreensProgress.includes(targetKey)) {
        nextScreensProgress.push(targetKey);
      }
      // Reward 10 XP points on manually watching/checking off a lesson!
      updateStats({
        screensViewed: nextScreensProgress,
        xp: stats.xp + 10
      });
      alert(`Wah! Lesson checked off! You earned +10 XP coins!`);
    }
    setWatchedList(nextWatched);
  };

  // Play Video command action
  const handlePlayVideo = (lesson: VideoLesson) => {
    setActivePlayVideo(lesson);
    // Mark as watched instantly
    const targetKey = `video_checked_${lesson.id}`;
    if (!watchedList.includes(lesson.id)) {
      const nextWatched = [...watchedList, lesson.id];
      setWatchedList(nextWatched);
      
      const nextScreensProgress = [...stats.screensViewed];
      if (!nextScreensProgress.includes(targetKey)) {
        nextScreensProgress.push(targetKey);
      }
      updateStats({
        screensViewed: nextScreensProgress,
        xp: stats.xp + 10
      });
    }
  };

  // Safe base64 conversion for mock file upload persistence
  const handleFileUpload = (file: File) => {
    setUploadError("");
    if (!file.type.startsWith("video/")) {
      setUploadError("Oops! Please select or drop a valid video file (.mp4, .webm, .ogg).");
      return;
    }
    if (file.size > 14 * 1024 * 1024) {
      setUploadError("For fast sandbox loading, file should be less than 14MB.");
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedBase64(reader.result);
      }
    };
    reader.onerror = () => {
      setUploadError("Could not read local file.");
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Submit new custom card video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert("Please specify a Lesson Title.");
      return;
    }

    const tNames = {
      geom: "📐 Geometry Basics",
      maxmin: "🔢 Extreme Values",
      compare: "🐊 Comparing Basics"
    };

    const newV: VideoLesson = {
      id: `custom_v_${Date.now()}`,
      title: newTitle,
      topicId: newTopic,
      topicName: tNames[newTopic],
      duration: newDuration,
      tag: newTag,
      description: newDesc || "Custom created math course micro-video.",
      isSimulated: uploadedBase64 ? false : true,
      fileSrc: uploadedBase64 || undefined
    };

    const updated = [newV, ...lessons];
    saveLessons(updated);

    // Reset Form
    setNewTitle("");
    setNewDesc("");
    setNewDuration("3:00 min");
    setUploadedFileName("");
    setUploadedBase64("");
    setUploadError("");
    alert("🌟 Subtopic micro-video created and added to your syllabus checklist!");
  };

  // Remove custom lesson card
  const handleDeleteLesson = (id: string) => {
    const nextList = lessons.filter(l => l.id !== id);
    saveLessons(nextList);
    setWatchedList(prev => prev.filter(item => item !== id));
  };

  // Progress metrics
  const completedCount = watchedList.length;
  const ratioPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-black font-mono">
      
      {/* Overview stats header (Bento Style) */}
      <div className="bg-[#FFFDF0] border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_black] text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Clapperboard className="h-6 w-6 text-[#FF6B6B]" />
            <h2 className="font-sans font-black text-xl uppercase text-black">
              Math Masterclass video Checklist
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-600 leading-normal">
            We mapped out 20 core micro-concepts to provide perfect Hindi-English hybrid classes! 
            Submit custom recordings, watch simulated chalkboard lessons, or upload local files.
          </p>
        </div>

        {/* Progress Card right hand */}
        <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_black] text-center w-full md:w-52 shrink-0">
          <span className="text-[10px] font-black block text-purple-600 mb-1">TOTAL MASTERCLASS COMPLETION</span>
          <div className="text-3xl font-sans font-black text-black">{completedCount} / {lessons.length}</div>
          <div className="text-[10px] text-zinc-400 font-bold mb-2 uppercase">Videos cleared</div>
          <div className="h-4 w-full bg-zinc-200 border-2 border-black rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-[#22C55E] transition-all duration-500" 
              style={{ width: `${ratioPercent}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-black text-black">
              {ratioPercent}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Checklist Lesson List Section - Spans 2 */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[5px_5px_0px_black] text-left flex items-center justify-between">
            <h3 className="font-sans font-black text-sm uppercase flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-emerald-500" />
              <span>Syllabus Checklist ({lessons.length} Modules)</span>
            </h3>
            <span className="text-[10px] bg-amber-100 border-2 border-black px-2 py-0.5 rounded font-black uppercase text-amber-800">
              +10 XP on Watch
            </span>
          </div>

          <div className="flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-1">
            {lessons.map((lesson, idx) => {
              const isWatched = watchedList.includes(lesson.id);
              return (
                <div 
                  key={lesson.id}
                  id={`lesson-checklist-card-${lesson.id}`}
                  className={`bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_black] hover:shadow-[5px_5px_0px_black] transition-all text-left flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isWatched ? "bg-emerald-50/20 border-emerald-600" : ""
                  }`}
                >
                  <div className="flex items-start gap-3 w-full sm:flex-1">
                    {/* Circle custom Checkbox trigger */}
                    <button 
                      onClick={() => toggleWatchStatus(lesson.id)}
                      className="mt-1 flex-shrink-0 cursor-pointer text-zinc-700 hover:text-emerald-600"
                    >
                      {isWatched ? (
                        <CheckSquare className="h-6 w-6 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <Square className="h-6 w-6" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-bold uppercase tracking-wide bg-zinc-100 border border-black/20 text-zinc-500 px-1.5 rounded">
                          {idx + 1}. {lesson.tag}
                        </span>
                        <span className="text-[10px] font-mono text-amber-600 font-extrabold uppercase">
                          {lesson.topicName}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-bold ml-auto sm:ml-0">
                          ⏱ {lesson.duration}
                        </span>
                      </div>
                      <h4 className="font-sans font-black text-sm text-black mt-1 leading-tight uppercase">
                        {lesson.title}
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-600 mt-1.5 leading-relaxed font-semibold">
                        {lesson.description}
                      </p>
                      {lesson.fileSrc && (
                        <div className="mt-2 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Plus className="h-3.5 w-3.5" />
                          <span>Custom Local Video MP4 Attached</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Play & actions right */}
                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end border-t sm:border-none pt-2.5 sm:pt-0">
                    {lesson.id.startsWith("custom_") && (
                      <button 
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="p-1 px-2 border-2 border-black bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-xs font-black cursor-pointer shadow-[2px_2px_0px_black] active:translate-y-0.5"
                        title="Remove Lesson"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handlePlayVideo(lesson)}
                      className={`flex items-center gap-1 p-2 px-3.5 text-xs font-sans font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_black] active:translate-y-0.5 transition-all cursor-pointer ${
                        isWatched 
                          ? "bg-zinc-100 text-zinc-800 hover:bg-zinc-200" 
                          : "bg-[#FF6B6B] text-white hover:bg-[#FF4D4D]"
                      }`}
                    >
                      <PlayCircle className="h-4 w-4 stroke-[3]" />
                      <span>{isWatched ? "Replay" : "Play Class"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create and Upload Video form on right side */}
        <div className="flex flex-col gap-6">
          <div className="bg-amber-100 border-4 border-black p-5 rounded-2xl shadow-[5px_5px_0px_black] text-left">
            <h3 className="font-sans font-black text-sm uppercase flex items-center gap-2 mb-2">
              <Video className="h-5 w-5 text-black" />
              <span>Create & Upload Lesson</span>
            </h3>
            <p className="text-[11px] font-bold text-zinc-600 leading-normal mb-4">
              Add your own custom micro-recordings to the syllabus! Write Hinglish title descriptions or drop quick video files.
            </p>

            <form onSubmit={handleAddVideo} className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-black text-[10px] text-black">LESSON TITLE (HINGLISH)</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Shikhar: Complete Angle Apex!" 
                  className="p-2 border-2 border-black rounded bg-white text-black font-semibold text-xs leading-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-black text-[10px] text-black">TOPIC STREAM</label>
                  <select 
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value as any)}
                    className="p-2 border-2 border-black rounded bg-white text-black font-semibold text-xs"
                  >
                    <option value="geom">Geometry 📐</option>
                    <option value="maxmin">Max/Min & Range 🔢</option>
                    <option value="compare">Comparing 🐊</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-black text-[10px] text-black">GRADE LEVEL</label>
                  <input 
                    type="text" 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Class 6 / 7 / 8" 
                    className="p-2 border-2 border-black rounded bg-white text-black font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-black text-[10px] text-black">DURATION</label>
                  <input 
                    type="text" 
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="⏱ min duration" 
                    className="p-2 border-2 border-black rounded bg-white text-black font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-black text-[10px] text-black">LESSON SYLLABUS DETAIL</label>
                <textarea 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain coordinate limits or bargaining calculations..." 
                  className="p-2 border-2 border-black rounded bg-white text-black font-semibold text-xs h-16 resize-none"
                />
              </div>

              {/* Drag and Drop area */}
              <div className="flex flex-col gap-1">
                <label className="font-black text-[10px] text-black">UPLOAD VIDEO CLIP (.MP4/.WEBM)</label>
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-all ${
                    dragActive ? "border-solid border-purple-500 bg-purple-50/50" : "border-black/40 bg-white"
                  }`}
                  onClick={() => document.getElementById("hidden-file-input")?.click()}
                >
                  <Upload className="h-6 w-6 text-zinc-400 mx-auto mb-1" />
                  <span className="block font-bold text-[10px] uppercase text-zinc-650">
                    {uploadedFileName ? `✓ Attached: ${uploadedFileName.slice(0,20)}` : "Drag/Drop file or Click here"}
                  </span>
                  <input 
                    id="hidden-file-input"
                    type="file" 
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                {uploadError && <p className="text-red-600 font-bold text-[10px] mt-1">{uploadError}</p>}
                {uploadedBase64 && (
                  <p className="text-emerald-600 font-bold text-[10px] mt-1 flex items-center gap-1 justify-center bg-emerald-50 py-1 rounded">
                    <span>File loaded inside local sandbox state! ✅</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-3 w-full py-3 bg-black text-[#FFC700] border-2 border-black rounded-xl text-xs font-sans font-black uppercase tracking-wider hover:bg-neutral-900 cursor-pointer shadow-[3px_3px_0px_black] active:translate-y-0.5"
              >
                + ADD MODULE LESSON
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Theater View Overlay Modal for watching videos */}
      {activePlayVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border-4 border-black w-full max-w-3xl rounded-2xl shadow-[8px_8px_0px_black] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header bar */}
            <div className="bg-[#FF6B6B] border-b-4 border-black p-4 text-left text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">
                  🎥 PLAYING MICRO-CLASS: {activePlayVideo.topicName}
                </span>
                <h3 className="font-sans font-black text-base sm:text-lg leading-tight uppercase">
                  {activePlayVideo.title}
                </h3>
              </div>
              <button 
                onClick={() => setActivePlayVideo(null)}
                className="p-1 px-3 bg-black text-white hover:bg-neutral-800 rounded-lg text-xs font-black cursor-pointer border-2 border-black shadow-[2px_2px_0px_rgba(255,255,255,0.2)] active:translate-y-0.5"
              >
                CLOSE ✖
              </button>
            </div>

            {/* Content area: player */}
            <div className="flex-1 bg-[#1A1A1A] text-white p-2 min-h-[300px] flex items-center justify-center">
              {activePlayVideo.fileSrc ? (
                /* Native MP4 video rendering if they uploaded something custom! */
                <div className="w-full h-full max-h-[50vh] flex flex-col gap-2">
                  <video 
                    src={activePlayVideo.fileSrc}
                    controls
                    className="w-full h-full max-h-[45vh] rounded border border-white/10"
                    autoPlay
                  />
                  <div className="text-[10px] font-mono text-zinc-400 text-center uppercase">
                    Running Direct uploaded Native file: {activePlayVideo.title}
                  </div>
                </div>
              ) : (
                /* Falling back to our gorgeous self-contained simulation lesson blackboard engine! */
                <VideoPlayer 
                  videoFile={activePlayVideo.topicId === "geom" ? "geom_video_intro" : "maxmin_video_intro"}
                  onComplete={() => {}}
                />
              )}
            </div>

            {/* Bottom summary note description */}
            <div className="bg-[#FFFDF0] p-4 text-left border-t-4 border-black">
              <h4 className="font-sans font-black text-xs text-black uppercase tracking-tight flex items-center gap-1.5 mb-1.5">
                <Sparkles className="h-4 w-4 text-orange-500 fill-orange-300" />
                <span>Bhaiya's Core Study Summary Notes</span>
              </h4>
              <p className="font-sans text-xs text-zinc-700 leading-relaxed font-semibold bg-white p-3 rounded-lg border border-black/10">
                {activePlayVideo.description}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
