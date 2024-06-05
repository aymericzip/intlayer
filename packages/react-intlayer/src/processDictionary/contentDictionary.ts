import type { KeyPath, Locales } from '@intlayer/core';
import type { ReactNode } from 'react';

export type TransformedContentValue =
  | string
  | ReactNode
  | {
      [key: string]: TransformedContentValue;
    }
  | undefined
  | ((quantity: number) => TransformedContentValue);

export type TransformedContentObject = {
  dictionaryId: string;
  dictionaryPath: string;
  keyPath: KeyPath[];
  locale: Locales;
  content: TransformedContentValue | TransformedContentValue[] | undefined;
};

export type TransformedContent =
  | Record<
      string,
      | TransformedContentValue
      | TransformedContentValue[]
      | TransformedContentObject
      | undefined
    >
  | ReactNode;
