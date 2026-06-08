import type { DeclaredLocales } from '@intlayer/types';
import type { LocalesValues } from 'intlayer';
import { getCachedIntl } from '../formatters';
import type {
  PluralCategory,
  PluralContentState,
} from '../transpiler/plural/plural';

/**
 * Picks content from a plural map based on a count and locale, using CLDR
 * pluralization rules (`Intl.PluralRules`).
 *
 * Falls back to the `other` category when no specific category matches.
 *
 * @example
 * ```ts
 * getPlural({
 *   one: 'one item',
 *   other: '{{count}} items',
 * }, 5, 'en');
 * // '{{count}} items'
 * ```
 */
export const getPlural = <const L extends LocalesValues = DeclaredLocales>(
  pluralContent: PluralContentState<string>,
  count: number,
  locale: L
): string => {
  const category = getCachedIntl(Intl.PluralRules, locale).select(
    count
  ) as PluralCategory;

  return pluralContent[category] ?? pluralContent.other;
};
