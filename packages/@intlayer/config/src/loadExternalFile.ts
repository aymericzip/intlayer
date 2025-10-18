import { readFileSync } from 'node:fs';
import { dirname, extname } from 'node:path';
import { runInNewContext } from 'node:vm';
import {
  type BuildOptions,
  type BuildResult,
  buildSync,
  type Loader,
} from 'esbuild';
import { getSandBoxContext } from './getSandboxContext';
import type { LoadEnvFileOptions } from './loadEnvFile';
import { logger } from './logger';
import { ESMxCJSRequire } from './utils/ESMxCJSHelpers';

const getLoader = (extension: string): Loader => {
  switch (extension) {
    case '.js':
      return 'js';
    case '.jsx':
      return 'jsx';
    case '.mjs':
      return 'js';
    case '.ts':
      return 'ts';
    case '.tsx':
      return 'tsx';
    case '.cjs':
      return 'js';
    case '.json':
      return 'json';
    case '.md':
      return 'text';
    case '.mdx':
      return 'text';
    default:
      return 'js';
  }
};

const getTransformationOptions = (filePath: string): BuildOptions => ({
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.cjs': 'js',
    '.json': 'json',
    '.md': 'text',
    '.mdx': 'text',
  },
  format: 'cjs', // Output format as commonjs
  target: 'es2017',
  packages: 'external',
  write: false,
  bundle: true,
  banner: {
    js: [
      `globalThis.intlayer_file_path = ${JSON.stringify(filePath)};`,
      `globalThis.intlayer_file_dir = ${JSON.stringify(dirname(filePath))};`,
    ].join('\n'),
  },
});

type ParseFileContentOptions = {
  projectRequire?: NodeJS.Require;
  envVarOptions?: LoadEnvFileOptions;
  additionalEnvVars?: Record<string, string>;
  aliases?: Record<string, any>;
};

export const parseFileContent = <T>(
  fileContentString: string,
  options?: ParseFileContentOptions
): T | undefined => {
  const sandboxContext = getSandBoxContext(options);
  let fileContent: T | undefined;

  runInNewContext(fileContentString, sandboxContext);

  if (
    sandboxContext.exports.default &&
    Object.keys(sandboxContext.exports.default).length > 0
  ) {
    // ES Module
    fileContent = sandboxContext.exports.default;
  } else if (
    sandboxContext.module.exports.defaults &&
    Object.keys(sandboxContext.module.exports.defaults).length > 0
  ) {
    // CommonJS
    fileContent = sandboxContext.module.exports.defaults;
  } else if (
    sandboxContext.module.exports.default &&
    Object.keys(sandboxContext.module.exports.default).length > 0
  ) {
    // ES Module
    fileContent = sandboxContext.module.exports.default;
  } else if (
    sandboxContext.module.exports &&
    Object.keys(sandboxContext.module.exports).length > 0
  ) {
    // Other
    fileContent = sandboxContext.module.exports;
  }

  return fileContent;
};

export const buildFileContent = (
  code: string,
  filePath: string,
  options?: BuildOptions
): string | undefined => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const moduleResult: BuildResult = buildSync({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
      sourcefile: filePath, // Add sourcefile for better error messages
    },
    ...getTransformationOptions(filePath),
    ...options,
  });

  const moduleResultString = moduleResult.outputFiles?.[0].text;

  return moduleResultString;
};

type LoadExternalFileOptions = {
  projectRequire?: NodeJS.Require;
  envVarOptions?: LoadEnvFileOptions;
  additionalEnvVars?: Record<string, string>;
  aliases?: Record<string, any>;
};

/**
 * Load the content declaration from the given path
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadExternalFile = (
  filePath: string,
  options?: LoadExternalFileOptions
): any | undefined => {
  const fileExtension = extname(filePath);
  const safeProjectRequire = options?.projectRequire ?? ESMxCJSRequire;

  try {
    if (fileExtension === 'json') {
      // Remove cache to force getting fresh content
      delete safeProjectRequire.cache[safeProjectRequire.resolve(filePath)];
      // Assume JSON
      return safeProjectRequire(filePath);
    }

    // Rest is JS, MJS or TS
    const code = readFileSync(filePath, 'utf-8');

    const moduleResultString: string | undefined = buildFileContent(
      code,
      filePath
    );

    if (!moduleResultString) {
      logger('File could not be loaded.', { level: 'error' });
      return undefined;
    }

    const fileContent = parseFileContent(moduleResultString, options);

    if (typeof fileContent === 'undefined') {
      logger(`File file could not be loaded. Path : ${filePath}`);
      return undefined;
    }

    return fileContent;
  } catch (error) {
    logger(
      [
        `Error: ${(error as Error).message} - `,
        JSON.stringify((error as Error).stack, null, 2),
      ],
      {
        level: 'error',
      }
    );
  }
};
