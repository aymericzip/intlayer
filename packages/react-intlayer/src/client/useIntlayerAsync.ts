'use client';

import type { LocalesValues } from '@intlayer/config/client';
import {
  type DictionaryKeys,
  getIntlayer,
  getIntlayerAsync,
} from '@intlayer/core';
import { useContext, useEffect, useMemo, useState } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * This hook will prerender the locale dictionary and fetch simultaneously the distant dictionaries to hydrate it.
 *
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayerAsync = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;
  const localeDictionary = getIntlayer(key, localeTarget);
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

  return { ...(dictionary as object), isLoading } as typeof localeDictionary & {
    isLoading: boolean;
  };
};
