import { readFile } from 'node:fs/promises';
import { builtinModules } from 'node:module';
import { join } from 'node:path';
import { bundleFile, type ESBuildPlugin } from '@intlayer/config/file';
import { getProjectRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Rewrites bare specifiers and subpaths to the user's local workspace paths.
 */
const localResolvePlugin = (
  aliases: Record<string, string>,
  rootRequire: NodeRequire
): ESBuildPlugin => {
  return {
    name: 'local-resolve',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        // 1. Direct alias match (e.g., config file mock)
        if (aliases[args.path]) {
          return { path: aliases[args.path] };
        }

        // 2. Dynamic resolution for defu and @intlayer subpaths via the user workspace
        if (args.path === 'defu' || args.path.startsWith('@intlayer/')) {
          try {
            return { path: rootRequire.resolve(args.path) };
          } catch {
            // Fallback: let esbuild attempt native resolution if rootRequire fails
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
