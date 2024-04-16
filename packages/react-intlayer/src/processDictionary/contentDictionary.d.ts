import { type TranslationContent } from '@intlayer/core';

export type ContentValue =
  | string
  | {
      [key: string]: ContentValue;
    }
  | TranslationContent<unknown>;

export type Content = Record<string, ContentValue | undefined>;

export type TransformedContentValue =
  | string
  | {
      [key: string]: TransformedContentValue;
    }
  | undefined
  | ((quantity: number) => TransformedContentValue);

export type TransformedContent = Record<
  string,
  TransformedContentValue | undefined
>;

export type ContentDictionary = Content & {
  id: string;
};
