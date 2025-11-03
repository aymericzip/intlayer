import { getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
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

  const localeDictionaries = await loadLocalDictionaries(filePath, config);

  const dictionariesOutput = await buildDictionary(localeDictionaries, config);
  const updatedDictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  const allDictionariesPaths: string[] = await getBuiltDictionariesPath(config);

  createTypes(updatedDictionariesPaths, config);
  appLogger('TypeScript types built', {
    isVerbose: true,
  });

  if (
    updatedDictionariesPaths.some(
      (updatedDictionaryPath) =>
        !allDictionariesPaths.includes(updatedDictionaryPath)
    )
  ) {
    await createDictionaryEntryPoint(config);

    appLogger('Dictionary list built', {
      isVerbose: true,
    });
  }

  createModuleAugmentation(config);

  appLogger('Module augmentation built', {
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
