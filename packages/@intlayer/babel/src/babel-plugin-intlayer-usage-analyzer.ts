import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';

// ── PruneContext types ────────────────────────────────────────────────────────

/**
 * Dictionary field usage result for a single dictionary key.
 *
 *   'all'        → could not determine statically which fields are used;
 *                  keep every field (no pruning possible).
 *   Set<string>  → the exact top-level content field names that were accessed.
 */
export type DictionaryFieldUsage = Set<string> | 'all';

/**
 * One node in the nested field-rename tree.
 *
 *   shortName – the compact alias assigned to this field name.
 *   children  – rename table for the next level of user-defined keys inside
 *               this field's value (empty when the value is a leaf / primitive).
 */
export type NestedRenameEntry = {
  shortName: string;
  children: NestedRenameMap;
};

/** A level of the field-rename tree, mapping original field names to entries. */
export type NestedRenameMap = Map<string, NestedRenameEntry>;

/**
 * Shared mutable state created once by the vite plugin and passed by reference
 * to the usage-analyzer (writer) and the prune/minify plugins (readers).
 *
 * All mutations happen during the usage-analysis `buildStart` phase; readers
 * only access this state during the subsequent `transform` phase.
 */
export type PruneContext = {
  /**
   * Maps every dictionary key seen in source files to the set of top-level
   * content fields statically accessed, or `'all'` when the access pattern
   * could not be determined.
   */
  dictionaryKeyToFieldUsageMap: Map<string, DictionaryFieldUsage>;

  /**
   * Dictionary keys for which the prune/minify step must be skipped entirely
   * because an edge case was detected during analysis or structure recognition.
   */
  dictionariesWithEdgeCases: Set<string>;

  /**
   * True if at least one source file failed to parse during the analysis phase.
   * The prune plugin uses this flag conservatively: any dictionary key without
   * a usage entry might have been referenced by the unparsable file.
   */
  hasUnparsableSourceFiles: boolean;

  /**
   * Maps dictionary keys to the source file paths where the result of
   * `useIntlayer` / `getIntlayer` was assigned to a plain variable, making
   * static field analysis impossible.
   */
  dictionaryKeysWithUntrackedBindings: Map<string, string[]>;

  /**
   * Maps each dictionary key to a nested field-rename tree built after the
   * usage analysis phase (only populated when `build.minify` is active and
   * the field usage for that dictionary is a finite `Set<string>`).
   */
  dictionaryKeyToFieldRenameMap: Map<string, NestedRenameMap>;

  /**
   * Maps each dictionary key to a per-field list of source locations where
   * the field value is consumed "opaquely" (passed as-is to a child component
   * or function argument). When a field is opaque AND has nested user-defined
   * structure, its children must not be renamed.
   *
   * Structure: dictionaryKey → fieldName → ["filePath:line", …]
   */
  dictionaryKeysWithOpaqueTopLevelFields: Map<string, Map<string, string[]>>;

  /**
   * Dictionary keys for which field-key renaming must be skipped even if a
   * finite field-usage set was determined.
   *
   * Populated for dictionaries whose plain-variable bindings were resolved by
   * the framework-specific extractor (Vue / Svelte SFCs), because the Babel
   * rename plugin cannot update the source-code property accesses for those
   * indirect patterns (Vue `.value.field` / Svelte `$store.field`).
   *
   * Pruning and basic minification still apply; only field-key renaming is
   * suppressed.
   */
  dictionariesSkippingFieldRename: Set<string>;

  /**
   * Plain variable bindings that require a framework-specific secondary pass.
   *
   * Populated during the Babel analysis phase for `.vue` and `.svelte` source
   * files where direct field access is not visible to Babel scope analysis:
   *   - Vue:    `content.value.fieldName` – the `.value` ref-accessor is hidden
   *   - Svelte: `$varName.fieldName`     – the `$` prefix creates a new identifier
   *
   * Structure: filePath → [{variableName, dictionaryKey}, …]
   */
  pendingFrameworkAnalysis: Map<
    string,
    { variableName: string; dictionaryKey: string }[]
  >;
};

export const createPruneContext = (): PruneContext => ({
  dictionaryKeyToFieldUsageMap: new Map(),
  dictionariesWithEdgeCases: new Set(),
  hasUnparsableSourceFiles: false,
  dictionaryKeysWithUntrackedBindings: new Map(),
  dictionaryKeyToFieldRenameMap: new Map(),
  dictionaryKeysWithOpaqueTopLevelFields: new Map<
    string,
    Map<string, string[]>
  >(),
  dictionariesSkippingFieldRename: new Set(),
  pendingFrameworkAnalysis: new Map(),
});

// ── Usage-analyzer Babel plugin ───────────────────────────────────────────────

/** Canonical intlayer caller names that trigger usage analysis. */
export const INTLAYER_CALLER_NAMES = ['useIntlayer', 'getIntlayer'] as const;
export type IntlayerCallerName = (typeof INTLAYER_CALLER_NAMES)[number];

// ── Compat-adapter namespace callers ──────────────────────────────────────────

/**
 * Describes how a compat-adapter "namespace caller" exposes the dictionary key
 * (namespace) and the translation function `t`.
 *
 * Compat adapters (`@intlayer/react-i18next`, `@intlayer/next-intl`, …) expose
 * the original i18n library API while delegating to intlayer under the hood.
 * Their call sites look like:
 *
 *   const { t } = useTranslation('about');   t('counter.label')
 *   const t     = useTranslations('about');  t('counter.label')
 *   const t     = await getTranslations('about');
 *   const t     = i18n.getFixedT(null, 'about', 'counter');
 *   const { t } = useI18n({ namespace: 'about' });
 *
 * The dictionary key is the *namespace* argument and the consumed top-level
 * field is the **first segment** of every dot-path passed to `t()` (or the
 * first segment of `keyPrefix` when one is supplied).
 */
