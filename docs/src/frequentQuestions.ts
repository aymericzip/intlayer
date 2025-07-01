import { Locales, LocalesValues } from '@intlayer/config';
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
import { FrequentQuestionsData } from './frequentQuestions.types';
import { findDocPackageJsonDir, readFileContent } from './readFileContent';

const docRoot = findDocPackageJsonDir();

const frequentQuestionsFiles = fg.sync('./frequentQuestions/en/**/*.md', {
  cwd: docRoot,
});

export type FrequentQuestionKey = keyof FrequentQuestionsData;
export type FrequentQuestions = Record<
  FrequentQuestionKey,
  Record<LocalesValues, Promise<string>>
>;
export type FrequentQuestionMetadata = FileMetadata;

const frequentQuestions: FrequentQuestions = frequentQuestionsFiles.reduce(
  (acc, filePath) => {
    acc[filePath as FrequentQuestionKey] = localeRecord(({ locale }) =>
      readFileContent(filePath.replace('/en/', `/${locale}/`))
    );

    return acc;
  },
  {} as FrequentQuestions
);

export const getFrequentQuestions = async <L extends Locales>(
  locale: L = defaultLocale as L
): Promise<Record<FrequentQuestionKey, string>> =>
  getFiles(frequentQuestions, locale);

export const getFrequentQuestion = async <L extends Locales>(
  docName: keyof typeof frequentQuestions,
  locale: L = defaultLocale as L
): Promise<string> => getFile(frequentQuestions, docName, locale);

export const getFrequentQuestionMetadataRecord = async <L extends Locales>(
  locale: L = defaultLocale as L
): Promise<Record<FrequentQuestionKey, FileMetadata>> =>
  getFileMetadataRecord(frequentQuestions, locale);

export const getFrequentQuestionMetadata = async <
  D extends FrequentQuestionKey,
  L extends Locales,
>(
  docName: D,
  locale: L = defaultLocale as L
): Promise<FileMetadata> => getFileMetadata(frequentQuestions, docName, locale);

export const getFrequentQuestionMetadataBySlug = async <L extends Locales>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<FileMetadata[]> =>
  await getFileMetadataBySlug(frequentQuestions, slugs, locale);

export const getFrequentQuestionBySlug = async <L extends Locales>(
  slugs: string | string[],
  locale: L = defaultLocale as L
): Promise<string[]> => await getFileBySlug(frequentQuestions, slugs, locale);
