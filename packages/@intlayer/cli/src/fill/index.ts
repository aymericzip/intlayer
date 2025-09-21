import { AIOptions, getIntlayerAPIProxy } from '@intlayer/api'; // Importing only getAiAPI for now
import {
  formatLocale,
  formatPath,
  ListGitFilesOptions,
  mergeDictionaries,
  parallelize,
  prepareIntlayer,
  processPerLocaleDictionary,
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizePath,
  getAppLogger,
  getConfiguration,
  Locales,
} from '@intlayer/config';
import {
  type ContentNode,
  type Dictionary,
  getFilterTranslationsOnlyContent,
  getLocalisedContent,
  getMissingLocalesContent,
} from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { relative } from 'path';
import {
  ensureArray,
  GetTargetDictionaryOptions,
  getTargetUnmergedDictionaries,
} from '../getTargetDictionary';
import { checkAIAccess } from '../utils/checkAIAccess';
import { autoFill } from './autoFill';

const NB_CONCURRENT_TRANSLATIONS = 8;

// Arguments for the fill function
export type FillOptions = {
  sourceLocale?: Locales;
  outputLocales?: Locales | Locales[];
  mode?: 'complete' | 'review';
  gitOptions?: ListGitFilesOptions;
  aiOptions?: AIOptions; // Added aiOptions to be passed to translateJSON
  verbose?: boolean;
  nbConcurrentTranslations?: number;
  build?: boolean;
} & GetTargetDictionaryOptions;

/**
 * Fill translations based on the provided options.
 */
