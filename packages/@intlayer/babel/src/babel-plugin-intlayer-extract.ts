import { basename, dirname, extname } from 'node:path';
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import {
  ATTRIBUTES_TO_EXTRACT,
  shouldExtract as defaultShouldExtract,
  generateKey,
} from '@intlayer/chokidar';

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
  /** The variable name to use for content (content or _compContent if content is already used) */
  _contentVarName?: string;
  /** Set of function start positions that have extracted content (only inject hooks into these) */
  _functionsWithExtractedContent?: Set<number>;
};

/* ────────────────────────────────────────── helpers ─────────────────────── */

/**
 * Extract dictionary key from file path
 */
const extractDictionaryKeyFromPath = (filePath: string): string => {
  const ext = extname(filePath);
  let baseName = basename(filePath, ext);

  if (baseName === 'index') {
    baseName = basename(dirname(filePath));
  }

  // Convert to kebab-case
  const key = baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

  return `comp-${key}`;
};

/* ────────────────────────────────────────── plugin ──────────────────────── */

/**
 * Autonomous Babel plugin that extracts content and transforms JSX to use useIntlayer.
 *
 * This plugin:
 * 1. Scans files for extractable text (JSX text, attributes)
 * 2. Auto-injects useIntlayer import and hook call
 * 3. Reports extracted content via onExtract callback (for the compiler to write dictionaries)
 * 4. Replaces extractable strings with content references
 *
 * ## Input
 * ```tsx
 * export const MyComponent = () => {
 *   return <div>Hello World</div>;
 * };
 * ```
 *
 * ## Output
 * ```tsx
 * import { useIntlayer } from 'react-intlayer';
 *
 * export const MyComponent = () => {
 *   const content = useIntlayer('comp-my-component');
 *   return <div>{content.helloWorld}</div>;
 * };
 * ```
 *
 * ## When useIntlayer is already present
 *
 * If the component already has a `content` variable from an existing `useIntlayer` call,
 * the plugin will use `_compContent` to avoid naming conflicts:
 *
 * ### Input
 * ```tsx
 * export const Page = () => {
 *   const content = useIntlayer('page');
 *   return <div>{content.title} - Hello World</div>;
 * };
 * ```
 *
 * ### Output
 * ```tsx
 * export const Page = () => {
 *   const _compContent = useIntlayer('comp-page');
 *   const content = useIntlayer('page');
 *   return <div>{content.title} - {_compContent.helloWorld}</div>;
 * };
 * ```
 *
 * The extracted content is reported via the `onExtract` callback, allowing the
 * compiler to write the dictionary to disk separately:
 * ```json
 * // my-component.content.json (written by compiler)
 * {
 *   "key": "comp-my-component",
 *   "content": {
 *     "helloWorld": { "nodeType": "translation", "translation": { "en": "Hello World" } }
 *   }
 * }
 * ```
 */
