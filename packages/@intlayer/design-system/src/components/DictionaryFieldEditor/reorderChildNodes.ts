import type { ContentNode } from '@intlayer/types/dictionary';
import { moveItem } from '../LocaleSwitcherContentDropDown/moveItem';

/** Key of a child inside its parent: object key or array index. */
export type ChildNodeKey = string | number;

/**
 * Returns a copy of `parentNode` where the child `sourceKey` takes the
 * position of `targetKey`. Arrays move the item; plain objects rebuild their
 * keys in the new order (values are kept as is).
 *
 * Integer-like object keys are always enumerated first by JavaScript, so they
 * cannot be reordered among themselves.
 */
export const reorderChildNodes = (
  parentNode: ContentNode,
  sourceKey: ChildNodeKey,
  targetKey: ChildNodeKey
): ContentNode => {
  if (Array.isArray(parentNode)) {
    const items = parentNode as ContentNode[];
    const indexes = items.map((_, index) => index);
    const reorderedIndexes = moveItem(
      indexes,
      Number(sourceKey),
      Number(targetKey)
    );

    return reorderedIndexes.map(
      (index) => items[index]
    ) as unknown as ContentNode;
  }

  if (parentNode && typeof parentNode === 'object') {
    const entries = parentNode as unknown as Record<string, ContentNode>;
    const reorderedKeys = moveItem(
      Object.keys(entries),
      String(sourceKey),
      String(targetKey)
    );

    return Object.fromEntries(
      reorderedKeys.map((key) => [key, entries[key]])
    ) as unknown as ContentNode;
  }

  return parentNode;
};
