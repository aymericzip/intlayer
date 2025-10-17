import { formatNodeType, NodeType } from '@intlayer/types';
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
export const file = (path: string): FileContent => {
  throw new Error('file is not available in browser');

  return formatNodeType(NodeType.File, path, {
    content: '',
    fixedPath: '',
  });
};
