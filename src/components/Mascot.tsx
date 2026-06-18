import React from "react";

interface MascotProps {
  mood?: "happy" | "thinking" | "teaching" | "celebrating";
  className?: string;
  size?: number;
}

const moods: Record<string, { eyes: string; mouth: string; brows: string; accessory: string }> = {
  happy: {
    eyes: "M58 48 Q62 44 66 48",
    mouth: "M56 58 Q62 66 68 58",
    brows: "M54 40 Q58 37 62 40",
    accessory: "🌟",
  },
  thinking: {
    eyes: "M56 48 L64 48 M60 48 L60 48",
    mouth: "M58 60 Q62 60 66 60",
    brows: "M54 38 Q58 34 62 38",
    accessory: "🤔",
  },
  teaching: {
    eyes: "M56 46 Q60 42 64 46",
    mouth: "M56 56 Q62 60 68 56",
    brows: "M52 36 Q58 32 64 36",
    accessory: "📐",
  },
  celebrating: {
    eyes: "M56 46 Q60 42 64 46",
    mouth: "M54 54 Q62 66 70 54",
    brows: "M52 36 Q58 32 64 36",
    accessory: "🎉",
  },
};

export default function Mascot({ mood = "happy", className = "", size = 120 }: MascotProps) {
  const m = moods[mood] ?? moods.happy;
  const scale = size / 120;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={`Rekha Didi — ${mood}`}
    >
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFDAB9" />
          <stop offset="100%" stopColor="#F5C392" />
        </radialGradient>
        <radialGradient id="sareeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#E04040" />
        </radialGradient>
      </defs>

      {/* Hair Bun */}
      <circle cx="60" cy="22" r="16" fill="#1A1A2E" />
      <circle cx="60" cy="18" r="8" fill="#16213E" opacity="0.6" />

      {/* Head */}
      <circle cx="60" cy="40" r="22" fill="url(#skinGrad)" />

      {/* Hair sides */}
      <path d="M38 38 Q36 30 40 24 Q44 18 50 18" fill="#1A1A2E" />
      <path d="M82 38 Q84 30 80 24 Q76 18 70 18" fill="#1A1A2E" />

      {/* Ears */}
      <ellipse cx="38" cy="42" rx="5" ry="7" fill="#F5C392" />
      <ellipse cx="82" cy="42" rx="5" ry="7" fill="#F5C392" />

      {/* Eyes */}
      <path d={m.eyes} fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pupils */}
      {mood === "thinking" ? (
        <>
          <circle cx="58" cy="47" r="1.5" fill="#1A1A2E" />
          <circle cx="64" cy="47" r="1.5" fill="#1A1A2E" />
        </>
      ) : (
        <>
          <circle cx="60" cy="47" r="2.5" fill="#1A1A2E" />
          <circle cx="64" cy="47" r="2.5" fill="#1A1A2E" />
        </>
      )}

      {/* Eyebrows */}
      <path d={m.brows} fill="none" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" />

      {/* Nose */}
      <path d="M60 50 Q62 54 60 56" fill="none" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mouth */}
      <path d={m.mouth} fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="48" cy="56" rx="6" ry="4" fill="#FF9999" opacity="0.3" />
      <ellipse cx="72" cy="56" rx="6" ry="4" fill="#FF9999" opacity="0.3" />

      {/* Saree pallu / dupatta */}
      <path d="M40 58 Q30 70 28 85 Q26 95 32 100" stroke="url(#sareeGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M80 58 Q90 70 92 85 Q94 95 88 100" stroke="url(#sareeGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M32 100 Q36 96 40 100" fill="url(#sareeGrad)" />

      {/* Bindi */}
      <circle cx="60" cy="30" r="2.5" fill="#E91E8C" />

      {/* Glasses (teaching mode) */}
      {mood === "teaching" && (
        <>
          <circle cx="55" cy="46" r="9" fill="none" stroke="#1A1A2E" strokeWidth="1.2" />
          <circle cx="67" cy="46" r="9" fill="none" stroke="#1A1A2E" strokeWidth="1.2" />
          <path d="M64 46 L67 46" stroke="#1A1A2E" strokeWidth="1.2" />
        </>
      )}

      {/* Body / blouse */}
      <path d="M48 60 L44 105 L76 105 L72 60" fill="url(#sareeGrad)" />

      {/* Hands */}
      <path d="M44 74 Q34 86 38 96" fill="none" stroke="#F5C392" strokeWidth="4" strokeLinecap="round" />
      <path d="M76 74 Q86 86 82 96" fill="none" stroke="#F5C392" strokeWidth="4" strokeLinecap="round" />

      {/* Chalkboard pointer (teaching) */}
      {mood === "teaching" && (
        <line x1="82" y1="80" x2="100" y2="60" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Sparkles (celebrating) */}
      {mood === "celebrating" && (
        <>
          <text x="30" y="20" fontSize="10" textAnchor="middle">⭐</text>
          <text x="90" y="18" fontSize="8" textAnchor="middle">✨</text>
          <text x="20" y="55" fontSize="8" textAnchor="middle">✨</text>
          <text x="100" y="50" fontSize="8" textAnchor="middle">⭐</text>
        </>
      )}

      {/* Emoji accessory */}
      <text x="60" y="112" fontSize="9" textAnchor="middle" fill="#666">
        {m.accessory}
      </text>
    </svg>
  );
}
