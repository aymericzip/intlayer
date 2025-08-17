import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { FormatsUnitProps, units } from '@intlayer/core/units';

type UnitProps = Omit<FormatsUnitProps, 'value'>;

/**
 * Creates a localized unit formatter function for a given locale
 *
 * This function generates a reusable formatter for formatting numeric values with measurement units
 * (e.g., meters, kilograms, bytes) according to the given or default locale.
 *
 * @param {LocalesValues} baseLocale - The base locale to use for formatting.
 * If not provided, the `defaultLocale` from the configuration will be used.
 *
 * @returns {(value: string | number, options?: UnitProps) => string}
 * A formatter function that accepts a numeric/string value and optional formatting options.
 *
 * @example
 * ```ts
 * const formatUnit = createUnit("en-US");
 *
 * formatUnit(1000, { unit: "meter", unitDisplay: "long" });
 * // "1,000 meters"
 *
 * formatUnit(50, { unit: "kilogram", unitDisplay: "short" });
 * // "50 kg"
 *
 * // With explicit locale override:
 * formatUnit(1000, { unit: "meter", locale: "fr-FR" });
 * // "1 000 mètres"
 * ```
 */
export const createUnit = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;

  const currentLocale = baseLocale ?? defaultLocale;

  return (value: string | number, options?: UnitProps) => {
    const { locale, ...rest } = options ?? {};

    return units({
      value,
      locale: locale ?? currentLocale,
      ...rest,
    });
  };
};
