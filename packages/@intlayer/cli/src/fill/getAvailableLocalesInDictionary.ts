import type { Dictionary, Locale } from '@intlayer/types';

/**
 * Recursively traverses dictionary content to find all locales that have actual translations.
 * Returns a Set of locale strings that are present in the translation nodes.
 */
const extractLocalesFromContent = (
  content: any,
  locales: Set<Locale> = new Set()
): Set<Locale> => {
  if (!content || typeof content !== 'object') {
    return locales;
  }

  // Check if this is a translation node
  if (content.nodeType === 'translation' && content.translation) {
    // Add all locale keys from the translation map
    Object.keys(content.translation).forEach((locale) => {
      locales.add(locale as Locale);
    });
  }

  // Recursively check nested objects
  for (const value of Object.values(content)) {
    if (value && typeof value === 'object') {
      extractLocalesFromContent(value, locales);
    }
  }

  return locales;
};

/**
 * Gets all locales that have actual translations in the dictionary content.
 * Only returns locales that are present in at least one translation node.
 */
export const getAvailableLocalesInDictionary = (
  dictionary: Dictionary
): Locale[] => {
  const localesSet = extractLocalesFromContent(dictionary.content);
  return Array.from(localesSet);
};
