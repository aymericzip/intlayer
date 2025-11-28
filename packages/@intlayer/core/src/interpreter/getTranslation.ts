import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';
import deepMerge from 'deepmerge';

/**
 * Check if a value is a plain object that can be safely merged.
 * Returns false for Promises, React elements, class instances, etc.
 */
const isMergeableObject = (value: unknown): boolean => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  // Don't merge Promises (e.g., Next.js 15+ params)
  if (value instanceof Promise || typeof (value as any).then === 'function') {
    return false;
  }

  // Don't merge React elements
  if ((value as any).$$typeof !== undefined) {
    return false;
  }

  // Only merge plain objects and arrays
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null || Array.isArray(value);
};

/**
 * Recursively removes undefined values from an object.
 * Handles circular references by tracking visited objects.
 */
const removeUndefinedValues = <T>(
  object: T,
  visited = new WeakSet<object>()
): T => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  // Handle circular references - return original to avoid infinite recursion
  if (visited.has(object)) {
    return object;
  }
  visited.add(object);

  // Don't process non-mergeable objects (Promises, React elements, etc.)
  if (!isMergeableObject(object)) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((item) => removeUndefinedValues(item, visited)) as T;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) {
      result[key] = removeUndefinedValues(value, visited);
    }
  }
  return result as T;
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
  const results: Content[] = [];

  const getContent = (loc: string) =>
    languageContent[loc as keyof typeof languageContent];

  // 1. Get Target Content
  const content = getContent(locale);
  if (typeof content === 'string') {
    return content;
  } else if (content !== undefined) {
    results.push(content);
  }

  // 2. Get Target Generic Content (e.g. 'en' from 'en-US')
  if (locale.includes('-')) {
    const genericLocale = locale.split('-')[0];
    if (genericLocale in languageContent) {
      const genericContent = getContent(genericLocale);

      if (typeof genericContent === 'string') {
        // If we haven't found specific content yet, return generic string
        if (results.length === 0) return genericContent;
      } else if (genericContent !== undefined) {
        results.push(genericContent);
      }
    }
  }

  // 3. Get Fallback Content
  if (fallback !== undefined && fallback !== locale) {
    // 3a. Fallback Specific
    if (fallback in languageContent) {
      const fallbackContent = getContent(fallback);

      if (typeof fallbackContent === 'string') {
        if (results.length === 0) return fallbackContent;
      } else if (fallbackContent !== undefined) {
        results.push(fallbackContent);
      }
    }

    // 3b. Fallback Generic (The missing piece: e.g. 'en' from 'en-GB' fallback)
    if (fallback.includes('-')) {
      const genericFallback = fallback.split('-')[0];
      const genericLocale = locale.split('-')[0];

      // Only add if it's different from the target generic (to avoid duplication)
      // and exists in the dictionary
      if (
        genericFallback !== genericLocale &&
        genericFallback in languageContent
      ) {
        const genericFallbackContent = getContent(genericFallback);

        if (typeof genericFallbackContent === 'string') {
          if (results.length === 0) return genericFallbackContent;
        } else if (genericFallbackContent !== undefined) {
          results.push(genericFallbackContent);
        }
      }
    }
  }

  if (results.length === 0) {
    return undefined as Content;
  }

  // Reverse so precedence is correct for deepmerge:
  // [FallbackGeneric, Fallback, Generic, Target]
  // deepmerge.all applies right-most on top of others.
  results.reverse();

  // Clean undefined values so they don't overwrite fallbacks
  const cleanResults = results.map((item) => removeUndefinedValues(item));

  // Merge with array overwrite strategy and safe object checking
  return deepMerge.all(cleanResults, {
    arrayMerge: (_destinationArray, sourceArray) => sourceArray,
    isMergeableObject,
  }) as Content;
};
