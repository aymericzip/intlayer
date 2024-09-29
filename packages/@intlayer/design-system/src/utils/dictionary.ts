/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NodeType,
  type Dictionary,
  type DictionaryValue,
  type KeyPath,
} from '@intlayer/core';

export const getDictionaryValueByKeyPath = (
  dictionaryContent: Dictionary,
  keyPath: KeyPath[]
): Dictionary => {
  let currentValue: any = dictionaryContent;

  for (const keyObj of keyPath) {
    if (
      keyObj.type === 'ObjectExpression' ||
      keyObj.type === 'ArrayExpression'
    ) {
      currentValue = currentValue?.[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      currentValue = currentValue?.[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      currentValue = currentValue?.[NodeType.Enumeration][keyObj.key];
    }
  }

  return currentValue as Dictionary;
};

type LastKeyType = string | number;

export const editDictionaryByKeyPath = (
  dictionaryContent: Dictionary,
  keyPath: KeyPath[],
  newValue: DictionaryValue
): Dictionary => {
  let currentValue: any = dictionaryContent;
  let parentValue: any = null;
  let lastKeys: LastKeyType[] = [];

  for (const keyObj of keyPath) {
    parentValue = currentValue;

    if (keyObj.type === 'ObjectExpression') {
      lastKeys = [keyObj.key];

      if (!currentValue[keyObj.key]) {
        currentValue[keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === 'ArrayExpression') {
      lastKeys = [keyObj.key];

      if (!currentValue[keyObj.key]) {
        currentValue[keyObj.key] = [];
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      lastKeys = [NodeType.Translation, keyObj.key];

      if (!currentValue[NodeType.Translation]) {
        currentValue[NodeType.Translation] = {
          [keyObj.key]: {},
        };
      }
      currentValue = currentValue[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      lastKeys = [NodeType.Enumeration, keyObj.key];

      if (!currentValue[NodeType.Enumeration]) {
        currentValue[NodeType.Enumeration] = {
          [keyObj.key]: {},
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
    parentValue[lastKeys[lastKeys.length - 1]] = newValue;
  }

  return dictionaryContent;
};

export const removeDictionaryValueByKeyPath = (
  dictionaryContent: Dictionary,
  keyPath: KeyPath[]
): Dictionary => {
  let currentValue: any = dictionaryContent;
  let parentValue: any = null;
  let lastKey: string | number | null = null;

  for (const keyObj of keyPath) {
    parentValue = currentValue;

    if (
      keyObj.type === 'ObjectExpression' ||
      keyObj.type === 'ArrayExpression'
    ) {
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
      parentValue.splice(lastKey as number, 1);
    } else {
      delete parentValue[lastKey];
    }
  }

  return dictionaryContent;
};
