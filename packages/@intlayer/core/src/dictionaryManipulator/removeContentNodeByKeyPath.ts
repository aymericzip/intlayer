import { type KeyPath, NodeType } from '../types';
import type { ContentNode } from '../types/dictionary';

export const removeContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[]
): ContentNode => {
  let currentValue: any = dictionaryContent;
  let parentValue: any = null;
  let lastKey: string | number | null = null;

  for (const keyObj of keyPath) {
    parentValue = currentValue;

    if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
      lastKey = keyObj.key;
      currentValue = currentValue[keyObj.key];
    }

    if (
      keyObj.type === NodeType.Translation ||
      keyObj.type === NodeType.Enumeration ||
      keyObj.type === NodeType.Condition
    ) {
      lastKey = keyObj.type;
      currentValue = currentValue[keyObj.type][keyObj.key];
    }

    if (
      keyObj.type === NodeType.Markdown ||
      keyObj.type === NodeType.ReactNode ||
      keyObj.type === NodeType.Insertion ||
      keyObj.type === NodeType.File
    ) {
      lastKey = keyObj.type;
      currentValue = currentValue[keyObj.type];
    }
  }

  if (parentValue && lastKey !== null) {
    if (Array.isArray(parentValue)) {
      parentValue.splice(lastKey as unknown as number, 1);
    } else {
      delete parentValue[lastKey];
    }
  }

  return dictionaryContent;
};
