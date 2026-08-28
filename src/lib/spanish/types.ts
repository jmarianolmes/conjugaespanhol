export const PERSON_IDS = [
  "yo",
  "tu",
  "el",
  "nosotros",
  "vosotros",
  "ellos",
] as const;

export type PersonId = (typeof PERSON_IDS)[number];

export type PersonMap = Record<PersonId, string>;

export type Ending = "ar" | "er" | "ir";

export type TenseGroup =
  | "indicativo"
  | "subjuntivo"
  | "imperativo"
  | "no-personal";

export type SlotKind = "persons" | "personsNoYo" | "single";

export type TenseId =
  | "presente"
  | "preterito"
  | "imperfecto"
  | "perfecto"
  | "pluscuamperfecto"
  | "futuro"
  | "futuro_perfecto"
  | "condicional"
  | "condicional_perfecto"
  | "subjuntivo"
  | "imperfecto_subj"
  | "perfecto_subj"
  | "pluscuamperfecto_subj"
  | "imperativo"
  | "imperativo_neg"
  | "gerundio"
  | "participio";

export interface TenseMeta {
  id: TenseId;
  group: TenseGroup;
  nameEs: string;
  namePt: string;
  shortPt: string;
  slots: SlotKind;
  compound?: boolean;
}

export interface PersonMeta {
  id: PersonId;
  label: string;
  hintPt: string;
}

export interface Slot {
  id: PersonId | "forma";
  label: string;
  hintPt: string;
}

export interface VerbDef {
  id: string;
  infinitive: string;
  ending: Ending;
  meaningPt: string;
  tags: Array<
    "regular" | "irregular" | "ortografico" | "participio-irregular"
  >;
  usage: string;
  examples: Array<{ es: string; pt: string }>;
  present?: PersonMap;
  preterite?: PersonMap;
  imperfect?: PersonMap;
  subjunctive?: PersonMap;
  futureStem?: string;
  gerund?: string;
  participle?: string;
  imperativeTu?: string;
  imperativeVosotros?: string;
  imperativeNosotros?: string;
  aliases?: Partial<Record<TenseId, Partial<Record<PersonId | "forma", string[]>>>>;
}

export interface CheckResult {
  ok: boolean;
  expected: string;
  accentOnly: boolean;
}
