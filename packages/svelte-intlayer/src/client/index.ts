// Export all client-side functionality for Svelte applications

// Locale management
export { getBrowserLocale } from './getBrowserLocale';
// Context and providers
export { getIntlayerContext, setIntlayerContext } from './intlayerContext';
// Type exports
export type { IntlayerStoreType } from './intlayerStore';
export { intlayerStore } from './intlayerStore';
// Core hooks
export { useDictionary } from './useDictionary';
export { useDictionaryAsync } from './useDictionaryAsync';
export { useDictionaryDynamic } from './useDictionaryDynamic';
export { useIntlayer } from './useIntlayer';
export { useLocale } from './useLocale';
