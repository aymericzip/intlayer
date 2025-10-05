import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { Intl as CachedIntl } from '../utils/intl';

/**
 * Formats a number as a percentage string (e.g., 0.25 → "25%").
 *
 * @example
 * percentage({ value: 0.25 }) // "25%"
 * percentage({ value: 0.25, minimumFractionDigits: 2 }) // "25.00%"
 */
export const percentage = (
  value: string | number,
  options?: Intl.NumberFormatOptions & { locale?: LocalesValues }
): string => {
  let numericValue = Number(value);

  // Normalize: if user passes 10, treat it as 10% instead of 1000%
  if (numericValue > 1) {
    numericValue = numericValue / 100;
  }

  const formatter = new CachedIntl.NumberFormat(
    options?.locale ?? configuration.internationalization.defaultLocale,
    {
      style: 'percent',
      ...options,
    }
  );

  return formatter.format(Number(numericValue));
};
