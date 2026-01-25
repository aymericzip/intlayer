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
 * PLUGIN DEFINITION
 * --------------------------------------------- */

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
 * TRANSLATION PLUGIN
 * --------------------------------------------- */

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
  fallback?: LocalesValues
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
 * ENUMERATION PLUGIN
 * --------------------------------------------- */

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

    return (arg: number | { count: number }) => {
      const quantity = typeof arg === 'number' ? arg : arg.count;
      const subResult = getEnumeration(result, quantity);

      if (typeof subResult === 'function' && typeof arg === 'object') {
        return subResult(arg);
      }

      return subResult;
    };
  },
};

/** ---------------------------------------------
 * CONDITION PLUGIN
 * --------------------------------------------- */

export type ConditionCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Condition]: object;
}
  ? (
      value: boolean | { value: boolean }
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

    return (arg: boolean | { value: boolean }) => {
      const value = typeof arg === 'boolean' ? arg : arg.value;
      const subResult = getCondition(result, value);

      if (typeof subResult === 'function' && typeof arg === 'object') {
        return subResult(arg);
      }

      return subResult;
    };
  },
};

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T, S, L> = T extends {
  nodeType: NodeType | string;
  [NodeType.Insertion]: string;
  fields: readonly string[];
}
  ? (
      values: {
        [K in T['fields'][number]]: string | number;
      }
    ) => DeepTransformContent<string, S>
  : never;

/** Insertion plugin. Replaces node with a function that takes quantity => string. */
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
 * GENDER PLUGIN
 * --------------------------------------------- */

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
      result[key as keyof typeof result] = deepTransformNode(child, childProps);
    }

    return (value: Gender) => getGender(result, value);
  },
};

/** ---------------------------------------------
 * NESTED PLUGIN
 * --------------------------------------------- */

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
export const nestedPlugin = (locale?: LocalesValues): Plugins => ({
  id: 'nested-plugin',
  canHandle: (node) =>
    typeof node === 'object' &&
    (node?.nodeType === NodeType.Nested || node?.nodeType === 'nested'),
  transform: (node: NestedContent, props) =>
    getNesting(node.nested.dictionaryKey, node.nested.path, {
      ...props,
      locale: (locale ?? props.locale) as Locale,
    }),
});

/** ---------------------------------------------
 * HTML PLUGIN
 * --------------------------------------------- */

/**
 * Props for HTML tag components.
 * Includes children and an index signature for attributes.
 * Framework-specific implementations should extend this with proper types (ReactNode, VNode, etc.)
 */
export type HTMLTagComponentProps = {
  children?: any;
  [key: string]: any;
};

/**
 * A component that can be used to replace an HTML tag.
 * Can be a string (tag name) or a functional component.
 * Framework-specific implementations should use properly typed versions.
 */
export type HTMLTagComponent<Children = any, Return = any> =
  | string
  | ((props: { children?: Children; [key: string]: any }) => Return);

/**
 * Helper to map string types from dictionary to TypeScript types
 */
export type PropTypeMap<T> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : any;

/**
 * Helper to extract props from the dictionary definition of a custom component
 */
export type ExtractCustomProps<Definition, Children = any> = {
  [K in keyof Definition]?: Definition[K] extends string
    ? PropTypeMap<Definition[K]>
    : any;
} & {
  children?: Children;
  [key: string]: any;
};

/**
 * HTML conditional type that enforces:
 * - All components (Standard or Custom) are OPTIONAL in the `use()` method.
 * - Custom components props are strictly inferred from the dictionary definition.
 *
 * This ensures type safety:
 * - `html('<div>Hello <CustomComponent /></div>').use({ CustomComponent: ... })` - optional but typed
 */
export type HTMLCond<T, S, L, Children = any, Return = any> = T extends {
  nodeType: NodeType | string;
  [NodeType.HTML]: string;
  tags?: infer U;
}
  ? {
      use: U extends Record<string, any>
        ? (
            components?: {
              // Map all keys from U, making them optional
              [K in keyof U]?: U[K] extends true
                ? HTMLTagComponent<Children, Return>
                :
                    | string
                    | ((props: ExtractCustomProps<U[K], Children>) => Return);
            } & Partial<Record<string, HTMLTagComponent<Children, Return>>>
          ) => Return
        : // Fallback for array or undefined tags (legacy)
          (
            components?: Record<string, HTMLTagComponent<Children, Return>>
          ) => Return;
    } & any
  : never;

/** ---------------------------------------------
 * FILE PLUGIN
 * --------------------------------------------- */

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
  enumeration: EnumerationCond<T, S, L>;
  condition: ConditionCond<T, S, L>;
  nested: NestedCond<T, S, L>;
  html: HTMLCond<T, S, L>;
  file: FileCond<T>;
}

/**
 * Allow to avoid overwriting import from `intlayer` package when `IInterpreterPlugin<T>` interface is augmented in another package, such as `react-intlayer`.
 */
export type IInterpreterPluginState = {
  translation: true;
  enumeration: true;
  condition: true;
  nested: true;
  html: true;
  file: true;
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
