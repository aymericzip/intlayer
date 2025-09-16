// @ts-ignore intlayer declared for module augmentation
import type {
  IntlayerDictionaryTypesConnector,
  // @ts-ignore intlayer declared for module augmentation
  LanguageContent,
  // @ts-ignore intlayer declared for module augmentation
  LocalesValues,
} from 'intlayer';
import type { ConditionContent } from '../transpiler/condition';
import type { EnumerationContent } from '../transpiler/enumeration';
import type { FileContent } from '../transpiler/file';
import type { GenderContent } from '../transpiler/gender';
import type { InsertionContent } from '../transpiler/insertion';
import type { MarkdownContent } from '../transpiler/markdown';
import type { NestedContent } from '../transpiler/nesting';
import type { TranslationContent } from '../transpiler/translation';

/**
 * Provides a fallback to string type if the generic type T is undefined,
 * otherwise returns T. This is useful for handling cases where no keys are found.
 * Example: StringFallback<undefined> -> string; StringFallback<'key'> -> 'key'
 */
export type StringFallback<T> = T extends undefined ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key

/**
 * Represents the keys of the IntlayerDictionaryTypesConnector,
 * ensuring they are valid dictionary keys or fallback to string if none exist.
 *
 * Example:
 * ```ts
 * DictionaryKeys -> 'key1' | 'key2'
 * // or if IntlayerDictionaryTypesConnector is not defined,
 * DictionaryKeys -> string
 * ```
 */
export type DictionaryKeys = StringFallback<
  keyof IntlayerDictionaryTypesConnector
>;

type BaseNode = number | string | boolean | null | undefined;

export type TypedNode<NodeType = undefined> =
  | TranslationContent<NodeType>
  | EnumerationContent<NodeType>
  | ConditionContent<NodeType>
  | InsertionContent<NodeType>
  | MarkdownContent<NodeType>
  | NestedContent<DictionaryKeys>
  | GenderContent<NodeType>
  | FileContent;

type FetchableContentNode<NodeType> = (
  args?: any
) => ContentNode<NodeType> | Promise<ContentNode<NodeType>>;

export type ContentNode<
  T = undefined,
  FetchableNode = false,
  NodeType = T extends undefined ? BaseNode : T,
> =
  | NodeType
  | TypedNode<NodeType>
  | ((args?: any) => ContentNode<NodeType>)
  | (FetchableNode extends true ? FetchableContentNode<NodeType> : undefined);

// Utility types (unchanged)
type IsArray<T> = T extends any[] ? true : false;

type ReplaceContentValueArray<T, FetchableNode> = T extends (infer U)[]
  ? // Allow either a *single* typed node returning the entire array
    // or an array of typed nodes (or scalar nodes).
    ContentNode<T, FetchableNode> | ReplaceContentValue<U, FetchableNode>[]
  : never;

type ReplaceContentValueObject<T, FetchableNode> = {
  [K in keyof T]: ReplaceContentValue<T[K], FetchableNode>;
};

// Modified: allow a full ContentNode wrapper OR an object shape when T is an object
type ReplaceContentValue<
  NodeType,
  FetchableNode = true,
> = NodeType extends object
  ? IsArray<NodeType> extends true
    ? ReplaceContentValueArray<NodeType, FetchableNode>
    :
        | ContentNode<NodeType, FetchableNode>
        | ReplaceContentValueObject<NodeType, FetchableNode>
  : ContentNode<NodeType, FetchableNode>;

export type AutoFill = true | string | Partial<LanguageContent<string>>;

export type Dictionary<ContentType = undefined, FetchableNode = false> = {
  $schema?: string;
  key: string;
  title?: string;
  description?: string;
  availableVersions?: string[];
  version?: string;
  filePath?: string;
  tags?: string[];
  locale?: LocalesValues;
  autoFill?: AutoFill;
  autoFilled?: true;
  live?: boolean;
  location?: 'distant' | 'locale';
  content: ContentType extends undefined // Applying the generic to replace ContentValue with Replacement
    ? any
    : ReplaceContentValue<ContentType, FetchableNode> | ContentType;
};

export type GetSubPath<T, P> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetSubPath<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : T;
