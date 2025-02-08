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

export const getSectionType = (section: ContentNode): NodeType => {
  if (typeof section === 'string') {
    return NodeType.Text;
  }

  if ((section as TranslationContent)?.nodeType === NodeType.Translation) {
    return NodeType.Translation;
  }

  if ((section as EnumerationContent)?.nodeType === NodeType.Enumeration) {
    return NodeType.Enumeration;
  }

  if ((section as ConditionContent)?.nodeType === NodeType.Condition) {
    return NodeType.Condition;
  }

  if ((section as MarkdownContent)?.nodeType === NodeType.Markdown) {
    return NodeType.Markdown;
  }

  if (
    (section as NestedContent<DictionaryKeys>)?.nodeType === NodeType.Nested
  ) {
    return NodeType.Nested;
  }

  if (Array.isArray(section)) {
    return NodeType.Array;
  }

  if (isValidElement(section)) {
    return NodeType.ReactNode;
  }

  return NodeType.Object;
};
