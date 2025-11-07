import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint/createDictionaryEntryPoint';
import { getBuiltDictionariesPath } from './createDictionaryEntryPoint/getBuiltDictionariesPath';
import { createTypes } from './createType';
import { createModuleAugmentation } from './createType/createModuleAugmentation';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { formatPath } from './utils/formatter';

export const handleContentDeclarationFileChange = async (
  filePath: string,
  config: IntlayerConfig
) => {
  const appLogger = getAppLogger(config);

  // Process the file with the functionToRun
  appLogger(`Change detected: ${formatPath(filePath)}`, {
    isVerbose: true,
  });

  // Load new dictionaries from the changed file
  const newDictionaries = await loadLocalDictionaries(filePath, config);

  // Get all existing unmerged dictionaries
  const allUnmergedDictionaries = getUnmergedDictionaries(config);

  // Find and clean up old dictionaries from the same file with different keys
  const oldKeysToDelete = new Set<string>();
  const newFilePaths = new Set(newDictionaries.map((d) => d.filePath));
  const newKeys = new Set(newDictionaries.map((d) => d.key));

  for (const [key, dictionariesArray] of Object.entries(
    allUnmergedDictionaries
  )) {
    // Skip if this is a new key we're about to write
    if (newKeys.has(key)) continue;

    // Check if any dictionary in this group came from the file we're updating
    for (const dict of dictionariesArray) {
      if (newFilePaths.has(dict.filePath)) {
        oldKeysToDelete.add(key);
        appLogger(
          `Detected key change in ${formatPath(dict.filePath)}: "${key}" will be removed`,
          { isVerbose: true }
        );
        break;
      }
    }
  }

  // Delete old dictionary files
  for (const oldKey of oldKeysToDelete) {
    try {
      // Delete unmerged dictionary
      const unmergedPath = resolve(
        config.content.unmergedDictionariesDir,
        `${oldKey}.json`
      );
      await unlink(unmergedPath).catch(() => {});

      // Delete merged dictionary
      const mergedPath = resolve(
        config.content.dictionariesDir,
        `${oldKey}.json`
      );
      await unlink(mergedPath).catch(() => {});

      // Delete type file
      const typePath = resolve(config.content.typesDir, `${oldKey}.ts`);
      await unlink(typePath).catch(() => {});

      appLogger(`Cleaned up old dictionary files for key: "${oldKey}"`, {
        isVerbose: true,
      });
    } catch (error) {
      // Ignore cleanup errors, they're not critical
    }
  }

  const dictionariesOutput = await buildDictionary(newDictionaries, config);
  const updatedDictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  const allDictionariesPaths: string[] = await getBuiltDictionariesPath(config);

  createTypes(updatedDictionariesPaths, config);
  appLogger('TypeScript types built', {
    isVerbose: true,
  });

  // Always rebuild entry point and module augmentation if keys were deleted
  const needsFullRebuild =
    oldKeysToDelete.size > 0 ||
    updatedDictionariesPaths.some(
      (updatedDictionaryPath) =>
        !allDictionariesPaths.includes(updatedDictionaryPath)
    );

  if (needsFullRebuild) {
    await createDictionaryEntryPoint(config);

    appLogger('Dictionary list rebuilt', {
      isVerbose: true,
    });
  }

  // Always regenerate module augmentation to update TypeScript registry
  await createModuleAugmentation(config);

  appLogger('Module augmentation rebuilt', {
    isVerbose: true,
  });

  // Plugin transformation
  // Allow plugins to post-process the final build output (e.g., write back ICU JSON)
  for await (const plugin of config.plugins ?? []) {
    const { unmergedDictionaries, mergedDictionaries } = dictionariesOutput;

    await plugin.afterBuild?.({
      dictionaries: {
        unmergedDictionaries,
        mergedDictionaries,
      },
      configuration: config,
    });
  }
};
