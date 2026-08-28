import { useMemo, useRef, useState } from "react";
import { Check, ChevronRight, Dices, Eraser, Lightbulb, RotateCcw } from "lucide-react";
import { AccentBar } from "@/components/accent-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  theoryFor,
  useProgress,
} from "@/lib/spanish";
import type { PersonId, TenseId, VerbDef } from "@/lib/spanish";
import { cn } from "@/lib/utils";

type Status = "idle" | "correct" | "wrong";
type Mode = "table" | "drill";

function emptyStatus(): Record<string, Status> {
  return {};
}

function insertAtCursor(
  input: HTMLInputElement,
  mark: string,
): string {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const next = input.value.slice(0, start) + mark + input.value.slice(end);
  input.value = next;
  const caret = start + mark.length;
  input.setSelectionRange(caret, caret);
  return next;
}

function tagLabel(verb: VerbDef): string {
  if (verb.tags.includes("irregular")) return "irregular";
  if (verb.tags.includes("ortografico")) return "ortográfico";
  if (verb.tags.includes("participio-irregular")) return "particípio irr.";
  return "regular";
}

export function PracticePanel() {
  const record = useProgress((s) => s.record);
  const [tenseId, setTenseId] = useState<TenseId | "">("");
  const [verbId, setVerbId] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, Status>>(emptyStatus);
  const [scored, setScored] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<Mode>("table");
  const [drillIndex, setDrillIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const focusedRef = useRef<HTMLInputElement | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const tense = tenseId ? getTense(tenseId) : null;
  const verb = verbId ? getVerb(verbId) : null;
  const slots = tense ? slotsFor(tense.id) : [];
  const theory = tense ? theoryFor(tense.id) : undefined;
  const endings = tense && verb ? regularEndingsFor(tense.id, verb.ending) : null;

  const drillSlot = slots[drillIndex] ?? slots[0];

  const visibleSlots = useMemo(() => {
    if (mode === "drill") return drillSlot ? [drillSlot] : [];
    return slots;
  }, [mode, drillSlot, slots]);

  function resetAnswers() {
    setValues({});
    setStatus(emptyStatus());
    setScored({});
    setShowHint(false);
    setDrillIndex(0);
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

  function evaluate(slotId: PersonId | "forma") {
    if (!verb || !tense) return;
    const given = values[slotId] ?? "";
    if (!given.trim()) return;
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
  }

  function evaluateAll() {
    for (const slot of visibleSlots) evaluate(slot.id);
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
    <div className="flex flex-col gap-4">
      <Card className="notebook-rule overflow-hidden">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex rounded-xl border border-border bg-surface-2 p-1">
              <button
                type="button"
                className={cn(
                  "h-10 rounded-lg px-3 text-sm font-medium",
                  mode === "table" ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground",
                )}
                onClick={() => {
                  setMode("table");
                  setDrillIndex(0);
                }}
              >
                Tabela
              </button>
              <button
                type="button"
                className={cn(
                  "h-10 rounded-lg px-3 text-sm font-medium",
                  mode === "drill" ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground",
                )}
                onClick={() => setMode("drill")}
              >
                Pessoa a pessoa
              </button>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={shuffle}>
              <Dices className="size-4" />
              Sortear
            </Button>
          </div>

          <div className={cn("grid gap-3", tense && verb ? "sm:grid-cols-2" : "grid-cols-1")}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="tense-select">Tempo verbal</Label>
              <Select value={tenseId || undefined} onValueChange={(v) => onTenseChange(v as TenseId)}>
                <SelectTrigger id="tense-select" aria-label="Escolher tempo verbal">
                  <SelectValue placeholder="Escolha o tempo verbal" />
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
            </div>

            {tense ? (
              <div
                className={cn(
                  "flex flex-col gap-2",
                  !verb && "rounded-xl border border-border bg-background p-3 sm:p-4",
                )}
              >
                <Label htmlFor="verb-select">Verbo</Label>
                <Select value={verbId || undefined} onValueChange={onVerbChange}>
                  <SelectTrigger id="verb-select" aria-label="Escolher verbo">
                    <SelectValue placeholder="Agora escolha o verbo" />
                  </SelectTrigger>
                  <SelectContent>
                    {VERB_GROUPS.map((group) => {
                      const items = VERBS.filter(group.match);
                      if (items.length === 0) return null;
                      return (
                        <SelectGroup key={group.id}>
                          <SelectLabel>{group.label}</SelectLabel>
                          {items.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.infinitive}
                              <span className="text-muted-foreground"> — {item.meaningPt}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      );
                    })}
                  </SelectContent>
                </Select>
                {!verb ? (
                  <p className="text-sm text-muted-foreground">{tense.namePt}</p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground sm:col-span-1">
                Primeiro o tempo, depois o verbo. O menu do verbo abre dentro deste cartão.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {tense && verb ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{tagLabel(verb)}</Badge>
            <Badge variant="outline">-{verb.ending}</Badge>
            {allCorrect ? <Badge variant="success">completo</Badge> : null}
            {endings ? (
              <button
                type="button"
                className="ml-auto flex h-10 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowHint((v) => !v)}
              >
                <Lightbulb className="size-4" />
                {showHint ? "Ocultar terminações" : "Terminações"}
              </button>
            ) : null}
          </div>

          {showHint && endings ? (
            <div className="overflow-x-auto rounded-xl border border-border bg-surface px-4 py-3 text-sm">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Padrão regular -{verb.ending}
              </p>
              <p className="font-display text-base tracking-wide">
                {endings.join("  ·  ")}
              </p>
              {verb.tags.includes("irregular") ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Este verbo é irregular — o padrão ajuda, mas a forma pode mudar.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
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
                    "rounded-xl border bg-surface p-3 sm:p-3.5",
                    state === "correct" && "border-success bg-success-bg",
                    state === "wrong" && "border-destructive bg-error-bg",
                    state === "idle" && "border-border",
                  )}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="sm:w-44 sm:shrink-0">
                      <p className="font-medium leading-tight">{slot.label}</p>
                      <p className="text-xs text-muted-foreground">{slot.hintPt}</p>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Input
                        ref={(node) => {
                          inputRefs.current[slot.id] = node;
                        }}
                        data-slot={slot.id}
                        value={values[slot.id] ?? ""}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        placeholder="escreva a forma"
                        aria-label={`Conjugar ${verb.infinitive}, ${slot.label}`}
                        className={cn(
                          "font-display text-lg",
                          state === "correct" && "border-success focus-visible:ring-success",
                          state === "wrong" && "border-destructive focus-visible:ring-destructive",
                        )}
                        onFocus={(event) => {
                          focusedRef.current = event.currentTarget;
                        }}
                        onChange={(event) => setValue(slot.id, event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            evaluate(slot.id);
                            if (mode === "table") {
                              const index = slots.findIndex((item) => item.id === slot.id);
                              const next = slots[index + 1];
                              if (next) inputRefs.current[next.id]?.focus();
                            }
                          }
                        }}
                        onBlur={() => {
                          if ((values[slot.id] ?? "").trim()) evaluate(slot.id);
                        }}
                      />
                      {state === "correct" ? (
                        <Check className="size-5 shrink-0 text-success" aria-label="correto" />
                      ) : null}
                    </div>
                  </div>
                  {state === "wrong" ? (
                    <p className="mt-2 text-sm">
                      <span className="text-destructive">
                        {accentHint ? "Quase — falta o acento. " : "Não é essa. "}
                      </span>
                      <span className="text-muted-foreground">Forma correta: </span>
                      <span className="font-display text-base text-foreground">{expected}</span>
                      <span className="text-muted-foreground"> — pode editar e seguir.</span>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <AccentBar onInsert={insertMark} />

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={evaluateAll}>
              Verificar
            </Button>
            {mode === "drill" ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (!drillSlot) return;
                  evaluate(drillSlot.id);
                  setDrillIndex((i) => (i + 1) % Math.max(slots.length, 1));
                }}
              >
                Próxima pessoa
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button type="button" variant="secondary" onClick={nextVerb}>
                Próximo verbo
                <ChevronRight className="size-4" />
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={resetAnswers}>
              <Eraser className="size-4" />
              Limpar
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setTenseId("");
                setVerbId("");
                resetAnswers();
              }}
            >
              <RotateCcw className="size-4" />
              Outro tempo
            </Button>
          </div>

          {verb.examples.length > 0 ? (
            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                No dia a dia
              </p>
              <ul className="flex flex-col gap-2">
                {verb.examples.map((ex) => (
                  <li key={ex.es}>
                    <p className="font-display text-base italic">{ex.es}</p>
                    <p className="text-sm text-muted-foreground">{ex.pt}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">{verb.usage}</p>
            </div>
          ) : null}

          {mode === "table" && slots.length > 0 ? (
            <p className="text-sm tabular-nums text-muted-foreground">
              {doneCount}/{slots.length} formas corretas nesta rodada
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
