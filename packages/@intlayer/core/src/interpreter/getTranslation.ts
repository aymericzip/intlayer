import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';

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
  languageContent: StrictModeLocaleMap<Content>,
  locale: LocalesValues,
  fallback?: LocalesValues
): Content => {
  let result = languageContent[locale as keyof typeof languageContent];

  if (fallback && !result) {
    result = languageContent[fallback as keyof typeof languageContent];
  }

  return result as unknown as Content;
};
