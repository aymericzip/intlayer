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

export type DeclarationContent = Content & {
  id: string;
  filePath?: string;
};
