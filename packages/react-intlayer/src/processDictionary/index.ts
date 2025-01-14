import { type Locales, getConfiguration } from '@intlayer/config/client';
import {
  NodeType,
  type QuantityContent,
  type LanguageContent,
  findMatchingCondition,
  type KeyPath,
  type DictionaryValue,
  type TranslationContent,
  type EnumerationContent,
  type TypedNode,
} from '@intlayer/core';
import { type ReactElement, createElement, type ReactNode, JSX } from 'react';
import { getEnumeration } from '../getEnumeration';
import { getTranslation } from '../getTranslation';
import type {
  TransformedContent,
  TransformedContentValue,
} from './contentDictionary';

const {
  internationalization: { defaultLocale },
} = getConfiguration();

const processTranslation = (
  languageContent: LanguageContent<DictionaryValue>,
  locale: Locales,
  dictionaryKey: string,
  dictionaryPath?: string,
  keyPath: KeyPath[] = []
): TransformedContent => {
  const translationResult: DictionaryValue = getTranslation<DictionaryValue>(
    languageContent,
    locale
  );

  const resultKeyPath: KeyPath[] = [
    ...keyPath,
    { type: NodeType.Translation, key: locale },
  ];

  return processDictionary(
    translationResult,
    dictionaryKey,
    dictionaryPath,
    resultKeyPath,
    locale
  );
};

const processEnumeration =
  (
    enumerationContent: QuantityContent<DictionaryValue>,
    locale: Locales,
    dictionaryKey: string,
    dictionaryPath?: string,
    keyPath: KeyPath[] = []
  ): TransformedContentValue =>
  (quantity: number): TransformedContentValue => {
    const enumerationResult: DictionaryValue = getEnumeration<DictionaryValue>(
      enumerationContent,
      quantity
    );

    const matchingCondition = findMatchingCondition(
      enumerationContent,
      quantity
    );

    const resultKeyPath: KeyPath[] = [
      ...keyPath,
      { type: NodeType.Enumeration, key: matchingCondition.toString() },
    ];

    return processDictionary(
      enumerationResult,
      dictionaryKey,
      dictionaryPath,
      resultKeyPath,
      locale
    ) as TransformedContentValue;
  };

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

export const processNode = (
  field: DictionaryValue | undefined,
  locale: Locales,
  dictionaryKey: string,
  dictionaryPath?: string,
  keyPath: KeyPath[] = []
): TransformedContentValue => {
  if (typeof field === 'object') {
    if (
      (field as TranslationContent<DictionaryValue>).nodeType ===
      NodeType.Translation
    ) {
      return processTranslation(
        field[
          NodeType.Translation as keyof typeof field
        ] as LanguageContent<DictionaryValue>,
        locale,
        dictionaryKey,
        dictionaryPath,
        keyPath
      ) as TransformedContentValue;
    }

    if (
      (field as EnumerationContent<DictionaryValue>).nodeType ===
      NodeType.Enumeration
    ) {
      return processEnumeration(
        field[
          NodeType.Enumeration as keyof typeof field
        ] as QuantityContent<DictionaryValue>,
        locale,
        dictionaryKey,
        dictionaryPath,
        keyPath
      );
    }
  }

  return processDictionary(
    field!,
    dictionaryKey,
    dictionaryPath,
    keyPath,
    locale
  ) as TransformedContentValue;
};

// This function recursively creates React elements from a given JSON-like structure
const createReactElement = (element: ReactElement) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  const convertChildrenAsArray = (
    element: ReactElement<{ children?: ReactNode }>
  ): ReactElement<{ children?: ReactNode }> => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: ReactNode[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children ?? {}).forEach((key) => {
        childrenResult.push(
          createReactElement((children ?? {})[key as keyof typeof children])
        );
      });

      return {
        ...element,
        props: { ...element.props, children: childrenResult },
      };
    }

    return {
      ...element,
      props: { ...element.props, children: element.props.children },
    };
  };

  const fixedElement = convertChildrenAsArray(
    element as ReactElement<{ children?: ReactNode }>
  );

  const { type, props } = fixedElement;

  // Create and return the React element
  return createElement(
    type ?? 'div',
    props,
    ...(props.children as ReactNode[])
  );
};

const traceKeys: string[] = ['filePath', 'nodeType'];

/**
 * Function that process a dictionary and return the result to be used in the application.
 */
export const processDictionary = (
  content: DictionaryValue,
  dictionaryKey: string,
  dictionaryPath?: string,
  keyPath: KeyPath[] = [],
  locale: Locales = defaultLocale
): TransformedContent => {
  // If it's a React element, render it
  if (isReactNode(content as Record<string, unknown>)) {
    return createReactElement(
      content as unknown as ReactElement
    ) as unknown as TransformedContent;
  }

  if (content && typeof content === 'object') {
    const isArray = Array.isArray(content);

    let result: TransformedContent = {};

    if (typeof (content as TypedNode).nodeType !== 'undefined') {
      return processNode(
        content as DictionaryValue,
        locale,
        dictionaryKey,
        dictionaryPath,
        keyPath
      ) as TransformedContent;
    } else if (isArray) {
      // Eslint fix because promises are awaited during build stage

      result = (content as DictionaryValue[]).map((field, key) => {
        const resultKeyPath: KeyPath[] = [
          ...keyPath,
          { type: NodeType.Array, key },
        ];

        return processNode(
          field,
          locale,
          dictionaryKey,
          dictionaryPath,
          resultKeyPath
        );
      }) as TransformedContent;
    } else {
      // List each key in the content and process it
      for (const key of Object.keys(content)) {
        const field = content[key as keyof typeof content];

        if (traceKeys.includes(key)) {
          result[key] = field as TransformedContentValue;
          continue;
        }

        const resultKeyPath: KeyPath[] = [
          ...keyPath,
          { type: NodeType.Object, key },
        ];

        const nodeResult = processNode(
          field,
          locale,
          dictionaryKey,
          dictionaryPath,
          resultKeyPath
        );

        result[key] = nodeResult;
      }
    }

    return result;
  }

  return {
    content: content as TransformedContentValue,
    keyPath,
    dictionaryKey,
    dictionaryPath,
  };
};
