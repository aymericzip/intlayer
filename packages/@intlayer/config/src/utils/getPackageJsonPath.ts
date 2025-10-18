import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { cache } from './cache';

export const isESModule = typeof import.meta.url === 'string';

const MAX_LEVELS = 15;

type PackageJsonPathCache = {
  packageJsonPath: string;
  baseDir: string;
};

export const getPackageJsonPath = (
  startDir: string = process.cwd()
): PackageJsonPathCache => {
  const checkedCache = cache.get<PackageJsonPathCache>(
    'packageJsonPath',
    startDir
  );

  if (checkedCache) return checkedCache;

  let currentDir = startDir;

  for (let level = 0; level < MAX_LEVELS; level++) {
    const packageJsonPath = join(currentDir, 'package.json');

    if (existsSync(packageJsonPath)) {
      cache.set('packageJsonPath', startDir, {
        packageJsonPath,
        baseDir: currentDir,
      });

      return { packageJsonPath, baseDir: currentDir };
    }

    const parentDir = dirname(currentDir);

    // If we've reached the root directory, stop
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  throw new Error(
    `Could not find package.json in current directory or any of the ${MAX_LEVELS} parent directories. Searched from: ${process.cwd()}`
  );
};
