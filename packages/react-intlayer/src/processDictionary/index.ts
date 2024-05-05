/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Locales, getConfiguration } from '@intlayer/config/client';
import {
  NodeType,
  type QuantityContent,
  type LanguageContent,
  findMatchingCondition,
  type KeyPath,
  type Dictionary,
  type DictionaryValue,
  type TranslationContent,
  type EnumerationContent,
  type TypedNode,
} from '@intlayer/core';
import { renderContentEditor } from 'intlayer-editor/client';
import { type ReactElement, createElement, type ReactNode } from 'react';
import { getEnumeration } from '../getEnumeration';
import { getTranslation } from '../getTranslation';
import type {
  TransformedContent,
  TransformedContentValue,
} from './contentDictionary';

const {
  internationalization: { defaultLocale },
  editor: { isActive },
} = getConfiguration();

const processTranslation = (
  languageContent: LanguageContent<DictionaryValue>,
  locale: Locales,
  dictionaryId: string,
  dictionaryPath: string,
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
    dictionaryId,
    dictionaryPath,
    resultKeyPath,
    locale
  );
};

const processEnumeration =
  (
    enumerationContent: QuantityContent<DictionaryValue>,
    locale: Locales,
    dictionaryId: string,
    dictionaryPath: string,
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
      dictionaryId,
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
  dictionaryId: string,
  dictionaryPath: string,
  keyPath: KeyPath[] = []
): TransformedContentValue => {
  if (typeof field === 'object') {
    if (
      (field as TranslationContent<DictionaryValue>).nodeType ===
      NodeType.Translation
    ) {
      return processTranslation(
        field as LanguageContent<DictionaryValue>,
        locale,
        dictionaryId,
        dictionaryPath,
        keyPath
      ) as TransformedContentValue;
    }

    if (
      (field as EnumerationContent<DictionaryValue>).nodeType ===
      NodeType.Enumeration
    ) {
      return processEnumeration(
        field as QuantityContent<DictionaryValue>,
        locale,
        dictionaryId,
        dictionaryPath,
        keyPath
      );
    }
  }

  return processDictionary(
    field!,
    dictionaryId,
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

  // Destructure the component properties

  const convertChildrenAsArray = (element: ReactElement): ReactElement => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: ReactNode[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children).forEach((key) => {
        childrenResult.push(createReactElement(children[key]));
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

  const fixedElement = convertChildrenAsArray(element);

  const { type, props } = fixedElement;

  // Create and return the React element
  return createElement(type ?? 'div', props, ...props.children);
};

const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

/**
 * Function that process a dictionary and return the result to be used in the application.
 */
export const processDictionary = (
  content: Dictionary | DictionaryValue,
  dictionaryId: string,
  dictionaryPath: string,
  keyPath: KeyPath[] = [],
  locale: Locales = defaultLocale
  // eslint-disable-next-line sonarjs/cognitive-complexity
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
        dictionaryId,
        dictionaryPath,
        keyPath
      ) as TransformedContent;
    } else if (isArray) {
      // Eslint fix because promises are awaited during build stage
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result = (content as DictionaryValue[]).map((field, key) => {
        const resultKeyPath: KeyPath[] = [
          ...keyPath,
          { type: 'ArrayExpression', key },
        ];

        return processNode(
          field,
          locale,
          dictionaryId,
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
          { type: 'ObjectExpression', key },
        ];

        result[key] = processNode(
          field,
          locale,
          dictionaryId,
          dictionaryPath,
          resultKeyPath
        );
      }
    }

    return result;
  }

  if (typeof content === 'string' && isActive) {
    try {
      // renderContentEditor come from intlayer-editor, which is an optional dependency.
      // intlayer-editor should be installed in the project to use the content editor.
      return renderContentEditor(
        content,
        dictionaryId,
        dictionaryPath,
        keyPath
      );
    } catch (e) {
      // If renderContentEditor not available, it will return the content as is.
      return content;
    }
  }

  // If it's a string, number, or function, return it
  return content;
};
