import { getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { cleanRemovedContentDeclaration } from './cleanRemovedContentDeclaration';
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

  const allDictionariesPaths: string[] = await getBuiltDictionariesPath(config);

  const localeDictionaries = await loadLocalDictionaries(filePath, config);

  const dictionariesOutput = await buildDictionary(localeDictionaries, config);
  const updatedDictionaries = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  );
  const updatedDictionariesPaths = updatedDictionaries.map(
    (dictionary) => dictionary.dictionaryPath
  );

  const { excludeKeys, hasRebuilt } = await cleanRemovedContentDeclaration(
    filePath,
    localeDictionaries.map((dictionary) => dictionary.key),
    config
  );

  const hasNewDictionaries = updatedDictionariesPaths.some(
    (updatedDictionaryPath) =>
      !allDictionariesPaths.includes(updatedDictionaryPath)
  );

  // Rebuild Entry Point & Module Augmentation
  // These only need to be updated if the *list* of dictionaries changed (Add/Remove/Rename)
  if (hasRebuilt || hasNewDictionaries) {
    // If hasRebuilt is true, cleanRemovedContentDeclaration has already updated the entry point
    // to remove the old keys (and it likely included the new ones if they were already on disk).
    // If NOT hasRebuilt, we explicitly need to update the entry point to include the new dictionaries.
    if (!hasRebuilt) {
      await createDictionaryEntryPoint(config, { excludeKeys });
      appLogger('Dictionary list built', {
        isVerbose: true,
      });
    }
  }

  // Rebuild Types
  // Always regenerate types when a file changes, as the content structure (interface) might have changed
  // even if the key is the same.
  const dictionariesToBuild = updatedDictionaries.map(
    (dictionary) => dictionary.dictionary
  );

  await createTypes(dictionariesToBuild, config);
  appLogger('TypeScript types built', {
    isVerbose: true,
  });

  if (hasNewDictionaries) {
    await createModuleAugmentation(config);
    appLogger('Module augmentation built', {
      isVerbose: true,
    });
  }

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
