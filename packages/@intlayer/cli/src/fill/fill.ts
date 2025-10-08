import type { AIOptions } from '@intlayer/api'; // Importing only getAiAPI for now
import {
  formatLocale,
  formatPath,
  type ListGitFilesOptions,
  mergeDictionaries,
  parallelize,
  prepareIntlayer,
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  getAppLogger,
  getConfiguration,
  type Locales,
} from '@intlayer/config';
import {
  type ContentNode,
  type Dictionary,
  getLocalizedContent,
} from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import {
  ensureArray,
  type GetTargetDictionaryOptions,
  getTargetUnmergedDictionaries,
} from '../getTargetDictionary';
import { checkAIAccess } from '../utils/checkAccess';
import {
  listTranslationsTasks,
  type TranslationTask,
} from './listTranslationsTasks';
import { translateDictionary } from './translateDictionary';
import { writeAutoFill } from './writeAutoFill';

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
export const fill = async (options?: FillOptions): Promise<void> => {
  const configuration = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  if (options?.build === true) {
    await prepareIntlayer(configuration, { forceRun: true });
  } else if (typeof options?.build === 'undefined') {
    await prepareIntlayer(configuration);
  }

  const { defaultLocale, locales } = configuration.internationalization;
  const mode = options?.mode ?? 'complete';
  const baseLocale = options?.sourceLocale ?? defaultLocale;
  const outputLocales = (
    options?.outputLocales ? ensureArray(options.outputLocales) : locales
  ).filter((locale) => locale !== baseLocale);

  const hasAIAccess = await checkAIAccess(configuration, options?.aiOptions);

  if (!hasAIAccess) return;

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

  /**
   * List the translations tasks
   *
   * Create a list of per-locale dictionaries to translate
   *
   * In 'complete' mode, filter only the missing locales to translate
   */
  const translationTasks: TranslationTask[] = listTranslationsTasks(
    targetUnmergedDictionaries,
    dictionariesRecord,
    outputLocales,
    mode,
    baseLocale,
    maxKeyLength,
    appLogger
  );

  /**
   * Translate the dictionaries and return
   */
  const translationResults = await parallelize(
    translationTasks,
    async (task) =>
      translateDictionary(
        task,
        dictionariesRecord,
        maxLocaleLength,
        mode,
        configuration,
        options?.aiOptions
      ),
    options?.nbConcurrentTranslations ?? NB_CONCURRENT_TRANSLATIONS
  );

  /**
   * Form a per-locale dictionary record again
   */
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

    const perLocaleResults = resultsByDictionary.get(dictionaryKey) ?? [];

    /**
     * Merge the new translations with the base content
     *
     * In 'review' mode, consider the new translations over the base content declaration
     * In 'complete' mode, consider the base content declaration over the new translations
     */
    const dictionaryToMerge: Dictionary[] =
      mode === 'review'
        ? [...perLocaleResults, mainDictionaryToProcess]
        : [mainDictionaryToProcess, ...perLocaleResults];

    const mergedResults = mergeDictionaries(dictionaryToMerge);

    let formattedDict = targetUnmergedDictionary;

    /**
     * If the dictionary is a per-locale dictionary, get the content for the specific locale
     */
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

    /**
     * In the case two dictionaries have the same key, reducing the content allows to keep the base dictionary structure without inserting new fields
     */
    const reducedResult: Dictionary = reduceDictionaryContent(
      mergedResults,
      formattedDict
    );

    /**
     * Check if auto fill is enabled
     */
    const isAutoFillEnabled =
      formattedDict.autoFill || configuration.content.autoFill;
    const isAutoFillPerLocale =
      typeof formattedDict.locale === 'undefined' ||
      formattedDict.locale === sourceLocale;

    if (isAutoFillEnabled && isAutoFillPerLocale) {
      const localeList = resultsByDictionary
        .get(dictionaryKey)
        ?.map((result) => result.locale) as Locales[];

      /**
       * Write auto filled dictionary
       */
      await writeAutoFill(
        mergedResults,
        targetUnmergedDictionary,
        formattedDict.autoFill ?? configuration.content.autoFill,
        localeList,
        [sourceLocale],
        configuration
      );
    } else {
      /**
       * Otherwise, write the base dictionary
       */
      await writeContentDeclaration(
        { ...formattedDict, content: reducedResult.content },
        configuration
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
