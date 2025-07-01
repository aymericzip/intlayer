import { LocalesValues } from '@intlayer/config';
import fg from 'fast-glob';
import { localeRecord } from 'intlayer';
import {
  FileMetadata,
  defaultLocale,
  getFile,
  getFileBySlug,
  getFileMetadata,
  getFileMetadataBySlug,
  getFileMetadataRecord,
  getFiles,
} from './common';
import { DocsData } from './docs.types';
import { findDocPackageJsonDir, readFileContent } from './readFileContent';

const docRoot = findDocPackageJsonDir();
const docsFiles = fg.sync('./docs/en/**/*.md', {
  cwd: docRoot,
});

export type DocKey = keyof DocsData;
export type Docs = Record<DocKey, Record<LocalesValues, Promise<string>>>;
export type DocMetadata = FileMetadata;

const docs: Docs = docsFiles.reduce((acc, filePath) => {
  acc[filePath as DocKey] = localeRecord(({ locale }) =>
    readFileContent(filePath.replace('/en/', `/${locale}/`))
  );

  return acc;
}, {} as Docs);

export const getDocs = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<DocKey, string>> => await getFiles(docs, locale);

export const getDoc = async <L extends LocalesValues>(
  docName: keyof typeof docs,
  locale: L = defaultLocale as L
): Promise<string> => await getFile(docs, docName, locale);

export const getDocMetadataRecord = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<DocKey, FileMetadata>> =>
  await getFileMetadataRecord(docs, locale);

export const getDocMetadata = async <D extends DocKey, L extends LocalesValues>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => await getFileMetadata(docs, docName, locale);

export const getDocMetadataBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<FileMetadata[]> => await getFileMetadataBySlug(docs, slugs, locale);

export const getDocBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<string[]> => await getFileBySlug(docs, slugs, locale);
