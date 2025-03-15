import { type KeyPath, NodeType } from '../types';
import type { ContentNode } from '../types/dictionary';

export const getContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[]
): ContentNode => {
  let currentValue: any = structuredClone(dictionaryContent);

  for (const keyObj of keyPath) {
    if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
      currentValue = currentValue?.[keyObj.key];
    } else if (
      keyObj.type === NodeType.Translation ||
      keyObj.type === NodeType.Condition ||
      keyObj.type === NodeType.Enumeration
    ) {
      currentValue = currentValue?.[keyObj.type][keyObj.key];
    } else if (
      keyObj.type === NodeType.Markdown ||
      keyObj.type === NodeType.Insertion ||
      keyObj.type === NodeType.File
    ) {
      currentValue = currentValue?.[keyObj.type];
    }
  }

  return currentValue as ContentNode;
};
