/**
 * Reimplementation of `@lingui/core`'s `formats` namespace.
 *
 * These static helpers are deliberately kept independent of any I18n instance
 * so that they can be used without a Provider.
 *
 * @deprecated Use `Intl.*` APIs directly — these helpers will be removed in
 *   a future version of lingui.
 */

export type DateTimeFormatSize = 'short' | 'default' | 'long' | 'full';
export type DateTimeFormatValue = Parameters<Intl.DateTimeFormat['format']>[0];
export type NumberFormatValue = Parameters<Intl.NumberFormat['format']>[0];

export type PluralOptions = {
  [key: string]: string | undefined;
} & {
  offset?: number;
  other: string;
};

const SIZE_FORMAT_MAP: Record<DateTimeFormatSize, Intl.DateTimeFormatOptions> =
  {
    short: { dateStyle: 'short', timeStyle: 'short' },
    default: { dateStyle: 'medium', timeStyle: 'medium' },
    long: { dateStyle: 'long', timeStyle: 'long' },
    full: { dateStyle: 'full', timeStyle: 'full' },
  };

const toDateObject = (value: string | DateTimeFormatValue): Date =>
  typeof value === 'string' ? new Date(value) : new Date(value as number);

const resolveLocales = (locales: string | string[]): string | string[] =>
  locales;

/**
 * Formats a date value.
 * @deprecated Use `Intl.DateTimeFormat` directly.
 */
const date = (
  locales: string | string[],
  value: string | DateTimeFormatValue,
  format?: Intl.DateTimeFormatOptions | DateTimeFormatSize
): string => {
  const options: Intl.DateTimeFormatOptions =
    typeof format === 'string'
      ? (SIZE_FORMAT_MAP[format] ?? SIZE_FORMAT_MAP.default)
      : (format ?? {});
  return new Intl.DateTimeFormat(resolveLocales(locales), options).format(
    toDateObject(value)
  );
};

/**
 * Formats a time value.
 * @deprecated Use `Intl.DateTimeFormat` directly.
 */
const time = (
  locales: string | string[],
  value: string | DateTimeFormatValue,
  format?: Intl.DateTimeFormatOptions | DateTimeFormatSize
): string => {
  const options: Intl.DateTimeFormatOptions =
    typeof format === 'string'
      ? (SIZE_FORMAT_MAP[format] ?? SIZE_FORMAT_MAP.default)
      : (format ?? { timeStyle: 'medium' });
  return new Intl.DateTimeFormat(resolveLocales(locales), options).format(
    toDateObject(value)
  );
};

/**
 * Formats a number value.
 * @deprecated Use `Intl.NumberFormat` directly.
 */
const number = (
  locales: string | string[],
  value: NumberFormatValue,
  format?: Intl.NumberFormatOptions
): string =>
  new Intl.NumberFormat(resolveLocales(locales), format).format(value);

/**
 * Selects the correct plural form from a set of plural rules.
 * @deprecated Use `Intl.PluralRules` directly.
 */
const plural = (
  locales: string | string[],
  ordinal: boolean,
  value: number,
  { offset = 0, ...rules }: PluralOptions
): string => {
  const count = value - offset;
  const pluralRule = new Intl.PluralRules(resolveLocales(locales), {
    type: ordinal ? 'ordinal' : 'cardinal',
  }).select(count);
  return (
    (rules[String(count)] as string | undefined) ??
    (rules[pluralRule] as string | undefined) ??
    rules.other
  );
};

/** Default locale used when none is configured. */
const defaultLocale = 'en';

export const formats = {
  date,
  time,
  number,
  plural,
  defaultLocale,
};
