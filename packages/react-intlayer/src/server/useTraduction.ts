import type { Locales } from '@intlayer/config/client';
import type { LanguageContent } from '@intlayer/core';
import { getTranslation } from '../getTranslation';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, hook to get the translation content based on the locale
 *
 * If not locale found, it will return the content related to the default locale.
 *
 * Return either the content editor, or the content itself depending on the configuration.
 *
 * Usage:
 *
 * const content = getTranslation<string>({
 * en: 'Hello',
 * fr: 'Bonjour',
 * },
 * 'fr');
 * // 'Bonjour'
 *
 * Using TypeScript:
 * - this function will require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
export const useTraduction = <Content = string>(
  languageContent: LanguageContent<Content>
) => {
  const locale = getServerContext<Locales>(IntlayerServerContext);

  return getTranslation(languageContent, locale);
};
