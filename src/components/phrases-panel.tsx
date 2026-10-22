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
  phraseStats,
  phrasesForTense,
  tenseLabelFor,
  useProgress,
} from "@/lib/spanish";
import type { PhrasePrompt, TenseId } from "@/lib/spanish";
import { useLocale } from "@/lib/i18n/locale";
import { GROUP_LABEL, PERSON_HINT, TENSE_NAME, TENSE_SHORT, pick } from "@/lib/i18n/meta";
import { t } from "@/lib/i18n/ui";
import { phraseMeaning } from "@/lib/i18n/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";

function personHint(phrase: PhrasePrompt, locale: ReturnType<typeof useLocale>["locale"]): string {
  if (phrase.person === "forma") return t(locale, "uniqueForm");
  if (phrase.person === "el" || phrase.person === "tu" || phrase.person === "yo" || phrase.person === "nosotros" || phrase.person === "vosotros" || phrase.person === "ellos") {
    return pick(locale, PERSON_HINT[phrase.person], PERSONS.find((item) => item.id === phrase.person)?.label ?? phrase.person);
  }
  return phrase.person;
}

function pickPhrase(pool: PhrasePrompt[], except?: string): PhrasePrompt {
  const choices = except ? pool.filter((item) => item.id !== except) : pool;
  const list = choices.length > 0 ? choices : pool;
  return list[Math.floor(Math.random() * list.length)] ?? PHRASES[0];
}

export function PhrasesPanel() {
  const record = useProgress((s) => s.record);
  const { locale } = useLocale();
  const [tenseFilter, setTenseFilter] = useState<TenseId | "all">("all");
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [scored, setScored] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [dealKey, setDealKey] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const rollingRef = useRef(false);
  const holdUntilRef = useRef(0);

  const pool = useMemo(() => phrasesForTense(tenseFilter), [tenseFilter]);
  const stats = phraseStats(pool);
  const phrase = pool[index % pool.length] ?? pool[0];
  const verb = phrase ? getVerb(phrase.verbId) : null;
  const expected = phrase ? expectedFor(phrase) : "";

  function resetField() {
    setValue("");
    setStatus("idle");
    setScored(false);
  }

  function landOn(next: PhrasePrompt, list: PhrasePrompt[]) {
    const at = list.findIndex((item) => item.id === next.id);
    setIndex(at >= 0 ? at : 0);
    resetField();
    setDealKey((n) => n + 1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function rollTo(next: PhrasePrompt, list: PhrasePrompt[]) {
    if (rollingRef.current || list.length === 0) return;
    rollingRef.current = true;
    setRolling(true);
    resetField();
    let ticks = 0;
    const ticksMax = 6;
    const timer = window.setInterval(() => {
      ticks += 1;
      const preview = pickPhrase(list, next.id);
      const at = list.findIndex((item) => item.id === preview.id);
      setIndex(at >= 0 ? at : 0);
      if (ticks >= ticksMax) {
        window.clearInterval(timer);
        rollingRef.current = false;
        setRolling(false);
        landOn(next, list);
      }
    }, 70);
  }

  function onFilter(next: TenseId | "all") {
    setTenseFilter(next);
    const list = phrasesForTense(next);
    landOn(list[0] ?? PHRASES[0], list);
  }

  function nextPhrase() {
    if (!phrase || rollingRef.current) return;
    rollTo(pickPhrase(pool, phrase.id), pool);
  }

  function evaluate(raw?: string): boolean {
    if (!phrase || !verb || rollingRef.current) return false;
    const given = (raw ?? value).trim();
    if (!given) return false;
    const result = checkAnswer(verb, phrase.tense, phrase.person, given);
    setStatus(result.ok ? "correct" : "wrong");
    holdUntilRef.current = Date.now() + 800;
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
    return <p className="text-sm text-muted-foreground">{t(locale, "noPhrase")}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Select value={tenseFilter} onValueChange={(v) => onFilter(v as TenseId | "all")}>
          <SelectTrigger aria-label={t(locale, "filterTense")}>
            <SelectValue placeholder={t(locale, "allTenses")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t(locale, "allTenses")}</SelectItem>
            {TENSE_GROUPS.map((group) => (
              <SelectGroup key={group.id}>
                <SelectLabel>{pick(locale, GROUP_LABEL[group.id], group.label)}</SelectLabel>
                {TENSES.filter((item) => item.group === group.id && phrasesForTense(item.id).length > 0).map(
                  (item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nameEs}
                      <span className="text-muted-foreground"> — {pick(locale, TENSE_NAME[item.id], item.nameEs)}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        · {phrasesForTense(item.id).length}
                      </span>
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
          onClick={() => rollTo(pickPhrase(pool, phrase.id), pool)}
          aria-label={t(locale, "shufflePhrase")}
          disabled={rolling}
        >
          <Dices className={cn("size-4", rolling && "dice-spin")} />
        </Button>
      </div>

      <p className="text-sm font-medium text-foreground">
        {stats.count} {t(locale, "phrasesCount")} · {stats.tenses}
      </p>

      <div key={dealKey} className={cn("flex flex-col gap-3", !rolling && "phrase-in")}>
        <div className={cn("flex flex-wrap items-center gap-2", rolling && "rolling-blur")}>
          <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 font-display text-base font-semibold text-foreground">
            {verb.infinitive}
          </span>
          <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-foreground">
            {pick(locale, TENSE_SHORT[phrase.tense], tenseLabelFor(phrase))}
          </span>
          <span className="chip-pop rounded-lg bg-primary px-2.5 py-1.5 text-sm font-semibold text-primary-foreground">
            {personHint(phrase, locale)}
          </span>
        </div>

        <p
          className={cn(
            "font-display text-xl leading-snug sm:text-2xl",
            rolling && "rolling-blur",
            status === "correct" && "text-success",
          )}
        >
          {status === "idle" ? (
            <>
              {phrase.before}
              <span className="text-primary">___</span>
              {phrase.after}
            </>
          ) : (
            <>
              {phrase.before}
              <span className={status === "wrong" ? "font-semibold text-destructive" : undefined}>
                {expected}
              </span>
              {phrase.after}
            </>
          )}
        </p>
        <p className="text-sm text-muted-foreground">{phraseMeaning(locale, phrase)}</p>
      </div>

      <Input
        ref={inputRef}
        value={value}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint={status === "correct" ? "go" : "done"}
        placeholder={t(locale, "form")}
        aria-label={t(locale, "answer")}
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
            nextPhrase();
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
          <span className="font-semibold text-destructive">{t(locale, "notThatForm")}</span>
          <span className="font-display text-base font-semibold text-foreground">{expected}</span>
        </p>
      ) : null}

      {status === "correct" ? (
        <p className="feedback-in flex items-center gap-1.5 rounded-lg bg-success-bg px-3 py-2 text-sm font-semibold text-success">
          <Check className="size-4" />
          {t(locale, "correct")}: {expected}
        </p>
      ) : null}

      <Button
        ref={nextBtnRef}
        type="button"
        className="h-10 sm:h-11"
        onClick={nextPhrase}
        disabled={rolling}
      >
        {status === "idle" ? t(locale, "skip") : t(locale, "follow")}
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
