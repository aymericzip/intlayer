'use client';

import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import type { Dictionary, LanguageContent } from '@intlayer/core';
import { useContext, useMemo } from 'preact/hooks';
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
): Promise<T> => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);

  const localeTarget = useMemo(
    () =>
      locale ??
      currentLocale ??
      configuration?.internationalization.defaultLocale,
    [currentLocale, locale]
  );

  const dictionary = await useMemo(
    async () =>
      (await dictionaryPromise[
        localeTarget as keyof typeof dictionaryPromise
      ]?.()) as T,
    [dictionaryPromise, localeTarget]
  );

  return useDictionary(dictionary, localeTarget) as any;
};
