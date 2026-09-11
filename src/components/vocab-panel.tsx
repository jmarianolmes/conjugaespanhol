import { useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SER_ESTAR,
  VOCAB,
  VOCAB_KINDS,
  checkMeaning,
  checkSerEstar,
  checkVocabPhrase,
  useProgress,
  vocabFor,
  vocabStats,
} from "@/lib/spanish";
import type { SerEstarPrompt, VocabEntry, VocabFilter } from "@/lib/spanish";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";
type Mode = "meaning" | "phrase";

function pick<T extends { id: string }>(pool: T[], except?: string): T {
  const choices = except ? pool.filter((item) => item.id !== except) : pool;
  const list = choices.length > 0 ? choices : pool;
  return list[Math.floor(Math.random() * list.length)] ?? pool[0];
}

export function VocabPanel() {
  const record = useProgress((s) => s.record);
  const [filter, setFilter] = useState<VocabFilter>("falso");
  const [mode, setMode] = useState<Mode>("meaning");
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [scored, setScored] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [dealKey, setDealKey] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rollingRef = useRef(false);
  const holdUntilRef = useRef(0);

  const serMode = filter === "ser-estar";
  const words = useMemo(() => vocabFor(filter), [filter]);
  const stats = vocabStats(words);
  const word = words[index % Math.max(words.length, 1)] ?? words[0];
  const ser = SER_ESTAR[index % SER_ESTAR.length] ?? SER_ESTAR[0];

  function resetField() {
    setValue("");
    setStatus("idle");
    setScored(false);
  }

  function land(nextIndex: number) {
    setIndex(nextIndex);
    resetField();
    setDealKey((n) => n + 1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function rollTo(nextIndex: number, size: number) {
    if (rollingRef.current || size === 0) return;
    rollingRef.current = true;
    setRolling(true);
    resetField();
    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1;
      setIndex(Math.floor(Math.random() * size));
      if (ticks >= 6) {
        window.clearInterval(timer);
        rollingRef.current = false;
        setRolling(false);
        land(nextIndex);
      }
    }, 70);
  }

  function next() {
    if (rollingRef.current) return;
    if (serMode) {
      const nxt = pick(SER_ESTAR, ser.id);
      rollTo(SER_ESTAR.findIndex((item) => item.id === nxt.id), SER_ESTAR.length);
      return;
    }
    const nxt = pick(words, word?.id);
    rollTo(words.findIndex((item) => item.id === nxt.id), words.length);
  }

  function evaluate(raw?: string): boolean {
    if (rollingRef.current) return false;
    const given = (raw ?? value).trim();
    if (!given) return false;
    const result = serMode
      ? checkSerEstar(ser, given)
      : mode === "meaning"
        ? checkMeaning(word, given)
        : checkVocabPhrase(word, given);
    setStatus(result.ok ? "correct" : "wrong");
    holdUntilRef.current = Date.now() + 800;
    if (!scored) {
      setScored(true);
      record({
        at: Date.now(),
        verbId: serMode ? ser.fill : word.es,
        tense: serMode ? "serestar" : "vocab",
        person: "prep",
        given,
        expected: result.expected,
        ok: result.ok,
      });
    }
    return result.ok;
  }

  const kindLabel = VOCAB_KINDS.find((item) => item.id === (serMode ? "falso" : word?.kind))?.label;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Select
          value={filter}
          onValueChange={(nextFilter) => {
            const value = nextFilter as VocabFilter;
            setFilter(value);
            land(0);
          }}
        >
          <SelectTrigger aria-label="Filtrar palavras">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as palavras</SelectItem>
            <SelectItem value="ser-estar">Ser / estar</SelectItem>
            {VOCAB_KINDS.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
                <span className="text-muted-foreground"> · {vocabFor(item.id).length}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-10 px-0 sm:h-11 sm:w-11"
          onClick={next}
          aria-label="Sortear"
          disabled={rolling}
        >
          <Dices className={cn("size-4", rolling && "dice-spin")} />
        </Button>
      </div>

      {!serMode ? (
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={mode === "meaning" ? "default" : "outline"}
            className="h-10"
            onClick={() => {
              setMode("meaning");
              resetField();
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
          >
            Significado
          </Button>
          <Button
            type="button"
            variant={mode === "phrase" ? "default" : "outline"}
            className="h-10"
            onClick={() => {
              setMode("phrase");
              resetField();
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
          >
            Em frases
          </Button>
        </div>
      ) : null}

      <p className="text-sm font-medium text-foreground">
        {serMode
          ? `${SER_ESTAR.length} frases · ser × estar`
          : `${stats.count} palavras · ${mode === "meaning" ? "o que significa?" : "complete a frase"}`}
      </p>

      {serMode ? (
        <SerCard prompt={ser} status={status} rolling={rolling} dealKey={dealKey} />
      ) : word ? (
        <WordCard entry={word} mode={mode} status={status} rolling={rolling} dealKey={dealKey} kindLabel={kindLabel} />
      ) : null}

      <Input
        ref={inputRef}
        value={value}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint={status === "correct" ? "go" : "done"}
        placeholder={serMode ? "soy, estoy, es, está…" : mode === "meaning" ? "significado em português" : "palavra em espanhol"}
        aria-label="Resposta"
        disabled={rolling}
        className={cn(
          "h-11 font-display text-lg",
          status === "correct" && "border-success bg-success-bg focus-visible:ring-success",
          status === "wrong" && "border-destructive bg-error-bg focus-visible:ring-destructive",
        )}
        onChange={(event) => {
          setValue(event.target.value);
          if (status !== "idle") setStatus("idle");
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          if (rolling) return;
          if (status === "correct") {
            if (Date.now() < holdUntilRef.current) return;
            next();
            return;
          }
          evaluate(event.currentTarget.value);
        }}
        onBlur={(event) => {
          if (event.currentTarget.value.trim() && status === "idle") {
            evaluate(event.currentTarget.value);
          }
        }}
      />

      {status === "wrong" ? (
        <p className="feedback-in rounded-lg bg-error-bg px-3 py-2 text-sm">
          <span className="font-semibold text-destructive">Não é essa. A forma é </span>
          <span className="font-display text-base font-semibold text-foreground">
            {serMode ? ser.fill : mode === "meaning" ? word.pt : word.es}
          </span>
          <span className="mt-1 block text-foreground">
            {serMode ? ser.why : word.trap ?? word.why ?? word.phrasePt}
          </span>
        </p>
      ) : null}

      {status === "correct" ? (
        <p className="feedback-in rounded-lg bg-success-bg px-3 py-2 text-sm font-semibold text-success">
          <span className="flex items-center gap-1.5">
            <Check className="size-4" />
            Certo
          </span>
          <span className="mt-1 block font-medium text-foreground">
            {serMode ? ser.why : word.trap ?? word.why ?? `${word.es} = ${word.pt}`}
          </span>
        </p>
      ) : null}

      <Button type="button" className="h-10 sm:h-11" onClick={next} disabled={rolling}>
        {status === "idle" ? "Pular" : "Seguir"}
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

function WordCard({
  entry,
  mode,
  status,
  rolling,
  dealKey,
  kindLabel,
}: {
  entry: VocabEntry;
  mode: Mode;
  status: Status;
  rolling: boolean;
  dealKey: number;
  kindLabel?: string;
}) {
  return (
    <div key={dealKey} className={cn("flex flex-col gap-3", !rolling && "phrase-in")}>
      <div className={cn("flex flex-wrap items-center gap-2", rolling && "rolling-blur")}>
        <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-foreground">
          {kindLabel}
        </span>
        <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-muted-foreground">
          {mode === "meaning" ? "o que é?" : "complete"}
        </span>
      </div>

      {mode === "meaning" ? (
        <>
          <p className={cn("font-display text-3xl leading-none sm:text-4xl", rolling && "rolling-blur")}>
            {entry.es}
          </p>
          <p className="text-sm text-muted-foreground">
            {entry.before}
            {entry.es}
            {entry.after}
          </p>
        </>
      ) : (
        <>
          <p className={cn("font-display text-xl leading-snug sm:text-2xl", rolling && "rolling-blur")}>
            {status === "idle" ? (
              <>
                {entry.before}
                <span className="text-primary">___</span>
                {entry.after}
              </>
            ) : (
              <>
                {entry.before}
                <span className={status === "wrong" ? "font-semibold text-destructive" : "text-success"}>
                  {entry.es}
                </span>
                {entry.after}
              </>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{entry.phrasePt}</p>
        </>
      )}
    </div>
  );
}

function SerCard({
  prompt,
  status,
  rolling,
  dealKey,
}: {
  prompt: SerEstarPrompt;
  status: Status;
  rolling: boolean;
  dealKey: number;
}) {
  return (
    <div key={dealKey} className={cn("flex flex-col gap-3", !rolling && "phrase-in")}>
      <div className={cn("flex flex-wrap items-center gap-2", rolling && "rolling-blur")}>
        <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-foreground">
          {prompt.use}
        </span>
        {status !== "idle" ? (
          <span className="chip-pop rounded-lg bg-primary px-2.5 py-1.5 font-display text-base font-semibold text-primary-foreground">
            {prompt.family}
          </span>
        ) : (
          <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-muted-foreground">
            ser ou estar?
          </span>
        )}
      </div>
      <p className={cn("font-display text-xl leading-snug sm:text-2xl", rolling && "rolling-blur")}>
        {status === "idle" ? (
          <>
            {prompt.before}
            <span className="text-primary">___</span>
            {prompt.after}
          </>
        ) : (
          <>
            {prompt.before}
            <span className={status === "wrong" ? "font-semibold text-destructive" : "text-success"}>
              {prompt.fill}
            </span>
            {prompt.after}
          </>
        )}
      </p>
      <p className="text-sm text-muted-foreground">{prompt.pt}</p>
    </div>
  );
}
