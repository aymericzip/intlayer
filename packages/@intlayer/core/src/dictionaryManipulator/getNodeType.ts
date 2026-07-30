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
 * Every known {@link NodeType}, as a lookup record.
 *
 * Typed as `Record<NodeType, true>` so that adding a node type to
 * `@intlayer/types` without registering it here becomes a compile-time error.
 */
const validNodeTypes: Record<NodeType, true> = {
  [NodeTypes.TRANSLATION]: true,
  [NodeTypes.ENUMERATION]: true,
  [NodeTypes.PLURAL]: true,
  [NodeTypes.CONDITION]: true,
  [NodeTypes.INSERTION]: true,
  [NodeTypes.FILE]: true,
  [NodeTypes.OBJECT]: true,
  [NodeTypes.ARRAY]: true,
  [NodeTypes.NESTED]: true,
  [NodeTypes.REACT_NODE]: true,
  [NodeTypes.PREACT_NODE]: true,
  [NodeTypes.SOLID_NODE]: true,
  [NodeTypes.MARKDOWN]: true,
  [NodeTypes.HTML]: true,
  [NodeTypes.TEXT]: true,
  [NodeTypes.NUMBER]: true,
  [NodeTypes.BOOLEAN]: true,
  [NodeTypes.GENDER]: true,
  [NodeTypes.SELECT]: true,
  [NodeTypes.NULL]: true,
  [NodeTypes.UNKNOWN]: true,
};

/**
 * Type guard to check if a raw string is a valid {@link NodeType}
 */
const isValidNodeType = (nodeType: string): nodeType is NodeType =>
  Object.hasOwn(validNodeTypes, nodeType);

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
