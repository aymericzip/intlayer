import { normalize } from 'node:path';
import { getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { cleanRemovedContentDeclaration } from './cleanRemovedContentDeclaration';
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

  const files: string[] = await listDictionaries(config);

  const existingFiles = files.filter(
    (file) => normalize(file) !== normalize(filePath)
  );

  const localeDictionaries = await loadLocalDictionaries(existingFiles, config);

  await cleanRemovedContentDeclaration(filePath, [], config);

  const dictionariesOutput = await buildDictionary(localeDictionaries, config);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  await createTypes(dictionariesPaths, config);

  appLogger('Dictionaries rebuilt', {
    isVerbose: true,
  });

  await createModuleAugmentation(config);

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
