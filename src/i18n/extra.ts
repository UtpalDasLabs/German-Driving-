import type { Lang } from '@/lib/types';

import { ar } from './ar';
import type { Strings } from './en';
import { hr } from './hr';
import { pl } from './pl';
import { ro } from './ro';
import { ru } from './ru';
import { tr } from './tr';

/**
 * The eleven other test languages. Each file under src/i18n/ is a partial
 * table; anything missing falls back to English.
 */
export const EXTRA: Partial<Record<Lang, Partial<Strings>>> = { tr, ar, ru, pl, ro, hr };
