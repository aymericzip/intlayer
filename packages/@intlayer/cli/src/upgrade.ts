import { resolve } from 'node:path';
import {
  type UpgradeIntlayerPackagesOptions,
  upgradeIntlayerPackages,
} from '@intlayer/engine/cli';
import { findProjectRoot } from './init';

/**
 * Lists the Intlayer packages of every `package.json` of the project and
 * upgrades them to the version of the given dist-tag.
 */
export const upgrade = async (
  projectRoot?: string,
  options?: UpgradeIntlayerPackagesOptions
) => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  await upgradeIntlayerPackages(root, options);
};
