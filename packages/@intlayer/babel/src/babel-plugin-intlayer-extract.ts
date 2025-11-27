import { basename, dirname, extname } from 'node:path';
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';

/* ────────────────────────────────────────── constants ───────────────────── */

/**
 * Attributes that should be extracted for localization
 */
const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
];

/* ────────────────────────────────────────── types ───────────────────────── */

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

type State = PluginPass & {
  opts: {
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
};

/* ────────────────────────────────────────── helpers ─────────────────────── */

/**
 * Default function to determine if a string should be extracted
 */
const defaultShouldExtract = (text: string): boolean => {
  const trimmed = text.trim();
  if (!trimmed) return false;
  // Must contain at least one space (likely a sentence/phrase)
  if (!trimmed.includes(' ')) return false;
  // Must start with a capital letter
  if (!/^[A-Z]/.test(trimmed)) return false;
  // Filter out template logic identifiers
  if (trimmed.startsWith('{') || trimmed.startsWith('v-')) return false;
  return true;
};

/**
 * Generate a unique key from text
 */
const generateKey = (text: string, existingKeys: Set<string>): string => {
  const maxWords = 5;
  let key = text
    .replace(/\s+/g, ' ')
    .replace(/_+/g, ' ')
    .replace(/-+/g, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, maxWords)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  if (!key) key = 'content';
  if (existingKeys.has(key)) {
    let i = 1;
    while (existingKeys.has(`${key}${i}`)) i++;
    key = `${key}${i}`;
  }
  return key;
};

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
 *   const content = useIntlayer('my-component');
 *   return <div>{content.helloWorld}</div>;
 * };
 * ```
 *
 * The extracted content is reported via the `onExtract` callback, allowing the
 * compiler to write the dictionary to disk separately:
 * ```json
 * // my-component.content.json (written by compiler)
 * {
 *   "key": "my-component",
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
      this._isIncluded = true;
      this._hasJSX = false;
      this._hasUseIntlayerImport = false;
      this._useIntlayerLocalName = 'useIntlayer';

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

          // Replace with {content.key}
          path.replaceWith(
            t.jsxExpressionContainer(
              t.memberExpression(
                t.identifier('content'),
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
        if (!t.isStringLiteral(value)) return;

        const text = value.value;
        const shouldExtract = state.opts.shouldExtract ?? defaultShouldExtract;

        if (shouldExtract(text)) {
          const key = generateKey(text, state._existingKeys!);
          state._existingKeys!.add(key);

          // Collect extracted content
          state._extractedContent![key] = text.trim();

          // Replace with {content.key.value}
          path.node.value = t.jsxExpressionContainer(
            t.memberExpression(
              t.memberExpression(
                t.identifier('content'),
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
        exit(programPath, state) {
          if (!state._isIncluded) return;

          const extractedKeys = Object.keys(state._extractedContent!);
          const hasExtractedContent = extractedKeys.length > 0;
          const hasExistingKeys = state._existingKeys!.size > 0;

          // If nothing was extracted or transformed, skip
          if (!hasExtractedContent && !hasExistingKeys) return;

          // Only process JSX files (React components)
          if (!state._hasJSX) return;

          const defaultLocale = state.opts.defaultLocale ?? 'en';
          const packageName = state.opts.packageName ?? 'react-intlayer';

          // Call the onExtract callback with extracted content
          // This will update the dictionary, adding new keys and removing unused ones
          if (
            state.opts.onExtract &&
            state._dictionaryKey &&
            hasExtractedContent
          ) {
            state.opts.onExtract({
              dictionaryKey: state._dictionaryKey,
              filePath: state.file.opts.filename ?? '',
              content: { ...state._extractedContent! },
              locale: defaultLocale,
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
              t.stringLiteral(packageName)
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

          // Now inject useIntlayer hook into all function components
          // We need to find all functions that return JSX
          programPath.traverse({
            // Handle function declarations
            FunctionDeclaration(funcPath) {
              injectHookIntoFunction(funcPath, state, t);
            },

            // Handle arrow functions and function expressions in variable declarations
            VariableDeclarator(varPath) {
              const init = varPath.node.init;
              if (
                t.isArrowFunctionExpression(init) ||
                t.isFunctionExpression(init)
              ) {
                injectHookIntoArrowOrExpression(
                  varPath as NodePath<BabelTypes.VariableDeclarator>,
                  init,
                  state,
                  t
                );
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

  // Check if hook is already injected
  const hasHook = body.body.some(
    (stmt) =>
      t.isVariableDeclaration(stmt) &&
      stmt.declarations.some(
        (decl) =>
          t.isIdentifier(decl.id) &&
          decl.id.name === 'content' &&
          t.isCallExpression(decl.init) &&
          t.isIdentifier(decl.init.callee) &&
          decl.init.callee.name === state._useIntlayerLocalName
      )
  );

  if (hasHook) return;

  // Inject: const content = useIntlayer('dictionary-key');
  const hookCall = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('content'),
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

  // If the body is JSX directly (implicit return), wrap it in a block
  if (t.isJSXElement(body) || t.isJSXFragment(body)) {
    // Transform: () => <div>...</div>
    // To: () => { const content = useIntlayer('key'); return <div>...</div>; }
    const hookCall = t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier('content'),
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

  // Check if hook is already injected
  const hasHook = body.body.some(
    (stmt) =>
      t.isVariableDeclaration(stmt) &&
      stmt.declarations.some(
        (decl) =>
          t.isIdentifier(decl.id) &&
          decl.id.name === 'content' &&
          t.isCallExpression(decl.init) &&
          t.isIdentifier(decl.init.callee) &&
          decl.init.callee.name === state._useIntlayerLocalName
      )
  );

  if (hasHook) return;

  // Inject: const content = useIntlayer('dictionary-key');
  const hookCall = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier('content'),
      t.callExpression(t.identifier(state._useIntlayerLocalName!), [
        t.stringLiteral(state._dictionaryKey!),
      ])
    ),
  ]);

  body.body.unshift(hookCall);
};
