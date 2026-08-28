import type { TenseId } from "./types";

export interface TheoryBlock {
  id: TenseId | "ser-estar" | "stem" | "accents" | "pronouns" | "haber";
  title: string;
  kicker: string;
  body: string[];
  compare?: string;
  examples: Array<{ es: string; pt: string }>;
}

export const THEORY: TheoryBlock[] = [
  {
    id: "presente",
    title: "Presente de indicativo",
    kicker: "O agora, o hábito, a verdade",
    body: [
      "Use o presente para ações habituais, fatos gerais e o que está acontecendo agora.",
      "Tire o -ar / -er / -ir e acrescente: -o, -as, -a, -amos, -áis, -an (e as variantes de -er/-ir).",
      "Muitos verbos do dia a dia mudam a vogal no radical (e→ie, o→ue) em todas as pessoas menos nosotros e vosotros: quiero, puedes.",
    ],
    compare: "Quase igual ao presente do português: hablo = falo. A diferença está nos irregulares (soy, estoy, voy, tengo, hago).",
    examples: [
      { es: "Trabajo de lunes a viernes.", pt: "Trabalho de segunda a sexta." },
      { es: "Ella vive en Madrid.", pt: "Ela mora em Madrid." },
    ],
  },
  {
    id: "preterito",
    title: "Pretérito indefinido",
    kicker: "Ação concluída, com começo e fim",
    body: [
      "Narra o que aconteceu uma vez, ou em cadeia, no passado: ayer, el año pasado, en 2019.",
      "Terminações -AR: -é, -aste, -ó, -amos, -asteis, -aron. -ER/-IR: -í, -iste, -ió, -imos, -isteis, -ieron.",
      "Os irregulares mais usados têm radical próprio: tuve, hice, fui, pude, quise, estuve, di, vi.",
    ],
    compare: "Equivale ao pretérito perfeito simples do português (falei, comi, fui). Em espanhol da Espanha, o passado recente sem data costuma ir para o perfecto (he hablado), não para este tempo.",
    examples: [
      { es: "Ayer comí con mis padres.", pt: "Ontem comi com meus pais." },
      { es: "El año pasado fui a España.", pt: "Ano passado fui à Espanha." },
    ],
  },
  {
    id: "imperfecto",
    title: "Pretérito imperfecto",
    kicker: "Cenário, hábito, descrição no passado",
    body: [
      "Pinta o fundo da história: como as coisas eram, o que se repetia, a idade, a hora, o clima.",
      "-AR: -aba, -abas, -aba, -ábamos, -abais, -aban. -ER/-IR: -ía, -ías, -ía, -íamos, -íais, -ían.",
      "Só três irregulares em todo o espanhol: ser (era), ir (iba) e ver (veía).",
    ],
    compare: "É o pretérito imperfeito do português (falava, comia, ia). A oposição indefinido vs imperfecto é a mesma de falei vs falava.",
    examples: [
      { es: "Cuando era niño, vivía cerca del mar.", pt: "Quando eu era criança, morava perto do mar." },
      { es: "Ella leía mientras yo cocinaba.", pt: "Ela lia enquanto eu cozinhava." },
    ],
  },
  {
    id: "perfecto",
    title: "Pretérito perfecto",
    kicker: "Passado ligado ao presente",
    body: [
      "Forma: presente de haber + particípio (he hablado, has comido, ha vivido).",
      "Na Espanha, cobre o que aconteceu hoje, esta semana, este ano — ainda dentro de um período aberto.",
      "Na América Latina, muitas vezes se prefere o indefinido (hablé) mesmo para o passado recente.",
    ],
    compare: "Parece o pretérito perfeito composto do português (tenho falado), mas o uso espanhol da Espanha é mais amplo: He desayunado = Tomei café (hoje), não necessariamente 'tenho tomado'.",
    examples: [
      { es: "Hoy he trabajado mucho.", pt: "Hoje trabalhei muito." },
      { es: "¿Has visto esta película?", pt: "Você já viu este filme?" },
    ],
  },
  {
    id: "pluscuamperfecto",
    title: "Pretérito pluscuamperfecto",
    kicker: "O passado do passado",
    body: [
      "Forma: imperfecto de haber + particípio (había hablado).",
      "Marca uma ação anterior a outra ação passada.",
    ],
    compare: "Igual ao mais-que-perfeito composto: tinha falado = había hablado.",
    examples: [
      { es: "Cuando llegué, ella ya había comido.", pt: "Quando cheguei, ela já tinha comido." },
    ],
  },
  {
    id: "futuro",
    title: "Futuro simple",
    kicker: "O que vai acontecer, ou uma suposição",
    body: [
      "O infinitivo inteiro ganha: -é, -ás, -á, -emos, -éis, -án. hablaré, comeré, viviré.",
      "Irregulares mudam o radical: tendré, haré, podré, querré, diré, sabré, habré.",
      "Também expressa probabilidade no presente: Será Juan = Deve ser o Juan.",
    ],
    compare: "Como o futuro do presente (falarei). No dia a dia, o espanhol usa muito ir a + infinitivo (voy a hablar), igual ao 'vou falar'.",
    examples: [
      { es: "Mañana estudiaré tres horas.", pt: "Amanhã estudarei três horas." },
      { es: "¿Dónde estará mi teléfono?", pt: "Onde será que está o meu telefone?" },
    ],
  },
  {
    id: "futuro_perfecto",
    title: "Futuro compuesto",
    kicker: "Concluído no futuro, ou suposição no passado",
    body: [
      "Forma: futuro de haber + particípio (habré hablado).",
      "Para quando algo já terá acontecido, ou para conjecturar sobre o passado: Habrá salido = Deve ter saído.",
    ],
    compare: "Como o futuro composto: terei falado = habré hablado.",
    examples: [
      { es: "Para las seis ya habré llegado.", pt: "Até as seis eu já terei chegado." },
    ],
  },
  {
    id: "condicional",
    title: "Condicional simple",
    kicker: "O que aconteceria, um pedido educado",
    body: [
      "Infinitivo + -ía, -ías, -ía, -íamos, -íais, -ían. Os mesmos radicais irregulares do futuro: tendría, haría, podría.",
      "Serve para cortesia (¿Podrías ayudarme?), hipótese e o futuro visto do passado.",
    ],
    compare: "É o futuro do pretérito do português: falaria, comeria, poderia.",
    examples: [
      { es: "Me gustaría vivir cerca del mar.", pt: "Gostaria de morar perto do mar." },
      { es: "¿Podrías abrir la ventana?", pt: "Você poderia abrir a janela?" },
    ],
  },
  {
    id: "condicional_perfecto",
    title: "Condicional compuesto",
    kicker: "O que teria acontecido",
    body: [
      "Forma: condicional de haber + particípio (habría hablado).",
      "Hipótese no passado: Si hubiera estudiado, habría aprobado.",
    ],
    compare: "Como o futuro do pretérito composto: teria falado = habría hablado.",
    examples: [
      { es: "Habría comprado el libro, pero no tenía dinero.", pt: "Teria comprado o livro, mas não tinha dinheiro." },
    ],
  },
  {
    id: "subjuntivo",
    title: "Presente de subjuntivo",
    kicker: "Desejo, dúvida, emoção, influência",
    body: [
      "Aparece depois de que em orações que não afirmam um fato: quiero que, es importante que, no creo que, ojalá.",
      "A vogal 'inverte': -AR vira e (hable), -ER/-IR viram a (coma, viva).",
      "Muitos irregulares saem da forma yo do presente: tengo → tenga, hago → haga, voy → vaya, soy → sea.",
    ],
    compare: "Existe no português (que eu fale, que ele coma), mas o espanhol o usa muito mais no dia a dia. 'Quero que você fale' = Quiero que hables (não *hablas).",
    examples: [
      { es: "Quiero que estudies más.", pt: "Quero que você estude mais." },
      { es: "Espero que tengas un buen día.", pt: "Espero que você tenha um bom dia." },
    ],
  },
  {
    id: "imperfecto_subj",
    title: "Imperfecto de subjuntivo",
    kicker: "Subjuntivo no passado, e o 'se' das hipóteses",
    body: [
      "Forma-se a partir da 3ª pessoa do pretérito indefinido: hablaron → hablara; tuvieron → tuviera; fueron → fuera.",
      "Há duas séries (-ra e -se). Aqui praticamos a de -ra, a mais comum na fala.",
      "Obrigatório em si + hipótese: Si tuviera tiempo, viajaría.",
    ],
    compare: "Como o pretérito imperfeito do subjuntivo: se eu falasse = si yo hablara. Em português informal muita gente usa o futuro do pretérito no lugar; em espanhol a regra é rígida.",
    examples: [
      { es: "Si pudiera, viviría en el campo.", pt: "Se eu pudesse, moraria no campo." },
      { es: "Quería que vinieras.", pt: "Queria que você viesse." },
    ],
  },
  {
    id: "perfecto_subj",
    title: "Pretérito perfecto de subjuntivo",
    kicker: "Subjuntivo de algo já concluído",
    body: [
      "Forma: presente de subjuntivo de haber + particípio (haya hablado).",
      "Me alegra que hayas venido. No creo que haya comido.",
    ],
    compare: "Como 'que eu tenha falado' = que yo haya hablado.",
    examples: [
      { es: "Me alegra que hayas llegado.", pt: "Fico feliz que você tenha chegado." },
    ],
  },
  {
    id: "pluscuamperfecto_subj",
    title: "Pluscuamperfecto de subjuntivo",
    kicker: "A hipótese que não aconteceu",
    body: [
      "Forma: imperfecto de subjuntivo de haber + particípio (hubiera hablado).",
      "Par da condicional composta: Si hubiera estudiado, habría aprobado.",
    ],
    compare: "Como 'se eu tivesse falado' = si yo hubiera hablado.",
    examples: [
      { es: "Si hubiera sabido, te habría llamado.", pt: "Se eu soubesse / tivesse sabido, teria te ligado." },
    ],
  },
  {
    id: "imperativo",
    title: "Imperativo afirmativo",
    kicker: "Pedidos e instruções no positivo",
    body: [
      "Não existe forma para yo. Tú usa a 3ª pessoa do presente: habla, come, vive — com irregularidades (ten, haz, sé, ve, di, sal, ven, pon).",
      "Usted, nosotros e ustedes copiam o presente do subjuntivo. Vosotros troca o -r do infinitivo por -d: hablad, comed, vivid.",
      "Na América Latina não se usa vosotros: vocês = ustedes (hablen).",
    ],
    compare: "Como o imperativo português (fala, coma, vivam), mas a forma de vosotros não tem equivalente no Brasil.",
    examples: [
      { es: "Habla más despacio, por favor.", pt: "Fale mais devagar, por favor." },
      { es: "Ven aquí.", pt: "Vem cá." },
    ],
  },
  {
    id: "imperativo_neg",
    title: "Imperativo negativo",
    kicker: "Tudo vira subjuntivo",
    body: [
      "Para negar, use no + presente de subjuntivo em todas as pessoas: no hables, no coma, no vayas.",
      "Não existe *no habla. O afirmativo e o negativo são paradigmas diferentes.",
    ],
    compare: "No português dizemos 'não fale' (subjuntivo) e 'não fala' (indicativo, mais informal). Em espanhol só vale o subjuntivo: no hables.",
    examples: [
      { es: "No comas tan rápido.", pt: "Não coma tão rápido." },
      { es: "No vayas ahora.", pt: "Não vá agora." },
    ],
  },
  {
    id: "gerundio",
    title: "Gerundio",
    kicker: "A ação em curso",
    body: [
      "-AR → -ando (hablando). -ER/-IR → -iendo (comiendo, viviendo). Vogal + iendo vira yendo: leyendo, yendo.",
      "Com estar: estoy hablando = estou falando. Também descreve modo: salió corriendo.",
    ],
    compare: "Como o gerúndio português (falando, comendo). Cuidado: em espanhol não se usa gerúndio para futuro (*estoy yendo mañana está forçado; prefira voy mañana).",
    examples: [
      { es: "Estoy estudiando español.", pt: "Estou estudando espanhol." },
      { es: "Salió corriendo.", pt: "Saiu correndo." },
    ],
  },
  {
    id: "participio",
    title: "Participio",
    kicker: "A forma dos tempos compostos",
    body: [
      "-AR → -ado. -ER/-IR → -ido. Irregulares frequentes: escrito, abierto, hecho, visto, dicho, puesto, vuelto, muerto.",
      "Com haber forma os compostos. Com ser/estar vira adjetivo: la puerta está abierta.",
    ],
    compare: "Como o particípio português (falado, escrito, aberto). Vários coincidem: escrito, abierto/aberto, visto.",
    examples: [
      { es: "He escrito tres mensajes.", pt: "Escrevi / tenho escrito três mensagens." },
      { es: "La tienda está abierta.", pt: "A loja está aberta." },
    ],
  },
];

