import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { Intl as CachedIntl } from '../utils/intl';

type DateTimePreset = 'short' | 'long' | 'dateOnly' | 'timeOnly' | 'full';

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
 * @example
 * date({ date: new Date(), options: "short" });
 * // "08/02/25, 14:30"
 *
 * @example
 * date({ date: "2025-08-02T14:30:00Z", locale: Locales.FRENCH, options: { month: "long", day: "numeric" } });
 * // "2 août"
 */
export const date = (
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions & { locale?: LocalesValues }
): string => {
  const dateTime = new Date(date);

  const resolvedOptions =
    typeof options === 'string' ? (presets[options] ?? {}) : options;

  const formatter = new CachedIntl.DateTimeFormat(
    options?.locale ?? configuration?.internationalization?.defaultLocale,
    resolvedOptions
  );

  return formatter.format(dateTime);
};
