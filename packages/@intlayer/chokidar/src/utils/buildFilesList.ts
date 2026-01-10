import { join } from 'node:path';
import fg from 'fast-glob';

/**
 * Options for building the files list
 */
export type BuildFilesListOptions = {
  /**
   * Glob patterns to match files
   */
  transformPattern: string | string[];
  /**
   * Glob patterns to exclude files
   */
  excludePattern: string | string[];
  /**
   * Base directory for file resolution
   */
  baseDir: string;
};

/**
 * Normalizes a pattern value to an array
 */
const normalizeToArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

/**
 * Builds a list of files matching the given patterns.
 *
 * This utility consolidates the file listing logic used across multiple compilers
 * (Vue, Svelte, Vite) to avoid code duplication.
 *
 * @param options - Configuration options for building the file list
 * @returns Array of absolute file paths matching the patterns
 *
 * @example
 * // Basic usage
 * const files = buildFilesList({
 *   transformPattern: 'src/**\/*.{ts,tsx}',
 *   excludePattern: ['**\/node_modules;\/**'],
 *   baseDir: '/path/to/project',
 * });
 *
 * @example
 * // With framework extension (Vue)
 * const files = buildFilesList({
 *   transformPattern: 'src/**\/*.{ts,tsx}',
 *   excludePattern: ['**\/node_modules\/**'],
 *   baseDir: '/path/to/project',
 * });
 */
export const buildFilesList = (options: BuildFilesListOptions): string[] => {
  const { transformPattern, excludePattern, baseDir } = options;

  const patterns = normalizeToArray(transformPattern);
  const excludePatterns = normalizeToArray(excludePattern);

  const files = fg
    .sync(patterns, {
      cwd: baseDir,
      ignore: excludePatterns,
    })
    .map((file) => join(baseDir, file));

  return files;
};
