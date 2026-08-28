import { Book, GraduationCap, LayoutList, PenLine } from "lucide-react";
import { GuidePanel } from "@/components/guide-panel";
import { PracticePanel } from "@/components/practice-panel";
import { StatsPanel } from "@/components/stats-panel";
import { TheoryPanel } from "@/components/theory-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHydrated } from "@/hooks/use-hydrated";
import { useProgress } from "@/lib/spanish";

export function AppShell() {
  const hydrated = useHydrated();
  const totalCorrect = useProgress((s) => s.totalCorrect);

  return (
    <div className="paper-grain min-h-dvh">
      <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-5 sm:px-6 sm:pt-8">
        <header className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <h1 className="font-display text-4xl italic leading-none tracking-tight sm:text-5xl">
              Conjuga
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Tempos verbais em espanhol, com correção na hora.
            </p>
          </div>
          <p className="text-sm tabular-nums text-muted-foreground">
            {hydrated ? `${totalCorrect} acerto${totalCorrect === 1 ? "" : "s"}` : "—"}
          </p>
        </header>

        <Tabs defaultValue="praticar">
          <TabsList className="grid h-auto grid-cols-2 gap-1 sm:grid-cols-4">
            <TabsTrigger value="praticar" className="min-h-11 gap-1.5">
              <PenLine className="size-4" />
              Praticar
            </TabsTrigger>
            <TabsTrigger value="teoria" className="min-h-11 gap-1.5">
              <GraduationCap className="size-4" />
              Teoria
            </TabsTrigger>
            <TabsTrigger value="guia" className="min-h-11 gap-1.5">
              <Book className="size-4" />
              Guia
            </TabsTrigger>
            <TabsTrigger value="progresso" className="min-h-11 gap-1.5">
              <LayoutList className="size-4" />
              Progresso
            </TabsTrigger>
          </TabsList>
          <TabsContent value="praticar">
            <PracticePanel />
          </TabsContent>
          <TabsContent value="teoria">
            <TheoryPanel />
          </TabsContent>
          <TabsContent value="guia">
            <GuidePanel />
          </TabsContent>
          <TabsContent value="progresso">
            <StatsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
