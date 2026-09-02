import { Button } from "@/components/ui/button";

const MARKS = ["á", "é", "í", "ó", "ú", "ñ", "ü"] as const;

interface AccentBarProps {
  onInsert: (mark: string) => void;
}

export function AccentBar({ onInsert }: AccentBarProps) {
  return (
    <div
      className="flex gap-1 overflow-x-auto pb-0.5"
      role="group"
      aria-label="Acentos espanhóis"
    >
      {MARKS.map((mark) => (
        <Button
          key={mark}
          type="button"
          variant="secondary"
          size="sm"
          className="h-9 min-w-9 shrink-0 px-0 font-display text-base sm:h-10 sm:min-w-10"
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
