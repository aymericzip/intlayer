import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';

/**
 * Check if a value is a plain object that can be safely merged.
 * Returns false for Promises, React elements, class instances, etc.
 */
export const isMergeableTranslation = (value: unknown): boolean => {
  if (value === null || typeof value !== 'object') return false;
  // Framework nodes first: rendered leaves are often Proxies, and each probe
  // goes through their `get` trap
  if (
    (value as any).$$typeof !== undefined ||
    (value as any).__v_isVNode !== undefined ||
    (value as any)._isVNode !== undefined ||
    (value as any).isJSX !== undefined
  ) {
    return false;
  }
  if (typeof (value as any).then === 'function') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null || Array.isArray(value);
};

/**
 * Whether a higher-priority value still needs the lower-priority one: only a
 * missing value or a plain (non-array) object gets complemented.
 */
const needsComplement = (value: unknown): boolean =>
  value === undefined ||
  (!Array.isArray(value) && isMergeableTranslation(value));

/**
 * Recursively merges two objects. First argument takes precedence. Arrays
 * replace rather than merge.
 *
 * Keys resolve on first read: the values are often lazily transformed
 * dictionary nodes, and reading them up front would transform every leaf of
 * the fallback locale even when the target locale already covers it.
 */
const deepMerge = (target: any, source: any): any => {
  if (target === undefined) return source;
  if (source === undefined || !needsComplement(target)) return target;
  if (!isMergeableTranslation(source)) return target;

  const result: Record<string, any> = {};
  const keys = new Set([...Object.keys(target), ...Object.keys(source)]);

  for (const key of keys) {
    if (key === '__proto__' || key === 'constructor') continue;

    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get() {
        const targetValue = target[key];
        const value = needsComplement(targetValue)
          ? deepMerge(targetValue, source[key])
          : targetValue;

        Object.defineProperty(this, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true,
        });

        return value;
      },
    });
  }

  return result;
};

/**
 * Locales read by `getTranslation`, most specific first and deduplicated:
 * the locale, its base language, the fallback, and the fallback's base.
 */
export const getTranslationLocaleCandidates = (
  locale: LocalesValues,
  fallback?: LocalesValues
): string[] => {
  const locales: string[] = [];
  const addLocale = (candidate: string | undefined) => {
    if (candidate && !locales.includes(candidate)) locales.push(candidate);
  };

  addLocale(locale);
  if (locale.includes('-')) addLocale(locale.split('-')[0]);

  addLocale(fallback);
  if (fallback?.includes('-')) addLocale(fallback.split('-')[0]);

  return locales;
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
export const getTranslation = <const Content = string>(
  languageContent: StrictModeLocaleMap<Content>,
  locale: LocalesValues,
  fallback?: LocalesValues
): Content => {
  const get = (loc: string): Content | undefined =>
    languageContent[loc as keyof typeof languageContent];

  const locales = getTranslationLocaleCandidates(locale, fallback);

  // Collect results: strings exit early (if no higher-priority object was found),
  // objects are accumulated for deep merging.
  const results: Content[] = [];

  for (const localeEl of locales) {
    const val = get(localeEl);

    if (val === undefined) continue;
    if (typeof val === 'string') {
      if (results.length === 0) return val;
      continue; // an object at higher priority takes precedence
    }

    results.push(val);
  }

  if (results.length === 0) return undefined as Content;
  if (results.length === 1) return results[0]!;
  if (Array.isArray(results[0])) return results[0];

  // Merge objects: first result (most specific) takes precedence
  return (results as object[]).reduce((acc, curr) =>
    deepMerge(acc, curr)
  ) as Content;
};
