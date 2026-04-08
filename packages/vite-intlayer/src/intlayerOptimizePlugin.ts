import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  NodePath,
  PluginObj,
  PluginPass,
  TransformOptions,
} from '@babel/core';
import { transformAsync } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import {
  extractScriptBlocks,
  injectScriptBlocks,
  intlayerOptimizeBabelPlugin,
  type ScriptBlock,
} from '@intlayer/babel';
import {
  buildComponentFilesList,
  formatPath,
  runOnce,
} from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { IMPORT_MODE } from '@intlayer/config/defaultValues';
import { colorize, colorizeKey, getAppLogger } from '@intlayer/config/logger';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { PluginOption } from 'vite';
import { intlayerVueAsyncPlugin } from './intlayerVueAsyncPlugin';
import type {
  DictionaryFieldUsage,
  NestedRenameMap,
  PruneContext,
} from './pruneContext';

// Constants

const INTLAYER_CALLER_NAMES = ['useIntlayer', 'getIntlayer'] as const;

/** Fast pre-check: skip files that clearly have no intlayer calls. */
const INTLAYER_USAGE_REGEX = /\b(use|get)Intlayer\b/;

/**
 * Matches source files that are valid targets for usage analysis and Babel
 * transformation.  Sourcemap files (.js.map, .mjs.map, …), declaration files
 * (.d.ts), and any other non-source extensions are explicitly excluded so that
 * files landing in `componentFilesList` through a `codeDir` that points
 * directly into a `dist/` folder are still skipped gracefully.
 */
const SOURCE_FILE_REGEX = /\.(tsx?|[mc]?jsx?|vue|svelte)$/;

/**
 * Babel parser options shared between the optimization transform and the
 * usage analysis pass.  Matches the superset of syntaxes used across the
 * supported frameworks (React/Vue/Svelte/…).
 */
const BABEL_PARSER_OPTIONS: NonNullable<TransformOptions['parserOpts']> = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  plugins: [
    'typescript',
    'jsx',
    'decorators-legacy',
    'classProperties',
    'objectRestSpread',
    'asyncGenerators',
    'functionBind',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'dynamicImport',
    'nullishCoalescingOperator',
    'optionalChaining',
  ],
};

// Field-rename helpers

/**
 * Intlayer internal property names that must never be used as short-name
 * targets.  These appear inside content-node values (e.g. `{ nodeType:
 * "translation", … }`) and are read by the intlayer runtime; renaming them
 * would break dictionary interpretation.
 */
const RESERVED_CONTENT_FIELD_NAMES = new Set(['nodeType']);

/**
 * Converts a zero-based index to a short alphabetic identifier.
 *   0 → 'a', 1 → 'b', …, 25 → 'z', 26 → 'aa', 27 → 'ab', …
 */
const generateShortFieldName = (index: number): string => {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  const remainder = index % ALPHABET.length;
  const quotient = Math.floor(index / ALPHABET.length);
  return quotient === 0
    ? ALPHABET[remainder]
    : generateShortFieldName(quotient - 1) + ALPHABET[remainder];
};

/**
 * Recursively builds a `NestedRenameMap` from a compiled dictionary content
 * value by traversing the intlayer node structure.
 *
 * Rules:
 *  - If the value has `nodeType: 'translation'`, the user-defined fields live
 *    inside `translation[locale]`.  Recurse into the first locale's value.
 *  - Otherwise treat the object as a user-defined record: rename its keys
 *    (filtering by `usedFieldFilter` when provided) and recurse into each
 *    value with no filter so all nested fields are captured.
 *  - Primitives and arrays produce an empty map (no further renaming possible).
 *
 * @param contentValue    - The JSON value to analyse.
 * @param usedFieldFilter - When provided, only keys in this set are included at
 *                          the current level (used at the top level to match the
 *                          usage-analysis results so we don't rename purged fields).
 */
const buildNestedRenameMapFromContent = (
  contentValue: unknown,
  usedFieldFilter?: Set<string>
): NestedRenameMap => {
  if (
    !contentValue ||
    typeof contentValue !== 'object' ||
    Array.isArray(contentValue)
  ) {
    return new Map();
  }

  const record = contentValue as Record<string, unknown>;

  // Any object with `nodeType: string` is an intlayer runtime node.
  if (typeof record.nodeType === 'string') {
    // Translation node: user-defined fields live inside translation[locale].
    if (
      record.translation &&
      typeof record.translation === 'object' &&
      !Array.isArray(record.translation)
    ) {
      const firstLocaleValue = Object.values(
        record.translation as Record<string, unknown>
      )[0];
      return buildNestedRenameMapFromContent(firstLocaleValue, usedFieldFilter);
    }
    // All other intlayer nodes (enumeration, condition, gender, insert,
    // markdown, nest, …) have runtime-managed internal structure that must
    // never be renamed.  Return an empty map so they are treated as leaves.
    return new Map();
  }

  // User-defined record: collect all non-reserved keys
  const allKeys = Object.keys(record).filter(
    (key) => !RESERVED_CONTENT_FIELD_NAMES.has(key)
  );

  const keysToRename = usedFieldFilter
    ? allKeys.filter((key) => usedFieldFilter.has(key))
    : allKeys;

  const sortedKeys = [...keysToRename].sort();
  const renameMap: NestedRenameMap = new Map();

  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    const children = buildNestedRenameMapFromContent(record[key]); // no filter for nested
    renameMap.set(key, { shortName: generateShortFieldName(i), children });
  }

  return renameMap;
};

// Usage analyser Babel plugin

/**
 * Builds a Babel plugin that traverses a source file and records which
 * top-level dictionary fields each `useIntlayer` / `getIntlayer` call-site
 * accesses.  Results are accumulated into `pruneContext`.
 *
 * Recognised patterns:
 *   const { fieldA, fieldB } = useIntlayer('key')  → records {fieldA, fieldB}
 *   useIntlayer('key').fieldA                       → records {fieldA}
 *   useIntlayer('key')['fieldA']                    → records {fieldA}
 *   const { ...rest } = useIntlayer('key')          → records 'all' (spread)
 *   const result = useIntlayer('key')               → records 'all' (untracked binding)
 */
