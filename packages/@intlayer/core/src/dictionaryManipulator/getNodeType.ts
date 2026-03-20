import type { ContentNode, TypedNode } from '@intlayer/types/dictionary';

import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
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
  return [
    NodeTypes.TRANSLATION,
    NodeTypes.ENUMERATION,
    NodeTypes.CONDITION,
    NodeTypes.INSERTION,
    NodeTypes.FILE,
    NodeTypes.OBJECT,
    NodeTypes.ARRAY,
    NodeTypes.NESTED,
    NodeTypes.REACT_NODE,
    NodeTypes.MARKDOWN,
    NodeTypes.HTML,
    NodeTypes.TEXT,
    NodeTypes.NUMBER,
    NodeTypes.BOOLEAN,
    NodeTypes.GENDER,
    NodeTypes.NULL,
    NodeTypes.UNKNOWN,
  ].includes(nodeType as NodeType);
};

export const getNodeType = (content: ContentNode): NodeType => {
  if (typeof content === 'string') {
    return NodeTypes.TEXT;
  }

  if (isTypedNode(content)) {
    const nodeType = content.nodeType;
    if (isValidNodeType(nodeType)) {
      return nodeType;
    }
    // Fallback for unknown node types
    return NodeTypes.UNKNOWN;
  }

  if (Array.isArray(content)) {
    return NodeTypes.ARRAY;
  }

  if (isValidElement(content)) {
    return NodeTypes.REACT_NODE;
  }

  if (typeof content === 'number') {
    return NodeTypes.NUMBER;
  }

  if (typeof content === 'boolean') {
    return NodeTypes.BOOLEAN;
  }

  if (content && typeof content === 'object') {
    return NodeTypes.OBJECT;
  }

  if (content === null) {
    return NodeTypes.NULL;
  }

  return NodeTypes.UNKNOWN;
};
