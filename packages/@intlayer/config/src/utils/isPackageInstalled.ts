import { getProjectRequire } from './ESMxCJSHelpers';

/**
 * Checks whether a package can be resolved from the user project.
 *
 * Used to detect optional companion packages (e.g. `@intlayer/analytics`)
 * whose mere presence in the dependency tree opts the project into a feature.
 *
 * Resolution is attempted on the package manifest first, so packages that
 * expose no root entry point — or whose entry point cannot be loaded in the
 * current module format — are still detected.
 *
 * Note: resolution starts at the project root, so a package installed only as
 * a transitive dependency may stay invisible under strict package managers
 * (pnpm). Callers should treat a `false` result as a default, not as a veto.
 *
 * @param packageName - Name of the package to look up, e.g. `'@intlayer/analytics'`.
 * @param baseDir - Directory the resolution starts from. Defaults to the current working directory.
 * @returns `true` when the package is installed in the project, `false` otherwise.
 */
export const isPackageInstalled = (
  packageName: string,
  baseDir?: string
): boolean => {
  try {
    const projectRequire = getProjectRequire(baseDir);

    try {
      projectRequire.resolve(`${packageName}/package.json`);
    } catch {
      projectRequire.resolve(packageName);
    }

    return true;
  } catch {
    return false;
  }
};
