import { createRequire } from 'node:module';
import { isAbsolute, join } from 'node:path';
import { intlayerOptimizeBabelPlugin } from '@intlayer/babel';
import { runOnce } from '@intlayer/chokidar';
import { getAppLogger } from '@intlayer/config';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';
import type { PluginOption } from 'vite';

export const intlayerPrune = (
  intlayerConfig: IntlayerConfig
): PluginOption[] => {
  try {
    const localeRequire = createRequire(import.meta.url);
    const babel = localeRequire('@babel/core');
    const logger = getAppLogger(intlayerConfig);

    const { importMode, traversePattern, optimize } = intlayerConfig.build;

    const {
      dictionariesDir,
      dynamicDictionariesDir,
      unmergedDictionariesDir,
      fetchDictionariesDir,
      mainDir,
      baseDir,
    } = intlayerConfig.content;

    const filesListPattern = fg
      .sync(traversePattern, {
        cwd: baseDir,
      })
      .map((file) => {
        if (isAbsolute(file)) {
          return file;
        }
        return join(baseDir, file);
      });

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
    const liveSyncKeys = Object.values(dictionaries)
      .filter((dictionary) => dictionary.live)
      .map((dictionary) => dictionary.key);

    return [
      {
        /**
         * On vue, we pre-insert the 'await' to the useIntlayer call
         * It will trigger the transformation of the async call by the vue compiler
         *
         * Then the second plugin will make the second transformation to replace the useIntlayer call by the useDictionaryDynamic call
         */
        name: 'vite-intlayer-simple-transform',
        enforce: 'pre', // Run before Vue so Vue sees the 'await'
        transform(code, id) {
          // 1. Only process .vue (and maybe .ts/.js) files
          if (!id.endsWith('.vue') && !id.match(/\.[jt]sx?$/)) return null;

          // 2. Check if the file actually uses the composable to avoid unnecessary work
          if (!code.includes('useIntlayer')) return null;

          // B. Add 'await' to the function call
          //    Matches: useIntlayer(args) -> await useIntlayer(args)
          //    Note: Since we aliased the import above, 'useIntlayer' now refers to 'useDictionaryAsync'
          const transformedCode = code.replace(
            /(\s+|=\s*)useIntlayer\s*\(/g,
            '$1await useIntlayer('
          );

          return {
            code: transformedCode,
            map: null, // Simple string replace doesn't strictly need a sourcemap for this case
          };
        },
      },
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
                  liveSyncKeys,
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