export type CompatNamespaceSource =
  /** Namespace is a positional argument (string literal or `{ namespace }`). */
  | { from: 'argument'; index: number }
  /** Namespace is a property of an options object argument. */
  | { from: 'option'; argumentIndex: number; property: string }
  /**
   * Namespace is a compile-time constant — the same dictionary key is used for
   * every call site. Used by single-catalog libraries such as lingui, where all
   * translations live in a `messages` dictionary regardless of call location.
   */
  | { from: 'fixed'; value: string }
  /**
   * Namespace is the first dot-segment of the `id` in the first call argument.
   *
   * Used for libraries like react-intl where the full dotted id encodes both the
   * dictionary key and the field path in a single string:
   *   `formatMessage({ id: 'home.title' })` → dictionaryKey = `'home'`, field = `'title'`
   *
   * Works with both string form (`func('home.title')`) and descriptor form
   * (`func({ id: 'home.title', ... })`). The paired `translationFunction` should
   * be `'self'` so the field (second segment) is also extracted from the same call.
   */
  | { from: 'path-first-segment' };

/**
 * Configuration entry for a single compat namespace caller.
 */
export type CompatCallerConfig = {
  /** The imported (or method) function name, e.g. `'useTranslation'`. */
  callerName: string;
  /**
   * Module specifiers from which `callerName` must be imported to be treated as
   * a compat caller. Includes both the original library names and their
   * `@intlayer/*` adapter equivalents, because the bundler aliases the former
   * to the latter but user source code may import either.
   *
   * Ignored when `matchAsMethod` is `true`.
   */
  importSources: string[];
  /**
   * When `true`, the caller is matched by method name on any object
   * (`x.getFixedT(...)`) without an import check. Used for `i18next` instance
   * methods that are never imported as named specifiers.
   */
  matchAsMethod?: boolean;
  /** How the dictionary key (namespace) is read from the call arguments. */
  namespace: CompatNamespaceSource;
  /**
   * Optional location of a `keyPrefix` that prefixes every `t()` path. When a
   * static prefix is present, the only consumed top-level field is the first
   * segment of the prefix.
   */
  keyPrefix?: CompatNamespaceSource;
  /**
   * How the translation function is obtained from the call result.
   *
   * - `'return-value'`   — `const t = useTranslations('ns'); t('key')`
   * - `'destructured-t'` — `const { t } = useTranslation('ns'); t('key')`
   * - `'self'`           — the caller IS the translation call;
   *                        the first argument is the message key.
   *                        Used for lingui's `i18n._('key')` / `i18n.t('key')`.
   * - `'all'`            — mark the entire dictionary as used without tracking
   *                        individual fields. Use when static key analysis is
   *                        impossible (e.g. lingui hashed IDs, Angular templates).
   */
  translationFunction: 'return-value' | 'destructured-t' | 'self' | 'all';
  /**
   * When `true`, the message key is a *flat* dictionary field that itself
   * contains dots (e.g. lingui's `i18n._('results-table.bundleSize')`, where the
   * catalog stores the entry under the literal `'results-table.bundleSize'` key
   * rather than nesting it as `{ 'results-table': { bundleSize } }`).
   *
   * The whole key is then recorded as the consumed top-level field. When unset
   * (the default), only the first dot-segment is recorded, matching libraries
   * whose dotted keys map onto nested dictionary objects (next-intl, vue-i18n).
   *
   * Only meaningful with `translationFunction: 'self'` and a
   * `'fixed'` / `'argument'` / `'option'` namespace.
   */
  flatKey?: boolean;
  /**
   * When set, the caller is *also* matched as a JSX element whose local name is
   * `callerName` (gated by `importSources`). The named attribute is read as the
   * message id and analysed with the same `namespace` + `translationFunction`
   * (`'self'` / `'all'`) semantics as the call-expression form.
   *
   * Required for libraries with a JSX message component, e.g. react-intl's
   * `<FormattedMessage id="home.title" />`. Without it, JSX usages are invisible
   * to the analyser and field-level pruning of the same dictionary becomes
   * unsafe (it could prune a field only referenced from JSX).
   */
  jsxIdAttribute?: string;
};

/**
 * Default registry of compat namespace callers.
 *
 * Intentionally empty — compat-specific caller configurations belong in their
 * respective adapter packages (e.g. `@intlayer/react-i18next/plugin`,
 * `@intlayer/vue-i18n/plugin`) and are injected into `makeUsageAnalyzerBabelPlugin`
 * via the `compatCallers` option.  Centralising them here would couple the
 * core `@intlayer/babel` package to every compat adapter, which violates the
 * design principle that compat logic lives in compat packages.
 */
export const DEFAULT_COMPAT_CALLERS: CompatCallerConfig[] = [];

/** Default namespace used by compat callers when no namespace argument is given. */
const DEFAULT_COMPAT_NAMESPACE = 'translation';

/**
 * Records the usage of a specific dictionary key's fields into `pruneContext`.
 * Merges with any previously recorded usage for the same key.
 */
const recordFieldUsage = (
  pruneContext: PruneContext,
  dictionaryKey: string,
  fieldUsage: DictionaryFieldUsage
): void => {
  const existingUsage =
    pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);

  if (existingUsage === 'all') return; // already saturated

  if (fieldUsage === 'all') {
    pruneContext.dictionaryKeyToFieldUsageMap.set(dictionaryKey, 'all');
    return;
  }

  const mergedFieldSet =
    existingUsage instanceof Set
      ? new Set([...existingUsage, ...fieldUsage])
      : new Set(fieldUsage);

  pruneContext.dictionaryKeyToFieldUsageMap.set(dictionaryKey, mergedFieldSet);
};

