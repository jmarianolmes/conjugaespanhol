export type ConnectorGroupId =
  | "tema"
  | "ideas"
  | "aclarar"
  | "ejemplos"
  | "opinar"
  | "posibilidad"
  | "oposicion"
  | "causa"
  | "consecuencia"
  | "reafirmar"
  | "resumir"
  | "concluir"
  | "ordenar";

export interface ConnectorGroup {
  id: ConnectorGroupId;
  title: string;
  description: string;
  items: string[];
}

export interface ConnectorPrompt {
  id: string;
  group: ConnectorGroupId;
  before: string;
  after: string;
  answers: string[];
  explanation: string;
}

/** Marcadores de discurso transcritos y organizados a partir de la lista del alumno. */
export const CONNECTOR_GROUPS: ConnectorGroup[] = [
  {
    id: "tema",
    title: "Introducir un tema",
    description: "Delimitan el asunto del que vamos a hablar.",
    items: ["En cuanto a…", "Respecto a…", "En relación con…", "A propósito de…", "A este respecto,"],
  },
  {
    id: "ideas",
    title: "Añadir ideas",
    description: "Añaden información o enlazan una idea con otra.",
    items: ["Además,", "Asimismo,", "No solo…, sino también…", "Así pues,", "Igualmente,"],
  },
  {
    id: "aclarar",
    title: "Aclarar o explicar",
    description: "Reformulan una idea para que resulte más clara.",
    items: ["Es decir,", "En otras palabras,", "Dicho de otro modo,", "Esto es,", "En otros términos,"],
  },
  {
    id: "ejemplos",
    title: "Dar ejemplos",
    description: "Concretan una explicación con casos particulares.",
    items: ["En concreto,", "En particular,", "En especial,", "Concretamente,", "Pongamos por caso…"],
  },
  {
    id: "opinar",
    title: "Opinar",
    description: "Presentan una valoración o un punto de vista.",
    items: ["En mi opinión,", "A mi modo de ver,", "A mi entender / parecer,", "A mi juicio,", "Yo soy de la opinión de que…"],
  },
  {
    id: "posibilidad",
    title: "Expresar posibilidad",
    description: "Indican que algo puede ocurrir o ser cierto.",
    items: ["Quizá(s)…", "Seguramente…", "Posiblemente…", "Probablemente…", "Pudiera ser que…", "Cabe la posibilidad de que…"],
  },
  {
    id: "oposicion",
    title: "Indicar oposición",
    description: "Marcan un contraste o una dificultad inesperada.",
    items: ["Aunque…", "Sin embargo,", "No obstante,", "A pesar de…", "Por el contrario,"],
  },
  {
    id: "causa",
    title: "Indicar causa",
    description: "Explican el motivo o la razón de algo.",
    items: ["Ya que…", "Puesto que…", "Dado que…", "Debido a…", "A causa de…"],
  },
  {
    id: "consecuencia",
    title: "Indicar consecuencia",
    description: "Introducen el resultado de una situación.",
    items: ["Por lo tanto,", "De modo / forma que…", "En consecuencia,", "Por consiguiente,", "Así las cosas,"],
  },
  {
    id: "reafirmar",
    title: "Reafirmar ideas",
    description: "Refuerzan o confirman una afirmación anterior.",
    items: ["Desde luego,", "Por supuesto,", "De hecho,", "En efecto,", "Después de todo,"],
  },
  {
    id: "resumir",
    title: "Resumir",
    description: "Condensan las ideas principales.",
    items: ["En resumen,", "En suma,", "Para resumir,", "Resumiendo,", "En resumidas cuentas,"],
  },
  {
    id: "concluir",
    title: "Concluir",
    description: "Señalan que el discurso o argumento llega a su cierre.",
    items: ["En conclusión,", "Para terminar / finalizar,", "En definitiva,", "En fin,", "A modo de conclusión,"],
  },
  {
    id: "ordenar",
    title: "Ordenar",
    description: "Organizan los puntos y la secuencia de una exposición.",
    items: ["En primer / segundo / tercer lugar,", "Por un lado / por otro lado,", "Por una parte / por otra parte,", "Para empezar,", "Antes que nada,"],
  },
];

