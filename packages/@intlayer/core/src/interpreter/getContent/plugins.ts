import type { Locale } from '@intlayer/types/allLocales';
import type { KeyPath } from '@intlayer/types/keyPath';
import type {
  DeclaredLocales,
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import type {
  ConditionContent,
  EnumerationContent,
  FileContent,
  Gender,
  GenderContent,
  InsertionContent,
  NestedContent,
  PluralContent,
  PluralContentState,
  SelectContent,
  TranslationContent,
} from '../../transpiler';
import { getCondition } from '../getCondition';
import { getEnumeration } from '../getEnumeration';
import { getGender } from '../getGender';
import { getInsertion } from '../getInsertion';
import { type GetNestingResult, getNesting } from '../getNesting';
import { getNesting as getNestingOptimized } from '../getNesting.optimized';
import { getPlural } from '../getPlural';
import { getSelect } from '../getSelect';
import { getTranslation } from '../getTranslation';
import {
  isInterpolableWrapperNode,
  transformInterpolableNode,
} from '../interpolableNode';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

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
 * FALLBACK PLUGIN
 *
 * Used to fallback a tree-shaken plugin
 * --------------------------------------------- */

export const fallbackPlugin: Plugins = {
  id: 'fallback-plugin',
  canHandle: () => false,
  transform: (node) => node,
};

/**
 * Whether a resolved branch still expects insertion values.
 *
 * Some renderers return callable nodes (Svelte components, Angular proxies)
 * exposing their content on `.value`: those are final and must not be called
 * with the values. A pending insertion either has no `.value` or a function
 * one.
 */
const isAwaitingValues = (
  branch: unknown
): branch is (values: Record<string, unknown>) => unknown => {
  if (typeof branch !== 'function') return false;

  const { value } = branch as { value?: unknown };

  return value === undefined || typeof value === 'function';
};

/** ---------------------------------------------
 * TRANSLATION PLUGIN
 * --------------------------------------------- */

export type UnionKeys<T> = T extends unknown ? keyof T : never;
export type ValueAtKey<T, K> = T extends unknown
  ? K extends keyof T
    ? T[K]
    : never
  : never;

export type TranslationCond<T, S, L extends LocalesValues> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.TRANSLATION]: infer U;
}
  ? U extends Record<PropertyKey, unknown>
    ? U[keyof U] extends Record<PropertyKey, unknown>
      ? {
          [K in UnionKeys<U[keyof U]>]: L extends keyof U
            ? K extends keyof U[L]
              ? U[L][K]
              : ValueAtKey<U[keyof U], K>
            : ValueAtKey<U[keyof U], K>;
        } extends infer Content
        ? DeepTransformContent<Content, S>
        : never
      : (L extends keyof U ? U[L] : U[keyof U]) extends infer Content
        ? DeepTransformContent<Content, S>
        : never
    : never
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const translationPlugin = (
  locale: LocalesValues,
  fallback?: LocalesValues
): Plugins =>
  process.env.INTLAYER_NODE_TYPE_TRANSLATION === 'false'
    ? fallbackPlugin
    : {
        id: 'translation-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.TRANSLATION,
        transform: (node: TranslationContent, props, deepTransformNode) => {
          // Resolve on the raw content first: only the displayed locale (and
          // the fallback keys it lacks) is ever transformed
          const content = getTranslation(
            node[NodeTypes.TRANSLATION] ?? {},
            locale,
            fallback
          );

          return deepTransformNode(content, {
            ...props,
            children: content,
            keyPath: [
              ...props.keyPath,
              { type: NodeTypes.TRANSLATION, key: locale } as KeyPath,
            ],
          });
        },
      };

/** ---------------------------------------------
 * ENUMERATION PLUGIN
 * --------------------------------------------- */

export type EnumerationCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.ENUMERATION]: object;
}
  ? (
      quantity: number
    ) => DeepTransformContent<
      T[typeof NodeTypes.ENUMERATION][keyof T[typeof NodeTypes.ENUMERATION]],
      S
    >
  : never;

