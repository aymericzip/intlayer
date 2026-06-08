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
 * The translation function returned by {@link getTranslations}.
 */
type TranslateFunction<N extends DictionaryKeys> = <
  P extends ValidDotPathsFor<N>,
>(
  key: P,
  values?: Record<string, unknown>
) => string;

/**
 * Overload set for {@link getTranslations}:
 *
 * 1. A bare dictionary key → fully-typed `t()` (autocompleted dot-paths).
 * 2. A nested namespace `'dictionary.sub.scope'` → `t()` accepts the relative
 *    `string` path, matching next-intl's scoped-namespace behaviour.
 */
type GetTranslations = {
  <N extends DictionaryKeys>(namespace?: N): Promise<TranslateFunction<N>>;
  (
    namespace: `${string}.${string}`
  ): Promise<(key: string, values?: Record<string, unknown>) => string>;
};

/**
 * Drop-in for next-intl's server `getTranslations()`.
 *
 * Supports next-intl's nested namespace scoping: the namespace is split at the
 * first `.` into the intlayer dictionary key and a key prefix that is prepended
 * to every `t()` lookup.
 *
 * @example
 * ```ts
 * const t = await getTranslations('about');
 * return <h1>{t('counter.label')}</h1>; // ✓ typed
 *
 * // Scoped to a nested object (next-intl idiom)
 * const t = await getTranslations('about.counter');
 * return <h1>{t('label')}</h1>; // resolves about → counter.label
 * ```
 */
export const getTranslations: GetTranslations = (async (namespace?: string) => {
  const locale = await getLocale();

  if (!namespace) {
    return (key: string) => key;
  }

  const [dictionaryKey, ...prefixSegments] = namespace.split('.');
  const keyPrefix = prefixSegments.join('.');

  const dictionary = getIntlayer(
    dictionaryKey as DictionaryKeys,
    locale as LocalesValues
  );

  return (key: string, values?: Record<string, unknown>): string => {
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
    const raw = navigatePath(dictionary, fullKey);
    if (raw == null) return key;

    const str = String(raw);
    if (!values) return str;

    return str.replace(/\{(\w+)\}/g, (_, k) =>
      values[k] != null ? String(values[k]) : `{${k}}`
    );
  };
}) as GetTranslations;
