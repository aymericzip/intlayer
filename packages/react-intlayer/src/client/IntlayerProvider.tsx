'use client';

import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import { localeResolver } from '@intlayer/core/localization';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AnalyticsProvider } from '../analytics/AnalyticsProvider';
import { EditorProvider } from '../editor/EditorProvider';
import { localeInStorage, setLocaleInStorage } from './useLocaleStorage';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  /**
   * Ambient variant applied to every dictionary read below the provider, the
   * same way `locale` is. Overridden per call by an explicit selector.
   */
  variant?: ProviderVariant;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
};

/**
 * Context that stores the current locale on the client side.
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeInStorage ?? internationalization?.defaultLocale,
  setLocale: () => null,
  isCookieEnabled: true,
});

/**
 * Hook that provides the current Intlayer client context.
 *
 * @returns The current Intlayer context values.
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext) ?? {};

/**
 * Props for the IntlayerProvider component.
 */
export type IntlayerProviderProps = PropsWithChildren<{
  /**
   * The locale to use. If not provided, it will be detected from storage or configuration.
   */
  locale?: LocalesValues;
  /**
   * Ambient variant applied to every dictionary read below this provider — for
   * a dimension that is fixed for the whole session (tenant, school type, plan
   * tier…) and that therefore no component should have to pass by hand.
   *
   * Accepts three forms:
   * - `variant="school1"` — one named variant for every key
   * - `variant={['school1', 'default']}` — an ordered preference chain: the
   *   first variant the key actually declares wins
   * - `variant={{ key1: 'school1', key2: ['school1', 'default'], default: 'base' }}`
   *   — per dictionary key, with `default` covering every key not listed
   *
   * A plain object is always read as the per-key map. To pin a structured
   * variant globally, nest it: `variant={{ default: { id: 'prod_abc' } }}`.
   *
   * A call-site selector always wins: `useIntlayer('key', { variant: 'x' })`
   * replaces this default rather than extending it.
   */
  variant?: ProviderVariant;
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
  variant,
  children,
  setLocale: setLocaleProp,
  disableEditor,
  isCookieEnabled,
}) => {
  const { locales: availableLocales, defaultLocale: defaultLocaleConfig } =
    internationalization ?? {};

  const initialLocale =
    localeProp ?? localeInStorage ?? defaultLocaleProp ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] =
    useState<LocalesValues>(initialLocale);

  // Sync the prop to state if the prop changes from the parent
  useEffect(() => {
    if (localeProp && localeProp !== currentLocale) {
      setCurrentLocale(localeProp);
    }
  }, [localeProp]);

  useEffect(() => {
    setIntlayerIdentifier();
  }, []);

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
        variant,
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
export const IntlayerProvider: FC<IntlayerProviderProps> = ({
  children,
  ...props
}) => (
  <IntlayerProviderContent {...props}>
    <EditorProvider />
    <AnalyticsProvider />
    {children}
  </IntlayerProviderContent>
);
