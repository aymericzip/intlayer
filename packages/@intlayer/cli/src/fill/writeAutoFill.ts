import {
  formatLocale,
  formatPath,
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import { colorizeKey, getAppLogger } from '@intlayer/config';
import type {
  AutoFill,
  Dictionary,
  IntlayerConfig,
  Locales,
} from '@intlayer/types';
import { type AutoFillData, formatAutoFillData } from './formatAutoFillData';

export const writeAutoFill = async (
  fullDictionary: Dictionary,
  contentDeclarationFile: Dictionary,
  autoFillOptions: AutoFill,
  outputLocales: Locales[],
  parentLocales: Locales[],
  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);
  const localeList: Locales[] = (
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
    if (!output.filePath) {
      appLogger(
        `No file path found for auto filled content declaration for '${colorizeKey(fullDictionary.key)}'`,
        {
          level: 'error',
        }
      );
      continue;
    }

    const reducedDictionaryContent = reduceDictionaryContent(
      fullDictionary,
      contentDeclarationFile
    );

    // write file
    await writeContentDeclaration({
      ...fullDictionary,
      autoFill: undefined,
      autoFilled: true,
      locale: output.isPerLocale ? output.localeList[0] : undefined,
      content: reducedDictionaryContent.content,
      filePath: output.filePath,
    });

    if (output.isPerLocale) {
      const sourceLocale = output.localeList[0];

      appLogger(
        `Auto filled per-locale content declaration for '${colorizeKey(fullDictionary.key)}' written to ${formatPath(output.filePath)} for locale ${formatLocale(sourceLocale)}`,
        {
          level: 'info',
        }
      );
    } else {
      appLogger(
        `Auto filled content declaration for '${colorizeKey(fullDictionary.key)}' written to ${formatPath(output.filePath)}`,
        {
          level: 'info',
        }
      );
    }
  }
};
