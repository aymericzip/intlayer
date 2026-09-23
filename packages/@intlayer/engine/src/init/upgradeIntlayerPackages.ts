import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import {
  detectPackageManager,
  fetchLatestPackageVersion,
  findLockFileDir,
  getIntlayerDependencyUpgrades,
  type IntlayerDependencyUpgrade,
  listIntlayerDependencies,
  type PackageJsonIntlayerDependencies,
  runPackageInstall,
  writeIntlayerDependencyUpgrades,
} from './utils';

export type UpgradeIntlayerPackagesOptions = {
  /** List the Intlayer packages and their target version without upgrading. */
  dryRun?: boolean;
  /**
   * npm dist-tag to upgrade to (e.g. `canary`).
   * @default 'latest'
   */
  distTag?: string;
};

export type UpgradeIntlayerPackagesResult = {
  /** Intlayer dependencies found in every `package.json` of the project. */
  packageJsonDependencies: PackageJsonIntlayerDependencies[];
  /** Upgrades written (or that would be written, in dry-run mode). */
  upgrades: IntlayerDependencyUpgrade[];
};

/**
 * Lists the Intlayer packages of every `package.json` of the project
 * (monorepo workspaces included), rewrites their ranges to the version of the
 * given dist-tag, then runs a single install from the root.
 */
export const upgradeIntlayerPackages = async (
  rootDir: string,
  options?: UpgradeIntlayerPackagesOptions
): Promise<UpgradeIntlayerPackagesResult> => {
  const distTag = options?.distTag ?? 'latest';
  const packageJsonDependencies = await listIntlayerDependencies(rootDir);

  if (packageJsonDependencies.length === 0) {
    logger(`${x} No Intlayer package found in the project.`, {
      level: 'warn',
    });
    return { packageJsonDependencies, upgrades: [] };
  }

  const packageNames = [
    ...new Set(
      packageJsonDependencies.flatMap(({ dependencies }) =>
        dependencies.map(({ packageName }) => packageName)
      )
    ),
  ];

  const targetVersions = new Map(
    await Promise.all(
      packageNames.map(
        async (packageName) =>
          [
            packageName,
            await fetchLatestPackageVersion(packageName, { distTag }),
          ] as const
      )
    )
  );

  const upgrades = getIntlayerDependencyUpgrades(
    packageJsonDependencies,
    targetVersions
  );

  logger(colorize('Intlayer packages:', ANSIColors.CYAN));

  for (const { packageJsonPath, dependencies } of packageJsonDependencies) {
    logger(`  ${colorizePath(packageJsonPath)}`);

    for (const { packageName, currentRange } of dependencies) {
      const upgrade = upgrades.find(
        (candidate) =>
          candidate.packageJsonPath === packageJsonPath &&
          candidate.packageName === packageName
      );
      const status = upgrade
        ? `${currentRange} → ${colorize(upgrade.nextRange, ANSIColors.GREEN)}`
        : targetVersions.get(packageName)
          ? colorize(`${currentRange} (${distTag})`, ANSIColors.GREY)
          : colorize(
              `${currentRange} (could not fetch the ${distTag} version)`,
              ANSIColors.YELLOW
            );

      logger(`    ${colorize(packageName, ANSIColors.MAGENTA)} ${status}`);
    }
  }

  const dependencyLabel = upgrades.length > 1 ? 'dependencies' : 'dependency';

  if (upgrades.length === 0) {
    logger(`${v} Intlayer dependencies are up to date`);
  } else if (options?.dryRun) {
    logger(
      `${upgrades.length} Intlayer ${dependencyLabel} can be upgraded to ${distTag}. Run without ${colorize('--dry-run', ANSIColors.MAGENTA)} to apply.`
    );
  } else {
    // Install from the workspace root (nearest lock file), with the package
    // manager that owns it, so the lock file is updated in place.
    const installDir = findLockFileDir(rootDir) ?? rootDir;
    const packageManager = detectPackageManager(installDir);

    try {
      await writeIntlayerDependencyUpgrades(rootDir, upgrades);
      logger(colorize(`Running ${packageManager} install...`, ANSIColors.CYAN));
      runPackageInstall(installDir, packageManager);
      logger(
        `${v} Upgraded ${upgrades.length} Intlayer ${dependencyLabel} to ${distTag}`
      );
    } catch {
      logger(
        `${x} Failed to upgrade the Intlayer packages. Run ${colorize(`${packageManager} install`, ANSIColors.MAGENTA)} manually.`,
        { level: 'warn' }
      );
    }
  }

  return { packageJsonDependencies, upgrades };
};
