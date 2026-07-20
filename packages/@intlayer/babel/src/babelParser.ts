import { parse as babelParse, type ParserOptions } from '@babel/parser';

/**
 * Recast-compatible parsers backed by the `@babel/parser` version owned by
 * `@intlayer/babel`.
 *
 * All Babel operations are centralized in this package so that consumers such
 * as `@intlayer/engine` never need to depend on (or resolve) `@babel/parser`
 * themselves. `@intlayer/engine` loads these parsers lazily, which keeps
 * `@babel/parser` off the hot path until an AST transform is actually run.
 *
 * Recast's own `recast/parsers/typescript` / `recast/parsers/babel-ts` modules
 * resolve `@babel/parser` from the hoisted dependency tree, which can pick up
 * an incompatible major. Exposing the parser here resolves it against this
 * package's own pinned dependency, keeping the `intlayer init` AST transforms
 * working regardless of hoisting.
 *
 * The plugin list mirrors `recast/parsers/_babel_options.js`, adapted to the
 * Babel 8 parser. Only the still-optional plugins are listed here: the many
 * proposals that shipped as language features (e.g. class fields, private
 * methods, static blocks, optional chaining, nullish coalescing, numeric
 * separators, object rest/spread, dynamic import, top-level await, import
 * attributes) are enabled by default in Babel 8 and no longer accepted as
 * explicit plugins. Compared to the Babel 7 list, `decimal` and `recordAndTuple`
 * were removed with their proposals, `importAssertions` became the default
 * import-attributes syntax, and `pipelineOperator` uses the `fsharp` proposal
 * (the `minimal` proposal was removed, and `hack` conflicts with `v8intrinsic`).
 *
 * The goal is still to tolerate as much syntax as possible, since these
 * transforms run on arbitrary user code.
 */
const buildBabelOptions = (
  extraPlugins: NonNullable<ParserOptions['plugins']>
): ParserOptions => ({
  sourceType: 'module',
  strictMode: false,
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'decorators-legacy',
    'doExpressions',
    'exportDefaultFrom',
    'functionBind',
    'functionSent',
    'importMeta',
    ['pipelineOperator', { proposal: 'fsharp' }],
    'throwExpressions',
    'v8intrinsic',
    ...extraPlugins,
  ],
});

/** A parser object accepted by `recast.parse`'s `parser` option. */
export type RecastParser = {
  parse: (source: string) => unknown;
};

/** Drop-in replacement for `recast/parsers/typescript` (TS without JSX). */
export const typescriptParser: RecastParser = {
  parse: (source: string) =>
    babelParse(source, buildBabelOptions(['typescript'])),
};

/** Drop-in replacement for `recast/parsers/babel-ts` (TS *and* JSX). */
export const babelTsParser: RecastParser = {
  parse: (source: string) =>
    babelParse(source, buildBabelOptions(['jsx', 'typescript'])),
};
