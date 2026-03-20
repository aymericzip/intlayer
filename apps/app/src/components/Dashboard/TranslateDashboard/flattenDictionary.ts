import { getNodeType } from '@intlayer/core/dictionaryManipulator';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';

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
      nodeType === NodeTypes.TRANSLATION ||
      nodeType === NodeTypes.REACT_NODE ||
      nodeType === NodeTypes.TEXT ||
      nodeType === NodeTypes.NUMBER ||
      nodeType === NodeTypes.BOOLEAN
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
    if (nodeType === NodeTypes.ARRAY) {
      const arrayContent = node as unknown as ContentNode[];

      const hasComplexChildren = arrayContent.some((value) => {
        const childType = getNodeType(value);
        return (
          childType === NodeTypes.OBJECT ||
          childType === NodeTypes.ARRAY ||
          childType === NodeTypes.TRANSLATION ||
          childType === NodeTypes.MARKDOWN ||
          childType === NodeTypes.INSERTION
        );
      });

      if (hasComplexChildren) {
        arrayContent.forEach((value, index) => {
          traverse(value, [...keyPath, { type: NodeTypes.ARRAY, key: index }]);
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
    if (nodeType === NodeTypes.OBJECT) {
      const obj = node as unknown as Record<string, ContentNode>;
      const entries = Object.entries(obj);

      const hasComplexChildren = entries.some(([_, value]) => {
        const childType = getNodeType(value);
        return (
          childType === NodeTypes.OBJECT ||
          childType === NodeTypes.ARRAY ||
          childType === NodeTypes.TRANSLATION ||
          childType === NodeTypes.MARKDOWN ||
          childType === NodeTypes.INSERTION
        );
      });

      if (hasComplexChildren) {
        entries.forEach(([key, value]) => {
          traverse(value, [...keyPath, { type: NodeTypes.OBJECT, key }]);
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
      nodeType === NodeTypes.MARKDOWN ||
      nodeType === NodeTypes.ENUMERATION ||
      nodeType === NodeTypes.CONDITION ||
      nodeType === NodeTypes.GENDER ||
      nodeType === NodeTypes.INSERTION ||
      nodeType === NodeTypes.NESTED ||
      nodeType === NodeTypes.FILE
    ) {
      // Explicitly handle Insertion and Markdown to traverse into Translation content
      // This bypasses generic getNodeChildren/wrapperKey lookup which may be flaky for these types
      if (nodeType === NodeTypes.INSERTION || nodeType === NodeTypes.MARKDOWN) {
        const innerContent = (node as Record<string, any>)[
          nodeType === NodeTypes.INSERTION
            ? NodeTypes.INSERTION
            : NodeTypes.MARKDOWN
        ];

        // Ensure we only traverse if the inner content is a Translation
        if (
          innerContent &&
          getNodeType(innerContent) === NodeTypes.TRANSLATION
        ) {
          traverse(innerContent, [...keyPath, { type: nodeType }]);

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
