/**
 * Dictionary field usage result for a single dictionary key.
 *
 *   'all'        → we could not determine statically which fields are used;
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

/**
 * A level of the field-rename tree.  Maps original field names to their
 * `NestedRenameEntry` (short name + children for the next level).
 *
 * Example for a dictionary with shape:
 *   { authentication: { failed: "…" }, status: { configNotFound: "…" } }
 *
 *   Map {
 *     'authentication' → { shortName: 'a', children: Map {
 *       'failed' → { shortName: 'a', children: Map {} }
 *     }},
 *     'status' → { shortName: 'b', children: Map {
 *       'configNotFound' → { shortName: 'a', children: Map {} }
 *     }}
 *   }
 */
export type NestedRenameMap = Map<string, NestedRenameEntry>;

/**
 * Shared mutable state created once in `intlayerPlugin` and passed by
 * reference to both the optimize plugin (writer) and the prune plugin
 * (reader).  Because both plugins are instantiated before any Vite lifecycle
 * hook fires, mutations made during `buildStart` are visible to later
 * `transform` calls.
 */
export type PruneContext = {
  /**
   * Maps every dictionary key encountered in source files to the set of
   * top-level content fields that were statically accessed, or to `'all'`
   * when the access pattern could not be determined.
   */
  dictionaryKeyToFieldUsageMap: Map<string, DictionaryFieldUsage>;

  /**
   * Dictionary keys for which the prune step must be skipped entirely
   * (and minification as well) because an edge case was detected during
   * analysis or structure recognition.
   */
  dictionariesWithEdgeCases: Set<string>;

  /**
   * Set to `true` if at least one source file failed to parse during the
   * analysis phase.  The prune plugin uses this flag to be conservative:
   * any dictionary key that has no usage entry in the map might have been
   * referenced by the unparsable file.
   */
  hasUnparsableSourceFiles: boolean;

  /**
   * Maps dictionary keys to the list of source file paths where the result
   * of `useIntlayer` / `getIntlayer` was assigned to a plain variable instead
   * of being destructured, making static field analysis impossible.
   *
   * Example trigger:
   *   const content = useIntlayer('app');         // ← plain variable
   *   <Child prop={content.someField} />          // ← side-effect usage
   *
   * The analyzer falls back to `'all'` for these keys (no pruning will
   * happen), and the optimize plugin logs an actionable warning after
   * analysis to help developers refactor toward destructuring.
   */
  dictionaryKeysWithUntrackedBindings: Map<string, string[]>;

  /**
   * Maps each dictionary key to a nested field-rename tree built after the
   * usage analysis phase (only populated when `build.minify` is active and
   * the field usage for the dictionary is a known `Set<string>`).
   *
   * The tree captures renames at every level of user-defined nesting so that
   * both the compiled JSON files and source-code property access chains are
   * consistently rewritten.
   *
   * Example:
   *   'repository-link' → NestedRenameMap {
   *     'authentication' → { shortName: 'a', children: { 'failed' → { shortName: 'a', … } } },
   *     'status'         → { shortName: 'b', children: { 'configNotFound' → { shortName: 'a', … } } }
   *   }
   */
  dictionaryKeyToFieldRenameMap: Map<string, NestedRenameMap>;

  /**
   * Maps each dictionary key to a per-field list of source locations where the
   * field value is consumed "opaquely" — passed as-is to a child component,
   * function argument, or other context where its internal structure cannot be
   * statically tracked.  When a field is opaque AND has nested user-defined
   * structure, its children must not be renamed.
   *
   * Structure: dictionaryKey → fieldName → ["filePath:line", …]
   *
   * Example trigger:
   *   const content = useIntlayer('app');
   *   <BenchmarkTable objectValue={content.testNest} />  // ← testNest is opaque
   */
  dictionaryKeysWithOpaqueTopLevelFields: Map<string, Map<string, string[]>>;

  /**
   * Dictionary keys for which the field-rename (property-mangling) step must
   * be skipped even if a finite field-usage set was determined.
   *
   * Populated for dictionaries whose plain-variable bindings were resolved by
   * the framework-specific extractor (Vue / Svelte SFCs).  In those cases the
   * Babel rename plugin cannot update the source-code property accesses because
   * the actual content fields are accessed through an opaque intermediate:
   *
   *   • Vue:    `content.value.fieldName` — the `.value` ref-accessor is not
   *             in the rename map; `walkRenameChain` stops before reaching the
   *             real field and the source is left un-renamed while the JSON is
   *             already renamed → runtime mismatch.
   *   • Svelte: `$varName.fieldName` — the `$`-prefixed identifier is invisible
   *             to Babel scope analysis; references are never found and the JSON
   *             rename is not mirrored in source → same mismatch.
   *
   * Pruning (removing unused fields) and basic minification (whitespace
   * removal) still apply; only the field-key renaming is suppressed.
   */
  dictionariesSkippingFieldRename: Set<string>;

  /**
   * Plain variable bindings that cannot be resolved by standard Babel scope
   * analysis alone and require a framework-specific secondary pass.
   *
   * Populated during the Babel usage-analysis phase for `.vue` and `.svelte`
   * source files where direct field access is not visible to Babel:
   *
   *   - Vue:    `content.value.fieldName` — the `.value` ref-accessor indirection
   *             is invisible to scope analysis; the actual fields must be extracted
   *             by scanning the raw source for `varName.value.field` patterns.
   *   - Svelte: `$varName.fieldName` — Svelte's auto-subscription `$` prefix
   *             creates a separate identifier that Babel's scope analysis does not
   *             link back to `varName`.
   *
   * Structure: filePath → [{variableName, dictionaryKey}, …]
   *
   * After the Babel phase, `intlayerOptimize.buildStart` iterates this map,
   * calls the appropriate framework extractor, and merges the results into
   * `dictionaryKeyToFieldUsageMap`.  Any entry that cannot be resolved by the
   * framework extractor (e.g. the extractor package is not installed) falls
   * back to `'all'`.
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
