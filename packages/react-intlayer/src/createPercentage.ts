import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { percentage, type PercentageOptions } from '@intlayer/core/percentage';

type PercentageProps = Omit<PercentageOptions, 'value'>;

/**
 * Creates a localized percentage formatter function.
 *
 * This factory function generates a formatter that formats numbers as percentages
 * according to the given locale. If no locale is provided, it falls back to the
 * default locale from the application configuration.
 *
 * @param {LocalesValues} baseLocale - The base locale to use for formatting. If not provided,
 *                                     the application's default locale is used.
 * @returns {(value: string | number, options?: PercentageProps) => string}
 *          A function that formats a number as a localized percentage string.
 *
 * @example
 * ```ts
 * const formatPercentage = createPercentage("en-US");
 * console.log(formatPercentage(0.25)); // "25%"
 * console.log(formatPercentage(0.25, { minimumFractionDigits: 2 })); // "25.00%"
 * ```
 */
export const createPercentage = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return (value: string | number, options?: PercentageProps) => {
    const { locale, ...rest } = options ?? {};

    return percentage({
      value,
      locale: locale ?? currentLocale,
      ...rest,
    });
  };
};
