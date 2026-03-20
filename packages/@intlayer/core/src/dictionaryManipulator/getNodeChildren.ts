import type { ContentNode, TypedNode } from '@intlayer/types/dictionary';

import * as NodeTypes from '@intlayer/types/nodeType';

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
    const content =
      typedNode[typedNode.nodeType as unknown as keyof typeof typedNode];

    if (
      typedNode.nodeType === NodeTypes.TRANSLATION ||
      typedNode.nodeType === NodeTypes.ENUMERATION ||
      typedNode.nodeType === NodeTypes.CONDITION ||
      typedNode.nodeType === NodeTypes.INSERTION ||
      typedNode.nodeType === NodeTypes.GENDER ||
      typedNode.nodeType === NodeTypes.FILE ||
      typedNode.nodeType === NodeTypes.MARKDOWN ||
      typedNode.nodeType === NodeTypes.HTML
    ) {
      const firstKey = Object.keys(content)[0] as keyof typeof content;
      return content[firstKey] as ContentNode;
    }

    if (typedNode.nodeType === NodeTypes.NESTED) {
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
