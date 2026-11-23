import {
  findIntlayerNodeStringUsage,
  findRedundantIntlayerNodeValue,
  getIntlayerNodeBindingNames,
  getIntlayerNodeGetterNames,
  type IntlayerNodeAstNode,
  isIntlayerJsxNodePackage,
} from '@intlayer/config/extract';
import { type AstNode, isAstNode } from './sortContentNodes';

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
  'typeAnnotation',
  'returnType',
  'typeParameters',
]);

/** Node types that declare their parameters. */
const FUNCTION_TYPES = new Set([
  'ArrowFunctionExpression',
  'FunctionDeclaration',
  'FunctionExpression',
  'ObjectMethod',
  'ClassMethod',
  'ClassPrivateMethod',
  'TSDeclareFunction',
]);

/** Declarations whose `id` binds a name. */
const NAMED_DECLARATION_TYPES = new Set([
  'ClassDeclaration',
  'ClassExpression',
  'FunctionDeclaration',
  'FunctionExpression',
]);

/** Import specifiers binding a `local` name. */
const IMPORT_SPECIFIER_TYPES = new Set([
  'ImportSpecifier',
  'ImportDefaultSpecifier',
  'ImportNamespaceSpecifier',
]);

/** A node to replace, with the parent holding it. */
type PendingRewrite = {
  parent: AstNode;
  previous: AstNode;
  next: AstNode;
};

/** Every identifier a binding pattern declares. */
const collectDeclaredNames = (pattern: unknown, names: Set<string>): void => {
  if (!isAstNode(pattern)) return;

  switch (pattern.type) {
    case 'Identifier':
      if (typeof pattern.name === 'string') names.add(pattern.name);
      return;
    case 'AssignmentPattern':
      collectDeclaredNames(pattern.left, names);
      return;
    case 'RestElement':
      collectDeclaredNames(pattern.argument, names);
      return;
    case 'TSParameterProperty':
      collectDeclaredNames(pattern.parameter, names);
      return;
    case 'ArrayPattern':
      for (const element of pattern.elements as unknown[]) {
        collectDeclaredNames(element, names);
      }
      return;
    case 'ObjectPattern':
      for (const property of pattern.properties as unknown[]) {
        if (!isAstNode(property)) continue;

        collectDeclaredNames(
          property.type === 'RestElement' ? property : property.value,
          names
        );
      }
      return;
    default:
      return;
  }
};

/** Depth-first walk handing each node its ancestors, nearest last. */
const walk = (
  node: AstNode,
  ancestors: AstNode[],
  visit: (node: AstNode, ancestors: readonly AstNode[]) => void
): void => {
  visit(node, ancestors);
  ancestors.push(node);

  for (const [field, child] of Object.entries(node)) {
    if (IGNORED_FIELDS.has(field)) continue;

    if (Array.isArray(child)) {
      for (const item of child) {
        if (isAstNode(item)) walk(item, ancestors, visit);
      }
    } else if (isAstNode(child)) {
      walk(child, ancestors, visit);
    }
  }

  ancestors.pop();
};

/** Replace `previous` by `next` wherever `parent` holds it. */
const replaceChild = (
  parent: AstNode,
  previous: AstNode,
  next: AstNode
): void => {
  for (const [field, child] of Object.entries(parent)) {
    if (IGNORED_FIELDS.has(field)) continue;

    if (child === previous) {
      parent[field] = next;
      return;
    }

    if (Array.isArray(child)) {
      const index = child.indexOf(previous);

      if (index !== -1) {
        child[index] = next;
        return;
      }
    }
  }
};

/**
 * `chainEnd.value`, positioned on `chainEnd` so Prettier attaches comments
 * the same way it would without the rewrite.
 */
const createValueAccess = (chainEnd: AstNode): AstNode => {
  const end = chainEnd.end;
  const range = chainEnd.range as [number, number] | undefined;
  const location = chainEnd.loc as { end?: unknown } | undefined;
  const endPosition = location?.end;
  // Inside a Babel optional chain, a plain member would print parentheses.
  const isBabelOptionalChain =
    chainEnd.type === 'OptionalMemberExpression' ||
    chainEnd.type === 'OptionalCallExpression';

  return {
    type: isBabelOptionalChain
      ? 'OptionalMemberExpression'
      : 'MemberExpression',
    object: chainEnd,
    property: {
      type: 'Identifier',
      name: 'value',
      start: end,
      end,
      ...(range ? { range: [range[1], range[1]] } : {}),
      ...(endPosition ? { loc: { start: endPosition, end: endPosition } } : {}),
    },
    computed: false,
    optional: false,
    start: chainEnd.start,
    end,
    ...(range ? { range: [...range] } : {}),
    ...(location ? { loc: location } : {}),
  };
};

