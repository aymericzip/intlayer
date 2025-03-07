import {
  type IntlayerConfig,
  appLogger,
  getConfiguration,
} from '@intlayer/config';
import fg from 'fast-glob';
import { cleanOutputDir } from './cleanOutputDir';
import { loadDictionaries } from './loadDictionaries/loadDictionaries';
import { buildDictionary } from './transpiler/declaration_file_to_dictionary/index';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createTypes,
  createModuleAugmentation,
} from './transpiler/dictionary_to_type/index';
import { writeConfiguration } from './writeConfiguration';

export const prepareIntlayer = async (
  configuration: IntlayerConfig = getConfiguration()
) => {
  cleanOutputDir();

  appLogger('Output directory cleaned', {
    isVerbose: true,
  });

  const files: string[] = fg.sync(
    configuration.content.watchedFilesPatternWithPath,
    {
      ignore: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.github/**',
        '**/.next/**',
        '**/.expo/**',
        '**/.expo-shared/**',
        '**/.vercel/**',
        '**/.cache/**',
        '**/dist/**',
        '**/build/**',
        '**/.intlayer/**',
      ],
    }
  );

  const dictionaries = await loadDictionaries(files);

  // Build locale dictionaries
  const dictionariesPaths = await buildDictionary(dictionaries);

  createTypes(dictionariesPaths);

  createDictionaryEntryPoint();

  appLogger('Dictionaries built');

  createModuleAugmentation();

  appLogger('Module augmentation built', {
    isVerbose: true,
  });

  writeConfiguration(configuration);

  appLogger('Configuration written', {
    isVerbose: true,
  });
};
