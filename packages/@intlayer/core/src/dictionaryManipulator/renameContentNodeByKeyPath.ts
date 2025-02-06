import { type KeyPath, NodeType } from '../types';
import type { ContentNode } from '../types/dictionary';

export const renameContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
  newKey: KeyPath['key'],
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

  // Assign the new value to the last key of the parent while preserving the order
  if (parentValue && lastKey !== null) {
    if (Array.isArray(parentValue)) {
      parentValue[lastKey as number] = currentValue;
    } else {
      const newParentValue: any = {};
      for (const key of Object.keys(parentValue)) {
        if (key === lastKey && typeof newKey !== 'undefined') {
          newParentValue[newKey] = currentValue;
        } else {
          newParentValue[key] = parentValue[key];
        }
      }
      // Replace the contents of parentValue with newParentValue
      Object.keys(parentValue).forEach((key) => delete parentValue[key]);
      Object.assign(parentValue, newParentValue);
    }
  }

  return dictionaryContent;
};
