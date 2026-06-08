import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import { localeResolver } from '@intlayer/core/localization';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  type ComponentChild,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { EditorProvider } from '../editor/EditorProvider';
import { localeInStorage, setLocaleInStorage } from './useLocaleStorage';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  isCookieEnabled?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeInStorage ?? internationalization?.defaultLocale,
  setLocale: () => null,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext) ?? {};

export type IntlayerProviderProps = {
  children?: ComponentChild;
  locale?: LocalesValues;
  defaultLocale?: LocalesValues;
  setLocale?: (locale: LocalesValues) => void;
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
  isCookieEnabled,
}) => {
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization ?? {};

  const defaultLocale =
    localeProp ?? localeInStorage ?? defaultLocaleProp ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = useState<LocalesValues>(
    defaultLocale as LocalesValues
  );

  useEffect(() => {
    if (localeProp && localeProp !== currentLocale) {
      setCurrentLocale(localeProp);
    }
  }, [localeProp, currentLocale, setCurrentLocale]);

  useEffect(() => {
    setIntlayerIdentifier();
  }, []);

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
        isCookieEnabled,
      }}
    >
      {children}
    </IntlayerClientContext.Provider>
  );
};

/**
 * Main provider for Intlayer in Preact applications.
 *
 * It provides the Intlayer context to your application, allowing the use
 * of hooks like `useIntlayer` and `useLocale`.
 *
 * @param props - The provider props.
 * @returns The provider component.
 *
 * @example
 * ```tsx
 * import { IntlayerProvider } from 'preact-intlayer';
 *
 * const App = () => (
 *   <IntlayerProvider>
 *     <MyComponent />
 *   </IntlayerProvider>
 * );
 * ```
 */
export const IntlayerProvider: FunctionComponent<IntlayerProviderProps> = ({
  children,
  ...props
}) => (
  <IntlayerProviderContent {...props}>
    <EditorProvider />
    {children}
  </IntlayerProviderContent>
);
