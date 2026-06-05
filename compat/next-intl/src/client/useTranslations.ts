'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import { useI18n } from 'next-intlayer';

/**
 * Drop-in for next-intl's `useTranslations`.
 * Backed by `useI18n` from `next-intlayer`.
 *
 * The returned `t()` is typed against the intlayer dictionary for namespace N:
 * keys are autocompleted and dot-paths are validated at compile time.
 *
 * @example
 * ```tsx
 * const t = useTranslations('about');
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 * ```
 */
export const useTranslations = <N extends DictionaryKeys>(namespace?: N) => {
  const baseT = useI18n((namespace ?? 'translation') as N);

  const t = <P extends ValidDotPathsFor<N>>(
    key: P,
    params?: Record<string, unknown>
  ): string => {
    const raw = (baseT as unknown as (k: string) => unknown)(String(key));
    const str = String(raw ?? String(key));
    if (!params) return str;
    return str.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      params[k] != null ? String(params[k]) : `{{${k}}}`
    );
  };

  return t;
};
