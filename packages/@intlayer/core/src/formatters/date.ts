import { Locales, type LocalesValues } from '@intlayer/config/client';
import { CachedIntl } from '../utils/intl';

type DateTimePreset = 'short' | 'long' | 'dateOnly' | 'timeOnly' | 'full';

/**
 * Options for formatting a date/time value.
 */
export type DateTimeOptions = {
  /**
   * The date to be formatted. Can be a Date object, ISO string, or timestamp.
   */
  date: Date | string | number;

  /**
   * Optional locale code used for formatting.
   *
   * @default Locales.ENGLISH
   */
  locale?: LocalesValues;

  /**
   * Intl.DateTimeFormat options or a preset key for predefined formatting styles.
   */
  options?: Intl.DateTimeFormatOptions | DateTimePreset;
};

const presets: Record<DateTimePreset, Intl.DateTimeFormatOptions> = {
  short: {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  },
  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  full: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  },
  dateOnly: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  timeOnly: {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
};

/**
 * Formats a date/time value into a localized string using Intl.DateTimeFormat.
 *
 * @param {DateTimeOptions} options - Configuration options for date/time formatting.
 * @param {Date | string | number} options.date - The date value to format.
 * @param {LocalesValues} [options.locale=Locales.ENGLISH] - Locale for formatting.
 * @param {Intl.DateTimeFormatOptions | DateTimePreset} [options.options] - Formatting options or preset style.
 *
 * @returns {string} A localized, formatted date/time string, or an empty string if the input date is invalid.
 *
 * @example
 * date({ date: new Date(), options: "short" });
 * // "08/02/25, 14:30"
 *
 * @example
 * date({ date: "2025-08-02T14:30:00Z", locale: Locales.FRENCH, options: { month: "long", day: "numeric" } });
 * // "2 août"
 */
export const date = ({
  date,
  locale = Locales.ENGLISH,
  options,
}: DateTimeOptions): string => {
  // if date received no value return
  if (date === null || date === undefined) {
    console.warn(`[date] ⚠️ Received null or undefined date`);
    return '';
  }

  const dt = new Date(date);
  if (isNaN(dt.getTime())) {
    console.warn(`[date] ⚠️ Invalid date input: "${date}"`);
    return '';
  }

  const resolvedOptions =
    typeof options === 'string' ? (presets[options] ?? {}) : options;

  const formatter = CachedIntl.dateTimeFormat(locale, resolvedOptions);

  return formatter.format(dt);
};
