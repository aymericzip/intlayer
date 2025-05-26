// @ts-ignore - Fix error Module '"vite"' has no exported member
import { babelPluginIntlayer } from '@intlayer/babel';
import { ESMxCJSRequire } from '@intlayer/config';
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
      const result = babel.transformSync(code, {
        filename: id,
        plugins: [babelPluginIntlayer],
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
});
