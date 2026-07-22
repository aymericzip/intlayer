import {
  ALL_CALLERS,
  type CallerDescriptor,
  type CallerValueSource,
  isCallerActive,
} from './callers';
import {
  buildParentMap,
  getObjectPropertyNode,
  getObjectPropertyString,
  getPropertyKeyName,
  getStaticStringValue,
  nodeEnd,
  nodeStart,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/** How a message usage appears in source code. */
export type MessageUsageKind =
  /** Translation-function or self call: `t('title')`, `formatMessage({ id })`. */
  | 'call'
  /** Member access / bare reference on a content object: `content.title`. */
  | 'member'
  /** Destructured content field: `const { title } = useIntlayer('home')`. */
  | 'destructure'
  /** JSX message component: `<FormattedMessage id="home.title" />`. */
  | 'jsx'
  /** Tagged template: lingui's ``t`Hello` ``. */
  | 'tagged-template'
  /** The caller call itself (dictionary-level usage): `useIntlayer('home')`. */
  | 'namespace';

/**
 * One resolved translation usage inside a source file: which dictionary and
 * field it reads, and the text span it occupies.
 */
export type MessageUsage = {
  /** The intlayer dictionary key the usage reads from. */
  dictionaryKey: string;
  /**
   * Path of content fields from the dictionary root. Empty for
   * dictionary-level usages (`namespace` kind, or a bare content variable).
   */
  fieldPath: string[];
  /**
   * Spans of each `fieldPath` segment, aligned by index, when the segments
   * are addressable in source (member chains). Used to trim the path to the
   * segment under the cursor.
   */
  fieldSpans?: { start: number; end: number }[];
  /** Start offset of the usage expression. */
  start: number;
  /** End offset of the usage expression. */
  end: number;
  kind: MessageUsageKind;
  /** The caller that produced the usage, e.g. `'useTranslations'`. */
  callerName: string;
  /** The library the caller belongs to, e.g. `'next-intl'` or `'intlayer'`. */
  library: string;
  /** Module specifier the caller was imported from, when resolvable. */
  moduleSource?: string;
  /**
   * `true` for `member` usages that are a bare reference to a bound variable
   * (`{greet}` in JSX after `const { greet } = useIntlayer(…)`) — the field
   * name itself is not spelled at the usage site. Excluded from
   * find-references results but kept for decorations and hover.
   */
  isBareReference?: boolean;
};

// ---------------------------------------------------------------------------
// Internal binding models
// ---------------------------------------------------------------------------

/**
 * Variable holding a translation function (`t`) with a bound namespace.
 * `dictionaryKey` is `null` for root-scope translators (`useTranslations()`
 * without a namespace) — the dictionary is then the first dot-segment of
 * each message id.
 */
type TranslatorBinding = BindingScope & {
  dictionaryKey: string | null;
  keyPrefix: string[];
  descriptor: CallerDescriptor;
  moduleSource?: string;
};

/** Variable holding dictionary content (or a field subtree of it). */
type ContentBinding = BindingScope & {
  dictionaryKey: string;
  basePath: string[];
  descriptor: CallerDescriptor;
  moduleSource?: string;
};

/**
 * Where a binding is visible. Two components in the same file routinely bind
 * the same variable name to different dictionaries:
 *
 *   const Page = () => { const content = useIntlayer('benchmark'); … }
 *   const App  = () => { const content = useIntlayer('app'); … }
 *
 * Without a scope, the second declaration would shadow the first and every
 * usage in the file would resolve to the last dictionary declared.
 */
type BindingScope = {
  /** Span of the function (or the program) the declaration lives in. */
  scopeStart: number;
  scopeEnd: number;
  /** End offset of the declaration itself — usages before it are not bound. */
  declarationEnd: number;
};

/**
 * Property names that are framework accessors rather than content fields
 * (react `.value`, vue refs `.value`, editor `.raw`/`.use`): they are skipped
 * when building field paths.
 */
const ACCESSOR_PROPERTY_NAMES = new Set(['value', 'raw', 'use']);

// ---------------------------------------------------------------------------
// Match helpers
// ---------------------------------------------------------------------------

/**
 * Resolve a value source against a call expression's arguments.
 */
const readValueSource = (
  callNode: OxcNode,
  source: CallerValueSource
): string | null => {
  const argumentsList = callNode['arguments'] as OxcNode[] | undefined;

  switch (source.from) {
    case 'argument':
      return getStaticStringValue(argumentsList?.[source.index]);
    case 'option':
      return getObjectPropertyString(
        argumentsList?.[source.argumentIndex],
        source.property
      );
    case 'fixed':
      return source.value;
    case 'path-first-segment':
      // Resolved from the message id at usage time, not from the call shape.
      return null;
  }
};

/** Read the first matching value from a list of sources. */
const readValueSources = (
  callNode: OxcNode,
  sources: CallerValueSource[] | undefined
): string | null => {
  for (const source of sources ?? []) {
    const value = readValueSource(callNode, source);

    if (value !== null) return value;
  }

  return null;
};

/**
 * Apply nested-namespace semantics: for descriptors flagged
 * `nestedNamespace`, a dotted namespace is split at the first `.` into the
 * dictionary key and a key-prefix path (next-intl:
 * `useTranslations('about.counter')` → dictionary `about`, prefix
 * `['counter']`).
 */
const splitNestedNamespace = (
  descriptor: CallerDescriptor,
  rawNamespace: string
): { dictionaryKey: string; prefixPath: string[] } => {
  if (!descriptor.nestedNamespace || !rawNamespace.includes('.')) {
    return { dictionaryKey: rawNamespace, prefixPath: [] };
  }

  const segments = rawNamespace.split('.');

  return { dictionaryKey: segments[0]!, prefixPath: segments.slice(1) };
};

/**
 * Return the caller name matched by a call/tagged-template callee: the bare
 * identifier name, or the property name of a member expression when the
 * descriptor allows method matching.
 */
const getCalleeName = (
  calleeNode: OxcNode | undefined
): { name: string; isMethod: boolean } | null => {
  if (!calleeNode) return null;

  if (calleeNode['type'] === 'Identifier') {
    return { name: calleeNode['name'] as string, isMethod: false };
  }

  if (
    calleeNode['type'] === 'MemberExpression' &&
    calleeNode['computed'] !== true
  ) {
    const propertyNode = calleeNode['property'] as OxcNode | undefined;

    if (propertyNode?.['type'] === 'Identifier') {
      return { name: propertyNode['name'] as string, isMethod: true };
    }
  }

  return null;
};

/**
 * The message id of a self caller: either the first string argument or the
 * `id` property of a descriptor-object first argument
 * (`formatMessage({ id: 'home.title' })`, `i18n._({ id: '…' })`).
 */
const getSelfCallMessageId = (callNode: OxcNode): string | null => {
  const argumentsList = callNode['arguments'] as OxcNode[] | undefined;
  const firstArgument = argumentsList?.[0];

  if (!firstArgument) return null;

  return (
    getStaticStringValue(firstArgument) ??
    getObjectPropertyString(firstArgument, 'id')
  );
};

/**
 * Split a message id into dictionary key + field path according to the
 * descriptor semantics.
 */
const resolveMessageId = (
  descriptor: CallerDescriptor,
  fixedDictionaryKey: string | null,
  messageId: string
): { dictionaryKey: string; fieldPath: string[] } | null => {
  if (fixedDictionaryKey !== null) {
    return {
      dictionaryKey: fixedDictionaryKey,
      fieldPath: descriptor.flatKey ? [messageId] : messageId.split('.'),
    };
  }

  const usesPathFirstSegment = descriptor.namespaceSources.some(
    (source) => source.from === 'path-first-segment'
  );

  if (!usesPathFirstSegment) return null;

  const segments = messageId.split('.');

  if (!segments[0]) return null;

  return { dictionaryKey: segments[0], fieldPath: segments.slice(1) };
};

/**
 * i18next-style `ns:key` ids override the bound namespace:
 * `t('about:title')` reads the `about` dictionary even when the translator
 * was created with another namespace.
 */
const splitNamespacePrefixedId = (
  messageId: string
): { namespaceOverride: string | null; messagePath: string } => {
  const separatorIndex = messageId.indexOf(':');

  if (separatorIndex <= 0) {
    return { namespaceOverride: null, messagePath: messageId };
  }

  return {
    namespaceOverride: messageId.slice(0, separatorIndex),
    messagePath: messageId.slice(separatorIndex + 1),
  };
};

// ---------------------------------------------------------------------------
// Analyzer
// ---------------------------------------------------------------------------

/** Unwrap `await expression` down to the awaited expression. */
const unwrapAwait = (node: OxcNode | undefined): OxcNode | undefined =>
  node?.['type'] === 'AwaitExpression'
    ? (node['argument'] as OxcNode | undefined)
    : node;

/** Collect every module specifier imported by the program. */
const collectImportSources = (program: OxcNode): Set<string> => {
  const importSources = new Set<string>();

  for (const statement of (program['body'] as OxcNode[]) ?? []) {
    if (statement['type'] !== 'ImportDeclaration') continue;
    const sourceValue = (statement['source'] as OxcNode | undefined)?.['value'];

    if (typeof sourceValue === 'string') importSources.add(sourceValue);
  }

  return importSources;
};

/** Map each imported local name to its module specifier. */
const collectImportedLocalNames = (program: OxcNode): Map<string, string> => {
  const localNameToSource = new Map<string, string>();

  for (const statement of (program['body'] as OxcNode[]) ?? []) {
    if (statement['type'] !== 'ImportDeclaration') continue;
    const sourceValue = (statement['source'] as OxcNode | undefined)?.['value'];

    if (typeof sourceValue !== 'string') continue;

    for (const specifier of (statement['specifiers'] as OxcNode[]) ?? []) {
      const localName = (specifier['local'] as OxcNode | undefined)?.['name'];

      if (typeof localName === 'string') {
        localNameToSource.set(localName, sourceValue);
      }
    }
  }

  return localNameToSource;
};

type AnalyzerState = {
  usages: MessageUsage[];
  /** Bindings are keyed by variable name, then by declaration (see BindingScope). */
  translatorBindings: Map<string, TranslatorBinding[]>;
  contentBindings: Map<string, ContentBinding[]>;
  activeDescriptors: CallerDescriptor[];
  importedLocalNames: Map<string, string>;
  parentMap: Map<OxcNode, OxcNode>;
  program: OxcNode;
};

/** Node types that open a new binding scope. */
const SCOPE_NODE_TYPES = new Set([
  'FunctionDeclaration',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassMethod',
  'ObjectMethod',
  'StaticBlock',
  'Program',
]);

/**
 * Span of the nearest enclosing function — the region a declaration is
 * visible in. Falls back to the whole program for module-level declarations.
 */
const getEnclosingScope = (
  state: AnalyzerState,
  node: OxcNode
): { scopeStart: number; scopeEnd: number } => {
  let current: OxcNode | undefined = node;

  while (current) {
    if (SCOPE_NODE_TYPES.has(current['type'] as string)) {
      return { scopeStart: nodeStart(current), scopeEnd: nodeEnd(current) };
    }
    current = state.parentMap.get(current);
  }

  return {
    scopeStart: nodeStart(state.program),
    scopeEnd: nodeEnd(state.program),
  };
};

const addBinding = <T>(
  bindings: Map<string, T[]>,
  variableName: string,
  binding: T
): void => {
  const existing = bindings.get(variableName);

  if (existing) {
    existing.push(binding);
  } else {
    bindings.set(variableName, [binding]);
  }
};

/**
 * The binding a variable resolves to at `offset`: the innermost scope that
 * contains the offset, among declarations that precede it.
 */
const resolveBinding = <T extends BindingScope>(
  bindings: Map<string, T[]>,
  variableName: string,
  offset: number
): T | undefined => {
  const candidates = bindings.get(variableName);

  if (!candidates) return undefined;

  let best: T | undefined;

  for (const candidate of candidates) {
    if (offset < candidate.scopeStart || offset > candidate.scopeEnd) continue;

    // A usage textually before its declaration belongs to an outer binding.
    if (offset < candidate.declarationEnd) continue;

    // Innermost scope wins; on equal scopes the latest declaration wins.
    if (
      !best ||
      candidate.scopeStart > best.scopeStart ||
      (candidate.scopeStart === best.scopeStart &&
        candidate.declarationEnd > best.declarationEnd)
    ) {
      best = candidate;
    }
  }

  return best;
};

/**
 * Find the descriptor matching a call (or tagged template) callee among the
 * active descriptors.
 */
const matchDescriptorForCallee = (
  state: AnalyzerState,
  calleeNode: OxcNode | undefined,
  filter?: (descriptor: CallerDescriptor) => boolean
): CallerDescriptor | null => {
  const callee = getCalleeName(calleeNode);

  if (!callee) return null;

  for (const descriptor of state.activeDescriptors) {
    if (descriptor.callerName !== callee.name) continue;

    if (callee.isMethod && !descriptor.matchAsMethod) continue;

    if (filter && !filter(descriptor)) continue;

    return descriptor;
  }

  return null;
};

/** The module specifier a caller local name was imported from, if any. */
const getModuleSource = (
  state: AnalyzerState,
  descriptor: CallerDescriptor
): string | undefined =>
  state.importedLocalNames.get(descriptor.callerName) ?? undefined;

/**
 * Recursively register a content destructure pattern: each property key is a
 * field usage, each bound identifier becomes a content binding, and nested
 * patterns extend the field path.
 *
 *   const { searchInput: { text: alias } } = useIntlayer('key')
 *   → usages: ['searchInput'], ['searchInput', 'text']
 *   → binding: alias → ['searchInput', 'text']
 */
const collectContentDestructure = (
  state: AnalyzerState,
  pattern: OxcNode,
  dictionaryKey: string,
  basePath: string[],
  descriptor: CallerDescriptor,
  moduleSource: string | undefined,
  scope: BindingScope
): void => {
  for (const property of (pattern['properties'] as OxcNode[]) ?? []) {
    const propertyType = property['type'] as string;

    if (propertyType !== 'Property' && propertyType !== 'ObjectProperty') {
      continue;
    }

    const keyNode = property['key'] as OxcNode | undefined;
    const fieldName = getPropertyKeyName(keyNode);

    if (!keyNode || !fieldName) continue;

    const fieldPath = [...basePath, fieldName];

    state.usages.push({
      dictionaryKey,
      fieldPath,
      start: nodeStart(keyNode),
      end: nodeEnd(keyNode),
      kind: 'destructure',
      callerName: descriptor.callerName,
      library: descriptor.library,
      moduleSource,
    });

    // Unwrap default values: { title = fallback }
    let valueNode = property['value'] as OxcNode | undefined;

    if (valueNode?.['type'] === 'AssignmentPattern') {
      valueNode = valueNode['left'] as OxcNode | undefined;
    }

    if (valueNode?.['type'] === 'Identifier') {
      addBinding(state.contentBindings, valueNode['name'] as string, {
        dictionaryKey,
        basePath: fieldPath,
        descriptor,
        moduleSource,
        ...scope,
      });
    } else if (valueNode?.['type'] === 'ObjectPattern') {
      collectContentDestructure(
        state,
        valueNode,
        dictionaryKey,
        fieldPath,
        descriptor,
        moduleSource,
        scope
      );
    }
  }
};

/**
 * Register bindings created by `const … = caller(…)` declarations, and record
 * dictionary-level (`namespace`) usages for every matched caller call.
 */
const collectBindings = (state: AnalyzerState, program: OxcNode): void => {
  walkAst(program, (node) => {
    if (node['type'] === 'CallExpression') {
      const descriptor = matchDescriptorForCallee(
        state,
        node['callee'] as OxcNode | undefined,
        (candidate) => candidate.translationFunction !== 'self'
      );

      if (descriptor) {
        const rawNamespace = readValueSources(
          node,
          descriptor.namespaceSources
        );

        if (rawNamespace) {
          const { dictionaryKey } = splitNestedNamespace(
            descriptor,
            rawNamespace
          );

          state.usages.push({
            dictionaryKey,
            fieldPath: [],
            start: nodeStart(node),
            end: nodeEnd(node),
            kind: 'namespace',
            callerName: descriptor.callerName,
            library: descriptor.library,
            moduleSource: getModuleSource(state, descriptor),
          });
        }
      }
      return;
    }

    if (node['type'] !== 'VariableDeclarator') return;

    const initializer = unwrapAwait(node['init'] as OxcNode | undefined);

    if (initializer?.['type'] !== 'CallExpression') return;

    const descriptor = matchDescriptorForCallee(
      state,
      initializer['callee'] as OxcNode | undefined,
      (candidate) => candidate.translationFunction !== 'self'
    );

    if (!descriptor) return;

    const rawNamespace = readValueSources(
      initializer,
      descriptor.namespaceSources
    );

    // Root scope: `useTranslations()` — the dictionary comes from each id.
    if (!rawNamespace && !descriptor.allowRootScope) return;

    const namespaceSplit = rawNamespace
      ? splitNestedNamespace(descriptor, rawNamespace)
      : { dictionaryKey: null, prefixPath: [] };

    const keyPrefixValue = readValueSources(
      initializer,
      descriptor.keyPrefixSources
    );
    const keyPrefix = [
      ...namespaceSplit.prefixPath,
      ...(keyPrefixValue ? keyPrefixValue.split('.') : []),
    ];
    const dictionaryKey = namespaceSplit.dictionaryKey;
    const moduleSource = getModuleSource(state, descriptor);
    const idNode = node['id'] as OxcNode | undefined;

    if (!idNode) return;

    const scope: BindingScope = {
      ...getEnclosingScope(state, node),
      declarationEnd: nodeEnd(node),
    };

    // const t = useTranslations('ns') / const content = useIntlayer('key')
    if (idNode['type'] === 'Identifier') {
      const variableName = idNode['name'] as string;

      if (descriptor.translationFunction === 'return-value') {
        addBinding(state.translatorBindings, variableName, {
          dictionaryKey,
          keyPrefix,
          descriptor,
          moduleSource,
          ...scope,
        });
      } else if (
        descriptor.translationFunction === 'content' &&
        dictionaryKey
      ) {
        addBinding(state.contentBindings, variableName, {
          dictionaryKey,
          basePath: keyPrefix,
          descriptor,
          moduleSource,
          ...scope,
        });
      }
      return;
    }

    // const { t } = useTranslation('ns') / const { title } = useIntlayer('key')
    if (idNode['type'] !== 'ObjectPattern') return;

    if (descriptor.translationFunction === 'content') {
      if (!dictionaryKey) return;

      collectContentDestructure(
        state,
        idNode,
        dictionaryKey,
        keyPrefix,
        descriptor,
        moduleSource,
        scope
      );
      return;
    }

    if (descriptor.translationFunction !== 'destructured-t') return;

    for (const property of (idNode['properties'] as OxcNode[]) ?? []) {
      const propertyType = property['type'] as string;

      if (propertyType !== 'Property' && propertyType !== 'ObjectProperty') {
        continue;
      }

      const keyNode = property['key'] as OxcNode | undefined;
      const valueNode = property['value'] as OxcNode | undefined;
      const fieldName = getPropertyKeyName(keyNode);
      const localName =
        valueNode?.['type'] === 'Identifier'
          ? (valueNode['name'] as string)
          : null;

      // Only the `t` property carries the translation function.
      if (fieldName !== 't' || !localName) continue;

      addBinding(state.translatorBindings, localName, {
        dictionaryKey,
        keyPrefix,
        descriptor,
        moduleSource,
        ...scope,
      });
    }
  });
};

/**
 * Record `t('path.to.field')` calls on translator bindings, and self-caller
 * calls (`formatMessage({ id })`, `i18n._('id')`).
 */
const collectCallUsages = (state: AnalyzerState, program: OxcNode): void => {
  walkAst(program, (node) => {
    if (node['type'] === 'TaggedTemplateExpression') {
      collectTaggedTemplateUsage(state, node);
      return;
    }

    if (node['type'] !== 'CallExpression') return;

    const callee = node['callee'] as OxcNode | undefined;

    // Translator binding call: t('path.to.field')
    if (callee?.['type'] === 'Identifier') {
      const binding = resolveBinding(
        state.translatorBindings,
        callee['name'] as string,
        nodeStart(node)
      );

      if (binding) {
        const argumentsList = node['arguments'] as OxcNode[] | undefined;
        const messageId = getStaticStringValue(argumentsList?.[0]);

        if (messageId) {
          const { namespaceOverride, messagePath } =
            splitNamespacePrefixedId(messageId);
          let dictionaryKey = namespaceOverride ?? binding.dictionaryKey;
          let fieldPath = namespaceOverride
            ? messagePath.split('.')
            : [...binding.keyPrefix, ...messagePath.split('.')];

          // Root-scope translator (`useTranslations()`): the first id
          // segment is the dictionary key.
          if (dictionaryKey === null) {
            const segments = messagePath.split('.');
            dictionaryKey = segments[0] ?? null;
            fieldPath = segments.slice(1);
          }

          if (dictionaryKey) {
            state.usages.push({
              dictionaryKey,
              fieldPath,
              start: nodeStart(node),
              end: nodeEnd(node),
              kind: 'call',
              callerName: binding.descriptor.callerName,
              library: binding.descriptor.library,
              moduleSource: binding.moduleSource,
            });
          }
        }
        return;
      }
    }

    // Self caller: the call itself carries the message id.
    const descriptor = matchDescriptorForCallee(
      state,
      callee,
      (candidate) => candidate.translationFunction === 'self'
    );

    if (!descriptor) return;

    const messageId = getSelfCallMessageId(node);

    if (!messageId) return;

    const fixedDictionaryKey = readValueSources(
      node,
      descriptor.namespaceSources
    );
    const resolved = resolveMessageId(
      descriptor,
      fixedDictionaryKey,
      messageId
    );

    if (!resolved) return;

    state.usages.push({
      ...resolved,
      start: nodeStart(node),
      end: nodeEnd(node),
      kind: 'call',
      callerName: descriptor.callerName,
      library: descriptor.library,
      moduleSource: getModuleSource(state, descriptor),
    });
  });
};

/**
 * Lingui macro tagged template: ``t`Hello ${name}` `` — the catalog id is the
 * template text with `{placeholder}` slots for each expression.
 */
const collectTaggedTemplateUsage = (
  state: AnalyzerState,
  node: OxcNode
): void => {
  const descriptor = matchDescriptorForCallee(
    state,
    node['tag'] as OxcNode | undefined,
    (candidate) => candidate.matchAsTaggedTemplate === true
  );

  if (!descriptor) return;

  const quasiNode = node['quasi'] as OxcNode | undefined;
  const quasis = (quasiNode?.['quasis'] as OxcNode[]) ?? [];
  const expressions = (quasiNode?.['expressions'] as OxcNode[]) ?? [];

  let messageId = '';

  for (let index = 0; index < quasis.length; index++) {
    const valueNode = quasis[index]?.['value'] as OxcNode | undefined;
    messageId +=
      (valueNode?.['cooked'] as string) ?? (valueNode?.['raw'] as string) ?? '';

    if (index < expressions.length) {
      const expression = expressions[index]!;
      const placeholder =
        expression['type'] === 'Identifier'
          ? (expression['name'] as string)
          : String(index);
      messageId += `{${placeholder}}`;
    }
  }

  if (!messageId) return;

  const fixedDictionaryKey = readValueSources(
    node,
    descriptor.namespaceSources
  );
  const resolved = resolveMessageId(descriptor, fixedDictionaryKey, messageId);

  if (!resolved) return;

  state.usages.push({
    ...resolved,
    start: nodeStart(node),
    end: nodeEnd(node),
    kind: 'tagged-template',
    callerName: descriptor.callerName,
    library: descriptor.library,
    moduleSource: getModuleSource(state, descriptor),
  });
};

/** Read a static string JSX attribute from an opening element. */
const getJsxAttributeString = (
  openingElement: OxcNode,
  attributeName: string
): string | null => {
  for (const attribute of (openingElement['attributes'] as OxcNode[]) ?? []) {
    if (attribute['type'] !== 'JSXAttribute') continue;

    const nameNode = attribute['name'] as OxcNode | undefined;

    if ((nameNode?.['name'] as string) !== attributeName) continue;

    const valueNode = attribute['value'] as OxcNode | undefined;

    if (!valueNode) return null;

    // <Trans i18nKey="key" /> or <Trans i18nKey={'key'} />
    const directValue = getStaticStringValue(valueNode);

    if (directValue !== null) return directValue;

    if (valueNode['type'] === 'JSXExpressionContainer') {
      return getStaticStringValue(
        valueNode['expression'] as OxcNode | undefined
      );
    }

    return null;
  }

  return null;
};

/**
 * Record JSX message components: `<FormattedMessage id="home.title" />`,
 * `<Trans i18nKey="richText" />`, `<Trans id="…" />`.
 */
const collectJsxUsages = (state: AnalyzerState, program: OxcNode): void => {
  // Fallback namespace for JSX components without an explicit one: the single
  // distinct translator namespace declared in the file (react-i18next Trans).
  const translatorNamespaces = new Set(
    [...state.translatorBindings.values()]
      .flat()
      .map((binding) => binding.dictionaryKey)
      .filter(
        (dictionaryKey): dictionaryKey is string => dictionaryKey !== null
      )
  );
  const fallbackNamespace =
    translatorNamespaces.size === 1 ? [...translatorNamespaces][0]! : null;

  walkAst(program, (node) => {
    if (node['type'] !== 'JSXOpeningElement') return;

    const nameNode = node['name'] as OxcNode | undefined;

    if (nameNode?.['type'] !== 'JSXIdentifier') return;

    const elementName = nameNode['name'] as string;

    for (const descriptor of state.activeDescriptors) {
      if (!descriptor.jsxIdAttribute) continue;

      if (descriptor.callerName !== elementName) continue;

      const messageId = getJsxAttributeString(node, descriptor.jsxIdAttribute);

      if (messageId === null) continue;

      const namespaceFromAttribute = descriptor.jsxNamespaceAttribute
        ? getJsxAttributeString(node, descriptor.jsxNamespaceAttribute)
        : null;
      const fixedNamespace = descriptor.namespaceSources.find(
        (source) => source.from === 'fixed'
      );
      const dictionaryKey =
        namespaceFromAttribute ??
        (fixedNamespace?.from === 'fixed' ? fixedNamespace.value : null) ??
        fallbackNamespace;

      let resolved: { dictionaryKey: string; fieldPath: string[] } | null;

      if (dictionaryKey) {
        resolved = {
          dictionaryKey,
          fieldPath: descriptor.flatKey ? [messageId] : messageId.split('.'),
        };
      } else {
        resolved = resolveMessageId(descriptor, null, messageId);
      }

      if (!resolved) continue;

      state.usages.push({
        ...resolved,
        start: nodeStart(node),
        end: nodeEnd(node),
        kind: 'jsx',
        callerName: descriptor.callerName,
        library: descriptor.library,
        moduleSource: getModuleSource(state, descriptor),
      });
      return;
    }
  });
};

/** Identifier positions that are declarations, not references. */
const isDeclarationPosition = (
  identifierNode: OxcNode,
  parentMap: Map<OxcNode, OxcNode>
): boolean => {
  const parent = parentMap.get(identifierNode);

  if (!parent) return false;

  const parentType = parent['type'] as string;

  if (parentType === 'VariableDeclarator' && parent['id'] === identifierNode) {
    return true;
  }

  if (
    (parentType === 'Property' || parentType === 'ObjectProperty') &&
    parentMap.get(parent)?.['type'] === 'ObjectPattern'
  ) {
    return true;
  }

  if (parentType === 'ImportSpecifier' || parentType === 'PropertyDefinition') {
    return true;
  }

  if (
    parentType === 'FunctionDeclaration' ||
    parentType === 'FunctionExpression' ||
    parentType === 'ArrowFunctionExpression'
  ) {
    return true;
  }

  // Object-literal keys: { title: … }
  if (
    (parentType === 'Property' || parentType === 'ObjectProperty') &&
    parent['key'] === identifierNode &&
    parentMap.get(parent)?.['type'] === 'ObjectExpression'
  ) {
    return true;
  }

  return false;
};

/** Identifier used as the (non-computed) property name of a member access. */
const isPropertyNamePosition = (
  identifierNode: OxcNode,
  parentMap: Map<OxcNode, OxcNode>
): boolean => {
  const parent = parentMap.get(identifierNode);

  if (!parent) return false;

  const parentType = parent['type'] as string;

  return (
    (parentType === 'MemberExpression' &&
      parent['property'] === identifierNode &&
      parent['computed'] !== true) ||
    (parentType === 'JSXMemberExpression' &&
      parent['property'] === identifierNode)
  );
};

/**
 * Record member-access / bare-reference usages of content bindings:
 * `content.section.title`, `{title}` (destructured field reference),
 * Svelte's `$content.title`, Vue's `content.value.title`.
 */
const collectMemberUsages = (
  state: AnalyzerState,
  program: OxcNode,
  parentMap: Map<OxcNode, OxcNode>
): void => {
  if (state.contentBindings.size === 0) return;

  walkAst(program, (node) => {
    const nodeType = node['type'] as string;

    if (nodeType !== 'Identifier' && nodeType !== 'JSXIdentifier') return;

    const rawName = node['name'] as string;
    // Svelte store sugar: `$content` reads the `content` store.
    const variableName = rawName.startsWith('$') ? rawName.slice(1) : rawName;
    const binding = resolveBinding(
      state.contentBindings,
      variableName,
      nodeStart(node)
    );

    if (!binding) return;

    // Skip identifiers in non-value positions: TypeScript type annotations
    // (`useIntlayer<{ greet: string }>`) and JSX attribute names.
    const parentType = parentMap.get(node)?.['type'] as string | undefined;

    if (parentType?.startsWith('TS') || parentType === 'JSXAttribute') return;

    if (isDeclarationPosition(node, parentMap)) return;

    if (isPropertyNamePosition(node, parentMap)) return;

    // Climb the member chain upward, collecting property segments.
    const fieldPath = [...binding.basePath];
    const fieldSpans: { start: number; end: number }[] = fieldPath.map(() => ({
      start: nodeStart(node),
      end: nodeEnd(node),
    }));

    let currentNode: OxcNode = node;

    while (true) {
      const parent = parentMap.get(currentNode);

      if (!parent) break;

      const parentType = parent['type'] as string;
      const isMemberAccess =
        (parentType === 'MemberExpression' &&
          parent['object'] === currentNode &&
          parent['computed'] !== true) ||
        (parentType === 'JSXMemberExpression' &&
          parent['object'] === currentNode);

      if (isMemberAccess) {
        const propertyNode = parent['property'] as OxcNode;
        const propertyName = propertyNode['name'] as string;

        if (!ACCESSOR_PROPERTY_NAMES.has(propertyName)) {
          fieldPath.push(propertyName);
          fieldSpans.push({
            start: nodeStart(propertyNode),
            end: nodeEnd(propertyNode),
          });
        }
        currentNode = parent;
        continue;
      }

      // Computed string access: content['title']
      if (
        parentType === 'MemberExpression' &&
        parent['object'] === currentNode &&
        parent['computed'] === true
      ) {
        const propertyValue = getStaticStringValue(
          parent['property'] as OxcNode | undefined
        );

        if (propertyValue === null) break;

        fieldPath.push(propertyValue);
        fieldSpans.push({
          start: nodeStart(parent['property'] as OxcNode),
          end: nodeEnd(parent['property'] as OxcNode),
        });
        currentNode = parent;
        continue;
      }

      // Call of an accessor / chain terminator: content.title.use()
      if (parentType === 'CallExpression' && parent['callee'] === currentNode) {
        currentNode = parent;
        continue;
      }

      break;
    }

    state.usages.push({
      dictionaryKey: binding.dictionaryKey,
      fieldPath,
      fieldSpans,
      start: nodeStart(node),
      end: nodeEnd(currentNode),
      kind: 'member',
      callerName: binding.descriptor.callerName,
      library: binding.descriptor.library,
      moduleSource: binding.moduleSource,
      // No explicit property segment: the usage only names the variable.
      isBareReference: fieldPath.length === binding.basePath.length,
    });
    return true;
  });
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Analyse a source file and return every resolvable translation usage:
 * base-intlayer content access and all compat-library forms (translation
 * functions, self calls, JSX message components, tagged templates).
 *
 * Pure and self-contained (oxc parse only) — shared by the LSP handlers and
 * the VS Code extension providers/decorations.
 *
 * @param text - Full source text (a script: TS/TSX or an extracted SFC block).
 * @returns Usages ordered by start offset.
 */
export const collectMessageUsages = (text: string): MessageUsage[] => {
  const program = parseText(text);

  if (!program) return [];

  const fileImportSources = collectImportSources(program);
  const parentMap = buildParentMap(program);
  const state: AnalyzerState = {
    usages: [],
    translatorBindings: new Map(),
    contentBindings: new Map(),
    activeDescriptors: ALL_CALLERS.filter((descriptor) =>
      isCallerActive(descriptor, fileImportSources)
    ),
    importedLocalNames: collectImportedLocalNames(program),
    parentMap,
    program,
  };

  collectBindings(state, program);
  collectCallUsages(state, program);
  collectJsxUsages(state, program);
  collectMemberUsages(state, program, parentMap);

  return state.usages.sort((first, second) => first.start - second.start);
};

/**
 * Resolve the dictionary key declared by a single call-expression node when
 * it matches any registered non-self caller (`useIntlayer("key")`,
 * `useI18n({ namespace })`, …). Used for on-the-fly checks where the full
 * file analysis is not needed (e.g. completion context).
 *
 * @param callNode - A candidate CallExpression node.
 */
export const matchCallNamespace = (callNode: OxcNode): string | null => {
  if (callNode['type'] !== 'CallExpression') return null;

  const callee = getCalleeName(callNode['callee'] as OxcNode | undefined);

  if (!callee) return null;

  for (const descriptor of ALL_CALLERS) {
    if (descriptor.translationFunction === 'self') continue;

    if (descriptor.callerName !== callee.name) continue;

    if (callee.isMethod && !descriptor.matchAsMethod) continue;

    const namespaceValue = readValueSources(
      callNode,
      descriptor.namespaceSources
    );

    if (namespaceValue !== null) {
      return splitNestedNamespace(descriptor, namespaceValue).dictionaryKey;
    }
  }

  return null;
};

/**
 * A call site declaring which dictionary a caller reads
 * (`useIntlayer("home")`, `useI18n({ namespace: 'home' })`), with the spans
 * needed to anchor diagnostics and cursor checks.
 */
export type NamespaceReference = {
  dictionaryKey: string;
  callerName: string;
  library: string;
  /** Span of the whole call expression. */
  callStart: number;
  callEnd: number;
  /** Span of the matched callee name (identifier or method property). */
  calleeStart: number;
  calleeEnd: number;
  /** Span of the namespace argument (string literal or option value). */
  namespaceStart: number;
  namespaceEnd: number;
};

/**
 * The AST node holding the namespace string for a given value source, when
 * that source is addressable in the call (positional argument or options
 * property).
 */
const getNamespaceArgumentNode = (
  callNode: OxcNode,
  source: CallerValueSource
): OxcNode | null => {
  const argumentsList = callNode['arguments'] as OxcNode[] | undefined;

  if (source.from === 'argument') {
    return argumentsList?.[source.index] ?? null;
  }

  if (source.from === 'option') {
    const property = getObjectPropertyNode(
      argumentsList?.[source.argumentIndex],
      source.property
    );

    return (property?.['value'] as OxcNode | undefined) ?? null;
  }

  return null;
};

/**
 * Collect every call site with an addressable namespace argument (positional
 * or options property) resolving to a static string. Powers the
 * unknown-dictionary diagnostics and `findKeyAtOffset`.
 *
 * Self callers (`formatMessage`, lingui `t`/`_`) don't declare a namespace at
 * the call site and are excluded.
 *
 * @param text - Full source text.
 */
export const collectNamespaceReferences = (
  text: string
): NamespaceReference[] => {
  const program = parseText(text);

  if (!program) return [];

  const fileImportSources = collectImportSources(program);
  const activeDescriptors = ALL_CALLERS.filter(
    (descriptor) =>
      descriptor.translationFunction !== 'self' &&
      isCallerActive(descriptor, fileImportSources)
  );
  const references: NamespaceReference[] = [];

  walkAst(program, (node) => {
    if (node['type'] !== 'CallExpression') return;

    const calleeNode = node['callee'] as OxcNode | undefined;
    const callee = getCalleeName(calleeNode);

    if (!callee) return;

    for (const descriptor of activeDescriptors) {
      if (descriptor.callerName !== callee.name) continue;

      if (callee.isMethod && !descriptor.matchAsMethod) continue;

      const calleeNameNode =
        callee.isMethod && calleeNode
          ? (calleeNode['property'] as OxcNode)
          : calleeNode!;

      for (const source of descriptor.namespaceSources) {
        const namespaceNode = getNamespaceArgumentNode(node, source);
        const namespaceValue = getStaticStringValue(namespaceNode ?? undefined);

        if (!namespaceNode || namespaceValue === null) continue;

        references.push({
          dictionaryKey: splitNestedNamespace(descriptor, namespaceValue)
            .dictionaryKey,
          callerName: descriptor.callerName,
          library: descriptor.library,
          callStart: nodeStart(node),
          callEnd: nodeEnd(node),
          calleeStart: nodeStart(calleeNameNode),
          calleeEnd: nodeEnd(calleeNameNode),
          namespaceStart: nodeStart(namespaceNode),
          namespaceEnd: nodeEnd(namespaceNode),
        });
        return;
      }
    }
  });

  return references;
};

/**
 * A source variable bound to a dictionary by a caller declaration:
 * dictionary content (or a field subtree of it) for `content` callers, or a
 * translation function for `return-value` / `destructured-t` callers.
 */
export type CallerVariableBinding = {
  /** Local variable name. */
  variableName: string;
  /** The dictionary the variable reads from. */
  dictionaryKey: string;
  /**
   * Field path from the dictionary root the variable points at (content
   * bindings), or the key prefix applied to every call (translator bindings).
   */
  basePath: string[];
  /** Whether the variable holds content or a translation function. */
  bindingKind: 'content' | 'translator';
  /** The caller that created the binding. */
  callerName: string;
  library: string;
};

/**
 * Collect every variable bound to a dictionary in the file. Used by consumers
 * that scan non-script regions (Vue/Angular templates) for references to
 * those variables, or that need to know which dictionaries a file consumes.
 *
 * @param text - Full source text (a script: TS/TSX or an extracted SFC block).
 */
export const collectCallerBindings = (
  text: string
): CallerVariableBinding[] => {
  const program = parseText(text);

  if (!program) return [];

  const fileImportSources = collectImportSources(program);
  const state: AnalyzerState = {
    usages: [],
    translatorBindings: new Map(),
    contentBindings: new Map(),
    activeDescriptors: ALL_CALLERS.filter((descriptor) =>
      isCallerActive(descriptor, fileImportSources)
    ),
    importedLocalNames: collectImportedLocalNames(program),
    parentMap: buildParentMap(program),
    program,
  };

  collectBindings(state, program);

  return [
    ...[...state.contentBindings.entries()].flatMap(
      ([variableName, bindings]) =>
        bindings.map(
          (binding): CallerVariableBinding => ({
            variableName,
            dictionaryKey: binding.dictionaryKey,
            basePath: binding.basePath,
            bindingKind: 'content',
            callerName: binding.descriptor.callerName,
            library: binding.descriptor.library,
          })
        )
    ),
    ...[...state.translatorBindings.entries()].flatMap(
      ([variableName, bindings]) =>
        bindings
          // Root-scope translators have no bound dictionary to expose.
          .filter((binding) => binding.dictionaryKey !== null)
          .map(
            (binding): CallerVariableBinding => ({
              variableName,
              dictionaryKey: binding.dictionaryKey!,
              basePath: binding.keyPrefix,
              bindingKind: 'translator',
              callerName: binding.descriptor.callerName,
              library: binding.descriptor.library,
            })
          )
    ),
  ];
};

/**
 * Find the most specific translation usage at `offset`.
 *
 * For member chains the field path is trimmed to the segment under the
 * cursor: hovering `section` in `content.section.title` yields
 * `['section']`, not the full chain.
 *
 * Dictionary-level `namespace` usages are only returned when no field-level
 * usage matches the offset.
 *
 * @param text - Full source text.
 * @param offset - Cursor offset in `text`.
 */
export const findMessageUsageAtOffset = (
  text: string,
  offset: number
): MessageUsage | null => {
  const usages = collectMessageUsages(text);

  let bestMatch: MessageUsage | null = null;

  for (const usage of usages) {
    if (offset < usage.start || offset > usage.end) continue;

    const isBetter =
      !bestMatch ||
      // Prefer field-level usages over dictionary-level ones…
      (bestMatch.kind === 'namespace' && usage.kind !== 'namespace') ||
      // …then the smallest span containing the offset.
      (usage.end - usage.start < bestMatch.end - bestMatch.start &&
        !(bestMatch.kind !== 'namespace' && usage.kind === 'namespace'));

    if (isBetter) bestMatch = usage;
  }

  if (!bestMatch) return null;

  // Trim member chains to the segment under the cursor.
  if (bestMatch.kind === 'member' && bestMatch.fieldSpans) {
    let lastIncludedIndex = -1;

    for (let index = 0; index < bestMatch.fieldSpans.length; index++) {
      if (offset >= bestMatch.fieldSpans[index]!.start) {
        lastIncludedIndex = index;
      }
    }

    return {
      ...bestMatch,
      fieldPath: bestMatch.fieldPath.slice(0, lastIncludedIndex + 1),
      fieldSpans: bestMatch.fieldSpans.slice(0, lastIncludedIndex + 1),
    };
  }

  return bestMatch;
};
