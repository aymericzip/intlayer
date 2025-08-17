import { Locales, type LocalesValues } from '@intlayer/config/client';
import { CachedIntl } from '../utils/intl';

type RelativeTimeUnit = Intl.RelativeTimeFormatUnit;

export type RelativeTimeOptions = {
  /**
   * The date to compare from (past or future).
   * Can be a `Date`, timestamp, or date string.
   */
  from: Date | number | string;

  /**
   * The date to compare to. Defaults to `new Date()`.
   * Can be a `Date`, timestamp, or date string.
   */
  to?: Date | number | string;

  /**
   * The locale to use for formatting.
   * Defaults to Locales.ENGLISH.
   */
  locale?: LocalesValues;

  unit?: RelativeTimeUnit;

  /**
   * Specifies how numeric values are displayed.
   * - "always": Always use numeric (e.g., "1 day ago")
   * - "auto": Use words when possible (e.g., "yesterday")
   * Defaults to "always".
   */
  numeric?: Intl.RelativeTimeFormatNumeric;

  /**
   * The style of the output string: "long", "short", or "narrow".
   * Defaults to "long".
   */
  style?: Intl.RelativeTimeFormatStyle;
};

/**
 * Calculate the difference between 2 dates in the given unit.
 */
function diffInUnit(from: Date, to: Date, unit: RelativeTimeUnit): number {
  const msDiff = to.getTime() - from.getTime();
  const sec = msDiff / 1000;

  switch (unit) {
    case 'second':
      return sec;
    case 'minute':
      return sec / 60;
    case 'hour':
      return sec / 3600;
    case 'day':
      return sec / 86400;
    case 'month':
      return sec / (30 * 86400); // approx
    case 'quarter':
      return sec / (3 * 30 * 86400); // 3 months approx
    case 'year':
      return sec / (365 * 86400); // approx
    default:
      return sec;
  }
}

export function relativeTime({
  from,
  to = new Date(),
  unit = 'second',
  locale = Locales.ENGLISH,
  numeric = 'always',
  style = 'long',
}: RelativeTimeOptions): string {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const value = diffInUnit(fromDate, toDate, unit);

  const rtf = CachedIntl.relativeTimeFormat(locale, { numeric, style });

  return rtf.format(Math.round(value), unit);
}
