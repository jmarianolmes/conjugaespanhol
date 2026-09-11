import { normalizeAnswer, stripDiacritics } from "./conjugate";
import type { CheckResult } from "./types";

export type VocabKind =
  | "falso"
  | "casa"
  | "rua"
  | "comida"
  | "ropa"
  | "jerga"
  | "verbo";

export interface VocabEntry {
  id: string;
  es: string;
  pt: string;
  kind: VocabKind;
  before: string;
  after: string;
  phrasePt: string;
  aliases?: string[];
  trap?: string;
  why?: string;
}

export interface SerEstarPrompt {
  id: string;
  fill: string;
  family: "ser" | "estar";
  use: string;
  before: string;
  after: string;
  pt: string;
  why: string;
  aliases?: string[];
}

function v(
  es: string,
  pt: string,
  kind: VocabKind,
  before: string,
  after: string,
  phrasePt: string,
  extra: { aliases?: string[]; trap?: string; why?: string } = {},
): VocabEntry {
  return { id: es, es, pt, kind, before, after, phrasePt, ...extra };
}

export const VOCAB_KINDS: { id: VocabKind; label: string }[] = [
  { id: "falso", label: "Falsos amigos" },
  { id: "casa", label: "Casa e objetos" },
  { id: "rua", label: "Rua e cidade" },
  { id: "comida", label: "Comida" },
  { id: "ropa", label: "Roupa" },
  { id: "jerga", label: "Gíria da Espanha" },
  { id: "verbo", label: "Verbos traiçoeiros" },
];

