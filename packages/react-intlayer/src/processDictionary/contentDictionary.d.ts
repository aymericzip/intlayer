import { type TranslationContent } from '@intlayer/core';

export type ContentValue =
  | string
  | {
      [key: string]: ContentValue;
    }
  | TranslationContent;

export type Content = Record<string, ContentValue | undefined>;

export type TranslatedContentValue =
  | string
  | {
      [key: string]: TranslatedContentValue;
    }
  | TranslationContent
  | undefined;

export type TranslatedContent = Record<
  string,
  TranslatedContentValue | undefined
>;

export type ContentDictionary = Content & {
  id: string;
};
