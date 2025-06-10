import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import * as t from '@babel/types';
import { getFileHash } from '@intlayer/chokidar';
import { dirname, join, relative } from 'node:path';

/* ────────────────────────────────────────── constants ───────────────────── */

const PACKAGE_LIST = [
  'intlayer',
  '@intlayer/core',
  'react-intlayer',
  'react-intlayer/client',
  'react-intlayer/server',
  'next-intlayer',
  'next-intlayer/client',
  'next-intlayer/server',
  'svelte-intlayer',
  'vue-intlayer',
  'angular-intlayer',
  'preact-intlayer',
  'solid-intlayer',
];

const CALLER_LIST = ['useIntlayer', 'getIntlayer'] as const;

/**
 * Packages that support dynamic import
 */
const PACKAGE_LIST_DYNAMIC = [
  'react-intlayer',
  'react-intlayer/client',
  'react-intlayer/server',
  'next-intlayer',
  'next-intlayer/client',
  'next-intlayer/server',
  'preact-intlayer',
] as const;

const STATIC_IMPORT_FUNCTION = {
  getIntlayer: 'getDictionary',
  useIntlayer: 'useDictionary',
} as const;

const DYNAMIC_IMPORT_FUNCTION = {
  useIntlayer: 'useDictionaryDynamic',
} as const;

/* ────────────────────────────────────────── types ───────────────────────── */

type State = PluginPass & {
  opts: {
    /**
     * The path to the dictionaries directory.
     */
    dictionariesDir: string;
    /**
     * The path to the dictionaries entry file.
     */
    dictionariesEntryPath: string;
    /**
     * The path to the dictionaries directory.
     */
    dynamicDictionariesDir: string;
    /**
     * The path to the dynamic dictionaries entry file.
     */
    dynamicDictionariesEntryPath: string;
    /**
     * If true, the plugin will activate the dynamic import of the dictionaries.
     */
    activateDynamicImport?: boolean;
    /**
     * Files list to traverse.
     */
    filesList?: string[];
  };
  /** map key → generated ident (per-file) for static imports */
  _newStaticImports?: Map<string, t.Identifier>;
  /** map key → generated ident (per-file) for dynamic imports */
  _newDynamicImports?: Map<string, t.Identifier>;
  /** whether the current file imported *any* intlayer package */
  _hasValidImport?: boolean;
  /** whether the current file *is* the dictionaries entry file */
  _isDictEntry?: boolean;
  /** whether dynamic helpers are active for this file */
  _useDynamicHelpers?: boolean;
};

/* ────────────────────────────────────────── helpers ─────────────────────── */

/**
 * Replicates the xxHash64 → Base-62 algorithm used by the SWC version
 * and prefixes an underscore so the generated identifiers never collide
 * with user-defined ones.
 */
const makeIdent = (key: string): t.Identifier => {
  const hash = getFileHash(key);
  return t.identifier(`_${hash}`);
};

const computeRelativeImport = (
  fromFile: string,
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  key: string,
  isDynamic = false
): string => {
  const jsonPath = isDynamic
    ? join(dynamicDictionariesDir, `${key}.mjs`)
    : join(dictionariesDir, `${key}.json`);

  let rel = relative(dirname(fromFile), jsonPath).replace(/\\/g, '/'); // win →
  if (!rel.startsWith('./') && !rel.startsWith('../')) rel = `./${rel}`;
  return rel;
};

/* ────────────────────────────────────────── plugin ──────────────────────── */

