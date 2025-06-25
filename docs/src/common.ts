import { Locales } from '@intlayer/config';
import { localeRecord as localeRecordCore } from '@intlayer/core';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const localeList = [
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

const isESModule = typeof import.meta.url === 'string';

const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const readFileFunction = async (filePath: string): Promise<string> => {
  // Read the file content using Node.js fs module.
  const fileContent = readFileSync(join(dir, '../../', filePath), 'utf-8');
  return fileContent;
};

export const localeRecord: typeof localeRecordCore = (mapper) =>
  localeRecordCore(mapper, localeList);
