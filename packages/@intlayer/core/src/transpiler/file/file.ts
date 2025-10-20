import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { colorizePath, getAppLogger } from '@intlayer/config';
import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';

export type FileContentConstructor<T extends Record<string, any> = {}> =
  TypedNodeModel<NodeType.File, string, T>;

export type FileContent = FileContentConstructor<{
  content: string;
  fixedPath?: string;
}>;

export const fileContent = (
  path: string,
  callerDir: string,
  baseDir: string
): FileContent => {
  const isRelativePath = path.startsWith('./') || path.startsWith('../');
  const appLogger = getAppLogger();

  let filePath: string;
  if (isAbsolute(path)) {
    appLogger(
      `Using absolute path for file is not recommended. Use relative paths instead. Path: ${path}, imported from: ${callerDir}`,
      { level: 'warn' }
    );
    filePath = path;
  } else if (isRelativePath) {
    filePath = resolve(callerDir, path);
  } else {
    filePath = resolve(baseDir, path);
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    try {
      const content = readFileSync(filePath, 'utf8');

      return formatNodeType(NodeType.File, path, {
        content,
        fixedPath: relative(baseDir, filePath),
      });
    } catch {
      appLogger(
        `Unable to read path: ${colorizePath(relative(baseDir, filePath))}`,
        { level: 'warn' }
      );
    }
  } else {
    appLogger(`File not found: ${colorizePath(relative(baseDir, filePath))}`, {
      level: 'warn',
    });
  }

  return formatNodeType(NodeType.File, path, {
    content: `-`,
  });
};

type GlobalIntlayerFilePath = {
  INTLAYER_FILE_PATH: string;
  INTLAYER_BASE_DIR: string;
};

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
  const { INTLAYER_FILE_PATH, INTLAYER_BASE_DIR } =
    globalThis as unknown as GlobalIntlayerFilePath;

  const callerDir = dirname(INTLAYER_FILE_PATH);
  const baseDir = INTLAYER_BASE_DIR;

  return fileContent(path, callerDir, baseDir);
};
