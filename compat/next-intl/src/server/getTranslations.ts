import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  createTranslator,
  type LooseTranslateFunction,
  type TranslateFunction,
  type TranslateFunctionForNamespace,
} from '@intlayer/use-intl';
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
 * Overload set for {@link getTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. An options object `{ namespace?, locale? }` → typed when namespace is
 *    a known `DictionaryKeys` value.
 * 3. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    dot-paths under the scope, typed against the dictionary, matching
 *    next-intl's scoped-namespace behaviour.
 * 4. No namespace → root scope; the first segment of each key designates
 *    the dictionary (`t('about.title')`).
 *
 * The translate function shape (`t`, `t.rich`, `t.markup`, `t.raw`, `t.has`)
 * is shared with `@intlayer/use-intl`.
 */
type GetTranslations = {
  <N extends DictionaryKeys>(namespace: N): Promise<TranslateFunction<N>>;
  <N extends DictionaryKeys>(
    options: GetTranslationsOptions<N>
  ): Promise<TranslateFunction<N>>;
  <N extends `${string}.${string}`>(
    namespace: N
  ): Promise<TranslateFunctionForNamespace<N>>;
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
 * Resolves the active locale from the current request (or the `locale` option)
 * and delegates to `@intlayer/use-intl`'s `createTranslator`, the same runtime
 * that backs the client `useTranslations`.
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

  return createTranslator({ locale: locale as LocalesValues, namespace });
}) as GetTranslations;
