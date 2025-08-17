import { Locales, type LocalesValues } from '@intlayer/config/client';
import { ensureNumberOrString } from '../utils/ensureNumberOrString';
import { CachedIntl } from '../utils/intl';

/**
 * Options for formatting a number using compact notation.
 */
export type CompactOptions = {
  /**
   * The value to be formatted. Must be a valid number or a numeric string.
   */
  value: string | number;

  /**
   * Optional locale used for formatting.
   *
   * @default Locales.ENGLISH
   */
  locale?: LocalesValues;

  /**
   * The notation style to use:
   * - "standard"
   * - "scientific"
   * - "engineering"
   * - "compact"
   *
   * @default "compact"
   */
  notation?: Intl.NumberFormatOptions['notation'];

  /**
   * When using "compact" notation, controls the display format:
   * - "short" (e.g., 1K)
   * - "long" (e.g., 1 thousand)
   *
   * @default "short"
   */
  compactDisplay?: Intl.NumberFormatOptions['compactDisplay'];
};

/**
 * Formats a numeric value using compact notation (e.g., 1K, 1M, 1B)
 * based on locale and formatting options.
 *
 * @param {CompactOptions} options - Configuration options for number formatting.
 * @param {string | number} options.value - The numeric value to be formatted. Must be a number or a numeric string.
 * @param {LocalesValues} [options.locale=Locales.ENGLISH] - The locale to use for formatting (e.g., 'en-US', 'fr-FR').
 * @param {"standard" | "scientific" | "engineering" | "compact"} [options.notation="compact"] - Notation format to use. Typically "compact" for shortened numbers.
 * @param {"short" | "long"} [options.compactDisplay="short"] - Whether to display compact numbers in "short" (e.g., 1K) or "long" (e.g., 1 thousand) format.
 *
 * @returns {string} A locale-aware, compact string representation of the number.
 *
 * @throws Will throw an error if:
 * - The `value` is not a valid number or numeric string.
 *
 * @example
 * compact({ value: 1200 }); // "1.2K"
 *
 * @example
 * compact({ value: "1000000", locale: Locales.FRENCH, compactDisplay: "long" });
 * // "1 million"
 */
export const compact = ({
  value,
  locale = Locales.ENGLISH,
  notation = 'compact',
  compactDisplay = 'short',
}: CompactOptions): string => {
  // throws an Error if Invalid numeric value is passed
  ensureNumberOrString(value, 'compact');

  const formatter = CachedIntl.numberFormat(locale, {
    notation,
    compactDisplay,
  });

  return formatter.format(Number(value));
};
