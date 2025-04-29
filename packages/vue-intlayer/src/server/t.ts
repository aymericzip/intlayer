import type { LocalesValues } from '@intlayer/config/client';
import { type LanguageContent, getTranslation } from '@intlayer/core';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, function to get the translation content based on the locale
 *
 * If no locale is found, it will return the content related to the default locale.
 *
 * Returns either the content editor, or the content itself depending on the configuration.
 *
 * @example
 * ```ts
 * const content = t({
 *   en: 'Hello',
 *   fr: 'Bonjour',
 * }, 'fr');
 * // 'Bonjour'
 * ```
 *
 * Using TypeScript:
 * - This function will require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
export const t = <Content = string>(
  multilangContent: LanguageContent<Content>,
  locale?: LocalesValues
) => {
  const currentLocale = getServerContext<LocalesValues>(IntlayerServerContext);
  const localeTarget = locale ?? currentLocale;

  return getTranslation<Content>(multilangContent, localeTarget);
};
