import fg from 'fast-glob';
import { localeRecord, LocalesValues } from 'intlayer';
import { BlogData } from './blog.types';
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
import { findDocPackageJsonDir, readFileContent } from './readFileContent';

const docRoot = findDocPackageJsonDir();

const blogFiles = fg.sync('./blog/en/**/*.md', {
  cwd: docRoot,
});

export type BlogKey = keyof BlogData;
export type Blogs = Record<BlogKey, Record<LocalesValues, Promise<string>>>;
export type BlogMetadata = FileMetadata;

const blogs: Blogs = blogFiles.reduce((acc, filePath) => {
  acc[filePath as BlogKey] = localeRecord(({ locale }) =>
    readFileContent(filePath.replace('/en/', `/${locale}/`))
  );

  return acc;
}, {} as Blogs);

export const getBlogs = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<BlogKey, string>> => await getFiles(blogs, locale);

export const getBlog = async <L extends LocalesValues>(
  docName: keyof typeof blogs,
  locale: L = defaultLocale as L
): Promise<string> => await getFile(blogs, docName, locale);

export const getBlogMetadataRecord = async <L extends LocalesValues>(
  locale: L = defaultLocale as L
): Promise<Record<BlogKey, FileMetadata>> =>
  await getFileMetadataRecord(blogs, locale);

export const getBlogMetadata = async <
  D extends BlogKey,
  L extends LocalesValues,
>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => await getFileMetadata(blogs, docName, locale);

export const getBlogMetadataBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<FileMetadata[]> => await getFileMetadataBySlug(blogs, slugs, locale);

export const getBlogBySlug = async <L extends LocalesValues>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<string[]> => await getFileBySlug(blogs, slugs, locale);
