import { type IntlayerConfig, getAppLogger } from '@intlayer/config';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createModuleAugmentation,
  createTypes,
} from './transpiler/dictionary_to_type/index';
import { buildDictionary } from './transpiler/intlayer_dictionary/buildIntlayerDictionary';
import { formatPath } from './utils/formatter';

export const handleAdditionalContentDeclarationFile = async (
  filePath: string,
  config: IntlayerConfig
) => {
  const appLogger = getAppLogger(config);

  // Process the file with the functionToRun
  appLogger(`Additional file detected: ${formatPath(filePath)}`, {
    isVerbose: true,
  });

  const localeDictionaries = await loadLocalDictionaries(filePath, config);

  const dictionariesOutput = await buildDictionary(localeDictionaries, config);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  await createTypes(dictionariesPaths);

  await createDictionaryEntryPoint(config);

  appLogger('Dictionaries built', {
    isVerbose: true,
  });

  createModuleAugmentation(config);

  appLogger('Module augmentation built', {
    isVerbose: true,
  });
};
