import {
  getNodeChildren,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import type { ContentNode, TypedNode } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';

export const getIsEditableSection = (section: ContentNode): boolean => {
  const children = getNodeChildren(section);
  const nodeType = getNodeType(section);

  if (
    children &&
    (nodeType === NodeTypes.REACT_NODE || nodeType === NodeTypes.FILE)
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
