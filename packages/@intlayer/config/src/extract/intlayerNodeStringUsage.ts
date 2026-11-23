/**
 * Detection of Intlayer nodes used where a string is expected.
 *
 * Every framework adapter wraps a string leaf of a dictionary in an
 * `IntlayerNode`. With the editor disabled the node type is `T & { value: T }`,
 * so `alt={content.title}` type-checks. With `editor.enabled: true` it becomes
 * `ReactNode & { value: T }` (or the framework's equivalent: `JSX.Element`,
 * `VNode`, `VNodeChild`, a Svelte component, a renderer function), which is no
 * longer assignable to `string` nor carries string methods. `.value` holds the
 * primitive in both modes, so reading it is always correct.
 *
 * Template literals, `+` concatenation and `String()` accept any type, so they
 * type-check in both modes and are not reported.
 *
 * The helpers below are AST-agnostic: they run on ESTree (ESLint, oxlint,
 * Prettier's TypeScript/Acorn/Meriyah parsers), Babel (Prettier's Babel parser),
 * and the template ASTs of `vue-eslint-parser` / `svelte-eslint-parser`. Callers
 * provide the ancestor chain, so no parent pointers are required.
 */

/** Any AST node, whatever the parser. */
export type IntlayerNodeAstNode = {
  type: string;
  [field: string]: unknown;
};

/** Where an Intlayer node is consumed as a string. */
export type IntlayerNodeStringContext = 'string-method' | 'attribute';

/** A field read that must go through `.value`. */
export type IntlayerNodeStringUsage = {
  /** Outermost node of the field chain; `.value` is appended after it. */
  chainEnd: IntlayerNodeAstNode;
  /** How the node is consumed. */
  context: IntlayerNodeStringContext;
};

/** A `.value` read rendering the primitive where the node itself renders. */
export type IntlayerNodeRedundantValue = {
  /** The field chain; the fix replaces `valueAccess` by it. */
  chainEnd: IntlayerNodeAstNode;
  /** The `chainEnd.value` member expression. */
  valueAccess: IntlayerNodeAstNode;
};

/** Variables bound from an Intlayer getter call. */
export type IntlayerNodeBindingNames = {
  /** Bound to the whole dictionary (`const content = useIntlayer('x')`). */
  rootNames: string[];
  /** Destructured fields, possibly leaves (`const { title } = …`). */
  leafNames: string[];
};

/**
 * Packages whose getters wrap string leaves in an `IntlayerNode`. Subpaths
 * (`next-intlayer/server`, `react-intlayer/server`…) are included.
 *
 * Absent on purpose: `intlayer` / `@intlayer/core` and the server adapters
 * (express, fastify…), whose getters return primitives, and `remix-intlayer`,
 * which keeps plain strings as primitives.
 */
export const INTLAYER_NODE_PACKAGES = [
  'react-intlayer',
  'next-intlayer',
  'preact-intlayer',
  'solid-intlayer',
  'react-native-intlayer',
  'vue-intlayer',
  'nuxt-intlayer',
  'svelte-intlayer',
  'angular-intlayer',
  'lit-intlayer',
  'vanilla-intlayer',
  'astro-intlayer',
] as const;

/**
 * Packages whose nodes render as JSX children: `<h1>{content.title}</h1>`
 * renders the node (selectable by the visual editor), where
 * `content.title.value` renders a bare string.
 */
export const INTLAYER_JSX_NODE_PACKAGES = [
  'react-intlayer',
  'next-intlayer',
  'preact-intlayer',
  'solid-intlayer',
  'react-native-intlayer',
] as const;

/** Getters returning dictionary content built from Intlayer nodes. */
export const INTLAYER_NODE_GETTERS = [
  'useIntlayer',
  'getIntlayer',
  'useDictionary',
  'getDictionary',
  'useDictionaryAsync',
  'useDictionaryDynamic',
] as const;

/**
 * Members of the node itself rather than dictionary fields. A chain reaching
 * one of them already reads the primitive (or deliberately the node).
 */
