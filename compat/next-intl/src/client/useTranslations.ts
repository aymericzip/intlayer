'use client';

import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { IntlayerClientContext } from 'next-intlayer';
import { type ReactNode, useContext, useMemo } from 'react';
import {
  createTranslator,
  type MarkupChunkRenderer,
  type RichChunkRenderer,
} from '../createTranslator';

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
 * - `rich(key, values)` — resolves `<tag>chunks</tag>` markup to React nodes.
 * - `markup(key, values)` — resolves `<tag>chunks</tag>` markup to a string.
 */
type TranslateFunction<N extends DictionaryKeys> = {
  /** Translate a key to a string, with optional ICU interpolation params. */
  <P extends ValidDotPathsFor<N>>(
    key: P,
    params?: Record<string, unknown>
  ): string;
  /** Returns `true` if the given key exists in the namespace. */
  has<P extends ValidDotPathsFor<N>>(key: P): boolean;
  /** Returns the raw unprocessed content for the given key. */
  raw<P extends ValidDotPathsFor<N>>(key: P): unknown;
  /** Resolves rich-text markup, mapping tags through React renderers. */
  rich<P extends ValidDotPathsFor<N>>(
    key: P,
    values?: Record<string, RichChunkRenderer | ReactNode>
  ): ReactNode;
  /** Resolves rich-text markup, mapping tags through string renderers. */
  markup<P extends ValidDotPathsFor<N>>(
    key: P,
    values?: Record<string, MarkupChunkRenderer | string | number>
  ): string;
};

/** Loosely-typed function returned for nested `'dict.scope'` namespaces. */
type LooseTranslateFunction = {
  (key: string, params?: Record<string, unknown>): string;
  has(key: string): boolean;
  raw(key: string): unknown;
  rich(
    key: string,
    values?: Record<string, RichChunkRenderer | ReactNode>
  ): ReactNode;
  markup(
    key: string,
    values?: Record<string, MarkupChunkRenderer | string | number>
  ): string;
};

/**
 * Overload set for {@link useTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    `string` paths, matching next-intl's scoped-namespace behaviour.
 * 3. No namespace → root scope; the first segment of each key designates
 *    the dictionary (`t('about.title')`).
 */
type UseTranslations = {
  <N extends DictionaryKeys>(namespace: N): TranslateFunction<N>;
  (namespace: `${string}.${string}`): LooseTranslateFunction;
  (): LooseTranslateFunction;
};

/**
 * Drop-in for next-intl's `useTranslations`.
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
 * // Scoped to a nested object (next-intl idiom)
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
    () => createTranslator(currentLocale as LocalesValues, namespace),
    [currentLocale, namespace]
  );
}) as UseTranslations;
