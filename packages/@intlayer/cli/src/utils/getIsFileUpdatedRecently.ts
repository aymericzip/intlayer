import { statSync } from 'node:fs';

const SKIP_RANGE_OF_LAST_UPDATE_TIME: number = 0; //2 * 60 * 60 * 1000; // 2 hours

/**
 * Check if file was updated recently, to skip re-translation
 */
export const getIsFileUpdatedRecently = (localeFilePath: string): boolean => {
  const stats = statSync(localeFilePath);
  const lastModified = new Date(stats.mtime);
  const threshold = new Date(Date.now() - SKIP_RANGE_OF_LAST_UPDATE_TIME);

  return lastModified > threshold;
};
