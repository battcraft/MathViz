import { useState, useEffect } from "react";
import { Mic, MicOff, Info } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

interface VoiceInputProps {
  onCommand: (command: "next" | "prev" | "done") => void;
}

export default function VoiceInput({ onCommand }: VoiceInputProps) {
  const { t } = useLanguage();
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [lastSpeech, setLastSpeech] = useState<string>("");

  useEffect(() => {
    // Check SpeechRecognition support (webkitSpeechRecognition is widely used in Chrome/Edge)
    const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechClass) {
      const rec = new SpeechClass();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "hi-IN"; // Set dialect voice to Hindi-India to recognize Hinglish words natively!

      rec.onresult = (event: any) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript.toLowerCase().trim();
        setLastSpeech(transcript);
        
        // Parse Hinglish voice commands
        if (transcript.includes("agla") || transcript.includes("next")) {
          onCommand("next");
        } else if (transcript.includes("pichla") || transcript.includes("prev") || transcript.includes("back") || transcript.includes("piche")) {
          onCommand("prev");
        } else if (transcript.includes("ho gaya") || transcript.includes("done") || transcript.includes("complete") || transcript.includes("sahi")) {
          onCommand("done");
        }
      };

      rec.onerror = (e: any) => {
        console.error("SpeechRecognition error:", e);
        if (e.error === "not-allowed") {
          setError("Microphone permission denied.");
        } else {
          setError(`Voice mode sleeping: ${e.error}`);
        }
        setListening(false);
      };

      rec.onend = () => {
        setListening(false);
      };

      setRecognition(rec);
    } else {
      setError("Speech API unsupported in this browser.");
    }
  }, [onCommand]);

  const toggleListening = () => {
    if (listening) {
      recognition?.stop();
    } else {
      setError(null);
      try {
        recognition?.start();
        setListening(true);
      } catch (e) {
        // Safe check
      }
    }
  };

  return (
    <div className="bg-[#FFE4B5] border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-full my-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              id="voice-mic-toggle-btn"
              onClick={toggleListening}
              className={`p-3 rounded-full border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 active:translate-x-0.5 active:translate-y-0.5 ${
                listening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
              title={listening ? "Stop Mic" : "Start Mic"}
            >
              {listening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            {listening && (
              <span className="absolute -top-1 -right-1 block h-3.5 w-3.5 rounded-full bg-red-600 ring-2 ring-black" />
            )}
          </div>
          <div>
            <h4 className="font-sans font-bold text-xs text-black uppercase tracking-wider">
              🎙️ Hands-Free voice nav
            </h4>
            <p className="text-[11px] font-mono text-zinc-700">
              {listening ? t("voiceActive") : t("voiceInactive")}
            </p>
          </div>
        </div>

        {listening && (
          <div className="px-2 py-1 bg-black text-xs font-mono text-[#FFD700] border border-[#FFD700] rounded">
            LIVE LISTENING...
          </div>
        )}
      </div>

      {/* Voice feedback & command logs */}
      {lastSpeech && (
        <div className="bg-white p-2 border-2 border-black rounded font-mono text-xs text-black">
          <span className="text-zinc-400">Heard: </span>
          <span className="text-red-500 font-bold">"{lastSpeech}"</span>
        </div>
      )}

      {/* Interactive Command Simulator fallback for easy sandbox usage */}
      <div className="border-t-2 border-dashed border-black/30 pt-2 text-[11px] font-mono text-zinc-800">
        <div className="flex items-center gap-1.5 font-bold mb-1">
          <Info className="h-3.5 w-3.5" />
          <span>Hinglish Speech Trainer commands:</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mt-1.5">
          <button
            id="voice-simulate-prev"
            onClick={() => { setLastSpeech("pichla"); onCommand("prev"); }}
            className="p-1 px-1.5 bg-zinc-200 text-black font-semibold border border-black rounded hover:bg-zinc-300"
          >
            "pichla" ⏪
          </button>
          <button
            id="voice-simulate-done"
            onClick={() => { setLastSpeech("ho gaya"); onCommand("done"); }}
            className="p-1 px-1.5 bg-green-200 text-black font-semibold border border-black rounded hover:bg-green-300"
          >
            "ho gaya" ✅
          </button>
          <button
            id="voice-simulate-next"
            onClick={() => { setLastSpeech("agla"); onCommand("next"); }}
            className="p-1 px-1.5 bg-zinc-200 text-black font-semibold border border-black rounded hover:bg-zinc-300"
          >
            "agla" ⏩
          </button>
        </div>
        {error && <p className="text-red-600 font-sans mt-2">{error}</p>}
      </div>
    </div>
  );
}
