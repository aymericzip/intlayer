import { Locales, type LocalesValues } from '@intlayer/config/client';
import { ensureNumberOrString } from '../utils/ensureNumberOrString';
import { CachedIntl } from '../utils/intl';

export type PercentageOptions = {
  /**
   * Value to format (0.25 → 25%).
   */
  value: string | number;

  /**
   * Optional locale (default: English).
   */
  locale?: LocalesValues;

  /**
   * Minimum fraction digits (e.g., 2 → 25.00%).
   */
  minimumFractionDigits?: number;

  /**
   * Maximum fraction digits.
   */
  maximumFractionDigits?: number;
};

/**
 * Formats a number as a percentage string (e.g., 0.25 → "25%").
 *
 * @example
 * percentage({ value: 0.25 }) // "25%"
 * percentage({ value: 0.25, minimumFractionDigits: 2 }) // "25.00%"
 */
export const percentage = ({
  value,
  locale = Locales.ENGLISH,
  minimumFractionDigits,
  maximumFractionDigits,
}: PercentageOptions): string => {
  ensureNumberOrString(value, 'percentage');

  let numericValue = Number(value);

  // Normalize: if user passes 10, treat it as 10% instead of 1000%
  if (numericValue > 1) {
    numericValue = numericValue / 100;
  }

  const formatter = CachedIntl.numberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(Number(numericValue));
};