export const intlayerExtractBabelPlugin = (babel: {
  types: typeof BabelTypes;
}): PluginObj<State> => {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-intlayer-extract',

    pre() {
      this._extractedContent = {};
      this._existingKeys = new Set();
      this._functionsWithExtractedContent = new Set();
      this._isIncluded = true;
      this._hasJSX = false;
      this._hasUseIntlayerImport = false;
      this._useIntlayerLocalName = 'useIntlayer';
      this._contentVarName = 'content'; // Will be updated in Program.enter if 'content' is already used

      const filename = this.file.opts.filename;

      // If filesList is provided, check if current file is included
      if (this.opts.filesList && filename) {
        // Normalize paths for comparison (handle potential path separator issues)
        const normalizedFilename = filename.replace(/\\/g, '/');
        const isIncluded = this.opts.filesList.some((f) => {
          const normalizedF = f.replace(/\\/g, '/');
          return normalizedF === normalizedFilename;
        });

        if (!isIncluded) {
          this._isIncluded = false;
          return;
        }
      }

      // Extract dictionary key from filename
      if (filename) {
        this._dictionaryKey = extractDictionaryKeyFromPath(filename);
      }
    },

    visitor: {
      /* Check if useIntlayer is already imported */
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
        }
      },

      /* Detect JSX elements to know this is a component file */
      JSXElement(_path, state) {
        if (!state._isIncluded) return;
        state._hasJSX = true;
      },

      /* Extract JSX text content */
      JSXText(path, state) {
        if (!state._isIncluded) return;

        const text = path.node.value;
        const shouldExtract = state.opts.shouldExtract ?? defaultShouldExtract;

        if (shouldExtract(text)) {
          const key = generateKey(text, state._existingKeys!);
          state._existingKeys!.add(key);

          // Collect extracted content
          state._extractedContent![key] = text.replace(/\s+/g, ' ').trim();

          // Track which function has extracted content
          const funcParent = path.getFunctionParent();
          if (funcParent?.node.start != null) {
            state._functionsWithExtractedContent!.add(funcParent.node.start);
          }

          // Replace with {content.key} or {_compContent.key}
          path.replaceWith(
            t.jsxExpressionContainer(
              t.memberExpression(
                t.identifier(state._contentVarName!),
                t.identifier(key),
                false
              )
            )
          );
        }
      },

      /* Extract JSX attributes */
      JSXAttribute(path, state) {
        if (!state._isIncluded) return;

        const name = path.node.name;

        if (!t.isJSXIdentifier(name)) return;

        const attrName = name.name;
        if (!ATTRIBUTES_TO_EXTRACT.includes(attrName)) return;

        const value = path.node.value;

        // Handle both direct StringLiteral and JSXExpressionContainer with StringLiteral
        // Case 1: attr="value" -> value is StringLiteral
        // Case 2: attr={"value"} -> value is JSXExpressionContainer containing StringLiteral
        let text: string | null = null;

        if (t.isStringLiteral(value)) {
          text = value.value;
        } else if (
          t.isJSXExpressionContainer(value) &&
          t.isStringLiteral(value.expression)
        ) {
          text = value.expression.value;
        }

        if (text === null) return;

        const shouldExtract = state.opts.shouldExtract ?? defaultShouldExtract;

        if (shouldExtract(text)) {
          const key = generateKey(text, state._existingKeys!);
          state._existingKeys!.add(key);

          // Collect extracted content
          state._extractedContent![key] = text.trim();

          // Track which function has extracted content
          const funcParent = path.getFunctionParent();
          if (funcParent?.node.start != null) {
            state._functionsWithExtractedContent!.add(funcParent.node.start);
          }

          // Replace with {content.key.value} or {_compContent.key.value}
          path.node.value = t.jsxExpressionContainer(
            t.memberExpression(
              t.memberExpression(
                t.identifier(state._contentVarName!),
                t.identifier(key),
                false
              ),
              t.identifier('value'),
              false
            )
          );
        }
      },

      /* Inject useIntlayer hook at program exit */
      Program: {
        enter(programPath, state) {
          if (!state._isIncluded) return;

          // Check if 'content' variable is already used in any function
          // If so, we'll use '_compContent' to avoid conflicts
          let contentVarUsed = false;

          programPath.traverse({
            VariableDeclarator(varPath) {
              if (
                t.isIdentifier(varPath.node.id) &&
                varPath.node.id.name === 'content'
              ) {
                contentVarUsed = true;
              }
            },
          });

          state._contentVarName = contentVarUsed ? '_compContent' : 'content';
        },

        exit(programPath, state) {
          if (!state._isIncluded) return;

          const extractedKeys = Object.keys(state._extractedContent!);
          const hasExtractedContent = extractedKeys.length > 0;

          // If no content was extracted, skip - don't inject useIntlayer for files with no extractable text
          if (!hasExtractedContent) return;

          // Only process JSX files (React components)
          if (!state._hasJSX) return;

          const defaultLocale = state.opts.defaultLocale;
          const packageName = state.opts.packageName;

          // Call the onExtract callback with extracted content
          // This will update the dictionary, adding new keys and removing unused ones
          if (
            state.opts.onExtract &&
            state._dictionaryKey &&
            hasExtractedContent
          ) {
            state.opts.onExtract({
              dictionaryKey: state._dictionaryKey,
              filePath: state.file.opts.filename!,
              content: { ...state._extractedContent! },
              locale: defaultLocale!,
            });
          }

          // Find insertion point (after directives and imports)
          const bodyPaths = programPath.get(
            'body'
          ) as NodePath<BabelTypes.Statement>[];

          // Add useIntlayer import if not already present
          if (!state._hasUseIntlayerImport) {
            const importDeclaration = t.importDeclaration(
              [
                t.importSpecifier(
                  t.identifier('useIntlayer'),
                  t.identifier('useIntlayer')
                ),
              ],
              t.stringLiteral(packageName!)
            );

            // Find the best position for import (after directives but before other imports)
            let importInsertPos = 0;
            for (const stmtPath of bodyPaths) {
              const stmt = stmtPath.node;
              if (
                t.isExpressionStatement(stmt) &&
                t.isStringLiteral(stmt.expression)
              ) {
                importInsertPos += 1;
                continue;
              }
              break;
            }

            programPath.node.body.splice(importInsertPos, 0, importDeclaration);
          }

          // Now inject useIntlayer hook only into functions that have extracted content
          const functionsWithContent = state._functionsWithExtractedContent!;

          programPath.traverse({
            // Handle function declarations
            FunctionDeclaration(funcPath) {
              // Only inject if this function has extracted content
              if (
                funcPath.node.start != null &&
                functionsWithContent.has(funcPath.node.start)
              ) {
                injectHookIntoFunction(funcPath, state, t);
              }
            },

            // Handle arrow functions and function expressions in variable declarations
            VariableDeclarator(varPath) {
              const init = varPath.node.init;
              if (
                t.isArrowFunctionExpression(init) ||
                t.isFunctionExpression(init)
              ) {
                // Only inject if this function has extracted content
                if (
                  init.start != null &&
                  functionsWithContent.has(init.start)
                ) {
                  injectHookIntoArrowOrExpression(
                    varPath as NodePath<BabelTypes.VariableDeclarator>,
                    init,
                    state,
                    t
                  );
                }
              }
            },
          });
        },
      },
    },
  };
};

