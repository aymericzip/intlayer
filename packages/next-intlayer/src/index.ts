export {
  getTranslation,
  IntlayerClientContext,
  useIntlayer,
  useTraduction,
  useDictionary,
  useLocaleCookie,
  type IntlayerNode,
  t,
} from 'react-intlayer';
export { generateStaticParams } from './generateStaticParams';
export type {
  LocalParams,
  Next14PageIntlayer,
  Next15PageIntlayer,
  NextPageIntlayer,
  NextLayoutIntlayer,
  LocalPromiseParams,
} from './types/index';
export {
  useLocale,
  useLocalePageRouter,
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from './client/index';