export const VOCAB: VocabEntry[] = [
  v("embarazada", "grávida", "falso", "María está ", ".", "A María está grávida.", {
    aliases: ["gravida"],
    trap: "não é embaraçada",
    why: "embaraçada = avergonzada / en un lío.",
  }),
  v("exquisito", "delicioso", "falso", "Este jamón está ", ".", "Este presunto está delicioso.", {
    aliases: ["refinado", "saboroso", "gostoso"],
    trap: "não é esquisito",
    why: "esquisito = raro / extraño.",
  }),
  v("vaso", "copo", "falso", "Quiero un ", " de agua.", "Quero um copo de água.", {
    trap: "não é o vaso de planta",
    why: "vaso de planta = maceta.",
  }),
  v("silla", "cadeira", "falso", "Siéntate en esa ", ".", "Senta-te nessa cadeira.", {
    trap: "cadera é quadril",
  }),
  v("cadera", "quadril", "falso", "Me duele la ", ".", "Dói-me o quadril.", {
    trap: "não é cadeira",
  }),
  v("oficina", "escritório", "falso", "Trabajo en una ", ".", "Trabalho num escritório.", {
    trap: "oficina mecânica = taller",
  }),
  v("taller", "oficina", "falso", "Llevo el coche al ", ".", "Levo o carro à oficina.", {
    aliases: ["oficina mecanica", "oficina mecânica"],
  }),
  v("éxito", "sucesso", "falso", "La peli fue un ", ".", "O filme foi um sucesso.", {
    aliases: ["exito"],
    trap: "suceso é acontecimento",
  }),
  v("suceso", "acontecimento", "falso", "Fue un ", " extraño.", "Foi um acontecimento estranho.", {
    aliases: ["ocorrido", "evento"],
    trap: "sucesso = éxito",
  }),
  v("largo", "comprido", "falso", "El pasillo es muy ", ".", "O corredor é muito comprido.", {
    aliases: ["longo"],
    trap: "largo em português = ancho",
  }),
  v("ancho", "largo", "falso", "La calle es ", ".", "A rua é larga.", {
    trap: "largo em espanhol é comprido",
  }),
  v("rato", "momento", "falso", "Espera un ", ".", "Espera um momento.", {
    aliases: ["instante", "tempo"],
    trap: "o animal é ratón",
  }),
  v("ratón", "rato", "falso", "Hay un ", " en la cocina.", "Há um rato na cozinha.", {
    aliases: ["mouse", "rato do computador"],
    trap: "rato em espanhol é um instante",
  }),
  v("ropa", "roupa", "falso", "Lavo la ", " los lunes.", "Lavo a roupa às segundas.", {
    trap: "não é corda; corda = cuerda",
  }),
  v("goma", "borracha", "falso", "¿Tienes una ", " para borrar?", "Tens uma borracha para apagar?", {
    aliases: ["borracha de apagar"],
    trap: "borracho é bêbado",
  }),
  v("borracho", "bêbado", "falso", "Salió ", " del bar.", "Saiu bêbado do bar.", {
    aliases: ["bebado", "bêbedo"],
  }),
  v("apellido", "sobrenome", "falso", "Mi ", " es López.", "Meu sobrenome é López.", {
    trap: "não é apelido; apelido = apodo / mote",
  }),
  v("apodo", "apelido", "falso", "Su ", " es Tito.", "O apelido dele é Tito.", {
    aliases: ["alcunha", "mote"],
  }),
  v("extrañar", "sentir saudade", "verbo", "Te voy a ", ".", "Vou sentir saudades de ti.", {
    aliases: ["saudade", "sentir saudades", "sentir falta"],
    trap: "não é estranhar; estranhar = extrañar em alguns sítios, mas o comum é echar de menos",
  }),
  v("jamón", "presunto", "falso", "Un bocadillo de ", ", por favor.", "Um sanduíche de presunto, por favor.", {
    aliases: ["jamon", "presunto cru"],
    trap: "presunto em espanhol é 'presunto' só no sentido de presumido",
  }),
  v("propina", "gorjeta", "falso", "¿Dejamos ", "?", "Deixamos gorjeta?", {
    trap: "propina de suborno = soborno",
  }),
  v("constipado", "resfriado", "falso", "Estoy ", ", no salgo.", "Estou resfriado, não saio.", {
    aliases: ["constipação", "gripe leve", "resfriado"],
    trap: "prisão de ventre = estreñido",
  }),
  v("estreñido", "constipado", "falso", "Llevo tres días ", ".", "Levo três dias constipado.", {
    aliases: ["prisao de ventre", "prisão de ventre"],
  }),
  v("listo", "pronto", "falso", "¿Estás ", "? Nos vamos.", "Estás pronto? Vamos embora.", {
    aliases: ["esperto", "inteligente"],
    trap: "estar listo = pronto; ser listo = esperto",
  }),
  v("sensible", "sensível", "falso", "Es muy ", " al frío.", "É muito sensível ao frio.", {
    trap: "sensato = sensato / cuerdo",
  }),
  v("firma", "assinatura", "falso", "Pon tu ", " aquí.", "Põe a tua assinatura aqui.", {
    aliases: ["empresa"],
    trap: "firma também é empresa; assinar = firmar",
  }),
  v("carpeta", "pasta", "falso", "Guarda los papeles en la ", ".", "Guarda os papéis na pasta.", {
    trap: "pasta de dentes = pasta de dientes; massa = pasta",
  }),
  v("ensalada", "salada", "falso", "De primero, una ", ".", "De entrada, uma salada.", {
    trap: "salada (com sal) = salada, mas o prato é ensalada",
  }),
  v("taza", "xícara", "falso", "Una ", " de café.", "Uma xícara de café.", {
    aliases: ["chávena", "xicara"],
  }),
  v("copa", "taça", "falso", "Una ", " de vino.", "Uma taça de vinho.", {
    aliases: ["taca"],
  }),
  v("plato", "prato", "falso", "Pone otro ", ".", "Põe outro prato.", {}),
  v("tenedor", "garfo", "comida", "No hay ", " en la mesa.", "Não há garfo na mesa.", {}),
  v("cuchara", "colher", "comida", "Necesito una ", " para la sopa.", "Preciso de uma colher para a sopa.", {}),
  v("cuchillo", "faca", "comida", "Este ", " no corta.", "Esta faca não corta.", {}),
  v("enchufe", "tomada", "casa", "El ", " no funciona.", "A tomada não funciona.", {
    aliases: ["plugue"],
  }),
  v("enchufar", "ligar na tomada", "verbo", "¿Puedes ", " el cargador?", "Podes ligar o carregador na tomada?", {
    aliases: ["conectar", "plugar", "conectar na tomada"],
    why: "também: colocar alguém num emprego por amizade.",
  }),
  v("grifo", "torneira", "casa", "Cierra el ", ".", "Fecha a torneira.", {
    aliases: ["torneira"],
  }),
  v("fregona", "rodo", "casa", "Pasa la ", " por el suelo.", "Passa o rodo no chão.", {
    aliases: ["mop", "vassoura de pano"],
  }),
  v("fregar", "lavar", "verbo", "Me toca ", " los platos.", "Cabe-me lavar a louça.", {
    aliases: ["esfregar", "lavar a louça", "lavar louça"],
  }),
  v("fregadero", "pia", "casa", "Deja los vasos en el ", ".", "Deixa os copos na pia.", {
    aliases: ["lava-louça", "lavalouça"],
  }),
  v("cubo", "balde", "casa", "Tira esto al ", " de basura.", "Joga isto no balde do lixo.", {
    aliases: ["lixo", "cesto"],
  }),
  v("basura", "lixo", "casa", "Saca la ", ".", "Tira o lixo.", {}),
  v("papelera", "lixeira", "casa", "Tíralo a la ", ".", "Joga na lixeira.", {
    aliases: ["cesto do lixo"],
  }),
  v("polvo", "poeira", "casa", "Hay mucho ", " en la estantería.", "Há muita poeira na estante.", {
    trap: "polvo do mar = pulpo",
  }),
  v("pulpo", "polvo", "comida", "En Galicia comen ", ".", "Na Galiza comem polvo.", {}),
  v("escoba", "vassoura", "casa", "¿Dónde está la ", "?", "Onde está a vassoura?", {}),
  v("almohada", "travesseiro", "casa", "Quiero otra ", ".", "Quero outro travesseiro.", {
    aliases: ["almofada"],
    why: "em espanhol almohada é o do travesseiro; almofada do sofá = cojín.",
  }),
  v("cojín", "almofada", "casa", "Tira el ", " al sofá.", "Joga a almofada no sofá.", {
    aliases: ["cojin"],
  }),
  v("sábana", "lençol", "casa", "Cambio la ", " hoy.", "Troco o lençol hoje.", {
    aliases: ["sabana", "lencol"],
  }),
  v("edredón", "edredom", "casa", "Hace frío, coge el ", ".", "Faz frio, pega o edredom.", {
    aliases: ["edredon", "edredão"],
  }),
  v("manta", "manta", "casa", "Ponte la ", ", hace frío.", "Põe a manta, faz frio.", {}),
  v("despertador", "despertador", "casa", "El ", " suena a las siete.", "O despertador toca às sete.", {}),
  v("nevera", "geladeira", "casa", "La leche está en la ", ".", "O leite está na geladeira.", {
    aliases: ["frigorifico", "frigorífico", "refrigerador"],
  }),
  v("horno", "forno", "casa", "Mete la pizza al ", ".", "Mete a pizza no forno.", {}),
  v("sartén", "frigideira", "casa", "Calienta el aceite en la ", ".", "Aquece o azeite na frigideira.", {
    aliases: ["sarten"],
  }),
  v("lavadora", "máquina de lavar", "casa", "Pon la ropa en la ", ".", "Põe a roupa na máquina de lavar.", {
    aliases: ["maquina de lavar", "máquina"],
  }),
  v("plancha", "ferro de passar", "casa", "Pasa la ", " a la camisa.", "Passa o ferro na camisa.", {
    aliases: ["ferro"],
  }),
  v("percha", "cabide", "casa", "Cuelga el abrigo en la ", ".", "Pende o casaco no cabide.", {
    aliases: ["gancho"],
  }),
  v("armario", "guarda-roupa", "casa", "La ropa está en el ", ".", "A roupa está no guarda-roupa.", {
    aliases: ["armário", "guarda roupa", "roupeiro"],
  }),
  v("cajón", "gaveta", "casa", "Las llaves están en el ", ".", "As chaves estão na gaveta.", {
    aliases: ["cajon"],
  }),
  v("portal", "hall", "casa", "Te espero en el ", ".", "Espero-te no hall do prédio.", {
    aliases: ["entrada", "entrada do predio", "entrada do prédio"],
  }),
  v("timbre", "campainha", "casa", "Toca el ", ".", "Toca a campainha.", {}),
  v("ascensor", "elevador", "casa", "Subimos en el ", ".", "Subimos no elevador.", {}),
  v("acera", "calçada", "rua", "Camina por la ", ".", "Anda pela calçada.", {
    aliases: ["calcada", "passeio"],
  }),
  v("semáforo", "semáforo", "rua", "Párate en el ", ".", "Para no semáforo.", {
    aliases: ["semaforo", "sinal"],
  }),
  v("farola", "poste", "rua", "La ", " no alumbra.", "O poste não alumia.", {
    aliases: ["poste de luz", "luminária"],
  }),
  v("atasco", "engarrafamento", "rua", "Hay un ", " enorme.", "Há um engarrafamento enorme.", {
    aliases: ["congestionamento", "trânsito parado", "transito"],
  }),
  v("rotonda", "rotunda", "rua", "Sal en la tercera ", ".", "Sai na terceira rotunda.", {
    aliases: ["rotatória", "rotatoria"],
  }),
  v("andén", "plataforma", "rua", "El tren sale del ", " tres.", "O comboio sai da plataforma três.", {
    aliases: ["anden", "plataforma da estação"],
  }),
  v("billete", "passagem", "rua", "¿Tienes el ", " de tren?", "Tens a passagem de comboio?", {
    aliases: ["bilhete", "nota", "cédula"],
    why: "billete também é nota de dinheiro.",
  }),
  v("monedero", "porta-moedas", "rua", "No encuentro el ", ".", "Não encontro o porta-moedas.", {
    aliases: ["porta moedas", "carteira de moedas"],
  }),
  v("cartera", "carteira", "rua", "Dejé la ", " en casa.", "Deixei a carteira em casa.", {
    aliases: ["bolsa"],
  }),
  v("mochila", "mochila", "rua", "Llevo la ", " al trabajo.", "Levo a mochila ao trabalho.", {}),
  v("maleta", "mala", "rua", "Hago la ", " para el viaje.", "Faço a mala para a viagem.", {}),
  v("bolso", "bolsa", "ropa", "Coge el ", ", nos vamos.", "Pega a bolsa, vamos.", {}),
  v("chaqueta", "casaco", "ropa", "Ponte la ", ", hace viento.", "Põe o casaco, faz vento.", {
    aliases: ["jaqueta", "blazer"],
  }),
  v("abrigo", "sobretudo", "ropa", "En invierno llevo ", ".", "No inverno levo sobretudo.", {
    aliases: ["casaco pesado", "casaco de inverno"],
  }),
  v("bufanda", "cachecol", "ropa", "Ponte la ", ".", "Põe o cachecol.", {
    aliases: ["echarpe", "lenço de pescoço"],
  }),
  v("calcetines", "meias", "ropa", "No encuentro los ", ".", "Não encontro as meias.", {
    aliases: ["meia"],
  }),
  v("zapatillas", "tênis", "ropa", "Salgo con las ", ".", "Saio com o tênis.", {
    aliases: ["tenis", "sapatilhas", "pantufas", "chinelos de casa"],
    why: "também são as pantufas de casa.",
  }),
  v("chanclas", "chinelos", "ropa", "En la playa voy con ", ".", "Na praia vou de chinelos.", {
    aliases: ["chinelo", "sandálias"],
  }),
  v("jersey", "suéter", "ropa", "Este ", " pica.", "Este suéter pica.", {
    aliases: ["sweater", "pulôver", "pulover", "camisola"],
  }),
  v("sudadera", "moletom", "ropa", "Llevo ", " para correr.", "Levo moletom para correr.", {
    aliases: ["casaco de fato de treino", "hoodie"],
  }),
  v("vaqueros", "jeans", "ropa", "Hoy voy de ", ".", "Hoje vou de jeans.", {
    aliases: ["calça jeans", "calcas jeans"],
  }),
  v("chándal", "fato de treino", "ropa", "En casa estoy de ", ".", "Em casa estou de fato de treino.", {
    aliases: ["chandal", "agasalho", "conjunto"],
  }),
  v("sujetador", "sutiã", "ropa", "Este ", " me queda pequeño.", "Este sutiã fica-me pequeno.", {
    aliases: ["sutia", "soutien"],
  }),
  v("bragas", "calcinha", "ropa", "Compré ", " nuevas.", "Comprei calcinhas novas.", {
    aliases: ["cueca feminina", "calcinhas"],
  }),
  v("chaval", "garoto", "jerga", "Ese ", " es muy majo.", "Esse garoto é muito simpático.", {
    aliases: ["miudo", "miúdo", "rapaz", "moleque", "guri"],
  }),
  v("chavales", "garotos", "jerga", "Los ", " están en el parque.", "Os garotos estão no parque.", {
    aliases: ["miudos", "miúdos", "rapazes"],
  }),
  v("chavón", "cara", "jerga", "Ese ", " no para de hablar.", "Esse cara não para de falar.", {
    aliases: ["chavon", "tipo", "cara", "gajo"],
    why: "mais América; na Espanha o comum é chaval / tío.",
  }),
  v("tío", "cara", "jerga", "¡", ", qué calor!", "Cara, que calor!", {
    aliases: ["tio", "gajo", "mano"],
    why: "tío/tía = cara, na conversa da Espanha. Também é tio de família.",
  }),
  v("mola", "é legal", "jerga", "Esta canción ", " mucho.", "Esta canção é muito legal.", {
    aliases: ["e legal", "é fixe", "é da hora", "é bom", "curti"],
  }),
  v("molar", "curtir", "verbo", "Me ", " este bar.", "Curto este bar.", {
    aliases: ["agradar", "ser legal", "ir a", "cair bem"],
  }),
  v("guay", "legal", "jerga", "Qué ", " tu casa.", "Que legal a tua casa.", {
    aliases: ["fixe", "bacana", "da hora"],
  }),
  v("vale", "ok", "jerga", "—¿Quedamos a las ocho? —", ".", "Marcamos às oito? Ok.", {
    aliases: ["ok", "tá", "ta", "está bem", "combinado"],
  }),
  v("currar", "trabalhar", "jerga", "Mañana me toca ", ".", "Amanhã cabe-me trabalhar.", {
    aliases: ["trabajar", "labutar"],
  }),
  v("curro", "trabalho", "jerga", "Salgo del ", " a las seis.", "Saio do trabalho às seis.", {
    aliases: ["trampo", "emprego", "serviço"],
  }),
  v("pasta", "grana", "jerga", "No tengo ", " este mes.", "Não tenho grana este mês.", {
    aliases: ["dinheiro", "dinheiro", "massa", "bufunfa"],
    trap: "pasta também é massa (macarrão) e pasta de dentes",
  }),
  v("peli", "filme", "jerga", "Vamos a ver una ", ".", "Vamos ver um filme.", {
    aliases: ["película", "pelicula"],
  }),
  v("finde", "fim de semana", "jerga", "Este ", " me voy a la playa.", "Este fim de semana vou à praia.", {
    aliases: ["fim-de-semana", "weekend"],
  }),
  v("caña", "chope", "jerga", "Una ", ", por favor.", "Um chope, por favor.", {
    aliases: ["cerveja pequena", "caneca"],
    why: "na Espanha, copo pequeno de cerveja de barril.",
  }),
  v("tapa", "petisco", "comida", "Pedimos unas ", "s.", "Pedimos uns petiscos.", {
    aliases: ["tira-gosto", "petiscos", "entrada"],
  }),
  v("ración", "porção", "comida", "Una ", " de patatas.", "Uma porção de batatas.", {
    aliases: ["racao", "porção para partilhar"],
  }),
  v("bocadillo", "sanduíche", "comida", "Un ", " de jamón.", "Um sanduíche de presunto.", {
    aliases: ["sanduiche", "lanche"],
  }),
  v("zumo", "suco", "comida", "Un ", " de naranja.", "Um suco de laranja.", {
    aliases: ["sumo", "sumo de laranja"],
    why: "Espanha: zumo. América: jugo.",
  }),
  v("ordenador", "computador", "casa", "El ", " está lento.", "O computador está lento.", {
    aliases: ["computador", "pc", "computadora"],
    why: "Espanha: ordenador. América: computadora.",
  }),
  v("móvil", "celular", "casa", "¿Has visto mi ", "?", "Viste o meu celular?", {
    aliases: ["movil", "telemóvel", "telemovel", "telefone"],
    why: "Espanha: móvil. América: celular.",
  }),
  v("piso", "apartamento", "casa", "Alquilo un ", " en el centro.", "Alugo um apartamento no centro.", {
    aliases: ["apartamento", "flat"],
    trap: "piso também é andar (o terceiro piso)",
  }),
  v("baño", "banheiro", "casa", "¿Dónde está el ", "?", "Onde é o banheiro?", {
    aliases: ["casa de banho", "wc", "toalete"],
  }),
  v("ducha", "chuveiro", "casa", "Me doy una ", ".", "Tomo um chuveiro.", {
    aliases: ["duche", "banho"],
  }),
  v("bañera", "banheira", "casa", "El niño está en la ", ".", "A criança está na banheira.", {
    aliases: ["banera"],
  }),
  v("toalla", "toalha", "casa", "Coge una ", " limpia.", "Pega uma toalha limpa.", {}),
  v("jabón", "sabonete", "casa", "No queda ", ".", "Não resta sabonete.", {
    aliases: ["jabon", "sabão"],
  }),
  v("cargador", "carregador", "casa", "¿Me dejas el ", "?", "Emprestas-me o carregador?", {}),
  v("pila", "pilha", "casa", "El mando no tiene ", ".", "O comando não tem pilha.", {
    aliases: ["bateria", "bateria"],
  }),
  v("mando", "controle", "casa", "¿Dónde está el ", " de la tele?", "Onde está o controle da TV?", {
    aliases: ["comando", "controle remoto", "comando da tv"],
  }),
  v("pantalla", "tela", "casa", "La ", " se ha roto.", "A tela partiu-se.", {
    aliases: ["ecrã", "ecra"],
  }),
  v("teclado", "teclado", "casa", "Escribo mal con este ", ".", "Escrevo mal com este teclado.", {}),
  v("bolígrafo", "caneta", "casa", "¿Tienes un ", "?", "Tens uma caneta?", {
    aliases: ["boligrafo", "esferográfica", "caneta esferográfica"],
  }),
  v("folio", "folha", "casa", "Imprime otro ", ".", "Imprime outra folha.", {
    aliases: ["folha de papel", "sulfite"],
  }),
  v("apuntes", "anotações", "casa", "Copié los ", " de clase.", "Copiei as anotações da aula.", {
    aliases: ["apontamentos", "notas"],
  }),
  v("quedar", "marcar de se ver", "verbo", "¿Quieres ", " mañana?", "Queres marcar de nos ver amanhã?", {
    aliases: ["encontrar", "marcar", "encontrar-se", "sair com"],
    why: "quedar com alguém = combinar um encontro.",
  }),
  v("echar de menos", "sentir saudade", "verbo", "Voy a ", " a mi familia.", "Vou sentir saudades da minha família.", {
    aliases: ["saudade", "sentir falta", "sentir saudades"],
  }),
  v("madrugar", "acordar cedo", "verbo", "Mañana tengo que ", ".", "Amanhã tenho de acordar cedo.", {
    aliases: ["levantar cedo"],
  }),
  v("resaca", "ressaca", "jerga", "Tengo ", " de ayer.", "Tenho ressaca de ontem.", {}),
  v("cita", "consulta", "rua", "Tengo ", " con el médico.", "Tenho consulta com o médico.", {
    aliases: ["encontro", "hora marcada"],
    why: "cita médica = consulta; cita con alguien = encontro.",
  }),
  v("turno", "senha", "rua", "Coge ", " en recepción.", "Pega senha na receção.", {
    aliases: ["ficha", "vez", "número"],
  }),
  v("cola", "fila", "rua", "Hay mucha ", " en el banco.", "Há muita fila no banco.", {
    aliases: ["bicha", "fila de espera"],
    trap: "cola também é rabo e cola (adesivo)",
  }),
  v("sueldo", "salário", "rua", "El ", " llega el viernes.", "O salário chega na sexta.", {
    aliases: ["salario", "ordenado"],
  }),
  v("paro", "desemprego", "rua", "Lleva un año en el ", ".", "Leva um ano no desemprego.", {
    aliases: ["desemprego", "desempregado"],
  }),
  v("guante", "luva", "ropa", "Ponte un ", ", hace frío.", "Põe uma luva, faz frio.", {
    aliases: ["luvas"],
  }),
  v("gorro", "gorro", "ropa", "El ", " de lana pica.", "O gorro de lã pica.", {
    aliases: ["touca", "chapéu de lã"],
  }),
  v("cinturón", "cinto", "ropa", "Este ", " me queda grande.", "Este cinto fica-me grande.", {
    aliases: ["cinturao", "cinto"],
  }),
  v("cremallera", "zíper", "ropa", "La ", " se ha atascado.", "O zíper encravou.", {
    aliases: ["zipper", "fecho", "fecho éclair", "zíper"],
  }),
  v("bolsillo", "bolso", "ropa", "Tengo las llaves en el ", ".", "Tenho as chaves no bolso.", {}),
  v("aburrido", "entediado", "falso", "Hoy estoy ", ".", "Hoje estou entediado.", {
    aliases: ["chato", "entediante", "maçante"],
    trap: "estar aburrido = entediado; ser aburrido = ser chato",
    why: "a troca ser/estar muda tudo.",
  }),
  v("pesado", "chato", "falso", "No seas ", ".", "Não sejas chato.", {
    aliases: ["entediante", "maçador"],
  }),
  v("majo", "simpático", "jerga", "Es un chico ", ".", "É um rapaz simpático.", {
    aliases: ["agradavel", "agradável", "gentil"],
  }),
  v("flipar", "pirar", "jerga", "Vas a ", " con este sitio.", "Vais pirar com este sítio.", {
    aliases: ["pirar", "ficar louco", "surreal", "alucinar"],
  }),
  v("pringado", "otário", "jerga", "Siempre me toca a mí, qué ", ".", "Sempre me calha a mim, que otário.", {
    aliases: ["otario", "trouxa", "azarado"],
  }),
  v("coche", "carro", "rua", "Aparco el ", " abajo.", "Estaciono o carro embaixo.", {
    aliases: ["automóvel", "auto"],
  }),
  v("aparcar", "estacionar", "verbo", "No se puede ", " aquí.", "Não se pode estacionar aqui.", {
    aliases: ["estacionar", "aparcar o carro"],
  }),
  v("gasolina", "gasolina", "rua", "La ", " está cara.", "A gasolina está cara.", {}),
  v("conductores", "motoristas", "rua", "Los ", " pitan mucho.", "Os motoristas buzinam muito.", {
    aliases: ["condutores"],
  }),
  v("claxon", "buzina", "rua", "Toca el ", ".", "Toca a buzina.", {
    aliases: ["buzina"],
  }),
  v("maletero", "porta-malas", "rua", "La maleta va en el ", ".", "A mala vai no porta-malas.", {
    aliases: ["porta malas", "bagageira"],
  }),
  v("volante", "volante", "rua", "Sujeta el ", ".", "Segura o volante.", {}),
  v("rueda", "roda", "rua", "Se ha pinchado una ", ".", "Furou uma roda.", {
    aliases: ["pneu"],
  }),
  v("atascarse", "entupir", "verbo", "Se ha ", " el fregadero.", "A pia entupiu.", {
    aliases: ["entupir", "encravar", "ficar preso"],
  }),
  v("recado", "recado", "rua", "Te dejé un ", ".", "Deixei-te um recado.", {
    aliases: ["mensagem", "aviso"],
  }),
  v("factura", "conta", "rua", "Pide la ", ", por favor.", "Pede a conta, por favor.", {
    aliases: ["nota fiscal", "fatura"],
  }),
  v("ticket", "comprovante", "rua", "Guarda el ", " del super.", "Guarda o comprovante do supermercado.", {
    aliases: ["talão", "cupom", "recibo"],
  }),
  v("cambio", "troco", "rua", "Quédate con el ", ".", "Fica com o troco.", {
    aliases: ["troco"],
  }),
  v("retraso", "atraso", "rua", "El tren lleva ", ".", "O comboio leva atraso.", {
    aliases: ["atraso"],
  }),
  v("horario", "horário", "rua", "Mira el ", " del metro.", "Olha o horário do metrô.", {
    aliases: ["horario"],
  }),
  v("despertarse", "acordar", "verbo", "Tengo que ", " a las siete.", "Tenho de acordar às sete.", {
    aliases: ["acordar", "despertar"],
    trap: "acordarse = lembrar-se",
  }),
  v("acordarse", "lembrar", "verbo", "No puedo ", " de su nombre.", "Não consigo lembrar o nome dele.", {
    aliases: ["lembrar-se", "lembrar"],
    trap: "acordar da cama = despertarse",
  }),
  v("hay", "há", "verbo", "", " pan en la mesa.", "Há pão na mesa.", {
    aliases: ["haver", "existe", "tem"],
    trap: "hay = há/existe, não é ter posse (tener)",
  }),
  v("coger", "pegar", "verbo", "¿Puedes ", " eso?", "Podes pegar isso?", {
    aliases: ["apanhar", "pegar"],
    why: "na Espanha é o verbo normal para pegar. Na América pode soar mal.",
  }),
  v("tirar", "jogar fora", "verbo", "Tengo que ", " esto a la basura.", "Tenho de jogar isto no lixo.", {
    aliases: ["deitar fora", "jogar", "largar"],
  }),
  v("sacar", "tirar", "verbo", "Voy a ", " la basura.", "Vou tirar o lixo.", {
    aliases: ["retirar", "tirar para fora"],
  }),
  v("poner", "pôr", "verbo", "¿Puedes ", " la mesa?", "Podes pôr a mesa?", {
    aliases: ["por", "colocar"],
  }),
  v("quitar", "tirar", "verbo", "¿Puedes ", " los platos?", "Podes tirar os pratos?", {
    aliases: ["remover", "retirar"],
  }),
  v("guardar", "guardar", "verbo", "Hay que ", " la leche.", "É preciso guardar o leite.", {}),
  v("llegar", "chegar", "verbo", "Voy a ", " tarde al curro.", "Vou chegar tarde ao trabalho.", {}),
  v("marcharse", "ir embora", "verbo", "Me voy a ", ".", "Vou-me embora.", {
    aliases: ["partir", "sair", "ir embora"],
  }),
];

