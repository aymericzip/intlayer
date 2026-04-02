import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from '@babel/parser';
import _traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { detectFormatCommand } from '@intlayer/chokidar/cli';
import type { IntlayerConfig } from '@intlayer/types/config';
import { extractBabelContentForComponents } from './babelProcessor';
import {
  type ExistingIntlayerInfo,
  getExistingIntlayerInfo,
  type PackageName,
  SERVER_CAPABLE_PACKAGES,
} from './utils';

export type TextEdit = {
  start: number;
  end: number;
  replacement: string;
};

const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as any).default
) as typeof _traverse;

/**
 * Processes a TSX/JSX/TS/JS file to extract content and inject Intlayer hooks/calls.
 */
export const processTsxFile = (
  filePath: string,
  componentKey: string,
  packageName: PackageName,
  configuration: IntlayerConfig,
  save: boolean = true,
  unmergedDictionaries: Record<string, unknown> = {},
  providedFileCode?: string
): {
  extractedContent: Record<string, Record<string, string>>;
  modifiedCode: string;
} | null => {
  const fileCode = providedFileCode ?? readFileSync(filePath, 'utf-8');

  const ast = parse(fileCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const hasUseClient = ast.program.directives.some(
    (directive) => directive.value.value === 'use client'
  );

  const effectivePackageName =
    SERVER_CAPABLE_PACKAGES.has(packageName) && !hasUseClient
      ? `${packageName}/server`
      : packageName;

  // Both Solid and Angular expose content via a reactive/signal function —
  // access is `content().key` rather than `content.key`.
  const isSolid =
    packageName === 'solid-intlayer' || packageName === 'angular-intlayer';
  const existingKeys = new Set<string>();

  const {
    extractedContent,
    replacements,
    componentsNeedingHooks,
    componentKeyMap,
    componentPaths,
    hookMap,
  } = extractBabelContentForComponents(
    ast,
    fileCode,
    existingKeys,
    componentKey,
    configuration,
    filePath,
    unmergedDictionaries
  );

  if (Object.keys(extractedContent).length === 0) return null;

  const textEdits: TextEdit[] = [];

  // Build a lookup map: component AST node → NodePath (O(1) access)
  const componentNodeToPath = new Map<t.Node, NodePath>();
  for (const componentPath of componentPaths) {
    componentNodeToPath.set(componentPath.node, componentPath);
  }

  // Cache getExistingIntlayerInfo results for all component paths (avoids repeated traversals)
  const existingInfoCache = new Map<t.Node, ExistingIntlayerInfo | undefined>();
  for (const componentPath of componentPaths) {
    existingInfoCache.set(
      componentPath.node,
      getExistingIntlayerInfo(componentPath)
    );
  }

  /**
   * Walks up the ancestor chain to find the nearest enclosing component's
   * existing Intlayer info (if any).
   */
  const getExistingInfoForPath = (
    path: NodePath
  ): ExistingIntlayerInfo | undefined => {
    let current: NodePath | null = path;
    while (current) {
      if (componentNodeToPath.has(current.node)) {
        return existingInfoCache.get(current.node);
      }
      current = current.parentPath;
    }
    return undefined;
  };

  const getProvidingHookType = (
    path: NodePath
  ): 'useIntlayer' | 'getIntlayer' => {
    let current: NodePath | null = path;
    while (current) {
      const componentPath = componentNodeToPath.get(current.node);

      if (componentPath) {
        const existingInfo = existingInfoCache.get(componentPath.node);

        if (existingInfo) {
          return existingInfo.hook;
        }

        if (componentsNeedingHooks.has(componentPath)) {
          return hookMap.get(componentPath.node) || 'useIntlayer';
        }
      }
      current = current.parentPath;
    }
    return 'useIntlayer';
  };

  for (const {
    path,
    key,
    type,
    variables,
    childrenToReplace,
  } of replacements) {
    const existingInfo = getExistingInfoForPath(path);
    // When the existing call is destructured (e.g. `const { a } = getIntlayer(...)`),
    // new keys are added directly to that destructuring, so access them by name alone.
    const varName = existingInfo?.variableName ?? 'content';
    const contentAccessCode = existingInfo?.isDestructured
      ? key
      : isSolid
        ? `${varName}().${key}`
        : `${varName}.${key}`;
    const hookType = getProvidingHookType(path);
    const valueSuffix = hookType === 'getIntlayer' ? '' : '.value';

    if (type === 'jsx-text' && path.isJSXText()) {
      textEdits.push({
        start: path.node.start!,
        end: path.node.end!,
        replacement: `{${contentAccessCode}}`,
      });
    } else if (type === 'jsx-attribute' && path.isJSXAttribute()) {
      const valNode = path.node.value;

      if (valNode) {
        textEdits.push({
          start: valNode.start!,
          end: valNode.end!,
          replacement: `{${contentAccessCode}${valueSuffix}}`,
        });
      }
    } else if (type === 'string-literal' && path.isStringLiteral()) {
      textEdits.push({
        start: path.node.start!,
        end: path.node.end!,
        replacement: `${contentAccessCode}${valueSuffix}`,
      });
    } else if (
      type === 'jsx-text-combined' &&
      childrenToReplace &&
      childrenToReplace.length > 0
    ) {
      const accessStr = `{${contentAccessCode}}`;
      const start = childrenToReplace[0].start!;
      const end = childrenToReplace[childrenToReplace.length - 1].end!;
      textEdits.push({ start, end, replacement: accessStr });
    } else if (
      type === 'jsx-insertion' &&
      variables &&
      childrenToReplace &&
      childrenToReplace.length > 0
    ) {
      const objProps = variables
        .map((variableString) => {
          const [key, variableValue] = variableString
            .split(':')
            .map((part) => part.trim());
          return `${key}: ${variableValue}`;
        })
        .join(', ');

      const accessStr = `{${contentAccessCode}({ ${objProps} })}`;
      const start = childrenToReplace[0].start!;
      const end = childrenToReplace[childrenToReplace.length - 1].end!;
      textEdits.push({ start, end, replacement: accessStr });
    } else if (type === 'template-literal' && path.isTemplateLiteral()) {
      let replacement = `${contentAccessCode}`;

      if (variables && variables.length > 0) {
        const objProps = variables
          .map((variableString) => {
            const [key, variableValue] = variableString
              .split(':')
              .map((part) => part.trim());
            return `${key}: ${variableValue}`;
          })
          .join(', ');
        replacement += `({ ${objProps} })`;
      } else {
        replacement += valueSuffix;
      }

      textEdits.push({
        start: path.node.start!,
        end: path.node.end!,
        replacement,
      });
    }
  }

  let needsUseIntlayer = false;
  let needsGetIntlayer = false;

  for (const componentPath of componentsNeedingHooks) {
    const finalKey = componentKeyMap.get(componentPath.node)!;
    const existingInfo = existingInfoCache.get(componentPath.node);

    if (existingInfo) {
      if (existingInfo.hook === 'useIntlayer') needsUseIntlayer = true;

      if (existingInfo.hook === 'getIntlayer') needsGetIntlayer = true;

      // When the existing call is destructured, inject any missing keys into
      // the destructuring pattern so they can be accessed by name directly.
      if (existingInfo.isDestructured && existingInfo.objectPatternNode) {
        const neededKeys = new Set<string>();

        for (const { path: rPath, key: rKey } of replacements) {
          let current: NodePath | null = rPath;

          while (current) {
            if (current.node === componentPath.node) {
              neededKeys.add(rKey);
              break;
            }
            current = current.parentPath;
          }
        }

        const missingKeys = [...neededKeys].filter(
          (key) => !existingInfo.existingDestructuredKeys.includes(key)
        );

        if (missingKeys.length > 0) {
          const { objectPatternNode } = existingInfo;
          // Insert right after the last property so the space/newline before
          // `}` is naturally preserved: `{ a }` → `{ a, b }`.
          const lastProp =
            objectPatternNode.properties[
              objectPatternNode.properties.length - 1
            ];
          textEdits.push({
            start: lastProp.end!,
            end: lastProp.end!,
            replacement: `, ${missingKeys.join(', ')}`,
          });
        }
      }
    } else {
      const hook = hookMap.get(componentPath.node) || 'useIntlayer';

      if (hook === 'useIntlayer') needsUseIntlayer = true;

      if (hook === 'getIntlayer') needsGetIntlayer = true;

      const hookStatementStr = `\n  const content = ${hook}('${finalKey}');\n`;

      if (componentPath.isProgram()) {
        // Find the last import or directive to inject the getIntlayer call
        let insertPos = 0;
        if (componentPath.node.directives.length > 0) {
          insertPos =
            componentPath.node.directives[
              componentPath.node.directives.length - 1
            ].end!;
        }
        for (const stmt of componentPath.node.body) {
          if (t.isImportDeclaration(stmt)) {
            insertPos = Math.max(insertPos, stmt.end!);
          }
        }

        textEdits.push({
          start: insertPos,
          end: insertPos,
          replacement: `\n${hookStatementStr}`,
        });
        continue;
      }

      const bodyPath = componentPath.get('body') as NodePath;

      if (bodyPath.isBlockStatement()) {
        textEdits.push({
          start: bodyPath.node.start! + 1,
          end: bodyPath.node.start! + 1,
          replacement: hookStatementStr,
        });
      } else if (bodyPath.isExpression()) {
        const start = bodyPath.node.start!;
        const end = bodyPath.node.end!;

        // Detect wrapping parentheses: `() => (expr)` — scan backward from
        // the expression start and forward from its end for matching `(` / `)`.
        let parenStart = -1;
        let parenEnd = -1;

        for (let i = start - 1; i >= 0; i--) {
          const char = fileCode[i];
          if (char === '(') {
            parenStart = i;
            break;
          }
          if (char !== ' ' && char !== '\n' && char !== '\r' && char !== '\t')
            break;
        }

        if (parenStart !== -1) {
          for (let i = end; i < fileCode.length; i++) {
            const char = fileCode[i];
            if (char === ')') {
              parenEnd = i;
              break;
            }
            if (char !== ' ' && char !== '\n' && char !== '\r' && char !== '\t')
              break;
          }
        }

        if (parenStart !== -1 && parenEnd !== -1) {
          // Replace the surrounding `(` … `)` with a block statement. We keep
          // the parentheses as `return (…)` to prevent automatic semicolon
          // insertion when the returned expression starts on a new line.
          textEdits.push({
            start: parenEnd,
            end: parenEnd + 1,
            replacement: `)\n}`,
          });
          textEdits.push({
            start: parenStart,
            end: parenStart + 1,
            replacement: `{\n  const content = ${hook}('${finalKey}');\n  return (`,
          });
        } else {
          textEdits.push({
            start: end,
            end: end,
            replacement: `\n}`,
          });
          textEdits.push({
            start: start,
            end: start,
            replacement: `{\n  const content = ${hook}('${finalKey}');\n  return `,
          });
        }
      }
    }
  }

  const injectImport = (hookName: string, targetPackage: string) => {
    let existingImportPath: NodePath<t.ImportDeclaration> | undefined;

    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === targetPackage) {
          existingImportPath = path;
          path.stop();
        }
      },
    });

    if (!existingImportPath) {
      const newImportStr = `import { ${hookName} } from '${targetPackage}';\n`;
      let insertPos = 0;

      if (ast.program.body.length > 0) {
        insertPos = ast.program.body[0].start!;
      } else if (ast.program.directives && ast.program.directives.length > 0) {
        insertPos =
          ast.program.directives[ast.program.directives.length - 1].end!;

        if (fileCode[insertPos] === ';') insertPos++;

        textEdits.push({
          start: insertPos,
          end: insertPos,
          replacement: `\n${newImportStr}`,
        });
        return;
      }

      if (
        insertPos === 0 ||
        (ast.program.body.length > 0 &&
          insertPos === ast.program.body[0].start!)
      ) {
        textEdits.push({
          start: insertPos,
          end: insertPos,
          replacement: newImportStr,
        });
      }
    } else {
      const existingSpecifiers = existingImportPath.node.specifiers;
      const missingImport = !existingSpecifiers.some(
        (specifier) =>
          t.isImportSpecifier(specifier) &&
          t.isIdentifier(specifier.imported) &&
          specifier.imported.name === hookName
      );

      if (missingImport) {
        const importCode = fileCode.slice(
          existingImportPath.node.start!,
          existingImportPath.node.end!
        );
        const closingBraceIndex = importCode.lastIndexOf('}');

        if (closingBraceIndex !== -1) {
          const isCommaNeeded = !importCode
            .slice(0, closingBraceIndex)
            .trim()
            .endsWith(',');
          const absolutePos =
            existingImportPath.node.start! + closingBraceIndex;
          const prefix = isCommaNeeded ? ', ' : ' ';
          textEdits.push({
            start: absolutePos,
            end: absolutePos,
            replacement: `${prefix}${hookName} `,
          });
        }
      }
    }
  };

  if (needsUseIntlayer) injectImport('useIntlayer', effectivePackageName);

  if (needsGetIntlayer) injectImport('getIntlayer', 'intlayer');

  textEdits.sort((editA, editB) => {
    if (editB.start !== editA.start) return editB.start - editA.start;

    return editB.end - editA.end;
  });

  let formattedCode = fileCode;

  for (const edit of textEdits) {
    formattedCode =
      formattedCode.slice(0, edit.start) +
      edit.replacement +
      formattedCode.slice(edit.end);
  }

  if (save) {
    writeFileSync(filePath, formattedCode);

    const formatCommand = detectFormatCommand(configuration);

    if (formatCommand) {
      try {
        execSync(formatCommand.replace('{{file}}', filePath), {
          stdio: 'inherit',
          cwd: configuration.system.baseDir,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return { extractedContent, modifiedCode: formattedCode };
};
