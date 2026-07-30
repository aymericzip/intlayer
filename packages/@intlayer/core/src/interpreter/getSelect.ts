import type { SelectContentStates } from '../transpiler';

/**
 * Picks content from a select map based on an arbitrary string value.
 *
 * Resolution order:
 * 1. Exact match on the provided value.
 * 2. The `fallback` key.
 * 3. The `other` key — kept for content imported from an ICU `select` message,
 *    where the catch-all case is named `other`.
 * 4. The last declared key, so a select node never resolves to `undefined`.
 *
 * @param selectContent - A map of string cases to content.
 * @param value - The value to match against the declared cases.
 * @returns The matching content.
 *
 * @example
 * ```ts
 * const content = getSelect({
 *   draft: 'This post is a draft',
 *   published: 'This post is live',
 *   fallback: 'Unknown status',
 * }, 'published');
 * // 'This post is live'
 * ```
 */
export const getSelect = <const Content>(
  selectContent: SelectContentStates<Content>,
  value?: string
): Content => {
  const caseList = Object.keys(selectContent);
  const lastCase = caseList[caseList.length - 1] as keyof typeof selectContent;

  return (selectContent[value as keyof typeof selectContent] ??
    selectContent.fallback ??
    selectContent.other ??
    selectContent[lastCase]) as Content;
};
