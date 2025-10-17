import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const isESModule = typeof import.meta.url === 'string';

const MAX_LEVELS = 15;

export const getPackageJsonPath = () => {
  let currentDir = process.cwd();

  for (let level = 0; level < MAX_LEVELS; level++) {
    const packageJsonPath = join(currentDir, 'package.json');

    if (existsSync(packageJsonPath)) {
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
