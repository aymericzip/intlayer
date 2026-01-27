import { createRequire } from 'node:module';
import { join } from 'node:path';
import { intlayerOptimizeBabelPlugin } from '@intlayer/babel';
import { getComponentTransformPattern, runOnce } from '@intlayer/chokidar';
import { DefaultValues, getAppLogger } from '@intlayer/config';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import type { PluginOption } from 'vite';
import { intlayerVueAsyncPlugin } from './intlayerVueAsyncPlugin';

const INTLAYER_USAGE_REGEX = /\b(use|get)Intlayer\b/;

export const intlayerPrune = async (
  intlayerConfig: IntlayerConfig
): Promise<PluginOption[]> => {
  try {
    const localeRequire = createRequire(import.meta.url);
    const babel = localeRequire('@babel/core');
    const logger = getAppLogger(intlayerConfig);

    const { optimize } = intlayerConfig.build;
    const importMode =
      intlayerConfig.build.importMode ?? intlayerConfig.dictionary?.importMode;

    const {
      dictionariesDir,
      dynamicDictionariesDir,
      unmergedDictionariesDir,
      fetchDictionariesDir,
      mainDir,
    } = intlayerConfig.system;
    const { baseDir } = intlayerConfig.content;

    const filesListPattern = await getComponentTransformPattern(intlayerConfig);

    const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
    const unmergedDictionariesEntryPath = join(
      mainDir,
      'unmerged_dictionaries.mjs'
    );
    const dynamicDictionariesEntryPath = join(
      mainDir,
      'dynamic_dictionaries.mjs'
    );

    const filesList = [
      ...filesListPattern,
      dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
      unmergedDictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
    ];

    const dictionaries = getDictionaries(intlayerConfig);

    const dictionaryModeMap: Record<string, 'static' | 'dynamic' | 'fetch'> =
      {};

    (Object.values(dictionaries) as Dictionary[]).forEach((dictionary) => {
      dictionaryModeMap[dictionary.key] =
        dictionary.importMode ??
        importMode ??
        DefaultValues.Dictionary.IMPORT_MODE;
    });

    return [
      intlayerVueAsyncPlugin(intlayerConfig, filesList),
      {
        name: 'vite-intlayer-babel-transform',
        enforce: 'post', // Run after other transformations as vue
        apply: (_config, env) => {
          // Only apply babel plugin if optimize is enabled

          const isBuild = env.command === 'build';
          const isEnabled =
            (optimize === undefined && isBuild) || optimize === true;

          if (isEnabled) {
            runOnce(
              join(
                baseDir,
                '.intlayer',
                'cache',
                'intlayer-prune-plugin-enabled.lock'
              ),
              () => logger('Build optimization enabled'),
              {
                cacheTimeoutMs: 1000 * 10, // 10 seconds
              }
            );
          }

          return isEnabled;
        },
        transform(code, id) {
          /**
           * Transform file as
           * .../HelloWorld.vue?vue&type=script&setup=true&lang.ts
           * Into
           * .../HelloWorld.vue
           *
           * Prevention for virtual file
           */
          const filename = id.split('?', 1)[0];

          if (!filesList.includes(filename)) return null;

          const isDictionaryEntry = [
            dictionariesEntryPath,
            unmergedDictionariesEntryPath,
          ].includes(filename);

          const isUsingIntlayer = INTLAYER_USAGE_REGEX.test(code);

          const shouldTransform = isUsingIntlayer || isDictionaryEntry;

          if (!shouldTransform) return null;

          const result = babel.transformSync(code, {
            filename,
            plugins: [
              [
                intlayerOptimizeBabelPlugin,
                {
                  optimize,
                  dictionariesDir,
                  dictionariesEntryPath,
                  unmergedDictionariesEntryPath,
                  unmergedDictionariesDir,
                  dynamicDictionariesDir,
                  dynamicDictionariesEntryPath,
                  fetchDictionariesDir,
                  importMode,
                  filesList,
                  replaceDictionaryEntry: true,
                  dictionaryModeMap,
                },
              ],
            ],
            parserOpts: {
              sourceType: 'module',
              allowImportExportEverywhere: true,
              plugins: [
                'typescript',
                'jsx',
                'decorators-legacy',
                'classProperties',
                'objectRestSpread',
                'asyncGenerators',
                'functionBind',
                'exportDefaultFrom',
                'exportNamespaceFrom',
                'dynamicImport',
                'nullishCoalescingOperator',
                'optionalChaining',
              ],
            },
          });

          if (result?.code) {
            return {
              code: result.code,
              map: result.map,
            };
          }
        },
      },
    ];
  } catch (error) {
    console.warn('Failed to transform with Babel plugin:', error);

    return [];
  }
};
