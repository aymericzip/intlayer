import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import type { PluginObj, PluginPass } from '@babel/core';
import _generate from '@babel/generator';
import type { NodePath } from '@babel/traverse';
import type * as BabelTypes from '@babel/types';
import {
  detectFormatCommand,
  extractDictionaryKeyFromPath,
} from '@intlayer/chokidar/cli';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/client';
import { getConfiguration } from '@intlayer/config/node';
import {
  type BabelReplacement,
  extractBabelContentForComponents,
} from './extract/babelProcessor';
import { detectPackageName } from './extract/utils';

const generate = ((_generate as any).default ?? _generate) as typeof _generate;

// Set this to true to enable debug logs
const DEBUG_LOG = false;

/**
 * Extracted content result from a file transformation
 */
export type ExtractResult = {
  /** Dictionary key derived from the file path */
  dictionaryKey: string;
  /** File path that was processed */
  filePath: string;
  /** Extracted content key-value pairs */
  content: Record<string, string>;
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

  /**
   * Whether the extraction compiler is enabled.
   * If false, the plugin will not process the file.
   */
  enabled?: boolean;

  /**
   * Prefix for the extracted dictionary keys.
   */
  prefix?: string;

  /**
   * Indicates if the components should be saved after being transformed.
   */
  saveComponents?: boolean;
};

type State = PluginPass & {
  opts: ExtractPluginOptions;
  /** The dictionary key for this file */
  _dictionaryKey?: string;
  /** whether the current file is included in the filesList */
  _isIncluded?: boolean;
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
};

