import type { NodePath, PluginObject } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import {
  INTLAYER_CALLER_NAMES,
  type IntlayerCallerName,
  type NestedRenameEntry,
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

/** Alphabet used to derive short field aliases (`a`, `b`, …, `aa`, `ab`, …). */
const SHORT_NAME_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Converts a zero-based index to a short alphabetic identifier.
 *   0 → 'a', 1 → 'b', …, 25 → 'z', 26 → 'aa', 27 → 'ab', …
 */
export const generateShortFieldName = (index: number): string => {
  if (!Number.isInteger(index) || index < 0) {
    throw new RangeError(
      `generateShortFieldName expects a non-negative integer index, received: ${index}`
    );
  }

  const remainder = index % SHORT_NAME_ALPHABET.length;
  const quotient = Math.floor(index / SHORT_NAME_ALPHABET.length);

  return quotient === 0 && SHORT_NAME_ALPHABET[remainder]
    ? SHORT_NAME_ALPHABET[remainder]
    : generateShortFieldName(quotient - 1) + SHORT_NAME_ALPHABET[remainder];
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
      record.nodeType === 'translation' &&
      record.translation &&
      typeof record.translation === 'object' &&
      !Array.isArray(record.translation)
    ) {
      const firstLocaleValue = Object.values(
        record.translation as Record<string, unknown>
      )[0];
      return buildNestedRenameMapFromContent(firstLocaleValue);
    }

    // All other intlayer nodes (enumeration, pluralization, conditions, …)
    // resolve to a single value at runtime through a call the source-code
    // rename walk cannot traverse (e.g. `content.myEnum(count)`), and the
    // JSON renamers only descend into translation nodes. Treat them as
    // leaves so the source and JSON sides always stay consistent.
    return new Map();
  }

  // Exclude React elements from being treated as user-defined records.
  // JSX elements in the compiled JSON have a $$typeof property (usually Symbol(react.element)).
  if (
    record.$$typeof ||
    (record.type && record.props && Object.hasOwn(record, 'ref'))
  ) {
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

    if (!key) continue;

    const children = buildNestedRenameMapFromContent(record[key]);

    renameMap.set(key, { shortName: generateShortFieldName(i), children });
  }

  return renameMap;
};

/**
 * Walks `fieldPath` through a {@link NestedRenameMap} and returns the entry at
 * the final path segment, or `undefined` when any segment is missing (e.g. the
 * path crosses an array or leaf value whose children are not mapped).
 *
 * Used to locate the rename entry of an opaquely-consumed content value so its
 * children map can be cleared before the JSON rename is applied.
 *
 * @param renameMap - The root rename map to walk.
 * @param fieldPath - Original (pre-rename) field names from the content root.
 */
export const getNestedRenameEntryAtPath = (
  renameMap: NestedRenameMap,
  fieldPath: readonly string[]
): NestedRenameEntry | undefined => {
  let currentRenameMap = renameMap;
  let renameEntry: NestedRenameEntry | undefined;

  for (const fieldName of fieldPath) {
    renameEntry = currentRenameMap.get(fieldName);
    if (!renameEntry) return undefined;
    currentRenameMap = renameEntry.children;
  }

  return renameEntry;
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
): {
  finalPath: NodePath<BabelTypes.Node>;
  finalRenameMap: NestedRenameMap;
} => {
  let refPath: NodePath<BabelTypes.Node> = startPath;
  let renameMap = currentRenameMap;

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

  return { finalPath: refPath, finalRenameMap: renameMap };
};

/**
 * Renames the properties of a destructuring `ObjectPattern` using `renameMap`,
 * recursing into nested patterns and following the references of bound local
 * variables.
 *
 * Handled property shapes:
 *
 *   { fieldA }              → { shortA: fieldA }
 *   { fieldA: localVar }    → { shortA: localVar }
 *   { fieldA = fallback }   → { shortA: fieldA = fallback }
 *   { fieldA: { nested } }  → { shortA: { shortN: nested } }
 *   { ['fieldA']: x }       → { ['shortA']: x }
 *   { [dynamicKey]: x }     → left untouched (dynamic key – not renamable)
 *
 * @param babelTypes - Babel types helper.
 * @param objectPattern - The destructuring pattern to rename.
 * @param scopePath - A path whose scope resolves the pattern's bindings.
 * @param renameMap - Rename table for the current nesting level.
 */
