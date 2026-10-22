import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GuidePanel } from "@/components/guide-panel";
import { glossAt, glossText } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import { THEORY_BODY, THEORY_COMPARE, THEORY_EX_PT, THEORY_KICKER, THEORY_TITLE } from "@/lib/i18n/gloss-theory";
import { t } from "@/lib/i18n/ui";
import { THEORY } from "@/lib/spanish";

export function TheoryPanel() {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl tracking-tight">{t(locale, "theoryTitle")}</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">{t(locale, "theoryIntro")}</p>
      </div>
      <Accordion type="single" collapsible className="rounded-2xl border border-border bg-surface px-5">
        {THEORY.map((block) => (
          <AccordionItem key={block.id} value={block.id}>
            <AccordionTrigger>
              <span className="flex flex-col items-start gap-1 pr-3">
                <span>{glossText(locale, THEORY_TITLE[block.id], block.title)}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {glossText(locale, THEORY_KICKER[block.id], block.kicker)}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex max-w-prose flex-col gap-3 text-foreground">
                {block.body.map((paragraph, index) => (
                  <p key={paragraph}>{glossAt(locale, THEORY_BODY[block.id], index, paragraph)}</p>
                ))}
                {block.compare ? (
                  <p className="rounded-lg bg-background px-3 py-2 text-sm">
                    <span className="font-medium">{t(locale, "comparePt")} </span>
                    {glossText(locale, THEORY_COMPARE[block.id], block.compare)}
                  </p>
                ) : null}
                <ul className="flex flex-col gap-2">
                  {block.examples.map((ex, index) => (
                    <li key={ex.es}>
                      <p className="font-display text-base italic text-foreground">{ex.es}</p>
                      <p className="text-sm text-muted-foreground">
                        {glossAt(locale, THEORY_EX_PT[block.id], index, ex.pt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <GuidePanel embedded />
    </div>
  );
}
