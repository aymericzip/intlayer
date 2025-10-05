import { dirname, join, relative } from 'node:path';
import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import * as t from '@babel/types';
import { getFileHash } from '@intlayer/chokidar';
import { normalizePath } from '@intlayer/config';

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
  'vue-intlayer',
  'solid-intlayer',
  'svelte-intlayer',
  'angular-intlayer',
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
     * The path to the fetch dictionaries directory.
     */
    fetchDictionariesDir: string;
    /**
     * The path to the fetch dictionaries entry file.
     */
    fetchDictionariesEntryPath: string;
    /**
     * If true, the plugin will replace the dictionary entry file with `export default {}`.
     */
    replaceDictionaryEntry: boolean;
    /**
     * If true, the plugin will activate the dynamic import of the dictionaries. It will rely on Suspense to load the dictionaries.
     */
    importMode: 'static' | 'dynamic' | 'live';
    /**
     * Activate the live sync of the dictionaries.
     * If `importMode` is `live`, the plugin will activate the live sync of the dictionaries.
     */
    liveSyncKeys: string[];
    /**
     * Files list to traverse.
     */
    filesList: string[];
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

const computeImport = (
  fromFile: string,
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  fetchDictionariesDir: string,
  key: string,
  importMode: 'static' | 'dynamic' | 'live'
): string => {
  let relativePath = join(dictionariesDir, `${key}.json`);

  if (importMode === 'live') {
    relativePath = join(fetchDictionariesDir, `${key}.mjs`);
  }

  if (importMode === 'dynamic') {
    relativePath = join(dynamicDictionariesDir, `${key}.mjs`);
  }

  let rel = relative(dirname(fromFile), relativePath);

  // Fix windows path
  rel = normalizePath(rel);

  // Fix relative path
  if (!rel.startsWith('./') && !rel.startsWith('../')) {
    rel = `./${rel}`;
  }

  return rel;
};

/* ────────────────────────────────────────── plugin ──────────────────────── */

