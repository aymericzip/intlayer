'use client';

import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { useContext } from 'preact/hooks';
import { IntlayerClientContext } from './IntlayerProvider';
import { setLocaleInStorage } from './useLocaleStorage';

type useLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: useLocaleProps = {}) => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  const {
    locale,
    setLocale: setLocaleState,
    isCookieEnabled: isCookieEnabledContext,
  } = useContext(IntlayerClientContext);

  const setLocale = (locale: LocalesValues) => {
    if (!availableLocales?.map(String).includes(locale)) {
      console.error(`Locale ${locale} is not available`);
      return;
    }

    setLocaleState(locale);

    setLocaleInStorage(
      locale,
      isCookieEnabled ?? isCookieEnabledContext ?? true
    );

    onLocaleChange?.(locale);
  };

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  };
};
