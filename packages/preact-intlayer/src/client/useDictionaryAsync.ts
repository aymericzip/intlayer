'use client';

import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary, LanguageContent } from '@intlayer/core';
import { useContext } from 'preact/hooks';
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
  const localeTarget = locale ?? currentLocale;

  const dictionary = await dictionaryPromise[localeTarget]!();

  return useDictionary(dictionary, localeTarget) as T;
};
