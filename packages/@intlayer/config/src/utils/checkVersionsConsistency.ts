import type { IntlayerConfig } from '@intlayer/types';
import packageJson from '@intlayer/types/package.json' with { type: 'json' };
import { ANSIColors, colorize, getAppLogger } from '../logger';
import { compareVersions } from './compareVersions';

const packages = [
  // Removed list because it blocks the SSR build on Vite
  // '@intlayer/types',
  // '@intlayer/config',
  // '@intlayer/dictionaries-entry',
  // '@intlayer/unmerged-dictionaries-entry',
  // '@intlayer/dynamic-dictionaries-entry',
  // '@intlayer/remote-dictionaries-entry',
  // '@intlayer/fetch-dictionaries-entry',
  // '@intlayer/api',
  // '@intlayer/chokidar',
  // '@intlayer/webpack',
  // '@intlayer/editor',
  // '@intlayer/cli',
  // '@intlayer/babel',
  // '@intlayer/swc',
  // '@intlayer/editor-react',
  // 'intlayer',
  // '@intlayer/mcp',
  // 'intlayer-cli',
  // 'express-intlayer',
  // '@intlayer/backend',
  // 'react-intlayer',
  // 'next-intlayer',
  // 'react-scripts-intlayer',
  // 'vue-intlayer',
  // 'solid-intlayer',
  // 'svelte-intlayer',
  // 'preact-intlayer',
  // 'angular-intlayer',
  // 'vite-intlayer',
  // 'nuxt-intlayer',
  // 'astro-intlayer',
  // 'react-native-intlayer',
  // 'lynx-intlayer',
  // '@intlayer/design-system',
  // 'intlayer-editor',
  // '@intlayer/sync-json-plugin',
] as const;

export const checkVersionsConsistency = async (
  configuration: IntlayerConfig
) => {
  const logger = getAppLogger(configuration);
  const packagesMap = (
    await Promise.all(
      packages.map(async (packageName) => {
        try {
          const pkgJson = await import(`${packageName}/package.json`);

          return { name: packageName, version: pkgJson.version };
        } catch {
          // Can't find, it's ok
        }
      })
    )
  ).filter(
    (
      packageData
    ): packageData is { name: (typeof packages)[number]; version: string } =>
      packageData !== null
  );

  if (packagesMap.length === 0) {
    return;
  }

  // Find the highest version among all packages
  const expectedVersion = packagesMap.reduce((latestVersion, pkg) => {
    if (!latestVersion) return pkg.version;

    return compareVersions(pkg.version, '>', latestVersion)
      ? pkg.version
      : latestVersion;
  }, packageJson.version);

  const inconsistentPackages = packagesMap.filter(
    ({ version }) => version !== expectedVersion
  );

  if (inconsistentPackages.length === 0) return;

  logger(
    colorize(
      `Versions are not consistent. The expected version (based on the latest listed package) is ${expectedVersion}. Activate verbose mode to see the list of inconsistent packages. See how to fix it here: https://intlayer.org/frequent-questions/package-version-error`,
      ANSIColors.GREY
    ),
    { level: 'warn' }
  );

  for (const { name, version } of inconsistentPackages) {
    logger(
      colorize(
        `- ${name} - version: ${version} - expected: ${expectedVersion}`,
        ANSIColors.GREY
      ),
      {
        level: 'warn',
        isVerbose: true,
      }
    );
  }
};
