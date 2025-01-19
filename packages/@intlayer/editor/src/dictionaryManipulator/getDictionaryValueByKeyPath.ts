/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DictionaryValue, type KeyPath, NodeType } from '@intlayer/core';

export const getDictionaryValueByKeyPath = (
  dictionaryContent: DictionaryValue,
  keyPath: KeyPath[]
): DictionaryValue => {
  let currentValue: any = JSON.parse(JSON.stringify(dictionaryContent ?? {}));

  for (const keyObj of keyPath) {
    if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
      currentValue = currentValue?.[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      currentValue = currentValue?.[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      currentValue = currentValue?.[NodeType.Enumeration][keyObj.key];
    }
  }

  return currentValue as DictionaryValue;
};