/**
 * Appends `.value` to every Intlayer node the AST uses where a string is
 * required, in place: `<img alt={content.alt} />` becomes
 * `<img alt={content.alt.value} />`, and `content.name.toUpperCase()` becomes
 * `content.name.value.toUpperCase()`. Template literals, concatenation and
 * `String()` accept any type and are left alone.
 *
 * Conversely, removes `.value` where a JSX-renderable node (React, Preact,
 * Solid…) is rendered as a child: `<h1>{content.title.value}</h1>` becomes
 * `<h1>{content.title}</h1>`, which the visual editor can select.
 *
 * With `editor.enabled: true` an Intlayer node is a framework node rather than
 * a string, so the original forms stop type-checking; `.value` is the string in
 * both modes.
 *
 * Name-based: a content variable whose name is also declared by anything else
 * in the module (a parameter, another variable…) is left alone, so a shadowed
 * name is never rewritten.
 *
 * @param rootNode - Root of a Prettier JS/TS AST (`File` or `Program`).
 */
export const addIntlayerNodeValueAccessInAst = (rootNode: unknown): void => {
  if (!isAstNode(rootNode)) return;

  const program = isAstNode(rootNode.program) ? rootNode.program : rootNode;
  const getterNames = getIntlayerNodeGetterNames(
    program as IntlayerNodeAstNode
  );
  const jsxGetterNames = getIntlayerNodeGetterNames(
    program as IntlayerNodeAstNode,
    isIntlayerJsxNodePackage
  );

  if (getterNames.size === 0) return;

  const rootNames = new Set<string>();
  const leafNames = new Set<string>();
  const otherDeclaredNames = new Set<string>();
  /** Bindings whose nodes render as JSX children. */
  const jsxBindingNames = new Set<string>();

  walk(program, [], (node) => {
    if (node.type === 'VariableDeclarator') {
      const bindingNames = getIntlayerNodeBindingNames(
        node as IntlayerNodeAstNode,
        getterNames
      );

      if (bindingNames) {
        for (const name of bindingNames.rootNames) rootNames.add(name);
        for (const name of bindingNames.leafNames) leafNames.add(name);

        const isJsxNodeBinding =
          getIntlayerNodeBindingNames(
            node as IntlayerNodeAstNode,
            jsxGetterNames
          ) !== null;

        if (isJsxNodeBinding) {
          for (const name of [
            ...bindingNames.rootNames,
            ...bindingNames.leafNames,
          ]) {
            jsxBindingNames.add(name);
          }
        }
      } else {
        collectDeclaredNames(node.id, otherDeclaredNames);
      }

      return;
    }

    if (FUNCTION_TYPES.has(node.type)) {
      for (const parameter of (node.params as unknown[]) ?? []) {
        collectDeclaredNames(parameter, otherDeclaredNames);
      }
    }

    if (NAMED_DECLARATION_TYPES.has(node.type)) {
      collectDeclaredNames(node.id, otherDeclaredNames);
    }

    if (node.type === 'CatchClause') {
      collectDeclaredNames(node.param, otherDeclaredNames);
    }

    if (IMPORT_SPECIFIER_TYPES.has(node.type)) {
      collectDeclaredNames(node.local, otherDeclaredNames);
    }
  });

  const isBindingName = (name: string): boolean =>
    !otherDeclaredNames.has(name) &&
    (rootNames.has(name) || leafNames.has(name));

  const pendingRewrites: PendingRewrite[] = [];
  const seenChainEnds = new Set<IntlayerNodeAstNode>();

  walk(program, [], (node, ancestors) => {
    if (node.type !== 'Identifier' || typeof node.name !== 'string') return;

    if (!isBindingName(node.name)) return;

    const nearestFirstAncestors = [...ancestors].reverse();
    const isLeafBinding = leafNames.has(node.name);

    if (jsxBindingNames.has(node.name)) {
      const redundantValue = findRedundantIntlayerNodeValue(
        node as IntlayerNodeAstNode,
        nearestFirstAncestors as IntlayerNodeAstNode[],
        isLeafBinding
      );
      const valueAccess = redundantValue?.valueAccess as AstNode | undefined;
      const container =
        valueAccess &&
        nearestFirstAncestors[nearestFirstAncestors.indexOf(valueAccess) + 1];

      if (redundantValue && valueAccess && container) {
        pendingRewrites.push({
          parent: container,
          previous: valueAccess,
          next: redundantValue.chainEnd as AstNode,
        });

        return;
      }
    }

    const usage = findIntlayerNodeStringUsage(
      node as IntlayerNodeAstNode,
      nearestFirstAncestors as IntlayerNodeAstNode[],
      isLeafBinding
    );

    if (!usage || seenChainEnds.has(usage.chainEnd)) return;

    seenChainEnds.add(usage.chainEnd);

    const chainEnd = usage.chainEnd as AstNode;
    // The chain end is the identifier itself (index -1) or one of its ancestors.
    const chainEndIndex = nearestFirstAncestors.indexOf(chainEnd);
    const parent = nearestFirstAncestors[chainEndIndex + 1];

    if (parent) {
      pendingRewrites.push({
        parent,
        previous: chainEnd,
        next: createValueAccess(chainEnd),
      });
    }
  });

  for (const { parent, previous, next } of pendingRewrites) {
    replaceChild(parent, previous, next);
  }
};