/**
 * Babel plugin that transforms `useIntlayer/getIntlayer` calls into
 * `useDictionary/getDictionary` and auto-imports the required JSON dictionaries.
 *
 *
 * This means cases like:
 *
 * ```ts
 * import { getIntlayer } from 'intlayer';
 * import { useIntlayer } from 'react-intlayer';
 *
 * // ...
 *
 * const content1 = getIntlayer('app');
 * const content2 = useIntlayer('app');
 * ```
 *
 * will be transformed into:
 *
 * ```ts
 * import _dicHash from '../../.intlayer/dictionaries/app.mjs';
 * import { getDictionary as getIntlayer } from 'intlayer';
 * import { useDictionaryDynamic as useIntlayer } from 'react-intlayer';
 *
 * // ...
 *
 * const content1 = getIntlayer(_dicHash);
 * const content2 = useIntlayer(_dicHash)
 * ```
 *
 * Or if the `activateDynamicImport` option is enabled:
 *
 * ```ts
 * import _dicHash from '../../.intlayer/dynamic_dictionaries/app.mjs';
 * import _dicHash_dyn from '../../.intlayer/dictionaries/app.mjs';
 *
 * import { useDictionary as getIntlayer } from 'intlayer';
 * import { useDictionaryDynamic as useIntlayer } from 'react-intlayer';
 *
 * // ...
 *
 * const content1 = getIntlayer(_dicHash);
 * const content2 = useIntlayer(_dicHash_dyn, 'app');
 * ```
 */
