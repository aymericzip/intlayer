import type { TypedNodeModel } from '@intlayer/types/nodeType';
import { CONDITION, formatNodeType } from '@intlayer/types/nodeType';

export type ConditionContentStates<Content> = Record<`${boolean}`, Content> & {
  fallback?: Content;
};

export type ConditionContent<Content = unknown> = TypedNodeModel<
  typeof CONDITION,
  ConditionContentStates<Content>
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to pick a content based on a condition.
 *
 * Usage:
 *
 * ```ts
 * cond({
 *  'true': 'The condition is validated',
 *  'false': 'The condition is not validated',
 * });
 * ```
 *
 * The last key provided will be used as the fallback value.
 *
 */
const condition = <Content>(
  content?: ConditionContentStates<Content>
): ConditionContent<Content> => formatNodeType(CONDITION, content);

export { condition as cond };
