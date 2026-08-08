import { getNodeType } from '@intlayer/core/dictionaryManipulator';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import * as recast from 'recast';
import { babelTsParser } from '../utils/babelParser';

const b = recast.types.builders;
const n = recast.types.namedTypes;

/**
 * Name of an `intlayer` helper function a node type is printed as.
 *
 * Mirrors the transpiler helpers re-exported by the `intlayer` package
 * (`@intlayer/core/transpiler`).
 */
type HelperName =
  | 't'
  | 'enu'
  | 'plural'
  | 'cond'
  | 'gender'
  | 'select'
  | 'insert'
  | 'md'
  | 'html'
  | 'file'
  | 'nest';

/**
 * How a {@link NodeType} is materialized back into source code.
 *
 * - `helperRecord` — printed as `helper({ … })`. The node data is a record of
 *   variants (locales, plural categories, conditions, cases…) whose values are
 *   rebuilt recursively and merged into the existing object literal.
 * - `helperValue` — printed as `helper(value)`. The node data is a single
 *   content, itself possibly another node (e.g. `md(t({ … }))`).
 * - `nesting` — printed as `nest(dictionaryKey, path?)`.
 * - `unwrap` — not a source-level helper: the wrapped value replaces the node,
 *   so `{ nodeType: 'text', text: 'Hello' }` is printed as `"Hello"`.
 * - `preserve` — framework elements have no data representation, so the
 *   existing source expression is kept untouched and nothing is written when
 *   there is none.
 * - `structural` — plain objects, arrays and unrecognized nodes, rebuilt by the
 *   generic object/array branches.
 */
type NodeTypeStrategy =
  | {
      kind: 'helperRecord';
      helper: HelperName;
      /**
       * Extra arguments appended after the record argument, rebuilt from the
       * node attributes (e.g. the variable name carried by a `select` node).
       */
      getExtraArguments?: (
        node: Record<string, unknown>
      ) => recast.types.namedTypes.Literal[];
    }
  | { kind: 'helperValue'; helper: HelperName }
  | { kind: 'nesting'; helper: HelperName }
  | { kind: 'unwrap' }
  | { kind: 'preserve' }
  | { kind: 'structural' };

/**
 * Every {@link NodeType} and how it is written back to a JS/TS declaration file.
 *
 * Typed as `Record<NodeType, NodeTypeStrategy>` so that adding a node type to
 * `@intlayer/types` without registering it here becomes a compile-time error —
 * the same guarantee `getNodeType` gives on the read side.
 */
const nodeTypeStrategies: Record<NodeType, NodeTypeStrategy> = {
  [NodeTypes.TRANSLATION]: { kind: 'helperRecord', helper: 't' },
  [NodeTypes.ENUMERATION]: { kind: 'helperRecord', helper: 'enu' },
  [NodeTypes.PLURAL]: { kind: 'helperRecord', helper: 'plural' },
  [NodeTypes.CONDITION]: { kind: 'helperRecord', helper: 'cond' },
  [NodeTypes.GENDER]: { kind: 'helperRecord', helper: 'gender' },
  [NodeTypes.SELECT]: {
    kind: 'helperRecord',
    helper: 'select',
    getExtraArguments: (node) =>
      typeof node.variable === 'string' && node.variable.length > 0
        ? [b.literal(node.variable)]
        : [],
  },
  [NodeTypes.INSERTION]: { kind: 'helperValue', helper: 'insert' },
  [NodeTypes.MARKDOWN]: { kind: 'helperValue', helper: 'md' },
  [NodeTypes.HTML]: { kind: 'helperValue', helper: 'html' },
  [NodeTypes.FILE]: { kind: 'helperValue', helper: 'file' },
  [NodeTypes.NESTED]: { kind: 'nesting', helper: 'nest' },
  [NodeTypes.TEXT]: { kind: 'unwrap' },
  [NodeTypes.NUMBER]: { kind: 'unwrap' },
  [NodeTypes.BOOLEAN]: { kind: 'unwrap' },
  [NodeTypes.NULL]: { kind: 'unwrap' },
  [NodeTypes.REACT_NODE]: { kind: 'preserve' },
  [NodeTypes.PREACT_NODE]: { kind: 'preserve' },
  [NodeTypes.SOLID_NODE]: { kind: 'preserve' },
  [NodeTypes.OBJECT]: { kind: 'structural' },
  [NodeTypes.ARRAY]: { kind: 'structural' },
  [NodeTypes.UNKNOWN]: { kind: 'structural' },
};

