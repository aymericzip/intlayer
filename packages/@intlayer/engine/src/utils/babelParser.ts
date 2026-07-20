import { createRequire } from 'node:module';
import type {
  babelTsParser as babelTsParserImpl,
  RecastParser,
  typescriptParser as typescriptParserImpl,
} from '@intlayer/babel/babelParser';

/**
 * Recast-compatible parsers, backed by `@intlayer/babel`.
 *
 * All Babel operations live in `@intlayer/babel`, so this package never depends
 * on `@babel/parser` directly. `@intlayer/babel/babelParser` is loaded lazily on
 * the first `parse` call: `recast.parse` invokes `parser.parse` synchronously,
 * so a `require` (rather than a dynamic `import`) is used to keep the API
 * synchronous while deferring the load — `@babel/parser` stays off the hot path
 * until an AST transform actually runs.
 *
 * `@intlayer/babel` is an optional peer dependency of `@intlayer/engine`. The
 * flows that use these parsers (`intlayer init`, content-declaration writes) are
 * driven by `@intlayer/cli`, which ships `@intlayer/babel`, so it is present
 * whenever these parsers are needed.
 */

/** Works in both the ESM and CJS builds (see `@intlayer/config`'s helper). */
const isESModule = typeof import.meta.url === 'string';
const engineRequire: NodeJS.Require = isESModule
  ? createRequire(import.meta.url)
  : require;

const BABEL_PARSER_MODULE = '@intlayer/babel/babelParser';

type BabelParserModule = {
  typescriptParser: typeof typescriptParserImpl;
  babelTsParser: typeof babelTsParserImpl;
};

let cachedModule: BabelParserModule | undefined;

/**
 * Lazily resolves `@intlayer/babel/babelParser`, caching the result.
 *
 * @throws If `@intlayer/babel` is not installed.
 */
const loadBabelParser = (): BabelParserModule => {
  if (cachedModule) return cachedModule;

  try {
    cachedModule = engineRequire(BABEL_PARSER_MODULE) as BabelParserModule;
  } catch (error) {
    throw new Error(
      `Failed to load "${BABEL_PARSER_MODULE}". Install "@intlayer/babel" to enable AST-based transforms.`,
      { cause: error }
    );
  }

  return cachedModule;
};

export type { RecastParser };

/** Drop-in replacement for `recast/parsers/typescript` (TS without JSX). */
export const typescriptParser: RecastParser = {
  parse: (source: string) => loadBabelParser().typescriptParser.parse(source),
};

/** Drop-in replacement for `recast/parsers/babel-ts` (TS *and* JSX). */
export const babelTsParser: RecastParser = {
  parse: (source: string) => loadBabelParser().babelTsParser.parse(source),
};
