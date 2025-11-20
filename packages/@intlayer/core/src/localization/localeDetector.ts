import type { Locale } from '@intlayer/types';
import { localeResolver } from './localeResolver';

/**
 * Constants
 */
const LANGUAGE_FORMAT_REGULAR_EXPRESSION =
  /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
const DEFAULT_QUALITY_SCORE = 1;

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

  const languageCode = match[1];
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
        qualityScore = parseFloat(value);
      }
    }
  }

  return {
    languageCode,
    regionCode,
    qualityScore,
    originalIndex: index,
    fullLocale,
  };
};

/**
 * Parses the entire Accept-Language header string into a list of preferences.
 */
const parseAcceptLanguageHeader = (
  headerValue: string
): LanguagePreference[] => {
  const rawTags = headerValue.split(',');
  const preferences: LanguagePreference[] = [];

  for (let index = 0; index < rawTags.length; index++) {
    const tag = rawTags[index].trim();
    const parsedLanguage = parseLanguageTag(tag, index);

    if (parsedLanguage) {
      preferences.push(parsedLanguage);
    }
  }

  return preferences;
};

/**
 * Calculates the specificity of a match between a provided language and a requested preference.
 */
const calculateMatchSpecificity = (
  providedLanguage: string,
  preference: LanguagePreference,
  providedIndex: number
): MatchResult | null => {
  const parsedProvided = parseLanguageTag(providedLanguage, providedIndex);
  if (!parsedProvided) {
    return null;
  }

  let specificityScore = SpecificityWeight.None;

  const preferenceFullLower = preference.fullLocale.toLowerCase();
  const preferencePrefixLower = preference.languageCode.toLowerCase();
  const providedFullLower = parsedProvided.fullLocale.toLowerCase();
  const providedPrefixLower = parsedProvided.languageCode.toLowerCase();

  if (preferenceFullLower === providedFullLower) {
    specificityScore |= SpecificityWeight.Exact;
  } else if (preferencePrefixLower === providedFullLower) {
    specificityScore |= SpecificityWeight.Prefix;
  } else if (preferenceFullLower === providedPrefixLower) {
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
 * Determines the best match for a specific available language against the list of user accepted languages.
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

  for (const preference of acceptedPreferences) {
    const matchSpec = calculateMatchSpecificity(
      providedLanguage,
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
 * Comparator function to sort language matches.
 * Sorting order:
 * 1. Quality Score (Descending)
 * 2. Specificity Score (Descending)
 * 3. Order in Header (Ascending - lower index is better)
 * 4. Order in Provided List (Ascending)
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
const getPreferredLanguages = (
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
    .map((result) => availableLanguages[result.providedIndex]);
};

/**
 * Detects the locale from the request headers.
 *
 * Headers are provided by the browser/client and can be used to determine the user's preferred language.
 * This function intersects the user's `Accept-Language` header with the application's available locales.
 */
export const localeDetector = (
  headers: Record<string, string | undefined>,
  availableLocales?: Locale[],
  defaultLocale?: Locale
): Locale => {
  const acceptLanguageHeader = headers['accept-language'];

  const preferredLocaleStrings = getPreferredLanguages(
    acceptLanguageHeader,
    availableLocales as string[]
  );

  return localeResolver(
    preferredLocaleStrings as Locale[],
    availableLocales,
    defaultLocale
  );
};
