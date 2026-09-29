import type { NodePath } from '@babel/core';
import type * as BabelTypes from '@babel/types';

/**
 * Static-value readers shared by every pass that has to decide, at build time,
 * which dictionary a call site reads.
 *
 * They were previously duplicated — with small behavioural drifts — between
 * `babel-plugin-intlayer-optimize` and `babel-plugin-intlayer-usage-analyzer`.
 * Both now read through this module so a call site the analyser can attribute
 * is exactly the one the optimizer can rewrite.
 */

/**
 * Reads a fully-static string from an AST node. Returns `undefined` for
 * dynamic values (identifiers, expressions, template literals with
 * interpolations, …).
 */
export const readStaticString = (
  babelTypes: typeof BabelTypes,
  node: BabelTypes.Node | null | undefined
): string | undefined => {
  if (!node) return undefined;
  if (babelTypes.isStringLiteral(node)) return node.value;
  if (
    babelTypes.isTemplateLiteral(node) &&
    node.expressions.length === 0 &&
    node.quasis.length === 1
  ) {
    return node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw;
  }
  return undefined;
};

/** Returns the first dot-path segment of a key, e.g. `'a.b.c'` → `'a'`. */
export const firstPathSegment = (path: string): string =>
  path.split('.')[0] ?? path;

/**
 * Reads the static first dot-path segment from a message-id node.
 *
 *   t('counter.label')      → 'counter'
 *   t(`counter.${x}`)       → 'counter'   (static prefix before the first dot)
 *   t(`${x}.label`)         → undefined   (dynamic first segment)
 *   t(someVariable)         → undefined
 */
export const readStaticFirstSegment = (
  babelTypes: typeof BabelTypes,
  node: BabelTypes.Node | null | undefined
): string | undefined => {
  const staticString = readStaticString(babelTypes, node);
  if (staticString !== undefined) return firstPathSegment(staticString);

  // Template literal whose first quasi already contains the dot delimiter, e.g.
  // `counter.${index}` → the leading `counter` segment is statically known.
  if (babelTypes.isTemplateLiteral(node) && node.quasis.length > 0) {
    const firstQuasi =
      node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw;
    if (firstQuasi?.includes('.')) {
      return firstPathSegment(firstQuasi);
    }
  }
  return undefined;
};

/** Whether an object-property key (identifier or string literal) reads as `name`. */
export const propertyKeyMatches = (
  babelTypes: typeof BabelTypes,
  property: BabelTypes.ObjectProperty,
  name: string
): boolean =>
  (babelTypes.isIdentifier(property.key) && property.key.name === name) ||
  (babelTypes.isStringLiteral(property.key) && property.key.value === name);

/**
 * Returns the `ObjectProperty` named `propertyName`, or `undefined` when the
 * object has no such property. Callers that need to mutate the property in
 * place (rewriting or deleting it) use this rather than a value reader.
 */
export const findObjectProperty = (
  babelTypes: typeof BabelTypes,
  objectExpression: BabelTypes.ObjectExpression,
  propertyName: string
): BabelTypes.ObjectProperty | undefined => {
  for (const property of objectExpression.properties) {
    if (!babelTypes.isObjectProperty(property)) continue;
    if (propertyKeyMatches(babelTypes, property, propertyName)) return property;
  }
  return undefined;
};

/**
 * Marker returned by the reader helpers when the requested property or
 * argument is simply absent — distinct from present-but-dynamic, which the
 * callers must treat conservatively.
 */
export const ABSENT_VALUE = '__default__' as const;

/** Either a statically-known value, {@link ABSENT_VALUE}, or `undefined` (dynamic). */
export type StaticOrAbsent<T> = T | typeof ABSENT_VALUE | undefined;

/**
 * Reads a static string property from an object expression. Returns
 * {@link ABSENT_VALUE} when the property is absent and `undefined` when
 * present but dynamic.
 */
export const readObjectProperty = (
  babelTypes: typeof BabelTypes,
  objectExpression: BabelTypes.ObjectExpression,
  propertyName: string
): StaticOrAbsent<string> => {
  const property = findObjectProperty(
    babelTypes,
    objectExpression,
    propertyName
  );
  if (!property) return ABSENT_VALUE;
  return readStaticString(babelTypes, property.value); // present but dynamic → undefined
};

/**
 * Returns the value *node* of a named property, so callers can apply their own
 * reader to it (a full static string, or just its leading path segment).
 * Returns {@link ABSENT_VALUE} when the property is absent.
 */
export const readObjectPropertyNode = (
  babelTypes: typeof BabelTypes,
  objectExpression: BabelTypes.ObjectExpression,
  propertyName: string
): StaticOrAbsent<BabelTypes.Node> => {
  const property = findObjectProperty(
    babelTypes,
    objectExpression,
    propertyName
  );
  if (!property) return ABSENT_VALUE;
  return property.value;
};

