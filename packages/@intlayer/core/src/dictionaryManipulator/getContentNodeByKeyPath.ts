import { type KeyPath, NodeType } from '../types';
import type { ContentNode } from '../types/dictionary';

export const getContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[]
): ContentNode => {
  let currentValue: any = JSON.parse(JSON.stringify(dictionaryContent ?? {}));

  for (const keyObj of keyPath) {
    if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
      currentValue = currentValue?.[keyObj.key];
    } else if (keyObj.type === NodeType.Translation) {
      currentValue = currentValue?.[NodeType.Translation][keyObj.key];
    } else if (keyObj.type === NodeType.Enumeration) {
      currentValue = currentValue?.[NodeType.Enumeration][keyObj.key];
    } else if (keyObj.type === NodeType.Condition) {
      currentValue = currentValue[NodeType.Condition];
    } else if (keyObj.type === NodeType.Markdown) {
      currentValue = currentValue[NodeType.Markdown];
    }
  }

  return currentValue as ContentNode;
};
