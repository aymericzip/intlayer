import type { NodePath } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import { CHAINABLE_RUNTIME_METHOD_NAMES } from './nativeCallers';
import {
  type OpaqueFieldOccurrence,
  type PruneContext,
  recordFieldUsage,
} from './pruneContext';
import {
  isTestOnlyUse,
  resolveContentRoot,
  skipTransparentWrappers,
} from './staticAstReaders';

/**
 * Analyses how the result of a single `useIntlayer('key')` / `getIntlayer('key')`
 * call expression is consumed, then records the field usage into `pruneContext`.
 *
 * Recognised patterns:
 *   const { fieldA, fieldB } = useIntlayer('key')  → records {fieldA, fieldB}
 *   useIntlayer('key').fieldA                       → records {fieldA}
 *   useIntlayer('key')['fieldA']                    → records {fieldA}
 *   const { ...rest } = useIntlayer('key')          → records 'all' (spread)
 *   const result = useIntlayer('key')               → records the fields read on `result`
 *   const [a, { b }] = await Promise.all([getIntlayerAsync('x'), …])
 *                                                   → each element tracked like a declarator
 *
 * TypeScript casts (`as`, `satisfies`, `!`) are looked through, and test-only
 * uses (`!field`, `field && …`) expose no key names.
 */