/**
 * Reads a named JSX attribute as a static string and returns it wrapped in a
 * `StringLiteral` node so the result can be fed to the same namespace resolver
 * as a call argument. Handles both `id="home.title"` and `id={'home.title'}`.
 * Returns `undefined` when the attribute is absent or dynamic (`id={expr}`).
 */
export const readJsxAttributeString = (
  babelTypes: typeof BabelTypes,
  openingElement: BabelTypes.JSXOpeningElement,
  attributeName: string
): BabelTypes.StringLiteral | undefined => {
  for (const attribute of openingElement.attributes) {
    if (!babelTypes.isJSXAttribute(attribute)) continue;
    if (
      !babelTypes.isJSXIdentifier(attribute.name) ||
      attribute.name.name !== attributeName
    ) {
      continue;
    }

    const value = attribute.value;
    // id="home.title"
    if (babelTypes.isStringLiteral(value)) return value;
    // id={'home.title'} / id={`home.title`}
    if (babelTypes.isJSXExpressionContainer(value)) {
      const staticString = readStaticString(babelTypes, value.expression);
      if (staticString !== undefined) {
        return babelTypes.stringLiteral(staticString);
      }
    }
    return undefined; // attribute present but dynamic
  }
  return undefined; // attribute absent
};

/**
 * Splits a compat namespace at the first `.` to separate the dictionary key
 * from an optional key prefix, mirroring the SWC plugin's `split_namespace`.
 *
 *   `'about'`         → `{ dictionaryKey: 'about', keyPrefix: '' }`
 *   `'about.counter'` → `{ dictionaryKey: 'about', keyPrefix: 'counter' }`
 */
export const splitNamespace = (
  namespace: string
): { dictionaryKey: string; keyPrefix: string } => {
  const dotPosition = namespace.indexOf('.');
  if (dotPosition === -1) return { dictionaryKey: namespace, keyPrefix: '' };
  return {
    dictionaryKey: namespace.slice(0, dotPosition),
    keyPrefix: namespace.slice(dotPosition + 1),
  };
};

/**
 * Climbs past an enclosing `await` expression so that
 * `const t = await getTranslations('ns')` — or `await getIntlayerAsync('key')`
 * — is resolved to its variable declarator the same way the synchronous form
 * is.
 */
export const unwrapAwait = (
  babelTypes: typeof BabelTypes,
  path: NodePath<BabelTypes.Node>
): NodePath<BabelTypes.Node> => {
  const parentPath = path.parentPath;
  if (parentPath && babelTypes.isAwaitExpression(parentPath.node)) {
    return parentPath;
  }
  return path;
};

/**
 * Returns `true` when `node` wraps `innerNode` without changing its runtime
 * value: TypeScript casts (`as`, `satisfies`, `!`, `<T>x`) and parentheses.
 */
const isTransparentWrapper = (
  babelTypes: typeof BabelTypes,
  node: BabelTypes.Node,
  innerNode: BabelTypes.Node
): boolean =>
  (babelTypes.isTSAsExpression(node) ||
    babelTypes.isTSSatisfiesExpression(node) ||
    babelTypes.isTSNonNullExpression(node) ||
    babelTypes.isTSTypeAssertion(node) ||
    babelTypes.isParenthesizedExpression(node)) &&
  node.expression === innerNode;

/**
 * Climbs past every enclosing value-preserving wrapper (see
 * {@link isTransparentWrapper}), so `(content.field as any).sub` is walked the
 * same way as `content.field.sub`.
 */
export const skipTransparentWrappers = (
  babelTypes: typeof BabelTypes,
  path: NodePath<BabelTypes.Node>
): NodePath<BabelTypes.Node> => {
  let currentPath = path;
  while (
    currentPath.parentPath &&
    isTransparentWrapper(
      babelTypes,
      currentPath.parentPath.node,
      currentPath.node
    )
  ) {
    currentPath = currentPath.parentPath;
  }
  return currentPath;
};

/** Climbs past wrappers and an `await`, in any nesting order. */
const skipWrappersAndAwait = (
  babelTypes: typeof BabelTypes,
  path: NodePath<BabelTypes.Node>
): NodePath<BabelTypes.Node> =>
  skipTransparentWrappers(
    babelTypes,
    unwrapAwait(babelTypes, skipTransparentWrappers(babelTypes, path))
  );

/**
 * Returns `true` for `Promise.all(…)`. `allSettled` is excluded on purpose: it
 * wraps each value in `{ status, value }`.
 */
const isPromiseAllCall = (
  babelTypes: typeof BabelTypes,
  node: BabelTypes.Node
): node is BabelTypes.CallExpression =>
  babelTypes.isCallExpression(node) &&
  babelTypes.isMemberExpression(node.callee) &&
  !node.callee.computed &&
  babelTypes.isIdentifier(node.callee.object, { name: 'Promise' }) &&
  babelTypes.isIdentifier(node.callee.property, { name: 'all' });

