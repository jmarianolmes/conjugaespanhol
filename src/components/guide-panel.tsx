import { PERSONS, PRESENT_ENDINGS, PRETERITE_ENDINGS, IMPERFECT_ENDINGS, SUBJUNCTIVE_ENDINGS, FUTURE_ENDINGS, CONDITIONAL_ENDINGS, GUIDE } from "@/lib/spanish";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PERSON_LABELS = PERSONS.map((p) => p.label);

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

export function GuidePanel() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl tracking-tight">Guia rápido</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Terminações, ser e estar, mudanças de radical e os acentos que trocam o tempo.
        </p>
      </div>

      <EndingTable
        title="Presente"
        rows={[
          { name: "-AR", cells: PRESENT_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER", cells: PRESENT_ENDINGS.er.map((e) => "-" + e) },
          { name: "-IR", cells: PRESENT_ENDINGS.ir.map((e) => "-" + e) },
        ]}
      />
      <EndingTable
        title="Pretérito indefinido"
        rows={[
          { name: "-AR", cells: PRETERITE_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER / -IR", cells: PRETERITE_ENDINGS.er.map((e) => "-" + e) },
        ]}
      />
      <EndingTable
        title="Pretérito imperfecto"
        rows={[
          { name: "-AR", cells: IMPERFECT_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER / -IR", cells: IMPERFECT_ENDINGS.er.map((e) => "-" + e) },
        ]}
      />
      <EndingTable
        title="Presente de subjuntivo"
        rows={[
          { name: "-AR", cells: SUBJUNCTIVE_ENDINGS.ar.map((e) => "-" + e) },
          { name: "-ER / -IR", cells: SUBJUNCTIVE_ENDINGS.er.map((e) => "-" + e) },
        ]}
      />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Futuro e condicional</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            O futuro cola o infinitivo + {FUTURE_ENDINGS.map((e) => "−" + e).join(", ")}.
            O condicional cola o infinitivo + {CONDITIONAL_ENDINGS.map((e) => "−" + e).join(", ")}.
          </p>
          <p className="text-muted-foreground">
            Radicais irregulares comuns: tendr-, har-, podr-, querr-, dir-, sabr-, habr-, saldr-,
            vendr-, pondr-.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{GUIDE.pronouns.title}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto pt-0">
          <table className="w-full text-left text-sm">
            <tbody>
              {GUIDE.pronouns.rows.map((row) => (
                <tr key={row[0]} className="border-b border-border/70 last:border-0">
                  <th className="py-2.5 pr-3 font-display text-base font-medium">{row[0]}</th>
                  <td className="py-2.5 pr-3">{row[1]}</td>
                  <td className="py-2.5 text-muted-foreground">{row[2]}</td>
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
              {GUIDE.serEstar.ser.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Estar</p>
            <ul className="flex flex-col gap-2 text-sm">
              {GUIDE.serEstar.estar.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="sm:col-span-2 rounded-lg bg-background px-3 py-2 text-sm">
            {GUIDE.serEstar.trick}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{GUIDE.stems.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {GUIDE.stems.groups.map((group) => (
            <div key={group.name}>
              <p className="font-medium">{group.name}</p>
              <p className="text-sm text-muted-foreground">{group.verbs}</p>
              <p className="mt-1 font-display text-base">{group.sample}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">{GUIDE.stems.note}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{GUIDE.accents.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm">
            {GUIDE.accents.items.map((item) => (
              <li key={item} className="font-display text-base">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{GUIDE.haber.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm">{GUIDE.haber.body}</p>
          <table className="w-full text-left text-sm">
            <tbody>
              {GUIDE.haber.table.map((row) => (
                <tr key={row[0]} className="border-b border-border/70 last:border-0">
                  <th className="py-2 pr-3 font-medium">{row[0]}</th>
                  <td className="py-2 font-display text-base">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
