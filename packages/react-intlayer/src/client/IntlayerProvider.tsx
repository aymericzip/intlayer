'use client';

import configuration from '@intlayer/config/built';
import { localeResolver } from '@intlayer/core/localization';
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
 * Context that stores the current locale on the client side.
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeInStorage ?? configuration?.internationalization?.defaultLocale,
  setLocale: () => null,
  isCookieEnabled: true,
  disableEditor: false,
});

/**
 * Hook that provides the current Intlayer client context.
 *
 * @returns The current Intlayer context values.
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

/**
 * Props for the IntlayerProvider component.
 */
export type IntlayerProviderProps = PropsWithChildren<{
  /**
   * The locale to use. If not provided, it will be detected from storage or configuration.
   */
  locale?: LocalesValues;
  /**
   * The default locale to use as a fallback.
   */
  defaultLocale?: LocalesValues;
  /**
   * Function to set the locale.
   */
  setLocale?: (locale: LocalesValues) => void;
  /**
   * Whether to disable the editor.
   */
  disableEditor?: boolean;
  /**
   * Whether to enable cookies for storing the locale.
   */
  isCookieEnabled?: boolean;
}>;

/**
 * Provider that stores the current locale on the client side.
 *
 * This component is focused on content delivery without the editor features.
 *
 * @param props - The provider props.
 * @returns The provider component.
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

/**
 * Main provider for Intlayer in React applications.
 *
 * It includes the editor provider by default, allowing for live content editing
 * if configured.
 *
 * @param props - The provider props.
 * @returns The provider component with editor support.
 *
 * @example
 * ```tsx
 * import { IntlayerProvider } from 'react-intlayer';
 *
 * const App = () => (
 *   <IntlayerProvider>
 *     <MyComponent />
 *   </IntlayerProvider>
 * );
 * ```
 */
export const IntlayerProvider: FC<IntlayerProviderProps> = (props) => (
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
