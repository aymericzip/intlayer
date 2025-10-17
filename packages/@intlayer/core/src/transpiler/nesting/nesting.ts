import type { DictionaryRegistryContent } from '@intlayer/types';
import {
  type DictionaryKeys,
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '@intlayer/types';
import type { DeepTransformContent } from '../../interpreter';

/**
 * Recursively builds dot-notation strings for all valid paths in T.
 * Example:
 *   type X = { a: { b: { c: string }}, d: number };
 *   DotPath<X> = "a" | "a.b" | "a.b.c" | "d"
 */
export type DotPath<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? // Either just K, or K + '.' + deeper path
          `${K}` | `${K}.${DotPath<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;

type DeepReplace<T, From, To> = T extends From
  ? To
  : T extends object
    ? { [K in keyof T]: DeepReplace<T[K], From, To> }
    : T;

/** Build all valid dot-notation strings for a dictionary entry. */
export type ValidDotPathsFor<K extends DictionaryKeys> = DotPath<
  DeepReplace<
    DeepTransformContent<DictionaryRegistryContent<K>>,
    // Replace ReactElement type with string
    {
      type: any;
      props: any;
      key: any;
    },
    string
  >
>;

export type NestedContentState<K extends DictionaryKeys> = {
  dictionaryKey: K;

  /**
   * Path must match existing keys in DictionaryRegistryContent<K>.
   * Can be either:
   *  - "dot.dot.dot" format
   */
  path?: ValidDotPathsFor<K>;
};

export type NestedContent<K extends DictionaryKeys = never> = TypedNodeModel<
  NodeType.Nested,
  NestedContentState<K>
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to extract the content of another dictionary and nest it in the current dictionary.
 *
 * Usage:
 *
 * ```ts
 * nest("dictionaryKey");
 * nest("dictionaryKey", "path.to.content");
 * ```
 *
 * The order of the keys will define the priority of the content.
 *
 */
const nesting = <K extends DictionaryKeys>(
  dictionaryKey: K,
  path?: ValidDotPathsFor<K>
): NestedContent<K> =>
  formatNodeType(NodeType.Nested, {
    dictionaryKey,
    path,
  });

export { nesting as nest };
