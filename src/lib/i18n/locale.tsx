import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { detectLocale, isLocale, LOCALE_OPTIONS, type Locale } from "./types";

const STORAGE_KEY = "conjuga-locale";

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
    return isLocale(saved) ? saved : null;
  } catch {
    return null;
  }
}

function deviceLocale(): Locale {
  if (typeof navigator === "undefined") return "pt";
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  return detectLocale(list.filter(Boolean));
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readOverride() ?? deviceLocale();
    setLocaleState(next);
    setReady(true);
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
