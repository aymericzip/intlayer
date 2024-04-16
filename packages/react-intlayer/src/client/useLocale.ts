'use client';

import { intlayerIntlConfiguration } from '@intlayer/config/client';
import { localeList } from '@intlayer/core';
import { useContext } from 'react';
import { LocaleClientContext } from './LocaleClientContextProvider';

const { defaultLocale, locales: availableLocales } = intlayerIntlConfiguration;

export const useLocale = () => {
  const { locale } = useContext(LocaleClientContext);

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    localeList, // List of all available locales
  };
};
