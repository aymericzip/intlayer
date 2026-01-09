'use client';

import configuration from '@intlayer/config/built';
import { localeResolver } from '@intlayer/core';
import { MessageKey, useCrossFrameState } from '@intlayer/editor-react';
import type { LocalesValues } from '@intlayer/types';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { localeInStorage, setLocaleInStorage } from './useLocaleStorage';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeInStorage ?? configuration?.internationalization?.defaultLocale,
  setLocale: () => null,
  isCookieEnabled: true,
  disableEditor: false,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

export type IntlayerProviderProps = PropsWithChildren<{
  locale?: LocalesValues;
  defaultLocale?: LocalesValues;
  setLocale?: (locale: LocalesValues) => void;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
}>;

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerProviderContent: FC<IntlayerProviderProps> = ({
  locale: localeProp,
  defaultLocale: defaultLocaleProp,
  children,
  setLocale: setLocaleProp,
  disableEditor,
  isCookieEnabled,
}) => {
  const { internationalization } = configuration ?? {};
  const { locales: availableLocales, defaultLocale: defaultLocaleConfig } =
    internationalization ?? {};

  const initialLocale =
    localeProp ?? localeInStorage ?? defaultLocaleProp ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = useCrossFrameState(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    initialLocale
  );

  // Sync the prop to state if the prop changes from the parent
  useEffect(() => {
    if (localeProp && localeProp !== currentLocale) {
      setCurrentLocale(localeProp);
    }
  }, [localeProp]);

  const setLocaleBase = (newLocale: LocalesValues) => {
    if (currentLocale.toString() === newLocale.toString()) return;

    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    setCurrentLocale(newLocale);
    setLocaleInStorage(newLocale, isCookieEnabled);
  };

  const setLocale = setLocaleProp ?? setLocaleBase;

  // Resolve based on currentLocale (the state), not the prop directly
  const resolvedLocale = localeResolver(currentLocale);

  return (
    <IntlayerClientContext.Provider
      value={{
        locale: resolvedLocale,
        setLocale,
        disableEditor,
      }}
    >
      {children}
    </IntlayerClientContext.Provider>
  );
};

export const IntlayerProvider: FC<IntlayerProviderProps> = (props) => (
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
