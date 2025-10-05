import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

type PackageJSON = {
  name?: string;
  version?: string;
  private: boolean;
  description?: string;
  homepage?: string;
  bugs: {
    url?: string;
  };
  repository: {
    type?: string;
    url?: string;
  };
  license?: string;
  author: {
    name?: string;
    url?: string;
  };
  contributors?: {
    name?: string;
    email?: string;
    url?: string;
  }[];
  type?: string;
  scripts: Record<string, string>;
  devDependencies: Record<string, string>;
  packageManager?: string;
  engines: Record<string, string>;
};

export const getParentPackageJSON = (startDir: string): PackageJSON => {
  let currentDir = startDir;

  while (currentDir !== dirname(currentDir)) {
    // Stop when we reach the root
    const packageJsonPath = resolve(currentDir, 'package.json');

    if (existsSync(packageJsonPath)) {
      return JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    }

    // Move up one directory level
    currentDir = dirname(currentDir);
  }

  // Check the root directory as well
  const rootPackageJsonPath = resolve(currentDir, 'package.json');
  if (existsSync(rootPackageJsonPath)) {
    return JSON.parse(readFileSync(rootPackageJsonPath, 'utf8'));
  }

  // If no package.json is found in any parent directory
  throw new Error(
    `No package.json found in any parent directory of ${startDir}`
  );
};
