import { preloadDynamic } from './useLoadDynamic';

/** Starts the loads one rendered dictionary needs for a given locale. */
export type DynamicLocaleWarmer = (locale: string) => void;

/** One warmer per dictionary key rendered so far through the dynamic path. */
const warmers = new Map<string, DynamicLocaleWarmer>();

/**
 * Records how to preload a rendered dictionary for any locale, so a later
 * locale switch can start all of them at once.
 *
 * @param key - Dictionary key; a later call for the same key replaces it.
 * @param warmer - Starts the dictionary's chunk loads for a locale.
 */
export const registerDynamicLocaleWarmer = (
  key: string,
  warmer: DynamicLocaleWarmer
): void => {
  warmers.set(key, warmer);
};

/**
 * Starts loading, in parallel, every registered dictionary for `locale`.
 *
 * Called on the first cache miss of a render: without it, a renderer that
 * stops at the first suspended component (Redact, or React without sibling
 * prerendering) discovers one chunk per retry and waterfalls the whole page.
 * Client-only, since a server render would load every locale it ever served.
 *
 * @param locale - The locale the render is missing.
 */
export const warmDynamicLocale = (locale: string): void => {
  if (typeof window === 'undefined') return;

  for (const warmer of warmers.values()) {
    warmer(locale);
  }
};

/**
 * Builds a warmer that preloads one chunk per cache key.
 *
 * @param getChunks - Lists the chunks (cache key + loader) needed for a locale.
 * @returns A warmer filling the `useLoadDynamic` suspender cache.
 */
export const createDynamicLocaleWarmer =
  (
    getChunks: (
      locale: string
    ) => { cacheKey: string; loader: () => Promise<unknown> }[]
  ): DynamicLocaleWarmer =>
  (locale) => {
    for (const { cacheKey, loader } of getChunks(locale)) {
      // Rejections stay in the cache; the render that reads it surfaces them.
      void preloadDynamic(cacheKey, loader);
    }
  };
