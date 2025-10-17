'use client';

import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import { useContext, useMemo } from 'preact/hooks';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: LocalesValues
): DeepTransformContent<DictionaryRegistryContent<T>> => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);

  return useMemo(() => {
    const localeTarget = locale ?? currentLocale;

    // @ts-ignore Type instantiation is excessively deep and possibly infinite
    return getIntlayer<T, L>(key, localeTarget as L) as DeepTransformContent<
      DictionaryRegistryContent<T>
    >;
  }, [key, currentLocale, locale]);
};
