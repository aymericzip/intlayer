import type { IInterpreterPluginPreact } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S, L> extends IInterpreterPluginPreact<T> {}
}

export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  localeCookie,
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
export { getDictionary } from './getDictionary';
export { getIntlayer } from './getIntlayer';
export type { IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
