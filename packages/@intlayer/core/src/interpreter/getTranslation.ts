import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';

/**
 * Deep merges two objects, filling undefined values in target with values from source.
 * Only fills in undefined values, preserving all existing values in target.
 */
const deepMergeUndefined = <T>(target: T, source: T): T => {
  // If target is undefined, return source
  if (target === undefined) {
    return source;
  }

  // If source is undefined or target is not an object, return target
  if (
    source === undefined ||
    typeof target !== 'object' ||
    target === null ||
    typeof source !== 'object' ||
    source === null
  ) {
    return target;
  }

  // Handle arrays
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.map((item, index) =>
      deepMergeUndefined(item, source[index])
    ) as T;
  }

  // Handle objects
  const result = { ...target } as Record<string, unknown>;
  for (const key of Object.keys(source as object)) {
    const targetValue = (target as Record<string, unknown>)[key];
    const sourceValue = (source as Record<string, unknown>)[key];
    result[key] = deepMergeUndefined(targetValue, sourceValue);
  }
  return result as T;
};

/**
 * Tries to get content for a locale, including trying the base locale subtag.
 * Returns undefined if not found.
 */
const getLocaleContent = <Content>(
  languageContent: StrictModeLocaleMap<Content>,
  locale: LocalesValues
): Content | undefined => {
  let result = languageContent[locale as keyof typeof languageContent];

  // Try base locale subtag (e.g., 'en' from 'en-GB')
  if (locale.includes('-') && result === undefined) {
    const baseLocale = locale.split('-')[0];
    result = languageContent[baseLocale as keyof typeof languageContent];
  }

  return result;
};

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
  const localeContent = getLocaleContent(languageContent, locale);
  const fallbackContent = fallback
    ? getLocaleContent(languageContent, fallback)
    : undefined;

  // If we have locale content
  if (localeContent !== undefined) {
    // Deep merge with fallback to fill undefined nested values
    if (fallbackContent !== undefined) {
      return deepMergeUndefined(localeContent, fallbackContent);
    }
    return localeContent as Content;
  }

  // If locale content not found, use fallback
  if (fallbackContent !== undefined) {
    return fallbackContent as Content;
  }

  // Return undefined instead of throwing when no translation found
  return undefined as Content;
};
