import { normalizePath } from '@intlayer/config/utils';

/**
 * Extracts the literal directory segments of a directory-shaped exclude
 * pattern (`**\/dist/**` → `dist`, `!**\/.next/**` → `.next`).
 * Returns `undefined` for file-shaped or wildcard patterns (`**\/*.config.*`),
 * which can never exclude a whole directory.
 */
const getExcludedDirectorySegments = (
  excludePattern: string
): string | undefined => {
  const segments = normalizePath(excludePattern)
    .replace(/^!/, '')
    .replace(/^(\*\*\/)+/, '')
    .replace(/(\/\*\*)+\/?$/, '');

  const isLiteral = segments !== '' && !/[*?[\]{}()!]/.test(segments);

  return isLiteral ? segments : undefined;
};

/**
 * Whether a directory path lies inside a directory matched by one of the
 * exclude patterns (e.g. `packages/ds/dist/esm` against `**\/dist/**`).
 *
 * Used to keep explicitly configured directories (`codeDir`, `contentDir`)
 * from being dropped by an exclusion that only matches their ancestors.
 *
 * @example
 * isDirectoryExcluded('ds/dist/esm', ['**\/dist/**']); // true
 * isDirectoryExcluded('src/distance', ['**\/dist/**']); // false
 */
export const isDirectoryExcluded = (
  directoryPath: string,
  excludePatterns: string[]
): boolean => {
  const wrappedPath = `/${normalizePath(directoryPath).replace(/^\/+|\/+$/g, '')}/`;

  return excludePatterns.some((excludePattern) => {
    const excludedSegments = getExcludedDirectorySegments(excludePattern);

    return (
      excludedSegments !== undefined &&
      wrappedPath.includes(`/${excludedSegments}/`)
    );
  });
};