export const analyzeCallExpressionUsage = (
  babelTypes: typeof BabelTypes,
  pruneContext: PruneContext,
  callExpressionPath: NodePath<BabelTypes.CallExpression>,
  dictionaryKey: string,
  currentSourceFilePath: string,
  isSfcFile: boolean
): void => {
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

  /** Record that the content value at `fieldPath` is consumed opaquely. */
  const markOpaqueField = (
    fieldPath: string[],
    line: number | undefined
  ): void => {
    const pathToOccurrence =
      pruneContext.dictionaryKeysWithOpaqueFields.get(dictionaryKey) ??
      new Map<string, OpaqueFieldOccurrence>();
    const location =
      line !== undefined
        ? `${currentSourceFilePath}:${line}`
        : currentSourceFilePath;
    const joinedFieldPath = fieldPath.join('.');
    const occurrence = pathToOccurrence.get(joinedFieldPath) ?? {
      fieldPath: [...fieldPath],
      locations: [],
    };
    if (!occurrence.locations.includes(location)) {
      occurrence.locations.push(location);
    }
    pathToOccurrence.set(joinedFieldPath, occurrence);
    pruneContext.dictionaryKeysWithOpaqueFields.set(
      dictionaryKey,
      pathToOccurrence
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
   * Analyses how the content value at `fieldPath` (currently referenced by
   * `refPath`) is consumed, to detect opaque consumption (passing a dictionary
   * value as-is to a prop or function argument).
   *
   * Member-access chains and destructuring are followed recursively with an
   * extended field path, so the *terminal* consumption of a chain like
   * `content.sections.hero` decides opacity — mirroring how far the
   * source-code renamer can rewrite accesses. When the terminal consumption
   * escapes static tracking, the deepest reached field path is marked opaque
   * so the children of that value keep their original key names.
   */
  const analyzeOpaqueUsage = (
    referencePath: NodePath<BabelTypes.Node>,
    fieldPath: string[]
  ): void => {
    const refPath = skipTransparentWrappers(babelTypes, referencePath);

    // `!field`, `field && …`: only tested, no key name escapes.
    if (isTestOnlyUse(babelTypes, refPath)) return;

    const parentNode = refPath.parent;
    const parentPath = refPath.parentPath;

    // 1. Chained member access (e.g. field.sub or field?.sub): follow the
    //    chain with an extended path and analyse the terminal consumption.
    if (
      parentPath &&
      (babelTypes.isMemberExpression(parentNode) ||
        babelTypes.isOptionalMemberExpression(parentNode)) &&
      (parentNode as BabelTypes.MemberExpression).object === refPath.node
    ) {
      const memberNode = parentNode as BabelTypes.MemberExpression;

      // Numeric index access ([0], [1], …) is transparent: the JSON renamers
      // apply the same rename map to every array element.
      if (
        memberNode.computed &&
        babelTypes.isNumericLiteral(memberNode.property)
      ) {
        analyzeOpaqueUsage(parentPath, fieldPath);
        return;
      }

      if (
        !memberNode.computed &&
        babelTypes.isIdentifier(memberNode.property)
      ) {
        analyzeOpaqueUsage(parentPath, [
          ...fieldPath,
          memberNode.property.name,
        ]);
        return;
      }

      if (
        memberNode.computed &&
        babelTypes.isStringLiteral(memberNode.property)
      ) {
        analyzeOpaqueUsage(parentPath, [
          ...fieldPath,
          memberNode.property.value,
        ]);
        return;
      }

      // Dynamic computed access (field[expr]): the renamer cannot rewrite the
      // key, so the children of the current path must keep their names.
      markOpaqueField(fieldPath, refPath.node.loc?.start.line);
      return;
    }

    // 2. Destructuring (e.g. const { sub } = field): follow each binding.
    if (
      babelTypes.isVariableDeclarator(parentNode) &&
      babelTypes.isObjectPattern(parentNode.id) &&
      parentNode.init === refPath.node
    ) {
      analyzeOpaqueDestructuring(parentNode.id, refPath, fieldPath);
      return;
    }

    // 3. Alias (e.g. const table = content.summary.table): follow the alias.
    //    A reassigned alias may hold anything, and an SFC template can read
    //    the alias out of Babel's sight, so both stay opaque.
    if (
      babelTypes.isVariableDeclarator(parentNode) &&
      babelTypes.isIdentifier(parentNode.id) &&
      parentNode.init === refPath.node
    ) {
      const aliasBinding = refPath.scope.getBinding(parentNode.id.name);
      if (isSfcFile || !aliasBinding?.constant) {
        markOpaqueField(fieldPath, refPath.node.loc?.start.line);
        return;
      }
      for (const aliasReferencePath of aliasBinding.referencePaths) {
        analyzeOpaqueUsage(aliasReferencePath, fieldPath);
      }
      return;
    }

    // 4. Ignored patterns (e.g. array literals [content])
    if (babelTypes.isArrayExpression(parentNode)) {
      return;
    }

    // 5. Opaque consumption (passed to prop, function, etc.)
    markOpaqueField(fieldPath, refPath.node.loc?.start.line);
  };

  /**
   * Analyses a destructuring pattern applied to the content value at
   * `fieldPath`, recursively following each bound local variable's references
   * via {@link analyzeOpaqueUsage}.
   *
   * Patterns the source-code renamer cannot rewrite (rest elements, dynamic
   * computed keys, array patterns) mark the corresponding path opaque.
   */
  const analyzeOpaqueDestructuring = (
    objectPattern: BabelTypes.ObjectPattern,
    scopePath: NodePath<BabelTypes.Node>,
    fieldPath: string[]
  ): void => {
    for (const property of objectPattern.properties) {
      // A rest element re-exposes the remaining fields under their original
      // names — nothing at this level may be renamed.
      if (babelTypes.isRestElement(property)) {
        markOpaqueField(fieldPath, property.loc?.start.line);
        continue;
      }
      if (!babelTypes.isObjectProperty(property)) continue;

      // Dynamic computed keys ({ [expr]: x }) cannot be renamed.
      if (property.computed && !babelTypes.isStringLiteral(property.key)) {
        markOpaqueField(fieldPath, property.loc?.start.line);
        continue;
      }

      const keyName = babelTypes.isIdentifier(property.key)
        ? property.key.name
        : babelTypes.isStringLiteral(property.key)
          ? property.key.value
          : null;
      if (!keyName) continue;

      const childFieldPath = [...fieldPath, keyName];

      // A default value ({ field = fallback }) wraps the binding target.
      const bindingTarget = babelTypes.isAssignmentPattern(property.value)
        ? property.value.left
        : property.value;

      if (babelTypes.isObjectPattern(bindingTarget)) {
        analyzeOpaqueDestructuring(bindingTarget, scopePath, childFieldPath);
        continue;
      }

      if (babelTypes.isIdentifier(bindingTarget)) {
        const localVarBinding = scopePath.scope.getBinding(bindingTarget.name);
        if (!localVarBinding) continue;
        for (const referencePath of localVarBinding.referencePaths) {
          analyzeOpaqueUsage(referencePath, childFieldPath);
        }
        continue;
      }

      // Array patterns and other targets escape the rename walk.
      markOpaqueField(childFieldPath, property.loc?.start.line);
    }
  };

  /**
   * Helper to collect field names from an ObjectPattern (destructuring).
   * Returns true if successful, false when the accessed fields cannot be
   * determined statically (rest element or dynamic computed key → 'all').
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
      if (!babelTypes.isObjectProperty(property)) continue;

      // Dynamic computed keys ({ [expr]: x }) cannot be attributed to a
      // specific field — the whole dictionary must be kept.
      if (property.computed && !babelTypes.isStringLiteral(property.key)) {
        return false;
      }

      let fieldName: string | undefined;

      if (!property.computed && babelTypes.isIdentifier(property.key)) {
        fieldName = property.key.name;
      } else if (babelTypes.isStringLiteral(property.key)) {
        fieldName = property.key.value;
      }

      if (!fieldName) continue;

      targetSet.add(fieldName);

      // A default value ({ field = fallback }) wraps the binding target.
      const bindingTarget = babelTypes.isAssignmentPattern(property.value)
        ? property.value.left
        : property.value;

      if (babelTypes.isIdentifier(bindingTarget)) {
        const variableBinding = initPath.scope.getBinding(bindingTarget.name);
        if (variableBinding) {
          for (const refPath of variableBinding.referencePaths) {
            analyzeOpaqueUsage(refPath, [fieldName]);
          }
        }
      } else if (babelTypes.isObjectPattern(bindingTarget)) {
        // Nested pattern: const { fieldA: { nested } } = … — follow each
        // nested binding so deeper opaque consumption is detected.
        analyzeOpaqueDestructuring(bindingTarget, initPath, [fieldName]);
      } else {
        // Array patterns and other targets escape the rename walk.
        markOpaqueField([fieldName], property.loc?.start.line);
      }
    }
    return true;
  };

  /**
   * Returns the call path when `memberExprPath` is a chainable runtime helper
   * being invoked (`content.onChange(cb)`), otherwise `undefined`.
   *
   * See {@link CHAINABLE_RUNTIME_METHOD_NAMES}: a bare `content.onChange`
   * reference that is never called is treated as an ordinary field access, so
   * only the invoked form is looked through.
   */
  const getChainedRuntimeCallPath = (
    memberExprPath: NodePath<BabelTypes.Node> | null | undefined,
    fieldName: string
  ): NodePath<BabelTypes.Node> | undefined => {
    if (!CHAINABLE_RUNTIME_METHOD_NAMES.has(fieldName)) return undefined;
    if (!memberExprPath) return undefined;

    const callPath = memberExprPath.parentPath;
    if (!callPath) return undefined;
    if (!callPath.isCallExpression() && !callPath.isOptionalCallExpression()) {
      return undefined;
    }
    if (
      (callPath.node as BabelTypes.CallExpression).callee !==
      memberExprPath.node
    ) {
      return undefined;
    }

    return callPath;
  };

  /**
   * Analyses the callbacks handed to a chainable runtime helper.
   *
   * The callback receives the freshly-resolved content root, so its parameter
   * is walked exactly like `const content = useIntlayer('key')` — either as a
   * plain binding or as a destructuring pattern.
   */
  const analyzeChainedCallbackArguments = (
    callPath: NodePath<BabelTypes.Node>
  ): void => {
    const argumentPaths = callPath.get(
      'arguments'
    ) as NodePath<BabelTypes.Node>[];

    for (const argumentPath of argumentPaths) {
      if (
        !argumentPath.isArrowFunctionExpression() &&
        !argumentPath.isFunctionExpression()
      ) {
        continue; // not a callback (e.g. an options object) – nothing to read
      }

      const [firstParameterPath] = argumentPath.get(
        'params'
      ) as NodePath<BabelTypes.Node>[];
      if (!firstParameterPath) continue; // callback ignores the content

      // (content) => … — walk the parameter's references.
      if (firstParameterPath.isIdentifier()) {
        const parameterBinding = argumentPath.scope.getBinding(
          firstParameterPath.node.name
        );
        if (!parameterBinding) {
          markUntrackedBinding();
          continue;
        }

        const accessedFieldNames = new Set<string>();
        if (
          analyzeContentBindingReferences(parameterBinding, accessedFieldNames)
        ) {
          markUntrackedBinding();
        } else {
          recordFieldUsage(pruneContext, dictionaryKey, accessedFieldNames);
        }
        continue;
      }

      // ({ title }) => … — destructured directly in the parameter list.
      if (firstParameterPath.isObjectPattern()) {
        const accessedFieldNames = new Set<string>();
        if (
          collectFieldsFromObjectPattern(
            firstParameterPath.node,
            argumentPath,
            accessedFieldNames
          )
        ) {
          recordFieldUsage(pruneContext, dictionaryKey, accessedFieldNames);
        } else {
          recordFieldUsage(pruneContext, dictionaryKey, 'all');
        }
        continue;
      }

      markUntrackedBinding();
    }
  };

  /**
   * Walks every reference of a local binding holding the content root,
   * collecting the top-level fields it reads into `accessedTopLevelFieldNames`.
   *
   * @returns `true` when a reference escaped static tracking, meaning the whole
   *   dictionary must be kept.
   */
  const analyzeContentBindingReferences = (
    variableBinding: { referencePaths: NodePath<BabelTypes.Node>[] },
    accessedTopLevelFieldNames: Set<string>
  ): boolean => {
    for (const bindingReferencePath of variableBinding.referencePaths) {
      const variableReferencePath = skipTransparentWrappers(
        babelTypes,
        bindingReferencePath
      );

      // `if (!content)`: only tested, no key name escapes.
      if (isTestOnlyUse(babelTypes, variableReferencePath)) continue;

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
          const memberExprPath = variableReferencePath.parentPath;

          // content.onChange(cb) — a runtime subscription, not a field read.
          const chainedCallPath = getChainedRuntimeCallPath(
            memberExprPath,
            fieldName
          );
          if (chainedCallPath) {
            analyzeChainedCallbackArguments(chainedCallPath);
            analyzeContentRoot(chainedCallPath);
            continue;
          }

          accessedTopLevelFieldNames.add(fieldName);

          // Check usage of the field to look for opaque consumption
          if (memberExprPath) {
            analyzeOpaqueUsage(memberExprPath, [fieldName]);
          }
        } else {
          // Dynamic computed access – cannot resolve statically
          return true;
        }
      } else if (babelTypes.isArrayExpression(referenceParentNode)) {
        // The binding's value escapes into an array literal
        // (e.g. `[appleWatch, airpods].map((entry) => entry.name)`). Its fields
        // are then accessed through iteration that Babel cannot follow back to
        // this dictionary, so we cannot know which fields are used. This is the
        // canonical meta-record / collection access pattern — conservatively
        // keep every field rather than pruning the content to nothing.
        return true;
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
            const memberExprPath = callExprPath?.parentPath;

            // content().onChange(cb) — a runtime subscription, not a field.
            const chainedCallPath = getChainedRuntimeCallPath(
              memberExprPath,
              fieldName
            );
            if (chainedCallPath) {
              analyzeChainedCallbackArguments(chainedCallPath);
              analyzeContentRoot(chainedCallPath);
              continue;
            }

            accessedTopLevelFieldNames.add(fieldName);
            if (memberExprPath) analyzeOpaqueUsage(memberExprPath, [fieldName]);
          } else {
            // content()[dynamicKey] – cannot resolve statically
            return true;
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
          return true;
        }
      } else {
        // Variable used in a non-member-access context (spread, function arg, etc.)
        return true;
      }
    }

    return false;
  };

  /**
   * Records the fields read through `variableName`, the local binding that
   * receives the content root at `rootPath`.
   */
  const analyzeContentVariable = (
    rootPath: NodePath<BabelTypes.Node>,
    variableName: string
  ): void => {
    const variableBinding = rootPath.scope.getBinding(variableName);
    if (!variableBinding) {
      markUntrackedBinding();
      return;
    }

    const accessedTopLevelFieldNames = new Set<string>();
    const hasUntrackedReferenceAccess = analyzeContentBindingReferences(
      variableBinding,
      accessedTopLevelFieldNames
    );

    if (hasUntrackedReferenceAccess) {
      markUntrackedBinding();
    } else if (isSfcFile) {
      // Vue / Svelte SFC: defer to the framework-specific extractor because
      // Babel scope analysis cannot see through `.value` or `$` indirection.
      deferFrameworkAnalysis(variableName);
    } else if (variableBinding.referencePaths.length === 0) {
      // Non-SFC file with no visible references – keep all fields.
      markUntrackedBinding();
    } else {
      recordFieldUsage(pruneContext, dictionaryKey, accessedTopLevelFieldNames);
    }
  };

  /**
   * Analyses how the content root produced by `expressionPath` is consumed.
   *
   * `expressionPath` is the `useIntlayer('key')` call itself, or any expression that
   * evaluates back to the same content object — currently the result of a
   * chainable runtime helper such as `.onChange(…)`.
   */
  const analyzeContentRoot = (
    expressionPath: NodePath<BabelTypes.Node>
  ): void => {
    const resolution = resolveContentRoot(babelTypes, expressionPath);

    // const [, b] = await Promise.all([getIntlayerAsync('skipped'), …])
    if (resolution.kind === 'discarded') return;

    const { rootPath } = resolution;

    if (resolution.kind === 'binding') {
      const { bindingTarget } = resolution;

      // ── Pattern 1: const { fieldA, fieldB } = useIntlayer('key') ──────────
      if (babelTypes.isObjectPattern(bindingTarget)) {
        const accessedFieldNames = new Set<string>();
        if (
          collectFieldsFromObjectPattern(
            bindingTarget,
            rootPath,
            accessedFieldNames
          )
        ) {
          recordFieldUsage(pruneContext, dictionaryKey, accessedFieldNames);
        } else {
          recordFieldUsage(pruneContext, dictionaryKey, 'all');
        }
        return;
      }

      // ── Pattern 3: const content = useIntlayer('key') ─────────────────────
      analyzeContentVariable(rootPath, bindingTarget.name);
      return;
    }

    const parentNode = rootPath.parent;

    // ── Pattern 2: useIntlayer('key').fieldA / useIntlayer('key')?.fieldA ────
    if (
      (babelTypes.isMemberExpression(parentNode) ||
        babelTypes.isOptionalMemberExpression(parentNode)) &&
      (parentNode as BabelTypes.MemberExpression).object === rootPath.node
    ) {
      let fieldName: string | undefined;

      if (
        !parentNode.computed &&
        babelTypes.isIdentifier(parentNode.property)
      ) {
        fieldName = parentNode.property.name;
      } else if (
        parentNode.computed &&
        babelTypes.isStringLiteral(parentNode.property)
      ) {
        fieldName = parentNode.property.value;
      }

      if (fieldName) {
        const memberExprPath = rootPath.parentPath;

        // useIntlayer('key').onChange(cb) — a runtime subscription: read the
        // fields out of the callback instead of recording `onChange` itself.
        const chainedCallPath = getChainedRuntimeCallPath(
          memberExprPath,
          fieldName
        );
        if (chainedCallPath) {
          analyzeChainedCallbackArguments(chainedCallPath);
          analyzeContentRoot(chainedCallPath);
          return;
        }

        recordFieldUsage(pruneContext, dictionaryKey, new Set([fieldName]));

        // Check for opaque usage (e.g. passed directly to a prop)
        if (memberExprPath) {
          analyzeOpaqueUsage(memberExprPath, [fieldName]);
        }
      } else {
        markUntrackedBinding();
      }
      return;
    }

    // ── Pattern 4: bare call – result is discarded ──────────────────────────
    if (babelTypes.isExpressionStatement(parentNode)) {
      return; // no usage to record
    }

    // ── Fallback: result passed as argument, used in ternary, etc. ──────────
    markUntrackedBinding();
  };

  // `getIntlayerAsync('key')` is consumed through its `await`, so the content
  // root is the await expression — reading the call's own parent would see
  // only the `AwaitExpression` and give up on every field.
  analyzeContentRoot(callExpressionPath);
};
