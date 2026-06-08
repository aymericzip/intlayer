import { internationalization } from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

type DynamicDictionarySource = {
  cacheKey: string;
  locale: LocalesValues;
};

/**
 * On the client side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};
  const defaultLocale = internationalization.defaultLocale;
  const dictionaryLoaders = dictionaryPromise as Partial<
    Record<LocalesValues, () => Promise<T>>
  >;
  const dictionaryKey = String(key);
  const localeAccessor = () => locale ?? currentLocale?.() ?? defaultLocale;
  const dictionarySourceAccessor = (): DynamicDictionarySource => {
    const localeTarget = localeAccessor();

    return {
      cacheKey: `${dictionaryKey}.${localeTarget}`,
      locale: localeTarget,
    };
  };
  const loadDictionary = ({
    locale: localeTarget,
  }: DynamicDictionarySource) => {
    const dictionaryLoader = dictionaryLoaders[localeTarget];

    if (!dictionaryLoader) {
      return Promise.reject(
        new Error(
          `No dynamic dictionary loader found for key "${String(key)}" and locale "${localeTarget}".`
        )
      );
    }

    return dictionaryLoader();
  };

  const dictionary = useLoadDynamic<T, DynamicDictionarySource>(
    dictionarySourceAccessor,
    loadDictionary
  );

  // Keep locale resolution inside useDictionary so the interpreted content
  // follows the same reactive context as static Solid dictionaries.
  return useDictionary(dictionary, locale);
};
