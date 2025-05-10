import {
  ESMxCJSRequire,
  type IntlayerConfig,
  appLogger,
  getConfiguration,
} from '@intlayer/config';
import { cleanOutputDir } from './cleanOutputDir';
import { listDictionaries } from './listDictionariesPath';
import { loadDictionaries } from './loadDictionaries/loadDictionaries';
import { buildDictionary } from './transpiler/declaration_file_to_dictionary/index';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createModuleAugmentation,
  createTypes,
} from './transpiler/dictionary_to_type/index';
import { writeConfiguration } from './writeConfiguration';

export const prepareIntlayer = async (
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire
) => {
  cleanOutputDir(configuration);

  appLogger('Output directory cleaned', {
    isVerbose: true,
  });

  const files: string[] = listDictionaries(configuration);

  const dictionaries = await loadDictionaries(
    files,
    configuration,
    projectRequire
  );

  // Build locale dictionaries
  const dictionariesPaths = await buildDictionary(dictionaries, configuration);

  createTypes(dictionariesPaths, configuration);

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
