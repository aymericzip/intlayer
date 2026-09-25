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
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'preact/hooks';
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
    setIntlayerIdentifier();
  }, []);

  // The prop wins over the state. It is read directly instead of being mirrored
  // into state by an effect, which re-rendered the subtree after every change.
  const activeLocale = localeProp ?? currentLocale;

  const setLocaleBase = useCallback(
    (newLocale: LocalesValues) => {
      if (activeLocale.toString() === newLocale.toString()) return;

      if (!availableLocales?.map(String).includes(newLocale)) {
        console.error(`Locale ${newLocale} is not available`);
        return;
      }

      setCurrentLocale(newLocale); // Update state
      setLocaleInStorage(newLocale, isCookieEnabled ?? true); // Optionally set cookie for persistence
    },
    [activeLocale, availableLocales, isCookieEnabled]
  );

  const setLocale = setLocaleProp ?? setLocaleBase;

  const resolvedLocale = localeResolver(activeLocale);

  // Stable value so a parent re-render does not re-render every consumer
  const contextValue = useMemo<IntlayerValue>(
    () => ({
      locale: resolvedLocale,
      setLocale,
      variant,
      isCookieEnabled,
    }),
    [resolvedLocale, setLocale, variant, isCookieEnabled]
  );

  return (
    <IntlayerClientContext.Provider value={contextValue}>
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
