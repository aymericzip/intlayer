import { isAbsolute, relative, resolve, sep } from 'node:path';
import { TRAVERSE_PATTERN } from '@intlayer/config/defaultValues';
import { normalizePath } from '@intlayer/config/utils';
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
 * Returns true when the resolved path passes through a `node_modules` segment.
 * Works on both POSIX and Windows paths.
 */
const isInsideNodeModules = (dir: string): boolean =>
  resolve(dir).split(sep).includes('node_modules');

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
 * Special case: `codeDir` entries that live inside `node_modules` (e.g. a
 * design-system package installed as a workspace dependency) are scanned as
 * their own explicit roots. They are NOT collapsed into the project root so
 * the `*\/node_modules\/**` exclusion does not silently drop them.
 *
 * @example
 * // Single root with excludes
 * const files = buildComponentFilesList(config);
 *
 * @example
 * // Design-system package inside node_modules is still scanned
 * // intlayer.config.ts: { content: { codeDir: ['node_modules/my-ds/src'] } }
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

  // Separate codeDir entries that live inside node_modules.
  // getDistinctRootDirs would collapse them into the project root, after which
  // the **/node_modules/** ignore would silently exclude them.
  const resolvedCodeDirs = (config.content.codeDir ?? []).map((dir) =>
    resolve(dir)
  );
  const inNodeModulesCodeDirs = resolvedCodeDirs.filter(isInsideNodeModules);
  const normalCodeDirs = resolvedCodeDirs.filter(
    (dir) => !isInsideNodeModules(dir)
  );

  // Normal roots: project base + regular codeDir entries, deduplicated.
  const normalRoots = getDistinctRootDirs([
    config.system.baseDir,
    ...normalCodeDirs,
  ]);

  const normalFiles = normalRoots.flatMap((root) =>
    fg.sync(patterns, {
      cwd: root,
      ignore: baseExcludePatterns,
      absolute: true,
      dot: true, // needed for .intlayer and similar
    })
  );

  // node_modules codeDir roots: scanned directly from the package root.
  // **/node_modules/** is removed from the ignore list so it doesn't block
  // the scan (it is still applied inside the package for nested node_modules).
  const nodeModulesExcludePatterns = baseExcludePatterns.filter(
    (pattern) => !pattern.includes('node_modules')
  );

  const nodeModulesFiles = inNodeModulesCodeDirs.flatMap((dir) =>
    fg.sync(patterns, {
      cwd: dir,
      ignore: nodeModulesExcludePatterns,
      absolute: true,
      dot: false,
    })
  );

  return Array.from(new Set([...normalFiles, ...nodeModulesFiles]));
};
