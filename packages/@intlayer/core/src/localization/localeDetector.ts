import type { Locale } from '@intlayer/types/allLocales';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { localeResolver } from './localeResolver';

/**
 * Constants
 */
const LANGUAGE_FORMAT_REGULAR_EXPRESSION =
  /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
const DEFAULT_QUALITY_SCORE = 1;

/**
 * Upper bound of the memoization caches below. Browsers send a handful of
 * distinct `Accept-Language` values, so a small cache holds the working set.
 */
const MAX_CACHE_ENTRIES = 512;

/**
 * Longer headers are resolved without being memoized, so a client sending
 * arbitrary headers cannot grow the cache memory.
 */
const MAX_CACHEABLE_HEADER_LENGTH = 128;

/**
 * Enumeration for specificity weights.
 * Higher values indicate a more precise match.
 */
enum SpecificityWeight {
  None = 0,
  Broad = 1, // Matches prefix (e.g., 'en' matches 'en-US')
  Prefix = 2, // Matches prefix in reverse (e.g., 'en-US' matches 'en')
  Exact = 4, // Matches exact string (e.g., 'en-US' matches 'en-US')
}

/**
 * Represents a parsed language tag from the header.
 */
type LanguagePreference = {
  languageCode: string;
  regionCode?: string;
  fullLocale: string;
  /** `fullLocale` lower-cased once, for case-insensitive matching */
  fullLocaleLower: string;
  /** `languageCode` lower-cased once, for case-insensitive matching */
  languageCodeLower: string;
  qualityScore: number;
  originalIndex: number;
};

/**
 * Represents the result of matching a requested language against an available language.
 */
type MatchResult = {
  providedIndex: number;
  headerIndex: number;
  qualityScore: number;
  specificityScore: number;
};

/**
 * Inserts an entry in a bounded cache, evicting the oldest entry when full.
 */
const setBoundedCacheEntry = <Value>(
  cache: Map<string, Value>,
  key: string,
  value: Value
): Value => {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    cache.delete(cache.keys().next().value as string);
  }

  cache.set(key, value);

  return value;
};

/**
 * Parses a single language tag string from the Accept-Language header.
 * Example input: "en-US;q=0.8"
 */
const parseLanguageTag = (
  tagString: string,
  index: number
): LanguagePreference | null => {
  const match = LANGUAGE_FORMAT_REGULAR_EXPRESSION.exec(tagString);
  if (!match) {
    return null;
  }

  const languageCode = match[1] as string;
  const regionCode = match[2];
  const parameters = match[3];

  // Construct the full locale string (e.g., "en-US" or "en")
  const fullLocale = regionCode
    ? `${languageCode}-${regionCode}`
    : languageCode;

  let qualityScore = DEFAULT_QUALITY_SCORE;

  // Parse parameters to find the quality score ("q")
  if (parameters) {
    const parameterList = parameters.split(';');

    for (const parameter of parameterList) {
      const [key, value] = parameter.split('=');

      if (key === 'q') {
        qualityScore = parseFloat(value as string);
      }
    }
  }

  return {
    languageCode,
    regionCode,
    qualityScore,
    originalIndex: index,
    fullLocale,
    fullLocaleLower: fullLocale.toLowerCase(),
    languageCodeLower: languageCode.toLowerCase(),
  };
};

/**
 * Parsed available languages. They come from the configuration, so the same
 * few tags are parsed on every request: parse each one once.
 */
const availableLanguageCache = new Map<string, LanguagePreference | null>();

/**
 * Parses an available language, reusing the previous parse of the same tag.
 */
const parseAvailableLanguage = (
  language: string
): LanguagePreference | null => {
  const cachedLanguage = availableLanguageCache.get(language);

  if (cachedLanguage !== undefined) return cachedLanguage;

  return setBoundedCacheEntry(
    availableLanguageCache,
    language,
    parseLanguageTag(language, 0)
  );
};

/**
 * Parses the full Accept-Language header into a list of language preferences.
 */
const parseAcceptLanguageHeader = (
  headerValue: string
): LanguagePreference[] => {
  const rawTags = headerValue.split(',');
  const preferences: LanguagePreference[] = [];

  for (let index = 0; index < rawTags.length; index++) {
    const tag = rawTags[index]?.trim();

    if (tag) {
      const parsedLanguage = parseLanguageTag(tag, index);

      if (parsedLanguage) {
        preferences.push(parsedLanguage);
      }
    }
  }

  return preferences;
};

/**
 * Determines how well a specific available language matches a requested language preference.
 */
