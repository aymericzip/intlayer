import type {
  EnumerationContent,
  TranslationContent,
} from '../transpiler/index';

export type RecursiveDictionaryValue =
  | number
  | string
  | undefined
  | { [paramKey: string]: DictionaryValue };

export type DictionaryValue =
  | RecursiveDictionaryValue
  | TranslationContent<RecursiveDictionaryValue>
  | EnumerationContent<RecursiveDictionaryValue>
  | RecursiveDictionaryValue[];

export type Dictionary = {
  $schema?: string;
  key: string;
  content: DictionaryValue;
  title?: string;
  description?: string;
  filePath?: string;
  publishedVersion?: string | null;
};
