import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ReactNode } from 'react';
import {
  createTranslator,
  type MarkupChunkRenderer,
  type RichChunkRenderer,
} from '../createTranslator';
import { getLocale } from './getLocale';

/**
 * Options accepted by the options-object overload of {@link getTranslations}.
 */
type GetTranslationsOptions<N extends DictionaryKeys> = {
  /** The dictionary namespace to scope translations to. */
  namespace?: N;
  /** Override the locale instead of reading it from the current request. */
  locale?: LocalesValues;
};

/**
 * The translation function returned by {@link getTranslations}.
 *
 * Beyond the plain call signature, the function exposes:
 * - `has(key)` — returns `true` when the key exists in the namespace.
 * - `raw(key)` — returns the unprocessed message value.
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
  /** Returns the raw unprocessed message for the given key. */
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
 * Overload set for {@link getTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. An options object `{ namespace?, locale? }` → typed when namespace is
 *    a known `DictionaryKeys` value.
 * 3. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    `string` paths, matching next-intl's scoped-namespace behaviour.
 * 4. No namespace → root scope; the first segment of each key designates
 *    the dictionary (`t('about.title')`).
 */
type GetTranslations = {
  <N extends DictionaryKeys>(namespace: N): Promise<TranslateFunction<N>>;
  <N extends DictionaryKeys>(
    options: GetTranslationsOptions<N>
  ): Promise<TranslateFunction<N>>;
  (namespace: `${string}.${string}`): Promise<LooseTranslateFunction>;
  (): Promise<LooseTranslateFunction>;
};

/**
 * Drop-in for next-intl's server `getTranslations()`.
 *
 * Messages support ICU MessageFormat syntax: simple arguments (`{name}`),
 * plural (`{count, plural, one {…} other {…}}`, `#`), select, and formatted
 * arguments (`{value, number}`). Rich text is available through `t.rich()`
 * and `t.markup()`.
 *
 * Also accepts an options object `{ namespace, locale }` to match next-intl's
 * full server API surface.
 *
 * @example
 * ```ts
 * // Bare namespace — fully typed dot-paths
 * const t = await getTranslations('about');
 * return <h1>{t('counter.label')}</h1>;
 *
 * // ICU plural
 * t('items', { count: 3 });
 *
 * // Options object with locale override
 * const t = await getTranslations({ namespace: 'about', locale: 'fr' });
 *
 * // Rich text
 * t.rich('terms', { link: (chunks) => <a href="/terms">{chunks}</a> });
 * ```
 */
export const getTranslations: GetTranslations = (async (
  namespaceOrOptions?: string | GetTranslationsOptions<DictionaryKeys>
) => {
  let namespace: string | undefined;
  let localeOverride: LocalesValues | undefined;

  if (typeof namespaceOrOptions === 'object' && namespaceOrOptions !== null) {
    namespace = namespaceOrOptions.namespace;
    localeOverride = namespaceOrOptions.locale;
  } else {
    namespace = namespaceOrOptions as string | undefined;
  }

  const locale = localeOverride ?? (await getLocale());

  return createTranslator(locale as LocalesValues, namespace);
}) as GetTranslations;
