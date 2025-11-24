import type { Fill, IntlayerConfig, LocalesValues } from '@intlayer/types';
import { formatAutoFilledFilePath } from './formatAutoFilledFilePath';

export type FillData = {
  localeList: LocalesValues[];
  filePath: string;
  isPerLocale: boolean;
};

export const formatFillData = (
  fillField: Fill,
  localeList: LocalesValues[],
  filePath: string,
  dictionaryKey: string,
  configuration: IntlayerConfig
): FillData[] => {
  const outputContentDeclarationFile: FillData[] = [];

  const baseDir = configuration.content.baseDir;

  if (!fillField) return outputContentDeclarationFile;

  if (typeof fillField === 'string') {
    if (fillField.includes('{{locale}}')) {
      const output = localeList.map((locale) => {
        const formattedFilePath = formatAutoFilledFilePath(
          fillField,
          dictionaryKey,
          filePath,
          baseDir,
          locale
        );

        return {
          localeList: [locale],
          filePath: formattedFilePath,
          isPerLocale: true,
        };
      });

      outputContentDeclarationFile.push(...output);
    } else {
      const formattedFilePath = formatAutoFilledFilePath(
        fillField,
        dictionaryKey,
        filePath,
        baseDir
      );

      outputContentDeclarationFile.push({
        localeList,
        filePath: formattedFilePath,
        isPerLocale: false,
      });
    }

    return outputContentDeclarationFile;
  }

  if (typeof fillField === 'object') {
    const localeList = Object.keys(fillField).filter(
      (locale) =>
        typeof fillField[locale as keyof typeof fillField] === 'string'
    ) as LocalesValues[];

    const output: FillData[] = localeList
      .filter((locale) => Boolean(fillField[locale as keyof typeof fillField]))
      .map((locale) => {
        const formattedFilePath = formatAutoFilledFilePath(
          fillField[locale as keyof typeof fillField] as string,
          dictionaryKey,
          filePath,
          baseDir,
          locale
        );

        return {
          localeList: [locale],
          filePath: formattedFilePath,
          isPerLocale: true,
        };
      });

    // Group by filePath and merge localeList
    const groupedByFilePath = output.reduce((acc, curr) => {
      const existing = acc.find((item) => item.filePath === curr.filePath);
      if (existing) {
        existing.localeList.push(...curr.localeList);
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as FillData[]);

    outputContentDeclarationFile.push(...groupedByFilePath);
  }

  return outputContentDeclarationFile;
};
