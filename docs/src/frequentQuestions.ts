import type { Locales, LocalesValues } from '@intlayer/config';
import {
  defaultLocale,
  type FileMetadata,
  getFile,
  getFileBySlug,
  getFileMetadata,
  getFileMetadataBySlug,
  getFileMetadataRecord,
  getFiles,
} from './common';
import { frequentQuestionsEntry } from './generated/frequentQuestions.entry';

export type FrequentQuestionKey = keyof typeof frequentQuestionsEntry;
export type FrequentQuestions = Record<
  FrequentQuestionKey,
  Record<LocalesValues, Promise<string>>
>;
export type FrequentQuestionMetadata = FileMetadata;

export const getFrequentQuestions = async <L extends Locales>(
  locale: L = defaultLocale as L
): Promise<Record<FrequentQuestionKey, string>> =>
  getFiles(frequentQuestionsEntry, locale);

export const getFrequentQuestion = async <L extends Locales>(
  docName: FrequentQuestionKey,
  locale: L = defaultLocale as L
): Promise<string> => getFile(frequentQuestionsEntry, docName, locale);

export const getFrequentQuestionMetadataRecord = async <L extends Locales>(
  locale: L = defaultLocale as L
): Promise<Record<FrequentQuestionKey, FileMetadata>> =>
  getFileMetadataRecord(frequentQuestionsEntry, locale);

export const getFrequentQuestionMetadata = async <
  D extends FrequentQuestionKey,
  L extends Locales,
>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> =>
  getFileMetadata(frequentQuestionsEntry, docName, locale);

export const getFrequentQuestionMetadataBySlug = async <L extends Locales>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<FileMetadata[]> =>
  await getFileMetadataBySlug(frequentQuestionsEntry, slugs, locale, strict);

export const getFrequentQuestionBySlug = async <L extends Locales>(
  slugs: string | string[],
  locale: L = defaultLocale as L,
  strict = false
): Promise<string[]> =>
  await getFileBySlug(frequentQuestionsEntry, slugs, locale, strict);
