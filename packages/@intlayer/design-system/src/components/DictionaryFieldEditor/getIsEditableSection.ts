import {
  type ContentNode,
  type TranslationContent,
  type EnumerationContent,
  type RecursiveContentNode,
  NodeType,
  ConditionContent,
  MarkdownContent,
} from '@intlayer/core';
import { isValidElement } from 'react';

const getIsReactNodeContent = (section: ContentNode) =>
  // Check if type of section is multilingual content
  isValidElement(section);

const getIsStringTranslationContent = (section: ContentNode) =>
  // Check if type of section is multilingual content
  (section as TranslationContent<unknown>)?.nodeType === NodeType.Translation &&
  // Check if the content is a string
  typeof Object.values(
    (section as TranslationContent<unknown>)[NodeType.Translation]
  )[0] === 'string';

const getIsStringEnumerationContent = (section: ContentNode) =>
  // Check if type of section is enumeration content
  (section as EnumerationContent<unknown>)?.nodeType === NodeType.Enumeration &&
  // Check if the enum has no content
  (Object.values((section as EnumerationContent<unknown>)[NodeType.Enumeration])
    .length === 0 ||
    // Check if the content is a string
    typeof Object.values(
      (section as EnumerationContent<unknown>)[NodeType.Enumeration]
    )[0] === 'string');

const getIsStringConditionalContent = (section: ContentNode) =>
  // Check if the content is an array
  (section as ConditionContent<unknown>)?.nodeType === NodeType.Condition &&
  // Check if the array has no content
  typeof Object.values(
    (section as ConditionContent<unknown>)[NodeType.Condition]
  )[0] === 'string';

const getIsStringMarkdownContent = (section: ContentNode) =>
  // Check if the content is an array
  (section as MarkdownContent)?.nodeType === NodeType.Markdown;

const getIsStringArrayContent = (section: ContentNode) =>
  // Check if the content is an array
  Array.isArray(section) &&
  // Check if the array has no content
  (section.length === 0 ||
    // Check if the content is a string
    (section as RecursiveContentNode[]).every((el) => typeof el === 'string'));

export const getIsEditableSection = (section: ContentNode) =>
  typeof section === 'string' || // String
  getIsReactNodeContent(section) || // ReactNode
  getIsStringTranslationContent(section) || // Translation
  getIsStringEnumerationContent(section) || // Translation
  getIsStringConditionalContent(section) || // Condition
  getIsStringMarkdownContent(section) || // Markdown
  getIsStringArrayContent(section); // Array
