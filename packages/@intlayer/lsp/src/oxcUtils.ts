import { parseSync } from 'oxc-parser';

export type OxcNode = Record<string, unknown>;

/**
 * Parse `text` into an Oxc program AST.
 * Returns null when the parse completely fails (e.g. unsupported syntax).
 * Oxc is generally resilient to partial/in-progress edits and still returns a
 * usable AST alongside error diagnostics, so this is rare.
 */
export const parseText = (text: string): OxcNode | null => {
  try {
    const { program } = parseSync('file.tsx', text);

    return program as unknown as OxcNode;
  } catch {
    return null;
  }
};

/**
 * Depth-first walk of an Oxc AST. Visitor is called for every node that has
 * a `type` property; returning `true` prunes that subtree.
 */
export const walkAst = (
  node: unknown,
  // biome-ignore lint/suspicious/noConfusingVoidType: visitors without a return value must stay assignable
  visitor: (node: OxcNode) => boolean | void
): void => {
  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node)) {
    for (const child of node) walkAst(child, visitor);

    return;
  }
  const oxcNode = node as OxcNode;

  if (typeof oxcNode['type'] !== 'string') return;

  if (visitor(oxcNode)) return; // pruned

  for (const key of Object.keys(oxcNode)) {
    if (key === 'start' || key === 'end' || key === 'type') continue;
    walkAst(oxcNode[key], visitor);
  }
};

/**
 * Build a child → parent reference map for upward traversal.
 * Only AST-node-valued properties are followed; primitives are ignored.
 */
export const buildParentMap = (root: OxcNode): Map<OxcNode, OxcNode> => {
  const parentMap = new Map<OxcNode, OxcNode>();

  const walk = (node: unknown, parent: OxcNode | null): void => {
    if (!node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      for (const child of node) walk(child, parent);

      return;
    }
    const oxcNode = node as OxcNode;

    if (typeof oxcNode['type'] !== 'string') return;

    if (parent) parentMap.set(oxcNode, parent);

    for (const key of Object.keys(oxcNode)) {
      if (key === 'start' || key === 'end' || key === 'type') continue;
      walk(oxcNode[key], oxcNode);
    }
  };

  walk(root, null);
  return parentMap;
};

/** Byte offset of the node's start. */
export const nodeStart = (node: OxcNode): number =>
  (node['start'] as number | undefined) ??
  (node['range'] as number[] | undefined)?.[0] ??
  0;

/** Byte offset of the node's end. */
export const nodeEnd = (node: OxcNode): number =>
  (node['end'] as number | undefined) ??
  (node['range'] as number[] | undefined)?.[1] ??
  0;

/** Returns `true` when `offset` falls inside the node's span (inclusive). */
export const nodeContainsOffset = (node: OxcNode, offset: number): boolean =>
  offset >= nodeStart(node) && offset <= nodeEnd(node);

/**
 * Returns `true` for nodes that carry a static string value:
 * Literal / StringLiteral, and no-substitution TemplateLiteral.
 */
export const isStringLiteralNode = (node: OxcNode): boolean => {
  const nodeType = node['type'] as string;

  if (nodeType === 'Literal' || nodeType === 'StringLiteral') {
    return typeof node['value'] === 'string';
  }

  if (nodeType === 'TemplateLiteral') {
    return ((node['expressions'] as unknown[])?.length ?? 0) === 0;
  }

  return false;
};

/**
 * Extract the static string value from a literal node, or null when the node
 * is not a static string.
 */
export const getStaticStringValue = (
  node: OxcNode | undefined
): string | null => {
  if (!node) return null;
  const nodeType = node['type'] as string;

  if (
    (nodeType === 'Literal' || nodeType === 'StringLiteral') &&
    typeof node['value'] === 'string'
  ) {
    return node['value'];
  }

  if (
    nodeType === 'TemplateLiteral' &&
    ((node['expressions'] as unknown[])?.length ?? 0) === 0
  ) {
    const templateElements = node['quasis'] as OxcNode[] | undefined;
    const valueNode = templateElements?.[0]?.['value'] as OxcNode | undefined;

    return (
      (valueNode?.['cooked'] as string) ??
      (valueNode?.['raw'] as string) ??
      null
    );
  }

  return null;
};

/** Extract the string value from the Nth argument of a call expression. */
export const getStringArgAt = (
  callNode: OxcNode,
  index: number
): string | null => {
  const argumentsList = callNode['arguments'] as OxcNode[] | undefined;

  if (!argumentsList || argumentsList.length <= index) return null;

  return getStaticStringValue(argumentsList[index]);
};

/** Extract the string value from the first argument of a call expression. */
export const getFirstStringArg = (callExpressionNode: OxcNode): string | null =>
  getStringArgAt(callExpressionNode, 0);

/**
 * Find the property node named `propertyName` inside an ObjectExpression.
 */
export const getObjectPropertyNode = (
  objectExpression: OxcNode | undefined,
  propertyName: string
): OxcNode | null => {
  if (objectExpression?.['type'] !== 'ObjectExpression') return null;

  for (const property of (objectExpression['properties'] as OxcNode[]) ?? []) {
    const propertyType = property['type'] as string;

    if (propertyType !== 'Property' && propertyType !== 'ObjectProperty') {
      continue;
    }

    const keyNode = property['key'] as OxcNode | undefined;
    const keyName =
      keyNode?.['type'] === 'Identifier'
        ? (keyNode['name'] as string)
        : typeof keyNode?.['value'] === 'string'
          ? (keyNode['value'] as string)
          : null;

    if (keyName === propertyName) return property;
  }

  return null;
};

/**
 * Read a static string property from an ObjectExpression argument,
 * e.g. the `namespace` of `useI18n({ namespace: 'about' })`.
 */
export const getObjectPropertyString = (
  objectExpression: OxcNode | undefined,
  propertyName: string
): string | null => {
  const property = getObjectPropertyNode(objectExpression, propertyName);

  if (!property) return null;

  return getStaticStringValue(property['value'] as OxcNode | undefined);
};

/** Get the identifier or string name of an object-property key node. */
export const getPropertyKeyName = (
  keyNode: OxcNode | undefined
): string | null => {
  if (!keyNode) return null;
  const nodeType = keyNode['type'] as string;

  if (nodeType === 'Identifier') return keyNode['name'] as string;

  if (
    (nodeType === 'Literal' || nodeType === 'StringLiteral') &&
    typeof keyNode['value'] === 'string'
  ) {
    return keyNode['value'];
  }

  return null;
};
