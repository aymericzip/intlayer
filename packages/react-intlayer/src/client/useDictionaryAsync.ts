'use client';

import configuration from '@intlayer/config/built';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
import { useContext, useMemo } from 'react';
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

  return useDictionary<T, L>(dictionary, localeTarget as L) as any;
};
