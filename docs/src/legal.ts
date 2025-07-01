import { Locales } from '@intlayer/config';
import { getMarkdownMetadata } from '@intlayer/core';
import { localeRecord } from 'intlayer';
import { readFileContent } from './readFileContent';

const legals = {
  terms_of_service: localeRecord(({ locale }) =>
    readFileContent(`/legal/${locale}/terms_of_service.md`)
  ),
  privacy_notice: localeRecord(({ locale }) =>
    readFileContent(`/legal/${locale}/privacy_notice.md`)
  ),
};

export const getLegals = async (lang = Locales.ENGLISH) => {
  const docsEntries = await Promise.all(
    Object.entries(legals)
      .map(([key, value]) => [key, value[lang]])
      .map(async ([key, value]) => [key, await value])
  );

  const docsResult = Object.fromEntries(docsEntries);

  return docsResult;
};

export const getLegal = async (
  docName: keyof typeof legals,
  lang = Locales.ENGLISH
): Promise<string> => {
  const doc = await legals[docName][lang];

  if (!doc) {
    const englishLegal = await legals[docName][Locales.ENGLISH];

    if (!englishLegal) {
      throw new Error(`Legal ${docName} not found`);
    }

    return englishLegal;
  }

  return doc;
};

export const getLegalMetadataRecord = async (
  locale = Locales.ENGLISH
): Promise<Record<string, LegalMetadata>> => {
  const docs = await getLegals(locale);
  return Object.keys(docs).reduce(
    (acc, docName) => {
      const metadata = getMarkdownMetadata(docs[docName]);
      acc[docName] = metadata;
      return acc;
    },
    {} as Record<string, any>
  );
};

type LegalMetadata = {
  docName: string;
  url: string;
  githubUrl: string;
  title: string;
  description: string;
  keywords: string[];
  updatedAt: string;
  createdAt: string;
};

export const getLegalMetadata = async <T extends LegalMetadata>(
  docName: keyof typeof legals,
  locale = Locales.ENGLISH
): Promise<T> => {
  const doc = await getLegal(docName, locale);

  return getMarkdownMetadata<T>(doc);
};
