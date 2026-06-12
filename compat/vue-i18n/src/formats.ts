/**
 * Locale-aware `d()` / `n()` formatting backed by the native `Intl.*` APIs,
 * honoring the `datetimeFormats` / `numberFormats` maps from `createI18n`
 * options (vue-i18n named formats).
 */

/** vue-i18n `datetimeFormats` option shape: locale → format name → options. */
export type DateTimeFormatsConfig = Record<
  string,
  Record<string, Intl.DateTimeFormatOptions>
>;

/** vue-i18n `numberFormats` option shape: locale → format name → options. */
export type NumberFormatsConfig = Record<
  string,
  Record<string, Intl.NumberFormatOptions>
>;

const resolveNamedOptions = <FormatOptions>(
  formatOrOptions: string | FormatOptions | undefined,
  locale: string,
  namedFormats: Record<string, Record<string, FormatOptions>> | undefined
): FormatOptions | undefined => {
  if (typeof formatOrOptions === 'string') {
    return (
      namedFormats?.[locale]?.[formatOrOptions] ??
      // Fall back to the base language entry (`'en'` for `'en-GB'`)
      namedFormats?.[locale.split('-')[0]]?.[formatOrOptions]
    );
  }
  return formatOrOptions;
};

/** Formats a date value like vue-i18n's `d()`. */
export const formatDateValue = (
  value: Date | number | string,
  formatOrOptions: string | Intl.DateTimeFormatOptions | undefined,
  locale: string,
  datetimeFormats?: DateTimeFormatsConfig
): string => {
  const dateValue = value instanceof Date ? value : new Date(value);
  const options = resolveNamedOptions(formatOrOptions, locale, datetimeFormats);

  try {
    return new Intl.DateTimeFormat(locale, options).format(dateValue);
  } catch {
    return String(value);
  }
};

/** Formats a number value like vue-i18n's `n()`. */
export const formatNumberValue = (
  value: number,
  formatOrOptions: string | Intl.NumberFormatOptions | undefined,
  locale: string,
  numberFormats?: NumberFormatsConfig
): string => {
  const options = resolveNamedOptions(formatOrOptions, locale, numberFormats);

  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return String(value);
  }
};
