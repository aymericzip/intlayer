import { dirname, join, relative } from 'node:path';
import type { PluginObject, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import type { CallerDescriptor } from '@intlayer/config/callers';
import { normalizePath } from '@intlayer/config/utils';
import {
  createCompatOptimizePass,
  type JsxSiteNode,
} from './compat/optimizePass';
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

/** Membership sets for the tables above — hit once per import and per call. */
const NATIVE_PACKAGE_SET: ReadonlySet<string> = new Set(PACKAGE_LIST);
const CALLER_NAME_SET: ReadonlySet<string> = new Set(CALLER_LIST);

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

const DYNAMIC_PACKAGE_SET: ReadonlySet<string> = new Set(PACKAGE_LIST_DYNAMIC);

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

/**
 * Per-file plugin state.
 *
 * Only the two flags that have to survive from `pre` / `Program.enter` into
 * `Program.exit` live here — the caller maps and the import registry are built
 * and consumed inside `exit`, so they stay local to it.
 */
type State = PluginPass & {
  opts: OptimizePluginOptions;
  /** Whether the current file *is* a generated dictionaries entry file. */
  _isDictEntry?: boolean;
  /** Whether the current file is covered by the `filesList` allowlist. */
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
  CALLER_NAME_SET.has(name);

const isDynamicPackage = (packageName: string): boolean =>
  DYNAMIC_PACKAGE_SET.has(packageName);

/** The name an import specifier brings in, whether written as an identifier or a string. */
const importedSpecifierName = (
  babelTypes: typeof BabelTypes,
  specifier: BabelTypes.ImportSpecifier
): string =>
  babelTypes.isIdentifier(specifier.imported)
    ? specifier.imported.name
    : specifier.imported.value;

const EMPTY_KEY_SET: ReadonlySet<string> = new Set<string>();

/**
 * `nestingDictionaryKeys` as a set, cached by array reference: Babel reuses one
 * options object for the whole build, so the set is built once instead of once
 * per transformed file.
 */
const nestingKeysCache = new WeakMap<readonly string[], ReadonlySet<string>>();

const getNestingDictionaryKeySet = (
  nestingDictionaryKeys: readonly string[] | undefined
): ReadonlySet<string> => {
  if (!nestingDictionaryKeys) return EMPTY_KEY_SET;

  let keySet = nestingKeysCache.get(nestingDictionaryKeys);

  if (!keySet) {
    keySet = new Set(nestingDictionaryKeys);
    nestingKeysCache.set(nestingDictionaryKeys, keySet);
  }

  return keySet;
};

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
 * Builds the dictionary import declarations the rewrite accumulated for one
 * file — the compiled JSON (or its `nest()` companion) for static reads, and
 * the generated per-locale loader for dynamic and fetch ones.
 */
const buildDictionaryImportDeclarations = (
  babelTypes: typeof BabelTypes,
  state: State,
  imports: DictionaryImportRegistry
): BabelTypes.ImportDeclaration[] => {
  const {
    dictionariesDir,
    dynamicDictionariesDir,
    fetchDictionariesDir,
    nestingDictionaryKeys,
  } = state.opts;
  const fromFile = state.file.opts.filename!;
  const nestingKeys = getNestingDictionaryKeySet(nestingDictionaryKeys);

  const importDeclarations: BabelTypes.ImportDeclaration[] = [];

  // Static JSON imports — `getIntlayer` always reads a JSON dictionary.
  for (const [key, ident] of imports.staticImports) {
    // A dictionary holding `nest()` references is imported through its
    // companion module, which re-exports it with the nest targets attached.
    const hasNestedDictionaries = nestingKeys.has(key);

    const specifier = computeImport(
      fromFile,
      dictionariesDir,
      dynamicDictionariesDir,
      fetchDictionariesDir,
      key,
      'static',
      hasNestedDictionaries
    );

    const importDeclaration = babelTypes.importDeclaration(
      [babelTypes.importDefaultSpecifier(babelTypes.identifier(ident.name))],
      babelTypes.stringLiteral(specifier)
    );

    if (!hasNestedDictionaries) {
      importDeclaration.attributes = [
        babelTypes.importAttribute(
          babelTypes.identifier('type'),
          babelTypes.stringLiteral('json')
        ),
      ];
    }

    importDeclarations.push(importDeclaration);
  }

  // Per-locale loaders — `useIntlayer` under a dynamic or fetch helper.
  for (const [key, ident] of imports.dynamicImports) {
    const mode: ImportMode = ident.name.endsWith('_fetch')
      ? 'fetch'
      : 'dynamic';

    importDeclarations.push(
      babelTypes.importDeclaration(
        [babelTypes.importDefaultSpecifier(babelTypes.identifier(ident.name))],
        babelTypes.stringLiteral(
          computeImport(
            fromFile,
            dictionariesDir,
            dynamicDictionariesDir,
            fetchDictionariesDir,
            key,
            mode
          )
        )
      )
    );
  }

  return importDeclarations;
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
      this._isIncluded = true;
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

          // If this file *is* the dictionaries entry, short-circuit: export {}
          // Note: unmerged_dictionaries.mjs is used by the visual editor and CMS
          // and must not be replaced with an empty dictionary map.
          if (
            state.opts.replaceDictionaryEntry &&
            filename &&
            filename === dictionariesEntryPath
          ) {
            state._isDictEntry = true;
            programPath.node.body = [
              t.exportDefaultDeclaration(t.objectExpression([])),
              t.exportNamedDeclaration(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.identifier('getDictionaries'),
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

          const imports = createDictionaryImportRegistry(t);

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

          // ── Step 1 — imports.
          //
          // An import declaration is only ever a direct child of Program, so
          // the body is scanned instead of walking the whole AST, and the
          // result is complete before any call site is inspected (a file may
          // import below the calls it governs).
          const programBody = programPath.node.body;
          const nativeImportNodes: BabelTypes.ImportDeclaration[] = [];
          const compatImportNodes: BabelTypes.ImportDeclaration[] = [];
          /** Local alias → the native caller it was imported as. */
          const callerMap = new Map<string, CallerName>();
          /** Local alias → the intlayer package it was imported from. */
          const callerPackageMap = new Map<string, string>();
          /** Whether the file imported any native or compat caller at all. */
          let hasValidImport = false;

          for (const statement of programBody) {
            if (!t.isImportDeclaration(statement)) continue;

            const src = statement.source.value;
            const isNativePackage = NATIVE_PACKAGE_SET.has(src);
            const isCompatPackage = compat?.ownsImportSource(src) ?? false;

            if (!isNativePackage && !isCompatPackage) continue;

            hasValidImport = true;
            if (isNativePackage) nativeImportNodes.push(statement);
            if (isCompatPackage) compatImportNodes.push(statement);

            for (const spec of statement.specifiers) {
              if (!t.isImportSpecifier(spec)) continue;

              const importedName = importedSpecifierName(t, spec);

              if (isNativePackage && isCallerName(importedName)) {
                callerMap.set(spec.local.name, importedName);
                callerPackageMap.set(spec.local.name, src);
              }

              if (isCompatPackage) {
                compat?.noteImport(src, importedName, spec.local.name);
              }
            }
          }

          // ── Step 2 — the file's only AST walk, collecting the call sites
          //    that either half of the rewrite can act on. Everything after
          //    this point works on the collected arrays.
          const nativeCallNodes: BabelTypes.CallExpression[] = [];
          const compatCallNodes: BabelTypes.CallExpression[] = [];
          /**
           * Compat JSX elements bound by their id attribute (`<Trans id>`),
           * as source JSX or as the `jsx(Trans, …)` call the framework plugin
           * already compiled them into.
           */
          const compatJsxNodes: JsxSiteNode[] = [];

          // A root-scope compat caller (`useLingui()`) names its dictionaries
          // through the message ids used elsewhere in the file, so those
          // id-carrying sites are handed to the compat pass from the same walk.
          const collectMessageIds = compat?.needsMessageIdSites() ?? false;

          if (callerMap.size > 0 || compat?.hasCallers()) {
            programPath.traverse({
              CallExpression(path) {
                if (collectMessageIds) compat?.collectMessageIdSite(path.node);
                if (compat?.ownsJsxSite(path.node)) {
                  compatJsxNodes.push(path.node);
                }

                const callee = path.node.callee;
                if (!t.isIdentifier(callee)) return;

                if (callerMap.has(callee.name)) {
                  nativeCallNodes.push(path.node);
                } else if (compat?.ownsLocalName(callee.name)) {
                  compatCallNodes.push(path.node);

                  // `const { i18n, _, t } = useLingui()` — the destructured
                  // names are how bare `t('…')` sites are told apart from
                  // unrelated helpers of the same name.
                  const declarator = path.parent;
                  if (
                    t.isVariableDeclarator(declarator) &&
                    t.isObjectPattern(declarator.id)
                  ) {
                    compat.noteDestructuredResult(
                      callee.name,
                      declarator.id.properties.flatMap((property) =>
                        t.isObjectProperty(property) &&
                        t.isIdentifier(property.value)
                          ? [property.value.name]
                          : []
                      )
                    );
                  }
                }
              },
              ...(collectMessageIds
                ? {
                    TaggedTemplateExpression(path) {
                      compat?.collectMessageIdSite(path.node);
                    },
                  }
                : {}),
              ...(compat
                ? {
                    JSXOpeningElement(path) {
                      if (collectMessageIds) {
                        compat.collectMessageIdSite(path.node);
                      }
                      if (compat.ownsJsxSite(path.node)) {
                        compatJsxNodes.push(path.node);
                      }
                    },
                  }
                : {}),
            });
          }

          // ── Step 3 — analysis.
          //
          // A per-dictionary override reached from this file can promote a
          // whole package import to a dynamic loader, so the helper family is
          // decided per package before anything is rewritten.
          const packagesWithDynamicCall = new Set<string>();
          const packagesWithFetchCall = new Set<string>();

          for (const callNode of nativeCallNodes) {
            const callee = callNode.callee as BabelTypes.Identifier;
            if (callerMap.get(callee.name) !== 'useIntlayer') continue;

            const callerPackage = callerPackageMap.get(callee.name);
            if (!callerPackage) continue;

            const key = readStaticString(t, callNode.arguments[0]);
            if (!key) continue;

            const overrideMode = state.opts.dictionaryModeMap?.[key];

            if (overrideMode === 'dynamic') {
              packagesWithDynamicCall.add(callerPackage);
            } else if (overrideMode === 'fetch') {
              packagesWithFetchCall.add(callerPackage);
            }
          }

          // The compat half decides its own file-level helper family and drops
          // the callers whose call sites it cannot resolve.
          compat?.analyzeCalls(
            compatCallNodes,
            compatJsxNodes,
            (localName) =>
              programPath.scope.getBinding(localName)?.referencePaths.length ??
              0
          );

          const helperPlanCache = new Map<string, PackageHelperPlan>();

          const getHelperPlan = (packageName: string): PackageHelperPlan => {
            let plan = helperPlanCache.get(packageName);

            if (plan === undefined) {
              plan = resolveHelperPlan(
                packageName,
                state.opts.importMode,
                state.opts.isServer,
                packagesWithDynamicCall.has(packageName),
                packagesWithFetchCall.has(packageName)
              );
              helperPlanCache.set(packageName, plan);
            }

            return plan;
          };

          // ── Step 4 — rewrite the imports.
          //
          // Moving a helper to a package's `/server` entry is the only edit
          // that changes the program body; the new declarations are recorded
          // here and applied with the dictionary imports in step 6, so no
          // stored node is invalidated mid-rewrite.
          const serverImportsByAnchor = new Map<
            BabelTypes.ImportDeclaration,
            BabelTypes.ImportDeclaration
          >();
          const emptiedImportNodes = new Set<BabelTypes.ImportDeclaration>();

          for (const importNode of compatImportNodes) {
            // Compat caller import rename: point the specifier at the
            // dictionary-accepting helper exported by the compat package
            // (`useTranslation` → `useDictionary`), keeping the local alias so
            // call sites read unchanged.
            compat?.rewriteImportSpecifiers(importNode);
          }

          for (const importNode of nativeImportNodes) {
            // Per-import swap, mirrored across bundles — Solid hydration ids
            // rely on the SSR and client helpers consuming one resource slot
            // per call alike (see solid-intlayer/server).
            const helperPlan = getHelperPlan(importNode.source.value);
            const serverSource =
              helperPlan === 'ssrStatic'
                ? SSR_STATIC_IMPORT_SOURCE[importNode.source.value]
                : undefined;

            const helperMap: Record<string, string> =
              helperPlan === 'dynamic'
                ? DYNAMIC_HELPER_MAP
                : STATIC_IMPORT_FUNCTION;

            const serverSpecifiers: BabelTypes.ImportSpecifier[] = [];

            for (const spec of importNode.specifiers) {
              if (!t.isImportSpecifier(spec)) continue;

              const importedName = importedSpecifierName(t, spec);
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
              serverImportsByAnchor.set(
                importNode,
                t.importDeclaration(
                  serverSpecifiers,
                  t.stringLiteral(serverSource)
                )
              );

              const serverSpecifierSet = new Set<BabelTypes.Node>(
                serverSpecifiers
              );
              importNode.specifiers = importNode.specifiers.filter(
                (spec) => !serverSpecifierSet.has(spec)
              );

              if (importNode.specifiers.length === 0) {
                emptiedImportNodes.add(importNode);
              }
            }
          }

          // ── Step 5 — rewrite the call sites and bound JSX elements.
          for (const callNode of compatCallNodes) {
            compat?.rewriteCall(callNode);
          }

          for (const jsxNode of compatJsxNodes) {
            compat?.rewriteJsxSite(jsxNode);
          }

          for (const callNode of nativeCallNodes) {
            const callee = callNode.callee as BabelTypes.Identifier;
            const originalImportedName = callerMap.get(callee.name)!;

            const key = readStaticString(t, callNode.arguments[0]);
            if (!key) continue;

            const callerPackage = callerPackageMap.get(callee.name);
            const importMode = state.opts.importMode;
            const isUseIntlayer = originalImportedName === 'useIntlayer';
            const isGetIntlayerAsync =
              originalImportedName === 'getIntlayerAsync';
            const dictionaryOverrideMode = state.opts.dictionaryModeMap?.[key];
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
              // Static helper (useDictionary / getDictionary): replace the key
              // argument with the imported dictionary object.
              callNode.arguments[0] = t.identifier(ident.name);
            } else {
              // Dynamic / fetch helper: first argument is the loader, the key
              // stays as the second one.
              callNode.arguments = [
                t.identifier(ident.name),
                ...callNode.arguments,
              ];
            }
          }

          // ── Step 6 — apply every body edit in one pass.
          const dictionaryImports = hasValidImport
            ? buildDictionaryImportDeclarations(t, state, imports)
            : [];

          const hasImportMoves =
            serverImportsByAnchor.size > 0 || emptiedImportNodes.size > 0;

          if (dictionaryImports.length === 0 && !hasImportMoves) return;

          const nextBody: BabelTypes.Statement[] = [];

          for (const statement of programBody) {
            if (
              t.isImportDeclaration(statement) &&
              emptiedImportNodes.has(statement)
            ) {
              // Every specifier moved to the /server entry; drop the husk.
              const serverImport = serverImportsByAnchor.get(statement);
              if (serverImport) nextBody.push(serverImport);
              continue;
            }

            nextBody.push(statement);

            if (t.isImportDeclaration(statement)) {
              const serverImport = serverImportsByAnchor.get(statement);
              if (serverImport) nextBody.push(serverImport);
            }
          }

          /* Keep "use client" / "use server" directives at the very top. */
          let insertPos = 0;
          for (const statement of nextBody) {
            if (
              t.isExpressionStatement(statement) &&
              t.isStringLiteral(statement.expression) &&
              !statement.expression.value.startsWith('import') &&
              !statement.expression.value.startsWith('require')
            ) {
              insertPos += 1;
            } else {
              break;
            }
          }

          nextBody.splice(insertPos, 0, ...dictionaryImports);
          programPath.node.body = nextBody;
        },
      },
    },
  };
};
