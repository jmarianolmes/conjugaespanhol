import type { PersonMeta, TenseId, TenseMeta } from "./types";

export const PERSONS: PersonMeta[] = [
  { id: "yo", label: "yo", hintPt: "eu" },
  { id: "tu", label: "tú", hintPt: "tu / você (informal)" },
  { id: "el", label: "él / ella / usted", hintPt: "ele / ela / você (formal)" },
  { id: "nosotros", label: "nosotros", hintPt: "nós" },
  { id: "vosotros", label: "vosotros", hintPt: "vocês (Espanha)" },
  { id: "ellos", label: "ellos / ellas / ustedes", hintPt: "eles / vocês" },
];

export const TENSES: TenseMeta[] = [
  {
    id: "presente",
    group: "indicativo",
    nameEs: "Presente",
    namePt: "Presente do indicativo",
    shortPt: "Presente",
    slots: "persons",
  },
  {
    id: "preterito",
    group: "indicativo",
    nameEs: "Pretérito indefinido",
    namePt: "Pretérito perfeito simples",
    shortPt: "Indefinido",
    slots: "persons",
  },
  {
    id: "imperfecto",
    group: "indicativo",
    nameEs: "Pretérito imperfecto",
    namePt: "Pretérito imperfeito",
    shortPt: "Imperfeito",
    slots: "persons",
  },
  {
    id: "perfecto",
    group: "indicativo",
    nameEs: "Pretérito perfecto",
    namePt: "Pretérito perfeito composto",
    shortPt: "Perfecto",
    slots: "persons",
    compound: true,
  },
  {
    id: "pluscuamperfecto",
    group: "indicativo",
    nameEs: "Pretérito pluscuamperfecto",
    namePt: "Mais-que-perfeito composto",
    shortPt: "Pluscuamperfecto",
    slots: "persons",
    compound: true,
  },
  {
    id: "futuro",
    group: "indicativo",
    nameEs: "Futuro simple",
    namePt: "Futuro do presente",
    shortPt: "Futuro",
    slots: "persons",
  },
  {
    id: "futuro_perfecto",
    group: "indicativo",
    nameEs: "Futuro compuesto",
    namePt: "Futuro composto",
    shortPt: "Futuro composto",
    slots: "persons",
    compound: true,
  },
  {
    id: "condicional",
    group: "indicativo",
    nameEs: "Condicional simple",
    namePt: "Futuro do pretérito",
    shortPt: "Condicional",
    slots: "persons",
  },
  {
    id: "condicional_perfecto",
    group: "indicativo",
    nameEs: "Condicional compuesto",
    namePt: "Futuro do pretérito composto",
    shortPt: "Cond. composto",
    slots: "persons",
    compound: true,
  },
  {
    id: "subjuntivo",
    group: "subjuntivo",
    nameEs: "Presente de subjuntivo",
    namePt: "Presente do subjuntivo",
    shortPt: "Subjuntivo",
    slots: "persons",
  },
  {
    id: "imperfecto_subj",
    group: "subjuntivo",
    nameEs: "Imperfecto de subjuntivo",
    namePt: "Pretérito imperfeito do subjuntivo",
    shortPt: "Imperf. subj.",
    slots: "persons",
  },
  {
    id: "perfecto_subj",
    group: "subjuntivo",
    nameEs: "Pretérito perfecto de subjuntivo",
    namePt: "Pretérito perfeito do subjuntivo",
    shortPt: "Perf. subj.",
    slots: "persons",
    compound: true,
  },
  {
    id: "pluscuamperfecto_subj",
    group: "subjuntivo",
    nameEs: "Pluscuamperfecto de subjuntivo",
    namePt: "Mais-que-perfeito do subjuntivo",
    shortPt: "Plusc. subj.",
    slots: "persons",
    compound: true,
  },
  {
    id: "imperativo",
    group: "imperativo",
    nameEs: "Imperativo afirmativo",
    namePt: "Imperativo afirmativo",
    shortPt: "Imperativo",
    slots: "personsNoYo",
  },
  {
    id: "imperativo_neg",
    group: "imperativo",
    nameEs: "Imperativo negativo",
    namePt: "Imperativo negativo",
    shortPt: "Imperativo neg.",
    slots: "personsNoYo",
  },
  {
    id: "gerundio",
    group: "no-personal",
    nameEs: "Gerundio",
    namePt: "Gerúndio",
    shortPt: "Gerúndio",
    slots: "single",
  },
  {
    id: "participio",
    group: "no-personal",
    nameEs: "Participio",
    namePt: "Particípio",
    shortPt: "Particípio",
    slots: "single",
  },
];

export const TENSE_GROUPS: { id: TenseMeta["group"]; label: string }[] = [
  { id: "indicativo", label: "Indicativo" },
  { id: "subjuntivo", label: "Subjuntivo" },
  { id: "imperativo", label: "Imperativo" },
  { id: "no-personal", label: "Formas não pessoais" },
];

export function getTense(id: TenseId): TenseMeta {
  const tense = TENSES.find((item) => item.id === id);
  if (!tense) throw new Error(`Unknown tense: ${id}`);
  return tense;
}
