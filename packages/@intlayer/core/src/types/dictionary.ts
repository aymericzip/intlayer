import type {
  EnumerationContent,
  TranslationContent,
} from '../transpiler/index';

export type RecursiveDictionaryValue =
  | number
  | string
  | undefined
  | { [paramKey: string]: RecursiveDictionaryValue }
  | RecursiveDictionaryValue[];

export type DictionaryValue =
  | RecursiveDictionaryValue
  | TranslationContent<RecursiveDictionaryValue>
  | EnumerationContent<RecursiveDictionaryValue>;

export type Dictionary = {
  key: string;
  filePath?: string;
  content: DictionaryValue;
};
