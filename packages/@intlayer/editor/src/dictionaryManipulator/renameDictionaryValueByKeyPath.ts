/* eslint-disable @typescript-eslint/no-explicit-any */

import { DictionaryValue, KeyPath, NodeType } from '@intlayer/core';

export const renameDictionaryValueByKeyPath = (
  dictionaryContent: DictionaryValue,
  newKey: string | number,
  keyPath: KeyPath[]
): DictionaryValue => {
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
    }
  }

  // Assign the new value to the last key of the parent while preserving the order
  if (parentValue && lastKey !== null) {
    if (Array.isArray(parentValue)) {
      parentValue[lastKey as number] = currentValue;
    } else {
      const newParentValue: any = {};
      for (const key of Object.keys(parentValue)) {
        if (key === lastKey) {
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
