import type { Lang } from '@/lib/types';

import { ar } from './ar';
import type { Strings } from './en';
import { el } from './el';
import { es } from './es';
import { fr } from './fr';
import { hr } from './hr';
import { it } from './it';
import { pl } from './pl';
import { pt } from './pt';
import { ro } from './ro';
import { ru } from './ru';
import { tr } from './tr';

/**
 * The eleven other test languages. Each file under src/i18n/ is a partial
 * table; anything missing falls back to English.
 */
export const EXTRA: Partial<Record<Lang, Partial<Strings>>> = { tr, ar, ru, pl, ro, hr, el, it, es, pt, fr };
