import {
  formatLocale,
  formatPath,
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import { colorizeKey, getAppLogger } from '@intlayer/config';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, Fill, IntlayerConfig, Locale } from '@intlayer/types';
import { type FillData, formatFillData } from './formatFillData';

export const writeFill = async (
  contentDeclarationFile: Dictionary,
  outputLocales: Locale[],
  parentLocales: Locale[],
  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);
  const dictionaries = getDictionaries(configuration);

  const fullDictionary = dictionaries[contentDeclarationFile.key];

  const { filePath } = contentDeclarationFile;

  if (!filePath) {
    appLogger('No file path found for dictionary', {
      level: 'error',
    });
    return;
  }

  const autoFillOptions =
    contentDeclarationFile.fill ?? configuration.content.fill;

  if (
    typeof autoFillOptions === 'boolean' &&
    (autoFillOptions as boolean) === false
  ) {
    appLogger(
      `Auto fill is disabled for '${colorizeKey(fullDictionary.key)}'`,
      {
        level: 'info',
      }
    );
    return;
  }

  const localeList: Locale[] = (
    outputLocales ?? configuration.internationalization.locales
  ).filter((locale) => !parentLocales?.includes(locale));

  const autoFillData: FillData[] = formatFillData(
    autoFillOptions as Fill,
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

    // write file
    await writeContentDeclaration(
      {
        ...contentDeclarationFile,
        fill: undefined,
        filled: true,
        locale: output.isPerLocale ? output.localeList[0] : undefined,
        filePath: output.filePath,
      },
      configuration,
      {
        localeList: output.localeList,
      }
    );

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
