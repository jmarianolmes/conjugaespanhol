import { normalizeAnswer, stripDiacritics } from "./conjugate";
import type { CheckResult } from "./types";

export type PrepId =
  | "a"
  | "al"
  | "de"
  | "del"
  | "en"
  | "con"
  | "sin"
  | "por"
  | "para"
  | "entre"
  | "hasta"
  | "desde"
  | "sobre"
  | "durante"
  | "hacia"
  | "según";

export type PrepGroupId = "por-para" | "a-en-de" | "con-sin" | "otras";

export interface PrepMeta {
  id: PrepId;
  group: PrepGroupId;
  label: string;
  meaningPt: string;
}

export interface PrepPrompt {
  id: string;
  prep: PrepId;
  use: string;
  before: string;
  after: string;
  pt: string;
  why: string;
  aliases?: string[];
}

export const PREP_GROUPS: { id: PrepGroupId; label: string }[] = [
  { id: "por-para", label: "por / para" },
  { id: "a-en-de", label: "a / en / de" },
  { id: "con-sin", label: "con / sin" },
  { id: "otras", label: "outras" },
];

export const PREPOSITIONS: PrepMeta[] = [
  { id: "a", group: "a-en-de", label: "a", meaningPt: "a / para (direção)" },
  { id: "al", group: "a-en-de", label: "al", meaningPt: "ao (a + el)" },
  { id: "de", group: "a-en-de", label: "de", meaningPt: "de / desde" },
  { id: "del", group: "a-en-de", label: "del", meaningPt: "do (de + el)" },
  { id: "en", group: "a-en-de", label: "en", meaningPt: "em / no" },
  { id: "con", group: "con-sin", label: "con", meaningPt: "com" },
  { id: "sin", group: "con-sin", label: "sin", meaningPt: "sem" },
  { id: "por", group: "por-para", label: "por", meaningPt: "por (causa, duração, caminho)" },
  { id: "para", group: "por-para", label: "para", meaningPt: "para (fim, prazo, destinatário)" },
  { id: "entre", group: "otras", label: "entre", meaningPt: "entre" },
  { id: "hasta", group: "otras", label: "hasta", meaningPt: "até" },
  { id: "desde", group: "otras", label: "desde", meaningPt: "desde / a partir de" },
  { id: "sobre", group: "otras", label: "sobre", meaningPt: "sobre / em cima de" },
  { id: "durante", group: "otras", label: "durante", meaningPt: "durante" },
  { id: "hacia", group: "otras", label: "hacia", meaningPt: "em direção a" },
  { id: "según", group: "otras", label: "según", meaningPt: "segundo / de acordo com" },
];

