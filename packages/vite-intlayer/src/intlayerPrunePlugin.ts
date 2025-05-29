// @ts-ignore - Fix error Module '"vite"' has no exported member
import { intlayerBabelPlugin } from '@intlayer/babel';
import { ESMxCJSRequire } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { join } from 'path';
import { type PluginOption } from 'vite';

export const IntlayerPrunePlugin = (): PluginOption => ({
  name: 'vite-intlayer-babel-transform',
  transform(code, id) {
    // Only transform React/TypeScript files
    const fileExtensionPattern = /\.(tsx?|jsx?|vue|svelte|cjs|mjs|js|cjx|mjx)$/;
    if (!fileExtensionPattern.test(id)) {
      return null;
    }

    // Only transform files that contain useIntlayer
    if (!code.includes('useIntlayer')) {
      return null;
    }

    try {
      const babel = ESMxCJSRequire('@babel/core');
      const dictionariesPath = join(
        configuration.content.mainDir,
        'dictionaries.mjs'
      );

      const result = babel.transformSync(code, {
        filename: id,
        plugins: [
          [
            intlayerBabelPlugin,
            {
              //  absolute or relative to your repo root — wherever the *.json
              //  dictionaries land after “intlayer build-dictionaries”
              dictionariesDir: configuration.content.dictionariesDir,
              //  if you also rely on it:
              dictionariesEntryPath: dictionariesPath,
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

      console.log(result.code);

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
});