/**
 * Analyses how the result of a single `useIntlayer('key')` / `getIntlayer('key')`
 * call expression is consumed, then records the field usage into `pruneContext`.
 *
 * Recognised patterns:
 *   const { fieldA, fieldB } = useIntlayer('key')  → records {fieldA, fieldB}
 *   useIntlayer('key').fieldA                       → records {fieldA}
 *   useIntlayer('key')['fieldA']                    → records {fieldA}
 *   const { ...rest } = useIntlayer('key')          → records 'all' (spread)
 *   const result = useIntlayer('key')               → records 'all' (untracked binding)
 */
const analyzeCallExpressionUsage = (
  babelTypes: typeof BabelTypes,
  pruneContext: PruneContext,
  callExpressionPath: NodePath<BabelTypes.CallExpression>,
  dictionaryKey: string,
  currentSourceFilePath: string,
  isSfcFile: boolean
): void => {
  const parentNode = callExpressionPath.parent;

  /** Mark the dictionary key as having an untracked binding in this file. */
  const markUntrackedBinding = (): void => {
    const existingPaths =
      pruneContext.dictionaryKeysWithUntrackedBindings.get(dictionaryKey) ?? [];
    if (!existingPaths.includes(currentSourceFilePath)) {
      pruneContext.dictionaryKeysWithUntrackedBindings.set(dictionaryKey, [
        ...existingPaths,
        currentSourceFilePath,
      ]);
    }
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
  };

  /** Record that a field value is consumed opaquely (not further destructured). */
  const markOpaqueField = (
    fieldName: string,
    line: number | undefined
  ): void => {
    const fieldToLocations =
      pruneContext.dictionaryKeysWithOpaqueTopLevelFields.get(dictionaryKey) ??
      new Map<string, string[]>();
    const location =
      line !== undefined
        ? `${currentSourceFilePath}:${line}`
        : currentSourceFilePath;
    const locations = fieldToLocations.get(fieldName) ?? [];
    if (!locations.includes(location)) locations.push(location);
    fieldToLocations.set(fieldName, locations);
    pruneContext.dictionaryKeysWithOpaqueTopLevelFields.set(
      dictionaryKey,
      fieldToLocations
    );
  };

  /** Register a plain variable binding in an SFC file for a second-pass analysis. */
  const deferFrameworkAnalysis = (variableName: string): void => {
    const existing =
      pruneContext.pendingFrameworkAnalysis.get(currentSourceFilePath) ?? [];
    if (
      !existing.some(
        (e) =>
          e.variableName === variableName && e.dictionaryKey === dictionaryKey
      )
    ) {
      existing.push({ variableName, dictionaryKey });
    }
    pruneContext.pendingFrameworkAnalysis.set(currentSourceFilePath, existing);
  };

  /**
   * Analyses usage of a variable or member access to detect opaque
   * consumption (passing a dictionary field as-is to a prop or function).
   *
   * If a direct, non-chained consumption is found, it calls `markOpaqueField`.
   * Chained accesses (e.g. `field.sub`) are NOT considered opaque for `field`
   * because the renamer can safely track and update them.
   */
  const analyzeOpaqueUsage = (
    refPath: NodePath<BabelTypes.Node>,
    fieldName: string
  ): void => {
    const parentNode = refPath.parent;

    // 1. Chained member access (e.g. field.sub or field?.sub)
    if (
      (babelTypes.isMemberExpression(parentNode) ||
        babelTypes.isOptionalMemberExpression(parentNode)) &&
      (parentNode as BabelTypes.MemberExpression).object === refPath.node
    ) {
      // Chained access is safe: the renamer correctly updates it.
      return;
    }

    // 2. Destructuring (e.g. const { sub } = field)
    if (
      babelTypes.isVariableDeclarator(parentNode) &&
      babelTypes.isObjectPattern(parentNode.id) &&
      parentNode.init === refPath.node
    ) {
      // Destructuring is analogous to member access: safe.
      return;
    }

    // 3. Ignored patterns (e.g. array literals [content])
    if (babelTypes.isArrayExpression(parentNode)) {
      return;
    }

    // 4. Opaque consumption (passed to prop, function, etc.)
    markOpaqueField(fieldName, refPath.node.loc?.start.line);
  };

  /**
   * Helper to collect field names from an ObjectPattern (destructuring).
   * Returns true if successful, false if a rest element was found (meaning 'all').
   */
  const collectFieldsFromObjectPattern = (
    pattern: BabelTypes.ObjectPattern,
    initPath: NodePath<BabelTypes.Node>,
    targetSet: Set<string>
  ): boolean => {
    if (pattern.properties.some((prop) => babelTypes.isRestElement(prop))) {
      return false;
    }

    for (const property of pattern.properties) {
      let fieldName: string | undefined;

      if (
        babelTypes.isObjectProperty(property) &&
        babelTypes.isIdentifier(property.key)
      ) {
        fieldName = property.key.name;
      } else if (
        babelTypes.isObjectProperty(property) &&
        babelTypes.isStringLiteral(property.key)
      ) {
        fieldName = property.key.value;
      }

      if (fieldName) {
        targetSet.add(fieldName);

        if (
          babelTypes.isObjectProperty(property) &&
          babelTypes.isIdentifier(property.value)
        ) {
          const variableBinding = initPath.scope.getBinding(
            property.value.name
          );
          if (variableBinding) {
            for (const refPath of variableBinding.referencePaths) {
              analyzeOpaqueUsage(refPath, fieldName);
            }
          }
        }
      }
    }
    return true;
  };

  // ── Pattern 1: const { fieldA, fieldB } = useIntlayer('key') ──────────────
  if (
    babelTypes.isVariableDeclarator(parentNode) &&
    babelTypes.isObjectPattern(parentNode.id)
  ) {
    const accessedFieldNames = new Set<string>();
    if (
      collectFieldsFromObjectPattern(
        parentNode.id,
        callExpressionPath,
        accessedFieldNames
      )
    ) {
      recordFieldUsage(pruneContext, dictionaryKey, accessedFieldNames);
    } else {
      recordFieldUsage(pruneContext, dictionaryKey, 'all');
    }
    return;
  }

  // ── Pattern 2: useIntlayer('key').fieldA / useIntlayer('key')?.fieldA ──────
  if (
    (babelTypes.isMemberExpression(parentNode) ||
      babelTypes.isOptionalMemberExpression(parentNode)) &&
    (parentNode as BabelTypes.MemberExpression).object ===
      callExpressionPath.node
  ) {
    let fieldName: string | undefined;

    if (!parentNode.computed && babelTypes.isIdentifier(parentNode.property)) {
      fieldName = parentNode.property.name;
    } else if (
      parentNode.computed &&
      babelTypes.isStringLiteral(parentNode.property)
    ) {
      fieldName = parentNode.property.value;
    }

    if (fieldName) {
      recordFieldUsage(pruneContext, dictionaryKey, new Set([fieldName]));

      // Check for opaque usage (e.g. passed directly to a prop)
      const memberExprPath = callExpressionPath.parentPath;
      if (memberExprPath) {
        analyzeOpaqueUsage(memberExprPath, fieldName);
      }
    } else {
      markUntrackedBinding();
    }
    return;
  }

  // ── Pattern 3: const content = useIntlayer('key') ─────────────────────────
  if (
    babelTypes.isVariableDeclarator(parentNode) &&
    babelTypes.isIdentifier(parentNode.id)
  ) {
    const variableName = parentNode.id.name;
    const variableBinding = callExpressionPath.scope.getBinding(variableName);

    if (!variableBinding) {
      markUntrackedBinding();
      return;
    }

    const accessedTopLevelFieldNames = new Set<string>();
    let hasUntrackedReferenceAccess = false;

    for (const variableReferencePath of variableBinding.referencePaths) {
      const referenceParentNode = variableReferencePath.parent;

      if (
        (babelTypes.isMemberExpression(referenceParentNode) ||
          babelTypes.isOptionalMemberExpression(referenceParentNode)) &&
        (referenceParentNode as BabelTypes.MemberExpression).object ===
          variableReferencePath.node
      ) {
        const memberExpressionNode =
          referenceParentNode as BabelTypes.MemberExpression;
        let fieldName: string | undefined;

        if (
          !memberExpressionNode.computed &&
          babelTypes.isIdentifier(memberExpressionNode.property)
        ) {
          fieldName = memberExpressionNode.property.name;
        } else if (
          memberExpressionNode.computed &&
          babelTypes.isStringLiteral(memberExpressionNode.property)
        ) {
          fieldName = memberExpressionNode.property.value;
        }

        if (fieldName) {
          accessedTopLevelFieldNames.add(fieldName);

          // Check usage of the field to look for opaque consumption
          const memberExprPath = variableReferencePath.parentPath;
          if (memberExprPath) {
            analyzeOpaqueUsage(memberExprPath, fieldName);
          }
        } else {
          // Dynamic computed access – cannot resolve statically
          hasUntrackedReferenceAccess = true;
          break;
        }
      } else if (babelTypes.isArrayExpression(referenceParentNode)) {
        // The binding's value escapes into an array literal
        // (e.g. `[appleWatch, airpods].map((entry) => entry.name)`). Its fields
        // are then accessed through iteration that Babel cannot follow back to
        // this dictionary, so we cannot know which fields are used. This is the
        // canonical meta-record / collection access pattern — conservatively
        // keep every field rather than pruning the content to nothing.
        hasUntrackedReferenceAccess = true;
        break;
      } else if (
        // Solid / Angular: content() signal accessor → content().field
        (babelTypes.isCallExpression(referenceParentNode) ||
          babelTypes.isOptionalCallExpression(referenceParentNode)) &&
        (referenceParentNode as BabelTypes.CallExpression).callee ===
          variableReferencePath.node
      ) {
        const callExprPath = variableReferencePath.parentPath;
        const callParent = callExprPath?.parent;

        if (
          callParent &&
          (babelTypes.isMemberExpression(callParent) ||
            babelTypes.isOptionalMemberExpression(callParent)) &&
          (callParent as BabelTypes.MemberExpression).object ===
            callExprPath?.node
        ) {
          // content().field
          const memberExpr = callParent as BabelTypes.MemberExpression;
          let fieldName: string | undefined;

          if (
            !memberExpr.computed &&
            babelTypes.isIdentifier(memberExpr.property)
          ) {
            fieldName = memberExpr.property.name;
          } else if (
            memberExpr.computed &&
            babelTypes.isStringLiteral(memberExpr.property)
          ) {
            fieldName = memberExpr.property.value;
          }

          if (fieldName) {
            accessedTopLevelFieldNames.add(fieldName);
            const memberExprPath = callExprPath?.parentPath;
            if (memberExprPath) analyzeOpaqueUsage(memberExprPath, fieldName);
          } else {
            // content()[dynamicKey] – cannot resolve statically
            hasUntrackedReferenceAccess = true;
            break;
          }
        } else if (
          callParent &&
          babelTypes.isVariableDeclarator(callParent) &&
          babelTypes.isObjectPattern(callParent.id) &&
          callExprPath &&
          collectFieldsFromObjectPattern(
            callParent.id,
            callExprPath,
            accessedTopLevelFieldNames
          )
        ) {
          // const { title } = content()
          // fields already added to accessedTopLevelFieldNames by collectFieldsFromObjectPattern
        } else {
          // content() with no field access or passed opaquely → cannot prune
          hasUntrackedReferenceAccess = true;
          break;
        }
      } else {
        // Variable used in a non-member-access context (spread, function arg, etc.)
        hasUntrackedReferenceAccess = true;
        break;
      }
    }

    if (hasUntrackedReferenceAccess) {
      markUntrackedBinding();
    } else if (isSfcFile) {
      // Vue / Svelte SFC: defer to the framework-specific extractor because
      // Babel scope analysis cannot see through `.value` or `$` indirection.
      deferFrameworkAnalysis(variableName);
    } else if (variableBinding.referencePaths.length === 0) {
      // Non-SFC file with no visible references – conservatively keep all fields.
      markUntrackedBinding();
    } else {
      recordFieldUsage(pruneContext, dictionaryKey, accessedTopLevelFieldNames);
    }
    return;
  }

  // ── Pattern 4: bare call – result is discarded ─────────────────────────────
  if (babelTypes.isExpressionStatement(parentNode)) {
    return; // no usage to record
  }

  // ── Fallback: result passed as argument, used in ternary, etc. ─────────────
  markUntrackedBinding();
};

