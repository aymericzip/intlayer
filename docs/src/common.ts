import {
  getLocalizedUrl,
  getMarkdownMetadata,
  Locales,
  LocalesValues,
} from 'intlayer';
import { join } from 'path';

export const defaultLocale = Locales.ENGLISH;

export const GITHUB_URL_PREFIX =
  'https://github.com/intlayer/intlayer/blob/main/docs';
export const URL_PREFIX = 'https://intlayer.org/';

export const getFiles = async <
  L extends LocalesValues,
  F extends Record<string, Record<L, Promise<string>>>,
>(
  files: F,
  lang: L = defaultLocale as L
) => {
  const filesEntries = await Promise.all(
    Object.entries(files)
      .map(([key, value]) => [key, value[lang as L]])
      .map(async ([key, value]) => [key, await value])
  );
  const filesResult = Object.fromEntries(filesEntries);
  return filesResult;
};

export const getFile = async <
  L extends LocalesValues,
  F extends Record<string, Record<L, Promise<string>>>,
>(
  files: F,
  docKey: keyof F,
  locale: L = defaultLocale as L
): Promise<string> => {
  const fileRecord = files[docKey];

  if (!fileRecord) {
    throw new Error(`File ${docKey as string} not found`);
  }

  const file = await files[docKey]?.[locale];

  if (!file) {
    const englishFile = await files[docKey][defaultLocale as L];

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
};

export const formatMetadata = <L extends LocalesValues, R extends FileMetadata>(
  docKey: string,
  file: string,
  locale: L = defaultLocale as L
): FileMetadata => {
  const metadata = getMarkdownMetadata(file);
  const relativeUrl = join('/', ...(metadata.slugs ?? []));

  return {
    ...metadata,
    docKey,
    githubUrl: join(GITHUB_URL_PREFIX, docKey as string).replace(
      '/en/',
      `/${locale}/`
    ),
    relativeUrl: getLocalizedUrl(relativeUrl, locale),
    url: getLocalizedUrl(join(URL_PREFIX, relativeUrl), locale),
  } as FileMetadata;
};

export const getFileMetadata = async <
  L extends LocalesValues,
  D extends Record<string, Record<L, Promise<string>>>,
  R extends FileMetadata,
>(
  files: D,
  docKey: keyof D,
  locale: L = defaultLocale as L
): Promise<R> => {
  try {
    const file = await getFile(files, docKey, locale);

    return formatMetadata(docKey as string, file, locale) as R;
  } catch (error) {
    console.log({ error, docKey, locale });
    throw error;
  }
};

export const getFileMetadataRecord = async <
  L extends LocalesValues,
  D extends Record<string, Record<L, Promise<string>>>,
>(
  files: D,
  locale: L = defaultLocale as L
): Promise<Record<keyof D, FileMetadata>> => {
  const filesEntries = await Promise.all(
    Object.entries(files).map(async ([key]) => [
      key,
      await getFileMetadata<L, D, FileMetadata>(files, key as keyof D, locale),
    ])
  );
  const filesResult = Object.fromEntries(filesEntries);
  return filesResult;
};

export const getFileMetadataBySlug = async <
  L extends LocalesValues,
  D extends Record<string, Record<L, Promise<string>>>,
>(
  files: D,
  slugs: string | string[],
  locale: L = defaultLocale as L
) => {
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
  const filesMetadata = await getFileMetadataRecord(files, defaultLocale as L);

  const fileMetadataArray: FileMetadata[] = Object.values(filesMetadata).filter(
    (fileMetadata) =>
      slugsArray.every((slug) => fileMetadata.slugs?.includes(slug))
  );

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
  L extends LocalesValues,
  D extends Record<string, Record<L, Promise<string>>>,
>(
  files: D,
  slugs: string | string[],
  locale: L = defaultLocale as L
) => {
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];
  const filesMetadata = await getFileMetadataRecord(files, defaultLocale as L);

  const fileMetadataArray = Object.values(filesMetadata).filter(
    (fileMetadata) =>
      fileMetadata.slugs.every((slug) => slugsArray.includes(slug))
  );

  const fileList = await Promise.all(
    fileMetadataArray.map(async (fileMetadata) => {
      const file = await getFile(files, fileMetadata.docKey, locale);
      return file;
    })
  );

  return fileList;
};
