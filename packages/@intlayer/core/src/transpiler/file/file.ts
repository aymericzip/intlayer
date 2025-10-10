import { existsSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { colorizePath, getAppLogger } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import {
  formatNodeType,
  NodeType,
  type TypedNodeModel,
} from '../../types/index';

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
  const appLogger = getAppLogger(configuration);

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
    try {
      const stats = statSync(filePath);

      if (stats.isFile()) {
        content = readFileSync(filePath, 'utf8');
      } else {
        appLogger(
          `Path is not a file: ${colorizePath(relative(configuration.content.baseDir, filePath))}`,
          { level: 'warn' }
        );
        content = `File not found`;
      }
    } catch {
      appLogger(
        `Unable to read path: ${colorizePath(relative(configuration.content.baseDir, filePath))}`,
        { level: 'warn' }
      );
      content = `File not found`;
    }
  } else {
    appLogger(
      `File not found: ${colorizePath(relative(configuration.content.baseDir, filePath))}`,
      { level: 'warn' }
    );

    content = `File not found`;
  }

  return formatNodeType(NodeType.File, path, {
    content,
    fixedPath: relative(process.cwd(), filePath),
  });
};
