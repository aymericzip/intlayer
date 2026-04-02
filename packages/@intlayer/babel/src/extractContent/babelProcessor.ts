import _traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import type { IntlayerConfig } from '@intlayer/types/config';
import { resolveDictionaryKey } from '../extractContent/utils';
import {
  ATTRIBUTES_TO_EXTRACT,
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
    | 'jsx-text-combined';
  componentKey: string;
  childrenToReplace?: t.Node[];
  variables?: string[];
};

// CJS/ESM interop: @babel/traverse exports its function as `.default` in CJS bundles
const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as any).default
) as typeof _traverse;

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

  for (const path of componentPaths) {
    const existingInfo = getExistingIntlayerInfo(path);

    if (existingInfo) {
      componentKeyMap.set(path.node, existingInfo.key);
      usedKeysInFile.add(existingInfo.key);
      hookMap.set(path.node, existingInfo.hook);
    } else {
      if (path.isProgram()) {
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
        componentKeyMap.set(path.node, globalFileKey);
        hookMap.set(path.node, 'getIntlayer');
      } else {
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
        componentKeyMap.set(path.node, globalFileKey);

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

      if (
        parent.isCallExpression() &&
        t.isMemberExpression(parent.node.callee)
      ) {
        if (
          t.isIdentifier(parent.node.callee.object) &&
          parent.node.callee.object.name === 'console' &&
          t.isIdentifier(parent.node.callee.property) &&
          parent.node.callee.property.name === 'log'
        ) {
          return;
        }
      }

      if (parent.isObjectProperty() && parent.node.key === path.node) return;

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
  });

  const componentsNeedingHooks = new Set<NodePath>();
  for (const componentPath of componentPaths) {
    if (componentPath.isProgram()) {
      const hasDirectReplacements = replacements.some((replacement) => {
        let current: NodePath | null = replacement.path;
        while (current) {
          if (current.node === componentPath.node) {
            return true;
          }
          const isOtherComponent = componentPaths.some(
            (p) => p !== componentPath && p.node === current?.node
          );
          if (isOtherComponent) {
            return false;
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

    const hasReplacements = replacements.some((replacement) => {
      let current: NodePath | null = replacement.path;
      while (current) {
        if (current.node === componentPath.node) return true;

        current = current.parentPath;
      }
      return false;
    });

    if (hasReplacements) {
      const key = componentKeyMap.get(componentPath.node)!;
      let ancestorProvidesKey = false;
      let currentPath: NodePath | null = componentPath.parentPath;
      while (currentPath) {
        const ancestorPath = componentPaths.find(
          (path) => path.node === currentPath?.node
        );

        if (ancestorPath && !ancestorPath.isProgram()) {
          const ancestorKey = componentKeyMap.get(ancestorPath.node);

          if (ancestorKey === key) {
            const ancestorHasReplacements = replacements.some((replacement) => {
              let rPath: NodePath | null = replacement.path;
              while (rPath) {
                if (rPath.node === ancestorPath.node) return true;

                rPath = rPath.parentPath;
              }
              return false;
            });
            const existingInfo = getExistingIntlayerInfo(ancestorPath);

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
