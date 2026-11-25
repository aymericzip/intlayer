import { getCachedIntl } from '@intlayer/core/utils';

/** ViewBox width the world map paths were projected into. */
export const WORLD_MAP_WIDTH = 960;

/** ViewBox height the world map paths were projected into. */
export const WORLD_MAP_HEIGHT = 470;

/** Code the backend uses for a visitor whose country could not be resolved. */
export const UNKNOWN_COUNTRY_CODE = 'ZZ';

/**
 * Converts an ISO 3166-1 alpha-2 country code to its flag emoji.
 * Returns a globe for unknown / invalid codes.
 */
export const countryToFlag = (code: string): string => {
  if (
    !/^[A-Za-z]{2}$/.test(code) ||
    code.toUpperCase() === UNKNOWN_COUNTRY_CODE
  )
    return '🌐';

  const regionalIndicatorBase = 0x1f1e6;
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => regionalIndicatorBase + (char.charCodeAt(0) - 65));

  return String.fromCodePoint(...codePoints);
};

/**
 * Localized country name for an ISO 3166-1 alpha-2 code, falling back to the
 * code itself when the runtime cannot name it.
 */
export const getCountryName = (code: string, locale: string): string => {
  try {
    return (
      getCachedIntl('DisplayNames', locale, { type: 'region' }).of(code) ?? code
    );
  } catch {
    return code;
  }
};
