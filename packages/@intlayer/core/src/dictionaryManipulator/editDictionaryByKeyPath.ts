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

  for (let i = 0; i < keyPath.length; i++) {
    const keyObj = keyPath[i];
    parentValue = currentValue;

    if (keyObj.type === NodeType.Object) {
      lastKeys = [keyObj.key];
      if (
        !currentValue[keyObj.key] ||
        typeof currentValue[keyObj.key] !== 'object'
      ) {
        currentValue[keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Array) {
      lastKeys = [keyObj.key];
      if (
        !currentValue[keyObj.key] ||
        typeof currentValue[keyObj.key] !== 'object'
      ) {
        currentValue[keyObj.key] = {};
      }
      currentValue = currentValue[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      lastKeys = [NodeType.Translation, keyObj.key];
      if (
        !currentValue[NodeType.Translation] ||
        typeof currentValue[NodeType.Translation] !== 'object'
      ) {
        currentValue[NodeType.Translation] = {};
      }
      if (
        !currentValue[NodeType.Translation][keyObj.key] ||
        typeof currentValue[NodeType.Translation][keyObj.key] !== 'object'
      ) {
        currentValue[NodeType.Translation][keyObj.key] = {};
      }
      currentValue = currentValue[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      lastKeys = [NodeType.Enumeration, keyObj.key];
      if (
        !currentValue[NodeType.Enumeration] ||
        typeof currentValue[NodeType.Enumeration] !== 'object'
      ) {
        currentValue[NodeType.Enumeration] = {};
      }
      if (
        !currentValue[NodeType.Enumeration][keyObj.key] ||
        typeof currentValue[NodeType.Enumeration][keyObj.key] !== 'object'
      ) {
        currentValue[NodeType.Enumeration][keyObj.key] = {};
      }
      currentValue = currentValue[NodeType.Enumeration][keyObj.key];
    } else if (keyObj.type === NodeType.Condition) {
      lastKeys = [NodeType.Condition, keyObj.key];
      if (
        !currentValue[NodeType.Condition] ||
        typeof currentValue[NodeType.Condition] !== 'object'
      ) {
        currentValue[NodeType.Condition] = {};
      }
      if (
        !currentValue[NodeType.Condition][keyObj.key] ||
        typeof currentValue[NodeType.Condition][keyObj.key] !== 'object'
      ) {
        currentValue[NodeType.Condition][keyObj.key] = {};
      }
      currentValue = currentValue[NodeType.Condition][keyObj.key];
    } else if (keyObj.type === NodeType.Markdown) {
      lastKeys = [NodeType.Markdown];
      if (
        !currentValue[NodeType.Markdown] ||
        typeof currentValue[NodeType.Markdown] !== 'object'
      ) {
        currentValue[NodeType.Markdown] = '';
      }
      currentValue = currentValue[NodeType.Markdown];
    } else if (keyObj.type === NodeType.Nested) {
      lastKeys = [NodeType.Nested];
      if (
        !currentValue[NodeType.Nested] ||
        typeof currentValue[NodeType.Nested] !== 'object'
      ) {
        currentValue[NodeType.Nested] = {};
      }
      currentValue = currentValue[NodeType.Nested];
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
