import { Locales, type LocalesValues } from '@intlayer/config/client';
import { type SupportedCurrency } from '../types';
import { ensureNumberOrString } from '../utils/ensureNumberOrString';
import { CachedIntl } from '../utils/intl';
import { FRACTION_NUMBER_DIGITS } from './constant';

/**
 * Options to configure how a number is formatted as a currency string.
 */
export type CurrencyOptions = {
  /**
   * The numeric value to be formatted. Can be a number or a numeric string.
   */
  value: string | number;

  /**
   * Optional locale code used for formatting. Must be one of the defined `LocalesValues`.
   *
   * @default Locales.ENGLISH
   */
  locale?: LocalesValues;

  /**
   * The ISO 4217 currency code to be used (e.g., 'USD', 'EUR', 'JPY').
   *
   * @default 'USD'
   */
  currency?: SupportedCurrency;

  /**
   * How to display the currency:
   * - `symbol` (default): Currency symbol (e.g., $)
   * - `narrowSymbol`: A shorter currency symbol if available
   * - `code`: The currency code (e.g., USD)
   * - `name`: The localized name of the currency (e.g., "US dollars")
   *
   * @default "symbol"
   */
  currencyDisplay?: Intl.NumberFormatOptionsCurrencyDisplay;

  /**
   * The number of digits to appear after the decimal point.
   *
   * @default 2
   */
  fractionDigits?: number;
};

/**
 * Formats a numeric or string value into a localized currency string using the Intl API.
 *
 * @param {CurrencyOptions} options - Configuration options for currency formatting.
 * @param {string | number} options.value - The value to be formatted. Must be a valid number or a numeric string.
 * @param {LocalesValues} [options.locale=Locales.ENGLISH] - The locale used for formatting (e.g., `en-US`, `fr-FR`). Defaults to English.
 * @param {SupportedCurrency} [options.currency='USD'] - The ISO 4217 currency code (e.g., `USD`, `EUR`, `JPY`). Defaults to USD.
 * @param {"code" | "name" | "symbol" | "narrowSymbol"} [options.currencyDisplay="symbol"] - How the currency should be displayed.
 * @param {number} [options.fractionDigits=2] - The number of fraction digits to display. Defaults to 2.
 *
 * @returns {string} The formatted currency string.
 *
 * @throws Will throw an error if:
 * - `currency` is not provided or is invalid.
 * - `value` is not a valid number or numeric string.
 *
 * @example
 * currency({ value: 1234.5, currency: 'EUR' });
 * // "€1,234.50"
 *
 * @example
 * currency({ value: "5000", locale: Locales.FRENCH, currency: "CAD", currencyDisplay: "code" });
 * // "5 000,00 CAD"
 */
export const currency = ({
  value,
  locale = Locales.ENGLISH,
  currency = 'USD',
  currencyDisplay,
  fractionDigits,
}: CurrencyOptions): string => {
  // checks if no currency provided or the defaulted currency failed to be included this throws an Error
  if (!currency) {
    throw new Error(
      'Currency code must be provided when using currency formatting.'
    );
  }

  // throws an Error if Invalid numeric value is passed
  ensureNumberOrString(value, 'currency');

  const formatter = CachedIntl.numberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: currencyDisplay ?? 'symbol',
    minimumFractionDigits: fractionDigits ?? FRACTION_NUMBER_DIGITS,
    maximumFractionDigits: fractionDigits ?? FRACTION_NUMBER_DIGITS,
  });

  return formatter.format(Number(value));
};
