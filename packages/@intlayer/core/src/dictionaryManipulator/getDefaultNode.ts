import type { ContentNode } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';

export const getDefaultNode = (
  nodeType: NodeType,
  locales: LocalesValues[],
  content?: ContentNode
): ContentNode => {
  const clonedContent = structuredClone(content);
  switch (nodeType) {
    case NodeTypes.TRANSLATION:
      return {
        nodeType: NodeTypes.TRANSLATION,
        [NodeTypes.TRANSLATION]: Object.assign(
          {},
          ...locales.map((locale) => ({
            [locale]: structuredClone(clonedContent) ?? '',
          }))
        ),
      } as ContentNode;

    case NodeTypes.ENUMERATION:
      return {
        nodeType: NodeTypes.ENUMERATION,
        [NodeTypes.ENUMERATION]: {
          '1': clonedContent ?? '',
        },
      } as ContentNode;

    case NodeTypes.CONDITION:
      return {
        nodeType: NodeTypes.CONDITION,
        [NodeTypes.CONDITION]: {
          true: clonedContent ?? '',
          false: clonedContent ?? '',
        },
      } as ContentNode;

    case NodeTypes.INSERTION:
      return {
        nodeType: NodeTypes.INSERTION,
        [NodeTypes.INSERTION]: {
          insertion: clonedContent ?? '',
        },
      } as unknown as ContentNode;

    case NodeTypes.NESTED:
      return {
        nodeType: NodeTypes.NESTED,
        [NodeTypes.NESTED]: {
          dictionaryKey: '',
        },
      } as ContentNode;

    case NodeTypes.MARKDOWN:
      return {
        nodeType: NodeTypes.MARKDOWN,
        [NodeTypes.MARKDOWN]: clonedContent ?? '',
      } as ContentNode;

    case NodeTypes.HTML:
      return {
        nodeType: NodeTypes.HTML,
        [NodeTypes.HTML]: clonedContent ?? '',
        customComponents: [],
      } as ContentNode;

    case NodeTypes.FILE:
      return {
        nodeType: NodeTypes.FILE,
        [NodeTypes.FILE]: clonedContent ?? '',
      } as ContentNode;

    case NodeTypes.OBJECT:
      return {
        newKey: clonedContent ?? '',
      } as unknown as ContentNode;

    case NodeTypes.ARRAY:
      return [clonedContent ?? ''] as unknown as ContentNode;

    case NodeTypes.TEXT:
      return clonedContent ?? '';

    case NodeTypes.NUMBER:
      return clonedContent ?? 0;

    case NodeTypes.BOOLEAN:
      return clonedContent ?? true;

    default:
      return clonedContent ?? '';
  }
};