export const PREP_PROMPTS: PrepPrompt[] = [
  {
    id: "para-ti",
    prep: "para",
    use: "destinatário",
    before: "Este café es ",
    after: " ti.",
    pt: "Este café é para você.",
    why: "Destinatário: a coisa é para alguém.",
  },
  {
    id: "para-examen",
    prep: "para",
    use: "finalidade",
    before: "Estudio ",
    after: " el examen.",
    pt: "Estudo para a prova.",
    why: "Finalidade: estudo com um objetivo.",
  },
  {
    id: "para-manana",
    prep: "para",
    use: "prazo",
    before: "Necesito el informe ",
    after: " mañana.",
    pt: "Preciso do relatório para amanhã.",
    why: "Prazo: até quando precisa estar pronto.",
  },
  {
    id: "para-empresa",
    prep: "para",
    use: "trabalho",
    before: "Trabajo ",
    after: " una empresa brasileña.",
    pt: "Trabalho para uma empresa brasileira.",
    why: "Para quem você trabalha (empresa, pessoa).",
  },
  {
    id: "para-llevar",
    prep: "para",
    use: "finalidade",
    before: "¿Esto es para aquí o ",
    after: " llevar?",
    pt: "Isto é para comer aqui ou para levar?",
    why: "Finalidade: para levar.",
  },
  {
    id: "para-leer",
    prep: "para",
    use: "finalidade",
    before: "Estas gafas son ",
    after: " leer.",
    pt: "Estes óculos são para ler.",
    why: "Para + infinitivo: propósito.",
  },
  {
    id: "para-sevilla",
    prep: "para",
    use: "destino",
    before: "El tren sale ",
    after: " Sevilla.",
    pt: "O trem sai para Sevilha.",
    why: "Destino de um meio de transporte que parte.",
  },
  {
    id: "por-gracias",
    prep: "por",
    use: "causa",
    before: "Gracias ",
    after: " tu ayuda.",
    pt: "Obrigado pela sua ajuda.",
    why: "Causa: agradecer por algo.",
  },
  {
    id: "por-parque",
    prep: "por",
    use: "caminho",
    before: "Caminamos ",
    after: " el parque.",
    pt: "Caminhamos pelo parque.",
    why: "Caminho: movimento através de um lugar.",
  },
  {
    id: "por-telefono",
    prep: "por",
    use: "meio",
    before: "Te llamo ",
    after: " teléfono.",
    pt: "Te ligo por telefone.",
    why: "Meio: como a ação acontece.",
  },
  {
    id: "por-manana",
    prep: "por",
    use: "tempo",
    before: "Trabajo ",
    after: " la mañana.",
    pt: "Trabalho de manhã.",
    why: "Parte do dia: por la mañana / tarde / noche.",
  },
  {
    id: "por-horas",
    prep: "por",
    use: "duração",
    before: "Estuve allí ",
    after: " dos horas.",
    pt: "Fiquei lá por duas horas.",
    why: "Duração: por quanto tempo.",
  },
  {
    id: "por-precio",
    prep: "por",
    use: "troca",
    before: "Lo compré ",
    after: " diez euros.",
    pt: "Comprei por dez euros.",
    why: "Troca: preço, em troca de.",
  },
  {
    id: "por-ti",
    prep: "por",
    use: "causa",
    before: "Lo hice ",
    after: " ti.",
    pt: "Fiz isso por você.",
    why: "Causa ou favor: por alguém.",
  },
  {
    id: "por-gusto",
    prep: "por",
    use: "causa",
    before: "Estudio español ",
    after: " gusto.",
    pt: "Estudo espanhol por gosto.",
    why: "Motivo: por que você faz isso.",
  },
  {
    id: "a-casa",
    prep: "a",
    use: "destino",
    before: "Después del trabajo voy ",
    after: " casa.",
    pt: "Depois do trabalho vou para casa.",
    why: "Direção: ir a um lugar (movimento).",
  },
  {
    id: "al-medico",
    prep: "al",
    use: "destino",
    before: "Mañana voy ",
    after: " médico.",
    pt: "Amanhã vou ao médico.",
    why: "a + el = al.",
    aliases: ["a el"],
  },
  {
    id: "a-las-ocho",
    prep: "a",
    use: "tempo",
    before: "Llegamos ",
    after: " las ocho.",
    pt: "Chegamos às oito.",
    why: "Hora do relógio: a las + hora.",
  },
  {
    id: "a-maria",
    prep: "a",
    use: "pessoa",
    before: "Invito ",
    after: " María a la cena.",
    pt: "Convido a María para o jantar.",
    why: "a pessoal: objeto direto de pessoa.",
  },
  {
    id: "a-playa",
    prep: "a",
    use: "destino",
    before: "El sábado vamos ",
    after: " la playa.",
    pt: "Sábado vamos à praia.",
    why: "Direção com artigo: a la.",
  },
  {
    id: "a-pie",
    prep: "a",
    use: "meio",
    before: "Voy ",
    after: " pie hasta el metro.",
    pt: "Vou a pé até o metrô.",
    why: "Meio: a pie, a caballo.",
  },
  {
    id: "empezar-a",
    prep: "a",
    use: "verbo",
    before: "Empiezo ",
    after: " trabajar a las nueve.",
    pt: "Começo a trabalhar às nove.",
    why: "empezar a + infinitivo.",
  },
  {
    id: "en-casa",
    prep: "en",
    use: "lugar",
    before: "Hoy estoy ",
    after: " casa.",
    pt: "Hoje estou em casa.",
    why: "Estar em um lugar (sem movimento).",
  },
  {
    id: "en-madrid",
    prep: "en",
    use: "lugar",
    before: "Vivo ",
    after: " Madrid.",
    pt: "Moro em Madrid.",
    why: "Cidade ou país em que se está / mora: en.",
  },
  {
    id: "en-mesa",
    prep: "en",
    use: "lugar",
    before: "El libro está ",
    after: " la mesa.",
    pt: "O livro está na mesa.",
    why: "Posição: em cima / dentro de um lugar.",
  },
  {
    id: "en-invierno",
    prep: "en",
    use: "tempo",
    before: "",
    after: " invierno hace frío.",
    pt: "No inverno faz frio.",
    why: "Estação, mês ou ano: en enero, en 2020.",
  },
  {
    id: "en-ti",
    prep: "en",
    use: "verbo",
    before: "Pienso ",
    after: " ti todo el día.",
    pt: "Penso em você o dia todo.",
    why: "pensar en alguien.",
  },
  {
    id: "en-tienda",
    prep: "en",
    use: "lugar",
    before: "Entramos ",
    after: " la tienda.",
    pt: "Entramos na loja.",
    why: "entrar en un lugar.",
  },
  {
    id: "en-metro",
    prep: "en",
    use: "meio",
    before: "Voy al trabajo ",
    after: " metro.",
    pt: "Vou ao trabalho de metrô.",
    why: "Meio fechado: en metro, en tren, en coche.",
  },
  {
    id: "de-brasil",
    prep: "de",
    use: "origem",
    before: "Soy ",
    after: " Brasil.",
    pt: "Sou do Brasil.",
    why: "Origem: ser de um lugar.",
  },
  {
    id: "de-padre",
    prep: "de",
    use: "posse",
    before: "El coche ",
    after: " mi padre es azul.",
    pt: "O carro do meu pai é azul.",
    why: "Posse: de alguém.",
  },
  {
    id: "de-cafe",
    prep: "de",
    use: "conteúdo",
    before: "Una taza ",
    after: " café, por favor.",
    pt: "Uma xícara de café, por favor.",
    why: "Conteúdo ou material: de café, de madera.",
  },
  {
    id: "del-trabajo",
    prep: "del",
    use: "origem",
    before: "Salgo ",
    after: " trabajo a las seis.",
    pt: "Saio do trabalho às seis.",
    why: "de + el = del.",
    aliases: ["de el"],
  },
  {
    id: "de-pelicula",
    prep: "de",
    use: "tema",
    before: "Hablamos ",
    after: " la película.",
    pt: "Falamos do filme.",
    why: "hablar de un tema.",
  },
  {
    id: "de-estacion",
    prep: "de",
    use: "lugar",
    before: "Estoy cerca ",
    after: " la estación.",
    pt: "Estou perto da estação.",
    why: "cerca de, lejos de, delante de.",
  },
  {
    id: "de-casa",
    prep: "de",
    use: "origem",
    before: "¿A qué hora sales ",
    after: " casa?",
    pt: "A que horas você sai de casa?",
    why: "Sair de um lugar: salir de.",
  },
  {
    id: "con-leche",
    prep: "con",
    use: "companhia",
    before: "Un café ",
    after: " leche, por favor.",
    pt: "Um café com leite, por favor.",
    why: "Com: acompanhado de.",
  },
  {
    id: "con-amigos",
    prep: "con",
    use: "companhia",
    before: "El viernes salgo ",
    after: " mis amigos.",
    pt: "Sexta saio com meus amigos.",
    why: "Companhia de pessoas.",
  },
  {
    id: "con-hermana",
    prep: "con",
    use: "companhia",
    before: "Hablo ",
    after: " mi hermana todos los días.",
    pt: "Falo com a minha irmã todos os dias.",
    why: "hablar con alguien.",
  },
  {
    id: "con-queso",
    prep: "con",
    use: "companhia",
    before: "Quiero un bocadillo ",
    after: " queso.",
    pt: "Quero um sanduíche com queijo.",
    why: "Ingrediente ou acompanhamento.",
  },
  {
    id: "sin-azucar",
    prep: "sin",
    use: "ausência",
    before: "Un café ",
    after: " azúcar, por favor.",
    pt: "Um café sem açúcar, por favor.",
    why: "Sem: ausência de algo.",
  },
  {
    id: "sin-paraguas",
    prep: "sin",
    use: "ausência",
    before: "Salí ",
    after: " paraguas y me mojé.",
    pt: "Saí sem guarda-chuva e me molhei.",
    why: "Fazer algo sem ter algo.",
  },
  {
    id: "sin-musica",
    prep: "sin",
    use: "ausência",
    before: "No puedo vivir ",
    after: " música.",
    pt: "Não posso viver sem música.",
    why: "sin + substantivo.",
  },
  {
    id: "entre-tiendas",
    prep: "entre",
    use: "lugar",
    before: "El banco está ",
    after: " la farmacia y el café.",
    pt: "O banco fica entre a farmácia e o café.",
    why: "Entre dois pontos.",
  },
  {
    id: "entre-dias",
    prep: "entre",
    use: "tempo",
    before: "",
    after: " lunes y viernes trabajo.",
    pt: "Entre segunda e sexta eu trabalho.",
    why: "Intervalo: entre A y B.",
  },
  {
    id: "hasta-manana",
    prep: "hasta",
    use: "tempo",
    before: "",
    after: " mañana.",
    pt: "Até amanhã.",
    why: "Limite no tempo: até quando.",
  },
  {
    id: "hasta-seis",
    prep: "hasta",
    use: "tempo",
    before: "Hoy trabajo ",
    after: " las seis.",
    pt: "Hoje trabalho até as seis.",
    why: "Até que hora.",
  },
  {
    id: "desde-ocho",
    prep: "desde",
    use: "tempo",
    before: "Espero ",
    after: " las ocho.",
    pt: "Espero desde as oito.",
    why: "Ponto de partida no tempo.",
  },
  {
    id: "desde-2020",
    prep: "desde",
    use: "tempo",
    before: "Vivo aquí ",
    after: " 2020.",
    pt: "Moro aqui desde 2020.",
    why: "Desde quando algo começou.",
  },
  {
    id: "sobre-espana",
    prep: "sobre",
    use: "tema",
    before: "Estoy leyendo un libro ",
    after: " España.",
    pt: "Estou lendo um livro sobre a Espanha.",
    why: "Tema: sobre algo.",
  },
  {
    id: "sobre-mesa",
    prep: "sobre",
    use: "lugar",
    before: "Dejé las llaves ",
    after: " la mesa.",
    pt: "Deixei as chaves sobre a mesa.",
    why: "Em cima de uma superfície.",
  },
  {
    id: "durante-cena",
    prep: "durante",
    use: "tempo",
    before: "",
    after: " la cena no uso el móvil.",
    pt: "Durante o jantar não uso o celular.",
    why: "Enquanto algo acontece.",
  },
  {
    id: "hacia-estacion",
    prep: "hacia",
    use: "destino",
    before: "Caminamos ",
    after: " la estación.",
    pt: "Caminhamos em direção à estação.",
    why: "Direção aproximada: hacia.",
  },
  {
    id: "segun-mapa",
    prep: "según",
    use: "fonte",
    before: "",
    after: " el mapa, es aquí.",
    pt: "Segundo o mapa, é aqui.",
    why: "De acordo com uma fonte.",
    aliases: ["segun"],
  },
  {
    id: "a-ti",
    prep: "a",
    use: "pessoa",
    before: "Te veo ",
    after: " ti en la estación.",
    pt: "Te vejo a você na estação.",
    why: "a + pronome tônico: a ti, a mí.",
  },
  {
    id: "por-eso",
    prep: "por",
    use: "causa",
    before: "Perdí el autobús, ",
    after: " eso llegué tarde.",
    pt: "Perdi o ônibus, por isso cheguei atrasado.",
    why: "por eso = por isso.",
  },
  {
    id: "para-mi",
    prep: "para",
    use: "opinião",
    before: "",
    after: " mí, este café es el mejor.",
    pt: "Para mim, este café é o melhor.",
    why: "Opinião: para mí.",
  },
];

