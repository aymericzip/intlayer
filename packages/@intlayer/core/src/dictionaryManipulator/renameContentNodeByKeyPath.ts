import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';

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
    }

    if (
      keyObj.type === NodeType.Translation ||
      keyObj.type === NodeType.Enumeration ||
      keyObj.type === NodeType.Condition
    ) {
      lastKey = keyObj.type;
      currentValue = currentValue[keyObj.type][keyObj.key];
    }

    if (
      keyObj.type === NodeType.Markdown ||
      keyObj.type === NodeType.ReactNode ||
      keyObj.type === NodeType.Insertion ||
      keyObj.type === NodeType.File
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
