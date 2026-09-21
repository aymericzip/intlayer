import { relative, sep } from 'node:path';

/**
 * Whether `directory` sits under a dot-directory (`.intlayer/…`) of `baseDir`.
 *
 * Angular's esbuild dev server ignores `<workspace>/**\/.*\/**` in its file
 * watcher, so generated files living there never invalidate its TypeScript
 * source cache: a key added to a dictionary regenerates the types, but the
 * template type-checker keeps the stale declaration until `ng serve` restarts.
 *
 * @param baseDir - Angular workspace root (the Intlayer `system.baseDir`).
 * @param directory - Absolute directory to test.
 */
export const isInHiddenDirectory = (
  baseDir: string,
  directory: string
): boolean =>
  relative(baseDir, directory)
    .split(sep)
    .some((segment) => segment.startsWith('.') && segment !== '..');
