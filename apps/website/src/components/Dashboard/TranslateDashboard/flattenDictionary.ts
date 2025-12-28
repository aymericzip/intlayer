import { getNodeChildren, getNodeType } from '@intlayer/core';
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

    // 1. Terminal Leafs (Primitives & Translations)
    // We ALWAYS stop here. We never want to see "en-GB" in the list view.
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

    // 2. Structural Containers (Pure Objects & Arrays)
    // We ALWAYS traverse these to find the content inside.
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

    // 3. Intlayer Wrappers (Markdown, Insertion, Condition, Enumeration, etc.)
    // These are the tricky ones.
    if (
      nodeType === NodeType.Markdown ||
      nodeType === NodeType.Enumeration ||
      nodeType === NodeType.Condition ||
      nodeType === NodeType.Gender ||
      nodeType === NodeType.Insertion ||
      nodeType === NodeType.Nested ||
      nodeType === NodeType.File
    ) {
      const innerContent = getNodeChildren(node as any);
      const innerType = getNodeType(innerContent);

      // CRITICAL CHECK:
      // If the content inside is a Translation (or primitive), we STOP.
      // We want the Editor to display the Wrapper (e.g. Markdown), and let the Editor handle the Translation inside.
      // This prevents breadcrumbs like: Key > Markdown > Translation > en-GB
      if (
        innerType === NodeType.Translation ||
        innerType === NodeType.Text ||
        innerType === NodeType.Number ||
        innerType === NodeType.Boolean ||
        innerType === NodeType.File // File inside Markdown
      ) {
        flattened.push({
          dictionary,
          keyPath,
          content: node,
          nodeType,
        });
        return;
      }

      // If the content inside is a complex Object/Array, we MIGHT need to traverse.
      // Example: A Condition containing complex objects in its cases.
      // However, usually, the Editor components (EnumerationTextEditor, etc.) handle their own keys.
      // So usually, we treat Intlayer Nodes as Leafs.

      // If you really want to flatten nested objects inside wrappers (rare),
      // you would uncomment the traversal below.
      // But for 99% of cases, pushing the node here is the correct behavior for the Dashboard.
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
