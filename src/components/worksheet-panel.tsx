import { useMemo, useState } from "react";
import { Dices, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONNECTOR_GROUPS, CONNECTOR_PROMPTS } from "@/lib/spanish/connectors";
import { formFor, slotsFor } from "@/lib/spanish/conjugate";
import { expectedFor, PHRASES } from "@/lib/spanish/phrases";
import { expectedPrep, PREP_GROUPS, PREP_PROMPTS, PREPOSITIONS } from "@/lib/spanish/prepositions";
import { SER_ESTAR, VOCAB, VOCAB_KINDS, vocabFor } from "@/lib/spanish/vocab";
import { PERSONS, TENSES } from "@/lib/spanish/tenses";
import { VERBS } from "@/lib/spanish/verbs";
import type { VocabKind } from "@/lib/spanish";
import type { PersonId } from "@/lib/spanish/types";
import { useLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/ui";

type WorksheetKind = "conjugation" | "phrases" | "prepositions" | "vocabulary" | "connectors";
type WorksheetItem = { prompt: string; answer: string };

const WORKSHEET_KINDS: WorksheetKind[] = ["conjugation", "phrases", "prepositions", "vocabulary", "connectors"];

function shuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = (seed + 1) * 2654435761;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swap = state % (index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

function filterLabel(kind: WorksheetKind, filter: string, locale: string): string {
  if (kind === "conjugation" || kind === "phrases") {
    const tense = TENSES.find((item) => item.id === filter);
    return tense ? (locale === "pt" ? tense.namePt : tense.nameEs) : "Todos os tempos";
  }
  if (kind === "prepositions") {
    return PREP_GROUPS.find((item) => item.id === filter)?.label ?? PREPOSITIONS.find((item) => item.id === filter)?.label ?? "Todas as preposições";
  }
  if (kind === "vocabulary") {
    return VOCAB_KINDS.find((item) => item.id === filter)?.label ?? (filter === "ser-estar" ? "Ser / estar" : "Todas as palavras");
  }
  return CONNECTOR_GROUPS.find((item) => item.id === filter)?.title ?? "Todos os conectores";
}

export function WorksheetPanel() {
  const { locale } = useLocale();
  const [kind, setKind] = useState<WorksheetKind>("phrases");
  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState(15);
  const [includeKey, setIncludeKey] = useState(true);
  const [seed, setSeed] = useState(0);

  const candidates = useMemo<WorksheetItem[]>(() => {
    if (kind === "conjugation") {
      const selectedTenses = filter === "all" ? TENSES : TENSES.filter((item) => item.id === filter);
      return selectedTenses.flatMap((selectedTense) => {
        const slots = slotsFor(selectedTense.id);
        return VERBS.flatMap((verb) => slots.map((slot) => {
          const personName = slot.id === "forma" ? "forma única" : PERSONS.find((person) => person.id === slot.id)?.label ?? slot.label;
          return {
            prompt: `${verb.infinitive} · ${personName} (${selectedTense.nameEs})`,
            answer: formFor(verb, selectedTense.id, slot.id as PersonId | "forma"),
          };
        }));
      });
    }
    if (kind === "phrases") {
      const pool = filter === "all" ? PHRASES : PHRASES.filter((item) => item.tense === filter);
      return pool.map((phrase) => ({
        prompt: `${phrase.before}________${phrase.after}`,
        answer: expectedFor(phrase),
      }));
    }
    if (kind === "prepositions") {
      const pool = PREP_PROMPTS.filter((item) => {
        if (filter === "all") return true;
        if (PREP_GROUPS.some((group) => group.id === filter)) {
          return PREPOSITIONS.some((meta) => meta.id === item.prep && meta.group === filter);
        }
        return item.prep === filter;
      });
      return pool.map((prompt) => ({ prompt: `${prompt.before}________${prompt.after}`, answer: expectedPrep(prompt) }));
    }
    if (kind === "vocabulary") {
      if (filter === "ser-estar") {
        return SER_ESTAR.map((prompt) => ({ prompt: `${prompt.before}________${prompt.after}`, answer: prompt.fill }));
      }
      const pool = filter === "all" ? VOCAB : vocabFor(filter as VocabKind);
      return pool.map((entry) => ({ prompt: `¿Qué significa «${entry.es}» en portugués?`, answer: entry.pt }));
    }
    const pool = filter === "all" ? CONNECTOR_PROMPTS : CONNECTOR_PROMPTS.filter((item) => item.group === filter);
    return pool.map((prompt) => ({ prompt: prompt.before.replace("___", "________"), answer: prompt.answers.join(" / ") }));
  }, [filter, kind]);

  const items = useMemo(() => shuffle(candidates, seed).slice(0, Math.min(count, candidates.length)), [candidates, count, seed]);
  const filterOptions = useMemo(() => {
    if (kind === "conjugation" || kind === "phrases") return TENSES.map((item) => ({ value: item.id, label: locale === "pt" ? item.namePt : item.nameEs }));
    if (kind === "prepositions") return [
      ...PREP_GROUPS.map((item) => ({ value: item.id, label: item.label })),
      ...PREPOSITIONS.map((item) => ({ value: item.id, label: item.label })),
    ];
    if (kind === "vocabulary") return [
      ...VOCAB_KINDS.map((item) => ({ value: item.id, label: item.label })),
      { value: "ser-estar", label: "Ser / estar" },
    ];
    return CONNECTOR_GROUPS.map((item) => ({ value: item.id, label: item.title }));
  }, [kind, locale]);

  function changeKind(next: WorksheetKind) {
    setKind(next);
    setFilter("all");
    setSeed((value) => value + 1);
  }

  const title = `${t(locale, "worksheetTitle")} — ${filterLabel(kind, filter, locale)}`;
  const activityLabel: Record<WorksheetKind, string> = {
    conjugation: t(locale, "verbs"),
    phrases: t(locale, "phrases"),
    prepositions: t(locale, "prep"),
    vocabulary: t(locale, "words"),
    connectors: t(locale, "connectors"),
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t(locale, "worksheetEyebrow")}</p>
        <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl">{t(locale, "worksheetTitle")}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{t(locale, "worksheetIntro")}</p>
          </div>
          <Button type="button" variant="outline" className="h-11" onClick={() => setSeed((value) => value + 1)} disabled={candidates.length === 0}>
            <Dices className="size-4" />
            {t(locale, "worksheetShuffle")}
          </Button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
            {t(locale, "worksheetActivity")}
            <select value={kind} onChange={(event) => changeKind(event.target.value as WorksheetKind)} className="h-11 rounded-lg border border-input bg-surface px-3 text-sm font-medium text-foreground">
              {WORKSHEET_KINDS.map((item) => <option key={item} value={item}>{activityLabel[item]}</option>)}
            </select>
          </label>
          {filterOptions.length ? (
            <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
              {kind === "phrases" || kind === "conjugation" ? t(locale, "worksheetTense") : t(locale, "worksheetCategory")}
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="h-11 rounded-lg border border-input bg-surface px-3 text-sm font-medium text-foreground">
                <option value="all">{kind === "phrases" || kind === "conjugation" ? t(locale, "allTenses") : t(locale, "worksheetAll")}</option>
                {filterOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
          ) : null}
          <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
            {t(locale, "worksheetQuestionCount")}
            <select value={count} onChange={(event) => setCount(Number(event.target.value))} className="h-11 rounded-lg border border-input bg-surface px-3 text-sm font-medium text-foreground">
              {[10, 15, 20, 30].map((amount) => <option key={amount} value={amount}>{amount}</option>)}
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 self-end rounded-lg border border-border bg-background px-3 text-sm font-medium">
            <input type="checkbox" checked={includeKey} onChange={(event) => setIncludeKey(event.target.checked)} className="size-4 accent-primary" />
            {t(locale, "worksheetAnswerKey")}
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <p className="text-sm text-muted-foreground">{items.length} {t(locale, "worksheetItemsAvailable")}</p>
          <Button type="button" className="h-11" onClick={() => window.print()} disabled={!items.length}>
            <Printer className="size-4" />
            {t(locale, "worksheetPrint")}
          </Button>
        </div>
      </section>

      <section className="worksheet-print rounded-xl border border-border bg-surface p-4 sm:p-6" aria-label={t(locale, "worksheetPreview")}>
        <header className="worksheet-header border-b border-border pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Conjuga · {activityLabel[kind]}</p>
          <h2 className="mt-1 font-display text-2xl">{title}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <p>{t(locale, "worksheetName")}: <span className="worksheet-line" /></p>
            <p>{t(locale, "worksheetDate")}: <span className="worksheet-line" /></p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t(locale, "worksheetInstruction")}</p>
        </header>
        <ol className="worksheet-questions mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={`${seed}-${index}`} className="worksheet-question break-inside-avoid">
              <span>{item.prompt}</span>
              {kind === "conjugation" || kind === "vocabulary" ? <span className="worksheet-answer-space" /> : <span className="worksheet-writing-line" />}
            </li>
          ))}
        </ol>
        {includeKey ? (
          <section className="worksheet-key mt-8 border-t border-border pt-5">
            <h3 className="font-display text-xl font-semibold">{t(locale, "worksheetAnswerKey")}</h3>
            <ol className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {items.map((item, index) => <li key={`${seed}-${index}-answer`} className="break-inside-avoid text-sm">{item.answer}</li>)}
            </ol>
          </section>
        ) : null}
      </section>
    </div>
  );
}
