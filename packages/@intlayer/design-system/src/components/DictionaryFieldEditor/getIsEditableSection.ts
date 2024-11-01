import {
  DictionaryValue,
  TranslationContent,
  NodeType,
  EnumerationContent,
} from '@intlayer/core';

const getIsStringTranslationContent = (section: DictionaryValue) =>
  // Check if type of section is multilingual content
  (section as TranslationContent<unknown>)?.nodeType === NodeType.Translation &&
  // Check if the content is a string
  typeof Object.values(
    (section as TranslationContent<unknown>)[NodeType.Translation]
  )[0] === 'string';

const getIsStringEnumerationContent = (section: DictionaryValue) =>
  // Check if type of section is enumeration content
  (section as EnumerationContent<unknown>)?.nodeType === NodeType.Enumeration &&
  // Check if the enum has no content
  (Object.values((section as EnumerationContent<unknown>)[NodeType.Enumeration])
    .length === 0 ||
    // Check if the content is a string
    typeof Object.values(
      (section as EnumerationContent<unknown>)[NodeType.Enumeration]
    )[0] === 'string');

const getIsStringArrayContent = (section: DictionaryValue) =>
  // Check if the content is an array
  Array.isArray(section) &&
  // Check if the array has no content
  (section.length === 0 ||
    // Check if the content is a string
    typeof section[0] === 'string');

export const getIsEditableSection = (section: DictionaryValue) =>
  typeof section === 'string' || // String
  getIsStringTranslationContent(section) || // Translation
  getIsStringEnumerationContent(section) || // Translation
  getIsStringArrayContent(section); // Array