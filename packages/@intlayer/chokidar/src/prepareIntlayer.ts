import { join } from 'node:path';
import {
  ANSIColors,
  colorize,
  ESMxCJSRequire,
  getAppLogger,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
import packageJson from '@intlayer/config/package.json' with { type: 'json' };
import { buildDictionary } from './buildIntlayerDictionary/buildIntlayerDictionary';
import { writeRemoteDictionary } from './buildIntlayerDictionary/writeRemoteDictionary';
import { cleanOutputDir } from './cleanOutputDir';
import { createDictionaryEntryPoint } from './createDictionaryEntryPoint/createDictionaryEntryPoint';
import { createModuleAugmentation, createTypes } from './createType/index';
import { listDictionaries } from './listDictionariesPath';
import { loadDictionaries } from './loadDictionaries/loadDictionaries';
import { runOnce } from './utils/runOnce';
import { writeConfiguration } from './writeConfiguration';

type PrepareIntlayerOptions = {
  projectRequire?: NodeJS.Require;
  clean?: boolean;
  format?: ('cjs' | 'esm')[];
  forceRun?: boolean;
  onIsCached?: () => void | Promise<void>;
};

const DEFAULT_PREPARE_INTLAYER_OPTIONS = {
  projectRequire: ESMxCJSRequire,
  clean: false,
  format: ['cjs', 'esm'],
  forceRun: false,
} satisfies PrepareIntlayerOptions;

export const prepareIntlayer = async (
  configuration: IntlayerConfig = getConfiguration(),
  options?: PrepareIntlayerOptions
) => {
  const { projectRequire, clean, format, forceRun, onIsCached } = {
    ...DEFAULT_PREPARE_INTLAYER_OPTIONS,
    ...(options ?? {}),
  };
  const appLogger = getAppLogger(configuration);

  const sentinelPath = join(
    configuration.content.cacheDir,
    'intlayer-prepared.lock'
  );

  // Skip preparation if it has already been done recently
  await runOnce(
    sentinelPath,
    async () => {
      const { plugins } = configuration;

      const preparationStartMs = Date.now();

      appLogger([
        'Preparing Intlayer',
        colorize(`(v${packageJson.version})`, ANSIColors.GREY_DARK),
      ]);

      if (clean) {
        cleanOutputDir(configuration);
      }

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
                ? ` (Total: ${dictionariesLoadedTime - configurationWrittenTime}ms - Local: ${dictionaries.time.localDictionaries}ms - Remote: ${dictionaries.time.remoteDictionaries}ms)`
                : `(${dictionariesLoadedTime - configurationWrittenTime}ms)`,
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
        [
          ...dictionaries.localDictionaries,
          ...dictionaries.remoteDictionaries,
          ...dictionaries.pluginDictionaries,
        ],
        configuration,
        format,
        false
      );

      // Write remote dictionaries
      // Used as cache for next fetch
      await writeRemoteDictionary(
        dictionaries.remoteDictionaries,
        configuration
      );

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

      // Plugin transformation
      // Allow plugins to post-process the final build output (e.g., write back ICU JSON)
      for await (const plugin of plugins ?? []) {
        const { unmergedDictionaries, mergedDictionaries } = dictionariesOutput;

        await plugin.afterBuild?.({
          dictionaries: {
            unmergedDictionaries,
            mergedDictionaries,
          },
          configuration,
        });
      }

      const preparationElapsedMs = Date.now() - preparationStartMs;
      appLogger(
        [`Done`, colorize(`${preparationElapsedMs}ms`, ANSIColors.GREEN)],
        {
          level: 'info',
          isVerbose: true,
        }
      );
    },
    { forceRun, onIsCached }
  );
};
