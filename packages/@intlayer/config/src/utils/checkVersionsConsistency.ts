import type { IntlayerConfig } from '@intlayer/types';
import packageJson from '@intlayer/types/package.json' with { type: 'json' };
import { getAppLogger } from '../logger';

const packages = [
  '@intlayer/types',
  '@intlayer/config',
  '@intlayer/dictionaries-entry',
  '@intlayer/unmerged-dictionaries-entry',
  '@intlayer/dynamic-dictionaries-entry',
  '@intlayer/remote-dictionaries-entry',
  '@intlayer/fetch-dictionaries-entry',
  '@intlayer/api',
  '@intlayer/chokidar',
  '@intlayer/webpack',
  '@intlayer/editor',
  '@intlayer/cli',
  '@intlayer/babel',
  '@intlayer/swc',
  '@intlayer/editor-react',
  'intlayer',
  '@intlayer/docs',
  '@intlayer/mcp',
  'intlayer-cli',
  'express-intlayer',
  'apps/backend',
  'react-intlayer',
  'next-intlayer',
  'react-scripts-intlayer',
  'vue-intlayer',
  'solid-intlayer',
  'svelte-intlayer',
  'preact-intlayer',
  'angular-intlayer',
  'vite-intlayer',
  'nuxt-intlayer',
  'astro-intlayer',
  'react-native-intlayer',
  'lynx-intlayer',
  '@intlayer/design-system',
  'intlayer-editor',
  'plugins/sync-json-plugin',
];

export const checkVersionsConsistency = async (
  configuration: IntlayerConfig
) => {
  const logger = getAppLogger(configuration);
  const packagesMap = (
    await Promise.all(
      packages.map(async (packageName) => {
        try {
          const pkgJson = await import(`${packageName}/package.json`, {
            with: { type: 'json' },
          }).then((mod) => mod.default);

          return { name: packageName, version: pkgJson.version };
        } catch {
          // Can't find, it's ok
        }

        return null;
      })
    )
  ).filter(
    (packageData): packageData is { name: string; version: string } =>
      packageData !== null
  );

  if (packagesMap.length === 0) {
    return;
  }

  const expectedVersion =
    packagesMap[packagesMap.length - 1]?.version ?? packageJson.version;

  const inconsistentPackages = packagesMap.filter(
    ({ version }) => version !== expectedVersion
  );

  if (inconsistentPackages.length === 0) return;

  logger(
    `Versions are not consistent. The expected version (based on the latest listed package) is ${expectedVersion}. See how to fix it here: https://intlayer.org/frequent-questions/package-version-error`,
    { level: 'warn' }
  );

  for (const { name, version } of inconsistentPackages) {
    logger(`- ${name} - version: ${version} - expected: ${expectedVersion}`, {
      level: 'warn',
    });
  }
};
