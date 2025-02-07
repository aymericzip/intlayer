/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Locales, LocalesValues } from '@intlayer/config/client';

import { type DictionaryKeys, type KeyPath, NodeType } from '../../types/index';
import type {
  ConditionContent,
  EnumerationContent,
  NestedContent,
  TranslationContent,
} from '../../transpiler';
import { getTranslation } from '../getTranslation';
import { getEnumeration } from '../getEnumeration';
import { getCondition } from '../getCondition';
import { type GetNestingResult, getNesting } from '../getNesting';

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

export type TranslationCond<T, S> = T extends {
  nodeType: NodeType | string;
  [NodeType.Translation]: object;
}
  ? DeepTransformContent<
      T[NodeType.Translation][keyof T[NodeType.Translation]],
      S
    >
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const translationPlugin = (locale: LocalesValues): Plugins => ({
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node: TranslationContent, props, deepTransformNode) => {
    const result = structuredClone(node.translation);

    for (const key in result) {
      const childProps = {
        ...props,
        content: result[key as unknown as keyof typeof result],
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Translation, key } as KeyPath,
        ],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        result[key as unknown as keyof typeof result],
        childProps
      );
    }
    return getTranslation(result, locale);
  },
});

/** ---------------------------------------------
 *  ENUMERATION PLUGIN
 *  --------------------------------------------- */

export type EnumerationCond<T, S> = T extends {
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
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Enumeration,
  transform: (node: EnumerationContent, props, deepTransformNode) => {
    const result = structuredClone(node.enumeration);

    for (const key in result) {
      const child = result[key as unknown as keyof typeof result];
      const childProps = {
        ...props,
        content: child,
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

export type ConditionCond<T, S> = T extends {
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
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Condition,
  transform: (node: ConditionContent, props, deepTransformNode) => {
    const result = structuredClone(node.condition);

    for (const key in result) {
      const child = result[key as keyof typeof result];
      const childProps = {
        ...props,
        content: child,
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
 *  NESTED PLUGIN
 *  --------------------------------------------- */

export type NestedCond<T, S> = T extends {
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
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Nested,
  transform: (node: NestedContent, props) =>
    // @ts-ignore
    getNesting(node.nested.dictionaryKey, node.nested.path, props),
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
  locale?: Locales;
  dictionaryPath?: string;
  content?: any;
}

/**
 * Interface that defines the plugins that can be used to transform a node.
 * This interface can be augmented in other packages, such as `react-intlayer`.
 */
export interface IInterpreterPlugin<T, S> {
  translation: TranslationCond<T, S>;
  enumeration: EnumerationCond<T, S>;
  condition: ConditionCond<T, S>;
  nested: NestedCond<T, S>;
}

/**
 * Allow to avoid overwriting import from `intlayer` package when `IInterpreterPlugin<T>` interface is augmented in another package, such as `react-intlayer`.
 */
export type IInterpreterPluginState = {
  translation: true;
  enumeration: true;
  condition: true;
  nested: true;
};

/**
 * Utility type to check if a plugin can be applied to a node.
 */
type CheckApplyPlugin<T, K extends keyof IInterpreterPlugin<T, S>, S> =
  // Test if the key is a key of S.
  K extends keyof S
    ? // Test if the key of S is true. Then the plugin can be applied.
      S[K] extends true
      ? // Test if the key of S exist
        IInterpreterPlugin<T, S>[K] extends never
        ? never
        : // Test if the plugin condition is true (if it's not, the plugin is skipped for this node)
          IInterpreterPlugin<T, S>[K]
      : never
    : never;

/**
 * Traverse recursively through an object or array, applying each plugin as needed.
 */
type Traverse<T, S> = T extends object
  ? T extends (infer U)[]
    ? DeepTransformContent<U, S>[] // Transform each element in an array.
    : { [K in keyof T]: DeepTransformContent<T[K], S> } // Recursively transform each property.
  : T;

/**
 * Traverse recursively through an object or array, applying each plugin as needed.
 */
export type DeepTransformContent<T, S = IInterpreterPluginState> =
  // Check if there is a plugin for T:
  CheckApplyPlugin<T, keyof IInterpreterPlugin<T, S>, S> extends never
    ? // No plugin was found, so try to transform T recursively:
      Traverse<T, S>
    : // A plugin was found – use the plugin’s transformation.
      IInterpreterPlugin<T, S>[keyof IInterpreterPlugin<T, S>];
