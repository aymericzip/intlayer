import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';

/**
 * Check if a value is a plain object that can be safely processed.
 * Returns false for Promises, React elements, class instances, etc.
 */
const isPlainObject = (value: unknown): boolean => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  // Don't process Promises (e.g., Next.js 15+ params)
  if (value instanceof Promise || typeof (value as any).then === 'function') {
    return false;
  }

  // Don't process React elements
  if ((value as any).$$typeof !== undefined) {
    return false;
  }

  // Only process plain objects and arrays
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null || Array.isArray(value);
};

/**
 * Recursively merges two objects.
 * Resembles the behavior of `defu` but respects `isPlainObject` to avoid merging React elements.
 * Arrays are replaced, not merged.
 */
const deepMergeObjects = (target: any, source: any): any => {
  if (target === undefined) return source;
  if (source === undefined) return target;

  if (Array.isArray(target)) return target;

  if (isPlainObject(target) && isPlainObject(source)) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (key === '__proto__' || key === 'constructor') continue;

      if (Object.hasOwn(target, key)) {
        result[key] = deepMergeObjects(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  return target;
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

  // Don't process non-plain objects (Promises, React elements, etc.)
  if (!isPlainObject(object)) {
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

  // Clean undefined values so they don't overwrite fallbacks
  // Order: [Target, Generic, Fallback, FallbackGeneric]
  // defu first argument takes precedence, so Target wins
  const cleanResults = results.map((item) => removeUndefinedValues(item));

  // If only one result, return it directly (no merging needed)
  if (cleanResults.length === 1) {
    return cleanResults[0];
  }

  // If the first result is an array, return it directly (arrays replace, don't merge)
  // defu would incorrectly convert arrays to objects with numeric keys
  if (Array.isArray(cleanResults[0])) {
    return cleanResults[0];
  }

  // Merge objects with custom merge - first argument takes precedence
  // Cast to object[] since by this point we've already returned early for strings, arrays, and single results
  return (cleanResults as object[]).reduce((acc, curr) =>
    deepMergeObjects(acc, curr)
  ) as Content;
};
