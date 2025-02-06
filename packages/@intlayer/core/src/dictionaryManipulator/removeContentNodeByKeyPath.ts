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
    } else if (keyObj.type === NodeType.Translation) {
      lastKey = NodeType.Translation;
      currentValue = currentValue[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      lastKey = NodeType.Enumeration;
      currentValue = currentValue[NodeType.Enumeration][keyObj.key];
    } else if (keyObj.type === NodeType.Condition) {
      lastKey = NodeType.Condition;
      currentValue = currentValue[NodeType.Condition];
    } else if (keyObj.type === NodeType.Markdown) {
      lastKey = NodeType.Markdown;
      currentValue = currentValue[NodeType.Markdown];
    } else if (keyObj.type === NodeType.ReactNode) {
      lastKey = NodeType.ReactNode;
      currentValue = currentValue[NodeType.ReactNode];
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
