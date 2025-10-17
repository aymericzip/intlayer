import { NodeType, type TypedNode } from '../types';
import type { ContentNode } from '../types/dictionary';
import { isValidElement } from '../utils/isValidReactElement';

/**
 * Type guard to check if content is a TypedNode
 */
const isTypedNode = (content: unknown): content is TypedNode => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'nodeType' in content &&
    typeof (content as TypedNode).nodeType === 'string'
  );
};

/**
 * Type guard to check if content is a valid NodeType
 */
const isValidNodeType = (nodeType: string): nodeType is NodeType => {
  return Object.values(NodeType).includes(nodeType as NodeType);
};

export const getNodeType = (content: ContentNode): NodeType => {
  if (typeof content === 'string') {
    return NodeType.Text;
  }

  if (isTypedNode(content)) {
    const nodeType = content.nodeType;
    if (isValidNodeType(nodeType)) {
      return nodeType;
    }
    // Fallback for unknown node types
    return NodeType.Unknown;
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

  if (content === null) {
    return NodeType.Null;
  }

  return NodeType.Unknown;
};
