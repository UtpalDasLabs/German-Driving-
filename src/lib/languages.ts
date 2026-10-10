import type { L, Lang } from './types';

export type LanguageInfo = {
  code: Lang;
  /** The language's name in itself, which is how people look for it. */
  native: string;
  english: string;
  rtl: boolean;
  /** BCP-47 tag for dates and numbers. */
  locale: string;
};

/**
 * German first, then the twelve official foreign-language versions of the
 * theory test, ordered roughly by how many people in Germany sit them.
 */
export const LANGUAGES: LanguageInfo[] = [
  { code: 'de', native: 'Deutsch', english: 'German', rtl: false, locale: 'de-DE' },
  { code: 'en', native: 'English', english: 'English', rtl: false, locale: 'en-GB' },
  { code: 'tr', native: 'Türkçe', english: 'Turkish', rtl: false, locale: 'tr-TR' },
  { code: 'ar', native: 'العربية', english: 'Arabic', rtl: true, locale: 'ar' },
  { code: 'ru', native: 'Русский', english: 'Russian', rtl: false, locale: 'ru-RU' },
  { code: 'pl', native: 'Polski', english: 'Polish', rtl: false, locale: 'pl-PL' },
  { code: 'ro', native: 'Română', english: 'Romanian', rtl: false, locale: 'ro-RO' },
  { code: 'hr', native: 'Hrvatski', english: 'Croatian', rtl: false, locale: 'hr-HR' },
  { code: 'el', native: 'Ελληνικά', english: 'Greek', rtl: false, locale: 'el-GR' },
  { code: 'it', native: 'Italiano', english: 'Italian', rtl: false, locale: 'it-IT' },
  { code: 'es', native: 'Español', english: 'Spanish', rtl: false, locale: 'es-ES' },
  { code: 'pt', native: 'Português', english: 'Portuguese', rtl: false, locale: 'pt-PT' },
  { code: 'fr', native: 'Français', english: 'French', rtl: false, locale: 'fr-FR' },
];

export const LANG_CODES = LANGUAGES.map((l) => l.code);

const BY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.code, l])) as Record<Lang, LanguageInfo>;

export function languageInfo(code: Lang): LanguageInfo {
  return BY_CODE[code] ?? BY_CODE.en;
}

export function isRtl(code: Lang): boolean {
  return languageInfo(code).rtl;
}

/** Picks a string in the wanted language, falling back to English. */
export function pick(text: L | null | undefined, lang: Lang): string {
  if (!text) return '';
  return text[lang] ?? text.en;
}

/** True when the wanted language has its own text (not the English fallback). */
export function hasOwn(text: L, lang: Lang): boolean {
  return lang === 'en' || lang === 'de' || typeof text[lang] === 'string';
}

/**
 * The best guess at the device language, used once on first launch. Anything
 * that is not one of the test languages starts in English.
 */
export function deviceLanguage(): Lang {
  try {
    const tag = Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2).toLowerCase();
    return (LANG_CODES as string[]).includes(tag) ? (tag as Lang) : 'en';
  } catch {
    return 'en';
  }
}