/** Enumeration plugin. Replaces node with a function that takes quantity => string. */
export const enumerationPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_ENUMERATION === 'false'
    ? fallbackPlugin
    : {
        id: 'enumeration-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.ENUMERATION,
        transform: (node: EnumerationContent, props, deepTransformNode) => {
          const original = node[NodeTypes.ENUMERATION];
          const result: Record<string, any> = {};

          for (const key in original) {
            const child = original[key as unknown as keyof typeof original];
            const childProps = {
              ...props,
              children: child,
              keyPath: [
                ...props.keyPath,
                { type: NodeTypes.ENUMERATION, key } as KeyPath,
              ],
            };
            result[key] = deepTransformNode(child, childProps);
          }

          return (arg: number | { count: number }) => {
            const quantity = typeof arg === 'number' ? arg : arg.count;
            const subResult = getEnumeration(result, quantity);

            if (isAwaitingValues(subResult) && typeof arg === 'object') {
              return subResult(arg);
            }

            return subResult;
          };
        },
      };

/** ---------------------------------------------
 * PLURAL PLUGIN
 * --------------------------------------------- */

/**
 * A plural branch wrapped in an `insertion` node (auto-transformed
 * `{{count}}`) resolves to its inner content: the plural applies the values.
 */
type PluralBranch<Branch> = Branch extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer InsertionContent;
  fields: readonly string[];
}
  ? InsertionContent
  : Branch;

export type PluralCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.PLURAL]: object;
}
  ? (
      arg: number | { count: number; [key: string]: unknown }
    ) => DeepTransformContent<
      PluralBranch<
        T[typeof NodeTypes.PLURAL][keyof T[typeof NodeTypes.PLURAL]]
      >,
      S
    >
  : never;

type SubResultFunction = (values: Record<string, string | number>) => string;

/**
 * Plural plugin. Replaces node with a function that takes a count (or
 * `{ count, ...values }`) => string, picking the matching CLDR plural form
 * for the active locale and interpolating `{{count}}` (and other values).
 */
export const pluralPlugin = (locale?: LocalesValues): Plugins =>
  process.env.INTLAYER_NODE_TYPE_PLURAL === 'false'
    ? fallbackPlugin
    : {
        id: 'plural-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.PLURAL,
        transform: (node: PluralContent, props, deepTransformNode) => {
          const original = node[NodeTypes.PLURAL];
          const result: Record<string, any> = {};
          // The plural interpolates its own branches. A string plugin from an
          // enclosing `insert()` would turn them into functions first.
          const branchPlugins = (props.plugins ?? []).filter(
            (plugin) => plugin.id !== 'insertion-string-plugin'
          );

          /** String plugin for plural. Replaces string node with a component that renders the insertion. */
          const pluralStringPlugin: Plugins = {
            id: 'plural-string-plugin',
            canHandle: (node) =>
              typeof node === 'string' || isInterpolableWrapperNode(node),
            transform: (node, subProps, deepTransformNode) => {
              // An `insertion` node below the plural (e.g. auto-transformed
              // `{{count}}` branches) already returns `(values) => …`. Leave its
              // strings untouched, or its template would become a function.
              const isInsideInsertion = subProps.keyPath
                .slice(props.keyPath.length)
                .some((keyPath) => keyPath.type === NodeTypes.INSERTION);

              if (isInsideInsertion) {
                return deepTransformNode(node, {
                  ...subProps,
                  plugins: subProps.plugins?.filter(
                    (plugin) => plugin.id !== 'plural-string-plugin'
                  ),
                });
              }

              // `html()`/`markdown()` nodes carry their `{{count}}` placeholders
              // inside a raw string. Interpolate into that string, then re-run
              // the transform so the html/markdown renderer applies afterwards.
              if (isInterpolableWrapperNode(node)) {
                return (values: { [k: string]: string | number }) =>
                  transformInterpolableNode(
                    node,
                    values,
                    subProps,
                    branchPlugins,
                    deepTransformNode
                  );
              }

              const transformedResult = deepTransformNode(node, {
                ...subProps,
                children: node,
                plugins: [
                  ...branchPlugins.filter(
                    (plugin) => plugin.id !== 'intlayer-node-plugin'
                  ),
                ],
              });

              return (values: { [k: string]: string | number }) => {
                const children = getInsertion(transformedResult, values);

                return deepTransformNode(children, {
                  ...subProps,
                  plugins: branchPlugins,
                  children,
                });
              };
            },
          };

          for (const key in original) {
            const child = original[key as keyof typeof original];
            const childProps = {
              ...props,
              children: child,
              keyPath: [
                ...props.keyPath,
                { type: NodeTypes.PLURAL, key } as KeyPath,
              ],
              plugins: [pluralStringPlugin, ...branchPlugins],
            };
            result[key] = deepTransformNode(child, childProps);
          }

          const effectiveLocale = String(locale ?? props.locale ?? 'en');

          return (arg: number | { count: number; [key: string]: unknown }) => {
            const count = typeof arg === 'number' ? arg : arg.count;
            const values =
              typeof arg === 'number'
                ? { count: arg }
                : (arg as { count: number; [key: string]: unknown });

            const subResult: string | SubResultFunction = getPlural(
              result as PluralContent['plural'] as PluralContentState<string>,
              count,
              effectiveLocale
            );

            if (isAwaitingValues(subResult)) {
              return (subResult as SubResultFunction)(values);
            }

            return subResult;
          };
        },
      };

