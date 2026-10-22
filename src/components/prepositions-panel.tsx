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
  PREP_GROUPS,
  PREP_PROMPTS,
  PREPOSITIONS,
  checkPrep,
  expectedPrep,
  getPrep,
  isPrepChunk,
  prepStats,
  promptsForPrep,
  useProgress,
} from "@/lib/spanish";
import type { PrepGroupId, PrepId, PrepPrompt } from "@/lib/spanish";
import { glossOf } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import { PREP_MEANING, pick } from "@/lib/i18n/meta";
import { PREP_PT, PREP_USE, PREP_WHY } from "@/lib/i18n/gloss-prep";
import { t } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";
type Filter = PrepId | PrepGroupId | "all";

function pickPrompt(pool: PrepPrompt[], except?: string): PrepPrompt {
  const choices = except ? pool.filter((item) => item.id !== except) : pool;
  const list = choices.length > 0 ? choices : pool;
  return list[Math.floor(Math.random() * list.length)] ?? PREP_PROMPTS[0];
}

export function PrepositionsPanel() {
  const record = useProgress((s) => s.record);
  const { locale } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [scored, setScored] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [dealKey, setDealKey] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rollingRef = useRef(false);
  const holdUntilRef = useRef(0);

  const pool = useMemo(() => promptsForPrep(filter), [filter]);
  const stats = prepStats(pool);
  const prompt = pool[index % pool.length] ?? pool[0];
  const meta = prompt ? getPrep(prompt.prep) : null;
  const expected = prompt ? expectedPrep(prompt) : "";

  function resetField() {
    setValue("");
    setStatus("idle");
    setScored(false);
  }

  function landOn(next: PrepPrompt, list: PrepPrompt[]) {
    const at = list.findIndex((item) => item.id === next.id);
    setIndex(at >= 0 ? at : 0);
    resetField();
    setDealKey((n) => n + 1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function rollTo(next: PrepPrompt, list: PrepPrompt[]) {
    if (rollingRef.current || list.length === 0) return;
    rollingRef.current = true;
    setRolling(true);
    resetField();
    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1;
      const preview = pickPrompt(list, next.id);
      const at = list.findIndex((item) => item.id === preview.id);
      setIndex(at >= 0 ? at : 0);
      if (ticks >= 6) {
        window.clearInterval(timer);
        rollingRef.current = false;
        setRolling(false);
        landOn(next, list);
      }
    }, 70);
  }

  function onFilter(next: Filter) {
    setFilter(next);
    const list = promptsForPrep(next);
    landOn(list[0] ?? PREP_PROMPTS[0], list);
  }

  function nextPrompt() {
    if (!prompt || rollingRef.current) return;
    rollTo(pickPrompt(pool, prompt.id), pool);
  }

  function evaluate(raw?: string): boolean {
    if (!prompt || rollingRef.current) return false;
    const given = (raw ?? value).trim();
    if (!given) return false;
    const result = checkPrep(prompt, given);
    setStatus(result.ok ? "correct" : "wrong");
    holdUntilRef.current = Date.now() + 800;
    if (!scored) {
      setScored(true);
      record({
        at: Date.now(),
        verbId: prompt.prep,
        tense: "prep",
        person: "prep",
        given,
        expected: result.expected,
        ok: result.ok,
      });
    }
    return result.ok;
  }

  if (!prompt || !meta) {
    return <p className="text-sm text-muted-foreground">{t(locale, "noPhrase")}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Select value={filter} onValueChange={(v) => onFilter(v as Filter)}>
          <SelectTrigger aria-label={t(locale, "filterPrep")}>
            <SelectValue placeholder={t(locale, "allPreps")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t(locale, "allPreps")}</SelectItem>
            {PREP_GROUPS.map((group) => (
              <SelectGroup key={group.id}>
                <SelectLabel>{group.id === "otras" ? t(locale, "others") : group.label}</SelectLabel>
                <SelectItem value={group.id}>
                  {group.id === "otras" ? t(locale, "others") : group.label}
                  <span className="text-muted-foreground">
                    {" "}
                    · {promptsForPrep(group.id).length}
                  </span>
                </SelectItem>
                {PREPOSITIONS.filter((item) => item.group === group.id).map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                    <span className="text-muted-foreground"> — {pick(locale, PREP_MEANING[item.id], item.meaningPt)}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      · {promptsForPrep(item.id).length}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-10 px-0 sm:h-11 sm:w-11"
          onClick={() => rollTo(pickPrompt(pool, prompt.id), pool)}
          aria-label={t(locale, "shufflePhrase")}
          disabled={rolling}
        >
          <Dices className={cn("size-4", rolling && "dice-spin")} />
        </Button>
      </div>

      <p className="text-sm font-medium text-foreground">
        {stats.count} {t(locale, "phrasesCount")} · {stats.preps} {t(locale, "prep")}
      </p>

      <div key={dealKey} className={cn("flex flex-col gap-3", !rolling && "phrase-in")}>
        <div className={cn("flex flex-wrap items-center gap-2", rolling && "rolling-blur")}>
          <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-foreground">
            {glossOf(locale, PREP_USE, prompt.id, prompt.use)}
          </span>
          {status !== "idle" ? (
            <span className="chip-pop rounded-lg bg-primary px-2.5 py-1.5 font-display text-base font-semibold text-primary-foreground">
              {expected}
            </span>
          ) : (
            <span className="chip-pop rounded-lg bg-surface-2 px-2.5 py-1.5 text-sm font-semibold text-muted-foreground">
              {isPrepChunk(prompt) ? t(locale, "prepPlus") : t(locale, "preposition")}
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
                {expected}
              </span>
              {prompt.after}
            </>
          )}
        </p>
        <p className="text-sm text-muted-foreground">{glossOf(locale, PREP_PT, prompt.id, prompt.pt)}</p>
      </div>

      <Input
        ref={inputRef}
        value={value}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint={status === "correct" ? "go" : "done"}
        placeholder={t(locale, "prepPlaceholder")}
        aria-label={t(locale, "prepAria")}
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
            nextPrompt();
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
          <span className="mt-1 block text-foreground">{glossOf(locale, PREP_WHY, prompt.id, prompt.why)}</span>
        </p>
      ) : null}

      {status === "correct" ? (
        <p className="feedback-in rounded-lg bg-success-bg px-3 py-2 text-sm font-semibold text-success">
          <span className="flex items-center gap-1.5">
            <Check className="size-4" />
            {t(locale, "correct")}: {expected}
          </span>
          <span className="mt-1 block font-medium text-foreground">{glossOf(locale, PREP_WHY, prompt.id, prompt.why)}</span>
        </p>
      ) : null}

      <Button type="button" className="h-10 sm:h-11" onClick={nextPrompt} disabled={rolling}>
        {status === "idle" ? t(locale, "skip") : t(locale, "follow")}
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