// ── Compat namespace-caller analysis ──────────────────────────────────────────

/**
 * Reads a fully-static string from an AST node. Returns `undefined` for
 * dynamic values (identifiers, expressions, template literals with
 * interpolations, …).
 */
const readStaticString = (
  babelTypes: typeof BabelTypes,
  node: BabelTypes.Node | null | undefined
): string | undefined => {
  if (!node) return undefined;
  if (babelTypes.isStringLiteral(node)) return node.value;
  if (
    babelTypes.isTemplateLiteral(node) &&
    node.expressions.length === 0 &&
    node.quasis.length === 1
  ) {
    return node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw;
  }
  return undefined;
};

/** Returns the first dot-path segment of a key, e.g. `'a.b.c'` → `'a'`. */
const firstPathSegment = (path: string): string => path.split('.')[0] ?? path;

/**
 * Reads the static first dot-path segment from a `t()` first-argument node.
 *
 *   t('counter.label')      → 'counter'
 *   t(`counter.${x}`)       → 'counter'   (static prefix before the first dot)
 *   t(`${x}.label`)         → undefined   (dynamic first segment)
 *   t(someVariable)         → undefined
 */
const readStaticFirstSegment = (
  babelTypes: typeof BabelTypes,
  node: BabelTypes.Node | null | undefined
): string | undefined => {
  const staticString = readStaticString(babelTypes, node);
  if (staticString !== undefined) return firstPathSegment(staticString);

  // Template literal whose first quasi already contains the dot delimiter, e.g.
  // `counter.${index}` → the leading `counter` segment is statically known.
  if (babelTypes.isTemplateLiteral(node) && node.quasis.length > 0) {
    const firstQuasi =
      node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw;
    if (firstQuasi?.includes('.')) {
      return firstPathSegment(firstQuasi);
    }
  }
  return undefined;
};

