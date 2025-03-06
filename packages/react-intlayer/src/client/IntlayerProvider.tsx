'use client';

import { getConfiguration, type LocalesValues } from '@intlayer/config/client';
import { useCrossFrameState } from '@intlayer/editor-react';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { PoweredByMeta } from './PoweredByMeta';
import { localeCookie, setLocaleCookie } from './useLocaleCookie';
import { localeResolver } from '@intlayer/core';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  disableEditor?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeCookie ?? getConfiguration().internationalization.defaultLocale,
  setLocale: () => null,
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
}) => {
  const { internationalization } = getConfiguration();
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization;

  const defaultLocale =
    localeProp ?? localeCookie ?? defaultLocaleProp ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = useCrossFrameState(
    'INTLAYER_CURRENT_LOCALE',
    defaultLocale
  );

  const setLocaleBase = (newLocale: LocalesValues) => {
    if (currentLocale.toString() === newLocale.toString()) return;

    if (!availableLocales.map(String).includes(newLocale)) {
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

export const IntlayerProvider: FC<IntlayerProviderProps> = (props) => (
  <IntlayerEditorProvider>
    <PoweredByMeta />
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
