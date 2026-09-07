import { dirname, join, relative } from 'node:path';
import type { NodePath, PluginObject, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import type { CallerDescriptor } from '@intlayer/config/callers';
import { normalizePath } from '@intlayer/config/utils';
import { createCompatOptimizePass } from './compat/optimizePass';
import {
  createDictionaryImportRegistry,
  type DictionaryImportRegistry,
  type ImportMode,
} from './dictionaryImports';
import { getNormalizedFilesListSet } from './normalizedFilesList';
import { readStaticString } from './staticAstReaders';

const PACKAGE_LIST = [
  'intlayer',
  '@intlayer/core',
  '@intlayer/core/interpreter',
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

const CALLER_LIST = ['useIntlayer', 'getIntlayer', 'getIntlayerAsync'] as const;

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
  // `getIntlayerAsync` always reads a per-locale chunk, in every import mode,
  // so its helper is the same on both sides of the static/dynamic split.
  getIntlayerAsync: 'getDictionaryAsync',
  useIntlayer: 'useDictionary',
} as const;

const DYNAMIC_IMPORT_FUNCTION = {
  useIntlayer: 'useDictionaryDynamic',
} as const;

/** Import rename table applied when the helper plan for a package is `dynamic`. */
const DYNAMIC_HELPER_MAP: Record<string, string> = {
  ...STATIC_IMPORT_FUNCTION,
  ...DYNAMIC_IMPORT_FUNCTION,
};

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
   * Keys of the dictionaries that reference other dictionaries through
   * `nest()`.
   *
   * For those, the injected static import points at the generated companion
   * module (`<dictionariesDir>/nested/<key>.mjs`) instead of the raw JSON. The
   * companion re-exports the dictionary with its nest targets attached, so
   * `getNesting` resolves them from that local reference rather than from the
   * global registry this plugin empties — and each target lands in the chunk of
   * the dictionary referencing it.
   *
   * Dynamic and fetch modes need nothing here: their generated loaders already
   * attach the same targets per locale.
   */
  nestingDictionaryKeys?: string[];
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
  /**
   * Compat-adapter caller descriptors injected by the compat packages'
   * bundler plugins (e.g. `@intlayer/react-i18next/plugin`).
   *
   * Callers carrying `staticReplacement` / `dynamicReplacement` are rewritten
   * the same way as native `useIntlayer` calls: the namespace string argument
   * is replaced by a pre-imported dictionary object and the import specifier
   * is re-pointed to the dictionary-accepting variant, e.g.
   * `useTranslation('about')` → `useDictionary(_dictHash)`.
   *
   * No compat-specific name is hard-coded in this plugin — the whole rewrite
   * is driven by these descriptors.
   */
  compatCallers?: CallerDescriptor[];
};

type State = PluginPass & {
  opts: OptimizePluginOptions;
  /** Dictionary imports collected while rewriting, injected at the end. */
  _imports?: DictionaryImportRegistry;
  /** whether the current file imported *any* intlayer package */
  _hasValidImport?: boolean;
  /** map from local identifier name to the imported intlayer func name ('useIntlayer' | 'getIntlayer') */
  _callerMap?: Map<string, CallerName>;
  /** map from local identifier name to the intlayer package it was imported from */
  _callerPackageMap?: Map<string, string>;
  /** whether the current file *is* the dictionaries entry file */
  _isDictEntry?: boolean;
  /** whether the current file is included in the filesList */
  _isIncluded?: boolean;
};

/**
 * Builds the module specifier pointing at `targetPath` from `fromFile`, with
 * forward slashes and an explicit `./` prefix so bundlers never treat it as a
 * bare package specifier.
 */
const toRelativeSpecifier = (fromFile: string, targetPath: string): string => {
  // Fix windows path
  const relativePath = normalizePath(relative(dirname(fromFile), targetPath));

  // Fix relative path
  if (!relativePath.startsWith('./') && !relativePath.startsWith('../')) {
    return `./${relativePath}`;
  }

  return relativePath;
};

/**
 * Subdirectory of the compiled dictionaries holding the companion modules that
 * re-export a dictionary with its `nest()` targets attached. Mirrors
 * `NESTED_DICTIONARIES_SUBDIR` in `@intlayer/engine`.
 */
const NESTED_DICTIONARIES_SUBDIR = 'nested';

