import { extname } from 'node:path';
import type { AutoFill, IntlayerConfig, LocalesValues } from '@intlayer/types';
import { formatAutoFilledFilePath } from './formatAutoFilledFilePath';

export type AutoFillData = {
  localeList: LocalesValues[];
  filePath: string;
  isPerLocale: boolean;
};

export const formatAutoFillData = (
  autoFillField: AutoFill,
  localeList: LocalesValues[],
  filePath: string,
  dictionaryKey: string,
  configuration: IntlayerConfig
): AutoFillData[] => {
  const outputContentDeclarationFile: AutoFillData[] = [];

  const baseDir = configuration.content.baseDir;

  if (!autoFillField) return outputContentDeclarationFile;

  if (autoFillField === true) {
    // wanted jsonFilePath: /..../src/components/home/index.content.json
    // replace file extension in json
    let jsonFilePath = filePath.replace(extname(filePath), '.json');

    // if both filePath jsonFilePath are same path, change it as : /..../src/components/home/index.fill.content.json
    if (filePath === jsonFilePath) {
      jsonFilePath = jsonFilePath.replace(extname(jsonFilePath), '.fill.json');
    }

    outputContentDeclarationFile.push({
      localeList,
      filePath: jsonFilePath,
      isPerLocale: false,
    });
  }

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

    const output: AutoFillData[] = localeList
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
    }, [] as AutoFillData[]);

    outputContentDeclarationFile.push(...groupedByFilePath);
  }

  return outputContentDeclarationFile;
};