/**
 * Inject useIntlayer hook into a function declaration
 */
const injectHookIntoFunction = (
  funcPath: NodePath<BabelTypes.FunctionDeclaration>,
  state: State,
  t: typeof BabelTypes
) => {
  const body = funcPath.node.body;
  if (!t.isBlockStatement(body)) return;

  // Check if this function returns JSX
  let returnsJSX = false;
  funcPath.traverse({
    ReturnStatement(returnPath) {
      const arg = returnPath.node.argument;
      if (t.isJSXElement(arg) || t.isJSXFragment(arg)) {
        returnsJSX = true;
      }
    },
  });

  if (!returnsJSX) return;

  const contentVarName = state._contentVarName!;

  // Check if hook with this specific variable name is already injected
  const hasHook = body.body.some(
    (stmt) =>
      t.isVariableDeclaration(stmt) &&
      stmt.declarations.some(
        (decl) =>
          t.isIdentifier(decl.id) &&
          decl.id.name === contentVarName &&
          t.isCallExpression(decl.init) &&
          t.isIdentifier(decl.init.callee) &&
          decl.init.callee.name === state._useIntlayerLocalName
      )
  );

  if (hasHook) return;

  // Inject: const content = useIntlayer('dictionary-key');
  // or: const _compContent = useIntlayer('comp-dictionary-key');
  const hookCall = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(contentVarName),
      t.callExpression(t.identifier(state._useIntlayerLocalName!), [
        t.stringLiteral(state._dictionaryKey!),
      ])
    ),
  ]);

  body.body.unshift(hookCall);
};

/**
 * Inject useIntlayer hook into an arrow function or function expression
 */
const injectHookIntoArrowOrExpression = (
  varPath: NodePath<BabelTypes.VariableDeclarator>,
  init: BabelTypes.ArrowFunctionExpression | BabelTypes.FunctionExpression,
  state: State,
  t: typeof BabelTypes
) => {
  const body = init.body;
  const contentVarName = state._contentVarName!;

  // If the body is JSX directly (implicit return), wrap it in a block
  if (t.isJSXElement(body) || t.isJSXFragment(body)) {
    // Transform: () => <div>...</div>
    // To: () => { const content = useIntlayer('key'); return <div>...</div>; }
    // or: () => { const _compContent = useIntlayer('comp-key'); return <div>...</div>; }
    const hookCall = t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(contentVarName),
        t.callExpression(t.identifier(state._useIntlayerLocalName!), [
          t.stringLiteral(state._dictionaryKey!),
        ])
      ),
    ]);

    const returnStmt = t.returnStatement(body);
    init.body = t.blockStatement([hookCall, returnStmt]);
    return;
  }

  if (!t.isBlockStatement(body)) return;

  // Check if this function returns JSX
  let returnsJSX = false;
  varPath.traverse({
    ReturnStatement(returnPath) {
      const arg = returnPath.node.argument;
      if (t.isJSXElement(arg) || t.isJSXFragment(arg)) {
        returnsJSX = true;
      }
    },
  });

  if (!returnsJSX) return;

  // Check if hook with this specific variable name is already injected
  const hasHook = body.body.some(
    (stmt) =>
      t.isVariableDeclaration(stmt) &&
      stmt.declarations.some(
        (decl) =>
          t.isIdentifier(decl.id) &&
          decl.id.name === contentVarName &&
          t.isCallExpression(decl.init) &&
          t.isIdentifier(decl.init.callee) &&
          decl.init.callee.name === state._useIntlayerLocalName
      )
  );

  if (hasHook) return;

  // Inject: const content = useIntlayer('dictionary-key');
  // or: const _compContent = useIntlayer('comp-dictionary-key');
  const hookCall = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(contentVarName),
      t.callExpression(t.identifier(state._useIntlayerLocalName!), [
        t.stringLiteral(state._dictionaryKey!),
      ])
    ),
  ]);

  body.body.unshift(hookCall);
};
