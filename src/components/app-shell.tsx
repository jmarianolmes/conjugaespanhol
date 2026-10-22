import { GraduationCap, Languages, LayoutList, PenLine } from "lucide-react";
import { PracticeHub } from "@/components/practice-hub";
import { StatsPanel } from "@/components/stats-panel";
import { TheoryPanel } from "@/components/theory-panel";
import { VocabPanel } from "@/components/vocab-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHydrated } from "@/hooks/use-hydrated";
import { LOCALE_OPTIONS } from "@/lib/i18n/types";
import { useLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/ui";
import { useActiveProfile } from "@/lib/spanish";

export function AppShell() {
  const hydrated = useHydrated();
  const profile = useActiveProfile();
  const { locale, ready, setLocale } = useLocale();

  if (!ready) {
    return <div className="paper-grain min-h-dvh" aria-busy="true" />;
  }

  return (
    <div className="paper-grain min-h-dvh">
      <div className="mx-auto flex w-full max-w-3xl flex-col px-3 pb-16 pt-3 sm:px-6 sm:pb-16 sm:pt-6">
        <header className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-display text-[2rem] italic leading-none tracking-tight sm:text-5xl">
              Conjuga
            </h1>
            <p className="text-right text-xs tabular-nums text-muted-foreground sm:hidden">
              {hydrated ? (
                <>
                  <span className="block font-medium text-foreground">{t(locale, "onDevice")}</span>
                  {profile.totalCorrect} {t(locale, profile.totalCorrect === 1 ? "hit" : "hits")}
                </>
              ) : (
                "—"
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <label className="sr-only" htmlFor="site-lang">
              {t(locale, "langLabel")}
            </label>
            <select
              id="site-lang"
              value={locale}
              aria-label={t(locale, "langLabel")}
              onChange={(event) => setLocale(event.target.value as typeof locale)}
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground sm:w-auto"
            >
              {LOCALE_OPTIONS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="hidden text-right text-sm tabular-nums text-muted-foreground sm:block">
              {hydrated ? (
                <>
                  <span className="block font-medium text-foreground">{t(locale, "onDevice")}</span>
                  {profile.totalCorrect} {t(locale, profile.totalCorrect === 1 ? "hit" : "hits")}
                </>
              ) : (
                "—"
              )}
            </p>
          </div>
        </header>

        <Tabs defaultValue="praticar">
          <TabsList>
            <TabsTrigger value="praticar">
              <PenLine className="hidden size-4 sm:block" />
              {t(locale, "practice")}
            </TabsTrigger>
            <TabsTrigger value="palavras">
              <Languages className="hidden size-4 sm:block" />
              {t(locale, "words")}
            </TabsTrigger>
            <TabsTrigger value="teoria">
              <GraduationCap className="hidden size-4 sm:block" />
              {t(locale, "theory")}
            </TabsTrigger>
            <TabsTrigger value="progresso">
              <LayoutList className="hidden size-4 sm:block" />
              {t(locale, "progress")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="praticar">
            <PracticeHub />
          </TabsContent>
          <TabsContent value="palavras">
            <VocabPanel />
          </TabsContent>
          <TabsContent value="teoria">
            <TheoryPanel />
          </TabsContent>
          <TabsContent value="progresso">
            <StatsPanel />
          </TabsContent>
        </Tabs>
        <footer className="mt-8 text-center text-xs text-muted-foreground">{t(locale, "footer")}</footer>
      </div>
    </div>
  );
}
