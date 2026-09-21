import { readFile, rm } from 'node:fs/promises';
import { join, normalize, relative } from 'node:path';
import { normalizePath } from '@intlayer/config/client';
import {
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import fg from 'fast-glob';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint';
import { readDictionariesFromDisk } from './utils/readDictionariesFromDisk';
import { writeJsonIfChanged } from './writeJsonIfChanged';

/**
 * Grace period before bundler-graph artifacts (JSON, dynamic chunks) are
 * deleted, so a bundler rebuild started from the previous entry point can
 * still resolve them.
 */
const ARTIFACT_REMOVAL_DELAY_MS = 3000;

/**
 * Source ids of a merged dictionary. A dictionary built from a single source
 * is written as-is, so it carries `localId` rather than `localIds`.
 */
const getMergedLocalIds = (dictionary: Dictionary): LocalDictionaryId[] =>
  dictionary.localIds ?? (dictionary.localId ? [dictionary.localId] : []);

const removeArtifacts = async (
  paths: string[],
  baseDir: string,
  appLogger: ReturnType<typeof getAppLogger>
) =>
  await Promise.all(
    paths.map(async (path) => {
      const relativePath = relative(baseDir, path);
      try {
        await rm(path, { force: true });

        appLogger(`Deleted artifact: ${colorizePath(relativePath)}`, {
          isVerbose: true,
        });
      } catch {
        appLogger(`Error while removing file ${colorizePath(relativePath)}`, {
          isVerbose: true,
        });
      }
    })
  );

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

  const unmergedDictionaries = readDictionariesFromDisk<
    Record<string, Dictionary[]>
  >(configuration.system.unmergedDictionariesDir);

  const baseDir = configuration.system.baseDir;

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
  // Bundler-graph artifacts, deleted after the entry points stop importing them
  const filesToRemove: string[] = [];
  // Type declarations are not in the bundler graph and must be gone before the
  // module augmentation is regenerated, so they are deleted right away
  const typeFilesToRemove: string[] = [];
  const excludeKeys: string[] = [];

  // Identify Unmerged Dictionaries to remove or clean
  await Promise.all(
    uniqueUnmergedDictionaries.map(async (dictionary) => {
      const unmergedFilePath = normalize(
        join(
          configuration.system.unmergedDictionariesDir,
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

  const dictionaries = readDictionariesFromDisk<Record<string, Dictionary>>(
    configuration.system.dictionariesDir
  );
  const flatDictionaries = Object.values(dictionaries) as Dictionary[];

  const isFromChangedFile = (localId: LocalDictionaryId) =>
    localId.endsWith(`::local::${relativeFilePath}`);

  const filteredMergedDictionaries = flatDictionaries?.filter(
    (dictionary) =>
      !keysToKeep.includes(dictionary.key) &&
      getMergedLocalIds(dictionary).some(isFromChangedFile)
  );

  const uniqueMergedDictionaries = filteredMergedDictionaries.filter(
    (dictionary, index, self) =>
      index === self.findIndex((t) => t.key === dictionary.key)
  );

  // Identify Merged Dictionaries, Types, and Dynamic Dictionaries to remove
  await Promise.all(
    uniqueMergedDictionaries.map(async (dictionary) => {
      const mergedFilePath = normalize(
        join(configuration.system.dictionariesDir, `${dictionary.key}.json`)
      );

      try {
        const fileContent = await readFile(mergedFilePath, 'utf8');
        const parsedContent = JSON.parse(fileContent) as Dictionary;
        const localIds = getMergedLocalIds(parsedContent);

        if (localIds.length === 1) {
          if (isFromChangedFile(localIds[0]!)) {
            appLogger(
              `Removing outdated unmerged dictionary ${colorizeKey(dictionary.key)}`,
              { isVerbose: true }
            );

            // Mark JSON for removal
            filesToRemove.push(mergedFilePath);

            // Mark TS Types for removal
            const typesFilePath = normalize(
              join(configuration.system.typesDir, `${dictionary.key}.ts`)
            );
            typeFilesToRemove.push(typesFilePath);

            // Mark Dynamic Dictionaries for removal
            // We use glob to catch the loader files (.cjs, .mjs) AND the split locale files (.en.json, etc.)
            const dynamicFilesGlob = join(
              configuration.system.dynamicDictionariesDir,
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
          const newContent = {
            ...parsedContent,
            localIds: localIds.filter((localId) => !isFromChangedFile(localId)),
          };
          await writeJsonIfChanged(mergedFilePath, newContent);
        }
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          if (!excludeKeys.includes(dictionary.key)) {
            excludeKeys.push(dictionary.key);
          }
          const typesFilePath = normalize(
            join(configuration.system.typesDir, `${dictionary.key}.ts`)
          );
          typeFilesToRemove.push(typesFilePath);
        }
      }
    })
  );

  const hasRebuilt =
    filesToRemove.length > 0 ||
    typeFilesToRemove.length > 0 ||
    excludeKeys.length > 0;

  // Execute Cleanup
  if (hasRebuilt) {
    // Update entry points (indexes) first so the app doesn't import dead files
    await createDictionaryEntryPoint(configuration, { excludeKeys });

    await removeArtifacts(typeFilesToRemove, baseDir, appLogger);

    if (filesToRemove.length > 0) {
      setTimeout(
        () => removeArtifacts(filesToRemove, baseDir, appLogger),
        ARTIFACT_REMOVAL_DELAY_MS
      );
    }
  }

  return {
    changedDictionariesLocalIds,
    excludeKeys,
    hasRebuilt,
  };
};
