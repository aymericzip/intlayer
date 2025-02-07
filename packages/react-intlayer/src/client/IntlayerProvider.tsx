'use client';

import { getConfiguration, type Locales } from '@intlayer/config/client';
import {
  ChangedContentProvider,
  useCrossFrameState,
} from '@intlayer/editor-react';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  type FC,
  useCallback,
} from 'react';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { PoweredByMeta } from './PoweredByMeta';
import { localeCookie, setLocaleCookie } from './useLocaleCookie';

type IntlayerValue = {
  locale: Locales | `${Locales}`;
  setLocale: (newLocale: Locales | `${Locales}`) => void;
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

export type IntlayerProviderProps = PropsWithChildren & {
  locale?: Locales | `${Locales}`;
  setLocale?: (locale: Locales | `${Locales}`) => void;
  disableEditor?: boolean;
};

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerProviderContent: FC<IntlayerProviderProps> = ({
  locale,
  children,
  setLocale: setLocaleProp,
  disableEditor,
}) => {
  const { internationalization } = getConfiguration();
  const { defaultLocale, locales: availableLocales } = internationalization;

  const [currentLocale, setCurrentLocale] = useCrossFrameState(
    'INTLAYER_CURRENT_LOCALE',
    locale ?? localeCookie ?? defaultLocale
  );

  const setLocaleBase = useCallback(
    (newLocale: Locales | `${Locales}`) => {
      if (currentLocale.toString() === newLocale.toString()) return;

      if (!availableLocales.map(String).includes(newLocale)) {
        console.error(`Locale ${locale} is not available`);
        return;
      }

      setCurrentLocale(newLocale); // Update state
      setLocaleCookie(newLocale); // Optionally set cookie for persistence
    },
    [availableLocales, currentLocale, locale, setCurrentLocale]
  );

  const setLocale = useMemo(
    () => setLocaleProp ?? setLocaleBase,
    [setLocaleProp, setLocaleBase]
  );

  const value: IntlayerValue = useMemo<IntlayerValue>(
    () => ({ locale: currentLocale, setLocale, disableEditor }),
    [currentLocale, setLocale, disableEditor]
  );

  return (
    <IntlayerClientContext.Provider value={value}>
      <PoweredByMeta />
      {children}
    </IntlayerClientContext.Provider>
  );
};

export const IntlayerProvider: FC<IntlayerProviderProps> = (props) => (
  <ChangedContentProvider>
    <IntlayerEditorProvider>
      <IntlayerProviderContent {...props} />
    </IntlayerEditorProvider>
  </ChangedContentProvider>
);
