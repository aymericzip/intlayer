import type { TypedNodeModel } from '@intlayer/types/nodeType';
import { formatNodeType, PLURAL } from '@intlayer/types/nodeType';

export type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export type PluralContentState<Content> = Partial<
  Record<PluralCategory, Content>
> & {
  other: Content;
};

export type PluralContent<Content = unknown> = TypedNodeModel<
  typeof PLURAL,
  PluralContentState<Content>
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to pick a content based on a quantity using CLDR pluralization rules
 * (`Intl.PluralRules`). The selected category depends on the active locale.
 *
 * Supported categories: `zero`, `one`, `two`, `few`, `many`, `other`.
 * `other` is required as the fallback.
 *
 * The string content can include a `{{count}}` placeholder, which is
 * automatically replaced with the provided count.
 *
 * Usage:
 *
 * ```ts
 * plural({
 *   one: '{{count}} вакансия',
 *   few: '{{count}} вакансии',
 *   many: '{{count}} вакансий',
 *   other: '{{count}} вакансий',
 * });
 * ```
 */
const plural = <Content = unknown>(
  content: PluralContentState<Content>
): PluralContent<Content> => formatNodeType(PLURAL, content);

export { plural };
