import { type IntlayerConfig, getAppLogger } from '@intlayer/config';
import { listDictionaries } from './listDictionariesPath';
import { loadLocalDictionaries } from './loadDictionaries/loadLocalDictionaries';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import { createTypes } from './transpiler/dictionary_to_type';
import { createModuleAugmentation } from './transpiler/dictionary_to_type/createModuleAugmentation';
import { buildDictionary } from './transpiler/intlayer_dictionary/buildIntlayerDictionary';
import { formatPath } from './utils/formatter';

export const handleUnlikedContentDeclarationFile = async (
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
};
