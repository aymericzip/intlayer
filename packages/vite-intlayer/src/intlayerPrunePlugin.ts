import { join } from 'node:path';
import { intlayerBabelPlugin } from '@intlayer/babel';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';
import type { PluginOption } from 'vite';

export const intlayerPrune = (intlayerConfig: IntlayerConfig): PluginOption => {
  try {
    const babel = require('@babel/core');

    const { optimize, importMode, traversePattern } = intlayerConfig.build;

    const {
      dictionariesDir,
      dynamicDictionariesDir,
      fetchDictionariesDir,
      mainDir,
      baseDir,
    } = intlayerConfig.content;

    const filesListPattern = fg
      .sync(traversePattern, {
        cwd: baseDir,
      })
      .map((file) => join(baseDir, file));

    const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
    const dynamicDictionariesEntryPath = join(
      mainDir,
      'dynamic_dictionaries.mjs'
    );

    const filesList = [
      ...filesListPattern,
      dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
    ];

    const dictionaries = getDictionaries();
    const liveSyncKeys = Object.values(dictionaries)
      .filter((dictionary) => dictionary.live)
      .map((dictionary) => dictionary.key);

    return {
      name: 'vite-intlayer-babel-transform',
      enforce: 'post', // Run after other transformations as vue
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
        if (!optimize) return null;

        const result = babel.transformSync(code, {
          filename,
          plugins: [
            [
              intlayerBabelPlugin,
              {
                dictionariesDir,
                dictionariesEntryPath,
                dynamicDictionariesDir,
                dynamicDictionariesEntryPath,
                fetchDictionariesDir,
                importMode,
                filesList,
                replaceDictionaryEntry: false,
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
    };
  } catch (error) {
    console.warn('Failed to transform with Babel plugin:', error);

    return null;
  }
};
