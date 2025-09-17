import {
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  colorizeKey,
  colorizePath,
  getAppLogger,
  type IntlayerConfig,
  Locales,
} from '@intlayer/config';
import {
  type AutoFill,
  type ContentNode,
  type Dictionary,
  getFilteredLocalesContent,
  getLocalisedContent,
} from '@intlayer/core';
import { relative } from 'path';
import { AutoFillData, formatAutoFillData } from './formatAutoFillData';
import { formatLocaleName } from './index';

export const autoFill = async (
  fullDictionary: Dictionary,
  contentDeclarationFile: Dictionary,
  autoFillOptions: AutoFill,
  outputLocales: Locales[],
  parentLocales: Locales[],
  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);
  let localeList: Locales[] = (
    outputLocales ?? configuration.internationalization.locales
  ).filter((locale) => !parentLocales?.includes(locale));

  const filePath = contentDeclarationFile.filePath;

  if (!filePath) {
    appLogger('No file path found for dictionary', {
      level: 'error',
    });
    return;
  }

  const autoFillData: AutoFillData[] = formatAutoFillData(
    autoFillOptions,
    localeList,
    filePath,
    fullDictionary.key,
    configuration
  );

  for await (const output of autoFillData) {
    const reducedDictionary = reduceDictionaryContent(
      fullDictionary,
      contentDeclarationFile
    );

    if (output.isPerLocale) {
      const sourceLocale = output.localeList[0];

      const sourceLocaleContent = getLocalisedContent(
        reducedDictionary as unknown as ContentNode,
        sourceLocale,
        { dictionaryKey: reducedDictionary.key, keyPath: [] }
      );

      await writeContentDeclaration({
        ...fullDictionary,
        locale: sourceLocale,
        autoFilled: true,
        autoFill: undefined,
        content: sourceLocaleContent.content,
        filePath: output.filePath,
      });

      if (output.filePath) {
        appLogger(
          `Auto filled per-locale content declaration for '${colorizeKey(fullDictionary.key)}' written to ${colorizePath(relative(configuration.content.baseDir, output.filePath))} for locale ${formatLocaleName(sourceLocale)}`,
          {
            level: 'info',
          }
        );
      }
    } else {
      const content = getFilteredLocalesContent(
        reducedDictionary.content as unknown as ContentNode,
        output.localeList,
        { dictionaryKey: reducedDictionary.key, keyPath: [] }
      );

      // write file
      await writeContentDeclaration({
        ...fullDictionary,
        autoFilled: true,
        autoFill: undefined,
        content,
        filePath: output.filePath,
      });

      if (output.filePath) {
        appLogger(
          `Auto filled content declaration for '${colorizeKey(fullDictionary.key)}' written to ${colorizePath(relative(configuration.content.baseDir, output.filePath))}`,
          {
            level: 'info',
          }
        );
      }
    }
  }
};
