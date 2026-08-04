import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import { localeResolver } from '@intlayer/core/localization';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import {
  type Component,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  lazy,
  on,
  onMount,
  type ParentProps,
  Suspense,
  untrack,
  useContext,
} from 'solid-js';
import { localeInStorage, setLocaleInStorage } from './useLocaleStorage';

const LazyEditorProvider =
  process.env.INTLAYER_EDITOR_ENABLED !== 'false'
    ? lazy(() =>
        import('../editor/EditorProvider').then((m) => ({
          default: m.EditorProvider,
        }))
      )
    : null;

const LazyAnalyticsProvider =
  process.env.INTLAYER_ANALYTICS_ENABLED !== 'false'
    ? lazy(() =>
        import('../analytics/AnalyticsProvider').then((m) => ({
          default: m.AnalyticsProvider,
        }))
      )
    : null;

export type IntlayerValue = {
  locale: () => LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  /**
   * Ambient variant applied to every dictionary read below the provider, the
   * same way `locale` is. Read through an accessor so a variant changing at
   * runtime re-runs the memos that depend on it.
   */
  variant?: () => ProviderVariant | undefined;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: () => localeInStorage ?? internationalization?.defaultLocale,
  setLocale: () => null,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext) ?? {};

export type IntlayerProviderProps = ParentProps<{
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
}>;

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerProviderContent: Component<IntlayerProviderProps> = (
  props
) => {
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization ?? {};

  const defaultLocale =
    props.locale ??
    localeInStorage ??
    props.defaultLocale ??
    defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = createSignal(defaultLocale);

  const setLocaleBase = (newLocale: LocalesValues) => {
    if (currentLocale().toString() === newLocale.toString()) return;

    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    setCurrentLocale(newLocale); // Update state
    setLocaleInStorage(newLocale, props.isCookieEnabled); // Optionally set cookie for persistence
  };

  const setLocale = props.setLocale ?? setLocaleBase;

  // Use createMemo for derived reactive values
  const locale = createMemo(() => localeResolver(currentLocale()));

  createEffect(
    on(
      () => props.locale,
      (newPropLocale) => {
        if (newPropLocale && newPropLocale !== untrack(currentLocale)) {
          setCurrentLocale(newPropLocale);
        }
      },
      { defer: true }
    )
  );

  onMount(() => {
    setIntlayerIdentifier();
  });

  return (
    <IntlayerClientContext.Provider
      value={{
        locale,
        setLocale,
        // Kept as an accessor so reading it stays reactive to the prop.
        variant: () => props.variant,
      }}
    >
      {props.children}
    </IntlayerClientContext.Provider>
  );
};

/**
 * Main provider for Intlayer in Solid applications.
 *
 * It provides the Intlayer context to your application, allowing the use
 * of hooks like `useIntlayer` and `useLocale`.
 *
 * @param props - The provider props.
 * @returns The provider component.
 *
 * @example
 * ```tsx
 * import { IntlayerProvider } from 'solid-intlayer';
 *
 * const App = () => (
 *   <IntlayerProvider>
 *     <MyComponent />
 *   </IntlayerProvider>
 * );
 * ```
 */
export const IntlayerProvider: Component<IntlayerProviderProps> = (props) => (
  <IntlayerProviderContent {...props}>
    {process.env.INTLAYER_EDITOR_ENABLED !== 'false' && LazyEditorProvider && (
      <Suspense>
        <LazyEditorProvider />
      </Suspense>
    )}
    {process.env.INTLAYER_ANALYTICS_ENABLED !== 'false' &&
      LazyAnalyticsProvider && (
        <Suspense>
          <LazyAnalyticsProvider />
        </Suspense>
      )}
    {props.children}
  </IntlayerProviderContent>
);
