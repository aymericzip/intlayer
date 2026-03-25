import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { Intl as CachedIntl } from '../utils/intl';

export type DateTimePreset =
  | 'short'
  | 'long'
  | 'dateOnly'
  | 'timeOnly'
  | 'full';

export const presets: Record<DateTimePreset, Intl.DateTimeFormatOptions> = {
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
 * date(new Date('2025-08-02T14:30:00Z'), { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
 * // "08/02/25, 14:30"
 *
 * @example
 * date("2025-08-02T14:30:00Z", { locale: Locales.FRENCH, month: "long", day: "numeric" });
 * // "2 août"
 */
export const date = (
  date: Date | string | number,
  options?:
    | (Intl.DateTimeFormatOptions & { locale?: LocalesValues })
    | DateTimePreset
): string => {
  const dateTime = new Date(date);

  const resolvedOptions =
    typeof options === 'string' ? (presets[options] ?? {}) : options;

  const locale =
    (typeof options === 'object' ? options?.locale : undefined) ??
    configuration?.internationalization?.defaultLocale;

  const formatter = new CachedIntl.DateTimeFormat(locale, resolvedOptions);

  return formatter.format(dateTime);
};
