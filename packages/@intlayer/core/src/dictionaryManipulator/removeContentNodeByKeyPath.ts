import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';

import * as NodeTypes from '@intlayer/types/nodeType';

export const removeContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
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

  if (parentValue && lastKey !== null) {
    if (Array.isArray(parentValue)) {
      parentValue.splice(lastKey as unknown as number, 1);
    } else {
      delete parentValue[lastKey];
    }
  }

  return dictionaryContent;
};
