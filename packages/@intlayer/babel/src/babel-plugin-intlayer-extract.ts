import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import generator from '@babel/generator';
import type * as BabelTypes from '@babel/types';
import {
  ATTRIBUTES_TO_EXTRACT,
  shouldExtract as defaultShouldExtract,
  generateKey,
} from '@intlayer/chokidar/cli';

// Set this to true to enable debug logs
const DEBUG_LOG = false;

type ExtractedContent = Record<string, string>;

/**
 * Extracted content result from a file transformation
 */
export type ExtractResult = {
  /** Dictionary key derived from the file path */
  dictionaryKey: string;
  /** File path that was processed */
  filePath: string;
  /** Extracted content key-value pairs */
  content: ExtractedContent;
  /** Default locale used */
  locale: string;
};

/**
 * Options for the extraction Babel plugin
 */
export type ExtractPluginOptions = {
  /**
   * The default locale for the extracted content
   */
  defaultLocale?: string;
  /**
   * The package to import useIntlayer from
   * @default 'react-intlayer'
   */
  packageName?: string;
  /**
   * Files list to traverse. If provided, only files in this list will be processed.
   */
  filesList?: string[];
  /**
   * Custom function to determine if a string should be extracted
   */
  shouldExtract?: (text: string) => boolean;
  /**
   * Callback function called when content is extracted from a file.
   * This allows the compiler to capture the extracted content and write it to files.
   * The dictionary will be updated: new keys added, unused keys removed.
   */
  onExtract?: (result: ExtractResult) => void;
};

type State = PluginPass & {
  opts: ExtractPluginOptions;
  /** Extracted content from this file */
  _extractedContent?: ExtractedContent;
  /** Set of existing keys to avoid duplicates */
  _existingKeys?: Set<string>;
  /** The dictionary key for this file */
  _dictionaryKey?: string;
  /** whether the current file is included in the filesList */
  _isIncluded?: boolean;
  /** Whether this file has JSX (React component) */
  _hasJSX?: boolean;
  /** Whether we already have useIntlayer imported */
  _hasUseIntlayerImport?: boolean;
  /** The local name for useIntlayer (in case it's aliased) */
  _useIntlayerLocalName?: string;
  /** Whether we already have getIntlayer imported */
  _hasGetIntlayerImport?: boolean;
  /** The local name for getIntlayer (in case it's aliased) */
  _getIntlayerLocalName?: string;
  /** The variable name to use for content (content or _compContent if content is already used) */
  _contentVarName?: string;
  /** Whether the file has 'use client' directive */
  _isClient?: boolean;
  /** Whether there is extracted content at the top level (not in a function) */
  _hasTopLevelContent?: boolean;
};
const extractDictionaryKeyFromPath = (filePath: string): string => {
  const ext = extname(filePath);
  let baseName = basename(filePath, ext);
  if (baseName === 'index') baseName = basename(dirname(filePath));
  return `comp-${baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()}`;
};

const detectPackageName = (dir: string): string => {
  let currentDir = dir;
  while (true) {
    const pkgPath = join(currentDir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        if (
          pkg.dependencies?.['next-intlayer'] ||
          pkg.devDependencies?.['next-intlayer']
        ) {
          return 'next-intlayer';
        }

        if (
          pkg.dependencies?.['react-intlayer'] ||
          pkg.devDependencies?.['react-intlayer']
        ) {
          return 'react-intlayer';
        }

        if (
          pkg.dependencies?.['preact-intlayer'] ||
          pkg.devDependencies?.['preact-intlayer']
        ) {
          return 'preact-intlayer';
        }
      } catch {}
    }
    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }
  return 'react-intlayer';
};

const unwrapParentheses = (
  node: BabelTypes.Node,
  t: typeof BabelTypes
): BabelTypes.Node => {
  let current = node;
  while (t.isParenthesizedExpression(current)) {
    current = current.expression;
  }
  return current;
};

const isReactComponent = (
  funcPath: NodePath<BabelTypes.Function>,
  t: typeof BabelTypes
): boolean => {
  const node = funcPath.node;
  if (!t.isBlockStatement(node.body)) {
    const unwrapped = unwrapParentheses(node.body, t);
    return t.isJSXElement(unwrapped) || t.isJSXFragment(unwrapped);
  }
  let returnsJSX = false;
  funcPath.traverse({
    Function(p) {
      p.skip();
    },
    ReturnStatement(p) {
      if (p.node.argument) {
        const unwrapped = unwrapParentheses(p.node.argument, t);
        if (t.isJSXElement(unwrapped) || t.isJSXFragment(unwrapped)) {
          returnsJSX = true;
        }
      }
    },
  });
  return returnsJSX;
};

