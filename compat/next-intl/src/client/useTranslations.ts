'use client';

import { getIntlayer } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { IntlayerClientContext } from 'next-intlayer';
import { useContext, useMemo } from 'react';

const navigatePath = (objectValue: unknown, path: string): unknown => {
  if (!path) return objectValue;
  const parts = path.split('.');
  let current: unknown = objectValue;
  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/**
 * The translation function returned by {@link useTranslations}.
 *
 * When the namespace is a bare dictionary key, `key` is validated against the
 * dictionary's dot-paths. When the namespace is a nested scope
 * (`'about.counter'`), `key` is a relative `string` path.
 *
 * Beyond the call signature, the function exposes:
 * - `has(key)` — returns `true` when the key exists in the namespace.
 * - `raw(key)` — returns the unprocessed content value.
 */
type TranslateFunction<N extends DictionaryKeys> = {
  /** Translate a key to a string, with optional interpolation params. */
  <P extends ValidDotPathsFor<N>>(
    key: P,
    params?: Record<string, unknown>
  ): string;
  /** Returns `true` if the given key exists in the namespace. */
  has<P extends ValidDotPathsFor<N>>(key: P): boolean;
  /** Returns the raw unprocessed content for the given key. */
  raw<P extends ValidDotPathsFor<N>>(key: P): unknown;
};

/** Loosely-typed function returned for nested `'dict.scope'` namespaces. */
type LooseTranslateFunction = {
  (key: string, params?: Record<string, unknown>): string;
  has(key: string): boolean;
  raw(key: string): unknown;
};

/**
 * Overload set for {@link useTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    `string` paths, matching next-intl's scoped-namespace behaviour.
 */
type UseTranslations = {
  <N extends DictionaryKeys>(namespace?: N): TranslateFunction<N>;
  (namespace: `${string}.${string}`): LooseTranslateFunction;
};

/**
 * Drop-in for next-intl's `useTranslations`.
 *
 * Supports next-intl's nested namespace scoping: the namespace is split at the
 * first `.` into the intlayer dictionary key and a key prefix that is prepended
 * to every `t()` lookup.
 *
 * @example
 * ```tsx
 * const t = useTranslations('about');
 * t('counter.label'); // ✓ typed
 *
 * // Scoped to a nested object (next-intl idiom)
 * const t = useTranslations('about.counter');
 * t('label'); // resolves about → counter.label
 *
 * // Utility methods
 * t.has('counter.label'); // boolean
 * t.raw('counter.label'); // unknown
 * ```
 */
export const useTranslations = ((namespace?: string) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};

  const [dictionaryKey, ...prefixSegments] = (namespace ?? 'translation').split(
    '.'
  );
  const keyPrefix = prefixSegments.join('.');

  const dictionary = useMemo(
    () =>
      getIntlayer(
        dictionaryKey as DictionaryKeys,
        currentLocale as LocalesValues
      ),
    [dictionaryKey, currentLocale]
  );

  const resolveKey = (key: string): string =>
    keyPrefix ? `${keyPrefix}.${key}` : key;

  return useMemo(
    () =>
      Object.assign(
        (key: string, params?: Record<string, unknown>): string => {
          const rawValue = navigatePath(dictionary, resolveKey(key));
          const str = String(rawValue ?? key);
          if (!params) return str;
          return str.replace(/\{(\w+)\}/g, (_, k) =>
            params[k] != null ? String(params[k]) : `{${k}}`
          );
        },
        {
          has: (key: string): boolean =>
            navigatePath(dictionary, resolveKey(key)) != null,
          raw: (key: string): unknown =>
            navigatePath(dictionary, resolveKey(key)),
        }
      ),
    // resolveKey is a closure over keyPrefix; memoize on its source
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dictionary, keyPrefix]
  );
}) as UseTranslations;
