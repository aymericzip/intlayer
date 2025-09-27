import {
  deepTransformNode,
  type NodeProps,
  type Plugins,
} from '../interpreter';
import { KeyPath, NodeType, TypedNode, type ContentNode } from '../types';

const replaceValuesPlugin = (value: string | number | boolean): Plugins => ({
  id: 'replace-values-plugin',
  canHandle: (node) =>
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean',
  transform: () => value,
});

const skipTypedNodePlugin: Plugins = {
  id: 'skip-typed-node-plugin',
  canHandle: (node) =>
    typeof node === 'object' && typeof node?.nodeType === 'string',
  transform: (node: TypedNode, props, deepTransformNode) => {
    const nodeType = node.nodeType as NodeType;
    const result = structuredClone(
      node[nodeType as unknown as keyof TypedNode] as any
    );

    // If the result is a primitive value (string, number, boolean),
    // we need to transform it directly instead of iterating over its properties
    if (typeof result !== 'object' || result === null) {
      const transformedResult = deepTransformNode(result, {
        ...props,
        children: result,
        keyPath: [
          ...props.keyPath,
          { type: nodeType, key: nodeType } as KeyPath,
        ],
      });
      return {
        ...node,
        [nodeType as unknown as keyof TypedNode]: transformedResult,
      };
    }

    // For objects and arrays, iterate over their properties
    for (const key in result) {
      const childProps = {
        ...props,
        children: result[key as unknown as keyof typeof result],
        keyPath: [...props.keyPath, { type: nodeType, key } as KeyPath],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        result[key as unknown as keyof typeof result],
        childProps
      );
    }

    return { ...node, [nodeType as unknown as keyof TypedNode]: result };
  },
};

export const getReplacedValuesContent = (
  node: ContentNode,
  value: string | number | boolean,
  nodeProps: NodeProps
) => {
  const plugins: Plugins[] = [
    skipTypedNodePlugin,
    replaceValuesPlugin(value),
    ...(nodeProps.plugins ?? []),
  ];

  const JSONNode = JSON.parse(JSON.stringify(node));

  return deepTransformNode(JSONNode, {
    ...nodeProps,
    plugins,
  });
};
