import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const isESModule = typeof import.meta.url === 'string';

const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

let rootLocation: string | undefined;

export const findDocPackageJsonDir = (startDir: string = dir): string => {
  let currentDir = startDir;

  if (rootLocation) {
    return rootLocation;
  }

  // First, try the standard upward search
  while (currentDir !== dirname(currentDir)) {
    // Keep going until we reach the root
    const packageJsonPath = resolve(currentDir, 'package.json');
    if (existsSync(packageJsonPath)) {
      rootLocation = currentDir;
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }

  // Check the root directory as well
  const rootPackageJsonPath = resolve(currentDir, 'package.json');
  if (existsSync(rootPackageJsonPath)) {
    rootLocation = currentDir;
    return currentDir;
  }

  // If we still haven't found it, try some fallback strategies for deployment environments
  // Check if we're in a deployment environment and try common deployment paths
  const possibleRoots = [
    process.cwd(), // Current working directory
    resolve(startDir, '../..'), // Go up two levels from current file
    resolve(startDir, '../../..'), // Go up three levels
    '/', // System root as last resort
  ];

  for (const possibleRoot of possibleRoots) {
    const packageJsonPath = resolve(possibleRoot, 'package.json');
    if (existsSync(packageJsonPath)) {
      rootLocation = possibleRoot;
      return possibleRoot;
    }
  }

  throw new Error(
    `No package.json found in parent directories. Started from: ${startDir}, current working directory: ${process.cwd()}`
  );
};

export const readFileContent = async (filePath: string): Promise<string> => {
  // Find the nearest parent directory containing package.json
  const packageDir = findDocPackageJsonDir();
  // Read the file content relative to the package.json directory
  const fileContent = await readFile(resolve(packageDir, filePath), 'utf-8');
  return fileContent;
};
