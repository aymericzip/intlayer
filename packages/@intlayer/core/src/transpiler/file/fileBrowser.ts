import type { FileContent } from './file';

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow identify the usage of an external resource.
 *
 * Usage:
 *
 * ```ts
 * file('/path/to/file.md') // absolute path
 *
 * // or
 *
 * file('path/to/file.md') // relative path
 * ```
 */
export const file = (_path: string): FileContent => {
  throw new Error('file is not available in browser');

  // return formatNodeType(NodeTypes.File, path, {
  //   content: '',
  //   fixedPath: '',
  // });
};
