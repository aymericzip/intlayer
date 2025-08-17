/**
 * Client-side exports for internal package use.
 *
 * Note: This file is used by other packages that import from 'react-intlayer/client'.
 * The main package index.ts imports directly from individual files to avoid circular dependencies.
 */

export { getBrowserLocale } from './getBrowserLocale';
export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  useIntlayerContext,
  type IntlayerProviderProps,
} from './IntlayerProvider';
export { t } from './t';
export { useCompact } from './useCompact';
export { useCurrency } from './useCurrency';
export { useDate } from './useDate';
export { useDictionary } from './useDictionary';
export { useDictionaryAsync } from './useDictionaryAsync';
export { useDictionaryDynamic } from './useDictionaryDynamic';
export { useFormatter } from './useFormatter';
export { useI18n } from './useI18n';
export { useIntlayer } from './useIntlayer';
export { useList } from './useList';
export { useListFormatter } from './useListFormatter';
export { useLoadDynamic } from './useLoadDynamic';
export { useLocale } from './useLocale';
export { useLocaleBase } from './useLocaleBase';
export {
  localeCookie,
  setLocaleCookie,
  useLocaleCookie,
} from './useLocaleCookie';
export { useNumber } from './useNumber';
export { usePercentage } from './usePercentage';
export { useRelativeTime } from './useRelativeTime';
export { useUnit } from './useUnit';