/**
 * Reads a static string property from an object expression. Returns
 * `'__default__'` when the property is absent and `undefined` when present but
 * dynamic.
 */
const readObjectProperty = (
  babelTypes: typeof BabelTypes,
  objectExpression: BabelTypes.ObjectExpression,
  propertyName: string
): string | '__default__' | undefined => {
  for (const property of objectExpression.properties) {
    if (!babelTypes.isObjectProperty(property)) continue;
    const keyMatches =
      (babelTypes.isIdentifier(property.key) &&
        property.key.name === propertyName) ||
      (babelTypes.isStringLiteral(property.key) &&
        property.key.value === propertyName);
    if (!keyMatches) continue;
    const staticValue = readStaticString(babelTypes, property.value);
    return staticValue ?? undefined; // present but dynamic → undefined
  }
  return '__default__'; // property absent
};

/**
 * Reads a named JSX attribute as a static string and returns it wrapped in a
 * `StringLiteral` node so the result can be fed to the same namespace resolver
 * as a call argument. Handles both `id="home.title"` and `id={'home.title'}`.
 * Returns `undefined` when the attribute is absent or dynamic (`id={expr}`).
 */
const readJsxAttributeString = (
  babelTypes: typeof BabelTypes,
  openingElement: BabelTypes.JSXOpeningElement,
  attributeName: string
): BabelTypes.StringLiteral | undefined => {
  for (const attribute of openingElement.attributes) {
    if (!babelTypes.isJSXAttribute(attribute)) continue;
    if (
      !babelTypes.isJSXIdentifier(attribute.name) ||
      attribute.name.name !== attributeName
    ) {
      continue;
    }

    const value = attribute.value;
    // id="home.title"
    if (babelTypes.isStringLiteral(value)) return value;
    // id={'home.title'} / id={`home.title`}
    if (babelTypes.isJSXExpressionContainer(value)) {
      const staticString = readStaticString(babelTypes, value.expression);
      if (staticString !== undefined) {
        return babelTypes.stringLiteral(staticString);
      }
    }
    return undefined; // attribute present but dynamic
  }
  return undefined; // attribute absent
};

/**
 * Resolves the namespace (dictionary key) for a compat caller call-site from
 * its `CompatNamespaceSource` configuration. Returns the static key, or
 * `'__default__'` when the configured argument is absent (caller falls back to
 * its default namespace), or `undefined` when the value is present but dynamic.
 */
const resolveCompatNamespace = (
  babelTypes: typeof BabelTypes,
  callArguments: BabelTypes.CallExpression['arguments'],
  source: CompatNamespaceSource
): string | '__default__' | undefined => {
  if (source.from === 'fixed') return source.value;

  if (source.from === 'path-first-segment') {
    const firstArg = callArguments[0];
    // No sensible default: the dictionary key is *derived* from the id, so an
    // absent id means the call cannot be attributed to any dictionary → skip.
    if (firstArg === undefined) return undefined;

    // String form: formatMessage('home.title', values)
    const staticString = readStaticString(babelTypes, firstArg);
    if (staticString !== undefined) return firstPathSegment(staticString);

    // Descriptor form: formatMessage({ id: 'home.title', ... }, values)
    if (babelTypes.isObjectExpression(firstArg)) {
      const idValue = readObjectProperty(babelTypes, firstArg, 'id');
      if (idValue === '__default__') return '__default__'; // id absent
      if (idValue !== undefined) return firstPathSegment(idValue); // static id
      return undefined; // id present but dynamic
    }

    return undefined; // dynamic first argument
  }

  if (source.from === 'argument') {
    const argument = callArguments[source.index];
    if (argument === undefined) return '__default__';

    // Direct string namespace: useTranslations('about')
    const staticString = readStaticString(babelTypes, argument);
    if (staticString !== undefined) return staticString;

    // Object form: getTranslations({ locale, namespace: 'about' })
    if (babelTypes.isObjectExpression(argument)) {
      return readObjectProperty(babelTypes, argument, 'namespace');
    }
    return undefined; // present but dynamic
  }

  // from === 'option'
  const optionsArgument = callArguments[source.argumentIndex];
  if (optionsArgument === undefined) return '__default__';
  if (!babelTypes.isObjectExpression(optionsArgument)) return undefined;
  return readObjectProperty(babelTypes, optionsArgument, source.property);
};

