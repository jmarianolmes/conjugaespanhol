import {
  CONDITIONAL_ENDINGS,
  FUTURE_ENDINGS,
  HABER,
  IMPERFECT_ENDINGS,
  PRESENT_ENDINGS,
  PRETERITE_ENDINGS,
  SUBJUNCTIVE_ENDINGS,
} from "./endings";
import { PERSONS, getTense } from "./tenses";
import type {
  CheckResult,
  Ending,
  PersonId,
  PersonMap,
  Slot,
  TenseId,
  VerbDef,
} from "./types";
import { PERSON_IDS } from "./types";

function stemOf(infinitive: string): string {
  return infinitive.slice(0, -2);
}

function endingOf(infinitive: string): Ending {
  return infinitive.slice(-2) as Ending;
}

function zip(stem: string, endings: string[]): PersonMap {
  return {
    yo: stem + endings[0],
    tu: stem + endings[1],
    el: stem + endings[2],
    nosotros: stem + endings[3],
    vosotros: stem + endings[4],
    ellos: stem + endings[5],
  };
}

function zipInfinitive(base: string, endings: string[]): PersonMap {
  return zip(base, endings);
}

function accentLastVowel(value: string): string {
  return value.replace(/([aeiouáéíóú])([^aeiouáéíóú]*)$/i, (_, vowel: string, rest: string) => {
    const map: Record<string, string> = {
      a: "á",
      e: "é",
      i: "í",
      o: "ó",
      u: "ú",
      A: "Á",
      E: "É",
      I: "Í",
      O: "Ó",
      U: "Ú",
    };
    return (map[vowel] ?? vowel) + rest;
  });
}

function fromPreteriteEllos(ellos: string): PersonMap {
  const base = ellos.replace(/ron$/, "");
  const nosotros = accentLastVowel(base) + "ramos";
  return {
    yo: base + "ra",
    tu: base + "ras",
    el: base + "ra",
    nosotros,
    vosotros: base + "rais",
    ellos: base + "ran",
  };
}

function regularPresent(verb: VerbDef): PersonMap {
  return zip(stemOf(verb.infinitive), PRESENT_ENDINGS[verb.ending]);
}

function regularPreterite(verb: VerbDef): PersonMap {
  return zip(stemOf(verb.infinitive), PRETERITE_ENDINGS[verb.ending]);
}

function regularImperfect(verb: VerbDef): PersonMap {
  return zip(stemOf(verb.infinitive), IMPERFECT_ENDINGS[verb.ending]);
}

function regularSubjunctive(verb: VerbDef): PersonMap {
  return zip(stemOf(verb.infinitive), SUBJUNCTIVE_ENDINGS[verb.ending]);
}

function regularFuture(verb: VerbDef): PersonMap {
  const base = verb.futureStem ?? verb.infinitive;
  return zipInfinitive(base, FUTURE_ENDINGS);
}

function regularConditional(verb: VerbDef): PersonMap {
  const base = verb.futureStem ?? verb.infinitive;
  return zipInfinitive(base, CONDITIONAL_ENDINGS);
}

function regularGerund(verb: VerbDef): string {
  if (verb.gerund) return verb.gerund;
  return stemOf(verb.infinitive) + (verb.ending === "ar" ? "ando" : "iendo");
}

function regularParticiple(verb: VerbDef): string {
  if (verb.participle) return verb.participle;
  return stemOf(verb.infinitive) + (verb.ending === "ar" ? "ado" : "ido");
}

function vosotrosImperative(verb: VerbDef): string {
  if (verb.imperativeVosotros) return verb.imperativeVosotros;
  return verb.infinitive.slice(0, -1) + "d";
}

function compound(haber: PersonMap, participle: string): PersonMap {
  return {
    yo: `${haber.yo} ${participle}`,
    tu: `${haber.tu} ${participle}`,
    el: `${haber.el} ${participle}`,
    nosotros: `${haber.nosotros} ${participle}`,
    vosotros: `${haber.vosotros} ${participle}`,
    ellos: `${haber.ellos} ${participle}`,
  };
}

