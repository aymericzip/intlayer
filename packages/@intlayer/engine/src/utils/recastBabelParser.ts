import { parse as babelParse, type ParserOptions } from '@babel/parser';

/**
 * Recast-compatible parsers backed by the `@babel/parser` version pinned by
 * this package.
 *
 * Recast's own `recast/parsers/typescript` / `recast/parsers/babel-ts` modules
 * resolve `@babel/parser` from the hoisted dependency tree, which can pick up
 * an incompatible major: `@babel/parser` v8 rejects recast's v7-era plugin
 * options (e.g. `pipelineOperator: { proposal: "minimal" }`), making every
 * `recast.parse` call throw. Importing the parser here resolves it against this
 * package's own pinned v7 dependency, keeping the `intlayer init` AST
 * transforms working regardless of hoisting.
 *
 * The plugin list mirrors `recast/parsers/_babel_options.js`: the goal is to
 * tolerate as much syntax as possible, since these transforms run on arbitrary
 * user code.
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
    'asyncGenerators',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    'classStaticBlock',
    'decimal',
    'decorators-legacy',
    'doExpressions',
    'dynamicImport',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importAssertions',
    'importMeta',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    ['pipelineOperator', { proposal: 'minimal' }],
    ['recordAndTuple', { syntaxType: 'hash' }],
    'throwExpressions',
    'topLevelAwait',
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
