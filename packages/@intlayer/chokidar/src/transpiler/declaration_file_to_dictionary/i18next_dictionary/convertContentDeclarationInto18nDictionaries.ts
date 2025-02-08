import { getConfiguration, type Locales } from '@intlayer/config';
import {
  NodeType,
  type TranslationContent,
  type EnumerationContent,
  type TypedNode,
  type ContentNode,
} from '@intlayer/core';
import { convertPluralsValues } from './convertPluralsValues';

type Dictionary = Record<string, unknown>;
export type I18nextDictionariesOutput = Partial<Record<Locales, Dictionary>>;

const {
  internationalization: { locales },
} = getConfiguration();

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' &&
  typeof node?.props !== 'undefined' &&
  typeof node?.type !== 'undefined';

// Build dictionary for a specific locale
const buildDictionary = (content: ContentNode, locale: Locales): unknown => {
  if (
    // Translation node
    content &&
    (content as TypedNode).nodeType === NodeType.Translation
  ) {
    const contentState = (content as TranslationContent)[NodeType.Translation];
    const result = contentState[locale as keyof typeof contentState];

    return buildDictionary(result as ContentNode, locale);
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
        value as ContentNode,
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
    typeof content === 'object' &&
    Array.isArray(content)
  ) {
    const result: unknown[] = [];

    Object.keys(content).forEach((dictionaryValue) => {
      result.push(
        buildDictionary(
          content[dictionaryValue as keyof typeof content] as ContentNode,
          locale
        )
      );
    });

    return result;
  } else if (
    // Nested object
    typeof content === 'object'
  ) {
    const result: Record<string, unknown> = {};

    Object.keys(content as Record<string, unknown>).forEach(
      (dictionaryValue) => {
        result[dictionaryValue] = buildDictionary(
          content?.[
            dictionaryValue as keyof typeof content
          ] as unknown as ContentNode,
          locale
        );
      }
    );

    return result;
  }

  return content;
};

export const createI18nextDictionaries = (
  content: ContentNode
): I18nextDictionariesOutput => {
  // Map dictionaries for each locale
  const result: I18nextDictionariesOutput = locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale]: buildDictionary(content, locale),
    }),
    {}
  );

  return result;
};
