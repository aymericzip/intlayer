import {
  type ContentNode,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';

export const getDefaultNode = (
  nodeType: NodeType,
  locales: LocalesValues[],
  content?: ContentNode
): ContentNode => {
  const clonedContent = structuredClone(content);
  switch (nodeType) {
    case NodeType.Translation:
      return {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: Object.assign(
          {},
          ...locales.map((locale) => ({
            [locale]: structuredClone(clonedContent) ?? '',
          }))
        ),
      } as ContentNode;

    case NodeType.Enumeration:
      return {
        nodeType: NodeType.Enumeration,
        [NodeType.Enumeration]: {
          '1': clonedContent ?? '',
        },
      } as ContentNode;

    case NodeType.Condition:
      return {
        nodeType: NodeType.Condition,
        [NodeType.Condition]: {
          true: clonedContent ?? '',
          false: clonedContent ?? '',
        },
      } as ContentNode;

    case NodeType.Insertion:
      return {
        nodeType: NodeType.Insertion,
        [NodeType.Insertion]: {
          insertion: clonedContent ?? '',
        },
      } as unknown as ContentNode;

    case NodeType.Nested:
      return {
        nodeType: NodeType.Nested,
        [NodeType.Nested]: {
          dictionaryKey: '',
        },
      } as ContentNode;

    case NodeType.Markdown:
      return {
        nodeType: NodeType.Markdown,
        [NodeType.Markdown]: clonedContent ?? '',
      } as ContentNode;

    case NodeType.File:
      return {
        nodeType: NodeType.File,
        [NodeType.File]: clonedContent ?? '',
      } as ContentNode;

    case NodeType.Object:
      return {
        newKey: clonedContent ?? '',
      } as unknown as ContentNode;

    case NodeType.Array:
      return [clonedContent ?? ''] as unknown as ContentNode;

    case NodeType.Text:
      return clonedContent ?? '';

    case NodeType.Number:
      return clonedContent ?? 0;

    case NodeType.Boolean:
      return clonedContent ?? true;

    default:
      return clonedContent ?? '';
  }
};
