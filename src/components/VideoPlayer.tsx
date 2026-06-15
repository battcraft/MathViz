import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Play, Pause, RotateCcw, Volume2, Maximize2, SkipForward, SkipBack } from "lucide-react";

interface VideoPlayerProps {
  videoFile: string;
  onComplete: () => void;
}

export default function VideoPlayer({ videoFile, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60); // default simulated total length of 1 min
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Since video files might be placeholders locally, we also run a timer to simulate progress
  // if the native media fails to load or download.
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            onComplete();
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration, onComplete]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    // Control real native video if loaded
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Ignore if source file doesn't exist on server yet
        });
      }
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  const skipForward = () => {
    setCurrentTime((prev) => Math.min(prev + 10, duration));
  };

  const skipBackward = () => {
    setCurrentTime((prev) => Math.max(prev - 10, 0));
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="relative bg-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden max-w-full my-4 font-mono">
      {/* 1. Header Banner */}
      <div className="bg-[#FFD700] px-3 py-1 flex items-center justify-between border-b-4 border-black text-xs font-bold text-black text-center select-none uppercase">
        <span>🎬 TV: {videoFile}</span>
        {isPlaying ? (
          <span className="bg-red-500 text-white px-2 py-0.5 rounded animate-pulse">
            ● PLAYING
          </span>
        ) : (
          <span className="bg-gray-700 text-white px-2 py-0.5 rounded">
            PAUSED
          </span>
        )}
      </div>

      {/* 2. Main Stage with Video or Mock animation */}
      <div className="relative aspect-video flex flex-col items-center justify-center bg-zinc-900 overflow-hidden">
        {/* Real hidden/visible video element */}
        <video
          ref={videoRef}
          src={`/videos/${videoFile}`}
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          playsInline
          onEnded={() => {
            setIsPlaying(false);
            onComplete();
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration || 60);
          }}
        />

        {/* Playable Vector Animation Centerpiece */}
        <div className="z-10 flex flex-col items-center justify-center p-4 text-center">
          <div className={`text-6xl mb-3 transition-transform duration-500 ${isPlaying ? "scale-110 rotate-6" : "scale-100"}`}>
            🎥
          </div>
          <p className="text-[#FFD700] text-sm font-bold uppercase tracking-widest px-2 py-1 bg-black/70 rounded">
            {videoFile.replace("FINAL_", "").replace(".mp4", "").split("_").join(" ")}
          </p>
          <p className="text-zinc-400 text-xs mt-1">Hinglish Animation Lesson</p>

          <div className="h-2 w-48 bg-zinc-800 rounded-full mt-4 overflow-hidden border border-black">
            <div 
              className="h-full bg-[#FFD700] transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Big overlay Play Button when paused */}
        {!isPlaying && (
          <button
            id="video-play-overlay"
            onClick={handlePlayToggle}
            className="absolute z-20 p-5 bg-[#FFD700] hover:bg-[#FFC000] border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-110 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Play className="h-8 w-8 text-black fill-black" />
          </button>
        )}
      </div>

      {/* 3. Neo-Brutalist Controls Bar */}
      <div className="bg-zinc-950 p-4 border-t-4 border-black flex flex-col gap-3">
        {/* Progress Timeline */}
        <div className="flex items-center gap-3">
          <span className="text-white text-xs">{formatTime(currentTime)}</span>
          <input
            id="video-progress-slider"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-[#FFD700] bg-zinc-800 h-1.5 cursor-pointer rounded-lg"
          />
          <span className="text-zinc-400 text-xs">{formatTime(duration)}</span>
        </div>

        {/* Core Controls Row */}
        <div className="flex items-center justify-between text-white flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              id="video-prev-btn"
              onClick={skipBackward}
              title="Minus 10s"
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border-2 border-black rounded shadow-[1px_1px_0px_0px_white]"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              id="video-play-pause-btn"
              onClick={handlePlayToggle}
              className="p-2 bg-[#FFD700] text-black border-2 border-black font-bold uppercase rounded shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] hover:bg-[#FFC000]"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-black" /> : <Play className="h-5 w-5 fill-black" />}
            </button>
            <button
              id="video-next-btn"
              onClick={skipForward}
              title="Plus 10s"
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border-2 border-black rounded shadow-[1px_1px_0px_0px_white]"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-zinc-400" />
            <input
              id="video-volume-slider"
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-[#FFD700] bg-zinc-800 cursor-pointer"
            />
            <button
              id="video-fullscreen-btn"
              onClick={() => {
                if (videoRef.current && videoRef.current.requestFullscreen) {
                  videoRef.current.requestFullscreen();
                }
              }}
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border-2 border-black rounded shadow-[1px_1px_0px_0px_white]"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
