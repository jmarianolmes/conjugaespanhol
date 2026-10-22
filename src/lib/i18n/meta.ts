import type { Locale } from "./types";
import type { PersonId, TenseId } from "@/lib/spanish/types";

type L = Record<Locale, string>;

function L(pt: string, en: string, ru: string, uk: string, zh: string): L {
  return { pt, en, ru, uk, zh };
}

export const TENSE_NAME: Record<TenseId, L> = {
  presente: L("Presente do indicativo", "Present indicative", "Настоящее время", "Теперішній час", "现在时"),
  preterito: L("Pretérito perfeito simples", "Preterite", "Претерит (незаконченное прошедшее)", "Претеріт", "简单过去时"),
  imperfecto: L("Pretérito imperfeito", "Imperfect", "Имперфект", "Імперфект", "未完成过去时"),
  perfecto: L("Pretérito perfeito composto", "Present perfect", "Перфект", "Перфект", "现在完成时"),
  pluscuamperfecto: L("Mais-que-perfeito composto", "Pluperfect", "Плюсквамперфект", "Плюсквамперфект", "过去完成时"),
  futuro: L("Futuro do presente", "Simple future", "Будущее простое", "Майбутній простий", "简单将来时"),
  futuro_perfecto: L("Futuro composto", "Future perfect", "Будущее совершённое", "Майбутній доконаний", "将来完成时"),
  condicional: L("Futuro do pretérito", "Conditional", "Условное", "Умовний спосіб", "条件式"),
  condicional_perfecto: L("Futuro do pretérito composto", "Conditional perfect", "Условное совершённое", "Умовний доконаний", "条件完成式"),
  subjuntivo: L("Presente do subjuntivo", "Present subjunctive", "Сослагательное настоящее", "Теперішній субхунтив", "现在虚拟式"),
  imperfecto_subj: L("Imperfeito do subjuntivo", "Imperfect subjunctive", "Сослагательное имперфект", "Імперфект субхунтива", "过去虚拟式"),
  perfecto_subj: L("Perfeito do subjuntivo", "Perfect subjunctive", "Сослагательное перфект", "Перфект субхунтива", "现在完成虚拟式"),
  pluscuamperfecto_subj: L("Mais-que-perfeito do subjuntivo", "Pluperfect subjunctive", "Сослагательное плюсквамперфект", "Плюсквамперфект субхунтива", "过去完成虚拟式"),
  imperativo: L("Imperativo afirmativo", "Affirmative imperative", "Утвердительное повелительное", "Ствердний наказовий", "肯定命令式"),
  imperativo_neg: L("Imperativo negativo", "Negative imperative", "Отрицательное повелительное", "Заперечний наказовий", "否定命令式"),
  gerundio: L("Gerúndio", "Gerund", "Герундий", "Герундій", "副动词"),
  participio: L("Particípio", "Participle", "Причастие", "Дієприкметник", "过去分词"),
};

export const TENSE_SHORT: Record<TenseId, L> = {
  presente: L("Presente", "Present", "Настоящее", "Теперішній", "现在"),
  preterito: L("Indefinido", "Preterite", "Претерит", "Претеріт", "过去"),
  imperfecto: L("Imperfeito", "Imperfect", "Имперфект", "Імперфект", "未完成"),
  perfecto: L("Perfecto", "Perfect", "Перфект", "Перфект", "完成"),
  pluscuamperfecto: L("Pluscuamperfecto", "Pluperfect", "Плюсквамперфект", "Плюсквамперфект", "过去完成"),
  futuro: L("Futuro", "Future", "Будущее", "Майбутній", "将来"),
  futuro_perfecto: L("Futuro composto", "Future perfect", "Будущее соверш.", "Майбутній док.", "将来完成"),
  condicional: L("Condicional", "Conditional", "Условное", "Умовний", "条件"),
  condicional_perfecto: L("Cond. composto", "Cond. perfect", "Усл. соверш.", "Умовн. док.", "条件完成"),
  subjuntivo: L("Subjuntivo", "Subjunctive", "Сослагательное", "Субхунтив", "虚拟"),
  imperfecto_subj: L("Imperf. subj.", "Imp. subj.", "Имп. сосл.", "Імп. субх.", "过去虚拟"),
  perfecto_subj: L("Perf. subj.", "Perf. subj.", "Перф. сосл.", "Перф. субх.", "完成虚拟"),
  pluscuamperfecto_subj: L("Plusc. subj.", "Plup. subj.", "Плюск. сосл.", "Плюск. субх.", "过完虚拟"),
  imperativo: L("Imperativo", "Imperative", "Повелительное", "Наказовий", "命令"),
  imperativo_neg: L("Imperativo neg.", "Neg. imperative", "Отр. повелит.", "Запер. наказ.", "否定命令"),
  gerundio: L("Gerúndio", "Gerund", "Герундий", "Герундій", "副动词"),
  participio: L("Particípio", "Participle", "Причастие", "Дієприкметник", "分词"),
};

