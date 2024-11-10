import { getConfiguration, type Locales } from '@intlayer/config';
import {
  NodeType,
  type TranslationContent,
  type TypedNode,
  type EnumerationContent,
  DictionaryValue,
} from '@intlayer/core';
import { convertPluralsValues } from './convertPluralsValues';

type Dictionary = Record<string, unknown>;
export type I18nDictionariesOutput = Partial<Record<Locales, Dictionary>>;

const {
  internationalization: { locales },
} = getConfiguration();

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' &&
  typeof node?.props !== 'undefined' &&
  typeof node?.type !== 'undefined';

// Build dictionary for a specific locale
const buildDictionary = (
  content: DictionaryValue,
  locale: Locales
): unknown => {
  if (
    // Translation node
    content &&
    (content as TypedNode).nodeType === NodeType.Translation
  ) {
    const result = (content as TranslationContent<unknown>)[
      NodeType.Translation
    ][locale];

    return buildDictionary(result as DictionaryValue, locale);
  } else if (
    // Translation node
    content &&
    (content as TypedNode).nodeType === NodeType.Enumeration
  ) {
    const plurals: Record<string, unknown> = {};

    Object.keys(
      (content as EnumerationContent<unknown>)[NodeType.Enumeration]
    ).forEach((quantity) => {
      const letterNumber = convertPluralsValues(quantity);

      const value = (content as EnumerationContent<unknown>)[
        quantity as keyof EnumerationContent<unknown>
      ];

      plurals[`${letterNumber}_${letterNumber}`] = buildDictionary(
        value as DictionaryValue,
        locale
      );
    });

    return plurals;
  } else if (
    // React element node
    isReactNode(content as Record<string, unknown>)
  ) {
    return JSON.stringify(content);
  } else if (
    // Nested object
    typeof content === 'object'
  ) {
    const result: Record<string, unknown> = {};

    Object.keys(content).forEach((dictionaryValue) => {
      result[dictionaryValue] = buildDictionary(
        content[dictionaryValue as keyof typeof content] as DictionaryValue,
        locale
      );
    });

    return result;
  }

  return content;
};

export const createI18nDictionaries = (
  content: DictionaryValue
): I18nDictionariesOutput => {
  // Map dictionaries for each locale
  const result: I18nDictionariesOutput = locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale]: buildDictionary(content, locale),
    }),
    {}
  );

  return result;
};
