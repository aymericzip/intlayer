'use client';

import type { Locales } from '@intlayer/config/client';
import { useChangedContent } from '@intlayer/editor-react';
import { useContext } from 'react';
import { getDictionary } from '../getDictionary';
import {
  type DictionaryKeys,
  getIntlayer,
  type UseIntlayerEditable,
} from '../getIntlayer';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useIntlayer: UseIntlayerEditable = <T extends DictionaryKeys>(
  key: T,
  locale?: Locales,
  isRenderEditor = true
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const { changedContent } = useChangedContent();
  const localeTarget = locale ?? currentLocale;

  if (changedContent?.[key]) {
    return getDictionary(key, localeTarget, isRenderEditor);
  }

  return getIntlayer(key, localeTarget, isRenderEditor);
};
