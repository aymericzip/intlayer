import { Locales, type LocalesValues } from '@intlayer/config/client';
import { type SupportedUnit } from '../types';
import { ensureNumberOrString } from '../utils/ensureNumberOrString';
import { CachedIntl } from '../utils/intl';

/**
 * How units should be displayed.
 * - short: e.g., "1 hr"
 * - long: e.g., "1 hour"
 * - narrow: e.g., "1h"
 */
// export type UnitDisplay = "short" | "long" | "narrow";

/**
 * Determines whether grouping separators should be used (e.g., thousands separators).
 * This corresponds to Intl.NumberFormat `useGrouping` behavior.
 */
// export type Grouping = "auto" | "always" | "false" | "true" | "min2";

/**
 * Props for formatting numeric values as units.
 */
export type FormatsUnitProps = {
  /**
   * The numeric value to be formatted.
   */
  value: number | string;

  /**
   * The locale to use. Defaults to Locales.ENGLISH.
   */
  locale?: LocalesValues;

  /**
   * The unit to apply formatting for.
   */
  unit?: SupportedUnit;

  /**
   * How to display the unit (short, long, or narrow).
   */
  unitDisplay?: Intl.NumberFormatOptions['unitDisplay'];

  /**
   * Grouping configuration for number formatting.
   */
  // withGrouping?: boolean;
  withGrouping?: Intl.NumberFormatOptions['useGrouping'];
};

/**
 * Formats a numeric value as a localized unit string.
 *
 * @param value - The numeric value to format.
 * @param locale - Optional locale to use (default: "en").
 * @param unit - Optional unit to format with (default: "day").
 * @param unitDisplay - How the unit should be displayed (short, long, narrow).
 * @param withGrouping - Controls number grouping separators (default: "auto").
 *
 * @returns A formatted string representing the value and unit.
 *
 * @example
 * units({ value: 5, unit: "kilometer", unitDisplay: "long", locale: "en-GB" })
 * // "5 kilometers"
 */
export const units = ({
  value,
  locale = Locales.ENGLISH,
  unit = 'day',
  unitDisplay = 'short',
  withGrouping = false,
}: FormatsUnitProps): string => {
  // throws an Error if Invalid numeric value is passed
  ensureNumberOrString(value, 'units');

  const formatter = CachedIntl.numberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay,
    useGrouping: withGrouping,
  });

  return formatter.format(Number(value));
};
