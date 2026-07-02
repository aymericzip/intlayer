import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { createDictionaryTranslator } from '@intlayer/use-intl';
import { useDictionaryDynamic as getDictionaryDynamicBase } from 'next-intlayer/server';
import { getLocale } from './server/getLocale';

/**
 * Dynamic dictionary-accepting variant of `getTranslations`.
 *
 * Counterpart to {@link getDictionary} for dictionaries imported lazily per
 * locale. Used internally by the build-time optimization.
 */
export const getDictionaryDynamic = async <
  const T extends Dictionary,
  const K extends string,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  namespacePrefix?: string
) => {
  const locale = (await getLocale()) as LocalesValues;
  const content = await getDictionaryDynamicBase<T, K>(dictionaryPromise, key);

  return createDictionaryTranslator(locale, content, namespacePrefix);
};
