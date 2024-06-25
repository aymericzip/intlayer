export {
  getTranslation,
  IntlayerClientContext,
  useIntlayer,
  useTraduction,
  useLocaleCookie,
  type IntlayerNode,
} from 'react-intlayer';
export { generateStaticParams } from './generateStaticParams';
export type { LocalParams, NextPageIntlayer } from './types/index';
export {
  useLocale,
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from './client/index';