export function formsFor(verb: VerbDef, tense: TenseId): PersonMap {
  const present = verb.present ?? regularPresent(verb);
  const preterite = verb.preterite ?? regularPreterite(verb);
  const imperfect = verb.imperfect ?? regularImperfect(verb);
  const subjunctive = verb.subjunctive ?? regularSubjunctive(verb);
  const participle = regularParticiple(verb);
  const gerund = regularGerund(verb);
  const future = regularFuture(verb);
  const conditional = regularConditional(verb);
  const imperfectSubj = fromPreteriteEllos(preterite.ellos);

  switch (tense) {
    case "presente":
      return present;
    case "preterito":
      return preterite;
    case "imperfecto":
      return imperfect;
    case "futuro":
      return future;
    case "condicional":
      return conditional;
    case "subjuntivo":
      return subjunctive;
    case "imperfecto_subj":
      return imperfectSubj;
    case "perfecto":
      return compound(HABER.presente, participle);
    case "pluscuamperfecto":
      return compound(HABER.imperfecto, participle);
    case "futuro_perfecto":
      return compound(HABER.futuro, participle);
    case "condicional_perfecto":
      return compound(HABER.condicional, participle);
    case "perfecto_subj":
      return compound(HABER.subjuntivo, participle);
    case "pluscuamperfecto_subj":
      return compound(HABER.imperfecto_subj, participle);
    case "gerundio":
      return {
        yo: gerund,
        tu: gerund,
        el: gerund,
        nosotros: gerund,
        vosotros: gerund,
        ellos: gerund,
      };
    case "participio":
      return {
        yo: participle,
        tu: participle,
        el: participle,
        nosotros: participle,
        vosotros: participle,
        ellos: participle,
      };
    case "imperativo": {
      return {
        yo: "",
        tu: verb.imperativeTu ?? present.el,
        el: subjunctive.el,
        nosotros: verb.imperativeNosotros ?? subjunctive.nosotros,
        vosotros: vosotrosImperative(verb),
        ellos: subjunctive.ellos,
      };
    }
    case "imperativo_neg": {
      return {
        yo: "",
        tu: `no ${subjunctive.tu}`,
        el: `no ${subjunctive.el}`,
        nosotros: `no ${subjunctive.nosotros}`,
        vosotros: `no ${subjunctive.vosotros}`,
        ellos: `no ${subjunctive.ellos}`,
      };
    }
  }
}

export function formFor(
  verb: VerbDef,
  tense: TenseId,
  person: PersonId | "forma",
): string {
  const forms = formsFor(verb, tense);
  if (person === "forma") return forms.yo;
  return forms[person];
}

export function slotsFor(tense: TenseId): Slot[] {
  const meta = getTense(tense);
  if (meta.slots === "single") {
    return [{ id: "forma", label: "forma", hintPt: "forma única" }];
  }
  const people =
    meta.slots === "personsNoYo" ? PERSONS.filter((p) => p.id !== "yo") : PERSONS;
  return people.map((p) => ({ id: p.id, label: p.label, hintPt: p.hintPt }));
}

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "");
}

export function checkAnswer(
  verb: VerbDef,
  tense: TenseId,
  person: PersonId | "forma",
  raw: string,
): CheckResult {
  const expected = formFor(verb, tense, person);
  const aliases = verb.aliases?.[tense]?.[person] ?? [];
  const accepted = [expected, ...aliases].map(normalizeAnswer);
  const given = normalizeAnswer(raw);
  if (accepted.includes(given)) {
    return { ok: true, expected, accentOnly: false };
  }
  const givenPlain = stripDiacritics(given);
  const accentOnly = accepted.some((item) => stripDiacritics(item) === givenPlain);
  return { ok: false, expected, accentOnly };
}

export function regularEndingsFor(tense: TenseId, ending: Ending): string[] | null {
  switch (tense) {
    case "presente":
      return PRESENT_ENDINGS[ending];
    case "preterito":
      return PRETERITE_ENDINGS[ending];
    case "imperfecto":
      return IMPERFECT_ENDINGS[ending];
    case "subjuntivo":
      return SUBJUNCTIVE_ENDINGS[ending];
    case "futuro":
      return FUTURE_ENDINGS.map((item) => "inf. + " + item);
    case "condicional":
      return CONDITIONAL_ENDINGS.map((item) => "inf. + " + item);
    case "gerundio":
      return [ending === "ar" ? "-ando" : "-iendo"];
    case "participio":
      return [ending === "ar" ? "-ado" : "-ido"];
    case "imperativo":
      return ending === "ar"
        ? ["—", "-a", "-e", "-emos", "-ad", "-en"]
        : ending === "er"
          ? ["—", "-e", "-a", "-amos", "-ed", "-an"]
          : ["—", "-e", "-a", "-amos", "-id", "-an"];
    default:
      return null;
  }
}

export { PERSON_IDS, endingOf, stemOf };
