'use client';

import { getConfiguration, type Locales } from '@intlayer/config/client';
import { ContentEditionLayout } from 'intlayer-editor';
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

export type IntlayerProviderProps = PropsWithChildren & {
  locale?: Locales;
  setLocale?: (locale: Locales) => void;
  editorEnabled?: boolean;
};

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerProvider: FC<IntlayerProviderProps> = ({
  locale,
  children,
  setLocale: setLocaleProp,
  editorEnabled,
}) => {
  const { defaultLocale, locales: availableLocales } =
    getConfiguration().internationalization;

  const [currentLocale, setCurrentLocale] = useState(
    locale ?? localeCookie ?? defaultLocale
  );

  const setLocaleBase = useCallback(
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

  const setLocale = setLocaleProp ?? setLocaleBase;

  const value: IntlayerValue = useMemo<IntlayerValue>(
    () => ({ locale: currentLocale, setLocale: setLocale }),
    [currentLocale, setLocale]
  );

  return (
    <IntlayerClientContext.Provider value={value}>
      <ContentEditionLayout
        locale={currentLocale}
        setLocale={setLocale}
        localeList={availableLocales}
        editorEnabled={editorEnabled}
      >
        {children}
      </ContentEditionLayout>
    </IntlayerClientContext.Provider>
  );
};
