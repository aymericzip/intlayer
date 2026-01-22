import type { ConditionContentStates } from '../transpiler';

/**
 * Picks content based on a boolean condition.
 *
 * @param conditionContent - A map with 'true', 'false', and optionally 'fallback' keys.
 * @param state - The boolean state to match.
 * @returns The matching content.
 *
 * @example
 * ```ts
 * const content = getCondition({
 *   'true': 'The condition is validated',
 *   'false': 'The condition is not validated',
 * }, true);
 * // 'The condition is validated'
 * ```
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
