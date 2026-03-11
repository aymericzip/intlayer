import { getNodeType } from '@intlayer/core/dictionaryManipulator';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import { NodeType } from '@intlayer/types/nodeType';
import * as recast from 'recast';
import * as babelTsParser from 'recast/parsers/babel-ts.js';

const b = recast.types.builders;
const n = recast.types.namedTypes;

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
 * A node is multilingual if it is a Translation node, or if it is a specialized node
 * (Markdown, HTML, etc.) that contains a Translation node.
 */
const isMultilingualNode = (val: any): boolean => {
  if (typeof val !== 'object' || val === null || Array.isArray(val)) {
    return false;
  }

  const nodeType = getNodeType(val as ContentNode);

  if (nodeType === NodeType.Translation) {
    return true;
  }

  if (
    nodeType === NodeType.Markdown ||
    nodeType === NodeType.HTML ||
    nodeType === NodeType.Insertion
  ) {
    return isMultilingualNode((val as any)[nodeType]);
  }

  if (
    nodeType === NodeType.Enumeration ||
    nodeType === NodeType.Condition ||
    nodeType === NodeType.Gender
  ) {
    const data = (val as any)[nodeType];

    if (data && typeof data === 'object') {
      return Object.values(data).some((v) => isMultilingualNode(v));
    }
  }

  return false;
};

/**
 * Recursively builds or updates an AST node for a given dictionary value.
 */
const buildNodeForValue = (
  val: any,
  existingNode: any,
  fallbackLocale: string | undefined, // In per-locale mode, this is the locale of the file
  requiredImports: Set<string>
): any => {
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
        [
          't',
          'enu',
          'cond',
          'gender',
          'insert',
          'md',
          'html',
          'file',
          'nest',
        ].includes(unwrappedExisting.callee.name));

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

    if (
      (!val || typeof val !== 'object') &&
      n.CallExpression.check(existingNode) &&
      n.Identifier.check(existingNode.callee) &&
      existingNode.callee.name === 'md'
    ) {
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
          requiredImports.add('md');
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
        elements[i] = buildNodeForValue(
          item,
          elements[i],
          fallbackLocale,
          requiredImports
        );
      });

      if (elements.length > val.length) elements.length = val.length;
      unwrappedExisting.elements = elements as any;

      return existingNode;
    } else {
      return b.arrayExpression(
        val.map((item) =>
          buildNodeForValue(item, null, fallbackLocale, requiredImports)
        )
      );
    }
  }

  // 3. Intlayer Specialized Nodes
  const nodeType =
    val && typeof val === 'object' && !Array.isArray(val)
      ? getNodeType(val as ContentNode)
      : null;

  if (
    nodeType &&
    Object.values(NodeType).includes(nodeType as any) &&
    nodeType !== NodeType.Text
  ) {
    const nodeData = (val as any)[nodeType];
    let calleeName = '';

    if (nodeType === NodeType.Translation) calleeName = 't';
    else if (nodeType === NodeType.Enumeration) calleeName = 'enu';
    else if (nodeType === NodeType.Condition) calleeName = 'cond';
    else if (nodeType === NodeType.Gender) calleeName = 'gender';
    else if (nodeType === NodeType.Insertion) calleeName = 'insert';
    else if (nodeType === NodeType.Markdown) calleeName = 'md';
    else if (nodeType === NodeType.HTML) calleeName = 'html';
    else if (nodeType === NodeType.File) calleeName = 'file';
    else if (nodeType === NodeType.Nested) calleeName = 'nest';

    if (calleeName) requiredImports.add(calleeName);

    const isMatchingCall =
      existingNode &&
      n.CallExpression.check(existingNode) &&
      n.Identifier.check(existingNode.callee) &&
      existingNode.callee.name === calleeName;

    if (['t', 'enu', 'cond', 'gender'].includes(calleeName)) {
      let objArg: any = null;

      if (
        isMatchingCall &&
        existingNode.arguments.length > 0 &&
        n.ObjectExpression.check(existingNode.arguments[0])
      ) {
        objArg = existingNode.arguments[0];
      } else {
        objArg = b.objectExpression([]);
      }
      updateObjectLiteral(objArg, nodeData, fallbackLocale, requiredImports);

      return isMatchingCall
        ? existingNode
        : b.callExpression(b.identifier(calleeName), [objArg]);
    }

    if (['md', 'html', 'insert', 'file'].includes(calleeName)) {
      const argNode = buildNodeForValue(
        nodeData,
        isMatchingCall && existingNode.arguments.length > 0
          ? existingNode.arguments[0]
          : null,
        fallbackLocale,
        requiredImports
      );

      if (isMatchingCall) {
        existingNode.arguments[0] = argNode;

        return existingNode;
      }

      return b.callExpression(b.identifier(calleeName), [argNode]);
    }

    if (calleeName === 'nest') {
      const args = [b.literal(nodeData.dictionaryKey)];

      if (nodeData.path) args.push(b.literal(nodeData.path));

      if (isMatchingCall) {
        existingNode.arguments = args;

        return existingNode;
      }

      return b.callExpression(b.identifier('nest'), args);
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
      existingProp.value = buildNodeForValue(
        val,
        existingProp.value,
        fallbackLocale,
        requiredImports
      );
    } else {
      const isValidId = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
      const keyNode = isValidId ? b.identifier(key) : b.literal(key);
      const valueNode = buildNodeForValue(
        val,
        null,
        fallbackLocale,
        requiredImports
      );
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
