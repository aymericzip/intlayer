'use client';

import { getConfiguration, type LocalesValues } from '@intlayer/config/client';
import {
  ChangedContentProvider,
  useCrossFrameState,
} from '@intlayer/editor-react';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { PoweredByMeta } from './PoweredByMeta';
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
  setLocale?: (locale: LocalesValues) => void;
  disableEditor?: boolean;
}>;

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
    (newLocale: LocalesValues) => {
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
    <IntlayerClientContext value={value}>
      <PoweredByMeta />
      {children}
    </IntlayerClientContext>
  );
};

export const IntlayerProvider: FC<IntlayerProviderProps> = (props) => (
  <ChangedContentProvider>
    <IntlayerEditorProvider>
      <IntlayerProviderContent {...props} />
    </IntlayerEditorProvider>
  </ChangedContentProvider>
);