/**
 * Babel plugin that transforms Intlayer function calls and auto-imports dictionaries.
 *
 * This plugin transforms calls to `useIntlayer()` and `getIntlayer()` from various Intlayer
 * packages into optimized dictionary access patterns, automatically importing the required
 * dictionary files based on the configured import mode.
 *
 * ## Supported Input Patterns
 *
 * The plugin recognizes these function calls:
 *
 * ```ts
 * // useIntlayer
 * import { useIntlayer } from 'react-intlayer';
 * import { useIntlayer } from 'next-intlayer';
 *
 * // getIntlayer
 * import { getIntlayer } from 'intlayer';
 *
 * // Usage
 * const content = useIntlayer('app');
 * const content = getIntlayer('app');
 * ```
 *
 * ## Transformation Modes
 *
 * ### Static Mode (default: `importMode = "static"`)
 *
 * Imports JSON dictionaries directly and replaces function calls with dictionary access:
 *
 * **Output:**
 * ```ts
 * import _dicHash from '../../.intlayer/dictionaries/app.json' with { type: 'json' };
 * import { useDictionary as useIntlayer } from 'react-intlayer';
 * import { getDictionary as getIntlayer } from 'intlayer';
 *
 * const content1 = useIntlayer(_dicHash);
 * const content2 = getIntlayer(_dicHash);
 * ```
 *
 * ### Dynamic Mode (`importMode = "dynamic"`)
 *
 * Uses dynamic dictionary loading with Suspense support:
 *
 * **Output:**
 * ```ts
 * import _dicHash from '../../.intlayer/dictionaries/app.json' with { type: 'json' };
 * import _dicHash_dyn from '../../.intlayer/dynamic_dictionaries/app.mjs';
 * import { useDictionaryDynamic as useIntlayer } from 'react-intlayer';
 * import { getDictionary as getIntlayer } from 'intlayer';
 *
 * const content1 = useIntlayer(_dicHash_dyn, 'app');
 * const content2 = getIntlayer(_dicHash);
 * ```
 *
 * ### Live Mode (`importMode = "live"`)
 *
 * Uses live-based dictionary loading for remote dictionaries:
 *
 * **Output if `liveSyncKeys` includes the key:**
 * ```ts
 * import _dicHash from '../../.intlayer/dictionaries/app.json' with { type: 'json' };
 * import _dicHash_fetch from '../../.intlayer/fetch_dictionaries/app.mjs';
 * import { useDictionaryDynamic as useIntlayer } from 'react-intlayer';
 * import { getDictionary as getIntlayer } from 'intlayer';
 *
 * const content1 = useIntlayer(_dicHash_fetch, "app");
 * const content2 = getIntlayer(_dicHash);
 * ```
 *
 * > If `liveSyncKeys` does not include the key, the plugin will fallback to the dynamic import.
 *
 * ```ts
 * import _dicHash from '../../.intlayer/dictionaries/app.json' with { type: 'json' };
 * import _dicHash_dyn from '../../.intlayer/dynamic_dictionaries/app.mjs';
 * import { useDictionaryDynamic as useIntlayer } from 'react-intlayer';
 * import { getDictionary as getIntlayer } from 'intlayer';
 *
 * const content1 = useIntlayer(_dicHash_dyn, 'app');
 * const content2 = getIntlayer(_dicHash);
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
          if (
            state.opts.replaceDictionaryEntry &&
            filename === state.opts.dictionariesEntryPath
          ) {
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
          const fetchDictionariesDir = state.opts.fetchDictionariesDir;
          const imports: t.ImportDeclaration[] = [];

          // Generate static JSON imports (getIntlayer always uses JSON dictionaries)
          for (const [key, ident] of state._newStaticImports!) {
            const rel = computeImport(
              file,
              dictionariesDir,
              dynamicDictionariesDir,
              fetchDictionariesDir,
              key,
              'static'
            );

            const importDeclarationNode = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(ident.name))],
              t.stringLiteral(rel)
            );

            // Add 'type: json' attribute for JSON files
            importDeclarationNode.attributes = [
              t.importAttribute(t.identifier('type'), t.stringLiteral('json')),
            ];

            imports.push(importDeclarationNode);
          }

          // Generate dynamic/fetch imports (for useIntlayer when using dynamic/live helpers)
          for (const [key, ident] of state._newDynamicImports!) {
            const modeForThisIdent: 'dynamic' | 'live' = ident.name.endsWith(
              '_fetch'
            )
              ? 'live'
              : 'dynamic';

            const rel = computeImport(
              file,
              dictionariesDir,
              dynamicDictionariesDir,
              fetchDictionariesDir,
              key,
              modeForThisIdent
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

          const importMode = state.opts.importMode;
          // Determine whether this import should use the dynamic helpers.
          const shouldUseDynamicHelpers =
            (importMode === 'dynamic' || importMode === 'live') &&
            PACKAGE_LIST_DYNAMIC.includes(src as any);

          // Remember for later (CallExpression) whether we are using the dynamic helpers
          if (shouldUseDynamicHelpers) {
            state._useDynamicHelpers = true;
          }

          let helperMap: Record<string, string>;

          if (shouldUseDynamicHelpers) {
            // Use dynamic helpers for useIntlayer when dynamic mode is enabled
            helperMap = {
              ...STATIC_IMPORT_FUNCTION,
              ...DYNAMIC_IMPORT_FUNCTION,
            } as Record<string, string>;
          } else {
            // Use static helpers by default
            helperMap = STATIC_IMPORT_FUNCTION as Record<string, string>;
          }

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
        const importMode = state.opts.importMode;
        const isUseIntlayer = callee.name === 'useIntlayer';
        const useDynamicHelpers = Boolean(state._useDynamicHelpers);

        // Decide per-call mode: 'static' | 'dynamic' | 'live'
        let perCallMode: 'static' | 'dynamic' | 'live' = 'static';
        if (isUseIntlayer && useDynamicHelpers) {
          if (importMode === 'dynamic') {
            perCallMode = 'dynamic';
          } else if (importMode === 'live') {
            const liveKeys = state.opts.liveSyncKeys ?? [];
            perCallMode = liveKeys.includes(key) ? 'live' : 'dynamic';
          }
        }

        let ident: t.Identifier;

        if (perCallMode === 'live') {
          // Use fetch dictionaries entry (live mode for selected keys)
          let dynamicIdent = state._newDynamicImports?.get(key);
          if (!dynamicIdent) {
            const hash = getFileHash(key);
            dynamicIdent = t.identifier(`_${hash}_fetch`);
            state._newDynamicImports?.set(key, dynamicIdent);
          }
          ident = dynamicIdent;

          // Helper: first argument is the dictionary entry, second is the key
          path.node.arguments = [
            t.identifier(ident.name),
            ...path.node.arguments,
          ];
        } else if (perCallMode === 'dynamic') {
          // Use dynamic dictionaries entry
          let dynamicIdent = state._newDynamicImports?.get(key);
          if (!dynamicIdent) {
            // Create a unique identifier for dynamic imports by appending a suffix
            const hash = getFileHash(key);
            dynamicIdent = t.identifier(`_${hash}_dyn`);
            state._newDynamicImports?.set(key, dynamicIdent);
          }
          ident = dynamicIdent;

          // Dynamic helper: first argument is the dictionary, second is the key.
          path.node.arguments = [
            t.identifier(ident.name),
            ...path.node.arguments,
          ];
        } else {
          // Use static imports for getIntlayer or useIntlayer when not using dynamic helpers
          let staticIdent = state._newStaticImports?.get(key);
          if (!staticIdent) {
            staticIdent = makeIdent(key);
            state._newStaticImports?.set(key, staticIdent);
          }
          ident = staticIdent;

          // Static helper (useDictionary / getDictionary): replace key with ident.
          path.node.arguments[0] = t.identifier(ident.name);
        }
      },
    },
  };
};