/**
 * Resolves an optional `keyPrefix` for a compat caller. Returns the static
 * prefix string, `null` when no prefix is configured/present, or `undefined`
 * when a prefix is present but dynamic.
 */
const resolveCompatKeyPrefix = (
  babelTypes: typeof BabelTypes,
  callArguments: BabelTypes.CallExpression['arguments'],
  source: CompatNamespaceSource | undefined
): string | null | undefined => {
  if (!source) return null;
  const resolved = resolveCompatNamespace(babelTypes, callArguments, source);
  if (resolved === '__default__') return null; // prefix absent
  return resolved; // string or undefined (dynamic)
};

/**
 * Climbs past an enclosing `await` expression so that
 * `const t = await getTranslations('ns')` is resolved to its variable
 * declarator the same way the synchronous form is.
 */
const unwrapAwait = (
  babelTypes: typeof BabelTypes,
  path: NodePath<BabelTypes.Node>
): NodePath<BabelTypes.Node> => {
  const parentPath = path.parentPath;
  if (parentPath && babelTypes.isAwaitExpression(parentPath.node)) {
    return parentPath;
  }
  return path;
};

/**
 * Analyses how the translation function produced by a compat namespace caller
 * (`useTranslation`, `useTranslations`, `getTranslations`, `getFixedT`,
 * `useI18n`) is consumed, then records the accessed top-level dictionary fields
 * into `pruneContext`.
 *
 * Dictionaries consumed this way are always added to
 * `dictionariesSkippingFieldRename`: the field accesses are string-literal
 * dot-paths inside `t()` calls, which the field-rename plugin cannot rewrite,
 * so renaming the compiled JSON keys would break runtime lookups. Pruning
 * (top-level field removal) remains safe because it preserves field names.
 */
