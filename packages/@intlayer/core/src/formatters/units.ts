import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types';
import { Intl as CachedIntl } from '../utils/intl';

/**
 * Formats a numeric value as a localized unit string.
 *
 * @example
 * units({ value: 5, unit: "kilometer", unitDisplay: "long", locale: "en-GB" })
 * // "5 kilometers"
 */
export const units = (
  value: number | string,
  options?: Intl.NumberFormatOptions & { locale?: LocalesValues }
): string =>
  new CachedIntl.NumberFormat(
    options?.locale ?? configuration?.internationalization?.defaultLocale,
    {
      style: 'unit',
      unit: options?.unit ?? 'day',
      unitDisplay: options?.unitDisplay ?? 'short',
      useGrouping: options?.useGrouping ?? false,
    }
  ).format(Number(value));
