import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';

import * as NodeTypes from '@intlayer/types/nodeType';

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

    if (keyObj.type === NodeTypes.OBJECT || keyObj.type === NodeTypes.ARRAY) {
      lastKey = keyObj.key;
      currentValue = currentValue[keyObj.key];
    }

    if (
      keyObj.type === NodeTypes.TRANSLATION ||
      keyObj.type === NodeTypes.ENUMERATION ||
      keyObj.type === NodeTypes.CONDITION
    ) {
      lastKey = keyObj.type;
      currentValue = currentValue[keyObj.type][keyObj.key];
    }

    if (
      keyObj.type === NodeTypes.MARKDOWN ||
      keyObj.type === NodeTypes.REACT_NODE ||
      keyObj.type === NodeTypes.HTML ||
      keyObj.type === NodeTypes.INSERTION ||
      keyObj.type === NodeTypes.FILE
    ) {
      lastKey = keyObj.type;
      currentValue = currentValue[keyObj.type];
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
      Object.keys(parentValue).forEach((key) => {
        delete parentValue[key];
      });
      Object.assign(parentValue, newParentValue);
    }
  }

  return dictionaryContent;
};
