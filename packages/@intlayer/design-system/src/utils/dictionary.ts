/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NodeType,
  type TranslationContent,
  type Dictionary,
  type DictionaryValue,
  type KeyPath,
  type EnumerationContent,
} from '@intlayer/core';
import { isValidElement } from 'react';

export const getDictionaryValueByKeyPath = (
  dictionaryContent: DictionaryValue,
  keyPath: KeyPath[]
): DictionaryValue => {
  let currentValue: any = dictionaryContent;

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

    if (keyObj.type === NodeType.Object) {
      lastKeys = [keyObj.key];

      if (!currentValue[keyObj.key]) {
        currentValue = {
          [keyObj.key]: {},
        };
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Array) {
      lastKeys = [keyObj.key];

      if (!currentValue[keyObj.key]) {
        currentValue[keyObj.key] = [];
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      lastKeys = [NodeType.Translation, keyObj.key];

      if (!currentValue[NodeType.Translation]) {
        currentValue[NodeType.Translation] = {
          [keyObj.key]: newValue,
        };
      }
      currentValue = currentValue[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      lastKeys = [NodeType.Enumeration, keyObj.key];

      if (!currentValue[NodeType.Enumeration]) {
        currentValue[NodeType.Enumeration] = {
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

export const removeDictionaryValueByKeyPath = (
  dictionaryContent: Dictionary,
  keyPath: KeyPath[]
): Dictionary => {
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

export const getSectionType = (section: DictionaryValue): NodeType => {
  if (typeof section === 'string') {
    return NodeType.Text;
  }

  if (
    (section as TranslationContent<unknown>)?.nodeType === NodeType.Translation
  ) {
    return NodeType.Translation;
  }

  if (
    (section as EnumerationContent<unknown>)?.nodeType === NodeType.Enumeration
  ) {
    return NodeType.Enumeration;
  }

  if (Array.isArray(section)) {
    return NodeType.Array;
  }

  if (isValidElement(section)) {
    return NodeType.ReactNode;
  }

  return NodeType.Object;
};
