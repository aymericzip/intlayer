import { normalizePath } from '@intlayer/config/utils';

/**
 * Cache of normalized files-list sets, keyed by the files-list array
 * reference. Babel reuses the same plugin options object for every file of a
 * build, so the (potentially large) list is normalized once per build instead
 * of once per transformed file.
 */
const normalizedFilesListCache = new WeakMap<readonly string[], Set<string>>();

/**
 * Returns a set of POSIX-normalized paths for the given files list, computed
 * once per unique array reference.
 *
 * @param filesList - The plugin's `filesList` option (absolute file paths).
 * @returns A set of the same paths normalized via `normalizePath`.
 */
export const getNormalizedFilesListSet = (
  filesList: readonly string[]
): Set<string> => {
  let normalizedSet = normalizedFilesListCache.get(filesList);

  if (!normalizedSet) {
    normalizedSet = new Set(filesList.map(normalizePath));
    normalizedFilesListCache.set(filesList, normalizedSet);
  }

  return normalizedSet;
};
