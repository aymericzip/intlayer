import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

/**
 * Reads all JSON dictionary files from a directory, keyed by filename.
 * Uses readFileSync instead of require() to avoid require.cache memory leak.
 */
export const readDictionariesFromDisk = <T = Record<string, any>>(
  directory: string
): T => {
  const dictionaries: Record<string, any> = {};

  if (existsSync(directory)) {
    const files = readdirSync(directory).filter((file) =>
      file.endsWith('.json')
    );

    for (const file of files) {
      const key = basename(file, extname(file));
      dictionaries[key] = JSON.parse(
        readFileSync(join(directory, file), 'utf-8')
      );
    }
  }

  return dictionaries as T;
};
