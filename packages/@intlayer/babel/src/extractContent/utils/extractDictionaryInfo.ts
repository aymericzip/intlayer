import { basename, dirname, extname, relative, resolve } from 'node:path';
import {
  getFormatFromExtension,
  resolveRelativePath,
} from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize } from '@intlayer/config/logger';
import { parseStringPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Fill } from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
  FilePathPatternFunction,
} from '@intlayer/types/filePathPattern';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { extractDictionaryKey } from './extractDictionaryKey';

export const getOutput = (
  configuration: IntlayerConfig,
  locale?: Locale
): FilePathPatternFunction | false => {
  const output = configuration.compiler?.output as Fill | undefined;

  if (output === undefined || output === null) {
    throw new Error(
      `No output configuration found. Add a ${colorize('compiler.output', ANSIColors.BLUE)} in your configuration.`
    );
  }

  if (output === false) return false;

  // Object per-locale record: look up the entry for the given locale
  if (typeof output === 'object' && typeof output !== 'function') {
    const entry = locale
      ? (output as Record<string, boolean | FilePathPattern>)[locale]
      : undefined;
    if (entry === false) return false;
    if (entry === undefined || entry === true) {
      throw new Error(
        `No output pattern configured for locale "${locale}" in compiler.output.`
      );
    }
    return typeof entry === 'string'
      ? (context: FilePathPatternContext) =>
          parseStringPattern(entry as string, context)
      : (entry as FilePathPatternFunction);
  }

  if (typeof output === 'string') {
    return (context: FilePathPatternContext) =>
      parseStringPattern(output, context);
  }

  if (typeof output === 'function') {
    return output as FilePathPatternFunction;
  }

  throw new Error(
    `No output configuration found. Add a ${colorize('compiler.output', ANSIColors.BLUE)} in your configuration.`
  );
};

export type ResolveContentFilePaths = {
  absolutePath: string;
  relativePath: string;
  isPerLocale: boolean;
};

/**
 * Resolves the paths for the content files associated with a component.
 * Checks for existing dictionaries first.
 */
export const resolveContentFilePaths = async (
  filePath: string,
  componentKey: string,
  configuration: IntlayerConfig,
  locale?: Locale
): Promise<ResolveContentFilePaths> => {
  const { baseDir } = configuration.system;
  const { defaultLocale } = configuration.internationalization;

  const unmergedDictionaries = getUnmergedDictionaries(configuration) ?? {};
  const existingDicts = unmergedDictionaries[componentKey]
    ?.filter(
      (dictionary) =>
        // Remove remote dictionaries (Fix: Check for !== instead of ===)
        dictionary.location !== 'remote'
    )
    .filter(
      (dictionary) =>
        // Check for first locale dictionary sorted by priority that include the targeted locale
        dictionary.locale === undefined ||
        dictionary.locale === (locale ?? defaultLocale)
    );

  if (existingDicts?.[0]?.filePath) {
    const existingPath = existingDicts[0].filePath;
    const resolvedAbsolutePath = resolve(baseDir, existingPath);

    return {
      absolutePath: resolvedAbsolutePath,
      relativePath: relative(baseDir, resolvedAbsolutePath),
      isPerLocale: false,
    };
  }

  const output = configuration.compiler?.output as Fill | undefined;
  const isObjectOutput =
    typeof output === 'object' &&
    output !== null &&
    typeof output !== 'function';

  // Build shared context (used for both object and scalar output paths)
  const extension = extname(
    filePath
  ) as FilePathPatternContext['componentExtension'];
  const componentName = basename(filePath, extension);
  const uncapitalizedName =
    componentName.charAt(0).toLowerCase() + componentName.slice(1);
  const componentFormat = getFormatFromExtension(
    extension!
  ) as FilePathPatternContext['componentFormat'];

  const targetLocale = (locale ?? defaultLocale) as Locale;

  const context: FilePathPatternContext = {
    key: componentKey,
    componentDirPath: relative(baseDir, dirname(filePath)),
    componentFileName: componentName,
    fileName: uncapitalizedName,
    componentFormat,
    componentExtension: extension,
    format: componentFormat!,
    locale: targetLocale,
    extension: configuration.content.fileExtensions[0],
  };

  // Object output: each locale has its own pattern → always per-locale
  if (isObjectOutput) {
    const pattern = getOutput(configuration, targetLocale);
    if (pattern === false) {
      throw new Error(
        `compiler.output is disabled for locale "${targetLocale}".`
      );
    }
    const rawAbsolutePath = await pattern(context);
    const absolutePath = resolveRelativePath(
      rawAbsolutePath,
      filePath,
      baseDir
    );
    return {
      absolutePath,
      relativePath: relative(baseDir, absolutePath),
      isPerLocale: true,
    };
  }

  // Scalar string/function output: detect per-locale via dummy locale probe
  const pattern = getOutput(configuration);
  if (pattern === false) {
    throw new Error(
      `No output configuration found. Add a ${colorize('compiler.output', ANSIColors.BLUE)} in your configuration.`
    );
  }

  const rawAbsolutePath = await pattern({ ...context, locale: defaultLocale });

  // Apply the resolution rules
  const absolutePath = resolveRelativePath(rawAbsolutePath, filePath, baseDir);

  const localeIdentifier = '###########locale###########' as Locale;

  const rawPerLocalePath = await pattern({
    ...context,
    locale: localeIdentifier,
  });
  const isPerLocale = rawPerLocalePath.includes(localeIdentifier);

  return {
    absolutePath,
    relativePath: relative(baseDir, absolutePath),
    isPerLocale,
  };
};

export type ExtractDictionaryInfoOptions = {
  configuration?: IntlayerConfig;
};

/**
 * Extracts the dictionary key and dictionary file path for a given component file.
 */
export const extractDictionaryInfo = async (
  filePath: string,
  fileText: string,
  configuration: IntlayerConfig
): Promise<
  {
    dictionaryKey: string;
  } & ResolveContentFilePaths
> => {
  const dictionaryKey = extractDictionaryKey(filePath, fileText);

  const resolvedPaths = await resolveContentFilePaths(
    filePath,
    dictionaryKey,
    configuration
  );

  return {
    dictionaryKey,
    ...resolvedPaths,
  };
};
