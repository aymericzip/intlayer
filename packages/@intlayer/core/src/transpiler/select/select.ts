import type { TypedNodeModel } from '@intlayer/types/nodeType';
import { formatNodeType, SELECT } from '@intlayer/types/nodeType';

/**
 * Map of arbitrary string cases to their content.
 *
 * Every key is a case the application can switch on (`'Draft'`, `'Published'`,
 * `'Scheduled'`, …). The optional `fallback` key is picked when the provided
 * value matches no declared case.
 */
export type SelectContentStates<Content = unknown> = {
  [caseKey: string]: Content;
} & {
  fallback?: Content;
};

export type SelectContent<
  States extends SelectContentStates = SelectContentStates,
> = TypedNodeModel<
  typeof SELECT,
  States,
  {
    /**
     * Name of the variable the cases are selected on.
     *
     * Purely informational at runtime — the selector is passed explicitly by
     * the caller. It is preserved so content imported from, or exported to, an
     * ICU `{publishType, select, …}` message keeps its variable name across
     * the round-trip.
     */
    variable?: string;
  }
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to pick a content based on an arbitrary string value — the equivalent
 * of an ICU `{value, select, …}` message, or of a `switch` statement in the
 * application code.
 *
 * Use it when the discriminant is neither a quantity (`enu`), a boolean
 * (`cond`), nor a gender (`gender`).
 *
 * Usage:
 *
 * ```ts
 * select({
 *  draft: 'This post is a draft',
 *  published: 'This post is live',
 *  scheduled: 'This post is scheduled',
 *  fallback: 'Unknown status',
 * });
 * ```
 *
 * When no `fallback` key is provided, the last key declared is used as the
 * fallback value — the same contract as `cond()` and `gender()`.
 *
 * Prefer `select()` over indexing a plain object (`content.status[value]`):
 * a dynamic computed access cannot be resolved statically by the Intlayer
 * compiler, which forces the whole branch to be kept and its keys to stay
 * un-minified.
 *
 * @param content - The map of cases to content.
 * @param variable - Optional name of the variable being selected on. Preserved
 * for the ICU / i18next round-trip; unused at runtime.
 */
const select = <const States extends SelectContentStates>(
  content?: States,
  variable?: string
): SelectContent<States> =>
  formatNodeType(SELECT, content as States, { variable });

export { select };
