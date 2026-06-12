import {
  GETTER_NAMESPACE_ARG_INDEX,
  getStringArgAt,
  isIntlayerCall,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';

/**
 * Detect when the cursor is on a key string inside a `t('key')` call where
 * `t` (or any alias) was obtained from a getter function.
 *
 * Handles all assignment forms:
 *   const t = useTranslations('ns');              t('field')
 *   const { t } = useTranslation('ns');           t('field')
 *   const { t, i18n } = useTranslation('about'); t('field')
 *   const { t: translate } = useTranslation('ns'); translate('field')
 *   const t = await getFixedT('en', 'ns');        t('field')  (namespace = 2nd arg)
 *
 * Returns null for useI18n (no positional namespace) and when the cursor is
 * not inside any recognised t-call's first argument.
 */
export const findTCallAtOffset = (
  text: string,
  offset: number
): { dictionaryKey: string; fieldName: string } | null => {
  const program = parseText(text);
  if (!program) return null;

  const tVarMap = new Map<string, string>(); // local variable name → dictionaryKey
  collectTVariables(program, tVarMap);

  if (tVarMap.size === 0) return null;

  return findTCallContainingOffset(program, tVarMap, offset);
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const unwrapAwait = (node: OxcNode | undefined): OxcNode | undefined =>
  node?.['type'] === 'AwaitExpression'
    ? (node['argument'] as OxcNode | undefined)
    : node;

/** Get the local binding name from a destructured property node. */
const getDestructuredLocalName = (prop: OxcNode): string | null => {
  // { t: myAlias } → value node holds the local name
  const valueNode = prop['value'] as OxcNode | undefined;
  if (valueNode?.['type'] === 'Identifier') return valueNode['name'] as string;
  // { t } shorthand → key node is also the local name
  const keyNode = prop['key'] as OxcNode | undefined;
  if (keyNode?.['type'] === 'Identifier') return keyNode['name'] as string;
  return null;
};

/**
 * Walk the AST and populate `tVarMap` with every variable that holds a
 * translation function derived from a recognised getter call.
 */
const collectTVariables = (
  program: OxcNode,
  tVarMap: Map<string, string>
): void => {
  walkAst(program, (node) => {
    if (node['type'] !== 'VariableDeclarator') return;

    const init = unwrapAwait(node['init'] as OxcNode | undefined);
    if (!init || !isIntlayerCall(init)) return;

    const callee = init['callee'] as OxcNode;
    const funcName = callee['name'] as string;
    const argIndex = GETTER_NAMESPACE_ARG_INDEX.get(funcName) ?? 0;
    if (argIndex < 0) return; // useI18n — no positional namespace to track

    const dictionaryKey = getStringArgAt(init, argIndex);
    if (!dictionaryKey) return;

    const id = node['id'] as OxcNode;

    // const t = useTranslations('ns')
    if (id['type'] === 'Identifier') {
      tVarMap.set(id['name'] as string, dictionaryKey);
      return;
    }

    // const { t, i18n } = useTranslation('ns')
    if (id['type'] === 'ObjectPattern') {
      for (const prop of (id['properties'] as OxcNode[]) ?? []) {
        const localName = getDestructuredLocalName(prop);
        if (localName) tVarMap.set(localName, dictionaryKey);
      }
    }
  });
};

/**
 * Find the first `tVar('field')` CallExpression whose span contains `offset`.
 */
const findTCallContainingOffset = (
  program: OxcNode,
  tVarMap: Map<string, string>,
  offset: number
): { dictionaryKey: string; fieldName: string } | null => {
  let result: { dictionaryKey: string; fieldName: string } | null = null;

  walkAst(program, (node) => {
    if (result) return true;
    if (node['type'] !== 'CallExpression') return;

    const callee = node['callee'] as OxcNode | undefined;
    if (callee?.['type'] !== 'Identifier') return;

    const dictionaryKey = tVarMap.get(callee['name'] as string);
    if (!dictionaryKey) return;

    const callStart = node['start'] as number;
    const callEnd = node['end'] as number;
    if (offset < callStart || offset > callEnd) return;

    const fieldName = getStringArgAt(node, 0);
    if (!fieldName) return;

    result = { dictionaryKey, fieldName };
    return true;
  });

  return result;
};