export const CONNECTOR_PROMPTS: ConnectorPrompt[] = [
  { id: "tema-1", group: "tema", before: "___ el transporte público, la ciudad ampliará las líneas de autobús.", after: "", answers: ["En cuanto a"], explanation: "Se introduce el asunto del transporte público." },
  { id: "tema-2", group: "tema", before: "___ el horario, prefiero que empecemos a las nueve.", after: "", answers: ["Respecto a", "En relación con", "A propósito de"], explanation: "El marcador abre un tema concreto: el horario." },
  { id: "ideas-1", group: "ideas", before: "La biblioteca es amplia; ___, abre también los fines de semana.", after: "", answers: ["Además", "Asimismo", "Igualmente"], explanation: "Se añade una característica más de la biblioteca." },
  { id: "ideas-2", group: "ideas", before: "La actividad no solo mejora la memoria, ___ ayuda a expresarse con más soltura.", after: "", answers: ["sino también"], explanation: "La estructura correlativa completa «no solo…, sino también…»." },
  { id: "aclarar-1", group: "aclarar", before: "El tren sale a las seis; ___, dentro de una hora.", after: "", answers: ["Es decir", "Esto es"], explanation: "La segunda parte expresa la misma información de forma más clara." },
  { id: "aclarar-2", group: "aclarar", before: "Debemos reducir los gastos; ___, gastar menos.", after: "", answers: ["En otras palabras", "Dicho de otro modo", "En otros términos"], explanation: "La idea se reformula con palabras más sencillas." },
  { id: "ejemplos-1", group: "ejemplos", before: "Algunas frutas, ___, la naranja y el limón, tienen mucha vitamina C.", after: "", answers: ["En concreto", "Concretamente"], explanation: "Se nombran casos concretos de frutas." },
  { id: "ejemplos-2", group: "ejemplos", before: "Me gustan las novelas, ___, las históricas.", after: "", answers: ["En especial", "En particular"], explanation: "Se destaca un tipo particular de novela." },
  { id: "opinar-1", group: "opinar", before: "___, aprender con ejemplos facilita la gramática.", after: "", answers: ["En mi opinión", "A mi modo de ver", "A mi entender", "A mi parecer", "A mi juicio"], explanation: "El marcador anuncia una opinión personal." },
  { id: "opinar-2", group: "opinar", before: "___, conviene escuchar todas las propuestas antes de decidir.", after: "", answers: ["A mi juicio", "A mi modo de ver", "En mi opinión", "A mi parecer"], explanation: "La frase presenta una valoración, no un dato objetivo." },
  { id: "posibilidad-1", group: "posibilidad", before: "___ mañana llueva, así que lleva un paraguas.", after: "", answers: ["Quizá", "Quizás", "Puede que", "Posiblemente", "Probablemente"], explanation: "Se expresa una posibilidad sobre el tiempo." },
  { id: "posibilidad-2", group: "posibilidad", before: "___ que el envío llegue hoy, aunque todavía no hay confirmación.", after: "", answers: ["Cabe la posibilidad de", "Existe la posibilidad de"], explanation: "La estructura correcta es «cabe la posibilidad de que…»." },
  { id: "oposicion-1", group: "oposicion", before: "El hotel era cómodo; ___, estaba lejos del centro.", after: "", answers: ["Sin embargo", "No obstante"], explanation: "La distancia contrasta con la comodidad del hotel." },
  { id: "oposicion-2", group: "oposicion", before: "___ estar cansada, terminó todo el trabajo.", after: "", answers: ["A pesar de"], explanation: "Se presenta una dificultad que no impidió terminar el trabajo." },
  { id: "causa-1", group: "causa", before: "Cancelamos el paseo ___ empezó a llover.", after: "", answers: ["ya que", "puesto que", "dado que"], explanation: "La lluvia explica la causa de cancelar el paseo." },
  { id: "causa-2", group: "causa", before: "La calle está cerrada ___ las obras.", after: "", answers: ["debido a", "a causa de"], explanation: "Las obras son el motivo del cierre." },
  { id: "consecuencia-1", group: "consecuencia", before: "No estudió lo suficiente; ___, no aprobó el examen.", after: "", answers: ["por lo tanto", "en consecuencia", "por consiguiente"], explanation: "No aprobar es el resultado de no estudiar." },
  { id: "consecuencia-2", group: "consecuencia", before: "Hacía mucho frío, ___ nos quedamos en casa.", after: "", answers: ["de modo que", "de forma que"], explanation: "Quedarse en casa es la consecuencia del frío." },
  { id: "reafirmar-1", group: "reafirmar", before: "No hace falta reservar; ___, la entrada es gratuita.", after: "", answers: ["de hecho", "en efecto", "desde luego"], explanation: "El segundo dato refuerza la afirmación anterior." },
  { id: "reafirmar-2", group: "reafirmar", before: "___, todos aprendimos algo de aquel error.", after: "", answers: ["Después de todo", "Por supuesto"], explanation: "Se confirma una idea que puede parecer inesperada." },
  { id: "resumir-1", group: "resumir", before: "___, practicar cada día ayuda a ganar confianza.", after: "", answers: ["En resumen", "En suma", "Para resumir", "Resumiendo", "En resumidas cuentas"], explanation: "La frase condensa la idea principal." },
  { id: "resumir-2", group: "resumir", before: "___, necesitamos más tiempo y menos distracciones.", after: "", answers: ["En suma", "En resumen", "En resumidas cuentas", "Resumiendo"], explanation: "Se sintetizan varias razones en una conclusión breve." },
  { id: "concluir-1", group: "concluir", before: "___, agradezco su atención y doy por terminada la presentación.", after: "", answers: ["Para terminar", "Para finalizar", "En conclusión", "A modo de conclusión"], explanation: "El marcador señala el cierre de la exposición." },
  { id: "concluir-2", group: "concluir", before: "___, el proyecto es viable si mantenemos este ritmo.", after: "", answers: ["En definitiva", "En conclusión", "En fin"], explanation: "Se formula la valoración final del argumento." },
  { id: "ordenar-1", group: "ordenar", before: "___, revisaremos el presupuesto; luego, el calendario.", after: "", answers: ["En primer lugar", "Para empezar", "Antes que nada"], explanation: "Se introduce el primer punto de una secuencia." },
  { id: "ordenar-2", group: "ordenar", before: "___, quisiera explicar el objetivo de la propuesta.", after: "", answers: ["Antes que nada", "Para empezar", "En primer lugar"], explanation: "Se anuncia el primer paso de la exposición." },
];