/** Every `intlayer` helper the transform is allowed to rewrite. */
const helperNames = new Set<string>(
  Object.values(nodeTypeStrategies).flatMap((strategy) =>
    'helper' in strategy ? [strategy.helper] : []
  )
);

/** Helpers wrapping a single content, e.g. `md(t({ … }))`. */
const wrapperHelperNames = new Set<string>(
  Object.values(nodeTypeStrategies).flatMap((strategy) =>
    strategy.kind === 'helperValue' ? [strategy.helper] : []
  )
);

/**
 * Returned by {@link buildNodeForValue} when a value must not be written to the
 * source file — framework elements and functions have no data representation,
 * so the original expression (when there is one) is left untouched and no new
 * property is created otherwise.
 */
const SKIP_WRITE = Symbol('intlayer.skipWrite');

/**
 * Unwraps TypeScript/Babel expression wrappers (satisfies, as, !, <Type>).
 * Uses string fallbacks to bypass outdated ast-types definitions.
 */
const unwrap = (node: any) => {
  while (
    node &&
    (n.TSSatisfiesExpression?.check(node) ||
      n.TSAsExpression?.check(node) ||
      n.TSTypeAssertion?.check(node) ||
      n.TSNonNullExpression?.check(node) ||
      [
        'TSSatisfiesExpression',
        'TSAsExpression',
        'TSTypeAssertion',
        'TSNonNullExpression',
      ].includes(node.type))
  ) {
    node = node.expression;
  }
  return node;
};

/**
 * Robustly finds a property in a recast ObjectExpression.
 * Handles quoted ("key") or unquoted (key) properties.
 */
const getMatchingProperty = (node: any, key: string) => {
  return node.properties.find((prop: any) => {
    if (n.Property.check(prop) || n.ObjectProperty.check(prop)) {
      if (n.Identifier.check(prop.key) && prop.key.name === key) return true;

      if (n.StringLiteral.check(prop.key) && prop.key.value === key)
        return true;

      if (n.Literal.check(prop.key) && prop.key.value === key) return true;
    }

    return false;
  });
};

/**
 * Synchronizes numeric suffixes across locales.
 * E.g. "Hello 1" -> "Hello 3" updates "Bonjour 1" to "Bonjour 3".
 */
const syncNumericSuffixAcrossLocales = (
  existingNode: any,
  fallbackLocaleCode: string,
  newFallbackValue: string
) => {
  const trailingNumberMatch = newFallbackValue.match(/\d+(?!.*\d)/);
  if (!trailingNumberMatch) return;
  const newTrailingNumber = trailingNumberMatch[0];

  if (n.ObjectExpression.check(existingNode)) {
    for (const prop of existingNode.properties) {
      if (n.Property.check(prop) || n.ObjectProperty.check(prop)) {
        let propName = '';

        if (n.Identifier.check(prop.key)) propName = prop.key.name;
        else if (
          n.Literal.check(prop.key) &&
          typeof prop.key.value === 'string'
        )
          propName = prop.key.value;
        else if (n.StringLiteral.check(prop.key)) propName = prop.key.value;

        if (propName && propName !== fallbackLocaleCode) {
          if (
            n.Literal.check(prop.value) &&
            typeof prop.value.value === 'string'
          ) {
            const currentValue = prop.value.value;
            const currentTrailingNumberMatch =
              currentValue.match(/\d+(?!.*\d)/);

            if (currentTrailingNumberMatch) {
              prop.value = b.literal(
                currentValue.replace(/(\d+)(?!.*\d)/, newTrailingNumber)
              );
            }
          } else if (n.StringLiteral.check(prop.value)) {
            const currentValue = prop.value.value;
            const currentTrailingNumberMatch =
              currentValue.match(/\d+(?!.*\d)/);

            if (currentTrailingNumberMatch) {
              prop.value = b.stringLiteral(
                currentValue.replace(/(\d+)(?!.*\d)/, newTrailingNumber)
              );
            }
          }
        }
      }
    }
  }
};

