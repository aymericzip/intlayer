import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import * as JSON5 from 'json5';
import { colorizePath, logger } from '../logger';
import {
  parseFileContent,
  type SandBoxContextOptions,
} from './parseFileContent';
import {
  type TranspileOptions,
  transpileTSToCJS,
  transpileTSToCJSSync,
} from './transpileTSToCJS';

// CJS MJS cross usage
const parseJSON5 = JSON5.parse || (JSON5 as any).default?.parse;

export type LoadExternalFileOptions = {
  configuration?: IntlayerConfig;
  buildOptions?: TranspileOptions;
  logError?: boolean;
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
  const fileExtension = extname(filePath) || '.json';

  try {
    if (
      fileExtension === '.json' ||
      fileExtension === '.json5' ||
      fileExtension === '.jsonc'
    ) {
      // Assume JSON
      return parseJSON5(readFileSync(filePath, 'utf-8'));
    }

    // Rest is JS, MJS or TS
    const code = readFileSync(filePath, 'utf-8');

    const moduleResultString: string | undefined = transpileTSToCJSSync(
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
      logger(`File could not be loaded. Path : ${filePath}`);
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

  try {
    if (
      fileExtension === '.json' ||
      fileExtension === '.json5' ||
      fileExtension === '.jsonc'
    ) {
      // Remove cache to force getting fresh content
      const fileContent = await readFile(filePath, 'utf-8');
      return parseJSON5(fileContent);
    }

    // Rest is JS, MJS or TS
    const code = await readFile(filePath, 'utf-8');

    const moduleResultString: string | undefined = await transpileTSToCJS(
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
      logger(`File could not be loaded. Path : ${colorizePath(filePath)}`);
      return undefined;
    }

    return fileContent;
  } catch (error) {
    if (options?.logError ?? true) {
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
  }
};
