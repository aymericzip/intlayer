import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';

export const getContentNodeByKeyPath = (
  dictionaryContent: ContentNode,
  keyPath: KeyPath[],
  fallbackLocale?: LocalesValues
): ContentNode => {
  let currentValue: any = structuredClone(dictionaryContent);

  for (const keyObj of keyPath) {
    // Auto-resolve translation nodes when the key does not target translation
    while (
      currentValue?.nodeType === NodeTypes.TRANSLATION &&
      keyObj.type !== NodeTypes.TRANSLATION
    ) {
      const translations = currentValue[NodeTypes.TRANSLATION];
      if (!translations) break;
      currentValue =
        (fallbackLocale && translations[fallbackLocale]) ??
        Object.values(translations)[0];
    }

    if (keyObj.type === NodeTypes.OBJECT || keyObj.type === NodeTypes.ARRAY) {
      currentValue = currentValue?.[keyObj.key];
    }

    if (
      keyObj.type === NodeTypes.TRANSLATION ||
      keyObj.type === NodeTypes.CONDITION ||
      keyObj.type === NodeTypes.ENUMERATION ||
      keyObj.type === NodeTypes.PLURAL ||
      keyObj.type === NodeTypes.GENDER ||
      keyObj.type === NodeTypes.SELECT
    ) {
      currentValue = currentValue?.[keyObj.type]?.[keyObj.key];
    }

    if (
      keyObj.type === NodeTypes.MARKDOWN ||
      keyObj.type === NodeTypes.HTML ||
      keyObj.type === NodeTypes.INSERTION ||
      keyObj.type === NodeTypes.FILE
    ) {
      currentValue = currentValue?.[keyObj.type];
    }
  }

  return currentValue as ContentNode;
};