const makeUsageAnalyzerBabelPlugin =
  (pruneContext: PruneContext) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObj => {
    const recordFieldUsage = (
      dictionaryKey: string,
      fieldUsage: DictionaryFieldUsage
    ): void => {
      const existingUsage =
        pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);

      if (existingUsage === 'all') return; // already saturated, nothing to add

      if (fieldUsage === 'all') {
        pruneContext.dictionaryKeyToFieldUsageMap.set(dictionaryKey, 'all');
        return;
      }

      const mergedFieldSet =
        existingUsage instanceof Set
          ? new Set([...existingUsage, ...fieldUsage])
          : new Set(fieldUsage);

      pruneContext.dictionaryKeyToFieldUsageMap.set(
        dictionaryKey,
        mergedFieldSet
      );
    };

    /**
     * @param callExpressionPath           - The call expression path for the intlayer call.
     * @param dictionaryKey                - The resolved dictionary key string.
     * @param onUntrackedBinding           - Called when the usage pattern cannot be
     *   statically analysed (e.g. result assigned to a plain variable).
     *   The caller provides this to record the file-level context for logging.
     * @param onOpaqueField                - Called when a first-level field value is
     *   consumed without further static member-access chaining (e.g. passed
     *   as a prop or function argument).  The field's nested keys must not be
     *   renamed because the downstream consumer still uses the original names.
     *   The `line` argument is the 1-based source line of the access site.
     * @param onDeferredFrameworkAnalysis  - Called instead of `recordFieldUsage`
     *   when the plain-variable binding is in an SFC file (`.vue` / `.svelte`)
     *   and standard Babel scope analysis cannot see all field accesses (e.g.
     *   Vue's `.value` indirection or Svelte's `$store` prefix).  The caller
     *   should add this binding to `pruneContext.pendingFrameworkAnalysis` for
     *   a second pass using the framework-specific extractor.
     * @param isSfcFile - Whether the file being analysed is a Vue or Svelte SFC.
     */
    const analyzeCallExpressionUsage = (
      callExpressionPath: NodePath<BabelTypes.CallExpression>,
      dictionaryKey: string,
      onUntrackedBinding: (dictionaryKey: string) => void,
      onOpaqueField: (
        dictionaryKey: string,
        fieldName: string,
        line: number | undefined
      ) => void,
      onDeferredFrameworkAnalysis: (
        dictionaryKey: string,
        variableName: string
      ) => void,
      isSfcFile: boolean
    ): void => {
      const parentNode = callExpressionPath.parent;

      //  const { fieldA, fieldB } = useIntlayer('key')─
      if (
        babelTypes.isVariableDeclarator(parentNode) &&
        babelTypes.isObjectPattern(parentNode.id)
      ) {
        const hasRestElement = parentNode.id.properties.some((property) =>
          babelTypes.isRestElement(property)
        );

        if (hasRestElement) {
          // { ...rest } = useIntlayer('key') — all fields consumed via spread
          recordFieldUsage(dictionaryKey, 'all');
          return;
        }

        const accessedFieldNames = new Set<string>();

        for (const property of parentNode.id.properties) {
          if (
            babelTypes.isObjectProperty(property) &&
            babelTypes.isIdentifier(property.key)
          ) {
            accessedFieldNames.add(property.key.name);
          } else if (
            babelTypes.isObjectProperty(property) &&
            babelTypes.isStringLiteral(property.key)
          ) {
            accessedFieldNames.add(property.key.value);
          }
        }

        recordFieldUsage(dictionaryKey, accessedFieldNames);
        return;
      }

      //  useIntlayer('key').fieldName  /  useIntlayer('key')['fieldName']
      // Also handles optional chaining: useIntlayer('key')?.fieldName
      if (
        (babelTypes.isMemberExpression(parentNode) ||
          babelTypes.isOptionalMemberExpression(parentNode)) &&
        (parentNode as BabelTypes.MemberExpression).object ===
          callExpressionPath.node
      ) {
        if (
          !parentNode.computed &&
          babelTypes.isIdentifier(parentNode.property)
        ) {
          recordFieldUsage(dictionaryKey, new Set([parentNode.property.name]));
        } else if (
          parentNode.computed &&
          babelTypes.isStringLiteral(parentNode.property)
        ) {
          recordFieldUsage(dictionaryKey, new Set([parentNode.property.value]));
        } else {
          // Dynamic computed access: useIntlayer('key')[dynamicVar]
          // Cannot determine field name statically → keep all fields.
          onUntrackedBinding(dictionaryKey);
          recordFieldUsage(dictionaryKey, 'all');
        }
        return;
      }

      //  const content = useIntlayer('key') – plain variable
      // Walk all reference paths of the binding to collect first-level member
      // accesses (content.field / content['field']).  Fall back to 'all' only
      // when a reference cannot be resolved statically (e.g. the variable is
      // spread, passed as a function argument, or accessed with a dynamic key).
      if (
        babelTypes.isVariableDeclarator(parentNode) &&
        babelTypes.isIdentifier(parentNode.id)
      ) {
        const variableName = parentNode.id.name;
        const variableBinding =
          callExpressionPath.scope.getBinding(variableName);

        if (!variableBinding) {
          onUntrackedBinding(dictionaryKey);
          recordFieldUsage(dictionaryKey, 'all');
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
            const refParent =
              referenceParentNode as BabelTypes.MemberExpression;
            if (
              !refParent.computed &&
              babelTypes.isIdentifier(refParent.property)
            ) {
              const fieldName = refParent.property.name;
              accessedTopLevelFieldNames.add(fieldName);
              // Detect opaque usage: `content.fieldName` is not chained further
              // (grandparent is not another member access on that value).
              // Optional chaining (`?.`) also counts as "chained further".
              const memberExprPath = variableReferencePath.parentPath;
              const grandParentNode = memberExprPath?.parent;
              const isChainedFurther =
                (babelTypes.isMemberExpression(grandParentNode) ||
                  babelTypes.isOptionalMemberExpression(grandParentNode)) &&
                (grandParentNode as BabelTypes.MemberExpression).object ===
                  memberExprPath?.node;
              if (!isChainedFurther) {
                onOpaqueField(
                  dictionaryKey,
                  fieldName,
                  memberExprPath?.node.loc?.start.line
                );
              }
            } else if (
              refParent.computed &&
              babelTypes.isStringLiteral(refParent.property)
            ) {
              const fieldName = refParent.property.value;
              accessedTopLevelFieldNames.add(fieldName);
              // Same opaque-usage check for bracket-notation access
              const memberExprPath = variableReferencePath.parentPath;
              const grandParentNode = memberExprPath?.parent;
              const isChainedFurther =
                (babelTypes.isMemberExpression(grandParentNode) ||
                  babelTypes.isOptionalMemberExpression(grandParentNode)) &&
                (grandParentNode as BabelTypes.MemberExpression).object ===
                  memberExprPath?.node;
              if (!isChainedFurther) {
                onOpaqueField(
                  dictionaryKey,
                  fieldName,
                  memberExprPath?.node.loc?.start.line
                );
              }
            } else {
              // Dynamic computed access: content[dynamicVar] – cannot resolve statically
              hasUntrackedReferenceAccess = true;
              break;
            }
          } else if (babelTypes.isArrayExpression(referenceParentNode)) {
          } else {
            // Variable used in a non-member-access context (spread, function
            // argument, ternary operand, etc.) — cannot determine which fields
            // will be consumed downstream.
            hasUntrackedReferenceAccess = true;
            break;
          }
        }

        if (hasUntrackedReferenceAccess) {
          // Dynamic access, spread, or opaque function-argument usage: we
          // cannot determine the field set statically regardless of framework.
          onUntrackedBinding(dictionaryKey);
          recordFieldUsage(dictionaryKey, 'all');
        } else if (isSfcFile) {
          // Vue / Svelte SFC: Babel scope analysis cannot see all field
          // accesses because:
          //   • Vue:    `content.value.fieldName` — `.value` is the reactive
          //             Ref accessor; Babel records `{value}`, not the real field.
          //   • Svelte: `$varName.fieldName` — the auto-subscription `$` prefix
          //             is a separate identifier; Babel sees zero refs for `varName`.
          // Defer to the framework-specific extractor that will run after the
          // Babel phase completes.
          onDeferredFrameworkAnalysis(dictionaryKey, variableName);
        } else if (variableBinding.referencePaths.length === 0) {
          // Non-SFC file with no visible references. Could be a genuinely unused
          // variable or a pattern we can't analyse. Conservatively keep all fields.
          onUntrackedBinding(dictionaryKey);
          recordFieldUsage(dictionaryKey, 'all');
        } else {
          recordFieldUsage(dictionaryKey, accessedTopLevelFieldNames);
        }
        return;
      }

      //  Bare call: result is discarded entirely─
      // e.g. `useIntlayer('key')` called as a standalone expression with no
      // assignment.  This contributes no field usage information — skip
      // without warning.  Any other call-site in the same file may still
      // record a finite field set.
      if (babelTypes.isExpressionStatement(parentNode)) {
        return;
      }

      //  Fallback: result passed as a function argument, used inside a
      // ternary, etc.  Without further analysis we cannot know which fields
      // will be accessed downstream.  Mark as 'all' to prevent pruning.
      onUntrackedBinding(dictionaryKey);
      recordFieldUsage(dictionaryKey, 'all');
    };

    return {
      name: 'intlayer-usage-analyzer',
      visitor: {
        Program: {
          exit: (programPath, state: PluginPass) => {
            const currentSourceFilePath =
              state.file.opts.filename ?? 'unknown file';

            /**
             * Called whenever a call-site falls back to 'all' because we
             * cannot statically determine which fields are accessed.
             * Records the file so a post-analysis warning can be emitted.
             */
            const onUntrackedBinding = (dictionaryKey: string): void => {
              const existingFilePaths =
                pruneContext.dictionaryKeysWithUntrackedBindings.get(
                  dictionaryKey
                ) ?? [];

              if (!existingFilePaths.includes(currentSourceFilePath)) {
                pruneContext.dictionaryKeysWithUntrackedBindings.set(
                  dictionaryKey,
                  [...existingFilePaths, currentSourceFilePath]
                );
              }
            };

            const onOpaqueField = (
              dictionaryKey: string,
              fieldName: string,
              line: number | undefined
            ): void => {
              const fieldToLocations =
                pruneContext.dictionaryKeysWithOpaqueTopLevelFields.get(
                  dictionaryKey
                ) ?? new Map<string, string[]>();
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

            /**
             * Called for plain variable bindings in SFC files (.vue / .svelte)
             * where Babel scope analysis cannot see all field accesses.
             * Registers the binding for a second pass using the framework-specific
             * extractor that runs after all Babel analyses complete.
             */
            const onDeferredFrameworkAnalysis = (
              dictionaryKey: string,
              variableName: string
            ): void => {
              const existing =
                pruneContext.pendingFrameworkAnalysis.get(
                  currentSourceFilePath
                ) ?? [];
              if (
                !existing.some(
                  (e) =>
                    e.variableName === variableName &&
                    e.dictionaryKey === dictionaryKey
                )
              ) {
                existing.push({ variableName, dictionaryKey });
              }
              pruneContext.pendingFrameworkAnalysis.set(
                currentSourceFilePath,
                existing
              );
            };

            const isSfcFile =
              currentSourceFilePath.endsWith('.vue') ||
              currentSourceFilePath.endsWith('.svelte');

            // Map from local identifier name → canonical intlayer caller name
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
                      importedName as (typeof INTLAYER_CALLER_NAMES)[number]
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
                ) {
                  return;
                }

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

                // Dynamic key – cannot resolve which dictionary is targeted
                if (!dictionaryKey) return;

                analyzeCallExpressionUsage(
                  callExpressionPath,
                  dictionaryKey,
                  onUntrackedBinding,
                  onOpaqueField,
                  onDeferredFrameworkAnalysis,
                  isSfcFile
                );
              },
            });
          },
        },
      },
    };
  };

