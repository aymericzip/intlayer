import { readFile, rm } from 'node:fs/promises';
import { join, normalize, relative } from 'node:path';
import {
  colorizeKey,
  colorizePath,
  getAppLogger,
  normalizePath,
} from '@intlayer/config/client';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import fg from 'fast-glob';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint';
import { writeJsonIfChanged } from './writeJsonIfChanged';

export const cleanRemovedContentDeclaration = async (
  filePath: string,
  keysToKeep: string[],
  configuration: IntlayerConfig
): Promise<{
  changedDictionariesLocalIds: string[];
  excludeKeys: string[];
  hasRebuilt: boolean;
}> => {
  const appLogger = getAppLogger(configuration);

  const unmergedDictionaries = getUnmergedDictionaries(configuration);

  const baseDir = configuration.content.baseDir;

  const relativeFilePath = relative(baseDir, filePath);
  const flatUnmergedDictionaries = Object.values(unmergedDictionaries).flat();

  const filteredUnmergedDictionaries = flatUnmergedDictionaries.filter(
    (dictionary) =>
      dictionary.filePath === relativeFilePath &&
      !keysToKeep.includes(dictionary.key)
  );

  // Deduplicate dictionaries by key
  const uniqueUnmergedDictionaries = filteredUnmergedDictionaries.filter(
    (dictionary, index, self) =>
      index === self.findIndex((t) => t.key === dictionary.key)
  );

  const changedDictionariesLocalIds: string[] = [];
  const filesToRemove: string[] = [];
  const excludeKeys: string[] = [];

  // Identify Unmerged Dictionaries to remove or clean
  await Promise.all(
    uniqueUnmergedDictionaries.map(async (dictionary) => {
      const unmergedFilePath = normalize(
        join(
          configuration.content.unmergedDictionariesDir,
          `${dictionary.key}.json`
        )
      );

      try {
        const jsonContent = await readFile(unmergedFilePath, 'utf8');
        const parsedContent = JSON.parse(jsonContent);

        if (parsedContent.length === 1) {
          if (parsedContent[0].filePath === relativeFilePath) {
            appLogger(
              `Removing outdated dictionary ${colorizeKey(dictionary.key)}`,
              { isVerbose: true }
            );
            filesToRemove.push(unmergedFilePath);
            excludeKeys.push(dictionary.key);
          }
        } else {
          const filteredContent = parsedContent.filter(
            (content: any) => content.filePath !== relativeFilePath
          );
          await writeJsonIfChanged(unmergedFilePath, filteredContent);
          changedDictionariesLocalIds.push(dictionary.localId!);
        }
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          if (!excludeKeys.includes(dictionary.key)) {
            excludeKeys.push(dictionary.key);
          }
        }
      }
    })
  );

  const dictionaries = getDictionaries(configuration);
  const flatDictionaries = Object.values(dictionaries) as Dictionary[];

  const filteredMergedDictionaries = flatDictionaries?.filter(
    (dictionary) =>
      !keysToKeep.includes(dictionary.key) &&
      dictionary.localIds?.length === 1 &&
      (dictionary.localIds[0] as string).endsWith(
        `::local::${relativeFilePath}`
      )
  );

  const uniqueMergedDictionaries = filteredMergedDictionaries.filter(
    (dictionary, index, self) =>
      index === self.findIndex((t) => t.key === dictionary.key)
  );

  // Identify Merged Dictionaries, Types, and Dynamic Dictionaries to remove
  await Promise.all(
    uniqueMergedDictionaries.map(async (dictionary) => {
      const mergedFilePath = normalize(
        join(configuration.content.dictionariesDir, `${dictionary.key}.json`)
      );

      try {
        const fileContent = await readFile(mergedFilePath, 'utf8');
        const parsedContent = JSON.parse(fileContent) as Dictionary;

        if (parsedContent.localIds?.length === 1) {
          if (
            parsedContent.localIds[0].endsWith(`::local::${relativeFilePath}`)
          ) {
            appLogger(
              `Removing outdated unmerged dictionary ${colorizeKey(dictionary.key)}`,
              { isVerbose: true }
            );

            // Mark JSON for removal
            filesToRemove.push(mergedFilePath);

            // Mark TS Types for removal
            const typesFilePath = normalize(
              join(configuration.content.typesDir, `${dictionary.key}.ts`)
            );
            filesToRemove.push(typesFilePath);

            // Mark Dynamic Dictionaries for removal
            // We use glob to catch the loader files (.cjs, .mjs) AND the split locale files (.en.json, etc.)
            const dynamicFilesGlob = join(
              configuration.content.dynamicDictionariesDir,
              `${dictionary.key}.*`
            );
            const dynamicFiles = await fg(normalizePath(dynamicFilesGlob), {
              absolute: true,
            });
            filesToRemove.push(...dynamicFiles);

            if (!excludeKeys.includes(dictionary.key)) {
              excludeKeys.push(dictionary.key);
            }
          }
        } else {
          const localIds = parsedContent.localIds?.filter(
            (localeId) => !localeId.endsWith(`::local::${relativeFilePath}`)
          ) as string[];
          const newContent = { ...parsedContent, localIds };
          await writeJsonIfChanged(mergedFilePath, newContent);
        }
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          if (!excludeKeys.includes(dictionary.key)) {
            excludeKeys.push(dictionary.key);
          }
          const typesFilePath = normalize(
            join(configuration.content.typesDir, `${dictionary.key}.ts`)
          );
          filesToRemove.push(typesFilePath);
        }
      }
    })
  );

  // Execute Cleanup
  if (filesToRemove.length > 0 || excludeKeys.length > 0) {
    // Update entry points (indexes) first so the app doesn't import dead files
    await createDictionaryEntryPoint(configuration, { excludeKeys });

    // Remove the files synchronously (awaited) immediately after.
    if (filesToRemove.length > 0) {
      await Promise.all(
        filesToRemove.map(async (path) => {
          const relativePath = relative(baseDir, path);
          try {
            await rm(path, { force: true });

            appLogger(`Deleted artifact: ${colorizePath(relativePath)}`, {
              isVerbose: true,
            });
          } catch {
            appLogger(
              `Error while removing file ${colorizePath(relativePath)}`,
              {
                isVerbose: true,
              }
            );
          }
        })
      );
    }
  }

  return {
    changedDictionariesLocalIds,
    excludeKeys,
    hasRebuilt: filesToRemove.length > 0 || excludeKeys.length > 0,
  };
};