/** How the value of a content-producing expression is consumed. */
export type ContentRootResolution =
  /** Consumed inline — inspect `rootPath.parent` (member access, argument…). */
  | { kind: 'expression'; rootPath: NodePath<BabelTypes.Node> }
  /** Stored into a local binding (`const x = …` / `const { a } = …`). */
  | {
      kind: 'binding';
      rootPath: NodePath<BabelTypes.Node>;
      bindingTarget: BabelTypes.Identifier | BabelTypes.ObjectPattern;
    }
  /** Skipped by an array-pattern hole (`const [, b] = await Promise.all(…)`). */
  | { kind: 'discarded' };

/**
 * Resolves where the content returned by `path` (a `useIntlayer('key')` call
 * or any expression evaluating to the same content) ends up.
 *
 * Looks through TypeScript casts, parentheses and `await`, and through
 * `const [a, { b }] = await Promise.all([getIntlayerAsync('x'), …])`, where the
 * array-pattern element at the call's index is the binding target.
 *
 * Both the usage analyser and the field renamer resolve roots through this
 * function, so every shape the analyser tracks is one the renamer rewrites.
 */
export const resolveContentRoot = (
  babelTypes: typeof BabelTypes,
  path: NodePath<BabelTypes.Node>
): ContentRootResolution => {
  const rootPath = skipWrappersAndAwait(babelTypes, path);
  const parentNode = rootPath.parent;

  if (
    babelTypes.isVariableDeclarator(parentNode) &&
    parentNode.init === rootPath.node &&
    (babelTypes.isIdentifier(parentNode.id) ||
      babelTypes.isObjectPattern(parentNode.id))
  ) {
    return { kind: 'binding', rootPath, bindingTarget: parentNode.id };
  }

  // const [a, b] = await Promise.all([getIntlayerAsync('a'), …])
  const promiseAllPath = rootPath.parentPath?.parentPath;
  if (
    !babelTypes.isArrayExpression(parentNode) ||
    !promiseAllPath ||
    !isPromiseAllCall(babelTypes, promiseAllPath.node) ||
    promiseAllPath.node.arguments[0] !== parentNode
  ) {
    return { kind: 'expression', rootPath };
  }

  const promiseAllRootPath = skipWrappersAndAwait(babelTypes, promiseAllPath);
  const declaratorNode = promiseAllRootPath.parent;
  if (
    !babelTypes.isVariableDeclarator(declaratorNode) ||
    declaratorNode.init !== promiseAllRootPath.node ||
    !babelTypes.isArrayPattern(declaratorNode.id)
  ) {
    return { kind: 'expression', rootPath };
  }

  const elementIndex = parentNode.elements.indexOf(
    rootPath.node as BabelTypes.Expression
  );
  const patternElements = declaratorNode.id.elements;

  // A preceding spread in the input, or a rest element at or before this
  // index in the pattern, makes the position ambiguous.
  const hasSpreadBefore = parentNode.elements
    .slice(0, elementIndex)
    .some((element) => babelTypes.isSpreadElement(element));
  const hasRestUpTo = patternElements
    .slice(0, elementIndex + 1)
    .some((element) => babelTypes.isRestElement(element));
  if (hasSpreadBefore || hasRestUpTo) return { kind: 'expression', rootPath };

  const patternElement = patternElements[elementIndex];
  if (!patternElement) return { kind: 'discarded' };

  // A default value ([a = fallback]) wraps the actual binding target.
  const bindingTarget = babelTypes.isAssignmentPattern(patternElement)
    ? patternElement.left
    : patternElement;

  if (
    babelTypes.isIdentifier(bindingTarget) ||
    babelTypes.isObjectPattern(bindingTarget)
  ) {
    return { kind: 'binding', rootPath, bindingTarget };
  }

  return { kind: 'expression', rootPath };
};

/**
 * Returns `true` when the value at `path` is only tested, never read: `!x`,
 * `typeof x`, `if (x)`, `x ? … : …`, `x && …`, `x === y`. Such uses expose no
 * key names, so they neither block pruning nor make a field opaque.
 */
export const isTestOnlyUse = (
  babelTypes: typeof BabelTypes,
  path: NodePath<BabelTypes.Node>
): boolean => {
  const parentNode = path.parent;
  const node = path.node;

  if (babelTypes.isUnaryExpression(parentNode)) {
    return parentNode.operator === '!' || parentNode.operator === 'typeof';
  }
  if (
    babelTypes.isIfStatement(parentNode) ||
    babelTypes.isWhileStatement(parentNode) ||
    babelTypes.isDoWhileStatement(parentNode) ||
    babelTypes.isConditionalExpression(parentNode)
  ) {
    return parentNode.test === node;
  }
  if (babelTypes.isForStatement(parentNode)) return parentNode.test === node;
  // `x && y` yields x only when it is falsy — a value without keys.
  if (babelTypes.isLogicalExpression(parentNode)) {
    return parentNode.operator === '&&' && parentNode.left === node;
  }
  if (babelTypes.isBinaryExpression(parentNode)) {
    return ['===', '!==', '==', '!='].includes(parentNode.operator);
  }
  return false;
};
