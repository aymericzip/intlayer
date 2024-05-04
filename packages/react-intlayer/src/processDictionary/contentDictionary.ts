import type { TranslationContent } from '@intlayer/core';
import type { ReactNode } from 'react';

export type ContentValue =
  | string
  | {
      [key: string]: ContentValue;
    }
  | TranslationContent<unknown>;

export type Content = Record<string, ContentValue | undefined>;

export type TransformedContentValue =
  | string
  | ReactNode
  | {
      [key: string]: TransformedContentValue;
    }
  | undefined
  | ((quantity: number) => TransformedContentValue);

export type TransformedContent =
  | Record<
      string,
      TransformedContentValue | TransformedContentValue[] | undefined
    >
  | ReactNode;

export type ContentDictionary = Content & {
  id: string;
};
