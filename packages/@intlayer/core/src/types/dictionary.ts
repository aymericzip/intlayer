/* eslint-disable @typescript-eslint/no-explicit-any */
import { IntlayerDictionaryTypesConnector } from 'intlayer';
import type {
  ConditionContent,
  EnumerationContent,
  MarkdownContent,
  NestedContent,
  TranslationContent,
} from '../transpiler/index';

/**
 * Provides a fallback to string type if the generic type T is never,
 * otherwise returns T. This is useful for handling cases where no keys are found.
 * Example: StringFallback<never> -> string; StringFallback<'key'> -> 'key'
 */
export type StringFallback<T> = T extends never ? string : T; // If no keys are found, return string to disable error, and accept any string as dictionary key

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

export type TypedNode<NodeType = never> =
  | TranslationContent<NodeType>
  | EnumerationContent<NodeType>
  | ConditionContent<NodeType>
  | MarkdownContent
  | NestedContent<DictionaryKeys>;

export type FetchableContentNode<NodeType = ContentNode> = (
  args?: any
) => ContentNode<NodeType> | Promise<ContentNode<NodeType>>;

export type ContentNode<NodeType = never, FetchableNode = false> =
  | NodeType
  | TypedNode<NodeType>
  | { [paramKey: string]: ContentNode<NodeType> }
  | { [paramKey: number]: ContentNode<NodeType> }
  | ((args?: any) => ContentNode<NodeType>)
  | (FetchableNode extends true ? FetchableContentNode<NodeType> : never);

type IsArray<T> = T extends any[] ? true : false;

type ReplaceContentValueArray<T> = T extends (infer U)[]
  ? ReplaceContentValue<U>[]
  : ReplaceContentValue<T>;

// Utility type that performs recursive replacement
type ReplaceContentValue<NodeType, FetchableNode = true> = {
  [P in keyof NodeType]: IsArray<NodeType[P]> extends true
    ? ReplaceContentValueArray<NodeType[P]>
    : NodeType[P] extends object
      ? ReplaceContentValue<NodeType[P]>
      : ContentNode<NodeType[P], FetchableNode>;
};

export type Dictionary<NodeType = undefined, FetchableNode = false> = {
  $schema?: string;
  key: string;
  title?: string;
  description?: string;
  availableVersions?: string[];
  version?: string;
  filePath?: string;
  tags?: string[];
  content: NodeType extends undefined // Applying the generic to replace ContentValue with Replacement
    ? ContentNode<never, FetchableNode>
    : ReplaceContentValue<NodeType>;
};
