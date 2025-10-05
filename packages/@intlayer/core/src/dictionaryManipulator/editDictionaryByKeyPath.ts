import { type KeyPath, NodeType } from '../types';
import type { ContentNode } from '../types/dictionary';

type LastKeyType = string | number;

export const editDictionaryByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[],
  newValue: ContentNode
): ContentNode => {
  let currentValue: any = dictionaryContent;
  let parentValue: any = null;
  let lastKeys: LastKeyType[] = [];

  if (keyPath.length === 0) {
    return newValue;
  }

  for (let i = 0; i < keyPath.length; i++) {
    const keyObj = keyPath[i];
    parentValue = currentValue;

    if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
      lastKeys = [keyObj.key];
      if (
        !currentValue[keyObj.key] ||
        typeof currentValue[keyObj.key] !== 'object'
      ) {
        currentValue[keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.key];
    }

    if (
      keyObj.type === NodeType.Translation ||
      keyObj.type === NodeType.Enumeration
    ) {
      lastKeys = [keyObj.type, keyObj.key];
      if (
        !currentValue[keyObj.type] ||
        typeof currentValue[keyObj.type] !== 'object'
      ) {
        currentValue[keyObj.type] = {};
      }
      if (
        !currentValue[keyObj.type][keyObj.key] ||
        typeof currentValue[keyObj.type][keyObj.key] !== 'object'
      ) {
        currentValue[keyObj.type][keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.type][keyObj.key];
    }

    if (
      keyObj.type === NodeType.Enumeration ||
      keyObj.type === NodeType.Condition
    ) {
      lastKeys = [keyObj.type, keyObj.key];
      if (
        !currentValue[keyObj.type] ||
        typeof currentValue[keyObj.type] !== 'object'
      ) {
        currentValue[keyObj.type] = {};
      }
      if (
        !currentValue[keyObj.type][keyObj.key] ||
        typeof currentValue[keyObj.type][keyObj.key] !== 'object'
      ) {
        currentValue[keyObj.type][keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.type][keyObj.key];
    }

    if (
      keyObj.type === NodeType.Markdown ||
      keyObj.type === NodeType.Insertion
    ) {
      lastKeys = [keyObj.type];
      if (
        !currentValue[keyObj.type] ||
        typeof currentValue[keyObj.type] !== 'object'
      ) {
        currentValue[keyObj.type] = '';
      }
      currentValue = currentValue[keyObj.type];
    }

    if (keyObj.type === NodeType.File) {
      lastKeys = ['content'];

      currentValue = currentValue.content;
    }

    if (keyObj.type) {
      // No treated TypedNode

      currentValue = currentValue;
    }

    // Only update the value when processing the last key in the keyPath.
    if (i === keyPath.length - 1 && parentValue && lastKeys.length > 0) {
      let target = parentValue;
      // Drill down if lastKeys contains more than one key.
      for (const key of lastKeys.slice(0, -1)) {
        target = target[key];
      }
      if (typeof newValue === 'undefined') {
        delete target[lastKeys[lastKeys.length - 1]];
      } else {
        target[lastKeys[lastKeys.length - 1]] = newValue;
      }
    }
  }

  return dictionaryContent;
};
