import type { LocalesValues } from '@intlayer/config';
import {
  defaultLocale,
  type FileMetadata,
  getFile,
  getFileBySlug,
  getFileMetadata,
  getFileMetadataBySlug,
  getFileMetadataRecord,
  getFiles,
  getKeys,
} from './common';
import { docsEntry } from './generated/docs.entry';

export type DocKey = keyof typeof docsEntry;
export type Docs = Record<DocKey, Record<LocalesValues, Promise<string>>>;
export type DocMetadata = FileMetadata;

export const getDocsKeys = (): (keyof typeof docsEntry)[] => getKeys(docsEntry);

export const getDocs = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<DocKey, string>> => await getFiles(docsEntry, locale);

export const getDoc = async <L extends LocalesValues>(
  docName: keyof typeof docsEntry,
  locale: L = defaultLocale as L
): Promise<string> => await getFile(docsEntry, docName, locale);

export const getDocMetadataRecord = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<DocKey, FileMetadata>> =>
  await getFileMetadataRecord(docsEntry, locale);

export const getDocMetadata = async <D extends DocKey, L extends LocalesValues>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => await getFileMetadata(docsEntry, docName, locale);

export const getDocMetadataBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<FileMetadata[]> =>
  await getFileMetadataBySlug(docsEntry, slugs, locale, strict);

export const getDocBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<string[]> => await getFileBySlug(docsEntry, slugs, locale, strict);
