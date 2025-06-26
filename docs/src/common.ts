import { Locales } from '@intlayer/config';
import { localeRecord as localeRecordCore } from '@intlayer/core';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const LOCALE_LIST: Locales[] = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
  Locales.GERMAN,
  Locales.ARABIC,
  Locales.ITALIAN,
  Locales.ENGLISH_UNITED_KINGDOM,
  Locales.PORTUGUESE,
  Locales.HINDI,
  Locales.JAPANESE,
  Locales.KOREAN,
  Locales.CHINESE,
];

export const BASE_LOCALE = Locales.ENGLISH;

const isESModule = typeof import.meta.url === 'string';

const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

const findPackageJsonDir = (startDir: string): string => {
  let currentDir = startDir;

  while (currentDir !== dirname(currentDir)) {
    // Keep going until we reach the root
    const packageJsonPath = join(currentDir, 'package.json');
    if (existsSync(packageJsonPath)) {
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
  const fileContent = readFileSync(join(packageDir, filePath), 'utf-8');
  return fileContent;
};

export const localeRecord: typeof localeRecordCore = (mapper) =>
  localeRecordCore(mapper, LOCALE_LIST);
