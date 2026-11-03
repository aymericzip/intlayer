import { orderAlphabetically } from './keyOrderings';
import {
  type AstNode,
  getHelperCallContent,
  getSerializedNodeContent,
  getStaticKeyName,
  isAstNode,
  isObjectExpression,
  isPlainProperty,
  sortObjectProperties,
} from './sortContentNodes';

/** `*.content.ts`, `*.content.json`, … — the Intlayer declaration files. */
const CONTENT_FILE_PATTERN = /\.content\.(?:[cm]?[jt]sx?|json5?|jsonc)$/;

/** Expression wrappers looked through: `x as T`, `x satisfies T`, `(x)`, `x!`. */
const EXPRESSION_WRAPPER_TYPES = new Set([
  'TSAsExpression',
  'TSSatisfiesExpression',
  'TSNonNullExpression',
  'TSTypeAssertion',
  'TypeCastExpression',
  'ParenthesizedExpression',
]);

/** True when Prettier is formatting an Intlayer content declaration file. */
export const isContentFile = (filePath: string | undefined): boolean =>
  typeof filePath === 'string' && CONTENT_FILE_PATTERN.test(filePath);

const getPropertyValues = (objectNode: AstNode): unknown[] =>
  (objectNode.properties as unknown[])
    .filter(isPlainProperty)
    .map((property) => property.value);

/**
 * Sorts a content value alphabetically, recursing through nested objects,
 * arrays and the arguments of every helper call. The maps of `t()` /
 * `plural()` / `enu()` / `select()` keep their own ordering; the argument
 * objects of other helpers keep theirs.
 */
const sortContentValue = (value: unknown): void => {
  if (!isAstNode(value)) return;

  if (EXPRESSION_WRAPPER_TYPES.has(value.type)) {
    sortContentValue(value.expression);
    return;
  }

  if (value.type === 'ArrayExpression') {
    for (const element of value.elements as unknown[]) {
      sortContentValue(element);
    }
    return;
  }

  const helperContent =
    getHelperCallContent(value) ?? getSerializedNodeContent(value);

  if (helperContent) {
    for (const nestedValue of getPropertyValues(helperContent.content)) {
      sortContentValue(nestedValue);
    }
    return;
  }

  // Any other helper (`cond`, `gender`, `md`, `insert`, `nest`, `file`, …):
  // its argument object may carry a meaningful key order (the last `cond` /
  // `gender` key is the fallback), so only the values inside are sorted.
  if (value.type === 'CallExpression') {
    for (const argument of value.arguments as unknown[]) {
      if (isObjectExpression(argument)) {
        for (const nestedValue of getPropertyValues(argument)) {
          sortContentValue(nestedValue);
        }
      } else {
        sortContentValue(argument);
      }
    }
    return;
  }

  if (!isObjectExpression(value)) return;

  // An unknown serialized node (`{ nodeType: 'condition', … }`) is not a plain
  // content object: its fields are not reordered.
  const isSerializedNode = (value.properties as unknown[]).some(
    (property) =>
      isPlainProperty(property) && getStaticKeyName(property) === 'nodeType'
  );

  if (!isSerializedNode) sortObjectProperties(value, orderAlphabetically);

  for (const nestedValue of getPropertyValues(value)) {
    sortContentValue(nestedValue);
  }
};

/**
 * The `content` of a dictionary declaration: an object holding both a `key`
 * and a `content` property.
 */
const getDictionaryContent = (node: AstNode): unknown => {
  if (!isObjectExpression(node)) return undefined;

  const properties = (node.properties as unknown[]).filter(isPlainProperty);
  const findProperty = (name: string) =>
    properties.find((property) => getStaticKeyName(property) === name);

  if (!findProperty('key')) return undefined;

  return findProperty('content')?.value;
};

/**
 * Sorts, in place, the keys of every dictionary `content` object of the AST,
 * and of their nested objects, alphabetically.
 */
export const sortContentKeysInAst = (rootNode: unknown): void => {
  const visitedNodes = new WeakSet<object>();
  const pendingValues: unknown[] = [rootNode];

  while (pendingValues.length > 0) {
    const value = pendingValues.pop();

    if (typeof value !== 'object' || value === null) continue;
    if (visitedNodes.has(value)) continue;

    visitedNodes.add(value);

    if (isAstNode(value)) {
      const dictionaryContent = getDictionaryContent(value);

      if (dictionaryContent) {
        sortContentValue(dictionaryContent);
        continue;
      }
    }

    for (const [field, child] of Object.entries(value)) {
      if (field !== 'loc' && field !== 'range' && field !== 'parent') {
        pendingValues.push(child);
      }
    }
  }
};
