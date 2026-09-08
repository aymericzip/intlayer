import type * as BabelTypes from '@babel/types';
import {
  type CallerDescriptor,
  getRewritableCallers,
} from '@intlayer/config/callers';
import type {
  DictionaryImportRegistry,
  ImportMode,
} from '../dictionaryImports';
import { splitNamespace } from '../staticAstReaders';
import { resolveNamespaceForRewrite } from './namespaceResolution';

/**
 * Compat half of the optimize pass.
 *
 * Every adapter-specific behaviour of the build-time rewrite lives here:
 * matching a compat caller's import, resolving its namespace, and re-pointing
 * the import specifier at the dictionary-accepting helper.
 *
 * The pass works on plain AST nodes rather than `NodePath`s: the optimize
 * plugin collects the call sites in its single traversal and hands them over,
 * so nothing here walks the tree.
 *
 * It is created only when compat descriptors were injected by a compat
 * package's bundler plugin, so a plain intlayer build never allocates it —
 * {@link createCompatOptimizePass} returns `null` for an empty registry.
 */
export type CompatOptimizePass = {
  /**
   * Whether `importSource` exports at least one rewritable compat caller, so
   * the optimize plugin knows the import is worth inspecting even though it is
   * not a native intlayer package.
   */
  ownsImportSource: (importSource: string) => boolean;
  /** Records the local alias one import specifier introduces. */
  noteImport: (
    importSource: string,
    importedName: string,
    localName: string
  ) => void;
  /** Whether `localName` was bound to a compat caller by an import. */
  ownsLocalName: (localName: string) => boolean;
  /** Whether the file imported any compat caller at all. */
  hasCallers: () => boolean;
  /**
   * Resolves the namespace of every collected call, dropping the callers that
   * cannot be rewritten and deciding the file-level helper family. Must run
   * after every import was noted and before any rewrite.
   */
  analyzeCalls: (callNodes: readonly BabelTypes.CallExpression[]) => void;
  /** Rewrites one compat call site, if its caller survived {@link analyzeCalls}. */
  rewriteCall: (callNode: BabelTypes.CallExpression) => void;
  /** Re-points the compat specifiers of one import declaration. */
  rewriteImportSpecifiers: (importNode: BabelTypes.ImportDeclaration) => void;
};

/**
 * Rewritable slice of a descriptor registry, cached by array reference.
 *
 * Babel reuses one plugin-options object for every file of a build, so the
 * filter runs once per build instead of once per transformed file.
 */
const rewritableCallersCache = new WeakMap<
  readonly CallerDescriptor[],
  readonly CallerDescriptor[]
>();

const getCachedRewritableCallers = (
  compatCallers: readonly CallerDescriptor[]
): readonly CallerDescriptor[] => {
  let rewritable = rewritableCallersCache.get(compatCallers);

  if (!rewritable) {
    rewritable = getRewritableCallers([...compatCallers]);
    rewritableCallersCache.set(compatCallers, rewritable);
  }

  return rewritable;
};

/**
 * `importSource` → the callers it exports, indexed by their imported name.
 *
 * Built once per descriptor registry so matching an import specifier is two
 * map lookups instead of a scan over every descriptor's `importSources`.
 */
type CallerIndex = Map<string, Map<string, CallerDescriptor>>;

const callerIndexCache = new WeakMap<
  readonly CallerDescriptor[],
  CallerIndex
>();

const getCallerIndex = (
  rewritableCallers: readonly CallerDescriptor[]
): CallerIndex => {
  let index = callerIndexCache.get(rewritableCallers);

  if (!index) {
    index = new Map();

    for (const descriptor of rewritableCallers) {
      for (const importSource of descriptor.importSources) {
        let byName = index.get(importSource);

        if (!byName) {
          byName = new Map();
          index.set(importSource, byName);
        }

        byName.set(descriptor.callerName, descriptor);
      }
    }

    callerIndexCache.set(rewritableCallers, index);
  }

  return index;
};

/**
 * Builds the compat optimize pass for one source file, or `null` when no
 * compat caller was injected.
 *
 * @param babelTypes - Babel's type helpers.
 * @param compatCallers - Descriptors injected by the compat packages' plugins.
 * @param imports - Shared dictionary-import registry for the file.
 * @param buildModes - The file's global import mode and per-dictionary overrides.
 */
