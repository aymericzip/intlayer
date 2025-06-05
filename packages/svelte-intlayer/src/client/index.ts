// Export all client-side functionality for Svelte applications

// Core hooks
export { useDictionary } from './useDictionary';
export { useDictionaryDynamic } from './useDictionaryDynamic';
export { useIntlayer } from './useIntlayer';
export { useIntlayerAsync } from './useIntlayerAsync';

// Context and providers
export { getIntlayerContext, setIntlayerContext } from './intlayerContext';
export { intlayerStore } from './intlayerStore';

// Locale management
export { getBrowserLocale } from './getBrowserLocale';
export { useLocale } from './useLocale';

// Type exports
export type { IntlayerStoreType } from './intlayerStore';
