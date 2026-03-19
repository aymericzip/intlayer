import { isAbsolute, normalize, relative, resolve } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import fg from 'fast-glob';

/**
 * Normalizes a pattern value to an array
 */
const normalizeToArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

/**
 * Remove directories that are subdirectories of others in the list so files
 * are never scanned twice.
 * Example: ['/root', '/root/src'] → ['/root']
 */
const getDistinctRootDirs = (dirs: string[]): string[] => {
  const uniqueDirs = Array.from(new Set(dirs.map((dir) => resolve(dir))));
  uniqueDirs.sort((a, b) => a.length - b.length);

  return uniqueDirs.reduce((acc: string[], dir) => {
    const isNested = acc.some((parent) => {
      const rel = relative(parent, dir);

      return !rel.startsWith('..') && !isAbsolute(rel) && rel !== '';
    });
    if (!isNested) acc.push(dir);

    return acc;
  }, []);
};

/**
 * Builds a deduplicated list of absolute file paths matching the given patterns.
 *
 * Handles multiple root directories (deduplicates overlapping roots), exclude
 * patterns, negation patterns embedded in `transformPattern`, and optional
 * dot-file inclusion.
 *
 * @example
 * // Single root with excludes
 * const files = buildComponentFilesList({
 *   transformPattern: 'src/**\/*.{ts,tsx}',
 *   excludePattern: ['**\/node_modules\/**'],
 *   baseDir: '/path/to/project',
 * });
 *
 * @example
 * // Multiple roots (e.g. baseDir + codeDir), dot files included
 * const files = buildComponentFilesList(config, ['**\/node_modules\/**']);
 */
export const buildComponentFilesList = (
  config: IntlayerConfig,
  excludePattern?: string[]
): string[] => {
  const transformPattern = config.build.traversePattern;
  const compilerTransformPattern = config.compiler.transformPattern;
  const contentDeclarationPattern = config.content.fileExtensions.map(
    (ext) => `/**/*${ext}`
  );

  const patterns = [
    ...transformPattern,
    ...normalizeToArray(compilerTransformPattern),
  ]
    .filter((pattern) => typeof pattern === 'string')
    .filter((pattern) => !pattern.startsWith('!'))
    .map((pattern) => normalize(pattern)); // Ensure it works with Windows

  const excludePatterns = [
    ...(excludePattern ?? []),
    ...contentDeclarationPattern,
    // Treat negation entries in transformPattern as additional excludes
    ...transformPattern
      .filter(
        (pattern) => typeof pattern === 'string' && pattern.startsWith('!')
      )
      .map((pattern) => pattern.slice(1)),
  ]
    .filter((pattern) => typeof pattern === 'string')
    .map((pattern) => normalize(pattern)); // Ensure it works with Windows

  const roots = getDistinctRootDirs([
    config.system.baseDir,
    ...config.content.codeDir,
  ]);

  const fileList = roots.flatMap((root) =>
    fg.sync(patterns, {
      cwd: root,
      ignore: excludePatterns,
      absolute: true,
      dot: true, // include dot files like .next / .intlayer
    })
  );

  return Array.from(new Set(fileList));
};
