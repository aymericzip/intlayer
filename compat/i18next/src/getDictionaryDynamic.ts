import { internationalization } from '@intlayer/config/built';
import { getDictionary as getDictionaryCore } from '@intlayer/core/interpreter';
import type { ValidDotPathsFor } from '@intlayer/core/transpiler';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import type { TOptions } from 'i18next';
import { resolveTranslation } from './resolveTranslation';

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
export const getDictionaryDynamic = async <
  const T extends Dictionary,
  const K extends string,
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

  return <P extends ValidDotPathsFor<K>>(
    lookupKey: P,
    options?: TOptions
  ): string => {
    const resolved = resolveTranslation({
      locale: targetLocale,
      namespace: key,
      key: keyPrefix ? `${keyPrefix}.${String(lookupKey)}` : String(lookupKey),
      options,
      dictionaryContent,
    });
    return resolved !== undefined ? (resolved as string) : String(lookupKey);
  };
};