const renameObjectPatternProperties = (
  babelTypes: typeof BabelTypes,
  objectPattern: BabelTypes.ObjectPattern,
  scopePath: NodePath<BabelTypes.Node>,
  renameMap: NestedRenameMap
): void => {
  for (const property of objectPattern.properties) {
    if (!babelTypes.isObjectProperty(property)) continue;

    // Computed keys: a static string key ({ ['title']: x }) is renamable in
    // place; any other computed key is dynamic and must be left untouched —
    // replacing it with an identifier would create a variable reference.
    if (property.computed && !babelTypes.isStringLiteral(property.key)) {
      continue;
    }

    const keyName = babelTypes.isIdentifier(property.key)
      ? property.key.name
      : babelTypes.isStringLiteral(property.key)
        ? property.key.value
        : null;
    if (!keyName) continue;

    const renameEntry = renameMap.get(keyName);
    if (!renameEntry) continue;

    if (property.computed) {
      // { ['fieldA']: x } → { ['shortA']: x }
      (property.key as BabelTypes.StringLiteral).value = renameEntry.shortName;
    } else {
      // { fieldA } → { shortA: fieldA }
      // { fieldA: localVar } → { shortA: localVar }
      if (property.shorthand) {
        property.shorthand = false;
      }
      property.key = babelTypes.identifier(renameEntry.shortName);
    }

    if (renameEntry.children.size === 0) continue;

    // A default value ({ fieldA = fallback }) wraps the actual binding target.
    const bindingTarget = babelTypes.isAssignmentPattern(property.value)
      ? property.value.left
      : property.value;

    // Nested pattern:  const { fieldA: { nested } } = …  — rename its keys
    // with this entry's children map.
    if (babelTypes.isObjectPattern(bindingTarget)) {
      renameObjectPatternProperties(
        babelTypes,
        bindingTarget,
        scopePath,
        renameEntry.children
      );
      continue;
    }

    // Identifier binding: recursively walk references to the local variable.
    if (babelTypes.isIdentifier(bindingTarget)) {
      const localVarBinding = scopePath.scope.getBinding(bindingTarget.name);
      if (!localVarBinding) continue;

      for (const nestedRefPath of localVarBinding.referencePaths) {
        const { finalPath, finalRenameMap } = walkRenameChain(
          babelTypes,
          nestedRefPath,
          renameEntry.children
        );
        walkObjectDestructuring(babelTypes, finalPath, finalRenameMap);
      }
    }
  }
};

/**
 * Walks an object-destructuring assignment whose right-hand side is `refPath`,
 * renaming each destructured key that is found in `renameMap`.
 *
 * Handles the "secondary destructuring" pattern that `walkRenameChain` cannot
 * reach because the reference is not a MemberExpression:
 *
 *   const { webhooksSection } = useIntlayer('build-settings');
 *   const { modal, validationErrors } = webhooksSection;
 *     → const { a: modal, b: validationErrors } = webhooksSection;
 *
 * After renaming each key, {@link renameObjectPatternProperties} recursively
 * walks references to the newly-bound local variables, calling both
 * `walkRenameChain` (for subsequent member-access chains like
 * `validationErrors.invalidUrl`) and this function again (for further levels
 * of secondary destructuring).
 */
const walkObjectDestructuring = (
  babelTypes: typeof BabelTypes,
  refPath: NodePath<BabelTypes.Node>,
  renameMap: NestedRenameMap
): void => {
  if (renameMap.size === 0) return;

  const parentNode = refPath.parent;

  // Only handle:  const { a, b } = refVar
  if (
    !babelTypes.isVariableDeclarator(parentNode) ||
    !babelTypes.isObjectPattern(parentNode.id) ||
    parentNode.init !== refPath.node
  ) {
    return;
  }

  renameObjectPatternProperties(babelTypes, parentNode.id, refPath, renameMap);
};

/**
 * Collects the local aliases under which `useIntlayer` / `getIntlayer` are
 * imported in the given program (e.g. `import { useIntlayer as useI } …`
 * yields `useI` → `useIntlayer`).
 *
 * Import declarations can only appear at the top level of a module, so the
 * program body is scanned directly instead of traversing the whole AST.
 */
const collectIntlayerCallerLocalNames = (
  babelTypes: typeof BabelTypes,
  programNode: BabelTypes.Program
): Map<string, string> => {
  const intlayerCallerLocalNameMap = new Map<string, string>();

  for (const statement of programNode.body) {
    if (!babelTypes.isImportDeclaration(statement)) continue;

    for (const importSpecifier of statement.specifiers) {
      if (!babelTypes.isImportSpecifier(importSpecifier)) continue;

      const importedName = babelTypes.isIdentifier(importSpecifier.imported)
        ? importSpecifier.imported.name
        : importSpecifier.imported.value;

      if (INTLAYER_CALLER_NAMES.includes(importedName as IntlayerCallerName)) {
        intlayerCallerLocalNameMap.set(
          importSpecifier.local.name,
          importedName
        );
      }
    }
  }

  return intlayerCallerLocalNameMap;
};

