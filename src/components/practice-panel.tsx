import { useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Dices, Eraser, Lightbulb } from "lucide-react";
import { AccentBar } from "@/components/accent-bar";
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
  TENSES,
  TENSE_GROUPS,
  VERB_GROUPS,
  VERBS,
  checkAnswer,
  formFor,
  getTense,
  getVerb,
  regularEndingsFor,
  slotsFor,
  useProgress,
} from "@/lib/spanish";
import type { PersonId, Slot, TenseId } from "@/lib/spanish";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";

function insertAtCursor(input: HTMLInputElement, mark: string): string {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const next = input.value.slice(0, start) + mark + input.value.slice(end);
  input.value = next;
  const caret = start + mark.length;
  input.setSelectionRange(caret, caret);
  return next;
}

function shortLabel(slot: Slot): string {
  if (slot.id === "forma") return "forma";
  if (slot.id === "el") return "él";
  if (slot.id === "nosotros") return "nos.";
  if (slot.id === "vosotros") return "vos.";
  if (slot.id === "ellos") return "ellos";
  return slot.label;
}

export function PracticePanel() {
  const record = useProgress((s) => s.record);
  const [tenseId, setTenseId] = useState<TenseId | "">("");
  const [verbId, setVerbId] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [scored, setScored] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const focusedRef = useRef<HTMLInputElement | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const statusRef = useRef(status);
  statusRef.current = status;

  const tense = tenseId ? getTense(tenseId) : null;
  const verb = verbId ? getVerb(verbId) : null;
  const slots = tense ? slotsFor(tense.id) : [];
  const endings = tense && verb ? regularEndingsFor(tense.id, verb.ending) : null;
  const practicing = Boolean(tense && verb);

  const visibleSlots = useMemo(() => slots, [slots]);

  function resetAnswers() {
    setValues({});
    setStatus({});
    setScored({});
    setShowHint(false);
  }

  function onTenseChange(next: TenseId) {
    setTenseId(next);
    resetAnswers();
  }

  function onVerbChange(next: string) {
    setVerbId(next);
    resetAnswers();
  }

  function shuffle() {
    const nextTense = TENSES[Math.floor(Math.random() * TENSES.length)];
    const nextVerb = VERBS[Math.floor(Math.random() * VERBS.length)];
    setTenseId(nextTense.id);
    setVerbId(nextVerb.id);
    resetAnswers();
  }

  function nextVerb() {
    if (!verb) {
      shuffle();
      return;
    }
    const index = VERBS.findIndex((item) => item.id === verb.id);
    const next = VERBS[(index + 1) % VERBS.length];
    setVerbId(next.id);
    resetAnswers();
  }

  function setValue(slotId: string, value: string) {
    setValues((prev) => ({ ...prev, [slotId]: value }));
    if (status[slotId] && status[slotId] !== "idle") {
      setStatus((prev) => ({ ...prev, [slotId]: "idle" }));
    }
  }

  function evaluate(slotId: PersonId | "forma", raw?: string): boolean {
    if (!verb || !tense) return false;
    const given = (raw ?? values[slotId] ?? "").trim();
    if (!given) return false;
    const result = checkAnswer(verb, tense.id, slotId, given);
    const already = scored[slotId];
    setStatus((prev) => ({ ...prev, [slotId]: result.ok ? "correct" : "wrong" }));
    if (!already) {
      setScored((prev) => ({ ...prev, [slotId]: true }));
      record({
        at: Date.now(),
        verbId: verb.id,
        tense: tense.id,
        person: slotId,
        given,
        expected: result.expected,
        ok: result.ok,
      });
    }
    return result.ok;
  }

  function focusNext(fromId: string) {
    const list = visibleSlots;
    const start = list.findIndex((item) => item.id === fromId);
    if (start < 0) return;
    for (let step = 1; step < list.length; step += 1) {
      const next = list[(start + step) % list.length];
      if ((statusRef.current[next.id] ?? "idle") !== "correct") {
        requestAnimationFrame(() => inputRefs.current[next.id]?.focus());
        return;
      }
    }
  }

  function insertMark(mark: string) {
    const input = focusedRef.current;
    if (!input) return;
    const slotId = input.dataset.slot;
    if (!slotId) return;
    const next = insertAtCursor(input, mark);
    setValue(slotId, next);
    input.focus();
  }

  const doneCount = slots.filter((slot) => status[slot.id] === "correct").length;
  const allCorrect = slots.length > 0 && doneCount === slots.length;

  return (
    <div className="flex flex-col gap-2">
      <div className={cn("grid gap-2", tense ? "grid-cols-[1fr_1fr_auto]" : "grid-cols-1")}>
        <Select value={tenseId || "__unset__"} onValueChange={(v) => onTenseChange(v as TenseId)}>
          <SelectTrigger id="tense-select" className="min-w-0" aria-label="Escolher tempo verbal">
            <SelectValue placeholder="Tempo verbal" />
          </SelectTrigger>
          <SelectContent>
            {TENSE_GROUPS.map((group) => (
              <SelectGroup key={group.id}>
                <SelectLabel>{group.label}</SelectLabel>
                {TENSES.filter((item) => item.group === group.id).map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.nameEs}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {tense ? (
          <Select value={verbId || "__unset__"} onValueChange={onVerbChange}>
            <SelectTrigger id="verb-select" className="min-w-0" aria-label="Escolher verbo">
              <SelectValue placeholder="Verbo" />
            </SelectTrigger>
            <SelectContent>
              {VERB_GROUPS.map((group) => {
                const items = VERBS.filter(group.match);
                if (items.length === 0) return null;
                return (
                  <SelectGroup key={group.id}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.id} textValue={item.infinitive}>
                        {item.infinitive}
                        <span className="text-muted-foreground"> — {item.meaningPt}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        ) : (
          <p className="self-center text-sm text-muted-foreground">
            Escolha o tempo; o verbo abre em seguida.
          </p>
        )}

        {tense ? (
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 shrink-0 px-0 sm:h-11 sm:w-11"
            onClick={shuffle}
            aria-label="Sortear tempo e verbo"
          >
            <Dices className="size-4" />
          </Button>
        ) : null}
      </div>

      {practicing && verb && tense ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="truncate">
              {verb.meaningPt}
              <span className="mx-1.5 text-border">·</span>-{verb.ending}
              {verb.tags.includes("irregular") ? " · irregular" : ""}
            </span>
            <span className="ml-auto tabular-nums">
              {doneCount}/{slots.length}
            </span>
            {endings ? (
              <button
                type="button"
                className="flex h-8 items-center gap-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowHint((v) => !v)}
              >
                <Lightbulb className="size-3.5" />
                <span className="sr-only sm:not-sr-only">
                  {showHint ? "Ocultar" : "Dica"}
                </span>
              </button>
            ) : null}
          </div>

          {showHint && endings ? (
            <p className="rounded-lg bg-surface px-3 py-2 font-display text-sm">
              {endings.join(" · ")}
            </p>
          ) : null}

          <div className="flex flex-col">
            {visibleSlots.map((slot) => {
              const state = status[slot.id] ?? "idle";
              const expected = formFor(verb, tense.id, slot.id);
              const accentHint =
                state === "wrong" &&
                checkAnswer(verb, tense.id, slot.id, values[slot.id] ?? "").accentOnly;
              return (
                <div
                  key={slot.id}
                  className={cn(
                    "border-b border-border py-0.5 first:pt-0 last:border-b-0",
                    state === "correct" && "border-success/40",
                    state === "wrong" && "border-destructive/40",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <label
                      className="w-14 shrink-0 text-sm font-medium sm:w-36"
                      htmlFor={`slot-${slot.id}`}
                      title={slot.hintPt}
                    >
                      <span className="sm:hidden">{shortLabel(slot)}</span>
                      <span className="hidden sm:inline">{slot.label}</span>
                    </label>
                    <Input
                      id={`slot-${slot.id}`}
                      ref={(node) => {
                        inputRefs.current[slot.id] = node;
                      }}
                      data-slot={slot.id}
                      value={values[slot.id] ?? ""}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="next"
                      placeholder="forma"
                      aria-label={`Conjugar ${verb.infinitive}, ${slot.label}`}
                      className={cn(
                        "h-10 font-display text-base sm:h-11 sm:text-lg",
                        state === "correct" && "border-success bg-success-bg focus-visible:ring-success",
                        state === "wrong" &&
                          "border-destructive bg-error-bg focus-visible:ring-destructive",
                      )}
                      onFocus={(event) => {
                        focusedRef.current = event.currentTarget;
                      }}
                      onChange={(event) => setValue(slot.id, event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return;
                        event.preventDefault();
                        const ok = evaluate(slot.id, event.currentTarget.value);
                        if (ok) focusNext(slot.id);
                      }}
                      onBlur={(event) => {
                        if (event.currentTarget.value.trim()) {
                          evaluate(slot.id, event.currentTarget.value);
                        }
                      }}
                    />
                    <span className="flex w-5 shrink-0 justify-center">
                      {state === "correct" ? (
                        <Check className="size-4 text-success" aria-label="correto" />
                      ) : null}
                    </span>
                  </div>
                  {state === "wrong" ? (
                    <p className="pb-1 pl-16 text-xs sm:pl-40">
                      <span className="text-destructive">
                        {accentHint ? "Falta o acento. " : "Não é essa. "}
                      </span>
                      <span className="font-display text-sm text-foreground">{expected}</span>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <AccentBar onInsert={insertMark} />

          <div className="flex gap-2">
            <Button type="button" className="h-10 flex-1 sm:h-11" onClick={nextVerb}>
              {allCorrect ? "Seguir" : "Próximo verbo"}
              <ChevronRight className="size-4" />
            </Button>
            <Button type="button" variant="outline" className="h-10 px-3 sm:h-11" onClick={resetAnswers}>
              <Eraser className="size-4" />
              <span className="sr-only sm:not-sr-only">Limpar</span>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
