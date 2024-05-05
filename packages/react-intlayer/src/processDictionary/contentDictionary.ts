import type { ReactNode } from 'react';

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
