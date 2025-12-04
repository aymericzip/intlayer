import { relative } from 'node:path';
import {
  formatLocale,
  formatPath,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import { colorizeKey, getAppLogger } from '@intlayer/config';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary, Fill, IntlayerConfig, Locale } from '@intlayer/types';
import { type FillData, formatFillData } from './formatFillData';
import { getAvailableLocalesInDictionary } from './getAvailableLocalesInDictionary';

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

  const fillOptions: Fill | undefined =
    contentDeclarationFile.fill ?? configuration.dictionary?.fill ?? true;

  if ((fillOptions as boolean) === false) {
    appLogger(
      `Auto fill is disabled for '${colorizeKey(fullDictionary.key)}'`,
      {
        level: 'info',
      }
    );
    return;
  }

  const requestedLocales: Locale[] = (
    outputLocales ?? configuration.internationalization.locales
  ).filter((locale) => !parentLocales?.includes(locale));

  // Get locales that actually have translations in the content
  const availableLocales = getAvailableLocalesInDictionary(
    contentDeclarationFile
  );

  // Only write files for locales that have actual translations
  const localeList = requestedLocales.filter((locale) =>
    availableLocales.includes(locale)
  );

  if (localeList.length === 0) {
    appLogger(
      `No translations available for dictionary '${colorizeKey(fullDictionary.key)}'`,
      {
        level: 'info',
      }
    );
    return;
  }

  const fillData: FillData[] = formatFillData(
    fillOptions as Fill,
    localeList,
    filePath,
    fullDictionary.key,
    configuration
  );

  for await (const output of fillData) {
    if (!output.filePath) {
      appLogger(
        `No file path found for auto filled content declaration for '${colorizeKey(fullDictionary.key)}'`,
        {
          level: 'error',
        }
      );
      continue;
    }

    // biome-ignore lint/correctness/noUnusedVariables: Just filtering out the fill property
    const { fill, ...rest } = contentDeclarationFile;

    const relativeFilePath = relative(
      configuration.content.baseDir,
      output.filePath
    );

    // write file
    await writeContentDeclaration(
      {
        ...rest,
        filled: true,
        locale: output.isPerLocale ? output.localeList[0] : undefined,
        localId: `${contentDeclarationFile.key}::local::${relativeFilePath}`,
        filePath: relativeFilePath,
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
