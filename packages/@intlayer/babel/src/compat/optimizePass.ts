import type * as BabelTypes from '@babel/types';
import {
  type CallerDescriptor,
  getRewritableCallers,
} from '@intlayer/config/callers';
import type {
  DictionaryImportRegistry,
  ImportMode,
} from '../dictionaryImports';
import {
  ABSENT_VALUE,
  readJsxAttributeString,
  readObjectPropertyNode,
  readStaticString,
  splitNamespace,
} from '../staticAstReaders';
import {
  resolveNamespaceForAnalysis,
  resolveNamespaceForRewrite,
} from './namespaceResolution';

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
  /**
   * Records the names a compat call's result was destructured into
   * (`const { i18n, _, t } = useLingui()`), so a bare `t('…')` call in the
   * file is read as a message-id site of that library. Names that are not
   * message callers of the library are ignored.
   */
  noteDestructuredResult: (localCallerName: string, names: string[]) => void;
  /** Whether the file imported any compat caller at all. */
  hasCallers: () => boolean;
  /**
   * Whether the file imported a root-scope caller whose dictionaries are
   * named by message ids (`useLingui()`), so the traversal must also hand
   * over the id-carrying sites through {@link collectMessageIdSite}. Valid
   * once every import was noted.
   */
  needsMessageIdSites: () => boolean;
  /**
   * Records one node that may carry a message id for a root-scope caller: a
   * call (`i18n._('footer.github')`, `t({ id })`), a tagged template
   * (``t`…` ``) or a JSX opening element (`<Trans id="…" />`). Nodes that
   * match no message caller are ignored.
   */
  collectMessageIdSite: (
    node:
      | BabelTypes.CallExpression
      | BabelTypes.TaggedTemplateExpression
      | BabelTypes.JSXOpeningElement
  ) => void;
  /**
   * Whether the node is an element of a compat JSX caller bound by its id
   * attribute (`<Trans id="…" />`) imported by the file — as source JSX, or
   * already compiled by the framework plugin into `jsx(Trans, { id })`.
   */
  ownsJsxSite: (node: JsxSiteNode) => boolean;
  /**
   * Resolves the namespace of every collected call and element, dropping the
   * callers that cannot be rewritten and deciding the file-level helper
   * family. Must run after every import was noted and every message-id site
   * collected, and before any rewrite.
   *
   * @param countReferences - Number of references a local name has in the
   * file. A JSX caller is only re-pointed when every reference is a bound
   * element: one passed around as a value (`component={Trans}`) would reach
   * the dictionary-accepting replacement without its dictionary.
   */
  analyzeCalls: (
    callNodes: readonly BabelTypes.CallExpression[],
    jsxSites?: readonly JsxSiteNode[],
    countReferences?: (localName: string) => number
  ) => void;
  /** Rewrites one compat call site, if its caller survived {@link analyzeCalls}. */
  rewriteCall: (callNode: BabelTypes.CallExpression) => void;
  /**
   * Binds one compat JSX element, if its caller survived {@link analyzeCalls}:
   * adds the `dictionary` prop naming the dictionary its id addresses.
   */
  rewriteJsxSite: (node: JsxSiteNode) => void;
  /** Re-points the compat specifiers of one import declaration. */
  rewriteImportSpecifiers: (importNode: BabelTypes.ImportDeclaration) => void;
};

/**
 * A compat JSX element as the pass may meet it: the source element, or the
 * call the automatic/classic JSX runtime compiled it into — the optimize
 * transform runs after the framework plugin, so on Vite the compiled form is
 * the usual one.
 */
export type JsxSiteNode =
  | BabelTypes.JSXOpeningElement
  | BabelTypes.CallExpression;

/**
 * Factories a JSX element compiles into — `jsx(Trans, props)` /
 * `_jsxs(Trans, props)` / `jsxRuntime.jsxDEV(Trans, props)` for the automatic
 * runtime, `React.createElement(Trans, props)` for the classic one. The
 * transform aliases the import (`_jsx`), hence the optional underscores.
 */
