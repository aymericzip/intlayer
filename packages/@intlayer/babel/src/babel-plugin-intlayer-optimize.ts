import { dirname, join, relative } from 'node:path';
import type { NodePath, PluginObject, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import { getPathHash } from '@intlayer/chokidar/utils';
import { normalizePath } from '@intlayer/config/utils';

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
  'lit-intlayer',
  'vanilla-intlayer',
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
  'lit-intlayer',
  'vanilla-intlayer',
] as const;

const STATIC_IMPORT_FUNCTION = {
  getIntlayer: 'getDictionary',
  useIntlayer: 'useDictionary',
} as const;

const DYNAMIC_IMPORT_FUNCTION = {
  useIntlayer: 'useDictionaryDynamic',
} as const;

/**
 * Packages whose SSR-static `useDictionary` lives in a `/server` subpath
 * because it differs from the root one. Solid's reserves one hydration
 * resource slot so hydration ids stay aligned with the client's
 * `useDictionaryDynamic`; for other frameworks the root `useDictionary` is
 * already the correct SSR-static implementation.
 */
const SSR_STATIC_IMPORT_SOURCE: Partial<Record<string, string>> = {
  'solid-intlayer': 'solid-intlayer/server',
};

type CallerName = (typeof CALLER_LIST)[number];
type ImportMode = 'static' | 'dynamic' | 'fetch';

/**
 * Options for the optimization Babel plugin
 */
export type OptimizePluginOptions = {
  /**
   * If false, the plugin will not apply any transformation.
   */
  optimize?: boolean;
  /**
   * The path to the dictionaries directory.
   */
  dictionariesDir: string;
  /**
   * The path to the dictionaries entry file.
   */
  dictionariesEntryPath: string;
  /**
   * The path to the unmerged dictionaries entry file.
   */
  unmergedDictionariesEntryPath: string;
  /**
   * The path to the unmerged dictionaries directory.
   */
  unmergedDictionariesDir: string;
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
  importMode: 'static' | 'dynamic' | 'fetch' | undefined;
  /**
   * Map of dictionary keys to their specific import mode.
   */
  dictionaryModeMap?: Record<
    string,
    'static' | 'dynamic' | 'fetch' | undefined
  >;
  /**
   * Files list to traverse.
   */
  filesList: string[];
  /**
   * Whether the current transform is for an SSR bundle.
   */
  isServer?: boolean;
};

type State = PluginPass & {
  opts: OptimizePluginOptions;
  /** map key → generated ident (per-file) for static imports */
  _newStaticImports?: Map<string, BabelTypes.Identifier>;
  /** map key → generated ident (per-file) for dynamic imports */
  _newDynamicImports?: Map<string, BabelTypes.Identifier>;
  /** whether the current file imported *any* intlayer package */
  _hasValidImport?: boolean;
  /** map from local identifier name to the imported intlayer func name ('useIntlayer' | 'getIntlayer') */
  _callerMap?: Map<string, (typeof CALLER_LIST)[number]>;
  /** map from local identifier name to the intlayer package it was imported from */
  _callerPackageMap?: Map<string, string>;
  /** whether the current file *is* the dictionaries entry file */
  _isDictEntry?: boolean;
  /** whether the current file is included in the filesList */
  _isIncluded?: boolean;
};

/**
 * Replicates the xxHash64 → Base-62 algorithm used by the SWC version
 * and prefixes an underscore so the generated identifiers never collide
 * with user-defined ones.
 */
const makeIdent = (
  key: string,
  t: typeof BabelTypes
): BabelTypes.Identifier => {
  const hash = getPathHash(key);
  return t.identifier(`_${hash}`);
};

