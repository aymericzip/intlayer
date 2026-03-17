import configuration from '@intlayer/config/built';
import { localeResolver } from '@intlayer/core/localization';
import { MessageKey } from '@intlayer/types/messageKey';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  type ComponentChild,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { IntlayerEditorProvider } from '../editor/IntlayerEditorProvider';
import { localeInStorage, setLocaleInStorage } from './useLocaleStorage';

type IntlayerValue = {
  locale: LocalesValues;
  setLocale: (newLocale: LocalesValues) => void;
  disableEditor?: boolean;
  isCookieEnabled?: boolean;
};

/**
 * Context that store the current locale on the client side
 */
export const IntlayerClientContext = createContext<IntlayerValue>({
  locale: localeInStorage ?? configuration?.internationalization?.defaultLocale,
  setLocale: () => null,
  disableEditor: false,
});

/**
 * Hook that provides the current locale
 */
export const useIntlayerContext = () => useContext(IntlayerClientContext);

export type IntlayerProviderProps = {
  children?: ComponentChild;
  locale?: LocalesValues;
  defaultLocale?: LocalesValues;
  setLocale?: (locale: LocalesValues) => void;
  disableEditor?: boolean;
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
  disableEditor,
  isCookieEnabled,
}) => {
  const { internationalization } = configuration ?? {};
  const { defaultLocale: defaultLocaleConfig, locales: availableLocales } =
    internationalization ?? {};

  const defaultLocale =
    localeProp ?? localeInStorage ?? defaultLocaleProp ?? defaultLocaleConfig;

  const [currentLocale, setCurrentLocale] = useState<LocalesValues>(
    defaultLocale as LocalesValues
  );

  // Cross-frame locale synchronization (editor iframe support)
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isInIframe = window.self !== window.top;
    if (!isInIframe) return;
    const payload = {
      type: `${MessageKey.INTLAYER_CURRENT_LOCALE}/post`,
      data: currentLocale,
    };
    window.parent?.postMessage(payload, '*');
    window.postMessage(payload, '*');
  }, [currentLocale]);

  useEffect(() => {
    if (localeProp && localeProp !== currentLocale) {
      setCurrentLocale(localeProp);
    }
  }, [localeProp, currentLocale, setCurrentLocale]);

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
        disableEditor,
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
export const IntlayerProvider: FunctionComponent<IntlayerProviderProps> = (
  props
) => (
  <IntlayerEditorProvider>
    <IntlayerProviderContent {...props} />
  </IntlayerEditorProvider>
);
