import { basename, dirname, isAbsolute, normalize, resolve } from 'node:path';
import { getFormatFromExtension } from '@intlayer/chokidar/utils';
import { GREY_DARK } from '@intlayer/config/colors';
import { colorize, colorizePath } from '@intlayer/config/logger';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';

export const formatAutoFilledFilePath = async (
  autoFillField: FilePathPattern,
  dictionaryKey: string,
  dictionaryFilePath: string,
  baseDir: string,
  configuration: IntlayerConfig,
  locale?: Locale
): Promise<string> => {
  // Validate inputs
  if (!autoFillField) {
    throw new Error('autoFillField must be provided');
  }
  if (!dictionaryKey || typeof dictionaryKey !== 'string') {
    throw new Error('dictionaryKey must be a non-empty string');
  }
  if (!dictionaryFilePath || typeof dictionaryFilePath !== 'string') {
    throw new Error('dictionaryFilePath must be a non-empty string');
  }
  if (!baseDir || typeof baseDir !== 'string') {
    throw new Error('baseDir must be a non-empty string');
  }

  // Extract the original filename accurately
  const base = basename(dictionaryFilePath);

  const { fileExtensions } = configuration.content;
  const extensionMatch = fileExtensions.find((ext) => base.endsWith(ext));

  const originalFileName = extensionMatch
    ? base.slice(0, -extensionMatch.length)
    : base.split('.')[0];

  console.log({ extensionMatch });

  if (!extensionMatch) {
    throw new Error(
      `No extension found for file ${colorizePath(dictionaryFilePath)}. Valid extensions are: ${colorize(
        fileExtensions.join(', '),
        GREY_DARK
      )}`
    );
  }

  // Replace placeholders in autoFillField
  const result: string = await parseFilePathPattern(autoFillField, {
    key: dictionaryKey,
    fileName: originalFileName,
    locale,
    extension: extensionMatch,
    format: getFormatFromExtension(extensionMatch),
  });

  // Normalize the dictionary file path - if it's relative, make it absolute relative to baseDir
  const absoluteDictionaryPath = isAbsolute(dictionaryFilePath)
    ? dictionaryFilePath
    : resolve(baseDir, dictionaryFilePath);

  // Handle relative paths (starting with ./ or ../)
  if (result.startsWith('./') || result.startsWith('../')) {
    const fileDir = dirname(absoluteDictionaryPath);
    const resolvedPath = resolve(fileDir, result);

    return resolvedPath;
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
        !result.startsWith('/Users/')
      ) {
        return relativeToBase;
      }
    }

    // It's a true system absolute path
    return normalizedResult;
  }

  // Default case: treat as relative to baseDir
  return normalize(result);
};
