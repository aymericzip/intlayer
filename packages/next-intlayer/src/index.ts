export {
  IntlayerClientContext,
  type IntlayerNode,
  MarkdownProvider,
  t,
  useDictionary,
  useDictionaryAsync,
  useDictionaryDynamic,
  useI18n,
  useIntlayer,
  useLoadDynamic,
  useLocaleCookie,
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
