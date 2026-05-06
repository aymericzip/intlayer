import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import JSON5 from 'json5';
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
  /**
   * Key-value pairs to temporarily set on the main Node.js `globalThis` for the
   * synchronous duration of `parseFileContent` / `runInNewContext`. External modules
   * loaded via `require()` inside the VM (e.g. `@intlayer/core`'s `file()` helper)
   * run in the main context and read from the real `globalThis`, not the VM sandbox.
   * Values are restored (or deleted) after `runInNewContext` returns.
   */
  preloadGlobals?: Record<string, unknown>;
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

const withPreloadedGlobals = <T>(
  globals: Record<string, unknown> | undefined,
  fn: () => T
): T => {
  if (!globals) return fn();

  const globalVars = globalThis as Record<string, unknown>;
  const prev: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(globals)) {
    prev[key] = globalVars[key];
    globalVars[key] = value;
  }

  try {
    return fn();
  } finally {
    for (const key of Object.keys(globals)) {
      if (prev[key] !== undefined) {
        globalVars[key] = prev[key];
      } else {
        delete globalVars[key];
      }
    }
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

    // parseFileContent/runInNewContext is synchronous, so withPreloadedGlobals
    // has no interleaving risk even when multiple files are processed concurrently.
    const fileContent = withPreloadedGlobals(options?.preloadGlobals, () =>
      parseFileContent(moduleResultString, {
        projectRequire: options?.projectRequire,
        envVarOptions: options?.envVarOptions,
        additionalEnvVars: options?.additionalEnvVars,
        mocks: options?.mocks,
        aliases: options?.aliases,
      })
    );

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
