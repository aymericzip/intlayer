import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';

export type ConditionContentStates<Content> = Record<`${boolean}`, Content> & {
  fallback?: Content;
};

export type ConditionContent<Content = unknown> = TypedNodeModel<
  NodeType.Condition,
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
const condition = <Content>(content?: ConditionContentStates<Content>) =>
  formatNodeType(NodeType.Condition, content);

export { condition as cond };
