import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { LanguageContent } from '../types';

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
  locale?: LocalesValues,
  fallback: boolean = true
): Content => {
  const { defaultLocale } = configuration?.internationalization;

  let result =
    languageContent[
      (locale ?? defaultLocale) as unknown as keyof typeof languageContent
    ];

  if (fallback && !result) {
    result =
      languageContent[defaultLocale as unknown as keyof typeof languageContent];
  }

  return result as unknown as Content;
};