const INTLAYER_NODE_MEMBERS = new Set([
  'value',
  'raw',
  'render',
  'use',
  'toString',
  'valueOf',
]);

/**
 * `String.prototype` methods absent from `Array.prototype`, so calling one on a
 * field proves the field is read as a string.
 */
const STRING_ONLY_METHODS = new Set([
  'charAt',
  'charCodeAt',
  'codePointAt',
  'endsWith',
  'localeCompare',
  'match',
  'matchAll',
  'normalize',
  'padEnd',
  'padStart',
  'repeat',
  'replace',
  'replaceAll',
  'search',
  'split',
  'startsWith',
  'substring',
  'toLocaleLowerCase',
  'toLocaleUpperCase',
  'toLowerCase',
  'toUpperCase',
  'trim',
  'trimEnd',
  'trimStart',
]);

/** Attributes of a native element that accept something other than a string. */
const NON_STRING_ATTRIBUTES = new Set([
  'children',
  'class',
  'dangerouslySetInnerHTML',
  'ref',
  'style',
]);

/** Expression wrappers that do not change what the value is used for. */
const TRANSPARENT_WRAPPERS = new Set([
  'ChainExpression',
  'ParenthesizedExpression',
  'TSNonNullExpression',
]);

/** Expression wrappers around a getter call (`await`, TypeScript casts). */
const CALL_WRAPPERS = new Set([
  'AwaitExpression',
  'ParenthesizedExpression',
  'TSAsExpression',
  'TSNonNullExpression',
  'TSSatisfiesExpression',
]);

/** Identifier-like nodes across ESTree, JSX, Vue and Svelte ASTs. */
const NAME_NODE_TYPES = new Set([
  'Identifier',
  'JSXIdentifier',
  'SvelteName',
  'VIdentifier',
]);

const MEMBER_TYPES = new Set(['MemberExpression', 'OptionalMemberExpression']);

const CALL_TYPES = new Set(['CallExpression', 'OptionalCallExpression']);

const isNode = (value: unknown): value is IntlayerNodeAstNode =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as IntlayerNodeAstNode).type === 'string';

/**
 * True for an import of a package that produces Intlayer nodes.
 *
 * @param source - Module specifier, e.g. `'next-intlayer/server'`.
 */
export const isIntlayerNodePackage = (source: string): boolean =>
  INTLAYER_NODE_PACKAGES.some(
    (packageName) =>
      source === packageName || source.startsWith(`${packageName}/`)
  );

/**
 * True for an import of a package whose nodes render as JSX children.
 *
 * @param source - Module specifier, e.g. `'next-intlayer/server'`.
 */
export const isIntlayerJsxNodePackage = (source: string): boolean =>
  INTLAYER_JSX_NODE_PACKAGES.some(
    (packageName) =>
      source === packageName || source.startsWith(`${packageName}/`)
  );

/** Name of an identifier or string-literal node. */
const readName = (node: unknown): string | null => {
  if (!isNode(node)) return null;

  if (NAME_NODE_TYPES.has(node.type)) {
    return typeof node.name === 'string' ? node.name : null;
  }

  if (
    (node.type === 'Literal' || node.type === 'StringLiteral') &&
    typeof node.value === 'string'
  ) {
    return node.value;
  }

  return null;
};

/**
 * Local names of the Intlayer getters a module imports, aliases included
 * (`import { useIntlayer as useContent } from 'react-intlayer'`).
 *
 * @param program - Program node (ESTree or Babel).
 * @param isPackageIncluded - Which import sources count; every node package
 *   by default, {@link isIntlayerJsxNodePackage} for JSX-renderable nodes.
 */
