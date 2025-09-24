import { type IntlayerConfig, getAppLogger } from '@intlayer/config';
import { getBuiltDictionariesPath } from './getBuiltDictionariesPath';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import { createTypes } from './transpiler/dictionary_to_type';
import { buildDictionary } from './transpiler/intlayer_dictionary/buildIntlayerDictionary';
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
