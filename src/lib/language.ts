import { useEffect, useState } from "react";

export type Language = "pt" | "es";

const STORAGE_KEY = "conjuga-language";

export function languageFromNavigator(): Language {
  if (typeof navigator === "undefined") return "pt";
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "pt";
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("pt");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next: Language = saved === "pt" || saved === "es" ? saved : languageFromNavigator();
    setLanguageState(next);
    document.documentElement.lang = next === "es" ? "es" : "pt-BR";
    setIsReady(true);
  }, []);

  function setLanguage(next: Language) {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "es" ? "es" : "pt-BR";
  }

  return { language, setLanguage, isReady };
}

export const UI_TEXT = {
  pt: {
    appName: "Conjuga",
    tagline: "Aprenda espanhol praticando",
    practice: "Praticar",
    words: "Palavras",
    theory: "Teoria",
    progress: "Progresso",
    device: "neste aparelho",
    correct: "acerto",
    correctPlural: "acertos",
    verbs: "Verbos",
    phrases: "Frases",
    prep: "Prep.",
    chooseTense: "Escolha o tempo; o verbo abre em seguida.",
    tense: "Tempo verbal",
    verb: "Verbo",
    shuffle: "Sortear tempo e verbo",
    hint: "Dica",
    hide: "Ocultar",
    nextVerb: "Próximo verbo",
    continue: "Seguir",
    clear: "Limpar",
    languageLabel: "Idioma",
    autoLanguage: "detectado automaticamente",
  },
  es: {
    appName: "Conjuga",
    tagline: "Aprende español practicando",
    practice: "Practicar",
    words: "Palabras",
    theory: "Teoría",
    progress: "Progreso",
    device: "en este dispositivo",
    correct: "acierto",
    correctPlural: "aciertos",
    verbs: "Verbos",
    phrases: "Frases",
    prep: "Prep.",
    chooseTense: "Elige el tiempo; el verbo aparece después.",
    tense: "Tiempo verbal",
    verb: "Verbo",
    shuffle: "Elegir tiempo y verbo al azar",
    hint: "Pista",
    hide: "Ocultar",
    nextVerb: "Siguiente verbo",
    continue: "Continuar",
    clear: "Limpiar",
    languageLabel: "Idioma",
    autoLanguage: "detectado automáticamente",
  },
} as const;