/** ---------------------------------------------
 * CONDITION PLUGIN
 * --------------------------------------------- */

export type ConditionCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.CONDITION]: object;
}
  ? (
      value: boolean | { value: boolean }
    ) => DeepTransformContent<
      T[typeof NodeTypes.CONDITION][keyof T[typeof NodeTypes.CONDITION]],
      S
    >
  : never;

/** Condition plugin. Replaces node with a function that takes boolean => string. */
export const conditionPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_CONDITION === 'false'
    ? fallbackPlugin
    : {
        id: 'condition-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.CONDITION,
        transform: (node: ConditionContent, props, deepTransformNode) => {
          const original = node[NodeTypes.CONDITION];
          const result: Record<string, any> = {};

          for (const key in original) {
            const child = original[key as keyof typeof original];
            const childProps = {
              ...props,
              children: child,
              keyPath: [
                ...props.keyPath,
                { type: NodeTypes.CONDITION, key } as KeyPath,
              ],
            };
            result[key] = deepTransformNode(child, childProps);
          }

          return (arg: boolean | { value: boolean }) => {
            const value = typeof arg === 'boolean' ? arg : arg.value;
            const subResult = getCondition(result as any, value);

            if (isAwaitingValues(subResult) && typeof arg === 'object') {
              return subResult(arg);
            }

            return subResult;
          };
        },
      };

/** ---------------------------------------------
 *  INSERTION PLUGIN
 *  --------------------------------------------- */

export type InsertionCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.INSERTION]: infer I;
  fields: readonly string[];
}
  ? (
      values: {
        [K in T['fields'][number]]: string | number;
      }
    ) => I extends string
      ? DeepTransformContent<string, S>
      : DeepTransformContent<I, S>
  : never;

/** Insertion plugin. Replaces node with a function that takes quantity => string. */
export const insertionPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_INSERTION === 'false'
    ? fallbackPlugin
    : {
        id: 'insertion-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.INSERTION,
        transform: (node: InsertionContent, props, deepTransformNode) => {
          const newKeyPath: KeyPath[] = [
            ...props.keyPath,
            {
              type: NodeTypes.INSERTION,
            },
          ];

          const children = node[NodeTypes.INSERTION];

          /** Insertion string plugin. Replaces string node with a component that render the insertion. */
          const insertionStringPlugin: Plugins = {
            id: 'insertion-string-plugin',
            canHandle: (node) =>
              typeof node === 'string' || isInterpolableWrapperNode(node),
            transform: (node, subProps, deepTransformNode) => {
              // `html()`/`markdown()` nodes carry their `{{ … }}` placeholders
              // inside a raw string. Interpolate into that string, then re-run
              // the transform so the html/markdown renderer applies afterwards.
              if (isInterpolableWrapperNode(node)) {
                return (
                  values: {
                    [K in InsertionContent['fields'][number]]: string | number;
                  }
                ) =>
                  transformInterpolableNode(
                    node,
                    values,
                    subProps,
                    props.plugins,
                    deepTransformNode
                  );
              }

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

          const result = deepTransformNode(children, {
            ...props,
            children,
            keyPath: newKeyPath,
            plugins: [insertionStringPlugin, ...(props.plugins ?? [])],
          });

          return resolveInsertedSelector(children, result);
        },
      };

/** Container nodes resolved by a selector call: `enu(3)`, `cond(true)`, … */
const selectorNodeTypes: string[] = [
  NodeTypes.ENUMERATION,
  NodeTypes.CONDITION,
  NodeTypes.PLURAL,
  NodeTypes.GENDER,
  NodeTypes.SELECT,
];

/**
 * Binds the values of an `insert()` to the selector node it wraps, returning
 * `(selector) => content`. Any other child result is returned unchanged.
 *
 * `areBranchesInterpolated` is set by frameworks that interpolate the branch
 * strings as soon as the values are known: the selected branch is then final
 * content and is never called with the values.
 */
export const bindInsertedValues = (
  children: unknown,
  result: unknown,
  values: Record<string, unknown>,
  areBranchesInterpolated = false
): unknown => {
  const nodeType = (children as { nodeType?: string })?.nodeType;
  if (
    typeof result !== 'function' ||
    !nodeType ||
    !selectorNodeTypes.includes(nodeType)
  ) {
    return result;
  }

  const isCountSelector =
    nodeType === NodeTypes.PLURAL || nodeType === NodeTypes.ENUMERATION;

  return (selector: unknown) => {
    // Object selectors (`{ count }`, `{ value }`) carry the values along.
    if (typeof selector === 'object' && selector !== null) {
      return result({ ...values, ...selector });
    }

    // The count both selects the branch and fills `{{count}}`: the selector
    // wins over a `count` passed with the values.
    if (isCountSelector) {
      return result({ ...values, count: selector });
    }

    const selected = result(selector);

    return !areBranchesInterpolated && isAwaitingValues(selected)
      ? selected(values)
      : selected;
  };
};

/**
 * Shapes the result of `insert()` wrapping a selector node as
 * `(values) => (selector) => content`, so the values reach the selected
 * branch. Any other child result is returned unchanged.
 */
export const resolveInsertedSelector = (
  children: unknown,
  result: unknown
): unknown =>
  typeof result === 'function' &&
  selectorNodeTypes.includes(
    (children as { nodeType?: string })?.nodeType ?? ''
  )
    ? (values: Record<string, unknown>) =>
        bindInsertedValues(children, result, values)
    : result;

/** ---------------------------------------------
 * GENDER PLUGIN
 * --------------------------------------------- */

export type GenderCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.GENDER]: object;
}
  ? (
      value: Gender
    ) => DeepTransformContent<
      T[typeof NodeTypes.GENDER][keyof T[typeof NodeTypes.GENDER]],
      S
    >
  : never;

