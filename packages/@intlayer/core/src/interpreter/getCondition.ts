import type { ConditionContentStates } from '../transpiler';

/**
 * Allow to pick a content based on a condition.
 *
 * Usage:
 *
 * ```ts
 * const content = getCondition({
 *  'true': 'The condition is validated',
 *  'false': 'The condition is not validated',
 * }, true);
 * // 'The condition is validated'
 * ```
 *
 * The last key provided will be used as the fallback value.
 *
 * ```ts
 * const content = getCondition({
 *  'false': 'The condition is not validated',
 *  'true': 'The condition is validated',
 * }, undefined);
 * // 'The condition is validated'
 */
export const getCondition = <Content>(
  conditionContent: ConditionContentStates<Content>,
  state?: boolean
): Content => {
  const stateList = Object.keys(conditionContent);
  const fallbackState = stateList[
    stateList.length - 1
  ] as keyof typeof conditionContent;

  // Default or error handling if no keys match
  return (
    conditionContent[`${state}` as keyof typeof conditionContent] ??
    conditionContent.fallback ??
    (conditionContent[fallbackState] as Content)
  );
};
