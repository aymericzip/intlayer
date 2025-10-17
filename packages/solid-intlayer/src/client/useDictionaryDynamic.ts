import configuration from '@intlayer/config/built';
import type {
  Dictionary,
  DictionaryKeys,
  LanguageContent,
  LocalesValues,
} from '@intlayer/types';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  K extends DictionaryKeys,
>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  key: K,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};
  const defaultLocale = configuration?.internationalization.defaultLocale;
  const localeTarget = locale ?? currentLocale?.() ?? defaultLocale;

  const dictionary = useLoadDynamic<T>(
    `${String(key)}.${localeTarget}`,
    (dictionaryPromise as any)[
      localeTarget as keyof typeof dictionaryPromise
    ]?.()
  ) as T;

  return useDictionary(dictionary, localeTarget);
};
