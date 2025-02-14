import { type ContentNode, type TypedNode, NodeType } from '../types';

export const getEmptyNode = (section: ContentNode): ContentNode => {
  if (typeof section === 'string') {
    return '';
  }
  if (typeof section === 'number') {
    return 0;
  }
  if (typeof section === 'boolean') {
    return true;
  }
  if (typeof (section as TypedNode)?.nodeType === 'string') {
    const typedNode = section as TypedNode;
    const content = typedNode[typedNode.nodeType as keyof TypedNode];

    if (
      typedNode.nodeType === NodeType.Translation ||
      typedNode.nodeType === NodeType.Enumeration ||
      typedNode.nodeType === NodeType.Condition
    ) {
      return getEmptyNode(content as ContentNode);
    }

    if (typedNode.nodeType === NodeType.Nested) {
      return typedNode;
    }

    if (typedNode.nodeType === NodeType.Markdown) {
      return getEmptyNode(typedNode);
    }

    return content;
  }

  if (!section || typeof section !== 'object') {
    return section;
  }

  if (Array.isArray(section)) {
    return (section as ContentNode[]).map(
      getEmptyNode
    ) as unknown as ContentNode;
  }

  const mappedSectionObject = Object.entries(section).map(([key, value]) => [
    key,
    getEmptyNode(value),
  ]);

  const mappedSectionArray = Object.fromEntries(mappedSectionObject);

  return mappedSectionArray;
};
