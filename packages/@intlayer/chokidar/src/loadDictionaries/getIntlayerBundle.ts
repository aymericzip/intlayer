import { readFile } from 'node:fs/promises';
import { builtinModules, createRequire } from 'node:module';
import type { ESBuildPlugin } from '@intlayer/config';
import {
  bundleFile,
  configESMxCJSRequire,
  ESMxCJSRequire,
  isESModule,
} from '@intlayer/config';

/**
 * Rewrites selected bare specifiers (and any of their subpaths) to absolute file paths,
 * using the provided localeRequire (either createRequire(import.meta.url) or require).
 *
 * Example:
 *   rewritePathsPlugin(["@intlayer/config", "@intlayer/core"], localeRequire)
 * …will also rewrite "@intlayer/core/file" etc.
 */
const rewritePathsPlugin = (
  replaceModules: Record<string, string>,
  excludeModules?: string[]
): ESBuildPlugin => {
  return {
    name: 'rewrite-paths',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const exact = replaceModules[args.path];

        if (excludeModules?.includes(args.path)) {
          return null;
        }

        if (exact) {
          return {
            path: exact,
            namespace: 'intlayer-replace-modules',
            external: true, // ← prevents onLoad requirement
          };
        }

        // Optional: support subpaths like "@intlayer/core/xyz"
        for (const key of Object.keys(replaceModules)) {
          if (args.path === key || args.path.startsWith(`${key}/`)) {
            const sub = args.path.slice(key.length); // '' or '/...'
            return {
              path: replaceModules[key] + sub,
              namespace: 'intlayer-replace-modules',
              external: true, // ← prevents onLoad requirement
            };
          }
        }
      });
    },
  };
};

/**
 * Get the intlayer bundle to embed @intlayer/core and be able to mock @intlayer/config/built to mock the configuration file.
 */
export const getIntlayerBundle = async () => {
  const rootRequire = ESMxCJSRequire;
  const configPackageRequire = configESMxCJSRequire;
  const localRequire = isESModule ? createRequire(import.meta.url) : require;

  const replaceModules = {
    deepmerge: localRequire.resolve('deepmerge'),
    esbuild: configPackageRequire.resolve('esbuild'),
    '@intlayer/config': localRequire.resolve('@intlayer/config'),
    '@intlayer/core/file': localRequire.resolve('@intlayer/core/file'),
  };

  const filePath = rootRequire.resolve('intlayer');
  const code = await readFile(filePath, 'utf-8');

  const output = await bundleFile(code, filePath, {
    external: [
      ...builtinModules,
      ...builtinModules.map((mod) => `node:${mod}`),
      '@intlayer/config/built',
    ],
    plugins: [rewritePathsPlugin(replaceModules, ['@intlayer/config/built'])],
  });

  return output ?? '';
};
