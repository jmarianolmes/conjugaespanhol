import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, h as Slot, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as LayoutList, c as Dices, d as ChevronDown, f as Check, i as Lightbulb, l as ChevronUp, n as RotateCcw, o as GraduationCap, p as Book, r as PenLine, s as Eraser, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as SelectItem$1, c as SelectLabel$1, d as SelectScrollUpButton$1, f as SelectSeparator$1, h as SelectViewport, i as SelectIcon, l as SelectPortal, m as SelectValue$1, n as SelectContent$1, o as SelectItemIndicator, p as SelectTrigger$1, r as SelectGroup$1, s as SelectItemText, t as Select$1, u as SelectScrollDownButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as Root$1, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { i as Trigger, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BuyROUV5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERSONS = [
	{
		id: "yo",
		label: "yo",
		hintPt: "eu"
	},
	{
		id: "tu",
		label: "tú",
		hintPt: "tu / você (informal)"
	},
	{
		id: "el",
		label: "él / ella / usted",
		hintPt: "ele / ela / você (formal)"
	},
	{
		id: "nosotros",
		label: "nosotros",
		hintPt: "nós"
	},
	{
		id: "vosotros",
		label: "vosotros",
		hintPt: "vocês (Espanha)"
	},
	{
		id: "ellos",
		label: "ellos / ellas / ustedes",
		hintPt: "eles / vocês"
	}
];
var TENSES = [
	{
		id: "presente",
		group: "indicativo",
		nameEs: "Presente",
		namePt: "Presente do indicativo",
		shortPt: "Presente",
		slots: "persons"
	},
	{
		id: "preterito",
		group: "indicativo",
		nameEs: "Pretérito indefinido",
		namePt: "Pretérito perfeito simples",
		shortPt: "Indefinido",
		slots: "persons"
	},
	{
		id: "imperfecto",
		group: "indicativo",
		nameEs: "Pretérito imperfecto",
		namePt: "Pretérito imperfeito",
		shortPt: "Imperfeito",
		slots: "persons"
	},
	{
		id: "perfecto",
		group: "indicativo",
		nameEs: "Pretérito perfecto",
		namePt: "Pretérito perfeito composto",
		shortPt: "Perfecto",
		slots: "persons",
		compound: true
	},
	{
		id: "pluscuamperfecto",
		group: "indicativo",
		nameEs: "Pretérito pluscuamperfecto",
		namePt: "Mais-que-perfeito composto",
		shortPt: "Pluscuamperfecto",
		slots: "persons",
		compound: true
	},
	{
		id: "futuro",
		group: "indicativo",
		nameEs: "Futuro simple",
		namePt: "Futuro do presente",
		shortPt: "Futuro",
		slots: "persons"
	},
	{
		id: "futuro_perfecto",
		group: "indicativo",
		nameEs: "Futuro compuesto",
		namePt: "Futuro composto",
		shortPt: "Futuro composto",
		slots: "persons",
		compound: true
	},
	{
		id: "condicional",
		group: "indicativo",
		nameEs: "Condicional simple",
		namePt: "Futuro do pretérito",
		shortPt: "Condicional",
		slots: "persons"
	},
	{
		id: "condicional_perfecto",
		group: "indicativo",
		nameEs: "Condicional compuesto",
		namePt: "Futuro do pretérito composto",
		shortPt: "Cond. composto",
		slots: "persons",
		compound: true
	},
	{
		id: "subjuntivo",
		group: "subjuntivo",
		nameEs: "Presente de subjuntivo",
		namePt: "Presente do subjuntivo",
		shortPt: "Subjuntivo",
		slots: "persons"
	},
	{
		id: "imperfecto_subj",
		group: "subjuntivo",
		nameEs: "Imperfecto de subjuntivo",
		namePt: "Pretérito imperfeito do subjuntivo",
		shortPt: "Imperf. subj.",
		slots: "persons"
	},
	{
		id: "perfecto_subj",
		group: "subjuntivo",
		nameEs: "Pretérito perfecto de subjuntivo",
		namePt: "Pretérito perfeito do subjuntivo",
		shortPt: "Perf. subj.",
		slots: "persons",
		compound: true
	},
	{
		id: "pluscuamperfecto_subj",
		group: "subjuntivo",
		nameEs: "Pluscuamperfecto de subjuntivo",
		namePt: "Mais-que-perfeito do subjuntivo",
		shortPt: "Plusc. subj.",
		slots: "persons",
		compound: true
	},
	{
		id: "imperativo",
		group: "imperativo",
		nameEs: "Imperativo afirmativo",
		namePt: "Imperativo afirmativo",
		shortPt: "Imperativo",
		slots: "personsNoYo"
	},
	{
		id: "imperativo_neg",
		group: "imperativo",
		nameEs: "Imperativo negativo",
		namePt: "Imperativo negativo",
		shortPt: "Imperativo neg.",
		slots: "personsNoYo"
	},
	{
		id: "gerundio",
		group: "no-personal",
		nameEs: "Gerundio",
		namePt: "Gerúndio",
		shortPt: "Gerúndio",
		slots: "single"
	},
	{
		id: "participio",
		group: "no-personal",
		nameEs: "Participio",
		namePt: "Particípio",
		shortPt: "Particípio",
		slots: "single"
	}
];
var TENSE_GROUPS = [
	{
		id: "indicativo",
		label: "Indicativo"
	},
	{
		id: "subjuntivo",
		label: "Subjuntivo"
	},
	{
		id: "imperativo",
		label: "Imperativo"
	},
	{
		id: "no-personal",
		label: "Formas não pessoais"
	}
];
function getTense(id) {
	const tense = TENSES.find((item) => item.id === id);
	if (!tense) throw new Error(`Unknown tense: ${id}`);
	return tense;
}
var PRESENT_ENDINGS = {
	ar: [
		"o",
		"as",
		"a",
		"amos",
		"áis",
		"an"
	],
	er: [
		"o",
		"es",
		"e",
		"emos",
		"éis",
		"en"
	],
	ir: [
		"o",
		"es",
		"e",
		"imos",
		"ís",
		"en"
	]
};
var PRETERITE_ENDINGS = {
	ar: [
		"é",
		"aste",
		"ó",
		"amos",
		"asteis",
		"aron"
	],
	er: [
		"í",
		"iste",
		"ió",
		"imos",
		"isteis",
		"ieron"
	],
	ir: [
		"í",
		"iste",
		"ió",
		"imos",
		"isteis",
		"ieron"
	]
};
var IMPERFECT_ENDINGS = {
	ar: [
		"aba",
		"abas",
		"aba",
		"ábamos",
		"abais",
		"aban"
	],
	er: [
		"ía",
		"ías",
		"ía",
		"íamos",
		"íais",
		"ían"
	],
	ir: [
		"ía",
		"ías",
		"ía",
		"íamos",
		"íais",
		"ían"
	]
};
var SUBJUNCTIVE_ENDINGS = {
	ar: [
		"e",
		"es",
		"e",
		"emos",
		"éis",
		"en"
	],
	er: [
		"a",
		"as",
		"a",
		"amos",
		"áis",
		"an"
	],
	ir: [
		"a",
		"as",
		"a",
		"amos",
		"áis",
		"an"
	]
};
var FUTURE_ENDINGS = [
	"é",
	"ás",
	"á",
	"emos",
	"éis",
	"án"
];
var CONDITIONAL_ENDINGS = [
	"ía",
	"ías",
	"ía",
	"íamos",
	"íais",
	"ían"
];
var HABER = {
	presente: {
		yo: "he",
		tu: "has",
		el: "ha",
		nosotros: "hemos",
		vosotros: "habéis",
		ellos: "han"
	},
	imperfecto: {
		yo: "había",
		tu: "habías",
		el: "había",
		nosotros: "habíamos",
		vosotros: "habíais",
		ellos: "habían"
	},
	futuro: {
		yo: "habré",
		tu: "habrás",
		el: "habrá",
		nosotros: "habremos",
		vosotros: "habréis",
		ellos: "habrán"
	},
	condicional: {
		yo: "habría",
		tu: "habrías",
		el: "habría",
		nosotros: "habríamos",
		vosotros: "habríais",
		ellos: "habrían"
	},
	subjuntivo: {
		yo: "haya",
		tu: "hayas",
		el: "haya",
		nosotros: "hayamos",
		vosotros: "hayáis",
		ellos: "hayan"
	},
	imperfecto_subj: {
		yo: "hubiera",
		tu: "hubieras",
		el: "hubiera",
		nosotros: "hubiéramos",
		vosotros: "hubierais",
		ellos: "hubieran"
	}
};
FUTURE_ENDINGS.map((e) => "-ar + " + e), FUTURE_ENDINGS.map((e) => "-er + " + e), FUTURE_ENDINGS.map((e) => "-ir + " + e), CONDITIONAL_ENDINGS.map((e) => "-ar + " + e), CONDITIONAL_ENDINGS.map((e) => "-er + " + e), CONDITIONAL_ENDINGS.map((e) => "-ir + " + e);
function stemOf(infinitive) {
	return infinitive.slice(0, -2);
}
function zip(stem, endings) {
	return {
		yo: stem + endings[0],
		tu: stem + endings[1],
		el: stem + endings[2],
		nosotros: stem + endings[3],
		vosotros: stem + endings[4],
		ellos: stem + endings[5]
	};
}
function zipInfinitive(base, endings) {
	return zip(base, endings);
}
function accentLastVowel(value) {
	return value.replace(/([aeiouáéíóú])([^aeiouáéíóú]*)$/i, (_, vowel, rest) => {
		return ({
			a: "á",
			e: "é",
			i: "í",
			o: "ó",
			u: "ú",
			A: "Á",
			E: "É",
			I: "Í",
			O: "Ó",
			U: "Ú"
		}[vowel] ?? vowel) + rest;
	});
}
function fromPreteriteEllos(ellos) {
	const base = ellos.replace(/ron$/, "");
	const nosotros = accentLastVowel(base) + "ramos";
	return {
		yo: base + "ra",
		tu: base + "ras",
		el: base + "ra",
		nosotros,
		vosotros: base + "rais",
		ellos: base + "ran"
	};
}
function regularPresent(verb) {
	return zip(stemOf(verb.infinitive), PRESENT_ENDINGS[verb.ending]);
}
function regularPreterite(verb) {
	return zip(stemOf(verb.infinitive), PRETERITE_ENDINGS[verb.ending]);
}
function regularImperfect(verb) {
	return zip(stemOf(verb.infinitive), IMPERFECT_ENDINGS[verb.ending]);
}
function regularSubjunctive(verb) {
	return zip(stemOf(verb.infinitive), SUBJUNCTIVE_ENDINGS[verb.ending]);
}
function regularFuture(verb) {
	return zipInfinitive(verb.futureStem ?? verb.infinitive, FUTURE_ENDINGS);
}
function regularConditional(verb) {
	return zipInfinitive(verb.futureStem ?? verb.infinitive, CONDITIONAL_ENDINGS);
}
function regularGerund(verb) {
	if (verb.gerund) return verb.gerund;
	return stemOf(verb.infinitive) + (verb.ending === "ar" ? "ando" : "iendo");
}
function regularParticiple(verb) {
	if (verb.participle) return verb.participle;
	return stemOf(verb.infinitive) + (verb.ending === "ar" ? "ado" : "ido");
}
function vosotrosImperative(verb) {
	if (verb.imperativeVosotros) return verb.imperativeVosotros;
	return verb.infinitive.slice(0, -1) + "d";
}
function compound(haber, participle) {
	return {
		yo: `${haber.yo} ${participle}`,
		tu: `${haber.tu} ${participle}`,
		el: `${haber.el} ${participle}`,
		nosotros: `${haber.nosotros} ${participle}`,
		vosotros: `${haber.vosotros} ${participle}`,
		ellos: `${haber.ellos} ${participle}`
	};
}
function formsFor(verb, tense) {
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
		case "presente": return present;
		case "preterito": return preterite;
		case "imperfecto": return imperfect;
		case "futuro": return future;
		case "condicional": return conditional;
		case "subjuntivo": return subjunctive;
		case "imperfecto_subj": return imperfectSubj;
		case "perfecto": return compound(HABER.presente, participle);
		case "pluscuamperfecto": return compound(HABER.imperfecto, participle);
		case "futuro_perfecto": return compound(HABER.futuro, participle);
		case "condicional_perfecto": return compound(HABER.condicional, participle);
		case "perfecto_subj": return compound(HABER.subjuntivo, participle);
		case "pluscuamperfecto_subj": return compound(HABER.imperfecto_subj, participle);
		case "gerundio": return {
			yo: gerund,
			tu: gerund,
			el: gerund,
			nosotros: gerund,
			vosotros: gerund,
			ellos: gerund
		};
		case "participio": return {
			yo: participle,
			tu: participle,
			el: participle,
			nosotros: participle,
			vosotros: participle,
			ellos: participle
		};
		case "imperativo": return {
			yo: "",
			tu: verb.imperativeTu ?? present.el,
			el: subjunctive.el,
			nosotros: verb.imperativeNosotros ?? subjunctive.nosotros,
			vosotros: vosotrosImperative(verb),
			ellos: subjunctive.ellos
		};
		case "imperativo_neg": return {
			yo: "",
			tu: `no ${subjunctive.tu}`,
			el: `no ${subjunctive.el}`,
			nosotros: `no ${subjunctive.nosotros}`,
			vosotros: `no ${subjunctive.vosotros}`,
			ellos: `no ${subjunctive.ellos}`
		};
	}
}
function formFor(verb, tense, person) {
	const forms = formsFor(verb, tense);
	if (person === "forma") return forms.yo;
	return forms[person];
}
function slotsFor(tense) {
	const meta = getTense(tense);
	if (meta.slots === "single") return [{
		id: "forma",
		label: "forma",
		hintPt: "forma única"
	}];
	return (meta.slots === "personsNoYo" ? PERSONS.filter((p) => p.id !== "yo") : PERSONS).map((p) => ({
		id: p.id,
		label: p.label,
		hintPt: p.hintPt
	}));
}
function normalizeAnswer(value) {
	return value.trim().toLowerCase().replace(/\s+/g, " ");
}
function stripDiacritics(value) {
	return value.normalize("NFD").replace(/\p{M}/gu, "");
}
function checkAnswer(verb, tense, person, raw) {
	const expected = formFor(verb, tense, person);
	const accepted = [expected, ...verb.aliases?.[tense]?.[person] ?? []].map(normalizeAnswer);
	const given = normalizeAnswer(raw);
	if (accepted.includes(given)) return {
		ok: true,
		expected,
		accentOnly: false
	};
	const givenPlain = stripDiacritics(given);
	return {
		ok: false,
		expected,
		accentOnly: accepted.some((item) => stripDiacritics(item) === givenPlain)
	};
}
function regularEndingsFor(tense, ending) {
	switch (tense) {
		case "presente": return PRESENT_ENDINGS[ending];
		case "preterito": return PRETERITE_ENDINGS[ending];
		case "imperfecto": return IMPERFECT_ENDINGS[ending];
		case "subjuntivo": return SUBJUNCTIVE_ENDINGS[ending];
		case "futuro": return FUTURE_ENDINGS.map((item) => "inf. + " + item);
		case "condicional": return CONDITIONAL_ENDINGS.map((item) => "inf. + " + item);
		case "gerundio": return [ending === "ar" ? "-ando" : "-iendo"];
		case "participio": return [ending === "ar" ? "-ado" : "-ido"];
		case "imperativo": return ending === "ar" ? [
			"—",
			"-a",
			"-e",
			"-emos",
			"-ad",
			"-en"
		] : ending === "er" ? [
			"—",
			"-e",
			"-a",
			"-amos",
			"-ed",
			"-an"
		] : [
			"—",
			"-e",
			"-a",
			"-amos",
			"-id",
			"-an"
		];
		default: return null;
	}
}
var VERBS = [
	{
		id: "hablar",
		infinitive: "hablar",
		ending: "ar",
		meaningPt: "falar",
		tags: ["regular"],
		usage: "Conversar, falar um idioma, telefonar.",
		examples: [{
			es: "Hablo español todos los días.",
			pt: "Falo espanhol todos os dias."
		}, {
			es: "¿Hablas con tu hermana?",
			pt: "Você fala com a sua irmã?"
		}]
	},
	{
		id: "trabajar",
		infinitive: "trabajar",
		ending: "ar",
		meaningPt: "trabalhar",
		tags: ["regular"],
		usage: "Trabalho, emprego, esforço.",
		examples: [{
			es: "Trabajo en casa los viernes.",
			pt: "Trabalho em casa às sextas."
		}, {
			es: "Ayer trabajé hasta tarde.",
			pt: "Ontem trabalhei até tarde."
		}]
	},
	{
		id: "estudiar",
		infinitive: "estudiar",
		ending: "ar",
		meaningPt: "estudar",
		tags: ["regular"],
		usage: "Estudar, cursar, revisar matéria.",
		examples: [{
			es: "Estudio español por la noche.",
			pt: "Estudo espanhol à noite."
		}, {
			es: "Estudiamos juntos para el examen.",
			pt: "Estudamos juntos para a prova."
		}]
	},
	{
		id: "comprar",
		infinitive: "comprar",
		ending: "ar",
		meaningPt: "comprar",
		tags: ["regular"],
		usage: "Compras, mercado, loja.",
		examples: [{
			es: "Compro pan todas las mañanas.",
			pt: "Compro pão todas as manhãs."
		}, {
			es: "¿Qué vas a comprar?",
			pt: "O que você vai comprar?"
		}]
	},
	{
		id: "comer",
		infinitive: "comer",
		ending: "er",
		meaningPt: "comer",
		tags: ["regular"],
		usage: "Refeições, comida, restaurante.",
		examples: [{
			es: "Como fruta por la mañana.",
			pt: "Como fruta de manhã."
		}, {
			es: "Ayer comimos en un restaurante.",
			pt: "Ontem comemos num restaurante."
		}]
	},
	{
		id: "beber",
		infinitive: "beber",
		ending: "er",
		meaningPt: "beber",
		tags: ["regular"],
		usage: "Beber água, café, suco.",
		examples: [{
			es: "Bebo mucha agua.",
			pt: "Bebo muita água."
		}, {
			es: "¿Bebes café o té?",
			pt: "Você bebe café ou chá?"
		}]
	},
	{
		id: "aprender",
		infinitive: "aprender",
		ending: "er",
		meaningPt: "aprender",
		tags: ["regular"],
		usage: "Aprender um idioma, uma habilidade.",
		examples: [{
			es: "Aprendo español con práctica.",
			pt: "Aprendo espanhol com prática."
		}, {
			es: "Aprendimos mucho hoy.",
			pt: "Aprendemos muito hoje."
		}]
	},
	{
		id: "leer",
		infinitive: "leer",
		ending: "er",
		meaningPt: "ler",
		tags: ["ortografico"],
		usage: "Ler livros, mensagens, notícias. O i átono vira y: leyó, leyeron, leyendo.",
		examples: [{
			es: "Leo el periódico cada domingo.",
			pt: "Leio o jornal todo domingo."
		}, {
			es: "Ayer leí un capítulo entero.",
			pt: "Ontem li um capítulo inteiro."
		}],
		preterite: {
			yo: "leí",
			tu: "leíste",
			el: "leyó",
			nosotros: "leímos",
			vosotros: "leísteis",
			ellos: "leyeron"
		},
		gerund: "leyendo",
		participle: "leído"
	},
	{
		id: "vivir",
		infinitive: "vivir",
		ending: "ir",
		meaningPt: "viver / morar",
		tags: ["regular"],
		usage: "Morar em um lugar, viver uma experiência.",
		examples: [{
			es: "Vivo en São Paulo.",
			pt: "Moro em São Paulo."
		}, {
			es: "Vivimos cerca del mar.",
			pt: "Moramos perto do mar."
		}]
	},
	{
		id: "escribir",
		infinitive: "escribir",
		ending: "ir",
		meaningPt: "escrever",
		tags: ["participio-irregular"],
		usage: "Escrever mensagens, e-mails, textos. Particípio irregular: escrito.",
		examples: [{
			es: "Escribo un mensaje ahora.",
			pt: "Escrevo uma mensagem agora."
		}, {
			es: "He escrito tres correos.",
			pt: "Escrevi (tenho escrito) três e-mails."
		}],
		participle: "escrito"
	},
	{
		id: "abrir",
		infinitive: "abrir",
		ending: "ir",
		meaningPt: "abrir",
		tags: ["participio-irregular"],
		usage: "Abrir portas, lojas, arquivos. Particípio irregular: abierto.",
		examples: [{
			es: "Abro la ventana por la mañana.",
			pt: "Abro a janela de manhã."
		}, {
			es: "La tienda abre a las nueve.",
			pt: "A loja abre às nove."
		}],
		participle: "abierto"
	},
	{
		id: "ser",
		infinitive: "ser",
		ending: "er",
		meaningPt: "ser",
		tags: ["irregular"],
		usage: "Identidade, origem, hora, profissão, características permanentes. Não confundir com estar.",
		examples: [{
			es: "Soy brasileño.",
			pt: "Sou brasileiro."
		}, {
			es: "Ella es médica.",
			pt: "Ela é médica."
		}],
		present: {
			yo: "soy",
			tu: "eres",
			el: "es",
			nosotros: "somos",
			vosotros: "sois",
			ellos: "son"
		},
		preterite: {
			yo: "fui",
			tu: "fuiste",
			el: "fue",
			nosotros: "fuimos",
			vosotros: "fuisteis",
			ellos: "fueron"
		},
		imperfect: {
			yo: "era",
			tu: "eras",
			el: "era",
			nosotros: "éramos",
			vosotros: "erais",
			ellos: "eran"
		},
		subjunctive: {
			yo: "sea",
			tu: "seas",
			el: "sea",
			nosotros: "seamos",
			vosotros: "seáis",
			ellos: "sean"
		},
		gerund: "siendo",
		participle: "sido",
		imperativeTu: "sé",
		imperativeVosotros: "sed"
	},
	{
		id: "estar",
		infinitive: "estar",
		ending: "ar",
		meaningPt: "estar",
		tags: ["irregular"],
		usage: "Estado temporário, localização, emoção, resultado. Com gerúndio: estoy hablando.",
		examples: [{
			es: "Estoy cansado hoy.",
			pt: "Estou cansado hoje."
		}, {
			es: "Estamos en casa.",
			pt: "Estamos em casa."
		}],
		present: {
			yo: "estoy",
			tu: "estás",
			el: "está",
			nosotros: "estamos",
			vosotros: "estáis",
			ellos: "están"
		},
		preterite: {
			yo: "estuve",
			tu: "estuviste",
			el: "estuvo",
			nosotros: "estuvimos",
			vosotros: "estuvisteis",
			ellos: "estuvieron"
		},
		subjunctive: {
			yo: "esté",
			tu: "estés",
			el: "esté",
			nosotros: "estemos",
			vosotros: "estéis",
			ellos: "estén"
		},
		gerund: "estando",
		participle: "estado",
		imperativeTu: "está"
	},
	{
		id: "ir",
		infinitive: "ir",
		ending: "ir",
		meaningPt: "ir",
		tags: ["irregular"],
		usage: "Deslocamento. Ir a + infinitivo = futuro próximo (voy a comer). Pretérito igual ao de ser.",
		examples: [{
			es: "Voy al mercado.",
			pt: "Vou ao mercado."
		}, {
			es: "Ayer fuimos al cine.",
			pt: "Ontem fomos ao cinema."
		}],
		present: {
			yo: "voy",
			tu: "vas",
			el: "va",
			nosotros: "vamos",
			vosotros: "vais",
			ellos: "van"
		},
		preterite: {
			yo: "fui",
			tu: "fuiste",
			el: "fue",
			nosotros: "fuimos",
			vosotros: "fuisteis",
			ellos: "fueron"
		},
		imperfect: {
			yo: "iba",
			tu: "ibas",
			el: "iba",
			nosotros: "íbamos",
			vosotros: "ibais",
			ellos: "iban"
		},
		subjunctive: {
			yo: "vaya",
			tu: "vayas",
			el: "vaya",
			nosotros: "vayamos",
			vosotros: "vayáis",
			ellos: "vayan"
		},
		gerund: "yendo",
		participle: "ido",
		imperativeTu: "ve",
		imperativeVosotros: "id",
		imperativeNosotros: "vamos",
		aliases: { imperativo: { nosotros: ["vamos", "vayamos"] } }
	},
	{
		id: "tener",
		infinitive: "tener",
		ending: "er",
		meaningPt: "ter",
		tags: ["irregular"],
		usage: "Posse, idade, fome/sede (tener hambre). Tener que + inf. = ter que.",
		examples: [{
			es: "Tengo dos hermanos.",
			pt: "Tenho dois irmãos."
		}, {
			es: "¿Tienes hambre?",
			pt: "Você está com fome?"
		}],
		present: {
			yo: "tengo",
			tu: "tienes",
			el: "tiene",
			nosotros: "tenemos",
			vosotros: "tenéis",
			ellos: "tienen"
		},
		preterite: {
			yo: "tuve",
			tu: "tuviste",
			el: "tuvo",
			nosotros: "tuvimos",
			vosotros: "tuvisteis",
			ellos: "tuvieron"
		},
		subjunctive: {
			yo: "tenga",
			tu: "tengas",
			el: "tenga",
			nosotros: "tengamos",
			vosotros: "tengáis",
			ellos: "tengan"
		},
		futureStem: "tendr",
		gerund: "teniendo",
		participle: "tenido",
		imperativeTu: "ten"
	},
	{
		id: "hacer",
		infinitive: "hacer",
		ending: "er",
		meaningPt: "fazer",
		tags: ["irregular"],
		usage: "Fazer, clima (hace frío), tempo (hace dos años).",
		examples: [{
			es: "Hago la cena a las ocho.",
			pt: "Faço o jantar às oito."
		}, {
			es: "Ayer hice ejercicio.",
			pt: "Ontem fiz exercício."
		}],
		present: {
			yo: "hago",
			tu: "haces",
			el: "hace",
			nosotros: "hacemos",
			vosotros: "hacéis",
			ellos: "hacen"
		},
		preterite: {
			yo: "hice",
			tu: "hiciste",
			el: "hizo",
			nosotros: "hicimos",
			vosotros: "hicisteis",
			ellos: "hicieron"
		},
		subjunctive: {
			yo: "haga",
			tu: "hagas",
			el: "haga",
			nosotros: "hagamos",
			vosotros: "hagáis",
			ellos: "hagan"
		},
		futureStem: "har",
		gerund: "haciendo",
		participle: "hecho",
		imperativeTu: "haz"
	},
	{
		id: "poder",
		infinitive: "poder",
		ending: "er",
		meaningPt: "poder / conseguir",
		tags: ["irregular"],
		usage: "Capacidade ou permissão. Stem-changing o→ue no presente (exceto nosotros/vosotros).",
		examples: [{
			es: "Puedo ayudarte mañana.",
			pt: "Posso te ajudar amanhã."
		}, {
			es: "No pude ir ayer.",
			pt: "Não pude ir ontem."
		}],
		present: {
			yo: "puedo",
			tu: "puedes",
			el: "puede",
			nosotros: "podemos",
			vosotros: "podéis",
			ellos: "pueden"
		},
		preterite: {
			yo: "pude",
			tu: "pudiste",
			el: "pudo",
			nosotros: "pudimos",
			vosotros: "pudisteis",
			ellos: "pudieron"
		},
		subjunctive: {
			yo: "pueda",
			tu: "puedas",
			el: "pueda",
			nosotros: "podamos",
			vosotros: "podáis",
			ellos: "puedan"
		},
		futureStem: "podr",
		gerund: "pudiendo",
		participle: "podido"
	},
	{
		id: "querer",
		infinitive: "querer",
		ending: "er",
		meaningPt: "querer / amar",
		tags: ["irregular"],
		usage: "Desejo (quiero café) e afeto (te quiero). Stem-changing e→ie. Pretérito: quise = quis / tentei.",
		examples: [{
			es: "Quiero aprender más.",
			pt: "Quero aprender mais."
		}, {
			es: "Te quiero mucho.",
			pt: "Te amo / gosto muito de você."
		}],
		present: {
			yo: "quiero",
			tu: "quieres",
			el: "quiere",
			nosotros: "queremos",
			vosotros: "queréis",
			ellos: "quieren"
		},
		preterite: {
			yo: "quise",
			tu: "quisiste",
			el: "quiso",
			nosotros: "quisimos",
			vosotros: "quisisteis",
			ellos: "quisieron"
		},
		subjunctive: {
			yo: "quiera",
			tu: "quieras",
			el: "quiera",
			nosotros: "queramos",
			vosotros: "queráis",
			ellos: "quieran"
		},
		futureStem: "querr",
		gerund: "queriendo",
		participle: "querido"
	},
	{
		id: "ver",
		infinitive: "ver",
		ending: "er",
		meaningPt: "ver",
		tags: ["irregular"],
		usage: "Ver, assistir, perceber. Particípio irregular: visto. Imperativo tú: ve (igual ao de ir).",
		examples: [{
			es: "Veo una película esta noche.",
			pt: "Vou ver um filme esta noite."
		}, {
			es: "¿Has visto mis llaves?",
			pt: "Você viu minhas chaves?"
		}],
		present: {
			yo: "veo",
			tu: "ves",
			el: "ve",
			nosotros: "vemos",
			vosotros: "veis",
			ellos: "ven"
		},
		preterite: {
			yo: "vi",
			tu: "viste",
			el: "vio",
			nosotros: "vimos",
			vosotros: "visteis",
			ellos: "vieron"
		},
		imperfect: {
			yo: "veía",
			tu: "veías",
			el: "veía",
			nosotros: "veíamos",
			vosotros: "veíais",
			ellos: "veían"
		},
		subjunctive: {
			yo: "vea",
			tu: "veas",
			el: "vea",
			nosotros: "veamos",
			vosotros: "veáis",
			ellos: "vean"
		},
		gerund: "viendo",
		participle: "visto",
		imperativeTu: "ve"
	},
	{
		id: "dar",
		infinitive: "dar",
		ending: "ar",
		meaningPt: "dar",
		tags: ["irregular"],
		usage: "Dar objetos, dar um passeio (dar un paseo), dar-se conta (darse cuenta).",
		examples: [{
			es: "Te doy mi número.",
			pt: "Te dou o meu número."
		}, {
			es: "Nos dieron las llaves.",
			pt: "Nos deram as chaves."
		}],
		present: {
			yo: "doy",
			tu: "das",
			el: "da",
			nosotros: "damos",
			vosotros: "dais",
			ellos: "dan"
		},
		preterite: {
			yo: "di",
			tu: "diste",
			el: "dio",
			nosotros: "dimos",
			vosotros: "disteis",
			ellos: "dieron"
		},
		subjunctive: {
			yo: "dé",
			tu: "des",
			el: "dé",
			nosotros: "demos",
			vosotros: "deis",
			ellos: "den"
		},
		gerund: "dando",
		participle: "dado",
		imperativeTu: "da"
	}
];
var VERB_GROUPS = [
	{
		id: "ar",
		label: "Regulares -AR",
		match: (v) => v.ending === "ar" && v.tags.includes("regular")
	},
	{
		id: "er",
		label: "Regulares -ER",
		match: (v) => v.ending === "er" && v.tags.includes("regular")
	},
	{
		id: "ir",
		label: "Regulares -IR",
		match: (v) => v.ending === "ir" && v.tags.includes("regular")
	},
	{
		id: "orto",
		label: "Ortográficos",
		match: (v) => v.tags.includes("ortografico") || v.tags.includes("participio-irregular")
	},
	{
		id: "irr",
		label: "Irregulares essenciais",
		match: (v) => v.tags.includes("irregular")
	}
];
function getVerb(id) {
	const verb = VERBS.find((item) => item.id === id);
	if (!verb) throw new Error(`Unknown verb: ${id}`);
	return verb;
}
var THEORY = [
	{
		id: "presente",
		title: "Presente de indicativo",
		kicker: "O agora, o hábito, a verdade",
		body: [
			"Use o presente para ações habituais, fatos gerais e o que está acontecendo agora.",
			"Tire o -ar / -er / -ir e acrescente: -o, -as, -a, -amos, -áis, -an (e as variantes de -er/-ir).",
			"Muitos verbos do dia a dia mudam a vogal no radical (e→ie, o→ue) em todas as pessoas menos nosotros e vosotros: quiero, puedes."
		],
		compare: "Quase igual ao presente do português: hablo = falo. A diferença está nos irregulares (soy, estoy, voy, tengo, hago).",
		examples: [{
			es: "Trabajo de lunes a viernes.",
			pt: "Trabalho de segunda a sexta."
		}, {
			es: "Ella vive en Madrid.",
			pt: "Ela mora em Madrid."
		}]
	},
	{
		id: "preterito",
		title: "Pretérito indefinido",
		kicker: "Ação concluída, com começo e fim",
		body: [
			"Narra o que aconteceu uma vez, ou em cadeia, no passado: ayer, el año pasado, en 2019.",
			"Terminações -AR: -é, -aste, -ó, -amos, -asteis, -aron. -ER/-IR: -í, -iste, -ió, -imos, -isteis, -ieron.",
			"Os irregulares mais usados têm radical próprio: tuve, hice, fui, pude, quise, estuve, di, vi."
		],
		compare: "Equivale ao pretérito perfeito simples do português (falei, comi, fui). Em espanhol da Espanha, o passado recente sem data costuma ir para o perfecto (he hablado), não para este tempo.",
		examples: [{
			es: "Ayer comí con mis padres.",
			pt: "Ontem comi com meus pais."
		}, {
			es: "El año pasado fui a España.",
			pt: "Ano passado fui à Espanha."
		}]
	},
	{
		id: "imperfecto",
		title: "Pretérito imperfecto",
		kicker: "Cenário, hábito, descrição no passado",
		body: [
			"Pinta o fundo da história: como as coisas eram, o que se repetia, a idade, a hora, o clima.",
			"-AR: -aba, -abas, -aba, -ábamos, -abais, -aban. -ER/-IR: -ía, -ías, -ía, -íamos, -íais, -ían.",
			"Só três irregulares em todo o espanhol: ser (era), ir (iba) e ver (veía)."
		],
		compare: "É o pretérito imperfeito do português (falava, comia, ia). A oposição indefinido vs imperfecto é a mesma de falei vs falava.",
		examples: [{
			es: "Cuando era niño, vivía cerca del mar.",
			pt: "Quando eu era criança, morava perto do mar."
		}, {
			es: "Ella leía mientras yo cocinaba.",
			pt: "Ela lia enquanto eu cozinhava."
		}]
	},
	{
		id: "perfecto",
		title: "Pretérito perfecto",
		kicker: "Passado ligado ao presente",
		body: [
			"Forma: presente de haber + particípio (he hablado, has comido, ha vivido).",
			"Na Espanha, cobre o que aconteceu hoje, esta semana, este ano — ainda dentro de um período aberto.",
			"Na América Latina, muitas vezes se prefere o indefinido (hablé) mesmo para o passado recente."
		],
		compare: "Parece o pretérito perfeito composto do português (tenho falado), mas o uso espanhol da Espanha é mais amplo: He desayunado = Tomei café (hoje), não necessariamente 'tenho tomado'.",
		examples: [{
			es: "Hoy he trabajado mucho.",
			pt: "Hoje trabalhei muito."
		}, {
			es: "¿Has visto esta película?",
			pt: "Você já viu este filme?"
		}]
	},
	{
		id: "pluscuamperfecto",
		title: "Pretérito pluscuamperfecto",
		kicker: "O passado do passado",
		body: ["Forma: imperfecto de haber + particípio (había hablado).", "Marca uma ação anterior a outra ação passada."],
		compare: "Igual ao mais-que-perfeito composto: tinha falado = había hablado.",
		examples: [{
			es: "Cuando llegué, ella ya había comido.",
			pt: "Quando cheguei, ela já tinha comido."
		}]
	},
	{
		id: "futuro",
		title: "Futuro simple",
		kicker: "O que vai acontecer, ou uma suposição",
		body: [
			"O infinitivo inteiro ganha: -é, -ás, -á, -emos, -éis, -án. hablaré, comeré, viviré.",
			"Irregulares mudam o radical: tendré, haré, podré, querré, diré, sabré, habré.",
			"Também expressa probabilidade no presente: Será Juan = Deve ser o Juan."
		],
		compare: "Como o futuro do presente (falarei). No dia a dia, o espanhol usa muito ir a + infinitivo (voy a hablar), igual ao 'vou falar'.",
		examples: [{
			es: "Mañana estudiaré tres horas.",
			pt: "Amanhã estudarei três horas."
		}, {
			es: "¿Dónde estará mi teléfono?",
			pt: "Onde será que está o meu telefone?"
		}]
	},
	{
		id: "futuro_perfecto",
		title: "Futuro compuesto",
		kicker: "Concluído no futuro, ou suposição no passado",
		body: ["Forma: futuro de haber + particípio (habré hablado).", "Para quando algo já terá acontecido, ou para conjecturar sobre o passado: Habrá salido = Deve ter saído."],
		compare: "Como o futuro composto: terei falado = habré hablado.",
		examples: [{
			es: "Para las seis ya habré llegado.",
			pt: "Até as seis eu já terei chegado."
		}]
	},
	{
		id: "condicional",
		title: "Condicional simple",
		kicker: "O que aconteceria, um pedido educado",
		body: ["Infinitivo + -ía, -ías, -ía, -íamos, -íais, -ían. Os mesmos radicais irregulares do futuro: tendría, haría, podría.", "Serve para cortesia (¿Podrías ayudarme?), hipótese e o futuro visto do passado."],
		compare: "É o futuro do pretérito do português: falaria, comeria, poderia.",
		examples: [{
			es: "Me gustaría vivir cerca del mar.",
			pt: "Gostaria de morar perto do mar."
		}, {
			es: "¿Podrías abrir la ventana?",
			pt: "Você poderia abrir a janela?"
		}]
	},
	{
		id: "condicional_perfecto",
		title: "Condicional compuesto",
		kicker: "O que teria acontecido",
		body: ["Forma: condicional de haber + particípio (habría hablado).", "Hipótese no passado: Si hubiera estudiado, habría aprobado."],
		compare: "Como o futuro do pretérito composto: teria falado = habría hablado.",
		examples: [{
			es: "Habría comprado el libro, pero no tenía dinero.",
			pt: "Teria comprado o livro, mas não tinha dinheiro."
		}]
	},
	{
		id: "subjuntivo",
		title: "Presente de subjuntivo",
		kicker: "Desejo, dúvida, emoção, influência",
		body: [
			"Aparece depois de que em orações que não afirmam um fato: quiero que, es importante que, no creo que, ojalá.",
			"A vogal 'inverte': -AR vira e (hable), -ER/-IR viram a (coma, viva).",
			"Muitos irregulares saem da forma yo do presente: tengo → tenga, hago → haga, voy → vaya, soy → sea."
		],
		compare: "Existe no português (que eu fale, que ele coma), mas o espanhol o usa muito mais no dia a dia. 'Quero que você fale' = Quiero que hables (não *hablas).",
		examples: [{
			es: "Quiero que estudies más.",
			pt: "Quero que você estude mais."
		}, {
			es: "Espero que tengas un buen día.",
			pt: "Espero que você tenha um bom dia."
		}]
	},
	{
		id: "imperfecto_subj",
		title: "Imperfecto de subjuntivo",
		kicker: "Subjuntivo no passado, e o 'se' das hipóteses",
		body: [
			"Forma-se a partir da 3ª pessoa do pretérito indefinido: hablaron → hablara; tuvieron → tuviera; fueron → fuera.",
			"Há duas séries (-ra e -se). Aqui praticamos a de -ra, a mais comum na fala.",
			"Obrigatório em si + hipótese: Si tuviera tiempo, viajaría."
		],
		compare: "Como o pretérito imperfeito do subjuntivo: se eu falasse = si yo hablara. Em português informal muita gente usa o futuro do pretérito no lugar; em espanhol a regra é rígida.",
		examples: [{
			es: "Si pudiera, viviría en el campo.",
			pt: "Se eu pudesse, moraria no campo."
		}, {
			es: "Quería que vinieras.",
			pt: "Queria que você viesse."
		}]
	},
	{
		id: "perfecto_subj",
		title: "Pretérito perfecto de subjuntivo",
		kicker: "Subjuntivo de algo já concluído",
		body: ["Forma: presente de subjuntivo de haber + particípio (haya hablado).", "Me alegra que hayas venido. No creo que haya comido."],
		compare: "Como 'que eu tenha falado' = que yo haya hablado.",
		examples: [{
			es: "Me alegra que hayas llegado.",
			pt: "Fico feliz que você tenha chegado."
		}]
	},
	{
		id: "pluscuamperfecto_subj",
		title: "Pluscuamperfecto de subjuntivo",
		kicker: "A hipótese que não aconteceu",
		body: ["Forma: imperfecto de subjuntivo de haber + particípio (hubiera hablado).", "Par da condicional composta: Si hubiera estudiado, habría aprobado."],
		compare: "Como 'se eu tivesse falado' = si yo hubiera hablado.",
		examples: [{
			es: "Si hubiera sabido, te habría llamado.",
			pt: "Se eu soubesse / tivesse sabido, teria te ligado."
		}]
	},
	{
		id: "imperativo",
		title: "Imperativo afirmativo",
		kicker: "Pedidos e instruções no positivo",
		body: [
			"Não existe forma para yo. Tú usa a 3ª pessoa do presente: habla, come, vive — com irregularidades (ten, haz, sé, ve, di, sal, ven, pon).",
			"Usted, nosotros e ustedes copiam o presente do subjuntivo. Vosotros troca o -r do infinitivo por -d: hablad, comed, vivid.",
			"Na América Latina não se usa vosotros: vocês = ustedes (hablen)."
		],
		compare: "Como o imperativo português (fala, coma, vivam), mas a forma de vosotros não tem equivalente no Brasil.",
		examples: [{
			es: "Habla más despacio, por favor.",
			pt: "Fale mais devagar, por favor."
		}, {
			es: "Ven aquí.",
			pt: "Vem cá."
		}]
	},
	{
		id: "imperativo_neg",
		title: "Imperativo negativo",
		kicker: "Tudo vira subjuntivo",
		body: ["Para negar, use no + presente de subjuntivo em todas as pessoas: no hables, no coma, no vayas.", "Não existe *no habla. O afirmativo e o negativo são paradigmas diferentes."],
		compare: "No português dizemos 'não fale' (subjuntivo) e 'não fala' (indicativo, mais informal). Em espanhol só vale o subjuntivo: no hables.",
		examples: [{
			es: "No comas tan rápido.",
			pt: "Não coma tão rápido."
		}, {
			es: "No vayas ahora.",
			pt: "Não vá agora."
		}]
	},
	{
		id: "gerundio",
		title: "Gerundio",
		kicker: "A ação em curso",
		body: ["-AR → -ando (hablando). -ER/-IR → -iendo (comiendo, viviendo). Vogal + iendo vira yendo: leyendo, yendo.", "Com estar: estoy hablando = estou falando. Também descreve modo: salió corriendo."],
		compare: "Como o gerúndio português (falando, comendo). Cuidado: em espanhol não se usa gerúndio para futuro (*estoy yendo mañana está forçado; prefira voy mañana).",
		examples: [{
			es: "Estoy estudiando español.",
			pt: "Estou estudando espanhol."
		}, {
			es: "Salió corriendo.",
			pt: "Saiu correndo."
		}]
	},
	{
		id: "participio",
		title: "Participio",
		kicker: "A forma dos tempos compostos",
		body: ["-AR → -ado. -ER/-IR → -ido. Irregulares frequentes: escrito, abierto, hecho, visto, dicho, puesto, vuelto, muerto.", "Com haber forma os compostos. Com ser/estar vira adjetivo: la puerta está abierta."],
		compare: "Como o particípio português (falado, escrito, aberto). Vários coincidem: escrito, abierto/aberto, visto.",
		examples: [{
			es: "He escrito tres mensajes.",
			pt: "Escrevi / tenho escrito três mensagens."
		}, {
			es: "La tienda está abierta.",
			pt: "A loja está aberta."
		}]
	}
];
var GUIDE = {
	pronouns: {
		title: "Pronomes pessoais",
		rows: [
			[
				"yo",
				"eu",
				"sempre opcional; o verbo já marca a pessoa"
			],
			[
				"tú",
				"tu / você informal",
				"Espanha e grande parte da América"
			],
			[
				"usted",
				"você formal",
				"conjuga como él/ella"
			],
			[
				"él / ella",
				"ele / ela",
				""
			],
			[
				"nosotros / nosotras",
				"nós",
				"nosotras só para grupo feminino"
			],
			[
				"vosotros / vosotras",
				"vocês",
				"só na Espanha (exceto Canárias/Andaluzia formal)"
			],
			[
				"ustedes",
				"vocês",
				"América Latina inteira; na Espanha é formal"
			],
			[
				"ellos / ellas",
				"eles / elas",
				""
			]
		]
	},
	serEstar: {
		title: "Ser × estar",
		ser: [
			"Identidade e profissão: Soy profesor.",
			"Origem e material: Es de Brasil. Es de madera.",
			"Hora e data: Son las tres. Es lunes.",
			"Característica que se trata como essência: Ella es alta. El café es bueno.",
			"Evento (onde acontece): La fiesta es en mi casa."
		],
		estar: [
			"Localização de pessoas e coisas: Estoy en casa.",
			"Estado temporário: Estoy cansado. Está enferma.",
			"Resultado: La puerta está abierta. El café está caliente.",
			"Progressivo: Estoy comiendo.",
			"Opinião pontual: La sopa está buena (hoje, nesta tigela)."
		],
		trick: "Pergunte: é da natureza da coisa (ser) ou é um estado/lugar agora (estar)? 'É médico' = ser. 'Está doente' = estar."
	},
	stems: {
		title: "Mudança no radical",
		groups: [
			{
				name: "e → ie",
				verbs: "querer, pensar, cerrar, empezar, entender",
				sample: "quiero, quieres, quiere, queremos, queréis, quieren"
			},
			{
				name: "o → ue",
				verbs: "poder, dormir, volver, encontrar, almorzar",
				sample: "puedo, puedes, puede, podemos, podéis, pueden"
			},
			{
				name: "e → i  (só -ir)",
				verbs: "pedir, servir, repetir, seguir",
				sample: "pido, pides, pide, pedimos, pedís, piden"
			},
			{
				name: "u → ue",
				verbs: "jugar (único comum)",
				sample: "juego, juegas, juega, jugamos, jugáis, juegan"
			}
		],
		note: "Nosotros e vosotros quase nunca mudam no presente. No pretérito, só os -ir (pidió, durmió) mudam na 3ª pessoa."
	},
	accents: {
		title: "Acentos que mudam o tempo",
		items: [
			"hablo (presente) × habló (pretérito 3ª pessoa).",
			"hable (subjuntivo / imperativo usted) × hablé (pretérito yo).",
			"esta (adjetivo) × está (verbo estar).",
			"tu (possessivo) × tú (pronome).",
			"el (artigo) × él (pronome).",
			"se (pronome) × sé (saber / ser imperativo).",
			"te (pronome) × té (chá)."
		]
	},
	haber: {
		title: "Haber, o auxiliar",
		body: "Todos os tempos compostos usam haber + particípio. Haber não se conjuga com o sujeito 'ter' de posse — posse é tener. Haber sozinho no impessoal é hay (há/existe).",
		table: [
			["Presente", "he, has, ha, hemos, habéis, han"],
			["Imperfeito", "había, habías, había, habíamos, habíais, habían"],
			["Futuro", "habré, habrás, habrá, habremos, habréis, habrán"],
			["Condicional", "habría, habrías, habría, habríamos, habríais, habrían"],
			["Subjuntivo", "haya, hayas, haya, hayamos, hayáis, hayan"],
			["Imperf. subj.", "hubiera, hubieras, hubiera, hubiéramos, hubierais, hubieran"]
		]
	}
};
function theoryFor(id) {
	return THEORY.find((block) => block.id === id);
}
function todayStamp() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function keyOf(verbId, tense) {
	return `${tense}:${verbId}`;
}
var empty = {
	totalCorrect: 0,
	totalWrong: 0,
	streak: 0,
	bestStreak: 0,
	lastDay: null,
	byKey: {},
	recent: []
};
var useProgress = create()(persist((set, get) => ({
	...empty,
	record: (attempt) => {
		const state = get();
		const key = keyOf(attempt.verbId, attempt.tense);
		const prev = state.byKey[key] ?? {
			correct: 0,
			wrong: 0
		};
		const nextTally = attempt.ok ? {
			correct: prev.correct + 1,
			wrong: prev.wrong
		} : {
			correct: prev.correct,
			wrong: prev.wrong + 1
		};
		const streak = attempt.ok ? state.streak + 1 : 0;
		set({
			totalCorrect: state.totalCorrect + (attempt.ok ? 1 : 0),
			totalWrong: state.totalWrong + (attempt.ok ? 0 : 1),
			streak,
			bestStreak: Math.max(state.bestStreak, streak),
			lastDay: todayStamp(),
			byKey: {
				...state.byKey,
				[key]: nextTally
			},
			recent: [attempt, ...state.recent].slice(0, 40)
		});
	},
	reset: () => set({ ...empty })
}), { name: "conjuga-progress-v1" }));
function accuracy(correct, wrong) {
	const total = correct + wrong;
	if (total === 0) return 0;
	return Math.round(correct / total * 100);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-2xl border border-border bg-surface text-foreground", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col gap-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
	ref,
	className: cn("font-display text-xl font-medium leading-tight tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var PERSON_LABELS = PERSONS.map((p) => p.label);
function EndingTable({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
		className: "pb-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-lg",
			children: title
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "overflow-x-auto pt-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[32rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 pr-3 font-medium",
					children: " "
				}), PERSON_LABELS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 pr-3 font-medium",
					children: label
				}, label))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/70 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2.5 pr-3 font-medium",
					children: row.name
				}), row.cells.map((cell, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2.5 pr-3 font-display text-base",
					children: cell
				}, `${row.name}-${index}`))]
			}, row.name)) })]
		})
	})] });
}
function GuidePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: "Guia rápido"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-prose text-muted-foreground",
				children: "Terminações, ser e estar, mudanças de radical e os acentos que trocam o tempo."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndingTable, {
				title: "Presente",
				rows: [
					{
						name: "-AR",
						cells: PRESENT_ENDINGS.ar.map((e) => "-" + e)
					},
					{
						name: "-ER",
						cells: PRESENT_ENDINGS.er.map((e) => "-" + e)
					},
					{
						name: "-IR",
						cells: PRESENT_ENDINGS.ir.map((e) => "-" + e)
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndingTable, {
				title: "Pretérito indefinido",
				rows: [{
					name: "-AR",
					cells: PRETERITE_ENDINGS.ar.map((e) => "-" + e)
				}, {
					name: "-ER / -IR",
					cells: PRETERITE_ENDINGS.er.map((e) => "-" + e)
				}]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndingTable, {
				title: "Pretérito imperfecto",
				rows: [{
					name: "-AR",
					cells: IMPERFECT_ENDINGS.ar.map((e) => "-" + e)
				}, {
					name: "-ER / -IR",
					cells: IMPERFECT_ENDINGS.er.map((e) => "-" + e)
				}]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndingTable, {
				title: "Presente de subjuntivo",
				rows: [{
					name: "-AR",
					cells: SUBJUNCTIVE_ENDINGS.ar.map((e) => "-" + e)
				}, {
					name: "-ER / -IR",
					cells: SUBJUNCTIVE_ENDINGS.er.map((e) => "-" + e)
				}]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Futuro e condicional"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"O futuro cola o infinitivo + ",
					FUTURE_ENDINGS.map((e) => "−" + e).join(", "),
					". O condicional cola o infinitivo + ",
					CONDITIONAL_ENDINGS.map((e) => "−" + e).join(", "),
					"."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Radicais irregulares comuns: tendr-, har-, podr-, querr-, dir-, sabr-, habr-, saldr-, vendr-, pondr-."
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: GUIDE.pronouns.title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "overflow-x-auto pt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: GUIDE.pronouns.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 pr-3 font-display text-base font-medium",
								children: row[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-3",
								children: row[1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-muted-foreground",
								children: row[2]
							})
						]
					}, row[0])) })
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: GUIDE.serEstar.title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground",
						children: "Ser"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2 text-sm",
						children: GUIDE.serEstar.ser.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground",
						children: "Estar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2 text-sm",
						children: GUIDE.serEstar.estar.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sm:col-span-2 rounded-lg bg-background px-3 py-2 text-sm",
						children: GUIDE.serEstar.trick
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: GUIDE.stems.title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4",
				children: [GUIDE.stems.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: group.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: group.verbs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-base",
						children: group.sample
					})
				] }, group.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: GUIDE.stems.note
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: GUIDE.accents.title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 text-sm",
				children: GUIDE.accents.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "font-display text-base",
					children: item
				}, item))
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: GUIDE.haber.title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: GUIDE.haber.body
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: GUIDE.haber.table.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: row[0]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 font-display text-base",
							children: row[1]
						})]
					}, row[0])) })
				})]
			})] })
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[color,background-color,border-color,opacity,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
			outline: "border border-border bg-transparent hover:bg-surface-2 text-foreground",
			ghost: "hover:bg-surface-2 text-foreground",
			success: "bg-success text-success-foreground hover:bg-success/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "h-11 w-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var MARKS = [
	"á",
	"é",
	"í",
	"ó",
	"ú",
	"ñ",
	"ü",
	"¿",
	"¡"
];
function AccentBar({ onInsert }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		role: "group",
		"aria-label": "Acentos espanhóis",
		children: MARKS.map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "secondary",
			size: "sm",
			className: "h-11 min-w-11 px-0 font-display text-base",
			onMouseDown: (event) => {
				event.preventDefault();
				onInsert(mark);
			},
			children: mark
		}, mark))
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-border bg-surface-2 text-foreground",
		outline: "border-border text-muted-foreground",
		success: "border-transparent bg-success-bg text-success",
		error: "border-transparent bg-error-bg text-destructive"
	} },
	defaultVariants: { variant: "secondary" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-lg border border-input bg-surface px-3 py-2 text-base text-foreground shadow-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground", className),
	...props
}));
Label.displayName = Root.displayName;
var Select = Select$1;
var SelectGroup = SelectGroup$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface px-3.5 text-left text-sm text-foreground transition-[border-color,box-shadow] duration-[var(--motion-quick)] focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-surface text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-8 pr-3 text-sm outline-none focus:bg-surface-2 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-4 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function emptyStatus() {
	return {};
}
function insertAtCursor(input, mark) {
	const start = input.selectionStart ?? input.value.length;
	const end = input.selectionEnd ?? input.value.length;
	const next = input.value.slice(0, start) + mark + input.value.slice(end);
	input.value = next;
	const caret = start + mark.length;
	input.setSelectionRange(caret, caret);
	return next;
}
function tagLabel(verb) {
	if (verb.tags.includes("irregular")) return "irregular";
	if (verb.tags.includes("ortografico")) return "ortográfico";
	if (verb.tags.includes("participio-irregular")) return "particípio irr.";
	return "regular";
}
function PracticePanel() {
	const record = useProgress((s) => s.record);
	const [tenseId, setTenseId] = (0, import_react.useState)("");
	const [verbId, setVerbId] = (0, import_react.useState)("");
	const [values, setValues] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)(emptyStatus);
	const [scored, setScored] = (0, import_react.useState)({});
	const [mode, setMode] = (0, import_react.useState)("table");
	const [drillIndex, setDrillIndex] = (0, import_react.useState)(0);
	const [showHint, setShowHint] = (0, import_react.useState)(false);
	const focusedRef = (0, import_react.useRef)(null);
	const inputRefs = (0, import_react.useRef)({});
	const tense = tenseId ? getTense(tenseId) : null;
	const verb = verbId ? getVerb(verbId) : null;
	const slots = tense ? slotsFor(tense.id) : [];
	const theory = tense ? theoryFor(tense.id) : void 0;
	const endings = tense && verb ? regularEndingsFor(tense.id, verb.ending) : null;
	const drillSlot = slots[drillIndex] ?? slots[0];
	const visibleSlots = (0, import_react.useMemo)(() => {
		if (mode === "drill") return drillSlot ? [drillSlot] : [];
		return slots;
	}, [
		mode,
		drillSlot,
		slots
	]);
	function resetAnswers() {
		setValues({});
		setStatus(emptyStatus());
		setScored({});
		setShowHint(false);
		setDrillIndex(0);
	}
	function onTenseChange(next) {
		setTenseId(next);
		resetAnswers();
	}
	function onVerbChange(next) {
		setVerbId(next);
		resetAnswers();
	}
	function shuffle() {
		const nextTense = TENSES[Math.floor(Math.random() * TENSES.length)];
		const nextVerb = VERBS[Math.floor(Math.random() * VERBS.length)];
		setTenseId(nextTense.id);
		setVerbId(nextVerb.id);
		resetAnswers();
	}
	function nextVerb() {
		if (!verb) {
			shuffle();
			return;
		}
		const next = VERBS[(VERBS.findIndex((item) => item.id === verb.id) + 1) % VERBS.length];
		setVerbId(next.id);
		resetAnswers();
	}
	function setValue(slotId, value) {
		setValues((prev) => ({
			...prev,
			[slotId]: value
		}));
		if (status[slotId] && status[slotId] !== "idle") setStatus((prev) => ({
			...prev,
			[slotId]: "idle"
		}));
	}
	function evaluate(slotId) {
		if (!verb || !tense) return;
		const given = values[slotId] ?? "";
		const result = checkAnswer(verb, tense.id, slotId, given);
		const already = scored[slotId];
		setStatus((prev) => ({
			...prev,
			[slotId]: result.ok ? "correct" : "wrong"
		}));
		if (!already) {
			setScored((prev) => ({
				...prev,
				[slotId]: true
			}));
			record({
				at: Date.now(),
				verbId: verb.id,
				tense: tense.id,
				person: slotId,
				given,
				expected: result.expected,
				ok: result.ok
			});
		}
	}
	function evaluateAll() {
		for (const slot of visibleSlots) evaluate(slot.id);
	}
	function insertMark(mark) {
		const input = focusedRef.current;
		if (!input) return;
		const slotId = input.dataset.slot;
		if (!slotId) return;
		setValue(slotId, insertAtCursor(input, mark));
		input.focus();
	}
	const doneCount = slots.filter((slot) => status[slot.id] === "correct").length;
	const allCorrect = slots.length > 0 && doneCount === slots.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex rounded-xl border border-border bg-surface-2 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-10 rounded-lg px-3 text-sm font-medium", mode === "table" ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground"),
						onClick: () => {
							setMode("table");
							setDrillIndex(0);
						},
						children: "Tabela completa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-10 rounded-lg px-3 text-sm font-medium", mode === "drill" ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground"),
						onClick: () => setMode("drill"),
						children: "Pessoa a pessoa"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: shuffle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4" }), "Sortear"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "notebook-rule overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "tense-select",
							children: "Tempo verbal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: tenseId || void 0,
							onValueChange: (v) => onTenseChange(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "tense-select",
								"aria-label": "Escolher tempo verbal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Escolha o tempo verbal" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TENSE_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel, { children: group.label }), TENSES.filter((item) => item.group === group.id).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: item.id,
								children: [item.nameEs, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [" · ", item.shortPt]
								})]
							}, item.id))] }, group.id)) })]
						})]
					}), tense ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-background p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "verb-select",
								children: "Verbo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: verbId || void 0,
								onValueChange: onVerbChange,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "verb-select",
									"aria-label": "Escolher verbo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Agora escolha o verbo" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: VERB_GROUPS.map((group) => {
									const items = VERBS.filter(group.match);
									if (items.length === 0) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel, { children: group.label }), items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: item.id,
										children: [item.infinitive, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [" — ", item.meaningPt]
										})]
									}, item.id))] }, group.id);
								}) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: tense.namePt
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Primeiro o tempo, depois o verbo. Os dois menus ficam um dentro do outro."
					})]
				})
			}),
			tense && verb ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl italic leading-none tracking-tight",
							children: verb.infinitive
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted-foreground",
							children: [
								verb.meaningPt,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2 text-border",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "uppercase tracking-wider",
									children: ["-", verb.ending]
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: tagLabel(verb) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: tense.nameEs
								}),
								allCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "success",
									children: "completo"
								}) : null
							]
						})]
					}),
					theory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "max-w-prose text-sm text-muted-foreground",
						children: [
							theory.kicker,
							". ",
							theory.compare
						]
					}) : null,
					endings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex items-center gap-2 self-start text-sm text-muted-foreground hover:text-foreground",
						onClick: () => setShowHint((v) => !v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4" }), showHint ? "Ocultar terminações regulares" : "Ver terminações regulares"]
					}) : null,
					showHint && endings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-x-auto rounded-xl border border-border bg-surface px-4 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground",
								children: ["Padrão regular -", verb.ending]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base tracking-wide",
								children: endings.join("  ·  ")
							}),
							verb.tags.includes("irregular") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Este verbo é irregular — o padrão ajuda, mas a forma pode mudar."
							}) : null
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-3",
						children: visibleSlots.map((slot) => {
							const state = status[slot.id] ?? "idle";
							const expected = formFor(verb, tense.id, slot.id);
							const accentHint = state === "wrong" && checkAnswer(verb, tense.id, slot.id, values[slot.id] ?? "").accentOnly;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-xl border bg-surface p-3 sm:p-3.5", state === "correct" && "border-success bg-success-bg", state === "wrong" && "border-destructive bg-error-bg", state === "idle" && "border-border"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:w-44 sm:shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium leading-tight",
											children: slot.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: slot.hintPt
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 flex-1 items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											ref: (node) => {
												inputRefs.current[slot.id] = node;
											},
											"data-slot": slot.id,
											value: values[slot.id] ?? "",
											autoCapitalize: "off",
											autoCorrect: "off",
											spellCheck: false,
											placeholder: "escreva a forma",
											"aria-label": `Conjugar ${verb.infinitive}, ${slot.label}`,
											className: cn("font-display text-lg", state === "correct" && "border-success focus-visible:ring-success", state === "wrong" && "border-destructive focus-visible:ring-destructive"),
											onFocus: (event) => {
												focusedRef.current = event.currentTarget;
											},
											onChange: (event) => setValue(slot.id, event.target.value),
											onKeyDown: (event) => {
												if (event.key === "Enter") {
													event.preventDefault();
													evaluate(slot.id);
													if (mode === "table") {
														const index = slots.findIndex((item) => item.id === slot.id);
														const next = slots[index + 1];
														if (next) inputRefs.current[next.id]?.focus();
													}
												}
											},
											onBlur: () => {
												if ((values[slot.id] ?? "").trim()) evaluate(slot.id);
											}
										}), state === "correct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "size-5 shrink-0 text-success",
											"aria-label": "correto"
										}) : null]
									})]
								}), state === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: accentHint ? "Quase — falta o acento. " : "Não é essa. "
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Forma correta: "
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-base text-foreground",
											children: expected
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: " — pode editar e seguir."
										})
									]
								}) : null]
							}, slot.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccentBar, { onInsert: insertMark }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: evaluateAll,
								children: "Verificar"
							}),
							mode === "drill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => {
									if (!drillSlot) return;
									evaluate(drillSlot.id);
									setDrillIndex((i) => (i + 1) % Math.max(slots.length, 1));
								},
								children: ["Próxima pessoa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								onClick: nextVerb,
								children: ["Próximo verbo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								onClick: resetAnswers,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-4" }), "Limpar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => {
									setTenseId("");
									setVerbId("");
									resetAnswers();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Outro tempo"]
							})
						]
					}),
					verb.examples.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs uppercase tracking-[0.14em] text-muted-foreground",
								children: "No dia a dia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-2",
								children: verb.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-base italic",
									children: ex.es
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: ex.pt
								})] }, ex.es))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: verb.usage
							})
						]
					}) : null,
					mode === "table" && slots.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted-foreground",
						children: [
							doneCount,
							"/",
							slots.length,
							" formas corretas nesta rodada"
						]
					}) : null
				]
			}) : null
		]
	});
}
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full bg-primary transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
		style: { width: `${value ?? 0}%` }
	})
}));
Progress.displayName = Root$1.displayName;
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHydrated(true);
	}, []);
	return hydrated;
}
function StatsPanel() {
	const hydrated = useHydrated();
	const totalCorrect = useProgress((s) => s.totalCorrect);
	const totalWrong = useProgress((s) => s.totalWrong);
	const streak = useProgress((s) => s.streak);
	const bestStreak = useProgress((s) => s.bestStreak);
	const byKey = useProgress((s) => s.byKey);
	const recent = useProgress((s) => s.recent);
	const reset = useProgress((s) => s.reset);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Carregando o seu progresso…"
	});
	const total = totalCorrect + totalWrong;
	const pct = accuracy(totalCorrect, totalWrong);
	const tenseRows = TENSES.map((tense) => {
		let correct = 0;
		let wrong = 0;
		for (const [key, tally] of Object.entries(byKey)) if (key.startsWith(tense.id + ":")) {
			correct += tally.correct;
			wrong += tally.wrong;
		}
		return {
			tense,
			correct,
			wrong,
			total: correct + wrong,
			pct: accuracy(correct, wrong)
		};
	}).filter((row) => row.total > 0);
	const verbRows = VERBS.map((verb) => {
		let correct = 0;
		let wrong = 0;
		for (const [key, tally] of Object.entries(byKey)) if (key.endsWith(":" + verb.id)) {
			correct += tally.correct;
			wrong += tally.wrong;
		}
		return {
			verb,
			correct,
			wrong,
			total: correct + wrong,
			pct: accuracy(correct, wrong)
		};
	}).filter((row) => row.total > 0).sort((a, b) => a.pct - b.pct);
	const mistakes = recent.filter((item) => !item.ok).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: "Progresso"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-prose text-muted-foreground",
				children: "Fica neste aparelho. Não precisa de conta — é só para você ver o que já firmou."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground",
							children: "Acertos"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl tabular-nums leading-none",
						children: totalCorrect
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [total, " tentativas"]
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground",
							children: "Precisão"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-4xl tabular-nums leading-none",
						children: [pct, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-3",
						value: pct
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground",
							children: "Sequência"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl tabular-nums leading-none",
						children: streak
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ["recorde ", bestStreak]
					})] })] })
				]
			}),
			tenseRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Por tempo verbal"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex flex-col gap-4",
				children: tenseRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.tense.nameEs }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-muted-foreground",
						children: [row.pct, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: row.pct })] }, row.tense.id))
			})] }) : null,
			verbRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Verbos que pedem mais treino"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex flex-col gap-3",
				children: verbRows.slice(0, 8).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base",
						children: row.verb.infinitive
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [" — ", row.verb.meaningPt]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-muted-foreground",
						children: [row.pct, "%"]
					})]
				}, row.verb.id))
			})] }) : null,
			mistakes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Erros recentes"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex flex-col gap-3",
				children: mistakes.map((item) => {
					const verb = getVerb(item.verbId);
					const tense = getTense(item.tense);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: [
								tense.shortPt,
								" · ",
								verb.infinitive,
								" · ",
								item.person
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: item.given || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: " → "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base",
								children: item.expected
							})
						] })]
					}, `${item.at}-${item.person}`);
				})
			})] }) : null,
			total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Ainda não há tentativas. Vá em Praticar, escolha um tempo e um verbo, e escreva as formas."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				onClick: reset,
				children: "Zerar progresso"
			})
		]
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b border-border last:border-b-0", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between gap-3 py-4 text-left text-base font-medium transition-colors duration-[var(--motion-quick)] hover:text-primary [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)]" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-5 pt-0 text-muted-foreground", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function TheoryPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl tracking-tight",
			children: "Como cada tempo funciona"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-prose text-muted-foreground",
			children: "Explicações em português, com o paralelo do nosso idioma. Abra o tempo que está praticando e volte à conjugação com a regra fresca."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "single",
			collapsible: true,
			className: "rounded-2xl border border-border bg-surface px-5",
			children: THEORY.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: block.id,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-col items-start gap-1 pr-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: block.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-normal text-muted-foreground",
						children: block.kicker
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-w-prose flex-col gap-3 text-foreground",
					children: [
						block.body.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph)),
						block.compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-lg bg-background px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "No português. "
							}), block.compare]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2",
							children: block.examples.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base italic text-foreground",
								children: ex.es
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: ex.pt
							})] }, ex.es))
						})
					]
				}) })]
			}, block.id))
		})]
	});
}
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-12 w-full items-center gap-1 rounded-xl border border-border bg-surface-2 p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-2 text-sm font-medium transition-[color,background-color] duration-[var(--motion-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-6 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function AppShell() {
	const hydrated = useHydrated();
	const totalCorrect = useProgress((s) => s.totalCorrect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "paper-grain min-h-dvh",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-8 sm:px-6 sm:pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.22em] text-primary",
						children: "caderno de verbos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl italic leading-none tracking-tight sm:text-6xl",
						children: "Conjuga"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-muted-foreground",
						children: "Pratique os tempos verbais em espanhol — -ar, -er e -ir — com correção na hora."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tabular-nums text-muted-foreground",
					children: hydrated ? `${totalCorrect} acerto${totalCorrect === 1 ? "" : "s"}` : "—"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "praticar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid h-auto grid-cols-2 gap-1 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "praticar",
								className: "min-h-11 gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }), "Praticar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "teoria",
								className: "min-h-11 gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }), "Teoria"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "guia",
								className: "min-h-11 gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Book, { className: "size-4" }), "Guia"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "progresso",
								className: "min-h-11 gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutList, { className: "size-4" }), "Progresso"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "praticar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticePanel, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "teoria",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheoryPanel, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "guia",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePanel, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "progresso",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsPanel, {})
					})
				]
			})]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
