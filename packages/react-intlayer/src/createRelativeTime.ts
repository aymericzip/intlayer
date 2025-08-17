import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { relativeTime, RelativeTimeOptions } from '@intlayer/core/relativeTime';

type RelativeTimeProps = Omit<RelativeTimeOptions, 'from' | 'to'>;

type TimePrimitive = Date | number | string;

/**
 * Creates a localized relative time formatter.
 *
 * This utility function returns a closure bound to a given locale (or the app's default locale).
 * It can be used to generate human-readable relative time strings such as
 * "5 minutes ago" or "in 3 days".
 *
 * @example
 * ```ts
 * const formatRelativeTime = createRelativeTime("en-US");
 *
 * // With Dates
 * formatRelativeTime(new Date("2024-08-01"), new Date("2024-08-05"));
 * // → "in 4 days"
 *
 * // With Timestamps
 * formatRelativeTime(Date.now(), Date.now() - 1000 * 60 * 60);
 * // → "1 hour ago"
 *
 * // With Options
 * formatRelativeTime(new Date(), new Date(Date.now() + 1000 * 60 * 60), {
 *   unit: "minute",
 *   numeric: "auto"
 * });
 * // → "in 60 minutes"
 * ```
 *
 * @param {LocalesValues} [baseLocale] - Optional locale to bind the formatter to.
 * If not provided, falls back to the app's default locale.
 *
 * @returns {(from: TimePrimitive, to?: TimePrimitive, options?: RelativeTimeProps) => string}
 * A function that takes a `from` time, an optional `to` time, and formatting options,
 * returning a localized relative time string.
 */
export const createRelativeTime = (baseLocale?: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return (
    from: TimePrimitive,
    to?: TimePrimitive,
    options?: RelativeTimeProps
  ) => {
    const { locale, ...rest } = options ?? {};

    return relativeTime({
      from,
      to,
      locale: locale ?? currentLocale,
      ...rest,
    });
  };
};
