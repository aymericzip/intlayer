import { existsSync, readFileSync } from 'node:fs';
import { getPackageJsonPath } from '@intlayer/config/utils';
import { type PackageName, packageList } from './constants';

/**
 * Detects which intlayer package is used in the project by reading package.json.
 */
export const detectPackageName = (searchDir: string): PackageName => {
  const { packageJsonPath } = getPackageJsonPath(searchDir);

  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
      };

      for (const pkgName of packageList) {
        if (allDeps[pkgName]) return pkgName;
      }
    } catch {
      // Ignore JSON errors
    }
  }

  return packageList[packageList.length - 1];
};
