import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { packageList } from './constants';

/**
 * Detects which intlayer package is used in the project by reading package.json.
 */
export const detectPackageName = (searchDir: string): string | undefined => {
  let currentDir = searchDir;

  while (currentDir !== dirname(currentDir)) {
    const pkgPath = join(currentDir, 'package.json');

    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
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
    currentDir = dirname(currentDir);
  }

  return undefined;
};
