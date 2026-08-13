import type { Node as EsTreeNode } from 'estree';

/**
 * Minimal structural models for the nodes this plugin inspects that are not
 * part of the ESTree spec — JSX (all parsers) and the TypeScript-only wrapper
 * expressions emitted by `@typescript-eslint/parser`.
 *
 * They are declared here rather than imported from `@typescript-eslint/types`
 * so the plugin stays parser-agnostic: the same rules run under `espree`,
 * `@typescript-eslint/parser`, `vue-eslint-parser` and oxlint's JS plugin
 * bridge, none of which agree on a type package.
 */

/** Any AST node, whatever the parser. Narrowed through the guards below. */
export type AstNode = {
  type: string;
  [key: string]: unknown;
};

/** An AST node as ESLint hands it to a visitor — always linked to its parent. */
export type AstNodeWithParent = AstNode & {
  parent?: AstNodeWithParent;
};

/** `<div>Some text</div>` — the raw text between two JSX tags. */
export type JsxTextNode = AstNode & {
  type: 'JSXText';
  value: string;
};

/** `title="Some text"` on a JSX element. */
export type JsxAttributeNode = AstNode & {
  type: 'JSXAttribute';
  name: AstNode;
  value: AstNode | null;
};

/** The opening tag of a JSX element, holding its name and attributes. */
export type JsxOpeningElementNode = AstNode & {
  type: 'JSXOpeningElement';
  name: AstNode;
  attributes: AstNode[];
};

/**
 * TypeScript wrapper expressions that carry no runtime meaning. The Intlayer
 * compiler unwraps them before reading a value, so the rules must too —
 * `useIntlayer('home' as const)` is every bit as static as `useIntlayer('home')`.
 */
const TRANSPARENT_EXPRESSION_TYPES = new Set([
  'TSAsExpression',
  'TSSatisfiesExpression',
  'TSNonNullExpression',
  'TSTypeAssertion',
  'TSInstantiationExpression',
]);

/**
 * Strip TypeScript-only and parenthesised wrappers to reach the expression that
 * actually produces the value.
 *
 * @param node - Expression to unwrap; `null`/`undefined` passes straight through.
 */
export const unwrapExpression = <T extends AstNode>(
  node: T | null | undefined
): T | null => {
  let current: AstNode | null = node ?? null;

  while (
    current &&
    (TRANSPARENT_EXPRESSION_TYPES.has(current.type) ||
      current.type === 'ChainExpression')
  ) {
    current = (current['expression'] as AstNode | undefined) ?? null;
  }

  return (current as T | null) ?? null;
};

/**
 * Read the compile-time string value of an expression, or `null` when the value
 * can only be known at runtime.
 *
 * Deliberately does **not** resolve identifiers, even ones bound to a string
 * constant: the Babel/SWC passes read the argument node itself, so a value that
 * needs constant folding is a value the compiler will not see.
 *
 * @param node - Expression to evaluate.
 */
export const getStaticStringValue = (
  node: AstNode | null | undefined
): string | null => {
  const expression = unwrapExpression(node);

  if (!expression) return null;

  if (expression.type === 'Literal') {
    const value = expression['value'];

    return typeof value === 'string' ? value : null;
  }

  // A template literal is static only when it interpolates nothing.
  if (expression.type === 'TemplateLiteral') {
    const expressions = expression['expressions'] as unknown[] | undefined;
    const quasis = expression['quasis'] as AstNode[] | undefined;

    if (expressions?.length !== 0 || quasis?.length !== 1) return null;

    const cooked = (quasis[0]?.['value'] as { cooked?: string } | undefined)
      ?.cooked;

    return typeof cooked === 'string' ? cooked : null;
  }

  return null;
};

/**
 * Name of the function being called, plus whether it was reached as a method.
 *
 * `matchAsMethod` descriptors (`i18n.getFixedT(…)`, `intl.formatMessage(…)`)
 * only match the member form, so the two cases must stay distinguishable.
 *
 * @param callee - The `callee` of a CallExpression.
 */
