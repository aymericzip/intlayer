// Shared AST utilities come from @intlayer/lsp/utils — the single source of
// truth for caller matching (base intlayer + every compat library). This
// module only keeps thin aliases for the extension's historical API plus a
// few extension-only helpers.

import {
  getPropertyKeyName as getPropertyKeyNameShared,
  getStaticStringValue,
  isStringLiteralNode,
  type OxcNode,
  parseText,
  walkAst,
} from '@intlayer/lsp/utils';

export {
  buildParentMap,
  nodeEnd,
  nodeStart,
  type OxcNode,
  walkAst,
} from '@intlayer/lsp/utils';

/**
 * Parse source code with oxc (10-20× faster than Babel).
 * Returns the Program node, or null on unrecoverable failure.
 * oxc is error-tolerant and produces a partial AST for in-progress edits.
 */
export const parseFile = (code: string): OxcNode | null => parseText(code);

/**
 * Returns true for nodes that carry a static string value:
 * Literal / StringLiteral (oxc), and no-substitution TemplateLiteral.
 */
export const isStringLiteral = (node: OxcNode): boolean =>
  isStringLiteralNode(node);

/** Extract the static string value from a literal node, or '' if not applicable. */
export const getStringValue = (node: OxcNode): string =>
  getStaticStringValue(node) ?? '';

/** Get the identifier name from a property key node. */
export const getPropertyKeyName = (keyNode: OxcNode): string =>
  getPropertyKeyNameShared(keyNode) ?? '';

/** Collect all AST nodes of the given type. */
export const findAllOfType = (root: OxcNode, type: string): OxcNode[] => {
  const results: OxcNode[] = [];
  walkAst(root, (node) => {
    if (node.type === type) results.push(node);
    return undefined;
  });
  return results;
};

/**
 * Convert a byte offset into the text to a 0-based {line, character} position.
 * Works the same as VS Code's `document.positionAt` but for a raw string.
 */
export const offsetToLineCol = (
  text: string,
  offset: number
): { line: number; character: number } => {
  const before = text.slice(0, offset);
  const line = (before.match(/\n/g) ?? []).length;
  const character = offset - (before.lastIndexOf('\n') + 1);
  return { line, character };
};

/**
 * Find the deepest AST node whose span [start, end) contains `offset`.
 * Returns null if no node spans the position.
 */
export const findNodeAtOffset = (
  root: OxcNode,
  offset: number
): OxcNode | null => {
  let deepest: OxcNode | null = null;

  const walk = (node: unknown): void => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    const n = node as OxcNode;
    if (typeof n.type !== 'string') return;
    const start = n.start as number | undefined;
    const end = n.end as number | undefined;
    if (start === undefined || end === undefined) return;
    if (start <= offset && offset < end) {
      deepest = n;
      for (const key of Object.keys(n)) {
        if (key === 'start' || key === 'end' || key === 'type') continue;
        walk(n[key]);
      }
    }
  };

  walk(root);
  return deepest;
};
