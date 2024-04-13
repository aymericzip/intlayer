import type { TranslationContent } from '../transpiler/content_transformers/translations';

export type ContentValue =
  | string
  | {
      [key: string]: ContentValue;
    }
  | (() => ContentValue)
  | Promise<ContentValue>
  | TranslationContent;

export type Content = Record<string, ContentValue | undefined>;

export type FlatContentValue =
  | string
  | {
      [key: string]: FlatContentValue;
    }
  | TranslationContent;

export type FlatContent = Record<string, FlatContentValue | undefined>;

export type ContentModule = Content & {
  id: string;
};
