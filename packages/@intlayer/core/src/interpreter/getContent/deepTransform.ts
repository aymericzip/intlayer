import { type KeyPath, NodeType } from '@intlayer/types';
import type { NodeProps } from './plugins';

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
      return plugin.transform(node, props, (node: any, props: any) =>
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
        children: child,
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
      children: node[key],
      keyPath: [...props.keyPath, { type: NodeType.Object, key } as KeyPath],
    };
    result[key] = deepTransformNode(node[key], childProps);
  }

  return result;
};
