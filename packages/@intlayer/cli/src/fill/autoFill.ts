import {
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import { getAppLogger, type IntlayerConfig, Locales } from '@intlayer/config';
import {
  type AutoFill,
  type ContentNode,
  type Dictionary,
  getFilteredLocalesContent,
  getLocalisedContent,
} from '@intlayer/core';
import { AutoFillData, formatAutoFillData } from './formatAutoFillData';

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
    }
  }
};
