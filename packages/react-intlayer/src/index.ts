import type { IInterpreterPluginReact } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginReact<T> {}
}

// Import directly from individual files to avoid circular dependency issues
export { useFormatter } from './client//useFormatter';
export { useList } from './client//useList';
export { getBrowserLocale } from './client/getBrowserLocale';
export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  useIntlayerContext,
  type IntlayerProviderProps,
} from './client/IntlayerProvider';
export { t } from './client/t';
export { useCompact } from './client/useCompact';
export { useCurrency } from './client/useCurrency';
export { useDate } from './client/useDate';
export { useDictionary } from './client/useDictionary';
export { useDictionaryAsync } from './client/useDictionaryAsync';
export { useDictionaryDynamic } from './client/useDictionaryDynamic';
export { useI18n } from './client/useI18n';
export { useIntlayer } from './client/useIntlayer';
export { useListFormatter } from './client/useListFormatter';
export { useLoadDynamic } from './client/useLoadDynamic';
export { useLocale } from './client/useLocale';
export { useLocaleBase } from './client/useLocaleBase';
export {
  localeCookie,
  setLocaleCookie,
  useLocaleCookie,
} from './client/useLocaleCookie';
export { useNumber } from './client/useNumber';
export { usePercentage } from './client/usePercentage';
export { useRelativeTime } from './client/useRelativeTime';
export { useUnit } from './client/useUnit';

export { type IntlayerNode } from './IntlayerNode';
export { MarkdownProvider } from './markdown/index';
