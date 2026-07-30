import { readFile } from 'node:fs/promises';
import { builtinModules, createRequire } from 'node:module';
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
        // Direct alias match
        if (aliases[args.path]) {
          return {
            path: aliases[args.path],
            external: true, // Prevents inlining and context loss
          };
        }

        // Dynamic resolution, importer first then user workspace.
        //
        // The importer takes priority so the bundle always keeps the
        // `@intlayer/*` copy the importing file itself depends on. Resolving
        // only from the project root lets Node walk past the project when the
        // package is not installed there, and pick up an unrelated
        // `node_modules` in a parent directory — which silently mixes two
        // different Intlayer installations into the same bundle.
        if (args.path === 'defu' || args.path.startsWith('@intlayer/')) {
          const importerRequire = args.importer
            ? createRequire(args.importer)
            : undefined;

          for (const resolver of [importerRequire, rootRequire]) {
            if (!resolver) continue;

            try {
              return {
                path: resolver.resolve(args.path),
                external: true, // Injects `require('/absolute/path')`
              };
            } catch {
              // Try the next resolver, then let esbuild resolve it itself.
            }
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
