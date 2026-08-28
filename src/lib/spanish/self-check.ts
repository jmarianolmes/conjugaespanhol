import { checkAnswer, formFor } from "./conjugate";
import { getVerb } from "./verbs";

const cases: Array<[string, Parameters<typeof formFor>[1], Parameters<typeof formFor>[2], string]> = [
  ["hablar", "presente", "yo", "hablo"],
  ["hablar", "presente", "vosotros", "habláis"],
  ["hablar", "preterito", "yo", "hablé"],
  ["hablar", "preterito", "el", "habló"],
  ["hablar", "imperfecto", "nosotros", "hablábamos"],
  ["hablar", "futuro", "tu", "hablarás"],
  ["hablar", "condicional", "ellos", "hablarían"],
  ["hablar", "subjuntivo", "tu", "hables"],
  ["hablar", "imperfecto_subj", "nosotros", "habláramos"],
  ["hablar", "imperativo", "tu", "habla"],
  ["hablar", "imperativo", "vosotros", "hablad"],
  ["hablar", "imperativo_neg", "tu", "no hables"],
  ["hablar", "perfecto", "yo", "he hablado"],
  ["hablar", "gerundio", "forma", "hablando"],
  ["comer", "presente", "nosotros", "comemos"],
  ["comer", "preterito", "el", "comió"],
  ["vivir", "presente", "vosotros", "vivís"],
  ["vivir", "imperativo", "vosotros", "vivid"],
  ["leer", "preterito", "el", "leyó"],
  ["leer", "gerundio", "forma", "leyendo"],
  ["leer", "participio", "forma", "leído"],
  ["leer", "imperfecto_subj", "yo", "leyera"],
  ["escribir", "participio", "forma", "escrito"],
  ["abrir", "participio", "forma", "abierto"],
  ["ser", "presente", "yo", "soy"],
  ["ser", "preterito", "el", "fue"],
  ["ser", "imperfecto", "nosotros", "éramos"],
  ["ser", "subjuntivo", "yo", "sea"],
  ["ser", "imperativo", "tu", "sé"],
  ["ir", "presente", "yo", "voy"],
  ["ir", "imperfecto", "nosotros", "íbamos"],
  ["ir", "gerundio", "forma", "yendo"],
  ["ir", "imperativo", "tu", "ve"],
  ["ir", "imperativo", "nosotros", "vamos"],
  ["ir", "imperativo", "vosotros", "id"],
  ["estar", "presente", "yo", "estoy"],
  ["estar", "preterito", "el", "estuvo"],
  ["estar", "subjuntivo", "yo", "esté"],
  ["tener", "presente", "yo", "tengo"],
  ["tener", "presente", "tu", "tienes"],
  ["tener", "futuro", "yo", "tendré"],
  ["tener", "imperativo", "tu", "ten"],
  ["hacer", "presente", "yo", "hago"],
  ["hacer", "preterito", "el", "hizo"],
  ["hacer", "futuro", "yo", "haré"],
  ["hacer", "participio", "forma", "hecho"],
  ["hacer", "imperativo", "tu", "haz"],
  ["poder", "presente", "yo", "puedo"],
  ["poder", "presente", "nosotros", "podemos"],
  ["poder", "subjuntivo", "nosotros", "podamos"],
  ["querer", "futuro", "yo", "querré"],
  ["querer", "preterito", "yo", "quise"],
  ["ver", "presente", "yo", "veo"],
  ["ver", "imperfecto", "yo", "veía"],
  ["ver", "participio", "forma", "visto"],
  ["dar", "presente", "yo", "doy"],
  ["dar", "subjuntivo", "yo", "dé"],
  ["dar", "preterito", "ellos", "dieron"],
  ["dar", "imperfecto_subj", "yo", "diera"],
];

export function runSelfCheck(): string[] {
  const failures: string[] = [];
  for (const [verbId, tense, person, expected] of cases) {
    const verb = getVerb(verbId);
    const got = formFor(verb, tense, person);
    if (got !== expected) {
      failures.push(`${verbId} ${tense} ${person}: got ${got}, expected ${expected}`);
    }
    const check = checkAnswer(verb, tense, person, expected);
    if (!check.ok) {
      failures.push(`${verbId} ${tense} ${person}: checkAnswer rejected the expected form`);
    }
  }
  return failures;
}
