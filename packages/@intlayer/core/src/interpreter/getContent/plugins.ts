import {
  type DeclaredLocales,
  type DictionaryKeys,
  type KeyPath,
  type Locale,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import type {
  ConditionContent,
  EnumerationContent,
  FileContent,
  Gender,
  GenderContent,
  InsertionContent,
  NestedContent,
  TranslationContent,
} from '../../transpiler';
import { getCondition } from '../getCondition';
import { getEnumeration } from '../getEnumeration';
import { getGender } from '../getGender';
import { getInsertion } from '../getInsertion';
import { type GetNestingResult, getNesting } from '../getNesting';
import { getTranslation } from '../getTranslation';

/** ---------------------------------------------
 *  PLUGIN DEFINITION
 *  --------------------------------------------- */

/**
 * A plugin/transformer that can optionally transform a node during a single DFS pass.
 * - `canHandle` decides if the node is transformable by this plugin.
 * - `transform` returns the transformed node (and does not recurse further).
 *
 * > `transformFn` is a function that can be used to deeply transform inside the plugin.
 */
export type Plugins = {
  id: string;
  canHandle: (node: any) => boolean;
  transform: (
    node: any,
    props: NodeProps,
    transformFn: (node: any, props: NodeProps) => any
  ) => any;
};

/** ---------------------------------------------
 *  TRANSLATION PLUGIN
 *  --------------------------------------------- */

export type TranslationCond<T, S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeType.Translation]: infer U;
}
  ? U extends Record<PropertyKey, unknown>
    ? L extends keyof U
      ? DeepTransformContent<U[L], S>
      : DeepTransformContent<U[keyof U], S>
    : never
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const translationPlugin = (
  locale: LocalesValues,
  fallback?: LocalesValues,
  onContentNotFound?: (
    locale: LocalesValues,
    fallback: LocalesValues,
    keyPath: KeyPath[]
  ) => void
): Plugins => ({
  id: 'translation-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node: TranslationContent, props, deepTransformNode) => {
    const result = structuredClone(node[NodeType.Translation]);

    for (const key in result) {
      const childProps = {
        ...props,
        children: result[key as keyof typeof result],
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Translation, key } as KeyPath,
        ],
      };
      result[key as keyof typeof result] = deepTransformNode(
        result[key as keyof typeof result],
        childProps
      );
    }

    return getTranslation(result, locale, fallback);
  },
});

/** ---------------------------------------------
 *  ENUMERATION PLUGIN
 *  --------------------------------------------- */

export type EnumerationCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Enumeration]: object;
}
  ? (
      quantity: number
    ) => DeepTransformContent<
      T[NodeType.Enumeration][keyof T[NodeType.Enumeration]],
      S
    >
  : never;

/** Enumeration plugin. Replaces node with a function that takes quantity => string. */
export const enumerationPlugin: Plugins = {
  id: 'enumeration-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Enumeration,
  transform: (node: EnumerationContent, props, deepTransformNode) => {
    const result = structuredClone(node[NodeType.Enumeration]);

    for (const key in result) {
      const child = result[key as unknown as keyof typeof result];
      const childProps = {
        ...props,
        children: child,
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Enumeration, key } as KeyPath,
        ],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        child,
        childProps
      );
    }

    return (quantity: number) => getEnumeration(result, quantity);
  },
};

/** ---------------------------------------------
 *  CONDITION PLUGIN
 *  --------------------------------------------- */

export type ConditionCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Condition]: object;
}
  ? (
      value: boolean
    ) => DeepTransformContent<
      T[NodeType.Condition][keyof T[NodeType.Condition]],
      S
    >
  : never;

/** Condition plugin. Replaces node with a function that takes boolean => string. */
export const conditionPlugin: Plugins = {
  id: 'condition-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Condition,
  transform: (node: ConditionContent, props, deepTransformNode) => {
    const result = structuredClone(node[NodeType.Condition]);

    for (const key in result) {
      const child = result[key as keyof typeof result];
      const childProps = {
        ...props,
        children: child,
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Condition, key } as KeyPath,
        ],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        child,
        childProps
      );
    }

    return (value: boolean) => getCondition(result, value);
  },
};

/** ---------------------------------------------
 *  GENDER PLUGIN
 *  --------------------------------------------- */

export type GenderCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Gender]: object;
}
  ? (
      value: Gender
    ) => DeepTransformContent<T[NodeType.Gender][keyof T[NodeType.Gender]], S>
  : never;

/** Gender plugin. Replaces node with a function that takes gender => string. */
export const genderPlugin: Plugins = {
  id: 'gender-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Gender,
  transform: (node: GenderContent, props, deepTransformNode) => {
    const result = structuredClone(node[NodeType.Gender]);

    for (const key in result) {
      const child = result[key as keyof typeof result];
      const childProps = {
        ...props,
        children: child,
        keyPath: [...props.keyPath, { type: NodeType.Gender, key } as KeyPath],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        child,
        childProps
      );
    }

    return (value: Gender) => getGender(result, value);
  },
};

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Insertion]: infer I;
  fields?: infer U;
}
  ? U extends readonly string[]
    ? (data: Record<U[number], string | number>) => DeepTransformContent<I, S>
    : (data: Record<string, string | number>) => DeepTransformContent<I, S>
  : never;

