import { parseSync } from 'oxc-parser';

export const INTLAYER_GETTERS: Set<string> = new Set([
  'useIntlayer',
  'getIntlayer',
]);

export type OxcNode = Record<string, unknown>;

/**
 * Depth-first walk of an Oxc AST.  Visitor is called for every node that has
 * a `type` property;
 *  returning `true` prunes that subtree.
 */
export const walkAst = (
  node: unknown,
  visitor: (node: OxcNode) => boolean | undefined
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

/** Extract the string value from the first argument of a call expression. */
export const getFirstStringArg = (
  callExpressionNode: OxcNode
): string | null => {
  const argumentsList = callExpressionNode['arguments'] as
    | OxcNode[]
    | undefined;

  if (!argumentsList?.length) return null;
  const firstArgument = argumentsList[0]!;

  if (
    (firstArgument['type'] === 'Literal' ||
      firstArgument['type'] === 'StringLiteral') &&
    typeof firstArgument['value'] === 'string'
  ) {
    return firstArgument['value'];
  }

  if (
    firstArgument['type'] === 'TemplateLiteral' &&
    (firstArgument['expressions'] as unknown[])?.length === 0
  ) {
    const templateElements = firstArgument['quasis'] as OxcNode[] | undefined;
    const valueNode = templateElements?.[0]?.['value'] as OxcNode | undefined;

    return (
      (valueNode?.['cooked'] as string) ??
      (valueNode?.['raw'] as string) ??
      null
    );
  }

  return null;
};

/** Returns true when `node` is a useIntlayer / getIntlayer CallExpression. */
export const isIntlayerCall = (node: OxcNode): boolean => {
  if (node['type'] !== 'CallExpression') return false;
  const callee = node['callee'] as OxcNode | undefined;

  return (
    callee?.['type'] === 'Identifier' &&
    INTLAYER_GETTERS.has(callee['name'] as string)
  );
};

/**
 * Parse `text` into an Oxc program AST.
 * Returns null when the parse completely fails (e.g. unsupported syntax).
 * Oxc is generally resilient to partial/in-progress edits and still
 *  returns a
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
