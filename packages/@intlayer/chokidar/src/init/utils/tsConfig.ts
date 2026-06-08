import { readdir } from 'node:fs/promises';

/**
 * Helper to find all tsconfig files (tsconfig.json, tsconfig.*.json)
 */
export const findTsConfigFiles = async (rootDir: string): Promise<string[]> => {
  try {
    const files = await readdir(rootDir);

    return files.filter(
      (file) => file === 'tsconfig.json' || /^tsconfig\..+\.json$/.test(file)
    );
  } catch {
    return [];
  }
};
