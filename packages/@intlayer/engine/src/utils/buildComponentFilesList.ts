import { isAbsolute, relative, resolve } from 'node:path';
import { TRAVERSE_PATTERN } from '@intlayer/config/defaultValues';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import fg from 'fast-glob';
import { isDirectoryExcluded } from './isDirectoryExcluded';

/**
 * Normalizes a pattern value to an array
 */
const normalizeToArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

/**
 * Remove directories nested in others so files are never scanned twice.
 * A nested directory is kept as its own root when the exclude patterns would
 * drop it from its parent's scan (e.g. `<root>/dist` under `**\/dist/**`).
 *
 * Example: ['/root', '/root/src', '/root/dist'] → ['/root', '/root/dist']
 */
const getDistinctRootDirs = (
  dirs: string[],
  excludePatterns: string[]
): string[] => {
  const uniqueDirs = Array.from(new Set(dirs.map((dir) => resolve(dir))));
  uniqueDirs.sort((a, b) => a.length - b.length);

  return uniqueDirs.reduce((acc: string[], dir) => {
    const isCoveredByParent = acc.some((parent) => {
      const relativePath = relative(parent, dir);
      const isNested =
        relativePath !== '' &&
        !relativePath.startsWith('..') &&
        !isAbsolute(relativePath);

      return isNested && !isDirectoryExcluded(relativePath, excludePatterns);
    });
    if (!isCoveredByParent) acc.push(dir);

    return acc;
  }, []);
};

/**
 * Default exclude patterns derived from TRAVERSE_PATTERN.
 * Extracted once so the function body can reference them without re-computing.
 */
const DEFAULT_EXCLUDE_PATTERNS: string[] = TRAVERSE_PATTERN.filter(
  (p): p is string => typeof p === 'string' && p.startsWith('!')
).map((p) => p.slice(1));

/**
 * Builds a deduplicated list of absolute file paths matching the given patterns.
 *
 * Handles multiple root directories (deduplicates overlapping roots), exclude
 * patterns, negation patterns embedded in `traversePattern`, and optional
 * dot-file inclusion.
 *
 * `codeDir` entries are more precise than the exclude patterns: a `codeDir`
 * inside an excluded directory (e.g. a design-system `dist` or a package in
 * `node_modules`) is scanned as its own root, so the exclusion only applies
 * below it.
 *
 * @example
 * // Single root with excludes
 * const files = buildComponentFilesList(config);
 *
 * @example
 * // Design-system build output is still scanned
 * // intlayer.config.ts: { content: { codeDir: ['node_modules/my-ds/dist'] } }
 * const files = buildComponentFilesList(config);
 */
export const buildComponentFilesList = (
  config: IntlayerConfig,
  excludePattern?: string[]
): string[] => {
  const traversePattern = config.build.traversePattern;
  const compilerTransformPattern = config.compiler.transformPattern;
  const contentDeclarationPattern = config.content.fileExtensions.map(
    (ext) => `/**/*${ext}`
  );

  const patterns = [
    ...traversePattern,
    ...normalizeToArray(compilerTransformPattern),
  ]
    .filter((pattern) => typeof pattern === 'string')
    .filter((pattern) => !pattern.startsWith('!'))
    .map(normalizePath);

  // User-supplied negations from traversePattern
  const userExcludes = traversePattern
    .filter(
      (pattern): pattern is string =>
        typeof pattern === 'string' && pattern.startsWith('!')
    )
    .map((pattern) => pattern.slice(1));

  // Full exclude list: defaults (from TRAVERSE_PATTERN) + user overrides + caller extras + content files.
  // DEFAULT_EXCLUDE_PATTERNS acts as a safety floor — if the user provides a
  // partial traversePattern that omits some defaults, they are still applied.
  const baseExcludePatterns = Array.from(
    new Set([
      ...DEFAULT_EXCLUDE_PATTERNS,
      ...userExcludes,
      ...(excludePattern ?? []),
      ...contentDeclarationPattern,
    ])
  )
    .filter((pattern): pattern is string => typeof pattern === 'string')
    .map(normalizePath);

  const roots = getDistinctRootDirs(
    [config.system.baseDir, ...(config.content.codeDir ?? [])],
    baseExcludePatterns
  );

  return Array.from(
    new Set(
      roots.flatMap((root) =>
        fg.sync(patterns, {
          cwd: root,
          ignore: baseExcludePatterns,
          absolute: true,
          dot: true, // needed for .intlayer and similar
        })
      )
    )
  );
};
