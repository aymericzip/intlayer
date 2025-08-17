import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { compact, CompactOptions } from '@intlayer/core/compact';

/**
 * Options for the compact number formatter, excluding the `value` property
 * which is provided when calling the formatter.
 *
 * Extends {@link CompactOptions} from `@intlayer/core/compact`.
 */
type CompactProps = Omit<CompactOptions, 'value'>;

/**
 * Creates a compact number formatter function for a given locale.
 *
 * @param {LocalesValues} baseLocale - The locale to use as the base for formatting.
 *
 * @returns {(value: string | number, options?: CompactProps) => string}
 * A function that formats numbers into compact notation.
 *
 * @example
 * ```ts
 * const compact = createCompact("en-US");
 *
 * compact(1200);
 * // "1.2K"
 *
 * compact(5000000, { locale: "en-US", compactDisplay: "long" });
 * // "5 million"
 * ```
 */
export const createCompact = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return (value: string | number, options?: CompactProps) => {
    const { locale, ...rest } = options ?? {};

    return compact({
      value,
      locale: locale ?? currentLocale,
      ...rest,
    });
  };
};
