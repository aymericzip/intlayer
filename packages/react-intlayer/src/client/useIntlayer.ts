'use client';

import type { Locales } from '@intlayer/config/client';
import { useContext } from 'react';
import {
  type DictionaryKeys,
  useIntlayerBase,
  type UseIntlayer,
} from '../useIntlayerBase';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: Locales
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;

  return useIntlayerBase(key, localeTarget);
};
