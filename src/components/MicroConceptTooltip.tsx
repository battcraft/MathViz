import React from "react";

interface TooltipDef {
  title: string;
  emoji: string;
  definition: string;
}

const TOOLTIP_DEFS: Record<string, TooltipDef> = {
  bindu: {
    title: "Bindu (Point)",
    emoji: "📍",
    definition: "A geometric point has 0 dimensions. It has no width, no length, and no height. It only specifies an exact position in space (e.g., (X, Y) on a grid)!"
  },
  rekha: {
    title: "Rekha (Line)",
    emoji: "🛣️",
    definition: "A straight line has 1 dimension and stretches endlessly in both directions. It has 0 starting or ending points and is represented with double-ended arrows."
  },
  khand: {
    title: "Rekha-khand (Segment)",
    emoji: "📏",
    definition: "A segment is a finite piece of a line bounded by exactly 2 fixed endpoints. Its length can be measured precisely with a ruler!"
  },
  kiran: {
    title: "Kiran (Ray)",
    emoji: "🔦",
    definition: "A ray has 1 starting origin point and goes endlessly in one direction. Example: a laser beam or sunray starting from a source."
  },
  shikhar: {
    title: "Shikhar (Vertex)",
    emoji: "📐",
    definition: "A pointy corner apex where two straight lines, segments, or ray paths collide (like the corner tip of a triangular samosa)!"
  },
  max: {
    title: "Maximum (Max)",
    emoji: "📈",
    definition: "The absolute peak highest quantity in a list of numbers! (e.g., the highest score in a sports tournament)."
  },
  min: {
    title: "Minimum (Min)",
    emoji: "📉",
    definition: "The absolute lowest bottom quantity in a list of numbers! (e.g., the coldest sub-zero temperature or cheapest market rate)."
  },
  range: {
    title: "Range (Fasla)",
    emoji: "↕️",
    definition: "The distance from the baseline minimum to the peak maximum! Calculated mathematically as: Range = Maximum - Minimum."
  },
  decimals: {
    title: "Decimals (Dashamlav)",
    emoji: "🪙",
    definition: "Represent partial quantities with decimal fractions. Compare them digit by digit: Tenths (1/10) first, then Hundredths (1/100)!"
  },
  rounding: {
    title: "Rounding (Nikat-karan)",
    emoji: "👛",
    definition: "Finding the nearest round whole number to settle bills. If decimal part is 50 paise (.50) or more, round UP; otherwise, round DOWN!"
  },
  place: {
    title: "Place Value (Sthaniya Maan)",
    emoji: "🔐",
    definition: "The power/value of a digit depends on its position (Units, Tens, Hundreds, Thousands). In 9,842, the place value of 8 represents 800!"
  },
  order: {
    title: "Ascending Order (Kram)",
    emoji: "🧗",
    definition: "Arranging numbers chronologically from the absolute smallest (e.g., deepest sub-zero debt) to the largest value."
  }
};

interface MicroConceptTooltipProps {
  term: keyof typeof TOOLTIP_DEFS;
  children: React.ReactNode;
  key?: React.Key;
}

export function MicroConceptTooltip({ term, children }: MicroConceptTooltipProps) {
  const def = TOOLTIP_DEFS[term];
  if (!def) return <>{children}</>;

  return (
    <span className="relative group inline-block cursor-help border-b-2 border-dotted border-rose-500 font-bold hover:bg-rose-50/60 rounded px-0.5 transition-all text-rose-600">
      {children}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-950 text-white text-xs font-normal rounded-xl shadow-2xl hidden group-hover:block z-[999] leading-relaxed select-none pointer-events-none border border-zinc-800 text-left">
        <strong className="text-amber-400 font-sans font-black flex items-center gap-1 uppercase tracking-wider text-[10px] mb-1">
          <span>{def.emoji}</span> {def.title}
        </strong>
        <span className="text-zinc-300 font-sans block">{def.definition}</span>
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-zinc-950" />
      </span>
    </span>
  );
}

/**
 * Automatically injects tooltips for key mathematical terms
 */
export function injectConceptTooltips(text: string): React.ReactNode[] {
  if (!text) return [text];

  // Map words/reg-ex patterns to their term keys
  const patternMap: { regex: RegExp; term: keyof typeof TOOLTIP_DEFS }[] = [
    { regex: /\b(Bindu|Point|points)\b/gi, term: "bindu" },
    { regex: /\b(Rekha|infinite line)\b/gi, term: "rekha" },
    { regex: /\b(Rekha-khand|khand|segment|segments)\b/gi, term: "khand" },
    { regex: /\b(Kiran|laser ray|ray|rays)\b/gi, term: "kiran" },
    { regex: /\b(Shikhar|vertex|vertices|apex)\b/gi, term: "shikhar" },
    { regex: /\b(Maximum|absolute peak|MAX)\b/gi, term: "max" },
    { regex: /\b(Minimum|absolute coldest|absolute cheapest|MIN)\b/gi, term: "min" },
    { regex: /\b(Range|Fasla|temperature range|price range)\b/gi, term: "range" },
    { regex: /\b(decimals|decimal places|tenths|hundredths)\b/gi, term: "decimals" },
    { regex: /\b(Rounding|nearest whole rupee|round off)\b/gi, term: "rounding" },
    { regex: /\b(Place Value|positional value|thousands column|thousands digit|hundreds place)\b/gi, term: "place" },
    { regex: /\b(Ascending Order|ascending|climbing down stairs|deepest negative)\b/gi, term: "order" }
  ];

  // We split the text recursively using the mapping patterns
  let segments: Array<{ text: string; term?: keyof typeof TOOLTIP_DEFS }> = [{ text }];

  for (const { regex, term } of patternMap) {
    const nextSegments: typeof segments = [];
    for (const seg of segments) {
      if (seg.term) {
        nextSegments.push(seg);
        continue;
      }
      const parts = seg.text.split(regex);
      // Wait, splitting by regex with capture group returns the matched elements as well!
      // To preserve case and capture correctly, we can split using capturing parenthesis:
      const matches = seg.text.match(regex);
      if (matches && matches.length > 0) {
        let currentText = seg.text;
        for (const match of matches) {
          const index = currentText.indexOf(match);
          if (index !== -1) {
            const before = currentText.substring(0, index);
            if (before) nextSegments.push({ text: before });
            nextSegments.push({ text: match, term });
            currentText = currentText.substring(index + match.length);
          }
        }
        if (currentText) {
          nextSegments.push({ text: currentText });
        }
      } else {
        nextSegments.push(seg);
      }
    }
    segments = nextSegments;
  }

  return segments.map((seg, i) => {
    if (seg.term) {
      return (
        <MicroConceptTooltip key={i} term={seg.term}>
          {seg.text}
        </MicroConceptTooltip>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}
