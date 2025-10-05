import { relative } from 'node:path';
import { type AIOptions, getIntlayerAPIProxy } from '@intlayer/api'; // Importing only getAiAPI for now
import {
  formatLocale,
  formatPath,
  type ListGitFilesOptions,
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
  type Locales,
} from '@intlayer/config';
import {
  type ContentNode,
  type Dictionary,
  getFilterTranslationsOnlyContent,
  getLocalizedContent,
  getMissingLocalesContent,
} from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import {
  ensureArray,
  type GetTargetDictionaryOptions,
  getTargetUnmergedDictionaries,
} from '../getTargetDictionary';
import { checkAIAccess } from '../utils/checkAccess';
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

  const hasAIAccess = await checkAIAccess(configuration, options.aiOptions);

  if (!hasAIAccess) return;

  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

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
  const dictionariesRecord = getDictionaries(configuration);

  type TranslationTask = {
    dictionaryKey: string;
    sourceLocale: Locales;
    targetLocale: Locales;
    dictionaryPreset: string;
    localePreset: string;
  };

  const translationTasks: TranslationTask[] = [];

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

    let outputLocalesList: Locales[] = outputLocales;

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

    for (const targetLocale of outputLocalesList) {
      const localePreset = colon(
        [
          colorize('[', ANSIColors.GREY_DARK),
          formatLocale(targetLocale),
          colorize(']', ANSIColors.GREY_DARK),
        ].join(''),
        { colSize: maxLocaleLength }
      );

      translationTasks.push({
        dictionaryKey,
        sourceLocale,
        targetLocale,
        dictionaryPreset,
        localePreset,
      });
    }
  }

  const translationResults = await parallelize(
    translationTasks,
    async (task) => {
      const mainDictionaryToProcess: Dictionary =
        dictionariesRecord[task.dictionaryKey];

      appLogger(
        `${task.dictionaryPreset}${task.localePreset} Preparing translation for dictionary from ${formatLocale(task.sourceLocale)} to ${formatLocale(task.targetLocale)}`,
        {
          level: 'info',
        }
      );

      const sourceLocaleContent = getFilterTranslationsOnlyContent(
        mainDictionaryToProcess as unknown as ContentNode,
        task.sourceLocale,
        { dictionaryKey: task.dictionaryKey, keyPath: [] }
      );

      const presetOutputContent = getLocalizedContent(
        mainDictionaryToProcess as unknown as ContentNode,
        task.targetLocale,
        { dictionaryKey: task.dictionaryKey, keyPath: [] }
      );

      try {
        const translationResult = await intlayerAPI.ai.translateJSON({
          entryFileContent: sourceLocaleContent.content,
          presetOutputContent: presetOutputContent.content,
          dictionaryDescription: mainDictionaryToProcess.description ?? '',
          entryLocale: task.sourceLocale,
          outputLocale: task.targetLocale,
          mode,
          aiOptions: options.aiOptions,
        });

        if (!translationResult.data?.fileContent) {
          appLogger(
            `${task.dictionaryPreset}${task.localePreset} No content result`,
            {
              level: 'error',
            }
          );
          return { key: task.dictionaryKey, result: null } as const;
        }

        const processedPerLocaleDictionary = processPerLocaleDictionary({
          ...mainDictionaryToProcess,
          content: translationResult.data?.fileContent,
          locale: task.targetLocale,
        });

        return {
          key: task.dictionaryKey,
          result: processedPerLocaleDictionary,
        } as const;
      } catch (error) {
        appLogger(
          `${task.dictionaryPreset}${task.localePreset} ${colorize('Error filling', ANSIColors.RED)}: ` +
            error,
          {
            level: 'error',
          }
        );
        return { key: task.dictionaryKey, result: null } as const;
      }
    },
    options.nbConcurrentTranslations ?? NB_CONCURRENT_TRANSLATIONS
  );

  const resultsByDictionary = new Map<string, Dictionary[]>();
  for (const item of translationResults) {
    if (item?.result) {
      const list = resultsByDictionary.get(item.key) ?? [];
      list.push(item.result);
      resultsByDictionary.set(item.key, list);
    }
  }

  for (const targetUnmergedDictionary of targetUnmergedDictionaries) {
    const dictionaryKey = targetUnmergedDictionary.key;
    const mainDictionaryToProcess: Dictionary =
      dictionariesRecord[dictionaryKey];

    const sourceLocale: Locales =
      (targetUnmergedDictionary.locale as Locales) ?? baseLocale;

    if (!mainDictionaryToProcess || !targetUnmergedDictionary.filePath) {
      continue;
    }

    let outputLocalesList: Locales[] = outputLocales;

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
      continue;
    }

    const perLocaleResults = resultsByDictionary.get(dictionaryKey) ?? [];

    const dictionaryToMerge =
      mode === 'review'
        ? [...perLocaleResults, mainDictionaryToProcess]
        : [mainDictionaryToProcess, ...perLocaleResults];

    const mergedResults = mergeDictionaries(dictionaryToMerge);

    let formattedDict = targetUnmergedDictionary;

    if (formattedDict.locale) {
      const presetOutputContent = getLocalizedContent(
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
        const dictionaryPreset = colon(
          [
            colorize('  - [', ANSIColors.GREY_DARK),
            colorizeKey(targetUnmergedDictionary.key),
            colorize(']', ANSIColors.GREY_DARK),
          ].join(''),
          { colSize: maxKeyLength + 6 }
        );
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
