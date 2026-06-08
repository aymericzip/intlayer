import { resolve, sep } from 'node:path';

/**
 * Throws if `resolvedPath` escapes `baseDir`.
 * Use this before any file operation whose path is derived from user-controlled
 * input (e.g. dictionary keys, filePath fields from dictionary data) to prevent
 * path-traversal attacks.
 */
export const assertPathWithin = (
  resolvedPath: string,
  baseDir: string
): void => {
  const normalizedBase = resolve(baseDir);
  const normalizedPath = resolve(resolvedPath);
  if (
    normalizedPath !== normalizedBase &&
    !normalizedPath.startsWith(normalizedBase + sep)
  ) {
    throw new Error(
      `Path traversal detected: "${resolvedPath}" escapes the base directory "${baseDir}"`
    );
  }
};
