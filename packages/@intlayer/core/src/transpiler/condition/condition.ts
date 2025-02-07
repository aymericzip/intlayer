import { NodeType } from '../../types/index';

export type ConditionContentStates<Content> = Record<`${boolean}`, Content> & {
  fallback?: Content;
};

export type ConditionContent<Content = unknown> = {
  nodeType: NodeType.Condition;
  [NodeType.Condition]: ConditionContentStates<Content>;
};

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
const condition = <Content>(content?: ConditionContentStates<Content>) => ({
  nodeType: NodeType.Condition,
  [NodeType.Condition]: { ...content },
});

export { condition as cond };
