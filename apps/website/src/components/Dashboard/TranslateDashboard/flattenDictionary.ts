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

    // Terminal Leafs (Primitives, Translations & ReactNodes)
    if (
      nodeType === NodeType.Translation ||
      nodeType === NodeType.ReactNode ||
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

    // Arrays (Unified Logic)
    if (nodeType === NodeType.Array) {
      const arrayContent = node as unknown as ContentNode[];

      const hasComplexChildren = arrayContent.some((value) => {
        const childType = getNodeType(value);
        return (
          childType === NodeType.Object ||
          childType === NodeType.Array ||
          childType === NodeType.Translation ||
          childType === NodeType.Markdown ||
          childType === NodeType.Insertion
        );
      });

      if (hasComplexChildren) {
        arrayContent.forEach((value, index) => {
          traverse(value, [...keyPath, { type: NodeType.Array, key: index }]);
        });
        return;
      }

      flattened.push({
        dictionary,
        keyPath,
        content: node,
        nodeType,
      });
      return;
    }

    // Objects
    if (nodeType === NodeType.Object) {
      const obj = node as unknown as Record<string, ContentNode>;
      const entries = Object.entries(obj);

      const hasComplexChildren = entries.some(([_, value]) => {
        const childType = getNodeType(value);
        return (
          childType === NodeType.Object ||
          childType === NodeType.Array ||
          childType === NodeType.Translation ||
          childType === NodeType.Markdown ||
          childType === NodeType.Insertion
        );
      });

      if (hasComplexChildren) {
        entries.forEach(([key, value]) => {
          traverse(value, [...keyPath, { type: NodeType.Object, key }]);
        });
        return;
      }

      flattened.push({
        dictionary,
        keyPath,
        content: node,
        nodeType,
      });
      return;
    }

    // Intlayer Wrappers (Markdown, Insertion, etc.)
    if (
      nodeType === NodeType.Markdown ||
      nodeType === NodeType.Enumeration ||
      nodeType === NodeType.Condition ||
      nodeType === NodeType.Gender ||
      nodeType === NodeType.Insertion ||
      nodeType === NodeType.Nested ||
      nodeType === NodeType.File
    ) {
      // Explicitly handle Insertion and Markdown to traverse into Translation content
      // This bypasses generic getNodeChildren/wrapperKey lookup which may be flaky for these types
      if (nodeType === NodeType.Insertion || nodeType === NodeType.Markdown) {
        const contentKey =
          nodeType === NodeType.Insertion ? 'insertion' : 'markdown';
        const innerContent = (node as Record<string, any>)[contentKey];

        // Ensure we only traverse if the inner content is a Translation
        if (
          innerContent &&
          getNodeType(innerContent) === NodeType.Translation
        ) {
          traverse(innerContent, [
            ...keyPath,
            { type: nodeType, key: contentKey },
          ]);

          return;
        }
      }

      // Default to leaf for unknown complex wrappers or if no Translation found inside
      flattened.push({
        dictionary,
        keyPath,
        content: node,
        nodeType,
      });

      return;
    }
  };

  if (dictionary.content) {
    traverse(dictionary.content, []);
  }

  return flattened;
};