const findTargetFunction = (
  startPath: NodePath<any>,
  t: typeof BabelTypes
): NodePath<BabelTypes.Function> | null => {
  const closestFunc =
    startPath.getFunctionParent() as NodePath<BabelTypes.Function> | null;
  if (!closestFunc) return null;

  let currentFunc: NodePath<BabelTypes.Function> | null = closestFunc;
  while (currentFunc) {
    if (isReactComponent(currentFunc, t)) {
      return currentFunc;
    }
    currentFunc =
      currentFunc.getFunctionParent() as NodePath<BabelTypes.Function> | null;
  }
  return closestFunc;
};

export const intlayerExtractBabelPlugin = (babel: {
  types: typeof BabelTypes;
}): PluginObj<State> => {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-intlayer-extract',

    pre() {
      this._extractedContent = {};
      this._existingKeys = new Set();
      this._isIncluded = true;
      this._hasJSX = false;
      this._hasUseIntlayerImport = false;
      this._useIntlayerLocalName = 'useIntlayer';
      this._hasGetIntlayerImport = false;
      this._getIntlayerLocalName = 'getIntlayer';
      this._contentVarName = 'content';
      this._isClient = false;
      this._hasTopLevelContent = false;

      const filename = this.file.opts.filename;

      if (!this.opts.packageName) {
        const searchDir = filename ? dirname(filename) : process.cwd();
        this.opts.packageName = detectPackageName(searchDir);
      }

      if (this.opts.filesList && filename) {
        const normalizedFilename = filename.replace(/\\/g, '/');
        this._isIncluded = this.opts.filesList.some(
          (f) => f.replace(/\\/g, '/') === normalizedFilename
        );
      }
      if (filename)
        this._dictionaryKey = extractDictionaryKeyFromPath(filename);
    },

    visitor: {
      ImportDeclaration(path, state) {
        if (!state._isIncluded) return;

        for (const spec of path.node.specifiers) {
          if (!t.isImportSpecifier(spec)) continue;
          const importedName = t.isIdentifier(spec.imported)
            ? spec.imported.name
            : (spec.imported as BabelTypes.StringLiteral).value;
          if (importedName === 'useIntlayer') {
            state._hasUseIntlayerImport = true;
            state._useIntlayerLocalName = spec.local.name;
          }
          if (importedName === 'getIntlayer') {
            state._hasGetIntlayerImport = true;
            state._getIntlayerLocalName = spec.local.name;
          }
        }
      },

      JSXElement(_path, state) {
        if (!state._isIncluded) return;
        state._hasJSX = true;
      },

      Program: {
        enter(programPath, state) {
          if (!state._isIncluded) return;

          // Check for 'use client' directive
          state._isClient = programPath.node.directives.some(
            (d) => d.value.value === 'use client'
          );

          let contentVarUsed = false;
          programPath.traverse({
            VariableDeclarator(varPath) {
              if (
                t.isIdentifier(varPath.node.id) &&
                varPath.node.id.name === 'content'
              )
                contentVarUsed = true;
            },
          });
          state._contentVarName = contentVarUsed ? '_compContent' : 'content';
        },

        exit(programPath, state) {
          if (!state._isIncluded || !state._dictionaryKey) return;

          const extractionTargets: {
            path: NodePath<any>;
            key: string;
            isAttribute: boolean;
          }[] = [];
          const functionsToInject = new Set<NodePath<BabelTypes.Function>>();
          const shouldExtract =
            state.opts.shouldExtract ?? defaultShouldExtract;

          const addTarget = (path: NodePath<any>) => {
            const func = findTargetFunction(path, t);
            if (func) {
              functionsToInject.add(func);
            } else {
              state._hasTopLevelContent = true;
            }
          };

          // Pass 1: Identification (Read only)
          programPath.traverse({
            JSXText(path) {
              const rawText = path.node.value;
              if (shouldExtract(rawText)) {
                const text = rawText.replace(/\s+/g, ' ').trim();
                let key = Object.keys(state._extractedContent!).find(
                  (k) => state._extractedContent![k] === text
                );

                if (!key) {
                  key = generateKey(text, state._existingKeys!);
                  state._existingKeys!.add(key);
                  state._extractedContent![key] = text;
                }

                extractionTargets.push({ path, key, isAttribute: false });
                addTarget(path);
              }
            },
            JSXAttribute(path) {
              const attrName = path.node.name;
              if (!t.isJSXIdentifier(attrName)) return;
              const isKey = attrName.name === 'key';
              if (!ATTRIBUTES_TO_EXTRACT.includes(attrName.name) && !isKey)
                return;

              const value = path.node.value;
              let text: string | null = null;
              if (t.isStringLiteral(value)) text = value.value;
              else if (
                t.isJSXExpressionContainer(value) &&
                t.isStringLiteral(value.expression)
              )
                text = value.expression.value;

              if (text && shouldExtract(text)) {
                const cleanText = text.trim();
                let key = Object.keys(state._extractedContent!).find(
                  (k) => state._extractedContent![k] === cleanText
                );

                if (!key) {
                  key = generateKey(cleanText, state._existingKeys!);
                  state._existingKeys!.add(key);
                  state._extractedContent![key] = cleanText;
                }

                extractionTargets.push({ path, key, isAttribute: true });
                addTarget(path);
              }
            },
            StringLiteral(path) {
              const parent = path.parentPath;
              if (
                parent.isJSXAttribute() ||
                parent.isImportDeclaration() ||
                parent.isExportDeclaration() ||
                parent.isImportSpecifier()
              )
                return;
              if (parent.isObjectProperty() && path.key === 'key') return;
              if (parent.isMemberExpression() && path.key === 'property')
                return;
              if (parent.isCallExpression()) {
                const callee = (parent.node as BabelTypes.CallExpression)
                  .callee;
                if (
                  (t.isMemberExpression(callee) &&
                    t.isIdentifier(callee.object) &&
                    callee.object.name === 'console') ||
                  (t.isIdentifier(callee) &&
                    (callee.name === state._useIntlayerLocalName ||
                      callee.name === state._getIntlayerLocalName ||
                      callee.name === 'require')) ||
                  callee.type === 'Import'
                )
                  return;
              }

              const text = path.node.value;
              if (shouldExtract(text)) {
                const cleanText = text.trim();
                let key = Object.keys(state._extractedContent!).find(
                  (k) => state._extractedContent![k] === cleanText
                );

                if (!key) {
                  key = generateKey(cleanText, state._existingKeys!);
                  state._existingKeys!.add(key);
                  state._extractedContent![key] = cleanText;
                }

                extractionTargets.push({ path, key, isAttribute: false });
                addTarget(path);
              }
            },
          });

          if (extractionTargets.length === 0) return;

          // Pass 2: Extraction (Modification)
          for (const { path, key, isAttribute } of extractionTargets) {
            let isHook = false;
            let hookDecided = false;

            const binding = path.scope.getBinding(state._contentVarName!);
            if (
              binding &&
              t.isVariableDeclarator(binding.path.node) &&
              t.isCallExpression(binding.path.node.init) &&
              t.isIdentifier(binding.path.node.init.callee)
            ) {
              if (
                binding.path.node.init.callee.name ===
                state._useIntlayerLocalName
              ) {
                isHook = true;
                hookDecided = true;
              } else if (
                binding.path.node.init.callee.name ===
                state._getIntlayerLocalName
              ) {
                isHook = false;
                hookDecided = true;
              }
            }

            if (!hookDecided) {
              const func = findTargetFunction(path, t);
              if (func) {
                isHook = isReactComponent(func, t);
              }
            }

            if (isAttribute) {
              const member = t.optionalMemberExpression(
                t.identifier(state._contentVarName!),
                t.stringLiteral(key),
                true,
                true
              );
              path.node.value = t.jsxExpressionContainer(
                isHook
                  ? t.optionalMemberExpression(
                      member,
                      t.identifier('value'),
                      false,
                      true
                    )
                  : member
              );
            } else if (path.isJSXText()) {
              path.replaceWith(
                t.jsxExpressionContainer(
                  t.optionalMemberExpression(
                    t.identifier(state._contentVarName!),
                    t.stringLiteral(key),
                    true,
                    true
                  )
                )
              );
            } else {
              const member = t.optionalMemberExpression(
                t.identifier(state._contentVarName!),
                t.stringLiteral(key),
                true,
                true
              );
              path.replaceWith(
                isHook
                  ? t.optionalMemberExpression(
                      member,
                      t.identifier('value'),
                      false,
                      true
                    )
                  : member
              );
            }
          }

          // Report
          if (state.opts.onExtract && state._dictionaryKey) {
            state.opts.onExtract({
              dictionaryKey: state._dictionaryKey,
              filePath: state.file.opts.filename!,
              content: { ...state._extractedContent! },
              locale: state.opts.defaultLocale!,
            });
          }

          // Pass 3: Injection
          let needsUseIntlayer = false;
          let needsGetIntlayer = false;

          for (const funcPath of functionsToInject) {
            const type = injectHook(funcPath, state, t);
            if (type === 'hook') needsUseIntlayer = true;
            if (type === 'core') needsGetIntlayer = true;
          }

          if (state._hasTopLevelContent) {
            needsGetIntlayer = true;
            const contentVarName = state._contentVarName!;
            const dictionaryKey = state._dictionaryKey!;
            const coreName = state._getIntlayerLocalName!;

            // Find injection position (after imports)
            let pos = 0;
            const body = programPath.node.body;
            while (
              pos < body.length &&
              (t.isImportDeclaration(body[pos]) ||
                (t.isExpressionStatement(body[pos]) &&
                  t.isStringLiteral(
                    (body[pos] as BabelTypes.ExpressionStatement).expression
                  )))
            )
              pos++;

            programPath.node.body.splice(
              pos,
              0,
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.identifier(contentVarName),
                  t.callExpression(t.identifier(coreName), [
                    t.stringLiteral(dictionaryKey),
                  ])
                ),
              ])
            );
          }

          // Pass 4: Imports
          if (needsUseIntlayer || needsGetIntlayer) {
            let hookPkg = state.opts.packageName ?? 'react-intlayer';
            const corePkg = 'intlayer';

            // Handle next-intlayer server/client split
            if (hookPkg === 'next-intlayer' && !state._isClient) {
              hookPkg = `${hookPkg}/server`;
            }

            let pos = 0;
            const body = programPath.node.body;
            while (
              pos < body.length &&
              t.isExpressionStatement(body[pos]) &&
              t.isStringLiteral(
                (body[pos] as BabelTypes.ExpressionStatement).expression
              )
            )
              pos++;

            if (needsUseIntlayer && !state._hasUseIntlayerImport) {
              body.splice(
                pos++,
                0,
                t.importDeclaration(
                  [
                    t.importSpecifier(
                      t.identifier('useIntlayer'),
                      t.identifier('useIntlayer')
                    ),
                  ],
                  t.stringLiteral(hookPkg)
                )
              );
            }
            if (needsGetIntlayer && !state._hasGetIntlayerImport) {
              body.splice(
                pos,
                0,
                t.importDeclaration(
                  [
                    t.importSpecifier(
                      t.identifier('getIntlayer'),
                      t.identifier('getIntlayer')
                    ),
                  ],
                  t.stringLiteral(corePkg)
                )
              );
            }
          }

          if (DEBUG_LOG) {
            console.log(
              '[babel-plugin-intlayer-extract] Transformed:',
              state.file.opts.filename
            );

            console.log(
              generator(programPath.node, { retainLines: true }).code
            );
          }
        },
      },
    },
  };
};

