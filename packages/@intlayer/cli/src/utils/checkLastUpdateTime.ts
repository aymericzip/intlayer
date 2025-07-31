import { statSync } from 'fs';

/**
 * Returns the last modification date of a file.
 *
 * @param filePath - Absolute or relative path to the file to inspect.
 * @returns Date instance representing the file's last modified time (mtime).
 * @throws Will propagate any error thrown by fs.statSync (e.g., file not found).
 */
export const checkLastUpdateTime = (filePath: string): Date => {
  const stats = statSync(filePath);
  return new Date(stats.mtime);
};
