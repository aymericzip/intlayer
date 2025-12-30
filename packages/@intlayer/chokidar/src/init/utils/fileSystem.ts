import { access, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Helper to check if a file exists
 */
export const exists = async (rootDir: string, filePath: string) => {
  try {
    await access(join(rootDir, filePath));
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper to read a file
 */
export const readFileFromRoot = async (rootDir: string, filePath: string) =>
  await readFile(join(rootDir, filePath), 'utf8');

/**
 * Helper to write a file
 */
export const writeFileToRoot = async (
  rootDir: string,
  filePath: string,
  content: string
) => await writeFile(join(rootDir, filePath), content, 'utf8');
