import { useState } from "react";
import { PhrasesPanel } from "@/components/phrases-panel";
import { PracticePanel } from "@/components/practice-panel";
import { PrepositionsPanel } from "@/components/prepositions-panel";
import { cn } from "@/lib/utils";

const DRILLS = [
  { id: "verbos", label: "Verbos" },
  { id: "frases", label: "Frases" },
  { id: "prep", label: "Prep." },
] as const;

type DrillId = (typeof DRILLS)[number]["id"];

export function PracticeHub() {
  const [drill, setDrill] = useState<DrillId>("verbos");

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-2 p-1">
        {DRILLS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setDrill(item.id)}
            className={cn(
              "h-10 rounded-lg text-sm font-medium transition-[color,background-color] duration-[var(--motion-quick)]",
              drill === item.id
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {drill === "verbos" ? <PracticePanel /> : null}
      {drill === "frases" ? <PhrasesPanel /> : null}
      {drill === "prep" ? <PrepositionsPanel /> : null}
    </div>
  );
}
