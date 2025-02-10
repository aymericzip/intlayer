import { LocalesValues } from '@intlayer/config/client';
import {
  TranslationContent,
  EnumerationContent,
  ConditionContent,
  NestedContent,
  MarkdownContent,
} from '../transpiler';
import { ContentNode, NodeType } from '../types';

export const getDefaultNode = (
  nodeType: NodeType,
  locales: LocalesValues[],
  content?: ContentNode
) => {
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
      } as TranslationContent<ContentNode>;

    case NodeType.Enumeration:
      return {
        nodeType: NodeType.Enumeration,
        [NodeType.Enumeration]: {
          '1': content ?? '',
        },
      } as EnumerationContent<ContentNode>;

    case NodeType.Condition:
      return {
        nodeType: NodeType.Condition,
        [NodeType.Condition]: {
          true: content ?? '',
          false: content ?? '',
        },
      } as ConditionContent<ContentNode>;

    case NodeType.Nested:
      return {
        nodeType: NodeType.Nested,
        [NodeType.Nested]: {
          dictionaryKey: undefined,
        },
      } as NestedContent;

    case NodeType.Markdown:
      return {
        nodeType: NodeType.Markdown,
        [NodeType.Markdown]: content ?? '',
      } as MarkdownContent;

    case NodeType.Object:
      return {
        newKey: content ?? '',
      } as Record<string, ContentNode>;

    case NodeType.Array:
      return [content ?? ''] as Record<number, ContentNode>;

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