/**
 * Checks if a value represents a multilingual Intlayer node.
 *
 * A node is multilingual if it is a Translation node, if it wraps one
 * (Markdown, HTML, Insertion…), or if any of its variants contains one
 * (Enumeration, Plural, Condition, Gender, Select…).
 */
const isMultilingualNode = (val: any): boolean => {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) {
    return false;
  }

  const nodeType = getNodeType(val as ContentNode);

  if (nodeType === NodeTypes.TRANSLATION) {
    return true;
  }

  const strategy = nodeTypeStrategies[nodeType];
  const nodeData = (val as any)[nodeType];

  if (strategy.kind === 'helperValue' || strategy.kind === 'unwrap') {
    return isMultilingualNode(nodeData);
  }

  if (
    strategy.kind === 'helperRecord' &&
    nodeData &&
    typeof nodeData === 'object'
  ) {
    return Object.values(nodeData).some((variant) =>
      isMultilingualNode(variant)
    );
  }

  return false;
};

/**
 * Checks whether two AST nodes are literals holding the same value.
 */
const isEquivalentLiteral = (left: any, right: any): boolean => {
  const isLiteral = (node: any) =>
    n.Literal.check(node) ||
    n.StringLiteral.check(node) ||
    n.NumericLiteral.check(node) ||
    n.BooleanLiteral.check(node);

  return isLiteral(left) && isLiteral(right) && left.value === right.value;
};

/**
 * Aligns the arguments of an existing call expression with the desired ones.
 *
 * Mutates the call only when the arguments actually differ, so Recast keeps the
 * original formatting (and quote style) of calls that did not change.
 */
const syncCallArguments = (callNode: any, desiredArguments: any[]) => {
  const isUnchanged =
    callNode.arguments.length === desiredArguments.length &&
    desiredArguments.every((desired, index) => {
      const current = callNode.arguments[index];

      return current === desired || isEquivalentLiteral(current, desired);
    });

  if (!isUnchanged) {
    callNode.arguments = desiredArguments;
  }
};

/**
 * Recursively builds or updates an AST node for a given dictionary value.
 *
 * Returns {@link SKIP_WRITE} when the value cannot be represented in source and
 * no existing expression can be kept.
 */
