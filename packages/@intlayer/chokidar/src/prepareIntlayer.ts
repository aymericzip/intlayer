import {
  ANSIColors,
  ESMxCJSRequire,
  type IntlayerConfig,
  colorize,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { cleanOutputDir } from './cleanOutputDir';
import { listDictionaries } from './listDictionariesPath';
import { loadDictionaries } from './loadDictionaries/loadDictionaries';
import { createDictionaryEntryPoint } from './transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createModuleAugmentation,
  createTypes,
} from './transpiler/dictionary_to_type/index';
import { buildDictionary } from './transpiler/intlayer_dictionary/buildIntlayerDictionary';
import { writeRemoteDictionary } from './transpiler/intlayer_dictionary/writeRemoteDictionary';
import { writeConfiguration } from './writeConfiguration';

export const prepareIntlayer = async (
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire,
  clean = false
) => {
  const appLogger = getAppLogger(configuration);
  const preparationStartMs = Date.now();

  if (clean) {
    cleanOutputDir(configuration);
  }

  const files: string[] = listDictionaries(configuration);

  const dictionaries = await loadDictionaries(
    files,
    configuration,
    projectRequire
  );

  const dictionariesLoadedTime = Date.now();

  appLogger([
    'Dictionaries loaded',
    colorize(
      [
        `(Total: ${dictionariesLoadedTime - preparationStartMs}ms - Local: ${dictionaries.time.localDictionaries}ms`,
        dictionaries.remoteDictionaries.length > 0
          ? ` - Remote: ${dictionaries.time.remoteDictionaries}ms`
          : '',
        ')',
      ].join(''),
      ANSIColors.GREY_DARK
    ),
  ]);

  // Build local dictionaries
  const dictionariesOutput = await buildDictionary(
    [...dictionaries.localDictionaries, ...dictionaries.remoteDictionaries],
    configuration
  );

  // Write remote dictionaries
  // Used as cache for next fetch
  await writeRemoteDictionary(dictionaries.remoteDictionaries, configuration);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

  await createTypes(dictionariesPaths);

  await createDictionaryEntryPoint(configuration);

  const dictionariesBuiltTime = Date.now();

  appLogger([
    'Dictionaries built',
    colorize(
      `(${dictionariesBuiltTime - preparationStartMs}ms)`,
      ANSIColors.GREY_DARK
    ),
  ]);

  await createModuleAugmentation(configuration);

  const moduleAugmentationBuiltTime = Date.now();

  appLogger(
    [
      'Module augmentation built',
      colorize(
        `(${moduleAugmentationBuiltTime - dictionariesBuiltTime}ms)`,
        ANSIColors.GREY_DARK
      ),
    ],
    {
      isVerbose: true,
    }
  );

  await writeConfiguration(configuration);

  const configurationWrittenTime = Date.now();

  appLogger(
    [
      'Configuration written',
      colorize(
        `(${configurationWrittenTime - preparationStartMs}ms)`,
        ANSIColors.GREY_DARK
      ),
    ],
    {
      isVerbose: true,
    }
  );

  const preparationElapsedMs = Date.now() - preparationStartMs;
  appLogger([`Done`, colorize(`${preparationElapsedMs}ms`, ANSIColors.GREEN)], {
    level: 'info',
    isVerbose: true,
  });
};
