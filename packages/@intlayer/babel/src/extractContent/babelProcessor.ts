import _traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import type { IntlayerConfig } from '@intlayer/types/config';
import { resolveDictionaryKey } from '../extractContent/utils';
import {
  ATTRIBUTES_TO_EXTRACT,
  type ExistingIntlayerInfo,
  getComponentName,
  getExistingIntlayerInfo,
  getOrGenerateKey,
  shouldExtract,
} from './utils';

export type BabelReplacement = {
  path: NodePath;
  key: string;
  type:
    | 'jsx-text'
    | 'jsx-attribute'
    | 'string-literal'
    | 'jsx-insertion'
    | 'jsx-text-combined'
    | 'template-literal';
  componentKey: string;
  childrenToReplace?: t.Node[];
  variables?: string[];
};

// CJS/ESM interop: @babel/traverse exports its function as `.default` in CJS bundles
const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as any).default
) as typeof _traverse;

/**
 * Method names whose string arguments are technical operands — lookups,
 * comparisons, DOM queries, storage keys, event names — rather than translatable
 * display text. A string literal passed to one of these (e.g.
 * `message.includes('Loading chunk')`) is code, not content, and is skipped.
 */
/**
 * Binary operators whose string operands are code constants / enum values
 * (e.g. `msg.step === 'ERROR'`) rather than translatable display text.
 */
const COMPARISON_OPERATORS = new Set(['===', '!==', '==', '!=']);

/**
 * Object property names whose string values are technical/non-translatable
 * (e.g. `icon: 'Globe'`, `variant: 'primary'`). String values under other
 * property names (e.g. `label: 'Language'`) are still extracted.
 */
const TECHNICAL_KEYS = new Set<string>([
  'icon',
  'className',
  'class',
  'id',
  'type',
  'variant',
  'color',
  'theme',
  'size',
  'align',
  'placement',
  'target',
  'rel',
  'method',
  'mode',
  'direction',
  'orientation',
  'scope',
  'role',
  'lang',
  'locale',
  'href',
  'src',
  'width',
  'height',
  'as',
  'to',
  'key',
  'value',
  'defaultValue',
  'prop',
  'property',
  'state',
  'action',
  'event',
  'handler',
  'callback',
  'url',
  'uri',
  'path',
  'route',
  'slug',
  'endpoint',
  'headers',
  'contentType',
]);

const NON_TRANSLATABLE_CALL_METHODS = new Set<string>([
  'includes',
  'startsWith',
  'endsWith',
  'indexOf',
  'lastIndexOf',
  'match',
  'matchAll',
  'search',
  'localeCompare',
  'split',
  'getAttribute',
  'setAttribute',
  'hasAttribute',
  'removeAttribute',
  'querySelector',
  'querySelectorAll',
  'getElementById',
  'getElementsByClassName',
  'getElementsByTagName',
  'addEventListener',
  'removeEventListener',
  'dispatchEvent',
  'matchMedia',
  'getItem',
  'setItem',
  'removeItem',
  'getPropertyValue',
  'setProperty',
]);

/**
 * When `path` is a string-literal argument of a member/optional-member call
 * expression (e.g. `foo.includes('bar')` or `foo?.bar?.includes('baz')`),
 * returns the called method name and whether the call targets the `console`
 * object. Returns `undefined` when the parent is not such a call, or the string
 * is not one of its arguments.
 */
const getEnclosingMethodCallInfo = (
  path: NodePath<t.StringLiteral>
): { methodName: string | undefined; isConsoleCall: boolean } | undefined => {
  const parent = path.parentPath;
  if (!parent.isCallExpression() && !parent.isOptionalCallExpression()) {
    return undefined;
  }

  const callNode = parent.node as t.CallExpression | t.OptionalCallExpression;
  if (!callNode.arguments.includes(path.node)) return undefined;

  const callee = callNode.callee;
  if (!t.isMemberExpression(callee) && !t.isOptionalMemberExpression(callee)) {
    return undefined;
  }

  const methodName = t.isIdentifier(callee.property)
    ? callee.property.name
    : undefined;
  const isConsoleCall =
    t.isIdentifier(callee.object) && callee.object.name === 'console';

  return { methodName, isConsoleCall };
};

/**
 * Handles JSX insertions (elements with multiple children, including expressions).
 * Replaces complex JSX structures with variable-based translations.
 */
