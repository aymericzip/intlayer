import type { IntlayerConfig } from '@intlayer/types';
import packageJson from '@intlayer/types/package.json' with { type: 'json' };
import { getAppLogger } from '../logger';
import { getProjectRequire } from './ESMxCJSHelpers';

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

export const checkVersionsConsistency = (configuration: IntlayerConfig) => {
  const projectRequire = getProjectRequire();
  const logger = getAppLogger(configuration);
  const inconsistentPackages: { name: string; version: string }[] = [];

  try {
    for (const pkg of packages) {
      const pkgJson = projectRequire(pkg).packageJson;
      if (pkgJson.version !== packageJson.version) {
        inconsistentPackages.push({ name: pkg, version: pkgJson.version });
      }
    }
  } catch (_error) {
    // Cant find, it's ok
  }

  if (inconsistentPackages.length > 0) {
    logger(
      'Versions are not consistent. Some packages are not using the same version as the main Intlayer package. It may cause issues. See how to fix it here: https://intlayer.org/frequent-questions/package-version-error',
      { level: 'warn' }
    );
    for (const { name, version } of inconsistentPackages) {
      logger(
        `- ${name} - version: ${version} - expected: ${packageJson.version}`,
        { level: 'warn' }
      );
    }
  }
};
