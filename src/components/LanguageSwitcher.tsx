import { useLanguage } from "../lib/LanguageContext";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 bg-white border-2 border-black p-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
      <Languages className="h-4 w-4 text-zinc-500 ml-1 flex-shrink-0" />
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-transparent border-0 font-bold focus:ring-0 cursor-pointer text-black"
      >
        <option value="en" className="bg-white text-black text-xs font-mono font-bold">English (EN)</option>
        <option value="hi" className="bg-white text-black text-xs font-mono font-bold">Hinglish (HI)</option>
        <option value="simple-hi" className="bg-white text-black text-xs font-mono font-bold">Simple Hinglish</option>
      </select>
    </div>
  );
}
