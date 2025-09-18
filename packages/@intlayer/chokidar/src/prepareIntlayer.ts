import {
  ESMxCJSRequire,
  type IntlayerConfig,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { cleanOutputDir } from './cleanOutputDir';
import { listDictionaries } from './listDictionariesPath';
import { loadDictionaries } from './loadDictionaries/loadDictionaries';
import { buildDictionary } from './transpiler/declaration_file_to_dictionary/index';
import { writeRemoteDictionary } from './transpiler/declaration_file_to_dictionary/intlayer_dictionary/writeRemoteDictionary';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createModuleAugmentation,
  createTypes,
} from './transpiler/dictionary_to_type/index';
import { writeConfiguration } from './writeConfiguration';

export const prepareIntlayer = async (
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire,
  clean = false
) => {
  const appLogger = getAppLogger(configuration);

  if (clean) {
    cleanOutputDir(configuration);
  }

  const files: string[] = listDictionaries(configuration);

  const dictionaries = await loadDictionaries(
    files,
    configuration,
    projectRequire
  );

  // Build locale dictionaries
  const dictionariesOutput = await buildDictionary(
    dictionaries.localDictionaries,
    configuration
  );

  // Write remote dictionaries
  // Used as cache for next fetch
  await writeRemoteDictionary(dictionaries.remoteDictionaries, configuration);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  createTypes(dictionariesPaths);

  createDictionaryEntryPoint(configuration);

  appLogger('Dictionaries built');

  createModuleAugmentation(configuration);

  appLogger('Module augmentation built', {
    isVerbose: true,
  });

  writeConfiguration(configuration);

  appLogger('Configuration written', {
    isVerbose: true,
  });
};
