import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  TENSES,
  VERBS,
  accuracy,
  getTense,
  getVerb,
  useActiveProfile,
  useProgress,
} from "@/lib/spanish";

export function StatsPanel() {
  const hydrated = useHydrated();
  const profile = useActiveProfile();
  const activeId = useProgress((s) => s.activeId);
  const profiles = useProgress((s) => s.profiles);
  const addPerson = useProgress((s) => s.addPerson);
  const setActive = useProgress((s) => s.setActive);
  const removePerson = useProgress((s) => s.removePerson);
  const reset = useProgress((s) => s.reset);
  const [newName, setNewName] = useState("");

  if (!hydrated) {
    return <p className="text-sm text-muted-foreground">Carregando o seu progresso…</p>;
  }

  const { totalCorrect, totalWrong, streak, bestStreak, byKey, recent } = profile;
  const total = totalCorrect + totalWrong;
  const pct = accuracy(totalCorrect, totalWrong);
  const people = Object.entries(profiles);

  const tenseRows = TENSES.map((tense) => {
    let correct = 0;
    let wrong = 0;
    for (const [key, tally] of Object.entries(byKey)) {
      if (key.startsWith(tense.id + ":")) {
        correct += tally.correct;
        wrong += tally.wrong;
      }
    }
    return { tense, correct, wrong, total: correct + wrong, pct: accuracy(correct, wrong) };
  }).filter((row) => row.total > 0);

  const verbRows = VERBS.map((verb) => {
    let correct = 0;
    let wrong = 0;
    for (const [key, tally] of Object.entries(byKey)) {
      if (key.endsWith(":" + verb.id)) {
        correct += tally.correct;
        wrong += tally.wrong;
      }
    }
    return { verb, correct, wrong, total: correct + wrong, pct: accuracy(correct, wrong) };
  })
    .filter((row) => row.total > 0)
    .sort((a, b) => a.pct - b.pct);

  const mistakes = recent.filter((item) => !item.ok).slice(0, 8);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-3xl tracking-tight">Progresso</h2>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Sem conta. Cada pessoa neste aparelho tem o seu caderno — fica só no navegador.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quem está praticando</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {people.map(([id, person]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={
                  id === activeId
                    ? "h-10 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
                    : "h-10 rounded-lg border border-border bg-surface px-3 text-sm"
                }
              >
                {person.name}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!newName.trim()) return;
              addPerson(newName);
              setNewName("");
            }}
          >
            <Input
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Nome de outra pessoa"
              aria-label="Nome da nova pessoa"
            />
            <Button type="submit" variant="secondary">
              Adicionar
            </Button>
          </form>
          {people.length > 1 ? (
            <button
              type="button"
              className="self-start text-sm text-muted-foreground hover:text-destructive"
              onClick={() => removePerson(activeId)}
            >
              Remover {profile.name} deste aparelho
            </button>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Acertos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-4xl tabular-nums leading-none">{totalCorrect}</p>
            <p className="mt-2 text-sm text-muted-foreground">{total} tentativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Precisão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-4xl tabular-nums leading-none">{pct}%</p>
            <Progress className="mt-3" value={pct} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Sequência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-4xl tabular-nums leading-none">{streak}</p>
            <p className="mt-2 text-sm text-muted-foreground">recorde {bestStreak}</p>
          </CardContent>
        </Card>
      </div>

      {tenseRows.length > 0 ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Por tempo verbal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {tenseRows.map((row) => (
              <div key={row.tense.id}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span>{row.tense.nameEs}</span>
                  <span className="tabular-nums text-muted-foreground">{row.pct}%</span>
                </div>
                <Progress value={row.pct} />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {verbRows.length > 0 ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Verbos que pedem mais treino</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {verbRows.slice(0, 8).map((row) => (
              <div key={row.verb.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span>
                  <span className="font-display text-base">{row.verb.infinitive}</span>
                  <span className="text-muted-foreground"> — {row.verb.meaningPt}</span>
                </span>
                <span className="tabular-nums text-muted-foreground">{row.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {mistakes.length > 0 ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Erros recentes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {mistakes.map((item) => {
              const verb = getVerb(item.verbId);
              const tense = getTense(item.tense);
              return (
                <div key={`${item.at}-${item.person}`} className="text-sm">
                  <p className="text-muted-foreground">
                    {tense.shortPt} · {verb.infinitive} · {item.person === "el" ? "él" : item.person === "tu" ? "tú" : item.person}
                  </p>
                  <p>
                    <span className="text-destructive">{item.given || "—"}</span>
                    <span className="text-muted-foreground"> → </span>
                    <span className="font-display text-base">{item.expected}</span>
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : null}

      {total === 0 ? (
        <p className="text-sm text-muted-foreground">
          Ainda não há tentativas nesta pessoa. Vá em Praticar e escreva as formas.
        </p>
      ) : (
        <Button type="button" variant="outline" onClick={reset}>
          Zerar progresso de {profile.name}
        </Button>
      )}
    </div>
  );
}
