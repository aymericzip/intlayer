import type { IntlayerConfig } from '@intlayer/types';
import packageJson from '@intlayer/types/package.json' with { type: 'json' };
import { ANSIColors, colorize, getAppLogger } from '../logger';
import { compareVersions } from './compareVersions';

const packages = {
  '@intlayer/types': () => import('@intlayer/types/package.json'),
  '@intlayer/config': () => import('@intlayer/config/package.json'),
  '@intlayer/dictionaries-entry': () =>
    import('@intlayer/dictionaries-entry/package.json'),
  '@intlayer/unmerged-dictionaries-entry': () =>
    import('@intlayer/unmerged-dictionaries-entry/package.json'),
  '@intlayer/dynamic-dictionaries-entry': () =>
    import('@intlayer/dynamic-dictionaries-entry/package.json'),
  '@intlayer/remote-dictionaries-entry': () =>
    import('@intlayer/remote-dictionaries-entry/package.json'),
  '@intlayer/fetch-dictionaries-entry': () =>
    import('@intlayer/fetch-dictionaries-entry/package.json'),
  '@intlayer/api': () => import('@intlayer/api/package.json'),
  '@intlayer/chokidar': () => import('@intlayer/chokidar/package.json'),
  '@intlayer/webpack': () => import('@intlayer/webpack/package.json'),
  '@intlayer/editor': () => import('@intlayer/editor/package.json'),
  '@intlayer/cli': () => import('@intlayer/cli/package.json'),
  '@intlayer/babel': () => import('@intlayer/babel/package.json'),
  '@intlayer/swc': () => import('@intlayer/swc/package.json'),
  '@intlayer/editor-react': () => import('@intlayer/editor-react/package.json'),
  intlayer: () => import('intlayer/package.json'),
  '@intlayer/mcp': () => import('@intlayer/mcp/package.json'),
  'intlayer-cli': () => import('intlayer-cli/package.json'),
  'express-intlayer': () => import('express-intlayer/package.json'),
  '@intlayer/backend': () => import('@intlayer/backend/package.json'),
  'react-intlayer': () => import('react-intlayer/package.json'),
  'next-intlayer': () => import('next-intlayer/package.json'),
  'react-scripts-intlayer': () => import('react-scripts-intlayer/package.json'),
  'vue-intlayer': () => import('vue-intlayer/package.json'),
  'solid-intlayer': () => import('solid-intlayer/package.json'),
  'svelte-intlayer': () => import('svelte-intlayer/package.json'),
  'preact-intlayer': () => import('preact-intlayer/package.json'),
  'angular-intlayer': () => import('angular-intlayer/package.json'),
  'vite-intlayer': () => import('vite-intlayer/package.json'),
  'nuxt-intlayer': () => import('nuxt-intlayer/package.json'),
  'astro-intlayer': () => import('astro-intlayer/package.json'),
  'react-native-intlayer': () => import('react-native-intlayer/package.json'),
  'lynx-intlayer': () => import('lynx-intlayer/package.json'),
  '@intlayer/design-system': () =>
    import('@intlayer/design-system/package.json'),
  'intlayer-editor': () => import('intlayer-editor/package.json'),
  '@intlayer/sync-json-plugin': () =>
    import('@intlayer/sync-json-plugin/package.json'),
} as const;

export const checkVersionsConsistency = async (
  configuration: IntlayerConfig
) => {
  const logger = getAppLogger(configuration);
  const packagesMap = (
    await Promise.all(
      Object.entries(packages).map(async ([packageName, packageFn]) => {
        try {
          const pkgJson = await packageFn();

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
