import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { LanguageContent, type Dictionary } from '@intlayer/core';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
import { useDictionary } from './useDictionary';
import { useLoadDynamic } from './useLoadDynamic';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionaryDynamic = <T extends Dictionary>(
  dictionaryPromise: LanguageContent<() => Promise<T>>,
  key: string,
  locale?: LocalesValues
) => {
  const localeTarget =
    locale ??
    getServerContext<LocalesValues>(IntlayerServerContext) ??
    configuration?.internationalization.defaultLocale;

  const dictionary = useLoadDynamic<T>(
    `${String(key)}.${localeTarget}`,
    dictionaryPromise[localeTarget]!()
  );

  return useDictionary(dictionary, localeTarget);
};
