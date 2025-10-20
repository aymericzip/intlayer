'use client';

import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import { useContext, useMemo } from 'react';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 *
 * When you need the raw string for attributes like `aria-label`, access the `.value` property of the returned content
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
): DeepTransformContent<DictionaryRegistryContent<T>> => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);

  return useMemo(() => {
    const localeTarget = locale ?? (currentLocale as L);

    return getIntlayer<T, L>(key, localeTarget);
  }, [key, currentLocale, locale]);
};
