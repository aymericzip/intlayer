import {
  getDefaultNode,
  getEmptyNode,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import type { ContentNode, TypedNode } from '@intlayer/types/dictionary';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';

export type ConvertNodeTypeOptions = {
  locales: string[];
  sourceLocale: string;
};

export type ConvertNodeTypeResult = {
  node: ContentNode;
  /** False when part of the previous value could not be carried over. */
  isLossless: boolean;
};

const WRAPPER_TYPES: NodeType[] = [
  NodeTypes.MARKDOWN,
  NodeTypes.HTML,
  NodeTypes.INSERTION,
];

const KEYED_TYPES: NodeType[] = [
  NodeTypes.ENUMERATION,
  NodeTypes.PLURAL,
  NodeTypes.CONDITION,
  NodeTypes.GENDER,
  NodeTypes.SELECT,
];

const PRIMITIVE_TYPES: NodeType[] = [
  NodeTypes.TEXT,
  NodeTypes.NUMBER,
  NodeTypes.BOOLEAN,
];

const getTypedContent = (node: ContentNode): ContentNode =>
  (node as TypedNode)[
    (node as TypedNode).nodeType as keyof TypedNode
  ] as ContentNode;

const castPrimitive = (
  value: ContentNode,
  targetType: NodeType
): ConvertNodeTypeResult | undefined => {
  if (getNodeType(value) === targetType) {
    return { node: value, isLossless: true };
  }
  if (targetType === NodeTypes.TEXT && typeof value !== 'object') {
    return { node: String(value ?? ''), isLossless: true };
  }
  if (targetType === NodeTypes.NUMBER && typeof value === 'string') {
    const parsed = Number(value);
    if (value.trim() !== '' && !Number.isNaN(parsed)) {
      return { node: parsed, isLossless: true };
    }
  }

  return undefined;
};

/**
 * Changes the type of a node while keeping as much of its value as possible.
 * Most real type changes are wraps (`text` → `t(text)`, `t()` → `md(t())`)
 * or unwraps, which never need to lose data.
 */
export const convertNodeType = (
  node: ContentNode,
  targetType: NodeType,
  { locales, sourceLocale }: ConvertNodeTypeOptions
): ConvertNodeTypeResult => {
  const currentType = getNodeType(node);

  if (currentType === targetType) return { node, isLossless: true };

  // Unwrap: keep the inner value, then convert it
  if (
    WRAPPER_TYPES.includes(currentType) &&
    !WRAPPER_TYPES.includes(targetType)
  ) {
    return convertNodeType(getTypedContent(node), targetType, {
      locales,
      sourceLocale,
    });
  }

  // Wrap: the current node becomes the content of the new one
  if (targetType === NodeTypes.TRANSLATION) {
    return {
      node: {
        nodeType: NodeTypes.TRANSLATION,
        [NodeTypes.TRANSLATION]: Object.fromEntries(
          locales.map((locale) => [
            locale,
            locale === sourceLocale
              ? structuredClone(node)
              : getEmptyNode(node),
          ])
        ),
      } as ContentNode,
      isLossless: true,
    };
  }

  if (
    WRAPPER_TYPES.includes(targetType) &&
    !WRAPPER_TYPES.includes(currentType)
  ) {
    return {
      node: {
        nodeType: targetType,
        [targetType]: structuredClone(node),
      } as ContentNode,
      isLossless: true,
    };
  }

  if (currentType === NodeTypes.TRANSLATION) {
    const translations = (getTypedContent(node) ?? {}) as Record<
      string,
      ContentNode
    >;
    const sourceValue =
      translations[sourceLocale] ?? Object.values(translations)[0];
    const result = convertNodeType(sourceValue ?? '', targetType, {
      locales,
      sourceLocale,
    });

    return {
      node: result.node,
      isLossless: result.isLossless && Object.keys(translations).length <= 1,
    };
  }

  if (PRIMITIVE_TYPES.includes(currentType)) {
    if (PRIMITIVE_TYPES.includes(targetType)) {
      return (
        castPrimitive(node, targetType) ?? {
          node: getDefaultNode(targetType, locales),
          isLossless: false,
        }
      );
    }

    if (KEYED_TYPES.includes(targetType) || targetType === NodeTypes.ARRAY) {
      return {
        node: getDefaultNode(targetType, locales, node),
        isLossless: true,
      };
    }
  }

  // Keyed → primitive: keep the first branch
  if (
    KEYED_TYPES.includes(currentType) &&
    PRIMITIVE_TYPES.includes(targetType)
  ) {
    const branches = Object.values(
      (getTypedContent(node) ?? {}) as Record<string, ContentNode>
    );
    const result = castPrimitive(branches[0] ?? '', targetType);

    if (result) {
      return { node: result.node, isLossless: branches.length <= 1 };
    }
  }

  return { node: getDefaultNode(targetType, locales), isLossless: false };
};