const calculateMatchSpecificity = (
  parsedProvided: LanguagePreference,
  preference: LanguagePreference,
  providedIndex: number
): MatchResult | null => {
  let specificityScore = SpecificityWeight.None;

  if (preference.fullLocaleLower === parsedProvided.fullLocaleLower) {
    specificityScore |= SpecificityWeight.Exact;
  } else if (preference.languageCodeLower === parsedProvided.fullLocaleLower) {
    specificityScore |= SpecificityWeight.Prefix;
  } else if (preference.fullLocaleLower === parsedProvided.languageCodeLower) {
    specificityScore |= SpecificityWeight.Broad;
  } else if (preference.fullLocale !== '*') {
    return null;
  }

  return {
    providedIndex,
    headerIndex: preference.originalIndex,
    qualityScore: preference.qualityScore,
    specificityScore,
  };
};

/**
 * Finds the best matching preference from the header for a specific available language.
 */
const getBestMatchForLanguage = (
  providedLanguage: string,
  acceptedPreferences: LanguagePreference[],
  providedIndex: number
): MatchResult => {
  // Initialize with a non-match priority
  let bestMatch: MatchResult = {
    headerIndex: -1,
    qualityScore: 0,
    specificityScore: 0,
    providedIndex,
  };

  const parsedProvided = parseAvailableLanguage(providedLanguage);

  if (!parsedProvided) {
    return bestMatch;
  }

  for (const preference of acceptedPreferences) {
    const matchSpec = calculateMatchSpecificity(
      parsedProvided,
      preference,
      providedIndex
    );

    if (matchSpec) {
      // Compare current best match with new match
      const scoreDifference =
        bestMatch.specificityScore - matchSpec.specificityScore ||
        bestMatch.qualityScore - matchSpec.qualityScore ||
        bestMatch.headerIndex - matchSpec.headerIndex;

      // If the new match is better (difference < 0), update priority
      if (scoreDifference < 0) {
        bestMatch = matchSpec;
      }
    }
  }

  return bestMatch;
};

/**
 * Comparator function to sort MatchResults.
 * Order: Quality (desc) -> Specificity (desc) -> Header Order (asc) -> Provided Order (asc)
 */
const compareMatchResults = (a: MatchResult, b: MatchResult): number => {
  return (
    b.qualityScore - a.qualityScore ||
    b.specificityScore - a.specificityScore ||
    a.headerIndex - b.headerIndex ||
    a.providedIndex - b.providedIndex ||
    0
  );
};

/**
 * Derives the list of preferred languages based on the Accept-Language header
 * and an optional list of available languages.
 */
export const getPreferredLanguages = (
  acceptHeader: string | undefined,
  availableLanguages?: string[]
): string[] => {
  // RFC 2616 sec 14.4: no header implies '*'
  const headerValue = acceptHeader === undefined ? '*' : acceptHeader || '';
  const acceptedPreferences = parseAcceptLanguageHeader(headerValue);

  // If no specific languages are provided to filter against, return the header languages sorted by quality
  if (!availableLanguages) {
    return acceptedPreferences
      .filter((preference) => preference.qualityScore > 0)
      .sort((a, b) => b.qualityScore - a.qualityScore) // Simple sort by quality
      .map((preference) => preference.fullLocale);
  }

  // Map available languages to their match priority against the header
  const matchResults = availableLanguages.map((language, index) =>
    getBestMatchForLanguage(language, acceptedPreferences, index)
  );

  return matchResults
    .filter((result) => result.qualityScore > 0)
    .sort(compareMatchResults)
    .map((result) => availableLanguages[result.providedIndex]) as string[];
};

/**
 * Detected locales, keyed by header, available locales and default locale.
 */
const detectedLocaleCache = new Map<string, DeclaredLocales>();

/**
 * Detects the locale from the request headers.
 *
 * Headers are provided by the browser/client and can be used to determine the user's preferred language.
 * This function intersects the user's `Accept-Language` header with the application's available locales.
 *
 * The result is memoized, as it only depends on its arguments.
 */
export const localeDetector = (
  headers: Record<string, string | undefined>,
  availableLocales?: Locale[],
  defaultLocale?: Locale
): DeclaredLocales => {
  const acceptLanguageHeader = headers['accept-language'];

  const isCacheable =
    (acceptLanguageHeader?.length ?? 0) <= MAX_CACHEABLE_HEADER_LENGTH;

  // A missing header (`*`) and an empty header resolve differently
  const cacheKey = isCacheable
    ? `${acceptLanguageHeader === undefined ? '\u0000' : `=${acceptLanguageHeader}`}\u0001${availableLocales?.join(',') ?? '\u0000'}\u0001${defaultLocale ?? '\u0000'}`
    : undefined;

  if (cacheKey !== undefined) {
    const cachedLocale = detectedLocaleCache.get(cacheKey);

    if (cachedLocale !== undefined) return cachedLocale;
  }

  const preferredLocaleStrings = getPreferredLanguages(
    acceptLanguageHeader,
    availableLocales as string[]
  );

  const detectedLocale = localeResolver(
    preferredLocaleStrings as Locale[],
    availableLocales,
    defaultLocale
  );

  if (cacheKey !== undefined) {
    setBoundedCacheEntry(detectedLocaleCache, cacheKey, detectedLocale);
  }

  return detectedLocale;
};
