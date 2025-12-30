import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { initIntlayer } from '@intlayer/chokidar';

const findProjectRoot = (startDir: string) => {
  let currentDir = startDir;

  while (currentDir !== resolve(currentDir, '..')) {
    if (existsSync(join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = resolve(currentDir, '..');
  }

  // If no package.json is found, return the start directory.
  // The initIntlayer function will handle the missing package.json error.
  return startDir;
};

export const init = async (projectRoot?: string) => {
  const root = projectRoot
    ? findProjectRoot(resolve(projectRoot))
    : findProjectRoot(process.cwd());

  await initIntlayer(root);
};
