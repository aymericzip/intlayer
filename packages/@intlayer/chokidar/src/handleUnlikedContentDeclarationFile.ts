import { getAppLogger, type IntlayerConfig } from '@intlayer/config';
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint/createDictionaryEntryPoint';
import { createTypes } from './createType';
import { createModuleAugmentation } from './createType/createModuleAugmentation';
import { listDictionaries } from './listDictionariesPath';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { formatPath } from './utils/formatter';

export const handleUnlinkedContentDeclarationFile = async (
  filePath: string,
  config: IntlayerConfig
) => {
  const appLogger = getAppLogger(config);

  // Process the file with the functionToRun
  appLogger(`Unlinked detected: ${formatPath(filePath)}`, {
    isVerbose: true,
  });

  const files: string[] = listDictionaries(config);

  const localeDictionaries = await loadLocalDictionaries(files, config);

  const dictionariesOutput = await buildDictionary(localeDictionaries, config);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  await createTypes(dictionariesPaths);

  await createDictionaryEntryPoint();

  appLogger('Dictionaries rebuilt', {
    isVerbose: true,
  });

  await createModuleAugmentation();

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
