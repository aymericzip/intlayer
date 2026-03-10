import {
  basename,
  dirname,
  extname,
  isAbsolute,
  normalize,
  relative,
  resolve,
} from 'node:path';
import type { Locale } from '@intlayer/types/allLocales';
import type { DictionaryKey } from '@intlayer/types/dictionary';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import { parseFilePathPattern } from './parseFilePathPattern';

export type ResolvedDictionaryPath = {
  filePath: string;
  locales: Locale[];
  isPerLocale: boolean;
};

export type ResolveDictionaryPathsOptions = {
  pattern: FilePathPattern;
  dictionaryKey: DictionaryKey;
  sourceFilePath: string;
  baseDir: string;
  locales: Locale[];
  defaultLocale: Locale;
  contentExtension?: string;
  format?: 'ts' | 'cjs' | 'esm' | 'json' | 'jsonc' | 'json5';
};

/**
 * Resolves one or more dictionary paths based on a FilePathPattern and a list of locales.
 * Handles {{locale}}, {{key}}, {{fileName}}, {{extension}}, {{componentExtension}}, {{dirPath}}, {{format}}, and {{componentFormat}} variables.
 */
export const resolveDictionaryPaths = async (
  options: ResolveDictionaryPathsOptions
): Promise<ResolvedDictionaryPath[]> => {
  const {
    pattern,
    dictionaryKey,
    sourceFilePath,
    baseDir,
    locales,
    defaultLocale,
    format,
  } = options;

  // Validate inputs
  if (!pattern) {
    throw new Error('pattern must be provided');
  }
  if (!dictionaryKey || typeof dictionaryKey !== 'string') {
    throw new Error('dictionaryKey must be a non-empty string');
  }
  if (!sourceFilePath || typeof sourceFilePath !== 'string') {
    throw new Error('sourceFilePath must be a non-empty string');
  }
  if (!baseDir || typeof baseDir !== 'string') {
    throw new Error('baseDir must be a non-empty string');
  }

  const getFormatFromExtension = (
    extension: string
  ): ResolveDictionaryPathsOptions['format'] => {
    switch (extension) {
      case '.ts':
      case '.tsx':
        return 'ts';
      case '.cjs':
      case '.cjsx':
        return 'cjs';
      case '.js':
      case '.jsx':
      case '.mjs':
      case '.mjsx':
        return 'esm';
      case '.json':
      case '.jsonc':
      case '.json5':
        return 'json';
      default:
        return 'ts';
    }
  };

  const absoluteSourceFilePath = isAbsolute(sourceFilePath)
    ? sourceFilePath
    : resolve(baseDir, sourceFilePath);

  const dirPath = dirname(absoluteSourceFilePath);

  // Extract the original filename without extensions
  // If it ends with .content.xxx, remove .content.xxx, otherwise just remove the extension
  const base = basename(sourceFilePath);
  const componentFileName = base.includes('.content.')
    ? base.split('.content.')[0]
    : base.split('.')[0];
  const originalFileName = componentFileName.toLowerCase();

  const componentExtension = extname(sourceFilePath) as any;
  const componentFormat = getFormatFromExtension(componentExtension);
  const relativeDirPath = relative(baseDir, dirPath);

  const resolvedPaths: ResolvedDictionaryPath[] = [];

  // Helper to resolve a single path for a given locale or set of locales
  const resolvePath = async (localeForPattern?: Locale): Promise<string> => {
    const result: string = await parseFilePathPattern(pattern, {
      key: dictionaryKey,
      fileName: originalFileName,
      componentFileName,
      locale: localeForPattern,
      componentExtension,
      componentFormat,
      format:
        format ??
        getFormatFromExtension(
          options.contentExtension ?? componentExtension
        ) ??
        'ts',
      extension: options.contentExtension ?? componentExtension,
      dirPath: relativeDirPath,
    });

    // Normalize the dictionary file path - if it's relative, make it absolute relative to source file dir
    // const absoluteSourceFilePath = isAbsolute(sourceFilePath)
    //   ? sourceFilePath
    //   : resolve(baseDir, sourceFilePath);

    // Handle relative paths (starting with ./ or ../)
    if (result.startsWith('./') || result.startsWith('../')) {
      const fileDir = dirname(absoluteSourceFilePath);
      return resolve(fileDir, result);
    }

    // Handle absolute paths
    if (isAbsolute(result)) {
      const normalizedResult = normalize(result);
      const normalizedBaseDir = normalize(baseDir);

      // Check if it's relative to baseDir (starts with /)
      // but not a system path (like /usr/local)
      if (
        result.startsWith('/') &&
        !normalizedResult.startsWith(normalizedBaseDir)
      ) {
        // Try to resolve it relative to baseDir first
        const relativeToBase = resolve(baseDir, result.substring(1));

        // If the path doesn't exist in common system directories, treat as relative to baseDir
        if (
          !result.startsWith('/usr/') &&
          !result.startsWith('/etc/') &&
          !result.startsWith('/var/') &&
          !result.startsWith('/home/') &&
          !result.startsWith('/Users/') &&
          !result.startsWith('/tmp/') &&
          !result.startsWith('/private/') &&
          !result.startsWith('/opt/')
        ) {
          return relativeToBase;
        }
      }

      // It's a true system absolute path
      return normalizedResult;
    }

    // Default case: treat as relative to baseDir
    return resolve(baseDir, result);
  };

  // If pattern is a string and contains {{locale}}, or if it's an object/function, it's definitely per-locale
  const patternString = typeof pattern === 'string' ? pattern : '';
  const hasLocaleVariable = patternString.includes('{{locale}}');
  const isPatternPerLocale =
    hasLocaleVariable ||
    typeof pattern === 'function' ||
    (typeof pattern === 'object' && pattern !== null);

  if (isPatternPerLocale) {
    // Generate one path per locale
    for (const locale of locales) {
      const filePath = await resolvePath(locale);
      resolvedPaths.push({
        filePath,
        locales: [locale],
        isPerLocale: true,
      });
    }

    // Group by filePath in case multiple locales resolve to the same path
    const groupedByFilePath = resolvedPaths.reduce((acc, curr) => {
      const existing = acc.find((item) => item.filePath === curr.filePath);
      if (existing) {
        if (!existing.locales.includes(curr.locales[0])) {
          existing.locales.push(...curr.locales);
        }
        existing.isPerLocale = false; // If multiple locales share a path, it's no longer strictly per-locale
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as ResolvedDictionaryPath[]);

    return groupedByFilePath;
  } else {
    // Single multi-lingual path using default locale for pattern resolution if needed
    const filePath = await resolvePath(defaultLocale);
    return [
      {
        filePath,
        locales,
        isPerLocale: false,
      },
    ];
  }
};
