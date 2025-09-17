import { AIOptions, getAiAPI, getOAuthAPI } from '@intlayer/api'; // Importing only getAiAPI for now
import {
  ListGitFilesOptions,
  mergeDictionaries,
  prepareIntlayer,
  processPerLocaleDictionary,
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  Locales,
} from '@intlayer/config';
import {
  type ContentNode,
  type Dictionary,
  getFilterTranslationsOnlyContent,
  getLocaleName,
  getLocalisedContent,
} from '@intlayer/core';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import pLimit from 'p-limit';
import { relative } from 'path';
import { checkAIAccess } from '../utils/checkAIAccess';
import { autoFill } from './autoFill';
import { ensureArray, getTargetDictionary } from './getTargetDictionary';

const NB_CONCURRENT_TRANSLATIONS = 5;

// Arguments for the fill function
export type FillOptions = {
  sourceLocale?: Locales;
  outputLocales?: Locales | Locales[];
  file?: string | string[];
  mode?: 'complete' | 'review';
  keys?: string | string[];
  excludedKeys?: string | string[];
  filter?: (entry: Dictionary) => boolean; // DictionaryEntry needs to be defined
  pathFilter?: string | string[];
  gitOptions?: ListGitFilesOptions;
  configOptions?: GetConfigurationOptions;
  aiOptions?: AIOptions; // Added aiOptions to be passed to translateJSON
  verbose?: boolean;
  nbConcurrentTranslations?: number;
  build?: boolean;
};

/**
 * Fill translations based on the provided options.
 */
export const fill = async (options: FillOptions): Promise<void> => {
  const configuration = getConfiguration(options.configOptions);
  const appLogger = getAppLogger(configuration);

  if (options.build) {
    await prepareIntlayer(configuration);
  }

  const { defaultLocale, locales } = configuration.internationalization;
  const mode = options.mode ?? 'review';
  const baseLocale = options.sourceLocale ?? defaultLocale;

  checkAIAccess(configuration, options.aiOptions);

  let oAuth2AccessToken: string | undefined;
  if (configuration.editor.clientId) {
    const intlayerAuthAPI = getOAuthAPI(configuration);
    const oAuth2TokenResult = await intlayerAuthAPI.getOAuth2AccessToken();

    oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;
  }

  appLogger('Starting fill function', {
    level: 'info',
  });

  const targetUnmergedDictionaries = await getTargetDictionary(options);

  // Determine output locales
  const outputLocalesList: Locales[] = (
    options.outputLocales ? ensureArray(options.outputLocales) : locales
  ).filter((locale) =>
    // If mode is review, translate all locales
    // If mode is complete, translate only the locales that are not the source locale
    mode === 'review' ? true : locale !== baseLocale
  );

  const affectedDictionaryKeys = new Set<string>();
  targetUnmergedDictionaries.forEach((dict) => {
    affectedDictionaryKeys.add(dict.key);
  });

  appLogger(
    [
      'Affected dictionary keys for processing:',
      Array.from(affectedDictionaryKeys)
        .map((key) => `${ANSIColors.GREY}${key}${ANSIColors.RESET}`)
        .join(', '),
    ],
    {
      isVerbose: true,
    }
  );

  for (const targetUnmergedDictionary of targetUnmergedDictionaries) {
    const dictionaryKey = targetUnmergedDictionary.key;
    const mainDictionaryToProcess = dictionariesRecord[dictionaryKey];
    const sourceLocale: Locales =
      (targetUnmergedDictionary.locale as Locales) ?? baseLocale;

    if (!mainDictionaryToProcess) {
      appLogger(
        `Dictionary with key '${ANSIColors.GREY}${dictionaryKey}${ANSIColors.RESET}' not found in dictionariesRecord. Skipping.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    if (!targetUnmergedDictionary.filePath) {
      appLogger(
        `Dictionary with key '${ANSIColors.GREY}${dictionaryKey}${ANSIColors.RESET}' has no file path. Skipping.`,
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

    appLogger(
      `Processing content declaration: ${ANSIColors.GREY}${relativePath}${ANSIColors.RESET}`,
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
        `No content found for dictionary '${ANSIColors.GREY}${dictionaryKey}${ANSIColors.RESET}' in source locale ${sourceLocale}. Skipping translation for this dictionary.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    const result: Dictionary[] = [];

    // 5. for each locale to translate (exclude base locale) generate json translations
    // Limit concurrent translations to 5 at a time
    const limit = pLimit(
      options.nbConcurrentTranslations ?? NB_CONCURRENT_TRANSLATIONS
    );

    const translationPromises = outputLocalesList.map((targetLocale) =>
      limit(async () => {
        appLogger(
          `Preparing translation for ${ANSIColors.GREY}'${dictionaryKey}'${ANSIColors.RESET} dictionary from ${ANSIColors.GREEN}${getLocaleName(
            sourceLocale,
            Locales.ENGLISH
          )} (${sourceLocale})${ANSIColors.RESET} to ${ANSIColors.GREEN}${getLocaleName(targetLocale, Locales.ENGLISH)} (${targetLocale})${ANSIColors.RESET}`,
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
          const translationResult = await getAiAPI(
            undefined,
            configuration
          ).translateJSON(
            {
              entryFileContent: sourceLocaleContent.content, // Should be JSON, ensure getLocalisedContent provides this.
              presetOutputContent: presetOutputContent.content, // Should be JSON
              dictionaryDescription: mainDictionaryToProcess.description,
              entryLocale: sourceLocale,
              outputLocale: targetLocale,
              mode,
              aiOptions: options.aiOptions,
            },
            {
              ...(oAuth2AccessToken && {
                headers: {
                  Authorization: `Bearer ${oAuth2AccessToken}`,
                },
              }),
            }
          );

          if (!translationResult.data?.fileContent) {
            appLogger(
              `No content result found for '${ANSIColors.GREY}${dictionaryKey}${ANSIColors.RESET}' to ${targetLocale}`,
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
            `Error filling '${ANSIColors.GREY}${dictionaryKey}${ANSIColors.RESET}' to ${targetLocale}:` +
              error,
            {
              level: 'error',
            }
          );
          return null;
        }
      })
    );

    // Wait for all translations to complete
    const translationResults = await Promise.all(translationPromises);

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

    if (formattedDict.autoFill) {
      await autoFill(
        mergedResults,
        targetUnmergedDictionary,
        formattedDict.autoFill,
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
    }
  }
};
