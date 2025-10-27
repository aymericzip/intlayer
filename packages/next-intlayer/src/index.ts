export {
  IntlayerClientContext,
  type IntlayerNode,
  localeCookie,
  localeInStorage,
  MarkdownProvider,
  setLocaleCookie,
  setLocaleInStorage,
  t,
  useDictionary,
  useDictionaryAsync,
  useDictionaryDynamic,
  useI18n,
  useIntlayer,
  useLoadDynamic,
  useLocaleCookie,
  useLocaleStorage,
} from 'react-intlayer';
export {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
  useLocale,
  useLocalePageRouter,
} from './client/index';
export { generateStaticParams } from './generateStaticParams';
export type {
  LocalParams,
  LocalPromiseParams,
  Next14LayoutIntlayer,
  Next14PageIntlayer,
  Next15LayoutIntlayer,
  Next15PageIntlayer,
  NextLayoutIntlayer,
  NextPageIntlayer,
} from './types/index';
