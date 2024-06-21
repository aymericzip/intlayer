import type { ReactNode } from 'react';
import type {
  EnumerationContent,
  TranslationContent,
} from '../transpiler/index';

export type TypedNode =
  | TranslationContent<unknown>
  | EnumerationContent<unknown>;

type ArrayOfSameType<T> = T extends (infer U)[]
  ? U extends T[number]
    ? T
    : never
  : never;

export type ContentValueArray = ArrayOfSameType<ContentValue[]>;

export type ContentValue =
  | string
  | {
      [key: string]: ContentValue;
    }
  | (() => ContentValue)
  | Promise<ContentValue>
  | TypedNode;

export type Content = Record<
  string,
  ContentValue | ContentValueArray | undefined
>;

export type FlatContentValue =
  | string
  | {
      [key: string]: FlatContentValue;
    }
  | TypedNode;

export type FlatContent = Record<string, FlatContentValue | undefined>;

// Utility type that performs recursive replacement
type ReplaceContentValue<T> = {
  [P in keyof T]: T[P] extends string | number | boolean | null | ReactNode
    ? ContentValue
    : T[P] extends object
      ? ReplaceContentValue<T[P]>
      : ReplaceContentValueArray<T[P]>;
};

type ReplaceContentValueArray<T> = T extends (infer U)[]
  ? ReplaceContentValue<U>[]
  : ReplaceContentValue<T>;

export type DeclarationContent<T = undefined> = (T extends undefined // Applying the generic to replace ContentValue with Replacement
  ? Content
  : ReplaceContentValue<T>) & {
  id: string;
  filePath?: string;
};
