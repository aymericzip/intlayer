'use client';

import configuration from '@intlayer/config/built';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
import { useCallback, useContext } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';
import { setLocaleInStorage } from './useLocaleStorage';

type UseLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

type UseLocaleResult = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
  setLocale: (locale: LocalesValues) => void;
};

/**
 * On the client side, hook to get the current locale and all related fields
 */
export const useLocale = ({
  isCookieEnabled,
  onLocaleChange,
}: UseLocaleProps = {}): UseLocaleResult => {
  const { defaultLocale, locales: availableLocales } =
    configuration?.internationalization ?? {};

  const {
    locale,
    setLocale: setLocaleState,
    isCookieEnabled: isCookieEnabledContext,
  } = useContext(IntlayerClientContext);

  const setLocale = useCallback(
    (locale: LocalesValues) => {
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
    },
    [availableLocales, onLocaleChange, setLocaleState, isCookieEnabled]
  );

  return {
    locale, // Current locale
    defaultLocale, // Principal locale defined in config
    availableLocales, // List of the available locales defined in config
    setLocale, // Function to set the locale
  } as UseLocaleResult;
};
