import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types';
import type { BuildOptions, Plugin } from 'esbuild';
import { colorizePath, logger } from '../logger';
import { getProjectRequire } from '../utils/ESMxCJSHelpers';
import {
  parseFileContent,
  type SandBoxContextOptions,
} from './parseFileContent';
import { transpileTSToMJS, transpileTSToMJSSync } from './transpileTSToMJS';

export type ESBuildPlugin = Plugin;

export type LoadExternalFileOptions = {
  configuration?: IntlayerConfig;
  buildOptions?: BuildOptions;
} & SandBoxContextOptions;

/**
 * Load the content declaration from the given path
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadExternalFileSync = (
  filePath: string,
  options?: LoadExternalFileOptions
): any | undefined => {
  const fileExtension = extname(filePath);
  const safeProjectRequire = options?.projectRequire ?? getProjectRequire();

  try {
    if (fileExtension === 'json') {
      // Remove cache to force getting fresh content
      delete safeProjectRequire.cache[safeProjectRequire.resolve(filePath)];
      // Assume JSON
      return safeProjectRequire(filePath);
    }

    // Rest is JS, MJS or TS
    const code = readFileSync(filePath, 'utf-8');

    const moduleResultString: string | undefined = transpileTSToMJSSync(
      code,
      filePath
    );

    if (!moduleResultString) {
      logger('File could not be loaded.', { level: 'error' });
      return undefined;
    }

    const fileContent = parseFileContent(moduleResultString, {
      projectRequire: options?.projectRequire,
      envVarOptions: options?.envVarOptions,
      additionalEnvVars: options?.additionalEnvVars,
      mocks: options?.mocks,
      aliases: options?.aliases,
    });

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

/**
 * Load the content declaration from the given path
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadExternalFile = async (
  filePath: string,
  options?: LoadExternalFileOptions
): Promise<any | undefined> => {
  const fileExtension = extname(filePath);
  const safeProjectRequire = options?.projectRequire ?? getProjectRequire();

  try {
    if (fileExtension === 'json') {
      // Remove cache to force getting fresh content
      delete safeProjectRequire.cache[safeProjectRequire.resolve(filePath)];
      // Assume JSON
      return safeProjectRequire(filePath);
    }

    // Rest is JS, MJS or TS
    const code = await readFile(filePath, 'utf-8');

    const moduleResultString: string | undefined = await transpileTSToMJS(
      code,
      filePath,
      options?.buildOptions
    );

    if (!moduleResultString) {
      logger('File could not be loaded.', { level: 'error' });
      return undefined;
    }

    const fileContent = parseFileContent(moduleResultString, {
      projectRequire: options?.projectRequire,
      envVarOptions: options?.envVarOptions,
      additionalEnvVars: options?.additionalEnvVars,
      mocks: options?.mocks,
      aliases: options?.aliases,
    });

    if (typeof fileContent === 'undefined') {
      logger(`File file could not be loaded. Path : ${colorizePath(filePath)}`);
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
