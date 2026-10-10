import type { Lang } from '@/lib/types';

import type { Strings } from './en';

/**
 * The eleven other test languages. Each file under src/i18n/ is a partial
 * table; anything missing falls back to English.
 */
export const EXTRA: Partial<Record<Lang, Partial<Strings>>> = {};