const buildNodeForValue = (
  val: any,
  existingNode: any,
  fallbackLocale: string | undefined, // In per-locale mode, this is the locale of the file
  requiredImports: Set<string>
): any => {
  // Values with no source representation must never overwrite existing code.
  if (val === undefined || typeof val === 'function') {
    return existingNode ?? SKIP_WRITE;
  }

  const unwrappedExisting = unwrap(existingNode);

  // --- CRITICAL GUARD: STRICT AST PRESERVATION ---
  // If the existing node is code (JSX, Variables, standard functions), leave it alone.
  // Only allow updates to literals, plain objects, arrays, and Intlayer helpers.
  if (unwrappedExisting) {
    const isUpdatableNode =
      n.Literal.check(unwrappedExisting) ||
      n.StringLiteral.check(unwrappedExisting) ||
      n.NumericLiteral.check(unwrappedExisting) ||
      n.BooleanLiteral.check(unwrappedExisting) ||
      n.TemplateLiteral.check(unwrappedExisting) ||
      n.ObjectExpression.check(unwrappedExisting) ||
      n.ArrayExpression.check(unwrappedExisting) ||
      (n.CallExpression.check(unwrappedExisting) &&
        n.Identifier.check(unwrappedExisting.callee) &&
        helperNames.has(unwrappedExisting.callee.name));

    if (!isUpdatableNode) {
      return existingNode;
    }
  }

  // If we are in per-locale mode (fallbackLocale is set)
  // and the value is not already a complex translation node,
  // we want to store it as a simple literal, NOT wrapped in t().
  if (fallbackLocale && !existingNode && !isMultilingualNode(val)) {
    if (val === null) return b.literal(null);
    if (
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean'
    ) {
      if (typeof val === 'string' && val.includes('\n')) {
        return b.templateLiteral(
          [b.templateElement({ raw: val, cooked: val }, true)],
          []
        );
      }
      return b.literal(val);
    }
  }

  if (fallbackLocale && existingNode && !isMultilingualNode(val)) {
    if (
      n.CallExpression.check(existingNode) &&
      n.Identifier.check(existingNode.callee) &&
      existingNode.callee.name === 't'
    ) {
      const arg = unwrap(existingNode.arguments[0]);

      if (n.ObjectExpression.check(arg)) {
        if (typeof val === 'string') {
          syncNumericSuffixAcrossLocales(arg, fallbackLocale, val);
        }
        updateObjectLiteral(
          arg,
          { [fallbackLocale]: val },
          fallbackLocale,
          requiredImports
        );

        if (!fallbackLocale) {
          requiredImports.add('t');
        }

        return existingNode;
      }
    }

    // Wrapped translations — `md(t({ … }))`, `html(t({ … }))`, `insert(t({ … }))`:
    // update the inner translation in place instead of replacing the wrapper.
    if (
      (!val || typeof val !== 'object') &&
      n.CallExpression.check(existingNode) &&
      n.Identifier.check(existingNode.callee) &&
      wrapperHelperNames.has(existingNode.callee.name)
    ) {
      const wrapperName = existingNode.callee.name;
      const innerArg = existingNode.arguments[0];

      if (
        n.CallExpression.check(innerArg) &&
        n.Identifier.check(innerArg.callee) &&
        innerArg.callee.name === 't'
      ) {
        const tArg = unwrap(innerArg.arguments[0]);

        if (n.ObjectExpression.check(tArg)) {
          if (typeof val === 'string') {
            syncNumericSuffixAcrossLocales(tArg, fallbackLocale, val);
          }
          updateObjectLiteral(
            tArg,
            { [fallbackLocale]: val },
            fallbackLocale,
            requiredImports
          );
          requiredImports.add(wrapperName);
          requiredImports.add('t');

          return existingNode;
        }
      }
    }
  }

  // 1. Primitives
  if (val === null) return b.literal(null);
  if (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  ) {
    if (unwrappedExisting) {
      // Preserve existing template literals (backticks)
      if (
        n.TemplateLiteral.check(unwrappedExisting) &&
        unwrappedExisting.quasis[0] &&
        unwrappedExisting.expressions.length === 0
      ) {
        unwrappedExisting.quasis[0].value.raw = String(val);
        unwrappedExisting.quasis[0].value.cooked = String(val);
        return existingNode;
      }
      // Preserve existing standard literals (keeps quote styling)
      if (
        n.Literal.check(unwrappedExisting) ||
        n.StringLiteral.check(unwrappedExisting)
      ) {
        unwrappedExisting.value = val;
        return existingNode;
      }
    }

    // Force multiline strings to use Template Literals
    if (typeof val === 'string' && val.includes('\n')) {
      return b.templateLiteral(
        [b.templateElement({ raw: val, cooked: val }, true)],
        []
      );
    }
    return b.literal(val);
  }

  // 2. Arrays
  if (Array.isArray(val)) {
    if (unwrappedExisting && n.ArrayExpression.check(unwrappedExisting)) {
      const elements = [...unwrappedExisting.elements];
      val.forEach((item, i) => {
        const elementNode = buildNodeForValue(
          item,
          elements[i],
          fallbackLocale,
          requiredImports
        );

        elements[i] =
          elementNode === SKIP_WRITE
            ? (elements[i] ?? b.literal(null))
            : elementNode;
      });

      if (elements.length > val.length) elements.length = val.length;
      unwrappedExisting.elements = elements as any;

      return existingNode;
    } else {
      return b.arrayExpression(
        val.map((item) => {
          const elementNode = buildNodeForValue(
            item,
            null,
            fallbackLocale,
            requiredImports
          );

          return elementNode === SKIP_WRITE ? b.literal(null) : elementNode;
        })
      );
    }
  }

  // 3. Intlayer Specialized Nodes — dispatched through the exhaustive registry
  const nodeType =
    val && typeof val === 'object' && !Array.isArray(val)
      ? getNodeType(val as ContentNode)
      : null;

  if (nodeType) {
    const strategy = nodeTypeStrategies[nodeType];

    // Framework elements (React/Preact/Solid) cannot be serialized back to
    // source: keep whatever the file already declares.
    if (strategy.kind === 'preserve') {
      return existingNode ?? SKIP_WRITE;
    }

    const hasNodeData = Object.hasOwn(val as object, nodeType);
    const nodeData = (val as any)[nodeType];

    // A typed node missing its payload is malformed — fall back to the generic
    // object branch rather than printing a broken helper call.
    if (strategy.kind !== 'structural' && hasNodeData) {
      if (strategy.kind === 'unwrap') {
        return buildNodeForValue(
          nodeData,
          existingNode,
          fallbackLocale,
          requiredImports
        );
      }

      const { helper } = strategy;

      requiredImports.add(helper);

      const isMatchingCall =
        existingNode &&
        n.CallExpression.check(existingNode) &&
        n.Identifier.check(existingNode.callee) &&
        existingNode.callee.name === helper;

      if (strategy.kind === 'helperRecord') {
        const recordArgument =
          isMatchingCall &&
          existingNode.arguments.length > 0 &&
          n.ObjectExpression.check(existingNode.arguments[0])
            ? existingNode.arguments[0]
            : b.objectExpression([]);

        updateObjectLiteral(
          recordArgument,
          nodeData ?? {},
          fallbackLocale,
          requiredImports
        );

        const callArguments = [
          recordArgument,
          ...(strategy.getExtraArguments?.(val as Record<string, unknown>) ??
            []),
        ];

        if (isMatchingCall) {
          syncCallArguments(existingNode, callArguments);

          return existingNode;
        }

        return b.callExpression(b.identifier(helper), callArguments);
      }

      if (strategy.kind === 'helperValue') {
        const contentArgument = buildNodeForValue(
          nodeData,
          isMatchingCall && existingNode.arguments.length > 0
            ? existingNode.arguments[0]
            : null,
          fallbackLocale,
          requiredImports
        );

        if (contentArgument === SKIP_WRITE) {
          return existingNode ?? SKIP_WRITE;
        }

        if (isMatchingCall) {
          // Keep any extra argument the source declares (custom components
          // passed to `md()` / `html()`), which the node does not carry back.
          syncCallArguments(existingNode, [
            contentArgument,
            ...existingNode.arguments.slice(1),
          ]);

          return existingNode;
        }

        return b.callExpression(b.identifier(helper), [contentArgument]);
      }

      // strategy.kind === 'nesting'
      const callArguments = [b.literal(nodeData?.dictionaryKey ?? '')];

      if (nodeData?.path) callArguments.push(b.literal(nodeData.path));

      if (isMatchingCall) {
        syncCallArguments(existingNode, callArguments);

        return existingNode;
      }

      return b.callExpression(b.identifier(helper), callArguments);
    }
  }

  // 4. Plain Object
  const objNode =
    unwrappedExisting && n.ObjectExpression.check(unwrappedExisting)
      ? unwrappedExisting
      : b.objectExpression([]);

  updateObjectLiteral(objNode, val, fallbackLocale, requiredImports);

  return existingNode && unwrappedExisting === existingNode
    ? objNode
    : existingNode || objNode;
};