// Field-rename Babel plugin

/**
 * Creates a Babel plugin that rewrites dictionary content field accesses in
 * source files to their short aliases defined in
 * `pruneContext.dictionaryKeyToFieldRenameMap`.
 *
 * Handled patterns (mirrors the usage analyser):
 *
 *   const { fieldA, fieldB } = useIntlayer('key')
 *     → const { shortA: fieldA, shortB: fieldB } = useIntlayer('key')
 *
 *   useIntlayer('key').fieldA
 *     → useIntlayer('key').shortA
 *
 *   const result = useIntlayer('key');  result.fieldA
 *     → const result = useIntlayer('key');  result.shortA
 *
 * This plugin must run in a separate `transformAsync` pass *before*
 * `intlayerOptimizeBabelPlugin`, because the latter replaces `useIntlayer`
 * with `useDictionary`, erasing the dictionary-key information we need here.
 */
const makeFieldRenameBabelPlugin =
  (pruneContext: PruneContext) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObj => ({
    name: 'intlayer-field-rename',
    visitor: {
      Program: {
        exit: (programPath) => {
          if (pruneContext.dictionaryKeyToFieldRenameMap.size === 0) return;

          //  Build local-alias map for useIntlayer / getIntlayer
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
                    importedName as (typeof INTLAYER_CALLER_NAMES)[number]
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

          //  Visit all useIntlayer / getIntlayer call-sites─
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
              ) {
                return;
              }

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

              if (!dictionaryKey) return;

              const fieldRenameMap =
                pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
              if (!fieldRenameMap || fieldRenameMap.size === 0) return;

              const parentNode = callExpressionPath.parent;

              //  Helper: walk a MemberExpression chain renaming each level
              // Starting from `startPath` (whose parent is the first member
              // access), traverses consecutive MemberExpression parents and
              // renames each property found in the corresponding level of
              // `currentRenameMap`, then recurses into that entry's children.
              const walkRenameChain = (
                startPath: NodePath<BabelTypes.Node>,
                currentRenameMap: NestedRenameMap
              ): void => {
                let refPath: NodePath<BabelTypes.Node> = startPath;
                let renameMap = currentRenameMap;

                while (renameMap.size > 0) {
                  const parentPath = refPath.parentPath;
                  if (!parentPath) break;
                  const pNode = parentPath.node;

                  if (
                    (!babelTypes.isMemberExpression(pNode) &&
                      !babelTypes.isOptionalMemberExpression(pNode)) ||
                    (pNode as BabelTypes.MemberExpression).object !==
                      refPath.node
                  ) {
                    break;
                  }

                  // Both MemberExpression and OptionalMemberExpression share the
                  // same `computed` / `property` shape — cast once for clarity.
                  const memberNode = pNode as BabelTypes.MemberExpression;

                  let fieldName: string | undefined;
                  if (
                    !memberNode.computed &&
                    babelTypes.isIdentifier(memberNode.property)
                  ) {
                    fieldName = memberNode.property.name;
                  } else if (
                    memberNode.computed &&
                    babelTypes.isStringLiteral(memberNode.property)
                  ) {
                    fieldName = memberNode.property.value;
                  } else {
                    break; // dynamic key – stop
                  }

                  const renameEntry = renameMap.get(fieldName);
                  if (!renameEntry) break; // not in map – stop

                  // Rename this property
                  if (
                    !memberNode.computed &&
                    babelTypes.isIdentifier(memberNode.property)
                  ) {
                    memberNode.property.name = renameEntry.shortName;
                  } else if (
                    memberNode.computed &&
                    babelTypes.isStringLiteral(memberNode.property)
                  ) {
                    memberNode.property.value = renameEntry.shortName;
                  }

                  refPath = parentPath;
                  renameMap = renameEntry.children;
                }
              };

              //  Case 1: const { fieldA, fieldB } = useIntlayer('key')
              // Renames top-level keys in the destructuring pattern and also
              // follows nested accesses on each destructured local variable so
              // that chains like `fieldA.subKey.value` are rewritten to match
              // the renamed JSON structure.
              if (
                babelTypes.isVariableDeclarator(parentNode) &&
                babelTypes.isObjectPattern(parentNode.id)
              ) {
                for (const property of parentNode.id.properties) {
                  if (!babelTypes.isObjectProperty(property)) continue;

                  const keyName = babelTypes.isIdentifier(property.key)
                    ? property.key.name
                    : babelTypes.isStringLiteral(property.key)
                      ? property.key.value
                      : null;
                  if (!keyName) continue;

                  const renameEntry = fieldRenameMap.get(keyName);
                  if (!renameEntry) continue;

                  if (property.shorthand) {
                    // { fieldA } → { shortA: fieldA }
                    property.shorthand = false;
                    property.key = babelTypes.identifier(renameEntry.shortName);
                  } else {
                    // { fieldA: localVar } → { shortA: localVar }
                    property.key = babelTypes.identifier(renameEntry.shortName);
                  }

                  // If this field has nested user-defined structure, walk all
                  // references to the local variable and rename their chained
                  // member accesses (e.g. navigation.content.label → navigation.b.a).
                  if (
                    renameEntry.children.size > 0 &&
                    babelTypes.isIdentifier(property.value)
                  ) {
                    const localVarBinding = callExpressionPath.scope.getBinding(
                      property.value.name
                    );
                    if (localVarBinding) {
                      for (const refPath of localVarBinding.referencePaths) {
                        walkRenameChain(refPath, renameEntry.children);
                      }
                    }
                  }
                }
                return;
              }

              //  Case 2: useIntlayer('key').fieldA.nested …─
              // Also handles optional chaining: useIntlayer('key')?.fieldA
              if (
                (babelTypes.isMemberExpression(parentNode) ||
                  babelTypes.isOptionalMemberExpression(parentNode)) &&
                (parentNode as BabelTypes.MemberExpression).object ===
                  callExpressionPath.node
              ) {
                walkRenameChain(callExpressionPath, fieldRenameMap);
                return;
              }

              //  Case 3: const result = useIntlayer('key'); result.fieldA … ─
              if (
                babelTypes.isVariableDeclarator(parentNode) &&
                babelTypes.isIdentifier(parentNode.id)
              ) {
                const variableName = parentNode.id.name;
                const variableBinding =
                  callExpressionPath.scope.getBinding(variableName);
                if (!variableBinding) return;

                for (const variableReferencePath of variableBinding.referencePaths) {
                  walkRenameChain(variableReferencePath, fieldRenameMap);
                }
              }
            },
          });
        },
      },
    },
  });

