import { existsSync, readFileSync } from 'fs';
import {
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '../../types/index';
import { relative, resolve } from 'path';
import { appLogger } from '@intlayer/config';

export type FileContentConstructor<T extends Record<string, any> = {}> =
  TypedNodeModel<NodeType.File, string, T>;

export type FileContent = FileContentConstructor<{
  content: string;
  fixedPath?: string;
}>;

declare const intlayer_file_path: string; // Injected by esbuild to track the file content
declare const intlayer_file_dir: string; // Injected by esbuild to track the file path

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
  const callerDir = intlayer_file_dir ?? process.cwd();

  const isAbsolutePath = path.startsWith('/');
  const isRelativePath = path.startsWith('./') || path.startsWith('../');

  let filePath: string;
  if (isAbsolutePath) {
    appLogger(
      `Using absolute path for file is not recommended. Use relative paths instead. Path: ${path}, imported from: ${intlayer_file_path}`,
      { level: 'warn' }
    );
    filePath = path;
  } else if (isRelativePath) {
    filePath = resolve(callerDir, path);
  } else {
    filePath = resolve(process.cwd(), path);
  }

  let content: string;

  if (existsSync(filePath)) {
    content = readFileSync(filePath, 'utf8');
  } else {
    appLogger(`File not found: ${filePath}`, { level: 'warn' });

    content = `File not found`;
  }

  return formatNodeType(NodeType.File, path, {
    content,
    fixedPath: relative(process.cwd(), filePath),
  });
};
