import { stat } from 'node:fs/promises';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * List all dictionaries absolute paths in the project
 * @param configuration - The configuration object
 * @returns An array of dictionary paths
 */
export const listDictionaries = async (
  configuration: IntlayerConfig
): Promise<string[]> => {
  const { watchedFilesPatternWithPath, excludedPath } = configuration.content;

  const filePromises = watchedFilesPatternWithPath.map(async (pattern) => {
    // Identify the static part of the path (before any wildcards like *)
    //    e.g. "/Users/.../design-system/dist/esm/**/*.content.ts" -> "/Users/.../design-system/dist/esm/"
    const magicIndex = pattern.search(/[*?{}(]/);
    const basePattern =
      magicIndex > -1 ? pattern.slice(0, magicIndex) : pattern;

    // Filter the global ignored list for this specific pattern
    const applicableIgnore = excludedPath.filter((excludePattern) => {
      // Heuristic: Extract the key directory name from the glob
      // e.g. "**/dist/**" -> "dist", "**/node_modules/**" -> "node_modules"
      const cleanName = excludePattern.replace(/\*\*/g, '').replace(/\//g, '');

      // If the explicit base path contains the excluded directory (e.g. ".../dist/..."),
      // we assume you explicitly want it, so we REMOVE it from the ignore list.
      // We check for `/${cleanName}/` to ensure we match whole folder names.
      if (cleanName && basePattern.includes(`/${cleanName}/`)) {
        return false; // Drop this exclude rule
      }

      return true; // Keep this exclude rule
    });

    // Run fast-glob with the customized ignore list
    return fg(pattern, {
      ignore: applicableIgnore,
      absolute: true,
      dot: true,
    });
  });

  const filesArrays = await Promise.all(filePromises);

  // Flatten and deduplicate
  const uniqueFiles = Array.from(new Set(filesArrays.flat()));

  return uniqueFiles;
};

export const listDictionariesWithStats = async (
  configuration: IntlayerConfig
) => {
  const files = await listDictionaries(configuration);

  return Promise.all(
    files.map(async (file) => ({ path: file, stats: await stat(file) }))
  );
};
