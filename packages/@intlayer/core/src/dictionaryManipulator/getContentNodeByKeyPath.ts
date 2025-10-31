import {
  type ContentNode,
  type KeyPath,
  type Locale,
  NodeType,
} from '@intlayer/types';

export const getContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[],
  fallbackLocale?: Locale
): ContentNode => {
  let currentValue: any = structuredClone(dictionaryContent);

  for (const keyObj of keyPath) {
    // Auto-resolve translation nodes when fallbackLocale is provided
    if (fallbackLocale && currentValue?.nodeType === NodeType.Translation) {
      currentValue = currentValue?.[NodeType.Translation]?.[fallbackLocale];
    }

    if (keyObj.type === NodeType.Object || keyObj.type === NodeType.Array) {
      currentValue = currentValue?.[keyObj.key];
    }

    if (
      keyObj.type === NodeType.Translation ||
      keyObj.type === NodeType.Condition ||
      keyObj.type === NodeType.Enumeration
    ) {
      currentValue = currentValue?.[keyObj.type]?.[keyObj.key];
    }

    if (
      keyObj.type === NodeType.Markdown ||
      keyObj.type === NodeType.Insertion ||
      keyObj.type === NodeType.File
    ) {
      currentValue = currentValue?.[keyObj.type];
    }
  }

  return currentValue as ContentNode;
};
