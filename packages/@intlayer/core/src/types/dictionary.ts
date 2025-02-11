// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';
import type {
  ConditionContent,
  EnumerationContent,
  MarkdownContent,
  NestedContent,
  TranslationContent,
} from '../transpiler/index';

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
  | MarkdownContent
  | NestedContent<DictionaryKeys>;

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

export type Dictionary<ContentType = undefined, FetchableNode = false> = {
  $schema?: string;
  key: string;
  title?: string;
  description?: string;
  availableVersions?: string[];
  version?: string;
  filePath?: string;
  tags?: string[];
  content: ContentType extends undefined // Applying the generic to replace ContentValue with Replacement
    ? any
    : ReplaceContentValue<ContentType, FetchableNode> | ContentType;
};
