import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { number, NumberOptions } from '@intlayer/core/number';

/**
 * Options for the number formatter, excluding the `value` property
 * which is provided when calling the formatter.
 *
 * Extends {@link NumberOptions} from `@intlayer/core/number`.
 */
type NumberProps = Omit<NumberOptions, 'value'>;

/**
 * Creates a locale-aware number formatter.
 *
 * This factory function initializes a number formatter based on the provided `baseLocale`,
 * or falls back to the project's `defaultLocale` if none is given.
 * The returned formatter function accepts a number (or numeric string) and formatting options,
 * and applies the correct locale rules for formatting.
 *
 * @param {LocalesValues} baseLocale - The preferred locale to use for formatting.
 *                                     Falls back to the default locale if not provided.
 * @returns {(value: string | number, options?: NumberProps) => string}
 *          A function that formats a number according to the resolved locale and options.
 *
 * @example
 * const formatNumber = createNumber("fr-FR");
 *
 * // Format with the provided locale
 * console.log(formatNumber(1234567));
 * // → "1 234 567" (French style)
 *
 * // Override locale at call time
 * console.log(formatNumber(1234567, { locale: "en-US" }));
 * // → "1,234,567"
 *
 * // Use additional options
 * console.log(formatNumber(0.25, { style: "percent" }));
 * // → "25 %" (in French)
 */
export const createNumber = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return (value: string | number, options?: NumberProps) => {
    const { locale, ...rest } = options ?? {};

    return number({
      value,
      locale: locale ?? currentLocale,
    });
  };
};
