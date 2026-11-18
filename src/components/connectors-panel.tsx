import { useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Dices, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONNECTOR_GROUPS, CONNECTOR_PROMPTS } from "@/lib/spanish/connectors";
import type { ConnectorGroupId, ConnectorPrompt } from "@/lib/spanish/connectors";
import { normalizeAnswer, stripDiacritics } from "@/lib/spanish/conjugate";
import { useLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

type GameMode = "write" | "choice";
type AnswerStatus = "idle" | "correct" | "wrong";
type GroupFilter = ConnectorGroupId | "all";

function clean(value: string) {
  return stripDiacritics(normalizeAnswer(value).replace(/[.,;:!?¿¡…]/g, ""));
}

function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function optionsFor(prompt: ConnectorPrompt): string[] {
  const correct = prompt.answers[0] ?? "";
  const accepted = new Set(prompt.answers.map(clean));
  const alternatives = CONNECTOR_GROUPS.flatMap((group) => group.items)
    .map((item) => item.replace(/[,…]+$/g, "").replace(/…/g, "").trim())
    .filter((item) => item && !accepted.has(clean(item)) && clean(item) !== clean(correct));
  return shuffled([correct, ...shuffled([...new Set(alternatives)]).slice(0, 3)]);
}

export function ConnectorsPanel() {
  const { locale } = useLocale();
  const [group, setGroup] = useState<GroupFilter>("all");
  const [mode, setMode] = useState<GameMode>("choice");
  const [round, setRound] = useState(0);
  const [deck, setDeck] = useState<ConnectorPrompt[]>(() => shuffled(CONNECTOR_PROMPTS).slice(0, 10));
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<AnswerStatus>("idle");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const current = deck[round];
  const correctOptions = useMemo(() => (current ? optionsFor(current) : []), [current]);

  function startRound(nextGroup: GroupFilter = group) {
    const pool = nextGroup === "all" ? CONNECTOR_PROMPTS : CONNECTOR_PROMPTS.filter((item) => item.group === nextGroup);
    setDeck(shuffled(pool).slice(0, Math.min(10, pool.length)));
    setGroup(nextGroup);
    setRound(0);
    setValue("");
    setStatus("idle");
    setScore(0);
    setStreak(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function evaluate(answer: string) {
    if (!current || status !== "idle" || !answer.trim()) return;
    const ok = current.answers.some((item) => clean(item) === clean(answer));
    setStatus(ok ? "correct" : "wrong");
    if (ok) {
      setScore((value) => value + 1);
      setStreak((value) => value + 1);
    } else {
      setStreak(0);
    }
  }

  function nextQuestion() {
    setRound((value) => value + 1);
    setValue("");
    setStatus("idle");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const answerSummary = current?.answers.join(" · ") ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t(locale, "connectors")}</p>
            <h2 className="mt-1 font-display text-2xl">{t(locale, "connectorChallenge")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t(locale, "connectorIntro")}</p>
          </div>
          <div className="flex gap-2 text-center">
            <div className="min-w-16 rounded-lg bg-surface-2 px-3 py-2">
              <span className="block font-display text-xl font-semibold">{score}</span>
              <span className="text-xs text-muted-foreground">{t(locale, "connectorScore")}</span>
            </div>
            <div className="min-w-16 rounded-lg bg-surface-2 px-3 py-2">
              <span className="block font-display text-xl font-semibold">{streak}</span>
              <span className="text-xs text-muted-foreground">{t(locale, "connectorStreak")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
            {t(locale, "connectorCategory")}
            <select
              value={group}
              onChange={(event) => startRound(event.target.value as GroupFilter)}
              className="h-11 rounded-lg border border-input bg-surface px-3 text-sm font-medium text-foreground"
            >
              <option value="all">{t(locale, "connectorAll")}</option>
              {CONNECTOR_GROUPS.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
            {t(locale, "connectorMode")}
            <select
              value={mode}
              onChange={(event) => {
                setMode(event.target.value as GameMode);
                setStatus("idle");
                setValue("");
              }}
              className="h-11 rounded-lg border border-input bg-surface px-3 text-sm font-medium text-foreground"
            >
              <option value="choice">{t(locale, "connectorChoice")}</option>
              <option value="write">{t(locale, "connectorWrite")}</option>
            </select>
          </label>
          <Button type="button" variant="outline" className="mt-auto h-11" onClick={() => startRound()}>
            <Dices className="size-4" />
            {t(locale, "connectorNewRound")}
          </Button>
        </div>

        {current ? (
          <>
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>{CONNECTOR_GROUPS.find((item) => item.id === current.group)?.title}</span>
              <span>{t(locale, "connectorQuestion")} {round + 1} / {deck.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuemin={0} aria-valuemax={deck.length} aria-valuenow={round}>
              <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${(round / deck.length) * 100}%` }} />
            </div>
            <div className="rounded-xl border border-border bg-background px-4 py-5 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t(locale, "connectorComplete")}</p>
              <p className={cn("mt-3 font-display text-xl leading-relaxed sm:text-2xl", status === "correct" && "text-success")}>
                {current.before.split("___").map((part, index, parts) => (
                  <span key={`${current.id}-${index}`}>
                    {part}
                    {index < parts.length - 1 ? (
                      <span className={cn("inline-block min-w-20 border-b-2 border-primary px-1 text-center font-sans text-base font-semibold", status === "correct" && "border-success text-success", status === "wrong" && "border-destructive text-destructive")}>
                        {status === "idle" ? "________" : (value.trim() || current.answers[0]).replace(/^[,;:!?¿¡…\s]+|[,;:!?¿¡…\s]+$/g, "")}
                      </span>
                    ) : null}
                  </span>
                ))}
                {current.after}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{current.explanation}</p>
            </div>

            {mode === "choice" ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {correctOptions.map((option) => {
                  const isAccepted = current.answers.some((answer) => clean(answer) === clean(option));
                  return (
                    <Button
                      key={option}
                      type="button"
                      variant={status !== "idle" && isAccepted ? "default" : "outline"}
                      className={cn("min-h-11 justify-start whitespace-normal text-left", status === "wrong" && isAccepted && "border-success text-success")}
                      onClick={() => evaluate(option)}
                      disabled={status !== "idle"}
                    >
                      {option}
                      {status === "correct" && isAccepted ? <Check className="ml-auto size-4" /> : null}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  ref={inputRef}
                  value={value}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder={t(locale, "connectorPlaceholder")}
                  aria-label={t(locale, "connectorAnswer")}
                  className={cn("h-11 font-display text-lg", status === "correct" && "border-success bg-success-bg", status === "wrong" && "border-destructive bg-error-bg")}
                  disabled={status !== "idle"}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      evaluate(event.currentTarget.value);
                    }
                  }}
                />
                <Button type="button" className="h-11 sm:min-w-32" onClick={() => evaluate(value)} disabled={status !== "idle" || !value.trim()}>
                  {t(locale, "connectorCheck")}
                </Button>
              </div>
            )}

            {status !== "idle" ? (
              <p className={cn("feedback-in rounded-lg px-3 py-2 text-sm", status === "correct" ? "bg-success-bg text-success" : "bg-error-bg text-destructive")} role="status" aria-live="polite">
                <span className="font-semibold">{status === "correct" ? `${t(locale, "correct")}!` : `${t(locale, "connectorAnswerWas")}: ${answerSummary}`}</span>
                <span className="mt-0.5 block text-foreground">{current.explanation}</span>
              </p>
            ) : null}
            <Button type="button" variant={status === "idle" ? "ghost" : "default"} className="h-11" onClick={nextQuestion}>
              {status === "idle" ? t(locale, "skip") : t(locale, "follow")}
              <ChevronRight className="size-4" />
            </Button>
          </>
        ) : (
          <div className="rounded-xl border border-border bg-success-bg p-5 text-center">
            <p className="font-display text-2xl font-semibold text-success">{t(locale, "connectorRoundDone")}</p>
            <p className="mt-1 text-sm text-foreground">{score} / {deck.length} {t(locale, "connectorScore")}</p>
            <Button type="button" className="mt-4 h-11" onClick={() => startRound()}>
              <RotateCcw className="size-4" />
              {t(locale, "connectorPlayAgain")}
            </Button>
          </div>
        )}
      </div>

      <details className="group rounded-xl border border-border bg-surface">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold marker:hidden">
          <span className="flex items-center justify-between gap-3">{t(locale, "connectorReference")}<span className="text-muted-foreground transition-transform group-open:rotate-90">›</span></span>
        </summary>
        <div className="grid gap-3 border-t border-border p-3 sm:grid-cols-2">
          {CONNECTOR_GROUPS.map((item) => (
            <section key={item.id} className="rounded-lg bg-background p-3">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mb-2 text-xs text-muted-foreground">{item.description}</p>
              <ul className="flex flex-wrap gap-1.5">
                {item.items.map((connector) => (
                  <li key={connector} className="rounded-md border border-border bg-surface px-2 py-1 text-sm">{connector}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </details>
    </div>
  );
}
