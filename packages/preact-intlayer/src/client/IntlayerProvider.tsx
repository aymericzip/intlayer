import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import { localeResolver } from '@intlayer/core/localization';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import {
  type ComponentChild,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
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
  /**
   * Ambient variant applied to every dictionary read below this provider — for
   * a dimension that is fixed for the whole session (tenant, school type, plan
   * tier…) and that therefore no component should have to pass by hand.
   *
   * Accepts three forms:
   * - `variant="school1"` — one named variant for every key
   * - `variant={['school1', 'default']}` — an ordered preference chain: the
   *   first variant the key actually declares wins
   * - `variant={{ key1: 'school1', default: 'base' }}` — per dictionary key,
   *   with `default` covering every key not listed
   *
   * A plain object is always read as the per-key map. To pin a structured
   * variant globally, nest it: `variant={{ default: { id: 'prod_abc' } }}`.
   *
   * A call-site selector always wins.
   */
  variant?: ProviderVariant;
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
  variant,
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
        variant,
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
    <AnalyticsProvider />
    {children}
  </IntlayerProviderContent>
);