export const handleJsxInsertionBabel = (
  path: NodePath<t.JSXElement | t.JSXFragment>,
  fileCode: string,
  existingKeys: Set<string>,
  getComponentKeyForPath: (path: NodePath) => string,
  extractedContent: Record<string, Record<string, string>>,
  replacements: BabelReplacement[],
  handledNodes: Set<t.Node>
): boolean => {
  const children = path.node.children;

  if (children.length <= 1) return false;

  const parts: {
    type: 'text' | 'var';
    value: string;
    originalExpr?: string;
  }[] = [];
  let hasSignificantText = false;
  let hasVariables = false;

  for (const child of children) {
    if (t.isJSXText(child)) {
      const text = child.value;

      if (text.trim().length > 0) hasSignificantText = true;

      parts.push({ type: 'text', value: text });
    } else if (t.isJSXExpressionContainer(child)) {
      if (t.isJSXEmptyExpression(child.expression)) {
        parts.push({ type: 'text', value: '' });
      } else {
        const expr = child.expression;

        if (t.isIdentifier(expr)) {
          parts.push({
            type: 'var',
            value: expr.name,
            originalExpr: expr.name,
          });
          hasVariables = true;
        } else if (t.isMemberExpression(expr)) {
          const code = fileCode.substring(expr.start!, expr.end!);

          const varName = t.isIdentifier(expr.property)
            ? expr.property.name
            : 'var';

          parts.push({ type: 'var', value: varName, originalExpr: code });

          hasVariables = true;
        } else if (t.isTemplateLiteral(expr)) {
          for (let i = 0; i < expr.quasis.length; i++) {
            parts.push({
              type: 'text',
              value: expr.quasis[i]?.value.raw ?? '',
            });
            if (i < expr.expressions.length) {
              const subExpr = expr.expressions[i];
              if (t.isIdentifier(subExpr)) {
                parts.push({
                  type: 'var',
                  value: subExpr.name,
                  originalExpr: subExpr.name,
                });
                hasVariables = true;
              } else if (t.isMemberExpression(subExpr)) {
                const code = fileCode.substring(subExpr.start!, subExpr.end!);
                const varName = t.isIdentifier(subExpr.property)
                  ? subExpr.property.name
                  : 'var';
                parts.push({ type: 'var', value: varName, originalExpr: code });
                hasVariables = true;
              } else {
                return false;
              }
            }
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  if (!hasSignificantText) return false;

  let combinedString = '';
  for (const part of parts) {
    if (part.type === 'var') combinedString += `{{${part.value}}}`;
    else combinedString += part.value;
  }

  const cleanString = combinedString.replace(/\s+/g, ' ').trim();

  if (shouldExtract(cleanString)) {
    const componentKey = getComponentKeyForPath(path);
    const key = getOrGenerateKey(
      cleanString,
      componentKey,
      existingKeys,
      extractedContent
    );

    const varMap = parts
      .filter((part) => part.type === 'var')
      .map((part) => `${part.value}: ${part.originalExpr}`);
    const uniqueVars = Array.from(new Set(varMap));

    if (hasVariables) {
      replacements.push({
        path,
        key,
        type: 'jsx-insertion',
        componentKey,
        childrenToReplace: children,
        variables: uniqueVars,
      });
    } else {
      replacements.push({
        path,
        key,
        type: 'jsx-text-combined',
        componentKey,
        childrenToReplace: children,
      });
    }

    children.forEach((child) => {
      handledNodes.add(child);
    });
    return true;
  }

  return false;
};

/**
 * Traverses the AST to identify components and extract content.
 * Returns extraction results and metadata about which components need Intlayer hooks.
 */
export const extractBabelContentForComponents = (
  ast: t.File,
  fileCode: string,
  existingKeys: Set<string>,
  defaultKey: string = 'default',
  configuration: IntlayerConfig,
  filePath: string,
  unmergedDictionaries: Record<string, unknown> = {}
): {
  extractedContent: Record<string, Record<string, string>>;
  replacements: BabelReplacement[];
  componentsNeedingHooks: Set<NodePath>;
  componentKeyMap: Map<t.Node, string>;
  componentPaths: NodePath[];
  hookMap: Map<t.Node, 'useIntlayer' | 'getIntlayer'>;
  /** Cached `getExistingIntlayerInfo` result per component node, so callers do not re-traverse. */
  existingInfoByNode: Map<t.Node, ExistingIntlayerInfo | undefined>;
  isSolid: boolean;
} => {
  const extractedContent: Record<string, Record<string, string>> = {};
  const replacements: BabelReplacement[] = [];
  const handledNodes = new Set<t.Node>();
  const componentKeyMap = new Map<t.Node, string>();
  const hookMap = new Map<t.Node, 'useIntlayer' | 'getIntlayer'>();
  const usedKeysInFile = new Set<string>();
  let globalFileKey: string | undefined;

  const componentPaths: NodePath[] = [];

  traverse(ast, {
    Program(path) {
      componentPaths.push(path);
    },
    FunctionDeclaration(path) {
      componentPaths.push(path);
    },
    ArrowFunctionExpression(path) {
      componentPaths.push(path);
    },
    FunctionExpression(path) {
      componentPaths.push(path);
    },
  });

  // `getExistingIntlayerInfo` traverses the component body, so resolve it a
  // single time per component and share the cache with every later phase
  // (including the caller, via the returned `existingInfoByNode`).
  const existingInfoByNode = new Map<
    t.Node,
    ExistingIntlayerInfo | undefined
  >();
  const componentNodeToPath = new Map<t.Node, NodePath>();
  for (const path of componentPaths) {
    existingInfoByNode.set(path.node, getExistingIntlayerInfo(path));
    componentNodeToPath.set(path.node, path);
  }

  // Pre-scan non-Program paths to collect their existing dictionary keys before the
  // Program scope is assigned. Without this, Program is processed first (depth-first
  // traversal) and creates a new file-path-derived key even when a child component
  // already declares a specific dictionary (e.g. useIntlayer('dashboard-sidebar')).
  for (const path of componentPaths) {
    if (path.isProgram()) continue;
    const existingInfo = existingInfoByNode.get(path.node);
    if (existingInfo) {
      usedKeysInFile.add(existingInfo.key);
    }
  }

  for (const path of componentPaths) {
    const existingInfo = existingInfoByNode.get(path.node);

    if (existingInfo) {
      componentKeyMap.set(path.node, existingInfo.key);
      usedKeysInFile.add(existingInfo.key);
      hookMap.set(path.node, existingInfo.hook);
    } else {
      if (path.isProgram()) {
        if (!globalFileKey) {
          // Reuse the dominant existing key from child components so that
          // module-level strings join the same dictionary rather than
          // creating a new file-path-derived one (e.g. 'route').
          const dominantKey =
            usedKeysInFile.size > 0 ? [...usedKeysInFile][0] : undefined;
          if (dominantKey) {
            globalFileKey = dominantKey;
          } else {
            globalFileKey = resolveDictionaryKey(
              defaultKey,
              filePath,
              configuration,
              unmergedDictionaries,
              usedKeysInFile
            );
            usedKeysInFile.add(globalFileKey);
          }
        }
        componentKeyMap.set(path.node, globalFileKey);
        hookMap.set(path.node, 'getIntlayer');
      } else {
        let inheritedKey: string | undefined;
        let parent: NodePath | null = path.parentPath;
        while (parent) {
          if (componentKeyMap.has(parent.node)) {
            inheritedKey = componentKeyMap.get(parent.node);
            break;
          }
          parent = parent.parentPath;
        }

        if (!inheritedKey) {
          if (!globalFileKey) {
            globalFileKey = resolveDictionaryKey(
              defaultKey,
              filePath,
              configuration,
              unmergedDictionaries,
              usedKeysInFile
            );
            usedKeysInFile.add(globalFileKey);
          }
          inheritedKey = globalFileKey;
        }

        componentKeyMap.set(path.node, inheritedKey);

        const compName = getComponentName(path);
        const isComponent = compName ? /^[A-Z]/.test(compName) : false;
        const isHook = compName ? /^use[A-Z]/.test(compName) : false;
        hookMap.set(
          path.node,
          isComponent || isHook ? 'useIntlayer' : 'getIntlayer'
        );
      }
    }
  }

  const getComponentKeyForPath = (path: NodePath): string => {
    let current: NodePath | null = path;
    while (current) {
      if (componentKeyMap.has(current.node)) {
        return componentKeyMap.get(current.node)!;
      }
      current = current.parentPath;
    }
    return globalFileKey || defaultKey;
  };

  traverse(ast, {
    JSXElement(path) {
      if (handledNodes.has(path.node)) return;

      handleJsxInsertionBabel(
        path,
        fileCode,
        existingKeys,
        getComponentKeyForPath,
        extractedContent,
        replacements,
        handledNodes
      );
    },
    JSXFragment(path) {
      if (handledNodes.has(path.node)) return;

      handleJsxInsertionBabel(
        path,
        fileCode,
        existingKeys,
        getComponentKeyForPath,
        extractedContent,
        replacements,
        handledNodes
      );
    },
    JSXText(path) {
      if (handledNodes.has(path.node)) return;

      const text = path.node.value;

      if (shouldExtract(text)) {
        const componentKey = getComponentKeyForPath(path);
        const key = getOrGenerateKey(
          text.replace(/\s+/g, ' ').trim(),
          componentKey,
          existingKeys,
          extractedContent
        );
        replacements.push({ path, key, type: 'jsx-text', componentKey });
      }
    },
    JSXAttribute(path) {
      if (handledNodes.has(path.node)) return;

      const name = path.node.name.name;

      if (
        typeof name !== 'string' ||
        !ATTRIBUTES_TO_EXTRACT.includes(name as any)
      )
        return;
      const value = path.node.value;

      if (t.isStringLiteral(value) && shouldExtract(value.value)) {
        const componentKey = getComponentKeyForPath(path);
        const key = getOrGenerateKey(
          value.value.trim(),
          componentKey,
          existingKeys,
          extractedContent
        );
        replacements.push({ path, key, type: 'jsx-attribute', componentKey });
      }
    },
    StringLiteral(path) {
      if (handledNodes.has(path.node)) return;

      const text = path.node.value;

      if (!shouldExtract(text)) return;

      const parent = path.parentPath;

      if (
        parent.isImportDeclaration() ||
        parent.isImportSpecifier() ||
        parent.isExportDeclaration()
      )
        return;

      if (parent.isJSXAttribute()) return;

      // Skip string literals used as comparison operands (e.g. `msg.step === 'ERROR'`).
      // These are code constants / enum values, not translatable display text.
      if (
        parent.isBinaryExpression() &&
        COMPARISON_OPERATORS.has(parent.node.operator)
      ) {
        return;
      }

      // Skip string literals used as `switch` case tests (e.g. `case 'ERROR':`).
      // Like comparisons, these are code constants, not display text.
      if (parent.isSwitchCase() && parent.node.test === path.node) return;

      // Skip string literals passed to technical method calls, e.g.
      // `message.includes('Loading chunk')`, `el.getAttribute('data-id')`, or
      // `console.log('...')`. These are code operands, not display text.
      const methodCallInfo = getEnclosingMethodCallInfo(path);
      if (
        methodCallInfo &&
        (methodCallInfo.isConsoleCall ||
          (methodCallInfo.methodName !== undefined &&
            NON_TRANSLATABLE_CALL_METHODS.has(methodCallInfo.methodName)))
      ) {
        return;
      }

      if (parent.isObjectProperty() && parent.node.key === path.node) return;

      // Skip string values in known technical/non-translatable object properties (e.g. `icon: 'Globe'`).
      // String values in translatable object properties (e.g. `label: 'Language'`) are still extracted.
      if (
        parent.isObjectProperty() &&
        t.isIdentifier(parent.node.key) &&
        TECHNICAL_KEYS.has(parent.node.key.name)
      ) {
        return;
      }

      if (parent.isMemberExpression() && parent.node.property === path.node)
        return;

      const componentKey = getComponentKeyForPath(path);
      const key = getOrGenerateKey(
        text.trim(),
        componentKey,
        existingKeys,
        extractedContent
      );
      replacements.push({ path, key, type: 'string-literal', componentKey });
    },
    TemplateLiteral(path) {
      if (handledNodes.has(path.node)) return;

      const { quasis, expressions } = path.node;

      // Build the combined string with placeholders
      let combinedString = '';
      const variables: string[] = [];
      let hasSignificantText = false;

      for (let i = 0; i < quasis.length; i++) {
        const text = quasis[i]?.value.raw ?? '';
        combinedString += text;
        if (text.trim().length > 0) hasSignificantText = true;

        if (i < expressions.length) {
          const expr = expressions[i];
          if (t.isIdentifier(expr)) {
            combinedString += `{{${expr.name}}}`;
            variables.push(`${expr.name}: ${expr.name}`);
          } else if (t.isMemberExpression(expr)) {
            const code = fileCode.substring(expr.start!, expr.end!);
            const varName = t.isIdentifier(expr.property)
              ? expr.property.name
              : 'var';
            combinedString += `{{${varName}}}`;
            variables.push(`${varName}: ${code}`);
          } else {
            // Complex expression in template literal, skip
            return;
          }
        }
      }

      if (!hasSignificantText) return;

      const cleanString = combinedString.replace(/\s+/g, ' ').trim();

      if (!shouldExtract(cleanString)) return;

      const componentKey = getComponentKeyForPath(path);
      const key = getOrGenerateKey(
        cleanString,
        componentKey,
        existingKeys,
        extractedContent
      );

      const uniqueVars = Array.from(new Set(variables));

      replacements.push({
        path,
        key,
        type: 'template-literal',
        componentKey,
        variables: uniqueVars,
      });
    },
  });

  /** Returns true when `componentNode` encloses the replacement's path. */
  const replacementIsInside = (
    replacement: BabelReplacement,
    componentNode: t.Node
  ): boolean => {
    let current: NodePath | null = replacement.path;
    while (current) {
      if (current.node === componentNode) return true;
      current = current.parentPath;
    }
    return false;
  };

  const componentsNeedingHooks = new Set<NodePath>();
  for (const componentPath of componentPaths) {
    if (componentPath.isProgram()) {
      // Only count replacements that belong to the Program scope itself, not
      // to a nested component (which provides its own hook).
      const hasDirectReplacements = replacements.some((replacement) => {
        let current: NodePath | null = replacement.path;
        while (current) {
          if (current.node === componentPath.node) {
            return true;
          }
          if (componentNodeToPath.has(current.node)) {
            return false; // reached an enclosing component first
          }
          current = current.parentPath;
        }
        return false;
      });

      if (hasDirectReplacements) {
        componentsNeedingHooks.add(componentPath);
      }
      continue;
    }

    const hasReplacements = replacements.some((replacement) =>
      replacementIsInside(replacement, componentPath.node)
    );

    if (hasReplacements) {
      const key = componentKeyMap.get(componentPath.node)!;
      let ancestorProvidesKey = false;
      let currentPath: NodePath | null = componentPath.parentPath;
      while (currentPath) {
        const ancestorPath = componentNodeToPath.get(currentPath.node);

        if (ancestorPath && !ancestorPath.isProgram()) {
          const ancestorKey = componentKeyMap.get(ancestorPath.node);

          if (ancestorKey === key) {
            const ancestorHasReplacements = replacements.some((replacement) =>
              replacementIsInside(replacement, ancestorPath.node)
            );
            const existingInfo = existingInfoByNode.get(ancestorPath.node);

            if (ancestorHasReplacements || existingInfo) {
              ancestorProvidesKey = true;
              break;
            }
          }
        }
        currentPath = currentPath.parentPath;
      }

      if (!ancestorProvidesKey) {
        componentsNeedingHooks.add(componentPath);
      }
    }
  }

  return {
    extractedContent,
    replacements,
    componentsNeedingHooks,
    componentKeyMap,
    componentPaths,
    hookMap,
    existingInfoByNode,
    isSolid: false,
  };
};

/**
 * High-level function to extract content from TS/JS/JSX/TSX AST.
 */
export const extractTsContent = (
  ast: t.File,
  fileCode: string,
  existingKeys: Set<string>,
  configuration: IntlayerConfig,
  filePath: string,
  unmergedDictionaries: Record<string, unknown> = {}
): {
  extractedContent: Record<string, string>;
  replacements: BabelReplacement[];
} => {
  const { extractedContent, replacements } = extractBabelContentForComponents(
    ast,
    fileCode,
    existingKeys,
    'default',
    configuration,
    filePath,
    unmergedDictionaries
  );

  const flatContent: Record<string, string> = {};
  for (const group of Object.values(extractedContent)) {
    Object.assign(flatContent, group);
  }

  return { extractedContent: flatContent, replacements };
};
