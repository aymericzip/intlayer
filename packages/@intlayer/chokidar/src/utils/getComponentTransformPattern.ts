import path from 'node:path';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * Helper to remove directories that are subdirectories of others in the list.
 * Example: ['/root', '/root/src'] -> ['/root']
 * This prevents scanning the same files twice.
 */
const getDistinctRootDirs = (dirs: string[]): string[] => {
  // Resolve to absolute paths and remove exact duplicates
  const uniqueDirs = Array.from(new Set(dirs.map((d) => path.resolve(d))));

  // Sort by length (shortest paths first) so parents appear before children
  uniqueDirs.sort((a, b) => a.length - b.length);

  // Filter out any directory that is inside a parent already in the accepted list
  return uniqueDirs.reduce((acc: string[], dir) => {
    const isNested = acc.some((parent) => {
      const relative = path.relative(parent, dir);
      return (
        !relative.startsWith('..') && // It is inside the parent
        !path.isAbsolute(relative) && // It is not a different drive/root
        relative !== '' // It is not the parent itself (already handled by Set, but good for safety)
      );
    });

    if (!isNested) {
      acc.push(dir);
    }
    return acc;
  }, []);
};

export const getComponentTransformPattern = async (
  intlayerConfig: IntlayerConfig
): Promise<string[]> => {
  const { baseDir, codeDir } = intlayerConfig.content;
  const { traversePattern } = intlayerConfig.build;

  // Optimize: Filter out codeDir paths if they are already covered by baseDir
  const distinctRoots = getDistinctRootDirs([baseDir, ...codeDir]);

  const filesListPatternPromises = distinctRoots.map((cwd) =>
    fg(traversePattern, {
      cwd,
      absolute: true,
      dot: true,
    })
  );

  const filesList = (await Promise.all(filesListPatternPromises)).flat();

  // Deduplicate files just in case of overlapping patterns or symlinks
  return Array.from(new Set(filesList));
};

export const getComponentTransformPatternSync = (
  intlayerConfig: IntlayerConfig
): string[] => {
  const { baseDir, codeDir } = intlayerConfig.content;
  const { traversePattern } = intlayerConfig.build;

  // Optimize: Filter out codeDir paths if they are already covered by baseDir
  const distinctRoots = getDistinctRootDirs([baseDir, ...codeDir]);

  const filesList = distinctRoots.flatMap((cwd) =>
    fg.sync(traversePattern, {
      cwd,
      absolute: true,
      dot: true,
    })
  );

  return Array.from(new Set(filesList));
};
