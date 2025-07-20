import { AIOptions, getAiAPI, getAuthAPI } from '@intlayer/api'; // Importing only getAiAPI for now
import {
  getFilteredLocalesContent,
  listGitFiles,
  ListGitFilesOptions,
  mergeDictionaries,
  processPerLocaleDictionary,
  reduceDictionaryContent,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  type IntlayerConfig,
  Locales,
} from '@intlayer/config';
import {
  type AutoFill,
  type ContentNode,
  type Dictionary,
  getLocalisedContent,
} from '@intlayer/core';
import dictionariesRecord from '@intlayer/dictionaries-entry';
import unmergedDictionariesRecord from '@intlayer/unmerged-dictionaries-entry';
import { dirname, extname, join } from 'path';
import { checkAIAccess } from './utils/checkAIAccess';

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
};

const ensureArray = <T>(value: T | T[]): T[] => [value].flat() as T[];

const getTargetDictionary = async (options: FillOptions) => {
  const configuration = getConfiguration(options.configOptions);

  const { baseDir } = configuration.content;

  let result = Object.values(unmergedDictionariesRecord).flat();

  // 1. if filePath not defined, list all content declaration files based on unmerged dictionaries list
  if (typeof options.file !== 'undefined') {
    const fileArray = ensureArray(options.file);
    const absoluteFilePaths = fileArray.map((file) => join(baseDir, file));

    result = result.filter(
      (dict) =>
        dict.filePath &&
        (absoluteFilePaths.includes(dict.filePath) ||
          absoluteFilePaths.includes(join(baseDir, dict.filePath)))
    );
  }

  if (typeof options.keys !== 'undefined') {
    result = result.filter((dict) =>
      ensureArray(options.keys)?.includes(dict.key)
    );
  }

  if (typeof options.excludedKeys !== 'undefined') {
    result = result.filter(
      (dict) => !ensureArray(options.excludedKeys)?.includes(dict.key)
    );
  }

  if (typeof options.pathFilter !== 'undefined') {
    result = result.filter((dict) =>
      ensureArray(options.pathFilter)?.includes(dict.filePath ?? '')
    );
  }

  if (typeof options.filter !== 'undefined') {
    result = result.filter(options.filter);
  }

  const gitOptions = options.gitOptions;
  if (gitOptions) {
    const gitChangedFiles = await listGitFiles(gitOptions);

    if (gitChangedFiles) {
      // Convert dictionary file paths to be relative to git root for comparison

      // Filter dictionaries based on git changed files
      result = result.filter((dict) => {
        if (!dict.filePath) return false;

        return gitChangedFiles.some((gitFile) => dict.filePath === gitFile);
      });
    }
  }

  return result.filter((dict) => !dict.autoFilled);
};

const transformUriToAbsolutePath = (
  uri: string,
  filePath: string,
  baseDir: string
) => {
  if (uri.startsWith('/')) {
    return join(baseDir, uri);
  }

  if (uri.startsWith('./')) {
    return join(dirname(filePath), uri);
  }

  return filePath;
};

export type AutoFillData = {
  localeList: Locales[];
  filePath: string;
};