export const insertionPlugin: Plugins = {
  id: 'insertion-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Insertion,
  transform: (node: InsertionContent, props, deepTransformNode) => {
    const newKeyPath: KeyPath[] = [
      ...props.keyPath,
      {
        type: NodeType.Insertion,
      },
    ];

    const children = node[NodeType.Insertion];

    /** Insertion string plugin. Replaces string node with a component that render the insertion. */
    const insertionStringPlugin: Plugins = {
      id: 'insertion-string-plugin',
      canHandle: (node) => typeof node === 'string',
      transform: (node: string, subProps, deepTransformNode) => {
        const transformedResult = deepTransformNode(node, {
          ...subProps,
          children: node,
          plugins: [
            ...(props.plugins ?? ([] as Plugins[])).filter(
              (plugin) => plugin.id !== 'intlayer-node-plugin'
            ),
          ],
        });

        return (
          values: {
            [K in InsertionContent['fields'][number]]: string | number;
          }
        ) => {
          const children = getInsertion(transformedResult, values);

          return deepTransformNode(children, {
            ...subProps,
            plugins: props.plugins,
            children,
          });
        };
      },
    };

    return deepTransformNode(children, {
      ...props,
      children,
      keyPath: newKeyPath,
      plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
    });
  },
};

/** ---------------------------------------------
 *  NESTED PLUGIN
 *  --------------------------------------------- */

export type NestedCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Nested]: infer U;
}
  ? U extends {
      dictionaryKey: infer K extends DictionaryKeys;
      path?: infer P;
    }
    ? GetNestingResult<K, P, S>
    : never
  : never;

/** Nested plugin. Replaces node with the result of `getNesting`. */
export const nestedPlugin: Plugins = {
  id: 'nested-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Nested,
  transform: (node: NestedContent, props) =>
    getNesting(node.nested.dictionaryKey, node.nested.path, props),
};

// /** ---------------------------------------------
//  *  FILE PLUGIN
//  *  --------------------------------------------- */

export type FileCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.File]: string;
  content?: string;
}
  ? string
  : never;

/** File plugin. Replaces node with the result of `getNesting`. */
export const filePlugin: Plugins = {
  id: 'file-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.File,
  transform: (node: FileContent, props, deepTransform) =>
    deepTransform(node.content, {
      ...props,
      children: node.content,
    }),
};

/**
 * PLUGIN RESULT
 */

/**
 * Interface that defines the properties of a node.
 * This interface can be augmented in other packages, such as `react-intlayer`.
 */
export interface NodeProps {
  dictionaryKey: string;
  keyPath: KeyPath[];
  plugins?: Plugins[];
  locale?: Locale;
  dictionaryPath?: string;
  children?: any;
}

/**
 * Interface that defines the plugins that can be used to transform a node.
 * This interface can be augmented in other packages, such as `react-intlayer`.
 */
export interface IInterpreterPlugin<T, S, L extends LocalesValues> {
  translation: TranslationCond<T, S, L>;
  insertion: InsertionCond<T, S, L>;
  enumeration: EnumerationCond<T, S, L>;
  condition: ConditionCond<T, S, L>;
  nested: NestedCond<T, S, L>;
  // file: FileCond<T>;
}

/**
 * Allow to avoid overwriting import from `intlayer` package when `IInterpreterPlugin<T>` interface is augmented in another package, such as `react-intlayer`.
 */
export type IInterpreterPluginState = {
  translation: true;
  enumeration: true;
  condition: true;
  insertion: true;
  nested: true;
  // file: true;
};

/**
 * Utility type to check if a plugin can be applied to a node.
 */
type CheckApplyPlugin<
  T,
  K extends keyof IInterpreterPlugin<T, S, L>,
  S,
  L extends LocalesValues = DeclaredLocales,
> = K extends keyof S // Test if the key is a key of S.
  ? // Test if the key of S is true. Then the plugin can be applied.
    S[K] extends true
    ? // Test if the key of S exist
      IInterpreterPlugin<T, S, L>[K] extends never
      ? never
      : // Test if the plugin condition is true (if it's not, the plugin is skipped for this node)
        IInterpreterPlugin<T, S, L>[K]
    : never
  : never;

/**
 * Traverse recursively through an object or array, applying each plugin as needed.
 */
type Traverse<
  T,
  S,
  L extends LocalesValues = DeclaredLocales,
> = T extends ReadonlyArray<infer U> // Turn any read-only array into a plain mutable array
  ? Array<DeepTransformContent<U, S, L>>
  : T extends object
    ? { [K in keyof T]: DeepTransformContent<T[K], S, L> }
    : T;

export type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Traverse recursively through an object or array, applying each plugin as needed.
 */
export type DeepTransformContent<
  T,
  S = IInterpreterPluginState,
  L extends LocalesValues = DeclaredLocales,
> = IsAny<T> extends true
  ? T
  : CheckApplyPlugin<T, keyof IInterpreterPlugin<T, S, L>, S> extends never // Check if there is a plugin for T:
    ? // No plugin was found, so try to transform T recursively:
      Traverse<T, S, L>
    : // A plugin was found – use the plugin’s transformation.
      IInterpreterPlugin<T, S, L>[keyof IInterpreterPlugin<T, S, L>];