export const getIntlayerNodeGetterNames = (
  program: IntlayerNodeAstNode,
  isPackageIncluded: (source: string) => boolean = isIntlayerNodePackage
): Set<string> => {
  const getterNames = new Set<string>();
  const getters = new Set<string>(INTLAYER_NODE_GETTERS);
  const body = Array.isArray(program.body) ? program.body : [];
  // Svelte nests the module statements inside `<script>` elements.
  const statements = body.flatMap((statement: unknown) =>
    isNode(statement) &&
    statement.type === 'SvelteScriptElement' &&
    Array.isArray(statement.body)
      ? statement.body
      : [statement]
  );

  for (const statement of statements) {
    if (!isNode(statement) || statement.type !== 'ImportDeclaration') continue;

    const source = readName(statement.source);

    if (!source || !isPackageIncluded(source)) continue;

    if (statement.importKind === 'type') continue;

    const specifiers = Array.isArray(statement.specifiers)
      ? statement.specifiers
      : [];

    for (const specifier of specifiers) {
      if (!isNode(specifier) || specifier.type !== 'ImportSpecifier') continue;

      const importedName = readName(specifier.imported);
      const localName = readName(specifier.local);

      if (importedName && localName && getters.has(importedName)) {
        getterNames.add(localName);
      }
    }
  }

  return getterNames;
};

/** Collect the identifiers an object pattern binds. */
const collectPatternNames = (
  pattern: unknown,
  names: IntlayerNodeBindingNames
): void => {
  if (!isNode(pattern)) return;

  if (pattern.type === 'Identifier') {
    const name = readName(pattern);

    if (name) names.leafNames.push(name);

    return;
  }

  if (pattern.type === 'AssignmentPattern') {
    collectPatternNames(pattern.left, names);

    return;
  }

  if (pattern.type === 'RestElement') {
    // A rest element holds the remaining fields as an object.
    const name = readName(pattern.argument);

    if (name) names.rootNames.push(name);

    return;
  }

  if (pattern.type !== 'ObjectPattern') return;

  const properties = Array.isArray(pattern.properties)
    ? pattern.properties
    : [];

  for (const property of properties) {
    if (!isNode(property)) continue;

    if (property.type === 'RestElement') {
      collectPatternNames(property, names);
      continue;
    }

    collectPatternNames(property.value, names);
  }
};

/**
 * Names a variable declarator binds from an Intlayer getter call, or `null`
 * when its initializer is not one.
 *
 * @param declarator - A `VariableDeclarator` node.
 * @param getterNames - Result of {@link getIntlayerNodeGetterNames}.
 */
export const getIntlayerNodeBindingNames = (
  declarator: IntlayerNodeAstNode,
  getterNames: ReadonlySet<string>
): IntlayerNodeBindingNames | null => {
  let initializer = declarator.init;

  while (isNode(initializer) && CALL_WRAPPERS.has(initializer.type)) {
    initializer = initializer.argument ?? initializer.expression;
  }

  if (!isNode(initializer) || !CALL_TYPES.has(initializer.type)) return null;

  const calleeName = readName(initializer.callee);

  if (!calleeName || !getterNames.has(calleeName)) return null;

  const names: IntlayerNodeBindingNames = { rootNames: [], leafNames: [] };
  const pattern = declarator.id;

  if (isNode(pattern) && pattern.type === 'Identifier') {
    const name = readName(pattern);

    if (name) names.rootNames.push(name);

    return names;
  }

  collectPatternNames(pattern, names);

  return names;
};

/** Property name of a member access, `null` when computed from a variable. */
const getStaticPropertyName = (member: IntlayerNodeAstNode): string | null => {
  if (member.computed !== true) return readName(member.property);

  const property = member.property;

  if (
    isNode(property) &&
    (property.type === 'Literal' || property.type === 'NumericLiteral') &&
    typeof property.value === 'number'
  ) {
    return String(property.value);
  }

  // `content[key]` reads a variable, not a field named `key`.
  return isNode(property) && !NAME_NODE_TYPES.has(property.type)
    ? readName(property)
    : null;
};

/** True for a native element name (`div`), false for components and custom elements. */
const isNativeElementName = (name: string | null): boolean =>
  name !== null && /^[a-z][a-z0-9]*$/u.test(name);

/** True when an attribute of a native element expects a string. */
const isStringAttribute = (name: string | null): boolean =>
  name !== null &&
  !NON_STRING_ATTRIBUTES.has(name) &&
  !/^on[A-Z:-]/u.test(name);

