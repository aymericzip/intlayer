import type { IInterpreterPluginSolid } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginSolid<T> {}
}

export {
  getBrowserLocale,
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  localeCookie,
  setLocaleCookie,
  t,
  useDictionary,
  useDictionaryDynamic,
  useIntlayer,
  useIntlayerAsync,
  useIntlayerContext,
  useLoadDynamic,
  useLocale,
  useLocaleBase,
  useLocaleCookie,
  type IntlayerProviderProps,
} from './client/index';
export { type IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
