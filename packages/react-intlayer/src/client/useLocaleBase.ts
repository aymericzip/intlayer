'use client';

import { getConfiguration } from '@intlayer/config/client';
import { localeList } from '@intlayer/core';
import { useContext } from 'react';
import { IntlayerClientContext } from './IntlayerClientProvider';

const { defaultLocale, locales: availableLocales } =
  getConfiguration().internationalization;

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocaleBase = () => {
  const { locale, setLocale } = useContext(IntlayerClientContext);

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    localeList, // List of all available locales
    setLocale, // Function to set the locale
  };
};
