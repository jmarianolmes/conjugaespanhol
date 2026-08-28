import { Button } from "@/components/ui/button";

const MARKS = ["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"] as const;

interface AccentBarProps {
  onInsert: (mark: string) => void;
}

export function AccentBar({ onInsert }: AccentBarProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Acentos espanhóis">
      {MARKS.map((mark) => (
        <Button
          key={mark}
          type="button"
          variant="secondary"
          size="sm"
          className="h-11 min-w-11 px-0 font-display text-base"
          onMouseDown={(event) => {
            event.preventDefault();
            onInsert(mark);
          }}
        >
          {mark}
        </Button>
      ))}
    </div>
  );
}
