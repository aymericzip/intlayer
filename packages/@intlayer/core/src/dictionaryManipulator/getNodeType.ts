import { NodeType, type TypedNode } from '../types';
import type { ContentNode } from '../types/dictionary';
import { isValidElement } from '../utils/isValidReactElement';

export const getNodeType = (content: ContentNode): NodeType => {
  if (typeof content === 'string') {
    return NodeType.Text;
  }

  if (typeof (content as TypedNode)?.nodeType === 'string') {
    return (content as TypedNode).nodeType as NodeType;
  }

  if (Array.isArray(content)) {
    return NodeType.Array;
  }

  if (isValidElement(content)) {
    return NodeType.ReactNode;
  }

  if (typeof content === 'number') {
    return NodeType.Number;
  }

  if (typeof content === 'boolean') {
    return NodeType.Boolean;
  }

  if (content && typeof content === 'object') {
    return NodeType.Object;
  }

  return NodeType.Unknown;
};
