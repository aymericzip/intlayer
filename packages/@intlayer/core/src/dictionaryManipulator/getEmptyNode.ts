import type { ContentNode, TypedNode } from '@intlayer/types/dictionary';

import * as NodeTypes from '@intlayer/types/nodeType';

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
    const content =
      typedNode[typedNode.nodeType as unknown as keyof typeof typedNode];

    if (
      typedNode.nodeType === NodeTypes.TRANSLATION ||
      typedNode.nodeType === NodeTypes.ENUMERATION ||
      typedNode.nodeType === NodeTypes.CONDITION ||
      typedNode.nodeType === NodeTypes.INSERTION ||
      typedNode.nodeType === NodeTypes.HTML
    ) {
      return getEmptyNode(content as ContentNode);
    }

    if (typedNode.nodeType === NodeTypes.NESTED) {
      return 'dictionary-key';
    }

    if (typedNode.nodeType === NodeTypes.FILE) {
      return 'file/path';
    }

    if (typedNode.nodeType === NodeTypes.MARKDOWN) {
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
    getEmptyNode(value as ContentNode),
  ]);

  const mappedSectionArray = Object.fromEntries(mappedSectionObject);

  return mappedSectionArray;
};
