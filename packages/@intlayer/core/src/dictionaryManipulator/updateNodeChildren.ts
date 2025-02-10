import { type ContentNode, type TypedNode, NodeType } from '../types';

export const updateNodeChildren = <
  T extends ContentNode,
  U extends ContentNode,
>(
  section: T,
  newChildren: U
): ContentNode => {
  if (typeof section === 'string') {
    return newChildren;
  }
  if (typeof section === 'number') {
    return newChildren;
  }
  if (typeof section === 'boolean') {
    return newChildren;
  }
  if (typeof (section as TypedNode)?.nodeType === 'string') {
    const typedNode = section as TypedNode;
    const content = typedNode[typedNode.nodeType as keyof TypedNode];

    if (
      typedNode.nodeType === NodeType.Translation ||
      typedNode.nodeType === NodeType.Enumeration ||
      typedNode.nodeType === NodeType.Condition
    ) {
      const newContent = Object.entries(content).reduce(
        (acc, [key]) => ({
          ...acc,
          [key]: newChildren,
        }),
        {} as Record<string, ContentNode>
      );

      return {
        ...typedNode,
        [typedNode.nodeType]: newContent,
      };
    }

    if (typedNode.nodeType === NodeType.Nested) {
      return typedNode;
    }

    return {
      ...typedNode,
      [typedNode.nodeType]: newChildren,
    };
  }

  if (!section || typeof section !== 'object') {
    return newChildren;
  }

  if (Array.isArray(section)) {
    return section.map(() => newChildren) as unknown as ContentNode;
  }

  return Object.entries(
    section as unknown as Record<string, ContentNode>
  ).reduce(
    (acc, [key]) => ({
      ...acc,
      [key]: newChildren,
    }),
    {} as Record<string, ContentNode>
  ) as ContentNode;
};
