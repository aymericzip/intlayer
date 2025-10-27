import configuration from '@intlayer/config/built';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { useContext } from 'solid-js';
import { IntlayerClientContext } from './IntlayerProvider';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: L
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const defaultLocale = configuration?.internationalization.defaultLocale;
  const localeTarget = locale ?? currentLocale() ?? defaultLocale;

  const dictionary =
    await dictionaryPromise[localeTarget as keyof typeof dictionaryPromise]?.();

  return useDictionary<T, L>(dictionary!, localeTarget as L);
};
