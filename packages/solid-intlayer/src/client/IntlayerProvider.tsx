import configuration from '@intlayer/config/built';
import { localeResolver } from '@intlayer/core/localization';
import { MessageKey } from '@intlayer/types/messageKey';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  type Component,
  createContext,
  createEffect,
  createSignal,
  type ParentProps,
  useContext,
} from 'solid-js';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { localeCookie, setLocaleInStorage } from './useLocaleStorage';

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
  isCookieEnabled?: boolean;
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

  // Handle cross-frame locale synchronization (editor sends locale change)
  createEffect(() => {
    if (typeof window === 'undefined') return;
    const isInIframe = window.self !== window.top;
    if (!isInIframe) return;

    const { editor } = configuration ?? {};
    const allowedOrigins = [
      editor?.applicationURL,
      editor?.editorURL,
      editor?.cmsURL,
    ].filter(Boolean) as string[];

    const handler = (event: MessageEvent) => {
      if (
        allowedOrigins.length > 0 &&
        !allowedOrigins.some((origin) => event.origin === origin)
      )
        return;
      const msg = event.data as { type?: string; data?: unknown } | undefined;
      if (
        msg?.type === `${MessageKey.INTLAYER_CURRENT_LOCALE}/post` &&
        msg.data !== undefined
      ) {
        setCurrentLocale(msg.data as LocalesValues);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  });

  // Broadcast locale to editor frame whenever it changes
  createEffect(() => {
    const locale = currentLocale();
    if (typeof window === 'undefined') return;
    const isInIframe = window.self !== window.top;
    if (!isInIframe) return;
    const payload = {
      type: `${MessageKey.INTLAYER_CURRENT_LOCALE}/post`,
      data: locale,
    };
    window.parent?.postMessage(payload, '*');
    window.postMessage(payload, '*');
  });

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
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
