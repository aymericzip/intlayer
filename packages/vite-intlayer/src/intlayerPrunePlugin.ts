// @ts-ignore - Fix error Module '"vite"' has no exported member
import { intlayerBabelPlugin } from '@intlayer/babel';
import { ESMxCJSRequire } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import fg from 'fast-glob';
import { join } from 'path';
import { type PluginOption } from 'vite';

export const IntlayerPrunePlugin = (): PluginOption => {
  const { optimize, activateDynamicImport, traversePattern } =
    configuration.build;
  const { dictionariesDir, dynamicDictionariesDir, mainDir, baseDir } =
    configuration.content;

  const filesListPattern = fg
    .sync(traversePattern, {
      cwd: baseDir,
    })
    .map((file) => join(baseDir, file));

  return {
    name: 'vite-intlayer-babel-transform',
    enforce: 'post', // Run after other transformations as vue
    transform(code, id) {
      const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
      const dynamicDictionariesEntryPath = join(
        mainDir,
        'dynamic_dictionaries.mjs'
      );

      const filesList = [
        ...filesListPattern,
        dictionariesEntryPath, // should add dictionariesEntryPath to replace it by a empty object if import made dynamic
      ];

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

      try {
        const babel = ESMxCJSRequire('@babel/core');

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
                activateDynamicImport,
                filesList,
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
      } catch (error) {
        console.warn('Failed to transform with Babel plugin:', error);
      }

      return null;
    },
  };
};
