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

export type ContentModule = Content & {
  id: string;
};
