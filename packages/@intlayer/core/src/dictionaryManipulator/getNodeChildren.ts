import { type ContentNode, type TypedNode, NodeType } from '../types';

export const getNodeChildren = (section: ContentNode): ContentNode => {
  if (typeof section === 'string') {
    return section;
  }
  if (typeof section === 'number') {
    return section;
  }
  if (typeof section === 'boolean') {
    return section;
  }
  if (typeof (section as TypedNode)?.nodeType === 'string') {
    const typedNode = section as TypedNode;
    const content = typedNode[typedNode.nodeType as keyof TypedNode];

    if (
      typedNode.nodeType === NodeType.Translation ||
      typedNode.nodeType === NodeType.Enumeration ||
      typedNode.nodeType === NodeType.Condition
    ) {
      const firstKey = Object.keys(content)[0] as keyof typeof content;
      return content[firstKey] as ContentNode;
    }

    if (typedNode.nodeType === NodeType.Nested) {
      return undefined;
    }

    return content;
  }

  if (!section || typeof section !== 'object') {
    return section;
  }

  if (Array.isArray(section)) {
    return (section as ContentNode[])[0];
  }

  return section;
};
