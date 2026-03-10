import { basename, dirname, isAbsolute, normalize, resolve } from 'node:path';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';

export const formatAutoFilledFilePath = async (
  autoFillField: FilePathPattern,
  dictionaryKey: string,
  dictionaryFilePath: string,
  baseDir: string,
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

  // Extract the original filename without extensions (.content.ts -> dictionaryFieldEditor)
  const originalFileName = basename(dictionaryFilePath)
    .split('.')
    .slice(0, -2) // Remove last 2 extensions (.content.tsx)
    .join('.');

  // Replace placeholders in autoFillField
  const result: string = await parseFilePathPattern(autoFillField, {
    key: dictionaryKey,
    fileName: originalFileName,
    locale,
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