export const createCompatOptimizePass = (
  babelTypes: typeof BabelTypes,
  compatCallers: readonly CallerDescriptor[],
  imports: DictionaryImportRegistry,
  buildModes: {
    importMode: ImportMode | undefined;
    dictionaryModeMap?: Record<string, ImportMode | undefined>;
  }
): CompatOptimizePass | null => {
  const rewritableCallers = getCachedRewritableCallers(compatCallers);
  if (rewritableCallers.length === 0) return null;

  const callerIndex = getCallerIndex(rewritableCallers);
  const { importMode, dictionaryModeMap } = buildModes;

  /** Local alias → the descriptor it was imported as. */
  const callersByLocalName = new Map<string, CallerDescriptor>();

  /**
   * File-level decision: one import specifier serves every call in the file, so
   * a global dynamic/fetch mode — or any per-dictionary override reached from
   * this file — flips all rewritten compat calls to the dynamic helper.
   */
  let useDynamicHelpers = false;

  /** Narrows to the two modes that resolve through a per-locale loader. */
  const isDynamicMode = (
    mode: ImportMode | undefined
  ): mode is 'dynamic' | 'fetch' => mode === 'dynamic' || mode === 'fetch';

  /** Import mode a compat call site resolves to for `dictionaryKey`. */
  const importModeFor = (dictionaryKey: string): ImportMode => {
    if (!useDynamicHelpers) return 'static';

    const override = dictionaryModeMap?.[dictionaryKey];
    if (isDynamicMode(override)) return override;

    return isDynamicMode(importMode) ? importMode : 'dynamic';
  };

  return {
    ownsImportSource: (importSource) => callerIndex.has(importSource),

    noteImport: (importSource, importedName, localName) => {
      const descriptor = callerIndex.get(importSource)?.get(importedName);
      if (descriptor) callersByLocalName.set(localName, descriptor);
    },

    ownsLocalName: (localName) => callersByLocalName.has(localName),

    hasCallers: () => callersByLocalName.size > 0,

    analyzeCalls: (callNodes) => {
      if (callersByLocalName.size === 0) return;

      /**
       * Locals with at least one call site whose namespace could not be read:
       * one import specifier serves every call in the file, so re-pointing it
       * while leaving those calls untouched would hand a raw namespace string
       * — or nothing at all — to the dictionary-accepting helper.
       */
      const unresolvableLocalNames = new Set<string>();
      let hasDynamicCall = false;

      for (const callNode of callNodes) {
        const callee = callNode.callee;
        if (!babelTypes.isIdentifier(callee)) continue;

        const descriptor = callersByLocalName.get(callee.name);
        if (!descriptor) continue;

        const namespaceMatch = resolveNamespaceForRewrite(
          babelTypes,
          callNode.arguments,
          descriptor
        );

        // No readable namespace — a computed key, or a call that passes none
        // at all (`useTranslations()`). Either way the dictionary is unknown at
        // build time, so the call keeps resolving through the runtime registry
        // and holds back the siblings sharing its import.
        if (!namespaceMatch) {
          unresolvableLocalNames.add(callee.name);
          continue;
        }

        const { dictionaryKey } = splitNamespace(namespaceMatch.fullNamespace);
        if (isDynamicMode(dictionaryModeMap?.[dictionaryKey])) {
          hasDynamicCall = true;
        }
      }

      for (const localName of unresolvableLocalNames) {
        callersByLocalName.delete(localName);
      }

      useDynamicHelpers = isDynamicMode(importMode) || hasDynamicCall;
    },

    rewriteCall: (callNode) => {
      const callee = callNode.callee;
      if (!babelTypes.isIdentifier(callee)) return;

      const descriptor = callersByLocalName.get(callee.name);
      if (!descriptor) return;

      const callArguments = callNode.arguments;
      const namespaceMatch = resolveNamespaceForRewrite(
        babelTypes,
        callArguments,
        descriptor
      );
      // Filtered out by `analyzeCalls` — the import keeps its original specifier.
      if (!namespaceMatch) return;

      const { dictionaryKey, keyPrefix } = splitNamespace(
        namespaceMatch.fullNamespace
      );
      const mode = importModeFor(dictionaryKey);
      const ident = imports.identFor(dictionaryKey, mode);
      const isDynamicHelper = mode !== 'static';

      if (namespaceMatch.argumentIndex !== undefined) {
        // Positional namespace: replace the string with the dictionary, then
        // the (dynamic) key and the (nested) prefix.
        //   useTranslation('about.counter', opts)
        //     static  → useDictionary(_hash, 'counter', opts)
        //     dynamic → useDictionaryDynamic(_hash_dyn, 'about', 'counter', opts)
        callArguments[namespaceMatch.argumentIndex] = babelTypes.identifier(
          ident.name
        );

        const insertedArguments: BabelTypes.Expression[] = [];
        if (isDynamicHelper) {
          insertedArguments.push(babelTypes.stringLiteral(dictionaryKey));
        }
        if (keyPrefix) {
          insertedArguments.push(babelTypes.stringLiteral(keyPrefix));
        }
        callArguments.splice(
          namespaceMatch.argumentIndex + 1,
          0,
          ...insertedArguments
        );
      } else if (isDynamicHelper) {
        // Fixed / option namespace: prepend the loader and the dictionary key.
        callArguments.unshift(
          babelTypes.identifier(ident.name),
          babelTypes.stringLiteral(dictionaryKey)
        );
      } else {
        // Fixed / option namespace, static helper: prepend the dictionary.
        //   useLingui() → useDictionary(_hash)
        callArguments.unshift(babelTypes.identifier(ident.name));
      }

      // Option namespace: leave only the key-prefix remainder in the options
      // object (or drop the property entirely), so the runtime helper does not
      // re-apply the dictionary key as a lookup prefix.
      //   useI18n({ namespace: 'about' }) → useDictionary(_hash, {})
      if (namespaceMatch.optionProperty && namespaceMatch.optionsObject) {
        if (keyPrefix) {
          namespaceMatch.optionProperty.value =
            babelTypes.stringLiteral(keyPrefix);
        } else {
          namespaceMatch.optionsObject.properties =
            namespaceMatch.optionsObject.properties.filter(
              (property) => property !== namespaceMatch.optionProperty
            );
        }
      }
    },

    rewriteImportSpecifiers: (importNode) => {
      const byName = callerIndex.get(importNode.source.value);
      if (!byName) return;

      for (const specifier of importNode.specifiers) {
        if (!babelTypes.isImportSpecifier(specifier)) continue;

        // Only a specifier still held by `callersByLocalName` is rewritable —
        // `analyzeCalls` removed the ones with an unresolvable call site.
        const descriptor = callersByLocalName.get(specifier.local.name);
        if (!descriptor || !byName.has(descriptor.callerName)) continue;

        // Keep the local alias so call sites read unchanged; only the imported
        // name moves to the dictionary-accepting helper.
        specifier.imported = babelTypes.identifier(
          useDynamicHelpers
            ? descriptor.dynamicReplacement!
            : descriptor.staticReplacement!
        );
      }
    },
  };
};
