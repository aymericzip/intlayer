import configuration from '@intlayer/config/built';
import type {
  Dictionary,
  LanguageContent,
  LocalesValues,
} from '@intlayer/types';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const defaultLocale = configuration?.internationalization.defaultLocale;
  const localeTarget = locale ?? currentLocale() ?? defaultLocale;

  const dictionary =
    await dictionaryPromise[localeTarget as keyof typeof dictionaryPromise]?.();

  // biome-ignore lint/style/noNonNullAssertion: <Dictionary can be null>
  return useDictionary(dictionary!, localeTarget);
};
