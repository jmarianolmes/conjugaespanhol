import type { Ending, PersonMap } from "./types";

export const PRESENT_ENDINGS: Record<Ending, string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};

export const PRETERITE_ENDINGS: Record<Ending, string[]> = {
  ar: ["é", "aste", "ó", "amos", "asteis", "aron"],
  er: ["í", "iste", "ió", "imos", "isteis", "ieron"],
  ir: ["í", "iste", "ió", "imos", "isteis", "ieron"],
};

export const IMPERFECT_ENDINGS: Record<Ending, string[]> = {
  ar: ["aba", "abas", "aba", "ábamos", "abais", "aban"],
  er: ["ía", "ías", "ía", "íamos", "íais", "ían"],
  ir: ["ía", "ías", "ía", "íamos", "íais", "ían"],
};

export const SUBJUNCTIVE_ENDINGS: Record<Ending, string[]> = {
  ar: ["e", "es", "e", "emos", "éis", "en"],
  er: ["a", "as", "a", "amos", "áis", "an"],
  ir: ["a", "as", "a", "amos", "áis", "an"],
};

export const FUTURE_ENDINGS = ["é", "ás", "á", "emos", "éis", "án"];
export const CONDITIONAL_ENDINGS = ["ía", "ías", "ía", "íamos", "íais", "ían"];

export const HABER = {
  presente: {
    yo: "he",
    tu: "has",
    el: "ha",
    nosotros: "hemos",
    vosotros: "habéis",
    ellos: "han",
  } satisfies PersonMap,
  imperfecto: {
    yo: "había",
    tu: "habías",
    el: "había",
    nosotros: "habíamos",
    vosotros: "habíais",
    ellos: "habían",
  } satisfies PersonMap,
  futuro: {
    yo: "habré",
    tu: "habrás",
    el: "habrá",
    nosotros: "habremos",
    vosotros: "habréis",
    ellos: "habrán",
  } satisfies PersonMap,
  condicional: {
    yo: "habría",
    tu: "habrías",
    el: "habría",
    nosotros: "habríamos",
    vosotros: "habríais",
    ellos: "habrían",
  } satisfies PersonMap,
  subjuntivo: {
    yo: "haya",
    tu: "hayas",
    el: "haya",
    nosotros: "hayamos",
    vosotros: "hayáis",
    ellos: "hayan",
  } satisfies PersonMap,
  imperfecto_subj: {
    yo: "hubiera",
    tu: "hubieras",
    el: "hubiera",
    nosotros: "hubiéramos",
    vosotros: "hubierais",
    ellos: "hubieran",
  } satisfies PersonMap,
};

export const REGULAR_CHART: Record<
  string,
  { ar: string[]; er: string[]; ir: string[] }
> = {
  presente: PRESENT_ENDINGS,
  preterito: PRETERITE_ENDINGS,
  imperfecto: IMPERFECT_ENDINGS,
  subjuntivo: SUBJUNCTIVE_ENDINGS,
  futuro: {
    ar: FUTURE_ENDINGS.map((e) => "-ar + " + e),
    er: FUTURE_ENDINGS.map((e) => "-er + " + e),
    ir: FUTURE_ENDINGS.map((e) => "-ir + " + e),
  },
  condicional: {
    ar: CONDITIONAL_ENDINGS.map((e) => "-ar + " + e),
    er: CONDITIONAL_ENDINGS.map((e) => "-er + " + e),
    ir: CONDITIONAL_ENDINGS.map((e) => "-ir + " + e),
  },
};