const COMPILED_JSX_FACTORY_PATTERN = /^_*(jsxs?|jsxDEV|createElement)$/;

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
 * Prop through which a bound compat JSX element (`<Trans>`) receives its
 * dictionary — the static dictionary, or a `[loader, key]` pair in dynamic
 * mode. The compat package's replacement component reads it.
 */
const JSX_DICTIONARY_ATTRIBUTE = 'dictionary';

/**
 * Whether a descriptor's call sites carry the message id themselves, with the
 * dictionary named by the id's first dot-segment (lingui's `_` / `t` /
 * `<Trans>`, react-intl's `formatMessage`). These are the sites a root-scope
 * binding reads its dictionaries from.
 */
const isMessageIdCaller = (descriptor: CallerDescriptor): boolean =>
  descriptor.translationFunction === 'self' &&
  descriptor.namespaceSources.some(
    (source) => source.from === 'path-first-segment'
  );

/**
 * `library` → its message-id callers, cached by registry reference.
 *
 * Read from the full registry rather than its rewritable slice: the id
 * callers are matched as methods or JSX and are never rewritten themselves —
 * they only name the dictionaries a root-scope call in the same file binds.
 */
const messageIdCallersCache = new WeakMap<
  readonly CallerDescriptor[],
  Map<string, CallerDescriptor[]>
>();

const getMessageIdCallersByLibrary = (
  compatCallers: readonly CallerDescriptor[]
): Map<string, CallerDescriptor[]> => {
  let byLibrary = messageIdCallersCache.get(compatCallers);

  if (!byLibrary) {
    byLibrary = new Map();

    for (const descriptor of compatCallers) {
      if (!isMessageIdCaller(descriptor)) continue;

      let descriptors = byLibrary.get(descriptor.library);

      if (!descriptors) {
        descriptors = [];
        byLibrary.set(descriptor.library, descriptors);
      }

      descriptors.push(descriptor);
    }

    messageIdCallersCache.set(compatCallers, byLibrary);
  }

  return byLibrary;
};

/**
 * The dictionaries a library's root-scope calls bind in the current file:
 * the first segment of every static message id, or `undefined` once a single
 * id could not be read — a computed id may address any dictionary, so the
 * calls must keep resolving through the runtime registry.
 */
