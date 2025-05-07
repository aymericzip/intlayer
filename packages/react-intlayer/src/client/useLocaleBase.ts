'use client';

import configuration from '@intlayer/config/built';
import { useContext } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';

const { defaultLocale, locales: availableLocales } =
  configuration.internationalization;

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocaleBase = () => {
  const { locale, setLocale } = useContext(IntlayerClientContext);

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
