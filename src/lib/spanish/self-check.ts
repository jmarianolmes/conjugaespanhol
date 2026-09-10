import { checkAnswer, formFor } from "./conjugate";
import { expectedFor, PHRASES } from "./phrases";
import { checkPrep, expectedPrep, PREP_PROMPTS } from "./prepositions";
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
  ["pedir", "presente", "yo", "pido"],
  ["pedir", "presente", "nosotros", "pedimos"],
  ["pedir", "preterito", "el", "pidió"],
  ["pedir", "preterito", "nosotros", "pedimos"],
  ["pedir", "gerundio", "forma", "pidiendo"],
  ["pedir", "subjuntivo", "tu", "pidas"],
  ["decir", "presente", "yo", "digo"],
  ["decir", "preterito", "el", "dijo"],
  ["decir", "participio", "forma", "dicho"],
  ["decir", "imperativo", "tu", "di"],
  ["decir", "futuro", "yo", "diré"],
  ["venir", "presente", "yo", "vengo"],
  ["venir", "futuro", "nosotros", "vendremos"],
  ["salir", "presente", "yo", "salgo"],
  ["salir", "imperativo", "tu", "sal"],
  ["poner", "preterito", "tu", "pusiste"],
  ["poner", "participio", "forma", "puesto"],
  ["saber", "presente", "yo", "sé"],
  ["saber", "preterito", "yo", "supe"],
  ["conocer", "presente", "yo", "conozco"],
  ["llegar", "preterito", "yo", "llegué"],
  ["volver", "presente", "yo", "vuelvo"],
  ["volver", "participio", "forma", "vuelto"],
  ["dormir", "presente", "yo", "duermo"],
  ["dormir", "preterito", "el", "durmió"],
  ["dormir", "gerundio", "forma", "durmiendo"],
  ["pensar", "presente", "yo", "pienso"],
  ["empezar", "preterito", "yo", "empecé"],
  ["llamar", "presente", "yo", "llamo"],
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
  for (const phrase of PHRASES) {
    const got = expectedFor(phrase);
    if (!got) {
      failures.push(`phrase ${phrase.id}: empty expected form`);
    }
    const verb = getVerb(phrase.verbId);
    const check = checkAnswer(verb, phrase.tense, phrase.person, got);
    if (!check.ok) {
      failures.push(`phrase ${phrase.id}: engine rejected ${got}`);
    }
  }
  for (const prompt of PREP_PROMPTS) {
    const expected = expectedPrep(prompt);
    const ok = checkPrep(prompt, expected);
    if (!ok.ok) failures.push(`prep ${prompt.id}: rejected canonical ${expected}`);
    for (const alias of prompt.aliases ?? []) {
      if (!checkPrep(prompt, alias).ok) {
        failures.push(`prep ${prompt.id}: rejected alias ${alias}`);
      }
    }
  }
  return failures;
}
