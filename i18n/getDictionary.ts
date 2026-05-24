import en from './translations/en.json';
import he from './translations/he.json';
import type { Locale } from './config';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en: en as Dictionary,
  he: he as unknown as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}