/**
 * Recursively updates the AST object literal properties.
 */
const updateObjectLiteral = (
  node: recast.types.namedTypes.ObjectExpression,
  data: Record<string, any>,
  fallbackLocale: string | undefined,
  requiredImports: Set<string>
) => {
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined) continue;

    const existingProp = getMatchingProperty(node, key);

    if (existingProp) {
      const valueNode = buildNodeForValue(
        val,
        existingProp.value,
        fallbackLocale,
        requiredImports
      );

      if (valueNode !== SKIP_WRITE) {
        existingProp.value = valueNode;
      }
    } else {
      const isValidId = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
      const keyNode = isValidId ? b.identifier(key) : b.literal(key);
      const valueNode = buildNodeForValue(
        val,
        null,
        fallbackLocale,
        requiredImports
      );

      if (valueNode === SKIP_WRITE) continue;

      node.properties.push(b.property('init', keyNode, valueNode));
    }
  }
};

/**
 * Modifies the AST's top-level imports to inject dynamically needed helper utilities seamlessly.
 */
const addImports = (ast: any, requiredImports: Set<string>, isESM: boolean) => {
  if (requiredImports.size === 0) return;

  const existingCoreImports = new Set<string>();
  let coreImportPath: any = null;

  recast.visit(ast, {
    visitImportDeclaration(path) {
      const source = path.node.source.value;

      if (source === 'intlayer') {
        coreImportPath = path;
        path.node.specifiers?.forEach((spec) => {
          if (
            n.ImportSpecifier.check(spec) &&
            typeof spec.imported.name === 'string'
          ) {
            existingCoreImports.add(spec.imported.name);
          }
        });
      }

      return false;
    },
    visitVariableDeclaration(path) {
      path.node.declarations.forEach((decl) => {
        if (
          n.VariableDeclarator.check(decl) &&
          n.CallExpression.check(decl.init) &&
          n.Identifier.check(decl.init.callee) &&
          decl.init.callee.name === 'require'
        ) {
          const arg = decl.init.arguments[0];

          if (n.Literal.check(arg)) {
            if (arg.value === 'intlayer') {
              if (n.ObjectPattern.check(decl.id)) {
                decl.id.properties.forEach((prop) => {
                  if (
                    n.Property.check(prop) &&
                    (n.Identifier.check(prop.key) ||
                      n.Identifier.check(prop.value))
                  ) {
                    const name = n.Identifier.check(prop.key)
                      ? prop.key.name
                      : (prop.value as any).name;
                    existingCoreImports.add(name);
                  }
                });
              } else if (n.Identifier.check(decl.id)) {
                // Handle const intlayer = require('intlayer')
                existingCoreImports.add(decl.id.name);
              }
            }
          }
        }
      });

      return false;
    },
  });

  const missingCore = Array.from(requiredImports).filter(
    (imp) => !existingCoreImports.has(imp)
  );

  if (missingCore.length === 0) return;

  if (isESM) {
    if (coreImportPath) {
      missingCore.forEach((imp) => {
        coreImportPath.node.specifiers.push(
          b.importSpecifier(b.identifier(imp))
        );
      });
      coreImportPath.node.specifiers.sort((a: any, b: any) =>
        a.imported.name.localeCompare(b.imported.name)
      );
    } else {
      const specifiers = missingCore
        .sort()
        .map((imp) => b.importSpecifier(b.identifier(imp)));
      const newImport = b.importDeclaration(specifiers, b.literal('intlayer'));
      ast.program.body.unshift(newImport);
    }
  } else {
    let insertIndex = 0;

    if (
      ast.program.body.length > 0 &&
      n.ExpressionStatement.check(ast.program.body[0]) &&
      n.Literal.check(ast.program.body[0].expression)
    ) {
      insertIndex = 1; // Insert after 'use strict'
    }
    const cjsLines: any[] = [];

    const properties = missingCore.sort().map((imp) => {
      const prop = b.property('init', b.identifier(imp), b.identifier(imp));
      prop.shorthand = true;

      return prop;
    });
    cjsLines.push(
      b.variableDeclaration('const', [
        b.variableDeclarator(
          b.objectPattern(properties),
          b.callExpression(b.identifier('require'), [b.literal('intlayer')])
        ),
      ])
    );

    ast.program.body.splice(insertIndex, 0, ...cjsLines);
  }
};

