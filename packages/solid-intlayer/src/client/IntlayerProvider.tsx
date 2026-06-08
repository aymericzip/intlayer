import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import { localeResolver } from '@intlayer/core/localization';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
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
  process.env['INTLAYER_EDITOR_ENABLED'] !== 'false'
    ? lazy(() =>
        import('../editor/EditorProvider').then((m) => ({
          default: m.EditorProvider,
        }))
      )
    : null;

type IntlayerValue = {
  locale: () => LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
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
    {process.env['INTLAYER_EDITOR_ENABLED'] !== 'false' &&
      LazyEditorProvider && (
        <Suspense>
          <LazyEditorProvider />
        </Suspense>
      )}
    {props.children}
  </IntlayerProviderContent>
);
