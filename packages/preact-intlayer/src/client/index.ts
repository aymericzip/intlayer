/**
 * Client-side exports for internal package use.
 *
 * Note: This file is used by other packages that import from 'preact-intlayer/client'.
 * The main package index.ts imports directly from individual files to avoid circular dependencies.
 */

export {
  IntlayerClientContext,
  IntlayerProvider,
  IntlayerProviderContent,
  type IntlayerProviderProps,
  useIntlayerContext,
} from './IntlayerProvider';
export { t } from './t';
export { useDictionary } from './useDictionary';
export { useDictionaryAsync } from './useDictionaryAsync';
export { useDictionaryDynamic } from './useDictionaryDynamic';
export { useIntlayer } from './useIntlayer';
export { useLoadDynamic } from './useLoadDynamic';
export type { UseLocaleProps, UseLocaleResult } from './useLocale';
export { useLocale } from './useLocale';
export { useLocaleBase } from './useLocaleBase';
export {
  localeCookie,
  localeInStorage,
  setLocaleCookie,
  setLocaleInStorage,
  useLocaleCookie,
  useLocaleStorage,
} from './useLocaleStorage';