export const GROUP_LABEL: Record<string, L> = {
  indicativo: L("Indicativo", "Indicative", "Изъявительное", "Дійсний спосіб", "陈述式"),
  subjuntivo: L("Subjuntivo", "Subjunctive", "Сослагательное", "Субхунтив", "虚拟式"),
  imperativo: L("Imperativo", "Imperative", "Повелительное", "Наказовий", "命令式"),
  "no-personal": L("Formas não pessoais", "Non-personal forms", "Неличные формы", "Неособові форми", "非人称形式"),
  "ar": L("Regulares -AR", "Regular -AR", "Правильные -AR", "Правильні -AR", "规则 -AR"),
  "er": L("Regulares -ER", "Regular -ER", "Правильные -ER", "Правильні -ER", "规则 -ER"),
  "ir": L("Regulares -IR", "Regular -IR", "Правильные -IR", "Правильні -IR", "规则 -IR"),
  orto: L("Ortográficos", "Spelling changes", "Орфографические", "Орфографічні", "拼写变化"),
  stem: L("Mudança de radical", "Stem change", "Чередование", "Чергування", "词干变化"),
  irr: L("Irregulares essenciais", "Core irregulars", "Основные неправильные", "Основні неправильні", "核心不规则"),
};

export const PERSON_HINT: Record<PersonId, L> = {
  yo: L("eu", "I", "я", "я", "我"),
  tu: L("tu / você (informal)", "you (informal)", "ты", "ти", "你（非正式）"),
  el: L("ele / ela / você (formal)", "he / she / you (formal)", "он / она / вы", "він / вона / ви", "他 / 她 / 您"),
  nosotros: L("nós", "we", "мы", "ми", "我们"),
  vosotros: L("vocês (Espanha)", "you all (Spain)", "вы (Испания)", "ви (Іспанія)", "你们（西班牙）"),
  ellos: L("eles / vocês", "they / you all", "они / вы", "вони / ви", "他们 / 你们"),
};

