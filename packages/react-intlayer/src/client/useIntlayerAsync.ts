'use client';

import type { Locales } from '@intlayer/config/client';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  DataFromDictionaryKey,
  type DictionaryKeys,
  getIntlayer,
} from '../getIntlayer';
import { getIntlayerAsync } from '../getIntlayerAsync';
import { IntlayerClientContext } from './IntlayerProvider';

export type UseIntlayerAsync = <
  T extends DictionaryKeys,
  L extends Locales,
  R extends boolean = true,
>(
  key: T,
  locale?: L,
  isRenderEditor?: R
) => DataFromDictionaryKey<T, L, R> & { isLoading: boolean };

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * This hook will prerender the locale dictionary and fetch simultaneously the distant dictionaries to hydrate it.
 *
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayerAsync: UseIntlayerAsync = <T extends DictionaryKeys>(
  key: T,
  locale?: Locales,
  isRenderEditor = true
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;
  const localeDictionary = getIntlayer(key, localeTarget, isRenderEditor);
  const [distantDictionary, setDistantDictionary] = useState<
    typeof localeDictionary | null | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getIntlayerAsync(key)
      .then((distantDictionary) => {
        if (distantDictionary) {
          setDistantDictionary(distantDictionary);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const dictionary = useMemo(
    () => distantDictionary ?? localeDictionary,
    [distantDictionary, localeDictionary]
  );

  return { ...dictionary, isLoading };
};
