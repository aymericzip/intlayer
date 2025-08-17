import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { date as base_date, DateTimeOptions } from '@intlayer/core/date';

/**
 * Options for the date formatter, excluding the `date` property
 * which is provided when calling the formatter.
 *
 * Extends {@link DateTimeOptions} from `@intlayer/core/date`.
 */
type DateProps = Omit<DateTimeOptions, 'date'>;

/**
 * Creates a localized date/time formatter function for a given locale.
 *
 * @param {LocalesValues} baseLocale - The locale to use as the base for formatting.
 *
 * @returns {(date: Date | string | number, options?: DateProps) => string}
 * A function that formats dates or timestamps into localized date/time strings.
 *
 * @example
 * ```ts
 * const formatDate = createDate("en-US");
 *
 * formatDate(new Date("2025-01-01"));
 * // "Jan 1, 2025"
 *
 * formatDate("2025-01-01T15:30:00Z", { dateStyle: "full", timeStyle: "short" });
 * // "Wednesday, January 1, 2025 at 3:30 PM"
 *
 * formatDate(1735689600000, { locale: "fr-FR", dateStyle: "long" });
 * // "1 janvier 2025"
 * ```
 */
export const createDate = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return (date: Date | string | number, options?: DateProps) => {
    const { locale, ...rest } = options ?? {};

    return base_date({
      date,
      locale: locale ?? currentLocale,
      ...rest,
    });
  };
};
