export { useDictionary } from '../useDictionary';
export { useDictionaryDynamic } from '../useDictionaryDynamic';
export { useFormatter, useMessages, useNow, useTimeZone } from './helpers';
export { IntlProvider, type IntlProviderProps } from './IntlProvider';
export { useLocale } from './useLocale';
export { useTranslations } from './useTranslations';

/**
 * @internal Private use-intl export, kept so aliased `_useExtracted` imports
 * resolve. Not part of the supported public surface.
 */
export const _useExtracted = (): Record<string, never> => ({});
