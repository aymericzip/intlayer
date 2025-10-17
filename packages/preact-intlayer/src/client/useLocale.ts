'use client';

import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { useContext } from 'preact/hooks';
import { IntlayerClientContext } from './IntlayerProvider';
import { useLocaleCookie } from './useLocaleCookie';

type useLocaleProps = {
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocale = ({ onLocaleChange }: useLocaleProps = {}) => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  const { locale, setLocale: setLocaleState } = useContext(
    IntlayerClientContext
  );
  const { setLocaleCookie } = useLocaleCookie();

  const setLocale = (locale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(locale)) {
      console.error(`Locale ${locale} is not available`);
      return;
    }

    setLocaleState(locale);
    setLocaleCookie(locale);
    onLocaleChange?.(locale);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
