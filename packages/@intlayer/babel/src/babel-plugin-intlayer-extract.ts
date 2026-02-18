import { basename, dirname, extname } from 'node:path';
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import {
  ATTRIBUTES_TO_EXTRACT,
  shouldExtract as defaultShouldExtract,
  generateKey,
} from '@intlayer/chokidar/cli';

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

      const filename = this.file.opts.filename;
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
          if (!state._isIncluded || !state._hasJSX) return;

          const extractionTargets: {
            path: NodePath<any>;
            key: string;
            isAttribute: boolean;
          }[] = [];
          const functionsToInject = new Set<NodePath<BabelTypes.Function>>();
          const shouldExtract =
            state.opts.shouldExtract ?? defaultShouldExtract;

          // Pass 1: Identification (Read only)
          programPath.traverse({
            JSXText(path) {
              const text = path.node.value;
              if (shouldExtract(text)) {
                const key = generateKey(text, state._existingKeys!);
                state._existingKeys!.add(key);
                state._extractedContent![key] = text
                  .replace(/\s+/g, ' ')
                  .trim();
                extractionTargets.push({ path, key, isAttribute: false });
                const func = path.getFunctionParent();
                if (func)
                  functionsToInject.add(func as NodePath<BabelTypes.Function>);
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
                const key = generateKey(text, state._existingKeys!);
                state._existingKeys!.add(key);
                state._extractedContent![key] = text.trim();
                extractionTargets.push({ path, key, isAttribute: true });
                const func = path.getFunctionParent();
                if (func)
                  functionsToInject.add(func as NodePath<BabelTypes.Function>);
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
                const key = generateKey(text, state._existingKeys!);
                state._existingKeys!.add(key);
                state._extractedContent![key] = text.trim();
                extractionTargets.push({ path, key, isAttribute: false });
                const func = path.getFunctionParent();
                if (func)
                  functionsToInject.add(func as NodePath<BabelTypes.Function>);
              }
            },
          });

          if (extractionTargets.length === 0) return;

          // Pass 2: Extraction (Modification)
          for (const { path, key, isAttribute } of extractionTargets) {
            if (isAttribute) {
              const member = t.memberExpression(
                t.identifier(state._contentVarName!),
                t.identifier(key)
              );
              path.node.value = t.jsxExpressionContainer(
                t.memberExpression(member, t.identifier('value'))
              );
            } else if (path.isJSXText()) {
              path.replaceWith(
                t.jsxExpressionContainer(
                  t.memberExpression(
                    t.identifier(state._contentVarName!),
                    t.identifier(key)
                  )
                )
              );
            } else {
              path.replaceWith(
                t.memberExpression(
                  t.identifier(state._contentVarName!),
                  t.identifier(key)
                )
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

          // Pass 4: Imports
          if (needsUseIntlayer || needsGetIntlayer) {
            const pkg = state.opts.packageName!;
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
                  t.stringLiteral(pkg)
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
                  t.stringLiteral(pkg)
                )
              );
            }
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

  if (!t.isBlockStatement(node.body)) {
    const unwrapped = unwrapParentheses(node.body, t);
    const isJSX = t.isJSXElement(unwrapped) || t.isJSXFragment(unwrapped);
    const hookName = isJSX
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
    return isJSX ? 'hook' : 'core';
  }

  let returnsJSX = false;
  path.traverse({
    ReturnStatement(p) {
      if (p.node.argument) {
        const unwrapped = unwrapParentheses(p.node.argument, t);
        if (t.isJSXElement(unwrapped) || t.isJSXFragment(unwrapped))
          returnsJSX = true;
      }
    },
  });

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
