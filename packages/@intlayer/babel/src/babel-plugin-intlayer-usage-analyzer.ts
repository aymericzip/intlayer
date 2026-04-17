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

  // ── Pattern 1: const { fieldA, fieldB } = useIntlayer('key') ──────────────
  if (
    babelTypes.isVariableDeclarator(parentNode) &&
    babelTypes.isObjectPattern(parentNode.id)
  ) {
    const hasRestElement = parentNode.id.properties.some((prop) =>
      babelTypes.isRestElement(prop)
    );

    if (hasRestElement) {
      recordFieldUsage(pruneContext, dictionaryKey, 'all');
      return;
    }

    const accessedFieldNames = new Set<string>();
    for (const property of parentNode.id.properties) {
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
        accessedFieldNames.add(fieldName);

        // Check usage of the bound variable to look for opaque consumption
        if (
          babelTypes.isObjectProperty(property) &&
          babelTypes.isIdentifier(property.value)
        ) {
          const variableBinding = callExpressionPath.scope.getBinding(
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

    recordFieldUsage(pruneContext, dictionaryKey, accessedFieldNames);
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
        // Ignore array literals (e.g. [content]) – uncommon but benign
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

/**
 * Creates a Babel plugin that traverses source files and records which
 * top-level dictionary fields each `useIntlayer` / `getIntlayer` call-site
 * accesses. Results are accumulated into `pruneContext`.
 *
 * This plugin is analysis-only: it does not transform the code (`code: false`
 * should be passed to `transformAsync` when using it).
 */
export const makeUsageAnalyzerBabelPlugin =
  (pruneContext: PruneContext) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObj => ({
    name: 'intlayer-usage-analyzer',
    visitor: {
      Program: {
        exit: (programPath, state: PluginPass) => {
          const currentSourceFilePath =
            state.file.opts.filename ?? 'unknown file';
          const isSfcFile =
            currentSourceFilePath.endsWith('.vue') ||
            currentSourceFilePath.endsWith('.svelte');

          // Phase 1: collect local aliases for useIntlayer / getIntlayer
          const intlayerCallerLocalNameMap = new Map<string, string>();

          programPath.traverse({
            ImportDeclaration: (importDeclarationPath) => {
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
                }
              }
            },
          });

          if (intlayerCallerLocalNameMap.size === 0) return;

          // Phase 2: analyse each call-site
          programPath.traverse({
            CallExpression: (callExpressionPath) => {
              const calleeNode = callExpressionPath.node.callee;
              let localCallerName: string | undefined;

              if (babelTypes.isIdentifier(calleeNode)) {
                localCallerName = calleeNode.name;
              } else if (
                babelTypes.isMemberExpression(calleeNode) &&
                babelTypes.isIdentifier(calleeNode.property)
              ) {
                localCallerName = calleeNode.property.name;
              }

              if (
                !localCallerName ||
                !intlayerCallerLocalNameMap.has(localCallerName)
              )
                return;

              const callArguments = callExpressionPath.node.arguments;
              if (callArguments.length === 0) return;

              const firstArgument = callArguments[0];
              let dictionaryKey: string | undefined;

              if (babelTypes.isStringLiteral(firstArgument)) {
                dictionaryKey = firstArgument.value;
              } else if (
                babelTypes.isTemplateLiteral(firstArgument) &&
                firstArgument.expressions.length === 0 &&
                firstArgument.quasis.length === 1
              ) {
                dictionaryKey =
                  firstArgument.quasis[0].value.cooked ??
                  firstArgument.quasis[0].value.raw;
              }

              if (!dictionaryKey) return; // dynamic key – cannot resolve which dictionary

              analyzeCallExpressionUsage(
                babelTypes,
                pruneContext,
                callExpressionPath,
                dictionaryKey,
                currentSourceFilePath,
                isSfcFile
              );
            },
          });
        },
      },
    },
  });
