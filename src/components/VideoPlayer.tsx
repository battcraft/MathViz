import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Play, Pause, RotateCcw, Volume2, Maximize2, SkipForward, SkipBack, Sparkles, VolumeX, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VideoPlayerProps {
  videoFile: string;
  onComplete: () => void;
}

// Exhaustive Hinglish lessons transcript matched to active micro-concepts/videos
const BHAIYA_LESSONS: Record<string, { topic: string; english: string; hinglish: string; elements: string[] }> = {
  "FINAL_geometry_intro.mp4": {
    topic: "Basic Geometry & Coordinates",
    english: "Welcome student! Today we build our basic shapes of geometry. Points, lines, and line-segments are the building blocks of math, games, and cartesian planes. Let's study how they stretch locally and globally!",
    hinglish: "Aao bacho! Aaj hum geometry ke basic dhasu concepts seekhenge. Bindu matlab point, Rekha matlab line aur Kiran matlab Ray. Inke bina cartesian coordinate system adhura hai! Sabse pehle, dhyan se boards ko dekho aur rules samjho.",
    elements: ["Point (0D)", "Line (1D Infinite)", "Segment (Fixed Ends)", "Ray (Half Infinite)"]
  },
  "FINAL_maxmin_intro.mp4": {
    topic: "Maximum, Minimum and Range",
    english: "Let's learn Max, Min and the Range! Maximum is the absolute highest peak value in any dataset, and Minimum represents the absolute lowest value. Subtract minimum from maximum to calculate the local Range boundary!",
    hinglish: "Doston, chalo Maximum, Minimum aur Range, yaani fasla nikalna seekhein. Max matlab sabse uncha value! Min matlab sabse chhota aur sasta number! Jab hum Max me se Min minus karte hain, toh milta hai Range!",
    elements: ["Highest Value (Max)", "Lowest Value (Min)", "Subtract Max - Min", "Fasla / Boundary Range"]
  }
};