type RootScopeBinding = Set<string> | undefined;

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
  const messageIdCallersByLibrary = getMessageIdCallersByLibrary(compatCallers);
  const { importMode, dictionaryModeMap } = buildModes;

  /** Local alias → the descriptor it was imported as. */
  const callersByLocalName = new Map<string, CallerDescriptor>();

  /**
   * Root-scope binding per library, filled from the message-id sites the
   * traversal hands over. A library is present only once a root-scope caller
   * of it was imported, so the sites of other libraries are never read.
   */
  const rootScopeBindings = new Map<string, RootScopeBinding>();

  /**
   * Local names a bare message call may use per library: message callers
   * imported from the library (`import { t } from '@lingui/macro'`) and
   * names destructured from a root-scope call's result
   * (`const { _ } = useLingui()`). A bare `t('…')` bound to anything else —
   * say a local wrapper — is not a message-id site, mirroring the usage
   * analyser; method calls (`i18n._('…')`) match by method name alone.
   */
  const bareMessageCallerNames = new Map<string, Set<string>>();

  /**
   * Bare calls met during the traversal, decided once every binding name is
   * known — a destructuring may sit below the call sites in source order.
   */
  const pendingBareCalls: {
    library: string;
    name: string;
    node: BabelTypes.CallExpression;
  }[] = [];

  const addBareMessageCallerName = (library: string, name: string): void => {
    let names = bareMessageCallerNames.get(library);
    if (!names) {
      names = new Set();
      bareMessageCallerNames.set(library, names);
    }
    names.add(name);
  };

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

  /**
   * Whether a call binds through the root-scope path: its descriptor allows
   * it, the library has id callers to read from, and the call itself names
   * no dictionary (`useLingui()`).
   */
  const isRootScopeCall = (
    descriptor: CallerDescriptor,
    callArguments: BabelTypes.CallExpression['arguments']
  ): boolean =>
    descriptor.allowRootScope === true &&
    messageIdCallersByLibrary.has(descriptor.library) &&
    resolveNamespaceForRewrite(babelTypes, callArguments, descriptor) ===
      undefined;

  /** Name a callee or tag reads as, whether bare (`t`) or a method (`i18n.t`). */
  const readCalleeName = (
    node: BabelTypes.Node
  ): { name: string; isMethod: boolean } | undefined => {
    if (babelTypes.isIdentifier(node)) {
      return { name: node.name, isMethod: false };
    }
    if (
      babelTypes.isMemberExpression(node) &&
      babelTypes.isIdentifier(node.property) &&
      !node.computed
    ) {
      return { name: node.property.name, isMethod: true };
    }
    return undefined;
  };

  /** The id descriptor of `library` matching a callee name, if any. */
  const findMessageIdCaller = (
    library: string,
    callee: { name: string; isMethod: boolean } | undefined,
    shape: 'call' | 'tagged-template'
  ): CallerDescriptor | undefined => {
    if (!callee) return undefined;

    return messageIdCallersByLibrary
      .get(library)
      ?.find(
        (descriptor) =>
          descriptor.callerName === callee.name &&
          (shape === 'tagged-template'
            ? descriptor.matchAsTaggedTemplate === true
            : !callee.isMethod || descriptor.matchAsMethod === true)
      );
  };

  /** Records the dictionary key read from one message call's arguments. */
  const recordMessageCall = (
    library: string,
    descriptor: CallerDescriptor,
    callArguments: BabelTypes.CallExpression['arguments']
  ): void => {
    const resolved = resolveNamespaceForAnalysis(
      babelTypes,
      callArguments,
      descriptor.namespaceSources
    );

    recordRootScopeKey(
      library,
      typeof resolved === 'string' && resolved !== ABSENT_VALUE
        ? resolved
        : undefined
    );
  };

  /** Records one dictionary key for `library`, or poisons its binding. */
  const recordRootScopeKey = (
    library: string,
    dictionaryKey: string | undefined
  ): void => {
    const binding = rootScopeBindings.get(library);
    // Already poisoned: nothing can un-poison a file.
    if (binding === undefined) return;

    if (dictionaryKey === undefined) {
      rootScopeBindings.set(library, undefined);
      return;
    }

    binding.add(dictionaryKey);
  };

  /**
   * The dictionary an id-derived key binds: the key itself when the build
   * produced such a dictionary, else the library's whole-file catalog
   * (`messages` for lingui, `index` otherwise) with the id kept intact, else
   * `undefined` — nothing to bind safely.
   *
   * Id-derived keys are guesses, so the set of dictionaries the build actually
   * produced is required to tell a dictionary from a group inside the
   * whole-file catalog.
   */
  const settleDictionaryKey = (
    key: string,
    descriptor: CallerDescriptor
  ): string | undefined => {
    if (!dictionaryModeMap) return undefined;
    if (key in dictionaryModeMap) return key;

    const rootKey = descriptor.rootDictionaryKey ?? 'index';
    return rootKey in dictionaryModeMap ? rootKey : undefined;
  };

  /**
   * Settles every collected key of a library's root-scope binding, poisoning
   * it when one key has nothing to bind — or when no id was read at all, since
   * a call with nothing to bind must keep the registry.
   */
  const settleRootScopeBinding = (
    library: string,
    descriptor: CallerDescriptor
  ): void => {
    const binding = rootScopeBindings.get(library);
    if (binding === undefined || binding.size === 0) {
      rootScopeBindings.set(library, undefined);
      return;
    }

    const settled = new Set<string>();

    for (const key of binding) {
      const dictionaryKey = settleDictionaryKey(key, descriptor);
      if (dictionaryKey === undefined) {
        rootScopeBindings.set(library, undefined);
        return;
      }
      settled.add(dictionaryKey);
    }

    rootScopeBindings.set(library, settled);
  };

  /**
   * A JSX element in either of its shapes, reduced to what the pass needs:
   * the component's local name, its static id, and a way to add a prop.
   */
  type JsxSite = {
    localName: string;
    /** The static id attribute as a string node, `undefined` when dynamic or absent. */
    readId: (attributeName: string) => BabelTypes.StringLiteral | undefined;
    addProp: (name: string, value: BabelTypes.Expression) => void;
  };

  const readJsxSite = (node: JsxSiteNode): JsxSite | undefined => {
    if (babelTypes.isJSXOpeningElement(node)) {
      if (!babelTypes.isJSXIdentifier(node.name)) return undefined;

      return {
        localName: node.name.name,
        readId: (attributeName) =>
          readJsxAttributeString(babelTypes, node, attributeName),
        addProp: (name, value) => {
          node.attributes.push(
            babelTypes.jsxAttribute(
              babelTypes.jsxIdentifier(name),
              babelTypes.jsxExpressionContainer(value)
            )
          );
        },
      };
    }

    // Compiled form: `jsx(Trans, { id: "…" })` / `React.createElement(Trans, {…})`.
    const callee = readCalleeName(node.callee);
    if (!callee || !COMPILED_JSX_FACTORY_PATTERN.test(callee.name)) {
      return undefined;
    }

    const [component, props] = node.arguments;
    if (
      !babelTypes.isIdentifier(component) ||
      !babelTypes.isObjectExpression(props)
    ) {
      return undefined;
    }

    return {
      localName: component.name,
      readId: (attributeName) => {
        const idNode = readObjectPropertyNode(babelTypes, props, attributeName);
        if (idNode === ABSENT_VALUE) return undefined;
        const id = readStaticString(babelTypes, idNode);
        return id === undefined ? undefined : babelTypes.stringLiteral(id);
      },
      addProp: (name, value) => {
        props.properties.push(
          babelTypes.objectProperty(babelTypes.identifier(name), value)
        );
      },
    };
  };

  /** The compat JSX descriptor a site's component was imported as, if any. */
  const jsxDescriptorFor = (
    site: JsxSite | undefined
  ): CallerDescriptor | undefined => {
    if (!site) return undefined;
    const descriptor = callersByLocalName.get(site.localName);
    return descriptor?.jsxIdAttribute !== undefined ? descriptor : undefined;
  };

  /**
   * The dictionary a compat JSX element binds, read from the first segment of
   * its static id attribute — `undefined` when the id is dynamic or names
   * nothing the build produced.
   */
  const resolveJsxDictionaryKey = (
    site: JsxSite,
    descriptor: CallerDescriptor
  ): string | undefined => {
    const idAttribute = site.readId(descriptor.jsxIdAttribute!);
    if (!idAttribute) return undefined;

    const resolved = resolveNamespaceForAnalysis(
      babelTypes,
      [idAttribute],
      descriptor.namespaceSources
    );
    if (typeof resolved !== 'string' || resolved === ABSENT_VALUE) {
      return undefined;
    }

    return settleDictionaryKey(resolved, descriptor);
  };

  return {
    ownsImportSource: (importSource) => callerIndex.has(importSource),

    noteImport: (importSource, importedName, localName) => {
      for (const [library, descriptors] of messageIdCallersByLibrary) {
        if (
          descriptors.some(
            (candidate) =>
              candidate.callerName === importedName &&
              candidate.importSources.includes(importSource)
          )
        ) {
          addBareMessageCallerName(library, localName);
        }
      }

      const descriptor = callerIndex.get(importSource)?.get(importedName);
      if (!descriptor) return;

      callersByLocalName.set(localName, descriptor);

      if (
        descriptor.allowRootScope &&
        messageIdCallersByLibrary.has(descriptor.library) &&
        !rootScopeBindings.has(descriptor.library)
      ) {
        rootScopeBindings.set(descriptor.library, new Set());
      }
    },

    ownsLocalName: (localName) => callersByLocalName.has(localName),

    noteDestructuredResult: (localCallerName, names) => {
      const descriptor = callersByLocalName.get(localCallerName);
      if (!descriptor?.allowRootScope) return;

      const messageCallers = messageIdCallersByLibrary.get(descriptor.library);
      if (!messageCallers) return;

      for (const name of names) {
        if (messageCallers.some((candidate) => candidate.callerName === name)) {
          addBareMessageCallerName(descriptor.library, name);
        }
      }
    },

    hasCallers: () => callersByLocalName.size > 0,

    needsMessageIdSites: () => rootScopeBindings.size > 0,

    ownsJsxSite: (node) => jsxDescriptorFor(readJsxSite(node)) !== undefined,

    collectMessageIdSite: (node) => {
      for (const library of rootScopeBindings.keys()) {
        // An element — as JSX or as the call it compiled into — matched by
        // the component's name against the library's JSX id callers.
        const jsxSite = babelTypes.isTaggedTemplateExpression(node)
          ? undefined
          : readJsxSite(node);
        if (jsxSite) {
          const descriptor = messageIdCallersByLibrary
            .get(library)
            ?.find(
              (candidate) =>
                candidate.callerName === jsxSite.localName &&
                candidate.jsxIdAttribute !== undefined
            );
          if (!descriptor) continue;

          const idAttribute = jsxSite.readId(descriptor.jsxIdAttribute!);
          const resolved = idAttribute
            ? resolveNamespaceForAnalysis(
                babelTypes,
                [idAttribute],
                descriptor.namespaceSources
              )
            : undefined;

          recordRootScopeKey(
            library,
            typeof resolved === 'string' && resolved !== ABSENT_VALUE
              ? resolved
              : undefined
          );
          continue;
        }

        if (babelTypes.isJSXOpeningElement(node)) continue;

        if (babelTypes.isTaggedTemplateExpression(node)) {
          // A macro template (``t`Hello ${name}` ``) has no id until the
          // lingui macro plugin compiles it, so reaching one here means the
          // id is unknowable.
          const descriptor = findMessageIdCaller(
            library,
            readCalleeName(node.tag),
            'tagged-template'
          );
          if (descriptor) recordRootScopeKey(library, undefined);
          continue;
        }

        const callee = readCalleeName(node.callee);
        const descriptor = findMessageIdCaller(library, callee, 'call');
        if (!descriptor || !callee) continue;

        if (!callee.isMethod) {
          pendingBareCalls.push({ library, name: callee.name, node });
          continue;
        }

        recordMessageCall(library, descriptor, node.arguments);
      }
    },

    analyzeCalls: (callNodes, jsxSites = [], countReferences) => {
      if (callersByLocalName.size === 0) return;

      /**
       * Locals with at least one call site whose namespace could not be read:
       * one import specifier serves every call in the file, so re-pointing it
       * while leaving those calls untouched would hand a raw namespace string
       * — or nothing at all — to the dictionary-accepting helper.
       */
      const unresolvableLocalNames = new Set<string>();
      let hasDynamicCall = false;
      const settledLibraries = new Set<string>();

      for (const { library, name, node } of pendingBareCalls) {
        if (!bareMessageCallerNames.get(library)?.has(name)) continue;

        const descriptor = findMessageIdCaller(
          library,
          { name, isMethod: false },
          'call'
        );
        if (descriptor) recordMessageCall(library, descriptor, node.arguments);
      }
      pendingBareCalls.length = 0;

      for (const callNode of callNodes) {
        const callee = callNode.callee;
        if (!babelTypes.isIdentifier(callee)) continue;

        const descriptor = callersByLocalName.get(callee.name);
        if (!descriptor) continue;

        if (isRootScopeCall(descriptor, callNode.arguments)) {
          if (!settledLibraries.has(descriptor.library)) {
            settleRootScopeBinding(descriptor.library, descriptor);
            settledLibraries.add(descriptor.library);
          }

          const binding = rootScopeBindings.get(descriptor.library);
          if (binding === undefined) {
            unresolvableLocalNames.add(callee.name);
            continue;
          }

          for (const dictionaryKey of binding) {
            if (isDynamicMode(dictionaryModeMap?.[dictionaryKey])) {
              hasDynamicCall = true;
            }
          }
          continue;
        }

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

      /** Bound elements seen per JSX caller local, to match against references. */
      const jsxSiteCounts = new Map<string, number>();

      for (const jsxNode of jsxSites) {
        const site = readJsxSite(jsxNode);
        const descriptor = jsxDescriptorFor(site);
        if (!site || !descriptor) continue;

        jsxSiteCounts.set(
          site.localName,
          (jsxSiteCounts.get(site.localName) ?? 0) + 1
        );

        const dictionaryKey = resolveJsxDictionaryKey(site, descriptor);
        if (dictionaryKey === undefined) {
          unresolvableLocalNames.add(site.localName);
          continue;
        }

        if (isDynamicMode(dictionaryModeMap?.[dictionaryKey])) {
          hasDynamicCall = true;
        }
      }

      // A JSX caller is re-pointed only when every reference to it is an
      // element the pass binds — the import specifier serves them all.
      for (const [localName, descriptor] of callersByLocalName) {
        if (descriptor.jsxIdAttribute === undefined) continue;

        const boundSites = jsxSiteCounts.get(localName) ?? 0;
        const references = countReferences?.(localName) ?? boundSites;
        if (boundSites === 0 || references !== boundSites) {
          unresolvableLocalNames.add(localName);
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

      if (isRootScopeCall(descriptor, callArguments)) {
        // Filtered out by `analyzeCalls` when poisoned — never reached here.
        const binding = rootScopeBindings.get(descriptor.library);
        if (binding === undefined) return;

        // Root scope: every dictionary named in the file, ids kept intact so
        // the runtime picks the dictionary by first segment.
        //   useLingui()
        //     static  → useDictionary(_footer, _header)
        //     dynamic → useDictionaryDynamic([_footer_dyn, 'footer'], …)
        for (const dictionaryKey of binding) {
          const mode = importModeFor(dictionaryKey);
          const ident = babelTypes.identifier(
            imports.identFor(dictionaryKey, mode).name
          );

          callArguments.push(
            mode === 'static'
              ? ident
              : babelTypes.arrayExpression([
                  ident,
                  babelTypes.stringLiteral(dictionaryKey),
                ])
          );
        }
        return;
      }

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

    rewriteJsxSite: (node) => {
      const site = readJsxSite(node);
      const descriptor = jsxDescriptorFor(site);
      if (!site || !descriptor) return;

      // Filtered out by `analyzeCalls` when unresolvable — never reached here.
      const dictionaryKey = resolveJsxDictionaryKey(site, descriptor);
      if (dictionaryKey === undefined) return;

      const mode = importModeFor(dictionaryKey);
      const ident = babelTypes.identifier(
        imports.identFor(dictionaryKey, mode).name
      );

      // The id stays intact; the element receives the dictionary it names.
      //   <Trans id="footer.github" />
      //     static  → <Trans id="footer.github" dictionary={_footer} />
      //     dynamic → <Trans id="footer.github" dictionary={[_footer_dyn, 'footer']} />
      site.addProp(
        JSX_DICTIONARY_ATTRIBUTE,
        mode === 'static'
          ? ident
          : babelTypes.arrayExpression([
              ident,
              babelTypes.stringLiteral(dictionaryKey),
            ])
      );
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