export const SER_ESTAR: SerEstarPrompt[] = [
  {
    id: "soy-profesor",
    fill: "soy",
    family: "ser",
    use: "profissão",
    before: "Yo ",
    after: " profesor.",
    pt: "Eu sou professor.",
    why: "Identidade e profissão: ser.",
  },
  {
    id: "estoy-casa",
    fill: "estoy",
    family: "estar",
    use: "lugar",
    before: "Hoy ",
    after: " en casa.",
    pt: "Hoje estou em casa.",
    why: "Localização de pessoa: estar.",
  },
  {
    id: "es-brasil",
    fill: "es",
    family: "ser",
    use: "origem",
    before: "Ella ",
    after: " de Brasil.",
    pt: "Ela é do Brasil.",
    why: "Origem: ser de.",
  },
  {
    id: "esta-madrid",
    fill: "está",
    family: "estar",
    use: "lugar",
    before: "Ahora ella ",
    after: " en Madrid.",
    pt: "Agora ela está em Madrid.",
    why: "Onde está agora: estar.",
    aliases: ["esta"],
  },
  {
    id: "es-lunes",
    fill: "es",
    family: "ser",
    use: "tempo",
    before: "Hoy ",
    after: " lunes.",
    pt: "Hoje é segunda.",
    why: "Data e hora: ser.",
  },
  {
    id: "son-tres",
    fill: "son",
    family: "ser",
    use: "tempo",
    before: "Ya ",
    after: " las tres.",
    pt: "Já são três horas.",
    why: "Horas: ser (son las…).",
  },
  {
    id: "esta-cansado",
    fill: "está",
    family: "estar",
    use: "estado",
    before: "Juan ",
    after: " cansado.",
    pt: "O Juan está cansado.",
    why: "Estado temporário: estar.",
    aliases: ["esta"],
  },
  {
    id: "es-alto",
    fill: "es",
    family: "ser",
    use: "caráter",
    before: "Juan ",
    after: " alto.",
    pt: "O Juan é alto.",
    why: "Característica da pessoa: ser.",
  },
  {
    id: "esta-aburrido",
    fill: "está",
    family: "estar",
    use: "estado",
    before: "Hoy ",
    after: " aburrido.",
    pt: "Hoje está entediado.",
    why: "estar aburrido = entediado agora.",
    aliases: ["esta"],
  },
  {
    id: "es-aburrido",
    fill: "es",
    family: "ser",
    use: "caráter",
    before: "Este libro ",
    after: " aburrido.",
    pt: "Este livro é chato.",
    why: "ser aburrido = ser chato por natureza.",
  },
  {
    id: "esta-listo",
    fill: "estás",
    family: "estar",
    use: "estado",
    before: "¿Ya ",
    after: " listo? Nos vamos.",
    pt: "Já estás pronto? Vamos.",
    why: "estar listo = estar pronto.",
    aliases: ["estas", "está", "esta"],
  },
  {
    id: "es-listo",
    fill: "es",
    family: "ser",
    use: "caráter",
    before: "Ese chaval ",
    after: " muy listo.",
    pt: "Esse garoto é muito esperto.",
    why: "ser listo = ser esperto.",
  },
  {
    id: "esta-buena-sopa",
    fill: "está",
    family: "estar",
    use: "sabor",
    before: "La sopa ",
    after: " buena hoy.",
    pt: "A sopa está boa hoje.",
    why: "sabor desta vez: estar.",
    aliases: ["esta"],
  },
  {
    id: "es-buena-persona",
    fill: "es",
    family: "ser",
    use: "caráter",
    before: "Ana ",
    after: " buena persona.",
    pt: "A Ana é boa pessoa.",
    why: "qualidade permanente: ser.",
  },
  {
    id: "esta-abierta",
    fill: "está",
    family: "estar",
    use: "resultado",
    before: "La tienda ",
    after: " abierta.",
    pt: "A loja está aberta.",
    why: "estado resultante: estar.",
    aliases: ["esta"],
  },
  {
    id: "es-en-casa",
    fill: "es",
    family: "ser",
    use: "evento",
    before: "La fiesta ",
    after: " en mi casa.",
    pt: "A festa é na minha casa.",
    why: "onde o evento acontece: ser.",
  },
  {
    id: "estamos-enfermos",
    fill: "estamos",
    family: "estar",
    use: "estado",
    before: "Hoy ",
    after: " enfermos.",
    pt: "Hoje estamos doentes.",
    why: "saúde agora: estar.",
  },
  {
    id: "somos-hermanos",
    fill: "somos",
    family: "ser",
    use: "identidade",
    before: "Nosotros ",
    after: " hermanos.",
    pt: "Nós somos irmãos.",
    why: "relação / identidade: ser.",
  },
  {
    id: "estan-casados",
    fill: "están",
    family: "estar",
    use: "estado",
    before: "Ellos ",
    after: " casados.",
    pt: "Eles estão casados.",
    why: "estado civil em espanhol: estar casado.",
    aliases: ["estan"],
  },
  {
    id: "es-madera",
    fill: "es",
    family: "ser",
    use: "material",
    before: "La mesa ",
    after: " de madera.",
    pt: "A mesa é de madeira.",
    why: "material: ser de.",
  },
  {
    id: "esta-caliente",
    fill: "está",
    family: "estar",
    use: "estado",
    before: "El café ",
    after: " caliente.",
    pt: "O café está quente.",
    why: "temperatura agora: estar.",
    aliases: ["esta"],
  },
  {
    id: "es-medico",
    fill: "es",
    family: "ser",
    use: "profissão",
    before: "Mi hermana ",
    after: " médica.",
    pt: "Minha irmã é médica.",
    why: "profissão: ser.",
  },
  {
    id: "estoy-comiendo",
    fill: "estoy",
    family: "estar",
    use: "gerúndio",
    before: "Ahora ",
    after: " comiendo.",
    pt: "Agora estou a comer.",
    why: "estar + gerúndio: ação em curso.",
  },
  {
    id: "son-de-ana",
    fill: "son",
    family: "ser",
    use: "posse",
    before: "Estas llaves ",
    after: " de Ana.",
    pt: "Estas chaves são da Ana.",
    why: "posse: ser de.",
  },
  {
    id: "esta-sucio",
    fill: "está",
    family: "estar",
    use: "estado",
    before: "El baño ",
    after: " sucio.",
    pt: "O banheiro está sujo.",
    why: "estado da coisa agora: estar.",
    aliases: ["esta"],
  },
  {
    id: "es-rojo",
    fill: "es",
    family: "ser",
    use: "caráter",
    before: "Mi coche ",
    after: " rojo.",
    pt: "Meu carro é vermelho.",
    why: "cor permanente: ser.",
  },
  {
    id: "esta-vivo",
    fill: "está",
    family: "estar",
    use: "estado",
    before: "¡Tranquilo, el gato ",
    after: " vivo!",
    pt: "Calma, o gato está vivo!",
    why: "estar vivo = não está morto. ser vivo = ser esperto/vivo.",
    aliases: ["esta"],
  },
  {
    id: "es-vivo",
    fill: "es",
    family: "ser",
    use: "caráter",
    before: "Ese tío ",
    after: " muy vivo.",
    pt: "Esse cara é muito esperto.",
    why: "ser vivo = ser vivo/esperto.",
  },
  {
    id: "estamos-lejos",
    fill: "estamos",
    family: "estar",
    use: "lugar",
    before: "Todavía ",
    after: " lejos.",
    pt: "Ainda estamos longe.",
    why: "distância agora: estar.",
  },
  {
    id: "es-tarde",
    fill: "es",
    family: "ser",
    use: "tempo",
    before: "Ya ",
    after: " tarde para llamar.",
    pt: "Já é tarde para ligar.",
    why: "é tarde / é cedo: ser.",
  },
];