/**
 * Rewrites dictionary content field accesses in the given program to the
 * short aliases defined in `pruneContext.dictionaryKeyToFieldRenameMap`.
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
 *   const { fieldA } = useIntlayer('key');
 *   const { nested } = fieldA;          // secondary destructuring
 *     → const { shortA: fieldA } = useIntlayer('key');
 *       const { shortN: nested } = fieldA;
 *
 * Exposed as a standalone function so that both
 * {@link makeFieldRenameBabelPlugin} and `intlayerMinifyBabelPlugin` can
 * invoke it from their own `Program.exit` visitors.
 */
export const renameIntlayerFieldAccesses = (
  babelTypes: typeof BabelTypes,
  programPath: NodePath<BabelTypes.Program>,
  pruneContext: PruneContext
): void => {
  if (pruneContext.dictionaryKeyToFieldRenameMap.size === 0) return;

  const intlayerCallerLocalNameMap = collectIntlayerCallerLocalNames(
    babelTypes,
    programPath.node
  );
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

      if (!localCallerName || !intlayerCallerLocalNameMap.has(localCallerName))
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
        firstArgument.quasis.length === 1 &&
        firstArgument.quasis[0]
      ) {
        dictionaryKey =
          firstArgument.quasis[0].value.cooked ??
          firstArgument.quasis[0].value.raw;
      }

      if (!dictionaryKey) return;

      // Dictionaries flagged as structural edge cases are left completely
      // untouched by the JSON pipeline — keep their source accesses untouched
      // too so both sides stay consistent.
      if (pruneContext.dictionariesWithEdgeCases.has(dictionaryKey)) return;

      const fieldRenameMap =
        pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
      if (!fieldRenameMap || fieldRenameMap.size === 0) return;

      const parentNode = callExpressionPath.parent;

      // ── Case 1: const { fieldA, fieldB } = useIntlayer('key') ────────
      if (
        babelTypes.isVariableDeclarator(parentNode) &&
        babelTypes.isObjectPattern(parentNode.id)
      ) {
        walkObjectDestructuring(babelTypes, callExpressionPath, fieldRenameMap);
        return;
      }

      // ── Case 2: useIntlayer('key').fieldA.nested ─────────────────────
      if (
        (babelTypes.isMemberExpression(parentNode) ||
          babelTypes.isOptionalMemberExpression(parentNode)) &&
        (parentNode as BabelTypes.MemberExpression).object ===
          callExpressionPath.node
      ) {
        const { finalPath, finalRenameMap } = walkRenameChain(
          babelTypes,
          callExpressionPath,
          fieldRenameMap
        );
        walkObjectDestructuring(babelTypes, finalPath, finalRenameMap);
        return;
      }

      // ── Case 3: const result = useIntlayer('key'); result.fieldA ─────
      if (
        babelTypes.isVariableDeclarator(parentNode) &&
        babelTypes.isIdentifier(parentNode.id)
      ) {
        const variableBinding = callExpressionPath.scope.getBinding(
          parentNode.id.name
        );
        if (!variableBinding) return;

        for (const variableReferencePath of variableBinding.referencePaths) {
          // Direct access: result.fieldA or const { fieldA } = result
          const { finalPath, finalRenameMap } = walkRenameChain(
            babelTypes,
            variableReferencePath,
            fieldRenameMap
          );
          walkObjectDestructuring(babelTypes, finalPath, finalRenameMap);

          // Signal accessor: result().fieldA or const { fieldA } = result()
          // walkRenameChain stops at a CallExpression parent, so we need to
          // start a new walk from the call-expression node itself.
          const refParent = variableReferencePath.parent;
          if (
            (babelTypes.isCallExpression(refParent) ||
              babelTypes.isOptionalCallExpression(refParent)) &&
            (refParent as BabelTypes.CallExpression).callee ===
              variableReferencePath.node
          ) {
            const callPath = variableReferencePath.parentPath;
            if (callPath) {
              const {
                finalPath: signalFinalPath,
                finalRenameMap: signalFinalRenameMap,
              } = walkRenameChain(babelTypes, callPath, fieldRenameMap);
              walkObjectDestructuring(
                babelTypes,
                signalFinalPath,
                signalFinalRenameMap
              );
            }
          }
        }
      }
    },
  });
};

/**
 * Creates a Babel plugin that rewrites dictionary content field accesses in
 * source files to their short aliases via
 * {@link renameIntlayerFieldAccesses}.
 *
 * This plugin must run in a separate `transformAsync` pass **before**
 * `intlayerOptimizeBabelPlugin`, because the latter replaces `useIntlayer`
 * with `useDictionary`, erasing the dictionary-key information needed here.
 */
export const makeFieldRenameBabelPlugin =
  (pruneContext: PruneContext) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObject => ({
    name: 'intlayer-field-rename',
    visitor: {
      Program: {
        exit: (programPath) => {
          renameIntlayerFieldAccesses(babelTypes, programPath, pruneContext);
        },
      },
    },
  });
