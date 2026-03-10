import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { writeContentDeclaration } from '@intlayer/chokidar/cli';
import type { Dictionary, DictionaryKey } from '@intlayer/types/dictionary';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

export type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, string>;
};

/**
 * Resolves the path for the content file associated with a component.
 * Checks for existing dictionaries first.
 */
export const resolveContentFilePath = (
  filePath: string,
  componentKey: string,
  configuration: IntlayerConfig,
  outputDir?: string
): { contentFilePath: string; relativeContentFilePath: string } => {
  const { baseDir, fileExtensions } = configuration.content;
  const unmergedDictionaries = getUnmergedDictionaries(configuration) ?? {};
  const existingDicts = unmergedDictionaries[componentKey] as
    | Dictionary[]
    | undefined;

  if (existingDicts?.[0]?.filePath) {
    return {
      contentFilePath: resolve(baseDir, existingDicts[0].filePath),
      relativeContentFilePath: existingDicts[0].filePath,
    };
  }

  const dirName = outputDir ? resolve(outputDir) : dirname(filePath);
  const firstExtension = fileExtensions[0];
  const extension = firstExtension.startsWith('.')
    ? firstExtension
    : `.${firstExtension}`;
  const originalFileBase = basename(filePath, extname(filePath));
  const contentBaseName =
    originalFileBase.charAt(0).toLowerCase() + originalFileBase.slice(1);
  const contentFilePath = join(dirName, `${contentBaseName}${extension}`);
  const relativeContentFilePath = relative(baseDir, contentFilePath);

  return { contentFilePath, relativeContentFilePath };
};

/**
 * Creates a dictionary object from extracted content.
 * Handles both single-locale and multi-locale formats based on configuration.
 */
export const createDictionary = (
  extractedContent: Record<string, string>,
  componentKey: string,
  relativeContentFilePath: string,
  configuration: IntlayerConfig
): Dictionary => {
  const { defaultLocale } = configuration.internationalization;
  const isPerLocaleFile = configuration?.dictionary?.locale;

  if (isPerLocaleFile) {
    return {
      key: componentKey,
      content: extractedContent,
      locale: defaultLocale,
      filePath: relativeContentFilePath,
    } as Dictionary;
  }

  const multilingualContent: Record<string, TranslationNode> = {};

  for (const [key, value] of Object.entries(extractedContent)) {
    multilingualContent[key] = {
      nodeType: 'translation',
      translation: {
        [defaultLocale]: value,
      },
    };
  }

  return {
    key: componentKey as DictionaryKey,
    content: multilingualContent,
    filePath: relativeContentFilePath,
  } as Dictionary;
};

/**
 * Helper to write extracted content to a dictionary file.
 */
export const writeContentHelper = async (
  extractedContent: Record<string, string>,
  componentKey: string,
  filePath: string,
  configuration: IntlayerConfig,
  outputDir?: string
): Promise<string> => {
  const { contentFilePath, relativeContentFilePath } = resolveContentFilePath(
    filePath,
    componentKey,
    configuration,
    outputDir
  );

  const dictionary = createDictionary(
    extractedContent,
    componentKey,
    relativeContentFilePath,
    configuration
  );

  const relativeDir = relative(
    configuration.content.baseDir,
    dirname(contentFilePath)
  );

  await writeContentDeclaration(dictionary, configuration, {
    newDictionariesPath: relativeDir,
  });

  return contentFilePath;
};
