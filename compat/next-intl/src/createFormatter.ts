import type { useFormatter as _useFormatter } from 'next-intl';

/** The formatter object shape exposed by next-intl. */
export type Formatter = ReturnType<typeof _useFormatter>;

/** Time units orderable by their duration in seconds. */
const RELATIVE_TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2628000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const toDate = (value: Date | number | string): Date =>
  value instanceof Date ? value : new Date(value);

/**
 * Builds a next-intl compatible formatter backed by the native `Intl.*`
 * APIs for the given locale.
 *
 * Shared by `useFormatter` (client) and `getFormatter` (server).
 */
export const createFormatter = (locale: string): Formatter =>
  ({
    dateTime: (value: Date | number, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, options).format(value),

    number: (value: number | bigint, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(locale, options).format(value),

    /** Formats a date range with `Intl.DateTimeFormat#formatRange`. */
    dateTimeRange: (
      start: Date | number,
      end: Date | number,
      options?: Intl.DateTimeFormatOptions
    ) =>
      new Intl.DateTimeFormat(locale, options).formatRange(
        toDate(start),
        toDate(end)
      ),

    /**
     * Formats a date relative to now (or a reference date), automatically
     * selecting the largest fitting unit.
     */
    relativeTime: (
      date: Date | number | string,
      nowOrOptions?:
        | Date
        | number
        | {
            now?: Date | number;
            unit?: Intl.RelativeTimeFormatUnit;
            style?: Intl.RelativeTimeFormatStyle;
            numberingSystem?: string;
          }
    ) => {
      const options =
        nowOrOptions instanceof Date || typeof nowOrOptions === 'number'
          ? { now: nowOrOptions }
          : (nowOrOptions ?? {});

      const nowDate =
        options.now !== undefined ? toDate(options.now) : new Date();
      const diffInSeconds = (toDate(date).getTime() - nowDate.getTime()) / 1000;

      let unit = options.unit;
      if (!unit) {
        const absoluteDiff = Math.abs(diffInSeconds);
        unit =
          RELATIVE_TIME_UNITS.find(
            ([, unitSeconds]) => absoluteDiff >= unitSeconds
          )?.[0] ?? 'second';
      }

      const unitSeconds =
        RELATIVE_TIME_UNITS.find(([unitName]) => unitName === unit)?.[1] ?? 1;

      return new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto',
        style: options.style,
      }).format(Math.round(diffInSeconds / unitSeconds), unit);
    },

    /** Formats a list with `Intl.ListFormat`. */
    list: (value: Iterable<string>, options?: Intl.ListFormatOptions): string =>
      new Intl.ListFormat(locale, options).format(value),

    displayName: (
      value: string,
      optionsOrFormat?: Intl.DisplayNamesOptions | string,
      extraOptions?: Intl.DisplayNamesOptions
    ): string => {
      const resolvedOptions =
        typeof optionsOrFormat === 'string' ? extraOptions : optionsOrFormat;
      try {
        return (
          new Intl.DisplayNames(
            [locale],
            resolvedOptions ?? { type: 'language' }
          ).of(value) ?? value
        );
      } catch {
        return value;
      }
    },
  }) as unknown as Formatter;
