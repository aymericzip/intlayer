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
 *
 * Copy-on-write: an object the source adds nothing to is returned as-is, so a
 * complete translation costs a read-only walk instead of a full copy.
 */
const deepMerge = (target: any, source: any): any => {
  if (target === undefined) return source;
  if (source === undefined) return target;
  if (Array.isArray(target)) return target;
  if (!isPlainObject(target) || !isPlainObject(source)) return target;

  let result = target;

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];

    if (
      key === '__proto__' ||
      key === 'constructor' ||
      sourceValue === undefined
    )
      continue;

    const targetValue = target[key];

    // Only objects need a recursive merge: a primitive the target holds wins
    const merged =
      targetValue === undefined
        ? sourceValue
        : typeof targetValue === 'object'
          ? deepMerge(targetValue, sourceValue)
          : targetValue;

    if (merged === targetValue) continue;

    if (result === target) result = { ...target };
    result[key] = merged;
  }

  return result;
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
  const get = (localeEl: string): Content | undefined =>
    languageContent[localeEl as keyof typeof languageContent];

  // Fast path for the common case: a string for the exact locale always wins,
  // so the candidate chain below would return it anyway.
  const exactMatch = get(locale);
  if (typeof exactMatch === 'string') return exactMatch;

  // Priority-ordered locale candidates, most specific first
  const candidates = [
    locale,
    locale.split('-')[0],
    fallback,
    fallback?.split('-')[0],
  ];

  // Strings exit early (unless a higher-priority object was found), objects
  // are accumulated for deep merging
  const results: Content[] = [];

  for (let index = 0; index < candidates.length; index++) {
    const candidate = candidates[index];

    // Skip empty and repeated candidates
    if (!candidate || candidates.indexOf(candidate) < index) continue;

    const value = get(candidate);

    if (value === undefined) continue;
    if (typeof value === 'string') {
      if (results.length === 0) return value;
      continue; // an object at higher priority takes precedence
    }

    results.push(value);
  }

  if (results.length === 0) return undefined as Content;
  if (results.length === 1) return results[0]!;
  if (Array.isArray(results[0])) return results[0];

  // Merge objects: first result (most specific) takes precedence
  return (results as object[]).reduce((acc, curr) =>
    deepMerge(acc, curr)
  ) as Content;
};
