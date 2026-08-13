/**
 * Text-extraction heuristics — which raw strings in a source file are
 * user-facing copy that belongs in a dictionary.
 *
 * Kept in `@intlayer/config` (rather than in a compiler package) because both
 * sides of the extraction story need them without pulling in Babel:
 * - `@intlayer/babel` / `@intlayer/vue-compiler` / `@intlayer/svelte-compiler`
 *   use them to decide what `intlayer extract` rewrites.
 * - `eslint-plugin-intlayer` uses the very same predicate for `no-raw-text`, so
 *   what the linter reports is exactly what the extractor would take.
 */
export { ATTRIBUTES_TO_EXTRACT } from './constants';
export { shouldExtract } from './shouldExtract';