const injectHook = (
  path: NodePath<BabelTypes.Function>,
  state: State,
  t: typeof BabelTypes
): 'hook' | 'core' => {
  const node = path.node;
  const contentVarName = state._contentVarName!;
  const dictionaryKey = state._dictionaryKey!;
  const returnsJSX = isReactComponent(path, t);

  if (!t.isBlockStatement(node.body)) {
    const hookName = returnsJSX
      ? state._useIntlayerLocalName!
      : state._getIntlayerLocalName!;
    const hookCall = t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(contentVarName),
        t.callExpression(t.identifier(hookName), [
          t.stringLiteral(dictionaryKey),
        ])
      ),
    ]);
    node.body = t.blockStatement([
      hookCall,
      t.returnStatement(node.body as BabelTypes.Expression),
    ]);
    return returnsJSX ? 'hook' : 'core';
  }

  const hookName = returnsJSX
    ? state._useIntlayerLocalName!
    : state._getIntlayerLocalName!;
  const hasHook = node.body.body.some(
    (s) =>
      t.isVariableDeclaration(s) &&
      s.declarations.some(
        (d) => t.isIdentifier(d.id) && d.id.name === contentVarName
      )
  );

  if (!hasHook) {
    node.body.body.unshift(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(contentVarName),
          t.callExpression(t.identifier(hookName), [
            t.stringLiteral(dictionaryKey),
          ])
        ),
      ])
    );
  }

  return returnsJSX ? 'hook' : 'core';
};