export const VERB_MEANING: Record<string, L> = {
  hablar: L("falar", "to speak", "говорить", "говорити", "说"),
  trabajar: L("trabalhar", "to work", "работать", "працювати", "工作"),
  estudiar: L("estudar", "to study", "учиться", "вчитися", "学习"),
  comprar: L("comprar", "to buy", "покупать", "купувати", "买"),
  llamar: L("chamar / ligar", "to call", "звать / звонить", "кликати / дзвонити", "叫 / 打电话"),
  esperar: L("esperar", "to wait / to hope", "ждать / надеяться", "чекати / сподіватися", "等 / 希望"),
  necesitar: L("precisar", "to need", "нуждаться", "потребувати", "需要"),
  comer: L("comer", "to eat", "есть", "їсти", "吃"),
  beber: L("beber", "to drink", "пить", "пити", "喝"),
  aprender: L("aprender", "to learn", "учить", "вчитися", "学习"),
  leer: L("ler", "to read", "читать", "читати", "读"),
  vivir: L("viver / morar", "to live", "жить", "жити", "住 / 生活"),
  escribir: L("escrever", "to write", "писать", "писати", "写"),
  abrir: L("abrir", "to open", "открывать", "відкривати", "打开"),
  llegar: L("chegar", "to arrive", "прибывать", "прибувати", "到达"),
  conocer: L("conhecer", "to know (a person)", "знать (кого-то)", "знати (когось)", "认识"),
  pedir: L("pedir / encomendar", "to ask for / to order", "просить / заказывать", "просити / замовляти", "要 / 点单"),
  pensar: L("pensar", "to think", "думать", "думати", "想"),
  empezar: L("começar", "to begin", "начинать", "починати", "开始"),
  volver: L("voltar", "to return", "возвращаться", "повертатися", "回来"),
  dormir: L("dormir", "to sleep", "спать", "спати", "睡觉"),
  ser: L("ser", "to be (identity)", "быть (суть)", "бути (сутність)", "是（本质）"),
  estar: L("estar", "to be (state)", "быть (состояние)", "бути (стан)", "是（状态）"),
  ir: L("ir", "to go", "идти", "йти", "去"),
  tener: L("ter", "to have", "иметь", "мати", "有"),
  hacer: L("fazer", "to do / to make", "делать", "робити", "做"),
  poder: L("poder / conseguir", "to be able", "мочь", "могти", "能"),
  querer: L("querer / amar", "to want / to love", "хотеть / любить", "хотіти / любити", "想要 / 爱"),
  ver: L("ver", "to see", "видеть", "бачити", "看"),
  dar: L("dar", "to give", "давать", "давати", "给"),
  decir: L("dizer", "to say", "говорить / сказать", "казати", "说"),
  venir: L("vir", "to come", "приходить", "приходити", "来"),
  salir: L("sair", "to leave", "выходить", "виходити", "离开"),
  poner: L("pôr / colocar", "to put", "класть", "класти", "放"),
  saber: L("saber", "to know (a fact)", "знать (факт)", "знати (факт)", "知道"),
};

export const PREP_MEANING: Record<string, L> = {
  a: L("a / para (direção)", "to (direction)", "к / в (направление)", "до / в (напрямок)", "向 / 到"),
  al: L("ao (a + el)", "to the (a + el)", "к + el", "до + el", "到（a+el）"),
  de: L("de / desde", "of / from", "из / от", "з / від", "的 / 从"),
  del: L("do (de + el)", "of the (de + el)", "из + el", "з + el", "从（de+el）"),
  en: L("em / no", "in / on", "в / на", "у / на", "在"),
  con: L("com", "with", "с", "з", "和 / 带"),
  sin: L("sem", "without", "без", "без", "没有"),
  por: L("por (causa, duração, caminho)", "for / by / through", "из-за / через", "через / заради", "因为 / 经过"),
  para: L("para (fim, prazo, destinatário)", "for (purpose, deadline)", "для / к сроку", "для / до терміну", "为了 / 给"),
  entre: L("entre", "between", "между", "між", "在…之间"),
  hasta: L("até", "until", "до", "до", "直到"),
  desde: L("desde / a partir de", "since / from", "с / начиная с", "від / з", "自从"),
  sobre: L("sobre / em cima de", "about / on", "о / на", "про / на", "关于 / 在…上"),
  durante: L("durante", "during", "во время", "під час", "在…期间"),
  hacia: L("em direção a", "toward", "по направлению к", "у напрямку до", "朝向"),
  según: L("segundo / de acordo com", "according to", "согласно", "згідно з", "根据"),
};

export const KIND_LABEL: Record<string, L> = {
  falso: L("Falsos amigos", "False friends", "Ложные друзья", "Фальшиві друзі", "假朋友"),
  casa: L("Casa e objetos", "Home and objects", "Дом и вещи", "Дім і речі", "家和物品"),
  rua: L("Rua e cidade", "Street and city", "Улица и город", "Вулиця і місто", "街道和城市"),
  comida: L("Comida", "Food", "Еда", "Їжа", "食物"),
  ropa: L("Roupa", "Clothes", "Одежда", "Одяг", "衣服"),
  jerga: L("Gíria da Espanha", "Spain slang", "Испанский сленг", "Іспанський сленг", "西班牙口语"),
  verbo: L("Verbos traiçoeiros", "Tricky verbs", "Коварные глаголы", "Підступні дієслова", "易混动词"),
};

export function pick(locale: Locale, table: L | undefined, fallback: string): string {
  if (!table) return fallback;
  return table[locale] || fallback;
}
