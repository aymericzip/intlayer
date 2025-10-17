import configuration from '@intlayer/config/built';
import { localeResolver } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import {
  type Component,
  createContext,
  createEffect,
  createSignal,
  type ParentProps,
  useContext,
} from 'solid-js';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { localeCookie, setLocaleCookie } from './useLocaleCookie';

type IntlayerValue = {
  locale: () => LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  disableEditor?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: () =>
    localeCookie ?? configuration?.internationalization?.defaultLocale,
  setLocale: () => null,
  disableEditor: false,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

export type IntlayerProviderProps = ParentProps<{
  locale?: LocalesValues;
  defaultLocale?: LocalesValues;
  setLocale?: (locale: LocalesValues) => void;
  disableEditor?: boolean;
}>;

/**
 * Provider that store the current locale on the client side
 */
export const IntlayerProviderContent: Component<IntlayerProviderProps> = (
  props
) => {
  const { internationalization } = configuration ?? {};
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization ?? {};

  const defaultLocale =
    props.locale ?? localeCookie ?? props.defaultLocale ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = createSignal(defaultLocale);

  // Handle cross-frame communication for locale synchronization
  createEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'INTLAYER_LOCALE_CHANGE') {
          const newLocale = event.data.locale;
          if (availableLocales?.includes(newLocale)) {
            setCurrentLocale(newLocale);
          }
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup function
      return () => window.removeEventListener('message', handleMessage);
    }
  });

  // Sync locale changes with other frames
  createEffect(() => {
    const locale = currentLocale();
    if (typeof window !== 'undefined') {
      window.postMessage(
        {
          type: 'INTLAYER_LOCALE_CHANGE',
          locale,
        },
        '*'
      );
    }
  });

  const setLocaleBase = (newLocale: LocalesValues) => {
    if (currentLocale().toString() === newLocale.toString()) return;

    if (!availableLocales?.map(String).includes(newLocale)) {
      console.error(`Locale ${newLocale} is not available`);
      return;
    }

    setCurrentLocale(newLocale); // Update state
    setLocaleCookie(newLocale); // Optionally set cookie for persistence
  };

  const setLocale = props.setLocale ?? setLocaleBase;

  // Use createMemo for derived reactive values
  const resolvedLocale = () => localeResolver(props.locale ?? currentLocale());

  return (
    <IntlayerClientContext.Provider
      value={{
        locale: resolvedLocale,
        setLocale,
        disableEditor: props.disableEditor,
      }}
    >
      {props.children}
    </IntlayerClientContext.Provider>
  );
};

export const IntlayerProvider: Component<IntlayerProviderProps> = (props) => (
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
