import {
  ANSIColors,
  ESMxCJSRequire,
  type IntlayerConfig,
  colorize,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import packageJson from '@intlayer/config/package.json' with { type: 'json' };
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { writeRemoteDictionary } from './buildIntlayerDictionary/writeRemoteDictionary';
import { cleanOutputDir } from './cleanOutputDir';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint/createDictionaryEntryPoint';
import { createModuleAugmentation, createTypes } from './createType/index';
import { listDictionaries } from './listDictionariesPath';
import { loadDictionaries } from './loadDictionaries/loadDictionaries';
import { writeConfiguration } from './writeConfiguration';

export const prepareIntlayer = async (
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire,
  clean = false,
  format: ('cjs' | 'esm')[] = ['cjs', 'esm']
) => {
  const appLogger = getAppLogger(configuration);
  const preparationStartMs = Date.now();

  appLogger([
    'Preparing Intlayer',
    colorize(`(v${packageJson.version})`, ANSIColors.GREY_DARK),
  ]);

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

  appLogger(
    [
      'Content loaded',
      colorize(
        [
          dictionaries.remoteDictionaries.length > 0
            ? ` (Total: ${dictionariesLoadedTime - preparationStartMs}ms - Local: ${dictionaries.time.localDictionaries}ms - Remote: ${dictionaries.time.remoteDictionaries}ms)`
            : `(${dictionariesLoadedTime - preparationStartMs}ms)`,
        ].join(''),
        ANSIColors.GREY_DARK
      ),
    ],
    {
      isVerbose: true,
    }
  );

  // Build local dictionaries
  const dictionariesOutput = await buildDictionary(
    [...dictionaries.localDictionaries, ...dictionaries.remoteDictionaries],
    configuration,
    format,
    false
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
