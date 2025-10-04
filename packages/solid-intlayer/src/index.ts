import type { IInterpreterPluginSolid } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginSolid<T> {}
}

export {
  getBrowserLocale,
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  localeCookie,
  setLocaleCookie,
  t,
  useDictionary,
  useDictionaryAsync,
  useDictionaryDynamic,
  useIntlayer,
  useIntlayerContext,
  useLoadDynamic,
  useLocale,
  useLocaleBase,
  useLocaleCookie,
} from './client/index';
export type { IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
