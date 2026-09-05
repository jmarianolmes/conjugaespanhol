import { useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PERSONS,
  PHRASES,
  TENSES,
  TENSE_GROUPS,
  checkAnswer,
  expectedFor,
  getVerb,
  phrasesForTense,
  tenseLabelFor,
  useProgress,
} from "@/lib/spanish";
import type { PhrasePrompt, TenseId } from "@/lib/spanish";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";

function personHint(phrase: PhrasePrompt): string {
  if (phrase.person === "forma") return "forma única";
  return PERSONS.find((item) => item.id === phrase.person)?.label ?? phrase.person;
}

function pickPhrase(pool: PhrasePrompt[], except?: string): PhrasePrompt {
  const choices = except ? pool.filter((item) => item.id !== except) : pool;
  const list = choices.length > 0 ? choices : pool;
  return list[Math.floor(Math.random() * list.length)] ?? PHRASES[0];
}

export function PhrasesPanel() {
  const record = useProgress((s) => s.record);
  const [tenseFilter, setTenseFilter] = useState<TenseId | "all">("all");
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [scored, setScored] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  const pool = useMemo(() => phrasesForTense(tenseFilter), [tenseFilter]);
  const phrase = pool[index % pool.length] ?? pool[0];
  const verb = phrase ? getVerb(phrase.verbId) : null;
  const expected = phrase ? expectedFor(phrase) : "";

  function resetField() {
    setValue("");
    setStatus("idle");
    setScored(false);
  }

  function goTo(next: PhrasePrompt, list: PhrasePrompt[]) {
    const at = list.findIndex((item) => item.id === next.id);
    setIndex(at >= 0 ? at : 0);
    resetField();
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onFilter(next: TenseId | "all") {
    setTenseFilter(next);
    const list = phrasesForTense(next);
    goTo(list[0] ?? PHRASES[0], list);
  }

  function nextPhrase() {
    if (!phrase) return;
    goTo(pickPhrase(pool, phrase.id), pool);
  }

  function evaluate(raw?: string): boolean {
    if (!phrase || !verb) return false;
    const given = (raw ?? value).trim();
    if (!given) return false;
    const result = checkAnswer(verb, phrase.tense, phrase.person, given);
    setStatus(result.ok ? "correct" : "wrong");
    if (!scored) {
      setScored(true);
      record({
        at: Date.now(),
        verbId: verb.id,
        tense: phrase.tense,
        person: phrase.person,
        given,
        expected: result.expected,
        ok: result.ok,
      });
    }
    return result.ok;
  }

  if (!phrase || !verb) {
    return <p className="text-sm text-muted-foreground">Nenhuma frase neste tempo ainda.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Select value={tenseFilter} onValueChange={(v) => onFilter(v as TenseId | "all")}>
          <SelectTrigger aria-label="Filtrar tempo da frase">
            <SelectValue placeholder="Todos os tempos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tempos</SelectItem>
            {TENSE_GROUPS.map((group) => (
              <SelectGroup key={group.id}>
                <SelectLabel>{group.label}</SelectLabel>
                {TENSES.filter((item) => item.group === group.id && phrasesForTense(item.id).length > 0).map(
                  (item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nameEs}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-10 px-0 sm:h-11 sm:w-11"
          onClick={() => goTo(pickPhrase(pool, phrase.id), pool)}
          aria-label="Sortear frase"
        >
          <Dices className="size-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {verb.infinitive}
        <span className="mx-1.5 text-border">·</span>
        {tenseLabelFor(phrase)}
        <span className="mx-1.5 text-border">·</span>
        {personHint(phrase)}
      </p>

      <p className="font-display text-xl leading-snug sm:text-2xl">
        {phrase.before}
        <span className="text-primary">___</span>
        {phrase.after}
      </p>
      <p className="text-sm text-muted-foreground">{phrase.pt}</p>

      <Input
        ref={inputRef}
        value={value}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="go"
        placeholder="complete o verbo"
        aria-label="Forma verbal da frase"
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
          if (evaluate(event.currentTarget.value)) {
            requestAnimationFrame(() => nextBtnRef.current?.focus());
          }
        }}
        onBlur={(event) => {
          if (event.currentTarget.value.trim()) evaluate(event.currentTarget.value);
        }}
      />

      {status === "wrong" ? (
        <p className="text-sm">
          <span className="text-destructive">Não é essa. </span>
          <span className="font-display">{expected}</span>
        </p>
      ) : null}

      {status === "correct" ? (
        <p className="flex items-center gap-1.5 text-sm text-success">
          <Check className="size-4" />
          {expected}
        </p>
      ) : null}

      <Button ref={nextBtnRef} type="button" className="h-10 sm:h-11" onClick={nextPhrase}>
        Seguir
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