/** Gender plugin. Replaces node with a function that takes gender => string. */
export const genderPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_GENDER === 'false'
    ? fallbackPlugin
    : {
        id: 'gender-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.GENDER,
        transform: (node: GenderContent, props, deepTransformNode) => {
          const original = node[NodeTypes.GENDER];
          const result: Record<string, any> = {};

          for (const key in original) {
            const child = original[key as keyof typeof original];
            const childProps = {
              ...props,
              children: child,
              keyPath: [
                ...props.keyPath,
                { type: NodeTypes.GENDER, key } as KeyPath,
              ],
            };
            result[key] = deepTransformNode(child, childProps);
          }

          return (value: Gender) => getGender(result as any, value);
        },
      };

/** ---------------------------------------------
 * SELECT PLUGIN
 * --------------------------------------------- */

/**
 * Accepted selector for a select node.
 *
 * When the node declares a `fallback` case, any string is accepted (the
 * fallback covers the unmatched values) while the declared cases still
 * autocomplete. Without a `fallback`, only the declared cases are accepted.
 */
export type SelectSelector<States> = 'fallback' extends keyof States
  ? Exclude<keyof States & string, 'fallback'> | (string & {})
  : keyof States & string;

export type SelectCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.SELECT]: object;
}
  ? (
      value:
        | SelectSelector<T[typeof NodeTypes.SELECT]>
        | { value: SelectSelector<T[typeof NodeTypes.SELECT]> }
    ) => DeepTransformContent<
      T[typeof NodeTypes.SELECT][keyof T[typeof NodeTypes.SELECT]],
      S
    >
  : never;

/** Select plugin. Replaces node with a function that takes a string => content. */
export const selectPlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_SELECT === 'false'
    ? fallbackPlugin
    : {
        id: 'select-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.SELECT,
        transform: (node: SelectContent, props, deepTransformNode) => {
          const original = node[NodeTypes.SELECT];
          const result: Record<string, any> = {};

          for (const key in original) {
            const child = original[key as keyof typeof original];
            const childProps = {
              ...props,
              children: child,
              keyPath: [
                ...props.keyPath,
                { type: NodeTypes.SELECT, key } as KeyPath,
              ],
            };
            result[key] = deepTransformNode(child, childProps);
          }

          return (arg: string | { value: string }) => {
            const value = typeof arg === 'string' ? arg : arg?.value;
            const subResult = getSelect(result, value);

            if (isAwaitingValues(subResult) && typeof arg === 'object') {
              return subResult(arg);
            }

            return subResult;
          };
        },
      };

/** ---------------------------------------------
 * NESTED PLUGIN
 * --------------------------------------------- */

