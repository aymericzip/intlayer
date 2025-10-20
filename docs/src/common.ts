import { join } from 'node:path';
import { getLocalizedUrl, getMarkdownMetadata } from '@intlayer/core';
import { Locales, type LocalesValues } from '@intlayer/types';

export const defaultLocale = Locales.ENGLISH;

export const GITHUB_URL_PREFIX =
  'https://github.com/aymericzip/intlayer/blob/main/docs';
export const URL_PREFIX = 'https://intlayer.org/';

export const getKeys = <T extends Record<string, any>>(obj: T): (keyof T)[] =>
  Object.keys(obj) as (keyof T)[];

export const getFiles = async <
  F extends Record<`./${string}`, Record<LocalesValues, Promise<string>>>,
>(
  files: F,
  lang: LocalesValues = defaultLocale as LocaleValues
): Promise<Record<string, string>> => {
  const filesEntries = await Promise.all(
    Object.entries(files)
      .map(([key, value]) => [key, value[lang as LocaleValues]])
      .map(async ([key, value]) => [key, await value])
  );
  const filesResult = Object.fromEntries(filesEntries);
  return filesResult;
};

export const getFile = async <
  F extends Record<string, Record<LocalesValues, Promise<string>>>,
>(
  files: F,
  docKey: keyof F,
  locale: LocalesValues = defaultLocale as LocaleValues
): Promise<string> => {
  const fileRecord = files[docKey];

  if (!fileRecord) {
    throw new Error(`File ${docKey as string} not found`);
  }

  const file = await files[docKey]?.[locale];

  if (!file) {
    const englishFile = await files[docKey][defaultLocale as LocaleValues];

    if (!englishFile) {
      throw new Error(`File ${docKey as string} not found`);
    }

    return englishFile;
  }

  return file;
};

export type FileMetadata = {
  docKey: string;
  url: string;
  relativeUrl: string;
  githubUrl: string;
  title: string;
  slugs: string[];
  description: string;
  keywords: string[];
  updatedAt: string;
  createdAt: string;
  author?: string;
  youtubeVideo?: string;
  applicationTemplate?: string;
};

export const formatMetadata = (
  docKey: string,
  file: string,
  locale: LocalesValues = defaultLocale as LocaleValues
): FileMetadata => {
  const metadata = getMarkdownMetadata(file);
  const relativeUrl = join('/', ...(metadata.slugs ?? []));

  const slicedDocKey = docKey.slice(1);

  return {
    ...metadata,
    docKey,
    githubUrl: `${GITHUB_URL_PREFIX}${slicedDocKey}`.replace(
      '/en/',
      `/${locale}/`
    ),
    relativeUrl: getLocalizedUrl(relativeUrl, locale),
    url: getLocalizedUrl(join(URL_PREFIX, relativeUrl), locale),
  } as FileMetadata;
};

export const getFileMetadata = async <
  F extends Record<string, Record<LocalesValues, Promise<string>>>,
  R extends FileMetadata,
>(
  files: F,
  docKey: keyof F,
  locale: LocalesValues = defaultLocale as LocaleValues
): Promise<R> => {
  const file = await getFile(files, docKey, locale);

  return formatMetadata(docKey as string, file, locale) as R;
};

export const getFileMetadataRecord = async <
  F extends Record<string, Record<LocalesValues, Promise<string>>>,
>(
  files: F,
  locale: LocalesValues = defaultLocale as LocaleValues
): Promise<Record<keyof F, FileMetadata>> => {
  const filesEntries = await Promise.all(
    Object.entries(files).map(async ([key]) => [
      key,
      await getFileMetadata(files, key as keyof F, locale),
    ])
  );
  const filesResult = Object.fromEntries(filesEntries);
  return filesResult;
};

export const getFileMetadataBySlug = async <
  F extends Record<string, Record<LocalesValues, Promise<string>>>,
>(
  files: F,
  slugs: string | string[],
  locale: LocalesValues = defaultLocale as LocaleValues,
  strict = false
) => {
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
  const filesMetadata = await getFileMetadataRecord(
    files,
    defaultLocale as LocaleValues
  );

  let fileMetadataArray: FileMetadata[] = Object.values(filesMetadata).filter(
    (fileMetadata) =>
      slugsArray.every((slug) => fileMetadata.slugs?.includes(slug))
  );

  if (strict) {
    fileMetadataArray = fileMetadataArray.filter(
      (fileMetadata) => fileMetadata.slugs.length === slugsArray.length
    );
  }

  if (locale !== defaultLocale) {
    const localizedFileMetadata = await Promise.all(
      fileMetadataArray.map(
        async (fileMetadata) =>
          await getFileMetadata(files, fileMetadata.docKey, locale)
      )
    );

    return localizedFileMetadata;
  }

  return fileMetadataArray;
};

export const getFileBySlug = async <
  F extends Record<string, Record<LocalesValues, Promise<string>>>,
>(
  files: F,
  slugs: string | string[],
  locale: LocalesValues = defaultLocale as LocaleValues,
  strict = false
) => {
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
  const filesMetadata = await getFileMetadataRecord(
    files,
    defaultLocale as LocaleValues
  );

  let fileMetadataArray = Object.values(filesMetadata).filter((fileMetadata) =>
    slugsArray.every((slug) => fileMetadata.slugs?.includes(slug))
  );

  if (strict) {
    fileMetadataArray = fileMetadataArray.filter(
      (fileMetadata) => fileMetadata.slugs.length === slugsArray.length
    );
  }

  const fileList = await Promise.all(
    fileMetadataArray.map(async (fileMetadata) => {
      const file = await getFile(files, fileMetadata.docKey, locale);
      return file;
    })
  );

  return fileList;
};
