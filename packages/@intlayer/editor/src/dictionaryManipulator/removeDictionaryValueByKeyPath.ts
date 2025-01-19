/* eslint-disable @typescript-eslint/no-explicit-any */

import { DictionaryValue, KeyPath, NodeType } from '@intlayer/core';

export const removeDictionaryValueByKeyPath = (
  dictionaryContent: DictionaryValue,
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

  if (parentValue && lastKey !== null) {
    if (Array.isArray(parentValue)) {
      parentValue.splice(lastKey as unknown as number, 1);
    } else {
      delete parentValue[lastKey];
    }
  }

  return dictionaryContent;
};
