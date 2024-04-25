'use client';

import { getConfiguration, type Locales } from '@intlayer/config/client';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  type FC,
  useState,
  useCallback,
} from 'react';
import { localeCookie, setLocaleCookie } from './useLocaleCookie';

type IntlayerValue = {
  locale: Locales;
  setLocale: (newLocale: Locales) => void;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeCookie ?? getConfiguration().internationalization.defaultLocale,
  setLocale: () => null,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

export type IntlayerClientProviderProps = PropsWithChildren & {
  locale?: Locales;
};

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerClientProvider: FC<IntlayerClientProviderProps> = ({
  locale,
  children,
}) => {
  const { defaultLocale, locales: availableLocales } =
    getConfiguration().internationalization;

  const [currentLocale, setCurrentLocale] = useState(
    locale ?? localeCookie ?? defaultLocale
  );

  const setLocale = useCallback(
    (newLocale: Locales) => {
      if (currentLocale.toString() === newLocale.toString()) return;

      if (!availableLocales.includes(newLocale)) {
        console.error(`Locale ${locale} is not available`);
        return;
      }

      setCurrentLocale(newLocale); // Update state
      setLocaleCookie(newLocale); // Optionally set cookie for persistence
    },
    [availableLocales, currentLocale, locale]
  );

  const value: IntlayerValue = useMemo<IntlayerValue>(
    () => ({ locale: currentLocale, setLocale }),
    [currentLocale, setLocale]
  );

  return (
    <IntlayerClientContext.Provider value={value}>
      {children}
    </IntlayerClientContext.Provider>
  );
};