export const fill = async (options: FillOptions): Promise<void> => {
  const configuration = getConfiguration(options.configOptions);
  const appLogger = getAppLogger(configuration, {
    config: {
      prefix: '',
    },
  });

  if (options.build) {
    await prepareIntlayer(configuration);
  }

  const { defaultLocale, locales } = configuration.internationalization;
  const mode = options.mode ?? 'complete';
  const baseLocale = options.sourceLocale ?? defaultLocale;
  const outputLocales = (
    options.outputLocales ? ensureArray(options.outputLocales) : locales
  ).filter((locale) => locale !== baseLocale);

  checkAIAccess(configuration, options.aiOptions);

  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  appLogger('Starting fill function', {
    level: 'info',
  });

  const targetUnmergedDictionaries =
    await getTargetUnmergedDictionaries(options);

  const affectedDictionaryKeys = new Set<string>();
  targetUnmergedDictionaries.forEach((dict) => {
    affectedDictionaryKeys.add(dict.key);
  });

  appLogger([
    'Affected dictionary keys for processing:',
    Array.from(affectedDictionaryKeys)
      .map((key) => colorizeKey(key))
      .join(', '),
  ]);

  const maxKeyLength = Math.max(
    ...targetUnmergedDictionaries.map((dict) => dict.key.length)
  );
  const maxLocaleLength = Math.max(
    ...locales.map((locale) => formatLocale(locale).length)
  );

  for (const targetUnmergedDictionary of targetUnmergedDictionaries) {
    const dictionaryPreset = colon(
      [
        colorize('  - [', ANSIColors.GREY_DARK),
        colorizeKey(targetUnmergedDictionary.key),
        colorize(']', ANSIColors.GREY_DARK),
      ].join(''),
      { colSize: maxKeyLength + 6 }
    );

    const dictionaryKey = targetUnmergedDictionary.key;
    const dictionariesRecord = getDictionaries(configuration);

    const mainDictionaryToProcess: Dictionary =
      dictionariesRecord[dictionaryKey];

    const sourceLocale: Locales =
      (targetUnmergedDictionary.locale as Locales) ?? baseLocale;

    if (!mainDictionaryToProcess) {
      appLogger(
        `${dictionaryPreset} Dictionary not found in dictionariesRecord. Skipping.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    if (!targetUnmergedDictionary.filePath) {
      appLogger(`${dictionaryPreset} Dictionary has no file path. Skipping.`, {
        level: 'warn',
      });
      continue;
    }

    const relativePath = relative(
      configuration.content.baseDir,
      targetUnmergedDictionary.filePath
    );

    appLogger(
      `${dictionaryPreset} Processing content declaration: ${colorizePath(relativePath)}`,
      {
        level: 'info',
      }
    );

    const sourceLocaleContent = getFilterTranslationsOnlyContent(
      mainDictionaryToProcess as unknown as ContentNode,
      sourceLocale,
      { dictionaryKey, keyPath: [] }
    );

    if (Object.keys(sourceLocaleContent).length === 0) {
      appLogger(
        `${dictionaryPreset} No content found for dictionary in source locale ${formatLocale(sourceLocale)}. Skipping translation for this dictionary.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    const result: Dictionary[] = [];

    // Determine output locales
    let outputLocalesList: Locales[] = outputLocales;

    // If mode is review, translate all locales
    // If mode is complete, translate only the locales that are not the source locale
    if (mode === 'complete') {
      const missingLocales = getMissingLocalesContent(
        mainDictionaryToProcess as unknown as ContentNode,
        outputLocales,
        {
          dictionaryKey: mainDictionaryToProcess.key,
          keyPath: [],
          plugins: [],
        }
      );

      outputLocalesList = missingLocales;
    }

    if (outputLocalesList.length === 0) {
      appLogger(
        `${dictionaryPreset} No locales to fill - Skipping dictionary`,

        {
          level: 'warn',
        }
      );
      continue;
    }

    const translationResults = await parallelize(
      outputLocalesList,
      async (targetLocale) => {
        const localePreset = colon(
          [
            colorize('[', ANSIColors.GREY_DARK),
            formatLocale(targetLocale),
            colorize(']', ANSIColors.GREY_DARK),
          ].join(''),
          { colSize: maxLocaleLength }
        );

        appLogger(
          `${dictionaryPreset}${localePreset} Preparing translation for dictionary from ${formatLocale(sourceLocale)} to ${formatLocale(targetLocale)}`,
          {
            level: 'info',
          }
        );

        const presetOutputContent = getLocalisedContent(
          mainDictionaryToProcess as unknown as ContentNode,
          targetLocale,
          { dictionaryKey, keyPath: [] }
        );

        try {
          const translationResult = await intlayerAPI.ai.translateJSON({
            entryFileContent: sourceLocaleContent.content, // Should be JSON, ensure getLocalisedContent provides this.
            presetOutputContent: presetOutputContent.content, // Should be JSON
            dictionaryDescription: mainDictionaryToProcess.description ?? '',
            entryLocale: sourceLocale,
            outputLocale: targetLocale,
            mode,
            aiOptions: options.aiOptions,
          });

          if (!translationResult.data?.fileContent) {
            appLogger(`${dictionaryPreset}${localePreset} No content result`, {
              level: 'error',
            });
            return null;
          }

          const processedPerLocaleDictionary = processPerLocaleDictionary({
            ...mainDictionaryToProcess,
            content: translationResult.data?.fileContent,
            locale: targetLocale,
          });

          return processedPerLocaleDictionary;
        } catch (error) {
          appLogger(
            `${dictionaryPreset}${localePreset} ${colorize('Error filling', ANSIColors.RED)}: ` +
              error,
            {
              level: 'error',
            }
          );
          return null;
        }
      },
      options.nbConcurrentTranslations ?? NB_CONCURRENT_TRANSLATIONS
    );

    // Filter out null results and add to result array
    translationResults.forEach((translationResult) => {
      if (translationResult) {
        result.push(translationResult);
      }
    });

    const dictionaryToMerge =
      mode === 'review'
        ? [...result, mainDictionaryToProcess] // Mode review: generated content will override the base one
        : [mainDictionaryToProcess, ...result]; // Mode complete: base content will override the generated one

    const mergedResults = mergeDictionaries(dictionaryToMerge);

    let formattedDict = targetUnmergedDictionary;

    if (formattedDict.locale) {
      const presetOutputContent = getLocalisedContent(
        mainDictionaryToProcess as unknown as ContentNode,
        formattedDict.locale,
        { dictionaryKey, keyPath: [] }
      );

      formattedDict = {
        ...formattedDict,
        content: presetOutputContent.content,
      };
    }

    const reducedResult = reduceDictionaryContent(mergedResults, formattedDict);

    if (formattedDict.autoFill || configuration.content.autoFill) {
      await autoFill(
        mergedResults,
        targetUnmergedDictionary,
        formattedDict.autoFill ?? configuration.content.autoFill,
        outputLocalesList,
        [sourceLocale],
        configuration
      );
    } else {
      await writeContentDeclaration(
        { ...formattedDict, content: reducedResult.content },
        configuration,
        formattedDict.filePath
      );

      if (formattedDict.filePath) {
        appLogger(
          `${dictionaryPreset} Content declaration written to ${formatPath(formattedDict.filePath)}`,
          {
            level: 'info',
          }
        );
      }
    }
  }
};
