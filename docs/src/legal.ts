import { LocalesValues } from '@intlayer/config';
import fg from 'fast-glob';
import { localeRecord } from 'intlayer';
import {
  defaultLocale,
  FileMetadata,
  getFile,
  getFileBySlug,
  getFileMetadata,
  getFileMetadataBySlug,
  getFileMetadataRecord,
  getFiles,
} from './common';
import { LegalData } from './legal.types';
import { findDocPackageJsonDir, readFileContent } from './readFileContent';

const docRoot = findDocPackageJsonDir();

const legalFiles = fg.sync('./legal/en/**/*.md', {
  cwd: docRoot,
});

export type LegalKey = keyof LegalData;
export type Legals = Record<LegalKey, Record<LocalesValues, Promise<string>>>;
export type LegalMetadata = FileMetadata;

const legal: Legals = legalFiles.reduce((acc, filePath) => {
  acc[filePath as LegalKey] = localeRecord(({ locale }) =>
    readFileContent(filePath.replace('/en/', `/${locale}/`))
  );

  return acc;
}, {} as Legals);

export const getLegals = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<LegalKey, string>> => getFiles(legal, locale);

export const getLegal = async <L extends LocalesValues>(
  docName: keyof typeof legal,
  locale: L = defaultLocale as L
): Promise<string> => getFile(legal, docName, locale);

export const getLegalMetadataRecord = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<LegalKey, FileMetadata>> =>
  getFileMetadataRecord(legal, locale);

export const getLegalMetadata = async <
  D extends LegalKey,
  L extends LocalesValues,
>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => getFileMetadata(legal, docName, locale);

export const getLegalMetadataBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<FileMetadata[]> => await getFileMetadataBySlug(legal, slugs, locale);

export const getLegalBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<string[]> => await getFileBySlug(legal, slugs, locale);
