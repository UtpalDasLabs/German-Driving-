import type { Lang } from '@/lib/types';

import { de } from './de';
import { en, type StringKey, type Strings } from './en';
import { EXTRA } from './extra';

export type { StringKey };

/**
 * Interface tables per language. German and English are complete; the others
 * are partial and fall back to English one key at a time.
 */
const TABLES: Partial<Record<Lang, Partial<Strings>>> = { en, de, ...EXTRA };

export function translator(lang: Lang) {
  const table = TABLES[lang] ?? en;
  return (key: StringKey): string => table[key] ?? en[key];
}

/** Share of interface keys with their own text in a language, 0-1. */
export function uiCoverage(lang: Lang): number {
  const table = TABLES[lang];
  if (!table) return 0;
  const keys = Object.keys(en) as StringKey[];
  return keys.filter((k) => typeof table[k] === 'string').length / keys.length;
}