export const intlayerBabelPlugin = (): PluginObj<State> => {
  return {
    name: 'babel-plugin-intlayer-transform',

    pre() {
      this._newStaticImports = new Map();
      this._newDynamicImports = new Map();
      this._isIncluded = true;
      this._hasValidImport = false;
      this._isDictEntry = false;
      this._useDynamicHelpers = false;

      // If filesList is provided, check if current file is included
      const filename = this.file.opts.filename;
      if (this.opts.filesList && filename) {
        const isIncluded = this.opts.filesList.includes(filename);

        if (!isIncluded) {
          // Force _isIncluded to false to skip processing
          this._isIncluded = false;
          return;
        }
      }
    },

    visitor: {
      /* 0. If this file *is* the dictionaries entry, short-circuit: export {} */
      Program: {
        enter(programPath, state) {
          const filename = state.file.opts.filename!;
          if (filename === state.opts.dictionariesEntryPath) {
            state._isDictEntry = true;
            // Replace all existing statements with: export default {}
            programPath.node.body = [
              t.exportDefaultDeclaration(t.objectExpression([])),
            ];
            // Stop further traversal for this plugin – nothing else to transform
            programPath.stop();
          }
        },

        /* 3. After full traversal, inject the JSON dictionary imports. */
        exit(programPath, state) {
          if (state._isDictEntry) return; // nothing else to do – already replaced
          if (!state._hasValidImport) return; // early-out if we touched nothing
          if (!state._isIncluded) return; // early-out if file is not included

          const file = state.file.opts.filename!;
          const dictionariesDir = state.opts.dictionariesDir;
          const dynamicDictionariesDir = state.opts.dynamicDictionariesDir;
          const imports: t.ImportDeclaration[] = [];

          // Generate static imports (for getIntlayer and useIntlayer when not using dynamic)
          for (const [key, ident] of state._newStaticImports!) {
            const rel = computeRelativeImport(
              file,
              dictionariesDir,
              dynamicDictionariesDir,
              key,
              false // Always static
            );
            const importDeclarationNode = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(ident.name))],
              t.stringLiteral(rel)
            );

            importDeclarationNode.attributes = [
              t.importAttribute(t.identifier('type'), t.stringLiteral('json')),
            ];

            imports.push(importDeclarationNode);
          }

          // Generate dynamic imports (for useIntlayer when using dynamic helpers)
          for (const [key, ident] of state._newDynamicImports!) {
            const rel = computeRelativeImport(
              file,
              dictionariesDir,
              dynamicDictionariesDir,
              key,
              true // Always dynamic
            );
            imports.push(
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier(ident.name))],
                t.stringLiteral(rel)
              )
            );
          }

          if (!imports.length) return;

          /* Keep "use client" / "use server" directives at the very top. */
          const bodyPaths = programPath.get('body') as NodePath<t.Statement>[];
          let insertPos = 0;
          for (const stmtPath of bodyPaths) {
            const stmt = stmtPath.node;
            if (
              t.isExpressionStatement(stmt) &&
              t.isStringLiteral(stmt.expression) &&
              !stmt.expression.value.startsWith('import') &&
              !stmt.expression.value.startsWith('require')
            ) {
              insertPos += 1;
            } else {
              break;
            }
          }

          programPath.node.body.splice(insertPos, 0, ...imports);
        },
      },

      /* 1. Inspect *every* intlayer import. */
      ImportDeclaration(path, state) {
        if (state._isDictEntry) return; // skip if entry file – already handled

        const src = path.node.source.value;
        if (!PACKAGE_LIST.includes(src)) return;

        // Mark that we do import from an intlayer package in this file; this is
        // enough to know that we *might* need to inject runtime helpers later.
        state._hasValidImport = true;

        for (const spec of path.node.specifiers) {
          if (!t.isImportSpecifier(spec)) continue;

          // ⚠️  We now key off *imported* name, *not* local name.
          const importedName = t.isIdentifier(spec.imported)
            ? spec.imported.name
            : (spec.imported as t.StringLiteral).value;

          const activateDynamicImport = state.opts.activateDynamicImport;
          // Determine whether this import should use the dynamic helpers. We
          // only switch to the dynamic helpers when (1) the option is turned
          // on AND (2) the package we are importing from supports the dynamic
          // helpers.
          const shouldUseDynamicHelpers =
            activateDynamicImport && PACKAGE_LIST_DYNAMIC.includes(src as any);

          // Remember for later (CallExpression) whether we are using the dynamic helpers
          if (shouldUseDynamicHelpers) {
            state._useDynamicHelpers = true;
          }

          const helperMap = shouldUseDynamicHelpers
            ? ({
                ...STATIC_IMPORT_FUNCTION,
                ...DYNAMIC_IMPORT_FUNCTION,
              } as Record<string, string>)
            : (STATIC_IMPORT_FUNCTION as Record<string, string>);

          const newIdentifier = helperMap[importedName];

          // Only rewrite when we actually have a mapping for the imported
          // specifier (ignore unrelated named imports).
          if (newIdentifier) {
            // Keep the local alias intact (so calls remain `useIntlayer` /
            // `getIntlayer`), but rewrite the imported identifier so it
            // points to our helper implementation.
            spec.imported = t.identifier(newIdentifier);
          }
        }
      },

      /* 2. Replace calls: useIntlayer("foo") → useDictionary(_hash) or useDictionaryDynamic(_hash, "foo") */
      CallExpression(path, state) {
        if (state._isDictEntry) return; // skip if entry file – already handled

        const callee = path.node.callee;
        if (!t.isIdentifier(callee)) return;
        if (!CALLER_LIST.includes(callee.name as any)) return;

        // Ensure we ultimately emit helper imports for files that *invoke*
        // the hooks, even if they didn't import them directly (edge cases with
        // re-exports).
        state._hasValidImport = true;

        const arg = path.node.arguments[0];
        if (!arg || !t.isStringLiteral(arg)) return; // must be literal

        const key = arg.value;
        const useDynamic = Boolean(state._useDynamicHelpers);

        // Determine if this specific call should use dynamic imports
        const shouldUseDynamicForThisCall =
          callee.name === 'useIntlayer' && useDynamic;

        let ident: t.Identifier;

        if (shouldUseDynamicForThisCall) {
          // Use dynamic imports for useIntlayer when dynamic helpers are enabled
          let dynamicIdent = state._newDynamicImports!.get(key);
          if (!dynamicIdent) {
            // Create a unique identifier for dynamic imports by appending a suffix
            const hash = getFileHash(key);
            dynamicIdent = t.identifier(`_${hash}_dyn`);
            state._newDynamicImports!.set(key, dynamicIdent);
          }
          ident = dynamicIdent;

          // Dynamic helper: first argument is the dictionary, second is the key.
          path.node.arguments = [
            t.identifier(ident.name),
            ...path.node.arguments,
          ];
        } else {
          // Use static imports for getIntlayer or useIntlayer when not using dynamic helpers
          let staticIdent = state._newStaticImports!.get(key);
          if (!staticIdent) {
            staticIdent = makeIdent(key);
            state._newStaticImports!.set(key, staticIdent);
          }
          ident = staticIdent;

          // Static helper (useDictionary / getDictionary): replace key with ident.
          path.node.arguments[0] = t.identifier(ident.name);
        }
      },
    },
  };
};
