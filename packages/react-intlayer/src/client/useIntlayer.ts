'use client';

import type { Locales } from '@intlayer/config/client';
import { useChangedContent } from '@intlayer/editor-react';
import { useContext } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';
import { type DictionaryKeys } from '@intlayer/core';
import { getDictionary } from '../getDictionary';
import { getIntlayer } from '../getIntlayer';
// @ts-ignore intlayer declared for module augmentation
import { IntlayerDictionaryTypesConnector } from 'intlayer';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: Locales,
  isRenderEditor = true
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const { changedContent } = useChangedContent();
  const localeTarget = locale ?? currentLocale;

  if (changedContent?.[key]) {
    return getDictionary(
      changedContent?.[key] as IntlayerDictionaryTypesConnector[T],
      localeTarget
    );
  }

  return getIntlayer(key, localeTarget);
};
