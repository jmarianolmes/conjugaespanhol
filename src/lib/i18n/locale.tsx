import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isLocale, LOCALE_OPTIONS, resolveLocale, type Locale } from "./types";

const STORAGE_KEY = "conjuga-locale-v2";
const LEGACY_KEY = "conjuga-locale";

interface LocaleState {
  locale: Locale;
  ready: boolean;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleState>({
  locale: "pt",
  ready: false,
  setLocale: () => {},
});

function readOverride(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
    // A previous visit may have stored Portuguese as the only choice.
    // Ignore that so a Spanish computer can win. Keep any other manual choice.
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (isLocale(legacy) && legacy !== "pt") {
      window.localStorage.setItem(STORAGE_KEY, legacy);
      return legacy;
    }
    return null;
  } catch {
    return null;
  }
}

function deviceLocale(): Locale {
  if (typeof navigator === "undefined") return "pt";
  const list = [...(navigator.languages?.length ? navigator.languages : []), navigator.language].filter(
    (item): item is string => Boolean(item),
  );
  const nav = navigator as Navigator & { systemLanguage?: string; userLanguage?: string };
  let intlLocale: string | null = null;
  try {
    intlLocale = Intl.DateTimeFormat().resolvedOptions().locale || null;
  } catch {
    intlLocale = null;
  }
  // systemLanguage is the OS language on older Edge. Modern browsers expose
  // the computer locale through Intl, which can differ from navigator.languages.
  const system = nav.systemLanguage || nav.userLanguage || intlLocale;
  return resolveLocale(list, system);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const apply = () => {
      setLocaleState(readOverride() ?? deviceLocale());
      setReady(true);
    };
    apply();
    window.addEventListener("languagechange", apply);
    return () => window.removeEventListener("languagechange", apply);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const html = LOCALE_OPTIONS.find((item) => item.id === locale)?.html ?? locale;
    document.documentElement.lang = html;
  }, [locale, ready]);

  const value = useMemo<LocaleState>(
    () => ({
      locale,
      ready,
      setLocale: (next) => {
        setLocaleState(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* private mode */
        }
      },
    }),
    [locale, ready],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleState {
  return useContext(LocaleContext);
}
