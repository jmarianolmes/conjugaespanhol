import { Book, GraduationCap, LayoutList, PenLine } from "lucide-react";
import { GuidePanel } from "@/components/guide-panel";
import { PracticePanel } from "@/components/practice-panel";
import { StatsPanel } from "@/components/stats-panel";
import { TheoryPanel } from "@/components/theory-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHydrated } from "@/hooks/use-hydrated";
import { useActiveProfile } from "@/lib/spanish";

export function AppShell() {
  const hydrated = useHydrated();
  const profile = useActiveProfile();

  return (
    <div className="paper-grain min-h-dvh">
      <div className="mx-auto flex w-full max-w-3xl flex-col px-3 pb-24 pt-3 sm:px-6 sm:pb-16 sm:pt-6">
        <header className="mb-2 flex items-center justify-between gap-3 sm:mb-4">
          <h1 className="font-display text-[2rem] italic leading-none tracking-tight sm:text-5xl">
            Conjuga
          </h1>
          <p className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
            {hydrated ? (
              <>
                <span className="block font-medium text-foreground">{profile.name}</span>
                {profile.totalCorrect} acerto{profile.totalCorrect === 1 ? "" : "s"}
              </>
            ) : (
              "—"
            )}
          </p>
        </header>

        <Tabs defaultValue="praticar">
          <TabsList>
            <TabsTrigger value="praticar" className="gap-1 px-1 text-xs sm:gap-1.5 sm:px-2 sm:text-sm">
              <PenLine className="hidden size-4 sm:block" />
              Praticar
            </TabsTrigger>
            <TabsTrigger value="teoria" className="gap-1 px-1 text-xs sm:gap-1.5 sm:px-2 sm:text-sm">
              <GraduationCap className="hidden size-4 sm:block" />
              Teoria
            </TabsTrigger>
            <TabsTrigger value="guia" className="gap-1 px-1 text-xs sm:gap-1.5 sm:px-2 sm:text-sm">
              <Book className="hidden size-4 sm:block" />
              Guia
            </TabsTrigger>
            <TabsTrigger value="progresso" className="gap-1 px-1 text-xs sm:gap-1.5 sm:px-2 sm:text-sm">
              <LayoutList className="hidden size-4 sm:block" />
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
