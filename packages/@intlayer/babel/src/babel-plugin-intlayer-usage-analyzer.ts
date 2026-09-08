import type { PluginObject, PluginPass } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import type { CallerDescriptor } from '@intlayer/config/callers';
import { analyzeCallExpressionUsage } from './analyzeContentUsage';
import { createCompatUsageAnalyzer } from './compat/usageAnalysis';
import { NATIVE_CALLER_NAME_SET } from './nativeCallers';
import type { PruneContext } from './pruneContext';
import { readStaticString } from './staticAstReaders';

export type {
  CallerDescriptor,
  CallerResultShape,
  CallerValueSource,
} from '@intlayer/config/callers';
export {
  CHAINABLE_RUNTIME_METHOD_NAMES,
  INTLAYER_CALLER_NAMES,
  type IntlayerCallerName,
  NATIVE_CALLER_NAME_SET,
} from './nativeCallers';
// Re-exported so `@intlayer/babel`'s public surface stays unchanged after the
// split into `pruneContext` / `analyzeContentUsage` / `compat/*` modules.
export {
  createPruneContext,
  type DictionaryFieldUsage,
  type NestedRenameEntry,
  type NestedRenameMap,
  type OpaqueFieldOccurrence,
  type PruneContext,
  preserveNestedDictionaryFields,
} from './pruneContext';
export { unwrapAwait } from './staticAstReaders';

/**
 * Configuration entry for a single compat namespace caller.
 *
 * @deprecated Alias kept for backward compatibility — use the shared
 * {@link CallerDescriptor} from `@intlayer/config/callers` instead.
 */
export type CompatCallerConfig = CallerDescriptor;

/**
 * @deprecated Always empty. Compat callers are injected per build through
 * `options.compatCallers`; there is no default registry to fall back to.
 */
export const DEFAULT_COMPAT_CALLERS: CallerDescriptor[] = [];

/**
 * Creates a Babel plugin that traverses source files and records which
 * top-level dictionary fields each `useIntlayer` / `getIntlayer` call-site
 * accesses. Results are accumulated into `pruneContext`.
 *
 * Compat-adapter callers (`useTranslation`, `useTranslations`, `formatMessage`,
 * …) are *not* known to this plugin. Each compat package's bundler plugin
 * injects its own descriptors through `options.compatCallers`, and the whole
 * compat analysis then runs behind {@link createCompatUsageAnalyzer}. With no
 * descriptors injected — the default — none of that code is reached, so a
 * plain intlayer build behaves exactly as if the adapters did not exist.
 *
 * This plugin is analysis-only: it does not transform the code (`code: false`
 * should be passed to `transformAsync` when using it).
 *
 * @param pruneContext - Shared mutable state written by this plugin.
 * @param options      - Optional overrides. `compatCallers` defaults to an
 *                       empty registry, disabling compat-adapter analysis.
 */
export const makeUsageAnalyzerBabelPlugin =
  (
    pruneContext: PruneContext,
    options?: { compatCallers?: readonly CallerDescriptor[] }
  ) =>
  ({ types: babelTypes }: { types: typeof BabelTypes }): PluginObject => {
    const compatCallers = options?.compatCallers ?? [];

    return {
      name: 'intlayer-usage-analyzer',
      visitor: {
        Program: {
          exit: (programPath, state: PluginPass) => {
            const sourceFilePath = state.file.opts.filename ?? 'unknown file';
            const isSfcFile =
              sourceFilePath.endsWith('.vue') ||
              sourceFilePath.endsWith('.svelte') ||
              sourceFilePath.endsWith('.astro');

            const compatAnalyzer = createCompatUsageAnalyzer(
              babelTypes,
              pruneContext,
              compatCallers,
              { sourceFilePath, isSfcFile }
            );

            // Phase 1: collect the local aliases of the native intlayer
            // callers, handing every import to the compat analyser too.
            //
            // An import declaration is only ever a direct child of Program, so
            // the body is scanned directly rather than walking the whole AST.
            const nativeCallerLocalNames = new Set<string>();

            for (const statement of programPath.node.body) {
              if (!babelTypes.isImportDeclaration(statement)) continue;

              const importSource = statement.source.value;

              for (const importSpecifier of statement.specifiers) {
                if (!babelTypes.isImportSpecifier(importSpecifier)) continue;

                const importedName = babelTypes.isIdentifier(
                  importSpecifier.imported
                )
                  ? importSpecifier.imported.name
                  : importSpecifier.imported.value;
                const localName = importSpecifier.local.name;

                if (NATIVE_CALLER_NAME_SET.has(importedName)) {
                  nativeCallerLocalNames.add(localName);
                  continue;
                }

                compatAnalyzer?.noteImport(
                  importSource,
                  importedName,
                  localName
                );
              }
            }

            const hasCompatCallers =
              compatAnalyzer?.hasMatchableCallers() ?? false;

            if (nativeCallerLocalNames.size === 0 && !hasCompatCallers) return;

            // Phase 2: analyse each call-site.
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

                // Native intlayer caller (useIntlayer / getIntlayer).
                if (nativeCallerLocalNames.has(localCallerName)) {
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
                    sourceFilePath,
                    isSfcFile
                  );
                  return;
                }

                compatAnalyzer?.analyzeCall(
                  callExpressionPath,
                  localCallerName,
                  isMethodCall
                );
              },
              JSXOpeningElement: (jsxOpeningElementPath) => {
                compatAnalyzer?.analyzeJsxElement(jsxOpeningElementPath);
              },
            });
          },
        },
      },
    };
  };
