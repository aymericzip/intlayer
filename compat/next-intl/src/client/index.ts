// Shared, framework-agnostic client hooks are reused from @intlayer/use-intl
// (next-intl is built on top of use-intl). They read the same intlayer client
// context that `NextIntlClientProvider` fills (next-intlayer re-exports
// `IntlayerClientContext` from react-intlayer).
export {
  _useExtracted as useExtracted,
  IntlProvider,
  useDictionary,
  useDictionaryDynamic,
  useFormatter,
  useMessages,
  useNow,
  useTimeZone,
  useTranslations,
} from '@intlayer/use-intl';
// Next.js-specific pieces stay local to @intlayer/next-intl.
export {
  NextIntlClientProvider,
  type NextIntlClientProviderProps,
} from './NextIntlClientProvider';
export { useLocale } from './useLocale';