export type NestedCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.NESTED]: infer U;
}
  ? U extends {
      dictionaryKey: infer K extends DictionaryKeys;
      path?: infer P;
    }
    ? GetNestingResult<K, P, S>
    : never
  : never;

/**
 * Resolver used to turn a nested node into content.
 *
 * Optimized builds set `INTLAYER_OPTIMIZED_NESTING` so bundlers fold this to
 * the local resolver and dead-code-eliminate the registry-based one — together
 * with its `getIntlayer` import, and therefore the whole
 * `@intlayer/dictionaries-entry` module. That is what allows the dictionaries
 * entry to be emptied while `nest()` keeps working.
 */
const resolveNesting =
  process.env.INTLAYER_OPTIMIZED_NESTING === 'true'
    ? getNestingOptimized
    : getNesting;

/** Nested plugin. Replaces node with the result of `getNesting`. */
export const nestedPlugin = (locale?: LocalesValues): Plugins =>
  process.env.INTLAYER_NODE_TYPE_NESTED === 'false'
    ? fallbackPlugin
    : {
        id: 'nested-plugin',
        canHandle: (node) =>
          typeof node === 'object' &&
          (node?.nodeType === NodeTypes.NESTED || node?.nodeType === 'n'),
        transform: (node: NestedContent, props) =>
          resolveNesting(
            node[NodeTypes.NESTED].dictionaryKey,
            node[NodeTypes.NESTED].path,
            {
              ...props,
              locale: (locale ?? props.locale) as Locale,
            }
          ),
      };

/** ---------------------------------------------
 * FILE PLUGIN
 * --------------------------------------------- */

export type FileCond<T, S, _L> = T extends {
  nodeType: NodeType | string;
  [NodeTypes.FILE]: string;
  content?: string;
}
  ? DeepTransformContent<string, S>
  : never;

/** File plugin. Replaces node with the result of `getNesting`. */
export const filePlugin: Plugins =
  process.env.INTLAYER_NODE_TYPE_FILE === 'false'
    ? fallbackPlugin
    : {
        id: 'file-plugin',
        canHandle: (node) =>
          typeof node === 'object' && node?.nodeType === NodeTypes.FILE,
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
  /**
   * Dictionaries referenced through `nest()`, attached to the consuming
   * dictionary by the build optimization and threaded down by
   * `deepTransformNode`.
   *
   * Present only in optimized builds, where the global dictionary registry is
   * stripped and `getNesting` resolves from this map instead. See
   * `getNesting.optimized.ts`.
   */
  nestedDictionaries?: Record<string, unknown>;
  /**
   * Forces eager traversal of plain objects in `deepTransformNode`. By default
   * traversal is lazy (property getters), so callers that discard the returned
   * value never trigger plugins on nested nodes. Set this when running plugins
   * for their side effects only (e.g. missing-locale detection), or when most
   * of the content is read anyway: defining a getter per key, then redefining
   * it on first read, costs more than transforming the key outright.
   */
  eager?: boolean;
}

/**
 * Interface that defines the plugins that can be used to transform a node.
 * This interface can be augmented in other packages, such as `react-intlayer`.
 */
export interface IInterpreterPlugin<T, S, L extends LocalesValues> {
  translation: TranslationCond<T, S, L>;
  enumeration: EnumerationCond<T, S, L>;
  plural: PluralCond<T, S, L>;
  condition: ConditionCond<T, S, L>;
  insertion: InsertionCond<T, S, L>;
  gender: GenderCond<T, S, L>;
  select: SelectCond<T, S, L>;
  nested: NestedCond<T, S, L>;
  file: FileCond<T, S, L>;
}

/**
 * Allow to avoid overwriting import from `intlayer` package when `IInterpreterPlugin<T>` interface is augmented in another package, such as `react-intlayer`.
 */
export type IInterpreterPluginState = {
  translation: true;
  enumeration: true;
  plural: true;
  condition: true;
  insertion: true;
  gender: true;
  select: true;
  nested: true;
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
type Traverse<T, S, L extends LocalesValues = DeclaredLocales> =
  T extends ReadonlyArray<infer U> // Turn any read-only array into a plain mutable array
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
> =
  IsAny<T> extends true
    ? T
    : CheckApplyPlugin<T, keyof IInterpreterPlugin<T, S, L>, S, L> extends never // Check if there is a plugin for T:
      ? // No plugin was found, so try to transform T recursively:
        Traverse<T, S, L>
      : // A plugin was found – use the plugin's transformation.
        CheckApplyPlugin<T, keyof IInterpreterPlugin<T, S, L>, S, L>;