/**
 * Updates a JS/TS file seamlessly to map new localization keys, arrays, complex nodes and nested dictionaries gracefully using AST updates via Recast parser.
 */
export const transformJSFile = async (
  fileContent: string,
  dictionary: Dictionary,
  fallbackLocale?: Locale,
  noMetadata?: boolean
): Promise<string> => {
  if (!dictionary || typeof dictionary !== 'object') return fileContent;

  let ast: any;
  try {
    ast = recast.parse(fileContent, {
      parser: babelTsParser,
    });
  } catch (error) {
    console.error({ error });
    return fileContent;
  }

  let rootObject: any = null;
  let isESM = false;

  recast.visit(ast, {
    visitExportDefaultDeclaration() {
      isESM = true;

      return false;
    },
    visitImportDeclaration() {
      isESM = true;

      return false;
    },
  });

  recast.visit(ast, {
    visitExportDefaultDeclaration(path) {
      const decl = path.node.declaration;
      const unwrappedDecl = unwrap(decl);

      if (n.ObjectExpression.check(unwrappedDecl)) {
        rootObject = unwrappedDecl;
      } else if (n.Identifier.check(unwrappedDecl)) {
        const varName = unwrappedDecl.name;
        recast.visit(ast, {
          visitVariableDeclarator(vp) {
            const unwrappedInit = unwrap(vp.node.init);

            if (
              n.Identifier.check(vp.node.id) &&
              vp.node.id.name === varName &&
              n.ObjectExpression.check(unwrappedInit)
            ) {
              rootObject = unwrappedInit;
            }

            return false;
          },
        });
      }

      return false;
    },
    visitAssignmentExpression(path) {
      const left = path.node.left;

      if (n.MemberExpression.check(left)) {
        if (
          n.Identifier.check(left.object) &&
          left.object.name === 'module' &&
          n.Identifier.check(left.property) &&
          left.property.name === 'exports'
        ) {
          const unwrappedRight = unwrap(path.node.right);

          if (n.ObjectExpression.check(unwrappedRight)) {
            rootObject = unwrappedRight;
          }
        }

        if (
          n.Identifier.check(left.object) &&
          left.object.name === 'exports' &&
          n.Identifier.check(left.property) &&
          left.property.name === 'default'
        ) {
          const unwrappedRight = unwrap(path.node.right);

          if (n.ObjectExpression.check(unwrappedRight)) {
            rootObject = unwrappedRight;
          }
        }
      }
      this.traverse(path);
    },
  });

  if (!rootObject) {
    recast.visit(ast, {
      visitVariableDeclarator(path) {
        const unwrappedInit = unwrap(path.node.init);

        if (!rootObject && n.ObjectExpression.check(unwrappedInit)) {
          rootObject = unwrappedInit;
        }

        return false;
      },
    });
  }

  if (!rootObject) return fileContent;

  const requiredImports = new Set<string>();
  const effectiveFallbackLocale = (fallbackLocale as string) ?? 'en';

  const metadataProperties = [
    'id',
    'locale',
    'filled',
    'fill',
    'title',
    'description',
    'tags',
    'version',
    'priority',
    'contentAutoTransformation',
  ];

  if (noMetadata) {
    // Remove key, content and metadata properties if they exist
    rootObject.properties = rootObject.properties.filter((prop: any) => {
      if (n.Property.check(prop) || n.ObjectProperty.check(prop)) {
        let propName = '';
        if (n.Identifier.check(prop.key)) propName = prop.key.name;
        else if (n.StringLiteral.check(prop.key)) propName = prop.key.value;
        else if (n.Literal.check(prop.key)) propName = String(prop.key.value);

        return !['key', 'content', ...metadataProperties].includes(propName);
      }
      return true;
    });

    // Update satisfies type if exists
    recast.visit(ast, {
      visitNode(path) {
        const node = path.node;
        if (
          (n.TSSatisfiesExpression?.check(node) ||
            node.type === 'TSSatisfiesExpression') &&
          (node as any).typeAnnotation &&
          n.TSTypeReference.check((node as any).typeAnnotation) &&
          n.Identifier.check((node as any).typeAnnotation.typeName) &&
          (node as any).typeAnnotation.typeName.name === 'Dictionary'
        ) {
          (node as any).typeAnnotation = b.tsIndexedAccessType(
            b.tsTypeReference(b.identifier('Dictionary')),
            b.tsLiteralType(b.stringLiteral('content'))
          );
        }
        this.traverse(path);
      },
    });
  } else {
    for (const prop of metadataProperties) {
      if ((dictionary as any)[prop] !== undefined) {
        updateObjectLiteral(
          rootObject,
          { [prop]: (dictionary as any)[prop] },
          undefined,
          requiredImports
        );
      }
    }
  }

  if (dictionary.content !== undefined) {
    updateObjectLiteral(
      rootObject,
      noMetadata
        ? (dictionary.content as Record<string, any>)
        : { content: dictionary.content },
      effectiveFallbackLocale,
      requiredImports
    );
  }

  addImports(ast, requiredImports, isESM);

  return recast.print(ast).code;
};
