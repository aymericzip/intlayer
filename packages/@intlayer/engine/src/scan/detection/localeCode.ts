/**
 * Locale-code helpers shared by the scan checks and the routing detection.
 *
 * Dependency-free and browser-safe: consumed by the CLI, the backend audit and
 * the Chrome extension popup.
 */

/** Syntactic shape of a locale code: `en`, `en-US`, `pt_BR`, `zh-Hant-TW`… */
const LOCALE_CODE_PATTERN =
  /^[a-z]{2,3}([_-][a-z]{4})?([_-]([a-z]{2}|[0-9]{3}))?$/i;

/** Languages written right-to-left. */
const RIGHT_TO_LEFT_LANGUAGES = new Set([
  'ar',
  'arc',
  'ckb',
  'dv',
  'fa',
  'he',
  'iw',
  'ku',
  'ps',
  'sd',
  'syr',
  'ug',
  'ur',
  'yi',
]);

/** Lower-case a locale code and use `-` as separator (`pt_BR` → `pt-br`). */
export const normalizeLocaleCode = (localeCode: string): string =>
  localeCode.trim().replace(/_/g, '-').toLowerCase();

/** Primary language subtag of a locale code (`en-US` → `en`). */
export const getLanguageCode = (localeCode: string): string =>
  normalizeLocaleCode(localeCode).split('-')[0] ?? '';

/** Whether two locale codes designate the same locale, ignoring case/separator. */
export const isSameLocale = (
  firstLocale: string | undefined,
  secondLocale: string | undefined
): boolean =>
  Boolean(firstLocale) &&
  Boolean(secondLocale) &&
  normalizeLocaleCode(firstLocale as string) ===
    normalizeLocaleCode(secondLocale as string);

/** Whether two locale codes share the same language (`fr` vs `fr-CA`). */
export const isSameLanguage = (
  firstLocale: string | undefined,
  secondLocale: string | undefined
): boolean =>
  Boolean(firstLocale && secondLocale) &&
  getLanguageCode(firstLocale as string) ===
    getLanguageCode(secondLocale as string);

/** Whether a string looks like a locale code (used on URL segments). */
export const looksLikeLocaleCode = (value: string): boolean =>
  LOCALE_CODE_PATTERN.test(value);

/**
 * Whether a locale code is a valid BCP 47 tag (`en_US` and `english` are not).
 * `x-default` is accepted since it is a valid hreflang value.
 */
export const isValidLocaleCode = (localeCode: string): boolean => {
  if (localeCode.toLowerCase() === 'x-default') return true;
  if (!LOCALE_CODE_PATTERN.test(localeCode) || localeCode.includes('_')) {
    return false;
  }
  try {
    return Intl.getCanonicalLocales(localeCode).length === 1;
  } catch {
    return false;
  }
};

/** Whether the locale is written right-to-left (`ar`, `he-IL`, `fa`…). */
export const isRightToLeftLocale = (localeCode: string): boolean =>
  RIGHT_TO_LEFT_LANGUAGES.has(getLanguageCode(localeCode));

/**
 * Find, among `candidateLocales`, the one matching `value` (a URL segment, a
 * subdomain label or a query-string value). Falls back to a language-only match
 * when no exact match exists (`/fr/` for hreflang `fr-FR`).
 */
export const findMatchingLocale = (
  value: string | undefined | null,
  candidateLocales: readonly string[]
): string | undefined => {
  if (!value) return undefined;
  const normalizedValue = normalizeLocaleCode(value);

  const exactMatch = candidateLocales.find(
    (locale) => normalizeLocaleCode(locale) === normalizedValue
  );
  if (exactMatch) return exactMatch;

  const languageMatches = candidateLocales.filter(
    (locale) => getLanguageCode(locale) === normalizedValue
  );
  return languageMatches.length === 1 ? languageMatches[0] : undefined;
};

/** Open Graph locale shape: `language_TERRITORY` (`en_GB`, `pt_BR`). */
const OPEN_GRAPH_LOCALE_PATTERN = /^[a-z]{2,3}_[A-Z]{2}$/;

/**
 * Whether a value is a valid `og:locale` (`en_GB`). Open Graph does not accept
 * a bare language (`en`) nor BCP 47 separators (`en-GB`): crawlers then fall
 * back to `en_US`.
 */
export const isValidOpenGraphLocale = (localeCode: string): boolean =>
  OPEN_GRAPH_LOCALE_PATTERN.test(localeCode.trim());

/** Region subtag of a locale code, if any (`en-GB` → `GB`, `zh-Hant-TW` → `TW`). */
const getRegionCode = (localeCode: string): string | undefined => {
  try {
    return new Intl.Locale(normalizeLocaleCode(localeCode)).region;
  } catch {
    return undefined;
  }
};

/** Most likely region of a language (`en` → `US`, `fr` → `FR`, `ja` → `JP`). */
const getLikelyRegionCode = (languageCode: string): string | undefined => {
  try {
    return new Intl.Locale(languageCode).maximize().region;
  } catch {
    return undefined;
  }
};

/**
 * Suggest the `og:locale` value for a locale code. The region comes from the
 * locale itself, then from `regionHint` (typically `<html lang>`) when it
 * shares the language, then from the language's most likely region.
 *
 * @example
 * toOpenGraphLocale('en', 'en-GB'); // 'en_GB'
 * toOpenGraphLocale('pt-br'); // 'pt_BR'
 * toOpenGraphLocale('fr'); // 'fr_FR'
 */
export const toOpenGraphLocale = (
  localeCode: string,
  regionHint?: string
): string | undefined => {
  const languageCode = getLanguageCode(localeCode);
  if (!/^[a-z]{2,3}$/.test(languageCode)) return undefined;

  const regionCode =
    getRegionCode(localeCode) ??
    (regionHint && isSameLanguage(localeCode, regionHint)
      ? getRegionCode(regionHint)
      : undefined) ??
    getLikelyRegionCode(languageCode);

  return regionCode && /^[A-Z]{2}$/.test(regionCode)
    ? `${languageCode}_${regionCode}`
    : undefined;
};
