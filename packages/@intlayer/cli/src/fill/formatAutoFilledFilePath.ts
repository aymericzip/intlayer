import {
  basename,
  dirname,
  isAbsolute,
  normalize,
  relative,
  resolve,
} from 'node:path';
import type { LocalesValues } from '@intlayer/types';

/**
 * This function normalizes the URI related to multiple cases:
 * - Absolute path (e.g. /Users/example/messages/example.content.json or C:\Users\example\messages\example.content.json)
 * - Absolute path - relative to the baseDir (e.g. /messages/example.content.json)
 * - Relative path - relative to the filePath (e.g. ./example.content.json)
 * - Windows drive paths (e.g. C:\path\to\file.json)
 *
 * It should always return an absolute path.
 */
const transformUriToAbsolutePath = (
  uri: string,
  filePath: string,
  baseDir: string
): string => {
  // Handle empty or invalid input
  if (!uri || typeof uri !== 'string') {
    return resolve(baseDir);
  }

  // Normalize the URI first
  const normalizedUri = normalize(uri);

  // Check if it's already an absolute path
  if (isAbsolute(normalizedUri)) {
    return normalizedUri;
  }

  // Handle relative paths starting with ./
  if (normalizedUri.startsWith('./') || normalizedUri.startsWith('.\\')) {
    return resolve(dirname(filePath), normalizedUri);
  }

  // Handle relative paths starting with ../
  if (normalizedUri.startsWith('../') || normalizedUri.startsWith('..\\')) {
    return resolve(dirname(filePath), normalizedUri);
  }

  // Handle paths that start with / (Unix-style absolute paths)
  // but are actually relative to baseDir
  if (normalizedUri.startsWith('/') || normalizedUri.startsWith('\\')) {
    // Remove leading slash/backslash and join with baseDir
    const cleanPath = normalizedUri.replace(/^[/\\]+/, '');
    return resolve(baseDir, cleanPath);
  }

  // Handle Windows drive letters (C:, D:, etc.)
  if (/^[A-Za-z]:[/\\]/.test(normalizedUri)) {
    return normalizedUri;
  }

  // Default case: treat as relative to baseDir
  return resolve(baseDir, normalizedUri);
};

export const formatAutoFilledFilePath = (
  autoFillField: string,
  dictionaryKey: string,
  dictionaryFilePath: string,
  baseDir: string,
  locale?: LocalesValues
): string => {
  // Validate inputs
  if (!autoFillField || typeof autoFillField !== 'string') {
    throw new Error('autoFillField must be a non-empty string');
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

  // Transform `/src/components/home/index.content.json` to `index`
  // Transform `./test.content.tsx` to `test`
  const fileName = basename(dictionaryFilePath)
    .split('.')
    .slice(0, -2) // Remove last 2 extensions (.content.tsx)
    .join('.');

  let result: string = autoFillField
    .replace(/\{\{key\}\}/g, dictionaryKey)
    .replace(/\{\{fileName\}\}/g, fileName);

  if (locale) {
    result = result.replace(/\{\{locale\}\}/g, locale);
  }

  // Handle absolute paths more carefully
  if (isAbsolute(result)) {
    // Check if the result is within the baseDir
    const normalizedResult = normalize(result);
    const normalizedBaseDir = normalize(baseDir);

    if (normalizedResult.startsWith(normalizedBaseDir)) {
      // Make it relative to the baseDir by removing the baseDir prefix
      result = normalizedResult
        .substring(normalizedBaseDir.length)
        .replace(/^[/\\]+/, '');
    }
  }

  const absolutePath = transformUriToAbsolutePath(
    result,
    dictionaryFilePath,
    baseDir
  );

  return relative(baseDir, absolutePath);
};
