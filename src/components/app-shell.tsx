import { GraduationCap, Languages, LayoutList, PenLine } from "lucide-react";
import { PracticeHub } from "@/components/practice-hub";
import { StatsPanel } from "@/components/stats-panel";
import { TheoryPanel } from "@/components/theory-panel";
import { VocabPanel } from "@/components/vocab-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHydrated } from "@/hooks/use-hydrated";
import { UI_TEXT, useLanguage, type Language } from "@/lib/language";
import { useActiveProfile } from "@/lib/spanish";

const LANGUAGE_OPTIONS: { id: Language; flag: string; label: string }[] = [
  { id: "pt", flag: "🇧🇷", label: "Português" },
  { id: "es", flag: "🇪🇸", label: "Español" },
];

export function AppShell() {
  const hydrated = useHydrated();
  const profile = useActiveProfile();
  const { language, setLanguage, isReady } = useLanguage();
  const text = UI_TEXT[language];

  return (
    <div className="paper-grain min-h-dvh">
      <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-4 sm:px-6 sm:pb-16 sm:pt-7">
        <header className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
              Espanhol, um passo de cada vez
            </p>
            <h1 className="font-display text-[2.25rem] italic leading-none tracking-tight sm:text-5xl">
              {text.appName}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{text.tagline}</p>
          </div>
          <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
            <div className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
              {hydrated ? (
                <>
                  <span className="block font-medium text-foreground">{text.device}</span>
                  {profile.totalCorrect} {profile.totalCorrect === 1 ? text.correct : text.correctPlural}
                </>
              ) : (
                "—"
              )}
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-border bg-surface p-1" aria-label={text.languageLabel}>
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setLanguage(option.id)}
                  disabled={!isReady}
                  aria-label={option.label}
                  aria-pressed={language === option.id}
                  className={`flex h-8 items-center gap-1.5 rounded-lg px-2 text-sm transition-colors ${
                    language === option.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-surface-2"
                  }`}
                >
                  <span aria-hidden="true">{option.flag}</span>
                  <span className="hidden font-medium sm:inline">{option.id === "pt" ? "PT" : "ES"}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <Tabs defaultValue="praticar">
          <TabsList>
            <TabsTrigger value="praticar">
              <PenLine className="hidden size-4 sm:block" />
              {text.practice}
            </TabsTrigger>
            <TabsTrigger value="palavras">
              <Languages className="hidden size-4 sm:block" />
              {text.words}
            </TabsTrigger>
            <TabsTrigger value="teoria">
              <GraduationCap className="hidden size-4 sm:block" />
              {text.theory}
            </TabsTrigger>
            <TabsTrigger value="progresso">
              <LayoutList className="hidden size-4 sm:block" />
              {text.progress}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="praticar">
            <PracticeHub language={language} />
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
      </div>
    </div>
  );
}
