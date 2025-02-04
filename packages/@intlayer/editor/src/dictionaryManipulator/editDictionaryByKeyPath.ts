/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DictionaryValue, type KeyPath, NodeType } from '@intlayer/core';

type LastKeyType = string | number;

export const editDictionaryByKeyPath = (
  dictionaryContent: DictionaryValue,
  keyPath: KeyPath[],
  newValue: DictionaryValue
): DictionaryValue => {
  let currentValue: any = dictionaryContent;
  let parentValue: any = null;
  let lastKeys: LastKeyType[] = [];

  for (const keyObj of keyPath) {
    parentValue = currentValue;

    if (keyObj.type === NodeType.Object) {
      lastKeys = [keyObj.key];

      if (!currentValue[keyObj.key]) {
        currentValue = {
          ...currentValue,
          [keyObj.key]: {},
        };
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Array) {
      lastKeys = [keyObj.key];

      if (!currentValue[keyObj.key]) {
        currentValue[keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      lastKeys = [NodeType.Translation, keyObj.key];

      if (!currentValue[NodeType.Translation]) {
        currentValue[NodeType.Translation] = {
          ...currentValue[NodeType.Translation],
          [keyObj.key]: newValue,
        };
      }
      currentValue = currentValue[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      lastKeys = [NodeType.Enumeration, keyObj.key];

      if (!currentValue[NodeType.Enumeration]) {
        currentValue[NodeType.Enumeration] = {
          ...currentValue[NodeType.Enumeration],
          [keyObj.key]: newValue,
        };
      }
      currentValue = currentValue[NodeType.Enumeration][keyObj.key];
    }
  }

  // Assign the new value to the last key of the parent
  if (parentValue && lastKeys.length > 0) {
    for (const key of lastKeys.slice(0, -1)) {
      parentValue = parentValue[key];
    }
    if (
      // Remove the field if the new value is undefined
      typeof newValue === 'undefined'
    ) {
      delete parentValue[lastKeys[lastKeys.length - 1]];
    } else {
      parentValue[lastKeys[lastKeys.length - 1]] = newValue;
    }
  }

  return dictionaryContent;
};
