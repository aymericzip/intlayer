import { IInterpreterPluginReact } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginReact<T, S> {}
}

export {
  IntlayerProvider,
  IntlayerProviderContent,
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
export { type IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
