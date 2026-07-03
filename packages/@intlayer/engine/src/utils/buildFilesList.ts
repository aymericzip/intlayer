import { isAbsolute, normalize, relative, resolve } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import fg from 'fast-glob';

/**
 * Options for building the files list
 */
export type BuildComponentFilesListOptions = {
  /**
   * Glob patterns to match files
   */
  transformPattern: string | string[];
  /**
   * Glob patterns to exclude files
   */
  excludePattern?: string | string[];
  /**
   * Base directory (or directories) for file resolution.
   * When multiple directories are provided, subdirectories of others are
   * automatically deduplicated so files are never scanned twice.
   */
  baseDir: string | string[];
  /**
   * Whether to include dot-prefixed files and directories (default: false)
   */
  dot?: boolean;
};

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
 * const files = buildComponentFilesList({
 *   transformPattern: config.build.traversePattern,
 *   baseDir: [config.system.baseDir, ...config.content.codeDir],
 *   dot: true,
 * });
 */
export const buildComponentFilesList = (
  config: BuildComponentFilesListOptions
): string[] => {
  const {
    transformPattern,
    excludePattern = [],
    baseDir,
    dot = false,
  } = config;

  const patterns = normalizeToArray(transformPattern)
    .filter(
      (pattern): pattern is string =>
        typeof pattern === 'string' && !pattern.startsWith('!')
    )
    .map(normalize); // Ensure it works with Windows

  const excludePatterns = [
    ...normalizeToArray(excludePattern),
    // Treat negation entries in transformPattern as additional excludes
    ...normalizeToArray(transformPattern)
      .filter(
        (pattern): pattern is string =>
          typeof pattern === 'string' && pattern.startsWith('!')
      )
      .map((pattern) => pattern.slice(1)),
  ]
    .filter((pattern): pattern is string => typeof pattern === 'string')
    .map(normalize); // Ensure it works with Windows

  const roots = getDistinctRootDirs(normalizeToArray(baseDir));

  return Array.from(
    new Set(
      roots.flatMap((root) =>
        fg.sync(patterns, {
          cwd: root,
          ignore: excludePatterns,
          absolute: true,
          dot,
        })
      )
    )
  );
};

/**
 * Convenience wrapper that derives all file-list options directly from an
 * `IntlayerConfig` object.
 *
 * Scans `[baseDir, ...codeDir]` using `build.traversePattern`, excludes
 * content declaration file extensions and any `compiler.excludePattern`
 * entries defined in the configuration, and includes dot files.
 */
export const buildComponentFilesListFromConfig = (
  intlayerConfig: IntlayerConfig
): string[] => {
  const {
    build: { traversePattern },
    system: { baseDir },
    content: { codeDir, fileExtensions },
    compiler: { excludePattern },
  } = intlayerConfig;

  const excludePatterns = [
    // Exclude content declaration files (e.g. **/*.content.ts)
    ...fileExtensions.map((ext) => `**/*${ext}`),
    ...(Array.isArray(excludePattern) ? excludePattern : [excludePattern]),
  ].filter((p): p is string => typeof p === 'string');

  return buildComponentFilesList({
    transformPattern: traversePattern,
    excludePattern: excludePatterns,
    baseDir: [baseDir, ...codeDir],
    dot: true,
  });
};
