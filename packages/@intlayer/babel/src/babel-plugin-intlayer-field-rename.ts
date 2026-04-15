import type { NodePath, PluginObj } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import {
  INTLAYER_CALLER_NAMES,
  type IntlayerCallerName,
  type NestedRenameMap,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';

// ── Field-name helpers ────────────────────────────────────────────────────────

/**
 * Intlayer internal property names that must never be used as short-name
 * targets. These appear inside content-node values (e.g. `{ nodeType:
 * "translation", … }`) and are read by the intlayer runtime.
 */
const RESERVED_CONTENT_FIELD_NAMES = new Set(['nodeType']);

/**
 * Converts a zero-based index to a short alphabetic identifier.
 *   0 → 'a', 1 → 'b', …, 25 → 'z', 26 → 'aa', 27 → 'ab', …
 */
export const generateShortFieldName = (index: number): string => {
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
 *  - If the value has `nodeType: 'translation'`, user-defined fields live
 *    inside `translation[locale]`. Recurse into the first locale's value.
 *  - All other intlayer runtime nodes (enumeration, condition, gender, …) are
 *    treated as leaves — their internal keys must never be renamed.
 *  - Arrays produce an empty children map.  Array elements are not traversed
 *    because consumers may access them via `.map()` / `.filter()` callbacks,
 *    which the source-code rename walk cannot enter.  Renaming element fields
 *    in the JSON without the matching source-code rename would produce
 *    mismatched key names and runtime crashes.
 *    The `[0]` pass-through in `walkRenameChain` is preserved so that direct
 *    indexed access (`field[0].sub`) silently terminates at the empty children
 *    map without breaking anything.
 *  - Plain objects are user-defined records: ALL non-reserved keys are renamed
 *    with short alphabetic aliases (a, b, c, …) and each value is recursed into.
 *  - Primitives produce an empty map (no further renaming).
 *
 * The rename map is built from ALL user-defined fields (not just consumed ones).
 * Both the JSON rename and the source-code rename use the same map, so the
 * short names are always consistent regardless of which fields are pruned.
 *
 * @param contentValue - The dictionary content value to analyse.
 */
export const buildNestedRenameMapFromContent = (
  contentValue: unknown
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
      return buildNestedRenameMapFromContent(firstLocaleValue);
    }
    // All other intlayer nodes have runtime-managed internal structure — return
    // an empty map so they are treated as leaves.
    return new Map();
  }

  // User-defined record: rename ALL non-reserved keys with stable alphabetic
  // aliases sorted alphabetically so the mapping is deterministic.
  const sortedKeys = Object.keys(record)
    .filter((key) => !RESERVED_CONTENT_FIELD_NAMES.has(key))
    .sort();

  const renameMap: NestedRenameMap = new Map();

  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    const children = buildNestedRenameMapFromContent(record[key]);
    renameMap.set(key, { shortName: generateShortFieldName(i), children });
  }

  return renameMap;
};

// ── Field-rename Babel plugin ─────────────────────────────────────────────────

/**
 * Walks a MemberExpression chain starting from `startPath`, renaming each
 * property found in `currentRenameMap` at the corresponding nesting level.
 *
 * Numeric computed accesses (array indices such as `[0]`, `[1]`) are treated
 * as transparent pass-throughs: the rename map is kept unchanged and the walk
 * continues past the index.  This means `content.field[0].sub` is handled
 * correctly — `field` and `sub` are both renamed while `[0]` is left intact.
 */
