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
 * on `@babel/parser` directly. `@intlayer/babel` is an optional peer
 * dependency: it is loaded lazily, keeping `@babel/parser` off the hot path
 * until an AST transform actually runs.
 *
 * `recast.parse` calls `parser.parse` synchronously. Async callers run
 * `loadBabelParser()` first: its literal `import()` lets bundlers (e.g. the VS
 * Code extension) include the parser. Otherwise the first `parse` falls back
 * to a synchronous `require`.
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

const createLoadError = (error: unknown): Error =>
  new Error(
    `Failed to load "${BABEL_PARSER_MODULE}". Install "@intlayer/babel" to enable AST-based transforms.`,
    { cause: error }
  );

/**
 * Loads `@intlayer/babel/babelParser` ahead of a synchronous `recast.parse`.
 *
 * @throws If `@intlayer/babel` is not installed.
 */
export const loadBabelParser = async (): Promise<void> => {
  if (cachedModule) return;

  try {
    cachedModule = await import('@intlayer/babel/babelParser');
  } catch (error) {
    throw createLoadError(error);
  }
};

/** The loaded parser module, required synchronously if not loaded yet. */
const getBabelParser = (): BabelParserModule => {
  if (cachedModule) return cachedModule;

  try {
    cachedModule = engineRequire(BABEL_PARSER_MODULE) as BabelParserModule;
  } catch (error) {
    throw createLoadError(error);
  }

  return cachedModule;
};

export type { RecastParser };

/** Drop-in replacement for `recast/parsers/typescript` (TS without JSX). */
export const typescriptParser: RecastParser = {
  parse: (source: string) => getBabelParser().typescriptParser.parse(source),
};

/** Drop-in replacement for `recast/parsers/babel-ts` (TS *and* JSX). */
export const babelTsParser: RecastParser = {
  parse: (source: string) => getBabelParser().babelTsParser.parse(source),
};
