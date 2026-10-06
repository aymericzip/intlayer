import { stat } from 'node:fs/promises';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import fg from 'fast-glob';
import { isDirectoryExcluded } from './utils/isDirectoryExcluded';

/**
 * List all dictionaries absolute paths in the project
 * @param configuration - The configuration object
 * @returns An array of dictionary paths
 */
export const listDictionaries = async (
  configuration: IntlayerConfig
): Promise<string[]> => {
  const { fileExtensions, contentDir, excludedPath } = configuration.content;

  const watchedFilesPatternWithPath = fileExtensions.flatMap((ext) =>
    contentDir.map((dir) =>
      `${normalizePath(dir)}/**/*${ext}`.replace('//', '/')
    )
  );

  const filePromises = watchedFilesPatternWithPath.map(async (pattern) => {
    // Identify the static part of the path (before any wildcards like *)
    //    e.g. "/Users/.../design-system/dist/esm/**/*.content.ts" -> "/Users/.../design-system/dist/esm/"
    const magicIndex = pattern.search(/[*?{}(]/);
    const basePattern =
      magicIndex > -1 ? pattern.slice(0, magicIndex) : pattern;

    // An exclusion matching the explicit base path itself (e.g. a contentDir
    // inside `dist`) is dropped: the contentDir is more precise than it
    const applicableIgnore = excludedPath.filter(
      (excludePattern) => !isDirectoryExcluded(basePattern, [excludePattern])
    );

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
