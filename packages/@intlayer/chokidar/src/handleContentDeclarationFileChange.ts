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
  const updatedDictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  const { excludeKeys, hasRebuilt } = await cleanRemovedContentDeclaration(
    filePath,
    localeDictionaries.map((dictionary) => dictionary.key),
    config
  );

  const hasNewDictionaries = updatedDictionariesPaths.some(
    (updatedDictionaryPath) =>
      !allDictionariesPaths.includes(updatedDictionaryPath)
  );

  // Rebuild artifacts if we cleaned up old files (hasRebuilt) OR if new files were added (hasNewDictionaries)
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

    // Always regenerate types and module augmentation when keys change (rename or add)
    await createTypes(updatedDictionariesPaths, config);
    appLogger('TypeScript types built', {
      isVerbose: true,
    });

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