const ALIASES: Partial<Record<PrepId, string[]>> = {
  al: ["a el"],
  del: ["de el"],
  según: ["segun"],
};

export function getPrep(id: PrepId): PrepMeta {
  const found = PREPOSITIONS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown preposition: ${id}`);
  return found;
}

export function promptsForPrep(filter: PrepId | PrepGroupId | "all"): PrepPrompt[] {
  if (filter === "all") return PREP_PROMPTS;
  const group = PREP_GROUPS.find((item) => item.id === filter);
  if (group) return PREP_PROMPTS.filter((item) => getPrep(item.prep).group === filter);
  return PREP_PROMPTS.filter((item) => item.prep === filter);
}

export function prepStats(list: PrepPrompt[] = PREP_PROMPTS): { count: number; preps: number } {
  return { count: list.length, preps: new Set(list.map((item) => item.prep)).size };
}

export function checkPrep(prompt: PrepPrompt, raw: string): CheckResult {
  const expected = prompt.prep;
  const accepted = [expected, ...(prompt.aliases ?? []), ...(ALIASES[expected] ?? [])].map(normalizeAnswer);
  const given = normalizeAnswer(raw);
  if (!given) return { ok: false, expected, accentOnly: false };
  if (accepted.includes(given)) return { ok: true, expected, accentOnly: false };
  const givenPlain = stripDiacritics(given);
  if (accepted.some((item) => stripDiacritics(item) === givenPlain)) {
    return { ok: true, expected, accentOnly: true };
  }
  return { ok: false, expected, accentOnly: false };
}
