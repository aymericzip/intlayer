/**
 * Normalize a path for glob by replacing backslashes with forward slashes
 *
 * Utils for Windows compatibility, as Glob pattern as `**\\*.js` is not supported
 *
 * C:\\Users\\John\\Desktop\\test.txt -> C:/Users/John/Desktop/test.txt
 *
 * @param path - The path to normalize
 * @returns The normalized path
 */
export const normalizePath = (path: string): string => path.replace(/\\/g, '/');
