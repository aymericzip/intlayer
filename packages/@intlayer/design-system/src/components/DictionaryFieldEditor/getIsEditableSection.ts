import { getNodeChildren, getNodeType } from '@intlayer/core';
import { type ContentNode, NodeType, type TypedNode } from '@intlayer/types';

export const getIsEditableSection = (section: ContentNode): boolean => {
  const children = getNodeChildren(section);
  const nodeType = getNodeType(section);

  if (
    children &&
    (nodeType === NodeType.ReactNode || nodeType === NodeType.File)
  ) {
    return true;
  }

  if (children && typeof (children as TypedNode).nodeType === 'string') {
    return getIsEditableSection(
      (children as TypedNode)[
        (children as TypedNode).nodeType as keyof typeof section
      ]
    );
  }

  return (
    typeof children === 'string' || // String
    typeof children === 'number' || // Number
    typeof children === 'boolean' || // Boolean
    typeof children === 'undefined' // Undefined like nested field
  );
};
