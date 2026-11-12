import {
  createLocaleOrdering,
  type KeyOrdering,
  orderEnumerationConditions,
  orderPluralCategories,
  orderSelectCases,
} from './keyOrderings';

/**
 * Minimal shape shared by the Babel, TypeScript-ESTree, Acorn and JSON ASTs
 * Prettier produces. Only the fields this module reads are typed.
 */
export type AstNode = {
  type: string;
  [field: string]: unknown;
};

/** Content node types whose keys get sorted. */
type SortedNodeType = 'translation' | 'plural' | 'enumeration' | 'select';

/** Helper function name → content node type it declares. */
const NODE_TYPE_BY_FUNCTION_NAME: Record<string, SortedNodeType> = {
  t: 'translation',
  plural: 'plural',
  enu: 'enumeration',
  select: 'select',
};

const SORTED_NODE_TYPES = new Set<string>(
  Object.values(NODE_TYPE_BY_FUNCTION_NAME)
);

/** Fields never walked: positions, comments and back-references. */
const IGNORED_FIELDS = new Set([
  'loc',
  'range',
  'start',
  'end',
  'extra',
  'parent',
  'comments',
  'leadingComments',
  'trailingComments',
  'innerComments',
  'tokens',
]);

export const isAstNode = (value: unknown): value is AstNode =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as AstNode).type === 'string';

export const isObjectExpression = (node: unknown): node is AstNode =>
  isAstNode(node) && node.type === 'ObjectExpression';

const getStringLiteralValue = (node: unknown): string | undefined =>
  isAstNode(node) &&
  (node.type === 'StringLiteral' || node.type === 'Literal') &&
  typeof node.value === 'string'
    ? node.value
    : undefined;

const getNumericLiteralKey = (node: AstNode): string | undefined =>
  (node.type === 'NumericLiteral' || node.type === 'Literal') &&
  typeof node.value === 'number'
    ? String(node.value)
    : undefined;

/**
 * Static name of an object property key (`en`, `'en-GB'`, `2`), or
 * `undefined` when the key is computed.
 */
export const getStaticKeyName = (property: AstNode): string | undefined => {
  if (property.computed) return undefined;

  const key = property.key;

  if (!isAstNode(key)) return undefined;
  if (key.type === 'Identifier') return key.name as string;

  return getStringLiteralValue(key) ?? getNumericLiteralKey(key);
};

export const isPlainProperty = (property: unknown): property is AstNode =>
  isAstNode(property) &&
  (property.type === 'Property' || property.type === 'ObjectProperty') &&
  property.kind !== 'get' &&
  property.kind !== 'set' &&
  !property.method;

/**
 * Reorders the properties of a content map in place. Objects holding a
 * spread, a computed key or a method are left untouched: their order may be
 * meaningful.
 */
export const sortObjectProperties = (
  objectNode: AstNode,
  orderKeys: KeyOrdering
): void => {
  const properties = objectNode.properties;

  if (!Array.isArray(properties) || properties.length < 2) return;
  if (!properties.every(isPlainProperty)) return;

  const propertyByName = new Map<string, AstNode>();

  for (const property of properties) {
    const name = getStaticKeyName(property);

    if (name === undefined || propertyByName.has(name)) return;

    propertyByName.set(name, property);
  }

  const orderedNames = orderKeys([...propertyByName.keys()]);

  if (!orderedNames) return;

  objectNode.properties = orderedNames.map(
    (name) => propertyByName.get(name) as AstNode
  );
};

/** `t({...})`, `plural({...})`, `enu({...})`, `select({...})`, `x.t({...})`. */
export const getHelperCallContent = (
  node: AstNode
): { nodeType: SortedNodeType; content: AstNode } | undefined => {
  if (node.type !== 'CallExpression') return undefined;

  const callee = node.callee;

  if (!isAstNode(callee)) return undefined;

  const calleeName =
    callee.type === 'Identifier'
      ? callee.name
      : callee.type === 'MemberExpression' &&
          !callee.computed &&
          isAstNode(callee.property)
        ? callee.property.name
        : undefined;
  const nodeType =
    typeof calleeName === 'string'
      ? NODE_TYPE_BY_FUNCTION_NAME[calleeName]
      : undefined;
  const [firstArgument] = node.arguments as unknown[];

  if (!nodeType || !isObjectExpression(firstArgument)) return undefined;

  return { nodeType, content: firstArgument };
};

/**
 * `{ nodeType: 'plural', plural: {...} }`, the serialized form used by
 * `.content.json` files and the CMS.
 */
export const getSerializedNodeContent = (
  node: AstNode
): { nodeType: SortedNodeType; content: AstNode } | undefined => {
  if (!isObjectExpression(node)) return undefined;

  const properties = (node.properties as unknown[]).filter(isPlainProperty);
  const findPropertyValue = (name: string): unknown =>
    properties.find((property) => getStaticKeyName(property) === name)?.value;
  const nodeType = getStringLiteralValue(findPropertyValue('nodeType'));

  if (!nodeType || !SORTED_NODE_TYPES.has(nodeType)) return undefined;

  const content = findPropertyValue(nodeType);

  return isObjectExpression(content)
    ? { nodeType: nodeType as SortedNodeType, content }
    : undefined;
};

/**
 * Walks a Prettier AST and sorts, in place, the keys of every Intlayer
 * translation (locales), plural (CLDR categories), enumeration (thresholds)
 * and select (cases).
 */
export const sortContentNodesInAst = (
  rootNode: unknown,
  pinnedLocales: readonly string[]
): void => {
  const orderingByNodeType: Record<SortedNodeType, KeyOrdering> = {
    translation: createLocaleOrdering(pinnedLocales),
    plural: orderPluralCategories,
    enumeration: orderEnumerationConditions,
    select: orderSelectCases,
  };
  const visitedNodes = new WeakSet<object>();
  const pendingValues: unknown[] = [rootNode];

  while (pendingValues.length > 0) {
    const value = pendingValues.pop();

    if (typeof value !== 'object' || value === null) continue;
    if (visitedNodes.has(value)) continue;

    visitedNodes.add(value);

    if (Array.isArray(value)) {
      pendingValues.push(...value);
      continue;
    }

    if (isAstNode(value)) {
      const contentNode =
        getHelperCallContent(value) ?? getSerializedNodeContent(value);

      if (contentNode) {
        sortObjectProperties(
          contentNode.content,
          orderingByNodeType[contentNode.nodeType]
        );
      }
    }

    for (const [field, child] of Object.entries(value)) {
      if (!IGNORED_FIELDS.has(field)) pendingValues.push(child);
    }
  }
};
