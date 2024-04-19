'use client';

import type { Locales } from '@intlayer/config/client';
import { useContext } from 'react';
import {
  type DictionaryKeys,
  useIntlayerBase,
  type UseIntlayer,
} from '../useIntlayerBase';
import { LocaleClientContext } from './LocaleClientContextProvider';

/**
 * On the client side, Hook that picking one dictionary by its id and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const { locale: currentLocale } = useContext(LocaleClientContext);
  const localeTarget = locale ?? currentLocale;

  return useIntlayerBase(id, localeTarget);
};
