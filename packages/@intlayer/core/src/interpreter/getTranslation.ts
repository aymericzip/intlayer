import type { LocalesValues } from '@intlayer/config/client';
import configuration from '@intlayer/config/built';
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
  locale?: LocalesValues
): Content => {
  const { defaultLocale } = configuration?.internationalization;

  const result =
    languageContent[
      (locale ?? defaultLocale) as unknown as keyof typeof languageContent
    ] ??
    (languageContent[
      defaultLocale as unknown as keyof typeof languageContent
    ] as Content);

  return result;
};
