import { useState } from "react";
import { ConnectorsPanel } from "@/components/connectors-panel";
import { PhrasesPanel } from "@/components/phrases-panel";
import { PracticePanel } from "@/components/practice-panel";
import { PrepositionsPanel } from "@/components/prepositions-panel";
import { WorksheetPanel } from "@/components/worksheet-panel";
import { useLocale } from "@/lib/i18n/locale";
import { t, type UiKey } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

const DRILLS = [
  { id: "verbos", key: "verbs" },
  { id: "frases", key: "phrases" },
  { id: "prep", key: "prep" },
  { id: "conectores", key: "connectors" },
  { id: "imprimir", key: "print" },
] as const;

type DrillId = (typeof DRILLS)[number]["id"];

export function PracticeHub() {
  const [drill, setDrill] = useState<DrillId>("verbos");
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-2 p-1 sm:grid-cols-5">
        {DRILLS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setDrill(item.id)}
            className={cn(
              "min-h-10 rounded-lg px-1 text-xs font-medium transition-[color,background-color] duration-[var(--motion-quick)] sm:text-sm",
              drill === item.id
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted-foreground",
            )}
          >
            {t(locale, item.key as UiKey)}
          </button>
        ))}
      </div>
      {drill === "verbos" ? <PracticePanel /> : null}
      {drill === "frases" ? <PhrasesPanel /> : null}
      {drill === "prep" ? <PrepositionsPanel /> : null}
      {drill === "conectores" ? <ConnectorsPanel /> : null}
      {drill === "imprimir" ? <WorksheetPanel /> : null}
    </div>
  );
}