const formatAutoFillData = (
  autoFillOptions: AutoFill,
  localeList: Locales[],
  filePath: string,
  dictionaryKey: string,
  configuration: IntlayerConfig
): AutoFillData[] => {
  const outputContentDeclarationFile: AutoFillData[] = [];

  if (!Boolean(autoFillOptions)) return outputContentDeclarationFile;

  if (autoFillOptions === true) {
    // wanted jsonFilePath: /..../src/components/home/index.content.json
    // replace file extension in json
    let jsonFilePath = filePath.replace(extname(filePath), '.json');

    // if both filePath jsonFilePath are same path, change it as : /..../src/components/home/index.fill.content.json
    if (filePath === jsonFilePath) {
      jsonFilePath = jsonFilePath.replace(extname(jsonFilePath), '.fill.json');
    }

    outputContentDeclarationFile.push({
      localeList,
      filePath: jsonFilePath,
    });
  }

  if (typeof autoFillOptions === 'string') {
    if (autoFillOptions.includes('{{locale}}')) {
      const output = localeList.map((locale) => ({
        localeList: [locale],
        filePath: transformUriToAbsolutePath(
          autoFillOptions
            .replace('{{locale}}', locale)
            .replace('{{key}}', dictionaryKey),
          filePath,
          configuration.content.baseDir
        ),
      }));

      outputContentDeclarationFile.push(...output);
    } else {
      outputContentDeclarationFile.push({
        localeList,
        filePath: transformUriToAbsolutePath(
          autoFillOptions,
          filePath,
          configuration.content.baseDir
        ),
      });
    }

    return outputContentDeclarationFile;
  }

  if (typeof autoFillOptions === 'object') {
    const localeList = Object.keys(autoFillOptions).filter(
      (locale) => typeof autoFillOptions[locale] === 'string'
    ) as Locales[];

    const output: AutoFillData[] = localeList.map((locale) => ({
      localeList: [locale],
      filePath: transformUriToAbsolutePath(
        autoFillOptions[locale].replace('{{key}}', dictionaryKey),
        filePath,
        configuration.content.baseDir
      ),
    }));

    // Group by filePath and merge localeList
    const groupedByFilePath = output.reduce((acc, curr) => {
      const existing = acc.find((item) => item.filePath === curr.filePath);
      if (existing) {
        existing.localeList.push(...curr.localeList);
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as AutoFillData[]);

    outputContentDeclarationFile.push(...groupedByFilePath);
  }

  return outputContentDeclarationFile;
};

const autoFill = async (
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

  appLogger(`Auto fill data: ${JSON.stringify(autoFillData, null, 2)}`, {
    level: 'info',
    isVerbose: true,
  });

  for await (const output of autoFillData) {
    const reducedDictionary = reduceDictionaryContent(
      fullDictionary,
      contentDeclarationFile
    );

    const isPerLocaleDeclarationFile = output.localeList.length === 1;

    if (isPerLocaleDeclarationFile) {
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

/**
 * Fill translations based on the provided options.
 */
export const fill = async (options: FillOptions): Promise<void> => {
  const configuration = getConfiguration(options.configOptions);
  const appLogger = getAppLogger(configuration);

  const { defaultLocale, locales } = configuration.internationalization;
  const mode = options.mode ?? 'review';
  const baseLocale = options.sourceLocale ?? defaultLocale;

  checkAIAccess(configuration, options.aiOptions);

  let oAuth2AccessToken: string | undefined;
  if (configuration.editor.clientId) {
    const intlayerAuthAPI = getAuthAPI(configuration);
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
      Array.from(affectedDictionaryKeys).join(', '),
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
        `Dictionary with key "${dictionaryKey}" not found in dictionariesRecord. Skipping.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    appLogger(
      `Processing content declaration: ${targetUnmergedDictionary.filePath}`,
      {
        isVerbose: true,
      }
    );

    const sourceLocaleContent = getLocalisedContent(
      mainDictionaryToProcess as unknown as ContentNode,
      sourceLocale,
      { dictionaryKey, keyPath: [] }
    );

    if (Object.keys(sourceLocaleContent).length === 0) {
      appLogger(
        `No content found for dictionary ${dictionaryKey} in source locale ${sourceLocale}. Skipping translation for this dictionary.`,
        {
          level: 'warn',
        }
      );
      continue;
    }

    const result: Dictionary[] = [];

    // 5. for each locale to translate (exclude base locale) generate json translations
    for await (const targetLocale of outputLocalesList) {
      appLogger(
        `Preparing translation for ${dictionaryKey} from ${sourceLocale} to ${targetLocale}`,
        {
          isVerbose: true,
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
            `No content result found for ${dictionaryKey} to ${targetLocale}`,
            {
              level: 'error',
            }
          );
          continue;
        }

        const processedPerLocaleDictionary = processPerLocaleDictionary({
          ...mainDictionaryToProcess,
          content: translationResult.data?.fileContent,
          locale: targetLocale,
        });

        result.push(processedPerLocaleDictionary);
      } catch (error) {
        appLogger(
          `Error filling ${dictionaryKey} to ${targetLocale}:` + error,
          {
            level: 'error',
          }
        );
      }
    }

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

    await writeContentDeclaration(
      { ...formattedDict, content: reducedResult.content },
      configuration,
      formattedDict.filePath
    );

    await autoFill(
      mergedResults,
      targetUnmergedDictionary,
      formattedDict.autoFill,
      outputLocalesList,
      [sourceLocale],
      configuration
    );
  }
};
