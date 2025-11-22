import type { IInterpreterPluginReact } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S, L> extends IInterpreterPluginReact<T> {}
}

// Import directly from individual files to avoid circular dependency issues
export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  useIntlayerContext,
} from './client/IntlayerProvider';
export { t } from './client/t';
export { useDictionary } from './client/useDictionary';
export { useDictionaryAsync } from './client/useDictionaryAsync';
export { useDictionaryDynamic } from './client/useDictionaryDynamic';
export { useI18n } from './client/useI18n';
export { useIntlayer } from './client/useIntlayer';
export { useLoadDynamic } from './client/useLoadDynamic';
export { useLocale } from './client/useLocale';
export { useLocaleBase } from './client/useLocaleBase';
export {
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
  useLocaleCookie,
  useLocaleStorage,
} from './client/useLocaleStorage';
export { getDictionary } from './getDictionary';
export { getIntlayer } from './getIntlayer';
export type { IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
