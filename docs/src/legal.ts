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
import { legalEntry } from './generated/legal.entry';

export type LegalKey = keyof typeof legalEntry;
export type Legals = Record<LegalKey, Record<LocalesValues, Promise<string>>>;
export type LegalMetadata = FileMetadata;

export const getLegalsKeys = (): (keyof typeof legalEntry)[] =>
  getKeys(legalEntry);

export const getLegals = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<LegalKey, string>> => getFiles(legalEntry, locale);

export const getLegal = async <L extends LocalesValues>(
  docName: keyof typeof legalEntry,
  locale: L = defaultLocale as L
): Promise<string> => getFile(legalEntry, docName, locale);

export const getLegalMetadataRecord = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<LegalKey, FileMetadata>> =>
  getFileMetadataRecord(legalEntry, locale);

export const getLegalMetadata = async <
  D extends LegalKey,
  L extends LocalesValues,
>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => getFileMetadata(legalEntry, docName, locale);

export const getLegalMetadataBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<FileMetadata[]> =>
  await getFileMetadataBySlug(legalEntry, slugs, locale, strict);

export const getLegalBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<string[]> => await getFileBySlug(legalEntry, slugs, locale, strict);