// Vite plugin─

/**
 * Returns the Vite plugins responsible for the build optimisation step.
 *
 * Contains three internal plugins:
 *
 * 1. Vue async plugin – handles Vue SFC async blocks.
 * 2. Usage analyser (`vite-intlayer-usage-analyzer`) – pre-scans every
 *    component source file during `buildStart` to build the field-usage map
 *    in `pruneContext`.  This runs before any `transform` calls so the
 *    downstream prune plugin always has complete data.
 * 3. Babel transform (`vite-intlayer-babel-transform`) – rewrites
 *    `useIntlayer('key')` / `getIntlayer('key')` calls into
 *    `useDictionary(_hash)` / `getDictionary(_hash)` and injects the
 *    corresponding JSON (or dynamic `.mjs`) imports.
 *
 * @param intlayerConfig - Resolved intlayer configuration.
 * @param pruneContext   - Shared mutable state written here and read by the
 *                         prune plugin.  Pass `null` to skip analysis (e.g.
 *                         when both `purge` and `minify` are disabled).
 */
export const intlayerOptimize = async (
  intlayerConfig: IntlayerConfig,
  pruneContext: PruneContext | null
): Promise<PluginOption[]> => {
  try {
    const logger = getAppLogger(intlayerConfig);

    const { optimize, purge, minify } = intlayerConfig.build;
    const editorEnabled = intlayerConfig.editor.enabled;

    const importMode =
      intlayerConfig.build.importMode ?? intlayerConfig.dictionary?.importMode;

    const {
      dictionariesDir,
      dynamicDictionariesDir,
      unmergedDictionariesDir,
      fetchDictionariesDir,
      mainDir,
      baseDir,
    } = intlayerConfig.system;

    const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
    const unmergedDictionariesEntryPath = join(
      mainDir,
      'unmerged_dictionaries.mjs'
    );
    const dynamicDictionariesEntryPath = join(
      mainDir,
      'dynamic_dictionaries.mjs'
    );

    const componentFilesList = buildComponentFilesList(intlayerConfig);

    const transformableFilesList = [
      ...componentFilesList,
      dictionariesEntryPath,
      unmergedDictionariesEntryPath,
    ];

    const dictionaries = getDictionaries(intlayerConfig);

    const dictionaryKeyToImportModeMap: Record<
      string,
      'static' | 'dynamic' | 'fetch'
    > = {};

    (Object.values(dictionaries) as Dictionary[]).forEach((dictionary) => {
      dictionaryKeyToImportModeMap[dictionary.key] =
        dictionary.importMode ?? importMode ?? IMPORT_MODE;
    });

    const isBuildOptimizeEnabled = (
      _config: unknown,
      env: { command: string }
    ) => {
      const isBuildCommand = env.command === 'build';
      return (optimize === undefined && isBuildCommand) || optimize === true;
    };

    const isAnalysisEnabled = (_config: unknown, env: { command: string }) =>
      !editorEnabled &&
      (!!purge || !!minify) &&
      isBuildOptimizeEnabled(_config, env);

    return [
      intlayerVueAsyncPlugin(intlayerConfig, transformableFilesList),

      //  Plugin: usage analyser─
      {
        name: 'vite-intlayer-usage-analyzer',
        enforce: 'pre',
        apply: isAnalysisEnabled,

        buildStart: async () => {
          if (!pruneContext) return;

          const usageAnalyzerBabelPlugin =
            makeUsageAnalyzerBabelPlugin(pruneContext);

          await Promise.all(
            componentFilesList.map(async (sourceFilePath) => {
              // Skip non-source files (sourcemaps, binaries, …) that may slip
              // through when codeDir points directly into a dist/ folder.
              if (!SOURCE_FILE_REGEX.test(sourceFilePath)) return;

              let sourceFileCode: string;

              try {
                sourceFileCode = await readFile(sourceFilePath, 'utf-8');
              } catch {
                return; // unreadable file – skip silently
              }

              // Fast path: skip files that clearly have no intlayer calls
              if (!INTLAYER_USAGE_REGEX.test(sourceFileCode)) return;

              // Extract script block(s) from the source.
              // For Vue/Svelte SFCs this yields the JS content of each
              // <script> block; for plain JS/TS files it yields the whole file.
              const scriptBlocks = extractScriptBlocks(
                sourceFilePath,
                sourceFileCode
              );

              // If no blocks were extracted for a Vue/Svelte file that appears
              // to contain intlayer calls, we cannot determine usage → be
              // conservative and disable pruning for any dictionary that may
              // have been referenced.
              if (scriptBlocks.length === 0) {
                pruneContext.hasUnparsableSourceFiles = true;
                logger(
                  [
                    `Could not extract script blocks from`,
                    formatPath(sourceFilePath),
                    `for field-usage analysis.`,
                    'Dictionaries whose usage cannot be confirmed will not be pruned.',
                  ],
                  { level: 'warn' }
                );
                return;
              }

              for (const block of scriptBlocks) {
                // Skip blocks that contain no intlayer calls
                if (!INTLAYER_USAGE_REGEX.test(block.content)) continue;

                try {
                  await transformAsync(block.content, {
                    filename: sourceFilePath,
                    plugins: [usageAnalyzerBabelPlugin],
                    parserOpts: BABEL_PARSER_OPTIONS,
                    // Analysis only – we do not need the transformed code output
                    ast: false,
                    code: false,
                  });
                } catch (parseError) {
                  pruneContext.hasUnparsableSourceFiles = true;
                  logger(
                    [
                      `Could not parse`,
                      formatPath(sourceFilePath),
                      `for field-usage analysis.`,
                      'Dictionaries whose usage cannot be confirmed will not be pruned.',
                      parseError instanceof Error
                        ? `(${parseError.message})`
                        : String(parseError),
                    ],
                    { level: 'warn' }
                  );
                }
              }
            })
          );

          //  Phase 2: framework-specific field-usage analysis for SFC files
          // Plain variable bindings in Vue and Svelte SFCs cannot be fully
          // resolved by Babel scope analysis:
          //
          //   • Vue:    `content.value.fieldName` — `.value` is the reactive-Ref
          //             accessor; Babel records `{value}` rather than the actual
          //             content field name.
          //   • Svelte: `$varName.fieldName` — Svelte's auto-subscription prefix
          //             creates a distinct identifier; Babel sees zero refs for the
          //             original `varName` binding.
          //
          // For each such binding registered in `pendingFrameworkAnalysis`, we now
          // run a lightweight regex-based extractor from the corresponding framework
          // compiler package (`@intlayer/vue-compiler` / `@intlayer/svelte-compiler`).
          // If the extractor is not installed or yields no results, we fall back to
          // `'all'` (conservative – no pruning for that dictionary).
          if (pruneContext.pendingFrameworkAnalysis.size > 0) {
            // Group pending entries by file extension
            const vuePending = new Map<
              string,
              { variableName: string; dictionaryKey: string }[]
            >();
            const sveltePending = new Map<
              string,
              { variableName: string; dictionaryKey: string }[]
            >();

            for (const [
              filePath,
              entries,
            ] of pruneContext.pendingFrameworkAnalysis) {
              if (filePath.endsWith('.vue')) {
                vuePending.set(filePath, entries);
              } else if (filePath.endsWith('.svelte')) {
                sveltePending.set(filePath, entries);
              }
            }

            // Helper: merge framework-extracted field usage into pruneContext
            const mergeFrameworkResult = (
              dictionaryKey: string,
              fields: Set<string> | undefined
            ): void => {
              if (fields && fields.size > 0) {
                // The Babel rename plugin cannot update source-code property
                // accesses for SFC indirect patterns (Vue `.value.field` /
                // Svelte `$store.field`), so we suppress field renaming for
                // these dictionaries to avoid a JSON ↔ source mismatch at
                // runtime.  Pruning still applies.
                pruneContext.dictionariesSkippingFieldRename.add(dictionaryKey);

                // Merge with any fields already recorded (e.g. from a
                // destructuring call-site in another file).
                const existing =
                  pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);
                if (existing === 'all') return; // already saturated

                const merged =
                  existing instanceof Set
                    ? new Set([...existing, ...fields])
                    : new Set(fields);
                pruneContext.dictionaryKeyToFieldUsageMap.set(
                  dictionaryKey,
                  merged
                );
              } else {
                // Could not determine fields — fall back to 'all' (no pruning).
                pruneContext.dictionaryKeyToFieldUsageMap.set(
                  dictionaryKey,
                  'all'
                );
              }
            };

            // Vue files
            if (vuePending.size > 0) {
              let extractVueIntlayerFieldUsage:
                | ((
                    code: string,
                    vars: { variableName: string; dictionaryKey: string }[]
                  ) => Map<string, Set<string>>)
                | null = null;

              try {
                const vueCompiler = await import('@intlayer/vue-compiler');
                extractVueIntlayerFieldUsage =
                  vueCompiler.extractVueIntlayerFieldUsage;
              } catch {
                // @intlayer/vue-compiler not installed — fall back to 'all'
              }

              for (const [filePath, entries] of vuePending) {
                if (!extractVueIntlayerFieldUsage) {
                  for (const { dictionaryKey } of entries)
                    mergeFrameworkResult(dictionaryKey, undefined);
                  continue;
                }

                let fileCode: string;
                try {
                  fileCode = await readFile(filePath, 'utf-8');
                } catch {
                  for (const { dictionaryKey } of entries)
                    mergeFrameworkResult(dictionaryKey, undefined);
                  continue;
                }

                const result = extractVueIntlayerFieldUsage(fileCode, entries);

                for (const { dictionaryKey } of entries) {
                  mergeFrameworkResult(
                    dictionaryKey,
                    result.get(dictionaryKey)
                  );
                }
              }
            }

            // Svelte files
            if (sveltePending.size > 0) {
              let extractSvelteIntlayerFieldUsage:
                | ((
                    code: string,
                    vars: { variableName: string; dictionaryKey: string }[]
                  ) => Map<string, Set<string>>)
                | null = null;

              try {
                const svelteCompiler = await import(
                  '@intlayer/svelte-compiler'
                );
                extractSvelteIntlayerFieldUsage =
                  svelteCompiler.extractSvelteIntlayerFieldUsage;
              } catch {
                // @intlayer/svelte-compiler not installed — fall back to 'all'
              }

              for (const [filePath, entries] of sveltePending) {
                if (!extractSvelteIntlayerFieldUsage) {
                  for (const { dictionaryKey } of entries)
                    mergeFrameworkResult(dictionaryKey, undefined);
                  continue;
                }

                let fileCode: string;
                try {
                  fileCode = await readFile(filePath, 'utf-8');
                } catch {
                  for (const { dictionaryKey } of entries)
                    mergeFrameworkResult(dictionaryKey, undefined);
                  continue;
                }

                const result = extractSvelteIntlayerFieldUsage(
                  fileCode,
                  entries
                );

                for (const { dictionaryKey } of entries) {
                  mergeFrameworkResult(
                    dictionaryKey,
                    result.get(dictionaryKey)
                  );
                }
              }
            }
          }

          //  Post-analysis: warn about untracked bindings
          // Log once per dictionary key where purging is impossible because
          // the result of useIntlayer/getIntlayer was assigned to a plain
          // variable.  This gives developers an actionable hint to refactor
          // toward destructuring so the purge optimisation can kick in.
          for (const [
            dictionaryKey,
            sourceFilePaths,
          ] of pruneContext.dictionaryKeysWithUntrackedBindings) {
            logger(
              [
                `Dictionary`,
                colorizeKey(dictionaryKey),
                `cannot be purged or minified.`,
                `\n    Reason: the result of`,
                `${colorize(`useIntlayer(`, ANSIColors.GREY_LIGHT)}${colorizeKey(
                  `'${dictionaryKey}'`
                )}${colorize(`)`, ANSIColors.GREY_LIGHT)}`,
                `is assigned to a plain variable in:`,
                ...sourceFilePaths.map(
                  (filePath) => `\n      - ${formatPath(filePath)}`
                ),
              ],
              { level: 'warn' }
            );
          }

          //  Build field rename map (for minification)
          // Read each compiled dictionary JSON to discover the full nested
          // user-defined field structure, then build a NestedRenameMap that
          // assigns short alphabetic aliases at every level.  Only built when
          // `minify` is active and the field usage for a dictionary is a finite
          // Set (not 'all').  The rename is applied to both the JSON files (by
          // `intlayerMinify`) and source property-access chains (by the babel
          // rename pass below).
          if (minify) {
            for (const [
              dictionaryKey,
              fieldUsage,
            ] of pruneContext.dictionaryKeyToFieldUsageMap) {
              if (fieldUsage === 'all') continue; // unknown usage – skip

              // Fetch-mode dictionaries are served from a remote API at runtime
              // using their original field names.  Renaming fields in the
              // compiled JSON would create a mismatch between the server
              // response and the client-side property accesses → skip.
              if (dictionaryKeyToImportModeMap[dictionaryKey] === 'fetch')
                continue;

              // SFC indirect access (Vue `.value.field` / Svelte `$store.field`):
              // the Babel rename plugin cannot update these source-code accesses
              // because the intermediate accessor (`value` / `$prefix`) is not
              // in the rename map.  Renaming only the JSON would cause a runtime
              // mismatch → skip field rename for these dictionaries.
              if (
                pruneContext.dictionariesSkippingFieldRename.has(dictionaryKey)
              )
                continue;

              // Attempt to read the static (all-locale) dict JSON first;
              // fall back to the first locale file of the dynamic dict.
              let dictContent: unknown = null;

              const staticJsonPath = join(
                dictionariesDir,
                `${dictionaryKey}.json`
              );
              try {
                const raw = await readFile(staticJsonPath, 'utf-8');
                const parsed = JSON.parse(raw) as Record<string, unknown>;
                dictContent = parsed.content;
              } catch {
                // Static dict not found – try dynamic per-locale
                try {
                  const dynamicDir = join(
                    dynamicDictionariesDir,
                    dictionaryKey
                  );
                  const localeFiles = await readdir(dynamicDir);
                  const firstFile = localeFiles.find((fileName) =>
                    fileName.endsWith('.json')
                  );
                  if (firstFile) {
                    const raw = await readFile(
                      join(dynamicDir, firstFile),
                      'utf-8'
                    );
                    const parsed = JSON.parse(raw) as Record<string, unknown>;
                    dictContent = parsed.content;
                  }
                } catch {
                  // Dictionary file not readable – skip rename for this key
                }
              }

              if (!dictContent) continue;

              const nestedRenameMap = buildNestedRenameMapFromContent(
                dictContent,
                fieldUsage
              );

              // An "opaque" field is one whose value is consumed as a whole
              // (e.g. passed as a prop to a child component) so we cannot
              // statically track which nested keys the downstream consumer
              // accesses.  If the opaque field has nested user-defined structure
              // (non-empty children in the rename map), renaming those sub-keys
              // would silently break the child → skip minification for the dict.
              //
              // Leaf fields (strings, ReactNode, etc.) have empty children and
              // are safe to rename even when used "opaquely", so they do NOT
              // trigger this guard.
              const opaqueFieldMap =
                pruneContext.dictionaryKeysWithOpaqueTopLevelFields.get(
                  dictionaryKey
                );
              if (opaqueFieldMap) {
                // Only fields whose value has nested user-defined structure are
                // dangerous — leaf fields (strings, functions, etc.) are safe.
                const dangerousEntries = [...opaqueFieldMap.entries()].filter(
                  ([fieldName]) =>
                    (nestedRenameMap.get(fieldName)?.children.size ?? 0) > 0
                );
                if (dangerousEntries.length > 0) {
                  logger(
                    [
                      `Dictionary`,
                      colorizeKey(dictionaryKey),
                      `cannot be minified.`,
                      ...dangerousEntries.flatMap(([fieldName, locations]) => [
                        `\n    Reason: field`,
                        colorize(`'${fieldName}'`, ANSIColors.BLUE),
                        `is passed opaquely to a child component: nested keys cannot be safely renamed.`,
                        ...locations.map(
                          (loc) => `\n      at ${formatPath(loc)}`
                        ),
                        `Fix: import useIntlayer directly in the component where it is used.`,
                      ]),
                    ],
                    { level: 'warn' }
                  );
                  continue; // skip rename map for this dictionary
                }
              }

              if (nestedRenameMap.size > 0) {
                pruneContext.dictionaryKeyToFieldRenameMap.set(
                  dictionaryKey,
                  nestedRenameMap
                );
              }
            }
          }
        },
      },

      //  Plugin: Babel transform
      {
        name: 'vite-intlayer-babel-transform',
        enforce: 'post', // Run after other transformations (e.g. Vue SFC)
        apply: (_config, env) => {
          const isBuildCommand = env.command === 'build';
          const isEnabled =
            (optimize === undefined && isBuildCommand) || optimize === true;

          if (!isBuildCommand) return false;
          if (!isEnabled) return false;

          runOnce(
            join(
              baseDir,
              '.intlayer',
              'cache',
              'intlayer-optimize-plugin-enabled.lock'
            ),
            () =>
              logger([
                `Build optimization ${colorize('enabled', ANSIColors.GREEN)}`,
                colorize('(import mode:', ANSIColors.GREY_DARK),
                colorize(importMode ?? IMPORT_MODE, ANSIColors.BLUE),
                colorize(')', ANSIColors.GREY_DARK),
              ]),
            { cacheTimeoutMs: 1000 * 10 }
          );

          return true;
        },

        transform: async (sourceCode, moduleId) => {
          // Strip query parameters added by Vue/Svelte loaders
          // e.g. "HelloWorld.vue?vue&type=script&setup=true&lang.ts" → "HelloWorld.vue"
          const sourceFilePath = moduleId.split('?', 1)[0];

          if (!SOURCE_FILE_REGEX.test(sourceFilePath)) return null;
          if (!transformableFilesList.includes(sourceFilePath)) return null;

          const isDictionaryEntryFile = [
            dictionariesEntryPath,
            unmergedDictionariesEntryPath,
          ].includes(sourceFilePath);

          const isUsingIntlayer = INTLAYER_USAGE_REGEX.test(sourceCode);

          if (!isUsingIntlayer && !isDictionaryEntryFile) return null;

          // ── Step 1: field rename (must run before intlayerOptimizeBabelPlugin
          // rewrites useIntlayer → useDictionary, erasing the dictionary key)
          //
          // For Vue/Svelte SFCs the `enforce:'post'` transform can receive
          // either:
          //   a) Raw SFC source (when no framework plugin is installed) –
          //      Babel cannot parse the full file; we extract each <script>
          //      block, rename within it, then inject the result back.
          //   b) Compiled JS emitted by @vitejs/plugin-vue / svelte-vite-plugin
          //      (the common case) – no <script> tags are present; treat the
          //      whole content as plain JS and rename it directly.
          let codeToOptimize = sourceCode;
          if (
            pruneContext &&
            pruneContext.dictionaryKeyToFieldRenameMap.size > 0 &&
            isUsingIntlayer
          ) {
            const scriptBlocks = extractScriptBlocks(
              sourceFilePath,
              sourceCode
            );

            const isSFC =
              scriptBlocks.length > 0 &&
              (scriptBlocks[0].contentStartOffset > 0 ||
                scriptBlocks.length > 1);

            if (isSFC) {
              // Raw SFC: rename each script block individually and inject back.
              const modifications: Array<{
                block: ScriptBlock;
                modifiedContent: string;
              }> = [];

              for (const block of scriptBlocks) {
                if (!INTLAYER_USAGE_REGEX.test(block.content)) continue;
                try {
                  const renameResult = await transformAsync(block.content, {
                    filename: sourceFilePath,
                    plugins: [makeFieldRenameBabelPlugin(pruneContext)],
                    parserOpts: BABEL_PARSER_OPTIONS,
                    ast: false,
                  });
                  if (
                    renameResult?.code &&
                    renameResult.code !== block.content
                  ) {
                    modifications.push({
                      block,
                      modifiedContent: renameResult.code,
                    });
                  }
                } catch {
                  // If Babel fails on a block, skip renaming for that block
                }
              }

              if (modifications.length > 0) {
                codeToOptimize = injectScriptBlocks(sourceCode, modifications);
              }
            } else {
              // Compiled JS (no SFC blocks) or plain JS/TS file: rename whole.
              try {
                const renameResult = await transformAsync(sourceCode, {
                  filename: sourceFilePath,
                  plugins: [makeFieldRenameBabelPlugin(pruneContext)],
                  parserOpts: BABEL_PARSER_OPTIONS,
                  ast: false,
                });
                if (renameResult?.code) {
                  codeToOptimize = renameResult.code;
                }
              } catch {
                // If rename fails, proceed with original code
              }
            }
          }

          //  Step 2: intlayer optimization (useIntlayer → useDictionary)
          const transformResult = await transformAsync(codeToOptimize, {
            filename: sourceFilePath,
            plugins: [
              [
                intlayerOptimizeBabelPlugin,
                {
                  optimize,
                  dictionariesDir,
                  dictionariesEntryPath,
                  unmergedDictionariesEntryPath,
                  unmergedDictionariesDir,
                  dynamicDictionariesDir,
                  dynamicDictionariesEntryPath,
                  fetchDictionariesDir,
                  importMode,
                  filesList: transformableFilesList,
                  replaceDictionaryEntry: true,
                  dictionaryModeMap: dictionaryKeyToImportModeMap,
                },
              ],
            ],
            parserOpts: BABEL_PARSER_OPTIONS,
          });

          if (transformResult?.code) {
            return {
              code: transformResult.code,
              map: transformResult.map,
            };
          }

          return null;
        },
      },
    ];
  } catch (pluginInitError) {
    console.warn(
      '[vite-intlayer] Failed to initialise optimization plugin:',
      pluginInitError
    );
    return [];
  }
};
