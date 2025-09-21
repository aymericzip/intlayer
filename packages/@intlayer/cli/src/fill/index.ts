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

  appLogger('Starting fill function', {
    level: 'info',
  });

  const targetUnmergedDictionaries =
    await getTargetUnmergedDictionaries(options);

  const affectedDictionaryKeys = new Set<string>();
  targetUnmergedDictionaries.forEach((dict) => {
    affectedDictionaryKeys.add(dict.key);
  });

  appLogger(
    [
      'Affected dictionary keys for processing:',
      Array.from(affectedDictionaryKeys)
        .map((key) => colorizeKey(key))
        .join(', '),
    ],
    {
      isVerbose: true,
    }
  );

  for (const targetUnmergedDictionary of targetUnmergedDictionaries) {
    const dictionaryKey = targetUnmergedDictionary.key;
    const dictionariesRecord = getDictionaries(configuration);

    const mainDictionaryToProcess: Dictionary =
      dictionariesRecord[dictionaryKey];

    const sourceLocale: Locales =
      (targetUnmergedDictionary.locale as Locales) ?? baseLocale;

    if (!mainDictionaryToProcess) {
      appLogger(
        `Dictionary with key '${colorizeKey(dictionaryKey)}' not found in dictionariesRecord. Skipping.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    if (!targetUnmergedDictionary.filePath) {
      appLogger(
        `Dictionary with key '${colorizeKey(dictionaryKey)}' has no file path. Skipping.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    const relativePath = relative(
      configuration.content.baseDir,
      targetUnmergedDictionary.filePath
    );

    appLogger(`Processing content declaration: ${colorizePath(relativePath)}`, {
      level: 'info',
    });

    const sourceLocaleContent = getFilterTranslationsOnlyContent(
      mainDictionaryToProcess as unknown as ContentNode,
      sourceLocale,
      { dictionaryKey, keyPath: [] }
    );

    if (Object.keys(sourceLocaleContent).length === 0) {
      appLogger(
        `No content found for dictionary '${colorizeKey(dictionaryKey)}' in source locale ${formatLocale(sourceLocale)}. Skipping translation for this dictionary.`,
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

    const translationResults = await parallelize(
      outputLocalesList,
      async (targetLocale) => {
        appLogger(
          `Preparing translation for '${colorizeKey(dictionaryKey)}' dictionary from ${formatLocale(sourceLocale)} to ${formatLocale(targetLocale)}`,
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
          const translationResult = await getIntlayerAPIProxy(
            undefined,
            configuration
          ).ai.translateJSON({
            entryFileContent: sourceLocaleContent.content, // Should be JSON, ensure getLocalisedContent provides this.
            presetOutputContent: presetOutputContent.content, // Should be JSON
            dictionaryDescription: mainDictionaryToProcess.description ?? '',
            entryLocale: sourceLocale,
            outputLocale: targetLocale,
            mode,
            aiOptions: options.aiOptions,
          });

          if (!translationResult.data?.fileContent) {
            appLogger(
              `No content result found for '${colorizeKey(dictionaryKey)}' to ${formatLocale(targetLocale)}`,
              {
                level: 'error',
              }
            );
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
            `Error filling '${colorizeKey(dictionaryKey)}' to ${formatLocale(targetLocale)}:` +
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
          `Content declaration for '${colorizeKey(dictionaryKey)}' written to ${formatPath(formattedDict.filePath)}`,
          {
            level: 'info',
          }
        );
      }
    }
  }
};