/** Tag name of a JSX opening element. */
const readJsxElementName = (openingElement: unknown): string | null =>
  isNode(openingElement) ? readName(openingElement.name) : null;

/**
 * How an expression is consumed, when the consumer requires a string.
 *
 * @param node - The expression (end of a field chain, wrappers stripped).
 * @param ancestors - Ancestors of `node`, nearest first.
 */
const detectStringContext = (
  node: IntlayerNodeAstNode,
  ancestors: readonly IntlayerNodeAstNode[]
): IntlayerNodeStringContext | null => {
  const [parent, grandParent, greatGrandParent, greatGreatGrandParent] =
    ancestors;

  if (!parent) return null;

  switch (parent.type) {
    case 'MemberExpression':
    case 'OptionalMemberExpression': {
      if (parent.object !== node || parent.computed === true) return null;

      const methodName = readName(parent.property);

      return methodName && STRING_ONLY_METHODS.has(methodName)
        ? 'string-method'
        : null;
    }

    // React, Preact, Solid, Astro: `<img alt={content.alt} />`
    case 'JSXExpressionContainer': {
      if (grandParent?.type !== 'JSXAttribute') return null;

      if (grandParent.value !== parent) return null;

      const elementName = readJsxElementName(greatGrandParent);
      const attributeName = readName(grandParent.name);

      return isNativeElementName(elementName) &&
        isStringAttribute(attributeName)
        ? 'attribute'
        : null;
    }

    // Vue: `<img :alt="content.alt" />`
    case 'VExpressionContainer': {
      if (grandParent?.type !== 'VAttribute') return null;

      if (grandParent.directive !== true) return null;

      const key = isNode(grandParent.key) ? grandParent.key : null;
      const directiveName = readName(key?.name);
      const attributeName = readName(key?.argument);

      if (directiveName !== 'bind') return null;

      const elementName =
        greatGreatGrandParent?.type === 'VElement' &&
        typeof greatGreatGrandParent.rawName === 'string'
          ? greatGreatGrandParent.rawName
          : null;

      return isNativeElementName(elementName) &&
        isStringAttribute(attributeName)
        ? 'attribute'
        : null;
    }

    // Svelte: `<img alt={$content.alt} />`
    case 'SvelteMustacheTag': {
      if (grandParent?.type !== 'SvelteAttribute') return null;

      const parts = Array.isArray(grandParent.value) ? grandParent.value : [];

      // `title="Hi {$content.name}"` interpolates, which accepts any type.
      if (parts.length > 1) return null;

      const element = greatGreatGrandParent;
      const elementName =
        element?.type === 'SvelteElement' && element.kind === 'html'
          ? readName(element.name)
          : null;

      return isNativeElementName(elementName) &&
        isStringAttribute(readName(grandParent.key))
        ? 'attribute'
        : null;
    }

    default:
      return null;
  }
};

/** The static field chain read from a content reference. */
type FieldChain = {
  /** Outermost field access (or the reference itself). */
  chainEnd: IntlayerNodeAstNode;
  /** Index, in the ancestors, of the first node past the chain. */
  ancestorIndex: number;
  /** Number of field accesses. */
  depth: number;
  /** Node member read right after the chain (`value`, `raw`…), if any. */
  nodeMember: string | null;
};

/**
 * Walk up the static field chain of a content reference (`content.hero.title`,
 * Angular's `content().title`). `null` when a field is computed at runtime.
 */
