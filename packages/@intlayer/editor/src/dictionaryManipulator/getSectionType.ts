import {
  type TranslationContent,
  type EnumerationContent,
  type DictionaryValue,
  NodeType,
} from '@intlayer/core';
import { isValidElement } from './isValidReactElement';

export const getSectionType = (section: DictionaryValue): NodeType => {
  if (typeof section === 'string') {
    return NodeType.Text;
  }

  if (
    (section as TranslationContent<unknown>)?.nodeType === NodeType.Translation
  ) {
    return NodeType.Translation;
  }

  if (
    (section as EnumerationContent<unknown>)?.nodeType === NodeType.Enumeration
  ) {
    return NodeType.Enumeration;
  }

  if (Array.isArray(section)) {
    return NodeType.Array;
  }

  if (isValidElement(section)) {
    return NodeType.ReactNode;
  }

  return NodeType.Object;
};
