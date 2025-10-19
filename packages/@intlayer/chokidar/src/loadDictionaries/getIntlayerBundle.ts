import { readFile } from 'node:fs/promises';
import { builtinModules, createRequire } from 'node:module';
import { relative } from 'node:path';
import type { ESBuildPlugin } from '@intlayer/config';
import { bundleFile, ESMxCJSRequire, isESModule } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';

const replaceBuiltConfigurationPlugin = (
  configuration: IntlayerConfig
): ESBuildPlugin => {
  const VIRTUAL_NS = 'intlayer-config-virtual';
  const VIRTUAL_ID = '@intlayer/config/built';

  return {
    name: 'replace-built-configuration',
    setup(build) {
      // Resolve the virtual module id
      build.onResolve({ filter: new RegExp(`^${VIRTUAL_ID}$`) }, () => ({
        path: VIRTUAL_ID,
        namespace: VIRTUAL_NS,
      }));

      // Load the provided configuration as the virtual module's contents
      build.onLoad({ filter: /.*/, namespace: VIRTUAL_NS }, () => ({
        contents: JSON.stringify(configuration),
        loader: 'json',
      }));
    },
  };
};

/** Escape a string for literal use inside a RegExp */
const escapeForRegex = (input: string) =>
  input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Rewrites selected bare specifiers (and any of their subpaths) to absolute file paths,
 * using the provided localeRequire (either createRequire(import.meta.url) or require).
 *
 * Example:
 *   rewritePathsPlugin(["@intlayer/config", "@intlayer/core"], localeRequire)
 * …will also rewrite "@intlayer/core/file" etc.
 */
const rewritePathsPlugin = (
  replaceModules: Record<string, string>
): ESBuildPlugin => {
  return {
    name: 'rewrite-paths',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const exact = replaceModules[args.path];
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
export const getIntlayerBundle = async (configuration: IntlayerConfig) => {
  const rootRequire = ESMxCJSRequire;
  const localRequire = isESModule ? createRequire(import.meta.url) : require;

  const configLocation = localRequire.resolve('@intlayer/config');

  const configPackageRequire = createRequire(configLocation);

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
    ],
    plugins: [
      replaceBuiltConfigurationPlugin(configuration),
      rewritePathsPlugin(replaceModules),
    ],
  });

  return output ?? '';
};
