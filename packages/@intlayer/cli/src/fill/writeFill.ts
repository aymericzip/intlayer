import { relative } from 'node:path';
import { writeContentDeclaration } from '@intlayer/chokidar/build';
import { formatLocale, formatPath } from '@intlayer/chokidar/utils';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, Fill } from '@intlayer/types/dictionary';
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

  const fillData: FillData[] = await formatFillData(
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

    const { fill, ...rest } = contentDeclarationFile;

    const relativeFilePath = relative(
      configuration.system.baseDir,
      output.filePath
    );

    // write file
    await writeContentDeclaration(
      {
        ...rest,
        filled: true,
        // For object fill each entry targets a specific locale even when the
        // path pattern is fixed (isPerLocale === false), so always set locale.
        locale:
          output.isPerLocale || typeof fillOptions === 'object'
            ? output.localeList[0]
            : undefined,
        localId: `${contentDeclarationFile.key}::local::${relativeFilePath}`,
        filePath: relativeFilePath,
      },
      configuration,
      {
        // For per-locale files each output covers exactly one locale.
        // For a string/function fill producing a single multilingual file we
        // want the full locale set (including the source locale) so the written
        // file contains all translations, not just the newly-translated ones.
        // For an object fill each entry already has the correct restricted
        // localeList (one locale per pattern), so we use it directly — adding
        // the source locale back would pollute a fr-only file with en content.
        localeList:
          output.isPerLocale || typeof fillOptions === 'object'
            ? output.localeList
            : (outputLocales ?? configuration.internationalization.locales),
      }
    );

    if (output.isPerLocale || typeof fillOptions === 'object') {
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
