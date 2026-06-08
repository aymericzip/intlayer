import {
  getFirstStringArg,
  isIntlayerCall,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';

/**
 * Detect when the cursor is on a field name that was obtained from a
 * useIntlayer / getIntlayer call in the same file.  Two patterns:
 *
 *   Pattern 1 — destructuring:
 *     const { localeSwitcherLabel } = useIntlayer("locale-switcher")
 *                ^^^^^^^^^^^^^^^^^^  ← cursor here
 *
 *   Pattern 2 — member access:
 *     const t = useIntlayer("locale-switcher")
 *     t.localeSwitcherLabel              ← cursor on the property
 *
 * Returns { dictionaryKey, fieldName } when matched, null otherwise.
 */
export const findUsageFieldAtOffset = (
  text: string,
  offset: number
): { dictionaryKey: string; fieldName: string } | null => {
  const program = parseText(text);
  if (!program) return null;

  // Map: variable name → dictionary key  (for member-access look-up)
  const variableToDictionaryKeyMap = new Map<string, string>();
  let result: { dictionaryKey: string; fieldName: string } | null = null;

  // Single pass: collect variable→key assignments AND check destructure spans
  walkAst(program, (node) => {
    if (result) return true;
    if (node['type'] !== 'VariableDeclarator') return;

    const initializer = node['init'] as OxcNode | undefined;
    if (!initializer || !isIntlayerCall(initializer)) return;

    const dictionaryKey = getFirstStringArg(initializer);
    if (!dictionaryKey) return;

    const identifierNode = node['id'] as OxcNode | undefined;
    if (!identifierNode) return;

    // Pattern 1: ObjectPattern destructure  →  { field } = useIntlayer("key")
    if (identifierNode['type'] === 'ObjectPattern') {
      for (const propertyNode of (identifierNode['properties'] as OxcNode[]) ??
        []) {
        const keyNode = propertyNode['key'] as OxcNode | undefined;
        if (!keyNode) continue;
        const keyStart = keyNode['start'] as number;
        const keyEnd = keyNode['end'] as number;
        if (offset >= keyStart && offset <= keyEnd) {
          result = {
            dictionaryKey: dictionaryKey,
            fieldName: keyNode['name'] as string,
          };
          return true;
        }
      }
    }

    // Record simple Identifier assignments for Pattern 2
    if (identifierNode['type'] === 'Identifier') {
      variableToDictionaryKeyMap.set(
        identifierNode['name'] as string,
        dictionaryKey
      );
    }
  });

  if (result) return result;

  // Pattern 2: MemberExpression  →  variableName.field  where variableName = useIntlayer("key")
  walkAst(program, (node) => {
    if (result) return true;
    if (node['type'] !== 'MemberExpression') return;

    const propertyNode = node['property'] as OxcNode | undefined;
    if (!propertyNode) return;
    const propertyStart = propertyNode['start'] as number;
    const propertyEnd = propertyNode['end'] as number;
    if (offset < propertyStart || offset > propertyEnd) return;

    const objectNode = node['object'] as OxcNode | undefined;
    if (objectNode?.['type'] !== 'Identifier') return;
    const variableName = objectNode['name'] as string;
    const dictionaryKey = variableToDictionaryKeyMap.get(variableName);
    if (!dictionaryKey) return;

    result = {
      dictionaryKey: dictionaryKey,
      fieldName: propertyNode['name'] as string,
    };
    return true;
  });

  return result;
};
