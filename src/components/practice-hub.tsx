import { useState } from "react";
import { PhrasesPanel } from "@/components/phrases-panel";
import { PracticePanel } from "@/components/practice-panel";
import { PrepositionsPanel } from "@/components/prepositions-panel";
import { UI_TEXT, type Language } from "@/lib/language";
import { cn } from "@/lib/utils";

export function PracticeHub({ language = "pt" }: { language?: Language }) {
  const text = UI_TEXT[language];
  const [drill, setDrill] = useState<"verbos" | "frases" | "prep">("verbos");
  const drills = [
    { id: "verbos" as const, label: text.verbs },
    { id: "frases" as const, label: text.phrases },
    { id: "prep" as const, label: text.prep },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-2 p-1">
        {drills.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setDrill(item.id)}
            className={cn(
              "h-10 rounded-lg text-sm font-medium transition-[color,background-color] duration-[var(--motion-quick)]",
              drill === item.id ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {drill === "verbos" ? <PracticePanel language={language} /> : null}
      {drill === "frases" ? <PhrasesPanel /> : null}
      {drill === "prep" ? <PrepositionsPanel /> : null}
    </div>
  );
}
