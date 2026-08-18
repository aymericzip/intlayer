import { internationalization } from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { PRELOADED_DYNAMIC_KEY } from './preloadedDynamicLoader';
import { QUALIFIER_DYNAMIC_TYPES_KEY } from './qualifiedDynamicLoader';

/**
 * Default export shape of a generated dynamic entry point for a plain (non
 * qualified) key: one lazy chunk loader per emitted locale.
 */
export type PlainDynamicLoaderMap<T extends Dictionary = Dictionary> = {
  [locale: string]: (() => Promise<T>) | undefined;
};

/** A chunk loader together with the locale it was emitted for. */
export type ResolvedDynamicLoader<T extends Dictionary = Dictionary> = {
  /**
   * Locale the returned loader actually serves, which differs from the
   * requested one whenever the fallback chain was walked.
   */
  locale: LocalesValues;
  loader: () => Promise<T>;
};

/** Marker properties a loader map carries alongside its per-locale loaders. */
const MARKER_KEYS: string[] = [
  PRELOADED_DYNAMIC_KEY,
  QUALIFIER_DYNAMIC_TYPES_KEY,
];

/**
 * Ordered locale candidates for a chunk lookup, mirroring the static fallback
 * chain `getTranslation` applies: the requested locale, its base language, then
 * the default locale and its base language.
 */
const getLocaleCandidates = (locale: LocalesValues): string[] => {
  const candidates: string[] = [];

  const addCandidate = (candidate?: string) => {
    if (candidate && !candidates.includes(candidate))
      candidates.push(candidate);
  };

  addCandidate(locale);
  addCandidate(locale.split('-')[0]);
  addCandidate(internationalization.defaultLocale);
  addCandidate(internationalization.defaultLocale?.split('-')[0]);

  return candidates;
};

/**
 * Picks the chunk loader serving a locale out of a plain dynamic loader map.
 *
 * A dictionary is only emitted for the locales it declares, so a read for any
 * other locale — an undeclared one, or a partially translated dictionary under
 * `requiredLocales` — has no chunk of its own. Static mode answers such a read
 * with the default locale's content rather than nothing, and this walks the
 * same chain so dynamic mode stays interchangeable with it.
 *
 * @param loaderMap - Default export of a generated dynamic entry point.
 * @param locale - Locale the caller is about to render.
 * @returns The loader to invoke and the locale its chunk holds, or `undefined`
 *          when the map holds no chunk for the locale nor for any fallback.
 */
export const findPlainDynamicLoader = <T extends Dictionary>(
  loaderMap: PlainDynamicLoaderMap<T>,
  locale: LocalesValues
): ResolvedDynamicLoader<T> | undefined => {
  for (const candidate of getLocaleCandidates(locale)) {
    const loader = loaderMap[candidate];

    if (typeof loader === 'function') {
      return { locale: candidate as LocalesValues, loader };
    }
  }

  return undefined;
};

/** Lists the locales a loader map actually emitted a chunk for. */
const getEmittedLocales = (loaderMap: PlainDynamicLoaderMap): string[] =>
  Object.keys(loaderMap).filter(
    (loaderKey) =>
      !MARKER_KEYS.includes(loaderKey) &&
      typeof loaderMap[loaderKey] === 'function'
  );

/**
 * {@link findPlainDynamicLoader}, for callers that cannot render without a
 * chunk and would otherwise fail on an `undefined` loader with an error naming
 * neither the dictionary nor the locale.
 *
 * @param loaderMap - Default export of a generated dynamic entry point.
 * @param key - Dictionary key, used to describe an unresolvable lookup.
 * @param locale - Locale the caller is about to render.
 * @returns The loader to invoke, and the locale its chunk holds.
 * @throws When neither the locale nor any of its fallbacks has a chunk, which
 *         only happens on a malformed or empty entry point.
 */
export const resolvePlainDynamicLoader = <T extends Dictionary>(
  loaderMap: PlainDynamicLoaderMap<T>,
  key: string,
  locale: LocalesValues
): ResolvedDynamicLoader<T> => {
  const resolved = findPlainDynamicLoader<T>(loaderMap, locale);

  if (resolved) return resolved;

  const emittedLocales = getEmittedLocales(loaderMap);

  throw new Error(
    `[intlayer] No dynamic chunk found for dictionary "${key}" and locale "${locale}". Emitted locales: ${
      emittedLocales.length > 0 ? emittedLocales.join(', ') : '(none)'
    }.`
  );
};
