import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { NodeProps } from './plugins';

/** Props of a child node: same context, one more key path segment. */
const getChildProps = (
  props: NodeProps,
  children: unknown,
  keyPathSegment: KeyPath
): NodeProps => ({
  ...props,
  children,
  keyPath: [...props.keyPath, keyPathSegment],
});

/**
 * Recursively traverses a node (object/array/primitive).
 * Applies the *first* plugin that can transform a node, then stops descending further.
 * If no plugin transforms it, it recurses into its children.
 */
export const deepTransformNode = (node: any, props: NodeProps): any => {
  for (const plugin of props.plugins ?? []) {
    if (plugin.canHandle(node)) {
      // Return the transformed node => do NOT recurse further
      return plugin.transform(node, props, deepTransformNode);
    }
  }

  // Primitives, and functions such as html/markdown node renderers
  if (node === null || typeof node !== 'object') {
    return node;
  }

  // Framework virtual nodes and already-transformed nodes are final
  if (
    node.$$typeof !== undefined ||
    node.__v_isVNode !== undefined ||
    node._isVNode !== undefined ||
    node.isJSX !== undefined
  ) {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child, index) =>
      deepTransformNode(
        child,
        getChildProps(props, child, {
          type: NodeTypes.ARRAY,
          key: index,
        } as KeyPath)
      )
    );
  }

  const result: Record<string, any> = {};

  for (const key in node) {
    const keyPathSegment = { type: NodeTypes.OBJECT, key } as KeyPath;

    if (props.eager) {
      result[key] = deepTransformNode(
        node[key],
        getChildProps(props, node[key], keyPathSegment)
      );
      continue;
    }

    // Lazy mode: transform on first read, then memoize onto the property
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        const transformed = deepTransformNode(
          node[key],
          getChildProps(props, node[key], keyPathSegment)
        );

        Object.defineProperty(this, key, {
          value: transformed,
          enumerable: true,
          configurable: true,
        });
        return transformed;
      },
    });
  }

  return result;
};
