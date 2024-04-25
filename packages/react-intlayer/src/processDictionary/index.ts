/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Locales, getConfiguration } from '@intlayer/config/client';
import {
  NodeType,
  type QuantityContent,
  type LanguageContent,
} from '@intlayer/core';
import { type ReactElement, createElement, type ReactNode } from 'react';
import { getEnumeration } from '../getEnumeration';
import { getTranslation } from '../getTranslation';
import type {
  Content,
  ContentValue,
  TransformedContent,
  TransformedContentValue,
} from './contentDictionary';

const { defaultLocale } = getConfiguration().internationalization;

const processTranslation = (
  languageContent: LanguageContent<ContentValue>,
  locale: Locales
): TransformedContent => {
  const translationResult: ContentValue = getTranslation<ContentValue>(
    languageContent,
    locale
  );

  return processDictionary(translationResult as Content, locale);
};

const processEnumeration = (
  enumerationContent: QuantityContent<ContentValue>,
  locale: Locales
): TransformedContentValue => {
  return (quantity: number): TransformedContentValue => {
    const enumerationResult: ContentValue = getEnumeration<ContentValue>(
      enumerationContent,
      quantity
    );

    //
    return processDictionary(enumerationResult as Content, locale);
  };
};

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

export const processNode = (
  field: ContentValue | undefined,
  locale: Locales
): TransformedContentValue => {
  if (typeof field !== 'object' || field === null) {
    return field;
  }

  if (field.nodeType === NodeType.Translation) {
    return processTranslation(field as LanguageContent<ContentValue>, locale);
  }

  if (field.nodeType === NodeType.Enumeration) {
    return processEnumeration(
      field satisfies QuantityContent<ContentValue>,
      locale
    );
  }

  if (typeof (field as any).type === 'undefined') {
    return processDictionary(field as Content, locale);
  }

  return field as TransformedContentValue;
};

// This function recursively creates React elements from a given JSON-like structure
const createReactElement = (element: ReactElement) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  // Destructure the component properties
  const {
    type,
    props: { children, ...propsWithoutChildren },
  } = element;

  const childrenResult: ReactNode[] = [];

  if (typeof children === 'object') {
    // Create the children elements recursively, if any
    Object.keys(children).forEach((key) => {
      childrenResult.push(createReactElement(children[key]));
    });
  }

  // Create and return the React element
  return createElement(type ?? 'div', propsWithoutChildren, ...childrenResult);
};

/**
 * Function that process a dictionary and return the result to be used in the application.
 */
export const processDictionary = (
  content: Content,
  locale: Locales = defaultLocale
): TransformedContent => {
  // If it's a React element, render it
  if (isReactNode(content)) {
    return createReactElement(
      content as unknown as ReactElement
    ) as unknown as TransformedContent;
  }

  if (content && typeof content === 'object') {
    const result: TransformedContent = {};

    // List each key in the content and process it
    for (const key of Object.keys(content)) {
      const field = content[key];

      result[key] = processNode(field, locale);
    }

    return result;
  }

  // If it's a string, number, or function, return it
  return content;
};
