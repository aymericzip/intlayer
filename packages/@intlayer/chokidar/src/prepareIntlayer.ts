import { join } from 'node:path';
import {
  ANSIColors,
  cacheDisk,
  checkVersionsConsistency,
  colorize,
  getAppLogger,
} from '@intlayer/config';
import packageJson from '@intlayer/config/package.json' with { type: 'json' };
import type { IntlayerConfig } from '@intlayer/types';
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
  clean?: boolean;
  format?: ('cjs' | 'esm')[];
  forceRun?: boolean;
  onIsCached?: () => void | Promise<void>;
};

const DEFAULT_PREPARE_INTLAYER_OPTIONS = {
  clean: false,
  format: ['cjs', 'esm'],
  forceRun: false,
} satisfies PrepareIntlayerOptions;

export const prepareIntlayer = async (
  configuration: IntlayerConfig,
  options?: PrepareIntlayerOptions
) => {
  const { clean, format, forceRun, onIsCached } = {
    ...DEFAULT_PREPARE_INTLAYER_OPTIONS,
    ...(options ?? {}),
  };

  checkVersionsConsistency(configuration);
  const appLogger = getAppLogger(configuration);

  const sentinelPath = join(
    configuration.content.cacheDir,
    'intlayer-prepared.lock'
  );

  // Clean output dir if the intlayer version has changed
  const versionCache = cacheDisk(configuration, ['intlayer-version']);
  const intlayerCacheVersion = await versionCache.get();
  if (
    clean ||
    (intlayerCacheVersion && intlayerCacheVersion !== packageJson.version)
  ) {
    await cleanOutputDir(configuration);
  }
  await versionCache.set(packageJson.version);

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

      const files: string[] = await listDictionaries(configuration);

      const dictionaries = await loadDictionaries(files, configuration);

      const dictionariesLoadedTime = Date.now();

      appLogger(
        [
          'Content loaded',
          colorize(
            [
              dictionaries.remoteDictionaries.length +
                dictionaries.pluginDictionaries.length >
              0
                ? [
                    `(Total: ${dictionariesLoadedTime - configurationWrittenTime}ms`,
                    dictionaries.localDictionaries.length > 0
                      ? `- Local: ${dictionaries.time.localDictionaries}ms`
                      : '',
                    dictionaries.remoteDictionaries.length > 0
                      ? `- Remote: ${dictionaries.time.remoteDictionaries}ms`
                      : '',
                    dictionaries.pluginDictionaries.length > 0
                      ? `- Plugin: ${dictionaries.time.pluginDictionaries}ms`
                      : '',
                    `)`,
                  ].join('')
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

      await createTypes(dictionariesPaths, configuration);

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
    {
      forceRun,
      onIsCached,
      cacheTimeoutMs: 1000 * 60 * 60, // 1 hour
    }
  );
};