export const getCalleeName = (
  callee: AstNode | null | undefined
): { name: string; isMethod: boolean } | null => {
  const expression = unwrapExpression(callee);

  if (!expression) return null;

  if (expression.type === 'Identifier') {
    return { name: expression['name'] as string, isMethod: false };
  }

  if (expression.type === 'MemberExpression' && !expression['computed']) {
    const property = expression['property'] as AstNode | undefined;

    if (property?.type === 'Identifier') {
      return { name: property['name'] as string, isMethod: true };
    }
  }

  return null;
};

/**
 * Read a string-valued property from an object-literal argument, e.g. the
 * `namespace` of `getTranslations({ namespace: 'home' })`.
 *
 * Returns the property's value node even when it is not static, so callers can
 * tell "absent" (`null`) from "present but dynamic" (a node, no string).
 *
 * @param node - The argument expected to be an object expression.
 * @param propertyName - Property to look up.
 */
export const getObjectPropertyValueNode = (
  node: AstNode | null | undefined,
  propertyName: string
): AstNode | null => {
  const expression = unwrapExpression(node);

  if (expression?.type !== 'ObjectExpression') return null;

  const properties = (expression['properties'] as AstNode[] | undefined) ?? [];

  for (const property of properties) {
    if (property.type !== 'Property') continue;

    const key = property['key'] as AstNode | undefined;
    const computed = property['computed'] === true;

    const keyName =
      key?.type === 'Identifier' && !computed
        ? (key['name'] as string)
        : key?.type === 'Literal'
          ? String(key['value'])
          : null;

    if (keyName === propertyName) {
      return (property['value'] as AstNode | undefined) ?? null;
    }
  }

  return null;
};

/**
 * Name of a JSX attribute, or `null` for spread attributes and namespaced
 * names the plugin does not target.
 *
 * @param attribute - A member of a JSX opening element's `attributes`.
 */
export const getJsxAttributeName = (
  attribute: AstNode | null | undefined
): string | null => {
  if (attribute?.type !== 'JSXAttribute') return null;

  const name = attribute['name'] as AstNode | undefined;

  return name?.type === 'JSXIdentifier' ? (name['name'] as string) : null;
};

/**
 * Value node of a JSX attribute, unwrapping `{'…'}` expression containers so
 * `title="Text"` and `title={'Text'}` are treated alike.
 *
 * @param attribute - A JSX attribute node.
 */
export const getJsxAttributeValueNode = (
  attribute: AstNode | null | undefined
): AstNode | null => {
  const value = (attribute?.['value'] as AstNode | undefined) ?? null;

  if (value?.type === 'JSXExpressionContainer') {
    return unwrapExpression((value['expression'] as AstNode) ?? null);
  }

  return value;
};

/**
 * Tag name of the JSX element an attribute or child belongs to, e.g. `'code'`
 * for `<code>`. Member and namespaced element names are joined with `.`.
 *
 * @param openingElement - A JSXOpeningElement node.
 */
export const getJsxElementName = (
  openingElement: AstNode | null | undefined
): string | null => {
  const readName = (node: AstNode | null | undefined): string | null => {
    if (!node) return null;

    if (node.type === 'JSXIdentifier') return node['name'] as string;

    if (node.type === 'JSXMemberExpression') {
      const object = readName(node['object'] as AstNode);
      const property = readName(node['property'] as AstNode);

      return object && property ? `${object}.${property}` : null;
    }

    return null;
  };

  return readName(openingElement?.['name'] as AstNode | undefined);
};

/** Narrow an ESLint visitor node to the loose {@link AstNode} shape. */
export const toAstNode = (node: EsTreeNode | AstNode): AstNodeWithParent =>
  node as unknown as AstNodeWithParent;
