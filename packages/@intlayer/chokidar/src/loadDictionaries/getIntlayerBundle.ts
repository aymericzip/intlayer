import { readFile } from 'node:fs/promises';
import { builtinModules } from 'node:module';
import { join } from 'node:path';
import { bundleFile, type ESBuildPlugin } from '@intlayer/config/file';
import { getProjectRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Rewrites bare specifiers to absolute paths on the user's disk and externalizes them
 * to preserve directory context (__dirname/import.meta.url).
 */
const localResolvePlugin = (
  aliases: Record<string, string>,
  rootRequire: NodeJS.Require
): ESBuildPlugin => {
  return {
    name: 'local-resolve',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        // 1. Direct alias match
        if (aliases[args.path]) {
          return {
            path: aliases[args.path],
            external: true, // Prevents inlining and context loss
          };
        }

        // 2. Dynamic resolution via user workspace
        if (args.path === 'defu' || args.path.startsWith('@intlayer/')) {
          try {
            const absolutePath = rootRequire.resolve(args.path);
            return {
              path: absolutePath,
              external: true, // Injects `require('/absolute/path')`
            };
          } catch {
            return null;
          }
        }

        return null;
      });
    },
  };
};

export const getIntlayerBundle = async (configuration: IntlayerConfig) => {
  const rootRequire = getProjectRequire(configuration.system.baseDir);

  const configurationPath = join(
    configuration.system.configDir,
    `configuration.cjs`
  );

  const aliases = {
    '@intlayer/config/built': configurationPath,
  };

  const filePath = rootRequire.resolve('intlayer');
  const code = await readFile(filePath, 'utf-8');

  const output = await bundleFile(code, filePath, {
    bundle: true,
    platform: 'node',
    external: [
      ...builtinModules,
      ...builtinModules.map((mod) => `node:${mod}`),
      'vscode',
      'esbuild',
    ],
    minify: true,
    plugins: [localResolvePlugin(aliases, rootRequire)],
  });

  return output ?? '';
};
