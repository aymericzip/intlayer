import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';

/**
 * Check if a value is a plain object that can be safely merged.
 * Returns false for Promises, React elements, class instances, etc.
 */
const isPlainObject = (value: unknown): boolean => {
  if (value === null || typeof value !== 'object') return false;
  if (typeof (value as any).then === 'function') return false;
  if (
    (value as any).$$typeof !== undefined ||
    (value as any).__v_isVNode !== undefined ||
    (value as any)._isVNode !== undefined ||
    (value as any).isJSX !== undefined
  ) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null || Array.isArray(value);
};

/**
 * Recursively merges two objects, skipping undefined source values.
 * First argument takes precedence. Arrays replace rather than merge.
 */
const deepMerge = (target: any, source: any): any => {
  if (target === undefined) return source;
  if (source === undefined) return target;
  if (Array.isArray(target)) return target;
  if (isPlainObject(target) && isPlainObject(source)) {
    const result = { ...target };

    for (const key of Object.keys(source)) {
      if (
        key === '__proto__' ||
        key === 'constructor' ||
        source[key] === undefined
      )
        continue;
      result[key] =
        target[key] !== undefined
          ? deepMerge(target[key], source[key])
          : source[key];
    }
    return result;
  }
  return target;
};

/**
 * Picks the appropriate content from a locale map based on the provided locale.
 *
 * It handles:
 * 1. Exact locale match (e.g., 'en-US').
 * 2. Generic locale fallback (e.g., 'en' if 'en-US' is not found).
 * 3. Explicit fallback locale.
 * 4. Deep merging of objects to ensure partial translations are complemented by fallbacks.
 *
 * @param languageContent - A map of locales to content.
 * @param locale - The target locale to retrieve.
 * @param fallback - Optional fallback locale if the target is not found.
 * @returns The translated content.
 *
 * @example
 * ```ts
 * const content = getTranslation({
 *   en: 'Hello',
 *   fr: 'Bonjour',
 * }, 'fr');
 * // 'Bonjour'
 * ```
 */
export const getTranslation = <Content = string>(
  languageContent: StrictModeLocaleMap<Content>,
  locale: LocalesValues,
  fallback?: LocalesValues
): Content => {
  const get = (loc: string): Content | undefined =>
    languageContent[loc as keyof typeof languageContent];

  // Build priority-ordered locale candidates (most specific first), deduped
  const seen = new Set<string>();
  const locales: string[] = [];
  const addLocale = (loc: string | undefined) => {
    if (loc && !seen.has(loc)) {
      seen.add(loc);
      locales.push(loc);
    }
  };

  addLocale(locale);
  if (locale.includes('-')) addLocale(locale.split('-')[0]);

  addLocale(fallback);
  if (fallback?.includes('-')) addLocale(fallback.split('-')[0]);

  // Collect results: strings exit early (if no higher-priority object was found),
  // objects are accumulated for deep merging.
  const results: Content[] = [];

  for (const loc of locales) {
    const val = get(loc);

    if (val === undefined) continue;
    if (typeof val === 'string') {
      if (results.length === 0) return val;
      continue; // an object at higher priority takes precedence
    }

    results.push(val);
  }

  if (results.length === 0) return undefined as Content;
  if (results.length === 1) return results[0];
  if (Array.isArray(results[0])) return results[0];

  // Merge objects: first result (most specific) takes precedence
  return (results as object[]).reduce((acc, curr) =>
    deepMerge(acc, curr)
  ) as Content;
};
