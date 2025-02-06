/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Locales } from '@intlayer/config/client';
import { type KeyPath, NodeType } from '../../types/index';

export interface NodeProps {
  dictionaryKey: string;
  keyPath: KeyPath[];
  plugins?: Plugins[];
  locale?: Locales;
  dictionaryPath?: string;
  content?: any;
}

/**
 * A plugin/transformer that can optionally transform a node during a single DFS pass.
 * - `canHandle` decides if the node is transformable by this plugin.
 * - `transform` returns the transformed node (and does not recurse further).
 *
 * > `transformFn` is a function that can be used to deeply transform inside the plugin.
 */
export type Plugins = {
  canHandle(node: any): boolean;
  transform(
    node: any,
    props: NodeProps,
    transformFn: (node: any, props: NodeProps) => any
  ): any;
};

export interface IPluginCond<T> {}

export type DeepTransformContent<T> =
  IPluginCond<T>[keyof IPluginCond<T>] extends never
    ? T extends object // Check if the property is an object
      ? T extends (infer U)[] // If it's an array, infer the type of array elements
        ? DeepTransformContent<U>[] // Apply DeepTransformContent recursively to each element of the array
        : {
            [K in keyof T]: DeepTransformContent<T[K]>;
          }
      : T extends undefined
        ? never
        : T
    : IPluginCond<T>[keyof IPluginCond<T>];

/**
 * Recursively traverses a node (object/array/primitive).
 * Applies the *first* plugin that can transform a node, then stops descending further.
 * If no plugin transforms it, it recurses into its children.
 */
export const deepTransformNode = (node: any, props: NodeProps): any => {
  // Otherwise, if it's an object, check if any plugin can handle it:
  for (const plugin of props.plugins ?? []) {
    if (plugin.canHandle(node)) {
      // Return the transformed node => do NOT recurse further
      return plugin.transform(node, props, (node: any, props: NodeProps) =>
        deepTransformNode(node, props)
      );
    }
  }

  // If it's null/undefined or not an object, just return it directly:
  if (node === null || typeof node !== 'object') {
    return node;
  }

  // If it's an array, transform each element:
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const childProps = {
        ...props,
        content: child,
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Array, key: index } as KeyPath,
        ],
      };
      return deepTransformNode(child, childProps);
    });
  }

  // If no plugin transforms it, we keep traversing its properties.
  const result: Record<string, any> = {};
  for (const key in node) {
    const childProps = {
      ...props,
      content: node[key],
      keyPath: [...props.keyPath, { type: NodeType.Object, key } as KeyPath],
    };
    result[key] = deepTransformNode(node[key], childProps);
  }

  return result;
};
