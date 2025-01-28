/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  EnumerationContent,
  TranslationContent,
} from '../transpiler/index';

export type TypedNode<T = unknown> =
  | TranslationContent<T>
  | EnumerationContent<T>;

export type ContentValue =
  | string
  | string[]
  | number
  | number[]
  | {
      [key: string]: ContentValue;
    }
  | (() => ContentValue)
  | Promise<ContentValue>
  | TypedNode;

export type Content = Record<string, ContentValue | ContentValue[] | undefined>;

export type FlatContentValue =
  | string
  | {
      [key: string]: FlatContentValue;
    }
  | TypedNode;

export type FlatContent = Record<string, FlatContentValue | undefined>;

type IsArray<T> = T extends any[] ? true : false;

// Utility type that performs recursive replacement
type ReplaceContentValue<T> = {
  [P in keyof T]: IsArray<T[P]> extends true
    ? ReplaceContentValueArray<T[P]>
    : T[P] extends object
      ? ReplaceContentValue<T[P]>
      : T[P] | TypedNode<T[P]>;
};

type ReplaceContentValueArray<T> = T extends (infer U)[]
  ? ReplaceContentValue<U>[]
  : ReplaceContentValue<T>;

export type DeclarationContent<T = undefined> = {
  $schema?: string;
  key: string;
  title?: string;
  description?: string;
  version?: string;
  filePath?: string;
  tags?: string[];
  content: T extends undefined // Applying the generic to replace ContentValue with Replacement
    ? Content
    : ReplaceContentValue<T>;
};
