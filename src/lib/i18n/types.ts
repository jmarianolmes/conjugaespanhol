export const LOCALES = ["pt", "en", "ru", "uk", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export type Gloss = Record<Exclude<Locale, "pt">, string>;

export const LOCALE_OPTIONS: { id: Locale; short: string; name: string; html: string }[] = [
  { id: "pt", short: "PT", name: "Português", html: "pt-BR" },
  { id: "en", short: "EN", name: "English", html: "en" },
  { id: "ru", short: "RU", name: "Русский", html: "ru" },
  { id: "uk", short: "UA", name: "Українська", html: "uk" },
  { id: "zh", short: "中文", name: "中文", html: "zh-CN" },
];

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function detectLocale(languages: readonly string[]): Locale {
  for (const raw of languages) {
    const code = raw.toLowerCase();
    if (code.startsWith("pt")) return "pt";
    if (code.startsWith("uk")) return "uk";
    if (code.startsWith("ru")) return "ru";
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("en")) return "en";
  }
  return "pt";
}
