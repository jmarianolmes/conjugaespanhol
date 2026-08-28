import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { THEORY } from "@/lib/spanish";

export function TheoryPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl tracking-tight">Como cada tempo funciona</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Explicações em português, com o paralelo do nosso idioma. Abra o tempo que está
          praticando e volte à conjugação com a regra fresca.
        </p>
      </div>
      <Accordion type="single" collapsible className="rounded-2xl border border-border bg-surface px-5">
        {THEORY.map((block) => (
          <AccordionItem key={block.id} value={block.id}>
            <AccordionTrigger>
              <span className="flex flex-col items-start gap-1 pr-3">
                <span>{block.title}</span>
                <span className="text-sm font-normal text-muted-foreground">{block.kicker}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex max-w-prose flex-col gap-3 text-foreground">
                {block.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {block.compare ? (
                  <p className="rounded-lg bg-background px-3 py-2 text-sm">
                    <span className="font-medium">No português. </span>
                    {block.compare}
                  </p>
                ) : null}
                <ul className="flex flex-col gap-2">
                  {block.examples.map((ex) => (
                    <li key={ex.es}>
                      <p className="font-display text-base italic text-foreground">{ex.es}</p>
                      <p className="text-sm text-muted-foreground">{ex.pt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