export const GUIDE = {
  pronouns: {
    title: "Pronomes pessoais",
    rows: [
      ["yo", "eu", "sempre opcional; o verbo já marca a pessoa"],
      ["tú", "tu / você informal", "Espanha e grande parte da América"],
      ["usted", "você formal", "conjuga como él/ella"],
      ["él / ella", "ele / ela", ""],
      ["nosotros / nosotras", "nós", "nosotras só para grupo feminino"],
      ["vosotros / vosotras", "vocês", "só na Espanha (exceto Canárias/Andaluzia formal)"],
      ["ustedes", "vocês", "América Latina inteira; na Espanha é formal"],
      ["ellos / ellas", "eles / elas", ""],
    ],
  },
  serEstar: {
    title: "Ser × estar",
    ser: [
      "Identidade e profissão: Soy profesor.",
      "Origem e material: Es de Brasil. Es de madera.",
      "Hora e data: Son las tres. Es lunes.",
      "Característica que se trata como essência: Ella es alta. El café es bueno.",
      "Evento (onde acontece): La fiesta es en mi casa.",
    ],
    estar: [
      "Localização de pessoas e coisas: Estoy en casa.",
      "Estado temporário: Estoy cansado. Está enferma.",
      "Resultado: La puerta está abierta. El café está caliente.",
      "Progressivo: Estoy comiendo.",
      "Opinião pontual: La sopa está buena (hoje, nesta tigela).",
    ],
    trick:
      "Pergunte: é da natureza da coisa (ser) ou é um estado/lugar agora (estar)? 'É médico' = ser. 'Está doente' = estar.",
  },
  stems: {
    title: "Mudança no radical",
    groups: [
      {
        name: "e → ie",
        verbs: "querer, pensar, cerrar, empezar, entender",
        sample: "quiero, quieres, quiere, queremos, queréis, quieren",
      },
      {
        name: "o → ue",
        verbs: "poder, dormir, volver, encontrar, almorzar",
        sample: "puedo, puedes, puede, podemos, podéis, pueden",
      },
      {
        name: "e → i  (só -ir)",
        verbs: "pedir, servir, repetir, seguir",
        sample: "pido, pides, pide, pedimos, pedís, piden",
      },
      {
        name: "u → ue",
        verbs: "jugar (único comum)",
        sample: "juego, juegas, juega, jugamos, jugáis, juegan",
      },
    ],
    note: "Nosotros e vosotros quase nunca mudam no presente. No pretérito, só os -ir (pidió, durmió) mudam na 3ª pessoa.",
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
      "te (pronome) × té (chá).",
    ],
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
      ["Imperf. subj.", "hubiera, hubieras, hubiera, hubiéramos, hubierais, hubieran"],
    ],
  },
};

export function theoryFor(id: TenseId): TheoryBlock | undefined {
  return THEORY.find((block) => block.id === id);
}
