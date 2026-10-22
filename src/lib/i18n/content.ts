import type { PhrasePrompt } from "@/lib/spanish/phrases";
import { PHRASE_PT } from "./gloss-phrases";
import type { Gloss, Locale } from "./types";

export function glossText(locale: Locale, gloss: Gloss | undefined, fallback: string): string {
  if (!gloss || locale === "pt") return fallback;
  const value = gloss[locale];
  return value || fallback;
}

export function glossOf(
  locale: Locale,
  table: Record<string, Gloss>,
  id: string,
  fallback: string,
): string {
  return glossText(locale, table[id], fallback);
}

export function glossAt(locale: Locale, list: Gloss[] | undefined, index: number, fallback: string): string {
  return glossText(locale, list?.[index], fallback);
}

export function phraseMeaning(locale: Locale, phrase: PhrasePrompt): string {
  return glossOf(locale, PHRASE_PT, phrase.id, phrase.pt);
}