export type VocabFilter = VocabKind | "all" | "ser-estar";

function foldPt(value: string): string {
  return stripDiacritics(normalizeAnswer(value))
    .replace(/^(o|a|os|as|um|uma|uns|umas)\s+/u, "")
    .replace(/[^\p{L}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function vocabFor(filter: VocabFilter): VocabEntry[] {
  if (filter === "all" || filter === "ser-estar") return VOCAB;
  return VOCAB.filter((item) => item.kind === filter);
}

export function checkMeaning(entry: VocabEntry, raw: string): CheckResult {
  const accepted = [entry.pt, ...(entry.aliases ?? [])].map(foldPt);
  const given = foldPt(raw);
  if (!given) return { ok: false, expected: entry.pt, accentOnly: false };
  if (accepted.includes(given) || accepted.some((item) => item.includes(given) && given.length >= 4)) {
    return { ok: true, expected: entry.pt, accentOnly: false };
  }
  return { ok: false, expected: entry.pt, accentOnly: false };
}

export function checkVocabPhrase(entry: VocabEntry, raw: string): CheckResult {
  const expected = entry.es;
  const given = stripDiacritics(normalizeAnswer(raw));
  const target = stripDiacritics(normalizeAnswer(expected));
  if (!given) return { ok: false, expected, accentOnly: false };
  if (given === target) return { ok: true, expected, accentOnly: false };
  return { ok: false, expected, accentOnly: false };
}

export function checkSerEstar(prompt: SerEstarPrompt, raw: string): CheckResult {
  const expected = prompt.fill;
  const accepted = [expected, ...(prompt.aliases ?? [])].map((item) => stripDiacritics(normalizeAnswer(item)));
  const given = stripDiacritics(normalizeAnswer(raw));
  if (!given) return { ok: false, expected, accentOnly: false };
  if (accepted.includes(given)) return { ok: true, expected, accentOnly: false };
  return { ok: false, expected, accentOnly: false };
}

export function vocabStats(list: VocabEntry[] = VOCAB) {
  return { count: list.length, kinds: new Set(list.map((item) => item.kind)).size };
}
