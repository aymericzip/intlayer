'use client';

import configuration from '@intlayer/config/built';
import { localeResolver } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import type { LocalesValues } from '@intlayer/types';
import {
  type ComponentChild,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext } from 'preact/hooks';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { useCrossFrameState } from '../editor/useCrossFrameState';
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
  disableEditor: false,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

export type IntlayerProviderProps = {
  children?: ComponentChild;
  locale?: LocalesValues;
  defaultLocale?: LocalesValues;
  setLocale?: (locale: LocalesValues) => void;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
};

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerProviderContent: FunctionComponent<
  IntlayerProviderProps
> = ({
  locale: localeProp,
  defaultLocale: defaultLocaleProp,
  children,
  setLocale: setLocaleProp,
  disableEditor,
  isCookieEnabled,
}) => {
  const { internationalization } = configuration ?? {};
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization ?? {};

  const defaultLocale =
    localeProp ?? localeInStorage ?? defaultLocaleProp ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = useCrossFrameState(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    defaultLocale
  );

  const setLocaleBase = (newLocale: LocalesValues) => {
    if (currentLocale.toString() === newLocale.toString()) return;

    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    setCurrentLocale(newLocale); // Update state
    setLocaleInStorage(newLocale, isCookieEnabled ?? true); // Optionally set cookie for persistence
  };

  const setLocale = setLocaleProp ?? setLocaleBase;

  const resolvedLocale = localeResolver(localeProp ?? currentLocale);

  return (
    <IntlayerClientContext.Provider
      value={{
        locale: resolvedLocale,
        setLocale,
        disableEditor,
        isCookieEnabled,
      }}
    >
      {children}
    </IntlayerClientContext.Provider>
  );
};

export const IntlayerProvider: FunctionComponent<IntlayerProviderProps> = (
  props
) => (
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
