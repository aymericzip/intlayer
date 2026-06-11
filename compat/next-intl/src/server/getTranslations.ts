import { getIntlayer } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getLocale } from './getLocale';

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
 */
type TranslateFunction<N extends DictionaryKeys> = {
  /** Translate a key to a string, with optional interpolation params. */
  <P extends ValidDotPathsFor<N>>(
    key: P,
    params?: Record<string, unknown>
  ): string;
  /** Returns `true` if the given key exists in the namespace. */
  has<P extends ValidDotPathsFor<N>>(key: P): boolean;
  /** Returns the raw unprocessed message for the given key. */
  raw<P extends ValidDotPathsFor<N>>(key: P): unknown;
};

/** Loosely-typed function returned for nested `'dict.scope'` namespaces. */
type LooseTranslateFunction = {
  (key: string, params?: Record<string, unknown>): string;
  has(key: string): boolean;
  raw(key: string): unknown;
};

/**
 * Overload set for {@link getTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. An options object `{ namespace?, locale? }` → typed when namespace is
 *    a known `DictionaryKeys` value.
 * 3. A nested namespace `'dictionary.sub.scope'` → `t()` accepts relative
 *    `string` paths, matching next-intl's scoped-namespace behaviour.
 */
type GetTranslations = {
  <N extends DictionaryKeys>(namespace?: N): Promise<TranslateFunction<N>>;
  <N extends DictionaryKeys>(
    options: GetTranslationsOptions<N>
  ): Promise<TranslateFunction<N>>;
  (namespace: `${string}.${string}`): Promise<LooseTranslateFunction>;
};

/**
 * Drop-in for next-intl's server `getTranslations()`.
 *
 * Supports next-intl's nested namespace scoping: the namespace is split at the
 * first `.` into the intlayer dictionary key and a key prefix that is prepended
 * to every `t()` lookup.
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
 * // Options object with locale override
 * const t = await getTranslations({ namespace: 'about', locale: 'fr' });
 *
 * // Scoped to a nested object (next-intl idiom)
 * const t = await getTranslations('about.counter');
 * return <h1>{t('label')}</h1>; // resolves about → counter.label
 *
 * // Utility methods
 * t.has('counter.label'); // boolean
 * t.raw('counter.label'); // unknown
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

  if (!namespace) {
    return Object.assign((key: string): string => key, {
      has: (_key: string): boolean => false,
      raw: (_key: string): unknown => undefined,
    });
  }

  const [dictionaryKey, ...prefixSegments] = namespace.split('.');
  const keyPrefix = prefixSegments.join('.');

  const dictionary = getIntlayer(
    dictionaryKey as DictionaryKeys,
    locale as LocalesValues
  );

  const resolveKey = (key: string): string =>
    keyPrefix ? `${keyPrefix}.${key}` : key;

  return Object.assign(
    (key: string, params?: Record<string, unknown>): string => {
      const rawValue = navigatePath(dictionary, resolveKey(key));
      if (rawValue == null) return key;
      const str = String(rawValue);
      if (!params) return str;
      return str.replace(/\{(\w+)\}/g, (_, k) =>
        params[k] != null ? String(params[k]) : `{${k}}`
      );
    },
    {
      has: (key: string): boolean =>
        navigatePath(dictionary, resolveKey(key)) != null,
      raw: (key: string): unknown => navigatePath(dictionary, resolveKey(key)),
    }
  );
}) as GetTranslations;
