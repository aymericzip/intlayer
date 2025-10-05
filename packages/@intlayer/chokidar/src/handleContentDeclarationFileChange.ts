import { getAppLogger, type IntlayerConfig } from '@intlayer/config';
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint/createDictionaryEntryPoint';
import { getBuiltDictionariesPath } from './createDictionaryEntryPoint/getBuiltDictionariesPath';
import { createTypes } from './createType';
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

  const allDictionariesPaths: string[] = getBuiltDictionariesPath(config);

  createTypes(updatedDictionariesPaths);
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
};
