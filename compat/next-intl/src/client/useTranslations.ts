'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import { useI18n } from 'next-intlayer';

/**
 * The translation function returned by {@link useTranslations}.
 *
 * When the namespace is a bare dictionary key, `key` is validated against the
 * dictionary's dot-paths. When the namespace is a nested scope
 * (`'about.counter'`), `key` is a relative `string` path.
 */
type TranslateFunction<N extends DictionaryKeys> = <
  P extends ValidDotPathsFor<N>,
>(
  key: P,
  params?: Record<string, unknown>
) => string;

/**
 * Overload set for {@link useTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. A nested namespace `'dictionary.sub.scope'` → `t()` accepts the relative
 *    `string` path, matching next-intl's scoped-namespace behaviour.
 */
type UseTranslations = {
  <N extends DictionaryKeys>(namespace?: N): TranslateFunction<N>;
  (
    namespace: `${string}.${string}`
  ): (key: string, params?: Record<string, unknown>) => string;
};

/**
 * Drop-in for next-intl's `useTranslations`.
 * Backed by `useI18n` from `next-intlayer`.
 *
 * Supports next-intl's nested namespace scoping: the namespace is split at the
 * first `.` into the intlayer dictionary key and a key prefix that is prepended
 * to every `t()` lookup.
 *
 * @example
 * ```tsx
 * const t = useTranslations('about');
 * t('counter.label'); // ✓ typed; compile error if key doesn't exist
 *
 * // Scoped to a nested object (next-intl idiom)
 * const t = useTranslations('about.counter');
 * t('label'); // resolves about → counter.label
 * ```
 */
export const useTranslations: UseTranslations = (namespace?: string) => {
  const [dictionaryKey, ...prefixSegments] = (namespace ?? 'translation').split(
    '.'
  );
  const keyPrefix = prefixSegments.join('.');

  const baseT = useI18n(dictionaryKey as DictionaryKeys);

  const t = (key: string, params?: Record<string, unknown>): string => {
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
    const raw = (baseT as unknown as (k: string) => unknown)(fullKey);
    const str = String(raw ?? key);
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) =>
      params[k] != null ? String(params[k]) : `{${k}}`
    );
  };

  return t;
};