const analyzeNamespaceCallerUsage = (
  babelTypes: typeof BabelTypes,
  pruneContext: PruneContext,
  callArguments: BabelTypes.CallExpression['arguments'],
  callerConfig: CompatCallerConfig,
  isSfcFile: boolean,
  /**
   * The call-expression path, when the caller was matched as a call. Omitted
   * for JSX-element matches (`<FormattedMessage id>`), where only the static
   * `'self'` / `'all'` analysis paths apply — the binding-based
   * `'destructured-t'` / `'return-value'` paths require a call site.
   */
  callExpressionPath?: NodePath<BabelTypes.CallExpression>
): void => {
  // 1. Resolve the dictionary key (namespace).
  const resolvedNamespace = resolveCompatNamespace(
    babelTypes,
    callArguments,
    callerConfig.namespace
  );
  if (resolvedNamespace === undefined) return; // dynamic key – cannot attribute
  const namespaceString =
    resolvedNamespace === '__default__'
      ? DEFAULT_COMPAT_NAMESPACE
      : resolvedNamespace;

  // next-intl scopes nested objects through a dotted namespace
  // (`'about.counter'`): the dictionary key is the first segment and the
  // remainder is an implicit key prefix applied to every t() lookup.
  const namespaceSegments = namespaceString.split('.');
  const dictionaryKey = namespaceSegments[0] ?? namespaceString;
  const namespacePrefix =
    namespaceSegments.length > 1 ? namespaceSegments.slice(1).join('.') : null;

  // Compat string-path access is never renamable.
  pruneContext.dictionariesSkippingFieldRename.add(dictionaryKey);

  // 2. SFC files (Vue / Svelte / Astro): the translation function is typically
  //    invoked from the template, which Babel cannot see. Conservatively keep
  //    every field to avoid pruning a template-only access.
  if (isSfcFile) {
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // 3a. Mark the entire dictionary as used — static field analysis is not
  //     applicable (e.g. lingui hashed IDs, Angular templates).
  if (callerConfig.translationFunction === 'all') {
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // 3b. The caller IS the translation call (`translationFunction: 'self'`).
  //     The first argument of the current call expression is the message key.
  //     Used for lingui's `i18n._('key')` / `i18n.t('key')` and react-intl's
  //     `intl.formatMessage({ id: 'key' })` patterns.
  if (callerConfig.translationFunction === 'self') {
    const firstArg = callArguments[0];
    if (!firstArg) {
      recordFieldUsage(pruneContext, dictionaryKey, 'all');
      return;
    }

    if (callerConfig.namespace.from === 'path-first-segment') {
      // The dictionary key is already the first segment of the descriptor id.
      // The field to record is the SECOND segment (first level inside the dict).
      // e.g. formatMessage({ id: 'home.title' }) → dictionaryKey='home', field='title'
      let fullId: string | undefined;

      const staticString = readStaticString(babelTypes, firstArg);
      if (staticString !== undefined) {
        fullId = staticString;
      } else if (babelTypes.isObjectExpression(firstArg)) {
        const idValue = readObjectProperty(babelTypes, firstArg, 'id');
        if (idValue !== undefined && idValue !== '__default__') {
          fullId = idValue;
        }
      }

      if (fullId !== undefined) {
        const segments = fullId.split('.');
        const field = segments[1];
        if (field !== undefined) {
          recordFieldUsage(pruneContext, dictionaryKey, new Set([field]));
        } else {
          // Single-segment id — the whole value is the dict key; no sub-field.
          recordFieldUsage(pruneContext, dictionaryKey, 'all');
        }
        return;
      }

      // Dynamic id — cannot prune.
      recordFieldUsage(pruneContext, dictionaryKey, 'all');
      return;
    }

    // For 'fixed' / 'argument' / 'option' namespaces: the field is the first
    // dot-segment of the first argument (the message key itself) — unless
    // `flatKey` is set, in which case the whole dotted key is the field.
    // String form: i18n._('home.title', values)
    const segment = callerConfig.flatKey
      ? readStaticString(babelTypes, firstArg)
      : readStaticFirstSegment(babelTypes, firstArg);
    if (segment !== undefined) {
      recordFieldUsage(pruneContext, dictionaryKey, new Set([segment]));
      return;
    }

    // Descriptor form: i18n._({ id: 'home.title', message: '...' }, values)
    if (babelTypes.isObjectExpression(firstArg)) {
      const idValue = readObjectProperty(babelTypes, firstArg, 'id');
      if (idValue !== undefined && idValue !== '__default__') {
        recordFieldUsage(
          pruneContext,
          dictionaryKey,
          new Set([callerConfig.flatKey ? idValue : firstPathSegment(idValue)])
        );
        return;
      }
    }

    // Dynamic key — cannot prune.
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // The remaining strategies (`'destructured-t'` / `'return-value'`) resolve
  // the `t` binding from the call site, so they require a call-expression path.
  // JSX-element matches never reach here (they use `'self'` / `'all'`); guard
  // defensively so a misconfigured JSX caller keeps every field instead of
  // throwing.
  if (!callExpressionPath) {
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // 3. Resolve an optional explicit keyPrefix (e.g. react-i18next's
  //    `{ keyPrefix }` option). A static prefix fixes the single consumed
  //    top-level field regardless of the individual t() paths.
  const explicitKeyPrefix = resolveCompatKeyPrefix(
    babelTypes,
    callArguments,
    callerConfig.keyPrefix
  );
  if (explicitKeyPrefix === undefined) {
    // Prefix present but dynamic → unknown field set.
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // The namespace-derived prefix (next-intl) and the explicit keyPrefix option
  // (react-i18next / i18next) never coexist in practice; prefer whichever is
  // present. Either way, the consumed top-level field is the prefix's first
  // segment.
  const effectivePrefix = namespacePrefix ?? explicitKeyPrefix;
  if (effectivePrefix !== null) {
    recordFieldUsage(
      pruneContext,
      dictionaryKey,
      new Set([firstPathSegment(effectivePrefix)])
    );
    return;
  }

  // 4. Locate the `t` function binding.
  let translationBinding: ReturnType<NodePath['scope']['getBinding']> | null =
    null;

  if (callerConfig.translationFunction === 'destructured-t') {
    // const { t } = useTranslation('ns')
    const parentNode = callExpressionPath.parent;
    if (
      babelTypes.isVariableDeclarator(parentNode) &&
      babelTypes.isObjectPattern(parentNode.id)
    ) {
      for (const property of parentNode.id.properties) {
        if (
          babelTypes.isObjectProperty(property) &&
          babelTypes.isIdentifier(property.key) &&
          property.key.name === 't' &&
          babelTypes.isIdentifier(property.value)
        ) {
          translationBinding =
            callExpressionPath.scope.getBinding(property.value.name) ?? null;
        }
      }
    }
  } else {
    // const t = useTranslations('ns')  /  const t = await getTranslations('ns')
    const resultPath = unwrapAwait(babelTypes, callExpressionPath);
    const parentNode = resultPath.parent;
    if (
      babelTypes.isVariableDeclarator(parentNode) &&
      babelTypes.isIdentifier(parentNode.id)
    ) {
      translationBinding =
        callExpressionPath.scope.getBinding(parentNode.id.name) ?? null;
    }
  }

  // Could not statically locate `t` (e.g. result stored whole, re-exported) →
  // conservatively keep all fields.
  if (!translationBinding) {
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // 5. Inspect every reference to `t`.
  const accessedFields = new Set<string>();
  let hasUntrackedUsage = false;

  for (const referencePath of translationBinding.referencePaths) {
    const parentNode = referencePath.parent;

    // Must be a direct call: t('path')
    const isDirectCall =
      (babelTypes.isCallExpression(parentNode) ||
        babelTypes.isOptionalCallExpression(parentNode)) &&
      (parentNode as BabelTypes.CallExpression).callee === referencePath.node;

    if (!isDirectCall) {
      // t passed as a prop / argument / reassigned → fields unknown.
      hasUntrackedUsage = true;
      break;
    }

    const firstArgument = (parentNode as BabelTypes.CallExpression)
      .arguments[0];
    const segment = readStaticFirstSegment(babelTypes, firstArgument);
    if (segment === undefined) {
      hasUntrackedUsage = true;
      break;
    }
    accessedFields.add(segment);
  }

  if (hasUntrackedUsage) {
    recordFieldUsage(pruneContext, dictionaryKey, 'all');
    return;
  }

  // Only record a finite field set when at least one field was actually
  // accessed. Recording an empty set would prune every field even though the
  // dictionary may be consumed elsewhere.
  if (accessedFields.size > 0) {
    recordFieldUsage(pruneContext, dictionaryKey, accessedFields);
  }
};

/**
 * Creates a Babel plugin that traverses source files and records which
 * top-level dictionary fields each `useIntlayer` / `getIntlayer` call-site —
 * and each configured compat namespace caller — accesses. Results are
 * accumulated into `pruneContext`.
 *
 * This plugin is analysis-only: it does not transform the code (`code: false`
 * should be passed to `transformAsync` when using it).
 *
 * @param pruneContext - Shared mutable state written by this plugin.
 * @param options      - Optional overrides. `compatCallers` defaults to
 *                       {@link DEFAULT_COMPAT_CALLERS}; pass `[]` to disable
 *                       compat-adapter analysis entirely.
 */
export const makeUsageAnalyzerBabelPlugin =
  (
    pruneContext: PruneContext,
    options?: { compatCallers?: CompatCallerConfig[] }
  ) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObj => {
    const compatCallers = options?.compatCallers ?? DEFAULT_COMPAT_CALLERS;

    return {
      name: 'intlayer-usage-analyzer',
      visitor: {
        Program: {
          exit: (programPath, state: PluginPass) => {
            const currentSourceFilePath =
              state.file.opts.filename ?? 'unknown file';
            const isSfcFile =
              currentSourceFilePath.endsWith('.vue') ||
              currentSourceFilePath.endsWith('.svelte') ||
              currentSourceFilePath.endsWith('.astro');

            // Phase 1: collect local aliases for native intlayer callers and
            // for compat namespace callers (gated by import source).
            const intlayerCallerLocalNameMap = new Map<string, string>();
            const compatCallerLocalNameMap = new Map<
              string,
              CompatCallerConfig
            >();

            // Method-matched compat callers (e.g. i18next `getFixedT`) need no
            // import and are recognised by method name on any object.
            const methodCompatCallers = compatCallers.filter(
              (caller) => caller.matchAsMethod
            );

            programPath.traverse({
              ImportDeclaration: (importDeclarationPath) => {
                const importSource = importDeclarationPath.node.source.value;

                for (const importSpecifier of importDeclarationPath.node
                  .specifiers) {
                  if (!babelTypes.isImportSpecifier(importSpecifier)) continue;

                  const importedName = babelTypes.isIdentifier(
                    importSpecifier.imported
                  )
                    ? importSpecifier.imported.name
                    : (importSpecifier.imported as BabelTypes.StringLiteral)
                        .value;

                  if (
                    INTLAYER_CALLER_NAMES.includes(
                      importedName as IntlayerCallerName
                    )
                  ) {
                    intlayerCallerLocalNameMap.set(
                      importSpecifier.local.name,
                      importedName
                    );
                    continue;
                  }

                  const compatCaller = compatCallers.find(
                    (caller) =>
                      caller.callerName === importedName &&
                      caller.importSources.includes(importSource)
                  );
                  if (compatCaller) {
                    compatCallerLocalNameMap.set(
                      importSpecifier.local.name,
                      compatCaller
                    );
                  }
                }
              },
            });

            const hasNativeCallers = intlayerCallerLocalNameMap.size > 0;
            const hasCompatCallers =
              compatCallerLocalNameMap.size > 0 ||
              methodCompatCallers.length > 0;

            if (!hasNativeCallers && !hasCompatCallers) return;

            // Phase 2: analyse each call-site
            programPath.traverse({
              CallExpression: (callExpressionPath) => {
                const calleeNode = callExpressionPath.node.callee;
                let localCallerName: string | undefined;
                let isMethodCall = false;

                if (babelTypes.isIdentifier(calleeNode)) {
                  localCallerName = calleeNode.name;
                } else if (
                  babelTypes.isMemberExpression(calleeNode) &&
                  babelTypes.isIdentifier(calleeNode.property)
                ) {
                  localCallerName = calleeNode.property.name;
                  isMethodCall = true;
                }

                if (!localCallerName) return;

                // Native intlayer caller (useIntlayer / getIntlayer)
                if (intlayerCallerLocalNameMap.has(localCallerName)) {
                  const callArguments = callExpressionPath.node.arguments;
                  if (callArguments.length === 0) return;

                  const dictionaryKey = readStaticString(
                    babelTypes,
                    callArguments[0]
                  );
                  if (!dictionaryKey) return; // dynamic key

                  analyzeCallExpressionUsage(
                    babelTypes,
                    pruneContext,
                    callExpressionPath,
                    dictionaryKey,
                    currentSourceFilePath,
                    isSfcFile
                  );
                  return;
                }

                // Compat namespace caller (imported)
                const importedCompatCaller =
                  compatCallerLocalNameMap.get(localCallerName);
                if (importedCompatCaller && !isMethodCall) {
                  analyzeNamespaceCallerUsage(
                    babelTypes,
                    pruneContext,
                    callExpressionPath.node.arguments,
                    importedCompatCaller,
                    isSfcFile,
                    callExpressionPath
                  );
                  return;
                }

                // Compat namespace caller (method-matched, e.g. getFixedT)
                if (isMethodCall) {
                  const methodCaller = methodCompatCallers.find(
                    (caller) => caller.callerName === localCallerName
                  );
                  if (methodCaller) {
                    analyzeNamespaceCallerUsage(
                      babelTypes,
                      pruneContext,
                      callExpressionPath.node.arguments,
                      methodCaller,
                      isSfcFile,
                      callExpressionPath
                    );
                  }
                }
              },
              JSXOpeningElement: (jsxOpeningElementPath) => {
                const nameNode = jsxOpeningElementPath.node.name;
                if (!babelTypes.isJSXIdentifier(nameNode)) return;

                const jsxCaller = compatCallerLocalNameMap.get(nameNode.name);
                if (!jsxCaller?.jsxIdAttribute) return;

                // Read the configured id attribute as a static string. A missing
                // or dynamic id yields an empty argument list, which resolves the
                // namespace to undefined and is skipped (consistent with how a
                // dynamic `useIntlayer(key)` call is handled).
                const idNode = readJsxAttributeString(
                  babelTypes,
                  jsxOpeningElementPath.node,
                  jsxCaller.jsxIdAttribute
                );

                analyzeNamespaceCallerUsage(
                  babelTypes,
                  pruneContext,
                  idNode ? [idNode] : [],
                  jsxCaller,
                  isSfcFile
                );
              },
            });
          },
        },
      },
    };
  };
