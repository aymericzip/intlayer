import type { IInterpreterPluginSolid } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S, L> extends IInterpreterPluginSolid<T> {}
}

export {
  getBrowserLocale,
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
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
  useLocaleStorage,
} from './client/index';
export type { IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
