/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import {
  NodeType,
  type QuantityContent,
  type LanguageContent,
} from '@intlayer/core';
import { getEnumeration } from '../getEnumeration';
import { getTranslation } from '../getTranslation';
import type {
  Content,
  ContentValue,
  TransformedContent,
  TransformedContentValue,
} from './contentDictionary';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

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

/**
 * Function that process a dictionary and return the result to be used in the application.
 */
export const processDictionary = (
  content: Content,
  locale: Locales = defaultLocale
): TransformedContent => {
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
