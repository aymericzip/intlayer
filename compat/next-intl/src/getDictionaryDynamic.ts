import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import {
  createDictionaryTranslator,
  type ScopedTranslateFunction,
  type TranslateFunction,
} from '@intlayer/use-intl';
import { useDictionaryDynamic as getDictionaryDynamicBase } from 'next-intlayer/server';
import { getLocale } from './server/getLocale';

/**
 * Overload set for {@link getDictionaryDynamic}: without a prefix the
 * translator is typed against the dictionary's dot-paths; with a prefix the
 * keys are relative dot-paths under that scope.
 */
type GetDictionaryDynamic = {
  <T extends Dictionary, K extends DictionaryKeys>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K
  ): Promise<TranslateFunction<K>>;
  <T extends Dictionary, K extends DictionaryKeys, Prefix extends string>(
    dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
    key: K,
    namespacePrefix: Prefix
  ): Promise<ScopedTranslateFunction<K, Prefix>>;
};

/**
 * Dynamic dictionary-accepting variant of `getTranslations`.
 *
 * Counterpart to {@link getDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const getDictionaryDynamic = (async <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  namespacePrefix?: string
) => {
  const locale = (await getLocale()) as LocalesValues;
  const content = await getDictionaryDynamicBase<T, K>(dictionaryPromise, key);

  return createDictionaryTranslator(locale, content, namespacePrefix);
}) as GetDictionaryDynamic;
