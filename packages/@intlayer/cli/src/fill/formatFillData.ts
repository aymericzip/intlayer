import type { Fill, IntlayerConfig, LocalesValues } from '@intlayer/types';
import { formatAutoFilledFilePath } from './formatAutoFilledFilePath';

export type FillData = {
  localeList: LocalesValues[];
  filePath: string;
  isPerLocale: boolean;
};

export const formatFillData = (
  autoFillField: Fill,
  localeList: LocalesValues[],
  filePath: string,
  dictionaryKey: string,
  configuration: IntlayerConfig
): FillData[] => {
  const outputContentDeclarationFile: FillData[] = [];

  const baseDir = configuration.content.baseDir;

  if (!autoFillField) return outputContentDeclarationFile;

  if (typeof autoFillField === 'string') {
    if (autoFillField.includes('{{locale}}')) {
      const output = localeList.map((locale) => {
        const formattedFilePath = formatAutoFilledFilePath(
          autoFillField,
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
        autoFillField,
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

  if (typeof autoFillField === 'object') {
    const localeList = Object.keys(autoFillField).filter(
      (locale) =>
        typeof autoFillField[locale as keyof typeof autoFillField] === 'string'
    ) as LocalesValues[];

    const output: FillData[] = localeList
      .filter((locale) =>
        Boolean(autoFillField[locale as keyof typeof autoFillField])
      )
      .map((locale) => {
        const formattedFilePath = formatAutoFilledFilePath(
          autoFillField[locale as keyof typeof autoFillField] as string,
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
