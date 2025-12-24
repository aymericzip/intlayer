import { getNodeType } from '@intlayer/core';
import {
  type ContentNode,
  type Dictionary,
  type KeyPath,
  NodeType,
} from '@intlayer/types';

export type FlattenedDictionaryNode = {
  dictionary: Dictionary;
  keyPath: KeyPath[];
  content: ContentNode;
  nodeType: NodeType;
};

export const flattenDictionary = (
  dictionary: Dictionary
): FlattenedDictionaryNode[] => {
  const flattened: FlattenedDictionaryNode[] = [];

  const traverse = (node: ContentNode, keyPath: KeyPath[]) => {
    const nodeType = getNodeType(node);

    if (
      nodeType === NodeType.Translation ||
      nodeType === NodeType.Markdown ||
      nodeType === NodeType.File ||
      nodeType === NodeType.Text ||
      nodeType === NodeType.Number ||
      nodeType === NodeType.Boolean
    ) {
      flattened.push({
        dictionary,
        keyPath,
        content: node,
        nodeType,
      });
      return;
    }

    if (nodeType === NodeType.Object) {
      const obj = node as unknown as Record<string, ContentNode>;
      Object.entries(obj).forEach(([key, value]) => {
        traverse(value, [...keyPath, { type: NodeType.Object, key }]);
      });
      return;
    }

    if (nodeType === NodeType.Array) {
      const arr = node as unknown as ContentNode[];
      arr.forEach((value, index) => {
        traverse(value, [...keyPath, { type: NodeType.Array, key: index }]);
      });
      return;
    }

    if (
      nodeType === NodeType.Enumeration ||
      nodeType === NodeType.Condition ||
      nodeType === NodeType.Gender ||
      nodeType === NodeType.Insertion ||
      nodeType === NodeType.Nested
    ) {
      const typedNode = node as any;
      const innerContent = typedNode[nodeType];

      if (innerContent && typeof innerContent === 'object') {
        Object.entries(innerContent).forEach(([key, value]) => {
          traverse(value as ContentNode, [
            ...keyPath,
            { type: nodeType, key } as any,
          ]);
        });
      }
      return;
    }
  };

  if (dictionary.content) {
    traverse(dictionary.content, []);
  }

  return flattened;
};
