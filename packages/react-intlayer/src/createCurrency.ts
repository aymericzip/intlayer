import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { currency, CurrencyOptions } from '@intlayer/core/currency';

/**
 * Options for the currency formatter, excluding the `value` property
 * which is provided when calling the formatter.
 *
 * Extends {@link CurrencyOptions} from `@intlayer/core/currency`.
 */
type CurrencyProps = Omit<CurrencyOptions, 'value'>;

/**
 * Creates a currency formatter function for a given locale.
 *
 * @param {LocalesValues} baseLocale - The locale to use as the base for formatting.
 *
 * @returns {(value: string | number, options?: CurrencyProps) => string}
 * A function that formats numbers into localized currency strings.
 *
 * @example
 * ```ts
 * const formatCurrency = createCurrency("en-US");
 *
 * formatCurrency(1500, { currency: "USD" });
 * // "$1,500.00"
 *
 * formatCurrency(1500, { currency: "EUR", locale: "de-DE" });
 * // "1.500,00 €"
 *
 * formatCurrency(9876543.21, {
 *   currency: "JPY",
 *   fractionDigits: 0,
 * });
 * // "¥9,876,543"
 * ```
 */
export const createCurrency = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return (value: string | number, options?: CurrencyProps) => {
    const { locale, currency: baseCurrency, ...rest } = options ?? {};

    return currency({
      value,
      locale: locale ?? currentLocale,
      currency: baseCurrency!,
      ...rest,
    });
  };
};
