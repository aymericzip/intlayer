import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import { type LanguageContent, getTranslationContent } from '@intlayer/core';
import { contentRender } from './ContentEditor/contentRender';

/**
 *
 * Allow to pick a content based on a locale.
 * If not locale found, it will return the content related to the default locale.
 *
 * Return either the content editor, or the content itself depending on the configuration.
 *
 * Usage:
 *
 * ```ts
 * const content = getTranslation<string>({
 * en: 'Hello',
 * fr: 'Bonjour',
 * }, 'fr');
 * // 'Bonjour'
 * ```
 *
 * Using TypeScript:
 * - this function will require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
export const getTranslation = <Content = string>(
  languageContent: LanguageContent<Content>,
  locale?: Locales
): Content => {
  const { defaultLocale } = intlayerIntlConfiguration;

  const result: Content = getTranslationContent<Content>(
    languageContent,
    locale ?? defaultLocale
  );

  if (typeof result === 'string') {
    return contentRender(result) as Content;
  }

  return result;
};
