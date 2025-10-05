import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary, LanguageContent } from '@intlayer/core';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
import { useDictionary } from './useDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionaryAsync = async <T extends Dictionary>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  locale?: LocalesValues
) => {
  const localeTarget =
    locale ??
    getServerContext<LocalesValues>(IntlayerServerContext) ??
    configuration?.internationalization.defaultLocale;

  const dictionary = await dictionaryPromise[localeTarget]!();

  return useDictionary(dictionary, localeTarget) as any;
};
