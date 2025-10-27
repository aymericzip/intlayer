'use client';

import { getTranslation } from '@intlayer/core';
import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';
import { useContext } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, this function returns the translation of the provided multilang content.
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const t = <Content = string>(
  multilangContent: StrictModeLocaleMap<Content>,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;

  return getTranslation<Content>(multilangContent, localeTarget);
};