const walkFieldChain = (
  reference: IntlayerNodeAstNode,
  ancestors: readonly IntlayerNodeAstNode[]
): FieldChain | null => {
  let current = reference;
  let ancestorIndex = 0;
  let depth = 0;

  // Angular exposes content as a signal: `content().title`.
  const firstAncestor = ancestors[0];

  if (
    firstAncestor &&
    CALL_TYPES.has(firstAncestor.type) &&
    firstAncestor.callee === current &&
    Array.isArray(firstAncestor.arguments) &&
    firstAncestor.arguments.length === 0
  ) {
    current = firstAncestor;
    ancestorIndex = 1;
  }

  while (true) {
    const parent = ancestors[ancestorIndex];

    if (!parent || !MEMBER_TYPES.has(parent.type)) break;

    if (parent.object !== current) break;

    const propertyName = getStaticPropertyName(parent);

    if (propertyName === null) return null;

    if (INTLAYER_NODE_MEMBERS.has(propertyName)) {
      return {
        chainEnd: current,
        ancestorIndex,
        depth,
        nodeMember: propertyName,
      };
    }

    // `content.title.toUpperCase()`: stop before the method.
    if (STRING_ONLY_METHODS.has(propertyName) && parent.computed !== true) {
      break;
    }

    current = parent;
    ancestorIndex++;
    depth++;
  }

  return { chainEnd: current, ancestorIndex, depth, nodeMember: null };
};

/**
 * Find whether a reference to Intlayer content is consumed as a string.
 *
 * Walks up the static field chain, then checks how its end is used. Dynamic
 * access, a chain already reading a node member (`.value`, `.raw`, `.use`…)
 * and the bare dictionary root are never reported.
 *
 * @param reference - The identifier referencing the bound variable.
 * @param ancestors - Ancestors of `reference`, nearest first.
 * @param isLeafBinding - True when the variable may itself be a node
 *   (destructured field) rather than the whole dictionary.
 */
export const findIntlayerNodeStringUsage = (
  reference: IntlayerNodeAstNode,
  ancestors: readonly IntlayerNodeAstNode[],
  isLeafBinding: boolean
): IntlayerNodeStringUsage | null => {
  const chain = walkFieldChain(reference, ancestors);

  if (!chain || chain.nodeMember !== null) return null;

  if (chain.depth === 0 && !isLeafBinding) return null;

  let { ancestorIndex } = chain;
  let consumer = chain.chainEnd;

  for (
    let wrapper = ancestors[ancestorIndex];
    wrapper && TRANSPARENT_WRAPPERS.has(wrapper.type);
    wrapper = ancestors[ancestorIndex]
  ) {
    consumer = wrapper;
    ancestorIndex++;
  }

  const context = detectStringContext(consumer, ancestors.slice(ancestorIndex));

  return context ? { chainEnd: chain.chainEnd, context } : null;
};

/** Parents of a JSX child expression container. */
const JSX_PARENT_TYPES = new Set(['JSXElement', 'JSXFragment']);

/**
 * Find a `.value` read rendered as a JSX child: `<h1>{content.title.value}</h1>`
 * renders a bare string, where `<h1>{content.title}</h1>` renders the node and
 * keeps it selectable by the visual editor.
 *
 * Only meaningful for packages whose nodes are JSX-renderable
 * ({@link INTLAYER_JSX_NODE_PACKAGES}).
 *
 * @param reference - The identifier referencing the bound variable.
 * @param ancestors - Ancestors of `reference`, nearest first.
 * @param isLeafBinding - True when the variable may itself be a node.
 */
export const findRedundantIntlayerNodeValue = (
  reference: IntlayerNodeAstNode,
  ancestors: readonly IntlayerNodeAstNode[],
  isLeafBinding: boolean
): IntlayerNodeRedundantValue | null => {
  const chain = walkFieldChain(reference, ancestors);

  if (!chain || chain.nodeMember !== 'value') return null;

  if (chain.depth === 0 && !isLeafBinding) return null;

  const valueAccess = ancestors[chain.ancestorIndex];
  const container = ancestors[chain.ancestorIndex + 1];
  const element = ancestors[chain.ancestorIndex + 2];

  if (!valueAccess || valueAccess.computed === true) return null;

  if (container?.type !== 'JSXExpressionContainer') return null;

  if (container.expression !== valueAccess) return null;

  if (!element || !JSX_PARENT_TYPES.has(element.type)) return null;

  return { chainEnd: chain.chainEnd, valueAccess };
};
