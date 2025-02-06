import { IntlayerNodeCond, ReactNodeCond } from './plugins';

export {
  IntlayerProvider,
  type IntlayerProviderProps,
  IntlayerClientContext,
  useIntlayer,
  useIntlayerAsync,
  useDictionary,
  useLocale,
  useLocaleCookie,
  useIntlayerContext,
  localeCookie,
  setLocaleCookie,
  getBrowserLocale,
  useLocaleBase,
  t,
} from './client/index';
export { type IntlayerNode } from './editor/renderContentEditor';
export * from './plugins';

declare module '@intlayer/core' {
  interface IPluginCond<T> {
    intlayerNode: IntlayerNodeCond<T>;
    reactNode: ReactNodeCond<T>;
  }
}
