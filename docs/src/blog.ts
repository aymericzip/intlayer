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
import { blogEntry } from './generated/blog.entry';

export type BlogKey = keyof typeof blogEntry;
export type Blogs = Record<BlogKey, Record<LocalesValues, Promise<string>>>;
export type BlogMetadata = FileMetadata;

export const getBlogsKeys = (): (keyof typeof blogEntry)[] =>
  getKeys(blogEntry);

export const getBlogs = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<BlogKey, string>> => await getFiles(blogEntry, locale);

export const getBlog = async <L extends LocalesValues>(
  docName: BlogKey,
  locale: L = defaultLocale as L
): Promise<string> => await getFile(blogEntry, docName, locale);

export const getBlogMetadataRecord = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<BlogKey, FileMetadata>> =>
  await getFileMetadataRecord(blogEntry, locale);

export const getBlogMetadata = async <
  D extends BlogKey,
  L extends LocalesValues,
>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => await getFileMetadata(blogEntry, docName, locale);

export const getBlogMetadataBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<FileMetadata[]> =>
  await getFileMetadataBySlug(blogEntry, slugs, locale, strict);

export const getBlogBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<string[]> => await getFileBySlug(blogEntry, slugs, locale, strict);
