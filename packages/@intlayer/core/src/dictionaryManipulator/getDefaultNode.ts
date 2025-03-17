import type { LocalesValues } from '@intlayer/config/client';
import { type ContentNode, NodeType } from '../types';

export const getDefaultNode = (
  nodeType: NodeType,
  locales: LocalesValues[],
  content?: ContentNode
): ContentNode => {
  switch (nodeType) {
    case NodeType.Translation:
      return {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: Object.assign(
          {},
          ...locales.map((locale) => ({
            [locale]: content ?? '',
          }))
        ),
      } as ContentNode;

    case NodeType.Enumeration:
      return {
        nodeType: NodeType.Enumeration,
        [NodeType.Enumeration]: {
          '1': content ?? '',
        },
      } as ContentNode;

    case NodeType.Condition:
      return {
        nodeType: NodeType.Condition,
        [NodeType.Condition]: {
          true: content ?? '',
          false: content ?? '',
        },
      } as ContentNode;

    case NodeType.Insertion:
      return {
        nodeType: NodeType.Insertion,
        [NodeType.Insertion]: {
          insertion: content ?? '',
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
        [NodeType.Markdown]: content ?? '',
      } as ContentNode;

    case NodeType.File:
      return {
        nodeType: NodeType.File,
        [NodeType.File]: content ?? '',
      } as ContentNode;

    case NodeType.Object:
      return {
        newKey: content ?? '',
      } as unknown as ContentNode;

    case NodeType.Array:
      return [content ?? ''] as unknown as ContentNode;

    case NodeType.Text:
      return content ?? '';

    case NodeType.Number:
      return content ?? 0;

    case NodeType.Boolean:
      return content ?? true;

    default:
      return content ?? '';
  }
};
