'use client';

import type { Locales } from '@intlayer/config/client';
import type { DeclarationContent } from '@intlayer/core';
import { useContext } from 'react';
import { useDictionaryBase, type UseDictionary } from '../useIntlayerBase';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionary: UseDictionary = <T extends DeclarationContent>(
  dictionary: T,
  locale?: Locales
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;

  return useDictionaryBase(dictionary, localeTarget);
};
