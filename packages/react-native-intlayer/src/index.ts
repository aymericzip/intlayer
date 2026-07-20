// Must stay first: installs the React Native polyfills before `react-intlayer`
// module scope runs. See `applyIntlayerPolyfill.ts`.
import './applyIntlayerPolyfill';

// Re-export everything an app needs from `react-intlayer` so that a React
// Native app only ever imports from `react-native-intlayer`. The
// `IntlayerProvider` is intentionally omitted here because it is overridden
// below by the React Native variant (which applies the required polyfills).
export {
  getDictionary,
  getIntlayer,
  IntlayerClientContext,
  type IntlayerNode,
  IntlayerProviderContent,
  localeInStorage,
  setLocaleInStorage,
  t,
  type UseLocaleProps,
  type UseLocaleResult,
  useDictionary,
  useDictionaryAsync,
  useDictionaryDynamic,
  useI18n,
  useIntl,
  useIntlayer,
  useIntlayerContext,
  useLoadDynamic,
  useLocale,
  useLocaleBase,
  useLocaleCookie,
  useLocaleStorage,
  useRewriteURL,
} from 'react-intlayer';

export * from './intlayerPolyfill';
// `IntlayerProvider` exported here overrides the one from `react-intlayer`.
export * from './intlayerProvider';
