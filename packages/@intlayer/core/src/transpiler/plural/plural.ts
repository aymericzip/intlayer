import type { TypedNodeModel } from '@intlayer/types/nodeType';
import { formatNodeType, PLURAL } from '@intlayer/types/nodeType';

export type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export type PluralContentState<Content> = Partial<
  Record<PluralCategory, Content>
> & {
  other: Content;
};

/** Name of the value a plural selects on when no `variable` is declared. */
export const DEFAULT_PLURAL_VARIABLE = 'count';

export type PluralOptions<Variable extends string = string> = {
  /**
   * Name of the value the plural category is selected on.
   *
   * Defaults to `count`. Set it to nest plurals over independent quantities:
   * the resolved function then takes `{ [variable]: number, … }`.
   */
  variable?: Variable;
};

export type PluralContent<
  Content = unknown,
  Variable extends string = typeof DEFAULT_PLURAL_VARIABLE,
> = TypedNodeModel<
  typeof PLURAL,
  PluralContentState<Content>,
  { variable?: Variable }
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
 *
 * Nest plurals declaring a `variable` to select on several quantities:
 *
 * ```ts
 * plural(
 *   {
 *     one: plural(
 *       { one: '{{files}} file in {{folders}} folder', other: '…' },
 *       { variable: 'folders' }
 *     ),
 *     other: plural({ … }, { variable: 'folders' }),
 *   },
 *   { variable: 'files' }
 * );
 * // content.filesInFolders({ files: 1, folders: 2 })
 * ```
 */
const plural = <
  Content = unknown,
  const Variable extends string = typeof DEFAULT_PLURAL_VARIABLE,
>(
  content: PluralContentState<Content>,
  options?: PluralOptions<Variable>
): PluralContent<Content, Variable> =>
  formatNodeType(
    PLURAL,
    content,
    options?.variable ? { variable: options.variable } : undefined
  );

export { plural };
