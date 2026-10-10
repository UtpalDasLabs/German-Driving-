import { useMemo } from 'react';

import { translator } from '@/i18n';
import { isRtl, languageInfo, pick } from '@/lib/languages';
import type { L } from '@/lib/types';
import { useSettings } from '@/store/SettingsProvider';

/** The translation function, so components can pass it around. */
export type T = ReturnType<typeof translator>;

/**
 * Interface strings plus helpers for dataset text, all in the study language.
 * `p` picks a dataset string (falling back to English); `de` is the German
 * original, for the "show German" line under a translated question.
 */
export function useT() {
  const { settings } = useSettings();
  const lang = settings.language;
  return useMemo(() => {
    const t = translator(lang);
    return {
      t,
      lang,
      rtl: isRtl(lang),
      locale: languageInfo(lang).locale,
      p: (text: L | null | undefined) => pick(text, lang),
      /** German original, shown only when it differs from what is displayed. */
      original: (text: L | null | undefined) =>
        text && lang !== 'de' && settings.showGerman ? text.de : null,
    };
  }, [lang, settings.showGerman]);
}
