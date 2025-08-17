import { Locales, type LocalesValues } from '@intlayer/config/client';
import { ensureNumberOrString } from '../utils/ensureNumberOrString';
import { CachedIntl } from '../utils/intl';

/**
 * Options for formatting a number.
 */
export type NumberOptions = {
  /**
   * The value to be formatted. Must be a valid number or numeric string.
   */
  value: string | number;

  /**
   * Optional locale used for formatting.
   *
   * @default Locales.ENGLISH
   */
  locale?: LocalesValues;
};

/**
 * Formats a numeric value using locale-aware formatting.
 *
 * @param {NumberOptions} options - Configuration for number formatting.
 * @param {string | number} options.value - The numeric value to be formatted.
 * @param {LocalesValues} [options.locale=Locales.ENGLISH] - Locale to format the number in.
 *
 * @returns {string} A formatted number string.
 *
 * @throws Will throw an error if:
 * - The value is not a valid number or numeric string.
 *
 * @example
 * number({ value: 123456.789 }); // "123,456.789"
 * number({ value: "1000000", locale: Locales.FRENCH }); // "1 000 000"
 */
export const number = ({
  value,
  locale = Locales.ENGLISH,
}: NumberOptions): string => {
  // throws an Error if Invalid numeric value is passed
  ensureNumberOrString(value, 'number');

  const formatter = CachedIntl.numberFormat(locale);

  return formatter.format(Number(value));
};
