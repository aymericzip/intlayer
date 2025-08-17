import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { list, ListOptions } from '@intlayer/core/list';

/**
 * Options for the list formatter, excluding the `items` property
 * which is provided when calling the formatter.
 *
 * Extends {@link ListOptions} from `@intlayer/core/list`.
 */
type ListProps<T> = Omit<ListOptions<T>, 'items'>;

/**
 * Creates a localized list formatter function for a given locale.
 *
 * @param {LocalesValues} baseLocale - The locale to use as the base for formatting.
 *
 * @returns {<T extends string | number | Record<string, unknown>>(items: T[], options?: ListProps<T>) => string}
 * A function that formats an array of items into a localized list string.
 *
 * @example
 * ```ts
 * const formatList = createList("en-US");
 *
 * formatList(["Apples", "Bananas", "Cherries"]);
 * // "Apples, Bananas, and Cherries"
 *
 * formatList(["Apples", "Bananas", "Cherries"], { type: "disjunction" });
 * // "Apples, Bananas, or Cherries"
 *
 * formatList(["Apples", "Bananas", "Cherries"], { locale: "fr-FR" });
 * // "Pommes, Bananes et Cerises"
 * ```
 */
export const createList = (baseLocale: LocalesValues) => {
  const { defaultLocale } = configuration.internationalization;
  const currentLocale = baseLocale ?? defaultLocale;

  return <T extends string | number | Record<string, unknown>>(
    items: T[],
    options?: ListProps<T>
  ) => {
    const { locale, ...rest } = options ?? {};

    return list({
      items,
      locale: locale ?? currentLocale,
      ...rest,
    });
  };
};