const computeImport = (
  fromFile: string,
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  fetchDictionariesDir: string,
  key: string,
  importMode: 'static' | 'dynamic' | 'fetch'
): string => {
  let relativePath = join(dictionariesDir, `${key}.json`);

  if (importMode === 'fetch') {
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

const getKeyFromArgument = (
  arg: BabelTypes.Node | null | undefined,
  t: typeof BabelTypes
): string | undefined => {
  if (arg && t.isStringLiteral(arg)) {
    return arg.value;
  }

  if (
    arg &&
    t.isTemplateLiteral(arg) &&
    arg.expressions.length === 0 &&
    arg.quasis.length === 1
  ) {
    return arg.quasis[0]?.value.cooked ?? arg.quasis[0]?.value.raw;
  }

  return undefined;
};

const isCallerName = (name: string): name is CallerName =>
  CALLER_LIST.includes(name as CallerName);

const isDynamicPackage = (
  packageName: string
): packageName is (typeof PACKAGE_LIST_DYNAMIC)[number] =>
  PACKAGE_LIST_DYNAMIC.includes(
    packageName as (typeof PACKAGE_LIST_DYNAMIC)[number]
  );

/**
 * Helper family every `useIntlayer`/`getIntlayer` call from one package import
 * resolves to in the current file. `ssrStatic` is the SSR bundle of a
 * dynamic-mode file: rewritten to the static `useDictionary` (from the
 * package's `/server` entry when it has one — see
 * `SSR_STATIC_IMPORT_SOURCE`) so the server renders static JSON while the
 * client keeps the dynamic loader.
 */
type PackageHelperPlan = 'static' | 'dynamic' | 'ssrStatic';

/**
 * Decides, once per package import, which helper family applies to this file.
 * The import rewrite and the per-call rewrite must both derive from this
 * single decision, or the emitted helper and its argument shape diverge.
 *
 * Fetch wins over `ssrStatic`: fetch dictionaries are runtime content, so the
 * server must keep the real fetch path instead of rendering build-time JSON.
 */
const resolveHelperPlan = (
  packageName: string,
  importMode: ImportMode | undefined,
  isServer: boolean | undefined,
  packageHasDynamicCall: boolean,
  packageHasFetchCall: boolean
): PackageHelperPlan => {
  if (!isDynamicPackage(packageName)) return 'static';

  if (importMode === 'fetch' || packageHasFetchCall) return 'dynamic';

  if (importMode === 'dynamic' || packageHasDynamicCall) {
    return isServer === true ? 'ssrStatic' : 'dynamic';
  }

  return 'static';
};

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
 * ### Fetch Mode (`importMode = "fetch"`)
 *
 * Uses fetch-based dictionary loading for remote dictionaries:
 *
 * **Output if `dictionaryModeMap` includes the key with "fetch" value:**
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
 * > If `dictionaryModeMap` does not include the key with "fetch" value, the plugin will fallback to the dynamic import mode.
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
export const intlayerOptimizeBabelPlugin = (babel: {
  types: typeof BabelTypes;
}): PluginObject<State> => {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-intlayer-transform',

    pre() {
      this._newStaticImports = new Map();
      this._newDynamicImports = new Map();
      this._callerMap = new Map();
      this._callerPackageMap = new Map();
      this._isIncluded = true;
      this._hasValidImport = false;
      this._isDictEntry = false;

      // If optimize is false, skip processing entirely
      if (this.opts.optimize === false) {
        this._isIncluded = false;
        return;
      }

      // If filesList is provided, check if current file is included
      const filename = this.file.opts.filename
        ? normalizePath(this.file.opts.filename)
        : undefined;
      if (this.opts.filesList && filename) {
        const filesList = this.opts.filesList.map(normalizePath);
        const isIncluded = filesList.includes(filename);

        if (!isIncluded) {
          // Force _isIncluded to false to skip processing
          this._isIncluded = false;
          return;
        }
      }
    },

    visitor: {
      /* If this file *is* the dictionaries entry, short-circuit: export {} */
      Program: {
        enter(programPath, state) {
          // Safe access to filename
          const filename = state.file.opts.filename
            ? normalizePath(state.file.opts.filename)
            : undefined;
          const dictionariesEntryPath = state.opts.dictionariesEntryPath
            ? normalizePath(state.opts.dictionariesEntryPath)
            : undefined;

          // Check if this is the correct file to transform

          if (
            state.opts.replaceDictionaryEntry &&
            filename === dictionariesEntryPath
          ) {
            state._isDictEntry = true;

            // Traverse the program to surgically remove/edit specific parts
            programPath.traverse({
              // Remove all import statements (cleaning up 'sssss.json')
              ImportDeclaration(path) {
                path.remove();
              },

              // Find the variable definition and empty the object
              VariableDeclarator(path) {
                // We look for: const x = { ... }

                if (t.isObjectExpression(path.node.init)) {
                  // Set the object properties to an empty array: {}
                  path.node.init.properties = [];
                }
              },
            });

            // (Optional) Stop other plugins from processing this file further if needed
            // programPath.stop();
          }
        },

        /**
         * After full traversal, process imports and call expressions, then inject the JSON dictionary imports.
         *
         * We do the transformation in Program.exit (via a manual traverse) rather than using
         * top-level ImportDeclaration/CallExpression visitors. This ensures that if another plugin
         * (like babel-plugin-intlayer-extract) adds new useIntlayer calls in its Program.exit,
         * we will see and transform them here because our Program.exit runs after theirs.
         */
        exit(programPath, state) {
          if (state._isDictEntry) return; // nothing else to do – already replaced

          if (!state._isIncluded) return; // early-out if file is not included

          // Manual traversal to process imports and call expressions
          // This runs AFTER all other plugins' visitors have completed
          programPath.traverse({
            /* Inspect every intlayer import before deciding helper rewrites. */
            ImportDeclaration(path) {
              const src = path.node.source.value;

              if (!PACKAGE_LIST.includes(src)) return;

              state._hasValidImport = true;

              for (const spec of path.node.specifiers) {
                if (!t.isImportSpecifier(spec)) continue;

                const importedName = t.isIdentifier(spec.imported)
                  ? spec.imported.name
                  : (spec.imported as BabelTypes.StringLiteral).value;

                if (isCallerName(importedName)) {
                  state._callerMap?.set(spec.local.name, importedName);
                  state._callerPackageMap?.set(spec.local.name, src);
                }
              }
            },
          });

          // Pre-pass to determine if dictionary-level overrides require the
          // dynamic helper in an otherwise static file.
          const packagesWithDynamicCall = new Set<string>();
          const packagesWithFetchCall = new Set<string>();
          programPath.traverse({
            CallExpression(path) {
              const callee = path.node.callee;

              if (!t.isIdentifier(callee)) return;

              const originalImportedName = state._callerMap?.get(callee.name);
              if (originalImportedName !== 'useIntlayer') return;

              const callerPackage = state._callerPackageMap?.get(callee.name);
              if (!callerPackage) return;

              const key = getKeyFromArgument(path.node.arguments[0], t);
              if (!key) return;

              const dictionaryOverrideMode =
                state.opts.dictionaryModeMap?.[key];

              if (dictionaryOverrideMode === 'dynamic') {
                packagesWithDynamicCall.add(callerPackage);
              } else if (dictionaryOverrideMode === 'fetch') {
                packagesWithFetchCall.add(callerPackage);
              }
            },
          });

          const getHelperPlan = (packageName: string): PackageHelperPlan =>
            resolveHelperPlan(
              packageName,
              state.opts.importMode,
              state.opts.isServer,
              packagesWithDynamicCall.has(packageName),
              packagesWithFetchCall.has(packageName)
            );

          programPath.traverse({
            ImportDeclaration(path) {
              const src = path.node.source.value;

              if (!PACKAGE_LIST.includes(src)) return;

              // Per-import swap, mirrored across bundles — Solid hydration
              // ids rely on the SSR and client helpers consuming one
              // resource slot per call alike (see solid-intlayer/server).
              const helperPlan = getHelperPlan(src);
              const serverSource =
                helperPlan === 'ssrStatic'
                  ? SSR_STATIC_IMPORT_SOURCE[src]
                  : undefined;

              const helperMap: Record<string, string> =
                helperPlan === 'dynamic'
                  ? { ...STATIC_IMPORT_FUNCTION, ...DYNAMIC_IMPORT_FUNCTION }
                  : { ...STATIC_IMPORT_FUNCTION };

              const serverSpecifiers: BabelTypes.ImportSpecifier[] = [];

              for (const spec of path.node.specifiers) {
                if (!t.isImportSpecifier(spec)) continue;

                const importedName = t.isIdentifier(spec.imported)
                  ? spec.imported.name
                  : (spec.imported as BabelTypes.StringLiteral).value;

                if (!isCallerName(importedName)) continue;

                if (serverSource && importedName === 'useIntlayer') {
                  spec.imported = t.identifier('useDictionary');
                  serverSpecifiers.push(spec);
                  continue;
                }

                const newIdentifier = helperMap[importedName];

                if (newIdentifier) {
                  // Keep the local alias intact (so calls remain `useIntlayer` /
                  // `getIntlayer`), but rewrite the imported identifier so it
                  // points to our helper implementation.
                  spec.imported = t.identifier(newIdentifier);
                }
              }

              if (serverSpecifiers.length > 0 && serverSource) {
                // Move the helper to the /server entry, keeping any other
                // specifiers (useLocale, …) on the original import.
                path.insertAfter(
                  t.importDeclaration(
                    serverSpecifiers,
                    t.stringLiteral(serverSource)
                  )
                );
                path.node.specifiers = path.node.specifiers.filter(
                  (spec) =>
                    !serverSpecifiers.includes(
                      spec as BabelTypes.ImportSpecifier
                    )
                );
                if (path.node.specifiers.length === 0) {
                  path.remove();
                }
              }
            },

            /* Replace calls: useIntlayer("foo") → useDictionary(_hash) or useDictionaryDynamic(_hash, "foo") */
            CallExpression(path) {
              const callee = path.node.callee;

              if (!t.isIdentifier(callee)) return;

              const originalImportedName = state._callerMap?.get(callee.name);
              if (!originalImportedName) return;

              // Ensure we ultimately emit helper imports for files that *invoke*
              // the hooks, even if they didn't import them directly (edge cases with
              // re-exports).
              state._hasValidImport = true;

              const key = getKeyFromArgument(path.node.arguments[0], t);
              if (!key) return;

              const callerPackage = state._callerPackageMap?.get(callee.name);
              const importMode = state.opts.importMode;
              const isUseIntlayer = originalImportedName === 'useIntlayer';
              const dictionaryOverrideMode =
                state.opts.dictionaryModeMap?.[key];
              const helperPlan =
                callerPackage === undefined
                  ? 'static'
                  : getHelperPlan(callerPackage);

              // Decide per-call mode: 'static' | 'dynamic' | 'fetch'.
              let perCallMode: ImportMode = 'static';

              if (isUseIntlayer && helperPlan === 'dynamic') {
                if (dictionaryOverrideMode) {
                  perCallMode = dictionaryOverrideMode;
                } else if (importMode === 'dynamic' || importMode === 'fetch') {
                  perCallMode = importMode;
                }
              } else if (isUseIntlayer && helperPlan === 'static') {
                // The global mode is static, but a per-dictionary override can
                // still force dynamic/fetch for this specific call.
                if (
                  dictionaryOverrideMode === 'dynamic' ||
                  dictionaryOverrideMode === 'fetch'
                ) {
                  perCallMode = dictionaryOverrideMode;
                }
              }

              let ident: BabelTypes.Identifier;

              if (perCallMode === 'fetch') {
                // Use fetch dictionaries entry for selected keys
                let dynamicIdent = state._newDynamicImports?.get(key);

                if (!dynamicIdent) {
                  const hash = getPathHash(key);
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
                  const hash = getPathHash(key);
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
                  staticIdent = makeIdent(key, t);
                  state._newStaticImports?.set(key, staticIdent);
                }
                ident = staticIdent;

                // Static helper (useDictionary / getDictionary): replace key with ident.
                // After the splice above the key is always at index 0.
                path.node.arguments[0] = t.identifier(ident.name);
              }
            },
          });

          // Early-out if we touched nothing

          if (!state._hasValidImport) return;

          const file = state.file.opts.filename!;
          const dictionariesDir = state.opts.dictionariesDir;
          const dynamicDictionariesDir = state.opts.dynamicDictionariesDir;
          const fetchDictionariesDir = state.opts.fetchDictionariesDir;
          const imports: BabelTypes.ImportDeclaration[] = [];

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

          // Generate dynamic/fetch imports (for useIntlayer when using dynamic/fetch helpers)
          for (const [key, ident] of state._newDynamicImports!) {
            const modeForThisIdent: 'dynamic' | 'fetch' = ident.name.endsWith(
              '_fetch'
            )
              ? 'fetch'
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
          const bodyPaths = programPath.get(
            'body'
          ) as NodePath<BabelTypes.Statement>[];
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
    },
  };
};