export const intlayerExtractBabelPlugin = (babel: {
  types: typeof BabelTypes;
}): PluginObj<State> => {
  const { types: t } = babel;
  const config = getConfiguration();
  const appLogger = getAppLogger(config);

  return {
    name: 'babel-plugin-intlayer-extract',

    pre() {
      this._isIncluded = true;
      this._hasUseIntlayerImport = false;
      this._useIntlayerLocalName = 'useIntlayer';
      this._hasGetIntlayerImport = false;
      this._getIntlayerLocalName = 'getIntlayer';
      this._contentVarName = 'content';
      this._isClient = false;

      const filename = this.file.opts.filename;

      if (!this.opts.packageName) {
        const searchDir = filename ? dirname(filename) : process.cwd();
        this.opts.packageName = detectPackageName(searchDir);
      }

      // Check if extraction is enabled
      const isEnabled = this.opts.enabled ?? true;

      if (!isEnabled) {
        this._isIncluded = false;
        return;
      }

      if (this.opts.filesList && filename) {
        const normalizedFilename = filename.replace(/\\/g, '/');
        this._isIncluded = this.opts.filesList.some(
          (f) => f.replace(/\\/g, '/') === normalizedFilename
        );
      }

      if (filename)
        this._dictionaryKey = extractDictionaryKeyFromPath(
          filename,
          this.opts.prefix
        );
    },

    visitor: {
      // Track existing useIntlayer / getIntlayer imports so we don't double-add them
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

      Program: {
        enter(programPath, state) {
          if (!state._isIncluded) return;

          // Check for 'use client' directive
          state._isClient = programPath.node.directives.some(
            (d) => d.value.value === 'use client'
          );

          // Detect if 'content' variable name is already used so we pick an alternative
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

          const fileCode = this.file.code;
          const configuration = getConfiguration();

          // ---------- 1. Extract using the shared babelProcessor logic ----------
          const existingKeys = new Set<string>();

          const {
            extractedContent,
            replacements,
            componentsNeedingHooks,
            componentKeyMap,
            hookMap,
          } = extractBabelContentForComponents(
            state.file.ast,
            fileCode,
            existingKeys,
            state._dictionaryKey!,
            configuration,
            state.file.opts.filename ?? '',
            {}
          );

          if (replacements.length === 0) return;

          // ---------- 2. Flatten extracted content for reporting ----------
          const flatContent: Record<string, string> = {};
          for (const group of Object.values(extractedContent)) {
            Object.assign(flatContent, group);
          }

          // ---------- 3. Report to onExtract callback ----------
          if (state.opts.onExtract && state._dictionaryKey) {
            state.opts.onExtract({
              dictionaryKey: state._dictionaryKey,
              filePath: state.file.opts.filename!,
              content: flatContent,
              locale: state.opts.defaultLocale!,
            });
          }

          // ---------- 4. Apply AST mutations (replacements) ----------
          const contentVarName = state._contentVarName!;

          const getProvidingHookType = (
            path: NodePath
          ): 'useIntlayer' | 'getIntlayer' => {
            // Walk up to find the owning component and determine the hook type
            let current: NodePath | null = path;
            while (current) {
              if (hookMap.has(current.node as BabelTypes.Node)) {
                return hookMap.get(current.node as BabelTypes.Node)!;
              }
              current = current.parentPath;
            }
            return 'useIntlayer';
          };

          for (const {
            path,
            key,
            type,
          } of replacements as BabelReplacement[]) {
            const hookType = getProvidingHookType(path);
            const isHook = hookType === 'useIntlayer';

            if (type === 'jsx-attribute' && path.isJSXAttribute()) {
              const value = path.node.value;
              if (value) {
                const member = t.optionalMemberExpression(
                  t.identifier(contentVarName),
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
              }
            } else if (type === 'jsx-text' && path.isJSXText()) {
              path.replaceWith(
                t.jsxExpressionContainer(
                  t.optionalMemberExpression(
                    t.identifier(contentVarName),
                    t.stringLiteral(key),
                    true,
                    true
                  )
                )
              );
            } else if (type === 'string-literal' && path.isStringLiteral()) {
              const member = t.optionalMemberExpression(
                t.identifier(contentVarName),
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
            } else if (
              (type === 'jsx-text-combined' || type === 'jsx-insertion') &&
              (path.isJSXElement() || path.isJSXFragment())
            ) {
              // For combined/insertion types, replace the children with a single expression
              const accessNode = t.optionalMemberExpression(
                t.identifier(contentVarName),
                t.stringLiteral(key),
                true,
                true
              );
              const node = path.node;
              node.children = [t.jsxExpressionContainer(accessNode)];
            }
          }

          // ---------- 5. Inject useIntlayer / getIntlayer calls into functions ----------
          let needsUseIntlayer = false;
          let needsGetIntlayer = false;

          for (const componentPath of componentsNeedingHooks) {
            const finalKey = componentKeyMap.get(
              componentPath.node as BabelTypes.Node
            )!;
            const hook =
              hookMap.get(componentPath.node as BabelTypes.Node) ||
              'useIntlayer';

            if (hook === 'useIntlayer') needsUseIntlayer = true;
            if (hook === 'getIntlayer') needsGetIntlayer = true;

            const hookLocalName =
              hook === 'useIntlayer'
                ? state._useIntlayerLocalName!
                : state._getIntlayerLocalName!;

            const hookCall = t.variableDeclaration('const', [
              t.variableDeclarator(
                t.identifier(contentVarName),
                t.callExpression(t.identifier(hookLocalName), [
                  t.stringLiteral(finalKey),
                ])
              ),
            ]);

            const funcNode = (componentPath as NodePath<BabelTypes.Function>)
              .node;

            if (!t.isBlockStatement(funcNode.body)) {
              // Arrow function with expression body — wrap in block
              funcNode.body = t.blockStatement([
                hookCall,
                t.returnStatement(funcNode.body as BabelTypes.Expression),
              ]);
            } else {
              const hasHookAlready = funcNode.body.body.some(
                (s) =>
                  t.isVariableDeclaration(s) &&
                  s.declarations.some(
                    (d) => t.isIdentifier(d.id) && d.id.name === contentVarName
                  )
              );
              if (!hasHookAlready) {
                funcNode.body.body.unshift(hookCall);
              }
            }
          }

          // ---------- 6. Add import statements ----------
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

          // ---------- 7. Save component file if requested ----------
          if (state.opts.saveComponents && state.file.opts.filename) {
            try {
              const transformedCode = generate(programPath.node, {
                retainLines: true,
              }).code;

              writeFileSync(state.file.opts.filename, transformedCode, 'utf-8');

              const basedir = config.content?.baseDir ?? process.cwd();
              const relativePath = relative(basedir, state.file.opts.filename);

              appLogger(
                `${colorize('Compiler:', ANSIColors.GREY_DARK)} Saved component: ${colorizePath(relativePath)}`,
                { level: 'info' }
              );

              const formatCommand = detectFormatCommand(config);

              if (formatCommand) {
                try {
                  execSync(
                    formatCommand.replace('{{file}}', state.file.opts.filename),
                    {
                      stdio: 'ignore',
                      cwd: basedir,
                    }
                  );
                } catch (error) {
                  appLogger(`Extractor formatting error: ${String(error)}`, {
                    level: 'error',
                  });
                }
              }
            } catch (err: any) {
              appLogger(`Extractor plugin error: ${String(err)}`, {
                level: 'error',
              });
            }
          }

          if (DEBUG_LOG) {
            const basedir = config.content?.baseDir ?? process.cwd();
            const relativePath = state.file.opts.filename
              ? relative(basedir, state.file.opts.filename)
              : 'unknown';

            appLogger(
              `${colorize('Compiler:', ANSIColors.GREY_DARK)} Transformed: ${colorizePath(relativePath)}\n${generate(programPath.node, { retainLines: false }).code}`,
              { level: 'debug' }
            );
          }
        },
      },
    },
  };
};
