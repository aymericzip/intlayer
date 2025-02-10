import type {
  TranslationContent,
  EnumerationContent,
  ConditionContent,
  MarkdownContent,
  NestedContent,
} from '../transpiler';
import { NodeType, type DictionaryKeys } from '../types';
import type { ContentNode } from '../types/dictionary';
import { isValidElement } from '../utils/isValidReactElement';

export const getNodeType = (content: ContentNode): NodeType => {
  if (typeof content === 'string') {
    return NodeType.Text;
  }

  if ((content as TranslationContent)?.nodeType === NodeType.Translation) {
    return NodeType.Translation;
  }

  if ((content as EnumerationContent)?.nodeType === NodeType.Enumeration) {
    return NodeType.Enumeration;
  }

  if ((content as ConditionContent)?.nodeType === NodeType.Condition) {
    return NodeType.Condition;
  }

  if ((content as MarkdownContent)?.nodeType === NodeType.Markdown) {
    return NodeType.Markdown;
  }

  if (
    (content as NestedContent<DictionaryKeys>)?.nodeType === NodeType.Nested
  ) {
    return NodeType.Nested;
  }

  if (Array.isArray(content)) {
    return NodeType.Array;
  }

  if (isValidElement(content)) {
    return NodeType.ReactNode;
  }

  if (typeof content === 'number') {
    return NodeType.Number;
  }

  if (typeof content === 'boolean') {
    return NodeType.Boolean;
  }

  if (content && typeof content === 'object') {
    return NodeType.Object;
  }

  return NodeType.Unknown;
};
