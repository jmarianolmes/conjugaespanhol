import { PERSONS, PRESENT_ENDINGS, PRETERITE_ENDINGS, IMPERFECT_ENDINGS, SUBJUNCTIVE_ENDINGS, FUTURE_ENDINGS, CONDITIONAL_ENDINGS, GUIDE } from "@/lib/spanish";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale";
import { glossText } from "@/lib/i18n/content";
import { GUIDE_COPY } from "@/lib/i18n/gloss-theory";
import { TENSE_SHORT } from "@/lib/i18n/meta";
import { t } from "@/lib/i18n/ui";
import type { Gloss, Locale } from "@/lib/i18n/types";

const PERSON_LABELS = PERSONS.map((p) => p.label);

function line(locale: Locale, value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "en" in value) {
    return glossText(locale, value as Gloss, "");
  }
  return "";
}

function EndingTable({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ name: string; cells: string[] }>;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto pt-0">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
              <th className="py-2 pr-3 font-medium"> </th>
              {PERSON_LABELS.map((label) => (
                <th key={label} className="py-2 pr-3 font-medium">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-border/70 last:border-0">
                <th className="py-2.5 pr-3 font-medium">{row.name}</th>
                {row.cells.map((cell, index) => (
                  <td key={`${row.name}-${index}`} className="py-2.5 pr-3 font-display text-base">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function GuidePanel({ embedded = false }: { embedded?: boolean }) {
  const { locale } = useLocale();
  const copy = GUIDE_COPY;

  return (
    <div className="flex flex-col gap-6">
      {embedded ? (
        <div>
          <h3 className="font-display text-2xl tracking-tight">{t(locale, "endingsTitle")}</h3>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">{t(locale, "endingsIntro")}</p>
        </div>
      ) : (
        <div>
          <h2 className="font-display text-3xl tracking-tight">{t(locale, "endingsTitle")}</h2>
          <p className="mt-2 max-w-prose text-muted-foreground">{t(locale, "endingsIntro")}</p>
        </div>
      )}

      <EndingTable
        title={TENSE_SHORT.presente[locale]}
        rows={[
          { name: "-AR", cells: PRESENT_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER", cells: PRESENT_ENDINGS.er.map((e) => "-" + e) },
          { name: "-IR", cells: PRESENT_ENDINGS.ir.map((e) => "-" + e) },
        ]}
      />
      <EndingTable
        title={TENSE_SHORT.preterito[locale]}
        rows={[
          { name: "-AR", cells: PRETERITE_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER / -IR", cells: PRETERITE_ENDINGS.er.map((e) => "-" + e) },
        ]}
      />
      <EndingTable
        title={TENSE_SHORT.imperfecto[locale]}
        rows={[
          { name: "-AR", cells: IMPERFECT_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER / -IR", cells: IMPERFECT_ENDINGS.er.map((e) => "-" + e) },
        ]}
      />
      <EndingTable
        title={TENSE_SHORT.subjuntivo[locale]}
        rows={[
          { name: "-AR", cells: SUBJUNCTIVE_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER / -IR", cells: SUBJUNCTIVE_ENDINGS.er.map((e) => "-" + e) },
        ]}
      />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t(locale, "futureTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            {t(locale, "futureBody")} {FUTURE_ENDINGS.map((e) => "−" + e).join(", ")}.{" "}
            {CONDITIONAL_ENDINGS.map((e) => "−" + e).join(", ")}.
          </p>
          <p className="text-muted-foreground">{t(locale, "futureNote")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {locale === "pt" ? GUIDE.pronouns.title : glossText(locale, copy.pronouns.title, GUIDE.pronouns.title)}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto pt-0">
          <table className="w-full text-left text-sm">
            <tbody>
              {(locale === "pt" ? GUIDE.pronouns.rows : copy.pronouns.rows).map((row) => (
                <tr key={line(locale, row[0])} className="border-b border-border/70 last:border-0">
                  <th className="py-2.5 pr-3 font-display text-base font-medium">{line(locale, row[0])}</th>
                  <td className="py-2.5 pr-3">{line(locale, row[1])}</td>
                  <td className="py-2.5 text-muted-foreground">{line(locale, row[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{GUIDE.serEstar.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Ser</p>
            <ul className="flex flex-col gap-2 text-sm">
              {(locale === "pt" ? GUIDE.serEstar.ser : copy.serEstar.ser).map((item) => (
                <li key={line(locale, item as string | Gloss)}>{line(locale, item as string | Gloss)}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Estar</p>
            <ul className="flex flex-col gap-2 text-sm">
              {(locale === "pt" ? GUIDE.serEstar.estar : copy.serEstar.estar).map((item) => (
                <li key={line(locale, item as string | Gloss)}>{line(locale, item as string | Gloss)}</li>
              ))}
            </ul>
          </div>
          <p className="sm:col-span-2 rounded-lg bg-background px-3 py-2 text-sm">
            {locale === "pt" ? GUIDE.serEstar.trick : glossText(locale, copy.serEstar.trick, GUIDE.serEstar.trick)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {locale === "pt" ? GUIDE.stems.title : glossText(locale, copy.stems.title, GUIDE.stems.title)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {(locale === "pt" ? GUIDE.stems.groups : copy.stems.groups).map((group) => (
            <div key={line(locale, group.name as string | Gloss)}>
              <p className="font-medium">{line(locale, group.name as string | Gloss)}</p>
              <p className="text-sm text-muted-foreground">{line(locale, group.verbs as string | Gloss)}</p>
              <p className="mt-1 font-display text-base">{group.sample}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            {locale === "pt" ? GUIDE.stems.note : glossText(locale, copy.stems.note, GUIDE.stems.note)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {locale === "pt" ? GUIDE.accents.title : glossText(locale, copy.accents.title, GUIDE.accents.title)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            {(locale === "pt" ? GUIDE.accents.items : copy.accents.items).map((item) => (
              <li key={line(locale, item as string | Gloss)} className="font-display text-base">
                {line(locale, item as string | Gloss)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {locale === "pt" ? GUIDE.haber.title : glossText(locale, copy.haber.title, GUIDE.haber.title)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm">
            {locale === "pt" ? GUIDE.haber.body : glossText(locale, copy.haber.body, GUIDE.haber.body)}
          </p>
          <table className="w-full text-left text-sm">
            <tbody>
              {(locale === "pt" ? GUIDE.haber.table : copy.haber.table).map((row) => (
                <tr key={line(locale, row[0])} className="border-b border-border/70 last:border-0">
                  <th className="py-2 pr-3 font-medium">{line(locale, row[0])}</th>
                  <td className="py-2 font-display text-base">{line(locale, row[1])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
