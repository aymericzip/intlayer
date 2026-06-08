import { Position, Range } from 'vscode-languageserver/node';
import {
  getFirstStringArg,
  isIntlayerCall,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';

export const escapeRegularExpression = (content: string): string =>
  content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const offsetToRange = (
  text: string,
  start: number,
  end: number
): Range => {
  const beforeStart = text.slice(0, start);
  const startLine = (beforeStart.match(/\n/g) ?? []).length;
  const startCharacter = start - (beforeStart.lastIndexOf('\n') + 1);
  const beforeEnd = text.slice(0, end);
  const endLine = (beforeEnd.match(/\n/g) ?? []).length;
  const endCharacter = end - (beforeEnd.lastIndexOf('\n') + 1);

  return Range.create(
    Position.create(startLine, startCharacter),
    Position.create(endLine, endCharacter)
  );
};

// ---------------------------------------------------------------------------
// Helpers for nested path matching
// ---------------------------------------------------------------------------

const isComputedAccess = (node: OxcNode): boolean =>
  !!(node['computed'] as boolean);

/**
 * Walk up a chain of MemberExpressions to find the root Identifier name.
 * Returns null for computed access (`a[b]`) or non-Identifier roots.
 */
const getChainRoot = (node: OxcNode): string | null => {
  let current = node;
  while (current['type'] === 'MemberExpression') {
    if (isComputedAccess(current)) return null;
    current = current['object'] as OxcNode;
  }
  return current['type'] === 'Identifier' ? (current['name'] as string) : null;
};

/**
 * Collect the property names in a chain of MemberExpressions, excluding the
 * root Identifier.  Returns null for any computed access.
 * e.g.  `content.searchInput.text` → `['searchInput', 'text']`
 */
const getChainProperties = (node: OxcNode): string[] | null => {
  const chain: string[] = [];
  let current = node;
  while (current['type'] === 'MemberExpression') {
    if (isComputedAccess(current)) return null;
    const prop = current['property'] as OxcNode;
    const name = prop['name'] as string | undefined;
    if (!name) return null;
    chain.unshift(name);
    current = current['object'] as OxcNode;
  }
  return chain;
};

/**
 * Recursively search for a field at `path[depth]` inside an ObjectPattern
 * (destructure).  Returns the Range of the matched key node, or null.
 *
 * e.g.  `{ searchInput: { text } }` with path `['searchInput', 'text']` depth 0
 *       → returns the range of the `text` identifier inside the nested pattern.
 */
const findInObjectPattern = (
  pattern: OxcNode,
  path: string[],
  depth: number,
  text: string
): Range | null => {
  if (pattern['type'] !== 'ObjectPattern') return null;
  if (depth >= path.length) return null;

  const targetName = path[depth]!;

  for (const prop of (pattern['properties'] as OxcNode[]) ?? []) {
    if (prop['type'] !== 'Property' && prop['type'] !== 'ObjectProperty')
      continue;
    const keyNode = prop['key'] as OxcNode | undefined;
    if (!keyNode) continue;

    const keyName =
      (keyNode['name'] as string | undefined) ??
      (keyNode['value'] as string | undefined);
    if (keyName !== targetName) continue;

    if (depth === path.length - 1) {
      return offsetToRange(
        text,
        keyNode['start'] as number,
        keyNode['end'] as number
      );
    }

    const valueNode = prop['value'] as OxcNode | undefined;
    if (!valueNode) return null;
    return findInObjectPattern(valueNode, path, depth + 1, text);
  }

  return null;
};

/**
 * Recursively collect variables that were destructured out of an ObjectPattern,
 * recording the "remaining intlayer path" each variable represents.
 *
 * e.g. given `{ searchInput }` with basePath `[]`, the variable `searchInput`
 * maps to remaining path `['searchInput']` (meaning it holds the searchInput
 * branch of the dictionary).
 *
 * e.g. given `{ searchInput: { text: alias } }` with basePath `[]`, the
 * variable `alias` maps to remaining path `['searchInput', 'text']`.
 */
const collectDestructuredVariables = (
  pattern: OxcNode,
  basePath: string[],
  map: Map<string, string[]>
): void => {
  if (pattern['type'] !== 'ObjectPattern') return;

  for (const prop of (pattern['properties'] as OxcNode[]) ?? []) {
    if (prop['type'] !== 'Property' && prop['type'] !== 'ObjectProperty')
      continue;
    const keyNode = prop['key'] as OxcNode | undefined;
    const valueNode = prop['value'] as OxcNode | undefined;
    if (!keyNode || !valueNode) continue;

    const keyName =
      (keyNode['name'] as string | undefined) ??
      (keyNode['value'] as string | undefined);
    if (!keyName) continue;

    const thisPath = [...basePath, keyName];

    if (valueNode['type'] === 'Identifier') {
      // `{ a }` or `{ a: alias }` → variable name is valueNode.name
      map.set(valueNode['name'] as string, thisPath);
    } else if (valueNode['type'] === 'ObjectPattern') {
      // `{ a: { b } }` → 'a' is consumed as a pattern level; recurse
      collectDestructuredVariables(valueNode, thisPath, map);
    }
    // AssignmentPattern defaults (`{ a = 'x' }`) are ignored for simplicity
  }
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Within a single file's text, find all positions where `fieldPath` (or legacy
 * `fieldName`) is used as a destructured property or member access on a
 * `useIntlayer(key)` / `getIntlayer(key)` result.
 *
 * Covers four patterns:
 *   1. Direct destructure:
 *        const { field } = useIntlayer("key")
 *   2. Nested destructure:
 *        const { parent: { child } } = useIntlayer("key")
 *   3. Indirect variable + member access:
 *        const { parent } = useIntlayer("key")
 *        parent.child
 *   4. Full chain member access:
 *        const content = useIntlayer("key")
 *        content.parent.child
 *
 * `fieldPath` (optional 5th parameter) is the preferred input; when omitted
 * the function derives the single-element path from `escapedField`, preserving
 * backward compatibility.
 */
export const findFieldRangesInFile = (
  text: string,
  escapedKey: string,
  _fieldName: string,
  escapedField: string,
  fieldPath?: string[]
): Range[] => {
  const dictionaryKey = escapedKey.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');
  const unescapedLeaf = escapedField.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');

  // Effective path: use the provided fieldPath when available, else single-element
  const path = fieldPath && fieldPath.length > 0 ? fieldPath : [unescapedLeaf];

  const program = parseText(text);
  if (!program) return [];

  const ranges: Range[] = [];

  // variable name → "remaining intlayer path" represented by this variable
  // '' (root) entry would map to [] for `const v = useIntlayer('key')`
  const variableToRemainingPath = new Map<string, string[]>();

  // First pass: collect useIntlayer / getIntlayer variable assignments and
  // destructures, and emit ranges for direct/nested ObjectPattern matches.
  walkAst(program, (node): boolean | undefined => {
    if (node['type'] !== 'VariableDeclarator') return;

    const initializer = node['init'] as OxcNode | undefined;
    if (!initializer || !isIntlayerCall(initializer)) return;

    const dk = getFirstStringArg(initializer);
    if (dk !== dictionaryKey) return;

    const idNode = node['id'] as OxcNode | undefined;
    if (!idNode) return;

    if (idNode['type'] === 'Identifier') {
      // `const content = useIntlayer('key')` → root variable, remaining path []
      variableToRemainingPath.set(idNode['name'] as string, []);
    }

    if (idNode['type'] === 'ObjectPattern') {
      // Check if the target path is matched directly in the destructure pattern
      const range = findInObjectPattern(idNode, path, 0, text);
      if (range) ranges.push(range);

      // Collect destructured variables for the member-access pass
      collectDestructuredVariables(idNode, [], variableToRemainingPath);
    }
  });

  // Second pass: find member-access chains that, combined with the variable's
  // remaining path, equal the target path.
  walkAst(program, (node): boolean | undefined => {
    if (node['type'] !== 'MemberExpression') return;
    if (isComputedAccess(node)) return;

    const root = getChainRoot(node);
    if (!root) return;

    const remainingPath = variableToRemainingPath.get(root);
    if (remainingPath === undefined) return;

    const chain = getChainProperties(node);
    if (!chain) return;

    const fullPath = [...remainingPath, ...chain];
    if (fullPath.length !== path.length) return;
    if (!fullPath.every((segment, i) => segment === path[i])) return;

    // Highlight the last (leaf) property in the chain
    const leafPropertyNode = node['property'] as OxcNode;
    ranges.push(
      offsetToRange(
        text,
        leafPropertyNode['start'] as number,
        leafPropertyNode['end'] as number
      )
    );
  });

  return ranges;
};