export default function VideoPlayer({ videoFile, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(45); // default custom lesson size
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  // Custom interactive dual view modes: "video" (native file) vs "blackboard" (AI/Audio narration)
  const [viewMode, setViewMode] = useState<"video" | "blackboard">("blackboard");
  const [nativeLoadError, setNativeLoadError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== "undefined" ? window.speechSynthesis : null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Retrieve current subtopic details based on active lesson context
  const lessonData = BHAIYA_LESSONS[videoFile] || {
    topic: "Delhi Street Math Lesson",
    english: "Let's explore real-world street calculations and smart bargaining logic in Hinglish!",
    hinglish: "Chalo math ke is dhasu lesson mein badhiya bargaining aur standard ranges seekhte hain!",
    elements: ["Street Savy Math", "CBSE Core Concept", "Bargaining Master", "Active Whiteboard"]
  };

  // Sync state transitions with text-to-speech engine
  useEffect(() => {
    if (isPlaying) {
      speakAudio();
    } else {
      pauseAudio();
    }
    return () => {
      cancelAudio();
    };
  }, [isPlaying, videoFile]);

  // Simulated scrubber progress if there's no native video playing
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && (viewMode === "blackboard" || nativeLoadError)) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            cancelAudio();
            onComplete();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, duration, viewMode, nativeLoadError]);

  // Standard Voice Synthesis (TTS) trigger
  const speakAudio = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel(); // clean existing lines

    // Speech text combining English & Hinglish details
    const speakText = `Class starting now! Topic is ${lessonData.topic}. Bhaiya says: ${lessonData.hinglish}. In english: ${lessonData.english}`;
    
    const utterance = new SpeechSynthesisUtterance(speakText);
    utteranceRef.current = utterance;

    // Search for suitable Hinglish or Indian/British English voices for a sweet Hinglish experience
    const voices = synthRef.current.getVoices();
    const optimalVoice = voices.find(v => v.lang.includes("en-IN") || v.lang.includes("hi") || v.lang.includes("en-GB")) || voices[0];
    if (optimalVoice) {
      utterance.voice = optimalVoice;
    }

    utterance.volume = isMuted ? 0 : volume;
    utterance.rate = 1.05; // conversational energetic speed
    utterance.pitch = 1.1; // energetic tone

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(duration);
      onComplete();
    };

    utterance.onerror = () => {
      // safe fallback on browser restrictions
    };

    synthRef.current.speak(utterance);
  };

  const pauseAudio = () => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.pause();
    }
  };

  const resumeAudio = () => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
    } else {
      speakAudio();
    }
  };

  const cancelAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const handlePlayToggle = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (viewMode === "video" && videoRef.current && !nativeLoadError) {
      if (nextPlaying) {
        videoRef.current.play().catch(() => {
          // Native file is missing, automatically toggle to smart AI board fallback!
          setNativeLoadError(true);
          setViewMode("blackboard");
          speakAudio();
        });
      } else {
        videoRef.current.pause();
      }
    } else {
      // Audio Board flow
      if (nextPlaying) {
        resumeAudio();
      } else {
        pauseAudio();
      }
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    if (videoRef.current && viewMode === "video" && !nativeLoadError) {
      videoRef.current.currentTime = value;
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    if (utteranceRef.current) utteranceRef.current.volume = isMuted ? 0 : val;
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current) videoRef.current.muted = nextMute;
    if (synthRef.current) {
      // Toggle TTS volume on the fly
      if (nextMute) {
        synthRef.current.cancel();
      } else {
        if (isPlaying) speakAudio();
      }
    }
  };

  const restartLesson = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    cancelAudio();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    setTimeout(() => {
      setIsPlaying(true);
      if (viewMode === "video" && videoRef.current && !nativeLoadError) {
        videoRef.current.play().catch(() => {
          setNativeLoadError(true);
          setViewMode("blackboard");
          speakAudio();
        });
      } else {
        speakAudio();
      }
    }, 200);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Chalkboard render animations representing different geometric coordinates and ranges
  const renderWhiteboardCanvas = () => {
    const stepRatio = currentTime / duration;
    const isGeometry = videoFile.includes("geom") || videoFile.includes("geometry");

    return (
      <div className="relative w-full h-full bg-[#1A3D31] text-white flex flex-col justify-between p-4 font-mono select-none overflow-hidden rounded-md border-2 border-emerald-950">
        {/* Board subtle guidelines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Top Header */}
        <div className="z-10 flex justify-between items-center text-xs border-b border-white/20 pb-1.5">
          <span className="text-emerald-300 font-extrabold flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            LIVE CHALKBOARD EXPLAINER VIDEOS
          </span>
          <span className="bg-[#FFD700] text-black font-black px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider">
            Vector Animation Enabled
          </span>
        </div>

        {/* Main Central Blackboard Illustration Box */}
        <div className="z-10 flex-grow flex flex-col items-center justify-center my-2 relative min-h-[170px] overflow-hidden">
          <AnimatePresence mode="wait">
            {isGeometry ? (
              <motion.div
                key={`geom_${Math.floor(stepRatio * 4)}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col items-center justify-center relative text-center"
              >
                {/* Math Coordinate Cartesian Grid Container */}
                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid center axis */}
                  <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {stepRatio < 0.25 && (
                  <div className="flex flex-col items-center relative z-10 w-full">
                    {/* Animated point vector drawing */}
                    <svg className="w-48 h-20 overflow-visible" viewBox="0 0 200 80">
                      {/* Pulse rings */}
                      <motion.circle
                        cx="100"
                        cy="40"
                        r="25"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: [0, 1.6], opacity: [0.8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.circle
                        cx="100"
                        cy="40"
                        r="12"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2], opacity: [1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                      />
                      {/* Center Point */}
                      <motion.circle
                        cx="100"
                        cy="40"
                        r="6"
                        fill="#FFD700"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      />
                      {/* Coordinate lines */}
                      <motion.line
                        x1="100"
                        y1="40"
                        x2="100"
                        y2="80"
                        stroke="rgba(255,255,255,0.6)"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.line
                        x1="100"
                        y1="40"
                        x2="0"
                        y2="40"
                        stroke="rgba(255,255,255,0.6)"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs font-black text-yellow-300 mt-2 bg-black/40 px-2.5 py-0.5 rounded-full border border-yellow-300/30"
                    >
                      PINPOINT POINT (BINDU A) • (50, 40)
                    </motion.span>
                    <span className="text-[10px] text-zinc-300 mt-1 max-w-xs italic leading-tight">
                      "Binds coordinates with 0 dimension density in mathematical space"
                    </span>
                  </div>
                )}

                {stepRatio >= 0.25 && stepRatio < 0.50 && (
                  <div className="flex flex-col items-center relative z-10 w-full px-4">
                    {/* Infinite Line Drawing with interactive paths */}
                    <svg className="w-64 h-24 overflow-visible" viewBox="0 0 300 80">
                      {/* X positions */}
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                        </marker>
                      </defs>

                      {/* Infinite stretching line vector */}
                      <motion.line
                        x1="10"
                        y1="40"
                        x2="290"
                        y2="40"
                        stroke="#38BDF8"
                        strokeWidth="3"
                        markerStart="url(#arrow)"
                        markerEnd="url(#arrow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />

                      {/* Moving points along infinite line */}
                      <motion.circle
                        cx="70"
                        cy="40"
                        r="4"
                        fill="#FFF"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.text x="65" y="30" fill="#38BDF8" className="text-[9px] font-bold">X</motion.text>

                      <motion.circle
                        cx="150"
                        cy="40"
                        r="4"
                        fill="#FFF"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.text x="145" y="30" fill="#38BDF8" className="text-[9px] font-bold">Y</motion.text>

                      <motion.circle
                        cx="230"
                        cy="40"
                        r="4"
                        fill="#FFF"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <motion.text x="225" y="30" fill="#38BDF8" className="text-[9px] font-bold">Z</motion.text>
                    </svg>

                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-xs font-black text-[#38BDF8] bg-black/40 px-2.5 py-0.5 rounded-full border border-sky-400/30"
                    >
                      INFINITE REKHA (LINE)
                    </motion.span>
                    <p className="text-[10px] text-zinc-300 max-w-sm mt-1">
                      "Stretching anant left & right endlessly with arrowheads of infinity!"
                    </p>
                  </div>
                )}

                {stepRatio >= 0.50 && stepRatio < 0.75 && (
                  <div className="flex flex-col items-center relative z-10 w-full px-4">
                    {/* Fixed Line Segment (Khand) */}
                    <svg className="w-64 h-24 overflow-visible" viewBox="0 0 300 80">
                      {/* Left endpoint */}
                      <motion.circle
                        cx="60"
                        cy="40"
                        r="7"
                        fill="#22C55E"
                        stroke="#FFF"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      />
                      <motion.text x="54" y="24" fill="#22C55E" className="text-[10px] font-extrabold">C (Start)</motion.text>

                      {/* Bridge Line Segment */}
                      <motion.line
                        x1="60"
                        y1="40"
                        x2="240"
                        y2="40"
                        stroke="#22C55E"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                      />

                      {/* Right endpoint */}
                      <motion.circle
                        cx="240"
                        cy="40"
                        r="7"
                        fill="#22C55E"
                        stroke="#FFF"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                      />
                      <motion.text x="234" y="24" fill="#22C55E" className="text-[10px] font-extrabold">D (End)</motion.text>

                      {/* Ruler ticks and coordinate distance info */}
                      <motion.text
                        x="110"
                        y="58"
                        fill="#E2E8F0"
                        className="text-[9px] font-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        📐 MEASUREABLE: 15 cm
                      </motion.text>
                    </svg>

                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-xs font-black text-green-400 bg-black/40 px-2.5 py-0.5 rounded-full border border-green-400/30"
                    >
                      LINE SEGMENT (KHAND CD)
                    </motion.span>
                    <p className="text-[10px] text-zinc-300 max-w-sm mt-1">
                      "Bound strictly by 2 endpoints. Zero infinity, perfectly measurable!"
                    </p>
                  </div>
                )}

                {stepRatio >= 0.75 && (
                  <div className="flex flex-col items-center relative z-10 w-full px-4">
                    {/* Sunlight Ray (Kiran) */}
                    <svg className="w-64 h-24 overflow-visible" viewBox="0 0 300 80">
                      {/* Fixed Anchor Sun */}
                      <defs>
                        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#FBBF24" stopOpacity="1" />
                          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      {/* Glowing Sun Base */}
                      <motion.circle
                        cx="50"
                        cy="40"
                        r="20"
                        fill="url(#sunGlow)"
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <motion.circle
                        cx="50"
                        cy="40"
                        r="6"
                        fill="#FBBF24"
                        stroke="#FFF"
                        strokeWidth="2.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 180 }}
                      />
                      <motion.text x="32" y="22" fill="#FBBF24" className="text-[9px] font-extrabold">START ☀️</motion.text>

                      {/* Infinite beam shoot right */}
                      <motion.line
                        x1="50"
                        y1="40"
                        x2="260"
                        y2="40"
                        stroke="#FBBF24"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                      />

                      {/* Arrowhead point */}
                      <motion.polygon
                        points="260,34 272,40 260,46"
                        fill="#FBBF24"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      />
                      <motion.text x="245" y="22" fill="#FBBF24" className="text-[9px] font-black">INFINITY ➔</motion.text>
                    </svg>

                    <motion.span
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-xs font-black text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-amber-300/30"
                    >
                      SUN RAY (KIRAN)
                    </motion.span>
                    <p className="text-[10px] text-zinc-300 max-w-sm mt-1">
                      "Locked source at start, and flies outbound into the cosmos forever!"
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`stat_${Math.floor(stepRatio * 3)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col items-center justify-center relative text-center"
              >
                {stepRatio < 0.40 && (
                  <div className="flex flex-col items-center relative z-10 w-full px-4">
                    {/* Highlighting Peak Maximum */}
                    <div className="flex items-end justify-center gap-4 h-24 border-b-2 border-dashed border-white/20 pb-1 w-64">
                      {/* Bar 1 (Normal) */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[9px] text-zinc-400 font-bold">12</span>
                        <motion.div
                          className="w-10 bg-zinc-600 rounded-md border border-white/10"
                          initial={{ height: 0 }}
                          animate={{ height: 25 }}
                          transition={{ type: "spring", stiffness: 120, damping: 10 }}
                        />
                        <span className="text-[8px] text-zinc-400">A</span>
                      </div>

                      {/* Bar 2 (Normal) */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[9px] text-zinc-400 font-bold">18</span>
                        <motion.div
                          className="w-10 bg-zinc-500 rounded-md border border-white/10"
                          initial={{ height: 0 }}
                          animate={{ height: 35 }}
                          transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.15 }}
                        />
                        <span className="text-[8px] text-zinc-400">B</span>
                      </div>

                      {/* Bar 3 (Absolute Max) */}
                      <div className="flex flex-col items-center gap-1">
                        {/* Golden Glowing Star Indicator */}
                        <motion.div
                          animate={{ y: [0, -3, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-[10px] bg-yellow-400 text-black font-black px-1 py-0.2 rounded"
                        >
                          👑 MAX
                        </motion.div>
                        <span className="text-[12px] text-yellow-300 font-black">Rs 120</span>
                        <motion.div
                          className="w-12 bg-amber-400 rounded-md border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                          initial={{ height: 0 }}
                          animate={{ height: 75 }}
                          transition={{ type: "spring", stiffness: 120, damping: 8, delay: 0.3 }}
                        />
                        <span className="text-[9px] text-amber-300 font-bold">PEAK</span>
                      </div>
                    </div>

                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs font-black text-yellow-300 mt-2.5 bg-black/40 px-2.5 py-0.5 rounded-full border border-yellow-300/30"
                    >
                      MAXIMUM VALUE: PEAK BAZAAR RECORD
                    </motion.span>
                    <p className="text-[10px] text-zinc-300 max-w-sm">
                      "The ultimate apex peak in your whole dataset. High-end baseline!"
                    </p>
                  </div>
                )}

                {stepRatio >= 0.40 && stepRatio < 0.75 && (
                  <div className="flex flex-col items-center relative z-10 w-full px-4">
                    {/* Minimum spotlight display */}
                    <div className="flex items-end justify-center gap-4 h-24 border-b-2 border-dashed border-white/20 pb-1 w-64">
                      {/* Bar 1 (Absolute Minimum - spotlight focused!) */}
                      <div className="relative flex flex-col items-center gap-1">
                        <div className="absolute top-0 bottom-0 inset-x-0 bg-red-500/10 rounded-full blur animate-pulse" />
                        <motion.div
                          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="text-[9px] bg-red-500 text-white font-black px-1 rounded uppercase tracking-tighter"
                        >
                          MIN 🎯
                        </motion.div>
                        <span className="text-[12px] text-red-300 font-black">Rs 2</span>
                        <motion.div
                          className="w-12 bg-red-400 rounded-md border-2 border-red-200"
                          initial={{ height: 10 }}
                          animate={{ height: 18 }}
                          transition={{ type: "spring", stiffness: 100 }}
                        />
                        <span className="text-[9px] text-red-300 font-bold">BASE</span>
                      </div>

                      {/* Bar 2 */}
                      <div className="flex flex-col items-center gap-1 opacity-40">
                        <span className="text-[9px] text-zinc-400 font-bold">45</span>
                        <div className="w-10 bg-zinc-500 h-[48px] rounded-md" />
                        <span className="text-[8px] text-zinc-400">X</span>
                      </div>

                      {/* Bar 3 */}
                      <div className="flex flex-col items-center gap-1 opacity-40">
                        <span className="text-[9px] text-zinc-400 font-bold">80</span>
                        <div className="w-10 bg-zinc-500 h-[68px] rounded-md" />
                        <span className="text-[8px] text-zinc-400">Y</span>
                      </div>
                    </div>

                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs font-black text-red-300 mt-2.5 bg-black/40 px-2.5 py-0.5 rounded-full border border-red-400/30"
                    >
                      MINIMUM VALUE: FLOOR RATE
                    </motion.span>
                    <p className="text-[10px] text-zinc-300 max-w-sm">
                      "Lowest scale metric option. The cheapest street bargained dealer point!"
                    </p>
                  </div>
                )}

                {stepRatio >= 0.75 && (
                  <div className="flex flex-col items-center relative z-10 w-full px-4 text-center">
                    {/* Math Operator subtraction illustration card with spring entrance */}
                    <motion.div
                      className="bg-zinc-850 p-3 border-2 border-dashed border-yellow-400 text-yellow-300 rounded-2xl shadow-xl max-w-xs mb-2 flex flex-col gap-1"
                      initial={{ rotate: -5, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <span className="text-[9px] uppercase text-zinc-400 font-bold tracking-widest">
                        Fasla calculation Formula
                      </span>
                      <div className="text-sm font-black text-white flex items-center justify-center gap-1.5 font-mono">
                        <span className="bg-amber-400 text-black px-1 rounded">120 Max</span>
                        <span className="text-zinc-400 font-bold">-</span>
                        <span className="bg-red-500 text-white px-1 rounded">2 Min</span>
                        <span className="text-zinc-400 font-bold">=</span>
                        <span className="bg-[#38BDF8] text-black px-2 rounded font-black">118 Range</span>
                      </div>
                    </motion.div>

                    <svg className="w-60 h-10 overflow-visible" viewBox="0 0 200 30">
                      {/* Interactive boundary layout spacer indicator */}
                      <line x1="10" y1="15" x2="190" y2="15" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3"/>
                      <circle cx="10" cy="15" r="4" fill="#EF4444"/>
                      <circle cx="190" cy="15" r="4" fill="#FBBF24"/>
                    </svg>

                    <motion.span
                      initial={{ y: 5 }}
                      animate={{ y: 0 }}
                      className="text-xs font-black text-[#38BDF8] bg-black/40 px-2.5 py-0.5 rounded-full border border-sky-400/30"
                    >
                      FASLA (RANGE BOUNDARY)
                    </motion.span>
                    <p className="text-[10px] text-zinc-300 max-w-sm leading-tight mt-1">
                      "Subtract cheapest (Min) from ultimate Peak (Max) to evaluate intervals."
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Dialogue Box with active transcripts */}
        <div className="z-10 bg-black/75 p-2.5 rounded-xl border border-white/10 text-left min-h-[50px] flex items-center gap-2">
          <span className="text-lg grow-0 shrink-0 select-none animate-bounce">🧔</span>
          <p className="text-[10.5px] leading-relaxed font-sans text-emerald-200">
            {stepRatio < 0.50 ? (
              <span><strong>Bhaiya says:</strong> "{lessonData.hinglish.slice(0, 100)}..."</span>
            ) : (
              <span><strong>In English:</strong> "{lessonData.english.slice(0, 110)}..."</span>
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div id="school-video-player" className="relative bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden max-w-full font-mono">
      {/* 1. Header Banner */}
      <div className="bg-[#FFD700] px-4 py-2 flex items-center justify-between border-b-4 border-black text-xs font-black text-black select-none uppercase">
        <span className="flex items-center gap-1">🎬 Class: {lessonData.topic}</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === "video" ? "blackboard" : "video")}
            className="px-2 py-0.5 bg-black text-[#FFD700] border border-black rounded text-[9px] font-bold hover:bg-neutral-800"
            title="Toggle between Video mp4 File and interactive AI chalkboard"
          >
            {viewMode === "video" ? "📺 Switch to Board" : "🎬 Switch to Video File"}
          </button>
          
          {isPlaying ? (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[9px] border border-black animate-pulse">
              ● PLAYING SOUND
            </span>
          ) : (
            <span className="bg-zinc-800 text-white px-2 py-0.5 rounded text-[9px]">
              PAUSED
            </span>
          )}
        </div>
      </div>

      {/* 2. Main Stage with video frame vs Chalk simulation */}
      <div className="relative aspect-video flex flex-col items-center justify-center bg-zinc-950 overflow-hidden box-border p-3">
        {viewMode === "video" && (
          <video
            ref={videoRef}
            src={`/videos/${videoFile}`}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            onEnded={() => {
              setIsPlaying(false);
              onComplete();
            }}
            onError={() => {
              // Automatically recover to active Blackboard voice fallback if file doesn't exist
              setNativeLoadError(true);
              setViewMode("blackboard");
              if (isPlaying) speakAudio();
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration || 45);
            }}
          />
        )}

        {/* Main visual display fallback for interactive AI boarding */}
        {(viewMode === "blackboard" || nativeLoadError) && renderWhiteboardCanvas()}

        {/* Big Overlay Play / Pause Action Button when idle */}
        {!isPlaying && (
          <button
            onClick={handlePlayToggle}
            className="absolute z-20 p-5 bg-[#FFC700] hover:bg-[#FFB700] border-4 border-black rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:translate-y-0.5 transition-all text-black cursor-pointer"
            title="Start Audio Lesson Now"
          >
            <Play className="h-8 w-8 text-black fill-black" />
          </button>
        )}
      </div>

      {/* 3. Core Lesson Controls */}
      <div className="bg-zinc-950 p-4 border-t-4 border-black flex flex-col gap-3">
        {/* Timeline bar */}
        <div className="flex items-center gap-3">
          <span className="text-white text-[11px] font-bold">{formatTime(currentTime)}</span>
          <input
            id="timeline-scroller"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-[#FFC700] bg-zinc-805 h-2 cursor-pointer rounded-lg border border-white/20"
          />
          <span className="text-zinc-400 text-[11px] font-bold">{formatTime(duration)}</span>
        </div>

        {/* Control mechanics */}
        <div className="flex items-center justify-between text-white flex-wrap gap-2">
          {/* Audio controller buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={restartLesson}
              title="Restart classroom"
              className="p-2 bg-zinc-800 hover:bg-zinc-700 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_white] active:translate-y-0.5"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handlePlayToggle}
              className="px-4 py-2 bg-[#FFC700] hover:bg-[#FFA500] text-black border-2 border-black font-black uppercase rounded-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] flex items-center gap-1 text-xs cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 fill-black" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-black" /> Play Lesson
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Volume indicator */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white"
                title={isMuted ? "Unmute sound" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                id="sound-control"
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-[#FFC700] rounded bg-zinc-800 cursor-pointer"
              />
            </div>

            {/* Quick Helper Note */}
            <span className="text-[10px] text-zinc-500 font-bold border border-zinc-800 px-2 py-0.5 rounded bg-zinc-900 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" /> Voice Supported
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
