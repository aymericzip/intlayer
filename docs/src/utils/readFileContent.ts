import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const isESModule = typeof import.meta.url === 'string';

const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

let rootLocation: string | undefined;

const findPackageJsonDir = (startDir: string): string => {
  let currentDir = startDir;

  if (rootLocation) {
    return rootLocation;
  }

  while (currentDir !== dirname(currentDir)) {
    // Keep going until we reach the root
    const packageJsonPath = join(currentDir, 'package.json');
    if (existsSync(packageJsonPath)) {
      rootLocation = currentDir;
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }

  throw new Error('No package.json found in parent directories');
};

export const readFileContent = async (filePath: string): Promise<string> => {
  // Find the nearest parent directory containing package.json
  const packageDir = findPackageJsonDir(dir);
  // Read the file content relative to the package.json directory
  const fileContent = await readFile(join(packageDir, filePath), 'utf-8');
  return fileContent;
};
