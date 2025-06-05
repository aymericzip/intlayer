/** @jsx h */
/** @jsxFrag Fragment */
'use client';

import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { localeResolver } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import {
  type ComponentChild,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext } from 'preact/hooks';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { useCrossFrameState } from '../editor/useCrossFrameState';
import { localeCookie, setLocaleCookie } from './useLocaleCookie';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  disableEditor?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeCookie ?? configuration?.internationalization?.defaultLocale,
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
}) => {
  const { internationalization } = configuration ?? {};
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization ?? {};

  const defaultLocale =
    localeProp ?? localeCookie ?? defaultLocaleProp ?? defaultLocaleConfig;

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
    setLocaleCookie(newLocale); // Optionally set cookie for persistence
  };

  const setLocale = setLocaleProp ?? setLocaleBase;

  const resolvedLocale = localeResolver(localeProp ?? currentLocale);

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

export const IntlayerProvider: FunctionComponent<IntlayerProviderProps> = (
  props
) => (
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