const computeImport = (
  fromFile: string,
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  fetchDictionariesDir: string,
  key: string,
  importMode: 'static' | 'dynamic' | 'fetch',
  hasNestedDictionaries = false
): string => {
  // Static mode is the only one needing the companion: the dynamic and fetch
  // loaders already attach the nest targets per locale.
  let dictionaryPath = hasNestedDictionaries
    ? join(dictionariesDir, NESTED_DICTIONARIES_SUBDIR, `${key}.mjs`)
    : join(dictionariesDir, `${key}.json`);

  if (importMode === 'fetch') {
    dictionaryPath = join(fetchDictionariesDir, `${key}.mjs`);
  }

  if (importMode === 'dynamic') {
    dictionaryPath = join(dynamicDictionariesDir, `${key}.mjs`);
  }

  return toRelativeSpecifier(fromFile, dictionaryPath);
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
 * This plugin transforms calls to `useIntlayer()`, `getIntlayer()` and
 * `getIntlayerAsync()` from various Intlayer packages into optimized dictionary
 * access patterns, automatically importing the required dictionary files based
 * on the configured import mode.
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
 * // getIntlayer / getIntlayerAsync
 * import { getIntlayer, getIntlayerAsync } from 'intlayer';
 *
 * // Usage
 * const content = useIntlayer('app');
 * const content = getIntlayer('app');
 * const content = await getIntlayerAsync('app', locale);
 * ```
 *
 * `getIntlayerAsync` is the exception to the mode table below: it always
 * resolves to the per-locale loader (`getDictionaryAsync`), in every import
 * mode, since loading a single locale is what it exists for.
 *
 * **Output (any mode):**
 * ```ts
 * import _dicHash_dyn from '../../.intlayer/dynamic_dictionaries/app.mjs';
 * import { getDictionaryAsync as getIntlayerAsync } from 'intlayer';
 *
 * const content = await getIntlayerAsync(_dicHash_dyn, 'app', locale);
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
      this._imports = createDictionaryImportRegistry(t);
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
        const isIncluded = getNormalizedFilesListSet(this.opts.filesList).has(
          filename
        );

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
          const unmergedDictionariesEntryPath = state.opts
            .unmergedDictionariesEntryPath
            ? normalizePath(state.opts.unmergedDictionariesEntryPath)
            : undefined;

          // Each generated entry exposes its own accessor. Emitting
          // `getDictionaries` for every entry left the unmerged one without the
          // `getUnmergedDictionaries` export its consumers import, so the
          // bundler failed the build with a missing export.
          const entryAccessorName = filename
            ? filename === dictionariesEntryPath
              ? 'getDictionaries'
              : filename === unmergedDictionariesEntryPath
                ? 'getUnmergedDictionaries'
                : undefined
            : undefined;

          // Check if this is the correct file to transform
          if (state.opts.replaceDictionaryEntry && entryAccessorName) {
            state._isDictEntry = true;
            programPath.node.body = [
              t.exportDefaultDeclaration(t.objectExpression([])),
              t.exportNamedDeclaration(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.identifier(entryAccessorName),
                    t.arrowFunctionExpression([], t.objectExpression([]))
                  ),
                ])
              ),
            ];
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

          const imports = state._imports!;

          // Compat adapters plug in here and nowhere else: with no descriptor
          // injected the pass is `null`, every `compat?.` below is a no-op and
          // the native rewrite runs exactly as if the adapters did not exist.
          const compat = createCompatOptimizePass(
            t,
            state.opts.compatCallers ?? [],
            imports,
            {
              importMode: state.opts.importMode,
              dictionaryModeMap: state.opts.dictionaryModeMap,
            }
          );

          // Pass 1 — resolve which local name refers to which caller. Import
          // declarations may appear after the calls they govern, so this must
          // complete before any call site is inspected.
          programPath.traverse({
            ImportDeclaration(path) {
              const src = path.node.source.value;

              const isNativePackage = PACKAGE_LIST.includes(src);
              const isCompatPackage = compat?.ownsImportSource(src) ?? false;

              if (!isNativePackage && !isCompatPackage) return;

              state._hasValidImport = true;

              for (const spec of path.node.specifiers) {
                if (!t.isImportSpecifier(spec)) continue;

                const importedName = t.isIdentifier(spec.imported)
                  ? spec.imported.name
                  : (spec.imported as BabelTypes.StringLiteral).value;

                if (isNativePackage && isCallerName(importedName)) {
                  state._callerMap?.set(spec.local.name, importedName);
                  state._callerPackageMap?.set(spec.local.name, src);
                }

                compat?.noteImport(src, importedName, spec.local.name);
              }
            },
          });

          // Pass 2 — decide, per native package, which helper family the file
          // resolves to. A per-dictionary override reached from this file can
          // promote the whole package import to a dynamic loader.
          const packagesWithDynamicCall = new Set<string>();
          const packagesWithFetchCall = new Set<string>();

          programPath.traverse({
            CallExpression(path) {
              const callee = path.node.callee;
              if (!t.isIdentifier(callee)) return;

              if (state._callerMap?.get(callee.name) !== 'useIntlayer') return;

              const callerPackage = state._callerPackageMap?.get(callee.name);
              if (!callerPackage) return;

              const key = readStaticString(t, path.node.arguments[0]);
              if (!key) return;

              const overrideMode = state.opts.dictionaryModeMap?.[key];

              if (overrideMode === 'dynamic') {
                packagesWithDynamicCall.add(callerPackage);
              } else if (overrideMode === 'fetch') {
                packagesWithFetchCall.add(callerPackage);
              }
            },
          });

          // Pass 3 — the compat pass runs its own analysis, then binds the
          // namespace-less root scopes it resolved. The call nodes it rewrote
          // are skipped by the rewrite visitor below.
          compat?.analyze(programPath);
          const handledCalls = compat?.applyRootScopeRewrites() ?? new Set();

          const getHelperPlan = (packageName: string): PackageHelperPlan =>
            resolveHelperPlan(
              packageName,
              state.opts.importMode,
              state.opts.isServer,
              packagesWithDynamicCall.has(packageName),
              packagesWithFetchCall.has(packageName)
            );

          // Pass 4 — rewrite the imports and the call sites.
          programPath.traverse({
            ImportDeclaration(path) {
              const src = path.node.source.value;

              // Compat caller import rename: point the specifier at the
              // dictionary-accepting helper exported by the compat package
              // (`useTranslation` → `useDictionary`), keeping the local alias
              // so call sites read unchanged.
              compat?.rewriteImportSpecifiers(path);

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
                  ? DYNAMIC_HELPER_MAP
                  : STATIC_IMPORT_FUNCTION;

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
              if (handledCalls.has(path.node)) return;

              const callee = path.node.callee;

              if (!t.isIdentifier(callee)) return;

              if (compat?.rewriteCall(path)) return;

              const originalImportedName = state._callerMap?.get(callee.name);
              if (!originalImportedName) return;

              // Ensure we ultimately emit helper imports for files that *invoke*
              // the hooks, even if they didn't import them directly (edge cases with
              // re-exports).
              state._hasValidImport = true;

              const key = readStaticString(t, path.node.arguments[0]);
              if (!key) return;

              const callerPackage = state._callerPackageMap?.get(callee.name);
              const importMode = state.opts.importMode;
              const isUseIntlayer = originalImportedName === 'useIntlayer';
              const isGetIntlayerAsync =
                originalImportedName === 'getIntlayerAsync';
              const dictionaryOverrideMode =
                state.opts.dictionaryModeMap?.[key];
              const helperPlan =
                callerPackage === undefined
                  ? 'static'
                  : getHelperPlan(callerPackage);

              // Decide per-call mode: 'static' | 'dynamic' | 'fetch'.
              let perCallMode: ImportMode = 'static';

              if (isGetIntlayerAsync) {
                // Loading a single locale is the whole point of the async
                // getter, so it reads a per-locale loader whatever the file's
                // import mode is — the fetch loader when the dictionary is
                // remote, the dynamic one otherwise.
                perCallMode =
                  dictionaryOverrideMode === 'fetch' ? 'fetch' : 'dynamic';
              } else if (isUseIntlayer && helperPlan === 'dynamic') {
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

              const ident = imports.identFor(key, perCallMode);

              if (perCallMode === 'static') {
                // Static helper (useDictionary / getDictionary): replace the
                // key argument with the imported dictionary object.
                path.node.arguments[0] = t.identifier(ident.name);
              } else {
                // Dynamic / fetch helper: first argument is the loader, the
                // key stays as the second one.
                path.node.arguments = [
                  t.identifier(ident.name),
                  ...path.node.arguments,
                ];
              }
            },
          });

          // Early-out if we touched nothing

          if (!state._hasValidImport) return;

          const file = state.file.opts.filename!;
          const dictionariesDir = state.opts.dictionariesDir;
          const dynamicDictionariesDir = state.opts.dynamicDictionariesDir;
          const fetchDictionariesDir = state.opts.fetchDictionariesDir;
          const importDeclarations: BabelTypes.ImportDeclaration[] = [];

          const nestingDictionaryKeys = new Set(
            state.opts.nestingDictionaryKeys ?? []
          );

          // Generate static JSON imports (getIntlayer always uses JSON dictionaries)
          for (const [key, ident] of imports.staticImports) {
            // Dictionaries holding `nest()` references are imported through
            // their companion module, which re-exports them with the nest
            // targets attached.
            const hasNestedDictionaries = nestingDictionaryKeys.has(key);

            const rel = computeImport(
              file,
              dictionariesDir,
              dynamicDictionariesDir,
              fetchDictionariesDir,
              key,
              'static',
              hasNestedDictionaries
            );

            const importDeclarationNode = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(ident.name))],
              t.stringLiteral(rel)
            );

            // Add 'type: json' attribute for JSON files
            if (!hasNestedDictionaries) {
              importDeclarationNode.attributes = [
                t.importAttribute(
                  t.identifier('type'),
                  t.stringLiteral('json')
                ),
              ];
            }

            importDeclarations.push(importDeclarationNode);
          }

          // Generate dynamic/fetch imports (for useIntlayer when using dynamic/fetch helpers)
          for (const [key, ident] of imports.dynamicImports) {
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
            importDeclarations.push(
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier(ident.name))],
                t.stringLiteral(rel)
              )
            );
          }

          if (!importDeclarations.length) return;

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

          programPath.node.body.splice(insertPos, 0, ...importDeclarations);
        },
      },
    },
  };
};