const walkRenameChain = (
  babelTypes: typeof BabelTypes,
  startPath: NodePath<BabelTypes.Node>,
  currentRenameMap: NestedRenameMap
): void => {
  let refPath: NodePath<BabelTypes.Node> = startPath;
  let renameMap = currentRenameMap;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const parentPath = refPath.parentPath;
    if (!parentPath) break;

    const parentNode = parentPath.node;

    if (
      (!babelTypes.isMemberExpression(parentNode) &&
        !babelTypes.isOptionalMemberExpression(parentNode)) ||
      (parentNode as BabelTypes.MemberExpression).object !== refPath.node
    ) {
      break;
    }

    const memberNode = parentNode as BabelTypes.MemberExpression;

    // Numeric index access ([0], [1], …): advance past the array accessor
    // without touching the rename map.  The next iteration will attempt to
    // rename the property that follows the index.
    if (
      memberNode.computed &&
      babelTypes.isNumericLiteral(memberNode.property)
    ) {
      refPath = parentPath;
      continue;
    }

    // Nothing left to rename at this level — stop.
    if (renameMap.size === 0) break;

    let fieldName: string | undefined;

    if (!memberNode.computed && babelTypes.isIdentifier(memberNode.property)) {
      fieldName = memberNode.property.name;
    } else if (
      memberNode.computed &&
      babelTypes.isStringLiteral(memberNode.property)
    ) {
      fieldName = memberNode.property.value;
    } else {
      break; // dynamic computed key – stop
    }

    const renameEntry = renameMap.get(fieldName);
    if (!renameEntry) break; // not in map – stop

    // Apply the rename
    if (!memberNode.computed && babelTypes.isIdentifier(memberNode.property)) {
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
 * This plugin must run in a separate `transformAsync` pass **before**
 * `intlayerOptimizeBabelPlugin`, because the latter replaces `useIntlayer`
 * with `useDictionary`, erasing the dictionary-key information needed here.
 */
export const makeFieldRenameBabelPlugin =
  (pruneContext: PruneContext) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObj => ({
    name: 'intlayer-field-rename',
    visitor: {
      Program: {
        exit: (programPath) => {
          if (pruneContext.dictionaryKeyToFieldRenameMap.size === 0) return;

          // Collect local aliases for useIntlayer / getIntlayer
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

          // Visit all useIntlayer / getIntlayer call-sites and rename field accesses
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

              if (!dictionaryKey) return;

              const fieldRenameMap =
                pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
              if (!fieldRenameMap || fieldRenameMap.size === 0) return;

              const parentNode = callExpressionPath.parent;

              // ── Case 1: const { fieldA, fieldB } = useIntlayer('key') ────────
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

                  // { fieldA } → { shortA: fieldA }
                  // { fieldA: localVar } → { shortA: localVar }
                  if (property.shorthand) {
                    property.shorthand = false;
                    property.key = babelTypes.identifier(renameEntry.shortName);
                  } else {
                    property.key = babelTypes.identifier(renameEntry.shortName);
                  }

                  // Walk nested member accesses on the local variable
                  if (
                    renameEntry.children.size > 0 &&
                    babelTypes.isIdentifier(property.value)
                  ) {
                    const localVarBinding = callExpressionPath.scope.getBinding(
                      (property.value as BabelTypes.Identifier).name
                    );
                    if (localVarBinding) {
                      for (const refPath of localVarBinding.referencePaths) {
                        walkRenameChain(
                          babelTypes,
                          refPath,
                          renameEntry.children
                        );
                      }
                    }
                  }
                }
                return;
              }

              // ── Case 2: useIntlayer('key').fieldA.nested ─────────────────────
              if (
                (babelTypes.isMemberExpression(parentNode) ||
                  babelTypes.isOptionalMemberExpression(parentNode)) &&
                (parentNode as BabelTypes.MemberExpression).object ===
                  callExpressionPath.node
              ) {
                walkRenameChain(babelTypes, callExpressionPath, fieldRenameMap);
                return;
              }

              // ── Case 3: const result = useIntlayer('key'); result.fieldA ─────
              if (
                babelTypes.isVariableDeclarator(parentNode) &&
                babelTypes.isIdentifier(parentNode.id)
              ) {
                const variableName = parentNode.id.name;
                const variableBinding =
                  callExpressionPath.scope.getBinding(variableName);
                if (!variableBinding) return;

                for (const variableReferencePath of variableBinding.referencePaths) {
                  walkRenameChain(
                    babelTypes,
                    variableReferencePath,
                    fieldRenameMap
                  );
                }
              }
            },
          });
        },
      },
    },
  });
