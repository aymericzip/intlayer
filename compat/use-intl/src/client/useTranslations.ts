'use client';

import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useContext, useMemo } from 'react';
import { IntlayerClientContext } from 'react-intlayer';
import { createNamespaceTranslator } from '../shared/namespaceTranslator';
import type {
  LooseTranslateFunction,
  TranslateFunction,
} from '../shared/translateFunctionTypes';

/**
 * Overload set for {@link useTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    `string` paths, matching use-intl's scoped-namespace behaviour.
 * 3. No namespace → root scope; the first segment of each key designates
 *    the dictionary (`t('about.title')`).
 */
type UseTranslations = {
  <N extends DictionaryKeys>(namespace: N): TranslateFunction<N>;
  (namespace: `${string}.${string}`): LooseTranslateFunction;
  (): LooseTranslateFunction;
};

/**
 * Drop-in for use-intl's `useTranslations`.
 *
 * Messages support ICU MessageFormat syntax: simple arguments (`{name}`),
 * plural (`{count, plural, one {…} other {…}}`, `#`), select, and formatted
 * arguments (`{value, number}`). Rich text is available through `t.rich()`
 * and `t.markup()`.
 *
 * @example
 * ```tsx
 * const t = useTranslations('about');
 * t('counter.label'); // ✓ typed
 * t('items', { count: 3 }); // ICU plural
 *
 * // Scoped to a nested object (use-intl idiom)
 * const t = useTranslations('about.counter');
 * t('label'); // resolves about → counter.label
 *
 * // Rich text
 * t.rich('terms', { link: (chunks) => <a href="/terms">{chunks}</a> });
 * ```
 */
export const useTranslations = ((namespace?: string) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};

  return useMemo(
    () => createNamespaceTranslator(currentLocale as LocalesValues, namespace),
    [currentLocale, namespace]
  );
}) as UseTranslations;
