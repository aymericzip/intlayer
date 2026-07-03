import { internationalization } from '@intlayer/config/built';
import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { resolveTranslation } from './resolveTranslation';
import type { ScopedTFunction, TypedTFunction } from './typedTranslation';

/**
 * Overload set for {@link getDictionaryDynamic}: without a key prefix the
 * returned `t()` is typed against the dictionary's dot-paths; with a prefix
 * the keys are relative dot-paths under that scope.
 */
type GetDictionaryDynamic = {
  <T extends Dictionary, K extends DictionaryKeys>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    locale?: LocalesValues
  ): Promise<TypedTFunction<K>>;
  <T extends Dictionary, K extends DictionaryKeys, Prefix extends string>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    locale: LocalesValues | undefined,
    keyPrefix: Prefix
  ): Promise<ScopedTFunction<K, Prefix>>;
};

/**
 * Dynamic dictionary-accepting variant of `getFixedT`.
 *
 * Counterpart to {@link getDictionary} for dictionaries imported lazily per
 * locale: only the JSON of the resolved locale is loaded. Returns a promise
 * of the fixed `t()` function.
 *
 * @example
 * const t = await getDictionaryDynamic(aboutLoaders, 'about', 'fr');
 * t('counter.label');
 */
export const getDictionaryDynamic = (async <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  locale?: LocalesValues,
  keyPrefix?: string
) => {
  const targetLocale = (locale ??
    internationalization?.defaultLocale) as LocalesValues;
  const loadDictionary = (
    dictionaryPromise as Record<string, () => Promise<T>>
  )[targetLocale as string];
  const dictionary = loadDictionary ? await loadDictionary() : undefined;
  const dictionaryContent = dictionary
    ? getDictionaryCore(dictionary, targetLocale)
    : undefined;

  return (lookupKey: string, options?: TOptions): unknown => {
    const resolved = resolveTranslation({
      locale: targetLocale,
      namespace: key,
      key: keyPrefix ? `${keyPrefix}.${lookupKey}` : lookupKey,
      options,
      dictionaryContent,
    });
    return resolved !== undefined ? resolved : lookupKey;
  };
}) as GetDictionaryDynamic;
